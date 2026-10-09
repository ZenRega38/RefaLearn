import "server-only";
import type { LevelQuiz, Passage } from "@/lib/course/types";
import { KEY, completion, partA, rq, wrong } from "./helpers";

const { A, B, C, D } = KEY;

const BATIK: Passage = {
  id: "l1q-p-batik",
  title: "Batik",
  lines: [
    "Batik is a technique of decorating cloth that has been practiced in Java",
    "for centuries. Artisans draw patterns on fabric with hot wax, which",
    "prevents dye from reaching the covered areas. After the cloth is dyed,",
    "the wax is removed, revealing the design. The process may be repeated",
    "several times to add more colors. In 2009, UNESCO recognized Indonesian",
    "batik as an important part of the world's cultural heritage. Today,",
    "batik is worn on formal occasions as well as in everyday life, and many",
    "offices encourage employees to wear it on certain days of the week.",
  ],
};

export const L1_QUIZ: LevelQuiz = {
  id: "l1-quiz",
  title: "Big Quiz Level 1 — Foundations",
  passPercent: 70,
  passages: [BATIK],
  questions: [
    partA(
      "l1q-1",
      [
        ["woman", "Have you seen my blue folder anywhere?"],
        ["man", "I think you left it on the bus."],
      ],
      "What does the man mean?",
      ["The woman forgot the folder on the bus.", "He took the bus to find the folder.", "The folder is in his bag.", "He prefers the color blue."],
      A,
      "“You left it on the bus” = dia lupa folder di bus."
    ),
    partA(
      "l1q-2",
      [
        ["man", "Was the math quiz difficult?"],
        ["woman", "It was a piece of cake."],
      ],
      "What does the woman mean?",
      ["She ate cake before the quiz.", "The quiz was very easy.", "She missed the quiz.", "The quiz was about fractions."],
      B,
      "“A piece of cake” = sangat mudah."
    ),
    partA(
      "l1q-3",
      [
        ["woman", "Is it going to be sunny for the picnic?"],
        ["man", "The weather report says we'll have heavy rain."],
      ],
      "What does the man imply?",
      ["They should catch the train.", "The picnic might have to be moved indoors.", "The report was wrong.", "It will be sunny all day."],
      B,
      "Hujan lebat → piknik kemungkinan dipindah ke dalam ruangan. ‘Train’ adalah jebakan bunyi."
    ),
    partA(
      "l1q-4",
      [
        ["man", "Do you often study at the library?"],
        ["woman", "Hardly ever. It's too noisy for me."],
      ],
      "What does the woman mean?",
      ["She rarely studies at the library.", "She studies at the library every day.", "The library is very quiet.", "She works at the library."],
      A,
      "“Hardly ever” = jarang sekali."
    ),
    partA(
      "l1q-5",
      [
        ["woman", "Did you get a ticket for the final match?"],
        ["man", "They were all sold out before I got there."],
      ],
      "What does the man mean?",
      ["He bought the last ticket.", "There were no tickets left.", "He sold his ticket.", "He arrived early."],
      B,
      "“Sold out” = tidak ada tiket tersisa."
    ),
    partA(
      "l1q-6",
      [
        ["man", "The professor's explanation wasn't very clear."],
        ["woman", "I wasn't the only one who was confused, then."],
      ],
      "What does the woman mean?",
      ["She understood the explanation well.", "She was also confused.", "She is the only one in the class.", "The professor is new."],
      B,
      "“I wasn't the only one who was confused” = dia juga bingung."
    ),
    completion(
      "l1q-7",
      "____ the capital of North Kalimantan.",
      ["Tanjung Selor", "Tanjung Selor is", "Being Tanjung Selor", "That Tanjung Selor"],
      B,
      "Kalimat butuh subjek + kata kerja: Tanjung Selor is."
    ),
    completion(
      "l1q-8",
      "During the dry season, ____ often fall to very low levels.",
      ["rivers", "of rivers", "rivers which", "because rivers"],
      A,
      "Setelah frasa preposisi ‘During the dry season’, kalimat butuh subjek untuk ‘fall’."
    ),
    completion(
      "l1q-9",
      "____, Komodo National Park attracts visitors from around the world.",
      ["It is a UNESCO site", "A UNESCO World Heritage Site", "Is a UNESCO site", "Which a UNESCO site"],
      B,
      "Klausa utama sudah lengkap; yang dibutuhkan appositive berupa frasa benda."
    ),
    wrong(
      "l1q-10",
      "The [A:color] of the [B:flowers] [C:change] [D:with the seasons].",
      "C",
      "changes",
      "Subjek = the color (tunggal) → changes."
    ),
    wrong(
      "l1q-11",
      "[A:Several] [B:village] in the area [C:have] new [D:schools].",
      "B",
      "villages",
      "‘Several’ diikuti kata benda jamak → villages."
    ),
    wrong(
      "l1q-12",
      "[A:Each] of the [B:players] [C:were given] [D:a medal].",
      "C",
      "was given",
      "‘Each of the …’ = tunggal → was given."
    ),
    rq("l1q-13", BATIK.id, "What is the main topic of the passage?", [
      "The history of Java",
      "How batik is made and its place in Indonesian life",
      "The work of UNESCO",
      "Office dress codes in Indonesia",
    ], B, "Bacaan menjelaskan proses batik dan perannya dalam kehidupan sehari-hari."),
    rq("l1q-14", BATIK.id, "According to the passage, what is the purpose of the hot wax?", [
      "To make the cloth stronger",
      "To keep dye away from parts of the fabric",
      "To remove old colors",
      "To dry the cloth quickly",
    ], B, "Baris 2–3: wax “prevents dye from reaching the covered areas.”"),
    rq("l1q-15", BATIK.id, "The word “revealing” in line 4 is closest in meaning to", [
      "hiding", "showing", "changing", "cleaning",
    ], B, "Setelah lilin dihapus, desainnya terlihat → revealing = showing."),
    rq("l1q-16", BATIK.id, "The word “it” in line 8 refers to", [
      "batik", "an office", "a week", "formal occasions",
    ], A, "Kantor mendorong pegawai memakai batik pada hari tertentu."),
    rq("l1q-17", BATIK.id, "According to the passage, what happened in 2009?", [
      "Batik was first made in Java.",
      "Offices began requiring batik every day.",
      "UNESCO recognized Indonesian batik.",
      "A new dyeing process was invented.",
    ], C, "Baris 5–6: UNESCO mengakui batik Indonesia pada 2009."),
    rq("l1q-18", BATIK.id, "Which of the following is NOT mentioned about batik?", [
      "It is worn on formal occasions.",
      "The dyeing process can be repeated.",
      "It is decorated with wax.",
      "It is exported mainly to Europe.",
    ], D, "Ekspor ke Eropa tidak disebutkan."),
  ],
};
