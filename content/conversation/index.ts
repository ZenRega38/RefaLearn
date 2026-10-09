import "server-only";
import type { Course } from "@/lib/course/types";
import { assemble } from "../kit";
import { U1, U2 } from "./u1-2";
import { U3, U4 } from "./u3-4";
import { U5, U6 } from "./u5-6";

// Everyday English Conversation (A2–B1+): speaking-first units built around
// real situations — dialogues to listen to, phrases to repeat, and role plays
// with model answers and self-check rubrics.

export const ENGLISH_CONVERSATION: Course = assemble({
  slug: "english-conversation",
  title: "Everyday English Conversation",
  subtitle: "Speak naturally in real situations: meeting people and small talk, getting around, eating out, travel, phone calls and plans, and feelings, opinions and tricky moments.",
  labels: { level: "Unit", quiz: "Review Quiz" },
  mascot: "owl",
  levels: [U1, U2, U3, U4, U5, U6],
});
