"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { Plus, Edit2, Trash2, Eye, ExternalLink, RefreshCw } from "lucide-react";

type NewsPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: 'draft' | 'published';
  published_at: string | null;
};

export default function AdminNewsPage() {
  const supabase = createClient();
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Editor state
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [saving, setSaving] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('news_posts')
      .select('id, title, slug, category, status, published_at')
      .order('created_at', { ascending: false });
      
    if (!error && data) {
      setPosts(data as NewsPost[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = async (id: string) => {
    const { data, error } = await supabase
      .from('news_posts')
      .select('*')
      .eq('id', id)
      .single();
      
    if (data && !error) {
      setCurrentId(data.id);
      setTitle(data.title);
      setCategory(data.category || "");
      setContent(data.content);
      setCoverUrl(data.cover_image_url || "");
      setStatus(data.status);
      setIsEditing(true);
    }
  };

  const handleCreateNew = () => {
    setCurrentId(null);
    setTitle("");
    setCategory("");
    setContent("");
    setCoverUrl("");
    setStatus("draft");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Judul wajib diisi");
      return;
    }

    setSaving(true);
    
    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const postData = {
      title,
      slug,
      category,
      content,
      cover_image_url: coverUrl,
      status,
      published_at: status === 'published' ? new Date().toISOString() : null
    };

    let error;
    if (currentId) {
      const { error: updateError } = await supabase
        .from('news_posts')
        .update(postData)
        .eq('id', currentId);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('news_posts')
        .insert([postData]);
      error = insertError;
    }

    setSaving(false);

    if (error) {
      console.error(error);
      alert(`Gagal menyimpan: ${error.message}`);
    } else {
      setIsEditing(false);
      fetchPosts();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      const { error } = await supabase.from('news_posts').delete().eq('id', id);
      if (!error) {
        fetchPosts();
      }
    }
  };

  if (isEditing) {
    return (
      <PaperBackground className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">
              {currentId ? "Edit Berita" : "Tulis Berita Baru"}
            </h1>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={handleCancel}>Batal</Button>
              <Button onClick={handleSave} isLoading={saving}>Simpan</Button>
            </div>
          </div>
          
          <Card variant="sketch" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Judul Berita"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul..."
                required
              />
              <Input
                label="Kategori"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Tips Belajar, Pengumuman, dll"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="URL Cover Image (Opsional)"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                placeholder="https://..."
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">Status Publikasi</label>
                <select 
                  className="input-field" 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                >
                  <option value="draft">Draft (Sembunyikan)</option>
                  <option value="published">Publish (Tampilkan)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)] mb-1.5">
                Konten Berita
              </label>
              <RichTextEditor
                content={content}
                onChange={setContent}
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
          <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">
            Manajemen Berita
          </h1>
          <Button onClick={handleCreateNew} className="gap-2">
            <Plus className="w-4 h-4" /> Tulis Baru
          </Button>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-[var(--font-inter)] text-sm border-collapse">
              <thead>
                <tr className="bg-[var(--color-paper-bg-alt)] border-b border-[var(--color-line)]">
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)] w-[40%]">Judul</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Kategori</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Status</th>
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
                ) : posts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-[var(--color-ink-soft)]">
                      Belum ada berita. Klik "Tulis Baru" untuk membuat postingan pertama.
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr key={post.id} className="border-b border-[var(--color-line)] hover:bg-[var(--color-paper-bg-alt)]/50 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-[var(--color-ink)] mb-1">{post.title}</div>
                        <div className="text-xs text-[var(--color-ink-soft)] truncate max-w-xs">{post.slug}</div>
                      </td>
                      <td className="p-4">
                        {post.category ? (
                          <span className="bg-white border border-[var(--color-line)] px-2 py-1 rounded text-xs">{post.category}</span>
                        ) : (
                          <span className="text-[var(--color-ink-soft)] italic">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        <Badge variant={post.status === 'published' ? 'green' : 'amber'}>
                          {post.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => window.open(`/news/${post.slug}`, '_blank')} className="px-2" title="Lihat di publik">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(post.id)} className="px-2 text-[var(--color-brand-blue)]">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)} className="px-2 text-[var(--color-danger-red)]">
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
