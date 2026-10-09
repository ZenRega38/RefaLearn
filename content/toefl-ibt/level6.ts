import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, pick, pickMany, pics, say, speaking, table, text, tip, trPick, tryIt, voice, warn, writing } from "../kit";

// TOEFL iBT (2026 format) — Level 6: Test Day and Full Mock.

const GLACIER: Passage = {
  id: "ibt6-glacier",
  title: "The Shrinking Glaciers of Papua",
  lines: [
    "Near the summit of Puncak Jaya in Papua lie some of the last tropical glaciers in Asia. A century ago, ice covered several square kilometres of the mountain; today, only small fragments remain.",
    "Measurements suggest that the glaciers have been shrinking at an accelerating rate. Researchers who drilled into the ice in 2010 found that the surface had lowered by several metres within just a few years.",
    "Tropical glaciers are particularly sensitive to warming because temperatures near the equator vary little across the year. Even a small, sustained rise can push the ice beyond the point at which it can recover.",
    "The loss is significant for science as well as for local communities. Ice cores contain layers that record past climate conditions, and once the ice melts, this archive is lost forever.",
    "For the Amungme people, whose traditional lands include the mountain, the glaciers also hold cultural and spiritual meaning.",
    "Scientists predict that the remaining ice could disappear entirely within the coming decade, making Puncak Jaya one of the clearest symbols of a warming planet.",
  ],
};

