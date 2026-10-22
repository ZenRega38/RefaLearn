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
import { PROFILE_COMPLETION_COLUMNS, missingProfileFields, needsGuardian, type ProfileCompletion } from "@/lib/profile";
import { AlertCircle, Repeat, Wallet, Landmark } from "lucide-react";
import { useLang } from "@/components/i18n/LangProvider";
import { translator } from "@/lib/i18n";

type ActiveContract = {
  id: string;
  content: string;
  /** English translation (lib/contract-template); the Indonesian text is what is signed. */
  content_en?: string | null;
  version: number;
};

type Profile = ProfileCompletion & { id: string; full_name: string; role: "admin" | "student" };

const PROFILE_URL = "/dashboard/profile?next=/schedule";
type BankDetails = { bank_name?: string; account_number?: string; account_name?: string };
type EwalletDetails = { provider?: string; number?: string; account_name?: string };

export default function SchedulePage() {
  const router = useRouter();
  const { lang } = useLang();
  const tr = translator(lang);
  const errorText = (err: unknown) => (err instanceof Error ? err.message : tr("Terjadi kesalahan.", "Something went wrong."));
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
      if (!res.ok) throw new Error(data.error || "");
      setAllSlots(data.slots as Slot[]);
      setSlotsError(null);
    } catch (err) {
      setSlotsError(err instanceof Error ? err.message : "");
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from('profiles').select(`id, role, ${PROFILE_COMPLETION_COLUMNS}`).eq('id', user.id).single();
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
        .select('*')
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

  // Booking needs a complete profile; free materials only need a login.
  const missingProfile = userProfile?.role === 'student' ? missingProfileFields(userProfile, todayStr(), lang) : [];

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
      alert(`${tr("Gagal mengecek ketersediaan", "Couldn't check availability")}: ${errorText(err)}`);
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
      alert(tr("Booking hanya bisa dilakukan dengan akun siswa.", "Bookings can only be made with a student account."));
      return;
    }

    if (missingProfile.length > 0) {
      alert(
        tr(
          `Lengkapi profil terlebih dahulu sebelum booking.\n\nData yang masih kurang:\n- ${missingProfile.join('\n- ')}`,
          `Please complete your profile before booking.\n\nStill missing:\n- ${missingProfile.join('\n- ')}`
        )
      );
      router.push(PROFILE_URL);
      return;
    }

    if (!activeContract) {
      alert(tr("Kontrak/perjanjian kelas belum tersedia. Silakan hubungi admin sebelum melakukan booking.", "The class agreement isn't available yet. Please contact the admin before booking."));
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
        alert(data.error || tr("Maaf, jadwal ini baru saja dipesan orang lain. Silakan pilih ulang.", "Sorry, someone has just booked this slot. Please choose another one."));
        resetSelection();
        await loadSlots();
        return;
      }
      if (res.status === 403 && data.code === 'PROFILE_INCOMPLETE') {
        alert(data.error);
        router.push(PROFILE_URL);
        return;
      }
      if (!res.ok) throw new Error(data.error);

      if (data.prepayment_id) {
        setPrepaymentToPay({ id: data.prepayment_id, amount: data.total });
        return;
      }

      alert(
        sessionCount > 1
          ? tr(
              `Booking berhasil! ${sessionCount} sesi mingguan Anda sedang menunggu konfirmasi admin.`,
              `Booking received! Your ${sessionCount} weekly sessions are waiting for the admin to confirm them.`
            )
          : tr(
              "Booking berhasil! Permintaan jadwal Anda sedang menunggu konfirmasi admin.",
              "Booking received! Your session request is waiting for the admin to confirm it."
            )
      );
      router.push('/dashboard');

    } catch (err) {
      alert(`${tr("Gagal melakukan booking", "Booking failed")}: ${errorText(err)}`);
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

      alert(tr("Bukti transfer terkirim. Setelah admin konfirmasi, denda lama Anda otomatis terhapus.", "Payment proof sent. Once the admin confirms it, your old fees are cleared automatically."));
      router.push('/dashboard');
    } catch (err) {
      alert(`${tr("Gagal mengirim bukti", "Couldn't send the proof")}: ${errorText(err)}`);
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
            {tr("Booking", "Book a")} <SketchBox color="var(--color-brand-blue)">{tr("Jadwal Kelas", "Class")}</SketchBox>
          </h1>
          <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)]">
            {tr(
              "Pilih tanggal dan waktu yang sesuai untuk sesi 1-on-1 Anda. Semua jam dalam",
              "Choose a date and time for your 1-on-1 session. All times are in"
            )}{" "}
            {APP_TIMEZONE_LABEL} (Tarakan).
          </p>
        </div>

        {contractError && (
          <div className="max-w-5xl mx-auto mb-8 flex items-start gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--color-danger-red)]/10 border border-[var(--color-danger-red)]/30 text-[var(--color-danger-red)] font-[var(--font-inter)] text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              {tr(
                "Booking untuk sementara belum dibuka karena perjanjian kelas sedang disiapkan. Silakan hubungi kami melalui WhatsApp untuk informasi jadwal.",
                "Booking is temporarily closed while the class agreement is being prepared. Please contact us on WhatsApp for schedule information."
              )}
            </p>
          </div>
        )}

        {missingProfile.length > 0 && (
          <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--color-warning-amber)]/10 border border-[var(--color-warning-amber)]/40 text-[var(--color-ink)] font-[var(--font-inter)] text-sm">
            <div className="flex items-start gap-3 flex-1">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-warning-amber)]" />
              <p>
                {tr("Sebelum booking, lengkapi profil Anda dulu:", "Before booking, please complete your profile:")} {missingProfile.join(', ')}.{" "}
                {tr("Data ini dipakai admin untuk memverifikasi pesanan Anda.", "The admin uses these details to verify your booking.")}
              </p>
            </div>
            <a href={PROFILE_URL} className="shrink-0 font-semibold text-[var(--color-brand-blue)] hover:underline">
              {tr("Lengkapi Profil", "Complete Profile")}
            </a>
          </div>
        )}

        {hasOverdue && (
          <div className="max-w-5xl mx-auto mb-8 flex items-start gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--color-danger-red)]/10 border border-[var(--color-danger-red)]/30 text-[var(--color-danger-red)] font-[var(--font-inter)] text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              {tr(
                "Ada tagihan Anda yang melewati jatuh tempo, sehingga booking baru dijeda sementara. Silakan selesaikan pembayaran di",
                "One of your invoices is past its due date, so new bookings are paused for now. Please complete the payment in"
              )}{" "}
              <a href="/dashboard/invoices" className="underline font-semibold">{tr("Tagihan Saya", "My Invoices")}</a>.
            </p>
          </div>
        )}

        {slotsError && (
          <div className="max-w-5xl mx-auto mb-8 flex items-start gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--color-danger-red)]/10 border border-[var(--color-danger-red)]/30 text-[var(--color-danger-red)] font-[var(--font-inter)] text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{tr("Gagal memuat jadwal", "Couldn't load the schedule")}{slotsError ? `: ${slotsError}` : "."}</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">

          <div className="lg:w-1/3 flex flex-col items-center lg:items-start">
            <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-4">
              {tr("1. Pilih Tanggal", "1. Choose a Date")}
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
              {tr("2. Pilih Waktu", "2. Choose a Time")}
            </h2>

            <Card variant="sketch" className="p-6 h-full flex flex-col">
              {selectedDate ? (
                <div className="mb-6 pb-4 border-b border-dashed border-[var(--color-line)]">
                  <h3 className="font-semibold text-[var(--color-brand-blue)] font-[var(--font-inter)]">
                    {tr("Jadwal Tersedia untuk", "Available times on")} {formatDateStr(selectedDate, 'EEEE, dd MMMM yyyy', lang)}
                  </h3>
                </div>
              ) : (
                <div className="mb-6 pb-4 border-b border-dashed border-[var(--color-line)]">
                  <h3 className="font-semibold text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                    {tr("Silakan pilih tanggal terlebih dahulu", "Please choose a date first")}
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
                    {tr("Menunggu pilihan tanggal...", "Waiting for a date...")}
                  </div>
                )}
              </div>

              {/* 3. Jumlah sesi (booking mingguan berturut-turut) */}
              {selectedSlot && (
                <div className="mt-6 pt-6 border-t border-dashed border-[var(--color-line)]">
                  <h3 className="text-sm font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-3 flex items-center gap-2">
                    <Repeat className="w-4 h-4 text-[var(--color-brand-blue)]" />
                    {tr("3. Jumlah Sesi (opsional — booking mingguan sekaligus)", "3. Number of Sessions (optional: book several weeks at once)")}
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
                        {count === 1 ? tr("1x (sekali)", "1x (once)") : `${count}x`}
                      </button>
                    ))}
                  </div>
                  {sessionCount > 1 && (
                    <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                      {tr(
                        `Akan otomatis dijadwalkan tiap hari ${formatDateStr(selectedSlot.date, 'EEEE', lang)} jam ${selectedSlot.start_time} ${APP_TIMEZONE_LABEL}, ${sessionCount} minggu berturut-turut.`,
                        `Automatically scheduled every ${formatDateStr(selectedSlot.date, 'EEEE', lang)} at ${selectedSlot.start_time} ${APP_TIMEZONE_LABEL}, for ${sessionCount} weeks in a row.`
                      )}
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
                      <strong>{tr("Bayar paket ini di muka", "Pay for this package up front")}</strong>{" "}
                      {tr(
                        "(transfer sebelum kelas dimulai, bukan sistem bayar-setelah-kelas seperti biasa) — dengan ini, denda pembatalan Anda yang belum lunas sebesar",
                        "(transfer before the classes start, instead of the usual pay-after-class system). In return, your unpaid cancellation fees of"
                      )}{" "}
                      <strong>{formatPrice(unpaidFees.reduce((s, f) => s + f.amount, 0))}</strong> {tr("akan", "will be")}{" "}
                      <strong>{tr("dihapus gratis", "waived for free")}</strong>.
                    </span>
                  </label>
                </div>
              )}

              {/* Preview rangkaian tanggal + status konflik */}
              {sessionCount > 1 && recurringPreview && (
                <div className="mt-4 p-4 rounded-[var(--radius-card)] bg-[var(--color-paper-bg-alt)] border border-dashed border-[var(--color-line)]">
                  <p className="text-xs font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-2">
                    {tr(`Preview ${recurringPreview.length} sesi:`, `Preview of ${recurringPreview.length} sessions:`)}
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
                        {formatDateStr(p.date, 'dd MMM yyyy', lang)}
                      </span>
                    ))}
                  </div>
                  {hasRecurringConflict && (
                    <p className="text-xs text-[var(--color-danger-red)] font-[var(--font-inter)] mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {tr(
                        "Ada tanggal yang bentrok/libur/belum dibuka (dicoret di atas). Pilih jumlah sesi lebih sedikit atau jam/hari lain.",
                        "Some dates clash, fall on a holiday or aren't open yet (crossed out above). Choose fewer sessions or another day/time."
                      )}
                    </p>
                  )}
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-[var(--color-line)] flex items-center justify-between gap-4">
                <div>
                  {selectedSlot && (
                    <p className="text-sm font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
                      {tr("Sesi Terpilih", "Selected session")}: {selectedSlot.start_time} - {selectedSlot.end_time} {APP_TIMEZONE_LABEL}
                    </p>
                  )}
                </div>

                <Button
                  onClick={handleBookingStart}
                  disabled={!selectedSlot || bookingLoading || checkingRecurring || !activeContract || hasRecurringConflict || hasOverdue}
                  isLoading={bookingLoading || checkingRecurring}
                >
                  {sessionCount > 1 && !recurringPreview ? tr("Cek Ketersediaan", "Check Availability") : tr("Lanjut Booking", "Continue Booking")}
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
        contractHtmlEn={activeContract?.content_en}
        expectedName={userProfile?.full_name || ""}
        requireGuardian={needsGuardian(userProfile?.birth_date, todayStr())}
        guardianName={userProfile?.guardian_name || ""}
      />

      {prepaymentToPay && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[var(--radius-card)] p-6 space-y-4">
            <h3 className="font-[var(--font-kalam)] text-2xl text-[var(--color-brand-blue)]">
              {tr("Bayar di Muka", "Pay Up Front")}: {formatPrice(prepaymentToPay.amount)}
            </h3>
            <div className="bg-[var(--color-paper-bg-alt)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-4 font-[var(--font-inter)] text-sm space-y-2">
              {bankDetails?.account_number && (
                <p className="flex items-center gap-2"><Landmark className="w-4 h-4" /> {bankDetails.bank_name}: <strong>{bankDetails.account_number}</strong> {tr(`a.n. ${bankDetails.account_name}`, `(account name: ${bankDetails.account_name})`)}</p>
              )}
              {ewalletDetails?.number && (
                <p className="flex items-center gap-2"><Wallet className="w-4 h-4" /> {ewalletDetails.provider}: <strong>{ewalletDetails.number}</strong> {tr(`a.n. ${ewalletDetails.account_name}`, `(account name: ${ewalletDetails.account_name})`)}</p>
              )}
            </div>
            <Input
              type="file"
              label={tr("Upload Bukti Transfer", "Upload Payment Proof")}
              accept="image/*,application/pdf"
              onChange={(e) => setProofFile(e.target.files?.[0] || null)}
            />
            <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">
              {tr("Bisa juga diunggah nanti dari menu Sesi Saya di dashboard.", "You can also upload it later from My Sessions in your dashboard.")}
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => { setPrepaymentToPay(null); router.push('/dashboard'); }}
              >
                {tr("Nanti Saja", "Later")}
              </Button>
              <Button onClick={handleSubmitPrepaymentProof} isLoading={submittingProof} disabled={!proofFile}>
                {tr("Kirim Bukti", "Send Proof")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </PaperBackground>
  );
}
