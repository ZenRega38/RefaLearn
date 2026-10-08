"use client";

import { createContext, useContext, type ReactNode } from "react";
import { UI_TEXT, type UiLang, type UiText } from "@/lib/course/ui-text";

const CourseLang = createContext<UiLang>("id");

/** Sets the interface language for every course component below it. */
export function CourseLangProvider({ lang, children }: { lang: UiLang | null | undefined; children: ReactNode }) {
  return <CourseLang.Provider value={lang === "en" ? "en" : "id"}>{children}</CourseLang.Provider>;
}

/** Interface words in the current course's language. */
export function useCourseText(): UiText {
  return UI_TEXT[useContext(CourseLang)];
}
