import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, text, tip, trMatch, trPick, tryIt, vocab, voice } from "../kit";

// Grade 1 (Fase A). Chapter 1 — Hello! · Chapter 2 — My Body

export const CH1: Level = {
  id: "sd1-ch1",
  title: "Chapter 1 — Hello!",
  description: "Say hello and goodbye, tell your name, and use magic words: please, thank you, sorry.",
  targetScore: "Listening · Speaking",
  cover: ["hello", "goodbye", "owl-wave"],
  pretest: {
    id: "sd1-c1-pre",
    title: "Chapter 1 Pretest",
    passPercent: 0,
    questions: [
      listen("sd1-c1-pre1", voice("Hello!"), "Listen. Choose the picture.", ["pic:hello", "pic:sleep", "pic:apple", "pic:ball"], 0, "Hello = halo. Kita mengucapkannya sambil melambaikan tangan."),
      listen("sd1-c1-pre2", voice("Goodbye!"), "Listen. Choose the picture.", ["pic:goodbye", "pic:hello", "pic:book", "pic:cat"], 0, "Goodbye = sampai jumpa. Diucapkan saat berpisah."),
      trPick("sd1-c1-pre3", "“Terima kasih” in English is…", ["Thank you", "Hello", "Sorry", "Goodbye"], 0, "Terima kasih = thank you."),
      pick("sd1-c1-pre4", "Your friend gives you a pencil. You say…", ["Thank you!", "Goodbye!", "Good night!", "Sorry!"], 0, "Saat menerima sesuatu, kita bilang Thank you!", { image: "pencil" }),
      listen("sd1-c1-pre5", voice("My name is Sari."), "Listen. What is her name?", ["Sari", "Dina", "Rani", "Nisa"], 0, "My name is Sari = Namaku Sari."),
    ],
  },
  lessons: [
    {
      id: "sd1-c1-l1",
      skill: "listening",
      title: "Hello and Goodbye",
      summary: "Hello, hi, goodbye, bye-bye, good morning.",
      sections: [
        {
          title: "Say hello!",
          blocks: [
            pics([["owl-wave", "Hello! I am Oli."]]),
            text("Halo, adik-adik! Ini **Oli** si burung hantu. Oli akan menemani kalian belajar bahasa Inggris. Ketuk kartu di bawah untuk mendengar suaranya, lalu tirukan dengan suara keras, ya!"),
            vocab([
              ["Hello!", "Halo!", "hello", "Hello, Oli!"],
              ["Hi!", "Hai!", "owl-wave", "Hi, friends!"],
              ["Good morning!", "Selamat pagi!", "morning", "Good morning, teacher!"],
              ["Goodbye!", "Sampai jumpa!", "goodbye", "Goodbye, Mom!"],
              ["Bye-bye!", "Dadah!", "goodbye", "Bye-bye, friends!"],
            ]),
            repeat(["Hello!", "Hi!", "Good morning!", "Goodbye!", "Bye-bye!"]),
          ],
        },
        {
          title: "Hello or goodbye?",
          blocks: [
            text("**Hello** dan **Hi** diucapkan saat **bertemu**. **Goodbye** dan **Bye-bye** diucapkan saat **berpisah**."),
            pics([["hello", "Hello! (meet)"], ["goodbye", "Goodbye! (leave)"]]),
            tryIt(pick("sd1-c1-l1-try1", "You come to school in the morning. You say…", ["Good morning!", "Goodbye!", "Bye-bye!"], 0, "Pagi hari dan baru bertemu → Good morning!", { image: "school" })),
            tryIt(match("sd1-c1-l1-try2", "Match the picture and the word.", [["pic:hello", "Hello!"], ["pic:goodbye", "Goodbye!"], ["pic:morning", "Good morning!"]], "Hello saat bertemu, Goodbye saat berpisah, Good morning saat pagi.")),
          ],
        },
      ],
      checkpoint: [
        listen("sd1-c1-l1-c1", voice("Hi!"), "Listen. Choose the picture.", ["pic:hello", "pic:sleep", "pic:cat"], 0, "Hi = hai, sama seperti Hello."),
        pick("sd1-c1-l1-c2", "School is over. You go home. You say…", ["Goodbye!", "Hello!", "Good morning!"], 0, "Pulang sekolah berarti berpisah → Goodbye!", { image: "goodbye" }),
        pick("sd1-c1-l1-c3", "It is morning. Choose the right word.", ["Good morning!", "Good night!", "Goodbye!"], 0, "Pagi hari → Good morning!", { image: "morning" }),
        trPick("sd1-c1-l1-c4", "“Halo” in English is…", ["Hello", "Bye", "Morning", "Sorry"], 0, "Halo = hello."),
        match("sd1-c1-l1-c5", "Match.", [["Hello!", "pic:hello"], ["Goodbye!", "pic:goodbye"]], "Hello = bertemu, Goodbye = berpisah."),
        pick("sd1-c1-l1-c6", "Which one do we say when we MEET a friend?", ["Hi!", "Bye-bye!", "Goodbye!"], 0, "Hi diucapkan saat bertemu.", { hots: true }),
      ],
    },
    {
      id: "sd1-c1-l2",
      skill: "speaking",
      title: "What Is Your Name?",
      summary: "My name is…, What is your name?, Nice to meet you.",
      sections: [
        {
          title: "Listen to Dina and Beni",
          blocks: [
            pics([["girl", "Dina"], ["boy", "Beni"]]),
            audio("Dina and Beni", say(["woman", "Hello! My name is Dina. What is your name?"], ["man", "Hi! My name is Beni."], ["woman", "Nice to meet you, Beni!"], ["man", "Nice to meet you too!"])),
            text("Untuk menyebut nama, kita pakai **My name is …** (Namaku …). Untuk bertanya nama teman: **What is your name?** (Siapa namamu?)"),
            repeat(["My name is Dina.", "What is your name?", "Nice to meet you!"]),
          ],
        },
        {
          title: "Your turn!",
          blocks: [
            tryIt(arrange("sd1-c1-l2-try1", "Put the words in order.", "My name is Beni", "Pola: My name is + nama.")),
            speaking({
              id: "sd1-c1-l2-say",
              title: "Say your name",
              prompt: "Press the button and say: **Hello! My name is …** (your name).",
              image: "owl-wave",
              seconds: 15,
              tips: ["Hello! My name is ____.", "Nice to meet you!"],
              models: [{ label: "Example", text: "Hello! My name is Sari. Nice to meet you!" }],
              rubric: ["I said **Hello**.", "I said **My name is** and my name.", "I spoke loudly and clearly."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd1-c1-l2-c1", voice("My name is Beni.", "man"), "Listen. What is his name?", ["Beni", "Dina", "Oli"], 0, "My name is Beni."),
        arrange("sd1-c1-l2-c2", "Put the words in order.", "What is your name", "What is your name? = Siapa namamu?"),
        pick("sd1-c1-l2-c3", "“What is your name?” Answer:", ["My name is Sari.", "Goodbye!", "Thank you!"], 0, "Ditanya nama → jawab My name is …"),
        fill("sd1-c1-l2-c4", "Complete.", "My", "is Dina.", ["name"], "My name is Dina."),
        trPick("sd1-c1-l2-c5", "“Siapa namamu?” in English is…", ["What is your name?", "How are you?", "Goodbye!"], 0, "Siapa namamu? = What is your name?"),
        pick("sd1-c1-l2-c6", "Dina says “Nice to meet you!”. Beni says…", ["Nice to meet you too!", "Good night!", "Sorry!"], 0, "Balasan yang sopan: Nice to meet you too!", { hots: true }),
      ],
    },
    {
      id: "sd1-c1-l3",
      skill: "vocabulary",
      title: "Magic Words",
      summary: "Please, thank you, you're welcome, sorry.",
      sections: [
        {
          title: "Kind words",
          blocks: [
            text("Ada kata-kata ajaib yang membuat semua orang senang. Yuk dengarkan!"),
            vocab([
              ["Please", "Tolong / silakan", "thumbs-up", "Pencil, please."],
              ["Thank you", "Terima kasih", "heart", "Thank you, Mom!"],
              ["You're welcome", "Sama-sama", "happy", "You're welcome!"],
              ["Sorry", "Maaf", "sad", "Sorry, Beni!"],
            ]),
            repeat(["Please.", "Thank you!", "You're welcome!", "Sorry!"]),
          ],
        },
        {
          title: "When do we say it?",
          blocks: [
            audio("At school", say(["woman", "Beni, can I have a pencil, please?"], ["man", "Here you are."], ["woman", "Thank you!"], ["man", "You're welcome!"])),
            text("- Minta sesuatu → **please**\n- Menerima sesuatu → **thank you**\n- Dibilang terima kasih → **you're welcome**\n- Berbuat salah → **sorry**"),
            tryIt(pick("sd1-c1-l3-try1", "You step on your friend's foot. You say…", ["Sorry!", "Thank you!", "Hello!"], 0, "Kalau berbuat salah, kita minta maaf: Sorry!", { image: "foot" })),
            tip("Ajak anak memakai kata ajaib ini di rumah setiap hari: *Water, please. Thank you, Mom!*"),
          ],
        },
      ],
      checkpoint: [
        pick("sd1-c1-l3-c1", "Your friend says “Thank you!”. You say…", ["You're welcome!", "Sorry!", "Goodbye!"], 0, "Thank you → You're welcome!"),
        trMatch("sd1-c1-l3-c2", "Match.", [["Please", "Tolong"], ["Thank you", "Terima kasih"], ["Sorry", "Maaf"]], "Please = tolong, thank you = terima kasih, sorry = maaf."),
        listen("sd1-c1-l3-c3", voice("Sorry!"), "Listen. Choose the face.", ["pic:sad", "pic:happy", "pic:angry"], 0, "Sorry diucapkan dengan wajah menyesal."),
        pick("sd1-c1-l3-c4", "You want water. You say: “Water, …”", ["please", "sorry", "goodbye"], 0, "Minta sesuatu → please.", { image: "water" }),
        fill("sd1-c1-l3-c5", "Complete.", "Thank", "!", ["you"], "Thank you!"),
        pickMany("sd1-c1-l3-c6", "Choose ALL the magic words.", ["please", "thank you", "sorry", "ball"], [0, 1, 2], "Please, thank you, dan sorry adalah kata ajaib. Ball (bola) bukan.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd1-c1-post",
    title: "Chapter 1 Posttest",
    passPercent: 70,
    questions: [
      listen("sd1-c1-post1", voice("Good morning!"), "Listen. Choose the picture.", ["pic:morning", "pic:night", "pic:goodbye", "pic:sleep"], 0, "Good morning = selamat pagi."),
      pick("sd1-c1-post2", "You go home. You say…", ["Goodbye!", "Good morning!", "Hello!", "Please!"], 0, "Berpisah → Goodbye!", { image: "goodbye" }),
      arrange("sd1-c1-post3", "Put the words in order.", "My name is Oli", "My name is + nama."),
      listen("sd1-c1-post4", voice("What is your name?", "man"), "Listen. Choose the answer.", ["My name is Rani.", "Thank you.", "Bye-bye!", "Sorry!"], 0, "Ditanya nama → My name is …"),
      trPick("sd1-c1-post5", "“Maaf” in English is…", ["Sorry", "Please", "Hello", "Thank you"], 0, "Maaf = sorry."),
      pick("sd1-c1-post6", "Mom gives you a cake. You say…", ["Thank you, Mom!", "Goodbye, Mom!", "Sorry, Mom!", "Hello, cake!"], 0, "Menerima sesuatu → Thank you!", { image: "cake" }),
      match("sd1-c1-post7", "Match the picture and the word.", [["pic:hello", "Hello!"], ["pic:goodbye", "Goodbye!"], ["pic:sad", "Sorry!"], ["pic:heart", "Thank you!"]], "Bagus sekali!"),
      fill("sd1-c1-post8", "Complete.", "Nice to", "you!", ["meet"], "Nice to meet you!"),
      pick("sd1-c1-post9", "Beni says “Thank you!”. Dina says “Sorry!”. Is that right?", ["No. She should say “You're welcome!”", "Yes, it is right.", "No. She should say “Hello!”", "No. She should say “Please!”"], 0, "Balasan Thank you adalah You're welcome, bukan Sorry.", { hots: true }),
      pick("sd1-c1-post10", "Which is the polite way to ask?", ["A pencil, please.", "Pencil! Now!", "Give pencil.", "Bye pencil."], 0, "Minta dengan sopan memakai please.", { hots: true, image: "pencil" }),
    ],
  },
  live: {
    title: "Live Quiz — Hello, Friends!",
    questions: [
      live("sd1-c1-live1", "We MEET a friend. We say…", ["Hello!", "Goodbye!", "Good night!", "Sorry!"], 0, "hello"),
      live("sd1-c1-live2", "We say this when we leave:", ["Goodbye!", "Hello!", "Good morning!", "Hi!"], 0, "goodbye"),
      live("sd1-c1-live3", "Someone gives you a gift. You say…", ["Thank you!", "Sorry!", "Bye!", "Hello!"], 0, "souvenir"),
      live("sd1-c1-live4", "“Thank you!” → …", ["You're welcome!", "Sorry!", "Good night!", "Please!"], 0, "heart"),
      live("sd1-c1-live5", "It is morning. You say…", ["Good morning!", "Good night!", "Goodbye!", "Sorry!"], 0, "morning"),
      live("sd1-c1-live6", "My ___ is Beni.", ["name", "nice", "nose", "book"], 0, "boy"),
      live("sd1-c1-live7", "You make a mistake. You say…", ["Sorry!", "Hello!", "Hi!", "Bye!"], 0, "sad"),
      live("sd1-c1-live8", "Asking politely: “Water, ___”", ["please", "sorry", "hello", "bye"], 0, "water"),
    ],
  },
};

export const CH2: Level = {
  id: "sd1-ch2",
  title: "Chapter 2 — My Body",
  description: "Name the parts of the body and move them: touch, clap, stamp, shake.",
  targetScore: "Listening · Vocabulary",
  cover: ["body", "hand", "eye"],
  pretest: {
    id: "sd1-c2-pre",
    title: "Chapter 2 Pretest",
    passPercent: 0,
    questions: [
      listen("sd1-c2-pre1", voice("Eye."), "Listen. Choose the picture.", ["pic:eye", "pic:ear", "pic:nose", "pic:mouth"], 0, "Eye = mata."),
      listen("sd1-c2-pre2", voice("Hand."), "Listen. Choose the picture.", ["pic:hand", "pic:foot", "pic:ear", "pic:eye"], 0, "Hand = tangan."),
      trPick("sd1-c2-pre3", "“Hidung” in English is…", ["nose", "mouth", "ear", "hand"], 0, "Hidung = nose."),
      pick("sd1-c2-pre4", "What is this?", ["mouth", "eye", "foot", "ear"], 0, "Ini mulut = mouth.", { image: "mouth" }),
      pick("sd1-c2-pre5", "We see with our…", ["eyes", "ears", "feet", "hands"], 0, "Kita melihat dengan mata = eyes.", { image: "eye" }),
    ],
  },
  lessons: [
    {
      id: "sd1-c2-l1",
      skill: "vocabulary",
      title: "My Face",
      summary: "Head, eyes, ears, nose, mouth, hair.",
      sections: [
        {
          title: "Parts of my face",
          blocks: [
            pics([["body", "This is me!"]]),
            text("Coba tunjuk bagian wajahmu sambil mendengarkan dan mengucapkan namanya dalam bahasa Inggris."),
            vocab([
              ["head", "kepala", "boy", "This is my head."],
              ["eyes", "mata", "eye", "I have two eyes."],
              ["ears", "telinga", "ear", "I have two ears."],
              ["nose", "hidung", "nose", "This is my nose."],
              ["mouth", "mulut", "mouth", "This is my mouth."],
              ["hair", "rambut", "girl", "My hair is black."],
            ]),
            repeat(["head", "eyes", "ears", "nose", "mouth", "hair"]),
          ],
        },
        {
          title: "Touch your nose!",
          blocks: [
            text("Mainkan permainan **Touch your…!** Dengarkan perintahnya, lalu sentuh bagian wajahmu secepat mungkin."),
            audio("Touch game", say(["woman", "Touch your nose!"], ["woman", "Touch your ears!"], ["woman", "Touch your mouth!"], ["woman", "Touch your head!"])),
            tip("Satu = **eye**, ear. Dua atau lebih = **eyes**, ears (tambah huruf **s**)."),
            tryIt(listen("sd1-c2-l1-try1", voice("Touch your ears!"), "Listen. What do you touch?", ["pic:ear", "pic:nose", "pic:mouth"], 0, "Ears = telinga.")),
          ],
        },
      ],
      checkpoint: [
        pick("sd1-c2-l1-c1", "What is this?", ["nose", "ear", "eye"], 0, "Ini hidung = nose.", { image: "nose" }),
        listen("sd1-c2-l1-c2", voice("Mouth."), "Listen. Choose the picture.", ["pic:mouth", "pic:eye", "pic:ear"], 0, "Mouth = mulut."),
        match("sd1-c2-l1-c3", "Match the picture and the word.", [["pic:eye", "eye"], ["pic:ear", "ear"], ["pic:nose", "nose"], ["pic:mouth", "mouth"]], "Eye, ear, nose, mouth!"),
        trPick("sd1-c2-l1-c4", "“Rambut” in English is…", ["hair", "head", "hand", "hat"], 0, "Rambut = hair."),
        fill("sd1-c2-l1-c5", "Complete: I have two ___ . 👀", "I have two", ".", ["eyes"], "Dua mata = two eyes (pakai s).", { image: "eye" }),
        pick("sd1-c2-l1-c6", "We eat with our…", ["mouth", "ears", "eyes"], 0, "Kita makan dengan mulut = mouth.", { hots: true, image: "rice" }),
      ],
    },
    {
      id: "sd1-c2-l2",
      skill: "listening",
      title: "Hands and Feet",
      summary: "Arms, hands, fingers, legs, feet, toes.",
      sections: [
        {
          title: "My body",
          blocks: [
            vocab([
              ["arm", "lengan", "body", "Raise your arm."],
              ["hand", "tangan", "hand", "Clap your hands."],
              ["finger", "jari tangan", "hand", "I have ten fingers."],
              ["leg", "kaki (tungkai)", "body", "Shake your leg."],
              ["foot", "kaki (telapak)", "foot", "Stamp your feet."],
              ["toe", "jari kaki", "foot", "Wiggle your toes."],
            ]),
            tip("Satu **foot**, dua **feet**. Kata ini berubah, bukan cuma ditambah s."),
            repeat(["arm", "hand", "finger", "leg", "foot", "feet", "toe"]),
          ],
        },
        {
          title: "Count your fingers",
          blocks: [
            pics([["hand", "five fingers"], ["hand*2", "ten fingers"]]),
            audio("Count with Oli", say(["woman", "One, two, three, four, five. Five fingers!"], ["woman", "Six, seven, eight, nine, ten. Ten fingers!"])),
            tryIt(pick("sd1-c2-l2-try1", "How many fingers on one hand?", ["five", "two", "ten"], 0, "Satu tangan punya lima jari = five.", { image: "hand" })),
          ],
        },
      ],
      checkpoint: [
        listen("sd1-c2-l2-c1", voice("Foot."), "Listen. Choose the picture.", ["pic:foot", "pic:hand", "pic:eye"], 0, "Foot = telapak kaki."),
        pick("sd1-c2-l2-c2", "What is this?", ["hand", "foot", "ear"], 0, "Ini tangan = hand.", { image: "hand" }),
        pick("sd1-c2-l2-c3", "One foot, two …", ["feet", "foots", "feets"], 0, "Bentuk jamak foot adalah feet."),
        trMatch("sd1-c2-l2-c4", "Match.", [["arm", "lengan"], ["leg", "kaki"], ["finger", "jari"]], "Arm = lengan, leg = kaki, finger = jari."),
        fill("sd1-c2-l2-c5", "Count and write: two hands = ___ fingers.", "two hands =", "fingers", ["ten", "10"], "5 + 5 = 10 = ten.", { image: "hand*2" }),
        pick("sd1-c2-l2-c6", "We walk with our…", ["feet", "hands", "ears"], 0, "Kita berjalan dengan kaki = feet.", { hots: true }),
      ],
    },
    {
      id: "sd1-c2-l3",
      skill: "speaking",
      title: "Move Your Body!",
      summary: "Clap, stamp, touch, shake, wave, jump.",
      sections: [
        {
          title: "Action words",
          blocks: [
            vocab([
              ["clap your hands", "tepuk tangan", "clap"],
              ["stamp your feet", "hentakkan kaki", "stamp"],
              ["wave your hand", "lambaikan tangan", "hello"],
              ["shake your body", "goyangkan badan", "body"],
              ["jump", "lompat", "jump"],
              ["touch your head", "sentuh kepalamu", "boy"],
            ]),
            text("Putar audio di bawah, lalu lakukan gerakannya bersama keluarga. Semakin seru semakin cepat hafal!"),
            audio("Action song", say(["woman", "Clap your hands, clap, clap, clap!"], ["woman", "Stamp your feet, stamp, stamp, stamp!"], ["woman", "Wave your hand, wave, wave, wave!"], ["woman", "Jump, jump, jump! Hooray!"])),
          ],
        },
        {
          title: "Simon says",
          blocks: [
            text("Main **Simon says**: lakukan gerakan hanya kalau ada kata *Simon says*. Kalau tidak ada, diam saja!"),
            audio("Simon says", say(["man", "Simon says, clap your hands."], ["man", "Simon says, touch your nose."], ["man", "Jump!"])),
            tryIt(pick("sd1-c2-l3-try1", "The last one was “Jump!” without “Simon says”. Do you jump?", ["No, I stay still.", "Yes, I jump.", "I clap my hands."], 0, "Tanpa kata Simon says, kita diam.", { hots: true })),
            speaking({
              id: "sd1-c2-l3-say",
              title: "Be the teacher",
              prompt: "Give two orders to your family, like a teacher: **Clap your hands!** **Stamp your feet!**",
              image: "clap",
              seconds: 20,
              models: [{ label: "Example", text: "Clap your hands! Touch your nose! Jump!" }],
              rubric: ["I gave two orders.", "I used a body word (hands, feet, nose…).", "My family understood me."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd1-c2-l3-c1", voice("Clap your hands!"), "Listen. Choose the picture.", ["pic:clap", "pic:stamp", "pic:jump"], 0, "Clap your hands = tepuk tangan."),
        listen("sd1-c2-l3-c2", voice("Stamp your feet!"), "Listen. Choose the picture.", ["pic:stamp", "pic:clap", "pic:sleep"], 0, "Stamp your feet = hentakkan kaki."),
        arrange("sd1-c2-l3-c3", "Put the words in order.", "Touch your nose", "Touch your + bagian tubuh."),
        pick("sd1-c2-l3-c4", "What is he doing?", ["jump", "clap", "sleep"], 0, "Gambar menunjukkan melompat = jump.", { image: "jump" }),
        trPick("sd1-c2-l3-c5", "“Lambaikan tanganmu” in English is…", ["Wave your hand.", "Stamp your feet.", "Touch your nose."], 0, "Wave = melambai."),
        pick("sd1-c2-l3-c6", "Which order uses your FEET?", ["Stamp!", "Clap!", "Wave!"], 0, "Stamp memakai kaki; clap dan wave memakai tangan.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd1-c2-post",
    title: "Chapter 2 Posttest",
    passPercent: 70,
    questions: [
      listen("sd1-c2-post1", voice("Ear."), "Listen. Choose the picture.", ["pic:ear", "pic:eye", "pic:nose", "pic:hand"], 0, "Ear = telinga."),
      pick("sd1-c2-post2", "What is this?", ["eye", "ear", "mouth", "foot"], 0, "Ini mata = eye.", { image: "eye" }),
      match("sd1-c2-post3", "Match.", [["pic:hand", "hand"], ["pic:foot", "foot"], ["pic:nose", "nose"], ["pic:mouth", "mouth"]], "Hebat!"),
      trPick("sd1-c2-post4", "“Telinga” in English is…", ["ear", "eye", "arm", "toe"], 0, "Telinga = ear."),
      listen("sd1-c2-post5", voice("Touch your head!"), "Listen. What do you touch?", ["head", "foot", "hand", "toe"], 0, "Head = kepala."),
      fill("sd1-c2-post6", "Complete.", "Clap your", "! 👏", ["hands", "hand"], "Clap your hands!", { image: "clap" }),
      pick("sd1-c2-post7", "One foot, two …", ["feet", "foots", "foot", "feets"], 0, "Foot → feet."),
      arrange("sd1-c2-post8", "Put the words in order.", "I have two ears", "I have two ears = Aku punya dua telinga."),
      pick("sd1-c2-post9", "We hear music with our…", ["ears", "eyes", "toes", "nose"], 0, "Mendengar dengan telinga = ears.", { hots: true }),
      pick("sd1-c2-post10", "We smell a flower with our…", ["nose", "mouth", "hands", "feet"], 0, "Mencium bau dengan hidung = nose.", { hots: true, image: "flower" }),
    ],
  },
  live: {
    title: "Live Quiz — My Body",
    questions: [
      live("sd1-c2-live1", "What is this?", ["eye", "ear", "nose", "mouth"], 0, "eye"),
      live("sd1-c2-live2", "What is this?", ["hand", "foot", "arm", "head"], 0, "hand"),
      live("sd1-c2-live3", "We hear with our…", ["ears", "eyes", "feet", "hands"], 0, "ear"),
      live("sd1-c2-live4", "One foot, two…", ["feet", "foots", "feets", "foot"], 0, "foot"),
      live("sd1-c2-live5", "What is he doing?", ["clap", "jump", "sleep", "eat"], 0, "clap"),
      live("sd1-c2-live6", "What is this?", ["nose", "mouth", "ear", "eye"], 0, "nose"),
      live("sd1-c2-live7", "How many fingers on one hand?", ["five", "two", "ten", "one"], 0, "hand"),
      live("sd1-c2-live8", "We eat with our…", ["mouth", "nose", "ears", "toes"], 0, "mouth"),
    ],
  },
};
