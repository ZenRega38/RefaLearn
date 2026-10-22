import "server-only";
import { cookies } from "next/headers";
import { asLang, LANG_COOKIE, translator, type Lang, type Tr } from "@/lib/i18n";

/** The visitor's interface language (server components). */
export async function getLang(): Promise<Lang> {
  return asLang((await cookies()).get(LANG_COOKIE)?.value);
}

/** `tr("Masuk", "Log in")` in the visitor's language (server components). */
export async function getTr(): Promise<Tr> {
  return translator(await getLang());
}
