import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 7 (SMP, Fase D). Chapter 5 — My School Life · Chapter 6 — Hobbies and Free Time

const PESANTREN: Passage = {
  id: "smp7-c5-pesantren",
  title: "A Day at My Boarding School",
  pic: "school",
  lines: [
    "My name is Fatimah, and I study at an Islamic boarding school in Jombang, East Java.",
    "My day starts very early. I wake up at four o'clock and pray with my friends in the mosque.",
    "After that, we usually recite the Qur'an until half past five. Then I take a shower and have breakfast in the dining hall.",
    "Classes begin at seven. We study general subjects like maths, science and English in the morning.",
    "At noon, we have lunch and a short rest. In the afternoon, we study Arabic and religious subjects.",
    "I often play volleyball or practise hadrah music after school. On Fridays, we clean the dormitory together.",
    "In the evening, we study together in the hall from eight to nine. We never use mobile phones on weekdays.",
    "I go to bed at ten. Life here is busy, but I am happy because I have many friends and I am becoming more independent.",
  ],
};

export const CH5: Level = {
  id: "smp7-ch5",
  title: "Chapter 5 — My School Life",
  description: "Tell the time, describe daily routines and school schedules with the simple present and adverbs of frequency, and read about a day at a boarding school.",
  targetScore: "Structure · Listening · Reading",
  cover: ["school", "clock", "open-book"],
  pretest: {
    id: "smp7-c5-pre",
    title: "Chapter 5 Pretest",
    passPercent: 0,
    questions: [
      pick("smp7-c5-pre1", "What time is it?", ["It's half past seven.", "It's seven o'clock.", "It's eight thirty.", "It's a quarter to seven."], 0, "Jam 7.30 = half past seven.", { image: "time-7-30" }),
      listen("smp7-c5-pre2", voice("I usually go to school by bike."), "Listen. How does he usually go to school?", ["by bike", "by bus", "on foot", "by car"], 0, "By bike."),
      trPick("smp7-c5-pre3", "“Jarang” in English is…", ["rarely", "always", "usually", "often"], 0, "Jarang = rarely."),
      pick("smp7-c5-pre4", "She ___ breakfast at six.", ["has", "have", "having", "is have"], 0, "She → has."),
      pick("smp7-c5-pre5", "Which subject studies plants and animals?", ["biology / science", "history", "maths", "art"], 0, "IPA/biologi."),
    ],
  },
  lessons: [
    {
      id: "smp7-c5-l1",
      skill: "listening",
      title: "Time and School Schedules",
      summary: "Telling the time in two ways, school subjects and timetables.",
      sections: [
        {
          title: "Telling the time",
          blocks: [
            table(["Time", "Way 1", "Way 2"], [["07.00", "seven o'clock", "seven"], ["07.15", "a quarter past seven", "seven fifteen"], ["07.30", "half past seven", "seven thirty"], ["07.45", "a quarter to eight", "seven forty-five"], ["07.10", "ten past seven", "seven ten"], ["07.50", "ten to eight", "seven fifty"]]),
            pics([["time-7", "seven o'clock"], ["time-9-30", "half past nine"], ["time-12", "twelve o'clock"]]),
            text("**Past** = lewat (menit 1–30), **to** = kurang (menit 31–59). **a.m.** = tengah malam sampai siang, **p.m.** = siang sampai tengah malam."),
            repeat(["It's a quarter past seven.", "It's half past ten.", "It's ten to three.", "School starts at seven a.m."]),
          ],
        },
        {
          title: "Our timetable",
          blocks: [
            table(["Time", "Monday", "Wednesday", "Friday"], [["07.00–07.40", "Flag ceremony", "Maths", "Physical Education"], ["07.40–09.00", "Indonesian", "English", "Physical Education"], ["09.00–09.20", "Break", "Break", "Break"], ["09.20–10.40", "Science", "Social Studies", "Religion"], ["10.40–12.00", "Maths", "Art and Culture", "—"]]),
            audio("Checking the timetable", say(["woman", "What do we have after the break on Wednesday?"], ["man", "Social studies, from twenty past nine to twenty to eleven."], ["woman", "And what's the last lesson?"], ["man", "Art and culture. Don't forget to bring your watercolours!"])),
            tryIt(pick("smp7-c5-l1-try1", "When is Physical Education?", ["on Friday, first and second period", "on Monday after the break", "every day"], 0, "Lihat jadwal hari Jumat.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp7-c5-l1-c1", voice("The bus leaves at a quarter to eight."), "Listen. What time does the bus leave?", ["07.45", "08.15", "07.15"], 0, "A quarter to eight = 07.45."),
        pick("smp7-c5-l1-c2", "10.30 is…", ["half past ten", "half past eleven", "ten to three"], 0, "Half past ten."),
        match("smp7-c5-l1-c3", "Match the time.", [["06.15", "a quarter past six"], ["09.50", "ten to ten"], ["01.30", "half past one"], ["04.00", "four o'clock"]], "Membaca jam."),
        trPick("smp7-c5-l1-c4", "“Upacara bendera” in English is…", ["flag ceremony", "flag festival", "flag lesson"], 0, "Flag ceremony."),
        fill("smp7-c5-l1-c5", "Complete: The break is from nine ___ twenty past nine.", "The break is from nine", "twenty past nine.", ["to", "until", "till"], "From … to …"),
        pick("smp7-c5-l1-c6", "Look at the timetable. Which subject is on Monday AND Wednesday?", ["Maths", "English", "Religion"], 0, "Maths ada di Senin dan Rabu.", { hots: true }),
      ],
    },
    {
      id: "smp7-c5-l2",
      skill: "structure",
      title: "Simple Present and Adverbs of Frequency",
      summary: "Routines and habits: I/you/we/they + verb, he/she + verb-s; always, usually, often, sometimes, rarely, never.",
      sections: [
        {
          title: "Simple present",
          blocks: [
            table(["", "I / You / We / They", "He / She / It"], [["Positive", "I wake up at five.", "She wakes up at five."], ["Negative", "I don't watch TV at night.", "He doesn't watch TV at night."], ["Question", "Do you walk to school?", "Does she walk to school?"]]),
            table(["Spelling rule (he/she/it)", "Example"], [["most verbs + s", "play → plays, read → reads"], ["-ch, -sh, -s, -x, -o + es", "watch → watches, go → goes, do → does"], ["consonant + y → ies", "study → studies, carry → carries"], ["have → has", "She has lunch at noon."]]),
            examples([{ wrong: "She don't like maths.", right: "She doesn't like maths." }, { wrong: "Does he plays football?", right: "Does he play football?" }], "Watch out"),
          ],
        },
        {
          title: "How often?",
          blocks: [
            table(["Adverb", "Meaning", "How often"], [["always", "selalu", "100%"], ["usually", "biasanya", "90%"], ["often", "sering", "70%"], ["sometimes", "kadang-kadang", "50%"], ["rarely / seldom", "jarang", "10%"], ["never", "tidak pernah", "0%"]]),
            text("Posisi: **sebelum kata kerja utama** (*I **always** brush my teeth*) tetapi **setelah be** (*She is **never** late*). Ungkapan lain: *every day, once a week, twice a month, on Sundays*."),
            tryIt(pick("smp7-c5-l2-try1", "Choose the correct sentence.", ["He is always on time.", "He always is on time.", "Always he is on time."], 0, "Setelah be.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp7-c5-l2-c1", voice("My brother never does his homework in the morning. He always does it after dinner."), "Listen. When does her brother do his homework?", ["after dinner", "in the morning", "at school"], 0, "Always … after dinner."),
        pick("smp7-c5-l2-c2", "My sister ___ English every evening.", ["studies", "study", "studys"], 0, "Konsonan + y → ies."),
        pick("smp7-c5-l2-c3", "___ your father go to work by train?", ["Does", "Do", "Is"], 0, "Your father = he → Does."),
        arrange("smp7-c5-l2-c4", "Put the words in order.", "I sometimes walk to school", "Adverb sebelum kata kerja."),
        trPick("smp7-c5-l2-c5", "“Dia tidak pernah terlambat.” in English is…", ["She is never late.", "She never is late.", "She doesn't never late."], 0, "Never setelah be."),
        pick("smp7-c5-l2-c6", "Rudi plays futsal on Monday, Wednesday, Friday and Saturday. Which is TRUE?", ["He often plays futsal.", "He never plays futsal.", "He rarely plays futsal."], 0, "Empat kali seminggu = often.", { hots: true }),
      ],
    },
    {
      id: "smp7-c5-l3",
      skill: "reading",
      title: "Reading: A Day at My Boarding School",
      summary: "Read about life in a pesantren and describe your own daily routine.",
      passages: [PESANTREN],
      sections: [
        {
          title: "Fatimah's day",
          blocks: [
            { type: "passage", passage: PESANTREN },
            audio("Listen and read", say(["woman", PESANTREN.lines.join(" ")])),
            vocab([["boarding school", "sekolah berasrama/pesantren", "school"], ["recite", "membaca/melantunkan", "open-book"], ["dormitory", "asrama", "bed"], ["independent", "mandiri", "thumbs-up"]], "Words from the text"),
          ],
        },
        {
          title: "Your routine",
          blocks: [
            speaking({
              id: "smp7-c5-l3-say",
              title: "My daily routine",
              prompt: "Describe a normal school day from the morning to the night. Use times, sequence words and at least four adverbs of frequency.",
              image: "alarm",
              seconds: 90,
              tips: ["I usually wake up at …", "Then I … At … I …", "After school, I sometimes …", "I never … on school nights.", "I go to bed at …"],
              models: [{ label: "Example", text: "On school days, I usually wake up at a quarter past five. I pray, take a shower and have breakfast with my family. I always eat nasi uduk because my mother sells it! I go to school by angkot at half past six. Classes start at seven and finish at two. After school, I often join the scout club, and I sometimes play futsal with my friends. In the evening, I do my homework and help my little brother with his reading. I never play games on school nights. I go to bed at about half past nine." }],
              rubric: ["I gave at least five times.", "I used four adverbs of frequency in the right position.", "I used the simple present correctly.", "I used sequence words (then, after that, in the evening)."],
            }),
            writing({
              id: "smp7-c5-l3-write",
              title: "A friend's routine",
              prompt: "Interview a friend or a family member about their daily routine, then write a paragraph about it using he/she.",
              image: "chat",
              minWords: 90,
              maxWords: 180,
              tips: ["My … is … He/She …", "He/She usually gets up at …", "He/She doesn't … because …", "On weekends, he/she …"],
              models: [{ label: "Example", text: "My mother is a midwife at a community health centre. She gets up at half past four every morning. She always prepares breakfast for the family before she takes a shower. She leaves home at a quarter to seven and rides her motorbike to work. At the health centre, she checks pregnant women and sometimes helps babies come into the world! She usually comes home at four, but sometimes she has to go back at night. She rarely watches TV because she is tired. On Sundays, she often makes cakes with me." }],
              rubric: ["I used he/she + verb-s/es correctly.", "I included times and adverbs of frequency.", "I used at least one negative (doesn't).", "My paragraph is in a logical order."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("smp7-c5-l3-c1", "What time does Fatimah wake up?", ["at four o'clock", "at five o'clock", "at seven o'clock"], 0, "Baris 2.", { passageId: PESANTREN.id }),
        pick("smp7-c5-l3-c2", "When does she study Arabic?", ["in the afternoon", "in the morning", "at night"], 0, "Baris 5.", { passageId: PESANTREN.id }),
        fill("smp7-c5-l3-c3", "Complete.", "On Fridays, we clean the", "together.", ["dormitory"], "Baris 6.", { passageId: PESANTREN.id }),
        pickMany("smp7-c5-l3-c4", "Choose ALL the activities she does after school.", ["play volleyball", "practise hadrah music", "use her mobile phone", "go home"], [0, 1], "Baris 6.", { passageId: PESANTREN.id }),
        pick("smp7-c5-l3-c5", "“We never use mobile phones on weekdays.” Why might the school have this rule?", ["so students can focus on studying and friends", "because phones are expensive", "because there is no signal"], 0, "Aturan untuk fokus.", { passageId: PESANTREN.id, hots: true }),
        pick("smp7-c5-l3-c6", "How does Fatimah feel about her school life?", ["busy but happy", "bored and lonely", "angry"], 0, "Baris 8.", { passageId: PESANTREN.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp7-c5-post",
    title: "Chapter 5 Posttest",
    passPercent: 70,
    passages: [PESANTREN],
    questions: [
      pick("smp7-c5-post1", "My father ___ coffee every morning.", ["drinks", "drink", "drinking", "is drink"], 0, "He → drinks."),
      listen("smp7-c5-post2", voice("English is on Tuesday and Thursday, from ten past eight to half past nine."), "Listen. When does English finish?", ["09.30", "08.10", "10.30", "09.10"], 0, "Half past nine = 09.30."),
      trPick("smp7-c5-post3", "“Biasanya” in English is…", ["usually", "never", "rarely", "suddenly"], 0, "Biasanya = usually."),
      pick("smp7-c5-post4", "___ they have lunch at school?", ["Do", "Does", "Are", "Is"], 0, "They → Do."),
      arrange("smp7-c5-post5", "Put the words in order.", "She doesn't go to school on Sunday", "She doesn't + kata kerja dasar."),
      pick("smp7-c5-post6", "Where does Fatimah eat breakfast?", ["in the dining hall", "in her room", "at a café", "at home"], 0, "Baris 3.", { passageId: PESANTREN.id }),
      match("smp7-c5-post7", "Match the verb and the he/she form.", [["watch", "watches"], ["fly", "flies"], ["have", "has"], ["play", "plays"]], "Aturan -s/-es."),
      fill("smp7-c5-post8", "Complete: I ___ (not/like) waking up early.", "I", "waking up early.", ["don't like", "do not like"], "I → don't."),
      pick("smp7-c5-post9", "How long does Fatimah study together in the evening?", ["one hour", "two hours", "thirty minutes", "three hours"], 0, "Pukul 8 sampai 9 (baris 7).", { passageId: PESANTREN.id, hots: true }),
      pick("smp7-c5-post10", "Which word best describes a boarding school student's life, based on the text?", ["disciplined", "lazy", "boring", "lonely"], 0, "Jadwal teratur = disiplin.", { passageId: PESANTREN.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Tick Tock School",
    questions: [
      live("smp7-c5-live1", "07.30 =", ["half past seven", "half past eight", "seven fifteen", "a quarter to seven"], 0, "time-7-30"),
      live("smp7-c5-live2", "She ___ to school.", ["walks", "walk", "walking", "walkes"], 0, "school"),
      live("smp7-c5-live3", "0% =", ["never", "always", "often", "sometimes"], 0, "question"),
      live("smp7-c5-live4", "___ he play chess?", ["Does", "Do", "Is", "Are"], 0, "blocks"),
      live("smp7-c5-live5", "“Asrama” =", ["dormitory", "dining hall", "library", "classroom"], 0, "bed", true),
      live("smp7-c5-live6", "study → he …", ["studies", "studys", "studyes", "study"], 0, "open-book"),
      live("smp7-c5-live7", "08.45 =", ["a quarter to nine", "a quarter past eight", "eight fifty", "nine fifteen"], 0, "clock"),
      live("smp7-c5-live8", "Correct:", ["I am always happy.", "I always am happy.", "Always I am happy.", "I happy always."], 0, "happy"),
    ],
  },
};

const BLOG: Passage = {
  id: "smp7-c6-blog",
  title: "Blog: Why I Love Making Comics",
  pic: "palette",
  lines: [
    "Hi, I'm Raka, and I'm crazy about drawing comics!",
    "I started drawing when I was eight. Now I'm thirteen, and I draw almost every day.",
    "I enjoy creating my own characters. My favourite is Kapten Kucing, a brave cat who protects the forests of Kalimantan.",
    "I usually draw with a pencil first, then I use a black pen and colour pencils. I can also draw on my father's old tablet.",
    "Drawing helps me relax. When I'm stressed about tests, I open my sketchbook and forget my problems.",
    "Right now, I'm working on a new story. Kapten Kucing is fighting a group of illegal loggers!",
    "My dream is to publish my comic one day. I'm practising hard and watching tutorials online.",
    "What about you? What do you like doing in your free time? Leave a comment below!",
  ],
};

export const CH6: Level = {
  id: "smp7-ch6",
  title: "Chapter 6 — Hobbies and Free Time",
  description: "Talk about likes and dislikes with verb-ing, abilities with can and can't, and things happening now with the present continuous.",
  targetScore: "Speaking · Structure · Reading",
  cover: ["guitar", "football", "camera"],
  pretest: {
    id: "smp7-c6-pre",
    title: "Chapter 6 Pretest",
    passPercent: 0,
    questions: [
      pick("smp7-c6-pre1", "I enjoy ___ to music.", ["listening", "listen", "to listen", "listened"], 0, "Enjoy + verb-ing."),
      listen("smp7-c6-pre2", voice("I can play the guitar, but I can't play the piano."), "Listen. What can he play?", ["the guitar", "the piano", "both", "nothing"], 0, "Can play the guitar."),
      trPick("smp7-c6-pre3", "“Waktu luang” in English is…", ["free time", "busy time", "lunch time", "time out"], 0, "Waktu luang = free time."),
      pick("smp7-c6-pre4", "Look! The children ___ football in the rain.", ["are playing", "play", "plays", "played"], 0, "Look! → sedang terjadi.", { image: "football" }),
      pick("smp7-c6-pre5", "Which is a hobby?", ["gardening", "breakfast", "homework", "sleeping in class"], 0, "Berkebun adalah hobi."),
    ],
  },
  lessons: [
    {
      id: "smp7-c6-l1",
      skill: "speaking",
      title: "Likes and Dislikes",
      summary: "love / like / enjoy / don't mind / don't like / hate + verb-ing; asking about hobbies.",
      sections: [
        {
          title: "How much do you like it?",
          blocks: [
            table(["Expression", "Feeling", "Example"], [["I'm crazy about …", "😍 sangat suka", "I'm crazy about anime."], ["I love / I really enjoy …", "😀", "I love swimming."], ["I like …", "🙂", "I like reading novels."], ["I don't mind …", "😐 tidak keberatan", "I don't mind washing the dishes."], ["I don't like …", "🙁", "I don't like running."], ["I hate / I can't stand …", "😠 sangat tidak suka", "I can't stand waiting."]]),
            text("Setelah **love, like, enjoy, hate, don't mind, be interested in, be good at**, pakai **kata kerja -ing**: *I'm good at **singing**. She's interested in **cooking**.*"),
            pics([["guitar", "playing music"], ["badminton", "playing badminton"], ["camera", "taking photos"], ["palette", "painting"], ["fishing", "fishing"], ["gamepad", "gaming"]]),
          ],
        },
        {
          title: "Asking about hobbies",
          blocks: [
            audio("A new classmate", say(["man", "What do you like doing in your free time, Nisa?"], ["woman", "I love taking photos, especially of birds. What about you?"], ["man", "I'm crazy about badminton. I play every afternoon."], ["woman", "Cool! Are you good at it?"], ["man", "I'm not bad. I'm in the school team. Do you like sports?"], ["woman", "Not really. I don't mind watching, but I hate running!"])),
            tryIt(pick("smp7-c6-l1-try1", "What does Nisa hate?", ["running", "taking photos", "watching sports"], 0, "I hate running.")),
            speaking({
              id: "smp7-c6-l1-say",
              title: "All about my hobbies",
              prompt: "Talk about your hobbies: what you love doing, what you don't mind doing and what you can't stand. Explain why and say how often you do your favourite hobby.",
              image: "gamepad",
              seconds: 75,
              tips: ["In my free time, I love …", "I'm good at … but I'm not very good at …", "I don't mind …", "I can't stand … because …"],
              models: [{ label: "Example", text: "In my free time, I really enjoy cooking. I watch cooking videos and try new recipes every weekend. I'm good at making fried rice, but I'm not very good at baking cakes. I don't mind washing the dishes after cooking. However, I can't stand shopping at crowded markets because it's too hot and noisy. My dream is to open a small café one day." }],
              rubric: ["I used at least four like/dislike expressions.", "I used verb-ing after them.", "I gave reasons with because.", "I said how often I do my hobby."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("smp7-c6-l1-c1", voice("I don't mind cleaning my room, but I hate ironing clothes."), "Listen. What does she hate?", ["ironing clothes", "cleaning her room", "washing dishes"], 0, "I hate ironing."),
        pick("smp7-c6-l1-c2", "He is good at ___ .", ["drawing", "draw", "draws"], 0, "Good at + -ing."),
        match("smp7-c6-l1-c3", "Match the feeling and the expression.", [["😍", "I'm crazy about it."], ["😐", "I don't mind it."], ["😠", "I can't stand it."], ["🙂", "I like it."]], "Tingkat suka."),
        fill("smp7-c6-l1-c4", "Complete: She's interested ___ learning Japanese.", "She's interested", "learning Japanese.", ["in"], "Interested in."),
        trPick("smp7-c6-l1-c5", "“Aku tidak tahan menunggu.” in English is…", ["I can't stand waiting.", "I can't stand wait.", "I don't stand to wait."], 0, "Can't stand + -ing."),
        pick("smp7-c6-l1-c6", "Mila says: “I don't mind doing homework.” What does she mean?", ["It's okay for her; she doesn't hate it.", "She loves it very much.", "She never does it."], 0, "Don't mind = tidak keberatan.", { hots: true }),
      ],
    },
    {
      id: "smp7-c6-l2",
      skill: "structure",
      title: "Can and Present Continuous",
      summary: "Abilities with can / can't; actions happening now with am/is/are + verb-ing.",
      sections: [
        {
          title: "Abilities: can and can't",
          blocks: [
            table(["", "Example"], [["Positive", "I can swim. She can speak three languages."], ["Negative", "He can't ride a bike."], ["Question", "Can you play chess? — Yes, I can. / No, I can't."], ["Degree", "I can swim very well / quite well / a little."]]),
            warn("Setelah **can**, kata kerja selalu bentuk dasar dan tidak ada *to*: *She can **sing*** (bukan *can sings* / *can to sing*)."),
          ],
        },
        {
          title: "Happening now",
          blocks: [
            table(["Subject", "be", "verb-ing"], [["I", "am", "reading."], ["He / She / It", "is", "drawing."], ["You / We / They", "are", "playing."]]),
            table(["Spelling", "Example"], [["most verbs + ing", "read → reading"], ["-e → drop e + ing", "write → writing, ride → riding"], ["short verb (CVC) → double + ing", "swim → swimming, run → running, sit → sitting"]]),
            table(["Simple present (habits)", "Present continuous (now)"], [["I usually play badminton on Sundays.", "Look! I'm playing badminton right now."], ["She often reads comics.", "She is reading a comic at the moment."]]),
            tryIt(pick("smp7-c6-l2-try1", "Shh! The baby ___ .", ["is sleeping", "sleeps", "sleep"], 0, "Sedang tidur sekarang.", { image: "sleep" })),
          ],
        },
      ],
      checkpoint: [
        listen("smp7-c6-l2-c1", voice("I'm sorry, I can't talk now. I'm cooking dinner."), "Listen. Why can't she talk?", ["She is cooking.", "She is sleeping.", "She is driving."], 0, "I'm cooking dinner."),
        pick("smp7-c6-l2-c2", "My little brother can ___ a bike now.", ["ride", "rides", "riding"], 0, "Can + bentuk dasar."),
        fill("smp7-c6-l2-c3", "Complete: Look! They are ___ (swim) in the river.", "Look! They are", "in the river.", ["swimming"], "Swim → swimming."),
        pick("smp7-c6-l2-c4", "Which sentence is about a habit?", ["I usually go fishing on Sundays.", "I'm going fishing now.", "Look! I'm fishing."], 0, "Usually → simple present."),
        trPick("smp7-c6-l2-c5", "“Dia sedang menulis surat sekarang.” in English is…", ["She is writing a letter now.", "She writes a letter now.", "She is writeing a letter now."], 0, "Write → writing."),
        pick("smp7-c6-l2-c6", "Find the mistake: “Can you to play the drum? — Yes, I can play.”", ["Remove “to” after can.", "Change “can” to “do”.", "There is no mistake."], 0, "Can + kata kerja dasar tanpa to.", { hots: true }),
      ],
    },
    {
      id: "smp7-c6-l3",
      skill: "reading",
      title: "Reading: Why I Love Making Comics",
      summary: "Read a hobby blog post and write a comment or your own post.",
      passages: [BLOG],
      sections: [
        {
          title: "Raka's blog",
          blocks: [
            { type: "passage", passage: BLOG },
            audio("Listen and read", say(["man", BLOG.lines.join(" ")])),
            vocab([["character", "tokoh", "owl"], ["sketchbook", "buku sketsa", "book"], ["illegal loggers", "penebang liar", "tree"], ["publish", "menerbitkan", "open-book"]], "Words from the text"),
          ],
        },
        {
          title: "Write a blog post",
          blocks: [
            tryIt(pick("smp7-c6-l3-try1", "How old was Raka when he started drawing?", ["eight", "thirteen", "ten"], 0, "Baris 2.", { passageId: BLOG.id })),
            writing({
              id: "smp7-c6-l3-write",
              title: "My hobby blog post",
              prompt: "Write a blog post about your favourite hobby: when you started, what you do, what you can do, what you are doing these days and your dream.",
              image: "laptop",
              minWords: 100,
              maxWords: 200,
              tips: ["Hi, I'm … and I love …", "I started … when I was …", "I can … but I can't … yet.", "Right now, I'm …", "My dream is …", "What about you?"],
              models: [{ label: "Example", text: "Hello, readers! I'm Kezia, and I'm crazy about pencak silat. I started training when I was nine because my uncle is a silat teacher. Now I practise three times a week at our village hall. I can do many kicks and I can break a thin wooden board, but I can't do a perfect jumping kick yet. Silat makes me strong and confident, and it teaches me to respect others. These days, I'm preparing for a regional competition in Manado. I'm training extra hard and eating healthy food. My dream is to represent Indonesia at the SEA Games. Do you do any martial arts? Tell me in the comments!" }],
              rubric: ["I said when and why I started.", "I used like/love/enjoy + -ing.", "I used can and can't for abilities.", "I used the present continuous for what I'm doing now.", "I ended with a question to readers."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("smp7-c6-l3-c1", "Who is Kapten Kucing?", ["a brave cat who protects the forests", "Raka's pet", "a famous comic artist"], 0, "Baris 3.", { passageId: BLOG.id }),
        pickMany("smp7-c6-l3-c2", "Choose ALL the tools Raka uses.", ["a pencil", "a black pen", "colour pencils", "watercolours"], [0, 1, 2], "Baris 4.", { passageId: BLOG.id }),
        fill("smp7-c6-l3-c3", "Complete.", "Drawing helps me", ".", ["relax"], "Baris 5.", { passageId: BLOG.id }),
        pick("smp7-c6-l3-c4", "Which line uses the present continuous for an action happening around now?", ["line 6", "line 2", "line 4"], 0, "Baris 6: I'm working on …", { passageId: BLOG.id }),
        pick("smp7-c6-l3-c5", "What message about the environment is in Raka's new story?", ["Forests should be protected from illegal logging.", "Cats are better than dogs.", "Tablets are expensive."], 0, "Melawan penebang liar.", { passageId: BLOG.id, hots: true }),
        pick("smp7-c6-l3-c6", "Why does Raka end with a question?", ["to invite readers to interact", "because he forgot something", "to finish a test"], 0, "Ajakan berkomentar.", { passageId: BLOG.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp7-c6-post",
    title: "Chapter 6 Posttest",
    passPercent: 70,
    passages: [BLOG],
    questions: [
      pick("smp7-c6-post1", "My grandmother enjoys ___ orchids.", ["growing", "grow", "grows", "to grows"], 0, "Enjoy + -ing."),
      listen("smp7-c6-post2", say(["woman", "Can you come to the phone?"], ["man", "Not now, Mom. I'm doing my homework."]), "Listen. What is the boy doing?", ["his homework", "playing games", "taking a shower", "sleeping"], 0, "I'm doing my homework."),
      trPick("smp7-c6-post3", "“Dia pandai bernyanyi.” in English is…", ["She is good at singing.", "She is good in sing.", "She good sing.", "She can good singing."], 0, "Good at + -ing."),
      pick("smp7-c6-post4", "___ you speak Javanese? — Yes, a little.", ["Can", "Are", "Does", "Is"], 0, "Kemampuan → Can."),
      arrange("smp7-c6-post5", "Put the words in order.", "They are playing chess in the hall", "Present continuous."),
      pick("smp7-c6-post6", "What does Raka do when he is stressed about tests?", ["opens his sketchbook", "plays football", "sleeps", "watches TV"], 0, "Baris 5.", { passageId: BLOG.id }),
      match("smp7-c6-post7", "Match the verb and the -ing form.", [["run", "running"], ["write", "writing"], ["play", "playing"], ["sit", "sitting"]], "Ejaan -ing."),
      fill("smp7-c6-post8", "Complete: He ___ (not/can) swim, so he wears a life jacket.", "He", "swim, so he wears a life jacket.", ["can't", "cannot"], "Tidak bisa = can't."),
      pick("smp7-c6-post9", "Which sentence about Raka is an opinion, NOT a fact?", ["Drawing comics is the best hobby in the world.", "He is thirteen.", "He draws almost every day.", "He watches tutorials online."], 0, "Opini tidak bisa dibuktikan.", { passageId: BLOG.id, hots: true }),
      pick("smp7-c6-post10", "What can we say about Raka's attitude to his dream?", ["He is serious and works hard for it.", "He doesn't care about it.", "He wants someone else to draw.", "He is giving up."], 0, "Baris 7: practising hard.", { passageId: BLOG.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Free Time Frenzy",
    questions: [
      live("smp7-c6-live1", "I love ___.", ["dancing", "dance", "dances", "danced"], 0, "microphone"),
      live("smp7-c6-live2", "swim + ing =", ["swimming", "swiming", "swimeing", "swimmming"], 0, "swim"),
      live("smp7-c6-live3", "Look! She ___ painting.", ["is", "are", "am", "be"], 0, "palette"),
      live("smp7-c6-live4", "He can ___ the drum.", ["play", "plays", "playing", "to play"], 0, "drum"),
      live("smp7-c6-live5", "“Waktu luang” =", ["free time", "busy time", "spare part", "time off work"], 0, "gamepad", true),
      live("smp7-c6-live6", "Not hate, not love:", ["I don't mind it.", "I'm crazy about it.", "I can't stand it.", "I adore it."], 0, "question"),
      live("smp7-c6-live7", "Habit or now? “I often fish.”", ["habit", "now", "future", "past"], 0, "fishing"),
      live("smp7-c6-live8", "Good ___ drawing", ["at", "in", "on", "for"], 0, "pencil"),
    ],
  },
};
