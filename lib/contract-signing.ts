import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { ADULT_AGE, needsGuardian, sameName, type ProfileCompletion } from "@/lib/profile";
import { todayStr } from "@/lib/time";

/** The contract version in force today (highest version already effective). */
export async function currentContractId(admin: SupabaseClient): Promise<string | null> {
  const { data } = await admin
    .from("contracts")
    .select("id")
    .lte("effective_date", todayStr())
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data?.id as string | undefined) ?? null;
}

export type SignatureInput = { typedName?: string; signerRole?: string; guardianName?: string };

/**
 * Checks a typed e-signature (UU ITE Pasal 11: the signer must be
 * identifiable). A student signs with their profile name; under 21 the
 * guardian named on the profile must sign instead. Shared by booking and by
 * accepting a schedule from the admin, so both follow the same rules.
 */
export function checkSignature(
  input: SignatureInput,
  profileName: string,
  profile: Pick<ProfileCompletion, "birth_date" | "guardian_name"> | null
): { ok: true; typedName: string; signerRole: "student" | "guardian"; guardianName: string | null } | { ok: false; error: string } {
  const typedName = (input.typedName || "").trim();
  const signerRole = input.signerRole === "guardian" ? "guardian" : "student";
  const guardianInput = (input.guardianName || "").trim();
  const name = profileName.trim();

  if (!typedName) return { ok: false, error: "Nama penanda tangan wajib diisi." };
  if (signerRole === "student" && typedName.toLowerCase() !== name.toLowerCase()) {
    return { ok: false, error: "Nama yang diketik harus sama dengan nama di profil Anda." };
  }
  if (signerRole === "guardian" && typedName.toLowerCase() === name.toLowerCase()) {
    return { ok: false, error: "Untuk persetujuan orang tua/wali, ketik nama orang tua/wali — bukan nama siswa." };
  }

  // Under 21 the contract must be signed by the guardian named on the profile,
  // even though the signature is typed on the student's own account.
  const minor = needsGuardian(profile?.birth_date, todayStr());
  const profileGuardian = (profile?.guardian_name || "").trim();
  if (minor) {
    if (signerRole !== "guardian") {
      return { ok: false, error: `Siswa berusia di bawah ${ADULT_AGE} tahun. Perjanjian wajib disetujui oleh orang tua/wali.` };
    }
    if (!sameName(typedName, profileGuardian)) {
      return { ok: false, error: `Nama penanda tangan harus sama dengan nama orang tua/wali di profil: ${profileGuardian}.` };
    }
  }

  return {
    ok: true,
    typedName,
    signerRole,
    guardianName: signerRole === "guardian" ? (minor ? profileGuardian : guardianInput || typedName) : null,
  };
}
