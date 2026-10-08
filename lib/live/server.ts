import "server-only";
import { createHash, randomBytes, randomInt } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getCourse } from "@/lib/course/content";
import type { LiveQuizSet, McQuestion } from "@/lib/course/types";
import type { LiveBoardRow, LiveState, LiveStatus } from "@/lib/live/types";

// Live (Kahoot-style) quiz, hosted by the admin. The server is the only
// source of truth: question timing and points are computed here, players
// only send their choice. Scores are derived from live_answers on every
// read, so concurrent answers can't race on a counter.

export const DEFAULT_SECONDS = 20;
export const MAX_PLAYERS = 120;
/** Answers arriving just after the deadline still count (network lag). */
const GRACE_MS = 800;

export type SessionRow = {
  id: string;
  pin: string;
  course_slug: string;
  level_id: string;
  title: string;
  status: LiveStatus;
  current_index: number;
  question_count: number;
  seconds: number;
  question_started_at: string | null;
  question_ends_at: string | null;
  created_at: string;
};

type PlayerRow = { id: string; nickname: string; avatar: string; joined_at: string };
type AnswerRow = { player_id: string; q_index: number; choice: number; correct: boolean; points: number };

const SESSION_COLUMNS = "id, pin, course_slug, level_id, title, status, current_index, question_count, seconds, question_started_at, question_ends_at, created_at";

export const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");
export const newToken = () => randomBytes(24).toString("hex");

export function getLiveSet(slug: string, levelId: string): LiveQuizSet | null {
  return getCourse(slug)?.levels.find((l) => l.id === levelId)?.live ?? null;
}

function questionAt(session: SessionRow): McQuestion | null {
  return getLiveSet(session.course_slug, session.level_id)?.questions[session.current_index] ?? null;
}

/**
 * Kahoot-style points: up to 1000 for an instant right answer, at least 500
 * for a right answer at the buzzer, plus an answer-streak bonus (+100 per
 * consecutive right answer, capped at +400).
 */
export function scoreAnswer(correct: boolean, elapsedMs: number, limitMs: number, streakBefore: number): number {
  if (!correct) return 0;
  const t = Math.min(Math.max(elapsedMs / limitMs, 0), 1);
  return Math.round(1000 * (1 - t / 2)) + Math.min(streakBefore, 4) * 100;
}

/** Consecutive right answers ending at question `upTo` (inclusive). */
export function streakOf(answers: AnswerRow[], playerId: string, upTo: number): number {
  const byIndex = new Map(answers.filter((a) => a.player_id === playerId).map((a) => [a.q_index, a]));
  let streak = 0;
  for (let i = upTo; i >= 0; i--) {
    if (!byIndex.get(i)?.correct) break;
    streak++;
  }
  return streak;
}

/** Ranked scoreboard counting answers up to question `upTo` (inclusive). Ties share a rank. */
export function ranking(players: PlayerRow[], answers: AnswerRow[], upTo: number) {
  const totals = new Map(players.map((p) => [p.id, 0]));
  for (const a of answers) if (a.q_index <= upTo && totals.has(a.player_id)) totals.set(a.player_id, (totals.get(a.player_id) ?? 0) + a.points);
  const sorted = [...players].sort((a, b) => (totals.get(b.id)! - totals.get(a.id)!) || a.joined_at.localeCompare(b.joined_at));
  const rank = new Map<string, number>();
  sorted.forEach((p, i) => {
    const prev = sorted[i - 1];
    rank.set(p.id, prev && totals.get(prev.id) === totals.get(p.id) ? rank.get(prev.id)! : i + 1);
  });
  return { sorted, totals, rank };
}

export async function generatePin(admin: SupabaseClient): Promise<string> {
  for (let attempt = 0; attempt < 20; attempt++) {
    const pin = String(randomInt(100000, 1000000));
    const { data } = await admin.from("live_sessions").select("id").eq("pin", pin).neq("status", "ended").maybeSingle();
    if (!data) return pin;
  }
  throw new Error("Tidak bisa membuat PIN baru, coba lagi.");
}

