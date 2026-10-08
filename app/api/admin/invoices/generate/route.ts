import { NextRequest, NextResponse } from "next/server";
import { errorMessage, readJson, requireAdminUser } from "@/lib/api-auth";
import { generateInvoicesForPeriod, getPreviousPeriod, notifyInvoicesCreated } from "@/lib/invoicing";

/**
 * Manual "Generate Now" trigger for /admin/invoices (agent.md 6.6). Safe to
 * run any number of times: it only bills what no invoice covers yet, so a
 * session marked completed late lands on a new, supplementary invoice.
 *
 * Body: { periodMonth?: number; periodYear?: number } — defaults to last month.
 */
export async function POST(request: NextRequest) {
    const auth = await requireAdminUser();
    if (!auth.ok) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = (await readJson<{ periodMonth?: number; periodYear?: number }>(request)) || {};
    const fallback = getPreviousPeriod();
    const periodMonth = Number(body.periodMonth ?? fallback.month);
    const periodYear = Number(body.periodYear ?? fallback.year);

    if (!Number.isInteger(periodMonth) || periodMonth < 1 || periodMonth > 12 || !Number.isInteger(periodYear)) {
        return NextResponse.json({ error: "Periode tidak valid" }, { status: 400 });
    }

    try {
        const result = await generateInvoicesForPeriod(periodMonth, periodYear);
        await notifyInvoicesCreated(result);
        return NextResponse.json({ ok: true, ...result });
    } catch (err) {
        console.error("[invoices/generate] failed:", err);
        return NextResponse.json({ error: errorMessage(err, "Failed to generate invoices") }, { status: 500 });
    }
}
