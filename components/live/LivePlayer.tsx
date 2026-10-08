"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Volume2, VolumeX, Music, Loader2, CheckCircle2, XCircle, Flame, X } from "lucide-react";
import { Picture } from "@/components/course/pictures";
import { Button } from "@/components/ui/Button";
import { LIVE_AVATARS, type LiveState } from "@/lib/live/types";
import { liveAudio } from "@/components/live/audio";
import { ANSWER_STYLES, CountdownRing, GetReady, LiveStyles, Podium, Scoreboard, Shape, useServerClock } from "@/components/live/ui";

type Creds = { token: string; nickname: string };
type PlayerState = LiveState & { joined: boolean };

const storeKey = (pin: string) => `live:${pin}`;
function loadCreds(pin: string): Creds | null {
  try {
    const raw = window.localStorage.getItem(storeKey(pin));
    return raw ? (JSON.parse(raw) as Creds) : null;
  } catch {
    return null;
  }
}
function saveCreds(pin: string, creds: Creds | null) {
  try {
    if (creds) window.localStorage.setItem(storeKey(pin), JSON.stringify(creds));
    else window.localStorage.removeItem(storeKey(pin));
  } catch {
    /* private mode: stay in memory only */
  }
}

/**
 * A player's whole live-quiz experience for one PIN: pick a name and avatar,
 * wait in the lobby, answer, see results, the scoreboard and the podium.
 * No account needed. Used on /live/[pin] and inside modules.
 */
