"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, LockOpen, PlayCircle, Radio, MonitorPlay } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type Props = {
  slug: string;
  levelId: string;
  levelTitle: string;
  /** Course has modules the admin opens one by one. */
  adminLocks: boolean;
  openForStudents: boolean;
  hasLive: boolean;
  live: { id: string; pin: string; status: string } | null;
  /** Re-fetch the course outline after a change. */
  onChanged: () => void;
};

/**
 * The admin's controls under a module on the course page: open or lock it
 * for students, and start (or return to) its live quiz. Students never
 * see this bar.
 */
export function AdminLevelControls({ slug, levelId, levelTitle, adminLocks, openForStudents, hasLive, live, onChanged }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState<"toggle" | "live" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggle = async () => {
    const open = !openForStudents;
    if (!open && !window.confirm(`Kunci lagi "${levelTitle}"? Peserta tidak bisa membukanya sampai dibuka kembali.`)) return;
    setBusy("toggle");
    setError(null);
    try {
      const res = await fetch("/api/admin/course-modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, levelId, open }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan status modul.");
    } finally {
      setBusy(null);
    }
  };

  const startLive = async () => {
    setBusy("live");
    setError(null);
    try {
      const res = await fetch("/api/live/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, levelId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      router.push(`/admin/live/${json.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memulai Live Quiz.");
      setBusy(null);
    }
  };

  return (
    <div className="rounded-[var(--radius-card)] border-2 border-dashed border-[var(--color-brand-blue)]/40 bg-[var(--color-brand-blue)]/5 px-4 py-3 font-[var(--font-inter)] space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-blue)]">Kontrol admin</span>
          {adminLocks && (openForStudents ? <Badge variant="green">Terbuka untuk peserta</Badge> : <Badge variant="outline">Terkunci untuk peserta</Badge>)}
          {live && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent-coral)]">
              <Radio className="w-3.5 h-3.5 animate-pulse" /> Live berjalan · PIN <span className="font-mono">{live.pin}</span>
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          {adminLocks && (
            <Button size="sm" variant={openForStudents ? "secondary" : "primary"} onClick={toggle} isLoading={busy === "toggle"}>
              {openForStudents ? <><Lock className="w-4 h-4" /> Kunci</> : <><LockOpen className="w-4 h-4" /> Buka untuk peserta</>}
            </Button>
          )}
          {hasLive &&
            (live ? (
              <Button size="sm" href={`/admin/live/${live.id}`}>
                <MonitorPlay className="w-4 h-4" /> Buka Layar Host
              </Button>
            ) : (
              <Button size="sm" variant="secondary" onClick={startLive} isLoading={busy === "live"} disabled={adminLocks && !openForStudents} title={adminLocks && !openForStudents ? "Buka modul untuk peserta dulu" : undefined}>
                <PlayCircle className="w-4 h-4" /> Mulai Live Quiz
              </Button>
            ))}
        </div>
      </div>
      {hasLive && adminLocks && !openForStudents && !live && (
        <p className="text-xs text-[var(--color-ink-soft)]">Buka modul ini untuk peserta dulu sebelum memulai Live Quiz.</p>
      )}
      {error && <p className="text-xs text-[var(--color-danger-red)]">{error}</p>}
    </div>
  );
}
