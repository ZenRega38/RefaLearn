import type { ReactNode } from "react";

// Shared palette and parts for the kids' picture library. Every picture is
// drawn on a 100×100 canvas inside a <g> that already sets the ink outline
// (stroke, width, round joins), so shapes only choose their fill. Shapes
// that must not be outlined pass stroke="none".

export const INK = "#3B3340";

export const C = {
  red: "#F25C54",
  blue: "#4D96FF",
  navy: "#3A5BA0",
  sky: "#BDE4FF",
  yellow: "#FFD23F",
  green: "#6BCB77",
  darkGreen: "#3E9B57",
  orange: "#FF9F45",
  purple: "#A66CFF",
  pink: "#FF8FAB",
  blush: "#FF9AA2",
  brown: "#A0703C",
  darkBrown: "#6E4A2A",
  tan: "#D9A066",
  grey: "#A9B4C2",
  silver: "#D7DCE2",
  white: "#FFFFFF",
  cream: "#FFF4D6",
  black: "#3B3340",
} as const;

export const SKIN = { light: "#F8D3B0", medium: "#E8B088", tan: "#C98E62" } as const;

export type Mood = "happy" | "open" | "sleep" | "yum" | "yuck" | "smile";

/** Kawaii face centred on (x, y): dot eyes, pink cheeks, small mouth. */
export function Face({ x, y, s = 1, mood = "happy", eye = INK, cheeks = true }: { x: number; y: number; s?: number; mood?: Mood; eye?: string; cheeks?: boolean }) {
  const closed = mood === "sleep" || mood === "yum";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {closed ? (
        <>
          <path d={mood === "yum" ? "M-8 1 q2 -3 4 0" : "M-8 0 q2 3 4 0"} fill="none" stroke={eye} strokeWidth={1.8} />
          <path d={mood === "yum" ? "M4 1 q2 -3 4 0" : "M4 0 q2 3 4 0"} fill="none" stroke={eye} strokeWidth={1.8} />
        </>
      ) : mood === "yuck" ? (
        <>
          <path d="M-8 -2 l4 2 l-4 2" fill="none" stroke={eye} strokeWidth={1.8} />
          <path d="M8 -2 l-4 2 l4 2" fill="none" stroke={eye} strokeWidth={1.8} />
        </>
      ) : (
        <>
          <circle cx={-6} cy={0} r={2.1} fill={eye} stroke="none" />
          <circle cx={6} cy={0} r={2.1} fill={eye} stroke="none" />
          <circle cx={-5.3} cy={-0.8} r={0.7} fill="#fff" stroke="none" />
          <circle cx={6.7} cy={-0.8} r={0.7} fill="#fff" stroke="none" />
        </>
      )}
      {cheeks && (
        <>
          <ellipse cx={-10.5} cy={4} rx={2.8} ry={1.7} fill={C.blush} stroke="none" opacity={0.85} />
          <ellipse cx={10.5} cy={4} rx={2.8} ry={1.7} fill={C.blush} stroke="none" opacity={0.85} />
        </>
      )}
      {mood === "open" || mood === "yum" ? (
        <>
          <path d="M-3.5 3.5 q3.5 5 7 0 z" fill="#C84B5A" stroke={eye} strokeWidth={1.5} />
          {mood === "yum" && <path d="M0.5 5.5 q2.5 3 4 -0.5" fill={C.pink} stroke={eye} strokeWidth={1.2} />}
        </>
      ) : mood === "yuck" ? (
        <path d="M-5 6 q1.7 -2 3.3 0 t3.3 0 t3.3 0" fill="none" stroke={eye} strokeWidth={1.6} />
      ) : mood === "sleep" ? (
        <circle cx={0} cy={5} r={1.6} fill="none" stroke={eye} strokeWidth={1.4} />
      ) : (
        <path d={mood === "smile" ? "M-4 3.5 q4 4 8 0" : "M-3 3.5 q3 3 6 0"} fill="none" stroke={eye} strokeWidth={1.7} />
      )}
    </g>
  );
}

/** An outlined thick stroke (arm, leg, straw…): ink underneath, colour on top. */
export function Limb({ d, color, w = 6 }: { d: string; color: string; w?: number }) {
  return (
    <>
      <path d={d} fill="none" stroke={INK} strokeWidth={w + 5} />
      <path d={d} fill="none" stroke={color} strokeWidth={w} />
    </>
  );
}

/** Rounded speech bubble with a short word inside. */
export function Bubble({ x, y, text, w = 30, fill = C.white }: { x: number; y: number; text: string; w?: number; fill?: string }) {
  return (
    <g>
      <path d={`M${x + 6} ${y + 15} l-4 8 l11 -7`} fill={fill} />
      <rect x={x} y={y} width={w} height={17} rx={8.5} fill={fill} />
      <text x={x + w / 2} y={y + 12.3} textAnchor="middle" fontSize={10} fontWeight={800} fill={INK} stroke="none" fontFamily="inherit">
        {text}
      </text>
    </g>
  );
}

/** Small sparkle / star used for cheering and night skies. */
export function Star({ x, y, r = 5, fill = C.yellow }: { x: number; y: number; r?: number; fill?: string }) {
  const p = Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * 0.45;
    return `${(x + rr * Math.cos(a)).toFixed(1)} ${(y + rr * Math.sin(a)).toFixed(1)}`;
  });
  return <path d={`M${p.join(" L")} Z`} fill={fill} strokeWidth={1.6} />;
}

/** Rounded scene backdrop (sky) with optional ground hills. */
export function Backdrop({ sky, ground }: { sky: string; ground?: string }) {
  return (
    <>
      <rect x={4} y={6} width={92} height={88} rx={14} fill={sky} />
      {ground && <path d="M4 68 Q28 54 52 64 Q74 72 96 60 L96 82 Q96 94 84 94 L16 94 Q4 94 4 82 Z" fill={ground} />}
    </>
  );
}

/** Draw another picture inside this one, moved and scaled. */
export function Place({ x = 0, y = 0, s = 1, rotate = 0, children }: { x?: number; y?: number; s?: number; rotate?: number; children: ReactNode }) {
  return <g transform={`translate(${x} ${y}) scale(${s})${rotate ? ` rotate(${rotate} 50 50)` : ""}`}>{children}</g>;
}
