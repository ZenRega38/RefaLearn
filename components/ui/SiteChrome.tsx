"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";

export function SiteChrome({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith("/admin");

    if (isAdminRoute) {
        // /admin/* pages get their own sidebar shell (app/admin/layout.tsx) —
        // the public marketing Navbar/Footer would be redundant there, and
        // the floating ChatWidget already hides itself for admins anyway
        // (they use the dedicated inbox at /admin/chat instead).
        return <>{children} </>;
    }

    return (
        <>
            <Navbar />
            < main className="flex-1" > {children} </main>
            < Footer />
            <ChatWidget />
        </>
    );
}