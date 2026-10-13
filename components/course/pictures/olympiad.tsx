import { C, Face, INK, SKIN, Star } from "./base";

// Pictures for the EA Champion English Olympiad modules: competition and
// study tools, plural nouns, tense timeline, reading passages, and idioms /
// figurative language drawn literally (so learners remember them).

// --- Competition & study tools --------------------------------------------------

export const medal = () => (
  <g>
    <path d="M30 8 L44 44 L56 44 L42 8 Z" fill={C.blue} />
    <path d="M70 8 L56 44 L44 44 L58 8 Z" fill={C.red} />
    <circle cx={50} cy={64} r={26} fill={C.yellow} />
    <circle cx={50} cy={64} r={18} fill="#FFE57A" strokeWidth={2} />
    <Star x={50} y={64} r={10} fill={C.orange} />
  </g>
);

export const stopwatch = () => (
  <g>
    <rect x={43} y={6} width={14} height={9} rx={3} fill={C.red} />
    <path d="M50 15 V20" fill="none" strokeWidth={4} />
    <path d="M74 24 l7 -7" fill="none" strokeWidth={4} />
    <circle cx={50} cy={57} r={36} fill={C.white} />
    <circle cx={50} cy={57} r={29} fill={C.sky} strokeWidth={2} />
    <path d="M50 57 V35" fill="none" strokeWidth={4} />
    <path d="M50 57 L64 66" fill="none" stroke={C.red} strokeWidth={4} />
    <circle cx={50} cy={57} r={4} fill={INK} />
    <path d="M50 29 v4 M78 57 h-4 M50 85 v-4 M22 57 h4" fill="none" strokeWidth={2.4} />
  </g>
);

export const podium = () => (
  <g>
    <rect x={36} y={38} width={28} height={52} fill={C.yellow} />
    <rect x={8} y={56} width={28} height={34} fill={C.silver} />
    <rect x={64} y={66} width={28} height={24} fill={C.orange} />
    <text x={50} y={70} textAnchor="middle" fontSize={20} fontWeight={800} fill={INK} stroke="none" fontFamily="inherit">1</text>
    <text x={22} y={80} textAnchor="middle" fontSize={16} fontWeight={800} fill={INK} stroke="none" fontFamily="inherit">2</text>
    <text x={78} y={85} textAnchor="middle" fontSize={14} fontWeight={800} fill={INK} stroke="none" fontFamily="inherit">3</text>
    <Star x={50} y={20} r={12} />
    <Star x={22} y={42} r={7} fill={C.white} />
    <Star x={78} y={54} r={6} fill={C.white} />
  </g>
);

/** Two interlocking puzzle pieces: putting sentence chunks together. */
export const puzzle = () => (
  <g>
    <path d="M10 30 H30 Q30 20 38 20 Q46 20 46 30 H56 V48 Q66 48 66 56 Q66 64 56 64 V82 H10 Z" fill={C.blue} />
    <path d="M58 18 H90 V50 H80 Q80 58 72 58 Q64 58 64 50 H58 V40 Q66 40 66 32 Q66 24 58 24 Z" fill={C.yellow} transform="translate(2 4)" />
    <Face x={30} y={54} s={0.8} mood="smile" />
  </g>
);

export const magnifier = () => (
  <g>
    <path d="M62 62 L88 88" fill="none" stroke={INK} strokeWidth={13} />
    <path d="M62 62 L88 88" fill="none" stroke={C.brown} strokeWidth={7} />
    <circle cx={42} cy={42} r={30} fill={C.silver} />
    <circle cx={42} cy={42} r={23} fill={C.sky} strokeWidth={2} />
    <path d="M28 34 Q32 24 42 22" fill="none" stroke={C.white} strokeWidth={4} />
  </g>
);

