import { NextRequest, NextResponse } from "next/server";
import { errorMessage, jsonError, readJson, requireAdminUser } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { previewPlan } from "@/lib/schedule-offers-server";
import { patternsOf, planProblems, planSummary, type Repeat, type SchedulePlan } from "@/lib/schedule-plan";
import { PROFILE_COMPLETION_COLUMNS, missingProfileFields, type ProfileCompletion } from "@/lib/profile";
import { todayStr } from "@/lib/time";
import { formatDateStr, hhmm } from "@/lib/format";
import { getUserEmail, sendScheduleOfferEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

const REPEATS: Repeat[] = ["none", "daily", "weekly", "monthly"];

/** Only the fields a plan has, with sane types, from an untrusted body. */
function parsePlan(raw: unknown): SchedulePlan | null {
  if (!raw || typeof raw !== "object") return null;
  const p = raw as Record<string, unknown>;
  const repeat = REPEATS.includes(p.repeat as Repeat) ? (p.repeat as Repeat) : null;
  if (!repeat || typeof p.startDate !== "string") return null;
  const dayTimes: SchedulePlan["dayTimes"] = {};
  if (p.dayTimes && typeof p.dayTimes === "object") {
    for (const [k, v] of Object.entries(p.dayTimes as Record<string, unknown>)) {
      const d = Number(k);
      if (Number.isInteger(d) && d >= 0 && d <= 6 && typeof v === "string" && v) dayTimes[d] = v;
    }
  }
  return {
    startDate: p.startDate,
    repeat,
    dayTimes: repeat === "daily" || repeat === "weekly" ? dayTimes : {},
    time: typeof p.time === "string" ? p.time : "",
    endDate: repeat !== "none" && typeof p.endDate === "string" && p.endDate ? p.endDate : null,
  };
}

/**
 * POST { studentId, plan, note?, checkOnly? }
 * checkOnly → the first batch with prices and clashes, plus what the
 * student's profile still lacks. Otherwise saves the offer (clashing dates
 * left out) and emails the student to accept it.
 */
export async function POST(request: NextRequest) {
  const auth = await requireAdminUser();
  if (!auth.ok) return jsonError(auth.error, auth.status);

  const body = await readJson<{ studentId?: string; plan?: unknown; note?: string; checkOnly?: boolean }>(request);
  const plan = parsePlan(body?.plan);
  if (!body?.studentId || !plan) return jsonError("Siswa dan jadwal wajib diisi.");
  const problems = planProblems(plan, todayStr());
  if (problems.length > 0) return NextResponse.json({ error: problems[0], problems }, { status: 400 });

  const admin = createAdminClient();
  const { data: student } = await admin
    .from("profiles")
    .select(`id, role, ${PROFILE_COMPLETION_COLUMNS}`)
    .eq("id", body.studentId)
    .maybeSingle();
  if (!student || student.role !== "student") return jsonError("Siswa tidak ditemukan.", 404);
  const studentProfile = student as unknown as ProfileCompletion & { id: string };

  let preview;
  try {
    preview = await previewPlan(admin, plan);
  } catch (err) {
    return jsonError(errorMessage(err), 500);
  }
  if (preview.tooMany) return jsonError("Terlalu banyak sesi sekaligus. Persempit jadwalnya atau pilih tanggal akhir lebih dekat.");
  const missingProfile = missingProfileFields(studentProfile, todayStr());
  const summary = planSummary(plan);

  if (body.checkOnly) {
    return NextResponse.json({ summary, until: preview.until, sessions: preview.sessions, missingProfile });
  }

  const usable = preview.sessions.filter((s) => !s.clash).map((s) => ({
    date: s.date,
    start_time: s.start_time,
    end_time: s.end_time,
    day_type: s.day_type,
    price: s.price,
    pattern_key: s.pattern_key,
  }));
  if (usable.length === 0) return jsonError("Semua tanggal bentrok atau libur. Ubah jadwalnya dulu.", 409);
  const note = (body.note || "").trim().slice(0, 1000) || null;

  const { data: offer, error } = await admin
    .from("schedule_offers")
    .insert({
      student_id: studentProfile.id,
      created_by: auth.user.id,
      plan,
      patterns: patternsOf(plan),
      sessions: usable,
      batch_until: preview.until,
      note,
    })
    .select("id")
    .single();
  if (error) return jsonError(errorMessage(error), 500);

  try {
    const email = await getUserEmail(studentProfile.id);
    if (email) {
      await sendScheduleOfferEmail(email, {
        studentName: studentProfile.full_name || "Siswa",
        summary,
        sessions: usable.map((s) => ({ date: formatDateStr(s.date, "EEEE, dd MMMM yyyy"), time: hhmm(s.start_time) })),
        total: usable.length,
        ongoing: plan.repeat !== "none" && !plan.endDate,
        note,
      });
    }
  } catch (err) {
    console.error("[schedule-offers] email failed:", err);
  }

  return NextResponse.json({ ok: true, id: offer.id, created: usable.length, skipped: preview.sessions.length - usable.length });
}
