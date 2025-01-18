'use client';
import { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop, FaPaperPlane, FaLock } from 'react-icons/fa';
import { useWallet } from '@/app/hooks/useWallet';
import AudioVisualizer from './AudioVisualizer';

export default function ChatInterface({ mode = 'text' }) {
    const [messages, setMessages] = useState([{
        type: 'bot',
        content: `Hello! I'm your AI health assistant.How can I help you today?`
    }]);
    const [input, setInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isPremiumFeature] = useState(mode !== 'text');
    const { isConnected, isPremium, connectWallet } = useWallet();
    const [audioUrl, setAudioUrl] = useState(null);
    const mediaRecorder = useRef(null);
    const messagesEndRef = useRef(null);
    const audioRef = useRef(null);
    const audioContext = useRef(null);
    const chatContainerRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Initialize audio context
        if (mode === 'speech-to-speech') {
            audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        return () => {
            stopListening();
            if (audioContext.current) {
                audioContext.current.close();
            }
        };
    }, [mode]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessage = { type: 'user', content: input };
        setMessages(prev => [...prev, newMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/openai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }

            setMessages(prev => [...prev, { type: 'bot', content: data.response }]);
            setIsLoading(false); // Stop loading after response is received

        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                type: 'bot',
                content: 'Sorry, I encountered an error. Please try again.'
            }]);
            setIsLoading(false); // Stop loading after response is received

        }
    };

    const startRecording = async () => {
        // if (!isConnected) {
        //     const confirmed = window.confirm('You need to connect your wallet to use voice features. Connect now?');
        //     if (confirmed) {
        //         await connectWallet();
        //     }
        //     return;
        // }

        // if (!isPremium) {
        //     alert('This feature requires a premium subscription');
        //     return;
        // }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            const audioChunks = [];

            mediaRecorder.current.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.current.onstop = async () => {
                setIsLoading(true);
                const audioBlob = new Blob(audioChunks);
                const formData = new FormData();
                formData.append('audio', audioBlob);
                formData.append('mode', mode);

                try {
                    const response = await fetch('/api/openai/speech', {
                        method: 'POST',
                        body: formData
                    });

                    const data = await response.json();
                    if (data.error) {
                        throw new Error(data.error);
                    }

                    setMessages(prev => [
                        ...prev,
                        { type: 'user', content: data.transcription },
                        { type: 'bot', content: data.response }
                    ]);

                    if (mode === 'speech-to-speech' && data.audioUrl) {
                        setAudioUrl(data.audioUrl);
                        audioRef.current?.play();
                    }
                    setIsLoading(false); // Stop loading when response is received
                } catch (error) {
                    console.error('Error:', error);
                    setMessages(prev => [...prev, {
                        type: 'bot',
                        content: 'Sorry, I encountered an error processing your voice input.'
                    }]);
                }
            };

            mediaRecorder.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Could not access microphone. Please check your permissions.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current && isRecording) {
            mediaRecorder.current.stop();
            setIsRecording(false);
        }
    };

    const startListening = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            const audioChunks = [];

            mediaRecorder.current.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.current.onstop = async () => {
                const audioBlob = new Blob(audioChunks);
                await processAudioInput(audioBlob);
            };

            mediaRecorder.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Could not access microphone. Please check your permissions.');
        }
    };

    const stopListening = () => {
        if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
            mediaRecorder.current.stop();
            mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
        }
        setIsRecording(false);
    };

    const processAudioInput = async (audioBlob) => {
        const formData = new FormData();
        formData.append('audio', audioBlob);
        formData.append('mode', 'speech-to-speech');

        try {
            setIsRecording(true);
            const response = await fetch('/api/openai/speech', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            // Add user's transcribed message
            setMessages(prev => [...prev, {
                type: 'user',
                content: data.transcription
            }]);

            // Add AI's response
            setMessages(prev => [...prev, {
                type: 'ai',
                content: data.response,
                audioUrl: data.audioUrl
            }]);

            // Play audio response
            if (data.audioUrl) {
                const audio = new Audio(data.audioUrl);
                audio.onended = () => {
                    setIsRecording(false);
                    if (mode === 'speech-to-speech') {
                        startListening(); // Continue listening after AI response
                    }
                };
                audio.play();
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                type: 'ai',
                content: 'Sorry, I encountered an error processing your voice input.'
            }]);
            setIsRecording(false);
        }
    };

    const handleSpeechToSpeechToggle = () => {
        if (isRecording) {
            stopRecording();
            setIsRecording(false);
        } else {
            startRecording();
        }
    };

    return (
       <div className="flex flex-col h-[400px] w-full bg-white rounded-lg shadow-xl">

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"             
                ref={chatContainerRef}>

                {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${message.type === 'user'
                            ? 'bg-[#12104A] text-white'
                            : 'bg-gray-100 text-gray-800'
                            }`}>
                            {message.type === 'ai' ? formatAIResponse(message.content) : message.content}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Audio Visualizer */}
            {(mode !== 'text' && isRecording) && (
                <div className="px-4 py-2">
                    <AudioVisualizer isRecording={isRecording} />
                </div>
            )}
                {isLoading && (
                <div className="flex justify-start items-center p-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#12104A]"></div>
                </div>
            )}


            {/* Input Area */}
            <div className="border-t p-4 bg-white">
                {isPremiumFeature && !isPremium && (
                    <div className="flex items-center justify-center mb-4 text-sm text-gray-600">
                        <FaLock className="mr-2" />
                        This feature requires a premium subscription
                    </div>
                )}
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12104A] text-black"
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    {mode !== 'text' && (
                        <button
                            onClick={handleSpeechToSpeechToggle}
                            className={`p-2 rounded-full ${isRecording
                                ? 'bg-red-500 hover:bg-red-600'
                                : 'bg-[#12104A] hover:bg-[#1a1766]'
                                } text-white transition-colors`}
                        >
                            {isRecording ? <FaStop /> : <FaMicrophone />}
                        </button>
                    )}
                    <button
                        onClick={handleSend}
                        className="p-2 bg-[#12104A] text-white rounded-full hover:bg-[#1a1766] transition-colors"
                    >
                        <FaPaperPlane />
                    </button>
                </div>
            </div>

            {/* Hidden audio element for speech-to-speech */}
            {/* {audioUrl && ( */}
            <audio ref={audioRef} src={audioUrl} className="hidden" />
            {/* )} */}
        </div>
    );
} 