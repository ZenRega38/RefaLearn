import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Bahasa Inggris Tingkat Lanjut (Fase F). Chapter 5 — Across Cultures · Chapter 6 — Data and Visual Texts

const CULTURE: Passage = {
  id: "adv-c5-culture",
  title: "When “Yes” Doesn't Mean Yes",
  pic: "chat",
  lines: [
    "During an international student exchange in Yogyakarta, a Dutch student named Lotte asked her Indonesian host, Bayu, if he could help her prepare a presentation by Friday. Bayu smiled and said, “Yes, I'll try.”",
    "Friday came, but Bayu had not helped. Lotte felt confused and a little angry. In her culture, “yes” usually means a clear commitment.",
    "Later, Bayu explained that he had already promised to help his uncle that week. He had said “I'll try” because refusing directly felt impolite, especially to a guest.",
    "Researchers describe this difference using the idea of high-context and low-context communication. In low-context cultures, such as the Netherlands or Germany, people tend to say exactly what they mean and value directness.",
    "In high-context cultures, such as Indonesia, Japan or Korea, much of the meaning is in the situation, tone and relationship. People often avoid a direct “no” to protect harmony and save face.",
    "Neither style is better. Directness can be efficient but may seem rude; indirectness can be polite but may cause misunderstandings.",
    "The key to intercultural communication is awareness. Lotte learned to ask open questions, such as “What would be a realistic time for you?”, and Bayu learned that saying “I'm sorry, I can't this week, but maybe next Monday?” could be both honest and polite.",
  ],
};

