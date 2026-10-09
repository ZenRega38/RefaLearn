import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trMatch, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 5 (Fase C). Chapter 5 — My Last Holiday · Chapter 6 — Finding the Way

const HOLIDAY: Passage = {
  id: "sd5-c5-bali",
  title: "My Holiday in Yogyakarta",
  pic: "plane",
  lines: [
    "Last December, my family visited Yogyakarta for four days.",
    "We travelled by train from Jakarta. The trip was long but fun.",
    "On the first day, we visited Borobudur Temple. It was huge and beautiful!",
    "On the second day, we walked along Malioboro Street and bought some batik.",
    "My little brother cried because he wanted a toy, so Dad bought him a small wooden car.",
    "On the last day, we watched a traditional dance. I loved the music.",
    "I was tired when we arrived home, but I was very happy.",
  ],
};

export const CH5: Level = {
  id: "sd5-ch5",
  title: "Chapter 5 — My Last Holiday",
  description: "Tell about past events with the simple past (visited, played, was, were), use time words, and write a holiday recount.",
  targetScore: "Reading · Writing · Speaking",
  cover: ["plane", "beach", "camera"],
  pretest: {
    id: "sd5-c5-pre",
    title: "Chapter 5 Pretest",
    passPercent: 0,
    questions: [
      pick("sd5-c5-pre1", "Yesterday I ___ football.", ["played", "play", "playing", "plays"], 0, "Yesterday (kemarin) → bentuk lampau: played."),
      listen("sd5-c5-pre2", voice("Last week, we visited the zoo."), "Listen. When did they visit the zoo?", ["last week", "next week", "today"], 0, "Last week = minggu lalu."),
      trPick("sd5-c5-pre3", "“Liburan” in English is…", ["holiday", "homework", "hobby", "history"], 0, "Liburan = holiday."),
      pick("sd5-c5-pre4", "I ___ happy yesterday.", ["was", "were", "am", "is"], 0, "I + was (lampau)."),
      pick("sd5-c5-pre5", "Which word talks about the PAST?", ["yesterday", "tomorrow", "now", "next year"], 0, "Yesterday = kemarin."),
    ],
  },
  lessons: [
    {
      id: "sd5-c5-l1",
      skill: "structure",
      title: "Simple Past: -ed Verbs",
      summary: "Regular past verbs: visited, played, watched, stayed, cooked.",
      sections: [
        {
          title: "Yesterday, last week, last year",
          blocks: [
            text("Untuk menceritakan kejadian yang **sudah lewat**, kata kerjanya berubah ke bentuk lampau (**past**). Kata kerja beraturan cukup ditambah **-ed**."),
            table(["Now", "Past", "Rule"], [["play", "played", "+ ed"], ["visit", "visited", "+ ed"], ["watch", "watched", "+ ed"], ["dance", "danced", "+ d (ends in e)"], ["study", "studied", "y → ied"], ["stop", "stopped", "double the last letter"]]),
            table(["Past time words", "Meaning"], [["yesterday", "kemarin"], ["last night", "tadi malam"], ["last week", "minggu lalu"], ["last holiday", "liburan lalu"], ["two days ago", "dua hari yang lalu"]]),
          ],
        },
        {
          title: "How to say -ed",
          blocks: [
            text("Akhiran **-ed** punya tiga bunyi:\n\n- /t/ setelah bunyi p, k, s, sh, ch: *walk**ed**, watch**ed***\n- /d/ setelah bunyi lain: *play**ed**, stay**ed***\n- /ɪd/ setelah t atau d: *visit**ed**, need**ed***"),
            repeat(["walked", "watched", "played", "stayed", "visited", "wanted"]),
            tryIt(pick("sd5-c5-l1-try1", "Last night, I ___ TV with my family.", ["watched", "watch", "watching"], 0, "Last night → watched.", { image: "tv" })),
          ],
        },
      ],
      checkpoint: [
        pick("sd5-c5-l1-c1", "Yesterday, she ___ her grandmother.", ["visited", "visit", "visits"], 0, "Yesterday → visited."),
        fill("sd5-c5-l1-c2", "Complete: I ___ (study) English last night.", "I", "English last night.", ["studied"], "Study → studied (y → ied)."),
        match("sd5-c5-l1-c3", "Match the verb and its past form.", [["dance", "danced"], ["stop", "stopped"], ["cry", "cried"], ["cook", "cooked"]], "Bagus!"),
        listen("sd5-c5-l1-c4", voice("We stayed at a hotel near the beach."), "Listen. Where did they stay?", ["at a hotel near the beach", "at home", "in a tent"], 0, "Stayed at a hotel."),
        trPick("sd5-c5-l1-c5", "“Dua hari yang lalu” in English is…", ["two days ago", "two days later", "last two day"], 0, "Yang lalu = ago."),
        pick("sd5-c5-l1-c6", "Which sentence is about the PAST?", ["We cooked fried rice last night.", "We cook fried rice every day.", "We will cook fried rice."], 0, "Last night + cooked → lampau.", { hots: true }),
      ],
    },
    {
      id: "sd5-c5-l2",
      skill: "structure",
      title: "Was, Were and Irregular Verbs",
      summary: "was/were; went, ate, saw, bought, had, made; Did you…?",
      sections: [
        {
          title: "Was and were",
          blocks: [
            table(["Present", "Past", "Example"], [["I am", "I was", "I was tired."], ["He/She/It is", "He/She/It was", "It was beautiful."], ["You/We/They are", "You/We/They were", "We were happy."]]),
            text("Kalimat negatif: **wasn't / weren't**. Pertanyaan: **Was it fun? — Yes, it was.**"),
          ],
        },
        {
          title: "Irregular verbs",
          blocks: [
            warn("Beberapa kata kerja **tidak** memakai -ed. Bentuknya harus dihafal!"),
            table(["Now", "Past", "Meaning"], [["go", "went", "pergi"], ["eat", "ate", "makan"], ["see", "saw", "melihat"], ["buy", "bought", "membeli"], ["have", "had", "punya / makan"], ["make", "made", "membuat"], ["swim", "swam", "berenang"], ["take", "took", "mengambil / naik"]]),
            repeat(["I went to the beach.", "We ate grilled fish.", "I saw a big turtle.", "Mom bought some souvenirs."]),
            audio("After the holiday", say(["man", "Did you go anywhere last holiday?"], ["woman", "Yes, I did. I went to Lombok."], ["man", "Was it fun?"], ["woman", "Yes, it was! I swam in the sea and saw many fish."])),
            tip("Pertanyaan lampau: **Did you + kata kerja dasar?** *Did you go? Did you eat?* (bukan *Did you went?*). Jawab: **Yes, I did. / No, I didn't.**"),
          ],
        },
      ],
      checkpoint: [
        listen("sd5-c5-l2-c1", voice("I saw a big turtle in the sea."), "Listen. What did she see?", ["pic:turtle", "pic:tiger", "pic:snake"], 0, "Saw = melihat."),
        pick("sd5-c5-l2-c2", "We ___ very tired after the trip.", ["were", "was", "are"], 0, "We + were."),
        pick("sd5-c5-l2-c3", "Last Sunday, I ___ to the market.", ["went", "goed", "go"], 0, "Go → went."),
        trMatch("sd5-c5-l2-c4", "Match.", [["bought", "membeli"], ["ate", "makan"], ["saw", "melihat"], ["made", "membuat"]], "Kata kerja tak beraturan!"),
        pick("sd5-c5-l2-c5", "Which question is correct?", ["Did you eat breakfast?", "Did you ate breakfast?", "Do you ate breakfast?"], 0, "Did + kata kerja dasar."),
        pick("sd5-c5-l2-c6", "“Did you swim?” — “No, I ___.”", ["didn't", "don't", "wasn't"], 0, "No, I didn't.", { hots: true }),
      ],
    },
    {
      id: "sd5-c5-l3",
      skill: "reading",
      title: "Reading: My Holiday in Yogyakarta",
      summary: "Read a recount text and write about your last holiday.",
      passages: [HOLIDAY],
      sections: [
        {
          title: "A recount",
          blocks: [
            { type: "passage", passage: HOLIDAY },
            audio("Listen and read", say(["woman", HOLIDAY.lines.join(" ")])),
            tip("Teks **recount** menceritakan pengalaman berurutan: **orientasi** (siapa, kapan, di mana) → **kejadian** (first day, second day…) → **penutup** (perasaan)."),
            tryIt(pick("sd5-c5-l3-try1", "How did the family travel to Yogyakarta?", ["by train", "by plane", "by ship"], 0, "Baris 2.", { passageId: HOLIDAY.id })),
          ],
        },
        {
          title: "Write your recount",
          blocks: [
            writing({
              id: "sd5-c5-l3-write",
              title: "My last holiday",
              prompt: "Write a recount of your last holiday or a fun weekend. Use the simple past and time words.",
              image: "beach",
              minWords: 60,
              maxWords: 150,
              tips: ["Last … , I went to … with …", "On the first day, we …", "After that, we …", "On the last day, …", "I felt … because …"],
              models: [{ label: "Example", text: "Last school holiday, I went to my grandparents' village in Malang. We went there by bus. On the first day, I helped Grandpa in his apple garden. We picked a lot of apples. On the second day, my cousins and I swam in the river. In the evening, Grandma cooked chicken soup for us. On the last day, we bought apple chips as souvenirs. I was sad when we left, but it was a wonderful holiday." }],
              rubric: ["I said when, where and who in the first sentence.", "I used past verbs (went, visited, ate…).", "I used time words (first, then, on the last day).", "I ended with my feelings."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd5-c5-l3-c1", "When did they go to Yogyakarta?", ["last December", "last July", "next December"], 0, "Baris 1.", { passageId: HOLIDAY.id }),
        pick("sd5-c5-l3-c2", "What did they visit on the first day?", ["Borobudur Temple", "Malioboro Street", "a museum"], 0, "Baris 3.", { passageId: HOLIDAY.id }),
        fill("sd5-c5-l3-c3", "Complete.", "We walked along Malioboro Street and bought some", ".", ["batik"], "Baris 4.", { passageId: HOLIDAY.id }),
        pick("sd5-c5-l3-c4", "Why did the little brother cry?", ["He wanted a toy.", "He was hungry.", "He was lost."], 0, "Baris 5.", { passageId: HOLIDAY.id }),
        pickMany("sd5-c5-l3-c5", "Choose ALL the past verbs in line 5.", ["cried", "wanted", "bought", "car"], [0, 1, 2], "Cried, wanted, bought.", { passageId: HOLIDAY.id }),
        pick("sd5-c5-l3-c6", "How did the writer feel at the end?", ["tired but very happy", "angry", "bored"], 0, "Baris 7.", { passageId: HOLIDAY.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd5-c5-post",
    title: "Chapter 5 Posttest",
    passPercent: 70,
    passages: [HOLIDAY],
    questions: [
      pick("sd5-c5-post1", "Last weekend, we ___ a movie.", ["watched", "watch", "watches", "watching"], 0, "Last weekend → watched."),
      listen("sd5-c5-post2", voice("Yesterday, I ate nasi goreng for breakfast."), "Listen. What did he eat?", ["nasi goreng", "bread", "noodles"], 0, "Ate = makan (lampau)."),
      trPick("sd5-c5-post3", "“Kemarin aku pergi ke pantai.” in English is…", ["Yesterday I went to the beach.", "Yesterday I go to the beach.", "Tomorrow I went to the beach."], 0, "Go → went."),
      pick("sd5-c5-post4", "The trip ___ long but fun.", ["was", "were", "is", "be"], 0, "The trip (it) → was."),
      fill("sd5-c5-post5", "Complete: I ___ (buy) a souvenir.", "I", "a souvenir.", ["bought"], "Buy → bought."),
      arrange("sd5-c5-post6", "Put the words in order.", "Did you visit Borobudur", "Did you + kata kerja dasar?"),
      pick("sd5-c5-post7", "What did the writer love on the last day?", ["the music", "the train", "the toy"], 0, "Baris 6.", { passageId: HOLIDAY.id }),
      match("sd5-c5-post8", "Match.", [["go", "went"], ["see", "saw"], ["make", "made"], ["swim", "swam"]], "Hebat!"),
      pick("sd5-c5-post9", "Put the events in order: (1) bought batik (2) visited Borobudur (3) watched a dance", ["2 – 1 – 3", "1 – 2 – 3", "3 – 2 – 1", "2 – 3 – 1"], 0, "Hari 1 Borobudur, hari 2 batik, hari terakhir tari.", { passageId: HOLIDAY.id, hots: true }),
      pick("sd5-c5-post10", "Which sentence has a mistake?", ["We goed to the zoo.", "We went to the zoo.", "We saw elephants.", "It was fun."], 0, "Go → went, bukan goed.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Holiday Memories",
    questions: [
      live("sd5-c5-live1", "go → …", ["went", "goed", "gone", "going"], 0, "plane"),
      live("sd5-c5-live2", "eat → …", ["ate", "eated", "eaten", "eats"], 0, "rice"),
      live("sd5-c5-live3", "Yesterday I ___ football.", ["played", "play", "plays", "playing"], 0, "football"),
      live("sd5-c5-live4", "We ___ happy.", ["were", "was", "is", "am"], 0, "happy"),
      live("sd5-c5-live5", "Did you swim? (no)", ["No, I didn't.", "No, I don't.", "No, I wasn't.", "No, I not."], 0, "swim"),
      live("sd5-c5-live6", "study → …", ["studied", "studyed", "studed", "studying"], 0, "open-book"),
      live("sd5-c5-live7", "“Minggu lalu” is…", ["last week", "next week", "this week", "week ago last"], 0, "calendar", true),
      live("sd5-c5-live8", "buy → …", ["bought", "buyed", "brought", "boughted"], 0, "souvenir"),
    ],
  },
};

const WAY: Passage = {
  id: "sd5-c6-way",
  title: "How to Get to the Museum",
  pic: "map",
  lines: [
    "From the school, turn right and go straight along Jalan Merdeka.",
    "Walk past the post office and the bank.",
    "At the traffic lights, turn left into Jalan Sudirman.",
    "Go straight for about two hundred meters.",
    "The museum is on your right, opposite the park.",
    "It takes about ten minutes on foot. You can't miss it!",
  ],
};

export const CH6: Level = {
  id: "sd5-ch6",
  title: "Chapter 6 — Finding the Way",
  description: "Ask for and give directions (go straight, turn left, on your right), read a map, and follow instructions.",
  targetScore: "Listening · Speaking · Reading",
  cover: ["map", "turn-left", "traffic-light"],
  pretest: {
    id: "sd5-c6-pre",
    title: "Chapter 6 Pretest",
    passPercent: 0,
    questions: [
      pick("sd5-c6-pre1", "What does this sign say?", ["Turn left.", "Turn right.", "Go straight.", "Stop."], 0, "Panah ke kiri → turn left.", { image: "turn-left" }),
      listen("sd5-c6-pre2", voice("Go straight."), "Listen. Choose the sign.", ["pic:go-straight", "pic:turn-left", "pic:turn-right", "pic:traffic-light"], 0, "Go straight = jalan lurus."),
      trPick("sd5-c6-pre3", "“Belok kanan” in English is…", ["turn right", "turn left", "go back", "go straight"], 0, "Belok kanan = turn right."),
      pick("sd5-c6-pre4", "“Excuse me, how can I get to the hospital?” This person wants…", ["directions", "food", "money", "a ticket"], 0, "Menanyakan arah = directions."),
      pick("sd5-c6-pre5", "The bank is ___ the school. (they face each other across the road)", ["opposite", "behind", "inside", "under"], 0, "Saling berhadapan di seberang jalan → opposite."),
    ],
  },
  lessons: [
    {
      id: "sd5-c6-l1",
      skill: "vocabulary",
      title: "Direction Words",
      summary: "Go straight, turn left/right, go past, at the corner, at the traffic lights, on your left/right.",
      sections: [
        {
          title: "Signs and directions",
          blocks: [
            vocab([
              ["go straight", "jalan lurus", "go-straight"],
              ["turn left", "belok kiri", "turn-left"],
              ["turn right", "belok kanan", "turn-right"],
              ["at the traffic lights", "di lampu lalu lintas", "traffic-light"],
              ["go past", "lewati", "car"],
              ["at the corner", "di sudut / tikungan", "map"],
              ["on your left / right", "di sebelah kirimu / kananmu", "pin"],
              ["cross the road", "menyeberang jalan", "traffic"],
            ]),
            repeat(["Go straight.", "Turn left at the corner.", "Turn right at the traffic lights.", "Go past the bank.", "It's on your left."]),
          ],
        },
        {
          title: "Left or right?",
          blocks: [
            pics([["turn-left", "turn left"], ["go-straight", "go straight"], ["turn-right", "turn right"]]),
            tip("Trik mengingat: angkat tangan kiri, bentuk jari jempol dan telunjuk menjadi huruf **L** — itu **Left** (kiri)!"),
            tryIt(pick("sd5-c6-l1-try1", "Which sign means “turn right”?", ["pic:turn-right", "pic:turn-left", "pic:go-straight"], 0, "Panah ke kanan.")),
          ],
        },
      ],
      checkpoint: [
        listen("sd5-c6-l1-c1", voice("Turn right at the corner."), "Listen. Choose the sign.", ["pic:turn-right", "pic:turn-left", "pic:go-straight"], 0, "Turn right."),
        match("sd5-c6-l1-c2", "Match.", [["pic:turn-left", "turn left"], ["pic:go-straight", "go straight"], ["pic:traffic-light", "traffic lights"]], "Bagus!"),
        trPick("sd5-c6-l1-c3", "“Menyeberang jalan” in English is…", ["cross the road", "go past the road", "turn the road"], 0, "Menyeberang = cross."),
        fill("sd5-c6-l1-c4", "Complete: Go ___ the post office. (lewati)", "Go", "the post office.", ["past"], "Lewati = go past.", { translate: true }),
        pick("sd5-c6-l1-c5", "Before you cross the road, you should…", ["look left and right", "close your eyes", "run fast"], 0, "Lihat kiri-kanan dulu."),
        pick("sd5-c6-l1-c6", "You turn right, then turn right again, then right again, then right again. Where are you?", ["back where you started", "very far away", "on the left"], 0, "Empat kali belok kanan = kembali ke titik awal.", { hots: true }),
      ],
    },
    {
      id: "sd5-c6-l2",
      skill: "listening",
      title: "Excuse Me, How Can I Get to…?",
      summary: "Asking for directions politely and following them on a map.",
      sections: [
        {
          title: "Asking politely",
          blocks: [
            table(["Asking", "Answering"], [["Excuse me, where is the library?", "It's next to the bank."], ["How can I get to the station?", "Go straight and turn left."], ["Is it far?", "No, it's about five minutes on foot."], ["Thank you so much!", "You're welcome."]]),
            audio("Lost tourist", say(["man", "Excuse me. How can I get to the train station?"], ["woman", "Go straight along this street. Turn left at the traffic lights. Then go past the supermarket. The station is on your right."], ["man", "Is it far?"], ["woman", "No, it's about ten minutes on foot."], ["man", "Thank you so much!"])),
          ],
        },
        {
          title: "Follow the directions",
          blocks: [
            tryIt(pick("sd5-c6-l2-try1", "Where should the man turn left?", ["at the traffic lights", "at the supermarket", "at the station"], 0, "Turn left at the traffic lights.")),
            tryIt(pickMany("sd5-c6-l2-try2", "Choose ALL the steps in the right directions.", ["go straight", "turn left at the traffic lights", "go past the supermarket", "turn right at the school"], [0, 1, 2], "Tidak ada belok kanan di sekolah.")),
            speaking({
              id: "sd5-c6-l2-say",
              title: "Give directions",
              prompt: "A visitor is at your school gate. Tell them how to get to a place near your school (a shop, a mosque, a market…).",
              image: "map",
              seconds: 60,
              tips: ["Go straight along …", "Turn left / right at …", "Go past …", "It's on your left / right, next to …"],
              models: [{ label: "Example", text: "Go out of the school gate and turn left. Go straight for about one hundred meters. Go past the bakery. At the corner, turn right. The market is on your left, next to the bus stop. It's about five minutes on foot." }],
              rubric: ["I used at least three direction phrases.", "My directions are in a clear order.", "I said where the place is (on your left/right, next to…)."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd5-c6-l2-c1", say(["woman", "Is it far?"], ["man", "No, it's about five minutes on foot."]), "Listen. How far is it?", ["five minutes on foot", "five hours", "fifty minutes by car"], 0, "Five minutes on foot."),
        arrange("sd5-c6-l2-c2", "Put the words in order.", "How can I get to the library", "How can I get to + tempat?"),
        pick("sd5-c6-l2-c3", "The station is ___ your right.", ["on", "in", "at"], 0, "On your right."),
        fill("sd5-c6-l2-c4", "Complete: Turn left ___ the traffic lights.", "Turn left", "the traffic lights.", ["at"], "At the traffic lights."),
        trPick("sd5-c6-l2-c5", "“Permisi” (to start a question) in English is…", ["Excuse me", "Thank you", "You're welcome"], 0, "Permisi = Excuse me."),
        pick("sd5-c6-l2-c6", "A tourist asks for directions, but you don't know the place. What is the best answer?", ["I'm sorry, I don't know. Maybe ask the police officer over there.", "Go straight forever!", "Ignore the tourist."], 0, "Jujur dan arahkan ke orang lain dengan sopan.", { hots: true }),
      ],
    },
    {
      id: "sd5-c6-l3",
      skill: "reading",
      title: "Reading: How to Get to the Museum",
      summary: "Follow written directions and write directions to your home.",
      passages: [WAY],
      sections: [
        {
          title: "Read the directions",
          blocks: [
            { type: "passage", passage: WAY },
            pics([["school", "start"], ["post-office", "go past"], ["traffic-light", "turn left"], ["museum", "finish"]]),
            tryIt(pick("sd5-c6-l3-try1", "What do you do first?", ["Turn right and go straight.", "Turn left at the traffic lights.", "Cross the park."], 0, "Baris 1.", { passageId: WAY.id })),
          ],
        },
        {
          title: "Write directions",
          blocks: [
            writing({
              id: "sd5-c6-l3-write",
              title: "Directions to my house",
              prompt: "Write directions from your school (or a mosque, market or mall) to your house for a new friend.",
              image: "house",
              minWords: 40,
              maxWords: 120,
              tips: ["From …, turn … and go straight along …", "Go past …", "At the …, turn …", "My house is on your … , next to / opposite …"],
              models: [{ label: "Example", text: "From our school, turn left and go straight along Jalan Kenanga. Go past the mosque and the small bakery. At the second corner, turn right. Walk for about fifty meters. My house is on your left, opposite a big mango tree. It has a green gate. See you!" }],
              rubric: ["I gave a start point.", "I used at least four direction phrases.", "I described my house so it is easy to find.", "My steps are in order."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd5-c6-l3-c1", "Which places do you walk past?", ["the post office and the bank", "the park and the school", "the museum and the bank"], 0, "Baris 2.", { passageId: WAY.id }),
        pick("sd5-c6-l3-c2", "Where do you turn left?", ["at the traffic lights", "at the post office", "at the park"], 0, "Baris 3.", { passageId: WAY.id }),
        fill("sd5-c6-l3-c3", "Complete.", "The museum is on your right, opposite the", ".", ["park"], "Baris 5.", { passageId: WAY.id }),
        pick("sd5-c6-l3-c4", "How long does it take on foot?", ["about ten minutes", "about two hours", "about two minutes"], 0, "Baris 6.", { passageId: WAY.id }),
        pick("sd5-c6-l3-c5", "“You can't miss it!” means…", ["It is very easy to find.", "You must not go there.", "You will miss the bus."], 0, "Artinya: mudah sekali ditemukan.", { passageId: WAY.id, hots: true }),
        pick("sd5-c6-l3-c6", "If you walk back from the museum to the school, where do you turn at the traffic lights?", ["right", "left", "you don't turn"], 0, "Arah pulang kebalikan: kiri jadi kanan.", { passageId: WAY.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd5-c6-post",
    title: "Chapter 6 Posttest",
    passPercent: 70,
    passages: [WAY],
    questions: [
      pick("sd5-c6-post1", "What does this sign say?", ["Go straight.", "Turn left.", "Turn right.", "Stop."], 0, "Panah ke atas → go straight.", { image: "go-straight" }),
      listen("sd5-c6-post2", voice("Turn left at the corner and it's on your right."), "Listen. Where is the place?", ["on your right after turning left", "on your left", "straight ahead"], 0, "Belok kiri, lalu di sebelah kanan."),
      trPick("sd5-c6-post3", "“Di sebelah kirimu” in English is…", ["on your left", "in your left", "at left you"], 0, "On your left."),
      pick("sd5-c6-post4", "Go ___ the bank, then turn right.", ["past", "pass by on", "through in", "at"], 0, "Go past = lewati."),
      arrange("sd5-c6-post5", "Put the words in order.", "Excuse me where is the post office", "Excuse me, where is …?"),
      pick("sd5-c6-post6", "What is opposite the museum?", ["the park", "the bank", "the school", "the post office"], 0, "Baris 5.", { passageId: WAY.id }),
      match("sd5-c6-post7", "Match.", [["turn left", "belok kiri"], ["go straight", "jalan lurus"], ["cross the road", "menyeberang jalan"]], "Turn left = belok kiri, go straight = jalan lurus, cross the road = menyeberang jalan.", { translate: true }),
      fill("sd5-c6-post8", "Complete: How can I ___ to the station?", "How can I", "to the station?", ["get"], "How can I get to …?"),
      pick("sd5-c6-post9", "You face north. You turn left. Which way are you facing now?", ["west", "east", "south", "north"], 0, "Menghadap utara lalu belok kiri → barat.", { hots: true }),
      pick("sd5-c6-post10", "Which direction is the clearest for a visitor?", ["Turn left at the traffic lights. It's the blue building next to the bank.", "Go somewhere there.", "It's near.", "Turn, then turn."], 0, "Petunjuk jelas menyebut patokan.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Which Way?",
    questions: [
      live("sd5-c6-live1", "This sign means…", ["turn left", "turn right", "go straight", "stop"], 0, "turn-left"),
      live("sd5-c6-live2", "This sign means…", ["turn right", "turn left", "go back", "stop"], 0, "turn-right"),
      live("sd5-c6-live3", "Turn left ___ the traffic lights.", ["at", "on", "in", "to"], 0, "traffic-light"),
      live("sd5-c6-live4", "It's ___ your right.", ["on", "in", "at", "to"], 0, "pin"),
      live("sd5-c6-live5", "Polite start:", ["Excuse me,", "Hey you,", "Listen,", "Give me,"], 0, "map"),
      live("sd5-c6-live6", "Go ___ the bank. (lewati)", ["past", "pass", "passed", "pasting"], 0, "car", true),
      live("sd5-c6-live7", "Red light means…", ["stop", "go", "turn", "run"], 0, "traffic-light"),
      live("sd5-c6-live8", "Before crossing, look…", ["left and right", "up and down", "at your phone", "behind only"], 0, "traffic"),
    ],
  },
};
