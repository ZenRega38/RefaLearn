import { C, Face, INK, Limb, Place } from "./base";

const Steam = ({ y = 22 }: { y?: number }) => (
  <path d={`M38 ${y} q-5 -6 0 -12 M50 ${y - 2} q-5 -6 0 -12 M62 ${y} q-5 -6 0 -12`} fill="none" stroke="#B8BEC8" strokeWidth={2.4} />
);

export const rice = () => (
  <g>
    <Steam y={26} />
    <path d="M22 56 Q22 36 38 36 Q44 26 56 30 Q74 30 78 56 Z" fill={C.white} />
    <path d="M34 44 l3 -1 M46 38 l3 1 M60 40 l3 1 M54 48 l3 -1 M40 52 l3 0 M66 50 l3 1" fill="none" stroke={C.silver} strokeWidth={2} />
    <path d="M16 56 h68 Q82 86 50 88 Q18 86 16 56 Z" fill={C.blue} />
    <path d="M22 64 h56" fill="none" stroke={C.white} strokeWidth={2} strokeDasharray="3 4" />
    <Face x={50} y={74} s={0.9} />
  </g>
);

export const bread = () => (
  <g>
    <path d="M22 84 V48 Q12 46 15 34 Q20 18 50 18 Q80 18 85 34 Q88 46 78 48 V84 Q50 88 22 84 Z" fill="#D9954A" />
    <path d="M29 78 V45 Q22 43 24 36 Q28 26 50 26 Q72 26 76 36 Q78 43 71 45 V78 Q50 81 29 78 Z" fill="#FFE7B3" stroke="none" />
    <Face x={50} y={56} s={1.1} />
  </g>
);

export const egg = () => (
  <g>
    <path d="M50 16 Q74 14 82 36 Q92 60 74 74 Q58 90 36 82 Q12 74 16 50 Q18 20 50 16 Z" fill={C.white} />
    <circle cx={50} cy={50} r={17} fill={C.yellow} />
    <Face x={50} y={50} s={0.9} />
  </g>
);

export const grilledFish = () => (
  <g>
    <ellipse cx={50} cy={64} rx={42} ry={20} fill={C.white} />
    <ellipse cx={50} cy={62} rx={32} ry={13} fill="none" stroke={C.silver} strokeWidth={2} />
    <path d="M70 56 L86 46 L86 66 Z" fill="#B8692F" />
    <ellipse cx={46} cy={56} rx={27} ry={13} fill="#C97B3A" />
    <path d="M38 46 l-6 18 M48 44 l-6 22 M58 46 l-6 18" fill="none" stroke="#7A4421" strokeWidth={2.4} />
    <circle cx={26} cy={53} r={2.2} fill={INK} stroke="none" />
    <circle cx={76} cy={72} r={7} fill="#C8E66B" />
    <path d="M76 66 v12 M70 72 h12" fill="none" strokeWidth={1.4} />
  </g>
);

export const drumstick = () => (
  <g>
    <Limb d="M58 58 L74 74" color={C.cream} w={8} />
    <circle cx={78} cy={72} r={6} fill={C.cream} />
    <circle cx={72} cy={79} r={6} fill={C.cream} />
    <ellipse cx={42} cy={42} rx={27} ry={21} transform="rotate(-40 42 42)" fill="#D2852F" />
    <path d="M28 34 q4 -3 7 0 M44 26 q4 -3 7 0 M50 46 q4 -3 7 0 M32 52 q4 -3 7 0" fill="none" stroke="#A35F1E" strokeWidth={2} />
    <Face x={42} y={40} s={0.9} />
  </g>
);