export async function sessionById(admin: SupabaseClient, id: string): Promise<SessionRow | null> {
  const { data } = await admin.from("live_sessions").select(SESSION_COLUMNS).eq("id", id).maybeSingle();
  return (data as SessionRow) ?? null;
}

/** The running session for a PIN (or the most recent one that just ended, so players see the podium). */
export async function sessionByPin(admin: SupabaseClient, pin: string): Promise<SessionRow | null> {
  if (!/^\d{6}$/.test(pin)) return null;
  const { data } = await admin
    .from("live_sessions")
    .select(SESSION_COLUMNS)
    .eq("pin", pin)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data as SessionRow) ?? null;
}

/**
 * Lazily closes a question once its time is up or everyone has answered.
 * Called on every read, so no background job is needed. Guarded by the
 * current status/index so concurrent callers don't double-advance.
 */
export async function advanceIfDue(admin: SupabaseClient, session: SessionRow): Promise<SessionRow> {
  if (session.status !== "question" || !session.question_ends_at) return session;
  const overdue = Date.now() >= Date.parse(session.question_ends_at);
  let everyone = false;
  if (!overdue) {
    const [{ count: players }, { count: answered }] = await Promise.all([
      admin.from("live_players").select("id", { count: "exact", head: true }).eq("session_id", session.id),
      admin.from("live_answers").select("player_id", { count: "exact", head: true }).eq("session_id", session.id).eq("q_index", session.current_index),
    ]);
    everyone = (players ?? 0) > 0 && (answered ?? 0) >= (players ?? 0);
  }
  if (!overdue && !everyone) return session;
  const { data } = await admin
    .from("live_sessions")
    .update({ status: "reveal" })
    .eq("id", session.id)
    .eq("status", "question")
    .eq("current_index", session.current_index)
    .select(SESSION_COLUMNS)
    .maybeSingle();
  return (data as SessionRow) ?? (await sessionById(admin, session.id)) ?? session;
}

/** Host controls. Returns an error message, or null when applied. */
export async function control(admin: SupabaseClient, session: SessionRow, action: string, playerId?: string): Promise<string | null> {
  const now = Date.now();
  const openQuestion = (index: number) => ({
    status: "question" as const,
    current_index: index,
    question_started_at: new Date(now + 1500).toISOString(), // short "get ready" beat
    question_ends_at: new Date(now + 1500 + session.seconds * 1000).toISOString(),
  });

  let patch: Record<string, unknown> | null = null;
  if (action === "kick") {
    if (!playerId) return "Pemain tidak ditemukan.";
    await admin.from("live_players").delete().eq("id", playerId).eq("session_id", session.id);
    return null;
  }
  if (action === "end") patch = { status: "ended", ended_at: new Date(now).toISOString() };
  else if (action === "start") {
    if (session.status !== "lobby") return "Kuis sudah dimulai.";
    patch = openQuestion(0);
  } else if (action === "next") {
    switch (session.status) {
      case "lobby":
        patch = openQuestion(0);
        break;
      case "question":
        patch = { status: "reveal", question_ends_at: new Date(now).toISOString() };
        break;
      case "reveal":
        patch = { status: "scoreboard" };
        break;
      case "scoreboard":
        patch = session.current_index + 1 < session.question_count ? openQuestion(session.current_index + 1) : { status: "podium" };
        break;
      case "podium":
        patch = { status: "ended", ended_at: new Date(now).toISOString() };
        break;
      default:
        return "Kuis sudah selesai.";
    }
  } else return "Aksi tidak dikenal.";

  const { error } = await admin.from("live_sessions").update(patch).eq("id", session.id).eq("status", session.status).eq("current_index", session.current_index);
  return error ? "Gagal memperbarui kuis." : null;
}

