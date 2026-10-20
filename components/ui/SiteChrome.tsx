"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useFocusModeActive } from "@/lib/focus-mode";

export function SiteChrome({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const focus = useFocusModeActive();
    const isAdminRoute = pathname?.startsWith("/admin");
    // Live quiz players get nothing but the quiz: no navbar, footer or chat
    // bubble to tap by accident mid-question.
    const isLiveRoute = pathname === "/live" || pathname?.startsWith("/live/");

    if (isAdminRoute || isLiveRoute) {
        // /admin/* pages get their own sidebar shell (app/admin/layout.tsx).
        return <>{children}</>;
    }

    // Answering a quiz, checkpoint or test (see lib/focus-mode): the same.
    if (focus) {
        return <main className="flex-1">{children}</main>;
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
