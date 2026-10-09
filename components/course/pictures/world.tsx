import { Backdrop, C, Face, INK, Place, SKIN, Star } from "./base";
import { Person } from "./people";

// Pictures for Grades 4–6 and up: jobs, places in town, transport, clocks,
// directions, celebrations and invitations.

// --- Jobs -----------------------------------------------------------------------

export const doctor = () => (
  <g>
    <Person shirt={C.white} hair="short" collar skin={SKIN.medium} glasses />
    <path d="M38 62 Q36 82 50 84 Q64 82 62 62" fill="none" stroke={INK} strokeWidth={2.4} />
    <circle cx={50} cy={86} r={5} fill={C.silver} strokeWidth={2} />
    <rect x={64} y={70} width={10} height={12} rx={2} fill={C.sky} strokeWidth={1.6} />
  </g>
);

export const nurse = () => (
  <g>
    <Person shirt={C.sky} hair="bun" hairColor={C.darkBrown} />
    <path d="M34 22 L36 12 H64 L66 22 Q50 26 34 22 Z" fill={C.white} />
    <path d="M50 13 v8 M46 17 h8" fill="none" stroke={C.red} strokeWidth={2.6} />
  </g>
);

export const police = () => (
  <g>
    <Person shirt={C.navy} hair="short" skin={SKIN.tan} collar />
    <path d="M28 26 Q30 10 50 10 Q70 10 72 26 Z" fill={C.navy} />
    <path d="M26 26 H74 L70 31 H30 Z" fill={INK} />
    <circle cx={50} cy={18} r={4} fill={C.yellow} strokeWidth={1.6} />
    <Star x={38} y={78} r={5} fill={C.yellow} />
  </g>
);

export const farmer = () => (
  <g>
    <Person shirt={C.green} hair="short" skin={SKIN.tan} />
    <path d="M10 28 L50 2 L90 28 Q50 34 10 28 Z" fill={C.tan} />
    <path d="M30 22 L50 6 L70 22" fill="none" stroke={C.brown} strokeWidth={1.6} />
  </g>
);

export const chef = () => (
  <g>
    <Person shirt={C.white} hair="short" skin={SKIN.light} mustache="#3B2F2F" />
    <path d="M32 26 V16 Q24 12 30 4 Q36 -2 44 4 Q50 -2 56 4 Q64 -2 70 4 Q76 12 68 16 V26 Z" fill={C.white} />
    <path d="M32 22 H68" fill="none" strokeWidth={2} />
    <path d="M44 66 h12 M44 74 h12 M44 82 h12" fill="none" strokeWidth={2} />
  </g>
);

export const pilot = () => (
  <g>
    <Person shirt={C.white} hair="short" collar tie={C.navy} skin={SKIN.medium} />
    <path d="M30 26 Q30 12 50 12 Q70 12 70 26 Z" fill={C.navy} />
    <path d="M26 26 H74 L68 32 H32 Z" fill={INK} />
    <path d="M44 18 l6 -3 l6 3 l-6 2 z" fill={C.yellow} strokeWidth={1.4} />
    <path d="M30 76 h10 M30 76 l-4 -3 M40 76 l4 -3" fill="none" stroke={C.yellow} strokeWidth={3} />
  </g>
);

export const firefighter = () => (
  <g>
    <Person shirt={C.orange} hair="short" skin={SKIN.medium} />
    <path d="M24 30 Q24 8 50 8 Q76 8 76 30 Z" fill={C.red} />
    <path d="M18 30 H82 L78 36 H22 Z" fill={C.red} />
    <rect x={44} y={12} width={12} height={14} rx={3} fill={C.yellow} strokeWidth={1.8} />
    <path d="M24 80 H76 M24 88 H76" fill="none" stroke={C.yellow} strokeWidth={4} />
  </g>
);

export const driver = () => (
  <g>
    <Person shirt={C.blue} hair="short" skin={SKIN.tan} />
    <path d="M32 26 Q32 14 50 14 Q68 14 68 26 Z" fill={C.blue} />
    <path d="M30 26 H74 L72 30 H30 Z" fill={INK} />
    <circle cx={50} cy={86} r={16} fill="none" stroke={INK} strokeWidth={6} />
    <circle cx={50} cy={86} r={16} fill="none" stroke={C.grey} strokeWidth={3} />
    <path d="M34 86 H66" fill="none" stroke={C.grey} strokeWidth={4} />
  </g>
);

