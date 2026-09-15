"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";

export function SiteChrome({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith("/admin");

    if (isAdminRoute) {
        // /admin/* pages get their own sidebar shell (app/admin/layout.tsx).
        return <>{children}</>;
    }

    return (
        <>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatWidget />
        </>
    );
}