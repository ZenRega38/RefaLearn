// Goes in: lib/supabase/realtime-channel.ts
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Wraps supabase.channel(topic) to guard against a specific interaction
 * with React's Strict Mode double-invoked effects in development.
 *
 * The Supabase JS client deduplicates channels by topic string internally
 * — calling .channel(sameTopic) while a channel with that topic is already
 * registered returns THAT channel object, already subscribed, instead of a
 * fresh one. Calling .on() on an already-subscribed channel throws:
 *
 *   "cannot add postgres_changes callbacks for realtime:X after
 *   subscribe()."
 *
 * Strict Mode triggers this directly: mount -> cleanup -> mount again, in
 * the same tick. removeChannel() in the first cleanup does remove the
 * channel from the client's internal list synchronously (the actual
 * socket teardown happens async, but the list itself updates immediately),
 * so calling this helper before every .channel() call is enough to always
 * start from a clean slate — no race, no need to await anything.
 *
 * Usage (identical to supabase.channel(topic) otherwise):
 *   const channel = freshChannel(supabase, `chat_${convId}`)
 *     .on('postgres_changes', {...}, handler)
 *     .subscribe();
 */
export function freshChannel(supabase: SupabaseClient, topic: string) {
    const existing = supabase.getChannels().find((ch) => ch.topic === `realtime:${topic}`);
    if (existing) {
        supabase.removeChannel(existing);
    }
    return supabase.channel(topic);
}