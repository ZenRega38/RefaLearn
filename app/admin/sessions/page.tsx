"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Textarea } from "@/components/ui/Textarea";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { Check, X, Eye, Edit3, MessageSquare, Clock, RefreshCw, Calendar } from "lucide-react";
import { formatPrice } from "@/lib/pricing";

type Profile = {
  full_name: string;
  phone: string;
};

type Session = {
  id: string;
  student_id: string;
  series_id: string | null;
  date: string;
  start_time: string;
  end_time: string;
  day_type: string;
  price: number;
  status: 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled' | 'no_show';
  notes: string | null;
  profiles: Profile;
};

type RescheduleRequest = {
  id: string;
  session_id: string;
  requested_date: string;
  requested_start_time: string;
  requested_end_time: string;
  reason: string | null;
  sessions: { date: string; start_time: string; student_id: string; profiles: Profile };
};

export default function AdminSessionsPage() {
  const supabase = createClient();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [rescheduleRequests, setRescheduleRequests] = useState<RescheduleRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'upcoming' | 'past'>('pending');

  // Notes state
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  const fetchSessions = async () => {
    setLoading(true);
    let query = supabase
      .from('sessions')
      .select('*, profiles(full_name, phone)');

    const todayStr = format(new Date(), 'yyyy-MM-dd');

    if (filter === 'pending') {
      query = query.eq('status', 'pending');
    } else if (filter === 'upcoming') {
      query = query.in('status', ['accepted']).gte('date', todayStr);
    } else if (filter === 'past') {
      query = query.in('status', ['completed', 'cancelled', 'no_show']);
    }

    // Always sort pending first, then by date ascending
    query = query
      .order('status', { ascending: false }) // 'pending' comes after 'accepted' alphabetically, wait we should sort by date
      .order('date', { ascending: true })
      .order('start_time', { ascending: true });

    const { data, error } = await query;
    if (data) setSessions(data as Session[]);
    setLoading(false);
  };

  const fetchRescheduleRequests = async () => {
    const { data } = await supabase
      .from('reschedule_requests')
      .select('id, session_id, requested_date, requested_start_time, requested_end_time, reason, sessions(date, start_time, student_id, profiles(full_name, phone))')
      .eq('status', 'pending')
      .order('created_at', { ascending: true });

    if (data) setRescheduleRequests(data as any);
  };

  const handleRescheduleDecision = async (req: RescheduleRequest, approve: boolean) => {
    if (approve) {
      const { getDayType, getSessionPrice } = await import("@/lib/pricing");
      const newDate = new Date(`${req.requested_date}T00:00:00`);

      const { error: sessionUpdateError } = await supabase
        .from('sessions')
        .update({
          date: req.requested_date,
          start_time: req.requested_start_time,
          end_time: req.requested_end_time,
          day_type: getDayType(newDate),
          price: getSessionPrice(newDate),
        })
        .eq('id', req.session_id);

      if (sessionUpdateError) {
        alert(`Gagal approve — kemungkinan slot itu sudah terisi: ${sessionUpdateError.message}`);
        return;
      }
    }

    const { error } = await supabase
      .from('reschedule_requests')
      .update({ status: approve ? 'approved' : 'rejected', resolved_at: new Date().toISOString() })
      .eq('id', req.id);

    if (error) {
      alert(`Gagal update status request: ${error.message}`);
      return;
    }

    fetchRescheduleRequests();
    fetchSessions();
  };

  useEffect(() => {
    fetchSessions();
    fetchRescheduleRequests();
  }, [filter]);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('sessions')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      fetchSessions();
    } else {
      alert(`Gagal update status: ${error.message}`);
    }
  };

  const openNotesModal = (session: Session) => {
    setCurrentSessionId(session.id);
    setNotes(session.notes || "");
    setIsNotesModalOpen(true);
  };

  const saveNotes = async () => {
    if (!currentSessionId) return;
    setSavingNotes(true);

    const { error } = await supabase
      .from('sessions')
      .update({ notes })
      .eq('id', currentSessionId);

    setSavingNotes(false);

    if (!error) {
      setIsNotesModalOpen(false);
      fetchSessions();
    } else {
      alert(`Gagal menyimpan catatan: ${error.message}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="amber">Menunggu</Badge>;
      case 'accepted': return <Badge variant="blue">Disetujui</Badge>;
      case 'declined': return <Badge variant="red">Ditolak</Badge>;
      case 'completed': return <Badge variant="green">Selesai</Badge>;
      case 'cancelled': return <Badge variant="outline">Dibatalkan</Badge>;
      case 'no_show': return <Badge variant="red">No Show</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatTimeStr = (time: string) => time.substring(0, 5);

  return (
    <PaperBackground className="p-4 md:p-8 min-h-screen relative">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">
            Manajemen Kelas & Sesi
          </h1>
          <div className="flex gap-2">
            <select
              className="input-field py-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
            >
              <option value="pending">Menunggu Konfirmasi</option>
              <option value="upcoming">Akan Datang (Disetujui)</option>
              <option value="past">Riwayat / Selesai</option>
              <option value="all">Semua Sesi</option>
            </select>
            <Button variant="ghost" onClick={fetchSessions} size="sm" className="px-3">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {rescheduleRequests.length > 0 && (
          <Card className="p-4 border-2 border-[var(--color-brand-blue)]/40 bg-blue-50/50 space-y-3">
            <h2 className="font-bold font-[var(--font-inter)] text-[var(--color-brand-blue)]">
              Permintaan Reschedule ({rescheduleRequests.length})
            </h2>
            {rescheduleRequests.map((req) => (
              <div key={req.id} className="bg-white rounded-[var(--radius-card)] border border-[var(--color-line)] p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm font-[var(--font-inter)]">
                <div>
                  <div className="font-semibold">{req.sessions?.profiles?.full_name}</div>
                  <div className="text-[var(--color-ink-soft)]">
                    {format(parseISO(req.sessions.date), 'dd MMM yyyy', { locale: id })} {req.sessions.start_time.substring(0, 5)}
                    {" → "}
                    {format(parseISO(req.requested_date), 'dd MMM yyyy', { locale: id })} {req.requested_start_time.substring(0, 5)}
                  </div>
                  {req.reason && <div className="text-xs text-[var(--color-ink-soft)] italic mt-1">"{req.reason}"</div>}
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" onClick={() => handleRescheduleDecision(req, true)} className="bg-[var(--color-success-green)] hover:bg-[var(--color-success-green)] border-transparent text-white">
                    <Check className="w-4 h-4 mr-1" /> Approve
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleRescheduleDecision(req, false)} className="text-[var(--color-danger-red)]">
                    <X className="w-4 h-4 mr-1" /> Tolak
                  </Button>
                </div>
              </div>
            ))}
          </Card>
        )}

        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse font-[var(--font-inter)]">
              <thead>
                <tr className="bg-[var(--color-paper-bg-alt)] border-b border-[var(--color-line)]">
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Tanggal & Waktu</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Siswa</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)]">Harga / Tipe</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)] text-center">Status</th>
                  <th className="p-4 font-semibold text-[var(--color-ink-soft)] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="p-8 text-center text-[var(--color-ink-soft)]">Memuat...</td></tr>
                ) : sessions.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-[var(--color-ink-soft)]">Tidak ada data sesi untuk filter ini.</td></tr>
                ) : (
                  sessions.map((session, idx) => {
                    const prevSeriesId = sessions[idx - 1]?.series_id;
                    const isNewSeriesGroup = !!session.series_id && session.series_id !== prevSeriesId;
                    const seriesCount = session.series_id
                      ? sessions.filter(s => s.series_id === session.series_id).length
                      : 0;

                    return (
                      <>
                        {isNewSeriesGroup && (
                          <tr key={`${session.series_id}-header`} className="bg-blue-50/60">
                            <td colSpan={5} className="px-4 py-1.5 text-xs font-bold text-[var(--color-brand-blue)] font-[var(--font-inter)] uppercase tracking-wide">
                              ↻ Rangkaian Mingguan — {session.profiles?.full_name} ({seriesCount} sesi)
                            </td>
                          </tr>
                        )}
                        <tr key={session.id} className={`border-b border-[var(--color-line)] hover:bg-[var(--color-paper-bg-alt)]/50 transition-colors ${session.series_id ? 'bg-blue-50/20' : ''}`}>
                          <td className="p-4">
                            <div className="font-semibold text-[var(--color-ink)] flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-[var(--color-brand-blue)]" />
                              {format(parseISO(session.date), 'dd MMM yyyy', { locale: id })}
                            </div>
                            <div className="text-xs text-[var(--color-ink-soft)] mt-1 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {formatTimeStr(session.start_time)} - {formatTimeStr(session.end_time)}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-[var(--color-ink)]">{session.profiles?.full_name || 'Unknown'}</div>
                            <div className="text-xs text-[var(--color-ink-soft)] flex items-center gap-1 mt-1">
                              <a href={`https://wa.me/${session.profiles?.phone?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-[var(--color-success-green)] hover:underline flex items-center gap-1">
                                {session.profiles?.phone || '-'}
                              </a>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-[var(--color-ink)]">{formatPrice(session.price)}</div>
                            <div className="text-xs text-[var(--color-ink-soft)] capitalize">{session.day_type}</div>
                          </td>
                          <td className="p-4 text-center">
                            {getStatusBadge(session.status)}
                          </td>
                          <td className="p-4 text-right">

                            {/* Pending Actions */}
                            {session.status === 'pending' && (
                              <div className="flex justify-end gap-2">
                                <Button size="sm" onClick={() => updateStatus(session.id, 'accepted')} className="px-3 bg-[var(--color-success-green)] hover:bg-[var(--color-success-green)] border-transparent text-white">
                                  <Check className="w-4 h-4 mr-1" /> Terima
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => updateStatus(session.id, 'declined')} className="px-3 text-[var(--color-danger-red)] hover:bg-[var(--color-danger-red)]/10">
                                  <X className="w-4 h-4 mr-1" /> Tolak
                                </Button>
                              </div>
                            )}

                            {/* Accepted/Upcoming Actions */}
                            {session.status === 'accepted' && (
                              <div className="flex justify-end gap-2">
                                <Button size="sm" variant="sketch" onClick={() => openNotesModal(session)} className="px-2" title="Catatan Kelas">
                                  <Edit3 className="w-4 h-4" />
                                </Button>
                                <Button size="sm" onClick={() => updateStatus(session.id, 'completed')} className="px-3">
                                  Selesai
                                </Button>
                                <select
                                  className="input-field py-1 px-2 text-xs w-28 bg-transparent"
                                  onChange={(e) => {
                                    if (e.target.value) updateStatus(session.id, e.target.value);
                                    e.target.value = "";
                                  }}
                                  value=""
                                >
                                  <option value="" disabled>Lainnya...</option>
                                  <option value="cancelled">Batal</option>
                                  <option value="no_show">No Show</option>
                                </select>
                              </div>
                            )}

                            {/* Completed/Past Actions */}
                            {['completed', 'cancelled', 'no_show', 'declined'].includes(session.status) && (
                              <div className="flex justify-end gap-2">
                                <Button size="sm" variant="ghost" onClick={() => openNotesModal(session)} className="px-3">
                                  <Eye className="w-4 h-4 mr-1" /> Catatan
                                </Button>
                              </div>
                            )}
                          </td>
                        </tr>
                      </>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Notes Modal */}
      {isNotesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[var(--color-paper-bg)] w-full max-w-lg rounded-[var(--radius-card)] border-2 border-[var(--color-line)] shadow-2xl flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-line)] bg-white">
              <h2 className="text-xl font-[var(--font-kalam)] text-[var(--color-brand-blue)] flex items-center gap-2">
                <MessageSquare className="w-5 h-5" /> Catatan Sesi
              </h2>
              <button onClick={() => setIsNotesModalOpen(false)} className="p-2 text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-bg-alt)] rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <Textarea
                label="Catatan Progress Siswa (Internal)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tulis ringkasan materi hari ini, PR, evaluasi, dll..."
                rows={6}
              />
            </div>

            <div className="p-4 border-t border-[var(--color-line)] bg-[var(--color-paper-bg-alt)] flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setIsNotesModalOpen(false)}>Tutup</Button>
              <Button onClick={saveNotes} isLoading={savingNotes}>Simpan Catatan</Button>
            </div>
          </div>
        </div>
      )}

    </PaperBackground>
  );
}
