import "server-only";
import type { Lesson } from "@/lib/course/types";
import { KEY, partA, say } from "./helpers";

const { A, B, C } = KEY;

export const L1_LISTENING: Lesson[] = [
  {
    id: "l1-lis-1",
    skill: "listening",
    title: "Kenalan dengan Listening TOEFL ITP",
    summary: "Format tiga bagian Listening, cara kerja audionya, dan strategi dasar Part A.",
    minutes: 12,
    sections: [
      {
        title: "Format Listening Comprehension",
        blocks: [
          {
            type: "text",
            md: "Listening adalah bagian **pertama** TOEFL ITP: **50 soal dalam ±35 menit**. Audio hanya diputar **satu kali** dan tidak bisa diulang. Soal juga **tidak tertulis** — Anda hanya membaca empat pilihan jawaban.",
          },
          {
            type: "table",
            head: ["Bagian", "Isi", "Jumlah soal"],
            rows: [
              ["Part A", "Percakapan pendek (1 kalimat pria + 1 kalimat wanita), lalu satu pertanyaan", "30"],
              ["Part B", "Dua percakapan panjang, masing-masing beberapa pertanyaan", "8"],
              ["Part C", "Tiga monolog/kuliah singkat, masing-masing beberapa pertanyaan", "12"],
            ],
          },
          {
            type: "tip",
            md: "Part A menyumbang **30 dari 50 soal**. Menguasai Part A berarti menguasai lebih dari setengah skor Listening.",
          },
        ],
      },
      {
        title: "Seperti apa soal Part A?",
        blocks: [
          {
            type: "text",
            md: "Anda mendengar dua orang berbicara, lalu narator bertanya — biasanya *“What does the man mean?”* atau *“What does the woman imply?”*. Coba dengarkan contoh di bawah.",
          },
          {
            type: "audio",
            caption: "Contoh Part A",
            showTranscript: true,
            script: say(
              ["woman", "Have you finished the report for Professor Lane?"],
              ["man", "I've only just started on it, actually."],
              ["narrator", "What does the man mean?"]
            ),
          },
          {
            type: "text",
            md: "Jawaban yang tepat: **The report is far from finished.** Perhatikan: jawaban benar *tidak mengulang kata yang sama* — ia **menyatakan ulang (restate)** maksud si pria.",
          },
        ],
      },
      {
        title: "Tiga strategi dasar Part A",
        blocks: [
          {
            type: "text",
            md: "1. **Baca keempat pilihan sebelum audio dimulai.** Pilihan memberi bocoran topik dan siapa yang ditanya.\n2. **Fokus pada kalimat kedua.** Jawaban hampir selalu ada di ucapan orang kedua.\n3. **Waspadai pilihan yang memakai kata yang sama persis** dengan audio — itu sering jebakan.",
          },
          {
            type: "try",
            question: partA(
              "l1-lis-1-try",
              [
                ["man", "Do you know where I can buy a city map?"],
                ["woman", "The bookstore on the corner sells them."],
              ],
              "What does the woman mean?",
              [
                "The man should look for a corner on the map.",
                "Maps are available at a nearby store.",
                "She has already bought a map.",
                "The bookstore is closed today.",
              ],
              B,
              "Si wanita memberi tahu tempat membeli peta: toko buku di sudut jalan. Pilihan B menyatakan ulang hal itu (“available at a nearby store”)."
            ),
          },
        ],
      },
    ],
    checkpoint: [
      {
        id: "l1-lis-1-c1",
        type: "fill",
        prompt: "Lengkapi kalimat berikut.",
        before: "Listening TOEFL ITP berisi",
        after: "soal.",
        accept: ["50", "fifty", "lima puluh"],
        explanation: "Total 50 soal: Part A 30, Part B 8, Part C 12.",
      },
      {
        id: "l1-lis-1-c2",
        type: "match",
        prompt: "Pasangkan setiap bagian dengan isinya.",
        pairs: [
          ["Part A", "Percakapan pendek"],
          ["Part B", "Percakapan panjang"],
          ["Part C", "Monolog / kuliah"],
        ],
        explanation: "Part A: percakapan pendek; Part B: percakapan panjang; Part C: monolog atau kuliah singkat.",
      },
      {
        id: "l1-lis-1-c3",
        type: "ms",
        prompt: "Pilih SEMUA strategi yang tepat untuk Part A.",
        options: [
          "Membaca pilihan jawaban sebelum audio diputar",
          "Fokus pada ucapan orang kedua",
          "Memilih jawaban yang mengulang kata persis dari audio",
          "Menunggu audio diputar ulang",
        ],
        answers: [A, B],
        explanation: "Baca pilihan lebih dulu dan fokus pada pembicara kedua. Audio tidak diputar ulang, dan kata yang sama persis sering jebakan.",
      },
      partA(
        "l1-lis-1-c4",
        [
          ["woman", "This coffee machine never seems to work."],
          ["man", "Let's try the café across the street instead."],
        ],
        "What does the man suggest?",
        [
          "Fixing the coffee machine",
          "Getting coffee somewhere else",
          "Crossing the street carefully",
          "Working at the café",
        ],
        B,
        "“Try the café across the street instead” = membeli kopi di tempat lain."
      ),
    ],
  },
  {
    id: "l1-lis-2",
    skill: "listening",
    title: "Restatement: Jawaban yang Menyatakan Ulang",
    summary: "Mengenali jawaban benar yang memakai sinonim dan struktur berbeda dari audio.",
    minutes: 12,
    sections: [
      {
        title: "Apa itu restatement?",
        blocks: [
          {
            type: "text",
            md: "Pembuat soal TOEFL jarang memakai kata yang sama dengan audio di jawaban benar. Mereka **menyatakan ulang** ide yang sama dengan **sinonim** atau **struktur kalimat lain**.",
          },
          {
            type: "examples",
            title: "Audio → Jawaban benar",
            items: [
              { right: "“The lecture was postponed.” → The class was moved to a later time.", note: "postponed = moved to a later time" },
              { right: "“I'm exhausted.” → She is very tired.", note: "exhausted = very tired" },
              { right: "“The tickets are sold out.” → No tickets are left.", note: "sold out = none left" },
            ],
          },
          {
            type: "try",
            question: {
              id: "l1-lis-2-try1",
              type: "match",
              prompt: "Pasangkan kata/frasa dengan sinonimnya.",
              pairs: [
                ["purchase", "buy"],
                ["assist", "help"],
                ["commence", "begin"],
                ["inexpensive", "cheap"],
              ],
              explanation: "Sinonim seperti ini sangat sering muncul sebagai restatement di Part A.",
            },
          },
        ],
      },
      {
        title: "Latihan mendengar restatement",
        blocks: [
          {
            type: "audio",
            caption: "Dengarkan, lalu tebak restatement-nya.",
            showTranscript: true,
            script: say(
              ["man", "Is the library open this weekend?"],
              ["woman", "Only on Saturday morning."],
              ["narrator", "What does the woman mean?"]
            ),
          },
          {
            type: "text",
            md: "Restatement yang tepat: **The library is closed on Sunday.** Perhatikan bahwa kata *Sunday* tidak pernah diucapkan — tetapi itulah kesimpulan dari “only on Saturday morning”.",
          },
          {
            type: "try",
            question: partA(
              "l1-lis-2-try2",
              [
                ["woman", "How was the new restaurant?"],
                ["man", "The food was great, but it cost a fortune."],
              ],
              "What does the man mean?",
              [
                "The restaurant was very expensive.",
                "He won some money at the restaurant.",
                "The food was not very good.",
                "He would like to own a restaurant.",
              ],
              A,
              "“Cost a fortune” = sangat mahal. Pilihan B memakai ide ‘fortune/money’ sebagai jebakan."
            ),
          },
        ],
      },
    ],
    checkpoint: [
      {
        id: "l1-lis-2-c1",
        type: "fill",
        prompt: "Tulis sinonim satu kata (bahasa Inggris).",
        before: "“The meeting was postponed” artinya the meeting was",
        after: "until later.",
        accept: ["delayed", "put off", "rescheduled", "moved"],
        explanation: "Postponed = delayed / put off / rescheduled.",
      },
      partA(
        "l1-lis-2-c2",
        [
          ["man", "Did you get the job at the museum?"],
          ["woman", "They offered it to me this morning!"],
        ],
        "What does the woman mean?",
        [
          "She will visit the museum this morning.",
          "She was given the position.",
          "She is still waiting to hear about the job.",
          "She offered the man a job.",
        ],
        B,
        "“They offered it to me” = dia mendapatkan pekerjaan itu (was given the position)."
      ),
      partA(
        "l1-lis-2-c3",
        [
          ["woman", "Are you coming to the party tonight?"],
          ["man", "I wouldn't miss it."],
        ],
        "What does the man mean?",
        [
          "He will definitely attend.",
          "He did not hear about the party.",
          "He will arrive late.",
          "He misses his friends.",
        ],
        A,
        "“I wouldn't miss it” = dia pasti datang."
      ),
      {
        id: "l1-lis-2-c4",
        type: "ms",
        prompt: "Pilih SEMUA kalimat yang merupakan restatement dari “The bus was packed.”",
        options: ["The bus was very crowded.", "There were many people on the bus.", "The bus carried a lot of packages.", "The bus was late."],
        answers: [A, B],
        explanation: "Packed (untuk kendaraan) = penuh sesak. ‘Packages’ hanya mirip bunyinya.",
      },
    ],
  },
  {
    id: "l1-lis-3",
    skill: "listening",
    title: "Jebakan Bunyi Mirip",
    summary: "Menghindari pilihan yang berisi kata yang bunyinya mirip dengan audio.",
    minutes: 10,
    sections: [
      {
        title: "Mengapa bunyi mirip berbahaya?",
        blocks: [
          {
            type: "text",
            md: "Saat mendengar cepat, otak menangkap **bunyi**, bukan makna. Pembuat soal memanfaatkannya: pilihan yang salah sering berisi kata yang **bunyinya mirip** dengan kata di audio.",
          },
          {
            type: "examples",
            title: "Pasangan bunyi mirip yang sering dipakai",
            items: [
              { note: "glass / class / grass" },
              { note: "fifteen / fifty" },
              { note: "walk / work" },
              { note: "rain / train / lane" },
              { note: "lend / land / lens" },
            ],
          },
          {
            type: "warning",
            md: "Jika sebuah pilihan memuat kata yang **mirip bunyinya** tetapi maknanya tidak cocok dengan situasi, hampir pasti itu **salah**.",
          },
        ],
      },
      {
        title: "Latihan",
        blocks: [
          {
            type: "try",
            question: partA(
              "l1-lis-3-try",
              [
                ["man", "Why are you carrying an umbrella?"],
                ["woman", "The forecast says it will rain all afternoon."],
              ],
              "What does the woman mean?",
              [
                "She is taking the afternoon train.",
                "She expects wet weather later.",
                "The rain has already stopped.",
                "She forgot her umbrella.",
              ],
              B,
              "“Rain all afternoon” = cuaca basah. ‘Train’ adalah jebakan bunyi mirip dengan ‘rain’."
            ),
          },
        ],
      },
    ],
    checkpoint: [
      {
        id: "l1-lis-3-c1",
        type: "match",
        prompt: "Pasangkan kata dengan kata yang bunyinya mirip.",
        pairs: [
          ["glass", "class"],
          ["walk", "work"],
          ["fifteen", "fifty"],
          ["lend", "land"],
        ],
        explanation: "Pasangan ini sering dijadikan jebakan bunyi mirip di Part A.",
      },
      partA(
        "l1-lis-3-c2",
        [
          ["woman", "Could you lend me your notes from yesterday's lecture?"],
          ["man", "Sure, I'll bring them tomorrow."],
        ],
        "What will the man probably do?",
        [
          "Let the woman borrow his notes",
          "Land at the airport tomorrow",
          "Give a lecture tomorrow",
          "Write a note to the professor",
        ],
        A,
        "Pria setuju meminjamkan catatannya. ‘Land’ hanya mirip bunyinya dengan ‘lend’."
      ),
      partA(
        "l1-lis-3-c3",
        [
          ["man", "How long does it take to walk to campus?"],
          ["woman", "About fifteen minutes if you hurry."],
        ],
        "What does the woman say about the walk?",
        [
          "It takes about fifty minutes.",
          "It is a short distance to work.",
          "It can be done in a quarter of an hour.",
          "The man should take the bus.",
        ],
        C,
        "Fifteen minutes = a quarter of an hour. ‘Fifty’ dan ‘work’ adalah jebakan bunyi."
      ),
    ],
  },
  {
    id: "l1-lis-4",
    skill: "listening",
    title: "Ungkapan Negatif",
    summary: "Memahami negatif, negatif ganda, dan kata yang bermakna hampir-tidak.",
    minutes: 12,
    sections: [
      {
        title: "Negatif biasa dan restatement-nya",
        blocks: [
          {
            type: "text",
            md: "Kalimat negatif di audio biasanya dijawab dengan **restatement positif** yang memakai **lawan kata**.",
          },
          {
            type: "examples",
            items: [
              { right: "“The test wasn't easy.” → The test was difficult." },
              { right: "“He didn't arrive on time.” → He was late." },
              { right: "“The room isn't large enough.” → The room is too small." },
            ],
          },
        ],
      },
      {
        title: "Negatif ganda dan kata ‘hampir tidak’",
        blocks: [
          {
            type: "text",
            md: "Dua negatif saling meniadakan: **not unusual = usual (biasa)**, **not impossible = possible**. Kata seperti **hardly, barely, scarcely, rarely, seldom** bermakna **hampir tidak / jarang** — meskipun tidak ada kata *not*.",
          },
          {
            type: "table",
            head: ["Ungkapan", "Makna"],
            rows: [
              ["It's not unusual for him to be late.", "He is often late."],
              ["I can hardly hear you.", "I almost cannot hear you."],
              ["She seldom eats breakfast.", "She rarely eats breakfast."],
              ["Not a single seat was empty.", "The room was full."],
            ],
          },
          {
            type: "try",
            question: partA(
              "l1-lis-4-try",
              [
                ["woman", "Did you enjoy the concert?"],
                ["man", "I could barely hear the singer over the crowd."],
              ],
              "What does the man mean?",
              [
                "The singer was too loud.",
                "It was difficult for him to hear the music.",
                "He did not go to the concert.",
                "The crowd was very quiet.",
              ],
              B,
              "“Barely hear” = hampir tidak bisa mendengar → sulit mendengar."
            ),
          },
        ],
      },
    ],
    checkpoint: [
      {
        id: "l1-lis-4-c1",
        type: "match",
        prompt: "Pasangkan ungkapan dengan maknanya.",
        pairs: [
          ["not unusual", "common"],
          ["hardly ever", "almost never"],
          ["not impossible", "possible"],
          ["seldom", "rarely"],
        ],
        explanation: "Negatif ganda menjadi positif; hardly/seldom bermakna jarang.",
      },
      partA(
        "l1-lis-4-c2",
        [
          ["man", "Is the chemistry exam going to be hard?"],
          ["woman", "It won't be easy, that's for sure."],
        ],
        "What does the woman mean?",
        ["The exam will be difficult.", "The exam has been canceled.", "She is sure the exam is easy.", "She has not studied chemistry."],
        A,
        "“Won't be easy” = akan sulit."
      ),
      partA(
        "l1-lis-4-c3",
        [
          ["woman", "Does Mark usually come to the study group?"],
          ["man", "He hardly ever misses a session."],
        ],
        "What does the man say about Mark?",
        ["He rarely attends.", "He almost always attends.", "He missed the last session.", "He leads the study group."],
        B,
        "“Hardly ever misses” = hampir tidak pernah absen → hampir selalu hadir. Hati-hati: ada dua unsur negatif (hardly + miss)."
      ),
      {
        id: "l1-lis-4-c4",
        type: "order",
        prompt: "Susun kata menjadi restatement dari “The room wasn't large enough.”",
        tiles: ["The", "room", "was", "too", "small"],
        answer: [["The", "room", "was", "too", "small"]],
        explanation: "Negatif + ‘large enough’ = too small.",
      },
    ],
  },
];
