import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, writing } from "../kit";

// Grade 9 (SMP, Fase D). Chapter 1 — Step by Step (procedure texts) · Chapter 2 — The Natural World (report texts)

const BIOPORE: Passage = {
  id: "smp9-c1-biopore",
  title: "How to Make a Biopore Hole",
  pic: "sprout",
  lines: [
    "Biopore holes help rainwater go into the ground, so they can reduce floods and turn kitchen waste into compost.",
    "Materials: a biopore drill (or a long iron pipe), a PVC pipe about 10 cm wide and 1 metre long, a cover with small holes, and organic waste.",
    "Steps:",
    "1. Choose a place where water often collects after rain, for example near a drain or under a tree.",
    "2. Pour a little water on the soil to make it softer.",
    "3. Drill a vertical hole about 10 cm wide and 100 cm deep. Do not drill near the foundation of a house.",
    "4. Put the PVC pipe into the hole, so the top is a few centimetres above the ground.",
    "5. Fill the hole with organic waste such as leaves, fruit peels and vegetable scraps. Do not put plastic or meat in it.",
    "6. Close the hole with the cover to keep children and animals safe.",
    "7. Add more waste every week. After two or three months, take out the compost and use it for your plants.",
  ],
};

export const CH1: Level = {
  id: "smp9-ch1",
  title: "Chapter 1 — Step by Step",
  description: "Understand and give instructions, read procedure texts for experiments, devices and environmental projects, and write clear procedures with imperatives, sequencers and warnings.",
  targetScore: "Reading · Writing · Listening",
  cover: ["sprout", "smartphone", "target"],
  pretest: {
    id: "smp9-c1-pre",
    title: "Chapter 1 Pretest",
    passPercent: 0,
    questions: [
      pick("smp9-c1-pre1", "What is the goal of a procedure text?", ["to tell how to do or make something", "to entertain with a story", "to describe a person", "to report the news"], 0, "Procedure = langkah-langkah."),
      listen("smp9-c1-pre2", voice("Insert your card, enter your PIN, then choose the amount of money."), "Listen. What do you do after inserting the card?", ["enter your PIN", "choose the amount", "take the money", "take the card"], 0, "Enter your PIN."),
      trPick("smp9-c1-pre3", "“Langkah-langkah” in English is…", ["steps", "stairs", "stamps", "stops"], 0, "Langkah = steps."),
      pick("smp9-c1-pre4", "Which sentence is an imperative?", ["Press the green button.", "She pressed the button.", "The button is green.", "Is the button green?"], 0, "Kalimat perintah diawali kata kerja."),
      pick("smp9-c1-pre5", "“Make sure the lid is closed tightly.” This is…", ["a warning or check", "a material", "a goal", "a result"], 0, "Make sure = pastikan."),
    ],
  },
  lessons: [
    {
      id: "smp9-c1-l1",
      skill: "structure",
      title: "Instructions and Sequencers",
      summary: "Imperatives, negative imperatives, sequencing words, adverbs of manner and warnings.",
      sections: [
        {
          title: "The language of procedures",
          blocks: [
            table(["Feature", "Examples"], [["Imperative verbs", "Cut, mix, press, insert, connect, drill, pour"], ["Negative imperatives", "Don't touch… / Do not open…"], ["Sequencers", "First, Second, Next, Then, After that, Once…, When…, Finally"], ["Adverbs of manner", "slowly, carefully, gently, firmly, evenly"], ["Warnings and checks", "Be careful… / Make sure… / Never… / Always…"], ["Time and quantity", "for 5 minutes, until golden, 200 ml, 2 tablespoons"]]),
            text("**Once** dan **When** juga bisa menjadi penanda urutan: *Once the water boils, add the noodles.* (Begitu air mendidih, masukkan mi.)"),
          ],
        },
        {
          title: "Using a device",
          blocks: [
            audio("How to use the school's projector", say(["man", "First, connect the HDMI cable to your laptop and to the projector."], ["man", "Then, press the power button on the projector and wait until the light turns blue."], ["man", "Next, press the Windows key and P on your laptop, and choose Duplicate."], ["man", "When you finish, turn off the projector first. Don't unplug it immediately. Wait for the fan to stop, because the lamp is still hot."])),
            tryIt(pick("smp9-c1-l1-try1", "Why shouldn't you unplug the projector immediately?", ["The lamp is still hot and needs to cool down.", "It will lose your files.", "It is too heavy."], 0, "Lampu masih panas.")),
            repeat(["Connect the cable carefully.", "Once the light turns blue, open your file.", "Make sure the volume is not too loud.", "Never look directly into the lamp."]),
          ],
        },
      ],
      checkpoint: [
        listen("smp9-c1-l1-c1", voice("Once the water boils, add the noodles and cook for three minutes."), "Listen. When should you add the noodles?", ["when the water boils", "before you heat the water", "after three minutes"], 0, "Once the water boils."),
        pick("smp9-c1-l1-c2", "Stir the paint ___ so it doesn't splash.", ["gently", "gentle", "gentleness"], 0, "Adverb of manner."),
        match("smp9-c1-l1-c3", "Match the instruction and its function.", [["First, …", "sequencer"], ["Don't touch the wire.", "warning"], ["2 tablespoons of sugar", "quantity"], ["Mix well.", "imperative"]], "Fitur procedure."),
        fill("smp9-c1-l1-c4", "Complete: ___ sure the power is off before you clean the fan.", "", "sure the power is off before you clean the fan.", ["Make", "make"], "Make sure = pastikan."),
        trPick("smp9-c1-l1-c5", "“Tekan tombolnya dengan kuat.” in English is…", ["Press the button firmly.", "Press firmly the button strong.", "The button press firm."], 0, "Firmly = dengan kuat."),
        pick("smp9-c1-l1-c6", "Which order is logical for charging a phone?", ["Plug in the charger → connect the phone → wait until 100% → unplug", "Unplug → wait → connect → plug in", "Wait → unplug → connect → plug in"], 0, "Urutan yang logis.", { hots: true }),
      ],
    },
    {
      id: "smp9-c1-l2",
      skill: "reading",
      title: "Reading: How to Make a Biopore Hole",
      summary: "Read an environmental procedure text and analyse its structure.",
      passages: [BIOPORE],
      sections: [
        {
          title: "A procedure for the environment",
          blocks: [
            { type: "passage", passage: BIOPORE },
            audio("Listen and read", say(["woman", BIOPORE.lines.join(" ")])),
            vocab([["drill", "bor / mengebor", "knife"], ["vertical", "tegak lurus", "tree"], ["organic waste", "sampah organik", "leaf"], ["compost", "pupuk kompos", "sprout"]], "Words from the text"),
          ],
        },
        {
          title: "Structure",
          blocks: [
            table(["Part", "Function", "In the text"], [["Goal", "tujuan/manfaat", "line 1"], ["Materials", "alat dan bahan", "line 2"], ["Steps", "langkah berurutan", "lines 4–10"]]),
            tip("Procedure yang baik menjelaskan **mengapa** suatu langkah penting (*to keep children safe*) dan memberi **peringatan** (*Do not drill near the foundation*)."),
            tryIt(pick("smp9-c1-l2-try1", "How deep should the hole be?", ["about 100 cm", "about 10 cm", "about 2 metres"], 0, "Baris 6.", { passageId: BIOPORE.id })),
          ],
        },
      ],
      checkpoint: [
        pick("smp9-c1-l2-c1", "What are the TWO benefits of biopore holes?", ["reducing floods and making compost", "making water hot and clean", "growing fish and rice"], 0, "Baris 1.", { passageId: BIOPORE.id }),
        pick("smp9-c1-l2-c2", "Why do you pour water on the soil first?", ["to make it softer", "to clean the drill", "to water the plants"], 0, "Baris 5.", { passageId: BIOPORE.id }),
        fill("smp9-c1-l2-c3", "Complete.", "Close the hole with the", "to keep children and animals safe.", ["cover"], "Baris 9.", { passageId: BIOPORE.id }),
        pickMany("smp9-c1-l2-c4", "Choose ALL the things you can put in the hole.", ["leaves", "fruit peels", "vegetable scraps", "plastic"], [0, 1, 2], "Baris 8.", { passageId: BIOPORE.id }),
        pick("smp9-c1-l2-c5", "Why shouldn't you drill near the foundation of a house?", ["It could damage the building.", "The soil is too soft.", "The compost will smell."], 0, "Bisa merusak fondasi.", { passageId: BIOPORE.id, hots: true }),
        pick("smp9-c1-l2-c6", "Your school yard floods every rainy season. How can this text help?", ["Students can make biopore holes where water collects.", "Students can drill holes in the classroom.", "Students can put plastic in the drains."], 0, "Penerapan langsung.", { passageId: BIOPORE.id, hots: true }),
      ],
    },
    {
      id: "smp9-c1-l3",
      skill: "writing",
      title: "Write and Present a Procedure",
      summary: "Writing a procedure for a science experiment and explaining it orally.",
      sections: [
        {
          title: "A simple experiment",
          blocks: [
            pics([["water", "a glass of water"], ["lemon", "lemon juice"], ["salt", "baking soda"], ["spoon", "a spoon"]], "The fizzy volcano experiment"),
            examples([{ right: "Goal: How to Make a Fizzy Lemon Volcano" }, { right: "Materials: 2 lemons, 1 tablespoon of baking soda, a few drops of food colouring, a little dish soap, a plate, a knife." }, { right: "Steps: First, cut a lemon in half and squeeze it a little. Then, add food colouring and a drop of dish soap on top. Next, sprinkle baking soda on the lemon and press it gently with a spoon. Finally, watch the bubbles! Be careful not to touch your eyes with lemon juice." }], "Model procedure"),
            text("Reaksi ini terjadi karena **asam** (lemon) bertemu **basa** (baking soda) dan menghasilkan gas **karbon dioksida**."),
          ],
        },
        {
          title: "Your turn",
          blocks: [
            writing({
              id: "smp9-c1-l3-write",
              title: "My procedure",
              prompt: "Write a procedure text for ONE of these: a simple science experiment, how to use an app or a device, how to make a traditional snack, or how to do a first-aid action. Include a goal, materials and at least six steps.",
              image: "target",
              minWords: 120,
              maxWords: 230,
              tips: ["Title / goal: How to …", "Materials / Ingredients / Tools: …", "Steps: First, … Then, … Once …, … Finally, …", "Warnings: Be careful … / Make sure … / Don't …"],
              models: [{ label: "Example", text: "How to Treat a Small Burn\nMaterials: cool running water, a clean cloth or sterile gauze, and burn gel (optional).\nSteps:\n1. First, stay calm and move away from the source of heat.\n2. Hold the burned area under cool (not icy) running water for 10 to 20 minutes. This reduces pain and swelling.\n3. Gently remove rings or watches near the burn before it swells.\n4. Do not put toothpaste, butter or soy sauce on the burn. They can cause infection.\n5. Cover the burn loosely with a clean cloth or sterile gauze.\n6. If the burn is bigger than your palm or has blisters, go to a clinic immediately.\nMake sure an adult knows what happened." }],
              rubric: ["My text has a goal, materials and steps.", "Every step starts with an imperative or a sequencer.", "I used at least two adverbs of manner or quantities.", "I included at least one warning.", "The steps are in a logical order."],
            }),
            speaking({
              id: "smp9-c1-l3-say",
              title: "Demonstrate it",
              prompt: "Explain your procedure to the class as if you are making a short tutorial video. Speak clearly and use sequencers.",
              image: "video-app",
              prepSeconds: 45,
              seconds: 90,
              tips: ["Hi everyone! Today I'm going to show you how to …", "You'll need …", "First, … Once …, … Then, …", "And that's it! Don't forget to …"],
              models: [{ label: "Example", text: "Hi everyone! Today I'm going to show you how to make a fizzy lemon volcano. You'll need two lemons, some baking soda, food colouring and a little dish soap. First, cut a lemon in half and squeeze it gently. Then, add a few drops of food colouring and a little dish soap. Next, sprinkle a spoon of baking soda on top and press it with a spoon. Look at that! Bubbles everywhere! That's because the acid in the lemon reacts with the baking soda. And that's it! Don't forget to wash your hands afterwards." }],
              rubric: ["I introduced the goal.", "I listed the materials.", "I used at least four sequencers.", "I spoke clearly with a friendly tone."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("smp9-c1-l3-c1", "In the volcano experiment, what makes the bubbles?", ["the reaction between lemon acid and baking soda", "the dish soap only", "the food colouring"], 0, "Asam + basa → CO₂."),
        pick("smp9-c1-l3-c2", "For a small burn, which action is WRONG?", ["putting toothpaste on it", "holding it under cool water", "covering it with a clean cloth"], 0, "Jangan pakai pasta gigi."),
        arrange("smp9-c1-l3-c3", "Put the words in order.", "Make sure the water is not too hot", "Make sure + klausa."),
        fill("smp9-c1-l3-c4", "Complete: Hold the burn under cool water ___ 10 to 20 minutes.", "Hold the burn under cool water", "10 to 20 minutes.", ["for"], "For + durasi."),
        trPick("smp9-c1-l3-c5", "“Taburkan sedikit garam.” in English is…", ["Sprinkle a little salt.", "Sprinkle a few salt.", "Spread many salts."], 0, "A little + uncountable."),
        pick("smp9-c1-l3-c6", "Why do good procedures often explain the reason for a step?", ["so readers understand and don't skip important steps", "to make the text longer", "because readers like stories"], 0, "Alasan membuat pembaca paham.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp9-c1-post",
    title: "Chapter 1 Posttest",
    passPercent: 70,
    passages: [BIOPORE],
    questions: [
      pick("smp9-c1-post1", "___ the eggs until they are fluffy.", ["Beat", "Beats", "Beating", "Beaten"], 0, "Imperative = kata kerja dasar."),
      listen("smp9-c1-post2", voice("Don't open the oven door during the first twenty minutes, or the cake will sink."), "Listen. What will happen if you open the oven too early?", ["The cake will sink.", "The oven will break.", "The cake will burn.", "Nothing will happen."], 0, "The cake will sink."),
      trPick("smp9-c1-post3", "“Pastikan” in English is…", ["make sure", "make up", "take sure", "be sure of it"], 0, "Make sure."),
      pick("smp9-c1-post4", "Which word does NOT show sequence?", ["carefully", "then", "after that", "finally"], 0, "Carefully = adverb of manner."),
      arrange("smp9-c1-post5", "Put the words in order.", "Once the light turns green press start", "Once = begitu."),
      pick("smp9-c1-post6", "When can you take out the compost?", ["after two or three months", "after one day", "after one year", "immediately"], 0, "Baris 10.", { passageId: BIOPORE.id }),
      match("smp9-c1-post7", "Match the part of the text and the line.", [["Goal", "line 1"], ["Materials", "line 2"], ["Last step", "line 10"]], "Struktur."),
      fill("smp9-c1-post8", "Complete.", "Choose a place where water often", "after rain.", ["collects"], "Baris 4.", { passageId: BIOPORE.id }),
      pick("smp9-c1-post9", "Why should you NOT put meat in the biopore hole?", ["It can smell bad and attract animals.", "Meat is too expensive.", "Meat makes the soil hard.", "The text says to put meat in it."], 0, "Daging membusuk dan mengundang hewan.", { passageId: BIOPORE.id, hots: true }),
      pick("smp9-c1-post10", "Someone skipped step 4. What problem might happen?", ["The hole may collapse and close.", "The compost will be ready faster.", "Water will not be needed.", "Nothing at all."], 0, "Pipa menjaga lubang tidak runtuh.", { passageId: BIOPORE.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Step by Step",
    questions: [
      live("smp9-c1-live1", "Procedure starts with the…", ["goal", "ending", "climax", "news"], 0, "target"),
      live("smp9-c1-live2", "Last step word:", ["Finally", "First", "Next", "Once"], 0, "trophy"),
      live("smp9-c1-live3", "Stir ___", ["gently", "gentle", "gentler", "gentlest"], 0, "spoon"),
      live("smp9-c1-live4", "“Pastikan” =", ["Make sure", "Take care", "Make up", "Be quick"], 0, "thumbs-up", true),
      live("smp9-c1-live5", "Biopore holes reduce…", ["floods", "rainbows", "noise", "sunlight"], 0, "rain"),
      live("smp9-c1-live6", "Imperative:", ["Press the button.", "She presses it.", "It is pressed.", "Pressing it."], 0, "smartphone"),
      live("smp9-c1-live7", "Lemon + baking soda =", ["bubbles", "ice", "fire", "smoke"], 0, "lemon"),
      live("smp9-c1-live8", "Burn first aid:", ["cool running water", "toothpaste", "soy sauce", "butter"], 0, "tap"),
    ],
  },
};

const BAMBOO: Passage = {
  id: "smp9-c2-bamboo",
  title: "Bamboo",
  pic: "tree",
  lines: [
    "Bamboo is a giant grass that grows in tropical and subtropical regions. There are more than 1,400 species of bamboo in the world, and about 160 of them grow in Indonesia.",
    "Bamboo is one of the fastest-growing plants on Earth. Some species can grow almost one metre in a single day.",
    "A bamboo plant has a hollow stem, which is called a culm. The culm is divided into sections by joints, which are called nodes.",
    "Unlike trees, bamboo does not need to be replanted after it is cut. New shoots grow from the roots, which stay alive underground.",
    "Bamboo is very strong. Some types are as strong as steel when they are pulled, but they are much lighter.",
    "People have used bamboo for thousands of years. It is used to build houses, bridges and furniture, and to make traditional instruments such as the angklung.",
    "Young bamboo shoots, which are called rebung, can also be cooked and eaten.",
    "Bamboo also protects the environment. Its roots hold the soil together, which helps prevent landslides along rivers.",
  ],
};

export const CH2: Level = {
  id: "smp9-ch2",
  title: "Chapter 2 — The Natural World",
  description: "Read and write factual report texts about plants, animals and natural phenomena, using general classification, technical vocabulary, the simple present and relative clauses with who, which and that.",
  targetScore: "Reading · Structure · Writing",
  cover: ["tree", "earth", "butterfly"],
  pretest: {
    id: "smp9-c2-pre",
    title: "Chapter 2 Pretest",
    passPercent: 0,
    questions: [
      pick("smp9-c2-pre1", "A report text describes…", ["things in general, based on facts", "one person's experience", "how to make something", "an imaginary story"], 0, "Report = informasi umum faktual."),
      listen("smp9-c2-pre2", voice("Butterflies are insects which have four wings and six legs."), "Listen. How many legs do butterflies have?", ["six", "four", "eight", "two"], 0, "Six legs."),
      trPick("smp9-c2-pre3", "“Spesies” in English is…", ["species", "special", "spices", "spaces"], 0, "Species (tunggal dan jamak sama)."),
      pick("smp9-c2-pre4", "A teacher is a person ___ teaches students.", ["who", "which", "where", "when"], 0, "Orang → who."),
      pick("smp9-c2-pre5", "Which tense is mostly used in a report text?", ["simple present", "simple past", "past continuous", "future"], 0, "Fakta umum → simple present."),
    ],
  },
  lessons: [
    {
      id: "smp9-c2-l1",
      skill: "reading",
      title: "Reading: Bamboo",
      summary: "The structure and language of a report text.",
      passages: [BAMBOO],
      sections: [
        {
          title: "A report text",
          blocks: [
            { type: "passage", passage: BAMBOO },
            audio("Listen and read", say(["man", BAMBOO.lines.join(" ")])),
            vocab([["species", "spesies", "leaf"], ["hollow", "berongga", "tree"], ["shoot", "tunas", "sprout"], ["landslide", "tanah longsor", "mountain"]], "Words from the text"),
          ],
        },
        {
          title: "Report vs. descriptive",
          blocks: [
            table(["Report text", "Descriptive text"], [["describes things in general (bamboo, tigers, volcanoes)", "describes one specific thing (my cat, Borobudur)"], ["General classification → Description", "Identification → Description"], ["scientific / technical words", "personal impressions"], ["simple present, mostly facts", "simple present, may include opinions"]]),
            table(["Part", "In the text"], [["General classification", "line 1: Bamboo is a giant grass…"], ["Description: growth", "lines 2, 4"], ["Description: parts", "line 3"], ["Description: strength and uses", "lines 5–7"], ["Description: environment", "line 8"]]),
            tryIt(pick("smp9-c2-l1-try1", "How many bamboo species grow in Indonesia?", ["about 160", "about 1,400", "about 16"], 0, "Baris 1.", { passageId: BAMBOO.id })),
          ],
        },
      ],
      checkpoint: [
        pick("smp9-c2-l1-c1", "How fast can some bamboo species grow?", ["almost one metre in a day", "one metre in a year", "one centimetre a month"], 0, "Baris 2.", { passageId: BAMBOO.id }),
        pick("smp9-c2-l1-c2", "What is a culm?", ["the hollow stem of bamboo", "a bamboo root", "a bamboo leaf"], 0, "Baris 3.", { passageId: BAMBOO.id }),
        fill("smp9-c2-l1-c3", "Complete.", "Young bamboo shoots, which are called", ", can also be cooked and eaten.", ["rebung"], "Baris 7.", { passageId: BAMBOO.id }),
        pickMany("smp9-c2-l1-c4", "Choose ALL the uses of bamboo mentioned.", ["houses", "bridges", "angklung", "car engines"], [0, 1, 2], "Baris 6.", { passageId: BAMBOO.id }),
        pick("smp9-c2-l1-c5", "Why doesn't bamboo need to be replanted after cutting?", ["New shoots grow from roots that stay alive.", "It grows from seeds in the air.", "It never dies."], 0, "Baris 4.", { passageId: BAMBOO.id, hots: true }),
        pick("smp9-c2-l1-c6", "Based on the text, why could bamboo be a good material for the future?", ["It grows fast, is strong and protects the soil.", "It is expensive and rare.", "It grows only in Europe."], 0, "Menyimpulkan dari baris 2, 4, 5, 8.", { passageId: BAMBOO.id, hots: true }),
      ],
    },
    {
      id: "smp9-c2-l2",
      skill: "structure",
      title: "Relative Clauses",
      summary: "Adding information with who, which, that, whose and where.",
      sections: [
        {
          title: "Defining relative clauses",
          blocks: [
            table(["Pronoun", "For", "Example"], [["who", "people", "A botanist is a scientist who studies plants."], ["which / that", "things, animals", "Bamboo is a plant which/that grows very fast."], ["whose", "possession", "Komodo dragons are lizards whose saliva has dangerous bacteria."], ["where", "places", "A rainforest is a place where it rains almost every day."]]),
            text("Relative clause membuat definisi lebih padat: *Mangroves are trees. They grow in salty water.* → *Mangroves are trees **which grow in salty water**.*"),
          ],
        },
        {
          title: "Extra information (non-defining)",
          blocks: [
            text("Jika informasinya **tambahan** (bukan untuk menentukan benda mana), pakai **koma** dan **who/which** (bukan *that*): *The Komodo dragon, **which lives only in Indonesia**, is the largest lizard.*"),
            examples([{ wrong: "The angklung, that comes from West Java, is made of bamboo.", right: "The angklung, which comes from West Java, is made of bamboo." }, { wrong: "A volcanologist is a scientist which studies volcanoes.", right: "A volcanologist is a scientist who studies volcanoes." }]),
            repeat(["A pollinator is an animal which carries pollen.", "Mount Merapi, which is in Central Java, is very active.", "This is the forest where orangutans live."]),
            tryIt(pick("smp9-c2-l2-try1", "Bees are insects ___ make honey.", ["which", "who", "where"], 0, "Hewan → which/that.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp9-c2-l2-c1", voice("A herbivore is an animal which only eats plants."), "Listen. What is a herbivore?", ["an animal which only eats plants", "a person who sells herbs", "a place where herbs grow"], 0, "Which only eats plants."),
        pick("smp9-c2-l2-c2", "A marine biologist is a scientist ___ studies sea life.", ["who", "which", "where"], 0, "Orang → who."),
        pick("smp9-c2-l2-c3", "A desert is a place ___ it rarely rains.", ["where", "which", "who"], 0, "Tempat → where."),
        fill("smp9-c2-l2-c4", "Complete: Penguins are birds ___ cannot fly.", "Penguins are birds", "cannot fly.", ["which", "that"], "Which/that."),
        trPick("smp9-c2-l2-c5", "“Seorang petani yang sawahnya kebanjiran” in English is…", ["a farmer whose rice field is flooded", "a farmer who rice field is flooded", "a farmer which field flooded"], 0, "Whose = yang …-nya."),
        pick("smp9-c2-l2-c6", "Combine: “Lake Toba is in North Sumatra. It is the largest volcanic lake in the world.”", ["Lake Toba, which is in North Sumatra, is the largest volcanic lake in the world.", "Lake Toba who is in North Sumatra is the largest volcanic lake.", "Lake Toba, that is in North Sumatra, is the largest volcanic lake."], 0, "Non-defining → koma + which.", { hots: true }),
      ],
    },
    {
      id: "smp9-c2-l3",
      skill: "writing",
      title: "Write a Report Text",
      summary: "Researching and writing a report about an animal, a plant or a natural phenomenon.",
      sections: [
        {
          title: "Natural phenomena",
          blocks: [
            pics([["rain", "rain"], ["rainbow", "rainbows"], ["mountain", "volcanoes"], ["windy", "storms"]]),
            audio("A short science report", say(["woman", "A rainbow is an optical phenomenon which appears in the sky when sunlight and rain combine."], ["woman", "It happens when sunlight enters raindrops. The light bends, reflects inside the drop, and splits into seven colours."], ["woman", "The colours are red, orange, yellow, green, blue, indigo and violet. You can only see a rainbow when the sun is behind you."])),
            tryIt(pick("smp9-c2-l3-try1", "Where must the sun be when you see a rainbow?", ["behind you", "in front of you", "under the clouds"], 0, "The sun is behind you.")),
          ],
        },
        {
          title: "Your report",
          blocks: [
            writing({
              id: "smp9-c2-l3-write",
              title: "A report text",
              prompt: "Write a report text about an animal, a plant or a natural phenomenon (e.g. mangroves, coral reefs, bees, volcanoes, thunderstorms). Start with a general classification and give at least three paragraphs of description. Use at least three relative clauses.",
              image: "butterfly",
              minWords: 150,
              maxWords: 280,
              tips: ["General classification: … are … which …", "Description 1 (appearance / parts): …", "Description 2 (habitat / how it happens): …", "Description 3 (behaviour / uses / importance): …"],
              models: [{ label: "Example", text: "Mangroves\nMangroves are trees and shrubs which grow in salty water along tropical coastlines. Indonesia has the largest area of mangrove forests in the world.\nMangroves have special roots which stick out of the mud. These roots help the trees breathe, because the mud has very little oxygen. Some mangroves can also remove salt from the water through their leaves.\nMangrove forests are home to many animals, such as crabs, mudskippers, fish and birds. Young fish, which are still small and weak, hide among the roots until they are big enough to swim to the open sea.\nMangroves are very important for people who live near the coast. Their roots protect the land from big waves, storms and even tsunamis. They also store more carbon than most rainforests, so they help slow down climate change. Sadly, many mangrove forests have been cut down to make fish and shrimp ponds." }],
              rubric: ["I started with a general classification.", "I wrote at least three descriptive paragraphs.", "I used the simple present and factual language.", "I used at least three relative clauses correctly.", "I used some technical vocabulary."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("smp9-c2-l3-c1", "How many colours are there in a rainbow?", ["seven", "five", "nine"], 0, "Tujuh warna."),
        pick("smp9-c2-l3-c2", "Why do mangrove roots stick out of the mud?", ["to help the trees breathe", "to catch fish", "to look beautiful"], 0, "Lumpur minim oksigen."),
        arrange("smp9-c2-l3-c3", "Put the words in order.", "Coral reefs are animals which live in colonies", "Relative clause dengan which."),
        fill("smp9-c2-l3-c4", "Complete: Indonesia has the ___ area of mangrove forests in the world.", "Indonesia has the", "area of mangrove forests in the world.", ["largest", "biggest"], "Superlatif."),
        trPick("smp9-c2-l3-c5", "“Fenomena alam” in English is…", ["natural phenomenon", "nature phenomenal", "natural phone"], 0, "Natural phenomenon."),
        pick("smp9-c2-l3-c6", "Which sentence would NOT belong in a report text about bees?", ["My little brother is scared of bees.", "Bees are insects which live in colonies.", "Bees collect nectar from flowers."], 0, "Pengalaman pribadi bukan untuk report.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp9-c2-post",
    title: "Chapter 2 Posttest",
    passPercent: 70,
    passages: [BAMBOO],
    questions: [
      pick("smp9-c2-post1", "Volcanoes are mountains ___ can erupt.", ["which", "who", "where", "whose"], 0, "Benda → which."),
      listen("smp9-c2-post2", voice("Coral reefs, which cover less than one percent of the ocean floor, are home to about a quarter of all sea species."), "Listen. How much of the ocean floor do coral reefs cover?", ["less than one percent", "about a quarter", "half", "ten percent"], 0, "Less than one percent."),
      trPick("smp9-c2-post3", "“Tanah longsor” in English is…", ["landslide", "landfall", "earthquake", "ground slip way"], 0, "Landslide."),
      pick("smp9-c2-post4", "Which is the general classification in a report about sharks?", ["Sharks are fish which have skeletons made of cartilage.", "I saw a shark last year.", "Sharks are scary.", "Don't swim with sharks."], 0, "Klasifikasi umum."),
      arrange("smp9-c2-post5", "Put the words in order.", "A rainforest is a place where it rains a lot", "Where untuk tempat."),
      pick("smp9-c2-post6", "What is a node?", ["a joint that divides the bamboo stem", "a bamboo leaf", "a young shoot", "a root"], 0, "Baris 3.", { passageId: BAMBOO.id }),
      match("smp9-c2-post7", "Match the relative pronoun and its use.", [["who", "people"], ["which", "things and animals"], ["where", "places"], ["whose", "possession"]], "Relative pronouns."),
      fill("smp9-c2-post8", "Complete.", "Some types are as strong as", "when they are pulled.", ["steel"], "Baris 5.", { passageId: BAMBOO.id }),
      pick("smp9-c2-post9", "Which is the main purpose of the text?", ["to give general information about bamboo", "to tell a story about a bamboo farmer", "to sell bamboo furniture", "to explain how to play the angklung"], 0, "Tujuan report text.", { passageId: BAMBOO.id, hots: true }),
      pick("smp9-c2-post10", "A village by a river often has landslides. Based on the text, what could help?", ["planting bamboo along the river", "cutting all the trees", "building a bamboo house on the river", "eating rebung"], 0, "Akar bambu menahan tanah (baris 8).", { passageId: BAMBOO.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Nature Facts",
    questions: [
      live("smp9-c2-live1", "Bamboo is a giant…", ["grass", "tree", "flower", "cactus"], 0, "leaf"),
      live("smp9-c2-live2", "A scientist ___ studies stars", ["who", "which", "where", "whose"], 0, "question"),
      live("smp9-c2-live3", "Report text tense:", ["simple present", "simple past", "future", "past perfect"], 0, "report"),
      live("smp9-c2-live4", "“Tunas bambu” =", ["bamboo shoot", "bamboo root", "bamboo stick", "bamboo leaf"], 0, "sprout", true),
      live("smp9-c2-live5", "Rainbow colours:", ["seven", "five", "three", "ten"], 0, "rainbow"),
      live("smp9-c2-live6", "The angklung is made of…", ["bamboo", "metal", "plastic", "glass"], 0, "drum"),
      live("smp9-c2-live7", "A place ___ fish live", ["where", "who", "whose", "what"], 0, "fish"),
      live("smp9-c2-live8", "Insects have ___ legs.", ["six", "four", "eight", "ten"], 0, "butterfly"),
    ],
  },
};
