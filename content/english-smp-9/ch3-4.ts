import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, writing } from "../kit";

// Grade 9 (SMP, Fase D). Chapter 3 — Made in Indonesia (passive voice) · Chapter 4 — Stories from Around the World (past perfect)

const BATIK: Passage = {
  id: "smp9-c3-batik",
  title: "How Batik Tulis Is Made",
  pic: "palette",
  lines: [
    "Batik is a traditional Indonesian fabric. In 2009, it was added by UNESCO to the list of the Intangible Cultural Heritage of Humanity.",
    "Batik tulis, or hand-drawn batik, is made using a special pen called a canting.",
    "First, a design is drawn on white cotton cloth with a pencil.",
    "Then, the lines of the design are traced with hot wax. The wax is put into the canting and applied carefully by hand.",
    "After that, the cloth is dipped into a dye. The parts which are covered with wax are not coloured.",
    "This process is repeated several times for different colours. Some batik is dyed with natural colours from leaves, roots and bark.",
    "Finally, the cloth is boiled to remove the wax, and then it is dried in the shade.",
    "A single piece of batik tulis can take weeks or even months to finish. That is why it is more expensive than printed batik.",
  ],
};

export const CH3: Level = {
  id: "smp9-ch3",
  title: "Chapter 3 — Made in Indonesia",
  description: "Describe how products are made and where they come from with the passive voice (present and past), and explain processes such as batik, coffee and tempe production.",
  targetScore: "Structure · Reading · Speaking",
  cover: ["palette", "coffee", "factory"],
  pretest: {
    id: "smp9-c3-pre",
    title: "Chapter 3 Pretest",
    passPercent: 0,
    questions: [
      pick("smp9-c3-pre1", "Coffee ___ in many parts of Indonesia.", ["is grown", "grows by", "is grow", "grown"], 0, "Pasif: is + V3."),
      listen("smp9-c3-pre2", voice("Borobudur was built in the ninth century."), "Listen. When was Borobudur built?", ["in the ninth century", "in 1900", "last century", "in the nineteenth century"], 0, "Ninth century = abad ke-9."),
      trPick("smp9-c3-pre3", "“Dibuat dengan tangan” in English is…", ["made by hand", "make with hand", "hand making", "made of hand"], 0, "Made by hand."),
      pick("smp9-c3-pre4", "Tempe is made ___ soybeans.", ["from", "by", "in", "at"], 0, "Made from = dibuat dari (bahan berubah)."),
      pick("smp9-c3-pre5", "Which sentence is passive?", ["The letter was written by Kartini.", "Kartini wrote the letter.", "Kartini is writing.", "Kartini writes letters."], 0, "Be + V3."),
    ],
  },
  lessons: [
    {
      id: "smp9-c3-l1",
      skill: "structure",
      title: "The Passive Voice",
      summary: "Present and past passive: is/are/was/were + past participle; by + agent.",
      sections: [
        {
          title: "Active and passive",
          blocks: [
            table(["Active", "Passive"], [["Farmers grow coffee in Toraja.", "Coffee is grown in Toraja (by farmers)."], ["They make tempe from soybeans.", "Tempe is made from soybeans."], ["Mpu Gandring made the keris.", "The keris was made by Mpu Gandring."], ["People built the temple 1,200 years ago.", "The temple was built 1,200 years ago."]]),
            text("Pakai pasif ketika **pelakunya tidak penting, tidak diketahui, atau sudah jelas**, dan ketika kita fokus pada **benda/proses**. Bentuk: **be + past participle (V3)**. Tambahkan **by + pelaku** hanya jika penting."),
          ],
        },
        {
          title: "Forms",
          blocks: [
            table(["Tense", "Positive", "Negative", "Question"], [["Present", "It is made in Jepara.", "It isn't made by machines.", "Is it made by hand?"], ["Present (plural)", "They are exported to Japan.", "They aren't sold here.", "Are they exported?"], ["Past", "It was discovered in 1891.", "It wasn't found until 1891.", "When was it discovered?"], ["Past (plural)", "The temples were restored.", "They weren't damaged.", "Were they restored?"]]),
            examples([{ wrong: "The bridge was build in 2010.", right: "The bridge was built in 2010.", note: "Gunakan V3." }, { wrong: "Rice is grew in Java.", right: "Rice is grown in Java." }, { wrong: "This bag made in Garut.", right: "This bag is made in Garut.", note: "Jangan lupa be." }], "Common mistakes"),
            repeat(["It is made in Indonesia.", "They are exported all over the world.", "It was invented in 1876.", "When was it built?"]),
          ],
        },
      ],
      checkpoint: [
        listen("smp9-c3-l1-c1", voice("These wooden chairs are carved by hand in Jepara."), "Listen. How are the chairs made?", ["carved by hand", "made by machines", "printed in a factory"], 0, "Carved by hand."),
        pick("smp9-c3-l1-c2", "The first Indonesian satellite ___ in 1976.", ["was launched", "is launched", "launched by", "were launched"], 0, "Past passive, tunggal."),
        fill("smp9-c3-l1-c3", "Complete: English ___ (speak) in many countries.", "English", "in many countries.", ["is spoken"], "Is + spoken."),
        match("smp9-c3-l1-c4", "Match the verb and the past participle.", [["build", "built"], ["grow", "grown"], ["write", "written"], ["steal", "stolen"]], "Bentuk past participle (V3)."),
        trPick("smp9-c3-l1-c5", "“Kopi ini diekspor ke Jepang.” in English is…", ["This coffee is exported to Japan.", "This coffee exports to Japan.", "This coffee is export to Japan."], 0, "Is + exported."),
        pick("smp9-c3-l1-c6", "Why is the passive better in “My bike was stolen last night”?", ["We don't know who stole it.", "It is shorter.", "The bike stole something."], 0, "Pelaku tidak diketahui.", { hots: true }),
      ],
    },
    {
      id: "smp9-c3-l2",
      skill: "reading",
      title: "Reading: How Batik Tulis Is Made",
      summary: "Following a process described in the passive.",
      passages: [BATIK],
      sections: [
        {
          title: "Batik tulis",
          blocks: [
            { type: "passage", passage: BATIK },
            audio("Listen and read", say(["woman", BATIK.lines.join(" ")])),
            vocab([["fabric / cloth", "kain", "shirt"], ["wax", "malam/lilin", "lantern"], ["dye", "pewarna / mewarnai", "palette"], ["heritage", "warisan budaya", "museum"]], "Words from the text"),
          ],
        },
        {
          title: "Made from, made of, made in, made by",
          blocks: [
            table(["Phrase", "Meaning", "Example"], [["made of", "dibuat dari (bahan masih terlihat)", "This chair is made of teak wood."], ["made from", "dibuat dari (bahan berubah)", "Tempe is made from soybeans."], ["made in", "dibuat di (tempat)", "These shoes are made in Bandung."], ["made by", "dibuat oleh (pelaku)", "This batik was made by my grandmother."], ["made with", "dibuat dengan (alat/salah satu bahan)", "Batik tulis is made with a canting."]]),
            tryIt(pick("smp9-c3-l2-try1", "What is a canting used for?", ["applying hot wax", "boiling the cloth", "drying the cloth"], 0, "Baris 2 dan 4.", { passageId: BATIK.id })),
          ],
        },
      ],
      checkpoint: [
        pick("smp9-c3-l2-c1", "When was batik recognised by UNESCO?", ["in 2009", "in 1945", "in 2019"], 0, "Baris 1.", { passageId: BATIK.id }),
        pick("smp9-c3-l2-c2", "What is done first?", ["A design is drawn with a pencil.", "The cloth is boiled.", "The cloth is dyed."], 0, "Baris 3.", { passageId: BATIK.id }),
        fill("smp9-c3-l2-c3", "Complete.", "Finally, the cloth is boiled to remove the", ".", ["wax"], "Baris 7.", { passageId: BATIK.id }),
        pickMany("smp9-c3-l2-c4", "Choose ALL the natural sources of colour mentioned.", ["leaves", "roots", "bark", "plastic"], [0, 1, 2], "Baris 6.", { passageId: BATIK.id }),
        pick("smp9-c3-l2-c5", "Why don't the waxed parts get coloured?", ["The wax blocks the dye.", "The dye is too weak.", "They are boiled first."], 0, "Lilin menahan pewarna.", { passageId: BATIK.id, hots: true }),
        pick("smp9-c3-l2-c6", "Why is batik tulis more expensive than printed batik?", ["It takes weeks or months of handwork.", "It uses gold thread.", "It is made in factories."], 0, "Baris 8.", { passageId: BATIK.id, hots: true }),
      ],
    },
    {
      id: "smp9-c3-l3",
      skill: "speaking",
      title: "From Farm to Cup",
      summary: "Explaining a production process and presenting a local product.",
      sections: [
        {
          title: "The coffee process",
          blocks: [
            pics([["leaf", "1. grown"], ["basket", "2. picked"], ["hot", "3. dried"], ["coffee", "4. roasted and brewed"]], "From farm to cup"),
            audio("A coffee farm tour", say(["man", "Welcome to our farm in Gayo, Aceh. Our coffee is grown on the hills, 1,400 metres above sea level."], ["man", "The red coffee cherries are picked by hand when they are ripe. Then, the skin is removed and the beans are washed."], ["man", "After that, the beans are dried in the sun for about two weeks. Then they are sorted, and the best beans are exported to Europe, the USA and Japan."], ["man", "Finally, the beans are roasted. The roasting gives the coffee its colour and aroma."])),
            tryIt(pick("smp9-c3-l3-try1", "How are the coffee cherries picked?", ["by hand", "by machines", "by birds"], 0, "Picked by hand.")),
          ],
        },
        {
          title: "Present a local product",
          blocks: [
            tip("Untuk menjelaskan proses, campurkan **pasif** (fokus pada produk) dengan **sequencers**: *First, the beans are soaked. Then, they are boiled…*"),
            speaking({
              id: "smp9-c3-l3-say",
              title: "Proudly made in Indonesia",
              prompt: "Present a local product from your region (e.g. tempe, kerupuk, songket, gula aren, kopi, tenun, rattan furniture). Explain what it is made from, how it is made (with at least four passive sentences) and where it is sold.",
              image: "souvenir",
              prepSeconds: 60,
              seconds: 90,
              tips: ["Today I'm going to present …, which is made in …", "It is made from …", "First, … is/are … Then, … After that, …", "It is sold in … and exported to …"],
              models: [{ label: "Example", text: "Today I'm going to present tempe, which is made all over Java. Tempe is made from soybeans and a special mould called Rhizopus. First, the soybeans are washed and soaked overnight. Then, the skins are removed and the beans are boiled. After that, the beans are cooled and mixed with the mould. Next, they are wrapped in banana leaves or plastic and left for about two days. The mould grows and joins the beans together. Tempe is sold in every traditional market, and now it is exported to many countries, because it is cheap, healthy and full of protein." }],
              rubric: ["I said what the product is made from.", "I used at least four passive sentences correctly.", "I used sequencers to explain the process.", "I spoke clearly and confidently."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("smp9-c3-l3-c1", voice("The beans are dried in the sun for about two weeks."), "Listen. How long are the beans dried?", ["about two weeks", "about two days", "about two months"], 0, "Two weeks."),
        pick("smp9-c3-l3-c2", "This table is made ___ teak wood. You can see the wood.", ["of", "from", "by"], 0, "Bahan masih terlihat → made of."),
        pick("smp9-c3-l3-c3", "Where is Gayo coffee grown?", ["in Aceh", "in Bali", "in Toraja"], 0, "Gayo, Aceh."),
        arrange("smp9-c3-l3-c4", "Put the words in order.", "The beans are roasted in a big machine", "Pasif present."),
        trPick("smp9-c3-l3-c5", "“Tempe dijual di pasar tradisional.” in English is…", ["Tempe is sold in traditional markets.", "Tempe sells in traditional markets.", "Tempe is sell in traditional markets."], 0, "Is + sold."),
        pick("smp9-c3-l3-c6", "Why does a speaker use the passive to explain how tempe is made?", ["The focus is on the process and product, not the workers.", "The speaker doesn't like workers.", "Passive is always shorter."], 0, "Fokus pada proses.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp9-c3-post",
    title: "Chapter 3 Posttest",
    passPercent: 70,
    passages: [BATIK],
    questions: [
      pick("smp9-c3-post1", "Rice ___ in Java for thousands of years.", ["has been grown", "is grow", "grows by", "was grow"], 0, "Has been grown (pasif present perfect)."),
      listen("smp9-c3-post2", voice("The museum was opened in 1995 and it is visited by thousands of students every year."), "Listen. When was the museum opened?", ["1995", "1959", "2005", "1955"], 0, "Was opened in 1995."),
      trPick("smp9-c3-post3", "“Warisan budaya” in English is…", ["cultural heritage", "culture heritage of", "heritage cultural", "cultural inheritance tax"], 0, "Cultural heritage."),
      pick("smp9-c3-post4", "The telephone ___ by Alexander Graham Bell.", ["was invented", "is invented", "invented", "were invented"], 0, "Past passive."),
      arrange("smp9-c3-post5", "Put the words in order.", "This batik was made by my grandmother", "Was + V3 + by."),
      pick("smp9-c3-post6", "How is the cloth dried?", ["in the shade", "in the sun", "with a fan", "in an oven"], 0, "Baris 7.", { passageId: BATIK.id }),
      match("smp9-c3-post7", "Match.", [["made of", "visible material"], ["made from", "changed material"], ["made in", "place"], ["made by", "person"]], "Made + preposisi."),
      fill("smp9-c3-post8", "Complete: Our classroom ___ (clean) every morning.", "Our classroom", "every morning.", ["is cleaned"], "Is + cleaned."),
      pick("smp9-c3-post9", "Which step is repeated to get more colours?", ["waxing and dyeing", "drawing with a pencil", "boiling", "drying"], 0, "Baris 6.", { passageId: BATIK.id, hots: true }),
      pick("smp9-c3-post10", "Change to active: “The wax is applied by the artist.”", ["The artist applies the wax.", "The artist applied by the wax.", "The wax applies the artist.", "The artist is applied the wax."], 0, "Pelaku menjadi subjek.", { passageId: BATIK.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Made in Indonesia",
    questions: [
      live("smp9-c3-live1", "It ___ made in Jepara.", ["is", "are", "be", "does"], 0, "chair"),
      live("smp9-c3-live2", "build → V3", ["built", "builded", "build", "builted"], 0, "house"),
      live("smp9-c3-live3", "Tempe is made ___ soybeans.", ["from", "by", "in", "at"], 0, "food-stall"),
      live("smp9-c3-live4", "“Kain” =", ["fabric", "fabulous", "factory", "fashion"], 0, "shirt", true),
      live("smp9-c3-live5", "Batik tool:", ["canting", "hammer", "brush only", "scissors"], 0, "palette"),
      live("smp9-c3-live6", "Coffee beans are ___ before brewing.", ["roasted", "frozen", "boiled in oil", "painted"], 0, "coffee"),
      live("smp9-c3-live7", "Passive:", ["It was stolen.", "He stole it.", "They steal.", "Stealing it."], 0, "bag"),
      live("smp9-c3-live8", "UNESCO recognised batik in…", ["2009", "1945", "1999", "2019"], 0, "flag"),
    ],
  },
};

const GIFT: Passage = {
  id: "smp9-c4-gift",
  title: "The Gift (A Story Inspired by O. Henry)",
  pic: "envelope",
  lines: [
    "Della and Jim were a young couple who were very poor, but they loved each other deeply.",
    "It was the day before Christmas, and Della had saved only one dollar and eighty-seven cents for Jim's present.",
    "Della had beautiful long hair, and Jim had a gold watch which had belonged to his father and grandfather.",
    "Della wanted to buy a chain for Jim's watch. So she went to a shop, cut off her long hair and sold it for twenty dollars.",
    "When Jim came home, he stared at her short hair in silence. He had not expected it at all.",
    "Then he gave Della his present: a set of beautiful combs for her long hair. She had wanted those combs for a long time.",
    "Della gave Jim the chain. Jim smiled sadly. He had sold his watch to buy the combs.",
    "Their gifts were now useless, but they had given each other the most valuable thing of all: their love.",
  ],
};

export const CH4: Level = {
  id: "smp9-ch4",
  title: "Chapter 4 — Stories from Around the World",
  description: "Read short stories and fairy tales from different cultures, use the past perfect to show the order of past events, analyse plot and character, and write a story with a twist.",
  targetScore: "Reading · Structure · Writing",
  cover: ["owl-read", "book", "christmas-tree"],
  pretest: {
    id: "smp9-c4-pre",
    title: "Chapter 4 Pretest",
    passPercent: 0,
    questions: [
      pick("smp9-c4-pre1", "When we arrived at the station, the train ___ already left.", ["had", "has", "have", "was"], 0, "Past perfect: had + V3."),
      listen("smp9-c4-pre2", voice("Cinderella had to leave the palace before midnight."), "Listen. When did Cinderella have to leave?", ["before midnight", "at noon", "at sunrise", "after midnight"], 0, "Before midnight."),
      trPick("smp9-c4-pre3", "“Akhir yang tak terduga” in English is…", ["a twist ending", "a happy ending", "a sad beginning", "an open door"], 0, "Twist ending."),
      pick("smp9-c4-pre4", "The main character of a story is also called the…", ["protagonist", "author", "reader", "setting"], 0, "Tokoh utama = protagonist."),
      pick("smp9-c4-pre5", "Where and when a story happens is the…", ["setting", "plot", "moral", "climax"], 0, "Latar = setting."),
    ],
  },
  lessons: [
    {
      id: "smp9-c4-l1",
      skill: "reading",
      title: "Reading: The Gift",
      summary: "A short story with a twist: plot, characters and theme.",
      passages: [GIFT],
      sections: [
        {
          title: "The story",
          blocks: [
            { type: "passage", passage: GIFT },
            audio("Listen to the story", say(["narrator", GIFT.lines.slice(0, 4).join(" ")], ["narrator", GIFT.lines.slice(4).join(" ")])),
            vocab([["couple", "pasangan", "heart"], ["save (money)", "menabung", "money"], ["stare", "menatap", "eye"], ["valuable", "berharga", "trophy"], ["useless", "tidak berguna", "trash"]], "Story words"),
          ],
        },
        {
          title: "Elements of a story",
          blocks: [
            table(["Element", "Meaning", "In “The Gift”"], [["Setting", "tempat dan waktu", "a poor home, the day before Christmas"], ["Characters", "tokoh", "Della and Jim"], ["Conflict", "masalah", "They have no money for gifts."], ["Climax", "puncak", "Jim sees Della's short hair."], ["Twist", "kejutan", "Jim sold his watch to buy combs."], ["Theme", "tema/pesan", "True love means sacrifice."]]),
            tryIt(pick("smp9-c4-l1-try1", "How much money had Della saved?", ["one dollar and eighty-seven cents", "twenty dollars", "eighty-seven dollars"], 0, "Baris 2.", { passageId: GIFT.id })),
          ],
        },
      ],
      checkpoint: [
        pick("smp9-c4-l1-c1", "What did Della sell?", ["her hair", "her watch", "her combs"], 0, "Baris 4.", { passageId: GIFT.id }),
        pick("smp9-c4-l1-c2", "Who had owned the watch before Jim?", ["his father and grandfather", "Della", "a shopkeeper"], 0, "Baris 3.", { passageId: GIFT.id }),
        fill("smp9-c4-l1-c3", "Complete.", "He had sold his", "to buy the combs.", ["watch"], "Baris 7.", { passageId: GIFT.id }),
        pickMany("smp9-c4-l1-c4", "Choose ALL the true statements.", ["Della and Jim were poor.", "Jim bought combs.", "Della bought a chain.", "Jim was angry with Della."], [0, 1, 2], "Jim tidak marah; ia terdiam.", { passageId: GIFT.id }),
        pick("smp9-c4-l1-c5", "Why does Jim smile sadly in line 7?", ["He realises his watch is gone, so the chain is useless.", "He doesn't like the chain.", "He is tired."], 0, "Ironi: rantai tanpa jam.", { passageId: GIFT.id, hots: true }),
        pick("smp9-c4-l1-c6", "What is the theme of the story?", ["Love is more valuable than possessions.", "Always save money.", "Never cut your hair."], 0, "Baris 8.", { passageId: GIFT.id, hots: true }),
      ],
    },
    {
      id: "smp9-c4-l2",
      skill: "structure",
      title: "The Past Perfect",
      summary: "had + past participle for the earlier of two past events; by the time, before, after, already.",
      sections: [
        {
          title: "Two past events",
          blocks: [
            text("Gunakan **past perfect (had + V3)** untuk kejadian yang terjadi **lebih dulu** sebelum kejadian lampau lainnya."),
            table(["Earlier event (past perfect)", "Later event (simple past)"], [["Jim had sold his watch", "before he bought the combs."], ["When I arrived, the film had already started.", "(the film started first)"], ["By the time the police came, the thief had escaped.", "(the thief escaped first)"], ["After she had finished her homework,", "she went to bed."]]),
            examples([{ right: "When I got home, my mother cooked dinner.", note: "Ibu memasak SETELAH saya tiba." }, { right: "When I got home, my mother had cooked dinner.", note: "Makan malam SUDAH siap saat saya tiba." }], "Spot the difference"),
          ],
        },
        {
          title: "Practice",
          blocks: [
            audio("A bad morning", say(["woman", "Why were you late this morning?"], ["man", "Everything went wrong! When I woke up, my alarm hadn't rung because the battery had died."], ["man", "I ran to the bus stop, but the bus had already left. And when I finally got to school, I realised I had left my homework at home!"], ["woman", "Oh no! What a morning!"])),
            tryIt(pick("smp9-c4-l2-try1", "Why didn't the alarm ring?", ["The battery had died.", "He had turned it off.", "He had broken it."], 0, "The battery had died.")),
            repeat(["The bus had already left.", "I had never seen snow before I went to Japan.", "By the time we arrived, the shop had closed."]),
          ],
        },
      ],
      checkpoint: [
        listen("smp9-c4-l2-c1", voice("By the time the firefighters arrived, the neighbours had already put out the fire."), "Listen. Who put out the fire?", ["the neighbours", "the firefighters", "nobody"], 0, "The neighbours had already…"),
        pick("smp9-c4-l2-c2", "She was nervous because she ___ never flown before.", ["had", "has", "was"], 0, "Had + never + V3."),
        fill("smp9-c4-l2-c3", "Complete: After they ___ (eat) dinner, they watched a film.", "After they", "dinner, they watched a film.", ["had eaten"], "Had + eaten."),
        arrange("smp9-c4-l2-c4", "Put the words in order.", "The movie had started before we arrived", "Had + V3 + before."),
        trPick("smp9-c4-l2-c5", "“Saat aku sampai, mereka sudah pergi.” in English is…", ["When I arrived, they had left.", "When I had arrived, they left.", "When I arrive, they have left."], 0, "Mereka pergi lebih dulu."),
        pick("smp9-c4-l2-c6", "“When Jim came home, Della had cut her hair.” Which happened FIRST?", ["Della cut her hair.", "Jim came home.", "Both at the same time."], 0, "Had cut = lebih dulu.", { hots: true }),
      ],
    },
    {
      id: "smp9-c4-l3",
      skill: "writing",
      title: "Tales from Many Lands",
      summary: "Comparing folk tales from different countries and writing a story with a twist.",
      sections: [
        {
          title: "Similar stories, different cultures",
          blocks: [
            table(["Indonesia", "Europe", "What they share"], [["Bawang Merah Bawang Putih", "Cinderella", "a kind girl treated badly by her stepfamily, rewarded in the end"], ["Timun Mas", "Hansel and Gretel", "a child escapes from a giant or a witch using cleverness"], ["Kancil and the crocodiles", "The Tortoise and the Hare", "a small animal beats a bigger one"]]),
            pics([["mouse-deer", "Kancil"], ["turtle", "The Tortoise and the Hare"], ["dress", "Cinderella"], ["cake", "Hansel and Gretel"]]),
            speaking({
              id: "smp9-c4-l3-say",
              title: "Compare two tales",
              prompt: "Choose an Indonesian folk tale and a tale from another country that are similar. Compare the characters, the problem, the ending and the message.",
              image: "owl-read",
              prepSeconds: 60,
              seconds: 90,
              tips: ["Both … and … are about …", "In …, the main character … , while in …", "The endings are different/similar because …", "Both stories teach us that …"],
              models: [{ label: "Example", text: "Both Bawang Putih from Indonesia and Cinderella from Europe are about a kind girl who is treated badly by her stepmother and stepsister. In Bawang Putih, the girl gets help from a magic fish and an old woman, while Cinderella gets help from a fairy godmother. The endings are similar. Both girls are rewarded for their kindness, and the greedy stepsisters are punished. Both stories teach us that kindness and patience will be rewarded in the end." }],
              rubric: ["I named and briefly summarised both tales.", "I compared characters and problems.", "I used words like both, while, similar, different.", "I explained the shared message."],
            }),
          ],
        },
        {
          title: "Write a story with a twist",
          blocks: [
            writing({
              id: "smp9-c4-l3-write",
              title: "A story with a twist",
              prompt: "Write a short story (narrative) with a surprising twist at the end. Include a setting, at least two characters, a conflict, a climax and a resolution. Use the past perfect at least twice.",
              image: "surprised",
              minWords: 180,
              maxWords: 320,
              tips: ["Orientation: setting + characters", "Complication: … but …", "Climax: Suddenly, … / When …, … had already …", "Twist / resolution: … had …", "Ending / theme"],
              models: [{ label: "Example", text: "The Lost Wallet\nIt was a rainy afternoon in Bandung. Rafi, a quiet Grade 9 student, was waiting for an angkot when he saw a brown wallet on the pavement. Inside, there was a lot of money and an ID card with the name “H. Sutrisno”.\nRafi's family was not rich. His mother had told him that morning that they couldn't pay his school trip fee. For a moment, he thought about keeping the money. But then he remembered what his late father had always said: “Honesty is worth more than gold.”\nThe next day, Rafi went to the address on the ID card. An old man opened the door. When Rafi gave him the wallet, the man smiled widely. “I've been waiting for you,” he said.\nRafi was confused. The old man explained that he was the new principal of Rafi's school. He had dropped the wallet on purpose to find an honest student for a new scholarship. Several students had walked past it that day, but only Rafi had picked it up and returned it.\nThe following month, Rafi went on the school trip, and his fees were paid for three years." }],
              rubric: ["My story has orientation, complication, climax and resolution.", "The twist is surprising but makes sense.", "I used the past perfect at least twice correctly.", "I used direct speech and time connectors.", "My story has a clear theme."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("smp9-c4-l3-c1", "Which tale is similar to Cinderella?", ["Bawang Merah Bawang Putih", "Timun Mas", "Malin Kundang"], 0, "Gadis baik dan saudara tiri."),
        pick("smp9-c4-l3-c2", "In the model story, why had the man dropped the wallet?", ["to find an honest student", "by accident", "to test the police"], 0, "He had dropped the wallet on purpose."),
        fill("smp9-c4-l3-c3", "Complete: Several students had walked ___ the wallet, but only Rafi picked it up.", "Several students had walked", "the wallet, but only Rafi picked it up.", ["past"], "Walk past = berjalan melewati."),
        arrange("smp9-c4-l3-c4", "Put the words in order.", "Both stories teach us to be kind", "Both + plural."),
        trPick("smp9-c4-l3-c5", "“Dengan sengaja” in English is…", ["on purpose", "by accident", "in purpose"], 0, "On purpose."),
        pick("smp9-c4-l3-c6", "What makes a twist ending effective?", ["It surprises the reader but fits the earlier clues.", "It has nothing to do with the story.", "It repeats the beginning."], 0, "Kejutan yang masuk akal.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp9-c4-post",
    title: "Chapter 4 Posttest",
    passPercent: 70,
    passages: [GIFT],
    questions: [
      pick("smp9-c4-post1", "When I got to the cinema, my friends ___ the tickets.", ["had already bought", "already buy", "have already bought", "were bought"], 0, "Past perfect."),
      listen("smp9-c4-post2", voice("She couldn't enter the house because she had lost her key."), "Listen. Why couldn't she enter the house?", ["She had lost her key.", "The door was broken.", "Nobody was home.", "It was too dark."], 0, "She had lost her key."),
      trPick("smp9-c4-post3", "“Tokoh utama” in English is…", ["main character", "main actor of film", "character main", "first person"], 0, "Main character / protagonist."),
      pick("smp9-c4-post4", "By the time the guests arrived, we ___ the room.", ["had decorated", "decorate", "have decorated", "were decorate"], 0, "Had + V3."),
      arrange("smp9-c4-post5", "Put the words in order.", "She had never seen the sea before", "Had + never + V3."),
      pick("smp9-c4-post6", "When does the story take place?", ["the day before Christmas", "on New Year's Day", "in the summer", "on Jim's birthday"], 0, "Baris 2.", { passageId: GIFT.id }),
      match("smp9-c4-post7", "Match the story element and the example.", [["setting", "a poor home before Christmas"], ["conflict", "no money for gifts"], ["twist", "Jim had sold his watch"], ["theme", "love means sacrifice"]], "Unsur cerita."),
      fill("smp9-c4-post8", "Complete.", "She cut off her long hair and", "it for twenty dollars.", ["sold"], "Baris 4.", { passageId: GIFT.id }),
      pick("smp9-c4-post9", "What is ironic about the ending?", ["Each gift was for the thing the other person had sold.", "They both bought watches.", "Della got rich.", "Jim had no present."], 0, "Ironi situasional.", { passageId: GIFT.id, hots: true }),
      pick("smp9-c4-post10", "Which word best describes both Della and Jim?", ["selfless", "selfish", "lazy", "dishonest"], 0, "Rela berkorban.", { passageId: GIFT.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Once Upon a Twist",
    questions: [
      live("smp9-c4-live1", "Past perfect =", ["had + V3", "have + V3", "was + V-ing", "did + V1"], 0, "question"),
      live("smp9-c4-live2", "Della sold her…", ["hair", "watch", "combs", "dress"], 0, "dress"),
      live("smp9-c4-live3", "Similar to Cinderella:", ["Bawang Putih", "Timun Mas", "Kancil", "Sangkuriang"], 0, "owl-read"),
      live("smp9-c4-live4", "“Dengan sengaja” =", ["on purpose", "by chance", "by accident", "on time"], 0, "target", true),
      live("smp9-c4-live5", "The bus had ___ left.", ["already", "yet", "since", "ago"], 0, "bus"),
      live("smp9-c4-live6", "Where and when:", ["setting", "plot", "theme", "twist"], 0, "map"),
      live("smp9-c4-live7", "Jim sold his…", ["watch", "hair", "car", "house"], 0, "clock"),
      live("smp9-c4-live8", "Surprise ending:", ["twist", "moral", "title", "orientation"], 0, "surprised"),
    ],
  },
};
