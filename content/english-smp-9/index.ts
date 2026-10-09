import "server-only";
import type { Course } from "@/lib/course/types";
import { assemble } from "../kit";
import { CH1, CH2 } from "./ch1-2";
import { CH3, CH4 } from "./ch3-4";
import { CH5, CH6 } from "./ch5-6";
import { CH7, CH8 } from "./ch7-8";

// English for Grade 9 (SMP), Kurikulum Merdeka Fase D: procedures, report
// texts and relative clauses, the passive, short stories and the past
// perfect, labels and ads, songs and poems, news and reported speech,
// hopes, wishes and graduation.

export const ENGLISH_SMP_9: Course = assemble({
  slug: "english-smp-9",
  title: "English Grade 9 (SMP)",
  subtitle: "Kurikulum Merdeka Phase D — procedures, reports, the passive, short stories, labels and ads, poems, the news and getting ready for senior high school.",
  labels: { level: "Chapter", quiz: "Posttest" },
  mascot: "owl",
  levels: [CH1, CH2, CH3, CH4, CH5, CH6, CH7, CH8],
});
