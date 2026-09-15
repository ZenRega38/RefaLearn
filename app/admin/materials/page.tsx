"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { Plus, Edit2, Trash2, ExternalLink, RefreshCw, BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/pricing";

type Material = {
  id: string;
  title: string;
  slug: string;
  category: string;
  price: number;
  is_active: boolean;
  cover_image_url: string;
};

export default function AdminMaterialsPage() {
  const supabase = createClient();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Editor state
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(100000);
  const [fileUrl, setFileUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchMaterials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('materials')
      .select('id, title, slug, category, price, is_active, cover_image_url')
      .order('created_at', { ascending: false });
      
    if (!error && data) {
      setMaterials(data as Material[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleEdit = async (id: string) => {
    const { data, error } = await supabase
      .from('materials')
      .select('*')
      .eq('id', id)
      .single();
      
    if (data && !error) {
      setCurrentId(data.id);
      setTitle(data.title);
      setCategory(data.category || "");
      setDescription(data.description || "");
      setPrice(data.price);
      setFileUrl(data.file_url || "");
      setCoverUrl(data.cover_image_url || "");
      setIsActive(data.is_active);
      setIsEditing(true);
    }
  };

  const handleCreateNew = () => {
    setCurrentId(null);
    setTitle("");
    setCategory("");
    setDescription("");
    setPrice(100000);
    setFileUrl("");
    setCoverUrl("");
    setIsActive(true);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!title.trim() || !category.trim()) {
      alert("Judul dan kategori wajib diisi");
      return;
    }

    setSaving(true);
    
    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const materialData = {
      title,
      slug,
      category,
      description,
      price,
      file_url: fileUrl,
      cover_image_url: coverUrl,
      is_active: isActive,
    };

    let error;
    if (currentId) {
      const { error: updateError } = await supabase
        .from('materials')
        .update(materialData)
        .eq('id', currentId);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('materials')
        .insert([materialData]);
      error = insertError;
    }

    setSaving(false);

    if (error) {
      console.error(error);
      alert(`Gagal menyimpan: ${error.message}`);
    } else {
      setIsEditing(false);
      fetchMaterials();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus materi ini?")) {
      const { error } = await supabase.from('materials').delete().eq('id', id);
      if (!error) {
        fetchMaterials();
      } else {
        alert(`Gagal menghapus: ${error.message}`);
      }
    }
  };

  if (isEditing) {
    return (
      <PaperBackground className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-[var(--font-kalam)] text-[var(--color-brand-blue)] flex items-center gap-2">
              <BookOpen className="w-6 h-6" /> {currentId ? "Edit Materi" : "Tambah Materi Baru"}
            </h1>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={handleCancel}>Batal</Button>
              <Button onClick={handleSave} isLoading={saving}>Simpan</Button>
            </div>
          </div>
          
          <Card variant="sketch" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Judul Materi"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Modul Grammar Basic"
                required
              />
              <Input
                label="Kategori"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Contoh: Modul, Worksheet, Video"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Harga (Rp)"
                type="number"
                value={price.toString()}
                onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                required
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">Status</label>
                <select 
                  className="input-field" 
                  value={isActive ? "active" : "inactive"} 
                  onChange={(e) => setIsActive(e.target.value === "active")}
                >
                  <option value="active">Aktif (Tersedia)</option>
                  <option value="inactive">Nonaktif (Sembunyikan)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="URL Cover Image (Opsional)"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                placeholder="https://..."
              />
              <Input
                label="URL File / Akses (Misal: Google Drive)"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)] mb-1.5">
                Deskripsi
              </label>
              <RichTextEditor
                content={description}
                onChange={setDescription}
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
          <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)] flex items-center gap-2">
            <BookOpen className="w-8 h-8" /> Manajemen Materi
          </h1>
          <Button onClick={handleCreateNew} className="gap-2">
            <Plus className="w-4 h-4" /> Tambah Baru
          </Button>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-[var(--font-inter)] text-sm border-collapse">
              <thead>
                <tr className="bg-[var(--color-paper-bg-alt)] border-b border-[var(--color-line)]">
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)] w-[40%]">Judul</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Kategori</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Harga</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)] text-center">Status</th>
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
                ) : materials.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[var(--color-ink-soft)]">
                      Belum ada materi. Klik "Tambah Baru" untuk mengunggah materi pertama.
                    </td>
                  </tr>
                ) : (
                  materials.map((material) => (
                    <tr key={material.id} className="border-b border-[var(--color-line)] hover:bg-[var(--color-paper-bg-alt)]/50 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-[var(--color-ink)] mb-1">{material.title}</div>
                        <div className="text-xs text-[var(--color-ink-soft)] truncate max-w-xs">{material.slug}</div>
                      </td>
                      <td className="p-4">
                        <span className="bg-white border border-[var(--color-line)] px-2 py-1 rounded text-xs">{material.category}</span>
                      </td>
                      <td className="p-4 font-semibold">
                        {material.price === 0 ? "Gratis" : formatPrice(material.price)}
                      </td>
                      <td className="p-4 text-center">
                        <Badge variant={material.is_active ? 'green' : 'outline'}>
                          {material.is_active ? 'Aktif' : 'Nonaktif'}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => window.open(`/materials/${material.slug}`, '_blank')} className="px-2" title="Lihat di publik">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(material.id)} className="px-2 text-[var(--color-brand-blue)]">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(material.id)} className="px-2 text-[var(--color-danger-red)]">
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
