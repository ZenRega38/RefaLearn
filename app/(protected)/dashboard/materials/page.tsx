"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { freshChannel } from "@/lib/supabase/realtime-channel";
import { BookOpen, Upload, RefreshCw, AlertCircle, Download, Lock, GraduationCap, Clock } from "lucide-react";
import { formatPrice } from "@/lib/pricing";
import { formatTimestamp } from "@/lib/format";
import { useRouter } from "next/navigation";
import { FreeCourses } from "@/components/course/FreeCourses";
import { useLang } from "@/components/i18n/LangProvider";
import { translator } from "@/lib/i18n";

type Order = {
  id: string;
  material_ids: string[];
  total_amount: number;
  status: 'pending' | 'proof_uploaded' | 'confirmed' | 'rejected';
  source?: 'purchase' | 'grant';
  proof_url: string | null;
  created_at: string;
};

type Material = {
  id: string;
  title: string;
  category: string;
  cover_image_url: string | null;
  course_slug: string | null;
};

export default function StudentMaterialsDashboard() {
  const router = useRouter();
  const { lang } = useLang();
  const tr = translator(lang);
  const [supabase] = useState(() => createClient());
  const [orders, setOrders] = useState<(Order & { materials: Material[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState<string | null>(null);

  // `quiet` refreshes (live updates) keep the list on screen instead of
  // flashing the loading state.
  const fetchOrders = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login?next=/dashboard/materials');
      return;
    }
    setStudentId(user.id);

    const { data: ordersData } = await supabase
      .from('material_orders')
      .select('*')
      .eq('student_id', user.id)
      .order('created_at', { ascending: false });

    if (ordersData && ordersData.length > 0) {
      const allMaterialIds = Array.from(new Set(ordersData.flatMap((o) => o.material_ids as string[])));

      // RLS shows purchased items even after the admin hides them from the
      // catalog, so a confirmed purchase never disappears from here.
      const { data: materialsData } = await supabase
        .from('materials')
        .select('id, title, category, cover_image_url, course_slug')
        .in('id', allMaterialIds);

      const materialsMap = new Map<string, Material>();
      materialsData?.forEach(m => materialsMap.set(m.id, m as Material));

      setOrders(ordersData.map(order => ({
        ...order,
        materials: (order.material_ids as string[]).map((id) => materialsMap.get(id)).filter(Boolean) as Material[]
      })));
    } else {
      setOrders([]);
    }

    setLoading(false);
  }, [supabase, router]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load
    fetchOrders();
  }, [fetchOrders]);

  // Live status: when an admin verifies an order, it unlocks here at once.
  useEffect(() => {
    if (!studentId) return;
    const channel = freshChannel(supabase, `material_orders_${studentId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'material_orders', filter: `student_id=eq.${studentId}` }, () => fetchOrders(true))
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, studentId, fetchOrders]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="amber">{tr("Menunggu Pembayaran", "Awaiting Payment")}</Badge>;
      case 'proof_uploaded': return <Badge variant="blue">{tr("Sedang Direview", "Under Review")}</Badge>;
      case 'confirmed': return <Badge variant="green">{tr("Lunas & Aktif", "Paid & Active")}</Badge>;
      case 'rejected': return <Badge variant="red">{tr("Bukti Ditolak", "Proof Rejected")}</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <PaperBackground className="pt-8 md:pt-12 pb-20 min-h-screen">
      <div className="container-main max-w-4xl mx-auto space-y-8">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-ink)] flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-[var(--color-brand-blue)]" /> {tr("Materi Saya", "My Courses")}
            </h1>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" href="/materials" size="sm">{tr("Cari Materi Lain", "Find More Courses")}</Button>
            <Button variant="ghost" onClick={() => fetchOrders()} size="sm" className="px-3" aria-label={tr("Muat ulang", "Refresh")}>
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        <FreeCourses />

        {loading ? (
          <div className="text-center py-12 text-[var(--color-ink-soft)] font-[var(--font-inter)]">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-[var(--color-brand-blue)]" />
            {tr("Memuat materi...", "Loading courses...")}
          </div>
        ) : orders.length === 0 ? (
          <Card className="text-center py-16 bg-white/50 border-dashed border-[var(--color-line)]">
            <BookOpen className="w-16 h-16 text-[var(--color-line)] mx-auto mb-4" />
            <h3 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-2">{tr("Belum ada materi", "No courses yet")}</h3>
            <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)] mb-6">
              {tr("Anda belum membeli materi belajar apapun.", "You haven't bought or claimed any courses yet.")}
            </p>
            <Button href="/materials">{tr("Lihat Katalog Materi", "Browse the Course Catalog")}</Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} variant="sketch" className="p-0 overflow-hidden">
                <div className="bg-[var(--color-paper-bg-alt)] border-b border-[var(--color-line)] p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)] uppercase tracking-wider font-bold mb-1">
                      {tr("Pesanan", "Order from")} {formatTimestamp(order.created_at, 'dd MMM yyyy', lang)}
                    </div>
                    <div className="text-lg font-bold font-[var(--font-inter)] text-[var(--color-brand-blue)]">
                      {order.source === 'grant'
                        ? tr("Diberikan oleh Refa Learn 🎁", "A gift from Refa Learn 🎁")
                        : order.total_amount === 0
                          ? tr("Gratis", "Free")
                          : formatPrice(order.total_amount)}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
                    {getStatusBadge(order.status)}

                    {['pending', 'rejected'].includes(order.status) && (
                      <Button size="sm" href={`/dashboard/materials/pay/${order.id}`} className="w-full sm:w-auto whitespace-nowrap">
                        <Upload className="w-4 h-4 mr-2" /> {tr("Bayar & Upload Bukti", "Pay & Upload Proof")}
                      </Button>
                    )}
                    {order.status === 'proof_uploaded' && (
                      <Button size="sm" variant="secondary" href={`/dashboard/materials/pay/${order.id}`} className="w-full sm:w-auto whitespace-nowrap">
                        <Clock className="w-4 h-4 mr-2" /> {tr("Lihat Status", "View Status")}
                      </Button>
                    )}
                  </div>
                </div>

                {order.status === 'rejected' && (
                  <div className="px-6 py-3 bg-[var(--color-danger-red)]/10 text-[var(--color-danger-red)] text-sm flex gap-2 border-b border-[var(--color-line)]">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <p>{tr("Bukti pembayaran ditolak. Silakan upload ulang bukti yang valid.", "Your payment proof was rejected. Please upload a valid proof again.")}</p>
                  </div>
                )}

                {order.status === 'proof_uploaded' && (
                  <div className="px-6 py-3 bg-blue-50 text-blue-700 text-sm flex gap-2 border-b border-[var(--color-line)]">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <p>{tr("Admin sedang mereview pembayaran Anda. Akses materi akan terbuka setelah lunas.", "The admin is reviewing your payment. The course unlocks once it's confirmed.")}</p>
                  </div>
                )}

                <div className="p-6 divide-y divide-[var(--color-line)]">
                  {order.materials.map(material => (
                    <div key={material.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <div className="w-20 h-20 rounded bg-[var(--color-paper-bg-alt)] shrink-0 border border-[var(--color-line)] flex justify-center items-center overflow-hidden">
                        {material.cover_image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={material.cover_image_url} alt={material.title} className="w-full h-full object-cover" />
                        ) : (
                          <BookOpen className="w-8 h-8 text-[var(--color-ink-soft)]/50" />
                        )}
                      </div>
                      <div className="flex-1">
                        <Badge variant="amber" className="mb-2 text-[10px] px-1.5 py-0">{material.category}</Badge>
                        <h4 className="font-bold text-[var(--color-ink)] font-[var(--font-inter)] line-clamp-1">{material.title}</h4>
                      </div>

                      <div className="mt-2 sm:mt-0 w-full sm:w-auto flex justify-end">
                        {order.status === 'confirmed' && material.course_slug ? (
                          <Button href={`/learn/${material.course_slug}`} className="w-full sm:w-auto">
                            <GraduationCap className="w-4 h-4 mr-2" /> {tr("Buka Kursus", "Open Course")}
                          </Button>
                        ) : order.status === 'confirmed' ? (
                          <Button
                            variant="secondary"
                            onClick={() => window.open(`/api/materials/download?materialId=${material.id}`, '_blank', 'noopener')}
                            className="w-full sm:w-auto"
                          >
                            <Download className="w-4 h-4 mr-2" /> {tr("Akses Materi", "Open Material")}
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            disabled
                            className="w-full sm:w-auto text-[var(--color-ink-soft)] border-dashed border-[var(--color-line)]"
                          >
                            <Lock className="w-4 h-4 mr-2" /> {tr("Terkunci", "Locked")}
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
