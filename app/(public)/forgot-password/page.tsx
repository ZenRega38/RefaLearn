"use client";

import { useState } from "react";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SketchBox } from "@/components/sketch/SketchBox";
import { Mail } from "lucide-react";
import { useTr } from "@/components/i18n/LangProvider";

export default function ForgotPasswordPage() {
  const tr = useTr();
  const [supabase] = useState(() => createClient());
  const [email, setEmail] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError(tr("Format email tidak valid", "Invalid email format"));
      return;
    }
    if (!captchaToken) {
      setError(tr("Mohon selesaikan verifikasi captcha terlebih dahulu.", "Please complete the captcha first."));
      return;
    }

    setSubmitting(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      captchaToken,
    });
    setSubmitting(false);

    // Same message whether or not the email exists, so this form can't be
    // used to find out who has an account.
    if (resetError && !/not found/i.test(resetError.message)) {
      setError(resetError.message);
      return;
    }
    setSent(true);
  };

  return (
    <PaperBackground>
      <div className="min-h-[calc(100vh-144px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)] mb-2">
              {tr("Lupa Password", "Forgot Password")}
            </h1>
            <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">
              {tr("Atur ulang password akun", "Reset the password for your")} <SketchBox color="var(--color-accent-coral)">Refa Learn</SketchBox> {tr("Anda", "account")}
            </p>
          </div>

          <Card variant="sketch" className="p-8">
            {sent ? (
              <div className="text-center space-y-4 font-[var(--font-inter)]">
                <Mail className="w-12 h-12 mx-auto text-[var(--color-brand-blue)]" />
                <p className="text-sm text-[var(--color-ink)]">
                  {tr("Jika email", "If")} <strong>{email}</strong>{" "}
                  {tr(
                    "terdaftar, kami telah mengirim link untuk mengatur ulang password. Cek kotak masuk (dan folder spam) Anda.",
                    "is registered, we've sent a link to reset your password. Check your inbox (and your spam folder)."
                  )}
                </p>
                <Link href="/login" className="text-sm text-[var(--color-brand-blue)] font-bold hover:underline">
                  {tr("Kembali ke halaman masuk", "Back to log in")}
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-[var(--color-danger-red)]/10 border border-[var(--color-danger-red)] text-[var(--color-danger-red)] text-sm px-4 py-3 rounded-[var(--radius-sketch)] font-[var(--font-inter)]">
                    {error}
                  </div>
                )}
                <Input
                  label="Email"
                  type="email"
                  placeholder={tr("email@contoh.com", "email@example.com")}
                  icon={<Mail className="w-4 h-4" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  onSuccess={(token) => setCaptchaToken(token)}
                  onExpire={() => setCaptchaToken(null)}
                  className="flex justify-center"
                />
                <Button type="submit" className="w-full text-base" isLoading={submitting} disabled={!captchaToken}>
                  {tr("Kirim Link Reset", "Send Reset Link")}
                </Button>
                <div className="text-center text-sm font-[var(--font-inter)]">
                  <Link href="/login" className="text-[var(--color-brand-blue)] font-bold hover:underline">
                    {tr("Kembali ke halaman masuk", "Back to log in")}
                  </Link>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </PaperBackground>
  );
}
