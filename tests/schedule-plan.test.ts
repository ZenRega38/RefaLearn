import { describe, expect, it } from "vitest";
import { endTimeOf, firstBatchUntil, isValidStart, occurrences, patternDates, planProblems, planSummary, type SchedulePlan } from "@/lib/schedule-plan";

const TODAY = "2026-10-13"; // Tuesday
const plan = (p: Partial<SchedulePlan>): SchedulePlan => ({ startDate: "2026-10-19", repeat: "none", dayTimes: {}, time: "16:00", endDate: null, ...p });

describe("times", () => {
  it("ends 90 minutes after the start", () => {
    expect(endTimeOf("16:00")).toBe("17:30");
    expect(endTimeOf("09:45")).toBe("11:15");
    expect(endTimeOf("22:30")).toBe("24:00");
  });

  it("refuses starts that would run past midnight", () => {
    expect(isValidStart("22:30")).toBe(true);
    expect(isValidStart("22:31")).toBe(false);
    expect(isValidStart("7:00")).toBe(false);
    expect(isValidStart("")).toBe(false);
  });
});

describe("occurrences", () => {
  it("one-off: just the start date", () => {
    expect(occurrences(plan({}), "2026-12-31")).toEqual([{ date: "2026-10-19", start_time: "16:00", end_time: "17:30", pattern_key: "once" }]);
  });

  it("weekly: each chosen day at its own time, in order", () => {
    const list = occurrences(plan({ repeat: "weekly", dayTimes: { 1: "16:00", 4: "19:00" }, endDate: "2026-11-01" }), "2026-11-01");
    expect(list.map((o) => `${o.date} ${o.start_time}-${o.end_time}`)).toEqual([
      "2026-10-19 16:00-17:30",
      "2026-10-22 19:00-20:30",
      "2026-10-26 16:00-17:30",
      "2026-10-29 19:00-20:30",
    ]);
  });

  it("daily: every enabled day, times may differ", () => {
    const all = { 0: "10:00", 1: "16:00", 2: "16:00", 3: "16:00", 4: "16:00", 5: "16:00", 6: "09:00" };
    const list = occurrences(plan({ repeat: "daily", dayTimes: all, startDate: "2026-10-17" }), "2026-10-20");
    expect(list.map((o) => `${o.date} ${o.start_time}`)).toEqual(["2026-10-17 09:00", "2026-10-18 10:00", "2026-10-19 16:00", "2026-10-20 16:00"]);
  });

  it("monthly: same date each month, skipping months without it", () => {
    expect(patternDates({ frequency: "monthly", dayOfWeek: null, dayOfMonth: 31 }, "2026-10-31", "2027-03-31")).toEqual(["2026-10-31", "2026-12-31", "2027-01-31", "2027-03-31"]);
    const list = occurrences(plan({ repeat: "monthly", startDate: "2026-10-19" }), "2027-01-31");
    expect(list.map((o) => o.date)).toEqual(["2026-10-19", "2026-11-19", "2026-12-19", "2027-01-19"]);
  });
});

describe("batches and checks", () => {
  it("ongoing schedules cover 60 days first; an end date stops earlier", () => {
    expect(firstBatchUntil(plan({ repeat: "weekly", dayTimes: { 1: "16:00" } }), TODAY)).toBe("2026-12-18");
    expect(firstBatchUntil(plan({ repeat: "weekly", dayTimes: { 1: "16:00" }, endDate: "2026-11-30" }), TODAY)).toBe("2026-11-30");
    expect(firstBatchUntil(plan({}), TODAY)).toBe("2026-10-19");
  });

  it("explains what is wrong", () => {
    expect(planProblems(plan({ repeat: "weekly" }), TODAY)).toEqual(["Pilih minimal satu hari."]);
    expect(planProblems(plan({ startDate: "2026-10-01" }), TODAY)).toEqual(["Tanggal mulai tidak boleh di masa lalu."]);
    expect(planProblems(plan({ repeat: "weekly", dayTimes: { 1: "23:00" } }), TODAY)).toEqual(["Jam mulai hari Senin belum benar."]);
    expect(planProblems(plan({ repeat: "monthly", endDate: "2026-10-01" }), TODAY)).toEqual(["Tanggal akhir harus setelah tanggal mulai."]);
    expect(planProblems(plan({ repeat: "weekly", dayTimes: { 1: "16:00" } }), TODAY)).toEqual([]);
  });

  it("summarises the plan", () => {
    expect(planSummary(plan({ repeat: "weekly", dayTimes: { 4: "19:00", 1: "16:00" } }))).toBe("Setiap minggu: Senin 16:00, Kamis 19:00 · berlanjut terus");
  });
});
