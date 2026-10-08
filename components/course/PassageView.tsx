import type { Passage } from "@/lib/course/types";

/** Reading passage with ITP-style line numbers (every 5th line). */
export function PassageView({ passage, compact = false }: { passage: Passage; compact?: boolean }) {
  return (
    <div className={`bg-white border border-[var(--color-line)] rounded-[var(--radius-card)] ${compact ? "p-4" : "p-5 md:p-6"} font-[var(--font-inter)]`}>
      {passage.title && <h4 className="font-bold text-[var(--color-ink)] mb-3">{passage.title}</h4>}
      <div className="text-[15px] leading-7 text-[var(--color-ink)]">
        {passage.lines.map((line, i) => (
          <div key={i} className="flex gap-3">
            <span className="w-6 shrink-0 text-right text-xs leading-7 text-[var(--color-ink-soft)] select-none">
              {(i + 1) % 5 === 0 || i === 0 ? i + 1 : ""}
            </span>
            <span>{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
