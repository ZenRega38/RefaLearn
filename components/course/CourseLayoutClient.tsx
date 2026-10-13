"use client";

import { CourseLangProvider } from "@/components/course/lang";
import { courseReadAloud, courseUiLang } from "@/lib/course/registry";

/** Every page of a course uses that course's interface language (and read-aloud for young learners). */
export function CourseLayoutClient({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <CourseLangProvider lang={courseUiLang(slug)} readAloud={courseReadAloud(slug)}>
      {children}
    </CourseLangProvider>
  );
}
