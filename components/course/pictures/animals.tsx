import { Backdrop, C, Face, INK, Limb, Place, SKIN } from "./base";

function Cat({ fur, ear, stripes, bow }: { fur: string; ear: string; stripes?: string; bow?: string }) {
  return (
    <g>
      <path d="M22 44 L26 12 L48 30 Z" fill={fur} />
      <path d="M78 44 L74 12 L52 30 Z" fill={fur} />
      <path d="M28 34 L30 20 L40 29 Z" fill={ear} stroke="none" />
      <path d="M72 34 L70 20 L60 29 Z" fill={ear} stroke="none" />
      <ellipse cx={50} cy={54} rx={33} ry={28} fill={fur} />
      {stripes && <path d="M50 27 v8 M42 28 l1.5 7 M58 28 l-1.5 7" fill="none" stroke={stripes} strokeWidth={3} />}
      <Face x={50} y={52} s={1.3} cheeks />
      <path d="M47 58 h6 l-3 3 z" fill={C.pink} strokeWidth={1.4} />
      <path d="M50 61 q-2.5 4 -6 1.5 M50 61 q2.5 4 6 1.5" fill="none" strokeWidth={1.6} />
      <path d="M30 58 h-14 M30 63 l-13 4 M70 58 h14 M70 63 l13 4" fill="none" strokeWidth={1.6} />
      {bow && (
        <g>
          <path d="M66 26 l-9 -6 v12 z M66 26 l9 -6 v12 z" fill={bow} strokeWidth={2} />
          <circle cx={66} cy={26} r={3} fill={bow} strokeWidth={2} />
        </g>
      )}
    </g>
  );
}

export const cat = () => <Cat fur={C.orange} ear={C.pink} stripes="#D9772B" />;
export const catWhite = () => <Cat fur={C.white} ear={C.pink} bow={C.red} />;

export const dog = () => (
  <g>
    <ellipse cx={50} cy={50} rx={28} ry={27} fill={C.tan} />
    <ellipse cx={62} cy={42} rx={9} ry={8} fill="#B97A45" stroke="none" />
    <ellipse cx={22} cy={50} rx={10} ry={20} transform="rotate(18 22 50)" fill={C.darkBrown} />
    <ellipse cx={78} cy={50} rx={10} ry={20} transform="rotate(-18 78 50)" fill={C.darkBrown} />
    <ellipse cx={50} cy={63} rx={14} ry={11} fill={C.cream} />
    <Face x={50} y={45} s={1.2} cheeks={false} />
    <ellipse cx={50} cy={57} rx={5} ry={3.5} fill={INK} />
    <path d="M50 60 v4 M43 64 q7 5 14 0" fill="none" strokeWidth={1.8} />
    <path d="M47 66 q3 9 6 0 z" fill={C.pink} strokeWidth={1.6} />
  </g>
);

export const bird = () => (
  <g>
    <path d="M24 56 l-12 -8 l2 14 z" fill={C.navy} />
    <path d="M44 82 v9 l-4 3 M44 91 l4 3 M56 82 v9 l-4 3 M56 91 l4 3" fill="none" stroke={C.orange} strokeWidth={2.5} />
    <circle cx={50} cy={54} r={29} fill={C.blue} />
    <ellipse cx={52} cy={65} rx={17} ry={13} fill="#FFF0B3" stroke="none" />
    <path d="M30 50 q-12 12 -2 24 q12 -2 16 -16 z" fill={C.navy} />
    <path d="M74 46 l13 4 l-13 6 z" fill={C.orange} />
    <path d="M46 26 q1 -9 8 -7 M52 26 q5 -7 10 -2" fill="none" strokeWidth={2.4} />
    <Face x={60} y={44} s={0.9} />
  </g>
);

