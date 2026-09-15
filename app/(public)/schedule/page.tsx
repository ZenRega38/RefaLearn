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
import { isSameDay, format, startOfToday, addMonths } from "date-fns";
import { id } from "date-fns/locale";
import { AlertCircle } from "lucide-react";

type ActiveContract = {
  id: string;
  content: string;
  version: number;
};

// A booked slot is any pending/accepted session that already occupies a date+time.
type BookedSlot = {
  date: string; // yyyy-MM-dd
  start_time: string;
};

export default function SchedulePage() {
  const router = useRouter();
  const supabase = createClient();

  // State
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Booking state
  const [rules, setRules] = useState<AvailabilityRule[]>([]);
  const [blackouts, setBlackouts] = useState<BlackoutDate[]>([]);
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);
  const [allSlots, setAllSlots] = useState<Slot[]>([]);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(startOfToday());
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [isContractOpen, setIsContractOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // The real, currently-effective contract — fetched from the `contracts` table,
  // never hardcoded. If none exists yet, booking is disabled until an admin adds one.
  const [activeContract, setActiveContract] = useState<ActiveContract | null>(null);
  const [contractError, setContractError] = useState(false);

  // Re-fetches availability + already-booked sessions and rebuilds the open slot list.
  // Pulled out of the initial effect so we can call it again after a booking attempt
  // (successful or blocked by a race-condition clash).
  const loadSlots = async () => {
    const { data: rulesData } = await supabase.from('availability_rules').select('*').eq('is_active', true);
    const { data: blackoutsData } = await supabase.from('blackout_dates').select('*');

    // Any session that's still pending or already accepted occupies its slot —
    // both must be excluded, not just accepted ones, or two students could both
    // be waiting on the same pending slot.
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

      // Check auth
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setUserProfile(profile);
      }

      // Fetch the current, effective contract: highest version whose effective_date
      // has already passed. This is what the student actually agrees to — never
      // hardcoded copy in the component.
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

  // Filter slots for selected date
  const slotsForSelectedDate = allSlots.filter(s =>
    selectedDate && isSameDay(s.date, selectedDate)
  );

  // Get unique dates that have slots
  const availableDates = allSlots.map(s => s.date).reduce((acc, current) => {
    const x = acc.find(item => isSameDay(item, current));
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, [] as Date[]);

  const handleBookingStart = () => {
    if (!selectedSlot) return;

    if (!userProfile) {
      // Redirect to login with return path
      router.push(`/login?returnUrl=/schedule`);
      return;
    }

    if (!activeContract) {
      alert("Kontrak/perjanjian kelas belum tersedia. Silakan hubungi admin sebelum melakukan booking.");
      return;
    }

    setIsContractOpen(true);
  };

  const handleContractAccept = async (typedName: string) => {
    if (!selectedSlot || !userProfile || !activeContract) return;

    setBookingLoading(true);
    setIsContractOpen(false);

    try {
      const dateStr = format(selectedSlot.date, 'yyyy-MM-dd');

      // Re-check right before writing anything: two students could have loaded
      // this page at the same time and both picked the same open slot. This is
      // the actual guard against double-booking, not just the initial filter.
      const { data: clashing, error: clashError } = await supabase
        .from('sessions')
        .select('id')
        .eq('date', dateStr)
        .eq('start_time', selectedSlot.start_time)
        .in('status', ['pending', 'accepted']);

      if (clashError) throw clashError;

      if (clashing && clashing.length > 0) {
        alert("Maaf, slot ini baru saja dipesan oleh orang lain. Silakan pilih slot lain.");
        setSelectedSlot(null);
        await loadSlots();
        return;
      }

      // 1. Record the contract acceptance FIRST — this is an append-only audit
      // record and a session must never be created without one (see agent.md
      // Do-Not-List). We link the session to it below.
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

      // 2. Day-type + price come from lib/pricing.ts ONLY — this is the single
      // source of truth, nothing here re-implements the price table.
      const dayType = getDayType(selectedSlot.date);
      const price = getSessionPrice(selectedSlot.date);

      // 3. Create the session request, linked to the acceptance record above.
      const { error: sessionError } = await supabase.from('sessions').insert([{
        student_id: userProfile.id,
        date: dateStr,
        start_time: selectedSlot.start_time,
        end_time: selectedSlot.end_time,
        day_type: dayType,
        price: price,
        status: 'pending', // Admin must accept
        contract_acceptance_id: acceptance.id,
      }]);

      if (sessionError) throw sessionError;

      alert("Booking berhasil! Permintaan jadwal Anda sedang menunggu konfirmasi admin.");
      router.push('/dashboard');

    } catch (err: any) {
      alert(`Gagal melakukan booking: ${err.message}`);
    } finally {
      setBookingLoading(false);
    }
  };

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

          {/* Calendar Section */}
          <div className="lg:w-1/3 flex flex-col items-center lg:items-start">
            <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-4">
              1. Pilih Tanggal
            </h2>
            <DatePicker
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setSelectedSlot(null); // Reset slot when date changes
              }}
              availableDates={availableDates}
            />
          </div>

          {/* Time Slots Section */}
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
                    onSelect={setSelectedSlot}
                    isLoading={loading}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-[var(--color-ink-soft)] font-[var(--font-inter)] italic">
                    Menunggu pilihan tanggal...
                  </div>
                )}
              </div>

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
                  disabled={!selectedSlot || bookingLoading || !activeContract}
                  isLoading={bookingLoading}
                >
                  Lanjut Booking
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