"use client";

import { useState } from "react";
import { Paperclip } from "lucide-react";
import { format, parseISO } from "date-fns";
import { getSignedChatAttachmentUrl } from "@/lib/storage";

export type ChatMessage = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  attachment_url: string | null;
  is_read: boolean;
  created_at: string;
};

/** Shared bubble for the student widget and the admin inbox. */
export function ChatMessageBubble({ msg, isMe, maxWidth = "max-w-[80%]" }: { msg: ChatMessage; isMe: boolean; maxWidth?: string }) {
  const [opening, setOpening] = useState(false);

  const openAttachment = async () => {
    if (!msg.attachment_url) return;
    setOpening(true);
    try {
      const url = await getSignedChatAttachmentUrl(msg.attachment_url);
      window.open(url, "_blank", "noopener");
    } catch {
      alert("Gagal membuka lampiran.");
    } finally {
      setOpening(false);
    }
  };

  const fileName = msg.attachment_url?.split("/").pop()?.replace(/^\d+-/, "");

  return (
    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
      <div
        className={`${maxWidth} p-3 rounded-2xl text-sm font-[var(--font-inter)] whitespace-pre-wrap break-words ${isMe
          ? "bg-[var(--color-brand-blue)] text-white rounded-tr-none shadow-sm"
          : "bg-white border border-[var(--color-line)] text-[var(--color-ink)] rounded-tl-none shadow-sm"
          }`}
      >
        {msg.attachment_url && (
          <button
            type="button"
            onClick={openAttachment}
            disabled={opening}
            className={`flex items-center gap-1.5 underline text-left ${msg.content ? "mb-1" : ""}`}
          >
            <Paperclip className="w-3.5 h-3.5 shrink-0" />
            {opening ? "Membuka..." : fileName || "Lampiran"}
          </button>
        )}
        {msg.content}
      </div>
      <span className="text-[10px] text-[var(--color-ink-soft)] mt-1 mx-1">
        {format(parseISO(msg.created_at), "HH:mm")}
        {isMe && msg.is_read ? " · Dibaca" : ""}
      </span>
    </div>
  );
}
