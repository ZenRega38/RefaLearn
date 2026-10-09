import "server-only";
import type { Course } from "@/lib/course/types";
import { assemble } from "../kit";
import { CH1, CH2 } from "./ch1-2";
import { CH3, CH4 } from "./ch3-4";
import { CH5, CH6 } from "./ch5-6";
import { CH7, CH8 } from "./ch7-8";

// English for Grade 8 (SMP), Kurikulum Merdeka Fase D: recounts,
// biographies, past continuous, legends (narrative), health advice,
// comparisons, the environment (first conditional, persuasive text) and
// technology (present perfect, emails).

export const ENGLISH_SMP_8: Course = assemble({
  slug: "english-smp-8",
  title: "English Grade 8 (SMP)",
  subtitle: "Kurikulum Merdeka Phase D — recounts, biographies, legends, health advice, comparisons, saving the planet and staying safe online.",
  labels: { level: "Chapter", quiz: "Posttest" },
  mascot: "owl",
  levels: [CH1, CH2, CH3, CH4, CH5, CH6, CH7, CH8],
});
