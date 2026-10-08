import "server-only";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

type Role = "admin" | "student";

/**
 * Resolves the signed-in caller of an app/api route. proxy.ts only
 * guards /admin and /dashboard pages — /api/* routes must check the caller
 * themselves.
 *
 * Returns a request-bound Supabase client (anon key + the caller's session,
 * so RLS applies) alongside the user and profile.
 */
export async function requireUser(role?: Role) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { ok: false as const, error: "Silakan login terlebih dahulu.", status: 401 };
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("id, role, full_name, phone")
        .eq("id", user.id)
        .single();

    if (!profile) {
        return { ok: false as const, error: "Profil tidak ditemukan.", status: 403 };
    }

    if (role && profile.role !== role) {
        return {
            ok: false as const,
            error: role === "admin" ? "Forbidden — admin only" : "Fitur ini khusus akun siswa.",
            status: 403,
        };
    }

    return { ok: true as const, user, profile, supabase };
}

export function requireAdminUser() {
    return requireUser("admin");
}

export function jsonError(error: string, status = 400) {
    return NextResponse.json({ error }, { status });
}

export async function readJson<T>(request: NextRequest): Promise<T | null> {
    try {
        return (await request.json()) as T;
    } catch {
        return null;
    }
}

export function clientIp(request: NextRequest): string | null {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    return request.headers.get("x-real-ip");
}

export function errorMessage(err: unknown, fallback = "Terjadi kesalahan."): string {
    if (err && typeof err === "object" && "message" in err && typeof err.message === "string") {
        return err.message;
    }
    return fallback;
}

/** Postgres exclusion / unique violations → a friendly "slot taken" message. */
export function isSlotConflict(err: unknown): boolean {
    const code = err && typeof err === "object" && "code" in err ? String(err.code) : "";
    return code === "23P01" || code === "23505";
}