/** Light bulb: an idea / Higher-Order Thinking. */
export const lightbulb = () => (
  <g>
    <path d="M14 30 l-8 -4 M86 30 l8 -4 M50 6 v-2 M22 12 l-5 -5 M78 12 l5 -5" fill="none" stroke={C.orange} strokeWidth={3.5} />
    <path d="M50 14 Q24 14 24 42 Q24 56 36 64 V72 H64 V64 Q76 56 76 42 Q76 14 50 14 Z" fill={C.yellow} />
    <path d="M42 64 V50 Q50 42 58 50 V64" fill="none" stroke={C.orange} strokeWidth={2.4} />
    <rect x={36} y={72} width={28} height={8} rx={2} fill={C.silver} />
    <rect x={38} y={80} width={24} height={7} rx={2} fill={C.grey} />
    <path d="M44 87 Q50 94 56 87" fill={C.grey} />
  </g>
);

/** Clipboard with ticks: a self-check routine such as STAPW. */
export const checklist = () => (
  <g>
    <rect x={18} y={12} width={64} height={80} rx={6} fill={C.tan} />
    <rect x={25} y={20} width={50} height={66} rx={3} fill={C.white} />
    <rect x={38} y={6} width={24} height={12} rx={4} fill={C.grey} />
    {[34, 50, 66].map((y, i) => (
      <g key={y}>
        <rect x={30} y={y - 5} width={10} height={10} rx={2} fill={C.white} strokeWidth={2} />
        <path d={`M31 ${y} l3 4 l7 -9`} fill="none" stroke={i < 2 ? C.green : "none"} strokeWidth={3} />
        <path d={`M46 ${y} H68`} fill="none" stroke={C.grey} strokeWidth={3} />
      </g>
    ))}
  </g>
);

/** Two speech bubbles: a dialogue (Part C). */
export const speechBubbles = () => (
  <g>
    <path d="M14 16 H58 Q66 16 66 24 V42 Q66 50 58 50 H30 L18 60 L22 50 H14 Q6 50 6 42 V24 Q6 16 14 16 Z" fill={C.blue} />
    <path d="M42 46 H86 Q94 46 94 54 V72 Q94 80 86 80 H78 L82 90 L70 80 H42 Q34 80 34 72 V54 Q34 46 42 46 Z" fill={C.yellow} />
    <circle cx={24} cy={33} r={3} fill={C.white} stroke="none" />
    <circle cx={36} cy={33} r={3} fill={C.white} stroke="none" />
    <circle cx={48} cy={33} r={3} fill={C.white} stroke="none" />
    <path d="M52 63 H82 M52 70 H72" fill="none" stroke={INK} strokeWidth={3} />
  </g>
);

export const flashcards = () => (
  <g>
    <rect x={14} y={30} width={56} height={40} rx={5} fill={C.pink} transform="rotate(-12 42 50)" />
    <rect x={24} y={30} width={60} height={44} rx={5} fill={C.white} />
    <text x={54} y={52} textAnchor="middle" fontSize={12} fontWeight={800} fill={INK} stroke="none" fontFamily="inherit">word</text>
    <path d="M36 62 H72" fill="none" stroke={C.grey} strokeWidth={3} />
    <Star x={80} y={26} r={8} />
  </g>
);

/** A tense timeline: past, now, future. */
export const timeline = () => (
  <g>
    <path d="M6 50 H90" fill="none" strokeWidth={4} />
    <path d="M86 42 L96 50 L86 58 Z" fill={INK} />
    <circle cx={16} cy={50} r={7} fill={C.grey} />
    <circle cx={50} cy={50} r={10} fill={C.red} />
    <circle cx={80} cy={50} r={7} fill={C.blue} />
    <text x={50} y={30} textAnchor="middle" fontSize={12} fontWeight={800} fill={C.red} stroke="none" fontFamily="inherit">now</text>
    <text x={18} y={76} textAnchor="middle" fontSize={11} fontWeight={800} fill={INK} stroke="none" fontFamily="inherit">past</text>
    <text x={80} y={76} textAnchor="middle" fontSize={11} fontWeight={800} fill={INK} stroke="none" fontFamily="inherit">future</text>
  </g>
);

