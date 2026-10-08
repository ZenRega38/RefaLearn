import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, say, speaking, text, tip, trPick, tryIt, vocab, voice, warn } from "../kit";

const MARKET: Passage = {
  id: "sd3-b4-market",
  title: "At the Fruit Stall",
  pic: "stall",
  lines: [
    "Bu Tini sells fruit at the market.",
    "She has twelve mangoes.",
    "She has fifteen bananas.",
    "She has eleven oranges.",
    "Dodi buys two mangoes for his mother.",
  ],
};

export const BAB4: Level = {
  id: "sd3-bab4",
  title: "Chapter 4 — Let's Count!",
  description: "Count from 11 to 20, ask “How many…?”, and make plurals with -s.",
  targetScore: "Listening · Speaking · Reading",
  cover: ["num-12", "mango", "banana"],
  pretest: {
    id: "sd3-b4-pre",
    title: "Chapter 4 Pretest",
    passPercent: 0,
    questions: [
      pick("sd3-b4-pre1", "12 in English is…", ["twelve", "twenty", "two", "eleven"], 0, "12 = twelve.", { image: "num-12" }),
      listen("sd3-b4-pre2", voice("Fifteen."), "Listen. Which number?", ["50", "15", "13", "5"], 1, "Fifteen = 15."),
      pick("sd3-b4-pre3", "We use “How many…?” to ask about…", ["a color", "a number of things", "a name", "an age"], 1, "How many = berapa banyak (jumlah)."),
      pick("sd3-b4-pre4", "One book, two…", ["book", "books", "bookes", "a books"], 1, "Satu book, banyak books."),
      pick("sd3-b4-pre5", "20 in English is…", ["twelve", "twenty", "two", "thirty"], 1, "20 = twenty.", { image: "num-20" }),
    ],
  },
  lessons: [
    {
      id: "sd3-b4-l1",
      skill: "vocabulary",
      title: "Numbers 11–20",
      summary: "Eleven to twenty, and how to hear -teen.",
      minutes: 12,
      sections: [
        {
          title: "The teens",
          blocks: [
            text("Kamu sudah jago 1–10. Sekarang naik level ke 11–20! Ketuk kartunya satu per satu, lalu ucapkan bersama, ya."),
            vocab([
              ["eleven", "sebelas", "num-11"],
              ["twelve", "dua belas", "num-12"],
              ["thirteen", "tiga belas", "num-13"],
              ["fourteen", "empat belas", "num-14"],
              ["fifteen", "lima belas", "num-15"],
              ["sixteen", "enam belas", "num-16"],
              ["seventeen", "tujuh belas", "num-17"],
              ["eighteen", "delapan belas", "num-18"],
              ["nineteen", "sembilan belas", "num-19"],
              ["twenty", "dua puluh", "num-20"],
            ]),
            tip("Lihat polanya: 13–19 berakhiran **-teen** (thir**teen**, four**teen**…). Seperti kata *belas* di bahasa Indonesia! Hanya 11 (**eleven**) dan 12 (**twelve**) yang punya nama sendiri."),
          ],
        },
        {
          title: "Teen or ty?",
          blocks: [
            warn("Hati-hati: **fifteen** (15) dan **fifty** (50) bunyinya mirip. Di **-teen**, suaranya lebih panjang dan ditekan di belakang: fif-**TEEN**."),
            audio("Hear the difference", say(["woman", "Fifteen."], ["woman", "Fifty."], ["woman", "Sixteen."], ["woman", "Sixty."])),
            tryIt(listen("sd3-b4-l1-try", voice("Thirteen.", "man"), "Listen. Which number?", ["30", "13", "3", "33"], 1, "Thirteen = 13 (ada -teen).")),
          ],
        },
      ],
      checkpoint: [
        match("sd3-b4-l1-c1", "Match.", [["pic:num-11", "eleven"], ["pic:num-14", "fourteen"], ["pic:num-18", "eighteen"], ["pic:num-20", "twenty"]], "Eleven, fourteen, eighteen, twenty!"),
        listen("sd3-b4-l1-c2", voice("Nineteen."), "Listen. Which number?", ["9", "90", "19", "17"], 2, "Nineteen = 19."),
        fill("sd3-b4-l1-c3", "Write 16 in English.", "16 =", "", ["sixteen"], "16 = sixteen."),
        pick("sd3-b4-l1-c4", "Which number comes after twelve?", ["eleven", "thirteen", "twenty", "fourteen"], 1, "12 → 13 = thirteen."),
        pick("sd3-b4-l1-c5", "Ten + ten = …", ["eleven", "twelve", "twenty", "ten"], 2, "10 + 10 = 20 = twenty.", { hots: true, image: "num-10*2" }),
      ],
    },
    {
      id: "sd3-b4-l2",
      skill: "speaking",
      title: "How Many…?",
      summary: "Asking about numbers and making plurals with -s.",
      minutes: 12,
      sections: [
        {
          title: "One or more?",
          blocks: [
            text("Kalau bendanya **lebih dari satu**, kita tambahkan **-s** di belakangnya."),
            pics([["cat", "one cat"], ["cat*3", "three cats"]]),
            examples([{ right: "one **cat** → three **cats**" }, { right: "one **apple** → five **apples**" }, { right: "one **book** → twelve **books**" }]),
            text("Untuk bertanya jumlah: **How many …?** Contoh: *How many pencils?* — *Twelve pencils.*"),
          ],
        },
        {
          title: "Listen at the canteen",
          blocks: [
            pics(["cake*5"],"Lots of cakes at the canteen!"),
            audio("At the school canteen", say(["man", "How many cakes do you have?"], ["woman", "I have eleven cakes."], ["man", "Wow! Can I have one, please?"], ["woman", "Sure!"])),
            tryIt(arrange("sd3-b4-l2-try", "Put the words in order to make a question.", "How many books", "How many + benda jamak (books).")),
            speaking({
              id: "sd3-b4-l2-say",
              title: "Count things around you",
              prompt: "Count three kinds of things around you. Say: **I have … (number) … (things).**",
              image: "crayon",
              seconds: 40,
              models: [{ label: "Example", text: "I have twelve crayons. I have two pencils. I have one ruler." }],
              rubric: ["I used numbers from 11 to 20 or 1 to 10.", "I added **-s** for more than one.", "I said three sentences."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd3-b4-l2-c1", "Look at the picture. four …", ["apple", "apples", "an apple", "applees"], 1, "Ada empat apel, lebih dari satu → apples.", { image: "apple*4" }),
        listen("sd3-b4-l2-c2", say(["woman", "How many cats?"], ["man", "Seventeen cats."]), "Listen. How many cats?", ["7", "17", "70", "11"], 1, "Seventeen = 17."),
        fill("sd3-b4-l2-c3", "Complete the question.", "How", "pencils do you have?", ["many"], "How many = berapa banyak."),
        pickMany("sd3-b4-l2-c4", "Choose ALL the correct ones.", ["two bags", "one cats", "ten balls", "a books"], [0, 2], "Two bags dan ten balls benar. One cat (tanpa -s), a book (tanpa -s)."),
        pick("sd3-b4-l2-c5", "There are 3 cats. Each cat has 4 legs. How many legs?", ["seven", "twelve", "four", "three"], 1, "3 × 4 = 12 = twelve legs. Kamu pintar berhitung!", { hots: true, image: "cat*3" }),
      ],
    },
    {
      id: "sd3-b4-l3",
      skill: "reading",
      title: "Reading: At the Fruit Stall",
      summary: "Read a story at the fruit market and count.",
      minutes: 10,
      passages: [MARKET],
      sections: [
        {
          title: "At Bu Tini's stall",
          blocks: [
            { type: "passage", passage: MARKET },
            vocab([["mango", "mangga", "mango"], ["banana", "pisang", "banana"], ["orange", "jeruk", "orange-fruit"], ["buy", "membeli", "basket"]]),
            tryIt(pick("sd3-b4-l3-try", "How many bananas does Bu Tini have?", ["eleven", "twelve", "fifteen", "two"], 2, "Baris 3: She has fifteen bananas.", { passageId: MARKET.id })),
          ],
        },
        {
          title: "Plurals with -es",
          blocks: [
            text("Beberapa kata diakhiri **-o** mendapat **-es**: mango → mango**es**, tomato → tomato**es**. Yang lain cukup **-s**: banana**s**, orange**s**."),
            pics([["mango*3", "three mangoes"], ["tomato*2", "two tomatoes"]]),
            tryIt(pick("sd3-b4-l3-try2", "one mango, two …", ["mangoes", "mangos", "mango"], 0, "Mango → mangoes.", { image: "mango*2" })),
          ],
        },
      ],
      checkpoint: [
        pick("sd3-b4-l3-c1", "How many mangoes are at the stall?", ["11", "12", "15", "20"], 1, "Baris 2: twelve mangoes.", { passageId: MARKET.id }),
        pick("sd3-b4-l3-c2", "Which fruit is the fewest?", ["mangoes", "bananas", "oranges", "apples"], 2, "Oranges 11, lebih sedikit dari mangoes (12) dan bananas (15).", { passageId: MARKET.id }),
        fill("sd3-b4-l3-c3", "Complete.", "She has eleven", ".", ["oranges"], "Baris 4: eleven oranges.", { passageId: MARKET.id }),
        pick("sd3-b4-l3-c4", "Who buys mangoes?", ["Bu Tini", "Dodi", "Dodi's mother", "Raka"], 1, "Baris 5: Dodi buys two mangoes.", { passageId: MARKET.id }),
        pick("sd3-b4-l3-c5", "After Dodi buys some, how many mangoes are left?", ["ten", "twelve", "fourteen", "two"], 0, "12 − 2 = 10 = ten mangoes.", { passageId: MARKET.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd3-b4-post",
    title: "Chapter 4 Posttest",
    passPercent: 70,
    passages: [MARKET],
    questions: [
      listen("sd3-b4-post1", voice("Eighteen.", "man"), "Listen. Which number?", ["8", "18", "80", "16"], 1, "Eighteen = 18."),
      pick("sd3-b4-post2", "14 in English is…", ["forty", "fourteen", "four", "fourty"], 1, "14 = fourteen."),
      pick("sd3-b4-post3", "Look at the picture. three …", ["book", "books", "a book", "bookes"], 1, "Ada tiga buku, banyak → books.", { image: "book*3" }),
      arrange("sd3-b4-post4", "Put the words in order.", "I have twenty crayons", "I have + jumlah + benda jamak."),
      match("sd3-b4-post5", "Match.", [["twelve", "pic:num-12"], ["fifteen", "pic:num-15"], ["seventeen", "pic:num-17"], ["twenty", "pic:num-20"]], "Mantap!"),
      fill("sd3-b4-post6", "Write the answer in English.", "Five + six =", "", ["eleven"], "5 + 6 = 11 = eleven."),
      pick("sd3-b4-post7", "How many pieces of fruit were at the stall before Dodi bought any?", ["28", "38", "30", "20"], 1, "12 + 15 + 11 = 38. Soal ini menantang, hebat kalau kamu bisa!", { passageId: MARKET.id, hots: true }),
      pick("sd3-b4-post8", "You heard “fifty”, but your friend has 15 marbles. What did your friend really say?", ["fifty", "fifteen", "five", "fifty-five"], 1, "15 = fifteen (ada -teen di belakang).", { hots: true }),
      trPick("sd3-b4-post9", "“Berapa banyak?” in English is…", ["How many?", "How old?", "What color?", "Where is it?"], 0, "Berapa banyak = How many."),
      pick("sd3-b4-post10", "one tomato, two …", ["tomatoes", "tomatos", "tomato"], 0, "Tomato → tomatoes (+es).", { image: "tomato*2" }),
    ],
  },
  live: {
    title: "Live Quiz — Let's Count!",
    questions: [
      live("sd3-b4-live1", "Which number is it?", ["twelve", "twenty", "eleven", "two"], 0, "num-12"),
      live("sd3-b4-live2", "Ten + five = …", ["fifteen", "fifty", "five", "eleven"], 0, "num-15"),
      live("sd3-b4-live3", "one cat, three…", ["cats", "cat", "cates", "a cats"], 0, "cat*3"),
      live("sd3-b4-live4", "How ___ apples?", ["many", "much", "old", "color"], 0, "apple*4"),
      live("sd3-b4-live5", "After nineteen comes…", ["twenty", "eighteen", "ninety", "twelve"], 0, "num-20"),
      live("sd3-b4-live6", "one mango, two…", ["mangoes", "mangos", "mango", "mangies"], 0, "mango*2"),
      live("sd3-b4-live7", "15 is…", ["fifteen", "fifty", "five-ten", "fiveteen"], 0, "num-15"),
      live("sd3-b4-live8", "3 cats × 4 legs = … legs", ["twelve", "seven", "twenty", "eleven"], 0, "cat*3"),
    ],
  },
};
