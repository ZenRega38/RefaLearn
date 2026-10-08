import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 6 (Fase C). Chapter 5 — Our Environment · Chapter 6 — Fables and Stories

const RIVER: Passage = {
  id: "sd6-c5-river",
  title: "Our Clean River Project",
  pic: "recycle",
  lines: [
    "There is a small river behind our school. Two years ago, it was full of plastic and it smelled bad.",
    "Our class decided to do something. Every Saturday, we picked up rubbish along the river bank.",
    "We separated the rubbish into three bins: plastic, paper and food waste.",
    "We sold the plastic bottles to a recycling centre and used the money to buy small trees.",
    "We also made posters: “Don't throw rubbish into the river!” and put them near the bridge.",
    "Now the river is much cleaner, and we can see small fish again.",
    "We should all take care of our environment. Small actions can make a big difference!",
  ],
};

export const CH5: Level = {
  id: "sd6-ch5",
  title: "Chapter 5 — Our Environment",
  description: "Talk about environmental problems, give advice with should / shouldn't, follow the 3Rs, and make a poster.",
  targetScore: "Reading · Speaking · Writing",
  cover: ["earth", "recycle", "sprout"],
  pretest: {
    id: "sd6-c5-pre",
    title: "Chapter 5 Pretest",
    passPercent: 0,
    questions: [
      pick("sd6-c5-pre1", "Where should we put rubbish?", ["in the bin", "in the river", "on the street", "under the desk"], 0, "Sampah di tempat sampah.", { image: "trash" }),
      listen("sd6-c5-pre2", voice("Turn off the tap when you brush your teeth."), "Listen. What should you do?", ["turn off the tap", "open the tap", "buy water"], 0, "Matikan keran.", { image: "tap" }),
      trPick("sd6-c5-pre3", "“Daur ulang” in English is…", ["recycle", "reuse", "reduce", "remove"], 0, "Daur ulang = recycle."),
      pick("sd6-c5-pre4", "You ___ throw rubbish into the river.", ["shouldn't", "should", "must to", "can to"], 0, "Larangan → shouldn't."),
      pick("sd6-c5-pre5", "Which one makes air dirty?", ["smoke from factories", "trees", "flowers", "rain"], 0, "Asap pabrik = polusi.", { image: "factory" }),
    ],
  },
  lessons: [
    {
      id: "sd6-c5-l1",
      skill: "vocabulary",
      title: "Environmental Problems",
      summary: "Pollution, flood, rubbish, cutting down trees, saving water and energy.",
      sections: [
        {
          title: "Problems around us",
          blocks: [
            vocab([
              ["rubbish / trash", "sampah", "trash"],
              ["pollution", "polusi/pencemaran", "factory"],
              ["flood", "banjir", "rain"],
              ["cut down trees", "menebang pohon", "tree"],
              ["waste water", "membuang-buang air", "tap"],
              ["global warming", "pemanasan global", "earth"],
            ], "Problems"),
            text("Banyak masalah lingkungan berasal dari kebiasaan kecil: membuang sampah sembarangan, memakai plastik sekali pakai, dan membiarkan lampu menyala."),
          ],
        },
        {
          title: "The 3Rs",
          blocks: [
            table(["The 3Rs", "Meaning", "Example"], [["Reduce", "mengurangi", "Bring your own bottle. Say no to plastic straws."], ["Reuse", "memakai ulang", "Use old jars as pencil holders."], ["Recycle", "mendaur ulang", "Put cans and bottles in the recycling bin."]]),
            pics([["recycle", "recycle"], ["sprout", "plant trees"], ["tap", "save water"], ["trash", "use the bin"]]),
            repeat(["Reduce, reuse, recycle!", "Save water.", "Turn off the lights.", "Plant more trees."]),
            tryIt(pick("sd6-c5-l1-try1", "Using an old jar as a pencil holder is an example of…", ["reuse", "reduce", "pollution"], 0, "Memakai ulang = reuse.")),
          ],
        },
      ],
      checkpoint: [
        listen("sd6-c5-l1-c1", voice("Bring your own shopping bag. Say no to plastic bags."), "Listen. Which R is this?", ["Reduce", "Recycle", "Rebuild"], 0, "Mengurangi plastik = reduce."),
        match("sd6-c5-l1-c2", "Match.", [["pic:factory", "pollution"], ["pic:trash", "rubbish"], ["pic:tap", "water"], ["pic:sprout", "plant"]], "Kosakata lingkungan!"),
        trPick("sd6-c5-l1-c3", "“Banjir” in English is…", ["flood", "food", "flower"], 0, "Banjir = flood."),
        fill("sd6-c5-l1-c4", "Complete: Turn ___ the lights when you leave the room.", "Turn", "the lights when you leave the room.", ["off"], "Matikan = turn off."),
        pick("sd6-c5-l1-c5", "What happens when people cut down too many trees?", ["floods and landslides", "more fruit", "cleaner air"], 0, "Pohon menahan air dan tanah."),
        pick("sd6-c5-l1-c6", "Which action helps the MOST to reduce plastic waste at school?", ["bringing a lunch box and a water bottle every day", "buying snacks in plastic every day", "throwing plastic into the river"], 0, "Reduce dimulai dari kebiasaan harian.", { hots: true }),
      ],
    },
    {
      id: "sd6-c5-l2",
      skill: "speaking",
      title: "Should and Shouldn't",
      summary: "Giving advice and making rules for a green school.",
      sections: [
        {
          title: "Giving advice",
          blocks: [
            table(["", "Example"], [["Advice (+)", "We should save water."], ["Advice (−)", "We shouldn't waste food."], ["Question", "Should we turn off the fan? — Yes, we should."]]),
            warn("Setelah **should / shouldn't**, kata kerja bentuk dasar tanpa *to* dan tanpa *-s*: *She should **plant*** (bukan *should plants* atau *should to plant*)."),
            repeat(["You should bring a water bottle.", "We shouldn't burn rubbish.", "Everyone should plant a tree."]),
          ],
        },
        {
          title: "Green school meeting",
          blocks: [
            audio("Class meeting", say(["woman", "Our school wants to be a green school. What should we do?"], ["man", "I think we should have separate bins for plastic and paper."], ["woman", "Good idea. What else?"], ["man", "We shouldn't use plastic cups at the canteen. We should use glasses."], ["woman", "And we should make a small garden behind the library!"])),
            tryIt(pick("sd6-c5-l2-try1", "What should they use instead of plastic cups?", ["glasses", "paper bags", "bottles"], 0, "We should use glasses.")),
            speaking({
              id: "sd6-c5-l2-say",
              title: "My green school ideas",
              prompt: "Give a short speech to your class: three things we should do and two things we shouldn't do to keep our school green.",
              image: "earth",
              seconds: 75,
              tips: ["Good morning, friends. I want to talk about …", "First, we should … because …", "We shouldn't … because …", "Let's … together!"],
              models: [{ label: "Example", text: "Good morning, friends. Today I want to talk about our school environment. First, we should put rubbish in the right bin: plastic, paper or food. Second, we should bring our own water bottles. Third, we should water the plants in front of our class every day. We shouldn't leave the lights and the fan on during break time. And we shouldn't waste our lunch. Let's make our school green together! Thank you." }],
              rubric: ["I gave three **should** ideas.", "I gave two **shouldn't** ideas.", "I gave reasons with **because**.", "I opened and closed my speech politely."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd6-c5-l2-c1", voice("We shouldn't burn rubbish because the smoke is bad for our lungs."), "Listen. Why shouldn't we burn rubbish?", ["The smoke is bad for our lungs.", "It is too expensive.", "It takes too long."], 0, "Asap buruk untuk paru-paru."),
        pick("sd6-c5-l2-c2", "She ___ bring a water bottle.", ["should", "should to", "shoulds"], 0, "Should + kata kerja dasar."),
        fill("sd6-c5-l2-c3", "Complete: We ___ waste food. (sebaiknya tidak)", "We", "waste food.", ["shouldn't", "should not"], "Sebaiknya tidak = shouldn't.", { translate: true }),
        arrange("sd6-c5-l2-c4", "Put the words in order.", "We should plant more trees", "Should + plant."),
        trPick("sd6-c5-l2-c5", "“Kita sebaiknya menghemat listrik.” in English is…", ["We should save electricity.", "We should saves electricity.", "We should to save electricity."], 0, "Should + save."),
        pick("sd6-c5-l2-c6", "Your friend always leaves the tap running. What is the best advice?", ["You should turn off the tap. Water is precious.", "You should open more taps.", "You shouldn't drink water."], 0, "Saran yang tepat dan ada alasannya.", { hots: true }),
      ],
    },
    {
      id: "sd6-c5-l3",
      skill: "reading",
      title: "Reading: Our Clean River Project",
      summary: "Read about a class project and design an environmental poster.",
      passages: [RIVER],
      sections: [
        {
          title: "A clean river",
          blocks: [
            { type: "passage", passage: RIVER },
            audio("Listen and read", say(["woman", RIVER.lines.join(" ")])),
            tryIt(pick("sd6-c5-l3-try1", "Where is the river?", ["behind the school", "in front of the mosque", "near the market"], 0, "Baris 1.", { passageId: RIVER.id })),
          ],
        },
        {
          title: "Make a poster",
          blocks: [
            tip("Poster yang baik punya **judul yang menarik**, **ajakan/perintah singkat** (imperative), dan **alasan** atau fakta pendek."),
            writing({
              id: "sd6-c5-l3-write",
              title: "An environment poster",
              prompt: "Write the text for a poster about one environmental problem at your school or in your village. Include a title, three short instructions and one reason.",
              image: "trash",
              minWords: 30,
              maxWords: 90,
              tips: ["Title: Keep Our … Clean! / Save …!", "Instructions: Don't … / Use … / Turn off …", "Reason: because …"],
              models: [{ label: "Example", text: "SAVE OUR WATER!\nTurn off the tap after you use it.\nDon't play with water in the bathroom.\nReport leaking taps to the teacher.\nWhy? One dripping tap can waste more than 20 litres of water a day. Every drop counts!" }],
              rubric: ["My poster has a short, strong title.", "I wrote at least three instructions (imperatives).", "I gave a reason or a fact.", "My spelling is correct."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd6-c5-l3-c1", "What was the problem with the river two years ago?", ["It was full of plastic and smelled bad.", "It was dry.", "It was too deep."], 0, "Baris 1.", { passageId: RIVER.id }),
        pick("sd6-c5-l3-c2", "When did the class pick up rubbish?", ["every Saturday", "every Monday", "once a year"], 0, "Baris 2.", { passageId: RIVER.id }),
        pickMany("sd6-c5-l3-c3", "Choose ALL the things the class did.", ["separated the rubbish", "sold plastic bottles", "made posters", "built a bridge"], [0, 1, 2], "Baris 3, 4, 5.", { passageId: RIVER.id }),
        fill("sd6-c5-l3-c4", "Complete.", "We used the money to buy small", ".", ["trees"], "Baris 4.", { passageId: RIVER.id }),
        pick("sd6-c5-l3-c5", "“We can see small fish again.” This shows that…", ["the water is cleaner now", "people put fish in the river", "the river is bigger"], 0, "Ikan kembali = air bersih.", { passageId: RIVER.id, hots: true }),
        pick("sd6-c5-l3-c6", "What is the main message of the text?", ["Small actions can make a big difference.", "Rivers are dangerous.", "Plastic bottles are expensive."], 0, "Baris 7.", { passageId: RIVER.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd6-c5-post",
    title: "Chapter 5 Posttest",
    passPercent: 70,
    passages: [RIVER],
    questions: [
      pick("sd6-c5-post1", "We ___ throw rubbish in the river.", ["shouldn't", "should", "should to", "shoulds"], 0, "Larangan → shouldn't."),
      listen("sd6-c5-post2", voice("Please put the paper in the blue bin and the plastic in the yellow bin."), "Listen. Where does the plastic go?", ["the yellow bin", "the blue bin", "the green bin"], 0, "Plastic → yellow bin."),
      trPick("sd6-c5-post3", "“Pencemaran udara” in English is…", ["air pollution", "air population", "water pollution"], 0, "Air pollution."),
      pick("sd6-c5-post4", "Giving your old clothes to your younger cousin is…", ["reuse", "recycle", "pollution", "flood"], 0, "Memakai ulang barang = reuse."),
      arrange("sd6-c5-post5", "Put the words in order.", "Don't throw rubbish into the river", "Larangan: Don't + kata kerja."),
      pick("sd6-c5-post6", "Where did they put the posters?", ["near the bridge", "in the classroom", "at the market", "on the bus"], 0, "Baris 5.", { passageId: RIVER.id }),
      match("sd6-c5-post7", "Match the problem and the solution.", [["dirty river", "pick up rubbish"], ["too much plastic", "bring a bottle"], ["hot city", "plant trees"], ["wasting water", "turn off the tap"]], "Masalah dan solusi!"),
      fill("sd6-c5-post8", "Complete: Reduce, reuse, ___ !", "Reduce, reuse,", "!", ["recycle"], "Prinsip 3R: reduce, reuse, recycle."),
      pick("sd6-c5-post9", "Why did the class separate the rubbish into three bins?", ["so they could recycle and sell some of it", "because the bins were free", "to make the river deeper", "to feed the fish"], 0, "Pemilahan memudahkan daur ulang (baris 3–4).", { passageId: RIVER.id, hots: true }),
      pick("sd6-c5-post10", "Which poster title is the BEST for a no-plastic canteen?", ["Say No to Plastic! Bring Your Own Bottle", "I Like Plastic", "The Canteen Is Big", "Plastic Was Here"], 0, "Judul poster singkat dan mengajak.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Green Heroes",
    questions: [
      live("sd6-c5-live1", "“Daur ulang” =", ["recycle", "reduce", "reuse", "remove"], 0, "recycle", true),
      live("sd6-c5-live2", "Rubbish goes in the…", ["bin", "river", "street", "sea"], 0, "trash"),
      live("sd6-c5-live3", "We ___ save water.", ["should", "shouldn't", "should to", "shoulds"], 0, "tap"),
      live("sd6-c5-live4", "Smoke from factories causes…", ["pollution", "rainbows", "flowers", "fruit"], 0, "factory"),
      live("sd6-c5-live5", "Bringing a lunch box =", ["reduce", "pollute", "flood", "waste"], 0, "lunch"),
      live("sd6-c5-live6", "Too many trees cut down →", ["floods", "snow", "more birds", "clean air"], 0, "tree"),
      live("sd6-c5-live7", "Plant more…", ["trees", "plastic", "smoke", "rubbish"], 0, "sprout"),
      live("sd6-c5-live8", "Our only home:", ["Earth", "Mars", "Moon", "Sun"], 0, "earth"),
    ],
  },
};

const KANCIL: Passage = {
  id: "sd6-c6-kancil",
  title: "The Mouse Deer and the Crocodiles",
  pic: "mouse-deer",
  lines: [
    "Once upon a time, there was a clever mouse deer named Kancil. He lived in a forest near a wide river.",
    "One day, Kancil was very hungry. He saw delicious fruit trees on the other side of the river, but he couldn't swim.",
    "The river was full of hungry crocodiles. “Ha! A tasty lunch!” said the biggest crocodile.",
    "Kancil had an idea. “The King wants to know how many crocodiles live in this river. Please line up, and I will count you!”",
    "The crocodiles believed him. They lined up from one side of the river to the other.",
    "Kancil jumped on their backs and counted, “One, two, three…” until he reached the other side.",
    "“Thank you, foolish crocodiles!” laughed Kancil, and he ran into the forest to eat the fruit.",
    "The crocodiles were very angry, but it was too late.",
  ],
};

export const CH6: Level = {
  id: "sd6-ch6",
  title: "Chapter 6 — Fables and Stories",
  description: "Read and retell fables with orientation, complication and resolution; use past tense, sequence words and direct speech; find the moral of a story.",
  targetScore: "Reading · Speaking · Writing",
  cover: ["mouse-deer", "crocodile", "owl-read"],
  pretest: {
    id: "sd6-c6-pre",
    title: "Chapter 6 Pretest",
    passPercent: 0,
    questions: [
      pick("sd6-c6-pre1", "A story with animals that teaches a lesson is a…", ["fable", "recipe", "report", "letter"], 0, "Fabel = cerita hewan dengan pesan moral."),
      listen("sd6-c6-pre2", voice("Once upon a time, there was a lazy grasshopper."), "Listen. How does the story begin?", ["Once upon a time", "Last weekend", "Good morning"], 0, "Pembuka dongeng."),
      trPick("sd6-c6-pre3", "“Pesan moral” in English is…", ["the moral of the story", "the title of the story", "the end of the story"], 0, "Moral = pesan."),
      pick("sd6-c6-pre4", "The rabbit ___ very fast.", ["ran", "run", "runs", "running"], 0, "Cerita memakai past: run → ran."),
      pick("sd6-c6-pre5", "Which animal is famous for being clever in Indonesian stories?", ["Kancil (mouse deer)", "the crocodile", "the cow", "the chicken"], 0, "Si Kancil yang cerdik.", { image: "mouse-deer" }),
    ],
  },
  lessons: [
    {
      id: "sd6-c6-l1",
      skill: "reading",
      title: "Reading: The Mouse Deer and the Crocodiles",
      summary: "A classic Indonesian fable: characters, setting and plot.",
      passages: [KANCIL],
      sections: [
        {
          title: "The story",
          blocks: [
            { type: "passage", passage: KANCIL },
            audio("Listen to the story", say(["man", KANCIL.lines.slice(0, 3).join(" ")], ["woman", KANCIL.lines.slice(3, 6).join(" ")], ["man", KANCIL.lines.slice(6).join(" ")])),
            vocab([["clever", "cerdik", "mouse-deer"], ["foolish", "bodoh", "crocodile"], ["line up", "berbaris", "num-5"], ["believe", "percaya", "thumbs-up"], ["reach", "mencapai/sampai", "pin"]], "Story words"),
          ],
        },
        {
          title: "Parts of a narrative",
          blocks: [
            table(["Part", "Meaning", "In the story"], [["Orientation", "pengenalan tokoh, tempat, waktu", "Kancil lived in a forest near a river."], ["Complication", "masalah muncul", "He was hungry, couldn't swim, and the river was full of crocodiles."], ["Resolution", "masalah selesai", "He tricked the crocodiles and crossed the river."], ["Moral value", "pesan", "Use your brain to solve problems. Don't believe others too easily."]]),
            tryIt(pick("sd6-c6-l1-try1", "Why couldn't Kancil get the fruit at first?", ["He couldn't swim across the river.", "The fruit was bad.", "He was full."], 0, "Baris 2.", { passageId: KANCIL.id })),
          ],
        },
      ],
      checkpoint: [
        pick("sd6-c6-l1-c1", "Where did Kancil live?", ["in a forest near a wide river", "in a village", "in a zoo"], 0, "Baris 1.", { passageId: KANCIL.id }),
        pick("sd6-c6-l1-c2", "What did Kancil tell the crocodiles?", ["The King wanted to count them.", "He wanted to be their friend.", "He had food for them."], 0, "Baris 4.", { passageId: KANCIL.id }),
        fill("sd6-c6-l1-c3", "Complete.", "Kancil jumped on their", "and counted.", ["backs"], "Baris 6.", { passageId: KANCIL.id }),
        pickMany("sd6-c6-l1-c4", "Choose ALL the words that describe Kancil.", ["clever", "hungry", "foolish", "slow"], [0, 1], "Kancil cerdik dan lapar.", { passageId: KANCIL.id }),
        pick("sd6-c6-l1-c5", "Which line is the complication?", ["line 2", "line 1", "line 7"], 0, "Baris 2: masalah muncul.", { passageId: KANCIL.id, hots: true }),
        pick("sd6-c6-l1-c6", "What lesson can the crocodiles learn?", ["Don't believe someone too easily.", "Always line up.", "Never eat fruit."], 0, "Buaya terlalu mudah percaya.", { passageId: KANCIL.id, hots: true }),
      ],
    },
    {
      id: "sd6-c6-l2",
      skill: "structure",
      title: "Story Language",
      summary: "Story openers, sequence words, direct speech and past forms.",
      sections: [
        {
          title: "Telling a story",
          blocks: [
            table(["Function", "Expressions"], [["Opening", "Once upon a time, … / Long, long ago, …"], ["Moving the story", "One day, … / Then, … / Suddenly, … / After that, …"], ["Ending", "Finally, … / In the end, … / They lived happily ever after."], ["Direct speech", "“Help!” shouted the rabbit. / “Thank you,” said Kancil."]]),
            text("Cerita ditulis dengan **simple past**. Untuk percakapan tokoh, pakai tanda kutip dan kata kerja seperti **said, asked, shouted, laughed, cried**."),
            repeat(["Once upon a time, there was a clever mouse deer.", "Suddenly, a big crocodile appeared.", "“Help!” cried the little bird.", "In the end, they became good friends."]),
          ],
        },
        {
          title: "Another fable",
          blocks: [
            audio("The Ant and the Dove", say(["woman", "One hot day, a thirsty ant went to the river to drink. Suddenly, a wave carried it away."], ["man", "“Help! Help!” cried the ant."], ["woman", "A dove in a tree saw the ant. She quickly dropped a leaf into the water. The ant climbed onto the leaf and was safe."], ["woman", "A few days later, a hunter wanted to catch the dove. The ant bit the hunter's foot. “Ouch!” he shouted. The dove heard him and flew away."], ["man", "“Thank you, little friend,” said the dove."])),
            tryIt(pick("sd6-c6-l2-try1", "How did the dove help the ant?", ["She dropped a leaf into the water.", "She carried it home.", "She called a hunter."], 0, "Dropped a leaf.")),
            warn("Perhatikan kata kerja lampau tak beraturan dalam cerita: *went, saw, bit, flew, said*."),
          ],
        },
      ],
      checkpoint: [
        listen("sd6-c6-l2-c1", voice("Suddenly, a wave carried the ant away."), "Listen. What happened to the ant?", ["A wave carried it away.", "A bird ate it.", "It fell asleep."], 0, "Suddenly = tiba-tiba."),
        pick("sd6-c6-l2-c2", "How did the ant help the dove?", ["It bit the hunter's foot.", "It gave her food.", "It sang a song."], 0, "The ant bit the hunter's foot."),
        match("sd6-c6-l2-c3", "Match the base verb and the past form.", [["bite", "bit"], ["fly", "flew"], ["see", "saw"], ["say", "said"]], "Past tense dalam cerita!"),
        fill("sd6-c6-l2-c4", "Complete the opening: Once ___ a time, …", "Once", "a time, …", ["upon"], "Once upon a time."),
        trPick("sd6-c6-l2-c5", "“Tiba-tiba” in English is…", ["Suddenly", "Finally", "Usually"], 0, "Tiba-tiba = suddenly."),
        pick("sd6-c6-l2-c6", "What is the moral of “The Ant and the Dove”?", ["One good deed deserves another.", "Ants are stronger than birds.", "Never drink from a river."], 0, "Kebaikan dibalas kebaikan.", { hots: true }),
      ],
    },
    {
      id: "sd6-c6-l3",
      skill: "writing",
      title: "Retell and Write a Fable",
      summary: "Retelling a story in your own words, then writing a new fable.",
      sections: [
        {
          title: "Retell it",
          blocks: [
            pics([["mouse-deer", "Kancil"], ["crocodile", "crocodiles"], ["tree", "fruit trees"]], "Retell the story in your own words."),
            speaking({
              id: "sd6-c6-l3-say",
              title: "Retell the story",
              prompt: "Retell “The Mouse Deer and the Crocodiles” (or another fable you know) in your own words. Include the orientation, the problem, the ending and the moral.",
              image: "mouse-deer",
              prepSeconds: 30,
              seconds: 90,
              tips: ["Once upon a time, there was …", "One day, … But …", "Then, … Finally, …", "The moral of the story is …"],
              models: [{ label: "Example", text: "Once upon a time, there was a clever mouse deer named Kancil. One day, he was hungry and wanted to eat fruit on the other side of the river. But he couldn't swim, and there were many crocodiles in the river. Kancil told them that the King wanted to count them. The crocodiles lined up, and Kancil jumped on their backs. Finally, he reached the other side and ate the fruit. The moral of the story is: use your brain when you have a problem." }],
              rubric: ["I used a story opening.", "I told the events in order with sequence words.", "I used past verbs.", "I said the moral of the story."],
            }),
          ],
        },
        {
          title: "Write your own fable",
          blocks: [
            tip("Pilih dua hewan dengan sifat berbeda (misalnya kura-kura yang sabar dan kelinci yang sombong). Beri mereka masalah, lalu selesaikan dengan pesan moral."),
            writing({
              id: "sd6-c6-l3-write",
              title: "My fable",
              prompt: "Write a short fable with two animal characters. Include an orientation, a complication, a resolution and a moral. Use at least one line of direct speech.",
              image: "turtle",
              minWords: 100,
              maxWords: 220,
              tips: ["Once upon a time, there was a … and a …", "One day, … Suddenly, …", "“…,” said the …", "In the end, …", "Moral: …"],
              models: [{ label: "Example", text: "Once upon a time, there was a proud monkey and a kind turtle. They lived near a big banana tree. One day, the monkey climbed the tree and ate all the bananas. “You are too slow to get any!” he laughed. Suddenly, a strong wind blew, and the monkey fell into the river. He couldn't swim. “Help me!” he cried. The turtle swam quickly and carried the monkey to the bank. The monkey felt ashamed. “I'm sorry. Thank you, my friend,” he said. In the end, they shared the bananas every day.\nMoral: Don't be proud. Be kind to everyone." }],
              rubric: ["My fable has an orientation, a complication and a resolution.", "I used past verbs correctly.", "I used direct speech with quotation marks.", "I wrote a clear moral."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd6-c6-l3-c1", "In a fable, the problem part is called the…", ["complication", "orientation", "title"], 0, "Complication = masalah."),
        arrange("sd6-c6-l3-c2", "Put the words in order.", "In the end they became friends", "Penutup cerita."),
        pick("sd6-c6-l3-c3", "Which sentence uses direct speech correctly?", ["“I'm hungry,” said the tiger.", "I'm hungry said the tiger.", "“I'm hungry, said the tiger."], 0, "Tanda kutip mengapit ucapan."),
        fill("sd6-c6-l3-c4", "Complete: The ___ of the story is: be kind.", "The", "of the story is: be kind.", ["moral"], "Moral = pesan."),
        trPick("sd6-c6-l3-c5", "“Sombong” in English is…", ["proud / arrogant", "kind", "clever"], 0, "Sombong = proud/arrogant."),
        pick("sd6-c6-l3-c6", "A story about a fast rabbit who loses a race to a slow turtle teaches us…", ["Slow and steady wins the race.", "Rabbits are faster.", "Races are boring."], 0, "Kerja tekun mengalahkan sombong.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd6-c6-post",
    title: "Chapter 6 Posttest",
    passPercent: 70,
    passages: [KANCIL],
    questions: [
      pick("sd6-c6-post1", "Long, long ago, a lion ___ in the jungle.", ["lived", "lives", "living", "live"], 0, "Cerita → past."),
      listen("sd6-c6-post2", voice("“I'm sorry,” said the monkey. “I promise I will never be proud again.”"), "Listen. How does the monkey feel?", ["sorry", "proud", "hungry"], 0, "I'm sorry."),
      trPick("sd6-c6-post3", "“Cerdik” in English is…", ["clever", "foolish", "lazy", "angry"], 0, "Cerdik = clever."),
      pick("sd6-c6-post4", "Which word starts the resolution?", ["Finally", "Once upon a time", "One day", "There was"], 0, "Finally → penyelesaian."),
      arrange("sd6-c6-post5", "Put the words in order.", "Once upon a time there was a clever mouse deer", "Kalimat pembuka."),
      pick("sd6-c6-post6", "Why did the crocodiles line up?", ["They believed Kancil's story.", "They wanted to sleep.", "The King came.", "They were tired."], 0, "Baris 5.", { passageId: KANCIL.id }),
      match("sd6-c6-post7", "Match the part and its meaning.", [["Orientation", "who, where, when"], ["Complication", "the problem"], ["Resolution", "how it ends"], ["Moral", "the lesson"]], "Struktur narrative!"),
      fill("sd6-c6-post8", "Complete.", "“Thank you, foolish crocodiles!”", "Kancil.", ["laughed"], "Baris 7.", { passageId: KANCIL.id }),
      pick("sd6-c6-post9", "Kancil's plan worked because…", ["he used the crocodiles' backs as a bridge", "he swam very fast", "the crocodiles were asleep", "the King helped him"], 0, "Punggung buaya menjadi jembatan.", { passageId: KANCIL.id, hots: true }),
      pick("sd6-c6-post10", "Some people say Kancil was not honest. What is a fair opinion?", ["He was clever, but lying is not a good way to solve problems.", "Lying is always good.", "The crocodiles were honest too.", "He should swim next time."], 0, "Menilai tokoh secara kritis.", { passageId: KANCIL.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Story Time",
    questions: [
      live("sd6-c6-live1", "Story opening:", ["Once upon a time", "Dear friend", "Good morning", "First of all"], 0, "owl-read"),
      live("sd6-c6-live2", "Kancil is a…", ["mouse deer", "tiger", "monkey", "turtle"], 0, "mouse-deer"),
      live("sd6-c6-live3", "The problem part:", ["complication", "orientation", "moral", "title"], 0, "question"),
      live("sd6-c6-live4", "fly → …", ["flew", "flied", "flown", "flyed"], 0, "bird"),
      live("sd6-c6-live5", "“Tiba-tiba” =", ["Suddenly", "Finally", "Then", "Once"], 0, "surprised", true),
      live("sd6-c6-live6", "Who did Kancil trick?", ["crocodiles", "tigers", "birds", "cows"], 0, "crocodile"),
      live("sd6-c6-live7", "Slow and steady wins the…", ["race", "food", "river", "tree"], 0, "turtle"),
      live("sd6-c6-live8", "“Help!” ___ the ant.", ["cried", "cry", "crying", "cries"], 0, "water"),
    ],
  },
};
