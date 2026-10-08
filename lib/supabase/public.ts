import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cookie-less anon client for public server pages (home, news, alumni,
 * about, sitemap). Reading cookies opts a route out of static rendering,
 * which silently disabled `revalidate` on those pages; this client reads
 * only what RLS exposes to anonymous visitors anyway.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
