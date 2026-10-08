import type { ReactNode } from "react";
import { Backdrop, C, Face, INK, Limb, Place, SKIN } from "./base";

// Pictures for Grades 4–6 and up: Indonesian animals, sports, hobbies,
// health, the environment and cooking.

// --- Animals ----------------------------------------------------------------------

export const tiger = () => (
  <g>
    <circle cx={26} cy={26} r={10} fill={C.orange} />
    <circle cx={74} cy={26} r={10} fill={C.orange} />
    <circle cx={26} cy={26} r={4} fill={INK} stroke="none" />
    <circle cx={74} cy={26} r={4} fill={INK} stroke="none" />
    <circle cx={50} cy={52} r={34} fill={C.orange} />
    <path d="M50 20 v10 M40 21 l2 8 M60 21 l-2 8 M17 46 h10 M18 56 h9 M83 46 h-10 M82 56 h-9" fill="none" stroke={INK} strokeWidth={3.5} />
    <ellipse cx={50} cy={66} rx={16} ry={12} fill={C.white} />
    <Face x={50} y={50} s={1.1} cheeks={false} />
    <path d="M46 60 h8 l-4 4 z" fill={INK} />
    <path d="M50 64 q-3 4 -7 2 M50 64 q3 4 7 2" fill="none" strokeWidth={1.6} />
  </g>
);

export const monkey = () => (
  <g>
    <circle cx={20} cy={46} r={12} fill={C.brown} />
    <circle cx={80} cy={46} r={12} fill={C.brown} />
    <circle cx={20} cy={46} r={6} fill={C.tan} stroke="none" />
    <circle cx={80} cy={46} r={6} fill={C.tan} stroke="none" />
    <circle cx={50} cy={48} r={30} fill={C.brown} />
    <path d="M30 50 Q30 34 42 34 Q50 40 58 34 Q70 34 70 50 Q72 74 50 74 Q28 74 30 50 Z" fill={C.tan} />
    <Face x={50} y={50} s={1} />
    <path d="M42 64 q8 6 16 0" fill="none" strokeWidth={2} />
  </g>
);

export const orangutan = () => (
  <g>
    <path d="M14 70 Q10 30 50 20 Q90 30 86 70 Q80 92 50 92 Q20 92 14 70 Z" fill="#C2571A" />
    <ellipse cx={50} cy={56} rx={26} ry={24} fill="#E8A774" />
    <ellipse cx={26} cy={58} rx={10} ry={16} fill="#E8A774" />
    <ellipse cx={74} cy={58} rx={10} ry={16} fill="#E8A774" />
    <Face x={50} y={52} s={1.05} />
    <path d="M40 68 q10 6 20 0" fill="none" strokeWidth={2} />
    <path d="M36 22 q4 -10 10 -4 q4 -8 10 0 q6 -6 8 4" fill="none" stroke="#C2571A" strokeWidth={4} />
  </g>
);

export const komodo = () => (
  <g>
    <path d="M10 70 Q4 56 18 54 L66 50 Q82 48 92 56 Q96 62 88 64 L72 64 Q60 72 30 72 Q16 74 10 70 Z" fill="#8A9A5B" />
    <path d="M30 72 l-6 14 h8 M52 70 l-2 16 h8 M66 64 l6 14 h8" fill="none" stroke="#8A9A5B" strokeWidth={6} />
    <path d="M30 72 l-6 14 h8 M52 70 l-2 16 h8 M66 64 l6 14 h8" fill="none" strokeWidth={1.8} />
    <path d="M10 70 Q2 74 -2 82" fill="none" stroke="#8A9A5B" strokeWidth={7} />
    <circle cx={80} cy={55} r={2.4} fill={INK} stroke="none" />
    <path d="M92 60 l6 -2 l-2 3 l3 1" fill="none" stroke={C.red} strokeWidth={1.6} />
    {[[36, 60], [48, 58], [60, 58]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2.4} fill="#6B7A45" stroke="none" />)}
  </g>
);

