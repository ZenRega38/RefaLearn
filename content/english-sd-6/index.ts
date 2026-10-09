import "server-only";
import type { Course } from "@/lib/course/types";
import { assemble } from "../kit";
import { CH1, CH2 } from "./ch1-2";
import { CH3, CH4 } from "./ch3-4";
import { CH5, CH6 } from "./ch5-6";
import { CH7, CH8 } from "./ch7-8";

// English for Grade 6 (SD), Kurikulum Merdeka Fase C: past experiences
// (recount), future plans, comparisons, procedures, the environment,
// fables (narrative), invitations and cards, dreams and graduation.

export const ENGLISH_SD_6: Course = assemble({
  slug: "english-sd-6",
  title: "English Grade 6 (SD)",
  subtitle: "Kurikulum Merdeka Phase C — tell past experiences and future plans, compare, explain how to make things, retell fables and say goodbye to elementary school.",
  labels: { level: "Chapter", quiz: "Posttest" },
  mascot: "owl",
  levels: [CH1, CH2, CH3, CH4, CH5, CH6, CH7, CH8],
});
