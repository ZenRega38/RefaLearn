import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 12 (SMA, Fase F). Chapter 1 — Two Sides of the Story (discussion texts) · Chapter 2 — Applying for Your Future

const AI: Passage = {
  id: "sma12-c1-ai",
  title: "Should Students Use AI Tools for Homework?",
  pic: "robot",
  lines: [
    "Artificial intelligence (AI) chatbots can now answer questions, write essays and solve maths problems in seconds. Many students already use them, which has started a heated debate among teachers and parents.",
    "Supporters argue that AI tools can be powerful learning partners. A student who does not understand a topic can ask the chatbot to explain it in simpler words, give more examples or create practice questions.",
    "They also point out that AI is already used in many workplaces. If schools ban it, students may graduate without the skills they need to use it responsibly.",
    "Furthermore, AI can support students who have limited access to private tutors, which could make learning opportunities more equal.",
    "On the other hand, critics worry that students will rely on AI to do their thinking for them. If a chatbot writes an essay, the student may get a good grade but learn very little.",
    "Critics also warn that AI tools sometimes produce incorrect information that sounds convincing. Students who do not check facts may copy errors without noticing.",
    "In addition, there are concerns about honesty. Submitting AI-generated work as your own can be considered a form of plagiarism.",
    "In conclusion, AI tools offer real benefits for learning, but they also carry risks. Perhaps the best approach is not to ban them, but to teach students when and how to use them wisely, and to design assignments that require personal thinking and reflection.",
  ],
};

