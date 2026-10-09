import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { audio, examples, fill, listen, live, match, pick, pics, say, table, text, tip, trPick, tryIt, vocab, voice, warn } from "../kit";

// TOEIC Listening & Reading — Level 1: Foundations (target 400+) · Level 2: Building Up (target 550+)
// Original practice material written in the style of TOEIC L&R tasks.

const NOTICE: Passage = {
  id: "toeic1-notice",
  title: "Notice to all tenants",
  pic: "office",
  lines: [
    "NOTICE TO ALL TENANTS — Graha Mitra Office Tower",
    "Please be advised that the elevators on the east side of the building will be closed for maintenance from Monday, 6 May, to Wednesday, 8 May.",
    "During this period, tenants are asked to use the west elevators or the main staircase.",
    "The loading dock will remain open, but deliveries should be scheduled before 10 A.M. to avoid congestion.",
    "We apologize for any inconvenience. For questions, please contact the building management office on the ground floor or call extension 100.",
  ],
};

const AD: Passage = {
  id: "toeic2-ad",
  title: "Advertisement",
  pic: "laptop",
  lines: [
    "TechFix Solutions — Fast, Reliable Computer Repair",
    "Is your laptop running slowly? Has your screen cracked? Our certified technicians can help.",
    "We repair all major brands, usually within 48 hours.",
    "Business customers who sign a one-year service contract receive free pickup and delivery.",
    "This month only: bring this advertisement to any of our three locations and receive 15 percent off any screen replacement.",
    "Open Monday to Saturday, 9 A.M. to 7 P.M. Visit www.techfix.example for locations.",
  ],
};

const MEMO: Passage = {
  id: "toeic2-memo",
  title: "Memo with blanks (Part 6 style)",
  pic: "envelope",
  lines: [
    "To: All sales staff",
    "From: Ratna Dewi, Sales Director",
    "Subject: New expense system",
    "Starting next month, all travel expenses must be submitted ____ (1) our new online system, ExpensePro.",
    "Paper forms will no longer be ____ (2).",
    "Training sessions will be held on 3 and 4 June in Meeting Room B. ____ (3)",
    "If you have any questions, please contact Agus in the finance department, who is ____ (4) the transition.",
  ],
};

