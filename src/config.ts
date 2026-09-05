import { SiteConfig } from './types';

/**
 * =========================================================================
 * 🌹 ROMANTIC CONFESSION WEBSITE CONFIGURATION
 * =========================================================================
 * 
 * Welcome! You can easily personalize every single part of this website right here.
 * Change the names, messages, reasons, memories, and photos to make it truly yours.
 * 
 * QUICK GUIDE:
 * 1. HER_NAME: Put her actual first name or sweet nickname (e.g. "Maya", "Emma", "Sarah").
 * 2. MY_NAME: Put your name or what she calls you (e.g. "Alex", "David").
 * 3. REASONS: Add 3 to 5 things you love about her.
 * 4. MEMORIES: Replace the placeholder image URLs with links to your photos (e.g. Imgur, Cloudinary,
 *    or local files placed in /public/ like '/my-photo.jpg').
 * 5. SECRET_MESSAGE: That private inside joke or heartfelt confession only she will understand.
 * 6. AUDIO_FILE: Optional link to an MP3 song. If left empty, the built-in romantic ambient melody will play.
 * =========================================================================
 */

// 1. HER NAME & YOUR NAME
export const HER_NAME = "Meri Jaan"; // Her name or sweet nickname (e.g. "Pooja", "Simran", "Ananya")
export const MY_NAME = "Tumhara Apna";   // Your name (e.g. "Rahul", "Aman", "Rohan")

// 2. MAIN CONFESSION MESSAGE
export const MAIN_CONFESSION = "HAAN, MAIN BHI TUMSE BOHOT PYAAR KARTA HOON ❤️";

// 3. THINGS I LIKE ABOUT YOU (SECTION 4)
// Sincere, heartfelt, and memorable reasons in Hindi written in English (Hinglish)
export const REASONS_ABOUT_HER = [
  {
    id: "reason-1",
    number: "01",
    title: "Tumhari pyari si muskaan",
    description: "Jab tum muskurati ho na, toh lagta hai jaise poori duniya ki saari pareshaaniyan ek pal mein gayab ho gayi hain.",
    iconName: "Sparkles",
  },
  {
    id: "reason-2",
    number: "02",
    title: "Tumse ghanton baatein karna",
    description: "Tumse baat karte waqt ghante kab beeth jaate hain, pata hi nahi chalta. Tumhari har baat sunna mujhe bohot accha lagta hai.",
    iconName: "Heart",
  },
  {
    id: "reason-3",
    number: "03",
    title: "Har pal ko khaas banana",
    description: "Tumhari aawaaz sunna ya tumhara ek chhota sa message bhi mere poore din ko itna khushgawaar bana deta hai.",
    iconName: "Sun",
  },
  {
    id: "reason-4",
    number: "04",
    title: "Tumhari chhoti chhoti adaayein",
    description: "Tumhara bina soche hasna, choti choti baaton pe khush ho jaana... yeh sab baatein mere dil mein bas gayi hain.",
    iconName: "Moon",
  },
  {
    id: "reason-5",
    number: "05",
    title: "Bas tum jaisi ho waisi hi rehna",
    description: "Tumhe kisi ko impress karne ki zarurat nahi hai. Tum jaisi ho, mere liye bilkul perfect aur sabse pyari ho.",
    iconName: "Smile",
  },
];

// 4. OUR LITTLE MEMORIES (SECTION 5)
export const MEMORIES = [
  {
    id: "mem-1",
    date: "Wo khaas pal",
    title: "Wo Nashili & Masoom Aankhein",
    caption: "Jab tum aise dekhti ho na, lagta hai waqt wahin thehar gaya hai. In pyari aankhon mein poori kainaat basi hai.",
    imageUrl: "/photos/her_eyes.jpg",
    gradient: "from-pink-900/60 via-purple-900/40 to-indigo-950/80",
    tag: "Khoobsurat Nigahein",
  },
  {
    id: "mem-2",
    date: "Wo pyara andaaz",
    title: "Gulabi Libaas & Lambi Zulfein",
    caption: "Gulabi rang tum par kitna jachta hai, aur baalon mein wo phool... tum bilkul kisi khwaab jaisi pari lagti ho.",
    imageUrl: "/photos/her_pink_dress.jpg",
    gradient: "from-rose-950/70 via-purple-950/50 to-slate-900/90",
    tag: "Pari Jaisi",
  },
  {
    id: "mem-3",
    date: "Wo dilchasp muskaan",
    title: "Wo Pyari Si Sharmati Muskaan",
    caption: "Gal par haath rakh kar jab tum aisi pyari muskaan deti ho na... dil bas tumhara hi ho jata hai. Hamesha aise hi muskurana.",
    imageUrl: "/photos/her_smile.jpg",
    gradient: "from-violet-950/70 via-fuchsia-950/40 to-midnight-950/80",
    tag: "Dil Ka Sukoon",
  },
];

// 5. THE SECRET MESSAGE (SECTION 6)
// A personal, cozy note hidden behind the interactive glowing envelope/lock
export const SECRET_MESSAGE = 
  "Agar mujhe apni zindagi ki sabse khoobsurat cheez chunni ho, toh main wo pal chununga jab tum mujhe dekh kar muskurati ho. Tum mere paas aayi ho toh dil ko ek alag hi sukoon mil gaya hai. Hamesha aise hi mere saath rehna meri jaan.";

// 6. THE FINAL MESSAGE (SECTION 7)
export const FINAL_MESSAGE = 
  "Main nahi jaanta ki aane wala kal kaisa hoga, par itna zaroor jaanta hoon ki main har pal tumhare saath rehna chahta hoon.";

export const FINAL_SUB_MESSAGE = 
  "Pehle 'I Love You' bolne ke liye bohot shukriya... Ab meri baari hai yeh baat har roz tumhein mehsoos karane ki.";

// 7. BACKGROUND AUDIO
// Hindi romantic song: "I Love You" - Ash King, Clinton Cerejo (from Bodyguard)
export const AUDIO_FILE = "/i-love-you-hindi.mp3";

// 8. COMPLETE DEFAULT CONFIG BUNDLE
export const DEFAULT_CONFIG: SiteConfig = {
  herName: HER_NAME,
  myName: MY_NAME,
  mainMessage: MAIN_CONFESSION,
  reasons: REASONS_ABOUT_HER,
  memories: MEMORIES,
  secretMessage: SECRET_MESSAGE,
  finalMessage: FINAL_MESSAGE,
  finalSubMessage: FINAL_SUB_MESSAGE,
  audioFile: AUDIO_FILE,
  themeColor: {
    accent: "#f472b6", // Soft rose pink
    glow: "rgba(244, 114, 182, 0.4)",
  },
};
