import { createClient } from "@/lib/supabase/server";

/**
 * Guards an app/api route handler so only an authenticated admin can call
 * it. Required because middleware.ts's role-redirect logic only covers
 * paths starting with /admin or /dashboard — /api/* routes are NOT covered
 * by that check and must verify the caller themselves.
 *
 * On success, returns the caller's user + profile + a request-bound
 * Supabase client (anon key, but with the admin's session — so RLS's
 * "Admins can read/write all" policies apply).
 */
export async function requireAdminUser() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { ok: false as const, error: "Unauthorized", status: 401 };
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("role, full_name")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "admin") {
        return { ok: false as const, error: "Forbidden — admin only", status: 403 };
    }

    return { ok: true as const, user, profile, supabase };
}