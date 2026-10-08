import type { ReactNode } from "react";
import { Backdrop, C, Face, INK, Limb, Place, SKIN, Star } from "./base";

// Pictures for the young-learner courses (Grades 1–2): body parts, shapes,
// toys, the classroom, the home, clothes, weather, feelings and positions.

// --- Body -------------------------------------------------------------------

export const eye = () => (
  <g>
    <path d="M10 50 Q50 14 90 50 Q50 86 10 50 Z" fill={C.white} />
    <circle cx={50} cy={50} r={18} fill={C.tan} />
    <circle cx={50} cy={50} r={9} fill={INK} stroke="none" />
    <circle cx={45} cy={45} r={3.5} fill={C.white} stroke="none" />
    <path d="M22 32 l-5 -8 M36 24 l-2 -9 M50 21 v-9 M64 24 l2 -9 M78 32 l5 -8" fill="none" strokeWidth={3} />
  </g>
);

export const ear = () => (
  <g>
    <path d="M38 14 Q74 10 76 44 Q78 66 60 74 Q54 78 54 88 Q52 96 42 92 Q32 88 36 74 Q40 62 32 54 Q22 40 26 26 Q30 16 38 14 Z" fill={SKIN.light} />
    <path d="M44 28 Q62 26 62 44 Q62 54 52 58" fill="none" strokeWidth={2.6} />
  </g>
);

export const nose = () => (
  <g>
    <circle cx={50} cy={50} r={40} fill={SKIN.light} />
    <path d="M50 26 Q44 50 38 58 Q34 66 44 68 Q50 70 56 68 Q66 66 62 58 Q56 50 50 26 Z" fill="#F2BC92" />
    <ellipse cx={44} cy={63} rx={3} ry={2} fill={INK} stroke="none" />
    <ellipse cx={56} cy={63} rx={3} ry={2} fill={INK} stroke="none" />
    <ellipse cx={26} cy={58} rx={6} ry={3.5} fill={C.blush} stroke="none" />
    <ellipse cx={74} cy={58} rx={6} ry={3.5} fill={C.blush} stroke="none" />
  </g>
);

export const mouth = () => (
  <g>
    <path d="M12 44 Q50 34 88 44 Q78 82 50 84 Q22 82 12 44 Z" fill="#E2506A" />
    <path d="M18 46 Q50 40 82 46 L80 54 Q50 50 20 54 Z" fill={C.white} />
    <path d="M30 70 Q50 82 70 70 Q60 64 50 66 Q40 64 30 70 Z" fill={C.pink} stroke="none" />
  </g>
);

export const hand = () => (
  <g>
    <path d="M30 92 L28 58 Q26 52 20 46 L12 36 Q8 30 14 28 Q20 26 26 34 L32 42 L30 16 Q30 10 36 10 Q42 10 42 16 L44 38 L46 10 Q46 4 52 4 Q58 4 58 10 L58 38 L62 14 Q63 8 69 9 Q75 10 74 16 L72 42 L78 26 Q80 20 86 22 Q91 24 89 30 L82 56 Q78 74 72 80 L70 92 Z" fill={SKIN.light} />
    <path d="M44 38 V44 M58 38 V44" fill="none" strokeWidth={1.6} />
  </g>
);

export const foot = () => (
  <g>
    <path d="M30 40 Q26 70 34 86 Q42 96 56 92 Q70 88 70 72 Q70 56 66 40 Q62 26 48 26 Q32 26 30 40 Z" fill={SKIN.light} />
    <ellipse cx={34} cy={18} rx={8} ry={9} fill={SKIN.light} />
    <ellipse cx={49} cy={14} rx={6} ry={7} fill={SKIN.light} />
    <ellipse cx={61} cy={16} rx={5} ry={6} fill={SKIN.light} />
    <ellipse cx={71} cy={21} rx={4.5} ry={5} fill={SKIN.light} />
    <ellipse cx={79} cy={28} rx={4} ry={4.5} fill={SKIN.light} />
  </g>
);

/** A whole child, arms out: the "my body" overview picture. */
export const body = () => (
  <g>
    <Limb d="M38 40 L22 54" color={SKIN.light} w={6} />
    <Limb d="M62 40 L78 54" color={SKIN.light} w={6} />
    <Limb d="M44 66 L42 88" color={C.navy} w={8} />
    <Limb d="M56 66 L58 88" color={C.navy} w={8} />
    <ellipse cx={40} cy={91} rx={7} ry={4} fill={C.red} />
    <ellipse cx={60} cy={91} rx={7} ry={4} fill={C.red} />
    <rect x={36} y={34} width={28} height={34} rx={8} fill={C.yellow} />
    <circle cx={21} cy={55} r={4.5} fill={SKIN.light} />
    <circle cx={79} cy={55} r={4.5} fill={SKIN.light} />
    <circle cx={50} cy={20} r={15} fill={SKIN.light} />
    <path d="M34.5 20 A15.5 15.5 0 0 1 65.5 20 Q58 12 50 13 Q42 12 34.5 20 Z" fill="#3B2F2F" />
    <Face x={50} y={23} s={0.75} mood="smile" />
  </g>
);

