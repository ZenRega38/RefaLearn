import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, examples, fill, live, match, pick, pics, table, text, tip, tryIt, vocab, warn, writing } from "../kit";
import { correctOne, findError, SCORE_TABLE } from "./helpers";

// Modul 1 — Sesi 1: competition format + Part A foundations (nouns, three
// basic tenses, parts of speech, conjunctions) + a first look at Reading.

const RANI: Passage = {
  id: "eac1-rani",
  title: "Rani and the English Olympiad",
  pic: "girl",
  lines: [
    "Rani has always been shy about speaking English in front of others.",
    "When her teacher announced the English Olympiad, she almost didn't sign up.",
    "But her older sister encouraged her to try, saying that mistakes are part of learning.",
    "Rani finally registered, and now she practices every night after dinner.",
    "She still feels nervous, but she is proud that she didn't give up on the chance.",
  ],
};

export const SESSION1: Level = {
  id: "eac1",
  title: "Session 1 — Competition Format & Part A Foundations",
  description:
    "Know the competition (format, scoring, tie-breakers, roadmap), then build Part A foundations: countable and uncountable nouns, plurals, three basic tenses, parts of speech and conjunctions. Finish with a first look at Part B Reading.",
  targetScore: "Foundation · Part A",
  cover: ["medal", "podium", "owl-read"],
  pretest: {
    id: "eac1-pre",
    title: "Diagnostic Quick Check",
    passPercent: 0,
    questions: [
      pick("eac1-pre1", "She ___ to school every day.", ["goes", "go", "going", "gone"], 0, "Subjek *she* + simple present → verb + **-es**: *goes*."),
      pick("eac1-pre2", "The plural of “child” is…", ["children", "childs", "childes", "child's"], 0, "*Child* punya bentuk jamak tidak beraturan: **children**."),
      pick("eac1-pre3", "I ___ my homework yesterday.", ["did", "do", "does", "doing"], 0, "Penanda *yesterday* → simple past: **did**."),
      pick("eac1-pre4", "Please give me some ___.", ["advice", "advices", "advise", "advisement"], 0, "*Advice* uncountable, tidak pernah diberi -s. (*Advise* adalah kata kerja.)"),
      pick("eac1-pre5", "“The beautiful garden is behind the house.” Which word is the adjective?", ["beautiful", "garden", "behind", "house"], 0, "*Beautiful* menerangkan noun *garden* → adjective."),
      pick("eac1-pre6", "Look! She ___ a letter now.", ["is writing", "write", "writes", "wrote"], 0, "*Look!* dan *now* → present continuous: **is writing**."),
      pick("eac1-pre7", "I stayed home ___ it was raining.", ["because", "but", "so", "or"], 0, "Hujan adalah **alasan** tinggal di rumah → *because*."),
      pick("eac1-pre8", "Choose the synonym of “happy”.", ["joyful", "sad", "angry", "tired"], 0, "*Happy* ≈ **joyful** (gembira)."),
      pick("eac1-pre9", "There ___ many students in the class.", ["are", "is", "was", "be"], 0, "*There is/are* mengikuti noun sesudahnya: *many students* (jamak) → **are**."),
      pick("eac1-pre10", "Choose the antonym of “difficult”.", ["simple", "hard", "complex", "tough"], 0, "Lawan *difficult* (sulit) adalah **simple** (mudah). *Hard, complex, tough* justru sinonimnya."),
    ],
  },
  lessons: [
    {
      id: "eac1-l1",
      skill: "reading",
      title: "The Olympiad at a Glance",
      summary: "Exam format, scoring, tie-breakers, why we start with Part A, and the 7-session roadmap.",
      minutes: 15,
      sections: [
        {
          title: "The Preliminary paper",
          blocks: [
            pics([["stopwatch", "60 minutes"], ["checklist", "40 questions"], ["medal", "no minus points"]], "Preliminary Round in one look"),
            text(
              "Ujian **Preliminary Round** berlangsung **60 menit** dengan **40 soal pilihan ganda** (4 opsi). Soalnya dibagi menjadi 4 bagian:\n\n- **A. Words & Structure** — grammar dan kosakata\n- **B. Reading** — memahami bacaan\n- **C. Spoken & Written Expression** — pola dialog\n- **D. Higher-Order Thinking Skills (HOTS)** — logika: menyusun kalimat, preposisi idiomatik, analisis kesalahan"
            ),
            table(SCORE_TABLE.head, SCORE_TABLE.rows),
            tip("**Tidak ada sistem minus.** Kosong = 0, salah = 0. Jadi **isi semua soal**, jangan ada yang kosong. Kamu juga boleh **loncat soal dan kembali lagi** selama waktu masih ada, jadi kerjakan yang gampang dulu."),
          ],
        },
        {
          title: "Priorities and tie-breakers",
          blocks: [
            table(
              ["Part", "Character", "Priority"],
              [
                ["A. Words & Structure", "Grammar & vocab — mekanis, cepat dilatih", "1 (mulai duluan)"],
                ["B. Reading", "Butuh strategi baca, transferable", "2"],
                ["C. Spoken & Written Expression", "Pola dialog, bisa dihafal polanya", "3"],
                ["D. HOTS", "Paling sulit, butuh fondasi kuat dulu", "4 — tapi #1 untuk tie-breaker!"],
              ]
            ),
            text("Strategi kita: kuasai **Bagian A** dulu sampai mendekati sempurna, karena paling cepat dilatih dan bobotnya paling besar (35 poin)."),
            warn("Kalau ada **skor seri**, urutan penentunya adalah **Bagian D → Bagian A → Bagian C**. Jadi walau Bagian D dilatih belakangan, jangan diabaikan total — porsinya ditambah bertahap mulai Sesi 3."),
          ],
        },
        {
          title: "An honest note about the target",
          blocks: [
            text(
              "Juara 1 Nasional dari level dasar dalam ~5 minggu (3 sesi) sebelum Preliminary adalah target yang **berat**. Tapi kompetisi ini berjalan sampai Desember (Preliminary → Regional → Final Nasional), jadi total waktu belajar sebenarnya **~3,5 bulan** kalau kamu lolos tiap babak. Strateginya dirancang untuk:\n\n1. Memaksimalkan peluang **lolos Preliminary** dulu (target realistis jangka pendek)\n2. Membangun fondasi yang makin kuat tiap babak, biar peluang ke Final Nasional makin besar\n3. Fokus di bagian soal yang paling efisien untuk level dasar naik cepat"
            ),
            tip("Ini maraton 3,5 bulan. Rayakan progress kecil — misalnya diagnostic naik dari 4 ke 7 benar. Lolos Preliminary sudah merupakan **kemenangan besar**."),
          ],
        },
        {
          title: "The 7-session roadmap",
          blocks: [
            table(
              ["Session", "When", "Main focus"],
              [
                ["1", "Minggu ini", "Format kompetisi + fondasi Bagian A (nouns, tenses dasar, parts of speech, conjunctions)"],
                ["2", "+2 minggu", "Bagian A lanjutan (adjective/adverb, comparison, preposisi) + Bagian B (strategi reading dasar)"],
                ["3", "+2 minggu (±H-1 minggu Preliminary)", "Bagian C (pola dialog) + Bagian D (intro sentence unscrambling) + full mock test 60 menit"],
                ["—", "17/24 Okt", "PRELIMINARY ROUND"],
                ["4", "Awal Nov (jika lolos)", "Review hasil Preliminary, perkuat kelemahan, HOTS & vocab level lanjut"],
                ["5", "Pertengahan Nov", "Latihan intensif semua bagian + mock test + strategi tie-breaker"],
                ["—", "Nov (TBC)", "SEMIFINAL REGIONAL ROUND"],
                ["6", "Akhir Nov/awal Des (jika lolos)", "Prep level nasional, vocab akademik, HOTS multi-langkah kompleks"],
                ["7", "H-1 minggu Grand Final", "Polishing, simulasi ujian penuh, manajemen waktu & mental"],
                ["—", "Des (TBC)", "GRAND FINAL NASIONAL"],
              ]
            ),
            text("*Tanggal disesuaikan begitu panitia mengumumkan jadwal pasti Preliminary (17 atau 24 Oktober) serta tanggal Regional dan Final. Cek update di technical briefing (19 Sept / 3 Okt) dan s.id/eachampionship.*"),
          ],
        },
        {
          title: "Read your diagnostic score",
          blocks: [
            table(
              ["Correct answers", "What it means"],
              [
                ["7–10", "Fondasimu lebih baik dari perkiraan — Sesi 2 bisa dipercepat."],
                ["4–6", "Sesuai perkiraan level dasar — ikuti modul ini apa adanya."],
                ["0–3", "Perlu tambahan waktu di tenses & nouns sebelum lanjut ke Sesi 2."],
              ]
            ),
            tip("Belum mengerjakan **Diagnostic Quick Check**? Kerjakan dulu dengan cepat tanpa melihat catatan — tujuannya hanya untuk tahu titik lemahmu."),
          ],
        },
      ],
      checkpoint: [
        pick("eac1-l1-c1", "How long is the Preliminary Round paper?", ["60 minutes", "90 minutes", "45 minutes", "120 minutes"], 0, "60 menit untuk 40 soal."),
        pick("eac1-l1-c2", "You are not sure about an answer and time is almost up. What should you do?", ["Choose your best guess — a wrong answer costs nothing.", "Leave it empty to avoid losing points.", "Skip it, because wrong answers lose one point.", "Write two answers."], 0, "Tidak ada nilai minus: kosong dan salah sama-sama 0, jadi **isi semua soal**."),
        pick("eac1-l1-c3", "Which part has the highest maximum score?", ["A. Words & Structure (35)", "B. Reading (27)", "D. HOTS (22)", "C. Spoken & Written Expression (16)"], 0, "Bagian A bernilai maksimal 35 poin — itu sebabnya dikuasai lebih dulu."),
        pick("eac1-l1-c4", "Two students have the same total score. Which part decides the winner first?", ["Part D", "Part A", "Part C", "Part B"], 0, "Urutan tie-breaker: **D → A → C**."),
        pick("eac1-l1-c5", "How many questions are in Part D?", ["5", "10", "20", "40"], 0, "A = 20, B = 10, C = 5, D = 5."),
        pick(
          "eac1-l1-c6",
          "Part D has only 5 questions, but it is trained a little in every session. Why is that the smartest plan?",
          ["Each D question is worth the most, and D decides ties first.", "Part D is the easiest part.", "Part D has the most questions.", "Part D is not scored."],
          0,
          "Tiap soal D bernilai paling tinggi (22 poin untuk 5 soal) dan D adalah penentu #1 saat skor seri.",
          { hots: true }
        ),
      ],
    },
    {
      id: "eac1-l2",
      skill: "structure",
      title: "Nouns: Countable, Uncountable and Plurals",
      summary: "Plural rules, irregular plurals, uncountable nouns and the quantifiers that go with them.",
      minutes: 20,
      sections: [
        {
          title: "Countable nouns and plural rules",
          blocks: [
            text("**Countable nouns** bisa dihitung dan punya bentuk jamak."),
            table(
              ["Rule", "Example"],
              [
                ["Reguler: tambah **-s**", "book → books, cat → cats"],
                ["Berakhiran -s, -x, -ch, -sh, -o: tambah **-es**", "box → boxes, watch → watches, potato → potatoes"],
                ["Konsonan + y: ganti y jadi **-ies**", "city → cities, baby → babies"],
              ]
            ),
            vocab(
              [
                ["child → children", "anak → anak-anak", "baby"],
                ["man → men", "laki-laki (jamak)", "father"],
                ["woman → women", "perempuan (jamak)", "mother"],
                ["mouse → mice", "tikus (jamak)", "mouse"],
                ["tooth → teeth", "gigi (jamak)", "tooth"],
                ["foot → feet", "kaki (jamak)", "foot"],
                ["person → people", "orang (jamak)", "hello"],
              ],
              "Irregular plurals — wajib dihafal, sering muncul di soal!"
            ),
            tryIt(pick("eac1-l2-try1", "One mouse, two ___.", ["mice", "mouses", "mices", "mousees"], 0, "*Mouse* jamaknya tidak beraturan: **mice**.", { image: "mouse*2" })),
          ],
        },
        {
          title: "Uncountable nouns",
          blocks: [
            text("**Uncountable nouns** tidak bisa dihitung dan **TIDAK punya bentuk jamak**:\n\n*information, advice, furniture, homework, news, luggage, money, equipment, bread, water*"),
            examples(
              [
                { wrong: "We need some informations.", right: "We need some information.", note: "Information tidak pernah diberi -s." },
                { wrong: "She gave me many advices.", right: "She gave me a lot of advice.", note: "Uncountable → much / a lot of, bukan many." },
                { wrong: "How many furnitures do you have?", right: "How much furniture do you have?", note: "Furniture uncountable." },
              ],
              "Common traps"
            ),
            warn("Pakai **much** atau **a lot of**, BUKAN **many**, untuk uncountable → *much information*, bukan *informations*."),
          ],
        },
        {
          title: "Quick quantifiers",
          blocks: [
            table(
              ["Used with", "Quantifiers", "Example"],
              [
                ["Countable", "many, few, a few", "many books, a few friends"],
                ["Uncountable", "much, little, a little", "much sugar, a little water"],
                ["Both", "some, any, a lot of", "some money, a lot of students"],
              ]
            ),
            tryIt(pick("eac1-l2-try2", "There is not ___ water in the bottle.", ["much", "many", "few", "a few"], 0, "*Water* uncountable → **much**.", { image: "water" })),
            tryIt(fill("eac1-l2-try3", "Type the plural.", "One box, two", ".", ["boxes"], "Berakhiran -x → tambah **-es**: boxes.")),
          ],
        },
      ],
      checkpoint: [
        match("eac1-l2-c1", "Match each noun with its plural.", [["child", "children"], ["tooth", "teeth"], ["woman", "women"], ["person", "people"], ["city", "cities"]], "Ingat: child → children, tooth → teeth, woman → women, person → people, city → cities (konsonan + y → -ies)."),
        fill("eac1-l2-c2", "Type the plural.", "One watch, three", ".", ["watches"], "Berakhiran -ch → tambah **-es**."),
        fill("eac1-l2-c3", "Type the plural.", "One baby, two", ".", ["babies"], "Konsonan + y → ganti **-ies**."),
        pick("eac1-l2-c4", "Which noun is uncountable?", ["luggage", "suitcase", "bag", "box"], 0, "*Luggage* (barang bawaan) uncountable; *suitcase, bag, box* bisa dihitung.", { image: "suitcase" }),
        pick("eac1-l2-c5", "He doesn't have ___ money left.", ["much", "many", "a few", "few"], 0, "*Money* uncountable → **much**."),
        pick("eac1-l2-c6", "We met ___ friendly people at the festival.", ["many", "much", "a little", "little"], 0, "*People* countable (jamak) → **many**."),
        correctOne("eac1-l2-c7", ["The news is good today.", "The news are good today.", "The newses is good today.", "The new is good today."], "*News* uncountable walau berakhiran -s, jadi diikuti **is**."),
      ],
    },
    {
      id: "eac1-l3",
      skill: "structure",
      title: "Three Basic Tenses",
      summary: "Simple Present, Simple Past and Present Continuous — formulas, signal words and the most common trap.",
      minutes: 20,
      sections: [
        {
          title: "Simple Present",
          blocks: [
            pics([["timeline", "past · now · future"]]),
            text("**Simple Present** — kebiasaan dan fakta umum.\n\nFormula: **S + V1** (+s/es untuk he/she/it) → *She reads every day.*\n\nSignal words: *always, usually, every day, often*"),
            warn("Jebakan umum: **lupa menambah -s** untuk subjek tunggal (he/she/it). *My father drink coffee* ✘ → *My father drinks coffee* ✔"),
            tryIt(pick("eac1-l3-try1", "My mother ___ dinner every evening.", ["cooks", "cook", "cooking", "cooked"], 0, "*My mother* = she, *every evening* = kebiasaan → **cooks**.", { image: "stove" })),
          ],
        },
        {
          title: "Simple Past",
          blocks: [
            text("**Simple Past** — kejadian yang sudah selesai di masa lalu.\n\nFormula: **S + V2** (beraturan +ed, tidak beraturan dihafal) → *He watched TV last night. / She went home.*\n\nSignal words: *yesterday, last week, ago, in 2020*"),
            table(["V1", "V2"], [["go", "went"], ["do", "did"], ["eat", "ate"], ["buy", "bought"], ["write", "wrote"], ["see", "saw"], ["watch", "watched"], ["study", "studied"]]),
            tryIt(pick("eac1-l3-try2", "Last year, they ___ to Bali for vacation.", ["went", "go", "goes", "going"], 0, "*Last year* → past; *go* → **went**.", { image: "beach" })),
          ],
        },
        {
          title: "Present Continuous",
          blocks: [
            text("**Present Continuous** — sedang terjadi sekarang / bersifat sementara.\n\nFormula: **S + am/is/are + V-ing** → *They are studying now.*\n\nSignal words: *now, right now, at the moment, Look!, Listen!*"),
            table(
              ["Tense", "Formula", "Signal words", "Example"],
              [
                ["Simple Present", "S + V1(s/es)", "always, usually, every day, often", "She reads every day."],
                ["Simple Past", "S + V2", "yesterday, last week, ago, in 2020", "She went home."],
                ["Present Continuous", "S + am/is/are + V-ing", "now, at the moment, Look!, Listen!", "They are studying now."],
              ]
            ),
            tryIt(pick("eac1-l3-try3", "Please be quiet! The baby ___ now.", ["is sleeping", "sleeps", "sleep", "slept"], 0, "*Now* → present continuous: **is sleeping**.", { image: "sleep" })),
          ],
        },
        {
          title: "Make it yours",
          blocks: [
            tip("Buat **3 kolom** di kertas (Present / Past / Continuous), lalu isi tiap kolom dengan kalimat tentang kegiatanmu sendiri — lebih nempel daripada cuma menghafal rumus."),
            writing({
              id: "eac1-l3-task",
              title: "My three columns",
              prompt: "Write **three sentences about your own life**: one in the Simple Present, one in the Simple Past and one in the Present Continuous. Underline the signal word in each sentence.",
              image: "timeline",
              minWords: 15,
              maxWords: 60,
              tips: ["Present: I usually … every …", "Past: Yesterday I … / Last week I …", "Continuous: Right now I am …"],
              models: [{ label: "Model", text: "I usually walk to school every morning. Yesterday I watched a movie with my brother. Right now I am studying English for the Olympiad." }],
              rubric: ["Each sentence uses a different tense.", "He/she/it verbs have -s in the Simple Present.", "The past verb is in V2 form.", "The continuous sentence has am/is/are + V-ing."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("eac1-l3-c1", "Every morning, my father ___ coffee.", ["drinks", "drink", "drinking", "drank"], 0, "Kebiasaan (*every morning*) + subjek he → **drinks**.", { image: "coffee" }),
        pick("eac1-l3-c2", "We ___ a movie together yesterday.", ["watched", "watch", "watches", "watching"], 0, "*Yesterday* → simple past **watched**."),
        pick("eac1-l3-c3", "Listen! The birds ___.", ["are singing", "sing", "sang", "sings"], 0, "*Listen!* → present continuous: **are singing**.", { image: "bird*2" }),
        match("eac1-l3-c4", "Match each signal word with its tense.", [["every day", "Simple Present"], ["last week", "Simple Past"], ["at the moment", "Present Continuous"]], "Penanda waktu menentukan tense."),
        fill("eac1-l3-c5", "Type the past form of “go”.", "She", "home early last night.", ["went"], "*Go* tidak beraturan → **went**."),
        findError("eac1-l3-c6", "[A:My sister] [B:study] English [C:every] [D:evening].", "B", "studies", "Subjek *my sister* (she) + kebiasaan → **studies**.", { hots: true }),
      ],
    },
    {
      id: "eac1-l4",
      skill: "structure",
      title: "Parts of Speech and Conjunctions",
      summary: "Noun, verb, adjective, adverb — and the conjunctions that join ideas.",
      minutes: 10,
      sections: [
        {
          title: "Four basic word classes",
          blocks: [
            table(
              ["Word class", "Job", "Examples"],
              [
                ["Noun (kata benda)", "nama benda, orang, ide", "book, teacher, happiness"],
                ["Verb (kata kerja)", "aksi / keadaan", "run, study, become"],
                ["Adjective (kata sifat)", "menerangkan **noun**", "beautiful, difficult, happy"],
                ["Adverb (kata keterangan)", "menerangkan **verb/adjective**, sering berakhiran -ly", "quickly, carefully, very"],
              ]
            ),
            tip("Kelas kata juga penting untuk **Bagian D** nanti (sentence unscrambling): begitu tahu mana noun, verb, adjective, dan adverb, kamu tahu posisinya di kalimat."),
            examples(
              [
                { wrong: "She is a very diligently student.", right: "She is a very diligent student.", note: "Menerangkan noun *student* → adjective." },
                { wrong: "He speaks English fluent.", right: "He speaks English fluently.", note: "Menerangkan verb *speaks* → adverb." },
              ],
              "Adjective or adverb?"
            ),
          ],
        },
        {
          title: "Basic conjunctions",
          blocks: [
            table(
              ["Conjunction", "Meaning", "Example"],
              [
                ["and", "menambahkan", "I like tea and cake."],
                ["but", "kontras", "I wanted to go out, but it started raining."],
                ["or", "pilihan", "Do you want tea or coffee?"],
                ["so", "akibat", "I was hungry, so I made some food."],
                ["because", "alasan", "I stayed home because it was raining."],
                ["although", "kontras kuat", "I stayed home although it wasn't raining."],
                ["when", "waktu", "Call me when you arrive."],
                ["if", "kondisi", "If it rains, we will stay inside."],
              ]
            ),
            pics([["rain", "because it was raining"], ["house", "I stayed home"]], "Cause → result"),
            tryIt(pick("eac1-l4-try1", "We stayed inside ___ the weather was terrible.", ["because", "although", "but", "or"], 0, "Cuaca buruk adalah **alasan** → *because*.")),
          ],
        },
      ],
      checkpoint: [
        match("eac1-l4-c1", "Match each word with its word class.", [["happiness", "noun"], ["become", "verb"], ["difficult", "adjective"], ["carefully", "adverb"]], "Happiness = kata benda abstrak; become = kata kerja; difficult = kata sifat; carefully = kata keterangan."),
        pick("eac1-l4-c2", "He speaks English ___.", ["fluently", "fluent", "fluency", "fluentness"], 0, "Menerangkan verb *speaks* → adverb **fluently**."),
        pick("eac1-l4-c3", "She is a very ___ student; she always finishes her homework.", ["diligent", "diligence", "diligently", "diligentness"], 0, "Menerangkan noun *student* → adjective **diligent**."),
        pick("eac1-l4-c4", "I was hungry, ___ I made some food.", ["so", "but", "because", "although"], 0, "Lapar → **akibatnya** membuat makanan: *so*."),
        pick("eac1-l4-c5", "I like tea, ___ my brother likes coffee.", ["but", "so", "because", "if"], 0, "Dua hal yang **berlawanan** → *but*."),
        arrange("eac1-l4-c6", "Put the words in order.", "I stayed home because it was raining", "Klausa utama + *because* + alasan.", { hots: true }),
      ],
    },
    {
      id: "eac1-l5",
      skill: "reading",
      title: "Reading Preview: Rani's Story",
      summary: "A first Part B passage: main idea, detail and vocabulary in context.",
      minutes: 10,
      passages: [RANI],
      sections: [
        {
          title: "Three question types",
          blocks: [
            table(
              ["Question", "What to do"],
              [
                ["Main idea", "Apa inti seluruh bacaan? Biasanya di kalimat pertama atau terakhir."],
                ["Detail", "Cari kalimat yang menjawab *why / what / when* secara langsung."],
                ["Vocabulary in context", "Tebak makna kata dari kalimat di sekitarnya."],
              ]
            ),
            text("Ini baru perkenalan singkat — pembahasan strategi reading penuh ada di **Modul 2**."),
          ],
        },
        {
          title: "Read the passage",
          blocks: [
            { type: "passage", passage: RANI },
            tip("Setiap kali menjawab, tunjuk **kalimat persisnya** yang menjadi bukti jawabanmu. Ini melatih kamu selalu kembali ke teks, bukan asal tebak."),
          ],
        },
      ],
      checkpoint: [
        pick("eac1-l5-c1", "What is the main idea of this passage?", ["Rani overcame her fear to join a competition.", "Rani is a great speaker.", "Rani's teacher is strict.", "Rani doesn't like English."], 0, "Rani pemalu, hampir tidak mendaftar, tapi akhirnya ikut dan rajin berlatih → mengatasi rasa takut.", { passageId: "eac1-rani" }),
        pick("eac1-l5-c2", "Why did Rani almost not sign up?", ["She was shy.", "She was busy.", "Her teacher forbade it.", "She didn't like the competition."], 0, "Baris 1: *Rani has always been shy about speaking English.*", { passageId: "eac1-rani" }),
        pick("eac1-l5-c3", "The word “encouraged” in line 3 is closest in meaning to…", ["motivated", "stopped", "ignored", "confused"], 0, "Kakaknya mendorong dia untuk mencoba → *encouraged* ≈ **motivated**.", { passageId: "eac1-rani" }),
        pick("eac1-l5-c4", "When does Rani practice now?", ["Every night after dinner", "Every morning before school", "Only on weekends", "During lunch break"], 0, "Baris 4: *she practices every night after dinner.*", { passageId: "eac1-rani" }),
        pick("eac1-l5-c5", "How does Rani feel at the end of the passage?", ["Nervous but proud", "Angry and tired", "Bored", "Disappointed"], 0, "Baris 5: *She still feels nervous, but she is proud…*", { passageId: "eac1-rani", hots: true }),
      ],
    },
    {
      id: "eac1-l6",
      skill: "vocabulary",
      title: "Homework: Vocabulary, Worksheet and Habits",
      summary: "15 motivation words, a 10-question worksheet (tenses and nouns), and a daily reading habit.",
      sections: [
        {
          title: "Vocabulary list",
          blocks: [
            vocab(
              [
                ["achieve", "mencapai", "target", "She worked hard to achieve her dream."],
                ["confident", "percaya diri", "thumbs-up", "He feels confident before the test."],
                ["encourage", "menyemangati, mendorong", "owl-cheer", "My sister encouraged me to join."],
                ["challenge", "tantangan", "mountain", "The final round is a big challenge."],
                ["improve", "meningkatkan, membaik", "report", "My reading score improved this month."],
                ["focus", "fokus", "magnifier", "Focus on Part A first."],
                ["ambitious", "berambisi", "trophy", "She is ambitious and wants to win."],
                ["struggle", "berjuang, kesulitan", "feel-tired", "I struggled with tenses at first."],
                ["consistent", "konsisten", "calendar", "Consistent practice beats talent."],
                ["opportunity", "kesempatan", "flag", "The Olympiad is a great opportunity."],
                ["determination", "tekad", "run", "Her determination helped her finish."],
                ["progress", "kemajuan", "sprout", "I can see my progress every week."],
                ["effort", "usaha", "hit-books", "Your effort will pay off."],
                ["motivate", "memotivasi", "lightbulb", "Good results motivate me."],
                ["overcome", "mengatasi", "podium", "Rani overcame her fear."],
              ],
              "Memorise each word + write one example sentence"
            ),
            writing({
              id: "eac1-l6-vocab",
              title: "15 words, 15 sentences",
              prompt: "Write **one sentence for each of the 15 words** above. Try to write about your own life and your Olympiad journey.",
              image: "flashcards",
              minWords: 60,
              tips: ["Use different tenses: I achieved…, I am improving…, I usually focus…", "One idea per sentence is enough."],
              models: [
                { label: "Examples", text: "I want to achieve a top score in Part A. I feel more confident after every practice. My teacher encourages me to read every day. The Preliminary Round is my first challenge." },
              ],
              rubric: ["All 15 words are used.", "Each sentence is grammatically correct.", "The meaning of each word is clear from the sentence."],
            }),
          ],
        },
        {
          title: "Daily habit and study tips",
          blocks: [
            tip("**Kebiasaan harian (5–10 menit/hari):** baca 1 paragraf pendek bahasa Inggris (berita ringan/cerita anak), lalu catat kata baru."),
            text(
              "- Level dasar butuh **pengulangan**, bukan materi baru terus. Kalau di Sesi 2 masih banyak salah di tenses, ulangi dulu sebelum lanjut.\n- Jangan buru-buru ke Bagian D (HOTS) sebelum Bagian A solid — fondasi lemah bikin HOTS makin susah.\n- Kerjakan latihan **tanpa melihat kunci** dulu (simulasikan tekanan ujian). Untuk soal yang salah, jelaskan ulang alasannya **dengan kata-katamu sendiri** — itu tanda kamu benar-benar paham, bukan sekadar hafal jawaban."
            ),
          ],
        },
        {
          title: "Worksheet: tenses and nouns",
          blocks: [text("Checkpoint lesson ini adalah **worksheet 10 soal**: 5 soal tenses campuran + 5 soal countable/uncountable. Kerjakan mandiri sebelum Sesi 2.")],
        },
      ],
      checkpoint: [
        pick("eac1-l6-c1", "My brother ___ football every Saturday.", ["plays", "play", "playing", "played"], 0, "Kebiasaan + subjek he → **plays**.", { image: "football" }),
        pick("eac1-l6-c2", "They ___ their grandparents two days ago.", ["visited", "visit", "visits", "are visiting"], 0, "*Two days ago* → simple past **visited**."),
        pick("eac1-l6-c3", "Look! The teacher ___ to the principal.", ["is talking", "talks", "talked", "talk"], 0, "*Look!* → present continuous."),
        pick("eac1-l6-c4", "Rina usually ___ the bus, but today she ___ to school.", ["takes / is walking", "take / walks", "took / walk", "is taking / walked"], 0, "*Usually* → simple present (takes); *today* (sementara, sekarang) → present continuous (is walking).", { hots: true }),
        pick("eac1-l6-c5", "We ___ our science project last night.", ["finished", "finish", "finishes", "are finishing"], 0, "*Last night* → simple past."),
        pick("eac1-l6-c6", "How ___ homework do you have tonight?", ["much", "many", "few", "a few"], 0, "*Homework* uncountable → **much**."),
        pick("eac1-l6-c7", "There are ___ apples in the basket.", ["a few", "a little", "much", "little"], 0, "*Apples* countable jamak → **a few**.", { image: "apple*3" }),
        pick("eac1-l6-c8", "The new office needs some ___.", ["equipment", "equipments", "an equipment", "equipmentes"], 0, "*Equipment* uncountable, tanpa -s dan tanpa *an*."),
        pick("eac1-l6-c9", "I bought two ___ of bread.", ["loaves", "breads", "bread", "loafs"], 0, "*Bread* uncountable → dihitung dengan *loaf → loaves* (f → ves).", { image: "bread*2" }),
        pick("eac1-l6-c10", "There ___ a lot of furniture in the living room.", ["is", "are", "were", "be"], 0, "*Furniture* uncountable → verb tunggal **is**.", { image: "sofa" }),
      ],
    },
  ],
  quiz: {
    id: "eac1-quiz",
    title: "Part A Practice — 15 Questions + Challenge",
    passPercent: 70,
    questions: [
      pick("eac1-q1", "My sister has three ___.", ["children", "child", "childs", "childrens"], 0, "Bentuk jamak tidak beraturan: **children** (*childrens* salah — sudah jamak)."),
      pick("eac1-q2", "We need some ___ before we start the project.", ["information", "informations", "informative", "inform"], 0, "*Information* uncountable, tidak ada bentuk jamak."),
      pick("eac1-q3", "Every morning, my father ___ coffee.", ["drinks", "drink", "drinking", "drank"], 0, "Simple present, subjek *my father* (he) → +s."),
      pick("eac1-q4", "Last year, they ___ to Bali for vacation.", ["went", "go", "goes", "going"], 0, "Simple past dari *go*; signal word *last year*."),
      pick("eac1-q5", "Please be quiet! The baby ___ now.", ["is sleeping", "sleep", "sleeps", "slept"], 0, "Sedang terjadi sekarang, signal *now*."),
      pick("eac1-q6", "There is not ___ sugar left in the jar.", ["much", "many", "few", "a few"], 0, "*Sugar* uncountable → **much**."),
      pick("eac1-q7", "She is a very ___ student; she always finishes her homework.", ["diligent", "diligence", "diligently", "diligentness"], 0, "Perlu adjective untuk menerangkan *student*."),
      pick("eac1-q8", "He speaks English ___.", ["fluently", "fluent", "fluency", "fluentness"], 0, "Perlu adverb untuk menerangkan verb *speaks*."),
      pick("eac1-q9", "I wanted to go out, ___ it started raining.", ["but", "and", "or", "because"], 0, "Kontras: ingin keluar, **tapi** hujan."),
      pick("eac1-q10", "The mice in the barn ate all the ___.", ["cheese", "cheeses", "a cheese", "the cheeses"], 0, "*Cheese* di sini uncountable, tanpa bentuk jamak."),
      pick("eac1-q11", "My brother ___ his homework right now.", ["is doing", "do", "does", "did"], 0, "Sedang terjadi sekarang (*right now*)."),
      pick("eac1-q12", "We stayed inside ___ the weather was terrible.", ["because", "although", "but", "or"], 0, "Memberi **alasan** → *because*."),
      pick("eac1-q13", "Choose the correct plural: one tooth, two ___.", ["teeth", "tooths", "toothes", "teeths"], 0, "Jamak tidak beraturan dari *tooth*.", { image: "tooth*2" }),
      pick("eac1-q14", "This bag is too heavy; I need ___ help.", ["some", "much", "many", "a few"], 0, "*Some* bisa dipakai untuk uncountable dalam kalimat positif umum. (*Much* biasanya untuk kalimat negatif/pertanyaan.)"),
      pick("eac1-q15", "The word “happiness” is a…", ["noun", "verb", "adjective", "adverb"], 0, "*Happiness* adalah kata benda abstrak (akhiran *-ness*)."),
      correctOne("eac1-q16", ["She always reads before bed.", "She always read before bed.", "She always reading before bed.", "She always is read before bed."], "Kebiasaan + subjek she → **reads**. Opsi lain salah bentuk verb."),
      findError("eac1-q17", "[A:Yesterday] my friends [B:give] me [C:some] good [D:advice].", "B", "gave", "*Yesterday* → simple past: *give* → **gave**. *Advice* uncountable sudah benar.", { hots: true }),
      pick("eac1-q18", "Which sentence uses “although” correctly?", ["Although she was tired, she finished her homework.", "Although she was tired, so she finished her homework.", "She was tired although.", "Although tired she finish her homework."], 0, "*Although* + klausa kontras, tanpa *so/but* di klausa kedua.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Session 1 Warm-up",
    seconds: 20,
    questions: [
      live("eac1-live1", "How many questions are in the Preliminary paper?", ["40", "20", "50", "100"], 0, "checklist"),
      live("eac1-live2", "A wrong answer gives you…", ["0 points", "−1 point", "−0.25 points", "half a point"], 0, "medal"),
      live("eac1-live3", "Tie-breaker order:", ["D → A → C", "A → B → C", "C → D → A", "B → A → D"], 0, "podium"),
      live("eac1-live4", "Plural of “mouse”:", ["mice", "mouses", "mices", "meese"], 0, "mouse"),
      live("eac1-live5", "Which noun is uncountable?", ["advice", "chair", "pencil", "student"], 0, "lightbulb"),
      live("eac1-live6", "She ___ to school every day.", ["goes", "go", "going", "gone"], 0, "school"),
      live("eac1-live7", "Look! They ___ football.", ["are playing", "play", "played", "plays"], 0, "football"),
      live("eac1-live8", "“Quickly” is a/an…", ["adverb", "adjective", "noun", "verb"], 0, "run"),
      live("eac1-live9", "I stayed home ___ it was raining.", ["because", "but", "or", "so"], 0, "rain"),
      live("eac1-live10", "Antonym of “difficult”:", ["simple", "hard", "tough", "complex"], 0, "thumbs-up"),
    ],
  },
};
