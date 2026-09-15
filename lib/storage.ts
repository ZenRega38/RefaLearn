import { createClient } from "@/lib/supabase/client";

// Single source of truth for bucket names — both buckets must be PRIVATE
// (never public) per agent.md Section 7. Access always goes through a
// signed URL generated here, never a stored public link.
export const PAYMENT_PROOFS_BUCKET = "payment-proofs";
export const MATERIAL_FILES_BUCKET = "material-files";

function extensionOf(file: File): string {
    const parts = file.name.split(".");
    return parts.length > 1 ? parts.pop()!.toLowerCase() : "jpg";
}

/**
 * Uploads a payment-proof screenshot for a session invoice or a material
 * order. Returns the storage PATH (not a URL) — this is what gets saved into
 * `invoices.proof_url` / `material_orders.proof_url`. The path always starts
 * with the student's own id so the storage RLS policy can check ownership.
 */
export async function uploadPaymentProof(
    kind: "invoices" | "orders",
    studentId: string,
    recordId: string,
    file: File
): Promise<string> {
    const supabase = createClient();
    const path = `${kind}/${studentId}/${recordId}-${Date.now()}.${extensionOf(file)}`;

    const { error } = await supabase.storage
        .from(PAYMENT_PROOFS_BUCKET)
        .upload(path, file, { upsert: true });

    if (error) throw error;
    return path;
}

/**
 * Generates a short-lived signed URL to VIEW a previously uploaded payment
 * proof. `path` is exactly what was stored in `proof_url` by the function
 * above. Call this right before opening the link — don't cache the result,
 * it expires.
 */
export async function getSignedProofUrl(path: string, expiresInSeconds = 300): Promise<string> {
    const supabase = createClient();
    const { data, error } = await supabase.storage
        .from(PAYMENT_PROOFS_BUCKET)
        .createSignedUrl(path, expiresInSeconds);

    if (error) throw error;
    return data.signedUrl;
}

/**
 * Admin-only: uploads the actual material file (PDF, etc). Returns the
 * storage path to save into `materials.file_url`. The path is prefixed with
 * the material's own id so the storage RLS policy can match it against
 * `material_orders.material_ids` for confirmed purchasers.
 */
export async function uploadMaterialFile(materialId: string, file: File): Promise<string> {
    const supabase = createClient();
    const path = `${materialId}/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
        .from(MATERIAL_FILES_BUCKET)
        .upload(path, file, { upsert: true });

    if (error) throw error;
    return path;
}

/**
 * Generates a short-lived signed URL so a student with a confirmed order can
 * download a material file. Storage RLS (see the migration) only allows this
 * to succeed if the requesting user actually has a confirmed order
 * containing this material — so this call itself is the access check.
 */
export async function getSignedMaterialUrl(path: string, expiresInSeconds = 300): Promise<string> {
    const supabase = createClient();
    const { data, error } = await supabase.storage
        .from(MATERIAL_FILES_BUCKET)
        .createSignedUrl(path, expiresInSeconds);

    if (error) throw error;
    return data.signedUrl;
}