export const CH1: Level = {
  id: "sma12-ch1",
  title: "Chapter 1 — Two Sides of the Story",
  description: "Read and write discussion texts that present arguments for and against an issue, use contrastive and additive connectors, hedging and reporting language, and reach a balanced conclusion.",
  targetScore: "Reading · Writing · Speaking",
  cover: ["robot", "question", "owl-think"],
  pretest: {
    id: "sma12-c1-pre",
    title: "Chapter 1 Pretest",
    passPercent: 0,
    questions: [
      pick("sma12-c1-pre1", "A discussion text presents…", ["arguments for and against an issue", "only the writer's opinion", "a story", "steps to make something"], 0, "Discussion = dua sisi."),
      listen("sma12-c1-pre2", voice("Supporters argue that school uniforms reduce bullying. On the other hand, critics say they limit self-expression."), "Listen. What do critics say?", ["Uniforms limit self-expression.", "Uniforms reduce bullying.", "Uniforms are cheap.", "Uniforms are comfortable."], 0, "Pendapat pihak kontra."),
      trPick("sma12-c1-pre3", "“Di sisi lain” in English is…", ["On the other hand", "In other side", "At another hand", "By other hand"], 0, "On the other hand."),
      pick("sma12-c1-pre4", "Which word introduces an additional point?", ["Furthermore", "However", "Whereas", "Although"], 0, "Penambahan."),
      pick("sma12-c1-pre5", "The final part of a discussion text usually gives…", ["a conclusion or recommendation after weighing both sides", "a new argument", "an orientation", "a list of materials"], 0, "Kesimpulan seimbang."),
    ],
  },
  lessons: [
    {
      id: "sma12-c1-l1",
      skill: "reading",
      title: "Reading: Should Students Use AI Tools?",
      summary: "Structure of a discussion text: issue, arguments for, arguments against, conclusion.",
      passages: [AI],
      sections: [
        {
          title: "The text",
          blocks: [
            { type: "passage", passage: AI },
            audio("Listen and read", say(["man", AI.lines.join(" ")])),
            vocab([["heated debate", "perdebatan sengit", "chat"], ["rely on", "bergantung pada", "hand"], ["convincing", "meyakinkan", "thumbs-up"], ["plagiarism", "plagiarisme", "report"], ["assignment", "tugas", "pencil"]], "Words from the text"),
          ],
        },
        {
          title: "Structure",
          blocks: [
            table(["Part", "Function", "Lines"], [["Issue", "introduces the topic and why it matters", "1"], ["Arguments for", "points from supporters", "2–4"], ["Arguments against", "points from critics", "5–7"], ["Conclusion / recommendation", "balanced judgement", "8"]]),
            table(["Discussion", "Exposition"], [["presents BOTH sides fairly", "presents mainly ONE side"], ["conclusion comes after weighing", "position is clear from the start"], ["neutral reporting language (supporters argue, critics warn)", "personal stance (I strongly believe)"]]),
            tryIt(pick("sma12-c1-l1-try1", "According to supporters, how can AI help a confused student?", ["by explaining topics in simpler words and giving examples", "by doing all the homework", "by replacing teachers"], 0, "Baris 2.", { passageId: AI.id })),
          ],
        },
      ],
      checkpoint: [
        pick("sma12-c1-l1-c1", "Why might banning AI be a problem, according to supporters?", ["Students may graduate without skills they need at work.", "AI is free.", "Teachers like AI."], 0, "Baris 3.", { passageId: AI.id }),
        pick("sma12-c1-l1-c2", "What is one concern about AI-generated information?", ["It can be incorrect but sound convincing.", "It is always too short.", "It is in another language."], 0, "Baris 6.", { passageId: AI.id }),
        fill("sma12-c1-l1-c3", "Complete.", "Submitting AI-generated work as your own can be considered a form of", ".", ["plagiarism"], "Baris 7.", { passageId: AI.id }),
        pickMany("sma12-c1-l1-c4", "Choose ALL the arguments AGAINST using AI.", ["students may stop thinking for themselves", "AI can produce incorrect information", "honesty concerns", "AI can make learning more equal"], [0, 1, 2], "Baris 5–7.", { passageId: AI.id }),
        pick("sma12-c1-l1-c5", "What does the writer recommend?", ["teaching students to use AI wisely and designing better assignments", "banning AI completely", "letting AI write all essays"], 0, "Baris 8.", { passageId: AI.id, hots: true }),
        pick("sma12-c1-l1-c6", "Why is this text a discussion and not an analytical exposition?", ["It presents both sides before giving a balanced conclusion.", "It tells a story.", "It has no conclusion."], 0, "Ciri discussion.", { passageId: AI.id, hots: true }),
      ],
    },
    {
      id: "sma12-c1-l2",
      skill: "structure",
      title: "Balanced Language",
      summary: "Reporting viewpoints, contrast and addition, hedging and impersonal structures.",
      sections: [
        {
          title: "Presenting viewpoints neutrally",
          blocks: [
            table(["Function", "Expressions"], [["Reporting supporters", "Supporters argue / claim / point out that … / Proponents believe …"], ["Reporting critics", "Critics warn / worry / object that … / Opponents argue …"], ["Impersonal", "It is often said that … / It can be argued that … / There are concerns that …"], ["Hedging", "may, might, could, tend to, it is possible that, perhaps, to some extent"], ["Contrast", "However, On the other hand, Nevertheless, In contrast, Yet"], ["Addition", "Furthermore, Moreover, In addition, Besides"], ["Concluding", "On balance, Taking everything into account, In conclusion"]]),
            examples([{ wrong: "AI makes all students lazy.", right: "AI may make some students less likely to think independently.", note: "Hedging menghindari klaim berlebihan." }, { wrong: "Stupid people think phones are good.", right: "Some people believe that phones can be useful in class.", note: "Netral dan hormat." }], "Hedge it"),
          ],
        },
        {
          title: "A balanced debate",
          blocks: [
            audio("Radio discussion: a four-day school week", say(["woman", "Proponents of a four-day school week argue that students would have more time to rest and pursue hobbies."], ["man", "They also point out that schools could save money on electricity and transport."], ["woman", "However, critics worry that longer school days might exhaust younger students."], ["man", "There are also concerns that working parents would struggle to find childcare on the fifth day."], ["woman", "On balance, it seems that a trial in a few schools would be the wisest first step."])),
            tryIt(pick("sma12-c1-l2-try1", "What do critics worry about?", ["longer days exhausting younger students and childcare problems", "saving money", "more time for hobbies"], 0, "Pihak kontra.")),
            repeat(["Supporters argue that …", "Critics, however, warn that …", "It can be argued that …", "On balance, …"]),
          ],
        },
      ],
      checkpoint: [
        listen("sma12-c1-l2-c1", voice("Opponents argue that tourism damages coral reefs."), "Listen. Who is described?", ["people against something", "people who support tourism", "tourists"], 0, "Opponents = penentang."),
        pick("sma12-c1-l2-c2", "Which sentence is hedged?", ["Social media may affect some teenagers' sleep.", "Social media destroys every teenager.", "Social media is evil."], 0, "May + some."),
        match("sma12-c1-l2-c3", "Match the expression and the function.", [["Proponents believe…", "reporting supporters"], ["Opponents object that…", "reporting critics"], ["Moreover,…", "addition"], ["On balance,…", "concluding"]], "Fungsi bahasa."),
        fill("sma12-c1-l2-c4", "Complete: It ___ be argued that homework improves discipline.", "It", "be argued that homework improves discipline.", ["can", "could"], "It can be argued that."),
        trPick("sma12-c1-l2-c5", "“Setelah mempertimbangkan semuanya” in English is…", ["Taking everything into account", "Taking everybody into count", "Considering all count"], 0, "Taking everything into account."),
        pick("sma12-c1-l2-c6", "Which conclusion is the most balanced?", ["On balance, the benefits seem greater, provided that clear rules are introduced.", "Critics are completely wrong.", "Nobody should ever do this."], 0, "Kesimpulan seimbang dengan syarat.", { hots: true }),
      ],
    },
    {
      id: "sma12-c1-l3",
      skill: "writing",
      title: "Write and Discuss",
      summary: "Writing a discussion text and holding a balanced group discussion.",
      sections: [
        {
          title: "Plan",
          blocks: [
            pics([["smartphone", "phones at school"], ["bus", "free public transport"], ["food-stall", "street food bans"], ["trophy", "national exams"]]),
            table(["Issue", "For", "Against"], [["Should national exams return?", "fair comparison, motivation", "stress, teaching to the test"], ["Should motorbikes be banned for students under 17?", "safety, legal age", "transport access in villages"], ["Should students do one year of national service?", "skills, unity", "delays study, cost"]]),
            tip("Tulis **jumlah argumen yang seimbang** untuk kedua pihak, lalu baru beri **kesimpulan** yang mempertimbangkan keduanya."),
          ],
        },
        {
          title: "Write and speak",
          blocks: [
            writing({
              id: "sma12-c1-l3-write",
              title: "A discussion text",
              prompt: "Write a discussion text on a current issue (from the table or your own). Introduce the issue, present at least two arguments for and two against with reasons, and end with a balanced conclusion or recommendation.",
              image: "owl-think",
              minWords: 280,
              maxWords: 400,
              tips: ["Issue: In recent years, … has become a controversial issue.", "For: Supporters argue that … Furthermore, …", "Against: On the other hand, critics warn that … In addition, …", "Conclusion: On balance, … / Perhaps the best solution is …"],
              models: [{ label: "Example", text: "Should Motorbikes Be Banned for Students Under 17?\nIn many Indonesian towns, it is common to see junior and senior high school students riding motorbikes to school, even though they are below the legal age for a driving licence. This has led to a debate about whether schools and police should strictly ban underage riding.\nSupporters of a ban argue that young riders are more likely to be involved in accidents because they lack experience and often do not wear helmets. Road safety data regularly show that teenagers are among the most frequent victims of motorbike crashes. Furthermore, a strict ban would teach students to respect the law.\nOn the other hand, critics point out that many students, especially in rural areas, have no other way to get to school. Public transport may be rare, and walking long distances can take hours. They also argue that a ban without alternatives could cause some students to drop out.\nIn addition, some parents feel that their children are responsible riders and that the decision should be made by families.\nOn balance, safety must come first, but a ban alone will not solve the problem. Perhaps the best approach is to combine stricter enforcement with practical alternatives, such as school buses, bicycle programmes and safe walking routes." }],
              rubric: ["My introduction presents the issue neutrally.", "I gave at least two developed arguments for each side.", "I used reporting verbs, connectors and hedging.", "My conclusion weighs both sides.", "My language is formal and objective."],
            }),
            speaking({
              id: "sma12-c1-l3-say",
              title: "Balanced discussion",
              prompt: "In a group (or alone, playing two roles), discuss one issue for two minutes. Present one argument for and one against, respond to each other, and agree on a balanced conclusion.",
              image: "meeting",
              prepSeconds: 60,
              seconds: 120,
              tips: ["Let's start with the arguments in favour …", "That's a valid point. However, …", "Some people might say …", "Taking everything into account, …"],
              models: [{ label: "Example", text: "A: Let's start with the arguments in favour of bringing back national exams. They give a fair way to compare students across Indonesia. B: That's a valid point. However, many students felt huge stress, and some teachers only taught exam questions. A: True, but without a common test, how can universities compare schools with very different standards? B: Some people might say school reports are enough. A: Taking everything into account, maybe a low-stakes national test, used to improve schools rather than to judge students, could be a good compromise. B: I can agree with that." }],
              rubric: ["I presented arguments on both sides.", "I responded respectfully to the other view.", "I used discussion language.", "We reached a balanced conclusion."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sma12-c1-l3-c1", "In the model, why do critics oppose a strict ban?", ["Many rural students have no other transport.", "Motorbikes are safe.", "Police are too busy."], 0, "Argumen kontra."),
        pick("sma12-c1-l3-c2", "What does the model recommend?", ["stricter enforcement plus practical alternatives", "no rules at all", "banning all vehicles"], 0, "Kesimpulan."),
        arrange("sma12-c1-l3-c3", "Put the words in order.", "On balance safety must come first", "Kesimpulan seimbang."),
        fill("sma12-c1-l3-c4", "Complete: That's a ___ point. However, …", "That's a", "point. However, …", ["valid", "good", "fair"], "Mengakui pendapat lawan."),
        trPick("sma12-c1-l3-c5", "“Penegakan hukum yang lebih ketat” in English is…", ["stricter enforcement", "strict enforced more", "harder law making"], 0, "Stricter enforcement."),
        pick("sma12-c1-l3-c6", "Why should a discussion text avoid emotional attacks?", ["It aims to inform readers fairly so they can judge for themselves.", "Emotions are not allowed in English.", "Attacks make texts too short."], 0, "Tujuan objektif.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma12-c1-post",
    title: "Chapter 1 Posttest",
    passPercent: 70,
    passages: [AI],
    questions: [
      pick("sma12-c1-post1", "Supporters ___ that the policy will save money.", ["argue", "argues", "arguing", "argument"], 0, "Supporters + argue."),
      listen("sma12-c1-post2", voice("Nevertheless, there are concerns that the new airport will damage farmland."), "Listen. What is the concern?", ["damage to farmland", "too few passengers", "high ticket prices", "noise at night only"], 0, "Damage to farmland."),
      trPick("sma12-c1-post3", "“Para pendukung” in English is…", ["supporters / proponents", "opponents", "critics", "speakers"], 0, "Supporters."),
      pick("sma12-c1-post4", "Which connector introduces the opposite view?", ["On the other hand", "Furthermore", "In addition", "Moreover"], 0, "Kontras."),
      arrange("sma12-c1-post5", "Put the words in order.", "Critics warn that it may cause stress", "Reporting critics + hedging."),
      pick("sma12-c1-post6", "Which argument suggests AI could reduce inequality?", ["AI can support students without private tutors.", "AI produces errors.", "AI is used in workplaces.", "AI writes essays."], 0, "Baris 4.", { passageId: AI.id }),
      match("sma12-c1-post7", "Match the line and its role.", [["line 1", "issue"], ["line 2", "argument for"], ["line 6", "argument against"], ["line 8", "conclusion"]], "Struktur discussion."),
      fill("sma12-c1-post8", "Complete.", "If a chatbot writes an essay, the student may get a good grade but learn very", ".", ["little"], "Baris 5.", { passageId: AI.id }),
      pick("sma12-c1-post9", "Which word in line 8 shows the writer is being careful (hedging)?", ["Perhaps", "conclusion", "real", "students"], 0, "Perhaps = hedging.", { passageId: AI.id, hots: true }),
      pick("sma12-c1-post10", "Which assignment would best match the writer's recommendation?", ["Write a reflection on how your opinion changed after a class debate.", "Copy a definition from a website.", "Answer ten multiple-choice questions at home.", "Summarise a text using any tool."], 0, "Tugas yang butuh pemikiran pribadi.", { passageId: AI.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Both Sides Now",
    questions: [
      live("sma12-c1-live1", "Discussion text shows…", ["both sides", "one side", "a story", "a recipe"], 0, "question"),
      live("sma12-c1-live2", "People against an idea:", ["opponents", "proponents", "supporters", "fans"], 0, "angry"),
      live("sma12-c1-live3", "Hedging word:", ["may", "always", "never", "definitely"], 0, "owl-think"),
      live("sma12-c1-live4", "“Di sisi lain” =", ["On the other hand", "In addition", "As a result", "For example"], 0, "hand", true),
      live("sma12-c1-live5", "Concluding phrase:", ["On balance", "Firstly", "Moreover", "For instance"], 0, "target"),
      live("sma12-c1-live6", "Copying others' work:", ["plagiarism", "paraphrase", "citation", "summary"], 0, "report"),
      live("sma12-c1-live7", "Addition connector:", ["Furthermore", "However", "Yet", "Whereas"], 0, "pencil"),
      live("sma12-c1-live8", "It can be ___ that…", ["argued", "argue", "arguing", "argument"], 0, "chat"),
    ],
  },
};

const LETTER: Passage = {
  id: "sma12-c2-letter",
  title: "A Scholarship Application Letter",
  pic: "graduation",
  lines: [
    "Dear Selection Committee,",
    "I am writing to apply for the Nusantara Future Leaders Scholarship for undergraduate study in Environmental Engineering, as advertised on your website.",
    "I am currently a Grade 12 student at SMA Negeri 1 Ambon, majoring in science, with an average report score of 91. I have been particularly interested in environmental issues since my coastal village was affected by plastic pollution.",
    "In 2025, I founded “Ambon Bersih”, a youth group that organises monthly beach clean-ups. So far, we have collected more than three tonnes of waste and trained over 200 students to sort and recycle rubbish.",
    "This experience has taught me how to lead a team, communicate with local officials and manage a small budget. It has also shown me that lasting solutions require scientific knowledge, which is why I wish to study engineering.",
    "After graduating, I intend to return to Maluku to design affordable waste-management systems for island communities.",
    "I believe that my academic record, leadership experience and commitment to my region make me a strong candidate for this scholarship.",
    "Please find attached my CV, transcripts and two letters of recommendation. I would welcome the opportunity to discuss my application in an interview.",
    "Thank you for your time and consideration. Yours faithfully, Maria Latuheru",
  ],
};

export const CH2: Level = {
  id: "sma12-ch2",
  title: "Chapter 2 — Applying for Your Future",
  description: "Read job and scholarship advertisements, write application letters and motivation statements, and prepare for interviews using the STAR method and professional language.",
  targetScore: "Writing · Speaking · Reading",
  cover: ["graduation", "staff", "laptop"],
  pretest: {
    id: "sma12-c2-pre",
    title: "Chapter 2 Pretest",
    passPercent: 0,
    questions: [
      pick("sma12-c2-pre1", "An application letter should start by…", ["stating the position you are applying for", "telling a joke", "describing your family", "asking about the salary"], 0, "Tujuan surat di awal."),
      listen("sma12-c2-pre2", voice("Can you tell me about a time when you solved a problem in a team?"), "Listen. What kind of question is this?", ["a behavioural interview question", "a maths question", "a yes/no question", "a personal hobby question"], 0, "Pertanyaan perilaku."),
      trPick("sma12-c2-pre3", "“Surat rekomendasi” in English is…", ["letter of recommendation", "recommended letter paper", "reference book", "letter of permission"], 0, "Letter of recommendation."),
      pick("sma12-c2-pre4", "I am writing to apply ___ the position of trainee.", ["for", "to", "at", "on"], 0, "Apply for."),
      pick("sma12-c2-pre5", "In an interview, which answer about weaknesses is best?", ["I sometimes spend too long on details, so I now set time limits for each task.", "I have no weaknesses.", "I'm lazy.", "I don't know."], 0, "Jujur + upaya perbaikan."),
    ],
  },
  lessons: [
    {
      id: "sma12-c2-l1",
      skill: "reading",
      title: "Reading: A Scholarship Application",
      summary: "Advertisements, requirements and the structure of an application letter.",
      passages: [LETTER],
      sections: [
        {
          title: "Reading an advertisement",
          blocks: [
            examples([{ right: "NUSANTARA FUTURE LEADERS SCHOLARSHIP 2027 — Full tuition + monthly allowance for undergraduate study at partner universities. Requirements: Indonesian citizen, Grade 12 student, average report score ≥ 85, proven leadership or community experience, commitment to return to their home region. Documents: CV, transcripts, motivation letter, two recommendation letters. Deadline: 31 January 2027." }], "The advertisement"),
            vocab([["requirement", "persyaratan", "report"], ["tuition", "biaya kuliah", "money"], ["allowance", "uang saku/tunjangan", "money"], ["transcript", "transkrip nilai", "report"], ["deadline", "tenggat", "calendar"]], "Advertisement words"),
          ],
        },
        {
          title: "The letter",
          blocks: [
            { type: "passage", passage: LETTER },
            table(["Part", "Lines"], [["Opening: purpose and source", "2"], ["Background and qualifications", "3"], ["Evidence of achievement (with numbers)", "4"], ["Skills learned + motivation", "5"], ["Future goals", "6"], ["Why I'm a strong candidate", "7"], ["Attachments + request for interview", "8"], ["Polite closing", "9"]]),
          ],
        },
      ],
      checkpoint: [
        pick("sma12-c2-l1-c1", "What does Maria want to study?", ["Environmental Engineering", "Medicine", "Business"], 0, "Baris 2.", { passageId: LETTER.id }),
        pick("sma12-c2-l1-c2", "How much waste has her group collected?", ["more than three tonnes", "three kilograms", "200 tonnes"], 0, "Baris 4.", { passageId: LETTER.id }),
        fill("sma12-c2-l1-c3", "Complete.", "After graduating, I intend to return to", "to design affordable waste-management systems.", ["Maluku"], "Baris 6.", { passageId: LETTER.id }),
        pickMany("sma12-c2-l1-c4", "Choose ALL the documents Maria attached.", ["CV", "transcripts", "two letters of recommendation", "a birth certificate"], [0, 1, 2], "Baris 8.", { passageId: LETTER.id }),
        pick("sma12-c2-l1-c5", "How does Maria show she meets the “commitment to return” requirement?", ["She says she intends to return to Maluku after graduating.", "She mentions her score.", "She attaches a CV."], 0, "Mencocokkan syarat.", { passageId: LETTER.id, hots: true }),
        pick("sma12-c2-l1-c6", "Why does Maria include numbers (three tonnes, 200 students)?", ["to give concrete evidence of her impact", "to fill the page", "because the committee likes maths"], 0, "Bukti konkret.", { passageId: LETTER.id, hots: true }),
      ],
    },
    {
      id: "sma12-c2-l2",
      skill: "writing",
      title: "Write an Application",
      summary: "Formal phrases, matching your experience to requirements, and writing a motivation letter.",
      sections: [
        {
          title: "Useful phrases",
          blocks: [
            table(["Purpose", "Expressions"], [["Opening", "I am writing to apply for … as advertised in/on …"], ["Background", "I am currently … / I have recently completed …"], ["Skills", "I have developed strong skills in … through …"], ["Evidence", "For example, I successfully … / As a result, …"], ["Motivation", "I am particularly interested in … because …"], ["Fit", "I believe my … make me a suitable candidate."], ["Closing", "I would welcome the opportunity to … / Thank you for your consideration."]]),
            warn("Hindari **pujian diri tanpa bukti** (*I am the best student*), **informasi tidak relevan**, dan **kesalahan ejaan**. Panitia membaca ratusan surat; jelas dan spesifik lebih efektif."),
          ],
        },
        {
          title: "Your letter",
          blocks: [
            tryIt(pick("sma12-c2-l2-try1", "Which sentence gives the best evidence of leadership?", ["I led a team of 12 students to organise a book drive that collected 800 books.", "I am a natural leader.", "Everyone says I'm smart."], 0, "Bukti spesifik.")),
            writing({
              id: "sma12-c2-l2-write",
              title: "An application letter",
              prompt: "Choose a real or imaginary opportunity (a scholarship, an internship, a volunteer programme, an exchange programme or a part-time job). Write a formal application letter that matches your qualifications and experience to the requirements.",
              image: "envelope",
              minWords: 250,
              maxWords: 360,
              tips: ["Opening: purpose + where you saw the advert", "Paragraph 2: education and relevant background", "Paragraph 3: achievements with evidence", "Paragraph 4: motivation and future goals", "Closing: attachments, interview, thanks"],
              models: [{ label: "Example", text: "Dear Ms. Wulandari,\nI am writing to apply for the Summer Internship Programme at Kreasi Digital Studio, as advertised on your Instagram account on 3 March.\nI am currently a Grade 12 student at SMK Negeri 4 Malang, majoring in Multimedia. Over the past two years, I have developed strong skills in video editing, motion graphics and social media content planning.\nLast year, I managed the official Instagram account of our school's 50th anniversary. I planned a three-month content calendar and created more than 60 posts and reels. As a result, the number of followers increased from 2,000 to over 9,000. I also won second place in a provincial short-film competition with a documentary about traditional mask makers.\nI am particularly interested in your studio because of your work promoting local brands. I would like to learn how professional teams manage client projects and deadlines.\nI believe that my technical skills, creativity and reliability make me a suitable candidate. Please find attached my CV and portfolio. I would welcome the opportunity to discuss my application in an interview.\nThank you for your consideration.\nYours sincerely,\nBagas Pradana" }],
              rubric: ["I stated the position and source in the first sentence.", "I matched my experience to the requirements.", "I gave specific evidence with numbers or results.", "I explained my motivation and goals.", "My letter is formal, concise and error-free."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sma12-c2-l2-c1", voice("I would welcome the opportunity to discuss my application in an interview."), "Listen. Where does this sentence usually appear?", ["near the end of an application letter", "at the start of a story", "in a recipe"], 0, "Penutup surat lamaran."),
        pick("sma12-c2-l2-c2", "Which opening is the most appropriate?", ["I am writing to apply for the position of junior designer, as advertised on your website.", "Hi! I want a job.", "Do you have any work for me?"], 0, "Pembuka formal."),
        match("sma12-c2-l2-c3", "Match the purpose and the phrase.", [["opening", "I am writing to apply for…"], ["evidence", "As a result, followers increased by 300%."], ["fit", "I believe my skills make me a suitable candidate."], ["closing", "Thank you for your consideration."]], "Fungsi kalimat."),
        fill("sma12-c2-l2-c4", "Complete: Please find ___ my CV and portfolio.", "Please find", "my CV and portfolio.", ["attached"], "Please find attached."),
        trPick("sma12-c2-l2-c5", "“Saya sangat tertarik dengan program ini karena…” in English is…", ["I am particularly interested in this programme because…", "I am very interesting in this programme because…", "I interest particularly this programme because…"], 0, "Interested in."),
        pick("sma12-c2-l2-c6", "The advertisement asks for “teamwork”. What should you include?", ["a specific example of working successfully in a team", "a list of your favourite films", "your height and weight"], 0, "Sesuaikan dengan syarat.", { hots: true }),
      ],
    },
    {
      id: "sma12-c2-l3",
      skill: "speaking",
      title: "The Interview",
      summary: "Common interview questions, the STAR method and professional manners.",
      sections: [
        {
          title: "The STAR method",
          blocks: [
            table(["Letter", "Meaning", "Example"], [["S — Situation", "the context", "Our school had no recycling system."], ["T — Task", "your responsibility", "As OSIS secretary, I had to propose a solution."], ["A — Action", "what you did", "I surveyed 300 students and worked with the canteen to set up three bins."], ["R — Result", "the outcome", "Plastic waste fell by 40% in three months."]]),
            table(["Common question", "What they want to know"], [["Tell me about yourself.", "a short professional summary"], ["Why do you want this position/scholarship?", "motivation and research"], ["What are your strengths and weaknesses?", "self-awareness"], ["Tell me about a challenge you faced.", "problem-solving (use STAR)"], ["Where do you see yourself in five years?", "goals and commitment"], ["Do you have any questions for us?", "interest and preparation"]]),
          ],
        },
        {
          title: "Practise",
          blocks: [
            audio("A scholarship interview", say(["man", "Thank you for coming, Maria. Could you tell us about a challenge you faced in your clean-up group?"], ["woman", "Certainly. In our first year, many volunteers stopped coming after a few months. As the founder, I needed to keep people motivated."], ["woman", "So I asked members what they wanted, and we started giving small certificates, posting their stories on social media and inviting local leaders to join us."], ["woman", "As a result, our active membership doubled, from 40 to 80 volunteers, within six months."], ["man", "That's impressive. Thank you."])),
            tryIt(pick("sma12-c2-l3-try1", "Which part of the STAR method is “our active membership doubled”?", ["Result", "Situation", "Task"], 0, "Hasil.")),
            speaking({
              id: "sma12-c2-l3-say",
              title: "Mock interview",
              prompt: "Answer three interview questions for the opportunity you applied for: (1) Tell me about yourself. (2) Tell me about a challenge you faced (use STAR). (3) Why should we choose you?",
              image: "staff",
              prepSeconds: 90,
              seconds: 150,
              tips: ["I'm … , a Grade 12 student at … I'm passionate about …", "Situation: … Task: … Action: I … Result: …", "You should choose me because … For example, …"],
              models: [{ label: "Example", text: "I'm Bagas, a Grade 12 multimedia student from Malang. I'm passionate about visual storytelling, especially for local businesses. Last year, our school asked me to manage social media for its 50th anniversary. The challenge was that we had only three weeks and a team of four beginners. I created a simple content calendar, trained the team on templates and assigned clear roles. As a result, we published every post on time and our followers grew from 2,000 to 9,000. You should choose me because I combine technical skills with reliability. I always meet deadlines, and I'm eager to learn from professionals like your team." }],
              rubric: ["My self-introduction was concise and relevant.", "I used the STAR method clearly.", "I gave specific evidence for why I should be chosen.", "I spoke confidently, politely and at a natural pace."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sma12-c2-l3-c1", voice("Where do you see yourself in five years?"), "Listen. What does the interviewer want to know?", ["your future goals", "your address", "your favourite food"], 0, "Tujuan masa depan."),
        pick("sma12-c2-l3-c2", "What does the A in STAR stand for?", ["Action", "Answer", "Ability"], 0, "Action."),
        pick("sma12-c2-l3-c3", "Which is a good question to ask the interviewer at the end?", ["What does a typical day look like for interns here?", "How much holiday will I get first?", "No questions."], 0, "Menunjukkan minat."),
        fill("sma12-c2-l3-c4", "Complete: As a ___, plastic waste fell by 40%.", "As a", ", plastic waste fell by 40%.", ["result"], "As a result."),
        trPick("sma12-c2-l3-c5", "“Ceritakan tentang diri Anda.” in English is…", ["Tell me about yourself.", "Tell me your self story life.", "Say yourself to me."], 0, "Pertanyaan klasik."),
        pick("sma12-c2-l3-c6", "Why is the STAR method effective?", ["It gives a clear, complete and evidence-based answer.", "It makes answers longer.", "It avoids answering."], 0, "Struktur jawaban.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma12-c2-post",
    title: "Chapter 2 Posttest",
    passPercent: 70,
    passages: [LETTER],
    questions: [
      pick("sma12-c2-post1", "I am writing to apply ___ the internship programme.", ["for", "to", "with", "at"], 0, "Apply for."),
      listen("sma12-c2-post2", voice("My greatest strength is my ability to stay calm under pressure. For example, during our school festival, the sound system failed, and I quickly organised a backup."), "Listen. What is the speaker's strength?", ["staying calm under pressure", "singing", "fixing cars", "cooking"], 0, "Stay calm under pressure."),
      trPick("sma12-c2-post3", "“Terima kasih atas waktu dan pertimbangan Anda.” in English is…", ["Thank you for your time and consideration.", "Thanks for your time and considering.", "Thank you your time considerate.", "Thanks to time and consider."], 0, "Penutup formal."),
      pick("sma12-c2-post4", "Which detail does NOT belong in a scholarship letter?", ["your favourite K-pop group", "your leadership experience", "your study plans", "your achievements"], 0, "Tidak relevan."),
      arrange("sma12-c2-post5", "Put the words in order.", "I believe I am a strong candidate for this scholarship", "Kalimat kesesuaian."),
      pick("sma12-c2-post6", "When did Maria found Ambon Bersih?", ["in 2025", "in 2020", "in 2027", "in 2023"], 0, "Baris 4.", { passageId: LETTER.id }),
      match("sma12-c2-post7", "Match the line and its content.", [["line 2", "purpose of the letter"], ["line 4", "achievement with evidence"], ["line 6", "future goals"], ["line 8", "attachments"]], "Struktur surat."),
      fill("sma12-c2-post8", "Complete.", "I have been particularly interested in environmental issues since my coastal village was affected by plastic", ".", ["pollution"], "Baris 3.", { passageId: LETTER.id }),
      pick("sma12-c2-post9", "Which requirement from the advertisement does line 3 address?", ["average report score ≥ 85", "Indonesian citizen", "deadline", "monthly allowance"], 0, "Skor 91.", { passageId: LETTER.id, hots: true }),
      pick("sma12-c2-post10", "What makes Maria's motivation convincing?", ["It connects personal experience, achievements and a clear future plan.", "It is very short.", "It mentions money.", "It criticises other applicants."], 0, "Koherensi motivasi.", { passageId: LETTER.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Get the Job!",
    questions: [
      live("sma12-c2-live1", "Apply ___ a job", ["for", "to", "at", "by"], 0, "staff"),
      live("sma12-c2-live2", "STAR: R =", ["Result", "Reason", "Role", "Rule"], 0, "trophy"),
      live("sma12-c2-live3", "Please find ___ my CV.", ["attached", "attach", "attaching", "attaches"], 0, "envelope"),
      live("sma12-c2-live4", "“Persyaratan” =", ["requirements", "rewards", "reports", "reminders"], 0, "report", true),
      live("sma12-c2-live5", "Best evidence:", ["numbers and results", "self-praise", "jokes", "long stories"], 0, "target"),
      live("sma12-c2-live6", "Last date to apply:", ["deadline", "headline", "timeline", "guideline"], 0, "calendar"),
      live("sma12-c2-live7", "Money for study fees:", ["tuition", "tradition", "tension", "tuning"], 0, "money"),
      live("sma12-c2-live8", "Interview tip:", ["prepare examples", "arrive late", "chew gum", "ask about holidays first"], 0, "clock"),
    ],
  },
};
