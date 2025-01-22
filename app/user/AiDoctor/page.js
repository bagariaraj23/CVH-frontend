"use client";
import { useState } from "react";
import ChatInterface from "./components/ChatInterface";
import PaystackButton from "./components/PaystackButton";
import { FaKeyboard, FaMicrophone, FaHeadset } from "react-icons/fa";

export default function AiDoctor() {
    const [selectedMode, setSelectedMode] = useState('text');
    const [isPremium] = useState(false); // This should come from your user context/session

    const modes = [
        { 
            id: 'text', 
            icon: FaKeyboard, 
            label: 'Text Chat', 
            description: 'Free text-based chat',
            premium: false 
        },
        { 
            id: 'speech-to-text', 
            icon: FaMicrophone, 
            label: 'Voice Input', 
            description: 'Premium: Speak to chat',
            premium: true 
        },
        { 
            id: 'speech-to-speech', 
            icon: FaHeadset, 
            label: 'Voice Chat', 
            description: 'Premium: Full voice conversation',
            premium: true 
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Header Section */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">AI Health Assistant</h1>
                        <p className="mt-2 text-gray-600">Get instant medical guidance and symptom analysis</p>
                    </div>
                    {!isPremium && <PaystackButton />}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Mode Selection Sidebar */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold mb-4 text-black">Chat Modes</h2>
                        {modes.map((mode) => (
                            <button
                                key={mode.id}
                                onClick={() => {
                                    if (mode.premium && !isPremium) {
                                        alert('This is a premium feature. Please upgrade to access.');
                                        return;
                                    }
                                    setSelectedMode(mode.id);
                                }}
                                className={`w-full p-4 rounded-lg border transition-all ${
                                    mode.premium && !isPremium 
                                        ? 'opacity-60 cursor-not-allowed' 
                                        : selectedMode === mode.id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-blue-200'
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <mode.icon className={`text-xl ${
                                        selectedMode === mode.id ? 'text-blue-500' : 'text-gray-500'
                                    }`} />
                                    <div className="text-left">
                                        <div className={`font-medium ${
                                            selectedMode === mode.id ? 'text-blue-700' : 'text-gray-700'
                                        }`}>
                                            {mode.label}
                                        </div>
                                        <div className="text-sm text-gray-500">{mode.description}</div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Chat Interface */}
                    <div className="md:col-span-3">
                        <ChatInterface mode={selectedMode} isPremium={isPremium} />
                    </div>
                </div>
            </div>
        </div>
    );
}