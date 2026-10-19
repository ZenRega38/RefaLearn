import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule & Class Booking",
  description: "Pilih jadwal les privat Bahasa Inggris 1-on-1 di Tarakan (online atau tatap muka). Bayar setelah kelas selesai.",
  alternates: { canonical: "/schedule" },
};

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
