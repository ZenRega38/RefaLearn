import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, fill, listen, live, match, pick, pickMany, pics, say, speaking, table, text, tip, trFill, trMatch, trPick, tryIt, vocab, voice, audio } from "../kit";

const SARI = { id: "sd3-b1-sari", title: "Hello, I am Sari!", pic: "girl", lines: ["Hello! My name is Sari.", "I am eight years old.", "I am in grade three.", "I live in Tarakan.", "Nice to meet you!"] };

export const BAB1: Level = {
  id: "sd3-bab1",
  title: "Chapter 1 — Hello, Friends!",
  description: "Greet friends and teachers at different times of day, introduce yourself, and say your age with numbers 1–10.",
  targetScore: "Listening · Speaking",
  cover: ["hello", "goodbye", "num-8"],
  pretest: {
    id: "sd3-b1-pre",
    title: "Chapter 1 Pretest",
    passPercent: 0,
    questions: [
      trPick("sd3-b1-pre1", "“Hello” means…", ["Halo", "Selamat tidur", "Terima kasih", "Sampai jumpa"], 0, "Hello = halo. Kata sapaan paling umum dalam bahasa Inggris."),
      pick("sd3-b1-pre2", "In the morning we say…", ["Good night", "Good morning", "Goodbye", "Good evening"], 1, "Morning = pagi, jadi “Good morning” = selamat pagi.", { image: "morning" }),
      listen("sd3-b1-pre3", voice("Five."), "Listen. Which number do you hear?", ["pic:num-3", "pic:num-5", "pic:num-7", "pic:num-9"], 1, "Five = lima."),
      trPick("sd3-b1-pre4", "“What is your name?” means…", ["Berapa umurmu?", "Siapa namamu?", "Di mana rumahmu?", "Apa kabar?"], 1, "Name = nama. What is your name? = Siapa namamu?"),
      pick("sd3-b1-pre5", "You leave your friend. You say…", ["Hello", "Good morning", "Goodbye", "Thank you"], 2, "Goodbye = selamat tinggal / sampai jumpa."),
    ],
  },
  lessons: [
    {
      id: "sd3-b1-l1",
      skill: "vocabulary",
      title: "Greetings",
      summary: "Hello, good morning, good afternoon, good evening, good night, goodbye.",
      minutes: 10,
      sections: [
        {
          title: "Let's say hello!",
          blocks: [
            pics([["owl-wave", "Oli"]], "Halo! Aku Oli si burung hantu. Aku akan menemanimu belajar bahasa Inggris. Let's go!"),
            text("Halo! 👋 Kalau ketemu teman atau guru, pasti kita menyapa dulu, kan? Dalam bahasa Inggris, sapaannya beda-beda tergantung **waktunya**. Ketuk kartu di bawah untuk mendengar cara mengucapkannya."),
            vocab([
              ["Hello", "Halo (kapan saja)", "hello"],
              ["Good morning", "Selamat pagi", "morning"],
              ["Good afternoon", "Selamat siang/sore", "afternoon"],
              ["Good evening", "Selamat malam (saat bertemu)", "evening"],
              ["Good night", "Selamat tidur / malam (saat berpisah)", "night"],
              ["Goodbye", "Sampai jumpa", "goodbye"],
            ]),
            tip("Hati-hati ya: **Good night** dipakai saat mau **tidur** atau **berpisah** di malam hari, bukan saat bertemu. Kalau bertemu di malam hari, pakai **Good evening**."),
          ],
        },
        {
          title: "Guess the greeting",
          blocks: [
            tryIt(pick("sd3-b1-l1-try1", "It's 7 a.m. You meet your teacher at the school gate. You say…", ["Good night, Ma'am!", "Good morning, Ma'am!", "Goodbye, Ma'am!", "Good evening, Ma'am!"], 1, "Jam 7 itu pagi, jadi sapaannya Good morning. Ma'am dipakai untuk guru perempuan, Sir untuk guru laki-laki.", { image: "teacher-woman" })),
            tryIt(match("sd3-b1-l1-try2", "Match the time with the greeting.", [["pic:morning|Morning", "Good morning"], ["pic:afternoon|Afternoon", "Good afternoon"], ["pic:evening|Evening (meeting)", "Good evening"], ["pic:night|Bedtime", "Good night"]], "Sapaan mengikuti waktu: morning (pagi), afternoon (siang–sore), evening (malam), night (mau tidur).")),
          ],
        },
      ],
      checkpoint: [
        trPick("sd3-b1-l1-c1", "“Good afternoon” means…", ["Selamat pagi", "Selamat siang", "Selamat tidur", "Sampai jumpa"], 1, "Afternoon = siang sampai sore."),
        listen("sd3-b1-l1-c2", voice("Good night, Mom!", "man"), "Listen. When does the boy say it?", ["pic:morning|Waking up", "pic:night|Going to bed", "pic:afternoon|After school", "pic:lunch|Lunchtime"], 1, "Good night diucapkan saat mau tidur."),
        fill("sd3-b1-l1-c3", "Complete the greeting for the morning.", "Good", "!", ["morning"], "Selamat pagi = Good morning.", { image: "morning" }),
        pick("sd3-b1-l1-c4", "School is over. You leave your best friend. You say…", ["Good morning!", "Hello!", "Goodbye!", "Good evening!"], 2, "Saat berpisah kita bilang Goodbye atau Bye!"),
        pick("sd3-b1-l1-c5", "It's 8 p.m. Your aunt visits your house. The best greeting is…", ["Good night, Auntie!", "Good evening, Auntie!", "Good morning, Auntie!", "Goodbye, Auntie!"], 1, "Malam hari dan baru bertemu → Good evening. Good night dipakai saat berpisah atau mau tidur.", { hots: true, image: "evening" }),
      ],
    },
    {
      id: "sd3-b1-l2",
      skill: "speaking",
      title: "Introducing Myself",
      summary: "My name is…, I am … years old, and asking a friend's name.",
      minutes: 12,
      sections: [
        {
          title: "Listen to Dina and Beni",
          blocks: [
            pics([["girl", "Dina"], ["boy", "Beni"]]),
            text("Dina anak baru di kelas 3. Yuk dengarkan bagaimana dia berkenalan dengan Beni."),
            audio("Dina meets Beni", say(
              ["woman", "Hello! My name is Dina. What is your name?"],
              ["man", "Hi, Dina! My name is Beni. How old are you?"],
              ["woman", "I am eight years old."],
              ["man", "Me too! Nice to meet you, Dina."],
              ["woman", "Nice to meet you too, Beni."]
            )),
            table(["Sentence", "Meaning"], [
              ["My name is Dina.", "Namaku Dina."],
              ["What is your name?", "Siapa namamu?"],
              ["How old are you?", "Berapa umurmu?"],
              ["I am eight years old.", "Umurku delapan tahun."],
              ["Nice to meet you.", "Senang bertemu denganmu."],
            ]),
          ],
        },
        {
          title: "Numbers 1–10",
          blocks: [
            text("Untuk menyebut umur, kita butuh angka. Ketuk kartunya dan tirukan pelan-pelan ya!"),
            vocab([
              ["one", "satu", "num-1"],
              ["two", "dua", "num-2"],
              ["three", "tiga", "num-3"],
              ["four", "empat", "num-4"],
              ["five", "lima", "num-5"],
              ["six", "enam", "num-6"],
              ["seven", "tujuh", "num-7"],
              ["eight", "delapan", "num-8"],
              ["nine", "sembilan", "num-9"],
              ["ten", "sepuluh", "num-10"],
            ]),
            tryIt(arrange("sd3-b1-l2-try", "Put the words in order to introduce yourself.", "My name is Beni", "Pola perkenalan: My name is + nama.")),
            speaking({
              id: "sd3-b1-l2-say",
              title: "Introduce yourself",
              prompt: "Say your name and your age.",
              image: "owl-wave",
              seconds: 20,
              tips: ["Hello! My name is ____.", "I am ____ years old.", "Nice to meet you!"],
              models: [{ label: "Example", text: "Hello! My name is Raka. I am nine years old. Nice to meet you!" }],
              rubric: ["I said my name.", "I said my age with **years old**.", "I said **Nice to meet you**."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd3-b1-l2-c1", voice("I am nine years old."), "Listen. How old is she?", ["7", "8", "9", "10"], 2, "Nine = sembilan."),
        arrange("sd3-b1-l2-c2", "Put the words in order to ask a friend's name.", "What is your name", "What is your name? = Siapa namamu?"),
        fill("sd3-b1-l2-c3", "Write the number in English.", "I am", "years old.", ["eight"], "8 = eight.", { image: "num-8" }),
        match("sd3-b1-l2-c4", "Match the numbers with the words.", [["pic:num-3", "three"], ["pic:num-6", "six"], ["pic:num-7", "seven"], ["pic:num-10", "ten"]], "Three, six, seven, ten — bagus!"),
        pick("sd3-b1-l2-c5", "Beni asks “How old are you?”. Dina's best answer is…", ["My name is Dina.", "I am eight years old.", "Good morning.", "Nice to meet you."], 1, "How old are you? menanyakan umur, jadi jawabannya tentang umur.", { hots: true }),
      ],
    },
    {
      id: "sd3-b1-l3",
      skill: "reading",
      title: "Reading and Writing: My Name Card",
      summary: "Read a friend's name card and write your own.",
      minutes: 10,
      passages: [SARI],
      sections: [
        {
          title: "Read Sari's card",
          blocks: [
            { type: "passage", passage: SARI },
            tryIt(pick("sd3-b1-l3-try", "Where does Sari live?", ["Jakarta", "Tarakan", "Bandung", "Grade three"], 1, "Baris 4: I live in Tarakan.", { passageId: SARI.id })),
          ],
        },
        {
          title: "Now it's your turn!",
          blocks: [
            text("Kamu bisa membuat kartu perkenalan sendiri dengan pola ini:\n\n- Hello! My name is **(namamu)**.\n- I am **(umur)** years old.\n- I am in grade **three**.\n- I live in **(kotamu)**."),
            tip("Nama orang dan nama kota selalu diawali **huruf kapital**: **S**ari, **T**arakan."),
            pics([["owl-read", "Oli's card"]], "Oli sudah menulis kartunya. Sekarang giliranmu!"),
            {
              type: "task",
              kind: "writing",
              id: "sd3-b1-l3-write",
              title: "My name card",
              prompt: "Write your own name card. Use four sentences like Sari.",
              minWords: 12,
              maxWords: 40,
              tips: ["Hello! My name is …", "I am … years old.", "I am in grade three.", "I live in …"],
              models: [{ label: "Example", text: "Hello! My name is Raka.\nI am nine years old.\nI am in grade three.\nI live in Balikpapan.\nNice to meet you!" }],
              rubric: ["I wrote my name and age.", "I wrote my grade and my city.", "Names of people and cities start with a capital letter.", "Every sentence ends with a full stop (.) or an exclamation mark (!)."],
            },
          ],
        },
      ],
      checkpoint: [
        pick("sd3-b1-l3-c1", "How old is Sari?", ["7", "8", "9", "3"], 1, "Baris 2: I am eight years old.", { passageId: SARI.id }),
        fill("sd3-b1-l3-c2", "Complete Sari's sentence.", "I am in grade", ".", ["three", "3"], "Sari kelas tiga → grade three.", { passageId: SARI.id }),
        pickMany("sd3-b1-l3-c3", "Choose ALL the words that must start with a capital letter.", ["sari", "tarakan", "name", "dina"], [0, 1, 3], "Nama orang (Sari, Dina) dan nama kota (Tarakan) diawali huruf kapital."),
        arrange("sd3-b1-l3-c4", "Put the words in order.", "I live in Tarakan", "I live in + nama kota = Aku tinggal di …"),
        pick("sd3-b1-l3-c5", "Which sentence does NOT belong on a name card?", ["My name is Raka.", "I am nine years old.", "Good night, Mom!", "I live in Tarakan."], 2, "Good night, Mom! itu ucapan mau tidur, bukan perkenalan diri.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd3-b1-post",
    title: "Chapter 1 Posttest",
    passPercent: 70,
    questions: [
      trPick("sd3-b1-post1", "“Selamat siang” in English is…", ["Good morning", "Good afternoon", "Good night", "Goodbye"], 1, "Good afternoon = selamat siang.", { image: "afternoon" }),
      listen("sd3-b1-post2", voice("Hello, my name is Raka.", "man"), "Listen. What is the boy's name?", ["Rina", "Raka", "Beni", "Dina"], 1, "My name is Raka."),
      listen("sd3-b1-post3", voice("Seven."), "Listen. Which number?", ["pic:num-6", "pic:num-7", "pic:num-8", "pic:num-9"], 1, "Seven = tujuh."),
      arrange("sd3-b1-post4", "Put the words in order to ask someone's age.", "How old are you", "How old are you? = Berapa umurmu?"),
      fill("sd3-b1-post5", "Complete.", "Nice to", "you!", ["meet"], "Nice to meet you = senang bertemu denganmu."),
      match("sd3-b1-post6", "Match.", [["two", "pic:num-2"], ["four", "pic:num-4"], ["nine", "pic:num-9"], ["five", "pic:num-5"]], "Two, four, five, nine."),
      pick("sd3-b1-post7", "Early in the morning, Rina meets her male teacher. She wants to be polite. She says…", ["Bye, Sir!", "Good morning, Sir!", "Good night, Sir!", "Hello, Mom!"], 1, "Pagi hari + guru laki-laki → Good morning, Sir!", { hots: true, image: "teacher-man" }),
      pick("sd3-b1-post8", "Beni is 8. His little brother is 2 years younger. His brother says…", ["I am six years old.", "I am ten years old.", "I am eight years old.", "I am two years old."], 0, "8 − 2 = 6, jadi adiknya six years old.", { hots: true }),
      trMatch("sd3-b1-post9", "Match the greeting and its meaning.", [["Good evening", "Selamat malam (bertemu)"], ["Good night", "Selamat tidur"], ["Goodbye", "Sampai jumpa"]], "Evening untuk bertemu malam hari, night untuk tidur, goodbye untuk berpisah."),
      trFill("sd3-b1-post10", "Write in English: “Aku tinggal di Tarakan.”", "I", "in Tarakan.", ["live"], "Aku tinggal di = I live in."),
    ],
  },
  live: {
    title: "Live Quiz — Hello, Friends!",
    questions: [
      live("sd3-b1-live1", "It's 7 a.m. You say…", ["Good morning!", "Good night!", "Good evening!", "Goodbye!"], 0, "morning"),
      live("sd3-b1-live2", "You go to bed. You say…", ["Good night!", "Good morning!", "Hello!", "Good afternoon!"], 0, "night"),
      live("sd3-b1-live3", "What number is it?", ["eight", "six", "three", "nine"], 0, "num-8"),
      live("sd3-b1-live4", "How old are you? — I am nine ___ old.", ["years", "year", "name", "grade"], 0, "num-9"),
      live("sd3-b1-live5", "What ___ your name?", ["is", "are", "am", "do"], 0, "girl"),
      live("sd3-b1-live6", "It's 8 p.m. A guest arrives. You say…", ["Good evening!", "Good night!", "Good morning!", "Bye!"], 0, "evening"),
      live("sd3-b1-live7", "Which word needs a capital letter?", ["tarakan", "name", "years", "grade"], 0, "pin"),
      live("sd3-b1-live8", "Seven + two = …", ["nine", "eight", "ten", "five"], 0, "num-9"),
    ],
  },
};
