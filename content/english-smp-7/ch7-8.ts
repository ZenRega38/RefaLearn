import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 7 (SMP, Fase D). Chapter 7 — Signs, Notices and Announcements · Chapter 8 — Animals Around Us

const NOTICES: Passage = {
  id: "smp7-c7-notices",
  title: "Notices Around the School",
  pic: "report",
  lines: [
    "LIBRARY: Please keep quiet. Do not bring food or drinks inside. Return books within seven days.",
    "SCIENCE LAB: Students must wear a lab coat. Do not touch any chemicals without a teacher.",
    "CANTEEN: Wash your hands before eating. Throw your rubbish in the right bin.",
    "WET FLOOR: Be careful! The floor is slippery.",
    "STAFF ONLY: Students are not allowed to enter this room.",
    "ANNOUNCEMENT: The English Club will meet on Thursday at 2 p.m. in Room 7B. New members are welcome!",
    "LOST: A blue water bottle with the name “Dita” on it. If you find it, please bring it to the teacher's office.",
  ],
};

export const CH7: Level = {
  id: "smp7-ch7",
  title: "Chapter 7 — Signs, Notices and Announcements",
  description: "Understand and write short functional texts: signs, warnings, notices, announcements and lost-and-found posts; use imperatives and must / mustn't.",
  targetScore: "Reading · Writing · Listening",
  cover: ["traffic-light", "library", "report"],
  pretest: {
    id: "smp7-c7-pre",
    title: "Chapter 7 Pretest",
    passPercent: 0,
    questions: [
      pick("smp7-c7-pre1", "“NO SMOKING” means…", ["You must not smoke here.", "You can smoke here.", "There is a fire here.", "Smoking is free."], 0, "Larangan merokok."),
      listen("smp7-c7-pre2", voice("Attention, please. The flag ceremony will start in five minutes."), "Listen. What will start in five minutes?", ["the flag ceremony", "the exam", "the break", "the football match"], 0, "The flag ceremony."),
      trPick("smp7-c7-pre3", "“Pengumuman” in English is…", ["announcement", "advertisement", "appointment", "agreement"], 0, "Pengumuman = announcement."),
      pick("smp7-c7-pre4", "Where do you usually see “Please keep quiet”?", ["in a library", "at a football match", "at a market", "at a concert"], 0, "Perpustakaan harus tenang.", { image: "library" }),
      pick("smp7-c7-pre5", "The traffic light is red. Drivers ___ stop.", ["must", "mustn't", "can't", "don't"], 0, "Lampu merah → wajib berhenti.", { image: "traffic-light" }),
    ],
  },
  lessons: [
    {
      id: "smp7-c7-l1",
      skill: "reading",
      title: "Signs and Warnings",
      summary: "Reading signs in public places and understanding what they mean.",
      sections: [
        {
          title: "Common signs",
          blocks: [
            table(["Sign", "Meaning", "Where?"], [["NO ENTRY / DO NOT ENTER", "dilarang masuk", "doors, roads"], ["STAFF ONLY", "khusus karyawan", "offices, kitchens"], ["KEEP OFF THE GRASS", "jangan menginjak rumput", "parks"], ["WET FLOOR", "lantai basah", "schools, malls"], ["NO PARKING", "dilarang parkir", "streets, gates"], ["KEEP LEFT", "tetap di jalur kiri", "roads"], ["EMERGENCY EXIT", "pintu darurat", "buildings"], ["OUT OF ORDER", "rusak/tidak berfungsi", "toilets, machines"], ["MIND YOUR HEAD", "awas kepala terbentur", "low doors"]]),
            pics([["traffic-light", "STOP when it is red"], ["turn-left", "TURN LEFT"], ["trash", "PUT RUBBISH HERE"], ["park", "KEEP OFF THE GRASS"]]),
          ],
        },
        {
          title: "Imperatives in signs",
          blocks: [
            text("Tanda dan peringatan biasanya memakai **imperative** (kalimat perintah) yang singkat: **Verb …!** untuk perintah, **Don't / Do not …** dan **No + verb-ing / noun** untuk larangan. **Please** membuatnya lebih sopan."),
            examples([{ right: "Close the door.", note: "perintah" }, { right: "Please queue here.", note: "perintah sopan" }, { right: "Do not feed the animals.", note: "larangan" }, { right: "No swimming.", note: "larangan singkat (No + -ing)" }]),
            tryIt(pick("smp7-c7-l1-try1", "You see “OUT OF ORDER” on a toilet door. What does it mean?", ["The toilet is broken.", "The toilet is clean.", "The toilet is for staff."], 0, "Out of order = rusak.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp7-c7-l1-c1", voice("Please mind the gap between the train and the platform."), "Listen. Where would you hear this?", ["at a train station", "in a library", "in a restaurant"], 0, "Train and platform."),
        match("smp7-c7-l1-c2", "Match the sign and the place.", [["KEEP OFF THE GRASS", "park"], ["STAFF ONLY", "restaurant kitchen"], ["DO NOT FEED THE ANIMALS", "zoo"], ["PLEASE KEEP QUIET", "library"]], "Tanda dan tempatnya."),
        pick("smp7-c7-l1-c3", "“NO PARKING” means…", ["You must not park here.", "You can park here for free.", "The park is closed."], 0, "Dilarang parkir."),
        trPick("smp7-c7-l1-c4", "“Pintu darurat” in English is…", ["emergency exit", "emergency entry", "exit only"], 0, "Emergency exit."),
        fill("smp7-c7-l1-c5", "Complete the sign: ___ touch! Wet paint.", "", "touch! Wet paint.", ["Don't", "Do not", "don't"], "Larangan → Don't."),
        pick("smp7-c7-l1-c6", "Why do buildings have “EMERGENCY EXIT” signs?", ["so people can leave quickly and safely in a fire or earthquake", "to decorate the walls", "to show the toilet"], 0, "Keselamatan saat darurat.", { hots: true }),
      ],
    },
    {
      id: "smp7-c7-l2",
      skill: "structure",
      title: "Must, Mustn't, Have to and Don't Have to",
      summary: "Rules and obligations at school and in public places.",
      sections: [
        {
          title: "Rules",
          blocks: [
            table(["Modal", "Meaning", "Example"], [["must", "harus/wajib (aturan)", "Students must wear a uniform."], ["mustn't", "tidak boleh/dilarang", "You mustn't cheat in the exam."], ["have to / has to", "harus (keharusan dari luar)", "I have to wake up early on Monday."], ["don't have to", "tidak perlu (tidak wajib)", "You don't have to wear a tie on Friday."]]),
            warn("**mustn't** ≠ **don't have to**. *You mustn't run* = dilarang lari. *You don't have to run* = tidak perlu lari (boleh saja kalau mau)."),
          ],
        },
        {
          title: "School rules",
          blocks: [
            audio("The first assembly", say(["man", "Good morning, students. Here are some important school rules."], ["man", "You must arrive before a quarter to seven. You must wear your uniform neatly, with your name tag."], ["man", "You mustn't use mobile phones during lessons. You mustn't leave the school during break time."], ["man", "On Fridays, you don't have to wear the tie, but you have to wear batik."])),
            tryIt(pick("smp7-c7-l2-try1", "What do students have to wear on Fridays?", ["batik", "a tie", "sports clothes"], 0, "You have to wear batik.")),
            repeat(["You must arrive on time.", "You mustn't cheat.", "She has to wear glasses.", "We don't have to bring our books today."]),
          ],
        },
      ],
      checkpoint: [
        listen("smp7-c7-l2-c1", voice("You don't have to bring lunch tomorrow. The school will give everyone free lunch."), "Listen. Do they need to bring lunch?", ["No, it's not necessary.", "Yes, they must.", "No, it's forbidden."], 0, "Don't have to = tidak perlu."),
        pick("smp7-c7-l2-c2", "You ___ use your phone in the exam room. It's against the rules.", ["mustn't", "don't have to", "must"], 0, "Dilarang → mustn't."),
        pick("smp7-c7-l2-c3", "My sister ___ to take medicine three times a day.", ["has", "have", "must"], 0, "She → has to."),
        match("smp7-c7-l2-c4", "Match.", [["must", "wajib"], ["mustn't", "dilarang"], ["don't have to", "tidak perlu"]], "Makna modal.", { translate: true }),
        trPick("smp7-c7-l2-c5", "“Kamu tidak perlu membayar. Gratis!” in English is…", ["You don't have to pay. It's free!", "You mustn't pay. It's free!", "You must pay. It's free!"], 0, "Tidak perlu = don't have to."),
        pick("smp7-c7-l2-c6", "Which rule is the most important for safety in a science lab?", ["You mustn't touch chemicals without a teacher.", "You don't have to sit down.", "You must bring a snack."], 0, "Keselamatan di laboratorium.", { hots: true }),
      ],
    },
    {
      id: "smp7-c7-l3",
      skill: "writing",
      title: "Notices, Announcements and Lost-and-Found",
      summary: "Reading school notices and writing your own announcement.",
      passages: [NOTICES],
      sections: [
        {
          title: "Around the school",
          blocks: [
            { type: "passage", passage: NOTICES },
            table(["Text type", "Purpose", "Must include"], [["Notice / sign", "memberi aturan atau peringatan", "short imperative, place"], ["Announcement", "memberi informasi acara", "what, when, where, who; contact"], ["Lost and found", "mencari/mengembalikan barang", "the item, description, contact"]]),
            tryIt(pick("smp7-c7-l3-try1", "What must students wear in the science lab?", ["a lab coat", "a tie", "gloves"], 0, "Baris 2.", { passageId: NOTICES.id })),
          ],
        },
        {
          title: "Write an announcement",
          blocks: [
            audio("A school announcement", say(["woman", "Attention, all Grade 7 students. There will be a class meeting on Saturday, 12 October, at 8 a.m. in the school hall. We are going to discuss our class trip. Please bring a pen and your ideas. For more information, contact Ms. Wulan. Thank you."])),
            writing({
              id: "smp7-c7-l3-write",
              title: "An announcement and a lost-and-found post",
              prompt: "Write (1) an announcement for a school event (a club meeting, a competition, a charity sale) and (2) a short lost-and-found post for something you lost.",
              image: "envelope",
              minWords: 70,
              maxWords: 150,
              tips: ["ANNOUNCEMENT / Attention, all …", "There will be … on … at … in …", "Please bring … / Everyone is welcome.", "LOST: a … with … If you find it, please …"],
              models: [{ label: "Announcement", text: "ANNOUNCEMENT\nAttention, all students!\nThe Student Council is holding a charity bazaar for flood victims.\nDay/date: Friday, 18 October\nTime: 9 a.m. – 12 p.m.\nPlace: the school yard\nEvery class must open one food stall. All profits will be donated.\nFor more information, contact Andre (8C).\nLet's help our friends!" }, { label: "Lost and found", text: "LOST: A black pencil case with a white cat sticker. It has my calculator and a silver pen inside. I lost it in the library on Monday afternoon. If you find it, please bring it to Class 7D or contact Yudha. Thank you very much!" }],
              rubric: ["My announcement includes what, when and where.", "I gave a contact person.", "My lost-and-found post describes the item clearly.", "I used imperatives or must correctly."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("smp7-c7-l3-c1", "How long can you borrow a library book?", ["seven days", "one month", "one day"], 0, "Baris 1.", { passageId: NOTICES.id }),
        pick("smp7-c7-l3-c2", "Who can enter the STAFF ONLY room?", ["teachers and school staff", "all students", "parents"], 0, "Baris 5: siswa tidak boleh.", { passageId: NOTICES.id }),
        fill("smp7-c7-l3-c3", "Complete.", "The English Club will meet on Thursday at 2 p.m. in Room", ".", ["7B"], "Baris 6.", { passageId: NOTICES.id }),
        pickMany("smp7-c7-l3-c4", "Choose ALL the rules in the canteen.", ["Wash your hands before eating.", "Throw your rubbish in the right bin.", "Keep quiet.", "Wear a lab coat."], [0, 1], "Baris 3.", { passageId: NOTICES.id }),
        pick("smp7-c7-l3-c5", "Why is the WET FLOOR sign important?", ["so people don't slip and get hurt", "so people can clean it", "so people can play there"], 0, "Baris 4.", { passageId: NOTICES.id, hots: true }),
        pick("smp7-c7-l3-c6", "You find a blue bottle with “Dita” on it. What should you do?", ["bring it to the teacher's office", "keep it", "throw it away"], 0, "Baris 7.", { passageId: NOTICES.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp7-c7-post",
    title: "Chapter 7 Posttest",
    passPercent: 70,
    passages: [NOTICES],
    questions: [
      pick("smp7-c7-post1", "“KEEP OFF THE GRASS” means…", ["Don't walk on the grass.", "Cut the grass.", "Water the grass.", "Sit on the grass."], 0, "Jangan menginjak rumput."),
      listen("smp7-c7-post2", voice("Passengers must not smoke anywhere in the airport, except in the smoking rooms."), "Listen. Where can passengers smoke?", ["only in the smoking rooms", "anywhere", "nowhere", "on the plane"], 0, "Except in the smoking rooms."),
      trPick("smp7-c7-post3", "“Rusak” (sign on a machine) in English is…", ["OUT OF ORDER", "OUT OF STOCK", "OUT OF TIME", "OUT OF DATE"], 0, "Out of order = rusak."),
      pick("smp7-c7-post4", "It's Sunday tomorrow, so we ___ wake up early.", ["don't have to", "mustn't", "must", "has to"], 0, "Tidak perlu → don't have to."),
      arrange("smp7-c7-post5", "Put the words in order.", "You mustn't run in the corridor", "Larangan dengan mustn't."),
      pick("smp7-c7-post6", "When will the English Club meet?", ["Thursday at 2 p.m.", "Friday at 9 a.m.", "Monday at 7 a.m.", "Saturday at noon"], 0, "Baris 6.", { passageId: NOTICES.id }),
      match("smp7-c7-post7", "Match the text and its type.", [["WET FLOOR", "warning"], ["The club will meet on Thursday.", "announcement"], ["LOST: a blue bottle", "lost and found"]], "Jenis teks fungsional."),
      fill("smp7-c7-post8", "Complete: He ___ to wear glasses because he can't see well.", "He", "to wear glasses because he can't see well.", ["has"], "He → has to."),
      pick("smp7-c7-post9", "Which information is NOT in the English Club announcement?", ["who the club leader is", "the day", "the time", "the room"], 0, "Pemimpin klub tidak disebut.", { passageId: NOTICES.id, hots: true }),
      pick("smp7-c7-post10", "You want to tell students that the toilet on the 2nd floor is broken. The BEST notice is…", ["OUT OF ORDER. Please use the toilet on the 1st floor.", "Please keep quiet.", "No smoking.", "Welcome!"], 0, "Notice singkat + solusi.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Read the Signs!",
    questions: [
      live("smp7-c7-live1", "WET FLOOR means…", ["Be careful, slippery!", "Swim here", "Clean here", "Floor for sale"], 0, "water"),
      live("smp7-c7-live2", "You ___ cheat in exams.", ["mustn't", "must", "have to", "can"], 0, "report"),
      live("smp7-c7-live3", "“Pengumuman” =", ["announcement", "assignment", "apartment", "advice"], 0, "microphone", true),
      live("smp7-c7-live4", "No need, not forbidden:", ["don't have to", "mustn't", "must", "can't"], 0, "question"),
      live("smp7-c7-live5", "Red light:", ["Stop", "Go", "Turn", "Speed up"], 0, "traffic-light"),
      live("smp7-c7-live6", "Library rule:", ["Keep quiet", "Sing loudly", "Eat here", "Run"], 0, "library"),
      live("smp7-c7-live7", "She ___ to wear a uniform.", ["has", "have", "must", "is"], 0, "shirt"),
      live("smp7-c7-live8", "In a fire, use the…", ["emergency exit", "lift", "window", "roof"], 0, "firefighter"),
    ],
  },
};

const TIGER: Passage = {
  id: "smp7-c8-tiger",
  title: "The Sumatran Tiger",
  pic: "tiger",
  lines: [
    "The Sumatran tiger is the smallest tiger in the world, but it is a powerful hunter.",
    "It lives only on the island of Sumatra, in rainforests, mountains and peat swamps.",
    "An adult male is about 2.4 metres long and weighs around 120 kilograms. Females are smaller.",
    "It has orange fur with thick black stripes. No two tigers have the same stripes, just like our fingerprints.",
    "The Sumatran tiger can swim very well. It even chases its prey into the water.",
    "It usually hunts at night. It eats wild pigs, deer and sometimes fish.",
    "Sadly, it is critically endangered. Scientists think there are fewer than 600 left in the wild.",
    "People cut down forests and hunt tigers illegally. We must protect them before it is too late.",
  ],
};

export const CH8: Level = {
  id: "smp7-ch8",
  title: "Chapter 8 — Animals Around Us",
  description: "Describe pets and wild animals (body parts, habitat, food, abilities), read a descriptive text about the Sumatran tiger and write about an animal.",
  targetScore: "Vocabulary · Reading · Writing",
  cover: ["tiger", "orangutan", "cat"],
  pretest: {
    id: "smp7-c8-pre",
    title: "Chapter 8 Pretest",
    passPercent: 0,
    questions: [
      pick("smp7-c8-pre1", "A bird has two wings and a…", ["beak", "trunk", "fin", "mane"], 0, "Burung punya paruh (beak).", { image: "bird" }),
      listen("smp7-c8-pre2", voice("Orangutans live in the rainforests of Borneo and Sumatra."), "Listen. Where do orangutans live?", ["in rainforests", "in deserts", "in the sea", "in cities"], 0, "Rainforests."),
      trPick("smp7-c8-pre3", "“Habitat” or “tempat hidup” in English is…", ["habitat", "habit", "hobby", "house"], 0, "Habitat."),
      pick("smp7-c8-pre4", "Animals that eat only plants are…", ["herbivores", "carnivores", "omnivores", "predators"], 0, "Pemakan tumbuhan = herbivore."),
      pick("smp7-c8-pre5", "Which animal is endangered in Indonesia?", ["the Javan rhino", "the chicken", "the cat", "the cow"], 0, "Badak Jawa terancam punah."),
    ],
  },
  lessons: [
    {
      id: "smp7-c8-l1",
      skill: "vocabulary",
      title: "Animal Bodies and Habitats",
      summary: "Body parts, habitats and diets of animals.",
      sections: [
        {
          title: "Body parts",
          blocks: [
            table(["Body part", "Meaning", "Animals"], [["fur", "bulu (mamalia)", "cat, tiger, orangutan"], ["feathers", "bulu (burung)", "bird, chicken, duck"], ["scales", "sisik", "fish, snake, komodo"], ["shell", "cangkang/tempurung", "turtle, crab"], ["claws", "cakar", "tiger, cat, eagle"], ["tusks", "gading", "elephant"], ["trunk", "belalai", "elephant"], ["tail", "ekor", "monkey, dog, komodo"], ["fins", "sirip", "fish, dolphin"], ["beak", "paruh", "bird"]]),
            pics([["tiger", "claws and fur"], ["bird", "feathers and a beak"], ["fish", "fins and scales"], ["turtle", "a shell"], ["elephant", "a trunk"]]),
          ],
        },
        {
          title: "Habitats and diets",
          blocks: [
            vocab([
              ["rainforest", "hutan hujan tropis", "tree"],
              ["ocean", "samudra/laut", "fish"],
              ["river", "sungai", "crocodile"],
              ["grassland", "padang rumput", "giraffe"],
              ["mountain", "gunung", "mountain"],
              ["farm", "peternakan", "cow"],
            ], "Habitats"),
            table(["Diet", "Meaning", "Example"], [["herbivore", "pemakan tumbuhan", "cow, deer, elephant"], ["carnivore", "pemakan daging", "tiger, crocodile, eagle"], ["omnivore", "pemakan segala", "bear, monkey, human"]]),
            tryIt(pick("smp7-c8-l1-try1", "A crocodile eats fish and other animals. It is a…", ["carnivore", "herbivore", "omnivore"], 0, "Pemakan daging.", { image: "crocodile" })),
          ],
        },
      ],
      checkpoint: [
        listen("smp7-c8-l1-c1", voice("This animal has a long trunk, big ears and two white tusks."), "Listen. What animal is it?", ["an elephant", "a tiger", "a giraffe"], 0, "Belalai + gading."),
        match("smp7-c8-l1-c2", "Match the animal and the body part.", [["pic:turtle|turtle", "shell"], ["pic:bird|bird", "feathers"], ["pic:fish|fish", "fins"], ["pic:elephant|elephant", "trunk"]], "Bagian tubuh hewan."),
        trPick("smp7-c8-l1-c3", "“Cakar” in English is…", ["claws", "clothes", "clouds"], 0, "Cakar = claws."),
        fill("smp7-c8-l1-c4", "Complete: A monkey eats fruit, leaves and insects. It is an ___ .", "A monkey eats fruit, leaves and insects. It is an", ".", ["omnivore"], "Pemakan segala."),
        pick("smp7-c8-l1-c5", "Where does a dolphin live?", ["in the ocean", "in a rainforest", "on a mountain"], 0, "Lumba-lumba di laut."),
        pick("smp7-c8-l1-c6", "A Komodo dragon has sharp teeth, claws and eats deer. Which is TRUE?", ["It is a carnivore and a predator.", "It is a herbivore.", "It lives in the ocean."], 0, "Pemangsa pemakan daging.", { hots: true, image: "komodo" }),
      ],
    },
    {
      id: "smp7-c8-l2",
      skill: "speaking",
      title: "Pets and Animal Facts",
      summary: "Talking about pets with simple present, has/have and can; guessing animals.",
      sections: [
        {
          title: "My pet",
          blocks: [
            audio("Talking about pets", say(["woman", "Do you have a pet, Adi?"], ["man", "Yes, I have a cat. Her name is Mochi."], ["woman", "What does she look like?"], ["man", "She's small and fluffy. She has white fur and blue eyes."], ["woman", "What does she eat?"], ["man", "She eats cat food and sometimes fish. She sleeps on my bed every night!"], ["woman", "Lucky you! My parents say pets need too much care."])),
            table(["Question", "Answer"], [["Do you have a pet?", "Yes, I have a cat. / No, I don't."], ["What's its name?", "Its name is Mochi."], ["What does it look like?", "It's small. It has white fur."], ["What does it eat?", "It eats cat food and fish."], ["What can it do?", "It can climb trees and catch mice."]]),
            tip("Untuk hewan peliharaan, orang sering memakai **he/she** (bukan *it*) karena dianggap anggota keluarga."),
          ],
        },
        {
          title: "Guess the animal",
          blocks: [
            repeat(["It lives in the rainforest.", "It has orange fur and long arms.", "It eats fruit and leaves.", "It can climb trees very well. What is it? It's an orangutan!"]),
            speaking({
              id: "smp7-c8-l2-say",
              title: "Guess my animal",
              prompt: "Describe an animal without saying its name, so your friends can guess it. Talk about its habitat, appearance, food and what it can or can't do.",
              image: "owl-think",
              seconds: 60,
              tips: ["It lives in …", "It is … and it has …", "It eats …", "It can … but it can't …", "What is it?"],
              models: [{ label: "Example", text: "This animal lives in rivers and swamps in Indonesia. It is very long, and it has a green-brown body with hard scales. It has a long tail and many sharp teeth. It eats fish, birds and sometimes bigger animals. It can swim very well and it can stay under water for a long time, but it can't climb trees. What is it? It's a crocodile!" }],
              rubric: ["I described the habitat.", "I described appearance with has/have.", "I said what it eats.", "I used can and can't.", "My clues were clear enough to guess."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("smp7-c8-l2-c1", voice("My dog can't swim, but he can run very fast."), "Listen. What can the dog do?", ["run very fast", "swim", "climb trees"], 0, "He can run very fast."),
        pick("smp7-c8-l2-c2", "What does Mochi look like?", ["small and fluffy with white fur", "big with black fur", "thin with no fur"], 0, "She's small and fluffy."),
        arrange("smp7-c8-l2-c3", "Put the words in order.", "What does your rabbit eat", "What does … eat?"),
        fill("smp7-c8-l2-c4", "Complete: My hamster ___ (sleep) during the day.", "My hamster", "during the day.", ["sleeps"], "It → sleeps."),
        trPick("smp7-c8-l2-c5", "“Kucingku berbulu lebat.” in English is…", ["My cat is fluffy.", "My cat is feathers.", "My cat has scales."], 0, "Fluffy = berbulu lebat."),
        pick("smp7-c8-l2-c6", "It lives in the sea. It has eight arms. It can change colour. What is it?", ["an octopus", "a shark", "a turtle"], 0, "Gurita = octopus.", { hots: true }),
      ],
    },
    {
      id: "smp7-c8-l3",
      skill: "reading",
      title: "Reading: The Sumatran Tiger",
      summary: "Read a descriptive text about an endangered animal and write about another animal.",
      passages: [TIGER],
      sections: [
        {
          title: "A rare tiger",
          blocks: [
            { type: "passage", passage: TIGER },
            audio("Listen and read", say(["man", TIGER.lines.join(" ")])),
            vocab([["prey", "mangsa", "tiger"], ["stripes", "loreng/belang", "tiger"], ["peat swamp", "rawa gambut", "water"], ["critically endangered", "sangat terancam punah", "earth"]], "Words from the text"),
          ],
        },
        {
          title: "Write about an animal",
          blocks: [
            tryIt(pick("smp7-c8-l3-try1", "Where does the Sumatran tiger live?", ["only on Sumatra", "all over Indonesia", "in Africa"], 0, "Baris 2.", { passageId: TIGER.id })),
            writing({
              id: "smp7-c8-l3-write",
              title: "An amazing animal",
              prompt: "Write a descriptive text about an animal (a pet or a wild animal from Indonesia). Describe its habitat, appearance, food, abilities and one interesting fact.",
              image: "orangutan",
              minWords: 100,
              maxWords: 200,
              tips: ["Identification: The … is …", "Habitat: It lives in …", "Appearance: It has …", "Food: It eats …", "Abilities: It can …", "Interesting fact / message"],
              models: [{ label: "Example", text: "The Bornean orangutan is a great ape that lives only on the island of Borneo. Its name comes from the Malay words “orang” and “hutan”, which mean “person of the forest”. It lives high in the trees of tropical rainforests. An orangutan has long reddish-brown hair and very long arms. Its arms are longer than its legs! It eats fruit, especially durian and figs, but it also eats leaves, bark and insects. It can make a new nest from branches every night. Orangutans are very intelligent. They can use sticks as tools. Sadly, they are critically endangered because their forests are turning into palm oil plantations." }],
              rubric: ["I identified the animal in the first sentence.", "I described habitat, appearance and food.", "I used can for abilities.", "I used the simple present correctly.", "I added an interesting fact or a message."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("smp7-c8-l3-c1", "How heavy is an adult male?", ["around 120 kilograms", "around 600 kilograms", "around 2.4 kilograms"], 0, "Baris 3.", { passageId: TIGER.id }),
        pick("smp7-c8-l3-c2", "What is special about tiger stripes?", ["No two tigers have the same stripes.", "They change every year.", "They are white."], 0, "Baris 4.", { passageId: TIGER.id }),
        fill("smp7-c8-l3-c3", "Complete.", "It usually hunts at", ".", ["night"], "Baris 6.", { passageId: TIGER.id }),
        pickMany("smp7-c8-l3-c4", "Choose ALL the animals it eats.", ["wild pigs", "deer", "fish", "bananas"], [0, 1, 2], "Baris 6.", { passageId: TIGER.id }),
        pick("smp7-c8-l3-c5", "According to the text, what are the TWO main threats to the tiger?", ["forest cutting and illegal hunting", "cold weather and floods", "other tigers and snakes"], 0, "Baris 8.", { passageId: TIGER.id, hots: true }),
        pick("smp7-c8-l3-c6", "“It even chases its prey into the water.” This shows that the tiger…", ["is not afraid of water", "is afraid of water", "only eats fish"], 0, "Baris 5.", { passageId: TIGER.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp7-c8-post",
    title: "Chapter 8 Posttest",
    passPercent: 70,
    passages: [TIGER],
    questions: [
      pick("smp7-c8-post1", "A turtle ___ a hard shell.", ["has", "have", "is", "are"], 0, "It → has."),
      listen("smp7-c8-post2", voice("Komodo dragons can run fast for a short time, and they have a very strong sense of smell."), "Listen. What is true about Komodo dragons?", ["They have a strong sense of smell.", "They can fly.", "They eat only plants.", "They live in the sea."], 0, "Strong sense of smell."),
      trPick("smp7-c8-post3", "“Terancam punah” in English is…", ["endangered", "dangerous", "extinct", "enormous"], 0, "Terancam punah = endangered."),
      pick("smp7-c8-post4", "Cows eat grass. They are…", ["herbivores", "carnivores", "omnivores", "predators"], 0, "Pemakan tumbuhan."),
      arrange("smp7-c8-post5", "Put the words in order.", "Orangutans can use sticks as tools", "Can + kata kerja dasar."),
      pick("smp7-c8-post6", "How long is an adult male Sumatran tiger?", ["about 2.4 metres", "about 24 metres", "about 1 metre", "about 5 metres"], 0, "Baris 3.", { passageId: TIGER.id }),
      match("smp7-c8-post7", "Match the animal and its habitat.", [["dolphin", "ocean"], ["orangutan", "rainforest"], ["crocodile", "river"], ["cow", "farm"]], "Habitat hewan."),
      fill("smp7-c8-post8", "Complete: Birds are covered with ___ .", "Birds are covered with", ".", ["feathers"], "Bulu burung = feathers."),
      pick("smp7-c8-post9", "What is the purpose of the last line?", ["to persuade readers to protect tigers", "to describe tiger food", "to explain where Sumatra is", "to compare tigers and lions"], 0, "Ajakan melindungi.", { passageId: TIGER.id, hots: true }),
      pick("smp7-c8-post10", "Which action would help Sumatran tigers the MOST?", ["protecting their forests from illegal logging", "keeping them as pets", "building more roads in the forest", "selling tiger souvenirs"], 0, "Melindungi habitat.", { passageId: TIGER.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Wild Ones",
    questions: [
      live("smp7-c8-live1", "Eats only meat:", ["carnivore", "herbivore", "omnivore", "vegetarian"], 0, "tiger"),
      live("smp7-c8-live2", "An elephant's nose:", ["trunk", "tail", "tusk", "beak"], 0, "elephant"),
      live("smp7-c8-live3", "Fish breathe and swim with gills and…", ["fins", "wings", "paws", "horns"], 0, "fish"),
      live("smp7-c8-live4", "“Terancam punah” =", ["endangered", "dangerous", "angry", "extinct"], 0, "earth", true),
      live("smp7-c8-live5", "Orangutans live in…", ["rainforests", "deserts", "oceans", "the Arctic"], 0, "orangutan"),
      live("smp7-c8-live6", "A turtle has a…", ["shell", "trunk", "mane", "beak"], 0, "turtle"),
      live("smp7-c8-live7", "It ___ swim.", ["can", "cans", "can to", "is can"], 0, "swim"),
      live("smp7-c8-live8", "Komodo dragons live in…", ["Indonesia", "Brazil", "Japan", "Egypt"], 0, "komodo"),
    ],
  },
};
