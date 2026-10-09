import "server-only";
import type { Course } from "@/lib/course/types";
import { assemble } from "../kit";
import { CH1, CH2 } from "./ch1-2";
import { CH3, CH4 } from "./ch3-4";
import { CH5, CH6 } from "./ch5-6";
import { CH7, CH8 } from "./ch7-8";

// English for Grade 10 (SMA), Kurikulum Merdeka Fase E: interpersonal
// language (compliments, congratulations, care), descriptive texts about
// places, letters and emails, future forms and announcements, biographical
// recounts, narrative analysis, analytical exposition, and the world of work.

export const ENGLISH_SMA_10: Course = assemble({
  slug: "english-sma-10",
  title: "English Grade 10 (SMA)",
  subtitle: "Kurikulum Merdeka Phase E — kindness in words, wonderful Indonesia, letters and emails, plans and announcements, life stories, narratives, opinions and the world of work.",
  labels: { level: "Chapter", quiz: "Posttest" },
  mascot: "owl",
  levels: [CH1, CH2, CH3, CH4, CH5, CH6, CH7, CH8],
});
