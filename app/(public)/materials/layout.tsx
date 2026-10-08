import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Materi & Modul Belajar",
  description: "E-book, modul, dan latihan soal Bahasa Inggris — IELTS, TOEFL, SMA, dan umum — dari Refa Learn.",
  alternates: { canonical: "/materials" },
};

export default function MaterialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
