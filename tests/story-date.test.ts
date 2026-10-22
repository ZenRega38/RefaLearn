import { describe, expect, it } from "vitest";
import { storyDate } from "@/lib/format";

describe("story dates", () => {
  it("shows the event date when the admin picked one", () => {
    expect(storyDate({ event_date: "2024-11-23", published_at: "2026-10-19T08:00:00Z" }, undefined, "en")).toBe("23 Nov 2024");
    expect(storyDate({ event_date: "2024-11-23", published_at: null }, "dd MMMM yyyy", "en")).toBe("23 November 2024");
  });

  it("falls back to the publish date, then to nothing", () => {
    expect(storyDate({ event_date: null, published_at: "2026-10-19T08:00:00Z" }, undefined, "en")).toBe("19 Oct 2026");
    expect(storyDate({ event_date: null, published_at: null })).toBe("");
  });

  it("is written in the visitor's language, Indonesian by default", () => {
    expect(storyDate({ event_date: null, published_at: "2026-10-19T08:00:00Z" })).toBe("19 Okt 2026");
    expect(storyDate({ event_date: "2024-08-17", published_at: null }, "dd MMMM yyyy")).toBe("17 Agustus 2024");
  });
});
