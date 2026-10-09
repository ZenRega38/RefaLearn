"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

/**
 * Accounts made with "Daftar dengan Google" have no phone number yet (Google
 * doesn't share it). Ask for one so the tutor can reach the student on WA.
 */
export function PhoneReminder() {
  const pathname = usePathname();
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let alive = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("profiles").select("phone").eq("id", user.id).single();
      if (alive) setMissing(!data?.phone?.trim());
    })();
    return () => { alive = false; };
  }, [pathname]);

  if (!missing || pathname.startsWith("/dashboard/profile")) return null;

  return (
    <div className="container-main pt-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-[var(--radius-card)] border border-[var(--color-accent-yellow)] bg-[var(--color-accent-yellow)]/15 px-4 py-3 font-[var(--font-inter)] text-sm text-[var(--color-ink)]">
        <Phone className="w-4 h-4 text-[var(--color-warning-amber)] shrink-0" />
        <p className="flex-1">Lengkapi nomor WhatsApp Anda agar tutor bisa menghubungi Anda tentang jadwal dan pembayaran.</p>
        <Link href="/dashboard/profile" className="font-bold text-[var(--color-brand-blue)] hover:underline shrink-0">
          Lengkapi profil
        </Link>
      </div>
    </div>
  );
}