export const fish = () => (
  <g>
    <path d="M72 50 L92 34 L90 66 Z" fill={C.orange} />
    <path d="M40 32 q8 -14 20 -2 z" fill={C.orange} />
    <ellipse cx={46} cy={52} rx={30} ry={21} fill={C.orange} />
    <path d="M54 33 q-7 19 0 38 M64 37 q-5 15 0 30" fill="none" stroke="#E07B26" strokeWidth={3} />
    <circle cx={30} cy={47} r={4.2} fill={C.white} strokeWidth={1.8} />
    <circle cx={29.5} cy={47.5} r={2.2} fill={INK} stroke="none" />
    <ellipse cx={36} cy={55} rx={2.8} ry={1.7} fill={C.blush} stroke="none" />
    <path d="M18 56 q3 2.5 6 0" fill="none" strokeWidth={1.8} />
    <circle cx={12} cy={32} r={3.5} fill={C.sky} strokeWidth={1.6} />
    <circle cx={8} cy={20} r={2.3} fill={C.sky} strokeWidth={1.4} />
  </g>
);

export const chicken = () => (
  <g>
    <path d="M44 82 v9 l-5 3 M44 91 l5 3 M56 82 v9 l-5 3 M56 91 l5 3" fill="none" stroke={C.orange} strokeWidth={2.5} />
    <ellipse cx={22} cy={50} rx={6} ry={13} transform="rotate(-25 22 50)" fill={C.white} />
    <ellipse cx={18} cy={60} rx={6} ry={12} transform="rotate(-50 18 60)" fill={C.white} />
    <circle cx={46} cy={62} r={25} fill={C.white} />
    <path d="M56 26 q1 -9 7 -4 q3 -7 8 -1 q5 -3 4 5 z" fill={C.red} />
    <circle cx={64} cy={38} r={14} fill={C.white} />
    <path d="M30 60 q10 -8 22 0 q-10 13 -22 0 z" fill={C.silver} />
    <path d="M76 37 l10 3.5 l-10 4 z" fill={C.yellow} />
    <path d="M75 45 q3 7 -2 8 q-3 -4 2 -8 z" fill={C.red} />
    <circle cx={67} cy={35} r={2.2} fill={INK} stroke="none" />
    <ellipse cx={69} cy={41} rx={2.4} ry={1.5} fill={C.blush} stroke="none" />
  </g>
);

export const cow = () => (
  <g>
    <path d="M30 28 q-8 -10 0 -16 q2 8 6 12 z" fill={C.cream} />
    <path d="M70 28 q8 -10 0 -16 q-2 8 -6 12 z" fill={C.cream} />
    <ellipse cx={20} cy={40} rx={11} ry={6} transform="rotate(-20 20 40)" fill={C.white} />
    <ellipse cx={80} cy={40} rx={11} ry={6} transform="rotate(20 80 40)" fill={C.white} />
    <ellipse cx={50} cy={46} rx={26} ry={24} fill={C.white} />
    <path d="M30 34 q8 -10 18 -4 q0 10 -9 12 q-8 0 -9 -8 z" fill={INK} stroke="none" />
    <path d="M66 52 q8 -2 9 6 q-4 6 -9 2 z" fill={INK} stroke="none" />
    <Face x={50} y={45} s={1.1} cheeks={false} eye={INK} />
    <ellipse cx={50} cy={68} rx={22} ry={14} fill="#FFB8B8" />
    <ellipse cx={43} cy={67} rx={2.6} ry={3.6} fill={INK} stroke="none" />
    <ellipse cx={57} cy={67} rx={2.6} ry={3.6} fill={INK} stroke="none" />
    <path d="M45 75 q5 3 10 0" fill="none" strokeWidth={1.8} />
  </g>
);

