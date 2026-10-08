import { Backdrop, C, Face, INK, Place, Star } from "./base";

export const book = (cover: string = C.red) => (
  <g>
    <path d="M30 16 H76 V84 H30 Z" fill={C.cream} />
    <rect x={24} y={14} width={50} height={70} rx={5} fill={cover} />
    <path d="M32 14 V84" fill="none" strokeWidth={2} />
    <rect x={40} y={24} width={26} height={10} rx={3} fill={C.white} strokeWidth={2} />
    <Face x={53} y={56} s={1} />
  </g>
);

export const pencil = (body: string = C.yellow) => (
  <g transform="rotate(-38 50 50)">
    <rect x={8} y={41} width={12} height={18} rx={4} fill={C.pink} />
    <rect x={18} y={41} width={8} height={18} fill={C.silver} />
    <rect x={26} y={41} width={44} height={18} fill={body} />
    <path d="M26 47 H70" fill="none" strokeWidth={1.4} />
    <path d="M70 41 L90 50 L70 59 Z" fill="#F6D7A7" />
    <path d="M83 46.8 L90 50 L83 53.2 Z" fill={INK} />
  </g>
);

export const eraser = (left: string = C.pink, right: string = C.blue) => (
  <g>
    <path d="M16 46 L30 32 H86 L72 46 Z" fill={C.white} />
    <path d="M72 46 L86 32 V58 L72 72 Z" fill={C.silver} />
    <rect x={16} y={46} width={28} height={26} fill={left} />
    <rect x={44} y={46} width={28} height={26} fill={right} />
    <Face x={44} y={58} s={0.85} />
  </g>
);

export const ruler = (body: string = C.yellow) => (
  <g transform="rotate(-20 50 50)">
    <rect x={6} y={38} width={88} height={24} rx={4} fill={body} />
    <path d={Array.from({ length: 11 }, (_, i) => `M${12 + i * 7.6} 38 v${i % 5 === 0 ? 10 : 6}`).join(" ")} fill="none" strokeWidth={1.6} />
    <Face x={50} y={54} s={0.7} />
  </g>
);

export const bag = (body: string = C.blue) => (
  <g>
    <path d="M40 26 Q40 12 50 12 Q60 12 60 26" fill="none" strokeWidth={4} />
    <rect x={20} y={24} width={60} height={64} rx={18} fill={body} />
    <path d="M20 46 Q50 58 80 46" fill="none" strokeWidth={2.4} />
    <rect x={32} y={60} width={36} height={22} rx={8} fill={C.yellow} />
    <path d="M38 68 H62" fill="none" strokeWidth={2} />
    <Face x={50} y={36} s={0.85} />
  </g>
);

const Crayon = ({ color }: { color: string }) => (
  <g>
    <path d="M42 30 L50 10 L58 30 Z" fill={color} />
    <rect x={40} y={30} width={20} height={56} rx={3} fill={color} />
    <rect x={40} y={44} width={20} height={26} fill={C.white} />
    <path d="M40 50 H60 M40 64 H60" fill="none" stroke={color} strokeWidth={2.4} />
  </g>
);

export const crayon = () => (
  <g>
    <Place rotate={-22} x={-14} y={4}><Crayon color={C.blue} /></Place>
    <Place rotate={22} x={14} y={4}><Crayon color={C.yellow} /></Place>
    <Crayon color={C.red} />
  </g>
);

export const chair = () => (
  <g>
    <path d="M32 58 L28 92 M68 58 L72 92 M38 64 L36 88 M62 64 L64 88" fill="none" stroke={C.darkBrown} strokeWidth={4} />
    <rect x={30} y={10} width={40} height={42} rx={6} fill={C.tan} />
    <path d="M40 18 V46 M50 18 V46 M60 18 V46" fill="none" stroke={C.brown} strokeWidth={2.4} />
    <path d="M22 52 H78 L72 64 H28 Z" fill={C.brown} />
  </g>
);

/** Blue bag with the things from the reading “What Is in My Bag?”. */
export const bagThings = () => (
  <g>
    <Place x={-8} y={10} s={0.75}>{bag(C.blue)}</Place>
    <Place x={46} y={-4} s={0.42}>{book(C.purple)}</Place>
    <Place x={52} y={30} s={0.42}>{pencil(C.red)}</Place>
    <Place x={50} y={52} s={0.48}>{ruler(C.yellow)}</Place>
    <Place x={62} y={70} s={0.3}>{eraser(C.green, C.green)}</Place>
  </g>
);

// --- Colours ---------------------------------------------------------------

