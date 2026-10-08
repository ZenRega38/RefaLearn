import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { advanceIfDue, buildState, control, ranking, scoreAnswer, sessionById, streakOf, submitAnswer, type SessionRow } from "@/lib/live/server";
import { getCourse } from "@/lib/course/content";

// ---------------------------------------------------------------------------
// A tiny in-memory stand-in for the Supabase query builder: just the calls
// lib/live/server.ts makes, with the unique keys the migration defines.
// ---------------------------------------------------------------------------

type Row = Record<string, unknown>;
const UNIQUE: Record<string, (r: Row) => string> = {
  live_answers: (r) => `${r.player_id}:${r.q_index}`,
  live_players: (r) => `${r.session_id}:${String(r.nickname).toLowerCase()}`,
};

function fakeDb() {
  const tables: Record<string, Row[]> = { live_sessions: [], live_players: [], live_answers: [] };
  let seq = 0;
  const from = (table: string) => {
    const filters: ((r: Row) => boolean)[] = [];
    let op: "select" | "update" | "insert" | "delete" = "select";
    let patch: Row | null = null;
    const inserted: Row[] = [];
    let countMode = false;
    let headMode = false;
    let order: { col: string; asc: boolean } | null = null;
    let limit = Infinity;
    let returning = false;
    let error: { code: string } | null = null;

    const rows = () => {
      let out = tables[table].filter((r) => filters.every((f) => f(r)));
      if (order) out = [...out].sort((a, b) => (String(a[order!.col]) < String(b[order!.col]) ? -1 : 1) * (order!.asc ? 1 : -1));
      return out.slice(0, limit);
    };
    const run = () => {
      if (op === "insert") return { data: returning ? inserted[0] : null, error };
      if (op === "delete") {
        const kill = new Set(rows());
        tables[table] = tables[table].filter((r) => !kill.has(r));
        return { data: null, error: null };
      }
      if (op === "update") {
        const hit = rows();
        hit.forEach((r) => Object.assign(r, patch));
        return { data: returning ? hit[0] ?? null : null, error: null };
      }
      const hit = rows();
      return { data: headMode ? null : hit, count: countMode ? hit.length : null, error: null };
    };

    const b = {
      select(_cols?: string, opts?: { count?: string; head?: boolean }) {
        if (op !== "select") returning = true;
        countMode = !!opts?.count;
        headMode = !!opts?.head;
        return b;
      },
      insert(row: Row | Row[]) {
        op = "insert";
        const list = Array.isArray(row) ? row : [row];
        for (const r of list) {
          const full = { id: `id-${++seq}`, joined_at: new Date(Date.now() + seq).toISOString(), created_at: new Date().toISOString(), ...r };
          const key = UNIQUE[table];
          if (key && tables[table].some((x) => key(x) === key(full))) {
            error = { code: "23505" };
            return b;
          }
          tables[table].push(full);
          inserted.push(full);
        }
        return b;
      },
      update(p: Row) { op = "update"; patch = p; return b; },
      delete() { op = "delete"; return b; },
      eq(col: string, v: unknown) { filters.push((r) => r[col] === v); return b; },
      neq(col: string, v: unknown) { filters.push((r) => r[col] !== v); return b; },
      lt(col: string, v: number) { filters.push((r) => (r[col] as number) < v); return b; },
      gte(col: string, v: string) { filters.push((r) => String(r[col]) >= v); return b; },
      order(col: string, o?: { ascending?: boolean }) { order = { col, asc: o?.ascending !== false }; return b; },
      limit(n: number) { limit = n; return b; },
      maybeSingle() { const r = run(); return Promise.resolve({ ...r, data: Array.isArray(r.data) ? r.data[0] ?? null : r.data }); },
      single() { return b.maybeSingle(); },
      then(resolve: (v: unknown) => void, reject?: (e: unknown) => void) { return Promise.resolve(run()).then(resolve, reject); },
    };
    return b;
  };
  return { client: { from } as unknown as SupabaseClient, tables };
}

