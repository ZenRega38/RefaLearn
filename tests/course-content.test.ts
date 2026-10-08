import { describe, expect, it } from "vitest";
import { TOEFL_ITP } from "@/content/toefl-itp";
import { computeUnlocks } from "@/lib/course/content";
import { convertedScore, isCorrect, normalizeAnswer, toPublicQuestion, totalScore } from "@/lib/course/grading";
import type { Passage, Question, Response } from "@/lib/course/types";

const course = TOEFL_ITP;

type Located = { q: Question; passages: Passage[]; where: string };

function allQuestions(): Located[] {
  const out: Located[] = [];
  for (const level of course.levels) {
    for (const lesson of level.lessons) {
      const passages = lesson.passages ?? [];
      for (const s of lesson.sections) for (const b of s.blocks) if (b.type === "try") out.push({ q: b.question, passages, where: lesson.id });
      for (const q of lesson.checkpoint) out.push({ q, passages, where: lesson.id });
    }
    for (const q of level.quiz.questions) out.push({ q, passages: level.quiz.passages ?? [], where: level.quiz.id });
  }
  for (const exam of [course.pretest, course.tryout]) {
    for (const s of exam.sections) for (const q of s.questions) out.push({ q, passages: s.passages ?? [], where: `${exam.kind}/${s.skill}` });
  }
  return out;
}

/** The correct response for a question, built from its key. */
function keyOf(q: Question): Response {
  switch (q.type) {
    case "mc": return { type: "mc", choice: q.answer };
    case "ms": return { type: "ms", choices: q.answers };
    case "fill": return { type: "fill", text: q.accept[0] };
    case "order": return { type: "order", tiles: q.answer[0] };
    case "match": return { type: "match", pairs: q.pairs };
    case "error": return { type: "error", mark: q.answer };
  }
}

