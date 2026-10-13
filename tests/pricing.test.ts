import { describe, expect, it } from "vitest";
import { compareAtPrice, discountPercent, SESSION_PRICES } from "@/lib/pricing";

describe("harga coret", () => {
  it("anchors every session price higher than the real one", () => {
    expect(compareAtPrice(SESSION_PRICES.weekday)).toBe(120000);
    expect(compareAtPrice(SESSION_PRICES.saturday)).toBe(200000);
    expect(compareAtPrice(SESSION_PRICES.sunday)).toBe(250000);
  });

  it("anchors material prices and leaves others plain", () => {
    expect([49000, 99000, 199000, 249000].map(compareAtPrice)).toEqual([100000, 150000, 300000, 400000]);
    expect(compareAtPrice(0)).toBeNull();
    expect(compareAtPrice(75000)).toBeNull();
  });

  it("rounds the discount percentage", () => {
    expect(discountPercent(49000, 100000)).toBe(51);
    expect(discountPercent(100000, 120000)).toBe(17);
    expect(discountPercent(249000, 400000)).toBe(38);
  });
});
