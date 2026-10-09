import "server-only";
import type { Course } from "@/lib/course/types";
import { assemble } from "../kit";
import { LEVEL1, LEVEL2 } from "./level1-2";
import { LEVEL3, LEVEL4 } from "./level3-4";
import { LEVEL5, LEVEL6 } from "./level5-6";

// TOEIC Listening & Reading preparation: six levels by target score, covering
// all seven parts (photographs, question–response, conversations, talks,
// incomplete sentences, text completion, single and multiple passages).

export const TOEIC_LR: Course = assemble({
  slug: "toeic-lr",
  title: "TOEIC Listening & Reading",
  subtitle: "Score by score from 400+ to 900+: all seven parts, business vocabulary and grammar, strategies, traps and time management, with a mock quiz at every level.",
  labels: { level: "Level", quiz: "Mock Quiz" },
  mascot: "owl",
  levels: [LEVEL1, LEVEL2, LEVEL3, LEVEL4, LEVEL5, LEVEL6],
});
