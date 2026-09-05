import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle definitions
    const particleCount = Math.min(65, Math.floor((width * height) / 18000));
    interface Particle {
      x: number;
      y: number;
      radius: number;
      baseAlpha: number;
      alpha: number;
      speedX: number;
      speedY: number;
      twinkleSpeed: number;
      twinkleOffset: number;
      color: string;
      isHeart?: boolean;
    }

    const colors = [
      'rgba(244, 114, 182, ', // Pink-400
      'rgba(216, 180, 254, ', // Purple-300
      'rgba(192, 132, 252, ', // Purple-400
      'rgba(255, 255, 255, ', // Soft white
      'rgba(251, 207, 232, ', // Rose-200
    ];

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.5,
        baseAlpha: Math.random() * 0.5 + 0.2,
        alpha: 0.3,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: -Math.random() * 0.3 - 0.05, // gentle upward drift
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        isHeart: i % 9 === 0, // small percentage are subtle floating hearts
      });
    }

    let time = 0;

    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      alpha: number,
      colorPrefix: string
    ) => {
      context.save();
      context.translate(x, y);
      context.beginPath();
      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);
      // top left curve
      context.bezierCurveTo(-size / 2, -topCurveHeight, -size, size / 3, 0, size);
      // top right curve
      context.bezierCurveTo(size, size / 3, size / 2, -topCurveHeight, 0, topCurveHeight);
      context.fillStyle = `${colorPrefix}${alpha * 0.6})`;
      context.fill();
      context.restore();
    };

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Subtle radiant glow overlay
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      );
      gradient.addColorStop(0, 'rgba(32, 18, 58, 0.35)');
      gradient.addColorStop(0.5, 'rgba(18, 14, 40, 0.25)');
      gradient.addColorStop(1, 'rgba(12, 10, 31, 0.55)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around smoothly
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Twinkle calculation
        p.alpha =
          p.baseAlpha + Math.sin(time * p.twinkleSpeed + p.twinkleOffset) * 0.25;
        const currentAlpha = Math.max(0.1, Math.min(0.9, p.alpha));

        if (p.isHeart) {
          drawHeart(ctx, p.x, p.y, p.radius * 3.5, currentAlpha, p.color);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${currentAlpha})`;
          ctx.shadowBlur = p.radius * 4;
          ctx.shadowColor = 'rgba(244, 114, 182, 0.4)';
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Soft romantic background gradient glows */}
      <div 
        className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[900px] h-[600px] rounded-full blur-[140px] opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(236, 72, 153, 0.25) 50%, transparent 80%)',
        }}
      />
      <div 
        className="absolute top-[45%] -right-[15%] w-[65vw] max-w-[650px] h-[550px] rounded-full blur-[160px] opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.35) 0%, rgba(99, 102, 241, 0.2) 60%, transparent 80%)',
        }}
      />
      <div 
        className="absolute bottom-[10%] -left-[10%] w-[60vw] max-w-[600px] h-[500px] rounded-full blur-[150px] opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(251, 113, 133, 0.25) 50%, transparent 80%)',
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
