export interface ReasonItem {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName?: string;
}

export interface MemoryItem {
  id: string;
  date: string;
  title: string;
  caption: string;
  imageUrl?: string;
  gradient: string;
  tag: string;
}

export interface SiteConfig {
  herName: string;
  myName: string;
  mainMessage: string;
  reasons: ReasonItem[];
  memories: MemoryItem[];
  secretMessage: string;
  secretHint?: string;
  finalMessage: string;
  finalSubMessage?: string;
  audioFile: string;
  themeColor: {
    accent: string;
    glow: string;
  };
}
