import { NextRequest, NextResponse } from "next/server";
import { clientIp, errorMessage, isSlotConflict, jsonError, readJson, requireUser } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { bookingHorizon, findSlot, getOpenSlots } from "@/lib/availability";
import { weeklyDates } from "@/lib/rrule-helpers";
import { getDayType, getSessionPrice } from "@/lib/pricing";
import { INVOICE_DUE_DAYS, SESSION_COUNT_OPTIONS } from "@/lib/policy";
import { todayStr } from "@/lib/time";
import { formatDateStr, hhmm } from "@/lib/format";
import { PROFILE_COMPLETION_COLUMNS, missingProfileFields, type ProfileCompletion } from "@/lib/profile";
import {
    getAdminEmails,
    getUserEmail,
    sendAdminNewBookingEmail,
    sendBookingReceivedEmail,
} from "@/lib/email";

type BookingBody = {
    date?: string;
    startTime?: string;
    sessionCount?: number;
    contractId?: string;
    typedName?: string;
    signerRole?: "student" | "guardian";
    guardianName?: string;
    payUpfront?: boolean;
    checkOnly?: boolean;
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}(:\d{2})?$/;

/**
 * POST /api/bookings
 *
 * With `checkOnly: true` → { dates: [{ date, conflict }] } so the page can
 * preview a weekly series. Otherwise books it: validates every date against
 * live availability, the active contract and the signer, computes prices
 * with lib/pricing.ts, then writes acceptance + series + sessions (+
 * prepayment) in one transaction via create_booking().
 */
export async function POST(request: NextRequest) {
    const auth = await requireUser("student");
    if (!auth.ok) return jsonError(auth.error, auth.status);
    const { user, profile } = auth;

    const body = await readJson<BookingBody>(request);
    if (!body || !body.date || !DATE_RE.test(body.date) || !body.startTime || !TIME_RE.test(body.startTime)) {
        return jsonError("Tanggal atau jam tidak valid.");
    }

    const count = Number(body.sessionCount ?? 1);
    if (!SESSION_COUNT_OPTIONS.includes(count)) {
        return jsonError("Jumlah sesi tidak valid.");
    }

    const admin = createAdminClient();
    const dates = weeklyDates(body.date, count);
    const lastDate = dates[dates.length - 1];
    const horizon = bookingHorizon();
    const until = lastDate > horizon ? lastDate : horizon;

    let slots;
    try {
        slots = await getOpenSlots(admin, todayStr(), until);
    } catch (err) {
        return jsonError(errorMessage(err), 500);
    }

    const resolved = dates.map((date) => ({ date, slot: findSlot(slots, date, body.startTime!) }));
    const preview = resolved.map((r) => ({ date: r.date, conflict: !r.slot }));

    if (body.checkOnly) {
        return NextResponse.json({ dates: preview });
    }

    // Booking needs a complete profile so the admin can verify the student
    // before accepting. Free materials only need a login and skip this.
    const { data: completion } = await admin
        .from("profiles")
        .select(PROFILE_COMPLETION_COLUMNS)
        .eq("id", user.id)
        .single();
    const missing = missingProfileFields(completion as ProfileCompletion | null, todayStr());
    if (missing.length > 0) {
        return NextResponse.json(
            {
                error: `Lengkapi profil terlebih dahulu sebelum booking. Data yang masih kurang: ${missing.join(", ")}.`,
                code: "PROFILE_INCOMPLETE",
                missing,
            },
            { status: 403 }
        );
    }

    if (resolved[0].date > horizon) {
        return jsonError("Tanggal di luar jangkauan booking.");
    }
    if (resolved.some((r) => !r.slot)) {
        return NextResponse.json(
            { error: "Sebagian tanggal sudah tidak tersedia. Silakan cek ulang.", dates: preview },
            { status: 409 }
        );
    }

    // Late-payment clause: no new bookings while an invoice is past due.
    const cutoff = new Date(Date.now() - INVOICE_DUE_DAYS * 86_400_000).toISOString();
    const { data: pastDue } = await admin
        .from("invoices")
        .select("id")
        .eq("student_id", user.id)
        .in("status", ["sent", "rejected", "overdue"])
        .lt("generated_at", cutoff)
        .limit(1);
    if (pastDue && pastDue.length > 0) {
        return jsonError(
            "Booking baru dijeda karena ada tagihan yang melewati jatuh tempo. Silakan selesaikan pembayaran di menu Tagihan Saya.",
            403
        );
    }

    // Contract: must be the version in force today, and the signer must be
    // identifiable (UU ITE Pasal 11).
    const { data: contract } = await admin
        .from("contracts")
        .select("id")
        .lte("effective_date", todayStr())
        .order("version", { ascending: false })
        .limit(1)
        .maybeSingle();

    if (!contract || contract.id !== body.contractId) {
        return jsonError("Versi perjanjian sudah berubah. Silakan muat ulang halaman dan baca perjanjian terbaru.", 409);
    }

    const typedName = (body.typedName || "").trim();
    const signerRole = body.signerRole === "guardian" ? "guardian" : "student";
    const guardianName = (body.guardianName || "").trim();
    const profileName = (profile.full_name || "").trim();

    if (!typedName) return jsonError("Nama penanda tangan wajib diisi.");
    if (signerRole === "student" && typedName.toLowerCase() !== profileName.toLowerCase()) {
        return jsonError("Nama yang diketik harus sama dengan nama di profil Anda.");
    }
    if (signerRole === "guardian" && typedName.toLowerCase() === profileName.toLowerCase()) {
        return jsonError("Untuk persetujuan orang tua/wali, ketik nama orang tua/wali — bukan nama siswa.");
    }

    const sessions = resolved.map(({ date, slot }) => ({
        date,
        start_time: slot!.start_time,
        end_time: slot!.end_time,
        day_type: getDayType(date),
        price: getSessionPrice(date),
    }));

    const { data: booking, error } = await admin.rpc("create_booking", {
        p_student: user.id,
        p_contract: contract.id,
        p_typed_name: typedName,
        p_signer_role: signerRole,
        p_guardian_name: signerRole === "guardian" ? guardianName || typedName : null,
        p_ip: clientIp(request),
        p_user_agent: request.headers.get("user-agent"),
        p_sessions: sessions,
        p_prepay: !!body.payUpfront,
    });

    if (error) {
        if (isSlotConflict(error)) {
            return jsonError("Maaf, jadwal ini baru saja dipesan orang lain. Silakan pilih ulang.", 409);
        }
        console.error("[api/bookings] create_booking failed:", error);
        return jsonError(errorMessage(error, "Gagal melakukan booking."), 500);
    }

    // Notifications are best-effort.
    const lines = sessions.map((s) => ({ date: formatDateStr(s.date, "EEEE, dd MMMM yyyy"), time: hhmm(s.start_time) }));
    try {
        const [email, admins] = await Promise.all([getUserEmail(user.id), getAdminEmails()]);
        await Promise.allSettled([
            email ? sendBookingReceivedEmail(email, { studentName: profileName || "Siswa", sessions: lines }) : null,
            sendAdminNewBookingEmail(admins, { studentName: profileName || "Siswa", sessions: lines }),
        ]);
    } catch (err) {
        console.error("[api/bookings] notification failed:", err);
    }

    return NextResponse.json({ ok: true, ...booking });
}
