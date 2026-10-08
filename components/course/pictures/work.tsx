import type { ReactNode } from "react";
import { Backdrop, C, Face, INK, Place, SKIN, Star } from "./base";
import { Person } from "./people";
import { drumstick } from "./food";

// Adult / workplace pictures for the English Day course: customer service,
// WiFi support, billing, daily routine and feelings.

// --- People at work -------------------------------------------------------

/** Customer-service staff with a headset. */
export const staff = () => (
  <g>
    <Person shirt={C.red} hair="hijab" hairColor={C.navy} skin={SKIN.medium} mood="smile" />
    <path d="M28 42 Q28 14 50 14 Q72 14 72 42" fill="none" stroke={INK} strokeWidth={4} />
    <rect x={23} y={36} width={9} height={14} rx={4} fill={C.grey} />
    <rect x={68} y={36} width={9} height={14} rx={4} fill={C.grey} />
    <path d="M27 50 Q30 58 42 58" fill="none" strokeWidth={2.4} />
    <circle cx={43} cy={58} r={2.6} fill={INK} />
  </g>
);

export const headset = () => (
  <g>
    <path d="M22 56 Q22 18 50 18 Q78 18 78 56" fill="none" stroke={INK} strokeWidth={7} />
    <path d="M22 56 Q22 18 50 18 Q78 18 78 56" fill="none" stroke={C.blue} strokeWidth={3} />
    <rect x={14} y={48} width={16} height={26} rx={7} fill={C.blue} />
    <rect x={70} y={48} width={16} height={26} rx={7} fill={C.blue} />
    <path d="M22 74 Q24 88 44 86" fill="none" strokeWidth={3} />
    <ellipse cx={48} cy={86} rx={6} ry={4} fill={C.red} />
    <Face x={50} y={46} s={0.9} />
  </g>
);

export const customer = () => <Person shirt={C.green} hair="short" skin={SKIN.tan} collar mustache="#3B2F2F" />;
export const customerAngry = () => (
  <g>
    <Person shirt={C.purple} hair="short" skin={SKIN.medium} collar mood="yuck" />
    <path d="M37 33 l8 3 M63 33 l-8 3" fill="none" strokeWidth={2.4} />
    <path d="M78 14 l4 6 l6 -3 l-2 7 l6 3 l-7 2 l1 7 l-6 -4 l-4 6 l-1 -7 l-7 0 l5 -5 l-4 -6 l7 2 z" fill={C.red} strokeWidth={1.8} />
  </g>
);

export const technician = () => (
  <g>
    <Person shirt={C.orange} hair="short" skin={SKIN.tan} />
    <path d="M28 30 Q28 12 50 12 Q72 12 72 30 Z" fill={C.yellow} />
    <path d="M24 30 H76" fill="none" strokeWidth={4} />
    <path d="M47 12 v8 M53 12 v8" fill="none" strokeWidth={1.8} />
    <g transform="rotate(35 80 74)">
      <rect x={76} y={62} width={8} height={26} rx={3} fill={C.grey} />
      <path d="M72 62 a8 8 0 1 1 16 0 l-4 0 l0 -4 l-8 0 l0 4 z" fill={C.grey} />
    </g>
  </g>
);

export const meeting = () => (
  <g>
    <Place x={-22} y={4} s={0.62}>{customer()}</Place>
    <Place x={42} y={4} s={0.62}>{staff()}</Place>
    <Place x={10} y={-6} s={0.62}><Person shirt={C.blue} hair="short" skin={SKIN.light} glasses collar /></Place>
    <rect x={6} y={70} width={88} height={14} rx={4} fill={C.tan} />
    <rect x={40} y={62} width={20} height={10} rx={2} fill={C.white} strokeWidth={1.8} />
  </g>
);

// --- Devices & internet ---------------------------------------------------

