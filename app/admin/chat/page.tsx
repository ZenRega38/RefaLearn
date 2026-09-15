"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { freshChannel } from "@/lib/supabase/realtime-channel";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MessageCircle, Send, Search, User } from "lucide-react";
import { format, parseISO, isToday, isYesterday } from "date-fns";
import { id } from "date-fns/locale";

type Conversation = {
  id: string;
  student_id: string;
  last_message_at: string;
  profiles: { full_name: string; avatar_url: string | null };
};

type Message = {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

export default function AdminChatInbox() {
  const supabase = createClient();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [adminUser, setAdminUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setAdminUser(user);

      await fetchConversations();

      // Subscribe to conversation updates (e.g. last_message_at changes, new convs)
      const convChannel = freshChannel(supabase, 'admin_conversations')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_conversations' }, () => {
          fetchConversations();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(convChannel);
      };
    };
    initData();
  }, []);

  const fetchConversations = async () => {
    const { data } = await supabase
      .from('chat_conversations')
      .select('*, profiles(full_name, avatar_url)')
      .order('last_message_at', { ascending: false });
    if (data) setConversations(data as Conversation[]);
  };

  useEffect(() => {
    if (!selectedConvId) return;

    const fetchMessages = async () => {
      const { data } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', selectedConvId)
        .order('created_at', { ascending: true });
      if (data) setMessages(data as Message[]);
    };

    fetchMessages();

    // Subscribe to new messages in this conversation
    const msgChannel = freshChannel(supabase, `admin_chat_${selectedConvId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `conversation_id=eq.${selectedConvId}`
      }, (payload) => {
        const newMsg = payload.new as Message;
        setMessages(prev => (prev.some(m => m.id === newMsg.id) ? prev : [...prev, newMsg]));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(msgChannel);
    };
  }, [selectedConvId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConvId || !adminUser) return;

    const content = newMessage;
    setNewMessage("");

    const { data: inserted, error } = await supabase
      .from('chat_messages')
      .insert([{
        conversation_id: selectedConvId,
        sender_id: adminUser.id,
        content: content
      }])
      .select()
      .single();

    if (!error && inserted) {
      const msg = inserted as Message;
      setMessages(prev => (prev.some(m => m.id === msg.id) ? prev : [...prev, msg]));
    }

    await supabase.from('chat_conversations').update({ last_message_at: new Date().toISOString() }).eq('id', selectedConvId);
  };

  const formatTime = (dateStr: string) => {
    const d = parseISO(dateStr);
    if (isToday(d)) return format(d, 'HH:mm');
    if (isYesterday(d)) return 'Kemarin';
    return format(d, 'dd/MM/yyyy');
  };

  const filteredConvs = conversations.filter(c =>
    c.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
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

        <Card className="flex-1 p-0 overflow-hidden flex flex-col md:flex-row h-full">

          {/* Sidebar */}
          <div className="w-full md:w-80 border-r border-[var(--color-line)] flex flex-col bg-white">
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
                filteredConvs.map(conv => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConvId(conv.id)}
                    className={`w-full text-left p-4 border-b border-[var(--color-line)] hover:bg-[var(--color-paper-bg-alt)] transition-colors flex items-center gap-3 ${selectedConvId === conv.id ? 'bg-[var(--color-brand-blue)]/5 border-l-4 border-l-[var(--color-brand-blue)]' : 'border-l-4 border-l-transparent'}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[var(--color-paper-bg)] border border-[var(--color-line)] flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-[var(--color-ink-soft)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-semibold text-sm text-[var(--color-ink)] truncate font-[var(--font-inter)]">
                          {conv.profiles?.full_name || 'Siswa'}
                        </h4>
                        <span className="text-[10px] text-[var(--color-ink-soft)] whitespace-nowrap">
                          {formatTime(conv.last_message_at)}
                        </span>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col bg-[url('/img/paper-texture.png')] bg-cover">
            {selectedConvId ? (
              <>
                {/* Chat Header */}
                <div className="h-16 border-b border-[var(--color-line)] bg-white flex items-center px-6">
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
                    messages.map(msg => {
                      const isMe = msg.sender_id === adminUser?.id;
                      return (
                        <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                          <div
                            className={`max-w-[70%] p-3 rounded-2xl text-sm font-[var(--font-inter)] ${isMe
                              ? 'bg-[var(--color-brand-blue)] text-white rounded-tr-none shadow-sm'
                              : 'bg-white border border-[var(--color-line)] text-[var(--color-ink)] rounded-tl-none shadow-sm'
                              }`}
                          >
                            {msg.content}
                          </div>
                          <span className="text-[10px] text-[var(--color-ink-soft)] mt-1 mx-1">
                            {format(parseISO(msg.created_at), 'HH:mm')}
                          </span>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-[var(--color-line)]">
                  <form onSubmit={sendMessage} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ketik balasan..."
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      className="flex-1 input-field"
                    />
                    <Button type="submit" disabled={!newMessage.trim()} className="px-6 gap-2">
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