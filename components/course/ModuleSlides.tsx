"use client";

import { useRef, useState } from "react";
import { ExternalLink, Maximize2, Pencil, Presentation, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { slideEmbed } from "@/lib/slides";

type Props = {
  slug: string;
  levelId: string;
  levelTitle: string;
  /** The module's slide deck link, if one is attached. */
  url: string | null;
  /** The admin can attach, change or remove the link. */
  isAdmin: boolean;
  /** Re-fetch the course outline after a change. */
  onChanged: () => void;
};

/**
 * A module's slide deck (Google Slides, Drive PDF/PPTX, Canva…) shown in a
 * viewer on the course page. The admin attaches the link right here.
 */
export function ModuleSlides({ slug, levelId, levelTitle, url, isAdmin, onChanged }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const embed = slideEmbed(url);

  const save = async (next: string) => {
    if (next && !slideEmbed(next)) {
      setError("Link belum didukung. Pakai link Google Slides, Google Drive, Canva, atau file .pdf/.pptx.");
      return;
    }
    if (!next && !window.confirm(`Hapus slide dari "${levelTitle}"?`)) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/course-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, levelId, url: next }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setEditing(false);
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan slide.");
    } finally {
      setBusy(false);
    }
  };

  const startEdit = () => {
    setDraft(url ?? "");
    setError(null);
    setEditing(true);
  };

  if (!embed && !isAdmin) return null;

  const form = editing && (
    <form
      className="space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        save(draft.trim());
      }}
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="url"
          inputMode="url"
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="https://docs.google.com/presentation/d/… atau https://drive.google.com/file/d/…"
          className="flex-1 min-w-0 rounded-md border-2 border-[var(--color-line)] bg-white px-3 py-1.5 text-sm focus:border-[var(--color-brand-blue)] focus:outline-none"
        />
        <div className="flex gap-2 shrink-0">
          <Button type="submit" size="sm" isLoading={busy} disabled={!draft.trim()}>Simpan</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => setEditing(false)} disabled={busy}>Batal</Button>
        </div>
      </div>
      <p className="text-xs text-[var(--color-ink-soft)]">
        Google Slides, file di Google Drive (PPT/PPTX/PDF), Canva, atau link langsung ke file .pdf/.pptx.
        Untuk Google, atur aksesnya ke <strong>&ldquo;Siapa saja yang memiliki link&rdquo;</strong> supaya peserta bisa melihatnya.
      </p>
    </form>
  );

  // Admin, no deck yet: a slim bar to attach one.
  if (!embed) {
    return (
      <div className="rounded-[var(--radius-card)] border-2 border-dashed border-[var(--color-brand-blue)]/40 bg-[var(--color-brand-blue)]/5 px-4 py-3 font-[var(--font-inter)] space-y-2">
        {editing ? form : (
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="flex items-center gap-2 text-[var(--color-ink-soft)]">
              <Presentation className="w-4 h-4 text-[var(--color-brand-blue)]" /> Belum ada slide untuk modul ini.
            </span>
            <Button size="sm" variant="secondary" onClick={startEdit}><Plus className="w-4 h-4" /> Tambah slide</Button>
          </div>
        )}
        {error && <p className="text-xs text-[var(--color-danger-red)]">{error}</p>}
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-card)] border-2 border-[var(--color-line)] bg-white overflow-hidden font-[var(--font-inter)]">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b border-[var(--color-line)]">
        <span className="flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)]">
          <Presentation className="w-4 h-4 text-[var(--color-brand-blue)]" /> Slide materi
        </span>
        <div className="flex flex-wrap items-center gap-1">
          <Button size="sm" variant="ghost" onClick={() => frame.current?.requestFullscreen?.().catch(() => {})} title="Layar penuh">
            <Maximize2 className="w-4 h-4" /> <span className="hidden sm:inline">Layar penuh</span>
          </Button>
          <a
            href={embed.openUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-bg-alt)] hover:text-[var(--color-ink)] rounded-md"
          >
            <ExternalLink className="w-4 h-4" /> <span className="hidden sm:inline">Buka di tab baru</span>
          </a>
          {isAdmin && !editing && (
            <>
              <Button size="sm" variant="ghost" onClick={startEdit} title="Ganti link"><Pencil className="w-4 h-4" /></Button>
              <Button size="sm" variant="ghost" onClick={() => save("")} isLoading={busy} title="Hapus slide"><Trash2 className="w-4 h-4" /></Button>
            </>
          )}
        </div>
      </div>
      {(form || error) && (
        <div className="px-4 py-3 border-b border-[var(--color-line)] bg-[var(--color-brand-blue)]/5 space-y-2">
          {form}
          {error && <p className="text-xs text-[var(--color-danger-red)]">{error}</p>}
        </div>
      )}
      <div ref={frame} className={`bg-[var(--color-paper-bg-alt)] ${embed.shape === "tall" ? "h-[75vh]" : "aspect-video"}`}>
        <iframe
          key={embed.embedUrl}
          src={embed.embedUrl}
          title={`Slide ${levelTitle}`}
          loading="lazy"
          allow="fullscreen"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
