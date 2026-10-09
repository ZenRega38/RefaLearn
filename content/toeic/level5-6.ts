import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { audio, examples, listen, live, match, pick, pickMany, pics, say, sequence, table, text, tip, trPick, tryIt, vocab, voice, warn } from "../kit";

// TOEIC Listening & Reading — Level 5: Advanced (target 850+) · Level 6: Expert and Final Mock (target 900+)

const DOUBLE: Passage = {
  id: "toeic5-double",
  title: "Multiple passages: price list and email",
  pic: "receipt",
  lines: [
    "Document 1 — Printwell Business Services: Price list",
    "Business cards (box of 200): Rp 150,000 — ready in 2 working days",
    "Flyers, A5, full colour (500 copies): Rp 600,000 — ready in 3 working days",
    "Banners (2 m × 1 m): Rp 350,000 each — ready in 4 working days",
    "Express service (+50% of the price): any order ready the next working day",
    "Orders over Rp 1,000,000 receive free delivery within the city.",
    "Document 2 — Email",
    "To: orders@printwell.example | From: Yuni Hapsari, Kopi Kenangan Senja | Date: Thursday, 5 September",
    "Hello, we are opening a new café on Saturday, 14 September, and need materials for the opening.",
    "We would like 500 A5 flyers and two banners. We also need a box of business cards for our new manager, Bayu Prakoso.",
    "Everything must be delivered to our café on Jl. Pemuda by Friday morning at the latest, as we will be setting up that afternoon.",
    "Please let me know the total cost. Thank you, Yuni",
  ],
};

const CHAT: Passage = {
  id: "toeic6-chat",
  title: "Text message chain",
  pic: "smartphone",
  lines: [
    "Fajar Nugroho [10:31]: Hi Sekar, the client from Osaka just landed. Is the meeting room ready?",
    "Sekar Ayu [10:33]: Almost. The projector still isn't connecting to my laptop.",
    "Fajar Nugroho [10:34]: Have you tried the cable in the second drawer? That one usually works.",
    "Sekar Ayu [10:38]: That did it! Slides are up.",
    "Fajar Nugroho [10:39]: Great. They should be here by 11:30. Can you order lunch for six?",
    "Sekar Ayu [10:41]: Sure. Any dietary requirements?",
    "Fajar Nugroho [10:42]: One of them doesn't eat seafood. Otherwise, anything is fine.",
    "Sekar Ayu [10:44]: Got it. I'll order from the Javanese place downstairs. They deliver in 30 minutes.",
  ],
};

const MOCK_EMAIL: Passage = {
  id: "toeic6-email",
  title: "Email",
  pic: "envelope",
  lines: [
    "To: All staff | From: Hendra Wijaya, Facilities Manager | Subject: Parking changes",
    "As many of you know, the north parking area will be resurfaced from 1 to 15 October.",
    "During this time, staff who normally park there may use the visitor spaces in the south area, except on Thursdays, when they are reserved for clients attending our weekly product demonstrations.",
    "On Thursdays, we encourage you to use public transport. The company will reimburse bus and train fares for those days on submission of receipts.",
    "Motorcycle parking will not be affected.",
    "Thank you for your patience.",
  ],
};

