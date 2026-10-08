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
  ShieldCheck,
  Wallet,
  Handshake,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/pricing";
import { todayStr, APP_TIMEZONE_LABEL } from "@/lib/time";
import { hhmm } from "@/lib/format";

type TodaySession = { id: string; start_time: string; end_time: string; status: string; profiles: { full_name: string } | null };

type DashboardStats = {
  totalStudents: number;
  pendingSessions: number;
  pendingInvoices: number;
  pendingOrders: number;
  pendingPrepayments: number;
  pendingReschedules: number;
  unreadChats: number;
  totalRevenue: number;
};

export default function AdminOverviewDashboard() {
  const [supabase] = useState(() => createClient());
  const [todaySessions, setTodaySessions] = useState<TodaySession[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    pendingSessions: 0,
    pendingInvoices: 0,
    pendingOrders: 0,
    pendingPrepayments: 0,
    pendingReschedules: 0,
    unreadChats: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const count = (q: PromiseLike<{ count: number | null }>) => Promise.resolve(q).then((r) => r.count || 0);

      const [
        totalStudents,
        pendingSessions,
        pendingInvoices,
        pendingOrders,
        pendingPrepayments,
        pendingReschedules,
        unreadChats,
        revenueRows,
        today,
      ] = await Promise.all([
        count(supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student')),
        count(supabase.from('sessions').select('*', { count: 'exact', head: true }).eq('status', 'pending')),
        count(supabase.from('invoices').select('*', { count: 'exact', head: true }).eq('status', 'proof_uploaded')),
        count(supabase.from('material_orders').select('*', { count: 'exact', head: true }).eq('status', 'proof_uploaded')),
        count(supabase.from('prepayments').select('*', { count: 'exact', head: true }).eq('status', 'proof_uploaded')),
        count(supabase.from('reschedule_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending')),
        count(supabase.from('chat_messages').select('*', { count: 'exact', head: true }).eq('is_read', false).neq('sender_id', user?.id ?? '')),
        Promise.all([
          supabase.from('invoices').select('total_amount').eq('status', 'confirmed'),
          supabase.from('material_orders').select('total_amount').eq('status', 'confirmed'),
          supabase.from('prepayments').select('total_amount').eq('status', 'confirmed'),
        ]),
        supabase
          .from('sessions')
          .select('id, start_time, end_time, status, profiles(full_name)')
          .eq('date', todayStr())
          .eq('status', 'accepted')
          .order('start_time', { ascending: true }),
      ]);

      // Total collected: confirmed monthly invoices + confirmed material
      // orders + confirmed prepayments.
      const totalRevenue = revenueRows
        .flatMap((r) => r.data || [])
        .reduce((sum, row) => sum + (row.total_amount || 0), 0);

      setTodaySessions((today.data || []) as unknown as TodaySession[]);
      setStats({
        totalStudents,
        pendingSessions,
        pendingInvoices,
        pendingOrders,
        pendingPrepayments,
        pendingReschedules,
        unreadChats,
        totalRevenue,
      });
      setLoading(false);
    };

    fetchStats();
  }, [supabase]);

  const adminLinks = [
    { href: "/admin/chat", label: "Inbox Chat", icon: <MessageCircle className="w-6 h-6" />, color: "text-[var(--color-brand-blue)]", bg: "bg-[var(--color-brand-blue)]/10", badge: stats.unreadChats },
    { href: "/admin/sessions", label: "Kelas & Sesi", icon: <Video className="w-6 h-6" />, color: "text-[var(--color-accent-coral)]", bg: "bg-[var(--color-accent-coral)]/10", badge: stats.pendingSessions + stats.pendingReschedules },
    { href: "/admin/availability", label: "Jadwal & Ketersediaan", icon: <Calendar className="w-6 h-6" />, color: "text-[var(--color-accent-yellow)]", bg: "bg-[var(--color-accent-yellow)]/20" },
    { href: "/admin/invoices", label: "Tagihan Bulanan", icon: <Receipt className="w-6 h-6" />, color: "text-[var(--color-success-green)]", bg: "bg-[var(--color-success-green)]/10", badge: stats.pendingInvoices },
    { href: "/admin/materials", label: "Materi Digital", icon: <BookOpen className="w-6 h-6" />, color: "text-purple-500", bg: "bg-purple-100" },
    { href: "/admin/material-orders", label: "Pembelian Materi", icon: <ShoppingBag className="w-6 h-6" />, color: "text-pink-500", bg: "bg-pink-100", badge: stats.pendingOrders },
    { href: "/admin/prepayments", label: "Bayar di Muka", icon: <Wallet className="w-6 h-6" />, color: "text-teal-600", bg: "bg-teal-100", badge: stats.pendingPrepayments },
    { href: "/admin/news", label: "Manajemen Berita", icon: <Newspaper className="w-6 h-6" />, color: "text-indigo-500", bg: "bg-indigo-100" },
    { href: "/admin/alumni", label: "Kisah Alumni", icon: <GraduationCap className="w-6 h-6" />, color: "text-orange-500", bg: "bg-orange-100" },
    { href: "/admin/partners", label: "Partner", icon: <Handshake className="w-6 h-6" />, color: "text-cyan-600", bg: "bg-cyan-100" },
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
                {loading ? "-" : (stats.pendingInvoices + stats.pendingOrders + stats.pendingPrepayments)}
              </div>
            </div>
          </Card>
        </div>

        {/* Today */}
        <Card variant="sketch" className="p-5 bg-white">
          <h2 className="text-lg font-bold font-[var(--font-inter)] text-[var(--color-ink)] flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-[var(--color-accent-coral)]" /> Sesi Hari Ini
          </h2>
          {loading ? (
            <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">Memuat...</p>
          ) : todaySessions.length === 0 ? (
            <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">Tidak ada sesi terjadwal hari ini.</p>
          ) : (
            <ul className="divide-y divide-[var(--color-line)] font-[var(--font-inter)] text-sm">
              {todaySessions.map((s) => (
                <li key={s.id} className="py-2 flex justify-between gap-4">
                  <span className="font-semibold text-[var(--color-ink)]">{s.profiles?.full_name || 'Siswa'}</span>
                  <span className="text-[var(--color-ink-soft)]">{hhmm(s.start_time)}–{hhmm(s.end_time)} {APP_TIMEZONE_LABEL}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

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
