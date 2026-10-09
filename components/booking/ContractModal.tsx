"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { X, ShieldCheck, Users } from "lucide-react";
import { ADULT_AGE, sameName } from "@/lib/profile";

export type ContractSignature = {
  typedName: string;
  signerRole: "student" | "guardian";
};

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: (signature: ContractSignature) => void;
  contractHtml: string;
  expectedName: string;
  /** Student is under 21: only their parent/guardian may sign. */
  requireGuardian?: boolean;
  /** Guardian name from the student's profile; the guardian must type exactly this. */
  guardianName?: string;
}

export function ContractModal({ isOpen, onClose, onAccept, contractHtml, expectedName, requireGuardian = false, guardianName = "" }: ContractModalProps) {
  const [typedName, setTypedName] = useState("");
  const [chosenRole, setChosenRole] = useState<"student" | "guardian">("student");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  // Under 21 the guardian always signs, whatever was picked before.
  const signerRole = requireGuardian ? "guardian" : chosenRole;
  const setSignerRole = setChosenRole;

  const expected = expectedName.trim().toLowerCase();
  const typed = typedName.trim().toLowerCase();

  // A student signs with exactly their profile name. A parent/guardian signs
  // with their own name: for an under-21 student it must match the guardian
  // on the profile, otherwise it just must not be the student's name again.
  const nameValid =
    typed.length >= 2 &&
    (signerRole === "student"
      ? !!expected && typed === expected
      : requireGuardian
        ? sameName(typedName, guardianName)
        : typed !== expected);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError("Centang pernyataan persetujuan terlebih dahulu.");
      return;
    }
    if (!nameValid) {
      setError(
        signerRole === "student"
          ? "Nama yang diketik harus persis sama dengan nama di profil Anda."
          : requireGuardian
            ? `Ketik nama orang tua/wali persis seperti di profil: ${guardianName}.`
            : "Ketik nama lengkap orang tua/wali (bukan nama siswa)."
      );
      return;
    }
    setError("");
    onAccept({ typedName: typedName.trim(), signerRole });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">

      <div className="bg-[var(--color-paper-bg)] w-full max-w-2xl max-h-[90vh] rounded-[var(--radius-card)] border-2 border-[var(--color-line)] shadow-2xl flex flex-col relative overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-line)] bg-white">
          <h2 className="text-2xl font-[var(--font-kalam)] text-[var(--color-brand-blue)] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6" /> Persetujuan Kelas
          </h2>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="p-2 text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] hover:bg-[var(--color-paper-bg-alt)] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 font-[var(--font-inter)] text-[var(--color-ink)]">
          <div className="prose-content text-sm" dangerouslySetInnerHTML={{ __html: contractHtml }} />
        </div>

        {/* Footer & Signature */}
        <div className="p-6 bg-[var(--color-paper-bg-alt)] border-t border-dashed border-[var(--color-line)] space-y-4 font-[var(--font-inter)]">
          {requireGuardian ? (
            <div className="flex items-start gap-2 rounded-[var(--radius-card)] border border-[var(--color-warning-amber)]/50 bg-[var(--color-warning-amber)]/10 p-3 text-sm text-[var(--color-ink)]">
              <Users className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-warning-amber)]" />
              <p>
                Karena usia siswa di bawah {ADULT_AGE} tahun, perjanjian ini wajib dibaca dan disetujui oleh
                orang tua/wali <strong>{guardianName}</strong>. Mohon serahkan perangkat ini kepada beliau untuk
                mencentang persetujuan dan mengetik namanya sendiri.
              </p>
            </div>
          ) : (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={signerRole === "student"}
                onChange={() => { setSignerRole("student"); setError(""); }}
              />
              Saya siswa (berusia 21 tahun ke atas / sudah menikah)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={signerRole === "guardian"}
                onChange={() => { setSignerRole("guardian"); setError(""); }}
              />
              Saya orang tua/wali siswa
            </label>
          </div>
          )}

          <label className="flex items-start gap-2 text-sm text-[var(--color-ink)] cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => { setAgreed(e.target.checked); setError(""); }}
              className="mt-1"
            />
            <span>
              {requireGuardian ? "Saya, orang tua/wali siswa, telah" : "Saya telah"} membaca, memahami, dan menyetujui seluruh isi perjanjian di atas, dan saya cakap
              secara hukum untuk menyetujuinya{signerRole === "guardian" ? " atas nama siswa" : ""}.
            </span>
          </label>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex-1 w-full">
              <Input
                placeholder={signerRole === "student" ? `Ketik: ${expectedName}` : requireGuardian ? `Ketik: ${guardianName}` : "Ketik nama lengkap orang tua/wali"}
                value={typedName}
                onChange={(e) => {
                  setTypedName(e.target.value);
                  setError("");
                }}
                error={error}
                className="text-base !py-2"
              />
            </div>
            <Button
              type="submit"
              disabled={!agreed || !nameValid}
              className="w-full sm:w-auto"
            >
              Saya Setuju & Lanjutkan
            </Button>
          </form>
        </div>

      </div>

    </div>
  );
}
