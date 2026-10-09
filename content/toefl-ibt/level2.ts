import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, pick, pickMany, pics, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// TOEFL iBT (2026 format) — Level 2: Everyday Campus English.

const NOTICE: Passage = {
  id: "ibt2-notice",
  title: "Notice: Library Renovation",
  lines: [
    "MAIN LIBRARY — RENOVATION NOTICE",
    "From Monday, March 3, to Friday, March 21, the second and third floors of the Main Library will be closed for renovation.",
    "During this period, the first-floor reading room will remain open from 8:00 a.m. to 10:00 p.m. on weekdays and from 9:00 a.m. to 6:00 p.m. on weekends.",
    "Books located on the closed floors can still be requested through the online catalogue. Requested items will be available for pickup at the front desk within 24 hours.",
    "Group study rooms will be temporarily relocated to the Student Union Building, Room 110. Reservations must be made online at least one day in advance.",
    "We apologise for any inconvenience. For questions, email library@university.edu.",
  ],
};

const EMAIL: Passage = {
  id: "ibt2-email",
  title: "Email from a Professor",
  lines: [
    "Subject: Change to Thursday's class",
    "Dear students,",
    "Because I will be presenting at a conference on Thursday, our class that day will be held online instead of in Room 214.",
    "Please join the video call using the link on the course page at the usual time, 10:30 a.m.",
    "We will still have the short quiz on Chapter 6, but it will now be completed online and must be submitted by 11:15 a.m.",
    "Your group project proposals, originally due on Thursday, can now be submitted until Monday at noon.",
    "Best regards, Professor Lim",
  ],
};

