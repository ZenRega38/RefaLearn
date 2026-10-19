"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LimitedOffer, PriceTag } from "@/components/ui/PriceTag";
import { BookOpen, ArrowLeft, Trash2, ShoppingCart } from "lucide-react";
import { formatPrice, validBefore } from "@/lib/pricing";
import { clearCart, removeFromCart, useCart } from "@/lib/cart";

type CartItem = { id: string; title: string; slug: string; category: string; price: number; compare_at_price: number | null; cover_image_url: string | null };

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
        .select("id, title, slug, category, price, compare_at_price, cover_image_url")
        .in("id", cart)
        .eq("is_active", true);
      setItems((data || []) as CartItem[]);
      setLoading(false);
    };
    load();
  }, [cart, supabase]);

  const total = items.reduce((sum, i) => sum + i.price, 0);
  const totalBefore = items.reduce((sum, i) => sum + (validBefore(i.price, i.compare_at_price) ?? i.price), 0);

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
      // Free orders are confirmed at once; paid ones go to their payment page.
      router.push(data.order?.status === "confirmed" ? "/dashboard/materials" : `/dashboard/materials/pay/${data.order.id}`);
    } catch (err) {
      setSubmitting(false);
      alert(`Couldn't create the order: ${err instanceof Error ? err.message : ""}`);
    }
  };

  return (
    <PaperBackground className="pt-24 pb-20 min-h-screen">
      <div className="container-main max-w-3xl mx-auto space-y-8">
        <Link href="/materials" className="inline-flex items-center text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] font-[var(--font-inter)] text-sm transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Catalog
        </Link>

        <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-ink)] flex items-center gap-2">
          <ShoppingCart className="w-8 h-8 text-[var(--color-brand-blue)]" /> Course Cart
        </h1>

        {loading ? (
          <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">Loading cart...</p>
        ) : items.length === 0 ? (
          <Card className="text-center py-16 bg-white/50 border-dashed border-[var(--color-line)]">
            <BookOpen className="w-16 h-16 text-[var(--color-line)] mx-auto mb-4" />
            <h3 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-2">Your cart is empty</h3>
            <Button href="/materials" className="mt-4">Browse the Course Catalog</Button>
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
                    <Link href={`/materials/${item.slug}`} className="block font-bold text-[var(--color-ink)] font-[var(--font-inter)] leading-snug line-clamp-2 hover:text-[var(--color-brand-blue)]">
                      {item.title}
                    </Link>
                    {/* Phones: price under the title, so the title keeps its width. */}
                    <div className="mt-1 sm:hidden">
                      <PriceTag price={item.price} before={item.compare_at_price} size="sm" />
                    </div>
                  </div>
                  <div className="hidden sm:block whitespace-nowrap">
                    <PriceTag price={item.price} before={item.compare_at_price} size="sm" stacked align="end" />
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)} className="px-2 text-[var(--color-danger-red)]" aria-label="Remove from cart">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="bg-[var(--color-paper-bg-alt)] border-t border-[var(--color-line)] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="font-[var(--font-inter)]">
                <div className="text-sm text-[var(--color-ink-soft)]">Total ({items.length} {items.length === 1 ? "course" : "courses"})</div>
                {totalBefore > total && (
                  <div className="text-sm text-[var(--color-ink-soft)] line-through">{formatPrice(totalBefore)}</div>
                )}
                <div className="text-2xl font-bold text-[var(--color-brand-blue)]">{formatPrice(total)}</div>
                {totalBefore > total && (
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-[var(--color-success-green)]">You save {formatPrice(totalBefore - total)}</span>
                    <LimitedOffer />
                  </div>
                )}
                <p className="text-xs text-[var(--color-ink-soft)] mt-1">
                  Once the order is created, you&apos;ll go straight to the QRIS payment and proof upload page.
                </p>
              </div>
              <Button onClick={handleCheckout} isLoading={submitting} className="w-full sm:w-auto">
                Place Order
              </Button>
            </div>
          </Card>
        )}
      </div>
    </PaperBackground>
  );
}
