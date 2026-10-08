import "server-only";
import type { Course } from "@/lib/course/types";
import { assemble } from "../kit";
import { CH1, CH2 } from "./ch1-2";
import { CH3, CH4 } from "./ch3-4";
import { CH5, CH6 } from "./ch5-6";

// English for Grade 2 (SD), Kurikulum Merdeka Fase A: home, daily routine
// and days, clothes, weather, feelings, and where things are.

export const ENGLISH_SD_2: Course = assemble({
  slug: "english-sd-2",
  title: "English Grade 2 (SD)",
  subtitle: "Kurikulum Merdeka Phase A — talk about your home, your day, your clothes, the weather and your feelings.",
  labels: { level: "Chapter", quiz: "Posttest" },
  mascot: "owl",
  levels: [CH1, CH2, CH3, CH4, CH5, CH6],
});
