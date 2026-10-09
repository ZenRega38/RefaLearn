import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 11 (SMA, Fase F). Chapter 3 — What If? (conditionals) · Chapter 4 — Call to Action (hortatory exposition)

const ESSAY: Passage = {
  id: "sma11-c3-essay",
  title: "If I Had Listened to My Grandmother",
  pic: "grandmother",
  lines: [
    "When I was fourteen, my grandmother offered to teach me how to weave songket. I said no, because I thought it was old-fashioned and boring.",
    "She told me, “If you learn now, your hands will remember forever.” I laughed and went back to my phone.",
    "Two years later, she passed away. Her loom stood silent in the corner of our house, with half of a red and gold cloth still on it.",
    "Last month, a museum in Palembang asked our family to finish the cloth for an exhibition about women weavers. Nobody in the family knew how.",
    "If I had listened to my grandmother, I would have been able to finish her last songket myself.",
    "Now I am taking weaving lessons from a woman in the next village. My fingers are slow, and I make many mistakes. If my grandmother were here, she would laugh at me, and then she would patiently show me again.",
    "I often think: if I master this skill, I will teach my younger cousins, so that the knowledge doesn't disappear with our generation.",
    "Unless young people learn these crafts, they will be lost forever. I learned that lesson too late, but maybe you won't.",
  ],
};

