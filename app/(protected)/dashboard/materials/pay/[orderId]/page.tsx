"use client";

import { use, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { freshChannel } from "@/lib/supabase/realtime-channel";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CopyableRow, PaymentInstructions, type BankDetails, type EwalletDetails } from "@/components/ui/PaymentInstructions";
import { Picture } from "@/components/course/pictures";
import { formatPrice } from "@/lib/pricing";
import { uploadPaymentProof } from "@/lib/storage";
import { orderCode, QRIS } from "@/lib/payments";
import { ArrowLeft, BookOpen, CheckCircle2, Download, GraduationCap, ImageUp, QrCode, RefreshCw, Smartphone, XCircle } from "lucide-react";

type Status = "pending" | "proof_uploaded" | "confirmed" | "rejected";
type Order = { id: string; student_id: string; material_ids: string[]; total_amount: number; status: Status; created_at: string };
type Material = { id: string; title: string; course_slug: string | null };

const STEPS = ["Bayar", "Upload bukti", "Verifikasi", "Selesai"];
const stepOf = (s: Status) => (s === "confirmed" ? 3 : s === "proof_uploaded" ? 2 : 0);

/**
 * One order's payment page: pay with QRIS (or transfer), upload the proof,
 * then wait while an admin verifies it. The status is live — when the admin
 * confirms, this page turns into "verified" with links straight into the
 * course, no refresh needed.
 */
