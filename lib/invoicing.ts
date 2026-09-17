import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";

// Server-only. Single source of truth untuk mengubah sesi `completed` +
// denda pembatalan yang belum lunas jadi invoice bulanan.

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

export function getPreviousPeriod(reference: Date = new Date()): { month: number; year: number } {
    const prevMonthDate = new Date(reference.getFullYear(), reference.getMonth() - 1, 1);
    return { month: prevMonthDate.getMonth() + 1, year: prevMonthDate.getFullYear() };
}

export async function generateInvoicesForPeriod(
    periodMonth: number,
    periodYear: number
): Promise<GenerateInvoicesResult> {
    const supabase = await createClient(true);

    const startDate = new Date(periodYear, periodMonth - 1, 1);
    const endDate = new Date(periodYear, periodMonth, 0);
    const startStr = format(startDate, "yyyy-MM-dd");
    const endStr = format(endDate, "yyyy-MM-dd");

    const result: GenerateInvoicesResult = { periodMonth, periodYear, created: [], skipped: [] };

    const { data: sessions, error: sessionsError } = await supabase
        .from("sessions")
        .select("id, student_id, price")
        .eq("status", "completed")
        .gte("date", startStr)
        .lte("date", endStr);

    if (sessionsError) throw sessionsError;

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

    // Sesi yang sudah dilunasi lewat jalur "bayar di muka" (prepayments) juga
    // tidak boleh ditagih lagi lewat invoice bulanan biasa.
    const { data: confirmedPrepayments, error: prepaymentsError } = await supabase
        .from("prepayments")
        .select("session_ids")
        .eq("status", "confirmed");

    if (prepaymentsError) throw prepaymentsError;

    for (const p of confirmedPrepayments || []) {
        (p.session_ids || []).forEach((id: string) => alreadyInvoicedSessionIds.add(id));
    }

    const byStudent = new Map<string, { id: string; price: number }[]>();
    for (const s of sessions || []) {
        if (alreadyInvoicedSessionIds.has(s.id)) continue;
        if (!byStudent.has(s.student_id)) byStudent.set(s.student_id, []);
        byStudent.get(s.student_id)!.push({ id: s.id, price: s.price });
    }

    // Denda pembatalan yang belum lunas — diakumulasikan ke invoice
    // berikutnya, per Do-Not-List: jangan pernah ilang begitu aja.
    const { data: unpaidFees, error: feesError } = await supabase
        .from("cancellation_fees")
        .select("id, student_id, amount")
        .eq("status", "unpaid");

    if (feesError) throw feesError;

    const feesByStudent = new Map<string, { id: string; amount: number }[]>();
    for (const f of unpaidFees || []) {
        if (!feesByStudent.has(f.student_id)) feesByStudent.set(f.student_id, []);
        feesByStudent.get(f.student_id)!.push({ id: f.id, amount: f.amount });
    }

    // Kumpulan semua student yang perlu di-invoice: yang punya sesi selesai,
    // ATAU yang cuma punya denda nyangkut (tanpa sesi selesai bulan ini).
    const allStudentIds = new Set<string>([...byStudent.keys(), ...feesByStudent.keys()]);

    for (const studentId of allStudentIds) {
        if (studentsInvoicedThisPeriod.has(studentId)) {
            result.skipped.push({ studentId, reason: "Invoice already exists for this period" });
            continue;
        }

        const studentSessions = byStudent.get(studentId) || [];
        const studentFees = feesByStudent.get(studentId) || [];

        const sessionAmount = studentSessions.reduce((sum, s) => sum + s.price, 0);
        const feeAmount = studentFees.reduce((sum, f) => sum + f.amount, 0);
        const totalAmount = sessionAmount + feeAmount;

        if (totalAmount <= 0) continue;

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

        // Tandai denda-denda yang baru saja dimasukkan ke invoice ini biar
        // gak ke-double-hitung di generate berikutnya.
        if (studentFees.length > 0) {
            const { error: feeUpdateError } = await supabase
                .from("cancellation_fees")
                .update({ status: "invoiced", invoice_id: invoice.id, resolved_at: new Date().toISOString() })
                .in("id", studentFees.map((f) => f.id));

            if (feeUpdateError) {
                console.error("[generateInvoicesForPeriod] failed to mark fees invoiced:", feeUpdateError);
            }
        }

        result.created.push({
            studentId,
            invoiceId: invoice.id,
            totalAmount,
            sessionCount: sessionIds.length,
            feeAmount,
        });
    }

    return result;
}