export const clap = () => (
  <g>
    <Place x={-14} y={6} s={0.7} rotate={-20}>{hand()}</Place>
    <Place x={44} y={6} s={0.7} rotate={20}><g transform="translate(100 0) scale(-1 1)">{hand()}</g></Place>
    <path d="M50 6 v10 M38 12 l4 8 M62 12 l-4 8" fill="none" stroke={C.orange} strokeWidth={3} />
  </g>
);

export const stamp = () => (
  <g>
    <Place x={14} y={-4} s={0.72}>{foot()}</Place>
    <path d="M10 92 H90" fill="none" strokeWidth={3} />
    <path d="M14 82 l-8 -4 M86 82 l8 -4 M20 72 l-8 -2 M80 72 l8 -2" fill="none" stroke={C.orange} strokeWidth={3} />
  </g>
);

// --- Shapes -------------------------------------------------------------------

export const shape = (kind: "circle" | "square" | "triangle" | "rectangle" | "star", color: string) => (
  <g>
    {kind === "circle" && <circle cx={50} cy={52} r={36} fill={color} />}
    {kind === "square" && <rect x={16} y={18} width={68} height={68} rx={6} fill={color} />}
    {kind === "triangle" && <path d="M50 12 L90 86 H10 Z" fill={color} />}
    {kind === "rectangle" && <rect x={6} y={28} width={88} height={48} rx={6} fill={color} />}
    {kind === "star" && <Star x={50} y={54} r={42} fill={color} />}
    <Face x={50} y={kind === "triangle" ? 62 : 54} s={1.1} />
  </g>
);

// --- Toys ---------------------------------------------------------------------

export const doll = () => (
  <g>
    <circle cx={34} cy={30} r={10} fill="#C0703A" />
    <circle cx={66} cy={30} r={10} fill="#C0703A" />
    <path d="M30 92 L38 52 H62 L70 92 Z" fill={C.pink} />
    <path d="M38 62 H62" fill="none" stroke={C.white} strokeWidth={3} />
    <Limb d="M38 56 L26 70" color={SKIN.light} w={5} />
    <Limb d="M62 56 L74 70" color={SKIN.light} w={5} />
    <circle cx={50} cy={36} r={18} fill={SKIN.light} />
    <path d="M32 36 A18 18 0 0 1 68 36 Q60 24 50 26 Q40 24 32 36 Z" fill="#C0703A" />
    <Face x={50} y={39} s={0.85} mood="smile" />
  </g>
);

export const kite = () => (
  <g>
    <path d="M46 62 Q36 76 46 82 Q56 88 48 96" fill="none" strokeWidth={2} />
    <path d="M44 74 l-5 3 l5 3 z M48 86 l-5 3 l5 3 z" fill={C.yellow} strokeWidth={1.6} />
    <path d="M50 6 L82 34 L50 62 L18 34 Z" fill={C.red} />
    <path d="M50 6 V62 M18 34 H82" fill="none" strokeWidth={2} />
    <path d="M50 6 L82 34 L50 34 Z" fill={C.blue} />
    <path d="M50 34 L18 34 L50 62 Z" fill={C.yellow} />
  </g>
);

export const teddy = () => (
  <g>
    <circle cx={28} cy={24} r={11} fill={C.tan} />
    <circle cx={72} cy={24} r={11} fill={C.tan} />
    <ellipse cx={50} cy={76} rx={26} ry={20} fill={C.tan} />
    <ellipse cx={50} cy={80} rx={13} ry={11} fill={C.cream} />
    <circle cx={24} cy={70} r={9} fill={C.tan} />
    <circle cx={76} cy={70} r={9} fill={C.tan} />
    <circle cx={50} cy={40} r={24} fill={C.tan} />
    <ellipse cx={50} cy={48} rx={11} ry={8} fill={C.cream} />
    <ellipse cx={50} cy={44} rx={3.5} ry={2.5} fill={INK} stroke="none" />
    <Face x={50} y={36} s={0.9} cheeks />
    <path d="M44 56 q6 4 12 0" fill="none" stroke="none" />
  </g>
);

