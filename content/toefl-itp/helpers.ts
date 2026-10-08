import "server-only";
import type { AudioScript, ErrorQuestion, McQuestion, Speaker } from "@/lib/course/types";

// Small builders that keep the content files readable. All course content
// is original — no ETS material is reproduced.

const A = 0, B = 1, C = 2, D = 3;
export const KEY = { A, B, C, D } as const;

/** Spoken lines: ["man", "..."], ["woman", "..."]. */
export function say(...lines: [Speaker, string][]): AudioScript {
  return lines.map(([speaker, text]) => ({ speaker, text }));
}

/**
 * ITP Listening Part A: one short exchange, then the narrator asks the
 * question. Only the four options are printed.
 */
export function partA(
  id: string,
  lines: [Speaker, string][],
  question: string,
  options: [string, string, string, string],
  answer: number,
  explanation: string
): McQuestion {
  return {
    id,
    type: "mc",
    audio: [...say(...lines), { speaker: "narrator", text: question }],
    options,
    answer,
    explanation,
  };
}

/** A question about a longer conversation/talk (Parts B & C). The talk is
 * attached to the first question of its group; later ones only speak the
 * question. */
export function spokenQ(
  id: string,
  question: string,
  options: [string, string, string, string],
  answer: number,
  explanation: string,
  talk?: AudioScript
): McQuestion {
  return {
    id,
    type: "mc",
    audio: [...(talk ?? []), { speaker: "narrator", text: question }],
    options,
    answer,
    explanation,
  };
}

export function mc(
  id: string,
  prompt: string,
  options: string[],
  answer: number,
  explanation: string,
  extra: Partial<McQuestion> = {}
): McQuestion {
  return { id, type: "mc", prompt, options, answer, explanation, ...extra };
}

/** Sentence completion (Structure 1–15): the blank is written as ____. */
export function completion(
  id: string,
  sentence: string,
  options: [string, string, string, string],
  answer: number,
  explanation: string
): McQuestion {
  return { id, type: "mc", prompt: sentence, options, answer, explanation };
}

/**
 * Written Expression. Mark the four underlined parts with [A:...], [B:...],
 * [C:...], [D:...] inside the sentence.
 */
export function wrong(
  id: string,
  sentence: string,
  answer: "A" | "B" | "C" | "D",
  correction: string,
  explanation: string
): ErrorQuestion {
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
  return { id, type: "error", prompt: "Pilih bagian bergaris bawah yang SALAH.", segments, answer, correction, explanation };
}

/** Reading question tied to a passage. */
export function rq(
  id: string,
  passageId: string,
  prompt: string,
  options: [string, string, string, string],
  answer: number,
  explanation: string
): McQuestion {
  return { id, type: "mc", passageId, prompt, options, answer, explanation };
}
