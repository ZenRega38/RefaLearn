"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import {
  Users,
  Video,
  Receipt,
  BookOpen,
  MessageCircle,
  Settings,
  Calendar,
  ShoppingBag,
  Newspaper,
  GraduationCap,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/pricing";

type DashboardStats = {
  totalStudents: number;
  pendingSessions: number;
  pendingInvoices: number;
  pendingOrders: number;
  totalRevenue: number;
};

export default function AdminOverviewDashboard() {
  const supabase = createClient();
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    pendingSessions: 0,
    pendingInvoices: 0,
    pendingOrders: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      // Students count
      const { count: studentsCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'student');

      // Pending Sessions
      const { count: sessionsCount } = await supabase
        .from('sessions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Pending Invoices (proof uploaded waiting for review)
      const { count: invoicesCount } = await supabase
        .from('invoices')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'proof_uploaded');

      // Pending Orders (proof uploaded waiting for review)
      const { count: ordersCount } = await supabase
        .from('material_orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'proof_uploaded');

      // Total Revenue (Confirmed invoices + confirmed orders)
      const { data: invData } = await supabase.from('invoices').select('total_amount').eq('status', 'confirmed');
      const { data: ordData } = await supabase.from('material_orders').select('total_amount').eq('status', 'confirmed');

      let revenue = 0;
      invData?.forEach(i => revenue += i.total_amount);
      ordData?.forEach(o => revenue += o.total_amount);

      setStats({
        totalStudents: studentsCount || 0,
        pendingSessions: sessionsCount || 0,
        pendingInvoices: invoicesCount || 0,
        pendingOrders: ordersCount || 0,
        totalRevenue: revenue
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const adminLinks = [
    { href: "/admin/chat", label: "Inbox Chat", icon: <MessageCircle className="w-6 h-6" />, color: "text-[var(--color-brand-blue)]", bg: "bg-[var(--color-brand-blue)]/10" },
    { href: "/admin/sessions", label: "Kelas & Sesi", icon: <Video className="w-6 h-6" />, color: "text-[var(--color-accent-coral)]", bg: "bg-[var(--color-accent-coral)]/10", badge: stats.pendingSessions },
    { href: "/admin/availability", label: "Jadwal & Ketersediaan", icon: <Calendar className="w-6 h-6" />, color: "text-[var(--color-accent-yellow)]", bg: "bg-[var(--color-accent-yellow)]/20" },
    { href: "/admin/invoices", label: "Tagihan Bulanan", icon: <Receipt className="w-6 h-6" />, color: "text-[var(--color-success-green)]", bg: "bg-[var(--color-success-green)]/10", badge: stats.pendingInvoices },
    { href: "/admin/materials", label: "Materi Digital", icon: <BookOpen className="w-6 h-6" />, color: "text-purple-500", bg: "bg-purple-100" },
    { href: "/admin/material-orders", label: "Pembelian Materi", icon: <ShoppingBag className="w-6 h-6" />, color: "text-pink-500", bg: "bg-pink-100", badge: stats.pendingOrders },
    { href: "/admin/news", label: "Manajemen Berita", icon: <Newspaper className="w-6 h-6" />, color: "text-indigo-500", bg: "bg-indigo-100" },
    { href: "/admin/alumni", label: "Kisah Alumni", icon: <GraduationCap className="w-6 h-6" />, color: "text-orange-500", bg: "bg-orange-100" },
    { href: "/admin/settings", label: "Pengaturan Website", icon: <Settings className="w-6 h-6" />, color: "text-slate-500", bg: "bg-slate-100" },
    { href: "/admin/contracts", label: "Kontrak Sesi", icon: <ShieldCheck className="w-6 h-6" />, color: "text-[var(--color-success-green)]", bg: "bg-[var(--color-success-green)]/10" },
  ];

  return (
    <PaperBackground className="p-4 md:p-8 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-[var(--color-brand-blue)] text-white flex items-center justify-center font-[var(--font-kalam)] text-2xl">
            A
          </div>
          <div>
            <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-ink)] leading-none">
              Dashboard Admin
            </h1>
            <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)] text-sm">
              Selamat datang kembali, kelola Refa Learn dengan mudah.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-5 flex items-center gap-4 bg-white border-b-4 border-b-[var(--color-brand-blue)]">
            <div className="w-12 h-12 rounded-lg bg-[var(--color-brand-blue)]/10 flex items-center justify-center text-[var(--color-brand-blue)]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">Total Siswa</div>
              <div className="text-2xl font-bold font-[var(--font-inter)] text-[var(--color-ink)]">
                {loading ? "-" : stats.totalStudents}
              </div>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4 bg-white border-b-4 border-b-[var(--color-success-green)]">
            <div className="w-12 h-12 rounded-lg bg-[var(--color-success-green)]/10 flex items-center justify-center text-[var(--color-success-green)]">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">Total Pendapatan</div>
              <div className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)]">
                {loading ? "-" : formatPrice(stats.totalRevenue)}
              </div>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4 bg-white border-b-4 border-b-[var(--color-accent-coral)]">
            <div className="w-12 h-12 rounded-lg bg-[var(--color-accent-coral)]/10 flex items-center justify-center text-[var(--color-accent-coral)]">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">Sesi Pending</div>
              <div className="text-2xl font-bold font-[var(--font-inter)] text-[var(--color-ink)]">
                {loading ? "-" : stats.pendingSessions}
              </div>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4 bg-white border-b-4 border-b-[var(--color-accent-yellow)]">
            <div className="w-12 h-12 rounded-lg bg-[var(--color-accent-yellow)]/20 flex items-center justify-center text-[var(--color-accent-yellow)]">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">Review Bukti Bayar</div>
              <div className="text-2xl font-bold font-[var(--font-inter)] text-[var(--color-ink)]">
                {loading ? "-" : (stats.pendingInvoices + stats.pendingOrders)}
              </div>
            </div>
          </Card>
        </div>

        {/* Navigation Grid */}
        <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] border-b-2 border-dashed border-[var(--color-line)] pb-2 inline-block mt-8">
          Menu Utama
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {adminLinks.map((link, idx) => (
            <Link href={link.href} key={idx} className="group">
              <Card variant="sketch" className="p-6 h-full flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform bg-white">
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl ${link.bg} ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {link.icon}
                  </div>
                  {(link.badge || 0) > 0 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--color-danger-red)] text-white text-xs flex items-center justify-center font-bold border-2 border-white">
                      {link.badge}
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-sm text-[var(--color-ink)] font-[var(--font-inter)]">
                  {link.label}
                </h3>
              </Card>
            </Link>
          ))}
        </div>

      </div>
    </PaperBackground>
  );
}