export const vegetables = () => (
  <g>
    <path d="M66 36 L84 86 L58 42 Z" fill={C.orange} />
    <path d="M64 40 l6 -2 M68 50 l6 -2 M72 60 l5 -2" fill="none" strokeWidth={1.6} />
    <path d="M60 36 q-4 -14 2 -18 q2 10 4 14 q2 -12 10 -14 q-2 12 -6 18 z" fill={C.green} />
    <path d="M30 88 L34 60 h12 L48 88 Z" fill="#A8D88A" />
    <circle cx={26} cy={52} r={12} fill={C.darkGreen} />
    <circle cx={52} cy={52} r={12} fill={C.darkGreen} />
    <circle cx={40} cy={38} r={15} fill={C.darkGreen} />
    <circle cx={40} cy={58} r={11} fill={C.darkGreen} stroke="none" />
    <Face x={40} y={50} s={0.85} />
  </g>
);

export const milk = () => (
  <g>
    <path d="M28 38 L44 18 H60 L72 38 Z" fill={C.white} />
    <rect x={44} y={10} width={16} height={8} rx={2} fill={C.blue} />
    <rect x={28} y={38} width={44} height={52} rx={4} fill={C.white} />
    <rect x={28} y={50} width={44} height={16} fill={C.blue} />
    <text x={50} y={62} textAnchor="middle" fontSize={11} fontWeight={900} fill={C.white} stroke="none" fontFamily="inherit">MILK</text>
    <Face x={50} y={76} s={0.8} />
  </g>
);

export const water = () => (
  <g>
    <path d="M26 20 H74 L68 88 H32 Z" fill="#EAF7FF" />
    <path d="M29 42 H71 L67 85.5 H33 Z" fill="#7EC8F7" stroke="none" />
    <path d="M29 42 H71" fill="none" strokeWidth={2} />
    <path d="M34 28 L36 50" fill="none" stroke={C.white} strokeWidth={3} />
    <Face x={50} y={62} s={0.9} />
    <path d="M84 14 q8 12 0 16 q-8 -4 0 -16 z" fill="#7EC8F7" strokeWidth={2} />
  </g>
);

export const juice = () => (
  <g>
    <Limb d="M58 26 L62 10 L74 8" color={C.pink} w={3.5} />
    <rect x={28} y={26} width={42} height={64} rx={5} fill={C.orange} />
    <path d="M28 36 H70" fill="none" strokeWidth={2} />
    <circle cx={49} cy={56} r={10} fill={C.yellow} />
    <path d="M49 46 v20 M39 56 h20 M42 49 l14 14 M56 49 l-14 14" fill="none" stroke="#F2A93B" strokeWidth={1.6} />
    <Face x={49} y={78} s={0.8} />
  </g>
);

export const tea = () => (
  <g>
    <Steam y={34} />
    <ellipse cx={46} cy={84} rx={34} ry={7} fill={C.white} />
    <path d="M70 52 q15 -2 13 10 q-2 10 -16 8" fill="none" strokeWidth={4} />
    <path d="M20 46 H72 V56 Q72 82 46 82 Q20 82 20 56 Z" fill={C.white} />
    <ellipse cx={46} cy={46} rx={26} ry={5} fill="#B5651D" />
    <path d="M22 62 h48" fill="none" stroke={C.green} strokeWidth={3} />
    <Face x={46} y={68} s={0.8} />
  </g>
);

export const apple = () => (
  <g>
    <path d="M50 30 Q66 20 77 34 Q88 54 72 76 Q62 88 50 82 Q38 88 28 76 Q12 54 23 34 Q34 20 50 30 Z" fill={C.red} />
    <path d="M50 30 q0 -10 4 -16" fill="none" strokeWidth={3} />
    <path d="M54 20 q12 -10 20 -2 q-10 8 -20 2 z" fill={C.green} />
    <path d="M30 42 q2 -8 8 -10" fill="none" stroke={C.white} strokeWidth={3} />
    <Face x={50} y={56} s={1} />
  </g>
);