export const smartphone = () => (
  <g>
    <rect x={30} y={10} width={40} height={80} rx={8} fill={INK} />
    <rect x={34} y={18} width={32} height={60} rx={3} fill={C.sky} stroke="none" />
    <circle cx={50} cy={84} r={2.5} fill={C.grey} stroke="none" />
    <rect x={38} y={24} width={10} height={10} rx={3} fill={C.red} strokeWidth={1.4} />
    <rect x={52} y={24} width={10} height={10} rx={3} fill={C.green} strokeWidth={1.4} />
    <rect x={38} y={38} width={10} height={10} rx={3} fill={C.yellow} strokeWidth={1.4} />
    <rect x={52} y={38} width={10} height={10} rx={3} fill={C.purple} strokeWidth={1.4} />
    <Face x={50} y={62} s={0.7} />
  </g>
);

export const phoneCall = () => (
  <g>
    <path d="M28 20 q-14 8 -6 30 q10 26 34 34 q20 6 26 -8 l-14 -12 q-6 6 -12 2 q-14 -8 -18 -22 q-2 -6 4 -10 z" fill={C.green} />
    <path d="M62 18 q14 4 18 18 M60 30 q6 2 8 8" fill="none" stroke={C.blue} strokeWidth={3} />
  </g>
);

export const laptop = () => (
  <g>
    <rect x={18} y={20} width={64} height={44} rx={4} fill={INK} />
    <rect x={22} y={24} width={56} height={36} rx={2} fill={C.sky} stroke="none" />
    <path d="M8 70 H92 L86 80 H14 Z" fill={C.silver} />
    <Face x={50} y={42} s={0.9} />
  </g>
);

export const modem = (light: string = C.green) => (
  <g>
    <path d="M30 34 L24 12 M70 34 L76 12" fill="none" strokeWidth={4} />
    <circle cx={24} cy={12} r={3} fill={INK} />
    <circle cx={76} cy={12} r={3} fill={INK} />
    <rect x={12} y={34} width={76} height={34} rx={10} fill={C.white} />
    <circle cx={30} cy={58} r={4} fill={C.green} strokeWidth={1.6} />
    <circle cx={44} cy={58} r={4} fill={C.green} strokeWidth={1.6} />
    <circle cx={58} cy={58} r={4} fill={light} strokeWidth={1.6} />
    <circle cx={72} cy={58} r={4} fill={C.green} strokeWidth={1.6} />
    <Face x={50} y={44} s={0.7} mood={light === C.red ? "yuck" : "happy"} />
    <rect x={30} y={68} width={6} height={6} fill={INK} />
    <rect x={64} y={68} width={6} height={6} fill={INK} />
  </g>
);

export const wifi = () => (
  <g>
    <circle cx={50} cy={50} r={40} fill={C.sky} />
    <path d="M22 44 Q50 18 78 44" fill="none" stroke={C.blue} strokeWidth={7} />
    <path d="M32 54 Q50 38 68 54" fill="none" stroke={C.blue} strokeWidth={7} />
    <path d="M42 64 Q50 57 58 64" fill="none" stroke={C.blue} strokeWidth={7} />
    <circle cx={50} cy={74} r={5} fill={C.blue} />
  </g>
);

export const cable = () => (
  <g>
    <path d="M10 70 Q30 30 50 60 T90 40" fill="none" stroke={INK} strokeWidth={8} />
    <path d="M10 70 Q30 30 50 60 T90 40" fill="none" stroke={C.yellow} strokeWidth={4} />
    <rect x={74} y={28} width={18} height={20} rx={3} fill={C.white} transform="rotate(-20 83 38)" />
    <path d="M78 26 l2 -6 M86 24 l2 -6" fill="none" strokeWidth={2.4} />
  </g>
);

export const signal = () => (
  <g>
    <rect x={14} y={66} width={12} height={18} rx={2} fill={C.green} />
    <rect x={32} y={52} width={12} height={32} rx={2} fill={C.green} />
    <rect x={50} y={36} width={12} height={48} rx={2} fill={C.silver} />
    <rect x={68} y={20} width={12} height={64} rx={2} fill={C.silver} />
  </g>
);

export const download = () => (
  <g>
    <circle cx={50} cy={50} r={38} fill={C.green} />
    <path d="M50 26 V62 M36 50 L50 64 L64 50 M32 74 H68" fill="none" stroke={C.white} strokeWidth={6} />
  </g>
);

