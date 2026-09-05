import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

interface MusicPlayerProps {
  customAudioSrc?: string;
}

/**
 * =========================================================================
 * 🎵 ROMANTIC MUSIC PLAYER COMPONENT
 * =========================================================================
 * - Default state is OFF (respects mobile autoplay policies).
 * - If you provide an audio file URL in `config.ts` (e.g. '/my-song.mp3'),
 *   it will play your MP3 directly!
 * - If no audio file is specified, it plays a built-in soothing,
 *   copyright-free romantic ambient chime melody using Web Audio API!
 * =========================================================================
 */
export const MusicPlayer: React.FC<MusicPlayerProps> = ({ customAudioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Web Audio synth synthesizer state as backup
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  // Initialize synth for backup romantic melody
  const startRomanticSynth = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Gentle Pentatonic / Romantic chords (Fmaj7, Cmaj7, Am7, Dm7)
      const chordProgressions = [
        [349.23, 440.0, 523.25, 659.25], // Fmaj7 (F4, A4, C5, E5)
        [261.63, 329.63, 392.0, 493.88], // Cmaj7 (C4, E4, G4, B4)
        [220.0, 261.63, 329.63, 392.0],  // Am7 (A3, C4, E4, G4)
        [293.66, 349.23, 440.0, 523.25], // Dm7 (D4, F4, A4, C5)
      ];

      let chordIndex = 0;

      const playChimeNote = (freq: number, delay: number) => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
        const now = audioCtxRef.current.currentTime + delay;

        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.045, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);

        osc.start(now);
        osc.stop(now + 3.0);
      };

      const triggerArpeggio = () => {
        const chord = chordProgressions[chordIndex];
        chordIndex = (chordIndex + 1) % chordProgressions.length;

        chord.forEach((freq, i) => {
          playChimeNote(freq, i * 0.45);
        });

        if (Math.random() > 0.4) {
          const highFreq = chord[Math.floor(Math.random() * chord.length)] * 2;
          playChimeNote(highFreq, 1.8);
        }
      };

      triggerArpeggio();
      if (!synthIntervalRef.current) {
        synthIntervalRef.current = window.setInterval(triggerArpeggio, 4200);
      }
    } catch (err) {
      console.warn('Web Audio could not be initialized:', err);
    }
  };

  const stopRomanticSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  const playMusic = () => {
    setHasInteracted(true);
    if (customAudioSrc && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          startRomanticSynth();
          setIsPlaying(true);
        });
    } else {
      startRomanticSynth();
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    setHasInteracted(true);
    if (isPlaying) {
      if (customAudioSrc && audioRef.current) {
        audioRef.current.pause();
      } else {
        stopRomanticSynth();
      }
      setIsPlaying(false);
    } else {
      playMusic();
    }
  };

  // Auto-play on mount or on first user interaction anywhere on the page
  useEffect(() => {
    const startAudioOnFirstInteraction = () => {
      playMusic();
      window.removeEventListener('pointerdown', startAudioOnFirstInteraction);
      window.removeEventListener('touchstart', startAudioOnFirstInteraction);
      window.removeEventListener('click', startAudioOnFirstInteraction);
      window.removeEventListener('keydown', startAudioOnFirstInteraction);
    };

    const audioSource = customAudioSrc || '/i-love-you-hindi.mp3';

    // Try immediate autoplay
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch(() => {
          // Autoplay blocked by browser until user touches page
          window.addEventListener('pointerdown', startAudioOnFirstInteraction, { once: true, passive: true });
          window.addEventListener('touchstart', startAudioOnFirstInteraction, { once: true, passive: true });
          window.addEventListener('click', startAudioOnFirstInteraction, { once: true, passive: true });
          window.addEventListener('keydown', startAudioOnFirstInteraction, { once: true, passive: true });
        });
    } else {
      window.addEventListener('pointerdown', startAudioOnFirstInteraction, { once: true, passive: true });
      window.addEventListener('touchstart', startAudioOnFirstInteraction, { once: true, passive: true });
      window.addEventListener('click', startAudioOnFirstInteraction, { once: true, passive: true });
      window.addEventListener('keydown', startAudioOnFirstInteraction, { once: true, passive: true });
    }

    return () => {
      window.removeEventListener('pointerdown', startAudioOnFirstInteraction);
      window.removeEventListener('touchstart', startAudioOnFirstInteraction);
      window.removeEventListener('click', startAudioOnFirstInteraction);
      window.removeEventListener('keydown', startAudioOnFirstInteraction);
      stopRomanticSynth();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [customAudioSrc]);

  const activeSrc = customAudioSrc || '/i-love-you-hindi.mp3';

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <audio
        ref={audioRef}
        src={activeSrc}
        loop
        autoPlay
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Floating music control button */}
      <button
        id="romantic-music-toggle-btn"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Mute romantic Hindi music" : "Play romantic Hindi music"}
        title="I Love You - Ash King & Clinton (Bodyguard)"
        className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 text-xs sm:text-sm backdrop-blur-md shadow-xl cursor-pointer ${
          isPlaying
            ? 'glass border-pink-400/50 text-pink-200 shadow-pink-500/25 bg-pink-500/20'
            : 'glass hover:bg-white/10 border-white/10 text-pink-200/80 hover:text-pink-100 shadow-black/50'
        }`}
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-3.5 w-3.5 mr-0.5">
              <span className="w-1 bg-pink-300 rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
              <span className="w-1 bg-pink-400 rounded-full animate-[bounce_1s_infinite_300ms] h-3/4" />
              <span className="w-1 bg-pink-200 rounded-full animate-[bounce_1s_infinite_200ms] h-4/5" />
            </div>
          ) : (
            <VolumeX className="w-4 h-4 opacity-70" />
          )}
        </div>

        <span className="inline font-medium tracking-wide">
          {isPlaying ? "♪ I Love You (Hindi)" : "Play Hindi Song"}
        </span>

        {/* First time hint bubble if she hasn't interacted */}
        {!hasInteracted && !isPlaying && (
          <span className="absolute -bottom-8 right-0 whitespace-nowrap text-[11px] text-pink-300/90 bg-[#0c0a1f]/95 border border-pink-500/30 px-2.5 py-0.5 rounded-full shadow-lg pointer-events-none transition-opacity duration-500 font-mono">
            ♪ gaana sunne ke liye touch karein
          </span>
        )}
      </button>
    </div>
  );
};
