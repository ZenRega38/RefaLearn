import type { Passage } from "@/lib/course/types";
import { Picture } from "@/components/course/pictures";

/** Reading passage with ITP-style line numbers (every 5th line). */
export function PassageView({ passage, compact = false }: { passage: Passage; compact?: boolean }) {
  return (
    <div className={`bg-white border border-[var(--color-line)] rounded-[var(--radius-card)] ${compact ? "p-4" : "p-5 md:p-6"} font-[var(--font-inter)]`}>
      {(passage.title || passage.pic) && (
        <div className="flex items-center gap-3 mb-3">
          {passage.pic && <Picture name={passage.pic} className={compact ? "w-14 h-14 shrink-0" : "w-20 h-20 shrink-0"} />}
          {passage.title && <h4 className="font-bold text-[var(--color-ink)]">{passage.title}</h4>}
        </div>
      )}
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