/** Two actions in the past: one finished (had + V3) before the other. */
export const timelinePerfect = () => (
  <g>
    <path d="M6 56 H90" fill="none" strokeWidth={4} />
    <path d="M86 48 L96 56 L86 64 Z" fill={INK} />
    <circle cx={24} cy={56} r={8} fill={C.purple} />
    <circle cx={52} cy={56} r={8} fill={C.orange} />
    <circle cx={80} cy={56} r={6} fill={C.red} />
    <text x={24} y={38} textAnchor="middle" fontSize={11} fontWeight={800} fill={C.purple} stroke="none" fontFamily="inherit">1st</text>
    <text x={52} y={38} textAnchor="middle" fontSize={11} fontWeight={800} fill={C.orange} stroke="none" fontFamily="inherit">2nd</text>
    <text x={80} y={40} textAnchor="middle" fontSize={10} fontWeight={800} fill={C.red} stroke="none" fontFamily="inherit">now</text>
    <path d="M28 74 Q38 84 48 74" fill="none" stroke={C.purple} strokeWidth={2.6} />
    <text x={38} y={94} textAnchor="middle" fontSize={10} fontWeight={800} fill={INK} stroke="none" fontFamily="inherit">had + V3</text>
  </g>
);

/** Lectern with a microphone: a debate club. */
export const debate = () => (
  <g>
    <path d="M24 46 H76 L70 92 H30 Z" fill={C.blue} />
    <rect x={20} y={40} width={60} height={10} rx={3} fill={C.navy} />
    <Star x={50} y={70} r={9} fill={C.yellow} />
    <path d="M50 40 V22" fill="none" strokeWidth={3} />
    <rect x={44} y={8} width={12} height={16} rx={6} fill={C.grey} />
    <path d="M20 22 q-6 -6 0 -12 M14 26 q-12 -11 0 -22 M80 22 q6 -6 0 -12 M86 26 q12 -11 0 -22" fill="none" stroke={C.orange} strokeWidth={2.4} />
  </g>
);

// --- Nouns ------------------------------------------------------------------------

export const mouse = () => (
  <g>
    <path d="M84 70 Q96 76 90 88" fill="none" stroke={C.pink} strokeWidth={3} />
    <ellipse cx={56} cy={66} rx={30} ry={20} fill={C.grey} />
    <circle cx={30} cy={40} r={12} fill={C.grey} />
    <circle cx={30} cy={40} r={7} fill={C.pink} strokeWidth={1.6} />
    <circle cx={52} cy={38} r={12} fill={C.grey} />
    <circle cx={52} cy={38} r={7} fill={C.pink} strokeWidth={1.6} />
    <ellipse cx={34} cy={60} rx={20} ry={17} fill={C.grey} />
    <Face x={34} y={58} s={0.8} />
    <circle cx={18} cy={64} r={3} fill={C.pink} />
    <path d="M14 58 l-8 -3 M14 62 h-9" fill="none" strokeWidth={1.4} />
  </g>
);

export const tooth = () => (
  <g>
    <path d="M22 26 Q22 10 38 12 Q50 16 62 12 Q78 10 78 26 Q78 44 70 56 Q66 88 58 88 Q52 88 50 66 Q48 88 42 88 Q34 88 30 56 Q22 44 22 26 Z" fill={C.white} />
    <Face x={50} y={36} s={0.9} mood="smile" />
    <path d="M30 20 Q34 16 40 18" fill="none" stroke={C.sky} strokeWidth={3} />
  </g>
);

// --- Reading passages -----------------------------------------------------------

export const bee = () => (
  <g>
    <ellipse cx={38} cy={30} rx={14} ry={18} fill={C.sky} transform="rotate(-30 38 30)" />
    <ellipse cx={62} cy={30} rx={14} ry={18} fill={C.sky} transform="rotate(30 62 30)" />
    <ellipse cx={50} cy={60} rx={32} ry={24} fill={C.yellow} />
    <path d="M40 38 Q34 60 40 82 M56 37 Q50 60 56 83" fill="none" stroke={INK} strokeWidth={7} />
    <path d="M82 60 l10 0" fill="none" strokeWidth={3} />
    <circle cx={26} cy={58} r={16} fill={C.yellow} />
    <Face x={24} y={56} s={0.75} />
    <path d="M20 42 Q16 30 10 28 M30 42 Q32 30 38 26" fill="none" strokeWidth={2} />
    <circle cx={10} cy={28} r={2.4} fill={INK} />
    <circle cx={38} cy={26} r={2.4} fill={INK} />
  </g>
);

