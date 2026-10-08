// Names of the built-in illustrations (components/course/pictures). Content
// refers to pictures by these names, so this list is plain data that both
// the server-side content tests and the client renderer can import.
//
// Where pictures appear in content:
// - vocab cards: `pic: "cat"`
// - above a question: `image: "apple*4"` (`*n` repeats the picture n times)
// - answer options and matching items: `"pic:cat"` shows only the picture,
//   `"pic:cat|cat"` shows the picture with a caption.

const NUMBERS = Array.from({ length: 20 }, (_, i) => `num-${i + 1}` as const);

export const PICTURE_NAMES = [
  // people
  "father", "mother", "brother", "sister", "grandfather", "grandmother", "baby",
  "boy", "girl", "teacher-woman", "teacher-man", "hello", "goodbye",
  // times of day
  "morning", "afternoon", "evening", "night",
  // school
  "book", "pencil", "pencil-red", "eraser", "eraser-green", "ruler", "bag", "crayon", "chair", "bag-things",
  // colours
  "color-red", "color-blue", "color-yellow", "color-green", "color-orange", "color-purple", "color-black", "color-white", "color-pink",
  // numbers
  ...NUMBERS,
  // animals and actions
  "cat", "cat-white", "dog", "bird", "fish", "chicken", "cow", "duck", "elephant", "kangaroo", "cheetah",
  "swim", "fly", "run", "jump",
  // food and drinks
  "rice", "bread", "egg", "grilled-fish", "drumstick", "vegetables", "milk", "water", "juice", "tea",
  "apple", "mango", "banana", "orange-fruit", "tomato", "leaf", "cloud", "cake", "ball", "basket", "stall", "lunch",
  "yum", "yuck", "heart",
  // work, daily life, travel (English Day)
  "staff", "headset", "customer", "customer-angry", "technician", "meeting", "smartphone", "phone-call", "laptop", "modem", "modem-red", "wifi", "cable", "signal", "download", "upload", "video-app", "chat", "question", "bill", "money", "receipt", "calendar", "clock", "alarm", "target", "report", "office", "house", "coffee", "motorcycle", "traffic", "shower", "tv", "gamepad", "fishing", "bicycle", "beach", "mountain", "island", "plane", "suitcase", "passport", "souvenir", "crab", "soup", "chili", "lemon", "candy", "salt", "food-stall", "feel-great", "feel-tired", "feel-sleepy", "feel-hungry", "trophy", "thumbs-up", "pin",
  // mascot
  "owl", "owl-wave", "owl-cheer", "owl-think", "owl-read",
] as const;

export type PictureName = (typeof PICTURE_NAMES)[number];

const NAMES = new Set<string>(PICTURE_NAMES);

/** "cat*3" → { name: "cat", count: 3 }. Unknown names give null. */
export function parsePictureRef(ref: string): { name: PictureName; count: number } | null {
  const m = /^([a-z0-9-]+)(?:\*(\d{1,2}))?$/.exec(ref);
  if (!m || !NAMES.has(m[1])) return null;
  return { name: m[1] as PictureName, count: Math.max(1, Math.min(20, Number(m[2] ?? 1))) };
}

export const PIC_PREFIX = "pic:";

/** A picture answer option: "pic:cat" or "pic:cat|caption". Plain text gives null. */
export function parsePicOption(option: string): { ref: string; caption?: string } | null {
  if (!option.startsWith(PIC_PREFIX)) return null;
  const [ref, caption] = option.slice(PIC_PREFIX.length).split("|");
  return { ref, caption: caption || undefined };
}

/** Text for an option in feedback and review lists ("pic:cat" → "cat"). */
export function optionText(option: string): string {
  const pic = parsePicOption(option);
  if (!pic) return option;
  return pic.caption ?? pic.ref.replace(/\*\d+$/, "").replace(/^num-/, "").replace(/^color-/, "").replace(/-/g, " ");
}
