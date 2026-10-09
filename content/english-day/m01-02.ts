import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, dialog, fill, listenPick, live, pair, phrases, pick, pickMany, repeatAfterMe, say } from "./helpers";

// Module 1 — Introducing Yourself · Module 2 — Family & Daily Routine
// Questions, options and titles are all English; explanations stay Indonesian.

export const M1: Level = {
  id: "ed-m1",
  title: "Module 1 — Introducing Yourself",
  description: "Sapaan pembuka kelas, memperkenalkan diri (nama, divisi, lama kerja, hobi), dan kalimat penyelamat “How do you say ___ in English?”.",
  targetScore: "Phase 1 · Personal",
  cover: ["staff", "chat", "thumbs-up"],
  lessons: [
    {
      id: "ed-m1-l1",
      skill: "speaking",
      title: "Greetings & Key Phrases",
      summary: "Ritual sapaan tiap kelas dan 5 frasa kunci untuk memperkenalkan diri.",
      sections: [
        {
          title: "Our Greeting Ritual",
          blocks: [
            { type: "pictures", items: [{ pic: "owl-wave", label: "Oli" }], caption: "Halo! Aku Oli. Di kelas ini kita tidak belajar rumus, kita belajar berani ngomong. Pelan-pelan saja, ya." },
            {
              type: "text",
              md: "Setiap kelas English Day selalu dibuka dengan sapaan yang sama. Karena diulang tiap minggu, lama-lama keluar sendiri tanpa mikir.\n\n**Good morning!** (pagi) atau **Good afternoon!** (siang–sore) → **How are you?** → **I'm fine, thank you. And you?**",
            },
            dialog("Greeting ritual", say(["woman", "Good morning!"], ["man", "Good morning!"], ["woman", "How are you?"], ["man", "I'm fine, thank you. And you?"], ["woman", "I'm fine too, thanks."])),
            {
              type: "tip",
              md: "Kalimat penyelamat paling penting: **How do you say ___ in English?** (Bahasa Inggrisnya ___ apa?). Kalau mentok di satu kata, pakai kalimat ini. Boleh juga campur Bahasa Indonesia, kata itu justru jadi bahan belajar kita.",
            },
            { type: "try", question: pick("ed-m1-l1-try1", "Your friend says: “How are you?” What is the best reply?", ["My name is Budi.", "I'm fine, thank you. And you?", "Good night!", "I work in billing."], 1, "“How are you?” menanyakan kabar. Jawab dengan kabarmu, lalu tanya balik: And you?") },
          ],
        },
        {
          title: "Key Phrases to Introduce Yourself",
          blocks: [
            phrases([
              ["My name is ___.", "Nama saya ___."],
              ["I work in the ___ department.", "Saya bekerja di departemen ___."],
              ["I have been working here for ___ (years/months).", "Saya sudah bekerja di sini selama ___."],
              ["In my free time, I like ___.", "Di waktu luang, saya suka ___."],
              ["Nice to meet you!", "Senang bertemu Anda!"],
            ]),
            repeatAfterMe(["My name is Rani.", "I work in the household department.", "I have been working here for three years.", "In my free time, I like cooking.", "Nice to meet you!"]),
            { type: "tip", md: "Tidak perlu tahu nama tenses-nya. Hafalkan saja kalimat utuhnya (*chunk*), lalu ganti bagian kosongnya dengan cerita kamu sendiri." },
            { type: "try", question: arrange("ed-m1-l1-try2", "Put the words in order to say which department you work in.", "I work in the household department", "Pola: I work in the + nama divisi + department.") },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m1-l1-c1", "Which sentence tells someone your name?", ["My name is Rani.", "Your name is Rani.", "Name me Rani.", "I am name Rani."], 0, "Pola: My name is + nama."),
        listenPick("ed-m1-l1-c2", say(["man", "I work in the billing department."]), "Listen. Which department does he work in?", ["pic:bill|Billing", "pic:technician|Technical support", "pic:house|Household", "pic:money|Sales"], 0, "Billing department = bagian penagihan."),
        fill("ed-m1-l1-c3", "Complete the sentence.", "I have been working here", "three years.", ["for"], "Untuk lama waktu pakai **for**: for three years, for six months."),
        arrange("ed-m1-l1-c4", "Put the words in order to talk about your hobby.", "In my free time I like fishing", "In my free time, I like + kegiatan (-ing)."),
        pick("ed-m1-l1-c5", "You want to say a word in English, but you forget it. What should you ask?", ["What is your name?", "How do you say “pelanggan” in English?", "How are you?", "Nice to meet you."], 1, "Kalimat penyelamat: How do you say ___ in English?", { hots: true }),
      ],
    },
    {
      id: "ed-m1-l2",
      skill: "listening",
      title: "Let's Talk: Meeting a Colleague",
      summary: "Dialog Rani dan Budi, pertanyaan pemandu ngobrol, dan cara bercerita tentang teman.",
      sections: [
        {
          title: "Listen to Rani and Budi",
          blocks: [
            { type: "pictures", items: [{ pic: "staff", label: "Rani" }, { pic: "customer", label: "Budi" }] },
            dialog("Rani meets Budi", say(
              ["woman", "Hi, my name is Rani. I work in the household department. I like cooking in my free time. What about you?"],
              ["man", "Hi Rani, nice to meet you. My name is Budi. I work in billing too. I like fishing."],
            )),
            { type: "tip", md: "**What about you?** (Kalau kamu?) adalah cara gampang melempar pertanyaan balik, jadi obrolan tidak berhenti." },
            { type: "try", question: pick("ed-m1-l2-try1", "What is Budi's hobby?", ["Cooking", "Fishing", "Cycling", "Singing"], 1, "Budi: “I like fishing.”") },
          ],
        },
        {
          title: "Conversation Questions",
          blocks: [
            { type: "text", md: "Pakai pertanyaan ini saat ngobrol berpasangan. Jawaban pendek sudah cukup!" },
            phrases([
              ["What's your name, and how long have you worked at Telkomsel?", "My name is Ardi. I have been working here for five years."],
              ["What do you do in the household division?", "I check customer payments."],
              ["What do you like to do in your free time?", "I like watching movies."],
              ["Do you have a nickname?", "Yes. My nickname is Didi."],
              ["What's one thing people don't know about you?", "I can play the guitar!"],
            ], ["Question", "Sample answer"]),
          ],
        },
        {
          title: "Talk About Your Partner",
          blocks: [
            { type: "text", md: "Setelah ngobrol, kita cerita ke kelas tentang pasangan kita:\n\n> *This is Budi. He works in billing. He likes fishing.*" },
            { type: "tip", md: "Kalau bercerita tentang **he/she** (dia), kata kerjanya dapat tambahan **-s**: *I work* → *he work**s***, *I like* → *she like**s***." },
            { type: "try", question: pick("ed-m1-l2-try2", "“This is Rani. She ___ cooking.”", ["like", "likes", "liking", "is like"], 1, "She/he + kata kerja + s → she likes.") },
          ],
        },
      ],
      checkpoint: [
        listenPick("ed-m1-l2-c1", say(["woman", "Hi, my name is Rani. I work in the household department. I like cooking in my free time."]), "Listen. What is Rani's hobby?", ["pic:soup|Cooking", "pic:fishing|Fishing", "pic:gamepad|Playing games", "pic:bicycle|Cycling"], 0, "I like cooking = saya suka memasak."),
        pair("ed-m1-l2-c2", "Match each question with its answer.", [["What's your name?", "My name is Ardi."], ["Do you have a nickname?", "Yes, it's Didi."], ["What do you like to do?", "I like watching movies."], ["How long have you worked here?", "For five years."]], "Setiap pertanyaan punya pasangan jawaban yang logis."),
        pick("ed-m1-l2-c3", "“This is Budi. He ___ in billing.”", ["work", "works", "working", "are work"], 1, "He + works."),
        fill("ed-m1-l2-c4", "Ask your friend the same question back.", "What", "you?", ["about"], "What about you? = Kalau kamu?"),
        pick("ed-m1-l2-c5", "Your partner says, “I can play the guitar!” When you share with the class, you say…", ["I can play the guitar.", "He can play the guitar.", "You can play the guitar.", "We can play the guitar."], 1, "Kamu sedang bercerita tentang pasanganmu (dia), jadi pakai He/She.", { hots: true }),
      ],
    },
    {
      id: "ed-m1-l3",
      skill: "vocabulary",
      title: "Vocab of the Day: Work & Introductions",
      summary: "Department, billing, customer, colleague, supervisor, hobby, nickname, dan cara mengucapkannya.",
      sections: [
        {
          title: "Today's Words",
          blocks: [
            { type: "text", md: "Kata-kata ini paling sering “nyangkut” saat kita kenalan di kantor. Ketuk kartunya untuk dengar cara baca dan contoh kalimatnya." },
            {
              type: "vocab",
              items: [
                { emoji: "🏢", pic: "office", word: "department", meaning: "divisi", example: "I work in the household department." },
                { emoji: "🧾", pic: "bill", word: "billing", meaning: "penagihan", example: "She works in the billing team." },
                { emoji: "🙋", pic: "customer", word: "customer", meaning: "pelanggan", example: "We help customers with their WiFi problems." },
                { emoji: "🤝", pic: "meeting", word: "colleague", meaning: "rekan kerja", example: "Budi is my colleague." },
                { emoji: "👔", pic: "teacher-man", word: "supervisor", meaning: "atasan", example: "My supervisor is very kind." },
                { emoji: "📅", pic: "calendar", word: "years of service", meaning: "masa kerja", example: "I have three years of service." },
                { emoji: "🎣", pic: "fishing", word: "hobby", meaning: "hobi", example: "My hobby is fishing." },
                { emoji: "💬", pic: "chat", word: "nickname", meaning: "nama panggilan", example: "My nickname is Ardi." },
              ],
            },
          ],
        },
        {
          title: "How to Say It",
          blocks: [
            phrases([
              ["customer", "“KAS-tuh-mer”, bukan “kustomer”", "Tekanan di suku kata pertama"],
              ["work", "“werk”, bukan “wok”", "I work in billing."],
              ["the, this, that", "lidah sedikit di antara gigi", "Tidak harus sempurna"],
            ], ["Word", "Say it like", "Note"]),
            repeatAfterMe(["customer", "work", "colleague", "supervisor"]),
            { type: "try", question: pair("ed-m1-l3-try", "Match each word with its meaning.", [["colleague", "a person you work with"], ["supervisor", "the person who leads your team"], ["nickname", "a short name friends call you"], ["department", "a team or section in a company"]], "Mantap! Colleague = rekan kerja, supervisor = atasan, nickname = nama panggilan, department = divisi.") },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m1-l3-c1", "A person who pays for and uses our WiFi service is a…", ["colleague", "customer", "supervisor", "costumer"], 1, "Customer = pelanggan. Hati-hati, *costume(r)* itu kostum!"),
        listenPick("ed-m1-l3-c2", say(["woman", "Budi is my colleague."]), "Listen. Who is Budi?", ["Her boss", "A person she works with", "A customer", "Her little brother"], 1, "Colleague = rekan kerja."),
        fill("ed-m1-l3-c3", "Complete the sentence.", "My", "is fishing. I do it every weekend.", ["hobby"], "Hobi = hobby."),
        pickMany("ed-m1-l3-c4", "Choose ALL the words for people at work.", ["colleague", "supervisor", "billing", "customer", "department"], [0, 1, 3], "Colleague, supervisor, dan customer adalah orang. Billing dan department adalah bagian/divisi."),
        pick("ed-m1-l3-c5", "Which sentence is best for meeting someone new at the office?", ["My supervisor is fishing.", "I work in the billing department. Nice to meet you!", "The customer is my hobby.", "Good night, colleague!"], 1, "Menyebut divisi + Nice to meet you adalah perkenalan yang pas.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ed-m1-quiz",
    title: "Module 1 Quiz",
    passPercent: 70,
    questions: [
      pick("ed-m1-q1", "It's 2 p.m. and you walk into class. Which greeting is right?", ["Good morning!", "Good afternoon!", "Good night!", "Goodbye!"], 1, "Siang–sore = Good afternoon.", { image: "office" }),
      listenPick("ed-m1-q2", say(["man", "How are you?"]), "Listen. What is the best reply?", ["I'm fine, thank you. And you?", "My name is Budi.", "I work in billing.", "Nice to meet you."], 0, "How are you? → I'm fine, thank you. And you?"),
      arrange("ed-m1-q3", "Put the words in order.", "I have been working here for two years", "I have been working here for + lama waktu."),
      pick("ed-m1-q4", "The person who leads your team is very kind. You say…", ["My colleague is very kind.", "My supervisor is very kind.", "My customer is very kind.", "My hobby is very kind."], 1, "Atasan = supervisor."),
      fill("ed-m1-q5", "Complete the greeting.", "Nice to", "you!", ["meet"], "Nice to meet you!"),
      pick("ed-m1-q6", "“Rani likes cooking.” What does this tell you?", ["Cooking is something Rani enjoys.", "Rani is cooking right now.", "Rani doesn't like cooking.", "Rani is a chef."], 0, "Likes = suka. Rani suka memasak, bukan sedang memasak."),
      pair("ed-m1-q7", "Match each picture with its meaning.", [["pic:customer|customer", "a person who uses our service"], ["pic:bill|billing", "sending bills and collecting payments"], ["pic:office|department", "a team in a company"], ["pic:chat|nickname", "a short name friends call you"]], "Bagus! Customer = pelanggan, billing = penagihan, department = divisi, nickname = nama panggilan."),
      pick("ed-m1-q8", "“This is Ardi. He ___ in the billing team.”", ["work", "works", "working", "am work"], 1, "He + works."),
      listenPick("ed-m1-q9", say(["woman", "In my free time, I like watching movies."]), "Listen. What does she like doing?", ["pic:tv|Watching movies", "pic:fishing|Fishing", "pic:soup|Cooking", "pic:bicycle|Cycling"], 0, "Watching movies = menonton film."),
      pick("ed-m1-q10", "A classmate says, “I am work in billing.” What is the kindest way to help?", ["“Wrong! It's ‘I work’.”", "“Oh, you work in billing? Nice!”", "Say nothing and walk away.", "“You must study grammar first.”"], 1, "Ulangi versi benarnya dengan natural (recast). Teman tetap semangat ngomong.", { hots: true }),
    ],
  },
  live: {
    title: "Module 1 Live Quiz — Let's Get to Know Each Other!",
    questions: [
      live("ed-m1-live1", "“How are you?” — which reply is right?", ["I'm fine, thank you!", "My name is Rani.", "Good night!", "I like fishing."], 0, "owl-wave"),
      live("ed-m1-live2", "A person who uses our WiFi service is a…", ["colleague", "customer", "supervisor", "department"], 1, "customer"),
      live("ed-m1-live3", "Look at the picture. What is the hobby?", ["cooking", "cycling", "fishing", "singing"], 2, "fishing"),
      live("ed-m1-live4", "A person you work with is your…", ["colleague", "college", "customer", "cousin"], 0, "meeting"),
      live("ed-m1-live5", "I have been working here ___ 3 years.", ["since", "for", "at", "on"], 1, "calendar"),
      live("ed-m1-live6", "“This is Budi. He ___ in billing.”", ["work", "working", "works", "is work"], 2, "bill"),
      live("ed-m1-live7", "You forget a word. What do you ask?", ["How old are you?", "How do you say ___ in English?", "Where are you?", "What time is it?"], 1, "question"),
      live("ed-m1-live8", "The person who leads your team is your…", ["supervisor", "super", "customer", "nickname"], 0, "teacher-man"),
      live("ed-m1-live9", "It's 2 p.m. Which greeting?", ["Good morning", "Good evening", "Good night", "Good afternoon"], 3, "afternoon"),
      live("ed-m1-live10", "Friends call him “Ardi”. Which sentence is right?", ["My nickname is Ardi.", "My name call Ardi.", "I nickname Ardi.", "Ardi is my hobby."], 0, "chat"),
    ],
  },
};

export const M2: Level = {
  id: "ed-m2",
  title: "Module 2 — Family & Daily Routine",
  description: "Bercerita tentang dengan siapa kita tinggal, jam bangun, dan kegiatan sebelum dan sesudah kerja.",
  targetScore: "Phase 1 · Personal",
  cover: ["house", "alarm", "motorcycle"],
  lessons: [
    {
      id: "ed-m2-l1",
      skill: "speaking",
      title: "Key Phrases: Family & Routine",
      summary: "I live with…, I have…, I usually wake up at…, After work I usually…",
      sections: [
        {
          title: "Quick Recall",
          blocks: [
            { type: "text", md: "Masih ingat kata minggu lalu? Coba jawab dalam hati dulu, baru cek jawabannya." },
            { type: "try", question: pair("ed-m2-l1-recall", "Module 1 words: match each meaning with its word.", [["a team in a company", "department"], ["a person who uses our service", "customer"], ["a person you work with", "colleague"], ["the person who leads your team", "supervisor"]], "Kalau ada yang lupa, wajar. Buka lagi Vocab of the Day Modul 1 kapan saja.") },
          ],
        },
        {
          title: "Key Phrases",
          blocks: [
            phrases([
              ["I live with ___.", "Saya tinggal dengan ___."],
              ["I have ___ children / siblings.", "Saya punya ___ anak / saudara."],
              ["I usually wake up at ___.", "Saya biasanya bangun jam ___."],
              ["After work, I usually ___.", "Setelah kerja, saya biasanya ___."],
              ["On weekdays, I ___.", "Di hari kerja, saya ___."],
            ]),
            repeatAfterMe(["I live with my wife and two children.", "I have one sibling.", "I usually wake up at five.", "After work, I usually rest and watch TV.", "On weekdays, I go to work at seven."]),
            { type: "pictures", items: [{ pic: "alarm", label: "wake up" }, { pic: "shower", label: "take a shower" }, { pic: "motorcycle", label: "go to work" }, { pic: "tv", label: "watch TV" }] },
          ],
        },
        {
          title: "Telling the Time",
          blocks: [
            { type: "text", md: "Cukup pakai **at + angka**: *at five* (jam 5), *at six thirty* (jam 6.30), *at seven* (jam 7)." },
            { type: "try", question: listenPick("ed-m2-l1-try", say(["woman", "I usually wake up at six thirty."]), "Listen. What time does she wake up?", ["5:30", "6:00", "6:30", "7:30"], 2, "Six thirty = 6.30.") },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m2-l1-c1", "You live in the same house as your mother and father. You say…", ["I live with my parents.", "I live my parents.", "I with my parents live.", "I am live with parents."], 0, "I live with + orang."),
        fill("ed-m2-l1-c2", "Complete the sentence.", "I usually wake up", "five o'clock.", ["at"], "Jam pakai **at**: at five."),
        listenPick("ed-m2-l1-c3", say(["man", "After work, I usually play games."]), "Listen. What does he do after work?", ["pic:gamepad|Plays games", "pic:tv|Watches TV", "pic:fishing|Goes fishing", "pic:soup|Cooks"], 0, "Play games = main game."),
        arrange("ed-m2-l1-c4", "Put the words in order.", "I have two children", "I have + jumlah + children/siblings."),
        pick("ed-m2-l1-c5", "Your friend lives alone and doesn't want to talk much about family. A simple, polite answer is…", ["I live alone.", "I have no family, sorry.", "That is a secret question!", "I don't understand."], 0, "“I live alone.” atau “I live with my roommate.” jawaban yang wajar dan tidak perlu detail.", { hots: true }),
      ],
    },
    {
      id: "ed-m2-l2",
      skill: "listening",
      title: "Let's Talk: A Working Day",
      summary: "Dialog tentang keluarga dan rutinitas, pertanyaan pemandu, dan cerita tentang rutinitas teman.",
      sections: [
        {
          title: "Listen to the Dialogue",
          blocks: [
            dialog("Who do you live with?", say(
              ["woman", "Who do you live with?"],
              ["man", "I live with my wife and two children. I usually wake up at 5 AM. What about you?"],
              ["woman", "I live with my parents. After work, I usually rest and watch TV."],
            )),
            { type: "try", question: pick("ed-m2-l2-try", "What time does the man usually wake up?", ["5 AM", "6 AM", "7 AM", "He doesn't say."], 0, "“I usually wake up at 5 AM.”") },
          ],
        },
        {
          title: "Conversation Questions",
          blocks: [
            phrases([
              ["Who do you live with?", "I live with my husband and my daughter."],
              ["What time do you usually wake up?", "At five thirty."],
              ["What does a normal weekday look like for you?", "I wake up, have breakfast, and go to work."],
              ["What do you do after work?", "I usually rest at home."],
              ["Do you have children or pets?", "Yes, I have a cat!"],
            ], ["Question", "Sample answer"]),
          ],
        },
        {
          title: "Your Partner's Routine",
          blocks: [
            { type: "text", md: "> *Andi wakes up at 5. He drinks coffee. He rides a motorcycle to work.*" },
            { type: "pictures", items: [{ pic: "alarm", label: "wakes up" }, { pic: "coffee", label: "drinks coffee" }, { pic: "motorcycle", label: "rides a motorcycle" }] },
            { type: "tip", md: "Ingat: he/she + kata kerja **-s**: wake**s**, drink**s**, ride**s**." },
          ],
        },
      ],
      checkpoint: [
        listenPick("ed-m2-l2-c1", say(["woman", "I live with my parents. After work, I usually rest and watch TV."]), "Listen. Who does she live with?", ["Her husband", "Her parents", "Her children", "Nobody — she lives alone"], 1, "Parents = orang tua."),
        pick("ed-m2-l2-c2", "“Andi ___ coffee every morning.”", ["drink", "drinks", "drinking", "is drink"], 1, "He (Andi) + drinks."),
        pair("ed-m2-l2-c3", "Match each question with its answer.", [["Who do you live with?", "With my husband."], ["What time do you wake up?", "At five thirty."], ["Do you have pets?", "Yes, a cat."], ["What do you do after work?", "I rest at home."]], "Pas semua!"),
        arrange("ed-m2-l2-c4", "Put the words in order to describe her routine.", "She rides a motorcycle to work", "She + rides (pakai -s)."),
        pick("ed-m2-l2-c5", "Which sentence describes a ROUTINE (something you do every day)?", ["I usually wake up at five.", "I woke up late yesterday.", "I will wake up early tomorrow.", "Wake up!"], 0, "Usually (biasanya) menandakan kebiasaan sehari-hari.", { hots: true }),
      ],
    },
    {
      id: "ed-m2-l3",
      skill: "vocabulary",
      title: "Vocab of the Day: Family & Routine",
      summary: "Children, parents, sibling, overtime, morning shift, commute, breakfast, traffic jam…",
      sections: [
        {
          title: "Today's Words",
          blocks: [
            {
              type: "vocab",
              items: [
                { emoji: "👶", pic: "baby", word: "children", meaning: "anak-anak", example: "I have two children." },
                { emoji: "👫", pic: "mother", word: "wife / husband", meaning: "istri / suami", example: "My wife cooks every morning." },
                { emoji: "👪", pic: "grandfather", word: "parents", meaning: "orang tua", example: "I live with my parents." },
                { emoji: "🧒", pic: "brother", word: "sibling", meaning: "saudara kandung", example: "I have one sibling." },
                { emoji: "🌙", pic: "night", word: "overtime", meaning: "lembur", example: "I work overtime on Fridays." },
                { emoji: "🌅", pic: "morning", word: "morning shift", meaning: "shift pagi", example: "I am on the morning shift." },
                { emoji: "🏍️", pic: "motorcycle", word: "commute", meaning: "berangkat kerja", example: "I commute by motorcycle." },
                { emoji: "🍳", pic: "egg", word: "breakfast", meaning: "sarapan", example: "I have breakfast at 6." },
                { emoji: "🚿", pic: "shower", word: "take a shower", meaning: "mandi", example: "I take a shower at 5:30." },
                { emoji: "🚗", pic: "traffic", word: "traffic jam", meaning: "macet", example: "There is a traffic jam today." },
              ],
            },
          ],
        },
        {
          title: "Quick Practice",
          blocks: [
            { type: "try", question: pickMany("ed-m2-l3-try", "Choose ALL the words for family members.", ["parents", "sibling", "overtime", "children", "breakfast"], [0, 1, 3], "Parents, sibling, children = keluarga.") },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m2-l3-c1", "You stay at work after your normal hours. That is…", ["overtime", "over work", "late shift", "more time"], 0, "Lembur = overtime."),
        listenPick("ed-m2-l3-c2", say(["man", "There is a traffic jam today."]), "Listen. What is the problem today?", ["pic:traffic|Too many cars on the road", "pic:beach|A trip to the beach", "pic:night|Working late", "pic:shower|No water for a shower"], 0, "Traffic jam = macet."),
        fill("ed-m2-l3-c3", "Complete the sentence about your first meal of the day.", "I have", "at 6 a.m.", ["breakfast"], "Sarapan = breakfast."),
        pair("ed-m2-l3-c4", "Match each word with its meaning.", [["sibling", "a brother or sister"], ["parents", "your mother and father"], ["commute", "travel to and from work"], ["morning shift", "working hours that start early"]], "Keren! Sibling = saudara, parents = orang tua, commute = berangkat kerja, morning shift = shift pagi."),
        pick("ed-m2-l3-c5", "You are late because the road is full of cars. What do you say?", ["Sorry, there was a traffic jam.", "Sorry, I have breakfast.", "Sorry, I am on overtime.", "Sorry, my sibling."], 0, "Penyebabnya macet → traffic jam.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ed-m2-quiz",
    title: "Module 2 Quiz",
    passPercent: 70,
    questions: [
      pick("ed-m2-q1", "You have one brother. You say…", ["I have one sibling.", "I have one parent.", "I am one sibling.", "I live one sibling."], 0, "Saudara = sibling."),
      listenPick("ed-m2-q2", say(["woman", "I usually wake up at five thirty."]), "Listen. What time does she wake up?", ["5:00", "5:30", "3:50", "6:30"], 1, "Five thirty = 5.30.", false),
      fill("ed-m2-q3", "Complete the sentence.", "After work, I usually", "TV.", ["watch"], "Nonton TV = watch TV.", { image: "tv" }),
      pick("ed-m2-q4", "What does the picture show?", ["breakfast", "traffic jam", "overtime", "take a shower"], 1, "Banyak mobil berhenti = traffic jam.", { image: "traffic" }),
      arrange("ed-m2-q5", "Put the words in order.", "I commute by motorcycle", "Commute = berangkat kerja, by + kendaraan."),
      pick("ed-m2-q6", "“She ___ up at six.”", ["wake", "wakes", "waking", "is wake"], 1, "She + wakes."),
      pair("ed-m2-q7", "Match each picture with the activity.", [["pic:alarm|first thing", "wake up"], ["pic:shower|in the bathroom", "take a shower"], ["pic:egg|in the kitchen", "have breakfast"], ["pic:motorcycle|on the road", "go to work"]], "Rutinitas pagi lengkap!"),
      pick("ed-m2-q8", "“I work overtime on Fridays.” What does this mean?", ["I don't work on Fridays.", "I work late on Fridays.", "I go home early on Fridays.", "I work the morning shift on Fridays."], 1, "Overtime = lembur."),
      listenPick("ed-m2-q9", say(["man", "I live with my wife and two children."]), "Listen. How many people live in his house, including him?", ["Two", "Three", "Four", "Five"], 2, "Dia + istri + dua anak = 4 orang.", true),
      pick("ed-m2-q10", "Which morning routine is in the most logical order?", ["go to work → wake up → take a shower", "wake up → take a shower → go to work", "take a shower → go to work → wake up", "go to work → have breakfast → wake up"], 1, "Bangun, mandi, lalu berangkat kerja.", { hots: true }),
    ],
  },
  live: {
    title: "Module 2 Live Quiz — Daily Routine",
    questions: [
      live("ed-m2-live1", "What does the picture mean?", ["wake up", "go to sleep", "take a shower", "eat"], 0, "alarm"),
      live("ed-m2-live2", "The road is full of cars that don't move. It's a…", ["traffic light", "traffic jam", "car stop", "busy road"], 1, "traffic"),
      live("ed-m2-live3", "You work after your normal hours. You work…", ["overtime", "late time", "night work", "extra job"], 0, "night"),
      live("ed-m2-live4", "I usually wake up ___ five.", ["in", "on", "at", "for"], 2, "clock"),
      live("ed-m2-live5", "Your mother and father are your…", ["olds", "parents", "family old", "grandparents"], 1, "grandfather"),
      live("ed-m2-live6", "Look at the picture. What is he doing?", ["taking a shower", "having breakfast", "commuting", "watching TV"], 2, "motorcycle"),
      live("ed-m2-live7", "He ___ coffee every morning.", ["drink", "drinks", "drinking", "to drink"], 1, "coffee"),
      live("ed-m2-live8", "Your first meal of the day is…", ["lunch", "dinner", "breakfast", "snack"], 2, "egg"),
      live("ed-m2-live9", "Your brother or sister is your…", ["sibling", "cousin", "neighbor", "partner"], 0, "brother"),
      live("ed-m2-live10", "After work, I usually ___ TV.", ["see", "watch", "look", "read"], 1, "tv"),
    ],
  },
};
