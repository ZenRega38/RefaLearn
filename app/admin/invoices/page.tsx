"use client";

import { useState, useEffect, useCallback, Fragment } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FileText, Check, X, RefreshCw, ExternalLink, ChevronDown } from "lucide-react";
import { DAY_TYPE_LABELS, formatPrice, type DayType } from "@/lib/pricing";
import { formatDateStr, formatTimestamp, hhmm, monthLabel, monthName } from "@/lib/format";
import { previousPeriod } from "@/lib/time";
import { getSignedProofUrl } from "@/lib/storage";

type Invoice = {
  id: string;
  student_id: string;
  period_month: number;
  period_year: number;
  session_ids: string[];
  total_amount: number;
  fee_amount: number;
  status: 'draft' | 'sent' | 'proof_uploaded' | 'confirmed' | 'overdue' | 'rejected';
  proof_url: string | null; // storage PATH — see lib/storage.ts
  generated_at: string;
  profiles: { full_name: string; phone: string } | null;
};

type LineItem = { id: string; date: string; start_time: string; day_type: DayType; price: number };

const errorText = (err: unknown) => (err instanceof Error ? err.message : "Terjadi kesalahan.");

export default function AdminInvoicesPage() {
  const [supabase] = useState(() => createClient());
  const [lineItems, setLineItems] = useState<Record<string, LineItem>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending_proof' | 'review' | 'overdue' | 'confirmed'>('review');
  const [viewingId, setViewingId] = useState<string | null>(null);

  // "Generate Now" — manual trigger for the monthly invoice run (agent.md
  // 6.6). Defaults to last calendar month, which is the normal case; the
  // month/year selects exist for the edge case of generating an older or
  // catch-up period (e.g. a session marked completed late).
  const defaultPeriod = previousPeriod();
  const [genMonth, setGenMonth] = useState(defaultPeriod.month);
  const [genYear, setGenYear] = useState(defaultPeriod.year);
  const [generating, setGenerating] = useState(false);
  const [genResult, setGenResult] = useState<{ created: number; skipped: number } | null>(null);

  const handleGenerateInvoices = async () => {
    setGenerating(true);
    setGenResult(null);
    try {
      const res = await fetch('/api/admin/invoices/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ periodMonth: genMonth, periodYear: genYear }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal generate tagihan');

      setGenResult({ created: data.created?.length || 0, skipped: data.skipped?.length || 0 });
      await fetchInvoices();
    } catch (err) {
      alert(`Gagal generate tagihan: ${errorText(err)}`);
    } finally {
      setGenerating(false);
    }
  };

  const handleViewProof = async (invoice: Invoice) => {
    if (!invoice.proof_url) return;
    setViewingId(invoice.id);
    try {
      const url = await getSignedProofUrl(invoice.proof_url);
      window.open(url, '_blank', 'noopener');
    } catch (err) {
      alert(`Gagal membuka bukti: ${errorText(err)}`);
    } finally {
      setViewingId(null);
    }
  };

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('invoices')
      .select('*, profiles(full_name, phone)')
      .order('generated_at', { ascending: false });

    if (filter === 'pending_proof') {
      query = query.in('status', ['sent', 'rejected']);
    } else if (filter === 'review') {
      query = query.eq('status', 'proof_uploaded');
    } else if (filter === 'overdue') {
      query = query.eq('status', 'overdue');
    } else if (filter === 'confirmed') {
      query = query.eq('status', 'confirmed');
    }

    const { data } = await query;
    const list = (data || []) as Invoice[];
    setInvoices(list);

    const ids = Array.from(new Set(list.flatMap((i) => i.session_ids || [])));
    if (ids.length > 0) {
      const { data: sessionsData } = await supabase
        .from('sessions')
        .select('id, date, start_time, day_type, price')
        .in('id', ids);
      setLineItems(Object.fromEntries((sessionsData || []).map((s) => [s.id, s as LineItem])));
    }
    setLoading(false);
  }, [supabase, filter]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('invoices')
      .update({
        status: newStatus,
        confirmed_at: newStatus === 'confirmed' ? new Date().toISOString() : null,
      })
      .eq('id', id);

    if (!error) {
      // Fire-and-forget the email notification — the status change itself
      // already succeeded, so we don't block the UI refresh on this, and we
      // don't want a flaky email send to make a successful confirm/reject
      // look like it failed.
      fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'invoice_status', recordId: id }),
      }).catch((err) => console.error('[admin/invoices] notify failed:', err));

      fetchInvoices();
    } else {
      alert(`Gagal update status: ${error.message}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft': return <Badge variant="outline">Draft</Badge>;
      case 'sent': return <Badge variant="amber">Menunggu Pembayaran</Badge>;
      case 'proof_uploaded': return <Badge variant="blue">Perlu Review</Badge>;
      case 'confirmed': return <Badge variant="green">Lunas</Badge>;
      case 'overdue': return <Badge variant="red">Terlambat</Badge>;
      case 'rejected': return <Badge variant="red">Ditolak</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <PaperBackground className="p-4 md:p-8 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)] flex items-center gap-2">
            <FileText className="w-8 h-8" /> Manajemen Tagihan
          </h1>
          <div className="flex gap-2">
            <select
              className="input-field py-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
            >
              <option value="review">Perlu Review (Bukti Diupload)</option>
              <option value="pending_proof">Menunggu Pembayaran</option>
              <option value="overdue">Terlambat</option>
              <option value="confirmed">Lunas</option>
              <option value="all">Semua Tagihan</option>
            </select>
            <Button variant="ghost" onClick={fetchInvoices} size="sm" className="px-3">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-[var(--color-ink)] font-[var(--font-inter)] mb-1">
            Generate Tagihan Bulanan
          </h2>
          <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] mb-4">
            Otomatis berjalan tiap tanggal 1. Aman dijalankan berkali-kali: hanya sesi selesai (sampai akhir periode)
            dan biaya pembatalan yang belum pernah ditagihkan yang akan dibuatkan tagihan — sesi yang terlambat ditandai
            selesai otomatis masuk ke tagihan susulan.
          </p>
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="block text-xs font-medium text-[var(--color-ink-soft)] mb-1 font-[var(--font-inter)]">Bulan</label>
              <select
                className="input-field py-2"
                value={genMonth}
                onChange={(e) => setGenMonth(Number(e.target.value))}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>{monthName(m)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--color-ink-soft)] mb-1 font-[var(--font-inter)]">Tahun</label>
              <select
                className="input-field py-2"
                value={genYear}
                onChange={(e) => setGenYear(Number(e.target.value))}
              >
                {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <Button onClick={handleGenerateInvoices} isLoading={generating}>
              Generate Sekarang
            </Button>
            {genResult && (
              <span className="text-sm font-[var(--font-inter)] text-[var(--color-ink-soft)]">
                {genResult.created} tagihan dibuat{genResult.skipped > 0 ? `, ${genResult.skipped} gagal (lihat log server)` : ''}.
              </span>
            )}
          </div>
        </Card>

        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="responsive-table w-full text-left text-sm border-collapse font-[var(--font-inter)]">
              <thead>
                <tr className="bg-[var(--color-paper-bg-alt)] border-b border-[var(--color-line)]">
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Periode & Dibuat</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Siswa</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Total</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)] text-center">Status</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="p-8 text-center text-[var(--color-ink-soft)]">Memuat...</td></tr>
                ) : invoices.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-[var(--color-ink-soft)]">Tidak ada tagihan untuk filter ini.</td></tr>
                ) : (
                  invoices.map((invoice) => (
                    <Fragment key={invoice.id}>
                    <tr className="border-b border-[var(--color-line)] hover:bg-[var(--color-paper-bg-alt)]/50 transition-colors">
                      <td className="p-4" data-label="Periode & Dibuat">
                        <div className="font-bold text-[var(--color-ink)]">
                          {monthLabel(invoice.period_month, invoice.period_year)}
                        </div>
                        <div className="text-xs text-[var(--color-ink-soft)] mt-1">
                          Dibuat: {formatTimestamp(invoice.generated_at, 'dd MMM yy')}
                        </div>
                        <button
                          onClick={() => setExpandedId(expandedId === invoice.id ? null : invoice.id)}
                          className="text-xs text-[var(--color-brand-blue)] font-semibold mt-1 flex items-center gap-1"
                        >
                          <ChevronDown className={`w-3 h-3 transition-transform ${expandedId === invoice.id ? 'rotate-180' : ''}`} />
                          Rincian ({invoice.session_ids?.length || 0} sesi)
                        </button>
                      </td>
                      <td className="p-4" data-label="Siswa">
                        <div className="font-semibold text-[var(--color-ink)]">{invoice.profiles?.full_name}</div>
                        <div className="text-xs text-[var(--color-ink-soft)] mt-1">{invoice.profiles?.phone}</div>
                      </td>
                      <td className="p-4 font-bold text-[var(--color-ink)]" data-label="Total">
                        {formatPrice(invoice.total_amount)}
                        {invoice.fee_amount > 0 && (
                          <div className="text-xs font-normal text-amber-700 mt-0.5">
                            termasuk biaya pembatalan {formatPrice(invoice.fee_amount)}
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-center" data-label="Status">
                        {getStatusBadge(invoice.status)}
                      </td>
                      <td className="p-4 text-right" data-label="Aksi">

                        {invoice.status === 'proof_uploaded' && (
                          <div className="flex justify-end gap-2 items-center">
                            {invoice.proof_url && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleViewProof(invoice)}
                                isLoading={viewingId === invoice.id}
                                className="px-2"
                                title="Lihat Bukti"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              onClick={() => updateStatus(invoice.id, 'confirmed')}
                              className="bg-[var(--color-success-green)] hover:bg-[var(--color-success-green)] text-white px-3"
                            >
                              <Check className="w-4 h-4 mr-1" /> Konfirmasi
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                if (window.confirm("Tolak bukti pembayaran ini?")) {
                                  updateStatus(invoice.id, 'rejected');
                                }
                              }}
                              className="text-[var(--color-danger-red)] px-2"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        )}

                        {['sent', 'overdue', 'rejected'].includes(invoice.status) && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              if (window.confirm("Tandai tagihan ini lunas tanpa bukti di sistem (mis. dibayar tunai)?")) {
                                updateStatus(invoice.id, 'confirmed');
                              }
                            }}
                            className="text-xs"
                          >
                            Set Lunas Manual
                          </Button>
                        )}

                      </td>
                    </tr>
                    {expandedId === invoice.id && (
                      <tr className="border-b border-[var(--color-line)] bg-[var(--color-paper-bg-alt)]/40">
                        <td colSpan={5} className="px-4 py-3">
                          <ul className="text-xs space-y-1">
                            {(invoice.session_ids || []).map((sid) => {
                              const item = lineItems[sid];
                              return item ? (
                                <li key={sid} className="flex justify-between gap-4">
                                  <span>{formatDateStr(item.date, 'EEE, dd MMM yyyy')} · {hhmm(item.start_time)} · {DAY_TYPE_LABELS[item.day_type] ?? item.day_type}</span>
                                  <span className="font-semibold">{formatPrice(item.price)}</span>
                                </li>
                              ) : null;
                            })}
                            {invoice.fee_amount > 0 && (
                              <li className="flex justify-between gap-4 text-amber-700">
                                <span>Biaya pembatalan</span>
                                <span className="font-semibold">{formatPrice(invoice.fee_amount)}</span>
                              </li>
                            )}
                          </ul>
                        </td>
                      </tr>
                    )}
                    </Fragment>
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