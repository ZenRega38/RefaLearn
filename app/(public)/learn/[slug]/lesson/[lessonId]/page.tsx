"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LessonBlocks } from "@/components/course/LessonBlocks";
import { Checkpoint } from "@/components/course/Checkpoint";
import { ReviewList } from "@/components/course/ReviewList";
import { Picture } from "@/components/course/pictures";
import { LiveQuizWidget } from "@/components/live/LiveQuizWidget";
import { SkillIcon } from "@/components/course/skill";
import { useCourseText } from "@/components/course/lang";
import type { Lesson, Response } from "@/lib/course/types";
import { isCorrect } from "@/lib/course/grading";
import { formatTimestamp } from "@/lib/format";
import { useFocusMode } from "@/lib/focus-mode";
import { ArrowLeft, ArrowRight, CheckCircle2, Flag, RefreshCw, Clock, RotateCcw, History, Trophy } from "lucide-react";
import { announceXp } from "@/lib/gamification";

type LessonPayload = {
  lesson: Lesson;
  level: { id: string; title: string };
  position: { index: number; total: number };
  nextId: string;
  nextIsQuiz: boolean;
  done: boolean;
  mascot: string | null;
  hasLive: boolean;
  /** Being studied again after starting over a quiz: sections and checkpoint in order. */
  restudy?: boolean;
  /** Earlier checkpoint runs (first try of each question), newest first. */
  checkpointLog: { id: string; score: number | null; maxScore: number | null; answers: Record<string, Response | null> | null; at: string }[];
};

