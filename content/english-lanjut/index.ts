import "server-only";
import type { Course } from "@/lib/course/types";
import { assemble } from "../kit";
import { CH1, CH2 } from "./ch1-2";
import { CH3, CH4 } from "./ch3-4";
import { CH5, CH6 } from "./ch5-6";
import { CH7, CH8 } from "./ch7-8";

// Bahasa Inggris Tingkat Lanjut (advanced elective, Kurikulum Merdeka Fase F,
// Grades 11–12): poetry, drama, creative fiction, critical thinking,
// intercultural communication, data and visual texts, argumentative essays
// and professional communication.

export const ENGLISH_LANJUT: Course = assemble({
  slug: "english-lanjut",
  title: "Advanced English (Tingkat Lanjut)",
  subtitle: "Kurikulum Merdeka Phase F elective for Grades 11–12 — poetry, drama, fiction writing, critical thinking, cultures, data, academic essays and professional communication.",
  labels: { level: "Chapter", quiz: "Posttest" },
  mascot: "owl",
  levels: [CH1, CH2, CH3, CH4, CH5, CH6, CH7, CH8],
});
