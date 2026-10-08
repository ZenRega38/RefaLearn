import { NextRequest, NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { safeNextPath } from "@/lib/redirect";

/**
 * Landing point for links in Supabase Auth emails (sign-up confirmation,
 * password recovery) and for "Masuk dengan Google". Handles both the PKCE
 * `?code=` flow and the `?token_hash=&type=` flow, then forwards to `next`,
 * kept inside the signed-in user's own area (admin vs student).
 */
export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    const next = safeNextPath(params.get("next"), "/dashboard");
    const supabase = await createClient();

    // Google sends ?error=access_denied when the user cancels.
    if (params.get("error")) {
        const url = request.nextUrl.clone();
        url.search = "";
        url.pathname = "/login";
        url.searchParams.set("error", "oauth");
        return NextResponse.redirect(url);
    }

    const code = params.get("code");
    const tokenHash = params.get("token_hash");
    const type = params.get("type") as EmailOtpType | null;

    let failed = true;
    let userId: string | null = null;
    if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        failed = !!error;
        userId = data.user?.id ?? null;
    } else if (tokenHash && type) {
        const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
        failed = !!error;
    }

    const url = request.nextUrl.clone();
    url.search = "";
    if (failed) {
        url.pathname = "/login";
        url.searchParams.set("error", "link");
    } else if (type === "recovery") {
        url.pathname = "/reset-password";
    } else {
        url.pathname = next;
        if (userId) {
            // Same rule as the password login: never land in the other role's area.
            const { data: profile } = await supabase.from("profiles").select("role").eq("id", userId).single();
            const isAdmin = profile?.role === "admin";
            if (isAdmin && next.startsWith("/dashboard")) url.pathname = "/admin";
            if (!isAdmin && next.startsWith("/admin")) url.pathname = "/dashboard";
        }
    }
    return NextResponse.redirect(url);
}
