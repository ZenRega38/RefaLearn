import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, live, match, pick, pics, say, table, text, tip, tryIt, vocab, warn, writing } from "../kit";
import { correctOne, findError, PRELIM_PARTS, respond, SCORE_FORMULA, unscramble } from "./helpers";

// Modul 3 — the Preliminary block, woven into one module: Part C dialogue
// patterns, Part D (unscrambling, idiomatic prepositions, multi-error /
// STAPW), Part B (cause–effect, idioms, figurative language), Part A
// (relative "that", the 7 traps, irregular verbs, passive / future /
// present perfect), drills, Lab D, the Part D retest, exam-day strategy and
// the sprint plan. Mock Test #1 opens the module as its diagnostic; Mock
// Test #2 closes it, so learners can compare the two.

// --- Passages -------------------------------------------------------------------------

const MAYA: Passage = {
  id: "eac3-maya",
  title: "Passage 1 — Maya at the animal shelter",
  pic: "cat",
  lines: [
    "Every weekend, Maya volunteers at a local animal shelter near her house.",
    "She feeds the cats, cleans their cages, and sometimes helps new visitors choose a pet to adopt.",
    "At first, she found the work exhausting because she was not used to waking up early.",
    "However, after a few months, she began to enjoy it more, especially when she saw how happy the adopted animals looked with their new families.",
    "Maya's parents were proud of her dedication, and her experience even inspired her to consider studying veterinary science in the future.",
  ],
};

const PLASTIC: Passage = {
  id: "eac3-plastic",
  title: "Passage 2 — Plastic waste",
  pic: "plastic-bottle",
  lines: [
    "In many cities around the world, plastic waste has become a serious problem.",
    "Every year, millions of tons of plastic end up in oceans, harming marine life and polluting beaches.",
    "Some countries have started banning single-use plastic bags and straws to reduce this issue.",
    "Schools have also begun teaching students about the importance of recycling and reducing waste.",
    "Although these efforts are helpful, experts believe that real change will only happen when individuals make small changes in their daily habits, such as bringing reusable bags and avoiding unnecessary packaging.",
  ],
};

const DINA: Passage = {
  id: "eac3-dina",
  title: "Dina and the umbrella",
  pic: "umbrella",
  lines: [
    "Last week, Dina forgot her umbrella at home.",
    "Because it rained heavily on her way back from school, she got completely soaked.",
    "When she finally arrived home, her mother said her situation looked like a drowned rat.",
    "Although Dina felt annoyed at first, she decided to hit the books that evening instead of complaining, since she had a big test the next day.",
    "As a result, she passed the test with a great score.",
  ],
};

const DIMAS: Passage = {
  id: "eac3-dimas",
  title: "Passage 1 — Dimas turns over a new leaf",
  pic: "new-leaf",
  lines: [
    "Last semester, Dimas struggled to pass his math class.",
    "He often stayed up late playing video games, so he was too sleepy to concentrate during lessons.",
    "As a result, his test scores dropped.",
    "When his teacher called his parents, Dimas realized that he had to turn over a new leaf.",
    "From then on, he went to bed early, finished his homework before dinner, and asked questions whenever he felt confused.",
    "Within two months, his grades improved noticeably.",
    "Now, Dimas often tells his friends that building good habits is a piece of cake once you decide to start.",
  ],
};

const BEES: Passage = {
  id: "eac3-bees",
  title: "Passage 2 — Nature's smallest helpers",
  pic: "bee",
  lines: [
    "Honeybees are tiny, but they play a huge role in our food supply.",
    "When bees collect nectar from flowers, pollen sticks to their bodies and is carried to other flowers, which helps plants produce fruits and seeds.",
    "Scientists estimate that about one third of the food we eat depends on this process.",
    "Unfortunately, bee populations have been declining because of pesticides, loss of habitat, and climate change.",
    "Farmers and researchers are therefore working together to protect them, for example by planting wildflowers near crops and using fewer chemicals.",
    "A beekeeper once said that nature's smallest helpers often deserve our greatest attention.",
  ],
};

// --- The module --------------------------------------------------------------------------

