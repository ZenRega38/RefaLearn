import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, say, speaking, table, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Bahasa Inggris Tingkat Lanjut (Fase F). Chapter 3 — The Craft of Fiction · Chapter 4 — Thinking Critically

const OPENING: Passage = {
  id: "adv-c3-opening",
  title: "Two Openings of the Same Story",
  pic: "pencil",
  lines: [
    "Version A: Sari was very nervous about her first day at the new school. She was scared that nobody would like her. The school was big and noisy.",
    "Version B: The school gate was taller than Sari had imagined, painted a green so bright it hurt her eyes.",
    "She pressed her thumbnail into the strap of her backpack until it left a small, white moon.",
    "Somewhere behind the gate, a bell rang, and four hundred voices rose at once like birds startled from a tree.",
    "“You'll be fine,” her mother had said that morning, in the voice she used for things that were not fine.",
    "Sari counted the steps to the entrance. Twenty-three. At twenty-four, someone said her name.",
  ],
};

export const CH3: Level = {
  id: "adv-ch3",
  title: "Chapter 3 — The Craft of Fiction",
  description: "Learn the craft of fiction writing: show don't tell, sensory detail, point of view, dialogue, pacing and openings; workshop and write a polished short story.",
  targetScore: "Writing · Reading · Speaking",
  cover: ["pencil", "book", "owl-think"],
  pretest: {
    id: "adv-c3-pre",
    title: "Chapter 3 Pretest",
    passPercent: 0,
    questions: [
      pick("adv-c3-pre1", "Which sentence SHOWS rather than TELLS that a character is nervous?", ["His hands were shaking as he opened the envelope.", "He was nervous.", "He felt very nervous indeed.", "Nervousness was his feeling."], 0, "Show, don't tell."),
      listen("adv-c3-pre2", voice("I could smell the clove cigarettes and hear the call to prayer drifting over the rooftops."), "Listen. Which senses does the writer use?", ["smell and hearing", "taste and touch", "sight only", "no senses"], 0, "Detail indera."),
      trPick("adv-c3-pre3", "“Tempo cerita” (fast or slow) in English is…", ["pacing", "placing", "pressing", "passing"], 0, "Pacing."),
      pick("adv-c3-pre4", "Which punctuation is correct?", ["“I'm leaving,” she said.", "“I'm leaving” she said.", "I'm leaving, “she said.”", "“I'm leaving”, she said"], 0, "Koma di dalam tanda petik (gaya umum)."),
      pick("adv-c3-pre5", "A strong first line of a story should…", ["make the reader curious", "explain the whole plot", "list all the characters", "give the moral"], 0, "Hook = pemikat pembaca."),
    ],
  },
  lessons: [
    {
      id: "adv-c3-l1",
      skill: "reading",
      title: "Show, Don't Tell",
      summary: "Comparing a telling opening with a showing opening; sensory detail and implied emotion.",
      passages: [OPENING],
      sections: [
        {
          title: "Two versions",
          blocks: [
            { type: "passage", passage: OPENING },
            table(["Version A (telling)", "Version B (showing)"], [["states feelings directly: nervous, scared", "reveals feelings through actions: thumbnail pressed into the strap"], ["general description: big and noisy", "specific sensory details: bright green gate, four hundred voices"], ["no imagery", "simile: like birds startled from a tree"], ["flat", "creates suspense: someone said her name"]]),
          ],
        },
        {
          title: "Techniques",
          blocks: [
            table(["Technique", "Example"], [["Physical reaction", "Her throat tightened. (instead of: She was sad.)"], ["Specific detail", "a cracked blue bowl (instead of: an old bowl)"], ["Sensory language", "the sour smell of the gutter after rain"], ["Dialogue with subtext", "“You'll be fine,” in the voice she used for things that were not fine."], ["Strong verbs", "She stumbled / dragged / darted (instead of: walked)"]]),
            tip("Kamu tetap boleh “tell” untuk hal kecil yang perlu cepat. Gunakan “show” untuk **momen penting secara emosional**."),
            tryIt(pick("adv-c3-l1-try1", "In Version B, what shows that Sari is nervous?", ["She pressed her thumbnail into her backpack strap.", "The gate was green.", "A bell rang."], 0, "Baris 3.", { passageId: OPENING.id })),
          ],
        },
      ],
      checkpoint: [
        pick("adv-c3-l1-c1", "What does the “small, white moon” refer to?", ["the mark left by her thumbnail", "the real moon", "a school badge"], 0, "Baris 3: metafora visual.", { passageId: OPENING.id }),
        pick("adv-c3-l1-c2", "What are the voices compared to?", ["birds startled from a tree", "waves", "thunder"], 0, "Baris 4: simile.", { passageId: OPENING.id }),
        fill("adv-c3-l1-c3", "Complete.", "Sari counted the steps to the entrance. Twenty-three. At", ", someone said her name.", ["twenty-four", "Twenty-four"], "Baris 6.", { passageId: OPENING.id }),
        pickMany("adv-c3-l1-c4", "Choose ALL the “telling” words in Version A.", ["very nervous", "scared", "big and noisy", "white moon"], [0, 1, 2], "Baris 1.", { passageId: OPENING.id }),
        pick("adv-c3-l1-c5", "What does line 5 reveal about Sari's mother?", ["She was also worried but tried to hide it.", "She was angry.", "She didn't care."], 0, "Subteks dialog.", { passageId: OPENING.id, hots: true }),
        pick("adv-c3-l1-c6", "Why does Version B end with “someone said her name”?", ["to create suspense and make readers continue", "to explain the moral", "to end the story"], 0, "Hook/suspense.", { passageId: OPENING.id, hots: true }),
      ],
    },
    {
      id: "adv-c3-l2",
      skill: "writing",
      title: "Point of View, Dialogue and Pacing",
      summary: "Choosing a narrator, writing natural dialogue and controlling the speed of a story.",
      sections: [
        {
          title: "Point of view and dialogue",
          blocks: [
            table(["POV", "Strength", "Limitation"], [["First person (I)", "intimate, emotional", "only knows what the narrator knows"], ["Third limited (she/he)", "close but flexible", "one character's mind at a time"], ["Third omniscient", "sees everything", "can feel distant"], ["Second person (you)", "unusual, immersive", "hard to sustain"]]),
            examples([{ right: "“Are you coming?” Dimas asked.", note: "Tanda tanya di dalam petik; asked huruf kecil." }, { right: "“I don't know,” she said. “Maybe.”" }, { right: "New speaker → new paragraph." }, { wrong: "“Hello, how are you, I am fine, thank you, and you?”", right: "“Hey.” / “Hey. You okay?”", note: "Dialog alami lebih singkat." }], "Dialogue rules"),
          ],
        },
        {
          title: "Pacing",
          blocks: [
            table(["To slow down (important moments)", "To speed up (action, transitions)"], [["longer sentences, sensory detail", "short sentences, fragments"], ["thoughts and reflections", "strong verbs, little description"], ["description of small actions", "summary: “Three weeks passed.”"]]),
            audio("A fast-paced passage", say(["narrator", "The ferry lurched. Someone screamed. Water slapped the deck. Wayan grabbed the rail, missed, grabbed again. The orange rolled away. He didn't chase it."])),
            tryIt(pick("adv-c3-l2-try1", "How does the writer create speed in the passage?", ["short sentences and strong verbs", "long descriptions", "many adjectives"], 0, "Kalimat pendek.")),
            pics([["ship", "action"], ["clock", "time jumps"], ["eye", "detail"], ["owl-think", "reflection"]]),
          ],
        },
      ],
      checkpoint: [
        listen("adv-c3-l2-c1", voice("Three years passed. The village grew; the river shrank."), "Listen. What pacing technique is used?", ["summary to speed up time", "slow-motion detail", "dialogue"], 0, "Ringkasan waktu."),
        pick("adv-c3-l2-c2", "Which POV lets the reader know only one character's thoughts but uses “she”?", ["third-person limited", "first person", "third-person omniscient"], 0, "Third limited."),
        pick("adv-c3-l2-c3", "Which dialogue is punctuated correctly?", ["“Wait!” she shouted.", "“Wait!” She shouted.", "“Wait” she shouted!"], 0, "Huruf kecil setelah tanda seru dalam petik."),
        fill("adv-c3-l2-c4", "Complete: When a new character speaks, start a new ___ .", "When a new character speaks, start a new", ".", ["paragraph", "line"], "Aturan dialog."),
        trPick("adv-c3-l2-c5", "“Kata kerja yang kuat” in English is…", ["strong verbs", "hard verbs", "powerful adverbs"], 0, "Strong verbs."),
        pick("adv-c3-l2-c6", "A character receives terrible news. Which pacing is best for this moment?", ["slow down with physical detail and silence", "skip it in one word", "add a long weather report"], 0, "Momen emosional diperlambat.", { hots: true }),
      ],
    },
    {
      id: "adv-c3-l3",
      skill: "speaking",
      title: "Writing Workshop",
      summary: "Drafting, peer feedback and revising a short story.",
      sections: [
        {
          title: "Giving feedback",
          blocks: [
            table(["Feedback stage", "Useful phrases"], [["Praise (specific)", "The image of … really worked for me because …"], ["Question", "I wasn't sure why … Could you clarify …?"], ["Suggestion", "You might consider … / What if … ?"], ["Overall", "The strongest part is … The part to develop is …"]]),
            warn("Umpan balik yang baik fokus pada **tulisan**, bukan penulisnya, dan memberi **saran konkret**."),
            speaking({
              id: "adv-c3-l3-say",
              title: "Peer feedback",
              prompt: "Read a classmate's draft (or Version A of the opening) and give one minute of constructive feedback: one specific strength, one question and two concrete suggestions.",
              image: "chat",
              prepSeconds: 60,
              seconds: 75,
              tips: ["What really worked for me was …", "I was curious about …", "You might consider showing … instead of telling …", "What if you started with …?"],
              models: [{ label: "Feedback on Version A", text: "What really worked for me is that the situation is clear: a first day at a new school is something everyone understands. I was curious about Sari herself. What does she look like? What is she holding? You might consider showing her nerves through an action, like fiddling with her bag strap, instead of saying “she was very nervous”. And what if you started with a specific detail of the school, like the colour of the gate, to pull the reader in?" }],
              rubric: ["I gave a specific strength.", "I asked a genuine question.", "My suggestions were concrete and kind.", "I used feedback language appropriately."],
            }),
          ],
        },
        {
          title: "Your story",
          blocks: [
            writing({
              id: "adv-c3-l3-write",
              title: "A short story",
              prompt: "Write a complete short story (600 words maximum) about a moment of change in a young person's life. Use a hooking first line, a consistent point of view, show-don't-tell, natural dialogue, varied pacing and a meaningful ending.",
              image: "pencil",
              minWords: 350,
              maxWords: 600,
              tips: ["Hook: start with an image, action or line of dialogue.", "One main character, one main conflict.", "Show emotion through actions and details.", "Slow down at the turning point.", "End with an image, not a moral lecture."],
              models: [{ label: "Example (opening and turning point)", text: "My father's motorbike had a dent shaped like Sumatra, and every morning he rode it to the market before the call to prayer.\nI was the one who caused the dent. I was nine, and I wanted to prove I could ride it. I couldn't. He never got it fixed.\n…\nThe night before I left for university, I found him in the garage, polishing the dented fuel tank with an old T-shirt.\n“You should fix that,” I said.\nHe kept polishing. The cloth made small circles over the island-shaped scar, slowly, as if he were tracing a map.\n“Why would I fix the only part that has you in it?” he said.\nI didn't answer. I picked up the other end of the T-shirt, and we polished it together until the dent shone." }],
              rubric: ["My first line hooks the reader.", "I used a consistent point of view.", "I showed emotions through action, detail and dialogue.", "My pacing slows down at the key moment.", "My ending is meaningful without stating a moral directly."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("adv-c3-l3-c1", "In the model story, why didn't the father fix the dent?", ["It reminded him of his child.", "He had no money.", "He didn't notice it."], 0, "Simbol kasih sayang."),
        pick("adv-c3-l3-c2", "Which feedback is the most helpful?", ["You might show her fear by describing her hands.", "It's bad.", "I don't like it."], 0, "Saran konkret."),
        arrange("adv-c3-l3-c3", "Put the words in order.", "What really worked for me was the opening image", "Pujian spesifik."),
        fill("adv-c3-l3-c4", "Complete: You might ___ showing her anger through action.", "You might", "showing her anger through action.", ["consider"], "Consider + -ing."),
        trPick("adv-c3-l3-c5", "“Draf pertama” in English is…", ["first draft", "first drift", "first drawing"], 0, "First draft."),
        pick("adv-c3-l3-c6", "Why do good stories often end with an image rather than a stated moral?", ["Readers feel and interpret the meaning themselves.", "Morals are illegal.", "Images are shorter."], 0, "Kekuatan subteks.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "adv-c3-post",
    title: "Chapter 3 Posttest",
    passPercent: 70,
    passages: [OPENING],
    questions: [
      pick("adv-c3-post1", "Which sentence SHOWS that a character is tired?", ["He rubbed his eyes and yawned over his books.", "He was tired.", "Tiredness was his.", "He felt tired very much."], 0, "Show, don't tell."),
      listen("adv-c3-post2", voice("She ran. Faster. The gate. The road. Gone."), "Listen. What effect do the short fragments create?", ["speed and tension", "calm", "boredom", "humour only"], 0, "Pacing cepat."),
      trPick("adv-c3-post3", "“Sudut pandang orang pertama” in English is…", ["first-person point of view", "first person view of point", "one-person angle", "first viewpoint people"], 0, "First-person POV."),
      pick("adv-c3-post4", "Which is the strongest verb?", ["staggered", "went", "moved", "did"], 0, "Strong verb."),
      arrange("adv-c3-post5", "Put the words in order.", "Somewhere behind the gate a bell rang", "Kalimat pembuka adegan."),
      pick("adv-c3-post6", "What colour is the school gate in Version B?", ["bright green", "dark blue", "white", "red"], 0, "Baris 2.", { passageId: OPENING.id }),
      match("adv-c3-post7", "Match the technique and the example.", [["physical reaction", "Her throat tightened."], ["sensory detail", "the sour smell of the gutter"], ["simile", "like birds startled from a tree"], ["time summary", "Three weeks passed."]], "Teknik fiksi."),
      fill("adv-c3-post8", "Complete.", "She pressed her thumbnail into the strap of her", "until it left a small, white moon.", ["backpack"], "Baris 3.", { passageId: OPENING.id }),
      pick("adv-c3-post9", "Which version is more effective, and why?", ["Version B, because it uses specific, sensory details and implies emotion.", "Version A, because it is shorter.", "Version A, because it names the feelings.", "Both are equally effective."], 0, "Evaluasi teknik.", { passageId: OPENING.id, hots: true }),
      pick("adv-c3-post10", "What does the counting of steps (line 6) suggest about Sari?", ["She is trying to control her nerves.", "She likes maths.", "She is lost.", "She is bored."], 0, "Inferensi.", { passageId: OPENING.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Story Lab",
    questions: [
      live("adv-c3-live1", "Show, don't…", ["tell", "write", "read", "speak"], 0, "eye"),
      live("adv-c3-live2", "Fast pacing uses…", ["short sentences", "long descriptions", "many adjectives", "footnotes"], 0, "run"),
      live("adv-c3-live3", "New speaker →", ["new paragraph", "same line", "no quotation marks", "capital letters only"], 0, "chat"),
      live("adv-c3-live4", "“Draf” =", ["draft", "drift", "drag", "drip"], 0, "pencil", true),
      live("adv-c3-live5", "“She”-narrator, one mind:", ["third limited", "first person", "omniscient", "second person"], 0, "owl-think"),
      live("adv-c3-live6", "Strong verb:", ["darted", "went", "moved", "got"], 0, "bird"),
      live("adv-c3-live7", "First line goal:", ["hook the reader", "explain the moral", "list characters", "end the plot"], 0, "target"),
      live("adv-c3-live8", "Good feedback is…", ["specific and kind", "vague", "harsh", "silent"], 0, "thumbs-up"),
    ],
  },
};

const ARGUMENT: Passage = {
  id: "adv-c4-argument",
  title: "An Online Comment (with problems)",
  pic: "chat",
  lines: [
    "Everyone knows that video games are destroying our young people.",
    "My neighbour's son played games every night, and now he has failed his exams. This proves that games make students fail.",
    "Famous footballer Rizki Santoso says games are dangerous, so they must be.",
    "If we allow teenagers to play games for one hour, soon they will play for ten hours, then they will stop going to school, and finally our country will have no educated citizens.",
    "People who defend video games are probably lazy gamers themselves, so we shouldn't listen to them.",
    "Either we ban all games completely, or we accept that our children will have no future.",
    "Besides, games have been popular for more than thirty years, and crime has also increased in some cities during that time. Clearly, games cause crime.",
  ],
};

export const CH4: Level = {
  id: "adv-ch4",
  title: "Chapter 4 — Thinking Critically",
  description: "Evaluate arguments and sources, recognise logical fallacies and bias, distinguish correlation from causation, and write a reasoned critique.",
  targetScore: "Reading · Writing · Speaking",
  cover: ["owl-think", "question", "chat"],
  pretest: {
    id: "adv-c4-pre",
    title: "Chapter 4 Pretest",
    passPercent: 0,
    questions: [
      pick("adv-c4-pre1", "“You can't trust her opinion on climate change; she failed maths in school.” This attacks…", ["the person, not the argument", "the evidence", "the conclusion logically", "nothing"], 0, "Ad hominem."),
      listen("adv-c4-pre2", voice("Ice cream sales and drowning both increase in summer, so ice cream causes drowning."), "Listen. What is wrong with this reasoning?", ["It confuses correlation with causation.", "Ice cream is dangerous.", "Nothing is wrong.", "Summer is too short."], 0, "Korelasi ≠ kausalitas."),
      trPick("adv-c4-pre3", "“Kesesatan berpikir” in English is…", ["logical fallacy", "logic failure word", "thinking falling", "false logic box"], 0, "Logical fallacy."),
      pick("adv-c4-pre4", "Which source is generally most reliable for scientific claims?", ["a peer-reviewed journal", "a random blog", "a celebrity's post", "an anonymous forum"], 0, "Ditelaah sejawat."),
      pick("adv-c4-pre5", "A one-sided presentation that ignores other views shows…", ["bias", "balance", "evidence", "accuracy"], 0, "Bias = keberpihakan."),
    ],
  },
  lessons: [
    {
      id: "adv-c4-l1",
      skill: "reading",
      title: "Spotting Fallacies",
      summary: "Common fallacies: hasty generalisation, ad hominem, false authority, slippery slope, false dilemma, post hoc.",
      passages: [ARGUMENT],
      sections: [
        {
          title: "A flawed argument",
          blocks: [
            { type: "passage", passage: ARGUMENT },
            vocab([["fallacy", "kesesatan logika", "question"], ["bias", "keberpihakan/bias", "owl-think"], ["generalisation", "generalisasi", "num-10"], ["authority", "otoritas/pakar", "teacher-man"]], "Key words"),
          ],
        },
        {
          title: "Common fallacies",
          blocks: [
            table(["Fallacy", "Meaning", "Line"], [["Bandwagon", "“everyone knows/believes it” as proof", "1"], ["Hasty generalisation", "conclusion from one or few examples", "2"], ["False authority", "quoting someone who isn't an expert in this field", "3"], ["Slippery slope", "one step will lead to extreme results without evidence", "4"], ["Ad hominem", "attacking the person instead of the argument", "5"], ["False dilemma", "only two options when more exist", "6"], ["Post hoc / false cause", "A happened with/before B, so A caused B", "7"]]),
            tryIt(pick("adv-c4-l1-try1", "Which fallacy is in line 6?", ["false dilemma", "ad hominem", "bandwagon"], 0, "Hanya dua pilihan.", { passageId: ARGUMENT.id })),
          ],
        },
      ],
      checkpoint: [
        pick("adv-c4-l1-c1", "Line 2 concludes from one neighbour's son. This is…", ["hasty generalisation", "false dilemma", "slippery slope"], 0, "Baris 2.", { passageId: ARGUMENT.id }),
        pick("adv-c4-l1-c2", "Why is line 3 a false authority?", ["A footballer is not an expert on the effects of games.", "Footballers are always wrong.", "He is not famous."], 0, "Baris 3.", { passageId: ARGUMENT.id }),
        fill("adv-c4-l1-c3", "Complete.", "People who defend video games are probably lazy", "themselves.", ["gamers"], "Baris 5 (ad hominem).", { passageId: ARGUMENT.id }),
        pickMany("adv-c4-l1-c4", "Choose ALL the lines that contain a slippery slope or a false cause.", ["line 4", "line 7", "line 1", "line 3"], [0, 1], "Baris 4 dan 7.", { passageId: ARGUMENT.id }),
        pick("adv-c4-l1-c5", "What would a stronger version of the argument need?", ["reliable research evidence and consideration of other factors", "more capital letters", "more celebrity quotes"], 0, "Argumen kuat butuh bukti.", { passageId: ARGUMENT.id, hots: true }),
        pick("adv-c4-l1-c6", "Line 7: what other factors might explain rising crime?", ["poverty, unemployment, population growth", "nothing else", "only video games"], 0, "Variabel lain.", { passageId: ARGUMENT.id, hots: true }),
      ],
    },
    {
      id: "adv-c4-l2",
      skill: "listening",
      title: "Evaluating Sources and Evidence",
      summary: "The CRAAP test, types of evidence and correlation versus causation.",
      sections: [
        {
          title: "Evaluating sources",
          blocks: [
            table(["CRAAP test", "Question"], [["Currency", "Is it recent enough for the topic?"], ["Relevance", "Does it answer my question?"], ["Authority", "Who wrote it? Are they qualified?"], ["Accuracy", "Is it supported by evidence? Can it be verified?"], ["Purpose", "Is it to inform, sell, persuade or entertain? Is there bias?"]]),
            table(["Stronger evidence", "Weaker evidence"], [["large studies, peer-reviewed research", "one personal story"], ["official statistics", "rumours, viral posts"], ["multiple independent sources agree", "a single unnamed source"], ["experts in the relevant field", "celebrities outside their field"]]),
          ],
        },
        {
          title: "Correlation or causation?",
          blocks: [
            audio("A podcast extract", say(["woman", "A study found that students who eat breakfast get higher grades. Does that mean breakfast causes better grades?"], ["man", "Not necessarily. Students who eat breakfast might also have more stable family routines, more sleep, or more support at home."], ["woman", "So breakfast is correlated with grades, but other factors could be the real cause."], ["man", "Exactly. To show causation, researchers need controlled experiments, comparing similar groups where only breakfast changes."])),
            tryIt(pick("adv-c4-l2-try1", "Why can't we conclude that breakfast causes higher grades?", ["Other factors, like sleep or family support, could explain it.", "Breakfast is unhealthy.", "Grades are random."], 0, "Variabel pengganggu.")),
            pics([["question", "Who wrote it?"], ["calendar", "Is it recent?"], ["report", "What's the evidence?"], ["money", "Who benefits?"]]),
          ],
        },
      ],
      checkpoint: [
        listen("adv-c4-l2-c1", voice("This article was written by a company that sells the vitamins it recommends."), "Listen. Which part of the CRAAP test is most concerned?", ["Purpose (possible bias)", "Currency", "Relevance"], 0, "Motif komersial."),
        match("adv-c4-l2-c2", "Match the CRAAP letter and the question.", [["Currency", "Is it recent?"], ["Authority", "Who wrote it?"], ["Accuracy", "Can it be verified?"], ["Purpose", "Why was it written?"]], "CRAAP."),
        pick("adv-c4-l2-c3", "Which evidence is strongest?", ["a review of 40 studies in a medical journal", "my cousin's experience", "a viral video"], 0, "Bukti paling kuat."),
        fill("adv-c4-l2-c4", "Complete: Two things happening together is correlation, not necessarily ___ .", "Two things happening together is correlation, not necessarily", ".", ["causation"], "Kausalitas."),
        trPick("adv-c4-l2-c5", "“Ditelaah oleh sejawat” (journal) in English is…", ["peer-reviewed", "pair-reviewed", "pier-viewed"], 0, "Peer-reviewed."),
        pick("adv-c4-l2-c6", "Cities with more hospitals have more sick people. What is the most reasonable explanation?", ["Bigger populations need more hospitals and also have more sick people.", "Hospitals make people sick.", "Sick people build hospitals."], 0, "Faktor ketiga: populasi.", { hots: true }),
      ],
    },
    {
      id: "adv-c4-l3",
      skill: "writing",
      title: "Write a Critique",
      summary: "Writing a fair, reasoned response to a flawed argument.",
      sections: [
        {
          title: "Structure of a critique",
          blocks: [
            table(["Part", "Content"], [["Summary", "fairly state the writer's main claim"], ["Acknowledge", "what is reasonable or valid about the concern"], ["Analyse", "identify fallacies and weak evidence, with examples"], ["Improve", "what evidence or reasoning would be better"], ["Conclude", "your balanced judgement"]]),
            tip("Kritik yang baik bersikap **adil** (charitable): akui kekhawatiran yang sah, lalu tunjukkan kelemahan logikanya dengan tenang."),
          ],
        },
        {
          title: "Write and discuss",
          blocks: [
            writing({
              id: "adv-c4-l3-write",
              title: "A reasoned critique",
              prompt: "Write a critique of the online comment about video games. Summarise its claim fairly, acknowledge any valid concern, identify at least four fallacies with examples, and explain what a stronger argument would need.",
              image: "owl-think",
              minWords: 300,
              maxWords: 420,
              tips: ["The writer argues that …", "It is true that … / This concern is understandable because …", "However, the argument relies on several fallacies. First, …", "A stronger argument would …", "In conclusion, …"],
              models: [{ label: "Example (extract)", text: "The writer of the comment argues that video games are destroying young people and should be banned completely. This concern is understandable: excessive gaming can affect sleep and schoolwork, and many parents worry about it.\nHowever, the argument relies on several fallacies. First, it begins with a bandwagon claim, “Everyone knows…”, which assumes a belief is true simply because many people supposedly hold it. Second, it makes a hasty generalisation from one neighbour's son who failed his exams; one case cannot prove a general rule, and the boy's failure may have had other causes.\nThird, the writer cites a footballer as an authority, but a footballer is not an expert on psychology or education. Finally, the comment presents a false dilemma between banning all games and accepting that children will have “no future”, ignoring sensible middle options such as time limits and parental guidance.\nA stronger argument would use reliable research on the effects of gaming, consider other factors that influence school performance, and propose realistic solutions." }],
              rubric: ["I summarised the argument fairly.", "I acknowledged a valid concern.", "I identified at least four fallacies with clear explanations.", "I suggested how the argument could be improved.", "My tone is calm, logical and respectful."],
            }),
            speaking({
              id: "adv-c4-l3-say",
              title: "Fallacy detective",
              prompt: "Find (or invent) an advertisement, social media post or speech that uses a fallacy. Present it in one minute: what it claims, which fallacy it uses, and why the reasoning is weak.",
              image: "smartphone",
              prepSeconds: 60,
              seconds: 75,
              tips: ["This post claims that …", "It uses a … fallacy because …", "The problem is that …", "A better way to argue would be …"],
              models: [{ label: "Example", text: "This skincare advertisement claims that “9 out of 10 Indonesian celebrities use our cream, so you should too.” It uses a bandwagon fallacy, and also a false authority, because celebrities are not dermatologists. The problem is that popularity doesn't prove the cream is safe or effective. We also don't know how many celebrities were asked, or whether they were paid. A better way to argue would be to show results from independent clinical tests." }],
              rubric: ["I explained the claim clearly.", "I correctly named the fallacy.", "I explained why the reasoning is weak.", "I suggested better evidence or reasoning."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("adv-c4-l3-c1", "What should the first part of a critique do?", ["summarise the argument fairly", "insult the writer", "give a new topic"], 0, "Ringkasan adil."),
        pick("adv-c4-l3-c2", "Which middle option does the model critique suggest?", ["time limits and parental guidance", "banning computers", "ignoring the problem"], 0, "Alternatif di tengah."),
        arrange("adv-c4-l3-c3", "Put the words in order.", "However the argument relies on several fallacies", "Transisi kritik."),
        fill("adv-c4-l3-c4", "Complete: This concern is ___ because excessive gaming can affect sleep. (dapat dimengerti)", "This concern is", "because excessive gaming can affect sleep.", ["understandable"], "Mengakui kekhawatiran.", { translate: true }),
        trPick("adv-c4-l3-c5", "“Menyerang pribadi, bukan argumennya” is the fallacy called…", ["ad hominem", "bandwagon", "red herring"], 0, "Ad hominem."),
        pick("adv-c4-l3-c6", "Why should a critique acknowledge valid concerns?", ["It shows fairness and makes the critique more persuasive.", "It weakens your argument.", "It is required by law."], 0, "Sikap adil.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "adv-c4-post",
    title: "Chapter 4 Posttest",
    passPercent: 70,
    passages: [ARGUMENT],
    questions: [
      pick("adv-c4-post1", "“If we let students use calculators, they'll forget how to count, and soon no one will understand money.” This is a…", ["slippery slope", "false authority", "bandwagon", "valid argument"], 0, "Lereng licin."),
      listen("adv-c4-post2", voice("You either support this new road or you don't care about the economy."), "Listen. Which fallacy is this?", ["false dilemma", "ad hominem", "hasty generalisation", "post hoc"], 0, "Dilema palsu."),
      trPick("adv-c4-post3", "“Generalisasi yang terburu-buru” in English is…", ["hasty generalisation", "hurry general", "fast generalising", "quick general fallacy rule"], 0, "Hasty generalisation."),
      pick("adv-c4-post4", "I wore my lucky socks and we won the match, so the socks made us win. This is…", ["post hoc (false cause)", "bandwagon", "ad hominem", "false dilemma"], 0, "Sebab palsu."),
      arrange("adv-c4-post5", "Put the words in order.", "Correlation does not prove causation", "Prinsip penting."),
      pick("adv-c4-post6", "Which line attacks the people who disagree instead of their arguments?", ["line 5", "line 2", "line 4", "line 7"], 0, "Ad hominem.", { passageId: ARGUMENT.id }),
      match("adv-c4-post7", "Match the fallacy and the example.", [["bandwagon", "Millions of people use it, so it must be good."], ["false authority", "A singer says this medicine works."], ["ad hominem", "He's young, so his idea is wrong."], ["false dilemma", "Love it or leave it."]], "Fallacy."),
      fill("adv-c4-post8", "Complete.", "Either we ban all games completely, or we accept that our children will have no", ".", ["future"], "Baris 6.", { passageId: ARGUMENT.id }),
      pick("adv-c4-post9", "Which evidence would best test the claim in line 2?", ["a large study comparing exam results of students with different gaming habits, controlling for other factors", "another story about a different neighbour", "a footballer's opinion", "a poll on social media"], 0, "Bukti yang valid.", { passageId: ARGUMENT.id, hots: true }),
      pick("adv-c4-post10", "What is the overall weakness of the comment?", ["It relies on emotional claims and fallacies instead of reliable evidence.", "It is too short.", "It uses formal language.", "It mentions football."], 0, "Evaluasi umum.", { passageId: ARGUMENT.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Fallacy Hunters",
    questions: [
      live("adv-c4-live1", "Attacking the person:", ["ad hominem", "bandwagon", "post hoc", "slippery slope"], 0, "angry"),
      live("adv-c4-live2", "Only two options given:", ["false dilemma", "red herring", "straw man", "ad hominem"], 0, "question"),
      live("adv-c4-live3", "“Everyone does it!”", ["bandwagon", "false cause", "false authority", "slippery slope"], 0, "meeting"),
      live("adv-c4-live4", "“Kesesatan logika” =", ["logical fallacy", "logic fall", "false logic box", "logical failure"], 0, "owl-think", true),
      live("adv-c4-live5", "A then B, so A caused B:", ["post hoc", "ad hominem", "bandwagon", "false dilemma"], 0, "clock"),
      live("adv-c4-live6", "CRAAP: A for…", ["Authority / Accuracy", "Attitude", "Answer", "Advert"], 0, "report"),
      live("adv-c4-live7", "Strongest source:", ["peer-reviewed study", "viral post", "rumour", "meme"], 0, "open-book"),
      live("adv-c4-live8", "Together ≠ cause:", ["correlation", "causation", "conclusion", "confirmation"], 0, "target"),
    ],
  },
};
