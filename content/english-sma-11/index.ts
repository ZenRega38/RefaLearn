import "server-only";
import type { Course } from "@/lib/course/types";
import { assemble } from "../kit";
import { CH1, CH2 } from "./ch1-2";
import { CH3, CH4 } from "./ch3-4";
import { CH5, CH6 } from "./ch5-6";
import { CH7, CH8 } from "./ch7-8";

// English for Grade 11 (SMA), Kurikulum Merdeka Fase F: suggestions and
// offers, explanation texts, conditionals, hortatory exposition, media
// literacy and reporting verbs, the passive and causative in science,
// complaints and apologies, and compare-and-contrast essays.

export const ENGLISH_SMA_11: Course = assemble({
  slug: "english-sma-11",
  title: "English Grade 11 (SMA)",
  subtitle: "Kurikulum Merdeka Phase F — solve problems, explain how nature works, imagine with conditionals, persuade, check the facts, pitch innovations, complain politely and compare cultures.",
  labels: { level: "Chapter", quiz: "Posttest" },
  mascot: "owl",
  levels: [CH1, CH2, CH3, CH4, CH5, CH6, CH7, CH8],
});
