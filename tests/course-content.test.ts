import { describe, expect, it } from "vitest";
import { TOEFL_ITP } from "@/content/toefl-itp";
import { ENGLISH_SD_3 } from "@/content/english-sd-3";
import { ALL_COURSES, computeUnlocks, findLevelQuiz } from "@/lib/course/content";
import { COURSES as REGISTRY } from "@/lib/course/registry";
import { convertedScore, isCorrect, normalizeAnswer, toPublicQuestion, totalScore } from "@/lib/course/grading";
import type { Course, Passage, ProgressItem, Question, Response } from "@/lib/course/types";

type Located = { q: Question; passages: Passage[]; where: string };

function allQuestions(course: Course): Located[] {
  const out: Located[] = [];
  for (const level of course.levels) {
    if (level.pretest) for (const q of level.pretest.questions) out.push({ q, passages: level.pretest.passages ?? [], where: level.pretest.id });
    for (const lesson of level.lessons) {
      const passages = [
        ...(lesson.passages ?? []),
        ...lesson.sections.flatMap((s) => s.blocks.flatMap((b) => (b.type === "passage" ? [b.passage] : []))),
      ];
      for (const s of lesson.sections) for (const b of s.blocks) if (b.type === "try") out.push({ q: b.question, passages, where: lesson.id });
      for (const q of lesson.checkpoint) out.push({ q, passages: lesson.passages ?? [], where: lesson.id });
    }
    for (const q of level.quiz.questions) out.push({ q, passages: level.quiz.passages ?? [], where: level.quiz.id });
  }
  for (const exam of [course.pretest, course.tryout]) {
    if (!exam) continue;
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

describe("course registry", () => {
  it("lists exactly the courses that have content", () => {
    expect(REGISTRY.map((c) => c.slug).sort()).toEqual(ALL_COURSES.map((c) => c.slug).sort());
  });
});

describe.each(ALL_COURSES.map((c) => [c.slug, c] as const))("content integrity: %s", (_slug, course) => {
  const questions = allQuestions(course);

  it("has unique question ids across the course", () => {
    const ids = questions.map((x) => x.q.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it("has unique lesson / quiz ids", () => {
    const ids = course.levels.flatMap((l) => [l.id, l.quiz.id, ...(l.pretest ? [l.pretest.id] : []), ...l.lessons.map((x) => x.id)]);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it.each(questions.map((x) => [x.q.id, x] as const))("%s has a valid key and explanation", (_id, { q, passages }) => {
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
        expect(q.tiles.length).toBeGreaterThanOrEqual(3);
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
    for (const { q, passages } of questions) {
      const m = q.type === "mc" && q.prompt ? q.prompt.match(re) : null;
      if (!m || !q.passageId) continue;
      const passage = passages.find((p) => p.id === q.passageId)!;
      const from = Number(m[2]);
      const to = m[3] ? Number(m[3]) : from;
      const text = passage.lines.slice(from - 1, to).join(" ").toLowerCase();
      expect(text, `${q.id}: “${m[1]}” not in line ${from}`).toContain(m[1].toLowerCase());
    }
  });

  it("explanations citing “Baris N” point at a passage line", () => {
    for (const { q, passages } of questions) {
      const m = q.explanation.match(/Baris (\d+)/);
      if (!m || !q.passageId) continue;
      const passage = passages.find((p) => p.id === q.passageId)!;
      expect(Number(m[1]), q.id).toBeLessThanOrEqual(passage.lines.length);
    }
  });

  it("never leaks keys or explanations in public questions", () => {
    for (const { q } of questions) {
      const json = JSON.stringify(toPublicQuestion(q));
      expect(json).not.toContain('"explanation"');
      expect(json).not.toMatch(/"(answer|answers|accept|correction|pairs)":/);
      if (q.hots) expect(json).toContain('"hots":true');
    }
  });
});

describe("TOEFL ITP format", () => {
  const tryout = TOEFL_ITP.tryout!;

  it("tryout matches the TOEFL ITP format", () => {
    expect(tryout.sections.map((s) => [s.skill, s.questions.length, s.minutes])).toEqual([
      ["listening", 50, 35],
      ["structure", 40, 25],
      ["reading", 50, 55],
    ]);
    for (const s of tryout.sections) expect(s.parts.flatMap((p) => p.questionIds)).toEqual(s.questions.map((q) => q.id));
    expect(tryout.sections[0].questions.every((q) => q.audio && q.audio.length > 0)).toBe(true);
    expect(tryout.sections[1].questions.filter((q) => q.type === "error")).toHaveLength(25);
  });

  it("pretest parts list every question exactly once", () => {
    for (const s of TOEFL_ITP.pretest!.sections) expect(s.parts.flatMap((p) => p.questionIds)).toEqual(s.questions.map((q) => q.id));
  });

  it("spreads exam answer keys across A–D", () => {
    const keys = tryout.sections
      .flatMap((s) => s.questions)
      .map((q) => (q.type === "mc" ? q.answer : q.type === "error" ? "ABCD".indexOf(q.answer) : -1))
      .filter((k) => k >= 0);
    for (const k of [0, 1, 2, 3]) expect(keys.filter((x) => x === k).length / keys.length).toBeGreaterThan(0.12);
  });
});

describe("TOEFL questions are in English", () => {
  // Explanations and lesson teaching text stay in Indonesian on purpose;
  // everything the student answers (prompts, options, directions) is English.
  const ID_WORDS = /(yang|dan|atau|dengan|soal|pilih|pasangkan|lengkapi|susun|kalimat|bagian|jawaban|menit|benar|salah|semua|isi|tulis|bacaan|percakapan|anda|kata|menjadi|sinonim|strategi|membaca|mendengar|jumlah|ciri|urutkan|tersirat|diputar|pertanyaan|sesuai)/i;

  const textsOf = (q: Question): string[] => {
    const out = [q.prompt ?? ""];
    if (q.type === "mc" || q.type === "ms") out.push(...q.options);
    if (q.type === "fill") out.push(q.before, q.after);
    if (q.type === "match") out.push(...q.pairs.flat());
    if (q.type === "order") out.push(...q.tiles);
    return out.filter(Boolean);
  };

  it("has no Indonesian in question prompts, options or exam directions", () => {
    const hits: string[] = [];
    for (const { q } of allQuestions(TOEFL_ITP)) for (const t of textsOf(q)) if (ID_WORDS.test(t)) hits.push(`${q.id}: ${t}`);
    for (const exam of [TOEFL_ITP.pretest!, TOEFL_ITP.tryout!]) {
      for (const s of exam.sections) {
        if (ID_WORDS.test(s.directions)) hits.push(`${exam.kind}/${s.skill}: ${s.directions}`);
        for (const p of s.parts) if (ID_WORDS.test(p.directions)) hits.push(`${exam.kind}/${s.skill}/${p.title}: ${p.directions}`);
      }
    }
    expect(hits).toEqual([]);
  });
});

describe("Grade 3 module (Kurikulum Merdeka)", () => {
  it("has six chapters, each with a pretest, three lessons and a posttest", () => {
    expect(ENGLISH_SD_3.levels).toHaveLength(6);
    for (const bab of ENGLISH_SD_3.levels) {
      expect(bab.pretest?.questions.length).toBeGreaterThanOrEqual(5);
      expect(bab.lessons).toHaveLength(3);
      expect(bab.quiz.questions.length).toBeGreaterThanOrEqual(8);
      expect(bab.quiz.passPercent).toBe(70);
      for (const lesson of bab.lessons) expect(lesson.checkpoint.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("puts HOTS questions in every chapter's lessons and posttest", () => {
    for (const bab of ENGLISH_SD_3.levels) {
      expect(bab.quiz.questions.filter((q) => q.hots).length, bab.id).toBeGreaterThanOrEqual(2);
      for (const lesson of bab.lessons) expect(lesson.checkpoint.some((q) => q.hots), lesson.id).toBe(true);
    }
  });

  it("spreads posttest keys instead of always the first option", () => {
    const keys = ENGLISH_SD_3.levels.flatMap((b) => b.quiz.questions).filter((q) => q.type === "mc").map((q) => (q.type === "mc" ? q.answer : -1));
    const firstShare = keys.filter((k) => k === 0).length / keys.length;
    expect(firstShare).toBeLessThan(0.5);
  });

  it("finds chapter pretests by id", () => {
    const bab = ENGLISH_SD_3.levels[0];
    expect(findLevelQuiz(ENGLISH_SD_3, bab.pretest!.id)?.isPretest).toBe(true);
    expect(findLevelQuiz(ENGLISH_SD_3, bab.quiz.id)?.isPretest).toBe(false);
  });
});

describe("grading", () => {
  it("normalizes typed answers", () => {
    expect(normalizeAnswer("  Delayed. ")).toBe("delayed");
    expect(normalizeAnswer("Put   Off")).toBe("put off");
    expect(normalizeAnswer("Don’t")).toBe("don't");
  });

  it("converts raw scores to the ITP scale", () => {
    expect(convertedScore("listening", 50, 50)).toBe(68);
    expect(convertedScore("structure", 40, 40)).toBe(68);
    expect(convertedScore("reading", 50, 50)).toBe(67);
    expect(totalScore([68, 68, 67])).toBe(677);
    expect(totalScore([31, 31, 31])).toBe(310);
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
  const pass = (itemId: string): ProgressItem => ({ itemId, kind: "lesson", score: null, maxScore: null, passed: true });

  it("TOEFL: opens only the first lesson, then quiz, then tryout", () => {
    const level = TOEFL_ITP.levels[0];
    expect([...computeUnlocks(TOEFL_ITP, []).unlocked]).toEqual([level.lessons[0].id]);
    const lessons = level.lessons.map((l) => pass(l.id));
    expect(computeUnlocks(TOEFL_ITP, lessons).unlocked.has(level.quiz.id)).toBe(true);
    expect(computeUnlocks(TOEFL_ITP, lessons).tryoutUnlocked).toBe(false);
    expect(computeUnlocks(TOEFL_ITP, [...lessons, pass(level.quiz.id)]).tryoutUnlocked).toBe(true);
  });

  it("Grade 3: chapter pretest comes first, posttest opens the next chapter", () => {
    const [bab1, bab2] = ENGLISH_SD_3.levels;
    expect([...computeUnlocks(ENGLISH_SD_3, []).unlocked]).toEqual([bab1.pretest!.id]);

    const afterPretest = computeUnlocks(ENGLISH_SD_3, [pass(bab1.pretest!.id)]);
    expect(afterPretest.unlocked.has(bab1.lessons[0].id)).toBe(true);
    expect(afterPretest.unlocked.has(bab1.lessons[1].id)).toBe(false);

    const bab1Done = [pass(bab1.pretest!.id), ...bab1.lessons.map((l) => pass(l.id)), pass(bab1.quiz.id)];
    const u = computeUnlocks(ENGLISH_SD_3, bab1Done);
    expect(u.unlocked.has(bab2.pretest!.id)).toBe(true);
    expect(u.unlocked.has(bab2.lessons[0].id)).toBe(false);
    expect(u.completedItems).toBe(5);
    expect(u.totalItems).toBe(6 * 5);
  });
});
