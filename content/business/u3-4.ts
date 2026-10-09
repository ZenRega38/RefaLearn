import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, sequence, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Business English — Unit 3: Meetings · Unit 4: Presentations and Describing Data

const MINUTES: Passage = {
  id: "biz-minutes",
  title: "Meeting minutes — Marketing team, 14 August",
  pic: "report",
  lines: [
    "Attendees: Laras (chair), Yoga, Nadia, Fikri. Apologies: Bambang.",
    "1. Back-to-school campaign: Nadia reported that online sales rose 18% in July, mainly from Instagram ads.",
    "The team agreed to continue the ads until the end of August with the same budget.",
    "2. New packaging: Yoga presented three designs. Fikri was concerned that design B would be too expensive to print.",
    "It was decided to ask the printer for quotes on designs A and C only.",
    "3. Product launch event: the date is still under discussion; Laras will check venue availability for 20 or 27 September.",
    "Action points: Yoga to request printer quotes by 18 August; Laras to confirm the venue by 21 August; Nadia to prepare the August sales report.",
    "Next meeting: Monday 21 August, 10 a.m., Room 3B.",
  ],
};

export const U3: Level = {
  id: "biz-u3",
  title: "Unit 3 — Meetings",
  description: "Run and take part in meetings: agendas, giving and asking for opinions, interrupting politely, reaching decisions and writing action points.",
  targetScore: "Speaking · Listening",
  cover: ["meeting", "report", "clock"],
  pretest: {
    id: "biz-u3-pre",
    title: "Unit 3 Pretest",
    passPercent: 0,
    questions: [
      pick("biz-u3-pre1", "The person who leads a meeting is the…", ["chair", "table", "agenda", "minute"], 0, "Chair/chairperson."),
      pick("biz-u3-pre2", "An agenda is…", ["a list of topics for a meeting", "a written record of a meeting", "a type of coffee"], 0, "Daftar topik."),
      trPick("biz-u3-pre3", "“Maaf memotong, tapi…” in English is…", ["Sorry to interrupt, but…", "Sorry cutting, but…", "Excuse to break you…"], 0, "Menyela dengan sopan."),
      listen("biz-u3-pre4", voice("Let's move on to the next item on the agenda.", "man"), "What is the chair doing?", ["changing to the next topic", "ending the meeting", "starting a break"], 0, "Move on = pindah topik."),
      pick("biz-u3-pre5", "“Action points” are…", ["tasks people must do after the meeting", "points in a game", "the meeting's location"], 0, "Tindak lanjut."),
    ],
  },
  lessons: [
    {
      id: "biz-u3-l1",
      skill: "speaking",
      title: "Running a Meeting",
      summary: "Opening, following the agenda, keeping time and closing.",
      sections: [
        {
          title: "The chair's language",
          blocks: [
            table(["Stage", "Phrases"], [["opening", "Thanks for coming. Let's get started. The aim of today's meeting is…"], ["agenda", "There are three items on the agenda."], ["managing time", "We're running short of time, so let's keep this brief."], ["moving on", "Let's move on to item two."], ["summarising", "So, to sum up, we've agreed to…"], ["closing", "Let's wrap it up there. Thanks, everyone."]]),
            vocab([["agenda", "agenda/daftar acara rapat", "report"], ["chair", "pemimpin rapat", "chair"], ["minutes", "notulen", "report"], ["item", "butir agenda", "pin"], ["AOB (any other business)", "hal lain-lain", "question"]], "Meeting words"),
          ],
        },
        {
          title: "Listen: opening a meeting",
          blocks: [
            audio("The chair opens the meeting", say(["woman", "OK, everyone, thanks for coming. Let's get started. Bambang sends his apologies; he's with a client. The aim of today's meeting is to review the back-to-school campaign and decide on the new packaging. We have three items on the agenda and forty-five minutes, so let's try to keep to time. Nadia, would you like to start with the sales figures?"])),
            pics([["meeting", "meeting"], ["clock", "45 minutes"], ["report", "agenda"], ["chair", "the chair"]]),
            tryIt(pick("biz-u3-l1-try", "Why is Bambang absent?", ["He's with a client.", "He's sick.", "He's on leave."], 0, "With a client.")),
          ],
        },
      ],
      checkpoint: [
        pick("biz-u3-l1-c1", "How long is the meeting?", ["45 minutes", "an hour", "30 minutes"], 0, "Forty-five minutes."),
        pick("biz-u3-l1-c2", "Who speaks first after the opening?", ["Nadia", "Bambang", "the chair"], 0, "Nadia, sales figures."),
        sequence("biz-u3-l1-c3", "Put the chair's phrases in a logical order.", ["Thanks for coming. Let's get started.", "There are three items on the agenda.", "Let's move on to item two.", "So, to sum up, we've agreed to…", "Let's wrap it up there."], "Urutan rapat."),
        fill("biz-u3-l1-c4", "Complete: We're running ___ of time, so let's keep this brief.", "We're running", "of time, so let's keep this brief.", ["short", "out"], "Running short/out of time."),
        trPick("biz-u3-l1-c5", "“Mari kita akhiri sampai di sini.” (meeting) in English is…", ["Let's wrap it up there.", "Let's finish us here.", "We close here it."], 0, "Wrap up."),
        pick("biz-u3-l1-c6", "A discussion is going off-topic and time is short. As the chair, you say…", ["That's an interesting point, but let's come back to it under AOB.", "Stop talking!", "Let's discuss it for another hour."], 0, "Mengelola waktu dengan sopan.", { hots: true }),
      ],
    },
    {
      id: "biz-u3-l2",
      skill: "speaking",
      title: "Opinions, Interruptions and Decisions",
      summary: "Giving views diplomatically, interrupting, handling interruptions and agreeing on decisions.",
      sections: [
        {
          title: "Diplomatic language",
          blocks: [
            table(["Function", "Phrases"], [["opinion", "From my point of view… / I'd suggest that…"], ["concern", "I'm a little concerned that… / My only worry is…"], ["interrupting", "Sorry to interrupt, but… / Could I just add something?"], ["handling interruptions", "If I could just finish… / Let me come back to that in a second."], ["proposing a decision", "So shall we go with option A? / Are we all agreed?"]]),
            tip("Dalam rapat internasional, kritik biasanya **dilunakkan**: *I'm a little concerned* atau *It might be worth considering…* lebih efektif daripada *This is a bad idea*."),
            examples([{ wrong: "Your design is too expensive.", right: "I'm a little concerned that design B might be too expensive to print.", note: "Pelunakan dengan a little, might." }, { wrong: "Wait, wait, I talk now.", right: "Sorry to interrupt, but could I just add something here?", note: "Menyela sopan." }]),
          ],
        },
        {
          title: "Discussion practice",
          blocks: [
            audio("Choosing a design", say(["man", "I really like design B. It looks premium."], ["woman", "Sorry to interrupt, but I'm a little concerned about the printing cost for B."], ["man", "That's a fair point. How much more would it be?"], ["woman", "About thirty per cent more per unit."], ["man", "Then shall we get quotes for A and C only?"], ["woman", "Agreed. Let's do that."])),
            speaking({
              id: "biz-u3-l2-say",
              title: "Meeting role play",
              prompt: "Your team must choose a location for the annual company outing: Bandung, Yogyakarta or Bali. Give your opinion with reasons, express one concern diplomatically, interrupt politely once, and propose a final decision.",
              image: "meeting",
              seconds: 120,
              tips: ["From my point of view, … because …", "I'm a little concerned that …", "Sorry to interrupt, but …", "So shall we go with …? Are we all agreed?"],
              models: [{ label: "Model", text: "From my point of view, Yogyakarta is the best option because it's affordable and there are lots of team activities. … Sorry to interrupt, but I'm a little concerned that Bali might be over our budget, especially the flights for 60 people. … That's a fair point about Bandung's traffic. So, shall we go with Yogyakarta and take the train? Are we all agreed?" }],
              rubric: ["I gave a clear opinion with reasons.", "I expressed a concern diplomatically.", "I interrupted politely.", "I proposed a decision and checked agreement."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("biz-u3-l2-c1", "What is the woman's concern about design B?", ["the printing cost", "the colour", "the size"], 0, "Printing cost."),
        pick("biz-u3-l2-c2", "What do they decide?", ["to get quotes for A and C only", "to choose design B", "to postpone the decision"], 0, "Quotes for A and C."),
        pickMany("biz-u3-l2-c3", "Choose ALL diplomatic ways to express a concern.", ["I'm a little concerned that…", "My only worry is…", "It might be worth considering…", "That's a terrible idea."], [0, 1, 2], "Diplomatis."),
        match("biz-u3-l2-c4", "Match the function and the phrase.", [["interrupting", "Could I just add something?"], ["handling an interruption", "If I could just finish…"], ["checking agreement", "Are we all agreed?"], ["giving an opinion", "From my point of view…"]], "Fungsi rapat."),
        trPick("biz-u3-l2-c5", "“Itu poin yang masuk akal.” in English is…", ["That's a fair point.", "That's a fair dot.", "It is make sense point."], 0, "Fair point."),
        pick("biz-u3-l2-c6", "Why does the man ask “How much more would it be?” instead of rejecting her concern?", ["He wants facts before deciding.", "He wants to end the meeting.", "He doesn't understand English."], 0, "Keputusan berbasis data.", { hots: true }),
      ],
    },
    {
      id: "biz-u3-l3",
      skill: "reading",
      title: "Minutes and Action Points",
      summary: "Reading and writing meeting minutes with clear actions, owners and deadlines.",
      passages: [MINUTES],
      sections: [
        {
          title: "Read the minutes",
          blocks: [
            text("Notulen yang baik mencatat **keputusan**, bukan semua percakapan. Setiap *action point* punya **siapa**, **apa**, dan **kapan**."),
            { type: "passage", passage: MINUTES },
            tryIt(pick("biz-u3-l3-try", "Who chaired the meeting?", ["Laras", "Yoga", "Nadia"], 0, "Laras (chair).", { passageId: "biz-minutes" })),
          ],
        },
        {
          title: "Write action points",
          blocks: [
            table(["Weak action point", "Strong action point"], [["Look at prices.", "Yoga to request printer quotes for designs A and C by 18 Aug."], ["Venue stuff.", "Laras to confirm venue for 20 or 27 Sept by 21 Aug."], ["Report.", "Nadia to prepare the August sales report for the next meeting."]]),
            writing({
              id: "biz-u3-l3-write",
              title: "Write short minutes",
              prompt: "Write short minutes (80–120 words) for the meeting in the speaking role play (choosing the company outing location). Include attendees, the main discussion points, the decision and at least two action points with names and deadlines.",
              image: "report",
              minWords: 80,
              maxWords: 120,
              tips: ["Attendees: …", "It was agreed that …", "X was concerned that …", "Action points: [name] to [verb] by [date]."],
              models: [{ label: "Model", text: "Meeting minutes — Company outing, 5 September\nAttendees: Dimas (chair), Ayu, Reza, Lina.\n1. Location: Bali, Yogyakarta and Bandung were discussed. Ayu was concerned that flights to Bali would exceed the budget. Reza noted heavy weekend traffic to Bandung.\nIt was agreed to hold the outing in Yogyakarta, travelling by train.\nAction points:\n- Lina to book train tickets for 60 people by 12 September.\n- Reza to get quotes from three hotels by 15 September.\n- Dimas to announce the plan to all staff by 10 September.\nNext meeting: 16 September, 2 p.m." }],
              rubric: ["I listed attendees and the topic.", "I recorded the decision clearly.", "Each action point has a name, a task and a deadline.", "I used neutral, concise language."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("biz-u3-l3-c1", "How much did online sales rise in July?", ["18%", "8%", "30%"], 0, "Nadia: penjualan online naik 18% di bulan Juli.", { passageId: "biz-minutes" }),
        pick("biz-u3-l3-c2", "Which designs will the printer quote for?", ["A and C", "B only", "A, B and C"], 0, "A dan C.", { passageId: "biz-minutes" }),
        pick("biz-u3-l3-c3", "What must Laras do by 21 August?", ["confirm the venue", "request printer quotes", "prepare the sales report"], 0, "Confirm venue.", { passageId: "biz-minutes" }),
        pick("biz-u3-l3-c4", "Which item is still NOT decided?", ["the date of the launch event", "the Instagram ads", "which designs to quote"], 0, "Under discussion.", { passageId: "biz-minutes" }),
        trPick("biz-u3-l3-c5", "“Telah disepakati bahwa…” in English is…", ["It was agreed that…", "It agreed that…", "Was agreeing that…"], 0, "Passive dalam notulen."),
        pick("biz-u3-l3-c6", "Why did the team drop design B?", ["Fikri thought it would be too expensive to print.", "Nobody liked it.", "The printer refused it."], 0, "Biaya cetak.", { hots: true, passageId: "biz-minutes" }),
      ],
    },
  ],
  quiz: {
    id: "biz-u3-post",
    title: "Unit 3 Review Quiz",
    passPercent: 70,
    passages: [MINUTES],
    questions: [
      pick("biz-u3-post1", "The written record of a meeting is called the…", ["minutes", "hours", "agenda", "chair"], 0, "Minutes = notulen."),
      listen("biz-u3-post2", voice("Could I just add something before we move on?"), "What is the speaker doing?", ["interrupting politely", "closing the meeting", "disagreeing strongly"], 0, "Menyela sopan."),
      fill("biz-u3-post3", "Complete: Let's move ___ to the next item.", "Let's move", "to the next item.", ["on"], "Move on."),
      trPick("biz-u3-post4", "“Hal lain-lain” at the end of an agenda is…", ["AOB (any other business)", "OOO", "FYI"], 0, "AOB = any other business, butir terakhir agenda."),
      pick("biz-u3-post5", "Which is the most diplomatic?", ["It might be worth considering a cheaper supplier.", "Our supplier is useless.", "Change supplier now."], 0, "Pelunakan."),
      arrange("biz-u3-post6", "Put the words in order.", "Sorry to interrupt but could I add something", "Menyela."),
      pick("biz-u3-post7", "When is the next marketing meeting?", ["Monday 21 August, 10 a.m.", "Friday 18 August", "Monday 14 August"], 0, "Next meeting.", { passageId: "biz-minutes" }),
      pick("biz-u3-post8", "Who sent apologies for the meeting?", ["Bambang", "Fikri", "Laras"], 0, "Apologies: Bambang.", { passageId: "biz-minutes" }),
      pick("biz-u3-post9", "Why is “Yoga to request quotes by 18 August” better than “Get quotes”?", ["It says who, what and when.", "It is shorter.", "It sounds friendlier."], 0, "Siapa-apa-kapan.", { hots: true }),
      pick("biz-u3-post10", "A colleague keeps interrupting you. Best response:", ["If I could just finish my point, then I'd love to hear your view.", "Be quiet!", "Leave the meeting."], 0, "Tegas tapi sopan.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Meeting Room",
    questions: [
      live("biz-u3-live1", "Meeting leader:", ["chair", "table", "desk", "sofa"], 0, "chair"),
      live("biz-u3-live2", "List of topics:", ["agenda", "minutes", "invoice", "receipt"], 0, "report"),
      live("biz-u3-live3", "Next topic:", ["Let's move on.", "Let's move in.", "Let's move up.", "Let's move off."], 0, "meeting"),
      live("biz-u3-live4", "“Notulen” =", ["minutes", "seconds", "hours", "notes paper"], 0, "report", true),
      live("biz-u3-live5", "Polite interruption:", ["Sorry to interrupt, but…", "Stop!", "My turn!", "Shh!"], 0, "raise-hand"),
      live("biz-u3-live6", "Soft concern:", ["I'm a little concerned…", "That's awful.", "No way.", "Wrong!"], 0, "owl-think"),
      live("biz-u3-live7", "Finish the meeting:", ["wrap it up", "wrap it in", "pack it on", "close it off up"], 0, "clock"),
      live("biz-u3-live8", "Check agreement:", ["Are we all agreed?", "Are we all agree?", "We agreed all?", "All agreeing?"], 0, "thumbs-up"),
    ],
  },
};

export const U4: Level = {
  id: "biz-u4",
  title: "Unit 4 — Presentations and Describing Data",
  description: "Structure a business presentation, use signposting language, describe trends in charts accurately and handle questions from the audience.",
  targetScore: "Speaking · Writing",
  cover: ["report", "microphone", "target"],
  pretest: {
    id: "biz-u4-pre",
    title: "Unit 4 Pretest",
    passPercent: 0,
    questions: [
      pick("biz-u4-pre1", "Sales went from 100 to 150 units. Sales…", ["rose by 50%", "fell by 50%", "remained stable"], 0, "Naik 50%."),
      pick("biz-u4-pre2", "“First, I'll talk about… Then I'll move on to…” is used to…", ["outline a presentation", "end a presentation", "answer questions"], 0, "Garis besar."),
      trPick("biz-u4-pre3", "“Penjualan turun drastis.” in English is…", ["Sales fell sharply.", "Sales downed drastic.", "Sales go down strongly."], 0, "Fall sharply."),
      listen("biz-u4-pre4", voice("If you look at this graph, you can see that costs have levelled off since March.", "man"), "What happened to costs after March?", ["They stopped changing much.", "They increased sharply.", "They disappeared."], 0, "Level off = mendatar."),
      pick("biz-u4-pre5", "A good way to respond to a hard question you can't answer immediately:", ["That's a great question. Let me check the figures and get back to you.", "I don't know. Next.", "That's a stupid question."], 0, "Menunda jawaban dengan sopan."),
    ],
  },
  lessons: [
    {
      id: "biz-u4-l1",
      skill: "speaking",
      title: "Structure and Signposting",
      summary: "Opening a presentation, guiding the audience and closing with impact.",
      sections: [
        {
          title: "Signposting language",
          blocks: [
            table(["Stage", "Phrases"], [["welcome and purpose", "Good morning, everyone. Today I'd like to talk about…"], ["outline", "I've divided my talk into three parts. First… Then… Finally…"], ["moving on", "That brings me to my next point. / Let's now look at…"], ["referring to visuals", "As you can see on this slide… / This chart shows…"], ["summarising", "To sum up, … / The key takeaway is…"], ["questions", "I'd be happy to take any questions."]]),
            tip("**Signposting** adalah \"rambu jalan\" untuk pendengar. Pendengar tidak bisa membaca ulang seperti teks, jadi beri tahu mereka **di mana** mereka berada dalam presentasi Anda."),
            repeat(["Today I'd like to talk about our results for the second quarter.", "That brings me to my next point.", "As you can see on this slide…", "To sum up, …"]),
          ],
        },
        {
          title: "Listen and present",
          blocks: [
            audio("A presentation opening", say(["woman", "Good morning, everyone, and thank you for being here. Today I'd like to talk about our plan to open a new branch in Makassar. I've divided my talk into three parts. First, I'll look at the market opportunity. Then I'll move on to the costs and the timeline. Finally, I'll explain the risks and how we can manage them. Please feel free to ask questions at the end."])),
            pics([["microphone", "presenter"], ["report", "slides"], ["map", "Makassar"], ["target", "key message"]]),
            speaking({
              id: "biz-u4-l1-say",
              title: "Present an opening",
              prompt: "Give the opening (about 60 seconds) of a presentation on a business idea of your choice: greet the audience, state the purpose, outline three parts, and explain when you will take questions.",
              image: "microphone",
              seconds: 60,
              tips: ["Good morning, everyone. Today I'd like to …", "I've divided my talk into three parts.", "First, … Then, … Finally, …", "I'll be happy to take questions at the end."],
              models: [{ label: "Model", text: "Good afternoon, everyone, and thanks for joining. Today I'd like to present an idea for a subscription service that delivers fresh vegetables from local farmers to offices in Jakarta. I've divided my talk into three parts. First, I'll explain the problem we're solving. Then I'll show you our business model and the numbers. Finally, I'll talk about our plans for the next twelve months. I'll be happy to take any questions at the end." }],
              rubric: ["I greeted the audience and stated the purpose.", "I outlined three clear parts.", "I used signposting phrases.", "I spoke clearly at a steady pace."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("biz-u4-l1-c1", "What is the presentation about?", ["opening a new branch in Makassar", "closing a branch", "hiring new staff"], 0, "New branch."),
        pick("biz-u4-l1-c2", "What will the speaker discuss last?", ["the risks", "the costs", "the market opportunity"], 0, "Finally: risks."),
        match("biz-u4-l1-c3", "Match the stage and the phrase.", [["outline", "I've divided my talk into three parts."], ["moving on", "That brings me to my next point."], ["visuals", "As you can see on this slide…"], ["closing", "To sum up, …"]], "Signposting."),
        fill("biz-u4-l1-c4", "Complete: That ___ me to my next point.", "That", "me to my next point.", ["brings"], "That brings me to…"),
        trPick("biz-u4-l1-c5", "“Silakan bertanya di akhir sesi.” in English is…", ["Please feel free to ask questions at the end.", "Please free ask question in last.", "Feel to ask at the end freely."], 0, "Undangan bertanya."),
        pick("biz-u4-l1-c6", "Why do presenters outline their talk at the start?", ["so the audience can follow the structure", "to make the talk longer", "because slides require it"], 0, "Membantu pendengar.", { hots: true }),
      ],
    },
    {
      id: "biz-u4-l2",
      skill: "writing",
      title: "Describing Trends",
      summary: "Verbs, nouns and adverbs for describing changes in charts and figures.",
      sections: [
        {
          title: "Trend language",
          blocks: [
            table(["Direction", "Verbs", "Nouns"], [["up ↑", "rise, increase, grow, climb", "a rise, an increase, growth"], ["down ↓", "fall, decrease, drop, decline", "a fall, a decrease, a drop, a decline"], ["no change →", "remain stable, stay the same, level off", "a period of stability"], ["highest / lowest", "peak at, reach a low of", "a peak, a low point"]]),
            table(["Speed / size", "Adverbs", "Adjectives"], [["big", "sharply, dramatically, significantly", "a sharp / dramatic / significant rise"], ["small", "slightly, gradually, steadily", "a slight / gradual / steady fall"]]),
            warn("Perhatikan preposisi: **rose by 10%** (besar perubahan) vs **rose to 500** (angka akhir) vs **from 400 to 500**. Ini sering salah!"),
          ],
        },
        {
          title: "Describe a chart",
          blocks: [
            table(["Month", "Online orders (thousands)"], [["January", "20"], ["February", "22"], ["March", "35"], ["April", "35"], ["May", "28"], ["June", "41"]]),
            text("Contoh deskripsi: *Online orders rose slightly from 20,000 in January to 22,000 in February, before climbing sharply to 35,000 in March. They remained stable in April, then fell to 28,000 in May. In June, orders peaked at 41,000.*"),
            writing({
              id: "biz-u4-l2-write",
              title: "Describe the sales chart",
              prompt: "Using the table above, write a short paragraph (70–100 words) describing the trend in online orders from January to June. Use at least four different trend verbs and two adverbs, and include the correct prepositions (by / to / from … to).",
              image: "report",
              minWords: 70,
              maxWords: 100,
              tips: ["Overall, online orders increased …", "… rose slightly from … to …", "… climbed sharply / remained stable / fell to …", "… peaked at … in June."],
              models: [{ label: "Model", text: "Overall, online orders more than doubled between January and June. They rose slightly from 20,000 in January to 22,000 in February, and then increased sharply by 13,000 to reach 35,000 in March. Orders remained stable in April but dropped to 28,000 in May, possibly because of the end of a promotion. However, they recovered strongly in June, peaking at 41,000, the highest figure in the period." }],
              rubric: ["I gave an overall trend first.", "I used at least four trend verbs and two adverbs.", "I used by / to / from … to correctly.", "My figures are accurate."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("biz-u4-l2-c1", "Between March and April, orders…", ["remained stable", "rose sharply", "fell slightly"], 0, "35 → 35."),
        pick("biz-u4-l2-c2", "In which month did orders peak?", ["June", "March", "May"], 0, "41,000."),
        fill("biz-u4-l2-c3", "Complete: Orders rose ___ 13,000 between February and March. (besar perubahan)", "Orders rose", "13,000 between February and March.", ["by"], "By = besar perubahan.", { translate: true }),
        pickMany("biz-u4-l2-c4", "Choose ALL words that describe a big change.", ["sharply", "dramatically", "significantly", "slightly"], [0, 1, 2], "Slightly = kecil."),
        trPick("biz-u4-l2-c5", "“Naik secara bertahap” in English is…", ["rise gradually", "rise gradual", "up gradually go"], 0, "Gradually."),
        pick("biz-u4-l2-c6", "Orders fell in May then rose in June. Which sentence explains the pattern best?", ["Orders dropped in May but recovered strongly in June.", "Orders always increased.", "Orders were stable all year."], 0, "Menghubungkan tren.", { hots: true }),
      ],
    },
    {
      id: "biz-u4-l3",
      skill: "listening",
      title: "Handling Questions",
      summary: "Welcoming, clarifying, answering, and dealing with difficult questions.",
      sections: [
        {
          title: "Q&A language",
          blocks: [
            table(["Situation", "Phrases"], [["welcoming", "Good question. / Thanks for asking that."], ["clarifying", "If I understand correctly, you're asking about…?"], ["you don't know", "I don't have that figure with me, but I'll email it to you this afternoon."], ["off-topic", "That's a bit outside today's topic, but I'm happy to discuss it after the session."], ["checking", "Does that answer your question?"]]),
            vocab([["clarify", "memperjelas", "question"], ["figure", "angka/data", "report"], ["follow up", "menindaklanjuti", "envelope"], ["handout", "materi cetak", "open-book"]], "Q&A words"),
          ],
        },
        {
          title: "Listen: tough questions",
          blocks: [
            audio("Questions after a presentation", say(["man", "You said the Makassar branch will break even in eighteen months. What happens if sales are slower than expected?"], ["woman", "Thanks for asking that. If I understand correctly, you're asking about our plan B. We've modelled a slower scenario, where break-even takes twenty-four months. In that case, we would delay hiring two staff members to reduce costs. Does that answer your question?"], ["man", "Yes, thank you. And what's the total investment?"], ["woman", "I don't have the exact figure with me, but it's around four billion rupiah. I'll send you the detailed breakdown this afternoon."])),
            pics([["question", "question"], ["owl-think", "clarify"], ["money", "investment"], ["envelope", "follow-up"]]),
            tryIt(pick("biz-u4-l3-try", "What is the man worried about?", ["slower sales than expected", "the branch location", "the presenter's English"], 0, "Penjualan lebih lambat.")),
          ],
        },
      ],
      checkpoint: [
        pick("biz-u4-l3-c1", "In the slower scenario, when does the branch break even?", ["in 24 months", "in 18 months", "in 12 months"], 0, "24 months."),
        pick("biz-u4-l3-c2", "What would they do to reduce costs?", ["delay hiring two staff members", "close the branch", "cut salaries"], 0, "Menunda rekrutmen."),
        pick("biz-u4-l3-c3", "Why does the presenter say she'll send a breakdown later?", ["She doesn't have the exact figure with her.", "She doesn't want to answer.", "The man asked for an email."], 0, "Tidak ada angka pasti saat itu."),
        arrange("biz-u4-l3-c4", "Put the words in order.", "Does that answer your question", "Mengecek jawaban."),
        trPick("biz-u4-l3-c5", "“Kalau saya tidak salah paham, Anda bertanya tentang…” in English is…", ["If I understand correctly, you're asking about…", "If I not misunderstand, you ask about…", "If I correct understand, you are ask…"], 0, "Klarifikasi."),
        pick("biz-u4-l3-c6", "Why is repeating or rephrasing a question useful?", ["It checks understanding and gives you time to think.", "It wastes time.", "It annoys the audience."], 0, "Strategi Q&A.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "biz-u4-post",
    title: "Unit 4 Review Quiz",
    passPercent: 70,
    questions: [
      pick("biz-u4-post1", "Profit went from 2 billion to 1.5 billion. Profit…", ["fell by 0.5 billion", "rose to 2 billion", "remained stable"], 0, "Turun 0,5 M."),
      listen("biz-u4-post2", voice("Let's now look at the costs.", "man"), "What is the speaker doing?", ["moving to a new part of the talk", "ending the presentation", "answering a question"], 0, "Signposting."),
      fill("biz-u4-post3", "Complete: Sales peaked ___ 5,000 units in December.", "Sales peaked", "5,000 units in December.", ["at"], "Peak at."),
      trPick("biz-u4-post4", "“Seperti yang Anda lihat di slide ini…” in English is…", ["As you can see on this slide…", "Like you see in this slide…", "As you look this slide…"], 0, "Merujuk visual."),
      pick("biz-u4-post5", "Which describes a small change?", ["a slight decrease", "a dramatic fall", "a sharp rise"], 0, "Slight."),
      arrange("biz-u4-post6", "Put the words in order.", "I have divided my talk into three parts", "Outline."),
      listen("biz-u4-post7", voice("Costs remained stable throughout the second quarter."), "What happened to costs?", ["They didn't change much.", "They rose sharply.", "They fell dramatically."], 0, "Stabil."),
      pick("biz-u4-post8", "Someone asks an off-topic question. You say…", ["That's a bit outside today's topic, but I'm happy to discuss it afterwards.", "Wrong question.", "I won't answer that."], 0, "Sopan."),
      pick("biz-u4-post9", "Visitors: Jan 10k, Feb 10k, Mar 30k. Which is accurate?", ["Visitors remained stable in February, then tripled in March.", "Visitors fell in March.", "Visitors rose steadily every month."], 0, "Membaca data.", { hots: true }),
      pick("biz-u4-post10", "Which closing is most effective?", ["To sum up, the Makassar branch is a low-risk opportunity with a clear plan B. I'd be happy to take questions.", "That's all. Bye.", "I think I'm finished maybe."], 0, "Ringkasan + undangan bertanya.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Up, Down, Steady",
    questions: [
      live("biz-u4-live1", "Big increase:", ["a sharp rise", "a slight rise", "a small fall", "no change"], 0, "target"),
      live("biz-u4-live2", "Rose ___ 10% (amount):", ["by", "to", "at", "on"], 0, "report"),
      live("biz-u4-live3", "Highest point:", ["peak", "low", "drop", "level"], 0, "mountain"),
      live("biz-u4-live4", "“Stabil” =", ["remain stable", "remain stab", "stay stabile", "keep stability on"], 0, "report", true),
      live("biz-u4-live5", "Next part:", ["That brings me to…", "That takes me in…", "That goes me on…", "That moves me at…"], 0, "microphone"),
      live("biz-u4-live6", "Small change:", ["slightly", "sharply", "dramatically", "hugely"], 0, "owl-think"),
      live("biz-u4-live7", "Check understanding:", ["Does that answer your question?", "You understand or not?", "Clear?!", "Got it, yes no?"], 0, "question"),
      live("biz-u4-live8", "End summary:", ["To sum up, …", "To sum down, …", "In sum up, …", "Summing, …"], 0, "trophy"),
    ],
  },
};
