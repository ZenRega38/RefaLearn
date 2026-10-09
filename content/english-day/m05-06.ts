import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, dialog, fill, listenPick, live, pair, phrases, pick, pickMany, repeatAfterMe, say } from "./helpers";

// Module 5 — Holidays & Dream Places · Module 6 — Technology & the Internet
// Questions, options and titles are all English; explanations stay Indonesian.

export const M5: Level = {
  id: "ed-m5",
  title: "Module 5 — Holidays & Dream Places",
  description: "Menceritakan tempat yang pernah dikunjungi dan tempat impian yang ingin dikunjungi.",
  targetScore: "Phase 1 · Personal",
  cover: ["beach", "plane", "suitcase"],
  lessons: [
    {
      id: "ed-m5-l1",
      skill: "speaking",
      title: "Key Phrases: Been There & Want to Go",
      summary: "I want to visit…, I've been to…, I've never been to…, It's famous for…",
      sections: [
        {
          title: "Module 4 Recall",
          blocks: [{ type: "try", question: pair("ed-m5-l1-recall", "Module 4 words: match each clue with its word.", [["catching fish as a hobby", "fishing"], ["riding a bicycle", "cycling"], ["spending relaxed time with friends", "hang out"], ["something you will do later", "plan"]], "Siap jalan-jalan!") }],
        },
        {
          title: "Key Phrases",
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
        pick("ed-m5-l1-c1", "You have never gone to Bali. You say…", ["I've been to Bali.", "I've never been to Bali.", "I want to Bali.", "I never Bali."], 1, "Belum pernah = I've never been to."),
        listenPick("ed-m5-l1-c2", say(["woman", "Derawan is famous for its beautiful island and clear water."]), "Listen. What is Derawan famous for?", ["pic:island|An island with clear water", "pic:mountain|Mountains", "pic:office|Office buildings", "pic:traffic|Busy roads"], 0, "Island = pulau."),
        fill("ed-m5-l1-c3", "Complete the sentence about a dream trip.", "I want to", "Japan someday.", ["visit", "go to"], "I want to visit ___."),
        arrange("ed-m5-l1-c4", "Put the words in order.", "The best place I visited was Yogyakarta", "The best place I visited was + tempat."),
        pick("ed-m5-l1-c5", "You have never left Tarakan, but you want to see Bali. Which answer uses our class phrases?", ["I've never been outside Tarakan, but I want to visit Bali.", "I don't travel.", "No.", "Bali is famous."], 0, "Jawaban jujur dan sudah memakai dua pola sekaligus. Hebat!", { hots: true }),
      ],
    },
    {
      id: "ed-m5-l2",
      skill: "listening",
      title: "Let's Talk: Dream Places",
      summary: "Dialog liburan dan pertanyaan pemandu tentang perjalanan.",
      sections: [
        {
          title: "Listen to the Dialogue",
          blocks: [
            dialog("Next vacation", say(
              ["woman", "Where do you want to go on your next vacation?"],
              ["man", "I want to visit Bali. I've never been there. It's famous for its beaches. What about you?"],
              ["woman", "I've been to Bali. The best place I visited was Yogyakarta. I would like to go to Japan someday."],
            )),
            { type: "try", question: pickMany("ed-m5-l2-try", "Choose ALL the places the woman has already visited.", ["Bali", "Yogyakarta", "Japan", "Derawan"], [0, 1], "Ia pernah ke Bali dan Yogyakarta. Jepang masih impian (someday).") },
          ],
        },
        {
          title: "Conversation Questions",
          blocks: [
            phrases([
              ["Where do you want to go on your next vacation?", "I want to go to Maratua."],
              ["Have you been outside Kalimantan?", "Yes, I've been to Surabaya."],
              ["What was the best place you visited?", "The best place was Derawan."],
              ["Who do you want to travel with?", "With my family."],
              ["Beach, mountains, or city?", "I prefer the beach!"],
              ["What's your dream destination?", "My dream destination is Japan."],
            ], ["Question", "Sample answer"]),
            { type: "pictures", items: [{ pic: "beach", label: "beach" }, { pic: "mountain", label: "mountains" }, { pic: "office", label: "city" }] },
          ],
        },
      ],
      checkpoint: [
        listenPick("ed-m5-l2-c1", say(["man", "I want to visit Bali. I've never been there. It's famous for its beaches."]), "Listen. Has he been to Bali?", ["Yes, he has.", "No, he hasn't.", "He lives in Bali.", "He doesn't say."], 1, "“I've never been there.” = belum pernah."),
        pair("ed-m5-l2-c2", "Match each question with its answer.", [["Who do you want to travel with?", "With my family."], ["Beach or mountains?", "I prefer the beach."], ["What's your dream destination?", "Japan."], ["Have you been to Surabaya?", "Yes, I have."]], "Setiap jawaban menjawab pertanyaannya: who dijawab orang, beach or mountains dijawab pilihan, dream destination dijawab tempat."),
        pick("ed-m5-l2-c3", "“I would like to go to Japan someday.” When does she want to go?", ["At some time in the future", "Yesterday", "Every day", "On Sunday"], 0, "Someday = suatu hari nanti."),
        fill("ed-m5-l2-c4", "Complete the answer to “Beach or mountains?”", "I prefer the", ". I love the sea!", ["beach"], "Pantai = beach."),
        pick("ed-m5-l2-c5", "Your partner wants to go to Bali for the beaches. You tell the class…", ["My partner wants to visit Bali because of the beaches.", "I want to visit Bali.", "My partner is Bali.", "Bali wants my partner."], 0, "Format share back: My partner wants to visit ___ because ___.", { hots: true }),
      ],
    },
    {
      id: "ed-m5-l3",
      skill: "vocabulary",
      title: "Vocab of the Day: Holidays",
      summary: "Vacation, beach, mountain, island, plane ticket, hotel, suitcase, passport, view, cheap/expensive, souvenir.",
      sections: [
        {
          title: "Today's Words",
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
        pick("ed-m5-l3-c1", "A small gift you buy on holiday for your family is a…", ["souvenir", "suitcase", "present ticket", "shopping"], 0, "Oleh-oleh = souvenir."),
        listenPick("ed-m5-l3-c2", say(["woman", "My suitcase is heavy."]), "Listen. What is heavy?", ["pic:suitcase", "pic:passport", "pic:plane", "pic:souvenir"], 0, "Suitcase = koper."),
        pick("ed-m5-l3-c3", "What is the opposite of “expensive”?", ["cheap", "chip", "cheep", "small"], 0, "Expensive (mahal) ↔ cheap (murah)."),
        fill("ed-m5-l3-c4", "You see the sea and the mountains from the hotel. Complete the sentence.", "The", "is amazing!", ["view", "scenery"], "Pemandangan = view / scenery."),
        pick("ed-m5-l3-c5", "You are going on holiday to Japan. What MUST you bring?", ["passport", "souvenir", "beach", "mountain"], 0, "Ke luar negeri harus pakai paspor.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ed-m5-quiz",
    title: "Module 5 Quiz",
    passPercent: 70,
    questions: [
      pick("ed-m5-q1", "What is in the picture?", ["island", "mountain", "city", "river"], 0, "Island = pulau.", { image: "island" }),
      listenPick("ed-m5-q2", say(["man", "I've been to Surabaya and Makassar."]), "Listen. Where has he been?", ["Surabaya and Makassar", "Bali and Japan", "Only Tarakan", "Derawan"], 0, "I've been to = pernah ke."),
      arrange("ed-m5-q3", "Put the words in order.", "I want to visit Maratua", "I want to visit + tempat."),
      pick("ed-m5-q4", "“The plane ticket is expensive.” What does this mean?", ["The ticket costs very little.", "The ticket costs a lot of money.", "The plane is full.", "The ticket is lost."], 1, "Expensive = mahal."),
      fill("ed-m5-q5", "Complete the sentence.", "It's famous", "its beaches.", ["for"], "Famous for = terkenal dengan."),
      pair("ed-m5-q6", "Match each picture with its word.", [["pic:passport", "passport"], ["pic:suitcase", "suitcase"], ["pic:plane", "plane"], ["pic:souvenir", "souvenir"]], "Siap berangkat!"),
      pick("ed-m5-q7", "“Where do you want to go?” — which answer is right?", ["I want to go to Japan.", "I've been tired.", "It's cheap.", "With my family."], 0, "Where = ke mana → jawab tempat."),
      listenPick("ed-m5-q8", say(["woman", "We booked a hotel near the beach."]), "Listen. Where is the hotel?", ["Near the mountains", "Near the beach", "Near the airport", "In the city"], 1, "Near the beach = dekat pantai."),
      pick("ed-m5-q9", "Which sentence is CORRECT?", ["I've never been to Japan.", "I've never go to Japan.", "I never been Japan.", "I've never Japan."], 0, "I've never been to + tempat."),
      pick("ed-m5-q10", "You don't have much money, but you want beautiful nature near Tarakan. What is the best choice?", ["A cheap trip to Derawan island.", "An expensive trip to Japan.", "Stay in the office.", "Buy a passport only."], 0, "Dekat, murah, dan pemandangannya indah.", { hots: true }),
    ],
  },
  live: {
    title: "Module 5 Live Quiz — Dream Trip",
    questions: [
      live("ed-m5-live1", "What place is in the picture?", ["beach", "mountain", "island", "city"], 0, "beach"),
      live("ed-m5-live2", "You put your clothes in it when you travel:", ["suitcase", "suit", "case bag", "pocket"], 0, "suitcase"),
      live("ed-m5-live3", "You went to Bali last year. You say…", ["I've been to Bali.", "I've never been to Bali.", "I want Bali.", "I am Bali."], 0, "plane"),
      live("ed-m5-live4", "A small gift you bring home from a trip:", ["gift shop", "souvenir", "supper", "sale"], 1, "souvenir"),
      live("ed-m5-live5", "What place is in the picture?", ["island", "beach", "mountain", "lake"], 2, "mountain"),
      live("ed-m5-live6", "What is the opposite of “cheap”?", ["expensive", "expense", "big", "rich"], 0, "money"),
      live("ed-m5-live7", "It's famous ___ its beaches.", ["of", "for", "with", "at"], 1, "island"),
      live("ed-m5-live8", "What you see from a high place is the…", ["view", "vision", "visit", "venue"], 0, "mountain"),
      live("ed-m5-live9", "You MUST have this to travel abroad:", ["passport", "pillow", "plate", "pencil"], 0, "passport"),
      live("ed-m5-live10", "A place to stay on holiday is your…", ["accommodation", "accident", "account", "action"], 0, "house"),
    ],
  },
};

export const M6: Level = {
  id: "ed-m6",
  title: "Module 6 — Technology & the Internet",
  description: "Awal Fase 2: bercerita tentang kebiasaan memakai internet, HP, dan aplikasi, plus kosakata teknologi dasar.",
  targetScore: "Phase 2 · Work",
  cover: ["smartphone", "wifi", "laptop"],
  lessons: [
    {
      id: "ed-m6-l1",
      skill: "speaking",
      title: "Key Phrases: The Internet & Your Phone",
      summary: "I use the internet for…, My favorite app is…, My internet is fast/slow…",
      sections: [
        {
          title: "Module 5 Recall",
          blocks: [{ type: "try", question: pair("ed-m6-l1-recall", "Module 5 words: match each clue with its word.", [["sand and sea", "beach"], ["a place to stay on holiday", "hotel"], ["what you see from a high place", "view"], ["a small gift from a trip", "souvenir"]], "Sip, lanjut ke topik teknologi!") }],
        },
        {
          title: "Key Phrases",
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
        pick("ed-m6-l1-c1", "You open WhatsApp more than any other app. You say…", ["My favorite app is WhatsApp.", "My app favorite WhatsApp.", "I favorite WhatsApp app.", "WhatsApp is favorite me."], 0, "My favorite app is ___."),
        listenPick("ed-m6-l1-c2", say(["woman", "I spend about six hours online every day."]), "Listen. How many hours is she online every day?", ["4", "5", "6", "16"], 2, "Six = 6."),
        fill("ed-m6-l1-c3", "Videos keep stopping in the evening. Complete the sentence.", "My internet at home is", "in the evening.", ["slow"], "Lambat = slow."),
        arrange("ed-m6-l1-c4", "Put the words in order.", "I use the internet for watching videos", "I use the internet for + kegiatan."),
        pick("ed-m6-l1-c5", "“I can't live without my phone.” What does he mean?", ["His phone is very important to him.", "He doesn't have a phone.", "His phone is broken.", "He hates his phone."], 0, "Tidak bisa hidup tanpa = sangat bergantung/penting.", { hots: true }),
      ],
    },
    {
      id: "ed-m6-l2",
      skill: "listening",
      title: "Let's Talk: Life Online",
      summary: "Dialog kebiasaan internet dan permainan “Guess the App”.",
      sections: [
        {
          title: "Listen to the Dialogue",
          blocks: [
            dialog("Online every day", say(
              ["woman", "What do you use the internet for the most?"],
              ["man", "I use the internet for social media and watching videos. My favorite app is YouTube. I spend about four hours online every day."],
              ["woman", "My internet at home is sometimes slow in the evening."],
            )),
            { type: "try", question: pick("ed-m6-l2-try", "When is the woman's internet sometimes slow?", ["In the morning", "In the afternoon", "In the evening", "All the time"], 2, "“…sometimes slow in the evening.”") },
          ],
        },
        {
          title: "Guess the App",
          blocks: [
            { type: "text", md: "Jelaskan aplikasi tanpa menyebut namanya, teman menebak. Contoh: *You watch videos. You can subscribe. It's red.*" },
            { type: "try", question: pick("ed-m6-l2-guess", "“You watch videos. You can subscribe. It's red.” Which app is it?", ["pic:video-app|the red video app", "pic:chat|the green chat app", "pic:calendar|the calendar", "pic:clock|the clock"], 0, "Video + subscribe + merah = aplikasi video.") },
            phrases([
              ["What's the first app you open every morning?", "WhatsApp, for messages."],
              ["How many hours do you spend on your phone?", "About five hours."],
              ["Is the internet at your home fast or slow?", "It's fast."],
              ["What do you use the internet for at work?", "For email and checking customer data."],
              ["Can you live one day without internet?", "Maybe… but it's hard!"],
            ], ["Question", "Sample answer"]),
          ],
        },
      ],
      checkpoint: [
        listenPick("ed-m6-l2-c1", say(["man", "My favorite app is YouTube. I spend about four hours online every day."]), "Listen. How many hours is he online?", ["Two hours", "Four hours", "Fourteen hours", "Eight hours"], 1, "Four hours = empat jam."),
        pick("ed-m6-l2-c2", "“You send messages. It's green. It has groups.” Which app is it?", ["pic:chat|the chat app", "pic:video-app|the video app", "pic:report|a report", "pic:bill|a bill"], 0, "Pesan + hijau + grup = aplikasi chat."),
        fill("ed-m6-l2-c3", "Complete the question.", "What's the first app you", "every morning?", ["open"], "Open = membuka."),
        pair("ed-m6-l2-c4", "Match each word with its opposite or meaning.", [["fast", "not slow"], ["slow", "not fast"], ["every day", "Monday to Sunday"], ["online", "connected to the internet"]], "Mantap! Fast = cepat, slow = lambat, every day = setiap hari, online = terhubung internet."),
        pick("ed-m6-l2-c5", "At the office, what do people use the internet for the most?", ["Email and checking customer data", "Watching movies all day", "Playing games", "Sleeping"], 0, "Itu pemakaian internet untuk kerja (for work).", { hots: true }),
      ],
    },
    {
      id: "ed-m6-l3",
      skill: "vocabulary",
      title: "Vocab of the Day: Technology",
      summary: "Network, signal, speed, download, upload, streaming, data quota, internet package, disconnected, charge, screen.",
      sections: [
        {
          title: "Today's Words",
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
            phrases([["router", "“ROO-ter” (British) atau “RAU-ter” (American), keduanya benar"]], ["Word", "How to say it"]),
          ],
        },
      ],
      checkpoint: [
        pick("ed-m6-l3-c1", "You have almost no mobile data left. You say…", ["My data quota is almost finished.", "My quota data almost finish.", "My data is quota.", "I finished data."], 0, "Kuota = data quota."),
        listenPick("ed-m6-l3-c2", say(["man", "The signal is weak."]), "Listen. What is the problem?", ["pic:signal|Weak signal", "pic:laptop|Broken screen", "pic:cable|Low battery", "pic:upload|Upload failed"], 0, "Signal is weak = sinyal lemah."),
        pair("ed-m6-l3-c3", "Match each icon with its word.", [["pic:download", "download"], ["pic:upload", "upload"], ["pic:signal", "signal"], ["pic:laptop", "screen"]], "Tech expert!"),
        fill("ed-m6-l3-c4", "Your phone battery is low. Complete the sentence.", "I", "my phone at night.", ["charge"], "Mengisi baterai = charge."),
        pick("ed-m6-l3-c5", "A customer says, “The internet is disconnected.” What is happening?", ["The internet is not working.", "The internet is very fast.", "The internet was just installed.", "The internet is free."], 0, "Disconnected = terputus. Ini kata penting untuk Modul 9!", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ed-m6-quiz",
    title: "Module 6 Quiz",
    passPercent: 70,
    questions: [
      pick("ed-m6-q1", "What does this icon mean?", ["download", "upload", "delete", "share"], 0, "Panah ke bawah = download.", { image: "download" }),
      listenPick("ed-m6-q2", say(["woman", "My internet is fast."]), "Listen. How is her internet?", ["Fast", "Slow", "Not working", "Expensive"], 0, "Fast = cepat."),
      arrange("ed-m6-q3", "Put the words in order.", "I spend about three hours online every day", "I spend about + jam + online every day."),
      pick("ed-m6-q4", "Nobody in the office can connect. You say…", ["The network is down.", "The net is fall.", "The network go down.", "Down the network."], 0, "Jaringan = network."),
      fill("ed-m6-q5", "You put your photos on Instagram. Complete the sentence.", "I", "photos to Instagram.", ["upload"], "Unggah = upload."),
      pair("ed-m6-q6", "Match each word with its meaning.", [["speed", "how fast something is"], ["screen", "the part of a phone you look at"], ["signal", "the bars on your phone"], ["internet package", "the plan you pay for"]], "Bagus! Speed = kecepatan, screen = layar, signal = sinyal, internet package = paket internet."),
      listenPick("ed-m6-q7", say(["man", "I have the fifty Mbps package."]), "Listen. Which package does he have?", ["15 Mbps", "50 Mbps", "5 Mbps", "500 Mbps"], 1, "Fifty = 50."),
      pick("ed-m6-q8", "“We stream movies every weekend.” What do they do?", ["They watch movies online every weekend.", "They make movies.", "They download movies every day.", "They go to the cinema."], 0, "Stream = menonton secara online."),
      pick("ed-m6-q9", "A modem with a red light usually means the internet is…", ["disconnected", "fast", "charging", "streaming"], 0, "Lampu merah = ada gangguan/terputus.", { image: "modem-red" }),
      pick("ed-m6-q10", "Your phone battery is empty. What do you say?", ["I need to charge my phone.", "I need to download my phone.", "My phone is streaming.", "My signal is fast."], 0, "Baterai habis → charge.", { hots: true }),
    ],
  },
  live: {
    title: "Module 6 Live Quiz — Tech Talk",
    questions: [
      live("ed-m6-live1", "What does this icon mean?", ["upload", "download", "delete", "refresh"], 1, "download"),
      live("ed-m6-live2", "Only one bar on your phone. The signal is…", ["weak", "week", "wake", "walk"], 0, "signal"),
      live("ed-m6-live3", "The mobile data you buy is your…", ["data quota", "data quote", "data credit", "data bill"], 0, "smartphone"),
      live("ed-m6-live4", "What does this icon mean?", ["download", "upload", "save", "send"], 1, "upload"),
      live("ed-m6-live5", "The internet stopped working. It is…", ["connected", "disconnected", "discount", "delivered"], 1, "modem-red"),
      live("ed-m6-live6", "What is in the picture?", ["laptop", "modem", "router cable", "screen saver"], 1, "modem"),
      live("ed-m6-live7", "Your battery is low. You need to ___ your phone.", ["change", "charge", "chase", "chat"], 1, "cable"),
      live("ed-m6-live8", "I use the internet ___ social media.", ["to", "for", "at", "on"], 1, "chat"),
      live("ed-m6-live9", "How do you say “router”?", ["“ruter”", "“ROO-ter”", "“rotor”", "“rau-ter-er”"], 1, "modem"),
      live("ed-m6-live10", "The part of a phone you look at is the…", ["screen", "scream", "scene", "sheet"], 0, "laptop"),
    ],
  },
};
