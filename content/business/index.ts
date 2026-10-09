import "server-only";
import type { Course } from "@/lib/course/types";
import { assemble } from "../kit";
import { U1, U2 } from "./u1-2";
import { U3, U4 } from "./u3-4";
import { U5, U6 } from "./u5-6";

// Business English (B1–B2): the workplace, emails, meetings, presentations,
// negotiation and customer service, and job applications — each unit with
// listening, speaking role plays and writing tasks with models and rubrics.

export const BUSINESS_ENGLISH: Course = assemble({
  slug: "business-english",
  title: "Business English",
  subtitle: "Communicate confidently at work: networking, professional emails, meetings, presentations and data, negotiation and customer service, CVs, cover letters and job interviews.",
  labels: { level: "Unit", quiz: "Review Quiz" },
  mascot: "owl",
  levels: [U1, U2, U3, U4, U5, U6],
});
