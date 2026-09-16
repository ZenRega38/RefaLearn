"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SketchBox } from "@/components/sketch/SketchBox";
import { DatePicker } from "@/components/booking/DatePicker";
import { TimeSlotGrid } from "@/components/booking/TimeSlotGrid";
import { ContractModal } from "@/components/booking/ContractModal";
import { generateAvailableSlots, Slot, AvailabilityRule, BlackoutDate } from "@/lib/rrule-helpers";
import { getDayType, getSessionPrice } from "@/lib/pricing";
import { isSameDay, format, startOfToday, addMonths, addWeeks } from "date-fns";
import { id } from "date-fns/locale";
import { AlertCircle, Repeat } from "lucide-react";

type ActiveContract = {
  id: string;
  content: string;
  version: number;
};

type BookedSlot = {
  date: string; // yyyy-MM-dd
  start_time: string;
};

// Pilihan jumlah sesi berturut-turut (mingguan). 1 = booking satu kali seperti biasa.
const SESSION_COUNT_OPTIONS = [1, 4, 8, 12, 16, 24];

export default function SchedulePage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  const [rules, setRules] = useState<AvailabilityRule[]>([]);
  const [blackouts, setBlackouts] = useState<BlackoutDate[]>([]);
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);
  const [allSlots, setAllSlots] = useState<Slot[]>([]);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(startOfToday());
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [isContractOpen, setIsContractOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Recurring booking state
  const [sessionCount, setSessionCount] = useState(1);
  const [recurringPreview, setRecurringPreview] = useState<{ date: Date; conflict: boolean }[] | null>(null);
  const [checkingRecurring, setCheckingRecurring] = useState(false);

  const [activeContract, setActiveContract] = useState<ActiveContract | null>(null);
  const [contractError, setContractError] = useState(false);

  const loadSlots = async () => {
    const { data: rulesData } = await supabase.from('availability_rules').select('*').eq('is_active', true);
    const { data: blackoutsData } = await supabase.from('blackout_dates').select('*');

    const { data: sessionsData } = await supabase
      .from('sessions')
      .select('date, start_time')
      .in('status', ['pending', 'accepted'])
      .gte('date', format(startOfToday(), 'yyyy-MM-dd'));

    if (rulesData) setRules(rulesData);
    if (blackoutsData) setBlackouts(blackoutsData);
    const booked = (sessionsData || []) as BookedSlot[];
    setBookedSlots(booked);

    if (rulesData) {
      const slots = generateAvailableSlots(
        rulesData as AvailabilityRule[],
        (blackoutsData || []) as BlackoutDate[],
        startOfToday(),
        addMonths(startOfToday(), 2)
      );

      const openSlots = slots.filter(slot => {
        const slotDateStr = format(slot.date, 'yyyy-MM-dd');
        return !booked.some(b => b.date === slotDateStr && b.start_time === slot.start_time);
      });

      setAllSlots(openSlots);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setUserProfile(profile);
      }

      const todayStr = format(startOfToday(), 'yyyy-MM-dd');
      const { data: contractData } = await supabase
        .from('contracts')
        .select('id, content, version')
        .lte('effective_date', todayStr)
        .order('version', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (contractData) {
        setActiveContract(contractData as ActiveContract);
      } else {
        setContractError(true);
      }

      await loadSlots();
      setLoading(false);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slotsForSelectedDate = allSlots.filter(s =>
    selectedDate && isSameDay(s.date, selectedDate)
  );

  const availableDates = allSlots.map(s => s.date).reduce((acc, current) => {
    const x = acc.find(item => isSameDay(item, current));
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, [] as Date[]);

  // Tanggal-tanggal untuk rangkaian mingguan: hari & jam sama, N minggu berturut-turut.
  const buildRecurringDates = (anchor: Date, count: number) => {
    const dates: Date[] = [];
    for (let i = 0; i < count; i++) {
      dates.push(addWeeks(anchor, i));
    }
    return dates;
  };

  // Setiap kali slot atau jumlah sesi berubah, preview lama sudah tidak valid.
  useEffect(() => {
    setRecurringPreview(null);
  }, [selectedSlot, sessionCount]);

  const handleCheckRecurring = async () => {
    if (!selectedSlot || sessionCount <= 1) return;

    setCheckingRecurring(true);
    try {
      const dates = buildRecurringDates(selectedSlot.date, sessionCount);
      const dateStrs = dates.map(d => format(d, 'yyyy-MM-dd'));

      // Cek fresh ke database, bukan cuma dari allSlots — soalnya allSlots cuma
      // meng-cover 2 bulan ke depan, sedangkan rangkaian panjang (24 sesi) bisa
      // lewat dari itu.
      const { data: clashSessions } = await supabase
        .from('sessions')
        .select('date')
        .in('date', dateStrs)
        .eq('start_time', selectedSlot.start_time)
        .in('status', ['pending', 'accepted']);

      const { data: blackoutRows } = await supabase
        .from('blackout_dates')
        .select('date')
        .in('date', dateStrs);

      const clashDates = new Set((clashSessions || []).map(s => s.date));
      const blackoutDateSet = new Set((blackoutRows || []).map(b => b.date));

      const preview = dates.map((d, i) => ({
        date: d,
        conflict: clashDates.has(dateStrs[i]) || blackoutDateSet.has(dateStrs[i]),
      }));

      setRecurringPreview(preview);
    } finally {
      setCheckingRecurring(false);
    }
  };

  const handleBookingStart = async () => {
    if (!selectedSlot) return;

    if (!userProfile) {
      router.push(`/login?returnUrl=/schedule`);
      return;
    }

    if (!activeContract) {
      alert("Kontrak/perjanjian kelas belum tersedia. Silakan hubungi admin sebelum melakukan booking.");
      return;
    }

    if (sessionCount > 1) {
      if (!recurringPreview) {
        await handleCheckRecurring();
        return; // munculkan preview dulu, user klik "Lanjut Booking" lagi setelah cek
      }
      if (recurringPreview.some(p => p.conflict)) {
        return; // tombol seharusnya sudah disabled, ini jaga-jaga
      }
    }

    setIsContractOpen(true);
  };

  const handleContractAccept = async (typedName: string) => {
    if (!selectedSlot || !userProfile || !activeContract) return;

    setBookingLoading(true);
    setIsContractOpen(false);

    try {
      const dates = sessionCount > 1 ? buildRecurringDates(selectedSlot.date, sessionCount) : [selectedSlot.date];
      const dateStrs = dates.map(d => format(d, 'yyyy-MM-dd'));

      // Cek ulang tepat sebelum nulis — guard yang sama seperti booking tunggal,
      // sekarang mencakup semua tanggal di rangkaian.
      const { data: clashing, error: clashError } = await supabase
        .from('sessions')
        .select('id')
        .in('date', dateStrs)
        .eq('start_time', selectedSlot.start_time)
        .in('status', ['pending', 'accepted']);

      if (clashError) throw clashError;

      if (clashing && clashing.length > 0) {
        alert("Maaf, salah satu tanggal di rangkaian ini baru saja dipesan orang lain. Silakan pilih ulang.");
        setSelectedSlot(null);
        setSessionCount(1);
        setRecurringPreview(null);
        await loadSlots();
        return;
      }

      const { data: acceptance, error: acceptanceError } = await supabase
        .from('contract_acceptances')
        .insert([{
          student_id: userProfile.id,
          contract_id: activeContract.id,
          typed_full_name: typedName,
        }])
        .select('id')
        .single();

      if (acceptanceError) throw acceptanceError;

      // Untuk rangkaian mingguan, bikin baris induk recurring_series dulu,
      // supaya tiap sesi di bawah bisa nyambung lewat series_id.
      let seriesId: string | null = null;
      if (sessionCount > 1) {
        const { data: series, error: seriesError } = await supabase
          .from('recurring_series')
          .insert([{
            student_id: userProfile.id,
            day_of_week: selectedSlot.date.getDay(),
            start_time: selectedSlot.start_time,
            start_date: dateStrs[0],
            end_date: dateStrs[dateStrs.length - 1],
            status: 'active',
          }])
          .select('id')
          .single();

        if (seriesError) throw seriesError;
        seriesId = series.id;
      }

      const sessionsToInsert = dates.map(d => ({
        student_id: userProfile.id,
        series_id: seriesId,
        date: format(d, 'yyyy-MM-dd'),
        start_time: selectedSlot.start_time,
        end_time: selectedSlot.end_time,
        day_type: getDayType(d),
        price: getSessionPrice(d),
        status: 'pending',
        contract_acceptance_id: acceptance.id,
      }));

      // Satu statement buat semua sesi — kalau ada satu tanggal yang bentrok
      // (constraint unique di DB), semuanya gagal bareng, gak ada yang
      // "setengah ke-booking".
      const { error: sessionError } = await supabase.from('sessions').insert(sessionsToInsert);

      if (sessionError) throw sessionError;

      alert(
        sessionCount > 1
          ? `Booking berhasil! ${sessionCount} sesi mingguan Anda sedang menunggu konfirmasi admin.`
          : "Booking berhasil! Permintaan jadwal Anda sedang menunggu konfirmasi admin."
      );
      router.push('/dashboard');

    } catch (err: any) {
      alert(`Gagal melakukan booking: ${err.message}`);
    } finally {
      setBookingLoading(false);
    }
  };

  const hasRecurringConflict = !!recurringPreview?.some(p => p.conflict);

  return (
    <PaperBackground>
      <div className="container-main pt-32 pb-20">

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4 font-[var(--font-kalam)]">
            Booking <SketchBox color="var(--color-brand-blue)">Jadwal Kelas</SketchBox>
          </h1>
          <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">
            Pilih tanggal dan waktu yang sesuai untuk sesi 1-on-1 Anda.
          </p>
        </div>

        {contractError && (
          <div className="max-w-5xl mx-auto mb-8 flex items-start gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--color-danger-red)]/10 border border-[var(--color-danger-red)]/30 text-[var(--color-danger-red)] font-[var(--font-inter)] text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              Belum ada perjanjian kelas (kontrak) yang aktif di sistem, jadi booking untuk sementara
              dinonaktifkan. Admin perlu menambahkan minimal satu baris di tabel <code>contracts</code> terlebih dahulu.
            </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">

          <div className="lg:w-1/3 flex flex-col items-center lg:items-start">
            <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-4">
              1. Pilih Tanggal
            </h2>
            <DatePicker
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setSelectedSlot(null);
                setSessionCount(1);
                setRecurringPreview(null);
              }}
              availableDates={availableDates}
            />
          </div>

          <div className="lg:w-2/3">
            <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-4">
              2. Pilih Waktu
            </h2>

            <Card variant="sketch" className="p-6 h-full flex flex-col">
              {selectedDate ? (
                <div className="mb-6 pb-4 border-b border-dashed border-[var(--color-line)]">
                  <h3 className="font-semibold text-[var(--color-brand-blue)] font-[var(--font-inter)]">
                    Jadwal Tersedia untuk {format(selectedDate, 'EEEE, dd MMMM yyyy', { locale: id })}
                  </h3>
                </div>
              ) : (
                <div className="mb-6 pb-4 border-b border-dashed border-[var(--color-line)]">
                  <h3 className="font-semibold text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                    Silakan pilih tanggal terlebih dahulu
                  </h3>
                </div>
              )}

              <div className="flex-1">
                {selectedDate ? (
                  <TimeSlotGrid
                    slots={slotsForSelectedDate}
                    selectedSlot={selectedSlot}
                    onSelect={(slot) => {
                      setSelectedSlot(slot);
                      setSessionCount(1);
                      setRecurringPreview(null);
                    }}
                    isLoading={loading}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-[var(--color-ink-soft)] font-[var(--font-inter)] italic">
                    Menunggu pilihan tanggal...
                  </div>
                )}
              </div>

              {/* 3. Jumlah sesi (booking mingguan berturut-turut) */}
              {selectedSlot && (
                <div className="mt-6 pt-6 border-t border-dashed border-[var(--color-line)]">
                  <h3 className="text-sm font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-3 flex items-center gap-2">
                    <Repeat className="w-4 h-4 text-[var(--color-brand-blue)]" />
                    3. Jumlah Sesi (opsional — booking mingguan sekaligus)
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {SESSION_COUNT_OPTIONS.map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setSessionCount(count)}
                        className={`px-4 py-2 rounded-[var(--radius-sketch)] text-sm font-semibold font-[var(--font-inter)] border-2 transition-colors ${sessionCount === count
                            ? "bg-[var(--color-brand-blue)] border-[var(--color-brand-blue)] text-white"
                            : "bg-white border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-brand-blue)]"
                          }`}
                      >
                        {count === 1 ? "1x (sekali)" : `${count}x`}
                      </button>
                    ))}
                  </div>
                  {sessionCount > 1 && (
                    <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                      Akan otomatis dijadwalkan tiap hari {format(selectedSlot.date, 'EEEE', { locale: id })} jam{" "}
                      {selectedSlot.start_time.substring(0, 5)}, {sessionCount} minggu berturut-turut.
                    </p>
                  )}
                </div>
              )}

              {/* Preview rangkaian tanggal + status konflik */}
              {sessionCount > 1 && recurringPreview && (
                <div className="mt-4 p-4 rounded-[var(--radius-card)] bg-[var(--color-paper-bg-alt)] border border-dashed border-[var(--color-line)]">
                  <p className="text-xs font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-2">
                    Preview {recurringPreview.length} sesi:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {recurringPreview.map((p, i) => (
                      <span
                        key={i}
                        className={`text-xs font-[var(--font-inter)] px-2 py-1 rounded ${p.conflict
                            ? "bg-[var(--color-danger-red)]/10 text-[var(--color-danger-red)] line-through"
                            : "bg-white text-[var(--color-ink-soft)]"
                          }`}
                      >
                        {format(p.date, 'dd MMM yyyy', { locale: id })}
                      </span>
                    ))}
                  </div>
                  {hasRecurringConflict && (
                    <p className="text-xs text-[var(--color-danger-red)] font-[var(--font-inter)] mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      Ada tanggal yang bentrok/libur (dicoret di atas). Pilih jumlah sesi lebih sedikit atau jam/hari lain.
                    </p>
                  )}
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-[var(--color-line)] flex items-center justify-between">
                <div>
                  {selectedSlot && (
                    <p className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                      Sesi Terpilih: {selectedSlot.start_time.substring(0, 5)} - {selectedSlot.end_time.substring(0, 5)}
                    </p>
                  )}
                </div>

                <Button
                  onClick={handleBookingStart}
                  disabled={!selectedSlot || bookingLoading || checkingRecurring || !activeContract || hasRecurringConflict}
                  isLoading={bookingLoading || checkingRecurring}
                >
                  {sessionCount > 1 && !recurringPreview ? "Cek Ketersediaan" : "Lanjut Booking"}
                </Button>
              </div>
            </Card>
          </div>

        </div>
      </div>

      <ContractModal
        isOpen={isContractOpen}
        onClose={() => setIsContractOpen(false)}
        onAccept={handleContractAccept}
        contractHtml={activeContract?.content || ""}
        expectedName={userProfile?.full_name || ""}
      />
    </PaperBackground>
  );
}