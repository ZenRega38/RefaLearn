import "server-only";
import type { Course, Exam, LevelQuiz, Question } from "@/lib/course/types";
import { seedOf, shuffle } from "@/lib/course/grading";
import { L1_LISTENING } from "./level1-listening";
import { L1_STRUCTURE } from "./level1-structure";
import { L1_READING } from "./level1-reading";
import { L1_QUIZ } from "./level1-quiz";
import { PRETEST } from "./pretest";
import { TRYOUT_LISTENING } from "./tryout-listening";
import { TRYOUT_STRUCTURE } from "./tryout-structure";
import { TRYOUT_READING } from "./tryout-reading";

// Options are authored with the key in an arbitrary position; exams and
// level quizzes get a fixed, per-question shuffle so the keys are spread
// evenly across A–D (no "always pick B" pattern). Ordered option sets
// (One/Two/Three/Four, numbers) keep their order.
const ORDERED = /^(one|two|three|four|five|\d+)$/i;

function balance(q: Question): Question {
  if (q.type !== "mc" || q.options.every((o) => ORDERED.test(o.trim()))) return q;
  const order = shuffle(q.options.map((_, i) => i), seedOf(q.id));
  return { ...q, options: order.map((i) => q.options[i]), answer: order.indexOf(q.answer) };
}

const balanceExam = (exam: Exam): Exam => ({
  ...exam,
  sections: exam.sections.map((s) => ({ ...s, questions: s.questions.map(balance) })),
});

const balanceQuiz = (quiz: LevelQuiz): LevelQuiz => ({ ...quiz, questions: quiz.questions.map(balance) });

export const TOEFL_ITP: Course = {
  slug: "toefl-itp",
  title: "TOEFL ITP Mastery",
  subtitle: "Dari nol sampai skor tinggi — materi interaktif, kuis bertahap, dan tryout format asli.",
  labels: { level: "Level", quiz: "Big Quiz" },
  comingSoon: "Level 2 (Menengah, target 480–520) dan Level 3 (Mahir, target 550+) sedang disiapkan.",
  levels: [
    {
      id: "level-1",
      title: "Level 1 — Fondasi",
      description: "Kenali format tes dan kuasai pola soal yang paling sering muncul di ketiga skill.",
      targetScore: "Target 400–450",
      // Interleaved so each skill moves forward together.
      lessons: [
        L1_LISTENING[0], L1_STRUCTURE[0], L1_READING[0],
        L1_LISTENING[1], L1_STRUCTURE[1], L1_READING[1],
        L1_LISTENING[2], L1_STRUCTURE[2], L1_READING[2],
        L1_LISTENING[3], L1_STRUCTURE[3], L1_READING[3],
      ],
      quiz: balanceQuiz(L1_QUIZ),
    },
  ],
  pretest: balanceExam(PRETEST),
  tryout: balanceExam({
    kind: "tryout",
    title: "Tryout TOEFL ITP (Full Test)",
    description:
      "140 soal dalam ±115 menit dengan urutan, waktu, dan jenis soal seperti TOEFL ITP: Listening (50), Structure & Written Expression (40), Reading (50).",
    sections: [TRYOUT_LISTENING, TRYOUT_STRUCTURE, TRYOUT_READING],
  }),
};