export const toyCar = () => (
  <g>
    <path d="M10 66 V54 Q10 46 18 46 H28 L38 30 H64 L76 46 H84 Q92 46 92 56 V66 Z" fill={C.red} />
    <path d="M40 34 H52 V46 H32 Z M56 34 H62 L72 46 H56 Z" fill={C.sky} strokeWidth={2} />
    <circle cx={28} cy={68} r={10} fill={INK} />
    <circle cx={74} cy={68} r={10} fill={INK} />
    <circle cx={28} cy={68} r={4} fill={C.silver} stroke="none" />
    <circle cx={74} cy={68} r={4} fill={C.silver} stroke="none" />
    <circle cx={88} cy={54} r={3} fill={C.yellow} strokeWidth={1.4} />
  </g>
);

export const robot = () => (
  <g>
    <path d="M50 6 V16" fill="none" strokeWidth={3} />
    <circle cx={50} cy={6} r={4} fill={C.red} />
    <rect x={28} y={16} width={44} height={32} rx={8} fill={C.silver} />
    <circle cx={40} cy={30} r={5} fill={C.blue} />
    <circle cx={60} cy={30} r={5} fill={C.blue} />
    <path d="M40 41 H60" fill="none" strokeWidth={3} />
    <rect x={30} y={52} width={40} height={30} rx={6} fill={C.blue} />
    <rect x={42} y={58} width={16} height={10} rx={2} fill={C.yellow} strokeWidth={1.8} />
    <Limb d="M30 58 L18 72" color={C.silver} w={6} />
    <Limb d="M70 58 L82 72" color={C.silver} w={6} />
    <Limb d="M40 82 V94" color={C.silver} w={6} />
    <Limb d="M60 82 V94" color={C.silver} w={6} />
  </g>
);

export const balloon = () => (
  <g>
    <path d="M30 64 Q34 80 28 96 M66 60 Q62 80 70 96" fill="none" strokeWidth={1.6} />
    <ellipse cx={30} cy={38} rx={20} ry={25} fill={C.red} />
    <ellipse cx={68} cy={34} rx={20} ry={25} fill={C.yellow} />
    <path d="M27 62 l3 4 l3 -4 z M65 58 l3 4 l3 -4 z" fill={C.orange} strokeWidth={1.4} />
    <ellipse cx={23} cy={28} rx={4} ry={7} fill={C.white} stroke="none" opacity={0.6} />
    <ellipse cx={61} cy={24} rx={4} ry={7} fill={C.white} stroke="none" opacity={0.6} />
  </g>
);

export const blocks = () => (
  <g>
    {[
      { x: 12, y: 52, c: C.red, l: "A" },
      { x: 52, y: 52, c: C.blue, l: "B" },
      { x: 32, y: 14, c: C.green, l: "C" },
    ].map((b) => (
      <g key={b.l}>
        <rect x={b.x} y={b.y} width={36} height={36} rx={4} fill={b.c} />
        <text x={b.x + 18} y={b.y + 27} textAnchor="middle" fontSize={24} fontWeight={900} fill={C.white} stroke="none" fontFamily="inherit">{b.l}</text>
      </g>
    ))}
  </g>
);

// --- Classroom ------------------------------------------------------------------

export const desk = () => (
  <g>
    <path d="M18 52 V90 M82 52 V90 M26 52 V84 M74 52 V84" fill="none" stroke={C.darkBrown} strokeWidth={4} />
    <path d="M8 40 H92 L86 54 H14 Z" fill={C.tan} />
    <rect x={30} y={30} width={22} height={10} rx={2} fill={C.red} strokeWidth={2} />
    <path d="M58 36 L78 32" fill="none" stroke={C.yellow} strokeWidth={4} />
  </g>
);

export const door = () => (
  <g>
    <rect x={24} y={8} width={52} height={86} rx={4} fill={C.brown} />
    <rect x={32} y={16} width={36} height={30} rx={3} fill={C.tan} strokeWidth={2} />
    <rect x={32} y={52} width={36} height={34} rx={3} fill={C.tan} strokeWidth={2} />
    <circle cx={66} cy={52} r={3.5} fill={C.yellow} strokeWidth={1.6} />
  </g>
);

export const windowPic = () => (
  <g>
    <rect x={12} y={12} width={76} height={76} rx={6} fill={C.sky} />
    <circle cx={68} cy={32} r={9} fill={C.yellow} strokeWidth={2} />
    <path d="M12 70 Q36 58 60 66 Q76 72 88 64 V88 H12 Z" fill={C.green} stroke="none" />
    <path d="M50 12 V88 M12 50 H88" fill="none" strokeWidth={4} />
    <rect x={12} y={12} width={76} height={76} rx={6} fill="none" strokeWidth={4} />
  </g>
);

export const whiteboard = () => (
  <g>
    <path d="M30 80 L22 96 M70 80 L78 96" fill="none" strokeWidth={3} />
    <rect x={8} y={14} width={84} height={64} rx={4} fill={C.white} />
    <text x={30} y={46} fontSize={18} fontWeight={900} fill={C.blue} stroke="none" fontFamily="inherit">ABC</text>
    <text x={30} y={68} fontSize={14} fontWeight={900} fill={C.red} stroke="none" fontFamily="inherit">1 2 3</text>
    <path d="M12 78 H88" fill="none" strokeWidth={4} stroke={C.grey} />
  </g>
);

