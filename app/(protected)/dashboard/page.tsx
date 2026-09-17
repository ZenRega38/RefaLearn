"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Textarea } from "@/components/ui/Textarea";
import { DatePicker } from "@/components/booking/DatePicker";
import { TimeSlotGrid } from "@/components/booking/TimeSlotGrid";
import { generateAvailableSlots, Slot, AvailabilityRule, BlackoutDate } from "@/lib/rrule-helpers";
import { formatPrice } from "@/lib/pricing";
import { cancelSessionsAsStudent, CANCELLATION_FEE_AMOUNT } from "@/lib/cancellation";
import { format, parseISO, startOfToday, addMonths, isSameDay } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarCheck, Clock, RefreshCw, AlertTriangle, Repeat, X, Info } from "lucide-react";

type SessionRow = {
  id: string;
  series_id: string | null;
  date: string;
  start_time: string;
  end_time: string;
  day_type: string;
  price: number;
  status: 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled' | 'no_show';
};

type RescheduleRequest = {
  id: string;
  session_id: string;
  requested_date: string;
  requested_start_time: string;
  status: 'pending' | 'approved' | 'rejected';
};

type CancellationFee = {
  id: string;
  amount: number;
  status: 'unpaid' | 'waived' | 'invoiced';
};

export default function StudentSessionsDashboard() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [rescheduleRequests, setRescheduleRequests] = useState<RescheduleRequest[]>([]);
  const [unpaidFees, setUnpaidFees] = useState<CancellationFee[]>([]);

  // Cancel modal
  const [cancelTarget, setCancelTarget] = useState<SessionRow[] | null>(null);
  const [cancelling, setCancelling] = useState(false);

  // Reschedule modal
  const [rescheduleTarget, setRescheduleTarget] = useState<SessionRow | null>(null);
  const [rules, setRules] = useState<AvailabilityRule[]>([]);
  const [blackouts, setBlackouts] = useState<BlackoutDate[]>([]);
  const [allSlots, setAllSlots] = useState<Slot[]>([]);
  const [rescheduleDate, setRescheduleDate] = useState<Date | undefined>(undefined);
  const [rescheduleSlot, setRescheduleSlot] = useState<Slot | null>(null);
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [submittingReschedule, setSubmittingReschedule] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }
    setStudentId(user.id);

    const { data: sessionsData } = await supabase
      .from('sessions')
      .select('id, series_id, date, start_time, end_time, day_type, price, status')
      .eq('student_id', user.id)
      .order('date', { ascending: true })
      .order('start_time', { ascending: true });

    if (sessionsData) setSessions(sessionsData as SessionRow[]);

    const { data: rescheduleData } = await supabase
      .from('reschedule_requests')
      .select('id, session_id, requested_date, requested_start_time, status')
      .eq('student_id', user.id)
      .eq('status', 'pending');

    if (rescheduleData) setRescheduleRequests(rescheduleData as RescheduleRequest[]);

    const { data: feesData } = await supabase
      .from('cancellation_fees')
      .select('id, amount, status')
      .eq('student_id', user.id)
      .eq('status', 'unpaid');

    if (feesData) setUnpaidFees(feesData as CancellationFee[]);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const openRescheduleModal = async (session: SessionRow) => {
    setRescheduleTarget(session);
    setRescheduleDate(undefined);
    setRescheduleSlot(null);
    setRescheduleReason("");

    const { data: rulesData } = await supabase.from('availability_rules').select('*').eq('is_active', true);
    const { data: blackoutsData } = await supabase.from('blackout_dates').select('*');
    const { data: bookedData } = await supabase
      .from('sessions')
      .select('date, start_time')
      .in('status', ['pending', 'accepted'])
      .gte('date', format(startOfToday(), 'yyyy-MM-dd'));

    if (rulesData) {
      setRules(rulesData);
      setBlackouts(blackoutsData || []);
      const slots = generateAvailableSlots(
        rulesData as AvailabilityRule[],
        (blackoutsData || []) as BlackoutDate[],
        startOfToday(),
        addMonths(startOfToday(), 2)
      );
      const booked = bookedData || [];
      const openSlots = slots.filter(slot => {
        const slotDateStr = format(slot.date, 'yyyy-MM-dd');
        return !booked.some(b => b.date === slotDateStr && b.start_time === slot.start_time);
      });
      setAllSlots(openSlots);
    }
  };

  const submitReschedule = async () => {
    if (!rescheduleTarget || !rescheduleSlot || !studentId) return;
    setSubmittingReschedule(true);
    try {
      const { error } = await supabase.from('reschedule_requests').insert([{
        session_id: rescheduleTarget.id,
        student_id: studentId,
        original_date: rescheduleTarget.date,
        original_start_time: rescheduleTarget.start_time,
        requested_date: format(rescheduleSlot.date, 'yyyy-MM-dd'),
        requested_start_time: rescheduleSlot.start_time,
        requested_end_time: rescheduleSlot.end_time,
        reason: rescheduleReason || null,
      }]);
      if (error) throw error;

      alert("Permintaan reschedule terkirim, menunggu persetujuan admin.");
      setRescheduleTarget(null);
      fetchData();
    } catch (err: any) {
      alert(`Gagal mengirim permintaan: ${err.message}`);
    } finally {
      setSubmittingReschedule(false);
    }
  };

  const confirmCancel = async () => {
    if (!cancelTarget || !studentId) return;
    setCancelling(true);
    try {
      await cancelSessionsAsStudent(supabase, studentId, cancelTarget.map(s => s.id));
      alert(`${cancelTarget.length} sesi dibatalkan. Denda satu kali Rp50.000 akan otomatis masuk ke tagihan bulan depan.`);
      setCancelTarget(null);
      fetchData();
    } catch (err: any) {
      alert(`Gagal membatalkan: ${err.message}`);
    } finally {
      setCancelling(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="amber">Menunggu Konfirmasi</Badge>;
      case 'accepted': return <Badge variant="blue">Terjadwal</Badge>;
      case 'declined': return <Badge variant="red">Ditolak</Badge>;
      case 'completed': return <Badge variant="green">Selesai</Badge>;
      case 'cancelled': return <Badge variant="outline">Dibatalkan</Badge>;
      case 'no_show': return <Badge variant="red">Tidak Hadir</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const hasPendingReschedule = (sessionId: string) =>
    rescheduleRequests.some(r => r.session_id === sessionId);

  // Kelompokkan per series_id; sesi tanpa series_id (booking sekali) masing-masing jadi grupnya sendiri.
  const groups: { key: string; series: boolean; sessions: SessionRow[] }[] = [];
  const seriesMap = new Map<string, SessionRow[]>();
  for (const s of sessions) {
    if (s.series_id) {
      if (!seriesMap.has(s.series_id)) seriesMap.set(s.series_id, []);
      seriesMap.get(s.series_id)!.push(s);
    } else {
      groups.push({ key: s.id, series: false, sessions: [s] });
    }
  }
  for (const [seriesId, seriesSessions] of seriesMap) {
    groups.push({ key: seriesId, series: true, sessions: seriesSessions });
  }
  groups.sort((a, b) => a.sessions[0].date.localeCompare(b.sessions[0].date));

  const totalUnpaidFee = unpaidFees.reduce((sum, f) => sum + f.amount, 0);

  return (
    <PaperBackground className="pt-24 pb-20 min-h-screen">
      <div className="container-main max-w-4xl mx-auto space-y-8">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-ink)] flex items-center gap-2">
            <CalendarCheck className="w-8 h-8 text-[var(--color-brand-blue)]" /> Sesi Saya
          </h1>
          <div className="flex gap-2">
            <Button variant="secondary" href="/schedule" size="sm">Booking Sesi Baru</Button>
            <Button variant="ghost" onClick={fetchData} size="sm" className="px-3">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {totalUnpaidFee > 0 && (
          <div className="flex items-start gap-3 p-4 rounded-[var(--radius-card)] bg-amber-50 border border-amber-300 text-amber-800 font-[var(--font-inter)] text-sm">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              Anda punya denda pembatalan yang belum lunas sebesar <strong>{formatPrice(totalUnpaidFee)}</strong>.
              Ini akan otomatis ditambahkan ke tagihan bulan depan.
            </p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-[var(--color-ink-soft)] font-[var(--font-inter)]">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-[var(--color-brand-blue)]" />
            Memuat sesi...
          </div>
        ) : groups.length === 0 ? (
          <Card className="text-center py-16 bg-white/50 border-dashed border-[var(--color-line)]">
            <CalendarCheck className="w-16 h-16 text-[var(--color-line)] mx-auto mb-4" />
            <h3 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-2">Belum ada sesi</h3>
            <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)] mb-6">Anda belum melakukan booking kelas.</p>
            <Button href="/schedule">Booking Sekarang</Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {groups.map((group) => {
              const cancellableInGroup = group.sessions.filter(s => ['pending', 'accepted'].includes(s.status));

              return (
                <Card key={group.key} variant="sketch" className="p-0 overflow-hidden">
                  {group.series && (
                    <div className="bg-[var(--color-paper-bg-alt)] border-b border-[var(--color-line)] px-4 py-2.5 flex items-center justify-between gap-3">
                      <span className="text-xs font-bold font-[var(--font-inter)] text-[var(--color-brand-blue)] flex items-center gap-1.5 uppercase tracking-wide">
                        <Repeat className="w-3.5 h-3.5" /> Rangkaian Mingguan ({group.sessions.length} sesi)
                      </span>
                      {cancellableInGroup.length > 1 && (
                        <button
                          onClick={() => setCancelTarget(cancellableInGroup)}
                          className="text-xs font-[var(--font-inter)] text-[var(--color-danger-red)] hover:underline flex items-center gap-1"
                        >
                          <X className="w-3.5 h-3.5" /> Batalkan Sisa Rangkaian ({cancellableInGroup.length})
                        </button>
                      )}
                    </div>
                  )}

                  <div className="divide-y divide-[var(--color-line)]">
                    {group.sessions.map((session) => (
                      <div key={session.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="font-semibold text-[var(--color-ink)] font-[var(--font-inter)] flex items-center gap-2">
                            {format(parseISO(session.date), 'EEEE, dd MMM yyyy', { locale: id })}
                          </div>
                          <div className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)] flex items-center gap-1.5 mt-1">
                            <Clock className="w-3.5 h-3.5" />
                            {session.start_time.substring(0, 5)} - {session.end_time.substring(0, 5)} · {formatPrice(session.price)}
                          </div>
                          {hasPendingReschedule(session.id) && (
                            <div className="text-xs text-[var(--color-brand-blue)] font-[var(--font-inter)] flex items-center gap-1 mt-1">
                              <Info className="w-3.5 h-3.5" /> Menunggu persetujuan reschedule
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {getStatusBadge(session.status)}
                          {['pending', 'accepted'].includes(session.status) && !hasPendingReschedule(session.id) && (
                            <>
                              <Button size="sm" variant="secondary" onClick={() => openRescheduleModal(session)} className="text-xs">
                                Reschedule
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setCancelTarget([session])}
                                className="text-xs text-[var(--color-danger-red)] hover:bg-[var(--color-danger-red)]/10"
                              >
                                Batalkan
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal: Konfirmasi Batalkan */}
      {cancelTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md space-y-4">
            <h3 className="font-[var(--font-kalam)] text-2xl text-[var(--color-danger-red)] flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" /> Batalkan {cancelTarget.length > 1 ? `${cancelTarget.length} Sesi` : "Sesi"}?
            </h3>
            <p className="text-sm font-[var(--font-inter)] text-[var(--color-ink)]">
              Pembatalan ini akan dikenakan denda <strong>satu kali {formatPrice(CANCELLATION_FEE_AMOUNT)}</strong>
              {" "}(bukan per sesi, meski Anda membatalkan {cancelTarget.length} sesi sekaligus). Denda akan otomatis
              masuk ke tagihan bulan depan.
            </p>
            <p className="text-sm font-[var(--font-inter)] text-[var(--color-ink-soft)]">
              Pertimbangkan <strong>Reschedule</strong> sebagai gantinya kalau Anda cuma perlu pindah jadwal — itu tidak kena denda.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={() => setCancelTarget(null)}>Batal</Button>
              <Button
                onClick={confirmCancel}
                isLoading={cancelling}
                className="bg-[var(--color-danger-red)] hover:bg-[var(--color-danger-red)] border-transparent text-white"
              >
                Ya, Batalkan
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Modal: Reschedule */}
      {rescheduleTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <Card className="w-full max-w-2xl space-y-4 my-8">
            <div className="flex items-center justify-between">
              <h3 className="font-[var(--font-kalam)] text-2xl text-[var(--color-brand-blue)]">Reschedule Sesi</h3>
              <button onClick={() => setRescheduleTarget(null)} className="p-2 text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-bg-alt)] rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm font-[var(--font-inter)] text-[var(--color-ink-soft)]">
              Jadwal semula: {format(parseISO(rescheduleTarget.date), 'EEEE, dd MMM yyyy', { locale: id })}, {rescheduleTarget.start_time.substring(0, 5)}
            </p>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <DatePicker
                  selected={rescheduleDate}
                  onSelect={(date) => { setRescheduleDate(date); setRescheduleSlot(null); }}
                  availableDates={allSlots.map(s => s.date).reduce((acc, cur) => acc.some(d => isSameDay(d, cur)) ? acc : [...acc, cur], [] as Date[])}
                />
              </div>
              <div className="md:w-1/2">
                {rescheduleDate ? (
                  <TimeSlotGrid
                    slots={allSlots.filter(s => isSameDay(s.date, rescheduleDate))}
                    selectedSlot={rescheduleSlot}
                    onSelect={setRescheduleSlot}
                    isLoading={false}
                  />
                ) : (
                  <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] italic">Pilih tanggal dulu di sebelah kiri.</p>
                )}
              </div>
            </div>

            <Textarea
              label="Alasan (opsional)"
              value={rescheduleReason}
              onChange={(e) => setRescheduleReason(e.target.value)}
              placeholder="Misal: ada acara keluarga mendadak"
              rows={2}
            />

            <div className="flex justify-end gap-3 pt-2 border-t border-[var(--color-line)]">
              <Button variant="ghost" onClick={() => setRescheduleTarget(null)}>Batal</Button>
              <Button onClick={submitReschedule} isLoading={submittingReschedule} disabled={!rescheduleSlot}>
                Kirim Permintaan
              </Button>
            </div>
          </Card>
        </div>
      )}
    </PaperBackground>
  );
}