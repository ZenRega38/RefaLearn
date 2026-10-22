"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useCourseText } from "@/components/course/lang";
import { clock, type AttemptState, type AttemptSummary, type RestartInfo } from "@/lib/course/attempt-rules";
import { formatTimestamp } from "@/lib/format";
import { CheckCircle2, Clock, Save, RotateCcw, Coffee, Layers, PlayCircle, Lock, History, Timer, LogOut, CloudOff, Loader2, Check, BookOpen, Circle } from "lucide-react";

// Shared pieces for timed attempts: the overview a student sees before
// starting (rules, attempts, best score, attempt log) and the slim focus
// bar with the countdown while answering.

/** Ticks every `ms` and returns the current time on the server's clock. */
export function useServerNow(offset: number, ms = 1000): number {
  const [now, setNow] = useState(() => Date.now() + offset);
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now() + offset), ms);
    return () => window.clearInterval(id);
  }, [offset, ms]);
  return now;
}

/** Server time minus browser time, so countdowns match the server's deadline. */
export const offsetFrom = (serverNow: string) => Date.parse(serverNow) - Date.now();

function AttemptDots({ used, max }: { used: number; max: number }) {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`w-2.5 h-2.5 rounded-full border-2 ${i < used ? "bg-[var(--color-brand-blue)] border-[var(--color-brand-blue)]" : "border-[var(--color-line)] bg-white"}`} />
      ))}
    </span>
  );
}

export type OverviewProps = {
  questionCount: number;
  minutes: number;
  cooldownMin: number;
  /** Parallel question sets (tryouts). */
  sets?: number;
  state: AttemptState;
  offset: number;
  /** Best result, already formatted (e.g. "32/40 · 80%"), and whether it passed. */
  best: { text: string; passed: boolean | null } | null;
  /** Show "passed / below target" next to the best score. */
  showPass?: boolean;
  /** Extra rule lines shown first (exam format notes). */
  extraRules?: ReactNode[];
  /** Starting over from the lessons once the attempts are used. */
  restart?: RestartInfo;
  restarting?: boolean;
  onRestart?: () => void;
  lessonHref?: (lessonId: string) => string;
  starting: boolean;
  onStart: () => void;
  scoreOf: (a: AttemptSummary) => ReactNode;
  onReview: (a: AttemptSummary) => void;
  children?: ReactNode;
};

