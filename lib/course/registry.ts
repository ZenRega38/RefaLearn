// Client-safe list of courses that exist in content/. Only titles — the
// content itself is server-only. The admin uses this to attach a course to
// a material in the store.
export const COURSES = [
  { slug: "toefl-itp", title: "TOEFL ITP Mastery — dari Nol sampai Skor Tinggi" },
  { slug: "english-sd-3", title: "Bahasa Inggris Kelas 3 SD — Kurikulum Merdeka" },
  // English Day runs its whole quiz experience in English (see ui-text.ts).
  { slug: "english-day", title: "English Day — Everyday English for Work", uiLang: "en" },
] as const;

export type CourseSlug = (typeof COURSES)[number]["slug"];

/** Interface language of a course's pages: "en" for all-English courses, else Indonesian. */
export function courseUiLang(slug: string): "id" | "en" {
  const course = COURSES.find((c) => c.slug === slug);
  return course && "uiLang" in course ? course.uiLang : "id";
}

export function isCourseSlug(value: string): value is CourseSlug {
  return COURSES.some((c) => c.slug === value);
}
