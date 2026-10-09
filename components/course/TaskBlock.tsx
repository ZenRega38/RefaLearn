"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, PenLine, Square, RotateCcw, Timer, Volume2, Eye, EyeOff, CheckSquare, Square as Box } from "lucide-react";
import type { TaskBlock as Task } from "@/lib/course/types";
import { Md } from "@/components/course/Md";
import { Picture } from "@/components/course/pictures";
import { Button } from "@/components/ui/Button";
import { useCourseText } from "@/components/course/lang";
import { speak, speechSupported, type SpeechHandle } from "@/components/course/speech";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, "0")}`;
const countWords = (text: string) => (text.trim() ? text.trim().split(/\s+/).length : 0);

function readDraft(key: string): string {
  try {
    return window.localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}
function writeDraft(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* private mode */
  }
}

/** Counts down once started; calls onEnd at zero. */
function useCountdown(onEnd?: () => void) {
  const [left, setLeft] = useState<number | null>(null);
  const end = useRef(onEnd);
  useEffect(() => {
    end.current = onEnd;
  });
  useEffect(() => {
    if (left === null || left <= 0) return;
    const id = window.setTimeout(() => {
      setLeft((l) => (l === null ? null : l - 1));
      if (left - 1 <= 0) end.current?.();
    }, 1000);
    return () => window.clearTimeout(id);
  }, [left]);
  return { left, start: (s: number) => setLeft(s), reset: () => setLeft(null) };
}

/** Writing or speaking practice with model answers and a self-check rubric. */
export function TaskBlock({ task }: { task: Task }) {
  const t = useCourseText();
  const [showModels, setShowModels] = useState(false);
  const [ticks, setTicks] = useState<boolean[]>(() => task.rubric.map(() => false));
  const done = ticks.filter(Boolean).length;

  return (
    <div className="rounded-[var(--radius-card)] border-2 border-[var(--color-brand-blue)]/30 bg-white p-4 md:p-5 space-y-4 font-[var(--font-inter)]">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-brand-blue)]">
        {task.kind === "writing" ? <PenLine className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        {task.title ?? (task.kind === "writing" ? t.task.writing : t.task.speaking)}
      </p>
      {task.image && <Picture name={task.image} className="h-28 w-auto max-w-full mx-auto block" />}
      <div className="text-[var(--color-ink)]"><Md text={task.prompt} /></div>

      {task.tips && task.tips.length > 0 && (
        <div className="rounded-[var(--radius-sketch)] bg-[var(--color-accent-yellow)]/15 border border-[var(--color-accent-yellow)] p-3 text-sm">
          <p className="font-bold mb-1">{t.task.tips}</p>
          <ul className="list-disc pl-5 space-y-0.5">
            {task.tips.map((tip, i) => <li key={i}><Md text={tip} /></li>)}
          </ul>
        </div>
      )}

      {task.kind === "writing" ? <WritingArea task={task} /> : <SpeakingArea task={task} />}

      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onClick={() => setShowModels((s) => !s)}>
          {showModels ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />} {showModels ? t.task.hideModels : t.task.showModels}
        </Button>
      </div>

      {showModels && (
        <div className="space-y-3">
          {task.models.map((m, i) => (
            <ModelAnswer key={i} label={m.label} text={m.text} note={m.note} />
          ))}
          <div className="rounded-[var(--radius-sketch)] border border-[var(--color-line)] p-3 space-y-2">
            <p className="text-sm font-bold flex items-center justify-between">
              {t.task.selfCheck} <span className="text-xs font-semibold text-[var(--color-success-green)]">{t.task.checked(done, task.rubric.length)}</span>
            </p>
            <ul className="space-y-1.5">
              {task.rubric.map((r, i) => (
                <li key={i}>
                  <button type="button" onClick={() => setTicks((all) => all.map((v, j) => (j === i ? !v : v)))} className="w-full text-left flex items-start gap-2 text-sm">
                    {ticks[i] ? <CheckSquare className="w-4 h-4 mt-0.5 text-[var(--color-success-green)] shrink-0" /> : <Box className="w-4 h-4 mt-0.5 text-[var(--color-ink-soft)] shrink-0" />}
                    <span className={ticks[i] ? "text-[var(--color-ink)]" : "text-[var(--color-ink-soft)]"}><Md text={r} /></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function ModelAnswer({ label, text, note }: { label: string; text: string; note?: string }) {
  const t = useCourseText();
  const [canSpeak] = useState(() => speechSupported());
  const handle = useRef<SpeechHandle | null>(null);
  useEffect(() => () => handle.current?.cancel(), []);
  return (
    <div className="rounded-[var(--radius-sketch)] bg-[var(--color-paper-bg-alt)] p-3 space-y-1.5 text-sm">
      <div className="flex items-center justify-between gap-2">
        <p className="font-bold text-[var(--color-brand-blue)]">{label}</p>
        {canSpeak && (
          <button
            type="button"
            onClick={() => {
              handle.current?.cancel();
              handle.current = speak([{ speaker: "woman", text: text.replace(/[*_#>`]/g, "") }]);
            }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-brand-blue)] underline"
          >
            <Volume2 className="w-3.5 h-3.5" /> {t.task.listen}
          </button>
        )}
      </div>
      <div className="text-[var(--color-ink)] whitespace-pre-line"><Md text={text} /></div>
      {note && <div className="text-xs text-[var(--color-ink-soft)] italic"><Md text={note} /></div>}
    </div>
  );
}

