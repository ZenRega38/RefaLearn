import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, fill, listenPick, pair, pick, pickMany, say } from "./helpers";

export const BAB1: Level = {
  id: "sd3-bab1",
  title: "Bab 1 — Hello, Friends!",
  description: "Menyapa teman dan guru, memperkenalkan diri, dan menyebut umur dengan angka 1–10.",
  targetScore: "Menyimak–Berbicara",
  pretest: {
    id: "sd3-b1-pre",
    title: "Pretest Bab 1",
    passPercent: 0,
    questions: [
      pick("sd3-b1-pre1", "Kata “Hello” artinya…", ["Halo", "Selamat tidur", "Terima kasih", "Sampai jumpa"], 0, "Hello = halo. Kata sapaan paling umum dalam bahasa Inggris."),
      pick("sd3-b1-pre2", "Pagi hari kita menyapa dengan…", ["Good night", "Good morning", "Goodbye", "Good evening"], 1, "Morning = pagi, jadi “Good morning” = selamat pagi."),
      listenPick("sd3-b1-pre3", say(["woman", "Five."]), "Dengarkan. Angka berapa yang disebut?", ["3", "5", "7", "9"], 1, "Five = lima."),
      pick("sd3-b1-pre4", "“What is your name?” artinya…", ["Berapa umurmu?", "Siapa namamu?", "Di mana rumahmu?", "Apa kabar?"], 1, "Name = nama. What is your name? = Siapa namamu?"),
      pick("sd3-b1-pre5", "Saat berpisah dengan teman, kita bilang…", ["Hello", "Good morning", "Goodbye", "Thank you"], 2, "Goodbye = selamat tinggal / sampai jumpa."),
    ],
  },
  lessons: [
    {
      id: "sd3-b1-l1",
      skill: "vocabulary",
      title: "Greetings — Kata Sapaan",
      summary: "Hello, good morning, good afternoon, goodbye, dan teman-temannya.",
      minutes: 10,
      sections: [
        {
          title: "Ayo menyapa!",
          blocks: [
            {
              type: "text",
              md: "Halo! 👋 Kalau ketemu teman atau guru, pasti kita menyapa dulu, kan? Dalam bahasa Inggris, sapaannya beda-beda tergantung **waktunya**. Ketuk kartu di bawah untuk mendengar cara mengucapkannya.",
            },
            {
              type: "vocab",
              items: [
                { emoji: "👋", word: "Hello", meaning: "Halo (kapan saja)" },
                { emoji: "🌅", word: "Good morning", meaning: "Selamat pagi" },
                { emoji: "☀️", word: "Good afternoon", meaning: "Selamat siang/sore" },
                { emoji: "🌇", word: "Good evening", meaning: "Selamat malam (saat bertemu)" },
                { emoji: "🌙", word: "Good night", meaning: "Selamat tidur / malam (saat berpisah)" },
                { emoji: "🙋", word: "Goodbye", meaning: "Sampai jumpa" },
              ],
            },
            {
              type: "tip",
              md: "Hati-hati ya: **Good night** dipakai saat mau **tidur** atau **berpisah** di malam hari, bukan saat bertemu. Kalau bertemu di malam hari, pakai **Good evening**.",
            },
          ],
        },
        {
          title: "Coba tebak!",
          blocks: [
            {
              type: "try",
              question: pick("sd3-b1-l1-try1", "Jam 7 pagi kamu bertemu Bu Guru di gerbang sekolah. Kamu bilang…", ["Good night, Ma'am!", "Good morning, Ma'am!", "Goodbye, Ma'am!", "Good evening, Ma'am!"], 1, "Jam 7 itu pagi, jadi sapaannya Good morning. Ma'am dipakai untuk guru perempuan, Sir untuk guru laki-laki."),
            },
            {
              type: "try",
              question: pair("sd3-b1-l1-try2", "Pasangkan waktu dengan sapaannya.", [["🌅 Pagi", "Good morning"], ["☀️ Siang", "Good afternoon"], ["🌇 Malam (bertemu)", "Good evening"], ["🌙 Mau tidur", "Good night"]], "Sapaan mengikuti waktu: morning (pagi), afternoon (siang–sore), evening (malam), night (mau tidur)."),
            },
          ],
        },
      ],
      checkpoint: [
        pick("sd3-b1-l1-c1", "“Good afternoon” artinya…", ["Selamat pagi", "Selamat siang", "Selamat tidur", "Sampai jumpa"], 1, "Afternoon = siang sampai sore."),
        listenPick("sd3-b1-l1-c2", say(["man", "Good night, Mom!"]), "Dengarkan. Kapan anak itu mengucapkannya?", ["Saat bangun pagi", "Saat mau tidur", "Saat pulang sekolah siang", "Saat makan siang"], 1, "Good night diucapkan saat mau tidur."),
        fill("sd3-b1-l1-c3", "Lengkapi sapaannya.", "Good", "! (selamat pagi)", ["morning"], "Selamat pagi = Good morning."),
        pick("sd3-b1-l1-c4", "Pulang sekolah, kamu berpisah dengan sahabatmu. Kamu bilang…", ["Good morning!", "Hello!", "Goodbye!", "Good evening!"], 2, "Saat berpisah kita bilang Goodbye atau Bye!"),
        pick("sd3-b1-l1-c5", "Jam 8 malam, Tante datang berkunjung ke rumah. Sapaan yang paling tepat adalah…", ["Good night, Auntie!", "Good evening, Auntie!", "Good morning, Auntie!", "Goodbye, Auntie!"], 1, "Malam hari dan baru bertemu → Good evening. Good night dipakai saat berpisah atau mau tidur.", { hots: true }),
      ],
    },
    {
      id: "sd3-b1-l2",
      skill: "speaking",
      title: "Introducing Myself — Memperkenalkan Diri",
      summary: "My name is…, I am … years old, dan bertanya nama teman.",
      minutes: 12,
      sections: [
        {
          title: "Dengarkan Dina dan Beni",
          blocks: [
            { type: "text", md: "Dina anak baru di kelas 3. Yuk dengarkan bagaimana dia berkenalan dengan Beni." },
            {
              type: "audio",
              caption: "Dina meets Beni",
              showTranscript: true,
              script: say(
                ["woman", "Hello! My name is Dina. What is your name?"],
                ["man", "Hi, Dina! My name is Beni. How old are you?"],
                ["woman", "I am eight years old."],
                ["man", "Me too! Nice to meet you, Dina."],
                ["woman", "Nice to meet you too, Beni."]
              ),
            },
            {
              type: "table",
              head: ["Kalimat", "Artinya"],
              rows: [
                ["My name is Dina.", "Namaku Dina."],
                ["What is your name?", "Siapa namamu?"],
                ["How old are you?", "Berapa umurmu?"],
                ["I am eight years old.", "Umurku delapan tahun."],
                ["Nice to meet you.", "Senang bertemu denganmu."],
              ],
            },
          ],
        },
        {
          title: "Angka 1–10",
          blocks: [
            { type: "text", md: "Untuk menyebut umur, kita butuh angka. Ketuk kartunya dan tirukan pelan-pelan ya!" },
            {
              type: "vocab",
              items: [
                { emoji: "1️⃣", word: "one", meaning: "satu" },
                { emoji: "2️⃣", word: "two", meaning: "dua" },
                { emoji: "3️⃣", word: "three", meaning: "tiga" },
                { emoji: "4️⃣", word: "four", meaning: "empat" },
                { emoji: "5️⃣", word: "five", meaning: "lima" },
                { emoji: "6️⃣", word: "six", meaning: "enam" },
                { emoji: "7️⃣", word: "seven", meaning: "tujuh" },
                { emoji: "8️⃣", word: "eight", meaning: "delapan" },
                { emoji: "9️⃣", word: "nine", meaning: "sembilan" },
                { emoji: "🔟", word: "ten", meaning: "sepuluh" },
              ],
            },
            {
              type: "try",
              question: arrange("sd3-b1-l2-try", "Susun kata-kata ini jadi kalimat perkenalan.", "My name is Beni", "Pola perkenalan: My name is + nama."),
            },
          ],
        },
      ],
      checkpoint: [
        listenPick("sd3-b1-l2-c1", say(["woman", "I am nine years old."]), "Dengarkan. Berapa umurnya?", ["7 tahun", "8 tahun", "9 tahun", "10 tahun"], 2, "Nine = sembilan."),
        arrange("sd3-b1-l2-c2", "Susun jadi pertanyaan “Siapa namamu?”", "What is your name", "What is your name? = Siapa namamu?"),
        fill("sd3-b1-l2-c3", "Isi angkanya dalam bahasa Inggris.", "I am", "years old. (umurku 8 tahun)", ["eight"], "8 = eight."),
        pair("sd3-b1-l2-c4", "Pasangkan angka dengan kata bahasa Inggrisnya.", [["3", "three"], ["6", "six"], ["7", "seven"], ["10", "ten"]], "Three, six, seven, ten — bagus!"),
        pick("sd3-b1-l2-c5", "Beni bilang “How old are you?”. Jawaban Dina yang tepat adalah…", ["My name is Dina.", "I am eight years old.", "Good morning.", "Nice to meet you."], 1, "How old are you? menanyakan umur, jadi jawabannya tentang umur.", { hots: true }),
      ],
    },
    {
      id: "sd3-b1-l3",
      skill: "reading",
      title: "Reading & Writing — Kartu Perkenalan",
      summary: "Membaca kartu perkenalan teman dan menulis perkenalan diri sendiri.",
      minutes: 10,
      sections: [
        {
          title: "Baca kartu Sari",
          blocks: [
            {
              type: "passage",
              passage: {
                id: "sd3-b1-sari",
                title: "Hello, I am Sari!",
                lines: [
                  "Hello! My name is Sari.",
                  "I am eight years old.",
                  "I am in grade three.",
                  "I live in Tarakan.",
                  "Nice to meet you!",
                ],
              },
            },
            {
              type: "try",
              question: pick("sd3-b1-l3-try", "Sari tinggal di mana?", ["Jakarta", "Tarakan", "Bandung", "Grade three"], 1, "Baris 4: I live in Tarakan.", { passageId: "sd3-b1-sari" }),
            },
          ],
        },
        {
          title: "Sekarang giliranmu!",
          blocks: [
            {
              type: "text",
              md: "Kamu bisa membuat kartu perkenalan sendiri dengan pola ini:\n\n- Hello! My name is **(namamu)**.\n- I am **(umur)** years old.\n- I am in grade **three**.\n- I live in **(kotamu)**.",
            },
            { type: "tip", md: "Nama orang dan nama kota selalu diawali **huruf kapital**: **S**ari, **T**arakan." },
          ],
        },
      ],
      checkpoint: [
        pick("sd3-b1-l3-c1", "Berapa umur Sari?", ["7", "8", "9", "3"], 1, "Baris 2: I am eight years old.", { passageId: "sd3-b1-sari" }),
        fill("sd3-b1-l3-c2", "Lengkapi kalimat Sari.", "I am in grade", ".", ["three", "3"], "Sari kelas tiga → grade three.", { passageId: "sd3-b1-sari" }),
        pickMany("sd3-b1-l3-c3", "Pilih SEMUA kata yang harus diawali huruf kapital.", ["sari", "tarakan", "name", "dina"], [0, 1, 3], "Nama orang (Sari, Dina) dan nama kota (Tarakan) diawali huruf kapital."),
        arrange("sd3-b1-l3-c4", "Susun kalimat ini.", "I live in Tarakan", "I live in + nama kota = Aku tinggal di …"),
        pick("sd3-b1-l3-c5", "Kalimat mana yang TIDAK cocok untuk kartu perkenalan?", ["My name is Raka.", "I am nine years old.", "Good night, Mom!", "I live in Tarakan."], 2, "Good night, Mom! itu ucapan mau tidur, bukan perkenalan diri.", { hots: true }),
      ],
      passages: [
        { id: "sd3-b1-sari", title: "Hello, I am Sari!", lines: ["Hello! My name is Sari.", "I am eight years old.", "I am in grade three.", "I live in Tarakan.", "Nice to meet you!"] },
      ],
    },
  ],
  quiz: {
    id: "sd3-b1-post",
    title: "Posttest Bab 1",
    passPercent: 70,
    questions: [
      pick("sd3-b1-post1", "Selamat siang dalam bahasa Inggris adalah…", ["Good morning", "Good afternoon", "Good night", "Goodbye"], 1, "Good afternoon = selamat siang."),
      listenPick("sd3-b1-post2", say(["man", "Hello, my name is Raka."]), "Dengarkan. Siapa nama anak itu?", ["Rina", "Raka", "Beni", "Dina"], 1, "My name is Raka."),
      listenPick("sd3-b1-post3", say(["woman", "Seven."]), "Dengarkan. Angka berapa?", ["6", "7", "8", "9"], 1, "Seven = tujuh."),
      arrange("sd3-b1-post4", "Susun jadi pertanyaan “Berapa umurmu?”", "How old are you", "How old are you? = Berapa umurmu?"),
      fill("sd3-b1-post5", "Lengkapi.", "Nice to", "you! (senang bertemu denganmu)", ["meet"], "Nice to meet you = senang bertemu denganmu."),
      pair("sd3-b1-post6", "Pasangkan.", [["two", "2"], ["four", "4"], ["nine", "9"], ["five", "5"]], "Two, four, five, nine."),
      pick("sd3-b1-post7", "Pagi-pagi Rina bertemu Pak Guru. Rina mau menyapa dengan sopan. Rina bilang…", ["Bye, Sir!", "Good morning, Sir!", "Good night, Sir!", "Hello, Mom!"], 1, "Pagi hari + guru laki-laki → Good morning, Sir!", { hots: true }),
      pick("sd3-b1-post8", "Adik Beni berumur 2 tahun lebih muda dari Beni. Beni berumur 8 tahun. Adiknya bilang…", ["I am six years old.", "I am ten years old.", "I am eight years old.", "I am two years old."], 0, "8 − 2 = 6, jadi adiknya six years old.", { hots: true }),
    ],
  },
};
