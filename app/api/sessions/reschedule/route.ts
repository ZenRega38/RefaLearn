import { NextRequest, NextResponse } from "next/server";
import { errorMessage, jsonError, readJson, requireUser } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { bookingHorizon, findSlot, getOpenSlots } from "@/lib/availability";
import { hasStarted } from "@/lib/cancellation";
import { todayStr } from "@/lib/time";
import { formatDateStr, hhmm } from "@/lib/format";
import { getAdminEmails, sendAdminRescheduleRequestEmail } from "@/lib/email";

/**
 * POST /api/sessions/reschedule  { sessionId, date, startTime, reason? }
 * Files a reschedule request for the admin after checking the new slot is
 * really open. Rescheduling never incurs a fee.
 */
export async function POST(request: NextRequest) {
    const auth = await requireUser("student");
    if (!auth.ok) return jsonError(auth.error, auth.status);
    const { user, profile } = auth;

    const body = await readJson<{ sessionId?: string; date?: string; startTime?: string; reason?: string }>(request);
    if (!body?.sessionId || !body.date || !body.startTime) return jsonError("Data reschedule tidak lengkap.");

    const admin = createAdminClient();
    const { data: session } = await admin
        .from("sessions")
        .select("id, date, start_time, status")
        .eq("id", body.sessionId)
        .eq("student_id", user.id)
        .maybeSingle();

    if (!session) return jsonError("Sesi tidak ditemukan.", 404);
    if (!["pending", "accepted"].includes(session.status)) return jsonError("Sesi ini tidak bisa di-reschedule.");
    if (hasStarted(session)) return jsonError("Sesi yang sudah dimulai atau lewat tidak bisa di-reschedule.");

    let slots;
    try {
        slots = await getOpenSlots(admin, todayStr(), bookingHorizon(), {
            excludeSession: { date: session.date, start_time: session.start_time },
        });
    } catch (err) {
        return jsonError(errorMessage(err), 500);
    }

    const slot = findSlot(slots, body.date, body.startTime);
    if (!slot) return jsonError("Jadwal yang dipilih sudah tidak tersedia.", 409);
    if (slot.date === session.date && slot.start_time === hhmm(session.start_time)) {
        return jsonError("Jadwal baru sama dengan jadwal semula.");
    }

    const reason = (body.reason || "").trim().slice(0, 500) || null;
    const { error } = await admin.from("reschedule_requests").insert([
        {
            session_id: session.id,
            student_id: user.id,
            original_date: session.date,
            original_start_time: session.start_time,
            requested_date: slot.date,
            requested_start_time: slot.start_time,
            requested_end_time: slot.end_time,
            reason,
        },
    ]);

    if (error) {
        if (error.code === "23505") return jsonError("Sesi ini sudah punya permintaan reschedule yang menunggu.", 409);
        return jsonError(errorMessage(error), 500);
    }

    try {
        await sendAdminRescheduleRequestEmail(await getAdminEmails(), {
            studentName: profile.full_name || "Siswa",
            from: `${formatDateStr(session.date, "dd MMM yyyy")} ${hhmm(session.start_time)}`,
            to: `${formatDateStr(slot.date, "dd MMM yyyy")} ${slot.start_time}`,
            reason,
        });
    } catch (err) {
        console.error("[api/sessions/reschedule] notify failed:", err);
    }

    return NextResponse.json({ ok: true });
}
