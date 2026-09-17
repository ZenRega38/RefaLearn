import type { SupabaseClient } from "@supabase/supabase-js";

export const CANCELLATION_FEE_AMOUNT = 50000;

/**
 * Membatalkan satu atau beberapa sesi milik siswa sendiri sebagai SATU aksi —
 * tetap cuma bikin satu baris denda Rp50.000 berapa pun jumlah session_ids
 * yang dibatalkan bareng ("denda per aksi, bukan per kelas").
 */
export async function cancelSessionsAsStudent(
    supabase: SupabaseClient,
    studentId: string,
    sessionIds: string[]
) {
    if (sessionIds.length === 0) return;

    const { error: feeError } = await supabase.from("cancellation_fees").insert([
        {
            student_id: studentId,
            session_ids: sessionIds,
            amount: CANCELLATION_FEE_AMOUNT,
            status: "unpaid",
        },
    ]);
    if (feeError) throw feeError;

    const { error: sessionError } = await supabase
        .from("sessions")
        .update({ status: "cancelled" })
        .in("id", sessionIds)
        .eq("student_id", studentId);
    if (sessionError) throw sessionError;
}