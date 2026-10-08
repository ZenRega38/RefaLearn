"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { SketchBox } from "@/components/sketch/SketchBox";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Picture } from "@/components/course/pictures";
import { LiveQuizWidget } from "@/components/live/LiveQuizWidget";
import { AdminLevelControls } from "@/components/course/AdminLevelControls";
import { SkillIcon, SKILL_LABEL } from "@/components/course/skill";
import type { Skill } from "@/lib/course/types";
import { formatPrice } from "@/lib/pricing";
import { formatTimestamp } from "@/lib/format";
import { CheckCircle2, Lock, PlayCircle, ClipboardCheck, Trophy, Target, Clock, RefreshCw, ShoppingBag, Radio } from "lucide-react";

type Attempt = { id: string; total_score: number | null; submitted_at: string | null };
type QuizInfo = { id: string; title: string; questions: number; passPercent: number; unlocked: boolean; passed: boolean; score: number | null; maxScore: number | null };
type Outline = {
  slug: string;
  title: string;
  subtitle: string;
  labels: { level: string; quiz: string };
  comingSoon: string | null;
  mascot: string | null;
  free: boolean;
  openOrder: boolean;
  adminLocks: boolean;
  isAdmin: boolean;
  quizSecondsPerQuestion: number | null;
  loggedIn: boolean;
  access: boolean;
  store: { slug: string; price: number } | null;
  progress: { completed: number; total: number };
  levels: {
    id: string;
    title: string;
    description: string;
    targetScore: string;
    cover: string[];
    locked: boolean;
    hasLive: boolean;
    openForStudents?: boolean;
    live?: { id: string; pin: string; status: string } | null;
    pretest: QuizInfo | null;
    lessons: { id: string; title: string; skill: Skill; summary: string; minutes: number | null; unlocked: boolean; done: boolean }[];
    quiz: QuizInfo;
  }[];
  pretest: { title: string; description: string; minutes: number; questions: number; attempts: Attempt[] } | null;
  tryout: { title: string; description: string; minutes: number; questions: number; unlocked: boolean; attempts: Attempt[] } | null;
};

