import { describe, expect, it } from "vitest";
import { COURSES } from "@/lib/course/registry";
import { storeCopy } from "@/lib/course/store-copy";

describe("default store copy", () => {
  it.each(COURSES.map((c) => [c.slug] as const))("%s has a title and an about with bullet points", (slug) => {
    const copy = storeCopy(slug);
    expect(copy?.title.length).toBeGreaterThan(3);
    expect(copy?.description).toMatch(/^<p>.+<\/p><ul>(<li>.+?<\/li>)+<\/ul>/);
  });
});
