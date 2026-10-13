"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
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
    Wallet,
    Handshake,
    Gift,
    CalendarPlus,
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

// Desktop sidebar collapsed to icons only; remembered per browser.
const COLLAPSED_KEY = "refalearn-admin-sidebar-collapsed";

const navItems = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
    { href: "/admin/availability", label: "Ketersediaan", icon: CalendarClock },
    { href: "/admin/sessions", label: "Sesi & Permintaan", icon: Video, exact: true },
    { href: "/admin/sessions/assign", label: "Assign Jadwal", icon: CalendarPlus },
    { href: "/admin/invoices", label: "Tagihan", icon: Receipt },
    { href: "/admin/materials", label: "Materi", icon: BookOpen },
    { href: "/admin/material-orders", label: "Pesanan Materi", icon: ShoppingBag },
    { href: "/admin/material-access", label: "Akses Materi", icon: Gift },
    { href: "/admin/prepayments", label: "Bayar di Muka", icon: Wallet },
    { href: "/admin/news", label: "Stories", icon: Newspaper },
    { href: "/admin/alumni", label: "Alumni", icon: GraduationCap },
    { href: "/admin/partners", label: "Partner", icon: Handshake },
    { href: "/admin/chat", label: "Chat", icon: MessageCircle },
    { href: "/admin/contracts", label: "Kontrak", icon: FileSignature },
    { href: "/admin/settings", label: "Pengaturan", icon: Settings },
];

// Declared at module level (not inside AdminSidebar) so React doesn't treat
// it as a brand-new component type on every render.
function NavLinks({ pathname, onNavigate, collapsed = false }: { pathname: string | null; onNavigate: () => void; collapsed?: boolean }) {
    const isActive = (href: string, exact?: boolean) =>
        exact ? pathname === href : pathname === href || pathname?.startsWith(href + "/");

    return (
        <nav className="flex-1 overflow-y-auto py-4">
            <ul className={`space-y-1 ${collapsed ? "px-2" : "px-3"}`}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href, item.exact);
                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                onClick={onNavigate}
                                title={collapsed ? item.label : undefined}
                                aria-label={collapsed ? item.label : undefined}
                                className={`flex items-center gap-3 py-2.5 rounded-lg text-sm font-medium font-[var(--font-inter)] transition-colors ${collapsed ? "justify-center px-0" : "px-3"} ${active
                                    ? "bg-[var(--color-brand-blue)] text-white"
                                    : "text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-bg-alt)] hover:text-[var(--color-ink)]"
                                    }`}
                            >
                                <Icon className={`shrink-0 ${collapsed ? "w-5 h-5" : "w-4 h-4"}`} />
                                {!collapsed && item.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [supabase] = useState(() => createClient());
    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    // Read the saved choice after mount (localStorage isn't available while
    // rendering on the server).
    useEffect(() => {
        try {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- restore a saved UI preference
            if (window.localStorage.getItem(COLLAPSED_KEY) === "1") setCollapsed(true);
        } catch {
            /* storage blocked: keep the default */
        }
    }, []);

    const toggleCollapsed = () => {
        setCollapsed((c) => {
            try {
                window.localStorage.setItem(COLLAPSED_KEY, c ? "0" : "1");
            } catch {
                /* storage blocked: the choice lasts until reload */
            }
            return !c;
        });
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    return (
        <>
            {/* Mobile top bar — admin pages hide the public Navbar (see
          SiteChrome), so this is the only header on small screens. */}
            <div className="md:hidden sticky top-0 z-40 flex items-center justify-between h-14 px-4 bg-[var(--color-brand-blue)] text-white">
                <span className="flex items-center gap-2 font-[var(--font-kalam)] text-lg font-bold">
                    <Image src="/RefaLearn-Logo.png" alt="" width={28} height={28} className="rounded-md" />
                    Refa Learn Admin
                </span>
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
                        <NavLinks pathname={pathname} onNavigate={() => setMobileOpen(false)} />
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

            {/* Desktop sidebar — collapses to an icon rail */}
            <aside
                className={`hidden md:flex md:flex-col md:h-screen md:sticky md:top-0 shrink-0 bg-[var(--color-paper-bg)] border-r border-[var(--color-line)] transition-[width] duration-200 ${collapsed ? "md:w-[72px]" : "md:w-64"}`}
            >
                <div className={`h-16 flex items-center border-b border-[var(--color-line)] ${collapsed ? "justify-center px-2" : "gap-2 px-5"}`}>
                    {!collapsed && (
                        <>
                            <Image src="/RefaLearn-Logo.png" alt="" width={32} height={32} className="rounded-md" />
                            <span className="font-[var(--font-kalam)] text-xl font-bold text-[var(--color-brand-blue)] flex-1 truncate">
                                Refa Learn
                            </span>
                        </>
                    )}
                    <button
                        type="button"
                        onClick={toggleCollapsed}
                        aria-expanded={!collapsed}
                        aria-label={collapsed ? "Buka sidebar" : "Ciutkan sidebar"}
                        title={collapsed ? "Buka sidebar" : "Ciutkan sidebar"}
                        className="p-2 rounded-lg text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-bg-alt)] hover:text-[var(--color-brand-blue)] transition-colors"
                    >
                        {collapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
                    </button>
                </div>
                <NavLinks pathname={pathname} onNavigate={() => setMobileOpen(false)} collapsed={collapsed} />
                <div className={`border-t border-[var(--color-line)] ${collapsed ? "p-2" : "p-3"}`}>
                    <button
                        onClick={handleLogout}
                        title={collapsed ? "Keluar" : undefined}
                        aria-label={collapsed ? "Keluar" : undefined}
                        className={`flex items-center gap-3 w-full py-2.5 rounded-lg text-sm font-medium font-[var(--font-inter)] text-[var(--color-danger-red)] hover:bg-[var(--color-danger-red)]/10 transition-colors ${collapsed ? "justify-center px-0" : "px-3"}`}
                    >
                        <LogOut className={collapsed ? "w-5 h-5" : "w-4 h-4"} /> {!collapsed && "Keluar"}
                    </button>
                </div>
            </aside>
        </>
    );
}
