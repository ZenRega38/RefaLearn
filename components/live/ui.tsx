"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Flame } from "lucide-react";
import { Picture } from "@/components/course/pictures";
import type { LiveBoardRow } from "@/lib/live/types";
import { liveAudio } from "@/components/live/audio";

// Shared pieces of the live quiz UI: answer tiles, timers, the scoreboard
// and the podium. Everything sits on the site's paper look (cream paper,
// Kalam headings, Inter text, sketch cards); only the four answer colours
// stay bright so players can match them at a glance.

export const ANSWER_STYLES = [
  { bg: "#E21B3C", shape: "triangle", label: "Merah" },
  { bg: "#1368CE", shape: "diamond", label: "Biru" },
  { bg: "#D89E00", shape: "circle", label: "Kuning" },
  { bg: "#26890C", shape: "square", label: "Hijau" },
] as const;

export function Shape({ shape, className = "w-7 h-7" }: { shape: (typeof ANSWER_STYLES)[number]["shape"]; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      {shape === "triangle" && <path d="M16 4 L29 27 H3 Z" fill="white" />}
      {shape === "diamond" && <path d="M16 3 L29 16 L16 29 L3 16 Z" fill="white" />}
      {shape === "circle" && <circle cx="16" cy="16" r="12.5" fill="white" />}
      {shape === "square" && <rect x="5" y="5" width="22" height="22" rx="2" fill="white" />}
    </svg>
  );
}

/** Keeps a server-clock offset so every device counts down the same deadline. */
export function useServerClock(serverNow: number | undefined) {
  const offset = useRef(0);
  useEffect(() => {
    if (serverNow) offset.current = serverNow - Date.now();
  }, [serverNow]);
  return () => Date.now() + offset.current;
}

/** Re-renders a few times per second while active. */
export function useTicker(active: boolean, ms = 200) {
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setTick((t) => t + 1), ms);
    return () => window.clearInterval(id);
  }, [active, ms]);
}

/** Circular countdown; ticks audibly in the last five seconds when `sound`. */
export function CountdownRing({ endsAt, total, now, sound = false, size = 88 }: { endsAt: number; total: number; now: () => number; sound?: boolean; size?: number }) {
  useTicker(true, 100);
  const left = Math.max(0, (endsAt - now()) / 1000);
  const whole = Math.ceil(left);
  const lastTick = useRef<number | null>(null);
  useEffect(() => {
    if (sound && whole <= 5 && whole > 0 && lastTick.current !== whole) {
      lastTick.current = whole;
      liveAudio().sfx("tick");
    }
  }, [whole, sound]);
  const r = 40;
  const c = 2 * Math.PI * r;
  const frac = Math.min(1, left / total);
  const urgent = whole <= 5;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="white" stroke="var(--color-line-light)" strokeWidth="10" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={urgent ? "var(--color-danger-red)" : "var(--color-brand-blue)"}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - frac)}
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
      </svg>
      <span
        className={`absolute inset-0 flex items-center justify-center font-bold font-[var(--font-inter)] tabular-nums ${urgent ? "text-[var(--color-danger-red)] animate-pulse" : "text-[var(--color-brand-blue)]"}`}
        style={{ fontSize: size * 0.34 }}
      >
        {whole}
      </span>
    </div>
  );
}

/** Big 3-2-1 before a question opens. */
export function GetReady({ startsAt, now, index, total, sound }: { startsAt: number; now: () => number; index: number; total: number; sound?: boolean }) {
  useTicker(true, 100);
  const left = Math.max(1, Math.ceil((startsAt - now()) / 1000));
  const played = useRef(false);
  useEffect(() => {
    if (sound && !played.current) {
      played.current = true;
      liveAudio().sfx("go");
    }
  }, [sound]);
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <p className="text-base font-semibold text-[var(--color-ink-soft)]">Soal {index + 1} dari {total}</p>
      <div
        key={left}
        className="w-32 h-32 rounded-full bg-white border-4 border-[var(--color-brand-blue)] text-[var(--color-brand-blue)] shadow-[var(--shadow-sketch)] flex items-center justify-center text-6xl font-bold live-pop"
      >
        {left}
      </div>
      <p className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">Siap-siap!</p>
    </div>
  );
}

/** Animated count-up for scores. */
export function CountUp({ value, ms = 900 }: { value: number; ms?: number }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / ms);
      setShown(Math.round(a + (value - a) * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
      else from.current = value;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, ms]);
  return <>{shown.toLocaleString("id-ID")}</>;
}

