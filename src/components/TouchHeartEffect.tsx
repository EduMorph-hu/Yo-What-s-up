import React, { useEffect, useState, useCallback, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'heart' | 'bubble';
  color: string;
  driftX: number;
  distanceY: number;
  duration: number;
  rotation: number;
}

const HEART_COLORS = [
  '#f472b6', // pink-400
  '#fb7185', // rose-400
  '#fda4af', // rose-300
  '#e879f9', // fuchsia-400
  '#f43f5e', // rose-500
  '#ec4899', // pink-500
  '#ffb6c1', // light pink
];

let particleIdCounter = 0;

export const TouchHeartEffect: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastMoveTimeRef = useRef(0);

  const spawnParticles = useCallback((clientX: number, clientY: number, count: number = 4) => {
    const newItems: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particleIdCounter++;
      // Alternate between hearts and bubbles or randomly choose
      const isBubble = i % 2 === 0;
      const size = isBubble ? 18 + Math.random() * 22 : 16 + Math.random() * 18;
      const angle = (Math.random() - 0.5) * 60; // slight spread
      const driftX = (Math.random() - 0.5) * 50;
      const distanceY = 120 + Math.random() * 140;
      const duration = 1.4 + Math.random() * 0.9;
      const rotation = (Math.random() - 0.5) * 50;
      const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];

      newItems.push({
        id: particleIdCounter,
        x: clientX + (Math.random() - 0.5) * 20,
        y: clientY + (Math.random() - 0.5) * 20,
        size,
        type: isBubble ? 'bubble' : 'heart',
        color,
        driftX,
        distanceY,
        duration,
        rotation: angle + rotation,
      });
    }

    setParticles((prev) => {
      // Keep max 45 particles in DOM at once for 60fps smoothness
      const combined = [...prev, ...newItems];
      if (combined.length > 45) {
        return combined.slice(combined.length - 45);
      }
      return combined;
    });
  }, []);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      // Spawn burst of hearts and bubbles on tap / click
      spawnParticles(e.clientX, e.clientY, 5);
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Only spawn if pointer is down (dragging on phone/mouse press) or throttled
      if (e.buttons > 0 || e.pointerType === 'touch') {
        const now = Date.now();
        if (now - lastMoveTimeRef.current > 70) {
          lastMoveTimeRef.current = now;
          spawnParticles(e.clientX, e.clientY, 2);
        }
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [spawnParticles]);

  // Clean up old particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setInterval(() => {
      const now = Date.now();
      // Remove any particles that have exceeded max lifespan
      setParticles((prev) => (prev.length > 35 ? prev.slice(-25) : prev));
    }, 1500);
    return () => clearInterval(timer);
  }, [particles.length]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-40 overflow-hidden select-none"
      aria-hidden="true"
    >
      <style>{`
        @keyframes floatHeartBubble {
          0% {
            transform: translate(0, 0) scale(0.3) rotate(0deg);
            opacity: 0.95;
          }
          40% {
            opacity: 0.9;
            transform: translate(var(--drift-x-half), calc(var(--dist-y) * -0.4)) scale(1.15) rotate(var(--rot-mid));
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translate(var(--drift-x), calc(var(--dist-y) * -1)) scale(0.85) rotate(var(--rot-end));
            opacity: 0;
          }
        }
        .touch-particle {
          animation: floatHeartBubble var(--particle-dur) cubic-bezier(0.25, 0.8, 0.45, 1) forwards;
          will-change: transform, opacity;
        }
      `}</style>

      {particles.map((p) => {
        const style = {
          left: `${p.x}px`,
          top: `${p.y}px`,
          width: `${p.size}px`,
          height: `${p.size}px`,
          '--drift-x': `${p.driftX}px`,
          '--drift-x-half': `${p.driftX * 0.5}px`,
          '--dist-y': `${p.distanceY}px`,
          '--particle-dur': `${p.duration}s`,
          '--rot-mid': `${p.rotation * 0.5}deg`,
          '--rot-end': `${p.rotation}deg`,
        } as React.CSSProperties;

        if (p.type === 'bubble') {
          return (
            <div
              key={p.id}
              style={style}
              className="touch-particle absolute rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 shadow-lg"
            >
              {/* Iridescent soap-bubble / glowing sphere effect */}
              <div
                className="w-full h-full rounded-full border border-pink-200/40 relative overflow-hidden"
                style={{
                  background:
                    'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.85) 0%, rgba(244, 114, 182, 0.4) 40%, rgba(168, 85, 247, 0.25) 75%, rgba(255, 255, 255, 0.1) 100%)',
                  boxShadow:
                    'inset 0 0 6px rgba(255, 255, 255, 0.8), 0 0 10px rgba(244, 114, 182, 0.4)',
                }}
              >
                {/* Tiny top-left reflection highlight */}
                <div className="absolute top-1 left-1.5 w-1.5 h-1.5 rounded-full bg-white/90" />
              </div>
            </div>
          );
        }

        // Rising romantic heart
        return (
          <div
            key={p.id}
            style={style}
            className="touch-particle absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
          >
            <svg
              viewBox="0 0 24 24"
              width={p.size}
              height={p.size}
              fill={p.color}
              className="filter drop-shadow-[0_0_8px_rgba(244,114,182,0.7)]"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        );
      })}
    </div>
  );
};
