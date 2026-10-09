import "server-only";
import type { Lesson, LevelQuiz, LiveQuizSet, Passage } from "@/lib/course/types";
import { audio, examples, live, match, pickMany, pics, table, text, tip, tryIt, vocab, warn } from "../kit";
import { KEY, completion, mc, partA, rq, say, spokenQ, wrong } from "./helpers";

const { A } = KEY;

// Level 3 — Advanced (target 550+). Original content; explanations in
// Indonesian, everything the learner answers in English.

// --- Passages ---------------------------------------------------------------

const SUBAK: Passage = {
  id: "l3-p-subak",
  title: "The Subak System",
  lines: [
    "For more than a thousand years, rice farmers in Bali have managed water",
    "through a cooperative system known as subak. Each subak consists of the",
    "farmers who draw water from a common source, and decisions about planting",
    "and irrigation are made collectively at water temples. When agricultural",
    "experts introduced new rice varieties and fixed planting schedules in the",
    "1970s, they largely ignored this system, assuming that it was based on",
    "ritual rather than practical knowledge. The results were disappointing:",
    "pests spread rapidly and water shortages became more frequent. Later",
    "research using computer models revealed that the temple-based schedule",
    "had been remarkably effective. By coordinating when neighboring fields",
    "were flooded and left fallow, subak communities had limited pest",
    "populations while sharing water efficiently. In 2012, UNESCO recognized",
    "the cultural landscape of Bali's subak as a World Heritage Site, noting",
    "that it reflects a philosophy of harmony between people, nature and the",
    "spiritual world.",
  ],
};

const SLEEP: Passage = {
  id: "l3-p-sleep",
  title: "Memory and Sleep",
  lines: [
    "It was once widely assumed that the sleeping brain was largely inactive,",
    "but research over the past several decades has overturned this view.",
    "During sleep, the brain appears to replay patterns of activity that",
    "occurred during the day, a process that is thought to strengthen newly",
    "formed memories. In one well-known type of experiment, participants who",
    "learned a task and then slept recalled it more accurately than those who",
    "remained awake for the same period. Different stages of sleep may serve",
    "different functions: deep, slow-wave sleep seems particularly important",
    "for factual memory, whereas rapid eye movement sleep has been linked to",
    "emotional processing and creative problem solving. Not all researchers",
    "agree on the precise mechanisms, and some caution that laboratory tasks",
    "may not reflect real-world learning. Nonetheless, the evidence strongly",
    "suggests that students who sacrifice sleep to study may be undermining",
    "the very learning they hope to achieve.",
  ],
};

const SPICE: Passage = {
  id: "l3-p-spice",
  title: "The Spice Trade",
  lines: [
    "Few commodities have shaped world history as profoundly as the spices of",
    "the Maluku Islands. Cloves and nutmeg, which grew almost nowhere else, were",
    "carried by Asian and Arab traders across the Indian Ocean long before",
    "Europeans arrived. By the time the goods reached European markets, their",
    "price had multiplied many times, making them luxuries associated with",
    "wealth and status. It was precisely this extraordinary profit that drove",
    "Portuguese, Spanish, English and Dutch expeditions to seek a direct route",
    "to the islands. The Dutch East India Company eventually established a",
    "near monopoly, enforcing it with brutal methods, including the destruction",
    "of spice trees on islands it could not control. Ironically, the monopoly",
    "did not last; seedlings were smuggled out and planted in other tropical",
    "colonies, and prices collapsed. The story illustrates how a single",
    "agricultural product could connect distant societies and alter the",
    "political map of the world.",
  ],
};

// --- Listening ----------------------------------------------------------------

