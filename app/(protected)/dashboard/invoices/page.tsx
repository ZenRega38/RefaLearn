"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { Receipt, Upload, RefreshCw, AlertCircle, ExternalLink } from "lucide-react";
import { formatPrice } from "@/lib/pricing";
import { uploadPaymentProof, getSignedProofUrl } from "@/lib/storage";
import { useRouter } from "next/navigation";

type Invoice = {
  id: string;
  period_month: number;
  period_year: number;
  total_amount: number;
  status: 'draft' | 'sent' | 'proof_uploaded' | 'confirmed' | 'overdue' | 'rejected';
  proof_url: string | null; // storage PATH, not a public URL — see lib/storage.ts
  generated_at: string;
};

export default function StudentInvoicesPage() {
  const router = useRouter();
  const supabase = createClient();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState<string | null>(null);

  // Upload modal state
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Tracks which invoice's "view proof" signed URL is currently being fetched,
  // so we can show a small loading state on that specific button.
  const [viewingId, setViewingId] = useState<string | null>(null);

  const fetchInvoices = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login');
      return;
    }
    setStudentId(user.id);

    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('student_id', user.id)
      .neq('status', 'draft') // students don't see drafts
      .order('generated_at', { ascending: false });

    if (data) setInvoices(data as Invoice[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchInvoices();
  }, [router]);

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
    } catch (err: any) {
      alert(`Gagal mengirim bukti: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

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

  const getMonthName = (month: number) => {
    const date = new Date();
    date.setMonth(month - 1);
    return format(date, 'MMMM', { locale: id });
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
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md space-y-6">
              <h3 className="font-[var(--font-kalam)] text-2xl text-[var(--color-brand-blue)] border-b-2 border-dashed border-[var(--color-line)] pb-2 inline-block">
                Upload Bukti Pembayaran
              </h3>
              <p className="text-sm font-[var(--font-inter)] text-[var(--color-ink-soft)]">
                Silakan transfer sesuai nominal tagihan, lalu unggah foto/screenshot bukti transfer Anda (JPG, PNG, atau PDF).
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
            {invoices.map((invoice) => (
              <Card key={invoice.id} variant="sketch" className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)]">
                      Tagihan Bulan {getMonthName(invoice.period_month)} {invoice.period_year}
                    </h3>
                    {getStatusBadge(invoice.status)}
                  </div>
                  <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                    Diterbitkan pada: {format(parseISO(invoice.generated_at), 'dd MMMM yyyy', { locale: id })}
                  </p>

                  {invoice.status === 'rejected' && (
                    <div className="flex items-start gap-2 mt-2 text-sm text-[var(--color-danger-red)] bg-[var(--color-danger-red)]/10 p-2 rounded">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <p>Bukti pembayaran Anda ditolak oleh admin. Silakan upload ulang bukti yang valid.</p>
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

                  {['sent', 'rejected'].includes(invoice.status) && (
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
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewProof(invoice)}
                      isLoading={viewingId === invoice.id}
                      className="w-full md:w-auto text-xs"
                    >
                      <ExternalLink className="w-3 h-3 mr-2" /> Lihat Bukti Terkirim
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

      </div>
    </PaperBackground>
  );
}