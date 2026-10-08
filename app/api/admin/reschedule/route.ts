import { NextRequest, NextResponse } from "next/server";
import { errorMessage, isSlotConflict, jsonError, readJson, requireAdminUser } from "@/lib/api-auth";
import { bookingHorizon, findSlot, getOpenSlots } from "@/lib/availability";
import { createAdminClient } from "@/lib/supabase/admin";
import { getDayType, getSessionPrice } from "@/lib/pricing";
import { todayStr } from "@/lib/time";
import { formatDateStr, hhmm } from "@/lib/format";
import { getUserEmail, sendRescheduleResultEmail } from "@/lib/email";

/**
 * POST /api/admin/reschedule  { requestId, approve, note? }
 * Approving re-checks the requested slot, then moves the session and closes
 * the request atomically (approve_reschedule). Either way the student is
 * emailed.
 */
export async function POST(request: NextRequest) {
    const auth = await requireAdminUser();
    if (!auth.ok) return jsonError(auth.error, auth.status);
    const { supabase } = auth;

    const body = await readJson<{ requestId?: string; approve?: boolean; note?: string }>(request);
    if (!body?.requestId) return jsonError("requestId wajib diisi.");
    const note = (body.note || "").trim() || null;

    const { data: req } = await supabase
        .from("reschedule_requests")
        .select("*, sessions(date, start_time)")
        .eq("id", body.requestId)
        .eq("status", "pending")
        .maybeSingle();

    if (!req) return jsonError("Permintaan tidak ditemukan atau sudah diproses.", 404);
    const original = req.sessions as unknown as { date: string; start_time: string } | null;

    if (body.approve) {
        const slots = await getOpenSlots(createAdminClient(), todayStr(), bookingHorizon(), {
            excludeSession: original ? { date: original.date, start_time: original.start_time } : undefined,
        });
        if (!findSlot(slots, req.requested_date, req.requested_start_time)) {
            return jsonError("Slot yang diminta sudah tidak tersedia (terisi, libur, atau sudah lewat). Tolak permintaan ini.", 409);
        }

        const { error } = await supabase.rpc("approve_reschedule", {
            p_request: req.id,
            p_day_type: getDayType(req.requested_date),
            p_price: getSessionPrice(req.requested_date),
            p_note: note,
        });
        if (error) {
            if (isSlotConflict(error)) return jsonError("Slot yang diminta baru saja terisi.", 409);
            return jsonError(errorMessage(error), 500);
        }
    } else {
        const { error } = await supabase
            .from("reschedule_requests")
            .update({ status: "rejected", admin_note: note, resolved_at: new Date().toISOString() })
            .eq("id", req.id);
        if (error) return jsonError(errorMessage(error), 500);
    }

    try {
        const [{ data: profile }, email] = await Promise.all([
            supabase.from("profiles").select("full_name").eq("id", req.student_id).single(),
            getUserEmail(req.student_id),
        ]);
        if (email) {
            await sendRescheduleResultEmail(email, {
                studentName: profile?.full_name || "Siswa",
                approved: !!body.approve,
                from: `${formatDateStr(req.original_date, "dd MMM yyyy")} ${hhmm(req.original_start_time)}`,
                to: `${formatDateStr(req.requested_date, "dd MMM yyyy")} ${hhmm(req.requested_start_time)}`,
                note,
            });
        }
    } catch (err) {
        console.error("[admin/reschedule] notify failed:", err);
    }

    return NextResponse.json({ ok: true });
}
