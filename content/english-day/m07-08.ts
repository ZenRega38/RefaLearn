import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, dialog, fill, listenPick, live, pair, phrases, pick, pickMany, repeatAfterMe, say } from "./helpers";

// Module 7 — Stories from the Office · Module 8 — Greeting Customers & Small Talk
// Questions, options and titles are all English; explanations stay Indonesian.

export const M7: Level = {
  id: "ed-m7",
  title: "Module 7 — Stories from the Office",
  description: "Menceritakan pekerjaan sehari-hari: tugas utama, tantangan, hal yang disukai, dan cerita tentang pelanggan. Ada mini review Modul 4–6.",
  targetScore: "Phase 2 · Work",
  cover: ["office", "report", "target"],
  lessons: [
    {
      id: "ed-m7-l1",
      skill: "speaking",
      title: "Mini Review & Work Phrases",
      summary: "Review Modul 4–6, lalu My main job is…, The most challenging part is…",
      sections: [
        {
          title: "Quick Word Guess (Modules 4–6)",
          blocks: [
            { type: "try", question: pair("ed-m7-l1-review1", "Review Modules 4–5: match each clue with its word.", [["spend relaxed time with friends", "hang out"], ["not interesting at all", "boring"], ["land with sea all around it", "island"], ["a bag for your clothes when you travel", "suitcase"]], "Nongkrong = hang out, membosankan = boring, pulau = island, koper = suitcase.") },
            { type: "try", question: pair("ed-m7-l1-review2", "Review Module 6: match each clue with its word.", [["computers and phones connected together", "network"], ["the mobile data you buy", "data quota"], ["not working, no connection", "disconnected"], ["the part of a phone you look at", "screen"]], "Mantap, lanjut!") },
          ],
        },
        {
          title: "Key Phrases",
          blocks: [
            phrases([
              ["Today at work, I ___.", "Hari ini di kantor, saya ___."],
              ["My main job is ___.", "Tugas utama saya ___."],
              ["The most challenging part of my job is ___.", "Bagian tersulit dari pekerjaan saya ___."],
              ["I enjoy ___ about my job.", "Saya suka ___ dari pekerjaan saya."],
              ["Our customers usually ___.", "Pelanggan kami biasanya ___."],
              ["I have to ___ every day.", "Saya harus ___ setiap hari."],
            ]),
            repeatAfterMe(["My main job is billing.", "The most challenging part of my job is angry customers.", "I enjoy helping customers.", "I have to call customers every day."]),
          ],
        },
      ],
      checkpoint: [
        pick("ed-m7-l1-c1", "Most of your work is sending bills and checking payments. You say…", ["My main job is billing.", "My job main is billing.", "Main my job billing.", "I am main job billing."], 0, "My main job is ___."),
        listenPick("ed-m7-l1-c2", say(["woman", "I have to call customers every day."]), "Listen. What does she have to do every day?", ["pic:phone-call|Call customers", "pic:report|Write a report", "pic:meeting|Have a meeting", "pic:technician|Fix modems"], 0, "Call customers = menelepon pelanggan."),
        fill("ed-m7-l1-c3", "Complete the sentence about the hardest part of your job.", "The most", "part of my job is angry customers.", ["challenging", "difficult"], "Bagian tersulit = the most challenging (difficult) part."),
        pick("ed-m7-l1-c4", "Review: a movie that is not interesting at all is…", ["boring", "bored", "boarding", "border"], 0, "Boring = membosankan."),
        pick("ed-m7-l1-c5", "Which sentence talks about something you LIKE about your job?", ["I enjoy helping customers solve their problems.", "Customers are angry.", "I have to make a report.", "The due date is the 20th."], 0, "I enjoy ___ = saya suka ___.", { hots: true }),
      ],
    },
    {
      id: "ed-m7-l2",
      skill: "listening",
      title: "Let's Talk: A Day at the Office",
      summary: "Cerita staf billing, pertanyaan pemandu, dan aktivitas “A Day in My Job”.",
      sections: [
        {
          title: "Listen to the Story",
          blocks: [
            { type: "pictures", items: [{ pic: "staff", label: "billing staff" }, { pic: "phone-call", label: "call customers" }, { pic: "customer-angry", label: "angry customers" }] },
            dialog("My main job", say(
              ["woman", "What's your main job in the household division?"],
              ["man", "My main job is billing. I check customer payments and call customers who haven't paid. The most challenging part is customers who are angry about their bills. I enjoy helping customers solve their problems."],
            )),
            { type: "try", question: pickMany("ed-m7-l2-try", "Choose ALL the tasks the man does.", ["Check customer payments", "Fix modems", "Call customers who haven't paid", "Install cables"], [0, 2], "Ia mengecek pembayaran dan menelepon pelanggan yang belum bayar.") },
          ],
        },
        {
          title: "A Day in My Job",
          blocks: [
            { type: "text", md: "Coba buat 3 kalimat urutan harimu di kantor:\n\n- **In the morning,** I check my email.\n- **In the afternoon,** I call customers.\n- **In the evening,** I make a report." },
            { type: "try", question: arrange("ed-m7-l2-day", "Put the words in order to describe your morning.", "In the morning I check my email", "In the morning + kegiatan.") },
            { type: "tip", md: "Saat bercerita, jangan sebut nama asli pelanggan. Cukup **a customer**." },
          ],
        },
      ],
      checkpoint: [
        listenPick("ed-m7-l2-c1", say(["man", "The most challenging part is customers who are angry about their bills."]), "Listen. What is the hardest part of his job?", ["Customers who are angry about their bills", "Meetings every day", "Slow internet", "Weekly reports"], 0, "Angry about their bills = marah soal tagihan."),
        pair("ed-m7-l2-c2", "Match each time with a logical activity.", [["In the morning,", "I check my email."], ["In the afternoon,", "I call customers."], ["In the evening,", "I make a report."], ["Every Monday,", "we have a meeting."]], "Hari kerja yang rapi!"),
        fill("ed-m7-l2-c3", "Complete the sentence. You make sure customers have paid.", "I check customer", ".", ["payments", "payment"], "Pembayaran = payment(s)."),
        pick("ed-m7-l2-c4", "When you tell a story about a customer, you should…", ["Say his full name and address", "Just say “a customer”", "Say his phone number", "Show his photo"], 1, "Jaga privasi pelanggan: a customer."),
        pick("ed-m7-l2-c5", "Your friend asks, “What do you want to improve in your English for your job?” Which answer fits?", ["I want to talk to customers on the phone confidently.", "I like crab.", "My hobby is fishing.", "I went to Bali."], 0, "Pertanyaannya tentang bahasa Inggris untuk kerja.", { hots: true }),
      ],
    },
    {
      id: "ed-m7-l3",
      skill: "vocabulary",
      title: "Vocab of the Day: Office & Billing",
      summary: "Bill, due date, overdue payment, call, remind, complaint, solve, target, meeting, report, patient.",
      sections: [
        {
          title: "Today's Words",
          blocks: [
            {
              type: "vocab",
              items: [
                { emoji: "🧾", pic: "bill", word: "bill / invoice", meaning: "tagihan", example: "The customer's bill is late." },
                { emoji: "📅", pic: "calendar", word: "due date", meaning: "jatuh tempo", example: "The due date is the 20th." },
                { emoji: "⏰", pic: "alarm", word: "overdue payment", meaning: "tunggakan", example: "He has an overdue payment." },
                { emoji: "📞", pic: "phone-call", word: "contact / call", meaning: "menghubungi", example: "I call customers every day." },
                { emoji: "🔔", pic: "smartphone", word: "remind", meaning: "mengingatkan", example: "I remind customers to pay." },
                { emoji: "😠", pic: "customer-angry", word: "complaint", meaning: "keluhan", example: "We receive many complaints." },
                { emoji: "✅", pic: "receipt", word: "solve / resolve", meaning: "menyelesaikan", example: "I solve problems for customers." },
                { emoji: "🎯", pic: "target", word: "target", meaning: "target", example: "We have a monthly target." },
                { emoji: "👥", pic: "meeting", word: "meeting", meaning: "rapat", example: "We have a meeting every Monday." },
                { emoji: "📊", pic: "report", word: "report", meaning: "laporan", example: "I make a report every week." },
                { emoji: "🧘", pic: "headset", word: "patient", meaning: "sabar", example: "You have to be patient with customers." },
              ],
            },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m7-l3-c1", "The last day a customer can pay a bill is the…", ["due date", "dead line date", "pay day", "end date"], 0, "Jatuh tempo = due date."),
        listenPick("ed-m7-l3-c2", say(["woman", "We receive many complaints."]), "Listen. What do they receive a lot of?", ["Complaints", "Payments", "Gifts", "Reports"], 0, "Complaints = keluhan."),
        fill("ed-m7-l3-c3", "Complete the sentence. You tell customers not to forget to pay.", "I", "customers to pay.", ["remind"], "Mengingatkan = remind."),
        pair("ed-m7-l3-c4", "Match each picture with its word.", [["pic:report", "report"], ["pic:meeting", "meeting"], ["pic:target", "target"], ["pic:bill", "bill"]], "Siap kerja!"),
        pick("ed-m7-l3-c5", "A customer is shouting on the phone. What do you need to be?", ["patient", "boring", "overdue", "expensive"], 0, "Be patient = sabar.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ed-m7-quiz",
    title: "Module 7 Quiz",
    passPercent: 70,
    questions: [
      pick("ed-m7-q1", "What is in the picture?", ["report", "receipt", "calendar", "bill"], 0, "Grafik di kertas = report (laporan).", { image: "report" }),
      listenPick("ed-m7-q2", say(["man", "The due date is the twentieth."]), "Listen. What is the due date?", ["the 2nd", "the 12th", "the 20th", "the 22nd"], 2, "Twentieth = tanggal 20."),
      arrange("ed-m7-q3", "Put the words in order.", "We have a meeting every Monday", "We have a meeting + every + hari."),
      pick("ed-m7-q4", "“He has an overdue payment.” What does this mean?", ["He paid his bill late, or not yet.", "He has paid everything.", "He got a discount.", "He just got new internet."], 0, "Overdue payment = tunggakan (belum dibayar lewat jatuh tempo)."),
      fill("ed-m7-q5", "Complete the sentence. Angry customers need calm staff.", "You have to be", "with customers.", ["patient"], "Sabar = patient."),
      pair("ed-m7-q6", "Match each word with its meaning.", [["complaint", "when a customer says something is wrong"], ["solve", "find an answer to a problem"], ["report", "a document about your work"], ["meeting", "when the team talks together"]], "Kerja bagus! Complaint = keluhan, solve = menyelesaikan, report = laporan, meeting = rapat."),
      pick("ed-m7-q7", "“What's your main job?” — which answer is right?", ["My main job is billing.", "My hobby is fishing.", "I'm fine.", "It's spicy."], 0, "Main job = tugas utama."),
      listenPick("ed-m7-q8", say(["woman", "I make a report every week."]), "Listen. How often does she make a report?", ["Every day", "Every week", "Every month", "Every year"], 1, "Every week = setiap minggu."),
      pick("ed-m7-q9", "“We have a monthly target.” How often is the target?", ["Every month", "Every week", "Every day", "Every year"], 0, "Month = bulan → monthly = bulanan."),
      pick("ed-m7-q10", "You want to talk about an angry customer but keep his privacy. Which sentence is best?", ["A customer was upset about his bill.", "Pak Hasan from Jalan Mulawarman was angry.", "Customer 0812xxx was angry.", "I don't tell stories."], 0, "Cukup “a customer”, tanpa nama atau data pribadi.", { hots: true }),
    ],
  },
  live: {
    title: "Module 7 Live Quiz — Office Stories",
    questions: [
      live("ed-m7-live1", "The paper that tells customers how much to pay:", ["bill", "bell", "ball", "build"], 0, "bill"),
      live("ed-m7-live2", "The last day to pay is the…", ["due date", "dead date", "date due off", "pay time"], 0, "calendar"),
      live("ed-m7-live3", "What is happening in the picture?", ["a meeting", "a party", "a class", "a market"], 0, "meeting"),
      live("ed-m7-live4", "A customer says something is wrong. It's a…", ["complain", "complaint", "compliment", "complete"], 1, "customer-angry"),
      live("ed-m7-live5", "You stay calm with angry customers. You are…", ["patient", "passion", "patent", "partner"], 0, "headset"),
      live("ed-m7-live6", "My main job ___ billing.", ["are", "is", "am", "be"], 1, "staff"),
      live("ed-m7-live7", "A bill that is not paid on time is an overdue…", ["payment", "pay day", "paper", "package"], 0, "alarm"),
      live("ed-m7-live8", "What is in the picture?", ["target", "clock", "plate", "wheel"], 0, "target"),
      live("ed-m7-live9", "Help someone not forget: you ___ them.", ["remember", "remind", "remain", "repeat"], 1, "smartphone"),
      live("ed-m7-live10", "I write a ___ about my work every week.", ["report", "repair", "receipt", "record"], 0, "report"),
    ],
  },
};

export const M8: Level = {
  id: "ed-m8",
  title: "Module 8 — Greeting Customers & Small Talk",
  description: "Roleplay pertama: menyapa pelanggan, menanyakan keperluan, menahan dan kembali ke telepon, lalu menutup percakapan dengan sopan.",
  targetScore: "Phase 2 · Work",
  cover: ["headset", "phone-call", "customer"],
  lessons: [
    {
      id: "ed-m8-l1",
      skill: "speaking",
      title: "8 Customer Service Phrases",
      summary: "Pembuka, identifikasi, menahan, kembali, minta maaf, mengecek, dan penutup.",
      sections: [
        {
          title: "Module 7 Recall",
          blocks: [{ type: "try", question: pair("ed-m8-l1-recall", "Module 7 words: match each clue with its word.", [["the paper that shows how much to pay", "bill"], ["the last day to pay", "due date"], ["when a customer says something is wrong", "complaint"], ["calm and not angry", "patient"]], "Siap melayani pelanggan!") }],
        },
        {
          title: "Core Work Phrases",
          blocks: [
            { type: "pictures", items: [{ pic: "staff", label: "staff" }, { pic: "customer", label: "customer" }] },
            phrases([
              ["Good morning, Telkomsel / IndiHome. How can I help you?", "Selamat pagi, Telkomsel / IndiHome. Ada yang bisa saya bantu?", "Opening"],
              ["May I have your name, please?", "Boleh tahu nama Anda?", "Asking for a name"],
              ["Could you please wait a moment?", "Mohon tunggu sebentar.", "Putting on hold"],
              ["Thank you for waiting.", "Terima kasih sudah menunggu.", "Coming back"],
              ["I'm sorry for the inconvenience.", "Mohon maaf atas ketidaknyamanannya.", "Apologizing"],
              ["Let me check that for you.", "Biar saya cek dulu.", "Checking"],
              ["Is there anything else I can help you with?", "Ada lagi yang bisa saya bantu?", "Closing"],
              ["Thank you for contacting us. Have a nice day!", "Terima kasih telah menghubungi kami. Semoga hari Anda menyenangkan!", "Closing"],
            ]),
            repeatAfterMe([
              "Good morning, IndiHome Tarakan. How can I help you?",
              "May I have your name, please?",
              "Could you please wait a moment?",
              "Thank you for waiting.",
              "I'm sorry for the inconvenience.",
              "Let me check that for you.",
              "Is there anything else I can help you with?",
              "Thank you for contacting us. Have a nice day!",
            ]),
            { type: "tip", md: "Latih **intonasi sopan**: suara naik di akhir pertanyaan, nada ramah. Kalau bisa, cetak 8 frasa ini dan tempel di meja kerja." },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m8-l1-c1", "What is the most polite way to ask for a customer's name?", ["What is your name?", "May I have your name, please?", "Who are you?", "Name, please!"], 1, "May I have your name, please? lebih sopan."),
        listenPick("ed-m8-l1-c2", say(["woman", "Could you please wait a moment?"]), "Listen. What is the staff member doing?", ["Asking the customer to wait", "Ending the call", "Saying sorry", "Asking for a name"], 0, "Wait a moment = tunggu sebentar."),
        pair("ed-m8-l1-c3", "Match each phrase with when you use it.", [["How can I help you?", "opening the call"], ["Let me check that for you.", "checking information"], ["Thank you for waiting.", "coming back to the call"], ["Have a nice day!", "closing the call"]], "Urutan percakapanmu sudah rapi!"),
        fill("ed-m8-l1-c4", "Complete the apology.", "I'm sorry for the", ".", ["inconvenience"], "I'm sorry for the inconvenience."),
        pick("ed-m8-l1-c5", "A customer waited a long time on hold. What do you say first when you come back?", ["Thank you for waiting.", "Goodbye!", "May I have your name?", "Wait a moment."], 0, "Selalu berterima kasih karena sudah menunggu.", { hots: true }),
      ],
    },
    {
      id: "ed-m8-l2",
      skill: "listening",
      title: "Roleplay: A Call from a Customer",
      summary: "Model dialog telepon dan empat kartu skenario roleplay.",
      sections: [
        {
          title: "Listen to the Model Call",
          blocks: [
            dialog("Phone call", say(
              ["woman", "Good morning, IndiHome Tarakan. How can I help you?"],
              ["man", "Hello, I want to ask about my bill."],
              ["woman", "Sure. May I have your name, please?"],
              ["man", "My name is Pak Hasan."],
              ["woman", "Thank you, Mr. Hasan. Could you please wait a moment? Let me check that for you."],
              ["woman", "Thank you for waiting. Is there anything else I can help you with?"],
              ["man", "No, that's all. Thank you."],
              ["woman", "You're welcome. Have a nice day!"],
            )),
            { type: "try", question: pick("ed-m8-l2-try", "Why does Mr. Hasan call?", ["To ask about his bill", "To report that the internet is down", "To get a new connection", "He called the wrong number"], 0, "“I want to ask about my bill.”") },
          ],
        },
        {
          title: "Scenario Cards",
          blocks: [
            { type: "text", md: "Latih bersama pasangan, bergantian jadi **staf** dan **pelanggan**:\n\n1. Pelanggan datang ke kantor, bertanya tentang paket IndiHome.\n2. Pelanggan menelepon, mau mengecek tagihan.\n3. Pelanggan **salah sambung**: *Sorry, you have the wrong number.*\n4. Pelanggan datang sangat marah. Staf tetap ramah dan minta maaf." },
            { type: "pictures", items: [{ pic: "customer-angry", label: "upset customer" }, { pic: "staff", label: "“I'm sorry for the inconvenience.”" }] },
            { type: "tip", md: "Roleplay itu **latihan aman**. Tidak ada yang menilai, semua pernah gugup." },
          ],
        },
      ],
      checkpoint: [
        listenPick("ed-m8-l2-c1", say(["man", "Hello, I want to ask about my bill."]), "Listen. What should the staff member say next?", ["Sure. May I have your name, please?", "Have a nice day!", "Sorry, wrong number.", "I like crab."], 0, "Identifikasi pelanggan dulu sebelum mengecek tagihan."),
        arrange("ed-m8-l2-c2", "Put the words in order to open the call.", "How can I help you", "How can I help you? = Ada yang bisa saya bantu?"),
        pick("ed-m8-l2-c3", "The caller is looking for a restaurant, but this is the IndiHome office. You say…", ["Sorry, you have the wrong number.", "Let me check your bill.", "Your bill is 350,000 rupiah.", "Please restart your modem."], 0, "Salah sambung = wrong number."),
        fill("ed-m8-l2-c4", "Complete the closing question.", "Is there anything", "I can help you with?", ["else"], "Anything else = ada lagi."),
        pick("ed-m8-l2-c5", "A customer comes in angry because the internet is down. What is the best FIRST thing to say?", ["I'm sorry for the inconvenience. Let me check that for you.", "That's not my problem.", "Please calm down! You are wrong.", "Have a nice day!"], 0, "Minta maaf dulu, lalu tunjukkan kamu akan membantu.", { hots: true }),
      ],
    },
    {
      id: "ed-m8-l3",
      skill: "vocabulary",
      title: "Vocab of the Day: Customer Service",
      summary: "Friendly, polite, please wait, wrong number, hang up, transfer, assist, upset, ask, service.",
      sections: [
        {
          title: "Today's Words",
          blocks: [
            {
              type: "vocab",
              items: [
                { emoji: "😊", pic: "staff", word: "friendly", meaning: "ramah", example: "Our staff is friendly." },
                { emoji: "🙏", pic: "thumbs-up", word: "polite", meaning: "sopan", example: "Please be polite to customers." },
                { emoji: "⏳", pic: "clock", word: "please wait", meaning: "mohon tunggu", example: "Please wait a moment." },
                { emoji: "☎️", pic: "phone-call", word: "wrong number", meaning: "salah sambung", example: "Sorry, you have the wrong number." },
                { emoji: "📵", pic: "smartphone", word: "hang up", meaning: "menutup telepon", example: "Please don't hang up." },
                { emoji: "🔀", pic: "headset", word: "transfer / connect you to", meaning: "sambungkan ke", example: "Let me transfer you to billing." },
                { emoji: "🤝", pic: "meeting", word: "help / assist", meaning: "membantu", example: "I can assist you." },
                { emoji: "😠", pic: "customer-angry", word: "angry / upset", meaning: "marah / kesal", example: "The customer is upset." },
                { emoji: "❓", pic: "question", word: "ask", meaning: "bertanya", example: "I would like to ask about my bill." },
                { emoji: "⭐", pic: "trophy", word: "service", meaning: "layanan", example: "We have great service." },
              ],
            },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m8-l3-c1", "You end a phone call. You…", ["hang up", "hang out", "close up", "phone off"], 0, "Hang up = menutup telepon. Hang out = nongkrong (Modul 4)!"),
        listenPick("ed-m8-l3-c2", say(["woman", "Let me transfer you to billing."]), "Listen. What will the staff member do?", ["Connect the caller to the billing team", "End the call", "Send a technician", "Ask for a name"], 0, "Transfer you to = menyambungkan Anda ke."),
        pair("ed-m8-l3-c3", "Match each word with its meaning.", [["friendly", "kind and warm to people"], ["polite", "using good manners"], ["upset", "unhappy or a little angry"], ["service", "the help a company gives"]], "Pelayanan bintang lima! Friendly = ramah, polite = sopan, upset = kesal, service = layanan."),
        fill("ed-m8-l3-c4", "Complete the sentence. You don't want the caller to end the call.", "Please don't", "up.", ["hang"], "Hang up = menutup telepon."),
        pick("ed-m8-l3-c5", "A billing question comes to the technical team by mistake. You say…", ["Let me transfer you to billing.", "Sorry, wrong number.", "Please hang up.", "I can't help, bye."], 0, "Sambungkan ke bagian yang tepat.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ed-m8-quiz",
    title: "Module 8 Quiz",
    passPercent: 70,
    questions: [
      pick("ed-m8-q1", "Which is the right way to answer the phone at work?", ["Good morning, IndiHome Tarakan. How can I help you?", "Hello, what do you want?", "Yes?", "Who is this?"], 0, "Sapa + nama kantor + tawarkan bantuan.", { image: "headset" }),
      listenPick("ed-m8-q2", say(["man", "Thank you for waiting."]), "Listen. When do you say this?", ["When you come back after the customer waited", "When you answer the phone", "When it's a wrong number", "When the customer is angry"], 0, "Thank you for waiting = terima kasih sudah menunggu."),
      arrange("ed-m8-q3", "Put the words in order.", "May I have your name please", "May I have your name, please?"),
      pick("ed-m8-q4", "The internet was down all day. How do you apologize to the customer?", ["I'm sorry for the inconvenience.", "Sorry for convenience.", "I'm sorry, inconvenient you.", "Excuse me for the trouble me."], 0, "I'm sorry for the inconvenience."),
      fill("ed-m8-q5", "Complete the sentence.", "Let me", "that for you.", ["check"], "Let me check that for you."),
      pair("ed-m8-q6", "Match each phrase with its meaning.", [["wrong number", "the caller dialed the wrong office"], ["hang up", "end a phone call"], ["assist", "help someone"], ["ask", "say a question"]], "Bagus! Wrong number = salah sambung, hang up = menutup telepon, assist = membantu, ask = bertanya."),
      pick("ed-m8-q7", "What is the right order for a phone call?", ["opening → name → check → closing", "closing → name → opening → check", "check → closing → opening → name", "name → closing → check → opening"], 0, "Buka, identifikasi, cek, lalu tutup."),
      listenPick("ed-m8-q8", say(["woman", "Is there anything else I can help you with?"]), "Listen. The customer has no more questions. What does he say?", ["No, that's all. Thank you.", "Yes, my name is Hasan.", "Wait a moment.", "Good morning."], 0, "No, that's all = tidak, sudah cukup."),
      pick("ed-m8-q9", "How does the customer in the picture feel?", ["upset", "friendly", "polite", "patient"], 0, "Wajah marah = upset/angry.", { image: "customer-angry" }),
      pick("ed-m8-q10", "A customer talks too fast. What can you say politely?", ["Slowly, please. Can you repeat, please?", "Stop talking!", "I don't care.", "Hang up, please."], 0, "Frasa kelas: Slowly, please / Can you repeat, please?", { hots: true }),
    ],
  },
  live: {
    title: "Module 8 Live Quiz — Customer Service Star",
    questions: [
      live("ed-m8-live1", "Opening a call: How can I ___ you?", ["help", "held", "hello", "hold"], 0, "headset"),
      live("ed-m8-live2", "Ask for a name politely:", ["May I have your name, please?", "Your name?", "Who you?", "Give name!"], 0, "staff"),
      live("ed-m8-live3", "The caller dialed the wrong office. It's a…", ["wrong number", "bad phone", "lost call", "miss call"], 0, "phone-call"),
      live("ed-m8-live4", "Could you please wait a ___?", ["moment", "minute hour", "movement", "monument"], 0, "clock"),
      live("ed-m8-live5", "End a phone call:", ["hang out", "hang up", "close on", "turn up"], 1, "smartphone"),
      live("ed-m8-live6", "How does the customer feel?", ["happy", "upset", "sleepy", "hungry"], 1, "customer-angry"),
      live("ed-m8-live7", "I'm sorry for the ___.", ["inconvenience", "convenient", "information", "invitation"], 0, "customer"),
      live("ed-m8-live8", "Back on the line: Thank you for ___.", ["wait", "waiting", "waited", "waits"], 1, "headset"),
      live("ed-m8-live9", "Kind and warm to customers:", ["friendly", "friend", "fried", "free"], 0, "staff"),
      live("ed-m8-live10", "Closing a call: Have a nice ___!", ["day", "dye", "date", "dish"], 0, "feel-great"),
    ],
  },
};
