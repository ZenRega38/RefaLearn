import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, dialog, fill, listenPick, live, pair, phrases, pick, pickMany, repeatAfterMe, say } from "./helpers";

// Modul 3 — Makanan Favorit & Kuliner Tarakan · Modul 4 — Hobi & Akhir Pekan

export const M3: Level = {
  id: "ed-m3",
  title: "Modul 3 — Makanan Favorit & Kuliner Tarakan",
  description: "Menyebut makanan favorit, mendeskripsikan rasa, dan merekomendasikan kuliner Tarakan.",
  targetScore: "Fase 1 · Personal",
  cover: ["crab", "soup", "chili"],
  lessons: [
    {
      id: "ed-m3-l1",
      skill: "speaking",
      title: "Key Phrases: Makanan & Rasa",
      summary: "My favorite food is…, It tastes…, You can find it at…, I recommend…",
      sections: [
        {
          title: "Recall Modul 2",
          blocks: [
            { type: "try", question: pair("ed-m3-l1-recall", "Pasangkan kata Modul 2.", [["anak", "children"], ["orang tua", "parents"], ["lembur", "overtime"], ["macet", "traffic jam"]], "Bagus, ingatanmu kuat!") },
          ],
        },
        {
          title: "Frasa kunci",
          blocks: [
            phrases([
              ["My favorite food is ___.", "Makanan favorit saya ___."],
              ["It tastes ___ (sweet / salty / spicy).", "Rasanya ___ (manis / asin / pedas)."],
              ["You can find it at ___.", "Bisa ditemukan di ___."],
              ["I usually eat it with ___.", "Saya biasanya makan itu dengan ___."],
              ["I recommend ___.", "Saya rekomendasikan ___."],
            ]),
            repeatAfterMe(["My favorite food is crab.", "It tastes sweet and a little salty.", "You can find it at the seafood restaurant.", "I usually eat it with rice.", "I recommend soto."]),
          ],
        },
        {
          title: "Kata rasa",
          blocks: [
            { type: "pictures", items: [{ pic: "candy", label: "sweet" }, { pic: "salt", label: "salty" }, { pic: "chili", label: "spicy" }, { pic: "lemon", label: "sour" }, { pic: "coffee", label: "bitter" }, { pic: "yum", label: "delicious" }] },
            { type: "text", md: "Spicy? → *Sambal!* Sweet? → *Es teh manis!* Coba sebutkan makanan lain untuk setiap rasa." },
            { type: "try", question: pick("ed-m3-l1-try", "Sambal rasanya…", ["sweet", "spicy", "sour", "bitter"], 1, "Sambal = spicy (pedas).", { image: "chili" }) },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m3-l1-c1", "“Rasanya manis.”", ["It tastes sweet.", "It taste sweets.", "It is taste sweet.", "Sweet is taste."], 0, "It tastes + rasa."),
        pair("ed-m3-l1-c2", "Pasangkan rasa dengan gambarnya.", [["pic:chili", "spicy"], ["pic:lemon", "sour"], ["pic:candy", "sweet"], ["pic:salt", "salty"]], "Lidahmu sudah bilingual!"),
        fill("ed-m3-l1-c3", "Lengkapi.", "My", "food is nasi kuning.", ["favorite", "favourite"], "Makanan favorit = favorite food."),
        listenPick("ed-m3-l1-c4", say(["woman", "I recommend soto. It tastes warm and spicy."]), "Dengarkan. Apa yang ia rekomendasikan?", ["pic:soup|Soto", "pic:crab|Kepiting", "pic:grilled-fish|Ikan bakar", "pic:cake|Kue"], 0, "I recommend soto."),
        pick("ed-m3-l1-c5", "Tamu dari Jakarta tidak suka pedas. Rekomendasi yang paling pas…", ["I recommend sambal. It's very spicy!", "I recommend grilled fish. It's savory, not spicy.", "I recommend chili.", "I don't recommend food."], 1, "Pilih makanan yang tidak pedas, lalu jelaskan rasanya.", { hots: true }),
      ],
    },
    {
      id: "ed-m3-l2",
      skill: "listening",
      title: "Ayo Ngobrol: Kuliner Tarakan",
      summary: "Dialog makanan favorit, menjelaskan makanan lokal yang tidak punya padanan Inggris.",
      sections: [
        {
          title: "Dengarkan dialognya",
          blocks: [
            dialog("What's your favorite food?", say(
              ["woman", "What's your favorite food?"],
              ["man", "My favorite food is crab. It tastes sweet and a little salty. You can find it at the seafood restaurant near the harbor."],
              ["woman", "Sounds good! I recommend soto. It tastes warm and spicy."],
            )),
            { type: "try", question: pick("ed-m3-l2-try", "Di mana bisa makan kepiting menurut si pria?", ["Di warung dekat kantor", "Di restoran seafood dekat pelabuhan", "Di rumah", "Di pasar"], 1, "“…at the seafood restaurant near the harbor.” Harbor = pelabuhan.") },
          ],
        },
        {
          title: "Makanan lokal? Jelaskan saja!",
          blocks: [
            { type: "text", md: "Banyak makanan Tarakan tidak punya nama Inggris. Tidak apa-apa! Pakai nama aslinya, lalu **jelaskan**:\n\n- *Nasi kuning* — **It's a rice dish with turmeric.**\n- *Kepiting soka* — **It's a soft-shell crab. You can eat the shell!**\n- *Soto* — **It's a warm soup with chicken and spices.**" },
            { type: "tip", md: "Kalau ada yang tidak makan sesuatu: **I don't eat ___.** Contoh: *I don't eat shrimp.*" },
          ],
        },
        {
          title: "Pertanyaan pemandu",
          blocks: [
            phrases([
              ["What's your favorite food?", "My favorite food is grilled fish."],
              ["Where do you usually eat it?", "At a food stall near my house."],
              ["What does it taste like?", "It tastes savory."],
              ["What Tarakan food would you recommend to a visitor?", "I recommend kepiting soka."],
              ["Do you like spicy food? How spicy?", "Yes, very spicy!"],
              ["Can you cook? What can you cook?", "Yes, I can cook fried rice."],
            ], ["Pertanyaan", "Contoh jawaban"]),
          ],
        },
      ],
      checkpoint: [
        listenPick("ed-m3-l2-c1", say(["man", "My favorite food is crab. It tastes sweet and a little salty."]), "Dengarkan. Makanan favoritnya…", ["pic:crab", "pic:soup", "pic:drumstick", "pic:rice"], 0, "Crab = kepiting."),
        pick("ed-m3-l2-c2", "Cara menjelaskan nasi kuning ke tamu asing…", ["It's a rice dish with turmeric.", "It's yellow nasi.", "It's a sweet cake.", "I don't know."], 0, "Turmeric = kunyit."),
        fill("ed-m3-l2-c3", "Lengkapi: “Saya tidak makan udang.”", "I don't", "shrimp.", ["eat"], "I don't eat ___."),
        pair("ed-m3-l2-c4", "Pasangkan pertanyaan dan jawaban.", [["What does it taste like?", "It tastes savory."], ["Where do you eat it?", "At a food stall."], ["Can you cook?", "Yes, I can cook fried rice."], ["Do you like spicy food?", "Yes, very spicy!"]], "Nyambung semua!"),
        pick("ed-m3-l2-c5", "Teman bertanya “What does it taste like?”. Jawaban yang menjawab pertanyaannya…", ["I eat it at home.", "It tastes sweet and sour.", "My favorite food is soto.", "I can cook it."], 1, "Pertanyaannya tentang rasa → jawab dengan rasa.", { hots: true }),
      ],
    },
    {
      id: "ed-m3-l3",
      skill: "vocabulary",
      title: "Vocab of the Day: Rasa & Kuliner",
      summary: "Spicy, savory, delicious, crab, grilled fish, spices, raw/cooked, food stall, portion.",
      sections: [
        {
          title: "Kosakata hari ini",
          blocks: [
            {
              type: "vocab",
              items: [
                { emoji: "🌶️", pic: "chili", word: "spicy", meaning: "pedas", example: "I like spicy food." },
                { emoji: "🍬", pic: "candy", word: "sweet / salty / sour", meaning: "manis / asin / asam", example: "The sauce is sweet and sour." },
                { emoji: "🍲", pic: "soup", word: "savory", meaning: "gurih", example: "This soup is savory." },
                { emoji: "😋", pic: "yum", word: "delicious", meaning: "enak", example: "It's delicious!" },
                { emoji: "🦀", pic: "crab", word: "crab", meaning: "kepiting", example: "Crab is my favorite food." },
                { emoji: "🐟", pic: "grilled-fish", word: "grilled fish", meaning: "ikan bakar", example: "I eat grilled fish on Sunday." },
                { emoji: "🧂", pic: "salt", word: "seasoning / spices", meaning: "bumbu", example: "The spices are strong." },
                { emoji: "🍖", pic: "drumstick", word: "raw / cooked", meaning: "mentah / matang", example: "The fish is not cooked yet." },
                { emoji: "🏪", pic: "food-stall", word: "food stall", meaning: "warung", example: "I eat at a food stall." },
                { emoji: "🍚", pic: "rice", word: "portion", meaning: "porsi", example: "The portion is big." },
              ],
            },
            phrases([["vegetable", "“VEJ-tuh-bul”, bukan “vegetabel”", "Tiga suku kata saja"]], ["Kata", "Lebih tepat", "Catatan"]),
            repeatAfterMe(["vegetable", "delicious", "savory", "seasoning"]),
          ],
        },
      ],
      checkpoint: [
        pick("ed-m3-l3-c1", "“Gurih” dalam bahasa Inggris…", ["sweet", "savory", "sour", "spicy"], 1, "Gurih = savory."),
        listenPick("ed-m3-l3-c2", say(["woman", "The fish is not cooked yet."]), "Dengarkan. Bagaimana ikannya?", ["Sudah matang", "Belum matang", "Terlalu asin", "Sangat enak"], 1, "Not cooked yet = belum matang."),
        fill("ed-m3-l3-c3", "Lengkapi.", "I eat at a food", "near my house. (warung)", ["stall"], "Warung = food stall."),
        pickMany("ed-m3-l3-c4", "Pilih SEMUA kata rasa.", ["sweet", "portion", "sour", "spicy", "crab"], [0, 2, 3], "Sweet, sour, spicy = rasa."),
        pick("ed-m3-l3-c5", "“The portion is big.” Kamu ingin bilang porsinya kecil. Ubah jadi…", ["The portion is small.", "The portion is spicy.", "The small is portion.", "The portion is cooked."], 0, "Big ↔ small.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ed-m3-quiz",
    title: "Kuis Modul 3",
    passPercent: 70,
    questions: [
      pick("ed-m3-q1", "Gambar ini…", ["crab", "fish", "chicken", "shrimp"], 0, "Crab = kepiting.", { image: "crab" }),
      listenPick("ed-m3-q2", say(["man", "It tastes very spicy!"]), "Dengarkan. Rasanya…", ["pic:chili|Pedas", "pic:candy|Manis", "pic:lemon|Asam", "pic:salt|Asin"], 0, "Spicy = pedas."),
      arrange("ed-m3-q3", "Susun.", "I usually eat it with rice", "I usually eat it with + makanan pendamping."),
      pick("ed-m3-q4", "“It's delicious!” artinya…", ["Enak sekali!", "Pedas sekali!", "Mahal sekali!", "Panas sekali!"], 0, "Delicious = enak."),
      fill("ed-m3-q5", "Lengkapi.", "I", "kepiting soka. It's a soft-shell crab. (saya rekomendasikan)", ["recommend"], "Saya rekomendasikan = I recommend."),
      pair("ed-m3-q6", "Pasangkan.", [["mentah", "raw"], ["matang", "cooked"], ["bumbu", "spices"], ["porsi", "portion"]], "Mantap!"),
      pick("ed-m3-q7", "“Where do you usually eat it?” — jawaban yang tepat…", ["It tastes sweet.", "At a seafood restaurant.", "Yes, I can cook.", "I like it."], 1, "Where = di mana → jawab tempat."),
      listenPick("ed-m3-q8", say(["woman", "Grilled fish is my favorite. It's savory."]), "Dengarkan. Bagaimana rasanya?", ["Manis", "Gurih", "Asam", "Pahit"], 1, "Savory = gurih."),
      pick("ed-m3-q9", "Kopi tanpa gula rasanya…", ["sweet", "salty", "bitter", "spicy"], 2, "Pahit = bitter.", { image: "coffee" }),
      pick("ed-m3-q10", "Kamu ingin menjelaskan “es teh manis” ke turis. Kalimat terbaik…", ["It's sweet iced tea.", "It's tea salty.", "It is hot coffee.", "Es teh is es teh."], 0, "Iced tea = es teh, sweet = manis.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz Modul 3 — Food Battle!",
    questions: [
      live("ed-m3-live1", "Rasa makanan ini?", ["sweet", "spicy", "sour", "bitter"], 1, "chili"),
      live("ed-m3-live2", "“Kepiting” = …", ["crab", "shrimp", "squid", "lobster"], 0, "crab"),
      live("ed-m3-live3", "“Gurih” = …", ["salty", "savory", "spicy", "sweet"], 1, "soup"),
      live("ed-m3-live4", "Rasa lemon?", ["sweet", "salty", "sour", "spicy"], 2, "lemon"),
      live("ed-m3-live5", "“Warung” = …", ["restaurant hall", "food stall", "food house", "market"], 1, "food-stall"),
      live("ed-m3-live6", "“Enak!” = …", ["Delicious!", "Dangerous!", "Different!", "Difficult!"], 0, "yum"),
      live("ed-m3-live7", "It ___ sweet and salty.", ["taste", "tastes", "tasting", "is taste"], 1, "crab"),
      live("ed-m3-live8", "“Ikan bakar” = …", ["fried fish", "grilled fish", "boiled fish", "raw fish"], 1, "grilled-fish"),
      live("ed-m3-live9", "“Mentah” = …", ["raw", "row", "cooked", "rare"], 0, "drumstick"),
      live("ed-m3-live10", "Saya rekomendasikan soto:", ["I recommend soto.", "I recommendation soto.", "I am recommend soto.", "Soto recommend me."], 0, "soup"),
    ],
  },
};

export const M4: Level = {
  id: "ed-m4",
  title: "Modul 4 — Hobi & Akhir Pekan",
  description: "Bercerita tentang hobi, akhir pekan lalu, dan rencana akhir pekan ini. Ada mini review Modul 1–3.",
  targetScore: "Fase 1 · Personal",
  cover: ["fishing", "bicycle", "gamepad"],
  lessons: [
    {
      id: "ed-m4-l1",
      skill: "speaking",
      title: "Perasaan & Mini Review",
      summary: "Variasi jawaban “How are you?” dan review kosakata Modul 1–3.",
      sections: [
        {
          title: "How are you? Jawabannya bisa macam-macam",
          blocks: [
            { type: "pictures", items: [{ pic: "feel-great", label: "I'm great!" }, { pic: "feel-tired", label: "I'm tired." }, { pic: "feel-sleepy", label: "I'm a little sleepy." }, { pic: "feel-hungry", label: "I'm hungry." }] },
            repeatAfterMe(["I'm great!", "I'm tired.", "I'm a little sleepy.", "I'm hungry."]),
            { type: "try", question: pick("ed-m4-l1-try", "Kamu kurang tidur semalam. Jawab “How are you?”…", ["I'm a little sleepy.", "I'm hungry.", "I'm fishing.", "I'm delicious."], 0, "Kurang tidur → sleepy (ngantuk).", { image: "feel-sleepy" }) },
          ],
        },
        {
          title: "Mini review Modul 1–3",
          blocks: [
            { type: "text", md: "Seperti main **Charades Vocab** di kelas: lihat kata Indonesia, tebak bahasa Inggrisnya." },
            { type: "try", question: pair("ed-m4-l1-review1", "Review Modul 1–2.", [["rekan kerja", "colleague"], ["atasan", "supervisor"], ["sarapan", "breakfast"], ["lembur", "overtime"]], "Ingatanmu mantap!") },
            { type: "try", question: pair("ed-m4-l1-review2", "Review Modul 3.", [["pedas", "spicy"], ["gurih", "savory"], ["kepiting", "crab"], ["warung", "food stall"]], "Pedas = spicy, gurih = savory, kepiting = crab, warung = food stall.") },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m4-l1-c1", "“I'm hungry.” artinya…", ["Saya lapar.", "Saya marah.", "Saya capek.", "Saya senang."], 0, "Hungry = lapar."),
        listenPick("ed-m4-l1-c2", say(["man", "I'm tired."]), "Dengarkan. Bagaimana perasaannya?", ["pic:feel-tired|Capek", "pic:feel-great|Senang sekali", "pic:feel-hungry|Lapar", "pic:feel-sleepy|Ngantuk"], 0, "Tired = capek."),
        pick("ed-m4-l1-c3", "“Pelanggan” = …", ["customer", "colleague", "supervisor", "costume"], 0, "Review Modul 1."),
        fill("ed-m4-l1-c4", "Review Modul 2: “macet” = traffic …", "traffic", "", ["jam"], "Traffic jam."),
        pick("ed-m4-l1-c5", "Jam 12 siang dan kamu belum makan. Jawaban paling jujur untuk “How are you?”…", ["I'm great, thanks!", "I'm hungry!", "I'm sleepy.", "I'm cooked."], 1, "Belum makan siang → hungry.", { hots: true }),
      ],
    },
    {
      id: "ed-m4-l2",
      skill: "speaking",
      title: "Key Phrases: Hobi & Akhir Pekan",
      summary: "On weekends I usually…, I enjoy…, Last weekend I…, This weekend I'm going to…",
      sections: [
        {
          title: "Frasa kunci",
          blocks: [
            phrases([
              ["On weekends, I usually ___.", "Di akhir pekan, saya biasanya ___."],
              ["I like / love / enjoy ___ing.", "Saya suka ___."],
              ["I've been doing this since ___.", "Saya sudah melakukan ini sejak ___."],
              ["I do it with ___.", "Saya melakukannya dengan ___."],
              ["Last weekend, I ___.", "Akhir pekan lalu, saya ___."],
              ["This weekend, I'm going to ___.", "Akhir pekan ini saya akan ___."],
            ]),
            repeatAfterMe(["On weekends, I usually go fishing.", "I enjoy cycling.", "I've been doing this since 2015.", "Last weekend, I visited my parents.", "This weekend, I'm going to stay at home."]),
          ],
        },
        {
          title: "Cerita yang sudah lewat",
          blocks: [
            { type: "text", md: "Untuk cerita yang **sudah lewat**, kata kerjanya sering berubah. Hafalkan saja 6 yang paling sering:" },
            phrases([["go → went", "pergi"], ["eat → ate", "makan"], ["watch → watched", "menonton"], ["play → played", "bermain"], ["visit → visited", "mengunjungi"], ["stay → stayed", "tinggal/diam di"]], ["Sekarang → Lampau", "Arti"]),
            dialog("What do you do on weekends?", say(
              ["woman", "What do you do on weekends?"],
              ["man", "I usually go fishing with my friends. I've been doing this since 2015. Last weekend, I caught three fish!"],
              ["woman", "Wow! This weekend, I'm going to stay at home and watch movies."],
            )),
            { type: "try", question: pick("ed-m4-l2-try", "“Last weekend, I ___ to the beach.”", ["go", "went", "going", "goes"], 1, "Last weekend (sudah lewat) → went.") },
          ],
        },
      ],
      checkpoint: [
        listenPick("ed-m4-l2-c1", say(["man", "Last weekend, I caught three fish!"]), "Dengarkan. Apa yang ia lakukan akhir pekan lalu?", ["pic:fishing|Memancing", "pic:bicycle|Bersepeda", "pic:tv|Nonton film", "pic:gamepad|Main game"], 0, "Caught fish = menangkap ikan (memancing)."),
        pick("ed-m4-l2-c2", "“Akhir pekan ini saya akan bersih-bersih rumah.”", ["This weekend, I'm going to clean the house.", "Last weekend, I cleaned the house.", "On weekends, I clean the house.", "I clean house weekend."], 0, "Rencana → I'm going to + kegiatan."),
        fill("ed-m4-l2-c3", "Lengkapi (lampau dari watch).", "Last weekend, I", "a movie.", ["watched"], "Watch → watched."),
        arrange("ed-m4-l2-c4", "Susun.", "I enjoy cycling with my friends", "I enjoy + kegiatan -ing."),
        pick("ed-m4-l2-c5", "Mana yang membicarakan RENCANA?", ["Last weekend, I stayed at home.", "This weekend, I'm going to visit my parents.", "I usually play games.", "I've been doing this since 2015."], 1, "I'm going to = rencana yang akan datang.", { hots: true }),
      ],
    },
    {
      id: "ed-m4-l3",
      skill: "vocabulary",
      title: "Vocab of the Day: Waktu Luang",
      summary: "Fishing, exercise, cycling, play games, family gathering, hang out, plan, boring.",
      sections: [
        {
          title: "Kosakata hari ini",
          blocks: [
            {
              type: "vocab",
              items: [
                { emoji: "🎣", pic: "fishing", word: "fishing", meaning: "memancing", example: "I go fishing on Saturday." },
                { emoji: "🏃", pic: "run", word: "exercise", meaning: "olahraga", example: "I exercise every Sunday morning." },
                { emoji: "🚲", pic: "bicycle", word: "cycling", meaning: "bersepeda", example: "We go cycling near the beach." },
                { emoji: "🎮", pic: "gamepad", word: "play games", meaning: "bermain game", example: "My son plays games all day." },
                { emoji: "👨‍👩‍👧", pic: "lunch", word: "family gathering", meaning: "kumpul keluarga", example: "We have a family gathering." },
                { emoji: "🧹", pic: "house", word: "clean the house", meaning: "bersih-bersih rumah", example: "I clean the house on Saturday." },
                { emoji: "😌", pic: "feel-sleepy", word: "rest / relax", meaning: "istirahat / santai", example: "I just relax at home." },
                { emoji: "☕", pic: "coffee", word: "hang out", meaning: "nongkrong", example: "We hang out at a cafe." },
                { emoji: "📅", pic: "calendar", word: "plan", meaning: "rencana", example: "I have no plans this weekend." },
                { emoji: "🥱", pic: "feel-tired", word: "boring", meaning: "membosankan", example: "The weekend was boring." },
              ],
            },
            { type: "tip", md: "Tidak punya hobi? Tidak masalah. **I sleep** atau **I watch TV** juga jawaban yang sah, kok." },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m4-l3-c1", "“Nongkrong” = …", ["hang out", "hang up", "go out work", "sit down"], 0, "Nongkrong = hang out."),
        listenPick("ed-m4-l3-c2", say(["woman", "We go cycling near the beach."]), "Dengarkan. Apa kegiatannya?", ["pic:bicycle", "pic:fishing", "pic:gamepad", "pic:tv"], 0, "Cycling = bersepeda."),
        fill("ed-m4-l3-c3", "Lengkapi.", "I have no", "this weekend. (rencana)", ["plans", "plan"], "Rencana = plan(s)."),
        pair("ed-m4-l3-c4", "Pasangkan.", [["olahraga", "exercise"], ["kumpul keluarga", "family gathering"], ["membosankan", "boring"], ["santai", "relax"]], "Keren!"),
        pick("ed-m4-l3-c5", "“The weekend was boring.” Kenapa kira-kira?", ["Karena banyak kegiatan seru.", "Karena tidak ada kegiatan dan hanya diam.", "Karena ia memenangkan lomba.", "Karena ia pergi berlibur."], 1, "Boring = membosankan, biasanya karena tidak ada yang dilakukan.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ed-m4-quiz",
    title: "Kuis Modul 4",
    passPercent: 70,
    questions: [
      pick("ed-m4-q1", "Gambar ini…", ["fishing", "cycling", "swimming", "running"], 1, "Cycling = bersepeda.", { image: "bicycle" }),
      listenPick("ed-m4-q2", say(["man", "This weekend, I'm going to visit my parents."]), "Dengarkan. Kapan ia mengunjungi orang tuanya?", ["Akhir pekan lalu", "Akhir pekan ini", "Setiap hari", "Tidak pernah"], 1, "This weekend + I'm going to = akhir pekan ini."),
      pick("ed-m4-q3", "Lampau dari “eat”…", ["eated", "ate", "eaten", "eats"], 1, "Eat → ate."),
      arrange("ed-m4-q4", "Susun.", "Last weekend I stayed at home", "Last weekend + kata kerja lampau."),
      fill("ed-m4-q5", "Lengkapi.", "On weekends, I", "go fishing. (biasanya)", ["usually"], "Usually = biasanya."),
      pair("ed-m4-q6", "Pasangkan perasaan.", [["pic:feel-great", "great"], ["pic:feel-tired", "tired"], ["pic:feel-sleepy", "sleepy"], ["pic:feel-hungry", "hungry"]], "Great = senang sekali, tired = capek, sleepy = ngantuk, hungry = lapar."),
      pick("ed-m4-q7", "“I've been doing this since 2015.” artinya…", ["Saya akan melakukan ini tahun 2015.", "Saya sudah melakukan ini sejak 2015.", "Saya berhenti melakukan ini tahun 2015.", "Saya tidak pernah melakukan ini."], 1, "Since = sejak."),
      listenPick("ed-m4-q8", say(["woman", "I just relax at home."]), "Dengarkan. Apa yang ia lakukan?", ["Santai di rumah", "Bersih-bersih rumah", "Pergi nongkrong", "Olahraga"], 0, "Relax at home = santai di rumah."),
      pick("ed-m4-q9", "Mana kalimat yang BENAR?", ["Last weekend, I go to the beach.", "Last weekend, I went to the beach.", "Last weekend, I going to the beach.", "Last weekend, I will go to the beach."], 1, "Last weekend → went."),
      pick("ed-m4-q10", "Main “Two Truths and a Lie”: “I went fishing. I ate crab. I visited the moon.” Mana yang bohong?", ["I went fishing.", "I ate crab.", "I visited the moon.", "Semuanya benar"], 2, "Tidak ada yang mengunjungi bulan akhir pekan lalu!", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz Modul 4 — Weekend Fun",
    questions: [
      live("ed-m4-live1", "Kegiatan di gambar?", ["cycling", "fishing", "camping", "swimming"], 1, "fishing"),
      live("ed-m4-live2", "Lampau dari “go”?", ["goed", "gone", "went", "going"], 2, "plane"),
      live("ed-m4-live3", "“Nongkrong” = …", ["hang out", "hang on", "go home", "stay up"], 0, "coffee"),
      live("ed-m4-live4", "Perasaan di gambar?", ["hungry", "sleepy", "great", "angry"], 1, "feel-sleepy"),
      live("ed-m4-live5", "This weekend, I'm going ___ visit my parents.", ["to", "for", "at", "on"], 0, "calendar"),
      live("ed-m4-live6", "“Membosankan” = …", ["bored", "boring", "bore", "busy"], 1, "feel-tired"),
      live("ed-m4-live7", "Kegiatan di gambar?", ["play games", "watch TV", "cook", "read"], 0, "gamepad"),
      live("ed-m4-live8", "Lampau dari “watch”?", ["watched", "watcht", "wotch", "watching"], 0, "tv"),
      live("ed-m4-live9", "“Olahraga” = …", ["exercise", "excuse", "extra", "exit"], 0, "run"),
      live("ed-m4-live10", "I enjoy ___.", ["cycle", "cycling", "to cycling", "cycled"], 1, "bicycle"),
    ],
  },
};