export const mango = () => (
  <g>
    <path d="M34 24 Q52 14 66 26 Q86 44 82 70 Q78 90 58 88 Q40 86 34 70 Q30 58 22 48 Q16 32 34 24 Z" fill="#FFC23A" />
    <path d="M34 24 Q52 14 66 26 Q70 32 66 40 Q46 30 28 46 Q20 40 22 34 Q26 26 34 24 Z" fill="#8CCB55" stroke="none" />
    <path d="M40 22 q-2 -8 2 -12" fill="none" strokeWidth={3} />
    <path d="M42 14 q12 -8 20 2 q-12 6 -20 -2 z" fill={C.green} />
    <Face x={56} y={60} s={1} />
  </g>
);

export const banana = () => (
  <g>
    <path d="M28 22 Q22 60 50 76 Q72 88 88 76 Q62 74 46 58 Q34 44 36 22 Z" fill="#F4C431" />
    <path d="M18 26 Q16 66 50 82 Q74 92 90 78 Q64 78 44 64 Q26 50 28 26 Z" fill={C.yellow} />
    <path d="M18 18 l9 1 l-1 9 l-9 -1 z" fill={C.darkBrown} />
    <path d="M88 76 l4 2" fill="none" strokeWidth={3} />
    <Face x={44} y={62} s={0.8} />
  </g>
);

export const orangeFruit = () => (
  <g>
    <circle cx={50} cy={56} r={30} fill={C.orange} />
    <path d="M50 26 q-1 -8 3 -12" fill="none" strokeWidth={3} />
    <path d="M52 22 q10 -12 22 -6 q-10 10 -22 6 z" fill={C.green} />
    <g fill="#E8892F" stroke="none">
      <circle cx={34} cy={44} r={1.4} /><circle cx={66} cy={42} r={1.4} /><circle cx={70} cy={66} r={1.4} /><circle cx={30} cy={66} r={1.4} />
    </g>
    <Face x={50} y={58} s={1} />
  </g>
);

export const tomato = () => (
  <g>
    <ellipse cx={50} cy={58} rx={32} ry={27} fill={C.red} />
    <path d="M50 34 l-12 -4 l8 -2 l-6 -8 l10 6 l4 -8 l3 8 l10 -4 l-6 8 l10 3 z" fill={C.green} strokeWidth={2} />
    <Face x={50} y={60} s={1} />
  </g>
);

export const leaf = () => (
  <g>
    <path d="M18 82 Q16 30 74 16 Q86 14 84 26 Q78 80 18 82 Z" fill={C.green} />
    <path d="M18 82 Q48 52 76 24 M40 60 l-8 -12 M52 48 l-4 -14 M48 54 l14 2 M60 42 l12 2" fill="none" stroke={C.darkGreen} strokeWidth={2.2} />
  </g>
);

export const cloud = () => (
  <g>
    <path d="M16 70 Q4 70 6 58 Q8 46 22 48 Q22 30 40 30 Q50 18 64 26 Q80 24 82 42 Q96 44 94 58 Q92 70 80 70 Z" fill={C.white} />
    <Face x={50} y={54} s={1.1} />
  </g>
);

export const cake = () => (
  <g>
    <path d="M26 58 H74 L68 88 H32 Z" fill={C.sky} />
    <path d="M38 60 l2 26 M50 60 v26 M62 60 l-2 26" fill="none" strokeWidth={1.8} />
    <path d="M22 60 Q18 46 34 44 Q34 28 50 28 Q66 28 66 44 Q82 46 78 60 Z" fill={C.pink} />
    <circle cx={50} cy={22} r={7} fill={C.red} />
    <path d="M50 15 q2 -6 6 -8" fill="none" strokeWidth={2} />
    <g stroke="none">
      <rect x={34} y={48} width={5} height={2} rx={1} fill={C.yellow} transform="rotate(30 36 49)" />
      <rect x={60} y={50} width={5} height={2} rx={1} fill={C.blue} transform="rotate(-30 62 51)" />
      <rect x={48} y={40} width={5} height={2} rx={1} fill={C.green} />
    </g>
  </g>
);

