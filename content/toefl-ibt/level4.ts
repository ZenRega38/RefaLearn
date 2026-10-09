import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { audio, examples, fill, listen, live, match, pick, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, writing } from "../kit";

// TOEFL iBT (2026 format) — Level 4: Lectures and Deeper Reading.

const SOIL: Passage = {
  id: "ibt4-soil",
  title: "Terra Preta: The Dark Earth of the Amazon",
  lines: [
    "Most soils in the Amazon rainforest are surprisingly poor. Heavy rainfall washes nutrients away, and the lush vegetation depends on a rapid recycling of organic matter rather than on rich ground.",
    "It was therefore puzzling when researchers discovered patches of extraordinarily fertile dark soil, known as terra preta, scattered along Amazonian rivers.",
    "Analysis revealed that terra preta contains large amounts of charcoal, along with fragments of pottery, bones and food waste. These materials strongly suggest that the soil was created, at least in part, by human activity.",
    "Archaeologists now believe that indigenous communities produced terra preta over centuries, possibly by burning organic waste at low temperatures, a process that creates a stable form of charcoal often called biochar.",
    "This finding has challenged the long-held view that the Amazon could support only small, scattered populations. If people were able to improve the soil on such a scale, larger and more permanent settlements may have existed than was previously assumed.",
    "Today, agricultural scientists are studying biochar as a way to improve degraded soils elsewhere, and even to store carbon that would otherwise contribute to climate change.",
  ],
};

