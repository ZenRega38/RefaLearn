import type { PublicQuestion, Question, Response, Skill } from "@/lib/course/types";

/** Lower-cases, trims, collapses spaces and drops trailing punctuation. */
export function normalizeAnswer(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.!?,;]+$/g, "")
    .trim();
}

export function isCorrect(question: Question, response: Response | null | undefined): boolean {
  if (!response || response.type !== question.type) return false;

  switch (question.type) {
    case "mc":
      return response.type === "mc" && response.choice === question.answer;
    case "ms": {
      if (response.type !== "ms") return false;
      const got = [...new Set(response.choices)].sort((a, b) => a - b);
      const want = [...question.answers].sort((a, b) => a - b);
      return got.length === want.length && got.every((v, i) => v === want[i]);
    }
    case "fill":
      return response.type === "fill" && question.accept.some((a) => normalizeAnswer(a) === normalizeAnswer(response.text));
    case "order":
      return (
        response.type === "order" &&
        question.answer.some((order) => order.length === response.tiles.length && order.every((t, i) => t === response.tiles[i]))
      );
    case "match": {
      if (response.type !== "match") return false;
      const want = new Map(question.pairs);
      return response.pairs.length === question.pairs.length && response.pairs.every(([l, r]) => want.get(l) === r);
    }
    case "error":
      return response.type === "error" && response.mark === question.answer;
  }
}

/** Copy of `obj` without the given keys. */
function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const out = { ...obj };
  for (const k of keys) delete out[k];
  return out;
}

/** Removes the key and explanation so an exam can be sent to the browser. */
export function toPublicQuestion(q: Question): PublicQuestion {
  switch (q.type) {
    case "mc":
      return omit(q, ["answer", "explanation"]);
    case "ms":
      return omit(q, ["answers", "explanation"]);
    case "fill":
      return omit(q, ["accept", "explanation"]);
    case "order":
      return omit(q, ["answer", "explanation"]);
    case "match":
      // Sorted so the original pairing can't be read off the order.
      return { ...omit(q, ["pairs", "explanation"]), left: q.pairs.map((p) => p[0]).sort(), right: q.pairs.map((p) => p[1]).sort() };
    case "error":
      return omit(q, ["answer", "correction", "explanation"]);
  }
}

// ---------------------------------------------------------------------------
// TOEFL ITP score conversion
//
// Raw correct answers → converted section score (31–68 range on the real
// test), using the conversion table commonly published in ITP preparation
// books. Each real test form has its own table, so results are an
// ESTIMATE — the UI says so.
// ---------------------------------------------------------------------------

const LISTENING = [24, 25, 26, 27, 28, 29, 30, 31, 32, 32, 33, 35, 37, 38, 39, 41, 41, 42, 43, 44, 45, 45, 46, 47, 47, 48, 48, 49, 49, 50, 51, 51, 52, 52, 53, 54, 54, 55, 56, 57, 57, 58, 59, 60, 61, 62, 63, 65, 66, 67, 68];
const STRUCTURE = [20, 20, 21, 22, 23, 25, 26, 27, 29, 31, 33, 35, 36, 37, 38, 40, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 60, 61, 63, 65, 67, 68];
const READING = [21, 22, 23, 23, 24, 25, 26, 27, 28, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 43, 44, 45, 46, 46, 47, 48, 48, 49, 50, 51, 52, 52, 53, 54, 54, 55, 56, 57, 58, 59, 60, 61, 63, 65, 66, 67];

type ItpSkill = "listening" | "structure" | "reading";
const TABLES: Record<ItpSkill, number[]> = { listening: LISTENING, structure: STRUCTURE, reading: READING };

/** Full-test question counts per section. */
export const FULL_COUNTS: Record<ItpSkill, number> = { listening: 50, structure: 40, reading: 50 };

/**
 * Converted section score. A shorter section (pretest) is first scaled to
 * the full-length raw count so it lands on the same 31–68 scale.
 */
export function convertedScore(skill: Skill, correct: number, total: number): number {
  if (!(skill in TABLES)) return Math.round((correct / Math.max(total, 1)) * 100);
  const table = TABLES[skill as ItpSkill];
  const full = FULL_COUNTS[skill as ItpSkill];
  const raw = total === full ? correct : Math.round((correct / Math.max(total, 1)) * full);
  return table[Math.max(0, Math.min(full, raw))];
}

/** Total ITP score: (sum of converted section scores) × 10 / 3, rounded. 310–677. */
export function totalScore(converted: number[]): number {
  return Math.round((converted.reduce((a, b) => a + b, 0) * 10) / 3);
}

export function shuffle<T>(items: T[], seed: number): T[] {
  // Deterministic per question, so a re-render doesn't reshuffle tiles.
  const out = [...items];
  let s = seed || 1;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function seedOf(id: string): number {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}