export const ball = () => (
  <g>
    <circle cx={50} cy={52} r={32} fill={C.white} />
    <path d="M50 20 Q30 52 50 84 Q22 82 18 52 Q20 24 50 20 Z" fill={C.red} />
    <path d="M50 20 Q70 52 50 84 Q78 82 82 52 Q80 24 50 20 Z" fill={C.blue} />
    <path d="M20 46 Q50 38 80 46" fill="none" strokeWidth={2} />
    <ellipse cx={36} cy={34} rx={5} ry={3} fill={C.white} stroke="none" opacity={0.7} />
  </g>
);

export const basket = () => (
  <g>
    <path d="M28 50 Q50 6 72 50" fill="none" stroke={C.darkBrown} strokeWidth={5} />
    <Place x={12} y={10} s={0.5}>{apple()}</Place>
    <Place x={38} y={6} s={0.5}>{banana()}</Place>
    <path d="M14 48 H86 L76 88 H24 Z" fill={C.tan} />
    <path d="M18 60 H82 M21 72 H79 M36 48 l2 40 M50 48 v40 M64 48 l-2 40" fill="none" stroke={C.brown} strokeWidth={2} />
  </g>
);

export const stall = () => (
  <g>
    <path d="M14 34 V90 M86 34 V90" fill="none" stroke={C.brown} strokeWidth={4} />
    <path d="M6 18 L94 18 L92 34 Q86 40 80 34 Q74 40 68 34 Q62 40 56 34 Q50 40 44 34 Q38 40 32 34 Q26 40 20 34 Q14 40 8 34 Z" fill={C.red} />
    <path d="M20 18 V34 M32 18 V34 M44 18 V34 M56 18 V34 M68 18 V34 M80 18 V34" fill="none" stroke={C.white} strokeWidth={5} />
    <path d="M6 18 L94 18" fill="none" />
    <Place x={10} y={36} s={0.32}>{mango()}</Place>
    <Place x={36} y={36} s={0.32}>{banana()}</Place>
    <Place x={62} y={36} s={0.32}>{orangeFruit()}</Place>
    <rect x={8} y={66} width={84} height={24} rx={4} fill={C.tan} />
    <text x={50} y={82} textAnchor="middle" fontSize={10} fontWeight={900} fill={INK} stroke="none" fontFamily="inherit">FRUIT</text>
  </g>
);

export const lunch = () => (
  <g>
    <ellipse cx={44} cy={66} rx={40} ry={20} fill={C.white} />
    <ellipse cx={44} cy={64} rx={30} ry={13} fill="none" stroke={C.silver} strokeWidth={2} />
    <path d="M18 64 Q18 46 32 46 Q40 40 46 48 Q50 64 18 64 Z" fill={C.white} />
    <Place x={28} y={36} s={0.36}>{grilledFish()}</Place>
    <circle cx={30} cy={70} r={5} fill={C.darkGreen} />
    <circle cx={37} cy={72} r={5} fill={C.darkGreen} />
    <Place x={62} y={22} s={0.5}>{juice()}</Place>
  </g>
);

export const yum = () => (
  <g>
    <circle cx={50} cy={50} r={36} fill={C.yellow} />
    <Face x={50} y={46} s={2} mood="yum" />
  </g>
);

export const yuck = () => (
  <g>
    <circle cx={50} cy={50} r={36} fill="#C9E88A" />
    <Face x={50} y={46} s={2} mood="yuck" />
  </g>
);

export const heart = () => (
  <g>
    <path d="M50 84 Q14 60 14 38 Q14 18 32 18 Q44 18 50 30 Q56 18 68 18 Q86 18 86 38 Q86 60 50 84 Z" fill={C.red} />
    <Face x={50} y={46} s={1.1} />
  </g>
);
