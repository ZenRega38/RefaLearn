import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, repeat, say, speaking, table, text, tip, trPick, tryIt, voice, warn, writing } from "../kit";

// Grade 6 (Fase C). Chapter 1 — Past Experiences · Chapter 2 — Future Plans

const CAMP: Passage = {
  id: "sd6-c1-camp",
  title: "My First Scout Camp",
  pic: "tree",
  lines: [
    "Last month, I went to my first scout camp in the mountains near Bogor.",
    "We left school early on Friday morning and arrived at the campsite at noon.",
    "First, we built our tents. It was hard because the wind was strong.",
    "In the afternoon, we learned how to read a map and find the way with a compass.",
    "At night, we sat around the campfire, sang songs and told funny stories.",
    "I didn't sleep well because it was very cold, but I didn't complain.",
    "On Sunday, we cleaned the campsite and went home. I felt tired but proud.",
  ],
};

export const CH1: Level = {
  id: "sd6-ch1",
  title: "Chapter 1 — Past Experiences",
  description: "Tell about past experiences with regular and irregular verbs, ask Did you…? questions, and write a personal recount.",
  targetScore: "Speaking · Reading · Writing",
  cover: ["tree", "camera", "map"],
  pretest: {
    id: "sd6-c1-pre",
    title: "Chapter 1 Pretest",
    passPercent: 0,
    questions: [
      pick("sd6-c1-pre1", "Last Sunday, we ___ to the beach.", ["went", "go", "goes", "going"], 0, "Last Sunday → went."),
      listen("sd6-c1-pre2", voice("I didn't watch TV last night. I read a book."), "Listen. What did she do last night?", ["She read a book.", "She watched TV.", "She went out."], 0, "I read a book (read lampau dibaca 'red')."),
      trPick("sd6-c1-pre3", "“Aku tidak pergi ke sekolah kemarin.” in English is…", ["I didn't go to school yesterday.", "I didn't went to school yesterday.", "I don't go to school yesterday."], 0, "Didn't + kata kerja dasar."),
      pick("sd6-c1-pre4", "___ you finish your homework?", ["Did", "Do", "Were", "Was"], 0, "Pertanyaan lampau → Did."),
      pick("sd6-c1-pre5", "The past form of “take” is…", ["took", "taked", "taken", "takes"], 0, "Take → took."),
    ],
  },
  lessons: [
    {
      id: "sd6-c1-l1",
      skill: "structure",
      title: "Irregular Past Verbs",
      summary: "The most common irregular verbs and how to use them.",
      sections: [
        {
          title: "Verbs to remember",
          blocks: [
            text("Kata kerja tak beraturan (irregular) tidak memakai -ed. Hafalkan sedikit demi sedikit, dan pakai dalam kalimatmu sendiri."),
            table(["Base", "Past", "Meaning"], [["be", "was / were", "adalah/berada"], ["build", "built", "membangun"], ["come", "came", "datang"], ["do", "did", "melakukan"], ["drink", "drank", "minum"], ["feel", "felt", "merasa"], ["find", "found", "menemukan"], ["get", "got", "mendapat"], ["give", "gave", "memberi"], ["leave", "left", "pergi/meninggalkan"], ["read", "read (red)", "membaca"], ["sing", "sang", "bernyanyi"], ["sit", "sat", "duduk"], ["sleep", "slept", "tidur"], ["tell", "told", "menceritakan"], ["write", "wrote", "menulis"]]),
            repeat(["built", "came", "felt", "found", "left", "sang", "sat", "slept", "told", "wrote"]),
          ],
        },
        {
          title: "Negative and questions",
          blocks: [
            table(["", "Example"], [["Positive", "I slept early."], ["Negative", "I didn't sleep early."], ["Question", "Did you sleep early?"], ["Short answers", "Yes, I did. / No, I didn't."]]),
            warn("Setelah **didn't** dan **Did**, kata kerja kembali ke bentuk **dasar**: *I didn't **go*** (bukan *didn't went*). *Did you **see** it?* (bukan *Did you saw*)."),
            tryIt(pick("sd6-c1-l1-try1", "She ___ a letter to her grandmother yesterday.", ["wrote", "writed", "write", "writes"], 0, "Write → wrote.")),
          ],
        },
      ],
      checkpoint: [
        listen("sd6-c1-l1-c1", voice("We sat around the campfire and sang songs."), "Listen. What did they do?", ["sat around a fire and sang", "slept in a hotel", "swam in a river"], 0, "Sat (duduk), sang (bernyanyi)."),
        match("sd6-c1-l1-c2", "Match the base and past forms.", [["find", "found"], ["give", "gave"], ["feel", "felt"], ["leave", "left"]], "Bagus!"),
        fill("sd6-c1-l1-c3", "Complete: They ___ (build) a sandcastle.", "They", "a sandcastle.", ["built"], "Build → built."),
        pick("sd6-c1-l1-c4", "Which sentence is correct?", ["Did you find your key?", "Did you found your key?", "Do you found your key?"], 0, "Did + kata kerja dasar."),
        trPick("sd6-c1-l1-c5", "“Dia memberiku hadiah.” in English is…", ["She gave me a present.", "She gived me a present.", "She give me a present."], 0, "Give → gave."),
        pick("sd6-c1-l1-c6", "Find the mistake: “Yesterday I didn't ate breakfast.”", ["“ate” should be “eat”", "“didn't” should be “don't”", "There is no mistake."], 0, "Setelah didn't → eat.", { hots: true }),
      ],
    },
    {
      id: "sd6-c1-l2",
      skill: "speaking",
      title: "Did You Have a Good Weekend?",
      summary: "Asking and answering about past experiences, showing interest.",
      sections: [
        {
          title: "Weekend chat",
          blocks: [
            audio("Monday morning", say(["woman", "Hi, Reza! Did you have a good weekend?"], ["man", "Yes, I did! I went fishing with my uncle."], ["woman", "Really? Did you catch anything?"], ["man", "I caught three fish! We grilled them for dinner."], ["woman", "That sounds great! I just stayed home and finished a puzzle."], ["man", "Oh, nice! How many pieces did it have?"], ["woman", "One thousand!"])),
            table(["Showing interest", "Meaning"], [["Really?", "Oh ya?"], ["That sounds great!", "Kedengarannya seru!"], ["Oh no! What happened?", "Aduh! Ada apa?"], ["How was it?", "Bagaimana rasanya?"], ["Lucky you!", "Beruntung sekali kamu!"]]),
          ],
        },
        {
          title: "Your weekend",
          blocks: [
            tryIt(pick("sd6-c1-l2-try1", "What did Reza do with the fish?", ["They grilled them.", "They sold them.", "They let them go."], 0, "We grilled them for dinner.")),
            speaking({
              id: "sd6-c1-l2-say",
              title: "Tell me about your weekend",
              prompt: "Talk about your last weekend: where you went, what you did, who you were with and how you felt. Use at least five past verbs.",
              image: "camera",
              seconds: 60,
              tips: ["Last weekend, I …", "First, … Then, …", "It was … because …", "I felt …"],
              models: [{ label: "Example", text: "Last weekend, I visited my cousin in Depok. We rode our bikes around the housing complex and then we played badminton. In the evening, we made martabak with my aunt. It was delicious! I felt happy because I don't often see my cousin." }],
              rubric: ["I used at least five past verbs.", "I used **first / then / in the evening**.", "I said how I felt and why."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd6-c1-l2-c1", say(["man", "Did you go to the party?"], ["woman", "No, I didn't. I was sick."]), "Listen. Why didn't she go?", ["She was sick.", "She was busy.", "She forgot."], 0, "I was sick."),
        pick("sd6-c1-l2-c2", "Your friend says “I won the drawing competition!”. You say…", ["That sounds great! Congratulations!", "Oh no! What happened?", "I don't care."], 0, "Berita baik → ikut senang."),
        arrange("sd6-c1-l2-c3", "Put the words in order.", "Did you have a good weekend", "Did you have a good weekend?"),
        fill("sd6-c1-l2-c4", "Answer: Did you see the match? Yes, I ___ .", "Yes, I", ".", ["did"], "Yes, I did."),
        trPick("sd6-c1-l2-c5", "“Bagaimana rasanya?” (about an experience) in English is…", ["How was it?", "What is it?", "Where was it?"], 0, "How was it?"),
        pick("sd6-c1-l2-c6", "Your friend says “My cat ran away yesterday.” The best reply is…", ["Oh no! Did you find her?", "That sounds great!", "Lucky you!"], 0, "Berita sedih → tunjukkan empati.", { hots: true }),
      ],
    },
    {
      id: "sd6-c1-l3",
      skill: "reading",
      title: "Reading: My First Scout Camp",
      summary: "Read a personal recount and write about a memorable experience.",
      passages: [CAMP],
      sections: [
        {
          title: "A recount",
          blocks: [
            { type: "passage", passage: CAMP },
            audio("Listen and read", say(["man", CAMP.lines.join(" ")])),
            tip("Recount yang baik punya **orientation** (siapa, kapan, di mana), **events** (urutan kejadian), dan **reorientation** (perasaan/kesan penutup)."),
            tryIt(pick("sd6-c1-l3-try1", "Where was the camp?", ["in the mountains near Bogor", "on a beach in Bali", "at school"], 0, "Baris 1.", { passageId: CAMP.id })),
          ],
        },
        {
          title: "Write your recount",
          blocks: [
            writing({
              id: "sd6-c1-l3-write",
              title: "An unforgettable day",
              prompt: "Write a recount of an unforgettable experience (a trip, a competition, a first time doing something).",
              image: "trophy",
              minWords: 80,
              maxWords: 180,
              tips: ["Orientation: Last …, I …", "Events: First, … After that, … In the evening, …", "Reorientation: It was … I will never forget …"],
              models: [{ label: "Example", text: "Last year, I joined a storytelling competition at the city library. I practised every day for two weeks with my English teacher. On the day of the competition, I was very nervous. My hands were cold! When my name was called, I walked to the stage and told the story of Malin Kundang. I didn't forget a single line. In the end, I won third place. I felt so proud, and my parents hugged me. It was a day I will never forget." }],
              rubric: ["I wrote an orientation (who, when, where).", "I told events in order with time words.", "I used past verbs correctly, including irregular ones.", "I ended with my feelings."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd6-c1-l3-c1", "Why was building the tents hard?", ["The wind was strong.", "It rained.", "They had no tents."], 0, "Baris 3.", { passageId: CAMP.id }),
        pickMany("sd6-c1-l3-c2", "Choose ALL the things they did at night.", ["sat around the campfire", "sang songs", "told funny stories", "read a map"], [0, 1, 2], "Baris 5.", { passageId: CAMP.id }),
        fill("sd6-c1-l3-c3", "Complete.", "We learned how to read a map and find the way with a", ".", ["compass"], "Baris 4.", { passageId: CAMP.id }),
        pick("sd6-c1-l3-c4", "Why didn't the writer sleep well?", ["It was very cold.", "It was noisy.", "The tent broke."], 0, "Baris 6.", { passageId: CAMP.id }),
        pick("sd6-c1-l3-c5", "“I didn't complain.” This shows the writer was…", ["patient and strong", "lazy", "angry"], 0, "Tidak mengeluh = sabar dan tangguh.", { passageId: CAMP.id, hots: true }),
        pick("sd6-c1-l3-c6", "Which line is the reorientation?", ["line 7", "line 1", "line 4"], 0, "Baris 7 menutup cerita dengan perasaan.", { passageId: CAMP.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd6-c1-post",
    title: "Chapter 1 Posttest",
    passPercent: 70,
    passages: [CAMP],
    questions: [
      pick("sd6-c1-post1", "We ___ a big fish yesterday.", ["caught", "catched", "catch", "catching"], 0, "Catch → caught."),
      listen("sd6-c1-post2", voice("I lost my wallet, but a kind man found it and gave it back to me."), "Listen. What happened to the wallet?", ["A man found it and gave it back.", "It was stolen.", "She bought a new one."], 0, "Found + gave it back."),
      trPick("sd6-c1-post3", "“Kami tiba siang hari.” in English is…", ["We arrived at noon.", "We arrive at noon.", "We arrived at night."], 0, "Tiba = arrived."),
      pick("sd6-c1-post4", "___ they enjoy the trip?", ["Did", "Were", "Do", "Was"], 0, "Did + they + enjoy."),
      arrange("sd6-c1-post5", "Put the words in order.", "I didn't sleep well last night", "I didn't + kata kerja dasar."),
      pick("sd6-c1-post6", "When did they leave school?", ["early on Friday morning", "on Sunday", "at noon"], 0, "Baris 2.", { passageId: CAMP.id }),
      match("sd6-c1-post7", "Match.", [["tell", "told"], ["sit", "sat"], ["sleep", "slept"], ["write", "wrote"]], "Hebat!"),
      fill("sd6-c1-post8", "Complete: Did you ___ (see) the rainbow?", "Did you", "the rainbow?", ["see"], "Did + see (dasar)."),
      pick("sd6-c1-post9", "How long was the camp?", ["three days (Friday to Sunday)", "one day", "one week", "one month"], 0, "Jumat sampai Minggu.", { passageId: CAMP.id, hots: true }),
      pick("sd6-c1-post10", "What did the writer learn from the camp?", ["to be brave and independent", "to watch TV", "to cook cakes", "to sleep a lot"], 0, "Berkemah melatih kemandirian dan keberanian.", { passageId: CAMP.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Past Tense Party",
    questions: [
      live("sd6-c1-live1", "write → …", ["wrote", "writed", "written", "writes"], 0, "envelope"),
      live("sd6-c1-live2", "find → …", ["found", "finded", "fined", "fond"], 0, "map"),
      live("sd6-c1-live3", "Did you ___ the movie?", ["watch", "watched", "watches", "watching"], 0, "tv"),
      live("sd6-c1-live4", "I ___ go out. I was sick.", ["didn't", "don't", "wasn't", "not"], 0, "sick"),
      live("sd6-c1-live5", "sleep → …", ["slept", "sleeped", "slep", "sleepy"], 0, "sleep"),
      live("sd6-c1-live6", "Good news reply:", ["That sounds great!", "Oh no!", "So what?", "Bye!"], 0, "happy"),
      live("sd6-c1-live7", "“Kami membangun tenda.” = We ___ a tent.", ["built", "build", "builded", "building"], 0, "tree", true),
      live("sd6-c1-live8", "catch → …", ["caught", "catched", "cought", "catch"], 0, "fishing"),
    ],
  },
};

const PLANS: Passage = {
  id: "sd6-c2-plans",
  title: "Our Class Trip Plan",
  pic: "bus",
  lines: [
    "Next month, our class is going to visit the Bosscha Observatory in Lembang.",
    "We are going to leave school at six o'clock in the morning by bus.",
    "At the observatory, a guide is going to explain how the big telescope works.",
    "After lunch, we are going to visit a strawberry farm and pick strawberries.",
    "Our teacher says it will probably be cold, so we are going to bring jackets.",
    "We will arrive back at school at about five p.m.",
    "I think it will be the best trip of the year!",
  ],
};

export const CH2: Level = {
  id: "sd6-ch2",
  title: "Chapter 2 — Future Plans",
  description: "Talk about plans with be going to, make predictions and quick decisions with will, and read a trip plan.",
  targetScore: "Speaking · Reading · Writing",
  cover: ["calendar", "bus", "plane"],
  pretest: {
    id: "sd6-c2-pre",
    title: "Chapter 2 Pretest",
    passPercent: 0,
    questions: [
      pick("sd6-c2-pre1", "Tomorrow I ___ visit my grandma.", ["am going to", "went to", "visited", "was going"], 0, "Rencana besok → am going to."),
      listen("sd6-c2-pre2", voice("Next week, we are going to have a test."), "Listen. When is the test?", ["next week", "last week", "today"], 0, "Next week = minggu depan."),
      trPick("sd6-c2-pre3", "“Besok” in English is…", ["tomorrow", "yesterday", "today", "tonight"], 0, "Besok = tomorrow."),
      pick("sd6-c2-pre4", "Which word talks about the FUTURE?", ["next year", "last year", "yesterday", "ago"], 0, "Next year = tahun depan."),
      pick("sd6-c2-pre5", "Look at those dark clouds! It ___ rain.", ["is going to", "went to", "rained", "was"], 0, "Ada bukti sekarang → is going to.", { image: "rain" }),
    ],
  },
  lessons: [
    {
      id: "sd6-c2-l1",
      skill: "structure",
      title: "Be Going To",
      summary: "Plans and intentions: I'm going to…; predictions with evidence.",
      sections: [
        {
          title: "Making plans",
          blocks: [
            text("**be going to + kata kerja dasar** dipakai untuk **rencana** yang sudah diputuskan, dan untuk **prediksi** yang ada buktinya sekarang."),
            table(["Subject", "be going to", "Example"], [["I", "am going to", "I am going to study tonight."], ["He / She / It", "is going to", "She is going to join the art club."], ["You / We / They", "are going to", "We are going to play futsal."]]),
            table(["", "Example"], [["Negative", "I'm not going to watch TV tonight."], ["Question", "Are you going to come to the party?"], ["Short answer", "Yes, I am. / No, I'm not."]]),
          ],
        },
        {
          title: "Future time words",
          blocks: [
            table(["Time word", "Meaning"], [["tonight", "nanti malam"], ["tomorrow", "besok"], ["the day after tomorrow", "lusa"], ["next week / month / year", "minggu / bulan / tahun depan"], ["in two days", "dua hari lagi"], ["soon", "segera"]]),
            repeat(["I'm going to study tonight.", "She's going to visit her aunt tomorrow.", "We're going to have a test next week."]),
            tryIt(pick("sd6-c2-l1-try1", "They ___ going to paint the fence tomorrow.", ["are", "is", "am"], 0, "They + are going to.")),
          ],
        },
      ],
      checkpoint: [
        listen("sd6-c2-l1-c1", voice("I'm going to join the robotics club next year."), "Listen. What is he going to do?", ["join the robotics club", "buy a robot", "watch a robot movie"], 0, "Join = bergabung."),
        pick("sd6-c2-l1-c2", "She ___ going to bake a cake.", ["is", "are", "am"], 0, "She + is."),
        fill("sd6-c2-l1-c3", "Complete: I'm not going ___ watch TV tonight.", "I'm not going", "watch TV tonight.", ["to"], "Going to + kata kerja."),
        arrange("sd6-c2-l1-c4", "Put the words in order.", "Are you going to come", "Are you going to + kata kerja?"),
        trPick("sd6-c2-l1-c5", "“Lusa” in English is…", ["the day after tomorrow", "the day before yesterday", "next day"], 0, "Lusa = the day after tomorrow."),
        pick("sd6-c2-l1-c6", "The boy is running very fast near the edge of the pool. He ___ fall!", ["is going to", "went to", "fell"], 0, "Ada tanda sekarang → is going to.", { hots: true }),
      ],
    },
    {
      id: "sd6-c2-l2",
      skill: "speaking",
      title: "Will: Predictions, Offers and Promises",
      summary: "I think it will…, I'll help you!, I promise I will…",
      sections: [
        {
          title: "Will or going to?",
          blocks: [
            table(["Use", "Example"], [["Opinion about the future (I think…)", "I think it will be sunny tomorrow."], ["A decision right now", "The phone is ringing. I'll answer it!"], ["An offer", "That bag looks heavy. I'll help you."], ["A promise", "I promise I will clean my room."], ["A plan (already decided)", "I'm going to visit Bali next month."]]),
            text("Bentuk pendek: **I'll, you'll, she'll, we'll**. Negatif: **won't** (= will not)."),
          ],
        },
        {
          title: "Plans and promises",
          blocks: [
            audio("Holiday plans", say(["man", "What are you going to do during the holiday?"], ["woman", "I'm going to visit my grandparents in Padang. What about you?"], ["man", "I don't have any plans yet. Maybe I'll stay home."], ["woman", "Why don't you come to Padang? I think you'll love the food!"], ["man", "Good idea! I'll ask my parents tonight."])),
            tryIt(pick("sd6-c2-l2-try1", "“I'll ask my parents tonight.” This is…", ["a quick decision", "a plan from last month", "a past event"], 0, "Keputusan spontan → will.")),
            speaking({
              id: "sd6-c2-l2-say",
              title: "My plans for next holiday",
              prompt: "Talk about your plans for the next school holiday. Use **going to** for plans and **will** for one prediction.",
              image: "suitcase",
              seconds: 60,
              tips: ["During the holiday, I'm going to …", "I'm also going to …", "I think it will be …"],
              models: [{ label: "Example", text: "During the next holiday, I'm going to learn to swim. My father is going to take me to the pool every morning. I'm also going to read three novels. I think it will be a fun and healthy holiday." }],
              rubric: ["I used **going to** for at least two plans.", "I used **will** for a prediction.", "I used future time words."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd6-c2-l2-c1", say(["woman", "This box is so heavy!"], ["man", "Don't worry. I'll carry it for you."]), "Listen. What does the boy offer?", ["to carry the box", "to open the box", "to buy a box"], 0, "Tawaran → I'll carry it."),
        pick("sd6-c2-l2-c2", "The phone is ringing. — “I ___ answer it!”", ["'ll", "am going to", "answered"], 0, "Keputusan spontan → will."),
        fill("sd6-c2-l2-c3", "Complete: I promise I ___ be late again. (tidak akan)", "I promise I", "be late again.", ["won't", "will not"], "Tidak akan = won't.", { translate: true }),
        pick("sd6-c2-l2-c4", "I think Indonesia ___ win the match.", ["will", "is going", "won"], 0, "Pendapat tentang masa depan → will."),
        trPick("sd6-c2-l2-c5", "“Aku akan membantumu!” (offer) in English is…", ["I'll help you!", "I helped you!", "I help you yesterday!"], 0, "Tawaran → I'll."),
        pick("sd6-c2-l2-c6", "Which sentence shows a plan made LAST WEEK?", ["We're going to visit the museum on Saturday. We bought the tickets.", "Oh, it's raining. I'll take an umbrella.", "I think it will be hot."], 0, "Rencana yang sudah diatur → going to.", { hots: true }),
      ],
    },
    {
      id: "sd6-c2-l3",
      skill: "reading",
      title: "Reading: Our Class Trip Plan",
      summary: "Read a trip plan and write an itinerary.",
      passages: [PLANS],
      sections: [
        {
          title: "A trip to Lembang",
          blocks: [
            { type: "passage", passage: PLANS },
            audio("Listen and read", say(["woman", PLANS.lines.join(" ")])),
            tryIt(pick("sd6-c2-l3-try1", "Where are they going to go?", ["the Bosscha Observatory", "the zoo", "the beach"], 0, "Baris 1.", { passageId: PLANS.id })),
          ],
        },
        {
          title: "Plan a trip",
          blocks: [
            writing({
              id: "sd6-c2-l3-write",
              title: "A class trip plan",
              prompt: "Plan a one-day class trip to a place in your area. Write the plan with times and activities.",
              image: "map",
              minWords: 70,
              maxWords: 160,
              tips: ["Next …, our class is going to visit …", "We are going to leave at … by …", "In the morning, we are going to …", "After lunch, …", "We will arrive back at …", "I think it will be …"],
              models: [{ label: "Example", text: "Next month, our class is going to visit the Kebun Raya in Bogor. We are going to leave school at seven o'clock by bus. In the morning, a guide is going to show us rare plants and the giant water lilies. We are going to have lunch under the big trees. After lunch, we are going to visit the Zoology Museum. We will arrive back at school at about four p.m. I think it will be an educational and fun trip!" }],
              rubric: ["I used **going to** for the plan.", "I gave times and transport.", "I used **will** for a prediction.", "My plan is in order from morning to afternoon."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd6-c2-l3-c1", "How are they going to travel?", ["by bus", "by train", "by plane"], 0, "Baris 2.", { passageId: PLANS.id }),
        pick("sd6-c2-l3-c2", "Who is going to explain the telescope?", ["a guide", "the teacher", "a farmer"], 0, "Baris 3.", { passageId: PLANS.id }),
        fill("sd6-c2-l3-c3", "Complete.", "After lunch, we are going to visit a strawberry farm and pick", ".", ["strawberries"], "Baris 4.", { passageId: PLANS.id }),
        pick("sd6-c2-l3-c4", "Why are they going to bring jackets?", ["It will probably be cold.", "It will rain.", "The bus is cold."], 0, "Baris 5.", { passageId: PLANS.id }),
        pickMany("sd6-c2-l3-c5", "Choose ALL the sentences with WILL in the text.", ["line 6", "line 7", "line 5", "line 2"], [0, 1, 2], "Baris 5 (will probably be), 6, dan 7.", { passageId: PLANS.id }),
        pick("sd6-c2-l3-c6", "An observatory is a place to look at…", ["stars and planets", "fish", "old clothes"], 0, "Observatorium untuk mengamati bintang.", { passageId: PLANS.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd6-c2-post",
    title: "Chapter 2 Posttest",
    passPercent: 70,
    passages: [PLANS],
    questions: [
      pick("sd6-c2-post1", "We ___ going to play futsal tomorrow.", ["are", "is", "am", "be"], 0, "We + are."),
      listen("sd6-c2-post2", voice("Look at the sky! It's going to rain."), "Listen. Why does she say it's going to rain?", ["The sky looks dark.", "She heard the news.", "It's December."], 0, "Prediksi dengan bukti langit gelap."),
      trPick("sd6-c2-post3", "“Tahun depan” in English is…", ["next year", "last year", "this year", "a year ago"], 0, "Tahun depan = next year."),
      pick("sd6-c2-post4", "I'm thirsty. — “I ___ get you some water.”", ["'ll", "am going", "got"], 0, "Tawaran spontan → I'll."),
      arrange("sd6-c2-post5", "Put the words in order.", "What are you going to do tomorrow", "What are you going to do …?"),
      pick("sd6-c2-post6", "What time will they arrive back at school?", ["about five p.m.", "six a.m.", "noon"], 0, "Baris 6.", { passageId: PLANS.id }),
      match("sd6-c2-post7", "Match the sentence and its use.", [["I'll help you.", "offer"], ["I promise I'll study.", "promise"], ["I think it will rain.", "prediction"]], "Fungsi will!"),
      fill("sd6-c2-post8", "Complete: She ___ not going to come. (is/are)", "She", "not going to come.", ["is"], "She is not going to come."),
      pick("sd6-c2-post9", "Which activity happens BEFORE lunch?", ["visiting the observatory", "picking strawberries", "going home"], 0, "Observatorium sebelum makan siang.", { passageId: PLANS.id, hots: true }),
      pick("sd6-c2-post10", "Your friend forgot his pencil case before a test. The best response is…", ["Don't worry, I'll lend you a pencil.", "I'm going to lend you a pencil last week.", "You will forget it."], 0, "Tawaran spontan yang menolong.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — The Future Is Bright",
    questions: [
      live("sd6-c2-live1", "I ___ going to study.", ["am", "is", "are", "be"], 0, "open-book"),
      live("sd6-c2-live2", "Dark clouds! It's ___ rain.", ["going to", "will to", "went to", "go"], 0, "rain"),
      live("sd6-c2-live3", "won't = …", ["will not", "want not", "was not", "would"], 0, "question"),
      live("sd6-c2-live4", "Phone rings: “I ___ get it!”", ["'ll", "am going", "got", "did"], 0, "phone-call"),
      live("sd6-c2-live5", "“Besok” is…", ["tomorrow", "yesterday", "today", "tonight"], 0, "calendar", true),
      live("sd6-c2-live6", "They ___ going to travel by train.", ["are", "is", "am", "be"], 0, "train"),
      live("sd6-c2-live7", "I think it ___ be sunny.", ["will", "is", "going", "was"], 0, "afternoon"),
      live("sd6-c2-live8", "A promise:", ["I will be on time.", "I was on time.", "I am time.", "I go time."], 0, "clock"),
    ],
  },
};
