import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Heart } from 'lucide-react';

interface Section2HerWordsProps {
  onNext: () => void;
  herName: string;
}

export const Section2HerWords: React.FC<Section2HerWordsProps> = ({ onNext, herName }) => {
  const [stage, setStage] = useState<number>(0);
  const [typedText, setTypedText] = useState<string>('');
  const targetQuote = "“I LOVE YOU.”";

  useEffect(() => {
    // Stage 0: Introductory text appears immediately
    // Stage 1: Pause, then start typing the three words
    const stage1Timer = setTimeout(() => {
      setStage(1);
    }, 1400);

    return () => clearTimeout(stage1Timer);
  }, []);

  // Typewriter effect for "I LOVE YOU."
  useEffect(() => {
    if (stage >= 1 && typedText.length < targetQuote.length) {
      const typeSpeed = 120;
      const timer = setTimeout(() => {
        setTypedText(targetQuote.slice(0, typedText.length + 1));
      }, typeSpeed);
      return () => clearTimeout(timer);
    } else if (stage === 1 && typedText.length === targetQuote.length) {
      // Once finished typing, advance to stage 2 (show remaining thoughts)
      const stage2Timer = setTimeout(() => {
        setStage(2);
      }, 700);
      return () => clearTimeout(stage2Timer);
    }
  }, [stage, typedText]);

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="max-w-2xl mx-auto flex flex-col items-center z-10 w-full">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass text-[10px] sm:text-xs uppercase tracking-widest text-pink-300 font-semibold mb-3 border border-white/10">
            Wo ek pyara sa lamha
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-romantic text-purple-100/90 font-light mt-3">
            Tumne mujhse wo teen lafz kahe the…
          </h2>
        </motion.div>

        {/* Cinematic Typewriter Reveal Box */}
        <div className="min-h-[110px] sm:min-h-[140px] flex items-center justify-center mb-8 w-full">
          {stage >= 1 && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative px-6 py-5 sm:px-10 sm:py-7 rounded-3xl glass-card-glow max-w-lg w-full border border-pink-500/30"
            >
              <span className="text-3xl sm:text-4xl md:text-5xl font-serif-romantic font-bold tracking-wider text-pink-200 text-glow inline-block">
                {typedText}
                {typedText.length < targetQuote.length && (
                  <span className="inline-block w-1 h-7 sm:h-9 bg-pink-400 ml-1.5 animate-pulse align-middle" />
                )}
              </span>

              {/* Little floating heart decor */}
              <Heart className="absolute -top-3 -right-3 w-7 h-7 text-pink-400 fill-pink-500/30 animate-twinkle" />
            </motion.div>
          )}
        </div>

        {/* Follow up text and button */}
        <AnimatePresence>
          {stage >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <p className="text-base sm:text-xl font-serif-romantic text-purple-200/90 max-w-md mb-8 leading-relaxed">
                Aur sach kahoon toh… mujhe samajh nahi aaya ki sirf ek message mein kya jawaab doon.
              </p>

              <button
                id="section2-reply-btn"
                onClick={onNext}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full accent-gradient hover:opacity-95 text-white font-medium text-base sm:text-lg shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-pink-300/40 cursor-pointer"
              >
                <span>Isliye dil se yeh banaya… aage dekho</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
