"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { UserCircle, Phone, Mail, Lock, User, Calendar, Users, MapPin, LocateFixed, CheckCircle2, AlertCircle, ArrowRight, ExternalLink } from "lucide-react";
import { todayStr } from "@/lib/time";
import {
  ADULT_AGE,
  MIN_ADDRESS_LENGTH,
  PROFILE_COMPLETION_COLUMNS,
  ageOn,
  googleMapsUrl,
  isValidBirthDate,
  isValidCoordinate,
  missingProfileFields,
  needsGuardian,
  parseCoordinates,
  type ProfileCompletion,
} from "@/lib/profile";

const errorText = (err: unknown) => (err instanceof Error ? err.message : "Terjadi kesalahan.");

const round6 = (n: number) => Math.round(n * 1e6) / 1e6;

/** Only same-site paths are allowed as a post-save destination. */
const safeNext = (value: string | null) => (value && value.startsWith("/") && !value.startsWith("//") ? value : null);

const osmEmbedUrl = (lat: number, lng: number) => {
  const dLng = 0.004;
  const dLat = 0.0025;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${lng - dLng},${lat - dLat},${lng + dLng},${lat + dLat}&layer=mapnik&marker=${lat},${lng}`;
};

const geoErrorText = (err: GeolocationPositionError) => {
  if (err.code === err.PERMISSION_DENIED) return "Izin lokasi ditolak. Izinkan akses lokasi di browser, atau tempel koordinat/link Google Maps di bawah.";
  if (err.code === err.POSITION_UNAVAILABLE) return "Lokasi tidak bisa dideteksi. Pastikan GPS aktif, atau tempel koordinat/link Google Maps di bawah.";
  return "Pengambilan lokasi terlalu lama. Coba lagi, atau tempel koordinat/link Google Maps di bawah.";
};

export default function StudentProfilePage() {
  const [supabase] = useState(() => createClient());
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationMsg, setLocationMsg] = useState<string | null>(null);
  const [coordText, setCoordText] = useState("");
  const [savedProfile, setSavedProfile] = useState<ProfileCompletion | null>(null);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const today = todayStr();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      // Read ?next= without useSearchParams so the page needs no Suspense boundary.
      setNextPath(safeNext(new URLSearchParams(window.location.search).get("next")));
      if (!user) return;
      setUserId(user.id);
      setEmail(user.email || "");
      const { data } = await supabase.from("profiles").select(PROFILE_COMPLETION_COLUMNS).eq("id", user.id).single();
      const p = (data as ProfileCompletion | null) ?? null;
      setSavedProfile(p);
      setFullName(p?.full_name || "");
      setPhone(p?.phone || "");
      setBirthDate(p?.birth_date || "");
      setGuardianName(p?.guardian_name || "");
      setAddress(p?.address || "");
      setLatitude(p?.latitude ?? null);
      setLongitude(p?.longitude ?? null);
      setLoading(false);
    };
    load();
  }, [supabase]);

  const hasLocation = isValidCoordinate(latitude, longitude);
  const showGuardian = needsGuardian(birthDate, today);
  const age = isValidBirthDate(birthDate, today) ? ageOn(birthDate, today) : null;
  const missingSaved = missingProfileFields(savedProfile, today);
  const isComplete = !loading && missingSaved.length === 0;

  const useMyLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocationMsg("Browser ini tidak mendukung deteksi lokasi. Tempel koordinat atau link Google Maps di bawah.");
      return;
    }
    setLocating(true);
    setLocationMsg(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(round6(pos.coords.latitude));
        setLongitude(round6(pos.coords.longitude));
        setAccuracy(Math.round(pos.coords.accuracy));
        setLocating(false);
        setLocationMsg("Lokasi berhasil diambil. Cek peta di bawah, lalu klik Simpan Profil.");
      },
      (err) => {
        setLocating(false);
        setLocationMsg(geoErrorText(err));
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const applyCoordText = () => {
    const parsed = parseCoordinates(coordText);
    if (!parsed) {
      setLocationMsg("Format tidak dikenali. Contoh: 3.3005, 117.6331 atau link dari Google Maps.");
      return;
    }
    setLatitude(round6(parsed.latitude));
    setLongitude(round6(parsed.longitude));
    setAccuracy(null);
    setCoordText("");
    setLocationMsg("Koordinat dipakai. Cek peta di bawah, lalu klik Simpan Profil.");
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    if (fullName.trim().length < 2) {
      setProfileMsg({ ok: false, text: "Nama lengkap wajib diisi." });
      return;
    }
    if (birthDate && !isValidBirthDate(birthDate, today)) {
      setProfileMsg({ ok: false, text: "Tanggal lahir tidak valid." });
      return;
    }
    setSavingProfile(true);
    setProfileMsg(null);
    const update: ProfileCompletion = {
      full_name: fullName.trim(),
      phone: phone.trim() || null,
      birth_date: birthDate || null,
      // Only kept while it is required, so an adult profile carries no stale guardian.
      guardian_name: showGuardian ? guardianName.trim() || null : null,
      address: address.trim() || null,
      latitude: hasLocation ? latitude : null,
      longitude: hasLocation ? longitude : null,
    };
    const { error } = await supabase.from("profiles").update(update).eq("id", userId);
    setSavingProfile(false);
    if (error) {
      setProfileMsg({ ok: false, text: `Gagal menyimpan: ${error.message}` });
      return;
    }
    setSavedProfile(update);
    const stillMissing = missingProfileFields(update, today);
    setProfileMsg(
      stillMissing.length === 0
        ? { ok: true, text: "Profil tersimpan dan sudah lengkap." }
        : { ok: true, text: `Profil tersimpan. Masih perlu dilengkapi untuk booking: ${stillMissing.join(", ")}.` }
    );
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

        {!loading && (
          isComplete ? (
            <div className="rounded-[var(--radius-card)] border-2 border-[var(--color-success-green)]/40 bg-[var(--color-success-green)]/10 p-4 font-[var(--font-inter)] text-sm text-[var(--color-ink)] flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-start gap-2 flex-1">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-success-green)] shrink-0 mt-0.5" />
                <span>Profil kamu sudah lengkap. Kamu bisa booking jadwal kelas.</span>
              </div>
              {nextPath && (
                <Link href={nextPath} className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-brand-blue)] hover:underline shrink-0">
                  Lanjut booking <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ) : (
            <div className="rounded-[var(--radius-card)] border-2 border-[var(--color-warning-amber)]/50 bg-[var(--color-warning-amber)]/10 p-4 font-[var(--font-inter)] text-sm text-[var(--color-ink)] space-y-2">
              <div className="flex items-start gap-2 font-semibold">
                <AlertCircle className="w-5 h-5 text-[var(--color-warning-amber)] shrink-0 mt-0.5" />
                <span>Lengkapi profil untuk bisa booking jadwal kelas</span>
              </div>
              <p className="text-[var(--color-ink-soft)]">
                Materi gratis tetap bisa diambil tanpa melengkapi profil. Untuk booking, data berikut masih kurang:
              </p>
              <ul className="list-disc pl-6 text-[var(--color-ink-soft)]">
                {missingSaved.map((m) => <li key={m}>{m}</li>)}
              </ul>
              <p className="text-xs text-[var(--color-ink-soft)]">Data ini hanya bisa dilihat oleh kamu dan admin Refa Learn untuk verifikasi.</p>
            </div>
          )
        )}

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
                placeholder="08xxxxxxxxxx"
              />
              <Input
                label="Tanggal Lahir"
                type="date"
                value={birthDate}
                max={today}
                onChange={(e) => setBirthDate(e.target.value)}
                icon={<Calendar className="w-4 h-4" />}
                helperText={age !== null ? `Usia ${age} tahun.` : `Jika usia di bawah ${ADULT_AGE} tahun, nama orang tua/wali wajib diisi.`}
              />
              {showGuardian && (
                <Input
                  label="Nama Orang Tua/Wali"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  icon={<Users className="w-4 h-4" />}
                  helperText={`Wajib karena usia di bawah ${ADULT_AGE} tahun.`}
                  placeholder="Nama lengkap orang tua/wali"
                />
              )}

              <div className="w-full flex flex-col gap-1.5">
                <label htmlFor="address" className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                  Alamat Lengkap Domisili
                </label>
                <textarea
                  id="address"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input-field resize-y"
                  placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan, kota"
                />
                <p className="text-xs mt-0.5 font-[var(--font-inter)] text-[var(--color-ink-soft)]">
                  Tulis alamat tempat tinggal saat ini, minimal {MIN_ADDRESS_LENGTH} karakter.
                </p>
              </div>

              <div className="space-y-3 rounded-[var(--radius-card)] border-2 border-dashed border-[var(--color-line)] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                  <MapPin className="w-4 h-4 text-[var(--color-accent-coral)]" /> Titik Lokasi Domisili
                </div>
                <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                  Ambil lokasi saat kamu sedang berada di rumah, supaya titiknya sesuai alamat domisili.
                </p>
                <Button type="button" variant="secondary" onClick={useMyLocation} isLoading={locating} className="w-full sm:w-auto">
                  <LocateFixed className="w-4 h-4" /> Ambil Lokasi Saya
                </Button>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    aria-label="Tempel koordinat atau link Google Maps"
                    value={coordText}
                    onChange={(e) => setCoordText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyCoordText(); } }}
                    className="input-field flex-1"
                    placeholder="Atau tempel koordinat / link Google Maps"
                  />
                  <Button type="button" variant="ghost" onClick={applyCoordText} disabled={!coordText.trim()}>
                    Pakai
                  </Button>
                </div>

                {locationMsg && <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">{locationMsg}</p>}

                {hasLocation && latitude !== null && longitude !== null && (
                  <div className="space-y-2">
                    <iframe
                      title="Peta titik lokasi domisili"
                      src={osmEmbedUrl(latitude, longitude)}
                      className="w-full h-56 rounded-[var(--radius-card)] border border-[var(--color-line)]"
                      loading="lazy"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-[var(--font-inter)] text-[var(--color-ink-soft)]">
                      <span>
                        {latitude}, {longitude}
                        {accuracy !== null && ` (akurasi sekitar ${accuracy} m)`}
                      </span>
                      <a href={googleMapsUrl(latitude, longitude)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-brand-blue)] hover:underline">
                        Buka di Google Maps <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {profileMsg && (
                <p className={`text-sm font-[var(--font-inter)] ${profileMsg.ok ? "text-[var(--color-ink-soft)]" : "text-[var(--color-danger-red)]"}`}>
                  {profileMsg.text}
                </p>
              )}
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