export const CH3: Level = {
  id: "sma11-ch3",
  title: "Chapter 3 — What If?",
  description: "Use zero, first, second, third and mixed conditionals, unless, provided that and as long as, express regrets and imagine alternatives, and write a reflective essay.",
  targetScore: "Structure · Speaking · Writing",
  cover: ["owl-think", "question", "grandmother"],
  pretest: {
    id: "sma11-c3-pre",
    title: "Chapter 3 Pretest",
    passPercent: 0,
    questions: [
      pick("sma11-c3-pre1", "If I ___ rich, I would build a free library in my village.", ["were", "am", "will be", "had been"], 0, "Second conditional: If + past (were)."),
      listen("sma11-c3-pre2", voice("If I had left home earlier, I wouldn't have missed the train."), "Listen. Did the speaker miss the train?", ["Yes, he did.", "No, he didn't.", "We don't know."], 0, "Third conditional = kenyataannya ketinggalan."),
      trPick("sma11-c3-pre3", "“Kecuali kamu belajar, kamu akan gagal.” in English is…", ["Unless you study, you will fail.", "Unless you don't study, you fail.", "Except you study, you will fail.", "If you study, you will fail."], 0, "Unless = if not."),
      pick("sma11-c3-pre4", "If you heat ice, it ___.", ["melts", "will melted", "would melt", "melted"], 0, "Zero conditional: fakta umum."),
      pick("sma11-c3-pre5", "Which sentence is about an imaginary present situation?", ["If I lived in Bali, I would surf every day.", "If it rains, we will stay home.", "If you mix red and blue, you get purple.", "If I had studied, I would have passed."], 0, "Second conditional."),
    ],
  },
  lessons: [
    {
      id: "sma11-c3-l1",
      skill: "structure",
      title: "The Conditional System",
      summary: "Zero, first, second and third conditionals: form, meaning and time.",
      sections: [
        {
          title: "Four main types",
          blocks: [
            table(["Type", "Form", "Meaning", "Example"], [["Zero", "If + present, present", "general truth", "If you heat water to 100°C, it boils."], ["First", "If + present, will + verb", "real possibility (future)", "If it rains, the match will be cancelled."], ["Second", "If + past, would + verb", "unreal / imaginary (now or future)", "If I had wings, I would fly to Papua."], ["Third", "If + had + V3, would have + V3", "unreal past (regret)", "If she had studied, she would have passed."]]),
            text("Catatan: pada **second conditional**, bentuk **were** dipakai untuk semua subjek dalam bahasa formal (*If I were you…, If she were here…*). Modal lain juga bisa: *could, might* (*If I had more time, I might join the club*)."),
            repeat(["If you mix yellow and blue, you get green.", "If I finish early, I'll call you.", "If I were the president, I would build more schools.", "If we had left earlier, we would have caught the ferry."]),
          ],
        },
        {
          title: "Check the meaning",
          blocks: [
            examples([{ right: "If I win the scholarship, I'll study in Japan.", note: "Mungkin terjadi (sudah mendaftar)." }, { right: "If I won the scholarship, I'd study in Japan.", note: "Lebih tidak mungkin / hanya membayangkan." }, { right: "If I had won the scholarship, I'd have studied in Japan.", note: "Tidak menang (masa lalu)." }], "Same idea, different reality"),
            warn("Jangan pakai **will/would** di klausa *if*: *If I will see him* ❌ → *If I see him* ✅; *If I would have known* ❌ → *If I had known* ✅."),
            tryIt(pick("sma11-c3-l1-try1", "“If I had known about the party, I would have come.” Did the speaker know?", ["No.", "Yes.", "Maybe."], 0, "Third conditional = kebalikan kenyataan.")),
          ],
        },
      ],
      checkpoint: [
        listen("sma11-c3-l1-c1", voice("If I were you, I would talk to the teacher about it."), "Listen. What is the speaker doing?", ["giving advice", "remembering the past", "stating a fact"], 0, "If I were you = saran."),
        pick("sma11-c3-l1-c2", "If we ___ the bus now, we'll arrive on time.", ["catch", "caught", "will catch"], 0, "First conditional."),
        pick("sma11-c3-l1-c3", "If he ___ harder last year, he would have passed.", ["had worked", "worked", "would work"], 0, "Third conditional."),
        fill("sma11-c3-l1-c4", "Complete: If I ___ (have) a million rupiah, I would buy books.", "If I", "a million rupiah, I would buy books.", ["had"], "Second conditional: past simple."),
        match("sma11-c3-l1-c5", "Match the type and the meaning.", [["zero", "general truth"], ["first", "real future possibility"], ["second", "imaginary present"], ["third", "imaginary past"]], "Tipe kondisional."),
        pick("sma11-c3-l1-c6", "Which sentence suggests the speaker thinks winning is UNLIKELY?", ["If I won the lottery, I'd travel the world.", "If I win the lottery, I'll travel the world.", "When I win the lottery, I travel."], 0, "Second conditional = kecil kemungkinannya.", { hots: true }),
      ],
    },
    {
      id: "sma11-c3-l2",
      skill: "speaking",
      title: "Mixed Conditionals, Unless and Alternatives",
      summary: "Mixed time conditionals; unless, as long as, provided that, otherwise; speaking about hypothetical situations.",
      sections: [
        {
          title: "Mixed conditionals and alternatives to if",
          blocks: [
            table(["Pattern", "Example", "Meaning"], [["Past → present result", "If I had taken that job, I would be rich now.", "masa lalu berbeda → sekarang berbeda"], ["Present → past result", "If I were braver, I would have spoken up yesterday.", "sifat sekarang → kejadian lampau"], ["unless", "Unless it rains, we'll go.", "= if it doesn't rain"], ["as long as / provided that", "You can borrow it as long as you return it.", "dengan syarat"], ["otherwise", "Hurry up, otherwise we'll be late.", "kalau tidak"], ["Inversion (formal)", "Had I known, I would have helped.", "= If I had known"]]),
            pics([["owl-think", "What if…?"], ["clock", "past"], ["calendar", "present"], ["target", "future"]]),
          ],
        },
        {
          title: "Hypothetical questions",
          blocks: [
            audio("Would you rather…?", say(["woman", "What would you do if you could live anywhere in Indonesia?"], ["man", "I'd live in Labuan Bajo. If I lived there, I'd go diving every weekend. What about you?"], ["woman", "If I had the choice, I'd stay in Yogyakarta. But if I hadn't grown up here, I might have chosen Bali."], ["man", "And if you had a whole year off school?"], ["woman", "I'd learn to cook from my grandmother, as long as she agreed to teach me!"])),
            tryIt(pick("sma11-c3-l2-try1", "Where would the boy live?", ["Labuan Bajo", "Yogyakarta", "Bali"], 0, "I'd live in Labuan Bajo.")),
            speaking({
              id: "sma11-c3-l2-say",
              title: "What would you do?",
              prompt: "Answer three questions with full conditional sentences: (1) What would you do if you were the Minister of Education for one day? (2) What would you have done differently in junior high school? (3) What will you do if you get good results this semester?",
              image: "owl-think",
              prepSeconds: 45,
              seconds: 90,
              tips: ["If I were the Minister, I would …", "If I had …, I would have …", "If I get …, I will …", "as long as / unless / otherwise"],
              models: [{ label: "Example", text: "If I were the Minister of Education for one day, I would make sure every school had clean toilets and fast internet, because students can't learn well without them. Looking back, if I had joined the debate club in junior high school, I would be more confident now. I was too shy. And this semester, if I get good results, I will ask my parents to let me take an English course, as long as it's not too expensive. Otherwise, I'll keep learning with free apps." }],
              rubric: ["I used second, third and first conditionals correctly.", "I used at least one of unless / as long as / otherwise.", "I gave reasons for my answers.", "I spoke fluently with natural contractions (I'd, I'll)."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sma11-c3-l2-c1", voice("If I hadn't missed the flight, I would be in Bali now."), "Listen. Where is the speaker now?", ["not in Bali", "in Bali", "on the plane"], 0, "Mixed conditional."),
        pick("sma11-c3-l2-c2", "You can use my laptop ___ you don't install any games.", ["as long as", "unless", "otherwise"], 0, "Dengan syarat."),
        pick("sma11-c3-l2-c3", "___ you hurry, you'll miss the bus.", ["Unless", "As long as", "Provided"], 0, "Unless = if not."),
        fill("sma11-c3-l2-c4", "Complete: ___ I known, I would have helped. (formal inversion)", "", "I known, I would have helped.", ["Had", "had"], "Had I known = If I had known."),
        trPick("sma11-c3-l2-c5", "“Seandainya dulu aku belajar bahasa Jepang, sekarang aku bisa bekerja di Tokyo.” in English is…", ["If I had learned Japanese, I could work in Tokyo now.", "If I learned Japanese, I could have worked in Tokyo now.", "If I learn Japanese, I will work in Tokyo before."], 0, "Mixed: past → present."),
        pick("sma11-c3-l2-c6", "Which sentence means “I'm not tall, so I wasn't chosen for the team last week”?", ["If I were taller, I would have been chosen.", "If I had been taller, I will be chosen.", "If I am taller, I would be chosen."], 0, "Present → past.", { hots: true }),
      ],
    },
    {
      id: "sma11-c3-l3",
      skill: "reading",
      title: "Reading: If I Had Listened to My Grandmother",
      summary: "A reflective essay about regret and responsibility; writing your own reflection.",
      passages: [ESSAY],
      sections: [
        {
          title: "The essay",
          blocks: [
            { type: "passage", passage: ESSAY },
            audio("Listen and read", say(["woman", ESSAY.lines.join(" ")])),
            vocab([["weave", "menenun", "shirt"], ["loom", "alat tenun", "house"], ["old-fashioned", "kuno/ketinggalan zaman", "grandmother"], ["master (a skill)", "menguasai", "trophy"], ["craft", "kerajinan", "palette"]], "Words from the text"),
          ],
        },
        {
          title: "Write a reflection",
          blocks: [
            tryIt(pick("sma11-c3-l3-try1", "What did the grandmother offer to teach?", ["how to weave songket", "how to cook rendang", "how to play gamelan"], 0, "Baris 1.", { passageId: ESSAY.id })),
            writing({
              id: "sma11-c3-l3-write",
              title: "A reflective essay",
              prompt: "Write a reflective essay about a decision or a missed chance in your life. Explain what happened, how it affected you, what would have happened if you had acted differently, and what you will do now. Use at least four different conditional structures.",
              image: "owl-think",
              minWords: 220,
              maxWords: 350,
              tips: ["Situation: When I was …, I …", "Consequence: Because of that, …", "Imagining: If I had …, I would have … / I would be … now.", "Present: If I were …, I would …", "Future: If I …, I will … / Unless …, …", "Lesson learned"],
              models: [{ label: "Example", text: "In Grade 9, my friend Kevin asked me to join a provincial science competition with him. I refused because I was afraid of failing in front of other students.\nKevin found another partner, and their project on low-cost water filters won second place. They were invited to present it at a national event in Jakarta. If I had said yes, I would have been there too. More importantly, I would have learned how to design and test a real project.\nFor months, I felt angry with myself. If I were less afraid of mistakes, I would try more new things. I realised that my fear was making my world smaller.\nThis year, I joined the school research club. My first experiment failed completely, but my teacher said that failure is just data. If I keep practising, I will be ready to enter a competition next semester.\nI have learned that opportunities do not always come twice. Unless we take some risks, we will never know what we are capable of." }],
              rubric: ["I described the situation and its consequences.", "I used at least four conditional structures correctly (including third or mixed).", "I reflected honestly on my feelings.", "I explained what I learned and what I will do.", "My essay is well organised with clear paragraphs."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sma11-c3-l3-c1", "Why did the writer refuse at first?", ["They thought weaving was old-fashioned and boring.", "They had no time.", "They didn't like their grandmother."], 0, "Baris 1.", { passageId: ESSAY.id }),
        pick("sma11-c3-l3-c2", "What did the museum ask the family to do?", ["finish the cloth for an exhibition", "sell the loom", "teach weaving classes"], 0, "Baris 4.", { passageId: ESSAY.id }),
        fill("sma11-c3-l3-c3", "Complete.", "If I had listened to my grandmother, I would have been able to finish her last", "myself.", ["songket"], "Baris 5.", { passageId: ESSAY.id }),
        pickMany("sma11-c3-l3-c4", "Choose ALL the lines that use a conditional.", ["line 2", "line 5", "line 6", "line 3"], [0, 1, 2], "Baris 3 tidak memakai if.", { passageId: ESSAY.id }),
        pick("sma11-c3-l3-c5", "What type of conditional is used in line 5, and why?", ["Third conditional, because it describes an unreal past and a regret.", "First conditional, because it is a plan.", "Zero conditional, because it is a fact."], 0, "Penyesalan masa lalu.", { passageId: ESSAY.id, hots: true }),
        pick("sma11-c3-l3-c6", "What is the writer's final message to readers?", ["Learn traditional crafts before it is too late.", "Never use your phone.", "Museums are boring."], 0, "Baris 8.", { passageId: ESSAY.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma11-c3-post",
    title: "Chapter 3 Posttest",
    passPercent: 70,
    passages: [ESSAY],
    questions: [
      pick("sma11-c3-post1", "If I ___ you, I'd apologise.", ["were", "am", "will be", "had"], 0, "If I were you."),
      listen("sma11-c3-post2", voice("Unless we reduce plastic use, our seas will be full of rubbish by 2050."), "Listen. What is the condition?", ["reducing plastic use", "cleaning the seas in 2050", "buying more plastic", "building more ships"], 0, "Unless = if we don't."),
      trPick("sma11-c3-post3", "“Asalkan kamu pulang sebelum jam 9, kamu boleh pergi.” in English is…", ["As long as you're home before 9, you can go.", "Unless you're home before 9, you can go.", "If you're home after 9, you can go.", "Otherwise you're home, you go."], 0, "As long as = asalkan."),
      pick("sma11-c3-post4", "If she ___ the alarm, she wouldn't have been late.", ["had heard", "heard", "hears", "would hear"], 0, "Third conditional."),
      arrange("sma11-c3-post5", "Put the words in order.", "If it rains we will stay at home", "First conditional."),
      pick("sma11-c3-post6", "Where is the writer now learning to weave?", ["from a woman in the next village", "at a museum", "at school", "online"], 0, "Baris 6.", { passageId: ESSAY.id }),
      match("sma11-c3-post7", "Match the sentence and the conditional type.", [["If you freeze water, it becomes ice.", "zero"], ["If you call me, I'll answer.", "first"], ["If I had a car, I'd drive you.", "second"], ["If I had seen you, I'd have waved.", "third"]], "Tipe kondisional."),
      fill("sma11-c3-post8", "Complete.", "If my grandmother were here, she would laugh at me, and then she would", "show me again.", ["patiently"], "Baris 6.", { passageId: ESSAY.id }),
      pick("sma11-c3-post9", "What is the writer's plan in line 7?", ["to teach younger cousins after mastering the skill", "to sell songket online", "to open a museum", "to stop weaving"], 0, "First conditional untuk rencana.", { passageId: ESSAY.id, hots: true }),
      pick("sma11-c3-post10", "How does the writer feel about the past decision?", ["regretful but motivated to change", "proud", "indifferent", "angry at the grandmother"], 0, "Menyesal tetapi bertindak.", { passageId: ESSAY.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — What If?",
    questions: [
      live("sma11-c3-live1", "If I ___ you, I'd go.", ["were", "am", "be", "was being"], 0, "owl-think"),
      live("sma11-c3-live2", "Third conditional result:", ["would have + V3", "will + V1", "would + V1", "present"], 0, "clock"),
      live("sma11-c3-live3", "Unless = if …", ["not", "so", "yes", "only"], 0, "question"),
      live("sma11-c3-live4", "“Asalkan” =", ["as long as", "as soon as", "as well as", "as far as"], 0, "thumbs-up", true),
      live("sma11-c3-live5", "If you heat ice, it ___.", ["melts", "will melted", "would melt", "melted"], 0, "hot"),
      live("sma11-c3-live6", "Had I known = If I…", ["had known", "knew", "know", "would know"], 0, "open-book"),
      live("sma11-c3-live7", "If it rains, we ___ stay home.", ["will", "would", "had", "were"], 0, "rain"),
      live("sma11-c3-live8", "Songket is…", ["a woven cloth", "a food", "a dance", "a song"], 0, "palette"),
    ],
  },
};

const CYCLE: Passage = {
  id: "sma11-c4-cycle",
  title: "Our City Must Build Safe Cycling Lanes",
  pic: "bicycle",
  lines: [
    "Every day, millions of Indonesians spend hours stuck in traffic, breathing polluted air. One simple, affordable solution has been ignored for too long: cycling. Our city government must build a network of safe, protected cycling lanes.",
    "First, cycling is good for public health. According to the World Health Organization, regular physical activity reduces the risk of heart disease, diabetes and depression. A 20-minute ride to school or work is an easy way to stay active.",
    "Second, more bicycles mean less pollution and less congestion. A single lane of road can move many more people on bicycles than in private cars, and bicycles produce no exhaust fumes.",
    "Third, cycling saves money. A family that replaces one motorbike trip a day with cycling can save hundreds of thousands of rupiah on fuel every month.",
    "However, many people are afraid to cycle because they have to share the road with fast cars and trucks. This is exactly why protected lanes, separated from traffic by a barrier, are essential.",
    "Cities such as Copenhagen and Bogotá have shown that when safe infrastructure is built, people start cycling in large numbers.",
    "Therefore, the city government should build protected cycling lanes on main roads, provide secure bicycle parking at schools and markets, and run campaigns to encourage cycling.",
    "Schools and companies ought to reward people who cycle, and all of us should try cycling for short trips at least once a week. If we act together, our streets can become cleaner, safer and healthier for everyone.",
  ],
};

export const CH4: Level = {
  id: "sma11-ch4",
  title: "Chapter 4 — Call to Action",
  description: "Analyse and write hortatory exposition texts with a thesis, arguments and recommendations, use modals of obligation and recommendation, and evaluate persuasive techniques.",
  targetScore: "Reading · Writing · Speaking",
  cover: ["bicycle", "earth", "microphone"],
  pretest: {
    id: "sma11-c4-pre",
    title: "Chapter 4 Pretest",
    passPercent: 0,
    questions: [
      pick("sma11-c4-pre1", "A hortatory exposition ends with a…", ["recommendation", "resolution", "reorientation", "re-identification"], 0, "Hortatory = ada saran/ajakan."),
      listen("sma11-c4-pre2", voice("The government should provide free school meals for all primary school students."), "Listen. What does the speaker recommend?", ["free school meals", "free bicycles", "free books", "free uniforms"], 0, "Free school meals."),
      trPick("sma11-c4-pre3", "“Oleh karena itu, pemerintah harus…” in English is…", ["Therefore, the government must…", "However, the government must…", "Although the government must…", "Because the government must…"], 0, "Therefore."),
      pick("sma11-c4-pre4", "Which modal shows the STRONGEST obligation?", ["must", "might", "could", "may"], 0, "Must = harus."),
      pick("sma11-c4-pre5", "What is the main difference between analytical and hortatory exposition?", ["Hortatory exposition tells readers what should be done.", "Hortatory exposition has no arguments.", "Analytical exposition is a story.", "There is no difference."], 0, "Hortatory = ajakan bertindak."),
    ],
  },
  lessons: [
    {
      id: "sma11-c4-l1",
      skill: "reading",
      title: "Reading: Our City Must Build Safe Cycling Lanes",
      summary: "The generic structure and persuasive strategies of hortatory exposition.",
      passages: [CYCLE],
      sections: [
        {
          title: "The text",
          blocks: [
            { type: "passage", passage: CYCLE },
            audio("Listen and read", say(["man", CYCLE.lines.join(" ")])),
            vocab([["congestion", "kemacetan", "traffic"], ["exhaust fumes", "asap knalpot", "car"], ["infrastructure", "prasarana", "traffic-light"], ["protected lane", "jalur terlindung", "bicycle"], ["encourage", "mendorong", "thumbs-up"]], "Words from the text"),
          ],
        },
        {
          title: "Structure",
          blocks: [
            table(["Part", "Function", "Lines"], [["Thesis", "the issue and the writer's position", "1"], ["Arguments", "reasons with evidence (health, environment, money)", "2–4"], ["Counter-argument + response", "answering a concern", "5"], ["Supporting example", "evidence from other cities", "6"], ["Recommendation", "what specific people should do", "7–8"]]),
            table(["Analytical exposition", "Hortatory exposition"], [["Thesis → Arguments → Reiteration", "Thesis → Arguments → Recommendation"], ["persuades that something IS the case", "persuades that something SHOULD BE DONE"], ["ends by restating the opinion", "ends with specific actions for specific people"]]),
            tryIt(pick("sma11-c4-l1-try1", "What does the writer want the government to build?", ["protected cycling lanes", "more car parks", "wider highways"], 0, "Baris 1.", { passageId: CYCLE.id })),
          ],
        },
      ],
      checkpoint: [
        pick("sma11-c4-l1-c1", "What evidence supports the health argument?", ["information from the World Health Organization", "the writer's personal opinion only", "a story about a cyclist"], 0, "Baris 2.", { passageId: CYCLE.id }),
        pick("sma11-c4-l1-c2", "Why are many people afraid to cycle?", ["They have to share the road with fast cars and trucks.", "Bicycles are expensive.", "It is too cold."], 0, "Baris 5.", { passageId: CYCLE.id }),
        fill("sma11-c4-l1-c3", "Complete.", "provide secure bicycle", "at schools and markets", ["parking"], "Baris 7.", { passageId: CYCLE.id }),
        pickMany("sma11-c4-l1-c4", "Choose ALL the recommendations in the text.", ["build protected cycling lanes", "provide bicycle parking", "run campaigns", "ban all cars"], [0, 1, 2], "Baris 7.", { passageId: CYCLE.id }),
        pick("sma11-c4-l1-c5", "Why does the writer mention Copenhagen and Bogotá?", ["to prove that safe infrastructure leads to more cycling", "to recommend holidays there", "to compare their weather"], 0, "Bukti pendukung.", { passageId: CYCLE.id, hots: true }),
        pick("sma11-c4-l1-c6", "Who are the recommendations addressed to?", ["the city government, schools, companies and citizens", "only tourists", "only bicycle shops"], 0, "Baris 7–8.", { passageId: CYCLE.id, hots: true }),
      ],
    },
    {
      id: "sma11-c4-l2",
      skill: "structure",
      title: "The Language of Persuasion",
      summary: "Modals of obligation and recommendation, emotive language, rhetorical questions and hedging.",
      sections: [
        {
          title: "Modals and recommendations",
          blocks: [
            table(["Strength", "Expression", "Example"], [["very strong", "must / have to / it is essential that", "The city must act now."], ["strong", "should / ought to", "Schools should reward cyclists."], ["polite", "It is recommended that … / It would be wise to …", "It is recommended that every school provide bike racks."], ["passive (formal)", "… should be built / must be enforced", "Protected lanes should be built on main roads."]]),
            text("Struktur formal: **It is essential/important/vital that + subject + base verb** (*It is essential that the government **act** quickly*)."),
          ],
        },
        {
          title: "Persuasive techniques",
          blocks: [
            table(["Technique", "Example", "Effect"], [["Facts and statistics", "Cycling can save Rp300,000 a month.", "makes it believable"], ["Expert opinion", "According to the WHO, …", "adds authority"], ["Rhetorical question", "Do we really want our children to breathe this air?", "makes readers think"], ["Emotive language", "a traffic nightmare, deadly fumes", "creates feelings"], ["Inclusive language", "we, us, our city", "builds unity"], ["Rule of three", "cleaner, safer and healthier", "memorable rhythm"]]),
            examples([{ right: "Hedging: This may suggest that… / It is likely that…", note: "membuat klaim lebih hati-hati dan akademis" }, { wrong: "Everyone hates traffic and only stupid people drive.", right: "Many commuters are frustrated by long traffic jams.", note: "hindari serangan dan generalisasi" }]),
            tryIt(pick("sma11-c4-l2-try1", "“Cleaner, safer and healthier” is an example of…", ["the rule of three", "a statistic", "a rhetorical question"], 0, "Tiga kata berirama.")),
          ],
        },
      ],
      checkpoint: [
        listen("sma11-c4-l2-c1", voice("Do we really want our children to grow up in cities where they cannot breathe?"), "Listen. What technique is this?", ["a rhetorical question", "a statistic", "an expert opinion"], 0, "Pertanyaan retoris."),
        pick("sma11-c4-l2-c2", "It is essential that every student ___ a helmet.", ["wear", "wears", "to wear"], 0, "Subjunctive: base verb."),
        match("sma11-c4-l2-c3", "Match the technique and the example.", [["statistic", "70% of students walk to school."], ["expert opinion", "According to doctors, …"], ["inclusive language", "Together, we can change our city."], ["emotive language", "a heartbreaking tragedy"]], "Teknik persuasi."),
        fill("sma11-c4-l2-c4", "Complete (passive): Rubbish bins should ___ placed every 50 metres.", "Rubbish bins should", "placed every 50 metres.", ["be"], "Should be + V3."),
        trPick("sma11-c4-l2-c5", "“Sangat penting bahwa pemerintah bertindak.” in English is…", ["It is vital that the government act.", "It is vital the government acts to.", "Very important government act."], 0, "It is vital that + base verb."),
        pick("sma11-c4-l2-c6", "Which sentence is the most convincing for a formal hortatory text?", ["Research shows that protected lanes reduce cyclist injuries, so they should be built on all main roads.", "Everybody knows bikes are the best!!!", "Only lazy people use motorbikes."], 0, "Bukti + rekomendasi, tanpa serangan.", { hots: true }),
      ],
    },
    {
      id: "sma11-c4-l3",
      skill: "writing",
      title: "Write and Deliver a Hortatory Exposition",
      summary: "Writing a persuasive essay and delivering it as a speech.",
      sections: [
        {
          title: "Topics and planning",
          blocks: [
            pics([["bicycle", "transport"], ["trash", "waste"], ["smartphone", "screen time"], ["food-stall", "healthy canteens"]]),
            table(["Possible topic", "Possible audience"], [["Schools should ban sugary drinks in canteens.", "headmaster, canteen owners, parents"], ["Teenagers should limit social media to 2 hours a day.", "students, parents"], ["Our village should have a waste bank.", "village head, residents"], ["Every school should have a counsellor.", "local education office"]]),
            tip("Rekomendasi harus **spesifik**: siapa, melakukan apa, kapan. *The canteen should replace sweet drinks with water and fruit juice by next semester* lebih kuat daripada *We should be healthy*."),
          ],
        },
        {
          title: "Write and speak",
          blocks: [
            writing({
              id: "sma11-c4-l3-write",
              title: "My hortatory exposition",
              prompt: "Write a hortatory exposition on a local issue. Include a thesis, at least three arguments with evidence, a counter-argument with a response, and specific recommendations for specific people.",
              image: "report",
              minWords: 260,
              maxWords: 380,
              tips: ["Thesis: … must/should …", "Argument 1–3 with facts, examples or expert opinion", "Counter-argument: Some may argue that … However, …", "Recommendations: Therefore, … should … / It is recommended that …", "Final call: If we …, …"],
              models: [{ label: "Example", text: "Our School Canteen Should Stop Selling Sugary Drinks\nEvery break time, long queues form in front of our canteen fridge, which is full of sweet tea, soda and energy drinks. I believe our school must stop selling sugary drinks and offer healthier choices instead.\nFirstly, sugary drinks are a major cause of obesity and type 2 diabetes. According to the Indonesian Ministry of Health, diabetes is increasingly found in young people. One bottle of sweet tea can contain more sugar than the recommended daily limit for teenagers.\nSecondly, high sugar intake affects learning. Many students feel energetic for a short time after a sugary drink, but then feel tired and unable to concentrate in the next lesson.\nFurthermore, sugary drinks create plastic waste. Most are sold in single-use bottles, which fill our bins every day.\nSome may argue that students have the right to choose what they drink. However, a school's duty is to provide a healthy environment, just as it provides clean classrooms.\nTherefore, the headmaster should ask the canteen to replace sugary drinks with plain water, unsweetened tea and fresh fruit. The school should also install water refill stations, and teachers ought to include lessons on reading nutrition labels. If we make these changes, our students will be healthier, more focused and more environmentally responsible." }],
              rubric: ["My thesis clearly states what should be done.", "I gave at least three arguments with evidence.", "I addressed a counter-argument.", "My recommendations are specific (who should do what).", "I used modals and persuasive techniques appropriately."],
            }),
            speaking({
              id: "sma11-c4-l3-say",
              title: "A persuasive speech",
              prompt: "Deliver your hortatory exposition as a two-minute persuasive speech to the school assembly. Use a rhetorical question, a statistic and the rule of three.",
              image: "microphone",
              prepSeconds: 90,
              seconds: 120,
              tips: ["Good morning, Mr./Ms. …, teachers and friends.", "Did you know that …?", "First, … Second, … Finally, …", "I know some of you think … but …", "So I urge … to …", "Together, we can make our school …, … and …"],
              models: [{ label: "Example", text: "Good morning, Mr. Headmaster, teachers and friends. Did you know that one bottle of sweet tea from our canteen can contain more sugar than we should eat in a whole day? Every day, we drink hundreds of these bottles. First, this sugar harms our health. Second, it makes us sleepy in class. And finally, the bottles fill our bins with plastic. I know some of you love sweet drinks, and so do I. But our school should help us make healthier choices. So I urge the school to replace sugary drinks with water and fresh juice, and to install refill stations. Together, we can make our school healthier, smarter and greener. Thank you." }],
              rubric: ["I greeted the audience appropriately.", "I used a rhetorical question, a statistic and the rule of three.", "My recommendations were clear.", "I used confident voice, pauses and eye contact."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sma11-c4-l3-c1", "Which recommendation is the most specific?", ["The canteen should replace sweet drinks with water and fruit juice by next semester.", "We should be healthy.", "Something must be done."], 0, "Spesifik."),
        pick("sma11-c4-l3-c2", "In the model, how does the writer respond to “students have the right to choose”?", ["by saying the school's duty is to provide a healthy environment", "by agreeing completely", "by insulting them"], 0, "Rebuttal."),
        arrange("sma11-c4-l3-c3", "Put the words in order.", "The headmaster should install water refill stations", "Rekomendasi spesifik."),
        fill("sma11-c4-l3-c4", "Complete: So I ___ the school to act now. (mendesak)", "So I", "the school to act now.", ["urge"], "Urge = mendesak.", { translate: true }),
        trPick("sma11-c4-l3-c5", "“Beberapa orang mungkin berpendapat bahwa…” in English is…", ["Some may argue that…", "Some may agree for…", "Some argue may that…"], 0, "Some may argue that."),
        pick("sma11-c4-l3-c6", "Why should a hortatory text include a counter-argument?", ["It shows fairness and strengthens the writer's credibility.", "It makes the text confusing.", "It replaces the recommendation."], 0, "Kredibilitas.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma11-c4-post",
    title: "Chapter 4 Posttest",
    passPercent: 70,
    passages: [CYCLE],
    questions: [
      pick("sma11-c4-post1", "It is important that every citizen ___ their rubbish properly.", ["sort", "sorts", "sorting", "to sort"], 0, "Subjunctive."),
      listen("sma11-c4-post2", voice("Therefore, I strongly recommend that the village head set up a waste bank before the end of the year."), "Listen. What is recommended?", ["setting up a waste bank", "closing the market", "building a mall", "planting rice"], 0, "Waste bank."),
      trPick("sma11-c4-post3", "“Kemacetan lalu lintas” in English is…", ["traffic congestion", "traffic consumption", "traffic connection", "traffic confusion"], 0, "Traffic congestion."),
      pick("sma11-c4-post4", "Which is a rhetorical question?", ["How long will we keep ignoring this problem?", "What time is it?", "Where is the library?", "Can you pass the salt?"], 0, "Pertanyaan retoris."),
      arrange("sma11-c4-post5", "Put the words in order.", "Protected lanes should be built on main roads", "Pasif modal."),
      pick("sma11-c4-post6", "According to the text, how much can a family save by cycling instead of riding a motorbike once a day?", ["hundreds of thousands of rupiah a month", "a few hundred rupiah a year", "millions every day", "nothing"], 0, "Baris 4.", { passageId: CYCLE.id }),
      match("sma11-c4-post7", "Match the part and the line.", [["thesis", "line 1"], ["argument about money", "line 4"], ["counter-argument", "line 5"], ["recommendation", "line 7"]], "Struktur hortatory."),
      fill("sma11-c4-post8", "Complete.", "If we act together, our streets can become cleaner, safer and", "for everyone.", ["healthier"], "Baris 8.", { passageId: CYCLE.id }),
      pick("sma11-c4-post9", "Which statement best describes line 5?", ["It admits a problem and uses it to support the writer's recommendation.", "It disagrees with the thesis.", "It changes the topic.", "It tells a story."], 0, "Konsesi yang memperkuat argumen.", { passageId: CYCLE.id, hots: true }),
      pick("sma11-c4-post10", "Which piece of evidence would most strengthen the text for a local audience?", ["data on cycling accidents and air quality in the writer's own city", "a photo of Copenhagen", "the writer's favourite bike brand", "a poem about bicycles"], 0, "Bukti lokal paling relevan.", { passageId: CYCLE.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Persuade Me!",
    questions: [
      live("sma11-c4-live1", "Hortatory ends with…", ["recommendation", "reiteration", "resolution", "reorientation"], 0, "target"),
      live("sma11-c4-live2", "Strongest obligation:", ["must", "might", "could", "may"], 0, "traffic-light"),
      live("sma11-c4-live3", "It is vital that he ___.", ["go", "goes", "to go", "going"], 0, "question"),
      live("sma11-c4-live4", "“Kemacetan” =", ["congestion", "connection", "condition", "collection"], 0, "traffic", true),
      live("sma11-c4-live5", "“Cleaner, safer, healthier” =", ["rule of three", "statistic", "hedging", "question"], 0, "thumbs-up"),
      live("sma11-c4-live6", "Inclusive word:", ["we", "they", "he", "it"], 0, "meeting"),
      live("sma11-c4-live7", "Lanes should ___ built.", ["be", "been", "being", "to be"], 0, "bicycle"),
      live("sma11-c4-live8", "Adds authority:", ["expert opinion", "insults", "emoji", "slang"], 0, "doctor"),
    ],
  },
};
