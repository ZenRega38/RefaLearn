import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, say, speaking, text, tip, trPick, tryIt, vocab, voice, trFill } from "../kit";

const BAG: Passage = {
  id: "sd3-b3-bag",
  title: "What Is in My Bag?",
  pic: "bag",
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
  title: "Chapter 3 — My School Things and Colors",
  description: "Name things in the classroom and their colors, and ask “What is this?” and “What color is it?”.",
  targetScore: "Listening · Speaking · Reading · Writing",
  cover: ["bag", "pencil", "color-red"],
  pretest: {
    id: "sd3-b3-pre",
    title: "Chapter 3 Pretest",
    passPercent: 0,
    questions: [
      trPick("sd3-b3-pre1", "“Pencil” means…", ["Pensil", "Penghapus", "Penggaris", "Tas"], 0, "Pencil = pensil."),
      trPick("sd3-b3-pre2", "“Merah” in English is…", ["blue", "red", "green", "yellow"], 1, "Red = merah."),
      listen("sd3-b3-pre3", voice("Ruler."), "Listen. Choose the picture.", ["pic:ruler", "pic:pencil", "pic:book", "pic:bag"], 0, "Ruler = penggaris."),
      trPick("sd3-b3-pre4", "“What is this?” means…", ["Apa ini?", "Siapa ini?", "Berapa ini?", "Di mana ini?"], 0, "What is this? = Apa ini?"),
      pick("sd3-b3-pre5", "A leaf is usually…", ["green", "purple", "black", "pink"], 0, "Daun berwarna hijau = green.", { image: "leaf" }),
    ],
  },
  lessons: [
    {
      id: "sd3-b3-l1",
      skill: "vocabulary",
      title: "School Things",
      summary: "Book, pencil, eraser, ruler, bag, crayon and chair.",
      minutes: 10,
      sections: [
        {
          title: "What is in your classroom?",
          blocks: [
            text("Coba lihat sekelilingmu di kelas. Pasti banyak benda yang kamu pakai setiap hari! Ini nama-namanya dalam bahasa Inggris."),
            vocab([
              ["book", "buku", "book", "Open your book."],
              ["pencil", "pensil", "pencil", "I write with a pencil."],
              ["eraser", "penghapus", "eraser", "My eraser is pink and blue."],
              ["ruler", "penggaris", "ruler", "Draw a line with a ruler."],
              ["bag", "tas", "bag", "My bag is blue."],
              ["crayon", "krayon", "crayon", "I color with crayons."],
              ["chair", "kursi", "chair", "Sit on your chair."],
            ]),
          ],
        },
        {
          title: "What is this?",
          blocks: [
            text("Untuk bertanya nama benda, kita pakai **What is this?** (Apa ini?). Jawabannya: **It is a …** (Ini adalah …). Sebelum kata yang diawali bunyi vokal pakai **an**: *It is **an** eraser.*"),
            audio("In the classroom", say(["man", "What is this?"], ["woman", "It is a ruler."], ["man", "And what is this?"], ["woman", "It is a crayon."], ["man", "And this?"], ["woman", "It is an eraser."])),
            tryIt(arrange("sd3-b3-l1-try", "Put the words in order to answer “What is this?”", "It is a pencil", "It is a + nama benda.", { image: "pencil" })),
          ],
        },
      ],
      checkpoint: [
        trPick("sd3-b3-l1-c1", "“Eraser” means…", ["Penghapus", "Pensil", "Buku", "Meja"], 0, "Eraser = penghapus."),
        listen("sd3-b3-l1-c2", voice("It is a bag."), "Listen. What is it?", ["pic:bag", "pic:book", "pic:chair", "pic:ruler"], 0, "Bag = tas."),
        match("sd3-b3-l1-c3", "Match the pictures with the words.", [["pic:book", "book"], ["pic:chair", "chair"], ["pic:crayon", "crayon"], ["pic:ruler", "ruler"]], "Book, chair, crayon, ruler!"),
        fill("sd3-b3-l1-c4", "Write the name of the thing.", "It is a", ".", ["pencil"], "Gambar itu pensil = pencil.", { image: "pencil" }),
        pick("sd3-b3-l1-c5", "Which one is NOT for writing or drawing?", ["pencil", "crayon", "chair", "eraser"], 2, "Pencil, crayon, dan eraser dipakai saat menulis/menggambar. Chair (kursi) dipakai untuk duduk.", { hots: true }),
      ],
    },
    {
      id: "sd3-b3-l2",
      skill: "speaking",
      title: "Colors",
      summary: "Red, blue, yellow, green, orange, purple, black, white, and “What color is it?”.",
      minutes: 12,
      sections: [
        {
          title: "Meet the colors",
          blocks: [
            vocab([
              ["red", "merah", "color-red"],
              ["blue", "biru", "color-blue"],
              ["yellow", "kuning", "color-yellow"],
              ["green", "hijau", "color-green"],
              ["orange", "oranye", "color-orange"],
              ["purple", "ungu", "color-purple"],
              ["black", "hitam", "color-black"],
              ["white", "putih", "color-white"],
            ]),
            text("Bertanya warna: **What color is it?** (Warnanya apa?) — Jawab: **It is red.** (Warnanya merah.)"),
          ],
        },
        {
          title: "Color + thing",
          blocks: [
            text("Dalam bahasa Inggris, **warna ditulis sebelum bendanya**. Kebalikan dari bahasa Indonesia!"),
            pics([["bag", "a blue bag"], ["pencil-red", "a red pencil"], ["eraser-green", "a green eraser"]]),
            examples([{ wrong: "a bag blue", right: "a **blue bag**", note: "tas biru" }, { wrong: "a pencil red", right: "a **red pencil**", note: "pensil merah" }]),
            tryIt(arrange("sd3-b3-l2-try", "Put the words in order: “I have a yellow book.”", "I have a yellow book", "Warna (yellow) di depan benda (book).")),
            speaking({
              id: "sd3-b3-l2-say",
              title: "My school things",
              prompt: "Show three things from your bag. Say the color and the thing: **This is a red pencil.**",
              image: "bag-things",
              seconds: 40,
              models: [{ label: "Example", text: "This is a blue bag. This is a yellow ruler. This is a green eraser." }],
              rubric: ["I showed three things.", "I put the color BEFORE the thing.", "I used **a** or **an** correctly."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd3-b3-l2-c1", voice("Purple.", "man"), "Listen. Which color?", ["pic:color-purple", "pic:color-blue", "pic:color-green", "pic:color-red"], 0, "Purple = ungu."),
        pick("sd3-b3-l2-c2", "On a sunny day, the sky is…", ["blue", "black", "orange", "purple"], 0, "Langit cerah → blue.", { image: "afternoon" }),
        pick("sd3-b3-l2-c3", "Which is right for “penggaris hijau”?", ["a ruler green", "a green ruler", "green a ruler", "a rulers green"], 1, "Warna sebelum benda: a green ruler.", { translate: true }),
        fill("sd3-b3-l2-c4", "Complete the color.", "The banana is", ".", ["yellow"], "Pisang matang berwarna kuning = yellow.", { image: "banana" }),
        pick("sd3-b3-l2-c5", "Red paint + yellow paint = …", ["green", "orange", "purple", "black"], 1, "Merah + kuning = oranye (orange). Coba deh di rumah pakai cat air!", { hots: true }),
      ],
    },
    {
      id: "sd3-b3-l3",
      skill: "reading",
      title: "Reading: What Is in My Bag?",
      summary: "Read about a bag and name the things and their colors.",
      minutes: 10,
      passages: [BAG],
      sections: [
        {
          title: "Whose bag is it?",
          blocks: [
            pics(["bag-things"],"A blue bag and the things in it"),
            { type: "passage", passage: BAG },
            tip("**There is…** artinya *ada…*. Contoh: *There is a book.* = Ada sebuah buku."),
            tryIt(pick("sd3-b3-l3-try", "What color is the bag?", ["red", "blue", "green", "yellow"], 1, "Baris 1: It is blue.", { passageId: BAG.id })),
          ],
        },
        {
          title: "Write about your bag",
          blocks: [
            {
              type: "task",
              kind: "writing",
              id: "sd3-b3-l3-write",
              title: "What is in my bag?",
              prompt: "Look in your bag. Write four sentences about the things and their colors.",
              minWords: 15,
              maxWords: 60,
              tips: ["This is my bag. It is …", "There is a … (color) … (thing).", "I am ready for school!"],
              models: [{ label: "Example", text: "This is my bag. It is red. In my bag, there is a blue book. There is a yellow pencil and a white eraser. I am ready for school!" }],
              rubric: ["I used **There is a …**.", "I put colors before things.", "I wrote at least four sentences.", "Every sentence starts with a capital letter."],
            },
          ],
        },
      ],
      checkpoint: [
        pick("sd3-b3-l3-c1", "What color is the pencil?", ["red", "blue", "yellow", "green"], 0, "Baris 3: a red pencil.", { passageId: BAG.id }),
        pick("sd3-b3-l3-c2", "Which thing is yellow?", ["book", "ruler", "eraser", "bag"], 1, "Baris 3: a yellow ruler.", { passageId: BAG.id }),
        pickMany("sd3-b3-l3-c3", "Choose ALL the things in the bag.", ["book", "pencil", "crayon", "eraser", "chair"], [0, 1, 3], "Di tas ada book, pencil, ruler, dan eraser. Crayon dan chair tidak disebut.", { passageId: BAG.id }),
        fill("sd3-b3-l3-c4", "Complete.", "There is a green", "too.", ["eraser"], "Baris 4: There is a green eraser too.", { passageId: BAG.id }),
        pick("sd3-b3-l3-c5", "The owner wants to draw a straight line in the book. What does she take?", ["only the red pencil", "the yellow ruler", "the green eraser", "the blue bag"], 1, "Untuk membuat garis lurus kita pakai penggaris = the yellow ruler.", { passageId: BAG.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd3-b3-post",
    title: "Chapter 3 Posttest",
    passPercent: 70,
    passages: [BAG],
    questions: [
      trPick("sd3-b3-post1", "“Chair” means…", ["Meja", "Kursi", "Tas", "Buku"], 1, "Chair = kursi."),
      listen("sd3-b3-post2", say(["woman", "What is this?"], ["man", "It is an eraser."]), "Listen. What is it?", ["pic:eraser", "pic:ruler", "pic:pencil", "pic:book"], 0, "Eraser = penghapus."),
      listen("sd3-b3-post3", voice("It is green.", "man"), "Listen. Which color?", ["pic:color-green", "pic:color-red", "pic:color-yellow", "pic:color-black"], 0, "Green = hijau."),
      pick("sd3-b3-post4", "“tas hitam” in English is…", ["a bag black", "a black bag", "black bag a", "a bags black"], 1, "Warna sebelum benda: a black bag.", { translate: true }),
      arrange("sd3-b3-post5", "Put the words in order to make a question.", "What color is it", "What color is it? = Warnanya apa?"),
      pick("sd3-b3-post6", "How many things are in the bag (not counting the bag)?", ["three", "four", "five", "two"], 1, "Book, pencil, ruler, eraser = 4 benda.", { passageId: BAG.id, hots: true }),
      match("sd3-b3-post7", "Match each thing with its usual color.", [["pic:banana|banana", "yellow"], ["pic:leaf|leaf", "green"], ["pic:tomato|tomato", "red"], ["pic:cloud|cloud", "white"]], "Banana kuning, leaf hijau, tomato merah, cloud putih."),
      pick("sd3-b3-post8", "Which one is different?", ["red", "blue", "ruler", "green"], 2, "Red, blue, green adalah warna. Ruler adalah benda.", { hots: true }),
      pick("sd3-b3-post9", "Choose the right one.", ["It is an eraser.", "It is a eraser.", "It is eraser an."], 0, "Eraser diawali bunyi vokal → an eraser."),
      trFill("sd3-b3-post10", "Write in English: “pensil biru”", "a", "pencil", ["blue"], "Biru = blue. Warna di depan: a blue pencil."),
    ],
  },
  live: {
    title: "Live Quiz — School Things and Colors",
    questions: [
      live("sd3-b3-live1", "What is it?", ["a ruler", "a pencil", "a book", "a bag"], 0, "ruler"),
      live("sd3-b3-live2", "What is it?", ["a crayon", "a chair", "an eraser", "a door"], 0, "crayon"),
      live("sd3-b3-live3", "Which is right?", ["a red pencil", "a pencil red", "red a pencil", "pencil a red"], 0, "pencil-red"),
      live("sd3-b3-live4", "It is ___ eraser.", ["an", "a", "the a", "two"], 0, "eraser"),
      live("sd3-b3-live5", "What color is a leaf?", ["green", "purple", "white", "black"], 0, "leaf"),
      live("sd3-b3-live6", "Red + yellow = …", ["orange", "green", "blue", "purple"], 0, "color-orange"),
      live("sd3-b3-live7", "We draw straight lines with a…", ["ruler", "bag", "chair", "crayon"], 0, "ruler"),
      live("sd3-b3-live8", "“Apa ini?” is…", ["What is this?", "Who is this?", "Where is it?", "How old?"], 0, "question", true),
    ],
  },
};
