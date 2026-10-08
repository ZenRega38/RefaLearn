import "server-only";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";
import { APP_TIMEZONE_LABEL } from "@/lib/time";

// Server-only. RESEND_API_KEY and the service-role client must never reach
// the browser bundle — the `server-only` import enforces that at build time.

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Refa Learn <onboarding@resend.dev>";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/** Escapes user-supplied text before it goes into email HTML. */
export function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

/**
 * Looks up a user's login email via the Supabase Auth admin API —
 * `profiles` doesn't store email, only `auth.users` does.
 */
export async function getUserEmail(userId: string): Promise<string | null> {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId);
    if (error || !data?.user?.email) return null;
    return data.user.email;
}

/** Emails of every admin account, for "something needs your attention" mail. */
export async function getAdminEmails(): Promise<string[]> {
    const supabaseAdmin = createAdminClient();
    const { data } = await supabaseAdmin.from("profiles").select("id").eq("role", "admin");
    const emails = await Promise.all((data || []).map((p) => getUserEmail(p.id)));
    return emails.filter((e): e is string => !!e);
}

async function sendEmail(to: string | string[], subject: string, html: string) {
    if (!resend) {
        console.warn(`[email] RESEND_API_KEY not set — skipping "${subject}"`);
        return { skipped: true as const };
    }
    if (Array.isArray(to) && to.length === 0) return { skipped: true as const };
    const { data, error } = await resend.emails.send({ from: FROM_EMAIL, to, subject, html });
    if (error) {
        console.error(`[email] Resend failed for "${subject}":`, error);
        throw new Error(error.message || "Resend send failed");
    }
    return data;
}

function layout(bodyHtml: string) {
    return `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; color:#232323;">
    <h2 style="color:#2B4C7E; margin-bottom: 4px;">Refa Learn</h2>
    <p style="color:#5C574E; font-size:12px; margin-top:0;">Bridging Borders, Embracing The World!</p>
    <div style="border-top: 1px solid #D8D0BD; padding-top: 16px; margin-top: 16px;">
      ${bodyHtml}
    </div>
    <p style="color:#5C574E; font-size:12px; margin-top:32px;">
      Email ini dikirim otomatis oleh sistem Refa Learn. Mohon tidak membalas langsung ke email ini.
    </p>
  </div>`;
}

function button(path: string, label: string) {
    return `<p><a href="${SITE_URL}${path}" style="display:inline-block;background:#E8734A;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;font-weight:bold;">${label}</a></p>`;
}

const greet = (name: string) => `<p>Halo ${escapeHtml(name)},</p>`;

// ---------------------------------------------------------------------------
// Session lifecycle
// ---------------------------------------------------------------------------

export type SessionLine = { date: string; time: string };

function sessionList(lines: SessionLine[]) {
    return `<ul>${lines
        .map((l) => `<li>${escapeHtml(l.date)}, pukul ${escapeHtml(l.time)} ${APP_TIMEZONE_LABEL}</li>`)
        .join("")}</ul>`;
}

export async function sendBookingReceivedEmail(
    to: string,
    params: { studentName: string; sessions: SessionLine[] }
) {
    const html = layout(`
    ${greet(params.studentName)}
    <p>Permintaan booking Anda sudah kami terima dan sedang menunggu konfirmasi:</p>
    ${sessionList(params.sessions)}
    <p>Kami akan mengabari Anda begitu jadwal dikonfirmasi.</p>
    ${button("/dashboard", "Lihat Sesi Saya")}
  `);
    return sendEmail(to, "Permintaan Booking Diterima — Refa Learn", html);
}

export async function sendAdminNewBookingEmail(
    to: string[],
    params: { studentName: string; sessions: SessionLine[] }
) {
    const html = layout(`
    <p>Ada permintaan sesi baru dari <strong>${escapeHtml(params.studentName)}</strong>:</p>
    ${sessionList(params.sessions)}
    ${button("/admin/sessions", "Tinjau Permintaan")}
  `);
    return sendEmail(to, `Booking Baru dari ${params.studentName} — Refa Learn`, html);
}

