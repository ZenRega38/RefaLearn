"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { FileText, Check, X, RefreshCw, Eye, ExternalLink } from "lucide-react";
import { formatPrice } from "@/lib/pricing";
import { getSignedProofUrl } from "@/lib/storage";

type Invoice = {
  id: string;
  student_id: string;
  period_month: number;
  period_year: number;
  total_amount: number;
  status: 'draft' | 'sent' | 'proof_uploaded' | 'confirmed' | 'overdue' | 'rejected';
  proof_url: string | null; // storage PATH — see lib/storage.ts
  generated_at: string;
  profiles: { full_name: string; phone: string };
};

export default function AdminInvoicesPage() {
  const supabase = createClient();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending_proof' | 'review' | 'confirmed'>('review');
  const [viewingId, setViewingId] = useState<string | null>(null);

  const handleViewProof = async (invoice: Invoice) => {
    if (!invoice.proof_url) return;
    setViewingId(invoice.id);
    try {
      const url = await getSignedProofUrl(invoice.proof_url);
      window.open(url, '_blank');
    } catch (err: any) {
      alert(`Gagal membuka bukti: ${err.message}`);
    } finally {
      setViewingId(null);
    }
  };

  const fetchInvoices = async () => {
    setLoading(true);
    let query = supabase
      .from('invoices')
      .select('*, profiles(full_name, phone)')
      .order('generated_at', { ascending: false });

    if (filter === 'pending_proof') {
      query = query.eq('status', 'sent');
    } else if (filter === 'review') {
      query = query.eq('status', 'proof_uploaded');
    } else if (filter === 'confirmed') {
      query = query.eq('status', 'confirmed');
    }

    const { data, error } = await query;
    if (data) setInvoices(data as Invoice[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchInvoices();
  }, [filter]);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('invoices')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
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

  const getMonthName = (month: number) => {
    const date = new Date();
    date.setMonth(month - 1);
    return format(date, 'MMMM', { locale: id });
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
              onChange={(e) => setFilter(e.target.value as any)}
            >
              <option value="review">Perlu Review (Bukti Diupload)</option>
              <option value="pending_proof">Menunggu Pembayaran</option>
              <option value="confirmed">Lunas</option>
              <option value="all">Semua Tagihan</option>
            </select>
            <Button variant="ghost" onClick={fetchInvoices} size="sm" className="px-3">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse font-[var(--font-inter)]">
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
                    <tr key={invoice.id} className="border-b border-[var(--color-line)] hover:bg-[var(--color-paper-bg-alt)]/50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-[var(--color-ink)]">
                          {getMonthName(invoice.period_month)} {invoice.period_year}
                        </div>
                        <div className="text-xs text-[var(--color-ink-soft)] mt-1">
                          Dibuat: {format(parseISO(invoice.generated_at), 'dd MMM yy', { locale: id })}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-[var(--color-ink)]">{invoice.profiles?.full_name}</div>
                        <div className="text-xs text-[var(--color-ink-soft)] mt-1">{invoice.profiles?.phone}</div>
                      </td>
                      <td className="p-4 font-bold text-[var(--color-ink)]">
                        {formatPrice(invoice.total_amount)}
                      </td>
                      <td className="p-4 text-center">
                        {getStatusBadge(invoice.status)}
                      </td>
                      <td className="p-4 text-right">

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

                        {invoice.status === 'sent' && (
                          <Button size="sm" variant="ghost" onClick={() => updateStatus(invoice.id, 'confirmed')} className="text-xs">
                            Set Lunas Manual
                          </Button>
                        )}

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
