import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { audio, fill, listen, live, match, pick, pickMany, pics, say, speaking, table, text, tfng, tip, trPick, tryIt, vocab, voice, warn, writing, ynng } from "../kit";

// IELTS Academic — Level 6: Band 7.5+ and exam readiness.

const LANGUAGE: Passage = {
  id: "ielts6-language",
  title: "The Quiet Disappearance of Languages",
  lines: [
    "Of the roughly seven thousand languages spoken today, linguists estimate that around forty per cent are endangered, many with fewer than a thousand speakers. Indonesia alone is home to more than seven hundred, making it one of the most linguistically diverse nations on Earth.",
    "Language loss is rarely the result of a single dramatic event. More commonly, it occurs gradually, as parents conclude that their children's prospects will be better served by a dominant language. Each generation speaks the ancestral language a little less, until it survives only among the elderly.",
    "The consequences extend beyond the loss of words. Languages encode detailed knowledge of local ecosystems: some indigenous languages distinguish dozens of plant species that have no names in national languages, and with the language, this knowledge may vanish.",
    "Efforts to reverse the trend have met with mixed success. Documentation projects, which record speakers and compile dictionaries, preserve a valuable record but do not in themselves create new speakers. More ambitious revitalisation programmes, such as immersion schools in which children are taught entirely in the threatened language, have achieved notable results in some regions.",
    "Technology offers new possibilities. Smartphone apps, online dictionaries and social media allow dispersed communities to use their language daily, and young people who might once have regarded it as old-fashioned may come to see it as part of a distinctive identity.",
    "Nevertheless, no technological solution can substitute for the decision of families to speak a language at home. Ultimately, the survival of a language depends less on recordings than on whether it continues to be the medium of everyday life.",
  ],
};