export async function sendSessionAcceptedEmail(
    to: string,
    params: { studentName: string; date: string; time: string }
) {
    const html = layout(`
    ${greet(params.studentName)}
    <p>Sesi Anda pada <strong>${escapeHtml(params.date)} pukul ${escapeHtml(params.time)} ${APP_TIMEZONE_LABEL}</strong> telah <strong style="color:#4C8C6B;">dikonfirmasi</strong>. Sampai jumpa di kelas!</p>
    ${button("/dashboard", "Lihat Jadwal")}
  `);
    return sendEmail(to, "Sesi Dikonfirmasi — Refa Learn", html);
}

export async function sendSessionDeclinedEmail(
    to: string,
    params: { studentName: string; date: string; time: string }
) {
    const html = layout(`
    ${greet(params.studentName)}
    <p>Mohon maaf, permintaan sesi Anda pada <strong>${escapeHtml(params.date)} pukul ${escapeHtml(params.time)} ${APP_TIMEZONE_LABEL}</strong> tidak dapat kami konfirmasi.</p>
    <p>Silakan pilih jadwal lain melalui halaman Book a Session di website kami.</p>
    ${button("/schedule", "Pilih Jadwal Lain")}
  `);
    return sendEmail(to, "Permintaan Sesi Tidak Dapat Dikonfirmasi — Refa Learn", html);
}

export async function sendRescheduleResultEmail(
    to: string,
    params: { studentName: string; approved: boolean; from: string; to: string; note?: string | null }
) {
    const html = layout(`
    ${greet(params.studentName)}
    <p>Permintaan reschedule Anda dari <strong>${escapeHtml(params.from)}</strong> ke <strong>${escapeHtml(params.to)}</strong>
    ${params.approved
            ? '<strong style="color:#4C8C6B;">disetujui</strong>. Jadwal baru sudah tercatat.'
            : '<strong style="color:#C24B4B;">tidak dapat disetujui</strong>. Jadwal semula tetap berlaku.'}</p>
    ${params.note ? `<p>Catatan admin: ${escapeHtml(params.note)}</p>` : ""}
    ${button("/dashboard", "Lihat Sesi Saya")}
  `);
    return sendEmail(to, params.approved ? "Reschedule Disetujui — Refa Learn" : "Reschedule Ditolak — Refa Learn", html);
}

export async function sendAdminCancellationEmail(
    to: string[],
    params: { studentName: string; sessions: SessionLine[]; fee: string | null }
) {
    const html = layout(`
    <p><strong>${escapeHtml(params.studentName)}</strong> membatalkan sesi berikut:</p>
    ${sessionList(params.sessions)}
    <p>${params.fee ? `Denda pembatalan tercatat: <strong>${escapeHtml(params.fee)}</strong>.` : "Tanpa denda (pemberitahuan cukup)."}</p>
    ${button("/admin/sessions", "Buka Admin")}
  `);
    return sendEmail(to, `Pembatalan Sesi oleh ${params.studentName} — Refa Learn`, html);
}

export async function sendAdminRescheduleRequestEmail(
    to: string[],
    params: { studentName: string; from: string; to: string; reason: string | null }
) {
    const html = layout(`
    <p><strong>${escapeHtml(params.studentName)}</strong> meminta reschedule:</p>
    <p>${escapeHtml(params.from)} → <strong>${escapeHtml(params.to)}</strong></p>
    ${params.reason ? `<p>Alasan: ${escapeHtml(params.reason)}</p>` : ""}
    ${button("/admin/sessions", "Tinjau Permintaan")}
  `);
    return sendEmail(to, `Permintaan Reschedule dari ${params.studentName} — Refa Learn`, html);
}

// ---------------------------------------------------------------------------
// Invoicing
// ---------------------------------------------------------------------------

export async function sendInvoiceGeneratedEmail(
    to: string,
    params: { studentName: string; monthLabel: string; totalAmount: string; dueDate: string }
) {
    const html = layout(`
    ${greet(params.studentName)}
    <p>Tagihan Anda untuk bulan <strong>${escapeHtml(params.monthLabel)}</strong> sebesar <strong>${escapeHtml(params.totalAmount)}</strong> telah diterbitkan,
    jatuh tempo <strong>${escapeHtml(params.dueDate)}</strong>.</p>
    <p>Silakan login ke dashboard Anda untuk melihat rincian dan mengunggah bukti pembayaran.</p>
    ${button("/dashboard/invoices", "Lihat Tagihan")}
  `);
    return sendEmail(to, `Tagihan ${params.monthLabel} Telah Diterbitkan — Refa Learn`, html);
}

