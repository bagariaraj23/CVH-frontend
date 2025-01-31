'use client';
import { useState, useEffect } from 'react';

export default function TypewriterEffect({ text, onComplete, formatter }) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(currentIndex + 1);
            }, 20);

            return () => clearTimeout(timeout);
        } else if (onComplete) {
            onComplete();
        }
    }, [currentIndex, text, onComplete]);

    return formatter ? 
        formatter(displayedText) : 
        <div>{displayedText}</div>;
}