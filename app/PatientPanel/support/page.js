'use client';

import { useState } from 'react';

export default function SupportPage() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: 'bot', text: 'Hello! How can I assist you today?' },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { id: chatHistory.length + 1, sender: 'user', text: message };
      setChatHistory([...chatHistory, newMessage]);

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: chatHistory.length + 2,
          sender: 'bot',
          text: 'Thank you for your message. Our support team will get back to you shortly.',
        };
        setChatHistory((prev) => [...prev, botResponse]);
      }, 1000);

      setMessage('');
    }
  };

  return (
    <main className="p-6 bg-gray-100 flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6">Support</h2>
      <div className="flex-1 bg-white shadow rounded p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4">
          {chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 p-2 rounded ${
                msg.sender === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start'
              }`}
            >
              <p className="text-gray-700">{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