const Kid = ({ shirt = C.green, skin = SKIN.light }: { shirt?: string; skin?: string }) => (
  <>
    <circle cx={50} cy={22} r={13} fill={skin} />
    <path d="M36.5 22 A13.5 13.5 0 0 1 63.5 22 Q57 14 50 15 Q43 14 36.5 22 Z" fill="#3B2F2F" />
    <Face x={50} y={25} s={0.65} mood="smile" />
    <rect x={38} y={35} width={24} height={26} rx={7} fill={shirt} />
  </>
);

export const standUp = () => (
  <g>
    <Limb d="M44 60 V88" color={C.navy} w={7} />
    <Limb d="M56 60 V88" color={C.navy} w={7} />
    <Limb d="M38 40 L30 60" color={SKIN.light} w={5} />
    <Limb d="M62 40 L70 60" color={SKIN.light} w={5} />
    <Kid shirt={C.orange} />
    <path d="M84 70 V30 M78 38 L84 30 L90 38" fill="none" stroke={C.green} strokeWidth={4} />
  </g>
);

export const sitDown = () => (
  <g>
    <path d="M30 60 V94 M66 60 V94" fill="none" stroke={C.darkBrown} strokeWidth={4} />
    <rect x={24} y={56} width={48} height={8} rx={2} fill={C.tan} />
    <rect x={24} y={20} width={8} height={40} rx={2} fill={C.tan} />
    <Limb d="M48 60 H64 V86" color={C.navy} w={7} />
    <Kid shirt={C.purple} />
    <path d="M86 30 V70 M80 62 L86 70 L92 62" fill="none" stroke={C.green} strokeWidth={4} />
  </g>
);

export const raiseHand = () => (
  <g>
    <Limb d="M62 40 L70 10" color={SKIN.light} w={5} />
    <circle cx={71} cy={8} r={5} fill={SKIN.light} />
    <Limb d="M38 40 L32 58" color={SKIN.light} w={5} />
    <Limb d="M44 60 V88" color={C.navy} w={7} />
    <Limb d="M56 60 V88" color={C.navy} w={7} />
    <Kid shirt={C.blue} />
    <path d="M80 6 l6 -4 M82 14 h7" fill="none" stroke={C.orange} strokeWidth={3} />
  </g>
);

export const openBook = () => (
  <g>
    <path d="M8 30 Q30 22 50 30 Q70 22 92 30 V82 Q70 74 50 82 Q30 74 8 82 Z" fill={C.white} />
    <path d="M50 30 V82" fill="none" strokeWidth={2.4} />
    <path d="M16 40 h26 M16 50 h26 M16 60 h20 M58 40 h26 M58 50 h26 M58 60 h20" fill="none" stroke={C.grey} strokeWidth={2} />
    <path d="M8 82 Q30 74 50 82 Q70 74 92 82 V88 Q70 80 50 88 Q30 80 8 88 Z" fill={C.red} />
  </g>
);

// --- Fruit ----------------------------------------------------------------------

export const grapes = () => (
  <g>
    <path d="M50 16 q2 -8 8 -10" fill="none" strokeWidth={3} />
    <path d="M52 16 q14 -10 24 0 q-12 8 -24 0 z" fill={C.green} />
    {[[40, 26], [60, 26], [30, 42], [50, 42], [70, 42], [40, 58], [60, 58], [50, 74]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={11} fill={C.purple} />
    ))}
    <Face x={50} y={44} s={0.7} />
  </g>
);

export const watermelon = () => (
  <g>
    <path d="M6 36 H94 Q94 84 50 86 Q6 84 6 36 Z" fill={C.green} />
    <path d="M12 36 H88 Q86 76 50 78 Q14 76 12 36 Z" fill={C.red} stroke="none" />
    <path d="M6 36 H94" fill="none" />
    {[[28, 48], [42, 56], [58, 56], [72, 48], [50, 66]].map(([x, y], i) => (
      <ellipse key={i} cx={x} cy={y} rx={2} ry={3.5} fill={INK} stroke="none" />
    ))}
    <Face x={50} y={44} s={0.9} />
  </g>
);

export const pineapple = () => (
  <g>
    <path d="M50 30 L38 6 L48 18 L50 2 L54 18 L64 6 L54 30 Z" fill={C.green} />
    <ellipse cx={50} cy={62} rx={26} ry={32} fill="#F5B731" />
    <path d="M30 44 L66 86 M34 80 L70 40 M26 62 L52 92 M48 34 L74 62" fill="none" stroke="#C98612" strokeWidth={2} />
    <Face x={50} y={60} s={0.9} />
  </g>
);

