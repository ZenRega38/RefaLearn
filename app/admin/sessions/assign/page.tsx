"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/pricing";
import { formatDateStr, formatTimestamp, hhmm } from "@/lib/format";
import { APP_TIMEZONE_LABEL, todayStr } from "@/lib/time";
import {
  WEEK_ORDER,
  WEEKDAYS_ID,
  addDays,
  dayOfWeek,
  endTimeOf,
  isValidStart,
  planProblems,
  planSummary,
  type Repeat,
  type SchedulePlan,
} from "@/lib/schedule-plan";
import { ArrowLeft, CalendarPlus, AlertTriangle, RefreshCw, Repeat as RepeatIcon, Send, Square, X } from "lucide-react";

type Student = { id: string; full_name: string; phone: string | null };
type PreviewSession = { date: string; start_time: string; end_time: string; price: number; clash: "taken" | "blackout" | "past" | null };
type Preview = { summary: string; until: string; sessions: PreviewSession[]; missingProfile: string[] };
type Offer = {
  id: string;
  status: "pending" | "accepted" | "declined" | "cancelled";
  plan: SchedulePlan;
  sessions: unknown[];
  decline_reason: string | null;
  created_at: string;
  profiles: { full_name: string } | null;
};
type Series = {
  id: string;
  frequency: "weekly" | "monthly";
  day_of_week: number;
  day_of_month: number | null;
  start_time: string;
  end_date: string | null;
  generated_until: string | null;
  profiles: { full_name: string } | null;
};

const REPEAT_LABEL: Record<Repeat, string> = {
  none: "Tidak berulang (sekali)",
  daily: "Setiap hari",
  weekly: "Setiap minggu",
  monthly: "Setiap bulan",
};

const CLASH_LABEL = { taken: "Bentrok", blackout: "Libur", past: "Sudah lewat" } as const;
const STATUS_BADGE: Record<Offer["status"], { label: string; variant: "amber" | "green" | "red" | "outline" }> = {
  pending: { label: "Menunggu siswa", variant: "amber" },
  accepted: { label: "Disetujui", variant: "green" },
  declined: { label: "Ditolak", variant: "red" },
  cancelled: { label: "Dibatalkan", variant: "outline" },
};

/** Start time input with the computed end time beside it. */
function TimeWithEnd({ value, onChange, disabled }: { value: string; onChange: (v: string) => void; disabled?: boolean }) {
  return (
    <div className="flex items-center gap-2 font-[var(--font-inter)]">
      <input type="time" step={900} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} className="input-field !w-32 !py-2" />
      <span className="text-sm text-[var(--color-ink-soft)] whitespace-nowrap">
        → {isValidStart(value) ? endTimeOf(value) : "--:--"} <span className="text-xs">(90 menit)</span>
      </span>
    </div>
  );
}

