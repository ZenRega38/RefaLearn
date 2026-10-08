import { Headphones, PenLine, BookOpenText } from "lucide-react";
import type { Skill } from "@/lib/course/types";

export const SKILL_LABEL: Record<Skill, string> = {
  listening: "Listening",
  structure: "Structure",
  reading: "Reading",
};

export const SKILL_COLOR: Record<Skill, string> = {
  listening: "var(--color-brand-blue)",
  structure: "var(--color-accent-coral)",
  reading: "var(--color-success-green)",
};

export function SkillIcon({ skill, className = "w-4 h-4" }: { skill: Skill; className?: string }) {
  const Icon = skill === "listening" ? Headphones : skill === "structure" ? PenLine : BookOpenText;
  return <Icon className={className} style={{ color: SKILL_COLOR[skill] }} />;
}
