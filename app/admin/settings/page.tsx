"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Settings, Save, RefreshCw } from "lucide-react";

// Simple free-text settings — stored as { text: string } in site_settings.value.
// The ones visitors read on the site are written in both languages and also
// keep { text_en } (see pickLocalized in lib/i18n).
type TextSettings = {
  hero_title: string;
  hero_subtitle: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  social_instagram: string;
  social_tiktok: string;
  about_content: string;
  vision: string;
  cancellation_policy: string;
  late_payment_policy: string;
};

const emptyTextSettings: TextSettings = {
  hero_title: "",
  hero_subtitle: "",
  contact_email: "",
  contact_phone: "",
  contact_address: "",
  social_instagram: "",
  social_tiktok: "",
  about_content: "",
  vision: "",
  cancellation_policy: "",
  late_payment_policy: "",
};

const BILINGUAL = ["hero_title", "hero_subtitle", "about_content", "vision"] as const;
type BilingualKey = (typeof BILINGUAL)[number];
const isBilingual = (key: string): key is BilingualKey => (BILINGUAL as readonly string[]).includes(key);
const emptyEnglish: Record<BilingualKey, string> = { hero_title: "", hero_subtitle: "", about_content: "", vision: "" };

// Structured settings — stored as the object itself in site_settings.value
// (not wrapped in { text }).
type BankDetails = { bank_name: string; account_number: string; account_name: string };
type EwalletDetails = { provider: string; number: string; account_name: string };
type BioDetails = { name: string; title: string; title_en: string; text: string; text_en: string };

const emptyBank: BankDetails = { bank_name: "", account_number: "", account_name: "" };
const emptyEwallet: EwalletDetails = { provider: "", number: "", account_name: "" };
const emptyBio: BioDetails = { name: "", title: "", title_en: "", text: "", text_en: "" };

// `mission` is stored as { text: "bullet one|bullet two|bullet three" } —
// edited here as one bullet per line and joined/split on save/load so the
// admin never sees the "|" delimiter.
const bulletsToStorage = (linesText: string) =>
  linesText
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join("|");

const storageToBullets = (stored: string) => stored.split("|").filter(Boolean).join("\n");