export const SESSION3: Level = {
  id: "eac3",
  title: "Session 3 — Preliminary Round Complete Preparation",
  description:
    "Everything for the Preliminary Round in one module: Part C dialogue patterns; Part D sentence unscrambling, idiomatic prepositions and multi-error analysis (STAPW); Part B cause–effect, idioms and figurative language; Part A relative clause “that”, the seven most common traps, irregular verbs, passive, future and present perfect. Then a drill set, Lab D, the Part D retest, exam-day strategy and a daily sprint plan. Start with Mock Test #1 and finish with Mock Test #2.",
  targetScore: "Preliminary Round · target ≥ 85/100",
  cover: ["stopwatch", "puzzle", "checklist"],
  pretest: {
    id: "eac3-mock1",
    title: "Mock Test #1 — 40 Questions (start here)",
    passPercent: 0,
    parts: PRELIM_PARTS,
    passages: [MAYA, PLASTIC],
    questions: [
      // Part A — Words & Structure
      pick("eac3-m1-1", "Part A · My father ___ a newspaper every morning.", ["reads", "read", "reading", "red"], 0, "Kebiasaan + subjek he → **reads**. (*Red* adalah warna — jebakan bunyi.)"),
      pick("eac3-m1-2", "Part A · They ___ to Bandung last weekend.", ["went", "go", "goes", "going"], 0, "*Last weekend* → simple past **went**."),
      pick("eac3-m1-3", "Part A · Look! The children ___ in the pool now.", ["are swimming", "swim", "swims", "swam"], 0, "*Look!* + *now* → present continuous."),
      pick("eac3-m1-4", "Part A · There isn't ___ milk left in the fridge.", ["much", "many", "few", "several"], 0, "*Milk* uncountable → **much**."),
      pick("eac3-m1-5", "Part A · The plural of “woman” is…", ["women", "womans", "womens", "woman's"], 0, "Jamak tidak beraturan: **women**."),
      pick("eac3-m1-6", "Part A · This dress is ___ than the one I bought last year.", ["more expensive", "expensive", "most expensive", "expensiver"], 0, "Kata panjang + *than* → **more expensive**."),
      pick("eac3-m1-7", "Part A · She is the ___ singer in the competition.", ["best", "good", "better", "goodest"], 0, "*The* + superlative dari *good* → **best**."),
      pick("eac3-m1-8", "Part A · We will meet ___ the school gate.", ["at", "in", "on", "to"], 0, "Titik spesifik → **at**."),
      pick("eac3-m1-9", "Part A · My brother was born ___ March.", ["in", "on", "at", "to"], 0, "Bulan → **in**."),
      pick("eac3-m1-10", "Part A · The cat jumped ___ the box.", ["into", "in", "on", "at"], 0, "Gerakan masuk ke dalam → **into**."),
      pick("eac3-m1-11", "Part A · The girl ___ is standing near the door is my cousin.", ["who", "which", "whom", "whose"], 0, "Orang → **who**."),
      pick("eac3-m1-12", "Part A · This is the laptop ___ I bought last month.", ["which", "who", "whom", "whose"], 0, "Benda → **which**."),
      pick("eac3-m1-13", "Part A · Choose the synonym of “enormous”.", ["huge", "tiny", "quiet", "simple"], 0, "*Enormous* ≈ **huge**."),
      pick("eac3-m1-14", "Part A · Choose the antonym of “generous”.", ["selfish", "kind", "friendly", "helpful"], 0, "Lawan *generous* (murah hati) → **selfish**."),
      pick("eac3-m1-15", "Part A · I was tired, ___ I decided to go to bed early.", ["so", "but", "or", "although"], 0, "Lelah → **akibatnya** tidur cepat: *so*."),
      pick("eac3-m1-16", "Part A · ___ it was raining, they still went to school.", ["Although", "Because", "So", "And"], 0, "Kontras (hujan tapi tetap berangkat) → **Although**."),
      pick("eac3-m1-17", "Part A · The word “carefully” in “She drives carefully” is a/an…", ["adverb", "noun", "verb", "adjective"], 0, "Menerangkan verb *drives* → **adverb**."),
      pick("eac3-m1-18", "Part A · Choose the correct plural of “tooth”.", ["teeth", "tooths", "toothes", "teeths"], 0, "Jamak tidak beraturan: **teeth**."),
      pick("eac3-m1-19", "Part A · He is ___ than his older brother.", ["taller", "tall", "tallest", "more tall"], 0, "Comparative kata pendek: **taller**."),
      pick("eac3-m1-20", "Part A · We need ___ information before making a decision.", ["much", "many", "few", "several"], 0, "*Information* uncountable → **much**."),
      // Part B — Reading
      pick("eac3-m1-21", "Part B · What does Maya do every weekend?", ["She volunteers at an animal shelter.", "She studies veterinary science.", "She adopts new pets.", "She visits her parents."], 0, "Baris 1: *Maya volunteers at a local animal shelter.*", { passageId: "eac3-maya" }),
      pick("eac3-m1-22", "Part B · Why did Maya find the work exhausting at first?", ["She wasn't used to waking up early.", "She didn't like animals.", "The shelter was too far.", "Her parents forced her."], 0, "Baris 3: *because she was not used to waking up early.*", { passageId: "eac3-maya" }),
      pick("eac3-m1-23", "Part B · The word “dedication” in line 5 is closest in meaning to…", ["commitment", "laziness", "confusion", "boredom"], 0, "Orang tua bangga atas kesungguhannya → *dedication* ≈ **commitment**.", { passageId: "eac3-maya" }),
      pick("eac3-m1-24", "Part B · What inspired Maya to consider studying veterinary science?", ["Her volunteering experience", "Her parents' advice", "A school subject", "A TV show"], 0, "Baris 5: *her experience even inspired her…*", { passageId: "eac3-maya" }),
      pick("eac3-m1-25", "Part B · Based on the passage, we can conclude that…", ["Maya's feelings about the work changed positively over time.", "Maya regretted volunteering.", "Maya stopped volunteering after a few months.", "Maya dislikes animals."], 0, "Awalnya melelahkan, lalu ia mulai menikmatinya → perasaannya berubah positif.", { passageId: "eac3-maya", hots: true }),
      pick("eac3-m1-26", "Part B · What is the main problem discussed in the passage?", ["Ocean pollution from plastic waste", "Lack of schools", "Shortage of reusable bags", "Marine life extinction"], 0, "Baris 1–2: sampah plastik dan polusi laut.", { passageId: "eac3-plastic" }),
      pick("eac3-m1-27", "Part B · What have some countries done to address this problem?", ["Banned single-use plastic bags and straws", "Built more schools", "Increased ocean patrols", "Stopped teaching recycling"], 0, "Baris 3.", { passageId: "eac3-plastic" }),
      pick("eac3-m1-28", "Part B · The word “unnecessary” in line 5 is closest in meaning to…", ["needless", "important", "essential", "useful"], 0, "*Un-* + *necessary* → tidak perlu = **needless**.", { passageId: "eac3-plastic" }),
      pick("eac3-m1-29", "Part B · According to experts, what is needed for real change to happen?", ["Individuals changing their daily habits", "More government bans", "Building new factories", "Banning all plastic entirely"], 0, "Baris 5: *when individuals make small changes in their daily habits.*", { passageId: "eac3-plastic" }),
      pick("eac3-m1-30", "Part B · What can be inferred from the passage?", ["Both government and individual actions are important.", "The plastic waste problem is already fully solved.", "Government action alone can solve the problem.", "Schools are the only solution."], 0, "Larangan pemerintah membantu, tapi perubahan nyata butuh kebiasaan individu → keduanya penting.", { passageId: "eac3-plastic", hots: true }),
      // Part C — Spoken & Written Expression
      respond("eac3-m1-31", [["Lisa", "I really appreciate you lending me your notes."], ["Tom", "___"]], ["You're welcome, glad I could help.", "I'm sorry.", "No, thank you.", "That's terrible."], "Lisa berterima kasih → respons: *You're welcome*."),
      respond("eac3-m1-32", [["Passenger A", "Excuse me, is this seat taken?"], ["Passenger B", "___"]], ["No, please, go ahead.", "Congratulations!", "I'm afraid so.", "That's very kind."], "Kursi kosong → *No (not taken), please go ahead*."),
      respond("eac3-m1-33", [["Boss", "Could you send me the report by 5 PM today?"], ["Employee", "___"]], ["Sure, I'll have it ready by then.", "You're welcome.", "That's amazing.", "I don't care."], "Permintaan tolong → *Sure…*"),
      respond("eac3-m1-34", [["Friend", "I heard you won the science competition! Congratulations!"], ["You", "___"]], ["Thank you so much, I'm really happy!", "I'm sorry to hear that.", "No, thanks.", "That's too bad."], "Diberi selamat → *Thank you*."),
      respond("eac3-m1-35", [["Stranger", "Sorry, could you tell me how to get to the train station?"], ["You", "___"]], ["Sure, go straight and turn left at the corner.", "Congratulations!", "You're welcome.", "I'm afraid not."], "Ditanya arah → jawab dengan **informasi konkret**."),
      // Part D — HOTS
      unscramble("eac3-m1-36", ["never", "forget", "I", "this experience", "will"], ["3-5-1-2-4", "3-1-5-2-4", "5-3-1-2-4", "3-5-2-1-4"], "*I will never forget this experience.* Subjek (3) → auxiliary *will* (5) → adverb *never* (1) → verb (2) → objek (4)."),
      unscramble("eac3-m1-37", ["by the teacher", "the students", "were praised", "for their hard work"], ["2-3-1-4", "2-1-3-4", "3-2-1-4", "2-3-4-1"], "*The students were praised by the teacher for their hard work.* Pasif: S + be + V3, lalu pelaku (*by*) biasanya langsung setelah verb pasif."),
      pick("eac3-m1-38", "Part D · She is very interested ___ learning new languages.", ["in", "at", "on", "for"], 0, "interested **in** + V-ing.", { hots: true }),
      pick("eac3-m1-39", "Part D · He is responsible ___ organizing the event.", ["for", "to", "at", "on"], 0, "responsible **for**.", { hots: true }),
      pick("eac3-m1-40", "Part D · They are worried ___ the upcoming exam.", ["about", "at", "in", "for"], 0, "worried **about**.", { hots: true }),
    ],
  },
  lessons: [
    // ------------------------------------------------------------------ 1
    {
      id: "eac3-l1",
      skill: "reading",
      title: "Start Here: Review, Scoring and Your Error Log",
      summary: "Quick review of Sessions 1–2, how to score a mock test, how to read your results and how to keep an error log.",
      minutes: 20,
      sections: [
        {
          title: "What this module does",
          blocks: [
            text(
              "Modul ini adalah **persiapan lengkap Preliminary Round**. Isinya:\n\n- Pola respons dialog untuk **Bagian C**\n- Sentence unscrambling, idiomatic preposition, dan multi-error analysis untuk **Bagian D**\n- Cause-effect, idiom & figurative language untuk **Bagian B**\n- Relative clause *that*, 7 jebakan, irregular verbs, passive/future/present perfect untuk **Bagian A**\n- Drill set, Lab D, retest Bagian D, strategi hari-H, dan rencana sprint harian"
            ),
            pics([["stopwatch", "Mock Test #1"], ["puzzle", "Learn & drill"], ["podium", "Mock Test #2"]], "How the module works"),
            tip("Kerjakan **Mock Test #1** (tes awal modul ini) dulu: **60 menit, 40 soal**, tanpa catatan dan tanpa bantuan — persis kondisi ujian asli. Tidak ada nilai minus, jadi isi semua soal walau ragu. Kuis akhir modul adalah **Mock Test #2**, supaya kamu bisa membandingkan hasilnya."),
          ],
        },
        {
          title: "Score your mock test",
          blocks: [
            text("Hitung skor kasarmu dengan skala 100 seperti ujian asli:"),
            { type: "table", head: SCORE_FORMULA.head, rows: SCORE_FORMULA.rows },
            text("*Ini estimasi kasar. Di ujian asli bobot per soal bervariasi (A: 1–3, B: 2–4, C: 2–4, D: 3–5), jadi angka aslinya bisa bergeser.*"),
            table(
              ["Part", "Correct", "Percentage", "Estimated score", "Priority?"],
              [
                ["A. Words & Structure", "… / 20", "", "… / 35", ""],
                ["B. Reading", "… / 10", "", "… / 27", ""],
                ["C. Spoken & Written Expression", "… / 5", "", "… / 16", ""],
                ["D. HOTS", "… / 5", "", "… / 22", ""],
              ]
            ),
          ],
        },
        {
          title: "Read your results",
          blocks: [
            text(
              "Pola yang sangat umum setelah Mock Test #1: **B dan C sudah kuat**, sedangkan **A dan D masih lemah**. Contoh nyata:\n\n- A: 12/20 (60%) ≈ 21/35 → prioritas **2**\n- B: 9/10 (90%) ≈ 24/27 → cukup dijaga\n- C: 5/5 (100%) = 16/16 → cukup dijaga\n- D: 2/5 (40%) ≈ 9/22 → prioritas **1 (utama)**"
            ),
            tip("**Kenapa D jadi prioritas utama:** tiap soal D paling bernilai (3–5 poin) dan D adalah penentu #1 saat skor seri (D → A → C). **Simulasi:** D naik dari 2 ke 4 benar (+≈9 poin) dan A naik dari 12 ke 16 benar (+≈7 poin) → total ≈ **86/100**."),
            table(
              ["Goal", "Target"],
              [
                ["Part D", "dari 40% ke minimal **80% (4/5)**"],
                ["Part A", "dari 60% ke minimal **80% (16/20)**"],
                ["Part B & C", "tidak turun (B ≥ 9/10, C = 5/5) — dijaga lewat kebiasaan baca harian"],
                ["Total", "**≥ 85/100** pada Mock Test #2"],
              ]
            ),
          ],
        },
        {
          title: "Your error log",
          blocks: [
            text("Buka hasil Mock Test #1. Untuk **setiap soal yang salah** di Bagian A (no. 1–20) dan Bagian D (no. 36–40), catat:"),
            table(["Question no.", "Topic (tense / word form / preposition / unscrambling / …)", "Why wrong? (didn't know the concept / careless / doubted and changed)"], [["", "", ""], ["", "", ""], ["", "", ""]]),
            text(
              "**Cara baca hasilnya:**\n\n- Mayoritas **ceroboh** → masalahnya di ketelitian; latih kebiasaan cek ulang (checklist **STAPW** di lesson Multi-Error Analysis).\n- Mayoritas **tidak tahu konsep** → fokuskan waktu di materi topik itu.\n- Hitung topik yang paling sering muncul di kolom kedua — itu prioritas latihan mandirimu.\n- Kalau penyebab terbanyak **ragu lalu ganti jawaban**, pakai aturan: ganti jawaban hanya kalau ada **alasan grammar yang jelas**, bukan firasat."
            ),
            writing({
              id: "eac3-l1-errorlog",
              title: "My error log",
              prompt: "Write one line for **every question you got wrong** in Mock Test #1: question number → topic → reason (didn't know the concept / careless / doubted and changed). Then write which topic appears most often.",
              image: "checklist",
              minWords: 20,
              tips: ["Format: 14 → antonym → didn't know the word", "Be honest about careless mistakes — they are the easiest points to win back."],
              models: [
                { label: "Example", text: "4 → much/many → careless. 16 → although/because → didn't know the concept. 36 → unscrambling (adverb position) → didn't know the concept. 37 → passive unscrambling → doubted and changed. Most common topic: Part D unscrambling." },
              ],
              rubric: ["Every wrong answer from Part A and Part D is listed.", "Each line has a topic and a reason.", "The most common weak topic is named."],
            }),
          ],
        },
        {
          title: "Quick review of Sessions 1–2",
          blocks: [
            text("Checkpoint lesson ini adalah **6 soal review cepat** materi Sesi 1–2. Kalau masih ada yang salah, sisihkan 10–15 menit untuk mengulang materi itu dulu — tapi jangan sampai latihan Bagian C dan D terpotong."),
          ],
        },
      ],
      checkpoint: [
        pick("eac3-l1-c1", "This book is ___ than that one.", ["more interesting", "interesting", "most interesting", "interestinger"], 0, "Kata panjang + *than* → **more interesting**."),
        pick("eac3-l1-c2", "We arrived ___ 9 PM.", ["at", "in", "on", "to"], 0, "Jam spesifik → **at**."),
        pick("eac3-l1-c3", "The dog ___ in the park every afternoon.", ["runs", "run", "running", "ran"], 0, "Kebiasaan + subjek it → **runs**.", { image: "dog" }),
        pick("eac3-l1-c4", "Choose the correct plural of “child”.", ["children", "childs", "childes", "child's"], 0, "Jamak tidak beraturan."),
        pick("eac3-l1-c5", "The girl ___ is wearing a red dress is my sister.", ["who", "which", "whom", "whose"], 0, "Orang → **who**."),
        pick("eac3-l1-c6", "I was hungry, ___ I made some food.", ["so", "but", "because", "although"], 0, "Akibat → **so**."),
      ],
    },
    // ------------------------------------------------------------------ 2
    {
      id: "eac3-l2",
      skill: "speaking",
      title: "Part C: Dialogue Patterns and Pragmatic Responses",
      summary: "Find the function of the dialogue first, then the response that is logical AND polite.",
      minutes: 15,
      sections: [
        {
          title: "Function first",
          blocks: [
            pics([["speech-bubbles", "What is the speaker doing?"]]),
            text("Kunci Bagian C: pahami **fungsi** dialognya dulu (berterima kasih? minta maaf? menawarkan bantuan? meminta izin?), baru cari respons yang **logis DAN sopan** sesuai konteks — bukan cuma benar secara grammar."),
            table(
              ["Function", "Example", "Typical responses"],
              [
                ["Thanking (berterima kasih)", "“Thank you so much for…”", "You're welcome. / No problem. / Anytime."],
                ["Apologising (minta maaf)", "“I'm so sorry for…”", "That's okay. / No worries. / Don't worry about it."],
                ["Offering help (menawarkan bantuan)", "“Would you like some help?”", "Yes, please, that would be great. / No, thanks, I can manage."],
                ["Requesting (meminta tolong)", "“Could you please…?”", "Sure, no problem. / I'm afraid I can't right now."],
                ["Asking permission (meminta izin)", "“May I…?”", "Of course. / I'm afraid not."],
                ["Congratulating (memberi selamat)", "“Congratulations on…!”", "Thank you so much!"],
                ["Asking for directions / information", "“Excuse me, could you tell me…?”", "A concrete answer, not small talk."],
              ]
            ),
            warn("**Jebakan umum:** opsi yang *sopan* tapi tidak nyambung — misalnya *You're welcome* untuk menjawab permintaan maaf. Itu **salah** walau kedengarannya sopan."),
          ],
        },
        {
          title: "Listen to the patterns",
          blocks: [
            audio("Thanking and apologising", say(["woman", "Thank you for helping me with my homework."], ["man", "You're welcome, anytime."], ["man", "I'm so sorry I forgot your birthday."], ["woman", "It's okay, no big deal."])),
            audio("Requests and offers", say(["man", "Would you mind closing the window? It's cold."], ["woman", "Not at all, I'll close it now."], ["woman", "Do you want me to pick you up after the tournament?"], ["man", "Yes, please. That would be really helpful."])),
            audio("Information and bad news", say(["woman", "Excuse me, how much is this jacket?"], ["man", "It costs two hundred thousand rupiah."], ["man", "I've lost my wallet on the way to school."], ["woman", "Oh no, that's terrible. Let's retrace your steps."])),
            tip("*Would you mind…?* artinya “keberatan tidak…?”. Jadi jawaban **setuju** adalah *Not at all* (tidak keberatan), bukan *Yes*!"),
            tryIt(respond("eac3-l2-try1", [["Rina", "Would you mind closing the window? It's cold."], ["Dewi", "___"]], ["Not at all, I'll close it now.", "Yes, I really mind.", "You're welcome.", "Congratulations."], "*Would you mind…?* → setuju = *Not at all*.")),
          ],
        },
      ],
      checkpoint: [
        respond("eac3-l2-c1", [["Ani", "Thank you for helping me with my homework."], ["Beni", "___"]], ["You're welcome, anytime.", "I'm sorry.", "No, thanks.", "That's terrible."], "Ucapan terima kasih → *You're welcome*."),
        respond("eac3-l2-c2", [["Waiter", "Would you like anything else?"], ["Customer", "___"]], ["No, thank you, that's all.", "You're welcome.", "I'm afraid not.", "That's very kind."], "Menolak tawaran dengan sopan → *No, thank you, that's all*."),
        respond("eac3-l2-c3", [["Teacher", "You did an excellent job on your presentation."], ["Student", "___"]], ["Thank you, I worked hard on it.", "I don't care.", "No, thank you.", "I'm sorry to hear that."], "Dipuji → berterima kasih."),
        respond("eac3-l2-c4", [["Doni", "Excuse me, do you know what time the museum closes?"], ["Officer", "___"]], ["It closes at 5 PM.", "I'm sorry to hear that.", "You're welcome.", "Congratulations!"], "Pertanyaan informasi → jawaban konkret.", { image: "museum" }),
        respond("eac3-l2-c5", [["Friend", "I'm sorry I forgot your birthday."], ["You", "___"]], ["It's okay, no big deal.", "Congratulations!", "You're welcome.", "That's amazing."], "Permintaan maaf → *It's okay*.", { image: "cake" }),
        respond("eac3-l2-c6", [["Teacher", "Who can explain the difference between 'few' and 'little'?"], ["Student", "___"]], ["Let me try, Ma'am.", "That's very kind of you.", "I'm sorry to hear that.", "No problem."], "Guru meminta relawan → *Let me try*.", { hots: true }),
      ],
    },
    // ------------------------------------------------------------------ 3
    {
      id: "eac3-l3",
      skill: "structure",
      title: "Part D: Sentence Unscrambling",
      summary: "A six-step method, the patterns the paper loves, and eliminating options by their first number.",
      minutes: 25,
      sections: [
        {
          title: "Six steps",
          blocks: [
            pics([["puzzle", "chunks → sentence"]]),
            text(
              "1. **Cari subjek** (siapa/apa yang dibicarakan — biasanya noun/pronoun di awal) dan **kata penghubung** (who/which/that/because/although/if).\n2. **Cari kata kerja utama** atau auxiliary (is/was/has been/will) — auxiliary sering menentukan posisi.\n3. **Susun inti S–V–O**, lalu tambahkan keterangan (cara, tempat, waktu) di belakang.\n4. **Cek posisi kata khusus** (adverb frekuensi, kata negatif, dll.).\n5. **Eliminasi lewat opsi:** lihat angka pertama dan terakhir di 4 opsi. Kalau chunk tertentu tidak mungkin di awal, coret semua opsi yang diawali angka itu.\n6. **Baca ulang** hasilnya dalam hati: masuk akal dan grammar-nya benar?"
            ),
            examples([{ right: "(1) never / (2) forget / (3) I / (4) this experience / (5) will → I will never forget this experience. = 3-5-1-2-4" }], "Example"),
            tip("Di ujian kamu dapat **kertas buram**. Pakai untuk menomori ulang chunk dan menulis urutannya sebelum mencocokkan dengan opsi."),
          ],
        },
        {
          title: "Patterns the paper tests",
          blocks: [
            table(
              ["Pattern", "Rule", "Example"],
              [
                ["Frequency adverb (always, never, rarely, often, usually, hardly ever)", "**Sebelum** verb utama; **sesudah** be/auxiliary", "She *always* drinks tea. / He is *never* late."],
                ["Place & time", "Di akhir kalimat (tempat sebelum waktu)", "…at school every day"],
                ["Relative clause", "Menempel langsung di belakang noun yang diterangkan", "The girl **who won the contest** is my neighbor."],
                ["Passive", "S + be + V3 (+ by pelaku)", "The classroom **was cleaned** by the students."],
                ["Indirect question", "Kata tanya + S + V (**tanpa** inversi)", "I wonder **where the bank is**. (bukan: where is the bank)"],
                ["so … that", "S + be + so + adjective + that + klausa", "He was so tired **that** he fell asleep."],
                ["Prepositional phrase", "Jangan memisahkan verb dari objeknya", "He finished his homework after dinner. (bukan: finished after dinner his homework)"],
              ]
            ),
          ],
        },
        {
          title: "Official sample, solved by elimination",
          blocks: [
            text("Susun: **(1)** rarely / **(2)** the young prodigy / **(3)** during / **(4)** makes mistakes / **(5)** live recitals\n\nOpsi: A) 2-1-4-3-5  B) 1-2-4-3-5  C) 2-4-1-3-5  D) 5-3-2-1-4"),
            text("- Subjek = *the young prodigy* (2) → opsi yang tidak dimulai angka 2 (**B, D**) dicoret.\n- Adverb *rarely* harus **sebelum** verb *makes mistakes* → **C** salah (verb mendahului adverb).\n- Sisa **A**: *The young prodigy rarely makes mistakes during live recitals.* ✔"),
            tryIt(arrange("eac3-l3-try1", "Tap the chunks in order.", "The young prodigy rarely makes mistakes during live recitals", "Subjek → adverb frekuensi → verb + objek → frasa waktu.")),
            tryIt(unscramble("eac3-l3-try2", ["always", "my grandmother", "delicious food", "cooks", "for us"], ["2-1-4-3-5", "2-4-1-3-5", "1-2-4-3-5", "2-1-4-5-3"], "*My grandmother always cooks delicious food for us.* Adverb *always* sebelum verb *cooks*; objek langsung setelah verb.")),
          ],
        },
      ],
      checkpoint: [
        unscramble("eac3-l3-c1", ["the exam", "she", "passed", "studying hard", "after"], ["2-3-1-5-4", "2-1-3-5-4", "5-2-3-1-4", "2-3-5-1-4"], "*She passed the exam after studying hard.* S–V–O dulu, keterangan (*after studying hard*) di belakang."),
        unscramble("eac3-l3-c2", ["always", "my sister", "before breakfast", "drinks", "a glass of water"], ["2-1-4-5-3", "2-4-1-5-3", "1-2-4-5-3", "2-1-4-3-5"], "*My sister always drinks a glass of water before breakfast.* Adverb sebelum verb; keterangan waktu di akhir."),
        unscramble("eac3-l3-c3", ["is", "never", "late", "our teacher", "for class"], ["4-1-2-3-5", "4-2-1-3-5", "2-4-1-3-5", "4-1-3-2-5"], "*Our teacher is never late for class.* Adverb **sesudah** *is*."),
        unscramble("eac3-l3-c4", ["was written", "by a famous author", "this novel", "in 1998"], ["3-1-2-4", "1-3-2-4", "3-2-1-4", "2-3-1-4"], "*This novel was written by a famous author in 1998.* Passive + pelaku + waktu."),
        unscramble("eac3-l3-c5", ["who", "the girl", "won the contest", "is my neighbor"], ["2-1-3-4", "2-3-1-4", "1-2-3-4", "2-1-4-3"], "*The girl who won the contest is my neighbor.* Relative clause menempel di noun."),
        unscramble("eac3-l3-c6", ["where", "I", "wonder", "the nearest bank", "is"], ["2-3-1-4-5", "2-3-1-5-4", "3-2-1-4-5", "2-1-3-4-5"], "*I wonder where the nearest bank is.* Indirect question **tanpa inversi**."),
        unscramble("eac3-l3-c7", ["that he fell asleep", "he", "immediately", "was so tired"], ["2-4-1-3", "2-4-3-1", "4-2-1-3", "2-1-4-3"], "*He was so tired that he fell asleep immediately.* Pola **so … that**."),
        arrange("eac3-l3-c8", "Tap the chunks in order.", "I wonder where the nearest bank is", "Kata tanya + subjek + verb, tanpa inversi.", { hots: true }),
      ],
    },
    // ------------------------------------------------------------------ 4
    {
      id: "eac3-l4",
      skill: "vocabulary",
      title: "Part D: Idiomatic Prepositions",
      summary: "Prepositions that stick to certain words — grouped by preposition, plus the V-ing trap.",
      minutes: 15,
      sections: [
        {
          title: "Grouped by preposition",
          blocks: [
            text("**Idiomatic preposition** adalah preposisi yang “menempel” pada kata tertentu dan **harus dihafal**. Kelompokkan berdasarkan preposisinya, bukan alfabet:"),
            table(
              ["Preposition", "Words that take it"],
              [
                ["**at**", "good at, excellent at, laugh at, smile at, look at"],
                ["**of**", "afraid of, proud of, fond of, aware of, capable of, jealous of, tired of, full of, consist of, accuse (someone) of"],
                ["**in**", "interested in, succeed in, participate in, believe in, involved in"],
                ["**for**", "responsible for, famous for, ready for, wait for, look for, apologize for, thank (someone) for"],
                ["**on**", "depend on, rely on, focus on, concentrate on, insist on, congratulate (someone) on"],
                ["**to**", "look forward to, similar to, belong to, listen to, kind to, refer to, contribute to, object to"],
                ["**about**", "worried about, excited about, sure about, care about, complain about"],
                ["**from**", "different from, suffer from, absent from"],
                ["**with**", "angry with (a person), satisfied with, pleased with, deal with"],
              ]
            ),
            tip("Buat **satu catatan khusus** idiomatic preposition dan tambahkan terus tiap ketemu yang baru. Target: minimal **25 pasangan** hafal — uji lisan 5 menit tiap hari."),
          ],
        },
        {
          title: "The V-ing trap",
          blocks: [
            warn("Setelah preposisi, kata kerja berbentuk **V-ing**, bukan *to + V*."),
            examples([
              { wrong: "She is interested in to learn new languages.", right: "She is interested in learning new languages." },
              { wrong: "I look forward to see you.", right: "I look forward to seeing you.", note: "*To* di sini preposisi, jadi diikuti V-ing." },
              { wrong: "He is good at solve math problems.", right: "He is good at solving math problems." },
            ]),
            warn("Jangan menerjemahkan dari bahasa Indonesia! *Tergantung pada* → **depend on** (bukan *depend to*); *bangga akan* → **proud of**."),
            tryIt(fill("eac3-l4-try1", "Type the missing preposition.", "I'm looking forward", "seeing you again.", ["to"], "look forward **to** + V-ing.")),
          ],
        },
      ],
      checkpoint: [
        pick("eac3-l4-c1", "She is very good ___ solving math problems.", ["at", "in", "on", "for"], 0, "good **at**.", { hots: true }),
        pick("eac3-l4-c2", "He apologized ___ being late.", ["for", "to", "at", "on"], 0, "apologize **for**.", { hots: true }),
        pick("eac3-l4-c3", "I'm looking forward ___ seeing you again.", ["to", "for", "at", "on"], 0, "look forward **to** + V-ing.", { hots: true }),
        pick("eac3-l4-c4", "He is fond ___ classical music.", ["of", "in", "at", "on"], 0, "fond **of**.", { image: "piano" }),
        pick("eac3-l4-c5", "We are looking forward ___ the school trip.", ["to", "for", "at", "of"], 0, "look forward **to**."),
        pick("eac3-l4-c6", "The success of the project depends ___ teamwork.", ["on", "of", "in", "at"], 0, "depend **on**."),
        pick("eac3-l4-c7", "She apologized ___ her friend for the misunderstanding.", ["to", "from", "at", "on"], 0, "apologize **to** (seseorang) **for** (sesuatu)."),
        pick("eac3-l4-c8", "The city is famous ___ its historic temples.", ["for", "of", "at", "to"], 0, "famous **for**."),
        pick("eac3-l4-c9", "My teacher is very kind ___ all of us.", ["to", "with", "at", "for"], 0, "kind **to**."),
        pick("eac3-l4-c10", "This medicine consists ___ three natural herbs.", ["of", "from", "in", "with"], 0, "consist **of**.", { image: "medicine" }),
        pick("eac3-l4-c11", "She succeeded ___ passing the entrance test.", ["in", "at", "on", "for"], 0, "succeed **in** + V-ing."),
        match("eac3-l4-c12", "Match each word with its preposition.", [["proud", "of"], ["responsible", "for"], ["depend", "on"], ["interested", "in"], ["worried", "about"]], "Pasangan wajib hafal."),
      ],
    },
    // ------------------------------------------------------------------ 5
    {
      id: "eac3-l5",
      skill: "structure",
      title: "Part D: Multi-Error Analysis with STAPW",
      summary: "Four similar sentences, one is correct: check each with the STAPW checklist.",
      minutes: 15,
      sections: [
        {
          title: "How the question works",
          blocks: [
            text("Bentuk soalnya: **4 kalimat mirip, hanya 1 yang bersih** dari kesalahan. Tiap kalimat salah punya kesalahan **berbeda**. Jangan pilih yang “kedengarannya enak” — periksa satu per satu."),
            examples(
              [
                { wrong: "Yesterday, I go to the market and buy some vegetables.", note: "Present tense — harusnya past." },
                { wrong: "Yesterday, I went to the market and buy some vegetables.", note: "Verb kedua belum diubah ke past." },
                { right: "Yesterday, I went to the market and bought some vegetables.", note: "Kedua verb konsisten past tense." },
                { wrong: "Yesterday, I going to the market and bought some vegetables.", note: "*Going* tanpa auxiliary." },
              ],
              "Sample: which sentence is correct?"
            ),
          ],
        },
        {
          title: "The STAPW checklist",
          blocks: [
            pics([["checklist", "S · T · A · P · W"]]),
            table(
              ["Letter", "Check", "Typical trap"],
              [
                ["**S**", "**S**ubject–verb agreement", "*The children **plays*** / *Every student **have***"],
                ["**T**", "**T**ense (lihat penanda waktu)", "*She **has visited** her grandmother **last week***"],
                ["**A**", "**A**rticle, plural, uncountable", "*An **informations** about…*"],
                ["**P**", "**P**reposition & the form after it", "*interested **on** learning* / *look forward **to see***"],
                ["**W**", "**W**ord form (noun / adjective / adverb)", "*answered **confident*** / *feels **nervously***"],
              ]
            ),
            tip("**Cara kerja:** baca tiap opsi → coret begitu ketemu 1 pelanggaran STAPW → kalau tersisa 2 opsi, cek ulang huruf demi huruf."),
            tryIt(correctOne("eac3-l5-try1", ["She doesn't like spicy food.", "She don't like spicy food.", "She doesn't likes spicy food.", "She not like spicy food."], "*Don't* → doesn't (S); setelah *doesn't* → V1 *like*; butuh auxiliary.")),
          ],
        },
      ],
      checkpoint: [
        correctOne("eac3-l5-c1", ["Yesterday, I went to the market and bought some vegetables.", "Yesterday, I go to the market and buy some vegetables.", "Yesterday, I went to the market and buy some vegetables.", "Yesterday, I going to the market and bought some vegetables."], "Kedua verb harus konsisten past tense (T)."),
        correctOne("eac3-l5-c2", ["The students are studying for their exam.", "The students is studying for their exam.", "The students am studying for their exam.", "The student are studying for their exam."], "*Students* jamak → **are** (S)."),
        correctOne("eac3-l5-c3", ["She always studies English on weekends.", "She always study English on weekend.", "She always studying English on weekends.", "She always studied English on weekends now."], "Kebiasaan + she → **studies** (S/T)."),
        correctOne("eac3-l5-c4", ["The children play football in the yard every afternoon.", "The children plays football in the yard every afternoon.", "The children play footballs in the yard every afternoon.", "The children is playing football in the yard every afternoon."], "*Plays* & *is playing* melanggar S; *footballs* melanggar A."),
        correctOne("eac3-l5-c5", ["She visited her grandmother last week.", "She has visited her grandmother last week.", "She has visit her grandmother last week.", "She visits her grandmother last week."], "*Last week* → simple past (T). Present perfect tidak dipakai dengan *last week*."),
        correctOne("eac3-l5-c6", ["He answered the question confidently.", "He answered the question confident.", "He answered the question confidence.", "He answered the question confidently, but he feels nervously."], "Menerangkan verb → adverb *confidently* (W). *Feels nervously* salah — setelah *feel* pakai adjective."),
        correctOne("eac3-l5-c7", ["The information about the competition is available online.", "An information about the competition are available online.", "The informations about the competition is available online.", "The information about the competition are available online."], "*Information* uncountable: tanpa *an*, tanpa -s, verb tunggal **is** (A + S)."),
        correctOne("eac3-l5-c8", ["She is interested in learning new languages.", "She is interested in to learn new languages.", "She is interested on learning new languages.", "She is interesting in learning new languages."], "interested **in** + V-ing (P); *interesting* salah bentuk (W)."),
        correctOne("eac3-l5-c9", ["If it rains tomorrow, we will cancel the picnic.", "If it will rain tomorrow, we will cancel the picnic.", "If it rained tomorrow, we will cancel the picnic.", "If it rains tomorrow, we would cancelled the picnic."], "Conditional type 1: *if* + simple present, *will* + V1 (T)."),
      ],
    },
    // ------------------------------------------------------------------ 6
    {
      id: "eac3-l6",
      skill: "reading",
      title: "Part B: Cause and Effect",
      summary: "Signal words for causes and effects, and how to answer “why” and “as a result” questions.",
      minutes: 15,
      sections: [
        {
          title: "Signal words",
          blocks: [
            text("Di Bagian B sering ada soal *apa penyebabnya?* atau *apa akibatnya?* dari suatu kejadian di bacaan."),
            table(
              ["Signals a…", "Words"],
              [
                ["**Cause** (sebab)", "because, since, as, due to"],
                ["**Effect** (akibat)", "so, therefore, as a result, consequently, thus"],
              ]
            ),
            pics([["rain", "cause: heavy rain"], ["bus", "effect: the bus was late"]]),
          ],
        },
        {
          title: "Reading for cause and effect",
          blocks: [
            examples([
              { right: "Because the road was flooded, the bus arrived late.", note: "Sebab: jalan banjir. Akibat: bus terlambat." },
              { right: "She studied hard; as a result, she became fluent in English.", note: "Sebab: rajin belajar. Akibat: jadi fasih." },
            ]),
            tip("**Strategi:** begitu ketemu kata penanda, **garis bawahi** — itu biasanya kunci jawaban. Soal *why* mencari **sebab**; soal *what happened as a result* mencari **akibat**."),
            tryIt(pick("eac3-l6-try1", "“The meeting was cancelled because the manager was sick.” What was the cause?", ["The manager was sick.", "The meeting was cancelled.", "The room was full.", "Nobody came."], 0, "Setelah *because* → sebab.")),
          ],
        },
      ],
      checkpoint: [
        pick("eac3-l6-c1", "“Because the road was flooded, the bus arrived late.” What was the cause?", ["The road was flooded.", "The bus was late.", "The driver was slow.", "The passengers complained."], 0, "*Because* menandai sebab: jalan banjir."),
        pick("eac3-l6-c2", "“She practiced every day; as a result, she became fluent in English.” What was the effect?", ["She became fluent in English.", "She practiced every day.", "She stopped practicing.", "She found English difficult."], 0, "*As a result* menandai akibat: jadi fasih."),
        pick("eac3-l6-c3", "Which word signals a cause–effect relationship?", ["therefore", "however", "meanwhile", "also"], 0, "*Therefore* = oleh karena itu (akibat)."),
        pick("eac3-l6-c4", "Which word signals a CAUSE?", ["due to", "consequently", "thus", "so"], 0, "*Due to* = disebabkan oleh. Sisanya penanda akibat."),
        pick("eac3-l6-c5", "“The road was blocked; ___, we took another route.”", ["therefore", "because", "although", "but"], 0, "Jalan ditutup → **akibatnya** lewat rute lain.", { hots: true }),
      ],
    },
    // ------------------------------------------------------------------ 7
    {
      id: "eac3-l7",
      skill: "reading",
      title: "Part B: Idioms and Figurative Language",
      summary: "Common idioms, simile, metaphor and personification — never translate word for word.",
      minutes: 20,
      passages: [DINA],
      sections: [
        {
          title: "Idioms you will meet",
          blocks: [
            vocab(
              [
                ["cost an arm and a leg", "sangat mahal", "price-tag", "This laptop cost an arm and a leg."],
                ["let the cat out of the bag", "membocorkan rahasia", "cat-bag", "Please don't let the cat out of the bag."],
                ["a piece of cake", "sangat mudah", "cake-slice", "The quiz was a piece of cake."],
                ["hit the books", "belajar dengan giat", "hit-books", "I need to hit the books tonight."],
                ["under the weather", "kurang sehat", "under-weather", "She feels under the weather today."],
                ["turn over a new leaf", "memulai lembaran baru / berubah jadi lebih baik", "new-leaf", "He decided to turn over a new leaf."],
                ["break the ice", "mencairkan suasana / memulai obrolan", "ice-break", "A funny game helped break the ice."],
                ["call it a day", "menyudahi pekerjaan/kegiatan", "evening", "We were tired, so we called it a day."],
                ["hit the sack", "pergi tidur", "bed", "I'm going to hit the sack early."],
                ["keep an eye on", "mengawasi", "eye", "Keep an eye on your time during the test."],
              ],
              "Tap a card to hear it"
            ),
            warn("Aturan baku: **jangan menerjemahkan idiom kata per kata**. Lihat kalimat sebelum dan sesudahnya untuk menebak makna keseluruhan."),
          ],
        },
        {
          title: "Figurative language",
          blocks: [
            table(
              ["Type", "How it works", "Example"],
              [
                ["**Simile**", "membandingkan dengan **like / as**", "His voice was as smooth as silk. / as brave as a lion"],
                ["**Metaphor**", "membandingkan langsung **tanpa** like/as", "The classroom was a zoo. / Time is money."],
                ["**Personification**", "benda mati diberi sifat manusia", "The stars winked at us from the sky. / The wind whispered."],
              ]
            ),
            pics([["lion", "simile: as brave as a lion"], ["time-money", "metaphor: time is money"], ["star-wink", "personification: the stars winked"]]),
            tryIt(pick("eac3-l7-try1", "“The classroom was a zoo.” This is an example of…", ["metaphor", "simile", "personification", "an idiom about animals"], 0, "Perbandingan langsung tanpa *like/as* → metaphor (kelasnya sangat ribut).")),
          ],
        },
        {
          title: "Integrated mini passage",
          blocks: [
            text("Passage ini menggabungkan **cause-effect** dan **idiom**. Baca, lalu jawab bagian akhir checkpoint."),
            { type: "passage", passage: DINA },
          ],
        },
      ],
      checkpoint: [
        pick("eac3-l7-c1", "“This laptop cost an arm and a leg.” It means the laptop was…", ["very expensive", "very cheap", "broken", "free"], 0, "*Cost an arm and a leg* = sangat mahal.", { image: "price-tag" }),
        pick("eac3-l7-c2", "“Please don't let the cat out of the bag.” It means…", ["don't tell the secret", "don't be late", "don't bring animals", "don't be angry"], 0, "Jangan membocorkan rahasia.", { image: "cat-bag" }),
        pick("eac3-l7-c3", "“The stars winked at us from the sky.” This is an example of…", ["personification", "simile", "metaphor", "an idiom"], 0, "Bintang diberi sifat manusia (mengedip).", { image: "star-wink" }),
        pick("eac3-l7-c4", "“His voice was as smooth as silk.” This is an example of…", ["simile", "metaphor", "personification", "an idiom"], 0, "Membandingkan dengan **as … as** → simile."),
        pick("eac3-l7-c5", "What caused Dina to get soaked?", ["It rained heavily and she forgot her umbrella.", "She jumped into a pool.", "She spilled water on herself.", "She went swimming."], 0, "Baris 1–2: lupa payung + hujan deras.", { passageId: "eac3-dina" }),
        pick("eac3-l7-c6", "What does “looked like a drowned rat” in line 3 mean?", ["She looked extremely wet and messy.", "She looked happy.", "She looked like an animal.", "She looked sick."], 0, "Idiom: sangat basah kuyup dan berantakan.", { passageId: "eac3-dina" }),
        pick("eac3-l7-c7", "What was the effect of Dina studying that evening?", ["She passed the test with a great score.", "She failed the test.", "She got sick.", "She forgot the test."], 0, "Baris 5: *As a result, she passed the test with a great score.*", { passageId: "eac3-dina", hots: true }),
        pick("eac3-l7-c8", "In line 4, “hit the books” means Dina…", ["studied hard", "threw her books", "went to the library", "fell asleep"], 0, "*Hit the books* = belajar dengan giat.", { passageId: "eac3-dina" }),
      ],
    },
    // ------------------------------------------------------------------ 8
    {
      id: "eac3-l8",
      skill: "structure",
      title: "Part A: Relative Clause “that”",
      summary: "“That” can replace who or which in defining clauses — and the verb still agrees with the noun.",
      minutes: 10,
      sections: [
        {
          title: "that = who / which",
          blocks: [
            text("**That** bisa menggantikan **who** (orang) atau **which** (benda) dalam klausa yang **membatasi** (defining clause) — dan sangat umum dipakai di soal."),
            examples([
              { right: "This is the restaurant that serves the best noodles in town.", note: "that = which" },
              { right: "The teacher that taught us last year has moved.", note: "that = who" },
              { right: "I lost the pen that my father gave me.", note: "that = which" },
              { right: "The woman that lives next door is a doctor.", note: "that = who" },
            ]),
            tip("*That* **tidak** dipakai setelah tanda koma (klausa tambahan info) — tapi untuk level Preliminary, cukup fokus ke penggunaan dasar di atas."),
          ],
        },
        {
          title: "Agreement after the clause",
          blocks: [
            warn("Verb setelah relative clause mengikuti **noun yang diterangkan**, bukan kata terdekat: *The book that I borrowed **was** interesting.* (bukan *were*)"),
            examples([
              { wrong: "The book that I borrowed were interesting.", right: "The book that I borrowed was interesting.", note: "Subjeknya *the book* (tunggal)." },
              { wrong: "The book who I borrowed was interesting.", right: "The book that I borrowed was interesting.", note: "*Who* hanya untuk orang." },
            ]),
            tryIt(pick("eac3-l8-try1", "The bag ___ I bought yesterday is very expensive.", ["that", "who", "whose", "what"], 0, "Benda → **that** (atau which).", { image: "bag" })),
          ],
        },
      ],
      checkpoint: [
        pick("eac3-l8-c1", "This is the restaurant ___ serves the best noodles in town.", ["that", "who", "whom", "whose"], 0, "Benda (restaurant) → **that**.", { image: "restaurant" }),
        pick("eac3-l8-c2", "The teacher ___ taught us last year has moved to another school.", ["that", "which", "whose", "whom"], 0, "Orang → **that** (= who). *Which* salah untuk orang."),
        pick("eac3-l8-c3", "I lost the pen ___ my father gave me.", ["that", "who", "whom", "whose"], 0, "Benda → **that**."),
        correctOne("eac3-l8-c4", ["The book that I borrowed from the library was very interesting.", "The book that I borrowed from the library were very interesting.", "The book who I borrowed from the library was very interesting.", "The book that I borrowed from the library was very interestingly."], "Subjek *book* tunggal → was; *who* untuk orang; setelah *was* → adjective."),
        pick("eac3-l8-c5", "The woman ___ lives next door is a doctor.", ["that", "which", "whose", "where"], 0, "Orang → **that**. *Which* salah karena woman = orang.", { image: "doctor" }),
      ],
    },
    // ------------------------------------------------------------------ 9
    {
      id: "eac3-l9",
      skill: "structure",
      title: "Part A: The Seven Most Common Traps",
      summary: "Agreement, time signals, irregular verbs, countable nouns, word form, conjunction logic, synonyms and antonyms.",
      minutes: 25,
      sections: [
        {
          title: "Seven traps",
          blocks: [
            table(
              ["#", "Trap", "Quick rule"],
              [
                ["1", "**Subject–verb agreement**", "he/she/it + verb-s. *Each/every/everyone* + singular. *There is/are* mengikuti noun **sesudahnya**."],
                ["2", "**Tense time signals**", "yesterday/last/ago → past. now/Look! → continuous. every/usually → present. since/for (masih berlanjut) → present perfect."],
                ["3", "**Irregular verbs**", "Wajib hafal (tabel di bawah)."],
                ["4", "**Countable vs uncountable**", "much/little + uncountable; many/few + countable; furniture, information, advice tidak berbentuk jamak."],
                ["5", "**Word form**", "Setelah *the/her/his* → noun. Sebelum noun → adjective. Menerangkan verb → adverb (-ly). Setelah *is/are/feel* → adjective."],
                ["6", "**Conjunction logic**", "because (alasan), so/therefore (akibat), but/although/even though/however (kontras). *Although* + klausa. *However* biasanya didahului titik koma/titik dan diikuti koma."],
                ["7", "**Synonyms–antonyms**", "Pahami dari konteks kalimat dulu; awalan un-/in-/dis-/im- sering membentuk antonim."],
              ]
            ),
            examples([
              { wrong: "Although she was tired, but she finished the report.", right: "Although she was tired, she finished the report.", note: "*Although* dan *but* tidak dipakai bersamaan." },
              { wrong: "He worked hard, however he failed.", right: "He worked hard; however, he failed.", note: "Tanda baca *however*." },
            ]),
          ],
        },
        {
          title: "Irregular verbs",
          blocks: [
            text("Hafalkan 3 bentuknya. Kuis diri sendiri **5 verb per hari**."),
            table(
              ["V1", "V2", "V3"],
              [
                ["begin", "began", "begun"],
                ["break", "broke", "broken"],
                ["bring", "brought", "brought"],
                ["buy", "bought", "bought"],
                ["choose", "chose", "chosen"],
                ["do", "did", "done"],
                ["drink", "drank", "drunk"],
                ["eat", "ate", "eaten"],
                ["forget", "forgot", "forgotten"],
                ["give", "gave", "given"],
                ["go", "went", "gone"],
                ["know", "knew", "known"],
                ["leave", "left", "left"],
                ["make", "made", "made"],
                ["run", "ran", "run"],
                ["see", "saw", "seen"],
                ["sing", "sang", "sung"],
                ["speak", "spoke", "spoken"],
                ["take", "took", "taken"],
                ["teach", "taught", "taught"],
                ["understand", "understood", "understood"],
                ["win", "won", "won"],
                ["write", "wrote", "written"],
              ]
            ),
            tryIt(match("eac3-l9-try1", "Match V1 with V3.", [["eat", "eaten"], ["write", "written"], ["teach", "taught"], ["choose", "chosen"]], "Bentuk V3 tidak beraturan.")),
            tryIt(fill("eac3-l9-try2", "Type the V2 of “bring”.", "She", "her notes to class yesterday.", ["brought"], "bring → **brought** → brought.")),
          ],
        },
      ],
      checkpoint: [
        pick("eac3-l9-c1", "Each of the students ___ a certificate at the end of the course.", ["receives", "receive", "receiving", "are receiving"], 0, "*Each* + verb tunggal."),
        pick("eac3-l9-c2", "There ___ several books on the shelf.", ["are", "is", "be", "has"], 0, "*Books* (jamak) → **are**."),
        pick("eac3-l9-c3", "Yesterday, my parents ___ me a new bicycle.", ["bought", "buy", "buys", "buying"], 0, "*Yesterday* → past; buy → **bought**.", { image: "bicycle" }),
        pick("eac3-l9-c4", "Her ___ helped me finish the project on time.", ["kindness", "kind", "kindly", "kindest"], 0, "Setelah *her* → noun **kindness**."),
        pick("eac3-l9-c5", "The teacher praised him for his ___ performance.", ["impressive", "impress", "impressively", "impression"], 0, "Sebelum noun *performance* → adjective."),
        pick("eac3-l9-c6", "He worked very hard; ___, he failed the exam.", ["however", "therefore", "because", "so"], 0, "Kontras (kerja keras, tapi gagal) → **however**."),
        pick("eac3-l9-c7", "___ he was very tired, he finished the report.", ["Even though", "Because", "So", "Therefore"], 0, "Kontras (capek, tapi selesai) → **Even though**."),
        pick("eac3-l9-c8", "Choose the synonym of “ancient”.", ["old", "modern", "fresh", "tiny"], 0, "*Ancient* ≈ **old**."),
        pick("eac3-l9-c9", "Choose the antonym of “victory”.", ["defeat", "success", "triumph", "win"], 0, "Lawan *victory* → **defeat**."),
        pick("eac3-l9-c10", "We have ___ homework today, so we can go out.", ["little", "many", "a few", "several"], 0, "*Homework* uncountable; *little* = hampir tidak ada → jadi bisa keluar.", { hots: true }),
      ],
    },
    // ------------------------------------------------------------------ 10
    {
      id: "eac3-l10",
      skill: "structure",
      title: "Part A Bonus: Passive, Future and Present Perfect",
      summary: "Three structures that often appear in Part A, plus since vs for.",
      minutes: 10,
      sections: [
        {
          title: "Three structures",
          blocks: [
            table(
              ["Structure", "Formula", "Signals / use", "Example"],
              [
                ["**Passive**", "be + V3 (+ by pelaku)", "objek jadi subjek", "The bridge **was built** in 1990. English **is spoken** in many countries. The window was broken by the ball."],
                ["**Future**", "will + V1 / be going to + V1", "prediksi/keputusan spontan (will), rencana (going to); tomorrow, next week, if + present", "We **will take** a trip next year."],
                ["**Present perfect**", "have/has + V3", "pengalaman / baru selesai; since, for, already, just, ever, never", "She **has seen** this movie three times."],
              ]
            ),
            warn("Present perfect **tidak** dipakai dengan *yesterday / last week / ago*. *She has visited her grandmother last week* ✘"),
            pics([["timeline", "present perfect links past → now"]]),
          ],
        },
        {
          title: "since vs for",
          blocks: [
            table(
              ["Word", "Followed by", "Examples"],
              [
                ["**since**", "titik waktu / klausa awal", "since 2020, since Monday, since we were in elementary school"],
                ["**for**", "durasi", "for three years, for an hour, for five years"],
              ]
            ),
            tryIt(pick("eac3-l10-try1", "They have lived in Pontianak ___ five years.", ["for", "since", "ago", "during"], 0, "*Five years* = durasi → **for**.")),
          ],
        },
      ],
      checkpoint: [
        pick("eac3-l10-c1", "This bridge ___ in 1990.", ["was built", "built", "is building", "builds"], 0, "Pasif: *was* + V3."),
        pick("eac3-l10-c2", "Next year, we ___ a trip to Japan.", ["will take", "took", "take", "are took"], 0, "*Next year* → future: will + V1.", { image: "plane" }),
        pick("eac3-l10-c3", "English ___ in many countries around the world.", ["is spoken", "speaks", "speaking", "is speaking"], 0, "Pasif present: *is* + V3.", { image: "earth" }),
        pick("eac3-l10-c4", "She ___ this movie three times.", ["has seen", "see", "saw", "seeing"], 0, "Pengalaman tanpa waktu spesifik → present perfect."),
        pick("eac3-l10-c5", "I have known her ___ we were in elementary school.", ["since", "for", "ago", "during"], 0, "Titik awal (klausa) → **since**."),
        fill("eac3-l10-c6", "Type the missing word (since / for).", "We have studied together", "two hours.", ["for"], "Durasi → **for**.", { hots: true }),
      ],
    },
    // ------------------------------------------------------------------ 11
    {
      id: "eac3-l11",
      skill: "structure",
      title: "Drill Set: Parts D and A",
      summary: "30 practice questions in four groups. Do them over 3–4 days with a timer.",
      sections: [
        {
          title: "How to drill",
          blocks: [
            pics([["stopwatch", "use a timer"], ["calendar", "3–4 days"]]),
            text("Kerjakan **bertahap 3–4 hari**, jangan sekaligus. Pakai timer, jangan lihat kunci sebelum selesai.\n\n1. D-1 Unscrambling — 6 soal\n2. D-2 Idiomatic preposition — 8 soal\n3. D-3 Multi-error — 6 soal\n4. Bagian A — 10 soal"),
          ],
        },
        {
          title: "After the drill",
          blocks: [
            tip("Untuk tiap soal salah, tulis satu baris di error log-mu: **nomor → topik → penyebab**. Kalau mayoritas di kategori yang sama (misalnya tenses), ulang **materi itu saja**, jangan semua."),
          ],
        },
      ],
      checkpoint: [
        // D-1
        unscramble("eac3-dr-1", ["with her friends", "to school", "walks", "usually", "she"], ["5-4-3-2-1", "5-3-4-2-1", "4-5-3-2-1", "5-4-2-3-1"], "*She usually walks to school with her friends.* Adverb sebelum verb."),
        unscramble("eac3-dr-2", ["since last month", "closed", "the museum", "has been"], ["3-4-2-1", "3-2-4-1", "4-3-2-1", "3-4-1-2"], "*The museum has been closed since last month.* Present perfect (pasif) + since."),
        unscramble("eac3-dr-3", ["a football match", "misses", "he", "hardly", "ever"], ["3-4-5-2-1", "3-2-4-5-1", "4-5-3-2-1", "3-4-2-5-1"], "*He hardly ever misses a football match.* *Hardly ever* = adverb frekuensi, sebelum verb."),
        unscramble("eac3-dr-4", ["by the students", "was cleaned", "the classroom", "before the party"], ["3-2-1-4", "3-1-2-4", "2-3-1-4", "1-3-2-4"], "*The classroom was cleaned by the students before the party.* Pasif + pelaku + waktu."),
        unscramble("eac3-dr-5", ["which", "the book", "is very interesting", "I borrowed", "yesterday"], ["2-1-4-5-3", "2-1-3-4-5", "2-4-1-5-3", "2-1-5-4-3"], "*The book which I borrowed yesterday is very interesting.* Klausa menempel di noun, verb utama di akhir."),
        unscramble("eac3-dr-6", ["what time", "could you tell me", "starts", "the meeting"], ["2-1-4-3", "2-1-3-4", "1-2-4-3", "2-4-1-3"], "*Could you tell me what time the meeting starts?* Indirect question tanpa inversi."),
        // D-2
        pick("eac3-dr-7", "She is jealous ___ her sister's success.", ["of", "for", "at", "on"], 0, "jealous **of**."),
        pick("eac3-dr-8", "The teacher insisted ___ silence during the exam.", ["on", "in", "at", "for"], 0, "insist **on**."),
        pick("eac3-dr-9", "The two brothers are very different ___ each other.", ["from", "with", "at", "on"], 0, "different **from**."),
        pick("eac3-dr-10", "He was accused ___ cheating in the test.", ["of", "for", "at", "with"], 0, "accuse (someone) **of**."),
        pick("eac3-dr-11", "Our team participated ___ the national competition.", ["in", "on", "at", "for"], 0, "participate **in**."),
        pick("eac3-dr-12", "I am not aware ___ any changes to the schedule.", ["of", "on", "at", "for"], 0, "aware **of**."),
        pick("eac3-dr-13", "The teacher congratulated her ___ winning first place.", ["on", "for", "at", "of"], 0, "congratulate (someone) **on**.", { image: "trophy" }),
        pick("eac3-dr-14", "This letter refers ___ your application last month.", ["to", "at", "on", "for"], 0, "refer **to**.", { image: "envelope" }),
        // D-3
        correctOne("eac3-dr-15", ["Every student in my class has finished the assignment.", "Every students in my class have finished the assignment.", "Every student in my class have finished the assignment.", "Every students in my class has finished the assignment."], "*Every* + noun tunggal + verb tunggal (**has**)."),
        correctOne("eac3-dr-16", ["I am looking forward to seeing you next week.", "I look forward to see you next week.", "I am looking forward see you next week.", "I looking forward to seeing you next week."], "look forward **to** + V-ing; butuh *am*."),
        correctOne("eac3-dr-17", ["She is taller than her cousin.", "She is more taller than her cousin.", "She is tallest than her cousin.", "She is more tall than her cousin."], "Comparative kata pendek: **taller than**, tanpa *more*."),
        findError("eac3-dr-18", "My uncle, [A:who lives in Surabaya], [B:have visited] [C:us twice] [D:this year].", "B", "has visited", "Subjek *my uncle* tunggal → **has visited**."),
        findError("eac3-dr-19", "The children [A:were playing] [B:happy] [C:in the garden] [D:when it started to rain].", "B", "happily", "Menerangkan verb *playing* → adverb **happily**."),
        findError("eac3-dr-20", "Yesterday, [A:my sister] [B:is buying] [C:a new dress] [D:at the mall].", "B", "bought", "*Yesterday* → simple past **bought**."),
        // Part A
        pick("eac3-dr-21", "The furniture in this room ___ very old, so we will replace it.", ["is", "are", "were", "be"], 0, "*Furniture* uncountable → verb tunggal **is**.", { image: "sofa" }),
        pick("eac3-dr-22", "My grandfather ___ every morning at 5 o'clock.", ["wakes up", "wake up", "waking up", "woke up"], 0, "Kebiasaan + he → **wakes up**.", { image: "alarm" }),
        pick("eac3-dr-23", "When I was a child, I ___ to the beach every summer.", ["went", "go", "goes", "going"], 0, "*When I was a child* → masa lalu: **went**."),
        pick("eac3-dr-24", "She spoke ___ so that everyone could hear her.", ["loudly", "loud", "loudness", "louden"], 0, "Menerangkan verb *spoke* → adverb."),
        pick("eac3-dr-25", "The ___ of this city is over two million.", ["population", "populate", "populated", "populous"], 0, "Setelah *the* → noun."),
        pick("eac3-dr-26", "He didn't come to school ___ he was sick.", ["because", "although", "so", "but"], 0, "Sakit = alasan → **because**."),
        pick("eac3-dr-27", "She is very ___, so everyone trusts her.", ["honest", "honesty", "honestly", "honor"], 0, "Setelah *is very* → adjective."),
        pick("eac3-dr-28", "Choose the antonym of “ancient”.", ["modern", "old", "historic", "traditional"], 0, "Lawan *ancient* → **modern**."),
        pick("eac3-dr-29", "Choose the synonym of “assist”.", ["help", "ignore", "prevent", "delay"], 0, "*Assist* = **help**."),
        pick("eac3-dr-30", "This is the ___ book I have ever read.", ["most interesting", "interesting", "more interesting", "interestingest"], 0, "*The* + superlative kata panjang."),
      ],
    },
    // ------------------------------------------------------------------ 12
    {
      id: "eac3-l12",
      skill: "structure",
      title: "Lab D and the Part D Retest",
      summary: "10 extra Part D questions, then a 5-question retest (8 minutes, target 4/5).",
      sections: [
        {
          title: "Lab D",
          blocks: [
            pics([["lightbulb", "Part D"], ["magnifier", "check every option"]]),
            text("**Lab D Tambahan (10 soal):** kerjakan dalam 2 hari, pakai timer, lalu bandingkan dengan kunci. Isinya 4 soal unscrambling, 3 soal idiomatic preposition, dan 3 soal multi-error."),
          ],
        },
        {
          title: "Part D Retest",
          blocks: [
            text("**Retest Bagian D (5 soal terakhir di checkpoint ini):** kerjakan ±1 minggu setelah mempelajari Bagian D. Waktu **8 menit**, tanpa melihat catatan. **Target: minimal 4 dari 5.**"),
            table(
              ["Retest result", "What to do"],
              [
                ["4–5 correct", "Target tercapai — jaga ritme dengan latihan singkat tiap hari."],
                ["3 correct", "Ulang materi pola yang salah, kerjakan ulang Drill Set bagian itu."],
                ["0–2 correct", "Jadwalkan sesi tambahan singkat (30–40 menit) khusus Bagian D sebelum hari-H."],
              ]
            ),
          ],
        },
      ],
      checkpoint: [
        // Lab D
        unscramble("eac3-lab-1", ["is very patient", "the teacher", "explained the lesson", "who"], ["2-4-3-1", "2-4-1-3", "2-1-4-3", "4-2-3-1"], "*The teacher who explained the lesson is very patient.* Relative clause menempel di noun."),
        unscramble("eac3-lab-2", ["always", "are", "the stairs", "crowded", "in the morning"], ["3-2-1-4-5", "3-1-2-4-5", "1-3-2-4-5", "3-2-4-1-5"], "*The stairs are always crowded in the morning.* Adverb frekuensi setelah *are*."),
        unscramble("eac3-lab-3", ["that", "he could not speak", "the runner", "was so exhausted"], ["3-4-1-2", "3-1-4-2", "1-3-4-2", "3-4-2-1"], "*The runner was so exhausted that he could not speak.* Pola so … that."),
        unscramble("eac3-lab-4", ["me", "could you tell", "the post office", "is", "where"], ["2-1-5-3-4", "2-1-5-4-3", "5-2-1-3-4", "2-5-1-3-4"], "*Could you tell me where the post office is?* Indirect question tanpa inversi.", { image: "post-office" }),
        pick("eac3-lab-5", "She is tired ___ doing the same task every day.", ["of", "at", "on", "with"], 0, "tired **of**."),
        pick("eac3-lab-6", "He relied ___ his notes during the discussion.", ["on", "at", "for", "of"], 0, "rely **on**."),
        pick("eac3-lab-7", "The teacher thanked the students ___ their help.", ["for", "to", "of", "at"], 0, "thank (someone) **for**."),
        correctOne("eac3-lab-8", ["Every morning, my father drinks coffee and reads the newspaper.", "Every morning, my father drink coffee and read the newspaper.", "Every morning, my father drinks coffee and reading the newspaper.", "Every morning, my fathers drinks coffee and reads the newspaper."], "Kedua verb harus **paralel** dan sesuai subjek tunggal: drinks … reads."),
        correctOne("eac3-lab-9", ["The book that I borrowed from the library was very interesting.", "The book that I borrowed from the library were very interesting.", "The book who I borrowed from the library was very interesting.", "The book that I borrowed from the library was very interestingly."], "*Book* tunggal → was; *who* untuk orang; setelah *was* → adjective."),
        correctOne("eac3-lab-10", ["Although she was tired, she finished the report.", "Although she was tired, but she finished the report.", "Although she tired, she finished the report.", "Although she was tired, she finish the report."], "*Although* dan *but* tidak dipakai bersamaan; butuh *was*; verb past *finished*."),
        // Retest
        unscramble("eac3-re-1", ["finishes", "after dinner", "he", "his homework", "always"], ["3-5-1-4-2", "3-1-5-4-2", "5-3-1-4-2", "3-5-1-2-4"], "*He always finishes his homework after dinner.* Adverb sebelum verb; jangan pisahkan verb dari objeknya."),
        unscramble("eac3-re-2", ["was praised", "the student", "for her honesty", "who found the wallet"], ["2-4-1-3", "2-1-4-3", "4-2-1-3", "2-4-3-1"], "*The student who found the wallet was praised for her honesty.* Relative clause menempel di noun, lalu verb utama."),
        pick("eac3-re-3", "He is capable ___ solving difficult problems.", ["of", "in", "at", "for"], 0, "capable **of**.", { hots: true }),
        pick("eac3-re-4", "My grandmother suffers ___ back pain.", ["from", "of", "with", "on"], 0, "suffer **from**.", { hots: true, image: "grandmother" }),
        correctOne("eac3-re-5", ["She doesn't understand the lesson because it is difficult.", "She don't understand the lesson because it are difficult.", "She doesn't understands the lesson because it is difficult.", "She doesn't understand the lesson because it is difficultly."], "doesn't + V1; *it is*; setelah *is* → adjective."),
      ],
    },
    // ------------------------------------------------------------------ 13
    {
      id: "eac3-l13",
      skill: "reading",
      title: "Exam-Day Strategy and Sprint Plan",
      summary: "Time plan for 60 minutes, golden rules, the daily sprint plan before the Preliminary, and checklists.",
      minutes: 15,
      sections: [
        {
          title: "Time plan for 60 minutes",
          blocks: [
            pics([["stopwatch", "60 min"], ["speech-bubbles", "C first"], ["checklist", "check again"]]),
            text("Kalau kamu kuat di B dan C, kerjakan dua bagian itu dulu untuk **“menabung” waktu dan poin**, lalu alihkan sisanya ke D dan A yang butuh mikir lebih lama:"),
            table(
              ["Part", "Suggested time", "Note"],
              [
                ["C (5 questions)", "±4 minutes", "Kerjakan dulu, poin aman"],
                ["B (10 questions)", "±14 minutes", "Skim passage dulu, cari bukti di teks"],
                ["A (20 questions)", "±18 minutes", "Tandai soal ragu, lanjut dulu"],
                ["D (5 questions)", "±18 minutes", "Eliminasi opsi, pakai STAPW"],
                ["Check again", "±6 minutes", "Kembali ke soal bertanda"],
              ]
            ),
          ],
        },
        {
          title: "Golden rules",
          blocks: [
            text(
              "1. **Semua soal harus terisi.** Salah atau kosong sama-sama 0 poin, tidak ada pengurangan nilai.\n2. Soal yang bikin macet **lebih dari 1,5 menit**: tandai, pindah, kembali nanti.\n3. Unscrambling: eliminasi dulu lewat angka pertama opsi (subjek harus di depan), lalu cek posisi adverb.\n4. Preposisi: jangan terjemahkan dari bahasa Indonesia, ingat pasangan katanya.\n5. Jangan ganti jawaban tanpa alasan grammar yang jelas.\n6. Peserta mendapat **kertas buram** untuk coretan. Gunakan untuk menomori ulang chunk di soal unscrambling."
            ),
          ],
        },
        {
          title: "Daily sprint plan",
          blocks: [
            text("Hari-H bisa **Sabtu 17 Oktober** atau **Sabtu 24 Oktober** (ditentukan panitia, cek **s.id/eachampionship**). Rencana untuk skenario terdekat:"),
            table(
              ["Day", "Focus", "Time"],
              [
                ["Mon 12 Oct", "Rapid review + Mock Test #2 + bedah hasil", "120 min"],
                ["Tue 13 Oct", "Lab D (soal 1–5) + 12 irregular verbs pertama", "40 min"],
                ["Wed 14 Oct", "Lab D (soal 6–10) + Drill Set Bagian A yang belum selesai", "40 min"],
                ["Thu 15 Oct", "Ulang semua soal yang salah di Mock #1 dan #2 (tanpa lihat kunci) + 1 passage reading", "45 min"],
                ["Fri 16 Oct (H-1)", "Ringan saja: baca ulang cheat sheet, STAPW, 6 pola unscrambling. Siapkan alat tulis & perangkat. Tidur cukup.", "20 min"],
                ["Sat 17 Oct", "PRELIMINARY ROUND (jika jalur umum 17 Okt)", "60 min exam"],
              ]
            ),
            text("**Kalau hari-H 24 Oktober**, tambahkan:\n\n- **Sen 19 Okt:** kerjakan ulang Mock #1 dengan timer, lalu bandingkan skor dengan percobaan pertama\n- **Sel–Kam 20–22 Okt:** ulang topik yang masih salah, 2 passage reading per hari\n- **Jum 23 Okt:** ringan, sama seperti H-1 di atas\n\n*Butuh Mock Test #3 dengan soal baru? Minta ke gurumu.*"),
          ],
        },
        {
          title: "Checklists",
          blocks: [
            text(
              "**Malam sebelum ujian:**\n\n- ☐ Perangkat, koneksi internet, dan alat tulis (pulpen/pensil) siap sesuai ketentuan\n- ☐ Cek email/info panitia untuk akses dan teknis ujian\n- ☐ Ikut **Technical Briefing** (19 Sept atau 3 Okt) supaya paham platform ujian\n- ☐ Review ringan saja (catatan idiomatic preposition & pola dialog), **tidak** belajar materi baru\n- ☐ Tidur cukup, jangan begadang"
            ),
            text(
              "**Progress check modul ini:**\n\n- ☐ Error log sudah diisi dan topik terlemah teridentifikasi\n- ☐ Bisa menjelaskan 6 pola unscrambling dan STAPW dengan kata-katamu sendiri\n- ☐ Idiomatic preposition: minimal 25 pasangan hafal\n- ☐ Irregular verbs: minimal 20 dari 23 dikuasai 3 bentuknya\n- ☐ Drill Set selesai dan Retest D ≥ 4/5\n- ☐ Mock Test #2 dikerjakan dan skor per bagian tercatat"
            ),
            tip("**Setelah ujian:** catat skor Mock Test dan hasil Preliminary per bagian, lalu kabari gurumu. **Modul 4** disusun untuk memperkuat bagian yang paling perlu menjelang **Regional Round**."),
          ],
        },
      ],
      checkpoint: [
        pick("eac3-l13-c1", "You are strong in Parts B and C. Which part should you do first?", ["Part C", "Part D", "Part A", "It doesn't matter."], 0, "C cepat (±4 menit) dan poinnya aman — tabung waktu untuk D dan A."),
        pick("eac3-l13-c2", "You have been stuck on one question for two minutes. What should you do?", ["Mark it, move on, and come back later.", "Keep working on it until you solve it.", "Leave it empty for good.", "Change all your previous answers."], 0, "Lebih dari 1,5 menit → tandai, pindah, kembali nanti."),
        pick("eac3-l13-c3", "When should you change an answer?", ["Only when you have a clear grammar reason.", "Whenever you feel unsure.", "Never, under any circumstances.", "Always change your first answer."], 0, "Ganti jawaban hanya dengan alasan grammar yang jelas, bukan firasat."),
        pick("eac3-l13-c4", "What is the best plan for the night before the exam?", ["Light review and enough sleep", "Learn three new topics", "Do two full mock tests", "Stay up late memorising"], 0, "H-1: review ringan, siapkan alat, tidur cukup.", { image: "sleep" }),
        pick("eac3-l13-c5", "In an unscrambling question, what should you check first to eliminate options?", ["Which number can start the sentence (the subject)", "The longest chunk", "The last option", "Whether the options are in alphabetical order"], 0, "Subjek harus di depan → coret opsi yang diawali angka lain.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "eac3-mock2",
    title: "Mock Test #2 — 40 Questions",
    passPercent: 80,
    parts: PRELIM_PARTS,
    passages: [DIMAS, BEES],
    questions: [
      // Part A
      pick("eac3-m2-1", "Part A · The new library ___ by the local government last year.", ["was built", "built", "has built", "is building"], 0, "Pasif: be + V3. Perpustakaan *dibangun* oleh pemerintah."),
      pick("eac3-m2-2", "Part A · The windows ___ by the cleaner every Friday.", ["are cleaned", "clean", "cleans", "cleaning"], 0, "Pasif present: *are* + V3; pelaku dengan *by*."),
      pick("eac3-m2-3", "Part A · I have known her ___ we were in elementary school.", ["since", "for", "ago", "during"], 0, "*Since* + titik waktu/klausa awal."),
      pick("eac3-m2-4", "Part A · They have lived in Pontianak ___ five years.", ["for", "since", "ago", "during"], 0, "*For* + durasi."),
      pick("eac3-m2-5", "Part A · We ___ a picnic if the weather is nice tomorrow.", ["will have", "have", "had", "would had"], 0, "If + present → **will** + V1."),
      pick("eac3-m2-6", "Part A · The ___ of the new student impressed all the teachers.", ["confidence", "confident", "confidently", "confide"], 0, "Setelah *the* → noun."),
      pick("eac3-m2-7", "Part A · She answered all the questions ___.", ["correctly", "correct", "correction", "corrected"], 0, "Menerangkan verb *answered* → adverb."),
      pick("eac3-m2-8", "Part A · This exam was ___ than the one last month, so most students finished early.", ["easier", "easy", "easiest", "more easy"], 0, "Comparative -y → **easier** + than."),
      pick("eac3-m2-9", "Part A · That was the ___ film I have ever seen.", ["worst", "bad", "worse", "baddest"], 0, "*The* + superlative tidak beraturan dari *bad*."),
      pick("eac3-m2-10", "Part A · Last night, my uncle ___ me a long letter.", ["wrote", "write", "writes", "written"], 0, "*Last night* → V2 **wrote**."),
      pick("eac3-m2-11", "Part A · The woman ___ lives next door is a doctor.", ["that", "which", "whose", "where"], 0, "*That* boleh untuk orang. *Which* salah karena woman = orang."),
      pick("eac3-m2-12", "Part A · The bag ___ I bought yesterday is very expensive.", ["that", "who", "whose", "what"], 0, "Benda → **that**."),
      pick("eac3-m2-13", "Part A · There are only ___ chairs in the hall, so some guests must stand.", ["a few", "little", "much", "any"], 0, "*Chairs* countable → **a few**."),
      pick("eac3-m2-14", "Part A · Each of the players ___ a medal after the match.", ["gets", "get", "are getting", "have got"], 0, "*Each of* + verb tunggal."),
      pick("eac3-m2-15", "Part A · Choose the synonym of “fragile”.", ["delicate", "strong", "heavy", "expensive"], 0, "*Fragile* (mudah pecah) ≈ **delicate**."),
      pick("eac3-m2-16", "Part A · Choose the antonym of “reluctant”.", ["eager", "unwilling", "afraid", "lazy"], 0, "*Reluctant* (enggan) ↔ **eager** (bersemangat). *Unwilling* justru sinonimnya."),
      pick("eac3-m2-17", "Part A · The meeting was cancelled ___ the manager was sick.", ["because", "although", "so", "however"], 0, "Alasan → **because**."),
      pick("eac3-m2-18", "Part A · The road was blocked; ___, we took another route.", ["therefore", "because", "although", "but"], 0, "Akibat → **therefore**."),
      pick("eac3-m2-19", "Part A · Please look ___ the board and copy the notes.", ["at", "on", "in", "to"], 0, "look **at**.", { image: "whiteboard" }),
      pick("eac3-m2-20", "Part A · Look! The kids ___ a sandcastle on the beach.", ["are building", "build", "builds", "built"], 0, "*Look!* → present continuous."),
      // Part B
      pick("eac3-m2-21", "Part B · Why was Dimas too sleepy to concentrate in class?", ["He stayed up late playing video games.", "He skipped breakfast.", "He had a part-time job.", "His classroom was too warm."], 0, "Baris 2 — sebab ditandai *so*.", { passageId: "eac3-dimas" }),
      pick("eac3-m2-22", "Part B · What was the effect of Dimas's sleepiness?", ["His test scores dropped.", "His teacher retired.", "He joined a club.", "His parents moved."], 0, "Baris 3: *As a result, his test scores dropped.*", { passageId: "eac3-dimas" }),
      pick("eac3-m2-23", "Part B · The phrase “turn over a new leaf” in line 4 means…", ["start behaving in a better way", "read a book", "change schools", "clean the garden"], 0, "Idiom: mulai berubah jadi lebih baik.", { passageId: "eac3-dimas" }),
      pick("eac3-m2-24", "Part B · Which of the following did Dimas NOT do after he changed his habits?", ["Skip his math class", "Go to bed early", "Finish homework before dinner", "Ask questions when confused"], 0, "Baris 5 menyebut tiga kebiasaan baru; *skip math class* tidak ada.", { passageId: "eac3-dimas" }),
      pick("eac3-m2-25", "Part B · “A piece of cake” in the last sentence suggests that Dimas thinks building good habits is…", ["quite easy", "very hard", "boring", "expensive"], 0, "*A piece of cake* = sangat mudah.", { passageId: "eac3-dimas" }),
      pick("eac3-m2-26", "Part B · What is the main idea of the passage?", ["Bees are important for food production and need protection.", "Bees are dangerous insects.", "Farmers dislike wildflowers.", "Honey is more valuable than fruit."], 0, "Soal **main idea** menanyakan gagasan seluruh teks.", { passageId: "eac3-bees" }),
      pick("eac3-m2-27", "Part B · According to the passage, why are bee populations declining?", ["Pesticides, habitat loss, and climate change", "Too many farmers", "Lack of flowers only", "Too much honey harvesting"], 0, "Baris 4 menyebut **tiga** penyebab. Opsi *only* berbahaya karena teks menyebut tiga.", { passageId: "eac3-bees" }),
      pick("eac3-m2-28", "Part B · The word “declining” in line 4 is closest in meaning to…", ["decreasing", "increasing", "moving", "changing"], 0, "Populasi lebah **menurun**.", { passageId: "eac3-bees" }),
      pick("eac3-m2-29", "Part B · Why are farmers planting wildflowers near crops?", ["To help protect bees", "To decorate the farm", "To sell flowers", "To keep insects away"], 0, "Baris 5: *working together to protect them, for example by planting wildflowers…*", { passageId: "eac3-bees" }),
      pick("eac3-m2-30", "Part B · What can be inferred from the passage?", ["Protecting bees also helps protect our food supply.", "Pollination has little effect on food.", "Chemicals are always necessary for farming.", "Bees prefer pesticides."], 0, "Soal **inferensi** menanyakan kesimpulan tersirat: sepertiga makanan bergantung pada penyerbukan.", { passageId: "eac3-bees", hots: true }),
      // Part C
      respond("eac3-m2-31", [["Customer", "Excuse me, how much is this jacket?"], ["Shop assistant", "___"]], ["It costs two hundred thousand rupiah.", "You're welcome.", "Congratulations.", "I'm afraid so."], "Pertanyaan harga → jawaban konkret.", { image: "jacket" }),
      respond("eac3-m2-32", [["Rina", "Would you mind closing the window? It's cold."], ["Dewi", "___"]], ["Not at all, I'll close it now.", "You're welcome.", "Congratulations.", "Yes, I really mind."], "*Would you mind…?* → setuju = *Not at all*."),
      respond("eac3-m2-33", [["Teacher", "Who can explain the difference between 'few' and 'little'?"], ["Student", "___"]], ["Let me try, Ma'am.", "That's very kind of you.", "I'm sorry to hear that.", "No problem."], "Menawarkan diri menjawab."),
      respond("eac3-m2-34", [["Ben", "I've lost my wallet on the way to school."], ["Sari", "___"]], ["Oh no, that's terrible. Let's retrace your steps.", "Congratulations!", "You're welcome.", "That's a great idea."], "Kabar buruk → simpati + bantuan."),
      respond("eac3-m2-35", [["Dad", "Do you want me to pick you up after the tournament?"], ["You", "___"]], ["Yes, please. That would be really helpful.", "You're welcome.", "I'm sorry for being late.", "Congratulations."], "Menerima tawaran → *Yes, please*."),
      // Part D
      unscramble("eac3-m2-36", ["arrive late", "at school", "rarely", "the students"], ["4-3-1-2", "4-1-3-2", "3-4-1-2", "4-3-2-1"], "*The students rarely arrive late at school.* Adverb *rarely* sebelum verb."),
      unscramble("eac3-m2-37", ["was invented", "by a young engineer", "this device", "in 2019"], ["3-1-2-4", "3-2-1-4", "1-3-2-4", "2-3-1-4"], "*This device was invented by a young engineer in 2019.* Urutan 3-1-4-2 sebenarnya juga masuk akal, tapi tidak ada di pilihan — pelaku (*by*) biasanya langsung setelah verb pasif."),
      pick("eac3-m2-38", "Part D · The coach is satisfied ___ the team's performance.", ["with", "of", "for", "at"], 0, "satisfied **with**.", { hots: true }),
      pick("eac3-m2-39", "Part D · These books belong ___ the school library.", ["to", "for", "at", "of"], 0, "belong **to**.", { hots: true }),
      correctOne("eac3-m2-40", ["My sister doesn't like vegetables, but she eats fruit every day.", "My sister doesn't likes vegetables, but she eat fruit every day.", "My sister don't like vegetables, but she eats fruit every day.", "My sister doesn't like vegetables, but she eating fruit every day."], "Cek dengan STAPW: *likes* setelah doesn't salah, *eat* tanpa -s salah, *don't* salah, *eating* tanpa auxiliary salah."),
    ],
  },
  live: {
    title: "Live Quiz — Preliminary Sprint",
    seconds: 20,
    questions: [
      live("eac3-live1", "“Thank you so much!” — best reply:", ["You're welcome.", "I'm sorry.", "Congratulations!", "That's terrible."], 0, "speech-bubbles"),
      live("eac3-live2", "“Would you mind helping me?” — Yes, I'll help:", ["Not at all.", "Yes, I mind.", "You're welcome.", "No, thanks."], 0, "hello"),
      live("eac3-live3", "She ___ drinks tea. (adverb position)", ["always", "is always", "always is", "alwayses"], 0, "tea"),
      live("eac3-live4", "I wonder where the bank ___.", ["is", "does", "are", "be"], 0, "map"),
      live("eac3-live5", "interested ___", ["in", "on", "at", "for"], 0, "lightbulb"),
      live("eac3-live6", "depend ___", ["on", "to", "of", "with"], 0, "puzzle"),
      live("eac3-live7", "“A piece of cake” means…", ["very easy", "very sweet", "very hungry", "very small"], 0, "cake-slice"),
      live("eac3-live8", "“The wind whispered” is…", ["personification", "simile", "metaphor", "an idiom"], 0, "windy"),
      live("eac3-live9", "___ five years", ["for", "since", "ago", "at"], 0, "calendar"),
      live("eac3-live10", "STAPW: the “T” checks…", ["tense", "topic", "title", "time limit"], 0, "checklist"),
    ],
  },
};
