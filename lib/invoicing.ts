import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";

// Server-only. This is the single source of truth for turning completed
// sessions into invoices (agent.md Section 6.6) — both the admin "Generate
// Now" button and the monthly cron job call this same function so the
// aggregation logic never has to be duplicated or drift between the two.

export type GenerateInvoicesResult = {
    periodMonth: number;
    periodYear: number;
    created: {
        studentId: string;
        invoiceId: string;
        totalAmount: number;
        sessionCount: number;
    }[];
    skipped: { studentId: string; reason: string }[];
};

/**
 * Returns the calendar month/year immediately before `reference` (defaults
 * to now). This is "last month" from the point of view of whoever/whatever
 * is calling generateInvoicesForPeriod — used as the default period both by
 * the cron job (which always bills the month that just ended) and by the
 * admin UI's default selection.
 */
export function getPreviousPeriod(reference: Date = new Date()): { month: number; year: number } {
    const prevMonthDate = new Date(reference.getFullYear(), reference.getMonth() - 1, 1);
    return { month: prevMonthDate.getMonth() + 1, year: prevMonthDate.getFullYear() };
}

/**
 * Aggregates every `completed` session dated within the given calendar
 * month into one invoice per student.
 *
 * Idempotent by design (safe to re-run, e.g. if the cron job double-fires,
 * or an admin clicks "Generate Now" twice, or runs it again after a late
 * session gets marked completed):
 *  - If a student already has an invoice for this exact period, they're
 *    skipped entirely on subsequent runs (see Do-Not-List: never double-bill).
 *  - Independently, any session that is already attached to ANY invoice
 *    (via `invoices.session_ids`) is excluded from aggregation, so a session
 *    manually invoiced out-of-band can never be pulled into a second invoice.
 *
 * Uses the service-role client because the cron variant of this call has no
 * logged-in admin session to rely on for RLS.
 */
export async function generateInvoicesForPeriod(
    periodMonth: number,
    periodYear: number
): Promise<GenerateInvoicesResult> {
    const supabase = await createClient(true);

    const startDate = new Date(periodYear, periodMonth - 1, 1);
    const endDate = new Date(periodYear, periodMonth, 0); // last day of the month
    const startStr = format(startDate, "yyyy-MM-dd");
    const endStr = format(endDate, "yyyy-MM-dd");

    const result: GenerateInvoicesResult = { periodMonth, periodYear, created: [], skipped: [] };

    // 1. All completed sessions in the period — only `completed` sessions are
    // ever billable (Do-Not-List: never bill cancelled/no_show by default).
    const { data: sessions, error: sessionsError } = await supabase
        .from("sessions")
        .select("id, student_id, price")
        .eq("status", "completed")
        .gte("date", startStr)
        .lte("date", endStr);

    if (sessionsError) throw sessionsError;
    if (!sessions || sessions.length === 0) return result;

    // 2. Look at every existing invoice (any period) so we can exclude
    // sessions already billed, and detect students already invoiced for
    // this exact period.
    const { data: existingInvoices, error: invoicesError } = await supabase
        .from("invoices")
        .select("student_id, session_ids, period_month, period_year");

    if (invoicesError) throw invoicesError;

    const alreadyInvoicedSessionIds = new Set<string>();
    const studentsInvoicedThisPeriod = new Set<string>();
    for (const inv of existingInvoices || []) {
        (inv.session_ids || []).forEach((id: string) => alreadyInvoicedSessionIds.add(id));
        if (inv.period_month === periodMonth && inv.period_year === periodYear) {
            studentsInvoicedThisPeriod.add(inv.student_id);
        }
    }

    // 3. Group remaining billable sessions by student.
    const byStudent = new Map<string, { id: string; price: number }[]>();
    for (const s of sessions) {
        if (alreadyInvoicedSessionIds.has(s.id)) continue;
        if (!byStudent.has(s.student_id)) byStudent.set(s.student_id, []);
        byStudent.get(s.student_id)!.push({ id: s.id, price: s.price });
    }

    // 4. One insert per student.
    for (const [studentId, studentSessions] of byStudent) {
        if (studentSessions.length === 0) continue;

        if (studentsInvoicedThisPeriod.has(studentId)) {
            result.skipped.push({ studentId, reason: "Invoice already exists for this period" });
            continue;
        }

        const totalAmount = studentSessions.reduce((sum, s) => sum + s.price, 0);
        const sessionIds = studentSessions.map((s) => s.id);

        const { data: invoice, error: insertError } = await supabase
            .from("invoices")
            .insert([
                {
                    student_id: studentId,
                    period_month: periodMonth,
                    period_year: periodYear,
                    session_ids: sessionIds,
                    total_amount: totalAmount,
                    status: "sent",
                },
            ])
            .select("id")
            .single();

        if (insertError || !invoice) {
            result.skipped.push({ studentId, reason: insertError?.message || "Insert failed" });
            continue;
        }

        result.created.push({
            studentId,
            invoiceId: invoice.id,
            totalAmount,
            sessionCount: sessionIds.length,
        });
    }

    return result;
}