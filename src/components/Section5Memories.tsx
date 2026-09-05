import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Calendar, Heart, Eye, X, Image as ImageIcon } from 'lucide-react';
import { MemoryItem } from '../types';

interface Section5MemoriesProps {
  memories: MemoryItem[];
  onNext: () => void;
}

export const Section5Memories: React.FC<Section5MemoriesProps> = ({ memories, onNext }) => {
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass text-pink-300 text-[10px] sm:text-xs tracking-widest uppercase font-semibold mb-3 border border-white/10">
            <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
            Pyari Yaadein
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-romantic font-semibold text-white tracking-tight text-glow">
            Wo pal jo main hamesha yaad rakhna chahta hoon ❤️
          </h2>
          <p className="text-sm sm:text-base text-purple-200/80 font-light mt-2 max-w-md mx-auto">
            Yeh chhote-chhote lamhe mere dil ke bohot kareeb hain.
          </p>
        </motion.div>

        {/* Memories Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full mb-12">
          {memories.map((mem, index) => (
            <motion.div
              key={mem.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedMemory(mem)}
              className="group cursor-pointer rounded-2xl glass-card hover:glass-card-glow transition-all duration-300 overflow-hidden flex flex-col border border-white/10"
            >
              {/* Photo / Gradient Frame with portrait aspect ratio */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#120f24]">
                {mem.imageUrl ? (
                  <img
                    src={mem.imageUrl}
                    alt={mem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      // fallback to gradient if path fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${mem.gradient} flex flex-col items-center justify-center p-6 text-center relative overflow-hidden`}
                  >
                    {/* Atmospheric artwork background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(244,114,182,0.18),transparent_70%)]" />
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-6 h-6 text-pink-200" />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-pink-200/60 font-mono">
                      {mem.tag}
                    </span>
                    <span className="text-sm font-serif-romantic text-pink-100/80 mt-1 italic">
                      Yaad dekhne ke liye tap karein
                    </span>
                  </div>
                )}

                {/* Date / Tag Overlay */}
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[11px] font-mono text-pink-200 flex items-center gap-1.5 shadow-md">
                  <Calendar className="w-3 h-3 text-pink-300" />
                  <span>{mem.date}</span>
                </div>

                {/* Romantic view overlay indicator */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/80 backdrop-blur-md text-white text-xs font-medium shadow-lg">
                    <Eye className="w-3.5 h-3.5" />
                    Badi photo dekhein
                  </span>
                </div>
              </div>

              {/* Memory Caption Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono text-pink-400 font-medium tracking-wider uppercase block mb-1">
                    {mem.tag}
                  </span>
                  <h3 className="text-lg font-serif-romantic font-semibold text-white group-hover:text-pink-200 transition-colors leading-snug mb-2">
                    {mem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-200/80 font-light leading-relaxed">
                    {mem.caption}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-pink-300/60">
                  <span className="italic">Dil mein basi hui yaad</span>
                  <Heart className="w-3.5 h-3.5 text-pink-400/80 fill-pink-400/20" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for detailed memory view */}
        <AnimatePresence>
          {selectedMemory && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedMemory(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-lg w-full rounded-3xl glass-card-glow p-6 border border-pink-400/30 overflow-hidden shadow-2xl"
              >
                <button
                  id="close-memory-modal-btn"
                  onClick={() => setSelectedMemory(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-20 cursor-pointer"
                  aria-label="Close memory view"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative w-full rounded-2xl overflow-hidden mb-5 bg-[#0f0d20] border border-white/10 flex items-center justify-center min-h-[260px] max-h-[58vh]">
                  {selectedMemory.imageUrl ? (
                    <>
                      {/* Blurred ambient background behind image */}
                      <img
                        src={selectedMemory.imageUrl}
                        alt=""
                        aria-hidden="true"
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-110 pointer-events-none"
                      />
                      <img
                        src={selectedMemory.imageUrl}
                        alt={selectedMemory.title}
                        referrerPolicy="no-referrer"
                        className="relative z-10 max-h-[58vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                      />
                    </>
                  ) : (
                    <div
                      className={`w-full h-full py-12 bg-gradient-to-br ${selectedMemory.gradient} flex flex-col items-center justify-center p-6 text-center`}
                    >
                      <ImageIcon className="w-12 h-12 text-pink-300/80 mb-3" />
                      <p className="text-sm font-serif-romantic text-pink-200">
                        Pyari Tasveer
                      </p>
                      <p className="text-xs text-purple-200/60 max-w-xs mt-1 font-mono">
                        (Photo link customize modal mein add kar sakte hain)
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300">
                    {selectedMemory.date}
                  </span>
                  <span className="text-xs text-purple-300/60 font-mono">
                    {selectedMemory.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-serif-romantic font-bold text-white mb-2">
                  {selectedMemory.title}
                </h3>
                <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed font-light mb-6">
                  {selectedMemory.caption}
                </p>

                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedMemory(null)}
                    className="px-5 py-2 rounded-full glass hover:border-pink-400/50 text-pink-200 text-sm transition-all cursor-pointer"
                  >
                    Band karein
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Section 5 Next Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <button
            id="section5-secret-btn"
            onClick={onNext}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full accent-gradient hover:opacity-95 text-white font-medium text-base sm:text-lg shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-pink-300/40 cursor-pointer"
          >
            <span>Ek aakhri baat aur hai…</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