export const upload = () => (
  <g>
    <circle cx={50} cy={50} r={38} fill={C.blue} />
    <path d="M50 66 V30 M36 42 L50 28 L64 42 M32 74 H68" fill="none" stroke={C.white} strokeWidth={6} />
  </g>
);

export const videoApp = () => (
  <g>
    <rect x={12} y={22} width={76} height={56} rx={16} fill={C.red} />
    <path d="M42 36 L64 50 L42 64 Z" fill={C.white} />
  </g>
);

export const chat = () => (
  <g>
    <path d="M12 18 H62 Q70 18 70 26 V48 Q70 56 62 56 H32 L20 66 V56 H20 Q12 56 12 48 V26 Q12 18 20 18 Z" fill={C.green} />
    <path d="M40 46 H80 Q88 46 88 54 V72 Q88 80 80 80 H78 V90 L66 80 H48 Q40 80 40 72 Z" fill={C.white} />
    <path d="M24 32 H58 M24 42 H48 M50 60 H78 M50 70 H70" fill="none" strokeWidth={2.2} />
  </g>
);

export const question = () => (
  <g>
    <circle cx={50} cy={50} r={38} fill={C.yellow} />
    <text x={50} y={68} textAnchor="middle" fontSize={52} fontWeight={900} fill={C.white} stroke={INK} strokeWidth={2.5} paintOrder="stroke" fontFamily="inherit">?</text>
  </g>
);

// --- Billing --------------------------------------------------------------

export const bill = () => (
  <g>
    <path d="M24 10 H76 V90 L68 84 L60 90 L52 84 L44 90 L36 84 L28 90 L24 87 Z" fill={C.white} />
    <rect x={32} y={18} width={36} height={10} rx={2} fill={C.red} stroke="none" />
    <path d="M32 38 H68 M32 48 H60 M32 58 H64" fill="none" stroke={C.grey} strokeWidth={2.4} />
    <text x={50} y={76} textAnchor="middle" fontSize={8.5} fontWeight={900} fill={INK} stroke="none" fontFamily="inherit">Rp 350.000</text>
  </g>
);

export const money = () => (
  <g>
    <rect x={10} y={30} width={70} height={38} rx={4} fill="#8FD19E" transform="rotate(-8 45 49)" />
    <rect x={20} y={36} width={70} height={38} rx={4} fill="#F5A5B8" />
    <circle cx={55} cy={55} r={10} fill={C.white} strokeWidth={2} />
    <text x={55} y={59} textAnchor="middle" fontSize={11} fontWeight={900} fill={INK} stroke="none" fontFamily="inherit">Rp</text>
    <text x={30} y={48} fontSize={8} fontWeight={900} fill={INK} stroke="none" fontFamily="inherit">100</text>
  </g>
);

export const receipt = () => (
  <g>
    <Place s={0.9} x={-4} y={4}>{bill()}</Place>
    <circle cx={72} cy={70} r={18} fill={C.green} />
    <path d="M63 70 l6 6 l12 -13" fill="none" stroke={C.white} strokeWidth={5} />
  </g>
);

export const calendar = () => (
  <g>
    <rect x={14} y={20} width={72} height={66} rx={8} fill={C.white} />
    <path d="M14 28 Q14 20 22 20 H78 Q86 20 86 28 V38 H14 Z" fill={C.red} />
    <path d="M32 14 V26 M68 14 V26" fill="none" strokeWidth={4} />
    <text x={50} y={74} textAnchor="middle" fontSize={30} fontWeight={900} fill={INK} stroke="none" fontFamily="inherit">20</text>
  </g>
);

export const clock = () => (
  <g>
    <circle cx={50} cy={52} r={36} fill={C.white} />
    <circle cx={50} cy={52} r={30} fill="none" stroke={C.blue} strokeWidth={3} />
    <path d="M50 52 V30 M50 52 L64 60" fill="none" strokeWidth={4} />
    <circle cx={50} cy={52} r={3} fill={INK} />
  </g>
);

