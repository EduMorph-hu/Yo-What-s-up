import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Section3MyAnswerProps {
  onNext: () => void;
  herName: string;
  confessionText?: string;
}

export const Section3MyAnswer: React.FC<Section3MyAnswerProps> = ({
  onNext,
  herName,
  confessionText = 'HAAN, MAIN BHI TUMSE BOHOT PYAAR KARTA HOON ❤️',
}) => {
  // Step 0: Anticipation thoughts ("Maine bohot socha ki main kya kahoon...")
  // Step 1: Interactive question ("Ek aakhri sawaal... Taiyaar ho?")
  // Step 2: The big reveal ("HAAN, MAIN BHI TUMSE BOHOT PYAAR KARTA HOON ❤️" + confetti)
  const [step, setStep] = useState<number>(0);

  const triggerRomanticConfetti = () => {
    // Heart & petal themed confetti burst
    const count = 200;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#f472b6', '#ec4899', '#db2777', '#c084fc', '#ffffff', '#fb7185', '#ffd1dc'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.9,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleRevealAnswer = () => {
    setStep(2);
    triggerRomanticConfetti();
  };

  return (
    <div className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="max-w-2xl mx-auto flex flex-col items-center z-10 w-full">
        {/* Step 0: Anticipation */}
        {step === 0 && (
          <motion.div
            key="anticipation-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-serif-romantic text-purple-200/90 mb-4 font-light">
              Maine bohot socha ki main kya kahoon…
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif-romantic text-pink-200/90 font-medium mb-10">
              Aur phir mujhe samajh aaya…
            </p>

            <button
              id="section3-proceed-question-btn"
              onClick={() => setStep(1)}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:border-pink-400/40 text-pink-200 text-sm sm:text-base font-medium transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg"
            >
              <span>Ruko ek pal…</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}

        {/* Step 1: Interactive Question ("Okay… one last question.") */}
        {step === 1 && (
          <motion.div
            key="interactive-question-box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-10 rounded-3xl glass-card-glow max-w-lg w-full flex flex-col items-center border border-pink-400/30 shadow-2xl"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass text-[10px] sm:text-xs uppercase tracking-widest text-pink-300 font-semibold mb-4 border border-white/10">
              Ek aakhri sawaal
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-romantic text-white font-semibold mb-2">
              Suno…
            </h3>
            <p className="text-lg sm:text-2xl font-serif-romantic text-pink-100 mb-8">
              Mera jawaab sunne ke liye taiyaar ho?
            </p>

            <button
              id="section3-ready-yes-btn"
              onClick={handleRevealAnswer}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full accent-gradient hover:opacity-95 text-white font-medium text-lg sm:text-xl shadow-xl shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all duration-300 border border-pink-200/40 cursor-pointer"
            >
              <Heart className="w-5 h-5 text-white fill-white group-hover:scale-110 transition-transform" />
              <span>Haan, batao na 👀</span>
            </button>
          </motion.div>
        )}

        {/* Step 2: The Emotional Climax / Confession Reveal */}
        {step === 2 && (
          <motion.div
            key="confession-reveal-box"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.35 }}
            className="flex flex-col items-center w-full"
          >
            {/* Glowing confession badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full accent-gradient flex items-center justify-center mb-6 shadow-xl shadow-pink-500/35 border border-white/30"
            >
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white animate-heart-pulse" />
            </motion.div>

            {/* Confession Typography */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl sm:text-6xl md:text-7xl font-serif-romantic font-bold tracking-tight text-white text-glow mb-6"
            >
              {confessionText}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="text-lg sm:text-2xl font-serif-romantic text-purple-100/90 font-light max-w-lg mb-10 leading-relaxed"
            >
              Main bas yeh baat aise kehna chahta tha ki tum hamesha yaad rakho.
            </motion.p>

            {/* Next button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <button
                id="section3-theres-more-btn"
                onClick={onNext}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full accent-gradient hover:opacity-95 text-white font-medium text-base sm:text-lg shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-pink-300/40 cursor-pointer"
              >
                <span>Abhi aur bhi baatein hain…</span>
                <Sparkles className="w-5 h-5 text-pink-200 transition-transform duration-300 group-hover:rotate-12" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
