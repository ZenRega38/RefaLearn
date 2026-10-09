import "server-only";
import type { Course } from "@/lib/course/types";
import { assemble } from "../kit";
import { CH1, CH2 } from "./ch1-2";
import { CH3, CH4 } from "./ch3-4";
import { CH5, CH6 } from "./ch5-6";
import { CH7, CH8 } from "./ch7-8";

// English for Grade 7 (SMP), Kurikulum Merdeka Fase D: introductions,
// describing people, food, houses, routines, hobbies, short functional
// texts and animals (descriptive texts).

export const ENGLISH_SMP_7: Course = assemble({
  slug: "english-smp-7",
  title: "English Grade 7 (SMP)",
  subtitle: "Kurikulum Merdeka Phase D — introduce yourself, describe people, food, homes and animals, talk about routines and hobbies, and read signs and notices.",
  labels: { level: "Chapter", quiz: "Posttest" },
  mascot: "owl",
  levels: [CH1, CH2, CH3, CH4, CH5, CH6, CH7, CH8],
});
