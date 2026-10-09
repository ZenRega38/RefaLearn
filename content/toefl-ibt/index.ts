import "server-only";
import type { Course } from "@/lib/course/types";
import { assemble } from "../kit";
import { IBT1 } from "./level1";
import { IBT2 } from "./level2";
import { IBT3 } from "./level3";
import { IBT4 } from "./level4";
import { IBT5 } from "./level5";
import { IBT6 } from "./level6";

// TOEFL iBT preparation for the format introduced on 21 January 2026:
// adaptive Reading and Listening, new task types, and 1–6 band scores.
// All practice material is original and written in the style of the
// official task types.

export const TOEFL_IBT: Course = assemble({
  slug: "toefl-ibt",
  title: "TOEFL iBT (2026 Format)",
  subtitle: "Every new task type — Complete the Words, Read in Daily Life, academic passages, conversations, announcements, academic talks, Build a Sentence, emails, academic discussions, Listen and Repeat and interviews — from Band 3 to Band 6.",
  labels: { level: "Level", quiz: "Practice Test" },
  mascot: "owl",
  levels: [IBT1, IBT2, IBT3, IBT4, IBT5, IBT6],
});