function WritingArea({ task }: { task: Task }) {
  const t = useCourseText();
  const key = `task:${task.id}`;
  const [text, setText] = useState(() => (typeof window === "undefined" ? "" : readDraft(key)));
  const timer = useCountdown();
  const words = countWords(text);
  const target = t.task.wordTarget(task.minWords, task.maxWords);
  const inRange = (!task.minWords || words >= task.minWords) && (!task.maxWords || words <= task.maxWords);

  return (
    <div className="space-y-2">
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          writeDraft(key, e.target.value);
        }}
        rows={8}
        placeholder={t.task.writeHere}
        className="w-full rounded-[var(--radius-sketch)] border-2 border-[var(--color-line)] focus:border-[var(--color-brand-blue)] focus:outline-none p-3 text-[15px] leading-relaxed"
      />
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className={`font-semibold ${words === 0 ? "text-[var(--color-ink-soft)]" : inRange ? "text-[var(--color-success-green)]" : "text-[var(--color-warning-amber)]"}`}>
          {t.task.words(words)}{target && ` · ${target}`}
        </span>
        {task.seconds ? (
          timer.left === null ? (
            <button type="button" onClick={() => timer.start(task.seconds!)} className="inline-flex items-center gap-1 font-semibold text-[var(--color-brand-blue)]">
              <Timer className="w-3.5 h-3.5" /> {t.task.startTimer} ({t.task.suggestedTime(Math.round(task.seconds / 60))})
            </button>
          ) : (
            <span className={`font-bold ${timer.left <= 60 ? "text-[var(--color-danger-red)]" : "text-[var(--color-brand-blue)]"}`}>
              {timer.left > 0 ? t.task.timeLeft(fmt(timer.left)) : t.task.timeUp}
            </span>
          )
        ) : null}
      </div>
      <p className="text-[11px] text-[var(--color-ink-soft)]">{t.task.savedLocally}</p>
    </div>
  );
}

type Phase = "idle" | "prep" | "speaking" | "done";

function SpeakingArea({ task }: { task: Task }) {
  const t = useCourseText();
  const [phase, setPhase] = useState<Phase>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [micError, setMicError] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const stream = useRef<MediaStream | null>(null);

  const stopRecording = () => {
    if (recorder.current && recorder.current.state !== "inactive") recorder.current.stop();
    else setPhase("done");
  };
  const speakTimer = useCountdown(stopRecording);
  const prepTimer = useCountdown(() => void beginSpeaking());

  useEffect(
    () => () => {
      stream.current?.getTracks().forEach((tr) => tr.stop());
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    },
    [audioUrl]
  );

  async function beginSpeaking() {
    prepTimer.reset();
    setPhase("speaking");
    speakTimer.start(task.seconds ?? 60);
    try {
      if (!stream.current) stream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream.current);
      chunks.current = [];
      rec.ondataavailable = (e) => e.data.size && chunks.current.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunks.current, { type: rec.mimeType || "audio/webm" });
        setAudioUrl((old) => {
          if (old) URL.revokeObjectURL(old);
          return URL.createObjectURL(blob);
        });
        speakTimer.reset();
        setPhase("done");
      };
      rec.start();
      recorder.current = rec;
    } catch {
      setMicError(true);
    }
  }

  const start = () => {
    setMicError(false);
    if (task.prepSeconds) {
      setPhase("prep");
      prepTimer.start(task.prepSeconds);
    } else void beginSpeaking();
  };

  return (
    <div className="space-y-3">
      {phase === "idle" && (
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={start}>
            <Mic className="w-4 h-4" /> {task.prepSeconds ? t.task.startSpeaking : t.task.skipPrep}
          </Button>
          {task.prepSeconds ? (
            <Button size="sm" variant="ghost" onClick={() => void beginSpeaking()}>{t.task.skipPrep}</Button>
          ) : null}
        </div>
      )}
      {phase === "prep" && prepTimer.left !== null && (
        <div className="flex items-center gap-3 rounded-[var(--radius-sketch)] bg-[var(--color-accent-yellow)]/15 p-3">
          <Timer className="w-5 h-5 text-[var(--color-warning-amber)]" />
          <span className="font-bold">{t.task.prepare}: {fmt(prepTimer.left)}</span>
          <Button size="sm" variant="ghost" onClick={() => void beginSpeaking()}>{t.task.skipPrep}</Button>
        </div>
      )}
      {phase === "speaking" && (
        <div className="flex items-center gap-3 rounded-[var(--radius-sketch)] bg-[var(--color-danger-red)]/10 p-3">
          <span className="w-3 h-3 rounded-full bg-[var(--color-danger-red)] animate-pulse" />
          <span className="font-bold text-[var(--color-danger-red)]">{t.task.speakNow} {speakTimer.left !== null && fmt(speakTimer.left)}</span>
          <Button size="sm" variant="secondary" onClick={stopRecording}><Square className="w-4 h-4" /> {t.task.stop}</Button>
        </div>
      )}
      {micError && <p className="text-xs text-[var(--color-warning-amber)]">{t.task.micUnavailable}</p>}
      {phase === "done" && (
        <div className="space-y-2">
          {audioUrl && (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[var(--color-ink-soft)]">{t.task.yourRecording}</p>
              <audio src={audioUrl} controls className="w-full" />
            </div>
          )}
          <Button size="sm" variant="ghost" onClick={start}><RotateCcw className="w-4 h-4" /> {t.task.recordAgain}</Button>
        </div>
      )}
    </div>
  );
}