export const IBT6: Level = {
  id: "ibt-l6",
  title: "Level 6 — Test Day and Full Mock",
  description: "Pace yourself across the adaptive sections, practise every task type under time pressure, and complete a full mixed mock test with a test-day checklist.",
  targetScore: "Target Band 5.5–6.0",
  cover: ["trophy", "clock", "laptop"],
  pretest: {
    id: "ibt-l6-pre",
    title: "Level 6 Pretest",
    passPercent: 0,
    questions: [
      pick("ibt-l6-pre1", "Which task belongs to the Speaking section of the 2026 test?", ["Take an Interview", "Build a Sentence", "Complete the Words", "Read in Daily Life"], 0, "Speaking: Listen and Repeat, Take an Interview."),
      fill("ibt-l6-pre2", "Complete: The glaciers have been shrin___ rapidly.", "The glaciers have been shrin", "rapidly.", ["king"], "Have been shrinking."),
      listen("ibt-l6-pre3", voice("Remind me again — is the test centre on the third or the fourth floor?"), "Choose the best response.", ["It's on the fourth floor, next to the lifts.", "I'm reminding you.", "Floors are flat.", "The test was easy."], 0, "Memberi informasi."),
      trPick("ibt-l6-pre4", "“Tidak ada jeda terjadwal” in English is…", ["There is no scheduled break.", "There is not schedule pause.", "No break schedule is.", "Breaks are not timed always."], 0, "No scheduled break."),
      pick("ibt-l6-pre5", "What is the best approach to a very difficult question in an adaptive section?", ["Make your best guess and move on.", "Leave the computer.", "Spend ten minutes on it.", "Skip the whole section."], 0, "Tebak dan lanjut."),
    ],
  },
  lessons: [
    {
      id: "ibt-l6-l1",
      skill: "reading",
      title: "Reading Under Time Pressure",
      summary: "Pacing in the adaptive Reading section and a timed academic passage.",
      passages: [GLACIER],
      sections: [
        {
          title: "Pacing",
          blocks: [
            table(["Task", "Pacing tip"], [["Complete the Words", "work quickly; trust grammar clues"], ["Read in Daily Life", "read the question first, then scan"], ["Read an Academic Passage", "skim for structure, then answer in order"]]),
            warn("Pada bagian adaptif, Anda **tidak dapat kembali** dengan bebas ke soal sebelumnya seperti pada tes kertas. Jawab dengan teliti tetapi tetap bergerak."),
            pics([["clock", "pace yourself"], ["open-book", "skim first"], ["target", "answer in order"], ["thumbs-up", "never leave blanks"]]),
          ],
        },
        {
          title: "Timed passage",
          blocks: [
            { type: "passage", passage: GLACIER },
            tip("Beri waktu sekitar **6–7 menit** untuk teks ini dan soal-soalnya."),
            tryIt(pick("ibt-l6-l1-try", "What is the passage mainly about?", ["the rapid loss of Papua's tropical glaciers and why it matters", "how to climb Puncak Jaya", "the history of the Amungme people", "glaciers in Europe"], 0, "Gagasan utama.", { passageId: GLACIER.id })),
          ],
        },
      ],
      checkpoint: [
        pick("ibt-l6-l1-c1", "Why are tropical glaciers especially sensitive to warming?", ["Temperatures near the equator vary little during the year.", "They are very large.", "They receive heavy snowfall.", "They are far from the sun."], 0, "Paragraf 3.", { passageId: GLACIER.id }),
        pick("ibt-l6-l1-c2", "The word “archive” in paragraph 4 refers to…", ["a record of past climate stored in the ice", "a library building", "a computer file", "a museum"], 0, "Makna dalam konteks.", { passageId: GLACIER.id }),
        pick("ibt-l6-l1-c3", "Why does the author mention the Amungme people?", ["to show the glaciers' cultural importance", "to describe tourism", "to blame them for melting", "to explain drilling methods"], 0, "Fungsi detail.", { passageId: GLACIER.id }),
        fill("ibt-l6-l1-c4", "Complete: Researchers drilled into the ice in ___ .", "Researchers drilled into the ice in", ".", ["2010"], "Paragraf 2.", { passageId: GLACIER.id }),
        pickMany("ibt-l6-l1-c5", "Choose ALL reasons the loss is significant, according to the passage.", ["scientific climate records will be lost", "cultural and spiritual meaning", "it symbolises a warming planet", "it will raise sea levels by metres"], [0, 1, 2], "Paragraf 4–6.", { passageId: GLACIER.id }),
        pick("ibt-l6-l1-c6", "Which statement is presented as a prediction?", ["The remaining ice could disappear within the coming decade.", "Ice covered several square kilometres a century ago.", "Researchers drilled in 2010.", "The Amungme's lands include the mountain."], 0, "Could = prediksi.", { passageId: GLACIER.id, hots: true }),
      ],
    },
    {
      id: "ibt-l6-l2",
      skill: "listening",
      title: "Listening: Mixed Practice",
      summary: "All four Listening task types in quick succession.",
      sections: [
        {
          title: "Switching between tasks",
          blocks: [
            table(["Task", "Focus"], [["Choose a Response", "function and tone of one sentence"], ["Conversation", "problem → solution → next step"], ["Announcement", "change and required action"], ["Academic Talk", "topic, examples, attitude"]]),
            tip("Rekaman hanya diputar sekali. Fokus pada **tujuan** setiap audio sebelum detail."),
          ],
        },
        {
          title: "Mixed audio",
          blocks: [
            audio("Announcement", say(["man", "Attention, please. Tomorrow's chemistry lab will start thirty minutes later than usual, at two-thirty, because of a fire drill. Lab coats and goggles are still required."])),
            audio("Academic talk", say(["woman", "So far we've talked about how bees find flowers. Now, here's something surprising: some orchids don't produce any nectar at all. Instead, they mimic the shape and smell of female insects, tricking males into visiting. It's an extreme strategy, but clearly a successful one, because these orchids have survived for millions of years."])),
            tryIt(pick("ibt-l6-l2-try", "Why will the lab start later?", ["because of a fire drill", "because the teacher is ill", "because goggles are missing", "because of rain"], 0, "Fire drill.")),
          ],
        },
      ],
      checkpoint: [
        pick("ibt-l6-l2-c1", "What time will the lab start?", ["2:30", "2:00", "3:00", "1:30"], 0, "Two-thirty."),
        pick("ibt-l6-l2-c2", "What do students still need to bring?", ["lab coats and goggles", "nothing", "their textbooks", "a fire extinguisher"], 0, "Required."),
        pick("ibt-l6-l2-c3", "What is surprising about some orchids?", ["They produce no nectar and trick insects instead.", "They are pollinated by birds.", "They grow underwater.", "They live only one day."], 0, "Mimikri."),
        pick("ibt-l6-l2-c4", "What is the professor's attitude toward the orchids' strategy?", ["She sees it as extreme but successful.", "She thinks it is a failure.", "She finds it boring.", "She doubts it exists."], 0, "Sikap."),
        listen("ibt-l6-l2-c5", voice("Any chance you could cover my shift on Saturday?"), "Choose the best response.", ["Sorry, I'm away that weekend, but I can ask Rina.", "Shifts are long.", "I covered my book.", "Saturday is a day."], 0, "Respons alami."),
        pick("ibt-l6-l2-c6", "Why does the professor say “clearly a successful one”?", ["The orchids' long survival is evidence that the strategy works.", "She tested it herself.", "Orchids are popular flowers.", "She is joking."], 0, "Penalaran dari bukti.", { hots: true }),
      ],
    },
    {
      id: "ibt-l6-l3",
      skill: "writing",
      title: "Full Writing Set Under Time",
      summary: "Build a Sentence, Write an Email and Academic Discussion in one timed sequence.",
      sections: [
        {
          title: "Time plan",
          blocks: [
            table(["Task", "Approx. time", "Priority"], [["Build a Sentence", "a few minutes in total", "accuracy, word order"], ["Write an Email", "about 7 minutes", "cover all points, tone"], ["Academic Discussion", "about 10 minutes", "clear view + new contribution"]]),
            tryIt(arrange("ibt-l6-l3-try", "Message: “Are you joining the study group?” Build the reply.", "I would if I had more time this week", "Second conditional.")),
          ],
        },
        {
          title: "Timed tasks",
          blocks: [
            text("**Email task:** Your campus club is organising a beach clean-up. Write to the local village head to: introduce your club, explain the event, and ask for permission to use the village hall for registration."),
            text("**Discussion task — Professor Nuraini:** Should universities require every student to complete community service before graduating? **Rafi:** Yes, it teaches responsibility. **Lia:** It could take time away from studies and part-time jobs."),
            writing({
              id: "ibt-l6-l3-write",
              title: "Timed email + discussion post",
              prompt: "Write (1) the email to the village head (about 100–130 words) and (2) your academic discussion post (at least 100 words). Try to finish both in about 17 minutes.",
              image: "laptop",
              minWords: 200,
              maxWords: 320,
              tips: ["Email: Dear Sir/Madam, … I'm writing on behalf of … We are planning … Would it be possible to …?", "Discussion: I'd side with … Lia raises a fair point …; however, … Another benefit not mentioned is …"],
              models: [{ label: "Email model", text: "Dear Bapak Kepala Desa,\nI'm writing on behalf of the Environmental Club at Universitas Sam Ratulangi. Our club organises regular activities to protect local beaches.\nWe are planning a beach clean-up on Saturday, 15 November, from 7 to 11 a.m., and we expect around sixty student volunteers. We will bring our own equipment and take all the collected waste to the recycling centre.\nWould it be possible to use the village hall from 6:30 to 7:00 a.m. for registration and a short safety briefing? We would leave the hall clean and tidy afterwards.\nThank you very much for considering our request.\nYours faithfully,\nKevin Lumentut, Club Secretary" }, { label: "Discussion model", text: "I'd side with Rafi, although Lia raises a fair point about time. A requirement doesn't have to mean hundreds of hours; even a short programme of, say, forty hours could be completed during holidays. Another benefit that hasn't been mentioned is career experience. Many community projects, such as teaching children or helping small businesses go online, give students practical skills that employers value. For example, my cousin's volunteer work at a village clinic helped her get an internship in public health. So, on balance, a flexible community-service requirement would benefit both students and society." }],
              rubric: ["My email covered all three points with a formal tone.", "My discussion post stated a clear view and added a new idea.", "I managed my time and finished both tasks.", "My grammar and vocabulary were accurate.", "Both texts were clearly organised."],
            }),
          ],
        },
      ],
      checkpoint: [
        arrange("ibt-l6-l3-c1", "Build the reply.", "I am not sure whether I can attend", "Embedded clause."),
        pick("ibt-l6-l3-c2", "Which email sentence asks for permission politely?", ["Would it be possible to use the village hall?", "Give us the hall.", "We take the hall."], 0, "Permintaan izin."),
        pick("ibt-l6-l3-c3", "Which discussion sentence adds a new idea?", ["Another benefit that hasn't been mentioned is career experience.", "I agree with Rafi.", "Lia said time."], 0, "Ide baru."),
        fill("ibt-l6-l3-c4", "Complete: I'm writing ___ behalf of the Environmental Club.", "I'm writing", "behalf of the Environmental Club.", ["on"], "On behalf of."),
        trPick("ibt-l6-l3-c5", "“Kami akan meninggalkan aula dalam keadaan bersih.” in English is…", ["We would leave the hall clean and tidy.", "We will leave clean hall tidy.", "We leaving hall cleaned."], 0, "Leave + object + adjective."),
        pick("ibt-l6-l3-c6", "You have 2 minutes left and haven't written your discussion conclusion. What should you do?", ["Add one clear concluding sentence that states your view.", "Start a new paragraph of examples.", "Delete your post."], 0, "Prioritas waktu.", { hots: true }),
      ],
    },
    {
      id: "ibt-l6-l4",
      skill: "speaking",
      title: "Full Speaking Set and Test-Day Checklist",
      summary: "Listen and Repeat plus a full interview, and practical preparation for test day.",
      sections: [
        {
          title: "Test-day checklist",
          blocks: [
            table(["Before the test", "During the test"], [["check ID requirements and the test format on the official site", "read every instruction carefully"], ["for home testing: quiet room, stable internet, allowed equipment", "keep a steady pace; don't panic over one question"], ["sleep well; eat beforehand", "speak clearly towards the microphone"], ["practise a full timed set at least once", "use all available time in Writing"]]),
            pics([["passport", "ID"], ["wifi", "internet"], ["sleep", "rest well"], ["microphone", "clear voice"]]),
          ],
        },
        {
          title: "Full speaking set",
          blocks: [
            audio("Listen and Repeat: at the bookstore", say(["woman", "Welcome to the campus bookstore."], ["woman", "Textbooks are on the second floor."], ["woman", "Used books are cheaper and are marked with a green sticker."], ["woman", "If you need to return a book, please keep your receipt and bring it within two weeks."])),
            audio("Interview: work and study", say(["man", "What kind of job would you like to have in the future?"], ["man", "Is it better to have one career for life or to change careers several times?"], ["man", "Should universities focus more on practical skills or on theory?"], ["man", "How might artificial intelligence change the jobs available to young people?"])),
            speaking({
              id: "ibt-l6-l4-say",
              title: "Full speaking mock",
              prompt: "First, repeat the four bookstore sentences one by one. Then answer the four interview questions (about 45 seconds each). Record the whole set and evaluate it with the rubric.",
              image: "microphone",
              seconds: 240,
              tips: ["Repeat: chunk by meaning; keep small words.", "Interview: answer → reason → example → limitation.", "Keep a steady pace; finish your sentence before time runs out."],
              models: [{ label: "Model (interview question 4)", text: "I think AI will change many jobs rather than simply remove them. Routine tasks, like sorting data or writing basic reports, will probably be automated. For example, my uncle's accounting office now uses software that does in minutes what used to take a whole day. However, this means people who can work with AI, check its results and communicate with clients will be in high demand. So young people should focus on skills like problem-solving and communication that AI can't easily replace." }],
              rubric: ["I repeated sentences accurately with natural rhythm.", "I answered each interview question fully.", "I used reasons and examples.", "My delivery was fluent and clear.", "I managed time well across the set."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("ibt-l6-l4-c1", voice("Used books are cheaper and are marked with a green sticker."), "How are used books marked?", ["with a green sticker", "with a red label", "with a stamp", "they are not marked"], 0, "Green sticker."),
        pick("ibt-l6-l4-c2", "How long do customers have to return a book?", ["two weeks", "two days", "one month", "no returns"], 0, "Within two weeks."),
        pickMany("ibt-l6-l4-c3", "Choose ALL items on a good home-test checklist.", ["quiet room", "stable internet", "allowed equipment only", "friends in the room to help"], [0, 1, 2], "Aturan tes."),
        fill("ibt-l6-l4-c4", "Complete: AI will probably ___ routine tasks.", "AI will probably", "routine tasks.", ["automate"], "Automate."),
        trPick("ibt-l6-l4-c5", "“Kartu identitas” (for the test) in English is…", ["ID / identification", "identity cardboard", "ident paper"], 0, "ID = kartu identitas."),
        pick("ibt-l6-l4-c6", "Which interview answer is strongest for “one career or many?”", ["It depends on the field, but changing careers can build broader skills; for example, …", "One.", "Careers are jobs."], 0, "Jawaban berkembang.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ibt-l6-post",
    title: "Full Mock Practice Test",
    passPercent: 75,
    passages: [GLACIER],
    questions: [
      fill("ibt-l6-post1", "Complete: Measurements sugg___ that the ice is shrinking.", "Measurements sugg", "that the ice is shrinking.", ["est"], "Suggest."),
      fill("ibt-l6-post2", "Complete: The glaciers are particul___ sensitive to warming.", "The glaciers are particul", "sensitive to warming.", ["arly"], "Particularly."),
      pick("ibt-l6-post3", "According to the passage, what did researchers find in 2010?", ["The ice surface had lowered by several metres in a few years.", "The glaciers had grown.", "The ice was perfectly stable.", "No ice remained."], 0, "Paragraf 2.", { passageId: GLACIER.id }),
      pick("ibt-l6-post4", "What can be inferred about ice cores once glaciers melt?", ["Their climate records cannot be recovered.", "They can be rebuilt.", "They become more accurate.", "They move to the sea."], 0, "Lost forever.", { passageId: GLACIER.id, hots: true }),
      listen("ibt-l6-post5", voice("You're not seriously planning to walk there in this rain, are you?"), "Choose the best response.", ["No, I'll take a taxi.", "Yes, rain is water.", "I'm serious about walking dogs.", "Planning is important."], 0, "Respons pada kejutan."),
      listen("ibt-l6-post6", say(["woman", "The career fair has been moved from the gym to the main hall, and it will now end at four instead of five."]), "What has changed?", ["the place and the end time", "the date only", "the speakers", "nothing"], 0, "Dua perubahan."),
      listen("ibt-l6-post7", say(["man", "Many people assume volcanoes only destroy. But volcanic ash creates some of the most fertile soils on Earth, which is why farms thrive on their slopes."]), "What is the professor's main point?", ["Volcanoes can also have beneficial effects.", "Volcanoes are always dangerous.", "Ash is useless.", "Farmers avoid volcanoes."], 0, "Mengoreksi anggapan.", { hots: true }),
      arrange("ibt-l6-post8", "Build the reply.", "I would have come if I had known", "Third conditional."),
      pick("ibt-l6-post9", "Which email closing suits a letter to an official you don't know personally?", ["Yours faithfully,", "Love,", "See ya,", "XOXO,"], 0, "Formal."),
      pick("ibt-l6-post10", "Which strategy is best for the Academic Discussion task?", ["State a clear view, engage with a classmate and add a new example.", "Repeat the professor's question.", "Write as many words as possible without a view.", "Copy a classmate's post."], 0, "Strategi."),
    ],
  },
  live: {
    title: "Live Quiz — TOEFL iBT Finals",
    questions: [
      live("ibt-l6-live1", "First section of the 2026 test:", ["Reading", "Speaking", "Writing", "Listening"], 0, "open-book"),
      live("ibt-l6-live2", "Email task time (approx.):", ["7 minutes", "30 minutes", "1 minute", "60 minutes"], 0, "clock"),
      live("ibt-l6-live3", "Discussion task time (approx.):", ["10 minutes", "2 minutes", "40 minutes", "90 minutes"], 0, "laptop"),
      live("ibt-l6-live4", "“Atas nama” =", ["on behalf of", "in name of", "for name", "by the name"], 0, "envelope", true),
      live("ibt-l6-live5", "Hard question in adaptive section:", ["guess and move on", "stop the test", "wait 10 minutes", "skip all"], 0, "target"),
      live("ibt-l6-live6", "Tropical glaciers are found on…", ["Puncak Jaya", "Bromo", "Rinjani", "Merapi"], 0, "mountain"),
      live("ibt-l6-live7", "Interview answer formula:", ["answer + reason + example", "one word", "a question", "silence"], 0, "microphone"),
      live("ibt-l6-live8", "Score scale:", ["1–6", "0–9", "310–677", "A–F"], 0, "trophy"),
    ],
  },
};
