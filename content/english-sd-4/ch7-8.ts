import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 4 (Fase B). Chapter 7 — Healthy Me · Chapter 8 — Let's Go Shopping

const HEALTHY: Passage = {
  id: "sd4-c7-tips",
  title: "Five Tips for a Healthy Body",
  pic: "heart",
  lines: [
    "1. Eat fruit and vegetables every day.",
    "2. Drink eight glasses of water.",
    "3. Brush your teeth twice a day, in the morning and before bed.",
    "4. Exercise for thirty minutes. You can run, swim or ride a bike.",
    "5. Sleep for nine or ten hours every night.",
    "Don't eat too much candy, and wash your hands before you eat.",
  ],
};

export const CH7: Level = {
  id: "sd4-ch7",
  title: "Chapter 7 — Healthy Me",
  description: "Say what's wrong when you are sick, give advice with should and shouldn't, and learn healthy habits.",
  targetScore: "Listening · Speaking · Reading",
  cover: ["sick", "medicine", "vegetables"],
  pretest: {
    id: "sd4-c7-pre",
    title: "Chapter 7 Pretest",
    passPercent: 0,
    questions: [
      pick("sd4-c7-pre1", "What's wrong?", ["She has a headache.", "She is happy.", "She is hungry.", "She is dancing."], 0, "Wajah kesakitan memegang kepala → headache.", { image: "headache" }),
      listen("sd4-c7-pre2", voice("I have a toothache."), "Listen. Choose the picture.", ["pic:toothache", "pic:headache", "pic:cough", "pic:stomachache"], 0, "Toothache = sakit gigi."),
      trPick("sd4-c7-pre3", "“Demam” in English is…", ["fever", "flu", "cough", "cold"], 0, "Demam = fever."),
      pick("sd4-c7-pre4", "You have a fever. You should…", ["rest and see a doctor", "play football", "eat ice cream"], 0, "Demam → istirahat dan periksa ke dokter.", { image: "thermometer" }),
      pick("sd4-c7-pre5", "Which is healthy?", ["eating vegetables", "eating lots of candy", "sleeping very late"], 0, "Sayur menyehatkan.", { image: "vegetables" }),
    ],
  },
  lessons: [
    {
      id: "sd4-c7-l1",
      skill: "vocabulary",
      title: "What's Wrong?",
      summary: "Headache, toothache, stomachache, cough, cold, fever.",
      sections: [
        {
          title: "Feeling sick",
          blocks: [
            vocab([
              ["a headache", "sakit kepala", "headache", "I have a headache."],
              ["a toothache", "sakit gigi", "toothache", "He has a toothache."],
              ["a stomachache", "sakit perut", "stomachache", "She has a stomachache."],
              ["a cough", "batuk", "cough", "I have a bad cough."],
              ["a cold / the flu", "pilek / flu", "sick", "I have a cold."],
              ["a fever", "demam", "thermometer", "He has a high fever."],
            ]),
            text("Pola kalimatnya: **I have a …** / **He has a …** / **She has a …**. Ingat: *he/she* memakai **has**."),
            repeat(["I have a headache.", "She has a toothache.", "He has a fever.", "I have a cough."]),
          ],
        },
        {
          title: "At the doctor's",
          blocks: [
            pics([["doctor", "Doctor"], ["sick", "Patient"]]),
            audio("At the clinic", say(["man", "Good morning. What's wrong?"], ["woman", "I have a fever and a cough."], ["man", "Let me check. Open your mouth, please. Say aah."], ["woman", "Aah."], ["man", "You have the flu. Take this medicine three times a day."])),
            tryIt(pick("sd4-c7-l1-try1", "What's wrong with the girl?", ["a fever and a cough", "a toothache", "a stomachache"], 0, "I have a fever and a cough.")),
          ],
        },
      ],
      checkpoint: [
        listen("sd4-c7-l1-c1", voice("I have a stomachache."), "Listen. Choose the picture.", ["pic:stomachache", "pic:headache", "pic:toothache"], 0, "Stomachache = sakit perut."),
        pick("sd4-c7-l1-c2", "What's wrong?", ["He has a cough.", "He has a toothache.", "He is fine."], 0, "Batuk = cough.", { image: "cough" }),
        match("sd4-c7-l1-c3", "Match.", [["pic:headache", "headache"], ["pic:toothache", "toothache"], ["pic:thermometer", "fever"], ["pic:cough", "cough"]], "Hebat!"),
        pick("sd4-c7-l1-c4", "She ___ a headache.", ["has", "have", "is"], 0, "She + has."),
        trPick("sd4-c7-l1-c5", "“Apa yang sakit?” (dokter bertanya) in English is…", ["What's wrong?", "What's your name?", "What time is it?"], 0, "What's wrong? = Ada apa? / Sakit apa?"),
        pick("sd4-c7-l1-c6", "Beni ate too much spicy food. Now he probably has…", ["a stomachache", "a toothache", "a broken leg"], 0, "Terlalu banyak makanan pedas → sakit perut.", { hots: true }),
      ],
    },
    {
      id: "sd4-c7-l2",
      skill: "speaking",
      title: "You Should Rest",
      summary: "Giving advice with should and shouldn't.",
      sections: [
        {
          title: "Should and shouldn't",
          blocks: [
            text("**should** = sebaiknya. **shouldn't** = sebaiknya tidak. Setelah should, kata kerja tanpa -s: *You should **rest**.*"),
            table(["Problem", "You should…", "You shouldn't…"], [["a headache", "rest / sleep", "play games all night"], ["a toothache", "see a dentist", "eat sweets"], ["a fever", "take medicine, drink water", "go to school"], ["a cough", "drink warm water", "drink ice"], ["a stomachache", "eat plain rice", "eat spicy food"]]),
            repeat(["You should rest.", "You should see a doctor.", "You shouldn't eat sweets.", "You shouldn't drink ice."]),
          ],
        },
        {
          title: "Help a friend",
          blocks: [
            audio("Are you OK?", say(["woman", "You look pale. Are you OK, Raka?"], ["man", "No, I'm not. I have a toothache."], ["woman", "Oh no! You should see a dentist. You shouldn't eat candy."], ["man", "You're right. Thanks."])),
            tryIt(pick("sd4-c7-l2-try1", "What advice does the girl give?", ["see a dentist", "eat more candy", "play football"], 0, "You should see a dentist.")),
            speaking({
              id: "sd4-c7-l2-say",
              title: "Give advice",
              prompt: "Your friend says “I have a fever.” Give two pieces of advice with **should** and one with **shouldn't**.",
              image: "thermometer",
              seconds: 40,
              models: [{ label: "Example", text: "Oh no! You should rest at home. You should drink a lot of water and take medicine. You shouldn't go to school today." }],
              rubric: ["I used **should** twice.", "I used **shouldn't** once.", "The verb after should has no -s."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd4-c7-l2-c1", say(["man", "I have a cough."], ["woman", "You should drink warm water."]), "Listen. What should he drink?", ["warm water", "ice", "soda"], 0, "Warm water = air hangat."),
        pick("sd4-c7-l2-c2", "You have a toothache. You shouldn't…", ["eat candy", "see a dentist", "brush your teeth"], 0, "Sakit gigi → jangan makan permen."),
        fill("sd4-c7-l2-c3", "Complete: You ___ rest. (sebaiknya)", "You", "rest.", ["should"], "Sebaiknya = should.", { translate: true }),
        pick("sd4-c7-l2-c4", "Which sentence is correct?", ["You should sleep early.", "You should sleeps early.", "You should to sleep early."], 0, "Should + kata kerja dasar."),
        arrange("sd4-c7-l2-c5", "Put the words in order.", "You shouldn't eat spicy food", "You shouldn't + kata kerja."),
        pick("sd4-c7-l2-c6", "Your friend has a fever but wants to play in the rain. You say…", ["You shouldn't play in the rain. You should rest.", "Good idea!", "You should play longer."], 0, "Demam → jangan main hujan, istirahat.", { hots: true }),
      ],
    },
    {
      id: "sd4-c7-l3",
      skill: "reading",
      title: "Reading: Five Tips for a Healthy Body",
      summary: "Read health tips and make a healthy-habit poster.",
      passages: [HEALTHY],
      sections: [
        {
          title: "Healthy tips",
          blocks: [
            { type: "passage", passage: HEALTHY },
            pics([["vegetables", "eat vegetables"], ["water", "drink water"], ["toothbrush", "brush your teeth"], ["run", "exercise"], ["sleep", "sleep well"]]),
            tryIt(pick("sd4-c7-l3-try1", "How many glasses of water should you drink?", ["eight", "two", "ten"], 0, "Tip 2: eight glasses.", { passageId: HEALTHY.id })),
          ],
        },
        {
          title: "Make a poster",
          blocks: [
            writing({
              id: "sd4-c7-l3-write",
              title: "My healthy-habit poster",
              prompt: "Write a short poster with five tips for healthy kids. Start each tip with a verb or with **Don't**.",
              image: "heart",
              minWords: 30,
              maxWords: 90,
              tips: ["Eat …", "Drink …", "Wash …", "Don't …", "Sleep …"],
              models: [{ label: "Example", text: "BE HEALTHY, BE HAPPY!\n1. Eat fruit every day.\n2. Wash your hands with soap.\n3. Play outside for one hour.\n4. Don't drink too much soda.\n5. Go to bed before nine o'clock." }],
              rubric: ["I wrote five tips.", "Each tip starts with a verb or **Don't**.", "My tips are about health.", "I gave my poster a title."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd4-c7-l3-c1", "How often should you brush your teeth?", ["twice a day", "once a week", "every hour"], 0, "Tip 3.", { passageId: HEALTHY.id }),
        pickMany("sd4-c7-l3-c2", "Choose ALL the exercises in the text.", ["run", "swim", "ride a bike", "sleep"], [0, 1, 2], "Tip 4.", { passageId: HEALTHY.id }),
        fill("sd4-c7-l3-c3", "Complete.", "Wash your", "before you eat.", ["hands"], "Kalimat terakhir.", { passageId: HEALTHY.id }),
        pick("sd4-c7-l3-c4", "How long should you exercise?", ["thirty minutes", "three hours", "three minutes"], 0, "Tip 4.", { passageId: HEALTHY.id }),
        pick("sd4-c7-l3-c5", "Which habit breaks the tips?", ["sleeping at midnight every day", "eating vegetables", "drinking water"], 0, "Tidur jam 12 malam setiap hari melanggar tip 5.", { passageId: HEALTHY.id, hots: true }),
        pick("sd4-c7-l3-c6", "Why should you wash your hands before you eat?", ["to remove germs", "to make them cold", "to make food sweet"], 0, "Mencuci tangan membersihkan kuman (germs).", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd4-c7-post",
    title: "Chapter 7 Posttest",
    passPercent: 70,
    passages: [HEALTHY],
    questions: [
      pick("sd4-c7-post1", "What's wrong?", ["He has a toothache.", "He has a cough.", "He is sleepy.", "He has a stomachache."], 0, "Pipi diperban → sakit gigi.", { image: "toothache" }),
      listen("sd4-c7-post2", voice("I have a high fever."), "Listen. What does she need?", ["pic:thermometer", "pic:football", "pic:candy", "pic:cake"], 0, "Demam → termometer/obat."),
      trPick("sd4-c7-post3", "“Sakit perut” in English is…", ["stomachache", "headache", "toothache", "backache"], 0, "Sakit perut = stomachache."),
      pick("sd4-c7-post4", "He ___ a cold.", ["has", "have", "is", "are"], 0, "He + has."),
      fill("sd4-c7-post5", "Complete: You ___ eat sweets. (sebaiknya tidak)", "You", "eat sweets.", ["shouldn't", "should not"], "Sebaiknya tidak = shouldn't.", { translate: true }),
      arrange("sd4-c7-post6", "Put the words in order.", "You should see a doctor", "You should + kata kerja."),
      pick("sd4-c7-post7", "How many hours should children sleep?", ["nine or ten", "five or six", "twelve or thirteen", "three"], 0, "Tip 5.", { passageId: HEALTHY.id }),
      match("sd4-c7-post8", "Match the problem and the advice.", [["toothache", "see a dentist"], ["cough", "drink warm water"], ["headache", "rest"]], "Saran yang tepat!"),
      pick("sd4-c7-post9", "Dina has a stomachache. Which lunch is BEST?", ["plain rice and soup", "spicy noodles", "chili and ice", "fried food and soda"], 0, "Sakit perut → makanan lembut, tidak pedas.", { hots: true }),
      pick("sd4-c7-post10", "Which is NOT a healthy habit?", ["playing games until midnight", "washing hands", "eating fruit", "drinking water"], 0, "Main game sampai tengah malam tidak sehat.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Stay Healthy",
    questions: [
      live("sd4-c7-live1", "What's wrong?", ["headache", "toothache", "cough", "fever"], 0, "headache"),
      live("sd4-c7-live2", "What's wrong?", ["cough", "headache", "stomachache", "toothache"], 0, "cough"),
      live("sd4-c7-live3", "She ___ a fever.", ["has", "have", "is", "do"], 0, "thermometer"),
      live("sd4-c7-live4", "Toothache → You should see a…", ["dentist", "chef", "pilot", "farmer"], 0, "toothache"),
      live("sd4-c7-live5", "You should ___ water.", ["drink", "drinks", "drinking", "to drink"], 0, "water"),
      live("sd4-c7-live6", "Brush your teeth ___ a day.", ["twice", "ten times", "never", "once a week"], 0, "toothbrush"),
      live("sd4-c7-live7", "Fever → You shouldn't…", ["play in the rain", "rest", "drink water", "sleep"], 0, "rain"),
      live("sd4-c7-live8", "“Batuk” is…", ["cough", "cold", "fever", "flu"], 0, "cough", true),
    ],
  },
};

const SHOP: Passage = {
  id: "sd4-c8-shop",
  title: "At the Stationery Shop",
  pic: "cart",
  lines: [
    "Shopkeeper: Good afternoon. Can I help you?",
    "Rani: Yes, please. I want to buy a ruler and two pencils.",
    "Shopkeeper: Here you are. The ruler is five thousand rupiah.",
    "Rani: How much is a pencil?",
    "Shopkeeper: It's three thousand rupiah.",
    "Rani: So that's eleven thousand rupiah. Here's twenty thousand.",
    "Shopkeeper: Thank you. Here's your change: nine thousand rupiah.",
  ],
};

export const CH8: Level = {
  id: "sd4-ch8",
  title: "Chapter 8 — Let's Go Shopping",
  description: "Count to one hundred, say prices in rupiah, and buy things politely: How much is it? Can I help you?",
  targetScore: "Listening · Speaking · Reading",
  cover: ["cart", "money", "supermarket"],
  pretest: {
    id: "sd4-c8-pre",
    title: "Chapter 8 Pretest",
    passPercent: 0,
    questions: [
      pick("sd4-c8-pre1", "30 in English is…", ["thirty", "thirteen", "three", "third"], 0, "30 = thirty."),
      listen("sd4-c8-pre2", voice("It's fifty thousand rupiah."), "Listen. How much is it?", ["Rp50.000", "Rp15.000", "Rp5.000", "Rp500"], 0, "Fifty thousand = 50.000."),
      trPick("sd4-c8-pre3", "“Berapa harganya?” in English is…", ["How much is it?", "How many is it?", "What time is it?", "Where is it?"], 0, "Berapa harganya = How much is it?"),
      pick("sd4-c8-pre4", "Where do you buy a pencil?", ["at a stationery shop", "at a hospital", "at a police station"], 0, "Toko alat tulis = stationery shop.", { image: "pencil" }),
      pick("sd4-c8-pre5", "The shopkeeper says “Can I help you?”. You answer…", ["Yes, please. I want a ruler.", "No, thank you. Goodbye forever.", "I am a ruler."], 0, "Jawab sopan dan sebutkan barangnya."),
    ],
  },
  lessons: [
    {
      id: "sd4-c8-l1",
      skill: "vocabulary",
      title: "Numbers to 100 and Rupiah",
      summary: "Twenty, thirty… one hundred; thousand; Rp prices.",
      sections: [
        {
          title: "Tens",
          blocks: [
            table(["Number", "English"], [["10", "ten"], ["20", "twenty"], ["30", "thirty"], ["40", "forty (no u!)"], ["50", "fifty"], ["60", "sixty"], ["70", "seventy"], ["80", "eighty"], ["90", "ninety"], ["100", "one hundred"]]),
            text("Angka seperti 25 dibaca **twenty-five** (pakai tanda hubung). 47 = **forty-seven**. 99 = **ninety-nine**."),
            repeat(["twenty-one", "thirty-five", "forty-eight", "fifty-two", "seventy-six", "ninety-nine", "one hundred"]),
            warn("**Forty** ditulis tanpa huruf **u** (bukan *fourty*). Dan hati-hati **-teen** vs **-ty**: thir**teen** (13) vs thir**ty** (30)."),
          ],
        },
        {
          title: "Rupiah prices",
          blocks: [
            pics([["money", "rupiah"]]),
            table(["Price", "We say"], [["Rp2.000", "two thousand rupiah"], ["Rp5.000", "five thousand rupiah"], ["Rp15.000", "fifteen thousand rupiah"], ["Rp20.000", "twenty thousand rupiah"], ["Rp50.000", "fifty thousand rupiah"], ["Rp100.000", "one hundred thousand rupiah"]]),
            tip("Ribu = **thousand**. Kata **thousand** tidak diberi -s setelah angka: *five thousand* (bukan *five thousands*)."),
            tryIt(pick("sd4-c8-l1-try1", "Rp25.000 is…", ["twenty-five thousand rupiah", "two five thousand rupiah", "twenty-five thousands rupiah"], 0, "25.000 = twenty-five thousand.")),
          ],
        },
      ],
      checkpoint: [
        listen("sd4-c8-l1-c1", voice("Forty."), "Listen. Which number?", ["40", "14", "4"], 0, "Forty = 40."),
        match("sd4-c8-l1-c2", "Match.", [["60", "sixty"], ["70", "seventy"], ["90", "ninety"], ["100", "one hundred"]], "Bagus!"),
        fill("sd4-c8-l1-c3", "Write 45 in English.", "45 =", "", ["forty-five", "forty five"], "45 = forty-five."),
        pick("sd4-c8-l1-c4", "Which is spelled correctly?", ["forty", "fourty", "fortie"], 0, "Forty (tanpa u)."),
        trPick("sd4-c8-l1-c5", "“Sepuluh ribu rupiah” in English is…", ["ten thousand rupiah", "ten hundred rupiah", "one thousand rupiah"], 0, "10.000 = ten thousand."),
        pick("sd4-c8-l1-c6", "Twenty + thirty = …", ["fifty", "fifteen", "forty"], 0, "20 + 30 = 50.", { hots: true }),
      ],
    },
    {
      id: "sd4-c8-l2",
      skill: "speaking",
      title: "How Much Is It?",
      summary: "Can I help you? I want… How much is it / are they? Here you are.",
      sections: [
        {
          title: "Shop talk",
          blocks: [
            table(["Shopkeeper", "Customer"], [["Can I help you?", "Yes, please. I want a notebook."], ["Here you are.", "How much is it?"], ["It's eight thousand rupiah.", "Here's ten thousand."], ["Here's your change.", "Thank you!"]]),
            text("**How much is it?** untuk satu benda. **How much are they?** untuk banyak benda: *How much are the socks? They're twelve thousand rupiah.*"),
            repeat(["Can I help you?", "I want a notebook, please.", "How much is it?", "How much are they?", "Here you are.", "Here's your change."]),
          ],
        },
        {
          title: "Role-play",
          blocks: [
            audio("At the fruit stall", say(["woman", "Good morning. Can I help you?"], ["man", "Yes, please. How much are the mangoes?"], ["woman", "They're fifteen thousand rupiah a kilo."], ["man", "I'll take one kilo, please. Here's twenty thousand."], ["woman", "Thank you. Here's your change, five thousand rupiah."])),
            tryIt(pick("sd4-c8-l2-try1", "How much is the change?", ["five thousand rupiah", "fifteen thousand rupiah", "twenty thousand rupiah"], 0, "20.000 − 15.000 = 5.000.")),
            speaking({
              id: "sd4-c8-l2-say",
              title: "Be a shopkeeper",
              prompt: "You are a shopkeeper. Greet the customer, say the prices of two things, and give change.",
              image: "stall",
              seconds: 50,
              tips: ["Good morning. Can I help you?", "It's … thousand rupiah. / They're …", "Here's your change."],
              models: [{ label: "Example", text: "Good morning. Can I help you? The pencil case is twelve thousand rupiah. The erasers are two thousand rupiah each. That's fourteen thousand. Here's your change, six thousand rupiah. Thank you!" }],
              rubric: ["I greeted the customer politely.", "I said two prices in English.", "I used **is** for one thing and **are** for more than one.", "I gave the change."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd4-c8-l2-c1", say(["man", "How much is this bag?"], ["woman", "It's sixty thousand rupiah."]), "Listen. How much is the bag?", ["Rp60.000", "Rp16.000", "Rp6.000"], 0, "Sixty thousand = 60.000."),
        pick("sd4-c8-l2-c2", "How much ___ the shoes?", ["are", "is", "am"], 0, "Shoes jamak → are."),
        arrange("sd4-c8-l2-c3", "Put the words in order.", "Can I help you", "Can I help you? = Ada yang bisa saya bantu?"),
        fill("sd4-c8-l2-c4", "Complete: Here's your ___ . (uang kembalian)", "Here's your", ".", ["change"], "Kembalian = change.", { translate: true }),
        trPick("sd4-c8-l2-c5", "“Ini dia.” (saat memberikan barang) in English is…", ["Here you are.", "Where are you?", "How are you?"], 0, "Here you are."),
        pick("sd4-c8-l2-c6", "A book is Rp18.000. You pay Rp20.000. Your change is…", ["two thousand rupiah", "eight thousand rupiah", "twenty thousand rupiah"], 0, "20.000 − 18.000 = 2.000.", { hots: true }),
      ],
    },
    {
      id: "sd4-c8-l3",
      skill: "reading",
      title: "Reading: At the Stationery Shop",
      summary: "Read a shopping conversation, calculate, and write a shopping list.",
      passages: [SHOP],
      sections: [
        {
          title: "Rani goes shopping",
          blocks: [
            { type: "passage", passage: SHOP },
            audio("Listen and read", say(["man", "Good afternoon. Can I help you?"], ["woman", "Yes, please. I want to buy a ruler and two pencils."], ["man", "Here you are. The ruler is five thousand rupiah."], ["woman", "How much is a pencil?"], ["man", "It's three thousand rupiah."], ["woman", "So that's eleven thousand rupiah. Here's twenty thousand."], ["man", "Thank you. Here's your change: nine thousand rupiah."])),
            tryIt(pick("sd4-c8-l3-try1", "What does Rani buy?", ["a ruler and two pencils", "two rulers and a pencil", "a book"], 0, "Baris 2.", { passageId: SHOP.id })),
          ],
        },
        {
          title: "My shopping list",
          blocks: [
            writing({
              id: "sd4-c8-l3-write",
              title: "Shopping list and total",
              prompt: "You have Rp50.000 for new school things. Write a shopping list with prices, the total, and your change.",
              image: "cart",
              minWords: 25,
              maxWords: 90,
              tips: ["1 notebook: Rp8.000", "2 pens: Rp6.000", "Total: … thousand rupiah", "My change: … thousand rupiah"],
              models: [{ label: "Example", text: "My shopping list:\n- 2 notebooks: 16,000 rupiah\n- 1 ruler: 5,000 rupiah\n- 3 pencils: 9,000 rupiah\nThe total is thirty thousand rupiah. I pay fifty thousand rupiah. My change is twenty thousand rupiah." }],
              rubric: ["I listed at least three things with prices.", "My total is correct.", "I wrote one number in words (e.g. thirty thousand).", "My change is correct."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd4-c8-l3-c1", "How much is the ruler?", ["Rp5.000", "Rp3.000", "Rp11.000"], 0, "Baris 3.", { passageId: SHOP.id }),
        pick("sd4-c8-l3-c2", "How much are two pencils?", ["six thousand rupiah", "three thousand rupiah", "nine thousand rupiah"], 0, "2 × 3.000 = 6.000.", { passageId: SHOP.id }),
        fill("sd4-c8-l3-c3", "Complete.", "So that's", "thousand rupiah.", ["eleven"], "Baris 6.", { passageId: SHOP.id }),
        pick("sd4-c8-l3-c4", "How much money does Rani give?", ["twenty thousand", "eleven thousand", "nine thousand"], 0, "Baris 6.", { passageId: SHOP.id }),
        pick("sd4-c8-l3-c5", "Is the change correct?", ["Yes: 20,000 − 11,000 = 9,000.", "No, it should be 11,000.", "No, it should be 1,000."], 0, "20.000 − 11.000 = 9.000. Benar.", { passageId: SHOP.id, hots: true }),
        pick("sd4-c8-l3-c6", "What time of day is it in the shop?", ["afternoon", "morning", "night"], 0, "Baris 1: Good afternoon.", { passageId: SHOP.id }),
      ],
    },
  ],
  quiz: {
    id: "sd4-c8-post",
    title: "Chapter 8 Posttest",
    passPercent: 70,
    passages: [SHOP],
    questions: [
      listen("sd4-c8-post1", voice("Seventy-five."), "Listen. Which number?", ["75", "57", "70", "15"], 0, "Seventy-five = 75."),
      pick("sd4-c8-post2", "Rp100.000 is…", ["one hundred thousand rupiah", "one thousand rupiah", "ten thousand rupiah", "one million rupiah"], 0, "100.000 = one hundred thousand."),
      trPick("sd4-c8-post3", "“Kembalian” in English is…", ["change", "money", "price", "shop"], 0, "Kembalian = change."),
      pick("sd4-c8-post4", "How much ___ this T-shirt?", ["is", "are", "am", "be"], 0, "T-shirt satu → is."),
      arrange("sd4-c8-post5", "Put the words in order.", "How much are the socks", "How much are + benda jamak?"),
      listen("sd4-c8-post6", say(["woman", "Can I help you?"], ["man", "Yes, please. I want two notebooks."]), "Listen. What does he want?", ["two notebooks", "a notebook", "two pencils", "a bag"], 0, "Two notebooks."),
      pick("sd4-c8-post7", "Who says “Here's your change”?", ["the shopkeeper", "Rani", "Rani's mother", "a teacher"], 0, "Baris 7.", { passageId: SHOP.id }),
      fill("sd4-c8-post8", "Write 30 in English.", "30 =", "", ["thirty"], "30 = thirty."),
      pick("sd4-c8-post9", "Rani buys three pencils, not two. What is the new total?", ["fourteen thousand rupiah", "eleven thousand rupiah", "nine thousand rupiah", "eight thousand rupiah"], 0, "5.000 + 3 × 3.000 = 14.000.", { passageId: SHOP.id, hots: true }),
      pick("sd4-c8-post10", "You have Rp10.000. A snack costs Rp4.000. How many snacks can you buy?", ["two", "three", "one", "four"], 0, "2 × 4.000 = 8.000; 3 × 4.000 = 12.000 terlalu banyak.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Shop Till You Drop",
    questions: [
      live("sd4-c8-live1", "40 = …", ["forty", "fourty", "fourteen", "four"], 0, "money"),
      live("sd4-c8-live2", "How ___ is it?", ["much", "many", "old", "long"], 0, "cart"),
      live("sd4-c8-live3", "How much ___ the shoes?", ["are", "is", "am", "do"], 0, "shoes"),
      live("sd4-c8-live4", "Rp5.000 = five ___ rupiah", ["thousand", "thousands", "hundred", "million"], 0, "money"),
      live("sd4-c8-live5", "Shopkeeper: Can I ___ you?", ["help", "buy", "pay", "sell"], 0, "supermarket"),
      live("sd4-c8-live6", "Rp20.000 − Rp12.000 = …", ["eight thousand", "twelve thousand", "two thousand", "ten thousand"], 0, "money"),
      live("sd4-c8-live7", "“Kembalian” is…", ["change", "price", "sale", "bill"], 0, "receipt", true),
      live("sd4-c8-live8", "99 = …", ["ninety-nine", "nineteen-nine", "nine-nine", "ninty-nine"], 0, "num-9"),
    ],
  },
};
