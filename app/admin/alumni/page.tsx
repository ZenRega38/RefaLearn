"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";
import { Plus, Edit2, Trash2, RefreshCw, Star } from "lucide-react";

type Alumni = {
  id: string;
  name: string;
  photo_url: string;
  achievement_title: string;
  achievement_detail: string;
  testimonial_text: string;
  category: string;
  is_featured: boolean;
  order_index: number;
};

export default function AdminAlumniPage() {
  const supabase = createClient();
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [achievementTitle, setAchievementTitle] = useState("");
  const [achievementDetail, setAchievementDetail] = useState("");
  const [testimonialText, setTestimonialText] = useState("");
  const [category, setCategory] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [orderIndex, setOrderIndex] = useState(0);
  const [saving, setSaving] = useState(false);

  const fetchAlumni = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('alumni')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false });
      
    if (!error && data) {
      setAlumni(data as Alumni[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const handleEdit = (alumnus: Alumni) => {
    setCurrentId(alumnus.id);
    setName(alumnus.name);
    setPhotoUrl(alumnus.photo_url || "");
    setAchievementTitle(alumnus.achievement_title || "");
    setAchievementDetail(alumnus.achievement_detail || "");
    setTestimonialText(alumnus.testimonial_text || "");
    setCategory(alumnus.category || "");
    setIsFeatured(alumnus.is_featured);
    setOrderIndex(alumnus.order_index || 0);
    setIsEditing(true);
  };

  const handleCreateNew = () => {
    setCurrentId(null);
    setName("");
    setPhotoUrl("");
    setAchievementTitle("");
    setAchievementDetail("");
    setTestimonialText("");
    setCategory("");
    setIsFeatured(false);
    setOrderIndex(alumni.length);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Nama wajib diisi");
      return;
    }

    setSaving(true);
    
    const alumniData = {
      name,
      photo_url: photoUrl,
      achievement_title: achievementTitle,
      achievement_detail: achievementDetail,
      testimonial_text: testimonialText,
      category,
      is_featured: isFeatured,
      order_index: orderIndex
    };

    let error;
    if (currentId) {
      const { error: updateError } = await supabase
        .from('alumni')
        .update(alumniData)
        .eq('id', currentId);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('alumni')
        .insert([alumniData]);
      error = insertError;
    }

    setSaving(false);

    if (error) {
      console.error(error);
      alert(`Gagal menyimpan: ${error.message}`);
    } else {
      setIsEditing(false);
      fetchAlumni();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data alumni ini?")) {
      const { error } = await supabase.from('alumni').delete().eq('id', id);
      if (!error) {
        fetchAlumni();
      }
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    const { error } = await supabase
      .from('alumni')
      .update({ is_featured: !currentFeatured })
      .eq('id', id);
      
    if (!error) {
      fetchAlumni();
    }
  };

  if (isEditing) {
    return (
      <PaperBackground className="p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">
              {currentId ? "Edit Alumni" : "Tambah Alumni Baru"}
            </h1>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={handleCancel}>Batal</Button>
              <Button onClick={handleSave} isLoading={saving}>Simpan</Button>
            </div>
          </div>
          
          <Card variant="sketch" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nama Alumni"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap..."
                required
              />
              <Input
                label="Kategori / Program"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="IELTS, TOEFL, SMA, dll"
              />
            </div>
            
            <Input
              label="URL Foto (Opsional)"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://..."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Pencapaian Utama (Singkat)"
                value={achievementTitle}
                onChange={(e) => setAchievementTitle(e.target.value)}
                placeholder="Contoh: IELTS 7.5"
              />
              <Input
                label="Detail Pencapaian"
                value={achievementDetail}
                onChange={(e) => setAchievementDetail(e.target.value)}
                placeholder="Contoh: Diterima di Monash University"
              />
            </div>

            <Textarea
              label="Kutipan Testimoni"
              value={testimonialText}
              onChange={(e) => setTestimonialText(e.target.value)}
              placeholder="Tuliskan testimoni dari alumni..."
              rows={4}
            />

            <div className="flex items-center justify-between pt-4 border-t border-[var(--color-line)]">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-[var(--color-brand-blue)] rounded focus:ring-[var(--color-brand-blue)]"
                />
                Tampilkan di Halaman Utama (Featured)
              </label>
              
              <div className="flex items-center gap-2">
                <label className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">Urutan:</label>
                <input
                  type="number"
                  value={orderIndex}
                  onChange={(e) => setOrderIndex(parseInt(e.target.value) || 0)}
                  className="w-16 input-field py-1 px-2"
                />
              </div>
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
          <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">
            Manajemen Alumni
          </h1>
          <Button onClick={handleCreateNew} className="gap-2">
            <Plus className="w-4 h-4" /> Tambah Alumni
          </Button>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-[var(--font-inter)] text-sm border-collapse">
              <thead>
                <tr className="bg-[var(--color-paper-bg-alt)] border-b border-[var(--color-line)]">
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Alumni</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Pencapaian</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Kategori</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)] text-center">Featured</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[var(--color-ink-soft)]">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Memuat data...
                    </td>
                  </tr>
                ) : alumni.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[var(--color-ink-soft)]">
                      Belum ada data alumni. Klik "Tambah Alumni" untuk membuat.
                    </td>
                  </tr>
                ) : (
                  alumni.map((item) => (
                    <tr key={item.id} className="border-b border-[var(--color-line)] hover:bg-[var(--color-paper-bg-alt)]/50 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-paper-bg)] border border-[var(--color-line)] flex items-center justify-center overflow-hidden shrink-0">
                          {item.photo_url ? (
                            <img src={item.photo_url} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-bold text-[var(--color-ink-soft)]">{item.name.charAt(0)}</span>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-[var(--color-ink)]">{item.name}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-[var(--color-brand-blue)]">{item.achievement_title || '-'}</div>
                        <div className="text-xs text-[var(--color-ink-soft)] truncate max-w-[200px]">{item.achievement_detail}</div>
                      </td>
                      <td className="p-4">
                        {item.category ? (
                          <Badge variant="outline">{item.category}</Badge>
                        ) : (
                          <span className="text-[var(--color-ink-soft)] italic">-</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => toggleFeatured(item.id, item.is_featured)}
                          className="p-1.5 rounded-md hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]"
                          title={item.is_featured ? "Hapus dari halaman utama" : "Tampilkan di halaman utama"}
                        >
                          <Star className={`w-5 h-5 ${item.is_featured ? "fill-[var(--color-accent-yellow)] text-[var(--color-accent-yellow)]" : "text-[var(--color-line)]"}`} />
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(item)} className="px-2 text-[var(--color-brand-blue)]">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="px-2 text-[var(--color-danger-red)]">
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
