import "server-only";
import type { Level, Passage, Question, QuizSet } from "@/lib/course/types";
import { examples, live, pick, pics, table, text, tip, warn } from "../kit";
import { correctOne, PRELIM_PARTS, respond, SCORE_FORMULA, unscramble } from "./helpers";

// Modul 5 — Preliminary Round tryouts. Three full papers in exactly the
// Preliminary format (40 questions, 60 minutes): Part A Words & Structure
// (1–20), Part B Reading (21–30, two passages × 5), Part C Spoken & Written
// Expression (31–35) and Part D HOTS (36–40: two unscrambling, two
// idiomatic prepositions, one multi-error item). Attempt n gets tryout n,
// so the three attempts never repeat a question. Every question is new —
// none of them appear in Modules 1–4 or the two mock tests.

// --- Tryout 1 --------------------------------------------------------------------------

const GARDEN: Passage = {
  id: "eac5-t1-garden",
  title: "Passage 1 — The school garden",
  pic: "sprout",
  lines: [
    "Two years ago, the students of SMA Harapan turned an empty corner of their school into a vegetable garden.",
    "At first, only five members of the science club took care of it after class.",
    "Because the plants grew quickly, other students became curious and offered to help.",
    "Today, the garden produces spinach, chili and tomatoes that the school canteen uses every week.",
    "The money the canteen saves is used to buy new books for the library.",
    "The principal says the garden has taught students more about teamwork than any classroom lesson.",
  ],
};

const SLEEP: Passage = {
  id: "eac5-t1-sleep",
  title: "Passage 2 — Sleep and memory",
  pic: "sleep",
  lines: [
    "Many teenagers believe that staying up late to study is the best way to prepare for a test.",
    "However, scientists have found that sleep plays an important role in learning.",
    "While we sleep, the brain sorts the information we collected during the day and stores the important parts.",
    "Students who sleep less than six hours often find it harder to remember what they studied.",
    "For this reason, experts recommend eight to ten hours of sleep for teenagers, especially before an exam.",
    "A short review in the evening followed by a full night's rest is usually more effective than studying all night.",
  ],
};

