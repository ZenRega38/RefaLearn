import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { audio, examples, fill, listen, live, match, pick, pickMany, pics, say, sequence, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Oxford ELLT — Level 1: Meet the Test (B1). Based on the updated format
// described by Oxford International (May 2026). Original practice material.

const GARDEN: Passage = {
  id: "ellt1-garden",
  title: "A Rooftop Garden (summary practice text)",
  lines: [
    "In many crowded cities, open space is scarce, but rooftops are often left empty.",
    "A secondary school in Surabaya decided to change this by turning its flat roof into a vegetable garden.",
    "Students built raised beds from recycled wood, installed a simple rainwater collection system and planted chillies, tomatoes and leafy greens.",
    "The project had several benefits. The plants reduced the temperature of the classrooms below, and the vegetables were used in the school canteen.",
    "Teachers also used the garden for science lessons on soil, water and plant growth.",
    "However, the project faced challenges, including strong winds and the cost of repairing leaks in the roof.",
    "After two years, the school concluded that the advantages outweighed the problems, and three nearby schools have since started similar gardens.",
  ],
};

export const ELLT1: Level = {
  id: "ellt-l1",
  title: "Level 1 — Meet the Oxford ELLT (B1)",
  description: "Understand the four modules, timings and CEFR-based scoring, and practise paragraph sequencing, a one-play monologue, a short written summary and the first speaking monologue prompt.",
  targetScore: "Target CEFR B1",
  cover: ["laptop", "graduation", "headset"],
  pretest: {
    id: "ellt-l1-pre",
    title: "Level 1 Pretest",
    passPercent: 0,
    questions: [
      pick("ellt-l1-pre1", "How is the Oxford ELLT taken?", ["online, including a live video speaking test", "on paper only", "only at a university campus", "by post"], 0, "Seluruhnya online; speaking dengan penguji langsung via video."),
      pick("ellt-l1-pre2", "Oxford ELLT results are reported in relation to…", ["CEFR levels", "TOEFL ITP scores", "IELTS Academic only", "school grades"], 0, "Dipetakan ke level CEFR."),
      listen("ellt-l1-pre3", voice("The orientation session will now begin at nine thirty instead of nine."), "Listen. When will the session begin?", ["9:30", "9:00", "10:00", "8:30"], 0, "Instead of nine."),
      trPick("ellt-l1-pre4", "“Meringkas” in English is…", ["to summarise", "to suppose", "to supply", "to surprise"], 0, "Summarise."),
      sequence("ellt-l1-pre5", "Put the sentences in a logical order.", ["First, the students cleaned the roof.", "Next, they built raised beds.", "Finally, they planted vegetables."], "First → Next → Finally."),
    ],
  },
  lessons: [
    {
      id: "ellt-l1-l1",
      skill: "reading",
      title: "Test Overview and Paragraph Sequencing",
      summary: "The four modules and their timing, and how to order sentences using cohesion clues.",
      sections: [
        {
          title: "The Oxford ELLT at a glance",
          blocks: [
            table(["Module", "Time", "What you do"], [["Reading", "40 min", "3 texts (about 200, 400 and 500–600 words): paragraph sequencing, gap-fill, multiple choice"], ["Listening", "25 min", "3 recordings: a monologue (once), a monologue or dialogue (twice) with note completion, several short speakers"], ["Writing", "50 min", "Task 1: 80–100 word summary of a short text · Task 2: 190–250 word essay"], ["Speaking", "about 20–25 min", "live video with an examiner: warm-up, monologue from prompts, questions on your essay, discussion of a picture"]]),
            text("Setiap keterampilan diberi skor dan dipetakan ke level **CEFR (A2–C2)**; hasil biasanya keluar dalam **sekitar 48 jam**. Banyak universitas di Inggris menerima Oxford ELLT untuk penerimaan mahasiswa internasional — selalu **cek persyaratan universitas tujuan**."),
            pics([["open-book", "Reading 40'"], ["headset", "Listening 25'"], ["pencil", "Writing 50'"], ["video-app", "Speaking ~25'"]]),
            warn("Format dapat diperbarui oleh penyelenggara. Kursus ini mengikuti pembaruan konten yang diumumkan Oxford International pada Mei 2026; selalu periksa informasi resmi sebelum tes."),
          ],
        },
        {
          title: "Paragraph sequencing",
          blocks: [
            text("Pada teks pertama (sekitar level B1), kalimat atau paragraf diacak dan Anda menyusunnya kembali. Petunjuknya adalah **kohesi**: kata ganti (*this, they, it*), penanda urutan (*first, then, after that*), dan penanda kontras (*however*)."),
            table(["Clue", "Example", "Tells you"], [["Pronoun / determiner", "This project…, They…", "refers to something mentioned before"], ["Sequence word", "After two years…, Finally…", "time order"], ["Contrast", "However, …", "follows a positive point"], ["General → specific", "Open space is scarce → A school decided…", "introduction comes first"]]),
            tryIt(sequence("ellt-l1-l1-try", "Order the sentences.", ["In crowded cities, open space is scarce.", "A school in Surabaya turned its roof into a garden.", "This garden is now used for science lessons."], "Umum → contoh → This (merujuk ke garden).")),
          ],
        },
      ],
      checkpoint: [
        pick("ellt-l1-l1-c1", "How many texts are there in the Reading module (updated format)?", ["three", "two", "five", "one"], 0, "Tiga teks."),
        pick("ellt-l1-l1-c2", "How long is the Writing module (updated format)?", ["50 minutes", "25 minutes", "2 hours", "10 minutes"], 0, "50 menit, dua tugas."),
        sequence("ellt-l1-l1-c3", "Order the sentences.", ["The school's garden had many benefits.", "For example, it cooled the classrooms below.", "However, strong winds sometimes damaged the plants."], "Klaim umum → contoh → kontras."),
        sequence("ellt-l1-l1-c4", "Order the sentences.", ["Rina applied to a university in the UK.", "She was asked to provide an English test result.", "She chose the Oxford ELLT because it can be taken online."], "Kronologi + alasan."),
        pick("ellt-l1-l1-c5", "Which word usually refers back to something already mentioned?", ["this", "first", "however", "finally"], 0, "This = rujukan."),
        pick("ellt-l1-l1-c6", "A sentence begins “However, the cost was high.” Where does it most likely belong?", ["after a sentence describing a benefit", "at the very beginning", "after another sentence starting with “However”"], 0, "Kontras setelah poin positif.", { hots: true }),
      ],
    },
    {
      id: "ellt-l1-l2",
      skill: "listening",
      title: "Listening 1: A Monologue Played Once",
      summary: "Following a short talk heard only once and answering multiple-choice questions.",
      sections: [
        {
          title: "Strategy",
          blocks: [
            table(["Before", "During", "After"], [["read the questions and options", "listen for paraphrases, not exact words", "choose quickly and move on"], ["predict the topic", "note numbers and key changes", "don't leave anything blank"]]),
            tip("Rekaman pertama hanya diputar **sekali**. Gunakan waktu membaca untuk **menggarisbawahi kata kunci** di setiap pertanyaan."),
          ],
        },
        {
          title: "Practice talk",
          blocks: [
            audio("Welcome talk for international students", say(["woman", "Good morning and welcome to your first week. I'm Sarah from the International Student Office. Let me give you a few key points. Your student ID cards will be ready on Wednesday, not Tuesday as stated in your welcome pack, so please collect them from the reception desk in the Main Building. You'll need the card to borrow books and use the gym. On Thursday afternoon, there's a city tour. It's free, but places are limited to forty students, so sign up online by Wednesday evening. Finally, if you're feeling homesick or stressed, our wellbeing team offers free, confidential appointments every weekday."])),
            pics([["staff", "International Office"], ["card", "student ID"], ["map", "city tour"], ["heart", "wellbeing"]]),
            tryIt(pick("ellt-l1-l2-try", "When will ID cards be ready?", ["Wednesday", "Tuesday", "Thursday", "Monday"], 0, "Not Tuesday as stated.")),
          ],
        },
      ],
      checkpoint: [
        pick("ellt-l1-l2-c1", "Where should students collect their ID cards?", ["the reception desk in the Main Building", "the library", "the gym", "the wellbeing office"], 0, "Reception desk."),
        pick("ellt-l1-l2-c2", "What is the ID card needed for?", ["borrowing books and using the gym", "the city tour only", "buying lunch", "nothing"], 0, "Books and gym."),
        pick("ellt-l1-l2-c3", "What is true about the city tour?", ["It is free, but places are limited.", "It costs money.", "It is on Monday.", "Everyone must go."], 0, "Free + limited."),
        fill("ellt-l1-l2-c4", "Complete (A NUMBER): The tour is limited to ___ students.", "The tour is limited to", "students.", ["40", "forty"], "Forty students."),
        pick("ellt-l1-l2-c5", "What does the wellbeing team offer?", ["free, confidential appointments", "language classes", "city tours", "ID cards"], 0, "Wellbeing."),
        pick("ellt-l1-l2-c6", "The welcome pack says Tuesday, but the speaker says Wednesday. What should a student trust?", ["the latest spoken information", "the welcome pack", "neither"], 0, "Informasi terbaru.", { hots: true }),
      ],
    },
    {
      id: "ellt-l1-l3",
      skill: "writing",
      title: "Writing Task 1: Summary Basics",
      summary: "Identifying main ideas in a short text and summarising them in 80–100 words in your own words.",
      passages: [GARDEN],
      sections: [
        {
          title: "The source text",
          blocks: [
            { type: "passage", passage: GARDEN },
            vocab([["scarce", "langka/sedikit", "map"], ["raised bed", "bedengan tinggi", "sprout"], ["outweigh", "lebih besar daripada", "target"], ["leak", "kebocoran", "water"]], "Key vocabulary"),
          ],
        },
        {
          title: "How to summarise",
          blocks: [
            table(["Step", "What to do"], [["1", "Find the main idea (what is the text mainly about?)"], ["2", "Select 3–4 key supporting points; leave out examples and small details"], ["3", "Paraphrase: change words and sentence structure"], ["4", "Keep the writer's meaning; add no personal opinion"], ["5", "Check the word count (80–100)"]]),
            examples([{ wrong: "Students built raised beds from recycled wood, installed a simple rainwater collection system and planted chillies, tomatoes and leafy greens.", right: "Students created the garden using recycled materials and collected rainwater for the plants.", note: "Ringkas, parafrase, tanpa daftar detail." }], "Paraphrase, don't copy"),
            writing({
              id: "ellt-l1-l3-write",
              title: "Summary",
              prompt: "Summarise the text about the rooftop garden in 80–100 words. Use your own words as far as possible and do not add your opinion.",
              image: "sprout",
              minWords: 80,
              maxWords: 100,
              tips: ["The text describes how …", "The project brought several benefits, including …", "However, it also faced …", "Overall, …"],
              models: [{ label: "Model summary", text: "The text describes how a school in Surabaya transformed its unused flat roof into a vegetable garden. Using recycled materials and rainwater, students grew several crops. The project brought a number of benefits: it helped to cool the classrooms underneath, supplied produce for the canteen and provided a setting for practical science lessons. However, it also faced difficulties, such as strong winds and the expense of fixing roof leaks. Overall, the school judged the garden a success, and other local schools have since followed its example." }],
              rubric: ["I identified the main idea.", "I included the key points and left out minor details.", "I paraphrased rather than copied.", "I did not add my own opinion.", "I stayed within 80–100 words."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("ellt-l1-l3-c1", "What is the main idea of the text?", ["A school turned its roof into a useful vegetable garden.", "Roofs often leak.", "Chillies are easy to grow.", "Wind is dangerous."], 0, "Gagasan utama.", { passageId: GARDEN.id }),
        pickMany("ellt-l1-l3-c2", "Choose ALL points that belong in a summary.", ["the garden cooled classrooms", "vegetables were used in the canteen", "the project faced some problems", "the exact types of vegetables"], [0, 1, 2], "Detail jenis sayur bisa dihilangkan.", { passageId: GARDEN.id }),
        pick("ellt-l1-l3-c3", "Which is the best paraphrase of “open space is scarce”?", ["there is little free space", "space is scary", "space is open", "there are many parks"], 0, "Scarce = sedikit."),
        pick("ellt-l1-l3-c4", "Which sentence should NOT appear in a summary?", ["I think every school should build a rooftop garden.", "The project also faced challenges.", "Other schools have copied the idea."], 0, "Opini pribadi tidak masuk ringkasan."),
        trPick("ellt-l1-l3-c5", "“Lebih besar daripada” (advantages vs. problems) in English is…", ["outweighed", "overweight", "outnumbered by"], 0, "Outweighed."),
        pick("ellt-l1-l3-c6", "Your summary is 130 words. What should you do?", ["Remove examples and minor details until it is within 100 words.", "Leave it; longer is better.", "Add your opinion."], 0, "Batas kata.", { hots: true }),
      ],
    },
    {
      id: "ellt-l1-l4",
      skill: "speaking",
      title: "Speaking: Warm-up and Factual Prompt",
      summary: "The speaking structure, the unassessed warm-up, and responding to a factual prompt in a short monologue.",
      sections: [
        {
          title: "Speaking structure",
          blocks: [
            table(["Task", "What happens", "Assessed?"], [["1", "personal questions and identity check", "no"], ["2", "monologue from up to three prompts (factual, comparative, hypothetical); about 45 seconds to read the topic, then about 2–3 minutes", "yes"], ["3", "5–7 minutes of questions about your Writing task", "yes"], ["4", "5–7 minutes of discussion based on a picture", "yes"]]),
            tip("Karena **tidak ada lagi presentasi yang disiapkan 15 menit**, latihlah **berbicara spontan** dengan struktur sederhana: jawab → jelaskan → contoh."),
          ],
        },
        {
          title: "Factual prompt practice",
          blocks: [
            text("**Topic: Transport in your city.** Prompt 1 (factual): *Describe how most people travel around your city.*"),
            audio("Model response to the factual prompt", say(["man", "In my city, Bandung, most people travel by motorbike. It's the quickest way to get through the narrow streets, and it's relatively cheap to run. Many students also use online ride-hailing apps, which they book on their phones. There are city buses and angkot, which are small public minivans, but they can be slow because of traffic. Recently, more people have started cycling at weekends, especially on car-free days."])),
            speaking({
              id: "ellt-l1-l4-say",
              title: "Factual monologue",
              prompt: "Topic: Transport in your city. Take about 45 seconds to plan, then speak for about one minute: Describe how most people travel around your city.",
              image: "motorcycle",
              prepSeconds: 45,
              seconds: 60,
              tips: ["In my city, most people …", "This is mainly because …", "Other options include …", "Recently, …"],
              models: [{ label: "Structure", text: "Main answer (most common transport) → reason → other options with a short description → a recent change or personal detail." }],
              rubric: ["I answered the prompt directly.", "I gave reasons and details.", "I organised my ideas logically.", "I spoke clearly with few long pauses."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("ellt-l1-l4-c1", voice("Angkot are small public minivans, but they can be slow because of traffic."), "What is a disadvantage of angkot?", ["They can be slow.", "They are expensive.", "They are dangerous.", "They are new."], 0, "Lambat karena macet."),
        pick("ellt-l1-l4-c2", "Which speaking task is NOT assessed?", ["Task 1 warm-up", "Task 2 monologue", "Task 3 questions on writing", "Task 4 picture discussion"], 0, "Task 1 tidak dinilai."),
        pick("ellt-l1-l4-c3", "What changed in the updated speaking test?", ["The 15-minute prepared presentation was replaced by spontaneous prompts.", "Speaking was removed.", "It became a written test.", "It became 2 hours long."], 0, "Perubahan 2026."),
        match("ellt-l1-l4-c4", "Match the prompt type and the example.", [["factual", "Describe how people travel in your city."], ["comparative", "Compare buses and motorbikes."], ["hypothetical", "What would happen if cars were banned?"]], "Jenis prompt."),
        trPick("ellt-l1-l4-c5", "“Bersifat spontan” in English is…", ["spontaneous", "sponsored", "spontaneously planned"], 0, "Spontaneous."),
        pick("ellt-l1-l4-c6", "You have only 45 seconds to plan. What is the best use of this time?", ["Note 3–4 key words for your main points", "Write a full script", "Stay silent and relax"], 0, "Catatan singkat.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ellt-l1-post",
    title: "Level 1 Mock Quiz",
    passPercent: 70,
    passages: [GARDEN],
    questions: [
      pick("ellt-l1-post1", "How long is the Listening module?", ["25 minutes", "60 minutes", "10 minutes", "40 minutes"], 0, "25 menit."),
      pick("ellt-l1-post2", "How many words should the Writing Task 1 summary be?", ["80–100", "190–250", "150", "300"], 0, "80–100 kata."),
      sequence("ellt-l1-post3", "Order the sentences.", ["The library introduced a new booking system.", "As a result, students no longer waited in long queues.", "However, some older users found the app difficult."], "Sebab → akibat → kontras."),
      listen("ellt-l1-post4", say(["man", "Lectures start next Monday, but the first seminar is on Tuesday because the room is being painted."]), "Listen. Why is the first seminar on Tuesday?", ["The room is being painted.", "The lecturer is ill.", "It is a holiday.", "Students requested it."], 0, "Alasan."),
      listen("ellt-l1-post5", say(["woman", "Bring a passport photo, your offer letter and proof of address."]), "Listen. Which item is NOT mentioned?", ["a bank statement", "a passport photo", "an offer letter", "proof of address"], 0, "Bank statement tidak disebut."),
      pick("ellt-l1-post6", "According to the text, how many other schools started similar gardens?", ["three", "two", "five", "none"], 0, "Baris 7.", { passageId: GARDEN.id }),
      pick("ellt-l1-post7", "Which problem is mentioned in the text?", ["roof leaks", "lack of students", "insects", "drought"], 0, "Baris 6.", { passageId: GARDEN.id }),
      pick("ellt-l1-post8", "Which sentence is the best summary opening?", ["The text explains how a school created a rooftop garden and what it achieved.", "I love gardens.", "Students built raised beds from recycled wood, installed…"], 0, "Pembuka ringkasan.", { passageId: GARDEN.id, hots: true }),
      pick("ellt-l1-post9", "Which speaking prompt is hypothetical?", ["What would your city be like without cars?", "How do people travel in your city?", "Compare buses and trains."], 0, "Would = pengandaian."),
      pick("ellt-l1-post10", "Why is copying sentences from the source text a poor summary strategy?", ["It does not show your ability to paraphrase.", "It makes the summary too short.", "It is always too formal."], 0, "Kemampuan parafrase dinilai.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Oxford ELLT Basics",
    questions: [
      live("ellt-l1-live1", "Reading module time:", ["40 min", "25 min", "50 min", "60 min"], 0, "open-book"),
      live("ellt-l1-live2", "Speaking is done…", ["live by video", "on paper", "by phone text", "not at all"], 0, "video-app"),
      live("ellt-l1-live3", "Summary length:", ["80–100 words", "190–250 words", "20 words", "500 words"], 0, "pencil"),
      live("ellt-l1-live4", "“Meringkas” =", ["summarise", "surprise", "supply", "support"], 0, "report", true),
      live("ellt-l1-live5", "Results usually within…", ["48 hours", "6 months", "1 hour", "1 year"], 0, "clock"),
      live("ellt-l1-live6", "“However” signals…", ["contrast", "time", "example", "result"], 0, "question"),
      live("ellt-l1-live7", "Listening 1 is played…", ["once", "twice", "three times", "never"], 0, "headset"),
      live("ellt-l1-live8", "Results map to…", ["CEFR levels", "TOEFL ITP", "school ranks", "band 0–120"], 0, "graduation"),
    ],
  },
};
