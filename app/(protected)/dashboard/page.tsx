"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Textarea } from "@/components/ui/Textarea";
import { Input } from "@/components/ui/Input";
import { DatePicker } from "@/components/booking/DatePicker";
import { TimeSlotGrid } from "@/components/booking/TimeSlotGrid";
import { Slot } from "@/lib/rrule-helpers";
import { formatPrice } from "@/lib/pricing";
import { hasStarted } from "@/lib/cancellation";
import { FREE_CANCELLATION_NOTICE_HOURS } from "@/lib/policy";
import { uploadPaymentProof } from "@/lib/storage";
import { dateStrToLocalDate, localDateToDateStr, APP_TIMEZONE_LABEL } from "@/lib/time";
import { formatDateStr, hhmm } from "@/lib/format";
import { ProgressCard } from "@/components/gamification/ProgressCard";
import { ScheduleOffers } from "@/components/dashboard/ScheduleOffers";
import { CalendarCheck, Clock, RefreshCw, AlertTriangle, Repeat, X, Info, Wallet, FileText } from "lucide-react";

type SessionRow = {
  id: string;
  series_id: string | null;
  date: string;
  start_time: string;
  end_time: string;
  day_type: string;
  price: number;
  status: 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled' | 'no_show';
  contract_acceptance_id: string | null;
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

type Prepayment = {
  id: string;
  total_amount: number;
  status: 'pending' | 'proof_uploaded' | 'confirmed' | 'rejected' | 'cancelled';
  created_at: string;
};

type BankDetails = { bank_name?: string; account_number?: string; account_name?: string };
type EwalletDetails = { provider?: string; number?: string; account_name?: string };

const errorText = (err: unknown) => (err instanceof Error ? err.message : "Something went wrong.");

export default function StudentSessionsDashboard() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [rescheduleRequests, setRescheduleRequests] = useState<RescheduleRequest[]>([]);
  const [unpaidFees, setUnpaidFees] = useState<CancellationFee[]>([]);
  const [prepayments, setPrepayments] = useState<Prepayment[]>([]);
  const [contractVersions, setContractVersions] = useState<Record<string, number>>({});
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [ewalletDetails, setEwalletDetails] = useState<EwalletDetails | null>(null);

  // Cancel modal
  const [cancelTarget, setCancelTarget] = useState<SessionRow[] | null>(null);
  const [cancelFee, setCancelFee] = useState<number | null>(null);
  const [cancelling, setCancelling] = useState(false);

  // Reschedule modal
  const [rescheduleTarget, setRescheduleTarget] = useState<SessionRow | null>(null);
  const [allSlots, setAllSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState<string | undefined>(undefined);
  const [rescheduleSlot, setRescheduleSlot] = useState<Slot | null>(null);
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [submittingReschedule, setSubmittingReschedule] = useState(false);

  // Prepayment proof upload
  const [payingPrepayment, setPayingPrepayment] = useState<Prepayment | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [submittingProof, setSubmittingProof] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login?next=/dashboard');
      return;
    }
    setStudentId(user.id);

    const [sessionsRes, rescheduleRes, feesRes, prepayRes, acceptRes, settingsRes] = await Promise.all([
      supabase
        .from('sessions')
        .select('id, series_id, date, start_time, end_time, day_type, price, status, contract_acceptance_id')
        .eq('student_id', user.id)
        .order('date', { ascending: true })
        .order('start_time', { ascending: true }),
      supabase
        .from('reschedule_requests')
        .select('id, session_id, requested_date, requested_start_time, status')
        .eq('student_id', user.id)
        .eq('status', 'pending'),
      supabase
        .from('cancellation_fees')
        .select('id, amount, status')
        .eq('student_id', user.id)
        .eq('status', 'unpaid'),
      supabase
        .from('prepayments')
        .select('id, total_amount, status, created_at')
        .eq('student_id', user.id)
        .in('status', ['pending', 'proof_uploaded', 'rejected'])
        .order('created_at', { ascending: false }),
      supabase
        .from('contract_acceptances')
        .select('id, contracts(version)')
        .eq('student_id', user.id),
      supabase.from('site_settings').select('key, value').in('key', ['bank_details', 'ewallet_details']),
    ]);

    setSessions((sessionsRes.data || []) as SessionRow[]);
    setRescheduleRequests((rescheduleRes.data || []) as RescheduleRequest[]);
    setUnpaidFees((feesRes.data || []) as CancellationFee[]);
    setPrepayments((prepayRes.data || []) as Prepayment[]);
    setContractVersions(
      Object.fromEntries(
        (acceptRes.data || []).map((a) => [a.id, (a.contracts as unknown as { version: number } | null)?.version ?? 0])
      )
    );
    settingsRes.data?.forEach((row) => {
      if (row.key === 'bank_details') setBankDetails(row.value);
      if (row.key === 'ewallet_details') setEwalletDetails(row.value);
    });

    setLoading(false);
  }, [supabase, router]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load
    fetchData();
  }, [fetchData]);

  const openRescheduleModal = async (session: SessionRow) => {
    setRescheduleTarget(session);
    setRescheduleDate(undefined);
    setRescheduleSlot(null);
    setRescheduleReason("");
    setSlotsLoading(true);

    try {
      const params = new URLSearchParams({ excludeDate: session.date, excludeTime: hhmm(session.start_time) });
      const res = await fetch(`/api/availability?${params}`, { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAllSlots(data.slots as Slot[]);
    } catch (err) {
      alert(`Couldn't load the schedule: ${errorText(err)}`);
      setRescheduleTarget(null);
    } finally {
      setSlotsLoading(false);
    }
  };

  const submitReschedule = async () => {
    if (!rescheduleTarget || !rescheduleSlot) return;
    setSubmittingReschedule(true);
    try {
      const res = await fetch('/api/sessions/reschedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: rescheduleTarget.id,
          date: rescheduleSlot.date,
          startTime: rescheduleSlot.start_time,
          reason: rescheduleReason,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert("Reschedule request sent. It's waiting for the admin's approval.");
      setRescheduleTarget(null);
      fetchData();
    } catch (err) {
      alert(`Couldn't send the request: ${errorText(err)}`);
    } finally {
      setSubmittingReschedule(false);
    }
  };

  const callCancel = async (ids: string[], preview: boolean) => {
    const res = await fetch('/api/sessions/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionIds: ids, preview }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data as { fee: number };
  };

  const openCancel = async (target: SessionRow[]) => {
    setCancelTarget(target);
    setCancelFee(null);
    try {
      const { fee } = await callCancel(target.map(s => s.id), true);
      setCancelFee(fee);
    } catch (err) {
      alert(errorText(err));
      setCancelTarget(null);
    }
  };

  const confirmCancel = async () => {
    if (!cancelTarget || !studentId) return;
    setCancelling(true);
    try {
      const { fee } = await callCancel(cancelTarget.map(s => s.id), false);
      alert(
        fee > 0
          ? `${cancelTarget.length === 1 ? "Session" : `${cancelTarget.length} sessions`} cancelled. A cancellation fee of ${formatPrice(fee)} will be added to your next invoice.`
          : `${cancelTarget.length === 1 ? "Session" : `${cancelTarget.length} sessions`} cancelled at no charge.`
      );
      setCancelTarget(null);
      fetchData();
    } catch (err) {
      alert(`Couldn't cancel: ${errorText(err)}`);
    } finally {
      setCancelling(false);
    }
  };

  const submitPrepaymentProof = async () => {
    if (!payingPrepayment || !proofFile || !studentId) return;
    setSubmittingProof(true);
    try {
      const path = await uploadPaymentProof("prepayments", studentId, payingPrepayment.id, proofFile);
      const { error } = await supabase
        .from('prepayments')
        .update({ proof_url: path, status: 'proof_uploaded' })
        .eq('id', payingPrepayment.id);
      if (error) throw error;
      setPayingPrepayment(null);
      setProofFile(null);
      fetchData();
    } catch (err) {
      alert(`Couldn't send the proof: ${errorText(err)}`);
    } finally {
      setSubmittingProof(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="amber">Awaiting Confirmation</Badge>;
      case 'accepted': return <Badge variant="blue">Scheduled</Badge>;
      case 'declined': return <Badge variant="red">Declined</Badge>;
      case 'completed': return <Badge variant="green">Completed</Badge>;
      case 'cancelled': return <Badge variant="outline">Cancelled</Badge>;
      case 'no_show': return <Badge variant="red">No-show</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const hasPendingReschedule = (sessionId: string) =>
    rescheduleRequests.some(r => r.session_id === sessionId);

  const isActionable = (s: SessionRow) => ['pending', 'accepted'].includes(s.status) && !hasStarted(s);

  // Group per series_id; one-off bookings are their own group. Groups with
  // anything still ahead go under "Akan Datang", the rest under "Riwayat".
  const { upcomingGroups, pastGroups } = useMemo(() => {
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

    const isOpen = (s: SessionRow) => ['pending', 'accepted'].includes(s.status) && !hasStarted(s);
    return {
      upcomingGroups: groups.filter(g => g.sessions.some(isOpen)),
      pastGroups: groups.filter(g => !g.sessions.some(isOpen)).reverse(),
    };
  }, [sessions]);

  const totalUnpaidFee = unpaidFees.reduce((sum, f) => sum + f.amount, 0);

  const renderGroup = (group: { key: string; series: boolean; sessions: SessionRow[] }) => {
    const cancellableInGroup = group.sessions.filter(isActionable);
    const acceptanceId = group.sessions[0].contract_acceptance_id;
    const version = acceptanceId ? contractVersions[acceptanceId] : undefined;

    return (
      <Card key={group.key} variant="sketch" className="p-0 overflow-hidden">
        {group.series && (
          <div className="bg-[var(--color-paper-bg-alt)] border-b border-[var(--color-line)] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold font-[var(--font-inter)] text-[var(--color-brand-blue)] flex items-center gap-1.5 uppercase tracking-wide">
              <Repeat className="w-3.5 h-3.5" /> Weekly Series ({group.sessions.length} sessions)
            </span>
            {cancellableInGroup.length > 1 && (
              <button
                onClick={() => openCancel(cancellableInGroup)}
                className="text-xs font-[var(--font-inter)] text-[var(--color-danger-red)] hover:underline flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Cancel Rest of Series ({cancellableInGroup.length})
              </button>
            )}
          </div>
        )}

        <div className="divide-y divide-[var(--color-line)]">
          {group.sessions.map((session) => (
            <div key={session.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-[var(--color-ink)] font-[var(--font-inter)] flex items-center gap-2">
                  {formatDateStr(session.date, 'EEEE, dd MMM yyyy', 'en')}
                </div>
                <div className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)] flex items-center gap-1.5 mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  {hhmm(session.start_time)} - {hhmm(session.end_time)} {APP_TIMEZONE_LABEL} · {formatPrice(session.price)}
                </div>
                {hasPendingReschedule(session.id) && (
                  <div className="text-xs text-[var(--color-brand-blue)] font-[var(--font-inter)] flex items-center gap-1 mt-1">
                    <Info className="w-3.5 h-3.5" /> Reschedule awaiting approval
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {getStatusBadge(session.status)}
                {isActionable(session) && !hasPendingReschedule(session.id) && (
                  <>
                    <Button size="sm" variant="secondary" onClick={() => openRescheduleModal(session)} className="text-xs">
                      Reschedule
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openCancel([session])}
                      className="text-xs text-[var(--color-danger-red)] hover:bg-[var(--color-danger-red)]/10"
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {version ? (
          <div className="px-4 py-2 border-t border-dashed border-[var(--color-line)] text-xs font-[var(--font-inter)] text-[var(--color-ink-soft)]">
            <Link href={`/terms?version=${version}`} target="_blank" className="inline-flex items-center gap-1 hover:text-[var(--color-brand-blue)]">
              <FileText className="w-3.5 h-3.5" /> Agreement you accepted (v{version})
            </Link>
          </div>
        ) : null}
      </Card>
    );
  };

  return (
    <PaperBackground className="pt-8 md:pt-12 pb-20 min-h-screen">
      <div className="container-main max-w-4xl mx-auto space-y-8">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-ink)] flex items-center gap-2">
            <CalendarCheck className="w-8 h-8 text-[var(--color-brand-blue)]" /> My Sessions
          </h1>
          <div className="flex gap-2">
            <Button variant="secondary" href="/schedule" size="sm">Book a New Session</Button>
            <Button variant="ghost" onClick={fetchData} size="sm" className="px-3" aria-label="Refresh">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        <ScheduleOffers onChanged={fetchData} />

        <ProgressCard />

        {totalUnpaidFee > 0 && (
          <div className="flex items-start gap-3 p-4 rounded-[var(--radius-card)] bg-amber-50 border border-amber-300 text-amber-800 font-[var(--font-inter)] text-sm">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              You have unpaid cancellation fees of <strong>{formatPrice(totalUnpaidFee)}</strong>.
              They will be added to your next invoice automatically, or waived if you choose to pay up front when booking.
            </p>
          </div>
        )}

        {prepayments.map((p) => (
          <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-[var(--radius-card)] bg-white border border-[var(--color-line)] font-[var(--font-inter)] text-sm">
            <div className="flex items-start gap-3">
              <Wallet className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-brand-blue)]" />
              <div>
                <p className="font-semibold text-[var(--color-ink)]">Up-front payment: {formatPrice(p.total_amount)}</p>
                <p className="text-xs text-[var(--color-ink-soft)]">
                  {p.status === 'pending' && "Waiting for your transfer and payment proof."}
                  {p.status === 'rejected' && "The admin rejected the proof. Please upload it again."}
                  {p.status === 'proof_uploaded' && "Proof sent and being reviewed by the admin."}
                </p>
              </div>
            </div>
            {['pending', 'rejected'].includes(p.status) && (
              <Button size="sm" onClick={() => { setPayingPrepayment(p); setProofFile(null); }}>
                Upload Proof
              </Button>
            )}
          </div>
        ))}

        {loading ? (
          <div className="text-center py-12 text-[var(--color-ink-soft)] font-[var(--font-inter)]">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-[var(--color-brand-blue)]" />
            Loading sessions...
          </div>
        ) : upcomingGroups.length === 0 && pastGroups.length === 0 ? (
          <Card className="text-center py-16 bg-white/50 border-dashed border-[var(--color-line)]">
            <CalendarCheck className="w-16 h-16 text-[var(--color-line)] mx-auto mb-4" />
            <h3 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] mb-2">No sessions yet</h3>
            <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)] mb-6">You haven&apos;t booked any classes yet.</p>
            <Button href="/schedule">Book Now</Button>
          </Card>
        ) : (
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] border-b-2 border-dashed border-[var(--color-line)] pb-2 inline-block">
                Upcoming
              </h2>
              {upcomingGroups.length === 0 ? (
                <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">No upcoming sessions.</p>
              ) : (
                upcomingGroups.map(renderGroup)
              )}
            </div>

            {pastGroups.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold font-[var(--font-inter)] text-[var(--color-ink)] border-b-2 border-dashed border-[var(--color-line)] pb-2 inline-block">
                  History
                </h2>
                {pastGroups.map(renderGroup)}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal: Konfirmasi Batalkan */}
      {cancelTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md space-y-4">
            <h3 className="font-[var(--font-kalam)] text-2xl text-[var(--color-danger-red)] flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" /> Cancel {cancelTarget.length > 1 ? `${cancelTarget.length} Sessions` : "Session"}?
            </h3>
            {cancelFee === null ? (
              <p className="text-sm font-[var(--font-inter)] text-[var(--color-ink-soft)]">Calculating the cancellation fee...</p>
            ) : cancelFee > 0 ? (
              <p className="text-sm font-[var(--font-inter)] text-[var(--color-ink)]">
                Cancelling less than {FREE_CANCELLATION_NOTICE_HOURS} hours before a scheduled session costs
                {" "}<strong>a one-time fee of {formatPrice(cancelFee)}</strong>
                {cancelTarget.length > 1 && <> (not per session, even though you&apos;re cancelling {cancelTarget.length} sessions at once)</>}.
                The fee will be added to your next invoice.
              </p>
            ) : (
              <p className="text-sm font-[var(--font-inter)] text-[var(--color-ink)]">
                This cancellation is <strong>free of charge</strong>.
              </p>
            )}
            <p className="text-sm font-[var(--font-inter)] text-[var(--color-ink-soft)]">
              If you only need to move the session, consider <strong>Reschedule</strong> instead. It&apos;s free.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={() => setCancelTarget(null)}>Keep Session</Button>
              <Button
                onClick={confirmCancel}
                isLoading={cancelling}
                disabled={cancelFee === null}
                className="bg-[var(--color-danger-red)] hover:bg-[var(--color-danger-red)] border-transparent text-white"
              >
                Yes, Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Modal: Upload bukti bayar di muka */}
      {payingPrepayment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md space-y-4">
            <h3 className="font-[var(--font-kalam)] text-2xl text-[var(--color-brand-blue)]">
              Pay Up Front: {formatPrice(payingPrepayment.total_amount)}
            </h3>
            <div className="bg-[var(--color-paper-bg-alt)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-4 font-[var(--font-inter)] text-sm space-y-2">
              {bankDetails?.account_number && (
                <p>{bankDetails.bank_name}: <strong>{bankDetails.account_number}</strong> (account name: {bankDetails.account_name})</p>
              )}
              {ewalletDetails?.number && (
                <p>{ewalletDetails.provider}: <strong>{ewalletDetails.number}</strong> (account name: {ewalletDetails.account_name})</p>
              )}
            </div>
            <Input
              type="file"
              label="Upload Payment Proof"
              accept="image/*,application/pdf"
              onChange={(e) => setProofFile(e.target.files?.[0] || null)}
            />
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setPayingPrepayment(null)}>Cancel</Button>
              <Button onClick={submitPrepaymentProof} isLoading={submittingProof} disabled={!proofFile}>Send Proof</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Modal: Reschedule */}
      {rescheduleTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <Card className="w-full max-w-2xl space-y-4 my-8">
            <div className="flex items-center justify-between">
              <h3 className="font-[var(--font-kalam)] text-2xl text-[var(--color-brand-blue)]">Reschedule Session</h3>
              <button onClick={() => setRescheduleTarget(null)} aria-label="Close" className="p-2 text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-bg-alt)] rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm font-[var(--font-inter)] text-[var(--color-ink-soft)]">
              Current time: {formatDateStr(rescheduleTarget.date, 'EEEE, dd MMM yyyy', 'en')}, {hhmm(rescheduleTarget.start_time)} {APP_TIMEZONE_LABEL}
            </p>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <DatePicker
                  selected={rescheduleDate ? dateStrToLocalDate(rescheduleDate) : undefined}
                  onSelect={(date) => { setRescheduleDate(date ? localDateToDateStr(date) : undefined); setRescheduleSlot(null); }}
                  availableDates={Array.from(new Set(allSlots.map(s => s.date))).map(dateStrToLocalDate)}
                />
              </div>
              <div className="md:w-1/2">
                {rescheduleDate ? (
                  <TimeSlotGrid
                    slots={allSlots.filter(s => s.date === rescheduleDate)}
                    selectedSlot={rescheduleSlot}
                    onSelect={setRescheduleSlot}
                    isLoading={slotsLoading}
                  />
                ) : (
                  <p className="text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] italic">Choose a date on the left first.</p>
                )}
              </div>
            </div>

            <Textarea
              label="Reason (optional)"
              value={rescheduleReason}
              onChange={(e) => setRescheduleReason(e.target.value)}
              placeholder="E.g. an unexpected family event"
              rows={2}
            />

            <div className="flex justify-end gap-3 pt-2 border-t border-[var(--color-line)]">
              <Button variant="ghost" onClick={() => setRescheduleTarget(null)}>Cancel</Button>
              <Button onClick={submitReschedule} isLoading={submittingReschedule} disabled={!rescheduleSlot}>
                Send Request
              </Button>
            </div>
          </Card>
        </div>
      )}
    </PaperBackground>
  );
}
