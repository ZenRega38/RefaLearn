"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ChevronDown } from "lucide-react";
import type { Passage, Question, Response } from "@/lib/course/types";
import { QuestionBlock } from "@/components/course/QuestionBlock";
import { answerText } from "@/components/course/QuestionInput";
import { Md } from "@/components/course/Md";

export type ReviewItem = { id: string; correct: boolean; response: Response | null; question: Question };

/** Expandable answer review with keys and explanations. */
export function ReviewList({ items, passages = [], numberFrom = 1 }: { items: ReviewItem[]; passages?: Passage[]; numberFrom?: number }) {
  const [open, setOpen] = useState<string | null>(null);
  const [onlyWrong, setOnlyWrong] = useState(false);
  const shown = items.map((item, i) => ({ item, n: numberFrom + i })).filter(({ item }) => !onlyWrong || !item.correct);

  return (
    <div className="space-y-3 font-[var(--font-inter)]">
      <label className="flex items-center gap-2 text-sm text-[var(--color-ink-soft)] cursor-pointer">
        <input type="checkbox" checked={onlyWrong} onChange={(e) => setOnlyWrong(e.target.checked)} /> Tampilkan hanya yang salah
      </label>
      {shown.map(({ item, n }) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id} className="bg-white border border-[var(--color-line)] rounded-[var(--radius-card)] overflow-hidden">
            <button onClick={() => setOpen(isOpen ? null : item.id)} className="w-full flex items-center gap-3 p-3 text-left hover:bg-[var(--color-paper-bg-alt)]/60">
              {item.correct ? <CheckCircle2 className="w-5 h-5 text-[var(--color-success-green)] shrink-0" /> : <XCircle className="w-5 h-5 text-[var(--color-danger-red)] shrink-0" />}
              <span className="text-sm font-semibold text-[var(--color-ink)] w-8">{n}.</span>
              <span className="text-sm text-[var(--color-ink-soft)] flex-1 truncate">
                {item.response ? (item.correct ? "Benar" : "Salah") : "Tidak dijawab"} · Kunci: {answerText(item.question)}
              </span>
              <ChevronDown className={`w-4 h-4 text-[var(--color-ink-soft)] transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && (
              <div className="p-4 border-t border-dashed border-[var(--color-line)] space-y-4">
                <QuestionBlock question={item.question} passages={passages} value={item.response} onChange={() => {}} disabled reveal={item.question} showTranscript />
                <div className="rounded-[var(--radius-sketch)] bg-[var(--color-paper-bg-alt)] p-3 text-sm text-[var(--color-ink)]">
                  <p className="font-bold mb-1">Pembahasan</p>
                  <Md text={item.question.explanation} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