const TRYOUT1: Question[] = [
  // Part A — Words & Structure
  pick("eac5-t1-1", "Part A · My aunt ___ in a hospital in Tarakan.", ["works", "work", "working", "is work"], 0, "Subjek tunggal (*my aunt*) + fakta/kebiasaan → simple present **works**. *Is work* salah: be tidak dipakai bersama verb dasar."),
  pick("eac5-t1-2", "Part A · We ___ our grandparents in Samarinda last holiday.", ["visited", "visit", "visits", "are visiting"], 0, "*Last holiday* → kejadian selesai di masa lalu → simple past **visited**."),
  pick("eac5-t1-3", "Part A · Be quiet, please. My sister ___ for her exam now.", ["is studying", "studies", "studied", "study"], 0, "*Now* + sedang berlangsung → present continuous **is studying**."),
  pick("eac5-t1-4", "Part A · How ___ eggs do we need for the cake?", ["many", "much", "little", "a little"], 0, "*Eggs* bisa dihitung (countable, jamak) → **how many**. *Much/little* untuk uncountable."),
  pick("eac5-t1-5", "Part A · The plural of “knife” is…", ["knives", "knifes", "knifs", "knive"], 0, "Kata berakhiran *-fe/-f* sering berubah menjadi **-ves**: knife → **knives** (seperti wife → wives)."),
  pick("eac5-t1-6", "Part A · My new phone is ___ than my old one.", ["lighter", "more light", "lightest", "most light"], 0, "Kata sifat pendek (satu suku kata) + *than* → tambah **-er**: **lighter**."),
  pick("eac5-t1-7", "Part A · Mount Everest is the ___ mountain in the world.", ["highest", "higher", "most high", "high"], 0, "*The … in the world* → superlative. Kata pendek → **-est**: **highest**."),
  pick("eac5-t1-8", "Part A · The concert starts ___ 7.30 tonight.", ["at", "on", "in", "to"], 0, "Jam tertentu → **at** (at 7.30, at noon)."),
  pick("eac5-t1-9", "Part A · We usually go to the beach ___ Sunday mornings.", ["on", "in", "at", "to"], 0, "Hari (termasuk *Sunday morning*) → **on**. Bandingkan: *in the morning* tanpa nama hari."),
  pick("eac5-t1-10", "Part A · The man ___ car was stolen called the police.", ["whose", "who", "which", "whom"], 0, "Menyatakan **kepemilikan** (mobil milik pria itu) → **whose** + benda: *whose car*."),
  pick("eac5-t1-11", "Part A · The museum ___ we visited last week was very interesting.", ["which", "who", "whose", "whom"], 0, "Menerangkan **benda/tempat** sebagai objek *visited* → **which** (atau *that*). *Who/whom* untuk orang."),
  pick("eac5-t1-12", "Part A · Choose the synonym of “brave”.", ["courageous", "afraid", "lazy", "polite"], 0, "*Brave* (berani) ≈ **courageous**. *Afraid* justru lawan katanya."),
  pick("eac5-t1-13", "Part A · Choose the antonym of “expand”.", ["shrink", "grow", "extend", "spread"], 0, "*Expand* (membesar/meluas) ↔ **shrink** (menyusut). *Grow, extend, spread* maknanya mirip *expand*."),
  pick("eac5-t1-14", "Part A · She studied hard, ___ she passed the test easily.", ["so", "but", "or", "although"], 0, "Belajar keras → **akibatnya** lulus → *so* (hubungan sebab–akibat)."),
  pick("eac5-t1-15", "Part A · ___ he was tired, he helped his mother clean the house.", ["Even though", "Because", "So", "Unless"], 0, "Lelah **tetapi** tetap membantu → kontras → **Even though**. *Because* membuat kalimat tidak logis."),
  pick("eac5-t1-16", "Part A · In “The children laughed loudly,” the word “loudly” is a/an…", ["adverb", "adjective", "noun", "verb"], 0, "*Loudly* menerangkan cara mereka tertawa (verb *laughed*) → **adverb**. Ciri umum: adjective + *-ly*."),
  pick("eac5-t1-17", "Part A · This bridge ___ by local workers in 2015.", ["was built", "built", "is built", "was build"], 0, "Jembatan **dibangun** oleh pekerja (pasif) + 2015 (lampau) → *was* + V3 **built**. *Was build* salah bentuk V3."),
  pick("eac5-t1-18", "Part A · I ___ this school since 2023.", ["have attended", "attend", "attended", "am attending"], 0, "*Since 2023* → dari dulu sampai sekarang → present perfect **have attended**."),
  pick("eac5-t1-19", "Part A · Look at those dark clouds! It ___ rain soon.", ["is going to", "was going to", "has", "goes to"], 0, "Ada **bukti** sekarang (awan gelap) → prediksi dengan **be going to**."),
  pick("eac5-t1-20", "Part A · Each of the students ___ to bring a dictionary tomorrow.", ["has", "have", "are having", "were"], 0, "*Each of the …* dihitung **tunggal** → **has**. Jebakan: kata *students* yang jamak."),
  // Part B — Reading
  pick("eac5-t1-21", "Part B · What did the students turn the empty corner into?", ["A vegetable garden", "A library", "A canteen", "A sports field"], 0, "Baris 1: *turned an empty corner … into a vegetable garden.*", { passageId: "eac5-t1-garden" }),
  pick("eac5-t1-22", "Part B · Why did other students become curious?", ["The plants grew quickly.", "The canteen asked them to help.", "The principal gave them extra points.", "The science club paid them."], 0, "Baris 3: *Because the plants grew quickly, other students became curious.*", { passageId: "eac5-t1-garden" }),
  pick("eac5-t1-23", "Part B · The word “produces” in line 4 is closest in meaning to…", ["yields", "buys", "cooks", "destroys"], 0, "Kebun **menghasilkan** sayuran → *produces* ≈ **yields**.", { passageId: "eac5-t1-garden" }),
  pick("eac5-t1-24", "Part B · What is the money saved by the canteen used for?", ["Buying new books for the library", "Paying the science club", "Building a new canteen", "Buying more seeds"], 0, "Baris 5: *The money the canteen saves is used to buy new books for the library.*", { passageId: "eac5-t1-garden" }),
  pick("eac5-t1-25", "Part B · What can be inferred from the passage?", ["The garden benefits the school in more than one way.", "The garden is too small to be useful.", "Only the science club still works in the garden.", "The canteen no longer buys any food."], 0, "Kebun memberi sayur untuk kantin, uang untuk buku perpustakaan, dan pelajaran kerja sama → **manfaatnya lebih dari satu**. Opsi lain bertentangan dengan teks.", { passageId: "eac5-t1-garden", hots: true }),
  pick("eac5-t1-26", "Part B · What is the passage mainly about?", ["How sleep helps us learn and remember", "Why teenagers should study all night", "Why scientists study teenagers", "Why exams should be held in the evening"], 0, "Ide pokok ada di baris 2 lalu dijelaskan sampai akhir: tidur berperan penting dalam belajar.", { passageId: "eac5-t1-sleep" }),
  pick("eac5-t1-27", "Part B · According to the passage, what does the brain do while we sleep?", ["It sorts information and stores the important parts.", "It forgets everything from the day.", "It stops working completely.", "It creates new memories of dreams only."], 0, "Baris 3: *the brain sorts the information … and stores the important parts.*", { passageId: "eac5-t1-sleep" }),
  pick("eac5-t1-28", "Part B · The word “recommend” in line 5 is closest in meaning to…", ["suggest", "forbid", "ignore", "measure"], 0, "Para ahli **menyarankan** 8–10 jam tidur → *recommend* ≈ **suggest**.", { passageId: "eac5-t1-sleep" }),
  pick("eac5-t1-29", "Part B · How many hours of sleep do experts suggest for teenagers?", ["Eight to ten hours", "Less than six hours", "Exactly six hours", "Twelve hours or more"], 0, "Baris 5: *eight to ten hours of sleep for teenagers.* *Less than six hours* adalah kebiasaan yang merugikan (baris 4).", { passageId: "eac5-t1-sleep" }),
  pick("eac5-t1-30", "Part B · Which student is most likely to remember the material best?", ["Rani, who reviews her notes and then sleeps nine hours", "Bima, who studies until three in the morning", "Tika, who sleeps four hours and drinks coffee", "Joko, who skips the review and plays games late"], 0, "Baris 6: review singkat di malam hari + tidur cukup lebih efektif → **Rani**. Soal penerapan (HOTS): pilih contoh yang cocok dengan kesimpulan teks.", { passageId: "eac5-t1-sleep", hots: true }),
  // Part C — Spoken & Written Expression
  respond("eac5-t1-31", [["Andi", "Can I borrow your calculator for a minute?"], ["Rina", "___"]], ["Sure, here you are.", "You're welcome.", "Congratulations!", "I'm sorry to hear that."], "Permintaan meminjam → mengizinkan sambil memberi: **Sure, here you are.** *You're welcome* untuk membalas terima kasih."),
  respond("eac5-t1-32", [["Teacher", "You did a great job on your presentation today."], ["Student", "___"]], ["Thank you, Ma'am. I practised a lot.", "Get well soon, Ma'am.", "Not at all, Ma'am.", "Here you are, Ma'am."], "Dipuji → balas dengan **terima kasih**."),
  respond("eac5-t1-33", [["Nina", "I'm so nervous about the competition tomorrow."], ["Dewi", "___"]], ["Don't worry. You've prepared really well.", "Congratulations on your win!", "That's none of my business.", "Yes, please."], "Teman cemas → beri **semangat/menenangkan**. Selamat atas kemenangan belum tepat karena lombanya besok."),
  respond("eac5-t1-34", [["Waiter", "Are you ready to order?"], ["Customer", "___"]], ["Yes, I'd like the fried rice, please.", "You're welcome.", "Nice to meet you too.", "I'm afraid I'm late."], "Ditanya siap memesan → sebutkan pesanan: **I'd like …, please.**"),
  respond("eac5-t1-35", [["Fajar", "Shall we study together at the library after school?"], ["Lia", "___"]], ["That sounds great. See you there.", "I'm sorry for your loss.", "Thanks for the gift.", "Happy birthday!"], "*Shall we …?* = ajakan → terima ajakan: **That sounds great.**"),
  // Part D — HOTS
  unscramble("eac5-t1-36", ["has", "the team", "already", "won", "two matches"], ["2-1-3-4-5", "2-1-4-3-5", "2-4-1-3-5", "3-2-4-1-5"], "*The team has already won two matches.* Subjek (2) → *has* (1) → adverb *already* (3) di antara has dan V3 → *won* (4) → objek (5)."),
  unscramble("eac5-t1-37", ["should be", "all mobile phones", "before the test", "switched off"], ["2-1-4-3", "2-4-1-3", "1-2-4-3", "4-2-1-3"], "*All mobile phones should be switched off before the test.* Pasif dengan modal: S + *should be* + V3, lalu keterangan waktu di akhir."),
  pick("eac5-t1-38", "Part D · Our school is proud ___ its debate team.", ["of", "with", "for", "at"], 0, "Pasangan tetap: proud **of**. Jangan terjemahkan dari *bangga dengan*.", { hots: true }),
  pick("eac5-t1-39", "Part D · My little brother is afraid ___ the dark.", ["of", "from", "with", "at"], 0, "Pasangan tetap: afraid **of**. *Takut dari* → jebakan *from*.", { hots: true }),
  correctOne("eac5-t1-40", ["Neither my brother nor my sister likes spicy food.", "Neither my brother nor my sister like spicy food.", "Neither my brother or my sister likes spicy food.", "Neither my brother nor my sister liking spicy food."], "*Neither … nor …*: verb mengikuti subjek **terdekat** (*my sister* → tunggal → *likes*). *Neither* berpasangan dengan *nor*, bukan *or*. *Liking* tanpa verb utama tidak lengkap."),
];

