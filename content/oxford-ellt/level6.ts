import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { audio, fill, listen, live, match, pick, pickMany, pics, say, sequence, speaking, table, text, tip, trPick, tryIt, voice, warn, writing } from "../kit";

// Oxford ELLT — Level 6: Full Mock and Test Day (B2–C1+).

const MOCK_SEQ: Passage = {
  id: "ellt6-seq",
  title: "Mock Reading Text 1: Learning a Musical Instrument (scrambled)",
  lines: [
    "A. As a result, many adults who once gave up are now returning to the instruments they abandoned in childhood.",
    "B. For decades, learning an instrument was associated with expensive private lessons and years of repetitive practice.",
    "C. Today, however, online tutorials and practice apps have made it far easier and cheaper to get started.",
    "D. Research also suggests that learning music later in life may support memory and wellbeing.",
  ],
};

const MOCK_LONG: Passage = {
  id: "ellt6-long",
  title: "Mock Reading Text 3: The Value of Boredom",
  lines: [
    "Boredom has long been regarded as an unpleasant state to be avoided, and modern technology makes avoiding it easier than ever. With a smartphone in our pocket, we need never experience an idle moment.",
    "Yet some psychologists argue that boredom serves a useful purpose. It signals that our current activity is not meeting our needs, prompting us to seek something more meaningful.",
    "In a frequently cited experiment, participants who first completed a deliberately dull task, such as copying numbers from a phone directory, subsequently produced more creative ideas than those who had not.",
    "The researchers suggested that boredom allowed participants' minds to wander, and that this mental drifting encouraged unexpected connections between ideas.",
    "Critics caution against overstating these findings. Chronic boredom has been linked to poor mental health, and the creative benefits observed in laboratory settings may not translate into everyday life.",
    "Perhaps the more modest conclusion is that brief periods without stimulation are not something to be feared. Occasionally leaving our phones aside may give our minds the space they need to think differently.",
  ],
};

