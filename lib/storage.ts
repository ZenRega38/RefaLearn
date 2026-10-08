import { createClient } from "@/lib/supabase/client";

// Single source of truth for bucket names. payment-proofs, material-files
// and chat-attachments are PRIVATE (agent.md Section 7) — access always goes
// through a short-lived signed URL. public-assets holds only images meant
// for the public site (covers, photos, logos).
export const PAYMENT_PROOFS_BUCKET = "payment-proofs";
export const MATERIAL_FILES_BUCKET = "material-files";
export const CHAT_ATTACHMENTS_BUCKET = "chat-attachments";
export const PUBLIC_ASSETS_BUCKET = "public-assets";

const MAX_PROOF_BYTES = 5 * 1024 * 1024;
const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;

function extensionOf(file: File): string {
    const parts = file.name.split(".");
    return parts.length > 1 ? parts.pop()!.toLowerCase().replace(/[^a-z0-9]/g, "") : "jpg";
}

function safeName(file: File): string {
    return file.name.replace(/[^\w.-]+/g, "_").slice(-80);
}

function assertProofFile(file: File) {
    if (file.size > MAX_PROOF_BYTES) throw new Error("Ukuran file maksimal 5 MB.");
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
        throw new Error("Format file harus gambar (JPG/PNG) atau PDF.");
    }
}

/**
 * Uploads a payment-proof screenshot for an invoice, a material order or a
 * prepayment. Returns the storage PATH (not a URL) — that is what goes into
 * `proof_url`. The second path segment is the student's id so storage RLS
 * (and the database guard triggers) can check ownership.
 */
export async function uploadPaymentProof(
    kind: "invoices" | "orders" | "prepayments",
    studentId: string,
    recordId: string,
    file: File
): Promise<string> {
    assertProofFile(file);
    const supabase = createClient();
    const path = `${kind}/${studentId}/${recordId}-${Date.now()}.${extensionOf(file)}`;

    const { error } = await supabase.storage
        .from(PAYMENT_PROOFS_BUCKET)
        .upload(path, file, { upsert: true, contentType: file.type });

    if (error) throw error;
    return path;
}

/**
 * Short-lived signed URL to VIEW a previously uploaded payment proof. Call
 * it right before opening the link — don't cache the result, it expires.
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
 * Admin-only: uploads the actual material file. The path is prefixed with
 * the material's id. Students download through /api/materials/download.
 */
export async function uploadMaterialFile(materialId: string, file: File): Promise<string> {
    const supabase = createClient();
    const path = `${materialId}/${Date.now()}-${safeName(file)}`;

    const { error } = await supabase.storage
        .from(MATERIAL_FILES_BUCKET)
        .upload(path, file, { upsert: true, contentType: file.type });

    if (error) throw error;
    return path;
}

/** Admin-only: uploads a public image and returns its public URL. */
export async function uploadPublicImage(folder: "materials" | "news" | "alumni" | "partners", file: File): Promise<string> {
    if (!file.type.startsWith("image/")) throw new Error("File harus berupa gambar.");
    if (file.size > MAX_PROOF_BYTES) throw new Error("Ukuran gambar maksimal 5 MB.");
    const supabase = createClient();
    const path = `${folder}/${Date.now()}-${safeName(file)}`;

    const { error } = await supabase.storage
        .from(PUBLIC_ASSETS_BUCKET)
        .upload(path, file, { upsert: false, contentType: file.type });
    if (error) throw error;

    return supabase.storage.from(PUBLIC_ASSETS_BUCKET).getPublicUrl(path).data.publicUrl;
}

/** Uploads a chat attachment into the conversation's folder; returns the path. */
export async function uploadChatAttachment(conversationId: string, file: File): Promise<string> {
    if (file.size > MAX_ATTACHMENT_BYTES) throw new Error("Ukuran lampiran maksimal 10 MB.");
    const supabase = createClient();
    const path = `${conversationId}/${Date.now()}-${safeName(file)}`;

    const { error } = await supabase.storage
        .from(CHAT_ATTACHMENTS_BUCKET)
        .upload(path, file, { upsert: false, contentType: file.type });
    if (error) throw error;
    return path;
}

export async function getSignedChatAttachmentUrl(path: string, expiresInSeconds = 300): Promise<string> {
    const supabase = createClient();
    const { data, error } = await supabase.storage
        .from(CHAT_ATTACHMENTS_BUCKET)
        .createSignedUrl(path, expiresInSeconds);
    if (error) throw error;
    return data.signedUrl;
}
