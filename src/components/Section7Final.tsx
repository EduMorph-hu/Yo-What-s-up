import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';

interface Section7FinalProps {
  herName: string;
  myName: string;
  finalMessage: string;
  finalSubMessage?: string;
  onRestart: () => void;
}

/**
 * Blooming Flower / Rose Animated SVG Component
 */
const BloomingFlower: React.FC = () => {
  return (
    <div className="relative w-44 h-44 sm:w-56 sm:h-56 mx-auto mb-8 flex items-center justify-center">
      {/* Background radial glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500/20 via-rose-500/25 to-purple-500/10 blur-2xl animate-pulse" />

      <svg
        viewBox="0 0 200 200"
        className="w-full h-full relative z-10 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft stem and leaves */}
        <motion.path
          d="M100 135 Q100 170 95 190"
          stroke="rgba(110, 231, 183, 0.45)"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
        <motion.path
          d="M98 155 Q80 150 75 160 Q85 165 97 158"
          fill="rgba(110, 231, 183, 0.35)"
          stroke="rgba(110, 231, 183, 0.5)"
          strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        />
        <motion.path
          d="M99 148 Q118 142 124 152 Q112 158 98 151"
          fill="rgba(110, 231, 183, 0.35)"
          stroke="rgba(110, 231, 183, 0.5)"
          strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.0, duration: 1 }}
        />

        {/* Outer Petals Layer 1 (Blooming outwards) */}
        <g transform="translate(100, 100)">
          {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
            <motion.path
              key={`outer-${angle}`}
              d="M0 0 C-22 -40 22 -40 0 0"
              fill="url(#petal-grad-outer)"
              stroke="rgba(244, 114, 182, 0.4)"
              strokeWidth="1"
              transform={`rotate(${angle})`}
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.85 }}
              transition={{
                delay: 0.4 + idx * 0.12,
                duration: 1.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ))}

          {/* Middle Petals Layer 2 (Slightly offset) */}
          {[30, 90, 150, 210, 270, 330].map((angle, idx) => (
            <motion.path
              key={`mid-${angle}`}
              d="M0 0 C-18 -32 18 -32 0 0"
              fill="url(#petal-grad-mid)"
              stroke="rgba(251, 113, 133, 0.5)"
              strokeWidth="1"
              transform={`rotate(${angle})`}
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: 0.95, opacity: 0.95 }}
              transition={{
                delay: 0.9 + idx * 0.12,
                duration: 1.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ))}

          {/* Inner Heart Core */}
          <motion.circle
            r="12"
            fill="url(#core-grad)"
            initial={{ scale: 0 }}
            animate={{ scale: [0.8, 1.15, 1] }}
            transition={{ delay: 1.8, duration: 1.2, repeat: Infinity, repeatType: 'reverse' }}
          />
        </g>

        {/* Gradient Defs */}
        <defs>
          <radialGradient id="core-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="70%" stopColor="#db2777" />
            <stop offset="100%" stopColor="#9d174d" />
          </radialGradient>
          <linearGradient id="petal-grad-outer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#831843" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="petal-grad-mid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export const Section7Final: React.FC<Section7FinalProps> = ({
  herName,
  myName,
  finalMessage,
  finalSubMessage,
  onRestart,
}) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="max-w-2xl mx-auto w-full flex flex-col items-center z-10">
        {/* Slowly blooming romantic flower animation */}
        <BloomingFlower />

        {/* Text Sequence */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <p className="text-xl sm:text-2xl font-serif-romantic text-purple-200/90 font-light">
            Toh bas… yahi hai mera dil se jawaab.
          </p>
        </motion.div>

        {/* Haan. ❤️ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={revealed ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="my-3"
        >
          <h2 className="text-5xl sm:text-7xl font-serif-romantic font-bold text-white text-glow tracking-tight">
            Haan. ❤️
          </h2>
        </motion.div>

        {/* Hamesha tum hi ho. */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mb-8"
        >
          <p className="text-2xl sm:text-3xl font-serif-romantic text-pink-200 font-medium">
            Hamesha tum hi ho.
          </p>
        </motion.div>

        {/* Final customizable message box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.7, duration: 0.9 }}
          className="p-6 sm:p-8 rounded-3xl glass-card-glow max-w-lg w-full mb-12 border border-pink-400/30 shadow-2xl"
        >
          <p className="text-base sm:text-xl font-serif-romantic text-purple-100/95 leading-relaxed italic mb-4">
            “{finalMessage}”
          </p>

          {finalSubMessage && (
            <p className="text-xs sm:text-sm text-pink-300/80 font-sans tracking-wide font-medium">
              {finalSubMessage}
            </p>
          )}

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-pink-300/70 font-mono">
            <span>Hamesha aur poore dil se</span>
            {myName && myName !== 'My Name' && (
              <span className="font-semibold text-pink-200">— {myName}</span>
            )}
          </div>
        </motion.div>

        {/* Footer Interaction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ delay: 2.3, duration: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-xs sm:text-sm text-pink-200/90 font-serif-romantic shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Khaas taur pe {herName && herName !== 'Her Name' ? herName : 'tumhare'} liye banaya</span>
            <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
          </div>

          <button
            id="restart-story-btn"
            onClick={onRestart}
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass hover:bg-white/10 text-xs sm:text-sm text-purple-200 hover:text-white transition-all duration-300 border border-white/10 hover:border-pink-400/40 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 transition-transform duration-500 group-hover:-rotate-180" />
            <span>Shuru se dubara dekhein ↻</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
