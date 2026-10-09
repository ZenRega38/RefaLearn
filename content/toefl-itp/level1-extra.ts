import "server-only";
import type { LessonSection, LevelQuiz, LiveQuizSet, Question } from "@/lib/course/types";
import { live, table, text, tip, tryIt } from "../kit";
import { KEY, completion, mc, partA, wrong } from "./helpers";

const { A, B, C, D } = KEY;

// Level 1 extras: a short diagnostic before the level, a live quiz for the
// classroom, and the Big Quiz items that count as higher-order thinking.

export const L1_PRETEST: LevelQuiz = {
  id: "l1-pre",
  title: "Level 1 Pretest",
  passPercent: 0,
  questions: [
    partA("l1-pre-1", [["woman", "Do you want to walk to the museum?"], ["man", "It's too far. Let's take a taxi."]], "What does the man suggest?",
      ["Taking a taxi", "Walking to the museum", "Staying at home", "Visiting a park"], A, "Let's take a taxi = usul naik taksi."),
    partA("l1-pre-2", [["man", "Was the lecture interesting?"], ["woman", "I could hardly stay awake."]], "What does the woman mean?",
      ["The lecture was boring.", "She slept well last night.", "The lecture was exciting.", "She arrived late."], A, "Hardly stay awake = hampir tertidur → membosankan."),
    completion("l1-pre-3", "The students ____ a project about mangroves.", ["presenting", "presented", "to present", "the presentation"], B, "Kalimat butuh kata kerja utama → presented."),
    wrong("l1-pre-4", "[A:Many] [B:island] in the province [C:have] beautiful [D:beaches].", "B", "islands", "Many + kata benda jamak → islands."),
    completion("l1-pre-5", "____, Lake Toba is a popular destination.", ["The largest volcanic lake in the world", "It is the largest volcanic lake", "Is the largest volcanic lake", "Because the largest volcanic lake"], A, "Appositive (frasa benda) sebelum subjek Lake Toba."),
  ],
};

export const L1_LIVE: LiveQuizSet = {
  title: "Live Quiz — TOEFL ITP Foundations",
  questions: [
    live("l1-live-1", "Listening questions in TOEFL ITP:", ["30", "50", "40", "60"], 1, "headset"),
    live("l1-live-2", "Every clause needs a subject and a…", ["verb", "comma", "preposition", "pronoun"], 0, "pencil"),
    live("l1-live-3", "“Packed” (a crowded bus) means…", ["very full", "empty", "cheap", "late"], 0, "bus"),
    live("l1-live-4", "Each of the players ___ a medal.", ["was given", "were given", "giving", "have given"], 0, "trophy"),
    live("l1-live-5", "“Not unusual” means…", ["common", "strange", "rare", "never"], 0, "question"),
    live("l1-live-6", "A noun after “of” is…", ["not the subject", "always the subject", "a verb", "an adverb"], 0, "open-book"),
    live("l1-live-7", "Reading time in TOEFL ITP:", ["55 minutes", "25 minutes", "35 minutes", "90 minutes"], 0, "clock"),
    live("l1-live-8", "Wrong answers lose points?", ["No", "Yes", "Only in Reading", "Only in Listening"], 0, "thumbs-up"),
  ],
};

/** Big Quiz items that require inference or evaluation. */
export const L1_HOTS = new Set(["l1q-3", "l1q-18"]);

