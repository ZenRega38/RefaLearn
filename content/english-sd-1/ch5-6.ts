import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, text, tip, trMatch, trPick, tryIt, vocab, voice } from "../kit";

// Grade 1 (Fase A). Chapter 5 — In My Classroom · Chapter 6 — Fruit I Like

export const CH5: Level = {
  id: "sd1-ch5",
  title: "Chapter 5 — In My Classroom",
  description: "Name things in the classroom and follow the teacher's instructions: stand up, sit down, open your book.",
  targetScore: "Listening · Following instructions",
  cover: ["whiteboard", "desk", "raise-hand"],
  pretest: {
    id: "sd1-c5-pre",
    title: "Chapter 5 Pretest",
    passPercent: 0,
    questions: [
      listen("sd1-c5-pre1", voice("Book."), "Listen. Choose the picture.", ["pic:book", "pic:bag", "pic:chair", "pic:door"], 0, "Book = buku."),
      listen("sd1-c5-pre2", voice("Stand up, please."), "Listen. Choose the picture.", ["pic:stand-up", "pic:sit-down", "pic:raise-hand", "pic:sleep"], 0, "Stand up = berdiri."),
      trPick("sd1-c5-pre3", "“Kursi” in English is…", ["chair", "table", "door", "bag"], 0, "Kursi = chair."),
      pick("sd1-c5-pre4", "What is this?", ["a door", "a window", "a book", "a desk"], 0, "Pintu = door.", { image: "door" }),
      pick("sd1-c5-pre5", "Teacher says “Sit down, please.” What do you do?", ["I sit on my chair.", "I open the door.", "I go home.", "I jump."], 0, "Sit down = duduk.", { image: "sit-down" }),
    ],
  },
  lessons: [
    {
      id: "sd1-c5-l1",
      skill: "vocabulary",
      title: "Things in My Classroom",
      summary: "Book, pencil, eraser, bag, chair, desk, door, window, whiteboard.",
      sections: [
        {
          title: "Look around!",
          blocks: [
            pics([["school", "my school"]]),
            text("Ayo lihat sekeliling kelas. Benda apa saja yang ada? Ketuk kartunya untuk mendengar namanya."),
            vocab([
              ["book", "buku", "book", "Open your book."],
              ["pencil", "pensil", "pencil", "I write with a pencil."],
              ["eraser", "penghapus", "eraser", "My eraser is pink."],
              ["bag", "tas", "bag", "Put it in your bag."],
              ["chair", "kursi", "chair", "Sit on your chair."],
              ["desk", "meja", "desk", "My book is on the desk."],
              ["door", "pintu", "door", "Close the door, please."],
              ["window", "jendela", "window", "Open the window, please."],
              ["whiteboard", "papan tulis", "whiteboard", "Look at the whiteboard."],
            ]),
            repeat(["book", "pencil", "eraser", "bag", "chair", "desk", "door", "window", "whiteboard"]),
          ],
        },
        {
          title: "This is my…",
          blocks: [
            text("Untuk menunjukkan benda milikmu, pakai **This is my …** (Ini … ku)."),
            audio("Show your things", say(["woman", "This is my bag."], ["woman", "This is my book."], ["man", "This is my pencil."])),
            tryIt(pick("sd1-c5-l1-try1", "Look. This is my…", ["bag", "door", "window"], 0, "Ini tas = bag.", { image: "bag" })),
          ],
        },
      ],
      checkpoint: [
        listen("sd1-c5-l1-c1", voice("Window."), "Listen. Choose the picture.", ["pic:window", "pic:door", "pic:desk"], 0, "Window = jendela."),
        pick("sd1-c5-l1-c2", "What is this?", ["a whiteboard", "a book", "a chair"], 0, "Papan tulis = whiteboard.", { image: "whiteboard" }),
        match("sd1-c5-l1-c3", "Match.", [["pic:pencil", "pencil"], ["pic:eraser", "eraser"], ["pic:chair", "chair"], ["pic:desk", "desk"]], "Kamu hafal isi kelasmu!"),
        trPick("sd1-c5-l1-c4", "“Meja” in English is…", ["desk", "chair", "door"], 0, "Meja = desk (atau table)."),
        arrange("sd1-c5-l1-c5", "Put the words in order.", "This is my book", "This is my + benda."),
        pick("sd1-c5-l1-c6", "You make a mistake in your writing. You need…", ["an eraser", "a door", "a window"], 0, "Untuk menghapus tulisan kita butuh penghapus.", { hots: true }),
      ],
    },
    {
      id: "sd1-c5-l2",
      skill: "listening",
      title: "Teacher Says",
      summary: "Stand up, sit down, open your book, close your book, raise your hand, listen, look.",
      sections: [
        {
          title: "Classroom instructions",
          blocks: [
            vocab([
              ["Stand up.", "Berdiri.", "stand-up"],
              ["Sit down.", "Duduk.", "sit-down"],
              ["Open your book.", "Buka bukumu.", "open-book"],
              ["Close your book.", "Tutup bukumu.", "book"],
              ["Raise your hand.", "Angkat tanganmu.", "raise-hand"],
              ["Listen.", "Dengarkan.", "ear"],
              ["Look.", "Lihat.", "eye"],
            ]),
            text("Guru bahasa Inggris sering memakai kalimat ini. Kalau kamu paham, kamu bisa langsung bergerak tanpa diterjemahkan!"),
          ],
        },
        {
          title: "Do what the teacher says",
          blocks: [
            audio("In class", say(["woman", "Good morning, class! Stand up, please."], ["woman", "Sit down, please."], ["woman", "Open your book."], ["woman", "Look at the whiteboard."], ["woman", "Listen to me."])),
            tip("Tambah **please** supaya lebih sopan: *Stand up, please.*"),
            tryIt(listen("sd1-c5-l2-try1", voice("Raise your hand."), "Listen. Choose the picture.", ["pic:raise-hand", "pic:sit-down", "pic:open-book"], 0, "Raise your hand = angkat tangan.")),
          ],
        },
      ],
      checkpoint: [
        listen("sd1-c5-l2-c1", voice("Sit down, please."), "Listen. Choose the picture.", ["pic:sit-down", "pic:stand-up", "pic:raise-hand"], 0, "Sit down = duduk."),
        listen("sd1-c5-l2-c2", voice("Open your book."), "Listen. Choose the picture.", ["pic:open-book", "pic:door", "pic:bag"], 0, "Open your book = buka bukumu."),
        trMatch("sd1-c5-l2-c3", "Match.", [["Stand up", "Berdiri"], ["Listen", "Dengarkan"], ["Look", "Lihat"]], "Stand up = berdiri, listen = dengarkan, look = lihat."),
        pick("sd1-c5-l2-c4", "You want to answer a question. You…", ["raise your hand", "close the door", "stand on the desk"], 0, "Kalau mau menjawab, angkat tangan dulu.", { image: "raise-hand" }),
        arrange("sd1-c5-l2-c5", "Put the words in order.", "Close your book please", "Close your book, please = tutup bukumu."),
        pick("sd1-c5-l2-c6", "Teacher says “Look at the whiteboard.” You use your…", ["eyes", "ears", "feet"], 0, "Look = melihat, pakai mata.", { hots: true }),
      ],
    },
    {
      id: "sd1-c5-l3",
      skill: "speaking",
      title: "May I…?",
      summary: "Asking politely in class: May I come in? May I borrow your pencil?",
      sections: [
        {
          title: "Polite questions",
          blocks: [
            text("Kalau mau minta izin di kelas, mulai dengan **May I …?** (Bolehkah saya …?)."),
            vocab([
              ["May I come in?", "Bolehkah saya masuk?", "door"],
              ["May I go to the toilet?", "Bolehkah saya ke toilet?", "bathtub"],
              ["May I borrow your pencil?", "Bolehkah saya pinjam pensilmu?", "pencil"],
              ["Yes, you may.", "Ya, boleh.", "thumbs-up"],
            ]),
            audio("At the door", say(["man", "Good morning, Miss. May I come in?"], ["woman", "Yes, you may. Come in, please."], ["man", "Thank you, Miss."])),
          ],
        },
        {
          title: "Your turn",
          blocks: [
            tryIt(pick("sd1-c5-l3-try1", "You are late. You knock on the door. You say…", ["May I come in?", "Goodbye!", "Sit down!"], 0, "Minta izin masuk → May I come in?", { image: "door" })),
            speaking({
              id: "sd1-c5-l3-say",
              title: "Ask politely",
              prompt: "Ask your friend to borrow something: **May I borrow your … ?** Then say **Thank you!**",
              image: "pencil",
              seconds: 20,
              models: [{ label: "Example", text: "May I borrow your eraser, please? … Thank you!" }],
              rubric: ["I started with **May I**.", "I said the thing I want.", "I said **Thank you**."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd1-c5-l3-c1", "You want to borrow a pencil. You say…", ["May I borrow your pencil?", "This is my pencil.", "Close your pencil."], 0, "Meminjam → May I borrow …?"),
        listen("sd1-c5-l3-c2", voice("May I come in?", "man"), "Listen. Where is he?", ["at the door", "on the chair", "at home"], 0, "May I come in? diucapkan di depan pintu."),
        fill("sd1-c5-l3-c3", "Complete.", "Yes, you", ".", ["may"], "Yes, you may = ya, boleh."),
        arrange("sd1-c5-l3-c4", "Put the words in order.", "May I go to the toilet", "May I go to the toilet? = Bolehkah saya ke toilet?"),
        trPick("sd1-c5-l3-c5", "“Bolehkah saya masuk?” in English is…", ["May I come in?", "Sit down, please.", "Open the door."], 0, "May I come in?"),
        pick("sd1-c5-l3-c6", "Which one is the most polite?", ["May I borrow your book, please?", "Give me your book!", "Book!"], 0, "May I … please? paling sopan.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd1-c5-post",
    title: "Chapter 5 Posttest",
    passPercent: 70,
    questions: [
      listen("sd1-c5-post1", voice("Desk."), "Listen. Choose the picture.", ["pic:desk", "pic:chair", "pic:door", "pic:bag"], 0, "Desk = meja."),
      pick("sd1-c5-post2", "What is this?", ["a window", "a door", "a book", "a whiteboard"], 0, "Jendela = window.", { image: "window" }),
      listen("sd1-c5-post3", voice("Stand up, please."), "Listen. Choose the picture.", ["pic:stand-up", "pic:sit-down", "pic:sleep", "pic:open-book"], 0, "Stand up = berdiri."),
      match("sd1-c5-post4", "Match.", [["pic:book", "book"], ["pic:bag", "bag"], ["pic:door", "door"], ["pic:whiteboard", "whiteboard"]], "Pintar!"),
      trPick("sd1-c5-post5", "“Angkat tanganmu” in English is…", ["Raise your hand.", "Close your book.", "Sit down.", "Look."], 0, "Raise your hand."),
      arrange("sd1-c5-post6", "Put the words in order.", "Open your book please", "Open your book, please."),
      fill("sd1-c5-post7", "Complete: May I ___ in?", "May I", "in?", ["come"], "May I come in?"),
      pick("sd1-c5-post8", "“May I borrow your eraser?” Your friend says…", ["Yes, you may.", "Goodbye.", "Sit down.", "It is red."], 0, "Jawaban izin: Yes, you may."),
      pick("sd1-c5-post9", "The room is hot. Teacher says: “Open the …, please.”", ["window", "book", "bag", "pencil"], 0, "Kalau panas, buka jendela.", { hots: true, image: "hot" }),
      pick("sd1-c5-post10", "Which thing do you NOT find in a classroom?", ["a bathtub", "a whiteboard", "a desk", "a chair"], 0, "Bak mandi ada di kamar mandi, bukan di kelas.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Classroom Fun",
    questions: [
      live("sd1-c5-live1", "What is this?", ["a whiteboard", "a window", "a door", "a desk"], 0, "whiteboard"),
      live("sd1-c5-live2", "What is he doing?", ["standing up", "sitting down", "sleeping", "eating"], 0, "stand-up"),
      live("sd1-c5-live3", "What is this?", ["a desk", "a chair", "a bag", "a bed"], 0, "desk"),
      live("sd1-c5-live4", "You want to answer. You…", ["raise your hand", "close the door", "go home", "sleep"], 0, "raise-hand"),
      live("sd1-c5-live5", "Polite: May I ___ in?", ["come", "go", "sit", "look"], 0, "door"),
      live("sd1-c5-live6", "We LISTEN with our…", ["ears", "eyes", "feet", "hands"], 0, "ear"),
      live("sd1-c5-live7", "What is this?", ["a window", "a door", "a book", "a sofa"], 0, "window"),
      live("sd1-c5-live8", "We use it to fix mistakes:", ["an eraser", "a door", "a chair", "a window"], 0, "eraser"),
    ],
  },
};

export const CH6: Level = {
  id: "sd1-ch6",
  title: "Chapter 6 — Fruit I Like",
  description: "Name fruit, say what you like and don't like, and ask a friend: Do you like…?",
  targetScore: "Speaking · Vocabulary",
  cover: ["apple", "watermelon", "strawberry"],
  pretest: {
    id: "sd1-c6-pre",
    title: "Chapter 6 Pretest",
    passPercent: 0,
    questions: [
      listen("sd1-c6-pre1", voice("Banana."), "Listen. Choose the fruit.", ["pic:banana", "pic:apple", "pic:grapes", "pic:mango"], 0, "Banana = pisang."),
      listen("sd1-c6-pre2", voice("Watermelon."), "Listen. Choose the fruit.", ["pic:watermelon", "pic:pineapple", "pic:orange-fruit", "pic:strawberry"], 0, "Watermelon = semangka."),
      trPick("sd1-c6-pre3", "“Anggur” in English is…", ["grapes", "mango", "apple", "orange"], 0, "Anggur = grapes."),
      pick("sd1-c6-pre4", "What fruit is this?", ["a pineapple", "a banana", "an apple", "a mango"], 0, "Nanas = pineapple.", { image: "pineapple" }),
      pick("sd1-c6-pre5", "“I like apples.” means…", ["Aku suka apel.", "Aku tidak suka apel.", "Aku makan nasi.", "Aku punya bola."], 0, "Like = suka.", { translate: true }),
    ],
  },
  lessons: [
    {
      id: "sd1-c6-l1",
      skill: "vocabulary",
      title: "Yummy Fruit",
      summary: "Apple, banana, orange, mango, grapes, watermelon, pineapple, strawberry.",
      sections: [
        {
          title: "At the fruit stall",
          blocks: [
            pics([["stall", "fruit stall"]]),
            vocab([
              ["apple", "apel", "apple", "An apple is red."],
              ["banana", "pisang", "banana", "A banana is yellow."],
              ["orange", "jeruk", "orange-fruit", "An orange is orange."],
              ["mango", "mangga", "mango", "I love mangoes!"],
              ["grapes", "anggur", "grapes", "Grapes are purple."],
              ["watermelon", "semangka", "watermelon", "A watermelon is big."],
              ["pineapple", "nanas", "pineapple", "A pineapple is sweet."],
              ["strawberry", "stroberi", "strawberry", "A strawberry is small and red."],
            ]),
            repeat(["apple", "banana", "orange", "mango", "grapes", "watermelon", "pineapple", "strawberry"]),
          ],
        },
        {
          title: "A or an?",
          blocks: [
            text("Pakai **an** sebelum buah yang bunyinya diawali huruf vokal: **an apple**, **an orange**. Yang lain pakai **a**: *a banana*, *a mango*."),
            pics([["apple", "an apple"], ["orange-fruit", "an orange"], ["banana", "a banana"], ["mango", "a mango"]]),
            tryIt(pick("sd1-c6-l1-try1", "Choose the right one.", ["an apple", "a apple", "apple an"], 0, "Apple diawali huruf a (vokal) → an apple.", { image: "apple" })),
          ],
        },
      ],
      checkpoint: [
        listen("sd1-c6-l1-c1", voice("Grapes."), "Listen. Choose the fruit.", ["pic:grapes", "pic:apple", "pic:banana"], 0, "Grapes = anggur."),
        pick("sd1-c6-l1-c2", "What fruit is this?", ["a strawberry", "a watermelon", "an orange"], 0, "Stroberi = strawberry.", { image: "strawberry" }),
        match("sd1-c6-l1-c3", "Match.", [["pic:mango", "mango"], ["pic:pineapple", "pineapple"], ["pic:watermelon", "watermelon"], ["pic:orange-fruit", "orange"]], "Segar sekali!"),
        trPick("sd1-c6-l1-c4", "“Semangka” in English is…", ["watermelon", "pineapple", "mango"], 0, "Semangka = watermelon."),
        pick("sd1-c6-l1-c5", "Choose the right one.", ["an orange", "a orange", "orange an"], 0, "Orange diawali bunyi vokal → an orange."),
        pick("sd1-c6-l1-c6", "Which fruit is the BIGGEST?", ["a watermelon", "a grape", "a strawberry"], 0, "Semangka paling besar.", { hots: true }),
      ],
    },
    {
      id: "sd1-c6-l2",
      skill: "speaking",
      title: "I Like Mangoes!",
      summary: "I like… / I don't like… / Do you like…? Yes, I do. No, I don't.",
      sections: [
        {
          title: "Like or don't like?",
          blocks: [
            pics([["yum", "I like it!"], ["yuck", "I don't like it."]]),
            text("**I like …** = aku suka. **I don't like …** = aku tidak suka. Kalau bicara tentang buah secara umum, tambahkan **s**: *I like banana**s***."),
            repeat(["I like mangoes.", "I like bananas.", "I don't like pineapples.", "Do you like apples?", "Yes, I do!", "No, I don't."]),
          ],
        },
        {
          title: "Ask a friend",
          blocks: [
            audio("Snack time", say(["woman", "Beni, do you like strawberries?"], ["man", "Yes, I do! I like strawberries."], ["woman", "Do you like grapes?"], ["man", "No, I don't. I like watermelons."])),
            tryIt(pick("sd1-c6-l2-try1", "Does Beni like grapes?", ["No, he doesn't.", "Yes, he does.", "He likes grapes and strawberries."], 0, "Beni bilang No, I don't.")),
            speaking({
              id: "sd1-c6-l2-say",
              title: "My favorite fruit",
              prompt: "Say one fruit you like and one fruit you don't like.",
              image: "basket",
              seconds: 25,
              tips: ["I like ____.", "I don't like ____."],
              models: [{ label: "Example", text: "I like mangoes. I like bananas. I don't like pineapples." }],
              rubric: ["I said **I like** + a fruit.", "I said **I don't like** + a fruit.", "I spoke clearly."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd1-c6-l2-c1", voice("I like bananas."), "Listen. What does she like?", ["pic:banana", "pic:apple", "pic:grapes"], 0, "Bananas = pisang."),
        pick("sd1-c6-l2-c2", "“Do you like mangoes?” You like mangoes. Answer:", ["Yes, I do.", "No, I don't.", "I am a mango."], 0, "Suka → Yes, I do."),
        fill("sd1-c6-l2-c3", "Complete: I ___ like pineapples. (not)", "I", "like pineapples.", ["don't", "do not"], "Tidak suka = I don't like."),
        arrange("sd1-c6-l2-c4", "Put the words in order.", "Do you like apples", "Do you like + buah?"),
        trPick("sd1-c6-l2-c5", "“Aku tidak suka anggur.” in English is…", ["I don't like grapes.", "I like grapes.", "Do you like grapes?"], 0, "Tidak suka = don't like."),
        pick("sd1-c6-l2-c6", "Beni says “No, I don't.” Does he like it?", ["No, he doesn't.", "Yes, he does.", "Yes, he loves it."], 0, "No, I don't = tidak suka.", { hots: true }),
      ],
    },
    {
      id: "sd1-c6-l3",
      skill: "reading",
      title: "My Fruit Basket",
      summary: "Read a short text about fruit and count.",
      sections: [
        {
          title: "Read with Oli",
          blocks: [
            {
              type: "passage",
              passage: {
                id: "sd1-c6-basket",
                title: "My Fruit Basket",
                pic: "basket",
                lines: ["Look at my basket!", "I have two apples.", "I have three bananas.", "I have one big watermelon.", "I like fruit. Yummy!"],
              },
            },
            audio("Listen to the text", say(["woman", "Look at my basket! I have two apples. I have three bananas. I have one big watermelon. I like fruit. Yummy!"])),
            tryIt(pick("sd1-c6-l3-try1", "How many apples?", ["two", "three", "one"], 0, "Line 2: I have two apples.", { passageId: "sd1-c6-basket" })),
          ],
        },
        {
          title: "Healthy fruit",
          blocks: [
            text("Buah itu sehat dan membuat tubuh kuat. Makan buah setiap hari, ya!"),
            pics(["apple", "banana", "watermelon"]),
            tip("Ajak anak membaca teks pendek ini dengan suara keras sambil menunjuk gambarnya."),
          ],
        },
      ],
      passages: [{ id: "sd1-c6-basket", title: "My Fruit Basket", pic: "basket", lines: ["Look at my basket!", "I have two apples.", "I have three bananas.", "I have one big watermelon.", "I like fruit. Yummy!"] }],
      checkpoint: [
        pick("sd1-c6-l3-c1", "How many bananas?", ["three", "two", "one"], 0, "Line 3: three bananas.", { passageId: "sd1-c6-basket" }),
        pick("sd1-c6-l3-c2", "The watermelon is…", ["big", "small", "blue"], 0, "Line 4: one big watermelon.", { passageId: "sd1-c6-basket" }),
        pickMany("sd1-c6-l3-c3", "Choose ALL the fruit in the basket.", ["apples", "bananas", "watermelon", "grapes"], [0, 1, 2], "Apel, pisang, dan semangka. Tidak ada anggur.", { passageId: "sd1-c6-basket" }),
        fill("sd1-c6-l3-c4", "Complete.", "I like fruit.", "!", ["yummy"], "Line 5: I like fruit. Yummy!", { passageId: "sd1-c6-basket" }),
        pick("sd1-c6-l3-c5", "Does the writer like fruit?", ["Yes, the writer likes fruit.", "No, the writer doesn't like fruit.", "The text doesn't say."], 0, "Line 5: I like fruit.", { passageId: "sd1-c6-basket" }),
        pick("sd1-c6-l3-c6", "How many pieces of fruit in the basket?", ["six", "five", "three"], 0, "2 + 3 + 1 = 6 = six.", { passageId: "sd1-c6-basket", hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd1-c6-post",
    title: "Chapter 6 Posttest",
    passPercent: 70,
    questions: [
      listen("sd1-c6-post1", voice("Pineapple."), "Listen. Choose the fruit.", ["pic:pineapple", "pic:mango", "pic:apple", "pic:strawberry"], 0, "Pineapple = nanas."),
      pick("sd1-c6-post2", "What fruit is this?", ["grapes", "bananas", "apples", "mangoes"], 0, "Anggur = grapes.", { image: "grapes" }),
      match("sd1-c6-post3", "Match.", [["pic:apple", "apple"], ["pic:banana", "banana"], ["pic:strawberry", "strawberry"], ["pic:watermelon", "watermelon"]], "Hebat!"),
      trPick("sd1-c6-post4", "“Mangga” in English is…", ["mango", "melon", "orange", "apple"], 0, "Mangga = mango."),
      pick("sd1-c6-post5", "Choose the right one.", ["an apple", "a apple", "an banana", "a orange"], 0, "An apple, a banana, an orange."),
      listen("sd1-c6-post6", say(["woman", "Do you like oranges?"], ["man", "No, I don't."]), "Listen. Does he like oranges?", ["No, he doesn't.", "Yes, he does.", "He likes only oranges."], 0, "No, I don't = tidak suka."),
      arrange("sd1-c6-post7", "Put the words in order.", "I like strawberries", "I like + buah (s)."),
      fill("sd1-c6-post8", "Answer: Do you like mangoes? Yes, I ___ .", "Yes, I", ".", ["do"], "Yes, I do."),
      pick("sd1-c6-post9", "I am yellow and long. Monkeys love me. What am I?", ["a banana", "an apple", "grapes", "a watermelon"], 0, "Kuning, panjang, disukai monyet → pisang.", { hots: true }),
      pick("sd1-c6-post10", "Dina doesn't like sour fruit. Which fruit is best for her?", ["a sweet mango", "a sour lemon", "a sour orange", "no fruit"], 0, "Dina tidak suka asam, jadi pilih mangga yang manis.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Fruit Party",
    questions: [
      live("sd1-c6-live1", "What fruit is it?", ["watermelon", "apple", "banana", "grapes"], 0, "watermelon"),
      live("sd1-c6-live2", "What fruit is it?", ["pineapple", "mango", "orange", "strawberry"], 0, "pineapple"),
      live("sd1-c6-live3", "Choose the right one.", ["an apple", "a apple", "an banana", "a orange"], 0, "apple"),
      live("sd1-c6-live4", "Do you like grapes? (no)", ["No, I don't.", "Yes, I do.", "No, I do.", "Yes, I don't."], 0, "grapes"),
      live("sd1-c6-live5", "What color is a banana?", ["yellow", "blue", "purple", "black"], 0, "banana"),
      live("sd1-c6-live6", "What fruit is it?", ["strawberry", "apple", "grapes", "mango"], 0, "strawberry"),
      live("sd1-c6-live7", "Monkeys love…", ["bananas", "chairs", "books", "kites"], 0, "banana"),
      live("sd1-c6-live8", "I ___ like durian. (tidak)", ["don't", "do", "am", "is"], 0, "yuck", true),
    ],
  },
};
