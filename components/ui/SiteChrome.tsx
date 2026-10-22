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
    // The chrome is hidden in place, never by returning a different tree:
    // that would remount the page and throw away the running quiz.
    return (
        <>
            {!focus && <Navbar />}
            <main className="flex-1">{children}</main>
            {!focus && <Footer />}
            {!focus && <ChatWidget />}
        </>
    );
}
