import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, say, speaking, table, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Bahasa Inggris Tingkat Lanjut (Fase F). Chapter 7 — The Argumentative Essay · Chapter 8 — Professional Communication

const ESSAY: Passage = {
  id: "adv-c7-essay",
  title: "Should Indonesia Make Four-Day School Weeks the Norm?",
  pic: "calendar",
  lines: [
    "Across the world, education systems are experimenting with shorter school weeks, arguing that well-rested students learn more effectively. While a four-day week may offer benefits, this essay argues that Indonesia should not adopt it nationally, because it would widen educational inequality and place heavy burdens on families.",
    "The strongest argument in favour of a four-day week is student wellbeing. Proponents point to studies suggesting that longer weekends reduce stress and improve attendance. These potential benefits deserve serious consideration.",
    "However, the costs of such a policy would fall most heavily on disadvantaged students. For many children in low-income families, school is not only a place of learning but also a source of daily meals, safety and supervision. Removing one school day per week would mean losing these supports.",
    "Furthermore, a four-day week would create practical difficulties for working parents. Most Indonesian workplaces operate five or six days a week, so parents would need to arrange childcare, which many cannot afford.",
    "In addition, the evidence on academic results is mixed. While some districts abroad report no decline in achievement, others have observed lower test scores, particularly in mathematics, when instructional time is reduced.",
    "It might be argued that longer school days could compensate for the lost day. Yet longer days could lead to fatigue, especially for younger children, potentially cancelling out the intended wellbeing benefits.",
    "In conclusion, although the four-day week is an appealing idea, its risks for vulnerable students and families outweigh its uncertain advantages. Instead, Indonesia could improve student wellbeing through better-designed schedules, reduced homework and stronger mental health support within the existing five-day week.",
  ],
};

