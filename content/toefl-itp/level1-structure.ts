import "server-only";
import type { Lesson } from "@/lib/course/types";
import { KEY, completion, wrong } from "./helpers";

const { A, B, C, D } = KEY;

export const L1_STRUCTURE: Lesson[] = [
  {
    id: "l1-str-1",
    skill: "structure",
    title: "Structure Format & Subjects and Verbs",
    summary: "The two Structure question types and rule number one: every clause needs a subject and a verb.",
    minutes: 14,
    sections: [
      {
        title: "Format Structure and Written Expression",
        blocks: [
          {
            type: "text",
            md: "Bagian kedua TOEFL ITP: **40 soal dalam 25 menit** — rata-rata kurang dari 40 detik per soal.",
          },
          {
            type: "table",
            head: ["Bagian", "Tugas", "Soal"],
            rows: [
              ["Structure", "Pilih jawaban yang melengkapi kalimat rumpang", "1–15"],
              ["Written Expression", "Pilih bagian bergaris bawah yang salah", "16–40"],
            ],
          },
          { type: "tip", md: "Tidak ada pengurangan nilai untuk jawaban salah. **Jangan pernah mengosongkan soal.**" },
        ],
      },
      {
        title: "Rule #1: subject + verb",
        blocks: [
          {
            type: "text",
            md: "Setiap kalimat dalam bahasa Inggris membutuhkan **minimal satu subjek dan satu kata kerja (verb)**. Soal Structure yang paling sering muncul: kalimatnya **kehilangan subjek, kata kerja, atau keduanya**.",
          },
          {
            type: "examples",
            items: [
              { wrong: "Was very hot in Tarakan yesterday.", right: "It was very hot in Tarakan yesterday.", note: "Kehilangan subjek." },
              { wrong: "The students in the library quietly.", right: "The students studied in the library quietly.", note: "Kehilangan kata kerja." },
            ],
          },
          {
            type: "text",
            md: "Strategi: **temukan subjek dan kata kerja yang sudah ada**, lalu tanyakan: *apa yang hilang?*",
          },
          {
            type: "try",
            question: completion(
              "l1-str-1-try",
              "____ the largest city in Kalimantan Utara.",
              ["Tarakan", "Tarakan is", "Tarakan being", "That Tarakan"],
              B,
              "Kalimat belum punya subjek maupun kata kerja. Hanya B memberi keduanya: Tarakan (subjek) + is (verb)."
            ),
          },
        ],
      },
    ],
    checkpoint: [
      completion(
        "l1-str-1-c1",
        "The new bridge ____ the two islands.",
        ["connecting", "connects", "to connect", "the connection of"],
        B,
        "Subjek ‘The new bridge’ sudah ada; yang hilang kata kerja utama → connects."
      ),
      completion(
        "l1-str-1-c2",
        "____ arrived at the station an hour early.",
        ["Because the train", "The train", "When the train", "The train which"],
        B,
        "Kalimat butuh subjek untuk ‘arrived’. A, C, D membuat klausa terikat tanpa klausa utama."
      ),
      {
        id: "l1-str-1-c3",
        type: "order",
        prompt: "Put the words in order to make a correct sentence.",
        tiles: ["Many", "students", "study", "English", "online"],
        answer: [["Many", "students", "study", "English", "online"]],
        explanation: "Subjek (Many students) + verb (study) + objek (English) + keterangan (online).",
      },
      {
        id: "l1-str-1-c4",
        type: "fill",
        prompt: "Fill in one suitable verb (present tense).",
        before: "The museum",
        after: "at nine o'clock every morning.",
        accept: ["opens", "closes"],
        explanation: "Subjek tunggal ‘The museum’ membutuhkan verb dengan -s: opens.",
      },
    ],
  },
  {
    id: "l1-str-2",
    skill: "structure",
    title: "Objects of Prepositions",
    summary: "A noun after a preposition is not the subject — don't be fooled.",
    minutes: 12,
    sections: [
      {
        title: "Preposition + object",
        blocks: [
          {
            type: "text",
            md: "Preposisi (**in, on, at, of, for, with, during, after, among, …**) selalu diikuti **objek** (kata benda/pronoun). Objek preposisi **tidak bisa menjadi subjek** kalimat.",
          },
          {
            type: "examples",
            items: [
              { wrong: "With his friends went to the beach.", right: "With his friends, he went to the beach.", note: "‘his friends’ adalah objek dari ‘with’, jadi kalimat masih butuh subjek." },
              { right: "During the rainy season, the roads often flood.", note: "Subjek = the roads, bukan ‘the rainy season’." },
            ],
          },
          {
            type: "tip",
            md: "Jika kalimat **diawali preposisi**, coret dulu frasa preposisinya. Sisa kalimat harus punya subjek + verb.",
          },
          {
            type: "try",
            question: completion(
              "l1-str-2-try",
              "In the middle of the night, ____ heard a strange noise.",
              ["the guard", "of the guard", "the guard who", "because the guard"],
              A,
              "Frasa ‘In the middle of the night’ hanya keterangan. Kalimat butuh subjek untuk ‘heard’ → the guard."
            ),
          },
        ],
      },
    ],
    checkpoint: [
      completion(
        "l1-str-2-c1",
        "After the long meeting, ____ went home immediately.",
        ["the employees", "for the employees", "the employees were", "with the employees"],
        A,
        "Setelah frasa preposisi, kalimat butuh subjek untuk ‘went’."
      ),
      {
        id: "l1-str-2-c2",
        type: "ms",
        prompt: "Choose ALL the words that are prepositions.",
        options: ["during", "although", "among", "beside", "because"],
        answers: [A, C, D],
        explanation: "During, among, beside = preposisi. Although dan because = konjungsi (diikuti klausa).",
      },
      completion(
        "l1-str-2-c3",
        "____ the guidance of their coach, the team won the championship.",
        ["Under", "The", "It was", "Because"],
        A,
        "Hanya preposisi ‘Under’ yang membuat ‘the guidance of their coach’ menjadi frasa keterangan; subjek kalimat tetap ‘the team’."
      ),
    ],
  },
  {
    id: "l1-str-3",
    skill: "structure",
    title: "Appositive",
    summary: "Noun phrases that explain another noun, set off by commas.",
    minutes: 12,
    sections: [
      {
        title: "Recognising appositives",
        blocks: [
          {
            type: "text",
            md: "**Appositive** adalah frasa kata benda yang **menjelaskan kata benda lain**, biasanya diapit **koma**. Appositive **bukan subjek** — kalimat tetap membutuhkan subjek dan kata kerja sendiri.",
          },
          {
            type: "examples",
            items: [
              { right: "Mr. Hadi, **my English teacher**, lives in Tarakan." },
              { right: "**A port city in North Kalimantan**, Tarakan is known for its seafood." },
            ],
          },
          {
            type: "warning",
            md: "Jangan menambahkan **who is / which is** atau kata kerja di dalam appositive bila kalimat sudah lengkap — itu membuat dua kata kerja utama.",
          },
          {
            type: "try",
            question: completion(
              "l1-str-3-try",
              "____, the Mahakam is one of the longest rivers in Indonesia.",
              ["It is a river in East Kalimantan", "A river in East Kalimantan", "Flows through East Kalimantan", "Which is a river in East Kalimantan"],
              B,
              "Kalimat sudah punya subjek (the Mahakam) dan verb (is). Yang dibutuhkan appositive: frasa benda ‘A river in East Kalimantan’."
            ),
          },
        ],
      },
    ],
    checkpoint: [
      completion(
        "l1-str-3-c1",
        "Bahasa Indonesia, ____, is spoken by more than 200 million people.",
        ["it is the national language", "the national language", "is the national language", "national language is"],
        B,
        "Appositive cukup berupa frasa benda di antara koma."
      ),
      completion(
        "l1-str-3-c2",
        "____, Dr. Lim teaches linguistics at the university.",
        ["An expert in language", "She is an expert in language", "Is an expert in language", "Expertly in language"],
        A,
        "Klausa utama sudah lengkap (Dr. Lim teaches). Bagian depan harus appositive (frasa benda)."
      ),
      {
        id: "l1-str-3-c3",
        type: "mc",
        prompt: "Which part is the appositive?\n“The orangutan, an endangered ape, lives in Borneo.”",
        options: ["The orangutan", "an endangered ape", "lives", "in Borneo"],
        answer: B,
        explanation: "‘An endangered ape’ menjelaskan ‘The orangutan’ dan diapit koma.",
      },
    ],
  },
  {
    id: "l1-str-4",
    skill: "structure",
    title: "Written Expression: Subject–Verb Agreement & Plurals",
    summary: "The most common error in questions 16–40: singular/plural subjects that don't match the verb or noun.",
    minutes: 15,
    sections: [
      {
        title: "Subject–verb agreement",
        blocks: [
          {
            type: "text",
            md: "Subjek **tunggal** → verb tunggal (*is, was, has, goes*). Subjek **jamak** → verb jamak (*are, were, have, go*). Jebakannya: ada **frasa di antara subjek dan verb** yang membuat kita salah menentukan subjek.",
          },
          {
            type: "examples",
            items: [
              { wrong: "The boxes on the table **is** heavy.", right: "The boxes on the table **are** heavy.", note: "Subjek = boxes (jamak), bukan table." },
              { wrong: "The leader of the teams **are** here.", right: "The leader of the teams **is** here.", note: "Subjek = leader (tunggal)." },
            ],
          },
          { type: "tip", md: "Coret frasa preposisi di antara subjek dan verb, lalu cocokkan." },
        ],
      },
      {
        title: "Singular and plural nouns",
        blocks: [
          {
            type: "text",
            md: "Kata seperti **many, several, a number of, both, two, three** butuh kata benda **jamak**. Kata seperti **each, every, a/an, one** butuh kata benda **tunggal**.",
          },
          {
            type: "examples",
            items: [
              { wrong: "Several student were absent.", right: "Several students were absent." },
              { wrong: "Each participants received a certificate.", right: "Each participant received a certificate." },
            ],
          },
          {
            type: "try",
            question: wrong(
              "l1-str-4-try",
              "[A:Many] [B:species] of birds [C:migrates] [D:every year].",
              "C",
              "migrate",
              "Subjek ‘Many species’ jamak, jadi verb harus ‘migrate’, bukan ‘migrates’."
            ),
          },
        ],
      },
    ],
    checkpoint: [
      wrong(
        "l1-str-4-c1",
        "The [A:price] of the new [B:textbooks] [C:are] [D:quite high].",
        "C",
        "is",
        "Subjek = the price (tunggal) → is."
      ),
      wrong(
        "l1-str-4-c2",
        "[A:Every] [B:students] in the class [C:has] [D:a laptop].",
        "B",
        "student",
        "‘Every’ diikuti kata benda tunggal → every student."
      ),
      {
        id: "l1-str-4-c3",
        type: "fill",
        prompt: "Fill in the correct present form of ‘be’.",
        before: "The results of the survey",
        after: "surprising.",
        accept: ["are"],
        explanation: "Subjek = results (jamak) → are.",
      },
      {
        id: "l1-str-4-c4",
        type: "ms",
        prompt: "Choose ALL the sentences that are CORRECT.",
        options: [
          "A number of tourists visit the island every month.",
          "Each of the rooms have a balcony.",
          "Two cup of coffee are on the desk.",
          "The list of names is on the wall.",
        ],
        answers: [A, D],
        explanation: "B salah (each … has), C salah (two cups). A dan D benar.",
      },
    ],
  },
];

