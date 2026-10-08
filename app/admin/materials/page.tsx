"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { Plus, Edit2, Trash2, ExternalLink, RefreshCw, BookOpen, FileUp, FileCheck, Tag, X } from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { slugify } from "@/lib/format";
import { COURSES } from "@/lib/course/registry";
import { formatPrice } from "@/lib/pricing";
import { uploadMaterialFile } from "@/lib/storage";

type Material = {
  id: string;
  title: string;
  slug: string;
  category: string;
  price: number;
  is_active: boolean;
  cover_image_url: string;
};

const errorText = (err: unknown) => (err instanceof Error ? err.message : "Terjadi kesalahan.");

export default function AdminMaterialsPage() {
  const [supabase] = useState(() => createClient());
  // Admin-managed category list (agent.md 6.9) — stored in site_settings,
  // never hardcoded.
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  // Editor state
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(100000);
  const [fileUrl, setFileUrl] = useState<string | null>(null); // existing stored path, if any
  const [newFile, setNewFile] = useState<File | null>(null);   // a freshly picked file, not yet uploaded
  const [coverUrl, setCoverUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [courseSlug, setCourseSlug] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchMaterials = useCallback(async () => {
    const { data, error } = await supabase
      .from('materials')
      .select('id, title, slug, category, price, is_active, cover_image_url')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMaterials(data as Material[]);
    }
    setLoading(false);
  }, [supabase]);

  const fetchCategories = useCallback(async () => {
    const { data } = await supabase.from('site_settings').select('value').eq('key', 'material_categories').maybeSingle();
    const list = (data?.value as { list?: string[] } | null)?.list;
    setCategoryList(Array.isArray(list) ? list : []);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load
    fetchMaterials();
    fetchCategories();
  }, [fetchMaterials, fetchCategories]);

  const saveCategories = async (next: string[]) => {
    const prev = categoryList;
    setCategoryList(next);
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key: 'material_categories', value: { list: next } }, { onConflict: 'key' });
    if (error) {
      setCategoryList(prev);
      alert(`Gagal menyimpan kategori: ${error.message}`);
    }
  };

  const addCategory = () => {
    const name = newCategory.trim();
    if (!name || categoryList.some((c) => c.toLowerCase() === name.toLowerCase())) return;
    saveCategories([...categoryList, name]);
    setNewCategory("");
  };

  const allCategories = Array.from(new Set([...categoryList, ...materials.map((m) => m.category).filter(Boolean)]));

  const handleEdit = async (id: string) => {
    const { data, error } = await supabase
      .from('materials')
      .select('*')
      .eq('id', id)
      .single();

    if (data && !error) {
      setCurrentId(data.id);
      setCurrentSlug(data.slug);
      setTitle(data.title);
      setCategory(data.category || "");
      setDescription(data.description || "");
      setPrice(data.price);
      setFileUrl(data.file_url || null);
      setNewFile(null);
      setCoverUrl(data.cover_image_url || "");
      setIsActive(data.is_active);
      setCourseSlug(data.course_slug || "");
      setIsEditing(true);
    }
  };

  const handleCreateNew = () => {
    setCurrentId(null);
    setCurrentSlug(null);
    setTitle("");
    setCategory("");
    setDescription("");
    setPrice(100000);
    setFileUrl(null);
    setNewFile(null);
    setCoverUrl("");
    setIsActive(true);
    setCourseSlug("");
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

    try {
      // A brand-new material needs its id decided before we can upload the
      // file (the upload path is prefixed with the material id so storage
      // RLS can match it against confirmed orders) — generate it client-side
      // and insert explicitly with that id rather than letting Postgres
      // default it.
      const id = currentId || crypto.randomUUID();

      let finalFileUrl = fileUrl;
      if (newFile) {
        finalFileUrl = await uploadMaterialFile(id, newFile);
      }

      // The slug is fixed once created so shared links keep working when
      // the title is edited later.
      const slug = currentSlug || slugify(title);

      const materialData = {
        title,
        slug,
        category,
        description,
        price,
        file_url: finalFileUrl,
        cover_image_url: coverUrl,
        is_active: isActive,
        course_slug: courseSlug || null,
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
          .insert([{ id, ...materialData }]);
        error = insertError;
      }

      if (error) throw error;

      setIsEditing(false);
      fetchMaterials();
    } catch (err) {
      console.error(err);
      const msg = errorText(err);
      alert(msg.includes('duplicate key') ? 'Judul/slug ini sudah dipakai materi lain. Gunakan judul berbeda.' : `Gagal menyimpan: ${msg}`);
    } finally {
      setSaving(false);
    }
  };

  // A material that appears in any order is never hard-deleted — buyers keep
  // permanent access, so it's hidden from the catalog instead.
  const handleDelete = async (id: string) => {
    const { data: orders } = await supabase
      .from('material_orders')
      .select('id')
      .contains('material_ids', [id])
      .limit(1);

    if (orders && orders.length > 0) {
      if (!window.confirm("Materi ini sudah pernah dibeli, jadi tidak bisa dihapus permanen. Sembunyikan dari katalog (nonaktifkan)? Pembeli tetap bisa mengunduhnya.")) return;
      const { error } = await supabase.from('materials').update({ is_active: false }).eq('id', id);
      if (error) alert(`Gagal menonaktifkan: ${error.message}`);
      fetchMaterials();
      return;
    }

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
              <div>
                <Input
                  label="Kategori"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Pilih atau ketik kategori"
                  list="material-categories"
                  required
                />
                <datalist id="material-categories">
                  {allCategories.map((c) => <option key={c} value={c} />)}
                </datalist>
              </div>
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
              <ImageUploadField label="Cover Image (Opsional)" value={coverUrl} onChange={setCoverUrl} folder="materials" />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                  File Materi (PDF)
                </label>
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setNewFile(e.target.files?.[0] || null)}
                />
                {newFile ? (
                  <p className="text-xs text-[var(--color-success-green)] font-[var(--font-inter)] flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5" /> Akan diunggah: {newFile.name}
                  </p>
                ) : fileUrl ? (
                  <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)] flex items-center gap-1">
                    <FileUp className="w-3.5 h-3.5" /> Sudah ada file tersimpan. Pilih file baru untuk menggantinya.
                  </p>
                ) : courseSlug ? (
                  <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                    Opsional — produk ini membuka kursus interaktif.
                  </p>
                ) : (
                  <p className="text-xs text-[var(--color-danger-red)] font-[var(--font-inter)]">
                    Belum ada file — siswa tidak akan bisa mengunduh sampai file diunggah.
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                Kursus Interaktif (Opsional)
              </label>
              <select className="input-field" value={courseSlug} onChange={(e) => setCourseSlug(e.target.value)}>
                <option value="">Tidak ada — materi file biasa</option>
                {COURSES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.title}</option>
                ))}
              </select>
              <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                Pembeli yang pembayarannya dikonfirmasi otomatis mendapat akses ke kursus ini di /learn.
              </p>
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

        <Card variant="sketch" className="p-5 mb-6 space-y-3">
          <h2 className="text-sm font-semibold text-[var(--color-brand-blue)] font-[var(--font-inter)] flex items-center gap-2">
            <Tag className="w-4 h-4" /> Kategori Materi
          </h2>
          <div className="flex flex-wrap gap-2">
            {categoryList.length === 0 && (
              <span className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">Belum ada kategori tersimpan.</span>
            )}
            {categoryList.map((c) => (
              <span key={c} className="bg-white border border-[var(--color-line)] px-2 py-1 rounded text-xs font-[var(--font-inter)] flex items-center gap-1">
                {c}
                <button onClick={() => saveCategories(categoryList.filter((x) => x !== c))} aria-label={`Hapus kategori ${c}`} className="text-[var(--color-danger-red)]">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2 max-w-md">
            <Input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Kategori baru, mis. SMA 10" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCategory(); } }} />
            <Button variant="secondary" onClick={addCategory} className="shrink-0">Tambah</Button>
          </div>
        </Card>

        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="responsive-table w-full text-left font-[var(--font-inter)] text-sm border-collapse">
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
                      Belum ada materi. Klik &quot;Tambah Baru&quot; untuk mengunggah materi pertama.
                    </td>
                  </tr>
                ) : (
                  materials.map((material) => (
                    <tr key={material.id} className="border-b border-[var(--color-line)] hover:bg-[var(--color-paper-bg-alt)]/50 transition-colors">
                      <td className="p-4" data-label="Judul">
                        <div className="font-semibold text-[var(--color-ink)] mb-1">{material.title}</div>
                        <div className="text-xs text-[var(--color-ink-soft)] truncate max-w-xs">{material.slug}</div>
                      </td>
                      <td className="p-4" data-label="Kategori">
                        <span className="bg-white border border-[var(--color-line)] px-2 py-1 rounded text-xs">{material.category}</span>
                      </td>
                      <td className="p-4 font-semibold" data-label="Harga">
                        {material.price === 0 ? "Gratis" : formatPrice(material.price)}
                      </td>
                      <td className="p-4 text-center" data-label="Status">
                        <Badge variant={material.is_active ? 'green' : 'outline'}>
                          {material.is_active ? 'Aktif' : 'Nonaktif'}
                        </Badge>
                      </td>
                      <td className="p-4 text-right" data-label="Aksi">
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