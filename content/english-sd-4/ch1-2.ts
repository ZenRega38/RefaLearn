import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 4 (Fase B). Chapter 1 — What Time Is It? · Chapter 2 — Months and Birthdays

const SCHEDULE: Passage = {
  id: "sd4-c1-day",
  title: "Rina's School Day",
  pic: "clock",
  lines: [
    "Rina wakes up at five thirty every morning.",
    "She takes a bath and has breakfast at six o'clock.",
    "School starts at seven o'clock.",
    "She has a break at nine thirty. She eats a banana.",
    "School finishes at twelve o'clock.",
    "In the afternoon, she does her homework at three o'clock.",
    "She goes to bed at nine o'clock at night.",
  ],
};

export const CH1: Level = {
  id: "sd4-ch1",
  title: "Chapter 1 — What Time Is It?",
  description: "Tell the time (o'clock and half past), ask “What time is it?”, and talk about your daily schedule.",
  targetScore: "Listening · Speaking · Reading",
  cover: ["time-7", "clock", "alarm"],
  pretest: {
    id: "sd4-c1-pre",
    title: "Chapter 1 Pretest",
    passPercent: 0,
    questions: [
      pick("sd4-c1-pre1", "What time is it?", ["It's seven o'clock.", "It's five o'clock.", "It's half past seven.", "It's twelve o'clock."], 0, "Jarum pendek di angka 7, jarum panjang di angka 12 → seven o'clock.", { image: "time-7" }),
      listen("sd4-c1-pre2", voice("It's three o'clock."), "Listen. Choose the clock.", ["pic:time-3", "pic:time-8", "pic:time-12", "pic:time-6"], 0, "Three o'clock = jam tiga."),
      trPick("sd4-c1-pre3", "“Jam berapa sekarang?” in English is…", ["What time is it?", "How old are you?", "What day is it?", "How many?"], 0, "Jam berapa = What time is it?"),
      pick("sd4-c1-pre4", "“Half past” means…", ["30 minutes after the hour", "15 minutes after the hour", "o'clock", "midnight"], 0, "Half = setengah. Half past = lewat 30 menit.", { image: "time-7-30" }),
      pick("sd4-c1-pre5", "You usually have lunch at…", ["twelve o'clock", "three o'clock at night", "five o'clock in the morning"], 0, "Makan siang biasanya jam dua belas siang."),
    ],
  },
  lessons: [
    {
      id: "sd4-c1-l1",
      skill: "vocabulary",
      title: "O'clock and Half Past",
      summary: "Read the clock: seven o'clock, half past seven.",
      sections: [
        {
          title: "Two hands on the clock",
          blocks: [
            pics([["time-3", "three o'clock"], ["time-3-30", "half past three"]]),
            text("Jam punya dua jarum. **Jarum pendek** (merah) menunjukkan **jam**. **Jarum panjang** (hitam) menunjukkan **menit**.\n\n- Jarum panjang di **12** → **… o'clock** (tepat): *It's three o'clock.*\n- Jarum panjang di **6** → **half past …** (lewat setengah): *It's half past three.* (3.30)"),
            repeat(["It's one o'clock.", "It's six o'clock.", "It's half past six.", "It's half past ten.", "It's twelve o'clock."]),
          ],
        },
        {
          title: "Read the clocks",
          blocks: [
            vocab([
              ["one o'clock", "jam satu", "time-1"],
              ["four o'clock", "jam empat", "time-4"],
              ["half past four", "jam setengah lima (4.30)", "time-4-30"],
              ["nine o'clock", "jam sembilan", "time-9"],
              ["half past nine", "jam setengah sepuluh (9.30)", "time-9-30"],
              ["twelve o'clock", "jam dua belas", "time-12"],
            ]),
            warn("Hati-hati! **Half past four** = 4.30, padahal dalam bahasa Indonesia kita bilang *setengah lima*. Bahasa Inggris memakai jam **sebelumnya** (four), bahasa Indonesia memakai jam **sesudahnya** (lima)."),
            tryIt(pick("sd4-c1-l1-try1", "What time is it?", ["half past eight", "half past nine", "eight o'clock"], 0, "Jarum pendek di antara 8 dan 9, jarum panjang di 6 → half past eight (8.30).", { image: "time-8-30" })),
          ],
        },
      ],
      checkpoint: [
        pick("sd4-c1-l1-c1", "What time is it?", ["It's eleven o'clock.", "It's half past eleven.", "It's twelve o'clock."], 0, "Jarum panjang di 12 → o'clock.", { image: "time-11" }),
        listen("sd4-c1-l1-c2", voice("It's half past two."), "Listen. Choose the clock.", ["pic:time-2-30", "pic:time-2", "pic:time-6"], 0, "Half past two = 2.30."),
        match("sd4-c1-l1-c3", "Match the clock and the time.", [["pic:time-5", "five o'clock"], ["pic:time-5-30", "half past five"], ["pic:time-10", "ten o'clock"], ["pic:time-10-30", "half past ten"]], "Bagus! Kamu bisa membaca jam."),
        trPick("sd4-c1-l1-c4", "“Jam setengah delapan (7.30)” in English is…", ["half past seven", "half past eight", "seven o'clock"], 0, "7.30 = half past seven (bukan eight!)."),
        fill("sd4-c1-l1-c5", "Complete: 6.00 = six ___", "6.00 = six", "", ["o'clock", "oclock", "o clock"], "Tepat jam enam = six o'clock."),
        pick("sd4-c1-l1-c6", "It's half past one now. What time is it in 30 minutes?", ["two o'clock", "half past two", "one o'clock"], 0, "1.30 + 30 menit = 2.00 = two o'clock.", { hots: true, image: "time-1-30" }),
      ],
    },
    {
      id: "sd4-c1-l2",
      skill: "speaking",
      title: "What Time Do You…?",
      summary: "What time do you get up? I get up at six o'clock. a.m. and p.m.",
      sections: [
        {
          title: "Ask about the time",
          blocks: [
            audio("Morning talk", say(["man", "What time is it?"], ["woman", "It's half past six."], ["man", "Oh no! I'm late! What time does school start?"], ["woman", "At seven o'clock. Hurry up!"])),
            table(["Question", "Answer"], [["What time is it?", "It's half past six."], ["What time do you get up?", "I get up at five thirty."], ["What time does school start?", "It starts at seven o'clock."]]),
            tip("Untuk menyebut **pada** jam tertentu, pakai **at**: *at seven o'clock*, *at half past six*. Kita juga bisa bilang *at six thirty* (6.30)."),
          ],
        },
        {
          title: "Morning or night?",
          blocks: [
            text("**a.m.** = tengah malam sampai siang (00.00–11.59). **p.m.** = siang sampai malam (12.00–23.59).\n\n- 7 a.m. = jam 7 pagi\n- 7 p.m. = jam 7 malam"),
            pics([["morning", "7 a.m."], ["night", "7 p.m."]]),
            tryIt(pick("sd4-c1-l2-try1", "You go to bed at…", ["9 p.m.", "9 a.m.", "12 p.m."], 0, "Tidur malam hari → p.m.", { image: "sleep" })),
            speaking({
              id: "sd4-c1-l2-say",
              title: "My times",
              prompt: "Answer three questions: **What time do you get up? What time do you go to school? What time do you go to bed?**",
              image: "alarm",
              seconds: 45,
              tips: ["I get up at …", "I go to school at …", "I go to bed at … p.m."],
              models: [{ label: "Example", text: "I get up at half past five. I go to school at half past six. I go to bed at nine o'clock p.m." }],
              rubric: ["I used **at** before every time.", "I said o'clock or half past correctly.", "I answered all three questions."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd4-c1-l2-c1", say(["man", "What time does school start?"], ["woman", "At seven o'clock."]), "Listen. When does school start?", ["7.00", "7.30", "6.00"], 0, "At seven o'clock = jam 7.00."),
        arrange("sd4-c1-l2-c2", "Put the words in order.", "What time do you get up", "What time do you + kegiatan?"),
        fill("sd4-c1-l2-c3", "Complete: I go to school ___ six thirty.", "I go to school", "six thirty.", ["at"], "Pada jam tertentu → at."),
        pick("sd4-c1-l2-c4", "8 o'clock in the evening is…", ["8 p.m.", "8 a.m.", "8 o'clock morning"], 0, "Malam hari → p.m."),
        trPick("sd4-c1-l2-c5", "“Aku bangun jam lima.” in English is…", ["I get up at five o'clock.", "I go to bed at five o'clock.", "It's five o'clock."], 0, "Bangun = get up."),
        pick("sd4-c1-l2-c6", "School starts at 7.00. It takes 30 minutes to walk. When must you leave home?", ["at half past six", "at seven o'clock", "at half past seven"], 0, "7.00 − 30 menit = 6.30 = half past six.", { hots: true }),
      ],
    },
    {
      id: "sd4-c1-l3",
      skill: "reading",
      title: "Reading: Rina's School Day",
      summary: "Read a schedule and write your own.",
      passages: [SCHEDULE],
      sections: [
        {
          title: "Read about Rina",
          blocks: [
            { type: "passage", passage: SCHEDULE },
            audio("Listen and read", say(["woman", SCHEDULE.lines.join(" ")])),
            tip("Lihat kata kerja di teks: wake**s**, take**s**, start**s**. Untuk **she/he**, kata kerja mendapat **-s** atau **-es** (go → go**es**, do → do**es**)."),
            tryIt(pick("sd4-c1-l3-try1", "What time does Rina wake up?", ["at five thirty", "at six o'clock", "at seven o'clock"], 0, "Baris 1: at five thirty.", { passageId: SCHEDULE.id })),
          ],
        },
        {
          title: "Write your schedule",
          blocks: [
            writing({
              id: "sd4-c1-l3-write",
              title: "My school day",
              prompt: "Write about your school day. Use at least five sentences with times.",
              image: "school",
              minWords: 30,
              maxWords: 90,
              tips: ["I wake up at …", "School starts at …", "I have a break at …", "I do my homework at …", "I go to bed at …"],
              models: [{ label: "Example", text: "I wake up at five o'clock. I have breakfast at half past five. School starts at seven o'clock. I have a break at nine thirty. School finishes at twelve o'clock. I go to bed at nine p.m." }],
              rubric: ["I wrote at least five sentences.", "Every time has **at**.", "I used o'clock / half past correctly.", "My sentences are in the right order (morning → night)."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd4-c1-l3-c1", "What time does school start?", ["seven o'clock", "six o'clock", "nine thirty"], 0, "Baris 3.", { passageId: SCHEDULE.id }),
        pick("sd4-c1-l3-c2", "What does Rina eat at break time?", ["a banana", "rice", "bread"], 0, "Baris 4: She eats a banana.", { passageId: SCHEDULE.id }),
        fill("sd4-c1-l3-c3", "Complete.", "She goes to bed at nine o'clock at", ".", ["night"], "Baris 7.", { passageId: SCHEDULE.id }),
        pickMany("sd4-c1-l3-c4", "Choose ALL the things Rina does in the morning.", ["wakes up", "has breakfast", "does homework", "goes to bed"], [0, 1], "Bangun dan sarapan di pagi hari. PR sore, tidur malam.", { passageId: SCHEDULE.id }),
        pick("sd4-c1-l3-c5", "How long is Rina at school?", ["five hours", "two hours", "seven hours"], 0, "Jam 7.00 sampai 12.00 = 5 jam.", { passageId: SCHEDULE.id, hots: true }),
        pick("sd4-c1-l3-c6", "Which word is correct? “Rina ___ to bed at nine.”", ["goes", "go", "going"], 0, "She/he + goes."),
      ],
    },
  ],
  quiz: {
    id: "sd4-c1-post",
    title: "Chapter 1 Posttest",
    passPercent: 70,
    passages: [SCHEDULE],
    questions: [
      pick("sd4-c1-post1", "What time is it?", ["half past four", "half past five", "four o'clock", "six o'clock"], 0, "4.30 = half past four.", { image: "time-4-30" }),
      listen("sd4-c1-post2", voice("It's twelve o'clock."), "Listen. Choose the clock.", ["pic:time-12", "pic:time-2", "pic:time-6", "pic:time-9"], 0, "Twelve o'clock = jam 12."),
      trPick("sd4-c1-post3", "“Jam setengah sepuluh (9.30)” in English is…", ["half past nine", "half past ten", "nine o'clock", "ten o'clock"], 0, "9.30 = half past nine."),
      arrange("sd4-c1-post4", "Put the words in order.", "I go to bed at nine o'clock", "I + kegiatan + at + jam."),
      fill("sd4-c1-post5", "Complete: The film starts ___ eight p.m.", "The film starts", "eight p.m.", ["at"], "At + jam."),
      pick("sd4-c1-post6", "Rina has homework time at…", ["three o'clock", "nine thirty", "twelve o'clock", "six o'clock"], 0, "Baris 6.", { passageId: SCHEDULE.id }),
      pick("sd4-c1-post7", "7 a.m. is in the…", ["morning", "evening", "night", "afternoon"], 0, "a.m. dan jam 7 → pagi."),
      match("sd4-c1-post8", "Match.", [["pic:time-6", "six o'clock"], ["pic:time-6-30", "half past six"], ["pic:time-11-30", "half past eleven"]], "Hebat!"),
      pick("sd4-c1-post9", "The bus leaves at 6.30. You arrive at 6.45. What happens?", ["You miss the bus.", "You are early.", "You wait 15 minutes."], 0, "Bus berangkat 6.30, kamu datang 6.45 → ketinggalan bus.", { hots: true }),
      pick("sd4-c1-post10", "Rina sleeps from 9 p.m. to 5.30 a.m. How long does she sleep?", ["eight and a half hours", "five hours", "twelve hours", "nine hours"], 0, "21.00 → 05.30 = 8 jam 30 menit.", { passageId: SCHEDULE.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Tick Tock!",
    questions: [
      live("sd4-c1-live1", "What time is it?", ["seven o'clock", "eight o'clock", "half past seven", "twelve o'clock"], 0, "time-7"),
      live("sd4-c1-live2", "What time is it?", ["half past three", "half past four", "three o'clock", "six o'clock"], 0, "time-3-30"),
      live("sd4-c1-live3", "9.30 = …", ["half past nine", "half past ten", "nine o'clock", "ten thirty"], 0, "time-9-30"),
      live("sd4-c1-live4", "I get up ___ six o'clock.", ["at", "on", "in", "to"], 0, "alarm"),
      live("sd4-c1-live5", "10 p.m. is in the…", ["night", "morning", "afternoon", "noon"], 0, "night"),
      live("sd4-c1-live6", "What time is it?", ["twelve o'clock", "six o'clock", "eleven o'clock", "one o'clock"], 0, "time-12"),
      live("sd4-c1-live7", "Rina ___ to school at 7.", ["goes", "go", "going", "gone"], 0, "school"),
      live("sd4-c1-live8", "1.30 + 30 minutes = …", ["two o'clock", "half past two", "one o'clock", "three o'clock"], 0, "time-2"),
    ],
  },
};

const PARTY: Passage = {
  id: "sd4-c2-party",
  title: "An Invitation",
  pic: "envelope",
  lines: [
    "Dear Beni,",
    "Please come to my birthday party!",
    "Date: Saturday, 12th October",
    "Time: 4 p.m. to 6 p.m.",
    "Place: My house, Jalan Melati No. 5",
    "There will be cake, games and music.",
    "See you there! — Dina",
  ],
};

export const CH2: Level = {
  id: "sd4-ch2",
  title: "Chapter 2 — Months and Birthdays",
  description: "Say the twelve months and dates (first, second, third…), ask “When is your birthday?”, and read an invitation.",
  targetScore: "Listening · Speaking · Reading · Writing",
  cover: ["calendar", "cake", "balloon"],
  pretest: {
    id: "sd4-c2-pre",
    title: "Chapter 2 Pretest",
    passPercent: 0,
    questions: [
      pick("sd4-c2-pre1", "Which month comes first in a year?", ["January", "June", "March", "December"], 0, "Januari = January, bulan pertama."),
      listen("sd4-c2-pre2", voice("August."), "Listen. Which month?", ["August", "April", "October", "March"], 0, "August = Agustus."),
      trPick("sd4-c2-pre3", "“Ulang tahun” in English is…", ["birthday", "holiday", "weekend", "party"], 0, "Ulang tahun = birthday."),
      pick("sd4-c2-pre4", "How many months are in a year?", ["twelve", "ten", "seven", "thirty"], 0, "Setahun ada dua belas bulan.", { image: "calendar" }),
      pick("sd4-c2-pre5", "Indonesia's Independence Day is in…", ["August", "January", "May", "December"], 0, "17 Agustus = Hari Kemerdekaan.", { image: "flag" }),
    ],
  },
  lessons: [
    {
      id: "sd4-c2-l1",
      skill: "vocabulary",
      title: "The Twelve Months",
      summary: "January to December.",
      sections: [
        {
          title: "Months of the year",
          blocks: [
            pics([["calendar", "a year has twelve months"]]),
            vocab([
              ["January", "Januari", "calendar"],
              ["February", "Februari", "calendar"],
              ["March", "Maret", "calendar"],
              ["April", "April", "calendar"],
              ["May", "Mei", "calendar"],
              ["June", "Juni", "calendar"],
              ["July", "Juli", "calendar"],
              ["August", "Agustus", "flag", "We celebrate Independence Day in August."],
              ["September", "September", "calendar"],
              ["October", "Oktober", "calendar"],
              ["November", "November", "calendar"],
              ["December", "Desember", "calendar"],
            ]),
            tip("Seperti nama hari, nama bulan selalu diawali **huruf kapital**: **J**anuary, **A**ugust."),
          ],
        },
        {
          title: "Sing the months",
          blocks: [
            audio("Months song", say(["woman", "January, February, March and April, May, June, July and August, September, October, November, December. Twelve months in a year!"])),
            tryIt(pick("sd4-c2-l1-try1", "Which month comes after June?", ["July", "May", "August"], 0, "Juni → Juli = July.")),
            warn("Perhatikan ejaan yang sering keliru: **February** (ada r setelah b), **August** (bukan Agustus), **March** (bukan Maret)."),
          ],
        },
      ],
      checkpoint: [
        listen("sd4-c2-l1-c1", voice("December."), "Listen. Which month?", ["December", "November", "September"], 0, "December = Desember."),
        fill("sd4-c2-l1-c2", "What comes next? March, April, ___", "March, April,", "", ["May"], "Setelah April adalah May."),
        pick("sd4-c2-l1-c3", "Which is spelled correctly?", ["February", "Febuary", "Pebruary"], 0, "February."),
        trPick("sd4-c2-l1-c4", "“Juni” in English is…", ["June", "July", "January"], 0, "Juni = June."),
        pick("sd4-c2-l1-c5", "The last month of the year is…", ["December", "October", "January"], 0, "Bulan terakhir = December."),
        pick("sd4-c2-l1-c6", "Today is in May. Two months later is…", ["July", "June", "August"], 0, "May → June → July.", { hots: true }),
      ],
    },
    {
      id: "sd4-c2-l2",
      skill: "speaking",
      title: "When Is Your Birthday?",
      summary: "Ordinal numbers (1st–31st) and dates: It's on the fifth of May.",
      sections: [
        {
          title: "First, second, third…",
          blocks: [
            text("Untuk tanggal, kita pakai **bilangan urutan** (ordinal numbers)."),
            table(["Number", "Ordinal", "Short"], [["1", "first", "1st"], ["2", "second", "2nd"], ["3", "third", "3rd"], ["4", "fourth", "4th"], ["5", "fifth", "5th"], ["10", "tenth", "10th"], ["12", "twelfth", "12th"], ["20", "twentieth", "20th"], ["21", "twenty-first", "21st"], ["31", "thirty-first", "31st"]]),
            tip("Kebanyakan cukup tambah **-th** (fourth, tenth). Yang khusus: **first, second, third, fifth, twelfth**, dan yang berakhiran 1, 2, 3 (twenty-**first**, twenty-**second**, twenty-**third**)."),
            repeat(["first", "second", "third", "fourth", "fifth", "twelfth", "twentieth", "twenty-first"]),
          ],
        },
        {
          title: "Birthday talk",
          blocks: [
            audio("When is your birthday?", say(["man", "When is your birthday, Dina?"], ["woman", "It's on the twelfth of October. When is your birthday?"], ["man", "My birthday is on the third of March."], ["woman", "Cool! How old are you now?"], ["man", "I'm ten years old."])),
            text("**When is your birthday?** — **It's on the twelfth of October.** (atau *October 12th*). Untuk tanggal pakai **on**; untuk bulan saja pakai **in**: *My birthday is **in** March.*"),
            tryIt(pick("sd4-c2-l2-try1", "When is Dina's birthday?", ["12th October", "3rd March", "10th October"], 0, "It's on the twelfth of October.")),
            speaking({
              id: "sd4-c2-l2-say",
              title: "My birthday",
              prompt: "Say when your birthday is, how old you are, and how you celebrate it.",
              image: "cake",
              seconds: 40,
              tips: ["My birthday is on the … of …", "I am … years old.", "I usually …"],
              models: [{ label: "Example", text: "My birthday is on the twenty-first of April. I am ten years old. I usually eat cake with my family." }],
              rubric: ["I used an ordinal number (first, second…).", "I used **on** with the date.", "I said my age."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd4-c2-l2-c1", voice("My birthday is on the fifth of May."), "Listen. When is the birthday?", ["5th May", "15th May", "5th March"], 0, "The fifth of May = 5 Mei."),
        match("sd4-c2-l2-c2", "Match.", [["1st", "first"], ["2nd", "second"], ["3rd", "third"], ["12th", "twelfth"]], "First, second, third, twelfth!"),
        fill("sd4-c2-l2-c3", "Complete: My birthday is ___ the ninth of June.", "My birthday is", "the ninth of June.", ["on"], "Tanggal → on."),
        pick("sd4-c2-l2-c4", "My birthday is ___ March.", ["in", "on", "at"], 0, "Bulan saja → in."),
        trPick("sd4-c2-l2-c5", "“Kapan ulang tahunmu?” in English is…", ["When is your birthday?", "How old are you?", "What time is it?"], 0, "Kapan = when."),
        pick("sd4-c2-l2-c6", "17th August is…", ["the seventeenth of August", "the seventy of August", "the seven of August"], 0, "17 → seventeenth.", { hots: true, image: "flag" }),
      ],
    },
    {
      id: "sd4-c2-l3",
      skill: "reading",
      title: "Reading: A Birthday Invitation",
      summary: "Read an invitation and write one.",
      passages: [PARTY],
      sections: [
        {
          title: "Dina's invitation",
          blocks: [
            pics([["envelope", "invitation"], ["cake", "cake"], ["balloon", "party"]]),
            { type: "passage", passage: PARTY },
            tip("Undangan biasanya berisi **who** (siapa), **what** (acara apa), **when** (kapan: tanggal & jam), dan **where** (di mana)."),
            tryIt(pick("sd4-c2-l3-try1", "What time does the party start?", ["4 p.m.", "6 p.m.", "12 p.m."], 0, "Baris 4: 4 p.m. to 6 p.m.", { passageId: PARTY.id })),
          ],
        },
        {
          title: "Write an invitation",
          blocks: [
            writing({
              id: "sd4-c2-l3-write",
              title: "My party invitation",
              prompt: "Write a short invitation to your birthday party. Include the date, time and place.",
              image: "envelope",
              minWords: 25,
              maxWords: 80,
              tips: ["Dear …,", "Please come to my birthday party!", "Date: …", "Time: …", "Place: …", "See you there! — (your name)"],
              models: [{ label: "Example", text: "Dear Raka,\nPlease come to my birthday party!\nDate: Sunday, 3rd March\nTime: 3 p.m. to 5 p.m.\nPlace: My house, Jalan Mawar No. 8\nWe will play games and eat cake.\nSee you there! — Beni" }],
              rubric: ["I wrote who it is for (Dear …).", "I wrote the date with an ordinal number.", "I wrote the time and place.", "I signed my name."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd4-c2-l3-c1", "Who is the invitation for?", ["Beni", "Dina", "Rina"], 0, "Baris 1: Dear Beni.", { passageId: PARTY.id }),
        pick("sd4-c2-l3-c2", "When is the party?", ["Saturday, 12th October", "Sunday, 12th October", "Saturday, 2nd October"], 0, "Baris 3.", { passageId: PARTY.id }),
        pickMany("sd4-c2-l3-c3", "Choose ALL the things at the party.", ["cake", "games", "music", "swimming"], [0, 1, 2], "Baris 6: cake, games and music.", { passageId: PARTY.id }),
        fill("sd4-c2-l3-c4", "Complete.", "Place: My house, Jalan", "No. 5", ["Melati"], "Baris 5.", { passageId: PARTY.id }),
        pick("sd4-c2-l3-c5", "How long is the party?", ["two hours", "four hours", "six hours"], 0, "4 p.m. sampai 6 p.m. = 2 jam.", { passageId: PARTY.id, hots: true }),
        pick("sd4-c2-l3-c6", "Beni can't come. What should he write back?", ["Sorry, Dina. I can't come. Happy birthday!", "See you there!", "Please come to my party."], 0, "Menolak dengan sopan dan tetap mengucapkan selamat.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd4-c2-post",
    title: "Chapter 2 Posttest",
    passPercent: 70,
    passages: [PARTY],
    questions: [
      listen("sd4-c2-post1", voice("September."), "Listen. Which month?", ["September", "November", "December", "February"], 0, "September."),
      fill("sd4-c2-post2", "What comes next? October, November, ___", "October, November,", "", ["December"], "Setelah November adalah December."),
      trPick("sd4-c2-post3", "“Tanggal tiga” in English is…", ["the third", "the three", "the thirtieth", "the thirteenth"], 0, "3 → third."),
      pick("sd4-c2-post4", "My birthday is ___ the 20th of April.", ["on", "in", "at", "to"], 0, "Tanggal → on."),
      arrange("sd4-c2-post5", "Put the words in order.", "When is your birthday", "When is your birthday?"),
      listen("sd4-c2-post6", say(["man", "When is your birthday?"], ["woman", "It's on the first of July."]), "Listen. When is her birthday?", ["1st July", "1st June", "3rd July", "21st July"], 0, "The first of July."),
      pick("sd4-c2-post7", "Where is Dina's party?", ["at her house", "at school", "at a restaurant", "in the park"], 0, "Baris 5: My house.", { passageId: PARTY.id }),
      match("sd4-c2-post8", "Match.", [["5th", "fifth"], ["20th", "twentieth"], ["31st", "thirty-first"]], "Fifth, twentieth, thirty-first!"),
      pick("sd4-c2-post9", "Today is 30th December. Tomorrow is…", ["31st December", "1st January", "29th December", "30th January"], 0, "Desember punya 31 hari.", { hots: true }),
      pick("sd4-c2-post10", "Which sentence is NOT in an invitation?", ["My cat is sleeping.", "Please come to my party!", "Time: 4 p.m.", "See you there!"], 0, "Kalimat tentang kucing tidak berhubungan dengan undangan.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Happy Birthday!",
    questions: [
      live("sd4-c2-live1", "The first month is…", ["January", "June", "July", "March"], 0, "calendar"),
      live("sd4-c2-live2", "After July comes…", ["August", "June", "September", "May"], 0, "flag"),
      live("sd4-c2-live3", "3rd = …", ["third", "three", "thirty", "thirteenth"], 0, "num-3"),
      live("sd4-c2-live4", "My birthday is ___ May.", ["in", "on", "at", "to"], 0, "cake"),
      live("sd4-c2-live5", "My birthday is ___ the 5th of May.", ["on", "in", "at", "for"], 0, "balloon"),
      live("sd4-c2-live6", "How many months in a year?", ["twelve", "ten", "eleven", "thirteen"], 0, "calendar"),
      live("sd4-c2-live7", "Independence Day is the ___ of August.", ["seventeenth", "seventy", "seventh", "seventeen"], 0, "flag"),
      live("sd4-c2-live8", "Spell it right:", ["February", "Febuary", "Februari", "Pebruary"], 0, "calendar"),
    ],
  },
};