export const strawberry = () => (
  <g>
    <path d="M18 34 Q50 20 82 34 Q86 66 50 92 Q14 66 18 34 Z" fill={C.red} />
    <path d="M30 30 l-8 -10 l14 4 l14 -14 l6 14 l12 -4 l-6 10 z" fill={C.green} strokeWidth={2} />
    {[[32, 46], [50, 42], [68, 46], [40, 62], [60, 62], [50, 76]].map(([x, y], i) => (
      <ellipse key={i} cx={x} cy={y} rx={1.6} ry={2.6} fill={C.yellow} stroke="none" />
    ))}
    <Face x={50} y={54} s={0.85} />
  </g>
);

// --- Home -------------------------------------------------------------------------

export const bed = () => (
  <g>
    <path d="M10 92 V40 M90 92 V58" fill="none" stroke={C.darkBrown} strokeWidth={5} />
    <rect x={10} y={30} width={14} height={50} rx={3} fill={C.tan} />
    <rect x={14} y={58} width={78} height={22} rx={4} fill={C.blue} />
    <rect x={26} y={44} width={22} height={14} rx={6} fill={C.white} />
    <path d="M48 58 H92" fill="none" strokeWidth={2} />
  </g>
);

export const sofa = () => (
  <g>
    <rect x={16} y={26} width={68} height={34} rx={10} fill={C.purple} />
    <rect x={6} y={46} width={18} height={34} rx={8} fill={C.purple} />
    <rect x={76} y={46} width={18} height={34} rx={8} fill={C.purple} />
    <rect x={22} y={56} width={56} height={24} rx={6} fill="#C3A0FF" />
    <path d="M50 56 V80" fill="none" strokeWidth={2} />
    <path d="M16 80 V90 M84 80 V90" fill="none" strokeWidth={4} />
  </g>
);

export const stove = () => (
  <g>
    <rect x={14} y={40} width={72} height={52} rx={4} fill={C.white} />
    <rect x={22} y={56} width={56} height={28} rx={3} fill={C.silver} />
    <circle cx={30} cy={48} r={3} fill={INK} stroke="none" />
    <circle cx={42} cy={48} r={3} fill={INK} stroke="none" />
    <path d="M28 40 V28 H52 V40" fill={C.red} />
    <path d="M24 28 H56" fill="none" strokeWidth={3} />
    <path d="M56 32 H70" fill="none" strokeWidth={3} />
    <path d="M34 22 q-3 -5 0 -10 M44 22 q-3 -5 0 -10" fill="none" stroke="#B8BEC8" strokeWidth={2.4} />
  </g>
);

export const bathtub = () => (
  <g>
    <path d="M20 54 V22 Q20 12 30 12 Q38 12 38 20" fill="none" strokeWidth={3} />
    <circle cx={46} cy={36} r={6} fill={C.white} strokeWidth={2} />
    <circle cx={56} cy={30} r={7} fill={C.white} strokeWidth={2} />
    <circle cx={68} cy={36} r={6} fill={C.white} strokeWidth={2} />
    <path d="M8 50 H92 V62 Q92 82 70 82 H30 Q8 82 8 62 Z" fill={C.white} />
    <path d="M12 50 H88" fill="none" stroke={C.sky} strokeWidth={6} />
    <path d="M24 82 L20 92 M76 82 L80 92" fill="none" strokeWidth={4} />
    <Place x={60} y={34} s={0.3}>
      <path d="M24 60 l-9 -11 l11 3 z" fill={C.yellow} />
      <path d="M20 62 Q22 46 42 48 L58 50 Q78 50 82 62 Q80 77 52 77 Q24 77 20 62 Z" fill={C.yellow} />
      <circle cx={64} cy={36} r={14} fill={C.yellow} />
      <path d="M75 37 q12 -2 12 3 q0 5 -12 3 z" fill={C.orange} />
    </Place>
  </g>
);

export const flower = () => (
  <g>
    <path d="M50 52 V92" fill="none" stroke={C.darkGreen} strokeWidth={4} />
    <path d="M50 76 q-18 -2 -22 -14 q14 0 22 14 z M50 70 q16 -4 22 -16 q-14 0 -22 16 z" fill={C.green} />
    {[0, 72, 144, 216, 288].map((a) => (
      <ellipse key={a} cx={50} cy={20} rx={11} ry={16} transform={`rotate(${a} 50 36)`} fill={C.pink} />
    ))}
    <circle cx={50} cy={36} r={11} fill={C.yellow} />
    <Face x={50} y={36} s={0.6} />
  </g>
);

