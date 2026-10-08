"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LessonBlocks } from "@/components/course/LessonBlocks";
import { Checkpoint } from "@/components/course/Checkpoint";
import { LiveQuizWidget } from "@/components/live/LiveQuizWidget";
import { SkillIcon, SKILL_LABEL } from "@/components/course/skill";
import type { Lesson } from "@/lib/course/types";
import { ArrowLeft, ArrowRight, CheckCircle2, Flag, RefreshCw, Clock } from "lucide-react";

type LessonPayload = {
  lesson: Lesson;
  level: { id: string; title: string };
  position: { index: number; total: number };
  nextId: string;
  nextIsQuiz: boolean;
  done: boolean;
  mascot: string | null;
  hasLive: boolean;
};

export default function LessonPage() {
  const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>();
  const router = useRouter();
  const [data, setData] = useState<LessonPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/courses/${slug}/lessons/${lessonId}`, { cache: "no-store" })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        setData(json);
      })
      .catch((err: Error) => setError(err.message));
  }, [slug, lessonId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  if (error) {
    return (
      <PaperBackground className="pt-24 pb-20 min-h-screen">
        <div className="container-main max-w-2xl mx-auto text-center py-20 space-y-4 font-[var(--font-inter)]">
          <p className="text-[var(--color-danger-red)]">{error}</p>
          <Button href={`/learn/${slug}`} variant="secondary">Kembali ke Kursus</Button>
        </div>
      </PaperBackground>
    );
  }

  if (!data) {
    return (
      <PaperBackground className="pt-24 pb-20 min-h-screen">
        <div className="text-center py-20 text-[var(--color-ink-soft)] font-[var(--font-inter)]">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-[var(--color-brand-blue)]" />
          Memuat materi...
        </div>
      </PaperBackground>
    );
  }

  const { lesson } = data;
  const steps = [...lesson.sections.map((s) => s.title), "Checkpoint"];
  const onCheckpoint = step === lesson.sections.length;

  const complete = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/courses/${slug}/lessons/${lessonId}`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      router.push(data.nextIsQuiz ? `/learn/${slug}/quiz/${data.nextId}` : `/learn/${slug}/lesson/${data.nextId}`);
    } catch (err) {
      setSaving(false);
      alert(err instanceof Error ? err.message : "Gagal menyimpan progres.");
    }
  };

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
                <SkillIcon skill={lesson.skill} className="w-3.5 h-3.5" /> {SKILL_LABEL[lesson.skill]} · Materi {data.position.index + 1}/{data.position.total}
              </p>
              <ol className="space-y-1 font-[var(--font-inter)] text-sm">
                {steps.map((title, i) => (
                  <li key={title}>
                    <button
                      onClick={() => (i <= step || data.done) && setStep(i)}
                      disabled={i > step && !data.done}
                      className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-md ${i === step ? "bg-[var(--color-brand-blue)] text-white" : i < step ? "text-[var(--color-ink)] hover:bg-[var(--color-paper-bg-alt)]" : "text-[var(--color-ink-soft)] opacity-60"}`}
                    >
                      {i < step ? <CheckCircle2 className="w-4 h-4 shrink-0 text-[var(--color-success-green)]" /> : i === steps.length - 1 ? <Flag className="w-4 h-4 shrink-0" /> : <span className="w-4 text-center text-xs">{i + 1}</span>}
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
              {(lesson.minutes || data.done) && (
                <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {lesson.minutes ? `±${lesson.minutes} menit ` : ""}{data.done && (lesson.minutes ? "· sudah selesai ✓" : "Sudah selesai ✓ · boleh dibaca ulang kapan saja")}
                </p>
              )}
            </div>
            {data.hasLive && <LiveQuizWidget courseSlug={slug} levelId={data.level.id} compact />}

            <Card variant="sketch" className="p-5 md:p-8">
              {onCheckpoint ? (
                <Checkpoint
                  title={`Checkpoint: ${lesson.title}`}
                  questions={lesson.checkpoint}
                  passages={lesson.passages}
                  onComplete={complete}
                  completing={saving}
                  mascot={data.mascot ?? undefined}
                />
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
                  <ArrowLeft className="w-4 h-4" /> Sebelumnya
                </Button>
                <Button onClick={() => setStep((s) => s + 1)}>
                  {step === lesson.sections.length - 1 ? "Ke Checkpoint" : "Lanjut"} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </PaperBackground>
  );
}
