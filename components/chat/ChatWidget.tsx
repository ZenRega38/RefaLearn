"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { freshChannel } from "@/lib/supabase/realtime-channel";
import { uploadChatAttachment } from "@/lib/storage";
import { ChatMessageBubble, type ChatMessage } from "@/components/chat/ChatMessageBubble";
import { MessageCircle, X, Send, Paperclip } from "lucide-react";

export function ChatWidget() {
  const [supabase] = useState(() => createClient());
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Who's logged in, and their existing conversation if any. The
  // conversation row itself is only created when the first message is sent.
  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || cancelled) {
        setUserId(null);
        setConversationId(null);
        setMessages([]);
        return;
      }

      // Only students see this widget (admins have a full inbox page).
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      if (cancelled || profile?.role !== 'student') return;

      setUserId(user.id);

      const { data: existingConv } = await supabase
        .from('chat_conversations')
        .select('id')
        .eq('student_id', user.id)
        .maybeSingle();

      if (cancelled) return;
      setConversationId(existingConv?.id ?? null);
    };

    init();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => { init(); });
    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Messages + realtime for the current conversation. Returning the cleanup
  // from the effect itself (not from an inner async function) is what makes
  // the channel actually get removed on unmount.
  useEffect(() => {
    if (!conversationId) return;

    supabase
      .from('chat_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
      .then(({ data }) => { if (data) setMessages(data as ChatMessage[]); });

    const channel = freshChannel(supabase, `chat_${conversationId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'chat_messages',
        filter: `conversation_id=eq.${conversationId}`
      }, (payload) => {
        const row = payload.new as ChatMessage;
        if (!row?.id) return;
        setMessages(prev => {
          const idx = prev.findIndex(m => m.id === row.id);
          if (idx === -1) return [...prev, row];
          const next = [...prev];
          next[idx] = row;
          return next;
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, supabase]);

  const unreadCount = messages.filter(m => m.sender_id !== userId && !m.is_read).length;

  // Opening the widget marks the admin's messages as read.
  useEffect(() => {
    if (!isOpen || !conversationId || !userId || unreadCount === 0) return;
    supabase
      .from('chat_messages')
      .update({ is_read: true })
      .eq('conversation_id', conversationId)
      .neq('sender_id', userId)
      .eq('is_read', false)
      .then(() => {
        setMessages(prev => prev.map(m => (m.sender_id !== userId ? { ...m, is_read: true } : m)));
      });
  }, [isOpen, conversationId, userId, unreadCount, supabase]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const ensureConversation = useCallback(async (): Promise<string | null> => {
    if (conversationId) return conversationId;
    if (!userId) return null;
    const { data, error } = await supabase
      .from('chat_conversations')
      .insert([{ student_id: userId }])
      .select('id')
      .single();
    if (data) {
      setConversationId(data.id);
      return data.id;
    }
    // Unique violation → it already exists (e.g. created in another tab).
    if (error) {
      const { data: existing } = await supabase.from('chat_conversations').select('id').eq('student_id', userId).maybeSingle();
      if (existing) {
        setConversationId(existing.id);
        return existing.id;
      }
    }
    return null;
  }, [conversationId, userId, supabase]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = newMessage.trim();
    if ((!content && !file) || !userId || sending) return;

    setSending(true);
    setSendError(null);
    try {
      const convId = await ensureConversation();
      if (!convId) throw new Error("Gagal membuka percakapan.");

      const attachmentPath = file ? await uploadChatAttachment(convId, file) : null;

      const { data: inserted, error } = await supabase
        .from('chat_messages')
        .insert([{
          conversation_id: convId,
          sender_id: userId,
          content,
          attachment_url: attachmentPath,
        }])
        .select()
        .single();

      if (error || !inserted) throw error || new Error("Pesan gagal terkirim.");

      const msg = inserted as ChatMessage;
      setMessages(prev => (prev.some(m => m.id === msg.id) ? prev : [...prev, msg]));
      setNewMessage("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      fetch('/api/chat/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId: msg.id }),
      }).catch(() => {});
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Pesan gagal terkirim. Coba lagi.");
    } finally {
      setSending(false);
    }
  };

  if (!userId) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* Chat Window — full-screen sheet on phones, floating panel from md up */}
      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:absolute md:bottom-16 md:right-0 md:w-96 md:mb-4 bg-[var(--color-paper-bg)] md:border-2 border-[var(--color-line)] md:rounded-[var(--radius-card)] shadow-[var(--shadow-sketch)] flex flex-col overflow-hidden animate-slide-up z-50">

          {/* Header */}
          <div className="bg-[var(--color-brand-blue)] p-4 flex justify-between items-center text-white">
            <div>
              <h3 className="font-[var(--font-kalam)] text-xl font-bold">Admin Refa Learn</h3>
              <p className="text-xs font-[var(--font-inter)] opacity-90">Biasanya membalas dalam beberapa jam</p>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Tutup chat" className="hover:bg-white/20 p-1 rounded transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 md:flex-none md:h-80 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-[var(--color-ink-soft)] text-sm mt-10 font-[var(--font-inter)]">
                Kirim pesan untuk memulai obrolan dengan Admin.
              </div>
            ) : (
              messages.map(msg => (
                <ChatMessageBubble key={msg.id} msg={msg} isMe={msg.sender_id === userId} />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-[var(--color-line)]">
            {(file || sendError) && (
              <div className="text-xs font-[var(--font-inter)] mb-2 flex items-center justify-between gap-2">
                {file ? (
                  <span className="text-[var(--color-ink-soft)] truncate flex items-center gap-1">
                    <Paperclip className="w-3.5 h-3.5 shrink-0" /> {file.name}
                    <button type="button" onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} aria-label="Hapus lampiran" className="ml-1 text-[var(--color-danger-red)]">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ) : <span />}
                {sendError && <span className="text-[var(--color-danger-red)]">{sendError}</span>}
              </div>
            )}
            <form onSubmit={sendMessage} className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*,application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Lampirkan file"
                className="w-9 h-9 rounded-full text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-bg-alt)] flex items-center justify-center shrink-0"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <input
                type="text"
                placeholder="Ketik pesan..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                className="flex-1 min-w-0 bg-[var(--color-paper-bg-alt)] border border-[var(--color-line)] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[var(--color-brand-blue)] font-[var(--font-inter)]"
              />
              <button
                type="submit"
                disabled={(!newMessage.trim() && !file) || sending}
                aria-label="Kirim"
                className="w-9 h-9 rounded-full bg-[var(--color-brand-blue)] text-white flex items-center justify-center hover:bg-[var(--color-brand-blue)]/90 disabled:opacity-50 transition-colors shrink-0"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Tutup chat" : "Buka chat"}
        className="relative w-14 h-14 rounded-full bg-[var(--color-accent-coral)] text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {unreadCount > 0 && !isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
        )}
      </button>

    </div>
  );
}
