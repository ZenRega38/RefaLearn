import "server-only";
import type { Course, Level } from "@/lib/course/types";
import { assemble } from "../kit";
import { SESSION1 } from "./modul1";
import { SESSION2 } from "./modul2";
import { SESSION3 } from "./modul3";
import { SESSION4 } from "./modul4";
import { SESSION5 } from "./modul5";

// EA Champion English Olympiad 2026 (SMA, jalur umum/individu): four
// modules, one per tutoring session — each sold as its own store material —
// plus Modul 5, three timed Preliminary Round tryouts.
// Modul 3 weaves the whole Preliminary block (sessions 3, 3B, 3C, 3D) into
// one module. Lessons open in any order, so learners can jump back to a
// topic; quizzes run at the real paper's pace (60 minutes for 40 questions).

const eacModule = (n: number, subtitle: string, level: Level, title = `Modul ${n} EA Champion - Olympiad`): Course =>
  assemble({
    slug: `eac-olympiad-${n}`,
    title,
    subtitle,
    labels: { level: "Session", quiz: "Quiz" },
    mascot: "owl",
    openOrder: true,
    quizSecondsPerQuestion: 90,
    levels: [level],
  });

export const EAC_OLYMPIAD_1 = eacModule(
  1,
  "Know the competition, then build Part A foundations: nouns and plurals, three basic tenses, parts of speech and conjunctions, plus a first look at Reading.",
  SESSION1
);

export const EAC_OLYMPIAD_2 = eacModule(
  2,
  "Comparatives and superlatives, prepositions, relative clauses with who and which, synonyms and antonyms, and four Part B reading strategies.",
  SESSION2
);

export const EAC_OLYMPIAD_3 = eacModule(
  3,
  "Complete Preliminary Round preparation: Parts A, B, C and D, drills, Lab D, a Part D retest, exam-day strategy and two full 40-question mock tests.",
  SESSION3
);

export const EAC_OLYMPIAD_4 = eacModule(
  4,
  "Regional Round level: evaluate your results, present perfect and past perfect, advanced multi-error analysis, idioms and figurative language, and academic vocabulary.",
  SESSION4
);

export const EAC_OLYMPIAD_5 = eacModule(
  5,
  "Three full Preliminary Round tryouts with a 60-minute timer: 40 new questions each in the exact competition format, a different paper on every attempt, scored on the 100-point scale with full review.",
  SESSION5,
  "Modul 5 EA Champion - Preliminary Tryout"
);
