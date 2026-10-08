import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, pics, say, speaking, table, text, tip, trMatch, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 5 (Fase C). Chapter 3 — Around My House · Chapter 4 — Amazing Animals of Indonesia

const BEDROOM: Passage = {
  id: "sd5-c3-room",
  title: "My Bedroom",
  pic: "bed",
  lines: [
    "My bedroom is small, but I love it.",
    "There is a bed next to the window.",
    "There are two pillows and a teddy bear on the bed.",
    "There is a desk in front of the window. I do my homework there.",
    "There are some books on the shelf above the desk.",
    "There isn't a TV in my room, but there is a small radio.",
    "My cat often sleeps under my bed.",
  ],
};

export const CH3: Level = {
  id: "sd5-ch3",
  title: "Chapter 3 — Around My House",
  description: "Describe rooms and furniture with there is / there are, some and any, and position words like above, below and in front of.",
  targetScore: "Reading · Writing",
  cover: ["house", "bed", "sofa"],
  pretest: {
    id: "sd5-c3-pre",
    title: "Chapter 3 Pretest",
    passPercent: 0,
    questions: [
      pick("sd5-c3-pre1", "There ___ two chairs in the kitchen.", ["are", "is", "am"], 0, "Two chairs (jamak) → there are."),
      listen("sd5-c3-pre2", voice("There is a sofa in the living room."), "Listen. Choose the picture.", ["pic:sofa", "pic:bed", "pic:stove", "pic:bathtub"], 0, "There is a sofa = ada sofa (di ruang keluarga)."),
      trPick("sd5-c3-pre3", "“Rak” (buku) in English is…", ["shelf", "self", "chef", "shell"], 0, "Rak = shelf."),
      pick("sd5-c3-pre4", "We cook in the…", ["kitchen", "bedroom", "garage", "bathroom"], 0, "Memasak di dapur.", { image: "stove" }),
      pick("sd5-c3-pre5", "Is there ___ milk in the fridge?", ["any", "a", "many"], 0, "Pertanyaan + benda tak terhitung → any."),
    ],
  },
  lessons: [
    {
      id: "sd5-c3-l1",
      skill: "vocabulary",
      title: "Rooms and Furniture",
      summary: "Living room, bedroom, kitchen, bathroom, garage; sofa, shelf, cupboard, fridge, mirror, lamp, carpet.",
      sections: [
        {
          title: "Furniture",
          blocks: [
            vocab([
              ["sofa", "sofa", "sofa"],
              ["bed / pillow", "kasur / bantal", "bed"],
              ["shelf", "rak", "open-book"],
              ["cupboard / wardrobe", "lemari", "door"],
              ["fridge", "kulkas", "milk"],
              ["stove", "kompor", "stove"],
              ["mirror", "cermin", "window"],
              ["lamp", "lampu", "night"],
              ["carpet", "karpet", "blocks"],
              ["garage", "garasi", "car"],
            ]),
          ],
        },
        {
          title: "Where do they belong?",
          blocks: [
            table(["Room", "Things"], [["living room", "sofa, TV, carpet"], ["bedroom", "bed, pillow, wardrobe, lamp"], ["kitchen", "stove, fridge, cupboard"], ["bathroom", "mirror, bathtub, toothbrush"], ["garage", "car, motorbike, bicycle"]]),
            pics([["sofa", "living room"], ["bed", "bedroom"], ["stove", "kitchen"], ["bathtub", "bathroom"]]),
            tryIt(pick("sd5-c3-l1-try1", "We keep food cold in the…", ["fridge", "wardrobe", "garage"], 0, "Kulkas = fridge.")),
          ],
        },
      ],
      checkpoint: [
        listen("sd5-c3-l1-c1", voice("Garage."), "Listen. What is usually in this place?", ["pic:car", "pic:bed", "pic:stove"], 0, "Garasi untuk mobil."),
        match("sd5-c3-l1-c2", "Match the thing and the room.", [["fridge", "kitchen"], ["pillow", "bedroom"], ["mirror", "bathroom"], ["sofa", "living room"]], "Tepat!"),
        trPick("sd5-c3-l1-c3", "“Lemari pakaian” in English is…", ["wardrobe", "window", "carpet"], 0, "Lemari pakaian = wardrobe."),
        fill("sd5-c3-l1-c4", "Complete: I look in the ___ when I comb my hair.", "I look in the", "when I comb my hair.", ["mirror"], "Cermin = mirror."),
        pick("sd5-c3-l1-c5", "Which thing does NOT belong in a bathroom?", ["a sofa", "a toothbrush", "a mirror"], 0, "Sofa di ruang tamu."),
        pick("sd5-c3-l1-c6", "It's dark and you want to read. You turn on the…", ["lamp", "fridge", "stove"], 0, "Gelap → nyalakan lampu.", { hots: true }),
      ],
    },
    {
      id: "sd5-c3-l2",
      skill: "listening",
      title: "There Is / There Are, Some / Any",
      summary: "There is a…, There are some…, Is there any…? There isn't any…",
      sections: [
        {
          title: "Is or are?",
          blocks: [
            table(["", "One (singular)", "More than one (plural)"], [["+", "There is a lamp.", "There are some books."], ["−", "There isn't a TV.", "There aren't any chairs."], ["?", "Is there a mirror?", "Are there any plates?"]]),
            text("**some** dipakai di kalimat positif. **any** dipakai di kalimat negatif dan pertanyaan.\n\nUntuk benda yang **tidak bisa dihitung** (water, milk, rice, sugar) pakai **there is**: *There is some milk. Is there any rice?*"),
            warn("Jangan tulis *There is two chairs.* Yang benar: **There are two chairs.**"),
          ],
        },
        {
          title: "In the kitchen",
          blocks: [
            audio("What's in the fridge?", say(["man", "Mom, is there any milk in the fridge?"], ["woman", "Yes, there is some milk. But there aren't any eggs."], ["man", "Are there any apples?"], ["woman", "Yes, there are three apples on the table."])),
            tryIt(pick("sd5-c3-l2-try1", "What is NOT in the fridge?", ["eggs", "milk", "apples"], 0, "There aren't any eggs.")),
          ],
        },
      ],
      checkpoint: [
        listen("sd5-c3-l2-c1", say(["woman", "Is there any rice?"], ["man", "No, there isn't."]), "Listen. Is there any rice?", ["No, there isn't any rice.", "Yes, there is some rice.", "There are three rice."], 0, "No, there isn't."),
        pick("sd5-c3-l2-c2", "There ___ some water in the bottle.", ["is", "are", "am"], 0, "Water tidak terhitung → is."),
        pick("sd5-c3-l2-c3", "Are there ___ chairs in the room?", ["any", "some", "a"], 0, "Pertanyaan → any."),
        fill("sd5-c3-l2-c4", "Complete: There aren't ___ books on the shelf.", "There aren't", "books on the shelf.", ["any"], "Negatif → any."),
        arrange("sd5-c3-l2-c5", "Put the words in order.", "There are some apples on the table", "There are some + benda jamak."),
        pick("sd5-c3-l2-c6", "Which sentence is correct?", ["There are two pillows on the bed.", "There is two pillows on the bed.", "There are a pillow on the bed."], 0, "Two pillows → there are.", { hots: true }),
      ],
    },
    {
      id: "sd5-c3-l3",
      skill: "reading",
      title: "Reading: My Bedroom",
      summary: "Read a room description and describe your own room.",
      passages: [BEDROOM],
      sections: [
        {
          title: "A small bedroom",
          blocks: [
            { type: "passage", passage: BEDROOM },
            table(["Position", "Meaning"], [["above", "di atas (tidak menempel)"], ["below / under", "di bawah"], ["in front of", "di depan"], ["behind", "di belakang"], ["next to", "di sebelah"]]),
            tryIt(pick("sd5-c3-l3-try1", "Where is the bed?", ["next to the window", "under the desk", "in the kitchen"], 0, "Baris 2.", { passageId: BEDROOM.id })),
          ],
        },
        {
          title: "Describe your room",
          blocks: [
            writing({
              id: "sd5-c3-l3-write",
              title: "My room",
              prompt: "Describe your bedroom (or your dream bedroom). Use there is / there are, some / any and three position words.",
              image: "bed",
              minWords: 45,
              maxWords: 120,
              tips: ["My bedroom is …", "There is a … next to …", "There are some … on …", "There isn't a / aren't any …"],
              models: [{ label: "Example", text: "My dream bedroom is big and blue. There is a large bed in the middle of the room. There are some posters on the wall above the bed. There is a desk next to the window and there are many comic books on the shelf. There isn't a TV, but there is a small piano behind the door." }],
              rubric: ["I used **there is** and **there are** correctly.", "I used **some** or **any**.", "I used at least three position words.", "I wrote at least five sentences."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd5-c3-l3-c1", "How many pillows are on the bed?", ["two", "one", "three"], 0, "Baris 3.", { passageId: BEDROOM.id }),
        pick("sd5-c3-l3-c2", "Where are the books?", ["on the shelf above the desk", "under the bed", "on the bed"], 0, "Baris 5.", { passageId: BEDROOM.id }),
        fill("sd5-c3-l3-c3", "Complete.", "There isn't a TV in my room, but there is a small", ".", ["radio"], "Baris 6.", { passageId: BEDROOM.id }),
        pickMany("sd5-c3-l3-c4", "Choose ALL the things in the bedroom.", ["a bed", "a teddy bear", "a desk", "a TV"], [0, 1, 2], "Tidak ada TV.", { passageId: BEDROOM.id }),
        pick("sd5-c3-l3-c5", "Where does the cat sleep?", ["under the bed", "on the desk", "in the kitchen"], 0, "Baris 7.", { passageId: BEDROOM.id }),
        pick("sd5-c3-l3-c6", "Why is the desk in front of the window, probably?", ["There is good light for homework.", "The cat likes it.", "The TV is there."], 0, "Dekat jendela terang untuk belajar.", { passageId: BEDROOM.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd5-c3-post",
    title: "Chapter 3 Posttest",
    passPercent: 70,
    passages: [BEDROOM],
    questions: [
      pick("sd5-c3-post1", "There ___ a fridge in the kitchen.", ["is", "are", "be", "am"], 0, "A fridge → is."),
      listen("sd5-c3-post2", say(["man", "Are there any plates on the table?"], ["woman", "Yes, there are four plates."]), "Listen. How many plates?", ["four", "two", "fourteen", "none"], 0, "Four plates."),
      trPick("sd5-c3-post3", "“Kulkas” in English is…", ["fridge", "stove", "shelf", "lamp"], 0, "Kulkas = fridge."),
      pick("sd5-c3-post4", "There isn't ___ sugar.", ["any", "some", "a", "many"], 0, "Negatif → any."),
      arrange("sd5-c3-post5", "Put the words in order.", "Is there a mirror in the bathroom", "Is there a …?"),
      pick("sd5-c3-post6", "What is on the bed?", ["two pillows and a teddy bear", "a radio", "some books", "a cat"], 0, "Baris 3.", { passageId: BEDROOM.id }),
      trMatch("sd5-c3-post7", "Match.", [["above", "di atas"], ["below", "di bawah"], ["in front of", "di depan"]], "Posisi!"),
      fill("sd5-c3-post8", "Complete: There ___ three cars in the garage.", "There", "three cars in the garage.", ["are"], "Three cars → are."),
      pick("sd5-c3-post9", "“There is some milk.” Which is the negative?", ["There isn't any milk.", "There aren't some milk.", "There is no any milk.", "There isn't some milk."], 0, "Negatif: there isn't any.", { hots: true }),
      pick("sd5-c3-post10", "You want to make a cake. Which question do you ask first?", ["Are there any eggs?", "Is there a sofa?", "Are there any pillows?", "Is there a garage?"], 0, "Kue butuh telur.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Home Tour",
    questions: [
      live("sd5-c3-live1", "There ___ two beds.", ["are", "is", "am", "be"], 0, "bed*2"),
      live("sd5-c3-live2", "There ___ a sofa.", ["is", "are", "am", "be"], 0, "sofa"),
      live("sd5-c3-live3", "Is there ___ water?", ["any", "a", "many", "an"], 0, "water"),
      live("sd5-c3-live4", "We keep food cold in the…", ["fridge", "garage", "wardrobe", "lamp"], 0, "milk"),
      live("sd5-c3-live5", "The car is in the…", ["garage", "kitchen", "bedroom", "bathroom"], 0, "car"),
      live("sd5-c3-live6", "There aren't ___ eggs.", ["any", "some", "a", "an"], 0, "egg"),
      live("sd5-c3-live7", "“Cermin” is…", ["mirror", "window", "lamp", "shelf"], 0, "window", true),
      live("sd5-c3-live8", "Where do we cook?", ["kitchen", "bedroom", "garage", "garden"], 0, "stove"),
    ],
  },
};

const KOMODO: Passage = {
  id: "sd5-c4-komodo",
  title: "The Komodo Dragon",
  pic: "komodo",
  lines: [
    "The Komodo dragon is the biggest lizard in the world.",
    "It lives on a few islands in East Nusa Tenggara, like Komodo and Rinca.",
    "An adult Komodo dragon is about three meters long and very heavy.",
    "It has rough grey skin, a long tail, strong legs and sharp claws.",
    "It has a long yellow tongue. It uses its tongue to smell.",
    "Komodo dragons eat meat. They can run fast for a short time.",
    "They are rare, so Indonesia protects them in Komodo National Park.",
  ],
};

export const CH4: Level = {
  id: "sd5-ch4",
  title: "Chapter 4 — Amazing Animals of Indonesia",
  description: "Describe animals: what they look like, where they live and what they eat, and read a short report about the Komodo dragon.",
  targetScore: "Reading · Writing",
  cover: ["komodo", "orangutan", "tiger"],
  pretest: {
    id: "sd5-c4-pre",
    title: "Chapter 4 Pretest",
    passPercent: 0,
    questions: [
      pick("sd5-c4-pre1", "Which animal is this?", ["an orangutan", "a tiger", "a snake", "a frog"], 0, "Orangutan.", { image: "orangutan" }),
      listen("sd5-c4-pre2", voice("It lives in the sea and has a hard shell."), "Listen. Which animal is it?", ["pic:turtle", "pic:tiger", "pic:monkey", "pic:butterfly"], 0, "Laut + cangkang keras → penyu."),
      trPick("sd5-c4-pre3", "“Hutan” in English is…", ["forest", "farm", "field", "flower"], 0, "Hutan = forest."),
      pick("sd5-c4-pre4", "A tiger eats…", ["meat", "grass", "leaves only", "fruit only"], 0, "Harimau pemakan daging.", { image: "tiger" }),
      pick("sd5-c4-pre5", "“It has wings.” Which animal?", ["a butterfly", "a snake", "a frog", "a turtle"], 0, "Kupu-kupu bersayap.", { image: "butterfly" }),
    ],
  },
  lessons: [
    {
      id: "sd5-c4-l1",
      skill: "vocabulary",
      title: "Animals and Their Bodies",
      summary: "Tiger, orangutan, komodo, turtle, snake, frog, butterfly; fur, scales, shell, wings, tail, claws.",
      sections: [
        {
          title: "Indonesian animals",
          blocks: [
            vocab([
              ["tiger", "harimau", "tiger", "The Sumatran tiger has orange fur with black stripes."],
              ["orangutan", "orangutan", "orangutan", "Orangutans live in the rainforests of Borneo and Sumatra."],
              ["Komodo dragon", "komodo", "komodo", "The Komodo dragon is a huge lizard."],
              ["turtle", "penyu", "turtle", "Turtles swim in the sea."],
              ["snake", "ular", "snake", "Some snakes are dangerous."],
              ["frog", "katak", "frog", "Frogs can jump far."],
              ["butterfly", "kupu-kupu", "butterfly", "Butterflies drink nectar from flowers."],
              ["monkey", "monyet", "monkey", "Monkeys climb trees."],
            ]),
          ],
        },
        {
          title: "Body parts of animals",
          blocks: [
            table(["Word", "Meaning", "Animal"], [["fur", "bulu (rambut)", "tiger, orangutan"], ["scales", "sisik", "snake, Komodo"], ["shell", "cangkang/tempurung", "turtle"], ["wings", "sayap", "butterfly, bird"], ["tail", "ekor", "monkey, Komodo"], ["claws", "cakar", "tiger, Komodo"], ["stripes", "belang", "tiger"]]),
            tryIt(pick("sd5-c4-l1-try1", "A turtle has a hard…", ["shell", "fur", "wing"], 0, "Penyu punya tempurung keras.", { image: "turtle" })),
          ],
        },
      ],
      checkpoint: [
        listen("sd5-c4-l1-c1", voice("It has orange fur and black stripes."), "Listen. Which animal is it?", ["pic:tiger", "pic:frog", "pic:snake"], 0, "Bulu oranye bergaris hitam → harimau."),
        match("sd5-c4-l1-c2", "Match.", [["pic:snake", "scales"], ["pic:turtle", "shell"], ["pic:butterfly", "wings"], ["pic:tiger", "stripes"]], "Bagus!"),
        trPick("sd5-c4-l1-c3", "“Ekor” in English is…", ["tail", "tale", "tall"], 0, "Ekor = tail."),
        fill("sd5-c4-l1-c4", "Complete: A tiger has sharp ___ .", "A tiger has sharp", ".", ["claws", "teeth"], "Cakar tajam = sharp claws."),
        pick("sd5-c4-l1-c5", "Which animal can jump far and lives near water?", ["a frog", "a turtle", "an orangutan"], 0, "Katak."),
        pick("sd5-c4-l1-c6", "Which animal has NO legs?", ["a snake", "a frog", "a tiger"], 0, "Ular tidak berkaki.", { hots: true }),
      ],
    },
    {
      id: "sd5-c4-l2",
      skill: "speaking",
      title: "Where Does It Live? What Does It Eat?",
      summary: "It lives in…, It eats…, It can…; habitats and food.",
      sections: [
        {
          title: "Habitats and food",
          blocks: [
            table(["Animal", "It lives in…", "It eats…"], [["orangutan", "the rainforest", "fruit and leaves"], ["turtle", "the sea", "jellyfish and seaweed"], ["tiger", "the forest", "meat"], ["frog", "ponds and rivers", "insects"], ["butterfly", "gardens and forests", "nectar"]]),
            text("Hewan **pemakan daging** = *meat-eater (carnivore)*. **Pemakan tumbuhan** = *plant-eater (herbivore)*. Pakai **-s** karena subjeknya *it*: *It live**s**, it eat**s**.*"),
          ],
        },
        {
          title: "Animal quiz show",
          blocks: [
            audio("Animal riddle", say(["woman", "This animal lives in the rainforest of Borneo. It has long arms and orange fur. It eats fruit. It is very smart. What is it?"], ["man", "An orangutan!"])),
            tryIt(pick("sd5-c4-l2-try1", "What does the orangutan eat?", ["fruit", "meat", "insects"], 0, "It eats fruit.")),
            speaking({
              id: "sd5-c4-l2-say",
              title: "Animal riddle",
              prompt: "Make a riddle about an Indonesian animal: where it lives, what it looks like, what it eats, what it can do. End with **What is it?**",
              image: "monkey",
              seconds: 50,
              models: [{ label: "Example", text: "This animal lives in the sea. It has a hard shell and four flippers. It eats jellyfish. It lays eggs on the beach. What is it? A turtle!" }],
              rubric: ["I said where it lives.", "I said what it looks like and eats.", "I used **-s** with it (lives, eats)."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd5-c4-l2-c1", voice("It lives in ponds and eats insects."), "Listen. Which animal?", ["pic:frog", "pic:tiger", "pic:orangutan"], 0, "Katak."),
        pick("sd5-c4-l2-c2", "A turtle ___ in the sea.", ["lives", "live", "living"], 0, "It + lives."),
        trPick("sd5-c4-l2-c3", "“Pemakan daging” in English is…", ["meat-eater", "plant-eater", "fruit-eater"], 0, "Pemakan daging = meat-eater / carnivore."),
        arrange("sd5-c4-l2-c4", "Put the words in order.", "What does a tiger eat", "What does + hewan + eat?"),
        fill("sd5-c4-l2-c5", "Complete: Orangutans live in the ___ of Borneo.", "Orangutans live in the", "of Borneo.", ["rainforest", "forest", "rainforests", "forests"], "Hutan hujan = rainforest."),
        pick("sd5-c4-l2-c6", "If people cut down the rainforest, which animal loses its home?", ["the orangutan", "the turtle", "the goldfish"], 0, "Orangutan hidup di hutan hujan.", { hots: true }),
      ],
    },
    {
      id: "sd5-c4-l3",
      skill: "reading",
      title: "Reading: The Komodo Dragon",
      summary: "Read a short animal report and write your own.",
      passages: [KOMODO],
      sections: [
        {
          title: "A report text",
          blocks: [
            { type: "passage", passage: KOMODO },
            audio("Listen and read", say(["man", KOMODO.lines.join(" ")])),
            tip("Teks laporan (report) tentang hewan biasanya berisi: **pengenalan → tempat hidup → ciri fisik → makanan & kebiasaan → fakta menarik**."),
            tryIt(pick("sd5-c4-l3-try1", "Where do Komodo dragons live?", ["on islands in East Nusa Tenggara", "in Java", "in the sea"], 0, "Baris 2.", { passageId: KOMODO.id })),
          ],
        },
        {
          title: "Write an animal report",
          blocks: [
            writing({
              id: "sd5-c4-l3-write",
              title: "My animal report",
              prompt: "Write a short report about an Indonesian animal (for example the orangutan, Sumatran tiger, Javan rhino or sea turtle).",
              image: "orangutan",
              minWords: 50,
              maxWords: 130,
              tips: ["The … is …", "It lives in …", "It has … (body)", "It eats …", "It can … / Interesting fact: …"],
              models: [{ label: "Example", text: "The orangutan is a big ape. It lives in the rainforests of Borneo and Sumatra. It has long arms, short legs and red-orange fur. It eats fruit, leaves and insects. Orangutans are very smart. They make a new nest in the trees every night. Today they are endangered, so we must protect their forests." }],
              rubric: ["I said what the animal is and where it lives.", "I described its body with **has**.", "I said what it eats.", "I gave one interesting fact."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd5-c4-l3-c1", "How long is an adult Komodo dragon?", ["about three meters", "about three centimeters", "about thirty meters"], 0, "Baris 3.", { passageId: KOMODO.id }),
        pickMany("sd5-c4-l3-c2", "Choose ALL the body parts in the text.", ["rough grey skin", "a long tail", "sharp claws", "big wings"], [0, 1, 2], "Baris 4.", { passageId: KOMODO.id }),
        fill("sd5-c4-l3-c3", "Complete.", "It uses its tongue to", ".", ["smell"], "Baris 5.", { passageId: KOMODO.id }),
        pick("sd5-c4-l3-c4", "What do Komodo dragons eat?", ["meat", "leaves", "fruit"], 0, "Baris 6.", { passageId: KOMODO.id }),
        pick("sd5-c4-l3-c5", "Why does Indonesia protect Komodo dragons?", ["They are rare.", "They are small.", "They are pets."], 0, "Baris 7: They are rare.", { passageId: KOMODO.id }),
        pick("sd5-c4-l3-c6", "Which title fits the text best?", ["The Biggest Lizard in the World", "My Pet Cat", "How to Cook Meat"], 0, "Teksnya tentang kadal terbesar.", { passageId: KOMODO.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd5-c4-post",
    title: "Chapter 4 Posttest",
    passPercent: 70,
    passages: [KOMODO],
    questions: [
      pick("sd5-c4-post1", "Which animal is this?", ["a Komodo dragon", "a crocodile", "a snake", "a frog"], 0, "Komodo.", { image: "komodo" }),
      listen("sd5-c4-post2", voice("It has colorful wings and drinks nectar from flowers."), "Listen. Which animal?", ["pic:butterfly", "pic:bird", "pic:frog", "pic:snake"], 0, "Kupu-kupu."),
      trPick("sd5-c4-post3", "“Sisik” in English is…", ["scales", "shells", "skins", "stripes"], 0, "Sisik = scales."),
      pick("sd5-c4-post4", "The orangutan ___ fruit.", ["eats", "eat", "eating", "is eat"], 0, "It + eats."),
      arrange("sd5-c4-post5", "Put the words in order.", "Turtles lay their eggs on the beach", "Penyu bertelur di pantai."),
      pick("sd5-c4-post6", "What color is the Komodo dragon's tongue?", ["yellow", "red", "grey", "pink"], 0, "Baris 5.", { passageId: KOMODO.id }),
      match("sd5-c4-post7", "Match the animal and its home.", [["turtle", "the sea"], ["orangutan", "the rainforest"], ["frog", "a pond"]], "Habitat!"),
      fill("sd5-c4-post8", "Complete: The Komodo dragon is the ___ lizard in the world.", "The Komodo dragon is the", "lizard in the world.", ["biggest", "largest"], "Baris 1.", { passageId: KOMODO.id }),
      pick("sd5-c4-post9", "Komodo dragons can run fast “for a short time”. What does this mean?", ["They run fast, but they get tired quickly.", "They run fast all day.", "They cannot run."], 0, "Hanya sebentar.", { passageId: KOMODO.id, hots: true }),
      pick("sd5-c4-post10", "Which is the BEST way to help sea turtles?", ["Don't throw plastic into the sea.", "Keep them as pets.", "Eat their eggs.", "Catch them for fun."], 0, "Sampah plastik membahayakan penyu.", { hots: true, image: "turtle" }),
    ],
  },
  live: {
    title: "Live Quiz — Wild Indonesia",
    questions: [
      live("sd5-c4-live1", "Which animal is it?", ["orangutan", "monkey", "tiger", "frog"], 0, "orangutan"),
      live("sd5-c4-live2", "A turtle has a hard…", ["shell", "fur", "wing", "tail"], 0, "turtle"),
      live("sd5-c4-live3", "The biggest lizard is the…", ["Komodo dragon", "snake", "frog", "tiger"], 0, "komodo"),
      live("sd5-c4-live4", "A tiger has orange fur and black…", ["stripes", "spots", "scales", "wings"], 0, "tiger"),
      live("sd5-c4-live5", "It ___ in the forest.", ["lives", "live", "living", "to live"], 0, "monkey"),
      live("sd5-c4-live6", "Which animal has no legs?", ["snake", "frog", "monkey", "tiger"], 0, "snake"),
      live("sd5-c4-live7", "Butterflies drink…", ["nectar", "milk", "meat", "coffee"], 0, "butterfly"),
      live("sd5-c4-live8", "“Hutan hujan” is…", ["rainforest", "rain field", "wet farm", "forest rain"], 0, "tree", true),
    ],
  },
};
