import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 10 (SMA, Fase E). Chapter 7 — What Do You Think? (opinions, analytical exposition) · Chapter 8 — The World of Work

const UNIFORM: Passage = {
  id: "sma10-c7-uniform",
  title: "Why Students Should Learn a Local Language",
  pic: "open-book",
  lines: [
    "Indonesia has more than 700 local languages, but according to linguists, many of them are endangered because young people no longer speak them. I strongly believe that every school should teach the local language of its region.",
    "Firstly, a local language is the key to local culture. Traditional songs, stories, proverbs and ceremonies are expressed in these languages. When a language disappears, much of this knowledge disappears with it.",
    "Secondly, learning more than one language is good for the brain. Research shows that bilingual and multilingual people are often better at solving problems and switching between tasks.",
    "Moreover, speaking a local language helps young people connect with older generations. Many grandparents feel more comfortable expressing their feelings in Javanese, Sundanese, Bugis or Batak than in Indonesian.",
    "Some people argue that students are already busy learning Indonesian and English, so a local language is an extra burden. However, local language lessons can be fun and practical, for example through songs, theatre and storytelling projects.",
    "In conclusion, teaching local languages at school protects our cultural heritage, strengthens our minds and brings families closer. If we do not act now, our grandchildren may only find these languages in museums.",
  ],
};

