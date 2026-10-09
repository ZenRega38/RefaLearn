import "server-only";
import type {
  AudioScript,
  Block,
  Course,
  FillQuestion,
  Lesson,
  Level,
  LevelQuiz,
  LiveQuizSet,
  MatchQuestion,
  McQuestion,
  MsQuestion,
  OrderQuestion,
  Passage,
  Question,
  Speaker,
  TaskBlock,
} from "@/lib/course/types";
import { seedOf, shuffle } from "@/lib/course/grading";

// Shared builders for the all-English course catalogue (Kurikulum Merdeka
// grades, exam prep, general English).
//
// Language rule: titles, instructions, questions, options, passages and
// tasks are English. Indonesian appears only in explanations, vocabulary
// meanings, the meaning column of tables, teaching text, and questions
// built with the `tr*` helpers (translation items).

type Extra = { audio?: AudioScript; hots?: boolean; passageId?: string; image?: string; translate?: boolean };

const extra = (e: Extra = {}) => ({
  ...(e.audio ? { audio: e.audio } : {}),
  ...(e.hots ? { hots: true } : {}),
  ...(e.passageId ? { passageId: e.passageId } : {}),
  ...(e.image ? { image: e.image } : {}),
  ...(e.translate ? { translate: true } : {}),
});

export function say(...lines: [Speaker, string][]): AudioScript {
  return lines.map(([speaker, text]) => ({ speaker, text }));
}

/** One spoken line (by a woman unless said otherwise). */
export const voice = (text: string, speaker: Speaker = "woman"): AudioScript => [{ speaker, text }];

// --- Questions ----------------------------------------------------------------

export const pick = (id: string, prompt: string, options: string[], answer: number, explanation: string, e: Extra = {}): McQuestion => ({
  id,
  type: "mc",
  prompt,
  options,
  answer,
  explanation,
  ...extra(e),
});

/** Listen, then choose. */
export const listen = (id: string, audio: AudioScript, prompt: string, options: string[], answer: number, explanation: string, e: Extra = {}): McQuestion =>
  pick(id, prompt, options, answer, explanation, { ...e, audio });

export const pickMany = (id: string, prompt: string, options: string[], answers: number[], explanation: string, e: Extra = {}): MsQuestion => ({
  id,
  type: "ms",
  prompt,
  options,
  answers,
  explanation,
  ...extra(e),
});

export const fill = (id: string, prompt: string, before: string, after: string, accept: string[], explanation: string, e: Extra = {}): FillQuestion => ({
  id,
  type: "fill",
  prompt,
  before,
  after,
  accept,
  explanation,
  ...extra(e),
});

/** Put the words in order. Pass the correct sentence; extra accepted orders optional. */
export const arrange = (id: string, prompt: string, sentence: string, explanation: string, e: Extra & { alternatives?: string[] } = {}): OrderQuestion => {
  const words = sentence.split(" ");
  return { id, type: "order", prompt, tiles: words, answer: [words, ...(e.alternatives ?? []).map((a) => a.split(" "))], explanation, ...extra(e) };
};

export const match = (id: string, prompt: string, pairs: [string, string][], explanation: string, e: Extra = {}): MatchQuestion => ({
  id,
  type: "match",
  prompt,
  pairs,
  explanation,
  ...extra(e),
});

/** IELTS-style True / False / Not Given (options stay in this order). */
export const tfng = (id: string, statement: string, answer: "TRUE" | "FALSE" | "NOT GIVEN", explanation: string, e: Extra = {}): McQuestion =>
  pick(id, statement, ["TRUE", "FALSE", "NOT GIVEN"], ["TRUE", "FALSE", "NOT GIVEN"].indexOf(answer), explanation, e);

/** IELTS-style Yes / No / Not Given for the writer's views (options stay in this order). */
export const ynng = (id: string, statement: string, answer: "YES" | "NO" | "NOT GIVEN", explanation: string, e: Extra = {}): McQuestion =>
  pick(id, statement, ["YES", "NO", "NOT GIVEN"], ["YES", "NO", "NOT GIVEN"].indexOf(answer), explanation, e);

// Translation items: the only questions that may show Indonesian.
export const trPick = (id: string, prompt: string, options: string[], answer: number, explanation: string, e: Extra = {}) =>
  pick(id, prompt, options, answer, explanation, { ...e, translate: true });
export const trMatch = (id: string, prompt: string, pairs: [string, string][], explanation: string, e: Extra = {}) =>
  match(id, prompt, pairs, explanation, { ...e, translate: true });
export const trFill = (id: string, prompt: string, before: string, after: string, accept: string[], explanation: string, e: Extra = {}) =>
  fill(id, prompt, before, after, accept, explanation, { ...e, translate: true });

