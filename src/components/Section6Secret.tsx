import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, Mail, Heart, Sparkles, ArrowRight } from 'lucide-react';

interface Section6SecretProps {
  secretMessage: string;
  onNext: () => void;
}

export const Section6Secret: React.FC<Section6SecretProps> = ({ secretMessage, onNext }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="max-w-xl mx-auto w-full flex flex-col items-center z-10">
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass text-pink-300 text-[10px] sm:text-xs tracking-widest uppercase font-semibold border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            Sirf humare beech ki baat
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif-romantic font-semibold text-white mb-8 text-glow"
        >
          Ek chhota sa secret…
        </motion.h2>

        {/* Interactive Envelope / Lock Box */}
        <div className="w-full mb-8">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="closed-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                {/* Glowing Sealed Envelope Card */}
                <div className="relative p-10 rounded-3xl glass-card-glow max-w-md w-full flex flex-col items-center border border-pink-500/30 shadow-2xl mb-8 group">
                  <div className="relative w-20 h-20 rounded-2xl accent-gradient flex items-center justify-center mb-5 shadow-lg shadow-pink-500/30 group-hover:scale-110 transition-transform duration-300 border border-white/20">
                    <Mail className="w-10 h-10 text-white" />
                    <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-rose-600 flex items-center justify-center text-white border border-rose-300 shadow-md">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <p className="text-sm sm:text-base font-serif-romantic text-purple-200/90 mb-2">
                    Ek aisi baat jo sirf tumhare liye dil se likhi hai.
                  </p>
                  <span className="text-xs text-pink-300/70 font-mono">
                    (Padhne ke liye niche click karo)
                  </span>
                </div>

                {/* Open Button */}
                <button
                  id="section6-open-secret-btn"
                  onClick={() => setIsOpen(true)}
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full accent-gradient hover:opacity-95 text-white font-medium text-base sm:text-lg shadow-xl shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all duration-300 border border-pink-200/40 cursor-pointer"
                >
                  <Unlock className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                  <span>Chitthi kholo 💌</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="open-state"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }}
                className="relative p-8 sm:p-10 rounded-3xl glass-card-glow max-w-lg w-full mx-auto border border-pink-400/40 shadow-2xl flex flex-col items-center"
              >
                {/* Subtle envelope stamp decor */}
                <div className="w-12 h-12 rounded-full accent-gradient flex items-center justify-center mb-6 shadow-md shadow-pink-500/30 border border-white/30">
                  <Heart className="w-6 h-6 text-white fill-white animate-heart-pulse" />
                </div>

                <span className="text-xs uppercase tracking-widest text-pink-300/90 font-mono mb-4">
                  Dil se tumhare liye
                </span>

                <blockquote className="text-lg sm:text-2xl font-serif-romantic font-medium text-pink-100 leading-relaxed italic mb-8 relative">
                  “{secretMessage}”
                </blockquote>

                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-400/40 to-transparent mb-8" />

                {/* Button to Final Section */}
                <button
                  id="section6-final-chapter-btn"
                  onClick={onNext}
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full accent-gradient hover:opacity-95 text-white font-medium text-base sm:text-lg shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-pink-300/40 cursor-pointer"
                >
                  <span>Aakhri sandesh dekho</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