export const paint = (color: string, eye: string = INK) => (
  <g>
    <circle cx={86} cy={84} r={4} fill={color} strokeWidth={2} />
    <circle cx={14} cy={28} r={3} fill={color} strokeWidth={2} />
    <path d="M50 14 Q66 12 70 26 Q84 24 86 40 Q90 56 78 64 Q82 80 66 84 Q52 92 40 82 Q24 86 20 72 Q10 60 18 48 Q12 32 26 26 Q34 14 50 14 Z" fill={color} />
    <Face x={50} y={50} s={1.4} eye={eye} />
  </g>
);

// --- Numbers ---------------------------------------------------------------

const NUM_COLORS = [C.red, C.orange, C.yellow, C.green, C.blue, C.purple, C.pink];

/** Big numeral plus counting dots (a ten-frame for 11–20). */
export const number = (n: number) => {
  const color = NUM_COLORS[(n - 1) % NUM_COLORS.length];
  const dots: { x: number; y: number; fill: string }[] = [];
  // Rows are centred: up to 5 per row for 1–10, a full row of ten plus the rest for 11–20.
  const row = (count: number, y: number, gap: number, fill: string) => {
    for (let i = 0; i < count; i++) dots.push({ x: 50 + (i - (count - 1) / 2) * gap, y, fill });
  };
  if (n <= 10) {
    row(Math.min(n, 5), 70, 14, color);
    if (n > 5) row(n - 5, 83, 14, color);
  } else {
    row(10, 72, 8.4, C.blue);
    row(n - 10, 84, 8.4, C.orange);
  }
  const r = n <= 10 ? 5 : 3.4;
  return (
    <g>
      <text x={50} y={54} textAnchor="middle" fontSize={n >= 10 ? 44 : 50} fontWeight={900} fill={color} stroke={INK} strokeWidth={2.4} paintOrder="stroke" fontFamily="inherit">
        {n}
      </text>
      {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={r} fill={d.fill} strokeWidth={1.6} />)}
    </g>
  );
};

// --- Times of day ----------------------------------------------------------

const Sun = ({ x, y, r, mood = "happy" as const }: { x: number; y: number; r: number; mood?: "happy" | "smile" | "sleep" }) => (
  <g>
    <path
      d={Array.from({ length: 8 }, (_, i) => {
        const a = (Math.PI / 4) * i;
        return `M${(x + (r + 4) * Math.cos(a)).toFixed(1)} ${(y + (r + 4) * Math.sin(a)).toFixed(1)} L${(x + (r + 11) * Math.cos(a)).toFixed(1)} ${(y + (r + 11) * Math.sin(a)).toFixed(1)}`;
      }).join(" ")}
      fill="none"
      stroke={C.orange}
      strokeWidth={3}
    />
    <circle cx={x} cy={y} r={r} fill={C.yellow} />
    <Face x={x} y={y} s={r / 16} mood={mood} />
  </g>
);

export const morning = () => (
  <g>
    <Backdrop sky="#FFE7B8" />
    <Sun x={50} y={58} r={16} />
    <path d="M4 68 Q28 54 52 64 Q74 72 96 60 L96 82 Q96 94 84 94 L16 94 Q4 94 4 82 Z" fill={C.green} />
    <path d="M14 26 q4 -4 8 0 q4 -4 8 0" fill="none" strokeWidth={2} />
  </g>
);

export const afternoon = () => (
  <g>
    <Backdrop sky={C.sky} ground={C.green} />
    <Sun x={50} y={34} r={15} mood="smile" />
    <path d="M70 60 q0 -6 6 -6 q2 -6 9 -4 q6 -2 8 4 v6 z" fill={C.white} strokeWidth={2} />
  </g>
);

export const evening = () => (
  <g>
    <rect x={4} y={6} width={92} height={88} rx={14} fill="#B48BE0" />
    <path d="M4 40 H96 V62 H4 Z" fill="#FF9F6E" stroke="none" />
    <circle cx={50} cy={66} r={16} fill={C.orange} />
    <path d="M4 68 Q28 58 52 66 Q74 72 96 62 L96 82 Q96 94 84 94 L16 94 Q4 94 4 82 Z" fill="#5E7F6A" />
    <rect x={14} y={58} width={18} height={16} fill={C.cream} />
    <path d="M12 60 L23 50 L34 60 Z" fill={C.red} />
    <rect x={20} y={63} width={6} height={6} fill={C.yellow} strokeWidth={1.6} />
    <Star x={76} y={22} r={4} />
    <path d="M20 22 q3 -3 6 0 q3 -3 6 0" fill="none" strokeWidth={2} />
  </g>
);

