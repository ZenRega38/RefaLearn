"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Receipt, Upload, RefreshCw, AlertCircle, ExternalLink, ChevronDown } from "lucide-react";
import { PaymentInstructions, type BankDetails, type EwalletDetails } from "@/components/ui/PaymentInstructions";
import { DAY_TYPE_LABELS, formatPrice, type DayType } from "@/lib/pricing";
import { uploadPaymentProof, getSignedProofUrl } from "@/lib/storage";
import { INVOICE_DUE_DAYS } from "@/lib/policy";
import { formatDateStr, formatTimestamp, hhmm, monthLabel } from "@/lib/format";
import { useRouter } from "next/navigation";

type Invoice = {
  id: string;
  period_month: number;
  period_year: number;
  session_ids: string[];
  total_amount: number;
  fee_amount: number;
  status: 'draft' | 'sent' | 'proof_uploaded' | 'confirmed' | 'overdue' | 'rejected';
  proof_url: string | null; // storage PATH, not a public URL — see lib/storage.ts
  generated_at: string;
};

type LineItem = { id: string; date: string; start_time: string; day_type: DayType; price: number };


const errorText = (err: unknown) => (err instanceof Error ? err.message : "Terjadi kesalahan.");

const dueDate = (generatedAt: string) =>
  formatTimestamp(new Date(Date.parse(generatedAt) + INVOICE_DUE_DAYS * 86_400_000).toISOString(), 'dd MMMM yyyy');

