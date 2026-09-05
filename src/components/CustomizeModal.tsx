import React, { useState } from 'react';
import { Settings2, X, Check, Copy, Heart, RefreshCw, Sparkles, Image as ImageIcon } from 'lucide-react';
import { SiteConfig } from '../types';

interface CustomizeModalProps {
  config: SiteConfig;
  onUpdateConfig: (newConfig: SiteConfig) => void;
  onResetConfig: () => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  config,
  onUpdateConfig,
  onResetConfig,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form state
  const [herName, setHerName] = useState(config.herName);
  const [myName, setMyName] = useState(config.myName);
  const [mainMessage, setMainMessage] = useState(config.mainMessage);
  const [secretMessage, setSecretMessage] = useState(config.secretMessage);
  const [finalMessage, setFinalMessage] = useState(config.finalMessage);
  const [audioFile, setAudioFile] = useState(config.audioFile || '');
  const [memories, setMemories] = useState(config.memories || []);

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setMemories((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], imageUrl: result };
            return updated;
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig({
      ...config,
      herName,
      myName,
      mainMessage,
      secretMessage,
      finalMessage,
      audioFile,
      memories,
    });
    setIsOpen(false);
  };

  const generateConfigSnippet = () => {
    return `// Paste this into your src/config.ts:
export const HER_NAME = ${JSON.stringify(herName)};
export const MY_NAME = ${JSON.stringify(myName)};
export const MAIN_CONFESSION = ${JSON.stringify(mainMessage)};
export const SECRET_MESSAGE = ${JSON.stringify(secretMessage)};
export const FINAL_MESSAGE = ${JSON.stringify(finalMessage)};
export const AUDIO_FILE = ${JSON.stringify(audioFile)};
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateConfigSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Discreet top-left customize button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          id="open-customize-modal-btn"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass hover:bg-white/10 border border-white/10 hover:border-pink-500/30 text-xs font-mono text-purple-200/90 hover:text-pink-200 backdrop-blur-md transition-all shadow-xl cursor-pointer"
          title="Customize Names, Messages & Photos"
        >
          <Settings2 className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform text-pink-300" />
          <span className="hidden sm:inline font-sans">Customize Words</span>
        </button>
      </div>

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-3xl glass-card-glow p-6 sm:p-8 border border-pink-400/30 shadow-2xl my-auto text-left"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-300">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-serif-romantic font-semibold text-white">
                    Personalize Your Confession
                  </h3>
                  <p className="text-xs text-purple-200/60 font-mono">
                    Changes apply instantly in preview!
                  </p>
                </div>
              </div>

              <button
                id="close-customize-modal-btn"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleApply} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-pink-300 mb-1">
                    Her Name or Sweet Nickname
                  </label>
                  <input
                    type="text"
                    value={herName}
                    onChange={(e) => setHerName(e.target.value)}
                    placeholder="e.g. Sarah, Maya"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-pink-400 focus:outline-none text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-pink-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={myName}
                    onChange={(e) => setMyName(e.target.value)}
                    placeholder="e.g. Alex"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-pink-400 focus:outline-none text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-pink-300 mb-1">
                  Main Confession (Section 3)
                </label>
                <input
                  type="text"
                  value={mainMessage}
                  onChange={(e) => setMainMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-pink-400 focus:outline-none text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-pink-300 mb-1">
                  Secret Message (Section 6)
                </label>
                <textarea
                  rows={3}
                  value={secretMessage}
                  onChange={(e) => setSecretMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 focus:border-pink-400 focus:outline-none text-white text-sm leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-pink-300 mb-1">
                  Final Message (Section 7)
                </label>
                <textarea
                  rows={2}
                  value={finalMessage}
                  onChange={(e) => setFinalMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 focus:border-pink-400 focus:outline-none text-white text-sm leading-relaxed"
                />
              </div>

              {/* Memories Photos Section */}
              <div className="pt-2">
                <label className="block text-xs font-mono text-pink-300 mb-2">
                  Pyari Yaadein (Photos & Memories)
                </label>
                <div className="space-y-3">
                  {memories.map((mem, index) => (
                    <div
                      key={mem.id || index}
                      className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3.5"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0 relative flex items-center justify-center">
                        {mem.imageUrl ? (
                          <img
                            src={mem.imageUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-pink-300/40" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          value={mem.title}
                          onChange={(e) => {
                            const updated = [...memories];
                            updated[index] = { ...updated[index], title: e.target.value };
                            setMemories(updated);
                          }}
                          className="w-full px-2.5 py-1 rounded-lg bg-black/30 border border-white/10 text-white text-xs font-medium mb-1.5 focus:border-pink-400 focus:outline-none"
                          placeholder="Title"
                        />
                        <div className="flex items-center gap-2">
                          <label className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 text-[11px] cursor-pointer border border-pink-500/30 transition-colors">
                            <span>Photo Badlein</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(index, e)}
                            />
                          </label>
                          <span className="text-[10px] text-purple-200/50 truncate font-mono">
                            {mem.tag || `Yaad ${index + 1}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-pink-300 mb-1">
                  Audio File URL (Optional MP3)
                </label>
                <input
                  type="text"
                  value={audioFile}
                  onChange={(e) => setAudioFile(e.target.value)}
                  placeholder="Leave empty to use built-in romantic ambient synth"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-pink-400 focus:outline-none text-white text-sm font-mono text-xs"
                />
                <p className="text-[11px] text-purple-200/50 mt-1 font-mono">
                  Default is a gentle, copyright-free Web Audio romantic chime synth.
                </p>
              </div>

              {/* Code Info Box */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-purple-200/70 space-y-1">
                <div className="flex items-center gap-1.5 text-pink-300 font-medium">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Permanent editing:</span>
                </div>
                <p>
                  You can permanently customize all texts, photos, and reasons inside{' '}
                  <code className="bg-black/50 text-pink-200 px-1 py-0.5 rounded font-mono">
                    src/config.ts
                  </code>
                  .
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy snippet</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onResetConfig();
                      setHerName(config.herName);
                      setMyName(config.myName);
                      setMainMessage(config.mainMessage);
                      setSecretMessage(config.secretMessage);
                      setFinalMessage(config.finalMessage);
                      setAudioFile(config.audioFile || '');
                      setMemories(config.memories || []);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-purple-300/80 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-purple-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl accent-gradient hover:opacity-95 text-white font-medium text-xs sm:text-sm shadow-md shadow-pink-500/25 transition-all cursor-pointer"
                  >
                    Apply Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
