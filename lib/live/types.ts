// Client-safe shapes for the live quiz.

export type LiveStatus = "lobby" | "question" | "reveal" | "scoreboard" | "podium" | "ended";

export type LiveBoardRow = {
  id: string;
  nickname: string;
  avatar: string;
  score: number;
  rank: number;
  /** Rank before the latest question (null if the player joined after it). */
  prevRank: number | null;
  streak: number;
};

export type LiveState = {
  pin: string;
  /** The course the quiz belongs to (the host returns to its page). */
  courseSlug: string;
  title: string;
  status: LiveStatus;
  index: number;
  total: number;
  seconds: number;
  /** Epoch ms (server clock) when the open question starts / ends. */
  startsAt: number | null;
  endsAt: number | null;
  serverNow: number;
  playerCount: number;
  lobby: { id: string; nickname: string; avatar: string }[];
  answered: number;
  question: { prompt: string; image: string | null; options: string[] } | null;
  reveal: { answer: number; counts: number[] } | null;
  board: LiveBoardRow[];
  me: (LiveBoardRow & { choice: number | null; result: { correct: boolean; points: number } | null; total: number }) | null;
};

/** Avatars a player can pick (picture names). */
export const LIVE_AVATARS = ["owl", "cat", "dog", "bird", "fish", "duck", "elephant", "kangaroo", "cheetah", "crab", "chicken", "cow"] as const;
