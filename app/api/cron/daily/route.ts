import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { errorMessage } from "@/lib/api-auth";
import { getUserEmail, sendInvoiceOverdueEmail } from "@/lib/email";
import { INVOICE_DUE_DAYS } from "@/lib/policy";
import { formatPrice } from "@/lib/pricing";
import { monthLabel } from "@/lib/format";

/**
 * Daily housekeeping: flags invoices that passed their due date as
 * `overdue` (late-payment clause of the contract) and emails the student
 * once, on the day it flips.
 */
export async function GET(request: NextRequest) {
    const authHeader = request.headers.get("authorization");
    if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createAdminClient();

    try {
        const cutoff = new Date(Date.now() - INVOICE_DUE_DAYS * 86_400_000).toISOString();
        const { data: becomingOverdue } = await supabase
            .from("invoices")
            .select("id, student_id, period_month, period_year, total_amount")
            .eq("status", "sent")
            .lt("generated_at", cutoff);

        const { data: count, error } = await supabase.rpc("mark_overdue_invoices", { p_due_days: INVOICE_DUE_DAYS });
        if (error) throw error;

        for (const inv of becomingOverdue || []) {
            try {
                const [{ data: profile }, email] = await Promise.all([
                    supabase.from("profiles").select("full_name").eq("id", inv.student_id).single(),
                    getUserEmail(inv.student_id),
                ]);
                if (email) {
                    await sendInvoiceOverdueEmail(email, {
                        studentName: profile?.full_name || "Siswa",
                        monthLabel: monthLabel(inv.period_month, inv.period_year),
                        totalAmount: formatPrice(inv.total_amount),
                    });
                }
            } catch (emailErr) {
                console.error("[cron/daily] overdue email failed:", inv.id, emailErr);
            }
        }

        return NextResponse.json({ ok: true, overdue: count });
    } catch (err) {
        console.error("[cron/daily] failed:", err);
        return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
    }
}
