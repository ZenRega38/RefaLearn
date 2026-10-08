import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, fill, listenPick, pair, pick, pickMany, say } from "./helpers";

const BAG: Passage = {
  id: "sd3-b3-bag",
  title: "What Is in My Bag?",
  lines: [
    "This is my bag. It is blue.",
    "In my bag, there is a book.",
    "There is a red pencil and a yellow ruler.",
    "There is a green eraser too.",
    "I am ready for school!",
  ],
};

export const BAB3: Level = {
  id: "sd3-bab3",
  title: "Bab 3 — My School Things & Colors",
  description: "Menyebut benda-benda di kelas dan warnanya, serta bertanya “What is this?” dan “What color is it?”.",
  targetScore: "Menyimak–Berbicara · Membaca–Menulis",
  pretest: {
    id: "sd3-b3-pre",
    title: "Pretest Bab 3",
    passPercent: 0,
    questions: [
      pick("sd3-b3-pre1", "“Pencil” artinya…", ["Pensil", "Penghapus", "Penggaris", "Tas"], 0, "Pencil = pensil."),
      pick("sd3-b3-pre2", "Warna merah dalam bahasa Inggris…", ["blue", "red", "green", "yellow"], 1, "Red = merah."),
      listenPick("sd3-b3-pre3", say(["woman", "Ruler."]), "Dengarkan. Pilih gambarnya.", ["📏", "✏️", "📕", "🎒"], 0, "Ruler = penggaris."),
      pick("sd3-b3-pre4", "“What is this?” artinya…", ["Apa ini?", "Siapa ini?", "Berapa ini?", "Di mana ini?"], 0, "What is this? = Apa ini?"),
      pick("sd3-b3-pre5", "Daun biasanya berwarna…", ["green", "purple", "black", "pink"], 0, "Daun berwarna hijau = green."),
    ],
  },
  lessons: [
    {
      id: "sd3-b3-l1",
      skill: "vocabulary",
      title: "School Things — Benda di Sekolah",
      summary: "Book, pencil, eraser, ruler, bag, crayon, dan chair.",
      minutes: 10,
      sections: [
        {
          title: "Ada apa di kelasmu?",
          blocks: [
            { type: "text", md: "Coba lihat sekelilingmu di kelas. Pasti banyak benda yang kamu pakai setiap hari! Ini nama-namanya dalam bahasa Inggris." },
            {
              type: "vocab",
              items: [
                { emoji: "📕", word: "book", meaning: "buku" },
                { emoji: "✏️", word: "pencil", meaning: "pensil" },
                { emoji: "🧽", word: "eraser", meaning: "penghapus" },
                { emoji: "📏", word: "ruler", meaning: "penggaris" },
                { emoji: "🎒", word: "bag", meaning: "tas" },
                { emoji: "🖍️", word: "crayon", meaning: "krayon" },
                { emoji: "🪑", word: "chair", meaning: "kursi" },
              ],
            },
          ],
        },
        {
          title: "What is this?",
          blocks: [
            { type: "text", md: "Untuk bertanya nama benda, kita pakai **What is this?** (Apa ini?). Jawabannya: **It is a …** (Ini adalah …)." },
            {
              type: "audio",
              caption: "Di dalam kelas",
              showTranscript: true,
              script: say(["man", "What is this?"], ["woman", "It is a ruler."], ["man", "And what is this?"], ["woman", "It is a crayon."]),
            },
            { type: "try", question: arrange("sd3-b3-l1-try", "Susun jawaban untuk “What is this?” ✏️", "It is a pencil", "It is a + nama benda.") },
          ],
        },
      ],
      checkpoint: [
        pick("sd3-b3-l1-c1", "“Eraser” artinya…", ["Penghapus", "Pensil", "Buku", "Meja"], 0, "Eraser = penghapus."),
        listenPick("sd3-b3-l1-c2", say(["woman", "It is a bag."]), "Dengarkan. Benda apa itu?", ["🎒", "📕", "🪑", "📏"], 0, "Bag = tas."),
        pair("sd3-b3-l1-c3", "Pasangkan gambar dengan katanya.", [["📕", "book"], ["🪑", "chair"], ["🖍️", "crayon"], ["📏", "ruler"]], "Book, chair, crayon, ruler!"),
        fill("sd3-b3-l1-c4", "Tulis nama bendanya. ✏️", "It is a", ".", ["pencil"], "✏️ = pencil."),
        pick("sd3-b3-l1-c5", "Mana yang BUKAN benda untuk menulis atau menggambar?", ["pencil", "crayon", "chair", "eraser"], 2, "Pencil, crayon, dan eraser dipakai saat menulis/menggambar. Chair (kursi) dipakai untuk duduk.", { hots: true }),
      ],
    },
    {
      id: "sd3-b3-l2",
      skill: "speaking",
      title: "Colors — Warna-warni",
      summary: "Red, blue, yellow, green, orange, purple, black, white, dan “What color is it?”.",
      minutes: 12,
      sections: [
        {
          title: "Kenalan dengan warna",
          blocks: [
            {
              type: "vocab",
              items: [
                { emoji: "🔴", word: "red", meaning: "merah" },
                { emoji: "🔵", word: "blue", meaning: "biru" },
                { emoji: "🟡", word: "yellow", meaning: "kuning" },
                { emoji: "🟢", word: "green", meaning: "hijau" },
                { emoji: "🟠", word: "orange", meaning: "oranye" },
                { emoji: "🟣", word: "purple", meaning: "ungu" },
                { emoji: "⚫", word: "black", meaning: "hitam" },
                { emoji: "⚪", word: "white", meaning: "putih" },
              ],
            },
            { type: "text", md: "Bertanya warna: **What color is it?** (Warnanya apa?) — Jawab: **It is red.** (Warnanya merah.)" },
          ],
        },
        {
          title: "Benda + warna",
          blocks: [
            { type: "text", md: "Dalam bahasa Inggris, **warna ditulis sebelum bendanya**. Kebalikan dari bahasa Indonesia!" },
            { type: "examples", items: [{ wrong: "a bag blue", right: "a **blue bag**", note: "tas biru" }, { wrong: "a pencil red", right: "a **red pencil**", note: "pensil merah" }] },
            { type: "try", question: arrange("sd3-b3-l2-try", "Susun: “Aku punya buku kuning.”", "I have a yellow book", "Warna (yellow) di depan benda (book).") },
          ],
        },
      ],
      checkpoint: [
        listenPick("sd3-b3-l2-c1", say(["man", "Purple."]), "Dengarkan. Warna apa?", ["🟣", "🔵", "🟢", "🔴"], 0, "Purple = ungu."),
        pick("sd3-b3-l2-c2", "Langit cerah siang hari berwarna…", ["blue", "black", "orange", "purple"], 0, "Langit cerah → blue."),
        pick("sd3-b3-l2-c3", "Mana yang benar untuk “penggaris hijau”?", ["a ruler green", "a green ruler", "green a ruler", "a rulers green"], 1, "Warna sebelum benda: a green ruler."),
        fill("sd3-b3-l2-c4", "Lengkapi warnanya. 🍌", "The banana is", ".", ["yellow"], "Pisang matang berwarna kuning = yellow."),
        pick("sd3-b3-l2-c5", "Kalau cat merah dicampur cat kuning, jadinya warna…", ["green", "orange", "purple", "black"], 1, "Merah + kuning = oranye (orange). Coba deh di rumah pakai cat air!", { hots: true }),
      ],
    },
    {
      id: "sd3-b3-l3",
      skill: "reading",
      title: "Reading — What Is in My Bag?",
      summary: "Membaca isi tas dan menyebut benda beserta warnanya.",
      minutes: 10,
      passages: [BAG],
      sections: [
        {
          title: "Isi tas siapa ini?",
          blocks: [
            { type: "passage", passage: BAG },
            { type: "tip", md: "**There is…** artinya *ada…*. Contoh: *There is a book.* = Ada sebuah buku." },
            { type: "try", question: pick("sd3-b3-l3-try", "Tasnya berwarna apa?", ["Merah", "Biru", "Hijau", "Kuning"], 1, "Baris 1: It is blue.", { passageId: BAG.id }) },
          ],
        },
      ],
      checkpoint: [
        pick("sd3-b3-l3-c1", "Pensilnya berwarna apa?", ["red", "blue", "yellow", "green"], 0, "Baris 3: a red pencil.", { passageId: BAG.id }),
        pick("sd3-b3-l3-c2", "Benda apa yang berwarna kuning?", ["book", "ruler", "eraser", "bag"], 1, "Baris 3: a yellow ruler.", { passageId: BAG.id }),
        pickMany("sd3-b3-l3-c3", "Pilih SEMUA benda yang ada di dalam tas.", ["book", "pencil", "crayon", "eraser", "chair"], [0, 1, 3], "Di tas ada book, pencil, ruler, dan eraser. Crayon dan chair tidak disebut.", { passageId: BAG.id }),
        fill("sd3-b3-l3-c4", "Lengkapi.", "There is a green", "too.", ["eraser"], "Baris 4: There is a green eraser too.", { passageId: BAG.id }),
        pick("sd3-b3-l3-c5", "Pemilik tas mau menggaris lurus di bukunya. Benda apa yang ia ambil?", ["the red pencil saja", "the yellow ruler", "the green eraser", "the blue bag"], 1, "Untuk membuat garis lurus kita pakai penggaris = the yellow ruler.", { passageId: BAG.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd3-b3-post",
    title: "Posttest Bab 3",
    passPercent: 70,
    passages: [BAG],
    questions: [
      pick("sd3-b3-post1", "“Chair” artinya…", ["Meja", "Kursi", "Tas", "Buku"], 1, "Chair = kursi."),
      listenPick("sd3-b3-post2", say(["woman", "What is this?"], ["man", "It is an eraser."]), "Dengarkan. Benda apa itu?", ["🧽 Penghapus", "📏 Penggaris", "✏️ Pensil", "📕 Buku"], 0, "Eraser = penghapus."),
      listenPick("sd3-b3-post3", say(["man", "It is green."]), "Dengarkan. Warna apa?", ["🟢", "🔴", "🟡", "⚫"], 0, "Green = hijau."),
      pick("sd3-b3-post4", "Bahasa Inggris untuk “tas hitam” adalah…", ["a bag black", "a black bag", "black bag a", "a bags black"], 1, "Warna sebelum benda: a black bag."),
      arrange("sd3-b3-post5", "Susun pertanyaannya.", "What color is it", "What color is it? = Warnanya apa?"),
      pick("sd3-b3-post6", "Berapa banyak benda di dalam tas (tidak termasuk tasnya)?", ["Tiga", "Empat", "Lima", "Dua"], 1, "Book, pencil, ruler, eraser = 4 benda.", { passageId: BAG.id, hots: true }),
      pair("sd3-b3-post7", "Pasangkan warna dengan bendanya yang biasa.", [["🍌 banana", "yellow"], ["🌿 leaf", "green"], ["🍅 tomato", "red"], ["☁️ cloud", "white"]], "Banana kuning, leaf hijau, tomato merah, cloud putih."),
      pick("sd3-b3-post8", "Mana yang tidak sekelompok?", ["red", "blue", "ruler", "green"], 2, "Red, blue, green adalah warna. Ruler adalah benda.", { hots: true }),
    ],
  },
};
