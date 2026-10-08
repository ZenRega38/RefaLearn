"use client";

import { useParams } from "next/navigation";
import { CourseLangProvider } from "@/components/course/lang";
import { courseUiLang } from "@/lib/course/registry";

/** Every page of a course uses that course's interface language (English Day: English). */
export default function CourseLayout({ children }: { children: React.ReactNode }) {
  const { slug } = useParams<{ slug: string }>();
  return <CourseLangProvider lang={courseUiLang(slug)}>{children}</CourseLangProvider>;
}