export default function CourseHomePage() {
  const { slug } = useParams<{ slug: string }>();
  const [outline, setOutline] = useState<Outline | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    () =>
      fetch(`/api/courses/${slug}`, { cache: "no-store" })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.error);
          setOutline(data);
        })
        .catch((err: Error) => setError(err.message)),
    [slug]
  );

  useEffect(() => {
    load();
  }, [load]);

  if (error) {
    return (
      <PaperBackground className="pt-24 pb-20 min-h-screen">
        <div className="container-main max-w-3xl mx-auto text-center py-20">
          <p className="text-[var(--color-danger-red)] font-[var(--font-inter)]">{error}</p>
        </div>
      </PaperBackground>
    );
  }

  if (!outline) {
    return (
      <PaperBackground className="pt-24 pb-20 min-h-screen">
        <div className="text-center py-20 text-[var(--color-ink-soft)] font-[var(--font-inter)]">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-[var(--color-brand-blue)]" />
          Memuat kursus...
        </div>
      </PaperBackground>
    );
  }

  const pct = Math.round((outline.progress.completed / Math.max(outline.progress.total, 1)) * 100);
  const lastPretest = outline.pretest?.attempts[0];
  const bestTryout = (outline.tryout?.attempts ?? []).reduce<number | null>((best, a) => (a.total_score !== null && (best === null || a.total_score > best) ? a.total_score : best), null);
  const nextLesson = outline.levels
    .flatMap((l) => [
      ...(l.pretest ? [{ ...l.pretest, done: l.pretest.passed, href: `/learn/${slug}/quiz/${l.pretest.id}` }] : []),
      ...l.lessons.map((x) => ({ ...x, href: `/learn/${slug}/lesson/${x.id}` })),
      { ...l.quiz, done: l.quiz.passed, href: `/learn/${slug}/quiz/${l.quiz.id}` },
    ])
    .find((x) => x.unlocked && !x.done);

  return (
    <PaperBackground className="pt-24 pb-20 min-h-screen">
      <div className="container-main max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-3">
          {outline.mascot && <Picture name={`${outline.mascot}-wave`} label="Maskot kursus" className="w-24 h-24 mx-auto" />}
          <div className="flex justify-center gap-2">
            <Badge variant="blue">Kursus Interaktif</Badge>
            {outline.free && <Badge variant="green">Gratis</Badge>}
          </div>
          <h1 className="text-4xl md:text-5xl">
            <SketchBox color="var(--color-accent-yellow)">{outline.title}</SketchBox>
          </h1>
          <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)] max-w-2xl mx-auto">{outline.subtitle}</p>
        </div>

        {outline.isAdmin && (outline.adminLocks || outline.levels.some((l) => l.hasLive)) && (
          <div className="flex items-start gap-3 rounded-[var(--radius-card)] border-2 border-dashed border-[var(--color-brand-blue)]/40 bg-white/70 p-4 font-[var(--font-inter)] text-sm">
            <Radio className="w-5 h-5 text-[var(--color-brand-blue)] shrink-0 mt-0.5" />
            <p className="text-[var(--color-ink-soft)]">
              <strong className="text-[var(--color-brand-blue)]">Mode admin.</strong> Anda melihat semua modul, termasuk yang masih terkunci untuk peserta.
              Di bawah setiap modul ada kontrol untuk {outline.adminLocks ? "membuka atau mengunci modul dan " : ""}memulai Live Quiz. Harga dan status gratis diatur dari menu admin Materi.
            </p>
          </div>
        )}

        {/* Progress / access */}
        <Card variant="sketch" className="space-y-4">
          {outline.access ? (
            <>
              <div className="flex items-center justify-between gap-4 font-[var(--font-inter)]">
                <span className="font-semibold text-[var(--color-ink)]">Progres belajar</span>
                <span className="text-sm text-[var(--color-ink-soft)]">{outline.progress.completed}/{outline.progress.total} modul · {pct}%</span>
              </div>
              <div className="h-3 rounded-full bg-[var(--color-paper-bg-alt)] border border-[var(--color-line)] overflow-hidden">
                <div className="h-full bg-[var(--color-success-green)] transition-all" style={{ width: `${pct}%` }} />
              </div>
              {nextLesson && (
                <div className="flex justify-end">
                  <Button href={nextLesson.href}>
                    <PlayCircle className="w-4 h-4" /> {outline.progress.completed === 0 ? "Mulai Belajar" : "Lanjutkan Belajar"}
                  </Button>
                </div>
              )}
            </>
          ) : outline.free ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-[var(--font-inter)]">
              <div>
                <p className="font-semibold text-[var(--color-ink)]">Kursus ini gratis</p>
                <p className="text-sm text-[var(--color-ink-soft)]">Masuk atau daftar dulu (bisa pakai Google) supaya progres belajarmu tersimpan.</p>
              </div>
              <Button href={`/login?next=/learn/${slug}`} className="shrink-0">Masuk untuk Mulai</Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-[var(--font-inter)]">
              <div>
                <p className="font-semibold text-[var(--color-ink)]">Buka seluruh materi, kuis, dan tryout</p>
                <p className="text-sm text-[var(--color-ink-soft)]">
                  {outline.pretest
                    ? outline.loggedIn ? "Pretest gratis bisa langsung dikerjakan." : "Masuk dulu untuk mengerjakan pretest gratis."
                    : "Lihat daftar bab dan materinya di bawah."}
                </p>
              </div>
              {outline.store ? (
                <Button href={`/materials/${outline.store.slug}`} className="shrink-0">
                  <ShoppingBag className="w-4 h-4" /> Beli · {formatPrice(outline.store.price)}
                </Button>
              ) : (
                <Badge variant="outline">Segera hadir</Badge>
              )}
            </div>
          )}
        </Card>

        {/* Pretest */}
        {outline.pretest && (
        <Card variant="sketch" className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent-yellow)]/20 flex items-center justify-center shrink-0">
              <Target className="w-6 h-6 text-[var(--color-warning-amber)]" />
            </div>
            <div className="font-[var(--font-inter)]">
              <h2 className="font-bold text-lg text-[var(--color-ink)]">{outline.pretest.title} <Badge variant="green" className="ml-1 align-middle">Gratis</Badge></h2>
              <p className="text-sm text-[var(--color-ink-soft)]">{outline.pretest.description}</p>
              <p className="text-xs text-[var(--color-ink-soft)] mt-1 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {outline.pretest.questions} soal · {outline.pretest.minutes} menit</p>
              {lastPretest && (
                <p className="text-sm mt-2">
                  Hasil terakhir: <strong className="text-[var(--color-brand-blue)]">{lastPretest.total_score}</strong>{" "}
                  <Link href={`/learn/${slug}/exam/pretest?attempt=${lastPretest.id}`} className="text-xs text-[var(--color-brand-blue)] underline">lihat pembahasan</Link>
                </p>
              )}
            </div>
          </div>
          <Button href={outline.loggedIn ? `/learn/${slug}/exam/pretest` : `/login?next=/learn/${slug}`} variant={lastPretest ? "secondary" : "primary"} className="shrink-0">
            {lastPretest ? "Ulangi Pretest" : "Mulai Pretest"}
          </Button>
        </Card>
        )}

        {/* Levels */}
        {outline.levels.map((level) => (
          <div key={level.id} className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                {level.cover.length > 0 && (
                  <div className="flex -space-x-3 shrink-0">
                    {level.cover.map((pic) => (
                      <span key={pic} className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border-2 border-[var(--color-line)] flex items-center justify-center">
                        <Picture name={pic} className="w-11 h-11 md:w-12 md:h-12" />
                      </span>
                    ))}
                  </div>
                )}
                <h2 className="text-2xl md:text-3xl">{level.title}</h2>
              </div>
              <Badge variant="amber">{level.targetScore}</Badge>
            </div>
            <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">{level.description}</p>

            {level.locked ? (
              <Card className="flex items-center gap-3 border-dashed bg-white/60 font-[var(--font-inter)]">
                <Lock className="w-5 h-5 text-[var(--color-ink-soft)] shrink-0" />
                <p className="text-sm text-[var(--color-ink-soft)]">Modul ini belum dibuka. Pengajar akan membukanya saat kelasnya sudah sampai di topik ini.</p>
              </Card>
            ) : (
            <Card className="p-0 overflow-hidden">
              <ul className="divide-y divide-[var(--color-line)]">
                {level.pretest && (
                  <li>
                    {(() => {
                      const p = level.pretest;
                      const row = (
                        <div className={`flex items-center gap-4 p-4 font-[var(--font-inter)] bg-[var(--color-accent-yellow)]/10 ${p.unlocked ? "hover:bg-[var(--color-accent-yellow)]/20" : "opacity-60"}`}>
                          <span className="w-8 h-8 rounded-full bg-[var(--color-accent-yellow)] flex items-center justify-center shrink-0">
                            {p.passed ? <CheckCircle2 className="w-5 h-5 text-white" /> : p.unlocked ? <Target className="w-4 h-4 text-white" /> : <Lock className="w-4 h-4 text-white" />}
                          </span>
                          <div className="flex-1">
                            <p className="font-bold text-[var(--color-ink)]">{p.title}</p>
                            <p className="text-xs text-[var(--color-ink-soft)]">
                              {p.questions} soal · cek kemampuan awal sebelum belajar
                              {p.score !== null && ` · skor ${p.score}/${p.maxScore}`}
                            </p>
                          </div>
                        </div>
                      );
                      return p.unlocked ? <Link href={`/learn/${slug}/quiz/${p.id}`}>{row}</Link> : row;
                    })()}
                  </li>
                )}
                {level.lessons.map((lesson, i) => {
                  const row = (
                    <div className={`flex items-center gap-4 p-4 font-[var(--font-inter)] ${lesson.unlocked ? "hover:bg-[var(--color-paper-bg-alt)]/60" : "opacity-60"}`}>
                      <span className="w-8 h-8 rounded-full border-2 border-[var(--color-line)] flex items-center justify-center text-xs font-bold text-[var(--color-ink-soft)] shrink-0">
                        {lesson.done ? <CheckCircle2 className="w-5 h-5 text-[var(--color-success-green)]" /> : lesson.unlocked ? i + 1 : <Lock className="w-4 h-4" />}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-ink-soft)]">
                          <SkillIcon skill={lesson.skill} className="w-3.5 h-3.5" /> {SKILL_LABEL[lesson.skill]}{lesson.minutes ? ` · ${lesson.minutes} menit` : ""}
                        </div>
                        <p className="font-semibold text-[var(--color-ink)] truncate">{lesson.title}</p>
                        <p className="text-xs text-[var(--color-ink-soft)] line-clamp-1">{lesson.summary}</p>
                      </div>
                    </div>
                  );
                  return <li key={lesson.id}>{lesson.unlocked ? <Link href={`/learn/${slug}/lesson/${lesson.id}`}>{row}</Link> : row}</li>;
                })}
                <li>
                  {(() => {
                    const q = level.quiz;
                    const row = (
                      <div className={`flex items-center gap-4 p-4 font-[var(--font-inter)] bg-[var(--color-brand-blue)]/5 ${q.unlocked ? "hover:bg-[var(--color-brand-blue)]/10" : "opacity-60"}`}>
                        <span className="w-8 h-8 rounded-full bg-[var(--color-brand-blue)] flex items-center justify-center shrink-0">
                          {q.passed ? <CheckCircle2 className="w-5 h-5 text-white" /> : q.unlocked ? <ClipboardCheck className="w-4 h-4 text-white" /> : <Lock className="w-4 h-4 text-white" />}
                        </span>
                        <div className="flex-1">
                          <p className="font-bold text-[var(--color-brand-blue)]">{q.title}</p>
                          <p className="text-xs text-[var(--color-ink-soft)]">
                            {q.questions} soal{outline.quizSecondsPerQuestion ? ` · ${outline.quizSecondsPerQuestion} detik per soal` : ""} · {outline.openOrder ? `target ${q.passPercent}%` : `lulus minimal ${q.passPercent}% untuk lanjut`}
                            {q.score !== null && ` · nilai terbaik ${q.score}/${q.maxScore}`}
                          </p>
                        </div>
                      </div>
                    );
                    return q.unlocked ? <Link href={`/learn/${slug}/quiz/${q.id}`}>{row}</Link> : row;
                  })()}
                </li>
              </ul>
            </Card>
            )}
            {outline.isAdmin ? (
              (outline.adminLocks || level.hasLive) && (
                <AdminLevelControls
                  slug={slug}
                  levelId={level.id}
                  levelTitle={level.title}
                  adminLocks={outline.adminLocks}
                  openForStudents={level.openForStudents ?? true}
                  hasLive={level.hasLive}
                  live={level.live ?? null}
                  onChanged={load}
                />
              )
            ) : (
              !level.locked && level.hasLive && <LiveQuizWidget courseSlug={slug} levelId={level.id} />
            )}
          </div>
        ))}

        {outline.comingSoon && (
          <Card className="text-center py-6 border-dashed bg-white/50">
            <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">{outline.comingSoon}</p>
          </Card>
        )}

        {/* Tryout */}
        {outline.tryout && (
        <Card variant="sketch" className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent-coral)]/15 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6 text-[var(--color-accent-coral)]" />
            </div>
            <div className="font-[var(--font-inter)]">
              <h2 className="font-bold text-lg text-[var(--color-ink)]">{outline.tryout.title}</h2>
              <p className="text-sm text-[var(--color-ink-soft)]">{outline.tryout.description}</p>
              <p className="text-xs text-[var(--color-ink-soft)] mt-1 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {outline.tryout.questions} soal · {outline.tryout.minutes} menit</p>
              {bestTryout !== null && <p className="text-sm mt-2">Skor terbaik: <strong className="text-[var(--color-accent-coral)]">{bestTryout}</strong></p>}
              {outline.tryout.attempts.length > 0 && (
                <ul className="mt-2 text-xs text-[var(--color-ink-soft)] space-y-0.5">
                  {outline.tryout.attempts.slice(0, 3).map((a) => (
                    <li key={a.id}>
                      {a.submitted_at && formatTimestamp(a.submitted_at, "dd MMM yyyy")} — {a.total_score}{" "}
                      <Link href={`/learn/${slug}/exam/tryout?attempt=${a.id}`} className="text-[var(--color-brand-blue)] underline">pembahasan</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {outline.tryout.unlocked ? (
            <Button href={`/learn/${slug}/exam/tryout`} className="shrink-0">Mulai Tryout</Button>
          ) : (
            <span className="flex items-center gap-1.5 text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] shrink-0">
              <Lock className="w-4 h-4" /> Selesaikan semua level dulu
            </span>
          )}
        </Card>
        )}
      </div>
    </PaperBackground>
  );
}
