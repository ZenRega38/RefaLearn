import { describe, expect, it } from "vitest";
import { ALL_COURSES } from "@/lib/course/content";
import { COURSES as REGISTRY } from "@/lib/course/registry";
import { parsePicOption, parsePictureRef } from "@/lib/course/pictures";
import type { Block, Course, Question } from "@/lib/course/types";

// Rules for the all-English course catalogue (uiLang "en"): everything a
// learner reads as an instruction, answers or taps is English. Indonesian
// is allowed only in explanations, vocabulary meanings, the meaning
// column of phrase tables, lesson teaching text, and questions marked
// `translate: true`. English Day has its own, older check.

const CATALOG = ALL_COURSES.filter((c) => REGISTRY.some((r) => r.slug === c.slug && "uiLang" in r && r.uiLang === "en") && c.slug !== "english-day");

const INDONESIAN =
  /\b(yang|dengan|saya|kamu|tidak|sudah|belum|akan|untuk|dari|ini|itu|dan|atau|adalah|dengarkan|pasangkan|lengkapi|susun|pilih|artinya|gambar|jawaban|soal|kalimat|benar|salah|siapa|berapa|bagaimana|kenapa|mengapa|tuliskan|bacaan|teks|percakapan|bab|materi|latihan|ayo|yuk|mari|kosakata|tentang)\b/i;

function questionsOf(course: Course): Question[] {
  const out: Question[] = [];
  for (const level of course.levels) {
    if (level.pretest) out.push(...level.pretest.questions);
    for (const lesson of level.lessons) {
      for (const s of lesson.sections) for (const b of s.blocks) if (b.type === "try") out.push(b.question);
      out.push(...lesson.checkpoint);
    }
    out.push(...level.quiz.questions);
    if (level.live) out.push(...level.live.questions);
  }
  for (const exam of [course.pretest, course.tryout]) if (exam) for (const s of exam.sections) out.push(...s.questions);
  return out;
}

function blocksOf(course: Course): Block[] {
  return course.levels.flatMap((l) => l.lessons.flatMap((x) => x.sections.flatMap((s) => s.blocks)));
}

const shown = (t: string) => parsePicOption(t)?.caption ?? (parsePicOption(t) ? "" : t);

