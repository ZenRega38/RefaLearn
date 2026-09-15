"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { freshChannel } from "@/lib/supabase/realtime-channel";
import { MessageCircle, X, Send, Paperclip } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

type Message = {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

export function ChatWidget() {
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // The realtime effect below only runs once ([] deps), so its closures
  // capture `isOpen` as it was at mount time forever. A ref sidesteps that
  // stale-closure problem — it's always read at call time, not effect-setup
  // time — so the "was the widget open when this arrived" check is accurate.
  const isOpenRef = useRef(isOpen);
  useEffect(() => {
    isOpenRef.current = isOpen;
    if (isOpen) setHasUnread(false);
  }, [isOpen]);

  useEffect(() => {
    const initChat = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Check if role is student, only students see this widget (admins have a full inbox page)
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      if (profile?.role === 'admin') return;

      setUser(user);

      // Find or create conversation
      const { data: existingConv } = await supabase
        .from('chat_conversations')
        .select('id')
        .eq('student_id', user.id)
        .single();

      let convId = existingConv?.id;

      if (!convId) {
        const { data: newConv } = await supabase
          .from('chat_conversations')
          .insert([{ student_id: user.id }])
          .select('id')
          .single();
        if (newConv) convId = newConv.id;
      }

      if (convId) {
        setConversationId(convId);

        // Load messages
        const { data: msgs } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('conversation_id', convId)
          .order('created_at', { ascending: true });

        if (msgs) setMessages(msgs as Message[]);

        // Subscribe to new messages
        const channel = freshChannel(supabase, `chat_${convId}`)
          .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'chat_messages',
            filter: `conversation_id=eq.${convId}`
          }, (payload) => {
            const newMsg = payload.new as Message;
            // The sender's own message is already added optimistically in
            // sendMessage() below — when this same row comes back over
            // realtime a moment later, skip it instead of duplicating it.
            setMessages(prev => (prev.some(m => m.id === newMsg.id) ? prev : [...prev, newMsg]));

            if (newMsg.sender_id !== user.id && !isOpenRef.current) {
              setHasUnread(true);
            }
          })
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      }
    };

    initChat();
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !conversationId || !user) return;

    const content = newMessage;
    setNewMessage("");

    // .select().single() returns the inserted row (with its real id and
    // created_at) so we can show it right away, instead of waiting on the
    // realtime event for our own insert to round-trip back — that trip
    // through Postgres's replication stream can lag a second or more,
    // which is what made sent messages seem to "not appear" until a
    // refresh or the next incoming message.
    const { data: inserted, error } = await supabase
      .from('chat_messages')
      .insert([{
        conversation_id: conversationId,
        sender_id: user.id,
        content: content
      }])
      .select()
      .single();

    if (!error && inserted) {
      const msg = inserted as Message;
      setMessages(prev => (prev.some(m => m.id === msg.id) ? prev : [...prev, msg]));
    }

    // Update conversation last_message_at
    await supabase.from('chat_conversations').update({ last_message_at: new Date().toISOString() }).eq('id', conversationId);
  };

  if (!user || !conversationId) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-[var(--color-paper-bg)] border-2 border-[var(--color-line)] rounded-[var(--radius-card)] shadow-[var(--shadow-sketch)] flex flex-col overflow-hidden mb-4 animate-slide-up">

          {/* Header */}
          <div className="bg-[var(--color-brand-blue)] p-4 flex justify-between items-center text-white">
            <div>
              <h3 className="font-[var(--font-kalam)] text-xl font-bold">Admin Refa Learn</h3>
              <p className="text-xs font-[var(--font-inter)] opacity-90">Biasanya membalas dalam beberapa jam</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 h-80 overflow-y-auto p-4 space-y-4 bg-[url('/img/paper-texture.png')] bg-cover">
            {messages.length === 0 ? (
              <div className="text-center text-[var(--color-ink-soft)] text-sm mt-10 font-[var(--font-inter)]">
                Kirim pesan untuk memulai obrolan dengan Admin.
              </div>
            ) : (
              messages.map(msg => {
                const isMe = msg.sender_id === user.id;
                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-sm font-[var(--font-inter)] ${isMe
                          ? 'bg-[var(--color-brand-blue)] text-white rounded-tr-none'
                          : 'bg-white border border-[var(--color-line)] text-[var(--color-ink)] rounded-tl-none shadow-sm'
                        }`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-[10px] text-[var(--color-ink-soft)] mt-1 mx-1">
                      {format(new Date(msg.created_at), 'HH:mm')}
                    </span>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-[var(--color-line)]">
            <form onSubmit={sendMessage} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ketik pesan..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                className="flex-1 bg-[var(--color-paper-bg-alt)] border border-[var(--color-line)] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[var(--color-brand-blue)] font-[var(--font-inter)]"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
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
        className="relative w-14 h-14 rounded-full bg-[var(--color-accent-coral)] text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {hasUnread && !isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
        )}
      </button>

    </div>
  );
}