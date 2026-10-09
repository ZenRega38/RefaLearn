import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, say, table, text, trPick, tryIt, voice, warn, writing } from "../kit";

// English Grammar Essentials — Chapter 5: Modals and Conditionals · Chapter 6: Passive, Reported Speech and Relative Clauses

const ADVICE: Passage = {
  id: "gram5-advice",
  title: "Advice Column: Moving to a New City",
  lines: [
    "Dear Advice Desk, I've just moved to Surabaya for work, and I don't know anyone. What should I do? — Lonely in the City",
    "Dear Lonely, first of all, you don't have to feel embarrassed. Almost everyone who moves to a new city feels this way at first.",
    "You should try to say yes to every invitation in your first few months, even if you feel tired. You might not enjoy every event, but you could meet someone important.",
    "If you join a club or a sports team, you'll meet people who share your interests. Many cities have free running groups that meet at weekends.",
    "You mustn't compare your new life with the life you had back home; it took years to build those friendships.",
    "If I were you, I would also invite colleagues for lunch. They must feel the same way sometimes, and they might be glad you asked.",
  ],
};

const NEWS: Passage = {
  id: "gram6-news",
  title: "News Report: Rare Turtle Nests Found",
  lines: [
    "Three nests of the endangered leatherback turtle have been discovered on a remote beach in West Papua, conservation officials announced on Monday.",
    "The nests were found by a team of local volunteers who have been patrolling the beach every night since April.",
    "According to the head of the team, more than two hundred eggs are being protected by a temporary fence.",
    "She said that the volunteers had been hoping for this moment for years and that they would continue patrolling until the eggs hatched.",
    "The beach, which is only accessible by boat, is one of the few nesting sites left in the region.",
    "Officials asked visitors not to use bright lights near the beach, as the light can confuse newly hatched turtles.",
  ],
};

