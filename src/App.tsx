import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { DEFAULT_CONFIG } from './config';
import { SiteConfig } from './types';
import { ParticleBackground } from './components/ParticleBackground';
import { MusicPlayer } from './components/MusicPlayer';
import { LoadingScreen } from './components/LoadingScreen';
import { Section1Surprise } from './components/Section1Surprise';
import { Section2HerWords } from './components/Section2HerWords';
import { Section3MyAnswer } from './components/Section3MyAnswer';
import { Section4Reasons } from './components/Section4Reasons';
import { Section5Memories } from './components/Section5Memories';
import { Section6Secret } from './components/Section6Secret';
import { Section7Final } from './components/Section7Final';
import { StoryProgress } from './components/StoryProgress';
import { CustomizeModal } from './components/CustomizeModal';
import { TouchHeartEffect } from './components/TouchHeartEffect';

const CONFIG_STORAGE_KEY = 'romantic_confession_config_v5';

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return DEFAULT_CONFIG;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(1);
  const totalSections = 7;

  // Smooth scroll to top when changing sections
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection]);

  const handleNextSection = () => {
    if (currentSection < totalSections) {
      setCurrentSection((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentSection(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(newConfig));
    } catch {
      // ignore
    }
  };

  const handleResetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    try {
      localStorage.removeItem(CONFIG_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0c0a1f] text-[#f7f5ff] overflow-x-hidden flex flex-col justify-between selection:bg-pink-500/30 selection:text-pink-100">
      {/* Ambient background particles & cosmic dust */}
      <ParticleBackground />

      {/* Interactive touch bubbles and hearts rising effect */}
      <TouchHeartEffect />

      {/* Background Audio Control with Hindi romantic song */}
      <MusicPlayer customAudioSrc={config.audioFile} />

      {/* In-browser Customizer Drawer for easy editing */}
      <CustomizeModal
        config={config}
        onUpdateConfig={handleUpdateConfig}
        onResetConfig={handleResetConfig}
      />

      {/* Initial Loading Screen */}
      {isLoading ? (
        <LoadingScreen
          herName={config.herName}
          onComplete={() => setIsLoading(false)}
        />
      ) : (
        <main className="relative z-10 flex-1 flex flex-col justify-center pb-20 pt-10">
          <AnimatePresence mode="wait">
            {currentSection === 1 && (
              <motion.section
                key="section-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                <Section1Surprise
                  herName={config.herName}
                  onNext={handleNextSection}
                />
              </motion.section>
            )}

            {currentSection === 2 && (
              <motion.section
                key="section-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                <Section2HerWords
                  herName={config.herName}
                  onNext={handleNextSection}
                />
              </motion.section>
            )}

            {currentSection === 3 && (
              <motion.section
                key="section-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                <Section3MyAnswer
                  herName={config.herName}
                  confessionText={config.mainMessage}
                  onNext={handleNextSection}
                />
              </motion.section>
            )}

            {currentSection === 4 && (
              <motion.section
                key="section-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                <Section4Reasons
                  reasons={config.reasons}
                  herName={config.herName}
                  onNext={handleNextSection}
                />
              </motion.section>
            )}

            {currentSection === 5 && (
              <motion.section
                key="section-5"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                <Section5Memories
                  memories={config.memories}
                  onNext={handleNextSection}
                />
              </motion.section>
            )}

            {currentSection === 6 && (
              <motion.section
                key="section-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                <Section6Secret
                  secretMessage={config.secretMessage}
                  onNext={handleNextSection}
                />
              </motion.section>
            )}

            {currentSection === 7 && (
              <motion.section
                key="section-7"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                <Section7Final
                  herName={config.herName}
                  myName={config.myName}
                  finalMessage={config.finalMessage}
                  finalSubMessage={config.finalSubMessage}
                  onRestart={handleRestart}
                />
              </motion.section>
            )}
          </AnimatePresence>

          {/* Chapter navigation dots at bottom */}
          <StoryProgress
            currentSection={currentSection}
            totalSections={totalSections}
            onSelectSection={(idx) => setCurrentSection(idx)}
          />
        </main>
      )}
    </div>
  );
}