export const night = () => (
  <g>
    <rect x={4} y={6} width={92} height={88} rx={14} fill="#2E3A6E" />
    <path d="M60 22 A28 28 0 1 0 74 74 A22 22 0 1 1 60 22 Z" fill={C.yellow} />
    <Face x={46} y={52} s={0.9} mood="sleep" cheeks />
    <Star x={78} y={22} r={5} />
    <Star x={84} y={46} r={3.5} />
    <Star x={20} y={18} r={3.5} />
    <text x={66} y={40} fontSize={10} fontWeight={900} fill={C.white} stroke="none" fontFamily="inherit">z</text>
    <text x={72} y={32} fontSize={13} fontWeight={900} fill={C.white} stroke="none" fontFamily="inherit">Z</text>
  </g>
);

// --- Mascot: Oli the owl -------------------------------------------------

type OwlPose = "stand" | "wave" | "cheer" | "think" | "read";

export const owl = (pose: OwlPose = "stand") => {
  const body = "#6C8CE8";
  const dark = "#4A67C2";
  const leftUp = pose === "cheer";
  const rightUp = pose === "wave" || pose === "cheer";
  return (
    <g>
      {pose === "cheer" && (
        <>
          <Star x={14} y={20} r={6} />
          <Star x={86} y={18} r={5} fill={C.pink} />
          <Star x={88} y={44} r={3.5} fill={C.green} />
        </>
      )}
      {/* wings behind body */}
      <ellipse cx={leftUp ? 20 : 22} cy={leftUp ? 36 : 62} rx={9} ry={18} transform={`rotate(${leftUp ? 35 : 12} ${leftUp ? 20 : 22} ${leftUp ? 36 : 62})`} fill={dark} />
      <ellipse cx={rightUp ? 80 : 78} cy={rightUp ? 36 : 62} rx={9} ry={18} transform={`rotate(${rightUp ? -35 : -12} ${rightUp ? 80 : 78} ${rightUp ? 36 : 62})`} fill={dark} />
      <path d="M30 22 L26 6 L42 16 Z M70 22 L74 6 L58 16 Z" fill={body} />
      <ellipse cx={50} cy={56} rx={29} ry={34} fill={body} />
      <ellipse cx={50} cy={68} rx={18} ry={18} fill={C.cream} stroke="none" />
      <path d="M40 64 q3 3 6 0 M54 64 q3 3 6 0 M46 74 q3 3 6 0" fill="none" stroke="#E8C98E" strokeWidth={2} />
      <circle cx={39} cy={40} r={11} fill={C.white} />
      <circle cx={61} cy={40} r={11} fill={C.white} />
      {pose === "think" ? (
        <>
          <circle cx={42} cy={36} r={4.5} fill={INK} stroke="none" />
          <circle cx={64} cy={36} r={4.5} fill={INK} stroke="none" />
        </>
      ) : (
        <>
          <circle cx={40} cy={41} r={5} fill={INK} stroke="none" />
          <circle cx={62} cy={41} r={5} fill={INK} stroke="none" />
          <circle cx={41.5} cy={39} r={1.6} fill={C.white} stroke="none" />
          <circle cx={63.5} cy={39} r={1.6} fill={C.white} stroke="none" />
        </>
      )}
      <path d="M46 48 L54 48 L50 55 Z" fill={C.orange} strokeWidth={2} />
      <ellipse cx={30} cy={52} rx={3.4} ry={2} fill={C.blush} stroke="none" />
      <ellipse cx={70} cy={52} rx={3.4} ry={2} fill={C.blush} stroke="none" />
      <path d="M40 90 l-3 4 M40 90 l0 5 M40 90 l3 4 M60 90 l-3 4 M60 90 l0 5 M60 90 l3 4" fill="none" stroke={C.orange} strokeWidth={3} />
      {/* graduation cap */}
      <path d="M30 18 L50 10 L70 18 L50 26 Z" fill={INK} />
      <path d="M68 18 v10" fill="none" stroke={C.yellow} strokeWidth={2} />
      <circle cx={68} cy={29} r={2.2} fill={C.yellow} strokeWidth={1.2} />
      {pose === "think" && (
        <text x={80} y={30} fontSize={22} fontWeight={900} fill={C.orange} stroke={INK} strokeWidth={1.5} paintOrder="stroke" fontFamily="inherit">?</text>
      )}
      {pose === "read" && (
        <g>
          <path d="M26 74 Q38 68 50 74 Q62 68 74 74 V90 Q62 84 50 90 Q38 84 26 90 Z" fill={C.white} />
          <path d="M50 74 V90" fill="none" strokeWidth={2} />
          <path d="M32 78 h12 M32 83 h12 M56 78 h12 M56 83 h12" fill="none" stroke={C.grey} strokeWidth={1.6} />
        </g>
      )}
      {pose === "wave" && <path d="M90 12 q5 5 2 12 M95 6 q7 8 2 20" fill="none" strokeWidth={2} />}
    </g>
  );
};
