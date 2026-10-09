"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, RotateCcw, Square, Eye, EyeOff, AlertTriangle } from "lucide-react";
import type { AudioScript } from "@/lib/course/types";
import { speak, speechSupported, type SpeechHandle } from "@/components/course/speech";
import { useCourseText } from "@/components/course/lang";

const LABEL = { man: "Man", woman: "Woman", narrator: "Narrator" } as const;

/**
 * Plays a listening script with the browser's voices.
 * - `once`: test mode — a single play, no stop/replay (as on the real ITP).
 * - `autoPlay`: start as soon as mounted (only works after the user has
 *   interacted with the page once).
 */
export function AudioPlayer({
  script,
  once = false,
  autoPlay = false,
  allowTranscript = false,
  onEnded,
  caption,
}: {
  script: AudioScript;
  once?: boolean;
  autoPlay?: boolean;
  allowTranscript?: boolean;
  onEnded?: () => void;
  caption?: string;
}) {
  const tx = useCourseText();
  const [state, setState] = useState<"idle" | "playing" | "done">("idle");
  const [line, setLine] = useState(-1);
  const [showText, setShowText] = useState(false);
  const handle = useRef<SpeechHandle | null>(null);
  const onEndedRef = useRef(onEnded);
  const [supported] = useState(() => speechSupported());

  useEffect(() => {
    onEndedRef.current = onEnded;
  }, [onEnded]);

  const play = () => {
    if (!supported) return;
    handle.current?.cancel();
    setState("playing");
    const h = speak(script, setLine);
    handle.current = h;
    h.done.then((finished) => {
      if (handle.current !== h) return;
      setState(finished ? "done" : "idle");
      setLine(-1);
      if (finished) onEndedRef.current?.();
    });
  };

  useEffect(() => {
    if (autoPlay && supported) {
      const t = setTimeout(play, 300);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- play once per mount
  }, []);

  useEffect(() => () => handle.current?.cancel(), []);

  if (!supported) {
    return (
      <div className="flex items-start gap-2 p-3 rounded-[var(--radius-card)] bg-amber-50 border border-amber-300 text-amber-900 text-sm font-[var(--font-inter)]">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
        <span>{tx.audioUnsupported}</span>
      </div>
    );
  }

  const canPlay = !once || state === "idle";

  return (
    <div className="rounded-[var(--radius-card)] border-2 border-[var(--color-brand-blue)]/30 bg-[var(--color-brand-blue)]/5 p-4 font-[var(--font-inter)]">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={state === "playing" && !once ? () => handle.current?.cancel() : play}
          disabled={!canPlay && state !== "playing"}
          aria-label={state === "playing" ? tx.stopAudio : tx.playAudio}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0 transition-transform ${state === "playing" ? "bg-[var(--color-accent-coral)] animate-pulse" : "bg-[var(--color-brand-blue)] hover:scale-105"} disabled:opacity-40 disabled:hover:scale-100`}
        >
          {state === "playing" ? (once ? <Volume2 className="w-5 h-5" /> : <Square className="w-4 h-4" />) : state === "done" && !once ? <RotateCcw className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <div className="flex-1 min-w-0 text-sm">
          <p className="font-semibold text-[var(--color-ink)]">
            {caption ?? (state === "playing" ? tx.listening : state === "done" ? (once ? tx.audioDone : tx.replay) : tx.playAudio)}
          </p>
          <p className="text-xs text-[var(--color-ink-soft)]">
            {once
              ? state === "idle" ? tx.playOnce : state === "playing" ? `${tx.playingNow}${line >= 0 ? ` · ${LABEL[script[line].speaker]}` : ""}` : tx.chooseAnswer
              : state === "playing" && line >= 0 ? LABEL[script[line].speaker] : tx.useHeadset}
          </p>
        </div>
        {allowTranscript && (
          <button type="button" onClick={() => setShowText((v) => !v)} className="text-xs text-[var(--color-brand-blue)] font-semibold flex items-center gap-1 shrink-0">
            {showText ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />} {tx.transcript}
          </button>
        )}
      </div>
      {allowTranscript && showText && (
        <div className="mt-3 pt-3 border-t border-dashed border-[var(--color-line)] space-y-1 text-sm">
          {script.map((l, i) => (
            <p key={i} className={i === line ? "text-[var(--color-brand-blue)] font-semibold" : "text-[var(--color-ink)]"}>
              <span className="text-[var(--color-ink-soft)] font-semibold">{LABEL[l.speaker]}:</span> {l.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
