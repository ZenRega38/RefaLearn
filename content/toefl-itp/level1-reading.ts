import "server-only";
import type { Lesson, Passage } from "@/lib/course/types";
import { KEY, rq } from "./helpers";

const { A, B, C, D } = KEY;

const MANGROVE: Passage = {
  id: "l1-p-mangrove",
  title: "Mangrove Forests",
  lines: [
    "Mangrove forests grow along tropical coastlines where fresh water from",
    "rivers meets the salt water of the sea. Few plants can survive in such",
    "salty, muddy conditions, but mangroves have adapted remarkably well.",
    "Their tangled roots rise above the water and hold the soft mud in place,",
    "which protects coastal villages from erosion and storm waves. These roots",
    "also provide shelter for young fish, crabs, and shrimp, so mangroves",
    "support many of the fisheries on which local communities depend.",
    "Indonesia has more mangrove forest than any other country, and the",
    "coast of North Kalimantan contains some of its most important stands.",
  ],
};

const COFFEE: Passage = {
  id: "l1-p-coffee",
  title: "The Spread of Coffee",
  lines: [
    "Coffee was first used as a drink in Yemen in the fifteenth century.",
    "From there, it spread quickly to Egypt, Persia, and Turkey, where coffee",
    "houses became popular places for conversation and music. By the",
    "seventeenth century, travelers had carried the beverage to Europe. Not",
    "everyone welcomed it at first; some critics claimed it was harmful.",
    "Nevertheless, its popularity grew steadily, and coffee houses soon",
    "appeared in nearly every major European city.",
  ],
};

const LIBRARY: Passage = {
  id: "l1-p-library",
  title: "A Library on Wheels",
  lines: [
    "In many rural areas, people live far from the nearest library. To solve",
    "this problem, some regions operate mobile libraries: vehicles that carry",
    "books from village to village. A mobile library usually visits each",
    "stop once or twice a month. Readers return the books they borrowed on",
    "the previous visit and choose new ones. These services are especially",
    "valuable for children, who may otherwise have very few books at home.",
  ],
};