export default function StudentInvoicesPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [lineItems, setLineItems] = useState<Record<string, LineItem>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState<string | null>(null);

  // Payment instructions, loaded once from site_settings (admin-managed —
  // see /admin/settings).
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [ewalletDetails, setEwalletDetails] = useState<EwalletDetails | null>(null);

  // Upload modal state
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Tracks which invoice's "view proof" signed URL is currently being fetched,
  // so we can show a small loading state on that specific button.
  const [viewingId, setViewingId] = useState<string | null>(null);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login?next=/dashboard/invoices');
      return;
    }
    setStudentId(user.id);

    const { data } = await supabase
      .from('invoices')
      .select('*')
      .eq('student_id', user.id)
      .neq('status', 'draft') // students don't see drafts
      .order('generated_at', { ascending: false });

    const list = (data || []) as Invoice[];
    setInvoices(list);

    // Itemised breakdown (date, day type, price) so the student can verify
    // every line of the bill.
    const ids = Array.from(new Set(list.flatMap((i) => i.session_ids || [])));
    if (ids.length > 0) {
      const { data: sessionsData } = await supabase
        .from('sessions')
        .select('id, date, start_time, day_type, price')
        .in('id', ids);
      setLineItems(Object.fromEntries((sessionsData || []).map((s) => [s.id, s as LineItem])));
    }

    setLoading(false);
  }, [supabase, router]);

  const fetchPaymentInstructions = useCallback(async () => {
    const { data } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', ['bank_details', 'ewallet_details']);

    data?.forEach((row) => {
      if (row.key === 'bank_details') setBankDetails(row.value as BankDetails);
      if (row.key === 'ewallet_details') setEwalletDetails(row.value as EwalletDetails);
    });
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load
    fetchInvoices();
    fetchPaymentInstructions();
  }, [fetchInvoices, fetchPaymentInstructions]);

  const handleSubmitProof = async () => {
    if (!proofFile || !uploadingId || !studentId) {
      alert("Silakan pilih file bukti transfer terlebih dahulu!");
      return;
    }

    setSubmitting(true);
    try {
      // Upload the actual image to the private payment-proofs bucket.
      const path = await uploadPaymentProof("invoices", studentId, uploadingId, proofFile);

      const { error } = await supabase
        .from('invoices')
        .update({
          proof_url: path,
          status: 'proof_uploaded'
        })
        .eq('id', uploadingId);

      if (error) throw error;

      setUploadingId(null);
      setProofFile(null);
      fetchInvoices();
    } catch (err) {
      alert(`Gagal mengirim bukti: ${errorText(err)}`);
    } finally {
      setSubmitting(false);
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent': return <Badge variant="amber">Menunggu Pembayaran</Badge>;
      case 'proof_uploaded': return <Badge variant="blue">Sedang Direview</Badge>;
      case 'confirmed': return <Badge variant="green">Lunas</Badge>;
      case 'overdue': return <Badge variant="red">Terlambat</Badge>;
      case 'rejected': return <Badge variant="red">Bukti Ditolak</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <PaperBackground className="pt-24 pb-20 min-h-screen">
      <div className="container-main max-w-4xl mx-auto space-y-8">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" href="/dashboard" className="px-2">← Kembali</Button>
            <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-ink)] flex items-center gap-2">
              <Receipt className="w-8 h-8 text-[var(--color-brand-blue)]" /> Tagihan Saya
            </h1>
          </div>
          <Button variant="ghost" onClick={fetchInvoices} size="sm" className="px-3">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </Button>
        </div>

        {uploadingId && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <Card className="w-full max-w-md space-y-6 my-8">
              <h3 className="font-[var(--font-kalam)] text-2xl text-[var(--color-brand-blue)] border-b-2 border-dashed border-[var(--color-line)] pb-2 inline-block">
                Upload Bukti Pembayaran
              </h3>

              <PaymentInstructions bank={bankDetails} ewallet={ewalletDetails} />

              <p className="text-sm font-[var(--font-inter)] text-[var(--color-ink-soft)]">
                Silakan transfer sesuai nominal tagihan, lalu unggah foto/screenshot bukti transfer Anda (JPG, PNG, atau PDF, maks. 5 MB).
              </p>
              <Input
                type="file"
                label="File Bukti Transfer"
                accept="image/*,application/pdf"
                onChange={(e) => setProofFile(e.target.files?.[0] || null)}
              />
              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--color-line)]">
                <Button variant="ghost" onClick={() => { setUploadingId(null); setProofFile(null); }}>Batal</Button>
                <Button onClick={handleSubmitProof} isLoading={submitting} disabled={!proofFile}>Kirim Bukti</Button>
              </div>
            </Card>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-[var(--color-ink-soft)] font-[var(--font-inter)]">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-[var(--color-brand-blue)]" />
            Memuat tagihan...
          </div>
        ) : invoices.length === 0 ? (
          <Card className="text-center py-16 bg-white/50">
            <Receipt className="w-16 h-16 text-[var(--color-line)] mx-auto mb-4" />
            <h3 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-2">Belum ada tagihan</h3>
            <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">
              Tagihan Anda akan muncul di sini setiap awal bulan berikutnya.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {invoices.map((invoice) => {
              const items = (invoice.session_ids || []).map((id) => lineItems[id]).filter(Boolean);
              const expanded = expandedId === invoice.id;
              return (
                <Card key={invoice.id} variant="sketch" className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)]">
                          Tagihan Bulan {monthLabel(invoice.period_month, invoice.period_year)}
                        </h3>
                        {getStatusBadge(invoice.status)}
                      </div>
                      <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                        Diterbitkan {formatTimestamp(invoice.generated_at, 'dd MMMM yyyy')} · Jatuh tempo {dueDate(invoice.generated_at)}
                      </p>

                      {invoice.status === 'rejected' && (
                        <div className="flex items-start gap-2 mt-2 text-sm text-[var(--color-danger-red)] bg-[var(--color-danger-red)]/10 p-2 rounded">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <p>Bukti pembayaran Anda ditolak oleh admin. Silakan upload ulang bukti yang valid.</p>
                        </div>
                      )}
                      {invoice.status === 'overdue' && (
                        <div className="flex items-start gap-2 mt-2 text-sm text-[var(--color-danger-red)] bg-[var(--color-danger-red)]/10 p-2 rounded">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <p>Tagihan ini sudah lewat jatuh tempo. Booking sesi baru dijeda sampai tagihan dikonfirmasi lunas.</p>
                        </div>
                      )}
                      {invoice.status === 'proof_uploaded' && (
                        <p className="text-sm text-[var(--color-ink-soft)] italic mt-2">
                          Admin sedang mereview pembayaran Anda. Mohon tunggu maksimal 1x24 jam.
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col md:items-end gap-3 w-full md:w-auto">
                      <div className="text-2xl font-bold text-[var(--color-brand-blue)] font-[var(--font-inter)]">
                        {formatPrice(invoice.total_amount)}
                      </div>
                      {invoice.fee_amount > 0 && (
                        <p className="text-xs text-amber-700 font-[var(--font-inter)] md:text-right">
                          Termasuk biaya pembatalan {formatPrice(invoice.fee_amount)}
                          {" "}(kelas: {formatPrice(invoice.total_amount - invoice.fee_amount)})
                        </p>
                      )}

                      {['sent', 'rejected', 'overdue'].includes(invoice.status) && (
                        <Button
                          className="w-full md:w-auto gap-2"
                          onClick={() => {
                            setUploadingId(invoice.id);
                            setProofFile(null);
                          }}
                        >
                          <Upload className="w-4 h-4" /> Upload Bukti
                        </Button>
                      )}

                      {['proof_uploaded', 'confirmed'].includes(invoice.status) && invoice.proof_url && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleViewProof(invoice)}
                          isLoading={viewingId === invoice.id}
                          className="w-full md:w-auto text-xs"
                        >
                          <ExternalLink className="w-3 h-3 mr-2" /> Lihat Bukti Terkirim
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-dashed border-[var(--color-line)] pt-3">
                    <button
                      onClick={() => setExpandedId(expanded ? null : invoice.id)}
                      className="text-sm font-semibold font-[var(--font-inter)] text-[var(--color-brand-blue)] flex items-center gap-1"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                      Rincian ({items.length} sesi{invoice.fee_amount > 0 ? " + biaya pembatalan" : ""})
                    </button>
                    {expanded && (
                      <ul className="mt-3 divide-y divide-[var(--color-line)] text-sm font-[var(--font-inter)]">
                        {items.map((item) => (
                          <li key={item.id} className="py-2 flex justify-between gap-4">
                            <span className="text-[var(--color-ink)]">
                              {formatDateStr(item.date, 'EEE, dd MMM yyyy')} · {hhmm(item.start_time)}
                              <span className="text-[var(--color-ink-soft)]"> · {DAY_TYPE_LABELS[item.day_type] ?? item.day_type}</span>
                            </span>
                            <span className="font-semibold">{formatPrice(item.price)}</span>
                          </li>
                        ))}
                        {invoice.fee_amount > 0 && (
                          <li className="py-2 flex justify-between gap-4 text-amber-700">
                            <span>Biaya pembatalan</span>
                            <span className="font-semibold">{formatPrice(invoice.fee_amount)}</span>
                          </li>
                        )}
                        <li className="py-2 flex justify-between gap-4 font-bold">
                          <span>Total</span>
                          <span>{formatPrice(invoice.total_amount)}</span>
                        </li>
                      </ul>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}

      </div>
    </PaperBackground>
  );
}
