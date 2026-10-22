import { describe, expect, it, vi } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { attemptState, closeExpiredQuizAttempts, lessonsToRestudy, pendingRestart, restartInfo, type CourseCtx, type FoundQuiz, type QuizAttemptRow } from "@/lib/course/attempts";
import { ALL_COURSES, computeUnlocks } from "@/lib/course/content";
import type { AttemptState } from "@/lib/course/attempt-rules";
import type { ProgressItem } from "@/lib/course/types";

/** A read-only stand-in for the Supabase client: every query on a table returns its rows. */
function fakeAdmin(tables: Record<string, unknown[]>): SupabaseClient {
  const query = (rows: unknown[]) => {
    const q: Record<string, unknown> = {};
    for (const m of ["select", "eq", "not", "in", "order"]) q[m] = () => q;
    q.then = (resolve: (v: { data: unknown[] }) => void) => resolve({ data: rows });
    return q;
  };
  return { from: (t: string) => query(tables[t] ?? []) } as unknown as SupabaseClient;
}

const state = (left: number): AttemptState => ({ max: 3, used: 3 - left, left, cooldownUntil: null, open: null, attempts: [], unlimited: false, serverNow: "" });

describe("starting over", () => {
  it("knows when a restart is waiting for its new round", () => {
    expect(pendingRestart([])).toBeNull();
    // Older attempts that just don't count (no restart stamp) are not a restart.
    expect(pendingRestart([{ counted: false, restarted_at: null, started_at: "2026-01-01T00:00:00Z" }])).toBeNull();
    const round = [1, 2, 3].map((d) => ({ counted: false, restarted_at: "2026-03-10T00:00:00Z", started_at: `2026-03-0${d}T00:00:00Z` }));
    expect(pendingRestart(round)).toBe("2026-03-10T00:00:00Z");
    // Once the new round has begun, the lessons don't block anything anymore.
    expect(pendingRestart([...round, { counted: true, restarted_at: null, started_at: "2026-03-12T00:00:00Z" }])).toBeNull();
  });

  it("asks for the chapter's lessons finished before the restart", () => {
    const lessons = [{ id: "a", title: "A" }, { id: "b", title: "B" }];
    const completions = new Map([["a", "2026-03-11T00:00:00Z"], ["b", "2026-03-01T00:00:00Z"]]);
    const info = restartInfo(lessons, completions, "2026-03-10T00:00:00Z", state(3));
    expect(info.pending).toBe(true);
    expect(info.lessons.map((l) => l.done)).toEqual([true, false]);
    expect(restartInfo(lessons, completions, null, state(0))).toMatchObject({ available: true, pending: false });
  });

  it("only touches the restarted chapter: later chapters stay open", async () => {
    const course = ALL_COURSES.find((c) => c.slug === "english-sd-3")!;
    const [ch1, ch2] = course.levels;
    const before = "2026-03-01T00:00:00Z";
    const restartAt = "2026-03-10T00:00:00Z";
    const progressRows = [...ch1.lessons, ...ch2.lessons].map((l) => ({ item_id: l.id, completed_at: before }));
    const admin = fakeAdmin({
      course_quiz_attempts: [1, 2, 3].map(() => ({ item_id: ch1.quiz.id, counted: false, restarted_at: restartAt, started_at: before })),
      course_progress: progressRows,
    });
    const restudy = await lessonsToRestudy(admin, "student", course);
    expect([...restudy].sort()).toEqual(ch1.lessons.map((l) => l.id).sort());

    // Progress itself is untouched, so the unlocking chain (and chapter 2) stays as it was.
    const progress: ProgressItem[] = [
      ...(ch1.pretest ? [{ itemId: ch1.pretest.id, kind: "level_pretest" as const, score: 5, maxScore: 5, passed: true }] : []),
      ...ch1.lessons.map((l) => ({ itemId: l.id, kind: "lesson" as const, score: null, maxScore: null, passed: true })),
      { itemId: ch1.quiz.id, kind: "level_quiz", score: 9, maxScore: 10, passed: true },
    ];
    const unlocks = computeUnlocks(course, progress);
    expect(unlocks.unlocked.has(ch2.lessons[0].id) || unlocks.unlocked.has(ch2.pretest!.id)).toBe(true);
  });

  it("ignores older tryout attempts that simply don't count", async () => {
    const course = ALL_COURSES.find((c) => c.slug === "toefl-itp")!;
    const last = course.levels.at(-1)!;
    const admin = fakeAdmin({
      course_quiz_attempts: [],
      course_attempts: [{ counted: false, restarted_at: null, started_at: "2025-01-01T00:00:00Z" }],
      course_progress: last.lessons.map((l) => ({ item_id: l.id, completed_at: "2025-01-02T00:00:00Z" })),
    });
    expect((await lessonsToRestudy(admin, "student", course)).size).toBe(0);
  });
});