const LISTENING: Lesson[] = [
  {
    id: "l3-lis-1",
    skill: "listening",
    title: "Implied Meaning: Wishes, Conditions and Emphasis",
    summary: "Contrary-to-fact statements, wishes, emphatic forms and expressions with hidden meaning.",
    minutes: 16,
    sections: [
      {
        title: "Contrary-to-fact meaning",
        blocks: [
          text("Kalimat pengandaian dan *wish* menyatakan **kebalikan kenyataan**. Jawaban benar biasanya adalah **fakta sebenarnya**."),
          table(["You hear", "Real meaning"], [["If I had known, I would have come.", "I didn't know, so I didn't come."], ["I wish I had more time.", "I don't have enough time."], ["If only the store were open.", "The store is closed."], ["Had I taken the bus, I'd be there now.", "I didn't take the bus; I'm not there."]]),
          tryIt(partA("l3-lis-1-try", [["man", "Did you go to the seminar?"], ["woman", "I would have, if I hadn't had a fever."]], "What does the woman mean?",
            ["She did not go because she was sick.", "She went to the seminar.", "She will go next time.", "The seminar was cancelled."], A, "Would have … if I hadn't = tidak pergi karena demam.")),
        ],
      },
      {
        title: "Emphasis and hidden meaning",
        blocks: [
          table(["Expression", "Meaning"], [["I do like it!", "emphatic: I really like it"], ["Did he ever!", "yes, very much"], ["Isn't it beautiful?", "it is very beautiful"], ["I'll believe it when I see it.", "I doubt it"], ["That's the last thing I need.", "I don't want that at all"], ["Don't hold your breath.", "it won't happen soon"]]),
          pics([["owl-think", "hidden meaning"], ["question", "rhetorical question"], ["surprised", "emphasis"], ["clock", "don't hold your breath"]]),
          warn("Pertanyaan negatif seperti *Isn't it…?* atau *Wasn't that great?* biasanya **pernyataan positif yang kuat**, bukan pertanyaan sungguhan."),
        ],
      },
    ],
    checkpoint: [
      partA("l3-lis-1-c1", [["woman", "Are you taking the photography course?"], ["man", "I wish I could, but it clashes with my lab."]], "What does the man mean?",
        ["He can't take the course.", "He is taking the course.", "He doesn't like photography.", "He will cancel his lab."], A, "Wish I could = tidak bisa."),
      partA("l3-lis-1-c2", [["man", "Did you enjoy the trip to Bromo?"], ["woman", "Did I ever!"]], "What does the woman mean?",
        ["She enjoyed it very much.", "She has never been there.", "She didn't enjoy it.", "She doesn't remember."], A, "Did I ever = sangat menikmati."),
      partA("l3-lis-1-c3", [["woman", "The manager said the new computers will arrive next week."], ["man", "I'll believe it when I see it."]], "What does the man imply?",
        ["He doubts the computers will arrive next week.", "He has already seen the computers.", "He trusts the manager completely.", "He doesn't need a computer."], A, "Ia ragu janji itu ditepati."),
      match("l3-lis-1-c4", "Match the expression and the real meaning.", [["If only I had studied.", "I didn't study."], ["Don't hold your breath.", "It won't happen soon."], ["Isn't the view amazing?", "The view is very amazing."], ["That's the last thing I need.", "I really don't want that."]], "Makna tersirat."),
      partA("l3-lis-1-c5", [["man", "Should we invite Dian to the meeting?"], ["woman", "Had I known she was in town, I would have already."]], "What does the woman mean?",
        ["She didn't know Dian was in town.", "She already invited Dian.", "Dian refused the invitation.", "Dian lives far away."], A, "Had I known = If I had known (tidak tahu)."),
      partA("l3-lis-1-c6", [["woman", "Another group project? That's the last thing I need this week."], ["man", "I know how you feel."]], "How does the woman feel about the project?",
        ["She doesn't want it.", "She is excited.", "She needs more projects.", "She has finished it."], A, "The last thing I need = sangat tidak diinginkan.", ),
    ],
  },
  {
    id: "l3-lis-2",
    skill: "listening",
    title: "Academic Lectures: Inference and Organization",
    summary: "Following longer lectures, recognising the speaker's organization, attitude and implied conclusions.",
    minutes: 18,
    sections: [
      {
        title: "How lectures are organized",
        blocks: [
          table(["Signal", "What follows"], [["Today we'll look at… / Let's turn to…", "topic or new section"], ["There are two main theories…", "a list or comparison"], ["What's interesting is… / Surprisingly…", "an important point"], ["In other words… / That is…", "a restatement or definition"], ["So the question is…", "the key problem"], ["To sum up… / Next time…", "conclusion or future topic"]]),
          tip("Soal Part C level atas sering bertanya: **Why does the professor mention X?**, **What is the professor's attitude?**, atau **What can be inferred?** Dengarkan **fungsi** contoh, bukan hanya isinya."),
        ],
      },
      {
        title: "Practice lecture",
        blocks: [
          audio("Lecture: Why the Wallace Line matters", say(["woman", "Good afternoon. Today we'll discuss the Wallace Line, an invisible boundary that runs between Bali and Lombok and between Borneo and Sulawesi. In the nineteenth century, Alfred Russel Wallace noticed something surprising: although the islands are only a few dozen kilometres apart, the animals on each side are remarkably different. To the west, you find tigers, monkeys and woodpeckers, species related to those of Asia. To the east, you find marsupials and cockatoos, which are more closely related to Australian species. The explanation lies in deep water. During the ice ages, sea levels dropped and the western islands were connected to Asia by land, but the deep channel along the line was never dry. So animals couldn't simply walk across. Now, some biologists today argue that the boundary is less sharp than Wallace believed, but the basic pattern he identified still holds. Next week, we'll look at how the same idea applies to plants."]), true),
          tryIt(spokenQ("l3-lis-2-try", "Why does the professor mention the ice ages?", ["To explain why animals could not cross the line", "To describe Wallace's childhood", "To compare Bali and Lombok's climates", "To introduce a new species"], A, "Fungsi: menjelaskan penyebab.")),
        ],
      },
    ],
    checkpoint: [
      spokenQ("l3-lis-2-c1", "What is the main topic of the lecture?", ["A biological boundary between Asian and Australian species", "The life of a famous explorer", "Climate change in Bali", "How to classify birds"], A, "Topik utama."),
      spokenQ("l3-lis-2-c2", "According to the professor, which animals are found east of the line?", ["Marsupials and cockatoos", "Tigers and monkeys", "Woodpeckers and elephants", "Orangutans and rhinos"], A, "Sebelah timur: marsupial dan kakatua."),
      spokenQ("l3-lis-2-c3", "What can be inferred about the channel along the Wallace Line?", ["It is very deep.", "It is very shallow.", "It was built by people.", "It dries up every summer."], A, "Never dry → dalam."),
      spokenQ("l3-lis-2-c4", "What is the professor's attitude toward Wallace's idea?", ["She thinks it is basically correct but not perfectly precise.", "She thinks it is completely wrong.", "She has no opinion.", "She thinks it applies only to plants."], A, "The basic pattern still holds."),
      spokenQ("l3-lis-2-c5", "What will the class discuss next week?", ["How the idea applies to plants", "The ice ages in Europe", "Marsupials in Australia", "Wallace's travel diary"], A, "Next week…"),
      pickMany("l3-lis-2-c6", "Choose ALL the signals that introduce a restatement or definition.", ["In other words", "That is", "To sum up", "Surprisingly"], [0, 1], "Restatement signals."),
    ],
  },
  {
    id: "l3-lis-3",
    skill: "listening",
    title: "Speed and Accuracy: Full Listening Practice",
    summary: "Mixed Part A, B and C practice under time pressure with advanced distractors.",
    minutes: 18,
    sections: [
      {
        title: "Advanced distractors",
        blocks: [
          table(["Distractor", "Example"], [["Similar sounds", "audio: “sail” → option: “sale”"], ["Wrong person", "the man's idea attributed to the woman"], ["Wrong time", "audio says “postponed”, option says “cancelled”"], ["Too literal", "idiom translated word for word"], ["Partly true", "half the option matches the audio"]]),
          tip("Jika ragu, eliminasi pilihan yang **mengulang kata persis dari audio**: jawaban benar lebih sering berupa **restatement**."),
        ],
      },
      {
        title: "Practice conversation",
        blocks: [
          audio("Conversation: Choosing a research topic", say(["man", "Hi, Professor Lestari. Do you have a minute to talk about my research topic?"], ["woman", "Of course. What are you thinking of?"], ["man", "I want to study plastic waste in rivers, but I'm worried it's too broad."], ["woman", "You're right to be worried. Why not focus on one river? The Citarum, for example, has a lot of existing data, so you wouldn't have to collect everything yourself."], ["man", "That makes sense. Should I interview residents too?"], ["woman", "Only if you have time. I'd start with the data, then decide."])),
          tryIt(spokenQ("l3-lis-3-try", "What does the professor suggest?", ["Narrowing the topic to one river", "Choosing a completely new topic", "Interviewing residents first", "Studying plastic in the ocean"], A, "Why not focus on one river?")),
        ],
      },
    ],
    checkpoint: [
      spokenQ("l3-lis-3-c1", "Why does the professor mention the Citarum?", ["It has a lot of existing data.", "It is the cleanest river.", "She lives near it.", "It has no plastic."], A, "Data sudah banyak."),
      spokenQ("l3-lis-3-c2", "What is the student worried about?", ["His topic is too broad.", "He has no data.", "He doesn't like rivers.", "The deadline is tomorrow."], A, "Too broad."),
      spokenQ("l3-lis-3-c3", "What does the professor imply about interviews?", ["They are optional and depend on time.", "They are required.", "They are a waste of time.", "They should be done first."], A, "Only if you have time."),
      partA("l3-lis-3-c4", [["man", "Will the sale on sailing boats continue?"], ["woman", "Not after this weekend."]], "What does the woman mean?",
        ["The sale ends after this weekend.", "The boats will sail this weekend.", "She will buy a boat.", "The sale has already ended."], A, "Not after this weekend = berakhir setelah akhir pekan."),
      partA("l3-lis-3-c5", [["woman", "Is the field trip cancelled because of the rain?"], ["man", "It's been pushed back a week."]], "What does the man mean?",
        ["The trip has been postponed.", "The trip has been cancelled.", "The trip is today.", "The trip will be shorter."], A, "Pushed back = ditunda."),
      mc("l3-lis-3-c6", "An option repeats an exact phrase from the audio but changes the meaning. This is usually…", ["a distractor", "the correct answer", "a restatement", "a main idea"], A, "Jebakan kata persis."),
    ],
  },
];

