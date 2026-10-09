import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 9 (SMP, Fase D). Chapter 7 — In the News (reported speech) · Chapter 8 — Ready for the Next Step

const NEWS: Passage = {
  id: "smp9-c7-news",
  title: "Students Turn Plastic Waste into School Benches",
  pic: "recycle",
  lines: [
    "MAKASSAR — A group of junior high school students in Makassar has turned more than 500 kilograms of plastic waste into colourful benches for their school.",
    "The project was started in January by the environment club of SMP Negeri 8 Makassar. The students collected plastic bottles and snack packets from their homes and the nearby beach.",
    "The plastic was cleaned, shredded and melted into strong boards with the help of a local recycling community.",
    "On Monday, ten benches were placed in the school garden. Each bench is made from about 50 kilograms of plastic.",
    "“We wanted to show that rubbish can become something useful,” said Andi Pratama, 15, the leader of the club.",
    "The headmaster said that the school was very proud of the students. He added that the project would continue next year.",
    "Local officials have asked the club to share their method with other schools in the city.",
  ],
};

export const CH7: Level = {
  id: "smp9-ch7",
  title: "Chapter 7 — In the News",
  description: "Read short news items, identify the 5W+1H, understand headlines, and report what people said with reported statements, questions and commands.",
  targetScore: "Reading · Structure · Speaking",
  cover: ["report", "tv", "microphone"],
  pretest: {
    id: "smp9-c7-pre",
    title: "Chapter 7 Pretest",
    passPercent: 0,
    questions: [
      pick("smp9-c7-pre1", "The first paragraph of a news item usually tells…", ["the most important facts", "the writer's opinion", "a joke", "the ending of a story"], 0, "Lead = inti berita."),
      listen("smp9-c7-pre2", voice("Heavy rain caused floods in three villages in Bekasi on Tuesday night."), "Listen. When did the floods happen?", ["on Tuesday night", "on Monday morning", "last month", "on Sunday"], 0, "Tuesday night."),
      trPick("smp9-c7-pre3", "“Wartawan” in English is…", ["journalist / reporter", "journey", "joker", "judge"], 0, "Journalist/reporter."),
      pick("smp9-c7-pre4", "Rina: “I am tired.” → Rina said that she ___ tired.", ["was", "is", "am", "were"], 0, "Reported speech: am → was."),
      pick("smp9-c7-pre5", "5W+1H stands for who, what, when, where, why and…", ["how", "which", "whose", "whom"], 0, "H = how (bagaimana)."),
    ],
  },
  lessons: [
    {
      id: "smp9-c7-l1",
      skill: "reading",
      title: "Reading the News",
      summary: "Headlines, leads, 5W+1H and the structure of a news item.",
      passages: [NEWS],
      sections: [
        {
          title: "A news item",
          blocks: [
            { type: "passage", passage: NEWS },
            audio("Listen to the news", say(["man", NEWS.lines.join(" ")])),
            table(["Part", "Function", "In the text"], [["Headline", "judul singkat yang menarik", "Students Turn Plastic Waste into School Benches"], ["Newsworthy event (lead)", "ringkasan inti: siapa, apa, di mana", "line 1"], ["Background events", "detail: bagaimana, kapan, mengapa", "lines 2–4"], ["Sources", "kutipan dari saksi/ahli/pejabat", "lines 5–6"]]),
          ],
        },
        {
          title: "Headline language",
          blocks: [
            table(["Headline style", "Full meaning"], [["Students Turn Plastic into Benches", "Students have turned plastic into benches. (present for recent news)"], ["Bridge to Be Built in Kupang", "A bridge is going to be built. (to + verb = future)"], ["Flood Hits 3 Villages", "A flood has hit three villages."], ["Teen Inventor Wins Award", "A teenage inventor has won an award."]]),
            tip("Judul berita sering **menghilangkan a/the dan be**, memakai **simple present** untuk berita baru, dan **to + verb** untuk rencana."),
            tryIt(pick("smp9-c7-l1-try1", "Who started the project?", ["the environment club of SMP Negeri 8 Makassar", "the local officials", "a recycling company"], 0, "Baris 2.", { passageId: NEWS.id })),
          ],
        },
      ],
      checkpoint: [
        pick("smp9-c7-l1-c1", "How much plastic did the students turn into benches?", ["more than 500 kilograms", "50 kilograms", "10 kilograms"], 0, "Baris 1.", { passageId: NEWS.id }),
        pick("smp9-c7-l1-c2", "Where did the students collect the plastic?", ["from their homes and the nearby beach", "from a factory", "from the market"], 0, "Baris 2.", { passageId: NEWS.id }),
        fill("smp9-c7-l1-c3", "Complete.", "On Monday, ten benches were placed in the school", ".", ["garden"], "Baris 4.", { passageId: NEWS.id }),
        pickMany("smp9-c7-l1-c4", "Choose ALL the steps to make the boards.", ["cleaned", "shredded", "melted", "painted with gold"], [0, 1, 2], "Baris 3.", { passageId: NEWS.id }),
        pick("smp9-c7-l1-c5", "Why does the writer include Andi's words?", ["to give a direct source and make the news reliable", "to tell a joke", "to advertise benches"], 0, "Kutipan narasumber.", { passageId: NEWS.id, hots: true }),
        pick("smp9-c7-l1-c6", "“Bridge to Be Built in Kupang” means…", ["A bridge is going to be built in Kupang.", "A bridge was built in Kupang.", "A bridge fell down in Kupang."], 0, "To + verb = akan datang.", { hots: true }),
      ],
    },
    {
      id: "smp9-c7-l2",
      skill: "structure",
      title: "Reported Speech",
      summary: "Reporting statements, questions and commands; tense and pronoun changes.",
      sections: [
        {
          title: "Statements",
          blocks: [
            table(["Direct", "Reported"], [["“I am proud.”", "He said (that) he was proud."], ["“We collect plastic.”", "They said they collected plastic."], ["“I'm working on a project.”", "She said she was working on a project."], ["“We finished it yesterday.”", "They said they had finished it the day before."], ["“We have won!”", "They said they had won."], ["“It will continue.”", "He said it would continue."], ["“I can help.”", "She said she could help."]]),
            table(["Time and place changes", ""], [["now → then", "today → that day"], ["yesterday → the day before", "tomorrow → the next day"], ["here → there", "this → that"]]),
            warn("**said** tidak diikuti objek orang (*He said me* ❌). Pakai **told + orang**: *He **told me** that…* ✅."),
          ],
        },
        {
          title: "Questions and commands",
          blocks: [
            table(["Type", "Direct", "Reported"], [["Yes/No question", "“Are you ready?”", "She asked if/whether I was ready."], ["Wh- question", "“Where do you live?”", "He asked where I lived."], ["Command", "“Sit down.”", "The teacher told us to sit down."], ["Negative command", "“Don't be late.”", "She told me not to be late."], ["Request", "“Please help me.”", "He asked me to help him."]]),
            examples([{ wrong: "He asked where did I live.", right: "He asked where I lived.", note: "Urutan kalimat pernyataan, tanpa did." }, { wrong: "She told me don't run.", right: "She told me not to run." }]),
            audio("Interview", say(["woman", "Andi, why did you start this project?"], ["man", "Because our beach was full of plastic. I couldn't stand it anymore."], ["woman", "What will you make next?"], ["man", "We are going to make tables for the canteen."])),
            tryIt(pick("smp9-c7-l2-try1", "The reporter asked Andi ___ .", ["why he had started the project", "why did he start the project", "why he starts the project now"], 0, "Wh- + subject + verb (mundur).")),
          ],
        },
      ],
      checkpoint: [
        listen("smp9-c7-l2-c1", voice("“Don't touch the hot machine,” the teacher said."), "Listen. Report it.", ["The teacher told us not to touch the hot machine.", "The teacher told us don't touch the hot machine.", "The teacher said us not touch the machine."], 0, "Told + not to."),
        pick("smp9-c7-l2-c2", "“I can swim.” → Dina said she ___ swim.", ["could", "can", "cans"], 0, "Can → could."),
        pick("smp9-c7-l2-c3", "“Are you hungry?” → He asked ___ I was hungry.", ["if", "that", "what"], 0, "Yes/No → if/whether."),
        fill("smp9-c7-l2-c4", "Complete: “Close the door.” → She told me ___ close the door.", "She told me", "close the door.", ["to"], "Told + to."),
        trPick("smp9-c7-l2-c5", "“Dia bilang dia akan datang besok.” (reported) in English is…", ["He said he would come the next day.", "He said he will come tomorrow.", "He told he would coming."], 0, "Will → would, tomorrow → the next day."),
        pick("smp9-c7-l2-c6", "Which reported sentence is correct?", ["She told me that she had lost her phone.", "She said me that she had lost her phone.", "She told that she lost me her phone."], 0, "Told + orang; said tanpa orang.", { hots: true }),
      ],
    },
    {
      id: "smp9-c7-l3",
      skill: "speaking",
      title: "Be a Reporter",
      summary: "Interviewing someone and presenting a news report.",
      sections: [
        {
          title: "Plan your report",
          blocks: [
            pics([["microphone", "interview"], ["camera", "take photos"], ["report", "write notes"], ["tv", "present the news"]]),
            vocab([["reporter", "reporter/wartawan", "microphone"], ["eyewitness", "saksi mata", "eye"], ["according to", "menurut", "chat"], ["incident", "kejadian", "surprised"]], "News words"),
            text("Wawancarai teman/guru/tetangga tentang **kejadian di sekolah atau lingkunganmu**. Catat jawabannya, lalu ubah menjadi **berita** dengan 5W+1H dan **reported speech**."),
          ],
        },
        {
          title: "Present it",
          blocks: [
            speaking({
              id: "smp9-c7-l3-say",
              title: "School news report",
              prompt: "Present a 1–2 minute news report about a real or imaginary event at your school or in your neighbourhood. Answer the 5W+1H and report what at least two people said.",
              image: "tv",
              prepSeconds: 90,
              seconds: 120,
              tips: ["Good morning. This is … reporting from …", "Yesterday, … (what, where, when)", "According to …, …", "… said that … / … told us that …", "That's all from … Back to the studio."],
              models: [{ label: "Example", text: "Good morning. This is Sekar reporting from SMP Harapan in Medan. Yesterday afternoon, our school's robotics team won first place in the North Sumatra Junior Robotics Competition. Their robot, called Si Rajin, can sort rubbish into plastic, paper and cans. According to the team captain, Kevin, they had worked on the robot for four months. He said that they had almost given up when the motor broke two weeks before the competition. Their coach, Ms. Ani, told us that she was very proud of the team. She said they would represent North Sumatra at the national level next month. That's all from SMP Harapan. Back to the studio!" }],
              rubric: ["I answered who, what, when, where, why and how.", "I reported at least two people's words correctly.", "I used tense changes in reported speech.", "I spoke clearly like a news presenter."],
            }),
            writing({
              id: "smp9-c7-l3-write",
              title: "Write a news item",
              prompt: "Write a short news item for the school website based on your report. Include a headline, a lead with the main facts, background details and at least two quotations or reported statements.",
              image: "report",
              minWords: 120,
              maxWords: 220,
              tips: ["Headline: short, present simple", "Lead: who, what, where, when", "Details: how and why", "Sources: “…,” said … / … said that …"],
              models: [{ label: "Example", text: "SMP Harapan Robot Wins Provincial Title\nMEDAN — The robotics team of SMP Harapan won first place in the North Sumatra Junior Robotics Competition on Saturday, 14 September.\nThe team's robot, Si Rajin, can sort rubbish into three bins using a colour sensor. The four students built it in four months, using parts from old toys and a small computer.\n“We nearly gave up when the motor broke,” said team captain Kevin Siregar, 14. He said that a local electronics shop had helped them repair it for free.\nCoach Ani Lubis said that she was proud of the team's hard work. The team will compete at the national competition in Jakarta next month." }],
              rubric: ["My headline is short and clear.", "The lead contains the main facts.", "I included background details (how/why).", "I used direct quotes and reported speech correctly.", "My news item is objective (no personal opinion)."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("smp9-c7-l3-c1", voice("According to the police, nobody was injured in the accident."), "Listen. Who gave the information?", ["the police", "a doctor", "a teacher"], 0, "According to the police."),
        pick("smp9-c7-l3-c2", "Which sentence is NOT objective enough for a news item?", ["It was the most boring event ever.", "The event started at 9 a.m.", "About 300 students attended."], 0, "Opini pribadi."),
        arrange("smp9-c7-l3-c3", "Put the words in order.", "She said that she was very proud", "Reported statement."),
        fill("smp9-c7-l3-c4", "Complete: ___ to the coach, the team practised every day.", "", "to the coach, the team practised every day.", ["According", "according"], "According to = menurut."),
        trPick("smp9-c7-l3-c5", "“Saksi mata” in English is…", ["eyewitness", "eye doctor", "witness eye"], 0, "Eyewitness."),
        pick("smp9-c7-l3-c6", "Why should a reporter interview more than one person?", ["to get balanced and reliable information", "to make the report longer", "to make friends"], 0, "Berita berimbang.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp9-c7-post",
    title: "Chapter 7 Posttest",
    passPercent: 70,
    passages: [NEWS],
    questions: [
      pick("smp9-c7-post1", "“I live in Medan.” → She said she ___ in Medan.", ["lived", "lives", "living", "is live"], 0, "Present → past."),
      listen("smp9-c7-post2", voice("The mayor said that the new library would open next month."), "Listen. When will the library open?", ["next month", "next year", "tomorrow", "last month"], 0, "Next month."),
      trPick("smp9-c7-post3", "“Menurut” in English is…", ["according to", "accordion", "along with", "regarding to"], 0, "According to."),
      pick("smp9-c7-post4", "“Where is the station?” → He asked me where the station ___ .", ["was", "is it", "was it", "did"], 0, "Urutan pernyataan + mundur."),
      arrange("smp9-c7-post5", "Put the words in order.", "The teacher told us not to run", "Told + not to."),
      pick("smp9-c7-post6", "How many benches were placed in the garden?", ["ten", "fifty", "five hundred", "eight"], 0, "Baris 4.", { passageId: NEWS.id }),
      match("smp9-c7-post7", "Match the direct and reported forms.", [["will", "would"], ["can", "could"], ["am / is", "was"], ["today", "that day"]], "Perubahan dalam reported speech."),
      fill("smp9-c7-post8", "Complete.", "He added that the project would", "next year.", ["continue"], "Baris 6.", { passageId: NEWS.id }),
      pick("smp9-c7-post9", "What did the headmaster actually say (direct speech)?", ["“The school is very proud of the students. The project will continue next year.”", "“The school was proud. The project would continue.”", "“I am not proud.”", "“Stop the project.”"], 0, "Ubah balik ke kalimat langsung.", { passageId: NEWS.id, hots: true }),
      pick("smp9-c7-post10", "What is the most likely result of line 7?", ["More schools will make benches from plastic.", "The club will close.", "The beach will be dirtier.", "The benches will be sold abroad."], 0, "Metode dibagikan ke sekolah lain.", { passageId: NEWS.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Breaking News!",
    questions: [
      live("smp9-c7-live1", "News lead tells…", ["main facts", "jokes", "opinions", "recipes"], 0, "report"),
      live("smp9-c7-live2", "will → (reported)", ["would", "will", "won't", "wills"], 0, "question"),
      live("smp9-c7-live3", "He ___ me the news.", ["told", "said", "spoke", "talked"], 0, "chat"),
      live("smp9-c7-live4", "“Wartawan” =", ["journalist", "judge", "jogger", "jeweller"], 0, "microphone", true),
      live("smp9-c7-live5", "tomorrow → (reported)", ["the next day", "the day before", "today", "yesterday"], 0, "calendar"),
      live("smp9-c7-live6", "She told me ___ be late.", ["not to", "don't", "no", "not"], 0, "clock"),
      live("smp9-c7-live7", "The benches are made of…", ["plastic", "wood", "steel", "stone"], 0, "recycle"),
      live("smp9-c7-live8", "5W + 1H: the H is…", ["how", "here", "huge", "his"], 0, "owl-think"),
    ],
  },
};

const LETTER: Passage = {
  id: "smp9-c8-letter",
  title: "A Letter to My Future Self",
  pic: "envelope",
  lines: [
    "Dear Future Me,",
    "I'm writing this letter three weeks before I graduate from junior high school. I hope you are reading it after you have finished senior high school.",
    "Right now, I'm a bit nervous. I've applied to a vocational school (SMK) because I want to study computer and network engineering.",
    "My parents wanted me to go to a general high school, but I explained that I enjoy fixing computers more than anything. In the end, they agreed.",
    "I hope you still remember the promise we made: to practise English every day and to read at least one book a month.",
    "I wish I were more confident when I speak in front of people. I hope you have become braver.",
    "Whatever happens, don't forget the people who helped us: Bu Ratna, who believed in us, and our friends in 9C.",
    "Please be kind, keep learning and never stop dreaming. Love, Your 15-year-old self",
  ],
};

export const CH8: Level = {
  id: "smp9-ch8",
  title: "Chapter 8 — Ready for the Next Step",
  description: "Talk about hopes, wishes and plans for senior high school, use hope / wish and gerunds and infinitives, write a personal letter and give a graduation speech.",
  targetScore: "Speaking · Writing · Structure",
  cover: ["graduation", "target", "envelope"],
  pretest: {
    id: "smp9-c8-pre",
    title: "Chapter 8 Pretest",
    passPercent: 0,
    questions: [
      pick("smp9-c8-pre1", "I hope you ___ the exam.", ["pass", "passed", "would pass", "passing"], 0, "Hope + present (harapan nyata)."),
      listen("smp9-c8-pre2", voice("I'm planning to continue my studies at a vocational school in Surabaya."), "Listen. Where does she plan to study?", ["at a vocational school in Surabaya", "at a university", "abroad", "at a general high school in Jakarta"], 0, "Vocational school in Surabaya."),
      trPick("smp9-c8-pre3", "“SMK” in English is usually…", ["vocational high school", "junior high school", "primary school", "university"], 0, "Vocational high school."),
      pick("smp9-c8-pre4", "I enjoy ___ new things.", ["learning", "to learn", "learn", "learned"], 0, "Enjoy + -ing."),
      pick("smp9-c8-pre5", "I decided ___ harder.", ["to study", "studying", "study", "studied"], 0, "Decide + to."),
    ],
  },
  lessons: [
    {
      id: "smp9-c8-l1",
      skill: "structure",
      title: "Hopes and Wishes",
      summary: "hope + present/future (possible) vs. wish + past (unreal, regrets).",
      sections: [
        {
          title: "Hope or wish?",
          blocks: [
            table(["", "Use", "Example"], [["hope + present / will", "sesuatu yang mungkin terjadi", "I hope you get into your dream school. I hope it will be sunny."], ["wish + past simple", "berharap sesuatu yang tidak nyata sekarang", "I wish I had more time. (but I don't)"], ["wish + were", "keinginan tidak nyata dengan be", "I wish I were taller."], ["wish + could", "kemampuan yang tidak dimiliki", "I wish I could speak Japanese."], ["wish + past perfect", "penyesalan tentang masa lalu", "I wish I had studied harder last year."]]),
            examples([{ wrong: "I wish you pass the exam.", right: "I hope you pass the exam." }, { wrong: "I wish I am taller.", right: "I wish I were taller." }], "Common mistakes"),
          ],
        },
        {
          title: "Saying it naturally",
          blocks: [
            audio("Before the announcement", say(["woman", "The exam results come out tomorrow. I'm so nervous!"], ["man", "I hope we both pass with good marks."], ["woman", "I wish I had studied more for the science test. I didn't sleep well that week."], ["man", "Don't worry. You did your best. I wish I could stop thinking about it, too!"])),
            tryIt(pick("smp9-c8-l1-try1", "What does the girl regret?", ["not studying more for science", "sleeping too much", "choosing the wrong school"], 0, "I wish I had studied more.")),
            repeat(["I hope you have a great time.", "I wish I were braver.", "I wish I could fly.", "I wish I had listened to you."]),
          ],
        },
      ],
      checkpoint: [
        listen("smp9-c8-l1-c1", voice("I wish I lived closer to school. It takes me an hour every morning."), "Listen. What is the problem?", ["She lives far from school.", "She lives next to school.", "She doesn't go to school."], 0, "Wish + past = tidak nyata."),
        pick("smp9-c8-l1-c2", "I hope you ___ well soon.", ["get", "got", "had got"], 0, "Hope + present."),
        pick("smp9-c8-l1-c3", "I can't swim. I wish I ___ swim.", ["could", "can", "will"], 0, "Wish + could."),
        fill("smp9-c8-l1-c4", "Complete: I wish I ___ (be) on holiday now.", "I wish I", "on holiday now.", ["were", "was"], "Wish + were."),
        trPick("smp9-c8-l1-c5", "“Seandainya aku mendengarkan nasihatmu kemarin.” in English is…", ["I wish I had listened to your advice yesterday.", "I hope I listen to your advice yesterday.", "I wish I listen your advice."], 0, "Penyesalan masa lalu → had + V3."),
        pick("smp9-c8-l1-c6", "Which sentence shows a REGRET?", ["I wish I hadn't eaten so much.", "I hope you enjoy the party.", "I'm planning to study IT."], 0, "Wish + past perfect.", { hots: true }),
      ],
    },
    {
      id: "smp9-c8-l2",
      skill: "speaking",
      title: "Plans for Senior High School",
      summary: "Gerunds and infinitives; talking about choices, reasons and plans.",
      sections: [
        {
          title: "Verb + -ing or to + verb?",
          blocks: [
            table(["+ -ing (gerund)", "+ to + verb (infinitive)"], [["enjoy, finish, avoid, mind", "want, decide, plan, hope"], ["keep, practise, consider, suggest", "need, learn, promise, would like"], ["be interested in, be good at, look forward to", "agree, refuse, choose, expect"]]),
            examples([{ right: "I'm considering studying at an SMK." }, { right: "I've decided to join the science club." }, { right: "I'm looking forward to meeting new friends." }, { wrong: "I want studying abroad.", right: "I want to study abroad." }]),
          ],
        },
        {
          title: "Choosing a school",
          blocks: [
            table(["School type", "Focus"], [["SMA (general high school)", "academic subjects; preparation for university"], ["SMK (vocational school)", "practical skills for a job: IT, tourism, engineering, agriculture…"], ["MA (Islamic high school)", "academic subjects and religious studies"], ["Boarding school", "living at school; discipline and independence"]]),
            pics([["laptop", "IT and computers"], ["chef", "culinary arts"], ["technician", "engineering"], ["open-book", "science and social studies"]]),
            speaking({
              id: "smp9-c8-l2-say",
              title: "My next step",
              prompt: "Talk about which school you want to go to after junior high, why, what you're looking forward to, and what you need to prepare. Use at least four gerund/infinitive patterns.",
              image: "school",
              prepSeconds: 45,
              seconds: 90,
              tips: ["I've decided to …", "I'm interested in …", "I'm looking forward to …", "I need to … / I hope to …", "I want to avoid …"],
              models: [{ label: "Example", text: "After junior high school, I've decided to go to a vocational school and study culinary arts. I've always enjoyed cooking with my grandmother, and I'm interested in opening my own restaurant one day. I'm really looking forward to learning how to bake bread and make pastries. Of course, I need to improve my maths too, because running a business means counting money! I also want to avoid wasting time on my phone, so I've promised to read one recipe book a month. I hope to do an internship at a hotel in Bali." }],
              rubric: ["I said which school and why.", "I used at least four gerund or infinitive patterns correctly.", "I mentioned things I'm looking forward to.", "I described how I will prepare."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("smp9-c8-l2-c1", voice("I'm considering going to a boarding school, but I'm worried about missing my family."), "Listen. What is she worried about?", ["missing her family", "the school fees", "the food"], 0, "Missing my family."),
        pick("smp9-c8-l2-c2", "I'm looking forward to ___ you.", ["seeing", "see", "to see"], 0, "Look forward to + -ing."),
        pick("smp9-c8-l2-c3", "She has decided ___ in Bandung.", ["to study", "studying", "study"], 0, "Decide + to."),
        match("smp9-c8-l2-c4", "Match to make correct sentences.", [["I enjoy", "swimming in the sea."], ["I want", "to be a pilot."], ["She avoided", "eating sugar."], ["They promised", "to call us back."]], "Gerund vs infinitive."),
        trPick("smp9-c8-l2-c5", "“Aku tertarik belajar desain grafis.” in English is…", ["I'm interested in learning graphic design.", "I'm interested to learning graphic design.", "I'm interesting in learn graphic design."], 0, "Interested in + -ing."),
        pick("smp9-c8-l2-c6", "Your friend loves fixing engines and wants to work soon after school. Which choice fits best?", ["an SMK with automotive engineering", "an SMA focused on history", "no school at all"], 0, "Sesuai minat praktis.", { hots: true }),
      ],
    },
    {
      id: "smp9-c8-l3",
      skill: "writing",
      title: "Reading and Writing: A Letter to My Future Self",
      summary: "Personal letters and a farewell speech for graduation.",
      passages: [LETTER],
      sections: [
        {
          title: "The letter",
          blocks: [
            { type: "passage", passage: LETTER },
            audio("Listen and read", say(["woman", LETTER.lines.join(" ")])),
            tryIt(pick("smp9-c8-l3-try1", "What does the writer want to study?", ["computer and network engineering", "medicine", "art"], 0, "Baris 3.", { passageId: LETTER.id })),
          ],
        },
        {
          title: "Your letter",
          blocks: [
            writing({
              id: "smp9-c8-l3-write",
              title: "A letter to my future self",
              prompt: "Write a letter to yourself to open in three years. Describe how you feel now, your plans for senior high school, your hopes and wishes, and advice for your future self.",
              image: "envelope",
              minWords: 150,
              maxWords: 280,
              tips: ["Dear Future Me,", "Right now, I'm … I've just …", "I've decided to … because …", "I hope you … / I wish I …", "Please remember to …", "Love, …"],
              models: [{ label: "Example", text: "Dear Future Me,\nToday is my last day of Grade 9. Right now, I'm sitting in my room, listening to the rain and feeling happy but a little sad.\nI've decided to go to SMA Negeri 1 because I want to study science and become a doctor one day. I'm looking forward to joining the Youth Red Cross there. I know biology will be hard, so I've promised to study every evening for at least two hours.\nI hope you have made good friends and that you still play badminton with Dad on Sundays. I wish I were less shy. I hope you have learned to speak up in class.\nPlease remember to call Grandma more often and to be kind to Adik, even when she takes your things.\nLove,\nYour 15-year-old self" }],
              rubric: ["I used the letter format (greeting, body, closing).", "I described my present feelings and plans.", "I used hope and wish correctly.", "I used gerunds and infinitives correctly.", "My letter is personal and sincere."],
            }),
            speaking({
              id: "smp9-c8-l3-say",
              title: "Graduation speech",
              prompt: "Give a short graduation speech as the class representative. Greet the audience, share a memory, thank teachers and parents, express hopes for the future and say goodbye.",
              image: "graduation",
              prepSeconds: 90,
              seconds: 120,
              tips: ["Respected …, dear …", "Three years ago, we …", "We would like to thank …", "I hope we will … / I wish we could …", "Thank you and goodbye."],
              models: [{ label: "Example", text: "Respected headmaster, teachers, parents and my dear friends. Three years ago, we walked through the gate of this school as nervous Grade 7 students. Some of us got lost on the first day! Today, we stand here, ready for the next step. We would like to thank our teachers for their patience and for believing in us, even when we didn't believe in ourselves. To our parents: thank you for every early morning and every prayer. Friends, I wish we could stay together a little longer, but I hope we will all chase our dreams and meet again as successful people. Thank you, and goodbye!" }],
              rubric: ["I greeted the audience in the correct order.", "I shared a memory.", "I thanked teachers and parents.", "I used hope/wish for the future.", "I spoke clearly and confidently."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("smp9-c8-l3-c1", "Why were the writer's parents unsure at first?", ["They wanted the writer to go to a general high school.", "They wanted the writer to work.", "They wanted the writer to move abroad."], 0, "Baris 4.", { passageId: LETTER.id }),
        pickMany("smp9-c8-l3-c2", "Choose ALL the promises the writer made.", ["to practise English every day", "to read one book a month", "to stop using computers", "to become a teacher"], [0, 1], "Baris 5.", { passageId: LETTER.id }),
        fill("smp9-c8-l3-c3", "Complete.", "I wish I were more", "when I speak in front of people.", ["confident"], "Baris 6.", { passageId: LETTER.id }),
        pick("smp9-c8-l3-c4", "Who is Bu Ratna?", ["a teacher who believed in the writer", "the writer's mother", "a classmate"], 0, "Baris 7.", { passageId: LETTER.id }),
        pick("smp9-c8-l3-c5", "What does line 4 show about the writer?", ["They can explain their choice and convince others.", "They always obey without talking.", "They argue angrily."], 0, "Menjelaskan dan meyakinkan orang tua.", { passageId: LETTER.id, hots: true }),
        pick("smp9-c8-l3-c6", "Why does the writer use “I wish” in line 6 but “I hope” in line 5?", ["Line 6 is about something not true now; line 5 is about something possible.", "They mean exactly the same.", "“Wish” is only for the past."], 0, "Wish = tidak nyata; hope = mungkin.", { passageId: LETTER.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp9-c8-post",
    title: "Chapter 8 Posttest",
    passPercent: 70,
    passages: [LETTER],
    questions: [
      pick("smp9-c8-post1", "I wish I ___ more time to finish the project.", ["had", "have", "will have", "having"], 0, "Wish + past."),
      listen("smp9-c8-post2", voice("I hope you enjoy your new school, and I hope we'll meet again during the holidays."), "Listen. What does the speaker hope?", ["that they will meet again in the holidays", "that they never meet again", "that the school closes", "that the holidays are cancelled"], 0, "Meet again during the holidays."),
      trPick("smp9-c8-post3", "“Aku berharap kamu lulus.” in English is…", ["I hope you pass.", "I wish you passed.", "I hope you passed yesterday.", "I wish you pass."], 0, "Harapan nyata → hope."),
      pick("smp9-c8-post4", "She avoided ___ the question.", ["answering", "to answer", "answer", "answered"], 0, "Avoid + -ing."),
      arrange("smp9-c8-post5", "Put the words in order.", "I'm looking forward to meeting new friends", "Look forward to + -ing."),
      pick("smp9-c8-post6", "What type of school has the writer applied to?", ["a vocational school (SMK)", "a general high school", "a boarding school", "a university"], 0, "Baris 3.", { passageId: LETTER.id }),
      match("smp9-c8-post7", "Match the sentence and its meaning.", [["I hope it rains.", "It may rain; I want it."], ["I wish it rained.", "It isn't raining; I want it."], ["I wish it had rained.", "It didn't rain; I regret it."]], "Hope vs wish."),
      fill("smp9-c8-post8", "Complete: I've decided ___ (join) the debate club.", "I've decided", "the debate club.", ["to join"], "Decide + to."),
      pick("smp9-c8-post9", "What is the main purpose of the letter?", ["to record hopes and give advice to the writer's future self", "to apply for a job", "to complain about school", "to invite friends"], 0, "Surat untuk diri di masa depan.", { passageId: LETTER.id, hots: true }),
      pick("smp9-c8-post10", "Which value is shown most in line 7?", ["gratitude", "jealousy", "laziness", "pride"], 0, "Ingat orang yang membantu.", { passageId: LETTER.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Next Stop: Senior High!",
    questions: [
      live("smp9-c8-live1", "I hope you ___ well.", ["get", "got", "had got", "getting"], 0, "medicine"),
      live("smp9-c8-live2", "I wish I ___ taller.", ["were", "am", "be", "will be"], 0, "boy"),
      live("smp9-c8-live3", "enjoy + …", ["-ing", "to + verb", "verb", "-ed"], 0, "happy"),
      live("smp9-c8-live4", "“SMK” =", ["vocational school", "junior high", "kindergarten", "university"], 0, "technician", true),
      live("smp9-c8-live5", "decide + …", ["to + verb", "-ing", "-ed", "-s"], 0, "target"),
      live("smp9-c8-live6", "Regret: I wish I ___ studied.", ["had", "have", "has", "was"], 0, "sad"),
      live("smp9-c8-live7", "look forward to ___", ["seeing", "see", "saw", "seen"], 0, "eye"),
      live("smp9-c8-live8", "Letter closing:", ["Love,", "Dear,", "Hello,", "Title:"], 0, "envelope"),
    ],
  },
};
