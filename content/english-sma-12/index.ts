import "server-only";
import type { Course } from "@/lib/course/types";
import { assemble } from "../kit";
import { CH1, CH2 } from "./ch1-2";
import { CH3, CH4 } from "./ch3-4";
import { CH5, CH6 } from "./ch5-6";
import { CH7, CH8 } from "./ch7-8";

// English for Grade 12 (SMA), Kurikulum Merdeka Fase F: discussion texts,
// applications and interviews, reviews, literature, manuals and
// troubleshooting, debate, academic skills, and a valedictory farewell.

export const ENGLISH_SMA_12: Course = assemble({
  slug: "english-sma-12",
  title: "English Grade 12 (SMA)",
  subtitle: "Kurikulum Merdeka Phase F — discuss both sides, apply for your future, review and analyse literature, read manuals, debate, build academic skills and say farewell.",
  labels: { level: "Chapter", quiz: "Posttest" },
  mascot: "owl",
  levels: [CH1, CH2, CH3, CH4, CH5, CH6, CH7, CH8],
});
