import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, writing } from "../kit";

// Grade 11 (SMA, Fase F). Chapter 1 — Problems and Solutions · Chapter 2 — How Nature Works (explanation texts)

const TRAFFIC: Passage = {
  id: "sma11-c1-traffic",
  title: "Letter to the Editor: Our School Gate Is a Traffic Nightmare",
  pic: "traffic",
  lines: [
    "Dear Editor,",
    "Every morning between 6.30 and 7.00, the street in front of SMA Negeri 5 turns into a traffic nightmare. Hundreds of cars and motorbikes stop on the road to drop off students, and the queue often reaches the main junction.",
    "This problem is not only annoying but also dangerous. Last month, a Grade 10 student was hit by a motorbike while crossing between the cars.",
    "I would like to offer several suggestions. First, the school could open a second gate on the side street, so that drop-offs are divided into two areas.",
    "Second, it might be a good idea to start a “walking bus” programme, in which students who live nearby walk to school together in groups led by volunteer parents.",
    "Third, I strongly recommend that the local transport agency provide a school shuttle bus from the three biggest housing complexes.",
    "Finally, why don't we ask the student council to train volunteers to help with crossing at the gate during peak hours?",
    "If the school, parents and local government work together, we can make our mornings safer and calmer. I would be happy to help organise a meeting to discuss these ideas.",
    "Yours faithfully, Dimas Arya Nugraha, Grade 11 student",
  ],
};

