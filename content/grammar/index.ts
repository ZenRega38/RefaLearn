import "server-only";
import type { Course } from "@/lib/course/types";
import { assemble } from "../kit";
import { CH1, CH2 } from "./ch1-2";
import { CH3, CH4 } from "./ch3-4";
import { CH5, CH6 } from "./ch5-6";

// English Grammar Essentials (A2–B2): the grammar most learners need for
// school, work and exams, taught in context with reading and writing.

export const ENGLISH_GRAMMAR: Course = assemble({
  slug: "english-grammar",
  title: "English Grammar Essentials",
  subtitle: "From A2 to B2: tenses, the future, nouns and articles, modals, conditionals, the passive, reported speech and relative clauses — each taught in real contexts with writing practice.",
  labels: { level: "Chapter", quiz: "Posttest" },
  mascot: "owl",
  levels: [CH1, CH2, CH3, CH4, CH5, CH6],
});