export const turtle = () => (
  <g>
    <Backdrop sky="#C9ECFF" />
    <ellipse cx={22} cy={52} rx={10} ry={8} fill="#8FD19E" />
    <path d="M34 34 l-10 -12 M66 34 l10 -12 M34 70 l-10 12 M66 70 l10 12" fill="none" stroke="#8FD19E" strokeWidth={9} />
    <ellipse cx={52} cy={52} rx={28} ry={24} fill={C.darkGreen} />
    <path d="M52 30 V74 M30 52 H74 M38 36 L66 68 M66 36 L38 68" fill="none" stroke="#2E7041" strokeWidth={2} />
    <circle cx={19} cy={50} r={2} fill={INK} stroke="none" />
  </g>
);

export const butterfly = () => (
  <g>
    <path d="M50 30 Q22 4 12 26 Q6 44 48 50 Z" fill={C.orange} />
    <path d="M50 30 Q78 4 88 26 Q94 44 52 50 Z" fill={C.orange} />
    <path d="M48 52 Q20 56 22 76 Q30 90 48 62 Z" fill={C.yellow} />
    <path d="M52 52 Q80 56 78 76 Q70 90 52 62 Z" fill={C.yellow} />
    <circle cx={28} cy={28} r={5} fill={C.white} strokeWidth={1.6} />
    <circle cx={72} cy={28} r={5} fill={C.white} strokeWidth={1.6} />
    <ellipse cx={50} cy={52} rx={4} ry={22} fill={INK} />
    <path d="M48 32 q-6 -12 -12 -14 M52 32 q6 -12 12 -14" fill="none" strokeWidth={2} />
  </g>
);

export const snake = () => (
  <g>
    <path d="M20 84 Q8 70 24 62 Q44 54 34 42 Q24 30 44 22 Q60 16 70 26" fill="none" stroke={INK} strokeWidth={16} />
    <path d="M20 84 Q8 70 24 62 Q44 54 34 42 Q24 30 44 22 Q60 16 70 26" fill="none" stroke={C.green} strokeWidth={11} />
    <ellipse cx={76} cy={30} rx={13} ry={10} fill={C.green} />
    <circle cx={78} cy={26} r={2.2} fill={INK} stroke="none" />
    <path d="M88 32 l8 2 l-4 2 l4 2" fill="none" stroke={C.red} strokeWidth={1.8} />
    <path d="M28 64 l6 -2 M34 40 l6 2 M48 22 l4 4" fill="none" stroke={C.yellow} strokeWidth={3} />
  </g>
);

export const frog = () => (
  <g>
    <ellipse cx={50} cy={62} rx={34} ry={26} fill={C.green} />
    <circle cx={32} cy={34} r={12} fill={C.green} />
    <circle cx={68} cy={34} r={12} fill={C.green} />
    <circle cx={32} cy={34} r={7} fill={C.white} strokeWidth={1.6} />
    <circle cx={68} cy={34} r={7} fill={C.white} strokeWidth={1.6} />
    <circle cx={33} cy={35} r={3.5} fill={INK} stroke="none" />
    <circle cx={67} cy={35} r={3.5} fill={INK} stroke="none" />
    <path d="M32 62 Q50 76 68 62" fill="none" strokeWidth={2.6} />
    <ellipse cx={26} cy={60} rx={4} ry={2.5} fill={C.blush} stroke="none" />
    <ellipse cx={74} cy={60} rx={4} ry={2.5} fill={C.blush} stroke="none" />
  </g>
);

export const giraffe = () => (
  <g>
    <path d="M38 94 V62 M62 94 V62" fill="none" stroke="#E8B04A" strokeWidth={8} />
    <path d="M38 94 V62 M62 94 V62" fill="none" strokeWidth={1.6} />
    <ellipse cx={50} cy={62} rx={22} ry={14} fill="#F2C35B" />
    <path d="M56 54 L64 18 L74 18 L68 56 Z" fill="#F2C35B" />
    <ellipse cx={74} cy={16} rx={13} ry={9} fill="#F2C35B" />
    <path d="M68 8 v-5 M76 8 v-5" fill="none" strokeWidth={2.4} />
    <circle cx={76} cy={13} r={2} fill={INK} stroke="none" />
    {[[44, 60], [56, 66], [62, 32], [66, 44], [42, 70]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3.5} fill="#B9772A" stroke="none" />)}
  </g>
);

