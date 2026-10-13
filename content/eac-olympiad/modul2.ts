import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, examples, fill, live, match, pick, pics, table, text, tip, tryIt, vocab, warn, writing } from "../kit";
import { correctOne, findError } from "./helpers";

// Modul 2 — Sesi 2: Part A continued (comparative & superlative,
// prepositions, relative clauses who/which, synonyms & antonyms) and an
// introduction to Part B Reading strategies.

const BUDI: Passage = {
  id: "eac2-budi",
  title: "Budi's flashcards",
  pic: "flashcards",
  lines: [
    "Budi used to think that joining an English competition was only for students who were already fluent.",
    "However, his English teacher told him that consistent practice matters more than natural talent.",
    "Motivated by this advice, Budi started studying vocabulary flashcards every morning before school.",
    "After several weeks, he noticed that reading English articles became less exhausting than before.",
    "His confidence grew, and he decided to register for the upcoming English Olympiad, believing that his hard work would eventually pay off.",
  ],
};

export const SESSION2: Level = {
  id: "eac2",
  title: "Session 2 — Comparisons, Prepositions & Reading Strategies",
  description:
    "Part A continued: comparative and superlative forms, prepositions of time, place and direction, relative clauses with who and which, synonyms and antonyms. Then Part B: skimming, scanning, main idea and context clues.",
  targetScore: "Part A + Part B",
  cover: ["podium", "magnifier", "open-book"],
  pretest: {
    id: "eac2-pre",
    title: "Review Quiz — Session 1",
    passPercent: 0,
    questions: [
      pick("eac2-pre1", "The plural of “man” is…", ["men", "mans", "mans's", "manes"], 0, "Jamak tidak beraturan: **men**."),
      pick("eac2-pre2", "My mother ___ dinner every evening.", ["cooks", "cook", "cooking", "cooked"], 0, "Kebiasaan + subjek she → **cooks**."),
      pick("eac2-pre3", "Yesterday, we ___ a movie together.", ["watched", "watch", "watches", "watching"], 0, "*Yesterday* → simple past."),
      pick("eac2-pre4", "Listen! The baby ___.", ["is crying", "cry", "cries", "cried"], 0, "*Listen!* → present continuous."),
      pick("eac2-pre5", "We need ___ furniture for the new house.", ["much", "many", "few", "a few"], 0, "*Furniture* uncountable → **much**."),
      pick("eac2-pre6", "I like tea, ___ my brother likes coffee.", ["but", "and", "so", "because"], 0, "Kontras dua kesukaan → **but**."),
      pick("eac2-pre7", "The word “quickly” is a/an…", ["adverb", "noun", "verb", "adjective"], 0, "Berakhiran *-ly*, menerangkan verb → **adverb**."),
      pick("eac2-pre8", "Choose the correct plural of “foot”.", ["feet", "foots", "footes", "feets"], 0, "Jamak tidak beraturan: **feet**."),
      pick("eac2-pre9", "She stayed up late ___ she had an exam the next day.", ["because", "and", "but", "or"], 0, "Ujian adalah **alasan** begadang."),
      pick("eac2-pre10", "He is ___ when he crosses the street.", ["careful", "care", "carefully", "carelessness"], 0, "Setelah *is* → **adjective**: careful."),
    ],
  },
  lessons: [
    {
      id: "eac2-l1",
      skill: "structure",
      title: "Comparative and Superlative",
      summary: "-er/-est, more/most, irregular forms, and the structures than, the …-est and as … as.",
      minutes: 20,
      sections: [
        {
          title: "Forming comparatives and superlatives",
          blocks: [
            pics([["giraffe", "tall → taller → the tallest"], ["elephant", "big → bigger → the biggest"]]),
            table(
              ["Adjective type", "Rule", "Examples"],
              [
                ["Pendek (1 suku kata)", "tambah **-er / -est**", "tall → taller → tallest"],
                ["Vokal pendek + 1 konsonan", "konsonan **dobel**", "big → bigger → biggest"],
                ["Berakhiran -e", "cukup tambah **-r / -st**", "nice → nicer → nicest"],
                ["Berakhiran -y (2 suku kata)", "ganti **y → i**, tambah -er/-est", "happy → happier → happiest, easy → easier → easiest"],
                ["Panjang (2+ suku kata)", "pakai **more / most**", "beautiful → more beautiful → most beautiful, difficult → more difficult → most difficult"],
              ]
            ),
          ],
        },
        {
          title: "Irregular forms",
          blocks: [
            table(
              ["Base", "Comparative", "Superlative"],
              [
                ["good", "better", "best"],
                ["bad", "worse", "worst"],
                ["far", "farther / further", "farthest / furthest"],
                ["little", "less", "least"],
                ["many / much", "more", "most"],
              ]
            ),
            warn("Tidak ada *gooder, goodest, badder, more good*. Bentuk tidak beraturan **wajib hafal** — sering jadi jebakan!"),
            tryIt(pick("eac2-l1-try1", "This is the ___ movie I have ever watched.", ["best", "good", "better", "goodest"], 0, "*The* + superlative dari *good* → **best**.", { image: "tv" })),
          ],
        },
        {
          title: "Three structures",
          blocks: [
            table(
              ["Structure", "Pattern", "Example"],
              [
                ["Comparative", "adjective-er / more … + **than**", "She is taller than her brother."],
                ["Superlative", "**the** + adjective-est / most …", "She is the tallest in her class."],
                ["Equality", "**as** + adjective + **as**", "This bag is as heavy as that one."],
              ]
            ),
            examples(
              [
                { wrong: "She is more taller than her cousin.", right: "She is taller than her cousin.", note: "Jangan dobel: *more* + *-er*." },
                { wrong: "He is the most smart student.", right: "He is the smartest student.", note: "Kata pendek → -est, bukan most." },
                { wrong: "This box is as heavy than that one.", right: "This box is as heavy as that one.", note: "as … **as**, bukan as … than." },
              ]
            ),
            tryIt(fill("eac2-l1-try2", "Type the comparative of “happy”.", "I feel", "than yesterday.", ["happier"], "-y → **i** + er: happier.", { image: "happy" })),
          ],
        },
      ],
      checkpoint: [
        pick("eac2-l1-c1", "This bag is ___ than that one.", ["heavier", "heavy", "heaviest", "more heavy"], 0, "Comparative + *than*; heavy → heav**ier**."),
        pick("eac2-l1-c2", "She is the ___ student in our class.", ["smartest", "smart", "smarter", "more smart"], 0, "*The* + superlative."),
        fill("eac2-l1-c3", "Type the superlative of “big”.", "Jakarta is the", "city in Indonesia.", ["biggest"], "Vokal pendek + 1 konsonan → konsonan dobel: **biggest**."),
        pick("eac2-l1-c4", "My score this month is ___ than last month.", ["worse", "bad", "worst", "more bad"], 0, "Comparative tidak beraturan dari *bad* → **worse**."),
        match("eac2-l1-c5", "Match each adjective with its superlative.", [["good", "the best"], ["bad", "the worst"], ["little", "the least"], ["beautiful", "the most beautiful"]], "Irregular: best, worst, least; kata panjang pakai *most*."),
        correctOne("eac2-l1-c6", ["This test is as easy as the last one.", "This test is as easy than the last one.", "This test is as easier as the last one.", "This test is more easy as the last one."], "Pola kesetaraan: **as + adjective dasar + as**."),
      ],
    },
    {
      id: "eac2-l2",
      skill: "structure",
      title: "Prepositions of Time, Place and Direction",
      summary: "in / on / at for time and place, and to / into / from / out of for direction.",
      minutes: 20,
      sections: [
        {
          title: "Time",
          blocks: [
            table(
              ["Preposition", "Used for", "Examples"],
              [
                ["in", "bulan, tahun, musim, bagian hari", "in July, in 2026, in summer, in the morning"],
                ["on", "hari, tanggal", "on Monday, on July 5th"],
                ["at", "jam spesifik", "at 7 o'clock, at noon"],
              ]
            ),
            pics([["calendar", "on Monday"], ["clock", "at 7 o'clock"], ["night", "at night"]]),
            warn("Pengecualian penting: **at night** (bukan *in the night*)."),
            tryIt(pick("eac2-l2-try1", "She was born ___ 2010.", ["in", "on", "at", "to"], 0, "Tahun → **in**.")),
          ],
        },
        {
          title: "Place",
          blocks: [
            pics([["in", "in"], ["on", "on"], ["under", "under"], ["next-to", "next to"]], "Where is the cat?"),
            table(
              ["Preposition", "Used for", "Examples"],
              [
                ["in", "ruang tertutup / area besar", "in the room, in Jakarta"],
                ["on", "permukaan", "on the table, on the wall"],
                ["at", "titik spesifik", "at the door, at the bus stop"],
              ]
            ),
            tryIt(pick("eac2-l2-try2", "The keys are ___ the table.", ["on", "in", "at", "into"], 0, "Di atas permukaan meja → **on**.", { image: "desk" })),
          ],
        },
        {
          title: "Direction",
          blocks: [
            table(
              ["Preposition", "Meaning", "Example"],
              [
                ["to", "tujuan", "We walked to the park."],
                ["into", "masuk ke dalam", "He walked into the classroom and sat down."],
                ["from", "asal", "She comes from Pontianak."],
                ["out of", "keluar dari", "The cat jumped out of the box."],
              ]
            ),
            examples([
              { wrong: "He walked in the classroom and sat down.", right: "He walked into the classroom and sat down.", note: "Ada **gerakan masuk** → *into*." },
              { wrong: "We usually have breakfast on 6 o'clock.", right: "We usually have breakfast at 6 o'clock.", note: "Jam spesifik → *at*." },
            ]),
          ],
        },
      ],
      checkpoint: [
        pick("eac2-l2-c1", "The meeting will be held ___ Monday morning.", ["on", "in", "at", "to"], 0, "Hari (Monday) → **on**."),
        pick("eac2-l2-c2", "We usually have breakfast ___ 6 o'clock.", ["at", "in", "on", "to"], 0, "Jam spesifik → **at**.", { image: "time-6" }),
        pick("eac2-l2-c3", "He walked ___ the classroom and sat down.", ["into", "in", "on", "at"], 0, "Gerakan masuk ke dalam ruangan → **into**."),
        pick("eac2-l2-c4", "We will meet ___ the school gate.", ["at", "in", "on", "to"], 0, "Titik spesifik → **at**.", { image: "school" }),
        match("eac2-l2-c5", "Match each time expression with its preposition.", [["July", "in"], ["Friday", "on"], ["noon", "at"]], "Bulan → in; hari → on; jam/titik waktu → at."),
        fill("eac2-l2-c6", "Type the missing preposition.", "I can't sleep well", "night.", ["at"], "Pengecualian: **at night**."),
        pick("eac2-l2-c7", "Which sentence uses prepositions correctly?", ["I arrived in Jakarta on Monday at 9 PM.", "I arrived at Jakarta in Monday on 9 PM.", "I arrived on Jakarta at Monday in 9 PM.", "I arrived in Jakarta at Monday on 9 PM."], 0, "Kota → in; hari → on; jam → at.", { hots: true }),
      ],
    },
    {
      id: "eac2-l3",
      skill: "structure",
      title: "Relative Clauses: who and which",
      summary: "Join two sentences into one: who for people, which for things and animals.",
      minutes: 10,
      sections: [
        {
          title: "who and which",
          blocks: [
            text("**Relative clause** menggabungkan 2 kalimat jadi 1, memberi info tambahan tentang noun sebelumnya."),
            table(
              ["Pronoun", "For", "Example"],
              [
                ["who", "orang", "The student **who** studies hard will succeed."],
                ["which", "benda / hewan", "The book **which** is on the table is mine."],
              ]
            ),
            pics([["girl", "who → people"], ["book", "which → things"], ["cat", "which → animals"]]),
            tip("*That* akan dibahas lebih dalam di Modul 3 — untuk sekarang cukup kenal pola **who / which**."),
          ],
        },
        {
          title: "Joining sentences",
          blocks: [
            examples([
              { wrong: "I know a girl. She won the competition.", right: "I know a girl who won the competition.", note: "*She* (orang) diganti **who**." },
              { wrong: "This is the pen. I bought it yesterday.", right: "This is the pen which I bought yesterday.", note: "*It* (benda) diganti **which** dan pindah ke depan klausa." },
            ], "Two sentences → one"),
            tryIt(arrange("eac2-l3-try1", "Join the two sentences: “I know a girl. She won the competition.” Put the words in order.", "I know a girl who won the competition", "*Who* menggantikan *she* dan menempel langsung setelah *a girl*.")),
          ],
        },
      ],
      checkpoint: [
        pick("eac2-l3-c1", "The student ___ won first place studies every day.", ["who", "which", "whose", "whom"], 0, "Untuk orang (the student) sebagai subjek klausa → **who**."),
        pick("eac2-l3-c2", "This is the book ___ I borrowed from the library.", ["which", "who", "whom", "whose"], 0, "Untuk benda (the book) → **which**.", { image: "library" }),
        pick("eac2-l3-c3", "The girl ___ is wearing a red dress is my sister.", ["who", "which", "whom", "whose"], 0, "Orang → **who**.", { image: "dress" }),
        pick("eac2-l3-c4", "The cat ___ sleeps on my bed is very lazy.", ["which", "who", "whose", "whom"], 0, "Hewan → **which**.", { image: "cat" }),
        arrange("eac2-l3-c5", "Join: “This is the pen. I bought it yesterday.” Put the words in order.", "This is the pen which I bought yesterday", "*Which* menggantikan *it* dan klausa menempel setelah *the pen*.", { hots: true }),
        findError("eac2-l3-c6", "The [A:teacher] [B:which] [C:teaches] us English [D:is] very kind.", "B", "who", "*Teacher* adalah orang → **who**, bukan which.", { hots: true }),
      ],
    },
    {
      id: "eac2-l4",
      skill: "vocabulary",
      title: "Synonyms and Antonyms",
      summary: "How synonym and antonym questions work, and word pairs worth knowing.",
      minutes: 10,
      sections: [
        {
          title: "Synonym and antonym questions",
          blocks: [
            text("Soal Bagian A sering berbentuk *Choose the synonym of …* (makna mirip) atau *Choose the antonym of …* (lawan kata)."),
            warn("Jebakan klasik: opsi **antonim** muncul di soal sinonim, dan sebaliknya. Baca dulu: soal minta *synonym* atau *antonym*?"),
            tip("Awalan **un- / in- / dis- / im-** sering membentuk antonim: *happy → unhappy, correct → incorrect, agree → disagree, possible → impossible*."),
          ],
        },
        {
          title: "Word pairs",
          blocks: [
            table(
              ["Word", "Synonym", "Antonym"],
              [
                ["difficult", "challenging, hard", "easy, simple"],
                ["increase", "rise, grow", "decrease, fall"],
                ["happy", "joyful, glad", "sad, unhappy"],
                ["enormous", "huge, giant", "tiny, small"],
                ["generous", "kind, giving", "selfish, stingy"],
                ["ancient", "old", "modern"],
                ["victory", "win, triumph", "defeat"],
                ["assist", "help", "prevent, hinder"],
              ]
            ),
            vocab([
              ["enormous", "sangat besar", "elephant"],
              ["tiny", "sangat kecil", "mouse"],
              ["increase", "naik, bertambah", "report"],
              ["decrease", "turun, berkurang", "download"],
            ]),
          ],
        },
      ],
      checkpoint: [
        pick("eac2-l4-c1", "Choose the synonym of “difficult”.", ["challenging", "easy", "simple", "boring"], 0, "*Challenging* bermakna serupa dengan *difficult*."),
        pick("eac2-l4-c2", "Choose the antonym of “increase”.", ["decrease", "rise", "grow", "expand"], 0, "Lawan *increase* adalah **decrease**. *Rise, grow, expand* justru sinonimnya."),
        match("eac2-l4-c3", "Match each word with its antonym.", [["generous", "selfish"], ["ancient", "modern"], ["victory", "defeat"], ["enormous", "tiny"]], "Pasangan lawan kata."),
        pick("eac2-l4-c4", "Choose the synonym of “enormous”.", ["huge", "tiny", "quiet", "simple"], 0, "*Enormous* = sangat besar ≈ **huge**.", { image: "elephant" }),
        pick("eac2-l4-c5", "Which prefix makes the antonym of “possible”?", ["im-", "un-", "dis-", "in-"], 0, "**impossible**."),
        pick("eac2-l4-c6", "“The test was not easy at all; it was really ___.” Which word fits best?", ["challenging", "simple", "relaxing", "short"], 0, "Konteks *not easy* → **challenging**.", { hots: true }),
      ],
    },
    {
      id: "eac2-l5",
      skill: "reading",
      title: "Part B: Four Reading Strategies",
      summary: "Skimming, scanning, main idea and context clues — practised on Budi's story.",
      minutes: 25,
      passages: [BUDI],
      sections: [
        {
          title: "Four basic strategies",
          blocks: [
            table(
              ["Strategy", "How", "Use it for"],
              [
                ["1. Skimming", "baca cepat untuk tangkap gambaran umum, jangan kata per kata", "main idea, kesimpulan"],
                ["2. Scanning", "cari info spesifik (nama, angka, tanggal) tanpa baca semua paragraf", "detail questions"],
                ["3. Main idea", "biasanya di kalimat **pertama** atau **terakhir** paragraf", "What is the passage mainly about?"],
                ["4. Context clues", "tebak makna kata asing dari kalimat sebelum/sesudahnya, bukan dari kamus dulu", "vocabulary questions"],
              ]
            ),
            pics([["magnifier", "scanning"], ["open-book", "skimming"], ["lightbulb", "context clues"]]),
          ],
        },
        {
          title: "Practice passage",
          blocks: [
            text("Baca passage berikut (**5 menit**), lalu jawab checkpoint **tanpa membaca ulang seluruh teks** — kembali hanya ke kalimat yang kamu butuhkan."),
            { type: "passage", passage: BUDI },
            tip("Untuk tiap jawaban, tunjuk **kalimat persisnya** yang jadi bukti. Ini melatih kamu untuk selalu kembali ke teks, bukan asal tebak."),
          ],
        },
      ],
      checkpoint: [
        pick("eac2-l5-c1", "What is the main idea of the passage?", ["Consistent practice helped Budi improve and gain confidence.", "Budi is naturally talented at English.", "Budi's teacher discouraged him from competing.", "Budi decided not to join the competition."], 0, "Seluruh teks bercerita tentang latihan konsisten → kemajuan → percaya diri.", { passageId: "eac2-budi" }),
        pick("eac2-l5-c2", "Why did Budi start studying vocabulary flashcards?", ["He was motivated by his teacher's advice.", "His friend asked him to.", "He was forced by his parents.", "He wanted to skip class."], 0, "Baris 3: *Motivated by this advice…*", { passageId: "eac2-budi" }),
        pick("eac2-l5-c3", "The word “exhausting” in line 4 is closest in meaning to…", ["tiring", "exciting", "interesting", "confusing"], 0, "Context clue: membaca jadi *less exhausting* setelah berlatih → makin tidak melelahkan. *Exhausting* = **tiring**.", { passageId: "eac2-budi" }),
        pick("eac2-l5-c4", "What happened after Budi practiced for several weeks?", ["Reading became easier for him.", "He gave up.", "He stopped studying.", "He failed a test."], 0, "Baris 4: membaca artikel jadi tidak terlalu melelahkan → lebih mudah.", { passageId: "eac2-budi" }),
        pick("eac2-l5-c5", "Based on the passage, we can conclude that…", ["consistent effort can lead to improvement.", "talent matters more than practice.", "Budi never intended to compete.", "Budi's teacher was unhelpful."], 0, "Kesimpulan tersirat dari seluruh cerita.", { passageId: "eac2-budi", hots: true }),
      ],
    },
    {
      id: "eac2-l6",
      skill: "vocabulary",
      title: "Homework and Progress Check",
      summary: "10 new words, a make-your-own-questions worksheet, a daily main-idea habit and a checklist before Session 3.",
      sections: [
        {
          title: "New vocabulary",
          blocks: [
            vocab(
              [
                ["compare", "membandingkan", "podium", "Compare the two passages."],
                ["similar", "mirip", "cat-white", "Your answer is similar to mine."],
                ["various", "beragam", "palette", "We read various texts."],
                ["essential", "sangat penting", "heart", "Sleep is essential before an exam."],
                ["significant", "signifikan, berarti", "report", "My score showed a significant increase."],
                ["improve", "meningkatkan", "sprout", "I want to improve my reading."],
                ["achievement", "pencapaian", "trophy", "Passing the Preliminary is a big achievement."],
                ["practical", "praktis", "checklist", "This is a practical tip."],
                ["particular", "khusus, tertentu", "pin", "Focus on one particular topic."],
                ["demonstrate", "menunjukkan", "debate", "She demonstrated her skills."],
              ],
              "Memorise each word + write a sentence"
            ),
          ],
        },
        {
          title: "Make your own questions",
          blocks: [
            text("Teknik ini melatih pemahaman lebih dalam daripada cuma mengerjakan soal orang lain: **kamu yang membuat soalnya**, lalu minta guru/kakak mengecek."),
            writing({
              id: "eac2-l6-task",
              title: "Be the question writer",
              prompt: "Write **5 comparative/superlative questions** and **5 preposition questions** in the Olympiad style (a sentence with a blank and four options). Add the answer key and a one-line reason for each.",
              image: "puzzle",
              minWords: 80,
              tips: ["Use one correct option and three tempting traps.", "Mix in, on and at in your preposition questions.", "Include at least one irregular form (good, bad, far)."],
              models: [
                { label: "Example 1", text: "My new phone is ___ than my old one. (good / better / best / more good) Key: better — comparative of good, followed by than." },
                { label: "Example 2", text: "The exam starts ___ 8 o'clock. (in / on / at / to) Key: at — a specific time." },
              ],
              rubric: ["There are 10 questions with four options each.", "Every question has exactly one correct answer.", "Every answer key has a short reason."],
            }),
            tip("**Kebiasaan harian:** baca 1 passage pendek bahasa Inggris per hari, lalu tulis **main idea**-nya dalam 1 kalimat."),
          ],
        },
        {
          title: "Progress check before Session 3",
          blocks: [
            text("Pastikan kamu sudah nyaman dengan:\n\n- ☐ Tenses dasar (present / past / continuous) — Sesi 1\n- ☐ Countable / uncountable nouns — Sesi 1\n- ☐ Comparative / superlative — Sesi 2\n- ☐ Preposisi dasar — Sesi 2\n- ☐ Skimming / scanning untuk main idea — Sesi 2"),
            tip("Kalau masih ada yang bolong, gunakan 15–20 menit awal Sesi 3 untuk *quick refresh* sebelum masuk materi baru. Sesi 3 akan fokus ke Bagian C, D, dan **mock test 60 menit**."),
          ],
        },
      ],
      checkpoint: [
        pick("eac2-l6-c1", "“Sleep is ___ before an exam.” (very important)", ["essential", "various", "similar", "practical"], 0, "*Essential* = sangat penting."),
        pick("eac2-l6-c2", "“Your answer is ___ to mine.” (almost the same)", ["similar", "significant", "particular", "essential"], 0, "*Similar to* = mirip dengan."),
        pick("eac2-l6-c3", "“We read ___ texts: stories, news and letters.” (many different kinds)", ["various", "similar", "particular", "practical"], 0, "*Various* = beragam."),
        pick("eac2-l6-c4", "“Winning the regional round was a great ___.”", ["achievement", "achieve", "achieved", "achieving"], 0, "Setelah *a great* → noun: **achievement**."),
        match("eac2-l6-c5", "Match each word with its meaning.", [["compare", "look at differences and similarities"], ["demonstrate", "show clearly"], ["improve", "make better"], ["particular", "specific"]], "Arti kosakata baru.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "eac2-quiz",
    title: "Part A Combined Practice — 15 Questions + Challenge",
    passPercent: 70,
    questions: [
      pick("eac2-q1", "This bag is ___ than that one.", ["heavier", "heavy", "heaviest", "more heavy"], 0, "Comparative, diikuti *than*."),
      pick("eac2-q2", "She is the ___ student in our class.", ["smartest", "smart", "smarter", "more smart"], 0, "Superlative, pakai *the*."),
      pick("eac2-q3", "Jakarta is ___ than Bandung in terms of population.", ["bigger", "big", "biggest", "more big"], 0, "Comparative kata pendek + -er (konsonan dobel)."),
      pick("eac2-q4", "This is the ___ movie I have ever watched.", ["best", "good", "better", "goodest"], 0, "Superlative tidak beraturan dari *good*."),
      pick("eac2-q5", "My score this month is ___ than last month.", ["worse", "bad", "worst", "more bad"], 0, "Comparative tidak beraturan dari *bad*."),
      pick("eac2-q6", "The meeting will be held ___ Monday morning.", ["on", "in", "at", "to"], 0, "Hari pakai **on**."),
      pick("eac2-q7", "We usually have breakfast ___ 6 o'clock.", ["at", "in", "on", "to"], 0, "Jam spesifik pakai **at**."),
      pick("eac2-q8", "She was born ___ 2010.", ["in", "on", "at", "to"], 0, "Tahun pakai **in**."),
      pick("eac2-q9", "The keys are ___ the table.", ["on", "in", "at", "into"], 0, "Permukaan meja → **on**."),
      pick("eac2-q10", "He walked ___ the classroom and sat down.", ["into", "in", "on", "at"], 0, "Gerakan masuk ke dalam ruangan → **into**."),
      pick("eac2-q11", "The student ___ won first place studies every day.", ["who", "which", "whose", "whom"], 0, "Untuk orang (the student)."),
      pick("eac2-q12", "This is the book ___ I borrowed from the library.", ["which", "who", "whom", "whose"], 0, "Untuk benda (the book)."),
      pick("eac2-q13", "Choose the synonym of “difficult”.", ["challenging", "easy", "simple", "boring"], 0, "Makna serupa dengan *difficult*."),
      pick("eac2-q14", "Choose the antonym of “increase”.", ["decrease", "rise", "grow", "expand"], 0, "Lawan kata dari *increase*."),
      pick("eac2-q15", "Every Sunday, my family ___ to the market.", ["goes", "go", "going", "went"], 0, "Simple present, subjek tunggal (*my family*) + -es."),
      correctOne("eac2-q16", ["Rina is the tallest girl in her class.", "Rina is the most tall girl in her class.", "Rina is taller girl in her class.", "Rina is the tallest girl on her class."], "Superlative kata pendek: **the tallest**; kelas → **in** her class."),
      findError("eac2-q17", "My house is [A:farther] from school [B:than] yours, but it is [C:more nearer] [D:to] the market.", "C", "nearer", "Jangan dobel *more* + *-er*: cukup **nearer**.", { hots: true }),
      pick("eac2-q18", "Read: “Andi is taller than Budi. Citra is taller than Andi.” Who is the tallest?", ["Citra", "Andi", "Budi", "They are as tall as each other."], 0, "Citra > Andi > Budi → **Citra** paling tinggi.", { hots: true, image: "giraffe" }),
    ],
  },
  live: {
    title: "Live Quiz — Session 2 Showdown",
    seconds: 20,
    questions: [
      live("eac2-live1", "good → better → ___", ["best", "goodest", "bestest", "most good"], 0, "trophy"),
      live("eac2-live2", "bad → ___ → worst", ["worse", "badder", "worst", "more bad"], 0, "sad"),
      live("eac2-live3", "happy → ___", ["happier", "happyer", "more happy", "happiest"], 0, "happy"),
      live("eac2-live4", "___ Monday", ["on", "in", "at", "to"], 0, "calendar"),
      live("eac2-live5", "___ night", ["at", "in", "on", "to"], 0, "night"),
      live("eac2-live6", "___ 2026", ["in", "on", "at", "to"], 0, "fireworks"),
      live("eac2-live7", "The girl ___ won is my friend.", ["who", "which", "whose", "whom"], 0, "girl"),
      live("eac2-live8", "Synonym of “enormous”:", ["huge", "tiny", "quiet", "fast"], 0, "elephant"),
      live("eac2-live9", "Antonym of “increase”:", ["decrease", "grow", "rise", "expand"], 0, "report"),
      live("eac2-live10", "Find info like names and numbers fast:", ["scanning", "skimming", "guessing", "translating"], 0, "magnifier"),
    ],
  },
};
