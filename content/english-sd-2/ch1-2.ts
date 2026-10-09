import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trMatch, trPick, tryIt, vocab, voice } from "../kit";

// Grade 2 (Fase A). Chapter 1 — My Home · Chapter 2 — My Day

const HOUSE_TEXT = {
  id: "sd2-c1-home",
  title: "Welcome to My Home",
  pic: "house",
  lines: [
    "Hi! I am Raka. This is my home.",
    "It has a living room, a kitchen and two bedrooms.",
    "There is a big sofa in the living room.",
    "Mom is in the kitchen. She is cooking.",
    "My cat is in the garden. It is sleeping under a tree.",
    "I love my home!",
  ],
};

export const CH1: Level = {
  id: "sd2-ch1",
  title: "Chapter 1 — My Home",
  description: "Name the rooms and things at home, and say where people are: Mom is in the kitchen.",
  targetScore: "Listening · Vocabulary",
  cover: ["house", "sofa", "bed"],
  pretest: {
    id: "sd2-c1-pre",
    title: "Chapter 1 Pretest",
    passPercent: 0,
    questions: [
      listen("sd2-c1-pre1", voice("Bed."), "Listen. Choose the picture.", ["pic:bed", "pic:sofa", "pic:stove", "pic:door"], 0, "Bed = tempat tidur."),
      listen("sd2-c1-pre2", voice("Kitchen."), "Listen. Where do we cook?", ["pic:stove", "pic:bed", "pic:bathtub", "pic:tree"], 0, "Kitchen = dapur, tempat memasak."),
      trPick("sd2-c1-pre3", "“Kamar tidur” in English is…", ["bedroom", "bathroom", "kitchen", "garden"], 0, "Kamar tidur = bedroom."),
      pick("sd2-c1-pre4", "What is this?", ["a sofa", "a bed", "a desk", "a door"], 0, "Sofa = sofa.", { image: "sofa" }),
      pick("sd2-c1-pre5", "We take a bath in the…", ["bathroom", "kitchen", "garden", "living room"], 0, "Mandi di kamar mandi = bathroom.", { image: "bathtub" }),
    ],
  },
  lessons: [
    {
      id: "sd2-c1-l1",
      skill: "vocabulary",
      title: "Rooms in My House",
      summary: "Living room, bedroom, kitchen, bathroom, garden.",
      sections: [
        {
          title: "Let's look around",
          blocks: [
            pics([["house", "my house"]]),
            text("Rumah punya banyak ruangan. Setiap ruangan punya fungsi sendiri. Ketuk kartunya dan tirukan namanya."),
            vocab([
              ["living room", "ruang tamu / keluarga", "sofa", "We watch TV in the living room."],
              ["bedroom", "kamar tidur", "bed", "I sleep in my bedroom."],
              ["kitchen", "dapur", "stove", "Mom cooks in the kitchen."],
              ["bathroom", "kamar mandi", "bathtub", "I take a bath in the bathroom."],
              ["garden", "kebun / taman", "flower", "Flowers grow in the garden."],
            ]),
            repeat(["living room", "bedroom", "kitchen", "bathroom", "garden"]),
          ],
        },
        {
          title: "What do we do there?",
          blocks: [
            table(["Room", "We…"], [["kitchen", "cook and eat"], ["bedroom", "sleep"], ["bathroom", "take a bath"], ["living room", "watch TV and talk"], ["garden", "play and water the flowers"]]),
            tryIt(pick("sd2-c1-l1-try1", "Where do you sleep?", ["in the bedroom", "in the kitchen", "in the garden"], 0, "Tidur di kamar tidur = bedroom.", { image: "sleep" })),
          ],
        },
      ],
      checkpoint: [
        listen("sd2-c1-l1-c1", voice("Bathroom."), "Listen. Choose the picture.", ["pic:bathtub", "pic:stove", "pic:sofa"], 0, "Bathroom = kamar mandi."),
        pick("sd2-c1-l1-c2", "Mom cooks in the…", ["kitchen", "bedroom", "garden"], 0, "Memasak di dapur = kitchen.", { image: "stove" }),
        match("sd2-c1-l1-c3", "Match the room and the picture.", [["bedroom", "pic:bed"], ["kitchen", "pic:stove"], ["garden", "pic:flower"], ["living room", "pic:sofa"]], "Hebat! Kamu tahu semua ruangan."),
        trPick("sd2-c1-l1-c4", "“Dapur” in English is…", ["kitchen", "bathroom", "bedroom"], 0, "Dapur = kitchen."),
        fill("sd2-c1-l1-c5", "Complete: I sleep in my ___ .", "I sleep in my", ".", ["bedroom"], "Tidur di bedroom.", { image: "bed" }),
        pick("sd2-c1-l1-c6", "Where do flowers grow?", ["in the garden", "in the bathroom", "in the bedroom"], 0, "Bunga tumbuh di kebun.", { hots: true, image: "flower" }),
      ],
    },
    {
      id: "sd2-c1-l2",
      skill: "listening",
      title: "Things at Home",
      summary: "Bed, sofa, table, chair, TV, stove, bathtub, door, window.",
      sections: [
        {
          title: "Furniture",
          blocks: [
            vocab([
              ["bed", "tempat tidur", "bed", "My bed is soft."],
              ["sofa", "sofa", "sofa", "The sofa is purple."],
              ["table", "meja", "desk", "The plates are on the table."],
              ["chair", "kursi", "chair", "Sit on the chair."],
              ["TV", "televisi", "tv", "We watch TV."],
              ["stove", "kompor", "stove", "The stove is hot!"],
              ["bathtub", "bak mandi", "bathtub", "The duck is in the bathtub."],
            ]),
            repeat(["bed", "sofa", "table", "chair", "TV", "stove", "bathtub"]),
          ],
        },
        {
          title: "There is a…",
          blocks: [
            text("Untuk menyebut benda yang ada di ruangan, pakai **There is a …** (Ada sebuah …)."),
            audio("My bedroom", say(["woman", "This is my bedroom."], ["woman", "There is a bed."], ["woman", "There is a desk and a chair."], ["woman", "There is a window. I like my bedroom!"])),
            tryIt(pickMany("sd2-c1-l2-try1", "Listen again. Choose ALL the things in her bedroom.", ["a bed", "a desk", "a stove", "a window"], [0, 1, 3], "Di kamarnya ada bed, desk, chair, dan window. Stove ada di dapur.")),
          ],
        },
      ],
      checkpoint: [
        listen("sd2-c1-l2-c1", voice("Sofa."), "Listen. Choose the picture.", ["pic:sofa", "pic:bed", "pic:tv"], 0, "Sofa = sofa."),
        pick("sd2-c1-l2-c2", "What is this?", ["a stove", "a bathtub", "a TV"], 0, "Kompor = stove.", { image: "stove" }),
        arrange("sd2-c1-l2-c3", "Put the words in order.", "There is a bed", "There is a + benda."),
        trMatch("sd2-c1-l2-c4", "Match.", [["bed", "tempat tidur"], ["stove", "kompor"], ["bathtub", "bak mandi"]], "Bed, stove, bathtub!"),
        pick("sd2-c1-l2-c5", "The stove is in the…", ["kitchen", "bedroom", "garden"], 0, "Kompor ada di dapur."),
        pick("sd2-c1-l2-c6", "Which thing is NOT in a bathroom?", ["a sofa", "a bathtub", "a toothbrush"], 0, "Sofa ada di ruang tamu, bukan kamar mandi.", { hots: true }),
      ],
    },
    {
      id: "sd2-c1-l3",
      skill: "reading",
      title: "Raka's Home",
      summary: "Read about Raka's home: where is everybody?",
      passages: [HOUSE_TEXT],
      sections: [
        {
          title: "Read the text",
          blocks: [
            { type: "passage", passage: HOUSE_TEXT },
            audio("Listen and read", say(["man", HOUSE_TEXT.lines.join(" ")])),
            tryIt(pick("sd2-c1-l3-try1", "Where is Mom?", ["in the kitchen", "in the garden", "in the bedroom"], 0, "Line 4: Mom is in the kitchen.", { passageId: HOUSE_TEXT.id })),
          ],
        },
        {
          title: "Where is…?",
          blocks: [
            text("Bertanya tempat: **Where is Mom?** (Di mana Ibu?) Jawab: **She is in the kitchen.** Untuk hewan atau benda: **It is in the garden.**"),
            pics([["mother", "She is in the kitchen."], ["cat", "It is in the garden."]]),
            speaking({
              id: "sd2-c1-l3-say",
              title: "My home",
              prompt: "Talk about your home. Say two rooms and one thing in each room.",
              image: "house",
              seconds: 40,
              tips: ["This is my home.", "There is a … in the …", "I like my …"],
              models: [{ label: "Example", text: "This is my home. There is a TV in the living room. There is a bed in my bedroom. I like my bedroom." }],
              rubric: ["I said **This is my home**.", "I named two rooms.", "I used **There is a …**."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd2-c1-l3-c1", "How many bedrooms are there?", ["two", "one", "three"], 0, "Line 2: two bedrooms.", { passageId: HOUSE_TEXT.id }),
        pick("sd2-c1-l3-c2", "What is in the living room?", ["a big sofa", "a bathtub", "a stove"], 0, "Line 3: a big sofa.", { passageId: HOUSE_TEXT.id }),
        pick("sd2-c1-l3-c3", "Where is the cat?", ["in the garden", "in the kitchen", "on the sofa"], 0, "Line 5: My cat is in the garden.", { passageId: HOUSE_TEXT.id }),
        fill("sd2-c1-l3-c4", "Complete.", "Mom is in the kitchen. She is", ".", ["cooking"], "Line 4: She is cooking.", { passageId: HOUSE_TEXT.id }),
        arrange("sd2-c1-l3-c5", "Put the words in order.", "Where is the cat", "Where is + benda/hewan?"),
        pick("sd2-c1-l3-c6", "The cat is sleeping under a tree. Is it hot or sleepy?", ["sleepy", "hungry", "angry"], 0, "Kucing sedang tidur, jadi mengantuk (sleepy).", { passageId: HOUSE_TEXT.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd2-c1-post",
    title: "Chapter 1 Posttest",
    passPercent: 70,
    passages: [HOUSE_TEXT],
    questions: [
      listen("sd2-c1-post1", voice("Garden."), "Listen. Choose the picture.", ["pic:flower", "pic:bed", "pic:stove", "pic:sofa"], 0, "Garden = kebun, ada bunga."),
      pick("sd2-c1-post2", "What is this?", ["a bathtub", "a bed", "a sofa", "a stove"], 0, "Bak mandi = bathtub.", { image: "bathtub" }),
      match("sd2-c1-post3", "Match.", [["pic:bed", "bed"], ["pic:sofa", "sofa"], ["pic:tv", "TV"], ["pic:door", "door"]], "Pintar!"),
      trPick("sd2-c1-post4", "“Kamar mandi” in English is…", ["bathroom", "bedroom", "kitchen", "living room"], 0, "Kamar mandi = bathroom."),
      listen("sd2-c1-post5", say(["woman", "Where is Dad?"], ["man", "He is in the living room."]), "Listen. Where is Dad?", ["in the living room", "in the kitchen", "in the garden", "in the bathroom"], 0, "He is in the living room."),
      arrange("sd2-c1-post6", "Put the words in order.", "She is in the kitchen", "She is in the + ruangan."),
      fill("sd2-c1-post7", "Complete: There ___ a sofa.", "There", "a sofa.", ["is"], "There is a sofa."),
      pick("sd2-c1-post8", "Raka loves his…", ["home", "school", "kite", "car"], 0, "Line 6: I love my home!", { passageId: HOUSE_TEXT.id }),
      pick("sd2-c1-post9", "You are hungry. Which room do you go to?", ["the kitchen", "the bathroom", "the garden", "the bedroom"], 0, "Lapar → ke dapur mencari makanan.", { hots: true, image: "feel-hungry" }),
      pick("sd2-c1-post10", "It is night. You are sleepy. Where do you go?", ["to the bedroom", "to the kitchen", "to the garden", "to school"], 0, "Mengantuk → ke kamar tidur.", { hots: true, image: "night" }),
    ],
  },
  live: {
    title: "Live Quiz — Home Sweet Home",
    questions: [
      live("sd2-c1-live1", "What is it?", ["a bed", "a sofa", "a desk", "a stove"], 0, "bed"),
      live("sd2-c1-live2", "We cook in the…", ["kitchen", "bedroom", "garden", "bathroom"], 0, "stove"),
      live("sd2-c1-live3", "What is it?", ["a sofa", "a bed", "a TV", "a door"], 0, "sofa"),
      live("sd2-c1-live4", "Where do we take a bath?", ["bathroom", "kitchen", "garden", "living room"], 0, "bathtub"),
      live("sd2-c1-live5", "There ___ a TV.", ["is", "are", "am", "be"], 0, "tv"),
      live("sd2-c1-live6", "Flowers grow in the…", ["garden", "bathroom", "kitchen", "bed"], 0, "flower"),
      live("sd2-c1-live7", "Where is Mom? ___ is in the kitchen.", ["She", "He", "It", "They"], 0, "mother"),
      live("sd2-c1-live8", "We sleep in the…", ["bedroom", "kitchen", "garden", "bathroom"], 0, "sleep"),
    ],
  },
};

export const CH2: Level = {
  id: "sd2-ch2",
  title: "Chapter 2 — My Day",
  description: "Talk about your daily routine and the days of the week: I wake up, I brush my teeth, I go to school.",
  targetScore: "Listening · Speaking",
  cover: ["alarm", "toothbrush", "school"],
  pretest: {
    id: "sd2-c2-pre",
    title: "Chapter 2 Pretest",
    passPercent: 0,
    questions: [
      listen("sd2-c2-pre1", voice("Wake up!"), "Listen. Choose the picture.", ["pic:alarm", "pic:sleep", "pic:school", "pic:rice"], 0, "Wake up = bangun tidur."),
      listen("sd2-c2-pre2", voice("Brush your teeth."), "Listen. Choose the picture.", ["pic:toothbrush", "pic:bathtub", "pic:book", "pic:ball"], 0, "Brush your teeth = sikat gigi."),
      trPick("sd2-c2-pre3", "“Senin” in English is…", ["Monday", "Sunday", "Friday", "Tuesday"], 0, "Senin = Monday."),
      pick("sd2-c2-pre4", "What do you do in the morning?", ["I go to school.", "I go to sleep.", "I watch the moon."], 0, "Pagi hari kita berangkat sekolah.", { image: "morning" }),
      pick("sd2-c2-pre5", "How many days are in a week?", ["seven", "five", "ten", "two"], 0, "Seminggu ada tujuh hari = seven.", { image: "calendar" }),
    ],
  },
  lessons: [
    {
      id: "sd2-c2-l1",
      skill: "vocabulary",
      title: "My Morning",
      summary: "Wake up, brush my teeth, take a bath, get dressed, eat breakfast, go to school.",
      sections: [
        {
          title: "Every morning",
          blocks: [
            vocab([
              ["wake up", "bangun tidur", "alarm", "I wake up at six."],
              ["brush my teeth", "sikat gigi", "toothbrush", "I brush my teeth."],
              ["take a bath", "mandi", "bathtub", "I take a bath."],
              ["get dressed", "berpakaian", "shirt", "I get dressed."],
              ["eat breakfast", "sarapan", "egg", "I eat breakfast with my family."],
              ["go to school", "berangkat sekolah", "school", "I go to school at seven."],
            ]),
            audio("My morning song", say(["woman", "This is the way I wake up, wake up, wake up."], ["woman", "This is the way I brush my teeth, early in the morning."])),
          ],
        },
        {
          title: "First, then…",
          blocks: [
            text("Urutkan kegiatan pagi dengan **First** (pertama), **Then** (lalu), dan **After that** (setelah itu)."),
            repeat(["First, I wake up.", "Then, I brush my teeth.", "After that, I take a bath.", "Then, I eat breakfast.", "After that, I go to school."]),
            tryIt(arrange("sd2-c2-l1-try1", "Put the words in order.", "I brush my teeth", "I + kegiatan.")),
          ],
        },
      ],
      checkpoint: [
        listen("sd2-c2-l1-c1", voice("Take a bath."), "Listen. Choose the picture.", ["pic:bathtub", "pic:alarm", "pic:school"], 0, "Take a bath = mandi."),
        pick("sd2-c2-l1-c2", "What is she doing?", ["eating breakfast", "sleeping", "brushing her teeth"], 0, "Gambar telur → sarapan.", { image: "egg" }),
        match("sd2-c2-l1-c3", "Match.", [["pic:alarm", "wake up"], ["pic:toothbrush", "brush my teeth"], ["pic:shirt", "get dressed"], ["pic:school", "go to school"]], "Rutinitas pagi yang lengkap!"),
        trPick("sd2-c2-l1-c4", "“Sarapan” in English is…", ["eat breakfast", "eat dinner", "take a bath"], 0, "Sarapan = eat breakfast."),
        pick("sd2-c2-l1-c5", "What comes FIRST?", ["wake up", "go to school", "eat breakfast"], 0, "Pertama kita bangun tidur dulu."),
        pick("sd2-c2-l1-c6", "You eat candy. Then you should…", ["brush your teeth", "go to sleep with candy", "take a kite"], 0, "Setelah makan permen, sikat gigi supaya gigi sehat.", { hots: true, image: "candy" }),
      ],
    },
    {
      id: "sd2-c2-l2",
      skill: "vocabulary",
      title: "Days of the Week",
      summary: "Monday to Sunday, today, tomorrow.",
      sections: [
        {
          title: "Seven days",
          blocks: [
            pics([["calendar", "a week"]]),
            vocab([
              ["Monday", "Senin", "calendar"],
              ["Tuesday", "Selasa", "calendar"],
              ["Wednesday", "Rabu", "calendar"],
              ["Thursday", "Kamis", "calendar"],
              ["Friday", "Jumat", "calendar"],
              ["Saturday", "Sabtu", "calendar"],
              ["Sunday", "Minggu", "calendar"],
            ]),
            audio("Days song", say(["woman", "Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday. Seven days in a week!"])),
            tip("Nama hari dalam bahasa Inggris selalu ditulis dengan **huruf kapital**: **M**onday, **F**riday."),
          ],
        },
        {
          title: "What day is it today?",
          blocks: [
            audio("Today", say(["man", "What day is it today?"], ["woman", "It is Monday."], ["man", "What day is tomorrow?"], ["woman", "Tomorrow is Tuesday."])),
            tryIt(pick("sd2-c2-l2-try1", "Today is Monday. Tomorrow is…", ["Tuesday", "Sunday", "Friday"], 0, "Setelah Senin adalah Selasa = Tuesday.")),
          ],
        },
      ],
      checkpoint: [
        listen("sd2-c2-l2-c1", voice("Friday."), "Listen. Which day?", ["Friday", "Monday", "Sunday"], 0, "Friday = Jumat."),
        trMatch("sd2-c2-l2-c2", "Match.", [["Monday", "Senin"], ["Wednesday", "Rabu"], ["Saturday", "Sabtu"]], "Monday, Wednesday, Saturday!"),
        fill("sd2-c2-l2-c3", "What comes next? Monday, Tuesday, ___", "Monday, Tuesday,", "", ["Wednesday"], "Setelah Tuesday adalah Wednesday."),
        pick("sd2-c2-l2-c4", "Which one is written correctly?", ["Sunday", "sunday", "SUNday"], 0, "Nama hari diawali huruf kapital."),
        arrange("sd2-c2-l2-c5", "Put the words in order.", "What day is it today", "What day is it today? = Hari apa hari ini?"),
        pick("sd2-c2-l2-c6", "We don't go to school on…", ["Sunday", "Monday", "Wednesday"], 0, "Hari Minggu sekolah libur.", { hots: true }),
      ],
    },
    {
      id: "sd2-c2-l3",
      skill: "speaking",
      title: "My Busy Day",
      summary: "Afternoon and evening: play, do homework, eat dinner, go to bed.",
      sections: [
        {
          title: "Afternoon and evening",
          blocks: [
            vocab([
              ["play with friends", "bermain dengan teman", "ball"],
              ["do my homework", "mengerjakan PR", "open-book"],
              ["watch TV", "menonton TV", "tv"],
              ["eat dinner", "makan malam", "rice"],
              ["go to bed", "pergi tidur", "sleep"],
            ]),
            audio("Dina's day", say(["woman", "Hi, I'm Dina. I wake up at six. I go to school at seven. In the afternoon, I play with my friends. In the evening, I do my homework. I go to bed at nine."])),
          ],
        },
        {
          title: "Tell your day",
          blocks: [
            tryIt(pick("sd2-c2-l3-try1", "When does Dina do her homework?", ["in the evening", "in the morning", "at school"], 0, "In the evening, I do my homework.")),
            speaking({
              id: "sd2-c2-l3-say",
              title: "My day",
              prompt: "Tell us about your day. Say three things you do.",
              image: "clock",
              seconds: 45,
              tips: ["In the morning, I …", "In the afternoon, I …", "In the evening, I …"],
              models: [{ label: "Example", text: "In the morning, I wake up and brush my teeth. In the afternoon, I play with my friends. In the evening, I eat dinner and go to bed." }],
              rubric: ["I talked about the morning.", "I talked about the afternoon or evening.", "I said three activities."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd2-c2-l3-c1", voice("I go to bed at nine."), "Listen. What time does she go to bed?", ["nine", "seven", "six"], 0, "Nine = jam sembilan."),
        pick("sd2-c2-l3-c2", "What is he doing?", ["doing his homework", "watching TV", "sleeping"], 0, "Buku terbuka → mengerjakan PR.", { image: "open-book" }),
        trPick("sd2-c2-l3-c3", "“Makan malam” in English is…", ["eat dinner", "eat breakfast", "go to bed"], 0, "Makan malam = eat dinner."),
        arrange("sd2-c2-l3-c4", "Put the words in order.", "I play with my friends", "I play with my friends = aku bermain dengan teman-temanku."),
        fill("sd2-c2-l3-c5", "Complete: In the evening, I go to ___ .", "In the evening, I go to", ".", ["bed"], "Go to bed = pergi tidur."),
        pick("sd2-c2-l3-c6", "Which one do you do LAST in a day?", ["go to bed", "wake up", "go to school"], 0, "Kegiatan terakhir dalam sehari adalah tidur.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd2-c2-post",
    title: "Chapter 2 Posttest",
    passPercent: 70,
    questions: [
      listen("sd2-c2-post1", voice("Brush your teeth."), "Listen. Choose the picture.", ["pic:toothbrush", "pic:sleep", "pic:school", "pic:egg"], 0, "Brush your teeth = sikat gigi."),
      pick("sd2-c2-post2", "What do you do?", ["I go to school.", "I go to bed.", "I take a bath.", "I eat dinner."], 0, "Gambar sekolah → go to school.", { image: "school" }),
      trPick("sd2-c2-post3", "“Kamis” in English is…", ["Thursday", "Tuesday", "Saturday", "Sunday"], 0, "Kamis = Thursday."),
      fill("sd2-c2-post4", "What comes next? Friday, Saturday, ___", "Friday, Saturday,", "", ["Sunday"], "Setelah Saturday adalah Sunday."),
      match("sd2-c2-post5", "Match.", [["pic:alarm", "wake up"], ["pic:bathtub", "take a bath"], ["pic:tv", "watch TV"], ["pic:sleep", "go to bed"]], "Bagus!"),
      listen("sd2-c2-post6", say(["man", "What day is it today?"], ["woman", "It is Wednesday."]), "Listen. What day is it?", ["Wednesday", "Monday", "Friday", "Sunday"], 0, "It is Wednesday."),
      arrange("sd2-c2-post7", "Put the words in order.", "I eat breakfast with my family", "I eat breakfast with my family."),
      pick("sd2-c2-post8", "Today is Saturday. Tomorrow is…", ["Sunday", "Friday", "Monday", "Tuesday"], 0, "Setelah Sabtu adalah Minggu."),
      pick("sd2-c2-post9", "Put in order: (1) eat breakfast (2) wake up (3) go to school", ["2 – 1 – 3", "1 – 2 – 3", "3 – 2 – 1", "3 – 1 – 2"], 0, "Bangun, sarapan, lalu berangkat sekolah.", { hots: true }),
      pick("sd2-c2-post10", "Yesterday was Monday. What day is today?", ["Tuesday", "Sunday", "Wednesday", "Monday"], 0, "Kemarin Senin → hari ini Selasa.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — My Busy Day",
    questions: [
      live("sd2-c2-live1", "What is it for?", ["brush my teeth", "take a bath", "eat", "sleep"], 0, "toothbrush"),
      live("sd2-c2-live2", "Monday, Tuesday, …", ["Wednesday", "Thursday", "Friday", "Sunday"], 0, "calendar"),
      live("sd2-c2-live3", "What is he doing?", ["sleeping", "eating", "playing", "reading"], 0, "sleep"),
      live("sd2-c2-live4", "How many days in a week?", ["seven", "six", "five", "ten"], 0, "calendar"),
      live("sd2-c2-live5", "First, I ___ up.", ["wake", "go", "eat", "take"], 0, "alarm"),
      live("sd2-c2-live6", "No school on…", ["Sunday", "Monday", "Tuesday", "Thursday"], 0, "school"),
      live("sd2-c2-live7", "“Sarapan” is…", ["breakfast", "dinner", "lunch", "snack"], 0, "egg", true),
      live("sd2-c2-live8", "In the evening, I go to…", ["bed", "school", "breakfast", "morning"], 0, "night"),
    ],
  },
};
