import "server-only";
import type { Course } from "@/lib/course/types";
import { assemble } from "../kit";
import { CH1, CH2 } from "./ch1-2";
import { CH3, CH4 } from "./ch3-4";
import { CH5, CH6 } from "./ch5-6";
import { CH7, CH8 } from "./ch7-8";

// English for Grade 4 (SD), Kurikulum Merdeka Fase B: time, dates and
// birthdays, jobs, places in town, hobbies, transport, health and shopping.

export const ENGLISH_SD_4: Course = assemble({
  slug: "english-sd-4",
  title: "English Grade 4 (SD)",
  subtitle: "Kurikulum Merdeka Phase B — time, dates, jobs, town, hobbies, transport, health and shopping in everyday English.",
  labels: { level: "Chapter", quiz: "Posttest" },
  mascot: "owl",
  levels: [CH1, CH2, CH3, CH4, CH5, CH6, CH7, CH8],
});
