import { NextRequest, NextResponse } from "next/server";
import { errorMessage, jsonError, readJson, requireUser } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { cancellationFeeFor, hasStarted } from "@/lib/cancellation";
import { formatPrice } from "@/lib/pricing";
import { formatDateStr, hhmm } from "@/lib/format";
import { getAdminEmails, sendAdminCancellationEmail } from "@/lib/email";

/**
 * POST /api/sessions/cancel  { sessionIds: string[], preview?: boolean }
 *
 * One cancellation ACTION by the student. Free for unaccepted requests and
 * for accepted sessions with enough notice; otherwise one flat fee for the
 * whole action. `preview: true` only returns the fee so the confirm dialog
 * can show the real amount.
 */
export async function POST(request: NextRequest) {
    const auth = await requireUser("student");
    if (!auth.ok) return jsonError(auth.error, auth.status);
    const { user, profile } = auth;

    const body = await readJson<{ sessionIds?: string[]; preview?: boolean }>(request);
    const ids = Array.from(new Set(body?.sessionIds || [])).filter((x) => typeof x === "string");
    if (ids.length === 0) return jsonError("Tidak ada sesi yang dipilih.");

    const admin = createAdminClient();
    const { data: sessions, error } = await admin
        .from("sessions")
        .select("id, date, start_time, status")
        .eq("student_id", user.id)
        .in("id", ids);

    if (error) return jsonError(errorMessage(error), 500);
    if (!sessions || sessions.length !== ids.length) return jsonError("Sesi tidak ditemukan.", 404);

    if (sessions.some((s) => !["pending", "accepted"].includes(s.status))) {
        return jsonError("Hanya sesi yang menunggu konfirmasi atau terjadwal yang bisa dibatalkan.");
    }
    if (sessions.some((s) => hasStarted(s))) {
        return jsonError("Sesi yang sudah dimulai atau lewat tidak bisa dibatalkan.");
    }

    const fee = cancellationFeeFor(sessions);
    if (body?.preview) return NextResponse.json({ fee });

    const { data: updated, error: updateError } = await admin
        .from("sessions")
        .update({ status: "cancelled" })
        .in("id", ids)
        .eq("student_id", user.id)
        .in("status", ["pending", "accepted"])
        .select("id");

    if (updateError) return jsonError(errorMessage(updateError), 500);
    if (!updated || updated.length !== ids.length) {
        return jsonError("Status sesi berubah saat diproses. Muat ulang halaman.", 409);
    }

    // A pending reschedule for a cancelled session is moot.
    await admin
        .from("reschedule_requests")
        .update({ status: "rejected", admin_note: "Sesi dibatalkan oleh siswa", resolved_at: new Date().toISOString() })
        .in("session_id", ids)
        .eq("status", "pending");

    if (fee > 0) {
        const { error: feeError } = await admin.from("cancellation_fees").insert([
            { student_id: user.id, session_ids: ids, amount: fee, status: "unpaid" },
        ]);
        if (feeError) console.error("[api/sessions/cancel] fee insert failed:", feeError);
    }

    try {
        await sendAdminCancellationEmail(await getAdminEmails(), {
            studentName: profile.full_name || "Siswa",
            sessions: sessions.map((s) => ({ date: formatDateStr(s.date, "EEEE, dd MMMM yyyy"), time: hhmm(s.start_time) })),
            fee: fee > 0 ? formatPrice(fee) : null,
        });
    } catch (err) {
        console.error("[api/sessions/cancel] notify failed:", err);
    }

    return NextResponse.json({ ok: true, fee, cancelled: ids.length });
}
