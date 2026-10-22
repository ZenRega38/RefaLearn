import type { Metadata } from "next";
import { getTr } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const tr = await getTr();
  return {
    title: tr("Kursus & Materi Belajar", "Courses & Learning Materials"),
    description: "E-book, modul, dan latihan soal Bahasa Inggris — IELTS, TOEFL, SMA, dan umum — dari Refa Learn.",
    alternates: { canonical: "/materials" },
  };
}

export default function MaterialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
