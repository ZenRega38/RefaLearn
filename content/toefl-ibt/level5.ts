import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pics, say, speaking, table, tip, trPick, tryIt, voice, warn, writing } from "../kit";

// TOEFL iBT (2026 format) — Level 5: Precision.

export const IBT5: Level = {
  id: "ibt-l5",
  title: "Level 5 — Precision: Grammar, Word Forms and Tone",
  description: "Master word families for Complete the Words, complex structures for Build a Sentence, indirect meaning in Listen and Choose a Response, formal emails to professors, and challenging interview topics.",
  targetScore: "Target Band 5.0–5.5",
  cover: ["pencil", "envelope", "target"],
  pretest: {
    id: "ibt-l5-pre",
    title: "Level 5 Pretest",
    passPercent: 0,
    questions: [
      fill("ibt-l5-pre1", "Complete: The results were statisti___ significant.", "The results were statisti", "significant.", ["cally"], "Adverb: statistically."),
      listen("ibt-l5-pre2", voice("Oh great, another group project. Just what I needed."), "Listen. How does the speaker feel?", ["annoyed (sarcastic)", "excited", "grateful", "confused"], 0, "Sarkasme."),
      trPick("ibt-l5-pre3", "“Saya ingin bertanya apakah…” (formal email) in English is…", ["I was wondering whether…", "I want ask if…", "I wonder you if…", "Tell me whether…"], 0, "Permintaan halus."),
      arrange("ibt-l5-pre4", "Build the sentence.", "The report has already been submitted", "Present perfect passive."),
      pick("ibt-l5-pre5", "Which word is a noun?", ["analysis", "analyse", "analytical", "analytically"], 0, "Word family."),
    ],
  },
  lessons: [
    {
      id: "ibt-l5-l1",
      skill: "reading",
      title: "Complete the Words: Word Families and Grammar Clues",
      summary: "Choosing the right ending from the grammar of the sentence: nouns, verbs, adjectives, adverbs and tenses.",
      sections: [
        {
          title: "Word families",
          blocks: [
            table(["Noun", "Verb", "Adjective", "Adverb"], [["analysis", "analyse", "analytical", "analytically"], ["significance", "signify", "significant", "significantly"], ["economy", "economise", "economic / economical", "economically"], ["development", "develop", "developed / developing", "—"], ["variety", "vary", "various / variable", "variously"]]),
            tip("Cari **petunjuk tata bahasa**: setelah **the/a** → kata benda; sebelum kata benda → kata sifat; menerangkan kata kerja/kata sifat → adverb; setelah **has/have** → V3."),
          ],
        },
        {
          title: "Practice paragraph",
          blocks: [
            examples([{ right: "Researchers condu___ a detailed analy___ of rainfall data. The results showed a signif___ increase in extreme storms, which has impor___ implications for coastal cities. → conducted, analysis, significant, important" }], "Model"),
            pics([["report", "data"], ["rain", "rainfall"], ["pencil", "complete"], ["owl-think", "grammar clue"]]),
            tryIt(fill("ibt-l5-l1-try", "Complete: Prices have increa___ steadily since 2020.", "Prices have increa", "steadily since 2020.", ["sed"], "Have increased.")),
          ],
        },
      ],
      checkpoint: [
        fill("ibt-l5-l1-c1", "Complete: The economy grew ra___ last year.", "The economy grew ra", "last year.", ["pidly"], "Adverb: rapidly."),
        fill("ibt-l5-l1-c2", "Complete: The develop___ of new vaccines takes years.", "The develop", "of new vaccines takes years.", ["ment"], "Noun: development."),
        fill("ibt-l5-l1-c3", "Complete: Temperatures va___ greatly between day and night.", "Temperatures va", "greatly between day and night.", ["ry"], "Verb: vary."),
        fill("ibt-l5-l1-c4", "Complete: The study was publ___ in a leading journal.", "The study was publ", "in a leading journal.", ["ished"], "Was published."),
        match("ibt-l5-l1-c5", "Match the word and its type.", [["significance", "noun"], ["signify", "verb"], ["significant", "adjective"], ["significantly", "adverb"]], "Word family."),
        pick("ibt-l5-l1-c6", "“The government introduced econom___ measures to reduce spending.” Which ending fits best?", ["-ical (economical: saving money)", "-y (economy: noun)", "-ically (adverb)"], 0, "Economical = hemat; economic = terkait ekonomi.", { hots: true }),
      ],
    },
    {
      id: "ibt-l5-l2",
      skill: "listening",
      title: "Indirect Meaning in Short Responses",
      summary: "Sarcasm, polite refusals, implied answers and idioms in Listen and Choose a Response.",
      sections: [
        {
          title: "What people really mean",
          blocks: [
            table(["You hear", "Real meaning", "Natural response"], [["Great, another rainy day.", "The speaker is annoyed (sarcasm).", "I know, I was hoping for sun too."], ["I'd love to, but I have a lab.", "polite refusal", "No worries, maybe next time."], ["Is the Pope Catholic?", "obviously yes (idiom)", "Ha, fair enough."], ["Don't you think the deadline is a bit tight?", "The speaker thinks it IS tight.", "Yes, I'm worried too."]]),
            warn("Pertanyaan negatif (*Don't you think…?*) biasanya **menyatakan pendapat**, bukan bertanya sungguh-sungguh."),
          ],
        },
        {
          title: "Practice",
          blocks: [
            audio("Five short prompts", say(["woman", "I'd love to help, but I'm completely swamped this week."], ["man", "Wow, the lecture finished early for once."], ["woman", "Don't you think we should start the presentation soon?"], ["man", "I could really use a coffee right now."], ["woman", "You've got to be kidding me — the library's closed again?"])),
            tryIt(listen("ibt-l5-l2-try", voice("I'd love to help, but I'm completely swamped this week."), "Choose the best response.", ["No problem, I'll ask someone else.", "Great, see you tomorrow then!", "Swamps are wet.", "I'm swamped too, so let's start now."], 0, "Penolakan halus.")),
          ],
        },
      ],
      checkpoint: [
        listen("ibt-l5-l2-c1", voice("Wow, the lecture finished early for once."), "What does the speaker imply?", ["Lectures usually finish late.", "Lectures always finish early.", "The lecture was cancelled.", "He didn't attend."], 0, "For once = jarang terjadi."),
        listen("ibt-l5-l2-c2", voice("Don't you think we should start the presentation soon?"), "Choose the best response.", ["You're right, let's begin.", "No, I don't think anything.", "Presentations are slides.", "I started yesterday."], 0, "Opini terselubung."),
        listen("ibt-l5-l2-c3", voice("I could really use a coffee right now."), "Choose the best response.", ["Want to go to the café after this?", "Coffee is brown.", "I used it yesterday.", "No, you can't use it."], 0, "Could use = sangat butuh."),
        listen("ibt-l5-l2-c4", voice("You've got to be kidding me — the library's closed again?"), "How does the speaker feel?", ["frustrated", "delighted", "sleepy", "relieved"], 0, "Frustrasi."),
        trPick("ibt-l5-l2-c5", "“Saya sedang sangat sibuk” (idiom) in English is…", ["I'm swamped.", "I'm swimming.", "I'm swept."], 0, "Swamped."),
        pick("ibt-l5-l2-c6", "“Great, another rainy day.” Why is “Yes, I love rain too!” a poor response?", ["It misses the sarcasm: the speaker is unhappy about the rain.", "It is too short.", "It is grammatically wrong."], 0, "Membaca sarkasme.", { hots: true }),
      ],
    },
    {
      id: "ibt-l5-l3",
      skill: "writing",
      title: "Complex Sentences and Formal Emails",
      summary: "Build a Sentence with passives, embedded questions and conditionals; writing polite requests to professors.",
      sections: [
        {
          title: "Advanced Build a Sentence",
          blocks: [
            table(["Structure", "Example"], [["Passive (present perfect)", "The grades have not been posted yet."], ["Embedded question", "Do you know whether the exam will be online?"], ["Conditional", "If I had known, I would have come earlier."], ["Relative clause", "The book that you recommended is out of stock."], ["It + adjective + to", "It is difficult to find a quiet place here."]]),
            tryIt(arrange("ibt-l5-l3-try", "Message: “Are the exam results out?” Build the reply.", "They have not been posted yet", "Present perfect passive negatif.")),
          ],
        },
        {
          title: "Writing to a professor",
          blocks: [
            table(["Too direct", "Appropriate"], [["I want an extension.", "I was wondering whether it might be possible to have a short extension."], ["Tell me my grade.", "Could you let me know when the grades will be available?"], ["You made a mistake.", "I think there may be an error in my score for question 3."]]),
            writing({
              id: "ibt-l5-l3-write",
              title: "Email to a professor",
              prompt: "You were ill and missed a quiz in your economics course. Write an email to Professor Santoso. In your email: apologise and explain what happened, ask whether you can take the quiz at another time, and offer to provide a doctor's note. Aim for about 100–150 words.",
              image: "envelope",
              minWords: 90,
              maxWords: 160,
              tips: ["Dear Professor Santoso,", "I'm writing to apologise for missing …", "I was wondering whether it might be possible to …", "I'd be happy to provide …", "Thank you for your understanding. Best regards, …"],
              models: [{ label: "Band 6 model", text: "Dear Professor Santoso,\nI'm writing to apologise for missing Tuesday's quiz in Introduction to Economics. On Monday night I developed a high fever, and my doctor advised me to rest for two days, so I was unable to come to campus.\nI was wondering whether it might be possible to take the quiz at another time this week. I'm available on Thursday afternoon or any time on Friday, but I'm happy to fit in with your schedule.\nI'd be glad to provide a doctor's note confirming my illness. Please let me know if you need any other documents.\nThank you very much for your understanding.\nBest regards,\nAndini Putri\nStudent ID 2025-1187" }],
              rubric: ["I addressed all three points.", "My tone was polite and appropriately formal.", "I used softened requests (I was wondering whether…).", "My email was organised with a greeting and closing.", "My grammar was accurate."],
            }),
          ],
        },
      ],
      checkpoint: [
        arrange("ibt-l5-l3-c1", "Build the reply.", "Do you know whether the lab is open today", "Embedded question."),
        arrange("ibt-l5-l3-c2", "Build the reply.", "The book that you recommended is out of stock", "Relative clause."),
        arrange("ibt-l5-l3-c3", "Build the reply.", "It is difficult to find a quiet place here", "It + adjective + to."),
        pick("ibt-l5-l3-c4", "Which request is most appropriate for a professor?", ["I was wondering whether it might be possible to have a short extension.", "Give me more time.", "I need an extension now."], 0, "Permintaan halus."),
        trPick("ibt-l5-l3-c5", "“Terima kasih atas pengertian Anda.” in English is…", ["Thank you for your understanding.", "Thanks to understand me.", "Thank you understanding you."], 0, "Penutup sopan."),
        pick("ibt-l5-l3-c6", "Why is “You made a mistake in my grade” risky in an email to a professor?", ["It sounds accusatory; a softened version is more effective.", "It is too long.", "It uses the past tense."], 0, "Nada menuduh; versi halus lebih efektif.", { hots: true }),
      ],
    },
    {
      id: "ibt-l5-l4",
      skill: "speaking",
      title: "Interview: Challenging Topics",
      summary: "Answering abstract questions on society, technology and education with organised, nuanced responses.",
      sections: [
        {
          title: "Organising abstract answers",
          blocks: [
            table(["Technique", "Example"], [["Define or narrow", "If we're talking about social media for teenagers specifically, …"], ["Two-sided then decide", "There are benefits, such as…, but overall I think…"], ["Cause → effect", "Because…, this leads to…, which means…"], ["Hypothetical", "If schools banned phones, students might…"]]),
            pics([["smartphone", "technology"], ["school", "education"], ["earth", "society"], ["owl-think", "nuance"]]),
          ],
        },
        {
          title: "Practice",
          blocks: [
            audio("Interview: technology and society", say(["woman", "Do you think social media has made people more or less connected?"], ["woman", "Should schools ban smartphones during the school day?"], ["woman", "What skills do you think will be most important for young people in twenty years?"])),
            speaking({
              id: "ibt-l5-l4-say",
              title: "Challenging interview",
              prompt: "Answer the three questions (about 45 seconds each). In at least one answer, narrow the question, consider two sides, and then give your final view.",
              image: "smartphone",
              seconds: 150,
              tips: ["If we're talking specifically about …", "On one hand … but on the other …", "Overall, I'd say …", "If …, students might …"],
              models: [{ label: "Model (question 1)", text: "I'd say it depends on what we mean by connected. If we're talking about staying in touch with people far away, social media has clearly helped. My grandparents in Makassar see photos of us almost every day. On the other hand, in terms of deep, face-to-face relationships, I think it can make people less connected, because we often scroll through our phones even when we're sitting with friends. So overall, I'd say it has widened our connections but sometimes made them shallower." }],
              rubric: ["I narrowed or clarified the question.", "I considered more than one side.", "I reached a clear final view.", "I used examples and cause-effect language.", "I spoke fluently with varied grammar."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("ibt-l5-l4-c1", voice("If we're talking about teenagers specifically, I think the risks are higher."), "What technique does the speaker use?", ["narrowing the question", "telling a joke", "refusing to answer"], 0, "Mempersempit."),
        pick("ibt-l5-l4-c2", "Which ending gives a clear final view?", ["So overall, I'd say it widens connections but can make them shallower.", "So, yeah, maybe.", "I don't know really."], 0, "Kesimpulan jelas."),
        pick("ibt-l5-l4-c3", "Which sentence is hypothetical?", ["If schools banned phones, students might focus better.", "Schools banned phones last year.", "Phones are banned."], 0, "Pengandaian."),
        fill("ibt-l5-l4-c4", "Complete: It has widened our connections but made them ___ . (dangkal)", "It has widened our connections but made them", ".", ["shallower"], "Shallower.", { translate: true }),
        trPick("ibt-l5-l4-c5", "“Tergantung pada apa yang kita maksud” in English is…", ["It depends on what we mean", "It hangs on what we mean", "It depend what we means"], 0, "It depends on."),
        pick("ibt-l5-l4-c6", "Why is narrowing a broad question a good strategy?", ["It lets you give a focused, well-supported answer in limited time.", "It avoids answering.", "It makes the answer longer only."], 0, "Fokus.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ibt-l5-post",
    title: "Level 5 Practice Test",
    passPercent: 70,
    questions: [
      fill("ibt-l5-post1", "Complete: The museum attracts a wide vari___ of visitors.", "The museum attracts a wide vari", "of visitors.", ["ety"], "Noun: variety."),
      fill("ibt-l5-post2", "Complete: The new policy will signif___ reduce costs.", "The new policy will signif", "reduce costs.", ["icantly"], "Adverb."),
      fill("ibt-l5-post3", "Complete: Scientists have analy___ thousands of samples.", "Scientists have analy", "thousands of samples.", ["sed", "zed"], "Have analysed/analyzed."),
      listen("ibt-l5-post4", voice("Well, that was the most exciting lecture I've ever sat through… not."), "What does the speaker mean?", ["The lecture was boring.", "The lecture was exciting.", "He missed the lecture.", "He will attend again."], 0, "Sarkasme “not”.", { hots: true }),
      listen("ibt-l5-post5", voice("I'd join you, but I promised to help my roommate move."), "Choose the best response.", ["No worries, another time then.", "Great, see you there!", "Move where? I'll help too!", "Promises are bad."], 0, "Penolakan halus."),
      arrange("ibt-l5-post6", "Build the reply.", "The deadline has been extended until Friday", "Present perfect passive."),
      arrange("ibt-l5-post7", "Build the reply.", "Could you tell me where the seminar is held", "Embedded question."),
      pick("ibt-l5-post8", "Which email sentence is most appropriate?", ["I think there may be an error in my score for question 3.", "You graded me wrong.", "Fix my grade."], 0, "Nada halus."),
      pick("ibt-l5-post9", "“The economic crisis affected many families.” Why is “economic” correct here?", ["It means related to the economy, not money-saving.", "It means cheap.", "It is a noun."], 0, "Economic vs economical.", { hots: true }),
      pick("ibt-l5-post10", "Which interview answer is most nuanced?", ["It depends: phones help research, but during class they distract, so limited use seems best.", "Phones are bad.", "Phones are good."], 0, "Nuansa."),
    ],
  },
  live: {
    title: "Live Quiz — Precision Mode",
    questions: [
      live("ibt-l5-live1", "Noun of “analyse”:", ["analysis", "analytical", "analytically", "analyser"], 0, "report"),
      live("ibt-l5-live2", "“Great, another rainy day.” Tone:", ["sarcastic", "happy", "neutral", "excited"], 0, "rain"),
      live("ibt-l5-live3", "Polite request start:", ["I was wondering whether…", "Give me…", "I want…", "Do it…"], 0, "envelope"),
      live("ibt-l5-live4", "“Sangat sibuk” (idiom) =", ["swamped", "swimming", "sweeping", "swapped"], 0, "clock", true),
      live("ibt-l5-live5", "Saving money =", ["economical", "economic", "economy", "economist"], 0, "money"),
      live("ibt-l5-live6", "It has ___ submitted.", ["been", "be", "being", "was"], 0, "pencil"),
      live("ibt-l5-live7", "“Don't you think…?” usually expresses…", ["an opinion", "a real question only", "an apology", "a greeting"], 0, "question"),
      live("ibt-l5-live8", "Narrowing a question helps…", ["focus", "avoid", "shorten only", "confuse"], 0, "target"),
    ],
  },
};

