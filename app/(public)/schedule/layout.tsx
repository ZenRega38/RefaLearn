import type { Metadata } from "next";
import { getTr } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const tr = await getTr();
  return {
    title: tr("Jadwal & Booking Kelas", "Schedule & Class Booking"),
    description: "Pilih jadwal les privat Bahasa Inggris 1-on-1 di Tarakan (online atau tatap muka). Bayar setelah kelas selesai.",
    alternates: { canonical: "/schedule" },
  };
}

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
