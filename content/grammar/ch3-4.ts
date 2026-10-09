import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { audio, examples, fill, listen, live, match, pick, pickMany, pics, say, table, text, trPick, tryIt, voice, warn, writing } from "../kit";

// English Grammar Essentials — Chapter 3: Present Perfect and the Future · Chapter 4: Nouns, Articles and Quantifiers

const UPDATE: Passage = {
  id: "gram3-update",
  title: "An Email from a Volunteer",
  lines: [
    "Hi Lena, I've been in Flores for three weeks now, and I've already learned so much.",
    "We've built two classrooms since I arrived, and the children have started using the new library.",
    "I haven't visited Komodo Island yet, but I'm going to go there with the other volunteers next weekend.",
    "The weather has been very hot, so I've been drinking about four litres of water a day!",
    "The project ends on 30 June. After that, I'll probably travel around Bali for a few days before I fly home.",
    "By the time I get back, I'll have spent almost three months here. I'll send you photos soon!",
  ],
};

const ARTICLE: Passage = {
  id: "gram4-article",
  title: "A Short Guide to Indonesian Coffee",
  lines: [
    "Indonesia is one of the world's largest producers of coffee.",
    "Most of the coffee is grown by small farmers rather than by large companies.",
    "Each region has its own character. Coffee from Aceh is often described as rich and earthy, while coffee from Toraja is known for its balanced flavour.",
    "Many visitors are surprised by kopi tubruk, a traditional drink made by pouring hot water directly over finely ground beans.",
    "There is little sugar in specialty coffee, but a few cafés still serve it very sweet for local customers.",
    "If you visit a coffee farm, you can usually take a tour and taste several kinds of beans.",
  ],
};

