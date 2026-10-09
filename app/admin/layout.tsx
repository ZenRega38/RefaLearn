import { AdminShell } from "@/components/admin/AdminShell";

// Every /admin/* page depends on who's logged in — there's no meaningful
// static version of it to cache. Without this, Next tries to prerender a
// generic (logged-out) shell at build time, which only works at all because
// the Supabase env vars happen to be present, and serves stale HTML on the
// first request either way.
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <AdminShell>{children}</AdminShell>;
}