export const BAND6: Level = {
  id: "ielts-b6",
  title: "Level 6 — Band 7.5+: Exam Ready",
  description: "Avoid small errors that cost marks, manage time on demanding texts, write sophisticated essays with grammatical range, and complete a full speaking mock test.",
  targetScore: "Target Band 7.5–8.0+",
  cover: ["trophy", "graduation", "target"],
  pretest: {
    id: "ielts-b6-pre",
    title: "Level 6 Pretest",
    passPercent: 0,
    questions: [
      pick("ielts-b6-pre1", "In Listening, “NO MORE THAN TWO WORDS” and you write “a wooden table”. Your answer is…", ["marked wrong", "marked correct", "half correct", "ignored"], 0, "Tiga kata → salah."),
      listen("ielts-b6-pre2", voice("You'll need two references from previous employers."), "Listen. What do you need?", ["references", "a reference", "employers", "a form"], 0, "Bentuk jamak: references."),
      trPick("ielts-b6-pre3", "“Kisaran kalimat kompleks” (grammar criterion) in English is…", ["grammatical range", "grammar distance", "sentence scale", "complex wideness"], 0, "Grammatical range."),
      pick("ielts-b6-pre4", "Which question type includes a word bank with more words than gaps?", ["summary completion with a list of words", "True/False/Not Given", "matching headings", "map labelling"], 0, "Word bank."),
      pick("ielts-b6-pre5", "How much time is recommended for Writing Task 2?", ["about 40 minutes", "about 20 minutes", "about 60 minutes", "about 10 minutes"], 0, "Task 2 bobotnya lebih besar."),
    ],
  },
  lessons: [
    {
      id: "ielts-b6-l1",
      skill: "listening",
      title: "Listening Precision: Spelling, Plurals and Word Limits",
      summary: "Small mistakes that cost Band 7.5+ candidates marks, and how to avoid them.",
      sections: [
        {
          title: "Common errors",
          blocks: [
            table(["Error", "Example", "Fix"], [["Missing plural", "two reference ✗", "two references ✓"], ["Over the word limit", "a large blue bag ✗ (TWO WORDS)", "blue bag ✓"], ["Spelling", "accomodation ✗", "accommodation ✓"], ["Wrong form", "economy (needed: economic)", "check the grammar of the gap"], ["Numbers", "15/50 confusion", "listen for stress: fifTEEN vs FIFty"]]),
            table(["Often misspelled", ""], [["accommodation", "environment"], ["government", "necessary"], ["questionnaire", "library"], ["Wednesday", "February"]]),
            tip("Di versi komputer, jawaban langsung diketik. Di versi kertas, ada **10 menit untuk memindahkan jawaban**. Di keduanya, ejaan salah = jawaban salah."),
          ],
        },
        {
          title: "Practice",
          blocks: [
            audio("Registering for a volunteer programme", say(["woman", "For the volunteer programme, you'll need to bring two passport photographs and a copy of your identity card."], ["man", "Do I need a medical certificate?"], ["woman", "Only if you're joining the diving team. Otherwise, no. The induction is on Wednesday the fifteenth of February, in the Government Building, room 314."])),
            tryIt(fill("ielts-b6-l1-try", "Complete (NO MORE THAN TWO WORDS): bring two passport ___", "bring two passport", "", ["photographs", "photos"], "Bentuk jamak.")),
            pics([["camera", "photographs"], ["passport", "identity card"], ["calendar", "Wednesday 15 February"], ["office", "Government Building"]]),
          ],
        },
      ],
      checkpoint: [
        fill("ielts-b6-l1-c1", "Complete (ONE WORD): Induction day: ___", "Induction day:", "", ["Wednesday"], "Ejaan: Wednesday."),
        fill("ielts-b6-l1-c2", "Complete (ONE WORD): Month: ___", "Month:", "", ["February"], "Ejaan: February."),
        fill("ielts-b6-l1-c3", "Complete (A NUMBER): Room ___", "Room", "", ["314"], "Room 314."),
        pick("ielts-b6-l1-c4", "Who needs a medical certificate?", ["only volunteers joining the diving team", "everyone", "nobody"], 0, "Only if diving."),
        pickMany("ielts-b6-l1-c5", "Choose ALL correctly spelled words.", ["accommodation", "questionnaire", "goverment", "neccessary"], [0, 1], "Government, necessary."),
        pick("ielts-b6-l1-c6", "The gap is “The study looked at the ___ effects of tourism.” You heard “economy”. What should you write?", ["economic", "economy", "economics"], 0, "Butuh kata sifat sebelum effects.", { hots: true }),
      ],
    },
    {
      id: "ielts-b6-l2",
      skill: "reading",
      title: "Reading Under Pressure: Demanding Texts",
      summary: "Summary completion with a word bank, inference in dense paragraphs, and time management for Passage 3.",
      passages: [LANGUAGE],
      sections: [
        {
          title: "Time plan",
          blocks: [
            table(["Passage", "Difficulty", "Suggested time"], [["1", "easiest", "about 17 minutes"], ["2", "medium", "about 20 minutes"], ["3", "hardest, often argumentative", "about 23 minutes"]]),
            warn("Jangan terpaku pada satu soal sulit. Tebak, beri tanda, lanjutkan, dan kembali jika masih ada waktu. **Tidak ada pengurangan nilai** untuk jawaban salah."),
            { type: "passage", passage: LANGUAGE },
          ],
        },
        {
          title: "Summary with a word bank",
          blocks: [
            text("Untuk ringkasan dengan **daftar kata**, pilihan kata **tidak sama persis** dengan teks: Anda harus memahami **makna**. Tentukan dulu kelas kata yang dibutuhkan (kata benda/sifat/kerja)."),
            table(["Word bank"], [["gradual · sudden · knowledge · prestige · documentation · immersion · identity · technology"]]),
            vocab([["endangered", "terancam punah", "earth"], ["encode", "menyandikan/menyimpan", "report"], ["revitalisation", "revitalisasi", "sprout"], ["dispersed", "tersebar", "map"], ["substitute for", "menggantikan", "hand"]], "Key vocabulary"),
            tryIt(pick("ielts-b6-l2-try", "Language loss is usually a ___ process. (Choose from the word bank.)", ["gradual", "sudden", "prestige"], 0, "Paragraf 2: occurs gradually.", { passageId: LANGUAGE.id })),
          ],
        },
      ],
      checkpoint: [
        pick("ielts-b6-l2-c1", "Indigenous languages may contain detailed ___ about ecosystems. (word bank)", ["knowledge", "identity", "technology"], 0, "Paragraf 3.", { passageId: LANGUAGE.id }),
        pick("ielts-b6-l2-c2", "Children taught entirely in a threatened language attend ___ schools. (word bank)", ["immersion", "documentation", "prestige"], 0, "Paragraf 4.", { passageId: LANGUAGE.id }),
        ynng("ielts-b6-l2-c3", "Documentation projects alone are enough to save a language.", "NO", "Paragraf 4: tidak menciptakan penutur baru.", { passageId: LANGUAGE.id }),
        ynng("ielts-b6-l2-c4", "Technology can change how young people view their ancestral language.", "YES", "Paragraf 5.", { passageId: LANGUAGE.id }),
        ynng("ielts-b6-l2-c5", "Governments should make indigenous languages compulsory in all schools.", "NOT GIVEN", "Tidak disarankan penulis.", { passageId: LANGUAGE.id }),
        pick("ielts-b6-l2-c6", "What is the writer's main conclusion?", ["Daily use within families is the key to a language's survival.", "Technology will save all languages.", "Dictionaries are the most important tool.", "Language loss is unavoidable."], 0, "Paragraf 6.", { passageId: LANGUAGE.id, hots: true }),
      ],
    },
    {
      id: "ielts-b6-l3",
      skill: "writing",
      title: "Writing for Band 8: Advanced Essays and Grammatical Range",
      summary: "Two-part questions, advantages vs. disadvantages, and a wide range of accurate complex structures.",
      sections: [
        {
          title: "Advanced question types",
          blocks: [
            table(["Question type", "What to do"], [["Two-part question: Why…? What can be done?", "answer BOTH parts fully, one body paragraph each"], ["Do the advantages outweigh the disadvantages?", "discuss both, then state which side is stronger"], ["Problem and solution", "explain causes/effects, then realistic solutions"], ["Positive or negative development?", "evaluate and take a clear stance"]]),
            text("**Task:** In many countries, minority languages are disappearing. Why is this happening, and what can be done to protect them? Write at least 250 words."),
          ],
        },
        {
          title: "Grammatical range",
          blocks: [
            table(["Structure", "Example"], [["Conditionals (mixed)", "Had schools supported local languages earlier, many would still be spoken today."], ["Relative clauses (non-defining)", "Indonesia, which has over 700 languages, …"], ["Passive with reporting verbs", "It is often assumed that… / Languages are thought to…"], ["Inversion for emphasis", "Not only does language loss erase words, but it also…"], ["Participle clauses", "Seeing better job prospects, parents often…"], ["Cleft sentences", "What matters most is whether families speak it at home."]]),
            warn("Range harus disertai **akurasi**. Satu struktur kompleks yang benar lebih baik daripada tiga yang salah."),
            writing({
              id: "ielts-b6-l3-write",
              title: "Two-part essay",
              prompt: "In many countries, minority languages are disappearing. Why is this happening, and what can be done to protect them? Write at least 250 words, using at least four different complex structures accurately.",
              image: "open-book",
              minWords: 260,
              maxWords: 350,
              tips: ["Intro: paraphrase + preview both answers", "Body 1: causes (economic pressure, migration, media)", "Body 2: solutions (immersion schooling, technology, family use)", "Conclusion: summarise both parts"],
              models: [{ label: "Band 8 model", text: "Across the world, numerous minority languages are falling silent, often without attracting much attention. This essay will argue that economic pressure is the principal cause, and that the most effective responses combine education with everyday use in families and media.\nThe main reason for language decline is economic. Seeing better job prospects in a dominant language, many parents deliberately raise their children in the national or international language rather than their ancestral one. Migration to cities accelerates this shift, since children growing up in mixed urban neighbourhoods rarely need their parents' language outside the home. Not only does this reduce the number of speakers, but it also lowers the language's prestige, so that it comes to be associated with the past rather than the future.\nReversing this trend requires more than recording elderly speakers, valuable as such documentation is. What is most effective is creating situations in which young people actually need and enjoy the language. Immersion programmes, in which subjects are taught entirely in the minority language, have revived languages in several regions. Had such schools been introduced earlier, many more languages would still be spoken today. In addition, digital tools such as keyboards, dictionaries and social media content can make the language part of modern youth culture.\nIn conclusion, minority languages are disappearing largely because of economic and social pressures, but they can be protected if governments and communities ensure that they remain living languages of school, media and home." }],
              rubric: ["I answered both parts of the question fully.", "I used at least four different complex structures accurately.", "My paragraphs are logically sequenced with a clear progression.", "I used precise, sophisticated vocabulary naturally.", "There are very few errors."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("ielts-b6-l3-c1", "A question asks “Why is this happening, and what can be done?”. What is the biggest risk?", ["answering only one part", "writing 260 words", "using paragraphs"], 0, "Jawab kedua bagian."),
        match("ielts-b6-l3-c2", "Match the structure and the example.", [["inversion", "Not only does it…, but it also…"], ["cleft sentence", "What matters most is…"], ["mixed conditional", "Had they acted earlier, it would still…"], ["participle clause", "Seeing better prospects, parents…"]], "Struktur kompleks."),
        fill("ielts-b6-l3-c3", "Complete (inversion): Not only ___ language loss erase words, but it also erases knowledge.", "Not only", "language loss erase words, but it also erases knowledge.", ["does"], "Not only does + subject + verb."),
        pick("ielts-b6-l3-c4", "Which sentence is a correct cleft sentence?", ["What is most effective is daily use at home.", "What most effective is daily use at home.", "It is what effective daily use."], 0, "Cleft."),
        trPick("ielts-b6-l3-c5", "“Seandainya sekolah mendukung bahasa lokal lebih awal, banyak bahasa masih digunakan hari ini.” in English is…", ["Had schools supported local languages earlier, many would still be spoken today.", "If schools support local languages earlier, many will be spoken today.", "Schools had supported, many languages still speak today."], 0, "Mixed conditional + inversion."),
        pick("ielts-b6-l3-c6", "Which approach best balances range and accuracy?", ["using several complex structures you can control accurately", "using as many complex structures as possible, even with errors", "using only simple sentences"], 0, "Range + akurasi.", { hots: true }),
      ],
    },
    {
      id: "ielts-b6-l4",
      skill: "speaking",
      title: "Full Speaking Mock Test",
      summary: "Exam-day strategies and a complete Part 1–3 simulation.",
      sections: [
        {
          title: "Exam-day strategies",
          blocks: [
            table(["Do", "Don't"], [["speak naturally and extend answers", "memorise long scripts (examiners notice)"], ["ask for repetition if needed", "stay silent for long periods"], ["correct yourself briefly if needed", "worry about every small mistake"], ["show range: compare, speculate, evaluate", "answer only yes or no"], ["keep eye contact and a steady pace", "speak too fast to impress"]]),
            pics([["microphone", "speak clearly"], ["clock", "steady pace"], ["eye", "eye contact"], ["happy", "stay calm"]]),
          ],
        },
        {
          title: "The mock test",
          blocks: [
            audio("Examiner instructions", say(["man", "Part 1. Let's talk about where you live. Do you live in a house or an apartment? What do you like most about your neighbourhood?"], ["man", "Part 2. Here is your topic. Describe a time when you had to learn something difficult. You should say what it was, why you had to learn it, how you learned it, and explain how you felt about it. You have one minute to prepare."], ["man", "Part 3. Let's consider learning in general. Why do some people find it easier to learn new skills than others? Do you think technology has made learning easier or more superficial?"])),
            speaking({
              id: "ielts-b6-l4-say",
              title: "Mock speaking test",
              prompt: "Complete the mock test: Part 1 (answer the two questions), Part 2 (1 minute preparation, then speak for up to 2 minutes on learning something difficult), Part 3 (answer the two discussion questions). Record yourself and evaluate using the rubric.",
              image: "microphone",
              prepSeconds: 60,
              seconds: 420,
              tips: ["Part 1: direct answer + reason + detail", "Part 2: cover all bullet points with a story", "Part 3: opinion → reasons → examples → other perspective", "Use a range of structures: conditionals, relative clauses, comparisons"],
              models: [{ label: "Part 3 model", text: "I think it depends partly on mindset and partly on circumstances. People who see mistakes as part of the process tend to persist longer, whereas those who fear failure often give up early. Circumstances matter too: someone with time, money and a good teacher obviously has an advantage. As for technology, I'd say it's made learning far more accessible, since anyone can watch a tutorial for free. Having said that, there's a risk of superficial learning. Watching ten short videos isn't the same as practising a skill deliberately for months, so technology helps most when it supports, rather than replaces, sustained practice." }],
              rubric: ["Fluency & coherence: I spoke at length with logical links.", "Lexical resource: I used precise and some less common vocabulary.", "Grammatical range & accuracy: I used varied structures with few errors.", "Pronunciation: I was easy to understand, with natural stress and intonation.", "I answered every question appropriately."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("ielts-b6-l4-c1", voice("Do you think technology has made learning easier or more superficial?"), "Listen. Which part of the test is this question from?", ["Part 3", "Part 1", "Part 2"], 0, "Pertanyaan abstrak."),
        pick("ielts-b6-l4-c2", "Why is memorising long scripts a bad idea?", ["Examiners can recognise them, and they don't show natural language.", "It is not allowed to speak.", "It makes you too fluent."], 0, "Hafalan terdeteksi."),
        pickMany("ielts-b6-l4-c3", "Choose ALL good exam-day behaviours.", ["asking for repetition when needed", "extending answers", "brief self-correction", "answering only yes or no"], [0, 1, 2], "Strategi baik."),
        fill("ielts-b6-l4-c4", "Complete: Technology helps most when it supports, rather than ___ , practice.", "Technology helps most when it supports, rather than", ", practice.", ["replaces"], "Rather than replaces."),
        trPick("ielts-b6-l4-c5", "“Dangkal” (learning) in English is…", ["superficial", "superior", "supernatural"], 0, "Superficial."),
        pick("ielts-b6-l4-c6", "Which Part 3 answer shows the widest range?", ["It depends; people who see mistakes as useful tend to persist, whereas those who fear failure often give up.", "Some people are smart.", "Yes, technology is good."], 0, "Analisis + kontras.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ielts-b6-post",
    title: "Level 6 Final Mock Quiz",
    passPercent: 75,
    passages: [LANGUAGE],
    questions: [
      listen("ielts-b6-post1", say(["man", "Applicants should send a covering letter and three references to the faculty office."]), "Listen. How many references are required?", ["three", "two", "one", "four"], 0, "Three references."),
      fill("ielts-b6-post2", "Complete (ONE WORD), spelling counts: Send the form to the ___ office.", "Send the form to the", "office.", ["faculty"], "Faculty office.", { audio: say(["man", "Send the form to the faculty office."]) }),
      listen("ielts-b6-post3", say(["woman", "Although the original plan was to interview farmers, we eventually relied on satellite data, because the roads were flooded."]), "Listen. What data did they finally use?", ["satellite data", "farmer interviews", "a questionnaire", "photographs"], 0, "Eventually relied on.", { hots: true }),
      tfng("ielts-b6-post4", "Around forty per cent of the world's languages are endangered.", "TRUE", "Paragraf 1.", { passageId: LANGUAGE.id }),
      ynng("ielts-b6-post5", "Language loss usually happens suddenly.", "NO", "Paragraf 2: gradually.", { passageId: LANGUAGE.id }),
      ynng("ielts-b6-post6", "Immersion schools have succeeded in some regions.", "YES", "Paragraf 4.", { passageId: LANGUAGE.id }),
      pick("ielts-b6-post7", "Why does the writer mention plant species in paragraph 3?", ["to show that losing a language can mean losing ecological knowledge", "to describe Indonesian forests", "to criticise national languages", "to recommend gardening"], 0, "Fungsi contoh.", { passageId: LANGUAGE.id, hots: true }),
      pick("ielts-b6-post8", "The word “dispersed” in paragraph 5 is closest in meaning to", ["scattered", "united", "wealthy", "elderly"], 0, "Dispersed = tersebar.", { passageId: LANGUAGE.id }),
      pick("ielts-b6-post9", "Which sentence contains an accurate inversion?", ["Rarely have so many languages disappeared so quickly.", "Rarely so many languages have disappeared.", "Rarely languages disappeared have."], 0, "Rarely + have + subject."),
      pick("ielts-b6-post10", "For a two-part Task 2 question, the best structure is…", ["one body paragraph for each part, both fully developed", "answering only the more interesting part", "a single long paragraph"], 0, "Struktur dua bagian."),
    ],
  },
  live: {
    title: "Live Quiz — IELTS Champion",
    questions: [
      live("ielts-b6-live1", "Correct spelling:", ["accommodation", "accomodation", "acommodation", "accommodasion"], 0, "house"),
      live("ielts-b6-live2", "Hardest reading passage:", ["Passage 3", "Passage 1", "Passage 2", "all equal"], 0, "open-book"),
      live("ielts-b6-live3", "Not only ___ it help, but…", ["does", "it does", "do", "is"], 0, "thumbs-up"),
      live("ielts-b6-live4", "“Terancam punah” =", ["endangered", "dangerous", "extinct", "enlarged"], 0, "earth", true),
      live("ielts-b6-live5", "Task 2 recommended time:", ["40 minutes", "20 minutes", "60 minutes", "10 minutes"], 0, "clock"),
      live("ielts-b6-live6", "Cleft sentence:", ["What matters is practice.", "Practice matters.", "Matters practice.", "Is practice what."], 0, "target"),
      live("ielts-b6-live7", "Wrong answers lose marks in IELTS?", ["No", "Yes", "Only in Reading", "Only in Listening"], 0, "question"),
      live("ielts-b6-live8", "Memorised scripts in Speaking are…", ["a bad idea", "required", "recommended", "always rewarded"], 0, "microphone"),
    ],
  },
};