export const CH3: Level = {
  id: "gram-ch3",
  title: "Chapter 3 — Present Perfect and the Future",
  description: "Connect the past to the present with the present perfect (simple and continuous), and talk about the future with will, going to, the present continuous and the future perfect.",
  targetScore: "Level B1",
  cover: ["calendar", "target", "plane"],
  pretest: {
    id: "gram-ch3-pre",
    title: "Chapter 3 Pretest",
    passPercent: 0,
    questions: [
      pick("gram-ch3-pre1", "I ___ to Japan twice.", ["have been", "went", "was", "had been"], 0, "Pengalaman tanpa waktu spesifik."),
      pick("gram-ch3-pre2", "She ___ here since 2020.", ["has worked", "works", "worked", "is working"], 0, "Since → present perfect."),
      trPick("gram-ch3-pre3", "“Saya sudah menunggu selama satu jam.” in English is…", ["I've been waiting for an hour.", "I'm waiting since an hour.", "I wait for one hour."], 0, "Present perfect continuous."),
      pick("gram-ch3-pre4", "Look at those clouds! It ___ rain.", ["is going to", "will", "rains", "is raining"], 0, "Bukti → going to."),
      pick("gram-ch3-pre5", "By next year, I ___ my degree.", ["will have finished", "finish", "will finish already", "am finishing"], 0, "Future perfect."),
    ],
  },
  lessons: [
    {
      id: "gram-ch3-l1",
      skill: "structure",
      title: "Present Perfect vs. Past Simple",
      summary: "Experience, unfinished time, recent results; for, since, already, yet, just, ever, never.",
      sections: [
        {
          title: "When to use which",
          blocks: [
            table(["Present perfect", "Past simple"], [["no specific past time: I've been to Bali.", "specific time: I went to Bali in 2022."], ["unfinished period: I've read three books this month.", "finished period: I read three books last month."], ["result now: I've lost my keys (I can't get in).", "story: I lost my keys and looked everywhere."], ["since / for (until now)", "ago / yesterday / in 2019"]]),
            table(["Word", "Position / use"], [["already", "before the main verb: I've already eaten."], ["yet", "end; negatives/questions: Have you finished yet?"], ["just", "very recently: She's just left."], ["ever / never", "experience: Have you ever tried durian?"]]),
          ],
        },
        {
          title: "Present perfect continuous",
          blocks: [
            table(["Focus", "Example"], [["duration until now", "I've been studying for three hours."], ["recent activity with visible results", "You look tired. Have you been running?"], ["(compare) completed result", "I've written five pages. (simple)"]]),
            warn("Jangan pakai **present perfect** dengan waktu lampau spesifik: *I have seen him yesterday* ❌ → *I saw him yesterday* ✅."),
            tryIt(pick("gram-ch3-l1-try", "I ___ my homework yet.", ["haven't finished", "didn't finish", "don't finish"], 0, "Yet → present perfect negatif.")),
          ],
        },
      ],
      checkpoint: [
        pick("gram-ch3-l1-c1", "We ___ each other for ten years.", ["have known", "know", "knew", "are knowing"], 0, "Stative + for."),
        pick("gram-ch3-l1-c2", "When ___ you arrive?", ["did", "have", "has", "do"], 0, "When → past simple."),
        fill("gram-ch3-l1-c3", "Complete: She has ___ left. You missed her by a minute.", "She has", "left. You missed her by a minute.", ["just"], "Baru saja."),
        pick("gram-ch3-l1-c4", "Which is correct?", ["I've been waiting here since 9 o'clock.", "I'm waiting here since 9 o'clock.", "I wait here since 9 o'clock."], 0, "Since + perfect continuous."),
        trPick("gram-ch3-l1-c5", "“Apakah kamu pernah naik pesawat?” in English is…", ["Have you ever flown in a plane?", "Did you ever fly a plane yesterday?", "Are you ever fly in a plane?"], 0, "Ever untuk pengalaman."),
        pick("gram-ch3-l1-c6", "Your friend's hands are covered in paint. What do you say?", ["Have you been painting?", "Did you paint in 2010?", "Do you paint?"], 0, "Hasil yang terlihat.", { hots: true }),
      ],
    },
    {
      id: "gram-ch3-l2",
      skill: "structure",
      title: "Talking About the Future",
      summary: "will, going to, present continuous, present simple, future continuous and future perfect.",
      sections: [
        {
          title: "Future forms",
          blocks: [
            table(["Form", "Use", "Example"], [["will", "instant decisions, predictions, promises", "I'll call you later."], ["going to", "plans and intentions; predictions with evidence", "I'm going to study medicine."], ["present continuous", "fixed arrangements", "I'm meeting Sari at six."], ["present simple", "timetables", "The flight leaves at 10."], ["future continuous", "action in progress at a future time", "This time tomorrow, I'll be flying."], ["future perfect", "completed before a future time", "By June, I'll have finished."]]),
            pics([["plane", "flight at 10"], ["calendar", "arrangement"], ["target", "intention"], ["clock", "by June"]]),
          ],
        },
        {
          title: "Time clauses",
          blocks: [
            text("Setelah **when, before, after, until, as soon as, by the time** yang merujuk ke masa depan, pakai **present tense**, bukan *will*: *I'll call you **when I arrive*** (bukan *when I will arrive*)."),
            examples([{ wrong: "I'll text you as soon as I will land.", right: "I'll text you as soon as I land." }, { wrong: "By the time you will come, we'll have eaten.", right: "By the time you come, we'll have eaten." }]),
            tryIt(pick("gram-ch3-l2-try", "I'll wait here until you ___ back.", ["come", "will come", "came"], 0, "Time clause → present.")),
          ],
        },
      ],
      checkpoint: [
        pick("gram-ch3-l2-c1", "The phone's ringing. — I ___ get it.", ["'ll", "'m going to", "get"], 0, "Keputusan spontan."),
        pick("gram-ch3-l2-c2", "We ___ the dentist at 4 tomorrow. It's booked.", ["are seeing", "will see", "see"], 0, "Arrangement."),
        pick("gram-ch3-l2-c3", "This time next week, I ___ on a beach.", ["will be lying", "will lie", "lie"], 0, "Future continuous."),
        fill("gram-ch3-l2-c4", "Complete: By 2030, the city ___ (build) a new airport.", "By 2030, the city", "a new airport.", ["will have built"], "Future perfect."),
        match("gram-ch3-l2-c5", "Match the sentence and the use.", [["I'll help you.", "offer"], ["I'm going to learn Korean.", "intention"], ["The bus leaves at 8.", "timetable"], ["I'm meeting Raka tonight.", "arrangement"]], "Fungsi future."),
        pick("gram-ch3-l2-c6", "Which sentence is wrong?", ["I'll call you when I will arrive.", "I'll call you when I arrive.", "I'll call you as soon as I land."], 0, "Time clause.", { hots: true }),
      ],
    },
    {
      id: "gram-ch3-l3",
      skill: "reading",
      title: "Perfect and Future Forms in an Email",
      summary: "Reading and writing an update that links past, present and future.",
      passages: [UPDATE],
      sections: [
        {
          title: "Read",
          blocks: [
            { type: "passage", passage: UPDATE },
            audio("Listen and read", say(["woman", UPDATE.lines.join(" ")])),
          ],
        },
        {
          title: "Write",
          blocks: [
            writing({
              id: "gram-ch3-l3-write",
              title: "An update email",
              prompt: "Write an email (120–170 words) to a friend about something you are in the middle of (a course, a job, a project). Say what you have done so far, what you haven't done yet, what you are going to do and what you will have done by a certain date.",
              image: "envelope",
              minWords: 120,
              maxWords: 170,
              tips: ["I've been … for …", "So far, I've …", "I haven't … yet, but …", "Next week, I'm going to / I'm …ing", "By …, I'll have …"],
              models: [{ label: "Model", text: "Hi Dimas,\nI've been taking an online coding course for two months now, and it's going really well. So far, I've completed six modules and built a simple website for my mum's cake shop. I've been practising every evening, so I've had less time for games, but I don't mind.\nI haven't started the final project yet, but I'm going to choose a topic this weekend. I'm meeting my mentor on Tuesday to discuss it. I think I'll probably build an app that helps students share notes.\nIf everything goes to plan, I'll have finished the course by the end of August. Then I'll send you the link to my app so you can test it!\nTalk soon,\nRani" }],
              rubric: ["I used the present perfect for experiences and progress.", "I used yet, already, so far or since correctly.", "I used at least two different future forms.", "I used the future perfect once.", "My email had a natural, friendly tone."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("gram-ch3-l3-c1", "How long has the volunteer been in Flores?", ["three weeks", "three months", "one week", "one year"], 0, "Baris 1.", { passageId: UPDATE.id }),
        pick("gram-ch3-l3-c2", "What hasn't the volunteer done yet?", ["visit Komodo Island", "build classrooms", "drink water", "start teaching"], 0, "Baris 3.", { passageId: UPDATE.id }),
        fill("gram-ch3-l3-c3", "Complete from the text: The weather ___ very hot.", "The weather", "very hot.", ["has been"], "Baris 4.", { passageId: UPDATE.id }),
        pickMany("gram-ch3-l3-c4", "Choose ALL future forms used in the email.", ["I'm going to go", "I'll probably travel", "I'll have spent", "I've built"], [0, 1, 2], "I've built = present perfect.", { passageId: UPDATE.id }),
        pick("gram-ch3-l3-c5", "Why does the writer say “I'll have spent almost three months here”?", ["to describe what will be complete by the time they return", "to describe a past trip", "to make a promise"], 0, "Future perfect.", { passageId: UPDATE.id }),
        pick("gram-ch3-l3-c6", "What can be inferred about the classrooms?", ["They were finished recently and are already being used.", "They will be built next year.", "They were never finished."], 0, "Inferensi.", { passageId: UPDATE.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "gram-ch3-post",
    title: "Chapter 3 Posttest",
    passPercent: 70,
    passages: [UPDATE],
    questions: [
      pick("gram-ch3-post1", "I ___ that film three times.", ["have seen", "saw yesterday", "see", "am seeing"], 0, "Pengalaman."),
      pick("gram-ch3-post2", "He ___ to Medan in 2019.", ["moved", "has moved", "moves", "had move"], 0, "Waktu spesifik."),
      pick("gram-ch3-post3", "How long ___ you been learning English?", ["have", "did", "are", "had"], 0, "Have you been…"),
      pick("gram-ch3-post4", "I think it ___ be a great party.", ["will", "is going", "is", "be"], 0, "Prediksi."),
      fill("gram-ch3-post5", "Complete: Have you finished the report ___ ?", "Have you finished the report", "?", ["yet"], "Yet di akhir."),
      pick("gram-ch3-post6", "When does the project end?", ["30 June", "next weekend", "in three weeks", "in August"], 0, "Baris 5.", { passageId: UPDATE.id }),
      trPick("gram-ch3-post7", "“Pada akhir tahun, saya sudah menabung 5 juta.” in English is…", ["By the end of the year, I'll have saved 5 million.", "By the end of the year, I save 5 million.", "At the end of the year, I've saved 5 million."], 0, "Future perfect."),
      listen("gram-ch3-post8", voice("Don't worry, I'll lend you my notes."), "What is the speaker doing?", ["making an offer", "describing a plan made last week", "talking about the past"], 0, "Offer → will."),
      pick("gram-ch3-post9", "Which sentence shows a plan made before speaking?", ["We're going to paint the kitchen this weekend.", "Oh, it's dark. I'll turn on the light.", "I think it'll rain."], 0, "Going to = rencana.", { hots: true }),
      pick("gram-ch3-post10", "“I've been drinking about four litres of water a day.” Why the continuous form?", ["It emphasises a repeated activity over a period until now.", "It describes a single finished action.", "It is a future plan."], 0, "Durasi/aktivitas berulang.", { passageId: UPDATE.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Time Travellers",
    questions: [
      live("gram-ch3-live1", "I ___ never tried durian.", ["have", "did", "am", "was"], 0, "food-stall"),
      live("gram-ch3-live2", "Since or for: ___ 2018", ["since", "for", "ago", "during"], 0, "calendar"),
      live("gram-ch3-live3", "Arrangement:", ["I'm meeting her at 5.", "I meet her yesterday.", "I'll met her.", "I met her tomorrow."], 0, "clock"),
      live("gram-ch3-live4", "“Baru saja” =", ["just", "yet", "already", "ever"], 0, "owl-think", true),
      live("gram-ch3-live5", "I'll call when I ___.", ["arrive", "will arrive", "arrived", "arriving"], 0, "phone-call"),
      live("gram-ch3-live6", "By 2030 I ___ graduated.", ["will have", "will", "have", "had"], 0, "graduation"),
      live("gram-ch3-live7", "Specific past time → ", ["past simple", "present perfect", "future", "imperative"], 0, "report"),
      live("gram-ch3-live8", "Look at the clouds! It's ___ rain.", ["going to", "will", "raining to", "go"], 0, "cloud"),
    ],
  },
};

export const CH4: Level = {
  id: "gram-ch4",
  title: "Chapter 4 — Nouns, Articles and Quantifiers",
  description: "Use countable and uncountable nouns, a/an/the and zero article, quantifiers (some, any, much, many, few, little), and pronouns accurately.",
  targetScore: "Level A2–B1+",
  cover: ["coffee", "basket", "open-book"],
  pretest: {
    id: "gram-ch4-pre",
    title: "Chapter 4 Pretest",
    passPercent: 0,
    questions: [
      pick("gram-ch4-pre1", "Can I have ___ information about the course?", ["some", "an", "many", "a few"], 0, "Information = uncountable."),
      pick("gram-ch4-pre2", "___ sun rises in the east.", ["The", "A", "An", "—"], 0, "Unik → the."),
      trPick("gram-ch4-pre3", "“Sedikit (tapi cukup) uang” in English is…", ["a little money", "a few money", "few moneys", "little moneys"], 0, "A little + uncountable."),
      pick("gram-ch4-pre4", "She is ___ engineer.", ["an", "a", "the", "—"], 0, "Bunyi vokal → an."),
      pick("gram-ch4-pre5", "How ___ students are in your class?", ["many", "much", "little", "lot"], 0, "Countable → many."),
    ],
  },
  lessons: [
    {
      id: "gram-ch4-l1",
      skill: "structure",
      title: "Countable/Uncountable Nouns and Quantifiers",
      summary: "Some/any, much/many, a lot of, (a) few, (a) little, and units for uncountable nouns.",
      sections: [
        {
          title: "Countable vs. uncountable",
          blocks: [
            table(["Countable", "Uncountable"], [["a book, two books", "advice, information, furniture"], ["a job", "work"], ["a suitcase", "luggage, baggage"], ["a coin", "money"], ["a fact", "evidence, research, news"]]),
            text("Kata tak terhitung tidak memakai **a/an** atau **-s**. Gunakan satuan: *a piece of advice*, *two items of luggage*, *a cup of coffee*."),
            pics([["coffee", "a cup of coffee"], ["suitcase", "luggage"], ["money", "money"], ["open-book", "information"]]),
          ],
        },
        {
          title: "Quantifiers",
          blocks: [
            table(["Quantifier", "With", "Meaning"], [["some / any", "both", "positive / negatives and questions"], ["many / much", "countable / uncountable", "used in questions and negatives"], ["a lot of / lots of", "both", "positive sentences"], ["a few / a little", "countable / uncountable", "some (positive: enough)"], ["few / little", "countable / uncountable", "not many / not much (negative feeling)"]]),
            examples([{ right: "I have a few friends here. (cukup, positif)" }, { right: "I have few friends here. (sangat sedikit, terasa kurang)" }], "A few vs. few"),
            tryIt(pick("gram-ch4-l1-try", "Could you give me ___ advice?", ["some", "an", "many"], 0, "Advice = uncountable.")),
          ],
        },
      ],
      checkpoint: [
        pick("gram-ch4-l1-c1", "There isn't ___ milk left.", ["much", "many", "a few"], 0, "Uncountable negatif."),
        pick("gram-ch4-l1-c2", "We need ___ more chairs for the guests.", ["a few", "a little", "much"], 0, "Countable."),
        fill("gram-ch4-l1-c3", "Complete: She gave me a useful piece of ___ . (saran)", "She gave me a useful piece of", ".", ["advice"], "A piece of advice.", { translate: true }),
        match("gram-ch4-l1-c4", "Match the noun and its unit.", [["bread", "a slice of"], ["water", "a bottle of"], ["luggage", "an item of"], ["news", "a piece of"]], "Satuan."),
        trPick("gram-ch4-l1-c5", "“Hanya sedikit orang yang datang (mengecewakan).” in English is…", ["Few people came.", "A few people came.", "Little people came."], 0, "Few = negatif."),
        pick("gram-ch4-l1-c6", "Which sentence is correct?", ["The research shows interesting results.", "The researches show interesting results.", "A research show results."], 0, "Research = uncountable.", { hots: true }),
      ],
    },
    {
      id: "gram-ch4-l2",
      skill: "structure",
      title: "Articles and Pronouns",
      summary: "a/an, the and zero article; reflexive, possessive and indefinite pronouns.",
      sections: [
        {
          title: "Articles",
          blocks: [
            table(["Article", "Use", "Example"], [["a / an", "first mention; one of many; jobs", "I saw a dog. She's an architect."], ["the", "already known; unique; superlatives; specific", "The dog was huge. The moon. The best café."], ["zero", "general plural / uncountable; most countries, meals, languages", "Dogs are loyal. I love coffee. Breakfast is ready."]]),
            warn("**The** untuk negara berbentuk jamak/serikat: *the Netherlands, the USA, the Philippines*; dan sungai/laut: *the Mahakam, the Java Sea*."),
          ],
        },
        {
          title: "Pronouns",
          blocks: [
            table(["Type", "Examples"], [["possessive pronouns", "mine, yours, his, hers, ours, theirs"], ["reflexive", "myself, yourself, himself, herself, ourselves, themselves"], ["indefinite", "someone, anyone, no one, everyone, something, nothing"], ["each other", "They help each other. (reciprocal)"]]),
            examples([{ wrong: "Everyone have finished.", right: "Everyone has finished.", note: "Everyone = tunggal." }, { wrong: "This bag is my.", right: "This bag is mine." }]),
            tryIt(pick("gram-ch4-l2-try", "I hurt ___ while cooking.", ["myself", "me", "mine"], 0, "Reflexive.")),
          ],
        },
      ],
      checkpoint: [
        pick("gram-ch4-l2-c1", "My brother is ___ university student.", ["a", "an", "the"], 0, "University = bunyi /ju/ → a."),
        pick("gram-ch4-l2-c2", "___ Netherlands is famous for tulips.", ["The", "A", "—"], 0, "The Netherlands."),
        pick("gram-ch4-l2-c3", "I love ___ music.", ["—", "the", "a"], 0, "Umum → zero article."),
        fill("gram-ch4-l2-c4", "Complete: Is this pen yours or ___ ? (milik saya)", "Is this pen yours or", "?", ["mine"], "Possessive pronoun.", { translate: true }),
        trPick("gram-ch4-l2-c5", "“Mereka saling membantu.” in English is…", ["They help each other.", "They help themselves each.", "They help theirs."], 0, "Each other."),
        pick("gram-ch4-l2-c6", "Which sentence uses articles correctly?", ["I bought a phone. The phone is very fast.", "I bought the phone. A phone is very fast.", "I bought phone. Phone is fast."], 0, "Penyebutan pertama → a; berikutnya → the.", { hots: true }),
      ],
    },
    {
      id: "gram-ch4-l3",
      skill: "reading",
      title: "Nouns and Articles in Context",
      summary: "Reading an informative text and writing a short guide.",
      passages: [ARTICLE],
      sections: [
        {
          title: "Read",
          blocks: [
            { type: "passage", passage: ARTICLE },
            audio("Listen and read", say(["man", ARTICLE.lines.join(" ")])),
          ],
        },
        {
          title: "Write",
          blocks: [
            writing({
              id: "gram-ch4-l3-write",
              title: "A short guide",
              prompt: "Write a short guide (120–160 words) to a food, drink or product from your region. Use articles carefully and at least four different quantifiers.",
              image: "food-stall",
              minWords: 120,
              maxWords: 160,
              tips: ["… is one of the most popular …", "Most of the … is made by …", "There is little / a little …", "A few … / many … / much …", "If you visit …, you can …"],
              models: [{ label: "Model", text: "Pempek is one of the most popular snacks in South Sumatra. It is a fish cake made from ground fish and sago flour, and it is usually served with a dark, sour sauce called cuko. Most of the pempek sold in Palembang is made by small family businesses rather than factories. There are many types, but the most famous is kapal selam, which has an egg inside. Visitors who don't eat much spicy food should ask for a little less chili in the sauce. A few shops also sell frozen pempek, so you can take some home. If you visit Palembang, you should try at least two or three kinds." }],
              rubric: ["I used a/an, the and zero article correctly.", "I used at least four quantifiers correctly.", "I distinguished countable and uncountable nouns.", "My guide is clear and informative."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("gram-ch4-l3-c1", "Who grows most of Indonesia's coffee?", ["small farmers", "large companies", "the government", "tourists"], 0, "Baris 2.", { passageId: ARTICLE.id }),
        pick("gram-ch4-l3-c2", "How is kopi tubruk made?", ["by pouring hot water over finely ground beans", "with milk and ice", "in an espresso machine", "by boiling beans for hours"], 0, "Baris 4.", { passageId: ARTICLE.id }),
        fill("gram-ch4-l3-c3", "Complete from the text: There is ___ sugar in specialty coffee.", "There is", "sugar in specialty coffee.", ["little"], "Baris 5.", { passageId: ARTICLE.id }),
        pickMany("gram-ch4-l3-c4", "Choose ALL quantifiers used in the text.", ["most of", "many", "a few", "several", "plenty of"], [0, 1, 2, 3], "Plenty of tidak dipakai.", { passageId: ARTICLE.id }),
        pick("gram-ch4-l3-c5", "Why is “the world's largest producers” written with “the”?", ["It is a superlative.", "It is the first mention.", "It is a plural general noun."], 0, "Superlatif.", { passageId: ARTICLE.id }),
        pick("gram-ch4-l3-c6", "“There is little sugar” vs. “a little sugar”: what does the writer emphasise?", ["that the amount is very small", "that there is enough sugar", "that sugar is cheap"], 0, "Little = sangat sedikit.", { passageId: ARTICLE.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "gram-ch4-post",
    title: "Chapter 4 Posttest",
    passPercent: 70,
    passages: [ARTICLE],
    questions: [
      pick("gram-ch4-post1", "We don't have ___ time left.", ["much", "many", "a few", "few"], 0, "Uncountable."),
      pick("gram-ch4-post2", "She bought ___ new furniture.", ["some", "a", "many", "an"], 0, "Furniture uncountable."),
      pick("gram-ch4-post3", "___ Mahakam is the longest river in East Kalimantan.", ["The", "A", "—", "An"], 0, "Sungai → the."),
      pick("gram-ch4-post4", "It's ___ honour to meet you.", ["an", "a", "the", "—"], 0, "Honour: h tidak dibunyikan."),
      fill("gram-ch4-post5", "Complete: The children made the cake by ___ .", "The children made the cake by", ".", ["themselves"], "Reflexive."),
      pick("gram-ch4-post6", "Which region's coffee is described as earthy?", ["Aceh", "Toraja", "Bali", "Java"], 0, "Baris 3.", { passageId: ARTICLE.id }),
      trPick("gram-ch4-post7", "“Beberapa (cukup) teman membantu saya.” in English is…", ["A few friends helped me.", "Few friends helped me.", "A little friends helped me."], 0, "A few = positif."),
      listen("gram-ch4-post8", voice("Everyone has brought their own lunch."), "Is “has” correct after “everyone”?", ["Yes, everyone is singular.", "No, it should be “have”.", "No, it should be “having”."], 0, "Everyone tunggal."),
      pick("gram-ch4-post9", "Which sentence is wrong?", ["Can you give me an advice?", "Can you give me some advice?", "Can you give me a piece of advice?"], 0, "Advice tidak memakai an.", { hots: true }),
      pick("gram-ch4-post10", "What can you usually do at a coffee farm, according to the text?", ["take a tour and taste several kinds of beans", "buy furniture", "stay for free", "learn to fly"], 0, "Baris 6.", { passageId: ARTICLE.id }),
    ],
  },
  live: {
    title: "Live Quiz — Count It!",
    questions: [
      live("gram-ch4-live1", "Uncountable:", ["information", "book", "chair", "idea"], 0, "open-book"),
      live("gram-ch4-live2", "___ hour", ["an", "a", "the", "—"], 0, "clock"),
      live("gram-ch4-live3", "How ___ water?", ["much", "many", "few", "a few"], 0, "water"),
      live("gram-ch4-live4", "“Sepotong roti” =", ["a slice of bread", "a bread", "a breads", "one bread piece"], 0, "bread", true),
      live("gram-ch4-live5", "This is ___ (milik mereka).", ["theirs", "their", "them", "they"], 0, "house"),
      live("gram-ch4-live6", "___ moon", ["the", "a", "an", "—"], 0, "night"),
      live("gram-ch4-live7", "Few = …", ["not many", "some", "a lot", "enough"], 0, "sad"),
      live("gram-ch4-live8", "Everyone ___ here.", ["is", "are", "be", "were"], 0, "meeting"),
    ],
  },
};