// --- Structure --------------------------------------------------------------

const STRUCTURE: Lesson[] = [
  {
    id: "l3-str-1",
    skill: "structure",
    title: "Inversion and Special Word Order",
    summary: "Inverted subjects after negative and limiting expressions, place expressions and conditionals.",
    minutes: 16,
    sections: [
      {
        title: "Negative and limiting expressions",
        blocks: [
          table(["Expression at the start", "Inverted example"], [["Never / Rarely / Seldom", "Rarely do tigers attack humans."], ["Not only", "Not only did the flood damage roads, but it also closed schools."], ["Hardly / Scarcely … when", "Hardly had we arrived when it began to rain."], ["Only + time/place", "Only after the war did the city recover."], ["No sooner … than", "No sooner had the bell rung than students left."]]),
          warn("Setelah ungkapan negatif di **awal kalimat**, pakai urutan **pertanyaan**: auxiliary + subject + verb (*Rarely **do tigers** attack*), bukan *Rarely tigers attack*."),
        ],
      },
      {
        title: "Other inversions",
        blocks: [
          table(["Type", "Example"], [["Place expression + intransitive verb", "On the hill stands an old lighthouse."], ["Conditional without if", "Had the team trained harder, it would have won. / Should you need help, call us."], ["So / Neither", "So do I. / Neither does she."], ["Comparisons", "Jakarta is larger than is Surabaya. (optional inversion)"]]),
          tryIt(completion("l3-str-1-try", "Seldom ____ such a beautiful sunset.", ["have I seen", "I have seen", "I seen", "seen I have"], A, "Seldom di depan → have I seen.")),
        ],
      },
    ],
    checkpoint: [
      completion("l3-str-1-c1", "Not only ____ the exam, but she also won a scholarship.", ["did she pass", "she passed", "she did pass", "passed she"], A, "Not only + inversi."),
      completion("l3-str-1-c2", "____ more time, the researchers would have finished the survey.", ["Had they had", "They had", "If they have", "Having they"], A, "Had they had = If they had had."),
      completion("l3-str-1-c3", "In the center of the village ____ a banyan tree.", ["stands", "it stands", "standing", "does stand it"], A, "Place expression + inversi."),
      wrong("l3-str-1-c4", "[A:Rarely] [B:the volcano] [C:erupts] [D:without warning].", "B", "does the volcano (erupt)", "Rarely di depan → Rarely does the volcano erupt."),
      completion("l3-str-1-c5", "Only after the bridge was built ____ trade between the islands increase.", ["did", "it did", "that", "was"], A, "Only after … did + subject + verb."),
      completion("l3-str-1-c6", "____ you have any questions, please contact the office.", ["Should", "If should", "Would", "Had"], A, "Should you = If you."),
    ],
  },
  {
    id: "l3-str-2",
    skill: "structure",
    title: "Comparisons and Participial Phrases",
    summary: "Comparative and superlative forms, double comparatives, and -ing / -ed phrases that modify the subject.",
    minutes: 16,
    sections: [
      {
        title: "Comparisons",
        blocks: [
          table(["Pattern", "Example"], [["comparative + than", "Sumatra is larger than Java."], ["the + superlative", "Puncak Jaya is the highest peak in Indonesia."], ["as + adjective + as", "This method is as effective as the old one."], ["the + comparative…, the + comparative", "The higher you climb, the colder it gets."], ["different from / similar to / the same as", "Its structure is similar to that of a fern."]]),
          examples([{ wrong: "more faster", right: "faster" }, { wrong: "the most tallest", right: "the tallest" }, { wrong: "The more you practice, you become more fluent.", right: "The more you practice, the more fluent you become." }, { wrong: "Its climate is similar to Bali.", right: "Its climate is similar to that of Bali.", note: "Bandingkan hal sejenis." }]),
        ],
      },
      {
        title: "Participial phrases",
        blocks: [
          table(["Form", "Meaning", "Example"], [["-ing phrase", "active (subject does it)", "Hoping to find water, the explorers dug a well."], ["-ed / V3 phrase", "passive (subject receives it)", "Built in 1920, the bridge is still in use."], ["Having + V3", "completed before", "Having finished the test, she left."]]),
          warn("Frasa partisip di awal kalimat harus menerangkan **subjek** kalimat utama. *Built in 1920, **tourists** visit the bridge* ❌ (seolah turisnya dibangun) → *Built in 1920, **the bridge** attracts tourists* ✅."),
          tryIt(completion("l3-str-2-try", "____ by heavy rain, the road was closed for two days.", ["Damaged", "Damaging", "It damaged", "Was damaged"], A, "Pasif: jalan dirusak hujan.")),
        ],
      },
    ],
    checkpoint: [
      completion("l3-str-2-c1", "The longer the dry season lasts, ____ the risk of forest fires.", ["the greater", "greater", "the greatest", "more great"], A, "The + comparative…, the + comparative."),
      wrong("l3-str-2-c2", "The new airport is [A:much] [B:more larger] [C:than] the [D:old one].", "B", "larger", "Jangan pakai more + -er."),
      completion("l3-str-2-c3", "____ the map carefully, the hikers chose the safest route.", ["Having studied", "Studied", "Having been studied", "To studied"], A, "Having + V3 = selesai lebih dulu (aktif)."),
      wrong("l3-str-2-c4", "The climate of Lombok is [A:similar] [B:to] [C:Bali], with a [D:long] dry season.", "C", "that of Bali", "Bandingkan iklim dengan iklim (that of Bali)."),
      completion("l3-str-2-c5", "Puncak Jaya is ____ mountain in Indonesia.", ["the highest", "higher", "the most high", "highest than"], A, "Superlatif."),
      completion("l3-str-2-c6", "____ in many regional languages, the story is known throughout the archipelago.", ["Told", "Telling", "It is told", "Tells"], A, "Pasif menerangkan the story."),
    ],
  },
  {
    id: "l3-str-3",
    skill: "structure",
    title: "Written Expression: Word Choice, Pronouns and Redundancy",
    summary: "Commonly confused words, pronoun agreement, articles, prepositions and repeated ideas.",
    minutes: 16,
    sections: [
      {
        title: "Commonly confused words",
        blocks: [
          table(["Pair", "Use"], [["make / do", "make a decision, make progress / do research, do homework"], ["like / alike", "like + noun (like a tree) / alike at the end (they look alike)"], ["among / between", "among three or more / between two"], ["amount / number", "amount of + uncountable / number of + countable"], ["fewer / less", "fewer + countable / less + uncountable"], ["rise / raise", "rise (no object) / raise something"], ["affect / effect", "affect (verb) / effect (noun)"]]),
          pics([["question", "which word?"], ["pencil", "correct it"], ["report", "academic style"], ["owl-think", "check"]]),
        ],
      },
      {
        title: "Pronouns, articles and redundancy",
        blocks: [
          examples([{ wrong: "Each student must bring their own their calculator.", right: "Each student must bring his or her own calculator." }, { wrong: "The bees communicate with it dances.", right: "The bees communicate with their dances." }, { wrong: "The sun rises in an east.", right: "The sun rises in the east." }, { wrong: "They returned back to the village.", right: "They returned to the village.", note: "Redundansi: return = go back." }, { wrong: "The annual festival is held every year.", right: "The festival is held every year." }], "Errors to spot"),
          tryIt(wrong("l3-str-3-try", "The [A:number] of tourists who [B:visit] the island [C:have] risen [D:sharply].", "C", "has", "The number of … = tunggal → has.")),
        ],
      },
    ],
    checkpoint: [
      wrong("l3-str-3-c1", "The scientists [A:did] an important [B:discovery] [C:about] the [D:origin] of the species.", "A", "made", "Make a discovery."),
      wrong("l3-str-3-c2", "The two islands look very [A:like], [B:but] their [C:animals] are [D:different].", "A", "alike", "Alike di akhir/setelah look."),
      wrong("l3-str-3-c3", "There were [A:less] [B:students] in the class [C:than] [D:last year].", "A", "fewer", "Countable → fewer."),
      wrong("l3-str-3-c4", "Prices [A:raised] [B:sharply] [C:after] the [D:harvest] failed.", "A", "rose", "Rise tanpa objek."),
      wrong("l3-str-3-c5", "The village elders [A:repeated] the story [B:again] [C:to] the [D:children].", "B", "(delete “again”)", "Repeated again = redundan."),
      completion("l3-str-3-c6", "The new policy had a strong ____ on small businesses.", ["effect", "affect", "effective", "affection"], A, "Kata benda → effect."),
    ],
  },
];

