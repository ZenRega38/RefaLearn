// Interface language of the site (navbar, footer, public pages, the
// student dashboard). Indonesian by default; visitors can switch to English
// with the ID | EN toggle in the navbar, which stores the choice in the
// `lang` cookie so the server renders the right language straight away.
//
// Not covered: course content and the course player (each course picks its
// own language, see lib/course/ui-text), stories' own text, the admin panel,
// emails and the legal pages.

export type Lang = "id" | "en";

export const LANG_COOKIE = "lang";
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const asLang = (value: string | null | undefined): Lang => (value === "en" ? "en" : "id");

/** Picks the wording for the current language: `tr("Masuk", "Log in")`. */
export type Tr = <T>(id: T, en: T) => T;

export const translator =
  (lang: Lang): Tr =>
  (id, en) =>
    lang === "en" ? en : id;

/** The language a request was made in (route handlers): its `lang` cookie. */
export function requestLang(request: Request): Lang {
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(/(?:^|;\s*)lang=([^;]*)/);
  return asLang(match?.[1]);
}

/**
 * A site setting the admin writes in both languages (see /admin/settings):
 * `field` holds the Indonesian text and `field_en` the English one. English
 * visitors get the English text, or the Indonesian one if it is missing.
 */
export function pickLocalized(value: unknown, field: string, lang: Lang): string {
  const read = (key: string) => {
    const v = value && typeof value === "object" ? (value as Record<string, unknown>)[key] : undefined;
    return typeof v === "string" ? v.trim() : "";
  };
  return (lang === "en" && read(`${field}_en`)) || read(field);
}

/** `tr` for browser code outside React (e.g. upload helpers): the page's <html lang>. */
export function documentTr(): Tr {
  return translator(asLang(typeof document === "undefined" ? null : document.documentElement.lang));
}