/** Builds what a player (or the host, with `host`) sees right now. */
export async function buildState(admin: SupabaseClient, session: SessionRow, opts: { playerId?: string | null; host?: boolean }): Promise<LiveState> {
  const [{ data: playerRows }, { data: answerRows }] = await Promise.all([
    admin.from("live_players").select("id, nickname, avatar, joined_at").eq("session_id", session.id).order("joined_at"),
    admin.from("live_answers").select("player_id, q_index, choice, correct, points").eq("session_id", session.id),
  ]);
  const players = (playerRows || []) as PlayerRow[];
  const answers = (answerRows || []) as AnswerRow[];
  const idx = session.current_index;
  const q = questionAt(session);
  const showQuestion = (session.status === "question" || session.status === "reveal" || session.status === "scoreboard") && q;
  const revealed = session.status === "reveal" || session.status === "scoreboard";

  const settled = revealed || session.status === "podium" || session.status === "ended" ? idx : idx - 1;
  const now = ranking(players, answers, settled);
  const before = ranking(players, answers, settled - 1);
  const row = (p: PlayerRow): LiveBoardRow => ({
    id: p.id,
    nickname: p.nickname,
    avatar: p.avatar,
    score: now.totals.get(p.id) ?? 0,
    rank: now.rank.get(p.id) ?? 0,
    prevRank: before.rank.get(p.id) ?? null,
    streak: streakOf(answers, p.id, settled),
  });
  const thisQuestion = answers.filter((a) => a.q_index === idx);
  const counts = q ? q.options.map((_, i) => thisQuestion.filter((a) => a.choice === i).length) : [];

  const me = opts.playerId ? players.find((p) => p.id === opts.playerId) : undefined;
  const myAnswer = me ? thisQuestion.find((a) => a.player_id === me.id) : undefined;

  return {
    pin: session.pin,
    title: session.title,
    status: session.status,
    index: idx,
    total: session.question_count,
    seconds: session.seconds,
    startsAt: session.question_started_at ? Date.parse(session.question_started_at) : null,
    endsAt: session.question_ends_at ? Date.parse(session.question_ends_at) : null,
    serverNow: Date.now(),
    playerCount: players.length,
    lobby: session.status === "lobby" || opts.host ? players.map((p) => ({ id: p.id, nickname: p.nickname, avatar: p.avatar })) : [],
    answered: thisQuestion.length,
    question: showQuestion ? { prompt: q.prompt ?? "", image: q.image ?? null, options: q.options } : null,
    reveal: showQuestion && revealed ? { answer: q.answer, counts } : null,
    board: session.status === "scoreboard" || session.status === "podium" || session.status === "ended" || opts.host ? now.sorted.slice(0, opts.host ? 50 : 5).map(row) : [],
    me: me
      ? {
          ...row(me),
          choice: myAnswer?.choice ?? null,
          result: revealed && myAnswer ? { correct: myAnswer.correct, points: myAnswer.points } : revealed ? { correct: false, points: 0 } : null,
          total: players.length,
        }
      : null,
  };
}

/** Records one answer for the current question. */
export async function submitAnswer(admin: SupabaseClient, session: SessionRow, playerId: string, index: number, choice: number): Promise<string | null> {
  if (session.status !== "question" || index !== session.current_index) return "Soal ini sudah ditutup.";
  const q = questionAt(session);
  if (!q || !Number.isInteger(choice) || choice < 0 || choice >= q.options.length) return "Jawaban tidak valid.";
  const started = Date.parse(session.question_started_at ?? "");
  const ends = Date.parse(session.question_ends_at ?? "");
  const now = Date.now();
  if (now < started - GRACE_MS) return "Soal belum dimulai.";
  if (now > ends + GRACE_MS) return "Waktu habis.";

  const { data: previous } = await admin.from("live_answers").select("player_id, q_index, choice, correct, points").eq("player_id", playerId).lt("q_index", index);
  const streakBefore = streakOf((previous || []) as AnswerRow[], playerId, index - 1);
  const elapsed = Math.max(0, now - started);
  const correct = choice === q.answer;
  const { error } = await admin.from("live_answers").insert({
    session_id: session.id,
    player_id: playerId,
    q_index: index,
    choice,
    correct,
    points: scoreAnswer(correct, elapsed, session.seconds * 1000, streakBefore),
    elapsed_ms: Math.min(elapsed, 2_000_000_000),
  });
  if (error) return error.code === "23505" ? "Kamu sudah menjawab soal ini." : "Gagal menyimpan jawaban.";
  return null;
}
