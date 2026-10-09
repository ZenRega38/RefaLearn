import "server-only";
import type { AudioScript, Block, McQuestion } from "@/lib/course/types";
export { arrange, fill, listenPick, pair, pick, pickMany, say } from "../english-sd-3/helpers";

// Builders for the English Day course (adult staff, conversation-first).
// Everything the learner answers or taps is English: titles, questions,
// options and labels. Only explanations (and the meaning column of phrase
// tables) are short, friendly Indonesian. English is taught as
// ready-to-use chunks, not grammar rules.

/** Key-phrase table: [English, Indonesian meaning] rows (optional third column). */
export function phrases(rows: string[][], head = ["English", "Meaning"]): Block {
  const cols = rows[0]?.length ?? head.length;
  return { type: "table", head: head.length >= cols ? head : [...head, "When to use it"], rows };
}

/** "Repeat after me": every phrase read aloud, slowly, with the transcript. */
export function repeatAfterMe(lines: string[], caption = "Repeat after me — listen, then say it"): Block {
  return { type: "audio", caption, showTranscript: true, script: lines.map((text) => ({ speaker: "woman" as const, text })) };
}

/** Model dialogue between two speakers. */
export function dialog(caption: string, script: AudioScript): Block {
  return { type: "audio", caption, showTranscript: true, script };
}

/** A live-quiz question: one answer out of four, optional picture. */
export const live = (id: string, prompt: string, options: [string, string, string, string], answer: number, image?: string): McQuestion => ({
  id,
  type: "mc",
  prompt,
  options,
  answer,
  explanation: "",
  ...(image ? { image } : {}),
});
