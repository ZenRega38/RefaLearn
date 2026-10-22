"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { UserCircle, Phone, Mail, Lock, User, Calendar, Users, MapPin, LocateFixed, CheckCircle2, AlertCircle, ArrowRight, ExternalLink, School, IdCard } from "lucide-react";
import { todayStr } from "@/lib/time";
import { useLang } from "@/components/i18n/LangProvider";
import { translator, type Tr } from "@/lib/i18n";
import {
  ADULT_AGE,
  MIN_ADDRESS_LENGTH,
  PROFILE_COMPLETION_COLUMNS,
  ageOn,
  googleMapsUrl,
  isValidBirthDate,
  isValidCoordinate,
  isValidNisnNim,
  missingProfileFields,
  needsGuardian,
  parseCoordinates,
  requiresGuardianContact,
  type ProfileCompletion,
} from "@/lib/profile";


const round6 = (n: number) => Math.round(n * 1e6) / 1e6;

/** Only same-site paths are allowed as a post-save destination. */
const safeNext = (value: string | null) => (value && value.startsWith("/") && !value.startsWith("//") ? value : null);

const osmEmbedUrl = (lat: number, lng: number) => {
  const dLng = 0.004;
  const dLat = 0.0025;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${lng - dLng},${lat - dLat},${lng + dLng},${lat + dLat}&layer=mapnik&marker=${lat},${lng}`;
};

const geoErrorText = (err: GeolocationPositionError, tr: Tr) => {
  if (err.code === err.PERMISSION_DENIED)
    return tr(
      "Izin lokasi ditolak. Izinkan akses lokasi di browser, atau tempel koordinat/link Google Maps di bawah.",
      "Location permission was denied. Allow location access in your browser, or paste coordinates/a Google Maps link below."
    );
  if (err.code === err.POSITION_UNAVAILABLE)
    return tr(
      "Lokasi tidak bisa dideteksi. Pastikan GPS aktif, atau tempel koordinat/link Google Maps di bawah.",
      "Your location couldn't be detected. Make sure GPS is on, or paste coordinates/a Google Maps link below."
    );
  return tr(
    "Pengambilan lokasi terlalu lama. Coba lagi, atau tempel koordinat/link Google Maps di bawah.",
    "Getting your location took too long. Try again, or paste coordinates/a Google Maps link below."
  );
};

export default function StudentProfilePage() {
  const { lang } = useLang();
  const tr = translator(lang);
  const errorText = (err: unknown) => (err instanceof Error ? err.message : tr("Terjadi kesalahan.", "Something went wrong."));
  const [supabase] = useState(() => createClient());
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isAdult, setIsAdult] = useState(false);
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [nisnNim, setNisnNim] = useState("");
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
      setIsAdult(!!p?.is_adult);
      setGuardianName(p?.guardian_name || "");
      setGuardianPhone(p?.guardian_phone || "");
      setSchoolName(p?.school_name || "");
      setNisnNim(p?.nisn_nim || "");
      setAddress(p?.address || "");
      setLatitude(p?.latitude ?? null);
      setLongitude(p?.longitude ?? null);
      setLoading(false);
    };
    load();
  }, [supabase]);

  const hasLocation = isValidCoordinate(latitude, longitude);
  // A birth date under 21 rules out the "21 and over" tick.
  const minorByBirthDate = needsGuardian(birthDate, today);
  const guardianRequired = requiresGuardianContact({ is_adult: isAdult, birth_date: birthDate }, today);
  const age = isValidBirthDate(birthDate, today) ? ageOn(birthDate, today) : null;
  const missingSaved = missingProfileFields(savedProfile, today, lang);
  const isComplete = !loading && missingSaved.length === 0;

  const useMyLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocationMsg(tr("Browser ini tidak mendukung deteksi lokasi. Tempel koordinat atau link Google Maps di bawah.", "This browser can't detect your location. Paste coordinates or a Google Maps link below."));
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
        setLocationMsg(tr("Lokasi berhasil diambil. Cek peta di bawah, lalu klik Simpan Profil.", "Location found. Check the map below, then click Save Profile."));
      },
      (err) => {
        setLocating(false);
        setLocationMsg(geoErrorText(err, tr));
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const applyCoordText = () => {
    const parsed = parseCoordinates(coordText);
    if (!parsed) {
      setLocationMsg(tr("Format tidak dikenali. Contoh: 3.3005, 117.6331 atau link dari Google Maps.", "Format not recognised. Example: 3.3005, 117.6331 or a Google Maps link."));
      return;
    }
    setLatitude(round6(parsed.latitude));
    setLongitude(round6(parsed.longitude));
    setAccuracy(null);
    setCoordText("");
    setLocationMsg(tr("Koordinat dipakai. Cek peta di bawah, lalu klik Simpan Profil.", "Coordinates applied. Check the map below, then click Save Profile."));
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    if (fullName.trim().length < 2) {
      setProfileMsg({ ok: false, text: tr("Nama lengkap wajib diisi.", "Full name is required.") });
      return;
    }
    if (birthDate && !isValidBirthDate(birthDate, today)) {
      setProfileMsg({ ok: false, text: tr("Tanggal lahir tidak valid.", "Invalid date of birth.") });
      return;
    }
    if (isAdult && minorByBirthDate) {
      setProfileMsg({ ok: false, text: tr(
          `Tanggal lahirmu menunjukkan usia di bawah ${ADULT_AGE} tahun, jadi centang "${ADULT_AGE} tahun ke atas" tidak bisa dipakai.`,
          `Your date of birth shows you're under ${ADULT_AGE}, so the "${ADULT_AGE} or older" box can't be ticked.`
        ),
      });
      return;
    }
    if (nisnNim.trim() && !isValidNisnNim(nisnNim)) {
      setProfileMsg({ ok: false, text: tr(
          "NISN/NIM tidak valid. Isi NISN 10 digit, atau NIM sesuai kartu mahasiswa (tanpa spasi).",
          "Invalid NISN/NIM. Enter your 10-digit NISN, or your NIM exactly as on your student card (no spaces)."
        ),
      });
      return;
    }
    setSavingProfile(true);
    setProfileMsg(null);
    const update: ProfileCompletion = {
      full_name: fullName.trim(),
      phone: phone.trim() || null,
      birth_date: birthDate || null,
      is_adult: isAdult && !minorByBirthDate,
      guardian_name: guardianName.trim() || null,
      guardian_phone: guardianPhone.trim() || null,
      school_name: schoolName.trim() || null,
      nisn_nim: nisnNim.trim() || null,
      address: address.trim() || null,
      latitude: hasLocation ? latitude : null,
      longitude: hasLocation ? longitude : null,
    };
    const { error } = await supabase.from("profiles").update(update).eq("id", userId);
    setSavingProfile(false);
    if (error) {
      setProfileMsg({ ok: false, text: `${tr("Gagal menyimpan", "Couldn't save")}: ${error.message}` });
      return;
    }
    setSavedProfile(update);
    const stillMissing = missingProfileFields(update, today, lang);
    setProfileMsg(
      stillMissing.length === 0
        ? { ok: true, text: tr("Profil tersimpan dan sudah lengkap.", "Profile saved and complete.") }
        : {
            ok: true,
            text: tr(
              `Profil tersimpan. Masih perlu dilengkapi untuk booking: ${stillMissing.join(", ")}.`,
              `Profile saved. Still needed before you can book: ${stillMissing.join(", ")}.`
            ),
          }
    );
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setPasswordMsg({ ok: false, text: tr("Password minimal 8 karakter.", "Password must be at least 8 characters.") });
      return;
    }
    if (password !== confirmPassword) {
      setPasswordMsg({ ok: false, text: tr("Konfirmasi password tidak sama.", "Passwords don't match.") });
      return;
    }
    setSavingPassword(true);
    setPasswordMsg(null);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setPassword("");
      setConfirmPassword("");
      setPasswordMsg({ ok: true, text: tr("Password berhasil diganti.", "Password changed.") });
    } catch (err) {
      setPasswordMsg({ ok: false, text: errorText(err) });
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <PaperBackground className="pt-8 md:pt-12 pb-20 min-h-screen">
      <div className="container-main max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-ink)] flex items-center gap-2">
          <UserCircle className="w-8 h-8 text-[var(--color-brand-blue)]" /> {tr("Profil Saya", "My Profile")}
        </h1>

        {!loading && (
          isComplete ? (
            <div className="rounded-[var(--radius-card)] border-2 border-[var(--color-success-green)]/40 bg-[var(--color-success-green)]/10 p-4 font-[var(--font-inter)] text-sm text-[var(--color-ink)] flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-start gap-2 flex-1">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-success-green)] shrink-0 mt-0.5" />
                <span>{tr("Profil kamu sudah lengkap. Kamu bisa booking jadwal kelas.", "Your profile is complete. You can book classes.")}</span>
              </div>
              {nextPath && (
                <Link href={nextPath} className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-brand-blue)] hover:underline shrink-0">
                  {tr("Lanjut booking", "Continue booking")} <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ) : (
            <div className="rounded-[var(--radius-card)] border-2 border-[var(--color-warning-amber)]/50 bg-[var(--color-warning-amber)]/10 p-4 font-[var(--font-inter)] text-sm text-[var(--color-ink)] space-y-2">
              <div className="flex items-start gap-2 font-semibold">
                <AlertCircle className="w-5 h-5 text-[var(--color-warning-amber)] shrink-0 mt-0.5" />
                <span>{tr("Lengkapi profil untuk bisa booking jadwal kelas", "Complete your profile to book classes")}</span>
              </div>
              <p className="text-[var(--color-ink-soft)]">
                {tr(
                  "Materi gratis tetap bisa diambil tanpa melengkapi profil. Untuk booking, data berikut masih kurang:",
                  "You can still claim free courses without completing your profile. To book classes, these details are still missing:"
                )}
              </p>
              <ul className="list-disc pl-6 text-[var(--color-ink-soft)]">
                {missingSaved.map((m) => <li key={m}>{m}</li>)}
              </ul>
              <p className="text-xs text-[var(--color-ink-soft)]">{tr("Data ini hanya bisa dilihat oleh kamu dan admin Refa Learn untuk verifikasi.", "Only you and the Refa Learn admin can see these details, for verification.")}</p>
            </div>
          )
        )}

        <Card variant="sketch" className="space-y-5">
          <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] border-b-2 border-dashed border-[var(--color-line)] pb-2 inline-block">
            {tr("Data Diri", "Personal Details")}
          </h2>
          {loading ? (
            <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">{tr("Memuat...", "Loading...")}</p>
          ) : (
            <form onSubmit={saveProfile} className="space-y-4">
              <Input label="Email" value={email} disabled icon={<Mail className="w-4 h-4" />} helperText={tr("Email login tidak dapat diubah dari sini.", "Your login email can't be changed here.")} />
              <Input
                label={tr("Nama Lengkap", "Full Name")}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                icon={<User className="w-4 h-4" />}
                helperText={tr("Nama ini dipakai sebagai tanda tangan elektronik saat menyetujui perjanjian kelas.", "This name is used as your electronic signature when you accept the class agreement.")}
                required
              />
              <Input
                label={tr("Nomor WhatsApp", "WhatsApp Number")}
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                icon={<Phone className="w-4 h-4" />}
                placeholder="08xxxxxxxxxx"
              />
              <Input
                label={tr("Tanggal Lahir", "Date of Birth")}
                type="date"
                value={birthDate}
                max={today}
                onChange={(e) => setBirthDate(e.target.value)}
                icon={<Calendar className="w-4 h-4" />}
                helperText={age !== null ? tr(`Usia ${age} tahun.`, `Age: ${age}.`) : undefined}
              />
              <div className="space-y-3 rounded-[var(--radius-card)] border-2 border-dashed border-[var(--color-line)] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                  <Users className="w-4 h-4 text-[var(--color-brand-blue)]" /> {tr("Orang Tua / Wali", "Parent / Guardian")}
                </div>
                <label className={`flex items-start gap-2.5 text-sm font-[var(--font-inter)] ${minorByBirthDate ? "opacity-60" : "cursor-pointer"}`}>
                  <input
                    type="checkbox"
                    checked={isAdult && !minorByBirthDate}
                    disabled={minorByBirthDate}
                    onChange={(e) => setIsAdult(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[var(--color-brand-blue)]"
                  />
                  <span>
                    <span className="font-semibold text-[var(--color-ink)]">{tr(`Saya sudah berusia ${ADULT_AGE} tahun ke atas`, `I am ${ADULT_AGE} or older`)}</span>
                    <span className="block text-xs text-[var(--color-ink-soft)]">
                      {minorByBirthDate
                        ? tr(
                            `Tanggal lahirmu menunjukkan usia di bawah ${ADULT_AGE} tahun, jadi data orang tua/wali wajib diisi.`,
                            `Your date of birth shows you're under ${ADULT_AGE}, so parent/guardian details are required.`
                          )
                        : tr("Kalau dicentang, data orang tua/wali boleh dikosongkan.", "If ticked, parent/guardian details are optional.")}
                    </span>
                  </span>
                </label>
                <Input
                  label={`${tr("Nama Orang Tua/Wali", "Parent/Guardian Name")}${guardianRequired ? "" : tr(" (opsional)", " (optional)")}`}
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  icon={<User className="w-4 h-4" />}
                  placeholder={tr("Nama lengkap orang tua/wali", "Parent/guardian full name")}
                />
                <Input
                  label={`${tr("Nomor HP Orang Tua/Wali", "Parent/Guardian Phone")}${guardianRequired ? "" : tr(" (opsional)", " (optional)")}`}
                  type="tel"
                  value={guardianPhone}
                  onChange={(e) => setGuardianPhone(e.target.value)}
                  icon={<Phone className="w-4 h-4" />}
                  placeholder="08xxxxxxxxxx"
                  helperText={guardianRequired ? tr("Wajib untuk booking jadwal. Isi nomor yang aktif dan bisa dihubungi.", "Required for booking. Enter an active number we can reach.") : undefined}
                />
              </div>

              <div className="space-y-3 rounded-[var(--radius-card)] border-2 border-dashed border-[var(--color-line)] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                  <School className="w-4 h-4 text-[var(--color-brand-blue)]" /> {tr("Data Sekolah / Kampus", "School / University")}
                </div>
                <Input
                  label={tr("Asal Sekolah / Kampus", "School / University")}
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  icon={<School className="w-4 h-4" />}
                  placeholder={tr("Contoh: SMA Negeri 1 Tarakan / Universitas Borneo Tarakan", "E.g. SMA Negeri 1 Tarakan / Universitas Borneo Tarakan")}
                  helperText={tr("Tempat kamu belajar sekarang, atau yang terakhir kalau sudah lulus.", "Where you study now, or your last school if you've graduated.")}
                />
                <Input
                  label="NISN / NIM"
                  value={nisnNim}
                  onChange={(e) => setNisnNim(e.target.value.replace(/\s/g, "").slice(0, 25))}
                  icon={<IdCard className="w-4 h-4" />}
                  maxLength={25}
                  placeholder={tr("NISN 10 digit atau NIM", "10-digit NISN or NIM")}
                  error={nisnNim.length >= 5 && !isValidNisnNim(nisnNim) ? tr("Format NISN/NIM tidak valid.", "Invalid NISN/NIM format.") : undefined}
                  helperText={tr(
                    "NISN (10 digit, ada di kartu pelajar/rapor/ijazah) atau NIM kalau kuliah. Sudah lulus? Tetap isi NISN/NIM terakhirmu — datanya tetap bisa dicek tanpa NIK.",
                    "Your NISN (10 digits, on your student card, report card or diploma) or your NIM if you're at university. Already graduated? Enter your last NISN/NIM; it can still be checked without a NIK."
                  )}
                />
              </div>

              <div className="w-full flex flex-col gap-1.5">
                <label htmlFor="address" className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                  {tr("Alamat Lengkap Domisili", "Full Home Address")}
                </label>
                <textarea
                  id="address"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input-field resize-y"
                  placeholder={tr("Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan, kota", "Street, house number, RT/RW, village, district, city")}
                />
                <p className="text-xs mt-0.5 font-[var(--font-inter)] text-[var(--color-ink-soft)]">
                  {tr(
                    `Tulis alamat tempat tinggal saat ini, minimal ${MIN_ADDRESS_LENGTH} karakter.`,
                    `Enter the address where you live now, at least ${MIN_ADDRESS_LENGTH} characters.`
                  )}
                </p>
              </div>

              <div className="space-y-3 rounded-[var(--radius-card)] border-2 border-dashed border-[var(--color-line)] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                  <MapPin className="w-4 h-4 text-[var(--color-accent-coral)]" /> {tr("Titik Lokasi Domisili", "Home Location")}
                </div>
                <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                  {tr("Ambil lokasi saat kamu sedang berada di rumah, supaya titiknya sesuai alamat domisili.", "Get your location while you're at home, so the pin matches your address.")}
                </p>
                <Button type="button" variant="secondary" onClick={useMyLocation} isLoading={locating} className="w-full sm:w-auto">
                  <LocateFixed className="w-4 h-4" /> {tr("Ambil Lokasi Saya", "Use My Location")}
                </Button>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    aria-label={tr("Tempel koordinat atau link Google Maps", "Paste coordinates or a Google Maps link")}
                    value={coordText}
                    onChange={(e) => setCoordText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyCoordText(); } }}
                    className="input-field flex-1"
                    placeholder={tr("Atau tempel koordinat / link Google Maps", "Or paste coordinates / a Google Maps link")}
                  />
                  <Button type="button" variant="ghost" onClick={applyCoordText} disabled={!coordText.trim()}>
                    {tr("Pakai", "Apply")}
                  </Button>
                </div>

                {locationMsg && <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">{locationMsg}</p>}

                {hasLocation && latitude !== null && longitude !== null && (
                  <div className="space-y-2">
                    <iframe
                      title={tr("Peta titik lokasi domisili", "Map of your home location")}
                      src={osmEmbedUrl(latitude, longitude)}
                      className="w-full h-56 rounded-[var(--radius-card)] border border-[var(--color-line)]"
                      loading="lazy"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-[var(--font-inter)] text-[var(--color-ink-soft)]">
                      <span>
                        {latitude}, {longitude}
                        {accuracy !== null && tr(` (akurasi sekitar ${accuracy} m)`, ` (accuracy about ${accuracy} m)`)}
                      </span>
                      <a href={googleMapsUrl(latitude, longitude)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--color-brand-blue)] hover:underline">
                        {tr("Buka di Google Maps", "Open in Google Maps")} <ExternalLink className="w-3 h-3" />
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
                <Button type="submit" isLoading={savingProfile}>{tr("Simpan Profil", "Save Profile")}</Button>
              </div>
            </form>
          )}
        </Card>

        <Card variant="sketch" className="space-y-5">
          <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] border-b-2 border-dashed border-[var(--color-line)] pb-2 inline-block">
            {tr("Ganti Password", "Change Password")}
          </h2>
          <form onSubmit={savePassword} className="space-y-4">
            <Input
              label={tr("Password Baru", "New Password")}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              autoComplete="new-password"
            />
            <Input
              label={tr("Konfirmasi Password Baru", "Confirm New Password")}
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
              <Button type="submit" isLoading={savingPassword}>{tr("Ganti Password", "Change Password")}</Button>
            </div>
          </form>
        </Card>
      </div>
    </PaperBackground>
  );
}
