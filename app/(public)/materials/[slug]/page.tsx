"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BookOpen, ShoppingBag, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/pricing";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

type Material = {
  id: string;
  title: string;
  slug: string;
  category: string;
  price: number;
  cover_image_url: string;
  description: string;
  created_at: string;
};

export default function MaterialDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const supabase = createClient();

  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [hasBought, setHasBought] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchMaterialAndUser = async () => {
      setLoading(true);

      // Get user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // Get material
      const { data: matData, error: matError } = await supabase
        .from('materials')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (matData) {
        setMaterial(matData as Material);

        // Check if already bought
        if (user) {
          const { data: orders } = await supabase
            .from('material_orders')
            .select('id, status')
            .eq('student_id', user.id)
            .contains('material_ids', [matData.id])
            .neq('status', 'rejected');

          if (orders && orders.length > 0) {
            setHasBought(true);
          }
        }
      }
      setLoading(false);
    };

    if (slug) fetchMaterialAndUser();
  }, [slug]);

  const handleBuy = async () => {
    if (!user) {
      router.push('/login?redirect=/materials/' + slug);
      return;
    }

    if (!material) return;

    setBuying(true);

    const status = material.price === 0 ? 'confirmed' : 'pending';

    const { data, error } = await supabase
      .from('material_orders')
      .insert([{
        student_id: user.id,
        material_ids: [material.id],
        total_amount: material.price,
        status: status,
      }])
      .select('id')
      .single();

    if (!error && data) {
      router.push('/dashboard/materials');
    } else {
      setBuying(false);
      alert(`Gagal memproses pesanan: ${error?.message}`);
    }
  };

  if (loading) {
    return (
      <PaperBackground className="pt-24 pb-20 min-h-screen">
        <div className="container-main max-w-4xl mx-auto flex justify-center py-20">
          <div className="animate-pulse flex flex-col items-center">
            <BookOpen className="w-12 h-12 text-[var(--color-line)] mb-4" />
            <div className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">Memuat detail materi...</div>
          </div>
        </div>
      </PaperBackground>
    );
  }

  if (!material) {
    return (
      <PaperBackground className="pt-24 pb-20 min-h-screen">
        <div className="container-main max-w-4xl mx-auto text-center py-20">
          <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-ink)] mb-4">Materi Tidak Ditemukan</h1>
          <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)] mb-8">Materi yang Anda cari mungkin telah dihapus atau link tidak valid.</p>
          <Button href="/materials">Kembali ke Katalog</Button>
        </div>
      </PaperBackground>
    );
  }

  return (
    <PaperBackground className="pt-24 pb-20 min-h-screen">
      <div className="container-main max-w-5xl mx-auto space-y-8">

        <Link href="/materials" className="inline-flex items-center text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] font-[var(--font-inter)] text-sm transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Katalog
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Left Column - Image & Action */}
          <div className="md:col-span-1 space-y-6">
            <Card variant="sketch" className="p-0 overflow-hidden">
              <div className="aspect-[3/4] bg-[var(--color-paper-bg-alt)] relative flex items-center justify-center">
                {material.cover_image_url ? (
                  <img
                    src={material.cover_image_url}
                    alt={material.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <BookOpen className="w-24 h-24 text-[var(--color-ink-soft)]/20" />
                )}
                <div className="absolute top-4 left-4">
                  <Badge variant="amber" className="shadow-sm">{material.category}</Badge>
                </div>
              </div>
            </Card>

            <Card className="bg-white/80 p-6 space-y-6">
              <div>
                <div className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] mb-1">Harga Materi</div>
                <div className="text-3xl font-bold font-[var(--font-inter)] text-[var(--color-brand-blue)]">
                  {material.price === 0 ? "Gratis" : formatPrice(material.price)}
                </div>
              </div>

              {hasBought ? (
                <div className="bg-[var(--color-success-green)]/10 text-[var(--color-success-green)] p-4 rounded-lg flex items-start gap-3 border border-[var(--color-success-green)]/30">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold font-[var(--font-inter)] text-sm">Sudah Dibeli</p>
                    <p className="text-xs mt-1">Anda sudah memiliki akses ke materi ini.</p>
                    <Button
                      href="/dashboard/materials"
                      variant="secondary"
                      size="sm"
                      className="mt-3 w-full bg-white border-[var(--color-success-green)] text-[var(--color-success-green)] hover:bg-[var(--color-success-green)] hover:text-white"
                    >
                      Buka di Dashboard
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={handleBuy}
                  isLoading={buying}
                  className="w-full text-lg py-6 shadow-[var(--shadow-sketch)]"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" /> Beli Sekarang
                </Button>
              )}

              <ul className="space-y-3 text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] pt-4 border-t border-dashed border-[var(--color-line)]">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[var(--color-brand-blue)] shrink-0 mt-0.5" />
                  <span>Akses seumur hidup (Lifetime access)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[var(--color-brand-blue)] shrink-0 mt-0.5" />
                  <span>Pembayaran aman & diverifikasi manual</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-[var(--font-kalam)] text-[var(--color-ink)] mb-4 leading-tight">
                {material.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                <span>Diperbarui: {format(parseISO(material.created_at), 'dd MMM yyyy', { locale: id })}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-line)]" />
                <span>Kategori: {material.category}</span>
              </div>
            </div>

            <Card variant="sketch" className="p-6 md:p-8 bg-white">
              <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-6 border-b-2 border-dashed border-[var(--color-line)] pb-2 inline-block">
                Deskripsi Materi
              </h2>
              <div
                className="prose prose-slate max-w-none font-[var(--font-inter)] prose-p:text-[var(--color-ink-soft)] prose-headings:text-[var(--color-ink)]"
                dangerouslySetInnerHTML={{ __html: material.description }}
              />
            </Card>
          </div>

        </div>
      </div>
    </PaperBackground>
  );
}