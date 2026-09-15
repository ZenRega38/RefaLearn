import type { Metadata } from "next";
import { Inter, Kalam, Caveat } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/ui/SiteChrome";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-kalam",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Refa Learn — Bridging Borders, Embracing The World!",
    template: "%s | Refa Learn",
  },
  description:
    "Les privat Bahasa Inggris terbaik dengan sistem bayar setelah kelas. IELTS, TOEFL, dan persiapan ujian untuk siswa SMA hingga mahasiswa.",
  keywords: [
    "les privat bahasa inggris",
    "tutor bahasa inggris",
    "IELTS preparation",
    "TOEFL preparation",
    "les online",
    "bayar setelah kelas",
  ],
  authors: [{ name: "Refa Learn" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Refa Learn",
    title: "Refa Learn — Bridging Borders, Embracing The World!",
    description:
      "Les privat Bahasa Inggris terbaik dengan sistem bayar setelah kelas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${kalam.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
