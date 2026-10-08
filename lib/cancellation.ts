import { CANCELLATION_FEE_AMOUNT, FREE_CANCELLATION_NOTICE_HOURS } from "@/lib/policy";
import { hoursUntil } from "@/lib/time";

export { CANCELLATION_FEE_AMOUNT, FREE_CANCELLATION_NOTICE_HOURS };

type CancellableSession = {
  date: string;
  start_time: string;
  status: string;
};

/**
 * The fee one cancellation action incurs. Requests the admin hasn't
 * accepted yet are free; accepted sessions are free with at least
 * FREE_CANCELLATION_NOTICE_HOURS notice. Otherwise one flat fee for the
 * whole action — never per session.
 */
export function cancellationFeeFor(sessions: CancellableSession[], now: Date = new Date()): number {
  const late = sessions.some(
    (s) => s.status === "accepted" && hoursUntil(s.date, s.start_time, now) < FREE_CANCELLATION_NOTICE_HOURS
  );
  return late ? CANCELLATION_FEE_AMOUNT : 0;
}

/** A session can be cancelled or rescheduled only before it starts. */
export function hasStarted(session: { date: string; start_time: string }, now: Date = new Date()): boolean {
  return hoursUntil(session.date, session.start_time, now) <= 0;
}
