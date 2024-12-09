import React, { useRef, useEffect } from 'react';

const WaveformVisualizer = ({ isRecording, audioData }) => {
  const canvasRef = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const draw = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      
      if (!isRecording) {
        // Draw flat line when not recording
        ctx.beginPath();
        ctx.moveTo(0, HEIGHT / 2);
        ctx.lineTo(WIDTH, HEIGHT / 2);
        ctx.strokeStyle = '#073ca5';
        ctx.stroke();
        return;
      }

      // Draw animated waveform
      ctx.beginPath();
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#ff5b00';
      ctx.lineWidth = 2;

      ctx.moveTo(0, HEIGHT / 2);

      // Create animated wave effect
      for (let i = 0; i < WIDTH; i++) {
        const t = Date.now() / 1000;
        const amplitude = isRecording ? 20 : 0;
        const frequency = 0.01;
        const y = HEIGHT / 2 + Math.sin(i * frequency + t * 5) * amplitude;
        ctx.lineTo(i, y);
      }

      ctx.stroke();
      rafId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isRecording]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={100}
      className="w-full h-full rounded-lg bg-gray-50"
    />
  );
};

export default WaveformVisualizer;