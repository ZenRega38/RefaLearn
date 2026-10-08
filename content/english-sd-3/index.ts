import "server-only";
import type { Course, LevelQuiz, Question } from "@/lib/course/types";
import { seedOf, shuffle } from "@/lib/course/grading";
import { BAB1 } from "./bab1";
import { BAB2 } from "./bab2";
import { BAB3 } from "./bab3";
import { BAB4 } from "./bab4";
import { BAB5 } from "./bab5";
import { BAB6 } from "./bab6";

// Bahasa Inggris Kelas 3 SD — Kurikulum Merdeka, Fase B (kelas 3–4).
// Elemen capaian pembelajaran: Menyimak–Berbicara, Membaca–Memirsa,
// Menulis–Mempresentasikan. All texts and dialogues are original.

// Spread answer keys in pre/posttests so the right answer isn't always first.
// Lessons keep authored order (explanations there are written to match).
function balance(q: Question): Question {
  if (q.type !== "mc") return q;
  const order = shuffle(q.options.map((_, i) => i), seedOf(q.id));
  return { ...q, options: order.map((i) => q.options[i]), answer: order.indexOf(q.answer) };
}
const balanced = (quiz: LevelQuiz): LevelQuiz => ({ ...quiz, questions: quiz.questions.map(balance) });

export const ENGLISH_SD_3: Course = {
  slug: "english-sd-3",
  title: "Bahasa Inggris Kelas 3 SD",
  subtitle: "Kurikulum Merdeka Fase B — belajar sambil bermain lewat gambar, suara, dan kuis seru.",
  labels: { level: "Bab", quiz: "Posttest" },
  mascot: "owl",
  levels: [BAB1, BAB2, BAB3, BAB4, BAB5, BAB6].map((bab) => ({
    ...bab,
    pretest: bab.pretest && balanced(bab.pretest),
    quiz: balanced(bab.quiz),
  })),
};
