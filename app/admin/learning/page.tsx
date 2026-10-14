"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { ReviewList, type ReviewItem } from "@/components/course/ReviewList";
import { CourseLangProvider } from "@/components/course/lang";
import { Md } from "@/components/course/Md";
import { COURSES, courseUiLang } from "@/lib/course/registry";
import { formatTimestamp } from "@/lib/format";
import type { Passage, SectionResult } from "@/lib/course/types";
import { ClipboardList, RefreshCw, X, ChevronRight, PenLine, FileWarning } from "lucide-react";

type Person = { id: string; full_name: string; role: string };

type Entry = {
  id: string;
  source: "submission" | "exam";
  kind: "level_pretest" | "level_quiz" | "checkpoint" | "writing" | "pretest" | "tryout";
  studentId: string;
  studentName: string;
  studentRole: string;
  courseSlug: string;
  courseTitle: string;
  levelTitle: string | null;
  itemTitle: string;
  score: number | null;
  maxScore: number | null;
  passed: boolean | null;
  hasAnswers: boolean;
  at: string;
};

type Detail = Entry & {
  review: ReviewItem[] | null;
  passages: Passage[];
  sections: SectionResult[] | null;
  writing: { text: string; words: number; prompt: string; minWords: number | null; maxWords: number | null; models: { label: string; text: string; note?: string }[]; rubric: string[] } | null;
};

const KINDS: { value: Entry["kind"]; label: string; badge: "blue" | "coral" | "amber" | "green" | "outline" }[] = [
  { value: "level_pretest", label: "Pretest Bab", badge: "amber" },
  { value: "level_quiz", label: "Posttest / Quiz", badge: "blue" },
  { value: "checkpoint", label: "Checkpoint Materi", badge: "outline" },
  { value: "writing", label: "Tugas Menulis", badge: "green" },
  { value: "pretest", label: "Pretest Kursus", badge: "coral" },
  { value: "tryout", label: "Tryout", badge: "coral" },
];
const kindInfo = (k: Entry["kind"]) => KINDS.find((x) => x.value === k)!;

function ScoreText({ e }: { e: Entry }) {
  if (e.kind === "writing") return <span className="text-[var(--color-ink-soft)]">—</span>;
  if (e.score == null) return <span className="text-[var(--color-ink-soft)]">—</span>;
  if (e.maxScore == null) return <span className="font-bold text-[var(--color-brand-blue)]">{e.score}</span>;
  const pct = e.maxScore ? Math.round((e.score / e.maxScore) * 100) : 0;
  const tone = e.kind === "checkpoint" || e.kind === "level_pretest" ? "text-[var(--color-brand-blue)]" : e.passed ? "text-[var(--color-success-green)]" : "text-[var(--color-danger-red)]";
  return (
    <span className={`font-bold ${tone}`}>
      {e.score}/{e.maxScore} <span className="font-normal text-[var(--color-ink-soft)]">({pct}%)</span>
    </span>
  );
}