export const crocodile = () => (
  <g>
    <Backdrop sky="#C9ECFF" />
    <path d="M4 70 q8 -5 16 0 t16 0 t16 0 t16 0 t16 0 t12 0 L96 82 Q96 94 84 94 L16 94 Q4 94 4 82 Z" fill="#4FB6E8" />
    <path d="M10 66 Q14 52 34 52 H70 L94 58 L92 64 L70 64 Q50 70 10 66 Z" fill={C.darkGreen} />
    <path d="M70 58 l4 4 l4 -4 l4 4 l4 -4" fill="none" stroke={C.white} strokeWidth={2} />
    <circle cx={60} cy={50} r={6} fill={C.darkGreen} />
    <circle cx={61} cy={49} r={2.2} fill={INK} stroke="none" />
    <path d="M24 52 l4 -6 l4 6 M36 52 l4 -6 l4 6 M48 52 l4 -6 l4 6" fill={C.darkGreen} strokeWidth={1.6} />
  </g>
);

export const mouseDeer = () => (
  <g>
    <path d="M34 66 V92 M44 68 V92 M62 68 V92 M72 66 V92" fill="none" stroke={C.brown} strokeWidth={5} />
    <path d="M34 66 V92 M44 68 V92 M62 68 V92 M72 66 V92" fill="none" strokeWidth={1.4} />
    <ellipse cx={52} cy={60} rx={26} ry={14} fill={C.tan} />
    <path d="M70 52 L78 30" fill="none" stroke={C.tan} strokeWidth={10} />
    <ellipse cx={80} cy={26} rx={10} ry={8} fill={C.tan} />
    <ellipse cx={76} cy={14} rx={3} ry={7} fill={C.tan} />
    <ellipse cx={84} cy={15} rx={3} ry={7} fill={C.tan} />
    <circle cx={82} cy={24} r={2} fill={INK} stroke="none" />
    <circle cx={89} cy={28} r={1.6} fill={INK} stroke="none" />
    <path d="M36 58 h8 M50 62 h8" fill="none" stroke={C.white} strokeWidth={2} />
  </g>
);

// --- Sports --------------------------------------------------------------------------

export const football = () => (
  <g>
    <circle cx={50} cy={50} r={38} fill={C.white} />
    <path d="M50 34 L64 44 L58 60 H42 L36 44 Z" fill={INK} />
    <path d="M50 34 V14 M64 44 L84 38 M58 60 L70 78 M42 60 L30 78 M36 44 L16 38" fill="none" strokeWidth={2.4} />
    <path d="M14 30 Q20 18 30 14 L28 26 Z M86 30 Q80 18 70 14 L72 26 Z" fill={INK} stroke="none" />
  </g>
);

export const badminton = () => (
  <g>
    <g transform="rotate(-30 40 50)">
      <ellipse cx={40} cy={30} rx={18} ry={22} fill={C.white} />
      <path d="M28 18 L52 42 M24 30 L52 30 M28 42 L52 18 M40 8 V52" fill="none" stroke={C.grey} strokeWidth={1} />
      <ellipse cx={40} cy={30} rx={18} ry={22} fill="none" stroke={C.red} strokeWidth={4} />
      <rect x={37} y={52} width={6} height={36} rx={3} fill={C.red} />
    </g>
    <path d="M70 48 L62 28 H86 L78 48 Z" fill={C.white} />
    <path d="M66 28 L70 48 M74 28 V48 M82 28 L78 48" fill="none" strokeWidth={1.2} />
    <circle cx={74} cy={52} r={6} fill={C.cream} />
  </g>
);

export const basketball = () => (
  <g>
    <circle cx={50} cy={50} r={38} fill={C.orange} />
    <path d="M12 50 H88 M50 12 V88 M24 22 Q40 50 24 78 M76 22 Q60 50 76 78" fill="none" strokeWidth={2.4} />
  </g>
);

// --- Hobbies ---------------------------------------------------------------------------

export const guitar = () => (
  <g>
    <g transform="rotate(30 50 50)">
      <rect x={45} y={2} width={10} height={44} rx={2} fill={C.brown} />
      <rect x={42} y={0} width={16} height={8} rx={2} fill={C.darkBrown} />
      <path d="M50 46 Q26 44 28 66 Q26 92 50 92 Q74 92 72 66 Q74 44 50 46 Z" fill={C.orange} />
      <circle cx={50} cy={66} r={7} fill={INK} />
      <path d="M48 8 V84 M52 8 V84" fill="none" stroke={C.silver} strokeWidth={1} />
    </g>
  </g>
);

