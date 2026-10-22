import type { Metadata } from "next";
import { createPublicClient } from "@/lib/supabase/public";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { SketchBox } from "@/components/sketch/SketchBox";
import { Card } from "@/components/ui/Card";
import { DEFAULT_CONTACT } from "@/lib/contact";
import { getLang } from "@/lib/i18n-server";
import { translator } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const tr = translator(await getLang());
  return {
    title: tr("Kebijakan Privasi", "Privacy Policy"),
    description: "Bagaimana Refa Learn mengumpulkan, menggunakan, dan melindungi data pribadi sesuai UU No. 27 Tahun 2022.",
    alternates: { canonical: "/privacy" },
  };
}

// Mirrors Pasal 12 of the Session Agreement (lib/contract-template.ts) and
// UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.
export default async function PrivacyPage() {
  const supabase = createPublicClient();
  const { data } = await supabase.from("site_settings").select("value").eq("key", "contact_email").maybeSingle();
  const email = (data?.value?.text as string | undefined)?.trim() || DEFAULT_CONTACT.email;
  const lang = await getLang();
  const tr = translator(lang);

  return (
    <PaperBackground>
      <section className="pt-32 pb-20">
        <div className="container-main max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl mb-10 text-center">
            {tr("Kebijakan", "Privacy")} <SketchBox color="var(--color-accent-coral)">{tr("Privasi", "Policy")}</SketchBox>
          </h1>
          {/* Written to Indonesia's data protection law: the Indonesian text prevails. */}
          {lang === "en" && (
            <p className="text-center text-sm text-[var(--color-ink-soft)] font-[var(--font-inter)] -mt-6 mb-10">
              This is an English translation for your convenience. If the two versions differ, the Indonesian version prevails.
            </p>
          )}
          <Card variant="sketch" className="p-6 md:p-10">
            {lang === "en" ? (
            <div className="prose-content text-sm font-[var(--font-inter)]">
              <p>
                Refa Learn respects your privacy and processes personal data in line with Law No. 27 of 2022 on Personal Data
                Protection (UU PDP). This page explains what data we collect, why, and what your rights are.
              </p>

              <h3>1. Data We Collect</h3>
              <ul>
                <li>Account data: full name, email address and phone/WhatsApp number.</li>
                <li>Service data: session schedules and history, study notes, course orders and chats with your tutor.</li>
                <li>Payment data: invoices and the transfer proofs you upload. We never store your PIN, password or bank card details.</li>
                <li>Agreement records: the name you typed, the time, your IP address and your device/browser type.</li>
              </ul>

              <h3>2. Purpose and Legal Basis</h3>
              <p>
                Data is processed to schedule and run sessions, issue invoices and verify payments, give access to the courses you
                buy, communicate with you, and prove that you accepted the agreement. The legal bases are performing our agreement
                with you, your consent, and meeting our legal obligations.
              </p>

              <h3>3. Children&apos;s Data</h3>
              <p>
                For students who are children, personal data is processed with the consent of a parent or guardian. We recommend
                that accounts for minors are created by or together with a parent/guardian.
              </p>

              <h3>4. Storage and Security</h3>
              <p>
                Data is stored with cloud database and storage providers. Payment proofs, course files and chat attachments are kept
                in private storage and can only be opened through temporary links by their owner and Refa Learn. Access to data is
                limited per account.
              </p>

              <h3>5. Sharing Data</h3>
              <p>
                We do not sell your personal data. Data is only shared with the service providers needed to run the site (hosting,
                database, email delivery, video conferencing) or when the law requires it.
              </p>

              <h3>6. Retention</h3>
              <p>
                Data is kept while your account is active and for as long as needed to meet legal obligations, including bookkeeping
                and proof of transactions.
              </p>

              <h3>7. Your Rights</h3>
              <p>
                You have the right to information about how your data is processed, to access it and request a copy, to update or
                correct it, to ask for it to be deleted, and to withdraw your consent. You can change some data yourself in your
                Profile; for anything else, contact <a href={`mailto:${email}`}>{email}</a>.
              </p>

              <h3>8. Incident Notification</h3>
              <p>
                If personal data protection fails, we will notify you within 3 x 24 hours of becoming aware of it.
              </p>

              <h3>9. Changes to This Policy</h3>
              <p>
                This policy may be updated from time to time. Important changes will be announced on the site or by email.
              </p>
            </div>
            ) : (
            <div className="prose-content text-sm font-[var(--font-inter)]">
              <p>
                Refa Learn menghormati privasi Anda dan memproses data pribadi sesuai Undang-Undang Nomor 27 Tahun 2022
                tentang Pelindungan Data Pribadi (UU PDP). Halaman ini menjelaskan data apa yang kami kumpulkan, untuk apa,
                dan apa hak Anda.
              </p>

              <h3>1. Data yang Kami Kumpulkan</h3>
              <ul>
                <li>Data akun: nama lengkap, alamat email, dan nomor telepon/WhatsApp.</li>
                <li>Data layanan: jadwal dan riwayat sesi, catatan belajar, pesanan materi, dan isi chat dengan pengajar.</li>
                <li>Data pembayaran: tagihan dan bukti transfer yang Anda unggah. Kami tidak menyimpan PIN, kata sandi, atau data kartu bank Anda.</li>
                <li>Catatan persetujuan perjanjian: nama yang diketik, waktu, alamat IP, dan jenis perangkat/peramban.</li>
              </ul>

              <h3>2. Tujuan dan Dasar Pemrosesan</h3>
              <p>
                Data diproses untuk menjadwalkan dan melaksanakan sesi, menerbitkan tagihan dan memverifikasi pembayaran,
                memberikan akses materi yang dibeli, berkomunikasi dengan Anda, serta membuktikan persetujuan perjanjian.
                Dasar pemrosesannya adalah pelaksanaan perjanjian dengan Anda, persetujuan Anda, dan pemenuhan kewajiban hukum.
              </p>

              <h3>3. Data Anak</h3>
              <p>
                Untuk siswa yang masih anak-anak, data pribadi diproses dengan persetujuan orang tua atau wali. Kami menyarankan
                akun siswa di bawah umur dibuat oleh atau bersama orang tua/wali.
              </p>

              <h3>4. Penyimpanan dan Keamanan</h3>
              <p>
                Data disimpan pada penyedia layanan basis data dan penyimpanan berbasis cloud. Bukti pembayaran, file materi, dan
                lampiran chat disimpan pada penyimpanan privat dan hanya dapat dibuka melalui tautan sementara oleh pemiliknya dan
                Refa Learn. Akses data dibatasi per akun.
              </p>

              <h3>5. Berbagi Data</h3>
              <p>
                Kami tidak menjual data pribadi Anda. Data hanya dibagikan kepada penyedia layanan yang diperlukan untuk menjalankan
                situs (hosting, basis data, pengiriman email, konferensi video) atau apabila diwajibkan oleh hukum.
              </p>

              <h3>6. Masa Simpan</h3>
              <p>
                Data disimpan selama akun Anda aktif dan selama diperlukan untuk memenuhi kewajiban hukum, termasuk pembukuan dan
                pembuktian transaksi.
              </p>

              <h3>7. Hak Anda</h3>
              <p>
                Anda berhak memperoleh informasi tentang pemrosesan data Anda, mengakses dan meminta salinan, memperbarui atau
                memperbaiki, meminta penghapusan, serta menarik persetujuan. Sebagian data dapat Anda ubah sendiri di menu Profil;
                untuk permintaan lain hubungi <a href={`mailto:${email}`}>{email}</a>.
              </p>

              <h3>8. Pemberitahuan Insiden</h3>
              <p>
                Jika terjadi kegagalan pelindungan data pribadi, kami akan memberitahukannya kepada Anda paling lambat 3 x 24 jam
                sejak diketahui.
              </p>

              <h3>9. Perubahan Kebijakan</h3>
              <p>
                Kebijakan ini dapat diperbarui sewaktu-waktu. Perubahan penting akan diberitahukan melalui situs atau email.
              </p>
            </div>
            )}
          </Card>
        </div>
      </section>
    </PaperBackground>
  );
}
