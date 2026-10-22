import type { Metadata } from "next";
import { createPublicClient } from "@/lib/supabase/public";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { SketchBox } from "@/components/sketch/SketchBox";
import { Card } from "@/components/ui/Card";
import { formatDateStr } from "@/lib/format";
import { todayStr } from "@/lib/time";
import { getLang } from "@/lib/i18n-server";
import { translator } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const tr = translator(await getLang());
  return {
    title: tr("Syarat & Ketentuan", "Terms & Conditions"),
    description: "Perjanjian layanan les privat Bahasa Inggris Refa Learn yang berlaku.",
    alternates: { canonical: "/terms" },
  };
}

type Props = { searchParams: Promise<{ version?: string }> };

/**
 * The Session Agreement in force today, or — with ?version=N — the exact
 * version a student signed (linked from their dashboard).
 */
export default async function TermsPage({ searchParams }: Props) {
  const { version } = await searchParams;
  const supabase = createPublicClient();

  let query = supabase.from("contracts").select("*");
  query = version && /^\d+$/.test(version)
    ? query.eq("version", Number(version))
    : query.lte("effective_date", todayStr()).order("version", { ascending: false }).limit(1);

  const { data: contract } = await query.maybeSingle();
  const lang = await getLang();
  const tr = translator(lang);

  return (
    <PaperBackground>
      <section className="pt-32 pb-20">
        <div className="container-main max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl mb-4 text-center">
            {tr("Syarat &", "Terms &")} <SketchBox color="var(--color-accent-yellow)">{tr("Ketentuan", "Conditions")}</SketchBox>
          </h1>
          {contract ? (
            <>
              <p className="text-center text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] mb-10">
                {tr("Versi", "Version")} {contract.version} · {tr("berlaku sejak", "in force since")} {formatDateStr(contract.effective_date, "dd MMMM yyyy", lang)}
              </p>
              {/* The Indonesian text is the one students sign and it prevails (Pasal 18). */}
              {lang === "en" && (
                <p className="text-center text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] -mt-6 mb-10">
                  {contract.content_en
                    ? "This is an English translation for your convenience. The Indonesian version, shown below it, is the one students sign and it prevails."
                    : "The agreement is available in Indonesian only for now, as it is the version students sign."}
                </p>
              )}
              <Card variant="sketch" className="p-6 md:p-10">
                <div
                  className="prose-content text-sm font-[var(--font-inter)]"
                  dangerouslySetInnerHTML={{ __html: lang === "en" && contract.content_en ? contract.content_en : contract.content }}
                />
              </Card>
              {lang === "en" && contract.content_en && (
                <details className="mt-6">
                  <summary className="cursor-pointer text-center text-sm font-semibold text-[var(--color-brand-blue)] font-[var(--font-inter)]">
                    Read the Indonesian original (Bahasa Indonesia)
                  </summary>
                  <Card variant="sketch" className="p-6 md:p-10 mt-4">
                    <div className="prose-content text-sm font-[var(--font-inter)]" dangerouslySetInnerHTML={{ __html: contract.content }} />
                  </Card>
                </details>
              )}
            </>
          ) : (
            <Card className="text-center py-12 mt-10">
              <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                {tr(
                  "Perjanjian layanan sedang disiapkan. Silakan hubungi kami untuk informasi lebih lanjut.",
                  "The service agreement is being prepared. Please contact us for more information."
                )}
              </p>
            </Card>
          )}
        </div>
      </section>
    </PaperBackground>
  );
}
