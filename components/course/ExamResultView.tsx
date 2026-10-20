"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ReviewList } from "@/components/course/ReviewList";
import { SkillIcon, SKILL_LABEL } from "@/components/course/skill";
import type { ExamResult, Passage, Skill } from "@/lib/course/types";
import { Trophy, Info, ListChecks } from "lucide-react";

const SECTION_MAX: Partial<Record<Skill, number>> = { listening: 68, structure: 68, reading: 67 };

function band(score: number) {
  if (score >= 550) return "Advanced — meets the requirement of many scholarships and graduate programs";
  if (score >= 500) return "Upper intermediate — meets the usual requirement for local undergraduate and master's programs";
  if (score >= 450) return "Intermediate — a good base; strengthen Structure and Reading";
  if (score >= 400) return "Basic — focus on the question patterns that appear most often";
  return "Beginner — start from Level 1 and go in order";
}

export function ExamResultView({
  result,
  sections,
  slug,
  onOverview,
}: {
  result: ExamResult;
  sections: { skill: Skill; title: string; questionIds: string[]; passages: Passage[] }[];
  slug: string;
  /** Back to the test's overview (attempts and log). */
  onOverview?: () => void;
}) {
  const weakest = [...result.sections].sort((a, b) => a.correct / a.total - b.correct / b.total)[0];

  return (
    <div className="space-y-8">
      <Card variant="sketch" className="text-center space-y-3 py-8">
        <Trophy className="w-14 h-14 mx-auto text-[var(--color-accent-yellow)]" />
        <p className="text-sm font-semibold text-[var(--color-ink-soft)] font-[var(--font-inter)] uppercase tracking-wider">
          Estimated {result.kind === "pretest" ? "pretest" : "tryout"} score
        </p>
        <p className="text-6xl font-bold font-[var(--font-inter)] text-[var(--color-brand-blue)]">{result.totalScore}</p>
        <p className="text-sm text-[var(--color-ink)] font-[var(--font-inter)] px-4">{band(result.totalScore)}</p>
        {result.overtime && <p className="text-xs text-[var(--color-danger-red)] font-[var(--font-inter)]">Note: this test was submitted after the time limit.</p>}
      </Card>

      <div className="grid sm:grid-cols-3 gap-4">
        {result.sections.map((s) => (
          <Card key={s.skill} className="space-y-2">
            <p className="flex items-center gap-2 text-sm font-semibold text-[var(--color-ink-soft)] font-[var(--font-inter)]">
              <SkillIcon skill={s.skill} /> {SKILL_LABEL[s.skill]}
            </p>
            <p className="text-3xl font-bold font-[var(--font-inter)] text-[var(--color-ink)]">
              {s.converted}<span className="text-base text-[var(--color-ink-soft)]">/{SECTION_MAX[s.skill]}</span>
            </p>
            <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">{s.correct} of {s.total} correct</p>
            <div className="h-2 rounded-full bg-[var(--color-paper-bg-alt)] overflow-hidden">
              <div className="h-full bg-[var(--color-brand-blue)]" style={{ width: `${(s.correct / s.total) * 100}%` }} />
            </div>
          </Card>
        ))}
      </div>

      <div className="flex items-start gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--color-brand-blue)]/5 border border-[var(--color-brand-blue)]/20 text-sm font-[var(--font-inter)] text-[var(--color-ink)]">
        <Info className="w-5 h-5 text-[var(--color-brand-blue)] shrink-0 mt-0.5" />
        <p>
          The score uses a common TOEFL ITP conversion table (310–677), so it is an <strong>estimate</strong> — an official ETS score may differ slightly.
          {weakest && <> The part that needs the most work: <strong>{SKILL_LABEL[weakest.skill]}</strong>.</>}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {onOverview && <Button variant="secondary" onClick={onOverview}><ListChecks className="w-4 h-4" /> Back to overview</Button>}
        <Button href={`/learn/${slug}`}>Back to Course</Button>
      </div>

      {sections.map((sec) => {
        const items = sec.questionIds.map((id) => result.review.find((r) => r.id === id)!).filter(Boolean);
        return (
          <div key={sec.skill} className="space-y-3">
            <h2 className="text-2xl flex items-center gap-2"><SkillIcon skill={sec.skill} className="w-6 h-6" /> Review: {sec.title}</h2>
            <ReviewList items={items} passages={sec.passages} />
          </div>
        );
      })}
    </div>
  );
}