export default function AssignSchedulePage() {
  const [supabase] = useState(() => createClient());
  const today = todayStr();

  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [studentId, setStudentId] = useState("");
  const [startDate, setStartDate] = useState(addDays(today, 1));
  const [repeat, setRepeat] = useState<Repeat>("weekly");
  const [time, setTime] = useState("16:00");
  const [dayTimes, setDayTimes] = useState<Partial<Record<number, string>>>({ [dayOfWeek(addDays(today, 1))]: "16:00" });
  const [ongoing, setOngoing] = useState(true);
  const [endDate, setEndDate] = useState("");
  const [note, setNote] = useState("");

  const [preview, setPreview] = useState<Preview | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const [offers, setOffers] = useState<Offer[]>([]);
  const [series, setSeries] = useState<Series[]>([]);

  const loadLists = useCallback(async () => {
    const [{ data: s }, { data: o }, { data: r }] = await Promise.all([
      supabase.from("profiles").select("id, full_name, phone").eq("role", "student").order("full_name"),
      supabase.from("schedule_offers").select("id, status, plan, sessions, decline_reason, created_at, profiles!schedule_offers_student_id_fkey(full_name)").order("created_at", { ascending: false }).limit(30),
      supabase
        .from("recurring_series")
        .select("id, frequency, day_of_week, day_of_month, start_time, end_date, generated_until, profiles(full_name)")
        .eq("status", "active")
        .not("offer_id", "is", null)
        .order("start_date", { ascending: false }),
    ]);
    setStudents((s || []) as Student[]);
    setOffers((o || []) as unknown as Offer[]);
    setSeries((r || []) as unknown as Series[]);
  }, [supabase, setStudents, setOffers, setSeries]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load
    loadLists();
  }, [loadLists]);

  const plan: SchedulePlan = useMemo(
    () => ({
      startDate,
      repeat,
      dayTimes: repeat === "daily" || repeat === "weekly" ? dayTimes : {},
      time,
      endDate: repeat !== "none" && !ongoing && endDate ? endDate : null,
    }),
    [startDate, repeat, dayTimes, time, ongoing, endDate]
  );
  const problems = useMemo(() => {
    const p = planProblems(plan, today);
    if (repeat !== "none" && !ongoing && !endDate) p.push("Isi tanggal akhir, atau centang “Tanpa tanggal akhir”.");
    return p;
  }, [plan, today, repeat, ongoing, endDate]);

  const changeRepeat = (next: Repeat) => {
    setRepeat(next);
    setPreview(null);
    if (next === "daily") setDayTimes(Object.fromEntries(WEEK_ORDER.map((d) => [d, dayTimes[d] || time])));
    if (next === "weekly" && Object.keys(dayTimes).length === 7) setDayTimes({ [dayOfWeek(startDate)]: time });
  };

  // Automatic preview whenever the form is complete.
  useEffect(() => {
    if (!studentId || problems.length > 0) return;
    const timer = window.setTimeout(async () => {
      setPreviewing(true);
      setPreviewError(null);
      try {
        const res = await fetch("/api/admin/schedule-offers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId, plan, checkOnly: true }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        setPreview(json as Preview);
      } catch (err) {
        setPreview(null);
        setPreviewError(err instanceof Error ? err.message : "Gagal membuat pratinjau.");
      } finally {
        setPreviewing(false);
      }
    }, 500);
    return () => window.clearTimeout(timer);
  }, [studentId, plan, problems.length]);

  const ready = preview?.sessions.filter((s) => !s.clash) ?? [];
  const skipped = (preview?.sessions.length ?? 0) - ready.length;

  const send = async () => {
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/schedule-offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, plan, note }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setResult(`Jadwal terkirim (${json.created} sesi${json.skipped ? `, ${json.skipped} dilewati` : ""}). Siswa perlu menyetujuinya di dashboard.`);
      setPreview(null);
      setNote("");
      loadLists();
    } catch (err) {
      setResult(err instanceof Error ? `Gagal: ${err.message}` : "Gagal mengirim jadwal.");
    } finally {
      setSending(false);
    }
  };

  const cancelOffer = async (id: string) => {
    if (!window.confirm("Batalkan jadwal ini? Siswa tidak bisa menyetujuinya lagi.")) return;
    const res = await fetch(`/api/admin/schedule-offers/${id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "cancel" }) });
    if (!res.ok) alert((await res.json()).error);
    loadLists();
  };

  const stopSeries = async (id: string) => {
    const from = window.prompt("Hentikan mulai tanggal (yyyy-mm-dd)? Sesi pada tanggal itu dan sesudahnya dibatalkan tanpa denda.", today);
    if (!from) return;
    const res = await fetch(`/api/admin/schedule-series/${id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "stop", from }) });
    const json = await res.json();
    if (!res.ok) alert(json.error);
    else alert(`Jadwal dihentikan. ${json.cancelled} sesi dibatalkan.`);
    loadLists();
  };

  const filtered = students.filter((s) => s.full_name.toLowerCase().includes(search.trim().toLowerCase()));
  const selected = students.find((s) => s.id === studentId);

  return (
    <PaperBackground className="p-4 md:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/admin/sessions" className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] font-[var(--font-inter)]">
          <ArrowLeft className="w-4 h-4" /> Sesi & Permintaan
        </Link>
        <div>
          <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)] flex items-center gap-2">
            <CalendarPlus className="w-7 h-7" /> Assign Jadwal ke Siswa
          </h1>
          <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] mt-1">
            Jadwal dikirim ke siswa dan aktif setelah siswa menyetujui perjanjian kelas di dashboard-nya. Setiap sesi berdurasi 90 menit.
          </p>
        </div>

        <Card variant="sketch" className="space-y-6 font-[var(--font-inter)]">
          {/* 1. Student */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[var(--color-ink)]">1. Siswa</h2>
            {selected ? (
              <div className="flex items-center justify-between gap-3 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper-bg-alt)] px-3 py-2">
                <span className="font-semibold text-[var(--color-ink)]">
                  {selected.full_name} <span className="text-xs font-normal text-[var(--color-ink-soft)]">{selected.phone}</span>
                </span>
                <button type="button" onClick={() => { setStudentId(""); setPreview(null); }} className="text-[var(--color-ink-soft)] hover:text-[var(--color-danger-red)]" aria-label="Ganti siswa">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama siswa…" className="input-field" />
                <div className="max-h-48 overflow-y-auto rounded-[var(--radius-card)] border border-[var(--color-line)] divide-y divide-[var(--color-line)] bg-white">
                  {filtered.length === 0 ? (
                    <p className="p-3 text-sm text-[var(--color-ink-soft)]">Tidak ada siswa.</p>
                  ) : (
                    filtered.map((s) => (
                      <button key={s.id} type="button" onClick={() => setStudentId(s.id)} className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--color-paper-bg-alt)]">
                        <span className="font-semibold text-[var(--color-ink)]">{s.full_name}</span>{" "}
                        <span className="text-xs text-[var(--color-ink-soft)]">{s.phone}</span>
                      </button>
                    ))
                  )}
                </div>
              </>
            )}
          </section>

          {/* 2. When */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-[var(--color-ink)]">2. Tanggal & pengulangan</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="space-y-1.5">
                <span className="text-sm font-semibold text-[var(--color-ink)]">Tanggal mulai</span>
                <input type="date" min={today} value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input-field" />
                {startDate && <span className="block text-xs text-[var(--color-ink-soft)]">{WEEKDAYS_ID[dayOfWeek(startDate)]}</span>}
              </label>
              <label className="space-y-1.5">
                <span className="text-sm font-semibold text-[var(--color-ink)]">Ulangi</span>
                <select value={repeat} onChange={(e) => changeRepeat(e.target.value as Repeat)} className="input-field">
                  {(Object.keys(REPEAT_LABEL) as Repeat[]).map((r) => (
                    <option key={r} value={r}>{REPEAT_LABEL[r]}</option>
                  ))}
                </select>
              </label>
            </div>
          </section>

          {/* 3. Times */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-[var(--color-ink)]">3. Jam</h2>
            {repeat === "none" || repeat === "monthly" ? (
              <div className="space-y-1.5">
                <span className="text-sm text-[var(--color-ink-soft)]">
                  {repeat === "monthly" ? `Setiap tanggal ${Number(startDate.slice(8, 10)) || "–"}, jam mulai:` : "Jam mulai:"}
                </span>
                <TimeWithEnd value={time} onChange={setTime} />
                {repeat === "monthly" && Number(startDate.slice(8, 10)) > 28 && (
                  <p className="text-xs text-[var(--color-warning-amber)]">Bulan yang tidak punya tanggal ini akan dilewati.</p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-[var(--color-ink-soft)]">
                  {repeat === "daily" ? "Setiap hari; jam boleh berbeda per hari. Hilangkan centang untuk melewati hari tertentu." : "Pilih hari, lalu atur jam mulai masing-masing."}
                </p>
                <div className="divide-y divide-[var(--color-line)] rounded-[var(--radius-card)] border border-[var(--color-line)] bg-white">
                  {WEEK_ORDER.map((d) => {
                    const on = !!dayTimes[d];
                    return (
                      <div key={d} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-3 py-2">
                        <label className="flex items-center gap-2 w-24 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={on}
                            onChange={(e) => setDayTimes((prev) => {
                              const next = { ...prev };
                              if (e.target.checked) next[d] = time;
                              else delete next[d];
                              return next;
                            })}
                            className="w-4 h-4 accent-[var(--color-brand-blue)]"
                          />
                          <span className={`text-sm font-semibold ${on ? "text-[var(--color-ink)]" : "text-[var(--color-ink-soft)]"}`}>{WEEKDAYS_ID[d]}</span>
                        </label>
                        {on && <TimeWithEnd value={dayTimes[d]!} onChange={(v) => setDayTimes((prev) => ({ ...prev, [d]: v }))} />}
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-ink-soft)]">
                  <span>Samakan semua hari terpilih ke jam</span>
                  <input type="time" step={900} value={time} onChange={(e) => setTime(e.target.value)} className="input-field !w-28 !py-1" />
                  <button
                    type="button"
                    onClick={() => setDayTimes((prev) => Object.fromEntries(Object.keys(prev).map((k) => [k, time])))}
                    className="font-semibold text-[var(--color-brand-blue)] hover:underline"
                  >
                    Terapkan
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* 4. End */}
          {repeat !== "none" && (
            <section className="space-y-2">
              <h2 className="text-sm font-bold text-[var(--color-ink)]">4. Sampai kapan</h2>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" checked={ongoing} onChange={(e) => setOngoing(e.target.checked)} className="mt-0.5 w-4 h-4 accent-[var(--color-brand-blue)]" />
                <span className="text-sm">
                  <span className="font-semibold text-[var(--color-ink)]">Tanpa tanggal akhir (berlanjut terus)</span>
                  <span className="block text-xs text-[var(--color-ink-soft)]">Sistem menyiapkan sesi ±2 bulan ke depan dan menambah sendiri setiap hari, sampai jadwal dihentikan.</span>
                </span>
              </label>
              {!ongoing && (
                <label className="block space-y-1.5 sm:w-1/2">
                  <span className="text-sm font-semibold text-[var(--color-ink)]">Tanggal akhir</span>
                  <input type="date" min={startDate} value={endDate} onChange={(e) => setEndDate(e.target.value)} className="input-field" />
                </label>
              )}
            </section>
          )}

          <label className="block space-y-1.5">
            <span className="text-sm font-semibold text-[var(--color-ink)]">Catatan untuk siswa (opsional)</span>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} maxLength={1000} className="input-field resize-y" placeholder="Misalnya: fokus persiapan Olympiad Regional." />
          </label>
        </Card>

        {/* Preview */}
        <Card variant="sketch" className="space-y-4 font-[var(--font-inter)]">
          <h2 className="text-lg font-bold text-[var(--color-ink)] flex items-center gap-2">
            Pratinjau {previewing && <RefreshCw className="w-4 h-4 animate-spin text-[var(--color-ink-soft)]" />}
          </h2>
          {!studentId ? (
            <p className="text-sm text-[var(--color-ink-soft)]">Pilih siswa dulu.</p>
          ) : problems.length > 0 ? (
            <ul className="list-disc pl-5 text-sm text-[var(--color-warning-amber)]">{problems.map((p) => <li key={p}>{p}</li>)}</ul>
          ) : previewError ? (
            <p className="text-sm text-[var(--color-danger-red)]">{previewError}</p>
          ) : preview ? (
            <>
              <p className="text-sm text-[var(--color-ink)]">
                <strong>{planSummary(plan)}</strong>
              </p>
              {preview.missingProfile.length > 0 && (
                <p className="flex items-start gap-2 rounded-[var(--radius-card)] border border-[var(--color-warning-amber)]/50 bg-[var(--color-warning-amber)]/10 p-3 text-xs text-[var(--color-ink)]">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-[var(--color-warning-amber)]" />
                  Profil siswa belum lengkap ({preview.missingProfile.join(", ")}). Jadwal tetap bisa dikirim, tapi siswa harus melengkapi profil sebelum bisa menyetujuinya.
                </p>
              )}
              <div className="max-h-80 overflow-y-auto rounded-[var(--radius-card)] border border-[var(--color-line)] divide-y divide-[var(--color-line)] bg-white">
                {preview.sessions.map((s) => (
                  <div key={`${s.date}-${s.start_time}`} className={`flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-3 py-2 text-sm ${s.clash ? "opacity-60" : ""}`}>
                    <span className={s.clash ? "line-through" : "text-[var(--color-ink)]"}>{formatDateStr(s.date, "EEE, dd MMM yyyy")}</span>
                    <span className="text-[var(--color-ink-soft)]">
                      {hhmm(s.start_time)}–{hhmm(s.end_time)} {APP_TIMEZONE_LABEL} · {formatPrice(s.price)}
                    </span>
                    {s.clash && <Badge variant={s.clash === "taken" ? "red" : "amber"}>{CLASH_LABEL[s.clash]}</Badge>}
                  </div>
                ))}
              </div>
              <p className="text-sm text-[var(--color-ink)]">
                <strong>{ready.length} sesi</strong> dikirim · total {formatPrice(ready.reduce((n, s) => n + s.price, 0))}
                {skipped > 0 && <span className="text-[var(--color-ink-soft)]"> · {skipped} dilewati (bentrok/libur/lewat)</span>}
                {plan.repeat !== "none" && !plan.endDate && (
                  <span className="flex items-center gap-1 text-xs text-[var(--color-brand-blue)] mt-1">
                    <RepeatIcon className="w-3.5 h-3.5" /> Sesi setelah {formatDateStr(preview.until, "dd MMM yyyy")} ditambahkan otomatis.
                  </span>
                )}
              </p>
              <Button onClick={send} isLoading={sending} disabled={ready.length === 0} className="w-full sm:w-auto">
                <Send className="w-4 h-4" /> Kirim ke Siswa
              </Button>
            </>
          ) : (
            <p className="text-sm text-[var(--color-ink-soft)]">Menyiapkan pratinjau…</p>
          )}
          {result && <p className="text-sm font-semibold text-[var(--color-brand-blue)]">{result}</p>}
        </Card>

        {/* Ongoing schedules */}
        {series.length > 0 && (
          <Card className="space-y-3 font-[var(--font-inter)]">
            <h2 className="text-lg font-bold text-[var(--color-ink)]">Jadwal berjalan</h2>
            <div className="divide-y divide-[var(--color-line)]">
              {series.map((s) => (
                <div key={s.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
                  <span>
                    <strong>{s.profiles?.full_name}</strong> ·{" "}
                    {s.frequency === "monthly" ? `tiap tanggal ${s.day_of_month}` : `tiap ${WEEKDAYS_ID[s.day_of_week]}`} {hhmm(s.start_time)}
                    <span className="text-[var(--color-ink-soft)]"> · {s.end_date ? `sampai ${formatDateStr(s.end_date, "dd MMM yyyy")}` : "berlanjut terus"}</span>
                  </span>
                  <Button size="sm" variant="ghost" onClick={() => stopSeries(s.id)} className="text-[var(--color-danger-red)]">
                    <Square className="w-3.5 h-3.5" /> Hentikan
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Sent schedules */}
        <Card className="space-y-3 font-[var(--font-inter)]">
          <h2 className="text-lg font-bold text-[var(--color-ink)]">Jadwal terkirim</h2>
          {offers.length === 0 ? (
            <p className="text-sm text-[var(--color-ink-soft)]">Belum ada.</p>
          ) : (
            <div className="divide-y divide-[var(--color-line)]">
              {offers.map((o) => (
                <div key={o.id} className="flex flex-wrap items-start justify-between gap-2 py-3 text-sm">
                  <div className="min-w-0 space-y-0.5">
                    <p>
                      <strong>{o.profiles?.full_name}</strong> · {planSummary(o.plan)}
                    </p>
                    <p className="text-xs text-[var(--color-ink-soft)]">
                      {o.sessions.length} sesi · dikirim {formatTimestamp(o.created_at, "dd MMM yyyy HH:mm")}
                      {o.decline_reason ? ` · alasan: ${o.decline_reason}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={STATUS_BADGE[o.status].variant}>{STATUS_BADGE[o.status].label}</Badge>
                    {o.status === "pending" && (
                      <Button size="sm" variant="ghost" onClick={() => cancelOffer(o.id)}>Batalkan</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </PaperBackground>
  );
}
