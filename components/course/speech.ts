"use client";

import type { AudioScript, Speaker } from "@/lib/course/types";

// Listening audio is spoken by the browser (Web Speech API) — no audio
// files. Voices differ per device, so we pick the best available US
// English voices per speaker and fall back to pitch differences when a
// device only has one English voice.

const FEMALE = /(female|woman|zira|aria|jenny|samantha|susan|karen|victoria|allison|ava|joanna|salli|google us english)/i;
const MALE = /(male|man|david|guy|mark|daniel|alex|fred|tom|matthew|joey|christopher)/i;

export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
}

function voicesNow(): Promise<SpeechSynthesisVoice[]> {
  const synth = window.speechSynthesis;
  const list = synth.getVoices();
  if (list.length) return Promise.resolve(list);
  return new Promise((resolve) => {
    const done = () => resolve(synth.getVoices());
    synth.addEventListener("voiceschanged", done, { once: true });
    setTimeout(done, 1500);
  });
}

type Cast = Record<Speaker, { voice: SpeechSynthesisVoice | null; pitch: number; rate: number }>;
let castCache: Cast | null = null;

async function cast(): Promise<Cast> {
  if (castCache) return castCache;
  const voices = await voicesNow();
  const english = voices.filter((v) => /^en(-|_)?US/i.test(v.lang));
  const pool = english.length ? english : voices.filter((v) => /^en/i.test(v.lang));
  const woman = pool.find((v) => FEMALE.test(v.name) && !MALE.test(v.name)) ?? pool[0] ?? null;
  const man = pool.find((v) => MALE.test(v.name) && v !== woman) ?? pool.find((v) => v !== woman) ?? woman;
  const narrator = pool.find((v) => v !== woman && v !== man) ?? man;
  const distinct = man !== woman;
  castCache = {
    woman: { voice: woman, pitch: distinct ? 1 : 1.25, rate: 0.95 },
    man: { voice: man, pitch: distinct ? 1 : 0.8, rate: 0.95 },
    narrator: { voice: narrator, pitch: 1, rate: 0.92 },
  };
  return castCache;
}

/** Splits long text into sentences — Chrome cuts off utterances after ~15 s. */
function sentences(text: string): string[] {
  return text.match(/[^.!?]+[.!?]+["']?|\S[^.!?]*$/g)?.map((s) => s.trim()).filter(Boolean) ?? [text];
}

export type SpeechHandle = { cancel: () => void; done: Promise<boolean> };

/**
 * Speaks the script line by line. `done` resolves true when finished, false
 * if cancelled. Must first be called from a user gesture (browser rule).
 */
export function speak(script: AudioScript, onLine?: (index: number) => void): SpeechHandle {
  const synth = window.speechSynthesis;
  let cancelled = false;
  synth.cancel();

  const done = (async () => {
    const roles = await cast();
    for (let i = 0; i < script.length; i++) {
      if (cancelled) return false;
      onLine?.(i);
      const { speaker, text } = script[i];
      const role = roles[speaker];
      for (const part of sentences(text)) {
        if (cancelled) return false;
        await new Promise<void>((resolve) => {
          const u = new SpeechSynthesisUtterance(part);
          if (role.voice) u.voice = role.voice;
          u.lang = role.voice?.lang || "en-US";
          u.pitch = role.pitch;
          u.rate = role.rate;
          u.onend = () => resolve();
          u.onerror = () => resolve();
          synth.speak(u);
        });
      }
      // Short pause between speakers, longer before the narrator's question.
      await new Promise((r) => setTimeout(r, script[i + 1]?.speaker === "narrator" ? 700 : 350));
    }
    return !cancelled;
  })();

  return {
    cancel: () => {
      cancelled = true;
      synth.cancel();
    },
    done,
  };
}