// --- Reading ------------------------------------------------------------------

const READING: Lesson[] = [
  {
    id: "l3-rd-1",
    skill: "reading",
    title: "Complex Inference and Author's Assumptions",
    summary: "Drawing careful conclusions from long sentences, contrasts and the author's evaluation.",
    minutes: 18,
    passages: [SUBAK],
    sections: [
      {
        title: "Reading long academic sentences",
        blocks: [
          text("Kalimat panjang dalam teks level atas sering berisi **anak kalimat**, **frasa partisip** dan **kontras**. Temukan dulu **subjek dan kata kerja utama**, lalu lihat informasi tambahannya."),
          examples([{ right: "When agricultural experts introduced new rice varieties … in the 1970s, they largely ignored this system, assuming that it was based on ritual rather than practical knowledge.", note: "Inti: experts ignored this system. Alasan: mereka mengira subak hanya ritual." }], "Break it down"),
          tip("Soal **inference** level atas sering menanyakan **asumsi** yang keliru, **ironi**, atau **implikasi** sebuah penemuan."),
        ],
      },
      {
        title: "Practice with a passage",
        blocks: [
          { type: "passage", passage: SUBAK },
          vocab([["collectively", "secara bersama-sama", "meeting"], ["fallow", "dibiarkan kosong (tidak ditanami)", "leaf"], ["remarkably", "sangat/luar biasa", "trophy"], ["cultural landscape", "lanskap budaya", "map"]], "Words from the passage"),
          tryIt(rq("l3-rd-1-try", SUBAK.id, "What did the agricultural experts in the 1970s wrongly assume?", ["That subak was based only on ritual", "That rice could not grow in Bali", "That pests were not a problem", "That farmers had too much water"], A, "Baris 6–7.")),
        ],
      },
    ],
    checkpoint: [
      rq("l3-rd-1-c1", SUBAK.id, "What does the passage imply about the experts' approach?", ["It underestimated traditional knowledge.", "It was completely successful.", "It was designed by temple priests.", "It improved water sharing."], A, "Hasil mengecewakan → meremehkan pengetahuan tradisional."),
      rq("l3-rd-1-c2", SUBAK.id, "According to the passage, how did subak limit pests?", ["By coordinating flooding and fallow periods", "By using chemical pesticides", "By planting new rice varieties", "By building temples in fields"], A, "Baris 10–12."),
      rq("l3-rd-1-c3", SUBAK.id, "The word “remarkably” in line 10 is closest in meaning to", ["exceptionally", "slightly", "rarely", "surprisingly poorly"], A, "Remarkably = luar biasa."),
      rq("l3-rd-1-c4", SUBAK.id, "Why does the author mention computer models?", ["To show how modern research confirmed traditional practice", "To criticize technology", "To describe Balinese temples", "To explain UNESCO's process"], A, "Fungsi detail."),
      rq("l3-rd-1-c5", SUBAK.id, "Which of the following best describes the organization of the passage?", ["A traditional system, a failed change, and later recognition of its value", "A list of rice varieties", "A comparison of Bali and Java", "A biography of a farmer"], A, "Organisasi teks."),
      rq("l3-rd-1-c6", SUBAK.id, "What can be inferred about the author's view of subak?", ["The author respects it as both practical and cultural.", "The author thinks it is outdated.", "The author is neutral about its results.", "The author prefers fixed schedules."], A, "Sikap penulis."),
    ],
  },
  {
    id: "l3-rd-2",
    skill: "reading",
    title: "Hedging, Evidence and Paragraph Function",
    summary: "Distinguishing claims from evidence, hedged statements and the purpose of each part of a passage.",
    minutes: 17,
    passages: [SLEEP],
    sections: [
      {
        title: "Claims, evidence and hedging",
        blocks: [
          table(["Language", "Function"], [["appears to, is thought to, may, seems", "hedging (cautious claim)"], ["In one experiment…, Research shows…", "evidence"], ["Not all researchers agree…, some caution…", "limitation / counter-view"], ["Nonetheless, … strongly suggests", "conclusion despite limitations"]]),
          text("Soal TOEFL sering menanyakan **seberapa yakin** penulis. Kata *may, appears, suggests* menunjukkan **klaim hati-hati**, bukan fakta mutlak."),
        ],
      },
      {
        title: "Practice with a passage",
        blocks: [
          { type: "passage", passage: SLEEP },
          tryIt(rq("l3-rd-2-try", SLEEP.id, "What view does the passage say has been overturned?", ["That the sleeping brain is largely inactive", "That sleep is important for memory", "That students should sleep more", "That memory is emotional"], A, "Baris 1–2.")),
        ],
      },
    ],
    checkpoint: [
      rq("l3-rd-2-c1", SLEEP.id, "Why does the author mention the experiment in lines 5–7?", ["As evidence that sleep improves recall", "To criticize researchers", "To describe dreams", "To compare students and adults"], A, "Bukti pendukung."),
      rq("l3-rd-2-c2", SLEEP.id, "According to the passage, REM sleep has been linked to", ["emotional processing and creative problem solving", "factual memory only", "physical growth", "forgetting information"], A, "Baris 9–10."),
      rq("l3-rd-2-c3", SLEEP.id, "The word “undermining” in line 13 is closest in meaning to", ["weakening", "supporting", "measuring", "repeating"], A, "Undermine = melemahkan."),
      rq("l3-rd-2-c4", SLEEP.id, "Which statement best reflects the author's level of certainty?", ["The evidence is strong, though some details are still debated.", "Everything about sleep is fully understood.", "There is no evidence that sleep affects memory.", "Laboratory tasks are always accurate."], A, "Hedging + strongly suggests."),
      rq("l3-rd-2-c5", SLEEP.id, "What is the function of lines 10–12?", ["To acknowledge limitations and disagreement", "To introduce the topic", "To give a definition", "To recommend a product"], A, "Fungsi bagian."),
      rq("l3-rd-2-c6", SLEEP.id, "Which conclusion would the author most likely support?", ["Students preparing for exams should protect their sleep.", "Students should study all night before exams.", "Sleep has no role in learning.", "Only REM sleep matters."], A, "Baris 12–14."),
    ],
  },
  {
    id: "l3-rd-3",
    skill: "reading",
    title: "Full-Passage Strategy and Time Management",
    summary: "Managing 55 minutes for five passages, question order, and avoiding time traps.",
    minutes: 17,
    passages: [SPICE],
    sections: [
      {
        title: "Time plan",
        blocks: [
          table(["Step", "Time"], [["Skim the passage (topic + organization)", "about 1.5 minutes"], ["Answer ~10 questions", "about 8–9 minutes"], ["Total per passage", "about 10–11 minutes"], ["Five passages", "55 minutes"]]),
          tip("Kerjakan soal **detail** dan **kosakata** dengan cepat; tandai soal yang memakan waktu (misalnya *NOT/EXCEPT* atau *infer*) dan kembali jika masih ada waktu. **Jangan biarkan satu soal menghabiskan 3 menit.**"),
          pics([["clock", "55 minutes"], ["open-book", "5 passages"], ["target", "≈ 11 min each"], ["thumbs-up", "answer every question"]]),
        ],
      },
      {
        title: "Practice with a passage",
        blocks: [
          { type: "passage", passage: SPICE },
          tryIt(rq("l3-rd-3-try", SPICE.id, "What is the main idea of the passage?", ["Maluku spices had a major influence on world history.", "Cloves are used in cooking.", "The Dutch were the first traders in Asia.", "Spice prices have always been low."], A, "Gagasan utama.")),
        ],
      },
    ],
    checkpoint: [
      rq("l3-rd-3-c1", SPICE.id, "According to the passage, why were spices so expensive in Europe?", ["Their price multiplied as they passed through many traders.", "They were taxed by the Portuguese only.", "They grew in Europe.", "They were difficult to cook."], A, "Baris 4–5."),
      rq("l3-rd-3-c2", SPICE.id, "What motivated European expeditions to the islands?", ["Extraordinary profit", "Religious festivals", "Scientific curiosity only", "A shortage of rice"], A, "Baris 6–7."),
      rq("l3-rd-3-c3", SPICE.id, "Why does the author describe the end of the monopoly as ironic?", ["Seedlings were smuggled out, and prices collapsed despite brutal control.", "The Dutch never wanted a monopoly.", "Spices became more expensive.", "Trees grew faster in Europe."], A, "Ironi: kontrol keras tetap gagal."),
      rq("l3-rd-3-c4", SPICE.id, "The word “profoundly” in line 1 is closest in meaning to", ["deeply", "briefly", "lightly", "rarely"], A, "Profoundly = sangat mendalam."),
      rq("l3-rd-3-c5", SPICE.id, "All of the following are mentioned EXCEPT", ["the use of spices in medicine", "Arab traders", "the Dutch East India Company", "smuggled seedlings"], A, "Obat tidak disebut."),
      rq("l3-rd-3-c6", SPICE.id, "Which of the following can be inferred about cloves and nutmeg before European arrival?", ["They were already traded internationally.", "They were unknown outside Maluku.", "They were grown in Europe.", "They had no value."], A, "Baris 2–4."),
    ],
  },
];

