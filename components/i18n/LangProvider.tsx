"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { LANG_COOKIE, LANG_COOKIE_MAX_AGE, translator, type Lang, type Tr } from "@/lib/i18n";

type LangState = { lang: Lang; setLang: (lang: Lang) => void };

const LangContext = createContext<LangState>({ lang: "id", setLang: () => {} });

/** Holds the interface language; the root layout passes the cookie's value. */
export function LangProvider({ initial, children }: { initial: Lang; children: ReactNode }) {
  const router = useRouter();
  const [lang, setState] = useState<Lang>(initial);

  const setLang = useCallback(
    (next: Lang) => {
      document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; samesite=lax`;
      document.documentElement.lang = next;
      setState(next);
      // Server-rendered pages read the cookie: render them again.
      router.refresh();
    },
    [router]
  );

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangState {
  return useContext(LangContext);
}

/** `tr("Masuk", "Log in")` in the current language (client components). */
export function useTr(): Tr {
  const { lang } = useLang();
  return useMemo(() => translator(lang), [lang]);
}

/** The ID | EN switch in the navbar. */
export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      role="group"
      aria-label={lang === "en" ? "Language" : "Bahasa"}
      className={`inline-flex items-center rounded-full border-2 border-[var(--color-line)] bg-white/70 p-0.5 text-xs font-semibold font-[var(--font-inter)] ${className}`}
    >
      {(["id", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => l !== lang && setLang(l)}
          aria-pressed={l === lang}
          title={l === "id" ? "Bahasa Indonesia" : "English"}
          className={`px-2.5 py-1 rounded-full uppercase transition-colors ${
            l === lang ? "bg-[var(--color-brand-blue)] text-white" : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
