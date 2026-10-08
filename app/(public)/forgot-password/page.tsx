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

export default function ForgotPasswordPage() {
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
      setError("Format email tidak valid");
      return;
    }
    if (!captchaToken) {
      setError("Mohon selesaikan verifikasi captcha terlebih dahulu.");
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
              Lupa Password
            </h1>
            <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">
              Atur ulang password akun <SketchBox color="var(--color-accent-coral)">Refa Learn</SketchBox> Anda
            </p>
          </div>

          <Card variant="sketch" className="p-8">
            {sent ? (
              <div className="text-center space-y-4 font-[var(--font-inter)]">
                <Mail className="w-12 h-12 mx-auto text-[var(--color-brand-blue)]" />
                <p className="text-sm text-[var(--color-ink)]">
                  Jika email <strong>{email}</strong> terdaftar, kami telah mengirim link untuk mengatur ulang password.
                  Cek kotak masuk (dan folder spam) Anda.
                </p>
                <Link href="/login" className="text-sm text-[var(--color-brand-blue)] font-bold hover:underline">
                  Kembali ke halaman masuk
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
                  placeholder="email@contoh.com"
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
                  Kirim Link Reset
                </Button>
                <div className="text-center text-sm font-[var(--font-inter)]">
                  <Link href="/login" className="text-[var(--color-brand-blue)] font-bold hover:underline">
                    Kembali ke halaman masuk
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
