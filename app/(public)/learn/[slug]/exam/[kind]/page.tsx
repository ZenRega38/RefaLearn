"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Md } from "@/components/course/Md";
import { QuestionBlock } from "@/components/course/QuestionBlock";
import { isAnswered } from "@/components/course/QuestionInput";
import { ExamResultView } from "@/components/course/ExamResultView";
import { AttemptOverview, FocusBar, offsetFrom, type SaveState } from "@/components/course/attempts";
import { SkillIcon } from "@/components/course/skill";
import { speak, speechSupported } from "@/components/course/speech";
import { useCourseText } from "@/components/course/lang";
import type { ExamResult, Passage, PublicQuestion, Response, Skill } from "@/lib/course/types";
import type { AttemptState, AttemptSummary, RestartInfo } from "@/lib/course/attempt-rules";
import { useFocusMode } from "@/lib/focus-mode";
import { ArrowLeft, ArrowRight, Clock, Headphones, RefreshCw, AlertTriangle, Volume2, Target, Trophy } from "lucide-react";
import { announceXp } from "@/lib/gamification";

type ExamSectionView = {
  skill: Skill;
  title: string;
  minutes: number;
  directions: string;
  parts: { title: string; directions: string; questionIds: string[] }[];
  passages: Passage[];
  questions: PublicQuestion[];
};
type ExamView = { kind: "pretest" | "tryout"; title: string; sections: ExamSectionView[] };
type Layout = { skill: Skill; title: string; questionIds: string[]; passages: Passage[] }[];
type Overview = {
  title: string;
  description: string;
  minutes: number;
  questions: number;
  cooldownMin: number;
  sections: { skill: Skill; title: string; minutes: number; questions: number }[];
  state: AttemptState;
  restart: RestartInfo;
};

/** Where the student is; autosaved to the server so a reload (or another device) resumes here. */
type Saved = { section: number; sectionStartedAt: number | null; index: number; responses: Record<string, Response | null> };

/** Seconds to answer after each listening question, as on the real test. */
const ANSWER_SECONDS = 12;

