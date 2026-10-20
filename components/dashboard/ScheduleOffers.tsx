"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ContractModal, type ContractSignature } from "@/components/booking/ContractModal";
import { formatPrice } from "@/lib/pricing";
import { formatDateStr, hhmm } from "@/lib/format";
import { APP_TIMEZONE_LABEL, todayStr } from "@/lib/time";
import { PROFILE_COMPLETION_COLUMNS, missingProfileFields, needsGuardian, type ProfileCompletion } from "@/lib/profile";
import { planSummary, type SchedulePlan } from "@/lib/schedule-plan";
import { CalendarPlus, Repeat, AlertCircle } from "lucide-react";

type OfferSession = { date: string; start_time: string; end_time: string; price: number };
type Offer = { id: string; plan: SchedulePlan; sessions: OfferSession[]; note: string | null; created_at: string };
type Contract = { id: string; content: string };

/**
 * Schedules the admin assigned to this student, waiting for an answer.
 * Accepting means signing the current contract, like a booking; then the
 * sessions appear as accepted. `onChanged` refreshes the session list.
 */
export function ScheduleOffers({ onChanged }: { onChanged: () => void }) {
  const [supabase] = useState(() => createClient());
  const [offers, setOffers] = useState<Offer[]>([]);
  const [contract, setContract] = useState<Contract | null>(null);
  const [profile, setProfile] = useState<(ProfileCompletion & { full_name: string }) | null>(null);
  const [signing, setSigning] = useState<Offer | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const load = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const [{ data: list }, { data: c }, { data: p }] = await Promise.all([
      supabase.from("schedule_offers").select("id, plan, sessions, note, created_at").eq("status", "pending").order("created_at", { ascending: false }),
      supabase.from("contracts").select("id, content").lte("effective_date", todayStr()).order("version", { ascending: false }).limit(1).maybeSingle(),
      supabase.from("profiles").select(PROFILE_COMPLETION_COLUMNS).eq("id", user.id).single(),
    ]);
    setOffers((list || []) as Offer[]);
    setContract((c as Contract | null) ?? null);
    setProfile((p as (ProfileCompletion & { full_name: string }) | null) ?? null);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load
    load();
  }, [load]);

  if (offers.length === 0 && !message) return null;

  const missing = missingProfileFields(profile, todayStr(), "en");

  const answer = async (offer: Offer, payload: Record<string, unknown>) => {
    setBusy(offer.id);
    setMessage(null);
    try {
      const res = await fetch(`/api/schedule-offers/${offer.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setMessage(
        payload.action === "accept"
          ? { ok: true, text: "Schedule accepted! The sessions are now in My Sessions." }
          : { ok: true, text: "Schedule declined. The admin has been notified." }
      );
      await load();
      onChanged();
    } catch (err) {
      setMessage({ ok: false, text: err instanceof Error ? err.message : "Something went wrong." });
    } finally {
      setBusy(null);
    }
  };

  const accept = (signature: ContractSignature) => {
    const offer = signing;
    setSigning(null);
    if (offer && contract) answer(offer, { action: "accept", contractId: contract.id, ...signature });
  };

  const decline = (offer: Offer) => {
    const reason = window.prompt("Why doesn't this schedule work for you? (optional, sent to the admin)");
    if (reason === null) return;
    answer(offer, { action: "decline", reason });
  };

  return (
    <div className="space-y-4">
      {message && (
        <p className={`rounded-[var(--radius-card)] border p-3 text-sm font-[var(--font-inter)] ${message.ok ? "border-[var(--color-success-green)]/40 bg-[var(--color-success-green)]/10 text-[var(--color-ink)]" : "border-[var(--color-danger-red)]/40 bg-[var(--color-danger-red)]/10 text-[var(--color-danger-red)]"}`}>
          {message.text}
        </p>
      )}

      {offers.map((offer) => {
        const ongoing = offer.plan.repeat !== "none" && !offer.plan.endDate;
        const total = offer.sessions.reduce((n, s) => n + s.price, 0);
        const shown = offer.sessions.slice(0, 6);
        return (
          <Card key={offer.id} variant="sketch" className="space-y-4 border-[var(--color-brand-blue)]">
            <div className="flex items-start gap-3">
              <span className="w-10 h-10 shrink-0 rounded-full bg-[var(--color-brand-blue)] text-white flex items-center justify-center">
                <CalendarPlus className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-blue)] font-[var(--font-inter)]">New schedule from the admin</p>
                <p className="font-bold text-[var(--color-ink)] font-[var(--font-inter)]">{planSummary(offer.plan, "en")}</p>
              </div>
            </div>

            <ul className="space-y-1 text-sm font-[var(--font-inter)] text-[var(--color-ink)]">
              {shown.map((s) => (
                <li key={`${s.date}-${s.start_time}`} className="flex flex-wrap justify-between gap-x-3">
                  <span>{formatDateStr(s.date, "EEEE, dd MMM yyyy", "en")}</span>
                  <span className="text-[var(--color-ink-soft)]">
                    {hhmm(s.start_time)}–{hhmm(s.end_time)} {APP_TIMEZONE_LABEL} · {formatPrice(s.price)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)] flex flex-wrap items-center gap-2">
              {offer.sessions.length > shown.length && <span>…and {offer.sessions.length - shown.length} more {offer.sessions.length - shown.length === 1 ? "session" : "sessions"}.</span>}
              <span>
                first {offer.sessions.length} {offer.sessions.length === 1 ? "session" : "sessions"} · {formatPrice(total)}
              </span>
              {ongoing && (
                <span className="inline-flex items-center gap-1 font-semibold text-[var(--color-brand-blue)]">
                  <Repeat className="w-3.5 h-3.5" /> ongoing, later sessions are added automatically
                </span>
              )}
            </p>
            {offer.note && <p className="text-sm italic text-[var(--color-ink-soft)] font-[var(--font-inter)]">Note from the admin: {offer.note}</p>}

            {missing.length > 0 ? (
              <p className="flex items-start gap-2 rounded-[var(--radius-card)] border border-[var(--color-warning-amber)]/50 bg-[var(--color-warning-amber)]/10 p-3 text-sm text-[var(--color-ink)] font-[var(--font-inter)]">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[var(--color-warning-amber)]" />
                <span>
                  Complete your profile before accepting: {missing.join(", ")}.{" "}
                  <Link href="/dashboard/profile?next=/dashboard" className="font-semibold text-[var(--color-brand-blue)] hover:underline">Complete profile</Link>
                </span>
              </p>
            ) : null}

            <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
              <Button variant="ghost" onClick={() => decline(offer)} disabled={busy === offer.id}>
                Decline
              </Button>
              <Button onClick={() => setSigning(offer)} isLoading={busy === offer.id} disabled={missing.length > 0 || !contract}>
                Read Agreement & Accept
              </Button>
            </div>
          </Card>
        );
      })}

      <ContractModal
        isOpen={!!signing}
        onClose={() => setSigning(null)}
        onAccept={accept}
        contractHtml={contract?.content || ""}
        expectedName={profile?.full_name || ""}
        requireGuardian={needsGuardian(profile?.birth_date, todayStr())}
        guardianName={profile?.guardian_name || ""}
      />
    </div>
  );
}
