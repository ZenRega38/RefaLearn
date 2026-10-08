"use client";

import { useParams } from "next/navigation";
import { LivePlayer } from "@/components/live/LivePlayer";
import { PaperBackground } from "@/components/sketch/PaperBackground";

/** Player screen for a live quiz, reached by QR code or link. No login needed. */
export default function LivePlayerPage() {
  const { pin } = useParams<{ pin: string }>();
  return (
    <PaperBackground variant="alt" className="min-h-screen pt-16 sm:pt-24 pb-6 sm:pb-10">
      <div className="max-w-3xl mx-auto sm:px-4">
        <LivePlayer key={pin} pin={pin} />
      </div>
    </PaperBackground>
  );
}
