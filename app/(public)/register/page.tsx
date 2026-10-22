"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { safeNextPath } from "@/lib/redirect";
import { GoogleButton, OrDivider } from "@/components/auth/GoogleButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";

import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SketchBox } from "@/components/sketch/SketchBox";
import { Mail, Lock, User, Phone } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { useTr } from "@/components/i18n/LangProvider";
import type { Tr } from "@/lib/i18n";

const registerSchema = (tr: Tr) =>
  z.object({
    fullName: z.string().min(2, { message: tr("Nama lengkap wajib diisi", "Full name is required") }),
    phone: z.string().min(9, { message: tr("Nomor telepon/WA tidak valid", "Invalid phone/WhatsApp number") }),
    email: z.string().email({ message: tr("Format email tidak valid", "Invalid email format") }),
    password: z.string().min(8, { message: tr("Password minimal 8 karakter", "Password must be at least 8 characters") }),
    confirmPassword: z.string().min(1, { message: tr("Konfirmasi password wajib diisi", "Please confirm your password") }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: tr("Password dan konfirmasi password tidak sama", "Passwords don't match"),
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<ReturnType<typeof registerSchema>>;

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}

function RegisterForm() {
  const searchParams = useSearchParams();
  const tr = useTr();
  const [supabase] = useState(() => createClient());
  const [error, setError] = useState<string | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(useMemo(() => registerSchema(tr), [tr])),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setError(null);

    try {
      if (!captchaToken) {
        throw new Error(tr("Mohon selesaikan verifikasi captcha terlebih dahulu.", "Please complete the captcha first."));
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          // The role is always 'student' — the signup trigger ignores any
          // role sent from the client.
          data: {
            full_name: data.fullName.trim(),
            phone: data.phone.trim(),
          },
          captchaToken,
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNextPath(searchParams.get('next'), '/dashboard'))}`,
        }
      });

      if (authError) {
        throw new Error(authError.message);
      }

      // With "Confirm email" enabled in Supabase, signUp returns no session
      // until the user clicks the link in their inbox.
      if (!authData.session) {
        setPendingEmail(data.email);
        return;
      }

      window.location.assign(safeNextPath(searchParams.get('next'), '/dashboard'));

    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      setError(
        message === "User already registered"
          ? tr("Email ini sudah terdaftar. Silakan masuk atau gunakan Lupa Password.", "This email is already registered. Please log in or use Forgot Password.")
          : message || tr("Gagal mendaftar. Silakan coba lagi.", "Sign-up failed. Please try again.")
      );
    }
  };

  return (
    <PaperBackground variant="dots">
      <div className="min-h-[calc(100vh-144px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md animate-fade-in-up">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)] mb-2">
              {tr("Mulai Perjalananmu", "Start Your Journey")}
            </h1>
            <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">
              {tr("Buat akun", "Create your")} <SketchBox color="var(--color-accent-yellow)">Refa Learn</SketchBox> {tr("sekarang", "account")}
            </p>
          </div>

          <Card variant="sketch" className="p-8">
            {pendingEmail ? (
              <div className="text-center space-y-4 font-[var(--font-inter)]">
                <Mail className="w-12 h-12 mx-auto text-[var(--color-brand-blue)]" />
                <h2 className="text-xl font-bold text-[var(--color-ink)]">{tr("Cek Email Anda", "Check Your Email")}</h2>
                <p className="text-sm text-[var(--color-ink-soft)]">
                  {tr("Kami mengirim link konfirmasi ke", "We've sent a confirmation link to")} <strong>{pendingEmail}</strong>.{" "}
                  {tr(
                    "Klik link tersebut untuk mengaktifkan akun, lalu Anda akan otomatis masuk.",
                    "Click it to activate your account and you'll be logged in automatically."
                  )}
                </p>
                <Link href="/login" className="text-sm text-[var(--color-brand-blue)] font-bold hover:underline">
                  {tr("Kembali ke halaman masuk", "Back to log in")}
                </Link>
              </div>
            ) : (
            <>
            {error && (
              <div className="bg-[var(--color-danger-red)]/10 border border-[var(--color-danger-red)] text-[var(--color-danger-red)] text-sm px-4 py-3 rounded-[var(--radius-sketch)] mb-6 font-[var(--font-inter)]">
                {error}
              </div>
            )}

            <GoogleButton label={tr("Daftar dengan Google", "Sign up with Google")} next={searchParams.get("next")} />
            <p className="mt-2 text-[11px] text-center text-[var(--color-ink-soft)] font-[var(--font-inter)]">
              {tr("Dengan mendaftar, Anda menyetujui", "By signing up, you agree to the")}{" "}
              <Link href="/privacy" className="underline">{tr("Kebijakan Privasi", "Privacy Policy")}</Link>.
            </p>
            <OrDivider text={tr("atau daftar dengan email", "or sign up with email")} />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                {tr(
                  "Untuk siswa di bawah umur, sebaiknya akun dibuat oleh atau bersama orang tua/wali.",
                  "For students under 18, the account should be created by or together with a parent/guardian."
                )}{" "}
                {tr("Data Anda diproses sesuai", "Your data is processed according to the")}{" "}
                <Link href="/privacy" className="underline">{tr("Kebijakan Privasi", "Privacy Policy")}</Link>.
              </p>
              <Input
                label={tr("Nama Lengkap", "Full Name")}
                type="text"
                placeholder="Budi Santoso"
                icon={<User className="w-4 h-4" />}
                {...register("fullName")}
                error={errors.fullName?.message}
              />

              <Input
                label={tr("Nomor WhatsApp", "WhatsApp Number")}
                type="tel"
                placeholder="0812xxxxxx"
                icon={<Phone className="w-4 h-4" />}
                {...register("phone")}
                error={errors.phone?.message}
              />

              <Input
                label="Email"
                type="email"
                placeholder={tr("email@contoh.com", "email@example.com")}
                icon={<Mail className="w-4 h-4" />}
                {...register("email")}
                error={errors.email?.message}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                {...register("password")}
                error={errors.password?.message}
              />

              <Input
                label={tr("Konfirmasi Password", "Confirm Password")}
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
              />

              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={(token) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken(null)}
                className="flex justify-center"
              />

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full text-base"
                  isLoading={isSubmitting}
                  disabled={!captchaToken}
                >
                  {tr("Daftar", "Sign up")}
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-dashed border-[var(--color-line)] text-center text-sm font-[var(--font-inter)] text-[var(--color-ink-soft)]">
              {tr("Sudah punya akun?", "Already have an account?")}{" "}
              <Link href={`/login${searchParams.get('next') ? `?next=${encodeURIComponent(searchParams.get('next')!)}` : ''}`} className="text-[var(--color-brand-blue)] font-bold hover:underline">
                {tr("Masuk di sini", "Log in here")}
              </Link>
            </div>
            </>
            )}
          </Card>

        </div>
      </div>
    </PaperBackground>
  );
}
