import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, fill, listenPick, pair, pick, pickMany, say } from "./helpers";

const MARKET: Passage = {
  id: "sd3-b4-market",
  title: "At the Fruit Stall",
  pic: "stall",
  lines: [
    "Bu Tini sells fruit at the market.",
    "She has twelve mangoes.",
    "She has fifteen bananas.",
    "She has eleven oranges.",
    "Dodi buys two mangoes for his mother.",
  ],
};

export const BAB4: Level = {
  id: "sd3-bab4",
  title: "Bab 4 — Let's Count!",
  description: "Angka 11–20, bertanya “How many…?”, dan bentuk jamak dengan akhiran -s.",
  targetScore: "Menyimak–Berbicara · Membaca",
  cover: ["num-12", "mango", "banana"],
  pretest: {
    id: "sd3-b4-pre",
    title: "Pretest Bab 4",
    passPercent: 0,
    questions: [
      pick("sd3-b4-pre1", "Angka 12 dalam bahasa Inggris…", ["twelve", "twenty", "two", "eleven"], 0, "12 = twelve."),
      listenPick("sd3-b4-pre2", say(["woman", "Fifteen."]), "Dengarkan. Angka berapa?", ["50", "15", "13", "5"], 1, "Fifteen = 15."),
      pick("sd3-b4-pre3", "“How many” dipakai untuk menanyakan…", ["Warna", "Jumlah", "Nama", "Umur"], 1, "How many = berapa banyak (jumlah)."),
      pick("sd3-b4-pre4", "Bentuk jamak dari “book” adalah…", ["book", "books", "bookes", "a books"], 1, "Satu book, banyak books."),
      pick("sd3-b4-pre5", "20 dalam bahasa Inggris…", ["twelve", "twenty", "two", "thirty"], 1, "20 = twenty."),
    ],
  },
  lessons: [
    {
      id: "sd3-b4-l1",
      skill: "vocabulary",
      title: "Numbers 11–20",
      summary: "Eleven sampai twenty, dan cara membedakan -teen.",
      minutes: 12,
      sections: [
        {
          title: "Angka belasan",
          blocks: [
            { type: "text", md: "Kamu sudah jago 1–10. Sekarang naik level ke 11–20! Ketuk kartunya satu per satu, lalu ucapkan bersama, ya." },
            {
              type: "vocab",
              items: [
                { emoji: "1️⃣1️⃣", pic: "num-11", word: "eleven", meaning: "sebelas" },
                { emoji: "1️⃣2️⃣", pic: "num-12", word: "twelve", meaning: "dua belas" },
                { emoji: "1️⃣3️⃣", pic: "num-13", word: "thirteen", meaning: "tiga belas" },
                { emoji: "1️⃣4️⃣", pic: "num-14", word: "fourteen", meaning: "empat belas" },
                { emoji: "1️⃣5️⃣", pic: "num-15", word: "fifteen", meaning: "lima belas" },
                { emoji: "1️⃣6️⃣", pic: "num-16", word: "sixteen", meaning: "enam belas" },
                { emoji: "1️⃣7️⃣", pic: "num-17", word: "seventeen", meaning: "tujuh belas" },
                { emoji: "1️⃣8️⃣", pic: "num-18", word: "eighteen", meaning: "delapan belas" },
                { emoji: "1️⃣9️⃣", pic: "num-19", word: "nineteen", meaning: "sembilan belas" },
                { emoji: "2️⃣0️⃣", pic: "num-20", word: "twenty", meaning: "dua puluh" },
              ],
            },
            { type: "tip", md: "Lihat polanya: 13–19 berakhiran **-teen** (thir**teen**, four**teen**…). Seperti kata *belas* di bahasa Indonesia! Hanya 11 (**eleven**) dan 12 (**twelve**) yang punya nama sendiri." },
          ],
        },
        {
          title: "Teen atau ty?",
          blocks: [
            { type: "warning", md: "Hati-hati: **fifteen** (15) dan **fifty** (50) bunyinya mirip. Di **-teen**, suaranya lebih panjang dan ditekan di belakang: fif-**TEEN**." },
            { type: "audio", caption: "Dengarkan bedanya", showTranscript: true, script: say(["woman", "Fifteen."], ["woman", "Fifty."], ["woman", "Sixteen."], ["woman", "Sixty."]) },
            { type: "try", question: listenPick("sd3-b4-l1-try", say(["man", "Thirteen."]), "Dengarkan. Angka berapa?", ["30", "13", "3", "33"], 1, "Thirteen = 13 (ada -teen).") },
          ],
        },
      ],
      checkpoint: [
        pair("sd3-b4-l1-c1", "Pasangkan.", [["pic:num-11", "eleven"], ["pic:num-14", "fourteen"], ["pic:num-18", "eighteen"], ["pic:num-20", "twenty"]], "Eleven, fourteen, eighteen, twenty!"),
        listenPick("sd3-b4-l1-c2", say(["woman", "Nineteen."]), "Dengarkan. Angka berapa?", ["9", "90", "19", "17"], 2, "Nineteen = 19."),
        fill("sd3-b4-l1-c3", "Tulis angka 16 dalam bahasa Inggris.", "16 =", "", ["sixteen"], "16 = sixteen."),
        pick("sd3-b4-l1-c4", "Angka setelah twelve adalah…", ["eleven", "thirteen", "twenty", "fourteen"], 1, "12 → 13 = thirteen."),
        pick("sd3-b4-l1-c5", "Ten + ten = …", ["eleven", "twelve", "twenty", "ten"], 2, "10 + 10 = 20 = twenty.", { hots: true, image: "num-10*2" }),
      ],
    },
    {
      id: "sd3-b4-l2",
      skill: "speaking",
      title: "How Many…? — Berapa Banyak?",
      summary: "Bertanya jumlah dan memakai bentuk jamak (-s).",
      minutes: 12,
      sections: [
        {
          title: "Satu atau banyak?",
          blocks: [
            { type: "text", md: "Kalau bendanya **lebih dari satu**, kita tambahkan **-s** di belakangnya." },
            { type: "pictures", items: [{ pic: "cat", label: "one cat" }, { pic: "cat*3", label: "three cats" }] },
            { type: "examples", items: [{ right: "one **cat** 🐱 → three **cats** 🐱🐱🐱" }, { right: "one **apple** 🍎 → five **apples** 🍎🍎🍎🍎🍎" }, { right: "one **book** 📕 → twelve **books**" }] },
            { type: "text", md: "Untuk bertanya jumlah: **How many …?** Contoh: *How many pencils?* — *Twelve pencils.*" },
          ],
        },
        {
          title: "Dengarkan di kantin",
          blocks: [
            { type: "pictures", items: [{ pic: "cake*5" }], caption: "Banyak kue di kantin!" },
            { type: "audio", caption: "Di kantin sekolah", showTranscript: true, script: say(["man", "How many cakes do you have?"], ["woman", "I have eleven cakes."], ["man", "Wow! Can I have one, please?"], ["woman", "Sure!"]) },
            { type: "try", question: arrange("sd3-b4-l2-try", "Susun pertanyaannya.", "How many books", "How many + benda jamak (books).") },
          ],
        },
      ],
      checkpoint: [
        pick("sd3-b4-l2-c1", "Lihat gambarnya. four …", ["apple", "apples", "an apple", "applees"], 1, "Ada empat apel, lebih dari satu → apples.", { image: "apple*4" }),
        listenPick("sd3-b4-l2-c2", say(["woman", "How many cats?"], ["man", "Seventeen cats."]), "Dengarkan. Ada berapa kucing?", ["7", "17", "70", "11"], 1, "Seventeen = 17."),
        fill("sd3-b4-l2-c3", "Lengkapi pertanyaannya.", "How", "pencils do you have?", ["many"], "How many = berapa banyak."),
        pickMany("sd3-b4-l2-c4", "Pilih SEMUA yang benar.", ["two bags", "one cats", "ten balls", "a books"], [0, 2], "Two bags dan ten balls benar. One cat (tanpa -s), a book (tanpa -s)."),
        pick("sd3-b4-l2-c5", "Ada 3 kucing. Setiap kucing punya 4 kaki. How many legs?", ["seven", "twelve", "four", "three"], 1, "3 × 4 = 12 = twelve legs. Kamu pintar berhitung!", { hots: true, image: "cat*3" }),
      ],
    },
    {
      id: "sd3-b4-l3",
      skill: "reading",
      title: "Reading — At the Fruit Stall",
      summary: "Membaca cerita di pasar buah dan menghitung.",
      minutes: 10,
      passages: [MARKET],
      sections: [
        {
          title: "Di kios buah Bu Tini",
          blocks: [
            { type: "passage", passage: MARKET },
            { type: "vocab", items: [{ emoji: "🥭", pic: "mango", word: "mango", meaning: "mangga" }, { emoji: "🍌", pic: "banana", word: "banana", meaning: "pisang" }, { emoji: "🍊", pic: "orange-fruit", word: "orange", meaning: "jeruk" }, { emoji: "🛒", pic: "basket", word: "buy", meaning: "membeli" }] },
            { type: "try", question: pick("sd3-b4-l3-try", "Bu Tini punya berapa pisang?", ["eleven", "twelve", "fifteen", "two"], 2, "Baris 3: She has fifteen bananas.", { passageId: MARKET.id }) },
          ],
        },
      ],
      checkpoint: [
        pick("sd3-b4-l3-c1", "Ada berapa mangga di kios?", ["11", "12", "15", "20"], 1, "Baris 2: twelve mangoes.", { passageId: MARKET.id }),
        pick("sd3-b4-l3-c2", "Buah apa yang paling sedikit?", ["mangoes", "bananas", "oranges", "apples"], 2, "Oranges 11, lebih sedikit dari mangoes (12) dan bananas (15).", { passageId: MARKET.id }),
        fill("sd3-b4-l3-c3", "Lengkapi.", "She has eleven", ".", ["oranges"], "Baris 4: eleven oranges.", { passageId: MARKET.id }),
        pick("sd3-b4-l3-c4", "Siapa yang membeli mangga?", ["Bu Tini", "Dodi", "Ibu Dodi", "Raka"], 1, "Baris 5: Dodi buys two mangoes.", { passageId: MARKET.id }),
        pick("sd3-b4-l3-c5", "Setelah Dodi membeli, berapa mangga yang tersisa?", ["ten", "twelve", "fourteen", "two"], 0, "12 − 2 = 10 = ten mangoes.", { passageId: MARKET.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd3-b4-post",
    title: "Posttest Bab 4",
    passPercent: 70,
    passages: [MARKET],
    questions: [
      listenPick("sd3-b4-post1", say(["man", "Eighteen."]), "Dengarkan. Angka berapa?", ["8", "18", "80", "16"], 1, "Eighteen = 18."),
      pick("sd3-b4-post2", "14 dalam bahasa Inggris…", ["forty", "fourteen", "four", "fourty"], 1, "14 = fourteen."),
      pick("sd3-b4-post3", "Lihat gambarnya. three …", ["book", "books", "a book", "bookes"], 1, "Ada tiga buku, banyak → books.", { image: "book*3" }),
      arrange("sd3-b4-post4", "Susun kalimatnya.", "I have twenty crayons", "I have + jumlah + benda jamak."),
      pair("sd3-b4-post5", "Pasangkan.", [["twelve", "pic:num-12"], ["fifteen", "pic:num-15"], ["seventeen", "pic:num-17"], ["twenty", "pic:num-20"]], "Mantap!"),
      fill("sd3-b4-post6", "Tulis jawabannya dalam bahasa Inggris.", "Five + six =", "", ["eleven"], "5 + 6 = 11 = eleven."),
      pick("sd3-b4-post7", "Berapa jumlah semua buah di kios Bu Tini sebelum Dodi membeli?", ["28", "38", "30", "20"], 1, "12 + 15 + 11 = 38. Soal ini menantang, hebat kalau kamu bisa!", { passageId: MARKET.id, hots: true }),
      pick("sd3-b4-post8", "Kamu mendengar “fifty” padahal temanmu bilang ada 15 kelereng. Apa yang sebenarnya ia ucapkan?", ["fifty", "fifteen", "five", "fifty-five"], 1, "15 = fifteen (ada -teen di belakang).", { hots: true }),
    ],
  },
};
