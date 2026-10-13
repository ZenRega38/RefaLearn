"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Receipt, BookOpen, UserCircle } from "lucide-react";

const tabs = [
    { href: "/dashboard", label: "Sesi Saya", short: "Sesi", icon: CalendarCheck, exact: true },
    { href: "/dashboard/invoices", label: "Tagihan Saya", short: "Tagihan", icon: Receipt },
    { href: "/dashboard/materials", label: "Materi Saya", short: "Materi", icon: BookOpen },
    { href: "/dashboard/profile", label: "Profil", short: "Profil", icon: UserCircle },
];

export function DashboardTabs() {
    const pathname = usePathname();

    return (
        <div className="border-b border-[var(--color-line)] bg-[var(--color-paper-bg)] sticky top-16 md:top-20 z-30">
            {/* Phones: four equal tabs, icon over a short label, so every tab
                fits without scrolling. Wider screens: one row of full labels. */}
            <div className="container-main grid grid-cols-4 sm:flex sm:gap-1">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const active = tab.exact ? pathname === tab.href : pathname?.startsWith(tab.href);
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-1 sm:px-4 py-2 sm:py-3 text-[0.7rem] sm:text-sm font-medium font-[var(--font-inter)] border-b-2 whitespace-nowrap transition-colors ${active
                                    ? "border-[var(--color-accent-coral)] text-[var(--color-brand-blue)]"
                                    : "border-transparent text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                                }`}
                        >
                            <Icon className="w-5 h-5 sm:w-4 sm:h-4" />
                            <span className="sm:hidden">{tab.short}</span>
                            <span className="hidden sm:inline">{tab.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}