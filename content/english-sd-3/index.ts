import "server-only";
import type { Course } from "@/lib/course/types";
import { assemble } from "../kit";
import { BAB1 } from "./bab1";
import { BAB2 } from "./bab2";
import { BAB3 } from "./bab3";
import { BAB4 } from "./bab4";
import { BAB5 } from "./bab5";
import { BAB6 } from "./bab6";

// English for Grade 3 (SD) — Kurikulum Merdeka, Fase B (grades 3–4).
// Learning outcomes: listening–speaking, reading–viewing, writing–presenting.
// All texts and dialogues are original. All-English with read-aloud;
// Indonesian only in explanations and translation items.

export const ENGLISH_SD_3: Course = assemble({
  slug: "english-sd-3",
  title: "English Grade 3 (SD)",
  subtitle: "Kurikulum Merdeka Phase B — learn through pictures, sounds and fun quizzes.",
  labels: { level: "Chapter", quiz: "Posttest" },
  mascot: "owl",
  levels: [BAB1, BAB2, BAB3, BAB4, BAB5, BAB6],
});
