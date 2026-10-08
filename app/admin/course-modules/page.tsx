"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Lock, LockOpen, RefreshCw, Radio, ExternalLink, PlayCircle } from "lucide-react";

type Level = { id: string; title: string; open: boolean; live: { title: string; questions: number } | null };
type Course = { slug: string; title: string; adminLocks: boolean; levels: Level[] };
type Running = { id: string; pin: string; course_slug: string; level_id: string; title: string; status: string; created_at: string };

async function fetchModules() {
  const res = await fetch("/api/admin/course-modules", { cache: "no-store" });
  const json = await res.json();
  return res.ok ? json : { error: json.error ?? "Gagal memuat modul." };
}

export default function AdminCourseModulesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [running, setRunning] = useState<Running[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apply = useCallback((json: { error?: string; courses?: Course[]; running?: Running[] }) => {
    if (json.error) return setError(json.error);
    setCourses(json.courses ?? []);
    setRunning(json.running ?? []);
  }, []);
  const load = useCallback(() => fetchModules().then(apply), [apply]);

  useEffect(() => {
    let alive = true;
    fetchModules().then((json) => alive && apply(json));
    return () => {
      alive = false;
    };
  }, [apply]);

  const toggle = async (course: Course, level: Level) => {
    const open = !level.open;
    if (!open && !window.confirm(`Kunci lagi "${level.title}"? Peserta tidak bisa membukanya sampai dibuka kembali.`)) return;
    setBusy(level.id);
    setError(null);
    const res = await fetch("/api/admin/course-modules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: course.slug, levelId: level.id, open }),
    });
    const json = await res.json();
    if (!res.ok) setError(json.error);
    await load();
    setBusy(null);
  };

  const startLive = async (course: Course, level: Level) => {
    setBusy(`live-${level.id}`);
    setError(null);
    const res = await fetch("/api/live/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: course.slug, levelId: level.id }),
    });
    const json = await res.json();
    setBusy(null);
    if (!res.ok) return setError(json.error);
    router.push(`/admin/live/${json.id}`);
  };

  return (
    <PaperBackground className="min-h-screen p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6 font-[var(--font-inter)]">
        <div>
          <h1 className="text-3xl md:text-4xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">Modul Kursus & Live Quiz</h1>
          <p className="text-sm text-[var(--color-ink-soft)]">
            Buka modul saat kelas sudah sampai di topiknya. Modul yang terkunci tetap terlihat judulnya, tapi isinya belum bisa dibuka peserta.
          </p>
        </div>

        {error && <p className="text-sm text-[var(--color-danger-red)]">{error}</p>}

        {running.length > 0 && (
          <Card variant="sketch" className="space-y-3 border-[var(--color-accent-coral)]">
            <p className="font-bold flex items-center gap-2 text-[var(--color-accent-coral)]"><Radio className="w-4 h-4 animate-pulse" /> Live Quiz yang masih berjalan</p>
            <ul className="space-y-2">
              {running.map((r) => (
                <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                  <span><strong>{r.title}</strong> · PIN <span className="font-mono font-bold">{r.pin}</span> · {r.status}</span>
                  <Button size="sm" href={`/admin/live/${r.id}`}>Buka Layar Host</Button>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {!courses ? (
          <RefreshCw className="w-6 h-6 animate-spin text-[var(--color-brand-blue)]" />
        ) : (
          courses.map((course) => (
            <Card key={course.slug} variant="sketch" className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-bold text-[var(--color-ink)]">{course.title}</h2>
                <Link href={`/learn/${course.slug}`} target="_blank" className="text-sm text-[var(--color-brand-blue)] inline-flex items-center gap-1 underline">
                  Lihat kursus <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
              <ul className="divide-y divide-[var(--color-line)] border border-[var(--color-line)] rounded-[var(--radius-card)] bg-white">
                {course.levels.map((level) => (
                  <li key={level.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[var(--color-ink)]">{level.title}</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {course.adminLocks && (level.open ? <Badge variant="green">Terbuka</Badge> : <Badge variant="outline">Terkunci</Badge>)}
                        {level.live && <Badge variant="blue">Live Quiz · {level.live.questions} soal</Badge>}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {course.adminLocks && (
                        <Button size="sm" variant={level.open ? "secondary" : "primary"} onClick={() => toggle(course, level)} isLoading={busy === level.id}>
                          {level.open ? <><Lock className="w-4 h-4" /> Kunci</> : <><LockOpen className="w-4 h-4" /> Buka</>}
                        </Button>
                      )}
                      {level.live && (
                        <Button size="sm" variant="secondary" onClick={() => startLive(course, level)} isLoading={busy === `live-${level.id}`} disabled={!level.open}>
                          <PlayCircle className="w-4 h-4" /> Mulai Live Quiz
                        </Button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          ))
        )}
      </div>
    </PaperBackground>
  );
}
