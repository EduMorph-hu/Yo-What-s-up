import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Heart, Sun, Moon, Smile, Flame, Star } from 'lucide-react';
import { ReasonItem } from '../types';

interface Section4ReasonsProps {
  reasons: ReasonItem[];
  herName: string;
  onNext: () => void;
}

const getIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Heart':
      return <Heart className="w-5 h-5 text-pink-400" />;
    case 'Sun':
      return <Sun className="w-5 h-5 text-amber-300" />;
    case 'Moon':
      return <Moon className="w-5 h-5 text-indigo-300" />;
    case 'Smile':
      return <Smile className="w-5 h-5 text-rose-300" />;
    case 'Flame':
      return <Flame className="w-5 h-5 text-orange-400" />;
    case 'Star':
      return <Star className="w-5 h-5 text-yellow-300" />;
    default:
      return <Sparkles className="w-5 h-5 text-pink-300" />;
  }
};

export const Section4Reasons: React.FC<Section4ReasonsProps> = ({ reasons, herName, onNext }) => {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass text-pink-300 text-[10px] sm:text-xs uppercase tracking-widest font-semibold mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            Wo baatein jo dil ko bhaa gayi
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-romantic font-semibold text-white tracking-tight text-glow">
            Kuch baatein jo mujhe tumhari pasand hain
          </h2>
          <p className="text-sm sm:text-base text-purple-200/80 font-light mt-2 max-w-md mx-auto">
            Sirf badi baatein nahi, balki tumhari wo pyari aadatein jo mera din bana deti hain.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full mb-12">
          {reasons.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className={`p-6 sm:p-7 rounded-2xl glass-card hover:glass-card-glow transition-all duration-300 flex flex-col justify-between relative group ${
                index === reasons.length - 1 && reasons.length % 2 !== 0
                  ? 'md:col-span-2 md:max-w-xl md:mx-auto w-full'
                  : ''
              }`}
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-tr-2xl blur-xl group-hover:bg-pink-500/15 transition-all duration-300 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-400/20 flex items-center justify-center group-hover:bg-pink-500/20 group-hover:border-pink-400/40 transition-all duration-300">
                    {getIcon(item.iconName)}
                  </div>
                  <span className="text-xs font-mono font-medium text-pink-300/60 tracking-wider">
                    {item.number}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-serif-romantic font-semibold text-pink-100 mb-2 group-hover:text-pink-200 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-purple-100/80 font-light leading-relaxed">
                  "{item.description}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-pink-300/60 font-mono">
                <span>Pyari si baat</span>
                <Heart className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-pink-400 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Next Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <button
            id="section4-memories-btn"
            onClick={onNext}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full accent-gradient hover:opacity-95 text-white font-medium text-base sm:text-lg shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-pink-300/40 cursor-pointer"
          >
            <span>Humari kuch pyari yaadein</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