export const tree = () => (
  <g>
    <path d="M42 94 L44 58 H56 L58 94 Z" fill={C.brown} />
    <circle cx={30} cy={44} r={20} fill={C.green} />
    <circle cx={70} cy={44} r={20} fill={C.green} />
    <circle cx={50} cy={28} r={24} fill={C.green} />
    <circle cx={50} cy={50} r={18} fill={C.green} stroke="none" />
    <circle cx={34} cy={36} r={4} fill={C.red} />
    <circle cx={64} cy={30} r={4} fill={C.red} />
    <circle cx={56} cy={52} r={4} fill={C.red} />
  </g>
);

export const school = () => (
  <g>
    <Backdrop sky={C.sky} />
    <path d="M14 42 L50 18 L86 42 Z" fill={C.red} />
    <rect x={20} y={42} width={60} height={50} fill={C.cream} />
    <rect x={42} y={66} width={16} height={26} fill={C.tan} />
    <rect x={26} y={50} width={12} height={10} fill={C.sky} strokeWidth={1.8} />
    <rect x={62} y={50} width={12} height={10} fill={C.sky} strokeWidth={1.8} />
    <circle cx={50} cy={34} r={5} fill={C.white} strokeWidth={1.8} />
    <path d="M50 18 V6 M50 6 h12 v7 h-12" fill={C.red} strokeWidth={2} />
  </g>
);

export const toothbrush = () => (
  <g>
    <g transform="rotate(-35 50 50)">
      <rect x={8} y={44} width={62} height={12} rx={6} fill={C.blue} />
      <rect x={66} y={42} width={26} height={16} rx={3} fill={C.white} />
      <path d="M70 42 V34 M76 42 V32 M82 42 V34 M88 42 V32" fill="none" stroke={C.sky} strokeWidth={4} />
    </g>
    <path d="M72 12 q8 -2 10 4 q6 0 6 6 q-2 6 -10 4 q-6 2 -8 -4 q-6 -6 2 -10 z" fill={C.white} strokeWidth={2} />
  </g>
);

export const sleep = () => (
  <g>
    <Backdrop sky="#2E3A6E" />
    <rect x={10} y={60} width={80} height={20} rx={4} fill={C.blue} />
    <path d="M10 92 V56 M90 92 V66" fill="none" stroke={C.tan} strokeWidth={5} />
    <rect x={14} y={48} width={24} height={14} rx={6} fill={C.white} />
    <circle cx={30} cy={50} r={11} fill={SKIN.light} />
    <Face x={30} y={52} s={0.55} mood="sleep" />
    <text x={52} y={40} fontSize={12} fontWeight={900} fill={C.white} stroke="none" fontFamily="inherit">z</text>
    <text x={62} y={30} fontSize={16} fontWeight={900} fill={C.white} stroke="none" fontFamily="inherit">Z</text>
    <Star x={80} y={18} r={4} />
  </g>
);

// --- Clothes ----------------------------------------------------------------------

export const shirt = () => (
  <g>
    <path d="M34 12 L14 24 L4 46 L20 52 L26 42 V90 H74 V42 L80 52 L96 46 L86 24 L66 12 Q50 24 34 12 Z" fill={C.white} />
    <path d="M34 12 L50 30 L66 12" fill="none" strokeWidth={2.4} />
    <path d="M50 30 V90" fill="none" strokeWidth={2} />
    {[42, 56, 70].map((y) => <circle key={y} cx={54} cy={y} r={2} fill={INK} stroke="none" />)}
  </g>
);

export const tshirt = () => (
  <g>
    <path d="M34 12 L10 26 L18 44 L28 38 V90 H72 V38 L82 44 L90 26 L66 12 Q50 22 34 12 Z" fill={C.red} />
    <Star x={50} y={56} r={11} fill={C.yellow} />
  </g>
);

export const skirt = () => (
  <g>
    <rect x={28} y={14} width={44} height={12} rx={3} fill={C.navy} />
    <path d="M28 26 L10 86 H90 L72 26 Z" fill={C.pink} />
    <path d="M40 26 L32 86 M50 26 V86 M60 26 L68 86" fill="none" strokeWidth={2} />
  </g>
);

export const trousers = () => (
  <g>
    <rect x={24} y={10} width={52} height={12} rx={3} fill={C.brown} />
    <path d="M24 22 L18 94 H44 L50 40 L56 94 H82 L76 22 Z" fill={C.navy} />
    <path d="M50 22 V40" fill="none" strokeWidth={2} />
  </g>
);

export const dress = () => (
  <g>
    <path d="M38 8 V24 M62 8 V24" fill="none" strokeWidth={3} />
    <path d="M36 22 Q50 30 64 22 L66 44 L88 92 H12 L34 44 Z" fill={C.purple} />
    <path d="M34 44 H66" fill="none" stroke={C.white} strokeWidth={4} />
    {[[30, 72], [50, 66], [70, 72], [42, 84], [60, 84]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3} fill={C.white} stroke="none" />)}
  </g>
);