export default function AdminLearningPage() {
  const [supabase] = useState(() => createClient());
  const [people, setPeople] = useState<Person[]>([]);
  const [course, setCourse] = useState("");
  const [student, setStudent] = useState("");
  const [kind, setKind] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<Entry | null>(null);

  useEffect(() => {
    supabase
      .from("profiles")
      .select("id, full_name, role")
      .order("full_name")
      .then(({ data }) => setPeople((data || []) as Person[]));
  }, [supabase]);

  const load = useCallback(
    async (before?: string) => {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (course) params.set("course", course);
      if (student) params.set("student", student);
      if (kind) params.set("kind", kind);
      if (before) params.set("before", before);
      try {
        const res = await fetch(`/api/admin/course-activity?${params}`, { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        setEntries((prev) => (before ? [...prev, ...json.entries] : json.entries));
        setHasMore(json.hasMore);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat data.");
      } finally {
        setLoading(false);
      }
    },
    [course, student, kind]
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- refetch when a filter changes
    load();
  }, [load]);

  return (
    <PaperBackground className="p-4 md:p-8 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)] flex items-center gap-2">
            <ClipboardList className="w-8 h-8" /> Hasil Belajar
          </h1>
          <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] mt-1">
            Log semua pengerjaan siswa: pretest, posttest, checkpoint materi, tugas menulis, dan tryout. Klik satu baris untuk melihat jawaban siswa, kunci, dan soal mana yang salah.
          </p>
        </div>

        <Card className="grid sm:grid-cols-3 gap-3">
          <Select label="Kursus / modul" value={course} onChange={(e) => setCourse(e.target.value)}>
            <option value="">Semua kursus</option>
            {COURSES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.title}</option>
            ))}
          </Select>
          <Select label="Siswa" value={student} onChange={(e) => setStudent(e.target.value)}>
            <option value="">Semua siswa</option>
            {people.map((p) => (
              <option key={p.id} value={p.id}>{p.full_name || "Tanpa nama"}{p.role === "admin" ? " (admin)" : ""}</option>
            ))}
          </Select>
          <Select label="Jenis" value={kind} onChange={(e) => setKind(e.target.value)}>
            <option value="">Semua jenis</option>
            {KINDS.map((k) => (
              <option key={k.value} value={k.value}>{k.label}</option>
            ))}
          </Select>
        </Card>

        {error && <p className="text-sm text-[var(--color-danger-red)] font-[var(--font-inter)]">{error}</p>}

        <Card className="p-0 overflow-hidden">
          {entries.length === 0 && !loading ? (
            <p className="p-8 text-center text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">Belum ada pengerjaan untuk filter ini.</p>
          ) : (
            <ul className="divide-y divide-[var(--color-line)] font-[var(--font-inter)]">
              {entries.map((e) => {
                const info = kindInfo(e.kind);
                return (
                  <li key={`${e.source}-${e.id}`}>
                    <button onClick={() => setOpen(e)} className="w-full text-left p-3 md:p-4 flex items-center gap-3 hover:bg-[var(--color-paper-bg-alt)]">
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-bold text-[var(--color-ink)]">{e.studentName}</span>
                          {e.studentRole === "admin" && <Badge variant="outline">admin</Badge>}
                          <Badge variant={info.badge}>{info.label}</Badge>
                        </div>
                        <p className="text-sm text-[var(--color-ink)] truncate">
                          {e.levelTitle ? `${e.levelTitle} · ` : ""}{e.itemTitle}
                        </p>
                        <p className="text-xs text-[var(--color-ink-soft)] truncate">
                          {e.courseTitle} · {formatTimestamp(e.at, "dd MMM yyyy, HH:mm")}
                          {!e.hasAnswers && " · jawaban tidak tercatat"}
                        </p>
                      </div>
                      <div className="text-sm shrink-0 text-right"><ScoreText e={e} /></div>
                      <ChevronRight className="w-4 h-4 text-[var(--color-ink-soft)] shrink-0" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          {loading && (
            <p className="p-4 text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] flex items-center gap-2 justify-center">
              <RefreshCw className="w-4 h-4 animate-spin" /> Memuat...
            </p>
          )}
        </Card>

        {hasMore && !loading && (
          <div className="flex justify-center">
            <Button variant="secondary" onClick={() => load(entries[entries.length - 1]?.at)}>Muat lebih banyak</Button>
          </div>
        )}
      </div>

      {open && <DetailPanel entry={open} onClose={() => setOpen(null)} />}
    </PaperBackground>
  );
}

function DetailPanel({ entry, onClose }: { entry: Entry; onClose: () => void }) {
  const [detail, setDetail] = useState<Detail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/course-activity/${entry.id}?source=${entry.source}`, { cache: "no-store" })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        setDetail(json);
      })
      .catch((err: Error) => setError(err.message));
  }, [entry]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const info = kindInfo(entry.kind);
  const wrong = detail?.review?.filter((r) => !r.correct).length ?? 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-3xl h-full overflow-y-auto bg-[var(--color-paper-bg)] shadow-[var(--shadow-float)]">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 p-4 md:p-6 border-b border-[var(--color-line)] bg-[var(--color-paper-bg)]">
          <div className="min-w-0 space-y-1 font-[var(--font-inter)]">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={info.badge}>{info.label}</Badge>
              <span className="text-xs text-[var(--color-ink-soft)]">{formatTimestamp(entry.at, "dd MMM yyyy, HH:mm")}</span>
            </div>
            <h2 className="text-xl font-bold text-[var(--color-ink)]">{entry.studentName}</h2>
            <p className="text-sm text-[var(--color-ink)]">{entry.levelTitle ? `${entry.levelTitle} · ` : ""}{entry.itemTitle}</p>
            <p className="text-xs text-[var(--color-ink-soft)]">{entry.courseTitle}</p>
          </div>
          <button onClick={onClose} aria-label="Tutup" className="p-2 rounded-lg hover:bg-[var(--color-paper-bg-alt)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-5">
          {error && <p className="text-sm text-[var(--color-danger-red)] font-[var(--font-inter)]">{error}</p>}
          {!detail && !error && (
            <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" /> Memuat jawaban...
            </p>
          )}

          {detail && !detail.review && !detail.writing && (
            <Card className="flex items-start gap-3 font-[var(--font-inter)] text-sm text-[var(--color-ink)]">
              <FileWarning className="w-5 h-5 text-[var(--color-warning-amber)] shrink-0" />
              <p>
                Hasil ini dikerjakan sebelum log jawaban aktif, jadi hanya skornya yang tersimpan
                {detail.score != null && detail.maxScore != null ? ` (${detail.score}/${detail.maxScore})` : ""}. Pengerjaan berikutnya akan tercatat lengkap.
              </p>
            </Card>
          )}

          {detail?.review && (
            <>
              <Card className="font-[var(--font-inter)] text-sm text-[var(--color-ink)] flex flex-wrap gap-x-6 gap-y-2">
                <span>Benar: <strong className="text-[var(--color-success-green)]">{detail.review.length - wrong}</strong></span>
                <span>Salah / kosong: <strong className="text-[var(--color-danger-red)]">{wrong}</strong></span>
                <span>Total soal: <strong>{detail.review.length}</strong></span>
                {detail.kind === "checkpoint" && <span className="text-[var(--color-ink-soft)]">Yang ditampilkan adalah jawaban percobaan pertama.</span>}
                {detail.sections?.map((s) => (
                  <span key={s.skill} className="capitalize">{s.skill}: <strong>{s.correct}/{s.total}</strong> (skor {s.converted})</span>
                ))}
              </Card>
              <CourseLangProvider lang={courseUiLang(detail.courseSlug)}>
                <ReviewList items={detail.review} passages={detail.passages} />
              </CourseLangProvider>
            </>
          )}

          {detail?.writing && (
            <div className="space-y-4 font-[var(--font-inter)]">
              <Card className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-blue)] flex items-center gap-1.5"><PenLine className="w-4 h-4" /> Soal</p>
                <div className="text-sm text-[var(--color-ink)]"><Md text={detail.writing.prompt} /></div>
              </Card>
              <Card variant="sketch" className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-soft)]">
                  Jawaban siswa · {detail.writing.words} kata
                  {detail.writing.minWords ? ` · target min ${detail.writing.minWords}` : ""}
                  {detail.writing.maxWords ? ` · maks ${detail.writing.maxWords}` : ""}
                </p>
                <p className="text-[15px] leading-relaxed text-[var(--color-ink)] whitespace-pre-wrap">{detail.writing.text}</p>
              </Card>
              {detail.writing.models.length > 0 && (
                <details className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-[var(--color-ink)]">Contoh jawaban & rubrik</summary>
                  <div className="mt-3 space-y-3 text-sm">
                    {detail.writing.models.map((m, i) => (
                      <div key={i} className="rounded-[var(--radius-sketch)] bg-[var(--color-paper-bg-alt)] p-3 space-y-1">
                        <p className="font-bold text-[var(--color-brand-blue)]">{m.label}</p>
                        <div className="whitespace-pre-line"><Md text={m.text} /></div>
                      </div>
                    ))}
                    <ul className="list-disc pl-5 space-y-0.5">
                      {detail.writing.rubric.map((r, i) => <li key={i}><Md text={r} /></li>)}
                    </ul>
                  </div>
                </details>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
