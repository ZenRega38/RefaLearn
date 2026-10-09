"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { safeNextPath } from "@/lib/redirect";

/** Google "G" mark in its official colours. */
function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="w-5 h-5 shrink-0" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

/**
 * One-tap sign in / sign up with Google (Supabase OAuth). New Google users get
 * a student profile from the same signup trigger as email accounts; the name
 * comes from Google, the phone number can be added later in the profile.
 */
export function GoogleButton({ label = "Lanjutkan dengan Google", next }: { label?: string; next?: string | null }) {
  const [supabase] = useState(() => createClient());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {
    setError(null);
    setLoading(true);
    const target = safeNextPath(next ?? null, "/dashboard");
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(target)}`,
        queryParams: { prompt: "select_account" },
      },
    });
    // On success the browser is already leaving for Google.
    if (oauthError) {
      setLoading(false);
      setError(
        oauthError.message.toLowerCase().includes("provider is not enabled")
          ? "Masuk dengan Google belum diaktifkan. Silakan gunakan email dan password."
          : "Gagal terhubung ke Google. Silakan coba lagi."
      );
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={signIn}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-[var(--radius-sketch)] border-2 border-[var(--color-line)] bg-white font-[var(--font-inter)] font-semibold text-[var(--color-ink)] hover:border-[var(--color-brand-blue)]/60 hover:shadow-[var(--shadow-sketch)] transition-all disabled:opacity-60 disabled:cursor-wait"
      >
        <GoogleMark />
        {loading ? "Menghubungkan ke Google…" : label}
      </button>
      {error && <p className="text-xs text-center text-[var(--color-danger-red)] font-[var(--font-inter)]">{error}</p>}
    </div>
  );
}

/** "atau" divider between the Google button and the email form. */
export function OrDivider({ text = "atau" }: { text?: string }) {
  return (
    <div className="flex items-center gap-3 my-6 text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">
      <span className="flex-1 border-t border-dashed border-[var(--color-line)]" />
      {text}
      <span className="flex-1 border-t border-dashed border-[var(--color-line)]" />
    </div>
  );
}
