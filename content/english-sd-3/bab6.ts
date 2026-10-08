import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, fill, listenPick, pair, pick, pickMany, say } from "./helpers";

const LUNCH: Passage = {
  id: "sd3-b6-lunch",
  title: "Lunch with Grandma",
  lines: [
    "On Sunday, I have lunch at Grandma's house.",
    "Grandma cooks rice, fish, and vegetables.",
    "I like fish. I do not like vegetables.",
    "Grandma says, “Vegetables make you strong!”",
    "So I eat my vegetables too.",
    "After lunch, we drink orange juice.",
  ],
};

export const BAB6: Level = {
  id: "sd3-bab6",
  title: "Bab 6 — Food I Like",
  description: "Nama makanan dan minuman, menyatakan suka/tidak suka, dan bertanya “Do you like…?”.",
  targetScore: "Menyimak–Berbicara · Membaca–Menulis",
  pretest: {
    id: "sd3-b6-pre",
    title: "Pretest Bab 6",
    passPercent: 0,
    questions: [
      pick("sd3-b6-pre1", "“Rice” artinya…", ["Roti", "Nasi", "Telur", "Susu"], 1, "Rice = nasi."),
      listenPick("sd3-b6-pre2", say(["woman", "Milk."]), "Dengarkan. Pilih gambarnya.", ["🥛", "🍞", "🍚", "🥚"], 0, "Milk = susu."),
      pick("sd3-b6-pre3", "“I like apples.” artinya…", ["Aku tidak suka apel.", "Aku suka apel.", "Aku makan apel.", "Aku beli apel."], 1, "Like = suka."),
      pick("sd3-b6-pre4", "Jawaban untuk “Do you like bread?” kalau kamu suka…", ["Yes, I do.", "No, I don't.", "Yes, I am.", "I am bread."], 0, "Suka → Yes, I do."),
      pick("sd3-b6-pre5", "Mana yang termasuk minuman?", ["egg", "water", "rice", "chicken"], 1, "Water = air, termasuk minuman."),
    ],
  },
  lessons: [
    {
      id: "sd3-b6-l1",
      skill: "vocabulary",
      title: "Food and Drinks — Makanan dan Minuman",
      summary: "Rice, bread, egg, fish, chicken, vegetables, milk, water, juice.",
      minutes: 10,
      sections: [
        {
          title: "Yummy! 😋",
          blocks: [
            { type: "text", md: "Apa sarapanmu tadi pagi? Nasi, roti, atau telur? Yuk pelajari nama makanan dan minuman dalam bahasa Inggris!" },
            {
              type: "vocab",
              title: "Food (makanan)",
              items: [
                { emoji: "🍚", word: "rice", meaning: "nasi" },
                { emoji: "🍞", word: "bread", meaning: "roti" },
                { emoji: "🥚", word: "egg", meaning: "telur" },
                { emoji: "🐟", word: "fish", meaning: "ikan" },
                { emoji: "🍗", word: "chicken", meaning: "ayam" },
                { emoji: "🥦", word: "vegetables", meaning: "sayur-sayuran" },
              ],
            },
            {
              type: "vocab",
              title: "Drinks (minuman)",
              items: [
                { emoji: "🥛", word: "milk", meaning: "susu" },
                { emoji: "💧", word: "water", meaning: "air" },
                { emoji: "🧃", word: "juice", meaning: "jus" },
                { emoji: "🍵", word: "tea", meaning: "teh" },
              ],
            },
          ],
        },
        {
          title: "Food or drink?",
          blocks: [
            { type: "try", question: pickMany("sd3-b6-l1-try", "Pilih SEMUA minuman.", ["milk", "bread", "juice", "egg", "tea"], [0, 2, 4], "Milk, juice, dan tea adalah minuman (drinks). Bread dan egg makanan (food).") },
          ],
        },
      ],
      checkpoint: [
        pair("sd3-b6-l1-c1", "Pasangkan gambar dengan katanya.", [["🍞", "bread"], ["🥚", "egg"], ["🥦", "vegetables"], ["💧", "water"]], "Bread, egg, vegetables, water!"),
        listenPick("sd3-b6-l1-c2", say(["man", "Juice."]), "Dengarkan. Pilih gambarnya.", ["🧃", "🥛", "🍵", "💧"], 0, "Juice = jus."),
        fill("sd3-b6-l1-c3", "Tulis nama makanannya. 🍚", "I eat", "every day.", ["rice"], "🍚 = rice."),
        pick("sd3-b6-l1-c4", "“Vegetables” artinya…", ["buah-buahan", "sayur-sayuran", "minuman", "kue"], 1, "Vegetables = sayur-sayuran."),
        pick("sd3-b6-l1-c5", "Mana yang tidak sekelompok?", ["milk", "water", "juice", "bread"], 3, "Milk, water, juice itu minuman. Bread itu makanan.", { hots: true }),
      ],
    },
    {
      id: "sd3-b6-l2",
      skill: "speaking",
      title: "I Like… / I Don't Like…",
      summary: "Menyatakan suka/tidak suka dan bertanya “Do you like…?”.",
      minutes: 12,
      sections: [
        {
          title: "Suka atau tidak?",
          blocks: [
            {
              type: "table",
              head: ["Kalimat", "Artinya"],
              rows: [
                ["I like milk. 😋", "Aku suka susu."],
                ["I don't like tea. 😖", "Aku tidak suka teh."],
                ["Do you like eggs?", "Kamu suka telur?"],
                ["Yes, I do. 👍", "Ya, aku suka."],
                ["No, I don't. 👎", "Tidak, aku tidak suka."],
              ],
            },
            { type: "tip", md: "**don't** adalah singkatan dari **do not**. Dua-duanya benar ya!" },
          ],
        },
        {
          title: "Dengarkan Sinta dan Bayu",
          blocks: [
            { type: "audio", caption: "Saat istirahat", showTranscript: true, script: say(["woman", "Bayu, do you like bread?"], ["man", "Yes, I do. I like bread with egg."], ["woman", "Do you like milk?"], ["man", "No, I don't. I like water."]) },
            { type: "try", question: pick("sd3-b6-l2-try", "Apa yang TIDAK disukai Bayu?", ["bread", "egg", "milk", "water"], 2, "Bayu bilang “No, I don't” saat ditanya tentang milk.") },
          ],
        },
      ],
      checkpoint: [
        pick("sd3-b6-l2-c1", "“Do you like fish?” — Kamu suka. Jawabanmu…", ["Yes, I do.", "No, I don't.", "Yes, I like.", "I am fish."], 0, "Suka → Yes, I do."),
        listenPick("sd3-b6-l2-c2", say(["woman", "I don't like vegetables."]), "Dengarkan. Apa yang tidak ia sukai?", ["🥦 sayur", "🍚 nasi", "🥛 susu", "🍗 ayam"], 0, "Vegetables = sayur."),
        arrange("sd3-b6-l2-c3", "Susun pertanyaannya.", "Do you like chicken", "Do you like + makanan?"),
        fill("sd3-b6-l2-c4", "Lengkapi jawabannya.", "No, I", ". (tidak, aku tidak suka)", ["don't", "do not", "dont"], "No, I don't."),
        pick("sd3-b6-l2-c5", "Temanmu alergi telur. Saat ditanya “Do you like eggs?”, jawaban yang PALING masuk akal…", ["Yes, I do. I eat eggs every day.", "No, I don't. I can't eat eggs.", "Yes, I am.", "I like eggs very much!"], 1, "Kalau alergi, ia tidak bisa makan telur, jadi jawabannya No, I don't.", { hots: true }),
      ],
    },
    {
      id: "sd3-b6-l3",
      skill: "reading",
      title: "Reading — Lunch with Grandma",
      summary: "Membaca cerita makan siang di rumah Nenek.",
      minutes: 12,
      passages: [LUNCH],
      sections: [
        {
          title: "Makan siang di rumah Nenek",
          blocks: [
            { type: "passage", passage: LUNCH },
            { type: "try", question: pick("sd3-b6-l3-try", "Kapan ia makan siang di rumah Nenek?", ["Monday", "Saturday", "Sunday", "Friday"], 2, "Baris 1: On Sunday.", { passageId: LUNCH.id }) },
          ],
        },
        {
          title: "Menulis tentang makananmu",
          blocks: [
            { type: "text", md: "Sekarang coba ceritakan makanan kesukaanmu dengan pola ini:\n\n- I like **(makanan)**.\n- I don't like **(makanan)**.\n- I drink **(minuman)** every morning." },
            { type: "try", question: arrange("sd3-b6-l3-try2", "Susun kalimat tentang minuman pagi.", "I drink milk every morning", "I drink + minuman + every morning = Aku minum … setiap pagi.") },
          ],
        },
      ],
      checkpoint: [
        pickMany("sd3-b6-l3-c1", "Pilih SEMUA makanan yang dimasak Nenek.", ["rice", "bread", "fish", "vegetables", "egg"], [0, 2, 3], "Baris 2: rice, fish, and vegetables.", { passageId: LUNCH.id }),
        pick("sd3-b6-l3-c2", "Apa yang tidak disukai si anak?", ["fish", "rice", "vegetables", "orange juice"], 2, "Baris 3: I do not like vegetables.", { passageId: LUNCH.id }),
        fill("sd3-b6-l3-c3", "Lengkapi.", "After lunch, we drink orange", ".", ["juice"], "Baris 6: orange juice.", { passageId: LUNCH.id }),
        pick("sd3-b6-l3-c4", "Menurut Nenek, sayur membuat kita…", ["sleepy", "strong", "sad", "small"], 1, "Baris 4: Vegetables make you strong!", { passageId: LUNCH.id }),
        pick("sd3-b6-l3-c5", "Kenapa akhirnya si anak tetap makan sayur?", ["Karena sayurnya manis", "Karena Nenek bilang sayur membuat kuat", "Karena ia sangat lapar", "Karena tidak ada ikan"], 1, "Baris 4–5: Nenek bilang sayur membuat kuat, jadi ia makan sayurnya.", { passageId: LUNCH.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd3-b6-post",
    title: "Posttest Bab 6",
    passPercent: 70,
    passages: [LUNCH],
    questions: [
      pick("sd3-b6-post1", "“Bread” artinya…", ["Nasi", "Roti", "Telur", "Kue"], 1, "Bread = roti."),
      listenPick("sd3-b6-post2", say(["man", "I like chicken."]), "Dengarkan. Apa yang ia sukai?", ["🍗", "🐟", "🥚", "🥦"], 0, "Chicken = ayam."),
      pick("sd3-b6-post3", "“Do you like tea?” — Kamu tidak suka. Jawabanmu…", ["Yes, I do.", "No, I don't.", "No, I do.", "Yes, I don't."], 1, "Tidak suka → No, I don't."),
      arrange("sd3-b6-post4", "Susun kalimatnya.", "I do not like milk", "I do not like + makanan/minuman.", { alternatives: [] }),
      pair("sd3-b6-post5", "Pasangkan.", [["🍚", "rice"], ["🥛", "milk"], ["🍵", "tea"], ["🧃", "juice"]], "Rice, milk, tea, juice!"),
      pick("sd3-b6-post6", "Minuman apa yang diminum setelah makan siang?", ["milk", "tea", "orange juice", "water"], 2, "Baris 6: orange juice.", { passageId: LUNCH.id }),
      pick("sd3-b6-post7", "Dodi tidak suka susu. Sarapan mana yang paling cocok untuk Dodi?", ["Bread and milk", "Rice, egg, and water", "Milk only", "Cereal with milk"], 1, "Pilih sarapan tanpa susu: rice, egg, and water.", { hots: true }),
      pick("sd3-b6-post8", "Menurutmu, kalimat mana yang BENAR tentang si anak di cerita?", ["Ia tidak pernah makan sayur.", "Ia suka ikan dan mau mencoba sayur.", "Ia tidak suka ikan.", "Ia makan siang di sekolah."], 1, "Ia suka ikan (baris 3) dan akhirnya tetap makan sayur (baris 5).", { passageId: LUNCH.id, hots: true }),
    ],
  },
};