export const hat = () => (
  <g>
    <ellipse cx={50} cy={70} rx={44} ry={12} fill={C.yellow} />
    <path d="M24 70 Q24 26 50 26 Q76 26 76 70 Z" fill={C.yellow} />
    <path d="M25 58 Q50 66 75 58 L76 66 Q50 74 24 66 Z" fill={C.red} />
  </g>
);

export const shoes = () => (
  <g>
    {[0, 44].map((dx) => (
      <g key={dx} transform={`translate(${dx} ${dx ? 10 : 0})`}>
        <path d="M6 70 V46 Q6 38 14 38 H22 Q26 52 40 54 Q52 56 52 66 V70 Z" fill={C.red} />
        <path d="M4 70 H54 V76 H4 Z" fill={C.white} />
        <path d="M18 46 l8 4 M20 52 l8 3" fill="none" stroke={C.white} strokeWidth={2.4} />
      </g>
    ))}
  </g>
);

export const socks = () => (
  <g>
    {[0, 38].map((dx) => (
      <g key={dx} transform={`translate(${dx} ${dx ? 6 : 0})`}>
        <path d="M14 10 H38 V60 Q38 80 22 84 Q8 86 6 76 Q4 66 14 60 Z" fill={C.white} />
        <path d="M14 18 H38 M14 26 H38" fill="none" stroke={C.blue} strokeWidth={4} />
        <path d="M6 76 Q8 86 22 84 Q30 82 32 76 Q20 80 10 72" fill={C.blue} strokeWidth={2} />
      </g>
    ))}
  </g>
);

export const jacket = () => (
  <g>
    <path d="M34 10 L12 22 L6 88 H26 L28 46 V92 H72 V46 L74 88 H94 L88 22 L66 10 L50 22 Z" fill={C.green} />
    <path d="M50 22 V92" fill="none" strokeWidth={2.4} />
    <path d="M34 10 L50 22 L66 10" fill={C.darkGreen} />
    <rect x={32} y={60} width={12} height={8} rx={2} fill={C.darkGreen} strokeWidth={1.8} />
    <rect x={56} y={60} width={12} height={8} rx={2} fill={C.darkGreen} strokeWidth={1.8} />
  </g>
);

export const umbrella = () => (
  <g>
    <path d="M50 46 V82 Q50 92 40 92 Q32 92 32 84" fill="none" strokeWidth={4} />
    <path d="M6 46 Q10 10 50 8 Q90 10 94 46 Q86 40 78 46 Q72 40 64 46 Q57 40 50 46 Q43 40 36 46 Q28 40 22 46 Q14 40 6 46 Z" fill={C.blue} />
    <path d="M50 8 Q36 24 36 46 M50 8 Q64 24 64 46" fill="none" strokeWidth={2} />
  </g>
);

// --- Weather ----------------------------------------------------------------------

export const rain = () => (
  <g>
    <path d="M16 54 Q4 54 6 42 Q8 30 22 32 Q22 14 40 14 Q50 4 64 12 Q80 10 82 28 Q96 30 94 44 Q92 54 80 54 Z" fill={C.grey} />
    <Face x={50} y={36} s={0.9} mood="sleep" />
    {[[24, 64], [42, 70], [60, 64], [78, 70], [34, 84], [70, 86]].map(([x, y], i) => (
      <path key={i} d={`M${x} ${y} q-4 7 0 9 q4 -2 0 -9 z`} fill="#4FB6E8" strokeWidth={1.6} />
    ))}
  </g>
);

export const windy = () => (
  <g>
    <path d="M6 30 H58 Q70 30 70 20 Q70 10 60 12 M6 50 H78 Q92 50 92 62 Q92 74 80 72 M6 70 H46 Q56 70 56 80" fill="none" stroke={C.blue} strokeWidth={5} />
    <path d="M70 34 q10 -4 14 4 q-8 6 -14 -4 z" fill={C.green} strokeWidth={1.8} />
    <path d="M24 82 q10 -4 14 4 q-8 6 -14 -4 z" fill={C.orange} strokeWidth={1.8} />
  </g>
);

export const hot = () => (
  <g>
    <circle cx={50} cy={50} r={30} fill={C.orange} />
    <path d="M50 10 V2 M50 98 V90 M10 50 H2 M98 50 H90 M22 22 l-6 -6 M78 78 l6 6 M78 22 l6 -6 M22 78 l-6 6" fill="none" stroke={C.red} strokeWidth={4} />
    <Face x={50} y={50} s={1.3} mood="open" />
    <path d="M72 38 q4 6 0 9 q-4 -3 0 -9 z" fill="#7EC8F7" strokeWidth={1.6} />
  </g>
);

