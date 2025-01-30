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
    const [messages, setMessages] = useState([
        {
            type: 'assistant',
            content: `Hello! I'm your AI health assistant. How can I help you today?`
        }
    ]);
    const [input, setInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // If mode is not 'text', we consider it premium for example
    const [isPremiumFeature] = useState(mode !== 'text');

    // From your wallet hook (uncomment or adapt if needed)
    const { isConnected, isPremium, connectWallet } = useWallet();

    // Refs
    const mediaRecorder = useRef(null);
    const audioContext = useRef(null);
    const chatContainerRef = useRef(null);
    const ttsAudioRef = useRef(null); // reference to the TTS audio (so we can pause it)

    // Additional states
    const [isTyping, setIsTyping] = useState(false);
    const [hasMicPermission, setHasMicPermission] = useState(null);

    /**
     * Scroll the chat container to the bottom whenever messages change
     */
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    /**
     * If we're in speech-to-speech mode, create an AudioContext for potential audio processing.
     * We won't do that for text or speech-to-text modes.
     */
    useEffect(() => {
        if (mode === 'speech-to-speech') {
            audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        return () => {
            stopListening();
            if (audioContext.current) {
                audioContext.current.close();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode]);

    /**
     * Format the assistant response with bullet points, headers, etc.
     */
    const formatAIResponse = (text) => {
        const paragraphs = text.split('\n').filter((p) => p.trim());
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

    /**
     * Send user-typed message to the AI (text-to-text)
     */
    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessage = { type: 'user', content: input };
        setMessages((prev) => [...prev, newMessage]);
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
            setMessages((prev) => [
                ...prev,
                {
                    type: 'assistant',
                    content: data.response
                }
            ]);
            setIsLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setMessages((prev) => [
                ...prev,
                {
                    type: 'assistant',
                    content: 'Sorry, I encountered an error. Please try again.'
                }
            ]);
            setIsLoading(false);
        }
    };

    /**
     * Check microphone permission
     */
    const checkMicrophonePermission = async () => {
        try {
            const permissionStatus = await navigator.permissions.query({ name: 'microphone' });
            const isGranted = permissionStatus.state === 'granted';
            setHasMicPermission(isGranted);

            if (!isGranted) {
                toast.warning('Microphone access is required for voice features', {
                    position: 'top-right',
                    autoClose: 5000
                });
            }

            permissionStatus.onchange = () => {
                const newStateGranted = permissionStatus.state === 'granted';
                setHasMicPermission(newStateGranted);
                if (newStateGranted) {
                    toast.success('Microphone access granted', {
                        position: 'top-right',
                        autoClose: 3000
                    });
                } else {
                    toast.warning('Microphone access is required for voice features', {
                        position: 'top-right',
                        autoClose: 5000
                    });
                }
            };

            return isGranted;
        } catch (error) {
            console.error('Error checking microphone permission:', error);
            toast.error('Error checking microphone permission: ' + error.message, {
                position: 'top-right',
                autoClose: 5000
            });
            return false;
        }
    };

    /**
     * Start listening for user speech
     */
    const startListening = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            const audioChunks = [];

            mediaRecorder.current.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            // When the user stops talking, we have the final blob
            mediaRecorder.current.onstop = async () => {
                const audioBlob = new Blob(audioChunks);
                await processAudioInput(audioBlob);
            };

            mediaRecorder.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            toast.error('Error accessing microphone: ' + error.message, {
                position: 'top-right',
                autoClose: 5000
            });
            setIsRecording(false);
        }
    };

    /**
     * Stop listening
     */
    const stopListening = () => {
        if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
            mediaRecorder.current.stop();
            mediaRecorder.current.stream.getTracks().forEach((track) => track.stop());
        }
        setIsRecording(false);
    };

    /**
     * Send user speech to server -> get transcription + AI response
     * If mode is speech-to-speech, also do TTS playback
     */
    const processAudioInput = async (audioBlob) => {
        setIsLoading(true);

        const formData = new FormData();
        formData.append('audio', audioBlob);
        formData.append('mode', mode);
        // For example, 'speech-to-text' or 'speech-to-speech'
        // Your backend can check this param to decide if it should return an audioUrl

        try {
            const response = await fetch('/api/openai/speech', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            // user message from transcription
            setMessages((prev) => [
                ...prev,
                {
                    type: 'user',
                    content: data.transcription
                }
            ]);

            // assistant response
            setMessages((prev) => [
                ...prev,
                {
                    type: 'assistant',
                    content: data.response
                }
            ]);

            setIsLoading(false);

            /**
             * If we are in 'speech-to-speech' mode & the server returned an audioUrl
             * => Play TTS so the AI "speaks"
             */
            if (mode === 'speech-to-speech' && data.audioUrl) {
                const audio = new Audio(data.audioUrl);
                ttsAudioRef.current = audio;

                audio.onended = () => {
                    // Resume listening automatically if user hasn't stopped
                    if (isRecording) {
                        startListening();
                    }
                };

                audio.play();
            } else {
                /**
                 * If it's 'speech-to-text' (or the server didn't return TTS),
                 * we skip TTS and can immediately restart listening if desired.
                 */
                if (isRecording) {
                    startListening();
                }
            }
        } catch (error) {
            console.error('Error processing audio:', error);
            toast.error('Error processing audio: ' + error.message, {
                position: 'top-right',
                autoClose: 5000
            });
            setIsLoading(false);

            // Attempt to keep the conversation going if user hasn't stopped
            if (isRecording) {
                startListening();
            }
        }
    };

    /**
     * Interrupt TTS if playing and start listening (or stop if we are already recording).
     */
    const handleContinuousSpeechToggle = async () => {
        // If we are currently recording, user wants to stop
        if (isRecording) {
            stopListening();
            return;
        }

        // If TTS is playing, pause it & reset so user can talk
        if (ttsAudioRef.current && !ttsAudioRef.current.paused) {
            ttsAudioRef.current.pause();
            ttsAudioRef.current.currentTime = 0; // reset
        }

        // Uncomment these checks if you need premium/wallet gating:

        if (!isConnected) {
            toast.info('You need to connect your wallet to use voice features.', {
                position: 'top-right',
                autoClose: 5000,
                onClick: async () => {
                    await connectWallet();
                }
            });
            return;
        }

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

        // All good, start listening
        startListening();
    };

    return (
        <ErrorBoundary>
            <div className="flex flex-col h-[400px] w-full bg-white rounded-lg shadow-xl">
                {/* Messages Area */}
                <div
                    className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                    ref={chatContainerRef}
                >
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] p-3 rounded-lg ${message.type === 'user'
                                    ? 'bg-[#12104A] text-white'
                                    : 'bg-gray-100 text-gray-800'
                                    }`}
                            >
                                {message.type === 'assistant' && index === messages.length - 1 && isTyping ? (
                                    <TypewriterEffect
                                        text={message.content}
                                        onComplete={() => setIsTyping(false)}
                                        formatter={formatAIResponse}
                                    />
                                ) : message.type === 'assistant' ? (
                                    formatAIResponse(message.content)
                                ) : (
                                    message.content
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Audio Visualizer (shown if not text mode & isRecording) */}
                {mode !== 'text' && isRecording && (
                    <div className="px-4 py-2">
                        <AudioVisualizer isRecording={isRecording} />
                    </div>
                )}

                {isLoading && (
                    <div className="flex justify-start items-center p-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#12104A]" />
                    </div>
                )}

                {/* Input Area */}
                <div className="border-t p-4 bg-white">
                    {/* Example premium message if needed */}
                    {isPremiumFeature && !isPremium && (
                        <div className="flex items-center justify-center mb-4 text-sm text-gray-600">
                            <FaLock className="mr-2" />
                            This feature requires a premium subscription
                        </div>
                    )}

                    <div className="flex items-center space-x-2">
                        {/* Text input always visible if user wants to type */}
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12104A] text-black"
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            disabled={isTyping}
                        />

                        {/* Show mic button only if user selected 'speech-to-text' or 'speech-to-speech' */}
                        {mode !== 'text' && (
                            <button
                                onClick={handleContinuousSpeechToggle}
                                className={`p-2 rounded-full ${isRecording
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : hasMicPermission === false
                                        ? 'bg-gray-400'
                                        : 'bg-[#12104A] hover:bg-[#1a1766]'
                                    } text-white transition-colors relative`}
                                disabled={isTyping || hasMicPermission === false}
                                title={
                                    hasMicPermission === false
                                        ? 'Microphone access required'
                                        : isRecording
                                            ? 'Stop conversation'
                                            : 'Start conversation (interrupt TTS if playing)'
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

                        {/* Send typed message */}
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
            </div>
        </ErrorBoundary>
    );
}
