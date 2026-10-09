import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { audio, examples, fill, listen, live, match, pick, pickMany, pics, say, speaking, table, text, tfng, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// IELTS Academic — Level 2: Band 5.0–5.5.

const BAMBOO: Passage = {
  id: "ielts2-bamboo",
  title: "Building with Bamboo",
  lines: [
    "A. For thousands of years, bamboo has been used across Asia to build houses, bridges and scaffolding. Its strength, flexibility and rapid growth make it a remarkable natural material.",
    "B. Some species of bamboo can grow almost a metre in a single day and reach full height within a few months. In contrast, the trees used for timber may take decades to mature, which makes bamboo far more renewable.",
    "C. Despite these advantages, bamboo has a serious weakness. Untreated bamboo is easily attacked by insects and fungi, and it can rot within a few years when exposed to rain.",
    "D. Modern treatment methods have largely solved this problem. Soaking the stems in a solution of boron salts protects them from insects, while good design keeps the material dry, for example by raising buildings off the ground.",
    "E. In Bali, architects have used treated bamboo to create schools, hotels and even a multi-storey building, attracting international attention. These projects have shown that bamboo can be both beautiful and durable.",
    "F. Nevertheless, bamboo is still seen by many people as a material for the poor. Changing this perception may be as important as improving the technology itself.",
  ],
};

export const BAND2: Level = {
  id: "ielts-b2",
  title: "Level 2 — Band 5.0–5.5: Building Confidence",
  description: "Follow Listening Part 2 monologues, match headings to paragraphs, plan and write a Task 2 opinion essay, and speak for two minutes in Speaking Part 2.",
  targetScore: "Target Band 5.0–5.5",
  cover: ["map", "open-book", "microphone"],
  pretest: {
    id: "ielts-b2-pre",
    title: "Level 2 Pretest",
    passPercent: 0,
    questions: [
      pick("ielts-b2-pre1", "IELTS Listening Part 2 is usually…", ["a monologue on an everyday topic", "a conversation between students", "an academic lecture", "a phone call about a form"], 0, "Part 2 = monolog topik sehari-hari."),
      listen("ielts-b2-pre2", voice("The café is to the left of the main entrance, opposite the gift shop."), "Listen. Where is the café?", ["left of the entrance, opposite the gift shop", "right of the entrance", "next to the gift shop", "upstairs"], 0, "To the left … opposite."),
      trPick("ielts-b2-pre3", "“Kalimat utama paragraf” in English is…", ["topic sentence", "head sentence", "title line", "first word"], 0, "Topic sentence."),
      pick("ielts-b2-pre4", "Task 2 requires at least…", ["250 words", "150 words", "100 words", "400 words"], 0, "Minimal 250 kata."),
      pick("ielts-b2-pre5", "In Speaking Part 2, how long do you prepare?", ["one minute", "five minutes", "no time", "ten seconds"], 0, "Satu menit persiapan, bicara 1–2 menit."),
    ],
  },
  lessons: [
    {
      id: "ielts-b2-l1",
      skill: "listening",
      title: "Listening Part 2: Tours, Talks and Directions",
      summary: "Following a monologue, multiple-choice questions and locating places from directions.",
      sections: [
        {
          title: "Part 2 strategies",
          blocks: [
            table(["Question type", "Tip"], [["Multiple choice", "underline key words; the speaker may mention all options, but only one is correct"], ["Map / plan labelling", "find the starting point; follow left, right, opposite, next to, beyond"], ["Matching", "read the list first; answers come in order of the questions"]]),
            table(["Direction language", "Meaning"], [["opposite", "berhadapan/di seberang"], ["beyond / past", "melewati"], ["at the far end of", "di ujung"], ["adjacent to / next to", "bersebelahan"], ["in the corner", "di sudut"]]),
            pics([["map", "map labelling"], ["turn-left", "turn left"], ["go-straight", "go straight on"], ["museum", "a guided tour"]]),
          ],
        },
        {
          title: "Practice: a museum tour",
          blocks: [
            audio("Welcome to the City Museum", say(["woman", "Welcome to the City Museum. Before we start, a few practical points. The cloakroom is just to your right as you come in, and lockers cost five thousand rupiah. Our tour begins in the History Hall, straight ahead of you. After that, we'll go up to the first floor, where you'll find the Textile Gallery at the far end of the corridor. Please note that photography is allowed everywhere except in the Textile Gallery, because flash light can damage old fabrics. The tour lasts about ninety minutes, and it finishes in the café, which is opposite the gift shop on the ground floor."])),
            tryIt(pick("ielts-b2-l1-try", "Where does the tour begin?", ["the History Hall", "the Textile Gallery", "the café"], 0, "Begins in the History Hall.")),
          ],
        },
      ],
      checkpoint: [
        pick("ielts-b2-l1-c1", "Where is the cloakroom?", ["to the right of the entrance", "on the first floor", "opposite the gift shop"], 0, "To your right as you come in."),
        pick("ielts-b2-l1-c2", "Why is photography not allowed in the Textile Gallery?", ["Flash light can damage old fabrics.", "The room is too dark.", "It is a private collection."], 0, "Alasan perlindungan kain."),
        fill("ielts-b2-l1-c3", "Complete (A NUMBER): The tour lasts about ___ minutes.", "The tour lasts about", "minutes.", ["90", "ninety"], "About ninety minutes."),
        pick("ielts-b2-l1-c4", "Where is the Textile Gallery?", ["at the far end of the first-floor corridor", "next to the cloakroom", "in the basement"], 0, "First floor, far end."),
        listen("ielts-b2-l1-c5", voice("Go past the library, and the lab is the second door on your left."), "Listen. Where is the lab?", ["beyond the library, second door on the left", "before the library", "opposite the library"], 0, "Past = melewati."),
        pick("ielts-b2-l1-c6", "In Part 2 multiple choice, the speaker mentions all three options. What should you do?", ["Listen for which option is confirmed and which are rejected", "Choose the first one mentioned", "Choose the last one mentioned"], 0, "Distraktor sering disebut lalu dibantah.", { hots: true }),
      ],
    },
    {
      id: "ielts-b2-l2",
      skill: "reading",
      title: "Reading: Matching Headings",
      summary: "Identifying the main idea of each paragraph and avoiding headings that match only a detail.",
      passages: [BAMBOO],
      sections: [
        {
          title: "Strategy",
          blocks: [
            table(["Step", "What to do"], [["1", "Read the list of headings and notice key differences."], ["2", "Read each paragraph's first and last sentences."], ["3", "Ask: What is the WHOLE paragraph about?"], ["4", "Beware of headings that match a word but not the main idea."], ["5", "Do easy paragraphs first; there are extra headings you won't use."]]),
            warn("Heading yang memakai **kata yang sama persis** dengan paragraf sering menjadi **jebakan**. Cari heading yang merangkum **ide utama**, biasanya dalam kata-kata berbeda."),
          ],
        },
        {
          title: "Practice text",
          blocks: [
            { type: "passage", passage: BAMBOO },
            vocab([["scaffolding", "perancah", "house"], ["renewable", "dapat diperbarui", "recycle"], ["rot", "membusuk", "trash"], ["durable", "tahan lama", "thumbs-up"], ["perception", "persepsi/pandangan", "eye"]], "Key vocabulary"),
            tryIt(pick("ielts-b2-l2-try", "Which heading fits paragraph B?", ["A fast-growing alternative to timber", "Protecting bamboo from insects", "A long history of use", "An image problem"], 0, "Paragraf B: pertumbuhan cepat dibanding kayu.", { passageId: BAMBOO.id })),
          ],
        },
      ],
      checkpoint: [
        match("ielts-b2-l2-c1", "Match the paragraphs and the headings.", [["Paragraph A", "A traditional and versatile material"], ["Paragraph C", "A natural weakness"], ["Paragraph D", "Solutions from science and design"], ["Paragraph F", "Changing how people see bamboo"]], "Ide utama tiap paragraf.", { passageId: BAMBOO.id }),
        pick("ielts-b2-l2-c2", "Which heading best fits paragraph E?", ["Successful modern projects", "The cost of bamboo", "Insects in Bali", "How to plant bamboo"], 0, "Proyek modern di Bali.", { passageId: BAMBOO.id }),
        tfng("ielts-b2-l2-c3", "Untreated bamboo can rot within a few years if it gets wet.", "TRUE", "Paragraf C.", { passageId: BAMBOO.id }),
        tfng("ielts-b2-l2-c4", "Boron treatment makes bamboo heavier.", "NOT GIVEN", "Berat tidak disebut.", { passageId: BAMBOO.id }),
        fill("ielts-b2-l2-c5", "Complete (ONE WORD): Raising buildings off the ground helps keep bamboo ___ .", "Raising buildings off the ground helps keep bamboo", ".", ["dry"], "Paragraf D.", { passageId: BAMBOO.id }),
        pick("ielts-b2-l2-c6", "Why might “Bamboo in Bali” be a WRONG heading for paragraph E?", ["It mentions a place but not the main idea of successful, durable projects.", "Bali is not in the paragraph.", "It is too short."], 0, "Heading jebakan: hanya detail.", { passageId: BAMBOO.id, hots: true }),
      ],
    },
    {
      id: "ielts-b2-l3",
      skill: "writing",
      title: "Writing Task 2: The Opinion Essay",
      summary: "Understanding the question, writing a clear position, and organising four paragraphs.",
      sections: [
        {
          title: "Plan the essay",
          blocks: [
            text("**Task:** Some people believe that university education should be free for all students. To what extent do you agree or disagree? Write at least 250 words."),
            table(["Paragraph", "Content", "Approx. words"], [["Introduction", "paraphrase the topic + clear position", "40–50"], ["Body 1", "first reason + explanation + example", "80–90"], ["Body 2", "second reason + explanation + example", "80–90"], ["Conclusion", "restate the position + summary", "30–40"]]),
            tip("Penilaian Task 2: **Task Response**, **Coherence and Cohesion**, **Lexical Resource**, **Grammatical Range and Accuracy**. Jawab **semua bagian** pertanyaan dan nyatakan posisimu dengan jelas."),
          ],
        },
        {
          title: "Write it",
          blocks: [
            examples([{ wrong: "University education should be free for all students. I agree.", right: "Whether higher education should be provided free of charge is a widely debated issue. I largely agree that it should be free, because it promotes equal opportunity and benefits society as a whole.", note: "Parafrase + posisi + alasan singkat." }], "A strong introduction"),
            writing({
              id: "ielts-b2-l3-write",
              title: "Opinion essay",
              prompt: "Some people believe that university education should be free for all students. To what extent do you agree or disagree? Give reasons for your answer and include relevant examples from your own knowledge or experience. Write at least 250 words.",
              image: "graduation",
              minWords: 250,
              maxWords: 320,
              tips: ["Intro: paraphrase + I strongly / partly agree that … because …", "Body 1: The main reason is that … For example, …", "Body 2: Furthermore, … In Indonesia, for instance, …", "Conclusion: In conclusion, I believe … because …"],
              models: [{ label: "Band 6.5–7 model", text: "Whether higher education should be provided free of charge is a widely debated issue. I largely agree that university should be free, as it promotes equal opportunity and benefits society as a whole.\nThe main reason is fairness. When students must pay high fees, talented young people from low-income families may be unable to continue their studies, regardless of their ability. In Indonesia, for example, many capable students from rural areas choose to work immediately after high school because their families cannot afford tuition. Free education would allow these students to develop their potential.\nFurthermore, an educated population brings long-term benefits to the whole country. Graduates are more likely to find skilled jobs, pay higher taxes and contribute to innovation in areas such as healthcare and technology. In this sense, the cost of free tuition can be seen as an investment rather than an expense.\nAdmittedly, free university places would place a heavy burden on public budgets. However, this could be managed by linking free tuition to academic performance or by asking graduates with high incomes to contribute later through taxes.\nIn conclusion, I believe university education should be free for all qualified students, because it creates fairer opportunities and strengthens the economy in the long term." }],
              rubric: ["My position is clear in the introduction and conclusion.", "Each body paragraph has one main idea with explanation and an example.", "I used linking words accurately (Furthermore, However, For example).", "I used topic-specific vocabulary (tuition, low-income, investment).", "I wrote at least 250 words."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("ielts-b2-l3-c1", "“To what extent do you agree or disagree?” asks you to…", ["give and support your own position", "describe a chart", "only list advantages", "tell a story"], 0, "Opini dengan dukungan."),
        pick("ielts-b2-l3-c2", "Which is the best topic sentence for a body paragraph?", ["The main reason is that free education promotes equal opportunity.", "There are many universities in Indonesia.", "I went to school yesterday."], 0, "Topic sentence jelas."),
        pickMany("ielts-b2-l3-c3", "Choose ALL four Writing assessment criteria.", ["Task Response", "Coherence and Cohesion", "Lexical Resource", "Grammatical Range and Accuracy", "Handwriting Style"], [0, 1, 2, 3], "Kriteria Task 2."),
        fill("ielts-b2-l3-c4", "Complete: ___, free places would be expensive for the government. (Memang harus diakui)", "", ", free places would be expensive for the government.", ["Admittedly", "admittedly"], "Admittedly = konsesi.", { translate: true }),
        trPick("ielts-b2-l3-c5", "“Biaya kuliah” in English is…", ["tuition fees", "teaching price", "college money cost"], 0, "Tuition fees."),
        pick("ielts-b2-l3-c6", "An essay discusses only the advantages of free education but never says whether the writer agrees. What is the main problem?", ["Weak Task Response: no clear position", "Too many examples", "Too formal"], 0, "Posisi wajib jelas.", { hots: true }),
      ],
    },
    {
      id: "ielts-b2-l4",
      skill: "speaking",
      title: "Speaking Part 2: The Long Turn",
      summary: "Using one minute to prepare notes and speaking for up to two minutes on a cue card.",
      sections: [
        {
          title: "Prepare in one minute",
          blocks: [
            text("**Cue card:** Describe a place in your country that you would recommend to visitors. You should say: where it is; how you know about it; what people can do there; and explain why you would recommend it."),
            table(["Note-taking tip", "Example notes"], [["write key words only", "Bromo – E. Java – trip 2024 – sunrise, jeep, crater"], ["use the bullet points as structure", "where → how → what → why"], ["add one story or detail", "freezing at 3 a.m., worth it"], ["plan an ending", "unforgettable / should see it once"]]),
            tip("Bicara sampai pemeriksa menghentikanmu (biasanya 2 menit). Kalau kehabisan ide, tambahkan **cerita pribadi**, **perasaan**, atau **perbandingan**."),
          ],
        },
        {
          title: "Model and practice",
          blocks: [
            audio("Model long turn", say(["woman", "I'd like to talk about Mount Bromo in East Java, which is one of the most spectacular places I've ever been to. I first heard about it from my cousin, who showed me his sunrise photos, and I went there myself two years ago with my family. Most visitors get up at around three in the morning and take a jeep to a viewpoint to watch the sunrise. It's absolutely freezing, but when the sun appears and lights up the volcano and the sea of sand, it's breathtaking. After that, you can walk up the steps to the edge of the crater and look inside. I'd recommend it because it combines adventure, nature and local culture. The Tenggerese people who live there are very welcoming, and if you're lucky, you might see their traditional ceremony. Honestly, I think everyone should see it at least once."])),
            pics([["mountain", "volcano"], ["camera", "sunrise photos"], ["car", "jeep ride"], ["cold", "freezing morning"]]),
            speaking({
              id: "ielts-b2-l4-say",
              title: "Cue card practice",
              prompt: "Describe a place in your country that you would recommend to visitors. You should say: where it is; how you know about it; what people can do there; and explain why you would recommend it. (1 minute to prepare, then speak for up to 2 minutes.)",
              image: "map",
              prepSeconds: 60,
              seconds: 120,
              tips: ["I'd like to talk about …, which is …", "I first heard about it from …", "One thing you can do there is …", "What I love most is …", "I'd definitely recommend it because …"],
              models: [{ label: "Notes example", text: "Lake Toba – N. Sumatra – school trip Grade 8 – boat to Samosir, Batak houses, swimming – peaceful, culture, cheap – recommend: nature + history" }],
              rubric: ["I covered all the bullet points.", "I spoke for close to two minutes without long pauses.", "I used descriptive vocabulary (breathtaking, peaceful…).", "I included a personal detail or story.", "My answer had a clear beginning and ending."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("ielts-b2-l4-c1", voice("It's absolutely freezing, but when the sun appears, it's breathtaking."), "Listen. How does the speaker feel about the sunrise?", ["amazed", "bored", "disappointed"], 0, "Breathtaking = menakjubkan."),
        pick("ielts-b2-l4-c2", "How long can you speak in Part 2?", ["up to two minutes", "up to ten minutes", "about thirty seconds"], 0, "1–2 menit."),
        pick("ielts-b2-l4-c3", "What is the best way to use the preparation time?", ["Write key words for each bullet point", "Write a full script", "Do nothing"], 0, "Catat kata kunci."),
        match("ielts-b2-l4-c4", "Match the plain word and a stronger alternative.", [["very cold", "freezing"], ["very beautiful", "breathtaking"], ["very big", "enormous"], ["very tired", "exhausted"]], "Kosakata kuat."),
        trPick("ielts-b2-l4-c5", "“Saya sangat merekomendasikannya.” in English is…", ["I'd highly recommend it.", "I'd recommend highly to it.", "I very recommend it."], 0, "Highly recommend."),
        pick("ielts-b2-l4-c6", "You run out of ideas after one minute. What is the best strategy?", ["Add a personal story or describe your feelings", "Stop and say “That's all”", "Repeat the first sentence"], 0, "Kembangkan dengan cerita.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ielts-b2-post",
    title: "Level 2 Mock Quiz",
    passPercent: 70,
    passages: [BAMBOO],
    questions: [
      listen("ielts-b2-post1", say(["man", "The swimming pool is beyond the tennis courts, at the far end of the park."]), "Listen. Where is the swimming pool?", ["past the tennis courts, at the far end", "before the tennis courts", "next to the entrance", "opposite the café"], 0, "Beyond = melewati."),
      listen("ielts-b2-post2", say(["woman", "Volunteers used to meet on Mondays, but now the meetings are on Wednesday evenings, because more people are free then."]), "Listen. When do volunteers meet now?", ["Wednesday evenings", "Monday evenings", "Monday mornings", "every day"], 0, "Used to … but now.", { hots: true }),
      listen("ielts-b2-post3", say(["man", "You'll need to bring a hat and sunscreen. Lunch is provided, so there's no need to bring food."]), "Listen. What do participants NOT need to bring?", ["food", "a hat", "sunscreen", "water"], 0, "Lunch is provided."),
      tfng("ielts-b2-post4", "Bamboo has been used in Asia for thousands of years.", "TRUE", "Paragraf A.", { passageId: BAMBOO.id }),
      tfng("ielts-b2-post5", "Timber trees grow faster than bamboo.", "FALSE", "Paragraf B: sebaliknya.", { passageId: BAMBOO.id }),
      tfng("ielts-b2-post6", "The bamboo buildings in Bali were expensive to build.", "NOT GIVEN", "Biaya tidak disebut.", { passageId: BAMBOO.id }),
      pick("ielts-b2-post7", "Which heading best fits paragraph D?", ["Overcoming a weakness", "Why bamboo grows so fast", "International attention", "A material for the poor"], 0, "Solusi atas kelemahan.", { passageId: BAMBOO.id }),
      pick("ielts-b2-post8", "What does the writer suggest in paragraph F?", ["People's attitudes need to change as well as technology.", "Bamboo should only be used by the poor.", "Technology has failed.", "Bamboo is not durable."], 0, "Persepsi sama pentingnya.", { passageId: BAMBOO.id, hots: true }),
      pick("ielts-b2-post9", "Which sentence is the best introduction to an opinion essay?", ["It is often argued that public transport should be free. I partly agree, as it would reduce traffic but could be costly.", "Public transport. I will write about it.", "In this essay I will write 250 words."], 0, "Parafrase + posisi."),
      pick("ielts-b2-post10", "In Speaking Part 2, which opening is most natural?", ["I'd like to talk about a café near my school that I often visit with my friends.", "Number one: where it is.", "I don't know any places."], 0, "Pembuka alami."),
    ],
  },
  live: {
    title: "Live Quiz — Band 5 Booster",
    questions: [
      live("ielts-b2-live1", "Part 2 preparation time:", ["1 minute", "5 minutes", "none", "30 seconds"], 0, "clock"),
      live("ielts-b2-live2", "Task 2 minimum words:", ["250", "150", "200", "300"], 0, "pencil"),
      live("ielts-b2-live3", "“Opposite” means…", ["facing", "next to", "behind", "under"], 0, "map"),
      live("ielts-b2-live4", "Matching headings = find the…", ["main idea", "longest word", "first number", "author's name"], 0, "open-book"),
      live("ielts-b2-live5", "“Biaya kuliah” =", ["tuition fees", "taxi fare", "travel cost", "rent"], 0, "money", true),
      live("ielts-b2-live6", "Stronger than “very beautiful”:", ["breathtaking", "nice", "okay", "pretty good"], 0, "mountain"),
      live("ielts-b2-live7", "Concession word:", ["Admittedly", "Firstly", "Finally", "For example"], 0, "owl-think"),
      live("ielts-b2-live8", "Exact same word in a heading is often a…", ["trap", "guarantee", "rule", "bonus"], 0, "question"),
    ],
  },
};

