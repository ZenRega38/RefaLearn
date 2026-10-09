import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, voice, warn, writing } from "../kit";

// Grade 9 (SMP, Fase D). Chapter 5 — Labels and Advertisements · Chapter 6 — Songs and Poems

const LABEL: Passage = {
  id: "smp9-c5-label",
  title: "Label: FeverAway Syrup for Children",
  pic: "medicine",
  lines: [
    "FeverAway Paracetamol Syrup 120 mg / 5 ml — 60 ml",
    "Indications: To reduce fever and relieve mild to moderate pain, such as headache and toothache.",
    "Dosage: Children 1–2 years: 2.5 ml. Children 2–6 years: 5 ml. Children 6–12 years: 10 ml. Take 3–4 times a day, with at least 4 hours between doses.",
    "Shake well before use. Use the measuring cup provided.",
    "Warnings: Do not exceed the recommended dose. Consult a doctor if the fever lasts more than 3 days.",
    "Not suitable for children with serious liver problems.",
    "Storage: Store below 30°C. Keep out of reach of children. Do not use after the expiry date.",
    "Expiry date: 12/2027   Batch No.: FA2210",
  ],
};

export const CH5: Level = {
  id: "smp9-ch5",
  title: "Chapter 5 — Labels and Advertisements",
  description: "Read product labels for food and medicine, understand dosage, warnings and expiry dates, analyse the persuasive language of advertisements, and create an advertisement.",
  targetScore: "Reading · Vocabulary · Writing",
  cover: ["medicine", "supermarket", "money"],
  pretest: {
    id: "smp9-c5-pre",
    title: "Chapter 5 Pretest",
    passPercent: 0,
    questions: [
      pick("smp9-c5-pre1", "“Best before 05/2026” tells you…", ["the date until the food is at its best quality", "the date the food was made", "the price", "the weight"], 0, "Best before = baik digunakan sebelum."),
      listen("smp9-c5-pre2", voice("Take one tablet three times a day after meals."), "Listen. When should you take the tablet?", ["after meals", "before sleeping", "before meals", "only in the morning"], 0, "After meals."),
      trPick("smp9-c5-pre3", "“Komposisi” (on a food label) in English is…", ["ingredients", "instructions", "indications", "inventions"], 0, "Ingredients."),
      pick("smp9-c5-pre4", "“Keep out of reach of children” means…", ["Put it where children can't get it.", "Give it to children.", "Children can keep it.", "Children must use it."], 0, "Jauhkan dari jangkauan anak."),
      pick("smp9-c5-pre5", "The main purpose of an advertisement is to…", ["persuade people to buy or do something", "tell a story", "give news", "explain science"], 0, "Iklan membujuk."),
    ],
  },
  lessons: [
    {
      id: "smp9-c5-l1",
      skill: "vocabulary",
      title: "Reading Labels",
      summary: "Food and medicine labels: ingredients, nutrition facts, dosage, warnings, storage, expiry.",
      sections: [
        {
          title: "Food labels",
          blocks: [
            table(["Label word", "Meaning"], [["ingredients", "komposisi/bahan"], ["nutrition facts", "informasi nilai gizi"], ["serving size", "takaran saji"], ["net weight / net volume", "berat bersih / isi bersih"], ["contains / may contain", "mengandung / mungkin mengandung"], ["best before / use by", "baik digunakan sebelum / gunakan sebelum"], ["halal certified", "bersertifikat halal"], ["store in a cool, dry place", "simpan di tempat sejuk dan kering"]]),
            pics([["milk", "nutrition facts"], ["calendar", "expiry date"], ["receipt", "price"], ["thumbs-up", "halal certified"]]),
          ],
        },
        {
          title: "Medicine labels",
          blocks: [
            table(["Label word", "Meaning"], [["indications", "kegunaan/indikasi"], ["dosage", "dosis/aturan pakai"], ["side effects", "efek samping"], ["contraindications", "kontraindikasi (tidak boleh dipakai jika…)"], ["exceed", "melebihi"], ["consult a doctor", "konsultasikan ke dokter"], ["expiry date (EXP)", "tanggal kedaluwarsa"]]),
            warn("Selalu baca **dosis sesuai usia** dan **tanggal kedaluwarsa**. Obat yang kedaluwarsa bisa berbahaya."),
            tryIt(pick("smp9-c5-l1-try1", "Which part of a medicine label tells you what it is for?", ["indications", "storage", "batch number"], 0, "Indikasi = kegunaan.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp9-c5-l1-c1", voice("This product may contain peanuts."), "Listen. Who should be careful?", ["people with a peanut allergy", "people who like sugar", "children over twelve"], 0, "May contain peanuts → alergi kacang."),
        match("smp9-c5-l1-c2", "Match the label word and the meaning.", [["ingredients", "komposisi"], ["dosage", "aturan pakai"], ["side effects", "efek samping"], ["net weight", "berat bersih"]], "Kosakata label.", { translate: true }),
        trPick("smp9-c5-l1-c3", "“Simpan di tempat sejuk dan kering” in English is…", ["Store in a cool, dry place.", "Keep in a cold, wet place.", "Store it in the sun."], 0, "Cool, dry place."),
        fill("smp9-c5-l1-c4", "Complete: Do not ___ the recommended dose. (melebihi)", "Do not", "the recommended dose.", ["exceed"], "Exceed = melebihi.", { translate: true }),
        pick("smp9-c5-l1-c5", "A biscuit packet says “EXP 03/2024”. Today is in 2025. What should you do?", ["Don't eat it.", "Eat it quickly.", "Give it to a child."], 0, "Sudah kedaluwarsa."),
        pick("smp9-c5-l1-c6", "Two cereals cost the same. Cereal A has 5 g of sugar per serving; Cereal B has 15 g. Which is healthier for breakfast?", ["Cereal A", "Cereal B", "They are exactly the same."], 0, "Gula lebih sedikit.", { hots: true }),
      ],
    },
    {
      id: "smp9-c5-l2",
      skill: "reading",
      title: "Reading: A Medicine Label",
      summary: "Finding detailed information quickly (scanning) and using it safely.",
      passages: [LABEL],
      sections: [
        {
          title: "The label",
          blocks: [
            { type: "passage", passage: LABEL },
            tip("**Scanning**: saat mencari informasi spesifik (dosis, tanggal), jangan baca semua kata. Cari **kata kunci** seperti *Dosage*, *Warnings*, *Expiry*."),
          ],
        },
        {
          title: "Using it safely",
          blocks: [
            audio("At the pharmacy", say(["woman", "Good afternoon. My son has a fever. He's four years old."], ["man", "You can give him this syrup. For children between two and six, the dose is five millilitres."], ["woman", "How often?"], ["man", "Three or four times a day, but wait at least four hours between doses. If the fever lasts more than three days, please see a doctor."])),
            tryIt(pick("smp9-c5-l2-try1", "How much syrup should the four-year-old take each time?", ["5 ml", "2.5 ml", "10 ml"], 0, "Baris 3: 2–6 years → 5 ml.", { passageId: LABEL.id })),
          ],
        },
      ],
      checkpoint: [
        pick("smp9-c5-l2-c1", "What is the syrup for?", ["reducing fever and relieving mild pain", "curing coughs", "stopping allergies"], 0, "Baris 2.", { passageId: LABEL.id }),
        pick("smp9-c5-l2-c2", "How much should a 9-year-old take each time?", ["10 ml", "5 ml", "2.5 ml"], 0, "Baris 3: 6–12 years.", { passageId: LABEL.id }),
        fill("smp9-c5-l2-c3", "Complete.", "Shake well before use. Use the measuring", "provided.", ["cup"], "Baris 4.", { passageId: LABEL.id }),
        pickMany("smp9-c5-l2-c4", "Choose ALL the storage instructions.", ["Store below 30°C.", "Keep out of reach of children.", "Do not use after the expiry date.", "Store in the freezer."], [0, 1, 2], "Baris 7.", { passageId: LABEL.id }),
        pick("smp9-c5-l2-c5", "A child took a dose at 8 a.m. When is the EARLIEST time for the next dose?", ["12 p.m.", "9 a.m.", "10 a.m."], 0, "Minimal 4 jam.", { passageId: LABEL.id, hots: true }),
        pick("smp9-c5-l2-c6", "Who should NOT use this syrup?", ["a child with serious liver problems", "a child with a toothache", "a 5-year-old with a fever"], 0, "Baris 6.", { passageId: LABEL.id, hots: true }),
      ],
    },
    {
      id: "smp9-c5-l3",
      skill: "writing",
      title: "The Language of Advertising",
      summary: "Persuasive techniques in advertisements and creating your own ad.",
      sections: [
        {
          title: "How ads persuade",
          blocks: [
            table(["Technique", "Example"], [["Catchy slogan", "“Fresh from nature, straight to you!”"], ["Strong adjectives", "delicious, amazing, healthy, brand-new, eco-friendly"], ["Superlatives", "the best, the softest, the most comfortable"], ["Imperatives", "Buy now! Try it today! Don't miss it!"], ["Special offers", "Buy 1 get 1 free! 50% off! Limited time only!"], ["Questions to the reader", "Tired of slow internet?"], ["Testimonials / experts", "“Recommended by dentists.”"]]),
            examples([{ right: "Tired of plastic bottles? Try EcoSip — the stainless steel bottle that keeps your drink cold for 24 hours! Light, strong and 100% leak-proof. Only Rp89,000. Order now and get a free cleaning brush!" }], "A sample advertisement"),
            text("Pembaca yang kritis memeriksa: **Apakah klaimnya bisa dibuktikan? Apa yang tidak disebutkan?** (misalnya biaya tambahan atau syarat promo)."),
          ],
        },
        {
          title: "Create an ad",
          blocks: [
            tryIt(pick("smp9-c5-l3-try1", "Which persuasive technique is “Tired of plastic bottles?”", ["a question to the reader", "a testimonial", "a superlative"], 0, "Pertanyaan kepada pembaca.")),
            writing({
              id: "smp9-c5-l3-write",
              title: "My advertisement",
              prompt: "Create a print or social media advertisement for a real or imaginary product from your area (e.g. a snack, a homestay, an eco-friendly product, a school event). Use at least four persuasive techniques.",
              image: "souvenir",
              minWords: 60,
              maxWords: 140,
              tips: ["Headline / question: Tired of …? / Looking for …?", "Product name + slogan", "Features: strong adjectives, superlatives", "Offer: … only Rp…, free …", "Call to action + contact"],
              models: [{ label: "Example", text: "Craving something crunchy?\nKRIPIK KAWAN — Banyuwangi's Crispiest Cassava Chips!\nMade from fresh local cassava and real chili, with no preservatives.\n3 flavours: Original, Super Spicy and Sweet Balado.\n“The best snack for movie night!” – Dina, Grade 9\nOnly Rp12,000 per pack. Buy 3, get 1 FREE this month!\nOrder now: DM @kripikkawan or visit our stall at Pasar Blambangan.\nKripik Kawan — crunchy friends forever!" }],
              rubric: ["My ad has a catchy headline or slogan.", "I used strong adjectives and a superlative.", "I included an offer and a call to action.", "I gave contact or location details.", "My ad is short and clear."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("smp9-c5-l3-c1", voice("Hurry! This offer ends on Sunday. Buy one, get one free!"), "Listen. When does the offer end?", ["on Sunday", "next month", "today"], 0, "Ends on Sunday."),
        pick("smp9-c5-l3-c2", "Which is a slogan?", ["Fresh from nature, straight to you!", "Store below 30°C.", "Net weight 250 g."], 0, "Slogan = kalimat pendek yang mudah diingat."),
        match("smp9-c5-l3-c3", "Match the technique and the example.", [["imperative", "Buy now!"], ["special offer", "50% off!"], ["testimonial", "“I love it!” – Rina"], ["superlative", "the softest towel"]], "Teknik iklan."),
        arrange("smp9-c5-l3-c4", "Put the words in order.", "Order now and get a free gift", "Call to action."),
        trPick("smp9-c5-l3-c5", "“Persediaan terbatas!” in English is…", ["Limited stock!", "Unlimited stock!", "Stock limit is good!"], 0, "Limited stock."),
        pick("smp9-c5-l3-c6", "An ad says, “Lose 10 kg in 3 days with our tea!” What should a critical reader think?", ["The claim is probably unrealistic and needs proof.", "It must be true because it's in an ad.", "Tea always makes people thin."], 0, "Klaim berlebihan perlu dibuktikan.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp9-c5-post",
    title: "Chapter 5 Posttest",
    passPercent: 70,
    passages: [LABEL],
    questions: [
      pick("smp9-c5-post1", "“Contains milk and soy” is information for people with…", ["allergies", "headaches", "toothaches", "money problems"], 0, "Informasi alergen."),
      listen("smp9-c5-post2", voice("Tired of waking up late? The SmartRooster alarm wakes you up with the smell of coffee. Only this week, thirty percent off!"), "Listen. What is special about the alarm?", ["It wakes you up with the smell of coffee.", "It makes coffee.", "It is free.", "It sings."], 0, "With the smell of coffee."),
      trPick("smp9-c5-post3", "“Efek samping” in English is…", ["side effects", "side affects", "effect sides", "inside effects"], 0, "Side effects."),
      pick("smp9-c5-post4", "Which phrase is an imperative in an ad?", ["Try it today!", "It is delicious.", "Made in Bali.", "Net weight 100 g."], 0, "Kalimat perintah."),
      arrange("smp9-c5-post5", "Put the words in order.", "Keep out of reach of children", "Peringatan label."),
      pick("smp9-c5-post6", "When should you see a doctor, according to the label?", ["if the fever lasts more than 3 days", "after one dose", "before using it", "if the child likes it"], 0, "Baris 5.", { passageId: LABEL.id }),
      match("smp9-c5-post7", "Match the label section and the information.", [["Indications", "what it is for"], ["Dosage", "how much to take"], ["Storage", "where to keep it"], ["Expiry date", "when it is no longer safe"]], "Bagian label."),
      fill("smp9-c5-post8", "Complete.", "Take 3–4 times a day, with at least", "hours between doses.", ["4", "four"], "Baris 3.", { passageId: LABEL.id }),
      pick("smp9-c5-post9", "Why is the batch number printed on the label?", ["to identify when and where it was made, in case of problems", "to show the price", "to show the dose", "for decoration"], 0, "Nomor produksi untuk pelacakan.", { passageId: LABEL.id, hots: true }),
      pick("smp9-c5-post10", "A mother gives her 1-year-old 10 ml. What is the problem?", ["She has exceeded the dose; it should be 2.5 ml.", "It is too little.", "There is no problem.", "She should give 20 ml."], 0, "Dosis 1–2 tahun = 2.5 ml.", { passageId: LABEL.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Read the Label",
    questions: [
      live("smp9-c5-live1", "EXP means…", ["expiry date", "export", "expensive", "experiment"], 0, "calendar"),
      live("smp9-c5-live2", "How much to take:", ["dosage", "storage", "slogan", "batch"], 0, "medicine"),
      live("smp9-c5-live3", "“Komposisi” =", ["ingredients", "indications", "instructions", "inventions"], 0, "milk", true),
      live("smp9-c5-live4", "Ad technique: “Buy 1 get 1!”", ["special offer", "warning", "dosage", "testimonial"], 0, "money"),
      live("smp9-c5-live5", "Keep medicine out of reach of…", ["children", "doctors", "adults", "pharmacists"], 0, "baby"),
      live("smp9-c5-live6", "Ads mainly want to…", ["persuade", "warn", "describe history", "report news"], 0, "thumbs-up"),
      live("smp9-c5-live7", "Store in a cool, ___ place.", ["dry", "wet", "hot", "sunny"], 0, "hot"),
      live("smp9-c5-live8", "Do not ___ the dose.", ["exceed", "excite", "except", "expect"], 0, "thermometer"),
    ],
  },
};

const POEM: Passage = {
  id: "smp9-c6-poem",
  title: "My Island Home (a poem)",
  pic: "island",
  lines: [
    "The morning sun is a golden coin,",
    "it rolls across the sea,",
    "the coconut trees wave their hands",
    "and whisper songs to me.",
    "My mother's voice is warm as rice,",
    "my father's hands are stone,",
    "and every wave that hits the shore",
    "is calling me back home.",
  ],
};

export const CH6: Level = {
  id: "smp9-ch6",
  title: "Chapter 6 — Songs and Poems",
  description: "Enjoy English songs and poems, identify rhyme, rhythm and figurative language (simile, metaphor, personification), interpret meaning and write a short poem.",
  targetScore: "Listening · Reading · Writing",
  cover: ["microphone", "guitar", "island"],
  pretest: {
    id: "smp9-c6-pre",
    title: "Chapter 6 Pretest",
    passPercent: 0,
    questions: [
      pick("smp9-c6-pre1", "Which pair of words rhymes?", ["sea – me", "sun – moon", "home – house", "rice – stone"], 0, "Bunyi akhir sama: /iː/."),
      listen("smp9-c6-pre2", voice("Twinkle, twinkle, little star, how I wonder what you are."), "Listen. Which word rhymes with “star”?", ["are", "wonder", "little", "how"], 0, "Star – are."),
      trPick("smp9-c6-pre3", "“Bait” (in a poem) in English is…", ["stanza / verse", "chorus line", "title", "rhyme word"], 0, "Bait = stanza/verse."),
      pick("smp9-c6-pre4", "“She is as brave as a lion.” This is a…", ["simile", "metaphor", "question", "fact"], 0, "Perbandingan dengan as/like = simile."),
      pick("smp9-c6-pre5", "The part of a song that is repeated many times is the…", ["chorus", "verse", "bridge", "intro"], 0, "Reff = chorus."),
    ],
  },
  lessons: [
    {
      id: "smp9-c6-l1",
      skill: "reading",
      title: "Figurative Language",
      summary: "Similes, metaphors, personification and hyperbole.",
      sections: [
        {
          title: "Four figures of speech",
          blocks: [
            table(["Figure", "How it works", "Example"], [["Simile", "compares using like or as", "Her smile is like sunshine. He's as busy as a bee."], ["Metaphor", "says one thing IS another", "The classroom was a zoo. Time is money."], ["Personification", "gives human actions to things", "The wind whispered. The trees danced."], ["Hyperbole", "huge exaggeration", "I've told you a million times! I'm so hungry I could eat a horse."]]),
            pics([["happy", "like sunshine"], ["windy", "the wind whispered"], ["clock", "time is money"], ["feel-hungry", "I could eat a horse"]]),
          ],
        },
        {
          title: "Why poets use them",
          blocks: [
            text("Bahasa kiasan membuat tulisan lebih **hidup** dan membantu pembaca **merasakan dan membayangkan**. *The sun was hot* biasa saja; *The sun was a fire on our backs* lebih kuat."),
            repeat(["as cold as ice", "as light as a feather", "as quiet as a mouse", "as strong as an ox"]),
            tryIt(pick("smp9-c6-l1-try1", "“The leaves danced in the wind.” This is…", ["personification", "simile", "hyperbole"], 0, "Daun 'menari' seperti manusia.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp9-c6-l1-c1", voice("My backpack weighs a ton!"), "Listen. What figure of speech is this?", ["hyperbole", "simile", "personification"], 0, "Berlebihan = hyperbole."),
        match("smp9-c6-l1-c2", "Match the example and the figure.", [["as busy as a bee", "simile"], ["Life is a journey.", "metaphor"], ["The car coughed and stopped.", "personification"], ["I waited forever.", "hyperbole"]], "Bahasa kiasan."),
        pick("smp9-c6-l1-c3", "Complete the simile: as light as a ___", ["feather", "rock", "car"], 0, "Ringan seperti bulu."),
        fill("smp9-c6-l1-c4", "Complete the simile: She swims ___ a fish.", "She swims", "a fish.", ["like"], "Simile dengan like."),
        trPick("smp9-c6-l1-c5", "“Waktu adalah uang.” in English is…", ["Time is money.", "Time like money.", "Time as money as."], 0, "Metafora."),
        pick("smp9-c6-l1-c6", "“The classroom was a zoo.” What does the writer mean?", ["The classroom was very noisy and chaotic.", "There were animals in the classroom.", "The class visited a zoo."], 0, "Metafora untuk suasana kacau.", { hots: true }),
      ],
    },
    {
      id: "smp9-c6-l2",
      skill: "reading",
      title: "Reading: My Island Home",
      summary: "Reading a poem closely: rhyme, imagery and feelings.",
      passages: [POEM],
      sections: [
        {
          title: "The poem",
          blocks: [
            { type: "passage", passage: POEM },
            audio("Listen to the poem", say(["woman", POEM.lines.join(" ")])),
            table(["Poetry term", "Meaning"], [["line", "baris"], ["stanza", "bait"], ["rhyme", "persamaan bunyi akhir (sea / me)"], ["rhythm", "irama, ketukan"], ["imagery", "citraan: kata yang membuat kita melihat, mendengar, merasakan"], ["speaker", "“aku” dalam puisi"]]),
          ],
        },
        {
          title: "Close reading",
          blocks: [
            tip("Saat membaca puisi, tanyakan: **Apa yang dilihat/didengar/dirasakan?** **Kiasan apa yang dipakai?** **Bagaimana perasaan si 'aku'?**"),
            tryIt(pick("smp9-c6-l2-try1", "What is the morning sun compared to?", ["a golden coin", "a ball of fire", "a lamp"], 0, "Baris 1: metafora.", { passageId: POEM.id })),
          ],
        },
      ],
      checkpoint: [
        pick("smp9-c6-l2-c1", "Which word rhymes with “sea” (line 2)?", ["me (line 4)", "hands (line 3)", "rice (line 5)"], 0, "Sea – me.", { passageId: POEM.id }),
        pick("smp9-c6-l2-c2", "“The coconut trees wave their hands.” This is…", ["personification", "simile", "hyperbole"], 0, "Pohon melambai seperti manusia.", { passageId: POEM.id }),
        fill("smp9-c6-l2-c3", "Complete the simile.", "My mother's voice is warm as", ",", ["rice"], "Baris 5.", { passageId: POEM.id }),
        pickMany("smp9-c6-l2-c4", "Choose ALL the metaphors.", ["The morning sun is a golden coin.", "my father's hands are stone", "My mother's voice is warm as rice", "the coconut trees wave their hands"], [0, 1], "Baris 1 dan 6 (tanpa like/as).", { passageId: POEM.id }),
        pick("smp9-c6-l2-c5", "“My father's hands are stone” suggests that his hands are…", ["hard and strong from work", "cold and grey", "small and soft"], 0, "Tangan keras karena bekerja.", { passageId: POEM.id, hots: true }),
        pick("smp9-c6-l2-c6", "How does the speaker probably feel?", ["They miss their home.", "They are angry at the sea.", "They are bored."], 0, "Calling me back home = rindu.", { passageId: POEM.id, hots: true }),
      ],
    },
    {
      id: "smp9-c6-l3",
      skill: "listening",
      title: "Songs and Writing Poems",
      summary: "Listening to song lyrics, understanding the message, and writing your own poem.",
      sections: [
        {
          title: "A song about friendship",
          blocks: [
            audio("Song lyrics (spoken)", say(["woman", "When the rain is falling down and the sky is turning grey,"], ["woman", "when you're lost and all alone and you can't find your way,"], ["man", "I'll be there, I'll be there, like a lighthouse in the night,"], ["man", "I'll be there, I'll be there, till the morning shines so bright."])),
            table(["Song part", "Function"], [["verse", "bagian yang menceritakan situasi"], ["chorus", "reff, diulang, berisi pesan utama"], ["bridge", "bagian berbeda menjelang akhir"]]),
            tryIt(pick("smp9-c6-l3-try1", "What is the friend compared to in the chorus?", ["a lighthouse in the night", "a rainy sky", "a lost child"], 0, "Simile dengan like.")),
          ],
        },
        {
          title: "Write a poem",
          blocks: [
            pics([["mountain", "nature"], ["mother", "family"], ["school", "school"], ["earth", "our planet"]], "Choose a topic"),
            writing({
              id: "smp9-c6-l3-write",
              title: "My poem",
              prompt: "Write a poem of 8–16 lines about a topic that matters to you (your hometown, a family member, friendship, the sea, your dreams…). Use at least one simile, one metaphor and one personification. Rhyme is optional.",
              image: "owl-think",
              minWords: 40,
              maxWords: 140,
              tips: ["Choose one strong feeling.", "Use the five senses: see, hear, smell, taste, touch.", "Simile: … like … / as … as …", "Metaphor: … is …", "Personification: the … whispers / dances / sleeps"],
              models: [{ label: "Example", text: "Grandmother's Kitchen\nMy grandmother's kitchen is a little sun,\nit warms the house when the day's begun.\nThe kettle sings a sleepy song,\nthe spices dance all morning long.\nHer hands move fast like river fish,\nthey fold the love in every dish.\nAnd when I'm far, in cities grey,\nI smell her kitchen every day." }],
              rubric: ["I used at least one simile, one metaphor and one personification.", "I used imagery from the senses.", "My poem has a clear feeling or message.", "I organised it into lines (and stanzas)."],
            }),
            speaking({
              id: "smp9-c6-l3-say",
              title: "Poetry reading",
              prompt: "Read your poem (or “My Island Home”) aloud with feeling. Pause at line ends, stress important words, and change your voice to match the mood.",
              image: "microphone",
              prepSeconds: 30,
              seconds: 60,
              tips: ["Read slowly.", "Pause at commas and line ends.", "Stress emotional words.", "Look up at your audience."],
              models: [{ label: "Tip", text: "Read “My Island Home” slowly and softly. Stress “golden coin”, “whisper”, “warm” and “home”. Make a short pause after each line, and a longer pause before the last line: “is calling me … back home.”" }],
              rubric: ["I read clearly at a slow pace.", "I paused at line and stanza ends.", "My voice showed the feeling of the poem.", "My pronunciation of key words was clear."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("smp9-c6-l3-c1", voice("I'll be there, like a lighthouse in the night."), "Listen. What does the singer promise?", ["to be there to help", "to leave", "to build a lighthouse"], 0, "I'll be there."),
        pick("smp9-c6-l3-c2", "Which part of a song is usually repeated?", ["chorus", "verse", "title"], 0, "Chorus = reff, bagian yang diulang."),
        arrange("smp9-c6-l3-c3", "Put the words in order.", "The kettle sings a sleepy song", "Personifikasi."),
        fill("smp9-c6-l3-c4", "Complete the simile: Her hands move fast ___ river fish.", "Her hands move fast", "river fish.", ["like"], "Simile memakai like."),
        trPick("smp9-c6-l3-c5", "“Mercusuar” in English is…", ["lighthouse", "lightning", "highlight"], 0, "Lighthouse."),
        pick("smp9-c6-l3-c6", "Why might a songwriter compare a friend to a lighthouse?", ["A lighthouse guides people safely in darkness.", "Lighthouses are tall.", "Lighthouses are near the sea."], 0, "Makna simbolik: penuntun.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp9-c6-post",
    title: "Chapter 6 Posttest",
    passPercent: 70,
    passages: [POEM],
    questions: [
      pick("smp9-c6-post1", "“The stars winked at us.” This is…", ["personification", "simile", "hyperbole", "rhyme"], 0, "Bintang 'mengedip' seperti manusia."),
      listen("smp9-c6-post2", voice("I'm so tired I could sleep for a hundred years."), "Listen. What figure of speech is this?", ["hyperbole", "metaphor", "personification", "simile"], 0, "Berlebihan."),
      trPick("smp9-c6-post3", "“Majas perbandingan dengan ‘seperti’” in English is…", ["simile", "metaphor", "stanza", "chorus"], 0, "Simile."),
      pick("smp9-c6-post4", "Which word rhymes with “home”?", ["foam", "house", "hum", "hen"], 0, "Home – foam."),
      arrange("smp9-c6-post5", "Put the words in order.", "The morning sun is a golden coin", "Metafora (baris 1)."),
      pick("smp9-c6-post6", "How many lines does the poem have?", ["eight", "four", "six", "ten"], 0, "Hitung baris.", { passageId: POEM.id }),
      match("smp9-c6-post7", "Match the line and the figure.", [["it rolls across the sea", "personification"], ["warm as rice", "simile"], ["hands are stone", "metaphor"]], "Kiasan dalam puisi."),
      fill("smp9-c6-post8", "Complete.", "and every wave that hits the", "is calling me back home.", ["shore"], "Baris 7.", { passageId: POEM.id }),
      pick("smp9-c6-post9", "What is the main theme of the poem?", ["love for family and hometown", "a storm at sea", "a fishing competition", "school life"], 0, "Rindu rumah dan keluarga.", { passageId: POEM.id, hots: true }),
      pick("smp9-c6-post10", "Why does the poet say the waves are “calling”?", ["Everything about the sea reminds the speaker of home.", "The waves are very loud.", "Someone is shouting from a boat.", "The speaker is afraid of the sea."], 0, "Personifikasi untuk kerinduan.", { passageId: POEM.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Poetry Slam",
    questions: [
      live("smp9-c6-live1", "as light as a…", ["feather", "rock", "truck", "house"], 0, "bird"),
      live("smp9-c6-live2", "“Life is a journey.”", ["metaphor", "simile", "hyperbole", "rhyme"], 0, "map"),
      live("smp9-c6-live3", "Repeated song part:", ["chorus", "verse", "title", "intro"], 0, "microphone"),
      live("smp9-c6-live4", "“Bait” (puisi) =", ["stanza", "line", "rhyme", "title"], 0, "book", true),
      live("smp9-c6-live5", "Rhymes with “night”:", ["bright", "nice", "need", "note"], 0, "night"),
      live("smp9-c6-live6", "“The wind whispered.”", ["personification", "simile", "metaphor", "fact"], 0, "windy"),
      live("smp9-c6-live7", "“I've told you a million times!”", ["hyperbole", "simile", "metaphor", "rhyme"], 0, "angry"),
      live("smp9-c6-live8", "Simile uses…", ["like / as", "is / are", "and / but", "the / a"], 0, "question"),
    ],
  },
};
