import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, dialog, fill, listenPick, live, pair, phrases, pick, pickMany, repeatAfterMe, say } from "./helpers";

// Module 9 — Explaining Simple WiFi Problems · Module 10 — Numbers, Prices & Billing
// Questions, options and titles are all English; explanations stay Indonesian.

export const M9: Level = {
  id: "ed-m9",
  title: "Module 9 — Explaining Simple WiFi Problems",
  description: "Roleplay kedua: menanyakan keluhan WiFi, memberi instruksi sederhana (cek lampu, cek kabel, restart modem), dan menjadwalkan kunjungan teknisi.",
  targetScore: "Phase 2 · Work",
  cover: ["modem-red", "technician", "wifi"],
  lessons: [
    {
      id: "ed-m9-l1",
      skill: "speaking",
      title: "Key Phrases: Troubleshooting",
      summary: "Menggali masalah, memberi instruksi, tindak lanjut, dan empati.",
      sections: [
        {
          title: "Module 8 Recall",
          blocks: [
            { type: "try", question: pair("ed-m9-l1-recall", "Module 8 words: match each clue with its word.", [["kind and warm to people", "friendly"], ["ask someone not to go yet", "please wait"], ["the caller dialed the wrong office", "wrong number"], ["the help a company gives", "service"]], "Siap troubleshooting!") },
            { type: "try", question: pick("ed-m9-l1-recall2", "Module 8 phrase: you come back to the call after the customer waited. You say…", ["Thank you for waiting.", "Hang up, please.", "Wrong number.", "Bye!"], 0, "Thank you for waiting.") },
          ],
        },
        {
          title: "Key Phrases",
          blocks: [
            { type: "pictures", items: [{ pic: "modem", label: "green light" }, { pic: "modem-red", label: "red light" }, { pic: "cable", label: "cable" }, { pic: "technician", label: "technician" }] },
            phrases([
              ["What's the problem?", "Apa masalahnya?", "Finding the problem"],
              ["Is your internet slow or not connecting at all?", "Internetnya lambat atau sama sekali tidak tersambung?", "Finding the problem"],
              ["Since when? / Since yesterday.", "Sejak kapan? / Sejak kemarin.", "Finding the problem"],
              ["Please check the lights on your modem.", "Mohon cek lampu di modem Anda.", "Giving instructions"],
              ["Is there a red light?", "Ada lampu merah?", "Giving instructions"],
              ["Please turn off the modem, wait one minute, and turn it on again.", "Mohon matikan modem, tunggu satu menit, lalu nyalakan lagi.", "Giving instructions"],
              ["Please check if the cable is connected.", "Mohon cek apakah kabelnya tersambung.", "Giving instructions"],
              ["Our technician will visit you on ___.", "Teknisi kami akan berkunjung pada ___.", "Follow-up"],
              ["Is that okay for you?", "Apakah itu cocok untuk Anda?", "Confirming"],
              ["I'm sorry for the inconvenience.", "Mohon maaf atas ketidaknyamanannya.", "Empathy"],
            ]),
            repeatAfterMe(["What's the problem?", "Since when?", "Is there a red light?", "Please turn off the modem, wait one minute, and turn it on again.", "Our technician will visit you tomorrow."]),
            { type: "tip", md: "Untuk pelanggan awam, **kata sederhana lebih baik**: *modem, red light, restart, technician*. Kalau kantor punya skrip SOP resmi, ikuti skrip itu." },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m9-l1-c1", "You want to know when the problem started. You ask…", ["Since when?", "From what?", "How long ago?", "When since?"], 0, "Since when? = sejak kapan?"),
        listenPick("ed-m9-l1-c2", say(["woman", "Is there a red light?"]), "Listen. What is the staff member asking about?", ["pic:modem-red|A red light on the modem", "pic:cable|The cable", "pic:technician|The technician", "pic:bill|The bill"], 0, "Red light = lampu merah."),
        arrange("ed-m9-l1-c3", "Put the words in order to give an instruction.", "Please check if the cable is connected", "Please check if + kondisi."),
        fill("ed-m9-l1-c4", "Complete the instruction to restart the modem.", "Please turn", "the modem, wait one minute, and turn it on again.", ["off"], "Turn off = matikan, turn on = nyalakan."),
        pick("ed-m9-l1-c5", "What is the most logical troubleshooting order?", ["Ask about the problem → check the lights → restart → book a technician", "Book a technician → ask about the problem → end the call", "Restart → end the call → ask about the problem", "Send a technician without asking anything"], 0, "Gali masalah dulu, coba solusi sederhana, baru kirim teknisi kalau perlu.", { hots: true }),
      ],
    },
    {
      id: "ed-m9-l2",
      skill: "listening",
      title: "Roleplay: The Internet Is Down",
      summary: "Model dialog troubleshooting dan lima kartu skenario.",
      sections: [
        {
          title: "Listen to the Model Call",
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
            { type: "try", question: pick("ed-m9-l2-try", "When will the technician come?", ["Today at 10", "Tomorrow at 10", "Tomorrow at 2", "In two days"], 1, "“…tomorrow at ten o'clock.”") },
          ],
        },
        {
          title: "Scenario Cards",
          blocks: [
            { type: "text", md: "Latih bersama pasangan, tukar peran tiap skenario:\n\n1. Internet lambat di malam hari.\n2. Internet mati total, lampu merah di modem.\n3. WiFi ada tapi tidak bisa buka aplikasi tertentu.\n4. Pelanggan minta teknisi datang di hari Minggu.\n5. Pelanggan lupa password WiFi." },
            { type: "try", question: pick("ed-m9-l2-card", "Card 5: the customer forgot the WiFi password. What is a good first question?", ["What's the problem?", "Your bill is 350,000 rupiah.", "Have a nice day!", "Where do you want to go?"], 0, "Selalu mulai dengan menggali masalahnya.") },
          ],
        },
      ],
      checkpoint: [
        listenPick("ed-m9-l2-c1", say(["man", "My internet is not connecting since yesterday."]), "Listen. Since when has the internet been down?", ["Since this morning", "Since yesterday", "Since last week", "Just now"], 1, "Since yesterday = sejak kemarin."),
        pick("ed-m9-l2-c2", "The customer restarted the modem, but the light is still red. What do you say next?", ["Our technician will visit you tomorrow. Is that okay for you?", "Please restart again 10 times.", "Sorry, wrong number.", "Your payment has been received."], 0, "Masalah belum selesai → jadwalkan teknisi."),
        fill("ed-m9-l2-c3", "Complete the question to confirm the time.", "Is that okay", "you?", ["for"], "Is that okay for you?"),
        pickMany("ed-m9-l2-c4", "Choose ALL the instructions in the dialogue.", ["Check the cable", "Turn off the modem and turn it on again", "Pay the bill", "Change the password"], [0, 1], "Cek kabel dan restart modem."),
        pick("ed-m9-l2-c5", "The customer wants a technician on Sunday, but technicians don't work on Sunday. What is a polite answer?", ["I'm sorry, our technician can visit you on Monday. Is that okay for you?", "No. Bye.", "Sunday is impossible, sorry not sorry.", "Please fix it yourself."], 0, "Minta maaf, beri alternatif, lalu konfirmasi.", { hots: true }),
      ],
    },
    {
      id: "ed-m9-l3",
      skill: "vocabulary",
      title: "Vocab of the Day: WiFi & Technicians",
      summary: "Modem, cable, indicator light, on/off, restart, technician, visit, outage, slow, keeps disconnecting, password, coverage, schedule.",
      sections: [
        {
          title: "Today's Words",
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
            phrases([["technician", "“tek-NISH-un”, bukan “teknisian”", "Tekanan di suku kata kedua"]], ["Word", "Say it like", "Note"]),
            repeatAfterMe(["technician", "outage", "schedule", "restart"]),
          ],
        },
      ],
      checkpoint: [
        pick("ed-m9-l3-c1", "The whole area has no internet because of a network problem. It's an…", ["outage", "outside", "output", "outlet"], 0, "Gangguan = outage / disruption."),
        listenPick("ed-m9-l3-c2", say(["woman", "The internet keeps disconnecting."]), "Listen. What is the problem?", ["The internet goes on and off.", "The internet is very fast.", "The bill is expensive.", "She forgot the password."], 0, "Keeps disconnecting = putus-putus."),
        pair("ed-m9-l3-c3", "Match each picture with its word.", [["pic:technician", "technician"], ["pic:cable", "cable"], ["pic:calendar", "schedule"], ["pic:modem-red", "red light"]], "Tech support pro!"),
        fill("ed-m9-l3-c4", "You want to see the technicians' free times. Complete the sentence.", "Let me check the", ".", ["schedule"], "Jadwal = schedule."),
        pick("ed-m9-l3-c5", "“The coverage is weak in the bedroom.” What is a sensible solution?", ["Move the modem closer to the bedroom.", "Pay the bill.", "Turn off the TV.", "Buy a passport."], 0, "Jangkauan lemah → dekatkan modem/router.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ed-m9-quiz",
    title: "Module 9 Quiz",
    passPercent: 70,
    questions: [
      pick("ed-m9-q1", "What does the modem in the picture show?", ["a red light", "a green light", "no cable", "a new password"], 0, "Lampu merah menyala.", { image: "modem-red" }),
      listenPick("ed-m9-q2", say(["woman", "Is your internet slow or not connecting at all?"]), "Listen. What is the staff member doing?", ["Finding out the problem", "Booking a technician", "Ending the call", "Explaining a bill"], 0, "Pertanyaan menggali masalah."),
      arrange("ed-m9-q3", "Put the words in order.", "Our technician will visit you tomorrow", "Our technician will visit you + waktu."),
      pick("ed-m9-q4", "You want the customer to switch the modem off. You say…", ["Turn off the modem.", "Turn on the modem.", "Turn the modem.", "Off modem turn."], 0, "Turn off = matikan."),
      fill("ed-m9-q5", "Complete the question. You need the secret word to join the WiFi.", "What's your WiFi", "?", ["password"], "Kata sandi = password."),
      pair("ed-m9-q6", "Match each word with its meaning.", [["slow", "not fast"], ["technician", "a person who fixes the internet"], ["visit", "go to someone's home"], ["coverage", "how far the WiFi signal reaches"]], "Mantap! Slow = lambat, technician = teknisi, visit = kunjungan, coverage = jangkauan."),
      listenPick("ed-m9-q7", say(["man", "There is an outage in your area."]), "Listen. What is happening?", ["There is a network problem in the area.", "There is a new promotion.", "The technician is on holiday.", "The bill is paid."], 0, "Outage = gangguan."),
      pick("ed-m9-q8", "When do you say “Is that okay for you?”", ["After you offer a visit time", "When you answer the phone", "When you ask for a name", "When you end the call"], 0, "Konfirmasi setelah menawarkan jadwal."),
      pick("ed-m9-q9", "Which instruction is the SIMPLEST for a customer who isn't technical?", ["Please restart your modem.", "Please reconfigure the ONT VLAN settings.", "Please update the firmware via SSH.", "Please check the DNS resolver."], 0, "Pakai kata sederhana: restart, modem, red light.", { hots: true }),
      pick("ed-m9-q10", "The customer says, “The WiFi works, but I can't open some apps.” Which question finds out more?", ["Which app can't you open? Since when?", "Is there a red light? Then the internet is dead.", "Your bill is overdue.", "Have a nice day!"], 0, "Gali detail: aplikasi apa dan sejak kapan.", { hots: true }),
    ],
  },
  live: {
    title: "Module 9 Live Quiz — WiFi Rescue",
    questions: [
      live("ed-m9-live1", "What color is the modem light?", ["green", "red", "blue", "off"], 1, "modem-red"),
      live("ed-m9-live2", "The person who fixes your internet at home:", ["technician", "technique", "technology", "teacher"], 0, "technician"),
      live("ed-m9-live3", "It started one day ago: since …", ["yesterday", "tomorrow", "today", "last"], 0, "calendar"),
      live("ed-m9-live4", "Switch the modem off: turn it …", ["on", "off", "up", "in"], 1, "modem"),
      live("ed-m9-live5", "A network problem in a whole area:", ["outage", "output", "outside", "outfit"], 0, "wifi"),
      live("ed-m9-live6", "What is in the picture?", ["cable", "rope", "hose", "wire fence"], 0, "cable"),
      live("ed-m9-live7", "The internet goes on and off. It keeps …", ["disconnecting", "discounting", "discovering", "distracting"], 0, "signal"),
      live("ed-m9-live8", "The list of visit days and times:", ["schedule", "school", "scheme", "shuttle"], 0, "calendar"),
      live("ed-m9-live9", "Confirm the time: Is that okay ___ you?", ["to", "for", "at", "with"], 1, "clock"),
      live("ed-m9-live10", "How do you say “technician”?", ["“teknisian”", "“tek-NISH-un”", "“TEK-ni-shun”", "“tech-ni-cian”"], 1, "technician"),
    ],
  },
};

export const M10: Level = {
  id: "ed-m10",
  title: "Module 10 — Numbers, Prices & Simple Billing",
  description: "Sesi puncak: angka sampai jutaan, menyebut harga rupiah, menjelaskan tagihan sederhana, dan review besar 10 modul.",
  targetScore: "Phase 2 · Work",
  cover: ["money", "bill", "trophy"],
  lessons: [
    {
      id: "ed-m10-l1",
      skill: "vocabulary",
      title: "Numbers & Rupiah Prices",
      summary: "1–20, puluhan, ratusan, ribuan, jutaan, dan pola harga “… thousand rupiah”.",
      sections: [
        {
          title: "Building Numbers Step by Step",
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
              ["one thousand, ten thousand", "1,000, 10,000"],
              ["one hundred thousand", "100,000 (seratus ribu)"],
              ["one million", "1,000,000"],
            ], ["English", "Number"]),
            repeatAfterMe(["thirteen, thirty", "fourteen, forty", "fifteen, fifty", "one hundred", "one thousand", "one million"]),
            { type: "warning", md: "Hati-hati **-teen** vs **-ty**: fif**TEEN** (15) ditekan di belakang, **FIF**ty (50) ditekan di depan." },
          ],
        },
        {
          title: "Saying Rupiah Prices",
          blocks: [
            { type: "pictures", items: [{ pic: "money", label: "rupiah" }, { pic: "bill", label: "Rp 350,000" }] },
            phrases([
              ["Rp 150,000", "one hundred fifty thousand rupiah"],
              ["Rp 350,000", "three hundred fifty thousand rupiah"],
              ["Rp 1,500,000", "one million five hundred thousand rupiah"],
            ], ["Number", "Say it like"]),
            repeatAfterMe(["one hundred fifty thousand rupiah", "three hundred fifty thousand rupiah", "one million five hundred thousand rupiah"]),
            { type: "tip", md: "Fokus ke pola **ratusan + thousand**, karena paling sering muncul di tagihan. Tidak perlu hafal semua angka besar. Dalam bahasa Inggris, ribuan ditulis dengan koma: **350,000**." },
            phrases([["thousand", "“THAU-zund”, bukan “tousen”"]], ["Word", "Say it like"]),
          ],
        },
      ],
      checkpoint: [
        listenPick("ed-m10-l1-c1", say(["woman", "Fifty."]), "Listen. Which number is it?", ["15", "50", "5", "500"], 1, "FIFty = 50 (tekanan di depan)."),
        pick("ed-m10-l1-c2", "How do you say Rp 250,000?", ["two hundred fifty thousand rupiah", "twenty-five thousand rupiah", "two million fifty rupiah", "two fifty rupiah thousand"], 0, "250 + thousand."),
        fill("ed-m10-l1-c3", "Write the number in words.", "1,000,000 = one", "", ["million"], "1.000.000 = one million."),
        pair("ed-m10-l1-c4", "Match each word with its number.", [["forty", "40"], ["fourteen", "14"], ["ninety", "90"], ["nineteen", "19"]], "Teen vs ty sudah lancar!"),
        listenPick("ed-m10-l1-c5", say(["man", "Three hundred fifty thousand rupiah."]), "Listen. What is the price?", ["Rp 3,050,000", "Rp 350,000", "Rp 35,000", "Rp 300,050"], 1, "Three hundred fifty thousand = 350.000.", true),
      ],
    },
    {
      id: "ed-m10-l2",
      skill: "listening",
      title: "Billing Phrases & Roleplay",
      summary: "Menyebut tagihan, jatuh tempo, cara bayar, tunggakan, dan model dialog billing.",
      sections: [
        {
          title: "Billing Phrases",
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
          title: "Model Dialogue",
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
            { type: "try", question: pick("ed-m10-l2-try", "How much is Mr. Hasan's bill?", ["Rp 150,000", "Rp 350,000", "Rp 300,500", "Rp 3,500,000"], 1, "Three hundred fifty thousand rupiah = Rp 350.000.") },
            { type: "text", md: "**Skenario roleplay:**\n1. Pelanggan bertanya tagihan bulan ini.\n2. Pelanggan terlambat bayar, staf mengingatkan dengan sopan.\n3. Pelanggan sudah bayar tapi status belum berubah: *Could you send the proof of payment, please?*\n4. Pelanggan protes tagihan terlalu besar: staf menjelaskan dan minta maaf." },
            { type: "tip", md: "Semua contoh tagihan di sini **fiktif**. Sesuaikan frasa isolir, denda, dan metode bayar dengan kebijakan resmi kantor." },
          ],
        },
      ],
      checkpoint: [
        listenPick("ed-m10-l2-c1", say(["woman", "The due date is the twentieth of every month."]), "Listen. What is the due date?", ["the 2nd", "the 12th", "the 20th", "the 22nd"], 2, "The twentieth = tanggal 20."),
        pick("ed-m10-l2-c2", "The customer's money has arrived. You tell him…", ["Your payment has been received.", "Your payment is receive.", "We received you pay.", "Payment you received."], 0, "Your payment has been received."),
        fill("ed-m10-l2-c3", "You need to see the customer's receipt. Complete the question.", "Could you send the proof of", ", please?", ["payment"], "Proof of payment = bukti pembayaran."),
        pickMany("ed-m10-l2-c4", "Choose ALL the ways to pay in the dialogue.", ["bank", "app", "counter", "cash on delivery"], [0, 1, 2], "Bank, app, atau counter."),
        pick("ed-m10-l2-c5", "A customer is late with a payment. What is a polite reminder?", ["You have an overdue payment of 350,000 rupiah. Please pay before the 25th to avoid suspension.", "Pay now or we cut your internet!", "Why didn't you pay?!", "Your internet is free."], 0, "Sebut jumlah, tenggat, dan akibatnya dengan sopan.", { hots: true }),
      ],
    },
    {
      id: "ed-m10-l3",
      skill: "vocabulary",
      title: "Vocab of the Day & Big Review",
      summary: "Amount, proof of payment, suspended, late fee, paid in full, unpaid, bank transfer, counter, account, change, discount, package. Plus review 10 modul.",
      sections: [
        {
          title: "Today's Words",
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
          title: "Big Review: All 10 Modules",
          blocks: [
            { type: "pictures", items: [{ pic: "owl-cheer", label: "You did it!" }], caption: "Great job, everyone! Pilih 3 kata yang paling berguna untukmu dan pakai minggu ini." },
            { type: "try", question: pair("ed-m10-l3-review1", "Review Modules 1–5: match each clue with its word.", [["a person you work with", "colleague"], ["too many cars on the road", "traffic jam"], ["salty and rich, like broth", "savory"], ["a small gift from a trip", "souvenir"]], "Mantap!") },
            { type: "try", question: pair("ed-m10-l3-review2", "Review Modules 6–9: match each clue with its word.", [["the mobile data you buy", "data quota"], ["a bill not paid on time", "overdue payment"], ["the caller dialed the wrong office", "wrong number"], ["a network problem in a whole area", "outage"]], "Kamu sudah sejauh ini. Hebat!") },
            { type: "text", md: "Coba sebutkan satu hal yang sekarang sudah kamu bisa: *I can introduce myself.* · *I can say my bill.* · *I can help a customer on the phone.*" },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m10-l3-c1", "The customer has paid everything. The bill is…", ["paid in full", "unpaid", "late fee", "suspended"], 0, "Lunas = paid in full."),
        listenPick("ed-m10-l3-c2", say(["woman", "Your service will be suspended."]), "Listen. What will happen to the service?", ["It will be stopped for a while.", "It will be fixed.", "It will get a discount.", "It will be installed."], 0, "Suspended = diisolir (dihentikan sementara)."),
        pair("ed-m10-l3-c3", "Match each word with its meaning.", [["late fee", "extra money for paying late"], ["change", "money you get back"], ["account", "your number at the bank"], ["cashier", "the person you pay at the counter"]], "Billing expert! Late fee = denda, change = kembalian, account = rekening, cashier = kasir."),
        fill("ed-m10-l3-c4", "Prices are lower this month. Complete the sentence.", "We have a", "this month.", ["promotion", "promo", "discount"], "Promo = promotion."),
        pick("ed-m10-l3-c5", "A customer's bill is Rp 500,000, but the package is Rp 350,000. He is upset. What is the best reply?", ["I'm sorry for the inconvenience. Let me check that for you. There may be a late fee from last month.", "That's your problem.", "Please pay 500,000 now.", "Have a nice day!"], 0, "Empati, cek, lalu jelaskan kemungkinan penyebabnya.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ed-m10-quiz",
    title: "Module 10 Quiz (Big Review)",
    passPercent: 70,
    questions: [
      listenPick("ed-m10-q1", say(["man", "One hundred fifty thousand rupiah."]), "Listen. How much is it?", ["Rp 115,000", "Rp 150,000", "Rp 1,500,000", "Rp 50,000"], 1, "One hundred fifty thousand = 150.000."),
      pick("ed-m10-q2", "How do you say Rp 1,500,000?", ["one million five hundred thousand rupiah", "fifteen thousand rupiah", "one thousand five hundred rupiah", "one million fifty rupiah"], 0, "1 million + 500 thousand.", { image: "money" }),
      fill("ed-m10-q3", "Complete the sentence.", "Your bill this month", "350,000 rupiah.", ["is"], "Your bill this month is ___."),
      pick("ed-m10-q4", "The customer must pay by the 20th, or the internet stops. You say…", ["Please pay before the 20th to avoid suspension.", "Please pay after the 20th for suspension.", "Pay 20 to suspend.", "Please suspend before the 20th."], 0, "Before = sebelum, avoid suspension = agar tidak diisolir."),
      pair("ed-m10-q5", "Big review: match each clue with its word.", [["a person who uses our service", "customer"], ["working after normal hours", "overtime"], ["a person who fixes the internet", "technician"], ["the last day to pay", "due date"]], "Review besar lulus!"),
      arrange("ed-m10-q6", "Put the words in order.", "You can pay at our counter", "You can pay at/through + tempat bayar."),
      listenPick("ed-m10-q7", say(["woman", "Would you like me to send the invoice by WhatsApp?"]), "Listen. What is the staff member offering?", ["pic:chat|To send the bill on WhatsApp", "pic:technician|To send a technician", "pic:money|A discount", "pic:modem|A new modem"], 0, "Send the invoice by WhatsApp."),
      pick("ed-m10-q8", "Which sentence matches the picture best?", ["Your payment has been received.", "Your service is suspended.", "There is a red light.", "The signal is weak."], 0, "Tanda centang pada tagihan = pembayaran diterima/lunas.", { image: "receipt" }),
      pick("ed-m10-q9", "Which one is NOT a billing phrase?", ["The due date is the 20th.", "You have an overdue payment.", "Please turn off the modem.", "Your bill is paid in full."], 2, "Turn off the modem adalah instruksi WiFi (Modul 9)."),
      pick("ed-m10-q10", "A customer says he paid, but the status is still “unpaid”. What do you say?", ["Could you send the proof of payment, please?", "You didn't pay, sorry.", "Please pay again.", "Your service is suspended now."], 0, "Minta bukti pembayaran untuk dicek.", { hots: true }),
    ],
  },
  live: {
    title: "Module 10 Live Quiz — Grand Final!",
    questions: [
      live("ed-m10-live1", "“Fifty” = …", ["15", "50", "500", "5"], 1, "money"),
      live("ed-m10-live2", "Rp 350,000 = …", ["three hundred fifty thousand", "thirty-five thousand", "three million fifty", "three fifty"], 0, "bill"),
      live("ed-m10-live3", "The customer paid everything. The bill is…", ["paid in full", "fully paid off fee", "unpaid", "pay full in"], 0, "receipt"),
      live("ed-m10-live4", "Extra money for paying late:", ["late fee", "late free", "lately", "fine dining"], 0, "alarm"),
      live("ed-m10-live5", "The service is stopped because the bill is unpaid. It is…", ["suspended", "suspected", "supported", "suspicious"], 0, "modem-red"),
      live("ed-m10-live6", "A receipt that shows you paid: proof of …", ["payment", "paying", "pay", "paid"], 0, "receipt"),
      live("ed-m10-live7", "1,000,000 = one …", ["thousand", "million", "billion", "hundred"], 1, "money"),
      live("ed-m10-live8", "Review: the person who fixes the internet:", ["technician", "technical", "tech man", "teacher"], 0, "technician"),
      live("ed-m10-live9", "Review: a person who uses our service:", ["colleague", "customer", "custom", "costumer"], 1, "customer"),
      live("ed-m10-live10", "What is the best way to end a call?", ["Thank you for contacting us. Have a nice day!", "Bye, finish.", "Close the phone.", "Okay, stop."], 0, "trophy"),
    ],
  },
};
