"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BookOpen, Search, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/pricing";
import Link from "next/link";
import { Input } from "@/components/ui/Input";

type Material = {
  id: string;
  title: string;
  slug: string;
  category: string;
  price: number;
  cover_image_url: string;
  description: string;
};

export default function MaterialsCatalogPage() {
  const supabase = createClient();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [categories, setCategories] = useState<string[]>(["Semua"]);

  useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
        
      if (data) {
        setMaterials(data as Material[]);
        
        // Extract unique categories
        const cats = new Set(data.map(m => m.category).filter(Boolean));
        setCategories(["Semua", ...Array.from(cats)]);
      }
      setLoading(false);
    };

    fetchMaterials();
  }, []);

  const filteredMaterials = materials.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (m.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PaperBackground className="pt-24 pb-20 min-h-screen">
      <div className="container-main max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="blue" className="mx-auto">Materi Belajar</Badge>
          <h1 className="text-4xl md:text-5xl font-[var(--font-kalam)] text-[var(--color-ink)]">
            Tingkatkan Skill Bahasa Inggrismu
          </h1>
          <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)] max-w-2xl mx-auto">
            Kumpulan e-book, modul, worksheet, dan video pembelajaran eksklusif yang dirancang khusus untuk mempercepat proses belajarmu.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/50 p-4 rounded-xl border border-[var(--color-line)] shadow-sm">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-[var(--color-brand-blue)] text-white' 
                    : 'bg-white border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-bg-alt)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-soft)]" />
            <input
              type="text"
              placeholder="Cari materi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-[var(--color-line)] bg-white text-sm focus:outline-none focus:border-[var(--color-brand-blue)] font-[var(--font-inter)]"
            />
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className="animate-pulse h-80 bg-white/40" />
            ))}
          </div>
        ) : filteredMaterials.length === 0 ? (
          <Card className="text-center py-16 bg-white/50 border-dashed">
            <BookOpen className="w-16 h-16 text-[var(--color-line)] mx-auto mb-4" />
            <h3 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-2">Materi tidak ditemukan</h3>
            <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">
              Coba gunakan kata kunci pencarian yang lain atau ubah filter kategori.
            </p>
            <Button variant="outline" className="mt-6" onClick={() => {setSearchQuery(""); setSelectedCategory("Semua");}}>
              Reset Filter
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map(material => (
              <Link href={`/materials/${material.slug}`} key={material.id} className="group flex flex-col h-full">
                <Card variant="sketch" className="p-0 h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <div className="aspect-[4/3] bg-[var(--color-paper-bg-alt)] border-b-2 border-[var(--color-line)] relative overflow-hidden">
                    {material.cover_image_url ? (
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
                    <div className="absolute top-3 left-3">
                      <Badge variant="yellow" className="shadow-sm">{material.category}</Badge>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold font-[var(--font-inter)] text-[var(--color-ink)] group-hover:text-[var(--color-brand-blue)] transition-colors mb-2 line-clamp-2">
                      {material.title}
                    </h3>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <span className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-brand-blue)]">
                        {material.price === 0 ? "Gratis" : formatPrice(material.price)}
                      </span>
                      <Button variant="ghost" size="sm" className="bg-[var(--color-accent-coral)]/10 text-[var(--color-accent-coral)] hover:bg-[var(--color-accent-coral)] hover:text-white px-3 transition-colors">
                        <ShoppingBag className="w-4 h-4 mr-2" /> Detail
                      </Button>
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