export const piano = () => (
  <g>
    <rect x={6} y={30} width={88} height={44} rx={4} fill={C.white} />
    {[18, 30, 42, 54, 66, 78].map((x) => <path key={x} d={`M${x} 30 V74`} fill="none" strokeWidth={1.6} />)}
    {[14, 26, 50, 62, 74].map((x) => <rect key={x} x={x} y={30} width={8} height={26} fill={INK} strokeWidth={1} />)}
    <rect x={6} y={20} width={88} height={12} rx={3} fill={INK} />
  </g>
);

export const drum = () => (
  <g>
    <path d="M18 34 V74 Q50 90 82 74 V34" fill={C.red} />
    <ellipse cx={50} cy={34} rx={32} ry={12} fill={C.white} />
    <path d="M18 44 L34 74 L50 44 L66 74 L82 44" fill="none" stroke={C.yellow} strokeWidth={2.4} />
    <path d="M30 6 L48 30 M74 8 L56 30" fill="none" stroke={C.tan} strokeWidth={4} />
    <circle cx={29} cy={5} r={4} fill={C.cream} />
    <circle cx={75} cy={7} r={4} fill={C.cream} />
  </g>
);

export const palette = () => (
  <g>
    <path d="M50 10 Q90 10 92 46 Q94 64 78 64 Q66 64 68 74 Q72 90 52 90 Q12 90 10 52 Q8 10 50 10 Z" fill={C.tan} />
    <circle cx={36} cy={30} r={7} fill={C.red} />
    <circle cx={58} cy={26} r={7} fill={C.yellow} />
    <circle cx={76} cy={40} r={7} fill={C.blue} />
    <circle cx={28} cy={54} r={7} fill={C.green} />
    <circle cx={44} cy={72} r={7} fill={C.purple} />
    <ellipse cx={58} cy={52} rx={7} ry={6} fill={C.white} />
  </g>
);

export const microphone = () => (
  <g>
    <path d="M50 62 V86 M36 90 H64" fill="none" strokeWidth={4} />
    <path d="M28 44 Q28 66 50 66 Q72 66 72 44" fill="none" strokeWidth={4} />
    <rect x={36} y={10} width={28} height={46} rx={14} fill={C.silver} />
    <path d="M38 22 H62 M38 30 H62 M38 38 H62" fill="none" stroke={C.grey} strokeWidth={2} />
    <path d="M78 18 q6 4 0 10 M84 12 q10 8 0 22" fill="none" stroke={C.blue} strokeWidth={2.4} />
  </g>
);

export const camera = () => (
  <g>
    <rect x={8} y={30} width={84} height={56} rx={8} fill={INK} />
    <rect x={30} y={20} width={24} height={12} rx={3} fill={INK} />
    <circle cx={50} cy={58} r={20} fill={C.silver} />
    <circle cx={50} cy={58} r={12} fill={C.navy} />
    <circle cx={46} cy={54} r={3} fill={C.white} stroke="none" />
    <circle cx={78} cy={40} r={4} fill={C.red} />
  </g>
);

// --- Health ------------------------------------------------------------------------------

export const medicine = () => (
  <g>
    <rect x={24} y={28} width={36} height={60} rx={6} fill={C.white} />
    <rect x={22} y={18} width={40} height={12} rx={3} fill={C.red} />
    <path d="M42 46 v20 M32 56 h20" fill="none" stroke={C.red} strokeWidth={5} />
    <g transform="rotate(-30 76 74)">
      <rect x={64} y={68} width={26} height={12} rx={6} fill={C.blue} />
      <path d="M77 68 V80" fill="none" strokeWidth={1.6} />
      <rect x={77} y={68} width={13} height={12} rx={0} fill={C.white} stroke="none" />
      <rect x={64} y={68} width={26} height={12} rx={6} fill="none" />
    </g>
  </g>
);

export const thermometer = () => (
  <g>
    <rect x={42} y={8} width={16} height={66} rx={8} fill={C.white} />
    <rect x={47} y={30} width={6} height={46} fill={C.red} stroke="none" />
    <circle cx={50} cy={80} r={13} fill={C.red} />
    <path d="M58 20 h6 M58 30 h6 M58 40 h6 M58 50 h6 M58 60 h6" fill="none" strokeWidth={2} />
  </g>
);

