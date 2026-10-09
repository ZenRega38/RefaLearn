import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, examples, fill, listen, live, match, pick, pickMany, pics, repeat, speaking, table, text, tip, trPick, tryIt, voice, warn } from "../kit";

// TOEFL iBT (format from 21 January 2026) — Level 1: Meet the New Test.
// Original practice material in the style of the official task types.

export const IBT1: Level = {
  id: "ibt-l1",
  title: "Level 1 — Meet the New TOEFL iBT",
  description: "Understand the 2026 test (four sections, about 90 minutes, 1–6 band scores) and practise the first task in each section: Complete the Words, Listen and Choose a Response, Build a Sentence and Listen and Repeat.",
  targetScore: "Target Band 3.0–3.5",
  cover: ["laptop", "headset", "trophy"],
  pretest: {
    id: "ibt-l1-pre",
    title: "Level 1 Pretest",
    passPercent: 0,
    questions: [
      pick("ibt-l1-pre1", "Since January 2026, TOEFL iBT section scores are reported on a…", ["1–6 band scale", "0–30 scale only", "310–677 scale", "0–9 scale"], 0, "Skala baru 1–6 (dengan kenaikan 0,5)."),
      pick("ibt-l1-pre2", "Which sections of the new test are adaptive?", ["Reading and Listening", "Writing and Speaking", "all four", "none"], 0, "Hanya Reading dan Listening yang adaptif."),
      listen("ibt-l1-pre3", voice("Could you tell me where the library is?"), "Listen. Choose the best response.", ["Sure, it's next to the science building.", "Yes, I like reading.", "The library was built in 1990.", "No, I'm not a student."], 0, "Respons yang sesuai: memberi arah."),
      fill("ibt-l1-pre4", "Complete the word: The stud___ handed in their essays.", "The stud", "handed in their essays.", ["ents"], "Students (jamak)."),
      trPick("ibt-l1-pre5", "“Bersifat adaptif” (a test) means…", ["questions change difficulty based on your answers", "the test is shorter for everyone", "you can choose the topics", "the test has no time limit"], 0, "Tes adaptif menyesuaikan tingkat kesulitan."),
    ],
  },
  lessons: [
    {
      id: "ibt-l1-l1",
      skill: "reading",
      title: "Test Overview and Complete the Words",
      summary: "The 2026 format, timing and scoring, and the fill-in-the-missing-letters reading task.",
      sections: [
        {
          title: "The 2026 TOEFL iBT at a glance",
          blocks: [
            table(["Section", "Approx. time", "Task types"], [["Reading (adaptive)", "about 30 min", "Complete the Words · Read in Daily Life · Read an Academic Passage"], ["Listening (adaptive)", "about 29 min", "Listen and Choose a Response · Conversation · Announcement · Academic Talk"], ["Speaking", "about 8 min", "Listen and Repeat · Take an Interview"], ["Writing", "about 23 min", "Build a Sentence · Write an Email · Write for an Academic Discussion"]]),
            text("Sejak **21 Januari 2026**, TOEFL iBT memakai format baru yang lebih pendek (sekitar 90 menit). Skor tiap bagian dan skor total dilaporkan pada skala **1–6** (kenaikan 0,5). Selama masa transisi, laporan skor juga menampilkan skala lama 0–120 sebagai pembanding."),
            pics([["open-book", "Reading"], ["headset", "Listening"], ["microphone", "Speaking"], ["laptop", "Writing"]]),
            warn("Format dan detail dapat diperbarui oleh ETS. Selalu cek informasi resmi di situs ETS sebelum tes."),
          ],
        },
        {
          title: "Complete the Words",
          blocks: [
            text("Tugas ini menampilkan paragraf akademik pendek. Pada beberapa kata, **bagian akhir kata dihilangkan**; Anda melengkapi hurufnya. Yang diuji: **kosakata**, **tata bahasa** (bentuk kata, jamak, tense) dan **pemahaman konteks**."),
            examples([{ right: "Bees play an import___ role in agri___. → important, agriculture" }, { right: "Many pla___ depend on them for pollin___. → plants, pollination" }], "Example"),
            tip("Lihat **kata sebelum dan sesudahnya**: apakah butuh kata benda jamak (*plants*), kata sifat (*important*), atau kata kerja lampau (*developed*)?"),
            tryIt(fill("ibt-l1-l1-try", "Complete: Rain forests cover about six per___ of the Earth's surface.", "Rain forests cover about six per", "of the Earth's surface.", ["cent"], "Percent/per cent.")),
          ],
        },
      ],
      checkpoint: [
        fill("ibt-l1-l1-c1", "Complete: Volcanic soil is extre___ fertile.", "Volcanic soil is extre", "fertile.", ["mely"], "Extremely (adverb)."),
        fill("ibt-l1-l1-c2", "Complete: Farmers have grow___ rice on these slopes for centuries.", "Farmers have grow", "rice on these slopes for centuries.", ["n"], "Have grown (present perfect)."),
        fill("ibt-l1-l1-c3", "Complete: The research was publi___ in 2024.", "The research was publi", "in 2024.", ["shed"], "Was published (pasif)."),
        fill("ibt-l1-l1-c4", "Complete: Many speci___ of birds migrate south.", "Many speci", "of birds migrate south.", ["es"], "Species."),
        pick("ibt-l1-l1-c5", "How long is the new TOEFL iBT in total?", ["about 90 minutes", "about 3 hours", "about 30 minutes", "about 2 hours 45 minutes"], 0, "Sekitar 90 menit."),
        pick("ibt-l1-l1-c6", "“The temperature drop___ sharply at night.” Which ending is best, and why?", ["-s, because the subject is singular and it describes a general fact", "-ing, because it is a noun", "-ly, because it is an adverb"], 0, "Drops: present simple orang ketiga.", { hots: true }),
      ],
    },
    {
      id: "ibt-l1-l2",
      skill: "listening",
      title: "Listen and Choose a Response",
      summary: "Hearing one short sentence and choosing the most natural reply.",
      sections: [
        {
          title: "How it works",
          blocks: [
            text("Anda mendengar **satu kalimat singkat** (pertanyaan, permintaan, atau pernyataan) dalam situasi kampus atau sehari-hari, lalu memilih **respons paling tepat**. Kuncinya: pahami **fungsi** kalimat (meminta, menawarkan, mengeluh, mengundang)."),
            table(["You hear", "Function", "Good response"], [["Would you mind lending me your notes?", "request", "Not at all. Here you go."], ["I can't believe the bus is late again.", "complaint", "I know, it's so frustrating."], ["Do you want to grab lunch after class?", "invitation", "Sure, I'll meet you outside."], ["Have you finished the reading yet?", "question", "Almost. I've got one chapter left."]]),
            warn("**Would you mind…?** dijawab *Not at all / No problem* jika setuju (artinya: tidak keberatan)."),
          ],
        },
        {
          title: "Practice",
          blocks: [
            pics([["chat", "campus talk"], ["question", "function?"], ["thumbs-up", "natural reply"], ["headset", "listen once"]]),
            tryIt(listen("ibt-l1-l2-try", voice("Would you mind closing the window?"), "Listen. Choose the best response.", ["Not at all.", "Yes, I'm a student.", "It was open yesterday.", "The window is glass."], 0, "Not at all = tidak keberatan.")),
          ],
        },
      ],
      checkpoint: [
        listen("ibt-l1-l2-c1", voice("Do you know when the assignment is due?"), "Choose the best response.", ["I think it's due on Friday.", "Yes, I know him.", "It's a long assignment, isn't it big?", "I don't like Fridays."], 0, "Menjawab tenggat."),
        listen("ibt-l1-l2-c2", voice("I'm sorry I missed your presentation."), "Choose the best response.", ["Don't worry, I'll send you the slides.", "Yes, I missed it too.", "My presentation is blue.", "I'm sorry too much."], 0, "Menanggapi permintaan maaf."),
        listen("ibt-l1-l2-c3", voice("How about studying together this weekend?"), "Choose the best response.", ["That sounds great. Saturday morning?", "I studied last year.", "The weekend is two days.", "Studying is a verb."], 0, "Menerima ajakan."),
        listen("ibt-l1-l2-c4", voice("The printer in the lab isn't working again."), "Choose the best response.", ["Let's tell the lab assistant.", "I printed it yesterday.", "Printers are machines.", "Yes, it is working."], 0, "Solusi untuk keluhan."),
        listen("ibt-l1-l2-c5", voice("Have you met our new roommate yet?"), "Choose the best response.", ["Not yet. What's she like?", "Yes, I have a room.", "Roommates are useful.", "I met him tomorrow."], 0, "Respons alami."),
        listen("ibt-l1-l2-c6", voice("You're not still working on that essay, are you?"), "What does the speaker imply, and what is the best response?", ["The speaker is surprised; “Afraid so. It's taking forever.”", "The speaker is angry; “No, I'm a student.”", "The speaker wants help; “The essay is long.”"], 0, "Kejutan → respons mengakui.", { hots: true }),
      ],
    },
    {
      id: "ibt-l1-l3",
      skill: "writing",
      title: "Build a Sentence",
      summary: "Putting words in order to form a grammatically correct reply in a short exchange.",
      sections: [
        {
          title: "How it works",
          blocks: [
            text("Anda melihat sebuah **pesan pendek** dan beberapa **kata acak**. Susun kata menjadi **kalimat balasan yang benar** secara tata bahasa dan sesuai konteks. Fokus: **urutan kata**, **pertanyaan tidak langsung**, **frasa kata kerja**, dan **posisi adverb**."),
            table(["Pattern", "Example"], [["Indirect questions", "Can you tell me where the office is? (bukan where is the office)"], ["Adverb position", "I have already finished it."], ["Phrasal verbs", "Could you pick me up at six?"], ["Modal + base verb", "You should talk to the professor."]]),
          ],
        },
        {
          title: "Practice",
          blocks: [
            examples([{ right: "Message: “Is the library open late tonight?” Words: know / don't / I / closes / it / when → I don't know when it closes." }], "Example"),
            tip("Mulailah dari **subjek + kata kerja utama**, lalu letakkan **kata tanya** pada pertanyaan tidak langsung tanpa membalik urutan subjek-kata kerja."),
            tryIt(arrange("ibt-l1-l3-try", "Message: “Where should we meet?” Build the reply.", "Let's meet in front of the cafeteria", "Ajakan + tempat.")),
          ],
        },
      ],
      checkpoint: [
        arrange("ibt-l1-l3-c1", "Message: “Do you know where Room 204 is?” Build the reply.", "It is on the second floor", "Subjek + verb + keterangan."),
        arrange("ibt-l1-l3-c2", "Message: “I need help with my essay.” Build the reply.", "You should talk to the writing centre", "Should + base verb."),
        arrange("ibt-l1-l3-c3", "Message: “When does the seminar start?” Build the reply.", "I am not sure when it starts", "Pertanyaan tidak langsung: when it starts."),
        arrange("ibt-l1-l3-c4", "Message: “Did you finish the lab report?” Build the reply.", "I have already sent it to the professor", "Posisi already."),
        pick("ibt-l1-l3-c5", "Which indirect question is correct?", ["Could you tell me what time the bus leaves?", "Could you tell me what time does the bus leave?", "Could you tell me what time leaves the bus?"], 0, "Urutan pernyataan."),
        pick("ibt-l1-l3-c6", "Why is “Can you tell me where is the office?” wrong?", ["Indirect questions use statement word order: where the office is.", "It is too polite.", "It needs a question mark in the middle."], 0, "Pola pertanyaan tidak langsung.", { hots: true }),
      ],
    },
    {
      id: "ibt-l1-l4",
      skill: "speaking",
      title: "Listen and Repeat",
      summary: "Repeating short sentences accurately with clear pronunciation, stress and rhythm.",
      sections: [
        {
          title: "How it works",
          blocks: [
            text("Anda mendengar kalimat-kalimat pendek dalam sebuah situasi (misalnya tur kampus) dan **mengulanginya persis**. Yang dinilai: **ketepatan kata**, **pelafalan**, **tekanan dan irama**. Kalimat makin lama makin panjang."),
            table(["Tip", "Why"], [["Listen for meaning, not single words", "you remember chunks of meaning more easily"], ["Copy the rhythm and stress", "natural rhythm helps the score"], ["Keep small words (a, the, to)", "missing function words reduces accuracy"], ["Don't stop if you make a small mistake", "keep going smoothly"]]),
          ],
        },
        {
          title: "Practice",
          blocks: [
            repeat(["Welcome to the campus tour.", "The library is open until ten.", "Please return your books to the front desk.", "The science building is on the left, next to the main hall.", "If you have any questions, ask a student guide."], "Listen and repeat"),
            speaking({
              id: "ibt-l1-l4-say",
              title: "Repeat the tour sentences",
              prompt: "Play the sentences above one at a time. After each one, pause and repeat it exactly, copying the stress and rhythm. Record yourself and compare.",
              image: "headset",
              seconds: 60,
              tips: ["Chunk: The science building / is on the left / next to the main hall.", "Stress content words: SCIence BUILDing, LEFT, MAIN HALL.", "Link sounds: next_to, ask_a."],
              models: [{ label: "Stress guide", text: "WELcome to the CAMpus TOUR. / The LIbrary is OPen unTIL TEN. / PLEASE reTURN your BOOKS to the FRONT DESK. / The SCIence BUILDing is on the LEFT, NEXT to the MAIN HALL. / If you HAVE any QUEStions, ASK a STUdent GUIDE." }],
              rubric: ["I repeated every word, including small words.", "My stress and rhythm matched the model.", "My pronunciation was clear.", "I did not stop in the middle of sentences."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("ibt-l1-l4-c1", voice("Please return your books to the front desk."), "Which sentence did you hear?", ["Please return your books to the front desk.", "Please return the book to the front desk.", "Please turn your books to the front desk.", "Return books at the desk front."], 0, "Detail kecil penting."),
        listen("ibt-l1-l4-c2", voice("The science building is on the left, next to the main hall."), "Where is the science building?", ["on the left, next to the main hall", "on the right", "behind the library", "across the street"], 0, "Detail lokasi."),
        match("ibt-l1-l4-c3", "Match the word and its stress.", [["library", "LI-brar-y"], ["computer", "com-PU-ter"], ["information", "in-for-MA-tion"], ["university", "u-ni-VER-si-ty"]], "Tekanan kata."),
        pickMany("ibt-l1-l4-c4", "Choose ALL good strategies for Listen and Repeat.", ["remember meaning chunks", "copy the rhythm", "keep small words like “the”", "translate into Indonesian first"], [0, 1, 2], "Menerjemahkan memperlambat."),
        trPick("ibt-l1-l4-c5", "“Irama” (speech) in English is…", ["rhythm", "rhyme", "ritual"], 0, "Rhythm."),
        pick("ibt-l1-l4-c6", "Why does dropping “the” and “to” lower your score even if the meaning is clear?", ["The task measures exact accuracy, not only meaning.", "Small words are more important than nouns.", "The test is about spelling."], 0, "Akurasi persis.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ibt-l1-post",
    title: "Level 1 Practice Test",
    passPercent: 70,
    questions: [
      pick("ibt-l1-post1", "Which task appears in the Writing section?", ["Build a Sentence", "Listen and Repeat", "Complete the Words", "Take an Interview"], 0, "Writing: Build a Sentence, Email, Academic Discussion."),
      pick("ibt-l1-post2", "What is the score scale for each section of the 2026 test?", ["1–6", "0–30", "0–9", "310–677"], 0, "Skala 1–6."),
      fill("ibt-l1-post3", "Complete: The experiment was repe___ three times.", "The experiment was repe", "three times.", ["ated"], "Was repeated."),
      fill("ibt-l1-post4", "Complete: Coral reefs are home to thous___ of species.", "Coral reefs are home to thous", "of species.", ["ands"], "Thousands of."),
      listen("ibt-l1-post5", voice("Do you want me to save you a seat?"), "Choose the best response.", ["That would be great, thanks.", "I saved money last year.", "Seats are made of wood.", "Yes, I am sitting."], 0, "Menerima tawaran."),
      listen("ibt-l1-post6", voice("I heard the field trip has been cancelled."), "Choose the best response.", ["Really? I was looking forward to it.", "I cancelled my phone.", "The field is green.", "Trips are fun."], 0, "Reaksi alami.", { hots: true }),
      arrange("ibt-l1-post7", "Message: “Is the cafeteria still open?” Build the reply.", "I think it closes at eight", "Urutan kata."),
      arrange("ibt-l1-post8", "Message: “Who should I ask about the scholarship?” Build the reply.", "You could ask the financial aid office", "Modal + base verb."),
      pick("ibt-l1-post9", "Which response to “Would you mind if I opened the window?” means YES, go ahead?", ["Not at all.", "Yes, I would.", "I mind it."], 0, "Not at all = silakan."),
      pick("ibt-l1-post10", "A test taker answers many Reading questions correctly. What will probably happen in an adaptive section?", ["Later questions become more challenging.", "The test ends early.", "Questions get easier.", "Nothing changes."], 0, "Prinsip tes adaptif.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — New TOEFL iBT",
    questions: [
      live("ibt-l1-live1", "New score scale:", ["1–6", "0–120 only", "0–9", "310–677"], 0, "trophy"),
      live("ibt-l1-live2", "Total test time (approx.):", ["90 minutes", "3 hours", "30 minutes", "4 hours"], 0, "clock"),
      live("ibt-l1-live3", "Adaptive sections:", ["Reading & Listening", "Speaking & Writing", "All", "None"], 0, "laptop"),
      live("ibt-l1-live4", "“Would you mind…?” — Agree:", ["Not at all.", "Yes, I mind.", "Never.", "I would."], 0, "thumbs-up"),
      live("ibt-l1-live5", "Indirect question:", ["where the office is", "where is the office", "where office is the", "is where the office"], 0, "question"),
      live("ibt-l1-live6", "Speaking task 1:", ["Listen and Repeat", "Write an Email", "Build a Sentence", "Read a Passage"], 0, "microphone"),
      live("ibt-l1-live7", "“Irama” =", ["rhythm", "rhyme", "region", "ritual"], 0, "drum", true),
      live("ibt-l1-live8", "Complete: The stud___ (plural)", ["ents", "ent", "y", "ies"], 0, "school"),
    ],
  },
};