export const duck = () => (
  <g>
    <path d="M24 60 l-9 -11 l11 3 z" fill={C.yellow} />
    <path d="M20 62 Q22 46 42 48 L58 50 Q78 50 82 62 Q80 77 52 77 Q24 77 20 62 Z" fill={C.yellow} />
    <path d="M38 58 q10 -9 22 0 q-10 9 -22 0 z" fill="#F4B921" />
    <circle cx={64} cy={36} r={14} fill={C.yellow} />
    <path d="M75 37 q12 -2 12 3 q0 5 -12 3 z" fill={C.orange} />
    <circle cx={67} cy={33} r={2.3} fill={INK} stroke="none" />
    <ellipse cx={67} cy={40} rx={2.4} ry={1.5} fill={C.blush} stroke="none" />
    <path d="M6 76 q7 -5 14 0 t14 0 t14 0 t14 0 t14 0 t14 0 L94 86 Q94 92 88 92 L12 92 Q6 92 6 86 Z" fill="#8FD3FF" />
  </g>
);

export const elephant = () => (
  <g>
    <ellipse cx={22} cy={46} rx={17} ry={22} fill={C.grey} />
    <ellipse cx={78} cy={46} rx={17} ry={22} fill={C.grey} />
    <ellipse cx={22} cy={47} rx={10} ry={14} fill={C.pink} stroke="none" opacity={0.7} />
    <ellipse cx={78} cy={47} rx={10} ry={14} fill={C.pink} stroke="none" opacity={0.7} />
    <circle cx={50} cy={46} r={25} fill={C.grey} />
    <path d="M42 60 Q40 82 52 88 Q62 91 63 82 Q58 84 55 80 Q52 72 58 60 Z" fill={C.grey} />
    <path d="M46 70 h7 M46 76 h8" fill="none" strokeWidth={1.5} />
    <Face x={50} y={44} s={1.1} />
    <path d="M47 22 q3 -7 6 0" fill="none" strokeWidth={2} />
  </g>
);

export const kangaroo = () => (
  <g>
    <Limb d="M38 66 Q22 82 8 82" color={C.tan} w={7} />
    <ellipse cx={46} cy={56} rx={16} ry={23} transform="rotate(-22 46 56)" fill={C.tan} />
    <ellipse cx={50} cy={62} rx={8} ry={11} transform="rotate(-22 50 62)" fill={C.cream} />
    <Limb d="M44 74 L58 84 L74 84" color={C.tan} w={7} />
    <Limb d="M58 46 L66 52" color={C.tan} w={4} />
    <ellipse cx={58} cy={10} rx={3.5} ry={9} transform="rotate(-12 58 10)" fill={C.tan} />
    <ellipse cx={66} cy={11} rx={3.5} ry={9} transform="rotate(12 66 11)" fill={C.tan} />
    <ellipse cx={63} cy={28} rx={12} ry={10} fill={C.tan} />
    <ellipse cx={73} cy={31} rx={6} ry={4.5} fill={C.cream} />
    <circle cx={77.5} cy={29.5} r={1.8} fill={INK} stroke="none" />
    <circle cx={64} cy={25} r={2.1} fill={INK} stroke="none" />
    <ellipse cx={63} cy={31} rx={2.4} ry={1.5} fill={C.blush} stroke="none" />
  </g>
);

export const cheetah = () => (
  <g>
    <circle cx={28} cy={28} r={8} fill={C.yellow} />
    <circle cx={72} cy={28} r={8} fill={C.yellow} />
    <circle cx={50} cy={52} r={30} fill={C.yellow} />
    <g fill={INK} stroke="none">
      <circle cx={34} cy={36} r={2.6} /><circle cx={44} cy={30} r={2.2} /><circle cx={58} cy={29} r={2.4} /><circle cx={68} cy={38} r={2.6} />
      <circle cx={28} cy={52} r={2.2} /><circle cx={73} cy={54} r={2.2} /><circle cx={34} cy={68} r={2.4} /><circle cx={67} cy={69} r={2.4} />
    </g>
    <ellipse cx={50} cy={64} rx={12} ry={9} fill={C.cream} />
    <path d="M42 50 q-1 8 -4 13 M58 50 q1 8 4 13" fill="none" strokeWidth={2} />
    <Face x={50} y={48} s={1.1} cheeks={false} />
    <path d="M47 59 h6 l-3 3 z" fill={INK} strokeWidth={1.3} />
    <path d="M50 62 q-2.5 4 -6 1.5 M50 62 q2.5 4 6 1.5" fill="none" strokeWidth={1.6} />
  </g>
);

