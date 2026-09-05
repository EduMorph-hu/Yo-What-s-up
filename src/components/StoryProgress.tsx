import React from 'react';

interface StoryProgressProps {
  currentSection: number;
  totalSections: number;
  onSelectSection: (sectionIndex: number) => void;
  sectionNames?: string[];
}

export const StoryProgress: React.FC<StoryProgressProps> = ({
  currentSection,
  totalSections,
  onSelectSection,
  sectionNames = [
    'Surprise',
    'Tumhari Baat',
    'Mera Jawaab',
    'Khaas Baatein',
    'Yaadein',
    'Secret',
    'Hamesha',
  ],
}) => {
  return (
    <nav
      aria-label="Story chapters"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full glass flex items-center gap-2 border border-white/10 shadow-2xl backdrop-blur-md"
    >
      {Array.from({ length: totalSections }).map((_, index) => {
        const isCurrent = currentSection === index + 1;
        const isPast = currentSection > index + 1;

        return (
          <button
            key={index}
            id={`nav-dot-section-${index + 1}`}
            onClick={() => onSelectSection(index + 1)}
            aria-label={`Jump to ${sectionNames[index] || `Section ${index + 1}`}`}
            className="group relative p-1 cursor-pointer focus:outline-none"
          >
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                isCurrent
                  ? 'w-7 accent-gradient shadow-md shadow-pink-500/50'
                  : isPast
                  ? 'w-2 bg-pink-400/60 hover:bg-pink-300'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
            {/* Tooltip on hover */}
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-[10px] font-mono tracking-tight bg-[#0c0a1f]/95 text-pink-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-pink-500/20 shadow-xl">
              {sectionNames[index] || `Part ${index + 1}`}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