export const LEVEL5: Level = {
  id: "toeic-l5",
  title: "Level 5 — Advanced (Target 850+)",
  description: "Connect information across multiple passages, master advanced Part 5 grammar (relative clauses, participles, comparisons), and recognise paraphrases in Parts 3 and 4.",
  targetScore: "Target 850+",
  cover: ["receipt", "open-book", "headset"],
  pretest: {
    id: "toeic-l5-pre",
    title: "Level 5 Pretest",
    passPercent: 0,
    questions: [
      pick("toeic-l5-pre1", "The candidate ____ resume impressed us will be interviewed tomorrow.", ["whose", "who", "which", "whom"], 0, "Whose + noun (kepemilikan)."),
      pick("toeic-l5-pre2", "The results were ____ than we had expected.", ["better", "good", "best", "well"], 0, "Comparative + than."),
      pick("toeic-l5-pre3", "In Part 7 multiple-passage sets, some questions require you to…", ["combine information from two or three texts", "write an answer", "listen to audio", "translate the text"], 0, "Soal lintas teks."),
      listen("toeic-l5-pre4", voice("I'm afraid we've run out of the blue model, but the grey one has the same features."), "Listen. What does the speaker imply?", ["The blue model is not available.", "The grey model is more expensive.", "The blue model is better.", "Both are sold out."], 0, "Run out = habis."),
      trPick("toeic-l5-pre5", "“Laporan yang dilampirkan” (participle) in English is…", ["the attached report", "the attaching report", "the report attach"], 0, "Past participle sebagai adjektiva."),
    ],
  },
  lessons: [
    {
      id: "toeic-l5-l1",
      skill: "reading",
      title: "Part 7: Multiple Passages",
      summary: "Linking details across documents: prices, dates, conditions and people.",
      passages: [DOUBLE],
      sections: [
        {
          title: "Strategy",
          blocks: [
            text("Set multiple passages terdiri dari **2 atau 3 dokumen** dengan **5 soal**. Biasanya 1–2 soal membutuhkan informasi dari **lebih dari satu dokumen** (misalnya harga di daftar harga + jumlah di email)."),
            table(["Step", "What to do"], [["1", "skim each document: who wrote it, what type, what date"], ["2", "read the question and decide which document(s) it needs"], ["3", "for cross-reference questions, find the link (name, date, product)"], ["4", "calculate carefully: totals, deadlines, conditions"]]),
            { type: "passage", passage: DOUBLE },
          ],
        },
        {
          title: "Cross-reference practice",
          blocks: [
            tip("Tanda soal lintas dokumen: kata seperti *total*, *probably*, *What is true about…*, atau soal yang menyebut syarat (diskon, gratis ongkir, tenggat)."),
            tryIt(pick("toeic-l5-l1-try", "Why is Yuni ordering printed materials?", ["for a café opening", "for a conference", "for a product launch abroad", "for a staff party"], 0, "Opening a new café.", { passageId: "toeic5-double" })),
          ],
        },
      ],
      checkpoint: [
        pick("toeic-l5-l1-c1", "What is the total price of Yuni's order without express service?", ["Rp 1,450,000", "Rp 1,100,000", "Rp 950,000", "Rp 1,200,000"], 0, "600.000 + 2×350.000 + 150.000 = 1.450.000.", { passageId: "toeic5-double" }),
        pick("toeic-l5-l1-c2", "Will Yuni's order be delivered for free?", ["Yes, because it is over Rp 1,000,000.", "No, delivery is never free.", "Only the banners.", "Only if she uses express service."], 0, "Lintas dokumen: total > 1 juta.", { passageId: "toeic5-double" }),
        pick("toeic-l5-l1-c3", "Which item takes the longest to produce?", ["the banners", "the flyers", "the business cards", "they are all the same"], 0, "Banners: 4 hari kerja.", { passageId: "toeic5-double" }),
        pick("toeic-l5-l1-c4", "Who is Bayu Prakoso?", ["the café's new manager", "a Printwell employee", "Yuni's customer", "a delivery driver"], 0, "Business cards for the new manager.", { passageId: "toeic5-double" }),
        trPick("toeic-l5-l1-c5", "“Paling lambat Jumat pagi” in English is…", ["by Friday morning at the latest", "until Friday morning latest", "late Friday morning most"], 0, "At the latest."),
        pick("toeic-l5-l1-c6", "If Yuni places the order on the day she sends her email, does she need express service to receive everything in time?", ["No, the longest item takes 4 working days, so standard service is enough.", "Yes, everything takes a week.", "Yes, banners always need express service.", "It is impossible to finish before the opening."], 0, "Kamis 5 Sept + 4 hari kerja ≈ Rabu 11 Sept, sebelum Jumat pagi.", { hots: true, passageId: "toeic5-double" }),
      ],
    },
    {
      id: "toeic-l5-l2",
      skill: "reading",
      title: "Part 5: Advanced Grammar",
      summary: "Relative pronouns, -ing/-ed participles, comparisons and pronouns.",
      sections: [
        {
          title: "Grammar points",
          blocks: [
            table(["Point", "Rule", "Example"], [["who / which / whose / whom", "who = person subject; which = thing; whose = possession; whom = object", "The supplier whose prices were lowest won the contract."], ["-ing vs -ed adjectives", "-ing = causes the feeling; -ed = feels it", "The results were surprising. / We were surprised."], ["participle clauses", "-ing = active; -ed = passive", "Customers using the app… / Products made in Bali…"], ["comparisons", "-er / more … than; the most …; as … as", "This model is as reliable as the previous one."], ["reflexive pronouns", "himself / themselves for emphasis or same subject", "She completed the report herself."]]),
            examples([{ wrong: "The staff were very interesting in the new policy.", right: "The staff were very interested in the new policy.", note: "Yang merasakan → -ed." }, { wrong: "Products manufacturing in Batam are cheaper.", right: "Products manufactured in Batam are cheaper.", note: "Produk dibuat → passive participle." }]),
          ],
        },
        {
          title: "Practice",
          blocks: [
            tryIt(pick("toeic-l5-l2-try", "Applicants ____ for the position must have five years of experience.", ["applying", "applied", "apply", "applies"], 0, "Applicants who are applying → active participle.")),
            vocab([["whose", "yang (kepemilikan)", "card"], ["whom", "yang (objek)", "boy"], ["as … as", "se-… (sama)", "blocks"], ["-ed adjective", "merasakan", "surprised"]], "Quick reference"),
          ],
        },
      ],
      checkpoint: [
        pick("toeic-l5-l2-c1", "The manager ____ we spoke with yesterday has approved the plan.", ["whom", "whose", "which", "what"], 0, "Objek dari spoke with → whom."),
        pick("toeic-l5-l2-c2", "The figures in the report were quite ____.", ["disappointing", "disappointed", "disappoint", "disappointment"], 0, "Figures menyebabkan perasaan → -ing."),
        pick("toeic-l5-l2-c3", "The documents ____ to the email contain the full contract.", ["attached", "attaching", "attach", "attachment"], 0, "Dokumen dilampirkan → passive."),
        pick("toeic-l5-l2-c4", "This year's conference was ____ successful than last year's.", ["more", "most", "much", "very"], 0, "More … than."),
        pick("toeic-l5-l2-c5", "Ms Dewi prefers to handle important clients ____.", ["herself", "her", "hers", "she"], 0, "Reflexive untuk penekanan."),
        pick("toeic-l5-l2-c6", "Which sentence is correct?", ["Employees who wish to attend must register by Monday.", "Employees which wish to attend must register by Monday.", "Employees whose wish to attend must register by Monday.", "Employees whom wish to attend must register by Monday."], 0, "Orang sebagai subjek → who.", { hots: true }),
      ],
    },
    {
      id: "toeic-l5-l3",
      skill: "listening",
      title: "Paraphrase in Parts 3 and 4",
      summary: "The answer rarely uses the same words as the audio.",
      sections: [
        {
          title: "Paraphrase patterns",
          blocks: [
            table(["You hear", "The correct option says"], [["The printer's out of paper.", "Some supplies need to be replaced."], ["I'll swing by your office after lunch.", "Visit a colleague in the afternoon."], ["We're short-staffed this week.", "Some employees are unavailable."], ["Can you look over my slides?", "Review a presentation."], ["The shipment got held up at customs.", "A delivery has been delayed."]]),
            warn("Pilihan yang **mengulang kata dari audio** sering merupakan **jebakan**. Pilihan yang benar biasanya memakai **sinonim atau ungkapan yang lebih umum**."),
          ],
        },
        {
          title: "Practice",
          blocks: [
            audio("Conversation in an office", say(["man", "Rina, we're really short-staffed this week. Two people are at the trade fair in Singapore."], ["woman", "I know. Should we ask the temp agency for help?"], ["man", "That's a good idea, but it takes a few days. In the meantime, could you look over the client proposal before I send it this afternoon?"], ["woman", "Sure, I'll swing by your desk after lunch."])),
            pics([["staff", "short-staffed"], ["plane", "trade fair abroad"], ["report", "proposal"], ["lunch", "after lunch"]]),
            tryIt(pick("toeic-l5-l3-try", "What problem does the man mention?", ["Some employees are unavailable.", "A proposal was rejected.", "The trade fair was cancelled.", "The office is closed."], 0, "Short-staffed → unavailable.")),
          ],
        },
      ],
      checkpoint: [
        pick("toeic-l5-l3-c1", "Why are two employees absent?", ["They are attending an event abroad.", "They are sick.", "They are on vacation.", "They quit."], 0, "Trade fair in Singapore."),
        pick("toeic-l5-l3-c2", "What does the man ask the woman to do?", ["review a document", "call a temp agency", "travel to Singapore", "write a proposal"], 0, "Look over → review."),
        pick("toeic-l5-l3-c3", "When will the woman visit the man?", ["in the afternoon", "tomorrow morning", "next week", "right now"], 0, "After lunch → afternoon."),
        match("toeic-l5-l3-c4", "Match the expression and its paraphrase.", [["held up at customs", "delayed"], ["short-staffed", "not enough employees"], ["look over", "review"], ["swing by", "visit briefly"]], "Parafrasa."),
        trPick("toeic-l5-l3-c5", "“Kekurangan staf” in English is…", ["short-staffed", "low staffing up", "staff shorting"], 0, "Short-staffed."),
        pick("toeic-l5-l3-c6", "Why does the man say the temp agency “takes a few days”?", ["It won't solve the immediate problem.", "He dislikes the agency.", "The agency is closed.", "He wants to hire permanently."], 0, "Solusi tidak segera.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "toeic-l5-post",
    title: "Level 5 Mock Quiz",
    passPercent: 70,
    passages: [DOUBLE],
    questions: [
      pick("toeic-l5-post1", "The consultant ____ advice we followed helped us cut costs.", ["whose", "who", "whom", "which"], 0, "Whose advice."),
      pick("toeic-l5-post2", "The new policy has been ____ received by staff.", ["warmly", "warm", "warmth", "warmer"], 0, "Adverb sebelum participle."),
      pick("toeic-l5-post3", "Of all the candidates, Mr Arif is the ____ qualified.", ["most", "more", "much", "many"], 0, "Superlative: the most."),
      pick("toeic-l5-post4", "Visitors ____ the factory must wear safety helmets.", ["touring", "toured", "tour", "tours"], 0, "Active participle."),
      pick("toeic-l5-post5", "How much would Yuni pay for the flyers alone with express service?", ["Rp 900,000", "Rp 600,000", "Rp 650,000", "Rp 1,200,000"], 0, "600.000 + 50% = 900.000.", { passageId: "toeic5-double" }),
      pick("toeic-l5-post6", "When will the café open?", ["Saturday, 14 September", "Thursday, 5 September", "Friday, 13 September", "Sunday, 15 September"], 0, "Saturday 14 September.", { passageId: "toeic5-double" }),
      listen("toeic-l5-post7", say(["woman", "Has the new software been installed on all the computers?"], ["man", "Most of them. The ones in accounting are still running the old version; I'll finish those tomorrow."]), "Listen. What is true about the accounting computers?", ["They have not been updated yet.", "They are broken.", "They are new.", "They will be removed."], 0, "Still old version → belum diperbarui."),
      trPick("toeic-l5-post8", "“Hasilnya mengejutkan.” in English is…", ["The results were surprising.", "The results were surprised.", "The result surprise."], 0, "-ing = penyebab."),
      pick("toeic-l5-post9", "What will Yuni's team probably do on Friday afternoon?", ["prepare the café for the opening", "print the flyers", "interview a new manager", "visit Printwell"], 0, "Setting up that afternoon.", { hots: true, passageId: "toeic5-double" }),
      pick("toeic-l5-post10", "You hear “The shipment got held up at customs.” Which option is the best paraphrase?", ["A delivery has been delayed.", "A shipment was held by a customer.", "Customs officers are on holiday.", "The goods arrived early."], 0, "Hindari kata yang sama (customs/held).", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Advanced Mix",
    questions: [
      live("toeic-l5-live1", "The man ____ car broke down…", ["whose", "who", "which", "whom"], 0, "car"),
      live("toeic-l5-live2", "I was ____ by the news.", ["surprised", "surprising", "surprise", "surprises"], 0, "surprised"),
      live("toeic-l5-live3", "Multiple-passage set questions:", ["5", "3", "4", "2"], 0, "open-book"),
      live("toeic-l5-live4", "“Kekurangan staf” =", ["short-staffed", "short-stuffed", "staff-short", "less-staff"], 0, "staff", true),
      live("toeic-l5-live5", "Products ____ in Bali", ["made", "making", "make", "makes"], 0, "basket"),
      live("toeic-l5-live6", "As reliable ____ the old one", ["as", "than", "like", "so"], 0, "laptop"),
      live("toeic-l5-live7", "“Look over” =", ["review", "ignore", "jump", "throw"], 0, "owl-read"),
      live("toeic-l5-live8", "Held up at customs =", ["delayed", "lifted", "stolen", "cheap"], 0, "ship"),
    ],
  },
};

export const LEVEL6: Level = {
  id: "toeic-l6",
  title: "Level 6 — Expert and Final Mock (Target 900+)",
  description: "Answer intent questions in text-message chains, manage your time across all seven parts, avoid common traps, and complete a mixed final mock quiz.",
  targetScore: "Target 900+",
  cover: ["trophy", "smartphone", "clock"],
  pretest: {
    id: "toeic-l6-pre",
    title: "Level 6 Pretest",
    passPercent: 0,
    questions: [
      pick("toeic-l6-pre1", "How long should you spend, on average, on each Part 5 question?", ["about 20–30 seconds", "about 2 minutes", "about 5 minutes", "no time limit"], 0, "Part 5 harus cepat agar waktu Part 7 cukup."),
      pick("toeic-l6-pre2", "A text message says “That did it!” after a suggestion. It means…", ["The suggestion solved the problem.", "Someone did something wrong.", "The task is finished forever."], 0, "That did it = berhasil."),
      pick("toeic-l6-pre3", "If you don't know an answer, you should…", ["guess, because wrong answers are not penalized", "leave it blank", "spend five minutes on it"], 0, "Tidak ada penalti."),
      trPick("toeic-l6-pre4", "“Mengatur waktu” (during a test) in English is…", ["manage your time", "arrange your clock", "set the hours"], 0, "Time management."),
      listen("toeic-l6-pre5", voice("You might want to bring an umbrella. The forecast says it'll pour this afternoon.", "man"), "Listen. What does the speaker suggest?", ["Heavy rain is expected.", "It will be sunny.", "The event is cancelled.", "Umbrellas are on sale."], 0, "Pour = hujan deras."),
    ],
  },
  lessons: [
    {
      id: "toeic-l6-l1",
      skill: "reading",
      title: "Part 7: Text Chains and Intent Questions",
      summary: "Understanding what writers mean in chats and online discussions.",
      passages: [CHAT],
      sections: [
        {
          title: "Intent questions",
          blocks: [
            text("Soal seperti *At 10:38, what does Ms Ayu mean when she writes, \"That did it\"?* menguji **makna dalam konteks**. Baca **pesan sebelumnya** untuk tahu apa yang ditanggapi."),
            table(["Expression", "Typical meaning in context"], [["That did it! / That worked.", "the suggestion solved the problem"], ["I'm on it.", "I'll take care of it now"], ["Got it.", "I understand"], ["No worries.", "it's not a problem"], ["Fair enough.", "I accept your reason"], ["I'll pass.", "I'll decline"]]),
            { type: "passage", passage: CHAT },
          ],
        },
        {
          title: "Practice",
          blocks: [
            tryIt(pick("toeic-l6-l1-try", "At 10:38, what does Ms Ayu mean when she writes, “That did it!”?", ["The cable fixed the projector problem.", "She has finished the slides.", "She broke the projector.", "She found the second drawer empty."], 0, "Menanggapi saran kabel.", { passageId: "toeic6-chat" })),
            pics([["smartphone", "chat"], ["laptop", "projector"], ["lunch", "lunch for six"], ["fish", "no seafood"]]),
          ],
        },
      ],
      checkpoint: [
        pick("toeic-l6-l1-c1", "Where are the visitors coming from?", ["Osaka", "Jakarta", "Singapore", "Seoul"], 0, "Client from Osaka.", { passageId: "toeic6-chat" }),
        pick("toeic-l6-l1-c2", "What time are the visitors expected?", ["11:30", "10:30", "12:00", "11:00"], 0, "By 11:30.", { passageId: "toeic6-chat" }),
        pick("toeic-l6-l1-c3", "What does Mr Nugroho ask Ms Ayu to arrange?", ["lunch for six people", "a hotel room", "an airport pickup", "a new projector"], 0, "Order lunch for six.", { passageId: "toeic6-chat" }),
        pick("toeic-l6-l1-c4", "At 10:44, what does Ms Ayu mean when she writes, “Got it”?", ["She understands the dietary requirement.", "She has received the food.", "She found the cable.", "She caught a cold."], 0, "Got it = mengerti.", { passageId: "toeic6-chat" }),
        trPick("toeic-l6-l1-c5", "“Saya urus sekarang.” (chat) in English is…", ["I'm on it.", "I'm at it now on.", "I take care now it."], 0, "I'm on it."),
        pick("toeic-l6-l1-c6", "What can be inferred about the restaurant Ms Ayu chooses?", ["It is located in the same building.", "It only serves seafood.", "It is in Osaka.", "It is closed today."], 0, "Downstairs → di gedung yang sama.", { hots: true, passageId: "toeic6-chat" }),
      ],
    },
    {
      id: "toeic-l6-l2",
      skill: "reading",
      title: "Time Management and Traps",
      summary: "A minute-by-minute plan for the Reading section and the most common traps.",
      sections: [
        {
          title: "Reading time plan (75 minutes)",
          blocks: [
            table(["Part", "Questions", "Suggested time"], [["Part 5", "30", "about 10–12 minutes"], ["Part 6", "16", "about 8–10 minutes"], ["Part 7 single passages", "29", "about 25 minutes"], ["Part 7 multiple passages", "25", "about 25 minutes"], ["check / guess", "—", "remaining minutes"]]),
            tip("Jika sebuah soal Part 5 butuh lebih dari 30 detik, **tebak dan tandai**. Waktu lebih berharga untuk Part 7. Pastikan **semua 100 soal terisi** sebelum waktu habis."),
          ],
        },
        {
          title: "Common traps",
          blocks: [
            table(["Trap", "Example", "Defence"], [["same word, wrong meaning", "audio: “copy” → option: “coffee”", "listen for meaning, not single words"], ["true but not the answer", "a correct fact that doesn't answer the question", "re-read what is asked"], ["extreme words", "always, never, all, only", "check the text supports it 100%"], ["wrong person", "the woman's request vs the man's", "note who says what"]]),
            examples([{ wrong: "Q: What does the woman want? → choose what the MAN wants.", right: "Underline who the question is about: the woman / the man / the speaker.", note: "Jebakan pembicara." }]),
            tryIt(pick("toeic-l6-l2-try", "An option says “The company always offers free delivery,” but the text says “free delivery on orders over $100.” This option is…", ["incorrect because “always” is too extreme", "correct", "partly correct, so choose it", "not related to the text"], 0, "Kata ekstrem.")),
          ],
        },
      ],
      checkpoint: [
        pick("toeic-l6-l2-c1", "Which part of the Reading section deserves the most total time?", ["Part 7", "Part 5", "Part 6", "they are equal"], 0, "Part 7: 54 soal."),
        pick("toeic-l6-l2-c2", "Five minutes remain and you have 12 unanswered questions. What should you do?", ["Fill in a guess for every remaining question.", "Read the last passage slowly.", "Leave them blank.", "Re-check Part 5."], 0, "Tanpa penalti → isi semua."),
        sequence("toeic-l6-l2-c3", "Put the Reading parts in the order they appear.", ["Incomplete Sentences", "Text Completion", "Single passages", "Multiple passages"], "Part 5 → 6 → 7."),
        pickMany("toeic-l6-l2-c4", "Choose ALL words that often signal a wrong option.", ["always", "never", "only", "usually"], [0, 1, 2], "Kata ekstrem."),
        trPick("toeic-l6-l2-c5", "“Tebak dan lanjut” (test strategy) in English is…", ["guess and move on", "guess and go back", "think and stop"], 0, "Guess and move on."),
        pick("toeic-l6-l2-c6", "Why is it risky to choose an option because it repeats words you heard?", ["Test writers use repeated words as distractors; the answer is usually paraphrased.", "Repeated words are always correct.", "It is not risky.", "The audio never repeats words."], 0, "Distraktor.", { hots: true }),
      ],
    },
    {
      id: "toeic-l6-l3",
      skill: "listening",
      title: "Final Listening Workout",
      summary: "Mixed Part 2–4 practice at test speed.",
      sections: [
        {
          title: "Listening checklist",
          blocks: [
            table(["Part", "Remember"], [["1", "check action, position and passive (is being / has been)"], ["2", "the first word decides; indirect answers are common"], ["3", "read questions first; watch for graphics and three speakers"], ["4", "the first sentence tells who and where; paraphrase is everywhere"]]),
            vocab([["pour", "hujan deras", "rain"], ["postpone", "menunda", "calendar"], ["on short notice", "mendadak", "alarm"], ["keynote", "pidato utama", "microphone"]], "Listening words"),
          ],
        },
        {
          title: "Talk practice",
          blocks: [
            audio("A conference announcement", say(["woman", "Good morning, and welcome to the third annual Digital Retail Summit. Before we begin, a quick change to the programme. Our keynote speaker, Dr Anita Rahman, has been delayed by a flight problem, so her talk has been moved from nine o'clock to two this afternoon. In its place, we'll start with the panel discussion on online payments. Lunch will be served in the main foyer at twelve thirty. Thank you for your understanding."])),
            pics([["microphone", "keynote"], ["plane", "flight delay"], ["meeting", "panel"], ["lunch", "lunch at 12:30"]]),
            tryIt(pick("toeic-l6-l3-try", "What is the purpose of the announcement?", ["to explain a schedule change", "to introduce a new product", "to cancel the summit", "to sell tickets"], 0, "Perubahan jadwal.")),
          ],
        },
      ],
      checkpoint: [
        pick("toeic-l6-l3-c1", "Why has the keynote been moved?", ["The speaker's flight was delayed.", "The room is unavailable.", "The speaker is ill.", "Too few people came."], 0, "Flight problem."),
        pick("toeic-l6-l3-c2", "What will happen first?", ["a panel discussion", "the keynote speech", "lunch", "a coffee break"], 0, "Panel on online payments."),
        pick("toeic-l6-l3-c3", "Where will lunch be served?", ["in the main foyer", "in the ballroom", "outside", "in a restaurant downtown"], 0, "Main foyer."),
        listen("toeic-l6-l3-c4", voice("Didn't the client want the report in Indonesian as well?", "man"), "Listen. Choose the best response.", ["Yes, the translation is almost done.", "The client is Indonesian food.", "In the report folder."], 0, "Negative question → jawaban faktual."),
        trPick("toeic-l6-l3-c5", "“Secara mendadak” (with little warning) in English is…", ["on short notice", "in short note", "with short time"], 0, "On short notice."),
        pick("toeic-l6-l3-c6", "A participant came only for Dr Rahman's talk. What should she do?", ["return at 2 P.M.", "leave immediately", "attend at 9 A.M.", "go to lunch at noon"], 0, "Penerapan info.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "toeic-l6-post",
    title: "Final Mock Quiz",
    passPercent: 70,
    passages: [MOCK_EMAIL],
    questions: [
      pick("toeic-l6-post1", "Look at the picture. Which statement best describes it?", ["Some people are boarding a bus.", "A bus is being repaired.", "The bus stop is empty.", "Passengers are buying tickets inside a station."], 0, "Part 1: aksi yang terlihat.", { image: "bus" }),
      listen("toeic-l6-post2", voice("Why don't we postpone the launch until the reviews are in?", "man"), "Listen. Choose the best response.", ["That makes sense.", "It launched last year.", "The reviews were long."], 0, "Saran → setuju."),
      listen("toeic-l6-post3", say(["woman", "The caterer just called. They can't deliver until one."], ["man", "But the workshop breaks for lunch at twelve thirty."], ["woman", "Then let's move the afternoon session forward and eat afterwards."]), "Listen. What does the woman suggest?", ["changing the order of the schedule", "cancelling lunch", "finding a new caterer", "ending the workshop early"], 0, "Move the session forward."),
      pick("toeic-l6-post4", "The proposal, ____ was submitted last week, has been approved.", ["which", "who", "whose", "what"], 0, "Non-defining clause untuk benda."),
      pick("toeic-l6-post5", "____ the high cost, the board approved the new equipment.", ["Despite", "Although", "Because", "Unless"], 0, "Despite + noun."),
      pick("toeic-l6-post6", "Why was the email sent?", ["to inform staff about temporary parking arrangements", "to announce a new office", "to sell parking spaces", "to invite clients to a demonstration"], 0, "Parking changes.", { passageId: "toeic6-email" }),
      pick("toeic-l6-post7", "What is NOT affected by the work?", ["motorcycle parking", "the north parking area", "visitor spaces on Thursdays", "staff who park in the north area"], 0, "Motorcycle parking will not be affected.", { passageId: "toeic6-email" }),
      trPick("toeic-l6-post8", "“Diganti biayanya dengan menyerahkan kuitansi” in English is…", ["reimbursed on submission of receipts", "paid back with giving receipt", "refund by submit receipts"], 0, "Bahasa email formal."),
      pick("toeic-l6-post9", "What is implied about the company's clients?", ["Some of them drive to the weekly product demonstrations.", "They are not allowed to park on Thursdays.", "They use public transport to visit.", "They will help resurface the parking area."], 0, "Ruang tamu dipesan untuk klien hari Kamis → klien datang membawa kendaraan.", { hots: true, passageId: "toeic6-email" }),
      pick("toeic-l6-post10", "A north-area driver wants to park at work on a Thursday in early October. What is the best option?", ["Use public transport and claim the fare.", "Park in a visitor space.", "Park in the north area anyway.", "Park in the client spaces."], 0, "Penerapan aturan.", { hots: true, passageId: "toeic6-email" }),
    ],
  },
  live: {
    title: "Live Quiz — TOEIC Final Boss",
    questions: [
      live("toeic-l6-live1", "Total questions:", ["200", "100", "150", "250"], 0, "trophy"),
      live("toeic-l6-live2", "“That did it!” =", ["It worked.", "It broke.", "It's late.", "It's done badly."], 0, "thumbs-up"),
      live("toeic-l6-live3", "Biggest Reading part:", ["Part 7", "Part 5", "Part 6", "Part 4"], 0, "open-book"),
      live("toeic-l6-live4", "“Menunda” =", ["postpone", "postcard", "position", "possess"], 0, "calendar", true),
      live("toeic-l6-live5", "Out of time? →", ["guess the rest", "leave blanks", "cry", "start again"], 0, "clock"),
      live("toeic-l6-live6", "Extreme word:", ["always", "usually", "often", "sometimes"], 0, "alarm"),
      live("toeic-l6-live7", "“I'm on it.” =", ["I'll handle it.", "I'm standing on it.", "I'm tired.", "I don't know."], 0, "smartphone"),
      live("toeic-l6-live8", "Score range:", ["10–990", "0–9", "1–6", "310–677"], 0, "target"),
    ],
  },
};