export default function PayOrderPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [order, setOrder] = useState<Order | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [bank, setBank] = useState<BankDetails | null>(null);
  const [ewallet, setEwallet] = useState<EwalletDetails | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTransfer, setShowTransfer] = useState(false);

  const loadOrder = useCallback(async () => {
    const { data } = await supabase.from("material_orders").select("id, student_id, material_ids, total_amount, status, created_at").eq("id", orderId).maybeSingle();
    if (!data) {
      setNotFound(true);
      return null;
    }
    setOrder(data as Order);
    return data as Order;
  }, [supabase, orderId]);

  // First load: the order, its materials and the transfer details.
  useEffect(() => {
    let alive = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push(`/login?next=/dashboard/materials/pay/${orderId}`);
        return;
      }
      const o = await loadOrder();
      if (!o || !alive) return;
      const [{ data: mats }, { data: settings }] = await Promise.all([
        supabase.from("materials").select("id, title, course_slug").in("id", o.material_ids),
        supabase.from("site_settings").select("key, value").in("key", ["bank_details", "ewallet_details"]),
      ]);
      if (!alive) return;
      setMaterials((mats || []) as Material[]);
      settings?.forEach((row) => {
        if (row.key === "bank_details") setBank(row.value);
        if (row.key === "ewallet_details") setEwallet(row.value);
      });
    })();
    return () => {
      alive = false;
    };
  }, [supabase, router, orderId, loadOrder]);

  // Live status: realtime first; a slow poll covers dropped connections.
  useEffect(() => {
    const channel = freshChannel(supabase, `material_order_${orderId}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "material_orders", filter: `id=eq.${orderId}` }, (payload) => {
        setOrder((prev) => (prev ? { ...prev, ...(payload.new as Partial<Order>) } : prev));
      })
      .subscribe();
    const poll = window.setInterval(() => {
      if (document.visibilityState === "visible") loadOrder();
    }, 15000);
    return () => {
      supabase.removeChannel(channel);
      window.clearInterval(poll);
    };
  }, [supabase, orderId, loadOrder]);

  const pickFile = (next: File | null) => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(next);
    setPreview(next && next.type.startsWith("image/") ? URL.createObjectURL(next) : null);
  };

  // Free the last preview when leaving the page.
  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);

  const sendProof = async () => {
    if (!file || !order) return;
    setSending(true);
    setError(null);
    try {
      const path = await uploadPaymentProof("orders", order.student_id, order.id, file);
      const { error: updateError } = await supabase.from("material_orders").update({ proof_url: path, status: "proof_uploaded" }).eq("id", order.id);
      if (updateError) throw updateError;
      setOrder({ ...order, status: "proof_uploaded" });
      pickFile(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim bukti.");
    } finally {
      setSending(false);
    }
  };

  if (notFound) {
    return (
      <PaperBackground className="pt-8 md:pt-12 pb-20 min-h-screen">
        <div className="container-main max-w-xl mx-auto">
          <Card className="text-center space-y-4 py-12">
            <XCircle className="w-12 h-12 mx-auto text-[var(--color-danger-red)]" />
            <p className="font-[var(--font-inter)] text-[var(--color-ink)]">Pesanan tidak ditemukan.</p>
            <Button href="/dashboard/materials">Ke Materi Saya</Button>
          </Card>
        </div>
      </PaperBackground>
    );
  }

  if (!order) {
    return (
      <PaperBackground className="pt-8 md:pt-12 pb-20 min-h-screen">
        <div className="text-center py-20 text-[var(--color-ink-soft)] font-[var(--font-inter)]">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-[var(--color-brand-blue)]" />
          Memuat pesanan...
        </div>
      </PaperBackground>
    );
  }

  const step = stepOf(order.status);
  const amount = formatPrice(order.total_amount);

  return (
    <PaperBackground className="pt-8 md:pt-12 pb-20 min-h-screen">
      <div className="container-main max-w-2xl mx-auto space-y-6">
        <Link href="/dashboard/materials" className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] font-[var(--font-inter)]">
          <ArrowLeft className="w-4 h-4" /> Materi Saya
        </Link>

        {/* Order summary */}
        <Card variant="sketch" className="space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h1 className="text-2xl md:text-3xl font-[var(--font-kalam)] text-[var(--color-ink)]">Pembayaran Materi</h1>
            <span className="text-xs font-bold tracking-wider text-[var(--color-ink-soft)] font-[var(--font-inter)]">{orderCode(order.id)}</span>
          </div>
          <ul className="space-y-1 font-[var(--font-inter)] text-sm text-[var(--color-ink)]">
            {materials.map((m) => (
              <li key={m.id} className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-brand-blue)]" /> {m.title}
              </li>
            ))}
          </ul>
          <p className="font-[var(--font-inter)] text-sm text-[var(--color-ink-soft)]">
            Total: <span className="text-xl font-bold text-[var(--color-brand-blue)]">{amount}</span>
          </p>

          {/* Stepper */}
          <ol className="grid grid-cols-4 gap-1 pt-2">
            {STEPS.map((label, i) => {
              const done = i < step || order.status === "confirmed";
              const current = i === step && order.status !== "confirmed";
              return (
                <li key={label} className="flex flex-col items-center gap-1 text-center">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-[var(--font-inter)] border-2 ${
                      done
                        ? "bg-[var(--color-success-green)] border-[var(--color-success-green)] text-white"
                        : current
                          ? "border-[var(--color-brand-blue)] text-[var(--color-brand-blue)] bg-white"
                          : "border-[var(--color-line)] text-[var(--color-ink-soft)] bg-white"
                    }`}
                  >
                    {done ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </span>
                  <span className={`text-[0.7rem] leading-tight font-[var(--font-inter)] ${current ? "font-bold text-[var(--color-brand-blue)]" : "text-[var(--color-ink-soft)]"}`}>{label}</span>
                </li>
              );
            })}
          </ol>
        </Card>

        {order.status === "confirmed" ? (
          <Card variant="sketch" className="text-center space-y-4 py-8 animate-scale-in">
            <Picture name="owl-cheer" className="w-28 h-28 mx-auto" />
            <h2 className="text-2xl font-bold font-[var(--font-inter)] text-[var(--color-success-green)]">Pembayaran Terverifikasi!</h2>
            <p className="font-[var(--font-inter)] text-[var(--color-ink)]">Terima kasih! Materimu sudah aktif dan bisa dibuka sekarang.</p>
            <div className="space-y-2 max-w-sm mx-auto">
              {materials.map((m) =>
                m.course_slug ? (
                  <Button key={m.id} href={`/learn/${m.course_slug}`} className="w-full">
                    <GraduationCap className="w-4 h-4" /> Buka {m.title}
                  </Button>
                ) : null
              )}
              <Button href="/dashboard/materials" variant="secondary" className="w-full">
                <BookOpen className="w-4 h-4" /> Ke Materi Saya
              </Button>
            </div>
          </Card>
        ) : order.status === "proof_uploaded" ? (
          <Card variant="sketch" className="text-center space-y-4 py-8">
            <Picture name="owl-think" className="w-28 h-28 mx-auto" />
            <h2 className="text-2xl font-bold font-[var(--font-inter)] text-[var(--color-brand-blue)]">Menunggu Verifikasi</h2>
            <p className="font-[var(--font-inter)] text-[var(--color-ink)] max-w-md mx-auto">
              Bukti pembayaranmu sudah kami terima. Admin akan mengecek dan memverifikasinya secepatnya.
            </p>
            <p className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-blue)]/10 px-4 py-2 text-sm font-semibold font-[var(--font-inter)] text-[var(--color-brand-blue)]">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-blue)] opacity-60 animate-ping" />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-[var(--color-brand-blue)]" />
              </span>
              Halaman ini akan berubah otomatis begitu terverifikasi
            </p>
            <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">
              Boleh ditutup — statusnya juga terlihat di Materi Saya, dan kamu akan dapat email setelah diverifikasi.
            </p>
            <Button href="/dashboard/materials" variant="secondary">Ke Materi Saya</Button>
          </Card>
        ) : (
          <>
            {order.status === "rejected" && (
              <div className="flex items-start gap-2 rounded-[var(--radius-card)] border-2 border-[var(--color-danger-red)]/40 bg-[var(--color-danger-red)]/10 p-4 text-sm font-[var(--font-inter)] text-[var(--color-ink)]">
                <XCircle className="w-5 h-5 shrink-0 text-[var(--color-danger-red)]" />
                <span>Bukti pembayaran sebelumnya <strong>ditolak</strong>. Pastikan nominal dan tujuan pembayaran sudah benar, lalu upload ulang bukti yang jelas. Ada pertanyaan? Hubungi admin lewat chat.</span>
              </div>
            )}

            {/* Step 1: pay */}
            <Card variant="sketch" className="space-y-5">
              <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[var(--color-brand-blue)]" /> 1. Bayar dengan QRIS
              </h2>
              <div className="grid sm:grid-cols-[minmax(0,15rem)_1fr] gap-5 items-start">
                <div className="space-y-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={QRIS.image} alt={`QRIS ${QRIS.merchant}`} className="w-full max-w-[15rem] mx-auto rounded-[var(--radius-card)] border border-[var(--color-line)] shadow-sm" />
                  <a
                    href={QRIS.image}
                    download="QRIS-Refa-Learn.jpg"
                    className="flex items-center justify-center gap-2 text-sm font-semibold font-[var(--font-inter)] text-[var(--color-brand-blue)] hover:underline"
                  >
                    <Download className="w-4 h-4" /> Simpan gambar QRIS
                  </a>
                </div>
                <div className="space-y-3 font-[var(--font-inter)] text-sm text-[var(--color-ink)]">
                  <div className="rounded-[var(--radius-card)] bg-[var(--color-accent-yellow)]/15 border border-[var(--color-accent-yellow)]/50 px-3 divide-y divide-[var(--color-accent-yellow)]/30">
                    <CopyableRow label="Nominal yang harus dibayar (persis)" value={amount} />
                    <CopyableRow label="Kode pesanan (tulis di catatan, jika ada)" value={orderCode(order.id)} />
                  </div>
                  <ol className="list-decimal pl-5 space-y-1.5">
                    <li>Buka GoPay, OVO, DANA, ShopeePay, atau m-banking apa pun.</li>
                    <li>Pilih <strong>Scan / Bayar QRIS</strong>, lalu scan kode ini.</li>
                    <li>
                      Masukkan nominal <strong>persis {amount}</strong>, pastikan penerimanya <strong>{QRIS.merchant}</strong>.
                    </li>
                    <li>Selesaikan pembayaran, lalu <strong>screenshot</strong> bukti/struknya.</li>
                  </ol>
                  <p className="flex items-start gap-2 text-xs text-[var(--color-ink-soft)]">
                    <Smartphone className="w-4 h-4 shrink-0" />
                    Bayar dari HP yang sama? Ketuk &quot;Simpan gambar QRIS&quot;, lalu di aplikasi pembayaran pilih Scan → ikon galeri, dan pilih gambar tadi.
                  </p>
                </div>
              </div>

              {(bank?.account_number || ewallet?.number) && (
                <div className="border-t border-dashed border-[var(--color-line)] pt-4 space-y-3">
                  <button type="button" onClick={() => setShowTransfer((v) => !v)} className="text-sm font-semibold font-[var(--font-inter)] text-[var(--color-brand-blue)] hover:underline">
                    {showTransfer ? "Sembunyikan" : "Atau bayar lewat transfer bank / e-wallet"}
                  </button>
                  {showTransfer && <PaymentInstructions bank={bank} ewallet={ewallet} />}
                </div>
              )}
            </Card>

            {/* Step 2: upload proof */}
            <Card variant="sketch" className="space-y-4">
              <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] flex items-center gap-2">
                <ImageUp className="w-5 h-5 text-[var(--color-brand-blue)]" /> 2. Upload Bukti Pembayaran
              </h2>
              <label className="flex flex-col items-center justify-center gap-2 rounded-[var(--radius-card)] border-2 border-dashed border-[var(--color-line)] bg-[var(--color-paper-bg-alt)]/60 p-6 text-center cursor-pointer hover:border-[var(--color-brand-blue)] transition-colors">
                {preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={preview} alt="Pratinjau bukti pembayaran" className="max-h-64 rounded-md border border-[var(--color-line)]" />
                ) : (
                  <ImageUp className="w-10 h-10 text-[var(--color-ink-soft)]" />
                )}
                <span className="text-sm font-semibold font-[var(--font-inter)] text-[var(--color-ink)]">{file ? file.name : "Ketuk untuk memilih screenshot / foto bukti"}</span>
                <span className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">JPG, PNG, atau PDF, maks. 5 MB</span>
                <input type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => pickFile(e.target.files?.[0] || null)} />
              </label>
              {error && <p className="text-sm text-[var(--color-danger-red)] font-[var(--font-inter)]">{error}</p>}
              <Button onClick={sendProof} isLoading={sending} disabled={!file} className="w-full">
                Kirim Bukti Pembayaran
              </Button>
            </Card>
          </>
        )}
      </div>
    </PaperBackground>
  );
}