export const plasticBottle = () => (
  <g>
    <path d="M6 82 Q20 74 34 82 T62 82 T94 82 V94 H6 Z" fill={C.blue} />
    <rect x={42} y={8} width={16} height={10} rx={2} fill={C.blue} />
    <path d="M42 18 H58 L62 30 Q70 36 70 46 V78 Q70 86 62 86 H38 Q30 86 30 78 V46 Q30 36 38 30 Z" fill={C.sky} />
    <rect x={30} y={50} width={40} height={16} fill={C.white} />
    <path d="M38 58 H62" fill="none" stroke={C.red} strokeWidth={3} />
    <path d="M14 20 L86 92" fill="none" stroke={C.red} strokeWidth={5} opacity={0.85} />
  </g>
);

// --- Idioms & figurative language ---------------------------------------------

/** Let the cat out of the bag. */
export const catBag = () => (
  <g>
    <path d="M18 50 Q14 92 50 92 Q86 92 82 50 Z" fill={C.tan} />
    <path d="M16 50 H84" fill="none" strokeWidth={4} />
    <path d="M30 50 L32 26 L42 36 Q50 32 58 36 L68 26 L70 50 Z" fill={C.orange} />
    <Face x={50} y={44} s={0.8} mood="open" />
    <path d="M36 72 H64 M40 80 H60" fill="none" stroke={C.darkBrown} strokeWidth={2.4} />
    <text x={80} y={24} textAnchor="middle" fontSize={14} fontWeight={800} fill={C.red} stroke="none" fontFamily="inherit">!</text>
  </g>
);

/** A piece of cake. */
export const cakeSlice = () => (
  <g>
    <ellipse cx={50} cy={82} rx={42} ry={8} fill={C.white} />
    <path d="M14 70 L84 70 L84 44 L14 58 Z" fill={C.cream} />
    <path d="M14 58 L84 44 L74 34 Z" fill={C.pink} />
    <path d="M14 62 L84 52" fill="none" stroke={C.red} strokeWidth={3} />
    <circle cx={70} cy={30} r={6} fill={C.red} />
    <path d="M70 24 q2 -6 6 -6" fill="none" stroke={C.darkGreen} strokeWidth={2} />
    <Face x={52} y={60} s={0.7} mood="yum" />
  </g>
);

/** A fish out of water. */
export const fishOut = () => (
  <g>
    <path d="M4 80 Q30 72 50 80 T96 78 V94 H4 Z" fill={C.yellow} />
    <circle cx={74} cy={34} r={20} fill={C.white} />
    <path d="M56 38 Q74 30 92 38 A20 20 0 0 1 56 38 Z" fill={C.sky} strokeWidth={2} />
    <path d="M62 16 H86" fill="none" strokeWidth={3} />
    <ellipse cx={36} cy={66} rx={22} ry={12} fill={C.orange} />
    <path d="M56 66 L72 54 L72 78 Z" fill={C.orange} />
    <Face x={28} y={64} s={0.7} mood="yuck" cheeks={false} />
    <path d="M14 46 q4 -4 8 0 M26 42 q4 -4 8 0" fill="none" stroke={C.blue} strokeWidth={2} />
  </g>
);

/** Once in a blue moon. */
export const blueMoon = () => (
  <g>
    <rect x={4} y={6} width={92} height={88} rx={14} fill={C.navy} />
    <circle cx={52} cy={50} r={28} fill={C.blue} />
    <circle cx={64} cy={42} r={24} fill={C.navy} stroke="none" />
    <Face x={38} y={52} s={0.7} mood="sleep" />
    <Star x={78} y={22} r={5} />
    <Star x={20} y={24} r={4} fill={C.white} />
    <Star x={80} y={76} r={4} fill={C.white} />
  </g>
);