export const alarm = () => (
  <g>
    <path d="M26 82 l-6 8 M74 82 l6 8" fill="none" strokeWidth={4} />
    <circle cx={26} cy={22} r={10} fill={C.red} />
    <circle cx={74} cy={22} r={10} fill={C.red} />
    <circle cx={50} cy={56} r={32} fill={C.red} />
    <circle cx={50} cy={56} r={25} fill={C.white} />
    <path d="M50 56 V40 M50 56 L60 62" fill="none" strokeWidth={3.5} />
    <path d="M10 44 l-6 -2 M10 54 h-7 M90 44 l6 -2 M90 54 h7" fill="none" stroke={C.orange} strokeWidth={3} />
  </g>
);

export const target = () => (
  <g>
    <circle cx={46} cy={54} r={36} fill={C.white} />
    <circle cx={46} cy={54} r={26} fill={C.red} />
    <circle cx={46} cy={54} r={16} fill={C.white} />
    <circle cx={46} cy={54} r={7} fill={C.red} />
    <path d="M46 54 L86 14" fill="none" strokeWidth={3.5} />
    <path d="M80 12 l8 -2 l-2 8 z" fill={C.yellow} />
  </g>
);

export const report = () => (
  <g>
    <rect x={20} y={10} width={60} height={80} rx={6} fill={C.white} />
    <rect x={30} y={56} width={10} height={24} fill={C.blue} />
    <rect x={45} y={44} width={10} height={36} fill={C.green} />
    <rect x={60} y={32} width={10} height={48} fill={C.orange} />
    <path d="M30 22 H70" fill="none" stroke={C.grey} strokeWidth={3} />
  </g>
);

export const office = () => (
  <g>
    <Backdrop sky={C.sky} />
    <rect x={20} y={28} width={60} height={66} fill={C.white} />
    <rect x={20} y={20} width={60} height={12} fill={C.red} />
    <text x={50} y={29.5} textAnchor="middle" fontSize={8} fontWeight={900} fill={C.white} stroke="none" fontFamily="inherit">OFFICE</text>
    {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={27 + c * 17} y={38 + r * 15} width={11} height={9} fill={C.sky} strokeWidth={1.6} />))}
    <rect x={43} y={80} width={14} height={14} fill={C.tan} />
  </g>
);

// --- Daily life -----------------------------------------------------------

export const house = () => (
  <g>
    <path d="M12 48 L50 16 L88 48 Z" fill={C.red} />
    <rect x={20} y={46} width={60} height={42} fill={C.cream} />
    <rect x={42} y={62} width={16} height={26} rx={2} fill={C.tan} />
    <rect x={26} y={56} width={12} height={12} fill={C.sky} strokeWidth={1.8} />
    <rect x={62} y={56} width={12} height={12} fill={C.sky} strokeWidth={1.8} />
  </g>
);

export const coffee = () => (
  <g>
    <path d="M38 22 q-5 -6 0 -12 M52 20 q-5 -6 0 -12" fill="none" stroke="#B8BEC8" strokeWidth={2.4} />
    <path d="M70 48 q14 0 12 12 q-2 10 -14 8" fill="none" strokeWidth={4} />
    <path d="M18 34 H72 L66 84 Q64 90 58 90 H32 Q26 90 24 84 Z" fill={C.white} />
    <ellipse cx={45} cy={36} rx={25} ry={4} fill="#6F4426" />
    <Face x={45} y={62} s={0.9} />
  </g>
);

export const motorcycle = () => (
  <g>
    <circle cx={22} cy={70} r={14} fill={INK} />
    <circle cx={78} cy={70} r={14} fill={INK} />
    <circle cx={22} cy={70} r={6} fill={C.silver} />
    <circle cx={78} cy={70} r={6} fill={C.silver} />
    <path d="M22 70 L38 50 H62 L78 70" fill="none" strokeWidth={3} />
    <path d="M30 52 Q36 38 58 40 L64 52 Z" fill={C.red} />
    <rect x={34} y={34} width={22} height={7} rx={3} fill={INK} />
    <path d="M64 46 L70 30 L78 28" fill="none" strokeWidth={3.5} />
  </g>
);

