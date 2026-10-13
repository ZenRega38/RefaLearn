"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Flame, Zap } from "lucide-react";
import { XP_EVENT, type GamificationStats, type XpEventDetail } from "@/lib/gamification";

type Toast = { id: number; xp: number; label?: string };

/**
 * Navbar badge for a signed-in user: study streak (flame) and total XP.
 * Mounting it does the daily check-in (the server pays the login XP once
 * per day), and it shows a "+XP" toast whenever a page announces XP
 * (see announceXp in lib/gamification).
 */
export function XpBadge() {
  const [stats, setStats] = useState<GamificationStats | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const push = useCallback((xp: number, label?: string) => {
    const id = ++nextId.current;
    setToasts((t) => [...t, { id, xp, label }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const refresh = useCallback(() => {
    fetch("/api/me/gamification", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => j?.stats && setStats(j.stats))
      .catch(() => {});
  }, []);

  useEffect(() => {
    let alive = true;
    fetch("/api/me/gamification", { method: "POST" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!alive || !j) return;
        setStats(j.stats);
        if (j.awarded > 0) push(j.awarded, "Login harian");
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [push]);

  useEffect(() => {
    const onXp = (e: Event) => {
      const { xp, label } = (e as CustomEvent<XpEventDetail>).detail;
      push(xp, label);
      refresh();
    };
    window.addEventListener(XP_EVENT, onXp);
    return () => window.removeEventListener(XP_EVENT, onXp);
  }, [push, refresh]);

  return (
    <>
      {stats && (
        <Link
          href="/dashboard"
          id="nav-xp-badge"
          title={`Level ${stats.level.level} ${stats.title} · Streak belajar ${stats.study.current} hari · Streak login ${stats.login.current} hari`}
          className="flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white/80 px-3 py-1.5 text-xs font-bold hover:border-[var(--color-accent-coral)] transition-colors"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          <span className={`flex items-center gap-1 ${stats.study.doneToday ? "text-[var(--color-accent-coral)]" : "text-[var(--color-ink-soft)]"}`}>
            <Flame className={`w-4 h-4 ${stats.study.doneToday ? "fill-[var(--color-accent-yellow)]" : ""}`} />
            {stats.study.current}
          </span>
          <span className="flex items-center gap-1 text-[var(--color-brand-blue)]">
            <Zap className="w-4 h-4 fill-[var(--color-accent-yellow)] text-[var(--color-warning-amber)]" />
            {stats.totalXp.toLocaleString("id-ID")}
            <span className="hidden sm:inline">XP</span>
          </span>
        </Link>
      )}

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-2 pointer-events-none" aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-xp-pop flex items-center gap-2 rounded-full bg-[var(--color-brand-blue)] text-white px-4 py-2 shadow-[var(--shadow-float)] text-sm font-bold"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            <Zap className="w-4 h-4 fill-[var(--color-accent-yellow)] text-[var(--color-accent-yellow)]" />
            +{t.xp} XP{t.label ? <span className="font-medium opacity-90">· {t.label}</span> : null}
          </div>
        ))}
      </div>
    </>
  );
}