export const CH7: Level = {
  id: "adv-ch7",
  title: "Chapter 7 — The Argumentative Essay",
  description: "Plan and write a university-style argumentative essay: precise thesis statements, topic sentences, concession and rebuttal, cohesion, academic register and source integration.",
  targetScore: "Writing · Reading · Structure",
  cover: ["pencil", "graduation", "report"],
  pretest: {
    id: "adv-c7-pre",
    title: "Chapter 7 Pretest",
    passPercent: 0,
    questions: [
      pick("adv-c7-pre1", "A thesis statement should be…", ["a clear, arguable position with reasons", "a fact everyone agrees on", "a question", "a quotation"], 0, "Tesis = posisi yang bisa diperdebatkan."),
      listen("adv-c7-pre2", voice("While this argument has some merit, it overlooks the cost to rural schools."), "Listen. What is the writer doing?", ["conceding and then rebutting", "agreeing completely", "giving a definition", "telling a story"], 0, "Konsesi + sanggahan."),
      trPick("adv-c7-pre3", "“Kalimat topik” in English is…", ["topic sentence", "topical phrase", "title sentence", "top sentence"], 0, "Topic sentence."),
      pick("adv-c7-pre4", "Which word links ideas by showing contrast?", ["Nevertheless", "Furthermore", "Similarly", "Consequently"], 0, "Kontras."),
      pick("adv-c7-pre5", "Which is the most academic sentence?", ["This policy may disproportionately affect low-income families.", "This policy is super unfair for poor people.", "Poor people will hate this, for sure.", "It's bad, really bad."], 0, "Register akademik."),
    ],
  },
  lessons: [
    {
      id: "adv-c7-l1",
      skill: "reading",
      title: "Anatomy of an Argumentative Essay",
      summary: "Thesis, topic sentences, concession, rebuttal and conclusion in a model essay.",
      passages: [ESSAY],
      sections: [
        {
          title: "Model essay",
          blocks: [
            { type: "passage", passage: ESSAY },
            vocab([["inequality", "ketimpangan", "money"], ["disadvantaged", "kurang beruntung", "sad"], ["supervision", "pengawasan", "eye"], ["instructional time", "waktu belajar/jam pelajaran", "clock"], ["outweigh", "lebih berat daripada", "target"]], "Academic vocabulary"),
          ],
        },
        {
          title: "Structure",
          blocks: [
            table(["Paragraph", "Function", "Key signals"], [["1 Introduction", "context + thesis with reasons", "this essay argues that … because …"], ["2 Concession", "the strongest opposing argument, treated fairly", "The strongest argument in favour… deserve serious consideration"], ["3–5 Body", "reasons supporting the thesis", "However, Furthermore, In addition"], ["6 Counter-argument + rebuttal", "a possible objection and response", "It might be argued that… Yet…"], ["7 Conclusion", "restated thesis + alternative/implication", "In conclusion, … Instead, …"]]),
            tip("Esai yang kuat **mengakui argumen lawan yang terbaik** (bukan yang terlemah), lalu menunjukkan mengapa posisimu tetap lebih meyakinkan."),
            tryIt(pick("adv-c7-l1-try1", "What is the writer's position?", ["Indonesia should not adopt a national four-day school week.", "Indonesia should adopt a four-day week.", "Schools should close."], 0, "Baris 1.", { passageId: ESSAY.id })),
          ],
        },
      ],
      checkpoint: [
        pick("adv-c7-l1-c1", "What two reasons are given in the thesis?", ["inequality and burdens on families", "cost and weather", "teachers and textbooks"], 0, "Baris 1.", { passageId: ESSAY.id }),
        pick("adv-c7-l1-c2", "Why is school especially important for low-income children, according to the writer?", ["It provides meals, safety and supervision.", "It provides free phones.", "It is near their homes."], 0, "Baris 3.", { passageId: ESSAY.id }),
        fill("adv-c7-l1-c3", "Complete.", "its risks for vulnerable students and families", "its uncertain advantages.", ["outweigh"], "Baris 7.", { passageId: ESSAY.id }),
        pickMany("adv-c7-l1-c4", "Choose ALL the alternatives the writer suggests.", ["better-designed schedules", "reduced homework", "stronger mental health support", "a three-day week"], [0, 1, 2], "Baris 7.", { passageId: ESSAY.id }),
        pick("adv-c7-l1-c5", "Why does the writer begin the body with the strongest opposing argument?", ["To show fairness and credibility before arguing against it.", "Because the writer agrees with it.", "To make the essay shorter."], 0, "Strategi konsesi.", { passageId: ESSAY.id, hots: true }),
        pick("adv-c7-l1-c6", "How does line 6 strengthen the essay?", ["It anticipates an objection and rebuts it logically.", "It changes the thesis.", "It adds a personal story."], 0, "Counter-argument + rebuttal.", { passageId: ESSAY.id, hots: true }),
      ],
    },
    {
      id: "adv-c7-l2",
      skill: "structure",
      title: "Cohesion and Academic Style",
      summary: "Thesis formulas, topic sentences, cohesive devices, nominalisation and hedging.",
      sections: [
        {
          title: "Thesis and topic sentences",
          blocks: [
            examples([{ wrong: "Social media is used by many teenagers.", note: "Fakta, bukan posisi." }, { wrong: "Social media is bad.", note: "Terlalu umum." }, { right: "Although social media can connect young people, schools should limit its use during lessons because it reduces concentration and increases cyberbullying.", note: "Posisi jelas + alasan + konsesi." }], "Weak to strong thesis"),
            table(["Cohesive device", "Example"], [["Reference words", "this policy, these supports, such an approach"], ["Synonyms / repetition of key nouns", "a four-day week → such a policy → this reform"], ["Transition signals", "However, Furthermore, Consequently, In contrast"], ["Nominalisation", "they decided → the decision; it reduces → the reduction"]]),
          ],
        },
        {
          title: "Academic register",
          blocks: [
            table(["Informal", "Academic"], [["a lot of", "a significant number of / considerable"], ["get better", "improve"], ["big problem", "major challenge"], ["I think", "This essay argues / It can be argued"], ["kids", "children / young learners"], ["really important", "crucial / essential"]]),
            audio("Writing tutor", say(["woman", "Your argument is good, but the style is too conversational. For example, “a lot of kids get really stressed” could be “a considerable number of students experience high levels of stress.”"], ["man", "And should I avoid “I think”?"], ["woman", "In most academic essays, yes. Use “This essay argues” or simply state the claim with appropriate hedging, such as “may” or “tends to”."])),
            tryIt(pick("adv-c7-l2-try1", "Which is more academic?", ["Students' performance may improve.", "Kids might do way better.", "Students will totally get better."], 0, "Register formal + hedging.")),
          ],
        },
      ],
      checkpoint: [
        listen("adv-c7-l2-c1", voice("This reform, however, may increase the workload of teachers."), "Listen. What does “This reform” do in the sentence?", ["refers back to an idea mentioned earlier", "introduces a new topic", "gives an example"], 0, "Reference word."),
        pick("adv-c7-l2-c2", "Which thesis is strongest?", ["Schools should replace some exams with projects because projects assess deeper skills and reduce anxiety.", "Exams exist in many schools.", "Exams are boring."], 0, "Posisi + alasan."),
        match("adv-c7-l2-c3", "Match the informal word and the academic equivalent.", [["a lot of", "a significant number of"], ["get better", "improve"], ["big problem", "major challenge"], ["really important", "crucial"]], "Register."),
        fill("adv-c7-l2-c4", "Complete (nominalisation): The government decided… → The government's ___ …", "The government's", "…", ["decision"], "Decide → decision."),
        trPick("adv-c7-l2-c5", "“Akibatnya” (academic connector) in English is…", ["Consequently", "Conversely", "Concurrently"], 0, "Consequently."),
        pick("adv-c7-l2-c6", "Which topic sentence best controls a paragraph about cost?", ["Furthermore, the policy would impose significant costs on low-income families.", "Money is important.", "Many people have families."], 0, "Topic sentence yang fokus.", { hots: true }),
      ],
    },
    {
      id: "adv-c7-l3",
      skill: "writing",
      title: "Write an Argumentative Essay",
      summary: "Outlining, drafting and self-editing a 450–600 word essay.",
      sections: [
        {
          title: "Outline",
          blocks: [
            pics([["owl-think", "plan"], ["pencil", "draft"], ["eye", "revise"], ["thumbs-up", "edit"]]),
            table(["Self-editing checklist"], [["Is my thesis arguable and specific?"], ["Does each paragraph start with a clear topic sentence?"], ["Have I treated the opposing view fairly and rebutted it?"], ["Are my claims supported by evidence or reasoning?"], ["Have I used hedging and academic vocabulary?"], ["Are there any informal words, contractions or repeated words?"]]),
            warn("Jangan menyalin argumen dari internet. Jika memakai data/kutipan, **sebutkan sumbernya** dan parafrasekan dengan kata-katamu sendiri."),
          ],
        },
        {
          title: "Write",
          blocks: [
            writing({
              id: "adv-c7-l3-write",
              title: "My argumentative essay",
              prompt: "Write an argumentative essay (450–600 words) on ONE topic: (a) Indonesia should make English a compulsory subject from Grade 1. (b) Universities should accept students based on portfolios rather than entrance exams. (c) Governments should tax sugary drinks. Include a concession paragraph and a rebuttal.",
              image: "graduation",
              minWords: 450,
              maxWords: 600,
              tips: ["Intro: context → thesis with two or three reasons", "Concession: the strongest opposing argument, fairly", "Body: one reason per paragraph (topic sentence + evidence + explanation)", "Counter-argument: It might be argued that… Yet…", "Conclusion: restate thesis + implication or alternative"],
              models: [{ label: "Example (introduction and concession)", text: "Sugary drinks have become a daily habit for millions of Indonesians, and rates of type 2 diabetes have risen alongside them. Although some argue that diet is a matter of personal choice, this essay argues that the government should introduce a tax on sugary drinks, because it would reduce consumption, protect public health and generate revenue for health programmes.\nThe most persuasive argument against such a tax is that it may disproportionately affect low-income households, who spend a larger share of their income on food and drink. This concern is legitimate and must be addressed in the design of any policy. However, evidence from several countries suggests that low-income consumers are also the most responsive to price changes, meaning they may gain the greatest health benefits. Furthermore, revenue from the tax could be used to fund free drinking water in schools and subsidies for healthy food, reducing the overall burden on poorer families." }],
              rubric: ["My thesis is clear, specific and arguable.", "Each body paragraph has a topic sentence, evidence and explanation.", "I included a fair concession and a convincing rebuttal.", "I used cohesive devices and academic register consistently.", "My conclusion restates the thesis and offers an implication."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("adv-c7-l3-c1", "In the model, what is the most persuasive opposing argument?", ["The tax may hurt low-income households more.", "Sugar is delicious.", "Taxes are always illegal."], 0, "Konsesi."),
        pick("adv-c7-l3-c2", "How does the model rebut that argument?", ["Low-income consumers may gain the most health benefits, and revenue can fund support.", "By ignoring it.", "By insulting poor people."], 0, "Rebuttal."),
        arrange("adv-c7-l3-c3", "Put the words in order.", "This concern is legitimate and must be addressed", "Pengakuan konsesi."),
        fill("adv-c7-l3-c4", "Complete: It ___ be argued that the policy is too expensive.", "It", "be argued that the policy is too expensive.", ["might", "could", "may"], "It might be argued that."),
        trPick("adv-c7-l3-c5", "“Pendapatan (pajak) negara” in English is…", ["revenue", "revenge", "review"], 0, "Revenue."),
        pick("adv-c7-l3-c6", "Why should an essay avoid contractions like “don't” and “can't”?", ["They are too informal for academic writing.", "They are grammatically wrong.", "Teachers can't read them."], 0, "Register akademik.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "adv-c7-post",
    title: "Chapter 7 Posttest",
    passPercent: 70,
    passages: [ESSAY],
    questions: [
      pick("adv-c7-post1", "Which is a concession?", ["Admittedly, the policy would reduce traffic.", "Therefore, the policy must be rejected.", "This essay argues that…", "In conclusion,…"], 0, "Admittedly = mengakui."),
      listen("adv-c7-post2", voice("Consequently, students in rural areas may be left further behind."), "Listen. What does “consequently” introduce?", ["a result", "a contrast", "an example", "a definition"], 0, "Akibat."),
      trPick("adv-c7-post3", "“Ketimpangan pendidikan” in English is…", ["educational inequality", "education unequal", "inequal education", "educating inequality"], 0, "Educational inequality."),
      pick("adv-c7-post4", "Which sentence uses nominalisation?", ["The reduction of instructional time may lower scores.", "They reduced the time.", "Time was short.", "We reduce it."], 0, "Reduce → reduction."),
      arrange("adv-c7-post5", "Put the words in order.", "This essay argues that the policy should be rejected", "Thesis."),
      pick("adv-c7-post6", "What does the writer say about the evidence on academic results?", ["It is mixed.", "It clearly shows improvement.", "There is no evidence at all.", "It only concerns Indonesia."], 0, "Baris 5.", { passageId: ESSAY.id }),
      match("adv-c7-post7", "Match the paragraph and its function.", [["line 1", "introduction and thesis"], ["line 2", "concession"], ["line 6", "counter-argument and rebuttal"], ["line 7", "conclusion"]], "Struktur esai."),
      fill("adv-c7-post8", "Complete.", "longer days could lead to", ", especially for younger children.", ["fatigue"], "Baris 6.", { passageId: ESSAY.id }),
      pick("adv-c7-post9", "Which phrase in the essay shows hedging?", ["may offer benefits", "should not adopt", "would mean losing", "In conclusion"], 0, "May = hati-hati.", { passageId: ESSAY.id, hots: true }),
      pick("adv-c7-post10", "What makes the conclusion effective?", ["It restates the thesis and proposes practical alternatives.", "It introduces a new argument about teachers.", "It repeats line 1 word for word.", "It asks readers to decide randomly."], 0, "Kesimpulan efektif.", { passageId: ESSAY.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Essay Masters",
    questions: [
      live("adv-c7-live1", "Arguable position:", ["thesis", "topic", "title", "fact"], 0, "pencil"),
      live("adv-c7-live2", "Admitting the other side:", ["concession", "conclusion", "citation", "caption"], 0, "hand"),
      live("adv-c7-live3", "Academic for “a lot of”:", ["a significant number of", "loads of", "tons of", "lots and lots"], 0, "report"),
      live("adv-c7-live4", "“Kalimat topik” =", ["topic sentence", "top sentence", "title sentence", "theme line"], 0, "open-book", true),
      live("adv-c7-live5", "Result connector:", ["Consequently", "Nevertheless", "Similarly", "Although"], 0, "target"),
      live("adv-c7-live6", "decide → noun:", ["decision", "decidement", "deciding", "decisive"], 0, "owl-think"),
      live("adv-c7-live7", "Avoid in essays:", ["contractions", "evidence", "topic sentences", "transitions"], 0, "question"),
      live("adv-c7-live8", "Risks ___ benefits.", ["outweigh", "outwait", "outway", "overweight"], 0, "graduation"),
    ],
  },
};

const MEETING: Passage = {
  id: "adv-c8-meeting",
  title: "Minutes of a Youth Committee Meeting",
  pic: "meeting",
  lines: [
    "Meeting: Planning Committee, Youth Climate Forum 2027 — Date: 15 January 2027 — Present: Tasya (Chair), Iqbal, Melinda, Joko, Ayu (minutes).",
    "1. Venue: Tasya reported that the city library hall is available for 13–14 March. The committee agreed to book it. Action: Iqbal to confirm the booking by 20 January.",
    "2. Budget: Melinda presented a draft budget of Rp45 million. Joko suggested reducing printing costs by using digital programmes. The committee agreed. Action: Melinda to revise the budget by 22 January.",
    "3. Speakers: Five speakers have been contacted; three have confirmed. Iqbal raised a concern that no speakers are from eastern Indonesia. Action: Joko to invite a youth activist from Papua or Maluku.",
    "4. Sponsorship: Two local companies have shown interest. Tasya proposed preparing a sponsorship package. Action: Ayu and Melinda to draft it by 25 January.",
    "5. Any other business: Joko asked whether the forum should be livestreamed. It was agreed to discuss this at the next meeting after checking costs.",
    "Next meeting: 29 January 2027, 4 p.m., online.",
  ],
};

export const CH8: Level = {
  id: "adv-ch8",
  title: "Chapter 8 — Professional Communication",
  description: "Communicate professionally: run and take part in meetings, write minutes and professional emails, give structured presentations and build an online professional profile.",
  targetScore: "Speaking · Writing · Listening",
  cover: ["meeting", "laptop", "microphone"],
  pretest: {
    id: "adv-c8-pre",
    title: "Chapter 8 Pretest",
    passPercent: 0,
    questions: [
      pick("adv-c8-pre1", "The written record of what was decided in a meeting is called the…", ["minutes", "hours", "agenda", "memo pad"], 0, "Notulen = minutes."),
      listen("adv-c8-pre2", voice("Let's move on to the next item on the agenda: the budget."), "Listen. What is the speaker doing?", ["moving the meeting to a new topic", "ending the meeting", "complaining", "introducing herself"], 0, "Pindah agenda."),
      trPick("adv-c8-pre3", "“Ketua rapat” in English is…", ["chair / chairperson", "chair leg", "meeting head boss", "table master"], 0, "Chair."),
      pick("adv-c8-pre4", "A list of topics to discuss in a meeting is the…", ["agenda", "minutes", "invoice", "receipt"], 0, "Agenda."),
      pick("adv-c8-pre5", "Which is the most professional email sign-off?", ["Kind regards,", "Love ya,", "Byeee!", "XOXO"], 0, "Penutup profesional."),
    ],
  },
  lessons: [
    {
      id: "adv-c8-l1",
      skill: "listening",
      title: "Meetings",
      summary: "Language for chairing, contributing, interrupting politely and agreeing on actions; reading minutes.",
      passages: [MEETING],
      sections: [
        {
          title: "Meeting language",
          blocks: [
            table(["Function", "Expressions"], [["Opening", "Shall we get started? / The purpose of today's meeting is…"], ["Moving on", "Let's move on to item two. / Next on the agenda is…"], ["Giving opinions", "From my perspective, … / I'd suggest that…"], ["Interrupting politely", "Sorry to interrupt, but… / Could I just add something?"], ["Clarifying", "Just to clarify, are you saying…? / Could you expand on that?"], ["Agreeing actions", "So, Iqbal will… by… / Who will take care of…?"], ["Closing", "To summarise, … / Thank you all; let's meet again on…"]]),
            audio("Part of the meeting", say(["woman", "Shall we get started? First item: the venue. Iqbal, could you update us?"], ["man", "Sure. The library hall is free on the thirteenth and fourteenth of March."], ["woman", "Great. Does everyone agree to book it? … Okay. Iqbal, could you confirm the booking by the twentieth?"], ["man", "No problem. Sorry, could I just add something? We should check whether the hall has wheelchair access."], ["woman", "Good point. Let's add that to your action. Moving on to item two, the budget."])),
          ],
        },
        {
          title: "Minutes",
          blocks: [
            { type: "passage", passage: MEETING },
            tip("Notulen yang baik mencatat **keputusan** dan **tindakan** (siapa melakukan apa, kapan), bukan setiap kata yang diucapkan. Gunakan **past tense** dan **reported speech**."),
            tryIt(pick("adv-c8-l1-try1", "Who is taking the minutes?", ["Ayu", "Tasya", "Iqbal"], 0, "Baris 1.", { passageId: MEETING.id })),
          ],
        },
      ],
      checkpoint: [
        pick("adv-c8-l1-c1", "How did Joko suggest reducing costs?", ["by using digital programmes instead of printing", "by cancelling the forum", "by using a smaller hall"], 0, "Baris 3.", { passageId: MEETING.id }),
        pick("adv-c8-l1-c2", "What concern did Iqbal raise about the speakers?", ["None are from eastern Indonesia.", "They are too expensive.", "They speak too long."], 0, "Baris 4.", { passageId: MEETING.id }),
        fill("adv-c8-l1-c3", "Complete.", "Action: Ayu and Melinda to draft it by", ".", ["25 January"], "Baris 5.", { passageId: MEETING.id }),
        pickMany("adv-c8-l1-c4", "Choose ALL the actions with deadlines in January.", ["confirm the booking", "revise the budget", "draft the sponsorship package", "livestream the forum"], [0, 1, 2], "Baris 2–5.", { passageId: MEETING.id }),
        pick("adv-c8-l1-c5", "Why was the livestream decision postponed?", ["They needed to check the costs first.", "Nobody liked the idea.", "The chair was absent."], 0, "Baris 6.", { passageId: MEETING.id, hots: true }),
        pick("adv-c8-l1-c6", "Which phrase would be best to interrupt politely?", ["Sorry to interrupt, but could I add something?", "Stop talking!", "Wait, wait, me first!"], 0, "Interupsi sopan.", { hots: true }),
      ],
    },
    {
      id: "adv-c8-l2",
      skill: "writing",
      title: "Professional Emails",
      summary: "Clear subject lines, purpose-first structure, polite requests, follow-ups and tone.",
      sections: [
        {
          title: "Principles",
          blocks: [
            table(["Principle", "Example"], [["Clear subject line", "Request: Speaker Confirmation — Youth Climate Forum, 13 March"], ["Purpose in the first line", "I am writing to invite you to…"], ["One topic per email", "separate emails for booking and budget"], ["Polite requests", "Could you please… / I would appreciate it if…"], ["Clear action and deadline", "Could you confirm by Friday, 24 January?"], ["Professional close", "Kind regards, + full name, role, contact"]]),
            examples([{ wrong: "Hi, so about the thing we talked about, can you do it asap? thx", right: "Dear Mr. Rahman, Following our phone call on Monday, I would like to confirm the hall booking for 13–14 March. Could you please send the invoice by Friday? Kind regards, Iqbal" }, { right: "Follow-up: I am writing to follow up on my email of 15 January regarding the hall booking. I would be grateful if you could let me know whether the dates are still available." }], "Before and after"),
          ],
        },
        {
          title: "Write",
          blocks: [
            tryIt(pick("adv-c8-l2-try1", "Which subject line is most effective?", ["Request: Speaker Confirmation — Youth Climate Forum, 13 March", "hello", "IMPORTANT!!! READ NOW"], 0, "Jelas dan spesifik.")),
            writing({
              id: "adv-c8-l2-write",
              title: "Three professional emails",
              prompt: "Based on the meeting minutes, write three short professional emails: (1) Iqbal confirming the library booking and asking about wheelchair access; (2) Joko inviting a youth activist from eastern Indonesia to speak; (3) a polite follow-up email when one of them has not replied after a week.",
              image: "laptop",
              minWords: 250,
              maxWords: 380,
              tips: ["Subject: specific", "Greeting: Dear Mr./Ms. + surname", "Purpose first: I am writing to…", "Details + request with deadline", "Kind regards, + name, role"],
              models: [{ label: "Email 2 (invitation)", text: "Subject: Invitation to Speak — Youth Climate Forum 2027, Jakarta, 13 March\nDear Ms. Kogoya,\nI am writing on behalf of the organising committee of the Youth Climate Forum 2027 to invite you to speak about your work protecting forests in the Central Highlands of Papua.\nThe forum will take place on 13–14 March at the City Library Hall, Jakarta, and will bring together around 300 young people from across Indonesia. We would be honoured if you could give a 20-minute talk followed by questions on the morning of 13 March.\nWe are able to cover your return flight and two nights' accommodation. If you are available, could you please confirm by 31 January? I would be happy to arrange a short call to discuss the details.\nKind regards,\nJoko Prasetyo\nSpeaker Coordinator, Youth Climate Forum 2027\n+62 812 0000 1111" }],
              rubric: ["Each email has a clear, specific subject line.", "The purpose is stated in the first line.", "Requests are polite and include deadlines.", "The follow-up is courteous, not accusing.", "Tone and layout are consistently professional."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("adv-c8-l2-c1", voice("I am writing to follow up on my email of fifteenth January regarding the hall booking."), "Listen. What is the purpose of this email?", ["to follow up on an earlier email", "to cancel the event", "to complain"], 0, "Follow-up."),
        pick("adv-c8-l2-c2", "Which is the best first line of a professional email?", ["I am writing to request a quotation for 300 printed programmes.", "Hey, what's up?", "So, yeah, about stuff…"], 0, "Tujuan di awal."),
        match("adv-c8-l2-c3", "Match the casual phrase and the professional version.", [["asap", "at your earliest convenience"], ["thx", "Thank you"], ["can you…?", "Could you please…?"], ["see ya", "Kind regards,"]], "Register email."),
        fill("adv-c8-l2-c4", "Complete: I would ___ it if you could reply by Friday.", "I would", "it if you could reply by Friday.", ["appreciate"], "I would appreciate it if…"),
        trPick("adv-c8-l2-c5", "“Menindaklanjuti” (an email) in English is…", ["to follow up", "to follow down", "to fall up"], 0, "Follow up."),
        pick("adv-c8-l2-c6", "Why should a professional email contain one main topic?", ["It is easier to read, answer and find later.", "Long emails are illegal.", "It saves electricity."], 0, "Efisiensi.", { hots: true }),
      ],
    },
    {
      id: "adv-c8-l3",
      skill: "speaking",
      title: "Presentations and Professional Profiles",
      summary: "Structuring a presentation, using signposting and visuals, and writing a professional profile.",
      sections: [
        {
          title: "Presentation structure",
          blocks: [
            table(["Stage", "Language"], [["Hook", "Imagine… / Did you know that…?"], ["Purpose and outline", "Today I'll talk about three things: first…, then…, finally…"], ["Signposting", "Let's move on to… / This brings me to… / As you can see on this slide…"], ["Emphasis", "What's really important here is… / The key point is…"], ["Conclusion", "To sum up… / The main takeaway is…"], ["Q&A", "That's a great question. / I'm not sure, but I'll find out and get back to you."]]),
            pics([["microphone", "voice"], ["laptop", "slides"], ["eye", "eye contact"], ["clock", "timing"]]),
            warn("Slide yang baik: **sedikit teks**, **satu ide per slide**, **visual yang jelas**. Jangan membaca slide kata demi kata."),
          ],
        },
        {
          title: "Present and profile",
          blocks: [
            speaking({
              id: "adv-c8-l3-say",
              title: "A three-minute pitch",
              prompt: "As a member of the Youth Climate Forum committee, give a three-minute presentation to potential sponsors explaining the forum's purpose, audience, programme and the benefits of sponsoring it.",
              image: "microphone",
              prepSeconds: 120,
              seconds: 180,
              tips: ["Hook: a striking fact about young people and climate", "Outline: purpose, programme, sponsorship benefits", "Signposting between sections", "Clear call to action", "Q&A phrase"],
              models: [{ label: "Example", text: "Good afternoon. Did you know that more than half of Indonesia's population is under 35? That means the people who will live with the effects of climate change are sitting in our classrooms right now. Today I'll talk about three things: what the Youth Climate Forum is, what happens there, and how your company can be part of it. First, the forum brings together 300 young leaders from every province for two days in March. As you can see on this slide, our speakers include scientists, entrepreneurs and activists from Aceh to Papua. This brings me to the programme: workshops on renewable energy, waste businesses and climate journalism. Finally, sponsorship. Sponsors will have their logo on all digital materials, a booth at the event, and the chance to meet future employees. The main takeaway is this: investing in young climate leaders is investing in your future market. Thank you. I'd be happy to answer any questions." }],
              rubric: ["I started with a hook and gave an outline.", "I used clear signposting.", "I explained benefits for the audience.", "I ended with a summary and call to action.", "My delivery was confident and well-timed."],
            }),
            writing({
              id: "adv-c8-l3-write",
              title: "My professional profile",
              prompt: "Write a professional online profile (like a LinkedIn “About” section) of 120–180 words: who you are, your skills and experiences, your values and what opportunities you are looking for. Write in the first person, professionally.",
              image: "staff",
              minWords: 120,
              maxWords: 200,
              tips: ["I am a … student at … with a strong interest in …", "Through …, I have developed …", "I am proud of …", "I value …", "I am currently looking for …"],
              models: [{ label: "Example", text: "I am a Grade 12 student at SMA Negeri 3 Semarang with a strong interest in environmental policy and science communication.\nThrough two years on our school's Student Council, I have developed skills in event management, budgeting and public speaking. As Speaker Coordinator for the Youth Climate Forum 2027, I invited and worked with speakers from eight provinces, including Papua and Maluku. I also write a monthly column on local environmental issues for our school magazine.\nI am proud of leading a beach clean-up programme that collected more than two tonnes of waste in one year and involved over 150 volunteers.\nI value honesty, teamwork and solutions that include people from every region of Indonesia.\nI am currently looking for internship and volunteer opportunities in environmental organisations, and I would welcome the chance to connect with professionals in climate policy and communication." }],
              rubric: ["My profile introduces me clearly.", "I described skills with specific experiences and numbers.", "I included values and goals.", "The tone is professional but personal.", "The text is concise and error-free."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("adv-c8-l3-c1", voice("This brings me to my second point: the cost of the programme."), "Listen. What is the speaker doing?", ["signposting a new section", "ending the talk", "answering a question"], 0, "Signposting."),
        pick("adv-c8-l3-c2", "Which response to a difficult question is most professional?", ["That's a great question. I'm not sure, but I'll find out and get back to you.", "I don't know. Next.", "That's a stupid question."], 0, "Profesional."),
        arrange("adv-c8-l3-c3", "Put the words in order.", "Today I will talk about three things", "Outline presentasi."),
        fill("adv-c8-l3-c4", "Complete: The main ___ is that young people need support.", "The main", "is that young people need support.", ["takeaway", "point"], "Main takeaway."),
        trPick("adv-c8-l3-c5", "“Seperti yang Anda lihat di slide ini…” in English is…", ["As you can see on this slide…", "Like you see in this slide…", "As you look at slide this…"], 0, "Signposting visual."),
        pick("adv-c8-l3-c6", "Why should slides contain little text?", ["So the audience listens to the speaker instead of reading.", "Text is expensive.", "Projectors can't show words."], 0, "Desain slide.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "adv-c8-post",
    title: "Chapter 8 Posttest",
    passPercent: 70,
    passages: [MEETING],
    questions: [
      pick("adv-c8-post1", "“Just to clarify, are you saying we should postpone it?” is used to…", ["check understanding", "end a meeting", "give a decision", "greet people"], 0, "Klarifikasi."),
      listen("adv-c8-post2", voice("To summarise, we've agreed on the venue and the budget. Our next meeting is on the twenty-ninth."), "Listen. What stage of the meeting is this?", ["closing", "opening", "introductions", "a break"], 0, "Penutup rapat."),
      trPick("adv-c8-post3", "“Notulen rapat” in English is…", ["meeting minutes", "meeting seconds", "meeting notes book", "minute meeting"], 0, "Minutes."),
      pick("adv-c8-post4", "Which email sentence is the most professional?", ["Could you please confirm the booking by Friday?", "Confirm it.", "u need to confirm by fri", "Why haven't you confirmed?!"], 0, "Permintaan sopan."),
      arrange("adv-c8-post5", "Put the words in order.", "Let's move on to the next item", "Pindah agenda."),
      pick("adv-c8-post6", "When is the next meeting?", ["29 January 2027 at 4 p.m., online", "15 January", "13 March", "20 January"], 0, "Baris 7.", { passageId: MEETING.id }),
      match("adv-c8-post7", "Match the person and the action.", [["Iqbal", "confirm the booking"], ["Melinda", "revise the budget"], ["Joko", "invite a speaker from eastern Indonesia"], ["Ayu", "co-draft the sponsorship package"]], "Tindakan dari notulen."),
      fill("adv-c8-post8", "Complete.", "Melinda presented a draft budget of Rp45", ".", ["million"], "Baris 3.", { passageId: MEETING.id }),
      pick("adv-c8-post9", "What do the minutes focus on?", ["decisions and actions with responsibilities and deadlines", "every word everyone said", "jokes during the meeting", "personal opinions of the note-taker"], 0, "Fungsi notulen.", { passageId: MEETING.id, hots: true }),
      pick("adv-c8-post10", "Which value does Iqbal's concern in item 3 reflect?", ["inclusion and fair representation", "saving money", "speed", "competition"], 0, "Inklusivitas.", { passageId: MEETING.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Pro Mode",
    questions: [
      live("adv-c8-live1", "Meeting record:", ["minutes", "hours", "agenda", "invoice"], 0, "meeting"),
      live("adv-c8-live2", "Topics to discuss:", ["agenda", "minutes", "receipt", "memo"], 0, "report"),
      live("adv-c8-live3", "Polite interruption:", ["Sorry to interrupt, but…", "Stop!", "Me now!", "Quiet!"], 0, "hand"),
      live("adv-c8-live4", "“Ketua rapat” =", ["chair", "chef", "chain", "cheer"], 0, "staff", true),
      live("adv-c8-live5", "Professional sign-off:", ["Kind regards,", "Byeee,", "Love,", "XOXO"], 0, "envelope"),
      live("adv-c8-live6", "Signposting phrase:", ["This brings me to…", "Whatever…", "Anyway, bye.", "Um…"], 0, "microphone"),
      live("adv-c8-live7", "Email purpose goes…", ["in the first line", "at the end", "in the P.S.", "nowhere"], 0, "laptop"),
      live("adv-c8-live8", "Good slides have…", ["little text", "long paragraphs", "tiny fonts", "no images ever"], 0, "eye"),
    ],
  },
};
