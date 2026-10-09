import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { audio, examples, fill, listen, live, match, pick, pickMany, pics, say, table, text, tip, trPick, tryIt, vocab, voice, warn } from "../kit";

// TOEIC Listening & Reading — Level 3: Intermediate (target 650+) · Level 4: Upper-Intermediate (target 750+)

const SCHEDULE: Passage = {
  id: "toeic3-schedule",
  title: "Graphic: Shuttle bus timetable (Part 3 style)",
  pic: "bus",
  lines: [
    "Airport Shuttle — Departures from Hotel Cendana",
    "Shuttle A — 7:15 A.M. — Terminal 1 (domestic)",
    "Shuttle B — 8:30 A.M. — Terminal 2 (international)",
    "Shuttle C — 10:00 A.M. — Terminal 1 (domestic)",
    "Shuttle D — 11:45 A.M. — Terminal 2 (international)",
  ],
};

const LETTER: Passage = {
  id: "toeic3-letter",
  title: "Letter with blanks (Part 6 style)",
  pic: "envelope",
  lines: [
    "Dear Mr Wibowo,",
    "Thank you for choosing Sarana Office Furniture. We are writing to confirm your order of 40 ergonomic chairs.",
    "____ (1) the high demand this season, delivery will take approximately three weeks.",
    "We will contact you two days before delivery ____ (2) arrange a convenient time.",
    "____ (3), if you would prefer to collect the chairs from our warehouse, you will receive a 5 percent discount.",
    "____ (4)",
    "Sincerely, Lestari Putri, Customer Relations",
  ],
};

const ARTICLE: Passage = {
  id: "toeic4-article",
  title: "Business news article",
  pic: "report",
  lines: [
    "SURABAYA — Bumi Rasa, a family-owned snack producer, announced on Tuesday that it will open a second factory in Sidoarjo next spring.",
    "The company, founded in 1987 by Hartono and Lilis Santoso, is best known for its cassava chips, which are now sold in more than 4,000 stores nationwide.",
    "\"Demand has grown faster than we expected, especially in export markets,\" said Melati Santoso, the founders' daughter and the company's current CEO.",
    "The new facility is expected to double production capacity and create about 350 jobs. [1]",
    "Bumi Rasa also plans to introduce a line of low-salt products, responding to customer feedback. [2]",
    "Construction will begin in October, pending final approval from local authorities. [3]",
    "Industry analysts say the expansion reflects strong growth in Indonesia's packaged snack sector, which has grown by around 8 percent annually over the past five years. [4]",
  ],
};

