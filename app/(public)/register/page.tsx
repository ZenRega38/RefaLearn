"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

const registerSchema = z.object({
  fullName: z.string().min(2, { message: "Nama lengkap wajib diisi" }),
  phone: z.string().min(9, { message: "Nomor telepon/WA tidak valid" }),
  email: z.string().email({ message: "Format email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [error, setError] = useState<string | null>(null);

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
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            phone: data.phone,
            role: 'student', // Default role
          }
        }
      });

      if (authError) {
        throw new Error(authError.message);
      }

      // Automatically logged in after sign up
      window.location.href = '/dashboard';
      
    } catch (err: any) {
      setError(err.message || "Gagal mendaftar. Silakan coba lagi.");
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
            {error && (
              <div className="bg-[var(--color-danger-red)]/10 border border-[var(--color-danger-red)] text-[var(--color-danger-red)] text-sm px-4 py-3 rounded-[var(--radius-sketch)] mb-6 font-[var(--font-inter)]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full text-base" 
                  isLoading={isSubmitting}
                >
                  Daftar
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-dashed border-[var(--color-line)] text-center text-sm font-[var(--font-inter)] text-[var(--color-ink-soft)]">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-[var(--color-brand-blue)] font-bold hover:underline">
                Masuk di sini
              </Link>
            </div>
          </Card>
          
        </div>
      </div>
    </PaperBackground>
  );
}
