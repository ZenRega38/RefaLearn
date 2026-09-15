"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
    LayoutDashboard,
    CalendarClock,
    Video,
    Receipt,
    BookOpen,
    ShoppingBag,
    Newspaper,
    GraduationCap,
    MessageCircle,
    FileSignature,
    Settings,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navItems = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
    { href: "/admin/availability", label: "Ketersediaan", icon: CalendarClock },
    { href: "/admin/sessions", label: "Sesi & Permintaan", icon: Video },
    { href: "/admin/invoices", label: "Tagihan", icon: Receipt },
    { href: "/admin/materials", label: "Materi", icon: BookOpen },
    { href: "/admin/material-orders", label: "Pesanan Materi", icon: ShoppingBag },
    { href: "/admin/news", label: "News", icon: Newspaper },
    { href: "/admin/alumni", label: "Alumni", icon: GraduationCap },
    { href: "/admin/chat", label: "Chat", icon: MessageCircle },
    { href: "/admin/contracts", label: "Kontrak", icon: FileSignature },
    { href: "/admin/settings", label: "Pengaturan", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    const isActive = (href: string, exact?: boolean) =>
        exact ? pathname === href : pathname === href || pathname?.startsWith(href + "/");

    const NavLinks = () => (
        <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href, item.exact);
                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium font-[var(--font-inter)] transition-colors ${active
                                        ? "bg-[var(--color-brand-blue)] text-white"
                                        : "text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-bg-alt)] hover:text-[var(--color-ink)]"
                                    }`}
                            >
                                <Icon className="w-4 h-4 shrink-0" />
                                {item.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );

    return (
        <>
            {/* Mobile top bar — admin pages hide the public Navbar (see
          SiteChrome), so this is the only header on small screens. */}
            <div className="md:hidden sticky top-0 z-40 flex items-center justify-between h-14 px-4 bg-[var(--color-brand-blue)] text-white">
                <span className="font-[var(--font-kalam)] text-lg font-bold">Refa Learn Admin</span>
                <button onClick={() => setMobileOpen(true)} aria-label="Buka menu admin">
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex">
                    <div className="w-72 bg-[var(--color-paper-bg)] h-full flex flex-col shadow-[var(--shadow-float)]">
                        <div className="flex items-center justify-between h-14 px-4 border-b border-[var(--color-line)]">
                            <span className="font-[var(--font-kalam)] text-lg font-bold text-[var(--color-brand-blue)]">
                                Admin Panel
                            </span>
                            <button onClick={() => setMobileOpen(false)} aria-label="Tutup menu">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <NavLinks />
                        <div className="p-3 border-t border-[var(--color-line)]">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium font-[var(--font-inter)] text-[var(--color-danger-red)] hover:bg-[var(--color-danger-red)]/10 transition-colors"
                            >
                                <LogOut className="w-4 h-4" /> Keluar
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 bg-black/40" onClick={() => setMobileOpen(false)} />
                </div>
            )}

            {/* Desktop sidebar */}
            <aside className="hidden md:flex md:flex-col md:w-64 md:h-screen md:sticky md:top-0 bg-[var(--color-paper-bg)] border-r border-[var(--color-line)]">
                <div className="h-16 flex items-center px-5 border-b border-[var(--color-line)]">
                    <span className="font-[var(--font-kalam)] text-xl font-bold text-[var(--color-brand-blue)]">
                        Refa Learn
                    </span>
                </div>
                <NavLinks />
                <div className="p-3 border-t border-[var(--color-line)]">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium font-[var(--font-inter)] text-[var(--color-danger-red)] hover:bg-[var(--color-danger-red)]/10 transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> Keluar
                    </button>
                </div>
            </aside>
        </>
    );
}