/** Before starting: status, best score, rules, the start button and the attempt log. */
export function AttemptOverview(p: OverviewProps) {
  const t = useCourseText().attempts;
  const now = useServerNow(p.offset);
  const { state } = p;
  const done = state.attempts.some((a) => a.submittedAt);
  const cooling = state.cooldownUntil ? Date.parse(state.cooldownUntil) - now : 0;
  const openLeft = state.open ? Date.parse(state.open.deadline) - now : 0;
  const nextNo = (state.attempts.at(-1)?.no ?? 0) + 1;

  let action: ReactNode;
  if (p.restart?.pending) {
    action = (
      <Button size="lg" variant="secondary" disabled>
        <Lock className="w-5 h-5" /> {t.start(nextNo)}
      </Button>
    );
  } else if (state.open && openLeft > 0) {
    action = (
      <Button size="lg" onClick={p.onStart} isLoading={p.starting}>
        <PlayCircle className="w-5 h-5" /> {t.resume} · <span className="tabular-nums">{t.timeLeft(clock(openLeft))}</span>
      </Button>
    );
  } else if (state.left <= 0) {
    action = (
      <div className="text-sm font-[var(--font-inter)] text-[var(--color-ink-soft)] flex items-start gap-2 text-left">
        <Lock className="w-4 h-4 mt-0.5 shrink-0" />
        <span>{t.noneLeft}</span>
      </div>
    );
  } else if (cooling > 0) {
    action = (
      <Button size="lg" variant="secondary" disabled>
        <Coffee className="w-5 h-5" /> <span className="tabular-nums">{t.nextIn(clock(cooling))}</span>
      </Button>
    );
  } else {
    action = (
      <Button size="lg" onClick={p.onStart} isLoading={p.starting}>
        {done ? <RotateCcw className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />} {t.start(nextNo)}
      </Button>
    );
  }

  return (
    <div className="space-y-6">
      <Card variant="sketch" className="space-y-5 p-5 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-3 font-[var(--font-inter)]">
            <div className="flex flex-wrap items-center gap-2">
              {done ? (
                <Badge variant="green"><CheckCircle2 className="w-3.5 h-3.5 mr-1 inline" />{t.completed}</Badge>
              ) : state.open ? (
                <Badge variant="amber">{t.inProgress}</Badge>
              ) : (
                <Badge variant="outline">{t.notStarted}</Badge>
              )}
              {p.best && p.showPass && p.best.passed !== null && (
                <Badge variant={p.best.passed ? "green" : "red"}>{p.best.passed ? t.passed : t.belowTarget}</Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--color-ink-soft)]">
              <span className="flex items-center gap-1.5"><Layers className="w-4 h-4" /> {t.questions(p.questionCount)}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {t.minutes(p.minutes)}</span>
              {!state.unlimited && (
                <span className="flex items-center gap-2"><AttemptDots used={Math.min(state.used, state.max)} max={state.max} /> {t.used(Math.min(state.used, state.max), state.max)}</span>
              )}
            </div>
          </div>
          {p.best && (
            <div className="sm:text-right font-[var(--font-inter)] shrink-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-soft)]">{t.bestScore}</p>
              <p className="text-3xl font-bold text-[var(--color-brand-blue)] tabular-nums">{p.best.text}</p>
            </div>
          )}
        </div>

        <div className="rounded-[var(--radius-card)] bg-[var(--color-paper-bg-alt)]/70 border border-dashed border-[var(--color-line)] p-4 space-y-2 font-[var(--font-inter)] text-sm text-[var(--color-ink)]">
          <p className="font-bold">{t.rulesTitle}</p>
          <ul className="space-y-1.5">
            {p.extraRules?.map((r, i) => (
              <li key={i} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-brand-blue)]" /><span>{r}</span></li>
            ))}
            <li className="flex items-start gap-2"><Timer className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-accent-coral)]" /><span>{t.ruleTimer(p.minutes)}</span></li>
            <li className="flex items-start gap-2"><Save className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-success-green)]" /><span>{t.ruleSave}</span></li>
            {state.unlimited ? (
              <li className="flex items-start gap-2"><RotateCcw className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-brand-blue)]" /><span>{t.adminPreview}</span></li>
            ) : (
              <>
                <li className="flex items-start gap-2"><RotateCcw className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-brand-blue)]" /><span>{t.ruleLimit(state.max)}</span></li>
                <li className="flex items-start gap-2"><Coffee className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-warning-amber)]" /><span>{t.ruleBreak(p.cooldownMin)}</span></li>
              </>
            )}
            {p.sets && p.sets > 1 && (
              <li className="flex items-start gap-2"><Layers className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-brand-blue)]" /><span>{t.ruleSets(p.sets)}</span></li>
            )}
          </ul>
        </div>

        {p.children}

        {p.restart?.pending && (
          <div className="rounded-[var(--radius-card)] border-2 border-[var(--color-brand-blue)]/30 bg-[var(--color-brand-blue)]/5 p-4 space-y-3 font-[var(--font-inter)] text-sm">
            <p className="font-semibold text-[var(--color-ink)] flex items-center gap-2"><BookOpen className="w-4 h-4 text-[var(--color-brand-blue)]" /> {t.studyAgain}</p>
            <ol className="space-y-1.5">
              {p.restart.lessons.map((l) => (
                <li key={l.id} className="flex items-center gap-2">
                  {l.done ? <CheckCircle2 className="w-4 h-4 text-[var(--color-success-green)] shrink-0" /> : <Circle className="w-4 h-4 text-[var(--color-line)] shrink-0" />}
                  {p.lessonHref && !l.done ? (
                    <Link href={p.lessonHref(l.id)} className="text-[var(--color-brand-blue)] hover:underline">{l.title}</Link>
                  ) : (
                    <span className={l.done ? "text-[var(--color-ink-soft)]" : "text-[var(--color-ink)]"}>{l.title}</span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}

        {p.restart?.available && (
          <div className="rounded-[var(--radius-card)] border-2 border-dashed border-[var(--color-accent-coral)]/50 bg-[var(--color-accent-coral)]/5 p-4 space-y-3 font-[var(--font-inter)] text-sm">
            <p className="font-semibold text-[var(--color-ink)] flex items-center gap-2"><RotateCcw className="w-4 h-4 text-[var(--color-accent-coral)]" /> {t.restartTitle}</p>
            <p className="text-[var(--color-ink-soft)]">{t.restartHint(state.max)}</p>
            <div className="flex justify-end">
              <Button variant="secondary" onClick={p.onRestart} isLoading={p.restarting}>
                <BookOpen className="w-4 h-4" /> {t.restartButton}
              </Button>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">
            {!state.unlimited && state.left > 0 && !state.open && t.left(state.left)}
          </span>
          {action}
        </div>
      </Card>

      {state.attempts.length > 0 && <AttemptLog attempts={state.attempts} scoreOf={p.scoreOf} onReview={p.onReview} />}
    </div>
  );
}

/** Every attempt with its date, time used, score and a link to its review. */
export function AttemptLog({ attempts, scoreOf, onReview }: { attempts: AttemptSummary[]; scoreOf: (a: AttemptSummary) => ReactNode; onReview: (a: AttemptSummary) => void }) {
  const t = useCourseText().attempts;
  return (
    <div className="space-y-3">
      <h2 className="text-2xl flex items-center gap-2"><History className="w-6 h-6 text-[var(--color-brand-blue)]" /> {t.log}</h2>
      <Card className="p-0 overflow-hidden">
        <ul className="divide-y divide-[var(--color-line)] font-[var(--font-inter)]">
          {[...attempts].reverse().map((a) => (
            <li key={a.id} className={`flex items-center gap-3 p-3 sm:p-4 ${a.counted ? "" : "opacity-70"}`}>
              <span className="w-9 h-9 rounded-full border-2 border-[var(--color-line)] flex items-center justify-center text-sm font-bold text-[var(--color-ink-soft)] shrink-0">{a.no}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--color-ink)]">
                  {t.attempt(a.no)}
                  {a.autoSubmitted && <span className="ml-2 text-xs font-normal text-[var(--color-accent-coral)]">· {t.auto}</span>}
                  {!a.counted && <span className="ml-2 text-xs font-normal text-[var(--color-ink-soft)]">· {t.reset}</span>}
                </p>
                <p className="text-xs text-[var(--color-ink-soft)]">
                  {formatTimestamp(a.startedAt, "dd MMM yyyy, HH:mm", "en")}
                  {a.submittedAt ? ` · ${t.duration(clock(Date.parse(a.submittedAt) - Date.parse(a.startedAt)))}` : ` · ${t.inProgress}`}
                </p>
              </div>
              <div className="text-sm text-right shrink-0">{a.submittedAt ? scoreOf(a) : null}</div>
              {a.submittedAt && (
                <Button size="sm" variant="ghost" onClick={() => onReview(a)} className="shrink-0">{t.review}</Button>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export type SaveState = "idle" | "saving" | "saved" | "error";

/**
 * The bar pinned to the top in focus mode: what is being answered, how
 * many are done, the countdown, autosave status and a way out.
 */
export function FocusBar({
  title,
  detail,
  deadline,
  offset,
  totalMs,
  save,
  onExit,
  showTimer = true,
}: {
  title: string;
  detail?: ReactNode;
  deadline: number;
  offset: number;
  totalMs: number;
  save?: SaveState;
  onExit: () => void;
  showTimer?: boolean;
}) {
  const t = useCourseText().attempts;
  const [questionsMounted, setQuestionsMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setQuestionsMounted(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const timerActive = showTimer && questionsMounted;
  const now = useServerNow(offset, timerActive ? 250 : 100000);
  const left = deadline - now;
  const pct = Math.max(0, Math.min(100, (left / totalMs) * 100));
  const tone = left <= 60_000 ? "text-[var(--color-danger-red)]" : left <= 5 * 60_000 ? "text-[var(--color-accent-coral)]" : "text-[var(--color-ink)]";

  return (
    <div className="sticky top-0 z-40 -mx-4 px-4 bg-[var(--color-paper-bg)]/95 backdrop-blur border-b border-[var(--color-line)] font-[var(--font-inter)]">
      <div className="flex items-center justify-between gap-3 py-3">
        <div className="min-w-0">
          <p className="font-semibold text-[var(--color-ink)] truncate">{title}</p>
          {detail && <p className="text-xs text-[var(--color-ink-soft)] truncate">{detail}</p>}
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {save && save !== "idle" && (
            <span className={`hidden sm:flex items-center gap-1 text-xs ${save === "error" ? "text-[var(--color-danger-red)]" : "text-[var(--color-ink-soft)]"}`}>
              {save === "saving" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : save === "saved" ? <Check className="w-3.5 h-3.5 text-[var(--color-success-green)]" /> : <CloudOff className="w-3.5 h-3.5" />}
              {save === "saving" ? t.saving : save === "saved" ? t.saved : t.notSaved}
            </span>
          )}
          {timerActive && (
            <span className={`flex items-center gap-1 font-bold tabular-nums text-lg ${tone} ${left <= 10_000 ? "animate-pulse" : ""}`} aria-live="off">
              <Clock className="w-4 h-4" /> {clock(left)}
            </span>
          )}
          <button
            type="button"
            onClick={onExit}
            className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] px-2 py-1.5 rounded-md hover:bg-[var(--color-paper-bg-alt)]"
          >
            <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">{t.exit}</span>
          </button>
        </div>
      </div>
      <div className="h-1 -mx-4 bg-[var(--color-paper-bg-alt)]">
        {timerActive && (
          <div className={`h-full transition-[width] duration-300 ease-linear ${left <= 60_000 ? "bg-[var(--color-danger-red)]" : "bg-[var(--color-accent-coral)]"}`} style={{ width: `${pct}%` }} />
        )}
      </div>
    </div>
  );
}