/** Break the ice. */
export const iceBreak = () => (
  <g>
    <path d="M14 40 L50 22 L86 40 L86 76 L50 92 L14 76 Z" fill={C.sky} />
    <path d="M14 40 L50 56 L86 40 M50 56 V92" fill="none" stroke={C.white} strokeWidth={2.6} />
    <path d="M50 22 L44 38 L54 46 L46 60 L54 72" fill="none" stroke={INK} strokeWidth={3} />
    <Face x={30} y={62} s={0.7} mood="smile" />
    <Face x={70} y={62} s={0.7} mood="smile" />
    <path d="M6 18 l6 4 M94 18 l-6 4 M50 6 v8" fill="none" stroke={C.orange} strokeWidth={3} />
  </g>
);

/** It's raining cats and dogs. */
export const catsDogsRain = () => (
  <g>
    <path d="M22 42 Q10 42 10 32 Q10 20 24 22 Q28 8 44 10 Q56 4 64 16 Q80 12 84 26 Q94 28 92 38 Q90 44 80 42 Z" fill={C.grey} />
    <g transform="translate(18 54)">
      <path d="M0 6 L2 -4 L8 2 L14 -4 L16 6 Z" fill={C.orange} />
      <circle cx={8} cy={10} r={9} fill={C.orange} />
      <circle cx={5} cy={9} r={1.4} fill={INK} stroke="none" />
      <circle cx={11} cy={9} r={1.4} fill={INK} stroke="none" />
    </g>
    <g transform="translate(60 62)">
      <ellipse cx={-1} cy={8} rx={4} ry={8} fill={C.darkBrown} />
      <ellipse cx={17} cy={8} rx={4} ry={8} fill={C.darkBrown} />
      <circle cx={8} cy={10} r={9} fill={C.tan} />
      <circle cx={5} cy={9} r={1.4} fill={INK} stroke="none" />
      <circle cx={11} cy={9} r={1.4} fill={INK} stroke="none" />
      <circle cx={8} cy={13} r={1.8} fill={INK} stroke="none" />
    </g>
    <path d="M46 52 l-3 8 M54 70 l-3 8 M30 80 l-3 8 M84 82 l-3 8 M14 50 l-3 8" fill="none" stroke={C.blue} strokeWidth={3} />
  </g>
);

/** Turn over a new leaf. */
export const newLeaf = () => (
  <g>
    <path d="M16 84 Q14 30 66 14 Q90 10 86 34 Q78 82 16 84 Z" fill={C.green} />
    <path d="M16 84 Q44 52 76 24" fill="none" stroke={C.darkGreen} strokeWidth={3} />
    <path d="M36 62 l-6 -14 M48 50 l-4 -16 M60 40 l0 -14 M44 58 l14 2 M56 46 l14 2" fill="none" stroke={C.darkGreen} strokeWidth={2} />
    <path d="M70 70 q10 -10 4 -22" fill="none" stroke={C.orange} strokeWidth={3} />
    <path d="M70 46 l4 2 l2 -5" fill="none" stroke={C.orange} strokeWidth={3} />
    <Star x={84} y={74} r={6} />
  </g>
);

/** Cost an arm and a leg: a price tag. */
export const priceTag = () => (
  <g>
    <path d="M18 18 H58 L90 50 L56 84 L18 50 Z" fill={C.yellow} />
    <circle cx={32} cy={32} r={5} fill={C.white} />
    <text x={56} y={58} textAnchor="middle" fontSize={20} fontWeight={800} fill={C.red} stroke="none" fontFamily="inherit" transform="rotate(-45 56 54)">$$$</text>
    <path d="M32 32 Q20 8 6 14" fill="none" strokeWidth={2} />
  </g>
);

