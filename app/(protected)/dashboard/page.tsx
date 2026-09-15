"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { BookOpen, Upload, RefreshCw, AlertCircle, Download, Lock } from "lucide-react";
import { formatPrice } from "@/lib/pricing";
import { uploadPaymentProof, getSignedMaterialUrl } from "@/lib/storage";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

type Order = {
  id: string;
  material_ids: string[];
  total_amount: number;
  status: 'pending' | 'proof_uploaded' | 'confirmed' | 'rejected';
  proof_url: string | null; // storage PATH — see lib/storage.ts
  created_at: string;
};

type Material = {
  id: string;
  title: string;
  category: string;
  cover_image_url: string;
  file_url: string | null; // storage PATH within the material-files bucket
};

export default function StudentMaterialsDashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [orders, setOrders] = useState<(Order & { materials: Material[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState<string | null>(null);

  // Upload modal state
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Tracks which material's signed download URL is currently being fetched.
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login');
      return;
    }
    setStudentId(user.id);

    const { data: ordersData, error: ordersError } = await supabase
      .from('material_orders')
      .select('*')
      .eq('student_id', user.id)
      .order('created_at', { ascending: false });

    if (ordersData && ordersData.length > 0) {
      // Collect all unique material IDs
      const allMaterialIds = new Set<string>();
      ordersData.forEach(o => o.material_ids.forEach((id: string) => allMaterialIds.add(id)));

      // Fetch materials
      const { data: materialsData } = await supabase
        .from('materials')
        .select('id, title, category, cover_image_url, file_url')
        .in('id', Array.from(allMaterialIds));

      const materialsMap = new Map<string, Material>();
      materialsData?.forEach(m => materialsMap.set(m.id, m as Material));

      // Combine
      const combined = ordersData.map(order => ({
        ...order,
        materials: order.material_ids.map((id: string) => materialsMap.get(id)).filter(Boolean) as Material[]
      }));

      setOrders(combined);
    } else {
      setOrders([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [router]);

  const handleSubmitProof = async () => {
    if (!proofFile || !uploadingId || !studentId) {
      alert("Silakan pilih file bukti transfer terlebih dahulu!");
      return;
    }

    setSubmitting(true);
    try {
      const path = await uploadPaymentProof("orders", studentId, uploadingId, proofFile);

      const { error } = await supabase
        .from('material_orders')
        .update({
          proof_url: path,
          status: 'proof_uploaded'
        })
        .eq('id', uploadingId);

      if (error) throw error;

      setUploadingId(null);
      setProofFile(null);
      fetchOrders();
    } catch (err: any) {
      alert(`Gagal mengirim bukti: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Storage RLS only allows this to succeed if the caller genuinely has a
  // confirmed order containing this material — see the storage migration.
  const handleDownload = async (material: Material) => {
    if (!material.file_url) {
      alert("File materi belum diunggah oleh admin. Silakan hubungi admin.");
      return;
    }
    setDownloadingId(material.id);
    try {
      const url = await getSignedMaterialUrl(material.file_url);
      window.open(url, '_blank');
    } catch (err: any) {
      alert(`Gagal mengunduh materi: ${err.message}`);
    } finally {
      setDownloadingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="amber">Menunggu Pembayaran</Badge>;
      case 'proof_uploaded': return <Badge variant="blue">Sedang Direview</Badge>;
      case 'confirmed': return <Badge variant="green">Lunas & Aktif</Badge>;
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
              <BookOpen className="w-8 h-8 text-[var(--color-brand-blue)]" /> Materi Saya
            </h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" href="/materials" size="sm">Cari Materi Lain</Button>
            <Button variant="ghost" onClick={fetchOrders} size="sm" className="px-3">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {uploadingId && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md space-y-6">
              <h3 className="font-[var(--font-kalam)] text-2xl text-[var(--color-brand-blue)] border-b-2 border-dashed border-[var(--color-line)] pb-2 inline-block">
                Upload Bukti Pembayaran
              </h3>
              <p className="text-sm font-[var(--font-inter)] text-[var(--color-ink-soft)]">
                Silakan unggah foto/screenshot bukti transfer Anda (JPG, PNG, atau PDF).
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
            Memuat materi...
          </div>
        ) : orders.length === 0 ? (
          <Card className="text-center py-16 bg-white/50 border-dashed border-[var(--color-line)]">
            <BookOpen className="w-16 h-16 text-[var(--color-line)] mx-auto mb-4" />
            <h3 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-2">Belum ada materi</h3>
            <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)] mb-6">
              Anda belum membeli materi belajar apapun.
            </p>
            <Button href="/materials">Lihat Katalog Materi</Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} variant="sketch" className="p-0 overflow-hidden">
                <div className="bg-[var(--color-paper-bg-alt)] border-b border-[var(--color-line)] p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)] uppercase tracking-wider font-bold mb-1">
                      Pesanan {format(parseISO(order.created_at), 'dd MMM yyyy', { locale: id })}
                    </div>
                    <div className="text-lg font-bold font-[var(--font-inter)] text-[var(--color-brand-blue)]">
                      {formatPrice(order.total_amount)}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    {getStatusBadge(order.status)}

                    {['pending', 'rejected'].includes(order.status) && (
                      <Button
                        size="sm"
                        onClick={() => {
                          setUploadingId(order.id);
                          setProofFile(null);
                        }}
                      >
                        <Upload className="w-4 h-4 mr-2" /> Upload Bukti
                      </Button>
                    )}
                  </div>
                </div>

                {order.status === 'rejected' && (
                  <div className="px-6 py-3 bg-[var(--color-danger-red)]/10 text-[var(--color-danger-red)] text-sm flex gap-2 border-b border-[var(--color-line)]">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <p>Bukti pembayaran ditolak. Silakan upload ulang bukti yang valid.</p>
                  </div>
                )}

                {order.status === 'proof_uploaded' && (
                  <div className="px-6 py-3 bg-blue-50 text-blue-700 text-sm flex gap-2 border-b border-[var(--color-line)]">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <p>Admin sedang mereview pembayaran Anda. Akses materi akan terbuka setelah lunas.</p>
                  </div>
                )}

                <div className="p-6 divide-y divide-[var(--color-line)]">
                  {order.materials.map(material => (
                    <div key={material.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <div className="w-20 h-20 rounded bg-[var(--color-paper-bg-alt)] shrink-0 border border-[var(--color-line)] flex justify-center items-center overflow-hidden">
                        {material.cover_image_url ? (
                          <img src={material.cover_image_url} alt={material.title} className="w-full h-full object-cover" />
                        ) : (
                          <BookOpen className="w-8 h-8 text-[var(--color-ink-soft)]/50" />
                        )}
                      </div>
                      <div className="flex-1">
                        <Badge variant="yellow" className="mb-2 text-[10px] px-1.5 py-0">{material.category}</Badge>
                        <h4 className="font-bold text-[var(--color-ink)] font-[var(--font-inter)] line-clamp-1">{material.title}</h4>
                      </div>

                      <div className="mt-2 sm:mt-0 w-full sm:w-auto flex justify-end">
                        {order.status === 'confirmed' ? (
                          <Button
                            variant="outline"
                            onClick={() => handleDownload(material)}
                            isLoading={downloadingId === material.id}
                            className="w-full sm:w-auto"
                          >
                            <Download className="w-4 h-4 mr-2" /> Akses Materi
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            disabled
                            className="w-full sm:w-auto text-[var(--color-ink-soft)] border-dashed border-[var(--color-line)]"
                          >
                            <Lock className="w-4 h-4 mr-2" /> Terkunci
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

      </div>
    </PaperBackground>
  );
}