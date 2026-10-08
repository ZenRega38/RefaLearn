import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, dialog, fill, listenPick, live, pair, phrases, pick, pickMany, repeatAfterMe, say } from "./helpers";

// Module 3 — Favorite Food & Tarakan Cuisine · Module 4 — Hobbies & Weekends
// Questions, options and titles are all English; explanations stay Indonesian.

export const M3: Level = {
  id: "ed-m3",
  title: "Module 3 — Favorite Food & Tarakan Cuisine",
  description: "Menyebut makanan favorit, mendeskripsikan rasa, dan merekomendasikan kuliner Tarakan.",
  targetScore: "Phase 1 · Personal",
  cover: ["crab", "soup", "chili"],
  lessons: [
    {
      id: "ed-m3-l1",
      skill: "speaking",
      title: "Key Phrases: Food & Taste",
      summary: "My favorite food is…, It tastes…, You can find it at…, I recommend…",
      sections: [
        {
          title: "Module 2 Recall",
          blocks: [
            { type: "try", question: pair("ed-m3-l1-recall", "Module 2 words: match each meaning with its word.", [["sons and daughters", "children"], ["your mother and father", "parents"], ["working after normal hours", "overtime"], ["too many cars on the road", "traffic jam"]], "Bagus, ingatanmu kuat!") },
          ],
        },
        {
          title: "Key Phrases",
          blocks: [
            phrases([
              ["My favorite food is ___.", "Makanan favorit saya ___."],
              ["It tastes ___ (sweet / salty / spicy).", "Rasanya ___ (manis / asin / pedas)."],
              ["You can find it at ___.", "Bisa ditemukan di ___."],
              ["I usually eat it with ___.", "Saya biasanya makan itu dengan ___."],
              ["I recommend ___.", "Saya rekomendasikan ___."],
            ]),
            repeatAfterMe(["My favorite food is crab.", "It tastes sweet and a little salty.", "You can find it at the seafood restaurant.", "I usually eat it with rice.", "I recommend soto."]),
          ],
        },
        {
          title: "Taste Words",
          blocks: [
            { type: "pictures", items: [{ pic: "candy", label: "sweet" }, { pic: "salt", label: "salty" }, { pic: "chili", label: "spicy" }, { pic: "lemon", label: "sour" }, { pic: "coffee", label: "bitter" }, { pic: "yum", label: "delicious" }] },
            { type: "text", md: "Spicy? → *Sambal!* Sweet? → *Es teh manis!* Coba sebutkan makanan lain untuk setiap rasa." },
            { type: "try", question: pick("ed-m3-l1-try", "How does sambal taste?", ["sweet", "spicy", "sour", "bitter"], 1, "Sambal = spicy (pedas).", { image: "chili" }) },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m3-l1-c1", "The cake has a lot of sugar. You say…", ["It tastes sweet.", "It taste sweets.", "It is taste sweet.", "Sweet is taste."], 0, "It tastes + rasa."),
        pair("ed-m3-l1-c2", "Match each picture with its taste.", [["pic:chili", "spicy"], ["pic:lemon", "sour"], ["pic:candy", "sweet"], ["pic:salt", "salty"]], "Lidahmu sudah bilingual!"),
        fill("ed-m3-l1-c3", "Complete the sentence.", "My", "food is nasi kuning. I eat it every week!", ["favorite", "favourite"], "Makanan favorit = favorite food."),
        listenPick("ed-m3-l1-c4", say(["woman", "I recommend soto. It tastes warm and spicy."]), "Listen. What does she recommend?", ["pic:soup|Soto", "pic:crab|Crab", "pic:grilled-fish|Grilled fish", "pic:cake|Cake"], 0, "I recommend soto."),
        pick("ed-m3-l1-c5", "A guest from Jakarta doesn't like spicy food. What is the best recommendation?", ["I recommend sambal. It's very spicy!", "I recommend grilled fish. It's savory, not spicy.", "I recommend chili.", "I don't recommend food."], 1, "Pilih makanan yang tidak pedas, lalu jelaskan rasanya.", { hots: true }),
      ],
    },
    {
      id: "ed-m3-l2",
      skill: "listening",
      title: "Let's Talk: Tarakan Cuisine",
      summary: "Dialog makanan favorit, menjelaskan makanan lokal yang tidak punya padanan Inggris.",
      sections: [
        {
          title: "Listen to the Dialogue",
          blocks: [
            dialog("What's your favorite food?", say(
              ["woman", "What's your favorite food?"],
              ["man", "My favorite food is crab. It tastes sweet and a little salty. You can find it at the seafood restaurant near the harbor."],
              ["woman", "Sounds good! I recommend soto. It tastes warm and spicy."],
            )),
            { type: "try", question: pick("ed-m3-l2-try", "Where can you eat crab, according to the man?", ["At a food stall near the office", "At the seafood restaurant near the harbor", "At home", "At the market"], 1, "“…at the seafood restaurant near the harbor.” Harbor = pelabuhan.") },
          ],
        },
        {
          title: "Local Food? Just Explain It!",
          blocks: [
            { type: "text", md: "Banyak makanan Tarakan tidak punya nama Inggris. Tidak apa-apa! Pakai nama aslinya, lalu **jelaskan**:\n\n- *Nasi kuning* — **It's a rice dish with turmeric.**\n- *Kepiting soka* — **It's a soft-shell crab. You can eat the shell!**\n- *Soto* — **It's a warm soup with chicken and spices.**" },
            { type: "tip", md: "Kalau ada yang tidak makan sesuatu: **I don't eat ___.** Contoh: *I don't eat shrimp.*" },
          ],
        },
        {
          title: "Conversation Questions",
          blocks: [
            phrases([
              ["What's your favorite food?", "My favorite food is grilled fish."],
              ["Where do you usually eat it?", "At a food stall near my house."],
              ["What does it taste like?", "It tastes savory."],
              ["What Tarakan food would you recommend to a visitor?", "I recommend kepiting soka."],
              ["Do you like spicy food? How spicy?", "Yes, very spicy!"],
              ["Can you cook? What can you cook?", "Yes, I can cook fried rice."],
            ], ["Question", "Sample answer"]),
          ],
        },
      ],
      checkpoint: [
        listenPick("ed-m3-l2-c1", say(["man", "My favorite food is crab. It tastes sweet and a little salty."]), "Listen. What is his favorite food?", ["pic:crab", "pic:soup", "pic:drumstick", "pic:rice"], 0, "Crab = kepiting."),
        pick("ed-m3-l2-c2", "A foreign guest asks about nasi kuning. How do you explain it?", ["It's a rice dish with turmeric.", "It's yellow nasi.", "It's a sweet cake.", "I don't know."], 0, "Turmeric = kunyit."),
        fill("ed-m3-l2-c3", "You never eat shrimp. Complete the sentence.", "I don't", "shrimp.", ["eat"], "I don't eat ___ = saya tidak makan ___."),
        pair("ed-m3-l2-c4", "Match each question with its answer.", [["What does it taste like?", "It tastes savory."], ["Where do you eat it?", "At a food stall."], ["Can you cook?", "Yes, I can cook fried rice."], ["Do you like spicy food?", "Yes, very spicy!"]], "Nyambung semua!"),
        pick("ed-m3-l2-c5", "Your friend asks, “What does it taste like?” Which answer really answers the question?", ["I eat it at home.", "It tastes sweet and sour.", "My favorite food is soto.", "I can cook it."], 1, "Pertanyaannya tentang rasa → jawab dengan rasa.", { hots: true }),
      ],
    },
    {
      id: "ed-m3-l3",
      skill: "vocabulary",
      title: "Vocab of the Day: Taste & Cuisine",
      summary: "Spicy, savory, delicious, crab, grilled fish, spices, raw/cooked, food stall, portion.",
      sections: [
        {
          title: "Today's Words",
          blocks: [
            {
              type: "vocab",
              items: [
                { emoji: "🌶️", pic: "chili", word: "spicy", meaning: "pedas", example: "I like spicy food." },
                { emoji: "🍬", pic: "candy", word: "sweet / salty / sour", meaning: "manis / asin / asam", example: "The sauce is sweet and sour." },
                { emoji: "🍲", pic: "soup", word: "savory", meaning: "gurih", example: "This soup is savory." },
                { emoji: "😋", pic: "yum", word: "delicious", meaning: "enak", example: "It's delicious!" },
                { emoji: "🦀", pic: "crab", word: "crab", meaning: "kepiting", example: "Crab is my favorite food." },
                { emoji: "🐟", pic: "grilled-fish", word: "grilled fish", meaning: "ikan bakar", example: "I eat grilled fish on Sunday." },
                { emoji: "🧂", pic: "salt", word: "seasoning / spices", meaning: "bumbu", example: "The spices are strong." },
                { emoji: "🍖", pic: "drumstick", word: "raw / cooked", meaning: "mentah / matang", example: "The fish is not cooked yet." },
                { emoji: "🏪", pic: "food-stall", word: "food stall", meaning: "warung", example: "I eat at a food stall." },
                { emoji: "🍚", pic: "rice", word: "portion", meaning: "porsi", example: "The portion is big." },
              ],
            },
            phrases([["vegetable", "“VEJ-tuh-bul”, bukan “vegetabel”", "Tiga suku kata saja"]], ["Word", "Say it like", "Note"]),
            repeatAfterMe(["vegetable", "delicious", "savory", "seasoning"]),
          ],
        },
      ],
      checkpoint: [
        pick("ed-m3-l3-c1", "The soup is salty and rich, like chicken broth. It tastes…", ["sweet", "savory", "sour", "spicy"], 1, "Gurih = savory."),
        listenPick("ed-m3-l3-c2", say(["woman", "The fish is not cooked yet."]), "Listen. What is wrong with the fish?", ["It's already cooked.", "It's still raw.", "It's too salty.", "Nothing — it's delicious."], 1, "Not cooked yet = belum matang (masih mentah)."),
        fill("ed-m3-l3-c3", "Complete the sentence about a small, simple place to eat.", "I eat at a food", "near my house.", ["stall"], "Warung = food stall."),
        pickMany("ed-m3-l3-c4", "Choose ALL the taste words.", ["sweet", "portion", "sour", "spicy", "crab"], [0, 2, 3], "Sweet, sour, spicy = rasa."),
        pick("ed-m3-l3-c5", "“The portion is big.” You want to say the opposite. You say…", ["The portion is small.", "The portion is spicy.", "The small is portion.", "The portion is cooked."], 0, "Big ↔ small.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ed-m3-quiz",
    title: "Module 3 Quiz",
    passPercent: 70,
    questions: [
      pick("ed-m3-q1", "What is in the picture?", ["crab", "fish", "chicken", "shrimp"], 0, "Crab = kepiting.", { image: "crab" }),
      listenPick("ed-m3-q2", say(["man", "It tastes very spicy!"]), "Listen. How does it taste?", ["pic:chili|Spicy", "pic:candy|Sweet", "pic:lemon|Sour", "pic:salt|Salty"], 0, "Spicy = pedas."),
      arrange("ed-m3-q3", "Put the words in order.", "I usually eat it with rice", "I usually eat it with + makanan pendamping."),
      pick("ed-m3-q4", "Your friend tastes the food and says, “It's delicious!” What does she mean?", ["The food is very good.", "The food is very spicy.", "The food is very expensive.", "The food is very hot."], 0, "Delicious = enak."),
      fill("ed-m3-q5", "Complete the sentence to suggest a dish to a visitor.", "I", "kepiting soka. It's a soft-shell crab.", ["recommend"], "Saya rekomendasikan = I recommend."),
      pair("ed-m3-q6", "Match each word with its meaning.", [["raw", "not cooked"], ["cooked", "ready to eat after heating"], ["spices", "things that give food flavor"], ["portion", "the amount of food on your plate"]], "Mantap! Raw = mentah, cooked = matang, spices = bumbu, portion = porsi."),
      pick("ed-m3-q7", "“Where do you usually eat it?” — which answer is right?", ["It tastes sweet.", "At a seafood restaurant.", "Yes, I can cook.", "I like it."], 1, "Where = di mana → jawab tempat."),
      listenPick("ed-m3-q8", say(["woman", "Grilled fish is my favorite. It's savory."]), "Listen. How does the grilled fish taste?", ["Sweet", "Savory", "Sour", "Bitter"], 1, "Savory = gurih."),
      pick("ed-m3-q9", "Coffee with no sugar tastes…", ["sweet", "salty", "bitter", "spicy"], 2, "Pahit = bitter.", { image: "coffee" }),
      pick("ed-m3-q10", "A tourist asks about “es teh manis”. What is the best explanation?", ["It's sweet iced tea.", "It's tea salty.", "It is hot coffee.", "Es teh is es teh."], 0, "Iced tea = es teh, sweet = manis.", { hots: true }),
    ],
  },
  live: {
    title: "Module 3 Live Quiz — Food Battle!",
    questions: [
      live("ed-m3-live1", "How does this taste?", ["sweet", "spicy", "sour", "bitter"], 1, "chili"),
      live("ed-m3-live2", "What is this seafood?", ["crab", "shrimp", "squid", "lobster"], 0, "crab"),
      live("ed-m3-live3", "Chicken soup is salty and rich. It tastes…", ["salty only", "savory", "spicy", "sweet"], 1, "soup"),
      live("ed-m3-live4", "How does a lemon taste?", ["sweet", "salty", "sour", "spicy"], 2, "lemon"),
      live("ed-m3-live5", "A small, simple place to eat by the road is a…", ["restaurant hall", "food stall", "food house", "market"], 1, "food-stall"),
      live("ed-m3-live6", "The food is very good! You say…", ["Delicious!", "Dangerous!", "Different!", "Difficult!"], 0, "yum"),
      live("ed-m3-live7", "It ___ sweet and salty.", ["taste", "tastes", "tasting", "is taste"], 1, "crab"),
      live("ed-m3-live8", "Fish cooked over fire is…", ["fried fish", "grilled fish", "boiled fish", "raw fish"], 1, "grilled-fish"),
      live("ed-m3-live9", "Meat that is not cooked is…", ["raw", "row", "cooked", "rare"], 0, "drumstick"),
      live("ed-m3-live10", "Suggest soto to a visitor:", ["I recommend soto.", "I recommendation soto.", "I am recommend soto.", "Soto recommend me."], 0, "soup"),
    ],
  },
};

export const M4: Level = {
  id: "ed-m4",
  title: "Module 4 — Hobbies & Weekends",
  description: "Bercerita tentang hobi, akhir pekan lalu, dan rencana akhir pekan ini. Ada mini review Modul 1–3.",
  targetScore: "Phase 1 · Personal",
  cover: ["fishing", "bicycle", "gamepad"],
  lessons: [
    {
      id: "ed-m4-l1",
      skill: "speaking",
      title: "Feelings & Mini Review",
      summary: "Variasi jawaban “How are you?” dan review kosakata Modul 1–3.",
      sections: [
        {
          title: "“How are you?” — Many Answers",
          blocks: [
            { type: "pictures", items: [{ pic: "feel-great", label: "I'm great!" }, { pic: "feel-tired", label: "I'm tired." }, { pic: "feel-sleepy", label: "I'm a little sleepy." }, { pic: "feel-hungry", label: "I'm hungry." }] },
            repeatAfterMe(["I'm great!", "I'm tired.", "I'm a little sleepy.", "I'm hungry."]),
            { type: "try", question: pick("ed-m4-l1-try", "You didn't sleep well last night. Someone asks, “How are you?” You say…", ["I'm a little sleepy.", "I'm hungry.", "I'm fishing.", "I'm delicious."], 0, "Kurang tidur → sleepy (ngantuk).", { image: "feel-sleepy" }) },
          ],
        },
        {
          title: "Mini Review: Modules 1–3",
          blocks: [
            { type: "text", md: "Seperti main **Charades Vocab** di kelas: baca petunjuknya, tebak kata bahasa Inggrisnya." },
            { type: "try", question: pair("ed-m4-l1-review1", "Review Modules 1–2: match each clue with its word.", [["a person you work with", "colleague"], ["the person who leads your team", "supervisor"], ["the first meal of the day", "breakfast"], ["working after normal hours", "overtime"]], "Ingatanmu mantap!") },
            { type: "try", question: pair("ed-m4-l1-review2", "Review Module 3: match each clue with its word.", [["hot, like sambal", "spicy"], ["salty and rich, like broth", "savory"], ["seafood with claws", "crab"], ["a small place to eat by the road", "food stall"]], "Pedas = spicy, gurih = savory, kepiting = crab, warung = food stall.") },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m4-l1-c1", "Your colleague says, “I'm hungry.” What does he need?", ["Some food", "A nap", "A day off", "A doctor"], 0, "Hungry = lapar, jadi ia butuh makan."),
        listenPick("ed-m4-l1-c2", say(["man", "I'm tired."]), "Listen. How does he feel?", ["pic:feel-tired|Tired", "pic:feel-great|Great", "pic:feel-hungry|Hungry", "pic:feel-sleepy|Sleepy"], 0, "Tired = capek."),
        pick("ed-m4-l1-c3", "Module 1 review: a person who uses our service is a…", ["customer", "colleague", "supervisor", "costume"], 0, "Customer = pelanggan."),
        fill("ed-m4-l1-c4", "Module 2 review: too many cars on the road is a traffic…", "traffic", "", ["jam"], "Traffic jam = macet."),
        pick("ed-m4-l1-c5", "It's 12 noon and you haven't eaten. What is the most honest answer to “How are you?”", ["I'm great, thanks!", "I'm hungry!", "I'm sleepy.", "I'm cooked."], 1, "Belum makan siang → hungry.", { hots: true }),
      ],
    },
    {
      id: "ed-m4-l2",
      skill: "speaking",
      title: "Key Phrases: Hobbies & Weekends",
      summary: "On weekends I usually…, I enjoy…, Last weekend I…, This weekend I'm going to…",
      sections: [
        {
          title: "Key Phrases",
          blocks: [
            phrases([
              ["On weekends, I usually ___.", "Di akhir pekan, saya biasanya ___."],
              ["I like / love / enjoy ___ing.", "Saya suka ___."],
              ["I've been doing this since ___.", "Saya sudah melakukan ini sejak ___."],
              ["I do it with ___.", "Saya melakukannya dengan ___."],
              ["Last weekend, I ___.", "Akhir pekan lalu, saya ___."],
              ["This weekend, I'm going to ___.", "Akhir pekan ini saya akan ___."],
            ]),
            repeatAfterMe(["On weekends, I usually go fishing.", "I enjoy cycling.", "I've been doing this since 2015.", "Last weekend, I visited my parents.", "This weekend, I'm going to stay at home."]),
          ],
        },
        {
          title: "Talking About the Past",
          blocks: [
            { type: "text", md: "Untuk cerita yang **sudah lewat**, kata kerjanya sering berubah. Hafalkan saja 6 yang paling sering:" },
            phrases([["go → went", "pergi"], ["eat → ate", "makan"], ["watch → watched", "menonton"], ["play → played", "bermain"], ["visit → visited", "mengunjungi"], ["stay → stayed", "tinggal/diam di"]], ["Now → Past", "Meaning"]),
            dialog("What do you do on weekends?", say(
              ["woman", "What do you do on weekends?"],
              ["man", "I usually go fishing with my friends. I've been doing this since 2015. Last weekend, I caught three fish!"],
              ["woman", "Wow! This weekend, I'm going to stay at home and watch movies."],
            )),
            { type: "try", question: pick("ed-m4-l2-try", "“Last weekend, I ___ to the beach.”", ["go", "went", "going", "goes"], 1, "Last weekend (sudah lewat) → went.") },
          ],
        },
      ],
      checkpoint: [
        listenPick("ed-m4-l2-c1", say(["man", "Last weekend, I caught three fish!"]), "Listen. What did he do last weekend?", ["pic:fishing|Went fishing", "pic:bicycle|Went cycling", "pic:tv|Watched a movie", "pic:gamepad|Played games"], 0, "Caught fish = menangkap ikan (memancing)."),
        pick("ed-m4-l2-c2", "Your plan for Saturday is to clean your home. You say…", ["This weekend, I'm going to clean the house.", "Last weekend, I cleaned the house.", "On weekends, I clean the house.", "I clean house weekend."], 0, "Rencana → I'm going to + kegiatan."),
        fill("ed-m4-l2-c3", "Complete with the past form of “watch”.", "Last weekend, I", "a movie.", ["watched"], "Watch → watched."),
        arrange("ed-m4-l2-c4", "Put the words in order.", "I enjoy cycling with my friends", "I enjoy + kegiatan -ing."),
        pick("ed-m4-l2-c5", "Which sentence talks about a PLAN?", ["Last weekend, I stayed at home.", "This weekend, I'm going to visit my parents.", "I usually play games.", "I've been doing this since 2015."], 1, "I'm going to = rencana yang akan datang.", { hots: true }),
      ],
    },
    {
      id: "ed-m4-l3",
      skill: "vocabulary",
      title: "Vocab of the Day: Free Time",
      summary: "Fishing, exercise, cycling, play games, family gathering, hang out, plan, boring.",
      sections: [
        {
          title: "Today's Words",
          blocks: [
            {
              type: "vocab",
              items: [
                { emoji: "🎣", pic: "fishing", word: "fishing", meaning: "memancing", example: "I go fishing on Saturday." },
                { emoji: "🏃", pic: "run", word: "exercise", meaning: "olahraga", example: "I exercise every Sunday morning." },
                { emoji: "🚲", pic: "bicycle", word: "cycling", meaning: "bersepeda", example: "We go cycling near the beach." },
                { emoji: "🎮", pic: "gamepad", word: "play games", meaning: "bermain game", example: "My son plays games all day." },
                { emoji: "👨‍👩‍👧", pic: "lunch", word: "family gathering", meaning: "kumpul keluarga", example: "We have a family gathering." },
                { emoji: "🧹", pic: "house", word: "clean the house", meaning: "bersih-bersih rumah", example: "I clean the house on Saturday." },
                { emoji: "😌", pic: "feel-sleepy", word: "rest / relax", meaning: "istirahat / santai", example: "I just relax at home." },
                { emoji: "☕", pic: "coffee", word: "hang out", meaning: "nongkrong", example: "We hang out at a cafe." },
                { emoji: "📅", pic: "calendar", word: "plan", meaning: "rencana", example: "I have no plans this weekend." },
                { emoji: "🥱", pic: "feel-tired", word: "boring", meaning: "membosankan", example: "The weekend was boring." },
              ],
            },
            { type: "tip", md: "Tidak punya hobi? Tidak masalah. **I sleep** atau **I watch TV** juga jawaban yang sah, kok." },
          ],
        },
      ],
      checkpoint: [
        pick("ed-m4-l3-c1", "You spend relaxed time with friends at a cafe. You…", ["hang out", "hang up", "go out work", "sit down"], 0, "Nongkrong = hang out."),
        listenPick("ed-m4-l3-c2", say(["woman", "We go cycling near the beach."]), "Listen. What do they do?", ["pic:bicycle", "pic:fishing", "pic:gamepad", "pic:tv"], 0, "Cycling = bersepeda."),
        fill("ed-m4-l3-c3", "Complete the sentence. Your weekend is empty.", "I have no", "this weekend.", ["plans", "plan"], "Rencana = plan(s)."),
        pair("ed-m4-l3-c4", "Match each word with its meaning.", [["exercise", "moving your body to stay healthy"], ["family gathering", "a meeting of many relatives"], ["boring", "not interesting at all"], ["relax", "rest and feel calm"]], "Keren! Exercise = olahraga, family gathering = kumpul keluarga, boring = membosankan, relax = santai."),
        pick("ed-m4-l3-c5", "“The weekend was boring.” What probably happened?", ["He did many fun activities.", "He had nothing to do and stayed at home.", "He won a competition.", "He went on holiday."], 1, "Boring = membosankan, biasanya karena tidak ada yang dilakukan.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ed-m4-quiz",
    title: "Module 4 Quiz",
    passPercent: 70,
    questions: [
      pick("ed-m4-q1", "What activity is in the picture?", ["fishing", "cycling", "swimming", "running"], 1, "Cycling = bersepeda.", { image: "bicycle" }),
      listenPick("ed-m4-q2", say(["man", "This weekend, I'm going to visit my parents."]), "Listen. When will he visit his parents?", ["Last weekend", "This weekend", "Every day", "Never"], 1, "This weekend + I'm going to = akhir pekan ini."),
      pick("ed-m4-q3", "What is the past form of “eat”?", ["eated", "ate", "eaten", "eats"], 1, "Eat → ate."),
      arrange("ed-m4-q4", "Put the words in order.", "Last weekend I stayed at home", "Last weekend + kata kerja lampau."),
      fill("ed-m4-q5", "Complete the sentence. You do this most weekends.", "On weekends, I", "go fishing.", ["usually"], "Usually = biasanya."),
      pair("ed-m4-q6", "Match each picture with the feeling.", [["pic:feel-great", "great"], ["pic:feel-tired", "tired"], ["pic:feel-sleepy", "sleepy"], ["pic:feel-hungry", "hungry"]], "Great = senang sekali, tired = capek, sleepy = ngantuk, hungry = lapar."),
      pick("ed-m4-q7", "“I've been doing this since 2015.” What does this mean?", ["He will start in 2015.", "He started in 2015 and still does it.", "He stopped in 2015.", "He has never done it."], 1, "Since = sejak. Dimulai 2015 dan masih dilakukan sampai sekarang."),
      listenPick("ed-m4-q8", say(["woman", "I just relax at home."]), "Listen. What does she do?", ["She rests at home.", "She cleans the house.", "She hangs out at a cafe.", "She exercises."], 0, "Relax at home = santai di rumah."),
      pick("ed-m4-q9", "Which sentence is CORRECT?", ["Last weekend, I go to the beach.", "Last weekend, I went to the beach.", "Last weekend, I going to the beach.", "Last weekend, I will go to the beach."], 1, "Last weekend → went."),
      pick("ed-m4-q10", "Two Truths and a Lie: “I went fishing. I ate crab. I visited the moon.” Which one is the lie?", ["I went fishing.", "I ate crab.", "I visited the moon.", "They are all true."], 2, "Tidak ada yang mengunjungi bulan akhir pekan lalu!", { hots: true }),
    ],
  },
  live: {
    title: "Module 4 Live Quiz — Weekend Fun",
    questions: [
      live("ed-m4-live1", "What activity is in the picture?", ["cycling", "fishing", "camping", "swimming"], 1, "fishing"),
      live("ed-m4-live2", "What is the past form of “go”?", ["goed", "gone", "went", "going"], 2, "plane"),
      live("ed-m4-live3", "Spend relaxed time with friends at a cafe:", ["hang out", "hang on", "go home", "stay up"], 0, "coffee"),
      live("ed-m4-live4", "How does he feel?", ["hungry", "sleepy", "great", "angry"], 1, "feel-sleepy"),
      live("ed-m4-live5", "This weekend, I'm going ___ visit my parents.", ["to", "for", "at", "on"], 0, "calendar"),
      live("ed-m4-live6", "The movie is not interesting at all. It is…", ["bored", "boring", "bore", "busy"], 1, "feel-tired"),
      live("ed-m4-live7", "What activity is in the picture?", ["play games", "watch TV", "cook", "read"], 0, "gamepad"),
      live("ed-m4-live8", "What is the past form of “watch”?", ["watched", "watcht", "wotch", "watching"], 0, "tv"),
      live("ed-m4-live9", "Running and swimming are kinds of…", ["exercise", "excuse", "extra", "exit"], 0, "run"),
      live("ed-m4-live10", "I enjoy ___.", ["cycle", "cycling", "to cycling", "cycled"], 1, "bicycle"),
    ],
  },
};
