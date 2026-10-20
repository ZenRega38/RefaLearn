"use client";

import { Card } from "@/components/ui/Card";
import { useCourseText } from "@/components/course/lang";
import type { QuizPart } from "@/lib/course/types";

/** Points per part on a 100-point scale: correct ÷ questions × the part's points. */
export function partScores(parts: QuizPart[], correct: boolean[]) {
  let from = 0;
  const rows = parts.map((p) => {
    const got = correct.slice(from, from + p.count).filter(Boolean).length;
    from += p.count;
    return { ...p, correct: got, earned: (got / p.count) * p.points };
  });
  return { rows, total: Math.round(rows.reduce((n, r) => n + r.earned, 0)) };
}

/** Estimated competition score with a bar per part (e.g. the EAC 100-point paper). */
export function PartScores({ parts, correct }: { parts: QuizPart[]; correct: boolean[] }) {
  const t = useCourseText().attempts;
  const { rows, total } = partScores(parts, correct);
  return (
    <Card className="space-y-4 font-[var(--font-inter)]">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-bold text-[var(--color-ink)]">{t.byPart}</p>
        <p className="text-sm text-[var(--color-ink-soft)]">
          {t.estimated}: <strong className="text-2xl text-[var(--color-brand-blue)] tabular-nums">{total}</strong>/100
        </p>
      </div>
      <ul className="space-y-3">
        {rows.map((r) => (
          <li key={r.label} className="space-y-1">
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="text-[var(--color-ink)] font-semibold">{r.label}</span>
              <span className="text-[var(--color-ink-soft)] tabular-nums">
                {r.correct}/{r.count} · <strong className="text-[var(--color-ink)]">{r.earned.toFixed(1).replace(/\.0$/, "")}</strong>/{r.points}
              </span>
            </div>
            <div className="h-2 rounded-full bg-[var(--color-paper-bg-alt)] overflow-hidden">
              <div className="h-full bg-[var(--color-brand-blue)]" style={{ width: `${(r.correct / r.count) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
