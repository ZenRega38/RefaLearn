import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 8 (SMP, Fase D). Chapter 5 — Staying Healthy · Chapter 6 — Comparing Places

const SLEEP: Passage = {
  id: "smp8-c5-sleep",
  title: "Why Teenagers Need More Sleep",
  pic: "sleep",
  lines: [
    "Do you often feel sleepy in class? You are not alone. Many teenagers don't get enough sleep.",
    "Doctors say that people aged 13 to 18 need eight to ten hours of sleep every night.",
    "However, many students go to bed late because they play games, watch videos or chat on their phones.",
    "If you don't sleep enough, your brain can't concentrate well. You may also feel moody and get sick more easily.",
    "Here are some tips. First, you should go to bed and wake up at the same time every day, even on weekends.",
    "Second, you shouldn't use your phone for at least thirty minutes before bed. The blue light keeps your brain awake.",
    "Third, avoid drinks with caffeine, like coffee or energy drinks, in the afternoon and evening.",
    "Good sleep is not a waste of time. It helps you learn better, stay healthy and feel happier.",
  ],
};

export const CH5: Level = {
  id: "smp8-ch5",
  title: "Chapter 5 — Staying Healthy",
  description: "Talk about health problems, ask how someone feels, give advice with should, ought to and had better, use the zero conditional for health facts, and read and write health tips.",
  targetScore: "Speaking · Reading · Writing",
  cover: ["medicine", "thermometer", "basketball"],
  pretest: {
    id: "smp8-c5-pre",
    title: "Chapter 5 Pretest",
    passPercent: 0,
    questions: [
      pick("smp8-c5-pre1", "“I have a headache.” — “You ___ take a rest.”", ["should", "shouldn't", "mustn't", "don't"], 0, "Saran → should.", { image: "headache" }),
      listen("smp8-c5-pre2", voice("I've got a sore throat and a runny nose. I think I have a cold."), "Listen. What is wrong with her?", ["She has a cold.", "She has a stomachache.", "She broke her leg.", "She has toothache."], 0, "A cold = pilek."),
      trPick("smp8-c5-pre3", "“Demam” in English is…", ["fever", "flu shot", "feather", "favour"], 0, "Demam = fever."),
      pick("smp8-c5-pre4", "What's the matter? — My tooth hurts. I have…", ["a toothache", "a backache", "a fever", "a cough"], 0, "Sakit gigi.", { image: "toothache" }),
      pick("smp8-c5-pre5", "Which habit is healthy?", ["drinking enough water", "sleeping at 2 a.m.", "skipping breakfast", "eating fried snacks every day"], 0, "Cukup minum air."),
    ],
  },
  lessons: [
    {
      id: "smp8-c5-l1",
      skill: "vocabulary",
      title: "Health Problems and Remedies",
      summary: "Illnesses, symptoms and simple remedies.",
      sections: [
        {
          title: "What's the matter?",
          blocks: [
            vocab([
              ["headache", "sakit kepala", "headache"],
              ["toothache", "sakit gigi", "toothache"],
              ["stomachache", "sakit perut", "stomachache"],
              ["cough", "batuk", "cough"],
              ["fever / a high temperature", "demam", "thermometer"],
              ["a cold / the flu", "pilek / flu", "sick"],
            ], "Health problems"),
            table(["More symptoms", "Meaning"], [["a sore throat", "sakit tenggorokan"], ["a runny nose", "hidung meler"], ["dizzy", "pusing"], ["a sprained ankle", "pergelangan kaki terkilir"], ["a rash", "ruam/gatal"], ["a backache", "sakit punggung"], ["sore eyes", "mata perih"]]),
          ],
        },
        {
          title: "Remedies",
          blocks: [
            table(["Remedy", "Meaning"], [["take medicine", "minum obat"], ["get some rest", "istirahat"], ["drink warm water / ginger tea", "minum air hangat / wedang jahe"], ["see a doctor / a dentist", "periksa ke dokter / dokter gigi"], ["put ice on it", "kompres dengan es"], ["gargle with salt water", "berkumur dengan air garam"]]),
            pics([["medicine", "take medicine"], ["doctor", "see a doctor"], ["tea", "drink something warm"], ["bed", "get some rest"]]),
            tryIt(pick("smp8-c5-l1-try1", "You twisted your ankle playing football. What can you do first?", ["Put ice on it and rest.", "Eat chocolate.", "Run again."], 0, "Kompres es dan istirahat.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp8-c5-l1-c1", voice("I feel dizzy and my temperature is thirty-nine degrees."), "Listen. What problem does he have?", ["a fever", "a toothache", "a sprained ankle"], 0, "39 derajat = demam."),
        match("smp8-c5-l1-c2", "Match the problem and the picture.", [["pic:headache", "headache"], ["pic:cough", "cough"], ["pic:toothache", "toothache"], ["pic:stomachache", "stomachache"]], "Gejala penyakit."),
        trPick("smp8-c5-l1-c3", "“Sakit tenggorokan” in English is…", ["a sore throat", "a sore eye", "a throat ache"], 0, "A sore throat."),
        fill("smp8-c5-l1-c4", "Complete: You should see a ___ about your toothache.", "You should see a", "about your toothache.", ["dentist"], "Dokter gigi = dentist."),
        pick("smp8-c5-l1-c5", "What's good for a sore throat?", ["gargling with warm salt water", "eating ice cream", "shouting"], 0, "Berkumur air garam hangat."),
        pick("smp8-c5-l1-c6", "Your friend has a high fever for three days. What is the BEST advice?", ["You'd better see a doctor today.", "Just play outside.", "Drink coffee."], 0, "Demam tiga hari → ke dokter.", { hots: true }),
      ],
    },
    {
      id: "smp8-c5-l2",
      skill: "speaking",
      title: "Giving Advice and Showing Care",
      summary: "should, ought to, had better, why don't you…?; asking how someone feels.",
      sections: [
        {
          title: "Advice",
          blocks: [
            table(["Expression", "Strength", "Example"], [["Why don't you …?", "gentle suggestion", "Why don't you drink some ginger tea?"], ["You should / shouldn't …", "advice", "You should get some rest."], ["You ought to …", "advice (more formal)", "You ought to see a doctor."], ["You'd better (not) …", "strong advice, warning", "You'd better not go out in the rain."], ["If I were you, I would …", "polite advice", "If I were you, I would stay home."]]),
            warn("Setelah **should, ought to, had better**, pakai kata kerja **dasar**: *You'd better **go*** (bukan *to go*). Perhatikan: **ought to** memakai *to*."),
          ],
        },
        {
          title: "Showing care",
          blocks: [
            table(["Asking", "Responding"], [["What's the matter? / What's wrong?", "I have a terrible headache."], ["Are you okay? You look pale.", "I don't feel well."], ["How do you feel now?", "Much better, thanks."], ["I'm sorry to hear that.", "Thanks."], ["Get well soon!", "Thank you so much."]]),
            audio("At the school clinic", say(["woman", "You look pale, Dika. What's the matter?"], ["man", "I have a stomachache. I didn't have breakfast this morning, and I ate spicy noodles at break time."], ["woman", "I'm sorry to hear that. You'd better lie down for a while. And you should eat something plain, like bread."], ["man", "Should I call my mother?"], ["woman", "Yes, I think you ought to. And from now on, you shouldn't skip breakfast."])),
            tryIt(pick("smp8-c5-l2-try1", "Why does Dika have a stomachache?", ["He skipped breakfast and ate spicy noodles.", "He ate too much rice.", "He played football."], 0, "Tidak sarapan dan makan mi pedas.")),
            speaking({
              id: "smp8-c5-l2-say",
              title: "Role play: at the clinic",
              prompt: "Play both roles. First, as a friend or a school nurse, ask what's wrong and give at least three pieces of advice. Then, as the patient, describe your symptoms and respond politely.",
              image: "nurse",
              seconds: 75,
              tips: ["What's the matter? You look …", "I'm sorry to hear that.", "You should … / You'd better … / Why don't you …?", "Get well soon!"],
              models: [{ label: "Nurse", text: "Hi, Sarah. Come in. You look tired. What's the matter? … Oh, I'm sorry to hear that. A headache and a runny nose? You'd better rest here for a while. You should drink a lot of warm water. And why don't you wear a mask so your friends don't catch your cold? If you still feel bad after lunch, you ought to go home. Get well soon!" }, { label: "Patient", text: "Excuse me, Ma'am. I don't feel well. I have a headache and a runny nose, and I sneezed all morning. … Thank you, Ma'am. I'll drink some water and wear a mask. Can I call my father if it gets worse?" }],
              rubric: ["I asked about the problem politely.", "I gave at least three pieces of advice using different expressions.", "I showed sympathy (I'm sorry to hear that / Get well soon).", "The patient described symptoms clearly."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("smp8-c5-l2-c1", say(["man", "I've had a cough for a week."], ["woman", "You'd better see a doctor."]), "Listen. What does the woman advise?", ["seeing a doctor", "drinking coffee", "going swimming"], 0, "You'd better see a doctor."),
        pick("smp8-c5-l2-c2", "You'd better ___ an umbrella. It's going to rain.", ["take", "to take", "taking"], 0, "Had better + bentuk dasar."),
        fill("smp8-c5-l2-c3", "Complete: You ought ___ eat more vegetables.", "You ought", "eat more vegetables.", ["to"], "Ought to."),
        match("smp8-c5-l2-c4", "Match the problem and the advice.", [["I'm always tired.", "You should sleep earlier."], ["My eyes hurt.", "You shouldn't look at screens so long."], ["I'm so thirsty.", "Why don't you drink some water?"], ["I feel cold.", "You'd better wear a jacket."]], "Masalah dan saran."),
        trPick("smp8-c5-l2-c5", "“Kalau aku jadi kamu, aku akan istirahat.” in English is…", ["If I were you, I would rest.", "If I am you, I will rest.", "If I was you, I rest."], 0, "If I were you, I would …"),
        pick("smp8-c5-l2-c6", "Your friend says, “I failed my test and I feel terrible.” What is the most caring response?", ["I'm sorry to hear that. Why don't we study together next time?", "That's your problem.", "You'd better not tell anyone."], 0, "Empati + saran yang membantu.", { hots: true }),
      ],
    },
    {
      id: "smp8-c5-l3",
      skill: "reading",
      title: "Reading: Why Teenagers Need More Sleep",
      summary: "Read a health article, learn the zero conditional, and write health tips.",
      passages: [SLEEP],
      sections: [
        {
          title: "A health article",
          blocks: [
            { type: "passage", passage: SLEEP },
            audio("Listen and read", say(["woman", SLEEP.lines.join(" ")])),
            table(["Zero conditional (general facts)", "Example"], [["If + present, present", "If you don't sleep enough, your brain can't concentrate."], ["", "If you heat water to 100°C, it boils."], ["", "If you eat too much sugar, your teeth get damaged."]]),
          ],
        },
        {
          title: "Write health tips",
          blocks: [
            tryIt(pick("smp8-c5-l3-try1", "How many hours of sleep do teenagers need?", ["eight to ten", "five to six", "twelve"], 0, "Baris 2.", { passageId: SLEEP.id })),
            writing({
              id: "smp8-c5-l3-write",
              title: "Health tips for students",
              prompt: "Write a short article for the school magazine with tips about ONE health topic (healthy snacks, exercise, screen time, drinking water, stress before exams…). Explain the problem, give at least three tips and use one zero conditional sentence.",
              image: "basketball",
              minWords: 120,
              maxWords: 220,
              tips: ["Title: How to …", "Problem: Many students …", "Fact: If you …, …", "Tips: First, you should … Second, … Third, …", "Closing: …"],
              models: [{ label: "Example", text: "Drink More Water, Learn Better!\nMany students only drink a little water at school. They prefer sweet drinks or they simply forget. But our bodies are about 60% water. If you don't drink enough, you feel tired and you can't focus in class.\nHere are three easy tips. First, you should bring a refillable bottle to school every day. Put it on your desk, so you remember to drink. Second, you'd better choose plain water instead of sweet bottled tea. Sweet drinks contain a lot of sugar. Third, why don't you drink a glass of water before every break? It's a simple habit.\nDrinking water is cheap and easy, and it helps both your body and your brain. Start today!" }],
              rubric: ["My article has a title and explains the problem.", "I gave at least three tips with advice expressions.", "I used at least one zero conditional sentence.", "I used sequence words (first, second, third).", "My closing encourages readers."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("smp8-c5-l3-c1", "Why do many students go to bed late?", ["They use their phones and play games.", "They have too much homework.", "They are not tired."], 0, "Baris 3.", { passageId: SLEEP.id }),
        pick("smp8-c5-l3-c2", "Why shouldn't you use your phone before bed?", ["The blue light keeps your brain awake.", "It uses too much electricity.", "It is expensive."], 0, "Baris 6.", { passageId: SLEEP.id }),
        fill("smp8-c5-l3-c3", "Complete.", "avoid drinks with", ", like coffee or energy drinks.", ["caffeine"], "Baris 7.", { passageId: SLEEP.id }),
        pickMany("smp8-c5-l3-c4", "Choose ALL the effects of too little sleep.", ["poor concentration", "feeling moody", "getting sick more easily", "growing taller"], [0, 1, 2], "Baris 4.", { passageId: SLEEP.id }),
        pick("smp8-c5-l3-c5", "Which sentence in the text is a zero conditional?", ["line 4", "line 2", "line 8"], 0, "If you don't sleep enough, your brain can't…", { passageId: SLEEP.id, hots: true }),
        pick("smp8-c5-l3-c6", "Andi goes to bed at 11 p.m. and wakes up at 5 a.m. Based on the text, what should he do?", ["go to bed earlier to sleep at least eight hours", "drink energy drinks", "wake up at 4 a.m."], 0, "6 jam kurang dari 8–10 jam.", { passageId: SLEEP.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp8-c5-post",
    title: "Chapter 5 Posttest",
    passPercent: 70,
    passages: [SLEEP],
    questions: [
      pick("smp8-c5-post1", "You ___ eat so much candy. It's bad for your teeth.", ["shouldn't", "should", "ought", "had"], 0, "Larangan halus → shouldn't."),
      listen("smp8-c5-post2", say(["woman", "What's wrong, Bimo?"], ["man", "I hurt my back when I was carrying a box."], ["woman", "Oh no. You'd better not lift anything heavy for a few days."]), "Listen. What's Bimo's problem?", ["a backache", "a headache", "a fever", "a toothache"], 0, "I hurt my back."),
      trPick("smp8-c5-post3", "“Semoga cepat sembuh!” in English is…", ["Get well soon!", "Get up soon!", "Well done!", "Good luck!"], 0, "Get well soon."),
      pick("smp8-c5-post4", "If you ___ ice, it melts.", ["heat", "heats", "heated", "will heat"], 0, "Zero conditional: present + present."),
      arrange("smp8-c5-post5", "Put the words in order.", "Why don't you drink some ginger tea", "Saran lembut."),
      pick("smp8-c5-post6", "According to the text, what should you do on weekends?", ["wake up at the same time as on weekdays", "sleep until noon", "stay up late", "drink coffee"], 0, "Baris 5: even on weekends.", { passageId: SLEEP.id }),
      match("smp8-c5-post7", "Match the expression and its strength.", [["Why don't you …?", "gentle suggestion"], ["You should …", "advice"], ["You'd better …", "strong advice"]], "Tingkat saran."),
      fill("smp8-c5-post8", "Complete: I'm sorry to ___ that. (dengar)", "I'm sorry to", "that.", ["hear"], "I'm sorry to hear that.", { translate: true }),
      pick("smp8-c5-post9", "What is the writer's main purpose?", ["to persuade teenagers to sleep better", "to sell sleeping pills", "to describe a dream", "to tell a funny story"], 0, "Artikel kesehatan persuasif.", { passageId: SLEEP.id, hots: true }),
      pick("smp8-c5-post10", "“Good sleep is not a waste of time.” Why does the writer say this?", ["Some teens think sleeping is less important than other activities.", "Sleep is expensive.", "Doctors sleep a lot.", "Phones need sleep too."], 0, "Menanggapi anggapan keliru.", { passageId: SLEEP.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Healthy Heroes",
    questions: [
      live("smp8-c5-live1", "Tooth hurts:", ["toothache", "headache", "backache", "stomachache"], 0, "toothache"),
      live("smp8-c5-live2", "You'd better ___ a doctor.", ["see", "to see", "seeing", "saw"], 0, "doctor"),
      live("smp8-c5-live3", "“Demam” =", ["fever", "flavour", "forever", "fewer"], 0, "thermometer", true),
      live("smp8-c5-live4", "Teens need ___ hours of sleep.", ["8–10", "4–5", "2–3", "14–16"], 0, "sleep"),
      live("smp8-c5-live5", "Reply to bad news:", ["I'm sorry to hear that.", "Congratulations!", "Well done!", "So what?"], 0, "sad"),
      live("smp8-c5-live6", "You ought ___ rest.", ["to", "for", "-", "at"], 0, "bed"),
      live("smp8-c5-live7", "If you don't eat, you ___ hungry.", ["get", "got", "will got", "getting"], 0, "feel-hungry"),
      live("smp8-c5-live8", "Healthy drink:", ["water", "energy drink", "soda", "syrup"], 0, "water"),
    ],
  },
};

const CITIES: Passage = {
  id: "smp8-c6-cities",
  title: "Yogyakarta or Bali?",
  pic: "map",
  lines: [
    "Every year, millions of tourists visit Yogyakarta and Bali. Both places are amazing, but they are quite different.",
    "Bali is more famous internationally, and its beaches are more beautiful than the beaches near Yogyakarta.",
    "However, Bali is usually more crowded and more expensive, especially in popular areas like Kuta.",
    "Yogyakarta is cheaper than Bali. You can find a delicious plate of gudeg for less than twenty thousand rupiah.",
    "Yogyakarta has Borobudur nearby, the biggest Buddhist temple in the world, and Prambanan, one of the largest Hindu temples in Southeast Asia.",
    "Bali's culture is as rich as Yogyakarta's. You can watch the Kecak dance in Bali and the Ramayana ballet in Yogyakarta.",
    "Getting around Yogyakarta is easier because the city is smaller. Traffic in south Bali can be terrible.",
    "So, which one is better? If you love beaches and surfing, choose Bali. If you love history and student life, Yogyakarta is the best choice.",
  ],
};

export const CH6: Level = {
  id: "smp8-ch6",
  title: "Chapter 6 — Comparing Places",
  description: "Compare places and things with comparatives, superlatives, as … as and not as … as, ask for and give opinions, and write a comparison of two destinations.",
  targetScore: "Structure · Reading · Speaking",
  cover: ["beach", "museum", "map"],
  pretest: {
    id: "smp8-c6-pre",
    title: "Chapter 6 Pretest",
    passPercent: 0,
    questions: [
      pick("smp8-c6-pre1", "Jakarta is ___ than Bandung.", ["bigger", "big", "biggest", "more big"], 0, "Comparative → bigger."),
      listen("smp8-c6-pre2", voice("The train is not as fast as the plane, but it is cheaper."), "Listen. Which is faster?", ["the plane", "the train", "They are the same."], 0, "Not as fast as = kurang cepat dari."),
      trPick("smp8-c6-pre3", "“Sama mahalnya dengan” in English is…", ["as expensive as", "more expensive as", "expensive than", "the most expensive"], 0, "As … as."),
      pick("smp8-c6-pre4", "Puncak Jaya is the ___ mountain in Indonesia.", ["highest", "higher", "most high", "high"], 0, "Superlative → highest."),
      pick("smp8-c6-pre5", "Which word is the opposite of “crowded”?", ["quiet", "busy", "full", "noisy"], 0, "Sepi = quiet."),
    ],
  },
  lessons: [
    {
      id: "smp8-c6-l1",
      skill: "vocabulary",
      title: "Describing Places",
      summary: "Adjectives for cities, villages and tourist spots.",
      sections: [
        {
          title: "Adjectives for places",
          blocks: [
            table(["Adjective", "Opposite", "Meaning"], [["crowded", "quiet / peaceful", "ramai/padat ↔ sepi/damai"], ["modern", "traditional / historic", "modern ↔ tradisional/bersejarah"], ["expensive", "cheap / affordable", "mahal ↔ murah/terjangkau"], ["polluted", "clean", "tercemar ↔ bersih"], ["safe", "dangerous", "aman ↔ berbahaya"], ["lively", "boring / dull", "meriah ↔ membosankan"], ["accessible", "remote", "mudah dijangkau ↔ terpencil"]]),
            pics([["beach", "beautiful beaches"], ["mountain", "cool mountains"], ["museum", "historic buildings"], ["traffic", "crowded streets"]]),
          ],
        },
        {
          title: "Places in Indonesia",
          blocks: [
            vocab([["temple", "candi/pura", "museum"], ["beach", "pantai", "beach"], ["volcano", "gunung berapi", "mountain"], ["rice terrace", "sawah terasering", "leaf"], ["waterfall", "air terjun", "water"], ["traditional market", "pasar tradisional", "food-stall"]], "Tourist spots"),
            repeat(["Raja Ampat is remote but breathtaking.", "Bandung is cooler than Jakarta.", "The old town is historic and lively."]),
            tryIt(pick("smp8-c6-l1-try1", "A place that is far and difficult to reach is…", ["remote", "crowded", "modern"], 0, "Terpencil = remote.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp8-c6-l1-c1", voice("The village is very peaceful. There are no cars, only bicycles."), "Listen. What is the village like?", ["peaceful", "crowded", "polluted"], 0, "Peaceful = damai."),
        match("smp8-c6-l1-c2", "Match the opposites.", [["crowded", "quiet"], ["expensive", "cheap"], ["polluted", "clean"], ["modern", "historic"]], "Lawan kata."),
        trPick("smp8-c6-l1-c3", "“Air terjun” in English is…", ["waterfall", "waterfront", "watermelon"], 0, "Air terjun = waterfall."),
        fill("smp8-c6-l1-c4", "Complete: The market is very ___ . There are hundreds of people!", "The market is very", ". There are hundreds of people!", ["crowded", "busy"], "Ramai = crowded/busy."),
        pick("smp8-c6-l1-c5", "Which word describes a city with lots of fun events at night?", ["lively", "dull", "remote"], 0, "Meriah = lively."),
        pick("smp8-c6-l1-c6", "A city has heavy traffic and lots of smoke from factories. Which TWO words describe it best?", ["crowded and polluted", "quiet and clean", "remote and peaceful"], 0, "Macet dan polusi.", { hots: true }),
      ],
    },
    {
      id: "smp8-c6-l2",
      skill: "structure",
      title: "Comparatives, Superlatives and As … As",
      summary: "All the ways to compare: -er/more, -est/most, as … as, not as … as, less, much/a bit.",
      sections: [
        {
          title: "Review",
          blocks: [
            table(["Adjective", "Comparative", "Superlative"], [["cheap", "cheaper than", "the cheapest"], ["big", "bigger than", "the biggest"], ["busy", "busier than", "the busiest"], ["famous", "more famous than", "the most famous"], ["good", "better than", "the best"], ["bad", "worse than", "the worst"], ["far", "farther / further than", "the farthest / furthest"]]),
            text("Perkuat atau lunakkan perbandingan: **much / far** (jauh lebih), **a bit / a little** (sedikit lebih). *Bali is **much** more crowded. Bandung is **a bit** cooler.*"),
          ],
        },
        {
          title: "Equal and not equal",
          blocks: [
            table(["Pattern", "Meaning", "Example"], [["as + adj + as", "sama …nya", "Bali's culture is as rich as Yogyakarta's."], ["not as + adj + as", "tidak se…", "The train is not as fast as the plane."], ["less + adj + than", "kurang … dibanding", "Yogyakarta is less crowded than Bali."], ["the same as", "sama dengan", "My phone is the same as yours."], ["different from", "berbeda dari", "Lombok is different from Bali."]]),
            examples([{ wrong: "Bali is more crowded as Yogyakarta.", right: "Bali is more crowded than Yogyakarta." }, { wrong: "My house is as big than yours.", right: "My house is as big as yours." }, { wrong: "It is the most cheapest hotel.", right: "It is the cheapest hotel." }]),
            tryIt(pick("smp8-c6-l2-try1", "Surabaya is not ___ cool as Malang.", ["as", "so much", "than"], 0, "Not as … as.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp8-c6-l2-c1", voice("Lombok is less crowded than Bali, and its beaches are just as beautiful."), "Listen. What is true about Lombok?", ["It is less crowded than Bali.", "It is more crowded than Bali.", "Its beaches are uglier."], 0, "Less crowded."),
        pick("smp8-c6-l2-c2", "This is ___ restaurant in town. Everyone loves it.", ["the best", "the better", "the goodest"], 0, "Superlative → the best."),
        fill("smp8-c6-l2-c3", "Complete: My bag is as heavy ___ yours.", "My bag is as heavy", "yours.", ["as"], "As … as."),
        arrange("smp8-c6-l2-c4", "Put the words in order.", "Bandung is much cooler than Jakarta", "Much + comparative."),
        trPick("smp8-c6-l2-c5", "“Kota ini sedikit lebih mahal.” in English is…", ["This city is a bit more expensive.", "This city is a bit most expensive.", "This city is more a bit expensive."], 0, "A bit + comparative."),
        pick("smp8-c6-l2-c6", "Ticket A costs Rp200,000. Ticket B costs Rp200,000. Which sentence is correct?", ["Ticket A is as expensive as ticket B.", "Ticket A is more expensive than ticket B.", "Ticket A is the most expensive."], 0, "Harga sama → as … as.", { hots: true }),
      ],
    },
    {
      id: "smp8-c6-l3",
      skill: "reading",
      title: "Reading: Yogyakarta or Bali?",
      summary: "Read a comparison of two destinations, give your opinion and write a comparison.",
      passages: [CITIES],
      sections: [
        {
          title: "Two famous destinations",
          blocks: [
            { type: "passage", passage: CITIES },
            audio("Listen and read", say(["man", CITIES.lines.join(" ")])),
            table(["Asking for opinions", "Giving opinions", "Agreeing / disagreeing"], [["What do you think about …?", "I think … / In my opinion, …", "I agree with you."], ["Which one do you prefer?", "I prefer … because …", "That's true, but …"], ["How do you feel about …?", "Personally, I believe …", "I'm not sure about that."]]),
          ],
        },
        {
          title: "Your comparison",
          blocks: [
            tryIt(pick("smp8-c6-l3-try1", "Which place is cheaper, according to the text?", ["Yogyakarta", "Bali", "Both are the same."], 0, "Baris 4.", { passageId: CITIES.id })),
            speaking({
              id: "smp8-c6-l3-say",
              title: "Which would you choose?",
              prompt: "Compare two places you know (two cities, two beaches, a village and a city…). Give your opinion about which is better for a holiday or for living, and why.",
              image: "map",
              seconds: 90,
              tips: ["Both … and … are …", "… is more … than …, but …", "… is not as … as …", "Personally, I prefer … because …"],
              models: [{ label: "Example", text: "Both Malang and Surabaya are in East Java, but they are very different. Surabaya is bigger and more modern than Malang. It has huge shopping malls and a busy port. However, it's much hotter and more crowded. Malang is not as big as Surabaya, but it is cooler and greener, because it is surrounded by mountains. Food in Malang is also a bit cheaper. Personally, I prefer Malang for a holiday because I love the fresh air and the apple farms in Batu." }],
              rubric: ["I used comparatives correctly.", "I used as … as or not as … as.", "I used a superlative.", "I gave my opinion with a reason."],
            }),
            writing({
              id: "smp8-c6-l3-write",
              title: "Compare two destinations",
              prompt: "Write a comparison of two tourist destinations in Indonesia for a travel blog. Compare price, attractions, crowds and transport, then recommend one for a specific type of traveller.",
              image: "beach",
              minWords: 120,
              maxWords: 230,
              tips: ["Introduction: … and … are both …", "Similarities: … is as … as …", "Differences: … is …er / more … than …", "Recommendation: If you love …, choose …"],
              models: [{ label: "Example", text: "Raja Ampat and Bunaken are two of the best diving spots in Indonesia. Both have clear water, colourful coral reefs and friendly local people.\nHowever, they are different in several ways. Raja Ampat, in West Papua, has more species of coral and fish than any other place on Earth. It is also more remote. You need to fly to Sorong and then take a boat for two hours. Because of this, it is much more expensive than Bunaken.\nBunaken, in North Sulawesi, is easier to reach. It is only a forty-five-minute boat ride from Manado. It is not as spectacular as Raja Ampat, but it is cheaper and great for beginners.\nIf you are an experienced diver with a big budget, choose Raja Ampat. If you are a student or a beginner, Bunaken is the best choice." }],
              rubric: ["I introduced both places.", "I wrote similarities and differences.", "I used comparatives, superlatives and as … as correctly.", "I gave a clear recommendation."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("smp8-c6-l3-c1", "Which place has more beautiful beaches?", ["Bali", "Yogyakarta", "They are equally beautiful."], 0, "Baris 2.", { passageId: CITIES.id }),
        pick("smp8-c6-l3-c2", "Why is getting around Yogyakarta easier?", ["The city is smaller.", "There are more buses.", "It has an airport."], 0, "Baris 7.", { passageId: CITIES.id }),
        fill("smp8-c6-l3-c3", "Complete.", "Bali's culture is as rich as", ".", ["Yogyakarta's", "Yogyakarta"], "Baris 6.", { passageId: CITIES.id }),
        pickMany("smp8-c6-l3-c4", "Choose ALL the disadvantages of Bali mentioned in the text.", ["more crowded", "more expensive", "terrible traffic in the south", "no culture"], [0, 1, 2], "Baris 3 dan 7.", { passageId: CITIES.id }),
        pick("smp8-c6-l3-c5", "Lina is a university student who loves museums and temples, and she has a small budget. Which place is better for her?", ["Yogyakarta", "Bali", "Neither"], 0, "Murah dan kaya sejarah.", { passageId: CITIES.id, hots: true }),
        pick("smp8-c6-l3-c6", "Is the writer biased toward one place?", ["No, the writer shows advantages of both and recommends based on interests.", "Yes, the writer hates Bali.", "Yes, the writer only talks about Yogyakarta."], 0, "Seimbang.", { passageId: CITIES.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp8-c6-post",
    title: "Chapter 6 Posttest",
    passPercent: 70,
    passages: [CITIES],
    questions: [
      pick("smp8-c6-post1", "Our village is ___ than the city at night.", ["safer", "more safe", "safest", "the safer"], 0, "Safe → safer."),
      listen("smp8-c6-post2", voice("This hotel is the cheapest in town, but it's also the noisiest."), "Listen. What is the problem with the hotel?", ["It is very noisy.", "It is too expensive.", "It is far from town.", "It is dirty."], 0, "The noisiest."),
      trPick("smp8-c6-post3", "“Kurang ramai dibanding” in English is…", ["less crowded than", "more crowded than", "as crowded as", "the least crowded"], 0, "Less … than."),
      pick("smp8-c6-post4", "My brother is not as tall ___ my father.", ["as", "than", "so", "like"], 0, "Not as … as."),
      arrange("smp8-c6-post5", "Put the words in order.", "This is the most beautiful beach in Lombok", "The most + adjective."),
      pick("smp8-c6-post6", "Where can you watch the Ramayana ballet?", ["in Yogyakarta", "in Bali", "in Kuta", "in Jakarta"], 0, "Baris 6.", { passageId: CITIES.id }),
      match("smp8-c6-post7", "Match the adjective and the superlative.", [["busy", "the busiest"], ["bad", "the worst"], ["popular", "the most popular"], ["far", "the farthest"]], "Superlatif."),
      fill("smp8-c6-post8", "Complete: Bali is ___ more crowded than Lombok. (jauh)", "Bali is", "more crowded than Lombok.", ["much", "far"], "Jauh lebih = much/far.", { translate: true }),
      pick("smp8-c6-post9", "What is the function of line 8?", ["to give a recommendation based on interests", "to describe gudeg", "to compare prices", "to tell a story"], 0, "Rekomendasi.", { passageId: CITIES.id, hots: true }),
      pick("smp8-c6-post10", "Which statement is an opinion from the text, NOT a fact?", ["Bali's beaches are more beautiful than the beaches near Yogyakarta.", "Borobudur is near Yogyakarta.", "You can watch the Kecak dance in Bali.", "Millions of tourists visit both places."], 0, "'More beautiful' adalah penilaian.", { passageId: CITIES.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Compare and Win",
    questions: [
      live("smp8-c6-live1", "cheap → …", ["cheaper", "more cheap", "cheapper", "cheapest"], 0, "money"),
      live("smp8-c6-live2", "as tall ___ me", ["as", "than", "like", "so"], 0, "boy"),
      live("smp8-c6-live3", "bad → the …", ["worst", "baddest", "worse", "most bad"], 0, "sad"),
      live("smp8-c6-live4", "“Terpencil” =", ["remote", "crowded", "modern", "lively"], 0, "island", true),
      live("smp8-c6-live5", "Borobudur is near…", ["Yogyakarta", "Bali", "Medan", "Makassar"], 0, "museum"),
      live("smp8-c6-live6", "Opposite of polluted:", ["clean", "busy", "noisy", "old"], 0, "earth"),
      live("smp8-c6-live7", "much ___ than", ["bigger", "big", "biggest", "more big"], 0, "elephant"),
      live("smp8-c6-live8", "Kecak dance is from…", ["Bali", "Aceh", "Papua", "Riau"], 0, "beach"),
    ],
  },
};
