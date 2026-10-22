"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { QuestionBlock } from "@/components/course/QuestionBlock";
import { isAnswered } from "@/components/course/QuestionInput";
import { ReviewList, type ReviewItem } from "@/components/course/ReviewList";
import { AttemptOverview, FocusBar, offsetFrom, type SaveState } from "@/components/course/attempts";
import { PartScores } from "@/components/course/PartScores";
import { Picture } from "@/components/course/pictures";
import { useCourseText } from "@/components/course/lang";
import type { Passage, PublicQuestion, QuizPart, Response } from "@/lib/course/types";
import type { AttemptState, AttemptSummary, RestartInfo } from "@/lib/course/attempt-rules";
import { useFocusMode } from "@/lib/focus-mode";
import { ArrowLeft, ArrowRight, RefreshCw, Trophy, ClipboardCheck, Target, AlertTriangle, ListChecks } from "lucide-react";
import { announceXp } from "@/lib/gamification";

type Overview = {
  isPretest: boolean;
  mascot: string | null;
  /** Self-paced course: the quiz has a target, not a gate. */
  openOrder: boolean;
  quiz: { id: string; title: string; passPercent: number; questionCount: number; sets: number; parts: QuizPart[] | null };
  level: { id: string; title: string };
  timeLimitSec: number;
  cooldownMin: number;
  best: { score: number | null; maxScore: number | null; passed: boolean } | null;
  state: AttemptState;
  restart: RestartInfo;
};
type Run = { attemptId: string; no: number; startedAt: number; deadline: number; questions: PublicQuestion[]; passages: Passage[] };
type Result = {
  attemptId: string;
  attemptNo: number;
  score: number;
  max: number;
  passed: boolean;
  isPretest: boolean;
  passPercent: number;
  autoSubmitted: boolean;
  review: ReviewItem[];
  passages: Passage[];
};
type Phase = "loading" | "overview" | "running" | "submitting" | "result" | "error";

const pct = (s: number | null, m: number | null) => (s !== null && m ? Math.round((s / m) * 100) : 0);