export const traffic = () => (
  <g>
    <Backdrop sky="#EEF2F6" />
    {[[8, 48, C.red], [52, 48, C.blue], [26, 70, C.yellow], [70, 70, C.green]].map(([x, y, col], i) => (
      <g key={i}>
        <rect x={Number(x)} y={Number(y)} width={30} height={14} rx={4} fill={String(col)} />
        <path d={`M${Number(x) + 6} ${Number(y)} l4 -7 h12 l4 7`} fill={C.sky} strokeWidth={2} />
        <circle cx={Number(x) + 7} cy={Number(y) + 14} r={3.5} fill={INK} />
        <circle cx={Number(x) + 23} cy={Number(y) + 14} r={3.5} fill={INK} />
      </g>
    ))}
    <rect x={44} y={10} width={12} height={28} rx={4} fill={INK} />
    <circle cx={50} cy={17} r={3} fill={C.red} strokeWidth={1} />
    <circle cx={50} cy={25} r={3} fill={C.grey} strokeWidth={1} />
    <circle cx={50} cy={33} r={3} fill={C.grey} strokeWidth={1} />
  </g>
);

export const shower = () => (
  <g>
    <path d="M70 14 V24 Q70 30 62 30 H40" fill="none" strokeWidth={4} />
    <path d="M30 30 H52 L48 38 H34 Z" fill={C.silver} />
    {[0, 1, 2, 3].map((i) => <path key={i} d={`M${34 + i * 5} 44 l-2 ${6 + (i % 2) * 4}`} fill="none" stroke={C.blue} strokeWidth={2.5} />)}
    <Place x={2} y={26} s={0.9}>
      <circle cx={50} cy={50} r={20} fill={SKIN.light} />
      <Face x={50} y={52} s={1} mood="yum" />
      <circle cx={34} cy={34} r={6} fill={C.white} strokeWidth={1.8} />
      <circle cx={44} cy={30} r={7} fill={C.white} strokeWidth={1.8} />
      <circle cx={56} cy={30} r={6} fill={C.white} strokeWidth={1.8} />
    </Place>
  </g>
);

export const tv = () => (
  <g>
    <path d="M36 12 L50 24 L64 12" fill="none" strokeWidth={3} />
    <rect x={12} y={24} width={76} height={54} rx={8} fill={INK} />
    <rect x={18} y={30} width={64} height={42} rx={4} fill={C.sky} stroke="none" />
    <Place x={30} y={30} s={0.42}>{videoApp()}</Place>
    <path d="M36 86 H64" fill="none" strokeWidth={4} />
  </g>
);

export const gamepad = () => (
  <g>
    <path d="M20 36 H80 Q94 36 94 56 Q94 80 80 80 Q72 80 66 70 H34 Q28 80 20 80 Q6 80 6 56 Q6 36 20 36 Z" fill={C.purple} />
    <path d="M24 50 V66 M16 58 H32" fill="none" stroke={C.white} strokeWidth={5} />
    <circle cx={70} cy={52} r={4} fill={C.yellow} />
    <circle cx={78} cy={60} r={4} fill={C.red} />
    <circle cx={62} cy={60} r={4} fill={C.green} />
  </g>
);

export const fishing = () => (
  <g>
    <Backdrop sky={C.sky} />
    <path d="M4 66 q8 -5 16 0 t16 0 t16 0 t16 0 t16 0 t12 0 L96 82 Q96 94 84 94 L16 94 Q4 94 4 82 Z" fill="#6EC3F5" />
    <path d="M14 70 L58 16" fill="none" stroke={C.darkBrown} strokeWidth={4} />
    <path d="M58 16 Q70 30 70 58" fill="none" strokeWidth={1.4} />
    <Place x={52} y={50} s={0.36}>{/* hooked fish */}
      <g transform="rotate(-70 50 50)">
        <path d="M72 50 L92 34 L90 66 Z" fill={C.orange} />
        <ellipse cx={46} cy={52} rx={30} ry={21} fill={C.orange} />
        <circle cx={30} cy={47} r={4} fill={INK} stroke="none" />
      </g>
    </Place>
  </g>
);

export const bicycle = () => (
  <g>
    <circle cx={24} cy={66} r={18} fill="none" strokeWidth={4} />
    <circle cx={76} cy={66} r={18} fill="none" strokeWidth={4} />
    <path d="M24 66 L42 40 H70 L76 66 M42 40 L52 66 L70 40 M52 66 H24" fill="none" stroke={C.green} strokeWidth={4} />
    <path d="M38 34 H48 M66 32 L72 28 H80" fill="none" strokeWidth={4} />
  </g>
);

