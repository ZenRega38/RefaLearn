"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Md } from "@/components/course/Md";
import { QuestionBlock } from "@/components/course/QuestionBlock";
import { isAnswered } from "@/components/course/QuestionInput";
import { ExamResultView } from "@/components/course/ExamResultView";
import { SkillIcon } from "@/components/course/skill";
import { speak, speechSupported } from "@/components/course/speech";
import type { ExamResult, Passage, PublicQuestion, Response, Skill } from "@/lib/course/types";
import { ArrowLeft, ArrowRight, Clock, Headphones, RefreshCw, AlertTriangle, Volume2 } from "lucide-react";

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

  const [phase, setPhase] = useState<"loading" | "intro" | "section-intro" | "running" | "submitting" | "result" | "error">(attemptParam ? "loading" : "intro");
  const [error, setError] = useState<string | null>(null);
  const [exam, setExam] = useState<ExamView | null>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [state, setState] = useState<Saved>({ section: 0, sectionStartedAt: null, index: 0, responses: {} });
  const [result, setResult] = useState<{ result: ExamResult; layout: Layout } | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [answerDeadline, setAnswerDeadline] = useState<number | null>(null);
  const [starting, setStarting] = useState(false);
  const [tts] = useState(() => speechSupported());

  const storageKey = attemptId ? `refalearn-exam-${attemptId}` : null;

  // Viewing a finished attempt (?attempt=…)
  useEffect(() => {
    if (!attemptParam) return;
    fetch(`/api/courses/${slug}/exam/${kind}?attemptId=${attemptParam}`, { cache: "no-store" })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        setResult(json);
        setPhase("result");
      })
      .catch((err: Error) => {
        setError(err.message);
        setPhase("error");
      });
  }, [attemptParam, slug, kind]);

  // Persist progress so a reload resumes where the student was.
  useEffect(() => {
    if (!storageKey || phase === "result") return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // storage unavailable — the attempt still works, it just won't resume
    }
  }, [storageKey, state, phase]);

  const section = exam?.sections[state.section];

  const submit = useCallback(async (responses: Record<string, Response | null>) => {
    if (!attemptId) return;
    setPhase("submitting");
    try {
      const res = await fetch(`/api/courses/${slug}/exam/${kind}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "submit", attemptId, responses }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      try { localStorage.removeItem(`refalearn-exam-${attemptId}`); } catch { /* ignore */ }
      setResult(json);
      setPhase("result");
      window.history.replaceState(null, "", `/learn/${slug}/exam/${kind}?attempt=${attemptId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengumpulkan jawaban.");
      setPhase("error");
    }
  }, [attemptId, slug, kind]);

  const finishSection = useCallback(() => {
    if (!exam) return;
    setAnswerDeadline(null);
    if (state.section >= exam.sections.length - 1) {
      submit(state.responses);
    } else {
      setState((s) => ({ ...s, section: s.section + 1, index: 0, sectionStartedAt: null }));
      setPhase("section-intro");
    }
  }, [exam, state.section, state.responses, submit]);

  const advanceListening = useCallback(() => {
    if (!section) return;
    setAnswerDeadline(null);
    if (state.index >= section.questions.length - 1) finishSection();
    else setState((s) => ({ ...s, index: s.index + 1 }));
  }, [section, state.index, finishSection]);

  // Clock: section time limit and the listening answer window.
  const tickRef = useRef<() => void>(() => {});
  useEffect(() => {
    tickRef.current = () => {
      const t = Date.now();
      setNow(t);
      if (phase !== "running" || !section || !state.sectionStartedAt) return;
      if (t - state.sectionStartedAt >= section.minutes * 60_000) finishSection();
      else if (answerDeadline && t >= answerDeadline) advanceListening();
    };
  });
  useEffect(() => {
    const id = setInterval(() => tickRef.current(), 250);
    return () => clearInterval(id);
  }, []);

  const start = async () => {
    setStarting(true);
    // Speak a silent warm-up inside this click so later auto-play is allowed.
    if (tts) speak([{ speaker: "narrator", text: " " }]);
    try {
      const res = await fetch(`/api/courses/${slug}/exam/${kind}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "start" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setExam(json.exam);
      setAttemptId(json.attemptId);
      let saved: Saved | null = null;
      try {
        const raw = localStorage.getItem(`refalearn-exam-${json.attemptId}`);
        saved = raw ? (JSON.parse(raw) as Saved) : null;
      } catch { /* ignore */ }
      if (saved) {
        setState(saved);
        setPhase(saved.sectionStartedAt ? "running" : "section-intro");
      } else {
        setPhase("section-intro");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memulai ujian.");
      setPhase("error");
    } finally {
      setStarting(false);
    }
  };

  const setResponse = (id: string, r: Response) =>
    setState((s) => ({ ...s, responses: { ...s.responses, [id]: r } }));

  // ------------------------------------------------------------------ views

  if (phase === "result" && result) {
    return (
      <Shell slug={slug}>
        <ExamResultView result={result.result} sections={result.layout} slug={slug} />
      </Shell>
    );
  }

  if (phase === "error") {
    return (
      <Shell slug={slug}>
        <Card className="text-center py-12 space-y-4">
          <p className="text-[var(--color-danger-red)] font-[var(--font-inter)]">{error}</p>
          <Button href={`/learn/${slug}`} variant="secondary">Kembali ke Kursus</Button>
        </Card>
      </Shell>
    );
  }

  if (phase === "loading" || phase === "submitting") {
    return (
      <Shell slug={slug}>
        <div className="text-center py-20 text-[var(--color-ink-soft)] font-[var(--font-inter)]">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-[var(--color-brand-blue)]" />
          {phase === "submitting" ? "Menilai jawaban Anda..." : "Memuat..."}
        </div>
      </Shell>
    );
  }

  if (phase === "intro") {
    return (
      <Shell slug={slug}>
        <Card variant="sketch" className="space-y-5 p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl">{kind === "pretest" ? "Pretest TOEFL ITP" : "Tryout TOEFL ITP"}</h1>
          <div className="font-[var(--font-inter)] text-[var(--color-ink)] space-y-3 text-sm md:text-base">
            <p>Format mengikuti TOEFL ITP: <strong>Listening → Structure & Written Expression → Reading</strong>. Setiap section punya batas waktu sendiri dan Anda <strong>tidak bisa kembali</strong> ke section sebelumnya.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Listening: audio diputar <strong>satu kali</strong> secara otomatis. Setelah audio selesai, Anda punya {ANSWER_SECONDS} detik untuk menjawab sebelum soal berikutnya.</li>
              <li>Structure & Reading: Anda bebas berpindah soal di dalam section.</li>
              <li>Tidak ada pengurangan nilai — jawab semua soal.</li>
              <li>Jika halaman tidak sengaja tertutup, buka lagi halaman ini untuk melanjutkan.</li>
            </ul>
          </div>
          {!tts && (
            <div className="flex items-start gap-2 p-3 rounded-[var(--radius-card)] bg-amber-50 border border-amber-300 text-amber-900 text-sm font-[var(--font-inter)]">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              Browser ini tidak bisa memutar audio Listening. Gunakan Chrome, Edge, atau Safari terbaru.
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between pt-2">
            {tts && (
              <button
                type="button"
                onClick={() => speak([{ speaker: "woman", text: "This is a sound check." }, { speaker: "man", text: "If you can hear us clearly, you are ready." }])}
                className="flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-blue)] font-[var(--font-inter)]"
              >
                <Volume2 className="w-4 h-4" /> Tes suara & headset
              </button>
            )}
            <Button onClick={start} isLoading={starting} size="lg">Mulai</Button>
          </div>
        </Card>
      </Shell>
    );
  }

  if (!exam || !section) return null;

  if (phase === "section-intro") {
    return (
      <Shell slug={slug}>
        <Card variant="sketch" className="space-y-5 p-6 md:p-10">
          <p className="text-sm font-semibold text-[var(--color-ink-soft)] font-[var(--font-inter)] flex items-center gap-2">
            <SkillIcon skill={section.skill} /> Section {state.section + 1} dari {exam.sections.length}
          </p>
          <h1 className="text-3xl md:text-4xl">{section.title}</h1>
          <p className="font-[var(--font-inter)] text-[var(--color-ink-soft)] flex items-center gap-1.5"><Clock className="w-4 h-4" /> {section.questions.length} soal · {section.minutes} menit</p>
          <div className="font-[var(--font-inter)] text-[var(--color-ink)]"><Md text={section.directions} /></div>
          {section.skill === "listening" && (
            <p className="flex items-center gap-2 text-sm font-[var(--font-inter)] text-[var(--color-brand-blue)]"><Headphones className="w-4 h-4" /> Pakai headset dan pastikan volume cukup.</p>
          )}
          <div className="flex justify-end">
            <Button
              size="lg"
              onClick={() => {
                if (tts && section.skill === "listening") speak([{ speaker: "narrator", text: " " }]);
                setState((s) => ({ ...s, sectionStartedAt: Date.now() }));
                setPhase("running");
              }}
            >
              Mulai Section {state.section + 1}
            </Button>
          </div>
        </Card>
      </Shell>
    );
  }

  // ---------------------------------------------------------------- running
  const q = section.questions[state.index];
  const remaining = section.minutes * 60_000 - (now - (state.sectionStartedAt ?? now));
  const part = section.parts.find((p) => p.questionIds.includes(q.id));
  const answeredCount = section.questions.filter((x) => isAnswered(x, state.responses[x.id])).length;
  const listening = section.skill === "listening";

  return (
    <Shell slug={slug} wide>
      {/* Sticky exam bar */}
      <div className="sticky top-16 md:top-20 z-30 -mx-4 px-4 py-3 bg-[var(--color-paper-bg)]/95 backdrop-blur border-b border-[var(--color-line)] flex items-center justify-between gap-3 font-[var(--font-inter)]">
        <div className="flex items-center gap-2 min-w-0">
          <SkillIcon skill={section.skill} className="w-5 h-5 shrink-0" />
          <span className="font-semibold text-[var(--color-ink)] truncate">{section.title.replace(/^Section \d+: /, "")}</span>
          {part && <span className="hidden sm:inline text-xs text-[var(--color-ink-soft)]">· {part.title}</span>}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-[var(--color-ink-soft)]">{answeredCount}/{section.questions.length}</span>
          <span className={`flex items-center gap-1 font-bold tabular-nums ${remaining < 60_000 ? "text-[var(--color-danger-red)]" : "text-[var(--color-ink)]"}`}>
            <Clock className="w-4 h-4" /> {fmt(remaining)}
          </span>
        </div>
      </div>

      <div className="space-y-5 pt-5">
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
                onClick={() => setState((s) => ({ ...s, index: i }))}
                className={`w-9 h-9 rounded-md text-xs font-semibold font-[var(--font-inter)] border-2 ${i === state.index ? "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)] text-white" : isAnswered(x, state.responses[x.id]) ? "border-[var(--color-brand-blue)]/40 bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)]" : "border-[var(--color-line)] bg-white text-[var(--color-ink-soft)]"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        <Card variant="sketch" className="p-5 md:p-8 space-y-4">
          <p className="text-xs font-semibold text-[var(--color-ink-soft)] font-[var(--font-inter)]">
            {part?.title} · Soal {state.index + 1}
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
              Soal berikutnya dalam <strong className="text-[var(--color-accent-coral)] tabular-nums">{fmt(answerDeadline - now)}</strong>
            </p>
          )}
        </Card>

        {listening ? (
          <div className="flex justify-end">
            <Button onClick={advanceListening} disabled={!answerDeadline && tts}>
              {state.index >= section.questions.length - 1 ? "Selesai Section" : "Soal Berikutnya"} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex justify-between gap-3">
            <Button variant="ghost" onClick={() => setState((s) => ({ ...s, index: Math.max(0, s.index - 1) }))} disabled={state.index === 0}>
              <ArrowLeft className="w-4 h-4" /> Sebelumnya
            </Button>
            {state.index < section.questions.length - 1 ? (
              <Button onClick={() => setState((s) => ({ ...s, index: s.index + 1 }))}>Lanjut <ArrowRight className="w-4 h-4" /></Button>
            ) : (
              <Button
                onClick={() => {
                  const left = section.questions.length - answeredCount;
                  const msg = state.section >= exam.sections.length - 1
                    ? `Kumpulkan ujian sekarang?${left ? ` Masih ada ${left} soal kosong.` : ""}`
                    : `Selesaikan section ini? Anda tidak bisa kembali.${left ? ` Masih ada ${left} soal kosong.` : ""}`;
                  if (window.confirm(msg)) finishSection();
                }}
              >
                {state.section >= exam.sections.length - 1 ? "Kumpulkan Ujian" : "Selesai Section"}
              </Button>
            )}
          </div>
        )}
      </div>
    </Shell>
  );
}

function Shell({ slug, wide = false, children }: { slug: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <PaperBackground className="pt-24 pb-20 min-h-screen">
      <div className={`container-main ${wide ? "max-w-6xl" : "max-w-4xl"} mx-auto space-y-4`}>
        <Link href={`/learn/${slug}`} className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] font-[var(--font-inter)]">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Kursus
        </Link>
        {children}
      </div>
    </PaperBackground>
  );
}
