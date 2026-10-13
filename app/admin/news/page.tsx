"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { Plus, Edit2, Trash2, ExternalLink, RefreshCw, Star, Video, CheckCircle2, AlertTriangle } from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { slugify, splitCategories } from "@/lib/format";
import { isBrokenVideo, youtubeId, youtubeProblem, youtubeThumbnail, type YoutubeCheck } from "@/lib/youtube";

type NewsPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: 'draft' | 'published';
  published_at: string | null;
  youtube_url: string | null;
};

/** Server-side check of video links (exists, public, embeddable). */
async function checkVideos(urls: string[]): Promise<Record<string, YoutubeCheck | null>> {
  if (urls.length === 0) return {};
  try {
    const res = await fetch('/api/youtube/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls }),
    });
    if (!res.ok) return {};
    return (await res.json()).results ?? {};
  } catch {
    return {};
  }
}

/** White "!" in a yellow circle: the post's video link is broken. */
function VideoWarningDot() {
  return (
    <span
      title="Link video YouTube bermasalah — video tidak tampil untuk pembaca"
      aria-label="Link video YouTube bermasalah"
      className="inline-flex shrink-0 w-5 h-5 rounded-full bg-[var(--color-accent-yellow)] text-white text-xs font-black items-center justify-center shadow-sm ring-1 ring-[var(--color-warning-amber)]"
    >
      !
    </span>
  );
}