// --- Tryout 2 --------------------------------------------------------------------------

const BOAT: Passage = {
  id: "eac5-t2-boat",
  title: "Passage 1 — A library on a boat",
  pic: "ship",
  lines: [
    "In some islands of North Kalimantan, children do not have a public library near their homes.",
    "To solve this problem, a group of volunteers turned an old fishing boat into a floating library.",
    "Every two weeks, the boat sails from village to village with more than a thousand books on board.",
    "When it arrives, children rush to the shore to borrow storybooks, comics and science books.",
    "The volunteers also read stories aloud to the younger children who cannot read yet.",
    "Thanks to the boat, many children now read for fun, not only for school.",
  ],
};

const YAWN: Passage = {
  id: "eac5-t2-yawn",
  title: "Passage 2 — Why do we yawn?",
  pic: "feel-sleepy",
  lines: [
    "Almost everyone yawns, but scientists are still not completely sure why.",
    "For a long time, people believed that we yawn because our bodies need more oxygen.",
    "However, experiments showed that breathing extra oxygen does not make people yawn less.",
    "A newer idea is that yawning helps cool the brain when it becomes too warm.",
    "Interestingly, yawning is also contagious: seeing or even reading about a yawn can make you yawn.",
    "Did you yawn while reading this passage?",
  ],
};