// ---------------------------------------------------------------------------

describe("live quiz scoring", () => {
  it("rewards speed: instant right answer ≈ 1000, at the buzzer 500, wrong 0", () => {
    expect(scoreAnswer(true, 0, 20000, 0)).toBe(1000);
    expect(scoreAnswer(true, 20000, 20000, 0)).toBe(500);
    expect(scoreAnswer(true, 10000, 20000, 0)).toBe(750);
    expect(scoreAnswer(false, 0, 20000, 3)).toBe(0);
  });

  it("adds a streak bonus capped at +400", () => {
    expect(scoreAnswer(true, 0, 20000, 1)).toBe(1100);
    expect(scoreAnswer(true, 0, 20000, 9)).toBe(1400);
  });

  it("counts consecutive right answers back from a question", () => {
    const a = [
      { player_id: "p", q_index: 0, choice: 0, correct: true, points: 1 },
      { player_id: "p", q_index: 1, choice: 0, correct: false, points: 0 },
      { player_id: "p", q_index: 2, choice: 0, correct: true, points: 1 },
      { player_id: "p", q_index: 3, choice: 0, correct: true, points: 1 },
    ];
    expect(streakOf(a, "p", 3)).toBe(2);
    expect(streakOf(a, "p", 1)).toBe(0);
    expect(streakOf(a, "p", 0)).toBe(1);
  });

  it("ranks by score and lets ties share a place", () => {
    const players = [
      { id: "a", nickname: "A", avatar: "owl", joined_at: "1" },
      { id: "b", nickname: "B", avatar: "owl", joined_at: "2" },
      { id: "c", nickname: "C", avatar: "owl", joined_at: "3" },
    ];
    const answers = [
      { player_id: "a", q_index: 0, choice: 0, correct: true, points: 900 },
      { player_id: "b", q_index: 0, choice: 0, correct: true, points: 900 },
      { player_id: "c", q_index: 0, choice: 1, correct: false, points: 0 },
    ];
    const { rank } = ranking(players, answers, 0);
    expect([rank.get("a"), rank.get("b"), rank.get("c")]).toEqual([1, 1, 3]);
  });
});

