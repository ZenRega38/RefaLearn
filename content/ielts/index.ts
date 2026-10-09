import "server-only";
import type { Course } from "@/lib/course/types";
import { assemble } from "../kit";
import { BAND1 } from "./band1";
import { BAND2 } from "./band2";
import { BAND3 } from "./band3";
import { BAND4 } from "./band4";
import { BAND5 } from "./band5";
import { BAND6 } from "./band6";

// IELTS Academic preparation, organised band by band (4.5 → 7.5+). Each
// level trains all four skills; Writing and Speaking use model answers and
// band-descriptor-style self-check rubrics. All practice material is
// original.

export const IELTS_ACADEMIC: Course = assemble({
  slug: "ielts-academic",
  title: "IELTS Academic — Band by Band",
  subtitle: "From Band 4.5 to 7.5+: Listening, Reading, Writing Tasks 1 and 2, and Speaking Parts 1–3, with model answers, rubrics and mock quizzes at every band.",
  labels: { level: "Level", quiz: "Mock Quiz" },
  mascot: "owl",
  levels: [BAND1, BAND2, BAND3, BAND4, BAND5, BAND6],
});