export function LivePlayer({ pin, onClose }: { pin: string; onClose?: () => void }) {
  // Read once on mount (the first render shows a loader either way, so SSR matches).
  const [creds, setCreds] = useState<Creds | null>(() => (typeof window === "undefined" ? null : loadCreds(pin)));
  const [state, setState] = useState<PlayerState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sfxOn, setSfxOn] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [sending, setSending] = useState<number | null>(null);
  const now = useServerClock(state?.serverNow);

  // Poll the server; faster while a question is open.
  const fast = state?.status === "question";
  useEffect(() => {
    let stop = false;
    let timer = 0;
    const tick = async () => {
      try {
        const res = await fetch(`/api/live/${pin}`, { cache: "no-store", headers: creds ? { "x-live-token": creds.token } : {} });
        const json = await res.json();
        if (stop) return;
        if (!res.ok) setError(json.error);
        else {
          setError(null);
          setState(json);
          if (creds && !json.joined && json.status !== "ended") {
            // Removed by the host, or the PIN now belongs to a new lobby.
            saveCreds(pin, null);
            setCreds(null);
          }
        }
      } catch {
        if (!stop) setError("Koneksi terputus, mencoba lagi…");
      }
      if (!stop) timer = window.setTimeout(tick, fast ? 700 : 1200);
    };
    tick();
    return () => {
      stop = true;
      window.clearTimeout(timer);
    };
  }, [pin, creds, fast]);

  // Sound: effects on reveal, optional background music.
  const audio = liveAudio();
  useEffect(() => audio.setMuted(!sfxOn && !musicOn), [audio, sfxOn, musicOn]);
  useEffect(() => {
    if (!musicOn || !creds) return audio.stopBgm();
    if (state?.status === "lobby" || state?.status === "scoreboard") audio.playBgm("lobby");
    else if (state?.status === "question") audio.playBgm("question");
    else if (state?.status !== "podium") audio.stopBgm();
  }, [audio, musicOn, creds, state?.status]);
  useEffect(() => () => audio.stopBgm(), [audio]);

  const lastReveal = useRef<number | null>(null);
  useEffect(() => {
    if (state?.status !== "reveal" || !state.me?.result || lastReveal.current === state.index) return;
    lastReveal.current = state.index;
    if (sfxOn) audio.sfx(state.me.result.correct ? "correct" : "wrong");
  }, [state?.status, state?.index, state?.me?.result, sfxOn, audio]);

  const answer = useCallback(
    async (choice: number) => {
      if (!creds || !state || sending !== null) return;
      setSending(choice);
      if (sfxOn) audio.sfx("pop");
      try {
        const res = await fetch(`/api/live/${pin}/answer`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-live-token": creds.token },
          body: JSON.stringify({ index: state.index, choice }),
        });
        const json = await res.json();
        if (!res.ok) setError(json.error);
        else setState((s) => (s && s.me ? { ...s, me: { ...s.me, choice } } : s));
      } finally {
        setSending(null);
      }
    },
    [creds, state, sending, pin, sfxOn, audio]
  );

  const onJoined = (c: Creds) => {
    saveCreds(pin, c);
    setCreds(c);
    audio.unlock();
    if (sfxOn) audio.sfx("join");
  };

  const toggleBtn = (on: boolean) =>
    `p-2 rounded-full border-2 transition-colors ${on ? "bg-[var(--color-brand-blue)] border-[var(--color-brand-blue)] text-white" : "bg-white border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-brand-blue)]"}`;

  const shell = (children: ReactNode) => (
    <div className="live-bg min-h-[560px] w-full rounded-none sm:rounded-[var(--radius-card)] sm:border-2 sm:border-[var(--color-line)] p-4 sm:p-6 font-[var(--font-inter)] relative overflow-hidden">
      <LiveStyles />
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="text-xs font-semibold tracking-wider uppercase text-[var(--color-accent-coral)]">
          Live Quiz · <span className="text-[var(--color-brand-blue)]">PIN {pin}</span>
        </span>
        <div className="flex gap-1.5">
          <button type="button" onClick={() => { audio.unlock(); setMusicOn((m) => !m); }} className={toggleBtn(musicOn)} aria-label={musicOn ? "Matikan musik" : "Nyalakan musik"} title="Musik latar">
            <Music className="w-4 h-4" />
          </button>
          <button type="button" onClick={() => { audio.unlock(); setSfxOn((s) => !s); }} className={toggleBtn(sfxOn)} aria-label={sfxOn ? "Matikan efek suara" : "Nyalakan efek suara"} title="Efek suara">
            {sfxOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          {onClose && (
            <button type="button" onClick={onClose} className={toggleBtn(false)} aria-label="Tutup Live Quiz">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      {error && <p className="mb-3 text-sm text-[var(--color-danger-red)] bg-white border border-[var(--color-danger-red)]/40 rounded-lg px-3 py-2">{error}</p>}
      {children}
    </div>
  );

  if (!state && !error) return shell(<div className="flex justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-[var(--color-brand-blue)]" /></div>);
  if (!state) return shell(<p className="text-center py-16 text-lg font-semibold text-[var(--color-ink)]">{error}</p>);

  if (state.status === "ended" && !state.me) {
    return shell(
      <div className="text-center py-16 space-y-3">
        <Picture name="owl-cheer" className="w-28 h-28 mx-auto" />
        <p className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">Kuis ini sudah selesai.</p>
        <p className="text-[var(--color-ink-soft)]">Tunggu pengajar membuka Live Quiz berikutnya, ya!</p>
      </div>
    );
  }

  if (!creds || !state.me) return shell(<JoinForm pin={pin} title={state.title} onJoined={onJoined} />);

  const me = state.me;
  const q = state.question;

  return shell(
    <div className="space-y-5 text-[var(--color-ink)]">
      {/* Me */}
      <div className="flex items-center gap-3 bg-white border-2 border-[var(--color-line)] rounded-[var(--radius-card)] shadow-[var(--shadow-sketch)] px-3 py-2">
        <Picture name={me.avatar} className="w-10 h-10" />
        <span className="font-semibold flex-1 truncate">{me.nickname}</span>
        {me.streak >= 2 && <span className="flex items-center gap-1 text-sm font-semibold text-[var(--color-accent-coral)]"><Flame className="w-4 h-4" />{me.streak}</span>}
        <span className="font-bold tabular-nums text-white bg-[var(--color-brand-blue)] rounded-md px-2.5 py-1">{me.score.toLocaleString("id-ID")}</span>
      </div>

      {state.status === "lobby" && (
        <div className="text-center space-y-4 py-4">
          <Picture name={me.avatar} className="w-28 h-28 mx-auto live-float" />
          <p className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">Kamu sudah masuk! 🎉</p>
          <p className="text-[var(--color-ink-soft)]">Lihat namamu di layar? Tunggu pengajar memulai kuis.</p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {state.lobby.map((p) => (
              <span
                key={p.id}
                className={`flex items-center gap-1.5 pl-1 pr-3 py-1 rounded-full border-2 text-sm font-semibold live-pop ${p.id === me.id ? "bg-[var(--color-accent-yellow-light)] border-[var(--color-warning-amber)]" : "bg-white border-[var(--color-line)]"}`}
              >
                <Picture name={p.avatar} className="w-7 h-7" /> {p.nickname}
              </span>
            ))}
          </div>
          <p className="text-sm text-[var(--color-ink-soft)]">{state.playerCount} pemain di lobi</p>
        </div>
      )}

      {state.status === "question" && q && state.startsAt && state.endsAt && (
        now() < state.startsAt ? (
          <GetReady startsAt={state.startsAt} now={now} index={state.index} total={state.total} sound={sfxOn} />
        ) : me.choice !== null ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-24 h-24 mx-auto rounded-[var(--radius-card)] shadow-[var(--shadow-sketch)] flex items-center justify-center live-pop" style={{ background: ANSWER_STYLES[me.choice].bg }}>
              <Shape shape={ANSWER_STYLES[me.choice].shape} className="w-12 h-12" />
            </div>
            <p className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">Jawaban terkirim!</p>
            <p className="text-[var(--color-ink-soft)]">Semoga benar… tunggu yang lain dulu, ya. ({state.answered}/{state.playerCount})</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 sketch-card bg-white px-4 py-3">
                <p className="text-xs font-semibold text-[var(--color-ink-soft)]">Soal {state.index + 1} dari {state.total}</p>
                <p className="text-xl sm:text-2xl font-bold leading-snug">{q.prompt}</p>
              </div>
              <CountdownRing endsAt={state.endsAt} total={state.seconds} now={now} sound={sfxOn} size={68} />
            </div>
            {q.image && (
              <div className="flex justify-center sketch-card bg-white py-2">
                <Picture name={q.image} className="h-28 sm:h-36 w-auto" />
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={sending !== null}
                  onClick={() => answer(i)}
                  className="flex items-center gap-3 rounded-[var(--radius-card)] px-4 py-4 text-left text-lg font-semibold text-white shadow-[var(--shadow-sketch)] hover:-translate-y-0.5 active:translate-y-0.5 transition-transform disabled:opacity-70"
                  style={{ background: ANSWER_STYLES[i].bg }}
                >
                  <Shape shape={ANSWER_STYLES[i].shape} className="w-7 h-7 shrink-0" />
                  <span className="flex-1">{opt}</span>
                  {sending === i && <Loader2 className="w-5 h-5 animate-spin" />}
                </button>
              ))}
            </div>
          </div>
        )
      )}

      {state.status === "reveal" && q && state.reveal && (
        <div className="text-center space-y-4 py-4">
          {me.result?.correct ? (
            <div className="live-pop space-y-2">
              <CheckCircle2 className="w-20 h-20 mx-auto text-[var(--color-success-green)]" />
              <p className="text-4xl font-[var(--font-kalam)] text-[var(--color-success-green)]">Benar!</p>
              <p className="text-xl font-bold text-white bg-[var(--color-success-green)] inline-block rounded-md px-4 py-1">+{me.result.points.toLocaleString("id-ID")}</p>
              {me.streak >= 2 && <p className="font-semibold text-[var(--color-accent-coral)] flex items-center justify-center gap-1"><Flame className="w-5 h-5" /> Streak {me.streak} jawaban benar!</p>}
            </div>
          ) : (
            <div className="live-shake space-y-2">
              <XCircle className="w-20 h-20 mx-auto text-[var(--color-danger-red)]" />
              <p className="text-4xl font-[var(--font-kalam)] text-[var(--color-danger-red)]">{me.choice === null ? "Waktu habis!" : "Belum tepat"}</p>
              <p className="text-[var(--color-ink-soft)]">Jawaban yang benar:</p>
              <p className="inline-flex items-center gap-2 rounded-[var(--radius-card)] px-4 py-2 font-semibold text-white shadow-[var(--shadow-sketch)]" style={{ background: ANSWER_STYLES[state.reveal.answer].bg }}>
                <Shape shape={ANSWER_STYLES[state.reveal.answer].shape} className="w-5 h-5" /> {q.options[state.reveal.answer]}
              </p>
            </div>
          )}
          <p className="text-[var(--color-ink-soft)]">Kamu di peringkat <strong className="text-[var(--color-brand-blue)]">{me.rank}</strong> dari {me.total}</p>
        </div>
      )}

      {state.status === "scoreboard" && (
        <div className="space-y-4">
          <p className="text-center text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">Papan Skor</p>
          <Scoreboard key={state.index} rows={state.board} highlightId={me.id} />
          {!state.board.some((r) => r.id === me.id) && <p className="text-center text-[var(--color-ink-soft)]">Kamu di peringkat <strong className="text-[var(--color-brand-blue)]">{me.rank}</strong>. Kejar terus! 💪</p>}
        </div>
      )}

      {(state.status === "podium" || state.status === "ended") && (
        <div className="space-y-4">
          <p className="text-center text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">🏆 Juara Live Quiz 🏆</p>
          <Podium rows={state.board} highlightId={me.id} sound={sfxOn} />
          <p className="text-center text-lg font-semibold">
            {me.rank <= 3 ? `Selamat! Kamu juara ${me.rank}! 🎉` : `Kamu di peringkat ${me.rank} dari ${me.total}. Great job!`}
          </p>
        </div>
      )}
    </div>
  );
}

