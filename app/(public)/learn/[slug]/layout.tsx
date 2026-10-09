"use client";

import { useParams } from "next/navigation";
import { CourseLangProvider } from "@/components/course/lang";
import { courseReadAloud, courseUiLang } from "@/lib/course/registry";

/** Every page of a course uses that course's interface language (and read-aloud for young learners). */
export default function CourseLayout({ children }: { children: React.ReactNode }) {
  const { slug } = useParams<{ slug: string }>();
  return (
    <CourseLangProvider lang={courseUiLang(slug)} readAloud={courseReadAloud(slug)}>
      {children}
    </CourseLangProvider>
  );
}
