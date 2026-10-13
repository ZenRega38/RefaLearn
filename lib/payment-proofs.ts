import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { PAYMENT_PROOFS_BUCKET } from "@/lib/storage";

type ProofTable = "material_orders" | "invoices" | "prepayments";

/**
 * Once a payment is confirmed its proof has done its job: delete the file
 * from storage and clear proof_url, so verified proofs don't pile up.
 * Rejected proofs are kept so the student and admin can see what was wrong.
 *
 * Only call after the caller has checked the record is confirmed. Never
 * throws — a leftover file is harmless, a failed confirmation is not.
 */
export async function discardConfirmedProof(table: ProofTable, recordId: string): Promise<void> {
    try {
        const admin = createAdminClient();
        const { data } = await admin.from(table).select("status, proof_url").eq("id", recordId).single();
        if (!data || data.status !== "confirmed" || !data.proof_url) return;

        // Older rows may hold a full URL instead of a storage path; only paths
        // live in our bucket.
        if (!/^https?:\/\//i.test(data.proof_url)) {
            const { error } = await admin.storage.from(PAYMENT_PROOFS_BUCKET).remove([data.proof_url]);
            if (error) throw error;
        }
        await admin.from(table).update({ proof_url: null }).eq("id", recordId).eq("status", "confirmed");
    } catch (err) {
        console.error(`[payment-proofs] could not discard proof of ${table}/${recordId}:`, err);
    }
}