export const IBT4: Level = {
  id: "ibt-l4",
  title: "Level 4 — Lectures and Deeper Reading",
  description: "Follow academic talks and identify the speaker's purpose and attitude, read challenging passages for inference and organisation, write discussion posts that address counterarguments, and refine pronunciation for longer sentences.",
  targetScore: "Target Band 4.5–5.0",
  cover: ["teacher-woman", "leaf", "microphone"],
  pretest: {
    id: "ibt-l4-pre",
    title: "Level 4 Pretest",
    passPercent: 0,
    questions: [
      listen("ibt-l4-pre1", voice("Now, this is where it gets interesting. The researchers expected the opposite result."), "Listen. Why does the speaker say “this is where it gets interesting”?", ["to highlight an unexpected finding", "to end the lecture", "to tell a joke", "to give homework"], 0, "Menandai temuan penting."),
      pick("ibt-l4-pre2", "“The professor mentions X in order to…” asks about the speaker's…", ["purpose", "accent", "age", "favourite topic"], 0, "Tujuan."),
      trPick("ibt-l4-pre3", "“Tanah yang terdegradasi” in English is…", ["degraded soil", "degree soil", "decorated ground", "downgraded earth line"], 0, "Degraded soil."),
      pick("ibt-l4-pre4", "Which word signals the writer is not completely certain?", ["suggest", "prove", "always", "definitely"], 0, "Suggest = hedging."),
      pick("ibt-l4-pre5", "In a strong discussion post, a counterargument is…", ["acknowledged and then answered", "ignored", "copied", "insulted"], 0, "Akui lalu jawab."),
    ],
  },
  lessons: [
    {
      id: "ibt-l4-l1",
      skill: "listening",
      title: "Listen to an Academic Talk",
      summary: "Main topic, key examples, the speaker's purpose and attitude in a short lecture.",
      sections: [
        {
          title: "Lecture signals",
          blocks: [
            table(["Signal", "Meaning"], [["Today we'll look at…", "topic"], ["Take, for example,…", "example (often tested)"], ["Now, this is where it gets interesting…", "important or surprising point"], ["You might think… but actually…", "correcting a common belief"], ["I'm not entirely convinced…", "speaker's attitude: doubt"]]),
            pics([["teacher-woman", "lecturer"], ["leaf", "biology"], ["earth", "environment"], ["owl-think", "attitude"]]),
          ],
        },
        {
          title: "Practice talk",
          blocks: [
            audio("Talk: Why do some leaves change colour?", say(["woman", "Today we'll look at why the leaves of some trees change colour before they fall. You might think the red and yellow colours are produced in autumn, but actually, the yellow pigments are there all summer. They're simply hidden by green chlorophyll. As days shorten, trees stop producing chlorophyll, and the yellow becomes visible. Now, this is where it gets interesting: red pigments are different. Trees actively produce them in autumn, which costs energy. Why would a tree spend energy on leaves it's about to drop? One theory is that red pigments act like sunscreen, protecting the leaf while the tree pulls nutrients back into its branches. Personally, I find this theory convincing, although other researchers think red leaves may warn insects that the tree is well defended."])),
            tryIt(pick("ibt-l4-l1-try", "What common belief does the professor correct?", ["that yellow pigments are produced only in autumn", "that leaves fall in autumn", "that chlorophyll is green", "that trees need sunlight"], 0, "You might think … but actually.")),
          ],
        },
      ],
      checkpoint: [
        pick("ibt-l4-l1-c1", "What is the talk mainly about?", ["why leaves change colour before falling", "how to plant trees", "the life cycle of insects", "types of sunscreen"], 0, "Topik."),
        pick("ibt-l4-l1-c2", "Why are red pigments described as puzzling?", ["Trees spend energy making them just before dropping the leaves.", "They appear in summer.", "They are poisonous.", "They are rare."], 0, "Biaya energi."),
        pick("ibt-l4-l1-c3", "According to one theory, what do red pigments do?", ["protect the leaf like sunscreen while nutrients are removed", "attract birds", "make leaves heavier", "produce chlorophyll"], 0, "Teori sunscreen."),
        pick("ibt-l4-l1-c4", "What is the professor's attitude toward the sunscreen theory?", ["She finds it convincing.", "She rejects it.", "She has never heard of it.", "She thinks it is a joke."], 0, "Personally, I find this convincing."),
        listen("ibt-l4-l1-c5", voice("Take, for example, the maple trees of Canada."), "Why does the speaker say this?", ["to introduce an example", "to change the topic", "to summarise"], 0, "Penanda contoh."),
        pick("ibt-l4-l1-c6", "Why does the professor mention the insect theory at the end?", ["to show that there is more than one explanation", "to prove the sunscreen theory wrong", "to introduce a new course", "to give homework"], 0, "Menunjukkan teori alternatif.", { hots: true }),
      ],
    },
    {
      id: "ibt-l4-l2",
      skill: "reading",
      title: "Deeper Reading: Inference and Organisation",
      summary: "Following an argument across paragraphs, hedged claims and implications of findings.",
      passages: [SOIL],
      sections: [
        {
          title: "The passage",
          blocks: [
            { type: "passage", passage: SOIL },
            vocab([["lush", "lebat/subur", "tree"], ["puzzling", "membingungkan", "question"], ["charcoal", "arang", "trash"], ["challenge (a view)", "menggugat (pandangan)", "owl-think"], ["degraded", "rusak/terdegradasi", "earth"]], "Key vocabulary"),
          ],
        },
        {
          title: "Following the argument",
          blocks: [
            table(["Paragraph", "Function"], [["1", "background: Amazon soils are poor"], ["2", "a puzzle: fertile dark soil"], ["3", "evidence: charcoal, pottery, bones"], ["4", "explanation: created by people (biochar)"], ["5", "implication: larger populations than assumed"], ["6", "modern application"]]),
            tip("Kata seperti **strongly suggest**, **possibly**, **may have** menunjukkan tingkat kepastian. Soal sering menguji apakah Anda membedakan **fakta** dan **dugaan**."),
            tryIt(pick("ibt-l4-l2-try", "Why was terra preta puzzling to researchers?", ["Most Amazon soils are poor, yet these patches were very fertile.", "It was found in deserts.", "It contained gold.", "It was very recent."], 0, "Kontras paragraf 1–2.", { passageId: SOIL.id })),
          ],
        },
      ],
      checkpoint: [
        pick("ibt-l4-l2-c1", "According to paragraph 1, why are Amazon soils poor?", ["Heavy rainfall washes nutrients away.", "There are too many animals.", "The climate is dry.", "People have farmed them for centuries."], 0, "Paragraf 1.", { passageId: SOIL.id }),
        pick("ibt-l4-l2-c2", "Which evidence suggests terra preta was made by people?", ["pottery fragments and food waste", "volcanic ash", "river sand", "fossilised trees"], 0, "Paragraf 3.", { passageId: SOIL.id }),
        pick("ibt-l4-l2-c3", "The word “scattered” in paragraph 2 is closest in meaning to", ["spread out", "hidden", "connected", "washed"], 0, "Scattered = tersebar.", { passageId: SOIL.id }),
        pick("ibt-l4-l2-c4", "What does paragraph 5 imply about earlier views of the Amazon?", ["They underestimated its past population.", "They were completely accurate.", "They focused on soil only.", "They were based on biochar."], 0, "Implikasi.", { passageId: SOIL.id }),
        fill("ibt-l4-l2-c5", "Complete: The stable charcoal produced by low-temperature burning is often called ___ .", "The stable charcoal produced by low-temperature burning is often called", ".", ["biochar"], "Paragraf 4.", { passageId: SOIL.id }),
        pick("ibt-l4-l2-c6", "Which statement from the passage is presented as a possibility rather than a certainty?", ["larger and more permanent settlements may have existed", "most soils in the Amazon are poor", "terra preta contains large amounts of charcoal", "researchers discovered patches of dark soil"], 0, "May have = kemungkinan.", { passageId: SOIL.id, hots: true }),
      ],
    },
    {
      id: "ibt-l4-l3",
      skill: "writing",
      title: "Academic Discussion: Handling Counterarguments",
      summary: "Writing posts that recognise another view and respond convincingly.",
      sections: [
        {
          title: "The task",
          blocks: [
            text("**Professor Halim:** Many universities now record lectures and post them online. Some educators worry that this reduces attendance and engagement. Others believe recordings help students learn more effectively. Should universities record all lectures? Why or why not?"),
            text("**Ayu:** Recordings are great because I can re-watch difficult parts before exams."),
            text("**Bayu:** But if everything is recorded, many students will just stop coming to class, and discussions will suffer."),
          ],
        },
        {
          title: "Concede and respond",
          blocks: [
            table(["Move", "Language"], [["Concede", "Bayu is right that… / It's true that…"], ["Respond", "However, this could be solved by… / Even so, …"], ["Support", "Research on… suggests… / In my experience, …"], ["Conclude", "So, on balance, …"]]),
            examples([{ right: "It's true that some students may skip class, as Bayu points out. However, universities could make recordings available only after the lecture and keep in-class activities that count towards grades." }], "Concession + response"),
            writing({
              id: "ibt-l4-l3-write",
              title: "Discussion post with counterargument",
              prompt: "Respond to Professor Halim. State your opinion, respond to one classmate's point (agreeing or disagreeing), and include a counterargument with your answer to it. Write at least 120 words.",
              image: "laptop",
              minWords: 120,
              maxWords: 190,
              tips: ["In my view, universities should …", "It's true that …, as Bayu points out. However, …", "For example, …", "So, on balance, …"],
              models: [{ label: "Band 6 model", text: "In my view, universities should record lectures, but with some conditions. Ayu's point about reviewing difficult material is important, especially for students whose first language isn't English or who work part-time.\nIt's true that recordings might encourage some students to skip class, as Bayu points out. However, this risk can be reduced if lectures become more interactive. If part of each session involves problem-solving in groups or short quizzes that count towards the final grade, students will still have a strong reason to attend.\nFor example, my older sister's university records every lecture but awards participation marks for in-class discussions, and attendance there remains high.\nSo, on balance, recordings are a valuable support tool, provided they complement rather than replace active learning in the classroom." }],
              rubric: ["I stated a clear opinion.", "I responded to a classmate's idea.", "I acknowledged a counterargument and answered it.", "I supported my view with an example.", "My writing was coherent and accurate."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("ibt-l4-l3-c1", "Which sentence concedes a point?", ["It's true that some students may skip class.", "Recordings are perfect.", "Bayu is wrong about everything."], 0, "Konsesi."),
        pick("ibt-l4-l3-c2", "Which sentence responds after a concession?", ["However, this could be solved by giving marks for participation.", "And that's it.", "So I don't know."], 0, "Tanggapan."),
        fill("ibt-l4-l3-c3", "Complete: ___ balance, recordings are a useful tool.", "", "balance, recordings are a useful tool.", ["On", "on"], "On balance."),
        match("ibt-l4-l3-c4", "Match the move and the phrase.", [["concede", "It's true that…"], ["respond", "However, …"], ["support", "In my experience, …"], ["conclude", "So, on balance, …"]], "Struktur."),
        trPick("ibt-l4-l3-c5", "“Asalkan rekaman melengkapi, bukan menggantikan, kelas” in English is…", ["provided that recordings complement rather than replace classes", "provide recordings complement replace classes", "if recordings replace and complement"], 0, "Provided that … rather than …"),
        pick("ibt-l4-l3-c6", "Why does addressing a counterargument strengthen your post?", ["It shows you considered other views and makes your position more convincing.", "It makes the post longer only.", "It changes your opinion."], 0, "Kekuatan argumen.", { hots: true }),
      ],
    },
    {
      id: "ibt-l4-l4",
      skill: "speaking",
      title: "Pronunciation for Longer Sentences",
      summary: "Thought groups, linking, intonation and stress in longer Listen and Repeat sentences.",
      sections: [
        {
          title: "Thought groups and intonation",
          blocks: [
            table(["Feature", "Example"], [["Thought groups", "If you need help / with your application, / visit the student centre / on the ground floor."], ["Linking", "visit_it, pick_up, an_hour"], ["Falling intonation", "statements: The office closes at five. ↘"], ["Rising intonation", "yes/no questions: Is it open today? ↗"], ["Contrast stress", "The meeting is on TUESDAY, not Thursday."]]),
            tip("Untuk kalimat panjang, ingat **makna per kelompok kata**, bukan kata satu per satu. Kelompok makna membantu memori dan irama alami."),
          ],
        },
        {
          title: "Practice",
          blocks: [
            repeat(["If you need help with your application, visit the student centre on the ground floor.", "The shuttle bus leaves every twenty minutes from the main gate.", "Students who missed the orientation can watch the recording online.", "The meeting is on Tuesday, not Thursday."]),
            speaking({
              id: "ibt-l4-l4-say",
              title: "Repeat longer sentences",
              prompt: "Repeat each of the four sentences after hearing it once. Mark the thought groups first, then focus on linking and the final falling intonation.",
              image: "headset",
              seconds: 75,
              tips: ["Pause briefly between thought groups.", "Stress the key content words.", "Let your voice fall at the end of statements."],
              models: [{ label: "Thought groups", text: "If you need help / with your application, / visit the student centre / on the ground floor. ↘ — The shuttle bus leaves / every twenty minutes / from the main gate. ↘ — Students who missed the orientation / can watch the recording online. ↘ — The meeting is on TUESDAY, / not Thursday. ↘" }],
              rubric: ["I repeated all words accurately.", "I paused at natural thought groups.", "I linked words smoothly.", "My intonation fell at the end of statements.", "I stressed contrasting words correctly."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("ibt-l4-l4-c1", voice("The meeting is on Tuesday, not Thursday."), "Which word carries contrast stress?", ["Tuesday", "meeting", "is"], 0, "Contrast stress."),
        pick("ibt-l4-l4-c2", "Which shows natural thought groups?", ["The shuttle bus leaves / every twenty minutes / from the main gate.", "The / shuttle bus leaves every / twenty minutes from / the main gate.", "The shuttle / bus / leaves / every / twenty / minutes."], 0, "Kelompok makna."),
        pick("ibt-l4-l4-c3", "What intonation is usual at the end of a yes/no question?", ["rising", "falling", "flat"], 0, "Intonasi naik untuk yes/no question."),
        match("ibt-l4-l4-c4", "Match the phrase and how it is linked.", [["pick up", "pick_up"], ["an hour", "an_hour"], ["visit it", "visit_it"], ["turn on", "turn_on"]], "Linking."),
        trPick("ibt-l4-l4-c5", "“Intonasi turun” in English is…", ["falling intonation", "down tone fall", "low intonation drop"], 0, "Falling intonation."),
        pick("ibt-l4-l4-c6", "Why do thought groups help in Listen and Repeat?", ["They let you remember meaning chunks and keep a natural rhythm.", "They make sentences shorter.", "They remove difficult words."], 0, "Manfaat thought groups.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ibt-l4-post",
    title: "Level 4 Practice Test",
    passPercent: 70,
    passages: [SOIL],
    questions: [
      listen("ibt-l4-post1", say(["man", "You might assume that deserts are lifeless, but actually they support a remarkable variety of plants and animals."]), "What does the professor want to correct?", ["the idea that deserts have little life", "the idea that deserts are hot", "the idea that animals avoid water", "the idea that plants need sun"], 0, "You might assume … but actually."),
      listen("ibt-l4-post2", say(["woman", "Some scientists argue that the climate changed suddenly. Frankly, I find the evidence for a gradual change much stronger."]), "What is the professor's attitude?", ["She favours the gradual-change explanation.", "She favours the sudden-change explanation.", "She has no opinion.", "She thinks climate never changes."], 0, "Sikap pembicara.", { hots: true }),
      pick("ibt-l4-post3", "What is the main idea of the passage?", ["Fertile Amazon soils were likely created by people, changing views of the past.", "Amazon soils are naturally rich.", "Charcoal damages soil.", "Rainfall improves soil fertility."], 0, "Gagasan utama.", { passageId: SOIL.id }),
      pick("ibt-l4-post4", "The word “stable” in paragraph 4 is closest in meaning to", ["long-lasting", "dangerous", "liquid", "temporary"], 0, "Stable = tahan lama.", { passageId: SOIL.id }),
      pick("ibt-l4-post5", "Why does the author mention climate change in paragraph 6?", ["to show a modern benefit of studying biochar", "to explain why Amazon soils are poor", "to criticise farmers", "to describe ancient weather"], 0, "Aplikasi modern.", { passageId: SOIL.id, hots: true }),
      pick("ibt-l4-post6", "Which is NOT mentioned as found in terra preta?", ["metal tools", "charcoal", "pottery", "bones"], 0, "Alat logam tidak disebut.", { passageId: SOIL.id }),
      pick("ibt-l4-post7", "Which discussion sentence concedes and responds?", ["It's true that costs are high; however, the long-term savings outweigh them.", "Costs are high.", "I disagree completely."], 0, "Konsesi + tanggapan."),
      pick("ibt-l4-post8", "Which phrase concludes a post?", ["So, on balance, …", "Take, for example, …", "It's true that …", "Hello everyone, …"], 0, "Penutup."),
      listen("ibt-l4-post9", voice("Students who missed the orientation can watch the recording online."), "Which sentence did you hear?", ["Students who missed the orientation can watch the recording online.", "Students who missed orientation can watch recording online.", "Students missing orientation watch online the recording.", "The students can watch the orientation recording later online."], 0, "Akurasi."),
      pick("ibt-l4-post10", "Which word should be stressed in “I said the RED folder, not the blue one”?", ["red", "said", "folder", "not"], 0, "Contrast stress."),
    ],
  },
  live: {
    title: "Live Quiz — Lecture Hall",
    questions: [
      live("ibt-l4-live1", "“You might think… but actually…” =", ["correcting a belief", "giving an example", "ending", "greeting"], 0, "teacher-woman"),
      live("ibt-l4-live2", "Terra preta contains lots of…", ["charcoal", "sand", "gold", "plastic"], 0, "leaf"),
      live("ibt-l4-live3", "Hedging word:", ["possibly", "certainly", "always", "never"], 0, "owl-think"),
      live("ibt-l4-live4", "“Arang” =", ["charcoal", "chalk", "coal mine", "charm"], 0, "trash", true),
      live("ibt-l4-live5", "Yes/no question intonation:", ["rising", "falling", "flat", "silent"], 0, "question"),
      live("ibt-l4-live6", "Concession phrase:", ["It's true that…", "For example…", "Finally…", "Hello…"], 0, "hand"),
      live("ibt-l4-live7", "Red leaves may act like…", ["sunscreen", "food", "water", "glue"], 0, "hot"),
      live("ibt-l4-live8", "Thought groups = chunks of…", ["meaning", "letters", "numbers", "silence"], 0, "chat"),
    ],
  },
};
