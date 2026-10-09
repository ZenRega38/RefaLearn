"use client";

import { useParams } from "next/navigation";
import { LivePlayer } from "@/components/live/LivePlayer";

/**
 * Player screen for a live quiz, reached by QR code or link. No login
 * needed, and no site navbar or footer (see SiteChrome): only the quiz.
 */
export default function LivePlayerPage() {
  const { pin } = useParams<{ pin: string }>();
  return (
    <div className="live-bg min-h-screen flex flex-col">
      <div className="flex-1 w-full max-w-3xl mx-auto flex flex-col">
        <LivePlayer key={pin} pin={pin} fill />
      </div>
    </div>
  );
}
