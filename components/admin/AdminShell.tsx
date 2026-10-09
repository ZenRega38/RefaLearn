"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

/**
 * The admin frame: sidebar + page. The live-quiz host screen is shown on a
 * projector, so it gets no sidebar at all — nothing private is one stray
 * click away while the class is watching.
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin/live/")) return <>{children}</>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[var(--color-paper-bg-alt)]">
      <AdminSidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