const SickFace = ({ fill, children, mood = "yuck" as const }: { fill: string; children?: ReactNode; mood?: "yuck" | "sleep" }) => (
  <g>
    <circle cx={50} cy={52} r={34} fill={fill} />
    <Face x={50} y={50} s={1.6} mood={mood} />
    {children}
  </g>
);

export const sick = () => (
  <SickFace fill="#D7F0B0">
    <path d="M58 64 L86 78" fill="none" stroke={INK} strokeWidth={6} />
    <path d="M58 64 L86 78" fill="none" stroke={C.white} strokeWidth={3} />
    <circle cx={88} cy={79} r={4} fill={C.red} />
    <rect x={30} y={12} width={40} height={12} rx={6} fill={C.sky} />
  </SickFace>
);

export const headache = () => (
  <SickFace fill={SKIN.light}>
    <path d="M14 22 l6 6 l-6 2 l8 6 M86 22 l-6 6 l6 2 l-8 6" fill="none" stroke={C.red} strokeWidth={3} />
    <path d="M30 22 Q50 10 70 22" fill="none" stroke={C.red} strokeWidth={3} />
  </SickFace>
);

export const toothache = () => (
  <SickFace fill={SKIN.light}>
    <path d="M16 46 Q50 96 84 46" fill="none" stroke={C.white} strokeWidth={10} />
    <path d="M16 46 Q50 96 84 46" fill="none" strokeWidth={1.6} />
    <path d="M46 10 Q50 4 54 10 V30 Q50 32 46 30 Z" fill={C.white} strokeWidth={2} />
    <path d="M44 4 l-4 -2 M56 4 l4 -2" fill="none" stroke={C.red} strokeWidth={2} />
  </SickFace>
);

export const cough = () => (
  <SickFace fill={SKIN.light}>
    <circle cx={82} cy={58} r={7} fill={C.white} strokeWidth={1.8} />
    <circle cx={92} cy={46} r={5} fill={C.white} strokeWidth={1.8} />
    <circle cx={90} cy={70} r={4} fill={C.white} strokeWidth={1.8} />
  </SickFace>
);

export const stomachache = () => (
  <g>
    <Limb d="M44 66 L42 88" color={C.navy} w={7} />
    <Limb d="M56 66 L58 88" color={C.navy} w={7} />
    <rect x={34} y={36} width={32} height={32} rx={9} fill={C.yellow} />
    <path d="M44 52 q6 -6 12 0 q-6 6 -12 0" fill="none" stroke={C.red} strokeWidth={2.4} />
    <Limb d="M36 42 Q30 56 44 56" color={SKIN.light} w={5} />
    <Limb d="M64 42 Q70 56 56 58" color={SKIN.light} w={5} />
    <circle cx={50} cy={22} r={14} fill={SKIN.light} />
    <path d="M35.5 22 A14.5 14.5 0 0 1 64.5 22 Q57 14 50 15 Q43 14 35.5 22 Z" fill="#3B2F2F" />
    <Face x={50} y={25} s={0.7} mood="yuck" />
  </g>
);

// --- Environment ---------------------------------------------------------------------------

export const recycle = () => (
  <g>
    <path d="M22 30 H78 L72 92 H28 Z" fill={C.green} />
    <rect x={16} y={20} width={68} height={12} rx={4} fill={C.darkGreen} />
    <g fill="none" stroke={C.white} strokeWidth={4}>
      <path d="M40 50 L50 40 L60 50" />
      <path d="M64 58 L60 72 L46 72" />
      <path d="M36 72 L32 58 L40 52" />
    </g>
  </g>
);

export const trash = () => (
  <g>
    <Backdrop sky={C.sky} ground={C.green} />
    <path d="M26 58 Q22 40 40 40 L44 34 L50 40 Q66 40 62 58 Q62 76 44 76 Q26 76 26 58 Z" fill={INK} />
    <rect x={64} y={64} width={16} height={22} rx={3} fill={C.red} transform="rotate(20 72 75)" />
    <path d="M18 82 q6 -6 12 0" fill="none" stroke={C.white} strokeWidth={4} />
    <path d="M58 26 q2 -4 6 -2 M70 30 q2 -4 6 -2" fill="none" strokeWidth={1.6} />
  </g>
);

