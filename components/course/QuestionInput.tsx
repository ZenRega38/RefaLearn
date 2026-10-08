"use client";

import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import type { PublicQuestion, Question, Response } from "@/lib/course/types";
import { seedOf, shuffle } from "@/lib/course/grading";

type AnyQuestion = Question | PublicQuestion;
const LETTERS = ["A", "B", "C", "D", "E", "F"];

/** Match items to render, whether or not the key is present. */
function matchSides(q: AnyQuestion): { left: string[]; right: string[] } {
  if ("pairs" in q) {
    return { left: shuffle(q.pairs.map((p) => p[0]), seedOf(q.id)), right: shuffle(q.pairs.map((p) => p[1]), seedOf(q.id + "r")) };
  }
  if ("left" in q) return { left: q.left, right: shuffle(q.right, seedOf(q.id + "r")) };
  return { left: [], right: [] };
}

/** Human-readable correct answer, for feedback and review screens. */
export function answerText(q: Question): string {
  switch (q.type) {
    case "mc": return `${LETTERS[q.answer]}. ${q.options[q.answer]}`;
    case "ms": return q.answers.map((i) => q.options[i]).join(" • ");
    case "fill": return q.accept[0];
    case "order": return q.answer[0].join(" ");
    case "match": return q.pairs.map(([l, r]) => `${l} → ${r}`).join(" • ");
    case "error": {
      const seg = q.segments.find((s) => s.mark === q.answer);
      return `(${q.answer}) “${seg?.text ?? ""}” → ${q.correction}`;
    }
  }
}

/** Is there enough of an answer to submit? */
export function isAnswered(q: AnyQuestion, r: Response | null | undefined): boolean {
  if (!r) return false;
  switch (r.type) {
    case "mc": return true;
    case "ms": return r.choices.length > 0;
    case "fill": return r.text.trim().length > 0;
    case "order": return "tiles" in q ? r.tiles.length === q.tiles.length : false;
    case "match": return r.pairs.length === matchSides(q).left.length;
    case "error": return true;
  }
}

type Props = {
  question: AnyQuestion;
  value: Response | null;
  onChange: (r: Response) => void;
  disabled?: boolean;
  /** After checking: the keyed question, to colour right/wrong choices. */
  reveal?: Question;
};

export function QuestionInput({ question: q, value, onChange, disabled = false, reveal }: Props) {
  switch (q.type) {
    case "mc":
      return <McInput q={q} value={value?.type === "mc" ? value.choice : null} onChange={(choice) => onChange({ type: "mc", choice })} disabled={disabled} reveal={reveal?.type === "mc" ? reveal.answer : undefined} />;
    case "ms":
      return <MsInput q={q} value={value?.type === "ms" ? value.choices : []} onChange={(choices) => onChange({ type: "ms", choices })} disabled={disabled} reveal={reveal?.type === "ms" ? reveal.answers : undefined} />;
    case "fill":
      return <FillInput q={q} value={value?.type === "fill" ? value.text : ""} onChange={(text) => onChange({ type: "fill", text })} disabled={disabled} />;
    case "order":
      return <OrderInput q={q} value={value?.type === "order" ? value.tiles : []} onChange={(tiles) => onChange({ type: "order", tiles })} disabled={disabled} />;
    case "match":
      return <MatchInput q={q} value={value?.type === "match" ? value.pairs : []} onChange={(pairs) => onChange({ type: "match", pairs })} disabled={disabled} reveal={reveal?.type === "match" ? reveal.pairs : undefined} />;
    case "error":
      return <ErrorInput q={q} value={value?.type === "error" ? value.mark : null} onChange={(mark) => onChange({ type: "error", mark })} disabled={disabled} reveal={reveal?.type === "error" ? reveal.answer : undefined} />;
  }
}

// ---------------------------------------------------------------------------

const optionBase = "w-full text-left flex items-start gap-3 p-3 md:p-4 rounded-[var(--radius-sketch)] border-2 transition-all font-[var(--font-inter)] text-sm md:text-base";

function optionClass(selected: boolean, correct: boolean | null) {
  if (correct === true) return `${optionBase} border-[var(--color-success-green)] bg-[var(--color-success-green)]/10`;
  if (correct === false) return `${optionBase} border-[var(--color-danger-red)] bg-[var(--color-danger-red)]/10`;
  return selected
    ? `${optionBase} border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)]/10 shadow-[var(--shadow-sketch)]`
    : `${optionBase} border-[var(--color-line)] bg-white hover:border-[var(--color-brand-blue)]/50`;
}

