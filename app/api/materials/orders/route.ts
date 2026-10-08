import { NextRequest, NextResponse } from "next/server";
import { errorMessage, jsonError, readJson, requireUser } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * POST /api/materials/orders  { materialIds: string[] }
 * Creates one order for the given catalog items. Prices and the total come
 * from the database, never from the client; a free order is confirmed
 * immediately. Items the student already owns or has a pending order for
 * are skipped.
 */
export async function POST(request: NextRequest) {
    const auth = await requireUser("student");
    if (!auth.ok) return jsonError(auth.error, auth.status);
    const { user } = auth;

    const body = await readJson<{ materialIds?: string[] }>(request);
    const requested = Array.from(new Set(body?.materialIds || [])).filter((x) => typeof x === "string");
    if (requested.length === 0) return jsonError("Keranjang kosong.");
    if (requested.length > 50) return jsonError("Terlalu banyak item dalam satu pesanan.");

    const admin = createAdminClient();
    const [{ data: materials, error }, { data: existing }] = await Promise.all([
        admin.from("materials").select("id, price").in("id", requested).eq("is_active", true),
        admin
            .from("material_orders")
            .select("material_ids")
            .eq("student_id", user.id)
            .in("status", ["pending", "proof_uploaded", "confirmed"]),
    ]);

    if (error) return jsonError(errorMessage(error), 500);

    const owned = new Set((existing || []).flatMap((o) => o.material_ids as string[]));
    const items = (materials || []).filter((m) => !owned.has(m.id));

    if (items.length === 0) {
        return jsonError("Semua materi ini sudah Anda miliki atau sedang dalam proses pembayaran.", 409);
    }

    const total = items.reduce((sum, m) => sum + m.price, 0);
    const { data: order, error: insertError } = await admin
        .from("material_orders")
        .insert([
            {
                student_id: user.id,
                material_ids: items.map((m) => m.id),
                total_amount: total,
                status: total === 0 ? "confirmed" : "pending",
                confirmed_at: total === 0 ? new Date().toISOString() : null,
            },
        ])
        .select("id, status, total_amount")
        .single();

    if (insertError) return jsonError(errorMessage(insertError), 500);

    return NextResponse.json({
        ok: true,
        order,
        skipped: requested.filter((id) => !items.some((m) => m.id === id)),
    });
}