/** Under the weather. */
export const underWeather = () => (
  <g>
    <path d="M26 30 Q14 30 14 22 Q14 12 26 14 Q30 4 46 6 Q60 2 66 14 Q82 12 84 24 Q86 32 74 30 Z" fill={C.grey} />
    <path d="M30 38 l-3 7 M48 38 l-3 7 M66 38 l-3 7" fill="none" stroke={C.blue} strokeWidth={3} />
    <circle cx={50} cy={70} r={22} fill={SKIN.light} />
    <Face x={50} y={70} s={0.9} mood="sleep" />
    <rect x={62} y={70} width={22} height={5} rx={2.5} fill={C.white} transform="rotate(-20 62 72)" />
    <circle cx={84} cy={64} r={3.4} fill={C.red} />
    <path d="M38 52 q4 -4 8 0" fill="none" stroke={C.blue} strokeWidth={2} />
  </g>
);

/** As brave as a lion (simile). */
export const lion = () => (
  <g>
    {Array.from({ length: 12 }, (_, i) => {
      const a = (Math.PI / 6) * i;
      return <circle key={i} cx={50 + 30 * Math.cos(a)} cy={52 + 30 * Math.sin(a)} r={13} fill={C.brown} />;
    })}
    <circle cx={50} cy={52} r={28} fill={C.orange} />
    <circle cx={30} cy={30} r={7} fill={C.orange} />
    <circle cx={70} cy={30} r={7} fill={C.orange} />
    <ellipse cx={50} cy={62} rx={11} ry={8} fill={C.cream} />
    <Face x={50} y={50} s={1} mood="smile" />
    <path d="M47 58 h6 l-3 3 z" fill={INK} />
  </g>
);

/** The stars winked at us (personification). */
export const starWink = () => (
  <g>
    <rect x={4} y={6} width={92} height={88} rx={14} fill={C.navy} />
    <Star x={50} y={52} r={34} />
    <circle cx={42} cy={52} r={2.4} fill={INK} stroke="none" />
    <path d="M54 52 q3 -3 6 0" fill="none" strokeWidth={2} />
    <path d="M45 60 q5 4 10 0" fill="none" strokeWidth={2} />
    <ellipse cx={37} cy={58} rx={3} ry={2} fill={C.blush} stroke="none" />
    <ellipse cx={63} cy={58} rx={3} ry={2} fill={C.blush} stroke="none" />
    <Star x={18} y={22} r={4} fill={C.white} />
    <Star x={84} y={80} r={5} fill={C.white} />
  </g>
);

/** Time is money (metaphor). */
export const timeMoney = () => (
  <g>
    <circle cx={40} cy={44} r={30} fill={C.white} />
    <path d="M40 44 V24 M40 44 L54 50" fill="none" strokeWidth={4} />
    <circle cx={40} cy={44} r={3.6} fill={INK} />
    <circle cx={70} cy={70} r={20} fill={C.yellow} />
    <circle cx={70} cy={70} r={14} fill="#FFE57A" strokeWidth={2} />
    <text x={70} y={76} textAnchor="middle" fontSize={16} fontWeight={800} fill={C.darkBrown} stroke="none" fontFamily="inherit">$</text>
    <text x={40} y={92} textAnchor="middle" fontSize={16} fontWeight={800} fill={INK} stroke="none" fontFamily="inherit">=</text>
  </g>
);

/** Hit the books: studying hard. */
export const hitBooks = () => (
  <g>
    <rect x={14} y={70} width={72} height={14} rx={3} fill={C.red} />
    <rect x={20} y={56} width={64} height={14} rx={3} fill={C.blue} />
    <rect x={16} y={42} width={66} height={14} rx={3} fill={C.green} />
    <path d="M22 77 H78 M26 63 H76 M22 49 H74" fill="none" stroke={C.white} strokeWidth={2.4} />
    <g transform="rotate(35 62 24)">
      <rect x={56} y={4} width={12} height={34} fill={C.yellow} />
      <rect x={56} y={4} width={12} height={6} fill={C.pink} />
      <path d="M56 38 L62 48 L68 38 Z" fill={C.tan} />
      <path d="M60.5 45 L62 48 L63.5 45 Z" fill={INK} />
    </g>
    <path d="M18 30 l8 4 M26 18 l4 8 M40 14 v8" fill="none" stroke={C.orange} strokeWidth={3} />
  </g>
);