const TRYOUT2: Question[] = [
  // Part A — Words & Structure
  pick("eac5-t2-1", "Part A · The sun ___ in the east.", ["rises", "rise", "rose", "is rise"], 0, "Fakta umum + subjek tunggal → simple present **rises**."),
  pick("eac5-t2-2", "Part A · I ___ my old friend at the mall two days ago.", ["met", "meet", "meets", "have met"], 0, "*Two days ago* → simple past **met**. *Ago* tidak dipakai dengan present perfect."),
  pick("eac5-t2-3", "Part A · Listen! Someone ___ at the door.", ["is knocking", "knocks", "knocked", "knock"], 0, "*Listen!* → sedang terjadi saat ini → present continuous **is knocking**."),
  pick("eac5-t2-4", "Part A · There are only ___ students in the library because it's a holiday.", ["a few", "a little", "much", "a lot"], 0, "*Students* countable jamak + makna sedikit → **a few**. *A little* untuk uncountable."),
  pick("eac5-t2-5", "Part A · The plural of “leaf” is…", ["leaves", "leafs", "leafes", "leave"], 0, "*-f* → **-ves**: leaf → **leaves** (seperti half → halves)."),
  pick("eac5-t2-6", "Part A · Which noun is countable?", ["chair", "sugar", "advice", "traffic"], 0, "**Chair** bisa dihitung (one chair, two chairs). *Sugar, advice, traffic* uncountable."),
  pick("eac5-t2-7", "Part A · Today is ___ than yesterday, so let's turn on the fan.", ["hotter", "more hot", "hottest", "hoter"], 0, "Konsonan–vokal–konsonan (h-o-t) → konsonan akhir digandakan: **hotter**."),
  pick("eac5-t2-8", "Part A · Of all my friends, Raka is the ___ person I know.", ["most honest", "honester", "more honest", "honestest"], 0, "*Of all … the …* → superlative. *Honest* dua suku kata → **most honest**."),
  pick("eac5-t2-9", "Part A · My birthday is ___ 14 February.", ["on", "in", "at", "to"], 0, "Tanggal → **on** (on 14 February). Bulan saja → *in February*."),
  pick("eac5-t2-10", "Part A · The students walked ___ the bridge to reach the other side of the river.", ["across", "among", "between", "into"], 0, "Menyeberang dari satu sisi ke sisi lain → **across**."),
  pick("eac5-t2-11", "Part A · The doctor ___ treated my grandmother is very kind.", ["who", "which", "whose", "where"], 0, "Menerangkan **orang** sebagai subjek *treated* → **who**."),
  pick("eac5-t2-12", "Part A · I'm reading a novel ___ was written by a famous Indonesian author.", ["that", "who", "whose", "whom"], 0, "Menerangkan **benda** (*a novel*) → **that** (atau *which*)."),
  pick("eac5-t2-13", "Part A · Choose the synonym of “rapid”.", ["fast", "slow", "heavy", "quiet"], 0, "*Rapid* (cepat) ≈ **fast**."),
  pick("eac5-t2-14", "Part A · Choose the antonym of “permanent”.", ["temporary", "stable", "constant", "lasting"], 0, "*Permanent* (tetap) ↔ **temporary** (sementara). Tiga opsi lain bermakna mirip *permanent*."),
  pick("eac5-t2-15", "Part A · You can take the bus ___ the train; both go to the city centre.", ["or", "so", "but", "because"], 0, "Memilih salah satu dari dua → **or**."),
  pick("eac5-t2-16", "Part A · She didn't come to the party ___ she had a fever.", ["because", "although", "so", "but"], 0, "Demam adalah **alasan** tidak datang → **because**."),
  pick("eac5-t2-17", "Part A · Her ___ surprised everyone in the class.", ["kindness", "kind", "kindly", "kinder"], 0, "Setelah *her* (possessive) dibutuhkan **noun** → **kindness** (akhiran *-ness* membentuk noun)."),
  pick("eac5-t2-18", "Part A · Thousands of trees ___ every year to make paper.", ["are cut down", "cut down", "are cutting down", "is cut down"], 0, "Pohon **ditebang** (pasif), kebiasaan (*every year*), subjek jamak → *are* + V3 → **are cut down**."),
  pick("eac5-t2-19", "Part A · We ___ in Tarakan for ten years, and we still love it here.", ["have lived", "lived", "are living", "live"], 0, "*For ten years* + masih tinggal sampai sekarang (*still … here*) → present perfect **have lived**."),
  pick("eac5-t2-20", "Part A · If it doesn't rain, we ___ football this afternoon.", ["will play", "played", "would played", "are play"], 0, "Conditional tipe 1: *If* + present, **will** + V1 → **will play**."),
  // Part B — Reading
  pick("eac5-t2-21", "Part B · What problem did the volunteers want to solve?", ["Some children have no public library near their homes.", "Fishermen need more boats.", "Schools have too many books.", "Children cannot swim to school."], 0, "Baris 1–2: anak-anak tidak punya perpustakaan umum di dekat rumah, *to solve this problem* …", { passageId: "eac5-t2-boat" }),
  pick("eac5-t2-22", "Part B · How often does the boat visit the villages?", ["Every two weeks", "Every day", "Once a year", "Twice a week"], 0, "Baris 3: *Every two weeks, the boat sails from village to village.*", { passageId: "eac5-t2-boat" }),
  pick("eac5-t2-23", "Part B · The word “shore” in line 4 is closest in meaning to…", ["the land along the edge of the sea", "the top of a hill", "the school yard", "the middle of the river"], 0, "Anak-anak berlari ke **tepi pantai** menyambut perahu → *shore* = daratan di tepi laut.", { passageId: "eac5-t2-boat" }),
  pick("eac5-t2-24", "Part B · What do the volunteers do for children who cannot read yet?", ["They read stories aloud to them.", "They give them comics only.", "They take them to school by boat.", "They teach them how to fish."], 0, "Baris 5: *read stories aloud to the younger children who cannot read yet.*", { passageId: "eac5-t2-boat" }),
  pick("eac5-t2-25", "Part B · What is the most important result of the floating library?", ["More children now enjoy reading.", "The boat became a famous fishing boat.", "The volunteers sold many books.", "Children stopped going to school."], 0, "Baris 6: *many children now read for fun, not only for school* → hasil terpenting: minat baca tumbuh.", { passageId: "eac5-t2-boat", hots: true }),
  pick("eac5-t2-26", "Part B · What is the passage mainly about?", ["Possible reasons why people yawn", "How to stop yawning", "The dangers of breathing oxygen", "How the brain grows"], 0, "Seluruh teks membahas dugaan **penyebab** menguap: oksigen, pendinginan otak, dan efek menular.", { passageId: "eac5-t2-yawn" }),
  pick("eac5-t2-27", "Part B · What did the experiments show?", ["Breathing extra oxygen does not make people yawn less.", "Yawning always means we are bored.", "Oxygen makes people yawn more.", "Only children yawn."], 0, "Baris 3: *breathing extra oxygen does not make people yawn less.*", { passageId: "eac5-t2-yawn" }),
  pick("eac5-t2-28", "Part B · The word “contagious” in line 5 is closest in meaning to…", ["easily spread to others", "very dangerous", "extremely rare", "completely silent"], 0, "Melihat atau membaca tentang orang menguap membuat kita ikut menguap → *contagious* = **menular**.", { passageId: "eac5-t2-yawn" }),
  pick("eac5-t2-29", "Part B · According to the newer idea, what does yawning do?", ["It helps cool the brain.", "It gives the body more oxygen.", "It makes the brain warmer.", "It helps us read faster."], 0, "Baris 4: *yawning helps cool the brain when it becomes too warm.* Ide oksigen adalah ide **lama** (baris 2).", { passageId: "eac5-t2-yawn" }),
  pick("eac5-t2-30", "Part B · Why does the writer ask the question in the last line?", ["To show that yawning can spread even through reading", "To test the reader's grammar", "To give one more fact about oxygen", "To prove that the passage is boring"], 0, "Baris 5 menyebut membaca tentang menguap bisa membuat kita menguap; pertanyaan penutup **membuktikannya** langsung pada pembaca. Soal tujuan penulis (HOTS).", { passageId: "eac5-t2-yawn", hots: true }),
  // Part C — Spoken & Written Expression
  respond("eac5-t2-31", [["Customer", "Excuse me, where can I find the toothpaste?"], ["Shop assistant", "___"]], ["It's in aisle three, next to the soap.", "Congratulations!", "You're welcome.", "I'm fine, thank you."], "Ditanya letak barang → beri **informasi tempat** yang konkret."),
  respond("eac5-t2-32", [["Mira", "I'm sorry I broke your ruler."], ["Tono", "___"]], ["That's all right. It was an accident.", "You're welcome.", "Thank you very much.", "Congratulations."], "Menerima permintaan maaf → **That's all right.**"),
  respond("eac5-t2-33", [["Grandma", "How was your first day at the new school?"], ["You", "___"]], ["It was great! I made two new friends.", "I'll take it.", "Here you are.", "No, thanks."], "*How was …?* menanyakan pengalaman → ceritakan: **It was great! …**"),
  respond("eac5-t2-34", [["Receptionist", "Good afternoon. How may I help you?"], ["Guest", "___"]], ["I have a reservation under the name Sari.", "Good night. See you tomorrow.", "That's very kind of you.", "I'm sorry to hear that."], "Ditawari bantuan di hotel → sampaikan **keperluan**: punya reservasi."),
  respond("eac5-t2-35", [["Raka", "Would you like to join our badminton club?"], ["Dimas", "___"]], ["I'd love to. When do you practise?", "Yes, I do.", "Not at all.", "You're welcome."], "*Would you like to …?* = tawaran → terima: **I'd love to.** *Yes, I do* menjawab *Do you …?*"),
  // Part D — HOTS
  unscramble("eac5-t2-36", ["the bell", "before", "rings", "we must", "finish the test"], ["4-5-2-1-3", "4-2-5-1-3", "4-5-1-3-2", "5-4-2-1-3"], "*We must finish the test before the bell rings.* Klausa utama (4-5) lalu *before* + klausa waktu (*the bell rings*: subjek 1 + verb 3)."),
  unscramble("eac5-t2-37", ["a letter", "was sent", "to every parent", "by the principal"], ["1-2-3-4", "2-1-3-4", "2-3-1-4", "4-2-1-3"], "*A letter was sent to every parent by the principal.* Pasif: subjek (1) + *was* + V3 (2), lalu keterangan. Opsi lain merusak urutan subjek–verb."),
  pick("eac5-t2-38", "Part D · The film is based ___ a true story.", ["on", "in", "at", "from"], 0, "Pasangan tetap: based **on**. *Berdasarkan dari* → jebakan *from*.", { hots: true }),
  pick("eac5-t2-39", "Part D · He was absent ___ school yesterday because of the flu.", ["from", "of", "at", "in"], 0, "Pasangan tetap: absent **from**.", { hots: true }),
  correctOne("eac5-t2-40", ["The number of students in our class has increased this year.", "The number of students in our class have increased this year.", "A number of students in our class has increased this year.", "The number of student in our class has increased this year."], "*The number of* + jamak → verb **tunggal** (*has*). *A number of* (= banyak) → verb jamak, jadi *has* salah. *Student* harus jamak setelah *number of*."),
];

// --- Tryout 3 --------------------------------------------------------------------------