const fmt = (ms: number) => {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

export default function ExamPage() {
  return (
    <Suspense>
      <ExamRunner />
    </Suspense>
  );
}

function ExamRunner() {
  const { slug, kind } = useParams<{ slug: string; kind: "pretest" | "tryout" }>();
  const attemptParam = useSearchParams().get("attempt");
  const router = useRouter();
  const t = useCourseText();
  const a = t.attempts;
  const api = `/api/courses/${slug}/exam/${kind}`;

  const [phase, setPhase] = useState<"loading" | "overview" | "section-intro" | "running" | "submitting" | "result" | "error">("loading");
  const [error, setError] = useState<string | null>(null);
  const [overview, setOverview] = useState<Overview | null>(null);
  const [exam, setExam] = useState<ExamView | null>(null);
  const [attempt, setAttempt] = useState<{ id: string; no: number; startedAt: number; deadline: number } | null>(null);
  const [offset, setOffset] = useState(0);
  const [state, setState] = useState<Saved>({ section: 0, sectionStartedAt: null, index: 0, responses: {} });
  const [result, setResult] = useState<{ result: ExamResult & { autoSubmitted?: boolean }; layout: Layout } | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [answerDeadline, setAnswerDeadline] = useState<number | null>(null);
  const [starting, setStarting] = useState(false);
  const [restarting, setRestarting] = useState(false);
  const [save, setSave] = useState<SaveState>("idle");
  const [timeUp, setTimeUp] = useState(false);
  const [tts] = useState(() => speechSupported());
  const [questionRendered, setQuestionRendered] = useState(false);

  useFocusMode(phase === "section-intro" || phase === "running" || phase === "submitting");

  useEffect(() => {
    if (phase !== "running") {
      setQuestionRendered(false);
    }
  }, [phase]);

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

  const openResult = useCallback(
    async (id: string) => {
      setPhase("loading");
      try {
        const res = await fetch(`${api}?attemptId=${id}`, { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        setResult(json);
        setPhase("result");
      } catch (err) {
        setError(err instanceof Error ? err.message : a.startFailed);
        setPhase("error");
      }
    },
    [api, a.startFailed]
  );

  // ---------------------------------------------------------------- autosave
  const latest = useRef(state);
  const dirty = useRef(false);
  const submittingRef = useRef(false);
  useEffect(() => {
    latest.current = state;
  }, [state]);

  const update = useCallback((fn: (s: Saved) => Saved) => {
    dirty.current = true;
    setState(fn);
  }, []);

  const saveNow = useCallback(
    async (keepalive = false) => {
      if (!attempt || !dirty.current || submittingRef.current) return;
      dirty.current = false;
      setSave("saving");
      try {
        const res = await fetch(api, {
          method: "POST",
          keepalive,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "save", attemptId: attempt.id, draft: latest.current }),
        });
        if (!res.ok) throw new Error();
        setSave("saved");
      } catch {
        dirty.current = true;
        setSave("error");
      }
    },
    [api, attempt]
  );

  const active = phase === "running" || phase === "section-intro";
  useEffect(() => {
    if (!active || !dirty.current) return;
    const id = window.setTimeout(() => saveNow(), 1200);
    return () => window.clearTimeout(id);
  }, [state, active, saveNow]);
  useEffect(() => {
    if (!active) return;
    const onHide = () => document.visibilityState === "hidden" && saveNow(true);
    const retry = window.setInterval(() => saveNow(), 20_000);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.clearInterval(retry);
    };
  }, [active, saveNow]);

  const section = exam?.sections[state.section];

  const submit = useCallback(
    async (responses: Record<string, Response | null>, auto = false) => {
      if (!attempt || submittingRef.current) return;
      submittingRef.current = true;
      setTimeUp(auto);
      setPhase("submitting");
      try {
        const res = await fetch(api, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "submit", attemptId: attempt.id, responses }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        setResult(json);
        announceXp(json.xp, t.xp.examDone);
        setPhase("result");
        window.history.replaceState(null, "", `/learn/${slug}/exam/${kind}?attempt=${attempt.id}`);
        loadOverview();
      } catch (err) {
        submittingRef.current = false;
        setError(err instanceof Error ? err.message : t.submitFailed);
        setPhase("error");
      }
    },
    [api, attempt, slug, kind, t, loadOverview]
  );

  const finishSection = useCallback(() => {
    if (!exam) return;
    setAnswerDeadline(null);
    if (state.section >= exam.sections.length - 1) {
      submit(state.responses);
    } else {
      update((s) => ({ ...s, section: s.section + 1, index: 0, sectionStartedAt: null }));
      setPhase("section-intro");
    }
  }, [exam, state.section, state.responses, submit, update]);

  const advanceListening = useCallback(() => {
    if (!section) return;
    setAnswerDeadline(null);
    if (state.index >= section.questions.length - 1) finishSection();
    else update((s) => ({ ...s, index: s.index + 1 }));
  }, [section, state.index, finishSection, update]);

  // Clock: the whole test's server deadline, each section's time limit and the listening answer window.
  const tickRef = useRef<() => void>(() => {});
  useEffect(() => {
    tickRef.current = () => {
      const time = Date.now();
      setNow(time);
      if (!attempt || (phase !== "running" && phase !== "section-intro")) return;
      if (time + offset >= attempt.deadline) {
        submit(latest.current.responses, true);
        return;
      }
      if (phase !== "running" || !section || !state.sectionStartedAt) return;
      if (time - state.sectionStartedAt >= section.minutes * 60_000) finishSection();
      else if (answerDeadline && time >= answerDeadline) advanceListening();
    };
  });
  useEffect(() => {
    const id = setInterval(() => tickRef.current(), 250);
    return () => clearInterval(id);
  }, []);

  const start = useCallback(async () => {
    setStarting(true);
    // Speak a silent warm-up inside this click so later auto-play is allowed.
    if (tts) speak([{ speaker: "narrator", text: " " }]);
    try {
      const res = await fetch(api, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "start" }) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setOffset(offsetFrom(json.serverNow));
      setExam(json.exam);
      setAttempt({ id: json.attemptId, no: json.attemptNo, startedAt: Date.parse(json.startedAt), deadline: Date.parse(json.deadline) });
      const saved = json.draft as Saved | null;
      dirty.current = false;
      submittingRef.current = false;
      setSave("idle");
      if (saved) {
        setState(saved);
        setPhase(saved.sectionStartedAt ? "running" : "section-intro");
      } else {
        setState({ section: 0, sectionStartedAt: null, index: 0, responses: {} });
        setPhase("section-intro");
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : a.startFailed);
      loadOverview();
    } finally {
      setStarting(false);
    }
  }, [api, tts, a.startFailed, loadOverview]);

  useEffect(() => {
    loadOverview().then((o) => {
      if (!o) return;
      if (attemptParam) {
        openResult(attemptParam);
      } else {
        setPhase("overview");
      }
    });
  }, [loadOverview, openResult, attemptParam]);

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

  const exit = () => {
    if (!window.confirm(a.exitConfirm)) return;
    dirty.current = true;
    saveNow(true).finally(() => router.push(`/learn/${slug}`));
  };

  const setResponse = (id: string, r: Response) => update((s) => ({ ...s, responses: { ...s.responses, [id]: r } }));

  // ------------------------------------------------------------------ views

  if (phase === "result" && result) {
    return (
      <Shell slug={slug}>
        {result.result.autoSubmitted && (
          <p className="text-sm font-[var(--font-inter)] text-[var(--color-accent-coral)] flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" /> {a.autoNote}
          </p>
        )}
        <ExamResultView result={result.result} sections={result.layout} slug={slug} onOverview={() => { window.history.replaceState(null, "", `/learn/${slug}/exam/${kind}`); setPhase("overview"); }} />
      </Shell>
    );
  }

  if (phase === "error") {
    return (
      <Shell slug={slug}>
        <Card className="text-center py-12 space-y-4">
          <p className="text-[var(--color-danger-red)] font-[var(--font-inter)]">{error}</p>
          <Button href={`/learn/${slug}`} variant="secondary">{t.backToCourse}</Button>
        </Card>
      </Shell>
    );
  }

  if (phase === "loading" || !overview) {
    return (
      <Shell slug={slug}>
        <div className="text-center py-20 text-[var(--color-ink-soft)] font-[var(--font-inter)]">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-[var(--color-brand-blue)]" />
        </div>
      </Shell>
    );
  }

  if (phase === "overview") {
    const Icon = kind === "pretest" ? Target : Trophy;
    const scores = overview.state.attempts.filter((x) => x.score !== null).map((x) => x.score!);
    return (
      <Shell slug={slug}>
        <h1 className="text-3xl md:text-4xl flex items-center gap-3">
          <Icon className={`w-8 h-8 shrink-0 ${kind === "pretest" ? "text-[var(--color-warning-amber)]" : "text-[var(--color-accent-coral)]"}`} /> {overview.title}
        </h1>
        <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">{overview.description}</p>
        <AttemptOverview
          questionCount={overview.questions}
          minutes={overview.minutes}
          cooldownMin={overview.cooldownMin}
          state={overview.state}
          offset={offset}
          best={scores.length ? { text: String(Math.max(...scores)), passed: null } : null}
          extraRules={[
            <>The format follows the TOEFL ITP: <strong>{overview.sections.map((s) => s.title.replace(/^Section \d+: /, "")).join(" → ")}</strong>. Each section has its own time limit, and you <strong>can&apos;t go back</strong> to an earlier section.</>,
            <>Listening: each recording plays <strong>once</strong>, automatically. After it ends you have {ANSWER_SECONDS} seconds to answer before the next question.</>,
            <>Structure and Reading: move freely between questions inside the section. There&apos;s no penalty for wrong answers, so answer everything.</>,
          ]}
          restart={overview.restart}
          restarting={restarting}
          onRestart={restart}
          lessonHref={(id) => `/learn/${slug}/lesson/${id}`}
          starting={starting}
          onStart={start}
          scoreOf={(x: AttemptSummary) => <span className="font-bold text-[var(--color-brand-blue)]">{x.score}</span>}
          onReview={(x) => openResult(x.id)}
        >
          {!tts && (
            <div className="flex items-start gap-2 p-3 rounded-[var(--radius-card)] bg-amber-50 border border-amber-300 text-amber-900 text-sm font-[var(--font-inter)]">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              {t.audioUnsupported}
            </div>
          )}
          {tts && (
            <button
              type="button"
              onClick={() => speak([{ speaker: "woman", text: "This is a sound check." }, { speaker: "man", text: "If you can hear us clearly, you are ready." }])}
              className="flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-blue)] font-[var(--font-inter)]"
            >
              <Volume2 className="w-4 h-4" /> Test your sound and headphones
            </button>
          )}
        </AttemptOverview>
      </Shell>
    );
  }

  if (!exam || !section || !attempt) return null;

  const bar = (
    <FocusBar
      title={exam.title}
      detail={`${a.attempt(attempt.no)} · Section ${state.section + 1} of ${exam.sections.length}`}
      deadline={attempt.deadline}
      offset={offset}
      totalMs={attempt.deadline - attempt.startedAt}
      save={save}
      onExit={exit}
      showTimer={questionRendered}
    />
  );

  if (phase === "submitting") {
    return (
      <FocusShell>
        {bar}
        <Card variant="sketch" className="text-center py-14 space-y-3 font-[var(--font-inter)]">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[var(--color-brand-blue)]" />
          <p className="text-[var(--color-ink)] font-semibold">{timeUp ? a.timeUpSubmitting : a.submitting}</p>
        </Card>
      </FocusShell>
    );
  }

  if (phase === "section-intro") {
    return (
      <FocusShell>
        <FocusBar
          title={exam.title}
          detail={`${a.attempt(attempt.no)} · Section ${state.section + 1} of ${exam.sections.length}`}
          deadline={attempt.deadline}
          offset={offset}
          totalMs={attempt.deadline - attempt.startedAt}
          save={save}
          onExit={exit}
          showTimer={false}
        />
        <Card variant="sketch" className="space-y-5 p-6 md:p-10">
          <p className="text-sm font-semibold text-[var(--color-ink-soft)] font-[var(--font-inter)] flex items-center gap-2">
            <SkillIcon skill={section.skill} /> Section {state.section + 1} of {exam.sections.length}
          </p>
          <h1 className="text-3xl md:text-4xl">{section.title}</h1>
          <p className="font-[var(--font-inter)] text-[var(--color-ink-soft)] flex items-center gap-1.5"><Clock className="w-4 h-4" /> {section.questions.length} questions · {section.minutes} min</p>
          <div className="font-[var(--font-inter)] text-[var(--color-ink)]"><Md text={section.directions} /></div>
          {section.skill === "listening" && (
            <p className="flex items-center gap-2 text-sm font-[var(--font-inter)] text-[var(--color-brand-blue)]"><Headphones className="w-4 h-4" /> {t.useHeadset}</p>
          )}
          <div className="flex justify-end">
            <Button
              size="lg"
              onClick={() => {
                if (tts && section.skill === "listening") speak([{ speaker: "narrator", text: " " }]);
                update((s) => ({ ...s, sectionStartedAt: Date.now() }));
                setPhase("running");
              }}
            >
              Start Section {state.section + 1}
            </Button>
          </div>
        </Card>
      </FocusShell>
    );
  }

  // ---------------------------------------------------------------- running
  const q = section.questions[state.index];
  const remaining = section.minutes * 60_000 - (now - (state.sectionStartedAt ?? now));
  const part = section.parts.find((p) => p.questionIds.includes(q.id));
  const answeredCount = section.questions.filter((x) => isAnswered(x, state.responses[x.id])).length;
  const listening = section.skill === "listening";

  return (
    <FocusShell wide>
      {bar}
      {/* Section bar */}
      <div className="flex items-center justify-between gap-3 font-[var(--font-inter)] text-sm">
        <div className="flex items-center gap-2 min-w-0">
          <SkillIcon skill={section.skill} className="w-5 h-5 shrink-0" />
          <span className="font-semibold text-[var(--color-ink)] truncate">{section.title.replace(/^Section \d+: /, "")}</span>
          {part && <span className="hidden sm:inline text-xs text-[var(--color-ink-soft)]">· {part.title}</span>}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-[var(--color-ink-soft)]">{answeredCount}/{section.questions.length}</span>
          <span className={`flex items-center gap-1 font-bold tabular-nums ${remaining < 60_000 ? "text-[var(--color-danger-red)]" : "text-[var(--color-ink)]"}`} title="Time left in this section">
            <Clock className="w-4 h-4" /> {fmt(remaining)}
          </span>
        </div>
      </div>

      <div className="space-y-5">
        {part && state.index === section.questions.findIndex((x) => part.questionIds.includes(x.id)) && listening && (
          <div className="p-3 rounded-[var(--radius-card)] bg-[var(--color-brand-blue)]/5 border border-[var(--color-brand-blue)]/20 text-sm font-[var(--font-inter)]">
            <strong>{part.title}.</strong> {part.directions}
          </div>
        )}

        {!listening && (
          <div className="flex flex-wrap gap-1.5">
            {section.questions.map((x, i) => (
              <button
                key={x.id}
                onClick={() => update((s) => ({ ...s, index: i }))}
                className={`w-9 h-9 rounded-md text-xs font-semibold font-[var(--font-inter)] border-2 ${i === state.index ? "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)] text-white" : isAnswered(x, state.responses[x.id]) ? "border-[var(--color-brand-blue)]/40 bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)]" : "border-[var(--color-line)] bg-white text-[var(--color-ink-soft)]"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        <Card
          variant="sketch"
          className="p-5 md:p-8 space-y-4"
          ref={(node: HTMLDivElement | null) => {
            if (node && !questionRendered) {
              setQuestionRendered(true);
            }
          }}
        >
          <p className="text-xs font-semibold text-[var(--color-ink-soft)] font-[var(--font-inter)]">
            {part?.title} · Question {state.index + 1}
          </p>
          <QuestionBlock
            key={q.id}
            question={q}
            passages={section.passages}
            value={state.responses[q.id] ?? null}
            onChange={(r) => setResponse(q.id, r)}
            audioOnce
            audioAutoPlay={listening}
            onAudioEnded={() => setAnswerDeadline(Date.now() + ANSWER_SECONDS * 1000)}
          />
          {listening && answerDeadline && (
            <p className="text-sm font-[var(--font-inter)] text-[var(--color-ink-soft)]">
              Next question in <strong className="text-[var(--color-accent-coral)] tabular-nums">{fmt(answerDeadline - now)}</strong>
            </p>
          )}
        </Card>

        {listening ? (
          <div className="flex justify-end">
            <Button onClick={advanceListening} disabled={!answerDeadline && tts}>
              {state.index >= section.questions.length - 1 ? "Finish Section" : "Next Question"} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex justify-between gap-3">
            <Button variant="ghost" onClick={() => update((s) => ({ ...s, index: Math.max(0, s.index - 1) }))} disabled={state.index === 0}>
              <ArrowLeft className="w-4 h-4" /> {t.previous}
            </Button>
            {state.index < section.questions.length - 1 ? (
              <Button onClick={() => update((s) => ({ ...s, index: s.index + 1 }))}>{t.next} <ArrowRight className="w-4 h-4" /></Button>
            ) : (
              <Button
                onClick={() => {
                  const left = section.questions.length - answeredCount;
                  const blank = left ? ` ${left} question${left === 1 ? " is" : "s are"} still blank.` : "";
                  const msg = state.section >= exam.sections.length - 1 ? `Submit the test now?${blank}` : `Finish this section? You can't come back to it.${blank}`;
                  if (window.confirm(msg)) finishSection();
                }}
              >
                {state.section >= exam.sections.length - 1 ? "Submit Test" : "Finish Section"}
              </Button>
            )}
          </div>
        )}
      </div>
    </FocusShell>
  );
}

function Shell({ slug, children }: { slug: string; children: React.ReactNode }) {
  const t = useCourseText();
  return (
    <PaperBackground className="pt-24 pb-20 min-h-screen">
      <div className="container-main max-w-4xl mx-auto space-y-4">
        <Link href={`/learn/${slug}`} className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] font-[var(--font-inter)]">
          <ArrowLeft className="w-4 h-4" /> {t.backToCourse}
        </Link>
        {children}
      </div>
    </PaperBackground>
  );
}

/** Focus mode: no site chrome, just the test. */
function FocusShell({ wide = false, children }: { wide?: boolean; children: React.ReactNode }) {
  return (
    <PaperBackground className="pb-20 min-h-screen">
      <div className={`container-main ${wide ? "max-w-6xl" : "max-w-4xl"} mx-auto space-y-5`}>{children}</div>
    </PaperBackground>
  );
}