// --- Travel ---------------------------------------------------------------

export const beach = () => (
  <g>
    <Backdrop sky={C.sky} />
    <circle cx={76} cy={24} r={9} fill={C.yellow} />
    <path d="M4 56 H96 V70 H4 Z" fill="#6EC3F5" stroke="none" />
    <path d="M4 56 H96" fill="none" strokeWidth={2} />
    <path d="M4 70 Q50 62 96 70 L96 82 Q96 94 84 94 L16 94 Q4 94 4 82 Z" fill="#F6DFA4" />
    <path d="M30 84 Q28 60 34 40" fill="none" stroke={C.darkBrown} strokeWidth={4} />
    <path d="M34 40 q-16 -6 -22 4 q12 -4 22 -4 q-4 -14 -16 -14 q12 4 16 14 q6 -14 20 -10 q-14 2 -20 10 q16 -2 20 8 q-10 -6 -20 -8" fill={C.green} strokeWidth={2} />
  </g>
);

export const mountain = () => (
  <g>
    <Backdrop sky="#DDF0FF" />
    <path d="M4 86 L36 30 L58 66 L70 46 L96 86 Z" fill="#7C9A8A" />
    <path d="M28 44 L36 30 L44 44 L40 42 L36 46 L32 42 Z" fill={C.white} strokeWidth={1.8} />
    <path d="M4 86 Q30 76 50 84 Q74 92 96 82 L96 82 Q96 94 84 94 L16 94 Q4 94 4 82 Z" fill={C.green} />
    <circle cx={78} cy={24} r={8} fill={C.yellow} />
  </g>
);

export const island = () => (
  <g>
    <Backdrop sky={C.sky} />
    <path d="M4 60 H96 L96 82 Q96 94 84 94 L16 94 Q4 94 4 82 Z" fill="#4FB6E8" />
    <ellipse cx={50} cy={62} rx={26} ry={8} fill="#F6DFA4" />
    <path d="M52 60 Q50 44 56 30" fill="none" stroke={C.darkBrown} strokeWidth={3.5} />
    <path d="M56 30 q-14 -4 -18 6 q10 -4 18 -6 q-2 -12 -12 -12 q10 4 12 12 q6 -12 18 -8 q-12 2 -18 8 q14 -2 16 8 q-8 -6 -16 -8" fill={C.green} strokeWidth={2} />
    <path d="M14 76 q5 -3 10 0 M70 82 q5 -3 10 0" fill="none" stroke={C.white} strokeWidth={2.4} />
  </g>
);

export const plane = () => (
  <g>
    <path d="M10 56 Q10 46 22 46 H76 Q92 46 92 52 Q92 58 76 60 H22 Q10 60 10 56 Z" fill={C.white} />
    <path d="M44 48 L30 20 H40 L62 48 Z" fill={C.blue} />
    <path d="M44 58 L30 84 H40 L62 58 Z" fill={C.blue} />
    <path d="M14 48 L8 34 H16 L26 46 Z" fill={C.red} />
    {[0, 1, 2, 3].map((i) => <circle key={i} cx={58 + i * 7} cy={52} r={2} fill={C.sky} strokeWidth={1.2} />)}
  </g>
);

export const suitcase = () => (
  <g>
    <rect x={38} y={10} width={24} height={14} rx={4} fill="none" strokeWidth={4} />
    <rect x={18} y={22} width={64} height={62} rx={10} fill={C.orange} />
    <path d="M38 22 V84 M62 22 V84" fill="none" stroke="#D9772B" strokeWidth={4} />
    <circle cx={30} cy={90} r={4} fill={INK} />
    <circle cx={70} cy={90} r={4} fill={INK} />
    <Face x={50} y={50} s={0.9} />
  </g>
);

export const passport = () => (
  <g>
    <rect x={24} y={10} width={52} height={80} rx={6} fill="#7A1F2B" />
    <circle cx={50} cy={46} r={12} fill="none" stroke={C.yellow} strokeWidth={3} />
    <path d="M38 46 H62 M50 34 V58" fill="none" stroke={C.yellow} strokeWidth={2} />
    <text x={50} y={76} textAnchor="middle" fontSize={8} fontWeight={900} fill={C.yellow} stroke="none" fontFamily="inherit">PASSPORT</text>
  </g>
);