export const earth = () => (
  <g>
    <circle cx={50} cy={50} r={40} fill={C.blue} />
    <path d="M24 30 Q34 20 44 28 Q48 40 36 44 Q34 56 24 54 Q16 44 24 30 Z M58 18 Q74 22 78 36 Q68 40 62 32 Z M54 52 Q70 48 76 60 Q72 78 58 80 Q48 70 54 52 Z" fill={C.green} />
    <Face x={50} y={52} s={1.1} />
  </g>
);

export const tap = () => (
  <g>
    <path d="M14 30 H54 Q66 30 66 42 V52" fill="none" strokeWidth={12} stroke={INK} />
    <path d="M14 30 H54 Q66 30 66 42 V52" fill="none" strokeWidth={8} stroke={C.silver} />
    <rect x={30} y={14} width={16} height={8} rx={3} fill={C.blue} />
    <path d="M38 22 V28" fill="none" strokeWidth={3} />
    <path d="M66 62 q-6 10 0 14 q6 -4 0 -14 z" fill="#4FB6E8" strokeWidth={1.8} />
    <path d="M66 82 q-4 7 0 9 q4 -2 0 -9 z" fill="#4FB6E8" strokeWidth={1.6} />
  </g>
);

export const sprout = () => (
  <g>
    <path d="M28 64 H72 L66 92 H34 Z" fill="#C46A3A" />
    <rect x={24} y={58} width={52} height={10} rx={3} fill="#D98250" />
    <path d="M50 58 V34" fill="none" stroke={C.darkGreen} strokeWidth={4} />
    <path d="M50 40 Q30 40 26 24 Q44 22 50 40 Z M50 34 Q68 30 74 14 Q54 14 50 34 Z" fill={C.green} />
  </g>
);

export const factory = () => (
  <g>
    <Backdrop sky="#D5D8DE" />
    <path d="M60 34 q-6 -10 2 -16 q-8 -4 0 -10" fill="none" stroke={C.grey} strokeWidth={6} />
    <rect x={56} y={34} width={12} height={30} fill={C.red} />
    <path d="M10 92 V56 L30 44 V56 L50 44 V56 L90 56 V92 Z" fill={C.silver} />
    <rect x={20} y={68} width={10} height={10} fill={C.sky} strokeWidth={1.6} />
    <rect x={40} y={68} width={10} height={10} fill={C.sky} strokeWidth={1.6} />
    <rect x={60} y={68} width={10} height={10} fill={C.sky} strokeWidth={1.6} />
  </g>
);

// --- Cooking ---------------------------------------------------------------------------------

export const pan = () => (
  <g>
    <ellipse cx={40} cy={54} rx={32} ry={20} fill={INK} />
    <ellipse cx={40} cy={52} rx={26} ry={14} fill={C.grey} stroke="none" />
    <path d="M70 50 L96 40" fill="none" strokeWidth={8} />
    <Place x={14} y={22} s={0.5}>
      <path d="M50 16 Q74 14 82 36 Q92 60 74 74 Q58 90 36 82 Q12 74 16 50 Q18 20 50 16 Z" fill={C.white} />
      <circle cx={50} cy={50} r={17} fill={C.yellow} />
    </Place>
  </g>
);

export const bowl = () => (
  <g>
    <path d="M8 44 H92 Q90 86 50 88 Q10 86 8 44 Z" fill={C.blue} />
    <ellipse cx={50} cy={44} rx={42} ry={8} fill={C.white} />
    <path d="M22 60 H78" fill="none" stroke={C.white} strokeWidth={3} strokeDasharray="4 4" />
  </g>
);

export const spoon = () => (
  <g transform="rotate(-35 50 50)">
    <ellipse cx={50} cy={22} rx={14} ry={18} fill={C.silver} />
    <rect x={46} y={38} width={8} height={54} rx={4} fill={C.silver} />
  </g>
);

export const knife = () => (
  <g transform="rotate(-35 50 50)">
    <path d="M44 8 Q60 10 58 40 L58 54 H44 Z" fill={C.silver} />
    <rect x={42} y={54} width={16} height={38} rx={5} fill={C.brown} />
    <circle cx={50} cy={66} r={2} fill={C.cream} stroke="none" />
    <circle cx={50} cy={80} r={2} fill={C.cream} stroke="none" />
  </g>
);
