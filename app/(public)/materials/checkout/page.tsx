"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BookOpen, ArrowLeft, Trash2, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/pricing";
import { clearCart, removeFromCart, useCart } from "@/lib/cart";

type CartItem = { id: string; title: string; slug: string; category: string; price: number; cover_image_url: string | null };

export default function CheckoutPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const cart = useCart();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (cart.length === 0) {
        setItems([]);
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("materials")
        .select("id, title, slug, category, price, cover_image_url")
        .in("id", cart)
        .eq("is_active", true);
      setItems((data || []) as CartItem[]);
      setLoading(false);
    };
    load();
  }, [cart, supabase]);

  const total = items.reduce((sum, i) => sum + i.price, 0);

  const handleCheckout = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login?next=/materials/checkout");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/materials/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ materialIds: items.map((i) => i.id) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      clearCart();
      router.push("/dashboard/materials");
    } catch (err) {
      setSubmitting(false);
      alert(`Gagal membuat pesanan: ${err instanceof Error ? err.message : ""}`);
    }
  };

  return (
    <PaperBackground className="pt-24 pb-20 min-h-screen">
      <div className="container-main max-w-3xl mx-auto space-y-8">
        <Link href="/materials" className="inline-flex items-center text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] font-[var(--font-inter)] text-sm transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Katalog
        </Link>

        <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-ink)] flex items-center gap-2">
          <ShoppingCart className="w-8 h-8 text-[var(--color-brand-blue)]" /> Keranjang Materi
        </h1>

        {loading ? (
          <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">Memuat keranjang...</p>
        ) : items.length === 0 ? (
          <Card className="text-center py-16 bg-white/50 border-dashed border-[var(--color-line)]">
            <BookOpen className="w-16 h-16 text-[var(--color-line)] mx-auto mb-4" />
            <h3 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-2">Keranjang masih kosong</h3>
            <Button href="/materials" className="mt-4">Lihat Katalog Materi</Button>
          </Card>
        ) : (
          <Card variant="sketch" className="p-0 overflow-hidden">
            <div className="p-6 divide-y divide-[var(--color-line)]">
              {items.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center">
                  <div className="w-16 h-16 rounded bg-[var(--color-paper-bg-alt)] shrink-0 border border-[var(--color-line)] flex justify-center items-center overflow-hidden">
                    {item.cover_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.cover_image_url} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <BookOpen className="w-6 h-6 text-[var(--color-ink-soft)]/50" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="amber" className="mb-1 text-[10px] px-1.5 py-0">{item.category}</Badge>
                    <Link href={`/materials/${item.slug}`} className="block font-bold text-[var(--color-ink)] font-[var(--font-inter)] truncate hover:text-[var(--color-brand-blue)]">
                      {item.title}
                    </Link>
                  </div>
                  <div className="font-bold font-[var(--font-inter)] text-[var(--color-brand-blue)] whitespace-nowrap">
                    {item.price === 0 ? "Gratis" : formatPrice(item.price)}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)} className="px-2 text-[var(--color-danger-red)]" aria-label="Hapus dari keranjang">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="bg-[var(--color-paper-bg-alt)] border-t border-[var(--color-line)] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="font-[var(--font-inter)]">
                <div className="text-sm text-[var(--color-ink-soft)]">Total ({items.length} materi)</div>
                <div className="text-2xl font-bold text-[var(--color-brand-blue)]">{formatPrice(total)}</div>
                <p className="text-xs text-[var(--color-ink-soft)] mt-1">
                  Setelah pesanan dibuat, instruksi transfer & upload bukti ada di menu Materi Saya.
                </p>
              </div>
              <Button onClick={handleCheckout} isLoading={submitting} className="w-full sm:w-auto">
                Buat Pesanan
              </Button>
            </div>
          </Card>
        )}
      </div>
    </PaperBackground>
  );
}