describe("expired attempts & attemptState", () => {
  it("does not report an open attempt when deadline has passed", () => {
    const pastDeadline = new Date(Date.now() - 10_000).toISOString();
    const rows = [{ id: "1", no: 1, submittedAt: null, deadline: pastDeadline, counted: true }];
    const summaries = [{ id: "1", no: 1, startedAt: "", submittedAt: null, score: null, maxScore: null, passed: null, autoSubmitted: false, counted: true }];
    const res = attemptState(rows, summaries, 10, false);
    expect(res.open).toBeNull();
  });

  it("reports open attempt when deadline is in the future", () => {
    const futureDeadline = new Date(Date.now() + 60_000).toISOString();
    const rows = [{ id: "1", no: 1, submittedAt: null, deadline: futureDeadline, counted: true }];
    const summaries = [{ id: "1", no: 1, startedAt: "", submittedAt: null, score: null, maxScore: null, passed: null, autoSubmitted: false, counted: true }];
    const res = attemptState(rows, summaries, 10, false);
    expect(res.open).toEqual({ id: "1", no: 1, deadline: futureDeadline });
  });

  it("closes expired quiz attempts even within grace period", async () => {
    const pastDeadline = new Date(Date.now() - 1000).toISOString();
    const expiredRow: QuizAttemptRow = {
      id: "att-1",
      attempt_no: 1,
      started_at: new Date(Date.now() - 600_000).toISOString(),
      deadline_at: pastDeadline,
      draft: { "q1": "A" },
      submitted_at: null,
      auto_submitted: false,
      answers: null,
      score: null,
      max_score: null,
      passed: null,
      counted: true,
      restarted_at: null,
    };

    const chain = {
      eq: () => chain,
      is: () => chain,
      gte: () => chain,
      order: () => chain,
      limit: async () => ({ data: [] }),
      select: () => chain,
      maybeSingle: async () => ({
        data: { ...expiredRow, submitted_at: new Date().toISOString(), auto_submitted: true, score: 1, max_score: 1, passed: true },
        error: null,
      }),
      then: (resolve: (v: unknown) => void) => resolve({ data: [{ ...expiredRow, submitted_at: new Date().toISOString(), auto_submitted: true }] }),
    };

    const mockAdmin = {
      rpc: async () => ({ error: null }),
      from: () => ({
        update: () => chain,
        select: () => chain,
        upsert: async () => ({ error: null }),
        insert: async () => ({ error: null }),
      }),
    } as unknown as SupabaseClient;

    const ctx: CourseCtx = {
      admin: mockAdmin,
      user: { id: "user-1" } as any,
      course: { slug: "eac-olympiad-5", quizSecondsPerQuestion: 60 } as any,
      profile: { role: "student" } as any,
      progress: [],
      unlocks: {} as any,
      access: true,
    };

    const found: FoundQuiz = {
      level: { lessons: [] } as any,
      quiz: { id: "eac5-tryout", title: "Tryout", questions: [{ id: "q1" }], passPercent: 70 } as any,
      isPretest: false,
    };

    const updatedRows = await closeExpiredQuizAttempts(ctx, found, [expiredRow]);
    expect(updatedRows[0].submitted_at).not.toBeNull();
  });
});