export const CH1: Level = {
  id: "sma11-ch1",
  title: "Chapter 1 — Problems and Solutions",
  description: "Give and respond to suggestions and offers in formal and informal contexts, use suggest/recommend structures correctly, and write a problem-solution letter.",
  targetScore: "Speaking · Structure · Writing",
  cover: ["traffic", "question", "target"],
  pretest: {
    id: "sma11-c1-pre",
    title: "Chapter 1 Pretest",
    passPercent: 0,
    questions: [
      pick("sma11-c1-pre1", "I suggest that he ___ a doctor.", ["see", "sees", "to see", "seeing"], 0, "Suggest that + subject + verb dasar (subjunctive)."),
      listen("sma11-c1-pre2", voice("Would you like me to carry those boxes for you?"), "Listen. What is the speaker doing?", ["offering help", "asking for help", "complaining", "refusing"], 0, "Would you like me to … = menawarkan."),
      trPick("sma11-c1-pre3", "“Bagaimana kalau kita naik kereta?” in English is…", ["How about taking the train?", "How about take the train?", "What if take train?", "How taking the train?"], 0, "How about + -ing."),
      pick("sma11-c1-pre4", "Which response accepts an offer politely?", ["That would be great, thank you.", "No.", "Whatever.", "Do it yourself."], 0, "Menerima tawaran."),
      pick("sma11-c1-pre5", "“I recommend ___ the museum on a weekday.”", ["visiting", "to visit", "visit", "visited"], 0, "Recommend + -ing."),
    ],
  },
  lessons: [
    {
      id: "sma11-c1-l1",
      skill: "structure",
      title: "Suggestions: Grammar That Works",
      summary: "suggest/recommend + -ing or that-clause; why don't, how about, it might be a good idea; had better.",
      sections: [
        {
          title: "Patterns",
          blocks: [
            table(["Pattern", "Example", "Note"], [["suggest / recommend + -ing", "I suggest leaving early.", "tanpa to"], ["suggest / recommend + that + subject + base verb", "I recommend that she apply now.", "subjunctive: tanpa -s"], ["Why don't you/we …?", "Why don't we share a taxi?", "informal"], ["How about / What about + -ing?", "How about meeting at 4?", "informal"], ["It might be a good idea to …", "It might be a good idea to call first.", "lebih halus"], ["You'd better (not) …", "You'd better not miss the bus.", "saran kuat / peringatan"], ["If I were you, I'd …", "If I were you, I'd apologise.", "sopan, personal"]]),
            examples([{ wrong: "I suggest you to take a break.", right: "I suggest (that) you take a break. / I suggest taking a break." }, { wrong: "She recommended me to try it.", right: "She recommended that I try it. / She recommended trying it." }], "Common mistakes"),
          ],
        },
        {
          title: "Responding",
          blocks: [
            table(["Accepting", "Declining politely"], [["That's a great idea.", "That sounds good, but …"], ["Sounds good to me.", "I'm not sure that would work because …"], ["Why not? Let's do it.", "Thanks for the suggestion, but I'd rather …"]]),
            audio("Planning a study group", say(["woman", "We have three exams next week. Why don't we form a study group?"], ["man", "Good idea. How about meeting at the library after school?"], ["woman", "I'm not sure that would work, because the library closes at four. I suggest meeting at my house instead."], ["man", "Sounds good to me. It might be a good idea to divide the topics so everyone prepares one part."])),
            tryIt(pick("sma11-c1-l1-try1", "Why doesn't the girl like the library idea?", ["It closes at four.", "It's too noisy.", "It's too far."], 0, "The library closes at four.")),
            repeat(["I suggest meeting at my house.", "Why don't we divide the topics?", "It might be a good idea to start early.", "If I were you, I'd ask the teacher."]),
          ],
        },
      ],
      checkpoint: [
        listen("sma11-c1-l1-c1", voice("If I were you, I'd apologise to her before the end of the day."), "Listen. What does the speaker suggest?", ["apologising before the end of the day", "ignoring her", "waiting a week"], 0, "If I were you, I'd apologise."),
        pick("sma11-c1-l1-c2", "The doctor recommended that he ___ more water.", ["drink", "drinks", "to drink"], 0, "Recommend that + base verb."),
        pick("sma11-c1-l1-c3", "Which suggestion is the most formal?", ["It might be a good idea to review the schedule.", "Let's just skip it!", "Why don't ya chill?"], 0, "Formal dan halus."),
        fill("sma11-c1-l1-c4", "Complete: How about ___ (take) a short break?", "How about", "a short break?", ["taking"], "How about + -ing."),
        trPick("sma11-c1-l1-c5", "“Saya sarankan kamu belajar lebih awal.” in English is…", ["I suggest that you study earlier.", "I suggest you to study earlier.", "I suggest you studying earlier to."], 0, "Suggest that + subject + verb."),
        pick("sma11-c1-l1-c6", "Your friend wants to buy an expensive phone with her savings for university. What is the most tactful suggestion?", ["It might be a good idea to compare a few cheaper models first.", "That's a stupid decision.", "Just do whatever you want."], 0, "Saran yang halus dan konstruktif.", { hots: true }),
      ],
    },
    {
      id: "sma11-c1-l2",
      skill: "speaking",
      title: "Making and Responding to Offers",
      summary: "Offering help formally and informally, accepting and refusing offers.",
      sections: [
        {
          title: "Offers",
          blocks: [
            table(["Offering", "Accepting", "Refusing politely"], [["Shall I …? / Shall we …?", "Yes, please. That's very kind of you.", "No, thanks. I can manage."], ["Would you like me to …?", "That would be great, thanks.", "That's kind of you, but it's okay."], ["Let me … for you.", "Thanks, I really appreciate it.", "Thanks, but I've got it."], ["Can I get you anything?", "A glass of water would be lovely.", "I'm fine for now, thank you."], ["Is there anything I can do?", "Could you hold this for a second?", "Not right now, but thanks for asking."]]),
            pics([["hand", "Let me help."], ["water", "Can I get you a drink?"], ["bag", "Shall I carry it?"], ["map", "Would you like directions?"]]),
          ],
        },
        {
          title: "Situations",
          blocks: [
            audio("At a hotel front desk", say(["woman", "Good evening. Welcome to Hotel Senggigi. Would you like me to help you with your luggage?"], ["man", "That would be great, thank you. Also, could you recommend a place for dinner?"], ["woman", "Certainly. I'd recommend the seafood restaurant by the beach. Shall I book a table for you?"], ["man", "Yes, please. For two people at seven."])),
            tryIt(pick("sma11-c1-l2-try1", "What does the receptionist offer to do?", ["help with luggage and book a table", "cook dinner", "drive him to the airport"], 0, "Two offers.")),
            speaking({
              id: "sma11-c1-l2-say",
              title: "Role play: problems and help",
              prompt: "Choose two situations and act out both roles: (a) a classmate is struggling to carry science project materials; (b) a foreign tourist is lost near your school; (c) your teacher's laptop won't connect to the projector. Make offers and suggestions, and respond politely.",
              image: "hand",
              seconds: 90,
              tips: ["You look like you need a hand. Shall I …?", "Would you like me to …?", "If I were you, I'd …", "That's very kind of you. / Thanks, but I can manage."],
              models: [{ label: "Tourist", text: "Excuse me, you look a bit lost. Can I help you? … Oh, the Sultan's Palace? It's about fifteen minutes on foot. Would you like me to show you on your map? … Sure. Go straight along this road, then turn left at the big intersection. Actually, it's quite hot today, so I'd suggest taking a becak. Shall I ask that driver how much it costs? … You're welcome! Enjoy your visit." }],
              rubric: ["I made at least three different offers.", "I gave at least two suggestions with correct grammar.", "Responses were polite and natural.", "My tone was helpful and friendly."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sma11-c1-l2-c1", say(["man", "Shall I open the window? It's quite hot in here."], ["woman", "Yes, please. Thank you."]), "Listen. Does the woman accept the offer?", ["Yes, she does.", "No, she doesn't.", "She doesn't answer."], 0, "Yes, please."),
        pick("sma11-c1-l2-c2", "Which is a polite refusal?", ["That's kind of you, but I can manage.", "No. Go away.", "I don't need you."], 0, "Menolak sopan."),
        match("sma11-c1-l2-c3", "Match the offer and the best reply.", [["Can I get you anything?", "A glass of water would be lovely."], ["Shall I carry that?", "Yes, please. It's heavy."], ["Would you like me to explain?", "That would be great, thanks."], ["Let me pay for it.", "Thanks, but it's my treat."]], "Tawaran dan respons."),
        fill("sma11-c1-l2-c4", "Complete: ___ I book a table for you? (Haruskah saya…)", "", "I book a table for you?", ["Shall", "shall"], "Shall I …?", { translate: true }),
        trPick("sma11-c1-l2-c5", "“Terima kasih, tapi saya bisa sendiri.” in English is…", ["Thanks, but I can manage.", "Thanks, but I can't manage.", "Thank, I manage alone you."], 0, "I can manage."),
        pick("sma11-c1-l2-c6", "A visitor in a wheelchair is waiting at a door with no ramp. What is the most respectful thing to do?", ["Ask, “Would you like some help?” and wait for the answer.", "Push the wheelchair immediately without asking.", "Ignore the person."], 0, "Tawarkan, jangan memaksa.", { hots: true }),
      ],
    },
    {
      id: "sma11-c1-l3",
      skill: "writing",
      title: "Reading and Writing: A Problem-Solution Letter",
      summary: "Analysing a letter to the editor and writing your own.",
      passages: [TRAFFIC],
      sections: [
        {
          title: "The letter",
          blocks: [
            { type: "passage", passage: TRAFFIC },
            table(["Part", "Lines"], [["Problem (situation + why it matters)", "2–3"], ["Solutions (with suggestion language)", "4–7"], ["Evaluation / call to action", "8"]]),
            vocab([["junction", "persimpangan", "traffic-light"], ["peak hours", "jam sibuk", "clock"], ["shuttle bus", "bus antar-jemput", "bus"], ["housing complex", "kompleks perumahan", "house"]], "Words from the text"),
          ],
        },
        {
          title: "Write your letter",
          blocks: [
            tryIt(pick("sma11-c1-l3-try1", "What happened last month?", ["A student was hit by a motorbike.", "The gate was closed.", "A bus broke down."], 0, "Baris 3.", { passageId: TRAFFIC.id })),
            writing({
              id: "sma11-c1-l3-write",
              title: "A letter to the editor",
              prompt: "Write a letter to the editor of your local newspaper or school magazine about a problem in your school or community (rubbish, flooding, bullying, lack of sports facilities, street lighting…). Describe the problem, give at least three suggestions and end with a call to action.",
              image: "envelope",
              minWords: 220,
              maxWords: 350,
              tips: ["Dear Editor,", "Problem: Every …, … This is a serious problem because …", "Suggestions: First, … could … / I suggest that … / It might be a good idea to … / I strongly recommend that …", "Call to action: If …, we can … I would be happy to …", "Yours faithfully,"],
              models: [{ label: "Example", text: "Dear Editor,\nI am writing about the dark street that connects our village to the main road in Sleman. Since the two street lamps broke in July, the 800-metre road has been completely dark after 6 p.m.\nThis is a serious problem. Many students return from extra lessons in the evening, and two motorbike accidents have already happened there. Several girls have also said that they feel unsafe walking home.\nI would like to suggest some solutions. First, the village office could repair the broken lamps immediately and check them every month. Second, it might be a good idea to install solar-powered lamps, which are cheaper to run. Third, I recommend that residents organise a rotating night watch until the lights are fixed.\nIf the village government and residents work together, our road can be safe again within a few weeks. I would be glad to help collect signatures for a petition.\nYours faithfully,\nLaras Kinanti, Grade 11 student" }],
              rubric: ["I described the problem and explained why it matters.", "I gave at least three practical suggestions.", "I used at least three different suggestion structures correctly.", "I ended with a positive call to action.", "My letter is formal and well organised."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sma11-c1-l3-c1", "Why would a second gate help?", ["It would divide the drop-offs into two areas.", "It would be prettier.", "It would stop students from coming."], 0, "Baris 4.", { passageId: TRAFFIC.id }),
        pick("sma11-c1-l3-c2", "What is a “walking bus”?", ["students walking to school together in groups led by parents", "a bus that moves slowly", "a bus for teachers"], 0, "Baris 5.", { passageId: TRAFFIC.id }),
        fill("sma11-c1-l3-c3", "Complete.", "I strongly recommend that the local transport agency", "a school shuttle bus.", ["provide"], "Baris 6 (subjunctive).", { passageId: TRAFFIC.id }),
        pickMany("sma11-c1-l3-c4", "Choose ALL the groups the writer wants to involve.", ["the school", "parents", "the local government", "foreign tourists"], [0, 1, 2], "Baris 8.", { passageId: TRAFFIC.id }),
        pick("sma11-c1-l3-c5", "Why does the writer mention the accident in line 3?", ["to show that the problem is dangerous, not just annoying", "to blame the student", "to describe the motorbike"], 0, "Memperkuat urgensi.", { passageId: TRAFFIC.id, hots: true }),
        pick("sma11-c1-l3-c6", "Why does the writer use “Yours faithfully”?", ["He doesn't know the editor's name.", "He is angry.", "He knows the editor personally."], 0, "Dear Editor tanpa nama.", { passageId: TRAFFIC.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma11-c1-post",
    title: "Chapter 1 Posttest",
    passPercent: 70,
    passages: [TRAFFIC],
    questions: [
      pick("sma11-c1-post1", "The counsellor suggested that Rina ___ a study timetable.", ["make", "makes", "to make", "made to"], 0, "Suggest that + base verb."),
      listen("sma11-c1-post2", say(["woman", "My laptop keeps freezing."], ["man", "Have you tried restarting it? If I were you, I'd also delete some old files."]), "Listen. What two things does the man suggest?", ["restarting it and deleting old files", "buying a new one", "calling the police", "turning off the Wi-Fi"], 0, "Two suggestions."),
      trPick("sma11-c1-post3", "“Bolehkah saya membantu Anda?” (formal offer) in English is…", ["May I help you?", "Can you help me?", "Must I help you?", "Help I may?"], 0, "May I help you?"),
      pick("sma11-c1-post4", "Which sentence is grammatically correct?", ["She recommended visiting the museum early.", "She recommended to visit the museum early.", "She recommended me visit early to.", "She recommends that he visits early to."], 0, "Recommend + -ing."),
      arrange("sma11-c1-post5", "Put the words in order.", "Would you like me to call a taxi", "Would you like me to …?"),
      pick("sma11-c1-post6", "Who should train volunteers to help at the gate?", ["the student council", "the police", "the transport agency", "the parents only"], 0, "Baris 7.", { passageId: TRAFFIC.id }),
      match("sma11-c1-post7", "Match the structure and the example.", [["suggest + -ing", "I suggest leaving now."], ["recommend that + base verb", "I recommend that he leave now."], ["Why don't we …?", "Why don't we leave now?"], ["had better", "You'd better leave now."]], "Struktur saran."),
      fill("sma11-c1-post8", "Complete.", "the street in front of SMA Negeri 5 turns into a traffic", ".", ["nightmare"], "Baris 2.", { passageId: TRAFFIC.id }),
      pick("sma11-c1-post9", "Which suggestion in the letter needs the help of the local government?", ["a school shuttle bus", "a walking bus", "student volunteers", "a meeting"], 0, "Transport agency (baris 6).", { passageId: TRAFFIC.id, hots: true }),
      pick("sma11-c1-post10", "What makes the letter persuasive?", ["It explains the danger, gives practical solutions and offers personal help.", "It uses angry words.", "It blames parents.", "It is very short."], 0, "Analisis teks.", { passageId: TRAFFIC.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Problem Solvers",
    questions: [
      live("sma11-c1-live1", "I suggest ___ early.", ["leaving", "to leave", "leave to", "left"], 0, "clock"),
      live("sma11-c1-live2", "Offer:", ["Shall I help?", "Help me!", "I need help.", "You help."], 0, "hand"),
      live("sma11-c1-live3", "Recommend that she ___", ["rest", "rests", "to rest", "resting"], 0, "bed"),
      live("sma11-c1-live4", "“Bagaimana kalau…” =", ["How about…", "How much…", "What is…", "Why not to…"], 0, "question", true),
      live("sma11-c1-live5", "Polite refusal:", ["Thanks, but I can manage.", "No!", "Go away.", "Never."], 0, "thumbs-up"),
      live("sma11-c1-live6", "Strong advice:", ["You'd better…", "How about…", "Maybe…", "Shall we…"], 0, "traffic-light"),
      live("sma11-c1-live7", "Letter to an unknown editor ends:", ["Yours faithfully", "Love", "Cheers", "See you"], 0, "envelope"),
      live("sma11-c1-live8", "Busiest time of day:", ["peak hours", "top time", "high minutes", "best hours"], 0, "traffic"),
    ],
  },
};

const TSUNAMI: Passage = {
  id: "sma11-c2-tsunami",
  title: "How Does a Tsunami Happen?",
  pic: "beach",
  lines: [
    "A tsunami is a series of huge ocean waves that are caused by a sudden movement of the sea floor. The word comes from Japanese and means “harbour wave”.",
    "Most tsunamis are triggered by underwater earthquakes. Indonesia is especially at risk because it lies on the Pacific Ring of Fire, where several tectonic plates meet.",
    "When one plate suddenly slips under another, the sea floor is pushed up or pulled down. As a result, a huge column of water above it is lifted and then falls back.",
    "This movement creates waves that spread out in all directions. In deep ocean, they can travel as fast as a jet plane, around 800 kilometres per hour, but they may be less than a metre high.",
    "As the waves approach shallow water near the coast, they slow down. However, their energy is pushed upward, so they become much taller, sometimes more than 30 metres.",
    "One natural warning sign is when the sea suddenly pulls back and exposes the sea floor. This happens because the low part of the wave arrives first.",
    "Tsunamis can also be caused by volcanic eruptions and underwater landslides. In 2018, the collapse of part of Anak Krakatau triggered a tsunami in the Sunda Strait.",
    "Because of this, early warning systems, evacuation routes and education are essential. If you feel a strong earthquake near the coast, move to high ground immediately without waiting for an official warning.",
  ],
};

export const CH2: Level = {
  id: "sma11-ch2",
  title: "Chapter 2 — How Nature Works",
  description: "Read and write explanation texts about natural and social phenomena, use cause-and-effect language, the passive voice and sequence markers, and explain a process orally with a diagram.",
  targetScore: "Reading · Structure · Writing",
  cover: ["beach", "mountain", "rain"],
  pretest: {
    id: "sma11-c2-pre",
    title: "Chapter 2 Pretest",
    passPercent: 0,
    questions: [
      pick("sma11-c2-pre1", "An explanation text tells…", ["how or why something happens", "a personal story", "how to make a product", "the writer's opinion only"], 0, "Explanation = proses/penyebab fenomena."),
      listen("sma11-c2-pre2", voice("Most tsunamis are triggered by underwater earthquakes."), "Listen. What triggers most tsunamis?", ["underwater earthquakes", "strong winds", "heavy rain", "full moons"], 0, "Underwater earthquakes."),
      trPick("sma11-c2-pre3", "“Lempeng tektonik” in English is…", ["tectonic plate", "tectonic plane", "technical plate", "texture plate"], 0, "Tectonic plate."),
      pick("sma11-c2-pre4", "The village was flooded ___ the heavy rain.", ["because of", "because", "so", "therefore"], 0, "Because of + noun."),
      pick("sma11-c2-pre5", "Which tense is most common in explanation texts?", ["simple present", "simple past", "past perfect", "future continuous"], 0, "Fakta umum → simple present."),
    ],
  },
  lessons: [
    {
      id: "sma11-c2-l1",
      skill: "reading",
      title: "Reading: How Does a Tsunami Happen?",
      summary: "The structure of an explanation text: general statement, sequenced explanation, closing.",
      passages: [TSUNAMI],
      sections: [
        {
          title: "The text",
          blocks: [
            { type: "passage", passage: TSUNAMI },
            audio("Listen and read", say(["woman", TSUNAMI.lines.join(" ")])),
            vocab([["trigger", "memicu", "target"], ["sea floor", "dasar laut", "fish"], ["shallow", "dangkal", "beach"], ["expose", "memperlihatkan/membuka", "eye"], ["evacuation route", "jalur evakuasi", "map"]], "Words from the text"),
          ],
        },
        {
          title: "Structure",
          blocks: [
            table(["Part", "Function", "Lines"], [["General statement", "what the phenomenon is", "1–2"], ["Sequenced explanation", "the process step by step (cause → effect)", "3–6"], ["Further information", "other causes / examples", "7"], ["Closing (optional)", "importance, advice, conclusion", "8"]]),
            text("Fitur bahasa: **simple present**, **passive** (*are caused by, is pushed up*), **cause-effect connectors** (*because, as a result, so*), **time sequence** (*when, as, then*), dan **istilah teknis** (*tectonic plates, sea floor*)."),
            tryIt(pick("sma11-c2-l1-try1", "What does “tsunami” mean in Japanese?", ["harbour wave", "big wave", "sea monster"], 0, "Baris 1.", { passageId: TSUNAMI.id })),
          ],
        },
      ],
      checkpoint: [
        pick("sma11-c2-l1-c1", "Why is Indonesia especially at risk?", ["It lies on the Pacific Ring of Fire.", "It has many rivers.", "It has a long dry season."], 0, "Baris 2.", { passageId: TSUNAMI.id }),
        pick("sma11-c2-l1-c2", "How fast can tsunami waves travel in deep ocean?", ["around 800 km per hour", "around 80 km per hour", "around 8 km per hour"], 0, "Baris 4.", { passageId: TSUNAMI.id }),
        fill("sma11-c2-l1-c3", "Complete.", "As the waves approach shallow water near the coast, they slow", ".", ["down"], "Baris 5.", { passageId: TSUNAMI.id }),
        pickMany("sma11-c2-l1-c4", "Choose ALL the possible causes of tsunamis mentioned.", ["underwater earthquakes", "volcanic eruptions", "underwater landslides", "strong storms"], [0, 1, 2], "Baris 2 dan 7.", { passageId: TSUNAMI.id }),
        pick("sma11-c2-l1-c5", "Why do waves become taller near the coast?", ["They slow down and their energy is pushed upward.", "The wind is stronger near the coast.", "More water is added by rivers."], 0, "Baris 5.", { passageId: TSUNAMI.id, hots: true }),
        pick("sma11-c2-l1-c6", "You are on a beach and the sea suddenly pulls back far. What should you do?", ["Run to high ground immediately.", "Walk out to collect shells.", "Take photos and wait."], 0, "Tanda alami tsunami (baris 6, 8).", { passageId: TSUNAMI.id, hots: true }),
      ],
    },
    {
      id: "sma11-c2-l2",
      skill: "structure",
      title: "Cause and Effect",
      summary: "Connectors and verbs for causes and results; passive voice in scientific explanations.",
      sections: [
        {
          title: "Cause-effect language",
          blocks: [
            table(["Type", "Connector / verb", "Example"], [["Cause + clause", "because, since, as", "Waves slow down because the water is shallow."], ["Cause + noun", "because of, due to, owing to", "Due to the earthquake, the sea floor rose."], ["Result (sentence)", "As a result, Therefore, Consequently", "The plate slipped. As a result, a tsunami formed."], ["Result (clause)", "so, so … that", "The energy is pushed up, so the waves grow."], ["Verbs", "cause, lead to, result in, trigger, produce", "Deforestation leads to landslides."], ["Passive verbs", "is caused by, results from", "Thunder is caused by expanding air."]]),
            examples([{ wrong: "Due to it rained, the match was cancelled.", right: "Due to the rain, the match was cancelled. / Because it rained, …" }, { wrong: "Global warming is result in rising seas.", right: "Global warming results in rising seas." }], "Common mistakes"),
          ],
        },
        {
          title: "Other phenomena",
          blocks: [
            pics([["rain", "rain"], ["rainbow", "rainbows"], ["windy", "wind"], ["mountain", "volcanoes"]]),
            audio("How rain forms", say(["man", "Rain is part of the water cycle. When the sun heats seas, lakes and rivers, water evaporates and turns into water vapour."], ["man", "As the vapour rises, it cools down and condenses into tiny droplets, which form clouds."], ["man", "The droplets join together and become heavier. Eventually, they are too heavy to stay in the air, so they fall as rain."])),
            tryIt(pick("sma11-c2-l2-try1", "What happens as water vapour rises?", ["It cools and condenses into droplets.", "It heats up and disappears.", "It turns into ice immediately."], 0, "Kondensasi.")),
            repeat(["Due to the heat, water evaporates.", "As a result, clouds are formed.", "This leads to heavy rain.", "Floods are caused by blocked rivers."]),
          ],
        },
      ],
      checkpoint: [
        listen("sma11-c2-l2-c1", voice("Thunder is caused by the rapid expansion of air heated by lightning."), "Listen. What causes thunder?", ["air expanding quickly after lightning", "clouds hitting each other", "heavy rain"], 0, "Rapid expansion of air."),
        pick("sma11-c2-l2-c2", "The flight was delayed ___ thick smoke from forest fires.", ["due to", "because", "so"], 0, "Due to + noun."),
        pick("sma11-c2-l2-c3", "Plastic blocks the drains. ___, the streets flood.", ["As a result", "Although", "Because of"], 0, "Akibat → As a result."),
        fill("sma11-c2-l2-c4", "Complete: Deforestation ___ in soil erosion.", "Deforestation", "in soil erosion.", ["results"], "Result in = mengakibatkan."),
        trPick("sma11-c2-l2-c5", "“Banjir disebabkan oleh sampah di sungai.” in English is…", ["Floods are caused by rubbish in rivers.", "Floods cause by rubbish in rivers.", "Floods are cause rubbish in rivers."], 0, "Pasif: are caused by."),
        pick("sma11-c2-l2-c6", "Which sentence shows the correct cause → effect?", ["Higher temperatures melt polar ice, which leads to rising sea levels.", "Rising sea levels lead to higher temperatures in the sun.", "Melting ice causes the sun to get hotter."], 0, "Rantai sebab-akibat yang benar.", { hots: true }),
      ],
    },
    {
      id: "sma11-c2-l3",
      skill: "writing",
      title: "Explain a Phenomenon",
      summary: "Writing an explanation text and explaining a process with a diagram.",
      sections: [
        {
          title: "Choose a phenomenon",
          blocks: [
            table(["Natural", "Social / technological"], [["How do volcanoes erupt?", "Why do prices go up (inflation)?"], ["Why do landslides happen?", "How does a hoax spread online?"], ["How are rainbows formed?", "Why is there traffic congestion?"], ["Why does the moon change shape?", "How does a vaccine protect us?"]]),
            tip("Gunakan **diagram alur** (flowchart) dulu: kotak-kotak berisi tahapan yang dihubungkan panah. Lalu ubah tiap panah menjadi **kata penghubung sebab-akibat**."),
          ],
        },
        {
          title: "Write and explain",
          blocks: [
            writing({
              id: "sma11-c2-l3-write",
              title: "An explanation text",
              prompt: "Write an explanation text about a natural or social phenomenon. Include a general statement, a sequenced explanation (at least four steps) and a closing. Use at least four cause-effect expressions and two passive sentences.",
              image: "mountain",
              minWords: 220,
              maxWords: 330,
              tips: ["General statement: … is … It happens when …", "Step 1: First / When …, …", "Step 2–4: As a result, … / This causes … / … is …ed by …", "Closing: Because of this, … / Therefore, it is important to …"],
              models: [{ label: "Example", text: "How Does a Landslide Happen?\nA landslide is the movement of rock, soil and debris down a slope. In Indonesia, landslides often happen during the rainy season, especially in hilly areas of Java and Sumatra.\nThe process usually begins with heavy rain that lasts for several hours or days. The rainwater soaks into the ground and fills the spaces between soil particles. As a result, the soil becomes heavier and weaker.\nOn steep slopes, the soil is held in place by friction and by the roots of trees. However, when forests are cut down for farming or housing, there are fewer roots to hold the soil together.\nWhen the soil can no longer resist the pull of gravity, a layer of it suddenly slides downhill. This movement can be triggered by an earthquake, by a heavy truck on a road, or simply by more rain. Houses, roads and farms in its path are often buried.\nBecause of these dangers, it is important to plant trees on slopes, build proper drainage and avoid building houses at the bottom of steep hills." }],
              rubric: ["My text has a general statement, sequenced explanation and closing.", "I used at least four cause-effect expressions accurately.", "I used passive voice where appropriate.", "I used technical vocabulary correctly.", "My explanation is logical and easy to follow."],
            }),
            speaking({
              id: "sma11-c2-l3-say",
              title: "Explain with a diagram",
              prompt: "Draw a simple flowchart of your phenomenon on paper, then explain it in about 90 seconds as if you were a science YouTuber.",
              image: "video-app",
              prepSeconds: 60,
              seconds: 90,
              tips: ["Have you ever wondered why …?", "It all starts when …", "This causes … / As a result, …", "Finally, …", "So next time you see …, you'll know that …"],
              models: [{ label: "Example", text: "Have you ever wondered why the sea suddenly pulls back before a tsunami? It all starts with an earthquake under the sea. When one tectonic plate slips under another, the sea floor moves suddenly. This pushes a huge amount of water up, and then it falls back, creating waves. In deep water, these waves are fast but low. But as they reach the coast, they slow down and grow taller. Often, the low part of the wave arrives first, so the water pulls away from the beach. So next time you see the sea disappear, don't look — run to high ground!" }],
              rubric: ["I used a hook to start.", "I explained the steps in order.", "I used cause-effect language.", "My explanation was clear and engaging."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sma11-c2-l3-c1", "In the model text, what makes the soil heavier and weaker?", ["rainwater filling the spaces between particles", "tree roots", "sunlight"], 0, "Air hujan meresap."),
        pick("sma11-c2-l3-c2", "Why do fewer trees increase the risk of landslides?", ["There are fewer roots to hold the soil.", "Trees make soil heavy.", "Trees attract rain."], 0, "Akar menahan tanah."),
        arrange("sma11-c2-l3-c3", "Put the words in order.", "The soil is held in place by roots", "Pasif present."),
        fill("sma11-c2-l3-c4", "Complete: Heavy rain can ___ to landslides.", "Heavy rain can", "to landslides.", ["lead"], "Lead to = menyebabkan."),
        trPick("sma11-c2-l3-c5", "“Lereng yang curam” in English is…", ["a steep slope", "a sleep slope", "a steep slop"], 0, "Steep slope."),
        pick("sma11-c2-l3-c6", "What is the main difference between an explanation text and a procedure text?", ["Explanation tells how/why something happens; procedure tells how to do something.", "There is no difference.", "Explanation uses imperatives."], 0, "Tujuan teks berbeda.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma11-c2-post",
    title: "Chapter 2 Posttest",
    passPercent: 70,
    passages: [TSUNAMI],
    questions: [
      pick("sma11-c2-post1", "Lightning ___ by a build-up of electrical charges in clouds.", ["is caused", "causes", "is cause", "caused it"], 0, "Pasif present."),
      listen("sma11-c2-post2", voice("Because the moon pulls on the oceans, sea levels rise and fall twice a day. These changes are called tides."), "Listen. What causes tides?", ["the moon's pull", "the wind", "earthquakes", "rivers"], 0, "Gravitasi bulan."),
      trPick("sma11-c2-post3", "“Akibatnya” (connector) in English is…", ["As a result", "Even though", "In addition", "For example"], 0, "As a result / Consequently."),
      pick("sma11-c2-post4", "Choose the correct sentence.", ["Due to the storm, the ferry was cancelled.", "Due to it stormed, the ferry cancelled.", "Because of it was stormy, the ferry cancelled.", "Due the storm, ferry was cancel."], 0, "Due to + noun."),
      arrange("sma11-c2-post5", "Put the words in order.", "Most tsunamis are triggered by underwater earthquakes", "Pasif."),
      pick("sma11-c2-post6", "What triggered the 2018 tsunami in the Sunda Strait?", ["the collapse of part of Anak Krakatau", "a typhoon", "a meteor", "a ship"], 0, "Baris 7.", { passageId: TSUNAMI.id }),
      match("sma11-c2-post7", "Match the part of the text and the line.", [["General statement", "line 1"], ["The process begins", "line 3"], ["A natural warning sign", "line 6"], ["Advice", "line 8"]], "Struktur."),
      fill("sma11-c2-post8", "Complete.", "move to high ground immediately without waiting for an official", ".", ["warning"], "Baris 8.", { passageId: TSUNAMI.id }),
      pick("sma11-c2-post9", "Why might people in the deep ocean not notice a tsunami?", ["The waves may be less than a metre high there.", "Tsunamis only happen on land.", "The water is too cold.", "Ships are too fast."], 0, "Baris 4.", { passageId: TSUNAMI.id, hots: true }),
      pick("sma11-c2-post10", "Why does the writer advise moving to high ground without waiting for an official warning?", ["A tsunami can arrive within minutes after a nearby earthquake.", "Official warnings are always wrong.", "High ground is more beautiful.", "Earthquakes never cause tsunamis."], 0, "Waktu sangat terbatas.", { passageId: TSUNAMI.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Nature Explained",
    questions: [
      live("sma11-c2-live1", "Tsunami means…", ["harbour wave", "big storm", "sea monster", "fast wind"], 0, "beach"),
      live("sma11-c2-live2", "Due to + …", ["noun", "clause", "verb", "adverb"], 0, "question"),
      live("sma11-c2-live3", "Water vapour cools and…", ["condenses", "evaporates", "burns", "melts"], 0, "cloud"),
      live("sma11-c2-live4", "“Memicu” =", ["trigger", "tiger", "trick", "trim"], 0, "target", true),
      live("sma11-c2-live5", "Indonesia lies on the Ring of…", ["Fire", "Water", "Gold", "Ice"], 0, "mountain"),
      live("sma11-c2-live6", "Explanation text tense:", ["simple present", "simple past", "future", "past perfect"], 0, "report"),
      live("sma11-c2-live7", "Result connector:", ["Consequently", "Although", "Despite", "Whereas"], 0, "trophy"),
      live("sma11-c2-live8", "Sea pulls back suddenly → …", ["run to high ground", "collect shells", "swim out", "take selfies"], 0, "run"),
    ],
  },
};
