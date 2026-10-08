"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Lock } from "lucide-react";

/**
 * Reached from the password-recovery email via /auth/callback, which has
 * already signed the user in with a recovery session.
 */
export default function ResetPasswordPage() {
  const [supabase] = useState(() => createClient());
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }
    if (password !== confirm) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    setSubmitting(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setSubmitting(false);
      setError(updateError.message);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    const { data: profile } = user
      ? await supabase.from("profiles").select("role").eq("id", user.id).single()
      : { data: null };
    window.location.assign(profile?.role === "admin" ? "/admin" : "/dashboard");
  };

  return (
    <PaperBackground>
      <div className="min-h-[calc(100vh-144px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)] mb-2">
              Atur Password Baru
            </h1>
          </div>

          <Card variant="sketch" className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-[var(--color-danger-red)]/10 border border-[var(--color-danger-red)] text-[var(--color-danger-red)] text-sm px-4 py-3 rounded-[var(--radius-sketch)] font-[var(--font-inter)]">
                  {error}
                </div>
              )}
              <Input
                label="Password Baru"
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              <Input
                label="Konfirmasi Password Baru"
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
              />
              <Button type="submit" className="w-full text-base" isLoading={submitting}>
                Simpan Password
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </PaperBackground>
  );
}
