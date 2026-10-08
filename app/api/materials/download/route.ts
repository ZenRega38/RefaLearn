import { NextRequest, NextResponse } from "next/server";
import { jsonError, requireUser } from "@/lib/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { MATERIAL_FILES_BUCKET } from "@/lib/storage";
import { isSafeHttpUrl } from "@/lib/format";

/**
 * GET /api/materials/download?materialId=…
 * Redirects to a 5-minute signed URL for a material the caller has a
 * confirmed order for (or any material, for admins). Works even after the
 * admin hides the item from the catalog — a purchase is permanent.
 */
export async function GET(request: NextRequest) {
    const auth = await requireUser();
    if (!auth.ok) return jsonError(auth.error, auth.status);
    const { user, profile } = auth;

    const materialId = request.nextUrl.searchParams.get("materialId");
    if (!materialId) return jsonError("materialId wajib diisi.");

    const admin = createAdminClient();

    if (profile.role !== "admin") {
        const { data: orders } = await admin
            .from("material_orders")
            .select("id")
            .eq("student_id", user.id)
            .eq("status", "confirmed")
            .contains("material_ids", [materialId])
            .limit(1);
        if (!orders || orders.length === 0) return jsonError("Anda belum memiliki akses ke materi ini.", 403);
    }

    const { data: material } = await admin.from("materials").select("file_url").eq("id", materialId).maybeSingle();
    if (!material?.file_url) return jsonError("File materi belum diunggah admin. Silakan hubungi admin.", 404);

    // Legacy rows (seed data) may hold an external link instead of a path.
    if (isSafeHttpUrl(material.file_url)) {
        return NextResponse.redirect(material.file_url);
    }

    const { data, error } = await admin.storage.from(MATERIAL_FILES_BUCKET).createSignedUrl(material.file_url, 300);
    if (error || !data) return jsonError("Gagal membuat link unduhan.", 500);

    return NextResponse.redirect(data.signedUrl);
}
