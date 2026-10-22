import { NextRequest, NextResponse } from "next/server";
import { clientIp, errorMessage, isSlotConflict, jsonError, readJson, requireUser } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkSignature, currentContractId } from "@/lib/contract-signing";
import { PROFILE_COMPLETION_COLUMNS, missingProfileFields, type ProfileCompletion } from "@/lib/profile";
import { requestLang, translator } from "@/lib/i18n";
import { planSummary, type SchedulePlan } from "@/lib/schedule-plan";
import { todayStr } from "@/lib/time";
import { getAdminEmails, sendAdminScheduleResponseEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

type Body = {
  action?: "accept" | "decline";
  contractId?: string;
  typedName?: string;
  signerRole?: string;
  guardianName?: string;
  reason?: string;
};

/**
 * POST — the student answers a schedule from the admin.
 * accept: signs the current contract (same rules as booking) and the
 * sessions are created, already accepted. decline: closes the offer.
 */
export async function POST(request: NextRequest, { params }: Params) {
  const lang = requestLang(request);
  const tr = translator(lang);
  const auth = await requireUser("student");
  if (!auth.ok) return jsonError(auth.error, auth.status);
  const { user, profile } = auth;
  const { id } = await params;
  const body = await readJson<Body>(request);

  const admin = createAdminClient();
  const { data: offer } = await admin.from("schedule_offers").select("id, student_id, status, plan").eq("id", id).maybeSingle();
  if (!offer || offer.student_id !== user.id) return jsonError(tr("Jadwal tidak ditemukan.", "Schedule not found."), 404);
  if (offer.status !== "pending") return jsonError(tr("Jadwal ini sudah tidak menunggu persetujuan.", "This schedule is no longer waiting for approval."), 409);
  const summary = planSummary(offer.plan as SchedulePlan);
  const studentName = (profile.full_name || "Siswa").trim();

  const notifyAdmins = async (accepted: boolean, reason?: string | null) => {
    try {
      await sendAdminScheduleResponseEmail(await getAdminEmails(), { studentName, accepted, summary, reason });
    } catch (err) {
      console.error("[schedule-offers] admin email failed:", err);
    }
  };

  if (body?.action === "decline") {
    const reason = (body.reason || "").trim().slice(0, 500) || null;
    const { error } = await admin
      .from("schedule_offers")
      .update({ status: "declined", decline_reason: reason, responded_at: new Date().toISOString() })
      .eq("id", id)
      .eq("status", "pending");
    if (error) return jsonError(errorMessage(error), 500);
    await notifyAdmins(false, reason);
    return NextResponse.json({ ok: true });
  }

  if (body?.action !== "accept") return jsonError(tr("Aksi tidak dikenal.", "Unknown action."));

  // Same gate as booking: the admin verifies students from their profile.
  const { data: completion } = await admin.from("profiles").select(PROFILE_COMPLETION_COLUMNS).eq("id", user.id).single();
  const studentProfile = completion as ProfileCompletion | null;
  const missing = missingProfileFields(studentProfile, todayStr(), lang);
  if (missing.length > 0) {
    return NextResponse.json(
      {
        error: tr(
          `Lengkapi profil terlebih dahulu. Data yang masih kurang: ${missing.join(", ")}.`,
          `Please complete your profile first. Still missing: ${missing.join(", ")}.`
        ),
        code: "PROFILE_INCOMPLETE",
        missing,
      },
      { status: 403 }
    );
  }

  const contractId = await currentContractId(admin);
  if (!contractId || contractId !== body.contractId) {
    return jsonError(tr("Versi perjanjian sudah berubah. Silakan muat ulang halaman dan baca perjanjian terbaru.", "The agreement has been updated. Please reload the page and read the latest version."), 409);
  }
  const signature = checkSignature(body, studentName, studentProfile, tr);
  if (!signature.ok) return jsonError(signature.error);

  const { error } = await admin.rpc("accept_schedule_offer", {
    p_offer: id,
    p_contract: contractId,
    p_typed_name: signature.typedName,
    p_signer_role: signature.signerRole,
    p_guardian_name: signature.guardianName,
    p_ip: clientIp(request),
    p_user_agent: request.headers.get("user-agent"),
  });
  if (error) {
    if (isSlotConflict(error)) {
      return jsonError(tr("Sebagian jadwal ini sudah terisi. Silakan hubungi admin untuk menyusun ulang jadwalnya.", "Some of these slots are already taken. Please contact the admin to rearrange the schedule."), 409);
    }
    return jsonError(errorMessage(error, tr("Gagal menyetujui jadwal.", "Couldn't accept the schedule.")), 500);
  }
  await notifyAdmins(true);
  return NextResponse.json({ ok: true });
}
