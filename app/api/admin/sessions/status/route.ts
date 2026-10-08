import { NextRequest, NextResponse } from "next/server";
import { errorMessage, jsonError, readJson, requireAdminUser } from "@/lib/api-auth";
import { hasStarted } from "@/lib/cancellation";
import { formatDateStr, hhmm } from "@/lib/format";
import { getUserEmail, sendSessionAcceptedEmail, sendSessionDeclinedEmail } from "@/lib/email";

const TRANSITIONS: Record<string, string[]> = {
    pending: ["accepted", "declined"],
    accepted: ["completed", "cancelled", "no_show"],
};

/**
 * POST /api/admin/sessions/status  { sessionId, status, force? }
 * Moves a session through its lifecycle and emails the student on
 * accept/decline. Completing or marking no-show before the session's start
 * time requires `force: true` (the UI asks first).
 */
export async function POST(request: NextRequest) {
    const auth = await requireAdminUser();
    if (!auth.ok) return jsonError(auth.error, auth.status);
    const { supabase } = auth;

    const body = await readJson<{ sessionId?: string; status?: string; force?: boolean }>(request);
    if (!body?.sessionId || !body.status) return jsonError("sessionId dan status wajib diisi.");

    const { data: session } = await supabase
        .from("sessions")
        .select("id, student_id, date, start_time, status, profiles(full_name)")
        .eq("id", body.sessionId)
        .single();

    if (!session) return jsonError("Sesi tidak ditemukan.", 404);

    if (!(TRANSITIONS[session.status] || []).includes(body.status)) {
        return jsonError(`Status tidak bisa diubah dari "${session.status}" ke "${body.status}".`);
    }

    if (["completed", "no_show"].includes(body.status) && !hasStarted(session) && !body.force) {
        return NextResponse.json(
            { error: "Sesi ini belum dimulai.", needsConfirmation: true },
            { status: 409 }
        );
    }

    const { error } = await supabase
        .from("sessions")
        .update({ status: body.status })
        .eq("id", session.id)
        .eq("status", session.status);

    if (error) return jsonError(errorMessage(error), 500);

    if (body.status === "accepted" || body.status === "declined") {
        try {
            const email = await getUserEmail(session.student_id);
            const profile = session.profiles as unknown as { full_name?: string } | null;
            if (email) {
                const params = {
                    studentName: profile?.full_name || "Siswa",
                    date: formatDateStr(session.date, "EEEE, dd MMMM yyyy"),
                    time: hhmm(session.start_time),
                };
                if (body.status === "accepted") await sendSessionAcceptedEmail(email, params);
                else await sendSessionDeclinedEmail(email, params);
            }
        } catch (err) {
            console.error("[admin/sessions/status] notify failed:", err);
        }
    }

    return NextResponse.json({ ok: true });
}
