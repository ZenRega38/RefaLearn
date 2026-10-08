import "server-only";
import type { Course, LevelQuiz, LiveQuizSet, Question } from "@/lib/course/types";
import { seedOf, shuffle } from "@/lib/course/grading";
import { M1, M2 } from "./m01-02";
import { M3, M4 } from "./m03-04";
import { M5, M6 } from "./m05-06";
import { M7, M8 } from "./m07-08";
import { M9, M10 } from "./m09-10";

// English Day — 10 modul percakapan untuk staf Household (WiFi/IndiHome),
// diadaptasi dari modul ajar "English Day — 10 Sesi Lengkap". One module per
// weekly session. Free for every signed-in user; the admin opens modules as
// the class reaches them, and can host each module's live quiz.
//
// No durations on lessons: participants come back to review whenever they
// like. Module quizzes have a per-question timer instead.

function balance<Q extends Question>(q: Q): Q {
  if (q.type !== "mc") return q;
  const order = shuffle(q.options.map((_, i) => i), seedOf(q.id));
  return { ...q, options: order.map((i) => q.options[i]), answer: order.indexOf(q.answer) };
}
const balanced = (quiz: LevelQuiz): LevelQuiz => ({ ...quiz, questions: quiz.questions.map(balance) });
const balancedLive = (set: LiveQuizSet): LiveQuizSet => ({ ...set, questions: set.questions.map(balance) });

export const ENGLISH_DAY: Course = {
  slug: "english-day",
  title: "English Day — Ngobrol Bahasa Inggris untuk Kerja",
  subtitle: "10 modul percakapan sehari-hari dan layanan pelanggan. Berani ngomong dulu, sempurna belakangan.",
  labels: { level: "Modul", quiz: "Kuis Modul" },
  mascot: "owl",
  free: true,
  adminLocks: true,
  openOrder: true,
  quizSecondsPerQuestion: 45,
  levels: [M1, M2, M3, M4, M5, M6, M7, M8, M9, M10].map((m) => ({
    ...m,
    quiz: balanced(m.quiz),
    live: m.live && balancedLive(m.live),
  })),
  comingSoon: "Setelah Modul 10: Customer Service Lanjutan, Email & WhatsApp Bisnis, dan Telepon Lanjutan. Usulkan topikmu ke pengajar!",
};
