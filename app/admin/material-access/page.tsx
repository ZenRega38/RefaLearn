"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { formatPrice } from "@/lib/pricing";
import { formatTimestamp } from "@/lib/format";
import { Gift, Search, User, Trash2, GraduationCap, BookOpen, RefreshCw } from "lucide-react";

type Student = { id: string; full_name: string; phone: string | null };
type Material = { id: string; title: string; category: string; price: number; is_active: boolean; course_slug: string | null };
type Order = { id: string; material_ids: string[]; status: string; source: "purchase" | "grant"; note: string | null; created_at: string };

const errorText = (err: unknown) => (err instanceof Error ? err.message : "Terjadi kesalahan.");

export default function AdminMaterialAccessPage() {
  const [supabase] = useState(() => createClient());
  const [students, setStudents] = useState<Student[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Student | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [toGrant, setToGrant] = useState<Set<string>>(new Set());
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      supabase.from("profiles").select("id, full_name, phone").eq("role", "student").order("full_name"),
      supabase.from("materials").select("id, title, category, price, is_active, course_slug").order("title"),
    ]).then(([s, m]) => {
      setStudents((s.data || []) as Student[]);
      setMaterials((m.data || []) as Material[]);
    });
  }, [supabase]);

  const loadOrders = useCallback(async (studentId: string) => {
    setLoadingOrders(true);
    const { data } = await supabase
      .from("material_orders")
      .select("id, material_ids, status, source, note, created_at")
      .eq("student_id", studentId)
      .order("created_at", { ascending: false });
    setOrders((data || []) as Order[]);
    setLoadingOrders(false);
  }, [supabase]);

  const choose = (s: Student) => {
    setSelected(s);
    setToGrant(new Set());
    setNote("");
    setMessage(null);
    loadOrders(s.id);
  };

  const titleOf = useMemo(() => new Map(materials.map((m) => [m.id, m])), [materials]);
  const ownedIds = new Set(orders.filter((o) => ["pending", "proof_uploaded", "confirmed"].includes(o.status)).flatMap((o) => o.material_ids));
  const filtered = students.filter((s) => `${s.full_name} ${s.phone ?? ""}`.toLowerCase().includes(search.toLowerCase()));

  const grant = async () => {
    if (!selected || toGrant.size === 0) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/material-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: selected.id, materialIds: [...toGrant], note }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setMessage(`${json.granted} materi berhasil diberikan ke ${selected.full_name}. Siswa juga menerima email pemberitahuan.`);
      setToGrant(new Set());
      setNote("");
      loadOrders(selected.id);
    } catch (err) {
      setMessage(`Gagal: ${errorText(err)}`);
    } finally {
      setSaving(false);
    }
  };

  const revoke = async (order: Order) => {
    if (!window.confirm("Cabut akses materi ini dari siswa? Progres belajarnya tetap tersimpan jika nanti diberi akses lagi.")) return;
    const res = await fetch("/api/admin/material-access", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: order.id }),
    });
    const json = await res.json();
    if (!res.ok) alert(`Gagal mencabut akses: ${json.error}`);
    if (selected) loadOrders(selected.id);
  };

  return (
    <PaperBackground className="p-4 md:p-8 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)] flex items-center gap-2">
            <Gift className="w-8 h-8" /> Akses Materi
          </h1>
          <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] mt-1">
            Berikan materi atau kursus ke siswa tertentu tanpa perlu membeli — misalnya untuk siswa les privat, beasiswa, atau uji coba.
          </p>
        </div>

        <div className="grid md:grid-cols-[300px_1fr] gap-6 items-start">
          {/* Student list */}
          <Card className="p-0 overflow-hidden">
            <div className="p-3 border-b border-[var(--color-line)]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-soft)]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nama / nomor siswa..."
                  className="w-full pl-9 pr-3 py-2 text-sm bg-[var(--color-paper-bg-alt)] border border-[var(--color-line)] rounded-md focus:outline-none focus:border-[var(--color-brand-blue)] font-[var(--font-inter)]"
                />
              </div>
            </div>
            <ul className="max-h-[60vh] overflow-y-auto divide-y divide-[var(--color-line)] font-[var(--font-inter)]">
              {filtered.length === 0 && <li className="p-4 text-sm text-[var(--color-ink-soft)]">Tidak ada siswa.</li>}
              {filtered.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => choose(s)}
                    className={`w-full text-left flex items-center gap-3 p-3 hover:bg-[var(--color-paper-bg-alt)] ${selected?.id === s.id ? "bg-[var(--color-brand-blue)]/10 border-l-4 border-[var(--color-brand-blue)]" : "border-l-4 border-transparent"}`}
                  >
                    <User className="w-4 h-4 text-[var(--color-ink-soft)] shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-[var(--color-ink)] truncate">{s.full_name}</span>
                      <span className="block text-xs text-[var(--color-ink-soft)]">{s.phone || "-"}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          {/* Selected student */}
          {!selected ? (
            <Card className="text-center py-16 text-[var(--color-ink-soft)] font-[var(--font-inter)]">
              Pilih siswa di sebelah kiri.
            </Card>
          ) : (
            <div className="space-y-6">
              <Card variant="sketch" className="space-y-3">
                <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)]">Materi milik {selected.full_name}</h2>
                {loadingOrders ? (
                  <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] flex items-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> Memuat...</p>
                ) : orders.length === 0 ? (
                  <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">Belum punya materi apa pun.</p>
                ) : (
                  <ul className="divide-y divide-[var(--color-line)] font-[var(--font-inter)] text-sm">
                    {orders.map((o) => (
                      <li key={o.id} className="py-2.5 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          {o.material_ids.map((id) => (
                            <p key={id} className="font-semibold text-[var(--color-ink)] truncate">{titleOf.get(id)?.title ?? "Materi dihapus"}</p>
                          ))}
                          <p className="text-xs text-[var(--color-ink-soft)]">
                            {formatTimestamp(o.created_at, "dd MMM yyyy")} {o.note && `· ${o.note}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {o.source === "grant" ? (
                            <Badge variant="green">Diberikan admin</Badge>
                          ) : (
                            <Badge variant={o.status === "confirmed" ? "blue" : o.status === "rejected" ? "red" : "amber"}>
                              {o.status === "confirmed" ? "Dibeli" : o.status === "rejected" ? "Ditolak" : "Proses bayar"}
                            </Badge>
                          )}
                          {o.source === "grant" && (
                            <Button variant="ghost" size="sm" onClick={() => revoke(o)} className="px-2 text-[var(--color-danger-red)]" aria-label="Cabut akses">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>

              <Card variant="sketch" className="space-y-4">
                <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)]">Berikan materi</h2>
                <ul className="grid sm:grid-cols-2 gap-2 font-[var(--font-inter)]">
                  {materials.map((m) => {
                    const owned = ownedIds.has(m.id);
                    const checked = toGrant.has(m.id);
                    return (
                      <li key={m.id}>
                        <label className={`flex items-start gap-3 p-3 rounded-[var(--radius-sketch)] border-2 cursor-pointer ${owned ? "opacity-50 cursor-not-allowed border-[var(--color-line)]" : checked ? "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)]/5" : "border-[var(--color-line)] bg-white"}`}>
                          <input
                            type="checkbox"
                            disabled={owned}
                            checked={checked}
                            onChange={() => setToGrant((prev) => {
                              const next = new Set(prev);
                              if (next.has(m.id)) next.delete(m.id); else next.add(m.id);
                              return next;
                            })}
                            className="mt-1"
                          />
                          <span className="min-w-0">
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-[var(--color-ink)]">
                              {m.course_slug ? <GraduationCap className="w-4 h-4 text-[var(--color-brand-blue)] shrink-0" /> : <BookOpen className="w-4 h-4 text-[var(--color-ink-soft)] shrink-0" />}
                              <span className="truncate">{m.title}</span>
                            </span>
                            <span className="block text-xs text-[var(--color-ink-soft)]">
                              {m.category} · {m.price === 0 ? "Gratis" : formatPrice(m.price)}
                              {!m.is_active && " · nonaktif"}
                              {owned && " · sudah dimiliki"}
                            </span>
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
                <Input label="Catatan (opsional)" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Misal: siswa les privat kelas 3, semester 1" />
                {message && <p className="text-sm font-[var(--font-inter)] text-[var(--color-ink)]">{message}</p>}
                <div className="flex justify-end">
                  <Button onClick={grant} isLoading={saving} disabled={toGrant.size === 0}>
                    <Gift className="w-4 h-4" /> Berikan {toGrant.size > 0 ? `${toGrant.size} materi` : ""}
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </PaperBackground>
  );
}