export const CH5: Level = {
  id: "adv-ch5",
  title: "Chapter 5 — Across Cultures",
  description: "Understand intercultural communication: high- and low-context styles, politeness, directness, body language and stereotypes; adapt language to communicate respectfully across cultures.",
  targetScore: "Reading · Speaking · Writing",
  cover: ["chat", "earth", "hello"],
  pretest: {
    id: "adv-c5-pre",
    title: "Chapter 5 Pretest",
    passPercent: 0,
    questions: [
      pick("adv-c5-pre1", "In a high-context culture, meaning depends a lot on…", ["context, tone and relationships", "only the exact words", "written contracts only", "loud voices"], 0, "Konteks tinggi."),
      listen("adv-c5-pre2", voice("That's an interesting idea. Let me think about it."), "Listen. In many cultures, what might this polite reply really mean?", ["probably no", "definitely yes", "I love it", "I don't understand English"], 0, "Penolakan halus."),
      trPick("adv-c5-pre3", "“Menjaga muka/martabat” in English is…", ["to save face", "to keep a face", "to cover face", "to wash face"], 0, "Save face."),
      pick("adv-c5-pre4", "A fixed, oversimplified idea about a group of people is a…", ["stereotype", "statistic", "story", "slogan"], 0, "Stereotip."),
      pick("adv-c5-pre5", "Which request is the most polite in English?", ["Would you mind closing the window?", "Close the window.", "Window!", "You close it."], 0, "Would you mind…"),
    ],
  },
  lessons: [
    {
      id: "adv-c5-l1",
      skill: "reading",
      title: "Reading: When “Yes” Doesn't Mean Yes",
      summary: "High-context and low-context communication; directness and saving face.",
      passages: [CULTURE],
      sections: [
        {
          title: "The text",
          blocks: [
            { type: "passage", passage: CULTURE },
            audio("Listen and read", say(["woman", CULTURE.lines.join(" ")])),
            vocab([["commitment", "komitmen/janji", "hand"], ["directness", "keterusterangan", "target"], ["harmony", "keharmonisan", "heart"], ["save face", "menjaga martabat", "happy"], ["awareness", "kesadaran", "eye"]], "Key words"),
          ],
        },
        {
          title: "Two styles",
          blocks: [
            table(["Low-context", "High-context"], [["say exactly what you mean", "meaning is implied by context"], ["“No” is acceptable and clear", "a direct “no” may seem rude"], ["focus on the task and time", "focus on relationship and harmony"], ["written agreements matter most", "trust and relationships matter most"]]),
            warn("Ini adalah **kecenderungan**, bukan aturan mutlak. Tidak semua orang dari suatu budaya berkomunikasi sama; hindari **stereotip**."),
            tryIt(pick("adv-c5-l1-try1", "Why did Bayu say “Yes, I'll try”?", ["Refusing directly felt impolite to a guest.", "He wanted to help but forgot.", "He didn't understand the question."], 0, "Baris 3.", { passageId: CULTURE.id })),
          ],
        },
      ],
      checkpoint: [
        pick("adv-c5-l1-c1", "How did Lotte feel on Friday?", ["confused and a little angry", "happy", "sleepy"], 0, "Baris 2.", { passageId: CULTURE.id }),
        pick("adv-c5-l1-c2", "Which countries are given as examples of low-context cultures?", ["the Netherlands and Germany", "Indonesia and Japan", "Korea and Indonesia"], 0, "Baris 4.", { passageId: CULTURE.id }),
        fill("adv-c5-l1-c3", "Complete.", "People often avoid a direct “no” to protect harmony and save", ".", ["face"], "Baris 5.", { passageId: CULTURE.id }),
        pickMany("adv-c5-l1-c4", "Choose ALL the things each person learned.", ["Lotte learned to ask open questions.", "Bayu learned to decline honestly and politely.", "Lotte learned to never trust anyone.", "Bayu learned to always say yes."], [0, 1], "Baris 7.", { passageId: CULTURE.id }),
        pick("adv-c5-l1-c5", "What is the writer's attitude toward the two styles?", ["Neither is better; both have advantages and risks.", "Direct is always better.", "Indirect is always better."], 0, "Baris 6.", { passageId: CULTURE.id, hots: true }),
        pick("adv-c5-l1-c6", "Why is Lotte's open question (“What would be a realistic time for you?”) effective?", ["It lets Bayu give an honest answer without having to say “no”.", "It forces a yes.", "It is very direct."], 0, "Strategi komunikasi.", { passageId: CULTURE.id, hots: true }),
      ],
    },
    {
      id: "adv-c5-l2",
      skill: "speaking",
      title: "Politeness Strategies",
      summary: "Softening, indirect requests, declining politely and checking understanding.",
      sections: [
        {
          title: "Softening language",
          blocks: [
            table(["Function", "Direct", "Softened"], [["Request", "Send me the file.", "Could you possibly send me the file when you have a moment?"], ["Disagreement", "That's wrong.", "I see it slightly differently. Could we look at…?"], ["Refusal", "No.", "I'd love to, but I'm afraid I can't this week."], ["Criticism", "Your report is bad.", "The report has some strong points; perhaps the data section could be clearer."], ["Checking", "Do you understand?", "Does that make sense? / Is that clear so far?"]]),
            pics([["hello", "greeting customs"], ["hand", "gestures"], ["eye", "eye contact"], ["clock", "attitudes to time"]]),
          ],
        },
        {
          title: "Non-verbal communication",
          blocks: [
            table(["Behaviour", "Possible differences"], [["Eye contact", "a sign of honesty in some cultures; can seem disrespectful to elders in others"], ["Pointing", "with the index finger may be rude; Indonesians often use the thumb"], ["Left hand", "giving things with the left hand is impolite in many parts of Indonesia"], ["Punctuality", "“on time” can mean exactly on time or a little later, depending on the culture"], ["Personal space", "comfortable distance varies widely"]]),
            audio("A misunderstanding at work", say(["man", "Hi, Aya. I've been waiting for your comments on the proposal since Monday."], ["woman", "Oh, I'm so sorry. I wasn't sure if you wanted honest criticism, so I hesitated."], ["man", "Please, be completely honest. Direct feedback really helps me."], ["woman", "In that case, I think the budget section needs more detail. Would it be helpful if I marked the parts that are unclear?"])),
            tryIt(pick("adv-c5-l2-try1", "Why did Aya hesitate?", ["She wasn't sure if he wanted honest criticism.", "She was on holiday.", "She didn't read it."], 0, "Gaya komunikasi.")),
          ],
        },
      ],
      checkpoint: [
        listen("adv-c5-l2-c1", voice("I'm afraid I won't be able to make it to the meeting, but I can send my notes."), "Listen. What is the speaker doing?", ["declining politely and offering an alternative", "accepting", "complaining"], 0, "Penolakan sopan."),
        pick("adv-c5-l2-c2", "Which is the most polite request?", ["Would it be possible to extend the deadline?", "Extend the deadline.", "I want more time."], 0, "Permintaan halus."),
        match("adv-c5-l2-c3", "Match the direct phrase and the softened version.", [["No.", "I'd love to, but I can't."], ["That's wrong.", "I see it slightly differently."], ["Do you understand?", "Does that make sense?"], ["Send it.", "Could you possibly send it?"]], "Strategi kesantunan."),
        fill("adv-c5-l2-c4", "Complete: I'm ___ I can't help this week. (sayangnya)", "I'm", "I can't help this week.", ["afraid"], "I'm afraid.", { translate: true }),
        trPick("adv-c5-l2-c5", "“Apakah penjelasan saya cukup jelas?” in English is…", ["Does that make sense?", "Do you make sense?", "Is that sensing?"], 0, "Memeriksa pemahaman."),
        pick("adv-c5-l2-c6", "You are hosting a guest from a low-context culture. Which response best avoids misunderstanding?", ["I can't help on Friday, but I could help on Monday afternoon.", "Yes, I'll try. (meaning no)", "Silence."], 0, "Jujur dan sopan.", { hots: true }),
      ],
    },
    {
      id: "adv-c5-l3",
      skill: "writing",
      title: "Reflecting on Culture",
      summary: "Writing a reflective essay on an intercultural experience and role-playing intercultural situations.",
      sections: [
        {
          title: "Stereotypes vs. generalisations",
          blocks: [
            examples([{ wrong: "All Germans are cold and rude.", note: "Stereotip: kaku, negatif, tidak bisa diubah." }, { right: "Many Germans tend to value directness in business communication.", note: "Generalisasi hati-hati: kecenderungan, terbuka terhadap pengecualian." }], "Careful language"),
            tip("Gunakan bahasa yang hati-hati: **tend to, often, many, in general, in my experience**, dan selalu ingat bahwa setiap orang adalah individu."),
          ],
        },
        {
          title: "Write and role-play",
          blocks: [
            writing({
              id: "adv-c5-l3-write",
              title: "An intercultural reflection",
              prompt: "Write a reflective essay about an intercultural experience (with someone from another country, or from another region or ethnic group in Indonesia). Describe the situation, the misunderstanding or surprise, what you learned and how you would communicate differently now.",
              image: "earth",
              minWords: 280,
              maxWords: 400,
              tips: ["Situation: When …, I met …", "Surprise / misunderstanding: I was surprised that …", "Explanation: Later I learned that …", "Reflection: This taught me … Now I …", "Avoid stereotypes: in my experience, tend to …"],
              models: [{ label: "Example", text: "Last year, a Japanese exchange student, Haruka, stayed with my family in Makassar for three weeks. On her first evening, my mother cooked a huge meal and kept putting more food on Haruka's plate. Haruka ate everything, even though she looked very full.\nThe next morning, she quietly told me that she had felt unwell all night. I was confused. Why hadn't she simply said she was full?\nLater, Haruka explained that in her family, it is polite to finish everything on your plate, because leaving food might suggest the meal was not good. Meanwhile, in my family, an empty plate is a signal to give more food. We were both being polite, but our polite habits clashed.\nThis experience taught me that politeness is not universal. The same action can mean opposite things in different cultures. Now, when I host guests, I explain our customs early and ask open questions, such as “How do people usually show they are full in your family?”\nI also learned to avoid assuming. Haruka was not shy or difficult; she was simply following the rules she had grown up with, just as I was." }],
              rubric: ["I described the situation clearly.", "I explained the cultural difference without stereotyping.", "I reflected on what I learned.", "I described how I would communicate differently.", "My essay is well organised and uses careful language."],
            }),
            speaking({
              id: "adv-c5-l3-say",
              title: "Intercultural role play",
              prompt: "Role-play one situation and solve it politely: (a) A foreign teacher asks you to call her by her first name, but it feels rude to you. (b) A visitor offers to shake hands with your grandmother, who doesn't shake hands with men. (c) A guest arrives an hour early for a family event.",
              image: "hello",
              prepSeconds: 60,
              seconds: 90,
              tips: ["Thank you so much for … In our culture, …", "Would you mind if I …?", "I hope that's okay with you.", "How do people usually … in your country?"],
              models: [{ label: "Situation (b)", text: "Oh, thank you for being so friendly! Actually, in our family, my grandmother usually greets men like this: she puts her hand to her chest and smiles. It's a sign of respect. Would you like to try it? … Yes, exactly! She's very happy to meet you. How do people usually greet elders in your country?" }],
              rubric: ["I explained the cultural custom kindly.", "I used softening language.", "I asked about the other person's culture.", "The situation was resolved respectfully."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("adv-c5-l3-c1", "Which sentence is a careful generalisation, not a stereotype?", ["In my experience, many students from Bali tend to be very artistic.", "All Balinese are artists.", "Balinese people can't do maths."], 0, "Generalisasi hati-hati."),
        pick("adv-c5-l3-c2", "In the model essay, why did Haruka finish all her food?", ["In her family, leaving food may suggest the meal was not good.", "She was very hungry.", "She wanted more."], 0, "Kebiasaan budaya."),
        arrange("adv-c5-l3-c3", "Put the words in order.", "How do people usually greet elders in your country", "Pertanyaan terbuka."),
        fill("adv-c5-l3-c4", "Complete: Politeness is not ___ ; it changes across cultures.", "Politeness is not", "; it changes across cultures.", ["universal"], "Universal = berlaku di mana saja."),
        trPick("adv-c5-l3-c5", "“Menghindari asumsi” in English is…", ["to avoid assuming", "to avoid assumed", "to avoiding assume"], 0, "Avoid + -ing."),
        pick("adv-c5-l3-c6", "What is the main lesson of the Haruka story?", ["Both people were polite, but their customs clashed, so communication matters.", "Japanese guests are difficult.", "Mothers should cook less."], 0, "Pelajaran utama.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "adv-c5-post",
    title: "Chapter 5 Posttest",
    passPercent: 70,
    passages: [CULTURE],
    questions: [
      pick("adv-c5-post1", "Which phrase softens a refusal?", ["I'm afraid I can't.", "No way.", "Never.", "Forget it."], 0, "Pelunak."),
      listen("adv-c5-post2", voice("In many Indonesian communities, giving something with your left hand is considered impolite."), "Listen. What is considered impolite?", ["giving something with your left hand", "smiling", "shaking hands", "saying thank you"], 0, "Tangan kiri."),
      trPick("adv-c5-post3", "“Komunikasi antarbudaya” in English is…", ["intercultural communication", "inter culture talking", "between culture speaking", "international culturing"], 0, "Intercultural communication."),
      pick("adv-c5-post4", "Which is a stereotype?", ["All teenagers are lazy.", "Some teenagers find mornings difficult.", "Many students enjoy music.", "In my class, most students like sport."], 0, "Stereotip."),
      arrange("adv-c5-post5", "Put the words in order.", "Would it be possible to meet next week", "Permintaan halus."),
      pick("adv-c5-post6", "What had Bayu already promised to do that week?", ["help his uncle", "visit the Netherlands", "give a presentation", "study for exams"], 0, "Baris 3.", { passageId: CULTURE.id }),
      match("adv-c5-post7", "Match the style and its feature.", [["low-context", "says exactly what it means"], ["high-context", "meaning is in tone and situation"], ["saving face", "avoiding embarrassment"], ["stereotype", "oversimplified idea about a group"]], "Konsep budaya."),
      fill("adv-c5-post8", "Complete.", "Directness can be efficient but may seem", ".", ["rude"], "Baris 6.", { passageId: CULTURE.id }),
      pick("adv-c5-post9", "What caused the misunderstanding between Lotte and Bayu?", ["They interpreted “yes” differently because of different communication styles.", "Bayu was lazy.", "Lotte spoke no English.", "The presentation was cancelled."], 0, "Penyebab salah paham.", { passageId: CULTURE.id, hots: true }),
      pick("adv-c5-post10", "Which reply from Bayu would have worked best for both cultures?", ["I'm sorry, I can't this week, but maybe next Monday?", "Yes, I'll try.", "No.", "Maybe, maybe not."], 0, "Jujur dan sopan (baris 7).", { passageId: CULTURE.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Culture Smart",
    questions: [
      live("adv-c5-live1", "Indirect style culture:", ["high-context", "low-context", "no-context", "fast-context"], 0, "chat"),
      live("adv-c5-live2", "Polite refusal:", ["I'd love to, but…", "No.", "Never.", "Why?"], 0, "hand"),
      live("adv-c5-live3", "Oversimplified group idea:", ["stereotype", "statistic", "survey", "summary"], 0, "question"),
      live("adv-c5-live4", "“Menjaga muka” =", ["save face", "wash face", "face off", "make face"], 0, "happy", true),
      live("adv-c5-live5", "Checking understanding:", ["Does that make sense?", "Got it?!", "Listen!", "Obviously."], 0, "owl-think"),
      live("adv-c5-live6", "Careful word:", ["tend to", "always", "all", "never"], 0, "pencil"),
      live("adv-c5-live7", "Netherlands style:", ["low-context", "high-context", "silent", "musical"], 0, "earth"),
      live("adv-c5-live8", "Politeness is not…", ["universal", "useful", "possible", "kind"], 0, "hello"),
    ],
  },
};

const DATA: Passage = {
  id: "adv-c6-data",
  title: "Report: Internet Use Among Indonesian Teenagers (illustrative data)",
  pic: "report",
  lines: [
    "The bar chart shows the average number of hours that teenagers in one Indonesian city spent online per day between 2018 and 2026, divided by purpose.",
    "Overall, total internet use rose significantly over the period, from about 3 hours a day in 2018 to just over 7 hours in 2026.",
    "Time spent on social media increased steadily, doubling from 1.5 hours to 3 hours, and it remained the largest category throughout.",
    "The most dramatic change was in online learning. It was negligible in 2018, at around 15 minutes, but rose sharply to 2.5 hours in 2021, when schools moved online. After that, it fell back to about 1 hour.",
    "Gaming showed a gradual increase, from 0.5 hours to 1.5 hours, while time spent reading news online stayed relatively stable at around 30 minutes.",
    "In contrast, the number of teenagers who reported reading printed books every week declined from 48% to 29%.",
    "These figures suggest that the internet has become central to teenagers' lives. However, the data do not show whether this time is used productively, so further research on the quality of online activities is needed.",
  ],
};

export const CH6: Level = {
  id: "adv-ch6",
  title: "Chapter 6 — Data and Visual Texts",
  description: "Read and describe graphs, charts and infographics accurately; use language of trends, comparison and approximation; interpret data critically and write a data report.",
  targetScore: "Reading · Writing · Vocabulary",
  cover: ["report", "laptop", "target"],
  pretest: {
    id: "adv-c6-pre",
    title: "Chapter 6 Pretest",
    passPercent: 0,
    questions: [
      pick("adv-c6-pre1", "A line on a graph goes up quickly. We say it…", ["rose sharply", "fell slightly", "remained stable", "fluctuated"], 0, "Naik tajam."),
      listen("adv-c6-pre2", voice("Sales fell slightly in March and then levelled off."), "Listen. What happened after March?", ["Sales stayed at the same level.", "Sales rose sharply.", "Sales doubled.", "Sales disappeared."], 0, "Level off = mendatar."),
      trPick("adv-c6-pre3", "“Diagram batang” in English is…", ["bar chart", "stick graph", "line diagram", "pie chart"], 0, "Bar chart."),
      pick("adv-c6-pre4", "“Just over 7 hours” means…", ["a little more than 7 hours", "exactly 7 hours", "much less than 7 hours", "70 hours"], 0, "Sedikit di atas."),
      pick("adv-c6-pre5", "Which chart is best for showing parts of a whole (percentages)?", ["pie chart", "line graph", "map", "timeline"], 0, "Diagram lingkaran."),
    ],
  },
  lessons: [
    {
      id: "adv-c6-l1",
      skill: "vocabulary",
      title: "The Language of Trends",
      summary: "Verbs, nouns, adjectives and adverbs to describe change.",
      sections: [
        {
          title: "Describing change",
          blocks: [
            table(["Direction", "Verbs", "Nouns"], [["up ↑", "rise, increase, grow, climb, soar", "a rise, an increase, growth"], ["down ↓", "fall, decrease, decline, drop, plunge", "a fall, a decrease, a decline, a drop"], ["no change →", "remain stable, stay constant, level off", "stability, a plateau"], ["up and down ↕", "fluctuate", "fluctuation"], ["highest / lowest", "peak, reach a high / hit a low", "a peak, a low point"]]),
            table(["Degree", "Adjective", "Adverb"], [["very big", "dramatic, sharp, significant", "dramatically, sharply, significantly"], ["medium", "steady, gradual, moderate", "steadily, gradually, moderately"], ["small", "slight, marginal", "slightly, marginally"]]),
            pics([["report", "bar chart"], ["target", "peak"], ["clock", "over time"], ["money", "figures"]]),
          ],
        },
        {
          title: "Approximation and comparison",
          blocks: [
            table(["Approximation", "Comparison"], [["about, around, approximately, roughly", "twice as many as, three times higher than"], ["just over / just under", "the highest / the lowest"], ["nearly, almost", "compared with / in comparison to"], ["well over / well below", "while, whereas, in contrast"]]),
            examples([{ right: "Social media use rose steadily from 1.5 to 3 hours. (verb + adverb)" }, { right: "There was a steady rise in social media use. (adjective + noun)" }, { wrong: "The number of users was increased.", right: "The number of users increased.", note: "Increase/rise/fall tidak memakai pasif dalam deskripsi tren." }], "Two ways to describe a trend"),
            tryIt(pick("adv-c6-l1-try1", "Which phrase describes a very small change?", ["a marginal increase", "a dramatic rise", "a sharp drop"], 0, "Marginal = sangat kecil.")),
          ],
        },
      ],
      checkpoint: [
        listen("adv-c6-l1-c1", voice("The price of rice peaked in July and then dropped sharply."), "Listen. When was the price highest?", ["in July", "after July", "at the start of the year"], 0, "Peak = puncak."),
        match("adv-c6-l1-c2", "Match the verb and the symbol.", [["rise", "↑"], ["fall", "↓"], ["remain stable", "→"], ["fluctuate", "↕"]], "Arah tren."),
        pick("adv-c6-l1-c3", "Which sentence is correct?", ["There was a gradual increase in exports.", "There was a gradually increase in exports.", "Exports were increased gradual."], 0, "Adjective + noun."),
        fill("adv-c6-l1-c4", "Complete: The number of visitors ___ (naik dua kali lipat) from 200 to 400.", "The number of visitors", "from 200 to 400.", ["doubled"], "Doubled = naik dua kali lipat.", { translate: true }),
        trPick("adv-c6-l1-c5", "“Kira-kira 30 persen” in English is…", ["approximately 30 percent", "approximate 30 percents", "about of 30 percent"], 0, "Approximately."),
        pick("adv-c6-l1-c6", "A value goes 10 → 25 → 12 → 30 → 15. Which verb fits best?", ["fluctuated", "remained stable", "rose steadily"], 0, "Naik-turun.", { hots: true }),
      ],
    },
    {
      id: "adv-c6-l2",
      skill: "reading",
      title: "Reading a Data Report",
      summary: "Overview, key features, comparisons and critical interpretation.",
      passages: [DATA],
      sections: [
        {
          title: "The report",
          blocks: [
            { type: "passage", passage: DATA },
            table(["Year", "Social media", "Online learning", "Gaming", "News", "Total"], [["2018", "1.5 h", "0.25 h", "0.5 h", "0.5 h", "≈ 3 h"], ["2021", "2.5 h", "2.5 h", "1 h", "0.5 h", "≈ 6.5 h"], ["2026", "3 h", "1 h", "1.5 h", "0.5 h", "≈ 7 h"]]),
            text("Catatan: data ini **ilustratif** untuk latihan. Total juga mencakup aktivitas lain yang tidak dirinci."),
          ],
        },
        {
          title: "How the report is organised",
          blocks: [
            table(["Part", "Function", "Line"], [["Introduction", "what the chart shows (paraphrased)", "1"], ["Overview", "the main trend in one sentence", "2"], ["Key features", "biggest changes with figures", "3–5"], ["Additional data", "a contrasting statistic", "6"], ["Interpretation", "cautious conclusion and limits", "7"]]),
            tip("**Overview** adalah kalimat terpenting: rangkum tren utama tanpa banyak angka. Lalu dukung dengan **angka spesifik** untuk perubahan terbesar."),
            tryIt(pick("adv-c6-l2-try1", "What was the largest category throughout the period?", ["social media", "online learning", "gaming"], 0, "Baris 3.", { passageId: DATA.id })),
          ],
        },
      ],
      checkpoint: [
        pick("adv-c6-l2-c1", "Why did online learning rise sharply in 2021?", ["Schools moved online.", "Games became cheaper.", "News became popular."], 0, "Baris 4.", { passageId: DATA.id }),
        pick("adv-c6-l2-c2", "What happened to time spent reading news online?", ["It stayed relatively stable.", "It doubled.", "It disappeared."], 0, "Baris 5.", { passageId: DATA.id }),
        fill("adv-c6-l2-c3", "Complete.", "the number of teenagers who reported reading printed books every week declined from 48% to", ".", ["29%", "29 percent"], "Baris 6.", { passageId: DATA.id }),
        pickMany("adv-c6-l2-c4", "Choose ALL the categories that increased overall from 2018 to 2026.", ["social media", "online learning", "gaming", "news"], [0, 1, 2], "News stabil.", { passageId: DATA.id }),
        pick("adv-c6-l2-c5", "Why does the writer say “further research … is needed”?", ["The data show time spent, not whether it is used productively.", "The writer is lazy.", "The numbers are wrong."], 0, "Batasan data.", { passageId: DATA.id, hots: true }),
        pick("adv-c6-l2-c6", "Which statement is NOT supported by the data?", ["Teenagers who use social media more get lower grades.", "Total internet use more than doubled.", "Online learning peaked in 2021."], 0, "Klaim yang tidak didukung data.", { passageId: DATA.id, hots: true }),
      ],
    },
    {
      id: "adv-c6-l3",
      skill: "writing",
      title: "Write a Data Report",
      summary: "Describing a chart from a survey and presenting findings.",
      sections: [
        {
          title: "Your data",
          blocks: [
            table(["Your class survey (example)", "Grade 10", "Grade 11", "Grade 12"], [["Average hours of sleep on school nights", "7.2", "6.5", "5.8"], ["Students who exercise 3+ times a week", "45%", "38%", "22%"], ["Students who bring a reusable bottle", "60%", "72%", "80%"]]),
            warn("Jangan menyimpulkan **sebab-akibat** hanya dari data korelasi. Gunakan bahasa hati-hati: *suggest, may indicate, appears to*."),
          ],
        },
        {
          title: "Write and present",
          blocks: [
            writing({
              id: "adv-c6-l3-write",
              title: "A data report",
              prompt: "Write a 200–280 word report describing the survey table above (or data you collected yourself). Include an introduction, an overview, key features with figures and comparisons, and a cautious interpretation.",
              image: "report",
              minWords: 200,
              maxWords: 300,
              tips: ["The table shows …", "Overall, … while …", "The most striking feature is …", "In comparison, …", "These figures suggest that … However, …"],
              models: [{ label: "Example", text: "The table shows the results of a survey of senior high school students about their sleep, exercise and use of reusable water bottles, compared across Grades 10, 11 and 12.\nOverall, as students move to higher grades, they tend to sleep less and exercise less, while environmentally friendly habits become more common.\nThe most striking feature is the decline in sleep. Grade 10 students sleep for an average of 7.2 hours on school nights, but this falls to 6.5 hours in Grade 11 and just under 6 hours in Grade 12, well below the eight to ten hours recommended for teenagers.\nExercise follows a similar pattern. Nearly half of Grade 10 students exercise three or more times a week, compared with only 22% of Grade 12 students, a drop of more than half.\nIn contrast, the proportion of students who bring a reusable bottle rises steadily, from 60% in Grade 10 to 80% in Grade 12.\nThese figures suggest that academic pressure in the final years may reduce time for rest and exercise. However, the survey does not measure the reasons directly, so interviews with students would be needed to confirm this." }],
              rubric: ["I paraphrased what the data show in the introduction.", "I wrote a clear overview of the main trends.", "I supported key features with accurate figures.", "I used varied trend and comparison language.", "My interpretation is cautious and avoids false causation."],
            }),
            speaking({
              id: "adv-c6-l3-say",
              title: "Present the findings",
              prompt: "Present the main findings of the survey in about 90 seconds, as if showing slides to the school council. Highlight two key trends and give one recommendation.",
              image: "laptop",
              prepSeconds: 60,
              seconds: 90,
              tips: ["As you can see on this slide, …", "What stands out is …", "Interestingly, …", "Based on these findings, we recommend …"],
              models: [{ label: "Example", text: "As you can see on this slide, sleep drops steadily from Grade 10 to Grade 12. Grade 12 students sleep under six hours on average, which is well below what doctors recommend. What stands out is that exercise falls even more sharply: only about one in five Grade 12 students exercises regularly. Interestingly, environmental habits move in the opposite direction. Reusable bottle use rises to 80%. Based on these findings, we recommend that the school schedules a short daily activity break for Grade 12 and offers a workshop on sleep and study planning." }],
              rubric: ["I highlighted two key trends with figures.", "I used signposting for slides.", "I gave a recommendation linked to the data.", "I spoke clearly and confidently."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("adv-c6-l3-c1", "In the model report, what is the most striking feature?", ["the decline in sleep", "the rise in exercise", "stable bottle use"], 0, "Fitur utama."),
        pick("adv-c6-l3-c2", "Which sentence is the overview?", ["Overall, as students move to higher grades, they tend to sleep less and exercise less.", "The table shows the results of a survey.", "Grade 10 students sleep 7.2 hours."], 0, "Overview."),
        arrange("adv-c6-l3-c3", "Put the words in order.", "The proportion of students rises steadily", "Deskripsi tren."),
        fill("adv-c6-l3-c4", "Complete: This falls to ___ under six hours in Grade 12. (sedikit di bawah)", "This falls to", "under six hours in Grade 12.", ["just"], "Just under.", { translate: true }),
        trPick("adv-c6-l3-c5", "“Yang paling mencolok adalah…” in English is…", ["What stands out is…", "What stands up is…", "The most standing is…"], 0, "What stands out."),
        pick("adv-c6-l3-c6", "Why does the model end with “interviews would be needed to confirm this”?", ["Survey numbers alone don't explain the reasons.", "Interviews are more fun.", "The data are fake."], 0, "Kehati-hatian ilmiah.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "adv-c6-post",
    title: "Chapter 6 Posttest",
    passPercent: 70,
    passages: [DATA],
    questions: [
      pick("adv-c6-post1", "Unemployment ___ slightly from 5.8% to 5.6%.", ["fell", "soared", "doubled", "peaked"], 0, "Turun sedikit."),
      listen("adv-c6-post2", voice("The number of electric motorbikes soared, increasing almost tenfold in three years."), "Listen. How did the number change?", ["It increased dramatically.", "It decreased slightly.", "It stayed the same.", "It fluctuated."], 0, "Soar = melonjak."),
      trPick("adv-c6-post3", "“Mencapai puncaknya” in English is…", ["reached a peak", "reached a pick", "went to top up", "peaked down"], 0, "Peak = puncak."),
      pick("adv-c6-post4", "Which phrase means a little less than 50%?", ["just under 50%", "well over 50%", "exactly 50%", "twice 50%"], 0, "Just under."),
      arrange("adv-c6-post5", "Put the words in order.", "There was a sharp rise in online learning", "Adjective + noun."),
      pick("adv-c6-post6", "How much did social media use increase?", ["it doubled, from 1.5 to 3 hours", "it tripled", "it fell", "it stayed the same"], 0, "Baris 3.", { passageId: DATA.id }),
      match("adv-c6-post7", "Match the category and its trend.", [["social media", "rose steadily"], ["online learning", "rose sharply, then fell"], ["news", "remained stable"], ["printed books", "declined"]], "Tren data."),
      fill("adv-c6-post8", "Complete.", "Overall, total internet use rose", "over the period.", ["significantly"], "Baris 2.", { passageId: DATA.id }),
      pick("adv-c6-post9", "Which word in line 7 shows a cautious interpretation?", ["suggest", "central", "data", "research"], 0, "Hedging.", { passageId: DATA.id, hots: true }),
      pick("adv-c6-post10", "Based on the data, which conclusion is most reasonable?", ["Teenagers spend much more time online now, mainly on social media.", "Teenagers stopped reading completely.", "Games caused the pandemic.", "Online learning is now the largest category."], 0, "Kesimpulan yang didukung data.", { passageId: DATA.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Data Detectives",
    questions: [
      live("adv-c6-live1", "Goes up and down:", ["fluctuates", "soars", "levels off", "peaks"], 0, "report"),
      live("adv-c6-live2", "Very small change:", ["marginal", "dramatic", "sharp", "huge"], 0, "question"),
      live("adv-c6-live3", "Parts of a whole chart:", ["pie chart", "line graph", "timeline", "map"], 0, "target"),
      live("adv-c6-live4", "“Kira-kira” =", ["approximately", "appropriately", "apparently", "accurately"], 0, "owl-think", true),
      live("adv-c6-live5", "Most important summary sentence:", ["overview", "title", "footnote", "caption"], 0, "laptop"),
      live("adv-c6-live6", "Highest point:", ["peak", "plateau", "dip", "low"], 0, "mountain"),
      live("adv-c6-live7", "There was a ___ increase.", ["steady", "steadily", "steadiness", "steadied"], 0, "clock"),
      live("adv-c6-live8", "Cautious verb:", ["suggest", "prove", "guarantee", "confirm forever"], 0, "pencil"),
    ],
  },
};