export const souvenir = () => (
  <g>
    <rect x={18} y={42} width={64} height={46} rx={4} fill={C.purple} />
    <rect x={12} y={30} width={76} height={16} rx={4} fill={C.pink} />
    <path d="M50 30 V88" fill="none" stroke={C.yellow} strokeWidth={8} />
    <path d="M50 30 q-20 -22 -24 -4 q4 8 24 4 q20 4 24 -4 q-4 -18 -24 4" fill={C.yellow} />
  </g>
);

// --- Food (Tarakan) -------------------------------------------------------

export const crab = () => (
  <g>
    <path d="M24 60 l-12 8 M24 66 l-10 12 M76 60 l12 8 M76 66 l10 12" fill="none" stroke={C.red} strokeWidth={4} />
    <path d="M28 46 Q18 30 22 20" fill="none" stroke={C.red} strokeWidth={5} />
    <path d="M72 46 Q82 30 78 20" fill="none" stroke={C.red} strokeWidth={5} />
    <path d="M14 22 q4 -14 14 -6 l-6 6 z" fill={C.red} />
    <path d="M86 22 q-4 -14 -14 -6 l6 6 z" fill={C.red} />
    <ellipse cx={50} cy={60} rx={30} ry={20} fill={C.red} />
    <path d="M42 40 V32 M58 40 V32" fill="none" strokeWidth={2.4} />
    <circle cx={42} cy={30} r={3.5} fill={C.white} strokeWidth={1.8} />
    <circle cx={58} cy={30} r={3.5} fill={C.white} strokeWidth={1.8} />
    <Face x={50} y={60} s={1} cheeks={false} />
  </g>
);

export const soup = () => (
  <g>
    <path d="M38 22 q-5 -6 0 -12 M52 20 q-5 -6 0 -12 M66 22 q-5 -6 0 -12" fill="none" stroke="#B8BEC8" strokeWidth={2.4} />
    <path d="M10 46 H90 Q88 86 50 88 Q12 86 10 46 Z" fill={C.white} />
    <ellipse cx={50} cy={46} rx={40} ry={8} fill="#F2B544" />
    <ellipse cx={36} cy={45} rx={6} ry={2.5} fill={C.white} stroke="none" />
    <circle cx={58} cy={44} r={3} fill={C.green} stroke="none" />
    <circle cx={66} cy={47} r={2.5} fill={C.green} stroke="none" />
    <path d="M74 40 L90 14" fill="none" strokeWidth={4} />
    <Face x={50} y={68} s={0.9} />
  </g>
);

export const chili = () => (
  <g>
    <path d="M62 24 Q70 12 80 14" fill="none" stroke={C.darkGreen} strokeWidth={4} />
    <path d="M56 26 Q74 24 70 48 Q64 82 20 86 Q50 66 48 40 Q48 28 56 26 Z" fill={C.red} />
    <path d="M52 24 q6 -6 14 0 q-6 8 -14 0 z" fill={C.green} />
    <Face x={56} y={46} s={0.8} mood="open" />
    <path d="M78 54 q6 -6 4 -14 M84 64 q8 -4 8 -12" fill="none" stroke={C.orange} strokeWidth={3} />
  </g>
);

export const lemon = () => (
  <g>
    <ellipse cx={50} cy={52} rx={34} ry={26} fill={C.yellow} />
    <path d="M16 52 l-6 -2 M84 52 l6 -2" fill="none" strokeWidth={3} />
    <Face x={50} y={52} s={1.1} mood="yuck" />
  </g>
);

export const candy = () => (
  <g>
    <path d="M28 50 L10 36 V64 Z M72 50 L90 36 V64 Z" fill={C.pink} />
    <circle cx={50} cy={50} r={24} fill={C.pink} />
    <path d="M34 36 Q50 50 40 70 M50 26 Q64 50 54 74" fill="none" stroke={C.white} strokeWidth={3} />
    <Face x={50} y={50} s={0.9} />
  </g>
);

