import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/api-auth";
import { generateInvoicesForPeriod, getPreviousPeriod } from "@/lib/invoicing";
import { getUserEmail, sendInvoiceGeneratedEmail } from "@/lib/email";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/pricing";
import { format } from "date-fns";
import { id } from "date-fns/locale";

/**
 * Manual "Generate Now" trigger for /admin/invoices (agent.md Section 6.6:
 * "Also build a manual Generate Now trigger ... for testing and edge cases,
 * e.g. a session marked completed late").
 *
 * Body: { periodMonth?: number; periodYear?: number }
 * Defaults to last calendar month if not provided — the normal monthly case.
 */
export async function POST(request: NextRequest) {
    const auth = await requireAdminUser();
    if (!auth.ok) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    let body: { periodMonth?: number; periodYear?: number } = {};
    try {
        body = await request.json();
    } catch {
        // No body is fine — we fall back to last month.
    }

    const fallback = getPreviousPeriod();
    const periodMonth = body.periodMonth ?? fallback.month;
    const periodYear = body.periodYear ?? fallback.year;

    try {
        const result = await generateInvoicesForPeriod(periodMonth, periodYear);

        // Notify each newly-invoiced student. Failures here shouldn't roll
        // back the invoices themselves — the invoice is the source of truth,
        // email is a courtesy notification on top of it.
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
                console.error("[invoices/generate] failed to email student:", created.studentId, emailErr);
            }
        }

        return NextResponse.json({ ok: true, ...result });
    } catch (err: any) {
        console.error("[invoices/generate] failed:", err);
        return NextResponse.json({ error: err.message || "Failed to generate invoices" }, { status: 500 });
    }
}