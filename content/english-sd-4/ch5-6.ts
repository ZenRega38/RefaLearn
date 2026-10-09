import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trMatch, trPick, tryIt, vocab, voice, writing } from "../kit";

// Grade 4 (Fase B). Chapter 5 — Hobbies and Sports · Chapter 6 — Getting Around

const BADMINTON: Passage = {
  id: "sd4-c5-club",
  title: "Our Badminton Club",
  pic: "badminton",
  lines: [
    "Hi, I'm Fajar. I love sports, but my favorite sport is badminton.",
    "I play badminton with my club every Tuesday and Thursday afternoon.",
    "Our coach is Mr. Hendra. He is very patient.",
    "I can serve well, but I can't jump very high yet.",
    "My sister Lia doesn't like badminton. She likes painting and singing.",
    "On Sundays, we all go swimming together.",
  ],
};

export const CH5: Level = {
  id: "sd4-ch5",
  title: "Chapter 5 — Hobbies and Sports",
  description: "Talk about hobbies and sports with like + -ing, ask Can you…?, and say how often you do things.",
  targetScore: "Speaking · Reading",
  cover: ["badminton", "football", "guitar"],
  pretest: {
    id: "sd4-c5-pre",
    title: "Chapter 5 Pretest",
    passPercent: 0,
    questions: [
      pick("sd4-c5-pre1", "What sport is this?", ["badminton", "football", "basketball", "swimming"], 0, "Raket dan kok → badminton.", { image: "badminton" }),
      listen("sd4-c5-pre2", voice("I like playing the guitar."), "Listen. What does she like?", ["pic:guitar", "pic:piano", "pic:drum", "pic:palette"], 0, "Guitar = gitar."),
      trPick("sd4-c5-pre3", "“Hobi” in English is…", ["hobby", "happy", "habit", "holiday"], 0, "Hobi = hobby."),
      pick("sd4-c5-pre4", "Choose the correct sentence.", ["I like swimming.", "I like swim.", "I likes swimming."], 0, "Like + kata kerja-ing: I like swimming."),
      pick("sd4-c5-pre5", "“Can you sing?” — “Yes, I ___.”", ["can", "do", "am", "like"], 0, "Can you…? → Yes, I can."),
    ],
  },
  lessons: [
    {
      id: "sd4-c5-l1",
      skill: "vocabulary",
      title: "Hobbies and Sports",
      summary: "Football, badminton, basketball, swimming, cycling, drawing, singing, reading, playing music.",
      sections: [
        {
          title: "Sports",
          blocks: [
            vocab([
              ["football", "sepak bola", "football", "We play football after school."],
              ["badminton", "bulu tangkis", "badminton", "Indonesia is great at badminton."],
              ["basketball", "bola basket", "basketball", "He is tall. He plays basketball."],
              ["swimming", "berenang", "swim", "I go swimming on Sundays."],
              ["cycling", "bersepeda", "bicycle", "We go cycling in the park."],
              ["running", "berlari", "run", "Running makes me strong."],
            ], "Sports"),
            tip("Kita **play** olahraga dengan bola (*play football, play badminton*), tapi **go** untuk olahraga yang berakhiran -ing (*go swimming, go cycling*)."),
          ],
        },
        {
          title: "Hobbies",
          blocks: [
            vocab([
              ["drawing / painting", "menggambar / melukis", "palette"],
              ["singing", "bernyanyi", "microphone"],
              ["reading", "membaca", "open-book"],
              ["playing the guitar", "bermain gitar", "guitar"],
              ["playing the piano", "bermain piano", "piano"],
              ["taking photos", "memotret", "camera"],
              ["cooking", "memasak", "pan"],
              ["gardening", "berkebun", "flower"],
            ], "Hobbies"),
            repeat(["I like drawing.", "I like singing.", "I love reading.", "I enjoy playing the guitar."]),
          ],
        },
      ],
      checkpoint: [
        listen("sd4-c5-l1-c1", voice("Basketball."), "Listen. Choose the picture.", ["pic:basketball", "pic:football", "pic:badminton"], 0, "Basketball = bola basket."),
        pick("sd4-c5-l1-c2", "What hobby is this?", ["painting", "singing", "cooking"], 0, "Palet cat → melukis.", { image: "palette" }),
        match("sd4-c5-l1-c3", "Match.", [["pic:piano", "piano"], ["pic:camera", "taking photos"], ["pic:microphone", "singing"], ["pic:football", "football"]], "Mantap!"),
        pick("sd4-c5-l1-c4", "We ___ swimming on Sundays.", ["go", "play", "do"], 0, "Go + swimming."),
        trPick("sd4-c5-l1-c5", "“Berkebun” in English is…", ["gardening", "cooking", "cycling"], 0, "Berkebun = gardening."),
        pick("sd4-c5-l1-c6", "Which hobby can you do quietly at home alone?", ["reading", "football", "basketball"], 0, "Membaca bisa sendirian dan tenang.", { hots: true }),
      ],
    },
    {
      id: "sd4-c5-l2",
      skill: "speaking",
      title: "Can You Swim?",
      summary: "I like / love / don't like + -ing. Can you…? How often…?",
      sections: [
        {
          title: "Like + -ing",
          blocks: [
            text("Setelah **like / love / enjoy / don't like**, kata kerja diberi **-ing**: *I like swim**ming**. She loves draw**ing**.*"),
            table(["Verb", "-ing"], [["read", "reading"], ["sing", "singing"], ["swim", "swimming (double m)"], ["run", "running (double n)"], ["ride", "riding (drop e)"], ["dance", "dancing (drop e)"]]),
            audio("Talking about hobbies", say(["woman", "What do you like doing in your free time?"], ["man", "I love playing football. What about you?"], ["woman", "I like drawing and singing."], ["man", "Can you play the guitar?"], ["woman", "No, I can't. But I can play the piano!"])),
          ],
        },
        {
          title: "How often?",
          blocks: [
            table(["How often?", "Meaning"], [["every day", "setiap hari"], ["every Sunday", "setiap Minggu"], ["twice a week", "dua kali seminggu"], ["sometimes", "kadang-kadang"], ["never", "tidak pernah"]]),
            tryIt(pick("sd4-c5-l2-try1", "Can the girl play the guitar?", ["No, she can't.", "Yes, she can.", "She doesn't know."], 0, "No, I can't. But I can play the piano!")),
            speaking({
              id: "sd4-c5-l2-say",
              title: "My free time",
              prompt: "Talk about your hobbies. Say what you like doing, one thing you can do, one thing you can't do, and how often.",
              image: "guitar",
              seconds: 50,
              tips: ["I like / love … -ing.", "I can … but I can't …", "I … every / twice a week."],
              models: [{ label: "Example", text: "I love playing badminton. I play it twice a week with my brother. I can swim, but I can't play the guitar. I also like reading comics." }],
              rubric: ["I used **like/love + -ing**.", "I used **can** and **can't**.", "I said how often."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd4-c5-l2-c1", say(["man", "Can you ride a bike?"], ["woman", "Yes, I can."]), "Listen. Can she ride a bike?", ["Yes, she can.", "No, she can't.", "She doesn't like bikes."], 0, "Yes, I can."),
        pick("sd4-c5-l2-c2", "She loves ___ .", ["dancing", "danceing", "dance"], 0, "Dance → dancing (huruf e dihapus)."),
        fill("sd4-c5-l2-c3", "Complete: I like swim___ .", "I like swim", ".", ["ming"], "Swim → swimming (m dobel)."),
        arrange("sd4-c5-l2-c4", "Put the words in order.", "What do you like doing", "What do you like doing? = Kamu suka melakukan apa?"),
        trMatch("sd4-c5-l2-c5", "Match.", [["every day", "setiap hari"], ["sometimes", "kadang-kadang"], ["never", "tidak pernah"]], "Kata frekuensi!"),
        pick("sd4-c5-l2-c6", "Beni can't swim. Which activity is NOT safe for him alone?", ["swimming in a deep pool", "reading", "drawing"], 0, "Kalau belum bisa berenang, berbahaya berenang sendirian di kolam dalam.", { hots: true }),
      ],
    },
    {
      id: "sd4-c5-l3",
      skill: "reading",
      title: "Reading: Our Badminton Club",
      summary: "Read about a badminton player and write about your hobby.",
      passages: [BADMINTON],
      sections: [
        {
          title: "Fajar's club",
          blocks: [
            { type: "passage", passage: BADMINTON },
            audio("Listen and read", say(["man", BADMINTON.lines.join(" ")])),
            tryIt(pick("sd4-c5-l3-try1", "What is Fajar's favorite sport?", ["badminton", "swimming", "football"], 0, "Baris 1.", { passageId: BADMINTON.id })),
          ],
        },
        {
          title: "Write about your hobby",
          blocks: [
            writing({
              id: "sd4-c5-l3-write",
              title: "My favorite hobby",
              prompt: "Write about your favorite hobby or sport. Say when you do it, who with, and what you can or can't do.",
              image: "football",
              minWords: 35,
              maxWords: 100,
              tips: ["My favorite hobby is …", "I … every … with …", "I can … but I can't … yet.", "I like it because …"],
              models: [{ label: "Example", text: "My favorite hobby is drawing. I draw every evening after I finish my homework. I usually draw animals and cartoons. I can draw cats very well, but I can't draw people yet. I like drawing because it makes me happy and calm." }],
              rubric: ["I named my hobby.", "I said how often or when.", "I used **can** and **can't**.", "I gave a reason with **because**."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd4-c5-l3-c1", "When does Fajar play with his club?", ["Tuesday and Thursday afternoon", "every morning", "on Sundays"], 0, "Baris 2.", { passageId: BADMINTON.id }),
        pick("sd4-c5-l3-c2", "Who is Mr. Hendra?", ["the coach", "Fajar's father", "a teacher"], 0, "Baris 3: Our coach is Mr. Hendra.", { passageId: BADMINTON.id }),
        pickMany("sd4-c5-l3-c3", "Choose ALL of Lia's hobbies.", ["painting", "singing", "badminton", "swimming"], [0, 1, 3], "Baris 5: painting dan singing. Baris 6: semuanya berenang hari Minggu.", { passageId: BADMINTON.id }),
        fill("sd4-c5-l3-c4", "Complete.", "I can serve well, but I can't", "very high yet.", ["jump"], "Baris 4.", { passageId: BADMINTON.id }),
        pick("sd4-c5-l3-c5", "How many times a week does Fajar play badminton with his club?", ["twice", "once", "every day"], 0, "Selasa dan Kamis = dua kali.", { passageId: BADMINTON.id, hots: true }),
        pick("sd4-c5-l3-c6", "“yet” in “I can't jump very high yet” shows that Fajar…", ["hopes to jump higher in the future", "never wants to jump", "jumps very high"], 0, "Yet = belum (tapi berharap nanti bisa).", { passageId: BADMINTON.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd4-c5-post",
    title: "Chapter 5 Posttest",
    passPercent: 70,
    passages: [BADMINTON],
    questions: [
      pick("sd4-c5-post1", "What is this?", ["a guitar", "a piano", "a drum", "a microphone"], 0, "Gitar = guitar.", { image: "guitar" }),
      listen("sd4-c5-post2", voice("I go cycling every Saturday."), "Listen. What does he do on Saturday?", ["pic:bicycle", "pic:swim", "pic:football", "pic:piano"], 0, "Cycling = bersepeda."),
      trPick("sd4-c5-post3", "“Aku suka membaca.” in English is…", ["I like reading.", "I like read.", "I likes reading.", "I am reading."], 0, "Like + reading."),
      pick("sd4-c5-post4", "We ___ football after school.", ["play", "go", "do", "make"], 0, "Play + olahraga bola."),
      fill("sd4-c5-post5", "Answer: Can you cook? No, I ___ .", "No, I", ".", ["can't", "cannot", "can not"], "No, I can't."),
      arrange("sd4-c5-post6", "Put the words in order.", "She enjoys playing the piano", "Enjoy + -ing."),
      pick("sd4-c5-post7", "What does Fajar's family do on Sundays?", ["go swimming", "play badminton", "paint", "sing"], 0, "Baris 6.", { passageId: BADMINTON.id }),
      match("sd4-c5-post8", "Match.", [["run", "running"], ["ride", "riding"], ["sing", "singing"]], "Running (n dobel), riding (e hilang), singing."),
      pick("sd4-c5-post9", "Lia doesn't like badminton. Which club should she join?", ["an art club", "a badminton club", "a basketball club", "a football club"], 0, "Lia suka melukis → klub seni.", { passageId: BADMINTON.id, hots: true }),
      pick("sd4-c5-post10", "Which sport needs a racket?", ["badminton", "swimming", "football", "running"], 0, "Bulu tangkis memakai raket.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Game On!",
    questions: [
      live("sd4-c5-live1", "What sport is it?", ["football", "basketball", "badminton", "swimming"], 0, "football"),
      live("sd4-c5-live2", "What is it?", ["a piano", "a guitar", "a drum", "a camera"], 0, "piano"),
      live("sd4-c5-live3", "I like ___ .", ["swimming", "swim", "swiming", "swims"], 0, "swim"),
      live("sd4-c5-live4", "We ___ cycling on Sundays.", ["go", "play", "do", "make"], 0, "bicycle"),
      live("sd4-c5-live5", "Can you sing? (yes)", ["Yes, I can.", "Yes, I do.", "Yes, I am.", "Yes, I sing."], 0, "microphone"),
      live("sd4-c5-live6", "Which sport uses a racket?", ["badminton", "football", "running", "swimming"], 0, "badminton"),
      live("sd4-c5-live7", "What hobby is it?", ["taking photos", "singing", "cooking", "reading"], 0, "camera"),
      live("sd4-c5-live8", "“Tidak pernah” is…", ["never", "always", "sometimes", "often"], 0, "question", true),
    ],
  },
};

const TRIP: Passage = {
  id: "sd4-c6-trip",
  title: "How We Go to School",
  pic: "bus",
  lines: [
    "Students in my class go to school in different ways.",
    "Andi lives near the school, so he walks. It takes ten minutes.",
    "Maya lives far away. She goes by school bus. It takes forty minutes.",
    "Doni rides his bicycle. He always wears a helmet.",
    "Putri's father takes her by motorbike on his way to the office.",
    "On the island, some children go to school by boat!",
    "How do you go to school?",
  ],
};

export const CH6: Level = {
  id: "sd4-ch6",
  title: "Chapter 6 — Getting Around",
  description: "Name kinds of transport, say how you travel (by bus, on foot), and talk about near, far and how long it takes.",
  targetScore: "Listening · Speaking · Reading",
  cover: ["bus", "train", "ship"],
  pretest: {
    id: "sd4-c6-pre",
    title: "Chapter 6 Pretest",
    passPercent: 0,
    questions: [
      pick("sd4-c6-pre1", "What is this?", ["a train", "a bus", "a ship", "a plane"], 0, "Kereta = train.", { image: "train" }),
      listen("sd4-c6-pre2", voice("I go to school by bus."), "Listen. How does she go to school?", ["pic:bus", "pic:car", "pic:bicycle", "pic:ship"], 0, "By bus = naik bus."),
      trPick("sd4-c6-pre3", "“Jalan kaki” in English is…", ["on foot", "by foot", "with foot", "in foot"], 0, "Jalan kaki = on foot (atau walk)."),
      pick("sd4-c6-pre4", "Which one goes on water?", ["a ship", "a train", "a taxi", "a bicycle"], 0, "Kapal berjalan di air.", { image: "ship" }),
      pick("sd4-c6-pre5", "Which is the fastest?", ["a plane", "a bicycle", "walking", "a horse cart"], 0, "Pesawat paling cepat.", { image: "plane" }),
    ],
  },
  lessons: [
    {
      id: "sd4-c6-l1",
      skill: "vocabulary",
      title: "Transport",
      summary: "Car, bus, taxi, motorbike, bicycle, train, ship, plane.",
      sections: [
        {
          title: "On land, on water, in the air",
          blocks: [
            vocab([
              ["car", "mobil", "car"],
              ["bus", "bus", "bus"],
              ["taxi", "taksi", "taxi"],
              ["motorbike", "sepeda motor", "motorcycle"],
              ["bicycle / bike", "sepeda", "bicycle"],
              ["train", "kereta", "train"],
              ["ship / boat", "kapal / perahu", "ship"],
              ["plane", "pesawat", "plane"],
            ]),
            table(["On land", "On water", "In the air"], [["car, bus, taxi, motorbike, bicycle, train", "ship, boat", "plane"]]),
          ],
        },
        {
          title: "By + transport",
          blocks: [
            text("Untuk menyebut cara bepergian: **by + kendaraan** (*by bus, by car, by train, by plane*). Tetapi jalan kaki: **on foot** (atau *I walk*)."),
            repeat(["I go to school by bus.", "My father goes to work by motorbike.", "We go to Bali by plane.", "I go to school on foot."]),
            tryIt(pick("sd4-c6-l1-try1", "I go to school ___ bicycle.", ["by", "on", "with"], 0, "By + kendaraan.", { image: "bicycle" })),
          ],
        },
      ],
      checkpoint: [
        listen("sd4-c6-l1-c1", voice("Taxi."), "Listen. Choose the picture.", ["pic:taxi", "pic:bus", "pic:train"], 0, "Taxi = taksi."),
        pick("sd4-c6-l1-c2", "What is this?", ["a motorbike", "a bicycle", "a car"], 0, "Sepeda motor = motorbike.", { image: "motorcycle" }),
        match("sd4-c6-l1-c3", "Match.", [["pic:plane", "in the air"], ["pic:ship", "on water"], ["pic:car", "on land"]], "Pesawat di udara, kapal di air, mobil di darat."),
        trPick("sd4-c6-l1-c4", "“Kereta” in English is…", ["train", "rain", "truck"], 0, "Kereta = train."),
        pick("sd4-c6-l1-c5", "I walk to school. I go ___ .", ["on foot", "by foot", "by walk"], 0, "Jalan kaki = on foot."),
        pick("sd4-c6-l1-c6", "You want to go from Jakarta to Makassar quickly. What is the best?", ["by plane", "by bicycle", "on foot"], 0, "Jarak jauh antarpulau dan cepat → pesawat.", { hots: true }),
      ],
    },
    {
      id: "sd4-c6-l2",
      skill: "listening",
      title: "How Do You Go to School?",
      summary: "How do you go…? How long does it take? Near and far.",
      sections: [
        {
          title: "Listen to the interview",
          blocks: [
            audio("School survey", say(["woman", "How do you go to school, Doni?"], ["man", "I go by bicycle."], ["woman", "How long does it take?"], ["man", "It takes fifteen minutes."], ["woman", "Is your house near the school?"], ["man", "No, it isn't very near. It's about two kilometers."])),
            table(["Question", "Answer"], [["How do you go to school?", "I go by bicycle."], ["How long does it take?", "It takes fifteen minutes."], ["Is it near or far?", "It's near. / It's far."]]),
          ],
        },
        {
          title: "Safe on the road",
          blocks: [
            pics([["traffic-light", "traffic light"], ["bicycle", "wear a helmet"]]),
            text("- **Red** means **stop**.\n- **Yellow** means **get ready**.\n- **Green** means **go**.\n\nSaat naik sepeda atau motor, selalu **wear a helmet** (pakai helm)."),
            tryIt(pick("sd4-c6-l2-try1", "The traffic light is red. What do you do?", ["Stop.", "Go.", "Run."], 0, "Merah → berhenti.", { image: "traffic-light" })),
            speaking({
              id: "sd4-c6-l2-say",
              title: "My way to school",
              prompt: "Answer: How do you go to school? How long does it take? Is it near or far?",
              image: "school",
              seconds: 40,
              models: [{ label: "Example", text: "I go to school by motorbike with my father. It takes ten minutes. My house is not very far from school." }],
              rubric: ["I used **by + transport** or **on foot**.", "I said how long it takes.", "I said near or far."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd4-c6-l2-c1", say(["woman", "How long does it take?"], ["man", "It takes twenty minutes."]), "Listen. How long does it take?", ["20 minutes", "12 minutes", "2 minutes"], 0, "Twenty = 20."),
        arrange("sd4-c6-l2-c2", "Put the words in order.", "How do you go to school", "How do you go to school?"),
        fill("sd4-c6-l2-c3", "Complete: It ___ fifteen minutes.", "It", "fifteen minutes.", ["takes"], "It takes … minutes."),
        trMatch("sd4-c6-l2-c4", "Match the traffic light colors.", [["red", "berhenti"], ["yellow", "bersiap"], ["green", "jalan"]], "Merah stop, kuning bersiap, hijau jalan."),
        pick("sd4-c6-l2-c5", "When you ride a motorbike, you must wear a…", ["helmet", "hat", "scarf"], 0, "Pakai helm untuk keselamatan."),
        pick("sd4-c6-l2-c6", "Your house is 200 meters from school. The best way is…", ["on foot", "by plane", "by ship"], 0, "Sangat dekat → jalan kaki saja.", { hots: true }),
      ],
    },
    {
      id: "sd4-c6-l3",
      skill: "reading",
      title: "Reading: How We Go to School",
      summary: "Read a class survey and write about transport in your town.",
      passages: [TRIP],
      sections: [
        {
          title: "A class survey",
          blocks: [
            { type: "passage", passage: TRIP },
            pics([["bus", "Maya"], ["bicycle", "Doni"], ["motorcycle", "Putri"], ["ship", "island children"]]),
            tryIt(pick("sd4-c6-l3-try1", "How does Andi go to school?", ["He walks.", "By bus.", "By boat."], 0, "Baris 2: he walks.", { passageId: TRIP.id })),
          ],
        },
        {
          title: "Write a survey report",
          blocks: [
            writing({
              id: "sd4-c6-l3-write",
              title: "Transport survey",
              prompt: "Ask three friends or family members how they go to school or work. Write the results.",
              image: "bus",
              minWords: 35,
              maxWords: 100,
              tips: ["My friend … goes to school by …", "It takes … minutes.", "… walks because he/she lives near."],
              models: [{ label: "Example", text: "I asked three friends. Rafi goes to school by car. It takes fifteen minutes. Salsa goes by bicycle because she lives near. Tono goes on foot. It takes five minutes. Most of my friends live near the school." }],
              rubric: ["I wrote about three people.", "I used **by + transport** or **on foot**.", "I used **goes** (with -es) for he/she.", "I wrote one conclusion sentence."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd4-c6-l3-c1", "How long does Maya's trip take?", ["forty minutes", "ten minutes", "fourteen minutes"], 0, "Baris 3.", { passageId: TRIP.id }),
        pick("sd4-c6-l3-c2", "What does Doni always wear?", ["a helmet", "a hat", "a jacket"], 0, "Baris 4.", { passageId: TRIP.id }),
        fill("sd4-c6-l3-c3", "Complete.", "On the island, some children go to school by", "!", ["boat"], "Baris 6.", { passageId: TRIP.id }),
        pick("sd4-c6-l3-c4", "Who goes by motorbike?", ["Putri", "Andi", "Maya"], 0, "Baris 5.", { passageId: TRIP.id }),
        pick("sd4-c6-l3-c5", "Why does Andi walk?", ["He lives near the school.", "He has no shoes.", "The bus is late."], 0, "Baris 2: Andi lives near the school, so he walks.", { passageId: TRIP.id }),
        pick("sd4-c6-l3-c6", "Why do island children go by boat?", ["There is water between their home and the school.", "Boats are cheaper than shoes.", "They like fishing."], 0, "Di pulau, laut memisahkan rumah dan sekolah.", { passageId: TRIP.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd4-c6-post",
    title: "Chapter 6 Posttest",
    passPercent: 70,
    passages: [TRIP],
    questions: [
      pick("sd4-c6-post1", "What is this?", ["a bus", "a train", "a taxi", "a car"], 0, "Bus sekolah.", { image: "bus" }),
      listen("sd4-c6-post2", voice("My father goes to work by train."), "Listen. How does he go to work?", ["pic:train", "pic:bus", "pic:plane", "pic:car"], 0, "By train = naik kereta."),
      trPick("sd4-c6-post3", "“Pesawat” in English is…", ["plane", "ship", "train", "taxi"], 0, "Pesawat = plane."),
      pick("sd4-c6-post4", "We go to Lombok ___ ship.", ["by", "on", "in", "at"], 0, "By + kendaraan."),
      arrange("sd4-c6-post5", "Put the words in order.", "How long does it take", "How long does it take? = Berapa lama?"),
      pick("sd4-c6-post6", "Who has the longest trip?", ["Maya", "Andi", "Doni", "Putri"], 0, "Maya 40 menit.", { passageId: TRIP.id }),
      match("sd4-c6-post7", "Match.", [["red", "stop"], ["yellow", "get ready"], ["green", "go"]], "Lampu lalu lintas!"),
      fill("sd4-c6-post8", "Complete: I don't use a vehicle. I go on ___ .", "I go on", ".", ["foot"], "On foot = jalan kaki."),
      pick("sd4-c6-post9", "It's raining hard and school is 5 km away. Which is the BEST way?", ["by car or bus", "on foot", "by bicycle without a raincoat"], 0, "Hujan deras dan jauh → kendaraan beratap.", { hots: true }),
      pick("sd4-c6-post10", "Which transport is better for the environment?", ["bicycle", "car", "plane", "taxi"], 0, "Sepeda tidak mengeluarkan asap.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Let's Go!",
    questions: [
      live("sd4-c6-live1", "What is it?", ["a train", "a bus", "a ship", "a taxi"], 0, "train"),
      live("sd4-c6-live2", "What is it?", ["a ship", "a plane", "a car", "a bus"], 0, "ship"),
      live("sd4-c6-live3", "I go to school ___ bus.", ["by", "on", "with", "at"], 0, "bus"),
      live("sd4-c6-live4", "I walk = I go ___ foot.", ["on", "by", "with", "in"], 0, "run"),
      live("sd4-c6-live5", "Red light means…", ["stop", "go", "run", "turn"], 0, "traffic-light"),
      live("sd4-c6-live6", "Which one flies?", ["plane", "train", "ship", "taxi"], 0, "plane"),
      live("sd4-c6-live7", "How long does it ___? 10 minutes.", ["take", "go", "make", "do"], 0, "clock"),
      live("sd4-c6-live8", "What is it?", ["a taxi", "a bus", "a train", "a bicycle"], 0, "taxi"),
    ],
  },
};
