"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Trophy, Flag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Passage, Question, Response } from "@/lib/course/types";
import { isCorrect } from "@/lib/course/grading";
import { QuestionBlock } from "@/components/course/QuestionBlock";
import { answerText, isAnswered } from "@/components/course/QuestionInput";
import { Md } from "@/components/course/Md";
import { Picture } from "@/components/course/pictures";

/**
 * Duolingo-style mini quiz: one question at a time, instant feedback, and
 * every wrong answer comes back at the end until it's answered correctly.
 */
export function Checkpoint({
  title,
  questions,
  passages = [],
  onComplete,
  completing = false,
  mascot,
}: {
  title: string;
  questions: Question[];
  passages?: Passage[];
  onComplete: (stats: { firstTry: number; total: number }) => void;
  completing?: boolean;
  /** Picture family (e.g. "owl") that reacts to answers; trophy/icons when absent. */
  mascot?: string;
}) {
  const [queue, setQueue] = useState<Question[]>(questions);
  const [round, setRound] = useState(0);
  const [response, setResponse] = useState<Response | null>(null);
  const [checked, setChecked] = useState<null | boolean>(null);
  const [cleared, setCleared] = useState<Set<string>>(new Set());
  const [missed, setMissed] = useState<Set<string>>(new Set());

  const current = queue[0];
  const finished = !current;
  const progress = Math.round((cleared.size / questions.length) * 100);

  const check = () => {
    if (!current) return;
    const ok = isCorrect(current, response);
    setChecked(ok);
    if (ok) setCleared((s) => new Set(s).add(current.id));
    else setMissed((s) => new Set(s).add(current.id));
  };

  const next = () => {
    if (!current) return;
    setQueue(([head, ...rest]) => (checked ? rest : [...rest, head]));
    setResponse(null);
    setChecked(null);
    setRound((r) => r + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Flag className="w-5 h-5 text-[var(--color-accent-coral)] shrink-0" />
        <h3 className="font-bold font-[var(--font-inter)] text-[var(--color-ink)]">{title}</h3>
        <div className="flex-1 h-3 rounded-full bg-[var(--color-paper-bg-alt)] border border-[var(--color-line)] overflow-hidden">
          <div className="h-full bg-[var(--color-success-green)] transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-xs font-semibold text-[var(--color-ink-soft)] font-[var(--font-inter)]">
          {cleared.size}/{questions.length}
        </span>
      </div>

      {finished ? (
        <div className="text-center py-8 space-y-4">
          {mascot ? <Picture name={`${mascot}-cheer`} className="w-32 h-32 mx-auto" /> : <Trophy className="w-14 h-14 mx-auto text-[var(--color-accent-yellow)]" />}
          <h4 className="text-2xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">Checkpoint selesai!</h4>
          <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">
            Benar di percobaan pertama: <strong>{questions.length - missed.size}/{questions.length}</strong>
          </p>
          <Button onClick={() => onComplete({ firstTry: questions.length - missed.size, total: questions.length })} isLoading={completing}>
            Lanjut
          </Button>
        </div>
      ) : (
        <>
          {missed.has(current.id) && checked === null && (
            <p className="text-xs font-semibold text-[var(--color-accent-coral)] font-[var(--font-inter)]">Coba lagi soal ini 💪</p>
          )}
          <QuestionBlock
            key={`${current.id}-${round}`}
            question={current}
            passages={passages}
            value={response}
            onChange={setResponse}
            disabled={checked !== null}
            reveal={checked === null ? undefined : current}
            showTranscript={checked !== null}
          />

          {checked === null ? (
            <div className="flex justify-end">
              <Button onClick={check} disabled={!isAnswered(current, response)}>Periksa</Button>
            </div>
          ) : (
            <div
              className={`rounded-[var(--radius-card)] p-4 border-2 font-[var(--font-inter)] ${checked ? "bg-[var(--color-success-green)]/10 border-[var(--color-success-green)]" : "bg-[var(--color-danger-red)]/10 border-[var(--color-danger-red)]"}`}
            >
              <div className="flex items-start gap-3">
                {mascot ? (
                  <Picture name={checked ? `${mascot}-cheer` : `${mascot}-think`} className="w-16 h-16 shrink-0 -my-1" />
                ) : checked ? (
                  <CheckCircle2 className="w-6 h-6 text-[var(--color-success-green)] shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-[var(--color-danger-red)] shrink-0" />
                )}
                <div className="flex-1 space-y-1 text-sm text-[var(--color-ink)]">
                  <p className={`font-bold ${checked ? "text-[var(--color-success-green)]" : "text-[var(--color-danger-red)]"}`}>
                    {checked ? "Benar!" : "Belum tepat."}
                  </p>
                  {!checked && (
                    <p>
                      Jawaban: <strong>{answerText(current)}</strong>
                    </p>
                  )}
                  <Md text={current.explanation} />
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <Button onClick={next}>{checked ? "Lanjut" : "Mengerti"}</Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