// --- Places in town -------------------------------------------------------------

/** A small building with a signboard. */
export const building = (sign: string, wall: string, roof: string, icon?: "cross" | "book" | "star" | "cart" | "plate" | "envelope") => (
  <g>
    <Backdrop sky={C.sky} ground={C.green} />
    <path d="M14 38 L50 16 L86 38 Z" fill={roof} />
    <rect x={18} y={38} width={64} height={52} fill={wall} />
    <rect x={22} y={42} width={56} height={13} rx={2} fill={C.white} strokeWidth={1.8} />
    <text x={50} y={51.5} textAnchor="middle" fontSize={sign.length > 9 ? 6.4 : 7.6} fontWeight={900} fill={INK} stroke="none" fontFamily="inherit">{sign}</text>
    <rect x={42} y={66} width={16} height={24} fill={C.tan} />
    <rect x={24} y={62} width={12} height={10} fill={C.sky} strokeWidth={1.6} />
    <rect x={64} y={62} width={12} height={10} fill={C.sky} strokeWidth={1.6} />
    {icon === "cross" && <path d="M50 22 v12 M44 28 h12" fill="none" stroke={C.red} strokeWidth={4} />}
    {icon === "book" && <path d="M42 30 Q46 27 50 30 Q54 27 58 30 V36 Q54 33 50 36 Q46 33 42 36 Z" fill={C.white} strokeWidth={1.6} />}
    {icon === "star" && <Star x={50} y={30} r={5} />}
    {icon === "cart" && <path d="M42 26 h4 l3 8 h9 l2 -6 h-13 M50 37 a1.5 1.5 0 1 0 0.1 0 M57 37 a1.5 1.5 0 1 0 0.1 0" fill="none" strokeWidth={1.8} />}
    {icon === "plate" && <g><circle cx={50} cy={30} r={6} fill={C.white} strokeWidth={1.6} /><path d="M41 24 v12 M59 24 v12" fill="none" strokeWidth={1.6} /></g>}
    {icon === "envelope" && <g><rect x={43} y={26} width={14} height={9} fill={C.white} strokeWidth={1.6} /><path d="M43 26 l7 5 l7 -5" fill="none" strokeWidth={1.4} /></g>}
  </g>
);

export const park = () => (
  <g>
    <Backdrop sky={C.sky} ground={C.green} />
    <Place x={-18} y={-8} s={0.75}>
      <path d="M42 94 L44 58 H56 L58 94 Z" fill={C.brown} />
      <circle cx={30} cy={44} r={20} fill={C.darkGreen} />
      <circle cx={70} cy={44} r={20} fill={C.darkGreen} />
      <circle cx={50} cy={28} r={24} fill={C.darkGreen} />
    </Place>
    <rect x={52} y={66} width={36} height={6} rx={2} fill={C.tan} />
    <rect x={52} y={58} width={36} height={5} rx={2} fill={C.tan} />
    <path d="M56 72 V82 M84 72 V82" fill="none" strokeWidth={3} />
    <circle cx={80} cy={22} r={7} fill={C.yellow} />
  </g>
);

export const mailbox = () => (
  <g>
    <path d="M44 60 V94 H56 V60" fill={C.grey} />
    <path d="M24 30 Q24 14 50 14 Q76 14 76 30 V62 H24 Z" fill={C.orange} />
    <rect x={34} y={30} width={32} height={6} rx={2} fill={INK} />
    <rect x={36} y={42} width={28} height={12} rx={2} fill={C.white} strokeWidth={1.6} />
    <path d="M36 42 l14 7 l14 -7" fill="none" strokeWidth={1.4} />
  </g>
);

