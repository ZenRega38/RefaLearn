"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Plus, Edit2, Trash2, RefreshCw, Handshake } from "lucide-react";
import { isSafeHttpUrl } from "@/lib/format";

type Partner = {
  id: string;
  name: string;
  logo_url: string | null;
  url: string | null;
  order_index: number;
};

export default function AdminPartnersPage() {
  const [supabase] = useState(() => createClient());
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [url, setUrl] = useState("");
  const [orderIndex, setOrderIndex] = useState(0);
  const [saving, setSaving] = useState(false);

  const fetchPartners = useCallback(async () => {
    const { data } = await supabase
      .from("partners")
      .select("*")
      .order("order_index", { ascending: true });
    setPartners((data || []) as Partner[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load
    fetchPartners();
  }, [fetchPartners]);

  const openEditor = (p: Partner | null) => {
    setCurrentId(p?.id ?? null);
    setName(p?.name ?? "");
    setLogoUrl(p?.logo_url ?? "");
    setUrl(p?.url ?? "");
    setOrderIndex(p?.order_index ?? partners.length);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Nama partner wajib diisi");
      return;
    }
    if (url && !isSafeHttpUrl(url)) {
      alert("Link website harus diawali http:// atau https://");
      return;
    }

    setSaving(true);
    const row = { name: name.trim(), logo_url: logoUrl || null, url: url || null, order_index: orderIndex };
    const { error } = currentId
      ? await supabase.from("partners").update(row).eq("id", currentId)
      : await supabase.from("partners").insert([row]);
    setSaving(false);

    if (error) {
      alert(`Gagal menyimpan: ${error.message}`);
    } else {
      setIsEditing(false);
      fetchPartners();
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Hapus partner ini?")) return;
    const { error } = await supabase.from("partners").delete().eq("id", id);
    if (error) alert(`Gagal menghapus: ${error.message}`);
    fetchPartners();
  };

  if (isEditing) {
    return (
      <PaperBackground className="p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">
              {currentId ? "Edit Partner" : "Tambah Partner"}
            </h1>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setIsEditing(false)}>Batal</Button>
              <Button onClick={handleSave} isLoading={saving}>Simpan</Button>
            </div>
          </div>

          <Card variant="sketch" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Nama Partner" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input label="Link Website (Opsional)" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
            </div>
            <ImageUploadField label="Logo (Opsional)" value={logoUrl} onChange={setLogoUrl} folder="partners" />
            <div className="flex items-center gap-2">
              <label className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">Urutan:</label>
              <input
                type="number"
                value={orderIndex}
                onChange={(e) => setOrderIndex(parseInt(e.target.value) || 0)}
                className="w-16 input-field py-1 px-2"
              />
            </div>
          </Card>
        </div>
      </PaperBackground>
    );
  }

  return (
    <PaperBackground className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)] flex items-center gap-2">
              <Handshake className="w-8 h-8" /> Partner
            </h1>
            <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)] mt-1">
              Tampil di halaman About. Bagian ini otomatis disembunyikan jika belum ada partner.
            </p>
          </div>
          <Button onClick={() => openEditor(null)} className="gap-2">
            <Plus className="w-4 h-4" /> Tambah Partner
          </Button>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="responsive-table w-full text-left font-[var(--font-inter)] text-sm border-collapse">
              <thead>
                <tr className="bg-[var(--color-paper-bg-alt)] border-b border-[var(--color-line)]">
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Partner</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Link</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)] text-center">Urutan</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-[var(--color-ink-soft)]">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Memuat data...
                    </td>
                  </tr>
                ) : partners.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-[var(--color-ink-soft)]">Belum ada partner.</td>
                  </tr>
                ) : (
                  partners.map((p) => (
                    <tr key={p.id} className="border-b border-[var(--color-line)] hover:bg-[var(--color-paper-bg-alt)]/50 transition-colors">
                      <td className="p-4 flex items-center gap-3 !justify-start" data-label="Partner">
                        <div className="w-10 h-10 rounded bg-white border border-[var(--color-line)] flex items-center justify-center overflow-hidden shrink-0">
                          {p.logo_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={p.logo_url} alt={p.name} className="w-full h-full object-contain" />
                          ) : (
                            <span className="font-bold text-[var(--color-ink-soft)]">{p.name.charAt(0)}</span>
                          )}
                        </div>
                        <span className="font-semibold text-[var(--color-ink)]">{p.name}</span>
                      </td>
                      <td className="p-4 text-xs text-[var(--color-ink-soft)] truncate max-w-[200px]" data-label="Link">{p.url || "-"}</td>
                      <td className="p-4 text-center" data-label="Urutan">{p.order_index}</td>
                      <td className="p-4 text-right" data-label="Aksi">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openEditor(p)} className="px-2 text-[var(--color-brand-blue)]" aria-label="Edit">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(p.id)} className="px-2 text-[var(--color-danger-red)]" aria-label="Hapus">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </PaperBackground>
  );
}