export const LEVEL1: Level = {
  id: "toeic-l1",
  title: "Level 1 — Foundations (Target 400+)",
  description: "Understand the TOEIC Listening & Reading test, describe photographs (Part 1), recognise parts of speech for Part 5, and read short notices (Part 7).",
  targetScore: "Target 400+",
  cover: ["report", "headset", "office"],
  pretest: {
    id: "toeic-l1-pre",
    title: "Level 1 Pretest",
    passPercent: 0,
    questions: [
      pick("toeic-l1-pre1", "How many questions are there in the TOEIC Listening & Reading test?", ["200", "100", "120", "150"], 0, "100 Listening + 100 Reading."),
      pick("toeic-l1-pre2", "The total TOEIC L&R score ranges from…", ["10 to 990", "0 to 9", "310 to 677", "0 to 120"], 0, "Skor 10–990 (masing-masing bagian 5–495)."),
      pick("toeic-l1-pre3", "The company hired a new ____ last week.", ["manager", "manage", "managed", "managerial"], 0, "Setelah artikel a/the perlu noun."),
      trPick("toeic-l1-pre4", "“Pemberitahuan” in a building notice is…", ["notice", "notes", "noting"], 0, "Notice."),
      listen("toeic-l1-pre5", voice("A woman is typing on a laptop."), "Listen. Which picture matches the statement?", ["pic:laptop|someone using a laptop", "pic:bus|a bus at a stop", "pic:chef|a chef cooking"], 0, "Typing on a laptop."),
    ],
  },
  lessons: [
    {
      id: "toeic-l1-l1",
      skill: "listening",
      title: "The Test and Part 1: Photographs",
      summary: "The seven parts of TOEIC L&R and strategies for describing photos.",
      sections: [
        {
          title: "Test overview",
          blocks: [
            table(["Section", "Part", "Task", "Questions"], [["Listening (≈45 min)", "1", "Photographs", "6"], ["", "2", "Question–Response", "25"], ["", "3", "Conversations", "39"], ["", "4", "Talks", "30"], ["Reading (75 min)", "5", "Incomplete Sentences", "30"], ["", "6", "Text Completion", "16"], ["", "7", "Reading Comprehension (single and multiple passages)", "54"]]),
            text("TOEIC L&R mengukur bahasa Inggris **di dunia kerja dan kehidupan sehari-hari**. Skor Listening dan Reading masing-masing 5–495, total **10–990**. Tidak ada pengurangan nilai untuk jawaban salah, jadi **jangan biarkan soal kosong**."),
          ],
        },
        {
          title: "Part 1 strategies",
          blocks: [
            table(["Focus", "Example statement"], [["action (present continuous)", "A man is pushing a cart."], ["position (preposition)", "Some chairs are stacked against the wall."], ["state (passive)", "The tables have been set for a meal."], ["no people", "Some boxes are piled on the floor."]]),
            warn("Jebakan Part 1: **kata yang terdengar mirip** (*copy* vs *coffee*), **benda yang ada di foto tetapi aksinya salah**, dan *is being* (sedang dikerjakan) vs *has been* (sudah selesai)."),
            pics([["cart", "pushing a cart"], ["laptop", "typing"], ["meeting", "having a meeting"], ["bus", "boarding a bus"]], "Typical Part 1 photo scenes"),
            tryIt(pick("toeic-l1-l1-try", "A photo shows plates and glasses already arranged on a table, with no people. Which statement fits?", ["The table has been set.", "A waiter is setting the table.", "People are eating dinner."], 0, "Tidak ada orang → bentuk pasif selesai (has been).", { image: "bowl" })),
          ],
        },
      ],
      checkpoint: [
        pick("toeic-l1-l1-c1", "Look at the picture. Which statement best describes it?", ["A man is riding a bicycle.", "A man is repairing a bicycle.", "A bicycle is being sold."], 0, "Aksi: riding.", { image: "bicycle" }),
        pick("toeic-l1-l1-c2", "Look at the picture. Which statement best describes it?", ["Some people are sitting around a table.", "Some people are leaving the office.", "A table is being carried."], 0, "Rapat: duduk mengelilingi meja.", { image: "meeting" }),
        listen("toeic-l1-l1-c3", voice("Some boxes have been loaded onto a cart.", "man"), "Listen. Which picture matches the statement?", ["pic:cart|a loaded cart", "pic:ship|a ship at sea", "pic:library|a library"], 0, "Cart dengan muatan."),
        pick("toeic-l1-l1-c4", "How many parts does the TOEIC Listening section have?", ["4", "3", "7"], 0, "Part 1–4."),
        trPick("toeic-l1-l1-c5", "“Kursi-kursi ditumpuk di dekat dinding.” in English is…", ["Some chairs are stacked against the wall.", "Some chairs is stacking on the wall.", "Chairs stack near wall."], 0, "Stacked against."),
        pick("toeic-l1-l1-c6", "The photo shows an empty road with a parked car. Which statement is a TRAP?", ["A car is being driven down the road.", "A car is parked by the road.", "The road is empty."], 0, "Is being driven = sedang dikendarai → tidak cocok.", { hots: true, image: "car" }),
      ],
    },
    {
      id: "toeic-l1-l2",
      skill: "reading",
      title: "Part 5: Parts of Speech",
      summary: "Choosing nouns, verbs, adjectives and adverbs from word families.",
      sections: [
        {
          title: "Word families",
          blocks: [
            table(["Noun", "Verb", "Adjective", "Adverb"], [["success", "succeed", "successful", "successfully"], ["decision", "decide", "decisive", "decisively"], ["efficiency", "—", "efficient", "efficiently"], ["profit", "profit", "profitable", "profitably"], ["expansion", "expand", "expansive", "—"]]),
            table(["Clue", "Needed word", "Example"], [["after a/an/the/my/our", "noun", "the ____ of the project → completion"], ["before a noun", "adjective", "a ____ plan → detailed"], ["after be/become/seem", "adjective", "The results were ____ → impressive"], ["modifying a verb", "adverb", "She worked ____ → efficiently"]]),
            tip("Part 5 cepat: lihat **pilihan jawaban** dulu. Jika semuanya dari keluarga kata yang sama (*success / succeed / successful…*), ini soal **jenis kata** — cukup lihat kata sebelum dan sesudah titik-titik."),
          ],
        },
        {
          title: "Practice",
          blocks: [
            examples([{ wrong: "The team completed the project success.", right: "The team completed the project successfully.", note: "Memodifikasi kata kerja → adverb." }, { wrong: "We need a decide by Friday.", right: "We need a decision by Friday.", note: "Setelah artikel a → noun." }]),
            tryIt(pick("toeic-l1-l2-try", "Ms Kurnia gave a very ____ presentation to the board.", ["informative", "inform", "information", "informatively"], 0, "Sebelum noun presentation → adjective.")),
          ],
        },
      ],
      checkpoint: [
        pick("toeic-l1-l2-c1", "The new software has improved our ____ significantly.", ["efficiency", "efficient", "efficiently", "efficiencies of"], 0, "Setelah our → noun."),
        pick("toeic-l1-l2-c2", "All employees must complete the form ____.", ["carefully", "careful", "care", "carefulness"], 0, "Memodifikasi complete → adverb."),
        pick("toeic-l1-l2-c3", "The quarterly results were very ____.", ["encouraging", "encourage", "encouragement", "encouragingly"], 0, "Setelah were very → adjective."),
        match("toeic-l1-l2-c4", "Match the word and its part of speech.", [["decision", "noun"], ["decide", "verb"], ["decisive", "adjective"], ["decisively", "adverb"]], "Keluarga kata."),
        fill("toeic-l1-l2-c5", "Complete with the noun form of “expand”: The ____ of the factory will create 200 jobs.", "The", "of the factory will create 200 jobs.", ["expansion"], "Expand → expansion."),
        pick("toeic-l1-l2-c6", "Which clue tells you the blank needs an adjective? “Our team uses a ____ approach.”", ["It is between “a” and a noun.", "It is at the end of the sentence.", "It follows a verb."], 0, "Artikel + ___ + noun → adjective.", { hots: true }),
      ],
    },
    {
      id: "toeic-l1-l3",
      skill: "reading",
      title: "Part 7: Short Notices",
      summary: "Finding purpose, details and inferences in short workplace texts.",
      passages: [NOTICE],
      sections: [
        {
          title: "Question types",
          blocks: [
            table(["Type", "Typical question", "How to answer"], [["purpose", "What is the purpose of the notice?", "read the first one or two sentences"], ["detail", "When will the elevators reopen?", "scan for dates, names, numbers"], ["inference", "What is suggested about…?", "combine information; avoid extreme answers"], ["NOT question", "What is NOT mentioned?", "check each option against the text"]]),
            vocab([["tenant", "penyewa", "office"], ["maintenance", "perawatan", "technician"], ["loading dock", "area bongkar muat", "cart"], ["extension", "nomor sambungan telepon", "phone-call"], ["congestion", "kepadatan/kemacetan", "traffic"]], "Notice vocabulary"),
          ],
        },
        {
          title: "Read and answer",
          blocks: [
            { type: "passage", passage: NOTICE },
            tryIt(pick("toeic-l1-l3-try", "What is the purpose of the notice?", ["to announce a temporary elevator closure", "to introduce a new tenant", "to advertise office space", "to change the building's opening hours"], 0, "Kalimat kedua: lift ditutup sementara.", { passageId: "toeic1-notice" })),
          ],
        },
      ],
      checkpoint: [
        pick("toeic-l1-l3-c1", "How long will the east elevators be closed?", ["three days", "one day", "one week", "two weeks"], 0, "Senin–Rabu = 3 hari.", { passageId: "toeic1-notice" }),
        pick("toeic-l1-l3-c2", "What are tenants asked to do?", ["use the west elevators or the stairs", "work from home", "avoid the building", "use the loading dock"], 0, "West elevators or staircase.", { passageId: "toeic1-notice" }),
        pick("toeic-l1-l3-c3", "When should deliveries be scheduled?", ["before 10 A.M.", "after 10 A.M.", "on Wednesday only", "at noon"], 0, "Before 10 A.M.", { passageId: "toeic1-notice" }),
        pick("toeic-l1-l3-c4", "Where is the building management office?", ["on the ground floor", "on the east side", "next to the loading dock", "on the top floor"], 0, "Ground floor.", { passageId: "toeic1-notice" }),
        trPick("toeic-l1-l3-c5", "“Mohon maaf atas ketidaknyamanannya.” as written in the notice is…", ["We apologize for any inconvenience.", "Sorry for not comfortable.", "We are apology for inconvenient."], 0, "Frasa baku pemberitahuan."),
        pick("toeic-l1-l3-c6", "What is suggested about the building?", ["It has elevators on more than one side.", "It is closing permanently.", "It has no stairs.", "It is under construction."], 0, "Ada east dan west elevators → inferensi.", { hots: true, passageId: "toeic1-notice" }),
      ],
    },
  ],
  quiz: {
    id: "toeic-l1-post",
    title: "Level 1 Mock Quiz",
    passPercent: 70,
    passages: [NOTICE],
    questions: [
      pick("toeic-l1-post1", "Look at the picture. Which statement best describes it?", ["A woman is talking on the phone.", "A woman is fixing a phone.", "Some phones are on display."], 0, "Aksi: talking on the phone.", { image: "phone-call" }),
      listen("toeic-l1-post2", voice("The shelves have been stocked with books."), "Listen. Which picture matches the statement?", ["pic:library|full bookshelves", "pic:beach|a beach", "pic:bus|a bus"], 0, "Rak penuh buku."),
      pick("toeic-l1-post3", "The manager asked us to work more ____ on the next project.", ["closely", "close", "closeness", "closed"], 0, "Memodifikasi work → adverb."),
      pick("toeic-l1-post4", "We received several ____ from customers about the delay.", ["complaints", "complain", "complained", "complaining"], 0, "Setelah several → plural noun."),
      pick("toeic-l1-post5", "The hotel is ____ located near the airport.", ["conveniently", "convenient", "convenience", "convene"], 0, "Memodifikasi located → adverb."),
      pick("toeic-l1-post6", "What can tenants do if they have questions?", ["call extension 100", "send an email to the elevator company", "speak to a delivery driver", "visit the west elevators"], 0, "Call extension 100.", { passageId: "toeic1-notice" }),
      pick("toeic-l1-post7", "What will remain open during the maintenance?", ["the loading dock", "the east elevators", "the parking garage", "the cafeteria"], 0, "Loading dock remains open.", { passageId: "toeic1-notice" }),
      trPick("toeic-l1-post8", "“Perawatan” (of machines or buildings) in English is…", ["maintenance", "maintain", "maintaining"], 0, "Noun: maintenance."),
      pick("toeic-l1-post9", "Why are deliveries asked to arrive before 10 A.M.?", ["More people will use the west elevators and stairs later, causing congestion.", "The loading dock closes at 10.", "Drivers prefer the morning.", "It is a new law."], 0, "Inferensi: menghindari kepadatan.", { hots: true, passageId: "toeic1-notice" }),
      pick("toeic-l1-post10", "A photo shows a man standing next to a car with its hood open. Which statement is most accurate?", ["The hood of a car has been opened.", "A man is driving a car.", "A car is being washed.", "A man is getting into a taxi."], 0, "Hindari aksi yang tidak terlihat.", { hots: true, image: "car" }),
    ],
  },
  live: {
    title: "Live Quiz — TOEIC Warm-up",
    questions: [
      live("toeic-l1-live1", "TOEIC L&R max score:", ["990", "677", "120", "9"], 0, "trophy"),
      live("toeic-l1-live2", "Part 1 is about…", ["photographs", "emails", "talks", "grammar"], 0, "camera"),
      live("toeic-l1-live3", "After “the” you need a…", ["noun", "verb", "adverb", "conjunction"], 0, "open-book"),
      live("toeic-l1-live4", "“Penyewa” (of an office) =", ["tenant", "tennis", "tenure", "tender"], 0, "office", true),
      live("toeic-l1-live5", "She spoke ____.", ["clearly", "clear", "clarity", "clearing"], 0, "microphone"),
      live("toeic-l1-live6", "Listening questions:", ["100", "200", "50", "75"], 0, "headset"),
      live("toeic-l1-live7", "Reading time:", ["75 minutes", "45 minutes", "60 minutes", "120 minutes"], 0, "clock"),
      live("toeic-l1-live8", "Wrong answers…", ["don't lose points", "lose 1 point", "lose 2 points", "end the test"], 0, "target"),
    ],
  },
};