export const cart = () => (
  <g>
    <path d="M6 18 H20 L30 66 H80 L90 30 H24" fill="none" strokeWidth={5} />
    <path d="M26 30 H88 L80 60 H32 Z" fill={C.sky} strokeWidth={2} />
    <Place x={30} y={14} s={0.3}><circle cx={50} cy={56} r={30} fill={C.red} /></Place>
    <Place x={50} y={10} s={0.32}><circle cx={50} cy={56} r={30} fill={C.orange} /></Place>
    <circle cx={36} cy={80} r={7} fill={INK} />
    <circle cx={74} cy={80} r={7} fill={INK} />
  </g>
);

// --- Transport ------------------------------------------------------------------

export const car = () => (
  <g>
    <path d="M6 66 V52 Q6 44 16 42 L28 40 L40 26 H66 L80 40 Q94 42 94 54 V66 Z" fill={C.blue} />
    <path d="M42 30 H52 V40 H32 Z M56 30 H64 L74 40 H56 Z" fill={C.sky} strokeWidth={2} />
    <circle cx={26} cy={68} r={10} fill={INK} />
    <circle cx={74} cy={68} r={10} fill={INK} />
    <circle cx={26} cy={68} r={4} fill={C.silver} stroke="none" />
    <circle cx={74} cy={68} r={4} fill={C.silver} stroke="none" />
    <circle cx={90} cy={52} r={3} fill={C.yellow} strokeWidth={1.4} />
  </g>
);

export const taxi = () => (
  <g>
    <path d="M6 66 V52 Q6 44 16 42 L28 40 L40 26 H66 L80 40 Q94 42 94 54 V66 Z" fill={C.yellow} />
    <path d="M42 30 H52 V40 H32 Z M56 30 H64 L74 40 H56 Z" fill={C.sky} strokeWidth={2} />
    <rect x={44} y={16} width={18} height={10} rx={2} fill={C.white} />
    <text x={53} y={24} textAnchor="middle" fontSize={7} fontWeight={900} fill={INK} stroke="none" fontFamily="inherit">TAXI</text>
    <circle cx={26} cy={68} r={10} fill={INK} />
    <circle cx={74} cy={68} r={10} fill={INK} />
  </g>
);

export const bus = () => (
  <g>
    <rect x={4} y={24} width={92} height={46} rx={8} fill={C.yellow} />
    {[10, 30, 50].map((x) => <rect key={x} x={x} y={32} width={16} height={14} rx={2} fill={C.sky} strokeWidth={1.8} />)}
    <rect x={72} y={32} width={18} height={30} rx={2} fill={C.sky} strokeWidth={1.8} />
    <path d="M4 52 H70" fill="none" stroke={C.orange} strokeWidth={4} />
    <circle cx={24} cy={72} r={9} fill={INK} />
    <circle cx={76} cy={72} r={9} fill={INK} />
    <text x={36} y={64} textAnchor="middle" fontSize={8} fontWeight={900} fill={INK} stroke="none" fontFamily="inherit">SCHOOL BUS</text>
  </g>
);

export const train = () => (
  <g>
    <path d="M8 84 H92" fill="none" strokeWidth={3} />
    <path d="M14 90 L20 84 M30 90 L36 84 M46 90 L52 84 M62 90 L68 84 M78 90 L84 84" fill="none" strokeWidth={2} />
    <rect x={18} y={14} width={64} height={64} rx={14} fill={C.red} />
    <rect x={26} y={22} width={48} height={24} rx={4} fill={C.sky} />
    <rect x={18} y={54} width={64} height={6} fill={C.white} stroke="none" />
    <circle cx={32} cy={68} r={5} fill={C.yellow} />
    <circle cx={68} cy={68} r={5} fill={C.yellow} />
    <Face x={50} y={34} s={0.8} />
  </g>
);

export const ship = () => (
  <g>
    <Backdrop sky={C.sky} />
    <path d="M4 70 q8 -5 16 0 t16 0 t16 0 t16 0 t16 0 t12 0 L96 82 Q96 94 84 94 L16 94 Q4 94 4 82 Z" fill="#4FB6E8" />
    <path d="M12 56 H88 L78 72 H22 Z" fill={C.white} />
    <rect x={30} y={38} width={40} height={18} fill={C.red} />
    <rect x={38} y={24} width={10} height={14} fill={INK} />
    {[36, 48, 60].map((x) => <circle key={x} cx={x} cy={47} r={3} fill={C.sky} strokeWidth={1.4} />)}
    <path d="M44 20 q-4 -6 2 -10 q4 -3 8 0" fill="none" stroke="#B8BEC8" strokeWidth={2.4} />
  </g>
);

