"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LimitedOffer, PriceTag } from "@/components/ui/PriceTag";
import { PartnerBadge, type Partner } from "@/components/ui/PartnerBadge";
import { BookOpen, ShoppingBag, ArrowLeft, CheckCircle2, ShieldCheck, ShoppingCart, GraduationCap, Target } from "lucide-react";
import { validBefore } from "@/lib/pricing";
import { formatTimestamp } from "@/lib/format";
import { addToCart, useCart } from "@/lib/cart";
import Link from "next/link";
import { useLang } from "@/components/i18n/LangProvider";
import { translator } from "@/lib/i18n";

type Material = {
  id: string;
  title: string;
  slug: string;
  category: string;
  price: number;
  compare_at_price: number | null;
  cover_image_url: string | null;
  description: string | null;
  created_at: string;
  updated_at: string | null;
  course_slug: string | null;
  partner: Partner | null;
};

type Ownership = "none" | "pending" | "owned";

export default function MaterialDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { lang } = useLang();
  const tr = translator(lang);
  const [supabase] = useState(() => createClient());
  const cart = useCart();

  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [ownership, setOwnership] = useState<Ownership>("none");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaterialAndUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);

      const { data: matData } = await supabase
        .from('materials')
        .select('*, partner:partners(name, logo_url, url)')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (matData) {
        setMaterial(matData as Material);

        if (user) {
          const { data: orders } = await supabase
            .from('material_orders')
            .select('id, status')
            .eq('student_id', user.id)
            .contains('material_ids', [matData.id])
            .neq('status', 'rejected');

          if (orders?.some((o) => o.status === 'confirmed')) setOwnership("owned");
          else if (orders && orders.length > 0) setOwnership("pending");
        }
      }
      setLoading(false);
    };

    if (slug) fetchMaterialAndUser();
  }, [slug, supabase]);

  const handleBuy = async () => {
    if (!userId) {
      router.push(`/login?next=/materials/${slug}`);
      return;
    }
    if (!material) return;

    setBuying(true);
    try {
      const res = await fetch('/api/materials/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ materialIds: [material.id] }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push('/dashboard/materials');
    } catch (err) {
      setBuying(false);
      alert(`${tr("Gagal memproses pesanan", "Couldn't process the order")}: ${err instanceof Error ? err.message : ''}`);
    }
  };

  if (loading) {
    return (
      <PaperBackground className="pt-24 pb-20 min-h-screen">
        <div className="container-main max-w-4xl mx-auto flex justify-center py-20">
          <div className="animate-pulse flex flex-col items-center">
            <BookOpen className="w-12 h-12 text-[var(--color-line)] mb-4" />
            <div className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">{tr("Memuat detail materi...", "Loading course details...")}</div>
          </div>
        </div>
      </PaperBackground>
    );
  }

  if (!material) {
    return (
      <PaperBackground className="pt-24 pb-20 min-h-screen">
        <div className="container-main max-w-4xl mx-auto text-center py-20">
          <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-ink)] mb-4">{tr("Materi Tidak Ditemukan", "Course Not Found")}</h1>
          <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)] mb-8">{tr("Materi yang Anda cari mungkin telah dihapus atau link tidak valid.", "The course you're looking for may have been removed, or the link is invalid.")}</p>
          <Button href="/materials">{tr("Kembali ke Katalog", "Back to Catalog")}</Button>
        </div>
      </PaperBackground>
    );
  }

  const inCart = cart.includes(material.id);
  // A free interactive course needs no order: any signed-in user can open it.
  const freeCourse = material.price === 0 && !!material.course_slug;

  return (
    <PaperBackground className="pt-24 pb-20 min-h-screen">
      <div className="container-main max-w-5xl mx-auto space-y-8">

        <Link href="/materials" className="inline-flex items-center text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] font-[var(--font-inter)] text-sm transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          {tr("Kembali ke Katalog", "Back to Catalog")}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Left Column - Image & Action */}
          <div className="md:col-span-1 space-y-6">
            <Card variant="sketch" className="p-0 overflow-hidden">
              <div className="aspect-[3/4] bg-[var(--color-paper-bg-alt)] relative flex items-center justify-center">
                {material.cover_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
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
                <div className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] mb-1">{tr("Harga Materi", "Price")}</div>
                <PriceTag price={material.price} before={material.compare_at_price} size="lg" stacked />
                {validBefore(material.price, material.compare_at_price) && <LimitedOffer className="mt-3" />}
              </div>

              {freeCourse ? (
                <div className="space-y-2">
                  <Button
                    href={userId ? `/learn/${material.course_slug}` : `/login?next=/learn/${material.course_slug}`}
                    className="w-full text-lg py-6 shadow-[var(--shadow-sketch)]"
                  >
                    <GraduationCap className="w-5 h-5 mr-2" /> {tr("Mulai Belajar Gratis", "Start Learning for Free")}
                  </Button>
                  <p className="text-xs text-center text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                    {userId
                      ? tr("Langsung buka kursusnya, tanpa checkout.", "Open the course straight away, no checkout needed.")
                      : tr("Masuk atau daftar dulu supaya progres belajarmu tersimpan.", "Log in or sign up first so your progress is saved.")}
                  </p>
                </div>
              ) : ownership !== "none" ? (
                <div className="bg-[var(--color-success-green)]/10 text-[var(--color-success-green)] p-4 rounded-lg flex items-start gap-3 border border-[var(--color-success-green)]/30">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold font-[var(--font-inter)] text-sm">
                      {ownership === "owned" ? tr("Sudah Dibeli", "Already Purchased") : tr("Pesanan Sedang Diproses", "Order Being Processed")}
                    </p>
                    <p className="text-xs mt-1">
                      {ownership === "owned"
                        ? tr("Anda sudah memiliki akses ke materi ini.", "You already have access to this course.")
                        : tr("Selesaikan pembayaran dari dashboard untuk membuka akses.", "Complete the payment from your dashboard to unlock it.")}
                    </p>
                    <Button
                      href={ownership === "owned" && material.course_slug ? `/learn/${material.course_slug}` : "/dashboard/materials"}
                      variant="secondary"
                      size="sm"
                      className="mt-3 w-full bg-white border-[var(--color-success-green)] text-[var(--color-success-green)] hover:bg-[var(--color-success-green)] hover:text-white"
                    >
                      {ownership === "owned" && material.course_slug ? tr("Buka Kursus", "Open Course") : tr("Buka di Dashboard", "Open in Dashboard")}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    onClick={handleBuy}
                    isLoading={buying}
                    className="w-full text-lg py-6 shadow-[var(--shadow-sketch)]"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" /> {material.price === 0 ? tr("Ambil Gratis", "Get It Free") : tr("Beli Sekarang", "Buy Now")}
                  </Button>
                  {material.price > 0 && (
                    inCart ? (
                      <Button href="/materials/checkout" variant="secondary" className="w-full">
                        <ShoppingCart className="w-4 h-4" /> {tr("Lihat Keranjang", "View Cart")}
                      </Button>
                    ) : (
                      <Button variant="secondary" className="w-full" onClick={() => addToCart(material.id)}>
                        <ShoppingCart className="w-4 h-4" /> {tr("Tambah ke Keranjang", "Add to Cart")}
                      </Button>
                    )
                  )}
                </div>
              )}

              <ul className="space-y-3 text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] pt-4 border-t border-dashed border-[var(--color-line)]">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[var(--color-brand-blue)] shrink-0 mt-0.5" />
                  <span>{tr("Akses seumur hidup (Lifetime access)", "Lifetime access")}</span>
                </li>
                {material.price > 0 && (
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[var(--color-brand-blue)] shrink-0 mt-0.5" />
                    <span>{tr("Pembayaran aman & diverifikasi manual", "Secure payment, verified manually")}</span>
                  </li>
                )}
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
                <span>{tr("Diperbarui", "Updated")}: {formatTimestamp(material.updated_at || material.created_at, 'dd MMM yyyy', lang)}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-line)]" />
                <span>{tr("Kategori", "Category")}: {material.category}</span>
              </div>
              {material.partner && (
                <div className="mt-4">
                  <PartnerBadge partner={material.partner} variant="full" />
                </div>
              )}
            </div>

            {material.course_slug && (
              <Card variant="sketch" className="p-6 bg-[var(--color-brand-blue)]/5 space-y-3">
                <h2 className="text-lg font-bold font-[var(--font-inter)] text-[var(--color-brand-blue)] flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" /> {tr("Kursus interaktif", "Interactive course")}
                </h2>
                <ul className="text-sm font-[var(--font-inter)] text-[var(--color-ink)] space-y-1.5 list-disc pl-5">
                  <li>{tr("Materi bertahap dengan contoh audio dan latihan langsung", "Step-by-step lessons with audio examples and hands-on practice")}</li>
                  <li>{tr("Checkpoint ala Duolingo di setiap materi: isian, susun kata, pasangkan, pilihan ganda", "Duolingo-style checkpoints in every lesson: fill in the blank, word order, matching, multiple choice")}</li>
                  <li>{tr("Kuis di setiap level atau modul untuk mengukur kemajuan", "A quiz for every level or module to measure your progress")}</li>
                  {material.course_slug === "toefl-itp" && <li>{tr("Tryout full-length dengan waktu, urutan, dan jenis soal seperti tes asli", "Full-length tryouts with the same timing, order and question types as the real test")}</li>}
                  {material.course_slug === "english-day" && <li>{tr("Live Quiz bareng di kelas, dipandu langsung oleh pengajar", "Live Quizzes together in class, led by your teacher")}</li>}
                </ul>
                <Button href={`/learn/${material.course_slug}`} variant="secondary" size="sm">
                  <Target className="w-4 h-4" /> {material.course_slug === "toefl-itp" ? tr("Lihat silabus & coba pretest gratis", "See the syllabus & try a free pretest") : tr("Lihat silabus", "See the syllabus")}
                </Button>
              </Card>
            )}

            <Card variant="sketch" className="p-6 md:p-8 bg-white">
              <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-6 border-b-2 border-dashed border-[var(--color-line)] pb-2 inline-block">
                {tr("Deskripsi Materi", "Course Description")}
              </h2>
              <div
                className="prose prose-slate max-w-none font-[var(--font-inter)] prose-p:text-[var(--color-ink-soft)] prose-headings:text-[var(--color-ink)]"
                dangerouslySetInnerHTML={{ __html: material.description || "" }}
              />
            </Card>
          </div>

        </div>
      </div>
    </PaperBackground>
  );
}
