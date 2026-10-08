import { DAY_TYPE_LABELS, SESSION_PRICES, formatPrice, type DayType } from "@/lib/pricing";
import {
  CANCELLATION_FEE_AMOUNT,
  FREE_CANCELLATION_NOTICE_HOURS,
  INVOICE_DUE_DAYS,
  SESSION_MINUTES,
} from "@/lib/policy";
import { APP_TIMEZONE_LABEL } from "@/lib/time";

/**
 * Template for the Session Agreement (Perjanjian Layanan) shown in the
 * booking flow. Structured around the Indonesian rules that govern an
 * electronic, standard-form consumer contract made by a sole tutor in
 * Tarakan:
 *
 *  - KUHPerdata Pasal 1313, 1320, 1338 (sahnya perjanjian & itikad baik),
 *    Pasal 330 & 1330 (kecakapan — siswa di bawah umur diwakili orang
 *    tua/wali), Pasal 1243–1245 (wanprestasi & keadaan memaksa)
 *  - UU 11/2008 tentang ITE sebagaimana diubah terakhir dengan UU 1/2024:
 *    Pasal 5 (dokumen elektronik sebagai alat bukti), Pasal 11 (tanda
 *    tangan elektronik), Pasal 18 (kontrak elektronik mengikat)
 *  - PP 71/2019 tentang PSTE, Pasal 46–47 (syarat & isi minimum kontrak
 *    elektronik, bahasa Indonesia)
 *  - UU 8/1999 tentang Perlindungan Konsumen: Pasal 4 & 7 (hak/kewajiban),
 *    Pasal 18 (larangan klausula baku), Pasal 45 (BPSK / pengadilan)
 *  - UU 27/2022 tentang Pelindungan Data Pribadi: Pasal 20 (dasar
 *    pemrosesan), Pasal 25 (data anak), hak subjek data, Pasal 46
 *    (pemberitahuan kegagalan pelindungan 3×24 jam)
 *  - UU 28/2014 tentang Hak Cipta (materi belajar)
 *  - UU 24/2009 Pasal 31 (bahasa Indonesia dalam perjanjian)
 *  - UU 10/2020 tentang Bea Meterai (meterai bukan syarat sah)
 *  - UU 35/2014 tentang Perlindungan Anak (sesi untuk siswa di bawah umur)
 *  - Yurisdiksi: Pengadilan Negeri Tarakan, Kalimantan Utara; waktu WITA
 *
 * It is a drafting starting point, not legal advice — have an advokat or
 * notaris in Tarakan review it before relying on it.
 */

export type ContractTemplateParams = {
  /** Owner of the sole proprietorship, e.g. "Rega R. Azizan, S.T." */
  ownerName?: string;
  /** Business address in Tarakan */
  address?: string;
  email?: string;
  whatsapp?: string;
};

const placeholder = (value: string | undefined, label: string) =>
  value && value.trim() ? escape(value.trim()) : `[${label}]`;