function McInput({ q, value, onChange, disabled, reveal }: { q: { options: string[] }; value: number | null; onChange: (i: number) => void; disabled: boolean; reveal?: number }) {
  return (
    <div className="space-y-2.5">
      {q.options.map((opt, i) => {
        const correct = reveal === undefined ? null : i === reveal ? true : i === value ? false : null;
        return (
          <button key={i} type="button" disabled={disabled} onClick={() => onChange(i)} className={optionClass(value === i, correct)}>
            <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${value === i ? "bg-[var(--color-brand-blue)] border-[var(--color-brand-blue)] text-white" : "border-[var(--color-line)] text-[var(--color-ink-soft)]"}`}>
              {LETTERS[i]}
            </span>
            <span className="pt-0.5 text-[var(--color-ink)]">{opt}</span>
            {correct === true && <Check className="w-5 h-5 ml-auto text-[var(--color-success-green)] shrink-0" />}
            {correct === false && <X className="w-5 h-5 ml-auto text-[var(--color-danger-red)] shrink-0" />}
          </button>
        );
      })}
    </div>
  );
}

function MsInput({ q, value, onChange, disabled, reveal }: { q: { options: string[] }; value: number[]; onChange: (v: number[]) => void; disabled: boolean; reveal?: number[] }) {
  const toggle = (i: number) => onChange(value.includes(i) ? value.filter((x) => x !== i) : [...value, i]);
  return (
    <div className="space-y-2.5">
      <p className="text-xs font-semibold text-[var(--color-ink-soft)] font-[var(--font-inter)]">Pilih semua yang benar.</p>
      {q.options.map((opt, i) => {
        const selected = value.includes(i);
        const correct = reveal === undefined ? null : reveal.includes(i) ? true : selected ? false : null;
        return (
          <button key={i} type="button" disabled={disabled} onClick={() => toggle(i)} className={optionClass(selected, correct)}>
            <span className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 ${selected ? "bg-[var(--color-brand-blue)] border-[var(--color-brand-blue)] text-white" : "border-[var(--color-line)]"}`}>
              {selected && <Check className="w-4 h-4" />}
            </span>
            <span className="text-[var(--color-ink)]">{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

function FillInput({ q, value, onChange, disabled }: { q: { before: string; after: string }; value: string; onChange: (v: string) => void; disabled: boolean }) {
  return (
    <p className="text-base md:text-lg leading-loose font-[var(--font-inter)] text-[var(--color-ink)]">
      {q.before}{" "}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-label="Jawaban"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        className="inline-block w-40 max-w-full mx-1 px-2 py-1 border-b-2 border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)]/5 rounded-t-md focus:outline-none focus:bg-white text-center font-semibold"
      />{" "}
      {q.after}
    </p>
  );
}

function OrderInput({ q, value, onChange, disabled }: { q: { id: string; tiles: string[] }; value: string[]; onChange: (v: string[]) => void; disabled: boolean }) {
  // Tiles are identified by index so repeated words work.
  const bank = useMemo(() => shuffle(q.tiles.map((t, i) => ({ t, i })), seedOf(q.id)), [q.id, q.tiles]);
  const [placed, setPlaced] = useState<number[]>(() => {
    const used = new Set<number>();
    return value.map((word) => {
      const hit = bank.find((b) => b.t === word && !used.has(b.i));
      if (hit) used.add(hit.i);
      return hit?.i ?? -1;
    }).filter((i) => i >= 0);
  });
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const commit = (next: number[]) => {
    setPlaced(next);
    onChange(next.map((i) => q.tiles[i]));
  };
  const add = (i: number, at?: number) => {
    const without = placed.filter((x) => x !== i);
    const pos = at === undefined ? without.length : Math.min(at, without.length);
    commit([...without.slice(0, pos), i, ...without.slice(pos)]);
  };
  const remove = (i: number) => commit(placed.filter((x) => x !== i));

  const tile = "px-3 py-2 rounded-[var(--radius-sketch)] border-2 border-[var(--color-line)] bg-white font-semibold text-sm md:text-base text-[var(--color-ink)] shadow-[0_2px_0_var(--color-line)] active:translate-y-[1px] select-none";

  return (
    <div className="space-y-4 font-[var(--font-inter)]">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => { if (dragIndex !== null && !disabled) add(dragIndex); setDragIndex(null); }}
        className="min-h-[60px] p-3 flex flex-wrap gap-2 border-b-2 border-dashed border-[var(--color-brand-blue)]/50 bg-[var(--color-brand-blue)]/5 rounded-t-[var(--radius-card)]"
      >
        {placed.length === 0 && <span className="text-sm text-[var(--color-ink-soft)] italic self-center">Ketuk atau seret kata ke sini…</span>}
        {placed.map((i, pos) => (
          <button
            key={i}
            type="button"
            disabled={disabled}
            draggable={!disabled}
            onDragStart={() => setDragIndex(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.stopPropagation(); if (dragIndex !== null && !disabled) add(dragIndex, pos); setDragIndex(null); }}
            onClick={() => remove(i)}
            className={`${tile} border-[var(--color-brand-blue)]`}
          >
            {q.tiles[i]}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {bank.map(({ t, i }) =>
          placed.includes(i) ? (
            <span key={i} className={`${tile} opacity-0 pointer-events-none`}>{t}</span>
          ) : (
            <button key={i} type="button" disabled={disabled} draggable={!disabled} onDragStart={() => setDragIndex(i)} onClick={() => add(i)} className={tile}>
              {t}
            </button>
          )
        )}
      </div>
    </div>
  );
}

const PAIR_COLORS = ["#2B4C7E", "#E8734A", "#4C8C6B", "#D9A441", "#8B5CF6", "#0EA5E9"];

function MatchInput({ q, value, onChange, disabled, reveal }: { q: AnyQuestion; value: [string, string][]; onChange: (v: [string, string][]) => void; disabled: boolean; reveal?: [string, string][] }) {
  const { left, right } = useMemo(() => matchSides(q), [q]);
  const [active, setActive] = useState<string | null>(null);
  const [drag, setDrag] = useState<string | null>(null);

  const pairOf = (l: string) => value.find((p) => p[0] === l);
  const leftOf = (r: string) => value.find((p) => p[1] === r)?.[0];
  const colorOf = (l: string | undefined) => (l === undefined ? undefined : PAIR_COLORS[left.indexOf(l) % PAIR_COLORS.length]);
  const correctPair = (l: string) => (reveal ? reveal.find((p) => p[0] === l)?.[1] : undefined);

  const connect = (l: string, r: string) => {
    onChange([...value.filter((p) => p[0] !== l && p[1] !== r), [l, r]]);
    setActive(null);
  };

  const itemClass = (color: string | undefined, selected: boolean) =>
    `w-full text-left p-3 rounded-[var(--radius-sketch)] border-2 text-sm md:text-base font-[var(--font-inter)] transition-colors ${selected ? "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)]/10" : color ? "bg-white" : "border-[var(--color-line)] bg-white hover:border-[var(--color-brand-blue)]/50"}`;

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-[var(--color-ink-soft)] font-[var(--font-inter)]">Ketuk item kiri lalu pasangannya di kanan (atau seret).</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {left.map((l) => {
            const color = colorOf(pairOf(l) ? l : undefined);
            const wrongPair = reveal && pairOf(l) && correctPair(l) !== pairOf(l)?.[1];
            return (
              <button
                key={l}
                type="button"
                disabled={disabled}
                draggable={!disabled}
                onDragStart={() => setDrag(l)}
                onClick={() => (pairOf(l) && active !== l ? onChange(value.filter((p) => p[0] !== l)) : setActive(active === l ? null : l))}
                className={itemClass(color, active === l)}
                style={color ? { borderColor: wrongPair ? "var(--color-danger-red)" : color } : undefined}
              >
                {l}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {right.map((r) => {
            const l = leftOf(r);
            const color = colorOf(l);
            return (
              <button
                key={r}
                type="button"
                disabled={disabled}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => { if (drag && !disabled) connect(drag, r); setDrag(null); }}
                onClick={() => (active ? connect(active, r) : l ? onChange(value.filter((p) => p[1] !== r)) : undefined)}
                className={itemClass(color, false)}
                style={color ? { borderColor: color, background: `${color}14` } : undefined}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ErrorInput({ q, value, onChange, disabled, reveal }: { q: { segments: { text: string; mark?: "A" | "B" | "C" | "D" }[] }; value: "A" | "B" | "C" | "D" | null; onChange: (m: "A" | "B" | "C" | "D") => void; disabled: boolean; reveal?: "A" | "B" | "C" | "D" }) {
  return (
    <p className="text-base md:text-lg leading-[2.6] font-[var(--font-inter)] text-[var(--color-ink)]">
      {q.segments.map((s, i) => {
        if (!s.mark) return <span key={i}>{s.text}</span>;
        const mark = s.mark;
        const selected = value === mark;
        const state = reveal === undefined ? null : mark === reveal ? "right" : selected ? "wrong" : null;
        return (
          <button
            key={i}
            type="button"
            disabled={disabled}
            onClick={() => onChange(mark)}
            className={`relative inline-flex flex-col items-center mx-0.5 px-1 rounded-md underline underline-offset-4 decoration-2 transition-colors ${state === "right" ? "bg-[var(--color-success-green)]/15 decoration-[var(--color-success-green)]" : state === "wrong" ? "bg-[var(--color-danger-red)]/15 decoration-[var(--color-danger-red)]" : selected ? "bg-[var(--color-brand-blue)]/15 decoration-[var(--color-brand-blue)]" : "decoration-[var(--color-ink)] hover:bg-[var(--color-paper-bg-alt)]"}`}
          >
            <span className="leading-tight">{s.text}</span>
            <span className={`text-[10px] font-bold leading-none mt-0.5 ${selected ? "text-[var(--color-brand-blue)]" : "text-[var(--color-ink-soft)]"}`}>{mark}</span>
          </button>
        );
      })}
    </p>
  );
}
