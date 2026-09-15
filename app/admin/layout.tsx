import { AdminSidebar } from "@/components/admin/AdminSidebar";

// Every /admin/* page depends on who's logged in — there's no meaningful
// static version of it to cache. Without this, Next tries to prerender a
// generic (logged-out) shell at build time, which only works at all because
// the Supabase env vars happen to be present, and serves stale HTML on the
// first request either way.
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-[var(--color-paper-bg-alt)]">
            <AdminSidebar />
            <div className="flex-1 min-w-0">{children}</div>
        </div>
    );
}