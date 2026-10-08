"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SketchBox } from "@/components/sketch/SketchBox";
import { DatePicker } from "@/components/booking/DatePicker";
import { TimeSlotGrid } from "@/components/booking/TimeSlotGrid";
import { ContractModal, type ContractSignature } from "@/components/booking/ContractModal";
import { Slot } from "@/lib/rrule-helpers";
import { formatPrice } from "@/lib/pricing";
import { uploadPaymentProof } from "@/lib/storage";
import { Input } from "@/components/ui/Input";
import { SESSION_COUNT_OPTIONS } from "@/lib/policy";
import { dateStrToLocalDate, localDateToDateStr, todayStr, APP_TIMEZONE_LABEL } from "@/lib/time";
import { formatDateStr } from "@/lib/format";
import { AlertCircle, Repeat, Wallet, Landmark } from "lucide-react";

type ActiveContract = {
  id: string;
  content: string;
  version: number;
};

type Profile = { id: string; full_name: string; role: "admin" | "student" };
type BankDetails = { bank_name?: string; account_number?: string; account_name?: string };
type EwalletDetails = { provider?: string; number?: string; account_name?: string };

const errorText = (err: unknown) => (err instanceof Error ? err.message : "Terjadi kesalahan.");

export default function SchedulePage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);

  const [allSlots, setAllSlots] = useState<Slot[]>([]);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<string | undefined>(todayStr());
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [isContractOpen, setIsContractOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Recurring booking state
  const [sessionCount, setSessionCount] = useState(1);
  const [recurringPreview, setRecurringPreview] = useState<{ date: string; conflict: boolean }[] | null>(null);
  const [checkingRecurring, setCheckingRecurring] = useState(false);

  // Denda nyangkut & bayar-di-muka
  const [unpaidFees, setUnpaidFees] = useState<{ id: string; amount: number }[]>([]);
  const [hasOverdue, setHasOverdue] = useState(false);
  const [payUpfront, setPayUpfront] = useState(false);
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [ewalletDetails, setEwalletDetails] = useState<EwalletDetails | null>(null);
  const [prepaymentToPay, setPrepaymentToPay] = useState<{ id: string; amount: number } | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [submittingProof, setSubmittingProof] = useState(false);

  const [activeContract, setActiveContract] = useState<ActiveContract | null>(null);
  const [contractError, setContractError] = useState(false);

  // Open slots come from the server, which can see every student's bookings
  // (the browser can only see its own) — this is what keeps taken slots
  // from showing as free.
  const loadSlots = useCallback(async () => {
    try {
      const res = await fetch('/api/availability', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal memuat jadwal');
      setAllSlots(data.slots as Slot[]);
      setSlotsError(null);
    } catch (err) {
      setSlotsError(errorText(err));
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('id, full_name, role').eq('id', user.id).single();
        setUserProfile(profile as Profile | null);

        const [{ data: feesData }, { data: settingsData }, { data: overdueData }] = await Promise.all([
          supabase.from('cancellation_fees').select('id, amount').eq('student_id', user.id).eq('status', 'unpaid'),
          supabase.from('site_settings').select('key, value').in('key', ['bank_details', 'ewallet_details']),
          supabase.from('invoices').select('id').eq('student_id', user.id).eq('status', 'overdue').limit(1),
        ]);
        if (feesData) setUnpaidFees(feesData);
        setHasOverdue(!!overdueData && overdueData.length > 0);
        settingsData?.forEach((row) => {
          if (row.key === 'bank_details') setBankDetails(row.value);
          if (row.key === 'ewallet_details') setEwalletDetails(row.value);
        });
      }

      const { data: contractData } = await supabase
        .from('contracts')
        .select('id, content, version')
        .lte('effective_date', todayStr())
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
  }, [supabase, loadSlots]);

  const slotsForSelectedDate = allSlots.filter(s => s.date === selectedDate);

  const availableDates = useMemo(
    () => Array.from(new Set(allSlots.map(s => s.date))).map(dateStrToLocalDate),
    [allSlots]
  );

  const resetSelection = () => {
    setSelectedSlot(null);
    setSessionCount(1);
    setRecurringPreview(null);
  };

  const postBooking = async (payload: Record<string, unknown>) => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return { res, data };
  };

  const handleCheckRecurring = async () => {
    if (!selectedSlot || sessionCount <= 1) return;

    setCheckingRecurring(true);
    try {
      const { res, data } = await postBooking({
        date: selectedSlot.date,
        startTime: selectedSlot.start_time,
        sessionCount,
        checkOnly: true,
      });
      if (!res.ok) throw new Error(data.error);
      setRecurringPreview(data.dates);
    } catch (err) {
      alert(`Gagal mengecek ketersediaan: ${errorText(err)}`);
    } finally {
      setCheckingRecurring(false);
    }
  };

  const handleBookingStart = async () => {
    if (!selectedSlot) return;

    if (!userProfile) {
      router.push(`/login?next=/schedule`);
      return;
    }

    if (userProfile.role !== 'student') {
      alert("Booking hanya bisa dilakukan dengan akun siswa.");
      return;
    }

    if (!activeContract) {
      alert("Kontrak/perjanjian kelas belum tersedia. Silakan hubungi admin sebelum melakukan booking.");
      return;
    }

    if (sessionCount > 1) {
      if (!recurringPreview) {
        await handleCheckRecurring();
        return;
      }
      if (recurringPreview.some(p => p.conflict)) {
        return;
      }
    }

    setIsContractOpen(true);
  };

  const handleContractAccept = async (signature: ContractSignature) => {
    if (!selectedSlot || !userProfile || !activeContract) return;

    setBookingLoading(true);
    setIsContractOpen(false);

    try {
      const { res, data } = await postBooking({
        date: selectedSlot.date,
        startTime: selectedSlot.start_time,
        sessionCount,
        contractId: activeContract.id,
        typedName: signature.typedName,
        signerRole: signature.signerRole,
        payUpfront: payUpfront && unpaidFees.length > 0,
      });

      if (res.status === 409) {
        alert(data.error || "Maaf, jadwal ini baru saja dipesan orang lain. Silakan pilih ulang.");
        resetSelection();
        await loadSlots();
        return;
      }
      if (!res.ok) throw new Error(data.error);

      if (data.prepayment_id) {
        setPrepaymentToPay({ id: data.prepayment_id, amount: data.total });
        return;
      }

      alert(
        sessionCount > 1
          ? `Booking berhasil! ${sessionCount} sesi mingguan Anda sedang menunggu konfirmasi admin.`
          : "Booking berhasil! Permintaan jadwal Anda sedang menunggu konfirmasi admin."
      );
      router.push('/dashboard');

    } catch (err) {
      alert(`Gagal melakukan booking: ${errorText(err)}`);
    } finally {
      setBookingLoading(false);
    }
  };

  const handleSubmitPrepaymentProof = async () => {
    if (!proofFile || !prepaymentToPay || !userProfile) return;
    setSubmittingProof(true);
    try {
      const path = await uploadPaymentProof("prepayments", userProfile.id, prepaymentToPay.id, proofFile);
      const { error } = await supabase
        .from('prepayments')
        .update({ proof_url: path, status: 'proof_uploaded' })
        .eq('id', prepaymentToPay.id);
      if (error) throw error;

      alert("Bukti transfer terkirim. Setelah admin konfirmasi, denda lama Anda otomatis terhapus.");
      router.push('/dashboard');
    } catch (err) {
      alert(`Gagal mengirim bukti: ${errorText(err)}`);
    } finally {
      setSubmittingProof(false);
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
            Pilih tanggal dan waktu yang sesuai untuk sesi 1-on-1 Anda. Semua jam dalam {APP_TIMEZONE_LABEL} (Tarakan).
          </p>
        </div>

        {contractError && (
          <div className="max-w-5xl mx-auto mb-8 flex items-start gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--color-danger-red)]/10 border border-[var(--color-danger-red)]/30 text-[var(--color-danger-red)] font-[var(--font-inter)] text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              Booking untuk sementara belum dibuka karena perjanjian kelas sedang disiapkan.
              Silakan hubungi kami melalui WhatsApp untuk informasi jadwal.
            </p>
          </div>
        )}

        {hasOverdue && (
          <div className="max-w-5xl mx-auto mb-8 flex items-start gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--color-danger-red)]/10 border border-[var(--color-danger-red)]/30 text-[var(--color-danger-red)] font-[var(--font-inter)] text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              Ada tagihan Anda yang melewati jatuh tempo, sehingga booking baru dijeda sementara.
              Silakan selesaikan pembayaran di <a href="/dashboard/invoices" className="underline font-semibold">Tagihan Saya</a>.
            </p>
          </div>
        )}

        {slotsError && (
          <div className="max-w-5xl mx-auto mb-8 flex items-start gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--color-danger-red)]/10 border border-[var(--color-danger-red)]/30 text-[var(--color-danger-red)] font-[var(--font-inter)] text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>Gagal memuat jadwal: {slotsError}</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">

          <div className="lg:w-1/3 flex flex-col items-center lg:items-start">
            <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-4">
              1. Pilih Tanggal
            </h2>
            <DatePicker
              selected={selectedDate ? dateStrToLocalDate(selectedDate) : undefined}
              onSelect={(date) => {
                setSelectedDate(date ? localDateToDateStr(date) : undefined);
                resetSelection();
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
                    Jadwal Tersedia untuk {formatDateStr(selectedDate, 'EEEE, dd MMMM yyyy')}
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
                        onClick={() => { setSessionCount(count); setRecurringPreview(null); }}
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
                      Akan otomatis dijadwalkan tiap hari {formatDateStr(selectedSlot.date, 'EEEE')} jam{" "}
                      {selectedSlot.start_time} {APP_TIMEZONE_LABEL}, {sessionCount} minggu berturut-turut.
                    </p>
                  )}
                </div>
              )}

              {/* Bayar di muka — cuma muncul kalau ada denda nyangkut */}
              {selectedSlot && unpaidFees.length > 0 && (
                <div className="mt-4 p-4 rounded-[var(--radius-card)] bg-amber-50 border border-amber-300">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={payUpfront}
                      onChange={(e) => setPayUpfront(e.target.checked)}
                      className="mt-1"
                    />
                    <span className="text-sm font-[var(--font-inter)] text-amber-900">
                      <strong>Bayar paket ini di muka</strong> (transfer sebelum kelas dimulai, bukan sistem bayar-setelah-kelas seperti biasa) —
                      dengan ini, denda pembatalan Anda yang belum lunas sebesar{" "}
                      <strong>{formatPrice(unpaidFees.reduce((s, f) => s + f.amount, 0))}</strong> akan{" "}
                      <strong>dihapus gratis</strong>.
                    </span>
                  </label>
                </div>
              )}

              {/* Preview rangkaian tanggal + status konflik */}
              {sessionCount > 1 && recurringPreview && (
                <div className="mt-4 p-4 rounded-[var(--radius-card)] bg-[var(--color-paper-bg-alt)] border border-dashed border-[var(--color-line)]">
                  <p className="text-xs font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-2">
                    Preview {recurringPreview.length} sesi:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {recurringPreview.map((p) => (
                      <span
                        key={p.date}
                        className={`text-xs font-[var(--font-inter)] px-2 py-1 rounded ${p.conflict
                          ? "bg-[var(--color-danger-red)]/10 text-[var(--color-danger-red)] line-through"
                          : "bg-white text-[var(--color-ink-soft)]"
                          }`}
                      >
                        {formatDateStr(p.date, 'dd MMM yyyy')}
                      </span>
                    ))}
                  </div>
                  {hasRecurringConflict && (
                    <p className="text-xs text-[var(--color-danger-red)] font-[var(--font-inter)] mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      Ada tanggal yang bentrok/libur/belum dibuka (dicoret di atas). Pilih jumlah sesi lebih sedikit atau jam/hari lain.
                    </p>
                  )}
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-[var(--color-line)] flex items-center justify-between gap-4">
                <div>
                  {selectedSlot && (
                    <p className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                      Sesi Terpilih: {selectedSlot.start_time} - {selectedSlot.end_time} {APP_TIMEZONE_LABEL}
                    </p>
                  )}
                </div>

                <Button
                  onClick={handleBookingStart}
                  disabled={!selectedSlot || bookingLoading || checkingRecurring || !activeContract || hasRecurringConflict || hasOverdue}
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

      {prepaymentToPay && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[var(--radius-card)] p-6 space-y-4">
            <h3 className="font-[var(--font-kalam)] text-2xl text-[var(--color-brand-blue)]">
              Bayar di Muka — {formatPrice(prepaymentToPay.amount)}
            </h3>
            <div className="bg-[var(--color-paper-bg-alt)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-4 font-[var(--font-inter)] text-sm space-y-2">
              {bankDetails?.account_number && (
                <p className="flex items-center gap-2"><Landmark className="w-4 h-4" /> {bankDetails.bank_name}: <strong>{bankDetails.account_number}</strong> a.n. {bankDetails.account_name}</p>
              )}
              {ewalletDetails?.number && (
                <p className="flex items-center gap-2"><Wallet className="w-4 h-4" /> {ewalletDetails.provider}: <strong>{ewalletDetails.number}</strong> a.n. {ewalletDetails.account_name}</p>
              )}
            </div>
            <Input
              type="file"
              label="Upload Bukti Transfer"
              accept="image/*,application/pdf"
              onChange={(e) => setProofFile(e.target.files?.[0] || null)}
            />
            <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">
              Bisa juga diunggah nanti dari menu Sesi Saya di dashboard.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => { setPrepaymentToPay(null); router.push('/dashboard'); }}
              >
                Nanti Saja
              </Button>
              <Button onClick={handleSubmitPrepaymentProof} isLoading={submittingProof} disabled={!proofFile}>
                Kirim Bukti
              </Button>
            </div>
          </div>
        </div>
      )}
    </PaperBackground>
  );
}