export const LEVEL3: Level = {
  id: "toeic-l3",
  title: "Level 3 — Intermediate (Target 650+)",
  description: "Handle Part 3 conversations (including three-speaker and graphics questions), use prepositions and connectors correctly in Parts 5–6, and complete Part 6 letters.",
  targetScore: "Target 650+",
  cover: ["chat", "bus", "envelope"],
  pretest: {
    id: "toeic-l3-pre",
    title: "Level 3 Pretest",
    passPercent: 0,
    questions: [
      pick("toeic-l3-pre1", "How many questions follow each conversation in Part 3?", ["three", "one", "five", "two"], 0, "3 soal per percakapan."),
      pick("toeic-l3-pre2", "____ the bad weather, the event was a great success.", ["Despite", "Although", "Because", "However"], 0, "Despite + noun."),
      pick("toeic-l3-pre3", "Please submit the form ____ Friday.", ["by", "until", "since", "during"], 0, "By = paling lambat."),
      listen("toeic-l3-pre4", say(["woman", "Have the brochures been printed?"], ["man", "Not yet, the printer's out of ink. I'll buy some this afternoon."]), "Listen. What will the man do this afternoon?", ["buy ink", "print brochures", "call a technician", "go home"], 0, "Buy ink."),
      trPick("toeic-l3-pre5", "“Oleh karena itu” in formal English is…", ["Therefore", "Because", "Although"], 0, "Therefore."),
    ],
  },
  lessons: [
    {
      id: "toeic-l3-l1",
      skill: "listening",
      title: "Part 3: Conversations",
      summary: "Reading questions in advance, listening for topic, detail and next action.",
      passages: [SCHEDULE],
      sections: [
        {
          title: "Strategy",
          blocks: [
            table(["Question type", "Example", "Where the answer usually is"], [["topic / purpose", "What are the speakers mainly discussing?", "first 1–2 lines"], ["detail", "What problem does the woman mention?", "middle"], ["request / suggestion", "What does the man suggest?", "Why don't you… / You should…"], ["next action", "What will the woman probably do next?", "last lines: I'll…"], ["implied meaning", "What does the man mean when he says, …?", "context around the quote"]]),
            tip("**Baca 3 soal sebelum audio diputar.** Urutan jawaban biasanya mengikuti urutan percakapan. Jangan terpaku pada satu soal; kalau terlewat, tebak lalu lanjut."),
            warn("Part 3 kadang memakai **tiga pembicara** dan soal **grafik** (jadwal, daftar harga, peta). Lihat grafiknya saat membaca soal."),
          ],
        },
        {
          title: "Practice with a graphic",
          blocks: [
            { type: "passage", passage: SCHEDULE },
            audio("Conversation at a hotel front desk", say(["woman", "Good morning. I need to get to the airport for an international flight. It leaves at noon."], ["man", "Then you'll need a shuttle to Terminal 2. The next one leaves at eight thirty."], ["woman", "Hmm, that's earlier than I'd like, but the later one might be too tight."], ["man", "I agree. With check-in and security, I'd take the earlier one. Shall I reserve a seat for you?"], ["woman", "Yes, please. And could you have my bags brought down at eight?"])),
            pics([["bus", "shuttle"], ["plane", "flight"], ["suitcase", "bags"], ["clock", "8:30"]]),
            tryIt(pick("toeic-l3-l1-try", "Look at the graphic. Which shuttle will the woman probably take?", ["Shuttle B", "Shuttle A", "Shuttle C", "Shuttle D"], 0, "Terminal 2, 8:30 → Shuttle B.", { passageId: "toeic3-schedule" })),
          ],
        },
      ],
      checkpoint: [
        pick("toeic-l3-l1-c1", "Where does the conversation take place?", ["at a hotel", "at an airport", "on a bus", "at a travel agency"], 0, "Hotel front desk."),
        pick("toeic-l3-l1-c2", "Why does the man recommend the earlier shuttle?", ["Check-in and security take time.", "The later shuttle is full.", "It is cheaper.", "The airport is closed later."], 0, "Waktu check-in."),
        pick("toeic-l3-l1-c3", "What does the woman ask the man to do?", ["have her bags brought down", "call a taxi", "change her flight", "print her ticket"], 0, "Bags at eight."),
        pick("toeic-l3-l1-c4", "Why would Shuttle D NOT work for the woman?", ["It leaves at 11:45, too close to her noon flight.", "It goes to Terminal 1.", "It is cancelled.", "It is too early."], 0, "11:45 vs flight 12:00.", { passageId: "toeic3-schedule" }),
        trPick("toeic-l3-l1-c5", "“Waktunya terlalu mepet.” in English is…", ["The timing is too tight.", "The time is too narrow.", "Time too close is."], 0, "Tight = mepet."),
        pick("toeic-l3-l1-c6", "What does the woman mean when she says, “that's earlier than I'd like”?", ["She would prefer to leave later but accepts it.", "She refuses to take the shuttle.", "She has already missed it.", "She wants an even earlier one."], 0, "Implied meaning.", { hots: true }),
      ],
    },
    {
      id: "toeic-l3-l2",
      skill: "reading",
      title: "Part 5: Prepositions and Connectors",
      summary: "Time prepositions, despite/although, because/because of, however/therefore.",
      sections: [
        {
          title: "Key contrasts",
          blocks: [
            table(["Followed by a noun phrase", "Followed by a clause (subject + verb)", "Between sentences (with comma)"], [["despite / in spite of", "although / even though", "however / nevertheless"], ["because of / due to", "because / since", "therefore / as a result"], ["during", "while", "meanwhile"]]),
            table(["Preposition", "Meaning", "Example"], [["by", "no later than", "Submit it by 5 P.M."], ["until", "continuing up to", "The shop is open until 9."], ["within", "inside a period", "Reply within 24 hours."], ["since", "from a point in the past", "since 2019"], ["for", "a length of time", "for three years"]]),
            tip("Trik cepat: lihat **apa yang mengikuti** titik-titik. Ada subjek + kata kerja? → *although / because*. Hanya kata benda? → *despite / because of / due to*."),
          ],
        },
        {
          title: "Practice",
          blocks: [
            examples([{ wrong: "Although the delay, the meeting started.", right: "Despite the delay, the meeting started.", note: "The delay = noun phrase." }, { wrong: "Because of the train was late, I missed it.", right: "Because the train was late, I missed it.", note: "Diikuti klausa → because." }]),
            tryIt(pick("toeic-l3-l2-try", "The store will remain open ____ the renovation.", ["during", "while", "although", "since"], 0, "During + noun.")),
          ],
        },
      ],
      checkpoint: [
        pick("toeic-l3-l2-c1", "____ sales increased, profits fell because of higher costs.", ["Although", "Despite", "However", "Due to"], 0, "Diikuti klausa → although."),
        pick("toeic-l3-l2-c2", "The flight was cancelled ____ heavy fog.", ["due to", "because", "although", "therefore"], 0, "Due to + noun."),
        pick("toeic-l3-l2-c3", "Applicants will be notified ____ two weeks of the interview.", ["within", "since", "until", "among"], 0, "Within a period."),
        pick("toeic-l3-l2-c4", "The budget was reduced. ____, the project was delayed.", ["As a result", "Although", "Despite", "Because of"], 0, "Antar kalimat → As a result."),
        match("toeic-l3-l2-c5", "Match the connector and what follows it.", [["despite", "a noun phrase"], ["although", "a clause"], ["however,", "a new sentence"], ["by", "a deadline"]], "Pola penghubung."),
        pick("toeic-l3-l2-c6", "Which sentence is correct?", ["In spite of the rain, the outdoor event continued.", "In spite the rain, the event continued.", "In spite of it rained, the event continued.", "Although of the rain, the event continued."], 0, "In spite of + noun.", { hots: true }),
      ],
    },
    {
      id: "toeic-l3-l3",
      skill: "reading",
      title: "Part 6: Completing Letters",
      summary: "Grammar, vocabulary, connector and sentence-insertion questions in context.",
      passages: [LETTER],
      sections: [
        {
          title: "Read the whole text",
          blocks: [
            text("Soal Part 6 sering hanya bisa dijawab dengan **konteks paragraf**. Contoh: memilih tense yang tepat bergantung pada apakah kejadiannya sudah terjadi atau akan terjadi."),
            { type: "passage", passage: LETTER },
          ],
        },
        {
          title: "Sentence insertion",
          blocks: [
            table(["Look for", "Why"], [["pronouns (this, these, it)", "they refer to something just mentioned"], ["connectors (also, in addition)", "they add to the previous idea"], ["closing sentences", "Please do not hesitate to contact us… usually comes last"]]),
            tryIt(pick("toeic-l3-l3-try", "Choose the best option for blank (1).", ["Due to", "Although", "Therefore", "Unless"], 0, "Due to + the high demand.", { passageId: "toeic3-letter" })),
          ],
        },
      ],
      checkpoint: [
        pick("toeic-l3-l3-c1", "Choose the best option for blank (2).", ["to", "for", "so", "and"], 0, "To + verb = tujuan.", { passageId: "toeic3-letter" }),
        pick("toeic-l3-l3-c2", "Choose the best option for blank (3).", ["Alternatively", "Therefore", "Because", "Despite"], 0, "Alternatively = sebagai alternatif.", { passageId: "toeic3-letter" }),
        pick("toeic-l3-l3-c3", "Choose the best sentence for blank (4).", ["Please do not hesitate to contact us if you have any questions.", "Our chairs are made in Jepara.", "The warehouse was built in 1999.", "Mr Wibowo is a teacher."], 0, "Kalimat penutup surat.", { passageId: "toeic3-letter" }),
        pick("toeic-l3-l3-c4", "What is the main purpose of the letter?", ["to confirm an order and explain delivery", "to advertise a sale", "to apologize for a broken chair", "to request payment"], 0, "Konfirmasi pesanan.", { passageId: "toeic3-letter" }),
        trPick("toeic-l3-l3-c5", "“Jangan ragu untuk menghubungi kami.” in English is…", ["Please do not hesitate to contact us.", "Don't doubt to contact us.", "Please not hesitate contact us."], 0, "Frasa baku surat."),
        pick("toeic-l3-l3-c6", "What benefit does Mr Wibowo get if he collects the chairs?", ["a 5 percent discount", "faster production", "free chairs", "a longer warranty"], 0, "Inferensi dari blank (3).", { hots: true, passageId: "toeic3-letter" }),
      ],
    },
  ],
  quiz: {
    id: "toeic-l3-post",
    title: "Level 3 Mock Quiz",
    passPercent: 70,
    passages: [SCHEDULE],
    questions: [
      listen("toeic-l3-post1", say(["man", "Lina, did you book the meeting room for the client visit?"], ["woman", "I tried, but Room A is taken all day. Room C is free, though it's smaller."], ["man", "That's fine, there are only four of them."]), "Listen. What problem does the woman mention?", ["Room A is not available.", "The client cancelled.", "Room C is too expensive.", "The projector is broken."], 0, "Room A taken."),
      listen("toeic-l3-post2", say(["man", "Lina, did you book the meeting room for the client visit?"], ["woman", "I tried, but Room A is taken all day. Room C is free, though it's smaller."], ["man", "That's fine, there are only four of them."]), "Listen again. Why does the man say, “there are only four of them”?", ["to show that the smaller room is acceptable", "to complain about the clients", "to cancel the meeting", "to ask for more chairs"], 0, "Implied meaning: ruang kecil cukup.", { hots: true }),
      pick("toeic-l3-post3", "____ the manager's approval, we cannot place the order.", ["Without", "Although", "Unless", "Because"], 0, "Without + noun."),
      pick("toeic-l3-post4", "The office will be closed ____ Monday ____ Wednesday.", ["from / to", "since / for", "by / until", "at / on"], 0, "From … to …"),
      pick("toeic-l3-post5", "Please keep your receipt ____ you need to return the item.", ["in case", "despite", "due to", "during"], 0, "In case + klausa."),
      pick("toeic-l3-post6", "The report was excellent. ____, it was submitted two days late.", ["However", "Therefore", "Because", "Despite"], 0, "Kontras antar kalimat."),
      pick("toeic-l3-post7", "Look at the graphic. A guest has a domestic flight at 1 P.M. Which is the latest suitable shuttle?", ["Shuttle C", "Shuttle A", "Shuttle D", "Shuttle B"], 0, "Domestik = Terminal 1; terakhir 10:00 = C.", { passageId: "toeic3-schedule" }),
      trPick("toeic-l3-post8", "“Paling lambat hari Jumat” in English is…", ["by Friday", "until Friday", "since Friday"], 0, "By = deadline."),
      listen("toeic-l3-post9", say(["woman", "The new coffee machine is great, but it's been making a strange noise."], ["man", "I noticed that too. I'll call the supplier and ask them to send someone."]), "Listen. What will the man probably do next?", ["contact the supplier", "buy a new machine", "make coffee", "fix the machine himself"], 0, "I'll call the supplier."),
      pick("toeic-l3-post10", "Which strategy helps most in Part 3?", ["Read the three questions before the conversation starts.", "Close your eyes and listen only.", "Answer only the last question.", "Write notes of every word."], 0, "Antisipasi soal.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Connect It",
    questions: [
      live("toeic-l3-live1", "____ the rain, we went out.", ["Despite", "Although", "Because", "However"], 0, "rain"),
      live("toeic-l3-live2", "Submit it ____ Friday (deadline).", ["by", "until", "since", "for"], 0, "calendar"),
      live("toeic-l3-live3", "Questions per Part 3 talk:", ["3", "1", "4", "5"], 0, "chat"),
      live("toeic-l3-live4", "“Oleh karena itu” =", ["therefore", "although", "despite", "unless"], 0, "owl-think", true),
      live("toeic-l3-live5", "____ it was late, she stayed.", ["Although", "Despite", "Due to", "During"], 0, "clock"),
      live("toeic-l3-live6", "Reply ____ 24 hours.", ["within", "among", "since", "along"], 0, "envelope"),
      live("toeic-l3-live7", "Cancelled ____ fog.", ["due to", "because", "although", "while"], 0, "plane"),
      live("toeic-l3-live8", "Closing line:", ["Please do not hesitate to contact us.", "Bye now!", "That's it.", "No more."], 0, "card"),
    ],
  },
};

export const LEVEL4: Level = {
  id: "toeic-l4",
  title: "Level 4 — Upper-Intermediate (Target 750+)",
  description: "Understand Part 4 talks (announcements, voicemails, tours), read news articles and emails in Part 7 including sentence insertion, and build business collocations.",
  targetScore: "Target 750+",
  cover: ["microphone", "report", "target"],
  pretest: {
    id: "toeic-l4-pre",
    title: "Level 4 Pretest",
    passPercent: 0,
    questions: [
      listen("toeic-l4-pre1", voice("Attention, shoppers. The store will be closing in fifteen minutes. Please bring your final purchases to the registers.", "man"), "Listen. Where is the announcement being made?", ["in a store", "on a train", "at an airport", "in an office"], 0, "Shoppers, registers."),
      pick("toeic-l4-pre2", "The company plans to ____ a new product line next year.", ["launch", "make up", "take off", "put on"], 0, "Launch a product."),
      pick("toeic-l4-pre3", "In Part 7, “In which of the positions marked [1], [2], [3] and [4] does the following sentence best belong?” tests…", ["sentence insertion", "vocabulary", "pronunciation", "spelling"], 0, "Penyisipan kalimat."),
      trPick("toeic-l4-pre4", "“Memenuhi tenggat waktu” in English is…", ["meet a deadline", "fulfil a dateline", "reach the time"], 0, "Collocation."),
      pick("toeic-l4-pre5", "A voicemail usually ends with…", ["a request to call back", "a song", "a test question"], 0, "Call me back at…"),
    ],
  },
  lessons: [
    {
      id: "toeic-l4-l1",
      skill: "listening",
      title: "Part 4: Talks",
      summary: "Announcements, voicemails, tours, radio reports and introductions.",
      sections: [
        {
          title: "Types of talks",
          blocks: [
            table(["Talk type", "Typical content", "Common questions"], [["announcement", "delays, closures, changes", "Where is the speaker? What has changed?"], ["voicemail", "caller, reason, request", "Why is the speaker calling? What is the listener asked to do?"], ["tour / guide", "schedule, rules, places", "Where will listeners go next?"], ["introduction / speech", "speaker's background, event", "Who is the speaker introducing?"], ["radio / news", "traffic, weather, business news", "What is the report mainly about?"]]),
            tip("Di Part 4 hanya ada **satu pembicara**. Kalimat pertama hampir selalu memberi tahu **siapa** dan **di mana**. Kata kunci seperti *Attention passengers* atau *Hi, this is… calling from…* langsung memberi konteks."),
          ],
        },
        {
          title: "Practice: a voicemail",
          blocks: [
            audio("Voicemail", say(["woman", "Hi, this is Clara from Mega Event Organizer, calling for Mr Yusuf. I'm calling about the product launch on the twentieth. Unfortunately, the ballroom we booked has had a water leak, and it won't be ready in time. The good news is that the hotel has offered us their rooftop garden at no extra cost, and it can hold up to three hundred guests. Since you're expecting around two hundred and fifty, that should work well. Could you call me back by Thursday to confirm? My number is 0811 2233 445. Thanks."])),
            pics([["phone-call", "voicemail"], ["house", "venue"], ["flower", "rooftop garden"], ["calendar", "call back by Thursday"]]),
            tryIt(pick("toeic-l4-l1-try", "Why is the speaker calling?", ["to report a change of venue", "to cancel the launch", "to ask for payment", "to invite Mr Yusuf to a party"], 0, "Venue berubah.")),
          ],
        },
      ],
      checkpoint: [
        pick("toeic-l4-l1-c1", "What happened to the ballroom?", ["It had a water leak.", "It was double-booked.", "It was too small.", "It closed permanently."], 0, "Water leak."),
        pick("toeic-l4-l1-c2", "What does the hotel offer?", ["its rooftop garden at no extra cost", "a discount on rooms", "free meals", "a different date"], 0, "Rooftop garden, gratis."),
        pick("toeic-l4-l1-c3", "What is the listener asked to do?", ["call back by Thursday", "visit the hotel", "send an email", "pay a deposit"], 0, "Call back."),
        listen("toeic-l4-l1-c4", voice("Good morning, passengers. Due to signal problems, the 9:10 express to Bandung will depart from platform 6 instead of platform 2.", "man"), "Listen. What has changed?", ["the platform", "the destination", "the departure time", "the ticket price"], 0, "Platform 2 → 6."),
        trPick("toeic-l4-l1-c5", "“Tanpa biaya tambahan” in English is…", ["at no extra cost", "without more pay", "no adding price"], 0, "At no extra cost."),
        pick("toeic-l4-l1-c6", "Why does the speaker mention “around two hundred and fifty” guests?", ["to show the new space is large enough", "to complain about the number", "to ask for more guests", "to change the date"], 0, "250 < 300 → cukup.", { hots: true }),
      ],
    },
    {
      id: "toeic-l4-l2",
      skill: "reading",
      title: "Part 7: Articles and Sentence Insertion",
      summary: "Main idea, detail, vocabulary in context and where a sentence belongs.",
      passages: [ARTICLE],
      sections: [
        {
          title: "Read the article",
          blocks: [
            { type: "passage", passage: ARTICLE },
            table(["Question type", "Tip"], [["main idea", "headline area and first sentence"], ["vocabulary in context", "replace the word with each option and check meaning"], ["sentence insertion", "look for links: pronouns, numbers, topics"], ["NOT true", "eliminate three options found in the text"]]),
          ],
        },
        {
          title: "Practice",
          blocks: [
            tryIt(pick("toeic-l4-l2-try", "What is the article mainly about?", ["a company's plan to expand production", "the history of cassava", "a change of CEO", "a new snack shop"], 0, "Pabrik kedua.", { passageId: "toeic4-article" })),
            warn("Soal kosakata Part 7 menguji arti **dalam konteks**, bukan arti kamus yang paling umum. Contoh: *pending* di artikel ini berarti *menunggu*, bukan *tergantung* dalam arti fisik."),
          ],
        },
      ],
      checkpoint: [
        pick("toeic-l4-l2-c1", "Who is Melati Santoso?", ["the company's current CEO", "a founder", "an industry analyst", "a local official"], 0, "Founders' daughter, CEO.", { passageId: "toeic4-article" }),
        pick("toeic-l4-l2-c2", "How many jobs will the new factory create?", ["about 350", "about 4,000", "about 1,987", "about 8"], 0, "350 jobs.", { passageId: "toeic4-article" }),
        pick("toeic-l4-l2-c3", "The word “pending” in the article is closest in meaning to…", ["awaiting", "hanging", "refusing", "paying"], 0, "Pending approval = menunggu persetujuan.", { passageId: "toeic4-article" }),
        pick("toeic-l4-l2-c4", "In which of the positions marked [1], [2], [3] and [4] does the following sentence best belong? “These will include baked cassava crackers and seaweed snacks.”", ["[2]", "[1]", "[3]", "[4]"], 0, "These = low-salt products.", { passageId: "toeic4-article" }),
        trPick("toeic-l4-l2-c5", "“Kapasitas produksi” in English is…", ["production capacity", "product capable", "producing capacitor"], 0, "Production capacity."),
        pick("toeic-l4-l2-c6", "What is NOT stated about Bumi Rasa?", ["It plans to close its first factory.", "It was founded in 1987.", "Its chips are sold in over 4,000 stores.", "It will introduce low-salt products."], 0, "Tidak disebutkan menutup pabrik pertama.", { hots: true, passageId: "toeic4-article" }),
      ],
    },
    {
      id: "toeic-l4-l3",
      skill: "reading",
      title: "Business Collocations",
      summary: "Word partnerships that appear again and again in TOEIC.",
      sections: [
        {
          title: "Key collocations",
          blocks: [
            table(["Verb", "Collocates with"], [["meet", "a deadline, a target, requirements, demand"], ["place", "an order, an advertisement"], ["submit", "a report, an application, a proposal"], ["conduct", "a survey, an interview, research"], ["launch", "a product, a campaign, a website"], ["make", "a reservation, a payment, a decision"]]),
            vocab([["reimburse", "mengganti biaya", "money"], ["itinerary", "rencana perjalanan", "map"], ["merger", "penggabungan perusahaan", "meeting"], ["revenue", "pendapatan", "report"], ["inventory", "persediaan barang", "blocks"], ["vendor", "penjual/pemasok", "stall"]], "High-frequency TOEIC words"),
          ],
        },
        {
          title: "Practice",
          blocks: [
            examples([{ wrong: "We did a survey of 500 customers.", right: "We conducted a survey of 500 customers.", note: "Conduct a survey (lebih formal)." }, { wrong: "Please make your report by Monday.", right: "Please submit your report by Monday.", note: "Submit a report." }]),
            tryIt(pick("toeic-l4-l3-try", "The team worked overtime to ____ the deadline.", ["meet", "do", "reach out", "take"], 0, "Meet a deadline.")),
          ],
        },
      ],
      checkpoint: [
        pick("toeic-l4-l3-c1", "We need to ____ an order for more paper.", ["place", "do", "put up", "set"], 0, "Place an order."),
        pick("toeic-l4-l3-c2", "The HR department will ____ interviews next week.", ["conduct", "hold on", "make up", "lead up"], 0, "Conduct interviews."),
        pick("toeic-l4-l3-c3", "Employees will be ____ for travel expenses.", ["reimbursed", "refunded back", "repaid off", "returned"], 0, "Reimburse = mengganti biaya karyawan."),
        match("toeic-l4-l3-c4", "Match the verb and the noun.", [["launch", "a campaign"], ["submit", "a proposal"], ["make", "a reservation"], ["meet", "customer demand"]], "Kolokasi."),
        fill("toeic-l4-l3-c5", "Complete: The company's annual ____ rose to 2 trillion rupiah. (pendapatan)", "The company's annual", "rose to 2 trillion rupiah.", ["revenue"], "Revenue.", { translate: true }),
        pickMany("toeic-l4-l3-c6", "Choose ALL natural collocations.", ["conduct research", "place an advertisement", "make a payment", "do a decision"], [0, 1, 2], "Make a decision, bukan do.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "toeic-l4-post",
    title: "Level 4 Mock Quiz",
    passPercent: 70,
    passages: [ARTICLE],
    questions: [
      listen("toeic-l4-post1", voice("Welcome to the Batik Museum. Our tour will last about an hour. Please note that photography is not allowed in the second gallery, where some very old fabrics are displayed. After the tour, you're welcome to visit our gift shop on the ground floor."), "Listen. What are listeners asked NOT to do?", ["take photos in the second gallery", "visit the gift shop", "touch the walls", "talk during the tour"], 0, "Photography not allowed."),
      listen("toeic-l4-post2", voice("Welcome to the Batik Museum. Our tour will last about an hour. Please note that photography is not allowed in the second gallery, where some very old fabrics are displayed. After the tour, you're welcome to visit our gift shop on the ground floor."), "Listen again. Why is photography not allowed?", ["Some fabrics are very old.", "The gallery is dark.", "Photos are sold in the shop.", "It is a private event."], 0, "Melindungi kain tua.", { hots: true }),
      pick("toeic-l4-post3", "Our sales team easily ____ its target this quarter.", ["met", "did", "made up", "took"], 0, "Meet a target."),
      pick("toeic-l4-post4", "Please check the ____ for the times of all your flights.", ["itinerary", "inventory", "invoice", "revenue"], 0, "Itinerary = jadwal perjalanan."),
      pick("toeic-l4-post5", "When will construction of the new factory begin?", ["in October", "next spring", "on Tuesday", "in 1987"], 0, "Construction will begin in October.", { passageId: "toeic4-article" }),
      pick("toeic-l4-post6", "According to the article, why is Bumi Rasa expanding?", ["Demand has grown faster than expected.", "Its first factory is too old.", "It is moving to another city.", "The government asked it to."], 0, "Kutipan CEO.", { passageId: "toeic4-article" }),
      pick("toeic-l4-post7", "What does the article suggest about Indonesia's packaged snack sector?", ["It has grown steadily for several years.", "It is shrinking.", "It is controlled by one company.", "It only sells cassava chips."], 0, "8% per tahun.", { passageId: "toeic4-article" }),
      trPick("toeic-l4-post8", "“Melakukan survei” (formal) in English is…", ["conduct a survey", "do survey on", "make surveying"], 0, "Conduct a survey."),
      pick("toeic-l4-post9", "In which of the positions marked [1], [2], [3] and [4] does the following sentence best belong? “Most of these positions will be filled by local residents.”", ["[1]", "[2]", "[3]", "[4]"], 0, "These positions = 350 jobs.", { hots: true, passageId: "toeic4-article" }),
      listen("toeic-l4-post10", voice("Hi Mr Lim, this is Rudi from the IT department. I've finished setting up your new laptop. You can pick it up from my desk on the fourth floor any time after two."), "Listen. What should the listener do?", ["collect a laptop after 2 o'clock", "call Rudi back", "go to the IT shop", "send his old laptop"], 0, "Pick it up after two."),
    ],
  },
  live: {
    title: "Live Quiz — Word Partners",
    questions: [
      live("toeic-l4-live1", "____ a deadline", ["meet", "do", "take", "go"], 0, "calendar"),
      live("toeic-l4-live2", "____ an order", ["place", "set", "put on", "lay"], 0, "cart"),
      live("toeic-l4-live3", "____ a survey", ["conduct", "drive", "lead out", "do up"], 0, "report"),
      live("toeic-l4-live4", "“Pendapatan” =", ["revenue", "revenge", "review", "reverse"], 0, "money", true),
      live("toeic-l4-live5", "Part 4 speakers:", ["one", "two", "three", "four"], 0, "microphone"),
      live("toeic-l4-live6", "Travel plan:", ["itinerary", "inventory", "invoice", "interview"], 0, "map"),
      live("toeic-l4-live7", "Pay back expenses:", ["reimburse", "rebuild", "reboot", "rebrand"], 0, "receipt"),
      live("toeic-l4-live8", "____ a product", ["launch", "lunch", "lift", "lend"], 0, "target"),
    ],
  },
};
