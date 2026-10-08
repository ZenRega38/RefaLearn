"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { Maximize2, Minimize2, Volume2, VolumeX, Users, ArrowRight, Play, Square, Loader2, Copy, Check } from "lucide-react";
import { Picture } from "@/components/course/pictures";
import type { LiveState } from "@/lib/live/types";
import { liveAudio } from "@/components/live/audio";
import { ANSWER_STYLES, CountdownRing, GetReady, LiveStyles, Podium, Scoreboard, Shape, useServerClock } from "@/components/live/ui";

/**
 * The admin's big screen (projector) for a live quiz: lobby with PIN and QR,
 * questions with a countdown, answer distribution, the animated scoreboard
 * and the podium. Music and sound effects play here.
 */
export function LiveHost({ sessionId }: { sessionId: string }) {
  const [state, setState] = useState<LiveState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [full, setFull] = useState(false);
  const [qr, setQr] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const now = useServerClock(state?.serverNow);
  const rootRef = useRef<HTMLDivElement>(null);
  const audio = liveAudio();

  const fast = state?.status === "question";
  useEffect(() => {
    let stop = false;
    let timer = 0;
    const tick = async () => {
      try {
        const res = await fetch(`/api/live/sessions/${sessionId}`, { cache: "no-store" });
        const json = await res.json();
        if (stop) return;
        if (!res.ok) setError(json.error);
        else {
          setError(null);
          setState(json);
        }
      } catch {
        if (!stop) setError("Koneksi terputus, mencoba lagi…");
      }
      if (!stop) timer = window.setTimeout(tick, fast ? 700 : 1000);
    };
    tick();
    return () => {
      stop = true;
      window.clearTimeout(timer);
    };
  }, [sessionId, fast]);

  const joinUrl = state && typeof window !== "undefined" ? `${window.location.origin}/live/${state.pin}` : "";
  useEffect(() => {
    if (!joinUrl) return;
    QRCode.toString(joinUrl, { type: "svg", margin: 1, color: { dark: "#2B1E5C", light: "#FFFFFF" } }).then(setQr).catch(() => setQr(""));
  }, [joinUrl]);

  // Music follows the game phase; effects on joins and reveals.
  useEffect(() => {
    audio.setMuted(!soundOn);
    if (!soundOn || !state) return;
    if (state.status === "lobby" || state.status === "scoreboard") audio.playBgm("lobby");
    else if (state.status === "question") audio.playBgm("question");
    else if (state.status === "reveal" || state.status === "podium") audio.stopBgm();
  }, [audio, soundOn, state?.status, state]);
  useEffect(() => () => audio.stopBgm(), [audio]);

  const prevPlayers = useRef(0);
  useEffect(() => {
    if (!state) return;
    if (soundOn && state.playerCount > prevPlayers.current && state.status === "lobby") audio.sfx("join");
    prevPlayers.current = state.playerCount;
  }, [state?.playerCount, state?.status, soundOn, audio, state]);

  const lastReveal = useRef<number | null>(null);
  useEffect(() => {
    if (state?.status === "reveal" && lastReveal.current !== state.index) {
      lastReveal.current = state.index;
      if (soundOn) audio.sfx("reveal");
    }
  }, [state?.status, state?.index, soundOn, audio]);

  const act = useCallback(
    async (action: string, playerId?: string) => {
      setBusy(true);
      audio.unlock();
      try {
        const res = await fetch(`/api/live/sessions/${sessionId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action, playerId }),
        });
        const json = await res.json();
        if (!res.ok) setError(json.error);
        else setState(json);
      } finally {
        setBusy(false);
      }
    },
    [sessionId, audio]
  );

  const toggleFull = async () => {
    try {
      if (!document.fullscreenElement) await rootRef.current?.requestFullscreen();
      else await document.exitFullscreen();
    } catch {
      /* not supported */
    }
  };
  useEffect(() => {
    const onChange = () => setFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  if (!state) {
    return (
      <div className="live-bg min-h-screen flex items-center justify-center text-white">
        <LiveStyles />
        {error ? <p className="text-lg font-bold">{error}</p> : <Loader2 className="w-10 h-10 animate-spin" />}
      </div>
    );
  }

  const q = state.question;
  const nextLabel =
    state.status === "lobby" ? "Mulai Kuis" :
    state.status === "question" ? "Tutup Soal" :
    state.status === "reveal" ? "Papan Skor" :
    state.status === "scoreboard" ? (state.index + 1 < state.total ? "Soal Berikutnya" : "Lihat Juara") :
    state.status === "podium" ? "Selesai" : null;

  return (
    <div ref={rootRef} className="live-bg min-h-screen text-white font-[var(--font-inter)] flex flex-col">
      <LiveStyles />

      {/* Top bar */}
      <header className="flex flex-wrap items-center gap-3 px-4 sm:px-8 py-3 bg-black/20">
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-widest opacity-75">Live Quiz</p>
          <p className="font-black truncate">{state.title}</p>
        </div>
        <div className="flex items-center gap-2 bg-white text-[#3B2A6E] rounded-xl px-3 py-1.5">
          <span className="text-xs font-bold">PIN</span>
          <span className="text-2xl font-black tracking-widest tabular-nums">{state.pin}</span>
        </div>
        <span className="flex items-center gap-1.5 font-bold"><Users className="w-5 h-5" /> {state.playerCount}</span>
        <button type="button" onClick={() => { audio.unlock(); setSoundOn((s) => !s); }} className={`flex items-center gap-1.5 px-3 py-2 rounded-full font-bold text-sm ${soundOn ? "bg-white text-[#3B2A6E]" : "bg-[#FFE45C] text-[#3B2A6E] animate-pulse"}`}>
          {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />} {soundOn ? "Suara on" : "Nyalakan suara"}
        </button>
        <button type="button" onClick={toggleFull} className="p-2 rounded-full bg-white/15" aria-label="Layar penuh">
          {full ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
        {state.status !== "ended" && (
          <button type="button" onClick={() => window.confirm("Akhiri Live Quiz sekarang?") && act("end")} className="p-2 rounded-full bg-white/15" aria-label="Akhiri kuis" title="Akhiri kuis">
            <Square className="w-5 h-5" />
          </button>
        )}
      </header>

      {error && <p className="mx-4 sm:mx-8 mt-3 text-sm bg-black/25 rounded-lg px-3 py-2">{error}</p>}

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 space-y-6">
        {state.status === "lobby" && (
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start">
            <div className="space-y-4">
              <p className="text-lg opacity-90">Gabung lewat HP:</p>
              <p className="text-2xl sm:text-4xl font-black break-all">{joinUrl.replace(/^https?:\/\//, "").replace(/\/live\/\d+$/, "/live")}</p>
              <p className="text-lg opacity-90">lalu masukkan PIN</p>
              <p className="text-6xl sm:text-8xl font-black tracking-[0.15em] tabular-nums">{state.pin}</p>
              <p className="opacity-80">Atau scan QR, atau buka modulnya di website lalu klik <strong>Masuk Lobi</strong>.</p>
              <button
                type="button"
                onClick={() => { navigator.clipboard?.writeText(joinUrl); setCopied(true); window.setTimeout(() => setCopied(false), 1500); }}
                className="inline-flex items-center gap-2 text-sm font-bold bg-white/15 rounded-full px-3 py-1.5"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? "Link disalin" : "Salin link"}
              </button>
            </div>
            {qr && <div className="bg-white rounded-2xl p-3 w-56 h-56 sm:w-64 sm:h-64 mx-auto [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ __html: qr }} />}
            <div className="lg:col-span-2 space-y-3">
              <p className="font-bold opacity-90">{state.playerCount === 0 ? "Menunggu pemain…" : `${state.playerCount} pemain siap!`} <span className="text-sm opacity-70">(klik nama untuk mengeluarkan)</span></p>
              <div className="flex flex-wrap gap-2">
                {state.lobby.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => window.confirm(`Keluarkan ${p.nickname} dari lobi?`) && act("kick", p.id)}
                    className="flex items-center gap-2 pl-1 pr-4 py-1 rounded-full bg-white text-[#3B2A6E] font-bold live-pop hover:line-through"
                  >
                    <Picture name={p.avatar} className="w-9 h-9 live-float" /> {p.nickname}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {(state.status === "question" || state.status === "reveal") && q && (
          state.status === "question" && state.startsAt && now() < state.startsAt ? (
            <GetReady startsAt={state.startsAt} now={now} index={state.index} total={state.total} sound={soundOn} />
          ) : (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <p className="text-sm font-bold opacity-85 shrink-0">Soal {state.index + 1}/{state.total}</p>
                <p className="flex-1 bg-white text-[#3B2A6E] rounded-2xl px-5 py-4 text-2xl sm:text-4xl font-black text-center leading-tight">{q.prompt}</p>
              </div>
              <div className="flex items-center justify-between gap-4">
                {state.status === "question" && state.endsAt ? <CountdownRing endsAt={state.endsAt} total={state.seconds} now={now} sound={soundOn} size={110} /> : <div className="w-[110px]" />}
                {q.image ? (
                  <div className="bg-white rounded-2xl p-3"><Picture name={q.image} className="h-40 sm:h-56 w-auto" /></div>
                ) : <Picture name="owl-think" className="h-40 w-auto" />}
                <div className="w-[110px] text-center">
                  <p className="text-5xl font-black tabular-nums">{state.answered}</p>
                  <p className="text-sm font-bold opacity-85">jawaban</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {q.options.map((opt, i) => {
                  const isAnswer = state.reveal?.answer === i;
                  const dim = state.reveal && !isAnswer;
                  const count = state.reveal?.counts[i] ?? 0;
                  const max = Math.max(1, ...(state.reveal?.counts ?? [1]));
                  return (
                    <div key={i} className={`relative flex items-center gap-3 rounded-xl px-5 py-5 text-xl sm:text-2xl font-black transition-opacity ${dim ? "opacity-35" : ""}`} style={{ background: ANSWER_STYLES[i].bg }}>
                      <Shape shape={ANSWER_STYLES[i].shape} className="w-9 h-9 shrink-0" />
                      <span className="flex-1">{opt}</span>
                      {state.reveal && (
                        <span className="flex items-center gap-2">
                          <span className="h-3 rounded-full bg-white/80 transition-all duration-700" style={{ width: `${(count / max) * 80}px` }} />
                          <span className="tabular-nums">{count}</span>
                          {isAnswer && <Check className="w-8 h-8 live-pop" />}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )
        )}

        {state.status === "scoreboard" && (
          <div className="max-w-2xl mx-auto space-y-5">
            <p className="text-center text-4xl font-black">Papan Skor</p>
            <Scoreboard key={state.index} rows={state.board} limit={5} />
          </div>
        )}

        {(state.status === "podium" || state.status === "ended") && (
          <div className="space-y-6">
            <p className="text-center text-4xl font-black">🏆 Juara Live Quiz 🏆</p>
            <Podium rows={state.board} sound={soundOn && state.status === "podium"} />
            {state.status === "ended" && (
              <div className="max-w-xl mx-auto bg-white/10 rounded-2xl p-4 space-y-2">
                <p className="font-black">Peringkat lengkap</p>
                <ol className="space-y-1">
                  {state.board.map((r) => (
                    <li key={r.id} className="flex items-center gap-2 text-sm">
                      <span className="w-6 font-black">{r.rank}</span>
                      <Picture name={r.avatar} className="w-6 h-6" />
                      <span className="flex-1 truncate">{r.nickname}</span>
                      <span className="font-bold tabular-nums">{r.score.toLocaleString("id-ID")}</span>
                    </li>
                  ))}
                </ol>
                <Link href="/admin/course-modules" className="inline-block mt-2 text-sm font-bold underline">Kembali ke Modul & Live Quiz</Link>
              </div>
            )}
          </div>
        )}
      </main>

      {nextLabel && (
        <footer className="sticky bottom-0 flex justify-end gap-3 px-4 sm:px-8 py-4 bg-black/20">
          <button
            type="button"
            disabled={busy}
            onClick={() => act(state.status === "lobby" ? "start" : "next")}
            className="inline-flex items-center gap-2 rounded-xl bg-[#FFE45C] text-[#3B2A6E] px-6 py-3 text-lg font-black shadow-[0_4px_0_rgba(0,0,0,0.25)] active:translate-y-1 active:shadow-none disabled:opacity-60"
          >
            {state.status === "lobby" ? <Play className="w-5 h-5" /> : null}
            {nextLabel}
            {state.status !== "lobby" && <ArrowRight className="w-5 h-5" />}
          </button>
        </footer>
      )}
    </div>
  );
}
