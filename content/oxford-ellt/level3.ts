import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { audio, examples, fill, listen, live, match, pick, pics, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, writing } from "../kit";

// Oxford ELLT — Level 3: Upper Intermediate (B2).

const ATTENTION: Passage = {
  id: "ellt3-attention",
  title: "Are Our Attention Spans Really Shrinking?",
  lines: [
    "Few claims about modern life are repeated as confidently as the idea that our attention spans are collapsing. A widely shared statistic even suggests that humans now concentrate for less time than a goldfish.",
    "On closer inspection, however, this claim rests on remarkably weak foundations. The goldfish comparison appears to have originated in a marketing report, and researchers have been unable to trace the original data behind it.",
    "Psychologists also point out that “attention span” is not a single, fixed quantity. A student who loses interest in a dull lecture after ten minutes may spend three hours absorbed in a complex video game.",
    "What does seem to have changed is the way we switch between tasks. Studies of office workers have found that they move between screens and applications every few minutes, often interrupting themselves rather than being interrupted by others.",
    "This frequent switching has costs. Each time we return to a task, we need time to recall where we were, and errors become more likely. Over a working day, these small losses can add up.",
    "The more useful question, then, may not be whether we can still concentrate, but how we design our environments. Turning off notifications, setting aside blocks of uninterrupted time and keeping only one window open are modest changes, yet they can noticeably improve focus.",
  ],
};

