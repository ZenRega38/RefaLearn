import "server-only";
import type { AudioScript, FillQuestion, MatchQuestion, McQuestion, MsQuestion, OrderQuestion, Speaker } from "@/lib/course/types";

// Builders for the Grade 3 module. Explanations are written in friendly,
// everyday Indonesian for 8–9 year olds (and the parents helping them).

export function say(...lines: [Speaker, string][]): AudioScript {
  return lines.map(([speaker, text]) => ({ speaker, text }));
}

type Extra = { audio?: AudioScript; hots?: boolean; passageId?: string; /** Picture above the prompt (lib/course/pictures). */ image?: string };

export const pick = (id: string, prompt: string, options: string[], answer: number, explanation: string, extra: Extra = {}): McQuestion =>
  ({ id, type: "mc", prompt, options, answer, explanation, ...extra });

/** "Dengarkan, lalu pilih" — the prompt is spoken, options are pictures ("pic:cat") or words. */
export const listenPick = (id: string, spoken: AudioScript, prompt: string, options: string[], answer: number, explanation: string, hots = false): McQuestion =>
  ({ id, type: "mc", audio: spoken, prompt, options, answer, explanation, hots });

export const pickMany = (id: string, prompt: string, options: string[], answers: number[], explanation: string, extra: Extra = {}): MsQuestion =>
  ({ id, type: "ms", prompt, options, answers, explanation, ...extra });

export const fill = (id: string, prompt: string, before: string, after: string, accept: string[], explanation: string, extra: Extra = {}): FillQuestion =>
  ({ id, type: "fill", prompt, before, after, accept, explanation, ...extra });

/** Arrange words into a sentence. Pass the correct sentence; tiles are its words. */
export const arrange = (id: string, prompt: string, sentence: string, explanation: string, extra: Extra & { alternatives?: string[] } = {}): OrderQuestion => {
  const words = sentence.split(" ");
  return {
    id,
    type: "order",
    prompt,
    tiles: words,
    answer: [words, ...(extra.alternatives ?? []).map((a) => a.split(" "))],
    explanation,
    ...(extra.hots ? { hots: true } : {}),
    ...(extra.image ? { image: extra.image } : {}),
  };
};

export const pair = (id: string, prompt: string, pairs: [string, string][], explanation: string, extra: Extra = {}): MatchQuestion =>
  ({ id, type: "match", prompt, pairs, explanation, ...extra });
