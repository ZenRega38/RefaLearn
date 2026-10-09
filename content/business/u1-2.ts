import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, sequence, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Business English — Unit 1: The Workplace and Networking · Unit 2: Emails and Messages

const EMAIL_REQUEST: Passage = {
  id: "biz-email-request",
  title: "Email: Request for a product demo",
  pic: "envelope",
  lines: [
    "Subject: Request for a product demo next week",
    "Dear Ms Halim,",
    "I hope this email finds you well.",
    "My name is Andi Saputra, and I am the operations manager at Nusantara Logistics in Surabaya.",
    "We are currently looking for a warehouse management system for our three new distribution centres.",
    "A colleague recommended your company's software, and I would be interested in seeing a demonstration.",
    "Would it be possible to arrange an online demo next Tuesday or Wednesday afternoon?",
    "It would also be helpful if you could send a price list for companies with 50–100 users before the meeting.",
    "Thank you in advance for your help. I look forward to hearing from you.",
    "Best regards,",
    "Andi Saputra",
    "Operations Manager, Nusantara Logistics",
  ],
};

export const U1: Level = {
  id: "biz-u1",
  title: "Unit 1 — The Workplace and Networking",
  description: "Describe your job, your company and your responsibilities, make professional introductions and network confidently at events.",
  targetScore: "Speaking · Vocabulary",
  cover: ["office", "meeting", "laptop"],
  pretest: {
    id: "biz-u1-pre",
    title: "Unit 1 Pretest",
    passPercent: 0,
    questions: [
      pick("biz-u1-pre1", "Which sentence describes a job responsibility?", ["I'm responsible for managing the sales team.", "I'm responsible to the weekend.", "I responsible sales."], 0, "Responsible for + V-ing."),
      listen("biz-u1-pre2", voice("Our head office is in Jakarta, and we have branches in Medan and Makassar."), "Where is the company's main office?", ["Jakarta", "Medan", "Makassar", "Bandung"], 0, "Head office = kantor pusat."),
      trPick("biz-u1-pre3", "“Saya bekerja di bagian keuangan.” in English is…", ["I work in the finance department.", "I work on finance part.", "I am working at finance side."], 0, "Work in the … department."),
      pick("biz-u1-pre4", "At a networking event, a good opening question is…", ["What brings you to this event?", "How much do you earn?", "Why are you here alone?"], 0, "Pembuka yang sopan."),
      pick("biz-u1-pre5", "A “colleague” is…", ["someone you work with", "your boss's boss", "a customer", "a competitor"], 0, "Rekan kerja."),
    ],
  },
  lessons: [
    {
      id: "biz-u1-l1",
      skill: "speaking",
      title: "Jobs and Responsibilities",
      summary: "Talking about your role, your tasks and how your company is organised.",
      sections: [
        {
          title: "Talking about your job",
          blocks: [
            table(["Pattern", "Example"], [["I work for + company", "I work for Bank Mandiri."], ["I work in + department/field", "I work in marketing."], ["I'm in charge of + noun", "I'm in charge of social media."], ["I'm responsible for + V-ing", "I'm responsible for training new staff."], ["I report to + person", "I report to the regional manager."]]),
            vocab([["department", "divisi/bagian", "office"], ["branch", "kantor cabang", "map"], ["head office", "kantor pusat", "office"], ["deadline", "tenggat waktu", "calendar"], ["client", "klien", "customer"], ["supervisor", "atasan langsung", "staff"]], "Workplace words"),
            warn("Hati-hati: **work for** + perusahaan, **work in** + bidang/divisi, **work at** + tempat. *I work in Telkom* kurang tepat; gunakan *I work for Telkom*."),
          ],
        },
        {
          title: "Listen: a new colleague",
          blocks: [
            audio("Meeting a new colleague", say(["woman", "Hi, you must be the new analyst. I'm Fitri, from the HR department."], ["man", "Nice to meet you, Fitri. Yes, I'm Gilang. I've just joined the finance team."], ["woman", "Welcome! Who do you report to?"], ["man", "To Pak Hendra, the finance manager. I'm mainly responsible for preparing the monthly reports."], ["woman", "Great. If you need anything about payroll or leave, just let me know."])),
            pics([["office", "head office"], ["report", "monthly report"], ["staff", "HR"], ["money", "finance"]]),
            tryIt(pick("biz-u1-l1-try", "Which department has Gilang joined?", ["finance", "HR", "marketing"], 0, "Finance team.")),
          ],
        },
      ],
      checkpoint: [
        pick("biz-u1-l1-c1", "What is Gilang mainly responsible for?", ["preparing the monthly reports", "payroll", "hiring new staff"], 0, "Monthly reports."),
        pick("biz-u1-l1-c2", "Who does Gilang report to?", ["the finance manager", "Fitri", "the CEO"], 0, "Pak Hendra."),
        fill("biz-u1-l1-c3", "Complete: I'm responsible ___ managing client accounts.", "I'm responsible", "managing client accounts.", ["for"], "Responsible for."),
        match("biz-u1-l1-c4", "Match the beginning and the end.", [["I work for", "a tech start-up."], ["I work in", "the legal department."], ["I'm in charge of", "the annual budget."], ["I report to", "the general manager."]], "Pola kalimat pekerjaan."),
        trPick("biz-u1-l1-c5", "“Saya baru saja bergabung dengan tim pemasaran.” in English is…", ["I've just joined the marketing team.", "I just join marketing team now.", "I have just joining the team marketing."], 0, "Present perfect + just."),
        pick("biz-u1-l1-c6", "Which introduction sounds most professional in a first meeting with a client?", ["I'm Rina, the account manager for your project. I'll be your main contact.", "I'm Rina. I do stuff here.", "Hi, Rina. Bye."], 0, "Peran + fungsi bagi klien.", { hots: true }),
      ],
    },
    {
      id: "biz-u1-l2",
      skill: "speaking",
      title: "Describing Your Company",
      summary: "Company size, products, history and performance.",
      sections: [
        {
          title: "Company language",
          blocks: [
            table(["Topic", "Useful language"], [["what it does", "We produce… / We provide… / We specialise in…"], ["size", "We employ about 300 people. / We have 12 branches."], ["history", "The company was founded in 2009."], ["market", "Our main customers are… / We export to…"], ["performance", "Sales have grown by 20% this year."]]),
            text("Saat memperkenalkan perusahaan, gunakan **present simple** untuk fakta tetap, **past simple** untuk sejarah (*was founded*), dan **present perfect** untuk perkembangan sampai sekarang (*have grown*)."),
          ],
        },
        {
          title: "Model and practice",
          blocks: [
            audio("A company profile", say(["man", "Kopi Rakyat was founded in 2015 in Bandung. We specialise in single-origin Indonesian coffee, and we now employ around 120 people. We supply cafés across Java and have recently started exporting to Malaysia and Singapore. Over the past two years, our online sales have doubled."])),
            speaking({
              id: "biz-u1-l2-say",
              title: "Present a company",
              prompt: "Introduce your company (or a company you know well) in about one minute: what it does, when it was founded, its size, its main customers, and one recent development.",
              image: "office",
              seconds: 75,
              tips: ["… was founded in …", "We specialise in … / We provide …", "We employ around … people.", "Recently, we have …"],
              models: [{ label: "Model", text: "I work for Sehat Farma, a pharmaceutical distributor that was founded in 2004 in Semarang. We provide medicines and medical equipment to hospitals and pharmacies in Central Java. We employ about 450 people and have six warehouses. Our main customers are private hospitals. Recently, we have launched an online ordering system, which has cut delivery times by almost a day." }],
              rubric: ["I explained what the company does.", "I used past simple for history and present perfect for recent changes.", "I gave facts with numbers.", "I spoke clearly for about one minute."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("biz-u1-l2-c1", "When was Kopi Rakyat founded?", ["2015", "2005", "2019"], 0, "Founded in 2015."),
        pick("biz-u1-l2-c2", "What has happened to their online sales?", ["They have doubled.", "They have fallen.", "They have stayed the same."], 0, "Doubled = naik dua kali lipat."),
        fill("biz-u1-l2-c3", "Complete: The company ___ founded in 1998.", "The company", "founded in 1998.", ["was"], "Passive: was founded."),
        pickMany("biz-u1-l2-c4", "Choose ALL correct sentences.", ["We specialise in eco-friendly packaging.", "We employ about 80 people.", "Our sales have grown by 15% this year.", "We are founded in 2010."], [0, 1, 2], "Founded harus past: was founded."),
        trPick("biz-u1-l2-c5", "“Kami mengekspor ke Jepang.” in English is…", ["We export to Japan.", "We are export to Japan.", "We exporting Japan."], 0, "Export to."),
        pick("biz-u1-l2-c6", "Why use present perfect in “Sales have grown by 20% this year”?", ["The period (this year) is not finished and the result matters now.", "It happened long ago.", "It's a future plan."], 0, "Periode belum selesai.", { hots: true }),
      ],
    },
    {
      id: "biz-u1-l3",
      skill: "listening",
      title: "Networking Events",
      summary: "Starting conversations, exchanging contacts and following up.",
      sections: [
        {
          title: "Networking phrases",
          blocks: [
            table(["Stage", "Phrases"], [["opening", "Hi, I don't think we've met. I'm… / Is this your first time at this conference?"], ["keeping it going", "What line of work are you in? / How did you get into that?"], ["finding a link", "Oh, we're also looking into… / You should talk to my colleague…"], ["exchanging contacts", "Shall we connect on LinkedIn? / Here's my card."], ["leaving politely", "It was great talking to you. I'll let you get back to the event."]]),
            repeat(["Hi, I don't think we've met.", "What line of work are you in?", "Shall we connect on LinkedIn?", "It was great talking to you."]),
          ],
        },
        {
          title: "Listen: at a conference",
          blocks: [
            audio("Coffee break at a conference", say(["woman", "Hi, I don't think we've met. I'm Sinta, from GreenBuild Consulting."], ["man", "Nice to meet you, Sinta. I'm Rudi. I run a small solar panel installation company in Bali."], ["woman", "Oh, interesting! We actually advise hotels on reducing energy costs. Many of them ask about solar."], ["man", "Really? Then we should definitely stay in touch. Here's my card."], ["woman", "Thanks. I'll send you an email next week with a couple of hotel projects we're working on."], ["man", "Perfect. It was great talking to you."])),
            pics([["meeting", "conference"], ["coffee", "coffee break"], ["card", "business card"], ["laptop", "follow-up email"]]),
            tryIt(pick("biz-u1-l3-try", "What does Rudi's company do?", ["install solar panels", "build hotels", "sell coffee"], 0, "Solar panel installation.")),
          ],
        },
      ],
      checkpoint: [
        pick("biz-u1-l3-c1", "Why are Sinta and Rudi interested in each other's work?", ["Her hotel clients want solar energy.", "They went to the same school.", "They are competitors."], 0, "Ada peluang kerja sama."),
        pick("biz-u1-l3-c2", "What will Sinta do next week?", ["send an email about hotel projects", "visit Bali", "call Rudi's boss"], 0, "Follow-up email."),
        sequence("biz-u1-l3-c3", "Put the networking conversation in order.", ["Hi, I don't think we've met.", "What line of work are you in?", "Shall we connect on LinkedIn?", "It was great talking to you."], "Buka → gali → tukar kontak → pamit."),
        arrange("biz-u1-l3-c4", "Put the words in order.", "What line of work are you in", "Bertanya pekerjaan."),
        trPick("biz-u1-l3-c5", "“Mari tetap berhubungan.” in English is…", ["Let's stay in touch.", "Let's keep relation.", "Let's always connect us."], 0, "Stay in touch."),
        pick("biz-u1-l3-c6", "What makes a networking contact most likely to become useful later?", ["following up soon with something specific", "never contacting them again", "sending a sales offer immediately to everyone"], 0, "Follow-up spesifik.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "biz-u1-post",
    title: "Unit 1 Review Quiz",
    passPercent: 70,
    questions: [
      pick("biz-u1-post1", "Which is correct?", ["I work for a bank.", "I work on a bank.", "I work to a bank."], 0, "Work for + perusahaan."),
      listen("biz-u1-post2", voice("I'm in charge of a team of eight engineers.", "man"), "What is the speaker's role?", ["He manages engineers.", "He is a new engineer.", "He hires engineers."], 0, "In charge of = memimpin."),
      fill("biz-u1-post3", "Complete: I report ___ the marketing director.", "I report", "the marketing director.", ["to"], "Report to."),
      trPick("biz-u1-post4", "“Kantor pusat” in English is…", ["head office", "centre room", "main building house"], 0, "Head office."),
      pick("biz-u1-post5", "“We specialise in…” is followed by…", ["what the company focuses on", "the company's age", "the CEO's name"], 0, "Spesialisasi."),
      arrange("biz-u1-post6", "Put the words in order.", "The company was founded in 2012", "Passive past."),
      listen("biz-u1-post7", say(["woman", "So, how did you get into marketing?"], ["man", "Actually, I studied engineering, but I found I loved working with customers."]), "What did the man study?", ["engineering", "marketing", "business"], 0, "Studied engineering."),
      pick("biz-u1-post8", "A polite way to end a networking chat:", ["It was great talking to you. I'll let you get back to the event.", "I'm bored now.", "Bye, I'm going."], 0, "Pamit sopan."),
      pick("biz-u1-post9", "A start-up has 12 staff and sales grew 300% last year. Which description is most accurate?", ["a small but fast-growing company", "a large, stable corporation", "a company in decline"], 0, "Menyimpulkan dari data.", { hots: true }),
      pick("biz-u1-post10", "Why is “I'm responsible for…” better than “I do…” in a job interview?", ["It sounds more professional and shows ownership.", "It's shorter.", "It's more casual."], 0, "Register profesional.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Office Life",
    questions: [
      live("biz-u1-live1", "Someone you work with:", ["colleague", "college", "collage", "collect"], 0, "staff"),
      live("biz-u1-live2", "I'm responsible ___ sales.", ["for", "to", "of", "in"], 0, "report"),
      live("biz-u1-live3", "Main office:", ["head office", "top office", "big office", "first office"], 0, "office"),
      live("biz-u1-live4", "“Tenggat waktu” =", ["deadline", "headline", "timeline", "lifeline"], 0, "calendar", true),
      live("biz-u1-live5", "Started (company):", ["was founded", "was found", "was finding", "founded was"], 0, "flag"),
      live("biz-u1-live6", "Exchange contacts:", ["Here's my card.", "Here's my bill.", "Here's my menu.", "Here's my ticket."], 0, "card"),
      live("biz-u1-live7", "I work ___ the IT department.", ["in", "for", "to", "on"], 0, "laptop"),
      live("biz-u1-live8", "Keep contact:", ["stay in touch", "stay in talk", "keep in hand", "stay on call"], 0, "chat"),
    ],
  },
};

export const U2: Level = {
  id: "biz-u2",
  title: "Unit 2 — Emails and Messages",
  description: "Write clear professional emails: structure, tone, requests, replies, follow-ups and short chat messages to colleagues.",
  targetScore: "Writing · Reading",
  cover: ["envelope", "laptop", "chat"],
  pretest: {
    id: "biz-u2-pre",
    title: "Unit 2 Pretest",
    passPercent: 0,
    questions: [
      pick("biz-u2-pre1", "Which greeting is best for a formal email to someone whose name you know?", ["Dear Mr Wijaya,", "Hey Wijaya!!", "Yo,"], 0, "Formal: Dear + title + surname."),
      pick("biz-u2-pre2", "“Please find attached…” means…", ["a file is included with the email", "please look for something", "the meeting is cancelled"], 0, "Lampiran."),
      trPick("biz-u2-pre3", "“Saya menantikan balasan Anda.” in English is…", ["I look forward to hearing from you.", "I wait your reply forward.", "I look forward to hear you."], 0, "Look forward to + V-ing."),
      pick("biz-u2-pre4", "Which subject line is clearest?", ["Invoice #2045 — payment due 15 March", "Hello", "Important!!!"], 0, "Spesifik."),
      pick("biz-u2-pre5", "Which is the most polite request?", ["Could you send me the report by Friday?", "Send the report.", "Report Friday."], 0, "Could you…?"),
    ],
  },
  lessons: [
    {
      id: "biz-u2-l1",
      skill: "reading",
      title: "Email Structure and Tone",
      summary: "Subject lines, greetings, openings, the main message and closings.",
      passages: [EMAIL_REQUEST],
      sections: [
        {
          title: "The parts of an email",
          blocks: [
            table(["Part", "Formal", "Neutral / friendly"], [["greeting", "Dear Ms Halim,", "Hi Dina,"], ["opening", "I am writing to enquire about…", "Just a quick note about…"], ["request", "I would be grateful if you could…", "Could you…?"], ["attachment", "Please find attached…", "I've attached…"], ["closing line", "I look forward to hearing from you.", "Speak soon. / Thanks!"], ["sign-off", "Kind regards, / Best regards,", "Best, / Cheers,"]]),
            tip("Aturan praktis: cocokkan **tingkat formalitas** dengan pembaca. Klien baru atau atasan tinggi → formal. Rekan satu tim → netral. Jangan campur *Dear Sir* dengan *Cheers!*"),
          ],
        },
        {
          title: "Read a request email",
          blocks: [
            { type: "passage", passage: EMAIL_REQUEST },
            tryIt(pick("biz-u2-l1-try", "What is the main purpose of the email?", ["to request a product demo", "to complain about software", "to apply for a job"], 0, "Meminta demo produk.", { passageId: "biz-email-request" })),
          ],
        },
      ],
      checkpoint: [
        pick("biz-u2-l1-c1", "How did Andi hear about the company?", ["A colleague recommended it.", "He saw an advert.", "He used it before."], 0, "Rekomendasi kolega.", { passageId: "biz-email-request" }),
        pick("biz-u2-l1-c2", "What does Andi ask for before the meeting?", ["a price list", "a contract", "a free trial"], 0, "Price list.", { passageId: "biz-email-request" }),
        pick("biz-u2-l1-c3", "When does Andi want the demo?", ["next Tuesday or Wednesday afternoon", "next Monday morning", "this Friday"], 0, "Selasa/Rabu siang.", { passageId: "biz-email-request" }),
        match("biz-u2-l1-c4", "Match the formal and the friendly versions.", [["I am writing to enquire about…", "Just a quick question about…"], ["Please find attached…", "I've attached…"], ["I look forward to hearing from you.", "Speak soon!"], ["Kind regards,", "Cheers,"]], "Formal vs santai."),
        trPick("biz-u2-l1-c5", "“Saya akan sangat berterima kasih jika Anda dapat…” in English is…", ["I would be grateful if you could…", "I will very thank if you can…", "I am grateful if you could to…"], 0, "Permintaan formal."),
        pick("biz-u2-l1-c6", "Why does Andi mention the number of users (50–100)?", ["so the supplier can send the correct pricing", "to show his company is big", "it is not important"], 0, "Detail relevan untuk harga.", { hots: true, passageId: "biz-email-request" }),
      ],
    },
    {
      id: "biz-u2-l2",
      skill: "writing",
      title: "Requests, Replies and Follow-ups",
      summary: "Asking for things, responding helpfully and chasing politely when there is no reply.",
      sections: [
        {
          title: "Useful language",
          blocks: [
            table(["Purpose", "Phrases"], [["replying", "Thank you for your email. / Thanks for getting back to me."], ["giving information", "I'm happy to confirm that… / Unfortunately, …"], ["following up", "I'm just following up on my email from last Monday."], ["chasing a deadline", "Could you let me know when we can expect…?"], ["apologising for delay", "Apologies for the late reply."]]),
            examples([{ wrong: "Why haven't you answered my email??", right: "I'm just following up on my email of 3 May. Could you let me know if you need more information?", note: "Follow-up yang sopan dan jelas." }, { wrong: "I want the file now.", right: "Would it be possible to send the file by 4 p.m. today?", note: "Permintaan dengan tenggat yang jelas." }]),
          ],
        },
        {
          title: "Write a reply",
          blocks: [
            text("Struktur balasan yang baik: **1) ucapan terima kasih**, **2) jawaban inti**, **3) detail/lampiran**, **4) langkah berikutnya**, **5) penutup**."),
            writing({
              id: "biz-u2-l2-write",
              title: "Reply to Andi",
              prompt: "You are Ms Halim. Reply to Andi Saputra's email (from the reading lesson). Thank him, offer a demo on Wednesday at 2 p.m. (online), attach the price list, ask how many warehouses will use the system, and close politely. Write 100–150 words.",
              image: "envelope",
              minWords: 100,
              maxWords: 150,
              tips: ["Thank you for your interest in …", "I'd be happy to arrange …", "Please find attached …", "Could you let me know …?", "I look forward to speaking with you."],
              models: [{ label: "Model", text: "Subject: RE: Request for a product demo next week\n\nDear Mr Saputra,\n\nThank you for your email and for your interest in our warehouse management system.\n\nI would be happy to arrange an online demonstration on Wednesday at 2 p.m. I will send you a calendar invitation with the video link shortly.\n\nPlease find attached our price list for companies with 50–100 users. It also includes the cost of training and technical support.\n\nTo help us prepare the demo, could you let me know how many warehouses will use the system at first, and which features are most important to your team?\n\nI look forward to speaking with you on Wednesday.\n\nKind regards,\nDewi Halim\nSales Manager" }],
              rubric: ["I used a correct formal greeting and sign-off.", "I answered every point in the task.", "I used polite request and attachment phrases.", "My email has clear paragraphs and 100–150 words."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("biz-u2-l2-c1", "Which phrase follows up politely?", ["I'm just following up on my previous email.", "Answer me now.", "Did you forget me?"], 0, "Follow up."),
        fill("biz-u2-l2-c2", "Complete: Apologies for the ___ reply.", "Apologies for the", "reply.", ["late", "delayed"], "Late/delayed reply."),
        sequence("biz-u2-l2-c3", "Put the parts of a reply in order.", ["Thank you for your email.", "I'm happy to confirm the meeting on Friday.", "Please find attached the agenda.", "I look forward to seeing you."], "Terima kasih → inti → lampiran → penutup."),
        pickMany("biz-u2-l2-c4", "Choose ALL phrases suitable for a formal email.", ["I would be grateful if you could…", "Please find attached…", "I look forward to hearing from you.", "Gimme a call."], [0, 1, 2], "Register formal."),
        trPick("biz-u2-l2-c5", "“Terima kasih sudah membalas.” in English is…", ["Thanks for getting back to me.", "Thanks for returning me.", "Thank for back to me."], 0, "Get back to someone."),
        pick("biz-u2-l2-c6", "A supplier hasn't replied for a week and your deadline is close. Best email?", ["Following up on my email of 2 June: could you confirm the delivery date by Thursday, as our launch is on Monday?", "Hello?? Anyone there??", "I'll find another supplier. Bye."], 0, "Sopan + tenggat + alasan.", { hots: true }),
      ],
    },
    {
      id: "biz-u2-l3",
      skill: "writing",
      title: "Chat Messages and Short Updates",
      summary: "Writing clear workplace chat messages, status updates and out-of-office replies.",
      sections: [
        {
          title: "Workplace chat",
          blocks: [
            table(["Situation", "Clear message"], [["status update", "Quick update: the client approved the design. Printing starts Monday."], ["asking for help", "Hi Bima, do you have 10 minutes today to check my slides?"], ["running late", "Running 10 mins late, traffic on Jl. Sudirman. Please start without me."], ["confirming", "Noted, thanks! I'll send it by 3."], ["out of office", "I'm on leave until 12 May. For urgent matters, please contact Sari."]]),
            vocab([["ASAP", "secepatnya (as soon as possible)", "clock"], ["FYI", "sebagai informasi (for your information)", "envelope"], ["EOD", "akhir hari kerja (end of day)", "evening"], ["noted", "dicatat/dimengerti", "thumbs-up"], ["on leave", "sedang cuti", "beach"]], "Workplace abbreviations"),
            warn("Singkatan seperti **ASAP** atau **FYI** wajar di chat internal, tetapi hindari di email ke klien baru. *ASAP* juga bisa terdengar menuntut; lebih baik sebutkan waktu spesifik: *by 3 p.m.*"),
          ],
        },
        {
          title: "Listen and write",
          blocks: [
            audio("A voice note from your manager", say(["woman", "Hi, it's Maya. Quick favour: the client meeting moved from Thursday to Wednesday at ten. Could you update the team chat and ask Rizal to bring the samples? Also, please book the small meeting room. Thanks!"])),
            pics([["chat", "team chat"], ["calendar", "Wednesday"], ["meeting", "meeting room"], ["bag", "samples"]]),
            writing({
              id: "biz-u2-l3-write",
              title: "Team chat update",
              prompt: "Write the team chat message Maya asked for. Include the new day and time, the request to Rizal, and the room booking. Keep it short and clear (30–60 words).",
              image: "chat",
              minWords: 30,
              maxWords: 60,
              tips: ["Quick update: …", "@Rizal, could you …?", "I've booked …", "Let me know if …"],
              models: [{ label: "Model", text: "Hi team! Quick update: the client meeting has moved from Thursday to Wednesday at 10 a.m. I've booked the small meeting room on the 3rd floor. @Rizal, could you bring the product samples? Let me know if anyone can't make the new time. Thanks!" }],
              rubric: ["I gave the new day and time.", "I made the request to Rizal clearly.", "I mentioned the room booking.", "My message was short, friendly and clear."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("biz-u2-l3-c1", "What is the new day of the client meeting?", ["Wednesday", "Thursday", "Tuesday"], 0, "Moved to Wednesday."),
        pick("biz-u2-l3-c2", "What should Rizal bring?", ["the samples", "the contract", "the laptop"], 0, "Samples."),
        match("biz-u2-l3-c3", "Match the abbreviation and its meaning.", [["ASAP", "as soon as possible"], ["FYI", "for your information"], ["EOD", "end of day"], ["OOO", "out of office"]], "Singkatan kantor."),
        pick("biz-u2-l3-c4", "Which is the clearest status update?", ["Update: invoice sent to PT Maju at 2 p.m. Waiting for payment confirmation.", "Did stuff.", "Some things happened today, maybe."], 0, "Spesifik."),
        trPick("biz-u2-l3-c5", "“Saya sedang cuti sampai Senin.” in English is…", ["I'm on leave until Monday.", "I'm on holiday leave to Monday.", "I leave until Monday."], 0, "On leave."),
        pick("biz-u2-l3-c6", "Why is “by 3 p.m.” often better than “ASAP” in a request?", ["It gives a clear deadline and sounds less demanding.", "It's longer.", "ASAP is grammatically wrong."], 0, "Jelas dan sopan.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "biz-u2-post",
    title: "Unit 2 Review Quiz",
    passPercent: 70,
    passages: [EMAIL_REQUEST],
    questions: [
      pick("biz-u2-post1", "Which sign-off is formal?", ["Kind regards,", "Cheers,", "Later!"], 0, "Kind regards."),
      pick("biz-u2-post2", "In the email, what is Andi's job?", ["operations manager", "sales manager", "software engineer"], 0, "Operations Manager.", { passageId: "biz-email-request" }),
      fill("biz-u2-post3", "Complete: Please find ___ the signed contract.", "Please find", "the signed contract.", ["attached"], "Please find attached."),
      trPick("biz-u2-post4", "“Sebagai informasi” (in a chat) is often written…", ["FYI", "ASAP", "EOD"], 0, "FYI = for your information."),
      pick("biz-u2-post5", "“I look forward to ___ from you.”", ["hearing", "hear", "heard"], 0, "Look forward to + V-ing."),
      arrange("biz-u2-post6", "Put the words in order.", "I am writing to enquire about your services", "Pembuka email formal."),
      listen("biz-u2-post7", voice("Could you send me the updated figures by end of day?"), "When does the speaker need the figures?", ["by the end of today", "next week", "tomorrow morning"], 0, "End of day."),
      pick("biz-u2-post8", "Which subject line is best for a follow-up?", ["Follow-up: quotation for 200 office chairs", "Hi again", "???"], 0, "Spesifik."),
      pick("biz-u2-post9", "Andi asks for the price list “before the meeting”. Why?", ["to discuss costs during the demo", "to cancel the meeting", "to send it to a competitor"], 0, "Persiapan.", { hots: true, passageId: "biz-email-request" }),
      pick("biz-u2-post10", "You must decline a client's request. Which opening is best?", ["Thank you for your request. Unfortunately, we are unable to…, but we could…", "No, we can't.", "That's impossible, sorry not sorry."], 0, "Menolak + alternatif.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Inbox Zero",
    questions: [
      live("biz-u2-live1", "File included:", ["Please find attached", "Please find attachment", "Please look attached", "Find please attach"], 0, "envelope"),
      live("biz-u2-live2", "Formal greeting:", ["Dear Ms Rahma,", "Hey Rahma!", "Yo Rahma,", "Rahma!!"], 0, "laptop"),
      live("biz-u2-live3", "As soon as possible:", ["ASAP", "FYI", "EOD", "OOO"], 0, "clock"),
      live("biz-u2-live4", "“Sedang cuti” =", ["on leave", "on leaving", "in leave", "at leave"], 0, "beach", true),
      live("biz-u2-live5", "Chasing a reply:", ["I'm just following up…", "Why no answer?", "Hello??", "Reply now."], 0, "chat"),
      live("biz-u2-live6", "I look forward to ___ you.", ["meeting", "meet", "met", "meets"], 0, "meeting"),
      live("biz-u2-live7", "Formal sign-off:", ["Kind regards,", "Cheers,", "XOXO,", "Later,"], 0, "envelope"),
      live("biz-u2-live8", "Short “I understand”:", ["Noted, thanks!", "Noting, thank.", "Note it.", "Notes!"], 0, "thumbs-up"),
    ],
  },
};
