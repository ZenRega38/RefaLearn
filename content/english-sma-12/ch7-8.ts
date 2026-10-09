import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 12 (SMA, Fase F). Chapter 7 — Academic Skills · Chapter 8 — Looking Back, Moving Forward

const ACADEMIC: Passage = {
  id: "sma12-c7-academic",
  title: "Sleep and Academic Performance in Adolescents",
  pic: "sleep",
  lines: [
    "Sleep plays a crucial role in learning and memory. During deep sleep, the brain consolidates information acquired during the day, transferring it from short-term to long-term memory.",
    "Despite its importance, insufficient sleep is common among adolescents. A number of surveys in Southeast Asia have found that many secondary school students sleep fewer than seven hours on school nights, well below the eight to ten hours recommended for their age group.",
    "Several factors contribute to this problem. Biological changes during puberty shift adolescents' natural sleep cycle later, making it difficult for them to fall asleep early. At the same time, early school start times require them to wake up before their bodies are fully rested.",
    "Technology use is another significant factor. Exposure to blue light from screens has been shown to delay the release of melatonin, a hormone that regulates sleep.",
    "The consequences of sleep deprivation are well documented. Students who sleep less tend to have lower concentration, weaker memory and higher levels of anxiety. Some studies also suggest a link between short sleep and lower examination results.",
    "Nevertheless, the relationship is complex. Academic performance is influenced by many variables, including motivation, family support and teaching quality, so sleep should be considered one factor among several.",
    "In conclusion, the available evidence indicates that adequate sleep supports academic success. Schools and families may therefore wish to consider later start times, limits on evening screen use and education about healthy sleep habits.",
  ],
};