/**
 * Top players, sliding from their previous rank to the new one so
 * overtakes are visible. Each row sits at its final place and plays a
 * one-off CSS slide from its old place, so polling re-renders can't
 * interrupt it. Give the board a new `key` per question to replay.
 */
export function Scoreboard({ rows, highlightId, limit = 5 }: { rows: LiveBoardRow[]; highlightId?: string | null; limit?: number }) {
  const top = rows.slice(0, limit);
  const rowH = 64;
  // Old order: by previous rank (players new to the top come from below).
  const oldOrder = [...top].sort((a, b) => (a.prevRank ?? 999) - (b.prevRank ?? 999));

  return (
    <div className="relative w-full font-[var(--font-inter)]" style={{ height: top.length * rowH }}>
      {top.map((r, i) => {
        const from = oldOrder.findIndex((x) => x.id === r.id) * rowH;
        const to = i * rowH;
        const climbed = r.prevRank !== null && r.prevRank > r.rank;
        const style = {
          top: 0,
          height: rowH - 10,
          transform: `translateY(${to}px)`,
          "--from": `${from}px`,
          "--to": `${to}px`,
          animation: "live-slide 0.9s cubic-bezier(.2,.8,.2,1.15) 0.35s both",
        } as CSSProperties;
        const mine = r.id === highlightId;
        return (
          <div
            key={r.id}
            className={`absolute left-0 right-0 flex items-center gap-3 px-3 rounded-[var(--radius-card)] border-2 shadow-[var(--shadow-sketch)] text-[var(--color-ink)] ${mine ? "bg-[var(--color-accent-yellow-light)] border-[var(--color-warning-amber)] z-10" : "bg-white border-[var(--color-line)]"}`}
            style={style}
          >
            <span className={`w-8 text-center text-xl font-bold ${i === 0 ? "text-[var(--color-accent-coral)]" : "text-[var(--color-brand-blue)]"}`}>{r.rank}</span>
            <Picture name={r.avatar} className="w-10 h-10 shrink-0" />
            <span className="flex-1 truncate text-lg font-semibold">{r.nickname}</span>
            {r.streak >= 2 && (
              <span className="flex items-center gap-0.5 text-sm font-semibold text-[var(--color-accent-coral)]" title="Streak jawaban benar">
                <Flame className="w-4 h-4" /> {r.streak}
              </span>
            )}
            {climbed && (
              <span className="text-xs text-[var(--color-success-green)] font-bold live-pop" style={{ animationDelay: "1.2s" }}>
                ▲ {r.prevRank! - r.rank}
              </span>
            )}
            <span className="text-xl font-bold tabular-nums text-[var(--color-brand-blue)]"><CountUp value={r.score} /></span>
          </div>
        );
      })}
    </div>
  );
}

