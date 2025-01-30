'use client';
import { useEffect, useRef } from 'react';

export default function AudioVisualizer({ isRecording }) {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);

    useEffect(() => {
        if (isRecording) {
            startVisualization();
        } else {
            stopVisualization();
        }

        return () => stopVisualization();
    }, [isRecording]);

    const startVisualization = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();

            analyser.fftSize = 256;
            source.connect(analyser);
            analyserRef.current = analyser;

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            dataArrayRef.current = dataArray;

            draw();
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const stopVisualization = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
    };

    const draw = () => {
        if (!canvasRef.current || !analyserRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const analyser = analyserRef.current;
        const dataArray = dataArrayRef.current;

        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = 'rgb(18, 16, 74)'; // Match your theme color
        ctx.fillRect(0, 0, width, height);

        const barWidth = (width / dataArray.length) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < dataArray.length; i++) {
            barHeight = dataArray[i] / 2;

            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, '#4F46E5');
            gradient.addColorStop(1, '#818CF8');

            ctx.fillStyle = gradient;
            ctx.fillRect(x, height - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }

        animationRef.current = requestAnimationFrame(draw);
    };

    return (
        <>
            <canvas
                ref={canvasRef}
                width="300"
                height="60"
                className="rounded-lg bg-[#12104A]"
            />
        </>
    );
} 