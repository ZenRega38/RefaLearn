import "server-only";
import type { Course } from "@/lib/course/types";
import { assemble } from "../kit";
import { ELLT1 } from "./level1";
import { ELLT2 } from "./level2";
import { ELLT3 } from "./level3";
import { ELLT4 } from "./level4";
import { ELLT5 } from "./level5";
import { ELLT6 } from "./level6";

// Oxford ELLT (English Language Level Test) preparation, following the
// updated content described by Oxford International in May 2026:
// three-text Reading, three-recording Listening, summary + essay Writing,
// and a live video Speaking test with prompts, essay questions and a
// picture discussion. All practice material is original.

export const OXFORD_ELLT: Course = assemble({
  slug: "oxford-ellt",
  title: "Oxford ELLT Preparation",
  subtitle: "From B1 to C1+: paragraph sequencing, gap-fill and long-text reading, note completion, summaries and essays, and the live speaking test — with mock quizzes at every level.",
  labels: { level: "Level", quiz: "Mock Quiz" },
  mascot: "owl",
  levels: [ELLT1, ELLT2, ELLT3, ELLT4, ELLT5, ELLT6],
});