export const CH7: Level = {
  id: "sma10-ch7",
  title: "Chapter 7 — What Do You Think?",
  description: "Ask for, give and support opinions, agree and disagree politely, and read and write analytical exposition texts with a thesis, arguments and reiteration.",
  targetScore: "Speaking · Reading · Writing",
  cover: ["owl-think", "chat", "open-book"],
  pretest: {
    id: "sma10-c7-pre",
    title: "Chapter 7 Pretest",
    passPercent: 0,
    questions: [
      pick("sma10-c7-pre1", "The main opinion of an exposition text is called the…", ["thesis", "orientation", "identification", "goal"], 0, "Thesis = pendapat utama."),
      listen("sma10-c7-pre2", voice("I see your point, but I'm afraid I don't agree. Online classes can't replace real teachers."), "Listen. Does the speaker agree?", ["No, she disagrees politely.", "Yes, completely.", "She has no opinion.", "She agrees partly with joy."], 0, "Tidak setuju dengan sopan."),
      trPick("sma10-c7-pre3", "“Menurut pendapat saya” in English is…", ["In my opinion", "In my option", "On my opinion", "For my think"], 0, "In my opinion."),
      pick("sma10-c7-pre4", "Which word introduces an additional argument?", ["Moreover", "However", "Although", "In conclusion"], 0, "Moreover = selain itu."),
      pick("sma10-c7-pre5", "The last paragraph of an exposition, which restates the thesis, is the…", ["reiteration", "resolution", "reorientation", "recommendation only"], 0, "Reiteration = penegasan ulang."),
    ],
  },
  lessons: [
    {
      id: "sma10-c7-l1",
      skill: "speaking",
      title: "Giving and Responding to Opinions",
      summary: "Opinion phrases, agreeing, disagreeing politely and supporting your view.",
      sections: [
        {
          title: "Useful language",
          blocks: [
            table(["Asking", "Giving", "Agreeing", "Disagreeing politely"], [["What do you think about …?", "I think / I believe …", "I completely agree.", "I see your point, but …"], ["How do you feel about …?", "In my opinion / view, …", "That's exactly what I think.", "I'm not sure I agree with that."], ["What's your view on …?", "As far as I'm concerned, …", "You've got a point there.", "I'm afraid I see it differently."], ["Do you agree that …?", "It seems to me that …", "I couldn't agree more.", "That may be true, but …"]]),
            tip("Pendapat yang kuat diikuti **alasan** dan **contoh**: *I think uniforms are useful **because** they reduce competition over clothes. **For example**, …* Gunakan pola **PEE: Point – Explanation – Example**."),
          ],
        },
        {
          title: "A class discussion",
          blocks: [
            audio("Should phones be allowed in class?", say(["woman", "What do you think about allowing phones in class?"], ["man", "In my opinion, they should be allowed, because we can use them to look up information quickly."], ["woman", "I see your point, but many students just play games or check social media."], ["man", "That may be true, but teachers could set clear rules, for example phones only during research activities."], ["woman", "Hmm, you've got a point there. Maybe a compromise would work."])),
            tryIt(pick("sma10-c7-l1-try1", "What compromise do they reach?", ["phones only during research activities with clear rules", "no phones at all", "phones all the time"], 0, "Kompromi.")),
            speaking({
              id: "sma10-c7-l1-say",
              title: "Your view",
              prompt: "Choose ONE topic and give your opinion with two reasons and an example: (a) Students should do community service every year. (b) Homework should be banned. (c) School should start at 8 a.m., not 7 a.m.",
              image: "chat",
              prepSeconds: 45,
              seconds: 75,
              tips: ["As far as I'm concerned, …", "The first reason is that …", "For example, …", "Another reason is …", "Some people say …, but …", "That's why I believe …"],
              models: [{ label: "Example", text: "As far as I'm concerned, school should start at 8 a.m. instead of 7. The first reason is that teenagers need more sleep. Many of my friends sleep after 11 p.m. because of homework, and then they wake up at 5 to catch the bus. For example, in my class, at least five students fall asleep during the first lesson. Another reason is traffic: at 6.30 the roads are full of parents taking children to school. Some people say a later start means finishing later, but I think a fresh mind learns faster. That's why I believe an 8 o'clock start would be better for everyone." }],
              rubric: ["I stated my opinion clearly.", "I gave at least two reasons.", "I supported them with an example.", "I mentioned and answered an opposing view.", "I used a variety of opinion phrases."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sma10-c7-l1-c1", say(["man", "I think we should have more sports lessons."], ["woman", "I couldn't agree more!"]), "Listen. How does the woman respond?", ["She strongly agrees.", "She strongly disagrees.", "She is not sure."], 0, "I couldn't agree more = sangat setuju."),
        match("sma10-c7-l1-c2", "Match the expression and its function.", [["What's your view on …?", "asking for an opinion"], ["As far as I'm concerned, …", "giving an opinion"], ["You've got a point there.", "agreeing"], ["I'm afraid I see it differently.", "disagreeing politely"]], "Fungsi ungkapan."),
        pick("sma10-c7-l1-c3", "Which response is the most polite way to disagree?", ["That may be true, but I think there are other factors.", "You're totally wrong.", "That's a stupid idea."], 0, "Sopan."),
        fill("sma10-c7-l1-c4", "Complete: I see your ___, but I disagree.", "I see your", ", but I disagree.", ["point"], "I see your point."),
        trPick("sma10-c7-l1-c5", "“Saya sangat setuju.” in English is…", ["I couldn't agree more.", "I couldn't agree.", "I can't agree more less."], 0, "Couldn't agree more."),
        pick("sma10-c7-l1-c6", "Which opinion is best supported?", ["I think libraries should open on weekends because many students work on weekdays; for example, my cousin can only study on Sundays.", "I think libraries are good.", "Libraries, yes!"], 0, "Point + explanation + example.", { hots: true }),
      ],
    },
    {
      id: "sma10-c7-l2",
      skill: "reading",
      title: "Reading: An Analytical Exposition",
      summary: "Thesis, arguments, counter-argument and reiteration; linking words.",
      passages: [UNIFORM],
      sections: [
        {
          title: "The text",
          blocks: [
            { type: "passage", passage: UNIFORM },
            audio("Listen and read", say(["man", UNIFORM.lines.join(" ")])),
            vocab([["endangered", "terancam punah", "earth"], ["proverb", "peribahasa", "open-book"], ["burden", "beban", "bag"], ["heritage", "warisan", "museum"]], "Words from the text"),
          ],
        },
        {
          title: "Structure and linking words",
          blocks: [
            table(["Part", "Function", "Line"], [["Thesis", "the writer's position", "1"], ["Argument 1", "culture", "2"], ["Argument 2", "brain", "3"], ["Argument 3", "family", "4"], ["Counter-argument + rebuttal", "answering the other side", "5"], ["Reiteration", "restating the thesis and summarising", "6"]]),
            table(["Function", "Linking words"], [["Ordering", "Firstly, Secondly, Finally"], ["Adding", "Moreover, Furthermore, In addition"], ["Contrasting", "However, On the other hand, Nevertheless"], ["Concluding", "In conclusion, To sum up, Therefore"]]),
            tryIt(pick("sma10-c7-l2-try1", "How many local languages does Indonesia have, according to the text?", ["more than 700", "about 70", "exactly 300"], 0, "Baris 1.", { passageId: UNIFORM.id })),
          ],
        },
      ],
      checkpoint: [
        pick("sma10-c7-l2-c1", "What is the writer's thesis?", ["Every school should teach the local language of its region.", "English is more important than local languages.", "Grandparents should learn Indonesian."], 0, "Baris 1.", { passageId: UNIFORM.id }),
        pick("sma10-c7-l2-c2", "Which argument is about the brain?", ["Multilingual people are often better at solving problems.", "Grandparents feel more comfortable.", "Songs and stories are in local languages."], 0, "Baris 3.", { passageId: UNIFORM.id }),
        fill("sma10-c7-l2-c3", "Complete.", "If we do not act now, our grandchildren may only find these languages in", ".", ["museums"], "Baris 6.", { passageId: UNIFORM.id }),
        pickMany("sma10-c7-l2-c4", "Choose ALL the fun ways to learn local languages mentioned.", ["songs", "theatre", "storytelling projects", "long grammar tests"], [0, 1, 2], "Baris 5.", { passageId: UNIFORM.id }),
        pick("sma10-c7-l2-c5", "What is the function of line 5?", ["It presents an opposing view and answers it.", "It introduces the topic.", "It summarises the text."], 0, "Counter-argument + rebuttal.", { passageId: UNIFORM.id, hots: true }),
        pick("sma10-c7-l2-c6", "Which evidence would make Argument 2 stronger?", ["a specific study with numbers about bilingual students' problem-solving", "the writer's favourite song", "a list of Indonesian islands"], 0, "Bukti spesifik memperkuat argumen.", { passageId: UNIFORM.id, hots: true }),
      ],
    },
    {
      id: "sma10-c7-l3",
      skill: "writing",
      title: "Write an Analytical Exposition",
      summary: "Planning, drafting and checking a persuasive essay.",
      sections: [
        {
          title: "Plan",
          blocks: [
            pics([["owl-think", "brainstorm"], ["report", "outline"], ["pencil", "draft"], ["eraser", "revise"]], "The writing process"),
            table(["Step", "What to do"], [["1. Choose a position", "Decide clearly: should / should not."], ["2. Brainstorm", "List reasons, facts and examples for and against."], ["3. Select", "Keep the three strongest arguments."], ["4. Outline", "Thesis → 3 arguments (PEE) → counter-argument → reiteration."], ["5. Draft and revise", "Check linking words, tense and spelling."]]),
            warn("Hindari **generalisasi berlebihan** (*Everyone knows…*, *All teenagers are…*) dan **opini tanpa alasan**. Argumen yang sopan dan berbukti lebih meyakinkan."),
          ],
        },
        {
          title: "Write it",
          blocks: [
            writing({
              id: "sma10-c7-l3-write",
              title: "My analytical exposition",
              prompt: "Write an analytical exposition on ONE topic: (a) Schools should ban single-use plastic. (b) Students should learn to code from primary school. (c) Social media does more harm than good for teenagers. (d) Every student should learn a local language.",
              image: "pencil",
              minWords: 250,
              maxWords: 380,
              tips: ["Thesis: I strongly believe that …", "Argument 1: Firstly, … For example, …", "Argument 2: Secondly, …", "Argument 3: Moreover, …", "Counter-argument: Some people argue that … However, …", "Reiteration: In conclusion, …"],
              models: [{ label: "Example", text: "Students Should Learn to Code from Primary School\nTechnology shapes almost every part of modern life, from how we shop to how we learn. I strongly believe that coding should be taught from primary school.\nFirstly, coding teaches logical thinking. When children write a simple program, they must break a big problem into small steps and test each one. This skill is useful in maths, science and even daily decisions.\nSecondly, early exposure prepares students for future jobs. According to many reports, digital skills are among the most demanded skills in Indonesia's job market. Children who start early will feel confident rather than afraid of technology.\nMoreover, coding encourages creativity. With free tools such as Scratch, children can create games, animations and stories. They become creators of technology, not only users.\nSome people argue that primary schools do not have enough computers or trained teachers. However, coding can start without computers through \"unplugged\" activities like puzzles and card games, and teachers can join free online training.\nIn conclusion, teaching coding early builds logical thinking, prepares students for the future and sparks creativity. If we invest in it now, Indonesia's next generation will be ready to lead in the digital age." }],
              rubric: ["My thesis is clear and in the first paragraph.", "I wrote three arguments, each with explanation and example.", "I included a counter-argument and a rebuttal.", "My reiteration restates the thesis in new words.", "I used a range of linking words accurately."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sma10-c7-l3-c1", "Which sentence is an over-generalisation?", ["All teenagers are addicted to their phones.", "Many teenagers spend over four hours a day online.", "Some students use phones for research."], 0, "Generalisasi berlebihan."),
        pick("sma10-c7-l3-c2", "In the model, how can coding start without computers?", ["through unplugged activities like puzzles", "by watching TV", "by reading novels"], 0, "Unplugged activities."),
        arrange("sma10-c7-l3-c3", "Put the words in order.", "Some people argue that it is too expensive", "Memperkenalkan argumen lawan."),
        fill("sma10-c7-l3-c4", "Complete: ___ conclusion, coding should be taught early.", "", "conclusion, coding should be taught early.", ["In", "in"], "In conclusion."),
        trPick("sma10-c7-l3-c5", "“Selain itu” in English is…", ["Moreover", "However", "Therefore"], 0, "Moreover / In addition."),
        pick("sma10-c7-l3-c6", "Why is including a counter-argument useful?", ["It shows you have considered other views and makes your position stronger.", "It confuses the reader.", "It makes the text shorter."], 0, "Menunjukkan pertimbangan matang.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma10-c7-post",
    title: "Chapter 7 Posttest",
    passPercent: 70,
    passages: [UNIFORM],
    questions: [
      pick("sma10-c7-post1", "___, many students cannot afford private tutoring.", ["However", "Firstly", "In conclusion", "For example"], 0, "Kontras → However."),
      listen("sma10-c7-post2", say(["man", "Do you agree that exams should be abolished?"], ["woman", "Not entirely. I think we need some tests, but projects should count more."]), "Listen. What is the woman's opinion?", ["She partly agrees: keep some tests but value projects more.", "She completely agrees.", "She wants more exams.", "She has no opinion."], 0, "Not entirely = sebagian."),
      trPick("sma10-c7-post3", "“Oleh karena itu” in English is…", ["Therefore", "Although", "Moreover", "Meanwhile"], 0, "Therefore."),
      pick("sma10-c7-post4", "Which phrase introduces an example?", ["For instance,", "In conclusion,", "However,", "Firstly,"], 0, "Contoh."),
      arrange("sma10-c7-post5", "Put the words in order.", "I strongly believe that schools should go green", "Thesis."),
      pick("sma10-c7-post6", "According to the writer, why are many local languages endangered?", ["Young people no longer speak them.", "They are too difficult.", "The government banned them.", "There are no books."], 0, "Baris 1.", { passageId: UNIFORM.id }),
      match("sma10-c7-post7", "Match the part and the line.", [["thesis", "line 1"], ["argument about family", "line 4"], ["counter-argument", "line 5"], ["reiteration", "line 6"]], "Struktur exposition."),
      fill("sma10-c7-post8", "Complete.", "Some people argue that students are already busy … so a local language is an extra", ".", ["burden"], "Baris 5.", { passageId: UNIFORM.id }),
      pick("sma10-c7-post9", "What is the purpose of the text?", ["to persuade readers that schools should teach local languages", "to describe Javanese culture", "to tell a story about grandparents", "to explain how the brain works"], 0, "Tujuan exposition.", { passageId: UNIFORM.id, hots: true }),
      pick("sma10-c7-post10", "How does the writer answer the “extra burden” argument?", ["by saying lessons can be fun and practical", "by agreeing completely", "by ignoring it", "by attacking the people who said it"], 0, "Rebuttal (baris 5).", { passageId: UNIFORM.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Opinion Battle",
    questions: [
      live("sma10-c7-live1", "Strong agreement:", ["I couldn't agree more.", "I'm not sure.", "I see it differently.", "Maybe not."], 0, "thumbs-up"),
      live("sma10-c7-live2", "Exposition starts with the…", ["thesis", "orientation", "goal", "climax"], 0, "report"),
      live("sma10-c7-live3", "Adding connector:", ["Moreover", "However", "Although", "Despite"], 0, "question"),
      live("sma10-c7-live4", "“Menurut saya” =", ["In my opinion", "In my option", "For my mind", "To my thinking of"], 0, "owl-think", true),
      live("sma10-c7-live5", "Polite disagreement:", ["I see your point, but…", "You're wrong!", "No way!", "Stop talking."], 0, "chat"),
      live("sma10-c7-live6", "Final restating part:", ["reiteration", "complication", "orientation", "identification"], 0, "target"),
      live("sma10-c7-live7", "PEE = Point, Explanation, …", ["Example", "Ending", "Effort", "Energy"], 0, "pencil"),
      live("sma10-c7-live8", "Contrast connector:", ["However", "Moreover", "Firstly", "Therefore"], 0, "open-book"),
    ],
  },
};

const JOBS: Passage = {
  id: "sma10-c8-jobs",
  title: "Jobs That Didn't Exist Twenty Years Ago",
  pic: "laptop",
  lines: [
    "When your parents were in senior high school, nobody wanted to be a social media manager, a drone pilot or a data scientist. These jobs simply did not exist.",
    "Today, many young Indonesians earn a living in careers that their teachers could not have imagined. A content creator might film cooking videos in Makassar and earn money from viewers all over the world.",
    "Experts predict that this trend will continue. By the time today's Grade 10 students graduate from university, there may be jobs related to artificial intelligence, renewable energy and space tourism that we cannot even name yet.",
    "However, technology may also replace some jobs. Machines could take over tasks that are repetitive, such as checking documents or sorting packages.",
    "So, how can students prepare for jobs that do not exist yet? Most experts agree that certain skills will always be valuable: critical thinking, creativity, communication, collaboration and the ability to keep learning.",
    "Digital skills are important, but so are human skills. A robot might diagnose an illness, but patients will still need a nurse who listens with kindness.",
    "The best advice may be this: explore your interests, try new things, and never stop learning. Your future job might not have a name yet, but you can start preparing for it today.",
  ],
};

export const CH8: Level = {
  id: "sma10-ch8",
  title: "Chapter 8 — The World of Work",
  description: "Describe jobs and skills, talk about future possibilities with may, might, could and will probably, read about the future of work, and write a short CV and personal profile.",
  targetScore: "Vocabulary · Reading · Writing",
  cover: ["laptop", "staff", "target"],
  pretest: {
    id: "sma10-c8-pre",
    title: "Chapter 8 Pretest",
    passPercent: 0,
    questions: [
      pick("sma10-c8-pre1", "AI ___ change many jobs in the future, but we are not completely sure how.", ["might", "must", "has to", "did"], 0, "Kemungkinan → might."),
      listen("sma10-c8-pre2", voice("A data scientist collects and analyses large amounts of information to help companies make decisions."), "Listen. What does a data scientist do?", ["analyses information to help decisions", "repairs computers", "designs clothes", "flies drones"], 0, "Analyses information."),
      trPick("sma10-c8-pre3", "“Keterampilan” in English is…", ["skill", "school", "skull", "scale"], 0, "Skill."),
      pick("sma10-c8-pre4", "Teamwork is also called…", ["collaboration", "competition", "calculation", "celebration"], 0, "Collaboration."),
      pick("sma10-c8-pre5", "CV stands for…", ["curriculum vitae", "computer vision", "creative video", "class value"], 0, "Daftar riwayat hidup."),
    ],
  },
  lessons: [
    {
      id: "sma10-c8-l1",
      skill: "vocabulary",
      title: "Jobs and Skills",
      summary: "Modern and traditional jobs, workplaces, and hard and soft skills.",
      sections: [
        {
          title: "Jobs and what they do",
          blocks: [
            table(["Job", "Duty"], [["software developer", "designs and builds apps and programs"], ["data analyst", "collects and interprets data"], ["content creator", "produces videos, posts or podcasts"], ["nurse", "cares for patients and assists doctors"], ["civil engineer", "plans and supervises roads and bridges"], ["agronomist", "helps farmers grow better crops"], ["graphic designer", "creates visual content for brands"], ["customer service officer", "helps customers solve problems"]]),
            pics([["laptop", "developer"], ["nurse", "nurse"], ["farmer", "agronomist"], ["headset", "customer service"]]),
          ],
        },
        {
          title: "Hard and soft skills",
          blocks: [
            table(["Hard skills (teknis)", "Soft skills (interpersonal)"], [["coding, accounting, video editing", "communication, teamwork, leadership"], ["using design software", "time management, adaptability"], ["speaking a foreign language", "problem-solving, critical thinking"], ["operating machines", "empathy, creativity"]]),
            vocab([["deadline", "tenggat waktu", "calendar"], ["salary", "gaji", "money"], ["internship", "magang", "staff"], ["freelancer", "pekerja lepas", "laptop"], ["teamwork", "kerja sama tim", "meeting"]], "Work words"),
            tryIt(pick("sma10-c8-l1-try1", "Which is a soft skill?", ["time management", "video editing", "accounting"], 0, "Soft skill.")),
          ],
        },
      ],
      checkpoint: [
        listen("sma10-c8-l1-c1", voice("As a graphic designer, I create logos, posters and social media visuals for small businesses."), "Listen. What does she create?", ["logos and posters", "bridges", "medicine"], 0, "Graphic designer."),
        match("sma10-c8-l1-c2", "Match the job and the duty.", [["civil engineer", "plans roads and bridges"], ["agronomist", "helps farmers grow crops"], ["data analyst", "interprets data"], ["nurse", "cares for patients"]], "Pekerjaan dan tugas."),
        pick("sma10-c8-l1-c3", "A person who works for different clients without a permanent employer is a…", ["freelancer", "manager", "retiree"], 0, "Pekerja lepas."),
        fill("sma10-c8-l1-c4", "Complete: She did a three-month ___ at a bank before graduating. (magang)", "She did a three-month", "at a bank before graduating.", ["internship"], "Magang = internship.", { translate: true }),
        trPick("sma10-c8-l1-c5", "“Tenggat waktu” in English is…", ["deadline", "timeline", "dead time"], 0, "Deadline."),
        pick("sma10-c8-l1-c6", "Which combination of skills would a good customer service officer need most?", ["communication, patience and problem-solving", "welding and driving", "painting and singing"], 0, "Soft skills relevan.", { hots: true }),
      ],
    },
    {
      id: "sma10-c8-l2",
      skill: "reading",
      title: "Reading: The Future of Work",
      summary: "Modals of possibility and prediction; reading for main ideas.",
      passages: [JOBS],
      sections: [
        {
          title: "The text",
          blocks: [
            { type: "passage", passage: JOBS },
            audio("Listen and read", say(["woman", JOBS.lines.join(" ")])),
          ],
        },
        {
          title: "Talking about possibility",
          blocks: [
            table(["Certainty", "Expression", "Example"], [["very sure (+)", "will / will definitely", "Technology will keep changing."], ["quite sure", "will probably / is likely to", "AI is likely to create new jobs."], ["possible", "may / might / could", "Machines could take over repetitive tasks."], ["quite sure (−)", "probably won't / is unlikely to", "Robots are unlikely to replace nurses."], ["very sure (−)", "won't / definitely won't", "Human skills won't disappear."]]),
            text("**may / might / could + kata kerja dasar** untuk kemungkinan. **could have + V3** untuk kemungkinan di masa lalu (baris 2: *could not have imagined* = tidak mungkin membayangkan)."),
            tryIt(pick("sma10-c8-l2-try1", "Which jobs did not exist twenty years ago, according to the text?", ["social media manager, drone pilot, data scientist", "teacher, nurse, farmer", "doctor, pilot, chef"], 0, "Baris 1.", { passageId: JOBS.id })),
          ],
        },
      ],
      checkpoint: [
        pick("sma10-c8-l2-c1", "What kinds of jobs may exist in the future?", ["jobs related to AI, renewable energy and space tourism", "only farming jobs", "no new jobs"], 0, "Baris 3.", { passageId: JOBS.id }),
        pick("sma10-c8-l2-c2", "Which tasks could machines take over?", ["repetitive tasks such as sorting packages", "listening to patients with kindness", "creative storytelling"], 0, "Baris 4.", { passageId: JOBS.id }),
        fill("sma10-c8-l2-c3", "Complete.", "A robot might diagnose an illness, but patients will still need a nurse who listens with", ".", ["kindness"], "Baris 6.", { passageId: JOBS.id }),
        pickMany("sma10-c8-l2-c4", "Choose ALL the skills experts say will always be valuable.", ["critical thinking", "creativity", "collaboration", "memorising phone numbers"], [0, 1, 2], "Baris 5.", { passageId: JOBS.id }),
        pick("sma10-c8-l2-c5", "What is the main idea of the text?", ["Students should build lasting skills to prepare for jobs that may not exist yet.", "Robots will replace all workers.", "Content creators earn the most money."], 0, "Ide pokok.", { passageId: JOBS.id, hots: true }),
        pick("sma10-c8-l2-c6", "Why does the writer give the example of the nurse in line 6?", ["to show that human skills remain important", "to criticise nurses", "to explain how robots work"], 0, "Contoh pendukung.", { passageId: JOBS.id, hots: true }),
      ],
    },
    {
      id: "sma10-c8-l3",
      skill: "writing",
      title: "My Profile and My CV",
      summary: "Writing a personal profile and a simple CV; talking about career goals.",
      sections: [
        {
          title: "A student CV",
          blocks: [
            table(["Section", "Example"], [["Personal details", "Name, email, phone, city (no need for religion or weight)"], ["Personal profile", "2–3 sentences: who you are, skills, goal"], ["Education", "SMA Negeri 1 Pontianak, Science stream (2025–present)"], ["Experience", "Volunteer, Red Cross Youth (2025); Treasurer, school band (2026)"], ["Skills", "Canva, basic Python, public speaking, English (intermediate)"], ["Achievements", "2nd place, city debate competition (2026)"]]),
            examples([{ right: "Personal profile: A curious and hard-working Grade 10 student with a strong interest in environmental science. Experienced in organising school events and skilled at working in teams. Looking for a volunteer opportunity in a conservation organisation." }], "Model profile"),
            tip("Gunakan **kata kerja aksi** untuk pengalaman: *organised, led, designed, managed, raised (funds), created, taught*."),
          ],
        },
        {
          title: "Write and talk",
          blocks: [
            writing({
              id: "sma10-c8-l3-write",
              title: "My CV and personal profile",
              prompt: "Write a simple CV for yourself for a volunteer position or an internship you would like. Include a personal profile, education, experience (school activities count), skills and achievements.",
              image: "report",
              minWords: 120,
              maxWords: 250,
              tips: ["Personal profile: A … student with …", "Education: school, stream, years", "Experience: role, organisation, year + action verb", "Skills: hard and soft skills", "Achievements: competitions, certificates"],
              models: [{ label: "Example", text: "NAYLA PUTRI RAHMAN\nnayla.pr@example.com | 0812-7788-9900 | Pontianak, West Kalimantan\nPERSONAL PROFILE\nA creative and responsible Grade 10 student with a passion for graphic design and storytelling. Skilled at working in teams and meeting deadlines. Seeking an internship in a local creative agency to develop professional design skills.\nEDUCATION\nSMA Negeri 1 Pontianak, Social Sciences stream (2025–present)\nEXPERIENCE\n• Designer, School Magazine Team (2025–present): designed covers and layouts for four issues.\n• Volunteer, Kapuas River Clean-Up (2026): helped organise 120 volunteers and created social media posters.\nSKILLS\nCanva, basic Adobe Illustrator, photography, English (intermediate), public speaking, time management\nACHIEVEMENTS\n1st place, Provincial Poster Design Competition (2026)" }],
              rubric: ["My CV has clear sections and a neat layout.", "My personal profile is short and specific.", "I described experience with action verbs.", "I listed both hard and soft skills.", "There are no unnecessary personal details."],
            }),
            speaking({
              id: "sma10-c8-l3-say",
              title: "My career plans",
              prompt: "Talk about a job you might do in the future, the skills it needs, what you may need to study, and how you could prepare now. Use may, might, could and will probably.",
              image: "target",
              seconds: 90,
              tips: ["In the future, I might become …", "This job requires …", "I will probably need to study …", "Right now, I could …", "I'm not sure yet, but …"],
              models: [{ label: "Example", text: "In the future, I might become a renewable energy engineer. Indonesia has so much sun, wind and geothermal power, so I think this field will probably grow fast. This job requires strong maths and physics, problem-solving skills and teamwork. I will probably need to study electrical engineering at university, and I may need to take an English course because many technical documents are in English. Right now, I could join the school robotics club and watch online lectures about solar panels. I'm not completely sure yet, but I want to work on something that helps the planet." }],
              rubric: ["I named a possible career.", "I used at least four modals or expressions of possibility.", "I described the skills needed.", "I explained how I could prepare now."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sma10-c8-l3-c1", voice("I might study medicine, but I'm also considering nursing because I like caring for people."), "Listen. Is the speaker sure about the future?", ["No, she is considering two options.", "Yes, she has decided on medicine.", "She wants to be an engineer."], 0, "Might = belum pasti."),
        pick("sma10-c8-l3-c2", "Which detail should NOT be on a modern student CV?", ["your weight", "your email", "your skills"], 0, "Data tidak relevan."),
        arrange("sma10-c8-l3-c3", "Put the words in order.", "I organised a charity concert for flood victims", "Kata kerja aksi."),
        fill("sma10-c8-l3-c4", "Complete: Robots are ___ to replace teachers completely. (tidak mungkin)", "Robots are", "to replace teachers completely.", ["unlikely"], "Unlikely = kecil kemungkinannya.", { translate: true }),
        trPick("sma10-c8-l3-c5", "“Daftar riwayat hidup” in English is…", ["CV / résumé", "biography book", "report card"], 0, "CV = curriculum vitae."),
        pick("sma10-c8-l3-c6", "Which CV line is more impressive?", ["Led a team of 15 students to organise a book drive that collected 600 books.", "Was in a club.", "Did some activities."], 0, "Spesifik + kata kerja aksi + angka.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma10-c8-post",
    title: "Chapter 8 Posttest",
    passPercent: 70,
    passages: [JOBS],
    questions: [
      pick("sma10-c8-post1", "Self-driving cars ___ become common in Jakarta by 2040, but it's hard to say.", ["may", "must", "did", "have to"], 0, "Kemungkinan."),
      listen("sma10-c8-post2", voice("This position requires strong communication skills, the ability to work under pressure and basic knowledge of spreadsheets."), "Listen. Which is a requirement?", ["basic knowledge of spreadsheets", "a driving licence", "a medical degree", "experience as a pilot"], 0, "Spreadsheets."),
      trPick("sma10-c8-post3", "“Kemampuan beradaptasi” in English is…", ["adaptability", "adoption", "admiration", "addition"], 0, "Adaptability."),
      pick("sma10-c8-post4", "Which expression shows the HIGHEST certainty?", ["will definitely", "might", "could", "may"], 0, "Tingkat kepastian."),
      arrange("sma10-c8-post5", "Put the words in order.", "Machines could take over repetitive tasks", "Could + verb."),
      pick("sma10-c8-post6", "Where does the example content creator film cooking videos?", ["in Makassar", "in Bandung", "in Bali", "in Medan"], 0, "Baris 2.", { passageId: JOBS.id }),
      match("sma10-c8-post7", "Match the skill type and the example.", [["hard skill", "video editing"], ["soft skill", "teamwork"], ["digital skill", "using spreadsheets"], ["language skill", "speaking English"]], "Jenis keterampilan."),
      fill("sma10-c8-post8", "Complete.", "Your future job might not have a", "yet.", ["name"], "Baris 7.", { passageId: JOBS.id }),
      pick("sma10-c8-post9", "What does “that their teachers could not have imagined” (line 2) mean?", ["Their teachers had no way to imagine these careers in the past.", "Teachers refused to imagine.", "Teachers imagined them clearly.", "Teachers will imagine them."], 0, "Could not have + V3.", { passageId: JOBS.id, hots: true }),
      pick("sma10-c8-post10", "Which student is best prepared according to the text?", ["Rina, who keeps learning new things and works well in teams", "Budi, who only memorises facts", "Sari, who refuses to use technology", "Tono, who never tries new activities"], 0, "Keterampilan yang selalu dibutuhkan.", { passageId: JOBS.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Future Jobs",
    questions: [
      live("sma10-c8-live1", "Possibility modal:", ["might", "must", "should", "did"], 0, "question"),
      live("sma10-c8-live2", "Soft skill:", ["teamwork", "coding", "welding", "typing"], 0, "meeting"),
      live("sma10-c8-live3", "“Magang” =", ["internship", "interview", "interval", "internet"], 0, "staff", true),
      live("sma10-c8-live4", "Builds apps:", ["software developer", "agronomist", "nurse", "chef"], 0, "laptop"),
      live("sma10-c8-live5", "Unlikely means…", ["probably not", "definitely yes", "already done", "very happy"], 0, "owl-think"),
      live("sma10-c8-live6", "CV action verb:", ["organised", "was", "had", "got"], 0, "report"),
      live("sma10-c8-live7", "Robots may replace ___ tasks.", ["repetitive", "creative", "caring", "artistic"], 0, "robot"),
      live("sma10-c8-live8", "Money you earn monthly:", ["salary", "sale", "savings", "salad"], 0, "money"),
    ],
  },
};
