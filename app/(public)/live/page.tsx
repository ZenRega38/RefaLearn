"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Picture } from "@/components/course/pictures";
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
    <div className="live-bg min-h-screen flex items-center justify-center px-4 pt-20 pb-10 font-[var(--font-inter)]">
      <LiveStyles />
      <form onSubmit={go} className="w-full max-w-sm bg-white rounded-2xl p-6 space-y-4 text-center shadow-2xl">
        <Picture name="owl-wave" className="w-24 h-24 mx-auto live-float" />
        <h1 className="text-2xl font-black text-[#3B2A6E]">Live Quiz</h1>
        <p className="text-sm text-[#5C574E]">Masukkan PIN dari layar pengajar. Tidak perlu login.</p>
        <input
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
          inputMode="numeric"
          autoComplete="off"
          placeholder="PIN"
          aria-label="PIN Live Quiz"
          className="w-full text-center text-3xl font-black tracking-[0.3em] text-[#3B2A6E] border-2 border-[#D8D0BD] rounded-xl py-3 focus:outline-none focus:border-[#7C3AED]"
          autoFocus
        />
        <button type="submit" disabled={!valid} className="w-full rounded-xl bg-[#3B2A6E] text-white py-3 text-lg font-black disabled:opacity-40">
          Masuk
        </button>
      </form>
    </div>
  );
}