// --- Lesson blocks --------------------------------------------------------------

export const text = (md: string): Block => ({ type: "text", md });
export const tip = (md: string): Block => ({ type: "tip", md });
export const warn = (md: string): Block => ({ type: "warning", md });
export const table = (head: string[], rows: string[][]): Block => ({ type: "table", head, rows });
export const examples = (items: { wrong?: string; right?: string; note?: string }[], title?: string): Block => ({ type: "examples", items, ...(title ? { title } : {}) });
export const passage = (p: Passage): Block => ({ type: "passage", passage: p });
export const tryIt = (question: Question): Block => ({ type: "try", question });
export const pics = (items: (string | [string, string])[], caption?: string): Block => ({
  type: "pictures",
  items: items.map((it) => (typeof it === "string" ? { pic: it } : { pic: it[0], label: it[1] })),
  ...(caption ? { caption } : {}),
});

/** Picture-word cards: [word, meaning (Indonesian), picture?, example?]. */
export const vocab = (items: [string, string, string?, string?][], title?: string): Block => ({
  type: "vocab",
  ...(title ? { title } : {}),
  items: items.map(([word, meaning, pic, example]) => ({ emoji: "", word, meaning, ...(pic ? { pic } : {}), ...(example ? { example } : {}) })),
});

/** A dialogue or monologue the learner can play (with transcript). */
export const audio = (caption: string, script: AudioScript, showTranscript = true): Block => ({ type: "audio", caption, script, showTranscript });

/** "Listen and repeat": each line read aloud slowly. */
export const repeat = (lines: string[], caption = "Listen and repeat"): Block => ({
  type: "audio",
  caption,
  showTranscript: true,
  script: lines.map((t) => ({ speaker: "woman" as const, text: t })),
});

export const writing = (t: Omit<TaskBlock, "type" | "kind">): TaskBlock => ({ type: "task", kind: "writing", ...t });
export const speaking = (t: Omit<TaskBlock, "type" | "kind">): TaskBlock => ({ type: "task", kind: "speaking", ...t });

// --- Live quiz ------------------------------------------------------------------

/** A live-quiz question: four answers, optional picture. */
export const live = (id: string, prompt: string, options: [string, string, string, string], answer: number, image?: string, translate = false): McQuestion => ({
  id,
  type: "mc",
  prompt,
  options,
  answer,
  explanation: "",
  ...(image ? { image } : {}),
  ...(translate ? { translate: true } : {}),
});

// --- Course assembly ------------------------------------------------------------

// Options are authored with the key first; a fixed per-question shuffle
// spreads keys across positions so learners can't "always pick A".
const FIXED_ORDER = new Set(["TRUE|FALSE|NOT GIVEN", "YES|NO|NOT GIVEN"]);

export function balance<Q extends Question>(q: Q): Q {
  if (q.type === "mc" && FIXED_ORDER.has(q.options.join("|"))) return q;
  if (q.type === "mc") {
    const order = shuffle(q.options.map((_, i) => i), seedOf(q.id));
    return { ...q, options: order.map((i) => q.options[i]), answer: order.indexOf(q.answer) };
  }
  if (q.type === "ms") {
    const order = shuffle(q.options.map((_, i) => i), seedOf(q.id));
    return { ...q, options: order.map((i) => q.options[i]), answers: q.answers.map((a) => order.indexOf(a)).sort((a, b) => a - b) };
  }
  return q;
}
const balanceQuiz = (quiz: LevelQuiz): LevelQuiz => ({ ...quiz, questions: quiz.questions.map(balance) });
const balanceLive = (set: LiveQuizSet): LiveQuizSet => ({ ...set, questions: set.questions.map(balance) });

/** Balances checkpoint and "try it" questions inside a lesson. */
export function balanceLesson(lesson: Lesson): Lesson {
  return {
    ...lesson,
    sections: lesson.sections.map((s) => ({
      ...s,
      blocks: s.blocks.map((b) => (b.type === "try" ? { ...b, question: balance(b.question) } : b)),
    })),
    checkpoint: lesson.checkpoint.map(balance),
  };
}

/**
 * Spreads answer keys in lessons, pretests, posttests and live quizzes so
 * the right answer isn't always in the same place.
 */
export function assemble(course: Course): Course {
  return {
    ...course,
    levels: course.levels.map((l: Level) => ({
      ...l,
      lessons: l.lessons.map(balanceLesson),
      pretest: l.pretest && balanceQuiz(l.pretest),
      quiz: balanceQuiz(l.quiz),
      live: l.live && balanceLive(l.live),
    })),
  };
}
