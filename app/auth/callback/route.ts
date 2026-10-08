import { NextRequest, NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { safeNextPath } from "@/lib/redirect";

/**
 * Landing point for links in Supabase Auth emails (sign-up confirmation,
 * password recovery). Handles both the PKCE `?code=` flow and the
 * `?token_hash=&type=` flow, then forwards to `next`.
 */
export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    const next = safeNextPath(params.get("next"), "/dashboard");
    const supabase = await createClient();

    const code = params.get("code");
    const tokenHash = params.get("token_hash");
    const type = params.get("type") as EmailOtpType | null;

    let failed = true;
    if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        failed = !!error;
    } else if (tokenHash && type) {
        const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
        failed = !!error;
    }

    const url = request.nextUrl.clone();
    url.search = "";
    if (failed) {
        url.pathname = "/login";
        url.searchParams.set("error", "link");
    } else {
        url.pathname = type === "recovery" ? "/reset-password" : next;
    }
    return NextResponse.redirect(url);
}