export const CH7: Level = {
  id: "sma12-ch7",
  title: "Chapter 7 — Academic Skills",
  description: "Prepare for university: read academic texts, use academic vocabulary and hedging, take notes, paraphrase, summarise, cite sources and avoid plagiarism.",
  targetScore: "Reading · Writing · Vocabulary",
  cover: ["graduation", "open-book", "laptop"],
  pretest: {
    id: "sma12-c7-pre",
    title: "Chapter 7 Pretest",
    passPercent: 0,
    questions: [
      pick("sma12-c7-pre1", "Rewriting someone's idea in your own words while keeping the meaning is called…", ["paraphrasing", "plagiarising", "copying", "translating"], 0, "Parafrase."),
      listen("sma12-c7-pre2", voice("The findings suggest that exercise may improve memory, although further research is needed."), "Listen. How certain is the speaker?", ["fairly cautious", "completely certain", "not interested", "angry"], 0, "Suggest, may = hedging."),
      trPick("sma12-c7-pre3", "“Daftar pustaka” in English is…", ["reference list / bibliography", "library list", "book shop list", "reading room"], 0, "References."),
      pick("sma12-c7-pre4", "Which word is more academic than “get”?", ["obtain", "grab", "take it", "snatch"], 0, "Obtain = memperoleh."),
      pick("sma12-c7-pre5", "Using someone else's work without credit is…", ["plagiarism", "citation", "summary", "referencing"], 0, "Plagiarisme."),
    ],
  },
  lessons: [
    {
      id: "sma12-c7-l1",
      skill: "reading",
      title: "Reading an Academic Text",
      summary: "Features of academic writing; skimming, scanning and identifying main ideas.",
      passages: [ACADEMIC],
      sections: [
        {
          title: "The text",
          blocks: [
            { type: "passage", passage: ACADEMIC },
            vocab([["consolidate", "memperkuat/mengonsolidasi", "owl-think"], ["insufficient", "tidak mencukupi", "question"], ["deprivation", "kekurangan", "sleep"], ["variable", "variabel/faktor", "report"], ["adequate", "memadai", "thumbs-up"]], "Academic words"),
          ],
        },
        {
          title: "Features of academic writing",
          blocks: [
            table(["Feature", "Example from the text"], [["Formal, precise vocabulary", "consolidates, insufficient, documented"], ["Impersonal style", "It has been shown… / Studies suggest…"], ["Hedging (cautious claims)", "tend to, may, suggest, indicates"], ["Nominalisation (nouns from verbs)", "exposure, release, deprivation"], ["Evidence-based", "surveys, studies, recommended hours"], ["Acknowledging limits", "Nevertheless, the relationship is complex."]]),
            tip("**Skimming**: baca kalimat pertama tiap paragraf untuk ide pokok. **Scanning**: cari angka, nama, kata kunci untuk detail."),
            tryIt(pick("sma12-c7-l1-try1", "What happens during deep sleep, according to the text?", ["The brain consolidates information into long-term memory.", "The brain stops working.", "Melatonin disappears."], 0, "Baris 1.", { passageId: ACADEMIC.id })),
          ],
        },
      ],
      checkpoint: [
        pick("sma12-c7-l1-c1", "What is the main idea of line 3?", ["Biological changes and early school times reduce adolescents' sleep.", "Puberty improves sleep.", "Schools start too late."], 0, "Kalimat topik baris 3.", { passageId: ACADEMIC.id }),
        pick("sma12-c7-l1-c2", "What does blue light do?", ["delays the release of melatonin", "increases deep sleep", "improves memory"], 0, "Baris 4.", { passageId: ACADEMIC.id }),
        fill("sma12-c7-l1-c3", "Complete.", "Academic performance is influenced by many", ", including motivation, family support and teaching quality.", ["variables"], "Baris 6.", { passageId: ACADEMIC.id }),
        pickMany("sma12-c7-l1-c4", "Choose ALL the recommendations in the conclusion.", ["later school start times", "limits on evening screen use", "education about sleep habits", "longer school days"], [0, 1, 2], "Baris 7.", { passageId: ACADEMIC.id }),
        pick("sma12-c7-l1-c5", "Why does the writer include line 6?", ["to acknowledge that sleep is not the only factor, making the argument more balanced", "to contradict the whole text", "to tell a story"], 0, "Mengakui batasan.", { passageId: ACADEMIC.id, hots: true }),
        pick("sma12-c7-l1-c6", "Which phrase shows hedging in line 7?", ["the available evidence indicates", "In conclusion", "Schools and families", "healthy sleep habits"], 0, "Indicates = hati-hati.", { passageId: ACADEMIC.id, hots: true }),
      ],
    },
    {
      id: "sma12-c7-l2",
      skill: "writing",
      title: "Paraphrasing, Summarising and Citing",
      summary: "Techniques for paraphrasing, writing summaries, in-text citations and reference lists.",
      sections: [
        {
          title: "Paraphrasing techniques",
          blocks: [
            table(["Technique", "Original", "Paraphrase"], [["Synonyms", "Sleep plays a crucial role in learning.", "Sleep is essential for learning."], ["Change word form", "Insufficient sleep is common.", "Many adolescents do not sleep sufficiently."], ["Change structure (active/passive)", "Screens delay melatonin release.", "The release of melatonin is delayed by screens."], ["Change sentence order", "Because of puberty, teens sleep later.", "Teens sleep later, partly due to puberty."]]),
            warn("Parafrase yang baik mengubah **kata dan struktur** tetapi mempertahankan **makna**, dan tetap **mencantumkan sumber**. Mengganti satu-dua kata saja masih termasuk **plagiarisme**."),
          ],
        },
        {
          title: "Summaries and citations",
          blocks: [
            table(["Skill", "How"], [["Summary", "main ideas only, about 1/3 or less of the original, in your own words, no personal opinion"], ["In-text citation (APA style)", "(Rahman, 2024) or Rahman (2024) found that…"], ["Direct quotation", "“exact words” (Rahman, 2024, p. 12) — use sparingly"], ["Reference list entry", "Rahman, A. (2024). Sleep and learning in Indonesian teenagers. Jakarta: Pustaka Ilmu."]]),
            examples([{ right: "Original (Line 4): Exposure to blue light from screens has been shown to delay the release of melatonin, a hormone that regulates sleep." }, { right: "Paraphrase: Research indicates that the blue light emitted by digital devices can slow the production of melatonin, which controls the sleep cycle." }, { wrong: "Exposure to blue light from phone screens has been shown to delay melatonin, a hormone regulating sleep.", note: "Terlalu mirip dengan aslinya." }], "Paraphrase practice"),
            tryIt(pick("sma12-c7-l2-try1", "Which is an acceptable summary of line 5?", ["Lack of sleep is linked to poorer concentration, memory and wellbeing, and possibly lower grades.", "Students who sleep less tend to have lower concentration, weaker memory and higher levels of anxiety.", "I think students should sleep more."], 0, "Ringkas, kata sendiri, tanpa opini.")),
          ],
        },
      ],
      checkpoint: [
        listen("sma12-c7-l2-c1", voice("According to Santoso, writing in 2023, regular reading improves vocabulary."), "Listen. How would you cite this in APA style?", ["(Santoso, 2023)", "(2023, Santoso, p.)", "[Santoso said]"], 0, "Nama, tahun."),
        pick("sma12-c7-l2-c2", "Which is the best paraphrase of “Many students lack sufficient sleep”?", ["A large number of students do not get enough sleep.", "Many students lack sufficient sleeping.", "Students many lack sleep sufficient."], 0, "Sinonim + struktur baru."),
        match("sma12-c7-l2-c3", "Match the skill and the description.", [["paraphrase", "same meaning, new words and structure"], ["summary", "main ideas only, shorter"], ["quotation", "exact words in quotation marks"], ["reference list", "full details of sources at the end"]], "Keterampilan akademik."),
        fill("sma12-c7-l2-c4", "Complete: Rahman (2024) ___ that teenagers need nine hours of sleep. (menemukan)", "Rahman (2024)", "that teenagers need nine hours of sleep.", ["found", "reported", "showed"], "Reporting verb.", { translate: true }),
        trPick("sma12-c7-l2-c5", "“Kutipan langsung” in English is…", ["direct quotation", "direct quote-mark", "straight copy"], 0, "Direct quotation."),
        pick("sma12-c7-l2-c6", "A student copies three sentences from a website, changes two words and gives no source. This is…", ["plagiarism", "a good paraphrase", "a summary"], 0, "Plagiarisme.", { hots: true }),
      ],
    },
    {
      id: "sma12-c7-l3",
      skill: "listening",
      title: "Lectures and Note-Taking",
      summary: "Listening to a mini-lecture, taking structured notes and writing a short academic summary.",
      sections: [
        {
          title: "A mini-lecture",
          blocks: [
            audio("Mini-lecture: Urban heat islands", say(["man", "Good morning. Today we'll look at a phenomenon called the urban heat island effect. Simply put, cities are often several degrees warmer than the surrounding countryside."], ["man", "There are three main causes. First, materials such as asphalt and concrete absorb heat during the day and release it at night. Second, cities have fewer trees, so there is less shade and less cooling from plants. Third, cars, factories and air conditioners produce extra heat."], ["man", "The effects are significant. Higher temperatures increase energy use for cooling, worsen air pollution and can be dangerous for elderly people."], ["man", "Fortunately, there are solutions. Planting trees, creating green roofs and using lighter-coloured materials can lower urban temperatures. Jakarta, for instance, has been expanding its green open spaces."], ["man", "To sum up: cities trap heat, but smart design can help them cool down. Next week, we'll examine green building design in more detail."]), true),
            table(["Note-taking tip", "Example"], [["Use headings", "Causes / Effects / Solutions"], ["Abbreviations and symbols", "↑ increase, ↓ decrease, → leads to, e.g., b/c (because)"], ["Listen for signposts", "There are three main causes… / To sum up…"], ["Key words only", "asphalt + concrete → absorb heat"]]),
          ],
        },
        {
          title: "Notes to summary",
          blocks: [
            tryIt(pick("sma12-c7-l3-try1", "What are the three causes of urban heat islands?", ["heat-absorbing materials, fewer trees, heat from human activity", "rain, wind, snow", "rivers, mountains, sea"], 0, "Tiga penyebab.")),
            pics([["traffic", "heat from cars"], ["tree", "fewer trees"], ["factory", "factories"], ["sprout", "green roofs"]]),
            writing({
              id: "sma12-c7-l3-write",
              title: "Lecture summary",
              prompt: "Using your notes from the mini-lecture, write an academic summary (120–180 words) of the urban heat island effect. Include the definition, causes, effects and solutions. Use formal vocabulary, hedging and no personal opinions.",
              image: "report",
              minWords: 120,
              maxWords: 200,
              tips: ["The urban heat island effect refers to …", "This phenomenon is primarily caused by …", "As a result, …", "Possible solutions include …", "Overall, …"],
              models: [{ label: "Example", text: "The urban heat island effect refers to the tendency of cities to be several degrees warmer than surrounding rural areas. This phenomenon is primarily caused by three factors. Firstly, materials such as asphalt and concrete absorb heat during the day and release it at night. Secondly, the lack of trees reduces shade and natural cooling. Thirdly, vehicles, industries and air-conditioning units generate additional heat. As a result, urban areas may experience higher energy consumption, increased air pollution and health risks for vulnerable groups such as the elderly. Possible solutions include planting more trees, installing green roofs and using lighter-coloured building materials, as illustrated by the expansion of green open spaces in Jakarta. Overall, the lecture suggests that while cities tend to trap heat, careful urban design can significantly reduce this effect." }],
              rubric: ["I included the definition, causes, effects and solutions.", "I used my own words (paraphrased).", "I used formal vocabulary and hedging.", "I included no personal opinions.", "My summary is within the word limit."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sma12-c7-l3-c1", voice("To sum up, cities trap heat, but smart design can help them cool down."), "Listen. What does “To sum up” signal?", ["a conclusion", "a new cause", "a question"], 0, "Penanda kesimpulan."),
        pick("sma12-c7-l3-c2", "In note-taking, what does the symbol “→” usually mean?", ["leads to / causes", "decreases", "equals zero"], 0, "Panah = mengakibatkan."),
        arrange("sma12-c7-l3-c3", "Put the words in order.", "This phenomenon is primarily caused by three factors", "Kalimat akademik."),
        fill("sma12-c7-l3-c4", "Complete: The urban heat island effect ___ to the tendency of cities to be warmer.", "The urban heat island effect", "to the tendency of cities to be warmer.", ["refers"], "Refers to = mengacu pada."),
        trPick("sma12-c7-l3-c5", "“Ruang terbuka hijau” in English is…", ["green open space", "open green room", "green room open"], 0, "Green open space."),
        pick("sma12-c7-l3-c6", "Why should an academic summary avoid personal opinions?", ["Its purpose is to represent the source accurately and objectively.", "Opinions are always wrong.", "Teachers don't like students."], 0, "Objektivitas.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma12-c7-post",
    title: "Chapter 7 Posttest",
    passPercent: 70,
    passages: [ACADEMIC],
    questions: [
      pick("sma12-c7-post1", "Which sentence is the most academic?", ["The data indicate a significant increase in participation.", "The numbers went up a lot.", "Loads more people joined, wow!", "It got way bigger."], 0, "Gaya akademik."),
      listen("sma12-c7-post2", voice("These results should be interpreted with caution, as the sample size was relatively small."), "Listen. Why should we be careful with the results?", ["The sample was small.", "The data were lost.", "The researcher was tired.", "The test was too easy."], 0, "Sample size kecil."),
      trPick("sma12-c7-post3", "“Kurang tidur” (academic) in English is…", ["sleep deprivation", "sleep departure", "sleeping depression", "deprived sleeping"], 0, "Sleep deprivation."),
      pick("sma12-c7-post4", "Which in-text citation follows APA style?", ["(Wijaya, 2025)", "(2025: Wijaya says)", "<Wijaya 2025>", "[Wijaya wrote this]"], 0, "Nama, tahun."),
      arrange("sma12-c7-post5", "Put the words in order.", "Further research is needed to confirm these findings", "Kalimat hedging akademik."),
      pick("sma12-c7-post6", "How many hours of sleep are recommended for adolescents, according to the text?", ["eight to ten", "five to six", "eleven to twelve", "fewer than seven"], 0, "Baris 2.", { passageId: ACADEMIC.id }),
      match("sma12-c7-post7", "Match the informal word and the academic word.", [["get", "obtain"], ["show", "demonstrate"], ["big", "substantial"], ["find out", "discover"]], "Kosakata akademik."),
      fill("sma12-c7-post8", "Complete.", "Exposure to blue light from screens has been shown to delay the release of", ".", ["melatonin"], "Baris 4.", { passageId: ACADEMIC.id }),
      pick("sma12-c7-post9", "Which is the best paraphrase of line 2's main claim?", ["Many adolescents do not get the amount of sleep recommended for their age.", "Insufficient sleep is common among adolescents, well below recommended.", "Teenagers sleep a lot on weekends.", "All students sleep less than five hours."], 0, "Parafrase yang baik.", { passageId: ACADEMIC.id, hots: true }),
      pick("sma12-c7-post10", "What is the overall structure of the text?", ["background → problem → causes → effects → limitations → conclusion", "story → climax → ending", "steps → materials → goal", "thesis → recommendation only"], 0, "Struktur teks akademik.", { passageId: ACADEMIC.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Campus Ready",
    questions: [
      live("sma12-c7-live1", "Same meaning, new words:", ["paraphrase", "plagiarism", "quotation", "summary"], 0, "pencil"),
      live("sma12-c7-live2", "Academic for “get”:", ["obtain", "grab", "snatch", "take it"], 0, "open-book"),
      live("sma12-c7-live3", "Hedging word:", ["suggest", "prove", "always", "never"], 0, "owl-think"),
      live("sma12-c7-live4", "“Daftar pustaka” =", ["references", "reflections", "reports", "reviews"], 0, "library", true),
      live("sma12-c7-live5", "APA citation:", ["(Sari, 2024)", "[Sari 24]", "Sari's book!", "{2024-Sari}"], 0, "report"),
      live("sma12-c7-live6", "Main ideas only, shorter:", ["summary", "quotation", "essay", "transcript"], 0, "target"),
      live("sma12-c7-live7", "Note symbol for increase:", ["↑", "↓", "≠", "∅"], 0, "question"),
      live("sma12-c7-live8", "Read first sentences for gist:", ["skimming", "scanning", "skipping", "scrolling"], 0, "eye"),
    ],
  },
};

const SPEECH: Passage = {
  id: "sma12-c8-speech",
  title: "Valedictory Speech: The Things We Carry",
  pic: "graduation",
  lines: [
    "Respected Principal, teachers, parents and my fellow graduates, good morning.",
    "Three years ago, we arrived here carrying heavy backpacks, new shoes and a lot of fear. Some of us must have wondered whether we would ever find our way around this huge school.",
    "Looking back, we can't have known how much we would carry away from here. We carry knowledge, of course: formulas, essays, the irregular verbs that haunted us. But we also carry other things.",
    "We carry the memory of the pandemic years, when we studied through small screens and learned that a school is not a building, but its people.",
    "We carry the kindness of teachers who stayed late to explain things one more time. Some of you might have thought we weren't listening. We were. We just didn't say thank you often enough. So today: thank you.",
    "We carry the sacrifices of our parents, who must have woken up before dawn so many times to prepare our breakfast and pay our fees.",
    "And we carry each other: the friends who shared answers to impossible maths questions, umbrellas in the rainy season and secrets on the canteen bench.",
    "Now we are leaving for universities, jobs, and paths we cannot yet see. We will make mistakes. We should have studied harder for some tests, and we will probably wish we had taken more photos today.",
    "But wherever we go, let us carry the best of this place with us: curiosity, courage and compassion. Congratulations, Class of 2027. Thank you.",
  ],
};

export const CH8: Level = {
  id: "sma12-ch8",
  title: "Chapter 8 — Looking Back, Moving Forward",
  description: "Reflect on the past with modals of deduction and regret (must have, might have, can't have, should have), plan your future, and write and deliver a valedictory speech.",
  targetScore: "Structure · Speaking · Writing",
  cover: ["graduation", "target", "heart"],
  pretest: {
    id: "sma12-c8-pre",
    title: "Chapter 8 Pretest",
    passPercent: 0,
    questions: [
      pick("sma12-c8-pre1", "The ground is wet. It ___ rained last night.", ["must have", "can't have", "should have", "mustn't"], 0, "Deduksi kuat masa lalu."),
      listen("sma12-c8-pre2", voice("I should have studied harder for the chemistry test."), "Listen. How does the speaker feel?", ["regretful", "proud", "excited", "bored"], 0, "Should have = penyesalan."),
      trPick("sma12-c8-pre3", "“Pidato perpisahan” in English is…", ["farewell / valedictory speech", "welcome speech", "breakup letter", "sad song"], 0, "Valedictory speech."),
      pick("sma12-c8-pre4", "She ___ seen me. She didn't say hello.", ["might not have", "must have", "should", "can have"], 0, "Kemungkinan negatif."),
      pick("sma12-c8-pre5", "He was in Bandung all day, so he ___ been at the party in Bali.", ["can't have", "must have", "should have", "would"], 0, "Tidak mungkin."),
    ],
  },
  lessons: [
    {
      id: "sma12-c8-l1",
      skill: "structure",
      title: "Modals in the Past",
      summary: "Deduction (must have, might have, can't have) and regret or criticism (should have, shouldn't have, could have).",
      sections: [
        {
          title: "Deduction about the past",
          blocks: [
            table(["Certainty", "Form", "Example"], [["almost certain (yes)", "must have + V3", "She's not answering. She must have fallen asleep."], ["possible", "might / may / could have + V3", "He might have missed the bus."], ["almost certain (no)", "can't / couldn't have + V3", "They can't have finished already; they started five minutes ago."]]),
            pics([["sleep", "must have fallen asleep"], ["bus", "might have missed the bus"], ["clock", "can't have finished yet"], ["umbrella", "should have brought an umbrella"]]),
          ],
        },
        {
          title: "Regret, criticism and missed chances",
          blocks: [
            table(["Meaning", "Form", "Example"], [["regret / it was a good idea but you didn't", "should have + V3", "I should have brought an umbrella."], ["it was a bad idea but you did", "shouldn't have + V3", "We shouldn't have stayed up so late."], ["possible but didn't happen", "could have + V3", "You could have called me! I would have helped."], ["unnecessary action", "needn't have + V3", "You needn't have bought a gift."]]),
            audio("After the exam", say(["woman", "How did it go?"], ["man", "Not great. I should have revised the last chapter. Half the questions were about it!"], ["woman", "Really? Ms. Dewi must have told the class last week. You might have missed it when you were sick."], ["man", "Probably. I could have asked someone for the notes. Well, I'll know better next time."])),
            tryIt(pick("sma12-c8-l1-try1", "What does the boy regret?", ["not revising the last chapter", "being sick", "asking for notes"], 0, "Should have revised.")),
            repeat(["She must have forgotten.", "They might have got lost.", "He can't have seen us.", "I should have listened to you."]),
          ],
        },
      ],
      checkpoint: [
        listen("sma12-c8-l1-c1", voice("The lights are off and the car is gone. They must have gone out."), "Listen. How sure is the speaker?", ["almost certain", "not sure at all", "certain they are home"], 0, "Must have = hampir pasti."),
        pick("sma12-c8-l1-c2", "You ___ told me it was your birthday! I would have bought a cake.", ["could have", "must have", "can't have"], 0, "Kesempatan yang terlewat."),
        pick("sma12-c8-l1-c3", "Rina ___ written this essay. It's full of mistakes, and she's the best writer in class.", ["can't have", "must have", "should have"], 0, "Tidak mungkin."),
        fill("sma12-c8-l1-c4", "Complete: We ___ have eaten so much. Now I feel sick. (seharusnya tidak)", "We", "have eaten so much. Now I feel sick.", ["shouldn't", "should not"], "Shouldn't have.", { translate: true }),
        trPick("sma12-c8-l1-c5", "“Dia mungkin sudah pulang.” (past possibility) in English is…", ["She might have gone home.", "She might go home yesterday.", "She must go home."], 0, "Might have + V3."),
        pick("sma12-c8-l1-c6", "Your friend arrives soaking wet. Which is the most logical deduction?", ["It must have been raining outside.", "He can't have been outside.", "He should have rained."], 0, "Deduksi logis.", { hots: true }),
      ],
    },
    {
      id: "sma12-c8-l2",
      skill: "reading",
      title: "Reading: A Valedictory Speech",
      summary: "Rhetorical devices in speeches: repetition, tricolon, direct address and emotional appeal.",
      passages: [SPEECH],
      sections: [
        {
          title: "The speech",
          blocks: [
            { type: "passage", passage: SPEECH },
            audio("Listen to the speech", say(["woman", SPEECH.lines.join(" ")])),
            vocab([["haunt", "menghantui", "scared"], ["sacrifice", "pengorbanan", "heart"], ["compassion", "welas asih", "hand"], ["valedictory", "perpisahan (pidato wisuda)", "graduation"]], "Speech words"),
          ],
        },
        {
          title: "Rhetorical devices",
          blocks: [
            table(["Device", "Example from the speech", "Effect"], [["Repetition (anaphora)", "We carry… We carry… We carry…", "rhythm, unity, memorability"], ["Extended metaphor", "carrying things = memories and values", "connects the whole speech"], ["Tricolon (rule of three)", "curiosity, courage and compassion", "a memorable ending"], ["Direct address", "my fellow graduates / thank you", "personal connection"], ["Humour", "irregular verbs that haunted us", "relaxes the audience"], ["Modals of reflection", "must have wondered / should have studied", "shared memories and honesty"]]),
            tryIt(pick("sma12-c8-l2-try1", "Which phrase is repeated throughout the speech?", ["We carry", "Thank you", "Good morning"], 0, "Anafora.", { passageId: SPEECH.id })),
          ],
        },
      ],
      checkpoint: [
        pick("sma12-c8-l2-c1", "What did the pandemic years teach the students?", ["A school is its people, not a building.", "Screens are bad.", "Exams are easy."], 0, "Baris 4.", { passageId: SPEECH.id }),
        pick("sma12-c8-l2-c2", "Who “must have woken up before dawn” many times?", ["the parents", "the teachers", "the principal"], 0, "Baris 6.", { passageId: SPEECH.id }),
        fill("sma12-c8-l2-c3", "Complete.", "let us carry the best of this place with us: curiosity, courage and", ".", ["compassion"], "Baris 9.", { passageId: SPEECH.id }),
        pickMany("sma12-c8-l2-c4", "Choose ALL the things the friends shared.", ["answers to maths questions", "umbrellas", "secrets", "cars"], [0, 1, 2], "Baris 7.", { passageId: SPEECH.id }),
        pick("sma12-c8-l2-c5", "What is the extended metaphor in the speech?", ["carrying objects as a way of describing memories and values", "a journey by train", "a lighthouse"], 0, "Metafora berlanjut.", { passageId: SPEECH.id, hots: true }),
        pick("sma12-c8-l2-c6", "Why does the speaker admit “We should have studied harder for some tests”?", ["to sound honest and relatable", "to criticise the teachers", "to complain about exams"], 0, "Kejujuran membangun kedekatan.", { passageId: SPEECH.id, hots: true }),
      ],
    },
    {
      id: "sma12-c8-l3",
      skill: "speaking",
      title: "Your Farewell and Future",
      summary: "Writing a reflective letter or speech and delivering it with confidence.",
      sections: [
        {
          title: "Plan your speech",
          blocks: [
            table(["Part", "Ideas"], [["Greeting", "Respected principal, teachers, parents, fellow graduates"], ["Memory / hook", "a shared moment, a funny story, a metaphor"], ["Gratitude", "teachers, parents, staff, friends"], ["Reflection", "what we learned; honest regrets"], ["Looking forward", "hopes, advice, values to carry"], ["Closing", "congratulations, a memorable final line"]]),
            tip("Pilih **satu metafora utama** (perjalanan, buku, pohon, kapal…) agar pidato terasa utuh. Latih **jeda** dan **kontak mata**; jangan membaca setiap kata."),
          ],
        },
        {
          title: "Write and deliver",
          blocks: [
            writing({
              id: "sma12-c8-l3-write",
              title: "My valedictory speech",
              prompt: "Write a 3–4 minute valedictory speech for your graduation. Use an extended metaphor or a central image, at least three past modals (must have, might have, should have…), a tricolon and direct address.",
              image: "graduation",
              minWords: 280,
              maxWords: 420,
              tips: ["Greeting", "Hook: Three years ago, … / Imagine …", "Memories with past modals", "Thanks to teachers, parents, friends", "Honest reflection: We should have …", "Looking forward: wherever we go, …", "Memorable final line"],
              models: [{ label: "Example", text: "Respected Principal, dear teachers, beloved parents and my fellow graduates, good morning.\nThree years ago, we boarded a ship called SMA Negeri 2 Kendari. Some of us were seasick at first. We must have looked terrified on that first day, holding our timetables like maps of an unknown ocean.\nOur teachers were the crew. They guided us through storms of exams and calm afternoons of group projects. Some of you might have thought we were not listening when you repeated the same instructions for the fifth time. We were. Thank you for your patience.\nOur parents were the harbour, always waiting with food, prayers and questions about our grades. You must have worried about us more than we will ever know.\nAnd we, the passengers, became a crew of our own. We shared answers, umbrellas and dreams. Of course, we should have studied harder for some tests, and we definitely shouldn't have eaten so much fried tofu before the sports day relay.\nToday, our ship reaches the shore. Some of us will sail on to universities, some to work, some to places we cannot yet imagine.\nWherever we go, let us remember three things: to be curious, to be brave and to be kind.\nCongratulations, Class of 2027. Bon voyage!" }],
              rubric: ["My speech has a clear structure from greeting to closing.", "I used an extended metaphor or central image.", "I used at least three past modals correctly.", "I used a tricolon and direct address.", "My tone is sincere, warm and appropriate for the occasion."],
            }),
            speaking({
              id: "sma12-c8-l3-say",
              title: "Deliver your speech",
              prompt: "Deliver the opening and the ending of your valedictory speech (about two minutes). Focus on pace, pauses, eye contact and emotion.",
              image: "microphone",
              prepSeconds: 90,
              seconds: 120,
              tips: ["Slow down for important lines.", "Pause after a question or a joke.", "Look at different parts of the audience.", "Smile; let your voice show gratitude.", "Finish strongly; don't rush the last line."],
              models: [{ label: "Example opening", text: "Respected Principal, teachers, parents and my fellow graduates, good morning. [pause] Three years ago, we arrived here carrying heavy backpacks, new shoes and a lot of fear. [pause, smile] Some of us must have wondered whether we would ever find our way around this huge school. [pause] Looking back, we can't have known how much we would carry away from here." }, { label: "Example ending", text: "Now we are leaving for universities, jobs, and paths we cannot yet see. [pause] But wherever we go, let us carry the best of this place with us: [slow] curiosity, [pause] courage [pause] and compassion. [look up, smile] Congratulations, Class of 2027. Thank you." }],
              rubric: ["I spoke at a clear, steady pace.", "I used pauses for effect.", "I made eye contact (or looked up from notes).", "My voice showed sincere emotion.", "I delivered the final line strongly."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sma12-c8-l3-c1", "In the model speech, what is the central metaphor?", ["a ship and its voyage", "a tree", "a football match"], 0, "Kapal."),
        pick("sma12-c8-l3-c2", "Which line from the model shows regret with humour?", ["we definitely shouldn't have eaten so much fried tofu before the relay", "Our teachers were the crew.", "Congratulations, Class of 2027."], 0, "Shouldn't have + humor."),
        arrange("sma12-c8-l3-c3", "Put the words in order.", "You must have worried about us more than we know", "Must have + V3."),
        fill("sma12-c8-l3-c4", "Complete: Wherever we go, let us ___ the best of this place with us.", "Wherever we go, let us", "the best of this place with us.", ["carry", "take", "bring"], "Let us + verb."),
        trPick("sma12-c8-l3-c5", "“Rekan-rekan lulusan” (in a speech) in English is…", ["fellow graduates", "follow graduates", "friendly graduated"], 0, "Fellow graduates."),
        pick("sma12-c8-l3-c6", "Why is pausing effective in speeches?", ["It gives the audience time to feel and remember key lines.", "It hides mistakes.", "It makes the speech shorter."], 0, "Efek retoris.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma12-c8-post",
    title: "Chapter 8 Posttest",
    passPercent: 70,
    passages: [SPEECH],
    questions: [
      pick("sma12-c8-post1", "I can't find my keys. I ___ left them at school.", ["might have", "can't have", "should", "must"], 0, "Kemungkinan."),
      listen("sma12-c8-post2", voice("You needn't have cooked so much food. Only five people came."), "Listen. What does the speaker mean?", ["Cooking so much was unnecessary.", "The food was not enough.", "The cooking was bad.", "Nobody came."], 0, "Needn't have = tidak perlu."),
      trPick("sma12-c8-post3", "“Seharusnya aku lebih banyak bertanya kepada guru.” in English is…", ["I should have asked my teachers more questions.", "I must have asked my teachers more questions.", "I should ask my teachers more questions yesterday.", "I could ask teachers more before."], 0, "Penyesalan."),
      pick("sma12-c8-post4", "She ___ heard the news yet; she's been on a plane all day.", ["can't have", "must have", "should have", "needn't have"], 0, "Tidak mungkin."),
      arrange("sma12-c8-post5", "Put the words in order.", "We should have taken more photos today", "Penyesalan."),
      pick("sma12-c8-post6", "What did the teachers do, according to the speech?", ["stayed late to explain things again", "gave easy tests", "went home early", "cancelled classes"], 0, "Baris 5.", { passageId: SPEECH.id }),
      match("sma12-c8-post7", "Match the modal and its meaning.", [["must have", "almost certain"], ["might have", "possible"], ["can't have", "impossible"], ["should have", "regret"]], "Modal masa lalu."),
      fill("sma12-c8-post8", "Complete.", "Some of us must have wondered whether we would ever find our way around this huge", ".", ["school"], "Baris 2.", { passageId: SPEECH.id }),
      pick("sma12-c8-post9", "Which line contains a direct, personal thank-you to the teachers?", ["line 5", "line 2", "line 7", "line 3"], 0, "So today: thank you.", { passageId: SPEECH.id, hots: true }),
      pick("sma12-c8-post10", "What is the overall tone of the speech?", ["grateful, nostalgic and hopeful", "angry and bitter", "neutral and technical", "sarcastic"], 0, "Nada pidato.", { passageId: SPEECH.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Class Dismissed!",
    questions: [
      live("sma12-c8-live1", "Almost certain (past):", ["must have", "might have", "can't have", "should"], 0, "graduation"),
      live("sma12-c8-live2", "Regret:", ["should have", "must have", "can't have", "will have"], 0, "sad"),
      live("sma12-c8-live3", "Impossible (past):", ["can't have", "must have", "might have", "should have"], 0, "question"),
      live("sma12-c8-live4", "“Pengorbanan” =", ["sacrifice", "sacred", "surface", "service"], 0, "heart", true),
      live("sma12-c8-live5", "Repeated phrase device:", ["anaphora", "irony", "flashback", "citation"], 0, "microphone"),
      live("sma12-c8-live6", "Curiosity, courage, compassion =", ["tricolon", "simile", "hedging", "rebuttal"], 0, "trophy"),
      live("sma12-c8-live7", "You ___ told me! I'd have helped.", ["could have", "can't have", "must", "will"], 0, "phone-call"),
      live("sma12-c8-live8", "Farewell speech at graduation:", ["valedictory", "welcome", "keynote", "debate"], 0, "target"),
    ],
  },
};
