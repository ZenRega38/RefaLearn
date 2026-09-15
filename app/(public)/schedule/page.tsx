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
import { isSameDay, format, startOfToday, addMonths } from "date-fns";
import { id } from "date-fns/locale";

export default function SchedulePage() {
  const router = useRouter();
  const supabase = createClient();
  
  // State
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  
  // Booking state
  const [rules, setRules] = useState<AvailabilityRule[]>([]);
  const [blackouts, setBlackouts] = useState<BlackoutDate[]>([]);
  const [allSlots, setAllSlots] = useState<Slot[]>([]);
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(startOfToday());
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [isContractOpen, setIsContractOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Contract template (in a real app, fetch from database `contracts` table)
  const contractTemplate = `
    <h3>Persetujuan Kelas Privat Refa Learn</h3>
    <p>Dengan menyetujui dokumen ini, saya mengonfirmasi bahwa:</p>
    <ol>
      <li>Saya berkomitmen untuk mengikuti kelas pada jadwal yang telah saya pilih.</li>
      <li>Pembayaran akan dilakukan setelah kelas selesai, dengan tagihan yang dikirimkan pada tanggal 1 bulan berikutnya.</li>
      <li>Pembatalan atau perubahan jadwal harus dilakukan maksimal 24 jam sebelum kelas dimulai. Pembatalan mendadak tanpa alasan darurat dapat dikenakan penalti.</li>
      <li>Harga kelas bervariasi sesuai hari (Weekday, Sabtu, Minggu) sebagaimana tertera pada halaman pemesanan.</li>
    </ol>
  `;

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      
      // Check auth
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setUserProfile(profile);
      }

      // Fetch availability rules and blackouts
      const { data: rulesData } = await supabase.from('availability_rules').select('*').eq('is_active', true);
      const { data: blackoutsData } = await supabase.from('blackout_dates').select('*');
      
      if (rulesData) setRules(rulesData);
      if (blackoutsData) setBlackouts(blackoutsData);

      // Generate slots for the next 2 months
      if (rulesData) {
        const slots = generateAvailableSlots(
          rulesData as AvailabilityRule[], 
          (blackoutsData || []) as BlackoutDate[],
          startOfToday(),
          addMonths(startOfToday(), 2)
        );
        
        // Note: In a real app, you'd also fetch already booked `sessions` 
        // and filter them out of `slots` here.
        setAllSlots(slots);
      }
      
      setLoading(false);
    };
    init();
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
    
    setIsContractOpen(true);
  };

  const handleContractAccept = async (typedName: string) => {
    if (!selectedSlot || !userProfile) return;
    
    setBookingLoading(true);
    setIsContractOpen(false);

    try {
      // 1. In a real flow, first insert into contract_acceptances
      // This is mocked for now since we don't have active contracts seeded.
      
      // 2. Determine day type
      const dayNum = selectedSlot.date.getDay();
      const dayType = dayNum === 0 ? 'sunday' : dayNum === 6 ? 'saturday' : 'weekday';
      
      // Price calculation (match lib/pricing.ts logic)
      const price = dayType === 'sunday' ? 200000 : dayType === 'saturday' ? 150000 : 100000;

      // 3. Create session
      const { error } = await supabase.from('sessions').insert([{
        student_id: userProfile.id,
        date: format(selectedSlot.date, 'yyyy-MM-dd'),
        start_time: selectedSlot.start_time,
        end_time: selectedSlot.end_time,
        day_type: dayType,
        price: price,
        status: 'pending' // Admin must accept
      }]);

      if (error) throw error;
      
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
                  disabled={!selectedSlot || bookingLoading}
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
        contractHtml={contractTemplate}
        expectedName={userProfile?.full_name || ""}
      />
    </PaperBackground>
  );
}
