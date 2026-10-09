import { describe, expect, it } from "vitest";
import { splitCategories } from "@/lib/format";

describe("splitCategories", () => {
  it("splits a comma-separated field into separate categories", () => {
    expect(splitCategories("International, Diplomacy, Public Speaking")).toEqual([
      "International",
      "Diplomacy",
      "Public Speaking",
    ]);
  });

  it("trims spacing and drops empty entries", () => {
    expect(splitCategories(" Tips Belajar ,, Pengumuman , ")).toEqual(["Tips Belajar", "Pengumuman"]);
  });

  it("removes case-insensitive duplicates, keeping the first spelling", () => {
    expect(splitCategories("Diplomacy, diplomacy, DIPLOMACY")).toEqual(["Diplomacy"]);
  });

  it("returns an empty list for null, undefined, or blank values", () => {
    expect(splitCategories(null)).toEqual([]);
    expect(splitCategories(undefined)).toEqual([]);
    expect(splitCategories("  ")).toEqual([]);
  });

  it("keeps a single category without commas as is", () => {
    expect(splitCategories("Tips Belajar")).toEqual(["Tips Belajar"]);
  });
});
