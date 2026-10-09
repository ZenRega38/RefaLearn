// Client-safe list of courses that exist in content/. Only titles — the
// content itself is server-only. The admin uses this to attach a course to
// a material in the store.
//
// uiLang "en": the whole course experience (buttons, titles, questions) is
// English; only explanations and translation items use Indonesian.
// readAloud: young learners get a 🔊 button that reads each question aloud.

type Entry = { slug: string; title: string; uiLang?: "id" | "en"; readAloud?: boolean };

export const COURSES = [
  { slug: "toefl-itp", title: "TOEFL ITP Mastery — dari Nol sampai Skor Tinggi" },
  { slug: "english-sd-1", title: "English Grade 1 (SD) — Kurikulum Merdeka", uiLang: "en", readAloud: true },
  { slug: "english-sd-2", title: "English Grade 2 (SD) — Kurikulum Merdeka", uiLang: "en", readAloud: true },
  { slug: "english-sd-3", title: "English Grade 3 (SD) — Kurikulum Merdeka", uiLang: "en", readAloud: true },
  { slug: "english-sd-4", title: "English Grade 4 (SD) — Kurikulum Merdeka", uiLang: "en", readAloud: true },
  { slug: "english-sd-5", title: "English Grade 5 (SD) — Kurikulum Merdeka", uiLang: "en" },
  { slug: "english-sd-6", title: "English Grade 6 (SD) — Kurikulum Merdeka", uiLang: "en" },
  { slug: "english-smp-7", title: "English Grade 7 (SMP) — Kurikulum Merdeka", uiLang: "en" },
  { slug: "english-smp-8", title: "English Grade 8 (SMP) — Kurikulum Merdeka", uiLang: "en" },
  { slug: "english-smp-9", title: "English Grade 9 (SMP) — Kurikulum Merdeka", uiLang: "en" },
  { slug: "english-sma-10", title: "English Grade 10 (SMA) — Kurikulum Merdeka", uiLang: "en" },
  { slug: "english-sma-11", title: "English Grade 11 (SMA) — Kurikulum Merdeka", uiLang: "en" },
  // English Day runs its whole quiz experience in English (see ui-text.ts).
  { slug: "english-day", title: "English Day — Everyday English for Work", uiLang: "en" },
] as const satisfies readonly Entry[];

export type CourseSlug = (typeof COURSES)[number]["slug"];

const find = (slug: string): Entry | undefined => (COURSES as readonly Entry[]).find((c) => c.slug === slug);

/** Interface language of a course's pages: "en" for all-English courses, else Indonesian. */
export function courseUiLang(slug: string): "id" | "en" {
  return find(slug)?.uiLang ?? "id";
}

/** Whether questions get a read-aloud button (young learners). */
export function courseReadAloud(slug: string): boolean {
  return !!find(slug)?.readAloud;
}

export function isCourseSlug(value: string): value is CourseSlug {
  return COURSES.some((c) => c.slug === value);
}
