import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, sequence, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Business English — Unit 5: Negotiation and Customer Service · Unit 6: Job Applications and Interviews

const JOB_AD: Passage = {
  id: "biz-job-ad",
  title: "Job advertisement: Customer Success Executive",
  pic: "laptop",
  lines: [
    "Lintas Digital is a fast-growing software company based in Yogyakarta, serving over 2,000 small businesses across Indonesia.",
    "We are looking for a Customer Success Executive to join our friendly team.",
    "You will help new clients set up our accounting app, answer questions by phone, chat and email, and run online training sessions.",
    "You will also collect customer feedback and share it with our product team.",
    "Requirements: a diploma or degree in any field; at least one year of experience in customer service or sales; good spoken and written English.",
    "Experience with accounting software is an advantage but not essential.",
    "We offer a competitive salary, health insurance, flexible working hours and two days of remote work per week.",
    "To apply, send your CV and a cover letter to careers@lintasdigital.example by 30 November.",
  ],
};

export const U5: Level = {
  id: "biz-u5",
  title: "Unit 5 — Negotiation and Customer Service",
  description: "Make offers and counter-offers, bargain politely, reach agreements, and handle customer complaints professionally by phone and email.",
  targetScore: "Speaking · Listening",
  cover: ["customer", "headset", "money"],
  pretest: {
    id: "biz-u5-pre",
    title: "Unit 5 Pretest",
    passPercent: 0,
    questions: [
      pick("biz-u5-pre1", "“If you order 500 units, we can offer a 10% discount.” This is…", ["a conditional offer", "a complaint", "an apology"], 0, "Penawaran bersyarat."),
      listen("biz-u5-pre2", voice("I'm afraid that's a little higher than our budget."), "What does the speaker mean?", ["The price is too high.", "The price is perfect.", "The product is too small."], 0, "Menolak harga dengan sopan."),
      trPick("biz-u5-pre3", "“Kami mohon maaf atas ketidaknyamanannya.” in English is…", ["We apologise for the inconvenience.", "We sorry for not comfortable.", "We are apologise the inconvenient."], 0, "Permintaan maaf formal."),
      pick("biz-u5-pre4", "An angry customer calls. What should you do FIRST?", ["Listen and acknowledge the problem.", "Tell them they're wrong.", "Put them on hold for 20 minutes."], 0, "Dengarkan dulu."),
      pick("biz-u5-pre5", "A “win-win” agreement is one where…", ["both sides benefit", "one side loses everything", "nobody agrees"], 0, "Saling menguntungkan."),
    ],
  },
  lessons: [
    {
      id: "biz-u5-l1",
      skill: "speaking",
      title: "Offers and Counter-offers",
      summary: "Stating your position, making conditional offers and bargaining politely.",
      sections: [
        {
          title: "Negotiation language",
          blocks: [
            table(["Function", "Phrases"], [["stating a position", "We're looking for a price of around… / Our main priority is…"], ["conditional offer", "If you can…, we could… / We'd be willing to… provided that…"], ["rejecting politely", "I'm afraid that's not quite what we had in mind."], ["counter-offer", "How about meeting in the middle at…? / Could you go a little lower?"], ["agreeing", "I think we can work with that. / It's a deal."]]),
            tip("Kalimat **conditional** (*If you…, we could…*) adalah alat utama negosiasi: Anda memberi sesuatu **hanya jika** pihak lain juga memberi sesuatu."),
            vocab([["discount", "potongan harga", "receipt"], ["bulk order", "pesanan dalam jumlah besar", "blocks"], ["delivery", "pengiriman", "cart"], ["terms", "syarat/ketentuan", "report"], ["compromise", "kompromi", "thumbs-up"]], "Negotiation words"),
          ],
        },
        {
          title: "Listen: a supplier negotiation",
          blocks: [
            audio("Negotiating with a supplier", say(["man", "We'd like to order 300 rattan chairs. What's your best price?"], ["woman", "Our standard price is 850,000 rupiah per chair."], ["man", "I'm afraid that's a little above our budget. Could you go a little lower for a bulk order?"], ["woman", "If you order 500 chairs, we could reduce it to 780,000."], ["man", "500 is too many for us right now. How about 300 chairs at 800,000, and we pay 50% in advance?"], ["woman", "Provided that the advance payment arrives this week, I think we can work with that."], ["man", "Great, it's a deal."])),
            pics([["chair", "rattan chairs"], ["money", "price"], ["receipt", "advance payment"], ["thumbs-up", "deal"]]),
            tryIt(pick("biz-u5-l1-try", "What is the supplier's standard price?", ["850,000 per chair", "800,000 per chair", "780,000 per chair"], 0, "Harga standar.")),
          ],
        },
      ],
      checkpoint: [
        pick("biz-u5-l1-c1", "What is the final agreed price?", ["800,000 per chair", "780,000 per chair", "850,000 per chair"], 0, "Kesepakatan: 800.000."),
        pick("biz-u5-l1-c2", "What does the buyer offer in exchange for the lower price?", ["50% advance payment", "ordering 500 chairs", "free delivery"], 0, "Bayar 50% di muka."),
        pick("biz-u5-l1-c3", "What is the supplier's condition?", ["The advance payment must arrive this week.", "The buyer must order 500.", "The buyer must collect the chairs."], 0, "Provided that…"),
        match("biz-u5-l1-c4", "Match the function and the phrase.", [["rejecting politely", "I'm afraid that's not quite what we had in mind."], ["counter-offer", "How about meeting in the middle?"], ["conditional offer", "If you…, we could…"], ["closing", "It's a deal."]], "Fungsi negosiasi."),
        trPick("biz-u5-l1-c5", "“Bagaimana kalau kita bertemu di tengah?” (harga) in English is…", ["How about meeting in the middle?", "How about we meet at center?", "What if middle meeting?"], 0, "Kompromi."),
        pick("biz-u5-l1-c6", "Why did the buyer's counter-offer work?", ["It gave the supplier something valuable (early payment) in return.", "He shouted.", "He accepted the first price."], 0, "Saling memberi.", { hots: true }),
      ],
    },
    {
      id: "biz-u5-l2",
      skill: "listening",
      title: "Handling Complaints",
      summary: "The LAST method: Listen, Apologise, Solve, Thank.",
      sections: [
        {
          title: "The LAST method",
          blocks: [
            table(["Step", "What to do", "Example"], [["Listen", "let the customer explain; ask questions", "Could you tell me exactly what happened?"], ["Apologise", "show empathy, without blaming", "I'm really sorry about this. I understand how frustrating it must be."], ["Solve", "offer a clear solution and timeline", "I'll send a replacement today; it will arrive by Thursday."], ["Thank", "thank them for telling you", "Thank you for letting us know."]]),
            warn("Jangan menyalahkan pelanggan (*You must have done it wrong*) atau rekan kerja (*That's the warehouse's fault*). Fokus pada **solusi**."),
          ],
        },
        {
          title: "Listen: a complaint call",
          blocks: [
            audio("A customer complaint", say(["woman", "Hello, I ordered a rice cooker from your online store, but it arrived with a broken lid."], ["man", "I'm really sorry to hear that. Could I have your order number, please?"], ["woman", "It's KR-58213."], ["man", "Thank you. I can see the order. I understand how frustrating this must be. I can either send a replacement today, which should arrive by Thursday, or give you a full refund. Which would you prefer?"], ["woman", "A replacement, please. I need it."], ["man", "Of course. A courier will collect the broken one when they deliver the new one. Thank you for letting us know, and again, I apologise for the inconvenience."])),
            pics([["headset", "customer service"], ["customer-angry", "complaint"], ["cart", "replacement"], ["calendar", "Thursday"]]),
            tryIt(pick("biz-u5-l2-try", "What was wrong with the rice cooker?", ["It had a broken lid.", "It was the wrong colour.", "It never arrived."], 0, "Tutup rusak.")),
          ],
        },
      ],
      checkpoint: [
        pick("biz-u5-l2-c1", "What two options does the agent offer?", ["a replacement or a full refund", "a discount or a voucher", "a repair or nothing"], 0, "Dua pilihan."),
        pick("biz-u5-l2-c2", "What will happen to the broken rice cooker?", ["A courier will collect it.", "She must post it back.", "She can keep it."], 0, "Diambil kurir."),
        sequence("biz-u5-l2-c3", "Put the LAST steps in order.", ["Could you tell me what happened?", "I'm really sorry about this.", "I'll send a replacement today.", "Thank you for letting us know."], "Listen → Apologise → Solve → Thank."),
        pickMany("biz-u5-l2-c4", "Choose ALL phrases that show empathy.", ["I understand how frustrating this must be.", "I'm really sorry to hear that.", "I can see why you're upset.", "That's not my problem."], [0, 1, 2], "Empati."),
        trPick("biz-u5-l2-c5", "“Mana yang Anda pilih?” in English is…", ["Which would you prefer?", "Which you prefer would?", "What you choose prefer?"], 0, "Menawarkan pilihan."),
        pick("biz-u5-l2-c6", "Why does the agent offer a choice instead of deciding for the customer?", ["It gives the customer control and increases satisfaction.", "He doesn't know the policy.", "It is faster."], 0, "Pelanggan merasa dihargai.", { hots: true }),
      ],
    },
    {
      id: "biz-u5-l3",
      skill: "writing",
      title: "Written Responses to Customers",
      summary: "Replying to complaint emails and online reviews professionally.",
      sections: [
        {
          title: "Reply structure",
          blocks: [
            table(["Part", "Example phrase"], [["thank", "Thank you for taking the time to contact us."], ["apologise", "I am sorry that your order did not meet your expectations."], ["explain (briefly)", "Due to a system error, some orders were delayed."], ["solve", "We have issued a full refund, which should appear within 3 working days."], ["close", "We hope to have the opportunity to serve you again."]]),
            examples([{ wrong: "Your review is unfair. Our food is great.", right: "Thank you for your feedback. We're sorry your meal was cold. We've shared this with our kitchen team and would love to welcome you back.", note: "Menanggapi ulasan negatif secara publik." }]),
          ],
        },
        {
          title: "Write a reply",
          blocks: [
            text("Ulasan publik dibaca oleh **calon pelanggan lain**, jadi balasan Anda juga merupakan iklan. Tetap tenang, singkat dan berorientasi solusi."),
            writing({
              id: "biz-u5-l3-write",
              title: "Reply to a 2-star review",
              prompt: "A customer left this review for your hotel: “Room was nice but the Wi-Fi didn't work for two days and nobody fixed it. Disappointed. ★★” Write a public reply (80–120 words): thank them, apologise, explain briefly, describe what you have done, and invite them back.",
              image: "wifi",
              minWords: 80,
              maxWords: 120,
              tips: ["Thank you for staying with us and for your feedback.", "We are sorry that …", "We have since …", "We hope to welcome you back …"],
              models: [{ label: "Model", text: "Dear guest,\n\nThank you for staying with us and for taking the time to share your feedback. We are very sorry that the Wi-Fi in your room was not working for two days, and that our team did not resolve the problem quickly enough.\n\nThe issue was caused by a faulty router on the third floor. We have now replaced all the routers on that floor, and we have reminded our front-desk team to report technical problems to our technician immediately.\n\nWe appreciate your kind words about the room, and we hope to welcome you back soon for a better experience.\n\nWarm regards,\nRina Kusuma, Guest Relations Manager" }],
              rubric: ["I thanked the guest and apologised sincerely.", "I explained the cause briefly without blaming anyone.", "I described concrete actions taken.", "My tone was calm and professional (80–120 words)."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("biz-u5-l3-c1", "Why should you reply calmly to a negative online review?", ["Other potential customers will read it.", "To win the argument.", "It is a legal requirement."], 0, "Dibaca publik."),
        fill("biz-u5-l3-c2", "Complete: Thank you for taking the ___ to contact us.", "Thank you for taking the", "to contact us.", ["time"], "Taking the time."),
        match("biz-u5-l3-c3", "Match the part of the reply and the phrase.", [["thank", "Thank you for your feedback."], ["apologise", "We're sorry that…"], ["solve", "We have issued a full refund."], ["close", "We hope to serve you again."]], "Struktur balasan."),
        pick("biz-u5-l3-c4", "Which explanation is best?", ["Due to a system error, some orders were delayed.", "It's the courier's fault, not ours.", "Delays happen. Deal with it."], 0, "Singkat tanpa menyalahkan."),
        trPick("biz-u5-l3-c5", "“Dana akan masuk dalam 3 hari kerja.” in English is…", ["The refund should appear within 3 working days.", "The money will enter in 3 work days.", "Fund come in 3 day working."], 0, "Working days."),
        pick("biz-u5-l3-c6", "Which detail makes a reply to a complaint most convincing?", ["a specific action you have taken to fix the problem", "a long list of excuses", "a discount code with no apology"], 0, "Tindakan nyata.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "biz-u5-post",
    title: "Unit 5 Review Quiz",
    passPercent: 70,
    questions: [
      pick("biz-u5-post1", "“We'd be willing to lower the price provided that you sign a two-year contract.” “Provided that” means…", ["only if", "even though", "because"], 0, "Provided that = asalkan."),
      listen("biz-u5-post2", voice("How about meeting in the middle at seven hundred and fifty?", "man"), "What is the speaker doing?", ["proposing a compromise", "accepting the first offer", "ending the negotiation"], 0, "Kompromi."),
      fill("biz-u5-post3", "Complete: We apologise for the ___ .", "We apologise for the", ".", ["inconvenience"], "Inconvenience."),
      trPick("biz-u5-post4", "“Potongan harga” in English is…", ["discount", "cut price off", "price cutter"], 0, "Discount."),
      pick("biz-u5-post5", "The second step of LAST is…", ["Apologise", "Listen", "Solve", "Thank"], 0, "L-A-S-T."),
      arrange("biz-u5-post6", "Put the words in order.", "Could you go a little lower", "Meminta harga lebih rendah."),
      listen("biz-u5-post7", say(["woman", "My package is a week late!"], ["man", "I'm so sorry. Let me check the tracking for you right now."]), "What does the agent do?", ["apologises and checks the tracking", "blames the courier", "ends the call"], 0, "Maaf + tindakan."),
      pick("biz-u5-post8", "Which is a polite rejection of an offer?", ["I'm afraid that's not quite what we had in mind.", "That's ridiculous.", "No, never."], 0, "Sopan."),
      pick("biz-u5-post9", "Why is it smart to trade concessions (“If you…, we'll…”) rather than just give a discount?", ["You get something of value back and protect your margin.", "It confuses the other side.", "It ends the negotiation quickly."], 0, "Strategi negosiasi.", { hots: true }),
      pick("biz-u5-post10", "A customer is angry and shouting. Best first response:", ["I can hear this has been really frustrating. Let me make sure I understand what happened.", "Please calm down or I'll hang up.", "That's not my department."], 0, "De-eskalasi.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Let's Make a Deal",
    questions: [
      live("biz-u5-live1", "Price reduction:", ["discount", "discover", "discuss", "dismiss"], 0, "receipt"),
      live("biz-u5-live2", "Agreement reached:", ["It's a deal.", "It's a meal.", "It's a deel.", "It's a dial."], 0, "thumbs-up"),
      live("biz-u5-live3", "Only if:", ["provided that", "even though", "because of", "in spite"], 0, "owl-think"),
      live("biz-u5-live4", "“Kompromi” =", ["compromise", "compress", "complete", "compare"], 0, "chat", true),
      live("biz-u5-live5", "LAST: L =", ["Listen", "Leave", "Laugh", "Lie"], 0, "headset"),
      live("biz-u5-live6", "Empathy:", ["I understand how frustrating this is.", "Not my fault.", "Calm down!", "So?"], 0, "customer-angry"),
      live("biz-u5-live7", "Ask for lower price:", ["Could you go a little lower?", "Could you go down little?", "Lower you can?", "Go low!"], 0, "money"),
      live("biz-u5-live8", "Formal sorry:", ["We apologise for the inconvenience.", "Sorry lol.", "Oops!", "Our bad."], 0, "envelope"),
    ],
  },
};

export const U6: Level = {
  id: "biz-u6",
  title: "Unit 6 — Job Applications and Interviews",
  description: "Read job adverts, write a strong CV summary and cover letter, and answer interview questions with the STAR method.",
  targetScore: "Writing · Speaking",
  cover: ["laptop", "card", "trophy"],
  pretest: {
    id: "biz-u6-pre",
    title: "Unit 6 Pretest",
    passPercent: 0,
    questions: [
      pick("biz-u6-pre1", "A CV is…", ["a document listing your education and work experience", "a letter of complaint", "a company report"], 0, "Curriculum Vitae."),
      pick("biz-u6-pre2", "“Tell me about yourself” in an interview asks for…", ["a short professional summary", "your whole life story", "your family problems"], 0, "Ringkasan profesional."),
      trPick("biz-u6-pre3", "“Saya bersemangat untuk bergabung dengan tim Anda.” in English is…", ["I'm excited about the opportunity to join your team.", "I'm spirit to join your team.", "I excited join team you."], 0, "Antusias."),
      listen("biz-u6-pre4", voice("Can you give me an example of a time you solved a problem at work?", "man"), "What type of question is this?", ["a behavioural question about past experience", "a salary question", "a yes/no question"], 0, "Pertanyaan perilaku."),
      pick("biz-u6-pre5", "What does STAR stand for in interview answers?", ["Situation, Task, Action, Result", "Start, Talk, Answer, Repeat", "Skill, Team, Aim, Reward"], 0, "Metode STAR."),
    ],
  },
  lessons: [
    {
      id: "biz-u6-l1",
      skill: "reading",
      title: "Reading Job Adverts",
      summary: "Understanding responsibilities, requirements and benefits.",
      passages: [JOB_AD],
      sections: [
        {
          title: "Job advert vocabulary",
          blocks: [
            vocab([["requirements", "persyaratan", "report"], ["an advantage", "nilai tambah", "trophy"], ["essential", "wajib", "pin"], ["competitive salary", "gaji kompetitif", "money"], ["remote work", "kerja jarak jauh", "laptop"], ["benefits", "tunjangan/fasilitas", "heart"]], "Job ad words"),
            table(["Section", "What it tells you"], [["about us", "who the company is"], ["responsibilities", "what you will do every day"], ["requirements", "what you must have (essential) or what helps (an advantage)"], ["we offer", "salary and benefits"], ["how to apply", "documents and deadline"]]),
          ],
        },
        {
          title: "Read the advert",
          blocks: [
            { type: "passage", passage: JOB_AD },
            tryIt(pick("biz-u6-l1-try", "What does Lintas Digital make?", ["an accounting app", "accounting textbooks", "online games"], 0, "Aplikasi akuntansi.", { passageId: "biz-job-ad" })),
          ],
        },
      ],
      checkpoint: [
        pick("biz-u6-l1-c1", "How much experience do applicants need?", ["at least one year", "at least five years", "none"], 0, "Minimal 1 tahun.", { passageId: "biz-job-ad" }),
        pick("biz-u6-l1-c2", "Is experience with accounting software required?", ["No, it's an advantage but not essential.", "Yes, it's essential.", "The advert doesn't say."], 0, "Nilai tambah.", { passageId: "biz-job-ad" }),
        pick("biz-u6-l1-c3", "How many remote work days are offered per week?", ["two", "five", "none"], 0, "Dua hari.", { passageId: "biz-job-ad" }),
        pick("biz-u6-l1-c4", "What is the application deadline?", ["30 November", "30 October", "1 December"], 0, "30 November.", { passageId: "biz-job-ad" }),
        trPick("biz-u6-l1-c5", "“Persyaratan” in a job advert is…", ["requirements", "requests", "requires"], 0, "Requirements."),
        pick("biz-u6-l1-c6", "Which candidate fits the advert best?", ["Dina: diploma, 2 years in a bank call centre, good English", "Tono: no experience, basic English", "Lia: 10 years as a chef, no English"], 0, "Cocokkan syarat.", { hots: true, passageId: "biz-job-ad" }),
      ],
    },
    {
      id: "biz-u6-l2",
      skill: "writing",
      title: "CV Summaries and Cover Letters",
      summary: "Writing a professional summary and a short cover letter that matches the job.",
      sections: [
        {
          title: "Strong verbs and structure",
          blocks: [
            table(["Weak", "Strong (action verb + result)"], [["I did customer service.", "Resolved 40+ customer queries per day with a 95% satisfaction rate."], ["I helped with training.", "Trained 15 new staff members on the company's POS system."], ["I was in charge of social media.", "Grew Instagram followers from 2,000 to 9,500 in 8 months."]]),
            table(["Cover letter paragraph", "Content"], [["1. Opening", "the job you're applying for and where you saw it"], ["2. Why you fit", "2–3 skills or achievements that match the requirements"], ["3. Why this company", "what attracts you to them"], ["4. Closing", "availability for an interview + thanks"]]),
            tip("Di CV, kalimat sering diawali **kata kerja lampau** tanpa *I* (*Managed…, Increased…, Organised…*) dan sebaiknya menyertakan **angka**."),
          ],
        },
        {
          title: "Write a cover letter",
          blocks: [
            writing({
              id: "biz-u6-l2-write",
              title: "Cover letter for Lintas Digital",
              prompt: "Write a cover letter (150–200 words) applying for the Customer Success Executive job at Lintas Digital (from the reading). Use the four-paragraph structure, mention at least two achievements with numbers, and explain why you want to work there.",
              image: "envelope",
              minWords: 150,
              maxWords: 200,
              tips: ["I am writing to apply for the position of …, advertised on …", "In my current role at …, I …", "I am particularly attracted to … because …", "I would welcome the opportunity to discuss …"],
              models: [{ label: "Model", text: "Dear Hiring Manager,\n\nI am writing to apply for the position of Customer Success Executive, advertised on your careers page.\n\nI have two years of experience as a customer service officer at Bank Sentosa, where I handle around 40 calls and chats a day and maintain a 96% satisfaction score. I also designed a short onboarding guide for new mobile banking users, which reduced repeat calls by 20%. In addition, I regularly run small training sessions for new colleagues, so I am comfortable explaining technical steps clearly.\n\nI am particularly attracted to Lintas Digital because your app helps small businesses manage their finances, something I care about after seeing my parents run a small shop. I also value your focus on customer feedback.\n\nI would welcome the opportunity to discuss how I could contribute to your team. Thank you for considering my application.\n\nYours faithfully,\nDina Pertiwi" }],
              rubric: ["I followed the four-paragraph structure.", "I included at least two achievements with numbers.", "I matched my skills to the advert's requirements.", "My tone was formal and confident (150–200 words)."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("biz-u6-l2-c1", "Which CV line is strongest?", ["Increased online sales by 35% in six months.", "Was responsible for some sales.", "I like selling things."], 0, "Kata kerja + angka."),
        fill("biz-u6-l2-c2", "Complete: I am writing to ___ for the position of Sales Executive.", "I am writing to", "for the position of Sales Executive.", ["apply"], "Apply for."),
        sequence("biz-u6-l2-c3", "Put the cover letter paragraphs in order.", ["the job and where you saw it", "skills and achievements that match", "why you want this company", "availability and thanks"], "Struktur surat lamaran."),
        pickMany("biz-u6-l2-c4", "Choose ALL strong action verbs for a CV.", ["Managed", "Organised", "Increased", "Did"], [0, 1, 2], "Did terlalu umum."),
        trPick("biz-u6-l2-c5", "“Terima kasih telah mempertimbangkan lamaran saya.” in English is…", ["Thank you for considering my application.", "Thanks for considering my apply.", "Thank you consider my application."], 0, "Penutup surat lamaran."),
        pick("biz-u6-l2-c6", "Why should a cover letter mention the company specifically?", ["It shows genuine interest, not a copy-paste letter.", "It makes the letter longer.", "Companies require their name twice."], 0, "Personalisasi.", { hots: true }),
      ],
    },
    {
      id: "biz-u6-l3",
      skill: "speaking",
      title: "Job Interviews and the STAR Method",
      summary: "Answering common and behavioural questions with clear, structured stories.",
      sections: [
        {
          title: "Common questions",
          blocks: [
            table(["Question", "What they really want to know", "Good start"], [["Tell me about yourself.", "a 60-second professional summary", "I'm a … with … years of experience in …"], ["Why do you want this job?", "motivation and research", "I've followed your company because …"], ["What's your greatest weakness?", "self-awareness and growth", "I used to …, so I started …"], ["Do you have any questions for us?", "interest and preparation", "What does success look like in the first six months?"]]),
            table(["STAR", "Meaning", "Example"], [["S — Situation", "context", "Last year, our shop's online orders doubled during Ramadan."], ["T — Task", "your responsibility", "I had to make sure every order shipped within 24 hours."], ["A — Action", "what YOU did", "I created a packing checklist and reorganised the stockroom."], ["R — Result", "measurable outcome", "We shipped 98% of orders on time and got 4.9-star reviews."]]),
          ],
        },
        {
          title: "Listen and practise",
          blocks: [
            audio("An interview answer", say(["man", "Can you tell me about a time you dealt with a difficult customer?"], ["woman", "Sure. In my last job at a phone shop, a customer came in very angry because his new phone kept restarting. My task was to calm him down and solve the problem quickly. I listened carefully, apologised, and checked the phone. It was a software issue, so I updated it while he waited and showed him how to back up his data. As a result, he left happy and later gave our shop a five-star review that mentioned me by name."])),
            repeat(["I'm a customer service professional with two years of experience.", "My task was to…", "So I decided to…", "As a result, …"]),
            pics([["meeting", "interview"], ["target", "STAR"], ["thumbs-up", "result"], ["trophy", "achievement"]]),
            speaking({
              id: "biz-u6-l3-say",
              title: "Mock interview",
              prompt: "Answer three interview questions: (1) Tell me about yourself. (2) Describe a time you worked under pressure (use STAR). (3) What's your greatest weakness? Speak for about 45 seconds per answer.",
              image: "meeting",
              seconds: 150,
              tips: ["I'm a … with …", "S: At the time, … T: My job was to … A: So I … R: As a result, …", "I used to …, so now I …"],
              models: [{ label: "Model", text: "(1) I'm a recent accounting graduate from Universitas Diponegoro. During my studies, I did a six-month internship at a tax consultancy, where I prepared reports for over 30 small business clients. I'm detail-oriented and I enjoy explaining numbers simply. (2) During my internship, two senior staff were sick in the week before the tax deadline. My task was to finish ten client reports in four days. I made a priority list, asked my supervisor to check the most complex cases first, and worked in focused two-hour blocks. As a result, all ten reports were submitted on time with no corrections needed. (3) I used to find it hard to say no to extra tasks, which sometimes made me stressed. So now I use a weekly planner and I discuss priorities with my manager before accepting new work." }],
              rubric: ["My self-introduction was short and professional.", "My STAR answer had all four parts and a measurable result.", "My weakness answer showed improvement.", "I spoke confidently with clear structure."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("biz-u6-l3-c1", "In the model answer, what was the customer's problem?", ["His phone kept restarting.", "His phone screen was broken.", "He was overcharged."], 0, "Restart terus."),
        pick("biz-u6-l3-c2", "Which part of STAR is “he gave our shop a five-star review”?", ["Result", "Situation", "Task", "Action"], 0, "Hasil."),
        match("biz-u6-l3-c3", "Match the STAR part and the sentence.", [["Situation", "Our team lost two members before a big launch."], ["Task", "I had to coordinate the launch alone."], ["Action", "I made a timeline and delegated tasks to interns."], ["Result", "We launched on time and sales beat targets by 15%."]], "Situation → Task → Action → Result."),
        fill("biz-u6-l3-c4", "Complete: As a ___ , customer complaints fell by 30%.", "As a", ", customer complaints fell by 30%.", ["result"], "As a result."),
        trPick("biz-u6-l3-c5", "“Dulu saya kesulitan…, jadi sekarang saya…” in English is…", ["I used to struggle with…, so now I…", "I use to difficult…, so now I…", "Before I am difficult…, now I…"], 0, "Used to."),
        pick("biz-u6-l3-c6", "Why is a weakness answer like “I'm a perfectionist” often weak?", ["It sounds rehearsed and avoids showing real self-awareness.", "It is grammatically wrong.", "Interviewers love it."], 0, "Jawaban klise.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "biz-u6-post",
    title: "Unit 6 Review Quiz",
    passPercent: 70,
    passages: [JOB_AD],
    questions: [
      pick("biz-u6-post1", "“Experience with X is an advantage” means…", ["it helps, but you can apply without it", "you must have it", "you must not have it"], 0, "Nilai tambah."),
      pick("biz-u6-post2", "Which of these is NOT a responsibility in the advert?", ["managing the company's finances", "running online training sessions", "answering questions by chat"], 0, "Bukan tugas.", { passageId: "biz-job-ad" }),
      fill("biz-u6-post3", "Complete: I'm a marketing graduate ___ two years of experience.", "I'm a marketing graduate", "two years of experience.", ["with"], "With … experience."),
      trPick("biz-u6-post4", "“Tunjangan” (in a job advert) in English is…", ["benefits", "beneficial", "benefactors"], 0, "Benefits."),
      pick("biz-u6-post5", "In STAR, the “A” should focus on…", ["what YOU did", "what your team leader did", "what the customer did"], 0, "Peran pribadi."),
      arrange("biz-u6-post6", "Put the words in order.", "I am writing to apply for the position", "Pembuka surat lamaran."),
      listen("biz-u6-post7", voice("Do you have any questions for us?", "man"), "What is the best type of reply?", ["a thoughtful question about the role", "No, nothing.", "How much holiday do I get? That's all."], 0, "Tunjukkan minat."),
      pick("biz-u6-post8", "Which CV line uses a strong action verb and a number?", ["Reduced delivery errors by 25%.", "I was there for deliveries.", "Deliveries were done."], 0, "Kuat + terukur."),
      pick("biz-u6-post9", "The job offers training sessions and feedback work. Which strength should a candidate highlight?", ["explaining things clearly and listening to customers", "cooking skills", "playing football"], 0, "Relevansi.", { hots: true, passageId: "biz-job-ad" }),
      pick("biz-u6-post10", "Why do interviewers ask behavioural (“Tell me about a time…”) questions?", ["Past behaviour is a good predictor of future performance.", "To fill time.", "To test grammar only."], 0, "Prediksi kinerja.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — You're Hired!",
    questions: [
      live("biz-u6-live1", "STAR: R =", ["Result", "Reason", "Role", "Risk"], 0, "trophy"),
      live("biz-u6-live2", "Must-have:", ["essential", "advantage", "optional", "bonus"], 0, "pin"),
      live("biz-u6-live3", "Strong CV verb:", ["Increased", "Did", "Was", "Had"], 0, "report"),
      live("biz-u6-live4", "“Persyaratan” =", ["requirements", "retirements", "requests", "reminders"], 0, "report", true),
      live("biz-u6-live5", "Apply ___ a job.", ["for", "to", "at", "on"], 0, "envelope"),
      live("biz-u6-live6", "Work from home:", ["remote work", "far work", "distant job", "away working"], 0, "laptop"),
      live("biz-u6-live7", "Past habit:", ["I used to…", "I use to…", "I using to…", "I'm used…"], 0, "owl-think"),
      live("biz-u6-live8", "Close a letter:", ["Thank you for considering my application.", "OK bye.", "Hire me now.", "Reply fast."], 0, "card"),
    ],
  },
};
