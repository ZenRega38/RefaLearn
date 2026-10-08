import { NextRequest, NextResponse } from "next/server";
import { generateInvoicesForPeriod, getPreviousPeriod, notifyInvoicesCreated } from "@/lib/invoicing";
import { errorMessage } from "@/lib/api-auth";

/**
 * Scheduled job (agent.md Section 6.6): bills every student's completed
 * sessions up to the end of the month that just ended. vercel.json runs it
 * at 00:00 UTC on day 1 (08:00 WITA).
 *
 * Protected by CRON_SECRET rather than an admin session, since there's no
 * logged-in user when Vercel's scheduler calls this.
 */
export async function GET(request: NextRequest) {
    const authHeader = request.headers.get("authorization");
    if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { month: periodMonth, year: periodYear } = getPreviousPeriod();

    try {
        const result = await generateInvoicesForPeriod(periodMonth, periodYear);
        await notifyInvoicesCreated(result);

        console.log(`[cron/generate-invoices] period ${periodMonth}/${periodYear}:`, {
            created: result.created.length,
            skipped: result.skipped.length,
        });

        return NextResponse.json({ ok: true, ...result });
    } catch (err) {
        console.error("[cron/generate-invoices] failed:", err);
        return NextResponse.json({ error: errorMessage(err, "Failed to generate invoices") }, { status: 500 });
    }
}