const ORANGUTAN: Passage = {
  id: "eac5-t3-orangutan",
  title: "Passage 1 — The orangutan rescue centre",
  pic: "orangutan",
  lines: [
    "Deep in the forests of Kalimantan, a rescue centre cares for young orangutans that have lost their mothers.",
    "Most of these babies were found near farms after the forest around them was cleared.",
    "At the centre, keepers feed them milk and fruit and teach them how to climb trees.",
    "The training can take up to seven years because young orangutans normally learn these skills from their mothers.",
    "When they are ready, the orangutans are released into a protected forest.",
    "The keepers hope that one day the centre will no longer be needed.",
  ],
};

const ROADS: Passage = {
  id: "eac5-t3-roads",
  title: "Passage 2 — Roads made of plastic",
  pic: "recycle",
  lines: [
    "Every year, Indonesia produces millions of tons of plastic waste.",
    "Some cities have found a creative way to use it: mixing shredded plastic bags into asphalt to build roads.",
    "Engineers say that roads made this way can be stronger and last longer than ordinary ones.",
    "They also reduce the amount of plastic that ends up in rivers and the sea.",
    "Critics, however, worry that tiny pieces of plastic could break off as the road wears down.",
    "More research is needed before plastic roads are used everywhere.",
  ],
};

const TRYOUT3: Question[] = [
  // Part A — Words & Structure
  pick("eac5-t3-1", "Part A · Water ___ at 100 degrees Celsius.", ["boils", "boil", "boiled", "is boil"], 0, "Fakta ilmiah + subjek tunggal (*water*) → simple present **boils**."),
  pick("eac5-t3-2", "Part A · When I was ten, I ___ to ride a bicycle.", ["learned", "learn", "learns", "have learned"], 0, "*When I was ten* → masa lalu yang sudah selesai → simple past **learned**."),
  pick("eac5-t3-3", "Part A · “Where is Budi?” “He ___ basketball in the gym right now.”", ["is playing", "plays", "played", "play"], 0, "*Right now* → present continuous **is playing**."),
  pick("eac5-t3-4", "Part A · Could you give me ___ advice about choosing a university?", ["some", "many", "a few", "several"], 0, "*Advice* uncountable → **some**. *Many, a few, several* hanya untuk countable."),
  pick("eac5-t3-5", "Part A · The plural of “goose” is…", ["geese", "gooses", "geeses", "goose's"], 0, "Jamak tidak beraturan: goose → **geese** (seperti foot → feet)."),
  pick("eac5-t3-6", "Part A · There ___ some bread on the table if you are hungry.", ["is", "are", "were", "have"], 0, "*Bread* uncountable → dianggap tunggal → **there is**."),
  pick("eac5-t3-7", "Part A · This new road is ___ than the old one.", ["wider", "more wide", "widest", "widder"], 0, "Kata pendek berakhiran *-e* → cukup tambah **-r**: **wider**."),
  pick("eac5-t3-8", "Part A · That was the ___ day of the holiday — it rained all day.", ["worst", "worse", "baddest", "most bad"], 0, "Superlative tidak beraturan: bad → worse → **worst**. *The … day of the holiday* menuntut superlative."),
  pick("eac5-t3-9", "Part A · The library is open from Monday ___ Friday.", ["to", "at", "in", "on"], 0, "Pola tetap rentang waktu: from … **to** …"),
  pick("eac5-t3-10", "Part A · The ball rolled ___ the table and fell onto the floor.", ["off", "among", "since", "during"], 0, "Bergerak **lepas dari** permukaan → **off** (rolled off the table)."),
  pick("eac5-t3-11", "Part A · The girl ___ bag is on the chair has gone home.", ["whose", "who", "which", "whom"], 0, "Tas **milik** gadis itu → **whose** + noun (*whose bag*)."),
  pick("eac5-t3-12", "Part A · Do you remember the song ___ we sang at the farewell party?", ["that", "who", "whose", "whom"], 0, "Menerangkan **benda** (*the song*) sebagai objek *sang* → **that**."),
  pick("eac5-t3-13", "Part A · Choose the synonym of “purchase”.", ["buy", "sell", "borrow", "lose"], 0, "*Purchase* (membeli) ≈ **buy**."),
  pick("eac5-t3-14", "Part A · Choose the antonym of “guilty”.", ["innocent", "ashamed", "sorry", "nervous"], 0, "*Guilty* (bersalah) ↔ **innocent** (tidak bersalah)."),
  pick("eac5-t3-15", "Part A · Hurry up, ___ you will miss the bus.", ["or", "so", "because", "although"], 0, "*Hurry up, or …* = kalau tidak, akibatnya … → **or** (peringatan)."),
  pick("eac5-t3-16", "Part A · We stayed at home ___ the storm was very strong.", ["because", "so", "but", "or"], 0, "Badai kuat adalah **alasan** tinggal di rumah → **because**."),
  pick("eac5-t3-17", "Part A · In “She sings beautifully,” which word is the verb?", ["sings", "she", "beautifully", "beautiful"], 0, "Kata kerja (aksi) → **sings**. *She* pronoun, *beautifully* adverb."),
  pick("eac5-t3-18", "Part A · The winners ___ by the committee next Monday.", ["will be announced", "will announce", "announced", "are announce"], 0, "Pemenang **diumumkan** oleh panitia (pasif) di masa depan → *will be* + V3 → **will be announced**."),
  pick("eac5-t3-19", "Part A · My sister ___ three novels so far this year.", ["has read", "reads", "is reading", "was reading"], 0, "*So far this year* → hasil sampai sekarang → present perfect **has read**."),
  pick("eac5-t3-20", "Part A · Everyone in my family ___ fried bananas.", ["loves", "love", "are loving", "have love"], 0, "*Everyone* dihitung **tunggal** → **loves**. Jebakan: *family* terasa banyak orang."),
  // Part B — Reading
  pick("eac5-t3-21", "Part B · Why do the orangutans at the centre need help?", ["They have lost their mothers.", "They are too old to climb.", "They escaped from a zoo.", "They became sick from eating fruit."], 0, "Baris 1: *young orangutans that have lost their mothers.*", { passageId: "eac5-t3-orangutan" }),
  pick("eac5-t3-22", "Part B · Where were most of the babies found?", ["Near farms", "In the city", "At a zoo", "On the beach"], 0, "Baris 2: *Most of these babies were found near farms.*", { passageId: "eac5-t3-orangutan" }),
  pick("eac5-t3-23", "Part B · The word “released” in line 5 is closest in meaning to…", ["set free", "caught again", "sold", "hidden"], 0, "Orangutan yang sudah siap **dilepasliarkan** ke hutan lindung → *released* ≈ **set free**.", { passageId: "eac5-t3-orangutan" }),
  pick("eac5-t3-24", "Part B · Why can the training take up to seven years?", ["Young orangutans normally learn these skills from their mothers.", "The keepers only work on weekends.", "The protected forest is very far away.", "Orangutans do not like milk."], 0, "Baris 4: *because young orangutans normally learn these skills from their mothers* — tanpa induk, keterampilan itu harus diajarkan pelan-pelan.", { passageId: "eac5-t3-orangutan" }),
  pick("eac5-t3-25", "Part B · What does the last sentence suggest?", ["The keepers hope orangutans will one day be safe in the wild.", "The centre will close because it has no money.", "The keepers are tired of their jobs.", "The orangutans will live at the centre forever."], 0, "Pusat penyelamatan *no longer needed* = tidak ada lagi bayi orangutan yang kehilangan induk → harapan agar orangutan **aman di alam**. Soal inferensi (HOTS).", { passageId: "eac5-t3-orangutan", hots: true }),
  pick("eac5-t3-26", "Part B · What is the passage mainly about?", ["Using plastic waste to build roads", "Why rivers are polluted", "How plastic bags are made", "The history of asphalt"], 0, "Baris 2 memperkenalkan topik (plastik dicampur aspal), lalu baris 3–6 membahas kelebihan dan kekhawatirannya.", { passageId: "eac5-t3-roads" }),
  pick("eac5-t3-27", "Part B · What do engineers say about plastic roads?", ["They can be stronger and last longer.", "They are cheaper to clean.", "They melt in hot weather.", "They are only used in villages."], 0, "Baris 3: *can be stronger and last longer than ordinary ones.*", { passageId: "eac5-t3-roads" }),
  pick("eac5-t3-28", "Part B · The word “shredded” in line 2 is closest in meaning to…", ["cut into small pieces", "painted", "washed", "burned"], 0, "Kantong plastik **dicacah** kecil-kecil sebelum dicampur aspal → *shredded* = cut into small pieces.", { passageId: "eac5-t3-roads" }),
  pick("eac5-t3-29", "Part B · What are the critics worried about?", ["Tiny pieces of plastic could break off as the road wears down.", "The roads are too strong.", "Plastic bags are too expensive.", "Engineers will lose their jobs."], 0, "Baris 5: *tiny pieces of plastic could break off as the road wears down.*", { passageId: "eac5-t3-roads" }),
  pick("eac5-t3-30", "Part B · What is the writer's attitude toward plastic roads?", ["Hopeful but careful", "Completely against them", "Not interested at all", "Sure that they are perfect"], 0, "Penulis menyebut manfaat (baris 3–4) **dan** kekhawatiran (baris 5), lalu menutup dengan *more research is needed* → optimis tapi hati-hati. Soal sikap penulis (HOTS).", { passageId: "eac5-t3-roads", hots: true }),
  // Part C — Spoken & Written Expression
  respond("eac5-t3-31", [["Passenger", "Excuse me, does this bus go to the airport?"], ["Driver", "___"]], ["Yes, it does. Please get on.", "You're welcome.", "Nice to meet you.", "Congratulations!"], "Pertanyaan *Does …?* → jawab **Yes, it does / No, it doesn't** lalu beri informasi."),
  respond("eac5-t3-32", [["Sinta", "I got the scholarship to study in Japan!"], ["Aldi", "___"]], ["Wow, congratulations! You deserve it.", "I'm sorry to hear that.", "Get well soon.", "Never mind."], "Kabar gembira → **mengucapkan selamat**."),
  respond("eac5-t3-33", [["Mother", "Don't forget to bring your umbrella. It looks like rain."], ["Son", "___"]], ["OK, Mom. Thanks for reminding me.", "You're welcome, Mom.", "Congratulations, Mom.", "I'm afraid I can't swim."], "Diingatkan → terima dan **berterima kasih** atas pengingatnya."),
  respond("eac5-t3-34", [["Librarian", "I'm sorry, you can't eat in the library."], ["Student", "___"]], ["Oh, I'm sorry. I'll put it away.", "Thank you for the food.", "Good luck!", "Yes, please."], "Ditegur karena melanggar aturan → **minta maaf** dan memperbaiki."),
  respond("eac5-t3-35", [["Doni", "What do you think of the new canteen menu?"], ["Ayu", "___"]], ["I think it's healthier and tastier than before.", "Yes, I'd love to.", "It's at nine o'clock.", "See you later."], "*What do you think of …?* menanyakan **pendapat** → jawab dengan *I think …*"),
  // Part D — HOTS
  unscramble("eac5-t3-36", ["often", "my father", "on weekends", "goes fishing"], ["2-1-4-3", "4-2-1-3", "4-1-2-3", "3-4-2-1"], "*My father often goes fishing on weekends.* Adverb frekuensi (*often*) berada **sebelum** verb utama; keterangan waktu di akhir."),
  unscramble("eac5-t3-37", ["will be held", "the graduation ceremony", "in the school hall", "next Saturday"], ["2-1-3-4", "1-2-3-4", "3-2-4-1", "4-1-2-3"], "*The graduation ceremony will be held in the school hall next Saturday.* Subjek (2) → pasif masa depan (1) → tempat (3) → waktu (4)."),
  pick("eac5-t3-38", "Part D · Too much sugar is harmful ___ your health.", ["to", "for", "with", "at"], 0, "Pasangan tetap: harmful **to**.", { hots: true }),
  pick("eac5-t3-39", "Part D · My uncle is married ___ a teacher from Bulungan.", ["to", "with", "for", "by"], 0, "Pasangan tetap: married **to** (bukan *with* — jebakan dari *menikah dengan*).", { hots: true }),
  correctOne("eac5-t3-40", ["One of my friends lives near the beach.", "One of my friend lives near the beach.", "One of my friends live near the beach.", "One of my friends living near the beach."], "*One of my* + noun **jamak** (*friends*), lalu verb **tunggal** karena subjeknya *one* → *lives*."),
];

