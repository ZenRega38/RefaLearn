import { describe, expect, it } from "vitest";
import { compareAtPrice, discountPercent, SESSION_PRICES, validBefore } from "@/lib/pricing";

describe("harga coret", () => {
  it("anchors every session price higher than the real one", () => {
    expect(compareAtPrice(SESSION_PRICES.weekday)).toBe(120000);
    expect(compareAtPrice(SESSION_PRICES.saturday)).toBe(200000);
    expect(compareAtPrice(SESSION_PRICES.sunday)).toBe(250000);
  });

  it("leaves non-session prices plain", () => {
    expect(compareAtPrice(49000)).toBeNull();
    expect(compareAtPrice(0)).toBeNull();
  });

  it("only accepts a material's before price above its real price", () => {
    expect(validBefore(49000, 100000)).toBe(100000);
    expect(validBefore(0, 100000)).toBe(100000);
    expect(validBefore(49000, 49000)).toBeNull();
    expect(validBefore(49000, null)).toBeNull();
    expect(discountPercent(0, 100000)).toBe(100);
  });

  it("rounds the discount percentage", () => {
    expect(discountPercent(49000, 100000)).toBe(51);
    expect(discountPercent(100000, 120000)).toBe(17);
    expect(discountPercent(249000, 400000)).toBe(38);
  });
});
