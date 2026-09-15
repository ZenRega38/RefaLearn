"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Receipt, BookOpen } from "lucide-react";

const tabs = [
    { href: "/dashboard", label: "Sesi Saya", icon: CalendarCheck, exact: true },
    { href: "/dashboard/invoices", label: "Tagihan Saya", icon: Receipt },
    { href: "/dashboard/materials", label: "Materi Saya", icon: BookOpen },
];

export function DashboardTabs() {
    const pathname = usePathname();

    return (
        <div className="border-b border-[var(--color-line)] bg-[var(--color-paper-bg)] sticky top-16 md:top-20 z-30">
            <div className="container-main flex gap-1 overflow-x-auto">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const active = tab.exact ? pathname === tab.href : pathname?.startsWith(tab.href);
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium font-[var(--font-inter)] border-b-2 whitespace-nowrap transition-colors ${active
                                    ? "border-[var(--color-accent-coral)] text-[var(--color-brand-blue)]"
                                    : "border-transparent text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                                }`}
                        >
                            <Icon className="w-4 h-4" /> {tab.label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}