export default function AdminNewsPage() {
  const [supabase] = useState(() => createClient());
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Up to 3 post IDs shown in the "Sorotan" section of the public About
  // page, in this order. Stored as one JSON row in site_settings rather
  // than a column on news_posts, since it's about the About page's layout,
  // not a property of the post itself.
  const [featuredIds, setFeaturedIds] = useState<string[]>([]);

  // Editor state
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoCheck, setVideoCheck] = useState<{ url: string; result: YoutubeCheck | null } | null>(null);
  // Broken video links in the list, by post id.
  const [brokenVideos, setBrokenVideos] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  // Kept from the loaded post so editing never changes its URL or its
  // original publish date.
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [publishedAt, setPublishedAt] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from('news_posts')
      .select('id, title, slug, category, status, published_at, youtube_url')
      .order('created_at', { ascending: false });

    if (!error && data) {
      const list = data as NewsPost[];
      setPosts(list);
      const results = await checkVideos(list.map((p) => p.youtube_url ?? '').filter(Boolean));
      setBrokenVideos(new Set(list.filter((p) => p.youtube_url && isBrokenVideo(results[p.youtube_url])).map((p) => p.id)));
    }
    setLoading(false);
  }, [supabase]);

  const fetchFeatured = useCallback(async () => {
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'about_featured_news')
      .maybeSingle();

    const ids = (data?.value as { post_ids?: string[] } | undefined)?.post_ids;
    setFeaturedIds(Array.isArray(ids) ? ids : []);
  }, [supabase]);

  // Toggles a post in/out of the About page's "Sorotan" section (max 3,
  // order = the order they were added in). Only published posts can be
  // featured — an About page visitor would otherwise hit a card for a post
  // that silently doesn't render.
  const toggleFeatured = async (post: NewsPost) => {
    if (post.status !== 'published') {
      alert('Hanya berita berstatus "published" yang bisa dijadikan Sorotan.');
      return;
    }

    const isFeatured = featuredIds.includes(post.id);
    let next: string[];

    if (isFeatured) {
      next = featuredIds.filter((id) => id !== post.id);
    } else {
      if (featuredIds.length >= 3) {
        alert('Maksimal 3 berita Sorotan. Hapus salah satu dulu sebelum menambah yang baru.');
        return;
      }
      next = [...featuredIds, post.id];
    }

    // Optimistic — update the UI immediately, roll back if the save fails.
    setFeaturedIds(next);

    const { error } = await supabase
      .from('site_settings')
      .upsert({ key: 'about_featured_news', value: { post_ids: next } }, { onConflict: 'key' });

    if (error) {
      setFeaturedIds(featuredIds); // roll back
      alert(`Gagal menyimpan: ${error.message}`);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load
    fetchPosts();
    fetchFeatured();
  }, [fetchPosts, fetchFeatured]);

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
      setYoutubeUrl(data.youtube_url || "");
      setStatus(data.status);
      setCurrentSlug(data.slug);
      setPublishedAt(data.published_at);
      setIsEditing(true);
    }
  };

  const trimmedVideo = youtubeUrl.trim();
  useEffect(() => {
    if (!isEditing || !trimmedVideo) return;
    // A link that doesn't even parse needs no server round trip.
    if (!youtubeId(trimmedVideo)) return;
    const timer = window.setTimeout(async () => {
      const results = await checkVideos([trimmedVideo]);
      setVideoCheck({ url: trimmedVideo, result: results[trimmedVideo] ?? null });
    }, 600);
    return () => window.clearTimeout(timer);
  }, [isEditing, trimmedVideo]);

  const videoStatus: YoutubeCheck | 'checking' | null = !trimmedVideo
    ? null
    : !youtubeId(trimmedVideo)
      ? { ok: false, reason: 'format' }
      : videoCheck?.url === trimmedVideo
        ? videoCheck.result
        : 'checking';

  const handleCreateNew = () => {
    setCurrentId(null);
    setTitle("");
    setCategory("");
    setContent("");
    setCoverUrl("");
    setYoutubeUrl("");
    setStatus("draft");
    setCurrentSlug(null);
    setPublishedAt(null);
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

    const slug = currentSlug || slugify(title);

    const postData = {
      title,
      slug,
      // Stored as one text field; normalize spacing so "a,b ,  c" saves as "a, b, c".
      category: splitCategories(category).join(", "),
      content,
      cover_image_url: coverUrl,
      youtube_url: youtubeUrl.trim() || null,
      status,
      // First publish stamps the date; later edits keep it.
      published_at: status === 'published' ? (publishedAt || new Date().toISOString()) : publishedAt,
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
      alert(error.message.includes('duplicate key') ? 'Judul/slug ini sudah dipakai berita lain. Gunakan judul berbeda.' : `Gagal menyimpan: ${error.message}`);
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <h1 className="text-2xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">
              {currentId ? "Edit Story" : "Tulis Story Baru"}
            </h1>
            <div className="flex gap-2 self-end sm:self-auto">
              <Button variant="ghost" onClick={handleCancel}>Batal</Button>
              <Button onClick={handleSave} isLoading={saving}>Simpan</Button>
            </div>
          </div>

          <Card variant="sketch" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Judul Story"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul..."
                required
              />
              <Input
                label="Kategori"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Pisahkan dengan koma, misal: Tips Belajar, Pengumuman"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ImageUploadField label="Cover Image (Opsional)" value={coverUrl} onChange={setCoverUrl} folder="news" />
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
                Konten Story
              </label>
              <RichTextEditor
                content={content}
                onChange={setContent}
              />
            </div>

            <div className="space-y-2">
              <Input
                label="Link Video YouTube (opsional)"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                icon={<Video className="w-4 h-4" />}
                placeholder="https://www.youtube.com/watch?v=… atau https://youtu.be/…"
                helperText="Tampil di bawah konten story, tidak autoplay. Kosongkan kalau tidak pakai video."
              />
              {videoStatus === 'checking' && (
                <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)] flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Mengecek video…
                </p>
              )}
              {videoStatus && videoStatus !== 'checking' && videoStatus.ok && (
                <div className="flex items-center gap-3 rounded-[var(--radius-card)] border border-[var(--color-success-green)]/40 bg-[var(--color-success-green)]/10 p-2 font-[var(--font-inter)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={youtubeThumbnail(videoStatus.id)} alt="" className="w-24 aspect-video object-cover rounded-md shrink-0" />
                  <p className="text-xs text-[var(--color-ink)] flex items-start gap-1.5 min-w-0">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[var(--color-success-green)]" />
                    <span className="line-clamp-2">Video ditemukan{videoStatus.title ? `: ${videoStatus.title}` : ""}</span>
                  </p>
                </div>
              )}
              {videoStatus && videoStatus !== 'checking' && !videoStatus.ok && (
                <p className="flex items-start gap-2 rounded-[var(--radius-card)] border border-[var(--color-warning-amber)]/50 bg-[var(--color-accent-yellow)]/15 p-3 text-xs text-[var(--color-ink)] font-[var(--font-inter)]">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-[var(--color-warning-amber)]" />
                  {youtubeProblem(videoStatus)}
                </p>
              )}
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
            <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">
              Manajemen Stories
            </h1>
            <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)] mt-1">
              <Star className="w-3 h-3 inline -mt-0.5 mr-1" fill="currentColor" />
              {featuredIds.length}/3 Sorotan terpilih untuk halaman About
            </p>
          </div>
          <Button onClick={handleCreateNew} className="gap-2">
            <Plus className="w-4 h-4" /> Tulis Baru
          </Button>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="responsive-table w-full text-left font-[var(--font-inter)] text-sm border-collapse">
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
                      Belum ada berita. Klik &quot;Tulis Baru&quot; untuk membuat postingan pertama.
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr key={post.id} className="border-b border-[var(--color-line)] hover:bg-[var(--color-paper-bg-alt)]/50 transition-colors">
                      <td className="p-4" data-label="Judul">
                        <div className="font-semibold text-[var(--color-ink)] mb-1 flex items-start gap-2">
                          <span>{post.title}</span>
                          {brokenVideos.has(post.id) && <VideoWarningDot />}
                        </div>
                        <div className="text-xs text-[var(--color-ink-soft)] truncate max-w-xs">{post.slug}</div>
                      </td>
                      <td className="p-4" data-label="Kategori">
                        {splitCategories(post.category).length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {splitCategories(post.category).map((cat) => (
                              <span key={cat} className="bg-white border border-[var(--color-line)] px-2 py-1 rounded text-xs">{cat}</span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[var(--color-ink-soft)] italic">-</span>
                        )}
                      </td>
                      <td className="p-4" data-label="Status">
                        <Badge variant={post.status === 'published' ? 'green' : 'amber'}>
                          {post.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right" data-label="Aksi">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFeatured(post)}
                            className={`px-2 ${featuredIds.includes(post.id) ? "text-[var(--color-accent-yellow)]" : "text-[var(--color-ink-soft)]"}`}
                            title={featuredIds.includes(post.id) ? "Featured di halaman About — klik untuk lepas" : "Jadikan Sorotan di halaman About (maks. 3)"}
                          >
                            <Star className="w-4 h-4" fill={featuredIds.includes(post.id) ? "currentColor" : "none"} />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => window.open(`/stories/${post.slug}`, '_blank')} className="px-2" title="Lihat di publik">
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