describe.each(CATALOG.map((c) => [c.slug, c] as const))("all-English course: %s", (_slug, course) => {
  it("has English titles, instructions, questions and options (Indonesian only in explanations and translation items)", () => {
    const hits: string[] = [];
    const check = (where: string, text: string | undefined) => {
      if (text && INDONESIAN.test(shown(text))) hits.push(`${where}: ${text}`);
    };
    check(course.slug, course.title);
    check(course.slug, course.subtitle);
    for (const level of course.levels) {
      check(level.id, level.title);
      check(level.id, level.description);
      check(level.id, level.targetScore);
      check(level.quiz.id, level.quiz.title);
      if (level.pretest) check(level.pretest.id, level.pretest.title);
      if (level.live) check(`${level.id}-live`, level.live.title);
      for (const lesson of level.lessons) {
        check(lesson.id, lesson.title);
        check(lesson.id, lesson.summary);
        for (const s of lesson.sections) check(lesson.id, s.title);
      }
    }
    for (const q of questionsOf(course)) {
      if (q.translate) continue;
      check(q.id, q.prompt);
      if (q.type === "mc" || q.type === "ms") q.options.forEach((o) => check(q.id, o));
      if (q.type === "match") q.pairs.flat().forEach((o) => check(q.id, o));
      if (q.type === "fill") [q.before, q.after, ...q.accept].forEach((o) => check(q.id, o));
      if (q.type === "order") check(q.id, q.answer[0].join(" "));
    }
    for (const b of blocksOf(course)) {
      if (b.type === "task") {
        check(b.id, b.prompt);
        check(b.id, b.title);
        b.tips?.forEach((t) => check(b.id, t));
        b.models.forEach((m) => check(b.id, m.text));
        b.rubric.forEach((r) => check(b.id, r));
      }
      if (b.type === "vocab") b.items.forEach((it) => check(it.word, it.word));
      if (b.type === "pictures") b.items.forEach((it) => check(it.pic, it.label));
      if (b.type === "passage") b.passage.lines.forEach((l) => check(b.passage.id, l));
    }
    expect(hits).toEqual([]);
  });

  it("is a full course: chapters with a pretest, at least three lessons, checkpoints, a posttest and a live quiz", () => {
    // School courses have at least six chapters; exam-prep courses have fewer,
    // larger levels plus a full tryout.
    expect(course.levels.length).toBeGreaterThanOrEqual(course.tryout ? 3 : 6);
    for (const level of course.levels) {
      expect(level.pretest?.questions.length ?? 0, level.id).toBeGreaterThanOrEqual(5);
      expect(level.lessons.length, level.id).toBeGreaterThanOrEqual(3);
      for (const lesson of level.lessons) {
        expect(lesson.sections.length, lesson.id).toBeGreaterThanOrEqual(2);
        expect(lesson.checkpoint.length, lesson.id).toBeGreaterThanOrEqual(5);
      }
      expect(level.quiz.questions.length, level.id).toBeGreaterThanOrEqual(10);
      expect(level.live?.questions.length ?? 0, level.id).toBeGreaterThanOrEqual(8);
      expect(level.quiz.questions.some((q) => q.hots), `${level.id} needs HOTS`).toBe(true);
    }
  });

  it("is illustrated: a cover per chapter and pictures in lessons", () => {
    for (const level of course.levels) {
      expect(level.cover?.length ?? 0, level.id).toBeGreaterThan(0);
      const blocks = level.lessons.flatMap((l) => l.sections.flatMap((s) => s.blocks));
      const pictured = blocks.filter((b) => b.type === "pictures" || (b.type === "vocab" && b.items.some((it) => it.pic)) || (b.type === "try" && b.question.image) || (b.type === "task" && b.image));
      expect(pictured.length, level.id).toBeGreaterThan(0);
    }
  });

  it("references only pictures that exist", () => {
    const refs: string[] = [];
    for (const level of course.levels) {
      refs.push(...(level.cover ?? []));
      for (const lesson of level.lessons) for (const p of lesson.passages ?? []) if (p.pic) refs.push(p.pic);
    }
    for (const b of blocksOf(course)) {
      if (b.type === "vocab") b.items.forEach((it) => it.pic && refs.push(it.pic));
      if (b.type === "pictures") b.items.forEach((it) => refs.push(it.pic));
      if (b.type === "task" && b.image) refs.push(b.image);
      if (b.type === "passage" && b.passage.pic) refs.push(b.passage.pic);
    }
    for (const q of questionsOf(course)) {
      if (q.image) refs.push(q.image);
      const texts = q.type === "mc" || q.type === "ms" ? q.options : q.type === "match" ? q.pairs.flat() : [];
      texts.forEach((t) => {
        const p = parsePicOption(t);
        if (p) refs.push(p.ref);
      });
    }
    expect(refs.filter((r) => !parsePictureRef(r))).toEqual([]);
  });

  it("live quizzes use text answers (the host screen shows answers as text)", () => {
    for (const level of course.levels) for (const q of level.live?.questions ?? []) {
      expect(q.options.some((o) => parsePicOption(o)), q.id).toBe(false);
      expect(q.options, q.id).toHaveLength(4);
    }
  });

  it("writing and speaking tasks have models and a rubric", () => {
    for (const b of blocksOf(course)) {
      if (b.type !== "task") continue;
      expect(b.models.length, b.id).toBeGreaterThan(0);
      expect(b.rubric.length, b.id).toBeGreaterThanOrEqual(3);
    }
  });
});
