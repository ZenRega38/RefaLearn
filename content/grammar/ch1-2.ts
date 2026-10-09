import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, say, table, tip, trPick, tryIt, voice, warn, writing } from "../kit";

// English Grammar Essentials — Chapter 1: Present Tenses · Chapter 2: Past Tenses

const DAY: Passage = {
  id: "gram1-day",
  title: "A Day in the Life of a Night Nurse",
  lines: [
    "Dewi works as a nurse at a hospital in Semarang. She usually starts her shift at nine p.m. and finishes at seven in the morning.",
    "This month, however, she is working in the children's ward because a colleague is on maternity leave.",
    "Night shifts are tiring, but Dewi loves her job. She believes that patients need the most support at night, when they feel lonely or scared.",
    "Right now, she is checking a young patient's temperature, while another nurse is preparing medicine.",
    "Dewi rarely sleeps well during the day, so she always keeps her bedroom dark and quiet.",
  ],
};

const STORY: Passage = {
  id: "gram2-story",
  title: "The Night the Lights Went Out",
  lines: [
    "It was raining heavily when the electricity suddenly went off. My sister and I were watching a film, and my parents were cooking dinner.",
    "At first, we thought it was a short power cut, but after an hour the lights still hadn't come back on.",
    "My father found some candles that he had bought for an emergency the year before.",
    "We sat together in the kitchen and told stories. My grandmother, who used to live in a village without electricity, described how people spent evenings before television.",
    "By the time the power returned, we had forgotten about the film completely. It was one of the best evenings we had ever spent together.",
  ],
};

