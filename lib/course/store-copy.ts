// Default store title and "about" (description HTML) for every interactive
// course. Client-safe plain data: the admin material form fills these in
// when a course is picked, and the admin can still edit both before saving.
// Numbers come from the course content (chapters, lessons, questions).

import type { CourseSlug } from "@/lib/course/registry";

export type StoreCopy = { title: string; description: string };

const about = (intro: string, points: string[], outro?: string) =>
  `<p>${intro}</p><ul>${points.map((p) => `<li>${p}</li>`).join("")}</ul>${outro ? `<p>${outro}</p>` : ""}`;

const SD_OUTRO = "Cocok untuk belajar mandiri di rumah maupun pendamping pelajaran di sekolah. Setiap soal bisa dibacakan, jadi anak bisa belajar sambil mendengar.";
const SCHOOL_OUTRO = "Mengikuti Kurikulum Merdeka, cocok untuk belajar mandiri, persiapan ulangan, maupun pendamping pelajaran di sekolah.";

export const STORE_COPY: Record<CourseSlug, StoreCopy> = {
  "toefl-itp": {
    title: "TOEFL ITP Mastery",
    description: about(
      "Persiapan TOEFL ITP dari nol sampai skor tinggi dengan format soal yang sama seperti ujian aslinya.",
      [
        "3 level (Foundations, Intermediate, Advanced) dengan 30 materi interaktif",
        "Listening, Structure & Written Expression, dan Reading lengkap dengan strategi dan jebakan soal",
        "230+ soal latihan dengan pembahasan, kuis di setiap level",
        "Pretest dan Full Tryout bertimer dengan estimasi skor 310–677",
      ],
      "Kerjakan pretest dulu untuk tahu posisimu, lalu ukur kemajuan lewat tryout penuh."
    ),
  },
  "english-sd-1": {
    title: "English Grade 1 (SD) | Kurikulum Merdeka",
    description: about(
      "Kenalan pertama dengan bahasa Inggris lewat gambar, suara, lagu, dan permainan (Fase A).",
      ["6 bab: Hello!, My Body, Colors and Shapes, Numbers and Toys, In My Classroom, Fruit I Like", "18 materi bergambar dengan audio pengucapan", "190+ soal seru: pilih gambar, pasangkan, dan susun kata", "Kuis setiap bab dan Live Quiz bareng di kelas"],
      SD_OUTRO
    ),
  },
  "english-sd-2": {
    title: "English Grade 2 (SD) | Kurikulum Merdeka",
    description: about(
      "Bercerita tentang rumah, kegiatan sehari-hari, pakaian, cuaca, dan perasaan dalam bahasa Inggris (Fase A).",
      ["6 bab: My Home, My Day, My Clothes, The Weather, How Do You Feel?, Where Is It?", "18 materi bergambar dengan audio pengucapan", "190+ soal interaktif dengan pembahasan", "Kuis setiap bab dan Live Quiz bareng di kelas"],
      SD_OUTRO
    ),
  },
  "english-sd-3": {
    title: "English Grade 3 (SD) | Kurikulum Merdeka",
    description: about(
      "Belajar bahasa Inggris lewat gambar, suara, dan kuis seru (Fase B).",
      ["6 bab: Hello Friends, My Family, School Things and Colors, Let's Count, Animals Around Me, Food I Like", "Pretest di awal bab, 3 materi, dan posttest di setiap bab", "180 soal dengan pembahasan, termasuk soal HOTS", "Latihan menulis dan berbicara dengan contoh jawaban"],
      SD_OUTRO
    ),
  },
  "english-sd-4": {
    title: "English Grade 4 (SD) | Kurikulum Merdeka",
    description: about(
      "Bahasa Inggris untuk kehidupan sehari-hari: jam, tanggal, pekerjaan, kota, hobi, kesehatan, dan berbelanja (Fase B).",
      ["8 bab, 24 materi bergambar dengan audio", "260+ soal interaktif dengan pembahasan", "Latihan menulis dan berbicara dengan contoh jawaban", "Kuis setiap bab dan Live Quiz bareng di kelas"],
      SCHOOL_OUTRO
    ),
  },
  "english-sd-5": {
    title: "English Grade 5 (SD) | Kurikulum Merdeka",
    description: about(
      "Mendeskripsikan orang dan hewan, bercerita tentang liburan, memberi petunjuk arah, dan menulis resep (Fase C).",
      ["8 bab, mulai dari My School Subjects sampai Celebrations in Indonesia", "24 materi interaktif dengan audio", "260+ soal dengan pembahasan", "Latihan menulis dan berbicara dengan contoh jawaban dan rubrik"],
      SCHOOL_OUTRO
    ),
  },
  "english-sd-6": {
    title: "English Grade 6 (SD) | Kurikulum Merdeka",
    description: about(
      "Bercerita tentang pengalaman dan rencana, membandingkan, menjelaskan cara membuat sesuatu, sampai menceritakan fabel (Fase C).",
      ["8 bab, dari Past Experiences sampai My Dream and Graduation", "24 materi interaktif dengan audio", "260+ soal dengan pembahasan", "Latihan menulis dan berbicara, siap melangkah ke SMP"],
      SCHOOL_OUTRO
    ),
  },
  "english-smp-7": {
    title: "English Grade 7 (SMP) | Kurikulum Merdeka",
    description: about(
      "Memperkenalkan diri, mendeskripsikan orang, makanan, rumah, dan hewan, serta membaca tanda dan pengumuman (Fase D).",
      ["8 bab, 24 materi interaktif dengan audio", "260+ soal dengan pembahasan, termasuk soal HOTS", "Latihan menulis dan berbicara dengan contoh jawaban dan rubrik", "Kuis setiap bab dan Live Quiz bareng di kelas"],
      SCHOOL_OUTRO
    ),
  },
  "english-smp-8": {
    title: "English Grade 8 (SMP) | Kurikulum Merdeka",
    description: about(
      "Recount, biografi, legenda Nusantara, saran kesehatan, perbandingan, menjaga bumi, dan aman berinternet (Fase D).",
      ["8 bab, 24 materi interaktif dengan audio", "260+ soal dengan pembahasan, termasuk soal HOTS", "Latihan menulis dan berbicara dengan contoh jawaban dan rubrik", "Kuis setiap bab dan Live Quiz bareng di kelas"],
      SCHOOL_OUTRO
    ),
  },
  "english-smp-9": {
    title: "English Grade 9 (SMP) | Kurikulum Merdeka",
    description: about(
      "Teks prosedur, report, passive voice, cerpen, label dan iklan, puisi, berita, dan persiapan masuk SMA (Fase D).",
      ["8 bab, 24 materi interaktif dengan audio", "260+ soal dengan pembahasan, termasuk soal HOTS", "Latihan menulis dan berbicara dengan contoh jawaban dan rubrik", "Kuis setiap bab dan Live Quiz bareng di kelas"],
      SCHOOL_OUTRO
    ),
  },
  "english-sma-10": {
    title: "English Grade 10 (SMA) | Kurikulum Merdeka",
    description: about(
      "Bahasa Inggris kelas 10 (Fase E): dari kata-kata yang baik, Indonesia yang memukau, surat dan email, sampai dunia kerja.",
      ["8 bab: Kindness Matters, Wonderful Indonesia, Letters and Emails, Plans and Intentions, Life Stories, Stories That Teach, What Do You Think?, The World of Work", "24 materi interaktif dengan audio", "260+ soal dengan pembahasan, termasuk soal HOTS", "Latihan menulis dan berbicara dengan contoh jawaban dan rubrik"],
      SCHOOL_OUTRO
    ),
  },
  "english-sma-11": {
    title: "English Grade 11 (SMA) | Kurikulum Merdeka",
    description: about(
      "Bahasa Inggris kelas 11 (Fase F): memecahkan masalah, menjelaskan fenomena alam, conditionals, teks persuasif, cek fakta, inovasi, komplain sopan, dan budaya.",
      ["8 bab, 24 materi interaktif dengan audio", "260+ soal dengan pembahasan, termasuk soal HOTS", "Latihan menulis dan berbicara dengan contoh jawaban dan rubrik", "Kuis setiap bab dan Live Quiz bareng di kelas"],
      SCHOOL_OUTRO
    ),
  },
  "english-sma-12": {
    title: "English Grade 12 (SMA) | Kurikulum Merdeka",
    description: about(
      "Bahasa Inggris kelas 12 (Fase F): teks diskusi, melamar kerja/kuliah, review dan analisis sastra, manual, debat, dan keterampilan akademik.",
      ["8 bab, 24 materi interaktif dengan audio", "260+ soal dengan pembahasan, termasuk soal HOTS", "Latihan menulis dan berbicara dengan contoh jawaban dan rubrik", "Bekal untuk ujian akhir dan langkah setelah SMA"],
      SCHOOL_OUTRO
    ),
  },
  "english-lanjut": {
    title: "Bahasa Inggris Tingkat Lanjut | Kelas 11–12",
    description: about(
      "Mata pelajaran pilihan Bahasa Inggris Tingkat Lanjut (Fase F) untuk siswa yang ingin naik level: sastra, berpikir kritis, dan komunikasi akademik.",
      ["8 bab: puisi, drama, menulis fiksi, berpikir kritis, lintas budaya, data dan teks visual, essay argumentatif, komunikasi profesional", "24 materi interaktif", "260+ soal dengan pembahasan, termasuk soal HOTS", "16 tugas menulis dan berbicara dengan contoh jawaban dan rubrik"],
      SCHOOL_OUTRO
    ),
  },
  "ielts-academic": {
    title: "IELTS Academic",
    description: about(
      "Persiapan IELTS Academic band demi band, dari Band 4.5 sampai 7.5+.",
      ["6 level sesuai target band, 24 materi interaktif", "Listening, Reading, Writing Task 1 & 2, serta Speaking Part 1–3", "Contoh jawaban per band dan rubrik penilaian untuk Writing dan Speaking", "230+ soal latihan dengan pembahasan dan mock quiz di setiap level"],
      "Belajar sesuai band targetmu, lalu naik level saat kamu siap."
    ),
  },
  "toefl-ibt": {
    title: "TOEFL iBT | New 2026 Format",
    description: about(
      "Persiapan TOEFL iBT format terbaru 2026, semua tipe soal baru dari Band 3 sampai Band 6.",
      ["6 level, 24 materi interaktif", "Complete the Words, Read in Daily Life, Build a Sentence, Listen and Repeat, academic discussion, interview, dan lainnya", "Latihan writing dan speaking dengan contoh jawaban dan rubrik", "230+ soal dengan pembahasan, ditutup dengan full mock dan strategi hari-H"]
    ),
  },
  "oxford-ellt": {
    title: "Oxford ELLT Preparation",
    description: about(
      "Persiapan Oxford English Language Level Test (ELLT) dari B1 sampai C1+.",
      ["6 level, 24 materi interaktif", "Paragraph sequencing, gap-fill, long-text reading, note completion, summary, dan essay", "Simulasi speaking test dengan contoh jawaban dan rubrik", "230+ soal dengan pembahasan, mock quiz di setiap level dan full mock di akhir"]
    ),
  },
  "toeic-lr": {
    title: "TOEIC Listening & Reading",
    description: about(
      "Persiapan TOEIC Listening & Reading skor demi skor, dari 400+ sampai 900+.",
      ["6 level sesuai target skor, 18 materi interaktif", "Ketujuh part: photographs, question–response, conversations, talks, incomplete sentences, text completion, single & multiple passages", "Kosakata dan grammar bisnis, strategi, jebakan, dan manajemen waktu", "190+ soal dengan pembahasan dan mock quiz di setiap level"]
    ),
  },
  "english-grammar": {
    title: "English Grammar Essential",
    description: about(
      "Grammar bahasa Inggris dari A2 sampai B2, dijelaskan lewat konteks nyata, bukan sekadar rumus.",
      ["6 bab: present & past tenses, present perfect & future, nouns & articles, modals & conditionals, passive, reported speech & relative clauses", "18 materi interaktif dengan contoh benar-salah", "190+ soal dengan pembahasan", "Latihan menulis di setiap bab dengan contoh jawaban"]
    ),
  },
  "english-conversation": {
    title: "Everyday English Conversation",
    description: about(
      "Ngobrol bahasa Inggris dengan natural di situasi sehari-hari (A2–B1+).",
      ["6 unit: kenalan & small talk, bepergian, makan di luar, traveling, telepon & janji temu, perasaan & opini", "Dialog dengan audio dan frasa siap pakai", "Latihan berbicara: rekam suaramu lalu bandingkan dengan contoh", "190+ soal dengan pembahasan dan Live Quiz bareng di kelas"]
    ),
  },
  "business-english": {
    title: "Business English",
    description: about(
      "Bahasa Inggris untuk dunia kerja (B1–B2): percaya diri di kantor, rapat, dan wawancara.",
      ["6 unit: networking, email & pesan, rapat, presentasi & data, negosiasi & layanan pelanggan, CV & wawancara kerja", "18 materi interaktif dengan dialog dan audio", "Latihan menulis email dan berbicara dengan contoh jawaban dan rubrik", "190+ soal dengan pembahasan"]
    ),
  },
  "english-day": {
    title: "English Day",
    description: about(
      "10 modul percakapan sehari-hari dan layanan pelanggan untuk dunia kerja. Berani ngomong dulu, sempurna belakangan.",
      ["Frasa kunci dengan dialog dan audio pengucapan", "Kosakata harian, checkpoint interaktif, dan kuis setiap modul", "Live Quiz bareng di kelas, dipandu langsung oleh pengajar"],
      "Modul dibuka bertahap oleh pengajar sesuai jadwal kelas."
    ),
  },
  "eac-olympiad-1": {
    title: "Modul 1 EA Champion - Olympiad",
    description: about(
      "Persiapan English Olympiad EA Champion — Sesi 1: kenali format lomba, lalu bangun fondasi Bagian A.",
      ["Format ujian, sistem skor, tie-breaker, dan roadmap 7 sesi", "Countable/uncountable nouns & bentuk jamak", "3 tenses dasar, parts of speech, conjunctions", "Preview Reading, diagnostic check, latihan Bagian A, PR kosakata"]
    ),
  },
  "eac-olympiad-2": {
    title: "Modul 2 EA Champion - Olympiad",
    description: about(
      "Persiapan English Olympiad EA Champion — Sesi 2: Bagian A lanjutan dan strategi Reading.",
      ["Comparative & superlative, preposisi waktu/tempat/arah", "Relative clause who/which, sinonim & antonim", "Skimming, scanning, main idea, context clues", "Review quiz, latihan gabungan, PR & progress check"]
    ),
  },
  "eac-olympiad-3": {
    title: "Modul 3 EA Champion - Olympiad",
    description: about(
      "Persiapan lengkap Preliminary Round EA Champion dalam satu modul.",
      ["Bagian C: pola dialog; Bagian D: unscrambling, idiomatic preposition, multi-error (STAPW)", "Bagian B: cause-effect, idiom, figurative language; Bagian A: relative \"that\", 7 jebakan, irregular verbs, passive/future/present perfect", "Drill set, Lab D, retest Bagian D, strategi hari-H & rencana sprint", "2 mock test penuh (40 soal, 60 menit)"]
    ),
  },
  "eac-olympiad-4": {
    title: "Modul 4 EA Champion - Olympiad",
    description: about(
      "Persiapan Regional Round English Olympiad EA Champion — Sesi 4.",
      ["Evaluasi hasil Preliminary/mock test & prioritas belajar", "Present perfect & past perfect", "Multi-error analysis lanjutan, idiom & figurative language", "Reading level lanjut & kosakata akademik"]
    ),
  },
};

export function storeCopy(slug: string): StoreCopy | null {
  return (STORE_COPY as Record<string, StoreCopy>)[slug] ?? null;
}