// --- Actions --------------------------------------------------------------

export const swim = () => (
  <g>
    <Backdrop sky="#E6F6FF" />
    <circle cx={42} cy={50} r={16} fill={SKIN.medium} />
    <path d="M26 50 A16 16 0 0 1 58 50 Q50 40 42 40 Q34 40 26 50 Z" fill={C.red} />
    <circle cx={36} cy={52} r={4.5} fill={C.sky} strokeWidth={2} />
    <circle cx={48} cy={52} r={4.5} fill={C.sky} strokeWidth={2} />
    <Limb d="M58 60 Q66 40 80 34" color={SKIN.medium} w={6} />
    <path d="M4 60 q8 -6 16 0 t16 0 t16 0 t16 0 t16 0 t12 0 L96 82 Q96 94 84 94 L16 94 Q4 94 4 82 Z" fill="#6EC3F5" />
    <circle cx={86} cy={26} r={2.5} fill="#8FD3FF" strokeWidth={1.4} />
    <circle cx={74} cy={22} r={2} fill="#8FD3FF" strokeWidth={1.4} />
    <path d="M14 76 q6 -3 12 0 M60 82 q6 -3 12 0" fill="none" stroke={C.white} strokeWidth={2.5} />
  </g>
);

const Cloud = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <path transform={`translate(${x} ${y}) scale(${s})`} d="M0 10 q0 -8 8 -8 q3 -8 12 -6 q8 -4 12 4 q8 0 8 10 z" fill={C.white} strokeWidth={2} />
);

export const fly = () => (
  <g>
    <Backdrop sky={C.sky} />
    <Cloud x={8} y={70} s={0.9} />
    <Cloud x={60} y={14} s={0.8} />
    <Place x={18} y={20} s={0.66}>
      <path d="M38 46 q-4 -30 18 -34 q0 18 -6 34 z" fill={C.navy} />
      {bird()}
    </Place>
    <path d="M10 40 h12 M6 50 h12 M12 60 h10" fill="none" stroke={C.white} strokeWidth={3} />
  </g>
);

export const run = () => (
  <g>
    <Backdrop sky="#FFF3D6" />
    <path d="M10 38 h14 M6 50 h16 M12 62 h12" fill="none" stroke={C.orange} strokeWidth={3} />
    <Limb d="M48 60 L38 72 L24 74" color={C.navy} w={7} />
    <Limb d="M48 60 L60 72 L56 86" color={C.navy} w={7} />
    <ellipse cx={22} cy={75} rx={6} ry={4} fill={C.red} />
    <ellipse cx={59} cy={88} rx={6} ry={4} fill={C.red} />
    <Limb d="M53 40 L44 50 L36 44" color={SKIN.light} w={5} />
    <Limb d="M56 34 L48 60" color={C.green} w={13} />
    <Limb d="M54 40 L66 48 L74 40" color={SKIN.light} w={5} />
    <circle cx={60} cy={22} r={12} fill={SKIN.light} />
    <path d="M47.5 23 A12.5 12.5 0 0 1 72.5 22 Q64 15 56 16 Q50 17 47.5 23 Z" fill="#3B2F2F" />
    <circle cx={64} cy={24} r={1.8} fill={INK} stroke="none" />
    <path d="M62 29 q3 2 6 0" fill="none" strokeWidth={1.6} />
  </g>
);

export const jump = () => (
  <g>
    <Backdrop sky="#FFF3D6" />
    <path d="M10 88 Q30 20 70 60" fill="none" stroke={C.orange} strokeWidth={2.5} strokeDasharray="4 5" />
    <path d="M6 92 h88" fill="none" stroke={C.darkGreen} strokeWidth={3} />
    <Place x={22} y={4} s={0.72}>{kangaroo()}</Place>
  </g>
);
