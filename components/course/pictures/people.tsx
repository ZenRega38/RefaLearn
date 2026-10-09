import { Bubble, C, Face, Limb, Place, SKIN, type Mood } from "./base";

type Hair = "short" | "spiky" | "long" | "pigtails" | "bun" | "hijab" | "peci";

type PersonProps = {
  shirt: string;
  hair: Hair;
  hairColor?: string;
  skin?: string;
  kid?: boolean;
  glasses?: boolean;
  mustache?: string;
  collar?: boolean;
  tie?: string;
  wave?: boolean;
  backpack?: string;
  ribbon?: string;
  mood?: Mood;
};

const DARK_HAIR = "#3B2F2F";
const GREY_HAIR = "#D5D8DE";

/** Hair that covers the top of the head, down to the ears. */
function fringe(cx: number, cy: number, r: number) {
  const R = r + 1.5;
  return `M${cx - R} ${cy + 1} A${R} ${R} 0 0 1 ${cx + R} ${cy + 1} Q${cx + r * 0.62} ${cy - r * 0.5} ${cx + 2} ${cy - r * 0.55} Q${cx - r * 0.45} ${cy - r * 0.38} ${cx - R} ${cy + 1} Z`;
}

/** A friendly head-and-shoulders person, the base of every people picture. */
export function Person({ shirt, hair, hairColor = DARK_HAIR, skin = SKIN.light, kid = false, glasses, mustache, collar, tie, wave, backpack, ribbon = C.red, mood = "happy" }: PersonProps) {
  const cx = 50;
  const cy = kid ? 44 : 40;
  const r = kid ? 20 : 19;
  const top = cy + r + 3;
  const w = kid ? 26 : 32;
  const s = r / 19;

  return (
    <g>
      {/* Behind the body */}
      {backpack && <rect x={cx - w - 4} y={top - 4} width={2 * w + 8} height={40} rx={12} fill={backpack} />}
      {hair === "long" && <rect x={cx - r - 4} y={cy - r + 2} width={2 * r + 8} height={r * 2 + 8} rx={r - 2} fill={hairColor} />}

      {/* Body */}
      <path d={`M${cx - w} 97 L${cx - w} ${top + 12} Q${cx - w} ${top} ${cx - w + 12} ${top} L${cx + w - 12} ${top} Q${cx + w} ${top} ${cx + w} ${top + 12} L${cx + w} 97 Q${cx} 99.5 ${cx - w} 97 Z`} fill={shirt} />
      {collar && <path d={`M${cx - 8} ${top} L${cx} ${top + 9} L${cx + 8} ${top}`} fill={C.white} />}
      {tie && <path d={`M${cx} ${top + 8} l-3.5 4 l3.5 16 l3.5 -16 z`} fill={tie} />}
      {backpack && (
        <>
          <Limb d={`M${cx - w + 7} ${top + 1} L${cx - w + 9} 96`} color={backpack} w={4} />
          <Limb d={`M${cx + w - 7} ${top + 1} L${cx + w - 9} 96`} color={backpack} w={4} />
        </>
      )}

      {/* Hair behind the head */}
      {hair === "pigtails" && (
        <>
          <circle cx={cx - r - 4} cy={cy + 2} r={8} fill={hairColor} />
          <circle cx={cx + r + 4} cy={cy + 2} r={8} fill={hairColor} />
          <circle cx={cx - r + 1} cy={cy - 5} r={3} fill={ribbon} />
          <circle cx={cx + r - 1} cy={cy - 5} r={3} fill={ribbon} />
        </>
      )}
      {hair === "bun" && <circle cx={cx} cy={cy - r - 3} r={9} fill={hairColor} />}
      {hair === "hijab" && (
        <path
          d={`M${cx - r - 6} ${cy} A${r + 6} ${r + 6} 0 0 1 ${cx + r + 6} ${cy} Q${cx + r + 9} ${top + 6} ${cx + w * 0.7} ${top + 12} Q${cx} ${top + 20} ${cx - w * 0.7} ${top + 12} Q${cx - r - 9} ${top + 6} ${cx - r - 6} ${cy} Z`}
          fill={hairColor}
        />
      )}

      {/* Head */}
      <circle cx={cx} cy={cy + (hair === "hijab" ? 2 : 0)} r={hair === "hijab" ? r - 2 : r} fill={skin} />
      {hair !== "hijab" && (
        <>
          <circle cx={cx - r} cy={cy + 4} r={3.5} fill={skin} />
          <circle cx={cx + r} cy={cy + 4} r={3.5} fill={skin} />
        </>
      )}

      {/* Hair on top */}
      {(hair === "short" || hair === "long" || hair === "pigtails" || hair === "bun" || hair === "spiky") && <path d={fringe(cx, cy, r)} fill={hairColor} />}
      {hair === "spiky" && <path d={`M${cx - 10} ${cy - r + 1} l3 -8 l4 6 l4 -8 l4 8 l4 -6 l2 8`} fill={hairColor} />}
      {hair === "long" && <circle cx={cx + r * 0.55} cy={cy - r * 0.55} r={3.2} fill={C.yellow} />}
      {hair === "peci" && (
        <>
          <path d={`M${cx - r - 1} ${cy + 3} Q${cx - r - 2} ${cy - 6} ${cx - r + 5} ${cy - 9}`} fill="none" stroke={GREY_HAIR} strokeWidth={5} />
          <path d={`M${cx + r + 1} ${cy + 3} Q${cx + r + 2} ${cy - 6} ${cx + r - 5} ${cy - 9}`} fill="none" stroke={GREY_HAIR} strokeWidth={5} />
          <path d={`M${cx - r + 1} ${cy - 6} L${cx - r + 3} ${cy - r - 4} Q${cx} ${cy - r - 8} ${cx + r - 3} ${cy - r - 4} L${cx + r - 1} ${cy - 6} Q${cx} ${cy - 9} ${cx - r + 1} ${cy - 6} Z`} fill={C.black} />
        </>
      )}

      <Face x={cx} y={cy + 4} s={s} mood={mood} />
      {mustache && <path d={`M${cx - 7} ${cy + 9.5} q3.5 -3 7 -0.5 q3.5 -2.5 7 0.5 q-3.5 3.5 -7 0.5 q-3.5 3 -7 -0.5 z`} fill={mustache} strokeWidth={1.4} />}
      {glasses && (
        <g fill="#ffffff" fillOpacity={0.25} strokeWidth={1.8}>
          <circle cx={cx - 6.5 * s} cy={cy + 4} r={5} />
          <circle cx={cx + 6.5 * s} cy={cy + 4} r={5} />
          <path d={`M${cx - 1.6 * s} ${cy + 3} h${3.2 * s}`} fill="none" />
        </g>
      )}

      {/* Waving arm */}
      {wave && (
        <>
          <Limb d={`M${cx + w - 6} ${top + 10} Q${cx + w + 8} ${top - 2} ${cx + w + 6} ${top - 20}`} color={shirt} w={7} />
          <circle cx={cx + w + 6} cy={top - 23} r={5.5} fill={skin} />
        </>
      )}
    </g>
  );
}

