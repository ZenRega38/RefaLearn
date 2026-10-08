"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { QuestionBlock } from "@/components/course/QuestionBlock";
import { isAnswered } from "@/components/course/QuestionInput";
import { ReviewList, type ReviewItem } from "@/components/course/ReviewList";
import type { Passage, PublicQuestion, Response } from "@/lib/course/types";
import { ArrowLeft, ArrowRight, RefreshCw, Trophy, RotateCcw, ClipboardCheck } from "lucide-react";

type QuizPayload = {
  quiz: { id: string; title: string; passPercent: number; passages: Passage[]; questions: PublicQuestion[] };
  level: { id: string; title: string };
};
type Result = { score: number; max: number; passed: boolean; passPercent: number; review: ReviewItem[] };

export default function LevelQuizPage() {
  const { slug, quizId } = useParams<{ slug: string; quizId: string }>();
  const [data, setData] = useState<QuizPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, Response | null>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    fetch(`/api/courses/${slug}/quiz/${quizId}`, { cache: "no-store" })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        setData(json);
      })
      .catch((err: Error) => setError(err.message));
  }, [slug, quizId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [index, result]);

  if (error || !data) {
    return (
      <PaperBackground className="pt-24 pb-20 min-h-screen">
        <div className="container-main max-w-2xl mx-auto text-center py-20 space-y-4 font-[var(--font-inter)]">
          {error ? (
            <>
              <p className="text-[var(--color-danger-red)]">{error}</p>
              <Button href={`/learn/${slug}`} variant="secondary">Kembali ke Kursus</Button>
            </>
          ) : (
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[var(--color-brand-blue)]" />
          )}
        </div>
      </PaperBackground>
    );
  }

  const { quiz } = data;
  const q = quiz.questions[index];
  const answered = quiz.questions.filter((x) => isAnswered(x, responses[x.id])).length;

  const submit = async () => {
    if (answered < quiz.questions.length && !window.confirm(`Masih ada ${quiz.questions.length - answered} soal kosong. Kumpulkan sekarang?`)) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/courses/${slug}/quiz/${quizId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setResult(json);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal mengumpulkan quiz.");
    } finally {
      setSubmitting(false);
    }
  };

  const retry = () => {
    setResponses({});
    setIndex(0);
    setResult(null);
    setAttempt((a) => a + 1);
  };

  return (
    <PaperBackground className="pt-24 pb-20 min-h-screen">
      <div className="container-main max-w-4xl mx-auto space-y-6">
        <Link href={`/learn/${slug}`} className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] font-[var(--font-inter)]">
          <ArrowLeft className="w-4 h-4" /> {data.level.title}
        </Link>

        <h1 className="text-3xl md:text-4xl flex items-center gap-3">
          <ClipboardCheck className="w-8 h-8 text-[var(--color-brand-blue)]" /> {quiz.title}
        </h1>

        {result ? (
          <div className="space-y-6">
            <Card variant="sketch" className="text-center space-y-4 py-8">
              <Trophy className={`w-14 h-14 mx-auto ${result.passed ? "text-[var(--color-accent-yellow)]" : "text-[var(--color-line)]"}`} />
              <p className="text-5xl font-bold font-[var(--font-inter)] text-[var(--color-brand-blue)]">
                {Math.round((result.score / result.max) * 100)}%
              </p>
              <p className="font-[var(--font-inter)] text-[var(--color-ink)]">
                {result.score} dari {result.max} benar ·{" "}
                {result.passed ? (
                  <strong className="text-[var(--color-success-green)]">Lulus! Level berikutnya terbuka.</strong>
                ) : (
                  <strong className="text-[var(--color-danger-red)]">Belum lulus (minimal {result.passPercent}%).</strong>
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {!result.passed && (
                  <Button onClick={retry}><RotateCcw className="w-4 h-4" /> Ulangi Quiz</Button>
                )}
                <Button href={`/learn/${slug}`} variant={result.passed ? "primary" : "secondary"}>Kembali ke Kursus</Button>
              </div>
            </Card>
            <h2 className="text-2xl">Pembahasan</h2>
            <ReviewList items={result.review} passages={quiz.passages} />
          </div>
        ) : (
          <>
            {/* Question navigator */}
            <div className="flex flex-wrap gap-1.5">
              {quiz.questions.map((x, i) => (
                <button
                  key={x.id}
                  onClick={() => setIndex(i)}
                  className={`w-9 h-9 rounded-md text-sm font-semibold font-[var(--font-inter)] border-2 ${i === index ? "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)] text-white" : isAnswered(x, responses[x.id]) ? "border-[var(--color-brand-blue)]/40 bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)]" : "border-[var(--color-line)] bg-white text-[var(--color-ink-soft)]"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <Card variant="sketch" className="p-5 md:p-8 space-y-4">
              <p className="text-xs font-semibold text-[var(--color-ink-soft)] font-[var(--font-inter)]">Soal {index + 1} dari {quiz.questions.length}</p>
              <QuestionBlock
                key={`${q.id}-${attempt}`}
                question={q}
                passages={quiz.passages}
                value={responses[q.id] ?? null}
                onChange={(r) => setResponses((prev) => ({ ...prev, [q.id]: r }))}
              />
            </Card>

            <div className="flex justify-between gap-3">
              <Button variant="ghost" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>
                <ArrowLeft className="w-4 h-4" /> Sebelumnya
              </Button>
              {index < quiz.questions.length - 1 ? (
                <Button onClick={() => setIndex((i) => i + 1)}>Lanjut <ArrowRight className="w-4 h-4" /></Button>
              ) : (
                <Button onClick={submit} isLoading={submitting}>Kumpulkan ({answered}/{quiz.questions.length})</Button>
              )}
            </div>
          </>
        )}
      </div>
    </PaperBackground>
  );
}