export const ELLT6: Level = {
  id: "ellt-l6",
  title: "Level 6 — Full Mock and Test Day",
  description: "Complete a full mock across all four modules under realistic timing, review strategies for each task type, and prepare for the online test day.",
  targetScore: "Target CEFR B2–C1+",
  cover: ["trophy", "laptop", "clock"],
  pretest: {
    id: "ellt-l6-pre",
    title: "Level 6 Pretest",
    passPercent: 0,
    questions: [
      pick("ellt-l6-pre1", "Which module includes a summary task?", ["Writing", "Reading", "Listening", "Speaking"], 0, "Writing Task 1."),
      pick("ellt-l6-pre2", "Which listening recording is played only once?", ["the first monologue", "the note-completion recording", "the multi-speaker recording", "all of them"], 0, "Rekaman pertama sekali."),
      listen("ellt-l6-pre3", voice("Please make sure your camera and microphone are working before the speaking test begins."), "What should candidates check?", ["camera and microphone", "passport only", "their essay", "a pencil"], 0, "Kesiapan teknis."),
      trPick("ellt-l6-pre4", "“Dengan sengaja membosankan” in English is…", ["deliberately dull", "deliberate dullness of", "boring by accident", "dully deliberate"], 0, "Deliberately dull."),
      pick("ellt-l6-pre5", "How long is the Speaking module approximately?", ["20–25 minutes", "2 hours", "5 minutes", "60 minutes"], 0, "Sekitar 20–25 menit."),
    ],
  },
  lessons: [
    {
      id: "ellt-l6-l1",
      skill: "reading",
      title: "Mock Reading Module",
      summary: "Paragraph sequencing and a C1 text under a 40-minute plan.",
      passages: [MOCK_SEQ, MOCK_LONG],
      sections: [
        {
          title: "Text 1: Sequencing",
          blocks: [
            table(["Text", "Suggested time"], [["Text 1 (sequencing, ~200 words)", "about 8 minutes"], ["Text 2 (gap-fill, ~400 words)", "about 12 minutes"], ["Text 3 (C1 multiple choice, 500–600 words)", "about 18 minutes"], ["Final check", "about 2 minutes"]]),
            { type: "passage", passage: MOCK_SEQ },
            tryIt(sequence("ellt-l6-l1-try", "Put paragraphs A–D in the correct order.", ["B. For decades, learning an instrument was associated with expensive lessons.", "C. Today, however, online tutorials have made it easier and cheaper.", "A. As a result, many adults are returning to their instruments.", "D. Research also suggests music may support memory and wellbeing."], "B (masa lalu) → C (however, sekarang) → A (as a result) → D (also, tambahan).", { passageId: MOCK_SEQ.id })),
          ],
        },
        {
          title: "Text 3: C1 multiple choice",
          blocks: [
            { type: "passage", passage: MOCK_LONG },
            pics([["clock", "40 minutes"], ["open-book", "3 texts"], ["owl-think", "inference"], ["thumbs-up", "answer all"]]),
          ],
        },
      ],
      checkpoint: [
        pick("ellt-l6-l1-c1", "According to some psychologists, what is the function of boredom?", ["It signals that we need something more meaningful.", "It improves physical health.", "It has no function.", "It helps us sleep."], 0, "Paragraf 2.", { passageId: MOCK_LONG.id }),
        pick("ellt-l6-l1-c2", "Why does the writer mention copying numbers from a phone directory?", ["as an example of a deliberately dull task in an experiment", "to describe an old job", "to criticise phone directories", "to give a memory tip"], 0, "Fungsi contoh.", { passageId: MOCK_LONG.id }),
        pick("ellt-l6-l1-c3", "What does “mental drifting” in paragraph 4 refer to?", ["the mind wandering", "falling asleep", "forgetting things", "moving house"], 0, "Rujukan.", { passageId: MOCK_LONG.id }),
        pick("ellt-l6-l1-c4", "What is the critics' main concern?", ["Laboratory findings may not apply to everyday life, and chronic boredom can be harmful.", "Boredom is always creative.", "Phones should be banned.", "The experiment was too long."], 0, "Paragraf 5.", { passageId: MOCK_LONG.id }),
        pick("ellt-l6-l1-c5", "Which word best describes the writer's final conclusion?", ["cautious", "extreme", "angry", "uncertain about everything"], 0, "Modest conclusion.", { passageId: MOCK_LONG.id }),
        pick("ellt-l6-l1-c6", "Which recommendation would the writer most likely support?", ["Occasionally spending time without screens to let the mind wander", "Avoiding boredom at all costs", "Spending all day doing dull tasks", "Using phones constantly"], 0, "Paragraf 6.", { passageId: MOCK_LONG.id, hots: true }),
      ],
    },
    {
      id: "ellt-l6-l2",
      skill: "listening",
      title: "Mock Listening Module",
      summary: "All three recording types in 25 minutes: monologue, note completion and several speakers.",
      sections: [
        {
          title: "Recording 1 (played once) and Recording 2 (played twice)",
          blocks: [
            audio("Recording 1: Campus sustainability talk (once)", say(["woman", "This year, our campus aims to cut energy use by fifteen per cent. The biggest change is in the library, where motion sensors will switch off lights in empty rooms. Students can also join the Green Team, which meets every second Wednesday."])),
            audio("Recording 2: Research methods seminar (twice)", say(["man", "For your project, you'll collect data through a short survey of at least thirty participants. Keep the survey anonymous, and include no more than ten questions. The deadline for the ethics form is the twelfth of March, and the final report should be between two and three thousand words."]), true),
            tryIt(pick("ellt-l6-l2-try", "By how much does the campus aim to reduce energy use?", ["15%", "50%", "5%", "30%"], 0, "Fifteen per cent.")),
          ],
        },
        {
          title: "Recording 3 (several speakers)",
          blocks: [
            audio("Recording 3: Views on a four-day week", say(["man", "Speaker 1: I'd welcome it. I'd finally have time for my family."], ["woman", "Speaker 2: In theory it's great, but I doubt my workload would actually shrink."], ["man", "Speaker 3: For our small business, it would be impossible; customers expect us five days a week."], ["woman", "Speaker 4: I'd accept it only if salaries stayed the same."])),
            tip("Untuk rekaman dengan banyak pembicara, bedakan **dukungan penuh**, **keraguan**, **penolakan**, dan **dukungan bersyarat**."),
          ],
        },
      ],
      checkpoint: [
        fill("ellt-l6-l2-c1", "Notes (A NUMBER): Survey at least ___ participants", "Survey at least", "participants", ["30", "thirty"], "Thirty participants."),
        fill("ellt-l6-l2-c2", "Notes (ONE WORD): The survey must be ___", "The survey must be", "", ["anonymous"], "Anonymous."),
        fill("ellt-l6-l2-c3", "Notes: Ethics form deadline: ___ March", "Ethics form deadline:", "March", ["12", "12th", "twelfth"], "The twelfth of March."),
        match("ellt-l6-l2-c4", "Match the speaker and the view.", [["Speaker 1", "full support"], ["Speaker 2", "doubts the workload would fall"], ["Speaker 3", "says it is impossible for them"], ["Speaker 4", "supports it with a condition"]], "Tingkat opini."),
        pick("ellt-l6-l2-c5", "How often does the Green Team meet?", ["every second Wednesday", "every Wednesday", "once a month", "every day"], 0, "Every second Wednesday."),
        pick("ellt-l6-l2-c6", "Speaker 2 says “In theory it's great, but…”. What is her real position?", ["sceptical about the practical benefits", "strongly in favour", "completely opposed in principle", "indifferent"], 0, "Nuansa.", { hots: true }),
      ],
    },
    {
      id: "ellt-l6-l3",
      skill: "writing",
      title: "Mock Writing Module",
      summary: "Summary and essay in 50 minutes, with a time plan and final checklist.",
      passages: [MOCK_LONG],
      sections: [
        {
          title: "Time plan and checklist",
          blocks: [
            table(["Task", "Suggested time", "Checklist"], [["Task 1 summary (80–100 words)", "about 15 minutes", "main ideas, own words, no opinion"], ["Task 2 essay (190–250 words)", "about 30 minutes", "clear position, developed paragraphs, conclusion"], ["Proofreading", "about 5 minutes", "verb forms, articles, plurals, spelling"]]),
            warn("Ingat bobot: **Task 1 = 30%**, **Task 2 = 70%**. Jangan menghabiskan terlalu banyak waktu pada ringkasan."),
          ],
        },
        {
          title: "Mock tasks",
          blocks: [
            text("**Task 1:** Summarise “The Value of Boredom” in 80–100 words. **Task 2 essay prompt:** “Young people today spend too much time on screens, and this harms their creativity.” To what extent do you agree?"),
            writing({
              id: "ellt-l6-l3-write",
              title: "Full writing mock",
              prompt: "Complete both tasks in about 50 minutes: Task 1 summary (80–100 words) of “The Value of Boredom”, and Task 2 essay (190–250 words) on screen time and creativity.",
              image: "pencil",
              minWords: 270,
              maxWords: 360,
              tips: ["Summary: The text argues that … Supporting this, … However, critics … The writer concludes that …", "Essay: While screens …, I partly agree that … because … Admittedly, … Ultimately, …"],
              models: [{ label: "Summary model", text: "The text questions the common view that boredom should always be avoided. Some psychologists believe it alerts us when an activity is unfulfilling and encourages us to look for something more worthwhile. In one well-known study, people who first completed a tedious task later generated more creative ideas, possibly because their minds were free to wander. However, critics warn that persistent boredom can harm mental health and that laboratory results may not apply to real life. The writer concludes that short breaks from stimulation can be beneficial." }],
              rubric: ["My summary covers the main points in my own words.", "My essay has a clear, consistent position.", "I developed ideas with reasons and examples.", "I managed my time and completed both tasks.", "I proofread for common errors."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("ellt-l6-l3-c1", "Which task carries more weight in the Writing module?", ["Task 2 essay", "Task 1 summary", "they are equal"], 0, "Task 2 berbobot 70%."),
        pick("ellt-l6-l3-c2", "Which sentence would be wrong in the summary?", ["I believe teenagers should be bored more often.", "Critics caution against overstating the findings.", "The study used a dull task."], 0, "Opini pribadi."),
        pickMany("ellt-l6-l3-c3", "Choose ALL items for a final proofreading check.", ["verb forms", "articles", "plurals", "font colour"], [0, 1, 2], "Daftar periksa."),
        fill("ellt-l6-l3-c4", "Paraphrase (ONE WORD): “deliberately dull” = deliberately ___", "deliberately", "", ["tedious", "boring", "monotonous"], "Sinonim."),
        trPick("ellt-l6-l3-c5", "“Melebih-lebihkan temuan” in English is…", ["overstate the findings", "overtake the findings", "overdo finding"], 0, "Overstate."),
        pick("ellt-l6-l3-c6", "You have 10 minutes left and haven't started Task 2. What should you do?", ["Write a short but complete essay with a clear position and conclusion.", "Keep polishing Task 1.", "Leave Task 2 blank."], 0, "Prioritas bobot.", { hots: true }),
      ],
    },
    {
      id: "ellt-l6-l4",
      skill: "speaking",
      title: "Mock Speaking and Test-Day Preparation",
      summary: "A complete speaking simulation and a technical and personal checklist for the online test.",
      sections: [
        {
          title: "Test-day checklist",
          blocks: [
            table(["Technical", "Personal"], [["stable internet; laptop charged", "valid ID ready"], ["working webcam and microphone", "quiet, private room with good light"], ["close other applications", "sleep well; arrive early to log in"], ["follow the proctoring rules", "keep water nearby if allowed"]]),
            pics([["wifi", "stable internet"], ["laptop", "charged laptop"], ["passport", "ID"], ["sleep", "rest"]]),
            tip("Ujian dilakukan **online dengan pengawasan**. Bacalah peraturan resmi tentang perangkat dan ruangan sebelum hari tes."),
          ],
        },
        {
          title: "Full speaking mock",
          blocks: [
            audio("Examiner prompts", say(["woman", "Task 2. Topic: Free time. First, describe how young people in your country usually spend their free time. Second, compare free time today with free time twenty years ago. Third, what would happen if everyone had a four-day working week?"], ["woman", "Task 3. In your essay, you argued about screen time and creativity. Could you explain your main argument? What evidence would convince you to change your mind?"], ["woman", "Task 4. Look at the picture: a family at dinner, each person looking at a phone. What does it suggest to you? Should families have rules about technology? How might this change in the future?"])),
            speaking({
              id: "ellt-l6-l4-say",
              title: "Full speaking mock",
              prompt: "Complete the full mock: Task 2 (three prompts: factual, comparative, hypothetical; about 2–3 minutes), Task 3 (questions on your essay; about 5 minutes), Task 4 (picture discussion; about 5 minutes). Record and evaluate yourself.",
              image: "video-app",
              prepSeconds: 45,
              seconds: 780,
              tips: ["Task 2: plan three short sections in 45 seconds", "Task 3: clarify, justify, accept challenges", "Task 4: describe briefly → interpret → discuss issues", "Throughout: vary vocabulary and grammar"],
              models: [{ label: "Task 4 model", text: "The picture suggests that technology has changed family life quite dramatically. Even when everyone is together at the table, each person seems to be in a separate world. I don't think phones are the enemy, though; they help families stay in touch when they're apart. The problem is more about habits. From my perspective, simple rules can help, such as no phones during meals, as long as parents follow them too. In the future, I imagine devices will become even more integrated into daily life, so these conversations about healthy limits will become more important, not less." }],
              rubric: ["I handled all three Task 2 prompts with clear organisation.", "I discussed my essay confidently in Task 3.", "I interpreted the picture and discussed wider issues in Task 4.", "I used a wide range of vocabulary and structures accurately.", "I spoke fluently and interacted naturally."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("ellt-l6-l4-c1", voice("What evidence would convince you to change your mind?"), "Which speaking task is this question from?", ["Task 3 (questions on your essay)", "Task 1", "Task 4", "Task 2"], 0, "Tentang esai."),
        pick("ellt-l6-l4-c2", "Which prompt is comparative?", ["Compare free time today with free time twenty years ago.", "Describe your free time.", "What would happen with a four-day week?"], 0, "Perbandingan."),
        pick("ellt-l6-l4-c3", "Which technical step is essential before the online test?", ["checking your webcam and microphone", "buying a new phone", "printing your essay", "turning off the internet"], 0, "Kesiapan teknis."),
        fill("ellt-l6-l4-c4", "Complete: Phones help families stay in ___ when they're apart.", "Phones help families stay in", "when they're apart.", ["touch"], "Stay in touch."),
        trPick("ellt-l6-l4-c5", "“Ruangan yang tenang dan pribadi” in English is…", ["a quiet, private room", "a calm public hall", "a silent shared space"], 0, "Syarat ruangan."),
        pick("ellt-l6-l4-c6", "Which answer to “Should families have rules about technology?” is most developed?", ["Yes, simple rules like no phones at meals can help, as long as parents follow them too.", "Yes.", "Technology is technology."], 0, "Jawaban + syarat.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ellt-l6-post",
    title: "Full Mock Quiz",
    passPercent: 75,
    passages: [MOCK_LONG],
    questions: [
      sequence("ellt-l6-post1", "Order the sentences.", ["Online shopping grew quickly in the early 2020s.", "As a result, many small shops struggled.", "However, some adapted by selling through social media."], "Fakta → akibat → kontras."),
      pick("ellt-l6-post2", "Gap: Many cities are investing in public transport to ___ congestion.", ["ease", "rise", "make up", "take after"], 0, "Ease congestion."),
      pick("ellt-l6-post3", "According to the boredom text, what may happen when the mind wanders?", ["unexpected connections between ideas", "loss of memory", "better sleep", "faster reading"], 0, "Paragraf 4.", { passageId: MOCK_LONG.id }),
      pick("ellt-l6-post4", "What is the writer's attitude to the creativity research?", ["interested but cautious", "completely dismissive", "uncritically enthusiastic", "angry"], 0, "Sikap.", { passageId: MOCK_LONG.id, hots: true }),
      listen("ellt-l6-post5", say(["man", "Registration closes on Friday, not Monday as the email said."]), "When does registration close?", ["Friday", "Monday", "Wednesday", "next week"], 0, "Koreksi informasi."),
      fill("ellt-l6-post6", "Notes (ONE WORD): the final report should be between two and three thousand ___", "the final report should be between two and three thousand", "", ["words"], "Words.", { audio: say(["man", "The final report should be between two and three thousand words."]) }),
      listen("ellt-l6-post7", say(["woman", "I'd support stricter rules, provided they're explained clearly to students."]), "What is the speaker's position?", ["conditional support", "strong opposition", "full unconditional support", "indifference"], 0, "Provided that."),
      pick("ellt-l6-post8", "Which summary sentence is objective?", ["The writer suggests that short breaks from stimulation may be beneficial.", "I think boredom is great.", "Everyone should throw away their phones."], 0, "Objektif."),
      pick("ellt-l6-post9", "Which essay sentence best shows C1 range?", ["Not only do screens shape how we communicate, but they also influence how we think.", "Screens are bad and good.", "I use my phone a lot."], 0, "Struktur kompleks."),
      pick("ellt-l6-post10", "Which Task 4 response is strongest?", ["The picture seems to suggest that technology isolates people even when they're together; one could argue…", "There is a family and some phones.", "Phones are rectangles."], 0, "Interpretasi."),
    ],
  },
  live: {
    title: "Live Quiz — ELLT Finals",
    questions: [
      live("ellt-l6-live1", "Writing module time:", ["50 min", "25 min", "40 min", "90 min"], 0, "pencil"),
      live("ellt-l6-live2", "Task 2 weight:", ["70%", "30%", "50%", "100%"], 0, "target"),
      live("ellt-l6-live3", "Reading texts:", ["3", "2", "5", "1"], 0, "open-book"),
      live("ellt-l6-live4", "“Dengan sengaja” =", ["deliberately", "deliciously", "delicately", "definitely"], 0, "owl-think", true),
      live("ellt-l6-live5", "Before the test, check your…", ["webcam and mic", "shoes", "lunch", "bookshelf"], 0, "laptop"),
      live("ellt-l6-live6", "Speaking Task 3 asks about your…", ["essay", "picture", "family", "summary"], 0, "chat"),
      live("ellt-l6-live7", "“Provided that” signals…", ["a condition", "a contrast", "an example", "a result"], 0, "question"),
      live("ellt-l6-live8", "Results usually within…", ["48 hours", "48 days", "4 hours", "4 months"], 0, "clock"),
    ],
  },
};