export const ELLT3: Level = {
  id: "ellt-l3",
  title: "Level 3 — Upper Intermediate (B2)",
  description: "Answer inference and attitude questions on a long text, identify what different speakers say, plan and write a structured opinion essay, and respond to hypothetical prompts.",
  targetScore: "Target CEFR B2",
  cover: ["owl-think", "meeting", "pencil"],
  pretest: {
    id: "ellt-l3-pre",
    title: "Level 3 Pretest",
    passPercent: 0,
    questions: [
      pick("ellt-l3-pre1", "A question asks “What is the writer's attitude to the goldfish statistic?” This tests…", ["the writer's opinion", "a number", "vocabulary only", "grammar"], 0, "Sikap penulis."),
      listen("ellt-l3-pre2", say(["man", "Honestly, I think group projects teach you more than exams."], ["woman", "I'm not so sure. Some people just let others do the work."]), "Who is sceptical about group projects?", ["the woman", "the man", "both", "neither"], 0, "I'm not so sure."),
      trPick("ellt-l3-pre3", "“Rentang perhatian” in English is…", ["attention span", "attention range time", "concentration bridge", "focus distance"], 0, "Attention span."),
      pick("ellt-l3-pre4", "The Writing Task 2 essay should be…", ["190–250 words", "80–100 words", "500 words", "50 words"], 0, "190–250 kata."),
      pick("ellt-l3-pre5", "Which prompt is hypothetical?", ["If you could change one thing about your school, what would it be?", "Describe your school.", "Compare two schools."], 0, "If … would."),
    ],
  },
  lessons: [
    {
      id: "ellt-l3-l1",
      skill: "reading",
      title: "Reading Text 3: Inference and Attitude",
      summary: "Long-text multiple-choice questions about implied meaning, the writer's stance and the function of paragraphs.",
      passages: [ATTENTION],
      sections: [
        {
          title: "The text",
          blocks: [
            { type: "passage", passage: ATTENTION },
            vocab([["on closer inspection", "jika diperiksa lebih teliti", "eye"], ["foundations", "dasar", "house"], ["absorbed in", "tenggelam/asyik dalam", "gamepad"], ["add up", "bertambah (menjadi banyak)", "num-10"], ["modest", "sederhana/kecil", "thumbs-up"]], "Key vocabulary"),
          ],
        },
        {
          title: "Question types",
          blocks: [
            table(["Type", "Strategy"], [["Writer's attitude", "look for evaluative words: weak foundations, remarkably, more useful"], ["Implied meaning", "what must be true based on the text, not what might be true"], ["Paragraph function", "Does it give evidence, a counterexample, a solution?"], ["Reference", "What do “this”, “these” refer to?"]]),
            tip("Pilihan yang memakai **kata yang sama dengan teks** tetapi **mengubah maknanya** adalah jebakan umum di level C1."),
            tryIt(pick("ellt-l3-l1-try", "What is the writer's attitude to the goldfish statistic?", ["sceptical", "enthusiastic", "neutral", "confused"], 0, "Weak foundations.", { passageId: ATTENTION.id })),
          ],
        },
      ],
      checkpoint: [
        pick("ellt-l3-l1-c1", "Why does the writer mention the video game in paragraph 3?", ["to show that attention depends on the activity", "to criticise video games", "to recommend gaming", "to describe a study"], 0, "Contoh tandingan.", { passageId: ATTENTION.id }),
        pick("ellt-l3-l1-c2", "According to paragraph 4, office workers often…", ["interrupt themselves by switching tasks", "are interrupted mainly by managers", "concentrate for hours", "avoid screens"], 0, "Paragraf 4.", { passageId: ATTENTION.id }),
        pick("ellt-l3-l1-c3", "What does “these small losses” in paragraph 5 refer to?", ["the time and accuracy lost when returning to tasks", "lost files", "money", "lost workers"], 0, "Rujukan.", { passageId: ATTENTION.id }),
        pick("ellt-l3-l1-c4", "What is the main purpose of paragraph 6?", ["to suggest practical solutions", "to give more statistics", "to restate the goldfish claim", "to describe a lecture"], 0, "Solusi.", { passageId: ATTENTION.id }),
        fill("ellt-l3-l1-c5", "Complete: The goldfish comparison appears to have originated in a ___ report.", "The goldfish comparison appears to have originated in a", "report.", ["marketing"], "Paragraf 2.", { passageId: ATTENTION.id }),
        pick("ellt-l3-l1-c6", "Which statement would the writer most likely agree with?", ["Our environment affects focus more than any fixed attention limit.", "Humans concentrate less than goldfish.", "Video games destroy concentration.", "Notifications improve focus."], 0, "Sikap penulis.", { passageId: ATTENTION.id, hots: true }),
      ],
    },
    {
      id: "ellt-l3-l2",
      skill: "listening",
      title: "Listening 3: Several Speakers",
      summary: "Identifying which speaker expresses which idea or opinion.",
      sections: [
        {
          title: "Strategy",
          blocks: [
            table(["Step", "What to do"], [["Before", "read the statements and underline key ideas"], ["While listening", "note which speaker says what; ideas are paraphrased"], ["Beware", "a speaker may mention an idea only to reject it"]]),
            pics([["meeting", "several speakers"], ["chat", "opinions"], ["question", "who said it?"], ["headset", "played twice"]]),
          ],
        },
        {
          title: "Practice",
          blocks: [
            audio("Four students on studying abroad", say(["man", "Speaker 1: For me, the biggest benefit was independence. Back home my parents did everything; abroad I had to manage money, cooking, everything."], ["woman", "Speaker 2: People say you learn the language quickly, but honestly, I spent most of my time with other Indonesians at first, so it took longer than I expected."], ["man", "Speaker 3: It completely changed my career plans. A lecturer encouraged me to try research, and now I'm applying for a PhD."], ["woman", "Speaker 4: The cost was a real worry. Even with a scholarship, rent was much higher than I'd budgeted for."])),
            tryIt(pick("ellt-l3-l2-try", "Which speaker mentions becoming more independent?", ["Speaker 1", "Speaker 2", "Speaker 3", "Speaker 4"], 0, "Independence.")),
          ],
        },
      ],
      checkpoint: [
        match("ellt-l3-l2-c1", "Match the speaker and the idea.", [["Speaker 1", "learned to manage daily life"], ["Speaker 2", "language progress was slower than expected"], ["Speaker 3", "a teacher influenced their future"], ["Speaker 4", "living costs were higher than planned"]], "Identifikasi pembicara."),
        pick("ellt-l3-l2-c2", "Why did Speaker 2's English improve slowly at first?", ["She mostly spent time with other Indonesians.", "She didn't attend classes.", "She was ill.", "Her teacher was strict."], 0, "Alasan."),
        pick("ellt-l3-l2-c3", "What is Speaker 3 doing now?", ["applying for a PhD", "working in a bank", "teaching English", "returning home"], 0, "Ia sedang mendaftar PhD."),
        pick("ellt-l3-l2-c4", "What did Speaker 4 underestimate?", ["the cost of rent", "the difficulty of exams", "the weather", "the travel time"], 0, "Biaya sewa lebih tinggi."),
        listen("ellt-l3-l2-c5", say(["woman", "Some say online shopping saves time, but in my case I spend hours comparing prices."]), "What does the speaker suggest about online shopping?", ["It doesn't save her time.", "It always saves time.", "It is cheaper.", "It is dangerous."], 0, "Gagasan disebut lalu dibantah."),
        pick("ellt-l3-l2-c6", "Speaker 2 says “People say you learn the language quickly.” Is this her own opinion?", ["No, she mentions it to contrast it with her own experience.", "Yes, it is her main point.", "It is Speaker 3's opinion."], 0, "Pandangan umum vs pengalaman pribadi.", { hots: true }),
      ],
    },
    {
      id: "ellt-l3-l3",
      skill: "writing",
      title: "Writing Task 2: The Opinion Essay",
      summary: "Planning a 190–250 word essay with a clear position, developed paragraphs and a conclusion.",
      sections: [
        {
          title: "Plan",
          blocks: [
            text("**Essay prompt:** Some people believe that smartphones should be banned in university lectures. To what extent do you agree or disagree? Write 190–250 words."),
            table(["Paragraph", "Content", "Words"], [["Introduction", "context + clear position", "35–45"], ["Body 1", "main reason + explanation + example", "60–70"], ["Body 2", "second reason or counterargument + response", "60–70"], ["Conclusion", "restated position", "30–40"]]),
            tip("Tugas 2 bernilai **70%** dari skor Writing. Hal yang dinilai antara lain: **mengembangkan dan mengevaluasi argumen**, **organisasi paragraf**, **kosakata**, **tata bahasa**, dan **contoh pendukung**."),
          ],
        },
        {
          title: "Write",
          blocks: [
            examples([{ wrong: "Smartphones are bad. They are distracting. Ban them.", right: "Although smartphones can support learning, I believe they should be restricted in lectures, because constant notifications reduce concentration and affect other students." }], "Developing a thesis"),
            writing({
              id: "ellt-l3-l3-write",
              title: "Opinion essay",
              prompt: "Some people believe that smartphones should be banned in university lectures. To what extent do you agree or disagree? Write 190–250 words.",
              image: "smartphone",
              minWords: 190,
              maxWords: 250,
              tips: ["Intro: Although …, I believe … because …", "Body 1: The main reason is … For example, …", "Body 2: Some argue that … However, …", "Conclusion: In conclusion, …"],
              models: [{ label: "B2+/C1 model", text: "Smartphones have become essential tools for students, but their place in lectures is increasingly debated. Although they can support learning, I believe their use should be restricted rather than completely banned.\nThe main argument for restrictions is concentration. Even when students intend to look up a definition, they are often drawn into messages and social media. Research on task switching suggests that each interruption makes it harder to follow complex explanations, and students who scroll during lectures can also distract those sitting nearby.\nOn the other hand, a total ban seems excessive. Phones allow students to access course materials, take photos of diagrams and participate in online quizzes that many lecturers now use. For students with disabilities, apps such as speech-to-text may even be necessary.\nA balanced approach would be to allow phones only for specific learning activities, while asking students to keep them silent and face down at other times.\nIn conclusion, smartphones should not be banned outright, but clear rules are needed to ensure they support rather than undermine learning." }],
              rubric: ["My position is clear and consistent.", "Each body paragraph develops one main idea with support.", "I considered another view and responded to it.", "I used a range of vocabulary and grammar accurately.", "I wrote 190–250 words in well-organised paragraphs."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("ellt-l3-l3-c1", "How much of the Writing score does Task 2 carry?", ["70%", "30%", "50%", "100%"], 0, "Bobot Task 2."),
        pick("ellt-l3-l3-c2", "Which thesis is strongest?", ["Although smartphones can support learning, they should be restricted in lectures because they reduce concentration.", "Smartphones are phones.", "I will write about smartphones."], 0, "Tesis kuat."),
        pick("ellt-l3-l3-c3", "Which sentence responds to a counterargument?", ["Some argue phones help learning; however, this benefit can be kept through limited use.", "Phones are bad.", "In conclusion, phones."], 0, "Tanggapan."),
        fill("ellt-l3-l3-c4", "Complete: Phones should not be banned ___ , but clear rules are needed. (sepenuhnya)", "Phones should not be banned", ", but clear rules are needed.", ["outright", "completely", "entirely"], "Outright = sepenuhnya.", { translate: true }),
        trPick("ellt-l3-l3-c5", "“Merusak (pembelajaran)” in English is…", ["undermine", "underline", "understand"], 0, "Undermine."),
        pick("ellt-l3-l3-c6", "Why does mentioning students with disabilities strengthen the essay?", ["It gives a specific, relevant example supporting a balanced view.", "It makes the essay longer.", "It changes the topic."], 0, "Contoh spesifik.", { hots: true }),
      ],
    },
    {
      id: "ellt-l3-l4",
      skill: "speaking",
      title: "Speaking: The Hypothetical Prompt",
      summary: "Using conditionals and speculation to answer “What would happen if…?” questions.",
      sections: [
        {
          title: "Language of speculation",
          blocks: [
            table(["Function", "Language"], [["Second conditional", "If cities banned cars, people would…"], ["Possibility", "It might / could lead to…"], ["Likelihood", "It's likely that… / It's unlikely that…"], ["Consequences", "As a result, … / This would mean that…"], ["Balance", "On the other hand, there would be drawbacks, such as…"]]),
            pics([["owl-think", "imagine"], ["question", "what if?"], ["target", "consequences"], ["chat", "speculate"]]),
          ],
        },
        {
          title: "Practice",
          blocks: [
            text("**Topic: Cities.** Prompt 3 (hypothetical): *What would happen if your city made public transport free for everyone?*"),
            audio("Model hypothetical response", say(["man", "If my city made public transport free, I think we'd see a big increase in passengers, especially students and low-income workers. As a result, there would probably be fewer motorbikes on the road, which would reduce traffic and pollution. On the other hand, the government would have to find money to pay for it, perhaps through higher taxes. Buses might also become overcrowded at first. So overall, I think it could be very positive, but only if the city also invested in more buses and better routes."])),
            speaking({
              id: "ellt-l3-l4-say",
              title: "Hypothetical monologue",
              prompt: "Topic: Cities. Plan for about 45 seconds, then speak for about one and a half minutes: What would happen if your city made public transport free for everyone?",
              image: "bus",
              prepSeconds: 45,
              seconds: 90,
              tips: ["If my city …, I think …", "As a result, … would …", "On the other hand, …", "So overall, …"],
              models: [{ label: "Structure", text: "Main consequence → second consequence → drawback → condition for success → overall view." }],
              rubric: ["I used conditionals accurately.", "I discussed both positive and negative consequences.", "I organised my ideas logically.", "I reached a clear conclusion.", "I spoke fluently."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("ellt-l3-l4-c1", voice("If my city made public transport free, we'd see a big increase in passengers."), "What structure is used?", ["second conditional", "past simple", "present continuous"], 0, "If + past, would."),
        pick("ellt-l3-l4-c2", "If everyone ___ by bike, the air would be cleaner.", ["travelled", "travels", "will travel"], 0, "Second conditional."),
        pick("ellt-l3-l4-c3", "Which phrase introduces a drawback?", ["On the other hand, …", "As a result, …", "For example, …"], 0, "Kontras."),
        fill("ellt-l3-l4-c4", "Complete: It ___ lead to overcrowded buses. (bisa saja)", "It", "lead to overcrowded buses.", ["could", "might", "may"], "Possibility.", { translate: true }),
        trPick("ellt-l3-l4-c5", "“Kemungkinan besar” in English is…", ["It's likely that", "It's like that", "It likes that"], 0, "Likely."),
        pick("ellt-l3-l4-c6", "Why does the model end with a condition (“only if the city invested…”)?", ["It shows nuanced thinking rather than a simple yes/no answer.", "It is required grammar.", "It changes the topic."], 0, "Nuansa.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ellt-l3-post",
    title: "Level 3 Mock Quiz",
    passPercent: 70,
    passages: [ATTENTION],
    questions: [
      pick("ellt-l3-post1", "Paragraph 2 mainly…", ["questions the evidence for a popular claim", "supports the goldfish claim", "describes a marketing campaign in detail", "gives solutions"], 0, "Fungsi paragraf.", { passageId: ATTENTION.id }),
      pick("ellt-l3-post2", "The phrase “on closer inspection” suggests that…", ["the claim looks weaker when examined carefully", "the claim is stronger than expected", "researchers did not inspect anything", "inspection is impossible"], 0, "Makna frasa.", { passageId: ATTENTION.id }),
      pick("ellt-l3-post3", "What does the writer imply about notifications?", ["They contribute to task switching and reduce focus.", "They are necessary for concentration.", "They have no effect.", "They help memory."], 0, "Implikasi paragraf 6.", { passageId: ATTENTION.id, hots: true }),
      listen("ellt-l3-post4", say(["man", "Speaker A: I prefer printed books — I remember more."], ["woman", "Speaker B: I used to agree, but e-books are so convenient that I've switched completely."]), "Which speaker has changed their opinion?", ["Speaker B", "Speaker A", "both", "neither"], 0, "Used to agree … switched."),
      listen("ellt-l3-post5", say(["woman", "People assume volunteers do it for their CVs, but most of the people I meet simply enjoy helping."]), "What is the speaker's view of volunteers?", ["Most volunteer because they enjoy helping.", "Most volunteer for their CVs.", "Volunteers are paid.", "Volunteering is boring."], 0, "Membantah anggapan."),
      pick("ellt-l3-post6", "Which essay sentence states a clear position?", ["I strongly believe that university education should include work placements.", "Work placements exist.", "Some people work."], 0, "Posisi."),
      pick("ellt-l3-post7", "Which is the most appropriate conclusion?", ["In conclusion, while placements require planning, their benefits for employability make them worthwhile.", "That's all.", "Placements, placements, placements."], 0, "Kesimpulan."),
      pick("ellt-l3-post8", "If I ___ more time, I would learn Japanese.", ["had", "have", "will have", "having"], 0, "Second conditional."),
      pick("ellt-l3-post9", "Which hypothetical answer is most developed?", ["If schools started later, students might sleep more, but parents' work schedules could become a problem.", "Later is good.", "Schools start."], 0, "Pengembangan."),
      fill("ellt-l3-post10", "Complete with the writer's word: Keeping only one window open is a ___ change. (paragraph 6)", "Keeping only one window open is a", "change.", ["modest"], "Paragraf 6.", { passageId: ATTENTION.id }),
    ],
  },
  live: {
    title: "Live Quiz — B2 Challenge",
    questions: [
      live("ellt-l3-live1", "Writer doubts a claim =", ["sceptical", "enthusiastic", "neutral", "excited"], 0, "owl-think"),
      live("ellt-l3-live2", "Task 2 essay length:", ["190–250", "80–100", "50", "400"], 0, "pencil"),
      live("ellt-l3-live3", "If I ___ rich, I'd travel.", ["were", "am", "will be", "be"], 0, "plane"),
      live("ellt-l3-live4", "“Rentang perhatian” =", ["attention span", "attention time", "focus range", "mind length"], 0, "clock", true),
      live("ellt-l3-live5", "Task 2 weight in Writing:", ["70%", "30%", "50%", "10%"], 0, "target"),
      live("ellt-l3-live6", "Drawback phrase:", ["On the other hand", "As a result", "For example", "Firstly"], 0, "question"),
      live("ellt-l3-live7", "Speaker mentions an idea to reject it =", ["contrast", "agreement", "summary", "example"], 0, "meeting"),
      live("ellt-l3-live8", "Undermine =", ["weaken", "underline", "support", "understand"], 0, "trash"),
    ],
  },
};
