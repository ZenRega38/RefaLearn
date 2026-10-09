"use client";

import { useEffect, useState } from "react";
import { Radio } from "lucide-react";
import { Picture } from "@/components/course/pictures";
import { LivePlayer } from "@/components/live/LivePlayer";
import { Button } from "@/components/ui/Button";

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
        <Radio className="w-3.5 h-3.5" /> This module&apos;s Live Quiz will appear here when your teacher starts it.
      </p>
    );
  }

  return (
    <>
      <div className="sketch-card bg-white flex flex-col sm:flex-row sm:items-center gap-3 p-4 font-[var(--font-inter)] border-l-4 border-l-[var(--color-accent-coral)]">
        <Picture name="owl-cheer" className="w-14 h-14 shrink-0 hidden sm:block" />
        <div className="flex-1 min-w-0">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-coral)]">
            <span className="relative flex w-2.5 h-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-coral)] opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-[var(--color-accent-coral)]" />
            </span>
            Live now
          </p>
          <p className="text-xl font-[var(--font-kalam)] text-[var(--color-brand-blue)] leading-tight truncate">{active.title}</p>
          <p className="text-sm text-[var(--color-ink-soft)]">
            {active.status === "lobby" ? "Your teacher has opened the lobby. Join before the quiz starts!" : "The quiz is running. You can still join!"} · PIN{" "}
            <strong className="tracking-wider text-[var(--color-brand-blue)]">{active.pin}</strong>
          </p>
        </div>
        <Button onClick={() => setOpen(true)} className="shrink-0">
          Join Lobby
        </Button>
      </div>

      {open && (
        // Full screen above the navbar and chat bubble, so only the quiz shows.
        <div className="live-bg fixed inset-0 z-[70] overflow-y-auto flex flex-col" role="dialog" aria-modal="true" aria-label="Live Quiz">
          <div className="flex-1 w-full max-w-3xl mx-auto flex flex-col">
            <LivePlayer key={active.pin} pin={active.pin} onClose={() => setOpen(false)} fill />
          </div>
        </div>
      )}
    </>
  );
}
