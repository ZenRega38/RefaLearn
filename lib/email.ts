import { Resend } from "resend";
import { createClient as createServerClient } from "@/lib/supabase/server";

// Server-only. Never import this file from a "use client" component —
// RESEND_API_KEY and the service-role Supabase client must never reach
// the browser bundle.

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Refa Learn <onboarding@resend.dev>";

/**
 * Looks up a user's login email via the Supabase Auth admin API.
 * Requires the service-role client — `profiles` doesn't store email,
 * only `auth.users` does, and that table isn't exposed to normal roles.
 */
export async function getUserEmail(userId: string): Promise<string | null> {
    const supabaseAdmin = await createServerClient(true);
    const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId);
    if (error || !data?.user?.email) return null;
    return data.user.email;
}

async function sendEmail(to: string, subject: string, html: string) {
    if (!resend) {
        console.warn(`[email] RESEND_API_KEY not set — skipping "${subject}" to ${to}`);
        return { skipped: true as const };
    }
    const { data, error } = await resend.emails.send({ from: FROM_EMAIL, to, subject, html });
    if (error) {
        console.error(`[email] Resend failed for "${subject}" to ${to}:`, error);
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

// ---------------------------------------------------------------------------
// Session lifecycle
// ---------------------------------------------------------------------------

export async function sendSessionDeclinedEmail(
    to: string,
    params: { studentName: string; date: string; time: string }
) {
    const html = layout(`
    <p>Halo ${params.studentName},</p>
    <p>Mohon maaf, permintaan sesi Anda pada <strong>${params.date} pukul ${params.time}</strong> tidak dapat kami konfirmasi.</p>
    <p>Silakan pilih jadwal lain melalui halaman Book a Session di website kami.</p>
  `);
    return sendEmail(to, "Permintaan Sesi Tidak Dapat Dikonfirmasi — Refa Learn", html);
}

// ---------------------------------------------------------------------------
// Invoicing
// ---------------------------------------------------------------------------

export async function sendInvoiceGeneratedEmail(
    to: string,
    params: { studentName: string; monthLabel: string; totalAmount: string }
) {
    const html = layout(`
    <p>Halo ${params.studentName},</p>
    <p>Tagihan Anda untuk bulan <strong>${params.monthLabel}</strong> sebesar <strong>${params.totalAmount}</strong> telah diterbitkan.</p>
    <p>Silakan login ke dashboard Anda untuk melihat detail dan mengunggah bukti pembayaran.</p>
  `);
    return sendEmail(to, `Tagihan ${params.monthLabel} Telah Diterbitkan — Refa Learn`, html);
}

export async function sendInvoiceStatusEmail(
    to: string,
    params: { studentName: string; monthLabel: string; status: "confirmed" | "rejected" }
) {
    const isConfirmed = params.status === "confirmed";
    const html = layout(`
    <p>Halo ${params.studentName},</p>
    <p>
      Pembayaran untuk tagihan bulan <strong>${params.monthLabel}</strong> telah
      ${isConfirmed
            ? '<strong style="color:#4C8C6B;">dikonfirmasi. Terima kasih!</strong>'
            : '<strong style="color:#C24B4B;">ditolak.</strong> Silakan periksa kembali dan unggah ulang bukti transfer yang valid melalui dashboard Anda.'}
    </p>
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
// Material orders
// ---------------------------------------------------------------------------

export async function sendMaterialOrderStatusEmail(
    to: string,
    params: { studentName: string; status: "confirmed" | "rejected" }
) {
    const isConfirmed = params.status === "confirmed";
    const html = layout(`
    <p>Halo ${params.studentName},</p>
    <p>
      Pesanan materi Anda telah
      ${isConfirmed
            ? '<strong style="color:#4C8C6B;">dikonfirmasi. Materi sudah bisa diunduh dari dashboard Anda.</strong>'
            : '<strong style="color:#C24B4B;">ditolak.</strong> Silakan periksa kembali dan unggah ulang bukti transfer yang valid.'}
    </p>
  `);
    return sendEmail(
        to,
        isConfirmed ? "Pesanan Materi Dikonfirmasi — Refa Learn" : "Bukti Pembayaran Materi Ditolak — Refa Learn",
        html
    );
}