import { Headphones, PenLine, BookOpenText, Sparkles, MessageCircle, Pencil } from "lucide-react";
import type { Skill } from "@/lib/course/types";

export const SKILL_LABEL: Record<Skill, string> = {
  listening: "Listening",
  structure: "Structure",
  reading: "Reading",
  vocabulary: "Kosakata",
  speaking: "Berbicara",
  writing: "Menulis",
};

export const SKILL_COLOR: Record<Skill, string> = {
  listening: "var(--color-brand-blue)",
  structure: "var(--color-accent-coral)",
  reading: "var(--color-success-green)",
  vocabulary: "var(--color-warning-amber)",
  speaking: "var(--color-accent-coral)",
  writing: "var(--color-brand-blue)",
};

const ICONS = { listening: Headphones, structure: PenLine, reading: BookOpenText, vocabulary: Sparkles, speaking: MessageCircle, writing: Pencil };

export function SkillIcon({ skill, className = "w-4 h-4" }: { skill: Skill; className?: string }) {
  const Icon = ICONS[skill];
  return <Icon className={className} style={{ color: SKILL_COLOR[skill] }} />;
}