export const cold = () => (
  <g>
    <circle cx={50} cy={52} r={30} fill="#CFE9FF" />
    <path d="M22 40 Q50 18 78 40 L76 46 Q50 30 24 46 Z" fill={C.red} />
    <circle cx={50} cy={20} r={6} fill={C.white} />
    <Face x={50} y={56} s={1.2} mood="yuck" />
    {[[10, 20], [88, 26], [12, 82], [88, 82]].map(([x, y], i) => (
      <path key={i} d={`M${x - 6} ${y} h12 M${x} ${y - 6} v12 M${x - 4} ${y - 4} l8 8 M${x + 4} ${y - 4} l-8 8`} fill="none" stroke={C.blue} strokeWidth={2} />
    ))}
  </g>
);

export const rainbow = () => (
  <g>
    {[C.red, C.orange, C.yellow, C.green, C.blue, C.purple].map((c, i) => (
      <path key={c} d={`M${8 + i * 6} 80 A${42 - i * 6} ${42 - i * 6} 0 0 1 ${92 - i * 6} 80`} fill="none" stroke={c} strokeWidth={6} />
    ))}
    <path d="M4 82 Q4 70 16 72 Q20 64 28 70 Q36 70 34 82 Z M66 82 Q66 70 78 72 Q82 64 90 70 Q98 70 96 82 Z" fill={C.white} strokeWidth={2} />
  </g>
);

// --- Feelings ---------------------------------------------------------------------

const Mood = ({ fill, brows, mouth: m, extra }: { fill: string; brows?: string; mouth: string; extra?: ReactNode }) => (
  <g>
    <circle cx={50} cy={52} r={36} fill={fill} />
    <circle cx={38} cy={46} r={4} fill={INK} stroke="none" />
    <circle cx={62} cy={46} r={4} fill={INK} stroke="none" />
    {brows && <path d={brows} fill="none" strokeWidth={3} />}
    <path d={m} fill="none" strokeWidth={3} />
    {extra}
  </g>
);

export const happy = () => <Mood fill={C.yellow} mouth="M34 60 Q50 76 66 60" extra={<><ellipse cx={28} cy={58} rx={5} ry={3} fill={C.blush} stroke="none" /><ellipse cx={72} cy={58} rx={5} ry={3} fill={C.blush} stroke="none" /></>} />;
export const sad = () => <Mood fill="#9CC9F5" brows="M30 38 l12 -4 M70 38 l-12 -4" mouth="M36 70 Q50 58 64 70" extra={<path d="M64 54 q4 8 0 11 q-4 -3 0 -11 z" fill="#4FB6E8" strokeWidth={1.6} />} />;
export const angry = () => <Mood fill={C.red} brows="M30 34 l14 6 M70 34 l-14 6" mouth="M36 68 H64" extra={<path d="M80 18 l4 6 l6 -3 l-2 7 l6 3 l-7 2 l1 7 l-6 -4" fill="none" stroke={INK} strokeWidth={2} />} />;
export const scared = () => <Mood fill="#D9C8FF" brows="M30 36 l12 -6 M70 36 l-12 -6" mouth="M38 66 q4 -6 8 0 t8 0 t8 0" extra={<path d="M20 30 l-6 -6 M80 30 l6 -6" fill="none" strokeWidth={2.4} />} />;
export const surprised = () => <Mood fill={C.orange} brows="M30 34 q8 -8 14 0 M56 34 q8 -8 14 0" mouth="M50 62 m-8 0 a8 10 0 1 0 16 0 a8 10 0 1 0 -16 0" />;

// --- Positions --------------------------------------------------------------------

const Box = ({ x = 30, y = 50 }: { x?: number; y?: number }) => (
  <g>
    <path d={`M${x} ${y} h40 v34 h-40 z`} fill={C.tan} />
    <path d={`M${x} ${y} l-8 -10 h40 l8 10 M${x + 40} ${y} l8 -10`} fill={C.cream} />
  </g>
);
const LittleBall = ({ x, y }: { x: number; y: number }) => (
  <g>
    <circle cx={x} cy={y} r={11} fill={C.red} />
    <path d={`M${x - 11} ${y} q11 -6 22 0`} fill="none" stroke={C.white} strokeWidth={2.4} />
  </g>
);

export const posIn = () => (
  <g>
    <path d="M30 50 l-8 -10 h40 l8 10" fill={C.cream} />
    <LittleBall x={48} y={46} />
    <path d="M30 50 h40 v34 h-40 z" fill={C.tan} />
  </g>
);
export const posOn = () => (
  <g>
    <Box />
    <LittleBall x={50} y={29} />
  </g>
);
export const posUnder = () => (
  <g>
    <path d="M14 40 H86 M22 40 V88 M78 40 V88" fill="none" stroke={C.brown} strokeWidth={6} />
    <LittleBall x={50} y={76} />
  </g>
);
export const posNextTo = () => (
  <g>
    <Box x={18} />
    <LittleBall x={78} y={73} />
  </g>
);
