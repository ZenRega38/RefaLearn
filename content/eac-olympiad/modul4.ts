import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { examples, fill, live, match, pick, pics, table, text, tip, tryIt, vocab, warn, writing } from "../kit";
import { correctOne, findError, SCORE_FORMULA } from "./helpers";

// Modul 4 — Sesi 4: Regional Round level. Evaluate results, present perfect
// and past perfect, advanced multi-error analysis, idioms and figurative
// language, an advanced reading passage and academic vocabulary.

const SARAH: Passage = {
  id: "eac4-sarah",
  title: "Sarah and the debate club",
  pic: "debate",
  lines: [
    "When Sarah first joined the debate club, she felt like a fish out of water during public speaking sessions.",
    "Her hands would shake every time she stood in front of an audience.",
    "Her coach told her that practice makes perfect, and encouraged her to hit the books on argumentation techniques every night.",
    "Slowly but surely, Sarah's confidence grew.",
    "By the end of the semester, she had already won two regional debate competitions.",
    "Her journey proves that even the most nervous beginners can become confident speakers if they are willing to put in consistent effort.",
  ],
};

export const SESSION4: Level = {
  id: "eac4",
  title: "Session 4 — Regional Round: Perfect Tenses, Advanced HOTS & Academic Vocabulary",
  description:
    "Evaluate your Preliminary or mock-test results, master the present perfect and past perfect, sharpen multi-error analysis for Part D, learn idioms and figurative language for Part B, read an advanced passage and build academic vocabulary.",
  targetScore: "Regional Round",
  cover: ["podium", "timeline-perfect", "debate"],
  pretest: {
    id: "eac4-pre",
    title: "Warm-up Check — Modules 1–3",
    passPercent: 0,
    questions: [
      pick("eac4-pre1", "She ___ this movie three times.", ["has seen", "saw", "see", "seeing"], 0, "Pengalaman tanpa waktu spesifik → present perfect."),
      pick("eac4-pre2", "The window ___ by the ball yesterday.", ["was broken", "broke", "is broken", "breaks"], 0, "Pasif past: was + V3."),
      pick("eac4-pre3", "He is responsible ___ the school event.", ["for", "of", "to", "at"], 0, "responsible **for**."),
      pick("eac4-pre4", "“A piece of cake” means…", ["very easy", "very sweet", "very expensive", "very small"], 0, "Idiom: sangat mudah."),
      correctOne("eac4-pre5", ["Each of the students has a dictionary.", "Each of the students have a dictionary.", "Each of the student has a dictionary.", "Each students has a dictionary."], "*Each of the* + noun jamak + verb tunggal."),
      pick("eac4-pre6", "The boy ___ won the race is my cousin.", ["who", "which", "whose", "where"], 0, "Orang → **who** (atau that)."),
      pick("eac4-pre7", "I have lived here ___ 2019.", ["since", "for", "ago", "during"], 0, "Titik waktu → **since**."),
      pick("eac4-pre8", "“The classroom was a zoo” is an example of…", ["metaphor", "simile", "personification", "an idiom"], 0, "Perbandingan langsung tanpa like/as."),
    ],
  },
  lessons: [
    {
      id: "eac4-l1",
      skill: "reading",
      title: "Evaluate Your Results",
      summary: "Turn your Preliminary or mock-test score into a clear study priority for the Regional Round.",
      minutes: 15,
      sections: [
        {
          title: "Fill in your table",
          blocks: [
            pics([["report", "score per part"], ["target", "set your priority"]]),
            text("Isi tabel ini pakai **skor Preliminary** (kalau sudah keluar) atau skor **mock test Modul 3**:"),
            table(
              ["Part", "Your score", "Max", "Percentage", "Priority?"],
              [
                ["A. Words & Structure", "", "35", "", ""],
                ["B. Reading", "", "27", "", ""],
                ["C. Spoken & Written Expression", "", "16", "", ""],
                ["D. HOTS", "", "22", "", ""],
              ]
            ),
            text("Belum punya skor per bagian? Hitung dari jumlah benar:"),
            table(SCORE_FORMULA.head, SCORE_FORMULA.rows),
          ],
        },
        {
          title: "How to read it",
          blocks: [
            text(
              "- **Persentase terendah** = prioritas latihan mandiri minggu ini.\n- Jangan abaikan **Bagian D** meski poinnya kelihatan kecil — ingat, ini prioritas **#1 kalau ada skor seri**.\n- Kalau **Bagian A sudah di atas 80%**, waktu belajar bisa mulai dialihkan lebih banyak ke B, C, dan D."
            ),
            tip("Modul ini disusun untuk **Regional Round** (November). Kalau kamu belum lolos Preliminary, materi di sini (perfect tenses, HOTS lanjutan, vocab akademik) tetap berguna sebagai peningkatan level umum — minta gurumu menyusun modul remedial yang fokus ke fondasi kalau perlu."),
            writing({
              id: "eac4-l1-plan",
              title: "My priority plan",
              prompt: "Write your score for each part (A, B, C, D) as a percentage. Then name your **lowest part** and write **three things** you will do this week to improve it.",
              image: "target",
              minWords: 30,
              tips: ["Example: A 85%, B 81%, C 100%, D 60%", "Be specific: “10 unscrambling questions every day”, not just “study more”."],
              models: [
                { label: "Example", text: "A: 85%, B: 81%, C: 100%, D: 60%. My lowest part is D. This week I will (1) do five unscrambling questions every day, (2) test myself on 10 idiomatic prepositions each morning, and (3) use the STAPW checklist on every multi-error question." },
              ],
              rubric: ["All four parts have a percentage.", "The lowest part is named.", "There are three specific actions."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("eac4-l1-c1", "Your results: A 90%, B 70%, C 100%, D 60%. Which part should be your top priority this week?", ["Part D", "Part A", "Part C", "Part B"], 0, "D punya persentase terendah **dan** penentu #1 saat skor seri."),
        pick("eac4-l1-c2", "Part A is already above 80%. What should you do with your study time?", ["Move more time to Parts B, C and D.", "Stop studying completely.", "Spend all your time on Part A.", "Only read stories."], 0, "A sudah kuat → alihkan waktu ke bagian lain."),
        pick("eac4-l1-c3", "You answered 4 of 5 Part D questions correctly. What is your rough Part D score?", ["about 17.6", "about 4", "about 22", "about 8.8"], 0, "4 × 4,4 = **17,6** dari 22."),
        pick("eac4-l1-c4", "Which part decides a tie FIRST?", ["Part D", "Part A", "Part B", "Part C"], 0, "Urutan tie-breaker: D → A → C."),
        pick(
          "eac4-l1-c5",
          "Student X: A 18/20, D 2/5. Student Y: A 16/20, D 4/5. Who has the higher rough score from Parts A and D together?",
          ["Student Y", "Student X", "They are equal.", "It cannot be calculated."],
          0,
          "X: 18×1,75 + 2×4,4 = 31,5 + 8,8 = 40,3. Y: 16×1,75 + 4×4,4 = 28 + 17,6 = **45,6**. Soal D bernilai besar!",
          { hots: true }
        ),
      ],
    },
    {
      id: "eac4-l2",
      skill: "structure",
      title: "Present Perfect and Past Perfect",
      summary: "have/has + V3 for experience, unfinished time and recent actions; had + V3 for the earlier of two past actions.",
      minutes: 20,
      sections: [
        {
          title: "Present Perfect",
          blocks: [
            pics([["timeline", "past → still true now"]]),
            text("Formula: **S + have/has + V3** (past participle)"),
            table(
              ["Use", "Example"],
              [
                ["Pengalaman tanpa waktu spesifik", "I have visited Bali."],
                ["Aksi yang mulai di masa lalu dan masih berlanjut", "She has lived here for five years."],
                ["Aksi yang baru saja selesai", "He has just finished his homework."],
              ]
            ),
            text("Signal words: *already, just, yet, ever, never, since, for*"),
            tryIt(pick("eac4-l2-try1", "I have never ___ such a delicious cake before.", ["eaten", "eat", "ate", "eating"], 0, "have never + **V3** (eaten).", { image: "cake" })),
          ],
        },
        {
          title: "Present Perfect vs Simple Past",
          blocks: [
            table(
              ["Simple Past", "Present Perfect"],
              [
                ["Waktu spesifik disebutkan", "Waktu tidak spesifik / masih relevan sekarang"],
                ["I visited Bali last year.", "I have visited Bali."],
                ["She lived in Medan in 2018.", "She has lived here since 2020."],
              ]
            ),
            examples([
              { wrong: "I have visited Bali last year.", right: "I visited Bali last year.", note: "Ada waktu spesifik (*last year*) → simple past." },
              { wrong: "They live in this city since 2015.", right: "They have lived in this city since 2015.", note: "Mulai di masa lalu dan masih berlanjut → present perfect." },
            ]),
          ],
        },
        {
          title: "Past Perfect",
          blocks: [
            pics([["timeline-perfect", "had + V3 = the earlier action"]]),
            text("Formula: **S + had + V3**\n\nDipakai untuk aksi yang terjadi **sebelum** aksi lain di masa lalu.\n\n*By the time she arrived, the movie **had already started**.* → film mulai dulu (1st), lalu dia datang (2nd)."),
            tip("Penanda umum: **by the time**, **before**, **after**, **already** dalam cerita masa lalu."),
            tryIt(pick("eac4-l2-try2", "By the time we arrived, the train ___.", ["had left", "leave", "left", "has left"], 0, "Kereta pergi **sebelum** kami tiba → past perfect.", { image: "train" })),
          ],
        },
      ],
      checkpoint: [
        pick("eac4-l2-c1", "She ___ her homework already.", ["has finished", "finish", "finished", "finishing"], 0, "Aksi selesai tanpa waktu spesifik + *already* → present perfect."),
        pick("eac4-l2-c2", "By the time we arrived, the train ___.", ["had left", "leave", "left", "has left"], 0, "Aksi sebelum aksi lain di masa lalu → past perfect."),
        pick("eac4-l2-c3", "They ___ in this city since 2015.", ["have lived", "live", "lived", "has lived"], 0, "Mulai di masa lalu dan masih berlanjut (*since 2015*); subjek *they* → **have**."),
        fill("eac4-l2-c4", "Type the V3 of “write”.", "She has", "three short stories this year.", ["written"], "write → wrote → **written**."),
        pick("eac4-l2-c5", "Which sentence is correct?", ["I visited my grandmother yesterday.", "I have visited my grandmother yesterday.", "I have visit my grandmother yesterday.", "I had visit my grandmother yesterday."], 0, "*Yesterday* → simple past."),
        findError("eac4-l2-c6", "When I [A:got] to the cinema, the movie [B:has] already [C:started], so I [D:missed] the beginning.", "B", "had", "Film mulai **sebelum** saya tiba (masa lalu) → **had** started.", { hots: true }),
      ],
    },
    {
      id: "eac4-l3",
      skill: "structure",
      title: "Part D: Advanced Multi-Error Analysis",
      summary: "Find the mistake in every option — subject–verb agreement, verb form and auxiliaries — before choosing.",
      minutes: 15,
      sections: [
        {
          title: "The method",
          blocks: [
            pics([["magnifier", "find every mistake"]]),
            text("Format soal ini muncul di Bagian D: **4 pilihan kalimat, hanya 1 yang benar sepenuhnya** — sisanya punya kesalahan berbeda (verb form, subject–verb agreement, tense, dll). Tugasmu: **temukan kesalahan di TIAP opsi**, baru pilih yang benar."),
            examples(
              [
                { wrong: "She don't like spicy food.", note: "don't → doesn't untuk subjek *she*." },
                { wrong: "She doesn't likes spicy food.", note: "Setelah *doesn't* → V1 *like*." },
                { right: "She doesn't like spicy food." },
                { wrong: "She not like spicy food.", note: "Butuh auxiliary *doesn't*." },
              ],
              "Which sentence is grammatically correct?"
            ),
          ],
        },
        {
          title: "Three checks",
          blocks: [
            table(
              ["Check", "Ask yourself", "Trap"],
              [
                ["Subject–verb agreement", "Subjeknya tunggal atau jamak?", "He have / The students is"],
                ["Verb form (V1 / V2 / V3)", "Setelah auxiliary, bentuk apa yang dibutuhkan?", "has finish / doesn't likes / did went"],
                ["Auxiliary verb", "Ada auxiliary yang hilang atau dobel?", "She not like / He going"],
              ]
            ),
            warn("Jangan cuma cari yang *kedengarannya benar*. Cek satu-satu, lalu lengkapi dengan checklist **STAPW** dari Modul 3."),
            tryIt(correctOne("eac4-l3-try1", ["He has finished his project already.", "He have finished his project already.", "He has finish his project already.", "He finish his project already."], "has + V3; subjek he → **has**.")),
          ],
        },
      ],
      checkpoint: [
        correctOne("eac4-l3-c1", ["He has finished his project already.", "He have finished his project already.", "He has finish his project already.", "He finish his project already."], "Satu-satunya yang benar: **has + V3**."),
        correctOne("eac4-l3-c2", ["She doesn't like spicy food.", "She don't like spicy food.", "She doesn't likes spicy food.", "She not like spicy food."], "doesn't + V1."),
        correctOne("eac4-l3-c3", ["If I have time, I will call you.", "If I will have time, I will call you.", "If I have time, I call you.", "If I had time, I will call you."], "Conditional type 1: if + simple present, will + V1."),
        correctOne("eac4-l3-c4", ["The players have trained hard since June.", "The players has trained hard since June.", "The players have train hard since June.", "The players trains hard since June."], "Subjek jamak → **have** + V3 (trained)."),
        correctOne("eac4-l3-c5", ["Did you finish the test on time?", "Did you finished the test on time?", "Do you finished the test on time?", "Did you finishing the test on time?"], "Setelah *did* → V1."),
        findError("eac4-l3-c6", "Neither of my brothers [A:have] [B:ever] [C:been] [D:to] Kalimantan.", "A", "has", "*Neither of* + verb tunggal → **has**.", { hots: true }),
      ],
    },
    {
      id: "eac4-l4",
      skill: "reading",
      title: "Idioms and Figurative Language: Regional Level",
      summary: "More idioms for Part B reading and a deeper look at simile, metaphor and personification.",
      minutes: 15,
      sections: [
        {
          title: "Idioms in reading passages",
          blocks: [
            vocab(
              [
                ["break the ice", "memulai percakapan, mencairkan suasana", "ice-break", "She told a joke to break the ice."],
                ["a fish out of water", "merasa tidak nyaman di situasi baru", "fish-out", "I felt like a fish out of water on my first day."],
                ["a piece of cake", "sangat mudah", "cake-slice", "The quiz was a piece of cake."],
                ["once in a blue moon", "jarang sekali terjadi", "blue-moon", "We eat out once in a blue moon."],
                ["hit the books", "belajar dengan giat", "hit-books", "I have to hit the books tonight."],
                ["give up", "menyerah", "feel-tired", "Never give up on your dream."],
                ["raining cats and dogs", "hujan sangat deras", "cats-dogs-rain", "It's raining cats and dogs outside."],
              ],
              "Tap a card to hear it"
            ),
            warn("**Strategi di Bagian B:** kalau ketemu idiom/ungkapan asing, jangan diterjemahkan kata per kata — lihat konteks kalimat sekitarnya untuk menebak maknanya."),
          ],
        },
        {
          title: "Simile, metaphor, personification",
          blocks: [
            table(
              ["Type", "How it works", "Examples"],
              [
                ["**Simile**", "perbandingan pakai *like / as*", "as brave as a lion; as smooth as silk"],
                ["**Metaphor**", "perbandingan langsung tanpa *like / as*", "time is money; the classroom was a zoo"],
                ["**Personification**", "benda mati diberi sifat manusia", "the wind whispered; the stars winked"],
              ]
            ),
            pics([["lion", "as brave as a lion"], ["time-money", "time is money"], ["windy", "the wind whispered"]]),
            tryIt(match("eac4-l4-try1", "Match each example with its type.", [["as brave as a lion", "simile"], ["time is money", "metaphor"], ["the wind whispered", "personification"]], "Simile pakai *as/like*; metaphor langsung; personification = benda bersifat manusia.")),
          ],
        },
      ],
      checkpoint: [
        pick("eac4-l4-c1", "“It's raining cats and dogs” means…", ["it is raining very heavily", "it is raining lightly", "animals are falling", "it is sunny"], 0, "Idiom cuaca: hujan sangat deras.", { image: "cats-dogs-rain" }),
        pick("eac4-l4-c2", "The phrase “a fish out of water” means…", ["feeling out of place", "very happy", "very cold", "outside in the rain"], 0, "Merasa tidak nyaman di situasi baru.", { image: "fish-out" }),
        pick("eac4-l4-c3", "“Time is money” is an example of…", ["metaphor", "simile", "personification", "an idiom about banks"], 0, "Perbandingan langsung tanpa *like/as*."),
        pick("eac4-l4-c4", "“My cousin visits us once in a blue moon.” How often does the cousin visit?", ["very rarely", "every month", "every night", "never"], 0, "*Once in a blue moon* = jarang sekali.", { image: "blue-moon" }),
        pick("eac4-l4-c5", "At the start of the class, the teacher played a funny game to ___.", ["break the ice", "hit the books", "give up", "call it a day"], 0, "Mencairkan suasana → **break the ice**."),
        pick("eac4-l4-c6", "“The old house groaned in the storm.” What is the writer doing?", ["Giving the house a human action (personification)", "Comparing the house with like/as (simile)", "Using an idiom about money", "Describing a real person"], 0, "Rumah *mengerang* seperti manusia → personification.", { hots: true }),
      ],
    },
    {
      id: "eac4-l5",
      skill: "reading",
      title: "Advanced Reading: Sarah's Debate Journey",
      summary: "An advanced passage mixing idioms, inference and the main message.",
      minutes: 15,
      passages: [SARAH],
      sections: [
        {
          title: "Before you read",
          blocks: [
            pics([["debate", "debate club"], ["fish-out", "a fish out of water"], ["hit-books", "hit the books"]]),
            text("Passage ini memuat **idiom** (*a fish out of water, hit the books, slowly but surely*) dan **past perfect** (*had already won*). Baca sekali dengan **skimming** untuk main idea, lalu **scan** untuk detail."),
          ],
        },
        {
          title: "Read the passage",
          blocks: [{ type: "passage", passage: SARAH }, tip("Untuk soal makna idiom, baca kalimat **sebelum dan sesudahnya**: tangan Sarah gemetar (baris 2) → dia merasa tidak nyaman.")],
        },
      ],
      checkpoint: [
        pick("eac4-l5-c1", "What does “a fish out of water” mean in this context?", ["uncomfortable / out of place", "sick", "confused", "excited"], 0, "Baris 1–2: tangannya gemetar setiap berdiri di depan penonton → tidak nyaman.", { passageId: "eac4-sarah" }),
        pick("eac4-l5-c2", "What did Sarah's coach encourage her to do?", ["Study argumentation techniques regularly", "Join a swimming club", "Quit the debate club", "Speak less"], 0, "Baris 3: *hit the books on argumentation techniques every night.*", { passageId: "eac4-sarah" }),
        pick("eac4-l5-c3", "What happened by the end of the semester?", ["Sarah won two regional debate competitions.", "Sarah gave up.", "Sarah's hands stopped shaking immediately.", "Sarah changed clubs."], 0, "Baris 5: *she had already won two regional debate competitions.*", { passageId: "eac4-sarah" }),
        pick("eac4-l5-c4", "The phrase “slowly but surely” in line 4 suggests that Sarah's improvement was…", ["gradual but steady", "instant", "random", "unsuccessful"], 0, "Pelan tapi pasti → bertahap dan stabil.", { passageId: "eac4-sarah" }),
        pick("eac4-l5-c5", "What is the main message of the passage?", ["Consistent effort can help overcome nervousness.", "Public speaking is impossible to learn.", "Only naturally confident people can debate.", "Coaches are not helpful."], 0, "Baris 6 merangkum pesannya.", { passageId: "eac4-sarah", hots: true }),
      ],
    },
    {
      id: "eac4-l6",
      skill: "vocabulary",
      title: "Homework: Academic Vocabulary and Your Idiom Bank",
      summary: "15 academic words, two writing worksheets and a progress check before Session 5.",
      sections: [
        {
          title: "Academic vocabulary",
          blocks: [
            vocab(
              [
                ["analyze", "menganalisis", "magnifier", "Analyze each option before you choose."],
                ["evaluate", "mengevaluasi, menilai", "checklist", "Evaluate your mock-test results."],
                ["demonstrate", "menunjukkan, membuktikan", "debate", "The data demonstrate a clear trend."],
                ["perspective", "sudut pandang", "eye", "Try to see it from a different perspective."],
                ["contribute", "berkontribusi", "heart", "Everyone contributed to the project."],
                ["significant", "signifikan, berarti", "report", "There was a significant improvement."],
                ["essential", "sangat penting", "lightbulb", "Practice is essential for success."],
                ["factor", "faktor", "puzzle", "Sleep is an important factor."],
                ["previous", "sebelumnya", "calendar", "Compare it with the previous test."],
                ["subsequent", "berikutnya", "go-straight", "The subsequent rounds are harder."],
                ["evidence", "bukti", "open-book", "Find evidence in the passage."],
                ["assume", "berasumsi, menganggap", "owl-think", "Don't assume — check the text."],
                ["conclude", "menyimpulkan", "thumbs-up", "We can conclude that bees matter."],
                ["emphasize", "menekankan", "microphone", "The coach emphasized consistency."],
                ["indicate", "menunjukkan, menandakan", "pin", "The signal word indicates a result."],
              ],
              "Memorise each word + write a sentence"
            ),
          ],
        },
        {
          title: "Worksheets",
          blocks: [
            writing({
              id: "eac4-l6-perfect",
              title: "Five present perfect sentences",
              prompt: "Write **five sentences of your own** using the present perfect (have/has + V3). Use at least three different signal words: already, just, yet, ever, never, since, for.",
              image: "timeline",
              minWords: 30,
              tips: ["I have never…", "She has just…", "We have studied English since…"],
              models: [{ label: "Model", text: "I have never visited Japan. My sister has just finished her homework. We have studied for the Olympiad since September. Have you ever won a medal? My friends have already registered for the Regional Round." }],
              rubric: ["There are five sentences.", "Each sentence uses have/has + V3 correctly.", "At least three different signal words are used.", "No specific past time (yesterday, last week) is used with the present perfect."],
            }),
            writing({
              id: "eac4-l6-idioms",
              title: "Five idiom sentences",
              prompt: "Write **five sentences** using idioms from this module (or other idioms you found yourself). Make the meaning clear from the context.",
              image: "cake-slice",
              minWords: 30,
              tips: ["Use one idiom per sentence.", "Add a clue so a reader can guess the meaning."],
              models: [{ label: "Model", text: "The grammar quiz was a piece of cake because I had practised every day. On my first day at the new school, I felt like a fish out of water. My uncle visits us once in a blue moon because he lives abroad. Our teacher told a funny story to break the ice. I will hit the books tonight because the test is tomorrow." }],
              rubric: ["There are five sentences.", "Each sentence uses an idiom correctly.", "The context makes the meaning clear."],
            }),
            tip("**Kebiasaan lanjutan:** mulai catat idiom baru tiap kali kamu menemukannya di bacaan, film, atau lagu — kumpulkan di satu buku catatan **“idiom bank”**."),
          ],
        },
        {
          title: "Progress check before Session 5",
          blocks: [
            text("Sesi 5 berisi latihan intensif, mock test, dan strategi tie-breaker menjelang Regional. Pastikan kamu sudah nyaman dengan:\n\n- ☐ Present Perfect vs Simple Past\n- ☐ Teknik multi-error analysis\n- ☐ Minimal 6 idiom + 3 jenis figurative language\n- ☐ Idiomatic preposition tambahan (proud of, afraid of, depend on)"),
            tip("Kalau ada bagian yang masih terasa berat, kabari gurumu supaya porsi Sesi 5 bisa disesuaikan."),
          ],
        },
      ],
      checkpoint: [
        pick("eac4-l6-c1", "“Find ___ in the passage before you answer.” (proof)", ["evidence", "factor", "perspective", "previous"], 0, "*Evidence* = bukti."),
        pick("eac4-l6-c2", "“Compare your score with the ___ test.” (the one before)", ["previous", "subsequent", "essential", "significant"], 0, "*Previous* = sebelumnya."),
        pick("eac4-l6-c3", "“The coach ___ the importance of daily practice.” (said it strongly)", ["emphasized", "assumed", "contributed", "indicated"], 0, "*Emphasize* = menekankan."),
        match("eac4-l6-c4", "Match each word with its meaning.", [["analyze", "examine in detail"], ["conclude", "decide after thinking"], ["subsequent", "coming after"], ["contribute", "give or add to something"]], "Kosakata akademik."),
        pick("eac4-l6-c5", "Which word is the antonym of “previous”?", ["subsequent", "earlier", "former", "past"], 0, "*Previous* (sebelumnya) ↔ *subsequent* (berikutnya).", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "eac4-quiz",
    title: "Advanced Combined Practice — 15 Questions + Challenge",
    passPercent: 70,
    questions: [
      pick("eac4-q1", "She ___ her homework already.", ["has finished", "finish", "finished", "finishing"], 0, "Pengalaman/aksi selesai tanpa waktu spesifik."),
      pick("eac4-q2", "By the time we arrived, the train ___.", ["had left", "leave", "left", "has left"], 0, "Aksi sebelum aksi lain di masa lalu (past perfect)."),
      pick("eac4-q3", "I have never ___ such a delicious cake before.", ["eaten", "eat", "ate", "eating"], 0, "Present perfect: have never + V3."),
      pick("eac4-q4", "They ___ in this city since 2015.", ["have lived", "live", "lived", "has lived"], 0, "Mulai di masa lalu dan masih berlanjut (*since 2015*)."),
      correctOne("eac4-q5", ["He has finished his project already.", "He have finished his project already.", "He has finish his project already.", "He finish his project already."], "Satu-satunya yang benar secara grammar."),
      correctOne("eac4-q6", ["She doesn't like spicy food.", "She don't like spicy food.", "She doesn't likes spicy food.", "She not like spicy food."], "Satu-satunya yang benar secara grammar."),
      pick("eac4-q7", "“It's raining cats and dogs” means…", ["raining very heavily", "raining lightly", "animals are falling", "it's sunny"], 0, "Idiom cuaca: hujan sangat deras."),
      pick("eac4-q8", "The phrase “a fish out of water” means…", ["feeling out of place", "very happy", "very cold", "outside in the rain"], 0, "Makna idiom: tidak nyaman di situasi baru."),
      pick("eac4-q9", "“Time is money” is an example of…", ["metaphor", "simile", "personification", "idiom"], 0, "Perbandingan langsung tanpa *like/as*."),
      pick("eac4-q10", "He is proud ___ his achievement.", ["of", "at", "for", "in"], 0, "proud **of**."),
      pick("eac4-q11", "She is afraid ___ spiders.", ["of", "at", "for", "in"], 0, "afraid **of**."),
      pick("eac4-q12", "My uncle depends ___ his savings for retirement.", ["on", "at", "for", "in"], 0, "depend **on**."),
      correctOne("eac4-q13", ["If I have time, I will call you.", "If I will have time, I will call you.", "If I have time, I call you.", "If I had time, I will call you."], "Conditional type 1: if + simple present, will + V1."),
      pick("eac4-q14", "Choose the synonym of “diligent”.", ["hardworking", "lazy", "careless", "quiet"], 0, "*Diligent* = rajin ≈ **hardworking**."),
      pick("eac4-q15", "Choose the antonym of “abundant”.", ["scarce", "plentiful", "huge", "many"], 0, "*Abundant* (berlimpah) ↔ **scarce** (langka)."),
      findError("eac4-q16", "By the time the guests [A:arrived], we [B:have] [C:already] [D:cooked] dinner.", "B", "had", "Memasak terjadi **sebelum** tamu datang → **had** already cooked.", { hots: true }),
      pick("eac4-q17", "“Although the first rounds were a piece of cake, the final felt like climbing a mountain.” What does the writer mean?", ["The early rounds were easy, but the final was very hard.", "The writer ate cake before the final.", "The final took place on a mountain.", "All rounds were equally difficult."], 0, "*A piece of cake* = mudah; *climbing a mountain* = metafora untuk sangat berat; *although* menandai kontras.", { hots: true }),
      pick("eac4-q18", "Which sentence uses the present perfect correctly?", ["We have known each other for ten years.", "We have known each other since ten years.", "We know each other for ten years.", "We have knew each other for ten years."], 0, "Durasi → **for**; have + V3 (*known*).", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Regional Warm-up",
    seconds: 20,
    questions: [
      live("eac4-live1", "have/has + ___", ["V3", "V1", "V2", "V-ing"], 0, "timeline"),
      live("eac4-live2", "By the time I came, she ___ left.", ["had", "has", "have", "was"], 0, "timeline-perfect"),
      live("eac4-live3", "I visited Bali ___.", ["last year", "since 2020", "already", "for years"], 0, "beach"),
      live("eac4-live4", "“Once in a blue moon” =", ["very rarely", "every night", "at night", "on Monday"], 0, "blue-moon"),
      live("eac4-live5", "“Break the ice” =", ["start a conversation", "break something", "feel cold", "go skating"], 0, "ice-break"),
      live("eac4-live6", "“As brave as a lion” is a…", ["simile", "metaphor", "personification", "noun"], 0, "lion"),
      live("eac4-live7", "proud ___", ["of", "at", "for", "with"], 0, "medal"),
      live("eac4-live8", "Synonym of “diligent”:", ["hardworking", "lazy", "careless", "noisy"], 0, "hit-books"),
      live("eac4-live9", "Antonym of “abundant”:", ["scarce", "plentiful", "many", "huge"], 0, "water"),
      live("eac4-live10", "“Evidence” means…", ["proof", "opinion", "question", "mistake"], 0, "magnifier"),
    ],
  },
};
