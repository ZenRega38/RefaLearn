import type { Metadata } from "next";
import { createPublicClient } from "@/lib/supabase/public";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { SketchBox } from "@/components/sketch/SketchBox";
import { Card } from "@/components/ui/Card";
import { formatDateStr } from "@/lib/format";
import { todayStr } from "@/lib/time";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: "Perjanjian layanan les privat Bahasa Inggris Refa Learn yang berlaku.",
  alternates: { canonical: "/terms" },
};

export const revalidate = 300;

type Props = { searchParams: Promise<{ version?: string }> };

/**
 * The Session Agreement in force today, or — with ?version=N — the exact
 * version a student signed (linked from their dashboard).
 */
export default async function TermsPage({ searchParams }: Props) {
  const { version } = await searchParams;
  const supabase = createPublicClient();

  let query = supabase.from("contracts").select("version, content, effective_date");
  query = version && /^\d+$/.test(version)
    ? query.eq("version", Number(version))
    : query.lte("effective_date", todayStr()).order("version", { ascending: false }).limit(1);

  const { data: contract } = await query.maybeSingle();

  return (
    <PaperBackground>
      <section className="pt-32 pb-20">
        <div className="container-main max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl mb-4 text-center">
            Syarat & <SketchBox color="var(--color-accent-yellow)">Ketentuan</SketchBox>
          </h1>
          {contract ? (
            <>
              <p className="text-center text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] mb-10">
                Versi {contract.version} · berlaku sejak {formatDateStr(contract.effective_date, "dd MMMM yyyy")}
              </p>
              <Card variant="sketch" className="p-6 md:p-10">
                <div className="prose-content text-sm font-[var(--font-inter)]" dangerouslySetInnerHTML={{ __html: contract.content }} />
              </Card>
            </>
          ) : (
            <Card className="text-center py-12 mt-10">
              <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                Perjanjian layanan sedang disiapkan. Silakan hubungi kami untuk informasi lebih lanjut.
              </p>
            </Card>
          )}
        </div>
      </section>
    </PaperBackground>
  );
}
