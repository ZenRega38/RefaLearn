// Client-safe list of courses that exist in content/. Only titles — the
// content itself is server-only. The admin uses this to attach a course to
// a material in the store.
export const COURSES = [
  { slug: "toefl-itp", title: "TOEFL ITP Mastery — dari Nol sampai Skor Tinggi" },
  { slug: "english-sd-3", title: "Bahasa Inggris Kelas 3 SD — Kurikulum Merdeka" },
] as const;

export type CourseSlug = (typeof COURSES)[number]["slug"];

export function isCourseSlug(value: string): value is CourseSlug {
  return COURSES.some((c) => c.slug === value);
}
