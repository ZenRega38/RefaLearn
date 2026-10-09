import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 12 (SMA, Fase F). Chapter 3 — Reviews and Critiques · Chapter 4 — Reading Literature

const REVIEW: Passage = {
  id: "sma12-c3-review",
  title: "Film Review: “The Last Lighthouse Keeper”",
  pic: "camera",
  lines: [
    "“The Last Lighthouse Keeper” (2026) is a 108-minute Indonesian drama directed by first-time filmmaker Ayu Larasati. Set on a tiny island off the coast of Sulawesi, it tells the story of Pak Darmo, an old man who refuses to leave his lighthouse after it is replaced by an automatic light.",
    "The plot is simple but deeply moving. When his granddaughter Nila, a busy engineer from Jakarta, is sent to persuade him to move to the mainland, the two slowly rediscover each other.",
    "The greatest strength of the film is its cinematography. Long, quiet shots of stormy seas and golden sunsets make the island feel like a living character. The soundtrack, which mixes traditional kecapi music with the sound of waves, is equally beautiful.",
    "The veteran actor who plays Pak Darmo gives a remarkable performance. With very few words, he shows pride, loneliness and fear of being forgotten.",
    "However, the film is not without flaws. The middle section drags, and a subplot about a fishing company feels rushed and unconvincing. Some viewers may also find the slow pace challenging.",
    "Despite these weaknesses, the film succeeds in raising important questions about technology, ageing and what we lose when we choose convenience over human connection.",
    "Overall, “The Last Lighthouse Keeper” is a thoughtful, visually stunning debut. I would highly recommend it to viewers who enjoy reflective dramas, although those looking for action should probably look elsewhere. Rating: 4 out of 5 stars.",
  ],
};