export default function LessonPage() {
  const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>();
  const router = useRouter();
  const t = useCourseText();
  const [data, setData] = useState<LessonPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  // A finished checkpoint shows its summary; practising runs it again.
  const [practice, setPractice] = useState(false);

  const load = useCallback(
    () =>
      fetch(`/api/courses/${slug}/lessons/${lessonId}`, { cache: "no-store" })
        .then(async (res) => {
          const json = await res.json();
          if (!res.ok) throw new Error(json.error);
          setData(json);
          announceXp(json.xp, t.xp.lessonRead);
        })
        .catch((err: Error) => setError(err.message)),
    [slug, lessonId, t.xp.lessonRead]
  );

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, practice]);

  const onCheckpoint = !!data && step === data.lesson.sections.length;
  // Answering the checkpoint (first time, or practising again): focus mode.
  const running = onCheckpoint && !!data && (!data.done || practice) && data.lesson.checkpoint.length > 0;
  useFocusMode(running);

  if (error) {
    return (
      <PaperBackground className="pt-24 pb-20 min-h-screen">
        <div className="container-main max-w-2xl mx-auto text-center py-20 space-y-4 font-[var(--font-inter)]">
          <p className="text-[var(--color-danger-red)]">{error}</p>
          <Button href={`/learn/${slug}`} variant="secondary">{t.backToCourse}</Button>
        </div>
      </PaperBackground>
    );
  }

  if (!data) {
    return (
      <PaperBackground className="pt-24 pb-20 min-h-screen">
        <div className="text-center py-20 text-[var(--color-ink-soft)] font-[var(--font-inter)]">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-[var(--color-brand-blue)]" />
          {t.loadingLesson}
        </div>
      </PaperBackground>
    );
  }

  const { lesson } = data;
  const steps = [...lesson.sections.map((s) => s.title), t.checkpoint];
  const nextHref = data.nextIsQuiz ? `/learn/${slug}/quiz/${data.nextId}` : `/learn/${slug}/lesson/${data.nextId}`;

  const complete = async ({ responses }: { responses: Record<string, Response | null> }) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/courses/${slug}/lessons/${lessonId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      announceXp(json.xp, t.xp.lessonDone);
      if (data.done) {
        // A practice run: back to the summary, with this run in the log.
        await load();
        setPractice(false);
        setSaving(false);
        return;
      }
      router.push(nextHref);
    } catch (err) {
      setSaving(false);
      alert(err instanceof Error ? err.message : t.saveFailed);
    }
  };

  if (running) {
    return (
      <PaperBackground className="pb-20 min-h-screen">
        <div className="container-main max-w-3xl mx-auto space-y-5">
          <div className="sticky top-0 z-40 -mx-4 px-4 py-3 bg-[var(--color-paper-bg)]/95 backdrop-blur border-b border-[var(--color-line)] flex items-center justify-between gap-3 font-[var(--font-inter)]">
            <div className="min-w-0">
              <p className="font-semibold text-[var(--color-ink)] truncate">{lesson.title}</p>
              <p className="text-xs text-[var(--color-ink-soft)] truncate">{data.level.title}</p>
            </div>
            <button
              type="button"
              onClick={() => (practice ? setPractice(false) : setStep(lesson.sections.length - 1))}
              className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] px-2 py-1.5 rounded-md hover:bg-[var(--color-paper-bg-alt)] shrink-0"
            >
              <ArrowLeft className="w-4 h-4" /> {practice ? t.checkpointRun.doneTitle : t.previous}
            </button>
          </div>
          <Card variant="sketch" className="p-5 md:p-8">
            <Checkpoint
              title={t.checkpointTitle(lesson.title)}
              questions={lesson.checkpoint}
              passages={lesson.passages}
              onComplete={complete}
              completing={saving}
              mascot={data.mascot ?? undefined}
            />
          </Card>
        </div>
      </PaperBackground>
    );
  }

  return (
    <PaperBackground className="pt-24 pb-20 min-h-screen">
      <div className="container-main max-w-5xl mx-auto">
        <Link href={`/learn/${slug}`} className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] font-[var(--font-inter)] mb-6">
          <ArrowLeft className="w-4 h-4" /> {data.level.title}
        </Link>

        <div className="grid lg:grid-cols-[240px_1fr] gap-6 items-start">
          {/* Step list (Dicoding-style) */}
          <aside className="lg:sticky lg:top-24">
            <Card className="p-4 space-y-3">
              <p className="text-xs font-semibold text-[var(--color-ink-soft)] font-[var(--font-inter)] flex items-center gap-1.5">
                <SkillIcon skill={lesson.skill} className="w-3.5 h-3.5" /> {t.skills[lesson.skill]} · {t.lessonOf(data.position.index + 1, data.position.total)}
              </p>
              <ol className="space-y-1 font-[var(--font-inter)] text-sm">
                {steps.map((title, i) => (
                  <li key={title}>
                    <button
                      onClick={() => (i <= step || data.done) && setStep(i)}
                      disabled={i > step && !data.done}
                      className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-md ${i === step ? "bg-[var(--color-brand-blue)] text-white" : i < step || data.done ? "text-[var(--color-ink)] hover:bg-[var(--color-paper-bg-alt)]" : "text-[var(--color-ink-soft)] opacity-60"}`}
                    >
                      {i < step || (data.done && i !== step) ? <CheckCircle2 className={`w-4 h-4 shrink-0 ${i === step ? "text-white" : "text-[var(--color-success-green)]"}`} /> : i === steps.length - 1 ? <Flag className="w-4 h-4 shrink-0" /> : <span className="w-4 text-center text-xs">{i + 1}</span>}
                      <span className="truncate">{title}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </Card>
          </aside>

          <main className="space-y-6 min-w-0">
            <div>
              <h1 className="text-3xl md:text-4xl mb-1">{lesson.title}</h1>
              {data.restudy && (
                <p className="text-sm font-semibold text-[var(--color-accent-coral)] font-[var(--font-inter)] flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5" /> {t.attempts.restudyNote}
                </p>
              )}
              {(lesson.minutes || data.done) && (
                <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {lesson.minutes ? `${t.lessonMinutes(lesson.minutes)} ` : ""}{data.done && (lesson.minutes ? t.doneShort : t.doneLong)}
                </p>
              )}
            </div>
            {data.hasLive && <LiveQuizWidget courseSlug={slug} levelId={data.level.id} compact />}

            <Card variant="sketch" className="p-5 md:p-8">
              {onCheckpoint && data.done ? (
                <CheckpointSummary data={data} onPractice={() => setPractice(true)} nextHref={nextHref} />
              ) : onCheckpoint ? (
                // A lesson without checkpoint questions: just the finish button.
                <Checkpoint title={t.checkpointTitle(lesson.title)} questions={lesson.checkpoint} onComplete={complete} completing={saving} mascot={data.mascot ?? undefined} />
              ) : (
                <div className="space-y-6">
                  <h2 className="text-2xl text-[var(--color-brand-blue)]">{lesson.sections[step].title}</h2>
                  <LessonBlocks blocks={lesson.sections[step].blocks} />
                </div>
              )}
            </Card>

            {!onCheckpoint && (
              <div className="flex justify-between gap-3">
                <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
                  <ArrowLeft className="w-4 h-4" /> {t.previous}
                </Button>
                <Button onClick={() => setStep((s) => s + 1)}>
                  {step === lesson.sections.length - 1 ? t.toCheckpoint : t.next} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </PaperBackground>
  );
}

/** A finished checkpoint: the latest run, every run so far, its review, and the way on. */
function CheckpointSummary({ data, onPractice, nextHref }: { data: LessonPayload; onPractice: () => void; nextHref: string }) {
  const t = useCourseText();
  const c = t.checkpointRun;
  const last = data.checkpointLog[0];
  const answers = last?.answers ?? {};
  const review = data.lesson.checkpoint
    .filter((q) => q.id in answers)
    .map((q) => ({ id: q.id, correct: isCorrect(q, answers[q.id]), response: answers[q.id] ?? null, question: q }));

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3 py-2">
        {data.mascot ? <Picture name={`${data.mascot}-cheer`} className="w-24 h-24 mx-auto" /> : <Trophy className="w-12 h-12 mx-auto text-[var(--color-accent-yellow)]" />}
        <h3 className="text-2xl font-[var(--font-kalam)] text-[var(--color-brand-blue)] flex items-center justify-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-[var(--color-success-green)]" /> {c.doneTitle}
        </h3>
        {last?.score != null && last.maxScore != null && (
          <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">{c.last(last.score, last.maxScore)}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {data.lesson.checkpoint.length > 0 && (
            <Button variant="secondary" onClick={onPractice}><RotateCcw className="w-4 h-4" /> {c.practice}</Button>
          )}
          <Button href={nextHref}>{c.continue} <ArrowRight className="w-4 h-4" /></Button>
        </div>
      </div>

      {data.checkpointLog.length > 0 && (
        <div className="space-y-2 font-[var(--font-inter)]">
          <p className="text-sm font-bold text-[var(--color-ink)] flex items-center gap-1.5"><History className="w-4 h-4 text-[var(--color-brand-blue)]" /> {c.history}</p>
          <ul className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white divide-y divide-[var(--color-line)] text-sm">
            {data.checkpointLog.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 px-3 py-2">
                <span className="text-[var(--color-ink-soft)]">{formatTimestamp(r.at, "dd MMM yyyy, HH:mm", "en")}</span>
                {r.score != null && r.maxScore != null && <span className="font-semibold text-[var(--color-brand-blue)] tabular-nums">{r.score}/{r.maxScore}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {review.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-bold text-[var(--color-ink)] font-[var(--font-inter)]">{c.reviewLast}</p>
          <ReviewList items={review} passages={data.lesson.passages} />
        </div>
      )}
    </div>
  );
}
