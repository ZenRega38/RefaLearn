import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, dialog, fill, listenPick, live, pair, phrases, pick, pickMany, repeatAfterMe, say } from "./helpers";

// Modul 5 — Liburan & Tempat Impian · Modul 6 — Teknologi & Internet Sehari-hari

export const M5: Level = {
  id: "ed-m5",
  title: "Modul 5 — Liburan & Tempat Impian",
  description: "Menceritakan tempat yang pernah dikunjungi dan tempat impian yang ingin dikunjungi.",
  targetScore: "Fase 1 · Personal",
  cover: ["beach", "plane", "suitcase"],
  lessons: [
    {
      id: "ed-m5-l1",
      skill: "speaking",
      title: "Key Phrases: Pernah & Ingin",
      summary: "I want to visit…, I've been to…, I've never been to…, It's famous for…",
      sections: [
        {
          title: "Recall Modul 4",
          blocks: [{ type: "try", question: pair("ed-m5-l1-recall", "Pasangkan.", [["memancing", "fishing"], ["bersepeda", "cycling"], ["nongkrong", "hang out"], ["rencana", "plan"]], "Siap jalan-jalan!") }],
        },
        {
          title: "Frasa kunci",
          blocks: [
            phrases([
              ["I want to visit ___.", "Saya ingin mengunjungi ___."],
              ["I've been to ___.", "Saya pernah ke ___."],
              ["I've never been to ___.", "Saya belum pernah ke ___."],
              ["The best place I visited was ___.", "Tempat terbaik yang saya kunjungi adalah ___."],
              ["It's famous for ___.", "Tempat itu terkenal dengan ___."],
              ["I would like to go there because ___.", "Saya ingin ke sana karena ___."],
            ]),
            repeatAfterMe(["I want to visit Bali.", "I've been to Derawan.", "I've never been to Japan.", "It's famous for its beaches.", "I would like to go there because the view is amazing."]),
            { type: "tip", md: "Nama tempat unik seperti **Derawan, Maratua, Bunyu** tidak perlu diterjemahkan. Pakai nama aslinya saja." },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m5-l1-c1", "“Saya belum pernah ke Bali.”", ["I've been to Bali.", "I've never been to Bali.", "I want to Bali.", "I never Bali."], 1, "Belum pernah = I've never been to."),
        listenPick("ed-m5-l1-c2", say(["woman", "Derawan is famous for its beautiful island and clear water."]), "Dengarkan. Derawan terkenal dengan…", ["pic:island|Pulau & air jernih", "pic:mountain|Gunung", "pic:office|Gedung kantor", "pic:traffic|Jalan macet"], 0, "Island = pulau."),
        fill("ed-m5-l1-c3", "Lengkapi.", "I want to", "Japan someday.", ["visit", "go to"], "I want to visit ___."),
        arrange("ed-m5-l1-c4", "Susun.", "The best place I visited was Yogyakarta", "The best place I visited was + tempat."),
        pick("ed-m5-l1-c5", "Kamu belum pernah keluar Tarakan, tapi ingin ke Bali. Jawaban yang tetap memakai pola kelas…", ["I've never been outside Tarakan, but I want to visit Bali.", "I don't travel.", "No.", "Bali is famous."], 0, "Jawaban jujur dan sudah memakai dua pola sekaligus. Hebat!", { hots: true }),
      ],
    },
    {
      id: "ed-m5-l2",
      skill: "listening",
      title: "Ayo Ngobrol: Tempat Impian",
      summary: "Dialog liburan dan pertanyaan pemandu tentang perjalanan.",
      sections: [
        {
          title: "Dengarkan dialognya",
          blocks: [
            dialog("Next vacation", say(
              ["woman", "Where do you want to go on your next vacation?"],
              ["man", "I want to visit Bali. I've never been there. It's famous for its beaches. What about you?"],
              ["woman", "I've been to Bali. The best place I visited was Yogyakarta. I would like to go to Japan someday."],
            )),
            { type: "try", question: pickMany("ed-m5-l2-try", "Pilih SEMUA tempat yang sudah pernah dikunjungi si wanita.", ["Bali", "Yogyakarta", "Japan", "Derawan"], [0, 1], "Ia pernah ke Bali dan Yogyakarta. Jepang masih impian (someday).") },
          ],
        },
        {
          title: "Pertanyaan pemandu",
          blocks: [
            phrases([
              ["Where do you want to go on your next vacation?", "I want to go to Maratua."],
              ["Have you been outside Kalimantan?", "Yes, I've been to Surabaya."],
              ["What was the best place you visited?", "The best place was Derawan."],
              ["Who do you want to travel with?", "With my family."],
              ["Beach, mountains, or city?", "I prefer the beach!"],
              ["What's your dream destination?", "My dream destination is Japan."],
            ], ["Pertanyaan", "Contoh jawaban"]),
            { type: "pictures", items: [{ pic: "beach", label: "beach" }, { pic: "mountain", label: "mountains" }, { pic: "office", label: "city" }] },
          ],
        },
      ],
      checkpoint: [
        listenPick("ed-m5-l2-c1", say(["man", "I want to visit Bali. I've never been there. It's famous for its beaches."]), "Dengarkan. Apakah ia pernah ke Bali?", ["Pernah", "Belum pernah", "Tinggal di Bali", "Tidak disebut"], 1, "“I've never been there.”"),
        pair("ed-m5-l2-c2", "Pasangkan pertanyaan dan jawaban.", [["Who do you want to travel with?", "With my family."], ["Beach or mountains?", "I prefer the beach."], ["What's your dream destination?", "Japan."], ["Have you been to Surabaya?", "Yes, I have."]], "Setiap jawaban menjawab pertanyaannya: who dijawab orang, beach or mountains dijawab pilihan, dream destination dijawab tempat."),
        pick("ed-m5-l2-c3", "“I would like to go to Japan someday.” Someday artinya…", ["Suatu hari nanti", "Kemarin", "Setiap hari", "Hari Minggu"], 0, "Someday = suatu hari nanti."),
        fill("ed-m5-l2-c4", "Lengkapi.", "I prefer the", ". (pantai)", ["beach"], "Pantai = beach."),
        pick("ed-m5-l2-c5", "Share back: pasanganmu ingin ke Bali karena pantainya. Kalimatmu…", ["My partner wants to visit Bali because of the beaches.", "I want to visit Bali.", "My partner is Bali.", "Bali wants my partner."], 0, "Format share back: My partner wants to visit ___ because ___.", { hots: true }),
      ],
    },
    {
      id: "ed-m5-l3",
      skill: "vocabulary",
      title: "Vocab of the Day: Liburan",
      summary: "Vacation, beach, mountain, island, plane ticket, hotel, suitcase, passport, view, cheap/expensive, souvenir.",
      sections: [
        {
          title: "Kosakata hari ini",
          blocks: [
            {
              type: "vocab",
              items: [
                { emoji: "🏖️", pic: "beach", word: "vacation / holiday", meaning: "liburan", example: "I want a vacation in Bali." },
                { emoji: "🌊", pic: "beach", word: "beach", meaning: "pantai", example: "I love the beach." },
                { emoji: "⛰️", pic: "mountain", word: "mountain", meaning: "gunung", example: "The mountain is beautiful." },
                { emoji: "🏝️", pic: "island", word: "island", meaning: "pulau", example: "Derawan is a beautiful island." },
                { emoji: "✈️", pic: "plane", word: "plane ticket", meaning: "tiket pesawat", example: "The plane ticket is expensive." },
                { emoji: "🏨", pic: "house", word: "accommodation / hotel", meaning: "penginapan", example: "We booked a hotel near the beach." },
                { emoji: "🧳", pic: "suitcase", word: "suitcase", meaning: "koper", example: "My suitcase is heavy." },
                { emoji: "🛂", pic: "passport", word: "passport", meaning: "paspor", example: "I don't have a passport yet." },
                { emoji: "🌄", pic: "mountain", word: "view / scenery", meaning: "pemandangan", example: "The view is amazing." },
                { emoji: "💸", pic: "money", word: "cheap / expensive", meaning: "murah / mahal", example: "The hotel is cheap." },
                { emoji: "🎁", pic: "souvenir", word: "souvenir", meaning: "oleh-oleh", example: "I bought souvenirs for my family." },
              ],
            },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m5-l3-c1", "“Oleh-oleh” = …", ["souvenir", "suitcase", "present ticket", "shopping"], 0, "Oleh-oleh = souvenir."),
        listenPick("ed-m5-l3-c2", say(["woman", "My suitcase is heavy."]), "Dengarkan. Apa yang berat?", ["pic:suitcase", "pic:passport", "pic:plane", "pic:souvenir"], 0, "Suitcase = koper."),
        pick("ed-m5-l3-c3", "Lawan kata “expensive”…", ["cheap", "chip", "cheep", "small"], 0, "Expensive (mahal) ↔ cheap (murah)."),
        fill("ed-m5-l3-c4", "Lengkapi.", "The", "is amazing! (pemandangan)", ["view", "scenery"], "Pemandangan = view / scenery."),
        pick("ed-m5-l3-c5", "Mau liburan ke Jepang, apa yang WAJIB dibawa?", ["passport", "souvenir", "beach", "mountain"], 0, "Ke luar negeri harus pakai paspor.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ed-m5-quiz",
    title: "Kuis Modul 5",
    passPercent: 70,
    questions: [
      pick("ed-m5-q1", "Gambar ini…", ["island", "mountain", "city", "river"], 0, "Island = pulau.", { image: "island" }),
      listenPick("ed-m5-q2", say(["man", "I've been to Surabaya and Makassar."]), "Dengarkan. Ia sudah pernah ke…", ["Surabaya dan Makassar", "Bali dan Jepang", "Hanya Tarakan", "Derawan"], 0, "I've been to = pernah ke."),
      arrange("ed-m5-q3", "Susun.", "I want to visit Maratua", "I want to visit + tempat."),
      pick("ed-m5-q4", "“The plane ticket is expensive.” artinya…", ["Tiket pesawatnya murah.", "Tiket pesawatnya mahal.", "Pesawatnya penuh.", "Tiketnya hilang."], 1, "Expensive = mahal."),
      fill("ed-m5-q5", "Lengkapi.", "It's famous", "its beaches.", ["for"], "Famous for = terkenal dengan."),
      pair("ed-m5-q6", "Pasangkan.", [["pic:passport", "passport"], ["pic:suitcase", "suitcase"], ["pic:plane", "plane"], ["pic:souvenir", "souvenir"]], "Siap berangkat!"),
      pick("ed-m5-q7", "“Where do you want to go?” — jawaban…", ["I want to go to Japan.", "I've been tired.", "It's cheap.", "With my family."], 0, "Where = ke mana → jawab tempat."),
      listenPick("ed-m5-q8", say(["woman", "We booked a hotel near the beach."]), "Dengarkan. Hotelnya di mana?", ["Dekat gunung", "Dekat pantai", "Dekat bandara", "Di kota"], 1, "Near the beach = dekat pantai."),
      pick("ed-m5-q9", "Mana yang bentuknya BENAR?", ["I've never been to Japan.", "I've never go to Japan.", "I never been Japan.", "I've never Japan."], 0, "I've never been to + tempat."),
      pick("ed-m5-q10", "Budget terbatas tapi ingin pemandangan alam dekat Tarakan. Pilihan paling masuk akal…", ["A cheap trip to Derawan island.", "An expensive trip to Japan.", "Stay in the office.", "Buy a passport only."], 0, "Dekat, murah, dan pemandangannya indah.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz Modul 5 — Dream Trip",
    questions: [
      live("ed-m5-live1", "Tempat di gambar?", ["beach", "mountain", "island", "city"], 0, "beach"),
      live("ed-m5-live2", "“Koper” = …", ["suitcase", "suit", "case bag", "pocket"], 0, "suitcase"),
      live("ed-m5-live3", "“Saya pernah ke Bali.”", ["I've been to Bali.", "I've never been to Bali.", "I want Bali.", "I am Bali."], 0, "plane"),
      live("ed-m5-live4", "“Oleh-oleh” = …", ["gift shop", "souvenir", "supper", "sale"], 1, "souvenir"),
      live("ed-m5-live5", "Tempat di gambar?", ["island", "beach", "mountain", "lake"], 2, "mountain"),
      live("ed-m5-live6", "Lawan kata “cheap”?", ["expensive", "expense", "big", "rich"], 0, "money"),
      live("ed-m5-live7", "It's famous ___ its beaches.", ["of", "for", "with", "at"], 1, "island"),
      live("ed-m5-live8", "“Pemandangan” = …", ["view", "vision", "visit", "venue"], 0, "mountain"),
      live("ed-m5-live9", "Benda wajib ke luar negeri?", ["passport", "pillow", "plate", "pencil"], 0, "passport"),
      live("ed-m5-live10", "“Penginapan” = …", ["accommodation", "accident", "account", "action"], 0, "house"),
    ],
  },
};

export const M6: Level = {
  id: "ed-m6",
  title: "Modul 6 — Teknologi & Internet Sehari-hari",
  description: "Awal Fase 2: bercerita tentang kebiasaan memakai internet, HP, dan aplikasi, plus kosakata teknologi dasar.",
  targetScore: "Fase 2 · Kerja",
  cover: ["smartphone", "wifi", "laptop"],
  lessons: [
    {
      id: "ed-m6-l1",
      skill: "speaking",
      title: "Key Phrases: Internet & HP",
      summary: "I use the internet for…, My favorite app is…, My internet is fast/slow…",
      sections: [
        {
          title: "Recall Modul 5",
          blocks: [{ type: "try", question: pair("ed-m6-l1-recall", "Pasangkan.", [["pantai", "beach"], ["penginapan", "hotel"], ["pemandangan", "view"], ["oleh-oleh", "souvenir"]], "Sip, lanjut ke topik teknologi!") }],
        },
        {
          title: "Frasa kunci",
          blocks: [
            phrases([
              ["I use the internet for ___.", "Saya memakai internet untuk ___."],
              ["My favorite app is ___.", "Aplikasi favorit saya ___."],
              ["I spend about ___ hours online every day.", "Saya online sekitar ___ jam per hari."],
              ["I usually ___ on my phone.", "Di HP saya biasanya ___."],
              ["My internet is fast / slow.", "Internet saya cepat / lambat."],
              ["I can't live without ___.", "Saya tidak bisa hidup tanpa ___."],
            ]),
            repeatAfterMe(["I use the internet for social media.", "My favorite app is YouTube.", "I spend about four hours online every day.", "My internet is fast.", "I can't live without my phone."]),
            { type: "tip", md: "Ternyata kita sudah tahu banyak kata Inggris: **download, upload, WiFi, password, online**. Kosakata teknologi itu modal yang sudah kita punya!" },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m6-l1-c1", "“Aplikasi favorit saya WhatsApp.”", ["My favorite app is WhatsApp.", "My app favorite WhatsApp.", "I favorite WhatsApp app.", "WhatsApp is favorite me."], 0, "My favorite app is ___."),
        listenPick("ed-m6-l1-c2", say(["woman", "I spend about six hours online every day."]), "Dengarkan. Berapa jam ia online per hari?", ["4", "5", "6", "16"], 2, "Six = 6."),
        fill("ed-m6-l1-c3", "Lengkapi.", "My internet at home is", "in the evening. (lambat)", ["slow"], "Lambat = slow."),
        arrange("ed-m6-l1-c4", "Susun.", "I use the internet for watching videos", "I use the internet for + kegiatan."),
        pick("ed-m6-l1-c5", "“I can't live without my phone.” Maksudnya…", ["HP sangat penting baginya.", "Ia tidak punya HP.", "HP-nya rusak.", "Ia benci HP."], 0, "Tidak bisa hidup tanpa = sangat bergantung/penting.", { hots: true }),
      ],
    },
    {
      id: "ed-m6-l2",
      skill: "listening",
      title: "Ayo Ngobrol: Hidup Online",
      summary: "Dialog kebiasaan internet dan permainan “Guess the App”.",
      sections: [
        {
          title: "Dengarkan dialognya",
          blocks: [
            dialog("Online every day", say(
              ["woman", "What do you use the internet for the most?"],
              ["man", "I use the internet for social media and watching videos. My favorite app is YouTube. I spend about four hours online every day."],
              ["woman", "My internet at home is sometimes slow in the evening."],
            )),
            { type: "try", question: pick("ed-m6-l2-try", "Kapan internet si wanita kadang lambat?", ["Pagi hari", "Siang hari", "Malam hari", "Setiap saat"], 2, "“…sometimes slow in the evening.”") },
          ],
        },
        {
          title: "Guess the App",
          blocks: [
            { type: "text", md: "Jelaskan aplikasi tanpa menyebut namanya, teman menebak. Contoh: *You watch videos. You can subscribe. It's red.*" },
            { type: "try", question: pick("ed-m6-l2-guess", "“You watch videos. You can subscribe. It's red.” Aplikasi apa?", ["pic:video-app|aplikasi video merah", "pic:chat|aplikasi chat hijau", "pic:calendar|kalender", "pic:clock|jam"], 0, "Video + subscribe + merah = aplikasi video.") },
            phrases([
              ["What's the first app you open every morning?", "WhatsApp, for messages."],
              ["How many hours do you spend on your phone?", "About five hours."],
              ["Is the internet at your home fast or slow?", "It's fast."],
              ["What do you use the internet for at work?", "For email and checking customer data."],
              ["Can you live one day without internet?", "Maybe… but it's hard!"],
            ], ["Pertanyaan", "Contoh jawaban"]),
          ],
        },
      ],
      checkpoint: [
        listenPick("ed-m6-l2-c1", say(["man", "My favorite app is YouTube. I spend about four hours online every day."]), "Dengarkan. Berapa jam ia online?", ["Dua jam", "Empat jam", "Empat belas jam", "Delapan jam"], 1, "Four hours = empat jam."),
        pick("ed-m6-l2-c2", "“You send messages. It's green. It has groups.” Aplikasi apa?", ["pic:chat|aplikasi chat", "pic:video-app|aplikasi video", "pic:report|laporan", "pic:bill|tagihan"], 0, "Pesan + hijau + grup = aplikasi chat."),
        fill("ed-m6-l2-c3", "Lengkapi.", "What's the first app you", "every morning?", ["open"], "Open = membuka."),
        pair("ed-m6-l2-c4", "Pasangkan.", [["fast", "cepat"], ["slow", "lambat"], ["every day", "setiap hari"], ["online", "terhubung internet"]], "Mantap!"),
        pick("ed-m6-l2-c5", "Di kantor, internet paling sering dipakai untuk…", ["Email dan cek data pelanggan", "Nonton film seharian", "Main game", "Tidur"], 0, "Itu pemakaian internet untuk kerja (for work).", { hots: true }),
      ],
    },
    {
      id: "ed-m6-l3",
      skill: "vocabulary",
      title: "Vocab of the Day: Teknologi",
      summary: "Network, signal, speed, download, upload, streaming, data quota, internet package, disconnected, charge, screen.",
      sections: [
        {
          title: "Kosakata hari ini",
          blocks: [
            {
              type: "vocab",
              items: [
                { emoji: "🌐", pic: "wifi", word: "network", meaning: "jaringan", example: "The network is down." },
                { emoji: "📶", pic: "signal", word: "signal", meaning: "sinyal", example: "The signal is weak." },
                { emoji: "⚡", pic: "run", word: "speed", meaning: "kecepatan", example: "The speed is fast." },
                { emoji: "⬇️", pic: "download", word: "download", meaning: "unduh", example: "I download videos at night." },
                { emoji: "⬆️", pic: "upload", word: "upload", meaning: "unggah", example: "I upload photos to Instagram." },
                { emoji: "📺", pic: "video-app", word: "streaming", meaning: "menonton online", example: "We stream movies every weekend." },
                { emoji: "📱", pic: "smartphone", word: "data quota", meaning: "kuota", example: "My data quota is almost finished." },
                { emoji: "📦", pic: "modem", word: "internet package", meaning: "paket internet", example: "I have the 50 Mbps package." },
                { emoji: "❌", pic: "modem-red", word: "disconnected", meaning: "terputus", example: "The internet is disconnected." },
                { emoji: "🔌", pic: "cable", word: "charge", meaning: "mengisi baterai", example: "I charge my phone at night." },
                { emoji: "🖥️", pic: "laptop", word: "screen", meaning: "layar", example: "The screen is broken." },
              ],
            },
            { type: "tip", md: "**50 Mbps** cukup dibaca *fifty Mbps* atau *fifty megabits per second*." },
            phrases([["router", "“ROO-ter” (British) atau “RAU-ter” (American), keduanya benar"]], ["Kata", "Cara baca"]),
          ],
        },
      ],
      checkpoint: [
        pick("ed-m6-l3-c1", "“Kuota saya hampir habis.”", ["My data quota is almost finished.", "My quota data almost finish.", "My data is quota.", "I finished data."], 0, "Kuota = data quota."),
        listenPick("ed-m6-l3-c2", say(["man", "The signal is weak."]), "Dengarkan. Ada masalah apa?", ["pic:signal|Sinyal lemah", "pic:laptop|Layar rusak", "pic:cable|Belum di-charge", "pic:upload|Gagal unggah"], 0, "Signal is weak = sinyal lemah."),
        pair("ed-m6-l3-c3", "Pasangkan.", [["pic:download", "download"], ["pic:upload", "upload"], ["pic:signal", "signal"], ["pic:laptop", "screen"]], "Tech expert!"),
        fill("ed-m6-l3-c4", "Lengkapi.", "I", "my phone at night. (mengisi baterai)", ["charge"], "Mengisi baterai = charge."),
        pick("ed-m6-l3-c5", "Pelanggan bilang “The internet is disconnected.” Artinya internetnya…", ["terputus", "sangat cepat", "baru dipasang", "gratis"], 0, "Disconnected = terputus. Ini kata penting untuk Modul 9!", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ed-m6-quiz",
    title: "Kuis Modul 6",
    passPercent: 70,
    questions: [
      pick("ed-m6-q1", "Ikon ini artinya…", ["download", "upload", "delete", "share"], 0, "Panah ke bawah = download.", { image: "download" }),
      listenPick("ed-m6-q2", say(["woman", "My internet is fast."]), "Dengarkan. Internetnya…", ["Cepat", "Lambat", "Mati", "Mahal"], 0, "Fast = cepat."),
      arrange("ed-m6-q3", "Susun.", "I spend about three hours online every day", "I spend about + jam + online every day."),
      pick("ed-m6-q4", "“Jaringan sedang down.”", ["The network is down.", "The net is fall.", "The network go down.", "Down the network."], 0, "Jaringan = network."),
      fill("ed-m6-q5", "Lengkapi.", "I", "photos to Instagram. (unggah)", ["upload"], "Unggah = upload."),
      pair("ed-m6-q6", "Pasangkan.", [["kecepatan", "speed"], ["layar", "screen"], ["sinyal", "signal"], ["paket internet", "internet package"]], "Bagus!"),
      listenPick("ed-m6-q7", say(["man", "I have the fifty Mbps package."]), "Dengarkan. Paket berapa?", ["15 Mbps", "50 Mbps", "5 Mbps", "500 Mbps"], 1, "Fifty = 50."),
      pick("ed-m6-q8", "“We stream movies every weekend.” artinya…", ["Kami menonton film online setiap akhir pekan.", "Kami membuat film.", "Kami mengunduh film setiap hari.", "Kami ke bioskop."], 0, "Stream = menonton secara online."),
      pick("ed-m6-q9", "Ikon modem dengan lampu merah biasanya berarti…", ["disconnected", "fast", "charging", "streaming"], 0, "Lampu merah = ada gangguan/terputus.", { image: "modem-red" }),
      pick("ed-m6-q10", "HP-mu baterainya habis. Kalimat yang tepat…", ["I need to charge my phone.", "I need to download my phone.", "My phone is streaming.", "My signal is fast."], 0, "Baterai habis → charge.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz Modul 6 — Tech Talk",
    questions: [
      live("ed-m6-live1", "Ikon ini?", ["upload", "download", "delete", "refresh"], 1, "download"),
      live("ed-m6-live2", "“Sinyal lemah” = The signal is …", ["weak", "week", "wake", "walk"], 0, "signal"),
      live("ed-m6-live3", "“Kuota” = …", ["data quota", "data quote", "data credit", "data bill"], 0, "smartphone"),
      live("ed-m6-live4", "Ikon ini?", ["download", "upload", "save", "send"], 1, "upload"),
      live("ed-m6-live5", "“Terputus” = …", ["connected", "disconnected", "discount", "delivered"], 1, "modem-red"),
      live("ed-m6-live6", "Benda di gambar?", ["laptop", "modem", "router cable", "screen saver"], 1, "modem"),
      live("ed-m6-live7", "“Mengisi baterai” = …", ["change", "charge", "chase", "chat"], 1, "cable"),
      live("ed-m6-live8", "I use the internet ___ social media.", ["to", "for", "at", "on"], 1, "chat"),
      live("ed-m6-live9", "“Router” dibaca…", ["“ruter”", "“ROO-ter”", "“rotor”", "“rau-ter-er”"], 1, "modem"),
      live("ed-m6-live10", "“Layar” = …", ["screen", "scream", "scene", "sheet"], 0, "laptop"),
    ],
  },
};
