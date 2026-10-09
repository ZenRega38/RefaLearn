import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { audio, fill, listen, live, match, pick, pics, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, writing } from "../kit";

// TOEFL iBT (2026 format) — Level 3: Academic Reading and Discussion.

const MIGRATION: Passage = {
  id: "ibt3-migration",
  title: "How Do Migratory Birds Find Their Way?",
  lines: [
    "Every year, billions of birds travel thousands of kilometres between breeding and wintering grounds, often returning to exactly the same locations.",
    "Scientists have long tried to explain how birds navigate with such precision. One early hypothesis was that birds simply memorise landmarks such as coastlines and mountain ranges.",
    "While visual landmarks are important, experiments have shown that birds can navigate even when the sky is overcast and landmarks are invisible. This suggests that they rely on additional cues.",
    "One of these cues is the Earth's magnetic field. Researchers have found that some birds possess light-sensitive proteins in their eyes that may allow them to perceive magnetic direction.",
    "Birds also use the position of the sun during the day and the pattern of stars at night. Young birds raised in planetariums learned to orient themselves according to the artificial night sky.",
    "Most researchers now believe that birds combine several systems, switching between them depending on conditions. This redundancy may explain why migration is so reliable, even across oceans.",
  ],
};

export const IBT3: Level = {
  id: "ibt-l3",
  title: "Level 3 — Academic Reading and Discussion",
  description: "Answer questions on academic passages (main idea, detail, vocabulary, inference, purpose), understand campus announcements, and write a strong contribution to an academic discussion.",
  targetScore: "Target Band 4.0–4.5",
  cover: ["bird", "open-book", "meeting"],
  pretest: {
    id: "ibt-l3-pre",
    title: "Level 3 Pretest",
    passPercent: 0,
    questions: [
      pick("ibt-l3-pre1", "A question asks “Why does the author mention planetariums?” This is a…", ["purpose question", "vocabulary question", "detail question", "main idea question"], 0, "Fungsi/tujuan."),
      listen("ibt-l3-pre2", voice("Attention, students: the deadline to register for spring courses has been extended to Friday at five p.m."), "Listen. What has changed?", ["The registration deadline is later.", "Courses are cancelled.", "Registration is closed.", "Fees have increased."], 0, "Extended = diperpanjang."),
      trPick("ibt-l3-pre3", "“Hipotesis awal” in English is…", ["an early hypothesis", "a first theorem", "an initial thesis paper", "an old idea law"], 0, "Early hypothesis."),
      pick("ibt-l3-pre4", "In the Academic Discussion task, you…", ["respond to a professor's question and other students' posts", "summarise a lecture", "describe a chart", "write a letter to a friend"], 0, "Diskusi daring."),
      pick("ibt-l3-pre5", "A good academic discussion post should…", ["give your opinion and add a new idea or example", "repeat the other students' ideas", "be one sentence", "avoid opinions"], 0, "Kontribusi baru."),
    ],
  },
  lessons: [
    {
      id: "ibt-l3-l1",
      skill: "reading",
      title: "Read an Academic Passage",
      summary: "Main idea, details, vocabulary in context, inference and the author's purpose.",
      passages: [MIGRATION],
      sections: [
        {
          title: "Question types",
          blocks: [
            table(["Type", "Typical wording"], [["Main idea", "What is the passage mainly about?"], ["Detail", "According to the passage, …"], ["Vocabulary", "The word “X” is closest in meaning to…"], ["Inference", "What can be inferred about…?"], ["Purpose", "Why does the author mention…?"]]),
            { type: "passage", passage: MIGRATION },
          ],
        },
        {
          title: "Strategies",
          blocks: [
            vocab([["navigate", "menavigasi/menemukan arah", "map"], ["overcast", "mendung", "cloud"], ["perceive", "merasakan/mengenali", "eye"], ["orient", "mengarahkan diri", "target"], ["redundancy", "sistem cadangan/berlapis", "recycle"]], "Key vocabulary"),
            tip("Untuk soal **purpose**, tanyakan: detail ini **membuktikan**, **mencontohkan**, atau **membantah** apa? Untuk **inference**, pilih yang **pasti** didukung teks, bukan sekadar mungkin."),
            tryIt(pick("ibt-l3-l1-try", "What is the passage mainly about?", ["the different methods birds use to navigate during migration", "why birds migrate", "how planetariums work", "the dangers of migration"], 0, "Gagasan utama.", { passageId: MIGRATION.id })),
          ],
        },
      ],
      checkpoint: [
        pick("ibt-l3-l1-c1", "According to paragraph 3, what showed that birds use more than landmarks?", ["They could navigate when the sky was overcast.", "They followed coastlines.", "They flew only at night.", "They avoided mountains."], 0, "Baris 3.", { passageId: MIGRATION.id }),
        pick("ibt-l3-l1-c2", "The word “perceive” in line 4 is closest in meaning to", ["detect", "ignore", "create", "remember"], 0, "Perceive = mendeteksi.", { passageId: MIGRATION.id }),
        pick("ibt-l3-l1-c3", "Why does the author mention planetariums?", ["to show that birds can learn direction from star patterns", "to describe a tourist attraction", "to compare birds with astronomers", "to argue that birds prefer artificial light"], 0, "Fungsi contoh.", { passageId: MIGRATION.id }),
        pick("ibt-l3-l1-c4", "What can be inferred about the early landmark hypothesis?", ["It was incomplete.", "It was completely correct.", "It was never tested.", "It was proposed recently."], 0, "Inferensi dari baris 3.", { passageId: MIGRATION.id }),
        fill("ibt-l3-l1-c5", "Complete: Using several systems at once is described as ___ .", "Using several systems at once is described as", ".", ["redundancy"], "Baris 6.", { passageId: MIGRATION.id }),
        pick("ibt-l3-l1-c6", "How does paragraph 6 relate to the earlier paragraphs?", ["It combines the separate cues into one explanation.", "It rejects all previous ideas.", "It introduces an unrelated topic.", "It repeats paragraph 1."], 0, "Organisasi teks.", { passageId: MIGRATION.id, hots: true }),
      ],
    },
    {
      id: "ibt-l3-l2",
      skill: "listening",
      title: "Listen to an Announcement",
      summary: "Campus and public announcements: purpose, key details, changes and required actions.",
      sections: [
        {
          title: "What to listen for",
          blocks: [
            table(["Question", "Listen for"], [["Purpose", "first sentence: “I'd like to remind…”, “Please note…”"], ["Change", "has been moved / postponed / extended / cancelled"], ["Action", "you should / you need to / please make sure…"], ["Detail", "times, places, people, conditions"]]),
            pics([["microphone", "announcement"], ["calendar", "dates"], ["clock", "times"], ["map", "places"]]),
          ],
        },
        {
          title: "Practice",
          blocks: [
            audio("Announcement before a lecture", say(["man", "Good morning, everyone. Before we begin, a quick announcement from the department. The guest lecture by Dr Hartono on renewable energy, which was scheduled for this Thursday, has been moved to next Tuesday at the same time, because of a flight delay. It will now take place in the main auditorium instead of Room 12, since more students have registered than expected. If you already signed up, you don't need to register again. However, if you'd like a certificate of attendance, please bring your student card so we can scan it at the door."])),
            tryIt(pick("ibt-l3-l2-try", "Why has the lecture been moved?", ["because of a flight delay", "because the room is under repair", "because Dr Hartono is ill", "because few students registered"], 0, "Flight delay.")),
          ],
        },
      ],
      checkpoint: [
        pick("ibt-l3-l2-c1", "When will the guest lecture take place now?", ["next Tuesday", "this Thursday", "next Thursday", "tomorrow"], 0, "Moved to next Tuesday."),
        pick("ibt-l3-l2-c2", "Why will it be in the main auditorium?", ["More students registered than expected.", "Room 12 is closed.", "The speaker requested it.", "It is cheaper."], 0, "Lebih banyak peserta."),
        pick("ibt-l3-l2-c3", "What should students who already registered do?", ["nothing; they don't need to register again", "register again", "email Dr Hartono", "pay a fee"], 0, "Tidak perlu daftar ulang."),
        pick("ibt-l3-l2-c4", "What do students need for a certificate of attendance?", ["their student card", "a printed ticket", "a signature from the dean", "a photo"], 0, "Student card."),
        listen("ibt-l3-l2-c5", voice("Please note that the gym will be closed on Saturday for floor cleaning."), "What is the purpose of the announcement?", ["to inform people about a temporary closure", "to advertise a class", "to recruit cleaners", "to change the opening hours permanently"], 0, "Penutupan sementara."),
        pick("ibt-l3-l2-c6", "A student registered but forgot their card. What can you infer?", ["They can attend but may not receive a certificate.", "They cannot attend at all.", "They must register again.", "They will get two certificates."], 0, "Inferensi dari syarat.", { hots: true }),
      ],
    },
    {
      id: "ibt-l3-l3",
      skill: "writing",
      title: "Write for an Academic Discussion",
      summary: "Contributing a clear opinion with reasons and a new idea in an online class discussion.",
      sections: [
        {
          title: "The task",
          blocks: [
            text("**Professor Wijaya:** This week we're discussing urban planning. Some people argue that cities should invest mainly in public transport, such as trains and buses. Others say that improving roads for private vehicles is more practical. Which approach do you think is better for growing cities, and why?"),
            text("**Dina:** I think public transport is better. One full bus can replace dozens of cars, so it reduces traffic and pollution."),
            text("**Kevin:** I see Dina's point, but in many areas buses are slow and unreliable. People will keep using motorbikes unless roads are improved."),
            tip("Tulis **sekitar 100 kata atau lebih** dalam waktu yang terbatas (sekitar 10 menit). Nyatakan **posisimu**, tanggapi **satu teman**, lalu tambahkan **alasan atau contoh baru** yang belum disebut."),
          ],
        },
        {
          title: "Write",
          blocks: [
            table(["Move", "Language"], [["State your view", "In my opinion, … / I'd side with…"], ["Engage with a classmate", "Kevin makes a fair point about…; however,…"], ["Add a new idea", "Another factor that hasn't been mentioned is…"], ["Example", "For instance, in Jakarta, the MRT…"]]),
            writing({
              id: "ibt-l3-l3-write",
              title: "Academic discussion post",
              prompt: "Respond to Professor Wijaya's question. Express and support your opinion, and make a contribution that goes beyond what Dina and Kevin have said. Write at least 100 words.",
              image: "meeting",
              minWords: 100,
              maxWords: 170,
              tips: ["I'd side with … because …", "Kevin makes a fair point about …; however, …", "Another factor that hasn't been mentioned is …", "For instance, …"],
              models: [{ label: "Band 5–6 model", text: "I'd side with Dina, although Kevin raises a fair point about unreliable buses. In my view, that problem is a reason to improve public transport rather than abandon it. A factor that hasn't been mentioned yet is land. Growing cities simply don't have enough space to keep widening roads; every new lane quickly fills with more vehicles. Public transport uses space far more efficiently. For instance, after Jakarta opened its MRT line, many commuters who used to spend two hours in traffic switched to the train because it was faster and more predictable. If cities combine reliable rail with feeder buses, people will have a genuine alternative to motorbikes." }],
              rubric: ["I clearly stated my opinion.", "I engaged with a classmate's idea.", "I added a new reason or example not mentioned by others.", "My post is coherent and at least 100 words.", "My grammar and vocabulary are accurate."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("ibt-l3-l3-c1", "What makes an academic discussion post score highly?", ["a clear opinion plus a new, well-explained contribution", "repeating Dina's idea", "writing only one sentence", "asking the professor a question"], 0, "Kontribusi baru."),
        pick("ibt-l3-l3-c2", "Which sentence engages with a classmate?", ["Kevin makes a fair point about slow buses; however, …", "I like buses.", "This is my answer."], 0, "Menanggapi teman."),
        fill("ibt-l3-l3-c3", "Complete: Another factor that hasn't been ___ is land.", "Another factor that hasn't been", "is land.", ["mentioned"], "Hasn't been mentioned."),
        match("ibt-l3-l3-c4", "Match the move and the phrase.", [["state your view", "I'd side with…"], ["engage", "Kevin raises a fair point…"], ["add an idea", "Another factor is…"], ["give an example", "For instance,…"]], "Langkah tulisan."),
        trPick("ibt-l3-l3-c5", "“Saya berpihak pada Dina.” in English is…", ["I'd side with Dina.", "I'd side on Dina.", "I'd sided Dina."], 0, "Side with."),
        pick("ibt-l3-l3-c6", "Which post adds the most value to the discussion?", ["One that introduces land use as a new argument with an example", "One that says “I agree with Dina” only", "One that copies Kevin's post"], 0, "Nilai tambah.", { hots: true }),
      ],
    },
    {
      id: "ibt-l3-l4",
      skill: "speaking",
      title: "Interview: Opinion Questions",
      summary: "Giving balanced but clear opinions on social and academic issues in the interview task.",
      sections: [
        {
          title: "Structure for opinions",
          blocks: [
            table(["Step", "Example"], [["Position", "I think universities should offer more online courses."], ["Reason", "mainly because students can learn at their own pace"], ["Example", "My cousin works part-time and completed two courses online."], ["Limitation", "That said, labs and discussions still work better in person."]]),
            pics([["laptop", "online learning"], ["school", "campus"], ["owl-think", "opinion"], ["clock", "45 seconds"]]),
          ],
        },
        {
          title: "Practice",
          blocks: [
            audio("Interview: education and technology", say(["man", "Should universities offer more courses online?"], ["man", "Is it better for students to work part-time while studying?"], ["man", "Some people think that grades are the best measure of learning. Do you agree?"])),
            speaking({
              id: "ibt-l3-l4-say",
              title: "Opinion interview",
              prompt: "Answer the three opinion questions (about 45 seconds each) using the structure: position → reason → example → limitation.",
              image: "microphone",
              seconds: 150,
              tips: ["I think … mainly because …", "For example, …", "That said, …"],
              models: [{ label: "Model (question 3)", text: "I don't fully agree. Grades are useful because they give a quick, standard way to compare students, but they mostly measure how well someone performs on a test on one day. For example, a classmate of mine always had average grades, but she built an app that our school now uses to track library books, which shows real skill. That said, I accept that universities need some common measure, so I think grades should be combined with projects and portfolios." }],
              rubric: ["I gave a clear position.", "I supported it with a reason and an example.", "I acknowledged a limitation or another view.", "My speech was fluent and well organised."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("ibt-l3-l4-c1", voice("That said, labs and discussions still work better in person."), "What is the function of “That said”?", ["introducing a limitation", "giving an example", "ending the interview"], 0, "Pembatasan."),
        pick("ibt-l3-l4-c2", "Which answer is most balanced?", ["I support online courses for flexibility, though labs work better in person.", "Online courses are the worst.", "Everything should be online forever."], 0, "Seimbang namun jelas."),
        fill("ibt-l3-l4-c3", "Complete: I think so, ___ because students can learn at their own pace.", "I think so,", "because students can learn at their own pace.", ["mainly", "mostly", "partly"], "Mainly because."),
        pick("ibt-l3-l4-c4", "Which example best supports the idea that part-time work builds skills?", ["My brother learned customer service and time management at a café job.", "Coffee is popular.", "Many people work."], 0, "Contoh relevan."),
        trPick("ibt-l3-l4-c5", "“Meskipun demikian” (in speaking) in English is…", ["That said,", "That saying,", "Said that,"], 0, "That said."),
        pick("ibt-l3-l4-c6", "Why might adding a limitation improve an opinion answer?", ["It shows mature reasoning while keeping your position clear.", "It makes you lose the argument.", "It is required in every sentence."], 0, "Penalaran matang.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ibt-l3-post",
    title: "Level 3 Practice Test",
    passPercent: 70,
    passages: [MIGRATION],
    questions: [
      pick("ibt-l3-post1", "According to the passage, light-sensitive proteins may help birds detect…", ["magnetic direction", "food", "temperature", "predators"], 0, "Baris 4.", { passageId: MIGRATION.id }),
      pick("ibt-l3-post2", "The word “overcast” in line 3 is closest in meaning to", ["cloudy", "windy", "bright", "cold"], 0, "Overcast = mendung.", { passageId: MIGRATION.id }),
      pick("ibt-l3-post3", "Which of the following is NOT mentioned as a navigation cue?", ["smell", "the sun", "stars", "the magnetic field"], 0, "Penciuman tidak disebut.", { passageId: MIGRATION.id }),
      pick("ibt-l3-post4", "What does the author suggest about migration across oceans?", ["Combining systems makes it reliable even there.", "Birds cannot cross oceans.", "Only young birds cross oceans.", "Oceans block magnetic signals."], 0, "Baris 6.", { passageId: MIGRATION.id, hots: true }),
      listen("ibt-l3-post5", say(["woman", "Due to heavy rain, today's outdoor career fair will move to the sports hall. All booths will open at eleven instead of ten."]), "Listen. What two changes are announced?", ["new location and later start", "new date and earlier start", "cancellation and refund", "new speakers"], 0, "Lokasi & waktu."),
      listen("ibt-l3-post6", say(["man", "Students who haven't returned their laptops must do so by Friday, or a fee will be added to their account."]), "Listen. What happens if laptops are not returned by Friday?", ["A fee will be charged.", "The laptop will be free.", "Students will be suspended.", "Nothing."], 0, "Fee added."),
      pick("ibt-l3-post7", "Which sentence best starts an academic discussion post?", ["While I understand Kevin's concern, I'd argue that public transport is the better investment.", "Hello professor how are you?", "I don't know."], 0, "Posisi + tanggapan."),
      pick("ibt-l3-post8", "In the discussion task, what should you avoid?", ["repeating classmates' points without adding anything", "giving examples", "stating an opinion", "using paragraphs"], 0, "Hindari pengulangan."),
      pick("ibt-l3-post9", "Interview: “Do grades measure learning well?” Which answer is strongest?", ["Partly. They are a quick measure, but projects show skills tests miss; for example, …", "Yes.", "Grades are letters."], 0, "Jawaban berkembang.", { hots: true }),
      fill("ibt-l3-post10", "Complete: Young birds raised in planetariums learned to ___ themselves using the artificial sky.", "Young birds raised in planetariums learned to", "themselves using the artificial sky.", ["orient"], "Baris 5.", { passageId: MIGRATION.id }),
    ],
  },
  live: {
    title: "Live Quiz — Academic Mode",
    questions: [
      live("ibt-l3-live1", "“Why does the author mention X?” =", ["purpose", "vocabulary", "detail", "main idea"], 0, "question"),
      live("ibt-l3-live2", "Overcast sky =", ["cloudy", "sunny", "starry", "windy"], 0, "cloud"),
      live("ibt-l3-live3", "Academic discussion: add a…", ["new idea", "copy", "question only", "greeting only"], 0, "meeting"),
      live("ibt-l3-live4", "“Diperpanjang” (deadline) =", ["extended", "expanded", "expected", "exited"], 0, "calendar", true),
      live("ibt-l3-live5", "Birds may sense the Earth's…", ["magnetic field", "gravity waves", "radio", "wifi"], 0, "bird"),
      live("ibt-l3-live6", "Limitation phrase:", ["That said,", "For example,", "Firstly,", "Hello,"], 0, "owl-think"),
      live("ibt-l3-live7", "Announcement: “moved to Tuesday” =", ["rescheduled", "cancelled", "repeated", "finished"], 0, "microphone"),
      live("ibt-l3-live8", "Discussion post minimum (approx.):", ["100 words", "10 words", "500 words", "1,000 words"], 0, "pencil"),
    ],
  },
};
