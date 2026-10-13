import "server-only";
import type { ErrorQuestion, McQuestion } from "@/lib/course/types";
import { pick } from "../kit";

// Builders for the EA Champion English Olympiad modules (SMA, Preliminary →
// Regional → Grand Final). Question formats follow the competition paper:
// 4-option multiple choice in four parts — A Words & Structure, B Reading,
// C Spoken & Written Expression, D Higher-Order Thinking Skills.
//
// Everything the learner answers is English; explanations and teaching
// text are Indonesian, as in the rest of the catalogue.

type Extra = { hots?: boolean; passageId?: string; image?: string };

/**
 * Part D sentence unscrambling, printed the way the paper prints it:
 * numbered chunks, and options that are number orders ("2-1-4-3-5").
 * Pass the correct order first.
 */
export function unscramble(id: string, chunks: string[], options: string[], explanation: string, e: Extra = {}): McQuestion {
  const list = chunks.map((c, i) => `**(${i + 1})** ${c}`).join(" / ");
  return pick(id, `Arrange the chunks into a correct sentence.\n${list}`, options, 0, explanation, { hots: true, ...e });
}

/** Part D multi-error analysis: four similar sentences, one is correct. Correct sentence first. */
export function correctOne(id: string, sentences: string[], explanation: string, e: Extra = {}): McQuestion {
  return pick(id, "Which sentence is grammatically correct?", sentences, 0, explanation, { hots: true, ...e });
}

/** Part C dialogue: who says what, then the best response. Best response first. */
export function respond(id: string, lines: [string, string][], options: string[], explanation: string, e: Extra = {}): McQuestion {
  const prompt = lines.map(([who, text]) => (text === "___" ? `${who}: “___”` : `${who}: “${text}”`)).join("\n");
  return pick(id, `Choose the best response.\n${prompt}`, options, 0, explanation, e);
}

/**
 * "Find the wrong part": mark the four underlined parts with [A:…] … [D:…].
 */
export function findError(id: string, sentence: string, answer: "A" | "B" | "C" | "D", correction: string, explanation: string, e: Extra = {}): ErrorQuestion {
  const segments: ErrorQuestion["segments"] = [];
  const re = /\[([ABCD]):([^\]]+)\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(sentence))) {
    if (m.index > last) segments.push({ text: sentence.slice(last, m.index) });
    segments.push({ text: m[2], mark: m[1] as "A" | "B" | "C" | "D" });
    last = m.index + m[0].length;
  }
  if (last < sentence.length) segments.push({ text: sentence.slice(last) });
  return {
    id,
    type: "error",
    prompt: "Tap the underlined part that is wrong.",
    segments,
    answer,
    correction,
    explanation,
    ...(e.hots ? { hots: true } : {}),
    ...(e.image ? { image: e.image } : {}),
  };
}

/** The scoring table of the paper, reused in every module. */
export const SCORE_TABLE = {
  head: ["Part", "Questions", "Max score", "What it tests"],
  rows: [
    ["A. Words & Structure", "20", "35", "Grammar & vocabulary"],
    ["B. Reading", "10", "27", "Reading strategies"],
    ["C. Spoken & Written Expression", "5", "16", "Dialogue patterns"],
    ["D. Higher-Order Thinking Skills", "5", "22", "Logic: unscrambling, idiomatic prepositions, multi-error"],
  ],
};

/** Rough score on the 100 scale used by the mock tests. */
export const SCORE_FORMULA = {
  head: ["Part", "Formula", "Max"],
  rows: [
    ["A", "correct × 1.75", "35"],
    ["B", "correct × 2.7", "27"],
    ["C", "correct × 3.2", "16"],
    ["D", "correct × 4.4", "22"],
  ],
};