// --- The module --------------------------------------------------------------------------

const SETS: QuizSet[] = [
  { questions: TRYOUT1, passages: [GARDEN, SLEEP] },
  { questions: TRYOUT2, passages: [BOAT, YAWN] },
  { questions: TRYOUT3, passages: [ORANGUTAN, ROADS] },
];

export const SESSION5: Level = {
  id: "eac5",
  title: "Session 5 — Preliminary Round Tryouts",
  description:
    "Three full Preliminary Round papers, 40 questions in 60 minutes each, in exactly the competition's format: Part A Words & Structure, Part B Reading, Part C Spoken & Written Expression and Part D HOTS. Every attempt gets a different paper. Read the rules and the time plan first, then score each tryout on the 100-point scale and fix your mistakes before the next one.",
  targetScore: "Preliminary Round · target ≥ 85/100",
  cover: ["stopwatch", "podium", "medal"],
  lessons: [
    // ------------------------------------------------------------------ 1
    {
      id: "eac5-l1",
      skill: "reading",
      title: "Tryout Rules and Your 60-Minute Plan",
      summary: "How the three tryouts work, what happens when time runs out, and where you should be on the clock in each part.",
      minutes: 10,
      sections: [
        {
          title: "How the tryouts work",
          blocks: [
            pics([["stopwatch", "60 minutes"], ["checklist", "40 questions"], ["podium", "Best score counts"]], "The tryout at a glance"),
            text(
              "Modul ini berisi **3 tryout Preliminary Round**. Formatnya **sama persis** dengan ujian asli dan dengan Mock Test di Modul 3, tetapi soalnya **baru semua**:\n\n- **Percobaan 1** memakai Tryout 1, **percobaan 2** memakai Tryout 2, **percobaan 3** memakai Tryout 3 — tidak ada soal yang terulang.\n- Timer **60 menit** berjalan di server. Kalau halaman tertutup atau internet putus, timer **tetap berjalan**; buka lagi untuk melanjutkan.\n- Jawaban **tersimpan otomatis**. Saat waktu habis, jawabanmu terkumpul otomatis.\n- Yang dihitung adalah **nilai terbaik** dari ketiga percobaan.\n- Di antara dua percobaan ada **jeda 4 menit**. Pakai untuk membaca pembahasan."
            ),
            table(
              ["Part", "Questions", "Numbers", "Max score"],
              [
                ["A. Words & Structure", "20", "1–20", "35"],
                ["B. Reading (2 passages × 5)", "10", "21–30", "27"],
                ["C. Spoken & Written Expression", "5", "31–35", "16"],
                ["D. HOTS", "5", "36–40", "22"],
              ]
            ),
            warn("Sudah memakai ketiga percobaan dan ingin mencoba lagi? Kamu bisa **mulai dari awal materi**: pelajari ulang materi modul ini dari yang pertama (dengan checkpoint-nya), lalu kamu mendapat 3 percobaan baru. Nilai terbaikmu tetap tersimpan."),
          ],
        },
        {
          title: "Your clock checkpoints",
          blocks: [
            text("Pakai rencana waktu dari Modul 3 (C → B → A → D). Supaya mudah dipantau di timer, ubah menjadi **titik cek jam**: lihat sisa waktu di bar atas dan pastikan kamu sudah sampai bagian ini."),
            table(
              ["Time left on the timer", "You should have finished", "If you are behind"],
              [
                ["56:00", "Part C (31–35)", "Jawab dengan pola fungsi: terima kasih, maaf, tawaran, ajakan"],
                ["42:00", "Part B (21–30)", "Baca pertanyaan dulu, cari bukti di baris teks"],
                ["24:00", "Part A (1–20)", "Tandai soal ragu dengan nomor, lanjut dulu"],
                ["06:00", "Part D (36–40)", "Unscrambling: cari subjek dulu untuk mencoret opsi"],
                ["00:00", "Check the marked numbers", "Isi semua — kosong dan salah sama-sama 0"],
              ]
            ),
            tip("Navigator nomor di atas soal menunjukkan mana yang sudah terisi. Sebelum waktu habis, pastikan **tidak ada nomor putih** (kosong)."),
          ],
        },
      ],
      checkpoint: [
        pick("eac5-l1-c1", "You start your second attempt. Which paper do you get?", ["Tryout 2, with new questions", "Tryout 1 again", "A mix of Tryouts 1 and 3", "The Mock Test from Module 3"], 0, "Percobaan ke-n memakai Tryout n → percobaan kedua = **Tryout 2**."),
        pick("eac5-l1-c2", "Your internet goes off for five minutes during the tryout. What happens to the timer?", ["It keeps running on the server.", "It stops until you are back.", "It restarts from 60 minutes.", "It adds five extra minutes."], 0, "Timer dipegang server, jadi **tetap berjalan**. Jawaban yang sudah tersimpan aman."),
        pick("eac5-l1-c3", "Which score counts for this module?", ["Your best score of the three attempts", "Your last attempt only", "The average of all attempts", "Your first attempt only"], 0, "Yang dihitung **nilai terbaik**."),
        pick("eac5-l1-c4", "The timer shows 42:00. Which parts should you have finished?", ["Parts C and B", "Part A only", "Parts A and D", "All four parts"], 0, "Titik cek: 56:00 → C selesai, 42:00 → **C dan B** selesai.", { hots: true }),
        pick("eac5-l1-c5", "You have used all three attempts and want to try again. What do you do?", ["Study this module's lessons again from the first one, then take new attempts", "Wait one day for new attempts", "Ask the admin to reset your attempts", "Buy the module again"], 0, "Mulai dari awal materi: pelajari ulang materi modul ini (dengan checkpoint-nya), lalu 3 percobaan baru terbuka otomatis."),
      ],
    },
    // ------------------------------------------------------------------ 2
    {
      id: "eac5-l2",
      skill: "reading",
      title: "Scoring Your Tryout on the 100-Point Scale",
      summary: "Turn correct answers into an estimated score, see which part gives the most points per question, and use the tie-breaker order.",
      minutes: 10,
      sections: [
        {
          title: "From correct answers to a score",
          blocks: [
            text("Setelah tryout, halaman hasil menampilkan **estimasi skor 100** per bagian. Rumusnya sama dengan Modul 3:"),
            { type: "table", head: SCORE_FORMULA.head, rows: SCORE_FORMULA.rows },
            examples(
              [
                { right: "A 16/20 → 16 × 1.75 = 28", note: "Part A" },
                { right: "B 8/10 → 8 × 2.7 = 21.6", note: "Part B" },
                { right: "C 5/5 → 5 × 3.2 = 16", note: "Part C" },
                { right: "D 3/5 → 3 × 4.4 = 13.2", note: "Part D" },
                { right: "Total ≈ 28 + 21.6 + 16 + 13.2 = 78.8 → 79", note: "Estimated score" },
              ],
              "Worked example"
            ),
            text("*Ini estimasi. Di ujian asli bobot per soal bisa bervariasi, jadi angkanya bisa sedikit bergeser.*"),
          ],
        },
        {
          title: "Points per question and ties",
          blocks: [
            pics([["medal", "Part D = 4.4 per question"], ["puzzle", "Part A = 1.75 per question"], ["podium", "Ties: D → A → C"]]),
            table(
              ["Part", "Points per correct answer", "One more correct answer adds"],
              [
                ["D", "4.4", "the most — 2.5 Part A questions"],
                ["C", "3.2", "almost 2 Part A questions"],
                ["B", "2.7", "1.5 Part A questions"],
                ["A", "1.75", "the least per question, but there are 20"],
              ]
            ),
            tip("Kalau skor total seri, pemenang ditentukan berturut-turut oleh **D → A → C**. Jadi naik satu soal di Part D bernilai ganda: poin terbesar **dan** penentu seri pertama."),
          ],
        },
      ],
      checkpoint: [
        pick("eac5-l2-c1", "You answered 18 Part A questions correctly. What is your estimated Part A score?", ["31.5", "18", "35", "27"], 0, "18 × 1,75 = **31,5**."),
        pick("eac5-l2-c2", "Which part gives the most points for one correct answer?", ["Part D", "Part A", "Part B", "Part C"], 0, "Part D: 4,4 poin per soal."),
        pick("eac5-l2-c3", "You got B 10/10. What is your estimated Part B score?", ["27", "10", "22", "35"], 0, "10 × 2,7 = **27** (skor penuh Part B)."),
        pick("eac5-l2-c4", "Two students both score 82. Which part is checked first to break the tie?", ["Part D", "Part A", "Part C", "Part B"], 0, "Urutan penentu seri: **D → A → C**."),
        pick("eac5-l2-c5", "Student X: A 20/20, D 1/5. Student Y: A 17/20, D 4/5. Who has more points from Parts A and D together?", ["Student Y", "Student X", "They are equal", "It cannot be calculated"], 0, "X: 35 + 4,4 = 39,4. Y: 29,75 + 17,6 = 47,35 → **Y** lebih tinggi. Tiga soal D bernilai lebih dari tiga soal A.", { hots: true }),
      ],
    },
    // ------------------------------------------------------------------ 3
    {
      id: "eac5-l3",
      skill: "structure",
      title: "Between Tryouts: Error Log and Fix-It Drills",
      summary: "Read your review the smart way, log each mistake by type, and fix the five errors that cost the most points before your next tryout.",
      minutes: 15,
      sections: [
        {
          title: "Read your review in four steps",
          blocks: [
            text(
              "Setelah setiap tryout, buka **pembahasan** (tombol *Review* di riwayat percobaan) dan lakukan empat langkah ini sebelum mulai tryout berikutnya:\n\n1. Centang **Show only wrong answers** supaya kamu hanya melihat yang salah.\n2. Untuk setiap soal salah, tulis **jenis kesalahannya**: tense, agreement, preposisi, relative pronoun, kosakata, bukti teks, atau fungsi dialog.\n3. Tulis **aturan singkat** yang benar dengan kata-katamu sendiri.\n4. Buat **satu kalimat baru** yang memakai aturan itu."
            ),
            table(
              ["No.", "Part", "Error type", "Rule in my words", "My new sentence"],
              [
                ["20", "A", "Agreement", "each of + plural noun → singular verb", "Each of the players has a number."],
                ["39", "D", "Preposition", "afraid of (not from)", "My cat is afraid of water."],
                ["…", "", "", "", ""],
              ]
            ),
          ],
        },
        {
          title: "Five errors that cost the most points",
          blocks: [
            pics([["magnifier", "Find the trap"], ["checklist", "Log it"], ["lightbulb", "Fix it"]]),
            examples(
              [
                { wrong: "Each of the students have a locker.", right: "Each of the students has a locker.", note: "each / every / everyone → singular verb" },
                { wrong: "I have met him two days ago.", right: "I met him two days ago.", note: "ago → simple past, never present perfect" },
                { wrong: "She is married with a pilot.", right: "She is married to a pilot.", note: "learn prepositions as pairs" },
                { wrong: "The man who his car was stolen…", right: "The man whose car was stolen…", note: "possession → whose + noun" },
                { wrong: "The number of tourists are rising.", right: "The number of tourists is rising.", note: "the number of → singular; a number of → plural" },
              ],
              "Wrong → right"
            ),
            tip("Ulangi kalimat yang benar dengan suara keras tiga kali. Telinga yang terbiasa dengan pola benar akan mendeteksi jebakan lebih cepat di Part A dan D."),
          ],
        },
      ],
      checkpoint: [
        pick("eac5-l3-c1", "Every one of the rooms ___ air conditioning.", ["has", "have", "are having", "were having"], 0, "*Every one of …* → tunggal → **has**."),
        pick("eac5-l3-c2", "We ___ the new science lab last Tuesday.", ["visited", "have visited", "visit", "are visiting"], 0, "*Last Tuesday* (waktu lampau yang jelas) → simple past **visited**, bukan present perfect."),
        pick("eac5-l3-c3", "Many people are interested ___ joining the robotics club.", ["in", "on", "at", "with"], 0, "interested **in** + V-ing."),
        pick("eac5-l3-c4", "That's the student ___ essay won the national prize.", ["whose", "who", "which", "whom"], 0, "Esai **milik** siswa itu → **whose** + noun."),
        correctOne("eac5-l3-c5", ["A number of visitors were waiting outside the museum.", "A number of visitors was waiting outside the museum.", "The number of visitors were growing every year.", "A number of visitor were waiting outside the museum."], "*A number of* (= banyak) + jamak → verb **jamak** (*were*). *The number of* → tunggal, jadi *the number … were* salah. *Visitor* harus jamak."),
      ],
    },
  ],
  quiz: {
    id: "eac5-tryout",
    title: "Preliminary Tryout — 40 Questions",
    passPercent: 80,
    questions: TRYOUT1,
    passages: [GARDEN, SLEEP],
    sets: SETS,
    parts: PRELIM_PARTS,
  },
  live: {
    title: "Live Quiz — Tryout Warm-Up",
    seconds: 20,
    questions: [
      live("eac5-live1", "Each of the boys ___ a bike.", ["has", "have", "having", "are"], 0, "bicycle"),
      live("eac5-live2", "I saw her two days ___.", ["ago", "since", "for", "before now"], 0, "calendar"),
      live("eac5-live3", "afraid ___ snakes", ["of", "from", "with", "at"], 0, "snake"),
      live("eac5-live4", "The girl ___ cat is lost is crying.", ["whose", "who", "which", "whom"], 0, "cat"),
      live("eac5-live5", "Part D: one correct answer is worth about…", ["4.4 points", "1.75 points", "2.7 points", "10 points"], 0, "medal"),
      live("eac5-live6", "“Shall we go to the canteen?” — best reply:", ["Sure, let's go.", "You're welcome.", "Get well soon.", "I'm sorry."], 0, "speech-bubbles"),
      live("eac5-live7", "Antonym of “temporary”:", ["permanent", "short", "quick", "recent"], 0, "clock"),
      live("eac5-live8", "Ties are decided first by…", ["Part D", "Part A", "Part B", "Part C"], 0, "podium"),
      live("eac5-live9", "Plural of “goose”:", ["geese", "gooses", "geeses", "goose"], 0, "bird"),
      live("eac5-live10", "The new bridge ___ next year.", ["will be opened", "will open by", "is opening by", "opened"], 0, "flag"),
    ],
  },
};
