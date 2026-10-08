// Shared, client-safe types for interactive courses. Course CONTENT lives in
// content/ (server-only) and reaches the browser only through API routes
// that check access — never through a client import.

export type Skill = "listening" | "structure" | "reading" | "vocabulary" | "speaking" | "writing";

export type Speaker = "man" | "woman" | "narrator";
export type AudioLine = { speaker: Speaker; text: string };
/** A listening prompt, spoken in the browser with the Web Speech API. */
export type AudioScript = AudioLine[];

type QuestionBase = {
  id: string;
  /** Instruction or question text shown above the answer area. */
  prompt?: string;
  /** Spoken before the answer area is enabled (listening items). */
  audio?: AudioScript;
  /** Reading items point at a passage of the same exam/quiz. */
  passageId?: string;
  /** Shown after answering — why the key is right. */
  explanation: string;
  /** Higher-Order Thinking Skills item (analyse / evaluate / create). */
  hots?: boolean;
  /** Illustration shown above the prompt, e.g. "cat" or "apple*4" (see lib/course/pictures). */
  image?: string;
};

/** Single answer, four (or more) options. */
export type McQuestion = QuestionBase & { type: "mc"; options: string[]; answer: number };
/** Choose every correct option. */
export type MsQuestion = QuestionBase & { type: "ms"; options: string[]; answers: number[] };
/** Type the missing word(s). `accept` is compared case/space-insensitively. */
export type FillQuestion = QuestionBase & { type: "fill"; before: string; after: string; accept: string[] };
/** Tap/drag word tiles into the right order. `answer` lists accepted orders. */
export type OrderQuestion = QuestionBase & { type: "order"; tiles: string[]; answer: string[][] };
/** Pair every left item with its right item. */
export type MatchQuestion = QuestionBase & { type: "match"; pairs: [string, string][] };
/** ITP Written Expression: tap the underlined part that is wrong. */
export type ErrorQuestion = QuestionBase & {
  type: "error";
  segments: { text: string; mark?: "A" | "B" | "C" | "D" }[];
  answer: "A" | "B" | "C" | "D";
  correction: string;
};

export type Question = McQuestion | MsQuestion | FillQuestion | OrderQuestion | MatchQuestion | ErrorQuestion;
export type QuestionType = Question["type"];

/** What a student submits for one question. */
export type Response =
  | { type: "mc"; choice: number }
  | { type: "ms"; choices: number[] }
  | { type: "fill"; text: string }
  | { type: "order"; tiles: string[] }
  | { type: "match"; pairs: [string, string][] }
  | { type: "error"; mark: "A" | "B" | "C" | "D" };

/** Reading passage. Each entry of `lines` is one numbered line, as on the ITP paper. */
export type Passage = { id: string; title?: string; lines: string[]; /** Illustration beside the title. */ pic?: string };

// ---------------------------------------------------------------------------
// Lessons
// ---------------------------------------------------------------------------