export default function LevelQuizPage() {
  const { slug, quizId } = useParams<{ slug: string; quizId: string }>();
  const router = useRouter();
  const t = useCourseText();
  const a = t.attempts;
  const api = `/api/courses/${slug}/quiz/${quizId}`;

  const [phase, setPhase] = useState<Phase>("loading");
  const [error, setError] = useState<string | null>(null);
  const [overview, setOverview] = useState<Overview | null>(null);
  const [offset, setOffset] = useState(0);
  const [starting, setStarting] = useState(false);
  const [restarting, setRestarting] = useState(false);
  const [run, setRun] = useState<Run | null>(null);
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, Response | null>>({});
  const [save, setSave] = useState<SaveState>("idle");
  const [timeUp, setTimeUp] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  useFocusMode(phase === "running" || phase === "submitting");

  const loadOverview = useCallback(async () => {
    try {
      const res = await fetch(api, { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setOverview(json);
      setOffset(offsetFrom(json.state.serverNow));
      return json as Overview;
    } catch (err) {
      setError(err instanceof Error ? err.message : a.startFailed);
      setPhase("error");
      return null;
    }
  }, [api, a.startFailed]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [index, phase]);

  // ---------------------------------------------------------------- autosave
  const latest = useRef(responses);
  const dirty = useRef(false);
  const submittingRef = useRef(false);

  const saveNow = useCallback(
    async (keepalive = false) => {
      if (!run || !dirty.current || submittingRef.current) return;
      dirty.current = false;
      setSave("saving");
      try {
        const res = await fetch(api, {
          method: "POST",
          keepalive,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "save", attemptId: run.attemptId, responses: latest.current }),
        });
        if (!res.ok) throw new Error();
        setSave("saved");
      } catch {
        dirty.current = true;
        setSave("error");
      }
    },
    [api, run]
  );

  const answer = (id: string, r: Response) => {
    setResponses((prev) => {
      const next = { ...prev, [id]: r };
      latest.current = next;
      return next;
    });
    dirty.current = true;
  };

  // Save a moment after the last change, and right away when the tab is hidden.
  useEffect(() => {
    if (phase !== "running" || !dirty.current) return;
    const id = window.setTimeout(() => saveNow(), 1200);
    return () => window.clearTimeout(id);
  }, [responses, phase, saveNow]);
  useEffect(() => {
    if (phase !== "running") return;
    const onHide = () => document.visibilityState === "hidden" && saveNow(true);
    const retry = window.setInterval(() => saveNow(), 20_000);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.clearInterval(retry);
    };
  }, [phase, saveNow]);

  // ------------------------------------------------------------- start/submit
  const start = useCallback(async () => {
    setStarting(true);
    try {
      const res = await fetch(api, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "start" }) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setOffset(offsetFrom(json.serverNow));
      setRun({
        attemptId: json.attempt.id,
        no: json.attempt.no,
        startedAt: Date.parse(json.attempt.startedAt),
        deadline: Date.parse(json.attempt.deadline),
        questions: json.questions,
        passages: json.passages,
      });
      latest.current = json.draft || {};
      dirty.current = false;
      submittingRef.current = false;
      setResponses(json.draft || {});
      setIndex(0);
      setSave("idle");
      setTimeUp(false);
      setPhase("running");
    } catch (err) {
      alert(err instanceof Error ? err.message : a.startFailed);
      loadOverview();
    } finally {
      setStarting(false);
    }
  }, [api, a.startFailed, loadOverview]);

  useEffect(() => {
    loadOverview().then((o) => {
      if (!o) return;
      setPhase("overview");
    });
  }, [loadOverview]);

  const submit = useCallback(
    async (auto: boolean) => {
      if (!run || submittingRef.current) return;
      if (!auto) {
        const blank = run.questions.filter((x) => !isAnswered(x, latest.current[x.id])).length;
        if (blank > 0 && !window.confirm(t.confirmBlank(blank))) return;
      }
      submittingRef.current = true;
      setTimeUp(auto);
      setPhase("submitting");
      try {
        const res = await fetch(api, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "submit", attemptId: run.attemptId, responses: latest.current }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        setResult(json.result);
        announceXp(json.xp, json.result.isPretest ? t.xp.pretestDone : json.result.passed ? t.xp.quizPassed : t.xp.quizDone);
        setPhase("result");
        loadOverview();
      } catch (err) {
        submittingRef.current = false;
        if (auto) {
          // The server submits it from the last autosave once the deadline passes.
          setError(err instanceof Error ? err.message : t.submitFailed);
          setPhase("error");
        } else {
          alert(err instanceof Error ? err.message : t.submitFailed);
          setPhase("running");
        }
      }
    },
    [api, run, t, loadOverview]
  );

  // Time's up: submit whatever is answered.
  useEffect(() => {
    if (phase !== "running" || !run) return;
    const id = window.setInterval(() => {
      if (Date.now() + offset >= run.deadline) submit(true);
    }, 500);
    return () => window.clearInterval(id);
  }, [phase, run, offset, submit]);

  const exit = () => {
    if (!window.confirm(a.exitConfirm)) return;
    dirty.current = true;
    saveNow(true).finally(() => router.push(`/learn/${slug}`));
  };

  // Out of attempts: back to the first lesson of the chapter, to study it all again.
  const restart = async () => {
    if (!window.confirm(a.restartConfirm)) return;
    setRestarting(true);
    try {
      const res = await fetch(api, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "restart" }) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      router.push(json.firstLesson ? `/learn/${slug}/lesson/${json.firstLesson}` : `/learn/${slug}`);
    } catch (err) {
      alert(err instanceof Error ? err.message : a.restartFailed);
      setRestarting(false);
    }
  };

  const review = async (attempt: AttemptSummary) => {
    setPhase("loading");
    try {
      const res = await fetch(`${api}?attemptId=${attempt.id}`, { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setResult(json.result);
      setPhase("result");
    } catch (err) {
      alert(err instanceof Error ? err.message : a.startFailed);
      setPhase("overview");
    }
  };

  // ------------------------------------------------------------------- views
  if (phase === "error" || phase === "loading" || !overview) {
    return (
      <PaperBackground className="pt-24 pb-20 min-h-screen">
        <div className="container-main max-w-2xl mx-auto text-center py-20 space-y-4 font-[var(--font-inter)]">
          {phase === "error" ? (
            <>
              <p className="text-[var(--color-danger-red)]">{error}</p>
              <Button href={`/learn/${slug}`} variant="secondary">{t.backToCourse}</Button>
            </>
          ) : (
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[var(--color-brand-blue)]" />
          )}
        </div>
      </PaperBackground>
    );
  }

  const { quiz } = overview;
  const Icon = overview.isPretest ? Target : ClipboardCheck;

  if (phase === "running" || phase === "submitting") {
    if (!run || !run.questions || run.questions.length === 0) {
      return (
        <PaperBackground className="pb-20 min-h-screen">
          <div className="container-main max-w-4xl mx-auto py-20 text-center font-[var(--font-inter)]">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-[var(--color-brand-blue)]" />
          </div>
        </PaperBackground>
      );
    }

    const currentIndex = Math.max(0, Math.min(index, run.questions.length - 1));
    const q = run.questions[currentIndex];
    const answered = run.questions.filter((x) => isAnswered(x, responses[x.id])).length;
    return (
      <PaperBackground className="pb-20 min-h-screen">
        <div className="container-main max-w-4xl mx-auto space-y-5">
          <FocusBar
            title={quiz.title}
            detail={`${a.attempt(run.no)} · ${t.questionOf(currentIndex + 1, run.questions.length)} · ${answered}/${run.questions.length}`}
            deadline={run.deadline}
            offset={offset}
            totalMs={run.deadline - run.startedAt}
            save={save}
            onExit={exit}
          />

          {phase === "submitting" ? (
            <Card variant="sketch" className="text-center py-14 space-y-3 font-[var(--font-inter)]">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[var(--color-brand-blue)]" />
              <p className="text-[var(--color-ink)] font-semibold">{timeUp ? a.timeUpSubmitting : a.submitting}</p>
            </Card>
          ) : (
            <>
              {/* Question navigator */}
              <div className="flex flex-wrap gap-1.5">
                {run.questions.map((x, i) => (
                  <button
                    key={x.id}
                    onClick={() => setIndex(i)}
                    aria-label={t.questionOf(i + 1, run.questions.length)}
                    className={`w-9 h-9 rounded-md text-sm font-semibold font-[var(--font-inter)] border-2 ${i === currentIndex ? "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)] text-white" : isAnswered(x, responses[x.id]) ? "border-[var(--color-brand-blue)]/40 bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)]" : "border-[var(--color-line)] bg-white text-[var(--color-ink-soft)]"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              {q ? (
                <Card variant="sketch" className="p-5 md:p-8 space-y-4">
                  <p className="text-xs font-semibold text-[var(--color-ink-soft)] font-[var(--font-inter)]">{t.questionOf(currentIndex + 1, run.questions.length)}</p>
                  <QuestionBlock
                    key={`${run.attemptId}-${q.id}`}
                    question={q}
                    passages={run.passages}
                    value={responses[q.id] ?? null}
                    onChange={(r) => answer(q.id, r)}
                  />
                </Card>
              ) : null}

              <div className="flex justify-between gap-3">
                <Button variant="ghost" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={currentIndex === 0}>
                  <ArrowLeft className="w-4 h-4" /> {t.previous}
                </Button>
                {currentIndex < run.questions.length - 1 ? (
                  <Button onClick={() => setIndex((i) => i + 1)}>{t.next} <ArrowRight className="w-4 h-4" /></Button>
                ) : (
                  <Button onClick={() => submit(false)}>{t.submit(answered, run.questions.length)}</Button>
                )}
              </div>
            </>
          )}
        </div>
      </PaperBackground>
    );
  }

  return (
    <PaperBackground className="pt-24 pb-20 min-h-screen">
      <div className="container-main max-w-4xl mx-auto space-y-6">
        <Link href={`/learn/${slug}`} className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] font-[var(--font-inter)]">
          <ArrowLeft className="w-4 h-4" /> {overview.level.title}
        </Link>

        <h1 className="text-3xl md:text-4xl flex items-center gap-3">
          <Icon className="w-8 h-8 text-[var(--color-brand-blue)] shrink-0" /> {quiz.title}
        </h1>

        {phase === "result" && result ? (
          <div className="space-y-6">
            <Card variant="sketch" className="text-center space-y-4 py-8">
              {overview.mascot ? (
                <Picture name={`${overview.mascot}-${result.passed ? "cheer" : "think"}`} className="w-32 h-32 mx-auto" />
              ) : (
                <Trophy className={`w-14 h-14 mx-auto ${result.passed ? "text-[var(--color-accent-yellow)]" : "text-[var(--color-line)]"}`} />
              )}
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-soft)] font-[var(--font-inter)]">{a.attempt(result.attemptNo)}</p>
              <p className="text-5xl font-bold font-[var(--font-inter)] text-[var(--color-brand-blue)]">{pct(result.score, result.max)}%</p>
              <p className="font-[var(--font-inter)] text-[var(--color-ink)] px-4">
                {t.correctOf(result.score, result.max)} ·{" "}
                {result.isPretest ? (
                  <strong className="text-[var(--color-brand-blue)]">{t.pretestDone}</strong>
                ) : result.passed ? (
                  <strong className="text-[var(--color-success-green)]">{overview.openOrder ? t.passedOpen : t.passed}</strong>
                ) : (
                  <strong className="text-[var(--color-danger-red)]">{overview.openOrder ? t.belowTarget(result.passPercent) : t.notPassed(result.passPercent)}</strong>
                )}
              </p>
              {result.autoSubmitted && (
                <p className="text-sm font-[var(--font-inter)] text-[var(--color-accent-coral)] flex items-center justify-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> {a.autoNote}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
                <Button onClick={() => setPhase("overview")} variant="secondary"><ListChecks className="w-4 h-4" /> {a.backToOverview}</Button>
                <Button href={`/learn/${slug}`}>{t.backToCourse}</Button>
              </div>
            </Card>
            {quiz.parts && <PartScores parts={quiz.parts} correct={result.review.map((r) => r.correct)} />}
            <h2 className="text-2xl">{t.review}</h2>
            <ReviewList items={result.review} passages={result.passages} />
          </div>
        ) : (
          <AttemptOverview
            questionCount={quiz.questionCount}
            minutes={Math.round(overview.timeLimitSec / 60)}
            cooldownMin={overview.cooldownMin}
            sets={quiz.sets}
            state={overview.state}
            offset={offset}
            best={overview.best && overview.best.score !== null ? { text: `${overview.best.score}/${overview.best.maxScore}`, passed: overview.isPretest ? null : overview.best.passed } : null}
            showPass={!overview.isPretest && quiz.passPercent > 0}
            restart={overview.restart}
            restarting={restarting}
            onRestart={restart}
            lessonHref={(id) => `/learn/${slug}/lesson/${id}`}
            starting={starting}
            onStart={start}
            scoreOf={(x) =>
              x.score !== null ? (
                <span className={`font-bold ${overview.isPretest || quiz.passPercent === 0 ? "text-[var(--color-brand-blue)]" : x.passed ? "text-[var(--color-success-green)]" : "text-[var(--color-danger-red)]"}`}>
                  {x.score}/{x.maxScore} <span className="font-normal text-[var(--color-ink-soft)]">({pct(x.score, x.maxScore)}%)</span>
                </span>
              ) : null
            }
            onReview={review}
          >
            {!overview.isPretest && quiz.passPercent > 0 && (
              <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                {overview.openOrder ? t.target(quiz.passPercent) : t.passToContinue(quiz.passPercent)}
              </p>
            )}
          </AttemptOverview>
        )}
      </div>
    </PaperBackground>
  );
}