function escape(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** True if the text still contains an unfilled [PLACEHOLDER]. */
export function hasPlaceholders(html: string): boolean {
  return /\[[A-Z][A-Z /]+\]/.test(html);
}

export function buildContractTemplate(params: ContractTemplateParams = {}): string {
  const owner = placeholder(params.ownerName, "NAMA LENGKAP PEMILIK USAHA");
  const address = placeholder(params.address, "ALAMAT USAHA DI TARAKAN");
  const email = placeholder(params.email, "EMAIL RESMI");
  const whatsapp = placeholder(params.whatsapp, "NOMOR WHATSAPP RESMI");

  const priceItems = (Object.keys(SESSION_PRICES) as DayType[])
    .map((d) => `<li>${DAY_TYPE_LABELS[d]}: <strong>${formatPrice(SESSION_PRICES[d])}</strong> per sesi</li>`)
    .join("");

  const fee = formatPrice(CANCELLATION_FEE_AMOUNT);
  const tz = APP_TIMEZONE_LABEL;

  return `
<h2>PERJANJIAN LAYANAN BIMBINGAN BELAJAR PRIVAT BAHASA INGGRIS</h2>
<p><strong>REFA LEARN — Tarakan, Kalimantan Utara</strong></p>

<p>Perjanjian ini dibuat dan disetujui secara elektronik melalui situs web Refa Learn pada tanggal dan jam (${tz}) yang tercatat secara otomatis di sistem pada saat persetujuan diberikan, oleh dan antara:</p>
<ol>
<li><strong>${owner}</strong>, pemilik dan pengelola usaha perorangan bimbingan belajar <strong>Refa Learn</strong>, berkedudukan di ${address}, Kota Tarakan, Provinsi Kalimantan Utara, email ${email}, WhatsApp ${whatsapp}; selanjutnya disebut <strong>"Refa Learn"</strong> atau <strong>"Pengajar"</strong>; dan</li>
<li><strong>Pemilik akun siswa</strong> yang nama, nomor telepon, dan alamat emailnya tercatat pada akun yang digunakan untuk menyetujui Perjanjian ini; selanjutnya disebut <strong>"Siswa"</strong>. Dalam hal Siswa belum dewasa menurut hukum, Siswa diwakili oleh <strong>orang tua atau walinya</strong> yang namanya diketik pada saat persetujuan, selanjutnya disebut <strong>"Orang Tua/Wali"</strong>.</li>
</ol>
<p>Refa Learn dan Siswa (bersama Orang Tua/Wali, bila ada) secara bersama-sama disebut <strong>"Para Pihak"</strong>.</p>

<h3>Dasar Hukum</h3>
<p>Perjanjian ini dibuat dengan memperhatikan:</p>
<ol>
<li>Kitab Undang-Undang Hukum Perdata, khususnya Pasal 1313, 1320, 1330, 1338, dan 1243–1245;</li>
<li>Undang-Undang Nomor 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik sebagaimana telah diubah terakhir dengan Undang-Undang Nomor 1 Tahun 2024, serta Peraturan Pemerintah Nomor 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik;</li>
<li>Undang-Undang Nomor 8 Tahun 1999 tentang Perlindungan Konsumen;</li>
<li>Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi;</li>
<li>Undang-Undang Nomor 28 Tahun 2014 tentang Hak Cipta;</li>
<li>Undang-Undang Nomor 23 Tahun 2002 tentang Perlindungan Anak sebagaimana telah diubah dengan Undang-Undang Nomor 35 Tahun 2014;</li>
<li>Undang-Undang Nomor 24 Tahun 2009 tentang Bendera, Bahasa, dan Lambang Negara, serta Lagu Kebangsaan; dan</li>
<li>Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional, yang menempatkan kursus dan bimbingan belajar sebagai pendidikan nonformal.</li>
</ol>

<h3>Pasal 1 — Definisi</h3>
<ol>
<li><strong>Sesi</strong> adalah satu pertemuan belajar privat satu-lawan-satu berdurasi ${SESSION_MINUTES} (${terbilang(SESSION_MINUTES)}) menit.</li>
<li><strong>Rangkaian Mingguan</strong> adalah beberapa Sesi pada hari dan jam yang sama selama beberapa minggu berturut-turut yang dipesan dalam satu kali pemesanan.</li>
<li><strong>Situs</strong> adalah situs web Refa Learn beserta dashboard akun Siswa.</li>
<li><strong>Tagihan Bulanan</strong> adalah tagihan atas seluruh Sesi berstatus "selesai" yang belum pernah ditagihkan, ditambah biaya pembatalan yang belum dibayar (bila ada).</li>
<li>Seluruh tanggal dan jam dalam Perjanjian ini dan di Situs menggunakan <strong>Waktu Indonesia Tengah (${tz})</strong>.</li>
</ol>

<h3>Pasal 2 — Ruang Lingkup Layanan</h3>
<ol>
<li>Refa Learn menyediakan bimbingan belajar privat Bahasa Inggris (antara lain persiapan IELTS, TOEFL, materi sekolah, perkuliahan, dan komunikasi umum) yang disesuaikan dengan kemampuan dan target Siswa.</li>
<li>Sesi dilaksanakan secara <strong>daring</strong> melalui aplikasi konferensi video (misalnya Zoom atau Google Meet) atau secara <strong>tatap muka</strong> di wilayah Kota Tarakan, sesuai kesepakatan Para Pihak untuk setiap Sesi. Tautan atau lokasi Sesi disampaikan melalui fitur chat di Situs atau WhatsApp resmi Refa Learn.</li>
<li>Layanan ini merupakan pendidikan nonformal. Refa Learn tidak menerbitkan ijazah dan tidak menyelenggarakan ujian resmi pihak ketiga.</li>
<li>Refa Learn berkewajiban memberikan layanan dengan sungguh-sungguh dan profesional, namun <strong>tidak menjanjikan atau menjamin</strong> skor ujian, kelulusan, atau penerimaan di lembaga mana pun, karena hasil tersebut juga bergantung pada usaha Siswa dan pihak lain.</li>
</ol>

<h3>Pasal 3 — Pemesanan dan Konfirmasi Jadwal</h3>
<ol>
<li>Siswa memesan Sesi atau Rangkaian Mingguan melalui Situs dengan memilih slot yang tersedia dan menyetujui Perjanjian ini.</li>
<li>Pemesanan berstatus <strong>"menunggu konfirmasi"</strong> sampai Refa Learn menerima atau menolaknya. Perjanjian atas suatu Sesi mulai mengikat Para Pihak untuk Sesi tersebut pada saat Refa Learn mengonfirmasinya.</li>
<li>Refa Learn dapat menolak permintaan karena alasan ketersediaan atau alasan wajar lainnya, dan akan memberitahukan penolakan tersebut kepada Siswa melalui Situs dan/atau email. Penolakan tidak menimbulkan biaya apa pun bagi Siswa.</li>
<li>Siswa yang datang terlambat tetap mengakhiri Sesi pada jam yang dijadwalkan. Apabila Pengajar yang terlambat, waktu yang hilang diganti pada Sesi tersebut atau Sesi berikutnya sesuai kesepakatan.</li>
</ol>

<h3>Pasal 4 — Biaya Layanan</h3>
<ol>
<li>Biaya per Sesi ditentukan berdasarkan hari pelaksanaan Sesi:
<ul>${priceItems}</ul>
</li>
<li>Biaya di atas sudah final. Tidak ada biaya pendaftaran, uang muka, atau biaya tersembunyi lain selain yang diatur secara tegas dalam Perjanjian ini.</li>
<li>Perubahan tarif di kemudian hari <strong>tidak berlaku</strong> bagi Sesi yang telah dikonfirmasi sebelum perubahan tersebut diumumkan.</li>
</ol>

<h3>Pasal 5 — Pembayaran Setelah Kelas</h3>
<ol>
<li>Siswa membayar <strong>setelah</strong> Sesi berlangsung. Pada awal setiap bulan, Refa Learn menerbitkan Tagihan Bulanan yang memuat rincian setiap Sesi (tanggal, jenis hari, dan biaya) yang berstatus "selesai" pada bulan sebelumnya atau sebelumnya yang belum pernah ditagihkan.</li>
<li>Hanya Sesi berstatus <strong>"selesai"</strong> yang ditagihkan. Sesi yang dibatalkan, ditolak, atau dicatat "tidak hadir" tidak ditagihkan, kecuali biaya pembatalan sebagaimana diatur dalam Pasal 7.</li>
<li>Tagihan Bulanan jatuh tempo <strong>${INVOICE_DUE_DAYS} (${terbilang(INVOICE_DUE_DAYS)}) hari kalender</strong> sejak diterbitkan.</li>
<li>Pembayaran dilakukan melalui transfer bank atau dompet elektronik <strong>hanya ke rekening yang tercantum di dashboard Situs</strong>, kemudian Siswa mengunggah bukti pembayaran melalui Situs. Refa Learn tidak pernah meminta pembayaran ke rekening lain; pembayaran ke rekening selain yang tercantum menjadi risiko Siswa.</li>
<li>Pembayaran dianggap lunas setelah dikonfirmasi oleh Refa Learn di Situs. Apabila bukti pembayaran tidak sesuai, Refa Learn akan memberitahukan alasannya dan Siswa dapat mengunggah ulang bukti yang benar.</li>
</ol>

<h3>Pasal 6 — Pembayaran di Muka (Opsional)</h3>
<ol>
<li>Siswa dapat memilih membayar suatu pemesanan di muka. Pilihan ini bersifat sukarela.</li>
<li>Apabila Siswa memiliki biaya pembatalan yang belum dibayar dan memilih pembayaran di muka, biaya pembatalan tersebut dihapuskan setelah pembayaran di muka dikonfirmasi.</li>
<li>Sesi yang telah dibayar di muka tidak ditagihkan kembali dalam Tagihan Bulanan. Apabila Sesi yang telah dibayar di muka tidak terlaksana karena dibatalkan oleh Refa Learn atau keadaan memaksa, Siswa berhak memilih pengembalian dana penuh untuk Sesi tersebut atau penjadwalan ulang tanpa biaya.</li>
</ol>

<h3>Pasal 7 — Pembatalan dan Penjadwalan Ulang oleh Siswa</h3>
<ol>
<li>Siswa dapat membatalkan permintaan yang <strong>belum dikonfirmasi</strong> kapan saja tanpa biaya.</li>
<li>Siswa dapat membatalkan Sesi yang <strong>sudah dikonfirmasi</strong> tanpa biaya apabila pembatalan dilakukan melalui Situs paling lambat <strong>${FREE_CANCELLATION_NOTICE_HOURS} (${terbilang(FREE_CANCELLATION_NOTICE_HOURS)}) jam</strong> sebelum Sesi dimulai.</li>
<li>Pembatalan Sesi yang sudah dikonfirmasi yang dilakukan kurang dari ${FREE_CANCELLATION_NOTICE_HOURS} jam sebelum Sesi dimulai dikenakan biaya pembatalan sebesar <strong>${fee} untuk satu kali tindakan pembatalan</strong>, berapa pun jumlah Sesi yang dibatalkan sekaligus dalam tindakan tersebut. Biaya ini merupakan ganti rugi atas waktu yang telah dialokasikan Pengajar dan ditagihkan pada Tagihan Bulanan berikutnya.</li>
<li>Sebagai alternatif pembatalan, Siswa dapat mengajukan <strong>penjadwalan ulang</strong> (reschedule) melalui Situs sebelum Sesi dimulai, tanpa biaya, sepanjang slot pengganti tersedia dan disetujui Refa Learn. Apabila tidak disetujui, jadwal semula tetap berlaku.</li>
<li>Pengajar menunggu paling lama 15 (lima belas) menit sejak jam mulai. Siswa yang tidak hadir tanpa pemberitahuan dicatat "tidak hadir"; Sesi tersebut tidak ditagihkan, namun ketidakhadiran tanpa pemberitahuan yang berulang dapat menjadi alasan wajar bagi Refa Learn untuk menolak pemesanan berikutnya.</li>
<li>Sesi yang telah dimulai atau telah lewat tidak dapat dibatalkan atau dijadwalkan ulang.</li>
</ol>

<h3>Pasal 8 — Pembatalan oleh Refa Learn</h3>
<ol>
<li>Refa Learn dapat membatalkan atau memindahkan Sesi karena alasan yang wajar (misalnya sakit atau keperluan mendesak) dengan pemberitahuan sesegera mungkin kepada Siswa.</li>
<li>Pembatalan oleh Refa Learn tidak menimbulkan biaya apa pun bagi Siswa. Refa Learn akan menawarkan jadwal pengganti, dan untuk Sesi yang telah dibayar di muka berlaku Pasal 6 ayat (3).</li>
</ol>

<h3>Pasal 9 — Keterlambatan Pembayaran</h3>
<ol>
<li>Tagihan Bulanan yang belum dibayar setelah jatuh tempo berstatus "terlambat", dan Siswa akan menerima pemberitahuan melalui Situs dan/atau email.</li>
<li>Selama terdapat tagihan yang melewati jatuh tempo, <strong>pemesanan Sesi baru dijeda</strong> sampai tagihan tersebut dikonfirmasi lunas. Sesi yang telah dikonfirmasi sebelumnya tetap berjalan.</li>
<li>Refa Learn <strong>tidak mengenakan bunga atau denda keterlambatan</strong> di luar yang diatur dalam Perjanjian ini. Tagihan yang tidak dibayar tetap menjadi utang Siswa yang dapat ditagih sesuai hukum yang berlaku.</li>
</ol>

<h3>Pasal 10 — Materi Belajar dan Hak Cipta</h3>
<ol>
<li>Seluruh modul, lembar kerja, rekaman, dan materi lain yang diberikan atau dijual Refa Learn dilindungi oleh Undang-Undang Nomor 28 Tahun 2014 tentang Hak Cipta.</li>
<li>Siswa memperoleh hak pakai pribadi yang tidak dapat dialihkan. Siswa dilarang memperbanyak, menjual, membagikan, atau mengunggah materi tersebut ke pihak lain tanpa izin tertulis Refa Learn.</li>
<li>Sesi tidak direkam kecuali dengan persetujuan Para Pihak sebelum Sesi dimulai. Rekaman yang disetujui hanya untuk keperluan belajar Siswa.</li>
</ol>

<h3>Pasal 11 — Pembelian Materi Digital</h3>
<ol>
<li>Harga setiap materi digital tercantum pada halaman materi di Situs. Akses unduhan diberikan setelah pembayaran dikonfirmasi dan berlaku <strong>tanpa batas waktu</strong> melalui dashboard Siswa, termasuk apabila materi tersebut kemudian tidak lagi dijual.</li>
<li>Apabila file materi rusak, tidak dapat dibuka, atau tidak sesuai dengan deskripsinya, Siswa dapat melaporkannya melalui chat Situs. Refa Learn wajib memperbaiki atau mengganti file tersebut dalam 7 (tujuh) hari kerja; apabila tidak dapat diperbaiki, Refa Learn mengembalikan dana Siswa secara penuh.</li>
</ol>

<h3>Pasal 12 — Pelindungan Data Pribadi</h3>
<ol>
<li>Refa Learn memproses data pribadi Siswa sesuai Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi, yaitu: nama, nomor telepon/WhatsApp, alamat email, riwayat dan catatan Sesi, isi chat, tagihan, bukti pembayaran, serta catatan teknis persetujuan (alamat IP, jenis peramban, dan waktu persetujuan).</li>
<li>Data tersebut diproses hanya untuk melaksanakan Perjanjian ini (penjadwalan, pembelajaran, penagihan, komunikasi, dan pembuktian persetujuan) dan untuk memenuhi kewajiban hukum, dengan dasar pelaksanaan perjanjian dan persetujuan Siswa.</li>
<li>Data pribadi Siswa yang merupakan <strong>anak</strong> diproses dengan persetujuan Orang Tua/Wali.</li>
<li>Bukti pembayaran dan dokumen lain disimpan pada penyimpanan yang tidak dapat diakses publik dan hanya dapat dilihat oleh Siswa yang bersangkutan dan Refa Learn. Refa Learn tidak menjual atau membagikan data pribadi Siswa kepada pihak lain, kecuali kepada penyedia layanan teknologi yang diperlukan untuk menjalankan Situs (penyimpanan data, email, konferensi video) atau apabila diwajibkan oleh hukum.</li>
<li>Data disimpan selama akun aktif dan selama diperlukan untuk memenuhi kewajiban hukum, termasuk pembukuan dan pembuktian.</li>
<li>Siswa berhak meminta akses, salinan, pembaruan, perbaikan, penghapusan data, dan menarik persetujuannya dengan menghubungi ${email}. Penarikan persetujuan tidak memengaruhi pemrosesan yang telah dilakukan sebelumnya maupun kewajiban yang belum diselesaikan.</li>
<li>Apabila terjadi kegagalan pelindungan data pribadi, Refa Learn akan memberitahukannya kepada Siswa paling lambat 3 x 24 (tiga kali dua puluh empat) jam.</li>
</ol>

<h3>Pasal 13 — Tata Tertib dan Perlindungan Anak</h3>
<ol>
<li>Para Pihak wajib bersikap sopan dan saling menghormati, serta tidak melakukan perundungan, pelecehan, atau diskriminasi dalam bentuk apa pun.</li>
<li>Untuk Siswa anak, Orang Tua/Wali berhak mendampingi atau memantau Sesi. Sesi tatap muka dengan Siswa anak dilaksanakan di tempat yang terbuka atau di rumah Siswa dengan sepengetahuan Orang Tua/Wali.</li>
<li>Komunikasi di luar Sesi dilakukan melalui chat Situs atau kanal resmi Refa Learn.</li>
</ol>

<h3>Pasal 14 — Keadaan Memaksa</h3>
<p>Para Pihak tidak bertanggung jawab atas tidak terlaksananya Sesi yang disebabkan oleh keadaan di luar kendali yang wajar, antara lain bencana alam, banjir, pemadaman listrik atau gangguan internet yang meluas, wabah, sakit, atau kebijakan pemerintah. Dalam keadaan tersebut, Sesi dijadwalkan ulang tanpa biaya pembatalan.</p>

<h3>Pasal 15 — Berakhirnya Perjanjian</h3>
<ol>
<li>Siswa dapat berhenti kapan saja dengan membatalkan Sesi yang akan datang sesuai Pasal 7.</li>
<li>Refa Learn dapat mengakhiri layanan apabila Siswa melanggar Pasal 10 atau Pasal 13 secara serius, dengan pemberitahuan tertulis melalui Situs atau email.</li>
<li>Berakhirnya Perjanjian tidak menghapus kewajiban pembayaran atas Sesi yang telah selesai dan biaya yang telah timbul sebelumnya.</li>
</ol>

<h3>Pasal 16 — Hukum yang Berlaku dan Penyelesaian Sengketa</h3>
<ol>
<li>Perjanjian ini tunduk pada dan ditafsirkan berdasarkan hukum Negara Republik Indonesia.</li>
<li>Setiap perselisihan diselesaikan terlebih dahulu secara musyawarah untuk mufakat dalam waktu 30 (tiga puluh) hari sejak salah satu pihak memberitahukan perselisihan tersebut secara tertulis.</li>
<li>Apabila musyawarah tidak berhasil, Para Pihak sepakat menyelesaikannya melalui <strong>Pengadilan Negeri Tarakan</strong>, tanpa mengurangi hak Siswa sebagai konsumen untuk menempuh penyelesaian melalui Badan Penyelesaian Sengketa Konsumen (BPSK) yang berwenang sebagaimana diatur dalam Undang-Undang Nomor 8 Tahun 1999 tentang Perlindungan Konsumen.</li>
</ol>

<h3>Pasal 17 — Perubahan Perjanjian</h3>
<ol>
<li>Refa Learn dapat menerbitkan versi baru Perjanjian ini. Versi baru hanya berlaku untuk pemesanan yang dilakukan <strong>setelah</strong> Siswa membaca dan menyetujui versi baru tersebut.</li>
<li>Sesi yang dipesan berdasarkan versi sebelumnya tetap tunduk pada versi yang disetujui pada saat pemesanan.</li>
</ol>

<h3>Pasal 18 — Ketentuan Penutup</h3>
<ol>
<li>Perjanjian ini dibuat dalam Bahasa Indonesia. Apabila terdapat terjemahan, versi Bahasa Indonesia yang berlaku.</li>
<li>Persetujuan yang diberikan dengan mencentang pernyataan persetujuan dan mengetikkan nama lengkap di Situs merupakan <strong>tanda tangan elektronik</strong> yang sah dan mengikat. Catatan elektronik atas persetujuan tersebut (versi Perjanjian, nama, waktu, alamat IP, dan perangkat) merupakan alat bukti hukum yang sah.</li>
<li>Keabsahan Perjanjian ini tidak bergantung pada pembubuhan meterai. Apabila Perjanjian ini akan digunakan sebagai alat bukti di pengadilan, pemeteraian dapat dilakukan kemudian sesuai Undang-Undang Nomor 10 Tahun 2020 tentang Bea Meterai.</li>
<li>Apabila suatu ketentuan dalam Perjanjian ini dinyatakan tidak sah atau tidak dapat dilaksanakan, ketentuan lainnya tetap berlaku.</li>
<li>Salinan Perjanjian versi yang disetujui Siswa dapat dilihat dan diunduh kapan saja melalui Situs.</li>
</ol>

<h3>Pernyataan Persetujuan</h3>
<p>Dengan mencentang kotak persetujuan dan mengetikkan nama lengkap, penanda tangan menyatakan bahwa:</p>
<ol>
<li>ia telah membaca, memahami, dan menyetujui seluruh isi Perjanjian ini tanpa paksaan;</li>
<li>ia <strong>telah berusia 21 (dua puluh satu) tahun atau sudah menikah</strong> sehingga cakap bertindak menurut hukum (Pasal 330 dan 1330 KUHPerdata), <strong>atau</strong> ia adalah Orang Tua/Wali sah dari Siswa yang belum dewasa dan menyetujui Perjanjian ini atas nama serta untuk kepentingan Siswa, termasuk persetujuan pemrosesan data pribadi anak; dan</li>
<li>data yang diberikan kepada Refa Learn adalah benar.</li>
</ol>
`.trim();
}

// Small Indonesian number-to-words for the counts used above.
function terbilang(n: number): string {
  const words: Record<number, string> = {
    7: "tujuh",
    12: "dua belas",
    14: "empat belas",
    24: "dua puluh empat",
    30: "tiga puluh",
    60: "enam puluh",
    90: "sembilan puluh",
    120: "seratus dua puluh",
  };
  return words[n] ?? String(n);
}
