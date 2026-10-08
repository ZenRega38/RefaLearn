"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { UserCircle, Phone, Mail, Lock, User } from "lucide-react";

const errorText = (err: unknown) => (err instanceof Error ? err.message : "Terjadi kesalahan.");

export default function StudentProfilePage() {
  const [supabase] = useState(() => createClient());
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
      setEmail(user.email || "");
      const { data } = await supabase.from("profiles").select("full_name, phone").eq("id", user.id).single();
      setFullName(data?.full_name || "");
      setPhone(data?.phone || "");
      setLoading(false);
    };
    load();
  }, [supabase]);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    if (fullName.trim().length < 2) {
      setProfileMsg("Nama lengkap wajib diisi.");
      return;
    }
    setSavingProfile(true);
    setProfileMsg(null);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName.trim(), phone: phone.trim() || null })
      .eq("id", userId);
    setSavingProfile(false);
    setProfileMsg(error ? `Gagal menyimpan: ${error.message}` : "Profil tersimpan.");
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setPasswordMsg({ ok: false, text: "Password minimal 8 karakter." });
      return;
    }
    if (password !== confirmPassword) {
      setPasswordMsg({ ok: false, text: "Konfirmasi password tidak sama." });
      return;
    }
    setSavingPassword(true);
    setPasswordMsg(null);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setPassword("");
      setConfirmPassword("");
      setPasswordMsg({ ok: true, text: "Password berhasil diganti." });
    } catch (err) {
      setPasswordMsg({ ok: false, text: errorText(err) });
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <PaperBackground className="pt-24 pb-20 min-h-screen">
      <div className="container-main max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-ink)] flex items-center gap-2">
          <UserCircle className="w-8 h-8 text-[var(--color-brand-blue)]" /> Profil Saya
        </h1>

        <Card variant="sketch" className="space-y-5">
          <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] border-b-2 border-dashed border-[var(--color-line)] pb-2 inline-block">
            Data Diri
          </h2>
          {loading ? (
            <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">Memuat...</p>
          ) : (
            <form onSubmit={saveProfile} className="space-y-4">
              <Input label="Email" value={email} disabled icon={<Mail className="w-4 h-4" />} helperText="Email login tidak dapat diubah dari sini." />
              <Input
                label="Nama Lengkap"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                icon={<User className="w-4 h-4" />}
                helperText="Nama ini dipakai sebagai tanda tangan elektronik saat menyetujui perjanjian kelas."
                required
              />
              <Input
                label="Nomor WhatsApp"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                icon={<Phone className="w-4 h-4" />}
              />
              {profileMsg && <p className="text-sm font-[var(--font-inter)] text-[var(--color-ink-soft)]">{profileMsg}</p>}
              <div className="flex justify-end">
                <Button type="submit" isLoading={savingProfile}>Simpan Profil</Button>
              </div>
            </form>
          )}
        </Card>

        <Card variant="sketch" className="space-y-5">
          <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] border-b-2 border-dashed border-[var(--color-line)] pb-2 inline-block">
            Ganti Password
          </h2>
          <form onSubmit={savePassword} className="space-y-4">
            <Input
              label="Password Baru"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              autoComplete="new-password"
            />
            <Input
              label="Konfirmasi Password Baru"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              autoComplete="new-password"
            />
            {passwordMsg && (
              <p className={`text-sm font-[var(--font-inter)] ${passwordMsg.ok ? "text-[var(--color-success-green)]" : "text-[var(--color-danger-red)]"}`}>
                {passwordMsg.text}
              </p>
            )}
            <div className="flex justify-end">
              <Button type="submit" isLoading={savingPassword}>Ganti Password</Button>
            </div>
          </form>
        </Card>
      </div>
    </PaperBackground>
  );
}
