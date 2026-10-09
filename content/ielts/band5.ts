import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { audio, fill, listen, live, match, pick, pickMany, pics, say, speaking, table, text, tfng, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// IELTS Academic — Level 5: Band 7.0.

const SLEEP: Passage = {
  id: "ielts5-sleep",
  title: "The Science of Napping",
  lines: [
    "A. Short daytime naps were once dismissed as a sign of laziness, but researchers now take them seriously. Dr Elena Ruiz, a sleep scientist in Madrid, argues that a nap of 10 to 20 minutes can restore alertness without causing grogginess.",
    "B. Longer naps carry a cost. According to Professor Kenji Sato of Osaka University, sleeping for more than 30 minutes allows the brain to enter deep sleep, and waking from this stage often leaves people feeling worse than before, a state known as sleep inertia.",
    "C. Not everyone agrees that naps are beneficial. Dr Amina Yusuf, who studies older adults in Nairobi, has found that regular long naps are associated with higher rates of heart disease, although she stresses that the naps may be a symptom of existing illness rather than a cause.",
    "D. The timing of a nap also matters. Most experts recommend napping in the early afternoon, when there is a natural dip in alertness. Napping in the late afternoon may make it harder to fall asleep at night.",
    "E. Some workplaces have begun to provide quiet rooms for short rests. A study by Dr Ruiz's team found that employees who took a 15-minute nap made fewer errors in afternoon tasks than those who drank coffee instead.",
    "F. In many cultures, of course, an afternoon rest is nothing new. In parts of Indonesia, a short siesta after lunch has long been part of daily life, particularly in rural areas where work begins very early.",
  ],
};

export const BAND5: Level = {
  id: "ielts-b5",
  title: "Level 5 — Band 7.0: Strong User",
  description: "Avoid advanced distractors in Listening, match information and people's ideas in long texts, describe a process diagram, and show a wide lexical range in Speaking.",
  targetScore: "Target Band 7.0",
  cover: ["target", "open-book", "owl-think"],
  pretest: {
    id: "ielts-b5-pre",
    title: "Level 5 Pretest",
    passPercent: 0,
    questions: [
      listen("ielts-b5-pre1", say(["woman", "The workshop was going to be on Friday, but we've moved it to Thursday morning."]), "Listen. When is the workshop?", ["Thursday morning", "Friday", "Thursday afternoon", "next week"], 0, "Dipindah ke Kamis pagi."),
      pick("ielts-b5-pre2", "“Matching features” questions ask you to…", ["match statements to people or things in the text", "describe a chart", "label a map", "write an essay"], 0, "Mencocokkan pernyataan dengan orang/hal."),
      trPick("ielts-b5-pre3", "“Kolokasi” (word partnership) example in English is…", ["make a decision", "do a decision", "take a decision of", "create decision"], 0, "Make a decision."),
      pick("ielts-b5-pre4", "In a process diagram description, which voice is most common?", ["passive", "imperative", "future continuous", "past perfect"], 0, "Passive: is heated, is cut."),
      pick("ielts-b5-pre5", "Which word is the least common (shows lexical range)?", ["meticulous", "good", "nice", "big"], 0, "Kosakata kurang umum."),
    ],
  },
  lessons: [
    {
      id: "ielts-b5-l1",
      skill: "listening",
      title: "Listening: Distractors and Multiple Answers",
      summary: "Spotting corrections, rejections and reported ideas; choosing TWO or THREE correct options.",
      sections: [
        {
          title: "Types of distractor",
          blocks: [
            table(["Distractor", "Example"], [["Correction", "It's on the 5th — sorry, I mean the 15th."], ["Rejected idea", "We thought about Bali, but it was too expensive."], ["Past vs. present", "It used to be free; now it's 20,000."], ["Someone else's opinion", "My tutor thinks… but I'm not sure."], ["All options mentioned", "only one is confirmed"]]),
            pics([["question", "listen carefully"], ["pencil", "write the final answer"], ["clock", "past vs. now"], ["target", "the confirmed option"]]),
          ],
        },
        {
          title: "Choose TWO answers",
          blocks: [
            audio("Choosing a field-trip destination", say(["man", "So, which two places should we include in the field trip?"], ["woman", "Well, the mangrove centre is essential for our coastal ecology unit. I'm less sure about the aquarium. It's popular, but it doesn't really relate to the course."], ["man", "Agreed. And the salt farm?"], ["woman", "Yes, that would show how the coast is used economically. The lighthouse is lovely, but we don't have time."], ["man", "Fine, the mangrove centre and the salt farm, then."])),
            tip("Untuk soal **Choose TWO**, setiap jawaban benar biasanya diberi poin terpisah. Dengarkan **kesepakatan akhir**: *Fine, … then.*"),
            tryIt(pickMany("ielts-b5-l1-try", "Which TWO places will they visit?", ["the mangrove centre", "the salt farm", "the aquarium", "the lighthouse"], [0, 1], "Kesepakatan akhir.")),
          ],
        },
      ],
      checkpoint: [
        listen("ielts-b5-l1-c1", say(["woman", "The deadline is the twenty-first — no, wait, the twenty-third, because of the holiday."]), "Listen. What is the deadline?", ["the 23rd", "the 21st", "the 13th"], 0, "Koreksi."),
        listen("ielts-b5-l1-c2", say(["man", "Entry used to be free, but since last year it costs fifteen thousand rupiah."]), "Listen. How much does entry cost now?", ["15,000 rupiah", "free", "50,000 rupiah"], 0, "Used to vs. now."),
        pick("ielts-b5-l1-c3", "Why did they reject the aquarium?", ["It doesn't relate to the course.", "It is too expensive.", "It is closed."], 0, "Tidak relevan."),
        pick("ielts-b5-l1-c4", "Why is the salt farm chosen?", ["to show how the coast is used economically", "because it is lovely", "because it is close"], 0, "Alasan ekonomi."),
        listen("ielts-b5-l1-c5", say(["woman", "My supervisor thinks I should use interviews, but personally I prefer observation."]), "Listen. Which method does the speaker prefer?", ["observation", "interviews", "questionnaires"], 0, "Personally I prefer."),
        pick("ielts-b5-l1-c6", "Why are “all options mentioned” questions difficult?", ["You must identify which option is finally confirmed, not just mentioned.", "The audio is louder.", "There is no correct answer."], 0, "Disebut ≠ dipilih.", { hots: true }),
      ],
    },
    {
      id: "ielts-b5-l2",
      skill: "reading",
      title: "Reading: Matching Features and Information",
      summary: "Matching claims to researchers and finding which paragraph contains specific information.",
      passages: [SLEEP],
      sections: [
        {
          title: "Strategy",
          blocks: [
            table(["Type", "Strategy"], [["Matching features (people)", "underline names in the text first; read what each person claims; paraphrases are common"], ["Matching information (paragraphs)", "look for the type of information: an example, a reason, a comparison, a recommendation; some paragraphs may be used more than once"]]),
            warn("Soal ini **tidak** mengikuti urutan teks. Tandai semua nama atau paragraf dulu agar cepat kembali."),
            { type: "passage", passage: SLEEP },
          ],
        },
        {
          title: "Practice",
          blocks: [
            vocab([["dismiss", "menganggap remeh", "thumbs-up"], ["grogginess", "rasa pusing/lemas setelah tidur", "feel-sleepy"], ["sleep inertia", "inersia tidur", "sleep"], ["associated with", "berkaitan dengan", "heart"], ["dip", "penurunan sesaat", "clock"]], "Key vocabulary"),
            tryIt(pick("ielts-b5-l2-try", "Who explains why long naps can make people feel worse?", ["Professor Sato", "Dr Ruiz", "Dr Yusuf"], 0, "Paragraf B.", { passageId: SLEEP.id })),
          ],
        },
      ],
      checkpoint: [
        match("ielts-b5-l2-c1", "Match each claim with the researcher.", [["Short naps restore alertness without grogginess.", "Dr Ruiz"], ["Waking from deep sleep causes sleep inertia.", "Professor Sato"], ["Long naps may be a sign of existing illness.", "Dr Yusuf"]], "Matching features.", { passageId: SLEEP.id }),
        pick("ielts-b5-l2-c2", "Which paragraph mentions a comparison between napping and drinking coffee?", ["E", "A", "D", "F"], 0, "Paragraf E.", { passageId: SLEEP.id }),
        pick("ielts-b5-l2-c3", "Which paragraph gives advice about when to nap?", ["D", "B", "C", "F"], 0, "Paragraf D.", { passageId: SLEEP.id }),
        pick("ielts-b5-l2-c4", "Which paragraph refers to napping as a cultural tradition?", ["F", "A", "C", "E"], 0, "Paragraf F.", { passageId: SLEEP.id }),
        tfng("ielts-b5-l2-c5", "Dr Yusuf believes long naps directly cause heart disease.", "FALSE", "Ia menekankan mungkin hanya gejala.", { passageId: SLEEP.id }),
        pick("ielts-b5-l2-c6", "Why does Dr Yusuf add “although she stresses…”?", ["to avoid claiming that correlation proves causation", "to disagree with herself completely", "to recommend long naps"], 0, "Korelasi ≠ kausalitas.", { passageId: SLEEP.id, hots: true }),
      ],
    },
    {
      id: "ielts-b5-l3",
      skill: "writing",
      title: "Writing Task 1: Process Diagrams",
      summary: "Describing stages in order with the passive voice and sequencing language.",
      sections: [
        {
          title: "The process",
          blocks: [
            text("**Task:** The diagram below shows how palm sugar (gula aren) is produced. Summarise the information by selecting and reporting the main features."),
            table(["Stage", "Description (from the diagram)"], [["1", "sap collected from cut flower stalks of sugar palms, early morning"], ["2", "sap filtered to remove insects and debris"], ["3", "sap boiled in a large wok for 3–4 hours"], ["4", "thick syrup stirred continuously"], ["5", "syrup poured into bamboo or coconut-shell moulds"], ["6", "cooled and hardened, then wrapped in dried leaves"], ["7", "sold at local markets"]]),
            pics([["tree", "palm tree"], ["pan", "boiling"], ["spoon", "stirring"], ["food-stall", "market"]]),
          ],
        },
        {
          title: "Language and structure",
          blocks: [
            table(["Feature", "Example"], [["Overview", "Overall, the process consists of seven stages, beginning with the collection of sap and ending with the sale of the finished sugar."], ["Passive voice", "The sap is collected… / It is then filtered…"], ["Sequencers", "First, Next, After that, Once…, Subsequently, Finally"], ["Purpose", "…in order to remove insects; …so that it hardens"], ["Time and duration", "for three to four hours; early in the morning"]]),
            writing({
              id: "ielts-b5-l3-write",
              title: "Process description",
              prompt: "Describe the process of producing palm sugar. Write at least 150 words: introduction, overview (number of stages, beginning and end) and two body paragraphs.",
              image: "pan",
              minWords: 150,
              maxWords: 200,
              tips: ["The diagram illustrates how …", "Overall, there are … stages, from … to …", "First, sap is collected from … early in the morning. It is then filtered in order to …", "Once the syrup has thickened, it is poured into … where it is left to cool and harden."],
              models: [{ label: "Band 7–8 model", text: "The diagram illustrates the stages involved in producing palm sugar.\nOverall, the process consists of seven steps, beginning with the collection of sap from sugar palms and ending with the sale of the finished product at local markets.\nIn the first stage, sap is collected early in the morning from the cut flower stalks of the palms. It is then filtered in order to remove insects and other debris. Next, the clean sap is boiled in a large wok for three to four hours, during which time it is stirred continuously so that it thickens into a syrup and does not burn.\nOnce the syrup has reached the right consistency, it is poured into moulds made of bamboo or coconut shells. There, it is left to cool and harden. Finally, the blocks of sugar are wrapped in dried leaves and taken to local markets, where they are sold." }],
              rubric: ["My overview states the number of stages and the beginning and end.", "I described every stage in the correct order.", "I used the passive voice accurately.", "I used varied sequencers (not only “then”).", "I added purpose or time details where relevant."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("ielts-b5-l3-c1", "Which sentence is best for a process description?", ["The sap is boiled for three to four hours.", "Boil the sap for three hours.", "I boiled the sap."], 0, "Pasif, bukan imperatif."),
        match("ielts-b5-l3-c2", "Match the stage and the passive verb.", [["sap from the palm", "is collected"], ["insects and debris", "are removed"], ["the syrup", "is poured into moulds"], ["the finished blocks", "are wrapped in leaves"]], "Pasif."),
        fill("ielts-b5-l3-c3", "Complete: ___ the syrup has thickened, it is poured into moulds. (Begitu)", "", "the syrup has thickened, it is poured into moulds.", ["Once", "once"], "Once = begitu.", { translate: true }),
        pick("ielts-b5-l3-c4", "Which phrase expresses purpose?", ["in order to remove insects", "for three hours", "early in the morning"], 0, "Tujuan."),
        trPick("ielts-b5-l3-c5", "“Terdiri atas tujuh tahap” in English is…", ["consists of seven stages", "consists seven stage", "is consisting by seven stages"], 0, "Consist of."),
        pick("ielts-b5-l3-c6", "What should a process overview include?", ["the number of stages and the start and end points", "your opinion of the product", "every detail of each stage"], 0, "Overview proses.", { hots: true }),
      ],
    },
    {
      id: "ielts-b5-l4",
      skill: "speaking",
      title: "Speaking: Lexical Resource",
      summary: "Collocations, less common vocabulary, idiomatic language and precise paraphrase.",
      sections: [
        {
          title: "Words that work together",
          blocks: [
            table(["Weak", "Stronger (collocation / less common)"], [["very important", "vital / crucial / of paramount importance"], ["a big problem", "a major / pressing / serious problem"], ["get better", "improve dramatically / make significant progress"], ["have an effect", "have a profound / lasting impact on"], ["do a mistake", "make a mistake"], ["very busy", "snowed under / rushed off my feet (informal)"]]),
            tip("Band 7 menuntut kosakata yang **tepat dan alami**, bukan sekadar kata sulit. Idiom dipakai **secukupnya** dan sesuai konteks."),
          ],
        },
        {
          title: "Practice",
          blocks: [
            audio("Band 7 sample: technology and family life", say(["woman", "I'd say technology has had a profound impact on family life. On the positive side, it's made it far easier for relatives who live miles apart to keep in touch. My aunt in Makassar video-calls us every Sunday, which would have been unthinkable twenty years ago. Having said that, I think it can also erode the quality of time we spend together. It's not uncommon to see a whole family sitting at dinner, each glued to a screen. So it's a double-edged sword, really."])),
            vocab([["profound impact", "dampak mendalam", "heart"], ["keep in touch", "tetap berhubungan", "phone-call"], ["unthinkable", "tak terbayangkan", "surprised"], ["erode", "mengikis", "trash"], ["a double-edged sword", "pedang bermata dua", "owl-think"]], "Lexis from the model"),
            speaking({
              id: "ielts-b5-l4-say",
              title: "Lexical range practice",
              prompt: "Answer for about one minute each: (1) How has technology changed the way young people make friends? (2) Is it important for cities to preserve old buildings? Use at least four precise collocations and one idiomatic expression.",
              image: "chat",
              seconds: 120,
              tips: ["has had a profound/lasting impact on…", "It's not uncommon for…", "a double-edged sword / the tip of the iceberg", "of paramount importance / a pressing issue"],
              models: [{ label: "Model (question 2)", text: "I'd argue it's of paramount importance. Old buildings are a tangible link to a city's history, and once they're demolished, that connection is lost forever. In Semarang, for example, the old town has been carefully restored, and it's now a thriving area full of cafés and galleries, so preservation can actually boost the local economy. That said, it can be costly, so governments need to strike a balance between preserving heritage and meeting the need for modern housing." }],
              rubric: ["I used at least four precise collocations.", "I used one idiomatic expression naturally.", "I paraphrased instead of repeating words.", "My vocabulary was accurate in context."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("ielts-b5-l4-c1", voice("So it's a double-edged sword, really."), "Listen. What does the speaker mean?", ["It has both advantages and disadvantages.", "It is dangerous.", "It is very sharp."], 0, "Idiom: dua sisi."),
        match("ielts-b5-l4-c2", "Match the collocations.", [["make", "a mistake"], ["have", "a lasting impact"], ["strike", "a balance"], ["keep", "in touch"]], "Kolokasi."),
        pick("ielts-b5-l4-c3", "Which is a stronger alternative to “very important”?", ["crucial", "big", "nice"], 0, "Crucial."),
        fill("ielts-b5-l4-c4", "Complete: Governments need to strike a ___ between growth and heritage.", "Governments need to strike a", "between growth and heritage.", ["balance"], "Strike a balance."),
        trPick("ielts-b5-l4-c5", "“Tak terbayangkan” in English is…", ["unthinkable", "unthinking", "no thinkable"], 0, "Unthinkable."),
        pick("ielts-b5-l4-c6", "Which sentence shows better lexical resource?", ["Smartphones have had a profound impact on how teenagers socialise.", "Phones are very very important for teenagers.", "Phones are good and bad and good."], 0, "Presisi.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ielts-b5-post",
    title: "Level 5 Mock Quiz",
    passPercent: 70,
    passages: [SLEEP],
    questions: [
      listen("ielts-b5-post1", say(["man", "We considered holding the event in the hall, but it's too small, so we're booking the sports centre."]), "Listen. Where will the event be held?", ["the sports centre", "the hall", "the library", "outdoors"], 0, "Hall ditolak.", { hots: true }),
      listen("ielts-b5-post2", say(["woman", "The bus leaves at seven-fifteen — sorry, seven-fifty — from the north gate."]), "Listen. What time does the bus leave?", ["7:50", "7:15", "7:05", "8:15"], 0, "Koreksi."),
      pickMany("ielts-b5-post3", "Listen to the field-trip discussion again (from the lesson). Which TWO places were chosen?", ["mangrove centre", "salt farm", "aquarium", "lighthouse"], [0, 1], "Kesepakatan akhir.", { audio: say(["man", "Fine, the mangrove centre and the salt farm, then."]) }),
      pick("ielts-b5-post4", "Which researcher studied employees' errors?", ["Dr Ruiz", "Professor Sato", "Dr Yusuf", "No one"], 0, "Paragraf E.", { passageId: SLEEP.id }),
      tfng("ielts-b5-post5", "Napping in the late afternoon may disturb night-time sleep.", "TRUE", "Paragraf D.", { passageId: SLEEP.id }),
      tfng("ielts-b5-post6", "Professor Sato recommends naps of at least 45 minutes.", "FALSE", "Lebih dari 30 menit justru berisiko.", { passageId: SLEEP.id }),
      tfng("ielts-b5-post7", "Most Indonesian offices now have nap rooms.", "NOT GIVEN", "Tidak disebut.", { passageId: SLEEP.id }),
      pick("ielts-b5-post8", "What is the purpose of paragraph F?", ["to show that napping is an established practice in some cultures", "to criticise Indonesian workers", "to explain sleep inertia", "to recommend coffee"], 0, "Fungsi paragraf.", { passageId: SLEEP.id, hots: true }),
      pick("ielts-b5-post9", "Which process sentence is correct?", ["The mixture is then heated until it boils.", "The mixture then heats by itself until boiled it.", "Heat the mixture."], 0, "Pasif yang benar."),
      pick("ielts-b5-post10", "Which collocation is correct?", ["make significant progress", "do significant progress", "take significant progress", "have significant progress done"], 0, "Make progress."),
    ],
  },
  live: {
    title: "Live Quiz — Band 7 Power",
    questions: [
      live("ielts-b5-live1", "“5th — sorry, 15th”: the answer is…", ["15th", "5th", "both", "neither"], 0, "calendar"),
      live("ielts-b5-live2", "Process diagrams use the…", ["passive", "imperative", "future", "past perfect"], 0, "pan"),
      live("ielts-b5-live3", "___ a mistake", ["make", "do", "take", "create"], 0, "pencil"),
      live("ielts-b5-live4", "“Pedang bermata dua” =", ["a double-edged sword", "a two-way knife", "a sharp sword", "a broken sword"], 0, "knife", true),
      live("ielts-b5-live5", "Stronger than “very important”:", ["crucial", "nice", "big", "okay"], 0, "target"),
      live("ielts-b5-live6", "Matching features questions follow text order?", ["No", "Yes", "Always", "Only in Part 1"], 0, "open-book"),
      live("ielts-b5-live7", "Sleep inertia comes from waking during…", ["deep sleep", "a short nap", "coffee", "lunch"], 0, "sleep"),
      live("ielts-b5-live8", "The sap is ___ to remove insects.", ["filtered", "filter", "filtering", "filters"], 0, "water"),
    ],
  },
};
