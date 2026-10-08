import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, say, speaking, table, text, tip, trMatch, trPick, tryIt, vocab, voice, writing } from "../kit";

// Grade 5 (Fase C). Chapter 1 — My School Subjects · Chapter 2 — Describing People

const TIMETABLE: Passage = {
  id: "sd5-c1-timetable",
  title: "Nadia's Favorite Day",
  pic: "school",
  lines: [
    "My name is Nadia. I am in grade five at SD Harapan Bangsa.",
    "My favorite day is Wednesday because I have Art and English.",
    "On Wednesday, the first lesson is Math at seven o'clock.",
    "After that, we have English. Our teacher, Ms. Rika, is very funny.",
    "After the break, we have Art. We usually draw or make crafts.",
    "The last lesson is Physical Education. We play volleyball on the field.",
    "I don't like Math very much because it is difficult for me, but I practise every day.",
  ],
};

export const CH1: Level = {
  id: "sd5-ch1",
  title: "Chapter 1 — My School Subjects",
  description: "Name school subjects, read a timetable, and say which subjects you like and why.",
  targetScore: "Listening · Speaking · Reading · Writing",
  cover: ["school", "open-book", "palette"],
  pretest: {
    id: "sd5-c1-pre",
    title: "Chapter 1 Pretest",
    passPercent: 0,
    questions: [
      pick("sd5-c1-pre1", "We study numbers in…", ["Math", "Art", "Music", "English"], 0, "Matematika = Math."),
      listen("sd5-c1-pre2", voice("My favorite subject is Science."), "Listen. What is her favorite subject?", ["Science", "Social Studies", "Sports", "Spanish"], 0, "Science = IPA."),
      trPick("sd5-c1-pre3", "“Pendidikan Jasmani (olahraga)” in English is…", ["Physical Education", "Physics", "Art", "Civics"], 0, "PJOK = Physical Education (PE)."),
      pick("sd5-c1-pre4", "Which subject uses paint and pencils to make pictures?", ["Art", "Math", "Science", "Indonesian"], 0, "Menggambar = Art.", { image: "palette" }),
      pick("sd5-c1-pre5", "“I like English ___ it's fun.”", ["because", "but", "and", "or"], 0, "Alasan → because."),
    ],
  },
  lessons: [
    {
      id: "sd5-c1-l1",
      skill: "vocabulary",
      title: "School Subjects",
      summary: "Math, Science, English, Indonesian, Social Studies, Art, Music, PE, Religion, Civics.",
      sections: [
        {
          title: "Subjects at school",
          blocks: [
            vocab([
              ["Math", "Matematika", "blocks", "We learn to add and divide."],
              ["Science", "IPA / Ilmu Pengetahuan Alam", "sprout", "We learn about plants and animals."],
              ["English", "Bahasa Inggris", "chat", "We learn to speak English."],
              ["Indonesian", "Bahasa Indonesia", "open-book", "We read Indonesian stories."],
              ["Social Studies", "IPS", "map", "We learn about people and places."],
              ["Art", "Seni Rupa", "palette", "We draw and paint."],
              ["Music", "Seni Musik", "guitar", "We sing and play instruments."],
              ["Physical Education (PE)", "PJOK / Olahraga", "football", "We play sports."],
              ["Religion", "Pendidikan Agama", "heart", "We learn about our faith."],
              ["Civics", "Pendidikan Pancasila", "flag", "We learn about our country."],
            ]),
            tip("Nama mata pelajaran ditulis dengan **huruf kapital**: **M**ath, **E**nglish, **A**rt."),
          ],
        },
        {
          title: "What do we learn?",
          blocks: [
            table(["Subject", "We…"], [["Math", "count, add, subtract, multiply"], ["Science", "do experiments, learn about nature"], ["Social Studies", "learn history and geography"], ["Music", "sing songs, play instruments"], ["PE", "run, jump, play games"]]),
            tryIt(pick("sd5-c1-l1-try1", "We do experiments in…", ["Science", "Music", "Religion"], 0, "Eksperimen → Science.", { image: "sprout" })),
          ],
        },
      ],
      checkpoint: [
        listen("sd5-c1-l1-c1", voice("We sing songs in Music."), "Listen. Which subject?", ["Music", "Math", "Art"], 0, "Music."),
        match("sd5-c1-l1-c2", "Match the picture and the subject.", [["pic:palette", "Art"], ["pic:football", "PE"], ["pic:map", "Social Studies"], ["pic:guitar", "Music"]], "Bagus!"),
        trPick("sd5-c1-l1-c3", "“IPS” in English is…", ["Social Studies", "Science", "Sports"], 0, "IPS = Social Studies."),
        fill("sd5-c1-l1-c4", "Complete: We add and subtract numbers in ___ .", "We add and subtract numbers in", ".", ["Math", "Maths", "Mathematics"], "Matematika = Math."),
        pick("sd5-c1-l1-c5", "Which subject name is written correctly?", ["English", "english", "ENGlish"], 0, "Nama pelajaran diawali huruf kapital."),
        pick("sd5-c1-l1-c6", "“We learn about the planets and the sun.” Which subject is it?", ["Science", "Art", "Civics"], 0, "Planet dan matahari → IPA.", { hots: true }),
      ],
    },
    {
      id: "sd5-c1-l2",
      skill: "speaking",
      title: "My Favorite Subject",
      summary: "What's your favorite subject? I like … because … / I'm good at …",
      sections: [
        {
          title: "Talking about subjects",
          blocks: [
            audio("At break time", say(["man", "What's your favorite subject, Nadia?"], ["woman", "I like Art because I love drawing. What about you?"], ["man", "My favorite subject is Math. I'm good at numbers."], ["woman", "Really? Math is difficult for me."], ["man", "I can help you!"])),
            table(["Useful sentences", "Meaning"], [["My favorite subject is …", "Pelajaran favoritku …"], ["I like … because …", "Aku suka … karena …"], ["I'm good at …", "Aku pandai dalam …"], ["… is difficult / easy for me.", "… sulit / mudah bagiku."], ["I can help you!", "Aku bisa membantumu!"]]),
          ],
        },
        {
          title: "Your turn",
          blocks: [
            tryIt(pick("sd5-c1-l2-try1", "Why does Nadia like Art?", ["She loves drawing.", "She is good at numbers.", "It is easy."], 0, "I like Art because I love drawing.")),
            speaking({
              id: "sd5-c1-l2-say",
              title: "My favorite subject",
              prompt: "Talk about your favorite subject and one subject that is difficult for you. Give reasons.",
              image: "school",
              seconds: 50,
              tips: ["My favorite subject is … because …", "I'm good at …", "… is difficult for me, but I …"],
              models: [{ label: "Example", text: "My favorite subject is Science because I like doing experiments. I'm good at remembering animal names. English is a little difficult for me, but I practise every day." }],
              rubric: ["I named my favorite subject.", "I gave a reason with **because**.", "I talked about a difficult subject."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd5-c1-l2-c1", say(["woman", "What's your favorite subject?"], ["man", "PE. I love playing football."]), "Listen. What is his favorite subject?", ["PE", "Art", "Math"], 0, "PE = olahraga."),
        arrange("sd5-c1-l2-c2", "Put the words in order.", "My favorite subject is English", "My favorite subject is + pelajaran."),
        fill("sd5-c1-l2-c3", "Complete: I'm good ___ Math.", "I'm good", "Math.", ["at"], "Good at = pandai dalam."),
        pick("sd5-c1-l2-c4", "I like Music ___ I can play the piano.", ["because", "but", "so"], 0, "Alasan → because."),
        trPick("sd5-c1-l2-c5", "“Matematika sulit bagiku.” in English is…", ["Math is difficult for me.", "Math is easy for me.", "I am good at Math."], 0, "Sulit = difficult."),
        pick("sd5-c1-l2-c6", "Your friend says “Math is difficult for me.” A kind reply is…", ["I can help you!", "You are stupid.", "Me too, so stop trying."], 0, "Tawarkan bantuan.", { hots: true }),
      ],
    },
    {
      id: "sd5-c1-l3",
      skill: "reading",
      title: "Reading: Nadia's Favorite Day",
      summary: "Read about a school day and write your timetable.",
      passages: [TIMETABLE],
      sections: [
        {
          title: "Nadia's Wednesday",
          blocks: [
            { type: "passage", passage: TIMETABLE },
            audio("Listen and read", say(["woman", TIMETABLE.lines.join(" ")])),
            tip("Kata urutan **first, after that, after the break, the last** membantu kita mengikuti urutan pelajaran."),
            tryIt(pick("sd5-c1-l3-try1", "What is the first lesson on Wednesday?", ["Math", "English", "Art"], 0, "Baris 3.", { passageId: TIMETABLE.id })),
          ],
        },
        {
          title: "My timetable",
          blocks: [
            writing({
              id: "sd5-c1-l3-write",
              title: "My favorite school day",
              prompt: "Write about your favorite school day. Say the lessons in order and why you like the day.",
              image: "school",
              minWords: 40,
              maxWords: 110,
              tips: ["My favorite day is … because …", "The first lesson is …", "After that, we have …", "The last lesson is …"],
              models: [{ label: "Example", text: "My favorite day is Friday because we have PE and Music. The first lesson is Religion. After that, we have PE. We play badminton in the hall. After the break, we have Music. We sing Indonesian folk songs. The last lesson is Indonesian. I love Fridays!" }],
              rubric: ["I said my favorite day and why.", "I used sequence words (first, after that, the last).", "Subject names start with capital letters.", "I wrote at least five sentences."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd5-c1-l3-c1", "Why is Wednesday Nadia's favorite day?", ["She has Art and English.", "There is no school.", "She has Math twice."], 0, "Baris 2.", { passageId: TIMETABLE.id }),
        pick("sd5-c1-l3-c2", "Who is Ms. Rika?", ["the English teacher", "the Math teacher", "Nadia's sister"], 0, "Baris 4.", { passageId: TIMETABLE.id }),
        fill("sd5-c1-l3-c3", "Complete.", "We play", "on the field.", ["volleyball"], "Baris 6.", { passageId: TIMETABLE.id }),
        pickMany("sd5-c1-l3-c4", "Choose ALL the subjects Nadia has on Wednesday.", ["Math", "English", "Art", "PE", "Music"], [0, 1, 2, 3], "Math, English, Art, PE (Physical Education). Tidak ada Music.", { passageId: TIMETABLE.id }),
        pick("sd5-c1-l3-c5", "What do they do in Art?", ["draw or make crafts", "play volleyball", "count numbers"], 0, "Baris 5.", { passageId: TIMETABLE.id }),
        pick("sd5-c1-l3-c6", "Math is difficult for Nadia. What does she do about it?", ["She practises every day.", "She stops studying.", "She skips Math class."], 0, "Baris 7: but I practise every day.", { passageId: TIMETABLE.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd5-c1-post",
    title: "Chapter 1 Posttest",
    passPercent: 70,
    passages: [TIMETABLE],
    questions: [
      pick("sd5-c1-post1", "We learn about our country and Pancasila in…", ["Civics", "Music", "Art", "Math"], 0, "Pendidikan Pancasila = Civics.", { image: "flag" }),
      listen("sd5-c1-post2", voice("We do experiments with plants today."), "Listen. Which subject is it?", ["Science", "Music", "PE", "Religion"], 0, "Eksperimen tanaman → Science."),
      trPick("sd5-c1-post3", "“Seni Rupa” in English is…", ["Art", "Music", "Craft", "Science"], 0, "Seni Rupa = Art."),
      pick("sd5-c1-post4", "I'm good ___ drawing.", ["at", "in", "on", "for"], 0, "Good at."),
      arrange("sd5-c1-post5", "Put the words in order.", "I like Science because it is interesting", "I like … because …"),
      pick("sd5-c1-post6", "What is the last lesson on Wednesday?", ["Physical Education", "Art", "English", "Math"], 0, "Baris 6.", { passageId: TIMETABLE.id }),
      match("sd5-c1-post7", "Match.", [["Math", "numbers"], ["Music", "songs"], ["PE", "sports"], ["Social Studies", "history"]], "Tepat!"),
      fill("sd5-c1-post8", "Complete: The ___ lesson is Math. (pertama)", "The", "lesson is Math.", ["first"], "Pertama = first.", { translate: true }),
      pick("sd5-c1-post9", "Nadia has Art after the break and PE last. What comes between them?", ["Nothing — PE comes right after Art.", "Math", "English"], 0, "Urutannya: Math, English, (break), Art, PE.", { passageId: TIMETABLE.id, hots: true }),
      pick("sd5-c1-post10", "Rizky loves animals and plants. He wants to be a vet. Which subject helps him most?", ["Science", "Music", "Art", "Civics"], 0, "Dokter hewan perlu IPA.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Subject Challenge",
    questions: [
      live("sd5-c1-live1", "We count and divide in…", ["Math", "Art", "Music", "PE"], 0, "blocks"),
      live("sd5-c1-live2", "We paint and draw in…", ["Art", "Science", "Math", "Civics"], 0, "palette"),
      live("sd5-c1-live3", "We play sports in…", ["PE", "Music", "Math", "Religion"], 0, "football"),
      live("sd5-c1-live4", "I'm good ___ English.", ["at", "in", "on", "with"], 0, "chat"),
      live("sd5-c1-live5", "I like it ___ it's fun.", ["because", "but", "or", "so"], 0, "happy"),
      live("sd5-c1-live6", "“IPA” is…", ["Science", "Social Studies", "Sports", "Spelling"], 0, "sprout", true),
      live("sd5-c1-live7", "We learn history in…", ["Social Studies", "Music", "PE", "Art"], 0, "museum"),
      live("sd5-c1-live8", "Correct spelling:", ["Mathematics", "Mathematic", "Matematics", "Mathemathics"], 0, "blocks"),
    ],
  },
};

const PEN_PAL: Passage = {
  id: "sd5-c2-friend",
  title: "My Best Friend",
  pic: "girl",
  lines: [
    "My best friend is Putri. She is eleven years old.",
    "She is tall and slim. She has long black hair and brown eyes.",
    "She always wears a pink hairband.",
    "Putri is kind and funny. She tells jokes every day.",
    "She is also hardworking. She is the best student in our class.",
    "Sometimes she is a little shy when she meets new people.",
    "We often ride our bikes together after school.",
  ],
};

export const CH2: Level = {
  id: "sd5-ch2",
  title: "Chapter 2 — Describing People",
  description: "Describe what people look like and what they are like, using is and has, and write about a friend.",
  targetScore: "Vocabulary · Speaking · Writing",
  cover: ["girl", "grandfather", "happy"],
  pretest: {
    id: "sd5-c2-pre",
    title: "Chapter 2 Pretest",
    passPercent: 0,
    questions: [
      pick("sd5-c2-pre1", "The opposite of tall is…", ["short", "long", "thin", "big"], 0, "Tall ↔ short."),
      listen("sd5-c2-pre2", voice("She has long hair."), "Listen. Choose the picture.", ["pic:girl", "pic:boy", "pic:grandfather", "pic:baby"], 0, "Long hair = rambut panjang."),
      trPick("sd5-c2-pre3", "“Baik hati” in English is…", ["kind", "lazy", "angry", "shy"], 0, "Baik hati = kind."),
      pick("sd5-c2-pre4", "Choose the correct sentence.", ["He has short hair.", "He is short hair.", "He have short hair."], 0, "Fisik dengan benda (hair, eyes) → has."),
      pick("sd5-c2-pre5", "Grandpa wears ___ to read.", ["glasses", "shoes", "a hat"], 0, "Kacamata = glasses.", { image: "grandfather" }),
    ],
  },
  lessons: [
    {
      id: "sd5-c2-l1",
      skill: "vocabulary",
      title: "What Do They Look Like?",
      summary: "Tall, short, slim, long/short/curly/straight hair, glasses, beard.",
      sections: [
        {
          title: "Body and hair",
          blocks: [
            vocab([
              ["tall", "tinggi", "giraffe", "My brother is tall."],
              ["short", "pendek", "baby", "My little sister is short."],
              ["slim / thin", "langsing / kurus", "girl", "She is slim."],
              ["long hair", "rambut panjang", "girl", "She has long hair."],
              ["short hair", "rambut pendek", "boy", "He has short hair."],
              ["curly hair", "rambut keriting", "doll", "My cousin has curly hair."],
              ["straight hair", "rambut lurus", "girl", "I have straight hair."],
              ["glasses", "kacamata", "grandmother", "Grandma wears glasses."],
              ["a moustache", "kumis", "father", "My father has a moustache."],
            ]),
          ],
        },
        {
          title: "Is or has?",
          blocks: [
            table(["is + adjective", "has + noun"], [["She is tall.", "She has long hair."], ["He is slim.", "He has brown eyes."], ["Grandpa is old.", "Grandpa has a moustache."]]),
            tip("Urutan kata sifat untuk rambut: **ukuran → bentuk → warna + hair**: *long straight black hair* (rambut hitam lurus panjang)."),
            tryIt(pick("sd5-c2-l1-try1", "Look at Dad. He ___ a moustache.", ["has", "is", "are"], 0, "Has + benda (moustache).", { image: "father" })),
          ],
        },
      ],
      checkpoint: [
        listen("sd5-c2-l1-c1", voice("He wears glasses and he has short hair."), "Listen. Choose the person.", ["pic:doctor", "pic:girl", "pic:baby"], 0, "Kacamata dan rambut pendek."),
        pick("sd5-c2-l1-c2", "She ___ tall and slim.", ["is", "has", "have"], 0, "Is + kata sifat."),
        pick("sd5-c2-l1-c3", "Which order is correct?", ["long black hair", "black long hair", "hair long black"], 0, "Ukuran → warna → hair."),
        trMatch("sd5-c2-l1-c4", "Match.", [["curly", "keriting"], ["straight", "lurus"], ["glasses", "kacamata"]], "Bagus!"),
        fill("sd5-c2-l1-c5", "Complete: The opposite of long hair is ___ hair.", "The opposite of long hair is", "hair.", ["short"], "Long ↔ short."),
        pick("sd5-c2-l1-c6", "A giraffe has a very long neck. A giraffe is…", ["tall", "short", "curly"], 0, "Jerapah tinggi.", { hots: true, image: "giraffe" }),
      ],
    },
    {
      id: "sd5-c2-l2",
      skill: "speaking",
      title: "What Is She Like?",
      summary: "Personality: kind, friendly, funny, smart, hardworking, shy, lazy, brave.",
      sections: [
        {
          title: "Personality words",
          blocks: [
            vocab([
              ["kind", "baik hati", "heart"],
              ["friendly", "ramah", "hello"],
              ["funny", "lucu", "happy"],
              ["smart / clever", "pintar", "owl-read"],
              ["hardworking", "rajin", "open-book"],
              ["shy", "pemalu", "scared"],
              ["lazy", "malas", "feel-sleepy"],
              ["brave", "berani", "firefighter"],
            ]),
            text("**What does she look like?** menanyakan penampilan (tinggi, rambut). **What is she like?** menanyakan sifat (baik, lucu)."),
            table(["Question", "Answer"], [["What does she look like?", "She is tall. She has curly hair."], ["What is she like?", "She is kind and funny."]]),
          ],
        },
        {
          title: "Guess who",
          blocks: [
            audio("Guess who", say(["woman", "He is short and a little fat. He has a white beard and glasses. He is very kind and he tells great stories. He is my…"], ["man", "Grandfather!"])),
            tryIt(pick("sd5-c2-l2-try1", "What is the grandfather like?", ["kind", "lazy", "angry"], 0, "He is very kind.")),
            speaking({
              id: "sd5-c2-l2-say",
              title: "Guess who game",
              prompt: "Describe someone in your family without saying who. Say what they look like and what they are like. End with **Who is it?**",
              image: "grandmother",
              seconds: 50,
              tips: ["He/She is … (tall, short, slim).", "He/She has … (hair, eyes, glasses).", "He/She is … (kind, funny, brave).", "Who is it?"],
              models: [{ label: "Example", text: "She is not very tall. She has short grey hair and she wears glasses. She is very kind and she cooks delicious food for us. Who is it? It's my grandmother!" }],
              rubric: ["I used **is** + adjective.", "I used **has** + noun.", "I talked about appearance AND personality."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd5-c2-l2-c1", voice("My sister always helps people. She is very kind."), "Listen. What is the sister like?", ["kind", "lazy", "shy"], 0, "Kind = baik hati."),
        pick("sd5-c2-l2-c2", "“What is he like?” asks about…", ["personality", "height", "age"], 0, "What is he like? → sifat."),
        trPick("sd5-c2-l2-c3", "“Pemalu” in English is…", ["shy", "brave", "lazy"], 0, "Pemalu = shy."),
        arrange("sd5-c2-l2-c4", "Put the words in order.", "What does your teacher look like", "What does … look like?"),
        fill("sd5-c2-l2-c5", "Complete: The opposite of lazy is ___ .", "The opposite of lazy is", ".", ["hardworking", "diligent"], "Lazy ↔ hardworking."),
        pick("sd5-c2-l2-c6", "Rudi always studies, does his homework and helps at home. He is…", ["hardworking", "lazy", "shy"], 0, "Rajin = hardworking.", { hots: true }),
      ],
    },
    {
      id: "sd5-c2-l3",
      skill: "reading",
      title: "Reading: My Best Friend",
      summary: "Read a description and write about your best friend.",
      passages: [PEN_PAL],
      sections: [
        {
          title: "Meet Putri",
          blocks: [
            { type: "passage", passage: PEN_PAL },
            audio("Listen and read", say(["woman", PEN_PAL.lines.join(" ")])),
            tip("Teks deskripsi biasanya berurutan: **siapa** dia → **penampilan** → **sifat** → **kegiatan bersama**."),
            tryIt(pick("sd5-c2-l3-try1", "How old is Putri?", ["eleven", "ten", "twelve"], 0, "Baris 1.", { passageId: PEN_PAL.id })),
          ],
        },
        {
          title: "Write about your friend",
          blocks: [
            writing({
              id: "sd5-c2-l3-write",
              title: "My best friend",
              prompt: "Describe your best friend: appearance, personality and what you do together.",
              image: "boy",
              minWords: 45,
              maxWords: 120,
              tips: ["My best friend is …", "He/She is … and has …", "He/She is … (personality).", "We often … together."],
              models: [{ label: "Example", text: "My best friend is Dimas. He is twelve years old. He is short and he has short curly hair and round glasses. Dimas is very smart and friendly. He helps me with Math. He is also brave. We often play football and read comics together." }],
              rubric: ["I described appearance with **is** and **has**.", "I used at least two personality words.", "I said what we do together.", "My text has a clear order."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd5-c2-l3-c1", "What does Putri look like?", ["tall and slim with long black hair", "short with curly hair", "tall with short hair"], 0, "Baris 2.", { passageId: PEN_PAL.id }),
        pickMany("sd5-c2-l3-c2", "Choose ALL the words that describe Putri's personality.", ["kind", "funny", "hardworking", "lazy"], [0, 1, 2], "Baris 4–5.", { passageId: PEN_PAL.id }),
        fill("sd5-c2-l3-c3", "Complete.", "She always wears a pink", ".", ["hairband"], "Baris 3.", { passageId: PEN_PAL.id }),
        pick("sd5-c2-l3-c4", "When is Putri a little shy?", ["when she meets new people", "at home", "when she rides a bike"], 0, "Baris 6.", { passageId: PEN_PAL.id }),
        pick("sd5-c2-l3-c5", "Why is Putri the best student?", ["She is hardworking.", "She is shy.", "She wears a hairband."], 0, "Baris 5.", { passageId: PEN_PAL.id, hots: true }),
        pick("sd5-c2-l3-c6", "What do they do together?", ["ride bikes", "swim", "cook"], 0, "Baris 7.", { passageId: PEN_PAL.id }),
      ],
    },
  ],
  quiz: {
    id: "sd5-c2-post",
    title: "Chapter 2 Posttest",
    passPercent: 70,
    passages: [PEN_PAL],
    questions: [
      pick("sd5-c2-post1", "She ___ curly hair.", ["has", "is", "have", "are"], 0, "Has + hair."),
      listen("sd5-c2-post2", voice("My uncle is very tall and he has a moustache."), "Listen. What does the uncle have?", ["a moustache", "long hair", "glasses", "a beard"], 0, "Moustache = kumis."),
      trPick("sd5-c2-post3", "“Berani” in English is…", ["brave", "shy", "kind", "lazy"], 0, "Berani = brave."),
      pick("sd5-c2-post4", "Which order is correct?", ["short straight brown hair", "brown short straight hair", "straight brown short hair", "hair brown short"], 0, "Ukuran → bentuk → warna."),
      arrange("sd5-c2-post5", "Put the words in order.", "What is your best friend like", "What is … like? → sifat."),
      pick("sd5-c2-post6", "What color are Putri's eyes?", ["brown", "black", "blue", "green"], 0, "Baris 2.", { passageId: PEN_PAL.id }),
      match("sd5-c2-post7", "Match the opposites.", [["tall", "short"], ["lazy", "hardworking"], ["shy", "brave"]], "Lawan kata!"),
      fill("sd5-c2-post8", "Complete: He makes everyone laugh. He is ___ .", "He makes everyone laugh. He is", ".", ["funny"], "Membuat orang tertawa → funny."),
      pick("sd5-c2-post9", "Which sentence describes personality, NOT appearance?", ["She is friendly.", "She has long hair.", "She is tall.", "She wears glasses."], 0, "Friendly = sifat.", { hots: true }),
      pick("sd5-c2-post10", "A firefighter runs into a burning house to save a cat. He is…", ["brave", "lazy", "shy", "short"], 0, "Berani.", { hots: true, image: "firefighter" }),
    ],
  },
  live: {
    title: "Live Quiz — Who Is It?",
    questions: [
      live("sd5-c2-live1", "She ___ long hair.", ["has", "is", "are", "have"], 0, "girl"),
      live("sd5-c2-live2", "He ___ very tall.", ["is", "has", "have", "are"], 0, "giraffe"),
      live("sd5-c2-live3", "Opposite of tall:", ["short", "long", "slim", "big"], 0, "baby"),
      live("sd5-c2-live4", "Grandma wears ___ to read.", ["glasses", "socks", "a kite", "a ball"], 0, "grandmother"),
      live("sd5-c2-live5", "He makes us laugh. He is…", ["funny", "lazy", "shy", "angry"], 0, "happy"),
      live("sd5-c2-live6", "“Rajin” is…", ["hardworking", "lazy", "brave", "kind"], 0, "open-book", true),
      live("sd5-c2-live7", "What ___ she like? She is kind.", ["is", "does", "has", "do"], 0, "heart"),
      live("sd5-c2-live8", "Correct order:", ["long black hair", "black long hair", "hair long black", "long hair black"], 0, "girl"),
    ],
  },
};