export const L3_LESSONS: Lesson[] = [
  LISTENING[0], STRUCTURE[0], READING[0],
  LISTENING[1], STRUCTURE[1], READING[1],
  LISTENING[2], STRUCTURE[2], READING[2],
];

// --- Pretest, Big Quiz, Live ----------------------------------------------------

export const L3_PRETEST: LevelQuiz = {
  id: "l3-pre",
  title: "Level 3 Pretest",
  passPercent: 0,
  questions: [
    partA("l3-pre-1", [["woman", "Did you see the eclipse?"], ["man", "If only I hadn't overslept."]], "What does the man mean?", ["He missed the eclipse.", "He saw the eclipse.", "He woke up early.", "The eclipse was cancelled."], A, "If only I hadn't = menyesal; tidak melihat."),
    completion("l3-pre-2", "Never before ____ so many visitors to the museum.", ["had there been", "there had been", "there were", "been there"], A, "Never before + inversi."),
    wrong("l3-pre-3", "The [A:amount] of [B:people] [C:attending] the festival [D:increased].", "A", "number", "People = countable → number."),
    completion("l3-pre-4", "____ in 1945, the newspaper is one of the oldest in the country.", ["Founded", "Founding", "It was founded", "To found"], A, "Pasif: koran didirikan."),
    partA("l3-pre-5", [["man", "The repairs will be done by Friday."], ["woman", "Don't hold your breath."]], "What does the woman imply?", ["The repairs will probably take longer.", "The repairs are finished.", "She will repair it herself.", "Friday is a holiday."], A, "Don't hold your breath = jangan berharap cepat."),
  ],
};

