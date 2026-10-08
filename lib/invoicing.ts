import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { getUserEmail, sendInvoiceGeneratedEmail } from "@/lib/email";
import { formatPrice } from "@/lib/pricing";
import { monthLabel, formatTimestamp } from "@/lib/format";
import { INVOICE_DUE_DAYS } from "@/lib/policy";
import { previousPeriod } from "@/lib/time";

// Server-only. Single implementation of "completed sessions + unpaid
// cancellation fees → monthly invoice". The per-student work happens inside
// the create_invoice_for_student() database function, which is atomic and
// locked per student, so the cron and "Generate Now" can't double-bill.

export type GenerateInvoicesResult = {
    periodMonth: number;
    periodYear: number;
    created: {
        studentId: string;
        invoiceId: string;
        totalAmount: number;
        sessionCount: number;
        feeAmount: number;
    }[];
    skipped: { studentId: string; reason: string }[];
};

export const getPreviousPeriod = previousPeriod;

export async function generateInvoicesForPeriod(
    periodMonth: number,
    periodYear: number
): Promise<GenerateInvoicesResult> {
    const supabase = createAdminClient();
    const periodEnd = new Date(Date.UTC(periodYear, periodMonth, 0)).toISOString().slice(0, 10);

    const result: GenerateInvoicesResult = { periodMonth, periodYear, created: [], skipped: [] };

    // Candidate students: anyone with a completed session up to the end of
    // the period (the function itself skips sessions already invoiced — this
    // is what lets a session marked complete late still get billed) or an
    // unpaid cancellation fee.
    const [{ data: sessions, error: sessionsError }, { data: fees, error: feesError }] = await Promise.all([
        supabase.from("sessions").select("student_id").eq("status", "completed").lte("date", periodEnd),
        supabase.from("cancellation_fees").select("student_id").eq("status", "unpaid"),
    ]);

    if (sessionsError) throw sessionsError;
    if (feesError) throw feesError;

    const studentIds = new Set<string>([
        ...(sessions || []).map((s) => s.student_id as string),
        ...(fees || []).map((f) => f.student_id as string),
    ]);

    for (const studentId of studentIds) {
        const { data: invoiceId, error } = await supabase.rpc("create_invoice_for_student", {
            p_student: studentId,
            p_month: periodMonth,
            p_year: periodYear,
        });

        if (error) {
            result.skipped.push({ studentId, reason: error.message });
            continue;
        }
        if (!invoiceId) continue; // nothing new to bill

        const { data: invoice } = await supabase
            .from("invoices")
            .select("id, total_amount, fee_amount, session_ids")
            .eq("id", invoiceId)
            .single();

        result.created.push({
            studentId,
            invoiceId: invoiceId as string,
            totalAmount: invoice?.total_amount ?? 0,
            feeAmount: invoice?.fee_amount ?? 0,
            sessionCount: invoice?.session_ids?.length ?? 0,
        });
    }

    return result;
}

/** Emails each newly created invoice. Failures are logged, never thrown —
 * the invoice row is the source of truth, email is a courtesy on top. */
export async function notifyInvoicesCreated(result: GenerateInvoicesResult) {
    const supabase = createAdminClient();
    const label = monthLabel(result.periodMonth, result.periodYear);
    const due = formatTimestamp(new Date(Date.now() + INVOICE_DUE_DAYS * 86_400_000).toISOString(), "dd MMMM yyyy");

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
                    monthLabel: label,
                    totalAmount: formatPrice(created.totalAmount),
                    dueDate: due,
                });
            }
        } catch (emailErr) {
            console.error("[invoicing] failed to email student:", created.studentId, emailErr);
        }
    }
}
