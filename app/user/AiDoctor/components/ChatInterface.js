'use client';
import { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop, FaPaperPlane, FaLock } from 'react-icons/fa';
import { useWallet } from '@/app/hooks/useWallet';
import AudioVisualizer from './AudioVisualizer';
import TypewriterEffect from './TypewriterEffect';
import { CustomToastContainer, showError } from '@/app/components/ErrorNotification';
import ErrorBoundary from '@/app/components/ErrorBoundary';
import { toast } from 'react-toastify';

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
    const [isTyping, setIsTyping] = useState(false);
    const [hasMicPermission, setHasMicPermission] = useState(null);

    // const scrollToBottom = () => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // };

    // useEffect(() => {
    //     scrollToBottom();
    // }, [messages]);

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

    const formatAIResponse = (text) => {
        // Split text into paragraphs
        const paragraphs = text.split('\n').filter(p => p.trim());

        return (
            <div className="space-y-3">
                {paragraphs.map((paragraph, idx) => {
                    // Check if it's a bullet point
                    if (paragraph.trim().startsWith('•') || paragraph.trim().startsWith('-')) {
                        return (
                            <div key={idx} className="flex items-start space-x-2 ml-4">
                                <span className="text-[#12104A] mt-1">•</span>
                                <span>{paragraph.replace(/^[•-]\s*/, '')}</span>
                            </div>
                        );
                    }

                    // Check if it's a header (ends with ':')
                    if (paragraph.trim().endsWith(':')) {
                        return (
                            <div key={idx} className="font-bold text-[#12104A]">
                                {paragraph}
                            </div>
                        );
                    }

                    // Regular paragraph
                    return (
                        <p key={idx} className="text-gray-700">
                            {paragraph}
                        </p>
                    );
                })}
            </div>
        );
    };

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
            setIsTyping(true);
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
        if (!isConnected) {
            toast.info('You need to connect your wallet to use voice features.', {
                position: "top-right",
                autoClose: 5000,
                onClick: async () => {
                    await connectWallet();
                }
            });
            return;
        }

        if (!isPremium) {
            toast.error('This feature requires a premium subscription', {
                position: "top-right",
                autoClose: 5000
            });
            return;
        }

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
            toast.error('Error accessing microphone: ' + error.message, {
                position: "top-right",
                autoClose: 5000
            });
            setIsRecording(false);
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
            toast.error('Error accessing microphone: ' + error.message, {
                position: "top-right",
                autoClose: 5000
            });
            setIsRecording(false);
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
            console.error('Error processing audio:', error);
            toast.error('Error processing audio: ' + error.message, {
                position: "top-right",
                autoClose: 5000
            });
            setIsRecording(false);
            if (audioRef.current) {
                audioRef.current.pause();
            }
        }
    };

    const checkMicrophonePermission = async () => {
        try {
            const permissionStatus = await navigator.permissions.query({ name: 'microphone' });
            const isGranted = permissionStatus.state === 'granted';
            setHasMicPermission(isGranted);

            if (!isGranted) {
                toast.warning('Microphone access is required for voice features', {
                    position: "top-right",
                    autoClose: 5000
                });
            }

            permissionStatus.onchange = () => {
                setHasMicPermission(permissionStatus.state === 'granted');
                if (permissionStatus.state === 'granted') {
                    toast.success('Microphone access granted', {
                        position: "top-right",
                        autoClose: 3000
                    });
                } else {
                    toast.warning('Microphone access is required for voice features', {
                        position: "top-right",
                        autoClose: 5000
                    });
                }
            };

            return isGranted;
        } catch (error) {
            console.error('Error checking microphone permission:', error);
            toast.error('Error checking microphone permission: ' + error.message, {
                position: "top-right",
                autoClose: 5000
            });
            return false;
        }
    };

    const handleSpeechToSpeechToggle = async () => {
        if (isRecording) {
            stopRecording();
            setIsRecording(false);
            return;
        }

        // Check premium status first (if needed)
        if (isPremiumFeature && !isPremium) {
            showError({
                name: 'PremiumRequired',
                message: 'This feature requires a premium subscription'
            });
            return;
        }

        // Check microphone permission
        const hasPermission = await checkMicrophonePermission();

        if (!hasPermission) {
            showError({
                name: 'NotAllowedError',
                message: 'Microphone access is required for voice features'
            });
            return;
        }

        // If we have permission, proceed with recording
        startRecording();
    };

    return (
        <ErrorBoundary>
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
                                {/* {message.type === 'ai' ? formatAIResponse(message.content) : message.content} */}
                                {message.type === 'bot' && index === messages.length - 1 ? (
                                    <TypewriterEffect
                                        text={message.content}
                                        onComplete={() => setIsTyping(false)}
                                        formatter={formatAIResponse}
                                    />
                                ) : (
                                    // message.content
                                    message.type === 'bot' ?
                                        formatAIResponse(message.content) :
                                        message.content

                                )}
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
                            disabled={isTyping}
                        />
                        {mode !== 'text' && (
                            <button
                                onClick={handleSpeechToSpeechToggle}
                                className={`p-2 rounded-full ${isRecording
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : hasMicPermission === false
                                        ? 'bg-gray-400' // Disabled state
                                        : 'bg-[#12104A] hover:bg-[#1a1766]'
                                    } text-white transition-colors relative`}
                                disabled={isTyping || hasMicPermission === false}
                                title={
                                    hasMicPermission === false
                                        ? 'Microphone access required'
                                        : isRecording
                                            ? 'Stop recording'
                                            : 'Start recording'
                                }
                            >
                                {isRecording ? <FaStop /> : <FaMicrophone />}
                                {hasMicPermission === false && (
                                    <span className="absolute -top-1 -right-1 text-red-500">
                                        <FaLock size={12} />
                                    </span>
                                )}
                            </button>
                        )}
                        <button
                            onClick={handleSend}
                            className={`p-2 bg-[#12104A] text-white rounded-full hover:bg-[#1a1766] transition-colors ${isTyping ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            disabled={isTyping}
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
        </ErrorBoundary>
    );
} 