import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 6 (Fase C). Chapter 3 — Comparing Things · Chapter 4 — How to Make It

const ANIMALS: Passage = {
  id: "sd6-c3-animals",
  title: "Record-Breaking Animals",
  pic: "giraffe",
  lines: [
    "The giraffe is the tallest animal in the world. It can grow up to five and a half metres tall.",
    "The cheetah is the fastest land animal. It can run faster than a car on a city street.",
    "The elephant is heavier than any other land animal. An adult can weigh six thousand kilograms.",
    "The Komodo dragon is the biggest lizard on Earth, and it lives only in Indonesia.",
    "A turtle is much slower than a rabbit, but some turtles live longer than people.",
    "Which animal do you think is the most amazing?",
  ],
};

export const CH3: Level = {
  id: "sd6-ch3",
  title: "Chapter 3 — Comparing Things",
  description: "Compare people, animals and places with comparatives (-er, more) and superlatives (-est, most), including good/better/best.",
  targetScore: "Structure · Reading · Speaking",
  cover: ["giraffe", "cheetah", "komodo"],
  pretest: {
    id: "sd6-c3-pre",
    title: "Chapter 3 Pretest",
    passPercent: 0,
    questions: [
      pick("sd6-c3-pre1", "An elephant is ___ than a cat.", ["bigger", "big", "biggest", "more big"], 0, "Membandingkan dua → bigger than.", { image: "elephant" }),
      listen("sd6-c3-pre2", voice("The cheetah is the fastest land animal."), "Listen. Which animal is the fastest?", ["the cheetah", "the elephant", "the turtle"], 0, "Fastest = paling cepat."),
      trPick("sd6-c3-pre3", "“Lebih tinggi” in English is…", ["taller", "tallest", "tall", "more tall"], 0, "Lebih tinggi = taller."),
      pick("sd6-c3-pre4", "The opposite of “heavy” is…", ["light", "big", "long", "fat"], 0, "Berat ↔ ringan (light)."),
      pick("sd6-c3-pre5", "Mount Everest is the ___ mountain in the world.", ["highest", "higher", "high", "more high"], 0, "Paling → -est.", { image: "mountain" }),
    ],
  },
  lessons: [
    {
      id: "sd6-c3-l1",
      skill: "structure",
      title: "Comparatives: Bigger, More Beautiful",
      summary: "Comparing two things with -er than / more … than.",
      sections: [
        {
          title: "Spelling rules",
          blocks: [
            text("Untuk membandingkan **dua** hal, pakai **comparative + than**."),
            table(["Adjective", "Rule", "Comparative"], [["short, tall, old", "+ er", "shorter, taller, older"], ["nice, large", "+ r", "nicer, larger"], ["big, hot, thin", "double the last letter + er", "bigger, hotter, thinner"], ["happy, easy, heavy", "y → ier", "happier, easier, heavier"], ["beautiful, expensive, interesting", "more + adjective", "more beautiful, more expensive"]]),
            repeat(["A bus is bigger than a car.", "Bali is hotter than Lembang.", "This book is more interesting than that one."]),
          ],
        },
        {
          title: "Irregular forms",
          blocks: [
            table(["Adjective", "Comparative", "Superlative"], [["good", "better", "the best"], ["bad", "worse", "the worst"], ["far", "farther", "the farthest"], ["many / much", "more", "the most"]]),
            warn("Jangan pakai **more** dan **-er** bersamaan: *more bigger* ❌ → *bigger* ✅. Dan jangan lupa **than**: *taller than me*."),
            tryIt(pick("sd6-c3-l1-try1", "My handwriting is ___ than my brother's.", ["better", "gooder", "more good"], 0, "Good → better.")),
          ],
        },
      ],
      checkpoint: [
        listen("sd6-c3-l1-c1", voice("A train is longer than a bus."), "Listen. Which is longer?", ["the train", "the bus", "They are the same."], 0, "Longer than = lebih panjang dari."),
        pick("sd6-c3-l1-c2", "Today is ___ than yesterday.", ["hotter", "hoter", "more hot"], 0, "Hot → hotter (huruf t digandakan)."),
        fill("sd6-c3-l1-c3", "Complete: A smartphone is ___ (expensive) than a pencil.", "A smartphone is", "than a pencil.", ["more expensive"], "Kata panjang → more expensive."),
        match("sd6-c3-l1-c4", "Match the adjective and its comparative.", [["easy", "easier"], ["thin", "thinner"], ["bad", "worse"], ["large", "larger"]], "Aturan ejaan!"),
        trPick("sd6-c3-l1-c5", "“Kucingku lebih gemuk daripada kucingmu.” in English is…", ["My cat is fatter than your cat.", "My cat is fat than your cat.", "My cat is more fat than your cat."], 0, "Fat → fatter than."),
        pick("sd6-c3-l1-c6", "Rina is 145 cm. Dodi is 150 cm. Which sentence is TRUE?", ["Rina is shorter than Dodi.", "Rina is taller than Dodi.", "Dodi is shorter than Rina."], 0, "145 < 150 → Rina lebih pendek.", { hots: true }),
      ],
    },
    {
      id: "sd6-c3-l2",
      skill: "structure",
      title: "Superlatives: The Biggest, the Most Beautiful",
      summary: "Comparing three or more things with the -est / the most.",
      sections: [
        {
          title: "The best of all",
          blocks: [
            text("Untuk membandingkan **tiga atau lebih**, pakai **the + superlative**: *the tallest*, *the most beautiful*."),
            table(["Adjective", "Superlative"], [["tall", "the tallest"], ["big", "the biggest"], ["happy", "the happiest"], ["beautiful", "the most beautiful"], ["good", "the best"], ["bad", "the worst"]]),
            pics([["cat", "big"], ["cow", "bigger"], ["elephant", "the biggest"]], "Big → bigger → the biggest"),
            tip("Kucing **big**, sapi **bigger** (lebih besar dari kucing), gajah **the biggest** (paling besar dari ketiganya). Kebalikannya: kucing **the smallest**."),
          ],
        },
        {
          title: "Talk about records",
          blocks: [
            audio("A quiz show", say(["man", "Question one: what is the longest river in Indonesia?"], ["woman", "Is it the Kapuas River?"], ["man", "Correct! It is about one thousand one hundred kilometres long. Question two: what is the highest mountain in Indonesia?"], ["woman", "Puncak Jaya in Papua!"], ["man", "Excellent! You are the best player today!"])),
            tryIt(pick("sd6-c3-l2-try1", "What is the longest river in Indonesia?", ["the Kapuas River", "the Musi River", "the Ciliwung River"], 0, "Kapuas = sungai terpanjang di Indonesia.")),
            speaking({
              id: "sd6-c3-l2-say",
              title: "My family records",
              prompt: "Compare the people in your family. Who is the tallest? Who is the oldest? Who is the funniest? Who is the best cook?",
              image: "father",
              seconds: 60,
              tips: ["My father is the tallest in my family.", "My grandmother is the oldest.", "My little brother is funnier than my sister.", "My mother is the best cook!"],
              models: [{ label: "Example", text: "There are five people in my family. My father is the tallest. He is taller than my mother. My grandmother is the oldest. She is seventy years old. My little sister is the funniest. She always makes us laugh. And my mother is the best cook in the world!" }],
              rubric: ["I used at least three superlatives with **the**.", "I used at least one comparative with **than**.", "I gave a reason or a fact for each one."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd6-c3-l2-c1", voice("Puncak Jaya is the highest mountain in Indonesia."), "Listen. What is Puncak Jaya?", ["the highest mountain in Indonesia", "the longest river", "the biggest lake"], 0, "Highest = tertinggi."),
        pick("sd6-c3-l2-c2", "Jakarta is ___ city in Indonesia.", ["the biggest", "bigger", "the bigger"], 0, "Lebih dari dua → the biggest."),
        fill("sd6-c3-l2-c3", "Complete: This is the ___ (good) day of my life!", "This is the", "day of my life!", ["best"], "Good → the best."),
        arrange("sd6-c3-l2-c4", "Put the words in order.", "She is the most beautiful dancer", "The most + kata sifat panjang."),
        trPick("sd6-c3-l2-c5", "“Yang paling buruk” in English is…", ["the worst", "the baddest", "the most bad"], 0, "Bad → worse → the worst."),
        pick("sd6-c3-l2-c6", "Rina: 145 cm, Dodi: 150 cm, Sari: 140 cm. Who is the shortest?", ["Sari", "Rina", "Dodi"], 0, "140 cm paling pendek.", { hots: true }),
      ],
    },
    {
      id: "sd6-c3-l3",
      skill: "reading",
      title: "Reading: Record-Breaking Animals",
      summary: "Read about amazing animals and write a comparison.",
      passages: [ANIMALS],
      sections: [
        {
          title: "Amazing animals",
          blocks: [
            { type: "passage", passage: ANIMALS },
            audio("Listen and read", say(["woman", ANIMALS.lines.join(" ")])),
            vocab([["weigh", "berbobot/menimbang", "elephant"], ["lizard", "kadal", "komodo"], ["land animal", "hewan darat", "cheetah"], ["grow", "tumbuh", "giraffe"]], "Words from the text"),
            tryIt(pick("sd6-c3-l3-try1", "Which animal is the tallest?", ["the giraffe", "the elephant", "the cheetah"], 0, "Baris 1.", { passageId: ANIMALS.id })),
          ],
        },
        {
          title: "Write a comparison",
          blocks: [
            writing({
              id: "sd6-c3-l3-write",
              title: "Two places, two animals",
              prompt: "Compare two animals OR two places you know (for example, a cat and a dog, or your village and a big city). Write at least six comparison sentences.",
              image: "cat",
              minWords: 70,
              maxWords: 160,
              tips: ["A … is bigger/smaller than a …", "A … is more … than a …", "But a … is better at …", "In my opinion, the best … is …"],
              models: [{ label: "Example", text: "Cats and dogs are the most popular pets in Indonesia. A dog is usually bigger and stronger than a cat. A dog is also louder, and it needs more exercise. A cat is quieter and cleaner than a dog. It is also easier to take care of because it doesn't need a walk every day. But a dog is friendlier and better at protecting a house. In my opinion, a cat is the best pet for a small house." }],
              rubric: ["I wrote at least six comparison sentences.", "I spelled comparatives correctly (-er / -ier / double letter / more).", "I used **than** after comparatives.", "I gave my opinion at the end."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd6-c3-l3-c1", "How tall can a giraffe grow?", ["up to five and a half metres", "up to two metres", "up to ten metres"], 0, "Baris 1.", { passageId: ANIMALS.id }),
        pick("sd6-c3-l3-c2", "Which animal is the fastest on land?", ["the cheetah", "the giraffe", "the turtle"], 0, "Baris 2.", { passageId: ANIMALS.id }),
        fill("sd6-c3-l3-c3", "Complete.", "The Komodo dragon is the biggest", "on Earth.", ["lizard"], "Baris 4.", { passageId: ANIMALS.id }),
        pickMany("sd6-c3-l3-c4", "Choose ALL the true sentences.", ["An adult elephant can weigh 6,000 kg.", "Komodo dragons live only in Indonesia.", "A turtle is faster than a rabbit.", "The cheetah is the tallest animal."], [0, 1], "Baris 3 dan 4. Kura-kura lebih lambat.", { passageId: ANIMALS.id }),
        pick("sd6-c3-l3-c5", "“…some turtles live longer than people.” What does this mean?", ["Some turtles live more years than humans.", "Turtles are taller than people.", "Turtles walk longer distances."], 0, "Live longer = hidup lebih lama.", { passageId: ANIMALS.id, hots: true }),
        pick("sd6-c3-l3-c6", "Why is the Komodo dragon special for Indonesia?", ["It lives only in Indonesia.", "It is the fastest animal.", "It is the tallest animal."], 0, "Baris 4: hanya ada di Indonesia.", { passageId: ANIMALS.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd6-c3-post",
    title: "Chapter 3 Posttest",
    passPercent: 70,
    passages: [ANIMALS],
    questions: [
      pick("sd6-c3-post1", "A plane is ___ than a bus.", ["faster", "fastest", "more fast", "the fastest"], 0, "Dua hal → faster than."),
      listen("sd6-c3-post2", voice("My new bag is more expensive than my old bag, but it is lighter."), "Listen. What is true about the new bag?", ["It is more expensive and lighter.", "It is cheaper and heavier.", "It is the same."], 0, "More expensive + lighter."),
      trPick("sd6-c3-post3", "“Paling menarik” in English is…", ["the most interesting", "the interestingest", "more interesting"], 0, "Kata panjang → the most."),
      pick("sd6-c3-post4", "This is the ___ movie I have ever seen. I fell asleep!", ["worst", "baddest", "worse", "most bad"], 0, "Bad → the worst."),
      arrange("sd6-c3-post5", "Put the words in order.", "My sister is younger than me", "Younger than me."),
      pick("sd6-c3-post6", "Which animal is heavier than any other land animal?", ["the elephant", "the giraffe", "the Komodo dragon", "the cheetah"], 0, "Baris 3.", { passageId: ANIMALS.id }),
      match("sd6-c3-post7", "Match.", [["good", "the best"], ["happy", "the happiest"], ["big", "the biggest"], ["famous", "the most famous"]], "Superlatif!"),
      fill("sd6-c3-post8", "Complete: English is ___ (easy) than Maths for me.", "English is", "than Maths for me.", ["easier"], "Easy → easier."),
      pick("sd6-c3-post9", "A cheetah can run faster than a car on a city street. What can we guess?", ["City cars usually drive slowly.", "Cheetahs live in cities.", "Cars are slower than turtles."], 0, "Mobil di jalan kota melaju pelan.", { passageId: ANIMALS.id, hots: true }),
      pick("sd6-c3-post10", "Box A: 2 kg. Box B: 5 kg. Box C: 3 kg. Which sentence is correct?", ["Box B is the heaviest.", "Box A is heavier than Box C.", "Box C is the lightest.", "Box B is lighter than Box A."], 0, "5 kg paling berat.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Biggest, Fastest, Best",
    questions: [
      live("sd6-c3-live1", "big → …", ["bigger", "biger", "more big", "bigest"], 0, "elephant"),
      live("sd6-c3-live2", "good → the …", ["best", "goodest", "better", "most good"], 0, "trophy"),
      live("sd6-c3-live3", "The fastest land animal:", ["cheetah", "turtle", "elephant", "cow"], 0, "cheetah"),
      live("sd6-c3-live4", "happy → …", ["happier", "happyer", "more happy", "happiest"], 0, "happy"),
      live("sd6-c3-live5", "beautiful → the …", ["most beautiful", "beautifulest", "more beautiful", "beautifuler"], 0, "flower"),
      live("sd6-c3-live6", "The tallest animal:", ["giraffe", "komodo", "monkey", "frog"], 0, "giraffe"),
      live("sd6-c3-live7", "“Lebih buruk” is…", ["worse", "badder", "worst", "more bad"], 0, "sad", true),
      live("sd6-c3-live8", "A bus is ___ than a car.", ["longer", "longest", "more long", "long"], 0, "bus"),
    ],
  },
};

const CRAFT: Passage = {
  id: "sd6-c4-craft",
  title: "How to Make a Paper Kite",
  pic: "kite",
  lines: [
    "Materials: two thin bamboo sticks (60 cm and 50 cm), a large sheet of thin paper, glue, a long string and scissors.",
    "Steps:",
    "1. Tie the two sticks together to make a cross.",
    "2. Tie a string around the four ends of the sticks to make a frame.",
    "3. Put the frame on the paper and cut the paper about 2 cm bigger than the frame.",
    "4. Fold the edges of the paper over the string and glue them carefully.",
    "5. Make a tail from strips of paper and glue it to the bottom of the kite.",
    "6. Finally, tie the long string to the middle of the cross. Now, fly your kite on a windy day!",
  ],
};

export const CH4: Level = {
  id: "sd6-ch4",
  title: "Chapter 4 — How to Make It",
  description: "Read and write procedure texts for crafts and simple experiments, using materials, imperatives and sequence words.",
  targetScore: "Reading · Writing · Listening",
  cover: ["kite", "palette", "knife"],
  pretest: {
    id: "sd6-c4-pre",
    title: "Chapter 4 Pretest",
    passPercent: 0,
    questions: [
      pick("sd6-c4-pre1", "“___ the paper in half.” (melipat)", ["Fold", "Cook", "Drink", "Wash"], 0, "Melipat = fold.", { translate: true }),
      listen("sd6-c4-pre2", voice("First, cut the paper. Then, glue the pieces together."), "Listen. What do you do after cutting?", ["glue the pieces", "fold the paper", "paint the paper"], 0, "Then = setelah itu."),
      trPick("sd6-c4-pre3", "“Gunting” in English is…", ["scissors", "glue", "string", "stick"], 0, "Gunting = scissors."),
      pick("sd6-c4-pre4", "A procedure text tells us…", ["how to make or do something", "a story from the past", "the news"], 0, "Procedure = cara membuat/melakukan."),
      pick("sd6-c4-pre5", "We fly a kite on a ___ day.", ["windy", "rainy", "snowy", "foggy"], 0, "Layang-layang butuh angin.", { image: "windy" }),
    ],
  },
  lessons: [
    {
      id: "sd6-c4-l1",
      skill: "vocabulary",
      title: "Craft Materials and Actions",
      summary: "Words for making things: scissors, glue, string, fold, tie, stick, paint.",
      sections: [
        {
          title: "Materials",
          blocks: [
            table(["Material / tool", "Meaning"], [["scissors", "gunting"], ["glue", "lem"], ["string", "tali/benang"], ["tape", "selotip"], ["cardboard", "kardus/karton"], ["bamboo stick", "bilah bambu"], ["plastic bottle", "botol plastik"], ["paint and brush", "cat dan kuas"]]),
            pics([["palette", "paint"], ["knife", "cutter"], ["kite", "kite"], ["recycle", "used bottles"]]),
          ],
        },
        {
          title: "Action verbs",
          blocks: [
            table(["Verb", "Meaning", "Example"], [["cut", "memotong/menggunting", "Cut the paper into a circle."], ["fold", "melipat", "Fold the paper in half."], ["glue / stick", "mengelem/menempel", "Glue the eyes on the face."], ["tie", "mengikat", "Tie the two sticks together."], ["draw", "menggambar", "Draw a fish on the cardboard."], ["paint / colour", "mengecat/mewarnai", "Paint the bottle blue."], ["make a hole", "melubangi", "Make a small hole in the lid."]]),
            repeat(["Cut the paper.", "Fold it in half.", "Glue the edges.", "Tie the string.", "Paint it blue."]),
            tryIt(pick("sd6-c4-l1-try1", "You join two sticks with a string. You ___ them.", ["tie", "paint", "fold"], 0, "Mengikat = tie.")),
          ],
        },
      ],
      checkpoint: [
        listen("sd6-c4-l1-c1", voice("Fold the paper in half."), "Listen. What do you do?", ["fold the paper", "cut the paper", "paint the paper"], 0, "Fold = melipat."),
        match("sd6-c4-l1-c2", "Match the verb and the meaning.", [["tie", "mengikat"], ["glue", "mengelem"], ["fold", "melipat"], ["draw", "menggambar"]], "Kata kerja kerajinan!", { translate: true }),
        trPick("sd6-c4-l1-c3", "“Selotip” in English is…", ["tape", "type", "tap"], 0, "Selotip = tape."),
        fill("sd6-c4-l1-c4", "Complete: Make a small ___ in the lid. (lubang)", "Make a small", "in the lid.", ["hole"], "Lubang = hole.", { translate: true }),
        pick("sd6-c4-l1-c5", "Which tool do you need to cut paper?", ["scissors", "glue", "a brush"], 0, "Gunting untuk memotong."),
        pick("sd6-c4-l1-c6", "You want to make a pencil holder from a used bottle. What do you need most?", ["a plastic bottle, scissors and paint", "rice, eggs and a pan", "a ball and shoes"], 0, "Bahan kerajinan yang sesuai.", { hots: true }),
      ],
    },
    {
      id: "sd6-c4-l2",
      skill: "listening",
      title: "Follow the Instructions",
      summary: "Listening to steps, sequence words, and safety warnings.",
      sections: [
        {
          title: "Sequence and safety",
          blocks: [
            table(["Sequence words", "Safety words"], [["First, …", "Be careful with the scissors."], ["Second, … / Then, …", "Don't touch the hot glue."], ["Next, … / After that, …", "Ask an adult to help you."], ["Finally, …", "Wash your hands after painting."]]),
            text("Procedure memakai **imperative** (kalimat perintah) — mulai dengan kata kerja dasar: *Cut…, Fold…, Don't…*"),
          ],
        },
        {
          title: "A science experiment",
          blocks: [
            audio("The floating egg experiment", say(["woman", "Today we are going to make an egg float. You need a glass of water, an egg and five spoons of salt."], ["woman", "First, put the egg in the glass of water. Look! It sinks to the bottom."], ["woman", "Next, take the egg out. Add the salt to the water and stir well."], ["woman", "Finally, put the egg back into the water. Wow! Now it floats! Salty water is heavier, so it can push the egg up."])),
            tryIt(pick("sd6-c4-l2-try1", "What happens to the egg in normal water?", ["It sinks.", "It floats.", "It breaks."], 0, "It sinks to the bottom.")),
            speaking({
              id: "sd6-c4-l2-say",
              title: "Teach your friend",
              prompt: "Explain how to do something simple (for example, how to make a paper boat, how to plant a seed, or how to make iced tea). Use at least four steps and one safety tip.",
              image: "sprout",
              seconds: 75,
              tips: ["Today I'm going to show you how to …", "You need …", "First, … Then, … After that, … Finally, …", "Be careful …"],
              models: [{ label: "Example", text: "Today I'm going to show you how to plant a chili seed. You need a small pot, some soil, a chili seed and water. First, fill the pot with soil. Then, make a small hole with your finger. After that, put the seed in the hole and cover it with soil. Finally, water it a little every morning. Be careful, don't give it too much water!" }],
              rubric: ["I said what we need.", "I gave at least four steps with sequence words.", "I started each step with a verb.", "I gave a safety tip or a warning."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd6-c4-l2-c1", voice("Add the salt to the water and stir well."), "Listen. What do you add?", ["salt", "sugar", "sand"], 0, "Add the salt."),
        pick("sd6-c4-l2-c2", "Why does the egg float at the end?", ["Salty water is heavier and pushes it up.", "The egg is broken.", "The water is hot."], 0, "Air garam lebih berat."),
        arrange("sd6-c4-l2-c3", "Put the words in order.", "Ask an adult to help you", "Ask an adult to help you."),
        fill("sd6-c4-l2-c4", "Complete the warning: Be ___ with the knife!", "Be", "with the knife!", ["careful"], "Hati-hati = careful."),
        trPick("sd6-c4-l2-c5", "“Aduk rata.” in English is…", ["Stir well.", "Stay well.", "Store well."], 0, "Aduk = stir."),
        pick("sd6-c4-l2-c6", "Which sentence is NOT a good instruction?", ["The egg was in the glass yesterday.", "Put the egg in the glass.", "Add five spoons of salt."], 0, "Instruksi memakai kalimat perintah, bukan kalimat lampau.", { hots: true }),
      ],
    },
    {
      id: "sd6-c4-l3",
      skill: "reading",
      title: "Reading: How to Make a Paper Kite",
      summary: "Read a craft procedure and write your own.",
      passages: [CRAFT],
      sections: [
        {
          title: "Make a kite",
          blocks: [
            { type: "passage", passage: CRAFT },
            audio("Listen and read", say(["man", CRAFT.lines.join(" ")])),
            tip("Struktur procedure text: **goal** (judul/tujuan), **materials** (bahan dan alat), **steps** (langkah berurutan)."),
            tryIt(pick("sd6-c4-l3-try1", "How many bamboo sticks do you need?", ["two", "one", "four"], 0, "Baris 1.", { passageId: CRAFT.id })),
          ],
        },
        {
          title: "Write a procedure",
          blocks: [
            writing({
              id: "sd6-c4-l3-write",
              title: "A craft from used things",
              prompt: "Write a procedure text: how to make something useful from used things (a pencil holder from a bottle, a piggy bank from a can, a plant pot from a box…).",
              image: "recycle",
              minWords: 70,
              maxWords: 160,
              tips: ["Title: How to Make …", "Materials: …", "Steps: First, … Then, … Next, … Finally, …", "Add one safety tip."],
              models: [{ label: "Example", text: "How to Make a Pencil Holder from a Plastic Bottle\nMaterials: a used plastic bottle, scissors, coloured paper, glue and a marker.\nSteps:\nFirst, wash the bottle and dry it.\nSecond, ask an adult to cut the bottle about 12 cm from the bottom.\nThen, cover the bottle with coloured paper and glue it well.\nNext, draw a funny face on it with the marker.\nFinally, put your pencils and pens inside. Now your desk is tidy!" }],
              rubric: ["I wrote a title, materials and steps.", "Every step starts with a verb.", "I used sequence words.", "I added a safety tip."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd6-c4-l3-c1", "What do you do in step 1?", ["tie the two sticks to make a cross", "cut the paper", "fly the kite"], 0, "Baris 3.", { passageId: CRAFT.id }),
        pick("sd6-c4-l3-c2", "How much bigger than the frame should the paper be?", ["about 2 cm", "about 20 cm", "the same size"], 0, "Baris 5.", { passageId: CRAFT.id }),
        fill("sd6-c4-l3-c3", "Complete.", "Make a tail from strips of paper and glue it to the", "of the kite.", ["bottom"], "Baris 7.", { passageId: CRAFT.id }),
        pickMany("sd6-c4-l3-c4", "Choose ALL the materials in the text.", ["glue", "scissors", "a long string", "paint"], [0, 1, 2], "Baris 1 tidak menyebut cat.", { passageId: CRAFT.id }),
        pick("sd6-c4-l3-c5", "What is step 2 for?", ["making a frame for the paper", "making the tail", "decorating the kite"], 0, "Baris 4: to make a frame.", { passageId: CRAFT.id, hots: true }),
        pick("sd6-c4-l3-c6", "What would probably happen if you skip step 4?", ["The paper would come off the frame.", "The kite would fly higher.", "The sticks would break."], 0, "Tanpa dilem, kertas lepas.", { passageId: CRAFT.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd6-c4-post",
    title: "Chapter 4 Posttest",
    passPercent: 70,
    passages: [CRAFT],
    questions: [
      pick("sd6-c4-post1", "___ the two sticks together with a string.", ["Tie", "Fold", "Pour", "Fry"], 0, "Mengikat = tie."),
      listen("sd6-c4-post2", voice("Don't touch the hot glue gun. Ask an adult to help you."), "Listen. What is the warning about?", ["the hot glue gun", "the scissors", "the paint"], 0, "Hot glue gun."),
      trPick("sd6-c4-post3", "“Bahan-bahan dan alat” (for a craft) in English is…", ["materials", "steps", "goals"], 0, "Materials."),
      pick("sd6-c4-post4", "Which sequence word comes LAST?", ["Finally", "First", "Next", "Then"], 0, "Finally = terakhir."),
      arrange("sd6-c4-post5", "Put the words in order.", "Cut the paper into a circle", "Imperative: kata kerja di depan."),
      pick("sd6-c4-post6", "When should you fly the kite?", ["on a windy day", "at night", "on a rainy day", "in a room"], 0, "Baris 8.", { passageId: CRAFT.id }),
      match("sd6-c4-post7", "Match the tool and its use.", [["scissors", "to cut"], ["glue", "to stick"], ["string", "to tie"], ["brush", "to paint"]], "Alat dan fungsinya!"),
      fill("sd6-c4-post8", "Complete: ___ your hands after painting.", "", "your hands after painting.", ["Wash", "wash"], "Cuci tangan = wash."),
      pick("sd6-c4-post9", "Which step must come BEFORE gluing the paper edges?", ["making the frame with string", "tying the long string to fly", "flying the kite", "making the tail"], 0, "Bingkai harus ada dulu.", { passageId: CRAFT.id, hots: true }),
      pick("sd6-c4-post10", "Your little brother wants to use a sharp cutter. What is the best instruction?", ["Ask an adult to cut it for you.", "Cut it quickly.", "Use your teeth.", "Don't use anything."], 0, "Keselamatan dulu.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Crafty Hands",
    questions: [
      live("sd6-c4-live1", "Gunting =", ["scissors", "glue", "string", "tape"], 0, "knife", true),
      live("sd6-c4-live2", "Last step word:", ["Finally", "First", "Then", "Next"], 0, "target"),
      live("sd6-c4-live3", "___ the paper in half.", ["Fold", "Fry", "Pour", "Drink"], 0, "open-book"),
      live("sd6-c4-live4", "Glue is used to…", ["stick things", "cut things", "cook food", "fly"], 0, "palette"),
      live("sd6-c4-live5", "Kites need a ___ day.", ["windy", "rainy", "dark", "hot"], 0, "kite"),
      live("sd6-c4-live6", "Safety tip:", ["Be careful!", "Run fast!", "Eat it!", "Throw it!"], 0, "thumbs-up"),
      live("sd6-c4-live7", "Salt water makes an egg…", ["float", "sink", "break", "cook"], 0, "egg"),
      live("sd6-c4-live8", "A procedure text starts with the…", ["goal", "ending", "problem", "news"], 0, "question"),
    ],
  },
};