export const L3_QUIZ: LevelQuiz = {
  id: "l3-quiz",
  title: "Big Quiz Level 3 — Advanced",
  passPercent: 70,
  passages: [SUBAK, SPICE],
  questions: [
    partA("l3q-1", [["woman", "Are you going to the reunion?"], ["man", "I would if I didn't have to work that night."]], "What does the man mean?", ["He can't go because he has to work.", "He will go after work.", "He doesn't like reunions.", "The reunion is cancelled."], A, "Kondisional → tidak bisa pergi."),
    partA("l3q-2", [["man", "Wasn't the view from the top incredible?"], ["woman", "It certainly was."]], "What do the speakers think about the view?", ["It was very impressive.", "It was disappointing.", "They didn't see it.", "It was too foggy."], A, "Pertanyaan negatif = pernyataan positif kuat."),
    partA("l3q-3", [["woman", "The director promised the new lab would open in January."], ["man", "I'll believe it when I see it."]], "What can be inferred about the man?", ["He is doubtful about the opening date.", "He works in the lab.", "He saw the new lab.", "He trusts the director completely."], A, "Ia ragu lab dibuka tepat waktu."),
    spokenQ("l3q-4", "What is the main point of the talk?", ["Traditional houses in Toraja are designed with cultural meaning.", "Modern houses are better than traditional ones.", "Toraja is a city in Java.", "Roofs should be made of metal."], A, "Topik utama.",
      say(["man", "In Tana Toraja, in South Sulawesi, traditional houses called tongkonan are much more than places to live. Their dramatic, boat-shaped roofs are thought to recall the boats in which the Torajan ancestors arrived. Each house faces north, the direction associated with the ancestors, and the buffalo horns displayed on the front show the family's status. Because building a tongkonan requires the cooperation of an entire extended family, the houses also serve as symbols of kinship."])),
    spokenQ("l3q-5", "Why are buffalo horns displayed on the houses?", ["To show the family's status", "To scare away animals", "To decorate the roof for tourists", "To show the direction north"], A, "Status keluarga."),
    completion("l3q-6", "Scarcely ____ the stage when the audience began to cheer.", ["had the singer reached", "the singer had reached", "the singer reached", "reached the singer"], A, "Scarcely + inversi."),
    completion("l3q-7", "The more carefully you read, ____ you will make.", ["the fewer mistakes", "fewer mistakes", "the less mistakes", "less the mistakes"], A, "The + comparative; fewer + countable."),
    wrong("l3q-8", "[A:Having been finished] the report, the students [B:submitted] it [C:to] [D:their] teacher.", "A", "Having finished", "Aktif: Having finished."),
    wrong("l3q-9", "The [A:effect] of the new law [B:have] been [C:widely] [D:discussed].", "B", "has", "The effect … = tunggal."),
    wrong("l3q-10", "The village [A:elders] [B:discussed about] the problem [C:for] several [D:hours].", "B", "discussed", "Discuss langsung diikuti objek, tanpa about."),
    rq("l3q-11", SUBAK.id, "What is the passage mainly about?", ["A traditional water-management system and its proven effectiveness", "The history of UNESCO", "New rice varieties in Asia", "Temple architecture in Bali"], A, "Gagasan utama."),
    rq("l3q-12", SUBAK.id, "What happened after the new schedules were introduced?", ["Pests spread and water shortages increased.", "Harvests doubled immediately.", "Temples were closed.", "Farmers left Bali."], A, "Baris 7–8."),
    rq("l3q-13", SUBAK.id, "The author's attitude toward the 1970s experts is best described as", ["critical", "admiring", "neutral and uninterested", "humorous"], A, "Mereka mengabaikan sistem; hasilnya buruk."),
    rq("l3q-14", SPICE.id, "What does the author suggest about the Dutch monopoly?", ["It was harsh but ultimately unsuccessful.", "It lasted for many centuries.", "It was peaceful and fair.", "It was established by Arab traders."], A, "Brutal lalu runtuh."),
    rq("l3q-15", SPICE.id, "The phrase “alter the political map” in lines 13–14 means", ["change which powers controlled territories", "redraw the islands' coastlines", "print new maps of Maluku", "move the islands"], A, "Makna kiasan."),
  ],
};

export const L3_HOTS = new Set(["l3q-3", "l3q-13", "l3q-14", "l3q-15"]);

export const L3_LIVE: LiveQuizSet = {
  title: "Live Quiz — TOEFL ITP Advanced",
  questions: [
    live("l3-live-1", "Rarely ___ late.", ["is he", "he is", "he does", "does is he"], 0, "clock"),
    live("l3-live-2", "“If only I had known” means…", ["I didn't know", "I knew", "I will know", "I know now"], 0, "owl-think"),
    live("l3-live-3", "make or do: ___ research", ["do", "make", "take", "have"], 0, "report"),
    live("l3-live-4", "___ of students (countable)", ["number", "amount", "less", "much"], 0, "graduation"),
    live("l3-live-5", "Prices ___ last year.", ["rose", "raised", "rised", "arose up"], 0, "money"),
    live("l3-live-6", "The higher you climb, ___ it gets.", ["the colder", "colder", "the coldest", "more cold"], 0, "mountain"),
    live("l3-live-7", "Reading: about how many minutes per passage?", ["3", "11", "25", "55"], 1, "open-book"),
    live("l3-live-8", "Hedging word:", ["may", "always", "never", "certainly"], 0, "question"),
  ],
};
