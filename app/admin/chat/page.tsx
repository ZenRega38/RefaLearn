"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { freshChannel } from "@/lib/supabase/realtime-channel";
import { uploadChatAttachment } from "@/lib/storage";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ChatMessageBubble, type ChatMessage } from "@/components/chat/ChatMessageBubble";
import { MessageCircle, Send, Search, User, Paperclip, X, ArrowLeft } from "lucide-react";
import { format, parseISO, isToday, isYesterday } from "date-fns";

type Conversation = {
  id: string;
  student_id: string;
  last_message_at: string;
  profiles: { full_name: string; avatar_url: string | null } | null;
};

export default function AdminChatInbox() {
  const [supabase] = useState(() => createClient());
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [unreadByConv, setUnreadByConv] = useState<Record<string, number>>({});
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchConversations = useCallback(async () => {
    const { data } = await supabase
      .from('chat_conversations')
      .select('*, profiles(full_name, avatar_url)')
      .order('last_message_at', { ascending: false });
    if (data) setConversations(data as Conversation[]);
  }, [supabase]);

  const fetchUnread = useCallback(async (me: string) => {
    const { data } = await supabase
      .from('chat_messages')
      .select('conversation_id')
      .eq('is_read', false)
      .neq('sender_id', me);
    const counts: Record<string, number> = {};
    (data || []).forEach((m) => { counts[m.conversation_id] = (counts[m.conversation_id] || 0) + 1; });
    setUnreadByConv(counts);
  }, [supabase]);

  useEffect(() => {
    let me: string | null = null;

    supabase.auth.getUser().then(({ data: { user } }) => {
      me = user?.id ?? null;
      setAdminId(me);
      fetchConversations();
      if (me) fetchUnread(me);
    });

    // Conversation list + unread counts stay live: a new message bumps
    // last_message_at (via DB trigger) and arrives as a message INSERT.
    const channel = freshChannel(supabase, 'admin_inbox')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_conversations' }, () => {
        fetchConversations();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_messages' }, () => {
        if (me) fetchUnread(me);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, fetchConversations, fetchUnread]);

  useEffect(() => {
    if (!selectedConvId) return;

    supabase
      .from('chat_messages')
      .select('*')
      .eq('conversation_id', selectedConvId)
      .order('created_at', { ascending: true })
      .then(({ data }) => { if (data) setMessages(data as ChatMessage[]); });

    const msgChannel = freshChannel(supabase, `admin_chat_${selectedConvId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'chat_messages',
        filter: `conversation_id=eq.${selectedConvId}`
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
      supabase.removeChannel(msgChannel);
    };
  }, [selectedConvId, supabase]);

  // Reading a conversation marks the student's messages in it as read.
  const unreadInOpen = messages.filter(m => m.sender_id !== adminId && !m.is_read).length;
  useEffect(() => {
    if (!selectedConvId || !adminId || unreadInOpen === 0) return;
    supabase
      .from('chat_messages')
      .update({ is_read: true })
      .eq('conversation_id', selectedConvId)
      .neq('sender_id', adminId)
      .eq('is_read', false)
      .then(() => {
        setMessages(prev => prev.map(m => (m.sender_id !== adminId ? { ...m, is_read: true } : m)));
        fetchUnread(adminId);
      });
  }, [selectedConvId, adminId, unreadInOpen, supabase, fetchUnread]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = newMessage.trim();
    if ((!content && !file) || !selectedConvId || !adminId || sending) return;

    setSending(true);
    setSendError(null);
    try {
      const attachmentPath = file ? await uploadChatAttachment(selectedConvId, file) : null;
      const { data: inserted, error } = await supabase
        .from('chat_messages')
        .insert([{
          conversation_id: selectedConvId,
          sender_id: adminId,
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
      setSendError(err instanceof Error ? err.message : "Pesan gagal terkirim.");
    } finally {
      setSending(false);
    }
  };

  const formatTime = (dateStr: string) => {
    const d = parseISO(dateStr);
    if (isToday(d)) return format(d, 'HH:mm');
    if (isYesterday(d)) return 'Kemarin';
    return format(d, 'dd/MM/yyyy');
  };

  const filteredConvs = conversations.filter(c =>
    (c.profiles?.full_name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = conversations.find(c => c.id === selectedConvId);

  return (
    <PaperBackground className="p-4 md:p-8 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">

        <div className="flex items-center gap-2">
          <MessageCircle className="w-8 h-8 text-[var(--color-brand-blue)]" />
          <h1 className="text-3xl font-[var(--font-kalam)] text-[var(--color-brand-blue)]">
            Chat Inbox
          </h1>
        </div>

        <Card className="flex-1 p-0 overflow-hidden flex flex-col md:flex-row h-full min-h-0">

          {/* Sidebar — hidden on phones while a conversation is open */}
          <div className={`w-full md:w-80 border-r border-[var(--color-line)] flex-col bg-white min-h-0 ${selectedConvId ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 border-b border-[var(--color-line)]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-soft)]" />
                <input
                  type="text"
                  placeholder="Cari nama siswa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-[var(--color-paper-bg-alt)] border border-[var(--color-line)] rounded-md focus:outline-none focus:border-[var(--color-brand-blue)] font-[var(--font-inter)]"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredConvs.length === 0 ? (
                <div className="p-8 text-center text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)]">
                  Belum ada percakapan.
                </div>
              ) : (
                filteredConvs.map(conv => {
                  const unread = unreadByConv[conv.id] || 0;
                  return (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConvId(conv.id)}
                      className={`w-full text-left p-4 border-b border-[var(--color-line)] hover:bg-[var(--color-paper-bg-alt)] transition-colors flex items-center gap-3 ${selectedConvId === conv.id ? 'bg-[var(--color-brand-blue)]/5 border-l-4 border-l-[var(--color-brand-blue)]' : 'border-l-4 border-l-transparent'}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-[var(--color-paper-bg)] border border-[var(--color-line)] flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-[var(--color-ink-soft)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1 gap-2">
                          <h4 className={`text-sm text-[var(--color-ink)] truncate font-[var(--font-inter)] ${unread > 0 ? 'font-bold' : 'font-semibold'}`}>
                            {conv.profiles?.full_name || 'Siswa'}
                          </h4>
                          <span className="text-[10px] text-[var(--color-ink-soft)] whitespace-nowrap">
                            {formatTime(conv.last_message_at)}
                          </span>
                        </div>
                        {unread > 0 && (
                          <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-[var(--color-danger-red)] text-white text-[10px] font-bold">
                            {unread}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className={`flex-1 flex-col min-h-0 ${selectedConvId ? 'flex' : 'hidden md:flex'}`}>
            {selectedConvId ? (
              <>
                {/* Chat Header */}
                <div className="h-16 border-b border-[var(--color-line)] bg-white flex items-center gap-2 px-4 md:px-6">
                  <button onClick={() => setSelectedConvId(null)} className="md:hidden p-1 -ml-1 text-[var(--color-ink-soft)]" aria-label="Kembali ke daftar">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="font-bold text-[var(--color-ink)] font-[var(--font-inter)]">
                    {selectedConv?.profiles?.full_name}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-[var(--color-ink-soft)] text-sm mt-10 font-[var(--font-inter)]">
                      Mulai obrolan.
                    </div>
                  ) : (
                    messages.map(msg => (
                      <ChatMessageBubble key={msg.id} msg={msg} isMe={msg.sender_id === adminId} maxWidth="max-w-[70%]" />
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-[var(--color-line)]">
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
                  <form onSubmit={sendMessage} className="flex gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <Button type="button" variant="ghost" onClick={() => fileInputRef.current?.click()} className="px-3" aria-label="Lampirkan file">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <input
                      type="text"
                      placeholder="Ketik balasan..."
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      className="flex-1 min-w-0 input-field"
                    />
                    <Button type="submit" disabled={(!newMessage.trim() && !file) || sending} isLoading={sending} className="px-6 gap-2">
                      Kirim <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-[var(--color-ink-soft)]">
                <MessageCircle className="w-16 h-16 mb-4 opacity-20" />
                <p className="font-[var(--font-inter)]">Pilih percakapan dari sidebar untuk mulai membalas.</p>
              </div>
            )}
          </div>

        </Card>
      </div>
    </PaperBackground>
  );
}
