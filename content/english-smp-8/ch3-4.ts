import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, writing } from "../kit";

// Grade 8 (SMP, Fase D). Chapter 3 — Unforgettable Moments · Chapter 4 — Legends of Nusantara

const QUAKE: Passage = {
  id: "smp8-c3-quake",
  title: "The Day the Ground Shook",
  pic: "house",
  lines: [
    "It happened on a Tuesday morning last year. I was sitting in my classroom, and Mr. Ilham was explaining a maths problem.",
    "Suddenly, the windows started to rattle and the lamps were swinging from side to side.",
    "“Earthquake! Get under your desks!” shouted Mr. Ilham. We quickly hid under our desks and held the legs tightly.",
    "While we were waiting under the desks, some books fell from the shelves. My friend Laras was crying, so I held her hand.",
    "When the shaking stopped, Mr. Ilham led us out of the building. We walked calmly to the field and didn't use the stairs near the canteen because they were damaged.",
    "We were standing in the field when a small aftershock came. Everyone screamed, but nobody was hurt.",
    "Our parents picked us up an hour later. I was still shaking when I saw my mother.",
    "I will never forget that day. It taught me how important it is to stay calm and follow safety rules.",
  ],
};

export const CH3: Level = {
  id: "smp8-ch3",
  title: "Chapter 3 — Unforgettable Moments",
  description: "Describe what was happening at a moment in the past with the past continuous, combine it with the simple past using when and while, and recount an unforgettable experience.",
  targetScore: "Structure · Listening · Writing",
  cover: ["surprised", "scared", "camera"],
  pretest: {
    id: "smp8-c3-pre",
    title: "Chapter 3 Pretest",
    passPercent: 0,
    questions: [
      pick("smp8-c3-pre1", "At 8 p.m. last night, I ___ my homework.", ["was doing", "am doing", "do", "were doing"], 0, "Kegiatan yang sedang berlangsung di masa lalu → was doing."),
      listen("smp8-c3-pre2", voice("We were having dinner when the lights went out."), "Listen. What were they doing when the lights went out?", ["having dinner", "watching TV", "sleeping", "studying"], 0, "We were having dinner."),
      trPick("smp8-c3-pre3", "“Tiba-tiba” in English is…", ["suddenly", "slowly", "usually", "finally"], 0, "Tiba-tiba = suddenly."),
      pick("smp8-c3-pre4", "They ___ football when it started to rain.", ["were playing", "was playing", "play", "are playing"], 0, "They → were."),
      pick("smp8-c3-pre5", "During an earthquake inside a classroom, you should…", ["get under your desk", "use the lift", "stand near the window", "run up the stairs"], 0, "Berlindung di bawah meja."),
    ],
  },
  lessons: [
    {
      id: "smp8-c3-l1",
      skill: "structure",
      title: "The Past Continuous",
      summary: "was/were + verb-ing for actions in progress in the past.",
      sections: [
        {
          title: "Form and use",
          blocks: [
            table(["", "I / He / She / It", "You / We / They"], [["Positive", "I was reading.", "They were reading."], ["Negative", "She wasn't listening.", "We weren't listening."], ["Question", "Was he sleeping?", "Were you sleeping?"], ["Short answer", "Yes, he was. / No, he wasn't.", "Yes, we were. / No, we weren't."]]),
            text("Past continuous dipakai untuk kegiatan yang **sedang berlangsung** pada waktu tertentu di masa lalu (*At 9 p.m. yesterday, I was watching a movie.*) dan untuk **latar cerita** (*The sun was shining and the birds were singing.*)."),
            repeat(["At seven o'clock, I was having breakfast.", "What were you doing at midnight?", "The birds were singing and the sun was shining."]),
          ],
        },
        {
          title: "What were they doing?",
          blocks: [
            pics([["sleep", "Dad was sleeping."], ["tv", "Rina was watching TV."], ["stove", "Mom was cooking."], ["gamepad", "The twins were playing games."]], "At 8 p.m. yesterday…"),
            audio("A police question", say(["man", "Where were you at nine o'clock last night?"], ["woman", "I was at home. I was helping my son with his homework."], ["man", "And what was your husband doing?"], ["woman", "He was fixing the motorbike in the garage."])),
            tryIt(pick("smp8-c3-l1-try1", "What was the husband doing at nine?", ["fixing the motorbike", "helping with homework", "sleeping"], 0, "He was fixing the motorbike.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp8-c3-l1-c1", voice("At midnight, everyone was sleeping except my grandfather. He was listening to the radio."), "Listen. What was the grandfather doing?", ["listening to the radio", "sleeping", "watching TV"], 0, "He was listening to the radio."),
        pick("smp8-c3-l1-c2", "What ___ you doing at 10 a.m. yesterday?", ["were", "was", "did"], 0, "You → were."),
        fill("smp8-c3-l1-c3", "Complete: My sister ___ (not/study). She was chatting with her friends.", "My sister", ". She was chatting with her friends.", ["wasn't studying", "was not studying"], "She → wasn't studying."),
        arrange("smp8-c3-l1-c4", "Put the words in order.", "The children were swimming in the river", "Were + verb-ing."),
        trPick("smp8-c3-l1-c5", "“Pukul 7 kemarin, kami sedang sarapan.” in English is…", ["At seven yesterday, we were having breakfast.", "At seven yesterday, we have breakfast.", "At seven yesterday, we was having breakfast."], 0, "We were having."),
        pick("smp8-c3-l1-c6", "Which sentence describes the background of a story?", ["The wind was blowing and the waves were crashing.", "Then he opened the door.", "Finally, they went home."], 0, "Latar suasana → past continuous.", { hots: true }),
      ],
    },
    {
      id: "smp8-c3-l2",
      skill: "listening",
      title: "When and While",
      summary: "A longer action interrupted by a short one; two actions at the same time.",
      sections: [
        {
          title: "Interrupted actions",
          blocks: [
            table(["Pattern", "Example"], [["past continuous + when + simple past", "I was walking home when it started to rain."], ["When + simple past, past continuous", "When the phone rang, I was taking a shower."], ["While + past continuous, simple past", "While we were waiting, the bus arrived."], ["while + past continuous (two long actions)", "While Mom was cooking, Dad was cleaning the car."]]),
            tip("Ingat: **when** biasanya diikuti kejadian **singkat** (simple past), sedangkan **while** diikuti kegiatan **panjang** (past continuous)."),
            examples([{ wrong: "While I walked home, I was seeing an accident.", right: "While I was walking home, I saw an accident." }, { wrong: "When the bell was ringing, we ran out.", right: "When the bell rang, we ran out." }]),
          ],
        },
        {
          title: "Little accidents",
          blocks: [
            audio("Clumsy days", say(["woman", "What happened to your arm, Bayu?"], ["man", "I fell off my bike. I was riding to school when a cat ran in front of me."], ["woman", "Oh no! Did you hit the cat?"], ["man", "No, I didn't. I braked, but I fell. While I was lying on the road, a kind lady helped me up."], ["woman", "I'm glad you're okay. Please be careful!"])),
            tryIt(pick("smp8-c3-l2-try1", "Why did Bayu fall?", ["A cat ran in front of him.", "His bike was broken.", "He was riding too fast."], 0, "A cat ran in front of me.")),
            speaking({
              id: "smp8-c3-l2-say",
              title: "A funny or scary moment",
              prompt: "Tell a short story about a funny, scary or embarrassing moment. Use the past continuous for the background and the simple past for what happened. Use when and while.",
              image: "surprised",
              seconds: 75,
              tips: ["It happened …", "I was … when suddenly …", "While I was …, …", "In the end, …", "I felt …"],
              models: [{ label: "Example", text: "It happened during a school assembly last year. The headmaster was giving a long speech, and the sun was shining very brightly. I was standing in the front row when I suddenly felt dizzy. While I was trying to stay awake, my legs became weak and I fell down! Two friends carried me to the school clinic. The nurse gave me some sweet tea, and I felt better. It was embarrassing, but now I always eat breakfast before school." }],
              rubric: ["I set the scene with the past continuous.", "I used when and while correctly.", "I used the simple past for main events.", "I said how I felt and what I learned."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("smp8-c3-l2-c1", voice("While I was cooking noodles, my brother ate all the fried chicken."), "Listen. What did the brother do?", ["ate all the fried chicken", "cooked noodles", "went out"], 0, "He ate all the fried chicken."),
        pick("smp8-c3-l2-c2", "I was taking a shower ___ the water stopped.", ["when", "while", "during"], 0, "Kejadian singkat → when."),
        pick("smp8-c3-l2-c3", "___ she was studying, her cat jumped on the keyboard.", ["While", "When", "During"], 0, "While + kegiatan panjang."),
        fill("smp8-c3-l2-c4", "Complete: We were watching TV when the lights ___ (go) out.", "We were watching TV when the lights", "out.", ["went"], "Go → went."),
        trPick("smp8-c3-l2-c5", "“Saat aku sedang menunggu, bus datang.” in English is…", ["While I was waiting, the bus came.", "While I waited, the bus was coming.", "When I was wait, the bus come."], 0, "While + past continuous, simple past."),
        pick("smp8-c3-l2-c6", "“When the teacher came in, the students were talking.” What happened FIRST?", ["The students started talking.", "The teacher came in.", "They happened at the same time and stopped."], 0, "Murid sudah berbicara sebelum guru masuk.", { hots: true }),
      ],
    },
    {
      id: "smp8-c3-l3",
      skill: "reading",
      title: "Reading: The Day the Ground Shook",
      summary: "Read a dramatic recount and write about an unforgettable moment.",
      passages: [QUAKE],
      sections: [
        {
          title: "An earthquake at school",
          blocks: [
            { type: "passage", passage: QUAKE },
            audio("Listen and read", say(["woman", QUAKE.lines.join(" ")])),
            vocab([["rattle", "bergetar/berderak", "window"], ["swing", "berayun", "lantern"], ["aftershock", "gempa susulan", "scared"], ["damaged", "rusak", "house"]], "Words from the text"),
            table(["Earthquake safety", "Meaning"], [["Drop, cover and hold on.", "Merunduk, berlindung, berpegangan."], ["Stay away from windows.", "Jauhi jendela."], ["Don't use the lift.", "Jangan pakai lift."], ["Go to an open area.", "Pergi ke tempat terbuka."]]),
          ],
        },
        {
          title: "Your unforgettable moment",
          blocks: [
            tryIt(pick("smp8-c3-l3-try1", "What was Mr. Ilham doing when the earthquake started?", ["explaining a maths problem", "reading a book", "having breakfast"], 0, "Baris 1.", { passageId: QUAKE.id })),
            writing({
              id: "smp8-c3-l3-write",
              title: "An unforgettable moment",
              prompt: "Write a recount of an unforgettable moment (exciting, scary, funny or touching). Include background details with the past continuous and at least two sentences with when or while.",
              image: "camera",
              minWords: 120,
              maxWords: 250,
              tips: ["Orientation: It happened … I was …", "Events: Suddenly, … While …, … When …, …", "Feelings: I felt …", "Re-orientation: I will never forget … It taught me …"],
              models: [{ label: "Example", text: "It happened during our family holiday in Labuan Bajo last December. We were sailing on a small boat to Padar Island, and the sea was calm and blue.\nWhile my father was taking photos, my little sister pointed at the water and shouted, “Look! Something big!” A huge manta ray was swimming right next to our boat. A few minutes later, three more manta rays appeared. When the guide saw them, he told us to put on our snorkels. I jumped into the water and swam with them. They were moving so gracefully, like giant birds flying under the sea.\nI was a little scared at first, but soon I felt amazed. It was the most beautiful moment of my life, and it made me want to protect our oceans." }],
              rubric: ["I set the scene with the past continuous.", "I used at least two sentences with when or while.", "Events are in a clear order.", "I described my feelings.", "I ended with a reflection."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("smp8-c3-l3-c1", "What did the students do first when the earthquake started?", ["hid under their desks", "ran outside", "called their parents"], 0, "Baris 3.", { passageId: QUAKE.id }),
        pick("smp8-c3-l3-c2", "Why didn't they use the stairs near the canteen?", ["They were damaged.", "They were too far.", "They were locked."], 0, "Baris 5.", { passageId: QUAKE.id }),
        fill("smp8-c3-l3-c3", "Complete.", "My friend Laras was crying, so I held her", ".", ["hand"], "Baris 4.", { passageId: QUAKE.id }),
        pickMany("smp8-c3-l3-c4", "Choose ALL the sentences with the past continuous.", ["I was sitting in my classroom.", "We were standing in the field.", "Our parents picked us up.", "We quickly hid under our desks."], [0, 1], "Was sitting, were standing.", { passageId: QUAKE.id }),
        pick("smp8-c3-l3-c5", "What does the writer's action in line 4 show about him or her?", ["caring and brave", "selfish", "careless"], 0, "Menggenggam tangan temannya yang menangis.", { passageId: QUAKE.id, hots: true }),
        pick("smp8-c3-l3-c6", "Why was nobody hurt, according to the text?", ["They stayed calm and followed safety rules.", "The earthquake was very small.", "They were not at school."], 0, "Baris 5 dan 8.", { passageId: QUAKE.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp8-c3-post",
    title: "Chapter 3 Posttest",
    passPercent: 70,
    passages: [QUAKE],
    questions: [
      pick("smp8-c3-post1", "I ___ a novel when you called me.", ["was reading", "were reading", "read", "am reading"], 0, "I → was reading."),
      listen("smp8-c3-post2", say(["man", "Why didn't you answer my message?"], ["woman", "Sorry! I was riding my motorbike. I didn't hear my phone."]), "Listen. Why didn't she answer?", ["She was riding her motorbike.", "She was sleeping.", "She lost her phone.", "She was angry."], 0, "I was riding my motorbike."),
      trPick("smp8-c3-post3", "“Gempa susulan” in English is…", ["aftershock", "earthquake", "afterlife", "landslide"], 0, "Aftershock."),
      pick("smp8-c3-post4", "While Dad ___ the car, it started to rain.", ["was washing", "washed", "washes", "were washing"], 0, "While + past continuous."),
      arrange("smp8-c3-post5", "Put the words in order.", "What were you doing at nine last night", "What were you doing …?"),
      pick("smp8-c3-post6", "What happened while they were standing in the field?", ["A small aftershock came.", "Their parents arrived.", "The building fell down.", "It started to rain."], 0, "Baris 6.", { passageId: QUAKE.id }),
      match("smp8-c3-post7", "Match the beginning and the end.", [["I was sleeping", "when the alarm rang."], ["While she was cooking,", "the gas ran out."], ["We were walking home", "when we saw a rainbow."]], "When dan while."),
      fill("smp8-c3-post8", "Complete: They ___ (play) badminton when the net broke.", "They", "badminton when the net broke.", ["were playing"], "They → were playing."),
      pick("smp8-c3-post9", "In line 2, the lamps “were swinging from side to side”. What does this tell the reader?", ["The shaking was strong.", "There was a party.", "The wind was blowing.", "Someone pushed them."], 0, "Lampu berayun = guncangan kuat.", { passageId: QUAKE.id, hots: true }),
      pick("smp8-c3-post10", "What is the best lesson from the text?", ["Stay calm and follow safety rules in a disaster.", "Never go to school on Tuesday.", "Maths is dangerous.", "Always run to the stairs."], 0, "Baris 8.", { passageId: QUAKE.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Freeze Frame!",
    questions: [
      live("smp8-c3-live1", "They ___ sleeping.", ["were", "was", "is", "did"], 0, "sleep"),
      live("smp8-c3-live2", "Short sudden action word:", ["when", "while", "during", "as long as"], 0, "surprised"),
      live("smp8-c3-live3", "I was cooking ___ the gas ran out.", ["when", "while", "and", "so"], 0, "stove"),
      live("smp8-c3-live4", "“Tiba-tiba” =", ["suddenly", "finally", "usually", "slowly"], 0, "scared", true),
      live("smp8-c3-live5", "Earthquake: Drop, cover and…", ["hold on", "run away", "jump", "shout"], 0, "desk"),
      live("smp8-c3-live6", "___ you watching TV?", ["Were", "Was", "Did", "Do"], 0, "tv"),
      live("smp8-c3-live7", "Go → past:", ["went", "goed", "gone", "going"], 0, "run"),
      live("smp8-c3-live8", "Background of a story uses…", ["past continuous", "future", "imperative", "present perfect"], 0, "open-book"),
    ],
  },
};

const TOBA: Passage = {
  id: "smp8-c4-toba",
  title: "The Legend of Lake Toba",
  pic: "fish",
  lines: [
    "Long ago, in North Sumatra, there lived a young farmer named Toba. He lived alone and worked hard in his field.",
    "One day, Toba went fishing in the river and caught a big golden fish. When he got home, the fish suddenly turned into a beautiful woman.",
    "The woman agreed to marry him, but she gave him one condition: “You must never tell anyone that I was a fish.” Toba promised.",
    "They lived happily and had a son named Samosir. However, Samosir was a lazy boy and always very hungry.",
    "One afternoon, Samosir was taking lunch to his father in the field, but on the way he ate almost all of it.",
    "Toba was hungry and tired. When he saw the empty lunch box, he became very angry and shouted, “You greedy child of a fish!”",
    "Samosir ran home crying and told his mother. She was very sad because Toba had broken his promise. She told Samosir to run to the hill.",
    "Then the sky turned dark and heavy rain fell. Water came out of the ground and covered the whole valley. It became Lake Toba, and the hill where Samosir stood became Samosir Island.",
  ],
};

export const CH4: Level = {
  id: "smp8-ch4",
  title: "Chapter 4 — Legends of Nusantara",
  description: "Read and retell legends from Indonesia, identify orientation, complication and resolution, use time connectors and direct speech, and find moral values.",
  targetScore: "Reading · Speaking · Writing",
  cover: ["mountain", "island", "fish"],
  pretest: {
    id: "smp8-c4-pre",
    title: "Chapter 4 Pretest",
    passPercent: 0,
    questions: [
      pick("smp8-c4-pre1", "A legend is a story that…", ["explains the origin of a place, often with magic", "gives instructions", "reports scientific facts", "describes a product"], 0, "Legenda menjelaskan asal-usul tempat."),
      listen("smp8-c4-pre2", voice("Malin Kundang refused to recognise his mother, so she cursed him and he turned into stone."), "Listen. What happened to Malin Kundang?", ["He turned into stone.", "He became a king.", "He married a princess.", "He became a fish."], 0, "He turned into stone."),
      trPick("smp8-c4-pre3", "“Durhaka” (to parents) in English is closest to…", ["disobedient / ungrateful", "obedient", "generous", "honest"], 0, "Durhaka ≈ disobedient/ungrateful."),
      pick("smp8-c4-pre4", "Which is the best opening for a legend?", ["Long ago, there lived …", "First, cut the paper …", "Dear Sir, …", "Attention, please …"], 0, "Pembuka narrative."),
      pick("smp8-c4-pre5", "Lake Toba is in…", ["North Sumatra", "West Java", "Bali", "Papua"], 0, "Sumatera Utara."),
    ],
  },
  lessons: [
    {
      id: "smp8-c4-l1",
      skill: "reading",
      title: "Reading: The Legend of Lake Toba",
      summary: "A famous legend from North Sumatra: plot, characters and moral value.",
      passages: [TOBA],
      sections: [
        {
          title: "The legend",
          blocks: [
            { type: "passage", passage: TOBA },
            audio("Listen to the legend", say(["narrator", TOBA.lines.slice(0, 4).join(" ")], ["narrator", TOBA.lines.slice(4).join(" ")])),
            vocab([["condition", "syarat", "question"], ["promise", "janji", "hand"], ["greedy", "rakus/serakah", "lunch"], ["valley", "lembah", "mountain"], ["turn into", "berubah menjadi", "fish"]], "Story words"),
          ],
        },
        {
          title: "Narrative structure",
          blocks: [
            table(["Part", "Function", "In the legend"], [["Orientation", "tokoh, tempat, waktu", "line 1"], ["Complication", "konflik yang memuncak", "lines 5–7: Toba breaks his promise"], ["Resolution", "akhir cerita", "line 8: the lake and the island appear"], ["Moral value", "pesan", "Keep your promises. Control your anger."]]),
            text("Legenda umumnya memakai **simple past**, **time connectors** (*long ago, one day, then, suddenly*), **action verbs** (*caught, shouted, ran*), dan **direct speech**."),
            tryIt(pick("smp8-c4-l1-try1", "What was the woman's condition?", ["Toba must never say she was a fish.", "Toba must give her gold.", "Toba must move to the city."], 0, "Baris 3.", { passageId: TOBA.id })),
          ],
        },
      ],
      checkpoint: [
        pick("smp8-c4-l1-c1", "What did Toba catch?", ["a big golden fish", "a turtle", "a crocodile"], 0, "Baris 2.", { passageId: TOBA.id }),
        pick("smp8-c4-l1-c2", "Why was Toba angry?", ["Samosir ate almost all of his lunch.", "His wife left him.", "His field was flooded."], 0, "Baris 5–6.", { passageId: TOBA.id }),
        fill("smp8-c4-l1-c3", "Complete.", "the hill where Samosir stood became Samosir", ".", ["Island"], "Baris 8.", { passageId: TOBA.id }),
        pickMany("smp8-c4-l1-c4", "Choose ALL the words that describe Samosir.", ["lazy", "hungry", "hard-working", "honest"], [0, 1], "Baris 4.", { passageId: TOBA.id }),
        pick("smp8-c4-l1-c5", "Which line is the turning point (the climax) of the story?", ["line 6", "line 2", "line 4"], 0, "Baris 6: Toba melanggar janji.", { passageId: TOBA.id, hots: true }),
        pick("smp8-c4-l1-c6", "Which moral value fits the legend BEST?", ["Keep your promises, even when you are angry.", "Fish are dangerous.", "Never go fishing."], 0, "Pelanggaran janji membawa bencana.", { passageId: TOBA.id, hots: true }),
      ],
    },
    {
      id: "smp8-c4-l2",
      skill: "structure",
      title: "Storytelling Language",
      summary: "Time connectors, reported and direct speech, and adverbs of manner.",
      sections: [
        {
          title: "Connectors and adverbs",
          blocks: [
            table(["Time connectors", "Contrast and cause"], [["Long ago, Once upon a time", "However, …"], ["One day, One morning", "but, although"], ["Then, After that, Later", "because, so"], ["Suddenly, Immediately", "As a result, …"], ["Finally, In the end", "Since then, …"]]),
            table(["Adjective", "Adverb of manner", "Example"], [["quick", "quickly", "She ran quickly to the hill."], ["angry", "angrily", "He shouted angrily."], ["sad", "sadly", "She looked at him sadly."], ["happy", "happily", "They lived happily."], ["good", "well", "He worked well."], ["hard / fast", "hard / fast", "He worked hard."]]),
          ],
        },
        {
          title: "Direct speech",
          blocks: [
            examples([{ right: "“You must never tell anyone,” she said.", note: "Koma di dalam tanda kutip sebelum said." }, { right: "Toba shouted, “You greedy child!”", note: "Koma setelah shouted, tanda kutip membuka ucapan." }, { wrong: "“Help” cried the boy.", right: "“Help!” cried the boy." }], "Punctuation"),
            audio("Another legend: Sangkuriang", say(["narrator", "Long ago, Dayang Sumbi agreed to marry Sangkuriang, but she gave him a condition."], ["woman", "“You must build a big lake and a boat in one night, before the sun rises.”"], ["narrator", "Sangkuriang worked very hard with the help of spirits. When Dayang Sumbi saw that he was almost finished, she asked the village women to make the roosters crow early."], ["man", "“The sun is rising? I have failed!” shouted Sangkuriang angrily. He kicked the boat, and it fell upside down. It became Mount Tangkuban Perahu."])),
            tryIt(pick("smp8-c4-l2-try1", "What did the boat become?", ["Mount Tangkuban Perahu", "Lake Toba", "Samosir Island"], 0, "Gunung Tangkuban Perahu.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp8-c4-l2-c1", voice("Sangkuriang kicked the boat angrily, and it fell upside down."), "Listen. How did Sangkuriang kick the boat?", ["angrily", "happily", "slowly"], 0, "Angrily."),
        pick("smp8-c4-l2-c2", "The old woman walked ___ because her leg hurt.", ["slowly", "slow", "slower"], 0, "Adverb → slowly."),
        match("smp8-c4-l2-c3", "Match the adjective and the adverb.", [["happy", "happily"], ["good", "well"], ["careful", "carefully"], ["fast", "fast"]], "Adverb of manner."),
        fill("smp8-c4-l2-c4", "Complete: ___ then, people call the lake Lake Toba.", "", "then, people call the lake Lake Toba.", ["Since", "since"], "Sejak saat itu = since then."),
        trPick("smp8-c4-l2-c5", "“Akibatnya, desa itu tenggelam.” in English is…", ["As a result, the village sank.", "However, the village sank.", "Although the village sank."], 0, "As a result."),
        pick("smp8-c4-l2-c6", "Which sentence is punctuated correctly?", ["“I'm sorry,” said Malin.", "“I'm sorry” said Malin.", "I'm sorry, “said Malin.”"], 0, "Koma di dalam tanda kutip.", { hots: true }),
      ],
    },
    {
      id: "smp8-c4-l3",
      skill: "speaking",
      title: "Retell a Legend",
      summary: "Retell a legend from your region and write your own version.",
      sections: [
        {
          title: "Storytelling",
          blocks: [
            pics([["mountain", "Tangkuban Perahu"], ["island", "Samosir Island"], ["ship", "Malin Kundang's ship"], ["komodo", "Putri Naga (Komodo legend)"]], "Legends from around Nusantara"),
            tip("Saat bercerita: ubah **intonasi** untuk tiap tokoh, beri **jeda** sebelum bagian menegangkan, dan tatap pendengar."),
            speaking({
              id: "smp8-c4-l3-say",
              title: "Storytelling time",
              prompt: "Retell a legend from your region (or Lake Toba, Malin Kundang, Sangkuriang, Roro Jonggrang…). Include an orientation, the complication, the resolution and the moral value. Use at least two lines of direct speech with expressive voices.",
              image: "owl-read",
              prepSeconds: 60,
              seconds: 120,
              tips: ["Long ago, in …, there lived …", "One day, …", "Suddenly, … “…!” shouted …", "In the end, …", "The moral of the story is …"],
              models: [{ label: "Example", text: "Long ago, in West Sumatra, there lived a poor widow and her son, Malin Kundang. One day, Malin sailed away to find a better life. Years later, he became a rich merchant and married a beautiful woman. One day, his ship stopped at his home village. His old mother ran to the beach and hugged him. “Malin, my son! You've come home!” she cried. But Malin was ashamed of her poor clothes. “I don't know this old woman!” he shouted, and he pushed her away. His mother was heartbroken. She prayed, “If he is really my son, turn him into stone.” Suddenly, a storm came, and Malin turned into a stone on the beach. The moral of the story is: never forget and never hurt your parents." }],
              rubric: ["I included orientation, complication and resolution.", "I used time connectors and the simple past.", "I used direct speech with expressive voices.", "I stated the moral value clearly."],
            }),
          ],
        },
        {
          title: "Write a legend",
          blocks: [
            writing({
              id: "smp8-c4-l3-write",
              title: "A legend from my region",
              prompt: "Write a legend from your region in English (or invent a legend that explains the origin of a place near you). Include all parts of a narrative and the moral value.",
              image: "mountain",
              minWords: 150,
              maxWords: 300,
              tips: ["Orientation: Long ago, in …, there lived …", "Complication: One day, … However, …", "Climax: Suddenly, … “…,” … shouted angrily.", "Resolution: In the end, … Since then, …", "Moral value: …"],
              models: [{ label: "Example", text: "The Legend of Roro Jonggrang\nLong ago, in Central Java, there was a beautiful princess named Roro Jonggrang. A powerful man named Bandung Bondowoso defeated her father's kingdom and wanted to marry her.\nRoro Jonggrang didn't want to marry him, but she was afraid. So she gave him an impossible condition. “I will marry you if you can build a thousand temples in one night,” she said.\nBandung Bondowoso agreed. With the help of spirits, he built the temples very quickly. Before dawn, he had built nine hundred and ninety-nine temples. Roro Jonggrang panicked. She woke the village women and asked them to pound rice and burn straw. The spirits thought the sun was rising, so they ran away.\nWhen Bandung Bondowoso learned about the trick, he was furious. “You cheated me! You will be the last temple!” he shouted. Suddenly, Roro Jonggrang turned into a stone statue.\nSince then, people believe the statue in Prambanan Temple is Roro Jonggrang.\nMoral value: Be honest, and don't use tricks to escape a problem." }],
              rubric: ["My legend has orientation, complication and resolution.", "I used the simple past and time connectors.", "I used direct speech with correct punctuation.", "I used adverbs of manner.", "I stated a moral value."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("smp8-c4-l3-c1", "Why did Malin Kundang deny his mother?", ["He was ashamed of her poor clothes.", "He didn't see her.", "She was angry with him."], 0, "Malu karena ibunya miskin."),
        pick("smp8-c4-l3-c2", "How many temples did Bandung Bondowoso build before dawn?", ["999", "1,000", "99"], 0, "Sembilan ratus sembilan puluh sembilan."),
        arrange("smp8-c4-l3-c3", "Put the words in order.", "Long ago there lived a poor widow", "Pembuka legenda."),
        fill("smp8-c4-l3-c4", "Complete: The moral ___ of the story is: be honest.", "The moral", "of the story is: be honest.", ["value"], "Moral value = pesan moral."),
        trPick("smp8-c4-l3-c5", "“Berubah menjadi batu” in English is…", ["turned into stone", "turned on stone", "turned to stoned"], 0, "Turn into."),
        pick("smp8-c4-l3-c6", "What do the legends of Malin Kundang, Lake Toba and Roro Jonggrang have in common?", ["A character is punished at the end.", "They all happen in Bali.", "They all have happy endings."], 0, "Ada tokoh yang dihukum.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp8-c4-post",
    title: "Chapter 4 Posttest",
    passPercent: 70,
    passages: [TOBA],
    questions: [
      pick("smp8-c4-post1", "The princess smiled ___ at the prince.", ["happily", "happy", "happiness", "happier"], 0, "Adverb → happily."),
      listen("smp8-c4-post2", voice("Long ago, a giant lived on the mountain. Every night, he walked down to the village to steal rice."), "Listen. What did the giant steal?", ["rice", "gold", "chickens", "children"], 0, "To steal rice."),
      trPick("smp8-c4-post3", "“Janji” in English is…", ["promise", "premise", "prize", "price"], 0, "Janji = promise."),
      pick("smp8-c4-post4", "Which part of a legend tells how the problem ends?", ["resolution", "orientation", "complication", "title"], 0, "Penyelesaian."),
      arrange("smp8-c4-post5", "Put the words in order.", "The fish turned into a beautiful woman", "Turn into = berubah menjadi."),
      pick("smp8-c4-post6", "What was the name of Toba's son?", ["Samosir", "Sangkuriang", "Malin", "Bandung"], 0, "Baris 4.", { passageId: TOBA.id }),
      match("smp8-c4-post7", "Match the legend and the place.", [["Toba", "North Sumatra"], ["Malin Kundang", "West Sumatra"], ["Sangkuriang", "West Java"], ["Roro Jonggrang", "Central Java"]], "Asal legenda."),
      fill("smp8-c4-post8", "Complete.", "She was very sad because Toba had broken his", ".", ["promise"], "Baris 7.", { passageId: TOBA.id }),
      pick("smp8-c4-post9", "Why did the mother tell Samosir to run to the hill?", ["She knew a disaster was coming.", "She wanted him to find food.", "She was angry with him.", "She wanted him to meet his father."], 0, "Ia tahu bencana akan datang (baris 7–8).", { passageId: TOBA.id, hots: true }),
      pick("smp8-c4-post10", "Which character do you think is MOST responsible for the disaster, and why?", ["Toba, because he broke his promise.", "The fish, because it could talk.", "The rain, because it was heavy.", "The farmer's field."], 0, "Pelanggaran janji adalah pemicunya.", { passageId: TOBA.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Legend Quest",
    questions: [
      live("smp8-c4-live1", "Lake Toba is in…", ["North Sumatra", "Bali", "Papua", "Java"], 0, "fish"),
      live("smp8-c4-live2", "Malin Kundang became…", ["stone", "a fish", "a king", "a bird"], 0, "ship"),
      live("smp8-c4-live3", "angry → …", ["angrily", "angryly", "angrier", "anger"], 0, "angry"),
      live("smp8-c4-live4", "“Janji” =", ["promise", "price", "prison", "prize"], 0, "hand", true),
      live("smp8-c4-live5", "Climax/problem part:", ["complication", "orientation", "resolution", "moral"], 0, "question"),
      live("smp8-c4-live6", "Tangkuban Perahu is from the story of…", ["Sangkuriang", "Malin Kundang", "Toba", "Kancil"], 0, "mountain"),
      live("smp8-c4-live7", "Temples in Roro Jonggrang:", ["Prambanan", "Borobudur", "Bromo", "Monas"], 0, "museum"),
      live("smp8-c4-live8", "good → adverb", ["well", "goodly", "better", "best"], 0, "thumbs-up"),
    ],
  },
};