export const father = () => <Person shirt={C.blue} hair="short" collar skin={SKIN.medium} mustache={DARK_HAIR} />;
export const mother = () => <Person shirt={C.pink} hair="hijab" hairColor={C.purple} />;
export const brother = () => <Person kid shirt={C.green} hair="spiky" skin={SKIN.medium} />;
export const sister = () => <Person kid shirt={C.yellow} hair="pigtails" mood="open" />;
export const grandfather = () => <Person shirt={C.brown} hair="peci" skin={SKIN.tan} glasses mustache="#F2F2F2" collar />;
export const grandmother = () => <Person shirt={C.purple} hair="bun" hairColor={GREY_HAIR} skin={SKIN.medium} glasses />;
export const boy = () => <Person kid shirt={C.orange} hair="short" />;
export const girl = () => <Person kid shirt={C.red} hair="long" mood="smile" />;
export const teacherWoman = () => <Person shirt={C.green} hair="hijab" hairColor={C.navy} glasses skin={SKIN.medium} />;
export const teacherMan = () => <Person shirt={C.white} hair="short" collar tie={C.red} glasses skin={SKIN.tan} />;

export const baby = () => (
  <g>
    <ellipse cx={50} cy={96} rx={28} ry={20} fill={C.sky} />
    <circle cx={50} cy={50} r={27} fill={SKIN.light} />
    <circle cx={23} cy={54} r={4} fill={SKIN.light} />
    <circle cx={77} cy={54} r={4} fill={SKIN.light} />
    <path d="M47 24 q-6 -9 3 -11 q6 0 3 6" fill="none" strokeWidth={2.4} />
    <Face x={50} y={54} s={1.35} mood="open" />
  </g>
);

export const hello = () => (
  <g>
    <Place x={8} y={10} s={0.9}>
      <Person kid shirt={C.red} hair="long" mood="open" wave />
    </Place>
    <Bubble x={4} y={6} w={38} text="Hello!" />
  </g>
);

export const goodbye = () => (
  <g>
    <Place x={6} y={10} s={0.9}>
      <Person kid shirt={C.orange} hair="short" wave backpack={C.blue} mood="open" />
    </Place>
    <Bubble x={4} y={6} w={34} text="Bye!" />
  </g>
);