export const CH3: Level = {
  id: "sma12-ch3",
  title: "Chapter 3 — Reviews and Critiques",
  description: "Read and write reviews of films, books, apps and places, use evaluative language and balanced criticism, and give a spoken review.",
  targetScore: "Reading · Writing · Vocabulary",
  cover: ["camera", "book", "thumbs-up"],
  pretest: {
    id: "sma12-c3-pre",
    title: "Chapter 3 Pretest",
    passPercent: 0,
    questions: [
      pick("sma12-c3-pre1", "The main purpose of a review is to…", ["evaluate a work and help readers decide", "tell a story only", "give instructions", "report the news"], 0, "Review = menilai."),
      listen("sma12-c3-pre2", voice("The acting was superb, but the ending felt rushed."), "Listen. What was the weakness?", ["the rushed ending", "the acting", "the music", "the costumes"], 0, "Ending felt rushed."),
      trPick("sma12-c3-pre3", "“Alurnya lambat” in English is…", ["The pace is slow.", "The plot slowed is.", "The flow is lazy.", "The story is late."], 0, "Pace = tempo."),
      pick("sma12-c3-pre4", "Which word is a positive evaluation?", ["gripping", "dull", "predictable", "tedious"], 0, "Gripping = memikat."),
      pick("sma12-c3-pre5", "A fair review usually includes…", ["strengths and weaknesses", "only praise", "only complaints", "spoilers of the whole ending"], 0, "Seimbang."),
    ],
  },
  lessons: [
    {
      id: "sma12-c3-l1",
      skill: "reading",
      title: "Reading: A Film Review",
      summary: "Structure of a review: orientation, interpretive recount, evaluation, evaluative summation.",
      passages: [REVIEW],
      sections: [
        {
          title: "The review",
          blocks: [
            { type: "passage", passage: REVIEW },
            audio("Listen and read", say(["woman", REVIEW.lines.join(" ")])),
            vocab([["cinematography", "sinematografi", "camera"], ["remarkable", "luar biasa", "trophy"], ["flaw", "kekurangan", "question"], ["drag", "terasa bertele-tele", "clock"], ["debut", "karya pertama", "shape-star"]], "Words from the text"),
          ],
        },
        {
          title: "Structure",
          blocks: [
            table(["Part", "Function", "Lines"], [["Orientation", "title, year, genre, director, setting", "1"], ["Interpretive recount", "short summary without spoilers", "2"], ["Evaluation (strengths)", "visuals, music, acting", "3–4"], ["Evaluation (weaknesses)", "pace, subplot", "5"], ["Evaluative summation", "overall judgement, recommendation, rating", "6–7"]]),
            tip("Ringkasan dalam review **tidak membocorkan akhir cerita** (no spoilers). Tujuannya membantu pembaca memutuskan, bukan menggantikan pengalaman menonton."),
            tryIt(pick("sma12-c3-l1-try1", "Who directed the film?", ["Ayu Larasati", "Pak Darmo", "Nila"], 0, "Baris 1.", { passageId: REVIEW.id })),
          ],
        },
      ],
      checkpoint: [
        pick("sma12-c3-l1-c1", "Why does Pak Darmo refuse to leave?", ["He is attached to his lighthouse after it is automated.", "He owes money.", "He is waiting for a ship."], 0, "Baris 1.", { passageId: REVIEW.id }),
        pick("sma12-c3-l1-c2", "What does the reviewer consider the film's greatest strength?", ["the cinematography", "the action scenes", "the comedy"], 0, "Baris 3.", { passageId: REVIEW.id }),
        fill("sma12-c3-l1-c3", "Complete.", "The middle section", ", and a subplot about a fishing company feels rushed.", ["drags"], "Baris 5.", { passageId: REVIEW.id }),
        pickMany("sma12-c3-l1-c4", "Choose ALL the weaknesses mentioned.", ["the middle section drags", "a rushed subplot", "a slow pace for some viewers", "poor acting"], [0, 1, 2], "Baris 5.", { passageId: REVIEW.id }),
        pick("sma12-c3-l1-c5", "Who would probably NOT enjoy this film, according to the reviewer?", ["viewers looking for action", "viewers who like reflective dramas", "people interested in islands"], 0, "Baris 7.", { passageId: REVIEW.id, hots: true }),
        pick("sma12-c3-l1-c6", "What does “the island feel like a living character” suggest?", ["The setting is so vivid that it seems to have its own personality.", "The island talks.", "The island is dangerous."], 0, "Personifikasi dalam evaluasi.", { passageId: REVIEW.id, hots: true }),
      ],
    },
    {
      id: "sma12-c3-l2",
      skill: "vocabulary",
      title: "Evaluative Language",
      summary: "Precise adjectives and phrases for praise and criticism; balancing with concession.",
      sections: [
        {
          title: "Words for reviewing",
          blocks: [
            table(["Aspect", "Positive", "Negative"], [["Plot / story", "gripping, original, thought-provoking", "predictable, confusing, far-fetched"], ["Pace", "fast-paced, well-paced", "slow, drags, rushed"], ["Characters / acting", "convincing, complex, remarkable performance", "flat, wooden, unconvincing"], ["Visuals / design", "stunning, atmospheric, user-friendly (apps)", "dull, cluttered, confusing"], ["Overall", "a must-see, highly recommended, worth reading", "disappointing, overrated, a waste of time"]]),
            pics([["thumbs-up", "highly recommended"], ["shape-star", "4 out of 5 stars"], ["sad", "disappointing"], ["owl-think", "thought-provoking"]]),
          ],
        },
        {
          title: "Balancing your judgement",
          blocks: [
            examples([{ right: "Although the plot is predictable, the performances are convincing." }, { right: "The app is user-friendly; however, it drains the battery quickly." }, { right: "While some readers may find the ending sad, it fits the story perfectly." }, { right: "It is not without flaws, but it is certainly worth watching." }], "Balanced sentences"),
            audio("Two friends discuss a novel", say(["woman", "Have you finished “Laskar Pelangi”?"], ["man", "Yes! I found it really inspiring. The characters are so vivid, especially Lintang."], ["woman", "I agree. Although some chapters are a bit long, the friendship between the children is beautifully described."], ["man", "Exactly. I'd recommend it to anyone who thinks education isn't important."])),
            tryIt(pick("sma12-c3-l2-try1", "What does the woman think is a weakness?", ["Some chapters are a bit long.", "The characters are boring.", "The friendship is not described."], 0, "Although some chapters are a bit long.")),
          ],
        },
      ],
      checkpoint: [
        listen("sma12-c3-l2-c1", voice("The app looks stunning, but the menus are cluttered and confusing."), "Listen. What is the problem with the app?", ["confusing, cluttered menus", "ugly design", "high price"], 0, "Cluttered menus."),
        match("sma12-c3-l2-c2", "Match the opposites.", [["gripping", "dull"], ["original", "predictable"], ["convincing", "unconvincing"], ["well-paced", "rushed"]], "Evaluasi berlawanan."),
        pick("sma12-c3-l2-c3", "Which word describes acting that is stiff and unnatural?", ["wooden", "stunning", "gripping"], 0, "Wooden acting = kaku."),
        fill("sma12-c3-l2-c4", "Complete: It is not ___ flaws, but it is worth watching.", "It is not", "flaws, but it is worth watching.", ["without"], "Not without flaws."),
        trPick("sma12-c3-l2-c5", "“Terlalu dibesar-besarkan” (about a film) in English is…", ["overrated", "overrode", "overreached"], 0, "Overrated."),
        pick("sma12-c3-l2-c6", "Which sentence is the most useful for readers?", ["The plot is predictable, but the stunning visuals make it worth watching on a big screen.", "It's bad.", "I liked it."], 0, "Spesifik + seimbang.", { hots: true }),
      ],
    },
    {
      id: "sma12-c3-l3",
      skill: "writing",
      title: "Write and Present a Review",
      summary: "Writing a review of a book, film, app, restaurant or tourist spot, and recording a short video review.",
      sections: [
        {
          title: "Choose what to review",
          blocks: [
            table(["Type", "Aspects to evaluate"], [["Film / series", "plot, acting, visuals, music, pace"], ["Book", "story, characters, writing style, message"], ["App / game", "design, ease of use, features, price, performance"], ["Restaurant / café", "food, service, atmosphere, price, cleanliness"], ["Tourist spot", "access, facilities, scenery, crowd, price"]]),
            warn("Ulasan yang adil tidak hanya berdasarkan **selera pribadi**. Berikan **alasan dan contoh** untuk setiap penilaian."),
          ],
        },
        {
          title: "Write and speak",
          blocks: [
            writing({
              id: "sma12-c3-l3-write",
              title: "My review",
              prompt: "Write a review of a film, book, series, app, café or tourist spot. Follow the review structure, evaluate at least three aspects with evidence, include at least one weakness, and end with a recommendation and rating.",
              image: "shape-star",
              minWords: 250,
              maxWords: 360,
              tips: ["Orientation: title, creator, year, genre/place", "Short summary (no spoilers)", "Strengths with examples", "Weaknesses with examples", "Overall judgement + who should try it + rating"],
              models: [{ label: "Example", text: "App Review: “KataKita” — Learn Regional Languages\n“KataKita” is a free language-learning app, released in 2025 by a start-up in Yogyakarta, that teaches more than ten Indonesian regional languages, including Javanese, Sundanese, Batak and Bugis.\nUsers choose a language, complete short daily lessons and earn badges. Each lesson combines vocabulary cards, listening exercises and short dialogues recorded by native speakers.\nThe app's biggest strength is its authentic audio. Instead of robotic voices, users hear real grandparents, market sellers and children from each region, which makes the lessons warm and memorable. The design is also user-friendly: colourful icons and clear progress bars make it easy to stay motivated.\nHowever, KataKita is not without problems. The free version shows an advert after every lesson, which quickly becomes annoying. In addition, the more advanced levels are only available for Javanese and Sundanese, so learners of other languages may run out of material.\nOverall, KataKita is a creative and culturally meaningful app. I would recommend it to students and families who want to reconnect with their heritage, especially beginners. Rating: 4 out of 5." }],
              rubric: ["My review follows the structure.", "I evaluated at least three aspects with examples.", "I included at least one weakness.", "I used precise evaluative language.", "I ended with a clear recommendation and rating."],
            }),
            speaking({
              id: "sma12-c3-l3-say",
              title: "A one-minute video review",
              prompt: "Record (or practise) a one-minute video review of the same item. Speak naturally, as if for a review channel, and give a final rating.",
              image: "video-app",
              prepSeconds: 45,
              seconds: 75,
              tips: ["Hi guys! Today I'm reviewing …", "What I loved was …", "What could be better is …", "Would I recommend it? …", "I'll give it …"],
              models: [{ label: "Example", text: "Hi everyone! Today I'm reviewing “The Last Lighthouse Keeper”, a new Indonesian drama. It's about an old man who won't leave his lighthouse. What I loved most was the cinematography. Every shot of the sea looks like a painting, and the kecapi music is gorgeous. The lead actor is incredible; he says so much without words. What could be better is the middle part, which drags a little. Would I recommend it? Yes, if you enjoy slow, emotional films. If you want action, skip this one. I'll give it four stars out of five!" }],
              rubric: ["I introduced what I was reviewing.", "I mentioned strengths and weaknesses.", "I gave a recommendation and rating.", "I sounded natural and engaging."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sma12-c3-l3-c1", "In the model review, what is the app's biggest strength?", ["authentic audio from native speakers", "it has no adverts", "it teaches English"], 0, "Authentic audio."),
        pick("sma12-c3-l3-c2", "Which aspect would you evaluate for a café?", ["service and atmosphere", "camera angles", "plot twists"], 0, "Aspek yang relevan."),
        arrange("sma12-c3-l3-c3", "Put the words in order.", "I would highly recommend it to beginners", "Rekomendasi."),
        fill("sma12-c3-l3-c4", "Complete: Overall, the book is well ___ reading.", "Overall, the book is well", "reading.", ["worth"], "Worth + -ing."),
        trPick("sma12-c3-l3-c5", "“Membocorkan cerita” in English is…", ["to give spoilers", "to give spoils", "to leak a book"], 0, "Spoilers."),
        pick("sma12-c3-l3-c6", "Why should a review avoid spoilers?", ["So readers can still enjoy discovering the story themselves.", "Because endings are boring.", "Because reviewers don't know the ending."], 0, "Menghormati pembaca.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma12-c3-post",
    title: "Chapter 3 Posttest",
    passPercent: 70,
    passages: [REVIEW],
    questions: [
      pick("sma12-c3-post1", "The plot was so ___ that I guessed the ending in the first ten minutes.", ["predictable", "gripping", "original", "stunning"], 0, "Mudah ditebak."),
      listen("sma12-c3-post2", voice("Although the hotel is a bit far from the beach, the staff are incredibly friendly and the breakfast is excellent."), "Listen. What is the hotel's weakness?", ["It is far from the beach.", "The staff are rude.", "The breakfast is bad.", "It is expensive."], 0, "A bit far from the beach."),
      trPick("sma12-c3-post3", "“Sangat direkomendasikan” in English is…", ["highly recommended", "high recommending", "very recommend", "recommended highly-ly"], 0, "Highly recommended."),
      pick("sma12-c3-post4", "Which part of a review gives the final judgement?", ["evaluative summation", "orientation", "interpretive recount", "complication"], 0, "Penilaian akhir."),
      arrange("sma12-c3-post5", "Put the words in order.", "The acting is convincing but the pace is slow", "Kalimat seimbang."),
      pick("sma12-c3-post6", "How long is the film?", ["108 minutes", "180 minutes", "90 minutes", "2 hours 30 minutes"], 0, "Baris 1.", { passageId: REVIEW.id }),
      match("sma12-c3-post7", "Match the part of the review and the line.", [["orientation", "line 1"], ["interpretive recount", "line 2"], ["weaknesses", "line 5"], ["evaluative summation", "line 7"]], "Struktur review."),
      fill("sma12-c3-post8", "Complete.", "The soundtrack, which mixes traditional", "music with the sound of waves, is equally beautiful.", ["kecapi"], "Baris 3.", { passageId: REVIEW.id }),
      pick("sma12-c3-post9", "What deeper themes does the reviewer identify?", ["technology, ageing and human connection", "money and power", "sports and competition", "fashion"], 0, "Baris 6.", { passageId: REVIEW.id, hots: true }),
      pick("sma12-c3-post10", "Why does the reviewer give 4 stars rather than 5?", ["Because of flaws such as the dragging middle and rushed subplot.", "Because the acting was poor.", "Because it was too short.", "Because there was no music."], 0, "Hubungan kelemahan dan rating.", { passageId: REVIEW.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Critic's Corner",
    questions: [
      live("sma12-c3-live1", "Positive word:", ["gripping", "dull", "tedious", "wooden"], 0, "thumbs-up"),
      live("sma12-c3-live2", "Easy to guess:", ["predictable", "original", "stunning", "complex"], 0, "question"),
      live("sma12-c3-live3", "Reviews should avoid…", ["spoilers", "examples", "ratings", "reasons"], 0, "camera"),
      live("sma12-c3-live4", "“Kekurangan” =", ["flaw", "flow", "flower", "floor"], 0, "sad", true),
      live("sma12-c3-live5", "Stiff acting:", ["wooden", "golden", "stunning", "vivid"], 0, "tv"),
      live("sma12-c3-live6", "Final part of a review:", ["evaluative summation", "orientation", "goal", "complication"], 0, "trophy"),
      live("sma12-c3-live7", "Worth ___", ["watching", "watch", "to watch", "watched"], 0, "video-app"),
      live("sma12-c3-live8", "App that's easy to use:", ["user-friendly", "user-angry", "cluttered", "wooden"], 0, "smartphone"),
    ],
  },
};

const STORY: Passage = {
  id: "sma12-c4-story",
  title: "The Clock on the Wall (a short story)",
  pic: "clock",
  lines: [
    "The old clock in Grandpa Hasan's living room had stopped at 4.17 on the afternoon my grandmother died. Nobody had touched it since. It hung there like a held breath.",
    "When I was sent to stay with Grandpa for the school holidays, I was sixteen and angry about everything: the slow internet, the heat, the silence of the village.",
    "Grandpa barely spoke. Every morning he swept the yard, fed the chickens and sat on the porch, staring at the road as if he were waiting for someone who would never arrive.",
    "On the fourth day, out of boredom, I took the clock down and opened its back. Inside, among the dusty gears, I found a folded piece of paper in my grandmother's handwriting.",
    "“Hasan,” it said, “when this clock stops, wind it again. Don't let time stop just because I did.”",
    "I showed it to Grandpa. For a long moment, his hands trembled. Then he took the small brass key from his shirt pocket, where it must have been for three years, and slowly wound the clock.",
    "The ticking filled the room like a heartbeat. Grandpa laughed, a rusty, surprised sound, and then he cried, and so did I.",
    "That evening, he told me stories about my grandmother until the stars came out. When I left at the end of the holiday, the clock was still ticking, and Grandpa was waving from the road.",
  ],
};

export const CH4: Level = {
  id: "sma12-ch4",
  title: "Chapter 4 — Reading Literature",
  description: "Analyse short stories and poems: theme, symbolism, imagery, foreshadowing, tone and point of view; write a literary analysis paragraph and a creative response.",
  targetScore: "Reading · Writing · Speaking",
  cover: ["clock", "book", "owl-read"],
  pretest: {
    id: "sma12-c4-pre",
    title: "Chapter 4 Pretest",
    passPercent: 0,
    questions: [
      pick("sma12-c4-pre1", "An object that represents a bigger idea in a story is a…", ["symbol", "setting", "summary", "subject"], 0, "Simbol."),
      listen("sma12-c4-pre2", voice("The dark clouds gathered as she opened the letter, and she felt a strange chill."), "Listen. What might this sentence do in a story?", ["hint that something bad will happen", "describe the weather report", "end the story", "list characters"], 0, "Foreshadowing."),
      trPick("sma12-c4-pre3", "“Nada / suasana hati penulis” in a text is called…", ["tone", "tune", "tense", "topic"], 0, "Tone = nada/sikap penulis."),
      pick("sma12-c4-pre4", "Writing that appeals to the senses is called…", ["imagery", "imaginary", "image search", "imitation"], 0, "Citraan."),
      pick("sma12-c4-pre5", "A story told by a character using “I” has a…", ["first-person narrator", "third-person narrator", "chorus", "omniscient god"], 0, "Narator orang pertama."),
    ],
  },
  lessons: [
    {
      id: "sma12-c4-l1",
      skill: "reading",
      title: "Reading: The Clock on the Wall",
      summary: "Close reading of a short story: character change, symbolism and theme.",
      passages: [STORY],
      sections: [
        {
          title: "The story",
          blocks: [
            { type: "passage", passage: STORY },
            audio("Listen to the story", say(["narrator", STORY.lines.slice(0, 4).join(" ")], ["narrator", STORY.lines.slice(4).join(" ")])),
            vocab([["held breath", "napas yang tertahan", "clock"], ["barely", "hampir tidak", "question"], ["gears", "roda gigi", "robot"], ["tremble", "gemetar", "hand"], ["rusty", "berkarat / serak (suara)", "grandfather"]], "Words from the story"),
          ],
        },
        {
          title: "Literary elements",
          blocks: [
            table(["Element", "In the story"], [["Narrator / POV", "first person: the sixteen-year-old grandchild"], ["Setting", "a quiet village, school holidays"], ["Symbol", "the stopped clock = grief / time frozen since the grandmother's death"], ["Simile", "like a held breath; like a heartbeat"], ["Character change", "Grandpa: silent and stuck → laughing and telling stories; narrator: angry → connected"], ["Theme", "Life must continue after loss; love can help us heal."]]),
            tryIt(pick("sma12-c4-l1-try1", "When did the clock stop?", ["on the afternoon the grandmother died", "on the narrator's birthday", "last week"], 0, "Baris 1.", { passageId: STORY.id })),
          ],
        },
      ],
      checkpoint: [
        pick("sma12-c4-l1-c1", "How did the narrator feel at the beginning of the holiday?", ["angry about everything", "excited", "sleepy but happy"], 0, "Baris 2.", { passageId: STORY.id }),
        pick("sma12-c4-l1-c2", "What did the narrator find inside the clock?", ["a note from the grandmother", "money", "a photo"], 0, "Baris 4.", { passageId: STORY.id }),
        fill("sma12-c4-l1-c3", "Complete.", "The ticking filled the room like a", ".", ["heartbeat"], "Baris 7 (simile).", { passageId: STORY.id }),
        pickMany("sma12-c4-l1-c4", "Choose ALL the details that show Grandpa's grief before the clock is wound.", ["he barely spoke", "he stared at the road", "he kept the key in his pocket", "he told funny stories every night"], [0, 1, 2], "Baris 3 dan 6.", { passageId: STORY.id }),
        pick("sma12-c4-l1-c5", "What does winding the clock symbolise?", ["choosing to continue living after loss", "repairing a machine", "being late"], 0, "Simbolisme.", { passageId: STORY.id, hots: true }),
        pick("sma12-c4-l1-c6", "Why do you think Grandpa kept the key in his pocket for three years?", ["He couldn't let go of his wife but also couldn't move forward.", "He forgot it.", "He wanted to sell it."], 0, "Inferensi karakter.", { passageId: STORY.id, hots: true }),
      ],
    },
    {
      id: "sma12-c4-l2",
      skill: "vocabulary",
      title: "Literary Devices",
      summary: "Foreshadowing, symbolism, imagery, irony, tone, mood and figurative language.",
      sections: [
        {
          title: "The toolkit",
          blocks: [
            table(["Device", "Meaning", "Example"], [["Foreshadowing", "petunjuk tentang kejadian selanjutnya", "a stopped clock that someone will one day wind"], ["Symbolism", "benda/warna yang mewakili ide", "a cage = lack of freedom"], ["Imagery", "kata yang menghidupkan indra", "the smell of wet earth after rain"], ["Irony", "kebalikan dari yang diharapkan", "a fire station burns down"], ["Tone", "sikap penulis", "nostalgic, bitter, hopeful"], ["Mood", "perasaan pembaca", "tense, peaceful, eerie"], ["Flashback", "kembali ke masa lalu dalam cerita", "“I remembered the day…”"]]),
            pics([["clock", "symbol of time"], ["rain", "imagery"], ["sad", "tone"], ["question", "foreshadowing"]]),
          ],
        },
        {
          title: "A short poem",
          blocks: [
            examples([{ right: "My mother's kitchen / is a map of my childhood: / the turmeric stains, the cracked blue bowl, / the radio that only sings / when you slap it twice." }], "Kitchen (a short poem)"),
            text("Puisi ini memakai **metafora** (dapur = peta masa kecil), **imagery** visual (noda kunyit, mangkuk biru retak), **personifikasi** (radio bernyanyi), dan **tone** yang nostalgik dan hangat."),
            audio("Discussing the poem", say(["woman", "What's the tone of this poem?"], ["man", "I'd say it's nostalgic and affectionate. The details are imperfect, like the cracked bowl, but they feel loved."], ["woman", "Good point. And the radio that only sings when you slap it twice adds a bit of humour."])),
            tryIt(pick("sma12-c4-l2-try1", "“The radio that only sings” is an example of…", ["personification", "irony", "flashback"], 0, "Benda bernyanyi.")),
          ],
        },
      ],
      checkpoint: [
        listen("sma12-c4-l2-c1", voice("A lifeguard who can't swim. That's the irony of the story."), "Listen. Why is this ironic?", ["It's the opposite of what we expect.", "It's a sad story.", "It's about the sea."], 0, "Ironi."),
        match("sma12-c4-l2-c2", "Match the device and the example.", [["symbolism", "a white dove for peace"], ["imagery", "the sizzle of garlic in hot oil"], ["foreshadowing", "a warning that comes true later"], ["flashback", "a scene from the character's childhood"]], "Literary devices."),
        pick("sma12-c4-l2-c3", "The reader feels nervous and afraid. This is the story's…", ["mood", "plot", "setting"], 0, "Mood = perasaan pembaca."),
        fill("sma12-c4-l2-c4", "Complete: The writer's attitude toward the subject is the ___ .", "The writer's attitude toward the subject is the", ".", ["tone"], "Tone = sikap penulis."),
        trPick("sma12-c4-l2-c5", "“Kilas balik” in English is…", ["flashback", "backflash", "looking back light"], 0, "Flashback."),
        pick("sma12-c4-l2-c6", "In “The Clock on the Wall”, the first line says the clock had stopped. How does this foreshadow the ending?", ["It sets up the moment when the clock is wound again.", "It shows the clock is broken forever.", "It explains why the narrator is angry."], 0, "Foreshadowing.", { hots: true }),
      ],
    },
    {
      id: "sma12-c4-l3",
      skill: "writing",
      title: "Write About Literature",
      summary: "Writing an analytical paragraph (PEEL) and a creative response.",
      sections: [
        {
          title: "The PEEL paragraph",
          blocks: [
            table(["Step", "Meaning", "Example"], [["P — Point", "your claim", "The clock is a powerful symbol of Grandpa's grief."], ["E — Evidence", "quote from the text", "It “had stopped at 4.17 on the afternoon my grandmother died.”"], ["E — Explain", "how the evidence supports your point", "Like the clock, Grandpa's life seems to have stopped; he barely speaks and waits for no one."], ["L — Link", "connect back to the theme", "When he winds it again, the story suggests that healing begins when we allow time to move."]]),
            tip("Gunakan **present tense** saat membahas karya sastra (*The writer uses…, Grandpa winds the clock…*) dan kutipan singkat dengan **tanda petik**."),
          ],
        },
        {
          title: "Write",
          blocks: [
            writing({
              id: "sma12-c4-l3-write",
              title: "Literary analysis + creative response",
              prompt: "(1) Write two PEEL paragraphs analysing “The Clock on the Wall” (or another short story or poem you know): one on a symbol or literary device and one on character change or theme. (2) Then write a short creative response (about 80 words): Grandpa's diary entry on the evening the clock was wound.",
              image: "owl-read",
              minWords: 260,
              maxWords: 380,
              tips: ["Point: The writer uses … to show …", "Evidence: For example, “…”", "Explain: This suggests / implies / reveals that …", "Link: Therefore, the story's message is …", "Diary: Dear diary / Today, …"],
              models: [{ label: "Analysis", text: "The writer uses the stopped clock as a powerful symbol of Grandpa's grief. The story opens by explaining that the clock “had stopped at 4.17 on the afternoon my grandmother died” and that “nobody had touched it since.” This suggests that time in the house, and in Grandpa's heart, froze at the moment of his loss. His silence and his habit of staring at the road reinforce this idea. Therefore, when Grandpa finally winds the clock, the action represents his decision to let life continue.\nThe narrator also changes significantly. At the beginning, the sixteen-year-old is “angry about everything” and sees the village only as boring. However, discovering the note forces the narrator to see Grandpa's pain. By the end, the narrator cries with him and listens to his stories “until the stars came out.” This change shows that empathy can grow when young people take time to understand their elders." }, { label: "Creative response", text: "Dear Aminah,\nToday our grandchild opened your clock. I had carried the key for three years, but I was afraid that if time moved again, I would lose you a second time. Your note made me laugh. Of course you knew me too well. The ticking sounds like your footsteps in the kitchen. Tonight I told the child about our wedding and the mango tree. I think you would be proud of us both." }],
              rubric: ["Each analysis paragraph follows PEEL.", "I used short, accurate quotations as evidence.", "I explained how the evidence supports my point.", "I used literary terms correctly and present tense.", "My creative response matches the character's voice and the story's tone."],
            }),
            speaking({
              id: "sma12-c4-l3-say",
              title: "Book talk",
              prompt: "Give a two-minute “book talk” about a story, novel or poem you love: introduce it, discuss one literary device and the theme, and explain why others should read it.",
              image: "book",
              prepSeconds: 60,
              seconds: 120,
              tips: ["Today I'd like to talk about …, by …", "It's about … (no spoilers)", "One thing I find powerful is the way the writer uses …", "The main theme is …", "You should read it if …"],
              models: [{ label: "Example", text: "Today I'd like to talk about “Laskar Pelangi” by Andrea Hirata. It's about ten poor children on Belitung Island and their small school that is about to close. One thing I find powerful is the way the writer uses the rainbow as a symbol. The children call themselves the Rainbow Troops because, like a rainbow, they appear after hard times and bring hope. The main theme is that education can change lives, no matter how poor you are. You should read it if you need inspiration, or if you've ever felt that your dreams were too big for where you come from." }],
              rubric: ["I introduced the work without spoilers.", "I discussed a literary device with an example.", "I explained the theme.", "I gave a persuasive recommendation."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sma12-c4-l3-c1", "What does the first E in PEEL stand for?", ["Evidence", "Ending", "Example only"], 0, "Evidence."),
        pick("sma12-c4-l3-c2", "Which tense is usually used to analyse literature?", ["present simple", "past perfect", "future continuous"], 0, "Literary present."),
        arrange("sma12-c4-l3-c3", "Put the words in order.", "The writer uses the clock as a symbol of grief", "Point dalam PEEL."),
        fill("sma12-c4-l3-c4", "Complete: This ___ that time has stopped in Grandpa's heart.", "This", "that time has stopped in Grandpa's heart.", ["suggests", "shows", "implies", "reveals"], "Menjelaskan bukti."),
        trPick("sma12-c4-l3-c5", "“Tema utama” in English is…", ["the main theme", "the main team", "the major theme park"], 0, "Main theme."),
        pick("sma12-c4-l3-c6", "Which sentence is the strongest piece of literary analysis?", ["The simile “like a heartbeat” suggests that the house itself comes back to life.", "The story is nice.", "I like clocks."], 0, "Analisis berbasis bukti.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma12-c4-post",
    title: "Chapter 4 Posttest",
    passPercent: 70,
    passages: [STORY],
    questions: [
      pick("sma12-c4-post1", "A broken mirror representing a broken family is an example of…", ["symbolism", "irony", "flashback", "rhyme"], 0, "Simbol."),
      listen("sma12-c4-post2", voice("The tone of the poem is bitter; the speaker feels betrayed by an old friend."), "Listen. How does the speaker of the poem feel?", ["betrayed", "joyful", "sleepy", "proud"], 0, "Bitter tone."),
      trPick("sma12-c4-post3", "“Citraan” (in literature) in English is…", ["imagery", "imagination", "image file", "imaginary"], 0, "Imagery."),
      pick("sma12-c4-post4", "A fire station burning down is an example of…", ["irony", "simile", "imagery", "symbolism"], 0, "Ironi situasional."),
      arrange("sma12-c4-post5", "Put the words in order.", "The ticking filled the room like a heartbeat", "Simile."),
      pick("sma12-c4-post6", "How long had Grandpa kept the key in his pocket?", ["three years", "three days", "three months", "thirty years"], 0, "Baris 6.", { passageId: STORY.id }),
      match("sma12-c4-post7", "Match the element and the example from the story.", [["simile", "like a held breath"], ["symbol", "the stopped clock"], ["setting", "a quiet village during the holidays"], ["narrator", "a sixteen-year-old grandchild"]], "Unsur cerita."),
      fill("sma12-c4-post8", "Complete.", "“Don't let time stop just because I", ".”", ["did"], "Baris 5.", { passageId: STORY.id }),
      pick("sma12-c4-post9", "Which statement best expresses the theme?", ["Life must go on after loss, and love helps us heal.", "Clocks should be repaired regularly.", "Villages are boring.", "Teenagers should not visit grandparents."], 0, "Tema cerita: hidup terus berjalan.", { passageId: STORY.id, hots: true }),
      pick("sma12-c4-post10", "How does the final image of Grandpa “waving from the road” contrast with line 3?", ["Earlier he stared at the road waiting; now he actively connects with someone.", "He is still waiting for his wife.", "He is going to leave the village.", "There is no difference."], 0, "Perubahan karakter lewat citra jalan.", { passageId: STORY.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Lit Lovers",
    questions: [
      live("sma12-c4-live1", "Object representing an idea:", ["symbol", "setting", "summary", "subject"], 0, "clock"),
      live("sma12-c4-live2", "Hint of future events:", ["foreshadowing", "flashback", "rhyme", "tone"], 0, "question"),
      live("sma12-c4-live3", "Reader's feeling:", ["mood", "plot", "theme", "symbol"], 0, "happy"),
      live("sma12-c4-live4", "“Kilas balik” =", ["flashback", "feedback", "fallback", "backflip"], 0, "calendar", true),
      live("sma12-c4-live5", "PEEL: L =", ["Link", "Line", "Look", "Last"], 0, "report"),
      live("sma12-c4-live6", "Grandpa kept the ___ in his pocket.", ["key", "clock", "note", "photo"], 0, "grandfather"),
      live("sma12-c4-live7", "Lifeguard who can't swim =", ["irony", "simile", "imagery", "rhyme"], 0, "swim"),
      live("sma12-c4-live8", "Literary analysis tense:", ["present", "past perfect", "future", "imperative"], 0, "owl-read"),
    ],
  },
};
