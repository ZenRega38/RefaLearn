import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, pics, say, speaking, table, text, tip, trPick, tryIt, vocab, voice } from "../kit";

const LUNCH: Passage = {
  id: "sd3-b6-lunch",
  title: "Lunch with Grandma",
  pic: "lunch",
  lines: [
    "On Sunday, I have lunch at Grandma's house.",
    "Grandma cooks rice, fish, and vegetables.",
    "I like fish. I do not like vegetables.",
    "Grandma says, “Vegetables make you strong!”",
    "So I eat my vegetables too.",
    "After lunch, we drink orange juice.",
  ],
};

export const BAB6: Level = {
  id: "sd3-bab6",
  title: "Chapter 6 — Food I Like",
  description: "Name food and drinks, say what you like and don't like, and ask “Do you like…?”.",
  targetScore: "Listening · Speaking · Reading · Writing",
  cover: ["rice", "juice", "yum"],
  pretest: {
    id: "sd3-b6-pre",
    title: "Chapter 6 Pretest",
    passPercent: 0,
    questions: [
      trPick("sd3-b6-pre1", "“Rice” means…", ["Roti", "Nasi", "Telur", "Susu"], 1, "Rice = nasi."),
      listen("sd3-b6-pre2", voice("Milk."), "Listen. Choose the picture.", ["pic:milk", "pic:bread", "pic:rice", "pic:egg"], 0, "Milk = susu."),
      trPick("sd3-b6-pre3", "“I like apples.” means…", ["Aku tidak suka apel.", "Aku suka apel.", "Aku makan apel.", "Aku beli apel."], 1, "Like = suka.", { image: "apple" }),
      pick("sd3-b6-pre4", "“Do you like bread?” You like bread. You answer…", ["Yes, I do.", "No, I don't.", "Yes, I am.", "I am bread."], 0, "Suka → Yes, I do.", { image: "bread" }),
      pick("sd3-b6-pre5", "Which one is a drink?", ["egg", "water", "rice", "chicken"], 1, "Water = air, termasuk minuman."),
    ],
  },
  lessons: [
    {
      id: "sd3-b6-l1",
      skill: "vocabulary",
      title: "Food and Drinks",
      summary: "Rice, bread, egg, fish, chicken, vegetables, milk, water, juice, tea.",
      minutes: 10,
      sections: [
        {
          title: "Yummy! 😋",
          blocks: [
            text("Apa sarapanmu tadi pagi? Nasi, roti, atau telur? Yuk pelajari nama makanan dan minuman dalam bahasa Inggris!"),
            vocab([
              ["rice", "nasi", "rice", "I eat rice every day."],
              ["bread", "roti", "bread", "I have bread for breakfast."],
              ["egg", "telur", "egg", "I like fried eggs."],
              ["fish", "ikan", "grilled-fish", "Grilled fish is yummy."],
              ["chicken", "ayam", "drumstick", "Fried chicken!"],
              ["vegetables", "sayur-sayuran", "vegetables", "Vegetables are healthy."],
            ], "Food"),
            vocab([
              ["milk", "susu", "milk", "I drink milk."],
              ["water", "air", "water", "Drink water, please."],
              ["juice", "jus", "juice", "Orange juice is sweet."],
              ["tea", "teh", "tea", "Grandpa drinks tea."],
            ], "Drinks"),
          ],
        },
        {
          title: "Food or drink?",
          blocks: [
            tryIt(pickMany("sd3-b6-l1-try", "Choose ALL the drinks.", ["milk", "bread", "juice", "egg", "tea"], [0, 2, 4], "Milk, juice, dan tea adalah minuman (drinks). Bread dan egg makanan (food).")),
            tip("Kita **eat** (makan) food dan **drink** (minum) drinks: *I eat rice. I drink milk.*"),
          ],
        },
      ],
      checkpoint: [
        match("sd3-b6-l1-c1", "Match the pictures with the words.", [["pic:bread", "bread"], ["pic:egg", "egg"], ["pic:vegetables", "vegetables"], ["pic:water", "water"]], "Bread, egg, vegetables, water!"),
        listen("sd3-b6-l1-c2", voice("Juice.", "man"), "Listen. Choose the picture.", ["pic:juice", "pic:milk", "pic:tea", "pic:water"], 0, "Juice = jus."),
        fill("sd3-b6-l1-c3", "Write the name of the food.", "I eat", "every day.", ["rice"], "Gambar itu nasi = rice.", { image: "rice" }),
        trPick("sd3-b6-l1-c4", "“Vegetables” means…", ["buah-buahan", "sayur-sayuran", "minuman", "kue"], 1, "Vegetables = sayur-sayuran."),
        pick("sd3-b6-l1-c5", "Which one is different?", ["milk", "water", "juice", "bread"], 3, "Milk, water, juice itu minuman. Bread itu makanan.", { hots: true }),
      ],
    },
    {
      id: "sd3-b6-l2",
      skill: "speaking",
      title: "I Like… / I Don't Like…",
      summary: "Saying what you like and don't like, and asking “Do you like…?”.",
      minutes: 12,
      sections: [
        {
          title: "Like or don't like?",
          blocks: [
            pics([["yum", "I like…"], ["yuck", "I don't like…"]]),
            table(["Sentence", "Meaning"], [
              ["I like milk. 😋", "Aku suka susu."],
              ["I don't like tea. 😖", "Aku tidak suka teh."],
              ["Do you like eggs?", "Kamu suka telur?"],
              ["Yes, I do. 👍", "Ya, aku suka."],
              ["No, I don't. 👎", "Tidak, aku tidak suka."],
            ]),
            tip("**don't** adalah singkatan dari **do not**. Dua-duanya benar ya!"),
          ],
        },
        {
          title: "Listen to Sinta and Bayu",
          blocks: [
            pics([["girl", "Sinta"], ["boy", "Bayu"]]),
            audio("At break time", say(["woman", "Bayu, do you like bread?"], ["man", "Yes, I do. I like bread with egg."], ["woman", "Do you like milk?"], ["man", "No, I don't. I like water."])),
            tryIt(pick("sd3-b6-l2-try", "What does Bayu NOT like?", ["bread", "egg", "milk", "water"], 2, "Bayu bilang “No, I don't” saat ditanya tentang milk.")),
            speaking({
              id: "sd3-b6-l2-say",
              title: "Food survey",
              prompt: "Ask a family member three questions with **Do you like…?** Then tell us one answer.",
              image: "lunch",
              seconds: 45,
              models: [{ label: "Example", text: "Mom, do you like fish? Yes, I do. Do you like tea? No, I don't. My mom likes fish, but she doesn't like tea." }],
              rubric: ["I asked with **Do you like…?**", "I used **Yes, I do / No, I don't**.", "I reported one answer."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd3-b6-l2-c1", "“Do you like fish?” You like fish. You answer…", ["Yes, I do.", "No, I don't.", "Yes, I like.", "I am fish."], 0, "Suka → Yes, I do.", { image: "grilled-fish" }),
        listen("sd3-b6-l2-c2", voice("I don't like vegetables."), "Listen. What doesn't she like?", ["pic:vegetables", "pic:rice", "pic:milk", "pic:drumstick"], 0, "Vegetables = sayur."),
        arrange("sd3-b6-l2-c3", "Put the words in order to make a question.", "Do you like chicken", "Do you like + makanan?"),
        fill("sd3-b6-l2-c4", "Complete the answer (you don't like it).", "No, I", ".", ["don't", "do not", "dont"], "No, I don't.", { image: "yuck" }),
        pick("sd3-b6-l2-c5", "Your friend is allergic to eggs. Someone asks “Do you like eggs?”. The MOST sensible answer is…", ["Yes, I do. I eat eggs every day.", "No, I don't. I can't eat eggs.", "Yes, I am.", "I like eggs very much!"], 1, "Kalau alergi, ia tidak bisa makan telur, jadi jawabannya No, I don't.", { hots: true, image: "egg" }),
      ],
    },
    {
      id: "sd3-b6-l3",
      skill: "reading",
      title: "Reading: Lunch with Grandma",
      summary: "Read a story about lunch at Grandma's house.",
      minutes: 12,
      passages: [LUNCH],
      sections: [
        {
          title: "Lunch at Grandma's",
          blocks: [
            pics([["grandmother", "Grandma"], "lunch"]),
            { type: "passage", passage: LUNCH },
            tryIt(pick("sd3-b6-l3-try", "When does the child have lunch at Grandma's house?", ["Monday", "Saturday", "Sunday", "Friday"], 2, "Baris 1: On Sunday.", { passageId: LUNCH.id })),
          ],
        },
        {
          title: "Write about your food",
          blocks: [
            text("Sekarang coba ceritakan makanan kesukaanmu dengan pola ini:\n\n- I like **(food)**.\n- I don't like **(food)**.\n- I drink **(drink)** every morning."),
            tryIt(arrange("sd3-b6-l3-try2", "Put the words in order about a morning drink.", "I drink milk every morning", "I drink + minuman + every morning = Aku minum … setiap pagi.", { image: "milk" })),
            {
              type: "task",
              kind: "writing",
              id: "sd3-b6-l3-write",
              title: "My favorite food",
              prompt: "Write four sentences about the food and drinks you like and don't like.",
              minWords: 15,
              maxWords: 60,
              tips: ["I like …", "I don't like …", "I drink … every morning.", "My favorite food is …"],
              models: [{ label: "Example", text: "I like fried chicken. I like rice too. I don't like tea. I drink milk every morning. My favorite food is nasi goreng!" }],
              rubric: ["I used **I like** and **I don't like**.", "I used **eat** for food and **drink** for drinks.", "I wrote at least four sentences."],
            },
          ],
        },
      ],
      checkpoint: [
        pickMany("sd3-b6-l3-c1", "Choose ALL the food Grandma cooks.", ["rice", "bread", "fish", "vegetables", "egg"], [0, 2, 3], "Baris 2: rice, fish, and vegetables.", { passageId: LUNCH.id }),
        pick("sd3-b6-l3-c2", "What does the child not like?", ["fish", "rice", "vegetables", "orange juice"], 2, "Baris 3: I do not like vegetables.", { passageId: LUNCH.id }),
        fill("sd3-b6-l3-c3", "Complete.", "After lunch, we drink orange", ".", ["juice"], "Baris 6: orange juice.", { passageId: LUNCH.id }),
        pick("sd3-b6-l3-c4", "Grandma says vegetables make you…", ["sleepy", "strong", "sad", "small"], 1, "Baris 4: Vegetables make you strong!", { passageId: LUNCH.id }),
        pick("sd3-b6-l3-c5", "Why does the child eat the vegetables in the end?", ["Because they are sweet.", "Because Grandma says vegetables make you strong.", "Because the child is very hungry.", "Because there is no fish."], 1, "Baris 4–5: Nenek bilang sayur membuat kuat, jadi ia makan sayurnya.", { passageId: LUNCH.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd3-b6-post",
    title: "Chapter 6 Posttest",
    passPercent: 70,
    passages: [LUNCH],
    questions: [
      trPick("sd3-b6-post1", "“Bread” means…", ["Nasi", "Roti", "Telur", "Kue"], 1, "Bread = roti."),
      listen("sd3-b6-post2", voice("I like chicken.", "man"), "Listen. What does he like?", ["pic:drumstick", "pic:grilled-fish", "pic:egg", "pic:vegetables"], 0, "Chicken = ayam."),
      pick("sd3-b6-post3", "“Do you like tea?” You don't like tea. You answer…", ["Yes, I do.", "No, I don't.", "No, I do.", "Yes, I don't."], 1, "Tidak suka → No, I don't.", { image: "tea" }),
      arrange("sd3-b6-post4", "Put the words in order.", "I do not like milk", "I do not like + makanan/minuman."),
      match("sd3-b6-post5", "Match.", [["pic:rice", "rice"], ["pic:milk", "milk"], ["pic:tea", "tea"], ["pic:juice", "juice"]], "Rice, milk, tea, juice!"),
      pick("sd3-b6-post6", "What do they drink after lunch?", ["milk", "tea", "orange juice", "water"], 2, "Baris 6: orange juice.", { passageId: LUNCH.id }),
      pick("sd3-b6-post7", "Dodi doesn't like milk. Which breakfast is BEST for Dodi?", ["Bread and milk", "Rice, egg, and water", "Milk only", "Cereal with milk"], 1, "Pilih sarapan tanpa susu: rice, egg, and water.", { hots: true }),
      pick("sd3-b6-post8", "Which sentence is TRUE about the child in the story?", ["The child never eats vegetables.", "The child likes fish and tries vegetables.", "The child doesn't like fish.", "The child has lunch at school."], 1, "Ia suka ikan (baris 3) dan akhirnya tetap makan sayur (baris 5).", { passageId: LUNCH.id, hots: true }),
      pick("sd3-b6-post9", "We ___ milk.", ["drink", "eat", "cook", "wear"], 0, "Minuman → drink.", { image: "milk" }),
      trPick("sd3-b6-post10", "“Aku tidak suka teh.” in English is…", ["I don't like tea.", "I like tea.", "Do you like tea?", "I am tea."], 0, "Tidak suka = don't like."),
    ],
  },
  live: {
    title: "Live Quiz — Yummy Food",
    questions: [
      live("sd3-b6-live1", "What is it?", ["rice", "bread", "egg", "milk"], 0, "rice"),
      live("sd3-b6-live2", "Which one is a drink?", ["juice", "egg", "bread", "chicken"], 0, "juice"),
      live("sd3-b6-live3", "Do you like fish? (yes)", ["Yes, I do.", "Yes, I am.", "No, I don't.", "Yes, I like."], 0, "grilled-fish"),
      live("sd3-b6-live4", "I ___ like tea. (not)", ["don't", "doesn't", "am not", "no"], 0, "tea"),
      live("sd3-b6-live5", "What is it?", ["vegetables", "fruit", "cake", "bread"], 0, "vegetables"),
      live("sd3-b6-live6", "We ___ water.", ["drink", "eat", "wear", "read"], 0, "water"),
      live("sd3-b6-live7", "Grandma: Vegetables make you…", ["strong", "sleepy", "sad", "small"], 0, "grandmother"),
      live("sd3-b6-live8", "“Telur” is…", ["egg", "milk", "rice", "bread"], 0, "egg", true),
    ],
  },
};
