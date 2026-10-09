import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tfng, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// IELTS Academic — Level 1: Band 4.5 Foundations.
// Original practice material written in the style of IELTS tasks.

const MARKET: Passage = {
  id: "ielts1-market",
  title: "The Floating Markets of Banjarmasin",
  lines: [
    "Banjarmasin, the capital of South Kalimantan, is often called the City of a Thousand Rivers.",
    "For centuries, its residents have travelled, traded and even lived on the water.",
    "The most famous example is the floating market at Lok Baintan, where traders sell goods from small wooden boats called jukung.",
    "Most of the sellers are women, and many of them begin paddling to the market before sunrise.",
    "They sell fruit, vegetables, fish and traditional cakes, and buyers often pay with cash, although some traders now accept digital payments.",
    "In the past, goods were frequently exchanged without money, a system known as barter.",
    "Today, the market attracts many tourists, especially at weekends.",
    "However, local researchers have noted that the number of traders has fallen as more people choose to shop on land, where roads and supermarkets have become more common.",
  ],
};

export const BAND1: Level = {
  id: "ielts-b1",
  title: "Level 1 — Band 4.5: Foundations",
  description: "Understand the IELTS Academic test, complete forms in Listening Part 1, scan texts and answer True/False/Not Given questions, describe a simple bar chart, and answer Speaking Part 1 questions.",
  targetScore: "Target Band 4.5",
  cover: ["report", "headset", "pencil"],
  pretest: {
    id: "ielts-b1-pre",
    title: "Level 1 Pretest",
    passPercent: 0,
    questions: [
      pick("ielts-b1-pre1", "How many sections are there in IELTS Listening?", ["four", "two", "three", "five"], 0, "Listening punya 4 bagian (Part 1–4), total 40 soal."),
      listen("ielts-b1-pre2", say(["man", "Can I have your surname, please?"], ["woman", "It's Wijaya. That's W-I-J-A-Y-A."]), "Listen. What is the woman's surname?", ["Wijaya", "Wiyaja", "Wijana", "Widaya"], 0, "Dieja W-I-J-A-Y-A."),
      trPick("ielts-b1-pre3", "“Tidak disebutkan” (in a reading question) in English is…", ["Not Given", "False", "True", "No answer"], 0, "Not Given = informasinya tidak ada di teks."),
      pick("ielts-b1-pre4", "IELTS Writing Task 1 (Academic) asks you to…", ["describe visual information such as a chart", "write a letter to a friend", "write a story", "summarise a novel"], 0, "Task 1 Academic: grafik, tabel, diagram, peta."),
      pick("ielts-b1-pre5", "IELTS band scores range from…", ["0 to 9", "0 to 120", "310 to 677", "1 to 6"], 0, "Skala IELTS 0–9, kenaikan 0,5."),
    ],
  },
  lessons: [
    {
      id: "ielts-b1-l1",
      skill: "listening",
      title: "Listening Part 1: Forms, Names and Numbers",
      summary: "The IELTS Listening format, spelling, numbers and dates, and form completion.",
      sections: [
        {
          title: "The IELTS test at a glance",
          blocks: [
            table(["Paper", "Time", "What you do"], [["Listening", "about 30 minutes", "4 parts, 40 questions; each recording is played once"], ["Reading (Academic)", "60 minutes", "3 long texts, 40 questions"], ["Writing (Academic)", "60 minutes", "Task 1: describe visual data (150+ words); Task 2: essay (250+ words)"], ["Speaking", "11–14 minutes", "face-to-face interview in 3 parts"]]),
            pics([["headset", "Listening"], ["open-book", "Reading"], ["pencil", "Writing"], ["microphone", "Speaking"]]),
            tip("Rekaman Listening IELTS **hanya diputar sekali**. Gunakan waktu sebelum setiap bagian untuk **membaca soal dan menebak jenis jawaban** (nama, angka, tanggal, kata benda)."),
          ],
        },
        {
          title: "Spelling, numbers and dates",
          blocks: [
            table(["Item", "Watch out for"], [["Letters", "A/E/I, G/J, B/V/P, M/N; “double L” = LL"], ["Phone numbers", "“oh” = 0; “double five” = 55"], ["Dates", "the 13th vs the 30th; write 13 March or March 13"], ["Prices", "$15.50 = “fifteen dollars fifty”"], ["Postcodes", "letters and numbers mixed: BS7 9QT"]]),
            repeat(["Double L", "Oh-eight-one-two", "The thirteenth of March", "Fifteen fifty", "B for bravo, V for victor"]),
            audio("Booking a homestay", say(["woman", "Good morning, Sunrise Homestay. How can I help?"], ["man", "Hi, I'd like to book a room for three nights, please."], ["woman", "Of course. Could I have your name?"], ["man", "Yes, it's Daniel Pratama. P-R-A-T-A-M-A."], ["woman", "Thank you. And your arrival date?"], ["man", "The fourteenth of July."], ["woman", "A single room is thirty-five dollars per night, including breakfast. Can I have a contact number?"], ["man", "Sure. It's oh-eight-one-two, double three, four-nine-seven-one."])),
            tryIt(fill("ielts-b1-l1-try", "Complete the form. Arrival date: ___ July", "Arrival date:", "July", ["14", "14th", "fourteenth"], "The fourteenth of July.")),
          ],
        },
      ],
      checkpoint: [
        fill("ielts-b1-l1-c1", "Complete the form (ONE WORD). Family name: ___", "Family name:", "", ["Pratama"], "Dieja P-R-A-T-A-M-A."),
        fill("ielts-b1-l1-c2", "Complete the form (A NUMBER). Price per night: $___", "Price per night: $", "", ["35"], "Thirty-five dollars."),
        pick("ielts-b1-l1-c3", "What is included in the price?", ["breakfast", "dinner", "airport transfer"], 0, "Including breakfast."),
        fill("ielts-b1-l1-c4", "Complete the form. Phone: 0812 ___ 4971", "Phone: 0812", "4971", ["33"], "Double three = 33."),
        listen("ielts-b1-l1-c5", voice("The meeting is on the thirtieth, not the thirteenth."), "Listen. What is the date of the meeting?", ["the 30th", "the 13th", "the 3rd"], 0, "Thirtieth = 30th."),
        pick("ielts-b1-l1-c6", "A form says: “Write NO MORE THAN TWO WORDS AND/OR A NUMBER.” Which answer is NOT acceptable?", ["a big double room", "double room", "room 12"], 0, "Tiga kata melebihi batas.", { hots: true }),
      ],
    },
    {
      id: "ielts-b1-l2",
      skill: "reading",
      title: "Reading: Scanning and True / False / Not Given",
      summary: "Finding information quickly and judging whether statements match the text.",
      passages: [MARKET],
      sections: [
        {
          title: "Skimming and scanning",
          blocks: [
            table(["Skill", "Purpose", "How"], [["Skimming", "general idea", "read the title, first sentences and last sentence"], ["Scanning", "specific information", "move your eyes quickly to find names, numbers, key words"]]),
            text("Di IELTS Reading Anda punya **60 menit untuk 40 soal** dari tiga teks panjang, tanpa waktu tambahan untuk menyalin jawaban. Jangan membaca setiap kata; **pindai** kata kunci dari soal."),
            { type: "passage", passage: MARKET },
          ],
        },
        {
          title: "True, False or Not Given",
          blocks: [
            table(["Answer", "Meaning"], [["TRUE", "the statement agrees with the information"], ["FALSE", "the statement contradicts the information"], ["NOT GIVEN", "there is no information about this"]]),
            warn("Jangan memakai pengetahuan umum. Jika teks **tidak menyebutkan**, jawabannya **NOT GIVEN**, meskipun pernyataannya benar di dunia nyata."),
            examples([{ right: "Statement: Most traders at Lok Baintan are women. → TRUE (line 4)" }, { right: "Statement: All traders now accept digital payments. → FALSE (line 5: some traders)" }, { right: "Statement: The market is open every day of the year. → NOT GIVEN" }], "Examples"),
            tryIt(tfng("ielts-b1-l2-try", "“Jukung are small wooden boats.”", "TRUE", "Baris 3.", { passageId: MARKET.id })),
          ],
        },
      ],
      checkpoint: [
        tfng("ielts-b1-l2-c1", "“Banjarmasin is the capital of South Kalimantan.”", "TRUE", "Baris 1.", { passageId: MARKET.id }),
        tfng("ielts-b1-l2-c2", "“Traders arrive at the market after lunch.”", "FALSE", "Baris 4: sebelum matahari terbit.", { passageId: MARKET.id }),
        tfng("ielts-b1-l2-c3", "“The market is busiest during the rainy season.”", "NOT GIVEN", "Musim hujan tidak disebut.", { passageId: MARKET.id }),
        fill("ielts-b1-l2-c4", "Complete with ONE WORD from the text: Exchanging goods without money is called ___ .", "Exchanging goods without money is called", ".", ["barter"], "Baris 6.", { passageId: MARKET.id }),
        tfng("ielts-b1-l2-c5", "“The number of traders has increased in recent years.”", "FALSE", "Baris 8: has fallen.", { passageId: MARKET.id }),
        tfng("ielts-b1-l2-c6", "“Supermarkets are cheaper than the floating market.”", "NOT GIVEN", "Harga tidak dibandingkan.", { passageId: MARKET.id, hots: true }),
      ],
    },
    {
      id: "ielts-b1-l3",
      skill: "writing",
      title: "Writing Task 1: Describing a Bar Chart",
      summary: "Introducing the chart, writing an overview and comparing the biggest and smallest figures.",
      sections: [
        {
          title: "The chart",
          blocks: [
            text("**Task:** The chart below shows how students at one university travelled to campus in 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words."),
            table(["Transport", "Percentage of students"], [["Motorbike", "42%"], ["Bus", "23%"], ["Walking", "15%"], ["Car", "12%"], ["Bicycle", "8%"]]),
            pics([["motorcycle", "motorbike"], ["bus", "bus"], ["run", "walking"], ["bicycle", "bicycle"]]),
          ],
        },
        {
          title: "Structure and language",
          blocks: [
            table(["Paragraph", "Content"], [["Introduction", "paraphrase the task: what, where, when"], ["Overview", "the main features (no numbers needed): biggest, smallest, clear patterns"], ["Details 1", "the largest categories with figures"], ["Details 2", "the smaller categories with figures and comparisons"]]),
            table(["Useful language", "Example"], [["The chart illustrates / compares…", "The bar chart illustrates how students travelled to campus."], ["the most popular / the least common", "Motorbikes were the most popular means of transport."], ["accounted for / made up", "Buses accounted for 23%."], ["almost twice as many as", "Almost twice as many students rode motorbikes as took the bus."], ["just over / just under / around", "just under a quarter"]]),
            warn("Jangan memberi **opini atau alasan** (*because motorbikes are cheap*) di Task 1. Laporkan hanya apa yang terlihat pada data."),
            writing({
              id: "ielts-b1-l3-write",
              title: "Task 1 practice",
              prompt: "Describe the bar chart about how students travelled to campus. Write at least 150 words: introduction, overview and two detail paragraphs.",
              image: "report",
              minWords: 150,
              maxWords: 200,
              tips: ["The bar chart illustrates …", "Overall, … was by far the most popular …, while … was the least common.", "… accounted for …%, almost twice as many as …", "Walking and travelling by car were similar, at …"],
              models: [{ label: "Band 6–7 model", text: "The bar chart illustrates how students at one university travelled to campus in 2025.\nOverall, motorbikes were by far the most popular means of transport, while bicycles were the least common.\nAlmost half of the students (42%) rode a motorbike to campus. This was nearly twice the proportion who took the bus, which was the second most common option at 23%.\nThe remaining students used other methods. Walking accounted for 15%, slightly more than the 12% who travelled by car. Only 8% of students cycled, which means that fewer than one in ten chose a bicycle.\nIn summary, private motorbikes dominated travel to campus, whereas more environmentally friendly options such as cycling were much less popular." }],
              rubric: ["I paraphrased the task in the introduction (not copied).", "I wrote a clear overview of the main features.", "I included accurate figures and comparisons.", "I did not give opinions or reasons.", "I wrote at least 150 words in clear paragraphs."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("ielts-b1-l3-c1", "What is the overview in a Task 1 answer?", ["a summary of the main features without detailed numbers", "your opinion about the data", "a list of every figure", "the title copied from the task"], 0, "Overview = gambaran utama."),
        pick("ielts-b1-l3-c2", "Which sentence should NOT appear in Task 1?", ["Students probably prefer motorbikes because they are cheap.", "Buses accounted for 23% of journeys.", "Bicycles were the least common option."], 0, "Opini/alasan tidak diminta."),
        match("ielts-b1-l3-c3", "Match the figure and the phrase.", [["42%", "just over two fifths"], ["23%", "just under a quarter"], ["8%", "fewer than one in ten"], ["50%", "half"]], "Ungkapan pecahan."),
        fill("ielts-b1-l3-c4", "Complete: Buses ___ for 23% of journeys.", "Buses", "for 23% of journeys.", ["accounted"], "Accounted for."),
        trPick("ielts-b1-l3-c5", "“Sejauh ini yang paling populer” in English is…", ["by far the most popular", "far by the most popular", "most far popular"], 0, "By far + superlative."),
        pick("ielts-b1-l3-c6", "Which introduction paraphrases the task best?", ["The bar chart shows the ways in which students got to their university in 2025.", "The chart below shows how students at one university travelled to campus in 2025.", "This is a chart."], 0, "Parafrase, bukan menyalin.", { hots: true }),
      ],
    },
    {
      id: "ielts-b1-l4",
      skill: "speaking",
      title: "Speaking Part 1: Familiar Topics",
      summary: "Answering questions about home, study, work and hobbies with extended answers.",
      sections: [
        {
          title: "How Part 1 works",
          blocks: [
            table(["Feature", "Detail"], [["Length", "4–5 minutes"], ["Topics", "home, hometown, work or study, hobbies, food, weather, technology…"], ["Answer length", "2–3 sentences: answer + reason + example"], ["Assessment", "fluency and coherence, vocabulary, grammar, pronunciation"]]),
            table(["Weak answer", "Better answer"], [["Q: Do you like cooking? A: Yes.", "Yes, I do, especially on weekends. I usually make fried rice for my family because it's quick and everyone loves it."], ["Q: Where do you live? A: Medan.", "I live in Medan, the biggest city in North Sumatra. It's busy and a bit noisy, but the food is amazing."]]),
          ],
        },
        {
          title: "Practice",
          blocks: [
            audio("Sample Part 1", say(["man", "Let's talk about your hometown. Where are you from?"], ["woman", "I'm from Malang, a city in East Java. It's quite cool because it's surrounded by mountains."], ["man", "What do you like most about it?"], ["woman", "I'd say the atmosphere. It's calmer than Surabaya, and there are lots of small cafés where students meet."], ["man", "Is there anything you would change?"], ["woman", "Probably the traffic. At weekends, tourists come from everywhere, so the roads get really crowded."])),
            vocab([["surrounded by", "dikelilingi oleh", "mountain"], ["atmosphere", "suasana", "happy"], ["crowded", "padat/ramai", "traffic"], ["I'd say…", "menurut saya…", "chat"]], "Useful phrases"),
            speaking({
              id: "ielts-b1-l4-say",
              title: "Part 1 practice",
              prompt: "Answer these four questions, 20–30 seconds each: (1) Do you work or are you a student? (2) What do you enjoy doing in your free time? (3) What kind of food is popular in your area? (4) Do you prefer mornings or evenings? Why?",
              image: "microphone",
              seconds: 120,
              tips: ["Answer directly first.", "Add a reason: because / since…", "Add an example: for example, last weekend…", "Use natural fillers: Well, … / I'd say…"],
              models: [{ label: "Model answers", text: "(1) I'm a student. I'm in my final year of senior high school, and I'm hoping to study pharmacy next year. (2) Mostly I play badminton with my cousins. We play at a local court twice a week, and it helps me relax after studying. (3) In Padang, where I'm from, rendang is definitely the most famous dish, but people also love sate Padang, which has a thick, spicy sauce. (4) I'd say evenings. I'm not really a morning person, and in the evening my mind feels clearer, so I usually study then." }],
              rubric: ["I answered each question directly.", "I extended answers with reasons and examples.", "I used a range of vocabulary, not only basic words.", "I spoke without long pauses."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("ielts-b1-l4-c1", voice("I'd say the atmosphere. It's calmer than Surabaya."), "Listen. What does the speaker like most?", ["the atmosphere", "the traffic", "the shopping"], 0, "I'd say the atmosphere."),
        pick("ielts-b1-l4-c2", "Which Part 1 answer is the best?", ["Yes, I do. I swim every Saturday morning because it helps me stay fit.", "Yes.", "Swimming is a sport that people do in water."], 0, "Jawaban + alasan + contoh."),
        pickMany("ielts-b1-l4-c3", "Choose ALL the criteria used to assess Speaking.", ["fluency and coherence", "lexical resource", "grammatical range and accuracy", "pronunciation", "handwriting"], [0, 1, 2, 3], "Empat kriteria penilaian."),
        fill("ielts-b1-l4-c4", "Complete: It's quite cool because it's ___ by mountains.", "It's quite cool because it's", "by mountains.", ["surrounded"], "Surrounded by."),
        trPick("ielts-b1-l4-c5", "“Saya bukan orang yang suka pagi.” in English is…", ["I'm not really a morning person.", "I'm not a person of morning.", "I don't like person morning."], 0, "Ungkapan alami."),
        pick("ielts-b1-l4-c6", "The examiner asks a question you didn't fully understand. What should you do?", ["Ask: “Sorry, could you repeat the question, please?”", "Stay silent.", "Answer a different question."], 0, "Meminta pengulangan diperbolehkan.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ielts-b1-post",
    title: "Level 1 Mock Quiz",
    passPercent: 70,
    passages: [MARKET],
    questions: [
      listen("ielts-b1-post1", say(["woman", "Your membership number is BK four-seven-nine-two."], ["man", "BK four-seven-nine-two. Thanks."]), "Listen. What is the membership number?", ["BK4792", "BK4972", "PK4792", "BK4729"], 0, "BK 4-7-9-2."),
      listen("ielts-b1-post2", say(["man", "The tour costs eighteen dollars fifty for adults and half price for children."]), "Listen. How much does a child's ticket cost?", ["$9.25", "$18.50", "$8.50", "$9.50"], 0, "Setengah dari 18,50 = 9,25."),
      listen("ielts-b1-post3", say(["woman", "We meet every Tuesday, but this month it's moved to Thursday because of the holiday."]), "Listen. When do they meet this month?", ["Thursday", "Tuesday", "every day", "Saturday"], 0, "Pindah ke Kamis.", { hots: true }),
      tfng("ielts-b1-post4", "“Lok Baintan market is on the water.”", "TRUE", "Baris 3.", { passageId: MARKET.id }),
      tfng("ielts-b1-post5", "“Barter is still the main way of paying at the market.”", "FALSE", "Baris 5–6: kini kebanyakan tunai.", { passageId: MARKET.id }),
      tfng("ielts-b1-post6", "“Tourists mostly come from Java.”", "NOT GIVEN", "Asal turis tidak disebut.", { passageId: MARKET.id }),
      fill("ielts-b1-post7", "Complete (ONE WORD): Banjarmasin is called the City of a Thousand ___ .", "Banjarmasin is called the City of a Thousand", ".", ["Rivers"], "Baris 1.", { passageId: MARKET.id }),
      pick("ielts-b1-post8", "Why has the number of traders fallen, according to the text?", ["More people shop on land.", "The river is polluted.", "Boats are too expensive.", "Tourists stopped coming."], 0, "Baris 8.", { passageId: MARKET.id, hots: true }),
      pick("ielts-b1-post9", "Which phrase is best for a Task 1 overview?", ["Overall, motorbikes were the most popular option, while bicycles were the least used.", "In my opinion, bicycles are better.", "42% used motorbikes and 23% used buses and 15% walked."], 0, "Overview tanpa rincian angka."),
      pick("ielts-b1-post10", "Speaking Part 1: “Do you like rainy days?” Best answer:", ["Not really. When it rains, the roads in my city flood, so it's hard to get anywhere.", "Rain is water from clouds.", "No."], 0, "Langsung + alasan."),
    ],
  },
  live: {
    title: "Live Quiz — IELTS Starter",
    questions: [
      live("ielts-b1-live1", "IELTS band scale:", ["0–9", "0–120", "1–6", "310–677"], 0, "trophy"),
      live("ielts-b1-live2", "Listening recordings are played…", ["once", "twice", "three times", "as often as you like"], 0, "headset"),
      live("ielts-b1-live3", "Not mentioned in the text =", ["NOT GIVEN", "FALSE", "TRUE", "YES"], 0, "question"),
      live("ielts-b1-live4", "Task 1 minimum words:", ["150", "250", "100", "300"], 0, "pencil"),
      live("ielts-b1-live5", "“Double three” =", ["33", "6", "3-3-3", "13"], 0, "phone-call"),
      live("ielts-b1-live6", "Part 1 answer should include…", ["answer + reason + example", "one word", "a long story", "a question back"], 0, "microphone"),
      live("ielts-b1-live7", "“Sekitar seperempat” =", ["around a quarter", "about a half", "nearly a third", "over three quarters"], 0, "report", true),
      live("ielts-b1-live8", "Task 1: give your opinion?", ["No", "Yes", "Only at the end", "Only in the overview"], 0, "owl-think"),
    ],
  },
};
