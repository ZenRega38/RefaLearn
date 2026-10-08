import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, dialog, fill, listenPick, live, pair, phrases, pick, pickMany, repeatAfterMe, say } from "./helpers";

// Modul 9 — Menjelaskan Masalah WiFi Sederhana · Modul 10 — Angka, Harga & Billing

export const M9: Level = {
  id: "ed-m9",
  title: "Modul 9 — Menjelaskan Masalah WiFi Sederhana",
  description: "Roleplay kedua: menanyakan keluhan WiFi, memberi instruksi sederhana (cek lampu, cek kabel, restart modem), dan menjadwalkan kunjungan teknisi.",
  targetScore: "Fase 2 · Kerja",
  cover: ["modem-red", "technician", "wifi"],
  lessons: [
    {
      id: "ed-m9-l1",
      skill: "speaking",
      title: "Key Phrases: Troubleshooting",
      summary: "Menggali masalah, memberi instruksi, tindak lanjut, dan empati.",
      sections: [
        {
          title: "Recall Modul 8",
          blocks: [
            { type: "try", question: pair("ed-m9-l1-recall", "Pasangkan.", [["ramah", "friendly"], ["mohon tunggu", "please wait"], ["salah sambung", "wrong number"], ["layanan", "service"]], "Siap troubleshooting!") },
            { type: "try", question: pick("ed-m9-l1-recall2", "Ulang cepat frasa Modul 8: kembali ke telepon setelah pelanggan menunggu…", ["Thank you for waiting.", "Hang up, please.", "Wrong number.", "Bye!"], 0, "Thank you for waiting.") },
          ],
        },
        {
          title: "Frasa kunci",
          blocks: [
            { type: "pictures", items: [{ pic: "modem", label: "green light" }, { pic: "modem-red", label: "red light" }, { pic: "cable", label: "cable" }, { pic: "technician", label: "technician" }] },
            phrases([
              ["What's the problem?", "Apa masalahnya?", "Menggali"],
              ["Is your internet slow or not connecting at all?", "Internetnya lambat atau sama sekali tidak tersambung?", "Menggali"],
              ["Since when? / Since yesterday.", "Sejak kapan? / Sejak kemarin.", "Menggali"],
              ["Please check the lights on your modem.", "Mohon cek lampu di modem Anda.", "Instruksi"],
              ["Is there a red light?", "Ada lampu merah?", "Instruksi"],
              ["Please turn off the modem, wait one minute, and turn it on again.", "Mohon matikan modem, tunggu satu menit, lalu nyalakan lagi.", "Instruksi"],
              ["Please check if the cable is connected.", "Mohon cek apakah kabelnya tersambung.", "Instruksi"],
              ["Our technician will visit you on ___.", "Teknisi kami akan berkunjung pada ___.", "Tindak lanjut"],
              ["Is that okay for you?", "Apakah itu cocok untuk Anda?", "Konfirmasi"],
              ["I'm sorry for the inconvenience.", "Mohon maaf atas ketidaknyamanannya.", "Empati"],
            ]),
            repeatAfterMe(["What's the problem?", "Since when?", "Is there a red light?", "Please turn off the modem, wait one minute, and turn it on again.", "Our technician will visit you tomorrow."]),
            { type: "tip", md: "Untuk pelanggan awam, **kata sederhana lebih baik**: *modem, red light, restart, technician*. Kalau kantor punya skrip SOP resmi, ikuti skrip itu." },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m9-l1-c1", "“Sejak kapan?”", ["Since when?", "From what?", "How long ago?", "When since?"], 0, "Since when? = sejak kapan?"),
        listenPick("ed-m9-l1-c2", say(["woman", "Is there a red light?"]), "Dengarkan. Staf menanyakan…", ["pic:modem-red|Lampu merah di modem", "pic:cable|Kabel", "pic:technician|Teknisi", "pic:bill|Tagihan"], 0, "Red light = lampu merah."),
        arrange("ed-m9-l1-c3", "Susun instruksinya.", "Please check if the cable is connected", "Please check if + kondisi."),
        fill("ed-m9-l1-c4", "Lengkapi.", "Please turn", "the modem, wait one minute, and turn it on again.", ["off"], "Turn off = matikan, turn on = nyalakan."),
        pick("ed-m9-l1-c5", "Urutan troubleshooting yang paling logis…", ["Tanya masalah → cek lampu → restart → jadwalkan teknisi", "Jadwalkan teknisi → tanya masalah → tutup telepon", "Restart → tutup telepon → tanya masalah", "Kirim teknisi tanpa bertanya"], 0, "Gali masalah dulu, coba solusi sederhana, baru kirim teknisi kalau perlu.", { hots: true }),
      ],
    },
    {
      id: "ed-m9-l2",
      skill: "listening",
      title: "Roleplay: Internet Mati",
      summary: "Model dialog troubleshooting dan lima kartu skenario.",
      sections: [
        {
          title: "Dengarkan model dialog",
          blocks: [
            dialog("Not connecting", say(
              ["woman", "Good afternoon, IndiHome Tarakan. How can I help you?"],
              ["man", "My internet is not connecting since yesterday."],
              ["woman", "I'm sorry for the inconvenience. Is there a red light on your modem?"],
              ["man", "Yes, there is a red light."],
              ["woman", "Please check if the cable is connected. If it's still red, please turn off the modem, wait one minute, and turn it on again."],
              ["man", "I tried it, but it's still red."],
              ["woman", "Okay. Our technician will visit you tomorrow at ten o'clock. Is that okay for you?"],
              ["man", "Yes, that's fine. Thank you."],
            )),
            { type: "try", question: pick("ed-m9-l2-try", "Kapan teknisi akan datang?", ["Hari ini jam 10", "Besok jam 10", "Besok jam 2", "Lusa"], 1, "“…tomorrow at ten o'clock.”") },
          ],
        },
        {
          title: "Kartu skenario",
          blocks: [
            { type: "text", md: "Latih bersama pasangan, tukar peran tiap skenario:\n\n1. Internet lambat di malam hari.\n2. Internet mati total, lampu merah di modem.\n3. WiFi ada tapi tidak bisa buka aplikasi tertentu.\n4. Pelanggan minta teknisi datang di hari Minggu.\n5. Pelanggan lupa password WiFi." },
            { type: "try", question: pick("ed-m9-l2-card", "Skenario 5: pelanggan lupa password. Pertanyaan pembuka yang pas…", ["What's the problem?", "Your bill is 350,000 rupiah.", "Have a nice day!", "Where do you want to go?"], 0, "Selalu mulai dengan menggali masalahnya.") },
          ],
        },
      ],
      checkpoint: [
        listenPick("ed-m9-l2-c1", say(["man", "My internet is not connecting since yesterday."]), "Dengarkan. Sejak kapan internetnya mati?", ["Sejak tadi pagi", "Sejak kemarin", "Sejak minggu lalu", "Baru saja"], 1, "Since yesterday = sejak kemarin."),
        pick("ed-m9-l2-c2", "Pelanggan sudah restart tapi lampu tetap merah. Langkah berikutnya…", ["Our technician will visit you tomorrow. Is that okay for you?", "Please restart again 10 times.", "Sorry, wrong number.", "Your payment has been received."], 0, "Masalah belum selesai → jadwalkan teknisi."),
        fill("ed-m9-l2-c3", "Lengkapi.", "Is that okay", "you?", ["for"], "Is that okay for you?"),
        pickMany("ed-m9-l2-c4", "Pilih SEMUA instruksi yang muncul di dialog.", ["Check the cable", "Turn off the modem and turn it on again", "Pay the bill", "Change the password"], [0, 1], "Cek kabel dan restart modem."),
        pick("ed-m9-l2-c5", "Pelanggan minta teknisi datang hari Minggu, padahal teknisi libur. Jawaban yang sopan…", ["I'm sorry, our technician can visit you on Monday. Is that okay for you?", "No. Bye.", "Sunday is impossible, sorry not sorry.", "Please fix it yourself."], 0, "Minta maaf, beri alternatif, lalu konfirmasi.", { hots: true }),
      ],
    },
    {
      id: "ed-m9-l3",
      skill: "vocabulary",
      title: "Vocab of the Day: WiFi & Teknisi",
      summary: "Modem, cable, indicator light, on/off, restart, technician, visit, outage, slow, keeps disconnecting, password, coverage, schedule.",
      sections: [
        {
          title: "Kosakata hari ini",
          blocks: [
            {
              type: "vocab",
              items: [
                { emoji: "📡", pic: "modem", word: "modem", meaning: "modem", example: "Please restart your modem." },
                { emoji: "🔌", pic: "cable", word: "cable", meaning: "kabel", example: "The cable is loose." },
                { emoji: "🔴", pic: "modem-red", word: "indicator light", meaning: "lampu indikator", example: "The light is red." },
                { emoji: "💡", pic: "signal", word: "on / off", meaning: "menyala / mati", example: "The light is off." },
                { emoji: "🔄", pic: "modem", word: "restart", meaning: "mulai ulang", example: "Please restart your router." },
                { emoji: "👷", pic: "technician", word: "technician", meaning: "teknisi", example: "The technician will come tomorrow." },
                { emoji: "🏠", pic: "house", word: "visit", meaning: "kunjungan", example: "We will schedule a visit." },
                { emoji: "⚠️", pic: "customer-angry", word: "disruption / outage", meaning: "gangguan", example: "There is an outage in your area." },
                { emoji: "🐢", pic: "feel-sleepy", word: "slow", meaning: "lambat", example: "The connection is slow." },
                { emoji: "📴", pic: "wifi", word: "keeps disconnecting", meaning: "putus-putus", example: "The internet keeps disconnecting." },
                { emoji: "🔑", pic: "smartphone", word: "password", meaning: "kata sandi", example: "What's your WiFi password?" },
                { emoji: "📶", pic: "signal", word: "coverage / range", meaning: "jangkauan", example: "The coverage is weak in the bedroom." },
                { emoji: "🗓️", pic: "calendar", word: "schedule", meaning: "jadwal", example: "Let me check the schedule." },
              ],
            },
            phrases([["technician", "“tek-NISH-un”, bukan “teknisian”", "Tekanan di suku kata kedua"]], ["Kata", "Lebih tepat", "Catatan"]),
            repeatAfterMe(["technician", "outage", "schedule", "restart"]),
          ],
        },
      ],
      checkpoint: [
        pick("ed-m9-l3-c1", "“Gangguan” jaringan = …", ["outage", "outside", "output", "outlet"], 0, "Gangguan = outage / disruption."),
        listenPick("ed-m9-l3-c2", say(["woman", "The internet keeps disconnecting."]), "Dengarkan. Masalahnya…", ["Internet putus-putus", "Internet sangat cepat", "Tagihan mahal", "Lupa password"], 0, "Keeps disconnecting = putus-putus."),
        pair("ed-m9-l3-c3", "Pasangkan.", [["pic:technician", "technician"], ["pic:cable", "cable"], ["pic:calendar", "schedule"], ["pic:modem-red", "red light"]], "Tech support pro!"),
        fill("ed-m9-l3-c4", "Lengkapi.", "Let me check the", ". (jadwal)", ["schedule"], "Jadwal = schedule."),
        pick("ed-m9-l3-c5", "“The coverage is weak in the bedroom.” Solusi yang masuk akal…", ["Move the modem closer to the bedroom.", "Pay the bill.", "Turn off the TV.", "Buy a passport."], 0, "Jangkauan lemah → dekatkan modem/router.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ed-m9-quiz",
    title: "Kuis Modul 9",
    passPercent: 70,
    questions: [
      pick("ed-m9-q1", "Modem di gambar menunjukkan…", ["a red light", "a green light", "no cable", "a new password"], 0, "Lampu merah menyala.", { image: "modem-red" }),
      listenPick("ed-m9-q2", say(["woman", "Is your internet slow or not connecting at all?"]), "Dengarkan. Staf sedang…", ["Menggali masalah", "Menjadwalkan teknisi", "Menutup telepon", "Menjelaskan tagihan"], 0, "Pertanyaan menggali masalah."),
      arrange("ed-m9-q3", "Susun.", "Our technician will visit you tomorrow", "Our technician will visit you + waktu."),
      pick("ed-m9-q4", "“Matikan modem” = …", ["Turn off the modem.", "Turn on the modem.", "Turn the modem.", "Off modem turn."], 0, "Turn off = matikan."),
      fill("ed-m9-q5", "Lengkapi.", "What's your WiFi", "? (kata sandi)", ["password"], "Kata sandi = password."),
      pair("ed-m9-q6", "Pasangkan.", [["lambat", "slow"], ["teknisi", "technician"], ["kunjungan", "visit"], ["jangkauan", "coverage"]], "Mantap!"),
      listenPick("ed-m9-q7", say(["man", "There is an outage in your area."]), "Dengarkan. Ada apa?", ["Gangguan di area pelanggan", "Promo baru", "Teknisi libur", "Tagihan lunas"], 0, "Outage = gangguan."),
      pick("ed-m9-q8", "“Is that okay for you?” dipakai untuk…", ["Konfirmasi jadwal ke pelanggan", "Membuka telepon", "Minta nama", "Menutup telepon"], 0, "Konfirmasi setelah menawarkan jadwal."),
      pick("ed-m9-q9", "Instruksi yang paling SEDERHANA untuk pelanggan awam…", ["Please restart your modem.", "Please reconfigure the ONT VLAN settings.", "Please update the firmware via SSH.", "Please check the DNS resolver."], 0, "Pakai kata sederhana: restart, modem, red light.", { hots: true }),
      pick("ed-m9-q10", "Pelanggan: “WiFi ada, tapi aplikasi tertentu tidak bisa dibuka.” Pertanyaan menggali yang tepat…", ["Which app can't you open? Since when?", "Is there a red light? Then the internet is dead.", "Your bill is overdue.", "Have a nice day!"], 0, "Gali detail: aplikasi apa dan sejak kapan.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz Modul 9 — WiFi Rescue",
    questions: [
      live("ed-m9-live1", "Lampu modem di gambar?", ["green", "red", "blue", "off"], 1, "modem-red"),
      live("ed-m9-live2", "“Teknisi” = …", ["technician", "technique", "technology", "teacher"], 0, "technician"),
      live("ed-m9-live3", "“Sejak kemarin” = Since …", ["yesterday", "tomorrow", "today", "last"], 0, "calendar"),
      live("ed-m9-live4", "“Matikan” modem = turn …", ["on", "off", "up", "in"], 1, "modem"),
      live("ed-m9-live5", "“Gangguan” = …", ["outage", "output", "outside", "outfit"], 0, "wifi"),
      live("ed-m9-live6", "Benda di gambar?", ["cable", "rope", "hose", "wire fence"], 0, "cable"),
      live("ed-m9-live7", "“Putus-putus” = keeps …", ["disconnecting", "discounting", "discovering", "distracting"], 0, "signal"),
      live("ed-m9-live8", "“Jadwal” = …", ["schedule", "school", "scheme", "shuttle"], 0, "calendar"),
      live("ed-m9-live9", "Konfirmasi jadwal: Is that okay ___ you?", ["to", "for", "at", "with"], 1, "clock"),
      live("ed-m9-live10", "“Technician” dibaca…", ["“teknisian”", "“tek-NISH-un”", "“TEK-ni-shun”", "“tech-ni-cian”"], 1, "technician"),
    ],
  },
};

export const M10: Level = {
  id: "ed-m10",
  title: "Modul 10 — Angka, Harga & Billing Sederhana",
  description: "Sesi puncak: angka sampai jutaan, menyebut harga rupiah, menjelaskan tagihan sederhana, dan review besar 10 modul.",
  targetScore: "Fase 2 · Kerja",
  cover: ["money", "bill", "trophy"],
  lessons: [
    {
      id: "ed-m10-l1",
      skill: "vocabulary",
      title: "Angka & Harga Rupiah",
      summary: "1–20, puluhan, ratusan, ribuan, jutaan, dan pola harga “… thousand rupiah”.",
      sections: [
        {
          title: "Bangun angka pelan-pelan",
          blocks: [
            { type: "vocab", items: [
              { emoji: "1️⃣", pic: "num-11", word: "eleven", meaning: "11" },
              { emoji: "1️⃣", pic: "num-12", word: "twelve", meaning: "12" },
              { emoji: "1️⃣", pic: "num-15", word: "fifteen", meaning: "15" },
              { emoji: "2️⃣", pic: "num-20", word: "twenty", meaning: "20" },
            ] },
            phrases([
              ["twenty, thirty, forty, fifty", "20, 30, 40, 50"],
              ["sixty, seventy, eighty, ninety", "60, 70, 80, 90"],
              ["one hundred, two hundred, five hundred", "100, 200, 500"],
              ["one thousand, ten thousand", "1.000, 10.000"],
              ["one hundred thousand", "100.000 (seratus ribu)"],
              ["one million", "1.000.000"],
            ], ["English", "Angka"]),
            repeatAfterMe(["thirteen, thirty", "fourteen, forty", "fifteen, fifty", "one hundred", "one thousand", "one million"]),
            { type: "warning", md: "Hati-hati **-teen** vs **-ty**: fif**TEEN** (15) ditekan di belakang, **FIF**ty (50) ditekan di depan." },
          ],
        },
        {
          title: "Pola harga rupiah",
          blocks: [
            { type: "pictures", items: [{ pic: "money", label: "rupiah" }, { pic: "bill", label: "Rp 350.000" }] },
            phrases([
              ["150.000", "one hundred fifty thousand rupiah"],
              ["350.000", "three hundred fifty thousand rupiah"],
              ["1.500.000", "one million five hundred thousand rupiah"],
            ], ["Angka", "Cara baca"]),
            repeatAfterMe(["one hundred fifty thousand rupiah", "three hundred fifty thousand rupiah", "one million five hundred thousand rupiah"]),
            { type: "tip", md: "Fokus ke pola **ratusan + thousand**, karena paling sering muncul di tagihan. Tidak perlu hafal semua angka besar." },
            phrases([["thousand", "“THAU-zund”, bukan “tousen”"]], ["Kata", "Lebih tepat"]),
          ],
        },
      ],
      checkpoint: [
        listenPick("ed-m10-l1-c1", say(["woman", "Fifty."]), "Dengarkan. Angka berapa?", ["15", "50", "5", "500"], 1, "FIFty = 50 (tekanan di depan)."),
        pick("ed-m10-l1-c2", "Rp 250.000 dibaca…", ["two hundred fifty thousand rupiah", "twenty-five thousand rupiah", "two million fifty rupiah", "two fifty rupiah thousand"], 0, "250 + thousand."),
        fill("ed-m10-l1-c3", "Lengkapi.", "1.000.000 = one", "", ["million"], "1.000.000 = one million."),
        pair("ed-m10-l1-c4", "Pasangkan.", [["forty", "40"], ["fourteen", "14"], ["ninety", "90"], ["nineteen", "19"]], "Teen vs ty sudah lancar!"),
        listenPick("ed-m10-l1-c5", say(["man", "Three hundred fifty thousand rupiah."]), "Dengarkan. Berapa harganya?", ["Rp 3.050.000", "Rp 350.000", "Rp 35.000", "Rp 300.050"], 1, "Three hundred fifty thousand = 350.000.", true),
      ],
    },
    {
      id: "ed-m10-l2",
      skill: "listening",
      title: "Key Phrases Billing & Roleplay",
      summary: "Menyebut tagihan, jatuh tempo, cara bayar, tunggakan, dan model dialog billing.",
      sections: [
        {
          title: "Frasa billing",
          blocks: [
            phrases([
              ["Your bill this month is ___ rupiah.", "Tagihan Anda bulan ini ___ rupiah."],
              ["The due date is the ___ of every month.", "Jatuh tempo tanggal ___ setiap bulan."],
              ["You can pay through ___ (bank / app / counter).", "Anda bisa bayar melalui ___."],
              ["Your payment has been received.", "Pembayaran Anda sudah kami terima."],
              ["You have an overdue payment of ___.", "Anda memiliki tunggakan sebesar ___."],
              ["Please pay before ___ to avoid suspension.", "Mohon bayar sebelum ___ agar tidak diisolir."],
              ["Would you like me to send the invoice by WhatsApp?", "Apakah mau saya kirim tagihannya lewat WhatsApp?"],
            ]),
            repeatAfterMe(["Your bill this month is three hundred fifty thousand rupiah.", "The due date is the twentieth of every month.", "You can pay through the bank, an app, or at our counter.", "Your payment has been received."]),
          ],
        },
        {
          title: "Model dialog",
          blocks: [
            dialog("Asking about the bill", say(
              ["woman", "Good morning, IndiHome Tarakan. How can I help you?"],
              ["man", "I want to ask about my bill."],
              ["woman", "Sure. May I have your name, please?"],
              ["man", "Hasan."],
              ["woman", "Thank you, Mr. Hasan. Your bill this month is three hundred fifty thousand rupiah. The due date is the twentieth. You can pay through the bank, an app, or at our counter."],
              ["man", "Okay, I will pay tomorrow."],
              ["woman", "Thank you. Is there anything else I can help you with?"],
            )),
            { type: "try", question: pick("ed-m10-l2-try", "Berapa tagihan Pak Hasan?", ["Rp 150.000", "Rp 350.000", "Rp 300.500", "Rp 3.500.000"], 1, "Three hundred fifty thousand rupiah = Rp 350.000.") },
            { type: "text", md: "**Skenario roleplay:**\n1. Pelanggan bertanya tagihan bulan ini.\n2. Pelanggan terlambat bayar, staf mengingatkan dengan sopan.\n3. Pelanggan sudah bayar tapi status belum berubah: *Could you send the proof of payment, please?*\n4. Pelanggan protes tagihan terlalu besar: staf menjelaskan dan minta maaf." },
            { type: "tip", md: "Semua contoh tagihan di sini **fiktif**. Sesuaikan frasa isolir, denda, dan metode bayar dengan kebijakan resmi kantor." },
          ],
        },
      ],
      checkpoint: [
        listenPick("ed-m10-l2-c1", say(["woman", "The due date is the twentieth of every month."]), "Dengarkan. Jatuh temponya tanggal…", ["2", "12", "20", "22"], 2, "The twentieth = tanggal 20."),
        pick("ed-m10-l2-c2", "“Pembayaran Anda sudah kami terima.”", ["Your payment has been received.", "Your payment is receive.", "We received you pay.", "Payment you received."], 0, "Your payment has been received."),
        fill("ed-m10-l2-c3", "Lengkapi.", "Could you send the proof of", ", please?", ["payment"], "Proof of payment = bukti pembayaran."),
        pickMany("ed-m10-l2-c4", "Pilih SEMUA cara bayar yang disebut di dialog.", ["bank", "app", "counter", "cash on delivery"], [0, 1, 2], "Bank, app, atau counter."),
        pick("ed-m10-l2-c5", "Pelanggan terlambat bayar. Cara mengingatkan yang sopan…", ["You have an overdue payment of 350,000 rupiah. Please pay before the 25th to avoid suspension.", "Pay now or we cut your internet!", "Why didn't you pay?!", "Your internet is free."], 0, "Sebut jumlah, tenggat, dan akibatnya dengan sopan.", { hots: true }),
      ],
    },
    {
      id: "ed-m10-l3",
      skill: "vocabulary",
      title: "Vocab of the Day & Review Besar",
      summary: "Amount, proof of payment, suspended, late fee, paid in full, unpaid, bank transfer, counter, account, change, discount, package. Plus review 10 modul.",
      sections: [
        {
          title: "Kosakata hari ini",
          blocks: [
            {
              type: "vocab",
              items: [
                { emoji: "💰", pic: "money", word: "amount / total", meaning: "jumlah / total", example: "The total amount is 350,000 rupiah." },
                { emoji: "🧾", pic: "receipt", word: "proof of payment", meaning: "bukti pembayaran", example: "Please send the proof of payment." },
                { emoji: "⛔", pic: "modem-red", word: "suspended", meaning: "diisolir", example: "Your service will be suspended." },
                { emoji: "⏰", pic: "alarm", word: "late fee / penalty", meaning: "denda", example: "There is a late fee." },
                { emoji: "✅", pic: "receipt", word: "paid in full", meaning: "lunas", example: "Your bill is paid in full." },
                { emoji: "❗", pic: "bill", word: "unpaid", meaning: "belum dibayar", example: "This bill is unpaid." },
                { emoji: "🏦", pic: "smartphone", word: "bank transfer", meaning: "transfer bank", example: "You can pay by bank transfer." },
                { emoji: "🏪", pic: "office", word: "counter / cashier", meaning: "kasir / loket", example: "You can pay at our counter." },
                { emoji: "🔢", pic: "report", word: "account", meaning: "rekening", example: "Please check your account number." },
                { emoji: "🪙", pic: "money", word: "change", meaning: "kembalian", example: "Here is your change." },
                { emoji: "🏷️", pic: "souvenir", word: "discount / promotion", meaning: "diskon / promo", example: "We have a promotion this month." },
                { emoji: "📦", pic: "wifi", word: "package", meaning: "paket", example: "You have the 30 Mbps package." },
              ],
            },
          ],
        },
        {
          title: "Review besar 10 modul",
          blocks: [
            { type: "pictures", items: [{ pic: "owl-cheer", label: "You did it!" }], caption: "Great job, everyone! Pilih 3 kata yang paling berguna untukmu dan pakai minggu ini." },
            { type: "try", question: pair("ed-m10-l3-review1", "Review Modul 1–5.", [["rekan kerja", "colleague"], ["macet", "traffic jam"], ["gurih", "savory"], ["oleh-oleh", "souvenir"]], "Mantap!") },
            { type: "try", question: pair("ed-m10-l3-review2", "Review Modul 6–9.", [["kuota", "data quota"], ["tunggakan", "overdue payment"], ["salah sambung", "wrong number"], ["gangguan", "outage"]], "Kamu sudah sejauh ini. Hebat!") },
            { type: "text", md: "Coba sebutkan satu hal yang sekarang sudah kamu bisa: *I can introduce myself.* · *I can say my bill.* · *I can help a customer on the phone.*" },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m10-l3-c1", "“Lunas” = …", ["paid in full", "unpaid", "late fee", "suspended"], 0, "Lunas = paid in full."),
        listenPick("ed-m10-l3-c2", say(["woman", "Your service will be suspended."]), "Dengarkan. Layanannya akan…", ["Diisolir", "Diperbaiki", "Diberi diskon", "Dipasang"], 0, "Suspended = diisolir."),
        pair("ed-m10-l3-c3", "Pasangkan.", [["denda", "late fee"], ["kembalian", "change"], ["rekening", "account"], ["kasir", "cashier"]], "Billing expert!"),
        fill("ed-m10-l3-c4", "Lengkapi.", "We have a", "this month. (promo)", ["promotion", "promo", "discount"], "Promo = promotion."),
        pick("ed-m10-l3-c5", "Pelanggan protes tagihannya Rp 500.000 padahal paketnya Rp 350.000. Respons terbaik…", ["I'm sorry for the inconvenience. Let me check that for you. There may be a late fee from last month.", "That's your problem.", "Please pay 500,000 now.", "Have a nice day!"], 0, "Empati, cek, lalu jelaskan kemungkinan penyebabnya.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ed-m10-quiz",
    title: "Kuis Modul 10 (Review Besar)",
    passPercent: 70,
    questions: [
      listenPick("ed-m10-q1", say(["man", "One hundred fifty thousand rupiah."]), "Dengarkan. Berapa?", ["Rp 115.000", "Rp 150.000", "Rp 1.500.000", "Rp 50.000"], 1, "One hundred fifty thousand = 150.000."),
      pick("ed-m10-q2", "Rp 1.500.000 dibaca…", ["one million five hundred thousand rupiah", "fifteen thousand rupiah", "one thousand five hundred rupiah", "one million fifty rupiah"], 0, "1 million + 500 thousand.", { image: "money" }),
      fill("ed-m10-q3", "Lengkapi.", "Your bill this month", "350,000 rupiah.", ["is"], "Your bill this month is ___."),
      pick("ed-m10-q4", "“Mohon bayar sebelum tanggal 20 agar tidak diisolir.”", ["Please pay before the 20th to avoid suspension.", "Please pay after the 20th for suspension.", "Pay 20 to suspend.", "Please suspend before the 20th."], 0, "Before = sebelum, avoid suspension = agar tidak diisolir."),
      pair("ed-m10-q5", "Review modul-modul sebelumnya.", [["pelanggan", "customer"], ["lembur", "overtime"], ["teknisi", "technician"], ["jatuh tempo", "due date"]], "Review besar lulus!"),
      arrange("ed-m10-q6", "Susun.", "You can pay at our counter", "You can pay at/through + tempat bayar."),
      listenPick("ed-m10-q7", say(["woman", "Would you like me to send the invoice by WhatsApp?"]), "Dengarkan. Staf menawarkan…", ["pic:chat|Kirim tagihan lewat WhatsApp", "pic:technician|Kirim teknisi", "pic:money|Diskon", "pic:modem|Modem baru"], 0, "Send the invoice by WhatsApp."),
      pick("ed-m10-q8", "Gambar ini paling cocok dengan kalimat…", ["Your payment has been received.", "Your service is suspended.", "There is a red light.", "The signal is weak."], 0, "Tanda centang pada tagihan = pembayaran diterima/lunas.", { image: "receipt" }),
      pick("ed-m10-q9", "Mana yang BUKAN frasa billing?", ["The due date is the 20th.", "You have an overdue payment.", "Please turn off the modem.", "Your bill is paid in full."], 2, "Turn off the modem adalah instruksi WiFi (Modul 9)."),
      pick("ed-m10-q10", "Pelanggan bilang sudah bayar tapi status masih “unpaid”. Kalimat yang tepat…", ["Could you send the proof of payment, please?", "You didn't pay, sorry.", "Please pay again.", "Your service is suspended now."], 0, "Minta bukti pembayaran untuk dicek.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz Modul 10 — Grand Final!",
    questions: [
      live("ed-m10-live1", "“Fifty” = …", ["15", "50", "500", "5"], 1, "money"),
      live("ed-m10-live2", "Rp 350.000 = …", ["three hundred fifty thousand", "thirty-five thousand", "three million fifty", "three fifty"], 0, "bill"),
      live("ed-m10-live3", "“Lunas” = …", ["paid in full", "fully paid off fee", "unpaid", "pay full in"], 0, "receipt"),
      live("ed-m10-live4", "“Denda” = …", ["late fee", "late free", "lately", "fine dining"], 0, "alarm"),
      live("ed-m10-live5", "“Diisolir” = …", ["suspended", "suspected", "supported", "suspicious"], 0, "modem-red"),
      live("ed-m10-live6", "“Bukti pembayaran” = proof of …", ["payment", "paying", "pay", "paid"], 0, "receipt"),
      live("ed-m10-live7", "1.000.000 = one …", ["thousand", "million", "billion", "hundred"], 1, "money"),
      live("ed-m10-live8", "Review: “Teknisi” = …", ["technician", "technical", "tech man", "teacher"], 0, "technician"),
      live("ed-m10-live9", "Review: “Pelanggan” = …", ["colleague", "customer", "custom", "costumer"], 1, "customer"),
      live("ed-m10-live10", "Kalimat penutup terbaik?", ["Thank you for contacting us. Have a nice day!", "Bye, finish.", "Close the phone.", "Okay, stop."], 0, "trophy"),
    ],
  },
};