export const L1_READING: Lesson[] = [
  {
    id: "l1-rea-1",
    skill: "reading",
    title: "Format Reading & Main Idea",
    summary: "Format Reading Comprehension dan cara cepat menemukan gagasan utama.",
    minutes: 14,
    passages: [MANGROVE],
    sections: [
      {
        title: "Format Reading Comprehension",
        blocks: [
          {
            type: "text",
            md: "Bagian terakhir TOEFL ITP: **50 soal dalam 55 menit**, biasanya **5 bacaan** dengan **±10 soal** per bacaan. Topiknya akademik (sains, sejarah, seni, sosial) tetapi **tidak butuh pengetahuan khusus** — semua jawaban ada di teks.",
          },
          {
            type: "tip",
            md: "Waktu Anda ±1 menit per soal. Jangan membaca seluruh teks dengan sangat teliti di awal — **baca sekilas (skim)**, lalu cari detail saat menjawab soal.",
          },
        ],
      },
      {
        title: "Menemukan main idea",
        blocks: [
          {
            type: "text",
            md: "Soal main idea biasanya berbunyi: *What is the main topic of the passage?* atau *The passage mainly discusses…*. Gagasan utama hampir selalu ada di **kalimat pertama** (atau dua kalimat pertama) setiap paragraf.",
          },
          {
            type: "warning",
            md: "Jawaban **terlalu sempit** (hanya satu detail) atau **terlalu luas** (melebihi isi teks) adalah jebakan.",
          },
          { type: "passage", passage: MANGROVE },
          {
            type: "try",
            question: rq(
              "l1-rea-1-try",
              MANGROVE.id,
              "What is the main topic of the passage?",
              [
                "The fishing industry in North Kalimantan",
                "How mangrove forests survive and why they are valuable",
                "The causes of coastal erosion",
                "The different types of crabs in Indonesia",
              ],
              B,
              "Seluruh bacaan membahas adaptasi mangrove dan manfaatnya. A, C, D hanya detail kecil."
            ),
          },
        ],
      },
    ],
    checkpoint: [
      {
        id: "l1-rea-1-c1",
        type: "fill",
        prompt: "Complete the sentence.",
        before: "The Reading section of the TOEFL ITP has 50 questions in",
        after: "minutes.",
        accept: ["55", "fifty-five", "fifty five"],
        explanation: "Reading: 50 soal, 55 menit.",
      },
      {
        id: "l1-rea-1-c2",
        type: "ms",
        prompt: "Choose ALL the signs of a WRONG main-idea answer (a trap).",
        options: ["It covers only one small detail", "It is broader than the passage", "It sums up the whole passage", "It mentions a topic the passage does not discuss"],
        answers: [A, B, D],
        explanation: "Jawaban main idea yang benar merangkum seluruh bacaan; yang terlalu sempit, terlalu luas, atau di luar topik adalah jebakan.",
      },
      rq(
        "l1-rea-1-c3",
        MANGROVE.id,
        "The passage mainly discusses which of the following?",
        [
          "The importance of mangrove forests",
          "The history of North Kalimantan",
          "How rivers flow into the sea",
          "Why few plants grow in mud",
        ],
        A,
        "Bacaan berfokus pada mangrove: adaptasi dan manfaatnya."
      ),
    ],
  },
  {
    id: "l1-rea-2",
    skill: "reading",
    title: "Stated Detail Questions",
    summary: "Menjawab soal detail dengan memindai kata kunci dan mencari restatement.",
    minutes: 12,
    passages: [COFFEE],
    sections: [
      {
        title: "Strategi soal detail",
        blocks: [
          {
            type: "text",
            md: "Soal detail bertanya tentang informasi yang **tertulis langsung** di teks: *According to the passage…*, *The passage states that…*.\n\n1. Ambil **kata kunci** dari soal.\n2. **Pindai (scan)** teks untuk kata itu atau sinonimnya.\n3. Baca kalimat di sekitarnya — jawaban benar biasanya **restatement**, bukan salinan kata per kata.",
          },
          {
            type: "tip",
            md: "Soal detail biasanya **berurutan** sesuai urutan teks. Jawaban soal ke-3 biasanya muncul setelah jawaban soal ke-2.",
          },
          { type: "passage", passage: COFFEE },
          {
            type: "try",
            question: rq(
              "l1-rea-2-try",
              COFFEE.id,
              "According to the passage, where was coffee first used as a drink?",
              ["Egypt", "Turkey", "Yemen", "Persia"],
              C,
              "Baris 1: “Coffee was first used as a drink in Yemen.”"
            ),
          },
        ],
      },
    ],
    checkpoint: [
      rq(
        "l1-rea-2-c1",
        COFFEE.id,
        "According to the passage, coffee houses in Egypt, Persia, and Turkey were places for",
        ["selling coffee beans to Europe", "conversation and music", "studying medicine", "growing coffee plants"],
        B,
        "Baris 2–3: “coffee houses became popular places for conversation and music.”"
      ),
      rq(
        "l1-rea-2-c2",
        COFFEE.id,
        "The passage states that some critics believed coffee was",
        ["too expensive", "harmful", "difficult to prepare", "only for travelers"],
        B,
        "Baris 5: “some critics claimed it was harmful.”"
      ),
      {
        id: "l1-rea-2-c3",
        type: "order",
        prompt: "Put the places in the order coffee spread to them, according to the passage.",
        tiles: ["Yemen", "Egypt, Persia, Turkey", "Europe"],
        answer: [["Yemen", "Egypt, Persia, Turkey", "Europe"]],
        explanation: "Yemen (abad ke-15) → Mesir, Persia, Turki → Eropa (abad ke-17).",
      },
    ],
  },
  {
    id: "l1-rea-3",
    skill: "reading",
    title: "Vocabulary in Context",
    summary: "Menebak arti kata dari konteks kalimat — tanpa kamus.",
    minutes: 12,
    passages: [MANGROVE],
    sections: [
      {
        title: "Gunakan konteks, bukan hafalan",
        blocks: [
          {
            type: "text",
            md: "Soal kosakata berbentuk: *The word “X” in line N is closest in meaning to…*. Strategi:\n\n1. Baca **kalimat lengkap** yang memuat kata itu.\n2. **Ganti** kata itu dengan setiap pilihan.\n3. Pilih yang **maknanya paling pas di kalimat itu** — bukan arti kata yang paling umum.",
          },
          {
            type: "examples",
            title: "Satu kata, makna berbeda sesuai konteks",
            items: [
              { right: "The **stands** of trees were cut down. → groups", note: "di bacaan tentang hutan" },
              { right: "The audience **stands** to applaud. → rises", note: "sebagai kata kerja" },
            ],
          },
          {
            type: "try",
            question: rq(
              "l1-rea-3-try",
              MANGROVE.id,
              "The word “stands” in line 9 is closest in meaning to",
              ["positions", "areas of trees", "opinions", "small shops"],
              B,
              "Dalam konteks hutan mangrove, ‘stands’ berarti kumpulan/area pepohonan."
            ),
          },
        ],
      },
    ],
    checkpoint: [
      rq(
        "l1-rea-3-c1",
        MANGROVE.id,
        "The word “remarkably” in line 3 is closest in meaning to",
        ["surprisingly", "slowly", "rarely", "partly"],
        A,
        "Mangrove beradaptasi ‘remarkably well’ = luar biasa/mengejutkan baiknya."
      ),
      rq(
        "l1-rea-3-c2",
        MANGROVE.id,
        "The word “shelter” in line 6 is closest in meaning to",
        ["food", "protection", "light", "water"],
        B,
        "Akar memberi ‘shelter’ = tempat berlindung/perlindungan bagi ikan kecil."
      ),
      {
        id: "l1-rea-3-c3",
        type: "match",
        prompt: "Match each word with its synonym.",
        pairs: [
          ["steadily", "gradually"],
          ["claimed", "stated"],
          ["tangled", "twisted together"],
          ["depend on", "rely on"],
        ],
        explanation: "Sinonim yang sering muncul di soal vocabulary.",
      },
    ],
  },
  {
    id: "l1-rea-4",
    skill: "reading",
    title: "Reference Questions",
    summary: "Menentukan kata yang dirujuk oleh pronoun seperti it, they, which, this.",
    minutes: 10,
    passages: [LIBRARY],
    sections: [
      {
        title: "Pronoun merujuk ke belakang",
        blocks: [
          {
            type: "text",
            md: "Soal reference: *The word “they” in line N refers to…*. Pronoun hampir selalu merujuk ke **kata benda sebelumnya** yang **cocok jumlahnya** (tunggal/jamak) dan **masuk akal** maknanya.",
          },
          {
            type: "tip",
            md: "Ganti pronoun dengan setiap pilihan. Jawaban yang benar membuat kalimat tetap logis.",
          },
          { type: "passage", passage: LIBRARY },
          {
            type: "try",
            question: rq(
              "l1-rea-4-try",
              LIBRARY.id,
              "The word “who” in line 6 refers to",
              ["services", "children", "books", "readers"],
              B,
              "‘…children, who may otherwise have very few books at home’ — ‘who’ merujuk ke children."
            ),
          },
        ],
      },
    ],
    checkpoint: [
      rq(
        "l1-rea-4-c1",
        LIBRARY.id,
        "The word “they” in line 4 refers to",
        ["readers", "books", "visits", "villages"],
        A,
        "‘Readers return the books they borrowed’ — yang meminjam buku adalah para pembaca (readers)."
      ),
      rq(
        "l1-rea-4-c2",
        LIBRARY.id,
        "The word “ones” in line 5 refers to",
        ["visits", "books", "readers", "areas"],
        B,
        "‘choose new ones’ = memilih buku-buku baru."
      ),
      rq(
        "l1-rea-4-c3",
        LIBRARY.id,
        "The word “this” in line 2 refers to",
        ["living far from a library", "operating a vehicle", "reading books", "visiting villages"],
        A,
        "‘this problem’ merujuk ke masalah tinggal jauh dari perpustakaan (kalimat sebelumnya)."
      ),
    ],
  },
];