const CONFETTI_COLORS = ["#E21B3C", "#1368CE", "#D89E00", "#26890C", "#E8734A", "#F2C14E", "#2B4C7E"];
/** Deterministic pseudo-random in [0, 1) so renders stay pure. */
const rand = (i: number, k: number) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export function Confetti({ count = 90 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: rand(i, 1) * 100,
        delay: rand(i, 2) * 2.5,
        dur: 2.8 + rand(i, 3) * 2.2,
        size: 6 + rand(i, 4) * 8,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        round: rand(i, 5) > 0.6,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-[60]" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute top-[-20px] live-confetti"
          style={{ left: `${p.left}%`, width: p.size, height: p.size * (p.round ? 1 : 0.5), background: p.color, borderRadius: p.round ? 999 : 2, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s` }}
        />
      ))}
    </div>
  );
}

/**
 * Winners' podium: 3rd, then 2nd, then (after a drumroll) 1st rise up.
 * `sound` plays the drumroll and fanfare (host screen, or a player who
 * turned sound on).
 */
export function Podium({ rows, highlightId, sound = false }: { rows: LiveBoardRow[]; highlightId?: string | null; sound?: boolean }) {
  const [stage, setStage] = useState(0); // 0 none, 1 third, 2 second, 3 first
  useEffect(() => {
    const audio = liveAudio();
    const timers = [
      window.setTimeout(() => { setStage(1); if (sound) audio.sfx("place"); }, 900),
      window.setTimeout(() => { setStage(2); if (sound) audio.sfx("place"); }, 2300),
      window.setTimeout(() => { if (sound) audio.sfx("drumroll"); }, 3300),
      window.setTimeout(() => { setStage(3); if (sound) { audio.sfx("fanfare"); audio.playBgm("podium"); } }, 5000),
    ];
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [sound]);

  const places = [
    { row: rows[1], place: 2, height: "h-36", color: "var(--color-line-light)", text: "var(--color-ink-soft)", show: stage >= 2 },
    { row: rows[0], place: 1, height: "h-52", color: "var(--color-accent-yellow)", text: "var(--color-ink)", show: stage >= 3 },
    { row: rows[2], place: 3, height: "h-24", color: "var(--color-accent-coral-light)", text: "white", show: stage >= 1 },
  ];

  return (
    <div className="relative font-[var(--font-inter)]">
      {stage >= 3 && <Confetti />}
      <div className="flex items-end justify-center gap-2 sm:gap-4 pt-6">
        {places.map(({ row, place, height, color, text, show }) => (
          <div key={place} className="flex flex-col items-center w-28 sm:w-40">
            <div className={`flex flex-col items-center mb-2 transition-all duration-700 ${show && row ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              {row && (
                <>
                  {place === 1 && <span className="text-3xl live-pop" aria-hidden>👑</span>}
                  <Picture name={row.avatar} className={place === 1 ? "w-20 h-20 sm:w-24 sm:h-24" : "w-14 h-14 sm:w-16 sm:h-16"} />
                  <span className={`mt-1 px-2 py-0.5 rounded-md font-semibold text-center truncate max-w-full text-[var(--color-ink)] ${row.id === highlightId ? "bg-[var(--color-accent-yellow-light)]" : ""}`}>{row.nickname}</span>
                  <span className="text-[var(--color-brand-blue)] font-bold text-sm tabular-nums">{row.score.toLocaleString("id-ID")}</span>
                </>
              )}
            </div>
            <div
              className={`w-full ${height} rounded-t-[var(--radius-card)] border-2 border-b-0 border-[var(--color-line)] flex items-start justify-center pt-3 shadow-[var(--shadow-sketch)] origin-bottom transition-transform duration-700 ${show ? "scale-y-100" : "scale-y-0"}`}
              style={{ background: color }}
            >
              <span className="text-4xl sm:text-5xl font-[var(--font-kalam)]" style={{ color: text }}>{place}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Keyframes and the paper backdrop used by the live quiz. */
export function LiveStyles() {
  return (
    <style>{`
      @keyframes live-pop { 0% { transform: scale(.4); opacity: 0 } 70% { transform: scale(1.12); opacity: 1 } 100% { transform: scale(1) } }
      .live-pop { animation: live-pop .45s cubic-bezier(.2,.8,.2,1.2) both }
      @keyframes live-slide { from { transform: translateY(var(--from)) } to { transform: translateY(var(--to)) } }
      @keyframes live-fall { 0% { transform: translateY(0) rotate(0) } 100% { transform: translateY(110vh) rotate(720deg) } }
      .live-confetti { animation-name: live-fall; animation-timing-function: linear; animation-iteration-count: 2 }
      @keyframes live-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
      .live-float { animation: live-float 2.4s ease-in-out infinite }
      @keyframes live-shake { 0%,100% { transform: translateX(0) } 25% { transform: translateX(-6px) } 75% { transform: translateX(6px) } }
      .live-shake { animation: live-shake .4s ease-in-out 2 }
      .live-bg { background-color: var(--color-paper-bg); background-image: radial-gradient(circle, var(--color-line) 0.6px, transparent 0.6px); background-size: 22px 22px; color: var(--color-ink); }
      @media (prefers-reduced-motion: reduce) { .live-pop, .live-float, .live-shake { animation: none } .live-confetti { display: none } }
    `}</style>
  );
}

/** The 6-digit PIN, shown the way the rest of the site shows key numbers. */
export function PinBadge({ pin, size = "md" }: { pin: string; size?: "md" | "xl" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 bg-white border-2 border-[var(--color-brand-blue)] rounded-[var(--radius-card)] shadow-[var(--shadow-sketch)] font-[var(--font-inter)] ${size === "xl" ? "px-6 py-3" : "px-3 py-1"}`}
    >
      <span className={`font-semibold uppercase tracking-wider text-[var(--color-ink-soft)] ${size === "xl" ? "text-base" : "text-xs"}`}>PIN</span>
      <span className={`font-bold tabular-nums tracking-[0.12em] text-[var(--color-brand-blue)] ${size === "xl" ? "text-6xl sm:text-8xl" : "text-2xl"}`}>{pin}</span>
    </span>
  );
}
