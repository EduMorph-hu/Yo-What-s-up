import React, { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
  herName?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, herName }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 700);
          }, 350);
          return 100;
        }
        return prev + 4;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0c0a1f] transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Glowing floating heart */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-pink-500/25 blur-xl scale-150 animate-pulse" />
          <div className="relative w-16 h-16 rounded-full accent-gradient flex items-center justify-center shadow-lg shadow-pink-500/30 animate-heart-pulse">
            <Heart className="w-8 h-8 text-white fill-white/80" />
          </div>
          <Sparkles className="absolute -top-1 -right-2 w-5 h-5 text-purple-300 animate-twinkle" />
        </div>

        {/* Text */}
        <p className="text-xl sm:text-2xl font-serif-romantic text-pink-100 tracking-wide mb-2 font-medium text-glow">
          Tumhare liye kuch khaas banaya hai… ❤️
        </p>

        {herName && herName !== "Her Name" && (
          <p className="text-xs text-pink-300/80 mb-4 font-sans tracking-widest uppercase font-semibold">
            {herName} ke liye
          </p>
        )}

        {/* Progress line */}
        <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden mt-4">
          <div
            className="h-full accent-gradient transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-[11px] text-purple-200/60 mt-3 font-mono">
          har ek lafz dil se sajaya ja raha hai…
        </span>
      </div>
    </div>
  );
};
