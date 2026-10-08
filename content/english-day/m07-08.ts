import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, dialog, fill, listenPick, live, pair, phrases, pick, pickMany, repeatAfterMe, say } from "./helpers";

// Modul 7 — Cerita dari Kantor · Modul 8 — Menyapa & Small Talk dengan Pelanggan

export const M7: Level = {
  id: "ed-m7",
  title: "Modul 7 — Cerita dari Kantor",
  description: "Menceritakan pekerjaan sehari-hari: tugas utama, tantangan, hal yang disukai, dan cerita tentang pelanggan. Ada mini review Modul 4–6.",
  targetScore: "Fase 2 · Kerja",
  cover: ["office", "report", "target"],
  lessons: [
    {
      id: "ed-m7-l1",
      skill: "speaking",
      title: "Mini Review & Key Phrases Kerja",
      summary: "Review Modul 4–6, lalu My main job is…, The most challenging part is…",
      sections: [
        {
          title: "Tebak Kata Cepat (review Modul 4–6)",
          blocks: [
            { type: "try", question: pair("ed-m7-l1-review1", "Review Modul 4–5.", [["nongkrong", "hang out"], ["membosankan", "boring"], ["pulau", "island"], ["koper", "suitcase"]], "Nongkrong = hang out, membosankan = boring, pulau = island, koper = suitcase.") },
            { type: "try", question: pair("ed-m7-l1-review2", "Review Modul 6.", [["jaringan", "network"], ["kuota", "data quota"], ["terputus", "disconnected"], ["layar", "screen"]], "Mantap, lanjut!") },
          ],
        },
        {
          title: "Frasa kunci",
          blocks: [
            phrases([
              ["Today at work, I ___.", "Hari ini di kantor, saya ___."],
              ["My main job is ___.", "Tugas utama saya ___."],
              ["The most challenging part of my job is ___.", "Bagian tersulit dari pekerjaan saya ___."],
              ["I enjoy ___ about my job.", "Saya suka ___ dari pekerjaan saya."],
              ["Our customers usually ___.", "Pelanggan kami biasanya ___."],
              ["I have to ___ every day.", "Saya harus ___ setiap hari."],
            ]),
            repeatAfterMe(["My main job is billing.", "The most challenging part of my job is angry customers.", "I enjoy helping customers.", "I have to call customers every day."]),
          ],
        },
      ],
      checkpoint: [
        pick("ed-m7-l1-c1", "“Tugas utama saya penagihan.”", ["My main job is billing.", "My job main is billing.", "Main my job billing.", "I am main job billing."], 0, "My main job is ___."),
        listenPick("ed-m7-l1-c2", say(["woman", "I have to call customers every day."]), "Dengarkan. Apa yang harus ia lakukan setiap hari?", ["pic:phone-call|Menelepon pelanggan", "pic:report|Membuat laporan", "pic:meeting|Rapat", "pic:technician|Memperbaiki modem"], 0, "Call customers = menelepon pelanggan."),
        fill("ed-m7-l1-c3", "Lengkapi.", "The most", "part of my job is angry customers.", ["challenging", "difficult"], "Bagian tersulit = the most challenging (difficult) part."),
        pick("ed-m7-l1-c4", "Review: “membosankan” = …", ["boring", "bored", "boarding", "border"], 0, "Boring = membosankan."),
        pick("ed-m7-l1-c5", "Kalimat mana yang menceritakan hal yang DISUKAI dari pekerjaan?", ["I enjoy helping customers solve their problems.", "Customers are angry.", "I have to make a report.", "The due date is the 20th."], 0, "I enjoy ___ = saya suka ___.", { hots: true }),
      ],
    },
    {
      id: "ed-m7-l2",
      skill: "listening",
      title: "Ayo Ngobrol: Satu Hari di Kantor",
      summary: "Cerita staf billing, pertanyaan pemandu, dan aktivitas “A Day in My Job”.",
      sections: [
        {
          title: "Dengarkan ceritanya",
          blocks: [
            { type: "pictures", items: [{ pic: "staff", label: "billing staff" }, { pic: "phone-call", label: "call customers" }, { pic: "customer-angry", label: "angry customers" }] },
            dialog("My main job", say(
              ["woman", "What's your main job in the household division?"],
              ["man", "My main job is billing. I check customer payments and call customers who haven't paid. The most challenging part is customers who are angry about their bills. I enjoy helping customers solve their problems."],
            )),
            { type: "try", question: pickMany("ed-m7-l2-try", "Pilih SEMUA tugas si pria.", ["Check customer payments", "Fix modems", "Call customers who haven't paid", "Install cables"], [0, 2], "Ia mengecek pembayaran dan menelepon pelanggan yang belum bayar.") },
          ],
        },
        {
          title: "A Day in My Job",
          blocks: [
            { type: "text", md: "Coba buat 3 kalimat urutan harimu di kantor:\n\n- **In the morning,** I check my email.\n- **In the afternoon,** I call customers.\n- **In the evening,** I make a report." },
            { type: "try", question: arrange("ed-m7-l2-day", "Susun kalimat pagi hari.", "In the morning I check my email", "In the morning + kegiatan.") },
            { type: "tip", md: "Saat bercerita, jangan sebut nama asli pelanggan. Cukup **a customer**." },
          ],
        },
      ],
      checkpoint: [
        listenPick("ed-m7-l2-c1", say(["man", "The most challenging part is customers who are angry about their bills."]), "Dengarkan. Apa bagian tersulitnya?", ["Pelanggan yang marah soal tagihan", "Rapat setiap hari", "Internet lambat", "Laporan mingguan"], 0, "Angry about their bills = marah soal tagihan."),
        pair("ed-m7-l2-c2", "Pasangkan waktu dan kegiatan yang masuk akal.", [["In the morning,", "I check my email."], ["In the afternoon,", "I call customers."], ["In the evening,", "I make a report."], ["Every Monday,", "we have a meeting."]], "Hari kerja yang rapi!"),
        fill("ed-m7-l2-c3", "Lengkapi.", "I check customer", ". (pembayaran)", ["payments", "payment"], "Pembayaran = payment(s)."),
        pick("ed-m7-l2-c4", "Saat bercerita tentang pelanggan, sebaiknya…", ["Sebut nama lengkap dan alamatnya", "Cukup bilang “a customer”", "Sebut nomor HP-nya", "Tunjukkan fotonya"], 1, "Jaga privasi pelanggan: a customer."),
        pick("ed-m7-l2-c5", "Teman bertanya “What do you want to improve in your English for your job?”. Jawaban yang relevan…", ["I want to talk to customers on the phone confidently.", "I like crab.", "My hobby is fishing.", "I went to Bali."], 0, "Pertanyaannya tentang bahasa Inggris untuk kerja.", { hots: true }),
      ],
    },
    {
      id: "ed-m7-l3",
      skill: "vocabulary",
      title: "Vocab of the Day: Kantor & Billing",
      summary: "Bill, due date, overdue payment, call, remind, complaint, solve, target, meeting, report, patient.",
      sections: [
        {
          title: "Kosakata hari ini",
          blocks: [
            {
              type: "vocab",
              items: [
                { emoji: "🧾", pic: "bill", word: "bill / invoice", meaning: "tagihan", example: "The customer's bill is late." },
                { emoji: "📅", pic: "calendar", word: "due date", meaning: "jatuh tempo", example: "The due date is the 20th." },
                { emoji: "⏰", pic: "alarm", word: "overdue payment", meaning: "tunggakan", example: "He has an overdue payment." },
                { emoji: "📞", pic: "phone-call", word: "contact / call", meaning: "menghubungi", example: "I call customers every day." },
                { emoji: "🔔", pic: "smartphone", word: "remind", meaning: "mengingatkan", example: "I remind customers to pay." },
                { emoji: "😠", pic: "customer-angry", word: "complaint", meaning: "keluhan", example: "We receive many complaints." },
                { emoji: "✅", pic: "receipt", word: "solve / resolve", meaning: "menyelesaikan", example: "I solve problems for customers." },
                { emoji: "🎯", pic: "target", word: "target", meaning: "target", example: "We have a monthly target." },
                { emoji: "👥", pic: "meeting", word: "meeting", meaning: "rapat", example: "We have a meeting every Monday." },
                { emoji: "📊", pic: "report", word: "report", meaning: "laporan", example: "I make a report every week." },
                { emoji: "🧘", pic: "headset", word: "patient", meaning: "sabar", example: "You have to be patient with customers." },
              ],
            },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m7-l3-c1", "“Jatuh tempo” = …", ["due date", "dead line date", "pay day", "end date"], 0, "Jatuh tempo = due date."),
        listenPick("ed-m7-l3-c2", say(["woman", "We receive many complaints."]), "Dengarkan. Apa yang banyak diterima?", ["Keluhan", "Pembayaran", "Hadiah", "Laporan"], 0, "Complaints = keluhan."),
        fill("ed-m7-l3-c3", "Lengkapi.", "I", "customers to pay. (mengingatkan)", ["remind"], "Mengingatkan = remind."),
        pair("ed-m7-l3-c4", "Pasangkan.", [["pic:report", "report"], ["pic:meeting", "meeting"], ["pic:target", "target"], ["pic:bill", "bill"]], "Siap kerja!"),
        pick("ed-m7-l3-c5", "Pelanggan marah-marah di telepon. Sikap yang paling dibutuhkan…", ["patient", "boring", "overdue", "expensive"], 0, "Be patient = sabar.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ed-m7-quiz",
    title: "Kuis Modul 7",
    passPercent: 70,
    questions: [
      pick("ed-m7-q1", "Gambar ini…", ["report", "receipt", "calendar", "bill"], 0, "Grafik di kertas = report (laporan).", { image: "report" }),
      listenPick("ed-m7-q2", say(["man", "The due date is the twentieth."]), "Dengarkan. Jatuh temponya tanggal…", ["2", "12", "20", "22"], 2, "Twentieth = tanggal 20."),
      arrange("ed-m7-q3", "Susun.", "We have a meeting every Monday", "We have a meeting + every + hari."),
      pick("ed-m7-q4", "“He has an overdue payment.” artinya…", ["Ia punya tunggakan.", "Ia sudah lunas.", "Ia dapat diskon.", "Ia baru pasang internet."], 0, "Overdue payment = tunggakan."),
      fill("ed-m7-q5", "Lengkapi.", "You have to be", "with customers. (sabar)", ["patient"], "Sabar = patient."),
      pair("ed-m7-q6", "Pasangkan.", [["keluhan", "complaint"], ["menyelesaikan", "solve"], ["laporan", "report"], ["rapat", "meeting"]], "Kerja bagus!"),
      pick("ed-m7-q7", "“What's your main job?” — jawaban…", ["My main job is billing.", "My hobby is fishing.", "I'm fine.", "It's spicy."], 0, "Main job = tugas utama."),
      listenPick("ed-m7-q8", say(["woman", "I make a report every week."]), "Dengarkan. Seberapa sering ia membuat laporan?", ["Setiap hari", "Setiap minggu", "Setiap bulan", "Setiap tahun"], 1, "Every week = setiap minggu."),
      pick("ed-m7-q9", "“We have a monthly target.” Monthly artinya…", ["bulanan", "mingguan", "harian", "tahunan"], 0, "Month = bulan → monthly = bulanan."),
      pick("ed-m7-q10", "Kamu ingin menceritakan pelanggan yang marah tanpa melanggar privasi. Kalimat terbaik…", ["A customer was upset about his bill.", "Pak Hasan from Jalan Mulawarman was angry.", "Customer 0812xxx was angry.", "I don't tell stories."], 0, "Cukup “a customer”, tanpa nama atau data pribadi.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz Modul 7 — Office Stories",
    questions: [
      live("ed-m7-live1", "“Tagihan” = …", ["bill", "bell", "ball", "build"], 0, "bill"),
      live("ed-m7-live2", "“Jatuh tempo” = …", ["due date", "dead date", "date due off", "pay time"], 0, "calendar"),
      live("ed-m7-live3", "Gambar ini?", ["meeting", "party", "class", "market"], 0, "meeting"),
      live("ed-m7-live4", "“Keluhan” = …", ["complain", "complaint", "compliment", "complete"], 1, "customer-angry"),
      live("ed-m7-live5", "“Sabar” = …", ["patient", "passion", "patent", "partner"], 0, "headset"),
      live("ed-m7-live6", "My main job ___ billing.", ["are", "is", "am", "be"], 1, "staff"),
      live("ed-m7-live7", "“Tunggakan” = overdue …", ["payment", "pay day", "paper", "package"], 0, "alarm"),
      live("ed-m7-live8", "Gambar ini?", ["target", "clock", "plate", "wheel"], 0, "target"),
      live("ed-m7-live9", "“Mengingatkan” = …", ["remember", "remind", "remain", "repeat"], 1, "smartphone"),
      live("ed-m7-live10", "I make a ___ every week. (laporan)", ["report", "repair", "receipt", "record"], 0, "report"),
    ],
  },
};

export const M8: Level = {
  id: "ed-m8",
  title: "Modul 8 — Menyapa & Small Talk dengan Pelanggan",
  description: "Roleplay pertama: menyapa pelanggan, menanyakan keperluan, menahan dan kembali ke telepon, lalu menutup percakapan dengan sopan.",
  targetScore: "Fase 2 · Kerja",
  cover: ["headset", "phone-call", "customer"],
  lessons: [
    {
      id: "ed-m8-l1",
      skill: "speaking",
      title: "8 Frasa Customer Service",
      summary: "Pembuka, identifikasi, menahan, kembali, minta maaf, mengecek, dan penutup.",
      sections: [
        {
          title: "Recall Modul 7",
          blocks: [{ type: "try", question: pair("ed-m8-l1-recall", "Pasangkan.", [["tagihan", "bill"], ["jatuh tempo", "due date"], ["keluhan", "complaint"], ["sabar", "patient"]], "Siap melayani pelanggan!") }],
        },
        {
          title: "Frasa kerja inti",
          blocks: [
            { type: "pictures", items: [{ pic: "staff", label: "staff" }, { pic: "customer", label: "customer" }] },
            phrases([
              ["Good morning, Telkomsel / IndiHome. How can I help you?", "Selamat pagi, Telkomsel / IndiHome. Ada yang bisa saya bantu?", "Pembuka"],
              ["May I have your name, please?", "Boleh tahu nama Anda?", "Identifikasi"],
              ["Could you please wait a moment?", "Mohon tunggu sebentar.", "Menahan"],
              ["Thank you for waiting.", "Terima kasih sudah menunggu.", "Kembali"],
              ["I'm sorry for the inconvenience.", "Mohon maaf atas ketidaknyamanannya.", "Minta maaf"],
              ["Let me check that for you.", "Biar saya cek dulu.", "Mengecek"],
              ["Is there anything else I can help you with?", "Ada lagi yang bisa saya bantu?", "Penutup"],
              ["Thank you for contacting us. Have a nice day!", "Terima kasih telah menghubungi kami. Semoga hari Anda menyenangkan!", "Penutup"],
            ]),
            repeatAfterMe([
              "Good morning, IndiHome Tarakan. How can I help you?",
              "May I have your name, please?",
              "Could you please wait a moment?",
              "Thank you for waiting.",
              "I'm sorry for the inconvenience.",
              "Let me check that for you.",
              "Is there anything else I can help you with?",
              "Thank you for contacting us. Have a nice day!",
            ]),
            { type: "tip", md: "Latih **intonasi sopan**: suara naik di akhir pertanyaan, nada ramah. Kalau bisa, cetak 8 frasa ini dan tempel di meja kerja." },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m8-l1-c1", "Frasa untuk menanyakan nama pelanggan dengan sopan…", ["What is your name?", "May I have your name, please?", "Who are you?", "Name, please!"], 1, "May I have your name, please? lebih sopan."),
        listenPick("ed-m8-l1-c2", say(["woman", "Could you please wait a moment?"]), "Dengarkan. Staf sedang…", ["Meminta pelanggan menunggu", "Menutup telepon", "Minta maaf", "Menanyakan nama"], 0, "Wait a moment = tunggu sebentar."),
        pair("ed-m8-l1-c3", "Pasangkan frasa dengan fungsinya.", [["How can I help you?", "pembuka"], ["Let me check that for you.", "mengecek"], ["Thank you for waiting.", "kembali ke telepon"], ["Have a nice day!", "penutup"]], "Urutan percakapanmu sudah rapi!"),
        fill("ed-m8-l1-c4", "Lengkapi.", "I'm sorry for the", ".", ["inconvenience"], "I'm sorry for the inconvenience."),
        pick("ed-m8-l1-c5", "Setelah pelanggan menunggu lama, kalimat pertama saat kembali…", ["Thank you for waiting.", "Goodbye!", "May I have your name?", "Wait a moment."], 0, "Selalu berterima kasih karena sudah menunggu.", { hots: true }),
      ],
    },
    {
      id: "ed-m8-l2",
      skill: "listening",
      title: "Roleplay: Telepon dari Pelanggan",
      summary: "Model dialog telepon dan empat kartu skenario roleplay.",
      sections: [
        {
          title: "Dengarkan model dialog",
          blocks: [
            dialog("Phone call", say(
              ["woman", "Good morning, IndiHome Tarakan. How can I help you?"],
              ["man", "Hello, I want to ask about my bill."],
              ["woman", "Sure. May I have your name, please?"],
              ["man", "My name is Pak Hasan."],
              ["woman", "Thank you, Mr. Hasan. Could you please wait a moment? Let me check that for you."],
              ["woman", "Thank you for waiting. Is there anything else I can help you with?"],
              ["man", "No, that's all. Thank you."],
              ["woman", "You're welcome. Have a nice day!"],
            )),
            { type: "try", question: pick("ed-m8-l2-try", "Apa keperluan Pak Hasan?", ["Bertanya tentang tagihan", "Melaporkan internet mati", "Pasang baru", "Salah sambung"], 0, "“I want to ask about my bill.”") },
          ],
        },
        {
          title: "Kartu skenario",
          blocks: [
            { type: "text", md: "Latih bersama pasangan, bergantian jadi **staf** dan **pelanggan**:\n\n1. Pelanggan datang ke kantor, bertanya tentang paket IndiHome.\n2. Pelanggan menelepon, mau mengecek tagihan.\n3. Pelanggan **salah sambung**: *Sorry, you have the wrong number.*\n4. Pelanggan datang sangat marah. Staf tetap ramah dan minta maaf." },
            { type: "pictures", items: [{ pic: "customer-angry", label: "upset customer" }, { pic: "staff", label: "“I'm sorry for the inconvenience.”" }] },
            { type: "tip", md: "Roleplay itu **latihan aman**. Tidak ada yang menilai, semua pernah gugup." },
          ],
        },
      ],
      checkpoint: [
        listenPick("ed-m8-l2-c1", say(["man", "Hello, I want to ask about my bill."]), "Dengarkan. Respons staf yang paling pas berikutnya…", ["Sure. May I have your name, please?", "Have a nice day!", "Sorry, wrong number.", "I like crab."], 0, "Identifikasi pelanggan dulu sebelum mengecek tagihan."),
        arrange("ed-m8-l2-c2", "Susun pembuka telepon.", "How can I help you", "How can I help you? = Ada yang bisa saya bantu?"),
        pick("ed-m8-l2-c3", "Penelepon mencari restoran, padahal ini kantor IndiHome. Staf bilang…", ["Sorry, you have the wrong number.", "Let me check your bill.", "Your bill is 350,000 rupiah.", "Please restart your modem."], 0, "Salah sambung = wrong number."),
        fill("ed-m8-l2-c4", "Lengkapi.", "Is there anything", "I can help you with?", ["else"], "Anything else = ada lagi."),
        pick("ed-m8-l2-c5", "Pelanggan datang marah karena internetnya mati. Kalimat PERTAMA yang paling bijak…", ["I'm sorry for the inconvenience. Let me check that for you.", "That's not my problem.", "Please calm down! You are wrong.", "Have a nice day!"], 0, "Minta maaf dulu, lalu tunjukkan kamu akan membantu.", { hots: true }),
      ],
    },
    {
      id: "ed-m8-l3",
      skill: "vocabulary",
      title: "Vocab of the Day: Pelayanan",
      summary: "Friendly, polite, please wait, wrong number, hang up, transfer, assist, upset, ask, service.",
      sections: [
        {
          title: "Kosakata hari ini",
          blocks: [
            {
              type: "vocab",
              items: [
                { emoji: "😊", pic: "staff", word: "friendly", meaning: "ramah", example: "Our staff is friendly." },
                { emoji: "🙏", pic: "thumbs-up", word: "polite", meaning: "sopan", example: "Please be polite to customers." },
                { emoji: "⏳", pic: "clock", word: "please wait", meaning: "mohon tunggu", example: "Please wait a moment." },
                { emoji: "☎️", pic: "phone-call", word: "wrong number", meaning: "salah sambung", example: "Sorry, you have the wrong number." },
                { emoji: "📵", pic: "smartphone", word: "hang up", meaning: "menutup telepon", example: "Please don't hang up." },
                { emoji: "🔀", pic: "headset", word: "transfer / connect you to", meaning: "sambungkan ke", example: "Let me transfer you to billing." },
                { emoji: "🤝", pic: "meeting", word: "help / assist", meaning: "membantu", example: "I can assist you." },
                { emoji: "😠", pic: "customer-angry", word: "angry / upset", meaning: "marah / kesal", example: "The customer is upset." },
                { emoji: "❓", pic: "question", word: "ask", meaning: "bertanya", example: "I would like to ask about my bill." },
                { emoji: "⭐", pic: "trophy", word: "service", meaning: "layanan", example: "We have great service." },
              ],
            },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m8-l3-c1", "“Menutup telepon” = …", ["hang up", "hang out", "close up", "phone off"], 0, "Hang up = menutup telepon. Hang out = nongkrong (Modul 4)!"),
        listenPick("ed-m8-l3-c2", say(["woman", "Let me transfer you to billing."]), "Dengarkan. Staf akan…", ["Menyambungkan ke bagian billing", "Menutup telepon", "Mengirim teknisi", "Minta nama"], 0, "Transfer you to = menyambungkan Anda ke."),
        pair("ed-m8-l3-c3", "Pasangkan.", [["ramah", "friendly"], ["sopan", "polite"], ["kesal", "upset"], ["layanan", "service"]], "Pelayanan bintang lima!"),
        fill("ed-m8-l3-c4", "Lengkapi.", "Please don't", "up. (jangan tutup teleponnya)", ["hang"], "Hang up."),
        pick("ed-m8-l3-c5", "Pertanyaan pelanggan tentang tagihan masuk ke bagian teknisi. Kamu bilang…", ["Let me transfer you to billing.", "Sorry, wrong number.", "Please hang up.", "I can't help, bye."], 0, "Sambungkan ke bagian yang tepat.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ed-m8-quiz",
    title: "Kuis Modul 8",
    passPercent: 70,
    questions: [
      pick("ed-m8-q1", "Pembuka telepon yang benar…", ["Good morning, IndiHome Tarakan. How can I help you?", "Hello, what do you want?", "Yes?", "Who is this?"], 0, "Sapa + nama kantor + tawarkan bantuan.", { image: "headset" }),
      listenPick("ed-m8-q2", say(["man", "Thank you for waiting."]), "Dengarkan. Kapan kalimat ini dipakai?", ["Saat kembali setelah pelanggan menunggu", "Saat membuka telepon", "Saat salah sambung", "Saat pelanggan marah"], 0, "Thank you for waiting = terima kasih sudah menunggu."),
      arrange("ed-m8-q3", "Susun.", "May I have your name please", "May I have your name, please?"),
      pick("ed-m8-q4", "“Mohon maaf atas ketidaknyamanannya.”", ["I'm sorry for the inconvenience.", "Sorry for convenience.", "I'm sorry, inconvenient you.", "Excuse me for the trouble me."], 0, "I'm sorry for the inconvenience."),
      fill("ed-m8-q5", "Lengkapi.", "Let me", "that for you. (cek)", ["check"], "Let me check that for you."),
      pair("ed-m8-q6", "Pasangkan.", [["salah sambung", "wrong number"], ["menutup telepon", "hang up"], ["membantu", "assist"], ["bertanya", "ask"]], "Bagus!"),
      pick("ed-m8-q7", "Urutan yang benar dalam telepon…", ["Pembuka → nama → cek → penutup", "Penutup → nama → pembuka → cek", "Cek → penutup → pembuka → nama", "Nama → penutup → cek → pembuka"], 0, "Buka, identifikasi, cek, lalu tutup."),
      listenPick("ed-m8-q8", say(["woman", "Is there anything else I can help you with?"]), "Dengarkan. Jawaban pelanggan kalau sudah selesai…", ["No, that's all. Thank you.", "Yes, my name is Hasan.", "Wait a moment.", "Good morning."], 0, "No, that's all = tidak, sudah cukup."),
      pick("ed-m8-q9", "Gambar ini menunjukkan pelanggan yang…", ["upset", "friendly", "polite", "patient"], 0, "Wajah marah = upset/angry.", { image: "customer-angry" }),
      pick("ed-m8-q10", "Pelanggan berbicara terlalu cepat. Kalimat sopan yang bisa kamu pakai…", ["Slowly, please. Can you repeat, please?", "Stop talking!", "I don't care.", "Hang up, please."], 0, "Frasa kelas: Slowly, please / Can you repeat, please?", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz Modul 8 — Customer Service Star",
    questions: [
      live("ed-m8-live1", "Pembuka telepon: How can I ___ you?", ["help", "held", "hello", "hold"], 0, "headset"),
      live("ed-m8-live2", "Minta nama dengan sopan:", ["May I have your name, please?", "Your name?", "Who you?", "Give name!"], 0, "staff"),
      live("ed-m8-live3", "“Salah sambung” = …", ["wrong number", "bad phone", "lost call", "miss call"], 0, "phone-call"),
      live("ed-m8-live4", "“Mohon tunggu sebentar” = Please wait a …", ["moment", "minute hour", "movement", "monument"], 0, "clock"),
      live("ed-m8-live5", "“Menutup telepon” = …", ["hang out", "hang up", "close on", "turn up"], 1, "smartphone"),
      live("ed-m8-live6", "Pelanggan di gambar sedang…", ["happy", "upset", "sleepy", "hungry"], 1, "customer-angry"),
      live("ed-m8-live7", "I'm sorry for the ___.", ["inconvenience", "convenient", "information", "invitation"], 0, "customer"),
      live("ed-m8-live8", "Kembali ke telepon: Thank you for ___.", ["wait", "waiting", "waited", "waits"], 1, "headset"),
      live("ed-m8-live9", "“Ramah” = …", ["friendly", "friend", "fried", "free"], 0, "staff"),
      live("ed-m8-live10", "Penutup: Have a nice ___!", ["day", "dye", "date", "dish"], 0, "feel-great"),
    ],
  },
};
