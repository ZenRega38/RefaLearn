import "server-only";
import type { Course, Exam, LevelQuiz, Question } from "@/lib/course/types";
import { seedOf, shuffle } from "@/lib/course/grading";
import { balance as balanceKey, balanceLesson } from "../kit";
import { L1_LISTENING } from "./level1-listening";
import { L1_STRUCTURE } from "./level1-structure";
import { L1_READING } from "./level1-reading";
import { L1_QUIZ } from "./level1-quiz";
import { L1_HOTS, L1_LIVE, L1_MORE_CHECKS, L1_MORE_SECTIONS, L1_PRETEST } from "./level1-extra";
import { L2_HOTS, L2_LESSONS, L2_LIVE, L2_PRETEST, L2_QUIZ } from "./level2";
import { L3_HOTS, L3_LESSONS, L3_LIVE, L3_PRETEST, L3_QUIZ } from "./level3";
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

const balanceQuiz = (quiz: LevelQuiz, hots: Set<string> = new Set()): LevelQuiz => ({
  ...quiz,
  questions: quiz.questions.map((q) => balance(hots.has(q.id) ? { ...q, hots: true } : q)),
});

export const TOEFL_ITP: Course = {
  slug: "toefl-itp",
  title: "TOEFL ITP Mastery",
  subtitle: "From zero to a high score — interactive lessons, level quizzes and full tryouts in the real TOEFL ITP format.",
  labels: { level: "Level", quiz: "Big Quiz" },
  // Learners could take the tryout after Level 1 before Levels 2–3 existed.
  tryoutAfterLevel: "level-1",
  levels: [
    {
      id: "level-1",
      title: "Level 1 — Foundations",
      description: "Learn the test format and master the most frequent question patterns in all three skills.",
      targetScore: "Target 400–450",
      cover: ["headset", "pencil", "open-book"],
      pretest: balanceQuiz(L1_PRETEST),
      // Interleaved so each skill moves forward together.
      lessons: [
        L1_LISTENING[0], L1_STRUCTURE[0], L1_READING[0],
        L1_LISTENING[1], L1_STRUCTURE[1], L1_READING[1],
        L1_LISTENING[2], L1_STRUCTURE[2], L1_READING[2],
        L1_LISTENING[3], L1_STRUCTURE[3], L1_READING[3],
      ].map((l) => ({
        ...l,
        sections: L1_MORE_SECTIONS[l.id] ? [...l.sections, L1_MORE_SECTIONS[l.id]] : l.sections,
        checkpoint: [...l.checkpoint, ...(L1_MORE_CHECKS[l.id] ?? [])],
      })),
      quiz: balanceQuiz(L1_QUIZ, L1_HOTS),
      live: { ...L1_LIVE, questions: L1_LIVE.questions.map(balanceKey) },
    },
    {
      id: "level-2",
      title: "Level 2 — Intermediate",
      description: "Idioms and implied meaning, longer talks, complex clauses, parallel structure, and inference, purpose and tone in reading.",
      targetScore: "Target 480–520",
      cover: ["owl-think", "report", "clock"],
      pretest: balanceQuiz(L2_PRETEST),
      lessons: L2_LESSONS.map(balanceLesson),
      quiz: balanceQuiz(L2_QUIZ, L2_HOTS),
      live: { ...L2_LIVE, questions: L2_LIVE.questions.map(balanceKey) },
    },
    {
      id: "level-3",
      title: "Level 3 — Advanced",
      description: "Contrary-to-fact meaning and lectures, inversion and tricky word choice, complex inference and full-test time management.",
      targetScore: "Target 550+",
      cover: ["trophy", "graduation", "target"],
      pretest: balanceQuiz(L3_PRETEST),
      lessons: L3_LESSONS.map(balanceLesson),
      quiz: balanceQuiz(L3_QUIZ, L3_HOTS),
      live: { ...L3_LIVE, questions: L3_LIVE.questions.map(balanceKey) },
    },
  ],
  pretest: balanceExam(PRETEST),
  tryout: balanceExam({
    kind: "tryout",
    title: "TOEFL ITP Tryout (Full Test)",
    description:
      "140 questions in about 115 minutes, with the same order, timing and question types as TOEFL ITP: Listening (50), Structure & Written Expression (40) and Reading (50).",
    sections: [TRYOUT_LISTENING, TRYOUT_STRUCTURE, TRYOUT_READING],
  }),
};
