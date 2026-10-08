import { NextRequest, NextResponse } from "next/server";
import { jsonError, readJson, requireUser } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAdminEmails, getUserEmail, sendNewChatMessageEmail } from "@/lib/email";

/** Don't email about every line of a live conversation. */
const QUIET_MINUTES = 30;

/**
 * POST /api/chat/notify  { messageId }
 * Called by the sender right after a message is stored. Emails the other
 * side, but only when the conversation had been quiet for QUIET_MINUTES.
 */
export async function POST(request: NextRequest) {
    const auth = await requireUser();
    if (!auth.ok) return jsonError(auth.error, auth.status);
    const { user, profile } = auth;

    const body = await readJson<{ messageId?: string }>(request);
    if (!body?.messageId) return jsonError("messageId wajib diisi.");

    const admin = createAdminClient();
    const { data: msg } = await admin
        .from("chat_messages")
        .select("id, conversation_id, sender_id, content, attachment_url, created_at, chat_conversations(student_id)")
        .eq("id", body.messageId)
        .maybeSingle();

    if (!msg || msg.sender_id !== user.id) return jsonError("Pesan tidak ditemukan.", 404);

    const { data: previous } = await admin
        .from("chat_messages")
        .select("created_at")
        .eq("conversation_id", msg.conversation_id)
        .lt("created_at", msg.created_at)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

    if (previous && Date.parse(msg.created_at) - Date.parse(previous.created_at) < QUIET_MINUTES * 60_000) {
        return NextResponse.json({ ok: true, emailed: false });
    }

    const preview = (msg.content || (msg.attachment_url ? "📎 Lampiran" : "")).slice(0, 200);
    const conv = msg.chat_conversations as unknown as { student_id: string } | null;

    try {
        if (profile.role === "admin") {
            const email = conv ? await getUserEmail(conv.student_id) : null;
            if (email) await sendNewChatMessageEmail(email, { fromName: "Admin Refa Learn", preview, path: "/dashboard" });
        } else {
            await sendNewChatMessageEmail(await getAdminEmails(), {
                fromName: profile.full_name || "Siswa",
                preview,
                path: "/admin/chat",
            });
        }
    } catch (err) {
        console.error("[api/chat/notify] failed:", err);
    }

    return NextResponse.json({ ok: true, emailed: true });
}
