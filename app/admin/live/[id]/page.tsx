"use client";

import { useParams } from "next/navigation";
import { LiveHost } from "@/components/live/LiveHost";

/** The admin's live-quiz host screen (meant for the projector). */
export default function AdminLiveHostPage() {
  const { id } = useParams<{ id: string }>();
  return <LiveHost sessionId={id} />;
}