export const CH5: Level = {
  id: "gram-ch5",
  title: "Chapter 5 — Modals and Conditionals",
  description: "Use modal verbs for ability, obligation, advice, possibility and deduction, and form zero, first, second, third and mixed conditionals.",
  targetScore: "Level B1–B2",
  cover: ["owl-think", "question", "target"],
  pretest: {
    id: "gram-ch5-pre",
    title: "Chapter 5 Pretest",
    passPercent: 0,
    questions: [
      pick("gram-ch5-pre1", "You ___ wear a seatbelt. It's the law.", ["must", "might", "could", "would"], 0, "Kewajiban."),
      pick("gram-ch5-pre2", "If it rains, we ___ the picnic.", ["will cancel", "would cancel", "cancelled", "cancel will"], 0, "First conditional."),
      trPick("gram-ch5-pre3", "“Kamu tidak perlu datang.” in English is…", ["You don't have to come.", "You mustn't come.", "You can't come."], 0, "Tidak perlu."),
      pick("gram-ch5-pre4", "If I ___ you, I'd take the job.", ["were", "am", "will be", "had"], 0, "Second conditional."),
      pick("gram-ch5-pre5", "She ___ be at home; her car is outside.", ["must", "can't", "mustn't", "shouldn't"], 0, "Deduksi kuat."),
    ],
  },
  lessons: [
    {
      id: "gram-ch5-l1",
      skill: "structure",
      title: "Modal Verbs",
      summary: "can/could, must/have to, should/ought to, may/might, and modals of deduction.",
      sections: [
        {
          title: "Functions",
          blocks: [
            table(["Function", "Modals", "Example"], [["ability", "can, could, be able to", "She can speak three languages."], ["obligation", "must, have to", "You have to show your ID."], ["no obligation", "don't have to", "You don't have to pay."], ["prohibition", "mustn't, can't", "You mustn't smoke here."], ["advice", "should, ought to, had better", "You should rest."], ["possibility", "may, might, could", "It might rain later."], ["deduction (present)", "must (sure yes), can't (sure no)", "He must be tired. That can't be true."]]),
            warn("**Mustn't** = dilarang; **don't have to** = tidak wajib. *You mustn't park here* ≠ *You don't have to park here*."),
          ],
        },
        {
          title: "Past modals",
          blocks: [
            table(["Form", "Meaning", "Example"], [["should have + V3", "it was a good idea but didn't happen", "I should have studied harder."], ["must have + V3", "certain deduction about the past", "She must have left early."], ["could / might have + V3", "past possibility", "He might have missed the bus."], ["can't have + V3", "impossible in the past", "They can't have seen us."]]),
            pics([["owl-think", "deduction"], ["clock", "past"], ["question", "possibility"], ["sad", "regret"]]),
            tryIt(pick("gram-ch5-l1-try", "The streets are wet. It ___ rained last night.", ["must have", "should have", "can't have"], 0, "Deduksi masa lalu.")),
          ],
        },
      ],
      checkpoint: [
        pick("gram-ch5-l1-c1", "You ___ bring food; lunch is provided.", ["don't have to", "mustn't", "can't"], 0, "Tidak wajib."),
        pick("gram-ch5-l1-c2", "I ___ swim when I was five.", ["could", "can", "must"], 0, "Kemampuan masa lalu."),
        fill("gram-ch5-l1-c3", "Complete: You ___ see a doctor about that cough. (sebaiknya)", "You", "see a doctor about that cough.", ["should", "ought to"], "Saran.", { translate: true }),
        match("gram-ch5-l1-c4", "Match the modal and the meaning.", [["must (deduction)", "almost certain"], ["might", "possible"], ["can't (deduction)", "impossible"], ["should", "advice"]], "Makna modal."),
        trPick("gram-ch5-l1-c5", "“Seharusnya aku menelepon kemarin.” in English is…", ["I should have called yesterday.", "I must call yesterday.", "I should called yesterday."], 0, "Penyesalan."),
        pick("gram-ch5-l1-c6", "He has been working for 14 hours. Which is the most logical sentence?", ["He must be exhausted.", "He can't be tired.", "He mustn't be tired."], 0, "Deduksi logis.", { hots: true }),
      ],
    },
    {
      id: "gram-ch5-l2",
      skill: "structure",
      title: "Conditionals",
      summary: "Zero, first, second, third and mixed conditionals; unless, as long as, provided that.",
      sections: [
        {
          title: "The system",
          blocks: [
            table(["Type", "Form", "Use"], [["zero", "If + present, present", "general truths"], ["first", "If + present, will", "real future possibilities"], ["second", "If + past, would", "imaginary present/future"], ["third", "If + past perfect, would have + V3", "imaginary past, regrets"], ["mixed", "If + past perfect, would + verb", "past condition → present result"]]),
            examples([{ right: "If you heat ice, it melts." }, { right: "If you join a club, you'll meet people." }, { right: "If I were you, I would invite colleagues." }, { right: "If I had known, I would have helped." }, { right: "If I had studied medicine, I would be a doctor now." }], "Examples"),
          ],
        },
        {
          title: "Alternatives to if",
          blocks: [
            table(["Word", "Meaning", "Example"], [["unless", "if … not", "Unless you hurry, you'll miss the bus."], ["as long as / provided that", "only if", "You can borrow it as long as you return it."], ["in case", "because something might happen", "Take an umbrella in case it rains."], ["otherwise", "if not", "Leave now; otherwise you'll be late."]]),
            tryIt(pick("gram-ch5-l2-try", "If I ___ more money, I would travel more.", ["had", "have", "will have"], 0, "Second conditional.")),
          ],
        },
      ],
      checkpoint: [
        pick("gram-ch5-l2-c1", "If you ___ the bus, you'll be late.", ["miss", "missed", "will miss"], 0, "First conditional."),
        pick("gram-ch5-l2-c2", "If she had left earlier, she ___ the train.", ["would have caught", "would catch", "caught"], 0, "Third conditional."),
        pick("gram-ch5-l2-c3", "___ you study, you won't pass.", ["Unless", "If", "As long as"], 0, "Unless = if not."),
        fill("gram-ch5-l2-c4", "Complete: Take a jacket ___ case it gets cold.", "Take a jacket", "case it gets cold.", ["in"], "In case."),
        trPick("gram-ch5-l2-c5", "“Seandainya dulu aku belajar bahasa Jepang, sekarang aku bisa kerja di Tokyo.” in English is…", ["If I had learned Japanese, I could work in Tokyo now.", "If I learned Japanese, I could have worked in Tokyo now.", "If I learn Japanese, I will work in Tokyo before."], 0, "Mixed conditional."),
        pick("gram-ch5-l2-c6", "“If I were rich, I'd buy a boat.” What does this tell us?", ["The speaker is not rich now.", "The speaker is rich.", "The speaker was rich in the past."], 0, "Second = tidak nyata.", { hots: true }),
      ],
    },
    {
      id: "gram-ch5-l3",
      skill: "reading",
      title: "Modals and Conditionals in Advice",
      summary: "Reading an advice column and writing a reply.",
      passages: [ADVICE],
      sections: [
        {
          title: "Read",
          blocks: [
            { type: "passage", passage: ADVICE },
            audio("Listen and read", say(["woman", ADVICE.lines.slice(1).join(" ")])),
          ],
        },
        {
          title: "Write",
          blocks: [
            text("**Letter:** *Dear Advice Desk, I want to start a small online business selling handmade bags, but I'm afraid it might fail and I have only a little money. What should I do? — Nervous Beginner*"),
            writing({
              id: "gram-ch5-l3-write",
              title: "An advice reply",
              prompt: "Write a reply (130–180 words) to Nervous Beginner. Use at least four different modals (including one past modal) and three different conditional types.",
              image: "chat",
              minWords: 130,
              maxWords: 180,
              tips: ["Dear Nervous Beginner, you don't have to …", "You should / might / could …", "If you start small, you will …", "If I were you, I would …", "Many successful sellers must have …"],
              models: [{ label: "Model", text: "Dear Nervous Beginner,\nFeeling nervous is completely normal, and you don't have to risk all your money at once. If you start small, you will learn what customers want without losing too much.\nYou should begin by making a few bags and selling them to friends or through social media. You might also ask a local café if you could display them. Listen carefully to feedback; customers can tell you which colours and sizes they prefer.\nIf I were you, I would keep careful records of every sale and cost. Many successful sellers must have made mistakes in their first year too, so don't give up if your first designs don't sell. Remember: if Indonesian brands like those at craft markets hadn't started small, they would never have grown.\nUnless you try, you'll never know what is possible.\nGood luck!\nAdvice Desk" }],
              rubric: ["I used at least four different modals correctly.", "I used a past modal.", "I used at least three conditional types correctly.", "My advice was practical and supportive."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("gram-ch5-l3-c1", "What does the writer say about feeling embarrassed?", ["You don't have to feel embarrassed.", "You must feel embarrassed.", "You can't feel embarrassed."], 0, "Baris 2.", { passageId: ADVICE.id }),
        pick("gram-ch5-l3-c2", "What will happen if Lonely joins a club?", ["They'll meet people with similar interests.", "They'll become famous.", "They'll lose friends."], 0, "Baris 4 (first conditional).", { passageId: ADVICE.id }),
        fill("gram-ch5-l3-c3", "Complete from the text: You ___ compare your new life with the life you had back home.", "You", "compare your new life with the life you had back home.", ["mustn't", "must not"], "Baris 5.", { passageId: ADVICE.id }),
        pickMany("gram-ch5-l3-c4", "Choose ALL modals of possibility in the text.", ["might", "could", "must (feel the same)", "should"], [0, 1], "Must di baris 6 = deduksi; should = saran.", { passageId: ADVICE.id }),
        pick("gram-ch5-l3-c5", "In line 6, “They must feel the same way” expresses…", ["a confident deduction", "an obligation", "a prohibition"], 0, "Deduksi.", { passageId: ADVICE.id }),
        pick("gram-ch5-l3-c6", "Why does the writer say “it took years to build those friendships”?", ["to remind Lonely that new friendships need time", "to criticise old friends", "to suggest going home"], 0, "Fungsi.", { passageId: ADVICE.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "gram-ch5-post",
    title: "Chapter 5 Posttest",
    passPercent: 70,
    passages: [ADVICE],
    questions: [
      pick("gram-ch5-post1", "Passengers ___ use phones during take-off.", ["mustn't", "don't have to", "might", "could"], 0, "Larangan."),
      pick("gram-ch5-post2", "That ___ be Rina; she's in Japan this week.", ["can't", "must", "should", "might have"], 0, "Deduksi negatif."),
      pick("gram-ch5-post3", "If I ___ about the meeting, I would have come.", ["had known", "knew", "know", "would know"], 0, "Third conditional."),
      pick("gram-ch5-post4", "You can use my laptop ___ you're careful.", ["as long as", "unless", "in case", "otherwise"], 0, "Syarat."),
      fill("gram-ch5-post5", "Complete: I ___ have told you earlier. Sorry!", "I", "have told you earlier. Sorry!", ["should"], "Penyesalan."),
      pick("gram-ch5-post6", "What does the writer suggest about invitations?", ["Say yes to every invitation in the first few months.", "Refuse invitations when tired.", "Only accept work invitations."], 0, "Baris 3.", { passageId: ADVICE.id }),
      trPick("gram-ch5-post7", "“Kalau aku jadi kamu, aku akan mengundang rekan kerja.” in English is…", ["If I were you, I would invite colleagues.", "If I am you, I will invite colleagues.", "If I was you, I invite colleagues."], 0, "Second conditional."),
      listen("gram-ch5-post8", voice("He might have taken the wrong bus."), "What does the speaker express?", ["a past possibility", "a past certainty", "a future plan"], 0, "Might have."),
      pick("gram-ch5-post9", "“If you heat water to 100°C, it boils.” This is a…", ["zero conditional", "first conditional", "second conditional", "third conditional"], 0, "Fakta umum."),
      pick("gram-ch5-post10", "Which piece of advice uses a mixed conditional?", ["If you had joined the club last year, you would know more people now.", "If you join a club, you'll meet people.", "If I were you, I'd join a club."], 0, "Masa lalu → sekarang.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Modal Mania",
    questions: [
      live("gram-ch5-live1", "Prohibition:", ["mustn't", "don't have to", "might", "could"], 0, "traffic-light"),
      live("gram-ch5-live2", "Advice:", ["should", "must have", "can't", "would have"], 0, "owl-think"),
      live("gram-ch5-live3", "If I ___ you…", ["were", "am", "be", "will be"], 0, "question"),
      live("gram-ch5-live4", "“Tidak perlu” =", ["don't have to", "mustn't", "can't", "shouldn't"], 0, "thumbs-up", true),
      live("gram-ch5-live5", "Unless = if …", ["not", "so", "only", "yes"], 0, "target"),
      live("gram-ch5-live6", "Third conditional result:", ["would have + V3", "will + V1", "would + V1", "present"], 0, "clock"),
      live("gram-ch5-live7", "Sure deduction (past):", ["must have", "should have", "can have", "will have"], 0, "eye"),
      live("gram-ch5-live8", "Take an umbrella ___ case it rains.", ["in", "on", "at", "for"], 0, "umbrella"),
    ],
  },
};

export const CH6: Level = {
  id: "gram-ch6",
  title: "Chapter 6 — Passive, Reported Speech and Relative Clauses",
  description: "Use the passive in different tenses, report what people said and asked, and combine ideas with defining and non-defining relative clauses.",
  targetScore: "Level B1+–B2",
  cover: ["report", "turtle", "microphone"],
  pretest: {
    id: "gram-ch6-pre",
    title: "Chapter 6 Pretest",
    passPercent: 0,
    questions: [
      pick("gram-ch6-pre1", "The bridge ___ in 2015.", ["was built", "built", "is built", "has build"], 0, "Pasif lampau."),
      pick("gram-ch6-pre2", "She said that she ___ tired.", ["was", "is", "will", "be"], 0, "Reported: am → was."),
      trPick("gram-ch6-pre3", "“Pantai yang hanya bisa dicapai dengan perahu” in English is…", ["a beach which is only accessible by boat", "a beach who only accessible by boat", "a beach where only accessible boat"], 0, "Relative clause."),
      pick("gram-ch6-pre4", "He asked me where I ___ .", ["lived", "did live", "do live", "living"], 0, "Reported question."),
      pick("gram-ch6-pre5", "The man ___ car was stolen called the police.", ["whose", "who", "which", "that"], 0, "Kepemilikan."),
    ],
  },
  lessons: [
    {
      id: "gram-ch6-l1",
      skill: "structure",
      title: "The Passive Voice",
      summary: "Form across tenses, when to use it, by + agent, and reporting passives.",
      sections: [
        {
          title: "Passive forms",
          blocks: [
            table(["Tense", "Passive", "Example"], [["present simple", "is/are + V3", "Coffee is grown in Aceh."], ["present continuous", "is/are being + V3", "The eggs are being protected."], ["present perfect", "has/have been + V3", "Three nests have been discovered."], ["past simple", "was/were + V3", "The nests were found last week."], ["future", "will be + V3", "Results will be announced soon."], ["modal", "can/must/should be + V3", "Bright lights must not be used."]]),
            text("Pakai pasif jika **pelaku tidak penting/tidak diketahui** atau ingin **fokus pada objek**. Struktur pelaporan formal: *It is believed that… / The turtles are thought to…*"),
          ],
        },
        {
          title: "Practice",
          blocks: [
            pics([["turtle", "turtles are protected"], ["beach", "nests were found"], ["report", "results will be announced"], ["camera", "photos were taken"]]),
            tryIt(pick("gram-ch6-l1-try", "The results ___ next week.", ["will be announced", "will announce", "are announcing"], 0, "Future passive.")),
          ],
        },
      ],
      checkpoint: [
        pick("gram-ch6-l1-c1", "English ___ all over the world.", ["is spoken", "speaks", "is speaking", "spoke"], 0, "Present passive."),
        pick("gram-ch6-l1-c2", "The room ___ at the moment.", ["is being cleaned", "is cleaned now", "cleans"], 0, "Present continuous passive."),
        fill("gram-ch6-l1-c3", "Complete: The museum ___ (visit) by thousands of people every year.", "The museum", "by thousands of people every year.", ["is visited"], "Present simple passive."),
        arrange("gram-ch6-l1-c4", "Put the words in order.", "The new bridge has been opened to traffic", "Present perfect passive."),
        trPick("gram-ch6-l1-c5", "“Diyakini bahwa…” (formal) in English is…", ["It is believed that…", "It believes that…", "Is believing that…"], 0, "Reporting passive."),
        pick("gram-ch6-l1-c6", "Why is “My wallet was stolen” better than an active sentence here?", ["We don't know who stole it.", "Wallets steal things.", "It is shorter."], 0, "Pelaku tidak diketahui.", { hots: true }),
      ],
    },
    {
      id: "gram-ch6-l2",
      skill: "structure",
      title: "Reported Speech and Relative Clauses",
      summary: "Reporting statements, questions and requests; who, which, that, whose, where.",
      sections: [
        {
          title: "Reported speech",
          blocks: [
            table(["Direct", "Reported"], [["“We are hoping for this.”", "She said (that) they were hoping for this."], ["“We will continue.”", "She said they would continue."], ["“Where do you live?”", "He asked where I lived."], ["“Are you ready?”", "He asked if/whether I was ready."], ["“Don't use bright lights.”", "Officials asked visitors not to use bright lights."]]),
            warn("**Said** tidak diikuti orang (*said me* ❌); pakai **told me**. Pertanyaan yang dilaporkan memakai **urutan pernyataan**: *asked where I lived* (bukan *where did I live*)."),
          ],
        },
        {
          title: "Relative clauses",
          blocks: [
            table(["Pronoun", "For", "Example"], [["who / that", "people", "volunteers who have been patrolling"], ["which / that", "things", "a fence which protects the eggs"], ["whose", "possession", "a village whose beach is protected"], ["where", "places", "the beach where the turtles nest"]]),
            text("**Defining** (tanpa koma) membedakan benda yang dimaksud. **Non-defining** (dengan koma, tanpa *that*) menambah informasi: *The beach, **which is only accessible by boat**, is protected.*"),
            tryIt(pick("gram-ch6-l2-try", "She told me that she ___ the next day.", ["would call", "will call", "calls"], 0, "Will → would.")),
          ],
        },
      ],
      checkpoint: [
        pick("gram-ch6-l2-c1", "“I can help.” → He said he ___ help.", ["could", "can", "will"], 0, "Can → could."),
        pick("gram-ch6-l2-c2", "She asked me ___ I had finished.", ["whether", "that", "what did"], 0, "Yes/no → whether/if."),
        pick("gram-ch6-l2-c3", "Bali, ___ is famous for its temples, attracts millions of tourists.", ["which", "that", "who"], 0, "Non-defining → which."),
        fill("gram-ch6-l2-c4", "Complete: That's the café ___ we first met.", "That's the café", "we first met.", ["where"], "Tempat."),
        trPick("gram-ch6-l2-c5", "“Dia menyuruh saya untuk tidak terlambat.” in English is…", ["She told me not to be late.", "She told me don't be late.", "She said me not late."], 0, "Told + not to."),
        pick("gram-ch6-l2-c6", "Which sentence is wrong?", ["My sister, that lives in Jakarta, is a nurse.", "My sister, who lives in Jakarta, is a nurse.", "The sister who lives in Jakarta is a nurse."], 0, "Non-defining tidak memakai that.", { hots: true }),
      ],
    },
    {
      id: "gram-ch6-l3",
      skill: "reading",
      title: "Grammar in a News Report",
      summary: "Passive, reported speech and relative clauses in a news story; writing your own report.",
      passages: [NEWS],
      sections: [
        {
          title: "Read",
          blocks: [
            { type: "passage", passage: NEWS },
            audio("Listen and read", say(["man", NEWS.lines.join(" ")])),
          ],
        },
        {
          title: "Write",
          blocks: [
            writing({
              id: "gram-ch6-l3-write",
              title: "A short news report",
              prompt: "Write a short news report (130–180 words) about a local event (a festival, a discovery, a community project). Use at least three passive forms, two reported statements or questions, and two relative clauses (one non-defining).",
              image: "report",
              minWords: 130,
              maxWords: 180,
              tips: ["… has been / was … by …", "According to …, …", "… said that … / … asked … to …", "…, which …, …", "… who …"],
              models: [{ label: "Model", text: "A new public library has been opened in a village near Kupang, local officials announced on Saturday.\nThe library, which was built by volunteers in just four months, contains more than three thousand books that were donated by schools across Indonesia. It is also equipped with five computers and free internet access.\nThe village head, who led the project, said that the library would be open every day except Monday. She added that children had been asking for a place to study for years.\nOne volunteer explained that many of the bookshelves had been made from recycled wood. Visitors were asked to return books within two weeks so that more children could borrow them.\nOfficials said they hoped the project would be copied in other villages in the province." }],
              rubric: ["I used at least three passive forms correctly.", "I reported speech with correct tense changes.", "I used defining and non-defining relative clauses.", "My report is factual and clearly organised."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("gram-ch6-l3-c1", "Who found the nests?", ["a team of local volunteers", "tourists", "fishermen", "scientists from abroad"], 0, "Baris 2.", { passageId: NEWS.id }),
        pick("gram-ch6-l3-c2", "How are the eggs being protected?", ["by a temporary fence", "by soldiers", "by moving them indoors", "by covering them with plastic"], 0, "Baris 3.", { passageId: NEWS.id }),
        fill("gram-ch6-l3-c3", "Complete from the text: The beach, ___ is only accessible by boat, …", "The beach,", "is only accessible by boat, …", ["which"], "Baris 5.", { passageId: NEWS.id }),
        pickMany("gram-ch6-l3-c4", "Choose ALL passive forms in the text.", ["have been discovered", "were found", "are being protected", "announced"], [0, 1, 2], "Announced = aktif.", { passageId: NEWS.id }),
        pick("gram-ch6-l3-c5", "What did the head of the team say (direct speech)?", ["“The volunteers have been hoping for this moment for years.”", "“The volunteers hoped for nothing.”", "“We will stop patrolling now.”"], 0, "Ubah balik ke langsung.", { passageId: NEWS.id }),
        pick("gram-ch6-l3-c6", "Why did officials ask visitors not to use bright lights?", ["Light can confuse newly hatched turtles.", "Lights are expensive.", "Visitors need to sleep."], 0, "Baris 6.", { passageId: NEWS.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "gram-ch6-post",
    title: "Chapter 6 Posttest",
    passPercent: 70,
    passages: [NEWS],
    questions: [
      pick("gram-ch6-post1", "These photos ___ by my grandfather in 1970.", ["were taken", "took", "are taking", "have took"], 0, "Pasif lampau."),
      pick("gram-ch6-post2", "The report ___ by Friday.", ["must be finished", "must finish", "must finishing", "must been finished"], 0, "Modal passive."),
      pick("gram-ch6-post3", "“I'm working late.” → She said she ___ late.", ["was working", "is working", "works", "worked yesterday"], 0, "Pergeseran tense."),
      pick("gram-ch6-post4", "He asked me what time the shop ___ .", ["opened", "did open", "does it open", "opens did"], 0, "Urutan pernyataan."),
      fill("gram-ch6-post5", "Complete: The student ___ essay won the prize is from Ambon.", "The student", "essay won the prize is from Ambon.", ["whose"], "Kepemilikan."),
      pick("gram-ch6-post6", "How long have the volunteers been patrolling the beach?", ["since April", "since Monday", "for ten years", "only one night"], 0, "Baris 2.", { passageId: NEWS.id }),
      trPick("gram-ch6-post7", "“Telur-telur itu sedang dilindungi.” in English is…", ["The eggs are being protected.", "The eggs are protecting.", "The eggs being protect."], 0, "Present continuous passive."),
      listen("gram-ch6-post8", voice("The teacher told us to submit our essays by Monday."), "What did the teacher ask?", ["to submit essays by Monday", "not to write essays", "to read on Monday"], 0, "Told + to."),
      pick("gram-ch6-post9", "Which sentence is correct?", ["Leatherback turtles, which are endangered, nest on few beaches.", "Leatherback turtles, that are endangered, nest on few beaches.", "Leatherback turtles which, are endangered nest."], 0, "Non-defining.", { hots: true }),
      pick("gram-ch6-post10", "Why does the report use “have been discovered” in line 1?", ["The discovery is recent news with present relevance.", "It happened a hundred years ago.", "It is a future plan."], 0, "Present perfect untuk berita.", { passageId: NEWS.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Grammar Finals",
    questions: [
      live("gram-ch6-live1", "It ___ built in 1990.", ["was", "were", "is", "has"], 0, "house"),
      live("gram-ch6-live2", "will → (reported)", ["would", "will", "won't", "shall"], 0, "chat"),
      live("gram-ch6-live3", "Possession relative:", ["whose", "who", "which", "where"], 0, "question"),
      live("gram-ch6-live4", "“Sedang dibangun” =", ["is being built", "is building", "built", "has build"], 0, "factory", true),
      live("gram-ch6-live5", "He ___ me the news.", ["told", "said", "spoke", "talked"], 0, "microphone"),
      live("gram-ch6-live6", "Non-defining clause uses…", ["commas + which/who", "that", "no commas", "whose only"], 0, "pencil"),
      live("gram-ch6-live7", "Place relative:", ["where", "which", "whose", "who"], 0, "map"),
      live("gram-ch6-live8", "Passive focus is on the…", ["action/object", "doer only", "time only", "reader"], 0, "target"),
    ],
  },
};
