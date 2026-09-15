import { NextRequest, NextResponse } from "next/server";
import { generateInvoicesForPeriod, getPreviousPeriod } from "@/lib/invoicing";
import { getUserEmail, sendInvoiceGeneratedEmail } from "@/lib/email";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/pricing";
import { format } from "date-fns";
import { id } from "date-fns/locale";

/**
 * Scheduled job (agent.md Section 6.6): runs on the 1st of every month and
 * bills every student's `completed` sessions from the month that just
 * ended. Wired up in vercel.json to run at 01:00 WIB on day 1 of each month.
 *
 * Protected by CRON_SECRET rather than requireAdminUser, since there's no
 * logged-in admin session when Vercel's scheduler calls this — only Vercel
 * (or you, manually, with the secret) should ever be able to trigger it.
 */
export async function GET(request: NextRequest) {
    const authHeader = request.headers.get("authorization");
    if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { month: periodMonth, year: periodYear } = getPreviousPeriod();

    try {
        const result = await generateInvoicesForPeriod(periodMonth, periodYear);

        const monthLabel = format(new Date(periodYear, periodMonth - 1, 1), "MMMM yyyy", { locale: id });
        const supabase = await createClient(true);

        for (const created of result.created) {
            try {
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("full_name")
                    .eq("id", created.studentId)
                    .single();

                const email = await getUserEmail(created.studentId);
                if (email) {
                    await sendInvoiceGeneratedEmail(email, {
                        studentName: profile?.full_name || "Siswa",
                        monthLabel,
                        totalAmount: formatPrice(created.totalAmount),
                    });
                }
            } catch (emailErr) {
                console.error("[cron/generate-invoices] failed to email student:", created.studentId, emailErr);
            }
        }

        console.log(`[cron/generate-invoices] period ${periodMonth}/${periodYear}:`, {
            created: result.created.length,
            skipped: result.skipped.length,
        });

        return NextResponse.json({ ok: true, ...result });
    } catch (err: any) {
        console.error("[cron/generate-invoices] failed:", err);
        return NextResponse.json({ error: err.message || "Failed to generate invoices" }, { status: 500 });
    }
}