export async function sendInvoiceOverdueEmail(
    to: string,
    params: { studentName: string; monthLabel: string; totalAmount: string }
) {
    const html = layout(`
    ${greet(params.studentName)}
    <p>Tagihan bulan <strong>${escapeHtml(params.monthLabel)}</strong> sebesar <strong>${escapeHtml(params.totalAmount)}</strong> telah melewati jatuh tempo.
    Booking sesi baru dijeda sampai tagihan ini dikonfirmasi lunas.</p>
    ${button("/dashboard/invoices", "Bayar Sekarang")}
  `);
    return sendEmail(to, `Tagihan ${params.monthLabel} Lewat Jatuh Tempo — Refa Learn`, html);
}

export async function sendInvoiceStatusEmail(
    to: string,
    params: { studentName: string; monthLabel: string; status: "confirmed" | "rejected" }
) {
    const isConfirmed = params.status === "confirmed";
    const html = layout(`
    ${greet(params.studentName)}
    <p>
      Pembayaran untuk tagihan bulan <strong>${escapeHtml(params.monthLabel)}</strong> telah
      ${isConfirmed
            ? '<strong style="color:#4C8C6B;">dikonfirmasi. Terima kasih!</strong>'
            : '<strong style="color:#C24B4B;">ditolak.</strong> Silakan periksa kembali dan unggah ulang bukti transfer yang valid melalui dashboard Anda.'}
    </p>
    ${button("/dashboard/invoices", "Lihat Tagihan")}
  `);
    return sendEmail(
        to,
        isConfirmed
            ? `Pembayaran Tagihan ${params.monthLabel} Dikonfirmasi — Refa Learn`
            : `Bukti Pembayaran Tagihan ${params.monthLabel} Ditolak — Refa Learn`,
        html
    );
}

// ---------------------------------------------------------------------------
// Material orders & prepayments
// ---------------------------------------------------------------------------

export async function sendMaterialOrderStatusEmail(
    to: string,
    params: { studentName: string; status: "confirmed" | "rejected" }
) {
    const isConfirmed = params.status === "confirmed";
    const html = layout(`
    ${greet(params.studentName)}
    <p>
      Pesanan materi Anda telah
      ${isConfirmed
            ? '<strong style="color:#4C8C6B;">dikonfirmasi. Materi sudah bisa diunduh dari dashboard Anda.</strong>'
            : '<strong style="color:#C24B4B;">ditolak.</strong> Silakan periksa kembali dan unggah ulang bukti transfer yang valid.'}
    </p>
    ${button("/dashboard/materials", "Buka Materi Saya")}
  `);
    return sendEmail(
        to,
        isConfirmed ? "Pesanan Materi Dikonfirmasi — Refa Learn" : "Bukti Pembayaran Materi Ditolak — Refa Learn",
        html
    );
}

export async function sendPrepaymentStatusEmail(
    to: string,
    params: { studentName: string; status: "confirmed" | "rejected" }
) {
    const isConfirmed = params.status === "confirmed";
    const html = layout(`
    ${greet(params.studentName)}
    <p>
      Pembayaran di muka Anda telah
      ${isConfirmed
            ? '<strong style="color:#4C8C6B;">dikonfirmasi</strong>. Denda pembatalan yang tercakup sudah dihapus.'
            : '<strong style="color:#C24B4B;">ditolak.</strong> Silakan unggah ulang bukti transfer yang valid dari dashboard Anda.'}
    </p>
    ${button("/dashboard", "Buka Dashboard")}
  `);
    return sendEmail(
        to,
        isConfirmed ? "Pembayaran di Muka Dikonfirmasi — Refa Learn" : "Bukti Pembayaran di Muka Ditolak — Refa Learn",
        html
    );
}

// ---------------------------------------------------------------------------
// Chat
// ---------------------------------------------------------------------------

export async function sendNewChatMessageEmail(
    to: string | string[],
    params: { fromName: string; preview: string; path: string }
) {
    const html = layout(`
    <p>Pesan baru dari <strong>${escapeHtml(params.fromName)}</strong>:</p>
    <blockquote style="border-left:3px solid #D8D0BD;margin:0;padding:4px 12px;color:#5C574E;">${escapeHtml(params.preview)}</blockquote>
    ${button(params.path, "Balas Pesan")}
  `);
    return sendEmail(to, `Pesan Baru dari ${params.fromName} — Refa Learn`, html);
}
