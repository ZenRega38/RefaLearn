"use client";

import { createContext, useContext, type ReactNode } from "react";
import { UI_TEXT, type UiLang, type UiText } from "@/lib/course/ui-text";

type Settings = { lang: UiLang; readAloud: boolean };
const CourseLang = createContext<Settings>({ lang: "id", readAloud: false });

/** Sets the interface language (and young-learner read-aloud) for every course component below it. */
export function CourseLangProvider({ lang, readAloud = false, children }: { lang: UiLang | null | undefined; readAloud?: boolean; children: ReactNode }) {
  return <CourseLang.Provider value={{ lang: lang === "en" ? "en" : "id", readAloud }}>{children}</CourseLang.Provider>;
}

/** Interface words in the current course's language. */
export function useCourseText(): UiText {
  return UI_TEXT[useContext(CourseLang).lang];
}

/** True in young-learner courses: questions get a button that reads them aloud. */
export function useReadAloud(): boolean {
  return useContext(CourseLang).readAloud;
}