export const salt = () => (
  <g>
    <rect x={30} y={30} width={40} height={58} rx={8} fill={C.white} />
    <path d="M30 34 Q30 16 50 16 Q70 16 70 34 Z" fill={C.silver} />
    <circle cx={44} cy={24} r={1.8} fill={INK} stroke="none" />
    <circle cx={56} cy={24} r={1.8} fill={INK} stroke="none" />
    <circle cx={50} cy={20} r={1.8} fill={INK} stroke="none" />
    <text x={50} y={64} textAnchor="middle" fontSize={11} fontWeight={900} fill={C.blue} stroke="none" fontFamily="inherit">SALT</text>
  </g>
);

export const foodStall = () => (
  <g>
    <rect x={10} y={46} width={80} height={40} rx={4} fill={C.tan} />
    <path d="M6 24 H94 L90 40 H10 Z" fill={C.green} />
    <path d="M14 40 V46 M86 40 V46" fill="none" strokeWidth={3} />
    <text x={50} y={36} textAnchor="middle" fontSize={10} fontWeight={900} fill={C.white} stroke="none" fontFamily="inherit">WARUNG</text>
    <Place x={14} y={30} s={0.34}>{soup()}</Place>
    <Place x={52} y={32} s={0.34}>{crab()}</Place>
  </g>
);

// --- Feelings -------------------------------------------------------------

const FaceBadge = ({ fill, mood, extra }: { fill: string; mood: "smile" | "sleep" | "open" | "yuck" | "yum"; extra?: ReactNode }) => (
  <g>
    <circle cx={50} cy={52} r={34} fill={fill} />
    <Face x={50} y={48} s={1.9} mood={mood} />
    {extra}
  </g>
);

export const feelGreat = () => <FaceBadge fill={C.yellow} mood="open" extra={<><Star x={16} y={18} r={6} /><Star x={84} y={16} r={5} fill={C.pink} /></>} />;
export const feelTired = () => (
  <FaceBadge fill="#FFD9A8" mood="yuck" extra={<path d="M80 22 q4 8 0 12 q-4 -4 0 -12 z" fill="#7EC8F7" strokeWidth={1.8} />} />
);
export const feelSleepy = () => (
  <FaceBadge
    fill="#CFE3FF"
    mood="sleep"
    extra={
      <>
        <text x={74} y={24} fontSize={12} fontWeight={900} fill={C.navy} stroke="none" fontFamily="inherit">z</text>
        <text x={82} y={14} fontSize={15} fontWeight={900} fill={C.navy} stroke="none" fontFamily="inherit">Z</text>
      </>
    }
  />
);
export const feelHungry = () => <FaceBadge fill={C.yellow} mood="yum" extra={<Place x={58} y={52} s={0.48}>{drumstick()}</Place>} />;

// --- Misc -----------------------------------------------------------------

export const trophy = () => (
  <g>
    <path d="M30 22 H14 Q12 44 34 46 M70 22 H86 Q88 44 66 46" fill="none" strokeWidth={4} />
    <path d="M28 14 H72 V34 Q72 58 50 60 Q28 58 28 34 Z" fill={C.yellow} />
    <rect x={44} y={60} width={12} height={14} fill={C.yellow} />
    <rect x={30} y={74} width={40} height={12} rx={3} fill={C.brown} />
    <Star x={50} y={34} r={8} fill={C.white} />
  </g>
);

export const thumbsUp = () => (
  <g>
    <rect x={14} y={44} width={16} height={40} rx={4} fill={C.blue} />
    <path d="M30 48 L46 22 Q52 12 58 18 Q62 24 56 40 H80 Q90 40 88 50 L82 78 Q80 86 70 86 H30 Z" fill={SKIN.light} />
    <path d="M58 52 H86 M58 64 H84 M58 76 H80" fill="none" strokeWidth={2} />
  </g>
);

export const pin = () => (
  <g>
    <ellipse cx={50} cy={88} rx={18} ry={5} fill={C.silver} />
    <path d="M50 88 Q20 54 20 38 Q20 10 50 10 Q80 10 80 38 Q80 54 50 88 Z" fill={C.red} />
    <circle cx={50} cy={38} r={12} fill={C.white} />
  </g>
);