export const CH1: Level = {
  id: "gram-ch1",
  title: "Chapter 1 — Present Tenses",
  description: "Use the present simple and present continuous correctly, choose between them, and use stative verbs and frequency adverbs naturally.",
  targetScore: "Level A2–B1",
  cover: ["clock", "calendar", "nurse"],
  pretest: {
    id: "gram-ch1-pre",
    title: "Chapter 1 Pretest",
    passPercent: 0,
    questions: [
      pick("gram-ch1-pre1", "Water ___ at 100 degrees Celsius.", ["boils", "is boiling", "boil", "boiled"], 0, "Fakta umum → present simple."),
      pick("gram-ch1-pre2", "Look! It ___ .", ["is raining", "rains", "rain", "rained"], 0, "Sedang terjadi → present continuous."),
      trPick("gram-ch1-pre3", "“Saya sedang belajar untuk ujian minggu ini.” in English is…", ["I'm studying for an exam this week.", "I study for an exam this week now.", "I am study for an exam."], 0, "Kegiatan sementara → continuous."),
      pick("gram-ch1-pre4", "I ___ what you mean.", ["understand", "am understanding", "understanding", "understands"], 0, "Stative verb tidak memakai -ing."),
      pick("gram-ch1-pre5", "She ___ coffee in the morning.", ["never drinks", "drinks never", "is never drink", "never drink"], 0, "Adverb sebelum kata kerja; she → drinks."),
    ],
  },
  lessons: [
    {
      id: "gram-ch1-l1",
      skill: "structure",
      title: "Present Simple: Habits, Facts and Schedules",
      summary: "Form, third-person -s, negatives and questions, and frequency adverbs.",
      sections: [
        {
          title: "Form and use",
          blocks: [
            table(["Use", "Example"], [["habits and routines", "I walk to work every day."], ["facts and general truths", "The sun rises in the east."], ["permanent situations", "My brother lives in Medan."], ["timetables", "The train leaves at 7:15."]]),
            table(["", "I/you/we/they", "he/she/it"], [["positive", "work", "works / watches / studies / has"], ["negative", "don't work", "doesn't work"], ["question", "Do you work?", "Does she work?"]]),
            warn("Setelah **does / doesn't**, kata kerja kembali ke bentuk dasar: *Does she **work**?* (bukan *works*)."),
          ],
        },
        {
          title: "Frequency adverbs",
          blocks: [
            table(["Adverb", "Position", "Example"], [["always, usually, often, sometimes, rarely, never", "before the main verb", "She usually starts at nine."], ["(same)", "after “be”", "He is always late."], ["every day, twice a week", "end of sentence", "I go swimming twice a week."]]),
            pics([["alarm", "every morning"], ["calendar", "twice a week"], ["clock", "at 7:15"], ["sleep", "rarely sleeps well"]]),
            tryIt(pick("gram-ch1-l1-try", "Which sentence is correct?", ["He doesn't like spicy food.", "He don't like spicy food.", "He doesn't likes spicy food."], 0, "Doesn't + base verb.")),
          ],
        },
      ],
      checkpoint: [
        fill("gram-ch1-l1-c1", "Complete: My sister ___ (study) law at university.", "My sister", "law at university.", ["studies"], "Konsonan + y → ies."),
        pick("gram-ch1-l1-c2", "___ your father work on Saturdays?", ["Does", "Do", "Is", "Has"], 0, "He → does."),
        arrange("gram-ch1-l1-c3", "Put the words in order.", "She is always on time for meetings", "Adverb setelah be."),
        match("gram-ch1-l1-c4", "Match the verb and its he/she form.", [["watch", "watches"], ["fly", "flies"], ["go", "goes"], ["have", "has"]], "Aturan -s/-es."),
        listen("gram-ch1-l1-c5", voice("The library opens at eight and closes at nine on weekdays."), "Why does the speaker use the present simple?", ["for a timetable", "for an action happening now", "for a past event"], 0, "Jadwal."),
        pick("gram-ch1-l1-c6", "Find the mistake: “My parents doesn't live in Jakarta.”", ["“doesn't” should be “don't”", "“live” should be “lives”", "no mistake"], 0, "Parents (jamak) → don't.", { hots: true }),
      ],
    },
    {
      id: "gram-ch1-l2",
      skill: "structure",
      title: "Present Continuous and Stative Verbs",
      summary: "Actions in progress, temporary situations, changing trends, and verbs that are rarely continuous.",
      sections: [
        {
          title: "Present continuous",
          blocks: [
            table(["Use", "Example"], [["happening now", "She is checking a patient's temperature."], ["temporary situation", "This month, she is working in the children's ward."], ["changing trends", "Prices are rising."], ["future arrangement", "We're meeting the doctor tomorrow."]]),
            examples([{ right: "I live in Bandung. (permanent) / I'm living with my aunt this semester. (temporary)" }, { right: "He works in a bank. (job) / He's working from home today. (temporary)" }], "Simple vs. continuous"),
          ],
        },
        {
          title: "Stative verbs",
          blocks: [
            table(["Type", "Verbs"], [["thinking", "know, believe, understand, remember, mean"], ["feeling", "like, love, hate, want, prefer, need"], ["having", "have (= own), own, belong, contain"], ["senses", "seem, look (= appear), sound, taste, smell"]]),
            warn("Beberapa verba punya **dua makna**: *I **think** it's good* (opini, stative) vs. *I'm **thinking** about it* (sedang mempertimbangkan). *She **has** a car* vs. *She's **having** lunch*."),
            tryIt(pick("gram-ch1-l2-try", "This soup ___ delicious.", ["tastes", "is tasting", "taste"], 0, "Taste (indera) = stative.")),
          ],
        },
      ],
      checkpoint: [
        pick("gram-ch1-l2-c1", "Shh! The baby ___ .", ["is sleeping", "sleeps", "sleep"], 0, "Sedang terjadi."),
        pick("gram-ch1-l2-c2", "I ___ the answer now.", ["know", "am knowing", "knowing"], 0, "Stative."),
        pick("gram-ch1-l2-c3", "Which sentence describes a temporary situation?", ["I'm staying with friends until I find a flat.", "I stay with friends every weekend.", "I live with my parents."], 0, "Sementara."),
        fill("gram-ch1-l2-c4", "Complete: We ___ (have) dinner at the moment. Can I call you back?", "We", "dinner at the moment. Can I call you back?", ["are having", "'re having"], "Have = makan → boleh continuous."),
        trPick("gram-ch1-l2-c5", "“Harga terus naik.” in English is…", ["Prices are rising.", "Prices rise always.", "Prices rising."], 0, "Tren yang sedang berubah → continuous."),
        pick("gram-ch1-l2-c6", "Which pair shows two different meanings of the same verb?", ["I think it's true. / I'm thinking about moving.", "I like tea. / I like coffee.", "She walks. / She runs."], 0, "Dua makna.", { hots: true }),
      ],
    },
    {
      id: "gram-ch1-l3",
      skill: "reading",
      title: "Present Tenses in Context",
      summary: "Reading a profile that mixes present tenses and writing your own.",
      passages: [DAY],
      sections: [
        {
          title: "Read",
          blocks: [
            { type: "passage", passage: DAY },
            audio("Listen and read", say(["woman", DAY.lines.join(" ")])),
          ],
        },
        {
          title: "Write",
          blocks: [
            tip("Gunakan **present simple** untuk rutinitas dan fakta tentang orang tersebut, dan **present continuous** untuk hal sementara atau yang sedang terjadi."),
            writing({
              id: "gram-ch1-l3-write",
              title: "A day in the life",
              prompt: "Write a short profile (100–150 words) of someone you know: their usual routine, what they believe or like, and something temporary they are doing these days.",
              image: "staff",
              minWords: 100,
              maxWords: 150,
              tips: ["He/She works as … and usually …", "He/She believes / loves …", "This month / These days, he/she is …", "Right now, …"],
              models: [{ label: "Model", text: "My uncle Budi works as a fisherman in Bitung. He usually leaves the harbour at four in the morning and returns before noon. He knows the sea very well and believes that the weather changes faster than people expect. He rarely goes out when the wind is strong. These days, however, he isn't fishing much because he is repairing his boat. Right now, he is painting it blue and white, and his son is helping him. He says the boat needs to be ready before the rainy season starts." }],
              rubric: ["I used the present simple for routines and facts.", "I used the present continuous for temporary or current actions.", "I used stative verbs correctly.", "I used frequency adverbs in the right position."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("gram-ch1-l3-c1", "Why is “she is working in the children's ward” in the continuous?", ["It is temporary.", "It is a permanent job.", "It happened yesterday."], 0, "Baris 2: this month.", { passageId: DAY.id }),
        pick("gram-ch1-l3-c2", "What is Dewi doing right now?", ["checking a patient's temperature", "sleeping", "preparing medicine", "driving home"], 0, "Baris 4.", { passageId: DAY.id }),
        fill("gram-ch1-l3-c3", "Complete from the text: She ___ that patients need the most support at night.", "She", "that patients need the most support at night.", ["believes"], "Stative verb (baris 3).", { passageId: DAY.id }),
        pickMany("gram-ch1-l3-c4", "Choose ALL sentences in the present simple.", ["Dewi works as a nurse.", "She rarely sleeps well.", "Another nurse is preparing medicine.", "She always keeps her bedroom dark."], [0, 1, 3], "Preparing = continuous.", { passageId: DAY.id }),
        pick("gram-ch1-l3-c5", "Why does Dewi keep her bedroom dark?", ["She rarely sleeps well during the day.", "She is afraid of light.", "Her colleague asked her."], 0, "Baris 5.", { passageId: DAY.id }),
        pick("gram-ch1-l3-c6", "If Dewi's colleague returns next month, which sentence will be true?", ["She will probably stop working in the children's ward.", "She will become a doctor.", "She will work during the day forever."], 0, "Inferensi dari situasi sementara.", { passageId: DAY.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "gram-ch1-post",
    title: "Chapter 1 Posttest",
    passPercent: 70,
    passages: [DAY],
    questions: [
      pick("gram-ch1-post1", "The Earth ___ around the Sun.", ["goes", "is going", "go", "went"], 0, "Fakta."),
      pick("gram-ch1-post2", "Why ___ you wearing a coat? It's hot!", ["are", "do", "is", "does"], 0, "Continuous."),
      pick("gram-ch1-post3", "I ___ your help right now.", ["need", "am needing", "needing", "needs"], 0, "Stative."),
      pick("gram-ch1-post4", "Which sentence is correct?", ["She is usually tired after work.", "She usually is tired after work.", "Usually she tired is after work."], 0, "Adverb setelah be."),
      fill("gram-ch1-post5", "Complete: The film ___ (start) at 8:30 tonight.", "The film", "at 8:30 tonight.", ["starts"], "Jadwal."),
      pick("gram-ch1-post6", "What does Dewi believe about patients at night?", ["They need the most support.", "They sleep well.", "They don't need nurses.", "They prefer music."], 0, "Baris 3.", { passageId: DAY.id }),
      trPick("gram-ch1-post7", "“Dia jarang terlambat.” in English is…", ["He is rarely late.", "He rarely is late.", "He late rarely."], 0, "Rarely setelah be."),
      pick("gram-ch1-post8", "“I'm having a car.” What is wrong?", ["“have” meaning “own” is stative: I have a car.", "It should be “I has a car.”", "Nothing is wrong."], 0, "Stative.", { hots: true }),
      listen("gram-ch1-post9", voice("Hurry up! Everyone is waiting for us."), "What is happening?", ["People are waiting now.", "People wait every day.", "People waited yesterday."], 0, "Sedang terjadi."),
      pick("gram-ch1-post10", "Choose the sentence that describes a changing trend.", ["More people are working from home these days.", "People work at home on Sundays.", "My father works at home."], 0, "Tren berubah.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Present Power",
    questions: [
      live("gram-ch1-live1", "She ___ in Bali. (permanent)", ["lives", "is living", "live", "living"], 0, "beach"),
      live("gram-ch1-live2", "Look! The bus ___ .", ["is coming", "comes", "come", "came"], 0, "bus"),
      live("gram-ch1-live3", "Stative verb:", ["know", "run", "eat", "write"], 0, "owl-think"),
      live("gram-ch1-live4", "Does he ___ tea?", ["like", "likes", "liking", "liked"], 0, "tea"),
      live("gram-ch1-live5", "study → he …", ["studies", "studys", "studyes", "study"], 0, "open-book"),
      live("gram-ch1-live6", "“Sedang hujan” =", ["It's raining", "It rains", "It rained", "It rain"], 0, "rain", true),
      live("gram-ch1-live7", "He is ___ late.", ["never", "nevers", "don't", "not never"], 0, "clock"),
      live("gram-ch1-live8", "The train ___ at 6 (timetable).", ["leaves", "is leaving now", "left", "leave"], 0, "train"),
    ],
  },
};

export const CH2: Level = {
  id: "gram-ch2",
  title: "Chapter 2 — Past Tenses",
  description: "Tell stories with the past simple, past continuous and past perfect, and talk about past habits with used to and would.",
  targetScore: "Level A2–B1+",
  cover: ["night", "lantern", "grandmother"],
  pretest: {
    id: "gram-ch2-pre",
    title: "Chapter 2 Pretest",
    passPercent: 0,
    questions: [
      pick("gram-ch2-pre1", "We ___ to Lombok last year.", ["went", "go", "have gone", "were going"], 0, "Waktu lampau spesifik."),
      pick("gram-ch2-pre2", "I ___ TV when the phone rang.", ["was watching", "watched", "watch", "had watched"], 0, "Latar → past continuous."),
      trPick("gram-ch2-pre3", "“Dulu saya tinggal di desa.” in English is…", ["I used to live in a village.", "I use to living in a village.", "I was used live in a village."], 0, "Used to + base verb."),
      pick("gram-ch2-pre4", "When we arrived, the film ___ .", ["had already started", "already started", "has already started", "is starting"], 0, "Past perfect."),
      pick("gram-ch2-pre5", "Did you ___ the email?", ["read", "readed", "reads", "reading"], 0, "Did + base verb."),
    ],
  },
  lessons: [
    {
      id: "gram-ch2-l1",
      skill: "structure",
      title: "Past Simple and Past Continuous",
      summary: "Completed events, background actions, and when/while.",
      sections: [
        {
          title: "Forms",
          blocks: [
            table(["Tense", "Use", "Example"], [["past simple", "completed actions in sequence", "He found some candles and lit them."], ["past continuous", "background / action in progress", "We were watching a film."], ["past continuous + when + past simple", "interruption", "We were watching a film when the lights went out."], ["while + past continuous", "two actions at the same time", "While my parents were cooking, we were watching TV."]]),
            table(["Common irregular verbs", ""], [["buy – bought", "find – found"], ["tell – told", "think – thought"], ["forget – forgot", "come – came"], ["sit – sat", "spend – spent"]]),
          ],
        },
        {
          title: "Practice",
          blocks: [
            pics([["tv", "was watching TV"], ["stove", "were cooking"], ["night", "lights went out"], ["lantern", "lit candles"]]),
            tryIt(pick("gram-ch2-l1-try", "While I ___ home, I saw an accident.", ["was walking", "walked", "walk"], 0, "While + past continuous.")),
          ],
        },
      ],
      checkpoint: [
        pick("gram-ch2-l1-c1", "She ___ her keys yesterday.", ["lost", "losed", "was losing", "loses"], 0, "Lose → lost."),
        pick("gram-ch2-l1-c2", "It ___ when we left the house.", ["was raining", "rained", "rains"], 0, "Latar."),
        fill("gram-ch2-l1-c3", "Complete: I ___ (not/hear) the alarm this morning.", "I", "the alarm this morning.", ["didn't hear", "did not hear"], "Didn't + base."),
        match("gram-ch2-l1-c4", "Match the verbs.", [["think", "thought"], ["buy", "bought"], ["tell", "told"], ["spend", "spent"]], "Irregular."),
        arrange("gram-ch2-l1-c5", "Put the words in order.", "What were you doing at nine last night", "Past continuous question."),
        pick("gram-ch2-l1-c6", "“When the teacher came in, the students stood up.” What happened first?", ["The teacher came in.", "The students stood up.", "Both at exactly the same moment, with no order"], 0, "Urutan simple past.", { hots: true }),
      ],
    },
    {
      id: "gram-ch2-l2",
      skill: "structure",
      title: "Past Perfect, Used to and Would",
      summary: "Earlier past events and past habits or states.",
      sections: [
        {
          title: "Past perfect",
          blocks: [
            table(["Pattern", "Example"], [["had + V3 for the earlier event", "My father found candles that he had bought the year before."], ["by the time + past simple", "By the time the power returned, we had forgotten the film."], ["after / before", "After she had finished, she left."], ["ever / never in the past", "It was the best evening we had ever spent."]]),
            examples([{ right: "When I arrived, she left. (she left after I arrived)" }, { right: "When I arrived, she had left. (she left before I arrived)" }], "Different meanings"),
          ],
        },
        {
          title: "Used to and would",
          blocks: [
            table(["Form", "Use", "Example"], [["used to + verb", "past habits and states (not now)", "My grandmother used to live in a village."], ["would + verb", "repeated past actions (not states)", "Every evening, people would tell stories."], ["didn't use to", "negative", "We didn't use to have a TV."]]),
            warn("**Would** tidak dipakai untuk keadaan: *I would live in a village* ❌ → *I used to live in a village* ✅."),
            tryIt(pick("gram-ch2-l2-try", "I ___ be afraid of the dark when I was small.", ["used to", "would", "use to"], 0, "Keadaan → used to.")),
          ],
        },
      ],
      checkpoint: [
        pick("gram-ch2-l2-c1", "By the time we reached the station, the train ___ .", ["had left", "left", "has left"], 0, "Past perfect."),
        pick("gram-ch2-l2-c2", "He ___ play football every Saturday as a child.", ["would", "had", "was"], 0, "Kebiasaan berulang."),
        fill("gram-ch2-l2-c3", "Complete: She ___ (never/see) snow before she went to Japan.", "She", "snow before she went to Japan.", ["had never seen"], "Had never + V3."),
        pick("gram-ch2-l2-c4", "Which is correct?", ["We didn't use to have a car.", "We didn't used to have a car.", "We don't used to have a car."], 0, "Didn't use to."),
        trPick("gram-ch2-l2-c5", "“Setelah dia selesai bekerja, dia pulang.” in English is…", ["After she had finished work, she went home.", "After she finished work, she had gone home.", "After she has finished work, she goes home."], 0, "Past perfect untuk yang lebih dulu."),
        pick("gram-ch2-l2-c6", "Why is “I would have long hair” wrong for a past state?", ["“Would” is not used for past states; use “used to”.", "It should be “I will have long hair.”", "It is correct."], 0, "Would vs used to.", { hots: true }),
      ],
    },
    {
      id: "gram-ch2-l3",
      skill: "reading",
      title: "Past Tenses in a Story",
      summary: "Reading a narrative with mixed past tenses and writing your own.",
      passages: [STORY],
      sections: [
        {
          title: "Read",
          blocks: [
            { type: "passage", passage: STORY },
            audio("Listen and read", say(["man", STORY.lines.join(" ")])),
          ],
        },
        {
          title: "Write",
          blocks: [
            writing({
              id: "gram-ch2-l3-write",
              title: "A memorable evening",
              prompt: "Write a short story (120–180 words) about a memorable evening. Use the past continuous for the background, the past simple for events, the past perfect at least twice, and used to or would once.",
              image: "night",
              minWords: 120,
              maxWords: 180,
              tips: ["It was … We were …ing when …", "At first, … Then, …", "… had …", "When I was younger, I used to …", "By the time …, we had …"],
              models: [{ label: "Model", text: "It was the last night of our school trip to Yogyakarta. We were walking back to the hotel when our teacher suddenly stopped. She had lost her phone, and it had all our return tickets on it. At first, everyone panicked. Then my friend Raka remembered that we had stopped at a small satay stall an hour earlier. We ran back, and the owner was waiting for us with the phone in his hand. He had kept it safe behind the counter. When I was younger, I used to think that big cities were unfriendly, but that night changed my mind. By the time we got back to the hotel, we had already decided to write the owner a thank-you card." }],
              rubric: ["I used the past continuous for background.", "I used the past simple for main events.", "I used the past perfect at least twice correctly.", "I used used to or would correctly.", "My story was clear and in order."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("gram-ch2-l3-c1", "What were the writer and sister doing when the power went off?", ["watching a film", "cooking dinner", "sleeping", "reading"], 0, "Baris 1.", { passageId: STORY.id }),
        pick("gram-ch2-l3-c2", "When had the father bought the candles?", ["the year before", "that evening", "the next day", "never"], 0, "Baris 3.", { passageId: STORY.id }),
        fill("gram-ch2-l3-c3", "Complete from the text: My grandmother, who ___ live in a village…", "My grandmother, who", "live in a village…", ["used to"], "Baris 4.", { passageId: STORY.id }),
        pickMany("gram-ch2-l3-c4", "Choose ALL verbs in the past perfect in the text.", ["hadn't come back", "had bought", "had forgotten", "were watching"], [0, 1, 2], "Were watching = past continuous.", { passageId: STORY.id }),
        pick("gram-ch2-l3-c5", "Why does the writer use “had forgotten” in line 5?", ["They forgot the film before the power returned.", "They forgot after the power returned.", "It is a present habit."], 0, "Urutan kejadian.", { passageId: STORY.id }),
        pick("gram-ch2-l3-c6", "What is the main message of the story?", ["An unexpected problem led to a special family moment.", "Power cuts are dangerous.", "Films are boring.", "Candles are expensive."], 0, "Pesan cerita.", { passageId: STORY.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "gram-ch2-post",
    title: "Chapter 2 Posttest",
    passPercent: 70,
    passages: [STORY],
    questions: [
      pick("gram-ch2-post1", "They ___ the museum last Sunday.", ["visited", "visit", "have visited", "were visit"], 0, "Simple past."),
      pick("gram-ch2-post2", "I ___ a shower when you called.", ["was having", "had", "have", "had had"], 0, "Latar."),
      pick("gram-ch2-post3", "When I got to the party, most guests ___ .", ["had gone home", "went home", "have gone home", "go home"], 0, "Past perfect."),
      pick("gram-ch2-post4", "There ___ be a cinema here, but now it's a mall.", ["used to", "would", "use to", "was used"], 0, "Keadaan lampau."),
      fill("gram-ch2-post5", "Complete: ___ you finish the report yesterday?", "", "you finish the report yesterday?", ["Did", "did"], "Did + subject + base."),
      pick("gram-ch2-post6", "What did the family do during the power cut?", ["sat in the kitchen and told stories", "went to a restaurant", "watched TV", "slept"], 0, "Baris 4.", { passageId: STORY.id }),
      trPick("gram-ch2-post7", "“Saat kami tiba, film sudah dimulai.” in English is…", ["When we arrived, the film had already started.", "When we arrived, the film already starts.", "When we had arrived, the film started."], 0, "Past perfect."),
      listen("gram-ch2-post8", voice("While I was waiting for the bus, I met an old friend."), "What was the speaker doing when she met her friend?", ["waiting for the bus", "riding the bus", "walking home"], 0, "While + past continuous."),
      pick("gram-ch2-post9", "Which sentence is wrong?", ["I would have a bicycle when I was ten.", "I used to have a bicycle when I was ten.", "I had a bicycle when I was ten."], 0, "Would tidak untuk keadaan.", { hots: true }),
      pick("gram-ch2-post10", "“It was one of the best evenings we had ever spent together.” Why the past perfect?", ["It refers to all evenings before that point in the past.", "It is a future plan.", "It describes a present habit."], 0, "Pengalaman sebelum titik lampau.", { passageId: STORY.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Past Masters",
    questions: [
      live("gram-ch2-live1", "think → past", ["thought", "thinked", "thank", "thinking"], 0, "owl-think"),
      live("gram-ch2-live2", "I was ___ when it happened.", ["sleeping", "slept", "sleep", "sleeps"], 0, "sleep"),
      live("gram-ch2-live3", "Earlier past event:", ["past perfect", "present perfect", "future", "imperative"], 0, "clock"),
      live("gram-ch2-live4", "“Dulu saya bermain gitar.” =", ["I used to play guitar.", "I use to play guitar.", "I was used to play.", "I would to play."], 0, "guitar", true),
      live("gram-ch2-live5", "Did you ___ it?", ["see", "saw", "seen", "seeing"], 0, "eye"),
      live("gram-ch2-live6", "Would is NOT for…", ["past states", "past actions", "habits", "routines"], 0, "question"),
      live("gram-ch2-live7", "While + …", ["past continuous", "past perfect", "future", "present simple"], 0, "bus"),
      live("gram-ch2-live8", "By the time she came, I ___ eaten.", ["had", "have", "was", "did"], 0, "lunch"),
    ],
  },
};
