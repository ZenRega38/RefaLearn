import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 10 (SMA, Fase E). Chapter 1 — Kindness Matters · Chapter 2 — Wonderful Indonesia

const BLOG: Passage = {
  id: "sma10-c1-blog",
  title: "The Note on My Desk",
  pic: "envelope",
  lines: [
    "During my first month of senior high school, I felt invisible. I had moved from a small town in Flores to Kupang, and I didn't know anyone in my class.",
    "One Monday morning, I found a small yellow note on my desk. It said: “Your presentation about Komodo dragons was amazing. You explained it so clearly! — A classmate.”",
    "I read it again and again. Nobody had ever complimented my work like that before.",
    "Later that week, a girl named Ruth congratulated me on my science test. “You got the highest score in the class! Well done!” she said with a big smile.",
    "When my grandmother was in hospital, three classmates noticed that I was quiet. “Is everything all right? We're here if you need anything,” one of them said.",
    "Those small words changed everything. I started talking more, joined the debate club and made real friends.",
    "Months later, I discovered that Ruth had written the note. She told me she always tried to say one kind thing to someone every day.",
    "Now I do the same. A compliment takes ten seconds, but it can stay in someone's heart for years.",
  ],
};

export const CH1: Level = {
  id: "sma10-ch1",
  title: "Chapter 1 — Kindness Matters",
  description: "Give and respond to compliments, congratulate people, express care and sympathy in formal and informal situations, and write a reflective personal recount.",
  targetScore: "Speaking · Listening · Writing",
  cover: ["heart", "thumbs-up", "trophy"],
  pretest: {
    id: "sma10-c1-pre",
    title: "Chapter 1 Pretest",
    passPercent: 0,
    questions: [
      pick("sma10-c1-pre1", "Your friend: “I love your new haircut!” The most natural reply is…", ["Thanks! That's so kind of you.", "Yes, I know.", "No, it's ugly.", "You're welcome."], 0, "Menerima pujian dengan terima kasih."),
      listen("sma10-c1-pre2", voice("Congratulations on winning the scholarship! You really deserve it."), "Listen. What is the speaker doing?", ["congratulating someone", "apologising", "complaining", "asking for help"], 0, "Congratulations = ucapan selamat."),
      trPick("sma10-c1-pre3", "“Aku turut prihatin mendengarnya.” in English is…", ["I'm sorry to hear that.", "I'm happy to hear that.", "I'm sorry for hearing.", "Sorry, I can't hear."], 0, "Ungkapan simpati."),
      pick("sma10-c1-pre4", "Congratulations ___ your graduation!", ["on", "for", "to", "at"], 0, "Congratulations on."),
      pick("sma10-c1-pre5", "Which is a formal way to show care to your teacher?", ["I hope you feel better soon, Ma'am.", "Get well, bro!", "Whatever.", "You look terrible."], 0, "Formal dan sopan."),
    ],
  },
  lessons: [
    {
      id: "sma10-c1-l1",
      skill: "speaking",
      title: "Compliments and Congratulations",
      summary: "Specific compliments, responding modestly, and congratulating formally and informally.",
      sections: [
        {
          title: "Giving and responding to compliments",
          blocks: [
            table(["Giving", "Responding"], [["You did a great job on …", "Thanks! I worked really hard on it."], ["I really like the way you …", "That's very kind of you to say."], ["Your … is impressive / amazing.", "Thank you. I'm glad you liked it."], ["What a beautiful …!", "Oh, thanks! My aunt made it."], ["You're really good at …", "Thanks, but I still have a lot to learn."]]),
            tip("Pujian yang **spesifik** terasa lebih tulus: *Your conclusion was really convincing* lebih bermakna daripada *Nice presentation*. Saat menerima pujian, cukup bilang **terima kasih**; dalam budaya berbahasa Inggris, menolak pujian (*No, it's bad*) bisa terdengar canggung."),
          ],
        },
        {
          title: "Congratulating",
          blocks: [
            table(["Situation", "Informal", "Formal"], [["Winning", "Way to go! You nailed it!", "Please accept my warmest congratulations on your achievement."], ["Graduation", "Congrats on graduating!", "Congratulations on your graduation. We are very proud of you."], ["New baby / wedding", "Congrats! That's wonderful news!", "I would like to congratulate you on your wedding."], ["Responding", "Thanks a lot!", "Thank you very much. I really appreciate it."]]),
            audio("After the competition", say(["woman", "Bima! I heard you won the provincial speech contest. Congratulations!"], ["man", "Thanks, Sari! I still can't believe it."], ["woman", "You deserve it. The part about plastic in our oceans was really moving."], ["man", "That's so kind of you. I practised it in front of my mirror every night!"])),
            tryIt(pick("sma10-c1-l1-try1", "What did Sari compliment specifically?", ["the part about plastic in the oceans", "Bima's shirt", "Bima's mirror"], 0, "Pujian spesifik.")),
            repeat(["Congratulations on your achievement!", "You did a great job on the poster.", "That's very kind of you to say.", "I really appreciate it."]),
          ],
        },
      ],
      checkpoint: [
        listen("sma10-c1-l1-c1", say(["man", "Your batik painting is stunning. The colours are so bright!"], ["woman", "Thank you! I used natural dyes from leaves."]), "Listen. How does the woman respond to the compliment?", ["She thanks him and explains.", "She disagrees.", "She ignores him."], 0, "Menerima dan menjelaskan."),
        pick("sma10-c1-l1-c2", "Which compliment is the most specific?", ["Your introduction made me want to read the whole essay.", "Nice.", "Good job, I guess."], 0, "Spesifik = tulus."),
        match("sma10-c1-l1-c3", "Match the expression and the situation.", [["Way to go!", "a friend wins a match"], ["Please accept my warmest congratulations.", "a formal letter to a principal"], ["Congrats on the new baby!", "a cousin becomes a parent"], ["Thank you, I really appreciate it.", "responding to congratulations"]], "Konteks ungkapan."),
        fill("sma10-c1-l1-c4", "Complete: That's very kind ___ you to say.", "That's very kind", "you to say.", ["of"], "Kind of you."),
        trPick("sma10-c1-l1-c5", "“Kamu pantas mendapatkannya!” in English is…", ["You deserve it!", "You serve it!", "You desert it!"], 0, "Deserve = pantas mendapatkan."),
        pick("sma10-c1-l1-c6", "Your teacher compliments your essay in front of the class. What is the most appropriate response?", ["Thank you, Ma'am. I'm glad you liked it.", "No, it's really bad.", "I know I'm the best."], 0, "Sopan dan rendah hati tanpa menolak.", { hots: true }),
      ],
    },
    {
      id: "sma10-c1-l2",
      skill: "listening",
      title: "Expressing Care and Sympathy",
      summary: "Noticing, asking, offering help and showing sympathy appropriately.",
      sections: [
        {
          title: "Showing that you care",
          blocks: [
            table(["Function", "Expressions"], [["Noticing", "You look a bit down. / You seem worried."], ["Asking", "Is everything all right? / What's bothering you?"], ["Sympathising", "I'm so sorry to hear that. / That must be really hard."], ["Offering help", "Is there anything I can do? / Let me know if you need anything."], ["Encouraging", "Hang in there. / I'm sure things will get better."], ["Formal condolence", "Please accept my deepest condolences."]]),
            pics([["sad", "You look down."], ["hand", "Can I help?"], ["heart", "I'm here for you."], ["sick", "Get well soon."]]),
          ],
        },
        {
          title: "Listening for feelings",
          blocks: [
            audio("A worried friend", say(["woman", "Hey, Dimas. You've been quiet all day. Is everything all right?"], ["man", "Not really. My father lost his job last week, and I'm worried I'll have to leave school."], ["woman", "Oh, I'm so sorry to hear that. That must be really stressful."], ["man", "Yeah. I can't concentrate in class."], ["woman", "Have you talked to the school counsellor? There are scholarships for students in your situation. I can go with you if you like."], ["man", "Really? Thanks, Nia. That would help a lot."])),
            tryIt(pick("sma10-c1-l2-try1", "What does Nia suggest?", ["talking to the school counsellor about scholarships", "leaving school", "finding a job for his father"], 0, "Saran konkret.")),
            warn("Hindari respons yang meremehkan perasaan seperti *Don't be sad, it's nothing* atau *Others have it worse*. Dengarkan dulu, tunjukkan empati, lalu tawarkan bantuan."),
          ],
        },
      ],
      checkpoint: [
        listen("sma10-c1-l2-c1", voice("Please accept my deepest condolences on the loss of your grandfather."), "Listen. When do people say this?", ["when someone has died", "at a birthday party", "after a football match"], 0, "Ungkapan duka cita formal."),
        pick("sma10-c1-l2-c2", "Your friend failed the driving test. The most supportive reply is…", ["That's a shame. You'll pass next time. Want to practise together?", "Ha! I passed on my first try.", "Driving tests are easy."], 0, "Empati + dorongan + tawaran."),
        pick("sma10-c1-l2-c3", "Why was Dimas quiet?", ["His father lost his job.", "He failed a test.", "He was sick."], 0, "My father lost his job."),
        fill("sma10-c1-l2-c4", "Complete: That ___ be really hard for you.", "That", "be really hard for you.", ["must"], "Must = pasti (dugaan kuat)."),
        trPick("sma10-c1-l2-c5", "“Kabari aku kalau kamu butuh sesuatu.” in English is…", ["Let me know if you need anything.", "Tell me what you needed.", "Let me know you need nothing."], 0, "Let me know if…"),
        pick("sma10-c1-l2-c6", "Which response would make a sad friend feel WORSE?", ["Stop crying. It's not a big deal.", "I'm here if you want to talk.", "That sounds really difficult."], 0, "Meremehkan perasaan.", { hots: true }),
      ],
    },
    {
      id: "sma10-c1-l3",
      skill: "reading",
      title: "Reading: The Note on My Desk",
      summary: "A reflective recount; writing about a time someone's kindness changed you.",
      passages: [BLOG],
      sections: [
        {
          title: "A reflective recount",
          blocks: [
            { type: "passage", passage: BLOG },
            audio("Listen and read", say(["woman", BLOG.lines.join(" ")])),
            vocab([["invisible", "tak terlihat/tak dianggap", "eye"], ["compliment", "memuji / pujian", "thumbs-up"], ["discover", "mengetahui/menemukan", "question"], ["stay in someone's heart", "membekas di hati", "heart"]], "Words from the text"),
            text("**Reflective recount** tidak hanya menceritakan kejadian, tetapi juga **refleksi**: apa yang dipelajari dan bagaimana penulis berubah (baris 6 dan 8)."),
          ],
        },
        {
          title: "Write your reflection",
          blocks: [
            tryIt(pick("sma10-c1-l3-try1", "Where did the writer move from?", ["a small town in Flores", "Jakarta", "Kupang"], 0, "Baris 1.", { passageId: BLOG.id })),
            writing({
              id: "sma10-c1-l3-write",
              title: "Small words, big change",
              prompt: "Write a reflective recount about a time when someone's kind words or actions (a compliment, congratulations, or care) made a difference to you. Include what happened, how you felt and what you learned.",
              image: "heart",
              minWords: 180,
              maxWords: 320,
              tips: ["Orientation: When I was …, I …", "Events: One day, … / Later, … / Then, …", "Turning point: Those words …", "Reflection: Since then, I … / Now I realise that …"],
              models: [{ label: "Example", text: "When I was in Grade 8, I was terrified of speaking English. Whenever the teacher asked me a question, my face turned red and I whispered my answer.\nOne afternoon, after a speaking test that I thought I had failed, my English teacher, Mr. Hendra, stopped me in the corridor. “Your pronunciation of the 'th' sound was perfect today,” he said. “I could hear that you practised.” Then he gave me a thumbs-up and walked away.\nIt was a tiny comment, but I couldn't stop smiling. He had noticed something specific, something I had worked on for weeks while watching videos at home.\nAfter that, I started to raise my hand more often. I made mistakes, of course, but I no longer felt ashamed of them. In Grade 9, I even joined a storytelling competition and reached the semi-final.\nNow I realise that encouragement does not need to be big. It needs to be honest and specific. That is why I always try to tell my friends exactly what they did well." }],
              rubric: ["I described the situation and my feelings before the event.", "I told the events in order with time connectors.", "I quoted the kind words.", "I reflected on what I learned and how I changed.", "I used past tenses accurately (simple past, past continuous, past perfect)."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sma10-c1-l3-c1", "How did the writer feel during the first month?", ["invisible and lonely", "popular", "angry"], 0, "Baris 1.", { passageId: BLOG.id }),
        pick("sma10-c1-l3-c2", "What did the note compliment?", ["a presentation about Komodo dragons", "a science test", "a drawing"], 0, "Baris 2.", { passageId: BLOG.id }),
        fill("sma10-c1-l3-c3", "Complete.", "I started talking more, joined the", "club and made real friends.", ["debate"], "Baris 6.", { passageId: BLOG.id }),
        pickMany("sma10-c1-l3-c4", "Choose ALL the kind actions in the text.", ["a written compliment", "congratulations on a test", "asking if everything was all right", "giving money"], [0, 1, 2], "Baris 2, 4, 5.", { passageId: BLOG.id }),
        pick("sma10-c1-l3-c5", "Why do you think Ruth didn't sign the note?", ["She wanted the kindness to be about the writer, not herself.", "She forgot her name.", "She was angry."], 0, "Kebaikan tanpa pamrih.", { passageId: BLOG.id, hots: true }),
        pick("sma10-c1-l3-c6", "Which line expresses the writer's main reflection?", ["line 8", "line 1", "line 4"], 0, "Pelajaran utama.", { passageId: BLOG.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma10-c1-post",
    title: "Chapter 1 Posttest",
    passPercent: 70,
    passages: [BLOG],
    questions: [
      pick("sma10-c1-post1", "“Your speech was really inspiring.” — “___”", ["Thank you. I'm glad it helped.", "No, it was bad.", "You're welcome.", "Sorry about that."], 0, "Menerima pujian."),
      listen("sma10-c1-post2", say(["woman", "I heard your house was flooded. Are you all right?"], ["man", "We're okay, but we lost most of our furniture."], ["woman", "I'm so sorry. If you need a place to stay, you're welcome at our house."]), "Listen. What does the woman offer?", ["a place to stay", "new furniture", "money", "a job"], 0, "Tawaran bantuan."),
      trPick("sma10-c1-post3", "“Turut berduka cita yang sedalam-dalamnya.” (formal) in English is…", ["Please accept my deepest condolences.", "Please accept my best congratulations.", "I deeply condole you happily.", "My sorry is deep."], 0, "Condolences."),
      pick("sma10-c1-post4", "Which is the most formal congratulation?", ["On behalf of the school, I would like to congratulate you on your achievement.", "Way to go!", "Congrats, dude!", "Nice one!"], 0, "On behalf of … = formal."),
      arrange("sma10-c1-post5", "Put the words in order.", "Is there anything I can do to help", "Menawarkan bantuan."),
      pick("sma10-c1-post6", "What did Ruth congratulate the writer on?", ["the highest score on a science test", "the presentation", "joining the debate club", "moving to Kupang"], 0, "Baris 4.", { passageId: BLOG.id }),
      match("sma10-c1-post7", "Match the situation and the best expression.", [["a friend's grandmother died", "I'm so sorry for your loss."], ["a friend got into university", "Congratulations! You deserve it."], ["a friend looks worried", "Is everything all right?"], ["a friend is sick", "Get well soon!"]], "Ungkapan yang tepat."),
      fill("sma10-c1-post8", "Complete: Congratulations ___ passing your exam!", "Congratulations", "passing your exam!", ["on"], "Congratulations on + -ing."),
      pick("sma10-c1-post9", "What is the main message of the text?", ["Small acts of kindness can have a big impact.", "Moving to a new city is easy.", "Science tests are important.", "Notes should always be signed."], 0, "Baris 8.", { passageId: BLOG.id, hots: true }),
      pick("sma10-c1-post10", "How did the writer change from the beginning to the end?", ["from feeling invisible to being kind to others", "from popular to lonely", "from kind to selfish", "no change"], 0, "Perkembangan tokoh.", { passageId: BLOG.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Spread Kindness",
    questions: [
      live("sma10-c1-live1", "Congratulations ___ your win!", ["on", "for", "to", "at"], 0, "trophy"),
      live("sma10-c1-live2", "Reply to a compliment:", ["Thank you!", "No way.", "You're welcome.", "Sorry."], 0, "happy"),
      live("sma10-c1-live3", "Formal sympathy for a death:", ["condolences", "congratulations", "compliments", "complaints"], 0, "flower"),
      live("sma10-c1-live4", "“Kamu pantas mendapatkannya.” =", ["You deserve it.", "You desert it.", "You serve it.", "You reserve it."], 0, "thumbs-up", true),
      live("sma10-c1-live5", "Noticing someone sad:", ["You look a bit down.", "You look great!", "Way to go!", "Nice shoes!"], 0, "sad"),
      live("sma10-c1-live6", "Offer help:", ["Let me know if you need anything.", "Leave me alone.", "Not my problem.", "Good luck with that."], 0, "hand"),
      live("sma10-c1-live7", "Informal congrats:", ["Way to go!", "Please accept…", "I would like to…", "On behalf of…"], 0, "fireworks"),
      live("sma10-c1-live8", "Best compliment:", ["specific and honest", "short and vague", "sarcastic", "loud"], 0, "heart"),
    ],
  },
};

const RAJA: Passage = {
  id: "sma10-c2-raja",
  title: "Raja Ampat: The Last Paradise",
  pic: "island",
  lines: [
    "Raja Ampat, which means “Four Kings”, is an archipelago of more than 1,500 small islands off the western tip of New Guinea, in the province of Southwest Papua.",
    "It is located at the heart of the Coral Triangle, an area which is often called the Amazon of the seas.",
    "Scientists have recorded more than 1,500 species of reef fish and around 75 percent of the world's known coral species in these waters.",
    "The islands are covered in dense green rainforest, and many of them rise from the sea like giant mushrooms made of limestone.",
    "The most famous view is from the top of Piaynemo, where visitors climb more than 300 wooden steps to see dozens of tiny islands scattered across turquoise lagoons.",
    "On land, lucky visitors may see the red bird-of-paradise, whose bright feathers and dance make it one of the most beautiful birds on Earth.",
    "Local Papuan communities play an important role in protecting the area. Many villages have traditional rules, called sasi, which forbid fishing in certain places for months.",
    "Every visitor must buy an environmental service card, and the money is used for conservation and community programmes.",
    "Raja Ampat is not easy to reach, but for many travellers, that is exactly what keeps it a paradise.",
  ],
};

export const CH2: Level = {
  id: "sma10-ch2",
  title: "Chapter 2 — Wonderful Indonesia",
  description: "Read and write descriptive texts about tourist destinations, use complex noun phrases and adjective clauses, and present a place persuasively.",
  targetScore: "Reading · Structure · Writing",
  cover: ["island", "beach", "mountain"],
  pretest: {
    id: "sma10-c2-pre",
    title: "Chapter 2 Pretest",
    passPercent: 0,
    questions: [
      pick("sma10-c2-pre1", "The first part of a descriptive text is the…", ["identification", "resolution", "recommendation", "orientation"], 0, "Descriptive: identification → description."),
      listen("sma10-c2-pre2", voice("Mount Bromo, which is an active volcano in East Java, is famous for its sunrise."), "Listen. What is Mount Bromo famous for?", ["its sunrise", "its beaches", "its temples", "its snow"], 0, "Famous for its sunrise."),
      trPick("sma10-c2-pre3", "“Kepulauan” in English is…", ["archipelago", "architecture", "peninsula", "continent"], 0, "Archipelago."),
      pick("sma10-c2-pre4", "Choose the correct noun phrase.", ["a beautiful white sandy beach", "a white beautiful sandy beach", "a sandy white beautiful beach", "a beach beautiful white sandy"], 0, "Opini → warna → material/tipe → benda."),
      pick("sma10-c2-pre5", "Lake Kelimutu is famous for its lakes ___ change colour.", ["which", "who", "whose", "where"], 0, "Benda → which."),
    ],
  },
  lessons: [
    {
      id: "sma10-c2-l1",
      skill: "reading",
      title: "Reading: Raja Ampat",
      summary: "Structure and features of a descriptive text about a place.",
      passages: [RAJA],
      sections: [
        {
          title: "The last paradise",
          blocks: [
            { type: "passage", passage: RAJA },
            audio("Listen and read", say(["man", RAJA.lines.join(" ")])),
            vocab([["archipelago", "kepulauan", "island"], ["limestone", "batu kapur", "mountain"], ["lagoon", "laguna", "beach"], ["scattered", "tersebar", "map"], ["forbid", "melarang", "hand"], ["conservation", "pelestarian", "earth"]], "Words from the text"),
          ],
        },
        {
          title: "How the text works",
          blocks: [
            table(["Part", "Content", "Lines"], [["Identification", "what and where Raja Ampat is", "1–2"], ["Description: marine life", "fish and coral", "3"], ["Description: landscape", "islands, Piaynemo", "4–5"], ["Description: wildlife", "bird-of-paradise", "6"], ["Description: people and conservation", "sasi, fees", "7–8"], ["Concluding comment", "writer's impression", "9"]]),
            text("Teks deskriptif tempat wisata memakai **simple present**, **noun phrase** yang kaya (*dense green rainforest*), **adjective clause** (*which means…*, *whose bright feathers…*), **simile** (*like giant mushrooms*), dan **data faktual** (angka, lokasi)."),
            tryIt(pick("sma10-c2-l1-try1", "What does “Raja Ampat” mean?", ["Four Kings", "Four Islands", "King of the Sea"], 0, "Baris 1.", { passageId: RAJA.id })),
          ],
        },
      ],
      checkpoint: [
        pick("sma10-c2-l1-c1", "Why is the Coral Triangle called “the Amazon of the seas”?", ["It has extremely rich biodiversity.", "It is in South America.", "It has a big river."], 0, "Keanekaragaman hayati (baris 2–3).", { passageId: RAJA.id }),
        pick("sma10-c2-l1-c2", "What do visitors do at Piaynemo?", ["climb wooden steps to a viewpoint", "dive with sharks", "watch birds dance"], 0, "Baris 5.", { passageId: RAJA.id }),
        fill("sma10-c2-l1-c3", "Complete.", "Many villages have traditional rules, called", ", which forbid fishing in certain places.", ["sasi"], "Baris 7.", { passageId: RAJA.id }),
        pickMany("sma10-c2-l1-c4", "Choose ALL the ways Raja Ampat is protected.", ["traditional sasi rules", "an environmental service card", "community programmes", "building big hotels on every island"], [0, 1, 2], "Baris 7–8.", { passageId: RAJA.id }),
        pick("sma10-c2-l1-c5", "“…that is exactly what keeps it a paradise.” What does “that” refer to?", ["the fact that it is difficult to reach", "the bird-of-paradise", "the environmental card"], 0, "Rujukan kata 'that' (baris 9).", { passageId: RAJA.id, hots: true }),
        pick("sma10-c2-l1-c6", "Which simile does the writer use to describe the islands?", ["like giant mushrooms", "like a king's crown", "like a blue carpet"], 0, "Baris 4.", { passageId: RAJA.id, hots: true }),
      ],
    },
    {
      id: "sma10-c2-l2",
      skill: "structure",
      title: "Noun Phrases and Adjective Clauses",
      summary: "Building rich descriptions: adjective order, compound adjectives, defining and non-defining clauses.",
      sections: [
        {
          title: "Adjective order",
          blocks: [
            table(["Opinion", "Size", "Age", "Shape", "Colour", "Origin", "Material", "Purpose", "Noun"], [["stunning", "", "", "", "white", "", "sandy", "", "beach"], ["", "small", "old", "", "", "Javanese", "wooden", "", "house"], ["charming", "", "", "", "", "Balinese", "", "fishing", "village"]]),
            text("**Compound adjectives** memakai tanda hubung: *a world-famous temple, a well-preserved palace, a 300-step staircase, a two-hour boat trip* (tanpa -s pada *hour*)."),
            examples([{ wrong: "a two-hours trip", right: "a two-hour trip" }, { wrong: "a wooden old big boat", right: "a big old wooden boat" }], "Common mistakes"),
          ],
        },
        {
          title: "Adjective clauses",
          blocks: [
            table(["Type", "Example", "Note"], [["Defining (no commas)", "It is a place where turtles lay their eggs.", "informasi penting"], ["Non-defining (commas)", "Kelimutu, which is in Flores, has three coloured lakes.", "informasi tambahan; tidak pakai that"], ["whose", "Toraja is a region whose funeral ceremonies are world-famous.", "kepemilikan"], ["where / when", "August is the month when the festival takes place.", "tempat / waktu"], ["Reduced clause", "The temple built in the 9th century… (= which was built)", "lebih ringkas"]]),
            pics([["mountain", "Kelimutu"], ["beach", "Pink Beach"], ["museum", "Prambanan"], ["island", "Derawan"]]),
            tryIt(pick("sma10-c2-l2-try1", "Derawan is an island ___ you can swim with stingless jellyfish.", ["where", "which", "whose"], 0, "Tempat → where.")),
          ],
        },
      ],
      checkpoint: [
        listen("sma10-c2-l2-c1", voice("Toraja is a region whose traditional houses have boat-shaped roofs."), "Listen. What is special about Toraja houses?", ["boat-shaped roofs", "glass walls", "flat roofs"], 0, "Boat-shaped roofs."),
        pick("sma10-c2-l2-c2", "Choose the correct order.", ["a lovely little old fishing village", "an old little lovely fishing village", "a fishing little old lovely village"], 0, "Opini → ukuran → usia → tujuan."),
        fill("sma10-c2-l2-c3", "Complete: We took a three-___ (hour) boat trip.", "We took a three-", "boat trip.", ["hour"], "Compound adjective tanpa -s."),
        pick("sma10-c2-l2-c4", "Which sentence is punctuated correctly?", ["Borobudur, which was built in the 9th century, is in Magelang.", "Borobudur which was built in the 9th century is in Magelang.", "Borobudur, that was built in the 9th century, is in Magelang."], 0, "Non-defining → koma + which."),
        trPick("sma10-c2-l2-c5", "“Pantai yang pasirnya berwarna merah muda” in English is…", ["a beach whose sand is pink", "a beach which sand is pink", "a beach who's sand pink"], 0, "Whose = yang …-nya."),
        pick("sma10-c2-l2-c6", "Reduce the clause: “The souvenirs which are sold here are handmade.”", ["The souvenirs sold here are handmade.", "The souvenirs selling here are handmade.", "The souvenirs are sold here handmade."], 0, "Reduced passive clause.", { hots: true }),
      ],
    },
    {
      id: "sma10-c2-l3",
      skill: "writing",
      title: "Promote a Destination",
      summary: "Writing a descriptive text and presenting a tourist destination.",
      sections: [
        {
          title: "Plan",
          blocks: [
            table(["Section", "Questions to answer"], [["Identification", "What is it? Where is it? How do you get there?"], ["Description 1", "What does it look like? (landscape, buildings)"], ["Description 2", "What can visitors do, see, eat?"], ["Description 3", "What makes it unique? (culture, history, people)"], ["Concluding comment (optional)", "Why should people visit? Tips?"]]),
            tip("Gunakan **panca indera**: apa yang dilihat, didengar, dicium, dirasakan. *The air smells of cloves* membuat pembaca seolah hadir."),
          ],
        },
        {
          title: "Write and present",
          blocks: [
            writing({
              id: "sma10-c2-l3-write",
              title: "A hidden gem",
              prompt: "Write a descriptive text (for a tourism website) about a destination in your region or a place you know well. Use at least three complex noun phrases, three adjective clauses and one simile.",
              image: "beach",
              minWords: 200,
              maxWords: 330,
              tips: ["Identification: … , which is located in …, is …", "Landscape: … with … / … rises like …", "Activities: Visitors can … / … where you can …", "Unique feature: … whose …", "Concluding comment"],
              models: [{ label: "Example", text: "Kampung Naga: A Village That Time Forgot\nKampung Naga, which is located in Tasikmalaya, West Java, is a traditional Sundanese village whose people still follow the customs of their ancestors. To reach it, visitors walk down a 439-step stone staircase that winds through bamboo forests and green rice terraces.\nAt the bottom of the valley, around a hundred identical houses stand in neat rows like a quiet army. They are built from wood and bamboo, and their black roofs are made of palm fibre. There is no electricity in the village, and the only sounds are the river, the roosters and the rhythmic thud of women pounding rice.\nVisitors can join a local guide who explains the village's rules, such as why all houses must face north or south. You can also buy handmade bamboo crafts, which are sold directly by the villagers.\nKampung Naga is not a theme park; it is a living community. If you visit, dress modestly, ask before taking photos and leave nothing behind but footprints." }],
              rubric: ["My text has a clear identification and description.", "I used at least three complex noun phrases with correct adjective order.", "I used at least three adjective clauses correctly.", "I used sensory details and a simile.", "My language is factual, vivid and well organised."],
            }),
            speaking({
              id: "sma10-c2-l3-say",
              title: "Tourism pitch",
              prompt: "Imagine you are a young tourism ambassador. Give a 90-second presentation to persuade foreign visitors to visit the place you described.",
              image: "microphone",
              prepSeconds: 60,
              seconds: 90,
              tips: ["Imagine a place where …", "… is located in …", "Here, you can …", "What makes it truly special is …", "So, pack your bags and …!"],
              models: [{ label: "Example", text: "Imagine a place where the only alarm clock is a rooster, and the only traffic is a line of ducks crossing the rice fields. Welcome to Kampung Naga in West Java! This traditional village, which sits at the bottom of a green valley, has kept the same way of life for hundreds of years. Here, you can walk down 439 stone steps, learn how the villagers build houses without a single nail, and taste rice that was pounded by hand that morning. What makes it truly special is the people, who welcome visitors warmly but protect their traditions carefully. So, put your phone away, put on your walking shoes, and discover the peaceful heart of Sunda!" }],
              rubric: ["I opened with a hook.", "I described the place vividly.", "I used noun phrases and adjective clauses naturally.", "I ended with a persuasive call to action.", "I spoke with enthusiasm and clear pronunciation."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sma10-c2-l3-c1", "In the model text, how many steps do visitors walk down?", ["439", "300", "1,500"], 0, "439-step stone staircase."),
        pick("sma10-c2-l3-c2", "Which is a sensory detail?", ["the rhythmic thud of women pounding rice", "Kampung Naga is in Tasikmalaya", "There are about a hundred houses"], 0, "Detail pendengaran."),
        arrange("sma10-c2-l3-c3", "Put the words in order.", "It is a village whose people still follow old customs", "Whose + noun."),
        fill("sma10-c2-l3-c4", "Complete: The houses stand in neat rows ___ a quiet army.", "The houses stand in neat rows", "a quiet army.", ["like"], "Simile."),
        trPick("sma10-c2-l3-c5", "“Berpakaian sopan” in English is…", ["dress modestly", "dress modernly", "dress models"], 0, "Dress modestly."),
        pick("sma10-c2-l3-c6", "Why does the writer say “It is not a theme park; it is a living community”?", ["to remind visitors to respect the residents", "to complain about the prices", "to say it is boring"], 0, "Etika wisata.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma10-c2-post",
    title: "Chapter 2 Posttest",
    passPercent: 70,
    passages: [RAJA],
    questions: [
      pick("sma10-c2-post1", "Bunaken is a marine park ___ coral walls drop hundreds of metres.", ["whose", "which", "who", "what"], 0, "Kepemilikan → whose."),
      listen("sma10-c2-post2", voice("Lake Toba, the largest volcanic lake in the world, was formed by a super-eruption about seventy-four thousand years ago."), "Listen. How was Lake Toba formed?", ["by a super-eruption", "by a river", "by people", "by an earthquake in the sea"], 0, "Super-eruption."),
      trPick("sma10-c2-post3", "“Tersebar” in English is…", ["scattered", "shattered", "scared", "sheltered"], 0, "Scattered."),
      pick("sma10-c2-post4", "Choose the correct noun phrase.", ["an ancient Hindu stone temple", "a stone ancient Hindu temple", "a Hindu stone ancient temple", "an ancient stone Hindu temple"], 0, "Usia → asal → material → benda."),
      arrange("sma10-c2-post5", "Put the words in order.", "It is a place where turtles lay their eggs", "Where + klausa."),
      pick("sma10-c2-post6", "What percentage of the world's known coral species live in Raja Ampat's waters?", ["around 75 percent", "around 15 percent", "around 50 percent", "100 percent"], 0, "Baris 3.", { passageId: RAJA.id }),
      match("sma10-c2-post7", "Match the part of the text and its lines.", [["Identification", "lines 1–2"], ["Description of landscape", "lines 4–5"], ["Conservation", "lines 7–8"], ["Concluding comment", "line 9"]], "Struktur teks."),
      fill("sma10-c2-post8", "Complete.", "the red bird-of-paradise, whose bright feathers and", "make it one of the most beautiful birds on Earth.", ["dance"], "Baris 6.", { passageId: RAJA.id }),
      pick("sma10-c2-post9", "How does the environmental service card help Raja Ampat?", ["Its money funds conservation and community programmes.", "It lets visitors fish anywhere.", "It is a discount card for hotels.", "It replaces sasi rules."], 0, "Baris 8.", { passageId: RAJA.id, hots: true }),
      pick("sma10-c2-post10", "What is the writer's attitude toward Raja Ampat?", ["admiring and protective", "critical and negative", "bored", "neutral and uninterested"], 0, "Pilihan kata positif dan isu konservasi.", { passageId: RAJA.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Wonderful Indonesia",
    questions: [
      live("sma10-c2-live1", "Raja Ampat means…", ["Four Kings", "Five Islands", "Blue Sea", "King's Bird"], 0, "island"),
      live("sma10-c2-live2", "a place ___ turtles nest", ["where", "which", "whose", "who"], 0, "turtle"),
      live("sma10-c2-live3", "Correct:", ["a two-hour trip", "a two-hours trip", "a two hours' trips", "two-hour trips a"], 0, "clock"),
      live("sma10-c2-live4", "“Kepulauan” =", ["archipelago", "peninsula", "continent", "volcano"], 0, "map", true),
      live("sma10-c2-live5", "Descriptive text starts with…", ["identification", "complication", "thesis", "goal"], 0, "report"),
      live("sma10-c2-live6", "Non-defining clause uses…", ["commas + which", "that", "no commas", "whom only"], 0, "question"),
      live("sma10-c2-live7", "Komodo National Park is in…", ["East Nusa Tenggara", "Aceh", "Papua", "Bali"], 0, "komodo"),
      live("sma10-c2-live8", "Traditional fishing ban in Papua:", ["sasi", "subak", "sawah", "sasando"], 0, "fish"),
    ],
  },
};
