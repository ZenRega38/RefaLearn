"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Picture } from "@/components/course/pictures";
import { Button } from "@/components/ui/Button";
import { LiveStyles } from "@/components/live/ui";

/** Enter a live-quiz PIN (the page the QR / short link on the projector points to). */
export default function LiveJoinPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const valid = /^\d{6}$/.test(pin);

  const go = (e: FormEvent) => {
    e.preventDefault();
    if (valid) router.push(`/live/${pin}`);
  };

  return (
    <div className="live-bg min-h-screen flex items-center justify-center px-4 pt-24 pb-10 font-[var(--font-inter)]">
      <LiveStyles />
      <form onSubmit={go} className="sketch-card w-full max-w-sm bg-white p-6 space-y-4 text-center">
        <Picture name="owl-wave" className="w-24 h-24 mx-auto live-float" />
        <h1 className="text-4xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">Live Quiz</h1>
        <p className="text-sm text-[var(--color-ink-soft)]">Masukkan PIN dari layar pengajar. Tidak perlu login.</p>
        <input
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
          inputMode="numeric"
          autoComplete="off"
          placeholder="PIN"
          aria-label="PIN Live Quiz"
          className="input-field w-full text-center text-3xl font-bold tracking-[0.3em] text-[var(--color-brand-blue)]"
          autoFocus
        />
        <Button type="submit" size="lg" className="w-full" disabled={!valid}>
          Masuk
        </Button>
      </form>
    </div>
  );
}