export const IBT2: Level = {
  id: "ibt-l2",
  title: "Level 2 — Everyday Campus English",
  description: "Read notices, emails and schedules (Read in Daily Life), understand campus conversations, write a clear and appropriate email, and answer interview questions about familiar topics.",
  targetScore: "Target Band 3.5–4.0",
  cover: ["envelope", "school", "chat"],
  pretest: {
    id: "ibt-l2-pre",
    title: "Level 2 Pretest",
    passPercent: 0,
    questions: [
      pick("ibt-l2-pre1", "“Read in Daily Life” texts are things like…", ["notices, emails, menus and schedules", "long scientific articles", "poems", "novels"], 0, "Teks sehari-hari."),
      listen("ibt-l2-pre2", say(["woman", "Hi, I'm here to change my meal plan."], ["man", "Sure. Are you looking to add more meals or fewer?"]), "Listen. Why did the woman come?", ["to change her meal plan", "to buy a book", "to find a room", "to pay a fine"], 0, "Change my meal plan."),
      trPick("ibt-l2-pre3", "“Dipindahkan sementara” in English is…", ["temporarily relocated", "temporary relocate", "for a time moved it", "temporally located"], 0, "Temporarily relocated."),
      pick("ibt-l2-pre4", "In the Write an Email task, you should…", ["address every point in the task with a suitable tone", "write a long essay", "use slang", "write only one sentence"], 0, "Penuhi semua poin."),
      pick("ibt-l2-pre5", "In Take an Interview, you…", ["answer a series of questions on one topic", "repeat sentences", "read a passage aloud", "describe a graph"], 0, "Wawancara tentang satu topik."),
    ],
  },
  lessons: [
    {
      id: "ibt-l2-l1",
      skill: "reading",
      title: "Read in Daily Life",
      summary: "Finding key details in notices and emails: dates, times, changes, conditions and purpose.",
      passages: [NOTICE, EMAIL],
      sections: [
        {
          title: "Notices",
          blocks: [
            text("Teks sehari-hari singkat tetapi padat **detail**: tanggal, jam, lokasi, syarat dan **perubahan**. Soal sering menanyakan **tujuan teks**, **apa yang berubah**, dan **apa yang harus dilakukan pembaca**."),
            { type: "passage", passage: NOTICE },
            vocab([["renovation", "renovasi", "house"], ["catalogue", "katalog", "laptop"], ["pickup", "pengambilan", "hand"], ["relocated", "dipindahkan", "map"], ["in advance", "sebelumnya", "calendar"]], "Notice vocabulary"),
          ],
        },
        {
          title: "Emails",
          blocks: [
            { type: "passage", passage: EMAIL },
            tip("Untuk email, tanyakan: **Siapa menulis kepada siapa? Mengapa? Apa yang berubah? Apa yang harus dilakukan?**"),
            tryIt(pick("ibt-l2-l1-try", "Why will Thursday's class be online?", ["The professor will be at a conference.", "Room 214 is being renovated.", "The students requested it."], 0, "Baris 3.", { passageId: EMAIL.id })),
          ],
        },
      ],
      checkpoint: [
        pick("ibt-l2-l1-c1", "What is the main purpose of the notice?", ["to inform users about closures and changes during renovation", "to advertise new books", "to announce a job opening", "to explain library history"], 0, "Tujuan teks.", { passageId: NOTICE.id }),
        pick("ibt-l2-l1-c2", "How can students get a book from the closed floors?", ["Request it online and pick it up at the front desk", "Go to the third floor", "Wait until March 22", "Email the professor"], 0, "Baris 4.", { passageId: NOTICE.id }),
        fill("ibt-l2-l1-c3", "Complete: Group study rooms must be reserved at least one day in ___ .", "Group study rooms must be reserved at least one day in", ".", ["advance"], "Baris 5.", { passageId: NOTICE.id }),
        pick("ibt-l2-l1-c4", "By what time must the Chapter 6 quiz be submitted?", ["11:15 a.m.", "10:30 a.m.", "noon on Monday", "Thursday evening"], 0, "Baris 5.", { passageId: EMAIL.id }),
        pick("ibt-l2-l1-c5", "What change does the email make to the project proposals?", ["The deadline is extended to Monday at noon.", "They are cancelled.", "They are now due earlier.", "They must be presented in Room 214."], 0, "Baris 6.", { passageId: EMAIL.id }),
        pick("ibt-l2-l1-c6", "A student wants a group room on Saturday afternoon. What should she do, and when?", ["Reserve online by Friday for Room 110 in the Student Union Building", "Walk into the library on Saturday", "Book the third floor", "Email the professor on Saturday"], 0, "Menggabungkan beberapa detail.", { passageId: NOTICE.id, hots: true }),
      ],
    },
    {
      id: "ibt-l2-l2",
      skill: "listening",
      title: "Listen to a Conversation",
      summary: "Campus conversations: the student's problem, the solution and what will happen next.",
      sections: [
        {
          title: "Typical structure",
          blocks: [
            table(["Stage", "Question you may get"], [["Opening", "Why does the student go to the office?"], ["Problem", "What is the student's problem?"], ["Discussion", "What does the advisor suggest?"], ["Ending", "What will the student probably do next?"], ["Attitude", "What does the woman mean when she says…?"]]),
            pics([["staff", "advisor"], ["boy", "student"], ["question", "problem"], ["target", "solution"]]),
          ],
        },
        {
          title: "Practice conversation",
          blocks: [
            audio("At the housing office", say(["man", "Hi. I'm having a problem with my dorm room. The heater stopped working three days ago."], ["woman", "Oh, I'm sorry. Did you submit a maintenance request online?"], ["man", "I did, on Monday, but nobody has come yet."], ["woman", "Let me check… Ah, your request was assigned to a technician, but there's a backlog because of the cold weather. I can mark it as urgent."], ["man", "That would help. Is there anything I can do in the meantime?"], ["woman", "We have portable heaters you can borrow. Just bring your student ID to the front desk this afternoon."], ["man", "Great, I'll come by after my two o'clock class."])),
            tryIt(pick("ibt-l2-l2-try", "What is the student's problem?", ["His heater has stopped working.", "He lost his student ID.", "He wants to change rooms.", "He missed a class."], 0, "Heater stopped working.")),
          ],
        },
      ],
      checkpoint: [
        pick("ibt-l2-l2-c1", "Why hasn't the heater been fixed yet?", ["There is a backlog of requests.", "He didn't submit a request.", "The technician is on holiday.", "It cannot be repaired."], 0, "Backlog karena cuaca dingin."),
        pick("ibt-l2-l2-c2", "What does the woman offer to do?", ["mark the request as urgent", "move him to another dorm", "buy him a new heater", "call his parents"], 0, "Mark as urgent."),
        pick("ibt-l2-l2-c3", "What does he need to borrow a portable heater?", ["his student ID", "a deposit of $50", "a letter from a professor", "nothing"], 0, "Student ID."),
        pick("ibt-l2-l2-c4", "What will the student probably do next?", ["go to the front desk after his 2 o'clock class", "submit another request", "skip his class", "fix the heater himself"], 0, "Rencana berikutnya."),
        listen("ibt-l2-l2-c5", say(["woman", "You could drop the course, but honestly, I'd talk to the professor first."]), "What does the woman suggest?", ["talking to the professor before dropping the course", "dropping the course immediately", "changing majors", "doing nothing"], 0, "I'd talk to the professor first."),
        pick("ibt-l2-l2-c6", "The woman says “Let me check…” before explaining the backlog. What does this show?", ["She is looking up information to help him.", "She doesn't want to help.", "She is changing the topic."], 0, "Fungsi ungkapan.", { hots: true }),
      ],
    },
    {
      id: "ibt-l2-l3",
      skill: "writing",
      title: "Write an Email",
      summary: "Responding to a situation by covering every required point with the right tone and organisation.",
      sections: [
        {
          title: "The task",
          blocks: [
            text("**Situation:** You are in a study group for a biology course. The group meeting last week did not go well: two members arrived late and the work was not divided fairly. Write an email to your group. In your email: **explain the problem**, **suggest a way to organise the work**, and **propose a time for the next meeting**."),
            table(["Element", "Tip"], [["Greeting", "Hi everyone, / Dear Professor Lim,"], ["Purpose", "state it in the first sentence"], ["Cover every bullet point", "one short paragraph or a few sentences each"], ["Tone", "polite and constructive: avoid blaming individuals"], ["Closing", "Thanks, / Best regards, + your name"]]),
            warn("Email dinilai dari **kelengkapan poin**, **kejelasan**, **tata bahasa** dan **ketepatan nada**. Pada tes Anda memiliki waktu terbatas (sekitar 7 menit), jadi tulis langsung ke inti."),
          ],
        },
        {
          title: "Write",
          blocks: [
            examples([{ wrong: "Some of you were late and lazy. This is unacceptable.", right: "I think last week's meeting was less productive than it could have been, partly because we started late and the tasks weren't clearly divided.", note: "Nada konstruktif." }], "Tone"),
            writing({
              id: "ibt-l2-l3-write",
              title: "Email to the study group",
              prompt: "Write an email to your biology study group. Explain the problem with last week's meeting, suggest a way to organise the work, and propose a time for the next meeting. Aim for about 100–150 words.",
              image: "envelope",
              minWords: 90,
              maxWords: 160,
              tips: ["Hi everyone, I wanted to follow up on last week's meeting.", "I felt that … because …", "To make things easier, why don't we …?", "Would Wednesday at 4 p.m. work for everyone?", "Thanks, …"],
              models: [{ label: "Band 5 model", text: "Hi everyone,\nI wanted to follow up on last week's meeting. I felt that we didn't get as much done as we'd hoped, mainly because we started about twenty minutes late and weren't sure who was responsible for which section.\nTo make things easier, why don't we divide the project into four parts — background, methods, results and conclusion — and each take one? We could also share a document online so everyone can see each other's progress before we meet.\nFor our next meeting, would Wednesday at 4 p.m. in the library work for everyone? If that time is difficult, please suggest an alternative by Monday so we can confirm.\nThanks, and looking forward to working together!\nRizal" }],
              rubric: ["I addressed all three required points.", "My tone was polite and constructive.", "My email was clearly organised with a greeting and closing.", "I used accurate grammar and appropriate vocabulary.", "I stayed within a reasonable length."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("ibt-l2-l3-c1", "Which opening sentence is most effective?", ["I'm writing to follow up on last week's meeting.", "Hello hello!", "So, yeah, about stuff."], 0, "Tujuan jelas."),
        pick("ibt-l2-l3-c2", "Which sentence suggests a solution politely?", ["Why don't we divide the project into four parts?", "You must do more work.", "Divide it now."], 0, "Saran sopan."),
        pickMany("ibt-l2-l3-c3", "Choose ALL features of a good TOEFL email.", ["covers every bullet point", "appropriate tone", "clear organisation", "very long paragraphs"], [0, 1, 2], "Fitur email baik."),
        arrange("ibt-l2-l3-c4", "Build a polite sentence.", "Would Wednesday at four work for everyone", "Mengusulkan waktu."),
        trPick("ibt-l2-l3-c5", "“Saya ingin menindaklanjuti…” in English is…", ["I wanted to follow up on…", "I want follow to up…", "I wanted following on up…"], 0, "Follow up on."),
        pick("ibt-l2-l3-c6", "The task has three bullet points, but your email only covers two. What is the likely effect?", ["a lower score because the task is incomplete", "no effect", "a higher score for being short"], 0, "Kelengkapan penting.", { hots: true }),
      ],
    },
    {
      id: "ibt-l2-l4",
      skill: "speaking",
      title: "Take an Interview",
      summary: "Answering a series of questions on one topic with clear, developed responses.",
      sections: [
        {
          title: "How it works",
          blocks: [
            text("Seorang pewawancara (rekaman) mengajukan **beberapa pertanyaan tentang satu topik**, dari yang personal hingga yang meminta opini. Anda menjawab langsung dalam waktu terbatas (sekitar 45 detik per jawaban). Jawaban yang baik: **jawab langsung → alasan → contoh**."),
            table(["Question type", "Starter"], [["Personal experience", "In my experience, … / When I was …"], ["Preference", "I'd prefer … because …"], ["Opinion", "I believe … One reason is …"], ["Prediction", "In the future, I think …"]]),
            pics([["microphone", "speak"], ["clock", "about 45 s"], ["chat", "interview"], ["owl-think", "reason + example"]]),
          ],
        },
        {
          title: "Practice",
          blocks: [
            audio("Interview: study habits", say(["woman", "Thanks for joining us today. We're interested in how students study. First, where do you usually study, and why?"], ["woman", "Some students prefer studying alone, while others prefer groups. Which do you prefer?"], ["woman", "Do you think schools should give less homework? Why or why not?"], ["woman", "How do you think technology will change the way students study in the future?"])),
            speaking({
              id: "ibt-l2-l4-say",
              title: "Interview practice",
              prompt: "Answer the four interview questions about study habits (about 45 seconds each). Give a direct answer, a reason and an example each time.",
              image: "microphone",
              seconds: 180,
              tips: ["I usually study … because …", "I'd rather study … For example, …", "I believe schools should … One reason is …", "In the future, I think students will …"],
              models: [{ label: "Model (question 2)", text: "I'd prefer studying in a small group, as long as everyone is serious. The main reason is that explaining ideas to other people helps me understand them better. For example, before my chemistry exam last semester, my friends and I took turns teaching each other one topic, and I remembered those topics much more clearly than the ones I studied alone. That said, I still like to review on my own the night before a test." }],
              rubric: ["I answered each question directly.", "I supported answers with reasons and examples.", "I spoke fluently for most of the time.", "My grammar and vocabulary were accurate and varied."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("ibt-l2-l4-c1", voice("Which do you prefer, studying alone or in a group?"), "What type of question is this?", ["preference", "prediction", "personal history only"], 0, "Pilihan."),
        pick("ibt-l2-l4-c2", "Which answer is best developed?", ["I prefer groups because explaining ideas helps me learn; for example, we taught each other before an exam.", "Groups.", "I like groups and groups are good."], 0, "Jawaban + alasan + contoh."),
        pick("ibt-l2-l4-c3", "About how long should each interview answer be?", ["about 45 seconds", "5 seconds", "5 minutes"], 0, "Sekitar 45 detik."),
        fill("ibt-l2-l4-c4", "Complete: I'd ___ study alone because it's quieter.", "I'd", "study alone because it's quieter.", ["rather"], "I'd rather + base verb."),
        trPick("ibt-l2-l4-c5", "“Menurut pengalaman saya” in English is…", ["In my experience", "In my experiment", "On my experience"], 0, "In my experience."),
        pick("ibt-l2-l4-c6", "You don't have a strong opinion on a question. What is the best strategy?", ["Choose one side, give a reason and an example, and briefly mention the other side.", "Stay silent.", "Say “I don't know” and stop."], 0, "Tetap mengembangkan jawaban.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ibt-l2-post",
    title: "Level 2 Practice Test",
    passPercent: 70,
    passages: [NOTICE, EMAIL],
    questions: [
      pick("ibt-l2-post1", "When will the first-floor reading room open on Saturdays?", ["9:00 a.m.", "8:00 a.m.", "10:00 a.m.", "It will be closed."], 0, "Weekends 9–6.", { passageId: NOTICE.id }),
      pick("ibt-l2-post2", "Where will group study rooms be during the renovation?", ["Student Union Building, Room 110", "the third floor", "Room 214", "the front desk"], 0, "Baris 5.", { passageId: NOTICE.id }),
      pick("ibt-l2-post3", "What does Professor Lim want students to do on Thursday at 10:30?", ["join the class online", "go to Room 214", "submit their proposals", "attend the conference"], 0, "Baris 3–4.", { passageId: EMAIL.id }),
      pick("ibt-l2-post4", "What can be inferred about the Chapter 6 quiz?", ["It was originally planned for the classroom.", "It has been cancelled.", "It will take three hours.", "It is optional."], 0, "Now completed online → awalnya di kelas.", { passageId: EMAIL.id, hots: true }),
      listen("ibt-l2-post5", say(["man", "I'd like to join the photography club, but the meetings clash with my lab."], ["woman", "They also have online workshops on Sundays. You could start with those."]), "What does the woman suggest?", ["joining the Sunday online workshops", "dropping his lab", "starting a new club", "buying a camera"], 0, "Saran alternatif."),
      listen("ibt-l2-post6", say(["woman", "So you'll email me your draft by Friday?"], ["man", "Actually, could I have until Monday? I have two exams this week."]), "What does the man request?", ["more time to send his draft", "a new topic", "a meeting on Friday", "help with exams"], 0, "Meminta perpanjangan."),
      pick("ibt-l2-post7", "Which email closing is appropriate for a professor?", ["Best regards, Sinta", "Cya!", "XOXO", "Later, bro"], 0, "Penutup sopan."),
      arrange("ibt-l2-post8", "Build the sentence.", "Could you let me know if that works", "Permintaan sopan."),
      pick("ibt-l2-post9", "Interview: “Should universities require students to live on campus in their first year?” Which opening is strongest?", ["I believe they should, mainly because it helps new students build friendships quickly.", "University.", "Maybe yes maybe no maybe."], 0, "Posisi + alasan."),
      pick("ibt-l2-post10", "In a campus conversation, the final lines usually tell you…", ["what the student will do next", "the history of the university", "the speakers' ages", "nothing important"], 0, "Rencana selanjutnya."),
    ],
  },
  live: {
    title: "Live Quiz — Campus Life",
    questions: [
      live("ibt-l2-live1", "Book in advance =", ["book beforehand", "book later", "cancel", "pay twice"], 0, "calendar"),
      live("ibt-l2-live2", "Email first sentence should state the…", ["purpose", "weather", "date of birth", "signature"], 0, "envelope"),
      live("ibt-l2-live3", "Interview answer formula:", ["answer + reason + example", "yes/no only", "a question back", "silence"], 0, "microphone"),
      live("ibt-l2-live4", "“Renovasi” =", ["renovation", "reservation", "reception", "revolution"], 0, "house", true),
      live("ibt-l2-live5", "I'd ___ study alone.", ["rather", "prefer to", "like better", "want"], 0, "open-book"),
      live("ibt-l2-live6", "Constructive tone avoids…", ["blaming people", "suggestions", "greetings", "thanks"], 0, "thumbs-up"),
      live("ibt-l2-live7", "Conversation ending tells…", ["next step", "the title", "nothing", "the weather"], 0, "target"),
      live("ibt-l2-live8", "Polite request:", ["Could you let me know?", "Tell me now.", "You must tell.", "Answer!"], 0, "chat"),
    ],
  },
};