// --- Time ------------------------------------------------------------------------

/** Analogue clock showing hour:minute (minute 0 or 30 in content). */
export const clockAt = (hour: number, minute: number) => {
  const minAngle = (minute / 60) * 2 * Math.PI - Math.PI / 2;
  const hourAngle = (((hour % 12) + minute / 60) / 12) * 2 * Math.PI - Math.PI / 2;
  const mx = 50 + 26 * Math.cos(minAngle);
  const my = 52 + 26 * Math.sin(minAngle);
  const hx = 50 + 17 * Math.cos(hourAngle);
  const hy = 52 + 17 * Math.sin(hourAngle);
  return (
    <g>
      <circle cx={50} cy={52} r={38} fill={C.white} />
      <circle cx={50} cy={52} r={33} fill="none" stroke={C.blue} strokeWidth={3} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * 2 * Math.PI - Math.PI / 2;
        return (
          <text key={i} x={50 + 25.5 * Math.cos(a)} y={52 + 25.5 * Math.sin(a) + 3} textAnchor="middle" fontSize={7.5} fontWeight={800} fill={INK} stroke="none" fontFamily="inherit">
            {i === 0 ? 12 : i}
          </text>
        );
      })}
      <path d={`M50 52 L${hx.toFixed(1)} ${hy.toFixed(1)}`} fill="none" stroke={C.red} strokeWidth={4.5} />
      <path d={`M50 52 L${mx.toFixed(1)} ${my.toFixed(1)}`} fill="none" stroke={INK} strokeWidth={3} />
      <circle cx={50} cy={52} r={3.5} fill={INK} />
    </g>
  );
};

// --- Directions ------------------------------------------------------------------

const Sign = ({ d }: { d: string }) => (
  <g>
    <path d="M50 70 V94" fill="none" stroke={C.grey} strokeWidth={6} />
    <rect x={16} y={12} width={68} height={60} rx={10} fill={C.blue} />
    <path d={d} fill="none" stroke={C.white} strokeWidth={7} />
  </g>
);
export const turnLeft = () => <Sign d="M66 60 V40 Q66 30 56 30 H32 M42 20 L30 30 L42 40" />;
export const turnRight = () => <Sign d="M34 60 V40 Q34 30 44 30 H68 M58 20 L70 30 L58 40" />;
export const goStraight = () => <Sign d="M50 64 V22 M38 34 L50 22 L62 34" />;

export const map = () => (
  <g>
    <path d="M8 22 L34 12 L66 22 L92 12 V78 L66 88 L34 78 L8 88 Z" fill={C.cream} />
    <path d="M34 12 V78 M66 22 V88" fill="none" strokeWidth={2} />
    <path d="M14 60 Q30 40 50 54 T86 36" fill="none" stroke={C.red} strokeWidth={3} strokeDasharray="4 4" />
    <path d="M72 30 Q72 20 80 20 Q88 20 88 30 Q88 36 80 44 Q72 36 72 30 Z" fill={C.red} />
    <circle cx={80} cy={29} r={3} fill={C.white} />
  </g>
);

export const trafficLight = () => (
  <g>
    <path d="M50 84 V96" fill="none" strokeWidth={5} />
    <rect x={32} y={6} width={36} height={78} rx={10} fill={INK} />
    <circle cx={50} cy={22} r={9} fill={C.red} />
    <circle cx={50} cy={45} r={9} fill={C.yellow} />
    <circle cx={50} cy={68} r={9} fill={C.green} />
  </g>
);

// --- Celebrations & invitations -------------------------------------------------

export const flag = () => (
  <g>
    <path d="M20 8 V96" fill="none" stroke={C.grey} strokeWidth={5} />
    <path d="M22 14 H86 V40 H22 Z" fill={C.red} />
    <path d="M22 40 H86 V66 H22 Z" fill={C.white} />
  </g>
);