function JoinForm({ pin, title, onJoined }: { pin: string; title: string; onJoined: (c: Creds) => void }) {
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState<string>(() => LIVE_AVATARS[Math.floor(Math.random() * LIVE_AVATARS.length)]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const join = async (e: FormEvent) => {
    e.preventDefault();
    liveAudio().unlock(); // this click is the user gesture browsers require for sound
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/live/${pin}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, avatar }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      onJoined({ token: json.token, nickname });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal masuk lobi.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={join} className="max-w-md mx-auto space-y-5 text-[var(--color-ink)]">
      <div className="text-center space-y-1">
        <Picture name="owl-wave" className="w-20 h-20 mx-auto" />
        <p className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)] leading-tight">{title}</p>
        <p className="text-[var(--color-ink-soft)]">Tulis namamu dan pilih avatar, lalu masuk lobi.</p>
      </div>
      <input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        maxLength={20}
        placeholder="Nama panggilanmu"
        aria-label="Nama panggilan"
        className="input-field w-full text-lg font-semibold"
        autoFocus
      />
      <div className="grid grid-cols-6 gap-2">
        {LIVE_AVATARS.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setAvatar(a)}
            aria-label={`Avatar ${a}`}
            aria-pressed={avatar === a}
            className={`aspect-square rounded-[var(--radius-card)] p-1 border-2 transition-transform ${avatar === a ? "bg-[var(--color-accent-yellow-light)] border-[var(--color-warning-amber)] scale-110" : "bg-white border-[var(--color-line)] hover:border-[var(--color-brand-blue)]"}`}
          >
            <Picture name={a} className="w-full h-full" />
          </button>
        ))}
      </div>
      {error && <p className="text-sm text-[var(--color-danger-red)] bg-white border border-[var(--color-danger-red)]/40 rounded-lg px-3 py-2">{error}</p>}
      <Button type="submit" size="lg" className="w-full" isLoading={busy} disabled={nickname.trim().length < 2}>
        Masuk Lobi
      </Button>
    </form>
  );
}
