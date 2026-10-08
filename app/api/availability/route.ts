import { NextRequest, NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase/public";
import { bookingHorizon, getOpenSlots } from "@/lib/availability";
import { errorMessage } from "@/lib/api-auth";
import { todayStr } from "@/lib/time";

export const dynamic = "force-dynamic";

/**
 * GET /api/availability → { slots, from, to }
 * Open 90-minute slots from today to the booking horizon, already excluding
 * blackout dates and every student's pending/accepted sessions.
 */
export async function GET(request: NextRequest) {
    const exclude = request.nextUrl.searchParams;
    const excludeDate = exclude.get("excludeDate");
    const excludeTime = exclude.get("excludeTime");

    const from = todayStr();
    const to = bookingHorizon();

    try {
        const slots = await getOpenSlots(createPublicClient(), from, to, {
            excludeSession: excludeDate && excludeTime ? { date: excludeDate, start_time: excludeTime } : undefined,
        });
        return NextResponse.json({ slots, from, to });
    } catch (err) {
        console.error("[api/availability] failed:", err);
        return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
    }
}