describe("course content integrity", () => {
  const questions = allQuestions();

  it("has unique question ids", () => {
    const ids = questions.map((x) => x.q.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it.each(questions.map((x) => [x.q.id, x]))("%s has a valid key and explanation", (_id, { q, passages }) => {
    expect(q.explanation.length).toBeGreaterThan(5);
    switch (q.type) {
      case "mc":
        expect(q.options.length).toBeGreaterThanOrEqual(3);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(q.options.length);
        expect(new Set(q.options).size).toBe(q.options.length);
        break;
      case "ms":
        expect(q.answers.length).toBeGreaterThanOrEqual(2);
        for (const a of q.answers) expect(a).toBeLessThan(q.options.length);
        break;
      case "fill":
        expect(q.accept.length).toBeGreaterThan(0);
        break;
      case "order":
        for (const order of q.answer) expect([...order].sort()).toEqual([...q.tiles].sort());
        break;
      case "match":
        expect(new Set(q.pairs.map((p) => p[0])).size).toBe(q.pairs.length);
        expect(new Set(q.pairs.map((p) => p[1])).size).toBe(q.pairs.length);
        break;
      case "error":
        expect(q.segments.filter((s) => s.mark).map((s) => s.mark)).toEqual(["A", "B", "C", "D"]);
        break;
    }
    if (q.passageId) expect(passages.map((p) => p.id)).toContain(q.passageId);
    // The key must grade as correct.
    expect(isCorrect(q, keyOf(q))).toBe(true);
  });

  it("points every “X in line N” at a line that contains X", () => {
    const re = /[“"]([^”"]+)[”"] in lines? (\d+)(?:[–-](\d+))?/;
    let checked = 0;
    for (const { q, passages } of questions) {
      const m = q.type === "mc" && q.prompt ? q.prompt.match(re) : null;
      if (!m || !q.passageId) continue;
      const passage = passages.find((p) => p.id === q.passageId)!;
      const from = Number(m[2]);
      const to = m[3] ? Number(m[3]) : from;
      const text = passage.lines.slice(from - 1, to).join(" ").toLowerCase();
      expect(text, `${q.id}: “${m[1]}” not in line ${from}${m[3] ? `–${to}` : ""}`).toContain(m[1].toLowerCase());
      checked++;
    }
    expect(checked).toBeGreaterThan(20);
  });

  it("tryout matches the TOEFL ITP format", () => {
    const counts = course.tryout.sections.map((s) => [s.skill, s.questions.length, s.minutes]);
    expect(counts).toEqual([
      ["listening", 50, 35],
      ["structure", 40, 25],
      ["reading", 50, 55],
    ]);
    for (const s of course.tryout.sections) {
      const listed = s.parts.flatMap((p) => p.questionIds);
      expect(listed).toEqual(s.questions.map((q) => q.id));
    }
    const listening = course.tryout.sections[0].questions;
    expect(listening.every((q) => q.audio && q.audio.length > 0)).toBe(true);
    const written = course.tryout.sections[1].questions.filter((q) => q.type === "error");
    expect(written).toHaveLength(25);
  });

  it("pretest parts list every question exactly once", () => {
    for (const s of course.pretest.sections) {
      expect(s.parts.flatMap((p) => p.questionIds)).toEqual(s.questions.map((q) => q.id));
    }
  });

  it("spreads exam answer keys across A–D", () => {
    const keys = course.tryout.sections
      .flatMap((s) => s.questions)
      .map((q) => (q.type === "mc" ? q.answer : q.type === "error" ? "ABCD".indexOf(q.answer) : -1))
      .filter((k) => k >= 0);
    const share = [0, 1, 2, 3].map((k) => keys.filter((x) => x === k).length / keys.length);
    for (const s of share) expect(s).toBeGreaterThan(0.12);
  });

  it("never leaks keys or explanations in public questions", () => {
    for (const { q } of questions) {
      const json = JSON.stringify(toPublicQuestion(q));
      expect(json).not.toContain('"explanation"');
      expect(json).not.toMatch(/"(answer|answers|accept|correction|pairs)":/);
    }
  });
});

describe("grading", () => {
  it("normalizes typed answers", () => {
    expect(normalizeAnswer("  Delayed. ")).toBe("delayed");
    expect(normalizeAnswer("Put   Off")).toBe("put off");
  });

  it("converts raw scores to the ITP scale", () => {
    expect(convertedScore("listening", 50, 50)).toBe(68);
    expect(convertedScore("structure", 40, 40)).toBe(68);
    expect(convertedScore("reading", 50, 50)).toBe(67);
    expect(totalScore([68, 68, 67])).toBe(677);
    expect(totalScore([31, 31, 31])).toBe(310);
    // A 10-question pretest section scales to the full 50.
    expect(convertedScore("listening", 10, 10)).toBe(68);
    expect(convertedScore("listening", 5, 10)).toBe(convertedScore("listening", 25, 50));
  });

  it("conversion tables are complete and never decrease", () => {
    for (const [skill, full] of [["listening", 50], ["structure", 40], ["reading", 50]] as const) {
      let prev = 0;
      for (let raw = 0; raw <= full; raw++) {
        const v = convertedScore(skill, raw, full);
        expect(v).toBeGreaterThanOrEqual(prev);
        prev = v;
      }
    }
  });
});

describe("unlocking", () => {
  const level = course.levels[0];
  const pass = (itemId: string) => ({ itemId, kind: "lesson" as const, score: null, maxScore: null, passed: true });

  it("opens only the first lesson for a new student", () => {
    const u = computeUnlocks(course, []);
    expect([...u.unlocked]).toEqual([level.lessons[0].id]);
    expect(u.tryoutUnlocked).toBe(false);
  });

  it("opens the level quiz after all lessons, and the tryout after the quiz", () => {
    const lessons = level.lessons.map((l) => pass(l.id));
    expect(computeUnlocks(course, lessons).unlocked.has(level.quiz.id)).toBe(true);
    expect(computeUnlocks(course, lessons).tryoutUnlocked).toBe(false);
    expect(computeUnlocks(course, [...lessons, pass(level.quiz.id)]).tryoutUnlocked).toBe(true);
  });
});
