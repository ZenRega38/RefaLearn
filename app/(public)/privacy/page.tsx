import type { Metadata } from "next";
import { createPublicClient } from "@/lib/supabase/public";
import { PaperBackground } from "@/components/sketch/PaperBackground";
import { SketchBox } from "@/components/sketch/SketchBox";
import { Card } from "@/components/ui/Card";
import { DEFAULT_CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Bagaimana Refa Learn mengumpulkan, menggunakan, dan melindungi data pribadi sesuai UU No. 27 Tahun 2022.",
  alternates: { canonical: "/privacy" },
};

export const revalidate = 300;

// Mirrors Pasal 12 of the Session Agreement (lib/contract-template.ts) and
// UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.
export default async function PrivacyPage() {
  const supabase = createPublicClient();
  const { data } = await supabase.from("site_settings").select("value").eq("key", "contact_email").maybeSingle();
  const email = (data?.value?.text as string | undefined)?.trim() || DEFAULT_CONTACT.email;

  return (
    <PaperBackground>
      <section className="pt-32 pb-20">
        <div className="container-main max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl mb-10 text-center">
            Kebijakan <SketchBox color="var(--color-accent-coral)">Privasi</SketchBox>
          </h1>
          <Card variant="sketch" className="p-6 md:p-10">
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
          </Card>
        </div>
      </section>
    </PaperBackground>
  );
}