/** One setting written twice, Indonesian and English side by side. */
function BilingualField({
  label,
  hint,
  value,
  onChange,
  multiline = false,
  placeholder,
}: {
  label: string;
  hint?: string;
  value: { id: string; en: string };
  onChange: (lang: "id" | "en", text: string) => void;
  multiline?: boolean;
  placeholder?: { id: string; en: string };
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
        {label} {hint && <span className="font-normal text-[var(--color-ink-soft)]">{hint}</span>}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {(["id", "en"] as const).map((lang) => (
          <label key={lang} className="flex flex-col gap-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-ink-soft)] font-[var(--font-inter)]">
              {lang === "id" ? "ID · Bahasa Indonesia" : "EN · English"}
            </span>
            {multiline ? (
              <textarea
                value={value[lang]}
                onChange={(e) => onChange(lang, e.target.value)}
                className="input-field min-h-[100px] resize-y"
                placeholder={placeholder?.[lang]}
              />
            ) : (
              <input
                value={value[lang]}
                onChange={(e) => onChange(lang, e.target.value)}
                className="input-field"
                placeholder={placeholder?.[lang]}
              />
            )}
          </label>
        ))}
      </div>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [supabase] = useState(() => createClient());
  const [settings, setSettings] = useState<TextSettings>(emptyTextSettings);
  const [english, setEnglish] = useState<Record<BilingualKey, string>>(emptyEnglish);
  const [missionBullets, setMissionBullets] = useState("");
  const [missionBulletsEn, setMissionBulletsEn] = useState("");
  const [bankDetails, setBankDetails] = useState<BankDetails>(emptyBank);
  const [ewalletDetails, setEwalletDetails] = useState<EwalletDetails>(emptyEwallet);
  const [founderBio, setFounderBio] = useState<BioDetails>(emptyBio);
  const [cofounderBio, setCofounderBio] = useState<BioDetails>(emptyBio);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = useCallback(async () => {
    const { data } = await supabase.from("site_settings").select("*");
    if (data) {
      const newSettings = { ...emptyTextSettings };
      const newEnglish = { ...emptyEnglish };
      let mission = "";
      let missionEn = "";
      let bank = { ...emptyBank };
      let ewallet = { ...emptyEwallet };
      let founder = { ...emptyBio };
      let cofounder = { ...emptyBio };

      data.forEach((item) => {
        if (item.key in newSettings) {
          newSettings[item.key as keyof TextSettings] = item.value?.text || "";
          const key: string = item.key;
          if (isBilingual(key)) newEnglish[key] = item.value?.text_en || "";
        } else if (item.key === "mission") {
          mission = storageToBullets(item.value?.text || "");
          missionEn = storageToBullets(item.value?.text_en || "");
        } else if (item.key === "bank_details") {
          bank = { ...emptyBank, ...item.value };
        } else if (item.key === "ewallet_details") {
          ewallet = { ...emptyEwallet, ...item.value };
        } else if (item.key === "founder_bio") {
          founder = { ...emptyBio, ...item.value };
        } else if (item.key === "cofounder_bio") {
          cofounder = { ...emptyBio, ...item.value };
        }
      });

      setSettings(newSettings);
      setEnglish(newEnglish);
      setMissionBullets(mission);
      setMissionBulletsEn(missionEn);
      setBankDetails(bank);
      setEwalletDetails(ewallet);
      setFounderBio(founder);
      setCofounderBio(cofounder);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load
    fetchSettings();
  }, [fetchSettings]);

  const handleSave = async () => {
    // Visitors switch between Indonesian and English: a text filled in only
    // one language would show the wrong language to the others.
    const pairs: [string, string, string][] = [
      ["Judul Utama", settings.hero_title, english.hero_title],
      ["Subjudul", settings.hero_subtitle, english.hero_subtitle],
      ["Kalimat Pembuka", settings.about_content, english.about_content],
      ["Jabatan Founder", founderBio.title, founderBio.title_en],
      ["Bio Founder", founderBio.text, founderBio.text_en],
      ["Jabatan Co-Founder", cofounderBio.title, cofounderBio.title_en],
      ["Bio Co-Founder", cofounderBio.text, cofounderBio.text_en],
      ["Visi", settings.vision, english.vision],
      ["Misi", bulletsToStorage(missionBullets), bulletsToStorage(missionBulletsEn)],
    ];
    const halfDone = pairs.filter(([, id, en]) => !!id.trim() !== !!en.trim()).map(([label]) => label);
    if (halfDone.length > 0) {
      alert(`Isi versi ID dan EN untuk: ${halfDone.join(", ")}. Kosongkan keduanya untuk memakai teks bawaan.`);
      return;
    }

    setSaving(true);

    const updates = [
      ...Object.entries(settings).map(([key, value]) => ({
        key,
        value: isBilingual(key) ? { text: value, text_en: english[key] } : { text: value },
        updated_at: new Date().toISOString(),
      })),
      {
        key: "mission",
        value: { text: bulletsToStorage(missionBullets), text_en: bulletsToStorage(missionBulletsEn) },
        updated_at: new Date().toISOString(),
      },
      { key: "bank_details", value: bankDetails, updated_at: new Date().toISOString() },
      { key: "ewallet_details", value: ewalletDetails, updated_at: new Date().toISOString() },
      { key: "founder_bio", value: founderBio, updated_at: new Date().toISOString() },
      { key: "cofounder_bio", value: cofounderBio, updated_at: new Date().toISOString() },
    ];

    const { error } = await supabase.from("site_settings").upsert(updates);

    setSaving(false);

    if (error) {
      alert(`Gagal menyimpan pengaturan: ${error.message}`);
    } else {
      alert("Pengaturan berhasil disimpan!");
    }
  };

  const handleChange = (key: keyof TextSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  // Props for a BilingualField over one of the bilingual text settings.
  const bilingual = (key: BilingualKey) => ({
    value: { id: settings[key], en: english[key] },
    onChange: (lang: "id" | "en", text: string) =>
      lang === "id" ? handleChange(key, text) : setEnglish((prev) => ({ ...prev, [key]: text })),
  });
  const bioField = (set: typeof setFounderBio, bio: BioDetails, field: "title" | "text") => ({
    value: { id: bio[field], en: bio[`${field}_en`] },
    onChange: (lang: "id" | "en", text: string) => set((p) => ({ ...p, [lang === "id" ? field : `${field}_en`]: text })),
  });

  return (
    <PaperBackground className="p-4 md:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)] flex items-center gap-2">
            <Settings className="w-8 h-8" /> Pengaturan Website
          </h1>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={fetchSettings} size="sm" className="px-3">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
            <Button onClick={handleSave} isLoading={saving} className="gap-2">
              <Save className="w-4 h-4" /> Simpan Perubahan
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-[var(--color-ink-soft)] font-[var(--font-inter)]">
            Memuat pengaturan...
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] rounded-[var(--radius-card)] border border-dashed border-[var(--color-line)] bg-white/70 p-4">
              Pengunjung bisa memilih bahasa ID atau EN di navbar, jadi teks Beranda dan Tentang Kami diisi dalam dua
              bahasa. Isi keduanya, atau kosongkan keduanya untuk memakai teks bawaan website.
            </p>

            <Card variant="sketch" className="p-6 space-y-6 bg-white">
              <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] border-b-2 border-dashed border-[var(--color-line)] pb-2 inline-block">
                Beranda (Home)
              </h2>

              <div className="space-y-4">
                <BilingualField
                  label="Judul Utama (Hero Title)"
                  {...bilingual("hero_title")}
                  placeholder={{ id: "Contoh: Les Bahasa Inggris Private Tarakan", en: "E.g. Private English Lessons in Tarakan" }}
                />

                <BilingualField
                  label="Subjudul (Hero Subtitle)"
                  multiline
                  {...bilingual("hero_subtitle")}
                  placeholder={{ id: "Deskripsi singkat di bawah judul utama...", en: "A short description under the main title..." }}
                />
              </div>
            </Card>

            <Card variant="sketch" className="p-6 space-y-6 bg-white">
              <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] border-b-2 border-dashed border-[var(--color-line)] pb-2 inline-block">
                Tentang Kami (About Page)
              </h2>

              <BilingualField
                label="Kalimat Pembuka"
                multiline
                {...bilingual("about_content")}
                placeholder={{ id: "Kalimat pembuka di halaman Tentang Kami...", en: "The opening line of the About page..." }}
              />

              <div className="space-y-3">
                <h3 className="text-sm font-bold font-[var(--font-inter)] text-[var(--color-ink)]">
                  Founder
                </h3>
                <Input
                  label="Nama"
                  value={founderBio.name}
                  onChange={(e) => setFounderBio((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Refa"
                />
                <BilingualField
                  label="Jabatan"
                  {...bioField(setFounderBio, founderBio, "title")}
                  placeholder={{ id: "Founder & Lead Tutor", en: "Founder & Lead Tutor" }}
                />
                <BilingualField
                  label="Bio"
                  multiline
                  {...bioField(setFounderBio, founderBio, "text")}
                  placeholder={{ id: "Cerita singkat tentang founder...", en: "A short story about the founder..." }}
                />
              </div>

              <div className="space-y-3 pt-2 border-t border-dashed border-[var(--color-line)]">
                <h3 className="text-sm font-bold font-[var(--font-inter)] text-[var(--color-ink)]">
                  Co-Founder{" "}
                  <span className="font-normal text-[var(--color-ink-soft)]">
                    (opsional — kosongkan untuk menyembunyikan bagian ini)
                  </span>
                </h3>
                <Input
                  label="Nama"
                  value={cofounderBio.name}
                  onChange={(e) => setCofounderBio((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Nama Co-Founder"
                />
                <BilingualField
                  label="Jabatan"
                  {...bioField(setCofounderBio, cofounderBio, "title")}
                  placeholder={{ id: "Co-Founder & Tutor", en: "Co-Founder & Tutor" }}
                />
                <BilingualField
                  label="Bio"
                  multiline
                  {...bioField(setCofounderBio, cofounderBio, "text")}
                  placeholder={{ id: "Cerita singkat tentang co-founder...", en: "A short story about the co-founder..." }}
                />
              </div>

              <div className="space-y-4 pt-2 border-t border-dashed border-[var(--color-line)]">
                <BilingualField
                  label="Visi"
                  multiline
                  {...bilingual("vision")}
                  placeholder={{ id: "Pernyataan visi...", en: "The vision statement..." }}
                />
                <BilingualField
                  label="Misi"
                  hint="(satu poin per baris)"
                  multiline
                  value={{ id: missionBullets, en: missionBulletsEn }}
                  onChange={(lang, text) => (lang === "id" ? setMissionBullets(text) : setMissionBulletsEn(text))}
                  placeholder={{
                    id: "Poin misi pertama...\nPoin misi kedua...\nPoin misi ketiga...",
                    en: "First mission point...\nSecond mission point...\nThird mission point...",
                  }}
                />
              </div>
            </Card>

            <Card variant="sketch" className="p-6 space-y-6 bg-white">
              <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] border-b-2 border-dashed border-[var(--color-line)] pb-2 inline-block">
                Pembayaran
              </h2>

              <div className="space-y-3">
                <h3 className="text-sm font-bold font-[var(--font-inter)] text-[var(--color-ink)]">
                  Transfer Bank
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Nama Bank"
                    value={bankDetails.bank_name}
                    onChange={(e) => setBankDetails((p) => ({ ...p, bank_name: e.target.value }))}
                    placeholder="Bank Central Asia (BCA)"
                  />
                  <Input
                    label="Nomor Rekening"
                    value={bankDetails.account_number}
                    onChange={(e) => setBankDetails((p) => ({ ...p, account_number: e.target.value }))}
                    placeholder="1234567890"
                  />
                  <Input
                    label="Atas Nama"
                    value={bankDetails.account_name}
                    onChange={(e) => setBankDetails((p) => ({ ...p, account_name: e.target.value }))}
                    placeholder="Refa Learn"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-dashed border-[var(--color-line)]">
                <h3 className="text-sm font-bold font-[var(--font-inter)] text-[var(--color-ink)]">
                  E-Wallet
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Provider"
                    value={ewalletDetails.provider}
                    onChange={(e) => setEwalletDetails((p) => ({ ...p, provider: e.target.value }))}
                    placeholder="GoPay / OVO / DANA"
                  />
                  <Input
                    label="Nomor"
                    value={ewalletDetails.number}
                    onChange={(e) => setEwalletDetails((p) => ({ ...p, number: e.target.value }))}
                    placeholder="081234567890"
                  />
                  <Input
                    label="Atas Nama"
                    value={ewalletDetails.account_name}
                    onChange={(e) => setEwalletDetails((p) => ({ ...p, account_name: e.target.value }))}
                    placeholder="Refa Learn"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-dashed border-[var(--color-line)]">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                    Kebijakan Pembatalan
                  </label>
                  <textarea
                    value={settings.cancellation_policy}
                    onChange={(e) => handleChange("cancellation_policy", e.target.value)}
                    className="input-field min-h-[80px] resize-y"
                    placeholder="Ketentuan pembatalan sesi..."
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                    Kebijakan Keterlambatan Bayar
                  </label>
                  <textarea
                    value={settings.late_payment_policy}
                    onChange={(e) => handleChange("late_payment_policy", e.target.value)}
                    className="input-field min-h-[80px] resize-y"
                    placeholder="Ketentuan keterlambatan pembayaran invoice..."
                  />
                </div>
              </div>
            </Card>

            <Card variant="sketch" className="p-6 space-y-6 bg-white">
              <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] border-b-2 border-dashed border-[var(--color-line)] pb-2 inline-block">
                Kontak & Footer
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email Kontak"
                  value={settings.contact_email}
                  onChange={(e) => handleChange("contact_email", e.target.value)}
                  placeholder="hello@refalearn.com"
                />
                <Input
                  label="Nomor WhatsApp"
                  value={settings.contact_phone}
                  onChange={(e) => handleChange("contact_phone", e.target.value)}
                  placeholder="6281234567890"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                  Alamat
                </label>
                <textarea
                  value={settings.contact_address}
                  onChange={(e) => handleChange("contact_address", e.target.value)}
                  className="input-field min-h-[80px] resize-y"
                  placeholder="Alamat kantor / operasional..."
                />
              </div>
            </Card>

            <Card variant="sketch" className="p-6 space-y-6 bg-white">
              <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] border-b-2 border-dashed border-[var(--color-line)] pb-2 inline-block">
                Sosial Media
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Link Instagram"
                  value={settings.social_instagram}
                  onChange={(e) => handleChange("social_instagram", e.target.value)}
                  placeholder="https://instagram.com/..."
                />
                <Input
                  label="Link TikTok"
                  value={settings.social_tiktok}
                  onChange={(e) => handleChange("social_tiktok", e.target.value)}
                  placeholder="https://tiktok.com/@..."
                />
              </div>
            </Card>

          </div>
        )}

      </div>
    </PaperBackground>
  );
}