export const fireworks = () => (
  <g>
    <rect x={4} y={6} width={92} height={88} rx={14} fill="#2E3A6E" />
    {[[30, 34, C.yellow], [68, 30, C.pink], [52, 64, C.green]].map(([x, y, c], i) => (
      <g key={i}>
        {Array.from({ length: 8 }, (_, k) => {
          const a = (k / 8) * 2 * Math.PI;
          return <path key={k} d={`M${Number(x) + 5 * Math.cos(a)} ${Number(y) + 5 * Math.sin(a)} L${Number(x) + 16 * Math.cos(a)} ${Number(y) + 16 * Math.sin(a)}`} fill="none" stroke={String(c)} strokeWidth={3} />;
        })}
        <circle cx={Number(x)} cy={Number(y)} r={3} fill={String(c)} stroke="none" />
      </g>
    ))}
  </g>
);

export const ketupat = () => (
  <g>
    <path d="M50 10 V20" fill="none" stroke={C.darkGreen} strokeWidth={3} />
    <path d="M50 20 L82 52 L50 84 L18 52 Z" fill="#9BD15F" />
    <path d="M34 36 L66 68 M42 28 L74 60 M26 44 L58 76 M66 36 L34 68 M58 28 L26 60 M74 44 L42 76" fill="none" stroke={C.darkGreen} strokeWidth={2} />
  </g>
);

export const lantern = () => (
  <g>
    <path d="M50 4 V16" fill="none" strokeWidth={3} />
    <rect x={38} y={14} width={24} height={6} rx={2} fill={C.yellow} />
    <ellipse cx={50} cy={50} rx={32} ry={30} fill={C.red} />
    <path d="M50 20 V80 M34 24 Q24 50 34 76 M66 24 Q76 50 66 76" fill="none" stroke="#C0392B" strokeWidth={2} />
    <rect x={38} y={80} width={24} height={6} rx={2} fill={C.yellow} />
    <path d="M44 86 V96 M50 86 V98 M56 86 V96" fill="none" stroke={C.yellow} strokeWidth={2} />
  </g>
);

export const christmasTree = () => (
  <g>
    <rect x={44} y={80} width={12} height={14} fill={C.brown} />
    <path d="M50 12 L76 46 H62 L84 78 H16 L38 46 H24 Z" fill={C.darkGreen} />
    <Star x={50} y={12} r={8} />
    {[[40, 54, C.red], [60, 60, C.blue], [36, 70, C.yellow], [64, 72, C.red], [50, 40, C.yellow]].map(([x, y, c], i) => (
      <circle key={i} cx={Number(x)} cy={Number(y)} r={3.5} fill={String(c)} strokeWidth={1.4} />
    ))}
  </g>
);

export const envelope = () => (
  <g>
    <rect x={8} y={24} width={84} height={56} rx={4} fill={C.white} />
    <path d="M8 24 L50 58 L92 24" fill={C.cream} />
    <path d="M8 80 L40 50 M92 80 L60 50" fill="none" strokeWidth={2} />
    <path d="M50 52 q-8 -10 0 -14 q8 4 0 14 z" fill={C.red} strokeWidth={1.6} />
  </g>
);

export const card = () => (
  <g>
    <path d="M14 14 L50 22 V90 L14 82 Z" fill={C.pink} />
    <path d="M50 22 L86 14 V82 L50 90 Z" fill={C.white} />
    <path d="M60 40 h18 M60 50 h18 M60 60 h12" fill="none" stroke={C.grey} strokeWidth={2.4} />
    <path d="M32 58 Q20 46 26 40 Q32 36 34 44 Q36 36 42 40 Q46 46 32 58 Z" fill={C.red} strokeWidth={1.6} />
  </g>
);

export const graduation = () => (
  <g>
    <path d="M10 34 L50 18 L90 34 L50 50 Z" fill={INK} />
    <path d="M28 42 V58 Q50 70 72 58 V42" fill={INK} />
    <path d="M84 36 V58" fill="none" stroke={C.yellow} strokeWidth={2.4} />
    <circle cx={84} cy={60} r={3} fill={C.yellow} strokeWidth={1.4} />
    <rect x={20} y={70} width={60} height={16} rx={8} fill={C.cream} />
    <path d="M44 70 V86" fill="none" stroke={C.red} strokeWidth={4} />
  </g>
);

