"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import { speak, speechSupported, type SpeechHandle } from "@/components/course/speech";

/** Markdown and blanks read badly; keep just the words. */
function plain(md: string): string {
  return md
    .replace(/\*\*|__|[*_`#>]/g, "")
    .replace(/_{2,}|…/g, " blank ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * A big speaker button for young learners: reads the question aloud so
 * children who can't read English yet can still follow the instruction.
 */
export function ReadAloudButton({ text, label }: { text: string; label: string }) {
  const [supported] = useState(() => speechSupported());
  const [playing, setPlaying] = useState(false);
  const handle = useRef<SpeechHandle | null>(null);

  useEffect(() => () => handle.current?.cancel(), []);
  if (!supported) return null;

  const play = () => {
    handle.current?.cancel();
    setPlaying(true);
    handle.current = speak([{ speaker: "woman", text: plain(text) }]);
    handle.current.done.then(() => setPlaying(false));
  };

  return (
    <button
      type="button"
      onClick={play}
      aria-label={label}
      title={label}
      className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center border-2 transition-colors ${playing ? "bg-[var(--color-accent-coral)] border-[var(--color-accent-coral)] text-white animate-pulse" : "bg-white border-[var(--color-accent-coral)]/60 text-[var(--color-accent-coral)] hover:bg-[var(--color-accent-coral)]/10"}`}
    >
      <Volume2 className="w-5 h-5" />
    </button>
  );
}
