"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type AuthProfile = {
    id: string;
    role: "admin" | "student";
    full_name: string;
} | null;

/**
 * Shared "who's logged in" hook. Used by the public Navbar (to decide which
 * CTA/logout to show), the admin sidebar, and the dashboard shell — pulled
 * out once instead of each of them re-implementing the same getUser() +
 * profiles fetch + onAuthStateChange subscription.
 */
export function useAuthProfile() {
    const supabase = createClient();
    const [profile, setProfile] = useState<AuthProfile>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const load = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                if (mounted) {
                    setProfile(null);
                    setLoading(false);
                }
                return;
            }

            const { data } = await supabase
                .from("profiles")
                .select("id, role, full_name")
                .eq("id", user.id)
                .single();

            if (mounted) {
                setProfile(data as AuthProfile);
                setLoading(false);
            }
        };

        load();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(() => {
            load();
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
        setProfile(null);
    };

    return { profile, loading, signOut };
}