"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { safeNextPath } from "@/lib/redirect";
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

const registerSchema = z.object({
  fullName: z.string().min(2, { message: "Nama lengkap wajib diisi" }),
  phone: z.string().min(9, { message: "Nomor telepon/WA tidak valid" }),
  email: z.string().email({ message: "Format email tidak valid" }),
  password: z.string().min(8, { message: "Password minimal 8 karakter" }),
  confirmPassword: z.string().min(1, { message: "Konfirmasi password wajib diisi" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password dan konfirmasi password tidak sama",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}

function RegisterForm() {
  const searchParams = useSearchParams();
  const [supabase] = useState(() => createClient());
  const [error, setError] = useState<string | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setError(null);

    try {
      if (!captchaToken) {
        throw new Error("Mohon selesaikan verifikasi captcha terlebih dahulu.");
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
          ? "Email ini sudah terdaftar. Silakan masuk atau gunakan Lupa Password."
          : message || "Gagal mendaftar. Silakan coba lagi."
      );
    }
  };

  return (
    <PaperBackground variant="dots">
      <div className="min-h-[calc(100vh-144px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md animate-fade-in-up">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)] mb-2">
              Mulai Perjalananmu
            </h1>
            <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">
              Buat akun <SketchBox color="var(--color-accent-yellow)">Refa Learn</SketchBox> sekarang
            </p>
          </div>

          <Card variant="sketch" className="p-8">
            {pendingEmail ? (
              <div className="text-center space-y-4 font-[var(--font-inter)]">
                <Mail className="w-12 h-12 mx-auto text-[var(--color-brand-blue)]" />
                <h2 className="text-xl font-bold text-[var(--color-ink)]">Cek Email Anda</h2>
                <p className="text-sm text-[var(--color-ink-soft)]">
                  Kami mengirim link konfirmasi ke <strong>{pendingEmail}</strong>. Klik link tersebut untuk mengaktifkan akun,
                  lalu Anda akan otomatis masuk.
                </p>
                <Link href="/login" className="text-sm text-[var(--color-brand-blue)] font-bold hover:underline">
                  Kembali ke halaman masuk
                </Link>
              </div>
            ) : (
            <>
            {error && (
              <div className="bg-[var(--color-danger-red)]/10 border border-[var(--color-danger-red)] text-[var(--color-danger-red)] text-sm px-4 py-3 rounded-[var(--radius-sketch)] mb-6 font-[var(--font-inter)]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                Untuk siswa di bawah umur, sebaiknya akun dibuat oleh atau bersama orang tua/wali.
                Data Anda diproses sesuai <Link href="/privacy" className="underline">Kebijakan Privasi</Link>.
              </p>
              <Input
                label="Nama Lengkap"
                type="text"
                placeholder="Budi Santoso"
                icon={<User className="w-4 h-4" />}
                {...register("fullName")}
                error={errors.fullName?.message}
              />

              <Input
                label="Nomor WhatsApp"
                type="tel"
                placeholder="0812xxxxxx"
                icon={<Phone className="w-4 h-4" />}
                {...register("phone")}
                error={errors.phone?.message}
              />

              <Input
                label="Email"
                type="email"
                placeholder="email@contoh.com"
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
                label="Konfirmasi Password"
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
                  Daftar
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-dashed border-[var(--color-line)] text-center text-sm font-[var(--font-inter)] text-[var(--color-ink-soft)]">
              Sudah punya akun?{" "}
              <Link href={`/login${searchParams.get('next') ? `?next=${encodeURIComponent(searchParams.get('next')!)}` : ''}`} className="text-[var(--color-brand-blue)] font-bold hover:underline">
                Masuk di sini
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
