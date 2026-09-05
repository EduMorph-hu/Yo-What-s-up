import React from 'react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface Section1SurpriseProps {
  herName: string;
  onNext: () => void;
}

export const Section1Surprise: React.FC<Section1SurpriseProps> = ({ herName, onNext }) => {
  const displayName = herName && herName !== 'Her Name' ? herName : 'you';

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-12">
      {/* Decorative ambient elements */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-xl mx-auto flex flex-col items-center z-10"
      >
        {/* Soft tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-pink-300 text-xs sm:text-sm font-medium tracking-wide mb-8 border border-white/10 shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span className="text-[11px] sm:text-xs uppercase tracking-widest text-pink-300/90 font-semibold">Sirf tumhare liye ek pyari si kahani</span>
          <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
        </motion.div>

        {/* Hey you... */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif-romantic font-semibold tracking-tight text-pink-100 mb-6 text-glow"
        >
          Suno {displayName}… 👀
        </motion.h1>

        {/* I made something for you */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="text-xl sm:text-2xl md:text-3xl font-serif-romantic text-purple-100/95 leading-relaxed font-normal mb-4"
        >
          Maine tumhare liye kuch banaya hai.
        </motion.p>

        {/* Please don't skip ahead */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="text-sm sm:text-base text-pink-300/80 font-light italic mb-10 max-w-md"
        >
          Aaram se dekhna… jaldi mat karna ❤️
        </motion.p>

        {/* Animated Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <button
            id="section1-show-me-btn"
            onClick={onNext}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full accent-gradient hover:opacity-95 text-white font-medium text-base sm:text-lg shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-pink-300/40 cursor-pointer"
          >
            <span>Haan, dikhao na 👀</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
