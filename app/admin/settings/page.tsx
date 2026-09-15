"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Settings, Save, RefreshCw } from "lucide-react";

type SettingsState = {
  hero_title: string;
  hero_subtitle: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  social_instagram: string;
  social_tiktok: string;
};

export default function AdminSettingsPage() {
  const supabase = createClient();
  const [settings, setSettings] = useState<SettingsState>({
    hero_title: "",
    hero_subtitle: "",
    contact_email: "",
    contact_phone: "",
    contact_address: "",
    social_instagram: "",
    social_tiktok: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('site_settings').select('*');
    if (data) {
      const newSettings = { ...settings };
      data.forEach(item => {
        if (item.key in newSettings) {
          (newSettings as any)[item.key] = item.value?.text || "";
        }
      });
      setSettings(newSettings);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    
    const updates = Object.entries(settings).map(([key, value]) => ({
      key,
      value: { text: value },
      updated_at: new Date().toISOString()
    }));

    const { error } = await supabase.from('site_settings').upsert(updates);
    
    setSaving(false);
    
    if (error) {
      alert(`Gagal menyimpan pengaturan: ${error.message}`);
    } else {
      alert("Pengaturan berhasil disimpan!");
    }
  };

  const handleChange = (key: keyof SettingsState, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
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
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
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
                  onChange={(e) => handleChange('hero_title', e.target.value)}
                  placeholder="Contoh: Bridging Borders, Embracing The World!"
                />
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                    Subjudul (Hero Subtitle)
                  </label>
                  <textarea 
                    value={settings.hero_subtitle}
                    onChange={(e) => handleChange('hero_subtitle', e.target.value)}
                    className="input-field min-h-[100px] resize-y"
                    placeholder="Deskripsi singkat di bawah judul utama..."
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
                  onChange={(e) => handleChange('contact_email', e.target.value)}
                  placeholder="hello@refalearn.com"
                />
                <Input 
                  label="Nomor WhatsApp" 
                  value={settings.contact_phone}
                  onChange={(e) => handleChange('contact_phone', e.target.value)}
                  placeholder="6281234567890"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                  Alamat
                </label>
                <textarea 
                  value={settings.contact_address}
                  onChange={(e) => handleChange('contact_address', e.target.value)}
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
                  onChange={(e) => handleChange('social_instagram', e.target.value)}
                  placeholder="https://instagram.com/..."
                />
                <Input 
                  label="Link TikTok" 
                  value={settings.social_tiktok}
                  onChange={(e) => handleChange('social_tiktok', e.target.value)}
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
