import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, writing } from "../kit";

// Grade 8 (SMP, Fase D). Chapter 7 — Love Our Planet · Chapter 8 — Technology and Me

const PLASTIC: Passage = {
  id: "smp8-c7-plastic",
  title: "Plastic in Our Seas",
  pic: "turtle",
  lines: [
    "Indonesia is one of the biggest sources of plastic waste in the ocean. Every year, millions of tonnes of plastic end up in our seas.",
    "Plastic doesn't disappear. A plastic bottle can take about 450 years to break down.",
    "When plastic breaks into tiny pieces called microplastics, fish eat them. If we eat those fish, the plastic enters our bodies too.",
    "Sea turtles often think plastic bags are jellyfish. If a turtle eats a plastic bag, it may die.",
    "The good news is that we can do something. Two sisters from Bali, Melati and Isabel Wijsen, started a campaign called Bye Bye Plastic Bags when they were only 12 and 10. Their campaign helped persuade the government of Bali to ban plastic bags.",
    "If every student brings a reusable bottle, we will save hundreds of plastic bottles every month.",
    "If we refuse plastic straws and bags, shops will stop giving them.",
    "Our oceans feed us and give us oxygen. If we don't act now, it will be too late for the next generation.",
  ],
};

export const CH7: Level = {
  id: "smp8-ch7",
  title: "Chapter 7 — Love Our Planet",
  description: "Talk about environmental problems and their causes and effects, use the first conditional to talk about results, and write a persuasive text or speech.",
  targetScore: "Structure · Reading · Writing",
  cover: ["earth", "turtle", "recycle"],
  pretest: {
    id: "smp8-c7-pre",
    title: "Chapter 7 Pretest",
    passPercent: 0,
    questions: [
      pick("smp8-c7-pre1", "If we cut down the forest, there ___ more floods.", ["will be", "was", "is being", "were"], 0, "First conditional → will."),
      listen("smp8-c7-pre2", voice("Plastic bottles can take hundreds of years to break down."), "Listen. How long can plastic bottles take to break down?", ["hundreds of years", "a few days", "one year", "ten minutes"], 0, "Hundreds of years."),
      trPick("smp8-c7-pre3", "“Pemanasan global” in English is…", ["global warming", "global heating day", "world hot", "warm globe"], 0, "Global warming."),
      pick("smp8-c7-pre4", "Which one is a renewable energy source?", ["solar power", "coal", "oil", "gas"], 0, "Energi surya terbarukan."),
      pick("smp8-c7-pre5", "The main cause of air pollution in big cities is…", ["smoke from vehicles and factories", "trees", "rain", "birds"], 0, "Asap kendaraan dan pabrik.", { image: "factory" }),
    ],
  },
  lessons: [
    {
      id: "smp8-c7-l1",
      skill: "vocabulary",
      title: "Environmental Issues",
      summary: "Problems, causes, effects and solutions.",
      sections: [
        {
          title: "Problems and causes",
          blocks: [
            table(["Problem", "Meaning", "Cause"], [["air pollution", "polusi udara", "smoke from vehicles and factories, burning rubbish"], ["deforestation", "penggundulan hutan", "illegal logging, land clearing for plantations"], ["flooding", "banjir", "rubbish in rivers, no water catchment"], ["global warming / climate change", "pemanasan global / perubahan iklim", "greenhouse gases from fuel"], ["plastic waste", "sampah plastik", "single-use plastic"], ["water shortage", "kekurangan air", "wasting water, drought"]]),
            pics([["factory", "air pollution"], ["tree", "deforestation"], ["rain", "floods"], ["trash", "plastic waste"]]),
          ],
        },
        {
          title: "Solutions",
          blocks: [
            vocab([["reduce", "mengurangi", "recycle"], ["reusable", "dapat dipakai ulang", "water"], ["renewable energy", "energi terbarukan", "earth"], ["public transport", "transportasi umum", "bus"], ["reforestation", "penghijauan kembali", "sprout"], ["conserve", "melestarikan/menghemat", "tap"]], "Solutions"),
            tryIt(pick("smp8-c7-l1-try1", "Planting trees in areas where forests were cut down is called…", ["reforestation", "deforestation", "pollution"], 0, "Re- = kembali.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp8-c7-l1-c1", voice("Taking the bus instead of driving a car reduces air pollution."), "Listen. What reduces air pollution?", ["taking the bus", "driving a car", "burning rubbish"], 0, "Taking the bus."),
        match("smp8-c7-l1-c2", "Match the problem and the solution.", [["air pollution", "use public transport"], ["deforestation", "plant trees"], ["plastic waste", "bring reusable bags"], ["water shortage", "save water"]], "Masalah dan solusi."),
        trPick("smp8-c7-l1-c3", "“Penggundulan hutan” in English is…", ["deforestation", "reforestation", "forest fire"], 0, "Deforestation."),
        fill("smp8-c7-l1-c4", "Complete: Solar and wind power are ___ energy sources.", "Solar and wind power are", "energy sources.", ["renewable"], "Terbarukan = renewable."),
        pick("smp8-c7-l1-c5", "Which action causes floods in cities?", ["throwing rubbish into rivers", "planting trees", "making biopores"], 0, "Sampah menyumbat sungai."),
        pick("smp8-c7-l1-c6", "Why does deforestation make global warming worse?", ["Trees absorb carbon dioxide; fewer trees means more CO₂ in the air.", "Trees make the air hot.", "Forests cause rain."], 0, "Pohon menyerap CO₂.", { hots: true }),
      ],
    },
    {
      id: "smp8-c7-l2",
      skill: "structure",
      title: "The First Conditional",
      summary: "If + present, will + verb: real possibilities in the future; unless.",
      sections: [
        {
          title: "Form",
          blocks: [
            table(["If-clause (condition)", "Main clause (result)"], [["If we plant more trees,", "the air will be cleaner."], ["If you leave the tap on,", "you will waste a lot of water."], ["If it doesn't rain soon,", "the farmers won't have enough water."]]),
            text("Klausa **if** memakai **simple present**, klausa utama memakai **will / won't + kata kerja dasar**. Jika klausa if di depan, pakai **koma**. **Unless** = *if … not*: *Unless we act now, it will be too late.*"),
            examples([{ wrong: "If we will recycle, we save energy.", right: "If we recycle, we will save energy." }, { wrong: "If it rains, we don't will go.", right: "If it rains, we won't go." }], "Common mistakes"),
          ],
        },
        {
          title: "Chain of consequences",
          blocks: [
            audio("A chain story", say(["man", "If we burn rubbish, there will be a lot of smoke."], ["woman", "If there is a lot of smoke, people will have breathing problems."], ["man", "If people have breathing problems, they will go to the hospital."], ["woman", "If they go to the hospital, they will spend a lot of money. So let's not burn rubbish!"])),
            repeat(["If we save electricity, we will help the planet.", "Unless we stop polluting, the fish will die.", "What will happen if the ice melts?"]),
            tryIt(pick("smp8-c7-l2-try1", "If the ice at the poles melts, the sea level ___ .", ["will rise", "rises up will", "rose"], 0, "Result → will rise.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp8-c7-l2-c1", voice("If you don't turn off the lights, the electricity bill will be very high."), "Listen. What will happen if you don't turn off the lights?", ["The bill will be high.", "The lights will break.", "Nothing will happen."], 0, "The bill will be very high."),
        pick("smp8-c7-l2-c2", "If we ___ plastic, we will reduce waste.", ["recycle", "will recycle", "recycled"], 0, "If + present."),
        fill("smp8-c7-l2-c3", "Complete: If it rains tomorrow, we ___ (not/go) to the beach.", "If it rains tomorrow, we", "to the beach.", ["won't go", "will not go"], "Won't + go."),
        pick("smp8-c7-l2-c4", "___ we protect the forests, orangutans will disappear.", ["Unless", "If", "When"], 0, "Unless = if not."),
        trPick("smp8-c7-l2-c5", "“Jika kita menanam pohon, udara akan lebih bersih.” in English is…", ["If we plant trees, the air will be cleaner.", "If we will plant trees, the air is cleaner.", "If we plant trees, the air cleaner."], 0, "First conditional."),
        pick("smp8-c7-l2-c6", "Which sentence shows the correct chain of cause and effect?", ["If people throw rubbish into rivers, the rivers will get blocked and there will be floods.", "If there are floods, people will throw rubbish.", "If rivers are clean, there will be more floods."], 0, "Sampah → sungai tersumbat → banjir.", { hots: true }),
      ],
    },
    {
      id: "smp8-c7-l3",
      skill: "reading",
      title: "Reading: Plastic in Our Seas",
      summary: "Read a persuasive text and give a short environmental speech.",
      passages: [PLASTIC],
      sections: [
        {
          title: "A persuasive text",
          blocks: [
            { type: "passage", passage: PLASTIC },
            audio("Listen and read", say(["woman", PLASTIC.lines.join(" ")])),
            table(["Part", "Function", "In the text"], [["Thesis / issue", "masalah dan sikap penulis", "lines 1–2"], ["Arguments", "fakta dan alasan", "lines 3–5"], ["Recommendation", "ajakan/solusi", "lines 6–8"]]),
            tip("Teks persuasif menggunakan **fakta dan angka**, **contoh nyata** (seperti kakak-beradik Wijsen), dan **ajakan** dengan *we / let's / if we…, we will…*."),
          ],
        },
        {
          title: "Speak up for the planet",
          blocks: [
            tryIt(pick("smp8-c7-l3-try1", "How long can a plastic bottle take to break down?", ["about 450 years", "about 45 years", "about 4 years"], 0, "Baris 2.", { passageId: PLASTIC.id })),
            speaking({
              id: "smp8-c7-l3-say",
              title: "A one-minute green speech",
              prompt: "Give a short persuasive speech about one environmental problem in your area. State the problem, give two facts or reasons, and end with what we should do. Use at least two first conditional sentences.",
              image: "earth",
              prepSeconds: 60,
              seconds: 90,
              tips: ["Good morning, everyone. Today I want to talk about …", "Did you know that …?", "If we …, … will …", "Unless we …, …", "So, let's …!"],
              models: [{ label: "Example", text: "Good morning, everyone. Today I want to talk about the river near our school. Did you know that it was clean ten years ago? Now it's full of plastic and it smells terrible. Every rainy season, it floods the houses nearby. If we keep throwing rubbish into it, the floods will get worse every year. If the water stays dirty, mosquitoes will spread diseases like dengue fever. But if every family sorts its rubbish, the river will be clean again. So, let's start today. Bring a reusable bottle, use the right bins and tell your family. Thank you!" }],
              rubric: ["I stated the problem clearly.", "I gave at least two facts or reasons.", "I used at least two first conditional sentences correctly.", "I ended with a clear call to action."],
            }),
            writing({
              id: "smp8-c7-l3-write",
              title: "A persuasive text",
              prompt: "Write a persuasive text for the school wall magazine: “Our School Should Go Plastic-Free”. Use the structure thesis – arguments – recommendation.",
              image: "recycle",
              minWords: 130,
              maxWords: 250,
              tips: ["Thesis: I strongly believe …", "Argument 1: Firstly, …", "Argument 2: Secondly, …", "Argument 3: Moreover, …", "Recommendation: Therefore, … If we …, we will …"],
              models: [{ label: "Example", text: "Our School Should Go Plastic-Free\nEvery day, our canteen sells hundreds of drinks in plastic cups and snacks in plastic packets. I strongly believe our school should become plastic-free.\nFirstly, plastic waste is a serious problem. Our school produces about thirty kilograms of plastic rubbish every week. Most of it goes to the landfill, and some of it ends up in the river behind our school.\nSecondly, plastic is bad for our health. When people burn plastic, it releases toxic smoke. Microplastics can also enter our food.\nMoreover, going plastic-free is not difficult. Many schools in Bali have already done it. Students bring their own bottles and lunch boxes, and canteens use glasses and banana leaves.\nTherefore, I suggest three steps: install water refill stations, ask the canteen to stop selling plastic cups, and give rewards to the greenest class. If we start now, our school will be cleaner and healthier, and we will set a good example for our community." }],
              rubric: ["I stated my position clearly in the thesis.", "I gave at least three arguments with facts or examples.", "I used linking words (firstly, secondly, moreover, therefore).", "I used the first conditional in my recommendation.", "My recommendation is realistic."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("smp8-c7-l3-c1", "What are microplastics?", ["tiny pieces of plastic", "small fish", "new bottles"], 0, "Baris 3.", { passageId: PLASTIC.id }),
        pick("smp8-c7-l3-c2", "Why do sea turtles eat plastic bags?", ["They think they are jellyfish.", "They like the taste.", "They are hungry for plastic."], 0, "Baris 4.", { passageId: PLASTIC.id }),
        fill("smp8-c7-l3-c3", "Complete.", "If every student brings a reusable", ", we will save hundreds of plastic bottles every month.", ["bottle"], "Baris 6.", { passageId: PLASTIC.id }),
        pickMany("smp8-c7-l3-c4", "Choose ALL the first conditional sentences.", ["line 6", "line 7", "line 4", "line 2"], [0, 1], "Baris 6 dan 7 (if + present, will). Baris 4 memakai may.", { passageId: PLASTIC.id }),
        pick("smp8-c7-l3-c5", "Why does the writer mention Melati and Isabel Wijsen?", ["to show that young people can make a change", "to describe Bali's beaches", "to sell bags"], 0, "Contoh nyata untuk meyakinkan.", { passageId: PLASTIC.id, hots: true }),
        pick("smp8-c7-l3-c6", "How does line 3 connect plastic in the sea to humans?", ["Fish eat microplastics, and people eat the fish.", "People drink sea water.", "Plastic makes fish bigger."], 0, "Rantai makanan.", { passageId: PLASTIC.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp8-c7-post",
    title: "Chapter 7 Posttest",
    passPercent: 70,
    passages: [PLASTIC],
    questions: [
      pick("smp8-c7-post1", "If you ___ the bus, you will reduce pollution.", ["take", "will take", "took", "taking"], 0, "If + present."),
      listen("smp8-c7-post2", voice("Unless we stop illegal logging, there will be no forests left for our grandchildren."), "Listen. What will happen if we don't stop illegal logging?", ["There will be no forests left.", "There will be more trees.", "Grandchildren will plant trees.", "Nothing will change."], 0, "No forests left."),
      trPick("smp8-c7-post3", "“Sekali pakai” (plastic) in English is…", ["single-use", "one-time-sale", "reusable", "once-only use-it"], 0, "Single-use plastic."),
      pick("smp8-c7-post4", "If the temperature rises, more ice ___ .", ["will melt", "melted", "melt will", "melting"], 0, "Will + melt."),
      arrange("smp8-c7-post5", "Put the words in order.", "If we recycle paper we will save trees", "If-clause + main clause."),
      pick("smp8-c7-post6", "What did the Wijsen sisters help to do?", ["persuade Bali's government to ban plastic bags", "clean the ocean alone", "build a factory", "make plastic bottles"], 0, "Baris 5.", { passageId: PLASTIC.id }),
      match("smp8-c7-post7", "Match the cause and the effect.", [["burning rubbish", "air pollution"], ["cutting forests", "floods and landslides"], ["throwing plastic in the sea", "dead turtles"], ["using too much fuel", "global warming"]], "Sebab akibat."),
      fill("smp8-c7-post8", "Complete: If we don't act now, it ___ be too late.", "If we don't act now, it", "be too late.", ["will"], "Baris 8.", { passageId: PLASTIC.id }),
      pick("smp8-c7-post9", "Which part of a persuasive text are lines 6–8?", ["recommendation", "thesis", "orientation", "complication"], 0, "Ajakan/solusi.", { passageId: PLASTIC.id, hots: true }),
      pick("smp8-c7-post10", "Which argument would make the text even STRONGER?", ["A fact about how many plastic bags Indonesians use every day", "A story about the writer's cat", "A list of the writer's hobbies", "A joke about turtles"], 0, "Fakta memperkuat argumen.", { passageId: PLASTIC.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Planet Protectors",
    questions: [
      live("smp8-c7-live1", "If we recycle, we ___ save energy.", ["will", "would", "did", "were"], 0, "recycle"),
      live("smp8-c7-live2", "Unless = if …", ["not", "yes", "so", "and"], 0, "question"),
      live("smp8-c7-live3", "Turtles think plastic bags are…", ["jellyfish", "rocks", "fish eggs", "seaweed"], 0, "turtle"),
      live("smp8-c7-live4", "“Energi terbarukan” =", ["renewable energy", "removable energy", "rebuild energy", "energy drink"], 0, "earth", true),
      live("smp8-c7-live5", "Plastic bottle breaks down in about…", ["450 years", "45 days", "4 months", "4 years"], 0, "water"),
      live("smp8-c7-live6", "Opposite of deforestation:", ["reforestation", "pollution", "flooding", "erosion"], 0, "sprout"),
      live("smp8-c7-live7", "If it ___, we'll stay home.", ["rains", "will rain", "rained", "raining"], 0, "rain"),
      live("smp8-c7-live8", "Greener transport:", ["bicycle", "private jet", "big SUV", "speedboat"], 0, "bicycle"),
    ],
  },
};

const ONLINE: Passage = {
  id: "smp8-c8-online",
  title: "Have You Ever Been Fooled Online?",
  pic: "smartphone",
  lines: [
    "Most teenagers in Indonesia have used the internet since they were small children. But have you ever been tricked online?",
    "Last month, my cousin Tiara received a message: “Congratulations! You have won a new phone. Click this link to claim your prize.”",
    "She clicked the link and typed her password. A few hours later, someone had taken over her social media account.",
    "Tiara has learned an important lesson. She has changed all her passwords and she has turned on two-step verification.",
    "Experts give some advice. Never share your password or OTP code with anyone, not even your friends.",
    "Check the sender before you click a link. If an offer looks too good to be true, it probably is.",
    "Think before you post. Once you have posted a photo, you can't fully delete it from the internet.",
    "The internet is a wonderful tool, but we must use it wisely and safely.",
  ],
};

export const CH8: Level = {
  id: "smp8-ch8",
  title: "Chapter 8 — Technology and Me",
  description: "Talk about technology and experiences with the present perfect (ever, never, already, yet, for, since), stay safe online, and write emails and opinions about technology.",
  targetScore: "Structure · Reading · Writing",
  cover: ["smartphone", "laptop", "wifi"],
  pretest: {
    id: "smp8-c8-pre",
    title: "Chapter 8 Pretest",
    passPercent: 0,
    questions: [
      pick("smp8-c8-pre1", "Have you ever ___ a video online?", ["uploaded", "upload", "uploading", "uploads"], 0, "Have + past participle.", { image: "upload" }),
      listen("smp8-c8-pre2", voice("I've had this laptop since 2021."), "Listen. Since when has he had the laptop?", ["since 2021", "for 21 years", "since yesterday", "since 2012"], 0, "Since 2021."),
      trPick("smp8-c8-pre3", "“Kata sandi” in English is…", ["password", "keyword", "passport", "pass road"], 0, "Kata sandi = password."),
      pick("smp8-c8-pre4", "Which is the safest thing to do online?", ["keep your password secret", "share your OTP code", "click every link", "post your home address"], 0, "Rahasiakan kata sandi."),
      pick("smp8-c8-pre5", "We've lived here ___ ten years.", ["for", "since", "ago", "at"], 0, "Durasi → for."),
    ],
  },
  lessons: [
    {
      id: "smp8-c8-l1",
      skill: "vocabulary",
      title: "Tech Words",
      summary: "Devices, apps and internet actions.",
      sections: [
        {
          title: "Devices and actions",
          blocks: [
            vocab([
              ["smartphone", "ponsel pintar", "smartphone"],
              ["laptop", "laptop", "laptop"],
              ["Wi-Fi / internet connection", "koneksi internet", "wifi"],
              ["download / upload", "mengunduh / mengunggah", "download"],
              ["video call", "panggilan video", "video-app"],
              ["message / chat", "pesan / obrolan", "chat"],
            ], "Devices and actions"),
            table(["Verb", "Meaning", "Example"], [["log in / log out", "masuk / keluar akun", "Always log out on a shared computer."], ["install / update", "memasang / memperbarui", "Update your apps regularly."], ["search for", "mencari", "I searched for the answer online."], ["share / post", "membagikan / mengunggah", "Don't post your address."], ["charge", "mengisi daya", "My phone is charging."], ["scroll", "menggulir", "I scrolled for hours. Oops!"]]),
          ],
        },
        {
          title: "Online life",
          blocks: [
            table(["Word", "Meaning"], [["account", "akun"], ["password", "kata sandi"], ["OTP code", "kode OTP (sekali pakai)"], ["scam", "penipuan"], ["hoax / fake news", "berita bohong"], ["cyberbullying", "perundungan siber"], ["screen time", "waktu layar"], ["digital footprint", "jejak digital"]]),
            pics([["smartphone", "smartphone"], ["laptop", "laptop"], ["wifi", "Wi-Fi"], ["signal", "signal"]]),
            tryIt(pick("smp8-c8-l1-try1", "Fake information that spreads online is a…", ["hoax", "password", "charger"], 0, "Hoaks.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp8-c8-l1-c1", voice("Don't forget to log out when you use the computer at the library."), "Listen. What should you do?", ["log out", "log in", "turn off the Wi-Fi"], 0, "Log out."),
        match("smp8-c8-l1-c2", "Match the word and the meaning.", [["scam", "penipuan"], ["hoax", "berita bohong"], ["account", "akun"], ["upload", "mengunggah"]], "Kosakata digital.", { translate: true }),
        pick("smp8-c8-l1-c3", "Your phone battery is at 2%. You need to ___ it.", ["charge", "scroll", "post"], 0, "Mengisi daya = charge."),
        fill("smp8-c8-l1-c4", "Complete: ___ your apps to get new features and security fixes.", "", "your apps to get new features and security fixes.", ["Update", "update"], "Update = memperbarui."),
        trPick("smp8-c8-l1-c5", "“Jejak digital” in English is…", ["digital footprint", "digital footstep", "digital fingerprint"], 0, "Digital footprint."),
        pick("smp8-c8-l1-c6", "Your classmate posts mean comments about another student every day. This is…", ["cyberbullying", "a video call", "an update"], 0, "Perundungan siber.", { hots: true }),
      ],
    },
    {
      id: "smp8-c8-l2",
      skill: "structure",
      title: "The Present Perfect",
      summary: "have/has + past participle: experiences (ever/never), recent results (already/just/yet), duration (for/since).",
      sections: [
        {
          title: "Form and experiences",
          blocks: [
            table(["", "Example"], [["Positive", "I have (I've) used this app. She has (she's) visited Bali."], ["Negative", "I haven't tried it. He hasn't finished."], ["Question", "Have you ever made a video? — Yes, I have. / No, I haven't."]]),
            table(["Base", "Past", "Past participle"], [["be", "was/were", "been"], ["do", "did", "done"], ["go", "went", "gone/been"], ["see", "saw", "seen"], ["take", "took", "taken"], ["write", "wrote", "written"], ["eat", "ate", "eaten"], ["make", "made", "made"]]),
            text("**Present perfect** menghubungkan masa lalu dengan **sekarang**. Pakai untuk **pengalaman** tanpa waktu spesifik (*I've been to Lombok*). Jika ada waktu spesifik (*yesterday, in 2020*), pakai **simple past**: *I went to Lombok in 2020.*"),
          ],
        },
        {
          title: "Already, yet, just, for, since",
          blocks: [
            table(["Word", "Use", "Example"], [["already", "sudah (lebih cepat dari dugaan)", "I've already finished my homework."], ["yet", "belum / sudah? (negatif & tanya, di akhir)", "Have you replied yet? I haven't replied yet."], ["just", "baru saja", "She's just sent you a message."], ["for", "selama (durasi)", "I've had this phone for two years."], ["since", "sejak (titik waktu)", "I've known her since Grade 1."]]),
            audio("A busy evening", say(["woman", "Have you done your homework yet?"], ["man", "I've already done the maths, but I haven't finished the English essay yet."], ["woman", "You've been on your phone for two hours!"], ["man", "I know, sorry. I've just turned it off. I'll finish the essay now."])),
            tryIt(pick("smp8-c8-l2-try1", "What hasn't the boy finished?", ["the English essay", "the maths", "his dinner"], 0, "Haven't finished the English essay yet.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp8-c8-l2-c1", voice("I've never used a VR headset, but I've played a lot of online games."), "Listen. What has he never done?", ["used a VR headset", "played online games", "used a phone"], 0, "Never used a VR headset."),
        pick("smp8-c8-l2-c2", "She ___ already sent the email.", ["has", "have", "is"], 0, "She → has."),
        pick("smp8-c8-l2-c3", "I've known my best friend ___ 2019.", ["since", "for", "ago"], 0, "Titik waktu → since."),
        fill("smp8-c8-l2-c4", "Complete: Have you ___ (see) the new film yet?", "Have you", "the new film yet?", ["seen"], "See → seen."),
        trPick("smp8-c8-l2-c5", "“Aku belum membalas pesannya.” in English is…", ["I haven't replied to her message yet.", "I didn't replied to her message yet.", "I haven't reply her message already."], 0, "Haven't + V3 + yet."),
        pick("smp8-c8-l2-c6", "Which sentence is correct?", ["I bought this phone last year.", "I have bought this phone last year.", "I have buy this phone last year."], 0, "Waktu spesifik → simple past.", { hots: true }),
      ],
    },
    {
      id: "smp8-c8-l3",
      skill: "reading",
      title: "Reading: Have You Ever Been Fooled Online?",
      summary: "Read about online safety and write an email of advice.",
      passages: [ONLINE],
      sections: [
        {
          title: "Staying safe online",
          blocks: [
            { type: "passage", passage: ONLINE },
            audio("Listen and read", say(["woman", ONLINE.lines.join(" ")])),
            vocab([["take over", "mengambil alih", "smartphone"], ["two-step verification", "verifikasi dua langkah", "signal"], ["claim", "mengklaim/mengambil", "trophy"], ["wisely", "dengan bijak", "owl-think"]], "Words from the text"),
          ],
        },
        {
          title: "Write an email",
          blocks: [
            tryIt(pick("smp8-c8-l3-try1", "What did the message say Tiara had won?", ["a new phone", "a laptop", "money"], 0, "Baris 2.", { passageId: ONLINE.id })),
            table(["Email part", "Example"], [["Subject", "Subject: Be careful with that link!"], ["Greeting", "Hi Raka, / Dear Mr. Budi,"], ["Opening", "I hope you're well. I've just read your message…"], ["Body", "advice, information, questions"], ["Closing", "Take care, / Best wishes, / Regards,"]]),
            writing({
              id: "smp8-c8-l3-write",
              title: "An email of advice",
              prompt: "Your younger cousin has just got a first smartphone and has already joined three social media apps. Write an email giving advice on how to use it safely and wisely. Use the present perfect at least three times.",
              image: "envelope",
              minWords: 120,
              maxWords: 220,
              tips: ["Subject: …", "Hi …, I've just heard that …", "Have you … yet?", "You should never … / Make sure you …", "Take care, …"],
              models: [{ label: "Example", text: "Subject: Your new phone – some tips from your big cousin\nHi Nadia,\nI've just heard from your mom that you've got your first smartphone. Congratulations! I'm sure you've already downloaded lots of apps.\nI want to share some tips because I've made some mistakes before. First, have you set a strong password yet? Use letters, numbers and symbols, and never tell anyone your password or OTP code. Second, don't accept friend requests from people you have never met. Third, think before you post. I've seen friends post photos with their school uniforms and home addresses. That's dangerous!\nFinally, don't forget to put your phone away at night. Sleep is more important than scrolling.\nIf you ever receive a strange message, ask me or your parents.\nTake care,\nKak Dimas" }],
              rubric: ["My email has a subject, greeting, body and closing.", "I gave at least three clear safety tips.", "I used the present perfect at least three times correctly.", "My tone is friendly and caring."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("smp8-c8-l3-c1", "What happened after Tiara typed her password?", ["Someone took over her account.", "She got a new phone.", "Her phone broke."], 0, "Baris 3.", { passageId: ONLINE.id }),
        pickMany("smp8-c8-l3-c2", "Choose ALL the things Tiara has done since then.", ["changed her passwords", "turned on two-step verification", "deleted the internet", "bought a new phone"], [0, 1], "Baris 4.", { passageId: ONLINE.id }),
        fill("smp8-c8-l3-c3", "Complete.", "If an offer looks too good to be", ", it probably is.", ["true"], "Baris 6.", { passageId: ONLINE.id }),
        pick("smp8-c8-l3-c4", "Why should you think before you post?", ["You can't fully delete it from the internet.", "Posting is expensive.", "Your phone will break."], 0, "Baris 7.", { passageId: ONLINE.id }),
        pick("smp8-c8-l3-c5", "The message to Tiara is an example of…", ["a scam", "an announcement", "a weather report"], 0, "Penipuan berhadiah.", { passageId: ONLINE.id, hots: true }),
        pick("smp8-c8-l3-c6", "Which line gives the main idea of the whole text?", ["line 8", "line 2", "line 3"], 0, "Gunakan internet dengan bijak dan aman.", { passageId: ONLINE.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp8-c8-post",
    title: "Chapter 8 Posttest",
    passPercent: 70,
    passages: [ONLINE],
    questions: [
      pick("smp8-c8-post1", "Have you ever ___ a fake message?", ["received", "receive", "receiving", "receives"], 0, "Have + V3."),
      listen("smp8-c8-post2", say(["man", "Have you finished the online quiz yet?"], ["woman", "Not yet. The Wi-Fi has been down since this morning."]), "Listen. Why hasn't she finished?", ["The Wi-Fi has been down.", "She forgot.", "The quiz was too hard.", "Her laptop is new."], 0, "The Wi-Fi has been down."),
      trPick("smp8-c8-post3", "“Aku baru saja mengunggah videonya.” in English is…", ["I've just uploaded the video.", "I just have uploaded the video yesterday.", "I've yet uploaded the video.", "I upload just the video."], 0, "Just = baru saja."),
      pick("smp8-c8-post4", "They have used this app ___ three years.", ["for", "since", "ago", "in"], 0, "Durasi → for."),
      arrange("smp8-c8-post5", "Put the words in order.", "I have never shared my password", "Have + never + V3."),
      pick("smp8-c8-post6", "According to the experts, who can you share your OTP code with?", ["nobody", "your friends", "your teacher", "the sender"], 0, "Baris 5: never … with anyone.", { passageId: ONLINE.id }),
      match("smp8-c8-post7", "Match the verb and the past participle.", [["write", "written"], ["take", "taken"], ["do", "done"], ["be", "been"]], "Past participle."),
      fill("smp8-c8-post8", "Complete: She ___ (not/reply) yet.", "She", "yet.", ["hasn't replied", "has not replied"], "She → hasn't + V3."),
      pick("smp8-c8-post9", "Why does the writer tell Tiara's story?", ["to show a real example of an online scam", "to make fun of Tiara", "to sell phones", "to explain Wi-Fi"], 0, "Contoh nyata.", { passageId: ONLINE.id, hots: true }),
      pick("smp8-c8-post10", "You receive: “Your bank account is blocked! Send your PIN now.” What is the BEST action?", ["Don't reply, and call the bank's official number to check.", "Send your PIN quickly.", "Forward it to all your friends.", "Click the link to see."], 0, "Verifikasi lewat kanal resmi.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Tech Talk",
    questions: [
      live("smp8-c8-live1", "see → past participle", ["seen", "saw", "seed", "seeing"], 0, "eye"),
      live("smp8-c8-live2", "since ___", ["2020", "two years", "a week", "ten minutes"], 0, "calendar"),
      live("smp8-c8-live3", "Never share your…", ["password", "smile", "homework", "lunch"], 0, "smartphone"),
      live("smp8-c8-live4", "“Penipuan” =", ["scam", "scan", "skim", "spam"], 0, "question", true),
      live("smp8-c8-live5", "Have you replied ___?", ["yet", "already", "since", "for"], 0, "chat"),
      live("smp8-c8-live6", "Put files on the internet:", ["upload", "download", "unload", "delete"], 0, "upload"),
      live("smp8-c8-live7", "She ___ been to Japan.", ["has", "have", "is", "did"], 0, "plane"),
      live("smp8-c8-live8", "Fake news =", ["hoax", "host", "hook", "hold"], 0, "report"),
    ],
  },
};
