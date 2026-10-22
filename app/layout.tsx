import type { Metadata } from "next";
import { Inter, Kalam, Caveat } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/ui/SiteChrome";
import { siteUrl } from "@/lib/site";
import { ldJson, siteGraphLd } from "@/lib/seo";
import { getLang } from "@/lib/i18n-server";
import { LangProvider } from "@/components/i18n/LangProvider";

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
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Refa Learn — Bridging Borders, Embracing The World!",
    template: "%s | Refa Learn",
  },
  // Tab and home-screen icons come from app/favicon.ico, app/icon.png and
  // app/apple-icon.png (generated from public/RefaLearn-Logo.png).
  description:
    "Les privat Bahasa Inggris terbaik dengan sistem bayar setelah kelas. IELTS, TOEFL, dan persiapan ujian untuk siswa SMA hingga mahasiswa.",
  keywords: [
    "les bahasa inggris Tarakan",
    "les privat bahasa inggris",
    "kursus bahasa inggris Tarakan murah",
    "les private online",
    "les bahasa inggris berkualitas",
    "tutor bahasa inggris Tarakan",
    "IELTS preparation",
    "TOEFL preparation",
    "les online bahasa inggris",
    "bayar setelah kelas",
    "les bahasa inggris terjamin",
  ],
  authors: [{ name: "Refa Learn" }],
  // Google Search Console "HTML tag" verification: set GOOGLE_SITE_VERIFICATION
  // to the content="…" value Search Console shows.
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Refa Learn",
    title: "Refa Learn — Bridging Borders, Embracing The World!",
    description:
      "Les privat Bahasa Inggris terbaik dengan sistem bayar setelah kelas.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();
  return (
    <html
      lang={lang}
      className={`${inter.variable} ${kalam.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(siteGraphLd()) }} />
        <LangProvider initial={lang}>
          <SiteChrome>{children}</SiteChrome>
        </LangProvider>
      </body>
    </html>
  );
}
