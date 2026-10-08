"use client";

import { useEffect, useState } from "react";
import { Radio } from "lucide-react";
import { Picture } from "@/components/course/pictures";
import { LivePlayer } from "@/components/live/LivePlayer";

type Active = { pin: string; title: string; status: string } | null;

/**
 * Inside a module: shows a banner when the teacher has opened a live quiz
 * for it, and lets the student join right here (no QR or PIN needed).
 * Checks every few seconds while the tab is visible.
 */
export function LiveQuizWidget({ courseSlug, levelId, compact = false }: { courseSlug: string; levelId: string; compact?: boolean }) {
  const [active, setActive] = useState<Active>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let stop = false;
    let timer = 0;
    const check = async () => {
      if (document.visibilityState === "visible" || !stop) {
        try {
          const res = await fetch(`/api/live/active?course=${encodeURIComponent(courseSlug)}&level=${encodeURIComponent(levelId)}`, { cache: "no-store" });
          const json = await res.json();
          if (!stop) setActive(json.session ?? null);
        } catch {
          /* try again next round */
        }
      }
      if (!stop) timer = window.setTimeout(check, open ? 15000 : 6000);
    };
    check();
    return () => {
      stop = true;
      window.clearTimeout(timer);
    };
  }, [courseSlug, levelId, open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!active) {
    if (compact) return null;
    return (
      <p className="flex items-center gap-2 text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">
        <Radio className="w-3.5 h-3.5" /> Live Quiz modul ini akan muncul di sini saat pengajar memulainya.
      </p>
    );
  }

  return (
    <>
      <div className="live-banner flex flex-col sm:flex-row sm:items-center gap-3 rounded-[var(--radius-card)] p-4 text-white font-[var(--font-inter)] shadow-lg" style={{ background: "linear-gradient(135deg, #3B2A6E, #7C3AED 60%, #EC4899)" }}>
        <Picture name="owl-cheer" className="w-14 h-14 shrink-0 hidden sm:block" />
        <div className="flex-1 min-w-0">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
            <span className="relative flex w-2.5 h-2.5"><span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" /><span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-red-500" /></span>
            Live sekarang
          </p>
          <p className="font-black text-lg leading-tight truncate">{active.title}</p>
          <p className="text-sm opacity-90">
            {active.status === "lobby" ? "Lobi sudah dibuka pengajar. Yuk masuk sebelum kuis dimulai!" : "Kuis sedang berlangsung. Kamu masih bisa ikut!"} · PIN <strong className="tracking-wider">{active.pin}</strong>
          </p>
        </div>
        <button type="button" onClick={() => setOpen(true)} className="shrink-0 rounded-xl bg-[#FFE45C] text-[#3B2A6E] px-5 py-2.5 font-black shadow-[0_4px_0_rgba(0,0,0,0.25)] active:translate-y-1 active:shadow-none">
          Masuk Lobi
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-stretch sm:items-center justify-center sm:p-6" role="dialog" aria-modal="true" aria-label="Live Quiz">
          <div className="relative w-full max-w-3xl max-h-full overflow-y-auto sm:rounded-2xl">
            <LivePlayer key={active.pin} pin={active.pin} onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