export const LEVEL2: Level = {
  id: "toeic-l2",
  title: "Level 2 — Building Up (Target 550+)",
  description: "Master Part 2 question–response, verb forms and tenses for Part 5, an introduction to Part 6 text completion, and adverts in Part 7.",
  targetScore: "Target 550+",
  cover: ["headset", "chat", "envelope"],
  pretest: {
    id: "toeic-l2-pre",
    title: "Level 2 Pretest",
    passPercent: 0,
    questions: [
      listen("toeic-l2-pre1", voice("Where is the staff meeting being held?", "man"), "Listen. Choose the best response.", ["In Conference Room C.", "At three o'clock.", "Yes, it was held."], 0, "Where → tempat."),
      pick("toeic-l2-pre2", "The report ____ by the end of the day tomorrow.", ["will be finished", "finished", "has finished", "finishing"], 0, "Future passive."),
      pick("toeic-l2-pre3", "How many answer options are there in TOEIC Part 2?", ["three", "four", "two", "five"], 0, "Part 2: A, B, C."),
      trPick("toeic-l2-pre4", "“Uang muka” in a business context is…", ["a deposit", "a face money", "a front payment"], 0, "Deposit."),
      pick("toeic-l2-pre5", "Mr Tan ____ for this company since 2015.", ["has worked", "works", "is working", "worked"], 0, "Since → present perfect."),
    ],
  },
  lessons: [
    {
      id: "toeic-l2-l1",
      skill: "listening",
      title: "Part 2: Question–Response",
      summary: "WH-questions, yes/no questions, requests, statements and indirect answers.",
      sections: [
        {
          title: "Question types",
          blocks: [
            table(["Question", "Expected answer"], [["Where…?", "a place: In the storage room."], ["When…?", "a time: Not until Friday."], ["Who…?", "a person/department: The HR manager."], ["Why…?", "a reason: Because the flight was delayed."], ["Could you…? / Would you mind…?", "Sure, I'll do it now. / Not at all."], ["Statement", "a reaction: Oh, I'll call them back."]]),
            warn("Jebakan Part 2: **kata yang diulang** dari pertanyaan, **kata yang bunyinya mirip** (*meeting / meat*), dan menjawab **Yes/No untuk WH-question**. Jawaban yang benar sering **tidak langsung**, misalnya: *Where's the report?* → *Ms Lee is still reviewing it.*"),
          ],
        },
        {
          title: "Practice",
          blocks: [
            audio("Part 2 examples", say(["man", "When will the new printer be delivered?"], ["woman", "Not until next week, I'm afraid."], ["man", "Who's in charge of the budget report?"], ["woman", "Nina from accounting."], ["man", "Why don't we take a short break?"], ["woman", "Good idea, I need a coffee."])),
            pics([["question", "listen to the first word"], ["headset", "three options"], ["owl-think", "indirect answers"], ["target", "eliminate traps"]]),
            tryIt(listen("toeic-l2-l1-try", voice("Who's going to pick up the clients from the airport?", "man"), "Listen. Choose the best response.", ["I think Dimas volunteered.", "At terminal two.", "The airport is busy."], 0, "Who → orang (bisa tidak langsung).")),
          ],
        },
      ],
      checkpoint: [
        listen("toeic-l2-l1-c1", voice("Why was the shipment late?"), "Listen. Choose the best response.", ["There was a problem at the port.", "Yes, it was very late.", "By ship."], 0, "Why → alasan."),
        listen("toeic-l2-l1-c2", voice("Would you mind closing the window?", "man"), "Listen. Choose the best response.", ["Not at all.", "Yes, it's a window.", "It closed yesterday."], 0, "Would you mind → Not at all (= tidak keberatan)."),
        listen("toeic-l2-l1-c3", voice("The projector in Room 5 isn't working."), "Listen. Choose the best response.", ["I'll call the technician.", "A new project.", "Room 5 is on the left of Room 6."], 0, "Pernyataan → reaksi/solusi."),
        listen("toeic-l2-l1-c4", voice("Should we order lunch or go out?", "man"), "Listen. Choose the best response.", ["Let's eat out today.", "Yes, we should.", "At noon."], 0, "Pertanyaan pilihan → pilih salah satu."),
        trPick("toeic-l2-l1-c5", "“Baru minggu depan.” (as an answer to “When…?”) in English is…", ["Not until next week.", "Only next week no.", "Until not week next."], 0, "Not until."),
        listen("toeic-l2-l1-c6", voice("Where can I find the updated price list?"), "Listen. Choose the best response.", ["Mr Rahman hasn't finished it yet.", "Yes, it's updated.", "It's a good price."], 0, "Jawaban tidak langsung tapi logis.", { hots: true }),
      ],
    },
    {
      id: "toeic-l2-l2",
      skill: "reading",
      title: "Part 5–6: Verb Forms and Tenses",
      summary: "Tense clues, subject–verb agreement and active vs passive.",
      passages: [MEMO],
      sections: [
        {
          title: "Verb clues",
          blocks: [
            table(["Clue", "Tense / form", "Example"], [["since / for / already / yet", "present perfect", "We have already sent the invoice."], ["yesterday / last month / ago", "past simple", "The order arrived two days ago."], ["next week / by + future time", "will / future passive", "The office will be renovated next year."], ["subject receives the action", "passive (be + V3)", "The packages were delivered."], ["singular subject", "verb + s", "The list of names is attached."]]),
            tip("Untuk subjek panjang seperti *The list of names*, cari **inti subjek** (*list* = tunggal) sehingga kata kerjanya *is*, bukan *are*."),
          ],
        },
        {
          title: "Part 6 introduction",
          blocks: [
            text("Part 6 berisi **4 teks** dengan **4 soal** masing-masing. Ada soal tata bahasa, kosakata, kata penghubung, dan satu soal **menyisipkan kalimat** utuh. Baca kalimat **sebelum dan sesudah** titik-titik."),
            { type: "passage", passage: MEMO },
            tryIt(pick("toeic-l2-l2-try", "Choose the best option for blank (1).", ["through", "between", "about", "during"], 0, "Submitted through a system = melalui sistem.", { passageId: "toeic2-memo" })),
          ],
        },
      ],
      checkpoint: [
        pick("toeic-l2-l2-c1", "Choose the best option for blank (2).", ["accepted", "accepting", "accept", "acceptance"], 0, "Will no longer be + V3 (passive).", { passageId: "toeic2-memo" }),
        pick("toeic-l2-l2-c2", "Choose the best sentence for blank (3).", ["All sales staff are required to attend one session.", "The meeting room has a large window.", "Sales increased last quarter.", "Agus was born in Bandung."], 0, "Kalimat terkait pelatihan.", { passageId: "toeic2-memo" }),
        pick("toeic-l2-l2-c3", "Choose the best option for blank (4).", ["overseeing", "oversee", "oversaw", "oversight"], 0, "Who is + V-ing.", { passageId: "toeic2-memo" }),
        pick("toeic-l2-l2-c4", "The list of approved suppliers ____ on the shared drive.", ["is", "are", "were", "be"], 0, "Inti subjek: list (tunggal)."),
        pick("toeic-l2-l2-c5", "The new branch ____ last March.", ["opened", "has opened", "opens", "will open"], 0, "Last March → past simple."),
        pick("toeic-l2-l2-c6", "Why is the passive “will no longer be accepted” better than an active verb here?", ["The focus is on the forms, not on who accepts them.", "Passive is always more polite.", "There is no subject in English."], 0, "Fokus pada objek.", { hots: true }),
      ],
    },
    {
      id: "toeic-l2-l3",
      skill: "reading",
      title: "Part 7: Advertisements",
      summary: "Understanding offers, conditions and target customers.",
      passages: [AD],
      sections: [
        {
          title: "Reading adverts",
          blocks: [
            table(["What to look for", "Example"], [["product / service", "computer repair"], ["target customer", "Business customers who…"], ["special offers and conditions", "15 percent off… bring this advertisement"], ["time limits", "This month only"], ["contact / locations", "www…, three locations"]]),
            vocab([["certified", "bersertifikat", "card"], ["service contract", "kontrak layanan", "report"], ["pickup", "penjemputan barang", "cart"], ["replacement", "penggantian", "laptop"]], "Advert vocabulary"),
          ],
        },
        {
          title: "Read and answer",
          blocks: [
            { type: "passage", passage: AD },
            tryIt(pick("toeic-l2-l3-try", "What kind of business is TechFix?", ["a computer repair service", "a computer manufacturer", "a delivery company", "a software developer"], 0, "Computer repair.", { passageId: "toeic2-ad" })),
          ],
        },
      ],
      checkpoint: [
        pick("toeic-l2-l3-c1", "How long do most repairs take?", ["up to 48 hours", "one week", "one hour", "15 days"], 0, "Usually within 48 hours.", { passageId: "toeic2-ad" }),
        pick("toeic-l2-l3-c2", "Who can receive free pickup and delivery?", ["business customers with a one-year contract", "all customers", "customers who bring the advert", "students"], 0, "Syarat: kontrak 1 tahun.", { passageId: "toeic2-ad" }),
        pick("toeic-l2-l3-c3", "How can a customer get 15 percent off?", ["by bringing the advertisement for a screen replacement", "by ordering online", "by signing a contract", "by visiting on Sunday"], 0, "Bawa iklan + ganti layar.", { passageId: "toeic2-ad" }),
        pick("toeic-l2-l3-c4", "What is NOT mentioned in the advertisement?", ["repair prices", "opening hours", "number of locations", "repair time"], 0, "Harga tidak disebut.", { passageId: "toeic2-ad" }),
        trPick("toeic-l2-l3-c5", "“Hanya bulan ini” in English is…", ["This month only", "Only this mouth", "In month only this"], 0, "This month only."),
        pick("toeic-l2-l3-c6", "What is implied about TechFix?", ["It is closed on Sundays.", "It only repairs one brand.", "It has a single shop.", "It offers free repairs."], 0, "Buka Senin–Sabtu → Minggu tutup.", { hots: true, passageId: "toeic2-ad" }),
      ],
    },
  ],
  quiz: {
    id: "toeic-l2-post",
    title: "Level 2 Mock Quiz",
    passPercent: 70,
    passages: [AD],
    questions: [
      listen("toeic-l2-post1", voice("When does the conference start?", "man"), "Listen. Choose the best response.", ["The schedule hasn't been confirmed.", "In the main hall.", "Yes, it does."], 0, "Jawaban tidak langsung yang logis."),
      listen("toeic-l2-post2", voice("Could you send me the contract by noon?"), "Listen. Choose the best response.", ["Sure, I'll email it right away.", "It was a long contract.", "At noon yesterday."], 0, "Permintaan → setuju."),
      listen("toeic-l2-post3", voice("Haven't you met our new director?", "man"), "Listen. Choose the best response.", ["Not yet, but I'd like to.", "The director's office.", "Yes, she directs."], 0, "Negative question → jawab sesuai fakta."),
      pick("toeic-l2-post4", "The invoices ____ to the client yesterday.", ["were sent", "sent", "have sent", "are sending"], 0, "Yesterday + passive past."),
      pick("toeic-l2-post5", "Ms Ayu ____ in the marketing department for six years.", ["has worked", "works", "is working", "work"], 0, "For six years → present perfect."),
      pick("toeic-l2-post6", "Each of the candidates ____ an interview next week.", ["will have", "have", "having", "are having"], 0, "Each … → tunggal + next week."),
      pick("toeic-l2-post7", "On which day is TechFix open?", ["Saturday", "Sunday", "every day", "weekdays only"], 0, "Monday–Saturday.", { passageId: "toeic2-ad" }),
      trPick("toeic-l2-post8", "“Kontrak layanan” in English is…", ["service contract", "serving contract", "contract service of"], 0, "Service contract."),
      pick("toeic-l2-post9", "A company with 20 laptops wants regular repairs without carrying them to a shop. What should it do?", ["sign a one-year service contract", "bring the advertisement", "buy new laptops", "visit on Sunday"], 0, "Free pickup and delivery.", { hots: true, passageId: "toeic2-ad" }),
      listen("toeic-l2-post10", voice("I can't find my security badge anywhere."), "Listen. Choose the best response.", ["Did you check the front desk?", "Security is important.", "Anywhere is fine."], 0, "Pernyataan masalah → saran.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Quick Responses",
    questions: [
      live("toeic-l2-live1", "“Where…?” answer:", ["In the lobby.", "At 5 p.m.", "Because of rain.", "Yes, I did."], 0, "map"),
      live("toeic-l2-live2", "“Why…?” answer:", ["Because the bus was late.", "In Room 3.", "Mr Tan.", "Tomorrow."], 0, "question"),
      live("toeic-l2-live3", "Since 2020 → tense:", ["present perfect", "past simple", "future", "present continuous"], 0, "calendar"),
      live("toeic-l2-live4", "“Diantar/dikirim” (passive past) =", ["was delivered", "delivered was", "is deliver", "delivering"], 0, "cart", true),
      live("toeic-l2-live5", "Part 2 options:", ["3", "4", "2", "5"], 0, "headset"),
      live("toeic-l2-live6", "The list of names ____ ready.", ["is", "are", "were", "be"], 0, "report"),
      live("toeic-l2-live7", "Would you mind…? →", ["Not at all.", "Yes, mind.", "I minded.", "Mind it."], 0, "chat"),
      live("toeic-l2-live8", "Part 6 texts:", ["4", "6", "2", "10"], 0, "envelope"),
    ],
  },
};