/** A second practice section for Level 1 lessons that had only one. */
export const L1_MORE_SECTIONS: Record<string, LessonSection> = {
  "l1-str-2": {
    title: "Spotting the real subject",
    blocks: [
      table(["Prepositional phrase", "Real subject + verb"], [["In the middle of the lake…", "…stands a small temple."], ["Of all the students in the class,…", "…Rina speaks the most languages."], ["During the dry season,…", "…the farmers grow corn."]]),
      tip("Coret dulu frasa preposisi (*in, of, during, with, among…*). Kata benda yang tersisa biasanya adalah subjek, dan setelahnya harus ada kata kerja utama."),
      tryIt(completion("l1-str-2-try2", "With its colourful houses, the village ____ many photographers.", ["attracting", "to attract", "it attracts", "attracts"], D, "With its colourful houses = frasa preposisi; subjek: the village + attracts.")),
    ],
  },
  "l1-str-3": {
    title: "Appositive or main clause?",
    blocks: [
      table(["Appositive (noun phrase only)", "Not an appositive"], [["Bandung, a city in West Java, …", "Bandung is a city in West Java."], ["Ms. Rani, our English teacher, …", "Ms. Rani teaches English."], ["…Kartini, a pioneer of girls' education", "…Kartini, who was a pioneer…"]]),
      tip("Appositive **tidak punya kata kerja**. Jika pilihan jawaban mengandung *is/are/was* di antara dua koma, biasanya itu salah."),
      tryIt(completion("l1-str-3-try2", "Rendang, ____, comes from West Sumatra.", ["is a spicy beef dish", "a spicy beef dish", "it is a spicy dish", "that a spicy dish"], B, "Appositive = frasa benda tanpa kata kerja.")),
    ],
  },
  "l1-rea-2": {
    title: "Scanning practice",
    blocks: [
      text("Untuk soal detail, cari **kata kunci yang mudah ditemukan**: angka, tahun, nama, istilah dengan huruf kapital. Lalu baca kalimat di sekitarnya dengan teliti."),
      table(["Question word", "Look for"], [["When…?", "years, dates, before/after"], ["Where…?", "place names, prepositions of place"], ["How many / How much…?", "numbers"], ["Why…?", "because, since, so, therefore"]]),
      tryIt(mc("l1-rea-2-try2", "A question asks “In what year did the bridge open?” What should you scan for first?", ["A number that looks like a year", "The longest sentence", "The first word of each line", "Adjectives"], A, "Tahun = angka empat digit.")),
    ],
  },
  "l1-rea-3": {
    title: "Types of context clues",
    blocks: [
      table(["Clue type", "Example"], [["Definition", "Mangroves, trees that grow in salty water, …"], ["Synonym", "The path was narrow, or thin, …"], ["Contrast", "Unlike his talkative sister, Budi is reticent. (= quiet)"], ["Example", "Staples such as rice, corn and sago…"]]),
      tip("Ganti kata yang ditanya dengan setiap pilihan jawaban dalam kalimat aslinya. Pilihan yang **paling masuk akal dalam konteks** adalah jawabannya."),
      tryIt(mc("l1-rea-3-try2", "“Unlike his talkative sister, Budi is reticent.” “Reticent” most likely means…", ["quiet", "angry", "tall", "talkative"], A, "Petunjuk kontras: unlike talkative → pendiam.")),
    ],
  },
  "l1-rea-4": {
    title: "Checking your reference answer",
    blocks: [
      text("Setelah memilih rujukan sebuah pronoun, **ganti pronoun dengan jawabanmu** dan baca ulang kalimatnya. Jika maknanya tetap logis dan cocok (tunggal/jamak), jawabanmu benar."),
      table(["Pronoun", "Refers to"], [["it / its", "a singular noun or idea"], ["they / them / their", "a plural noun"], ["this / that", "a whole idea in the previous sentence"], ["which / who", "the noun just before it"]]),
      tryIt(mc("l1-rea-4-try2", "“The turtles lay their eggs on the beach, where they stay warm in the sand.” “They” refers to…", ["the eggs", "the turtles", "the beach", "the sand"], A, "Yang tetap hangat di pasir adalah telurnya.")),
    ],
  },
};

