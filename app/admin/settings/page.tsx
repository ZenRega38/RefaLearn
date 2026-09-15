"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Settings, Save, RefreshCw } from "lucide-react";

// Simple free-text settings — stored as { text: string } in site_settings.value.
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

// Structured settings — stored as the object itself in site_settings.value
// (not wrapped in { text }).
type BankDetails = { bank_name: string; account_number: string; account_name: string };
type EwalletDetails = { provider: string; number: string; account_name: string };
type BioDetails = { name: string; title: string; text: string };

const emptyBank: BankDetails = { bank_name: "", account_number: "", account_name: "" };
const emptyEwallet: EwalletDetails = { provider: "", number: "", account_name: "" };
const emptyBio: BioDetails = { name: "", title: "", text: "" };

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

export default function AdminSettingsPage() {
  const supabase = createClient();
  const [settings, setSettings] = useState<TextSettings>(emptyTextSettings);
  const [missionBullets, setMissionBullets] = useState("");
  const [bankDetails, setBankDetails] = useState<BankDetails>(emptyBank);
  const [ewalletDetails, setEwalletDetails] = useState<EwalletDetails>(emptyEwallet);
  const [founderBio, setFounderBio] = useState<BioDetails>(emptyBio);
  const [cofounderBio, setCofounderBio] = useState<BioDetails>(emptyBio);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("site_settings").select("*");
    if (data) {
      const newSettings = { ...emptyTextSettings };
      let mission = "";
      let bank = { ...emptyBank };
      let ewallet = { ...emptyEwallet };
      let founder = { ...emptyBio };
      let cofounder = { ...emptyBio };

      data.forEach((item) => {
        if (item.key in newSettings) {
          (newSettings as any)[item.key] = item.value?.text || "";
        } else if (item.key === "mission") {
          mission = storageToBullets(item.value?.text || "");
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
      setMissionBullets(mission);
      setBankDetails(bank);
      setEwalletDetails(ewallet);
      setFounderBio(founder);
      setCofounderBio(cofounder);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);

    const updates = [
      ...Object.entries(settings).map(([key, value]) => ({
        key,
        value: { text: value },
        updated_at: new Date().toISOString(),
      })),
      {
        key: "mission",
        value: { text: bulletsToStorage(missionBullets) },
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

            <Card variant="sketch" className="p-6 space-y-6 bg-white">
              <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] border-b-2 border-dashed border-[var(--color-line)] pb-2 inline-block">
                Beranda (Home)
              </h2>

              <div className="space-y-4">
                <Input
                  label="Judul Utama (Hero Title)"
                  value={settings.hero_title}
                  onChange={(e) => handleChange("hero_title", e.target.value)}
                  placeholder="Contoh: Bridging Borders, Embracing The World!"
                />

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                    Subjudul (Hero Subtitle)
                  </label>
                  <textarea
                    value={settings.hero_subtitle}
                    onChange={(e) => handleChange("hero_subtitle", e.target.value)}
                    className="input-field min-h-[100px] resize-y"
                    placeholder="Deskripsi singkat di bawah judul utama..."
                  />
                </div>
              </div>
            </Card>

            <Card variant="sketch" className="p-6 space-y-6 bg-white">
              <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] border-b-2 border-dashed border-[var(--color-line)] pb-2 inline-block">
                Tentang Kami (About Page)
              </h2>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                  Kalimat Pembuka
                </label>
                <textarea
                  value={settings.about_content}
                  onChange={(e) => handleChange("about_content", e.target.value)}
                  className="input-field min-h-[80px] resize-y"
                  placeholder="Kalimat pembuka di halaman Tentang Kami..."
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold font-[var(--font-inter)] text-[var(--color-ink)]">
                  Founder
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nama"
                    value={founderBio.name}
                    onChange={(e) => setFounderBio((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Refa"
                  />
                  <Input
                    label="Jabatan"
                    value={founderBio.title}
                    onChange={(e) => setFounderBio((p) => ({ ...p, title: e.target.value }))}
                    placeholder="Founder & Lead Tutor"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                    Bio
                  </label>
                  <textarea
                    value={founderBio.text}
                    onChange={(e) => setFounderBio((p) => ({ ...p, text: e.target.value }))}
                    className="input-field min-h-[100px] resize-y"
                    placeholder="Cerita singkat tentang founder..."
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-dashed border-[var(--color-line)]">
                <h3 className="text-sm font-bold font-[var(--font-inter)] text-[var(--color-ink)]">
                  Co-Founder{" "}
                  <span className="font-normal text-[var(--color-ink-soft)]">
                    (opsional — kosongkan untuk menyembunyikan bagian ini)
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nama"
                    value={cofounderBio.name}
                    onChange={(e) => setCofounderBio((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Nama Co-Founder"
                  />
                  <Input
                    label="Jabatan"
                    value={cofounderBio.title}
                    onChange={(e) => setCofounderBio((p) => ({ ...p, title: e.target.value }))}
                    placeholder="Co-Founder & Tutor"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                    Bio
                  </label>
                  <textarea
                    value={cofounderBio.text}
                    onChange={(e) => setCofounderBio((p) => ({ ...p, text: e.target.value }))}
                    className="input-field min-h-[100px] resize-y"
                    placeholder="Cerita singkat tentang co-founder..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-dashed border-[var(--color-line)]">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                    Visi
                  </label>
                  <textarea
                    value={settings.vision}
                    onChange={(e) => handleChange("vision", e.target.value)}
                    className="input-field min-h-[100px] resize-y"
                    placeholder="Pernyataan visi..."
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                    Misi{" "}
                    <span className="font-normal text-[var(--color-ink-soft)]">
                      (satu poin per baris)
                    </span>
                  </label>
                  <textarea
                    value={missionBullets}
                    onChange={(e) => setMissionBullets(e.target.value)}
                    className="input-field min-h-[100px] resize-y"
                    placeholder={"Poin misi pertama...\nPoin misi kedua...\nPoin misi ketiga..."}
                  />
                </div>
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