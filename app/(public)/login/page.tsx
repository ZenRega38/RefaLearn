"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { safeNextPath } from "@/lib/redirect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import { Turnstile } from "@marsidev/react-turnstile";

import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SketchBox } from "@/components/sketch/SketchBox";
import { GoogleButton, OrDivider } from "@/components/auth/GoogleButton";
import { Mail, Lock } from "lucide-react";
import { useTr } from "@/components/i18n/LangProvider";
import type { Tr } from "@/lib/i18n";

const loginSchema = (tr: Tr) =>
  z.object({
    email: z.string().email({ message: tr("Format email tidak valid", "Invalid email format") }),
    password: z.string().min(6, { message: tr("Password minimal 6 karakter", "Password must be at least 6 characters") }),
  });

type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const tr = useTr();
  const [supabase] = useState(() => createClient());
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "link"
      ? tr("Link sudah kedaluwarsa atau tidak valid. Silakan coba lagi.", "This link has expired or is invalid. Please try again.")
      : searchParams.get("error") === "oauth"
        ? tr("Masuk dengan Google gagal atau dibatalkan. Silakan coba lagi.", "Google sign-in failed or was cancelled. Please try again.")
        : null
  );
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(useMemo(() => loginSchema(tr), [tr])),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);

    if (!captchaToken) {
      setError(tr("Mohon selesaikan verifikasi captcha terlebih dahulu.", "Please complete the captcha first."));
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
        options: { captchaToken },
      });

      if (authError) {
        throw new Error(authError.message);
      }

      // Check role for redirect
      const { data: profileData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user?.id)
        .single();

      const role = profileData?.role || 'student';
      const home = role === 'admin' ? '/admin' : '/dashboard';
      // Back to where they were going (e.g. /schedule), never off-site and
      // never into the other role's area.
      const next = safeNextPath(searchParams.get('next'), home);
      const allowed = role === 'admin' ? !next.startsWith('/dashboard') : !next.startsWith('/admin');

      // Force hard refresh to ensure middleware picks up the new session immediately
      window.location.assign(allowed ? next : home);

    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      setError(
        message === "Invalid login credentials"
          ? tr("Email atau password salah.", "Incorrect email or password.")
          : message === "Email not confirmed"
            ? tr(
                "Email Anda belum dikonfirmasi. Cek kotak masuk email Anda untuk link konfirmasi.",
                "Your email hasn't been confirmed yet. Check your inbox for the confirmation link."
              )
            : message || tr("Gagal masuk. Periksa kembali email dan password Anda.", "Couldn't log in. Please check your email and password.")
      );
    }
  };

  return (
    <PaperBackground>
      <div className="min-h-[calc(100vh-144px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md animate-fade-in-up">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)] mb-2">
              {tr("Selamat Datang Kembali", "Welcome Back")}
            </h1>
            <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">
              {tr("Masuk ke akun", "Log in to your")} <SketchBox color="var(--color-accent-coral)">Refa Learn</SketchBox> {tr("Anda", "account")}
            </p>
          </div>

          <Card variant="sketch" className="p-8">
            {error && (
              <div className="bg-[var(--color-danger-red)]/10 border border-[var(--color-danger-red)] text-[var(--color-danger-red)] text-sm px-4 py-3 rounded-[var(--radius-sketch)] mb-6 font-[var(--font-inter)]">
                {error}
              </div>
            )}

            <GoogleButton label={tr("Masuk dengan Google", "Log in with Google")} next={searchParams.get("next")} />
            <OrDivider text={tr("atau masuk dengan email", "or log in with email")} />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Email"
                type="email"
                placeholder={tr("email@contoh.com", "email@example.com")}
                icon={<Mail className="w-4 h-4" />}
                {...register("email")}
                error={errors.email?.message}
              />

              <div className="space-y-1">
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock className="w-4 h-4" />}
                  {...register("password")}
                  error={errors.password?.message}
                />
                <div className="text-right">
                  <Link href="/forgot-password" className="text-xs font-[var(--font-inter)] text-[var(--color-brand-blue)] hover:underline">
                    {tr("Lupa password?", "Forgot password?")}
                  </Link>
                </div>
              </div>

              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={(token) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken(null)}
                className="flex justify-center"
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full text-base"
                  isLoading={isSubmitting}
                  disabled={!captchaToken}
                >
                  {tr("Masuk", "Log in")}
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-dashed border-[var(--color-line)] text-center text-sm font-[var(--font-inter)] text-[var(--color-ink-soft)]">
              {tr("Belum punya akun?", "Don't have an account?")}{" "}
              <Link href={`/register${searchParams.get('next') ? `?next=${encodeURIComponent(searchParams.get('next')!)}` : ''}`} className="text-[var(--color-brand-blue)] font-bold hover:underline">
                {tr("Daftar sekarang", "Sign up now")}
              </Link>
            </div>
          </Card>

        </div>
      </div>
    </PaperBackground>
  );
}