/** One more checkpoint question per Level 1 lesson (keys authored in mixed positions). */
export const L1_MORE_CHECKS: Record<string, Question[]> = {
  "l1-lis-1": [mc("l1-lis-1-c9", "How many times is each Listening conversation played in TOEFL ITP?", ["Twice", "Once", "Three times", "As many times as you like"], B, "Audio hanya diputar satu kali."), mc("l1-lis-1-c10", "In Part A, what do you read on the screen or test book?", ["The four answer choices only", "The full conversation", "The question and the conversation", "Nothing at all"], A, "Hanya empat pilihan jawaban yang tertulis.")],
  "l1-lis-2": [partA("l1-lis-2-c9", [["man", "Was the library crowded this morning?"], ["woman", "There wasn't an empty seat anywhere."]], "What does the woman mean?",
    ["The library had many empty seats.", "She couldn't find the library.", "The library was full.", "She sat near the window."], C, "Restatement: tidak ada kursi kosong = penuh."), partA("l1-lis-2-c10", [["woman", "Did the lecture start on time?"], ["man", "It began fifteen minutes late."]], "What does the man mean?", ["The lecture was cancelled.", "The lecture started on time.", "The lecture was fifteen minutes long.", "The lecture was delayed."], D, "Began late = delayed (restatement).")],
  "l1-lis-3": [partA("l1-lis-3-c9", [["woman", "Did you buy a new coat?"], ["man", "No, I had my old one cleaned."]], "What does the man mean?",
    ["He bought a coat.", "He had his old coat cleaned.", "He lost his coat.", "He gave a coat away."], B, "Jebakan bunyi: coat vs. code/cold; maknanya jasnya dibersihkan."), partA("l1-lis-3-c10", [["man", "Where did you put the glass?"], ["woman", "It's on the shelf next to the plates."]], "What does the woman say about the glass?", ["It is next to the plates.", "It is made of grass.", "It is in the class.", "It is broken."], A, "Glass ≠ grass/class (bunyi mirip).")],
  "l1-lis-4": [partA("l1-lis-4-c9", [["man", "Is the museum ever open on Mondays?"], ["woman", "Hardly ever."]], "What does the woman mean?",
    ["It is always open on Mondays.", "It is open every day.", "It is closed only on Sundays.", "It is almost never open on Mondays."], D, "Hardly ever = hampir tidak pernah."), partA("l1-lis-4-c10", [["woman", "Is the new café expensive?"], ["man", "It's not cheap, that's for sure."]], "What does the man mean?", ["The café is free.", "The café is expensive.", "The café is cheap.", "He has never been there."], B, "Not cheap = mahal.")],
  "l1-str-1": [completion("l1-str-1-c9", "In the rainy season, the river ____ its banks.", ["overflowing", "overflows", "to overflow", "the overflow of"], B, "Butuh kata kerja utama → overflows."), completion("l1-str-1-c10", "____ in the mountains of Central Java.", ["The Dieng Plateau", "The Dieng Plateau lies", "Lying the Dieng Plateau", "That the Dieng Plateau"], B, "Butuh subjek dan kata kerja: The Dieng Plateau lies.")],
  "l1-str-2": [completion("l1-str-2-c9", "In the center of the square ____ a large banyan tree.", ["is", "it is", "being", "which"], A, "Frasa preposisi bukan subjek; kata kerja: is."), completion("l1-str-2-c10", "Of all the islands in the province, Lombok ____ the most visitors.", ["receiving", "to receive", "receives", "it receives"], C, "Of all the islands = frasa preposisi; subjek Lombok + receives.")],
  "l1-str-3": [completion("l1-str-3-c9", "Borobudur, ____, attracts millions of visitors.", ["is a Buddhist temple", "a famous Buddhist temple", "it is a temple", "which a temple"], B, "Appositive: frasa benda di antara koma."), wrong("l1-str-3-c10", "[A:Komodo], [B:the largest lizard] in the world, [C:live] only [D:in Indonesia].", "C", "lives", "Subjek Komodo (tunggal); appositive tidak mengubah subjek.")],
  "l1-str-4": [wrong("l1-str-4-c9", "The [A:list] of [B:items] for the trip [C:are] on the [D:board].", "C", "is", "Subjek inti: the list (tunggal) → is."), wrong("l1-str-4-c10", "[A:Every] [B:students] in the class [C:has] a [D:laptop].", "B", "student", "Every + kata benda tunggal.")],
  "l1-rea-1": [mc("l1-rea-1-c9", "Where is the main idea of an academic passage most often found?", ["In the last sentence only", "In a footnote", "In the first sentence or first lines", "In the title of the next passage"], C, "Gagasan utama biasanya di awal."), mc("l1-rea-1-c10", "Which option is usually a TRAP in a main-idea question?", ["An option that covers the whole passage", "An option about one small detail only", "An option that restates the first sentence", "An option that matches the title"], B, "Detail kecil bukan main idea.")],
  "l1-rea-2": [mc("l1-rea-2-c9", "For a detail question, the correct answer usually…", ["restates information in the passage", "copies a sentence exactly", "adds new information", "gives your opinion"], A, "Jawaban detail = restatement."), mc("l1-rea-2-c10", "What is the best first step for a detail question?", ["Read the whole passage again slowly", "Guess immediately", "Find the key word from the question in the passage", "Choose the longest option"], C, "Pindai kata kunci.")],
  "l1-rea-3": [mc("l1-rea-3-c9", "“The village is remote, so few tourists visit.” The word “remote” most likely means…", ["crowded", "modern", "far away", "dangerous"], C, "Petunjuk konteks: sedikit turis → terpencil."), mc("l1-rea-3-c10", "“After the long drought, the river was almost empty.” The word “drought” refers to…", ["a period with very little rain", "a flood", "a festival", "a fishing season"], A, "Konteks: sungai hampir kering.")],
  "l1-rea-4": [mc("l1-rea-4-c9", "“The bees return to the hive, where they share what they have found.” What does “they” refer to?", ["the hive", "the bees", "the flowers", "the visitors"], B, "They = the bees."), mc("l1-rea-4-c10", "“Scientists studied the coral because it reacts quickly to warmer water.” What does “it” refer to?", ["the water", "the scientists", "warmth", "the coral"], D, "It = the coral.")],
};

