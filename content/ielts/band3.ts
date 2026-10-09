import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { audio, examples, fill, listen, live, match, pick, pics, say, speaking, table, text, tfng, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// IELTS Academic — Level 3: Band 6.0.

const CORAL: Passage = {
  id: "ielts3-coral",
  title: "Restoring Coral Reefs",
  lines: [
    "Coral reefs cover less than one per cent of the ocean floor, yet they support around a quarter of all known marine species. In Indonesia, which lies at the heart of the Coral Triangle, reefs also provide food and income for millions of coastal residents.",
    "However, reefs are under increasing pressure. Rising sea temperatures cause coral bleaching, a process in which corals expel the tiny algae that live in their tissues and give them colour. Without these algae, corals lose their main source of energy and may die if high temperatures continue for several weeks.",
    "Destructive fishing has added to the damage. In some areas, blast fishing with homemade explosives has left large fields of broken coral rubble, on which new coral larvae struggle to settle.",
    "One promising response has been the use of so-called reef stars. These are hexagonal steel frames, coated with sand to give them a natural surface, which are tied together on the damaged sea floor. Divers then attach small fragments of living coral to the frames.",
    "Because the frames stabilise the loose rubble, the attached fragments can grow quickly. At one site in South Sulawesi, monitoring showed that coral cover increased from below 10 per cent to more than 60 per cent within four years.",
    "Scientists caution, however, that restoration alone cannot save reefs. Unless global emissions are reduced and local threats such as blast fishing are controlled, restored areas may be lost to the next marine heatwave.",
  ],
};

export const BAND3: Level = {
  id: "ielts-b3",
  title: "Level 3 — Band 6.0: Competent User",
  description: "Follow academic discussions in Listening Part 3, complete summaries using words from a text, describe trends in line graphs, and discuss abstract questions in Speaking Part 3.",
  targetScore: "Target Band 6.0",
  cover: ["meeting", "report", "chat"],
  pretest: {
    id: "ielts-b3-pre",
    title: "Level 3 Pretest",
    passPercent: 0,
    questions: [
      pick("ielts-b3-pre1", "Listening Part 3 is usually…", ["a discussion in an educational or training context", "a phone booking", "a museum tour", "a news broadcast"], 0, "Part 3 = diskusi akademik."),
      listen("ielts-b3-pre2", say(["woman", "I think we should use a questionnaire."], ["man", "Mm, interviews would give us richer answers, though."]), "Listen. What does the man prefer?", ["interviews", "a questionnaire", "both equally", "neither"], 0, "Though = menunjukkan preferensi berbeda."),
      trPick("ielts-b3-pre3", "“Naik tajam” (on a graph) in English is…", ["rose sharply", "rose slightly", "fell sharply", "levelled off"], 0, "Rose sharply."),
      pick("ielts-b3-pre4", "In summary completion, your answer must…", ["fit the grammar of the sentence and follow the word limit", "be your own opinion", "be as long as possible", "always be a number"], 0, "Sesuai tata bahasa dan batas kata."),
      pick("ielts-b3-pre5", "Speaking Part 3 questions are usually…", ["more abstract and analytical", "about your name", "only yes/no questions", "about the cue card bullet points"], 0, "Part 3 lebih abstrak."),
    ],
  },
  lessons: [
    {
      id: "ielts-b3-l1",
      skill: "listening",
      title: "Listening Part 3: Academic Discussions",
      summary: "Identifying opinions, agreement and decisions in conversations between students and tutors.",
      sections: [
        {
          title: "Who thinks what?",
          blocks: [
            table(["Signal", "Meaning"], [["I see what you mean, but…", "partial agreement → disagreement"], ["That's a good point.", "agreement"], ["I'm not convinced…", "doubt"], ["So we've decided to…", "final decision"], ["Actually, … / Having said that, …", "a change of mind"]]),
            tip("Part 3 sering menanyakan **pendapat siapa** atau **keputusan akhir**. Ide yang disebut pertama sering **ditolak**; tunggu sampai mereka **sepakat**."),
            pics([["meeting", "students discuss"], ["teacher-woman", "tutor"], ["report", "assignment"], ["question", "doubt"]]),
          ],
        },
        {
          title: "Practice discussion",
          blocks: [
            audio("Planning a project on urban gardens", say(["woman", "So, for our project on urban gardens, should we survey residents or interview the garden organisers?"], ["man", "A survey would give us more data, but I'm not convinced people will answer honestly about how often they actually go."], ["woman", "That's a good point. And organisers could explain the challenges in more detail."], ["man", "Right. Having said that, we still need some numbers. What if we interview three organisers and do a short survey of about fifty residents?"], ["woman", "That sounds manageable. So we've decided to do both, but keep the survey short."], ["man", "Agreed. I'll design the questions, and you contact the organisers."])),
            tryIt(pick("ielts-b3-l1-try", "What do the students finally decide?", ["to do interviews and a short survey", "to do only a survey", "to do only interviews"], 0, "So we've decided to do both.")),
          ],
        },
      ],
      checkpoint: [
        pick("ielts-b3-l1-c1", "Why is the man worried about a survey?", ["People may not answer honestly.", "It is too expensive.", "There are no residents."], 0, "Not convinced people will answer honestly."),
        pick("ielts-b3-l1-c2", "What is the advantage of interviewing organisers?", ["They can explain challenges in detail.", "They give more numbers.", "They are faster."], 0, "Detail."),
        fill("ielts-b3-l1-c3", "Complete (A NUMBER): They will survey about ___ residents.", "They will survey about", "residents.", ["50", "fifty"], "About fifty."),
        match("ielts-b3-l1-c4", "Match the person and the task.", [["the man", "designs the questions"], ["the woman", "contacts the organisers"]], "Pembagian tugas."),
        listen("ielts-b3-l1-c5", say(["man", "We could start with the history section."], ["woman", "Actually, I'd rather leave that until the end, once we have our results."]), "Listen. What does the woman want to do?", ["write the history section last", "start with the history section", "skip the history section"], 0, "Leave until the end."),
        pick("ielts-b3-l1-c6", "In Part 3, the first idea mentioned is often…", ["rejected or changed later", "always the final answer", "not related to the question"], 0, "Ide pertama sering ditolak.", { hots: true }),
      ],
    },
    {
      id: "ielts-b3-l2",
      skill: "reading",
      title: "Reading: Summary and Sentence Completion",
      summary: "Predicting the type of word needed, finding the paragraph, and copying words exactly.",
      passages: [CORAL],
      sections: [
        {
          title: "Strategy",
          blocks: [
            table(["Step", "What to do"], [["Predict", "noun, verb, adjective or number? singular or plural?"], ["Locate", "use names, numbers and key words to find the right paragraph"], ["Match", "the summary paraphrases the text; find the synonym"], ["Check", "spelling, word limit, grammar of the sentence"]]),
            warn("Jika instruksi berbunyi **NO MORE THAN TWO WORDS**, jawaban tiga kata **salah** walaupun maknanya benar. Kata harus **diambil dari teks** dan dieja dengan tepat."),
            { type: "passage", passage: CORAL },
          ],
        },
        {
          title: "Practice",
          blocks: [
            vocab([["bleaching", "pemutihan (karang)", "earth"], ["expel", "mengeluarkan", "hand"], ["rubble", "puing/pecahan", "trash"], ["stabilise", "menstabilkan", "thumbs-up"], ["caution", "memperingatkan", "question"]], "Key vocabulary"),
            tryIt(fill("ielts-b3-l2-try", "Complete (ONE WORD): Corals that lose their algae lose their main source of ___ .", "Corals that lose their algae lose their main source of", ".", ["energy"], "Paragraf 2.", { passageId: CORAL.id })),
          ],
        },
      ],
      checkpoint: [
        fill("ielts-b3-l2-c1", "Complete (ONE WORD): Reefs cover less than one per cent of the ocean ___ .", "Reefs cover less than one per cent of the ocean", ".", ["floor"], "Paragraf 1.", { passageId: CORAL.id }),
        fill("ielts-b3-l2-c2", "Complete (ONE WORD): Damage is also caused by ___ fishing using explosives.", "Damage is also caused by", "fishing using explosives.", ["blast"], "Blast fishing (paragraf 3).", { passageId: CORAL.id }),
        fill("ielts-b3-l2-c3", "Complete (ONE WORD): Reef stars are coated with ___ .", "Reef stars are coated with", ".", ["sand"], "Paragraf 4.", { passageId: CORAL.id }),
        pick("ielts-b3-l2-c4", "What shape are reef stars?", ["hexagonal", "circular", "square", "triangular"], 0, "Hexagonal steel frames.", { passageId: CORAL.id }),
        tfng("ielts-b3-l2-c5", "Coral cover at the South Sulawesi site rose to over 60 per cent within four years.", "TRUE", "Paragraf 5.", { passageId: CORAL.id }),
        pick("ielts-b3-l2-c6", "Which word in the text is closest in meaning to “warn” in paragraph 6?", ["caution", "stabilise", "attach", "expel"], 0, "Caution = memperingatkan.", { passageId: CORAL.id, hots: true }),
      ],
    },
    {
      id: "ielts-b3-l3",
      skill: "writing",
      title: "Writing Task 1: Line Graphs and Trends",
      summary: "Describing changes over time, grouping data and writing a strong overview.",
      sections: [
        {
          title: "The graph",
          blocks: [
            text("**Task:** The graph below shows the number of international visitors (in millions) to three Indonesian destinations between 2010 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant."),
            table(["Year", "Bali", "Yogyakarta", "Lombok"], [["2010", "2.5", "0.4", "0.2"], ["2015", "4.0", "0.6", "0.5"], ["2020", "1.0", "0.1", "0.1"], ["2025", "6.0", "0.9", "1.1"]]),
            text("*(Data ilustratif untuk latihan.)* Perhatikan pola: kenaikan stabil, **penurunan tajam pada 2020**, lalu **pemulihan kuat**. Lombok **menyalip** Yogyakarta pada 2025."),
          ],
        },
        {
          title: "Language of trends",
          blocks: [
            table(["Verb + adverb", "Adjective + noun"], [["rose steadily", "a steady rise"], ["fell dramatically", "a dramatic fall"], ["recovered strongly", "a strong recovery"], ["overtook", "—"], ["peaked at / reached a high of", "a peak of"]]),
            examples([{ right: "Overall, all three destinations saw growth over the period, despite a sharp drop in 2020, and Bali remained by far the most visited." }, { right: "Lombok, which received the fewest visitors at the start, overtook Yogyakarta by 2025." }], "Overview and key feature"),
            writing({
              id: "ielts-b3-l3-write",
              title: "Line graph report",
              prompt: "Describe the visitor numbers for Bali, Yogyakarta and Lombok (2010–2025). Write at least 150 words with an introduction, overview and two detail paragraphs.",
              image: "report",
              minWords: 150,
              maxWords: 210,
              tips: ["The line graph compares …", "Overall, … despite …", "Bali: rose steadily from … to …, plunged to … in 2020, then recovered to …", "Yogyakarta and Lombok: much smaller numbers… Lombok overtook …"],
              models: [{ label: "Band 7 model", text: "The line graph compares the number of international visitors to Bali, Yogyakarta and Lombok between 2010 and 2025.\nOverall, all three destinations attracted more visitors at the end of the period than at the beginning, despite a dramatic fall in 2020. Bali was by far the most popular destination throughout.\nBali's visitor numbers rose steadily from 2.5 million in 2010 to 4 million in 2015. In 2020, however, they plunged to just 1 million before recovering strongly to reach a peak of 6 million in 2025.\nThe other two destinations received far fewer visitors. Yogyakarta grew gradually from 0.4 to 0.6 million, dropped to 0.1 million in 2020 and then rose to 0.9 million. Lombok followed a similar pattern, but its recovery was stronger: from only 0.1 million in 2020, it climbed to 1.1 million in 2025, overtaking Yogyakarta for the first time." }],
              rubric: ["My overview mentions the main trends and the biggest category.", "I grouped data logically instead of listing every number.", "I used a range of trend vocabulary accurately.", "I used past tenses correctly for past data.", "I wrote at least 150 words."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("ielts-b3-l3-c1", "What happened to all destinations in 2020?", ["a sharp fall", "a steady rise", "no change"], 0, "Penurunan tajam."),
        pick("ielts-b3-l3-c2", "Which sentence is a good overview?", ["Overall, visitor numbers grew despite a sharp drop in 2020, with Bali dominating.", "In 2010, Bali had 2.5 million visitors.", "Lombok is beautiful."], 0, "Overview."),
        match("ielts-b3-l3-c3", "Match the verb and the noun.", [["rise", "a rise"], ["recover", "a recovery"], ["fluctuate", "a fluctuation"], ["decline", "a decline"]], "Bentuk kata."),
        fill("ielts-b3-l3-c4", "Complete: Lombok ___ Yogyakarta in 2025. (menyalip)", "Lombok", "Yogyakarta in 2025.", ["overtook"], "Overtook = menyalip.", { translate: true }),
        trPick("ielts-b3-l3-c5", "“Mencapai puncak 6 juta” in English is…", ["peaked at 6 million", "peaked on 6 million", "top of 6 million reached"], 0, "Peak at."),
        pick("ielts-b3-l3-c6", "Why is grouping Yogyakarta and Lombok in one paragraph a good idea?", ["They had similar, much smaller numbers and a similar pattern.", "They are both in Bali.", "The task says so."], 0, "Pengelompokan logis.", { hots: true }),
      ],
    },
    {
      id: "ielts-b3-l4",
      skill: "speaking",
      title: "Speaking Part 3: Discussing Ideas",
      summary: "Giving opinions on abstract questions, comparing past and present, and speculating about the future.",
      sections: [
        {
          title: "Types of Part 3 questions",
          blocks: [
            table(["Question type", "Useful language"], [["Opinion: Do you think…?", "I'd argue that… / It depends on…"], ["Compare: How is… different from the past?", "In the past…, whereas nowadays…"], ["Cause/effect: Why do…?", "One reason is… / This leads to…"], ["Future: Will… change?", "It's likely that… / I can imagine that…"], ["Evaluate: Is it good or bad?", "On the one hand… on the other hand…"]]),
            tip("Di Part 3, kembangkan jawaban dengan pola **opini → alasan → contoh → kemungkinan pandangan lain**. Jawaban 30–60 detik ideal."),
          ],
        },
        {
          title: "Practice",
          blocks: [
            audio("Part 3 discussion on tourism", say(["man", "Do you think tourism always benefits local communities?"], ["woman", "Not always, I'd say. On the one hand, it creates jobs, for example for guides and small restaurants. On the other hand, if most hotels are owned by big companies from outside, a lot of the money leaves the area. I think it really depends on how tourism is managed."], ["man", "How might tourism change in the future?"], ["woman", "It's likely that more travellers will look for eco-friendly options. I can imagine that villages offering homestays and cultural experiences will become more popular than big resorts."])),
            vocab([["benefit", "menguntungkan", "thumbs-up"], ["managed", "dikelola", "staff"], ["eco-friendly", "ramah lingkungan", "earth"], ["homestay", "penginapan di rumah warga", "house"]], "Topic vocabulary"),
            speaking({
              id: "ielts-b3-l4-say",
              title: "Part 3 practice",
              prompt: "Answer three Part 3 questions (40–60 seconds each): (1) Why do people enjoy travelling to other countries? (2) How has the way people plan holidays changed in recent years? (3) Should governments limit the number of tourists in popular places?",
              image: "plane",
              seconds: 180,
              tips: ["I'd argue that … because …", "In the past …, whereas nowadays …", "On the one hand … On the other hand …", "It depends on …"],
              models: [{ label: "Model (question 3)", text: "I think in some cases they should, yes. On the one hand, tourism brings money and jobs, so governments don't want to discourage visitors. On the other hand, when too many people visit a small place, it can damage the environment and make life difficult for residents. For example, on Komodo Island the government has discussed limiting visitor numbers to protect the dragons. So I'd say limits make sense for fragile places, but not necessarily for big cities." }],
              rubric: ["I gave clear opinions with reasons.", "I used examples to support my ideas.", "I compared past and present or considered both sides.", "I used linking phrases naturally.", "Each answer lasted around 40–60 seconds."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("ielts-b3-l4-c1", voice("I think it really depends on how tourism is managed."), "Listen. What is the speaker's position?", ["Benefits depend on management.", "Tourism is always good.", "Tourism is always bad."], 0, "It depends."),
        pick("ielts-b3-l4-c2", "Which phrase compares past and present?", ["In the past…, whereas nowadays…", "I'd argue that…", "It's likely that…"], 0, "Perbandingan waktu."),
        pick("ielts-b3-l4-c3", "Which phrase speculates about the future?", ["I can imagine that…", "In the past…", "For example…"], 0, "Spekulasi."),
        fill("ielts-b3-l4-c4", "Complete: On the one hand, … On the other ___, …", "On the one hand, … On the other", ", …", ["hand"], "On the other hand."),
        trPick("ielts-b3-l4-c5", "“Ramah lingkungan” in English is…", ["eco-friendly", "nature-kind", "environment friendly-ly"], 0, "Eco-friendly."),
        pick("ielts-b3-l4-c6", "Which Part 3 answer would score higher?", ["It depends. Big cities can handle many tourists, but small islands may need limits to protect the environment.", "Yes.", "I like tourism very much because it is fun."], 0, "Analitis dan seimbang.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ielts-b3-post",
    title: "Level 3 Mock Quiz",
    passPercent: 70,
    passages: [CORAL],
    questions: [
      listen("ielts-b3-post1", say(["woman", "Shall we present our findings with a poster?"], ["man", "Posters are fine, but slides would let us show the video clips."], ["woman", "True. Let's go with slides, then."]), "Listen. How will they present?", ["with slides", "with a poster", "with a written report", "with a video only"], 0, "Keputusan akhir: slides.", { hots: true }),
      listen("ielts-b3-post2", say(["man", "The tutor said our literature review was too descriptive."], ["woman", "So we need to compare the sources more critically."]), "Listen. What do they need to improve?", ["critical comparison of sources", "the number of sources", "the title", "the length"], 0, "Compare more critically."),
      listen("ielts-b3-post3", say(["woman", "Visitor numbers fell sharply in 2020 but recovered strongly afterwards."]), "Listen. What happened after 2020?", ["Numbers recovered strongly.", "Numbers kept falling.", "Numbers stayed the same.", "Numbers fell slightly."], 0, "Recovered strongly."),
      fill("ielts-b3-post4", "Complete (ONE WORD): Corals expel the algae during ___ .", "Corals expel the algae during", ".", ["bleaching"], "Paragraf 2.", { passageId: CORAL.id }),
      tfng("ielts-b3-post5", "Blast fishing makes it difficult for new corals to settle.", "TRUE", "Paragraf 3.", { passageId: CORAL.id }),
      tfng("ielts-b3-post6", "Reef stars are made of plastic.", "FALSE", "Steel frames.", { passageId: CORAL.id }),
      tfng("ielts-b3-post7", "Reef stars are used in every Indonesian province.", "NOT GIVEN", "Tidak disebut.", { passageId: CORAL.id }),
      pick("ielts-b3-post8", "What is the writer's main point in the final paragraph?", ["Restoration must be combined with reducing emissions and local threats.", "Restoration has completely solved the problem.", "Heatwaves are no longer a risk.", "Blast fishing has stopped."], 0, "Paragraf 6.", { passageId: CORAL.id, hots: true }),
      pick("ielts-b3-post9", "Which sentence best describes a trend?", ["Sales rose steadily before levelling off in 2023.", "Sales were good.", "I think sales will rise."], 0, "Deskripsi tren."),
      pick("ielts-b3-post10", "Speaking Part 3: “Will people still read printed books in the future?” Best answer:", ["Probably fewer people will, but I can imagine that printed books will survive for gifts and children's reading.", "Yes.", "Books are made of paper."], 0, "Spekulasi + alasan."),
    ],
  },
  live: {
    title: "Live Quiz — Band 6 Challenge",
    questions: [
      live("ielts-b3-live1", "Part 3 Listening is a…", ["discussion", "phone booking", "news report", "song"], 0, "meeting"),
      live("ielts-b3-live2", "Lombok ___ Yogyakarta (passed it).", ["overtook", "overtaked", "overcome", "overlooked"], 0, "report"),
      live("ielts-b3-live3", "NO MORE THAN TWO WORDS: “the hot sand” is…", ["too long", "correct", "too short", "a number"], 0, "pencil"),
      live("ielts-b3-live4", "“Pemutihan karang” =", ["coral bleaching", "coral cleaning", "white sand", "reef washing"], 0, "fish", true),
      live("ielts-b3-live5", "a steady ___", ["rise", "rising up", "rised", "rose"], 0, "target"),
      live("ielts-b3-live6", "Speculating phrase:", ["I can imagine that…", "In 2010…", "Firstly…", "Yes."], 0, "owl-think"),
      live("ielts-b3-live7", "Reef stars are made of…", ["steel", "plastic", "wood", "glass"], 0, "shape-star"),
      live("ielts-b3-live8", "Best Part 3 length:", ["40–60 seconds", "5 seconds", "5 minutes", "1 word"], 0, "clock"),
    ],
  },
};
