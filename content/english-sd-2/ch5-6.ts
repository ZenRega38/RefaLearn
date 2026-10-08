import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trMatch, trPick, tryIt, vocab, voice } from "../kit";

// Grade 2 (Fase A). Chapter 5 — How Do You Feel? · Chapter 6 — Where Is It?

export const CH5: Level = {
  id: "sd2-ch5",
  title: "Chapter 5 — How Do You Feel?",
  description: "Name feelings, ask a friend how they feel, and show you care: Are you OK?",
  targetScore: "Speaking · Social skills",
  cover: ["happy", "sad", "surprised"],
  pretest: {
    id: "sd2-c5-pre",
    title: "Chapter 5 Pretest",
    passPercent: 0,
    questions: [
      listen("sd2-c5-pre1", voice("I'm happy!"), "Listen. Choose the face.", ["pic:happy", "pic:sad", "pic:angry", "pic:scared"], 0, "Happy = senang."),
      listen("sd2-c5-pre2", voice("I'm sad."), "Listen. Choose the face.", ["pic:sad", "pic:happy", "pic:surprised", "pic:angry"], 0, "Sad = sedih."),
      trPick("sd2-c5-pre3", "“Marah” in English is…", ["angry", "happy", "hungry", "sleepy"], 0, "Marah = angry."),
      pick("sd2-c5-pre4", "How does he feel?", ["surprised", "sleepy", "sad", "happy"], 0, "Mulut terbuka lebar → terkejut = surprised.", { image: "surprised" }),
      pick("sd2-c5-pre5", "You get a birthday present. You feel…", ["happy", "sad", "angry", "scared"], 0, "Dapat hadiah → senang.", { image: "souvenir" }),
    ],
  },
  lessons: [
    {
      id: "sd2-c5-l1",
      skill: "vocabulary",
      title: "Feelings",
      summary: "Happy, sad, angry, scared, surprised, tired, sleepy, hungry, thirsty.",
      sections: [
        {
          title: "Faces and feelings",
          blocks: [
            text("Setiap orang punya perasaan. Wajah kita bisa menunjukkan perasaan itu. Ketuk kartunya dan tirukan wajahnya juga!"),
            vocab([
              ["happy", "senang", "happy", "I'm happy today!"],
              ["sad", "sedih", "sad", "I'm sad. My kite is broken."],
              ["angry", "marah", "angry", "Don't be angry."],
              ["scared", "takut", "scared", "I'm scared of the dark."],
              ["surprised", "terkejut", "surprised", "Wow! I'm surprised!"],
              ["tired", "capek", "feel-tired", "I'm tired after running."],
              ["sleepy", "mengantuk", "feel-sleepy", "I'm sleepy. Good night!"],
              ["hungry", "lapar", "feel-hungry", "I'm hungry. Let's eat!"],
              ["thirsty", "haus", "water", "I'm thirsty. Water, please."],
            ]),
            repeat(["happy", "sad", "angry", "scared", "surprised", "tired", "sleepy", "hungry", "thirsty"]),
          ],
        },
        {
          title: "Act it out",
          blocks: [
            text("Main tebak-tebakan: satu orang membuat wajah, yang lain menebak dalam bahasa Inggris. *You're scared!*"),
            pics([["happy", "happy"], ["sad", "sad"], ["angry", "angry"], ["scared", "scared"], ["surprised", "surprised"]]),
            tryIt(pick("sd2-c5-l1-try1", "How does she feel?", ["sad", "happy", "angry"], 0, "Ada air mata → sedih = sad.", { image: "sad" })),
          ],
        },
      ],
      checkpoint: [
        listen("sd2-c5-l1-c1", voice("I'm scared."), "Listen. Choose the face.", ["pic:scared", "pic:happy", "pic:surprised"], 0, "Scared = takut."),
        pick("sd2-c5-l1-c2", "How does he feel?", ["angry", "happy", "sleepy"], 0, "Alis turun dan wajah merah → angry.", { image: "angry" }),
        match("sd2-c5-l1-c3", "Match.", [["pic:happy", "happy"], ["pic:sad", "sad"], ["pic:feel-sleepy", "sleepy"], ["pic:feel-hungry", "hungry"]], "Kamu paham perasaan!"),
        trPick("sd2-c5-l1-c4", "“Haus” in English is…", ["thirsty", "hungry", "tired"], 0, "Haus = thirsty."),
        fill("sd2-c5-l1-c5", "Complete: I'm ___ . I want to eat.", "I'm", ". I want to eat.", ["hungry"], "Mau makan → lapar = hungry."),
        pick("sd2-c5-l1-c6", "You run for one hour. You feel…", ["tired", "surprised", "scared"], 0, "Lari satu jam → capek = tired.", { hots: true, image: "run" }),
      ],
    },
    {
      id: "sd2-c5-l2",
      skill: "speaking",
      title: "How Are You?",
      summary: "How are you? I'm fine / I'm tired. How do you feel?",
      sections: [
        {
          title: "More than “I'm fine”",
          blocks: [
            audio("Morning at school", say(["woman", "Good morning, Beni! How are you?"], ["man", "I'm tired. I went to bed late."], ["woman", "Oh no! How about you, Dina?"], ["woman", "I'm great, thank you!"])),
            text("Jawaban **How are you?** tidak harus *I'm fine*. Katakan perasaanmu yang sebenarnya: *I'm happy*, *I'm tired*, *I'm hungry*."),
            repeat(["How are you?", "I'm great, thank you!", "I'm tired.", "How do you feel?", "I feel happy."]),
          ],
        },
        {
          title: "Your turn",
          blocks: [
            tryIt(pick("sd2-c5-l2-try1", "Why is Beni tired?", ["He went to bed late.", "He is hungry.", "He is happy."], 0, "Beni bilang: I went to bed late.")),
            speaking({
              id: "sd2-c5-l2-say",
              title: "How do you feel today?",
              prompt: "Answer: **How do you feel today?** Then say why.",
              image: "happy",
              seconds: 25,
              tips: ["I feel …", "I'm … because …"],
              models: [{ label: "Example", text: "I feel happy today because it's Saturday!" }, { label: "Another example", text: "I'm sleepy. I went to bed late." }],
              rubric: ["I said a feeling word.", "I used **I feel** or **I'm**.", "I said why."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd2-c5-l2-c1", say(["woman", "How are you?"], ["man", "I'm hungry."]), "Listen. How does he feel?", ["hungry", "happy", "angry"], 0, "I'm hungry = aku lapar."),
        pick("sd2-c5-l2-c2", "“How are you?” Choose a good answer.", ["I'm great, thank you!", "My name is Beni.", "It's Monday."], 0, "How are you? → jawab perasaan/keadaan."),
        arrange("sd2-c5-l2-c3", "Put the words in order.", "How do you feel today", "How do you feel today? = bagaimana perasaanmu hari ini?"),
        fill("sd2-c5-l2-c4", "Complete: I ___ happy.", "I", "happy.", ["feel", "am"], "I feel happy / I am happy."),
        trPick("sd2-c5-l2-c5", "“Aku mengantuk.” in English is…", ["I'm sleepy.", "I'm sad.", "I'm hungry."], 0, "Mengantuk = sleepy."),
        pick("sd2-c5-l2-c6", "Dina is thirsty. What does she need?", ["water", "a pillow", "a jacket"], 0, "Haus → air.", { hots: true }),
      ],
    },
    {
      id: "sd2-c5-l3",
      skill: "listening",
      title: "Are You OK?",
      summary: "Caring for friends: Are you OK? Don't worry. Let me help you.",
      sections: [
        {
          title: "Kind words for friends",
          blocks: [
            vocab([
              ["Are you OK?", "Kamu tidak apa-apa?", "question"],
              ["Don't worry.", "Jangan khawatir.", "heart"],
              ["Let me help you.", "Biar aku bantu.", "thumbs-up"],
              ["Cheer up!", "Semangat! / Jangan sedih!", "happy"],
            ]),
            audio("In the playground", say(["man", "Ouch! I fell down."], ["woman", "Are you OK, Beni?"], ["man", "My leg hurts. I'm sad."], ["woman", "Don't worry. Let me help you. Cheer up!"], ["man", "Thank you, Dina. You're a good friend."])),
          ],
        },
        {
          title: "Good friends care",
          blocks: [
            text("Teman yang baik peduli. Kalau temanmu sedih, tanyakan **Are you OK?** dan tawarkan bantuan."),
            pics([["sad", "Beni is sad."], ["happy", "Dina helps. Now Beni is happy."]]),
            tryIt(pick("sd2-c5-l3-try1", "Why is Beni sad?", ["He fell down.", "He is hungry.", "He lost his kite."], 0, "Beni jatuh (I fell down).")),
          ],
        },
      ],
      checkpoint: [
        pick("sd2-c5-l3-c1", "Your friend is crying. You say…", ["Are you OK?", "Goodbye!", "I'm hungry."], 0, "Teman menangis → tanyakan Are you OK?", { image: "sad" }),
        listen("sd2-c5-l3-c2", voice("Don't worry. Let me help you."), "Listen. What does she want to do?", ["help", "sleep", "eat"], 0, "Let me help you = biar aku bantu."),
        trMatch("sd2-c5-l3-c3", "Match.", [["Are you OK?", "Kamu tidak apa-apa?"], ["Don't worry.", "Jangan khawatir."], ["Cheer up!", "Semangat!"]], "Kata-kata yang baik!"),
        arrange("sd2-c5-l3-c4", "Put the words in order.", "Let me help you", "Let me help you."),
        pick("sd2-c5-l3-c5", "How does Beni feel at the end?", ["happy", "sad", "angry"], 0, "Beni berterima kasih dan merasa lebih baik.", { image: "happy" }),
        pick("sd2-c5-l3-c6", "Your friend's ice cream fell. What is the kindest thing to say?", ["Don't worry. Let's share mine!", "Ha ha ha!", "That's your problem."], 0, "Teman yang baik menghibur dan berbagi.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd2-c5-post",
    title: "Chapter 5 Posttest",
    passPercent: 70,
    questions: [
      listen("sd2-c5-post1", voice("I'm surprised!"), "Listen. Choose the face.", ["pic:surprised", "pic:sad", "pic:angry", "pic:happy"], 0, "Surprised = terkejut."),
      pick("sd2-c5-post2", "How does she feel?", ["scared", "happy", "hungry", "tired"], 0, "Wajah gemetar → takut = scared.", { image: "scared" }),
      match("sd2-c5-post3", "Match.", [["pic:angry", "angry"], ["pic:happy", "happy"], ["pic:feel-tired", "tired"], ["pic:surprised", "surprised"]], "Hebat!"),
      trPick("sd2-c5-post4", "“Lapar” in English is…", ["hungry", "angry", "thirsty", "happy"], 0, "Lapar = hungry."),
      listen("sd2-c5-post5", say(["woman", "How are you?"], ["man", "I'm thirsty."]), "Listen. What does he need?", ["water", "a bed", "a jacket", "a book"], 0, "Thirsty → water."),
      arrange("sd2-c5-post6", "Put the words in order.", "Are you OK", "Are you OK? = kamu tidak apa-apa?"),
      fill("sd2-c5-post7", "Complete: Don't ___ . Let me help you.", "Don't", ". Let me help you.", ["worry"], "Don't worry = jangan khawatir."),
      pick("sd2-c5-post8", "It's 10 at night. You feel…", ["sleepy", "surprised", "angry", "hungry"], 0, "Malam hari → mengantuk.", { image: "night" }),
      pick("sd2-c5-post9", "Your friend took your pencil without asking. You feel… What do you say?", ["angry — “Please ask first.”", "happy — “Thank you!”", "sleepy — “Good night.”", "scared — “Help!”"], 0, "Boleh marah, tapi katakan dengan sopan: Please ask first.", { hots: true }),
      pick("sd2-c5-post10", "Which friend needs help?", ["The one who is crying.", "The one who is laughing.", "The one who is eating cake.", "The one who is singing."], 0, "Teman yang menangis butuh bantuan.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Feelings Game",
    questions: [
      live("sd2-c5-live1", "How does he feel?", ["happy", "sad", "angry", "scared"], 0, "happy"),
      live("sd2-c5-live2", "How does she feel?", ["sad", "happy", "surprised", "hungry"], 0, "sad"),
      live("sd2-c5-live3", "How does he feel?", ["angry", "sleepy", "happy", "thirsty"], 0, "angry"),
      live("sd2-c5-live4", "I want water. I'm…", ["thirsty", "sleepy", "angry", "scared"], 0, "water"),
      live("sd2-c5-live5", "How does she feel?", ["surprised", "sad", "tired", "angry"], 0, "surprised"),
      live("sd2-c5-live6", "Your friend is sad. You say…", ["Are you OK?", "Ha ha!", "Go away!", "Bye!"], 0, "sad"),
      live("sd2-c5-live7", "I'm ___ . Good night!", ["sleepy", "hungry", "happy", "surprised"], 0, "feel-sleepy"),
      live("sd2-c5-live8", "“Takut” is…", ["scared", "sad", "sorry", "sleepy"], 0, "scared", true),
    ],
  },
};

const ROOM_TEXT = {
  id: "sd2-c6-room",
  title: "Where Is Momo?",
  pic: "cat",
  lines: [
    "Momo is my cat. She likes to hide.",
    "Is she under the bed? No, she isn't.",
    "Is she on the sofa? No, she isn't.",
    "Is she in the box? Yes, she is!",
    "My ball is next to the box. Momo wants to play.",
  ],
};

export const CH6: Level = {
  id: "sd2-ch6",
  title: "Chapter 6 — Where Is It?",
  description: "Use in, on, under and next to, and ask Where is…? to find things and pets.",
  targetScore: "Listening · Reading",
  cover: ["in", "on", "under"],
  pretest: {
    id: "sd2-c6-pre",
    title: "Chapter 6 Pretest",
    passPercent: 0,
    questions: [
      listen("sd2-c6-pre1", voice("The ball is in the box."), "Listen. Choose the picture.", ["pic:in", "pic:on", "pic:under", "pic:next-to"], 0, "In = di dalam."),
      listen("sd2-c6-pre2", voice("The ball is on the box."), "Listen. Choose the picture.", ["pic:on", "pic:in", "pic:under", "pic:next-to"], 0, "On = di atas."),
      trPick("sd2-c6-pre3", "“Di bawah” in English is…", ["under", "on", "in", "next to"], 0, "Di bawah = under."),
      pick("sd2-c6-pre4", "Where is the ball?", ["next to the box", "in the box", "on the box", "under the box"], 0, "Bola di sebelah kotak = next to.", { image: "next-to" }),
      pick("sd2-c6-pre5", "“Where is my bag?” asks about…", ["a place", "a color", "a number", "a feeling"], 0, "Where = di mana, menanyakan tempat."),
    ],
  },
  lessons: [
    {
      id: "sd2-c6-l1",
      skill: "vocabulary",
      title: "In, On, Under, Next To",
      summary: "Words that tell us where things are.",
      sections: [
        {
          title: "Where is the ball?",
          blocks: [
            vocab([
              ["in", "di dalam", "in", "The ball is in the box."],
              ["on", "di atas", "on", "The ball is on the box."],
              ["under", "di bawah", "under", "The ball is under the table."],
              ["next to", "di sebelah", "next-to", "The ball is next to the box."],
            ]),
            repeat(["in the box", "on the box", "under the table", "next to the box"]),
            tip("Main di rumah: sembunyikan mainan, lalu beri petunjuk dalam bahasa Inggris. *It's under the sofa!*"),
          ],
        },
        {
          title: "Look and say",
          blocks: [
            pics([["in", "in"], ["on", "on"], ["under", "under"], ["next-to", "next to"]]),
            tryIt(pick("sd2-c6-l1-try1", "Where is the ball?", ["under the table", "on the table", "in the table"], 0, "Bola di bawah meja = under.", { image: "under" })),
          ],
        },
      ],
      checkpoint: [
        listen("sd2-c6-l1-c1", voice("Under."), "Listen. Choose the picture.", ["pic:under", "pic:on", "pic:in"], 0, "Under = di bawah."),
        pick("sd2-c6-l1-c2", "Where is the ball?", ["on the box", "in the box", "under the box"], 0, "Bola di atas kotak = on.", { image: "on" }),
        match("sd2-c6-l1-c3", "Match.", [["pic:in", "in"], ["pic:on", "on"], ["pic:under", "under"], ["pic:next-to", "next to"]], "Kamu tahu semua posisinya!"),
        trPick("sd2-c6-l1-c4", "“Di sebelah” in English is…", ["next to", "under", "on"], 0, "Di sebelah = next to."),
        fill("sd2-c6-l1-c5", "Complete: The ball is ___ the box. (di dalam)", "The ball is", "the box.", ["in"], "Di dalam = in.", { translate: true, image: "in" }),
        pick("sd2-c6-l1-c6", "Your shoes are on the floor below your bed. They are…", ["under the bed", "on the bed", "in the bed"], 0, "Di lantai di bawah kasur → under the bed.", { hots: true, image: "bed" }),
      ],
    },
    {
      id: "sd2-c6-l2",
      skill: "listening",
      title: "Where Is My…?",
      summary: "Where is my bag? It's on the chair.",
      sections: [
        {
          title: "Lost things",
          blocks: [
            audio("Looking for things", say(["man", "Mom, where is my bag?"], ["woman", "It's on the chair."], ["man", "Where are my shoes?"], ["woman", "They're under the bed."], ["man", "Thanks, Mom!"])),
            text("Satu benda: **Where is …? — It's …** Banyak benda: **Where are …? — They're …**"),
            table(["One", "More than one"], [["Where is my bag?", "Where are my shoes?"], ["It's on the chair.", "They're under the bed."]]),
          ],
        },
        {
          title: "Find them",
          blocks: [
            tryIt(pick("sd2-c6-l2-try1", "Where are the shoes?", ["under the bed", "on the chair", "in the bag"], 0, "They're under the bed.", { image: "shoes" })),
            tryIt(pick("sd2-c6-l2-try2", "Where ___ my socks?", ["are", "is", "am"], 0, "Socks jamak → are.")),
          ],
        },
      ],
      checkpoint: [
        listen("sd2-c6-l2-c1", say(["man", "Where is my book?"], ["woman", "It's in your bag."]), "Listen. Where is the book?", ["in the bag", "on the chair", "under the bed"], 0, "It's in your bag."),
        pick("sd2-c6-l2-c2", "Where ___ my pencil?", ["is", "are", "am"], 0, "Pencil satu → is."),
        pick("sd2-c6-l2-c3", "Where are my shoes? ___ under the bed.", ["They're", "It's", "She's"], 0, "Shoes jamak → They're."),
        arrange("sd2-c6-l2-c4", "Put the words in order.", "Where is my bag", "Where is my + benda?"),
        trPick("sd2-c6-l2-c5", "“Di mana tasku?” in English is…", ["Where is my bag?", "What is my bag?", "This is my bag."], 0, "Di mana = where."),
        pick("sd2-c6-l2-c6", "The bag is ON the chair. The book is IN the bag. Where is the book?", ["in the bag, on the chair", "under the chair", "next to the bed"], 0, "Buku di dalam tas, tasnya di atas kursi.", { hots: true }),
      ],
    },
    {
      id: "sd2-c6-l3",
      skill: "reading",
      title: "Where Is Momo?",
      summary: "Read a story about a cat who likes to hide.",
      passages: [ROOM_TEXT],
      sections: [
        {
          title: "Read the story",
          blocks: [
            { type: "passage", passage: ROOM_TEXT },
            audio("Listen and read", say(["woman", ROOM_TEXT.lines.join(" ")])),
            tryIt(pick("sd2-c6-l3-try1", "Where is Momo?", ["in the box", "under the bed", "on the sofa"], 0, "Line 4: Is she in the box? Yes, she is!", { passageId: ROOM_TEXT.id })),
          ],
        },
        {
          title: "Yes, she is / No, she isn't",
          blocks: [
            text("Pertanyaan **Is she …?** dijawab **Yes, she is.** atau **No, she isn't.** Untuk benda: **Is it …? Yes, it is. / No, it isn't.**"),
            speaking({
              id: "sd2-c6-l3-say",
              title: "Hide and seek",
              prompt: "Hide a toy at home. Ask your family **Where is my …?** and give clues with in, on, under, next to.",
              image: "teddy",
              seconds: 40,
              tips: ["Where is my teddy bear?", "Is it under the bed?", "No, it isn't. / Yes, it is!"],
              models: [{ label: "Example", text: "Where is my teddy bear? Is it on the sofa? No, it isn't. Is it under the table? Yes, it is!" }],
              rubric: ["I asked **Where is …?**", "I used in, on, under or next to.", "I answered **Yes, it is / No, it isn't**."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd2-c6-l3-c1", "Is Momo under the bed?", ["No, she isn't.", "Yes, she is.", "Yes, it is."], 0, "Line 2: No, she isn't.", { passageId: ROOM_TEXT.id }),
        pick("sd2-c6-l3-c2", "Where is the ball?", ["next to the box", "in the box", "on the sofa"], 0, "Line 5: My ball is next to the box.", { passageId: ROOM_TEXT.id }),
        pickMany("sd2-c6-l3-c3", "Choose ALL the places where Momo is NOT.", ["under the bed", "on the sofa", "in the box"], [0, 1], "Momo tidak di bawah kasur dan tidak di sofa. Ia di dalam kotak.", { passageId: ROOM_TEXT.id }),
        fill("sd2-c6-l3-c4", "Complete.", "Is she in the box? Yes, she", "!", ["is"], "Yes, she is!", { passageId: ROOM_TEXT.id }),
        pick("sd2-c6-l3-c5", "What does Momo like to do?", ["hide", "swim", "sing"], 0, "Line 1: She likes to hide.", { passageId: ROOM_TEXT.id }),
        pick("sd2-c6-l3-c6", "Momo wants to play. What will she play with?", ["the ball", "the bed", "the sofa"], 0, "Line 5: bola di sebelah kotak, Momo ingin bermain.", { passageId: ROOM_TEXT.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd2-c6-post",
    title: "Chapter 6 Posttest",
    passPercent: 70,
    passages: [ROOM_TEXT],
    questions: [
      listen("sd2-c6-post1", voice("The ball is next to the box."), "Listen. Choose the picture.", ["pic:next-to", "pic:in", "pic:on", "pic:under"], 0, "Next to = di sebelah."),
      pick("sd2-c6-post2", "Where is the ball?", ["in the box", "on the box", "under the box", "next to the box"], 0, "Di dalam kotak = in.", { image: "in" }),
      trPick("sd2-c6-post3", "“Di atas” in English is…", ["on", "in", "under", "next to"], 0, "Di atas = on."),
      pick("sd2-c6-post4", "Where ___ my socks?", ["are", "is", "am", "be"], 0, "Socks jamak → are."),
      arrange("sd2-c6-post5", "Put the words in order.", "The cat is under the table", "The cat is under the table."),
      listen("sd2-c6-post6", say(["woman", "Where is the cat?"], ["man", "It's on the sofa."]), "Listen. Where is the cat?", ["on the sofa", "under the sofa", "in the box", "next to the bed"], 0, "It's on the sofa."),
      fill("sd2-c6-post7", "Answer: Is it under the bed? No, it ___ .", "No, it", ".", ["isn't", "is not"], "No, it isn't."),
      pick("sd2-c6-post8", "Where does Momo hide?", ["in the box", "on the bed", "under the sofa", "in the bag"], 0, "Line 4.", { passageId: ROOM_TEXT.id }),
      pick("sd2-c6-post9", "The cup is on the table. The cat is under the table. Which is HIGHER?", ["the cup", "the cat", "They are the same."], 0, "On (di atas) lebih tinggi dari under (di bawah).", { hots: true }),
      pick("sd2-c6-post10", "The fish lives ___ the water.", ["in", "on", "under", "next to"], 0, "Ikan hidup di dalam air = in.", { hots: true, image: "fish" }),
    ],
  },
  live: {
    title: "Live Quiz — Hide and Seek",
    questions: [
      live("sd2-c6-live1", "Where is the ball?", ["in the box", "on the box", "under the box", "next to the box"], 0, "in"),
      live("sd2-c6-live2", "Where is the ball?", ["on the box", "in the box", "under the box", "next to the box"], 0, "on"),
      live("sd2-c6-live3", "Where is the ball?", ["under the table", "on the table", "in the table", "next to the box"], 0, "under"),
      live("sd2-c6-live4", "Where is the ball?", ["next to the box", "in the box", "on the box", "under the box"], 0, "next-to"),
      live("sd2-c6-live5", "Where ___ my shoes?", ["are", "is", "am", "be"], 0, "shoes"),
      live("sd2-c6-live6", "Is it on the bed? (no)", ["No, it isn't.", "Yes, it is.", "No, it is.", "Yes, it isn't."], 0, "bed"),
      live("sd2-c6-live7", "“Di bawah” is…", ["under", "on", "in", "next to"], 0, "under", true),
      live("sd2-c6-live8", "Fish live ___ water.", ["in", "on", "under", "next to"], 0, "fish"),
    ],
  },
};