describe("a full live quiz", () => {
  beforeEach(() => vi.useFakeTimers({ now: new Date("2026-10-08T03:00:00Z") }));
  afterEach(() => vi.useRealTimers());

  it("runs lobby → questions → reveal → scoreboard → podium, with fair points and overtakes", async () => {
    const { client, tables } = fakeDb();
    const set = getCourse("english-day")!.levels[0].live!;
    tables.live_sessions.push({
      id: "s1", pin: "123456", course_slug: "english-day", level_id: "ed-m1", title: set.title,
      status: "lobby", current_index: -1, question_count: set.questions.length, seconds: 20,
      question_started_at: null, question_ends_at: null, created_at: new Date().toISOString(),
    });
    for (const nickname of ["Ani", "Budi", "Citra"]) tables.live_players.push({ id: nickname, session_id: "s1", nickname, avatar: "owl", token_hash: "x", joined_at: `${nickname}` });
    const load = async () => (await sessionById(client, "s1")) as SessionRow;

    // Start: question 0 opens after a short "get ready" beat.
    expect(await control(client, await load(), "start")).toBeNull();
    let s = await load();
    expect(s.status).toBe("question");
    expect(await submitAnswer(client, s, "Ani", 0, set.questions[0].answer)).toBe("Soal belum dimulai.");

    vi.advanceTimersByTime(1500 + 2000); // 2 s into the question
    const right0 = set.questions[0].answer;
    expect(await submitAnswer(client, s, "Ani", 0, right0)).toBeNull();
    expect(await submitAnswer(client, s, "Ani", 0, right0)).toBe("Kamu sudah menjawab soal ini.");
    vi.advanceTimersByTime(8000); // 10 s in
    expect(await submitAnswer(client, s, "Budi", 0, right0)).toBeNull();
    expect(await submitAnswer(client, s, "Citra", 0, (right0 + 1) % 4)).toBeNull();

    // Everyone answered → the question closes by itself.
    s = await advanceIfDue(client, s);
    expect(s.status).toBe("reveal");
    let host = await buildState(client, s, { host: true });
    expect(host.reveal?.answer).toBe(right0);
    expect(host.reveal?.counts.reduce((a, b) => a + b, 0)).toBe(3);
    const ani = host.board.find((r) => r.id === "Ani")!;
    const budi = host.board.find((r) => r.id === "Budi")!;
    expect(ani.score).toBeGreaterThan(budi.score); // faster = more points
    expect(ani.rank).toBe(1);

    // A player sees only their own result and no key before the reveal.
    const citraView = await buildState(client, s, { playerId: "Citra" });
    expect(citraView.me?.result).toEqual({ correct: false, points: 0 });

    // Scoreboard, then question 1 where Budi answers instantly and Ani is wrong.
    await control(client, await load(), "next");
    expect((await load()).status).toBe("scoreboard");
    await control(client, await load(), "next");
    s = await load();
    expect(s.status).toBe("question");
    expect(s.current_index).toBe(1);
    const playerView = await buildState(client, s, { playerId: "Ani" });
    expect(playerView.reveal).toBeNull();
    expect(JSON.stringify(playerView.question)).not.toContain("answer");

    vi.advanceTimersByTime(1500);
    const right1 = set.questions[1].answer;
    expect(await submitAnswer(client, s, "Budi", 1, right1)).toBeNull();
    expect(await submitAnswer(client, s, "Ani", 1, (right1 + 1) % 4)).toBeNull();
    // Citra doesn't answer; time runs out.
    vi.advanceTimersByTime(21_000);
    expect(await submitAnswer(client, s, "Citra", 1, right1)).toBe("Waktu habis.");
    s = await advanceIfDue(client, s);
    expect(s.status).toBe("reveal");
    host = await buildState(client, s, { host: true });
    const budi1 = host.board.find((r) => r.id === "Budi")!;
    expect(budi1.rank).toBe(1); // overtook Ani
    expect(budi1.prevRank).toBe(2);
    expect(budi1.streak).toBe(2);

    // Skip to the end: podium, then ended.
    for (let i = 2; i < set.questions.length; i++) {
      await control(client, await load(), "next"); // scoreboard
      await control(client, await load(), "next"); // question i
      await control(client, await load(), "next"); // close question (host skip)
      expect((await load()).status).toBe("reveal");
    }
    await control(client, await load(), "next"); // scoreboard
    await control(client, await load(), "next"); // podium
    expect((await load()).status).toBe("podium");
    const podium = await buildState(client, await load(), { playerId: "Citra" });
    expect(podium.board.slice(0, 3).map((r) => r.id)).toEqual(["Budi", "Ani", "Citra"]);
    await control(client, await load(), "next");
    expect((await load()).status).toBe("ended");
    expect(await control(client, await load(), "next")).toBe("Kuis sudah selesai.");
  });
});

describe("English Day live sets", () => {
  it("every module has a picture live quiz with four options and spread keys", () => {
    const course = getCourse("english-day")!;
    expect(course.levels).toHaveLength(10);
    const keys: number[] = [];
    for (const level of course.levels) {
      const live = level.live!;
      expect(live.questions.length, level.id).toBeGreaterThanOrEqual(8);
      for (const q of live.questions) {
        expect(q.options, q.id).toHaveLength(4);
        expect(q.image, q.id).toBeTruthy();
        keys.push(q.answer);
      }
    }
    for (let k = 0; k < 4; k++) expect(keys.filter((x) => x === k).length).toBeGreaterThan(keys.length / 8);
  });
});
