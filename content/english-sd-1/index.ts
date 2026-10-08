import "server-only";
import type { Course } from "@/lib/course/types";
import { assemble } from "../kit";
import { CH1, CH2 } from "./ch1-2";
import { CH3, CH4 } from "./ch3-4";
import { CH5, CH6 } from "./ch5-6";

// English for Grade 1 (SD), Kurikulum Merdeka Fase A. Young learners:
// short English instructions with a read-aloud button, lots of pictures,
// listen-and-choose, songs and action games. Teaching notes for parents
// are in Indonesian; everything the child answers is English.

export const ENGLISH_SD_1: Course = assemble({
  slug: "english-sd-1",
  title: "English Grade 1 (SD)",
  subtitle: "Kurikulum Merdeka Phase A — first English words through pictures, sounds, songs and games.",
  labels: { level: "Chapter", quiz: "Posttest" },
  mascot: "owl",
  levels: [CH1, CH2, CH3, CH4, CH5, CH6],
});
