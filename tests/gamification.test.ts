import { describe, expect, it } from "vitest";
import { addDays, computeStreak, levelInfo, levelTitle, milestoneAt, nextMilestone, xpForLevel } from "@/lib/gamification";

describe("levels", () => {
  it("starts at level 1 and grows by 100, 200, 300 … XP per level", () => {
    expect([1, 2, 3, 4, 5].map(xpForLevel)).toEqual([0, 100, 300, 600, 1000]);
    expect(levelInfo(0)).toMatchObject({ level: 1, intoLevel: 0, levelSize: 100, toNext: 100 });
    expect(levelInfo(99).level).toBe(1);
    expect(levelInfo(100)).toMatchObject({ level: 2, intoLevel: 0, levelSize: 200 });
    expect(levelInfo(650)).toMatchObject({ level: 4, intoLevel: 50, toNext: 350 });
  });

  it("never goes below level 1", () => {
    expect(levelInfo(-50).level).toBe(1);
  });

  it("names levels", () => {
    expect(levelTitle(1)).toBe("Beginner");
    expect(levelTitle(4)).toBe("Explorer");
    expect(levelTitle(20)).toBe("Legend");
  });
});

describe("streaks", () => {
  const today = "2026-10-12";

  it("adds calendar days across months and years", () => {
    expect(addDays("2026-10-01", -1)).toBe("2026-09-30");
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2028-02-28", 1)).toBe("2028-02-29");
  });

  it("counts consecutive days up to today", () => {
    expect(computeStreak(["2026-10-10", "2026-10-11", "2026-10-12"], today)).toEqual({ current: 3, best: 3, doneToday: true, atRisk: false });
  });

  it("keeps yesterday's streak alive but at risk until today is done", () => {
    expect(computeStreak(["2026-10-10", "2026-10-11"], today)).toEqual({ current: 2, best: 2, doneToday: false, atRisk: true });
  });

  it("resets after a missed day but remembers the best run", () => {
    const s = computeStreak(["2026-10-01", "2026-10-02", "2026-10-03", "2026-10-04", "2026-10-10"], today);
    expect(s.current).toBe(0);
    expect(s.best).toBe(4);
    expect(s.atRisk).toBe(false);
  });

  it("handles no activity and duplicate days", () => {
    expect(computeStreak([], today)).toEqual({ current: 0, best: 0, doneToday: false, atRisk: false });
    expect(computeStreak(["2026-10-12", "2026-10-12"], today).current).toBe(1);
  });

  it("finds milestones", () => {
    expect(milestoneAt(7)?.xp).toBe(50);
    expect(milestoneAt(8)).toBeNull();
    expect(nextMilestone(0)?.days).toBe(3);
    expect(nextMilestone(7)?.days).toBe(14);
    expect(nextMilestone(100)).toBeNull();
  });
});
