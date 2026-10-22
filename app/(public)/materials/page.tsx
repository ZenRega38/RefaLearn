"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PillDropdown } from "@/components/ui/PillDropdown";
import { LimitedOffer, PriceTag } from "@/components/ui/PriceTag";
import { Badge } from "@/components/ui/Badge";
import { PartnerBadge, type Partner } from "@/components/ui/PartnerBadge";
import { BookOpen, Search, ShoppingBag, ShoppingCart } from "lucide-react";
import { validBefore } from "@/lib/pricing";
import Link from "next/link";
import { useTr } from "@/components/i18n/LangProvider";

type Material = {
  id: string;
  title: string;
  slug: string;
  category: string;
  price: number;
  compare_at_price: number | null;
  cover_image_url: string;
  description: string;
  partner: Partner | null;
};

// Special filters sit before the real categories. Keys can't clash with a
// category name typed by the admin.
const ALL = "__all";
const MINE = "__mine";
const FREE = "__free";
type Filter = { key: string; label: string };

// Card badges are a size smaller on phones, where two cards share a row.
const SMALL_BADGE = "!text-[0.6rem] !px-1.5 !py-0.5 !tracking-wide sm:!text-xs sm:!px-2.5 sm:!py-1 sm:!tracking-wider";

export default function MaterialsCatalogPage() {
  const tr = useTr();
  const [supabase] = useState(() => createClient());
  const cart = useCart();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Materials the student can open: purchased, granted by an admin, or a
  // free material they already took. A free one not yet taken is not here.
  const [ownedIds, setOwnedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchMaterials = async () => {
      const [{ data }, { data: { user } }] = await Promise.all([
        supabase
          .from('materials')
          .select('*, partner:partners(name, logo_url, url)')
          .eq('is_active', true)
          .order('created_at', { ascending: false }),
        supabase.auth.getUser(),
      ]);

      if (user) {
        setIsLoggedIn(true);
        const { data: orders } = await supabase
          .from('material_orders')
          .select('material_ids')
          .eq('student_id', user.id)
          .eq('status', 'confirmed');
        setOwnedIds(new Set((orders || []).flatMap((o) => o.material_ids as string[])));
      }

      if (data) {
        setMaterials(data as Material[]);

        // Extract unique categories
        const cats = new Set(data.map(m => m.category).filter(Boolean));
        setCategories(Array.from(cats));
      }
      setLoading(false);
    };

    fetchMaterials();
  }, [supabase]);

  const filteredMaterials = materials.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === ALL ||
      (selectedCategory === MINE && ownedIds.has(m.id)) ||
      (selectedCategory === FREE && m.price === 0) ||
      m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filters: Filter[] = [
    { key: ALL, label: tr("Semua", "All") },
    ...(isLoggedIn ? [{ key: MINE, label: tr("Kursus Saya", "My Courses") }] : []),
    ...(materials.some((m) => m.price === 0) ? [{ key: FREE, label: tr("Gratis", "Free") }] : []),
    ...categories.map((c) => ({ key: c, label: c })),
  ];

  return (
    <PaperBackground className="pt-24 pb-20 min-h-screen">
      <div className="container-main max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="blue">{tr("Materi Belajar", "Learning Materials")}</Badge>
            <LimitedOffer />
          </div>
          <h1 className="text-4xl md:text-5xl font-[var(--font-kalam)] text-[var(--color-ink)]">
            {tr("Tingkatkan Skill Bahasa Inggrismu", "Level Up Your English")}
          </h1>
          <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)] max-w-2xl mx-auto">
            {tr(
              "Kumpulan e-book, modul, worksheet, dan video pembelajaran eksklusif yang dirancang khusus untuk mempercepat proses belajarmu.",
              "Exclusive e-books, modules, worksheets and video lessons designed to speed up your learning."
            )}
          </p>
          {cart.length > 0 && (
            <Button href="/materials/checkout" variant="secondary" size="sm">
              <ShoppingCart className="w-4 h-4" /> {tr("Keranjang", "Cart")} ({cart.length})
            </Button>
          )}
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/50 p-4 rounded-xl border border-[var(--color-line)] shadow-sm">
          <PillDropdown
            options={filters}
            value={selectedCategory}
            onChange={setSelectedCategory}
            className="w-full md:w-auto"
          />

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-soft)]" />
            <input
              type="text"
              placeholder={tr("Cari materi...", "Search courses...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-[var(--color-line)] bg-white text-sm focus:outline-none focus:border-[var(--color-brand-blue)] font-[var(--font-inter)]"
            />
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className="animate-pulse h-56 sm:h-80 bg-white/40" />
            ))}
          </div>
        ) : filteredMaterials.length === 0 ? (
          <Card className="text-center py-16 bg-white/50 border-dashed">
            <BookOpen className="w-16 h-16 text-[var(--color-line)] mx-auto mb-4" />
            <h3 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-2">
              {selectedCategory === MINE && !searchQuery
                ? tr("Belum ada materi di Kursus Saya", "Nothing in My Courses yet")
                : tr("Materi tidak ditemukan", "No courses found")}
            </h3>
            <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">
              {selectedCategory === MINE && !searchQuery
                ? tr(
                    "Materi yang kamu beli, yang diberi akses oleh admin, dan materi gratis yang sudah kamu ambil akan muncul di sini.",
                    "Courses you've bought, been given access to by the admin, or claimed for free will appear here."
                  )
                : tr("Coba gunakan kata kunci pencarian yang lain atau ubah filter kategori.", "Try a different search term or change the category filter.")}
            </p>
            <Button variant="secondary" className="mt-6" onClick={() => { setSearchQuery(""); setSelectedCategory(ALL); }}>
              {tr("Reset Filter", "Reset Filter")}
            </Button>
          </Card>
        ) : (
          // Two per row on phones too, like a marketplace: smaller type and badges there.
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {filteredMaterials.map(material => (
              <Link href={`/materials/${material.slug}`} key={material.id} className="group flex flex-col h-full">
                <Card variant="sketch" className="p-0 h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <div className="aspect-[4/3] bg-[var(--color-paper-bg-alt)] border-b-2 border-[var(--color-line)] relative overflow-hidden">
                    {material.cover_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={material.cover_image_url}
                        alt={material.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--color-ink-soft)]/20">
                        <BookOpen className="w-20 h-20" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 flex flex-wrap gap-1 sm:gap-1.5">
                      <Badge variant="amber" className={`shadow-sm !bg-white/95 ${SMALL_BADGE}`}>{material.category}</Badge>
                      {validBefore(material.price, material.compare_at_price) && <Badge variant="coral" className={`shadow-sm !bg-[var(--color-accent-coral)] !text-white !border-transparent ${SMALL_BADGE}`}>Promo</Badge>}
                      {ownedIds.has(material.id) && <Badge variant="green" className={`shadow-sm !bg-white/95 ${SMALL_BADGE}`}>{tr("Dimiliki", "Owned")}</Badge>}
                    </div>
                    {material.partner && (
                      <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex">
                        <PartnerBadge partner={material.partner} variant="chip" />
                      </div>
                    )}
                  </div>

                  <div className="p-3 sm:p-5 flex-1 flex flex-col">
                    <h3 className="text-sm sm:text-lg leading-snug font-bold font-[var(--font-inter)] text-[var(--color-ink)] group-hover:text-[var(--color-brand-blue)] transition-colors mb-1 sm:mb-2 line-clamp-2">
                      {material.title}
                    </h3>

                    <div className="mt-auto pt-2 sm:pt-4 flex items-end justify-between gap-3">
                      <PriceTag price={material.price} before={material.compare_at_price} size="md" stacked />
                      {/* The whole card opens the course; phones skip the button to save room. */}
                      <span className="hidden sm:block">
                        <Button variant="ghost" size="sm" className="bg-[var(--color-accent-coral)]/10 text-[var(--color-accent-coral)] hover:bg-[var(--color-accent-coral)] hover:text-white px-3 transition-colors">
                          <ShoppingBag className="w-4 h-4 mr-2" /> Detail
                        </Button>
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

      </div>
    </PaperBackground>
  );
}