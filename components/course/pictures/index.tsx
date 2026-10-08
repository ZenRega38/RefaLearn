import type { ReactNode } from "react";
import { parsePictureRef, type PictureName } from "@/lib/course/pictures";
import { C, INK } from "./base";
import * as A from "./animals";
import * as F from "./food";
import * as P from "./people";
import * as S from "./school";

const numbers = Object.fromEntries(Array.from({ length: 20 }, (_, i) => [`num-${i + 1}`, () => S.number(i + 1)])) as Record<`num-${number}`, () => ReactNode>;

/** Every picture by name. Typed as a full record, so a missing drawing fails the build. */
export const PICTURES: Record<PictureName, () => ReactNode> = {
  father: P.father,
  mother: P.mother,
  brother: P.brother,
  sister: P.sister,
  grandfather: P.grandfather,
  grandmother: P.grandmother,
  baby: P.baby,
  boy: P.boy,
  girl: P.girl,
  "teacher-woman": P.teacherWoman,
  "teacher-man": P.teacherMan,
  hello: P.hello,
  goodbye: P.goodbye,

  morning: S.morning,
  afternoon: S.afternoon,
  evening: S.evening,
  night: S.night,

  book: () => S.book(),
  pencil: () => S.pencil(),
  "pencil-red": () => S.pencil(C.red),
  eraser: () => S.eraser(),
  "eraser-green": () => S.eraser(C.green, C.green),
  ruler: () => S.ruler(),
  bag: () => S.bag(),
  crayon: S.crayon,
  chair: S.chair,
  "bag-things": S.bagThings,

  "color-red": () => S.paint(C.red),
  "color-blue": () => S.paint(C.blue),
  "color-yellow": () => S.paint(C.yellow),
  "color-green": () => S.paint(C.green),
  "color-orange": () => S.paint(C.orange),
  "color-purple": () => S.paint(C.purple),
  "color-black": () => S.paint(INK, C.white),
  "color-white": () => S.paint(C.white),
  "color-pink": () => S.paint(C.pink),

  ...numbers,

  cat: A.cat,
  "cat-white": A.catWhite,
  dog: A.dog,
  bird: A.bird,
  fish: A.fish,
  chicken: A.chicken,
  cow: A.cow,
  duck: A.duck,
  elephant: A.elephant,
  kangaroo: A.kangaroo,
  cheetah: A.cheetah,
  swim: A.swim,
  fly: A.fly,
  run: A.run,
  jump: A.jump,

  rice: F.rice,
  bread: F.bread,
  egg: F.egg,
  "grilled-fish": F.grilledFish,
  drumstick: F.drumstick,
  vegetables: F.vegetables,
  milk: F.milk,
  water: F.water,
  juice: F.juice,
  tea: F.tea,
  apple: F.apple,
  mango: F.mango,
  banana: F.banana,
  "orange-fruit": F.orangeFruit,
  tomato: F.tomato,
  leaf: F.leaf,
  cloud: F.cloud,
  cake: F.cake,
  ball: F.ball,
  basket: F.basket,
  stall: F.stall,
  lunch: F.lunch,
  yum: F.yum,
  yuck: F.yuck,
  heart: F.heart,

  owl: () => S.owl("stand"),
  "owl-wave": () => S.owl("wave"),
  "owl-cheer": () => S.owl("cheer"),
  "owl-think": () => S.owl("think"),
  "owl-read": () => S.owl("read"),
};

/**
 * Inline SVG illustration by reference ("cat", "apple*4"). Sizing comes from
 * `className`; the drawing keeps its aspect ratio. Unknown refs render nothing.
 */
export function Picture({ name, className = "w-20 h-20", label }: { name: string; className?: string; label?: string }) {
  const ref = parsePictureRef(name);
  if (!ref) return null;
  const draw = PICTURES[ref.name];
  const perRow = Math.min(ref.count, 5);
  const rows = Math.ceil(ref.count / perRow);
  const cells = Array.from({ length: ref.count }, (_, i) => (
    <g key={i} transform={`translate(${(i % perRow) * 100} ${Math.floor(i / perRow) * 100})`}>{draw()}</g>
  ));

  return (
    <svg
      viewBox={`-2 -2 ${perRow * 100 + 4} ${rows * 100 + 4}`}
      // Intrinsic size gives the aspect ratio, so `h-24 w-auto` works for rows of pictures.
      width={perRow * 100 + 4}
      height={rows * 100 + 4}
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      preserveAspectRatio="xMidYMid meet"
    >
      <g stroke={INK} strokeWidth={2.6} strokeLinejoin="round" strokeLinecap="round">
        {cells}
      </g>
    </svg>
  );
}
