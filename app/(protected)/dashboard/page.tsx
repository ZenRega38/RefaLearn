"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SketchBox } from "@/components/sketch/SketchBox";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar, Clock, LogOut, Video, Receipt, User } from "lucide-react";

type Session = {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled' | 'no_show';
  price: number;
};

export default function StudentDashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setProfile(profileData);

      const { data: sessionsData } = await supabase
        .from('sessions')
        .select('*')
        .eq('student_id', user.id)
        .order('date', { ascending: true })
        .order('start_time', { ascending: true });
        
      if (sessionsData) setSessions(sessionsData as Session[]);
      
      setLoading(false);
    };

    fetchDashboard();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="amber">Menunggu Konfirmasi</Badge>;
      case 'accepted': return <Badge variant="blue">Jadwal Fix</Badge>;
      case 'declined': return <Badge variant="red">Ditolak Admin</Badge>;
      case 'completed': return <Badge variant="green">Selesai</Badge>;
      case 'cancelled': return <Badge variant="outline">Batal</Badge>;
      case 'no_show': return <Badge variant="red">Tidak Hadir</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const upcomingSessions = sessions.filter(s => ['pending', 'accepted'].includes(s.status));
  const pastSessions = sessions.filter(s => ['completed', 'cancelled', 'no_show', 'declined'].includes(s.status));

  if (loading) {
    return <PaperBackground className="flex items-center justify-center min-h-screen">Memuat dashboard...</PaperBackground>;
  }

  return (
    <PaperBackground className="pt-24 pb-20 min-h-screen">
      <div className="container-main max-w-6xl mx-auto space-y-8">
        
        {/* Header Profile */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 bg-white rounded-[var(--radius-card)] border-2 border-[var(--color-line)] shadow-[var(--shadow-sketch)]">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-[var(--color-paper-bg-alt)] border-2 border-[var(--color-brand-blue)] flex items-center justify-center text-[var(--color-brand-blue)] shrink-0">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-ink)] mb-1">
                Halo, <SketchBox color="var(--color-accent-coral)">{profile?.full_name?.split(' ')[0] || 'Siswa'}</SketchBox>!
              </h1>
              <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)] text-sm">
                Selamat datang di ruang belajar Anda.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button href="/schedule" variant="sketch">Booking Jadwal Baru</Button>
            <Button variant="ghost" onClick={handleLogout} className="text-[var(--color-danger-red)] hover:bg-[var(--color-danger-red)]/10">
              <LogOut className="w-4 h-4 mr-2" /> Keluar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content - Upcoming Sessions */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] border-b-2 border-dashed border-[var(--color-line)] pb-2 inline-block">
              Jadwal Akan Datang
            </h2>
            
            {upcomingSessions.length === 0 ? (
              <Card className="text-center py-12 bg-white/50">
                <Calendar className="w-12 h-12 text-[var(--color-line)] mx-auto mb-4" />
                <h3 className="text-lg font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-2">Belum ada jadwal</h3>
                <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] mb-6">Anda belum memiliki jadwal kelas yang aktif.</p>
                <Button href="/schedule">Cari Jadwal Kosong</Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {upcomingSessions.map((session) => {
                  const dateObj = parseISO(session.date);
                  const isAccepted = session.status === 'accepted';
                  
                  return (
                    <Card key={session.id} variant="sketch" className={`p-0 overflow-hidden flex flex-col sm:flex-row ${isAccepted ? 'border-[var(--color-brand-blue)]' : ''}`}>
                      {/* Date block */}
                      <div className={`p-4 sm:w-32 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-dashed border-[var(--color-line)] ${isAccepted ? 'bg-[var(--color-brand-blue)]/5' : 'bg-[var(--color-paper-bg-alt)]'}`}>
                        <span className="text-sm text-[var(--color-ink-soft)] font-bold uppercase tracking-wider">{format(dateObj, 'MMM', { locale: id })}</span>
                        <span className={`text-4xl font-[var(--font-kalam)] leading-none my-1 ${isAccepted ? 'text-[var(--color-brand-blue)]' : 'text-[var(--color-ink)]'}`}>
                          {format(dateObj, 'dd')}
                        </span>
                        <span className="text-xs text-[var(--color-ink-soft)]">{format(dateObj, 'EEEE', { locale: id })}</span>
                      </div>
                      
                      {/* Details block */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center relative">
                        <div className="absolute top-4 right-4">
                          {getStatusBadge(session.status)}
                        </div>
                        
                        <h4 className="font-bold text-lg text-[var(--color-ink)] font-[var(--font-inter)] mb-2">
                          1-on-1 English Session
                        </h4>
                        
                        <div className="flex items-center gap-2 text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] mb-4">
                          <Clock className="w-4 h-4 text-[var(--color-accent-coral)]" />
                          <span className="font-semibold">{session.start_time.substring(0,5)} - {session.end_time.substring(0,5)}</span>
                          <span className="mx-2 text-[var(--color-line)]">|</span>
                          <span>90 Menit</span>
                        </div>
                        
                        {isAccepted ? (
                          <div className="flex gap-3 mt-2">
                            <Button size="sm" className="bg-[var(--color-brand-blue)] gap-2">
                              <Video className="w-4 h-4" /> Masuk Zoom / GMeet
                            </Button>
                          </div>
                        ) : (
                          <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)] italic mt-2">
                            Admin akan segera mengonfirmasi jadwal ini via WhatsApp. Link Zoom akan tersedia setelah dikonfirmasi.
                          </p>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Sidebar - History & Billing */}
          <div className="space-y-8">
            
            {/* Quick Actions */}
            <Card className="p-5 border-[var(--color-line)] shadow-sm bg-white">
              <h3 className="font-bold text-[var(--color-ink)] font-[var(--font-inter)] mb-4 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[var(--color-accent-yellow)]" />
                Tagihan Bulanan
              </h3>
              <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] mb-4 pb-4 border-b border-dashed border-[var(--color-line)]">
                Invoice akan otomatis diterbitkan setiap tanggal 1 pada bulan berikutnya berdasarkan kelas yang telah diselesaikan.
              </p>
              <Button variant="outline" className="w-full text-sm" href="/dashboard/invoices">Lihat Riwayat Tagihan</Button>
            </Card>

            {/* Past Sessions */}
            <div className="space-y-4">
              <h3 className="font-bold text-[var(--color-ink)] font-[var(--font-inter)]">Riwayat Kelas</h3>
              
              {pastSessions.length === 0 ? (
                <p className="text-sm text-[var(--color-ink-soft)] italic font-[var(--font-inter)]">Belum ada riwayat kelas.</p>
              ) : (
                <div className="space-y-3">
                  {pastSessions.slice(0, 5).map(session => (
                    <div key={session.id} className="bg-white p-3 rounded-lg border border-[var(--color-line)] flex items-center justify-between text-sm">
                      <div>
                        <div className="font-semibold text-[var(--color-ink)]">{format(parseISO(session.date), 'dd MMM yyyy', { locale: id })}</div>
                        <div className="text-xs text-[var(--color-ink-soft)]">{session.start_time.substring(0,5)}</div>
                      </div>
                      {getStatusBadge(session.status)}
                    </div>
                  ))}
                  
                  {pastSessions.length > 5 && (
                    <Button variant="ghost" size="sm" className="w-full text-xs text-[var(--color-brand-blue)]">
                      Lihat Semua Riwayat
                    </Button>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </PaperBackground>
  );
}