export type Block =
  | { type: "text"; md: string }
  | { type: "tip"; md: string }
  | { type: "warning"; md: string }
  | { type: "examples"; title?: string; items: { wrong?: string; right?: string; note?: string }[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "audio"; caption?: string; script: AudioScript; showTranscript?: boolean }
  | { type: "passage"; passage: Passage }
  | { type: "try"; question: Question }
  /** Picture-word cards; tapping one speaks the English word. `pic` (an illustration name) wins over `emoji`. */
  | { type: "vocab"; title?: string; items: VocabItem[] }
  /** A row of illustrations with optional captions (scenes, story characters). */
  | { type: "pictures"; items: { pic: string; label?: string }[]; caption?: string };

export type VocabItem = { emoji: string; pic?: string; word: string; meaning: string; example?: string };

export type LessonSection = { title: string; blocks: Block[] };

export type Lesson = {
  id: string;
  skill: Skill;
  title: string;
  summary: string;
  /** Estimated minutes; omit to show no duration (self-paced review courses). */
  minutes?: number;
  sections: LessonSection[];
  /** Mini quiz at the end of the lesson; wrong answers come back until right. */
  checkpoint: Question[];
  passages?: Passage[];
};

export type LevelQuiz = {
  id: string;
  title: string;
  passPercent: number;
  questions: Question[];
  passages?: Passage[];
};

export type Level = {
  id: string;
  title: string;
  description: string;
  /** Short goal badge, e.g. "Target 400–450" or "Tujuan pembelajaran". */
  targetScore: string;
  /** Illustrations shown beside the level title on the course page. */
  cover?: string[];
  /** Optional diagnostic at the start of the level/chapter (any score passes). */
  pretest?: LevelQuiz;
  lessons: Lesson[];
  /** End-of-level quiz / chapter posttest; passing opens the next level. */
  quiz: LevelQuiz;
  /** Question set the teacher can host as a live (Kahoot-style) quiz. */
  live?: LiveQuizSet;
};

/** A live quiz: single-answer questions played together, hosted by the admin. */
export type LiveQuizSet = {
  title: string;
  /** Seconds to answer each question (default 20). */
  seconds?: number;
  questions: McQuestion[];
};

// ---------------------------------------------------------------------------
// Exams (pretest / tryout)
// ---------------------------------------------------------------------------

export type ExamPart = { title: string; directions: string; questionIds: string[] };

export type ExamSection = {
  skill: Skill;
  title: string;
  minutes: number;
  directions: string;
  parts: ExamPart[];
  questions: Question[];
  passages?: Passage[];
};

export type ExamKind = "pretest" | "tryout";

export type Exam = {
  kind: ExamKind;
  title: string;
  description: string;
  sections: ExamSection[];
};

export type Course = {
  slug: string;
  title: string;
  subtitle: string;
  /** UI words: "Level"/"Bab", "Big Quiz"/"Posttest". */
  labels: { level: string; quiz: string };
  levels: Level[];
  /** Course-wide diagnostic and final test (e.g. TOEFL pretest & tryout). */
  pretest?: Exam;
  tryout?: Exam;
  /** Shown under the last level, e.g. upcoming levels. */
  comingSoon?: string;
  /** Levels stay locked until the admin opens them (course_level_access). */
  adminLocks?: boolean;
  /** Inside an open level every lesson and the quiz are open at once (no sequential unlocking). */
  openOrder?: boolean;
  /** Per-question time limit for level quizzes, in seconds. */
  quizSecondsPerQuestion?: number;
  /** Mascot picture family (e.g. "owl" → owl-cheer, owl-think…) that cheers students on. */
  mascot?: string;
};

// ---------------------------------------------------------------------------
// What the API sends to the browser
// ---------------------------------------------------------------------------

/** A question with its key and explanation removed (exams in progress). */
export type PublicQuestion =
  | Omit<McQuestion, "answer" | "explanation">
  | Omit<MsQuestion, "answers" | "explanation">
  | Omit<FillQuestion, "accept" | "explanation">
  | Omit<OrderQuestion, "answer" | "explanation">
  | (Omit<MatchQuestion, "pairs" | "explanation"> & { left: string[]; right: string[] })
  | Omit<ErrorQuestion, "answer" | "correction" | "explanation">;

export type ProgressItem = { itemId: string; kind: "lesson" | "level_quiz" | "level_pretest"; score: number | null; maxScore: number | null; passed: boolean };

export type SectionResult = { skill: Skill; correct: number; total: number; converted: number };

export type ExamResult = {
  attemptId: string;
  kind: ExamKind;
  sections: SectionResult[];
  totalScore: number;
  /** Per question: was it right, and what was the key — for the review screen. */
  review: { id: string; correct: boolean; response: Response | null; question: Question }[];
  overtime: boolean;
  submittedAt: string;
};
