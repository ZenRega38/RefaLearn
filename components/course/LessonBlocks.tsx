"use client";

import { useState } from "react";
import { Lightbulb, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import type { Block, Question, Response } from "@/lib/course/types";
import { isCorrect } from "@/lib/course/grading";
import { Md } from "@/components/course/Md";
import { AudioPlayer } from "@/components/course/AudioPlayer";
import { PassageView } from "@/components/course/PassageView";
import { QuestionBlock } from "@/components/course/QuestionBlock";
import { answerText, isAnswered } from "@/components/course/QuestionInput";
import { Button } from "@/components/ui/Button";
import { speak, speechSupported } from "@/components/course/speech";

/** Inline "Coba sekarang" question inside the lesson material. */
function TryIt({ question }: { question: Question }) {
  const [response, setResponse] = useState<Response | null>(null);
  const [checked, setChecked] = useState<boolean | null>(null);
  const [round, setRound] = useState(0);

  return (
    <div className="rounded-[var(--radius-card)] border-2 border-dashed border-[var(--color-accent-coral)]/60 bg-white p-4 md:p-5 space-y-4">
      <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-coral)] font-[var(--font-inter)]">Coba sekarang</p>
      <QuestionBlock
        key={round}
        question={question}
        value={response}
        onChange={setResponse}
        disabled={checked !== null}
        reveal={checked === null ? undefined : question}
        showTranscript={checked !== null}
      />
      {checked === null ? (
        <div className="flex justify-end">
          <Button size="sm" onClick={() => setChecked(isCorrect(question, response))} disabled={!isAnswered(question, response)}>Periksa</Button>
        </div>
      ) : (
        <div className={`rounded-[var(--radius-sketch)] p-3 text-sm font-[var(--font-inter)] ${checked ? "bg-[var(--color-success-green)]/10" : "bg-[var(--color-danger-red)]/10"}`}>
          <p className={`font-bold flex items-center gap-1.5 ${checked ? "text-[var(--color-success-green)]" : "text-[var(--color-danger-red)]"}`}>
            {checked ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />} {checked ? "Tepat!" : `Jawaban: ${answerText(question)}`}
          </p>
          <div className="mt-1 text-[var(--color-ink)]"><Md text={question.explanation} /></div>
          {!checked && (
            <button className="mt-2 text-xs font-semibold text-[var(--color-brand-blue)] underline" onClick={() => { setChecked(null); setResponse(null); setRound((r) => r + 1); }}>
              Coba lagi
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/** Picture-word cards: tap to hear the English word (and its example). */
function VocabCards({ title, items }: { title?: string; items: { emoji: string; word: string; meaning: string; example?: string }[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [canSpeak] = useState(() => speechSupported());

  const say = (word: string, example?: string) => {
    if (!canSpeak) return;
    setActive(word);
    const h = speak([{ speaker: "woman", text: word }, ...(example ? [{ speaker: "woman" as const, text: example }] : [])]);
    h.done.then(() => setActive((a) => (a === word ? null : a)));
  };

  return (
    <div className="space-y-2">
      {title && <p className="text-sm font-bold text-[var(--color-ink)]">{title}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {items.map((it) => (
          <button
            key={it.word}
            type="button"
            onClick={() => say(it.word, it.example)}
            className={`text-left rounded-[var(--radius-card)] border-2 bg-white p-3 transition-all hover:-translate-y-0.5 ${active === it.word ? "border-[var(--color-accent-coral)] shadow-[var(--shadow-sketch)]" : "border-[var(--color-line)]"}`}
          >
            <span className="block text-4xl leading-none mb-2" aria-hidden>{it.emoji}</span>
            <span className="block font-bold text-[var(--color-brand-blue)] text-base">{it.word} {canSpeak && <span className="text-xs">🔊</span>}</span>
            <span className="block text-xs text-[var(--color-ink-soft)]">{it.meaning}</span>
            {it.example && <span className="block text-xs text-[var(--color-ink)] italic mt-1">“{it.example}”</span>}
          </button>
        ))}
      </div>
      {canSpeak && <p className="text-xs text-[var(--color-ink-soft)]">Ketuk kartu untuk mendengar cara mengucapkannya.</p>}
    </div>
  );
}

export function LessonBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5 font-[var(--font-inter)] text-[var(--color-ink)] text-[15px] md:text-base leading-relaxed">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "text":
            return <Md key={i} text={b.md} />;
          case "tip":
            return (
              <div key={i} className="flex gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--color-accent-yellow)]/15 border border-[var(--color-accent-yellow)]">
                <Lightbulb className="w-5 h-5 text-[var(--color-warning-amber)] shrink-0 mt-0.5" />
                <Md text={b.md} />
              </div>
            );
          case "warning":
            return (
              <div key={i} className="flex gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--color-danger-red)]/10 border border-[var(--color-danger-red)]/40">
                <AlertTriangle className="w-5 h-5 text-[var(--color-danger-red)] shrink-0 mt-0.5" />
                <Md text={b.md} />
              </div>
            );
          case "examples":
            return (
              <div key={i} className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white overflow-hidden">
                {b.title && <p className="px-4 py-2 bg-[var(--color-paper-bg-alt)] text-sm font-bold">{b.title}</p>}
                <ul className="divide-y divide-[var(--color-line)]">
                  {b.items.map((it, j) => (
                    <li key={j} className="px-4 py-3 space-y-1 text-sm">
                      {it.wrong && <p className="flex gap-2 text-[var(--color-danger-red)]"><XCircle className="w-4 h-4 shrink-0 mt-0.5" /><span className="line-through decoration-1"><Md text={it.wrong} /></span></p>}
                      {it.right && <p className="flex gap-2 text-[var(--color-ink)]">{it.wrong && <CheckCircle2 className="w-4 h-4 text-[var(--color-success-green)] shrink-0 mt-0.5" />}<span><Md text={it.right} /></span></p>}
                      {it.note && <p className="text-xs text-[var(--color-ink-soft)] italic">{it.note}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-paper-bg-alt)]">
                      {b.head.map((h) => <th key={h} className="text-left p-3 font-semibold border-b border-[var(--color-line)]">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r} className="border-b border-[var(--color-line)] last:border-0">
                        {row.map((cell, c) => <td key={c} className="p-3 align-top">{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "audio":
            return <AudioPlayer key={i} script={b.script} caption={b.caption} allowTranscript={b.showTranscript} />;
          case "passage":
            return <PassageView key={i} passage={b.passage} />;
          case "try":
            return <TryIt key={i} question={b.question} />;
          case "vocab":
            return <VocabCards key={i} title={b.title} items={b.items} />;
        }
      })}
    </div>
  );
}
