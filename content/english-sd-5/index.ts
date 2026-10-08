import "server-only";
import type { Course } from "@/lib/course/types";
import { assemble } from "../kit";
import { CH1, CH2 } from "./ch1-2";
import { CH3, CH4 } from "./ch3-4";
import { CH5, CH6 } from "./ch5-6";
import { CH7, CH8 } from "./ch7-8";

// English for Grade 5 (SD), Kurikulum Merdeka Fase C: school subjects,
// describing people, the house, Indonesian animals (report text), past
// holidays (recount), directions, recipes (procedure) and celebrations.

export const ENGLISH_SD_5: Course = assemble({
  slug: "english-sd-5",
  title: "English Grade 5 (SD)",
  subtitle: "Kurikulum Merdeka Phase C — describe people and animals, tell about your holidays, give directions and write recipes.",
  labels: { level: "Chapter", quiz: "Posttest" },
  mascot: "owl",
  levels: [CH1, CH2, CH3, CH4, CH5, CH6, CH7, CH8],
});
