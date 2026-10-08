import { describe, expect, it } from "vitest";
import { generateAvailableSlots, weeklyDates, type AvailabilityRule } from "@/lib/rrule-helpers";
import { getDayType, getSessionPrice, SESSION_PRICES } from "@/lib/pricing";
import { addDaysStr, hoursUntil, localDateTimeToInstant, previousPeriod, todayStr } from "@/lib/time";
import { cancellationFeeFor } from "@/lib/cancellation";
import { CANCELLATION_FEE_AMOUNT } from "@/lib/policy";

const rule = (over: Partial<AvailabilityRule>): AvailabilityRule => ({
  id: "r1",
  day_of_week: 1,
  specific_date: null,
  start_time: "16:00:00",
  end_time: "17:30:00",
  is_recurring: true,
  recurrence_end_date: null,
  is_active: true,
  ...over,
});

describe("generateAvailableSlots", () => {
  it("puts a Monday rule on Mondays regardless of the machine timezone", () => {
    // 2026-10-12 is a Monday.
    const slots = generateAvailableSlots([rule({})], [], "2026-10-08", "2026-10-31");
    expect(slots.map((s) => s.date)).toEqual(["2026-10-12", "2026-10-19", "2026-10-26"]);
  });

  it("splits a long window into 90-minute slots", () => {
    const slots = generateAvailableSlots(
      [rule({ start_time: "16:00", end_time: "20:00" })],
      [],
      "2026-10-12",
      "2026-10-12"
    );
    expect(slots.map((s) => `${s.start_time}-${s.end_time}`)).toEqual(["16:00-17:30", "17:30-19:00"]);
  });

  it("removes blackout dates and overlapping bookings", () => {
    const slots = generateAvailableSlots(
      [rule({ start_time: "16:00", end_time: "19:00" })],
      [{ id: "b", date: "2026-10-19", reason: null }],
      "2026-10-12",
      "2026-10-26",
      [{ date: "2026-10-12", start_time: "16:30:00", end_time: "18:00:00" }]
    );
    expect(slots.map((s) => `${s.date} ${s.start_time}`)).toEqual([
      "2026-10-26 16:00",
      "2026-10-26 17:30",
    ]);
  });

  it("hides slots that already started today", () => {
    const slots = generateAvailableSlots(
      [rule({ start_time: "08:00", end_time: "12:30" })],
      [],
      "2026-10-12",
      "2026-10-12",
      [],
      { date: "2026-10-12", time: "09:40" }
    );
    expect(slots.map((s) => s.start_time)).toEqual(["11:00"]);
  });

  it("respects recurrence_end_date and one-off rules", () => {
    const slots = generateAvailableSlots(
      [
        rule({ recurrence_end_date: "2026-10-15" }),
        rule({ id: "r2", is_recurring: false, day_of_week: null, specific_date: "2026-10-17", start_time: "09:00", end_time: "10:30" }),
      ],
      [],
      "2026-10-08",
      "2026-10-31"
    );
    expect(slots.map((s) => s.date)).toEqual(["2026-10-12", "2026-10-17"]);
  });
});

describe("weeklyDates", () => {
  it("keeps the weekday across month boundaries", () => {
    expect(weeklyDates("2026-10-26", 3)).toEqual(["2026-10-26", "2026-11-02", "2026-11-09"]);
  });
});

describe("pricing", () => {
  it("prices by the stored date string", () => {
    expect(getDayType("2026-10-12")).toBe("weekday");
    expect(getDayType("2026-10-17")).toBe("saturday");
    expect(getDayType("2026-10-18")).toBe("sunday");
    expect(getSessionPrice("2026-10-18")).toBe(SESSION_PRICES.sunday);
  });
});

describe("time (WITA, UTC+8)", () => {
  it("converts business-local wall time to the right instant", () => {
    expect(localDateTimeToInstant("2026-10-12", "16:00").toISOString()).toBe("2026-10-12T08:00:00.000Z");
  });

  it("knows the local date even when UTC is still on the previous day", () => {
    expect(todayStr(new Date("2026-10-31T17:30:00Z"))).toBe("2026-11-01");
    expect(previousPeriod(new Date("2026-10-31T17:30:00Z"))).toEqual({ month: 10, year: 2026 });
    expect(previousPeriod(new Date("2026-01-01T00:00:00Z"))).toEqual({ month: 12, year: 2025 });
  });

  it("does date arithmetic without drift", () => {
    expect(addDaysStr("2026-12-28", 7)).toBe("2027-01-04");
    expect(hoursUntil("2026-10-12", "16:00", new Date("2026-10-12T04:00:00Z"))).toBe(4);
  });
});

describe("cancellationFeeFor", () => {
  const now = new Date("2026-10-12T00:00:00Z"); // 08:00 WITA

  it("is free for requests not yet accepted", () => {
    expect(cancellationFeeFor([{ date: "2026-10-12", start_time: "10:00", status: "pending" }], now)).toBe(0);
  });

  it("is free with enough notice", () => {
    expect(cancellationFeeFor([{ date: "2026-10-13", start_time: "10:00", status: "accepted" }], now)).toBe(0);
  });

  it("charges one flat fee for a late action, however many sessions", () => {
    expect(
      cancellationFeeFor(
        [
          { date: "2026-10-12", start_time: "16:00", status: "accepted" },
          { date: "2026-10-19", start_time: "16:00", status: "accepted" },
        ],
        now
      )
    ).toBe(CANCELLATION_FEE_AMOUNT);
  });
});
