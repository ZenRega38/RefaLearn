import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, writing } from "../kit";

// Grade 5 (Fase C). Chapter 7 — Let's Cook! · Chapter 8 — Celebrations in Indonesia

const RECIPE: Passage = {
  id: "sd5-c7-recipe",
  title: "How to Make a Fruit Salad",
  pic: "bowl",
  lines: [
    "Ingredients: 1 apple, 1 banana, 1 small mango, some grapes, 3 spoons of yogurt, 1 spoon of honey.",
    "Tools: a knife, a cutting board, a bowl and a spoon.",
    "Steps:",
    "First, wash all the fruit with clean water.",
    "Then, peel the banana and the mango.",
    "Next, cut the apple, the banana and the mango into small pieces.",
    "After that, put all the fruit and the grapes into the bowl.",
    "Finally, add the yogurt and the honey. Mix well and enjoy!",
  ],
};

export const CH7: Level = {
  id: "sd5-ch7",
  title: "Chapter 7 — Let's Cook!",
  description: "Name ingredients and kitchen tools, give instructions with imperatives and sequence words, and read a recipe.",
  targetScore: "Reading · Writing · Speaking",
  cover: ["bowl", "pan", "egg"],
  pretest: {
    id: "sd5-c7-pre",
    title: "Chapter 7 Pretest",
    passPercent: 0,
    questions: [
      pick("sd5-c7-pre1", "What is this?", ["a bowl", "a pan", "a spoon", "a knife"], 0, "Mangkuk = bowl.", { image: "bowl" }),
      listen("sd5-c7-pre2", voice("First, wash the vegetables."), "Listen. What is the first step?", ["wash the vegetables", "cut the vegetables", "cook the vegetables"], 0, "First = pertama."),
      trPick("sd5-c7-pre3", "“Bahan-bahan” (in a recipe) in English is…", ["ingredients", "instructions", "tools", "dishes"], 0, "Bahan = ingredients."),
      pick("sd5-c7-pre4", "We fry an egg in a…", ["pan", "bowl", "cup", "glass"], 0, "Menggoreng di wajan.", { image: "pan" }),
      pick("sd5-c7-pre5", "Which word comes LAST in a recipe?", ["Finally", "First", "Then", "Next"], 0, "Finally = terakhir."),
    ],
  },
  lessons: [
    {
      id: "sd5-c7-l1",
      skill: "vocabulary",
      title: "In the Kitchen",
      summary: "Tools and cooking verbs: wash, peel, cut, mix, boil, fry, add, pour.",
      sections: [
        {
          title: "Kitchen tools",
          blocks: [
            vocab([
              ["pan", "wajan", "pan"],
              ["bowl", "mangkuk", "bowl"],
              ["spoon", "sendok", "spoon"],
              ["knife", "pisau", "knife"],
              ["stove", "kompor", "stove"],
              ["cup / glass", "cangkir / gelas", "water"],
            ], "Tools"),
            tip("Pisau dan kompor bisa berbahaya. Selalu minta orang dewasa membantu saat memotong atau memasak!"),
          ],
        },
        {
          title: "Cooking verbs",
          blocks: [
            table(["Verb", "Meaning"], [["wash", "mencuci"], ["peel", "mengupas"], ["cut / chop", "memotong / mencincang"], ["mix", "mencampur"], ["boil", "merebus"], ["fry", "menggoreng"], ["add", "menambahkan"], ["pour", "menuang"], ["serve", "menyajikan"]]),
            repeat(["wash", "peel", "cut", "mix", "boil", "fry", "add", "pour", "serve"]),
            tryIt(pick("sd5-c7-l1-try1", "You take the skin off a banana. You ___ it.", ["peel", "boil", "pour"], 0, "Mengupas = peel.", { image: "banana" })),
          ],
        },
      ],
      checkpoint: [
        listen("sd5-c7-l1-c1", voice("Boil the water."), "Listen. What do you do?", ["boil the water", "fry the water", "cut the water"], 0, "Boil = merebus."),
        match("sd5-c7-l1-c2", "Match.", [["pic:knife", "knife"], ["pic:spoon", "spoon"], ["pic:pan", "pan"], ["pic:bowl", "bowl"]], "Alat dapur!"),
        trPick("sd5-c7-l1-c3", "“Menggoreng” in English is…", ["fry", "fly", "boil"], 0, "Menggoreng = fry."),
        fill("sd5-c7-l1-c4", "Complete: ___ the milk into a glass. (tuang)", "", "the milk into a glass.", ["pour", "Pour"], "Tuang = pour.", { translate: true }),
        pick("sd5-c7-l1-c5", "Which tool do you use to eat soup?", ["a spoon", "a knife", "a pan"], 0, "Sendok untuk sup."),
        pick("sd5-c7-l1-c6", "To make tea, which comes first?", ["boil the water", "drink the tea", "add ice"], 0, "Rebus air dulu.", { hots: true, image: "tea" }),
      ],
    },
    {
      id: "sd5-c7-l2",
      skill: "speaking",
      title: "First, Then, Finally",
      summary: "Imperatives and sequence words; some/a/an with food.",
      sections: [
        {
          title: "Giving instructions",
          blocks: [
            text("Untuk memberi instruksi, mulai kalimat dengan **kata kerja** (imperative): *Wash the rice. Add some salt. Don't touch the hot pan!*"),
            table(["Sequence word", "Meaning"], [["First,", "Pertama,"], ["Then,", "Lalu,"], ["Next,", "Berikutnya,"], ["After that,", "Setelah itu,"], ["Finally,", "Terakhir,"]]),
            audio("How to make tea", say(["woman", "First, boil some water."], ["woman", "Then, put a tea bag in a cup."], ["woman", "Next, pour the hot water into the cup."], ["woman", "After that, add a spoon of sugar."], ["woman", "Finally, stir it and enjoy your tea!"])),
          ],
        },
        {
          title: "Your recipe",
          blocks: [
            tryIt(pick("sd5-c7-l2-try1", "What do you do after you pour the water?", ["add sugar", "boil the water", "put a tea bag"], 0, "After that, add a spoon of sugar.")),
            speaking({
              id: "sd5-c7-l2-say",
              title: "Explain a simple recipe",
              prompt: "Explain how to make a simple drink or snack (for example es teh, a sandwich or instant noodles). Use four sequence words.",
              image: "juice",
              seconds: 60,
              tips: ["First, …", "Then, …", "After that, …", "Finally, …"],
              models: [{ label: "Example", text: "This is how to make a cheese sandwich. First, take two slices of bread. Then, put some butter on the bread. Next, add a slice of cheese and some tomato. Finally, close the sandwich and cut it in half. Enjoy!" }],
              rubric: ["I used at least four sequence words.", "Each step starts with a verb.", "The steps are in a logical order."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd5-c7-l2-c1", say(["woman", "Finally, stir it and enjoy your tea!"]), "Listen. Which step is it?", ["the last step", "the first step", "the second step"], 0, "Finally = terakhir."),
        arrange("sd5-c7-l2-c2", "Put the words in order.", "First wash the rice", "First, + perintah."),
        pick("sd5-c7-l2-c3", "Which sentence is an instruction?", ["Add some salt.", "She adds some salt.", "Salt is white."], 0, "Instruksi diawali kata kerja."),
        fill("sd5-c7-l2-c4", "Complete: ___ touch the hot pan! (jangan)", "", "touch the hot pan!", ["Don't", "don't", "Do not"], "Jangan = Don't.", { translate: true }),
        trPick("sd5-c7-l2-c5", "“Terakhir,” in English is…", ["Finally,", "Firstly,", "Next,"], 0, "Terakhir = finally."),
        pick("sd5-c7-l2-c6", "Put in order: (1) eat (2) fry the egg (3) break the egg into the pan", ["3 – 2 – 1", "1 – 2 – 3", "2 – 3 – 1"], 0, "Pecahkan telur → goreng → makan.", { hots: true }),
      ],
    },
    {
      id: "sd5-c7-l3",
      skill: "reading",
      title: "Reading: How to Make a Fruit Salad",
      summary: "Read a procedure text and write your own recipe.",
      passages: [RECIPE],
      sections: [
        {
          title: "A procedure text",
          blocks: [
            { type: "passage", passage: RECIPE },
            pics([["apple", "apple"], ["banana", "banana"], ["mango", "mango"], ["grapes", "grapes"], ["bowl", "bowl"]]),
            tip("Teks **procedure** (cara membuat sesuatu) punya tiga bagian: **tujuan/judul** → **bahan & alat** (ingredients, tools) → **langkah-langkah** (steps)."),
            tryIt(pick("sd5-c7-l3-try1", "How many spoons of yogurt do you need?", ["three", "one", "five"], 0, "Baris 1.", { passageId: RECIPE.id })),
          ],
        },
        {
          title: "Write a recipe",
          blocks: [
            writing({
              id: "sd5-c7-l3-write",
              title: "My recipe",
              prompt: "Write a procedure text for a simple food or drink you like. Include ingredients, tools and steps.",
              image: "pan",
              minWords: 50,
              maxWords: 140,
              tips: ["How to Make …", "Ingredients: …", "Tools: …", "Steps: First, … Then, … Next, … Finally, …"],
              models: [{ label: "Example", text: "How to Make Fried Egg\nIngredients: 1 egg, a little oil, a pinch of salt.\nTools: a pan, a stove, a spatula and a plate.\nSteps:\nFirst, heat the oil in the pan.\nThen, break the egg into the pan.\nNext, add a pinch of salt.\nAfter two minutes, turn the egg over.\nFinally, put it on a plate and serve it with rice." }],
              rubric: ["I wrote a title, ingredients and tools.", "Each step starts with a verb.", "I used sequence words.", "The steps are complete and in order."],
            }),
          ],
        },
      ],
      checkpoint: [
        pickMany("sd5-c7-l3-c1", "Choose ALL the fruit in the salad.", ["apple", "banana", "mango", "grapes", "watermelon"], [0, 1, 2, 3], "Baris 1.", { passageId: RECIPE.id }),
        pick("sd5-c7-l3-c2", "What do you do first?", ["Wash all the fruit.", "Cut the apple.", "Add yogurt."], 0, "First, wash all the fruit.", { passageId: RECIPE.id }),
        fill("sd5-c7-l3-c3", "Complete.", "Then, peel the banana and the", ".", ["mango"], "Baris 5.", { passageId: RECIPE.id }),
        pick("sd5-c7-l3-c4", "Which tool do you use to cut the fruit?", ["a knife", "a spoon", "a bowl"], 0, "Pisau.", { passageId: RECIPE.id }),
        pick("sd5-c7-l3-c5", "Why don't we peel the grapes?", ["Grapes are small and we can eat the skin.", "Grapes have no skin.", "Grapes are not fruit."], 0, "Anggur kecil dan kulitnya bisa dimakan.", { passageId: RECIPE.id, hots: true }),
        pick("sd5-c7-l3-c6", "What makes the salad sweet?", ["honey", "salt", "water"], 0, "Madu (honey).", { passageId: RECIPE.id }),
      ],
    },
  ],
  quiz: {
    id: "sd5-c7-post",
    title: "Chapter 7 Posttest",
    passPercent: 70,
    passages: [RECIPE],
    questions: [
      pick("sd5-c7-post1", "What is this?", ["a knife", "a spoon", "a fork", "a pan"], 0, "Pisau = knife.", { image: "knife" }),
      listen("sd5-c7-post2", voice("Next, cut the onion into small pieces."), "Listen. What do you do to the onion?", ["cut it", "boil it", "peel it", "fry it"], 0, "Cut = memotong."),
      trPick("sd5-c7-post3", "“Mengupas” in English is…", ["peel", "pour", "pick", "pull"], 0, "Mengupas = peel."),
      pick("sd5-c7-post4", "___ the water before you drink it.", ["Boil", "Boils", "Boiling", "Boiled"], 0, "Instruksi → kata kerja dasar."),
      arrange("sd5-c7-post5", "Put the words in order.", "Finally serve the soup", "Finally, + perintah."),
      pick("sd5-c7-post6", "What do you add at the end of the fruit salad?", ["yogurt and honey", "salt and pepper", "water and sugar", "rice"], 0, "Baris 8.", { passageId: RECIPE.id }),
      match("sd5-c7-post7", "Match the verb and the meaning.", [["mix", "mencampur"], ["add", "menambahkan"], ["serve", "menyajikan"]], "Kata kerja memasak!", { translate: true }),
      fill("sd5-c7-post8", "Complete: The part of a recipe with food items is called ___ .", "The part of a recipe with food items is called", ".", ["ingredients"], "Bahan = ingredients."),
      pick("sd5-c7-post9", "Someone forgot to write “Wash the fruit.” Why is that a problem?", ["The fruit may be dirty.", "The salad will be too sweet.", "The bowl will break."], 0, "Buah yang tidak dicuci bisa kotor.", { passageId: RECIPE.id, hots: true }),
      pick("sd5-c7-post10", "Which is the correct order for instant noodles?", ["boil water → add noodles → add seasoning → serve", "serve → boil water → add noodles", "add seasoning → serve → boil water"], 0, "Rebus air dulu, terakhir sajikan.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Master Chef",
    questions: [
      live("sd5-c7-live1", "What is it?", ["a pan", "a bowl", "a cup", "a plate"], 0, "pan"),
      live("sd5-c7-live2", "“Merebus” is…", ["boil", "fry", "bake", "mix"], 0, "stove", true),
      live("sd5-c7-live3", "The LAST step starts with…", ["Finally,", "First,", "Then,", "Next,"], 0, "bowl"),
      live("sd5-c7-live4", "Take the skin off a banana:", ["peel", "pour", "boil", "fry"], 0, "banana"),
      live("sd5-c7-live5", "We fry eggs in a…", ["pan", "glass", "bowl", "cup"], 0, "egg"),
      live("sd5-c7-live6", "___ touch the hot stove!", ["Don't", "Doesn't", "Not", "No"], 0, "stove"),
      live("sd5-c7-live7", "Food items in a recipe:", ["ingredients", "tools", "steps", "titles"], 0, "basket"),
      live("sd5-c7-live8", "What is it?", ["a knife", "a spoon", "a pan", "a fork"], 0, "knife"),
    ],
  },
};

const FESTIVALS: Passage = {
  id: "sd5-c8-fest",
  title: "Celebrations in My Class",
  pic: "flag",
  lines: [
    "Indonesia has many religions and cultures, so we have many celebrations.",
    "Aisyah celebrates Eid al-Fitr. Her family eats ketupat and visits relatives.",
    "Yosef celebrates Christmas. He decorates a Christmas tree with his sister.",
    "Mei Lin celebrates Chinese New Year. She gets red envelopes from her grandparents.",
    "Made celebrates Nyepi in Bali. On that day, everyone stays quiet at home.",
    "On 17th August, we all celebrate Independence Day together with games and a flag ceremony.",
    "We respect each other's celebrations. That is why our class is like a big family.",
  ],
};

export const CH8: Level = {
  id: "sd5-ch8",
  title: "Chapter 8 — Celebrations in Indonesia",
  description: "Talk about national and religious celebrations, give greetings for special days, and respect differences.",
  targetScore: "Reading · Speaking · Writing",
  cover: ["flag", "ketupat", "lantern"],
  pretest: {
    id: "sd5-c8-pre",
    title: "Chapter 8 Pretest",
    passPercent: 0,
    questions: [
      pick("sd5-c8-pre1", "When is Indonesia's Independence Day?", ["17th August", "1st January", "25th December", "21st April"], 0, "17 Agustus.", { image: "flag" }),
      listen("sd5-c8-pre2", voice("Happy New Year!"), "Listen. When do people say this?", ["on 1st January", "on someone's birthday", "every Monday"], 0, "Selamat Tahun Baru."),
      trPick("sd5-c8-pre3", "“Upacara bendera” in English is…", ["a flag ceremony", "a flag party", "a flag game"], 0, "Upacara = ceremony."),
      pick("sd5-c8-pre4", "What is this?", ["ketupat", "a lantern", "a cake", "a kite"], 0, "Ketupat, makanan khas Lebaran.", { image: "ketupat" }),
      pick("sd5-c8-pre5", "Your friend celebrates a different holiday. You should…", ["respect it and say a kind greeting", "laugh at it", "ignore your friend"], 0, "Saling menghormati."),
    ],
  },
  lessons: [
    {
      id: "sd5-c8-l1",
      skill: "vocabulary",
      title: "Special Days",
      summary: "Independence Day, Eid al-Fitr, Christmas, Chinese New Year, Nyepi, Vesak, New Year; ceremony, fireworks, decorate.",
      sections: [
        {
          title: "Celebrations",
          blocks: [
            vocab([
              ["Independence Day", "Hari Kemerdekaan", "flag", "We celebrate it on 17th August."],
              ["Eid al-Fitr", "Idulfitri / Lebaran", "ketupat", "Families visit each other on Eid."],
              ["Christmas", "Natal", "christmas-tree", "People decorate Christmas trees."],
              ["Chinese New Year", "Imlek", "lantern", "Red lanterns are everywhere."],
              ["Nyepi", "Nyepi", "night", "It is a day of silence in Bali."],
              ["Vesak", "Waisak", "flower", "Buddhists light candles at temples."],
              ["New Year", "Tahun Baru", "fireworks", "We watch fireworks at midnight."],
            ]),
            tip("Nama hari raya dan perayaan ditulis dengan **huruf kapital**."),
          ],
        },
        {
          title: "What do people do?",
          blocks: [
            table(["Verb", "Meaning", "Example"], [["celebrate", "merayakan", "We celebrate Independence Day."], ["decorate", "menghias", "They decorate the house."], ["visit relatives", "mengunjungi kerabat", "We visit relatives on Eid."], ["watch fireworks", "menonton kembang api", "We watch fireworks on New Year's Eve."], ["give presents", "memberi hadiah", "We give presents on birthdays."], ["wear traditional clothes", "memakai baju adat", "We wear traditional clothes on Kartini Day."]]),
            tryIt(pick("sd5-c8-l1-try1", "On Independence Day, many people join a…", ["flag ceremony", "Christmas party", "birthday party"], 0, "Upacara bendera.", { image: "flag" })),
          ],
        },
      ],
      checkpoint: [
        listen("sd5-c8-l1-c1", voice("We watch fireworks at midnight."), "Listen. Which celebration is it?", ["New Year", "Nyepi", "Independence Day"], 0, "Kembang api tengah malam → Tahun Baru."),
        match("sd5-c8-l1-c2", "Match.", [["pic:ketupat", "Eid al-Fitr"], ["pic:christmas-tree", "Christmas"], ["pic:lantern", "Chinese New Year"], ["pic:flag", "Independence Day"]], "Bagus!"),
        trPick("sd5-c8-l1-c3", "“Menghias” in English is…", ["decorate", "celebrate", "visit"], 0, "Menghias = decorate."),
        fill("sd5-c8-l1-c4", "Complete: We ___ Independence Day on 17th August.", "We", "Independence Day on 17th August.", ["celebrate"], "Merayakan = celebrate."),
        pick("sd5-c8-l1-c5", "Which celebration is a day of silence?", ["Nyepi", "New Year", "Christmas"], 0, "Nyepi = hari sepi."),
        pick("sd5-c8-l1-c6", "Why do people visit relatives on Eid?", ["to forgive each other and stay close", "to buy fireworks", "to go to school"], 0, "Silaturahmi dan saling memaafkan.", { hots: true }),
      ],
    },
    {
      id: "sd5-c8-l2",
      skill: "speaking",
      title: "Happy Holidays!",
      summary: "Greetings and wishes for special days, and replying politely.",
      sections: [
        {
          title: "Greetings for special days",
          blocks: [
            table(["Day", "Greeting", "Reply"], [["Eid al-Fitr", "Happy Eid! / Eid Mubarak!", "Thank you!"], ["Christmas", "Merry Christmas!", "Merry Christmas to you too!"], ["Chinese New Year", "Happy Chinese New Year! / Gong Xi Fa Cai!", "Thank you!"], ["New Year", "Happy New Year!", "Happy New Year!"], ["Birthday", "Happy birthday! Many happy returns!", "Thank you so much!"], ["Independence Day", "Happy Independence Day!", "Merdeka!"]]),
            repeat(["Happy Eid!", "Merry Christmas!", "Happy Chinese New Year!", "Happy New Year!", "Happy Independence Day!"]),
          ],
        },
        {
          title: "Talk about your celebration",
          blocks: [
            audio("Before the holiday", say(["man", "What do you usually do on Eid, Aisyah?"], ["woman", "I wear new clothes and visit my grandparents. We eat ketupat and opor. What about you, Yosef?"], ["man", "I celebrate Christmas. I go to church with my family and we have a big dinner."], ["woman", "That sounds nice. Merry Christmas, Yosef!"], ["man", "Thank you! And happy Eid, Aisyah!"])),
            tryIt(pick("sd5-c8-l2-try1", "What does Aisyah eat on Eid?", ["ketupat and opor", "a Christmas cake", "moon cakes"], 0, "We eat ketupat and opor.")),
            speaking({
              id: "sd5-c8-l2-say",
              title: "My favorite celebration",
              prompt: "Talk about a celebration you love: when it is, what you do, what you eat and wear, and how you feel.",
              image: "fireworks",
              seconds: 60,
              tips: ["My favorite celebration is …", "It is in / on …", "We usually …", "I feel … because …"],
              models: [{ label: "Example", text: "My favorite celebration is Independence Day. It is on the seventeenth of August. In the morning, we join a flag ceremony. In the afternoon, we play games like sack races and cracker-eating contests. I feel proud of my country." }],
              rubric: ["I named the celebration and the date or month.", "I said at least two things we do.", "I used **usually** or the simple present correctly.", "I said how I feel."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd5-c8-l2-c1", voice("Merry Christmas!"), "Listen. What is a good reply?", ["Merry Christmas to you too!", "Happy birthday!", "Goodbye!"], 0, "Balas dengan ucapan yang sama."),
        pick("sd5-c8-l2-c2", "Your friend's birthday is today. You say…", ["Happy birthday!", "Merry Christmas!", "Happy New Year!"], 0, "Ulang tahun → Happy birthday!", { image: "cake" }),
        arrange("sd5-c8-l2-c3", "Put the words in order.", "What do you usually do on Eid", "What do you usually do on …?"),
        trPick("sd5-c8-l2-c4", "“Selamat Hari Kemerdekaan!” in English is…", ["Happy Independence Day!", "Merry Independence!", "Good Independence!"], 0, "Happy Independence Day!"),
        fill("sd5-c8-l2-c5", "Complete: ___ New Year!", "", "New Year!", ["Happy"], "Happy New Year!"),
        pick("sd5-c8-l2-c6", "Your Hindu friend celebrates Nyepi. Which is the kindest message?", ["Happy Nyepi Day! Enjoy the peaceful day with your family.", "Nyepi is boring.", "Why don't you celebrate my holiday?"], 0, "Ucapan baik dan menghormati.", { hots: true }),
      ],
    },
    {
      id: "sd5-c8-l3",
      skill: "reading",
      title: "Reading: Celebrations in My Class",
      summary: "Read about different celebrations and write a greeting card.",
      passages: [FESTIVALS],
      sections: [
        {
          title: "One class, many celebrations",
          blocks: [
            { type: "passage", passage: FESTIVALS },
            audio("Listen and read", say(["woman", FESTIVALS.lines.join(" ")])),
            pics([["ketupat", "Aisyah"], ["christmas-tree", "Yosef"], ["lantern", "Mei Lin"], ["night", "Made"]]),
            tryIt(pick("sd5-c8-l3-try1", "Who gets red envelopes?", ["Mei Lin", "Aisyah", "Yosef"], 0, "Baris 4.", { passageId: FESTIVALS.id })),
          ],
        },
        {
          title: "Write a greeting card",
          blocks: [
            writing({
              id: "sd5-c8-l3-write",
              title: "A greeting card",
              prompt: "Write a short greeting card to a friend for their special day (Eid, Christmas, Chinese New Year, Nyepi, Vesak, a birthday…).",
              image: "card",
              minWords: 25,
              maxWords: 80,
              tips: ["Dear …,", "Happy … ! / Merry … !", "I hope you …", "Enjoy …", "Your friend, …"],
              models: [{ label: "Example", text: "Dear Mei Lin,\nHappy Chinese New Year! I hope you have a wonderful time with your family. Enjoy the red envelopes and the delicious food. Thank you for being a kind friend.\nYour friend,\nAisyah" }],
              rubric: ["I wrote **Dear …** and signed my name.", "I used the right greeting for the day.", "I wrote a kind wish (I hope you …).", "Capital letters for names and celebrations."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd5-c8-l3-c1", "What does Yosef do at Christmas?", ["He decorates a Christmas tree.", "He eats ketupat.", "He stays quiet at home."], 0, "Baris 3.", { passageId: FESTIVALS.id }),
        pick("sd5-c8-l3-c2", "Where does Made celebrate Nyepi?", ["in Bali", "in Jakarta", "in China"], 0, "Baris 5.", { passageId: FESTIVALS.id }),
        fill("sd5-c8-l3-c3", "Complete.", "On 17th August, we all celebrate", "Day together.", ["Independence"], "Baris 6.", { passageId: FESTIVALS.id }),
        pickMany("sd5-c8-l3-c4", "Choose ALL the activities on Independence Day in the text.", ["games", "a flag ceremony", "watching fireworks"], [0, 1], "Baris 6: games and a flag ceremony.", { passageId: FESTIVALS.id }),
        pick("sd5-c8-l3-c5", "Why is the class “like a big family”?", ["They respect each other's celebrations.", "They are all cousins.", "They live in one house."], 0, "Baris 7.", { passageId: FESTIVALS.id, hots: true }),
        pick("sd5-c8-l3-c6", "Why does Indonesia have many celebrations?", ["It has many religions and cultures.", "It is very hot.", "People don't like school."], 0, "Baris 1.", { passageId: FESTIVALS.id }),
      ],
    },
  ],
  quiz: {
    id: "sd5-c8-post",
    title: "Chapter 8 Posttest",
    passPercent: 70,
    passages: [FESTIVALS],
    questions: [
      pick("sd5-c8-post1", "Which celebration uses this?", ["Chinese New Year", "Eid al-Fitr", "Nyepi", "Independence Day"], 0, "Lampion merah → Imlek.", { image: "lantern" }),
      listen("sd5-c8-post2", voice("Happy Eid! Please forgive me."), "Listen. Which celebration is it?", ["Eid al-Fitr", "Christmas", "New Year", "Vesak"], 0, "Idulfitri."),
      trPick("sd5-c8-post3", "“Merayakan” in English is…", ["celebrate", "decorate", "congratulate", "create"], 0, "Merayakan = celebrate."),
      pick("sd5-c8-post4", "Merry ___ !", ["Christmas", "birthday", "Eid", "Independence"], 0, "Merry Christmas."),
      arrange("sd5-c8-post5", "Put the words in order.", "We watch fireworks on New Year's Eve", "Kita menonton kembang api di malam tahun baru."),
      pick("sd5-c8-post6", "What does Aisyah's family eat on Eid?", ["ketupat", "moon cakes", "Christmas cake", "pizza"], 0, "Baris 2.", { passageId: FESTIVALS.id }),
      match("sd5-c8-post7", "Match the day and the greeting.", [["birthday", "Happy birthday!"], ["Christmas", "Merry Christmas!"], ["New Year", "Happy New Year!"]], "Ucapan yang tepat!"),
      fill("sd5-c8-post8", "Complete: Families ___ relatives on Eid. (mengunjungi)", "Families", "relatives on Eid.", ["visit"], "Mengunjungi = visit.", { translate: true }),
      pick("sd5-c8-post9", "On Nyepi, everyone stays quiet. Which activity is NOT allowed?", ["playing loud music", "staying at home", "being quiet", "resting"], 0, "Saat Nyepi tidak boleh ribut.", { passageId: FESTIVALS.id, hots: true }),
      pick("sd5-c8-post10", "What is the main message of the text?", ["Respect differences; we are one family.", "Christmas is the best holiday.", "Fireworks are dangerous.", "Bali is beautiful."], 0, "Pesan utama: saling menghormati.", { passageId: FESTIVALS.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Festival Fun",
    questions: [
      live("sd5-c8-live1", "Independence Day is on…", ["17th August", "1st January", "25th December", "1st May"], 0, "flag"),
      live("sd5-c8-live2", "Which festival uses red lanterns?", ["Chinese New Year", "Eid", "Nyepi", "Christmas"], 0, "lantern"),
      live("sd5-c8-live3", "___ Christmas!", ["Merry", "Happy birthday", "Good", "Nice"], 0, "christmas-tree"),
      live("sd5-c8-live4", "We eat ketupat on…", ["Eid al-Fitr", "Christmas", "New Year", "Vesak"], 0, "ketupat"),
      live("sd5-c8-live5", "The day of silence in Bali:", ["Nyepi", "Vesak", "Kartini Day", "New Year"], 0, "night"),
      live("sd5-c8-live6", "We watch ___ on New Year's Eve.", ["fireworks", "lanterns", "kites", "flags"], 0, "fireworks"),
      live("sd5-c8-live7", "“Menghias” is…", ["decorate", "celebrate", "visit", "cook"], 0, "christmas-tree", true),
      live("sd5-c8-live8", "Reply to “Happy New Year!”", ["Happy New Year!", "Goodbye!", "Merry birthday!", "Sorry!"], 0, "fireworks"),
    ],
  },
};
