import "server-only";
import type { Lesson, LevelQuiz, LiveQuizSet, Passage } from "@/lib/course/types";
import { audio, examples, fill, live, match, pickMany, pics, table, text, tip, tryIt, vocab, warn } from "../kit";
import { KEY, completion, mc, partA, rq, say, spokenQ, wrong } from "./helpers";

const { A } = KEY;

// Level 2 — Intermediate (target 480–520). Original content; explanations
// in Indonesian, everything the learner answers in English.

// --- Passages ---------------------------------------------------------------

const SAGO: Passage = {
  id: "l2-p-sago",
  title: "Sago",
  lines: [
    "For thousands of years, the sago palm has been a staple food source for",
    "communities in eastern Indonesia and Papua New Guinea. Unlike rice, which",
    "requires carefully irrigated fields, sago grows naturally in swampy areas",
    "where few other crops can survive. To obtain the starch, workers cut down",
    "a mature palm, split the trunk, and scrape out the soft inner pith. The",
    "pith is then washed with water, and the starch settles at the bottom of a",
    "container. A single palm can yield enough starch to feed a family for",
    "several months. In recent decades, however, many sago forests have been",
    "cleared for plantations, and younger people increasingly prefer rice.",
    "Some nutritionists worry that this shift may reduce food security, since",
    "sago does not depend on rainfall patterns as much as rice does.",
  ],
};

const COMET: Passage = {
  id: "l2-p-comet",
  title: "Comets",
  lines: [
    "Comets are small icy bodies that travel around the Sun in long, oval",
    "orbits. When a comet is far from the Sun, it is little more than a frozen",
    "mixture of dust, rock, and ice, often only a few kilometers across. As it",
    "approaches the Sun, however, the heat causes some of the ice to turn",
    "directly into gas. This gas, along with dust, forms a glowing cloud called",
    "a coma around the nucleus. Pressure from sunlight and the solar wind then",
    "pushes material away from the coma, creating one or more tails that can",
    "stretch for millions of kilometers. Interestingly, a comet's tail always",
    "points away from the Sun, regardless of the direction in which the comet",
    "is moving. Because comets contain material that has changed little since",
    "the solar system formed, scientists study them for clues about its origins.",
  ],
};

const RADIO: Passage = {
  id: "l2-p-radio",
  title: "Community Radio",
  lines: [
    "In many rural parts of Indonesia, community radio stations play a role",
    "that national broadcasters cannot. Run largely by volunteers, these small",
    "stations broadcast in local languages and focus on issues that matter to",
    "nearby villages, such as crop prices, weather warnings, and health",
    "campaigns. During natural disasters, they have proved especially valuable.",
    "After an earthquake damaged mobile phone towers in one region, a local",
    "station continued broadcasting with a generator, telling residents where",
    "to find clean water and medical help. Critics note that many stations",
    "struggle financially and lack trained staff. Nevertheless, supporters",
    "argue that their closeness to the community makes them more trusted than",
    "distant media, and that this trust can save lives in an emergency.",
  ],
};

// --- Listening ----------------------------------------------------------------

const LISTENING: Lesson[] = [
  {
    id: "l2-lis-1",
    skill: "listening",
    title: "Idioms and Expressions of Agreement",
    summary: "Common idioms in Part A and short replies that show agreement or disagreement.",
    minutes: 14,
    sections: [
      {
        title: "Idioms you will hear",
        blocks: [
          text("Part A sering memakai **idiom**: maknanya tidak bisa diterjemahkan kata per kata. Jawaban benar biasanya adalah **restatement makna idiom**, bukan kata-kata harfiahnya."),
          table(["Idiom", "Meaning"], [["a piece of cake", "very easy"], ["under the weather", "slightly sick"], ["hit the books", "study hard"], ["call it a day", "stop working for today"], ["on the same page", "in agreement / understanding each other"], ["once in a blue moon", "very rarely"], ["out of the question", "impossible"], ["take it easy", "relax / don't worry"]]),
          pics([["sick", "under the weather"], ["open-book", "hit the books"], ["clock", "call it a day"], ["thumbs-up", "a piece of cake"]]),
        ],
      },
      {
        title: "Agreement and disagreement",
        blocks: [
          table(["Expression", "Meaning"], [["So do I. / Me too.", "agreement with a positive statement"], ["Neither do I. / Me neither.", "agreement with a negative statement"], ["You can say that again.", "strong agreement"], ["I couldn't agree more.", "strong agreement"], ["I'm not so sure about that.", "polite disagreement"], ["That's not how I see it.", "disagreement"]]),
          warn("**I couldn't agree more** artinya **sangat setuju**, bukan tidak setuju. Ini jebakan klasik Part A."),
          tryIt(partA("l2-lis-1-try", [["man", "This assignment is taking forever."], ["woman", "You can say that again."]], "What does the woman mean?",
            ["She agrees that the assignment is long.", "She wants the man to repeat himself.", "She has finished the assignment.", "She didn't hear the man."], A, "You can say that again = sangat setuju.")),
        ],
      },
    ],
    checkpoint: [
      partA("l2-lis-1-c1", [["woman", "Are you coming to the party tonight?"], ["man", "I'm a bit under the weather."]], "What does the man imply?",
        ["He may not go because he feels sick.", "He likes the weather.", "He will bring an umbrella.", "He is very excited."], A, "Under the weather = kurang enak badan."),
      partA("l2-lis-1-c2", [["man", "I don't like crowded beaches."], ["woman", "Neither do I."]], "What does the woman mean?",
        ["She doesn't like crowded beaches either.", "She likes crowded beaches.", "She has never been to a beach.", "She disagrees with the man."], A, "Neither do I = saya juga tidak."),
      match("l2-lis-1-c3", "Match the idiom and its meaning.", [["once in a blue moon", "very rarely"], ["out of the question", "impossible"], ["call it a day", "stop working"], ["hit the books", "study hard"]], "Idiom umum."),
      partA("l2-lis-1-c4", [["woman", "Do you eat at that restaurant often?"], ["man", "Only once in a blue moon."]], "What does the man mean?",
        ["He rarely eats there.", "He eats there every night.", "He eats there when the moon is full.", "He has never eaten there."], A, "Once in a blue moon = sangat jarang."),
      fill("l2-lis-1-c5", "Complete the idiom: The exam was a piece of ___ .", "The exam was a piece of", ".", ["cake"], "A piece of cake = mudah."),
      partA("l2-lis-1-c6", [["man", "Should we ask for an extension on the report?"], ["woman", "That's out of the question. The deadline is fixed."]], "What does the woman mean?",
        ["An extension is impossible.", "She will ask the professor.", "The report is finished.", "She has a question."], A, "Out of the question = tidak mungkin.", ),
    ],
  },
  {
    id: "l2-lis-2",
    skill: "listening",
    title: "Suggestions, Surprise and Uncertainty",
    summary: "Recognising when a speaker suggests something, is surprised, or is unsure.",
    minutes: 14,
    sections: [
      {
        title: "Suggestions",
        blocks: [
          table(["Expression", "Function"], [["Why don't you…?", "suggestion"], ["Why not…? / How about…?", "suggestion"], ["Let's… / Shall we…?", "suggestion including the speaker"], ["You might want to…", "polite suggestion"], ["If I were you, I'd…", "advice"]]),
          tip("Jika pertanyaan berbunyi **What does the man/woman suggest?**, cari ungkapan saran. Jawaban sering diawali **-ing** (*Checking the schedule*) atau **to + verb**."),
          tryIt(partA("l2-lis-2-try", [["woman", "I can't find a quiet place to study."], ["man", "Why don't you try the reading room on the third floor?"]], "What does the man suggest?",
            ["Studying in the reading room", "Studying at home", "Going to the third class", "Buying a new book"], A, "Why don't you try… = saran.")),
        ],
      },
      {
        title: "Surprise and uncertainty",
        blocks: [
          table(["Expression", "Meaning"], [["Really? / You did? / No kidding!", "surprise: the speaker expected the opposite"], ["I can't believe…", "surprise"], ["I'm not sure. / It's hard to say.", "uncertainty"], ["It remains to be seen.", "we don't know yet"], ["I doubt it.", "probably not"]]),
          examples([{ right: "Man: “Sari got the scholarship.” Woman: “She did?” → The woman expected that Sari would NOT get it." }], "Surprise = opposite expectation"),
          audio("Practice", say(["man", "I heard the library is closing early today."], ["woman", "Is it? I was planning to study there until nine."]), true),
        ],
      },
    ],
    checkpoint: [
      partA("l2-lis-2-c1", [["man", "Rudi passed the driving test on his first try."], ["woman", "He did?"]], "What had the woman assumed?",
        ["Rudi would not pass the test.", "Rudi would pass easily.", "Rudi had a car.", "Rudi had taken the test before."], A, "Kejutan → dia mengira sebaliknya."),
      partA("l2-lis-2-c2", [["woman", "Do you think the bus will come on time?"], ["man", "I doubt it."]], "What does the man mean?",
        ["The bus will probably be late.", "The bus is always on time.", "He doesn't take the bus.", "He will drive."], A, "I doubt it = mungkin tidak."),
      partA("l2-lis-2-c3", [["man", "My laptop keeps freezing."], ["woman", "You might want to restart it."]], "What does the woman suggest?",
        ["Restarting the laptop", "Buying a new laptop", "Freezing the laptop", "Calling a technician tomorrow"], A, "You might want to = saran halus."),
      pickMany("l2-lis-2-c4", "Choose ALL the expressions that show uncertainty.", ["It's hard to say.", "It remains to be seen.", "I'm not sure.", "Definitely."], [0, 1, 2], "Definitely = yakin."),
      partA("l2-lis-2-c5", [["woman", "Who will win the election?"], ["man", "It remains to be seen."]], "What does the man mean?",
        ["Nobody knows yet.", "He saw the results.", "He will vote later.", "The election was cancelled."], A, "Belum diketahui."),
      partA("l2-lis-2-c6", [["man", "The concert was cancelled."], ["woman", "Really? I just bought tickets."]], "What can be inferred about the woman?",
        ["She didn't know the concert was cancelled.", "She cancelled the concert.", "She doesn't like concerts.", "She sold her tickets."], A, "Surprise menunjukkan dia belum tahu.", ),
    ],
  },
  {
    id: "l2-lis-3",
    skill: "listening",
    title: "Parts B and C: Conversations and Talks",
    summary: "Predicting topics from the options, listening for main ideas and details in longer audio.",
    minutes: 16,
    sections: [
      {
        title: "Strategy for longer audio",
        blocks: [
          table(["Step", "What to do"], [["Before", "Skim the options of the next questions to predict the topic."], ["First lines", "Listen for the topic (Part C usually names it early)."], ["During", "Questions usually follow the order of the talk."], ["Details", "Pay attention to numbers, names, reasons, examples."], ["Last question", "Often asks about what will happen next or what the speaker recommends."]]),
          tip("Di TOEFL ITP Anda **tidak boleh mencatat**. Latih ingatan dengan memvisualisasikan poin utama saat mendengar."),
        ],
      },
      {
        title: "Practice talk",
        blocks: [
          audio("A short talk in a geography class", say(["man", "Today I'd like to talk about why Indonesia has so many volcanoes. The country sits where several tectonic plates meet. When one plate slides beneath another, rock melts and rises as magma. This process has created more than one hundred and twenty active volcanoes across the archipelago. Although eruptions can be dangerous, volcanic soil is extremely fertile, which is why many farming communities live near them. Next week, we'll look at how scientists monitor these volcanoes."]), true),
          tryIt(spokenQ("l2-lis-3-try", "What is the main topic of the talk?", ["Why Indonesia has many volcanoes", "How to farm on volcanoes", "The history of tectonic research", "Earthquakes in Japan"], A, "Disebut di awal: why Indonesia has so many volcanoes.")),
        ],
      },
    ],
    checkpoint: [
      spokenQ("l2-lis-3-c1", "Questions 1 to 3. What is the talk mainly about?", ["A new student orientation programme", "A library renovation", "A sports competition", "A change in the bus schedule"], A, "Topik pembicaraan disebut di awal.",
        say(["woman", "Welcome, everyone. This afternoon I'll explain how our orientation programme works. During your first week, you'll attend three short workshops: one on using the online learning system, one on academic writing, and one on campus safety. Each workshop takes about an hour. On Friday, there will be a campus tour led by senior students. Please remember to bring your student card, because you'll need it to enter the library and the computer labs."])),
      spokenQ("l2-lis-3-c2", "How many workshops will the students attend?", ["Three", "One", "Two", "Five"], A, "Three short workshops."),
      spokenQ("l2-lis-3-c3", "Why should students bring their student card?", ["To enter the library and computer labs", "To get a discount", "To join the tour", "To register for classes"], A, "You'll need it to enter the library and the computer labs."),
      mc("l2-lis-3-c4", "In Part C, the main topic is usually stated…", ["near the beginning", "only at the end", "never", "in the questions only"], A, "Topik biasanya di awal."),
      pickMany("l2-lis-3-c5", "Choose ALL good strategies for Parts B and C.", ["Skim the options before the audio", "Listen for the topic in the first lines", "Expect questions in the order of the talk", "Write detailed notes during the test"], [0, 1, 2], "Di ITP tidak boleh mencatat."),
      spokenQ("l2-lis-3-c6", "Based on the geography talk, why do many farmers live near volcanoes?", ["The volcanic soil is very fertile.", "Land there is cheaper.", "Volcanoes are cooler.", "The government forces them."], A, "Volcanic soil is extremely fertile.",
        say(["man", "Although eruptions can be dangerous, volcanic soil is extremely fertile, which is why many farming communities live near them."])),
    ],
  },
];

// --- Structure --------------------------------------------------------------

const STRUCTURE: Lesson[] = [
  {
    id: "l2-str-1",
    skill: "structure",
    title: "Adjective Clauses and Reduced Clauses",
    summary: "who, which, that, whose, where — and how adjective clauses can be shortened.",
    minutes: 15,
    sections: [
      {
        title: "Adjective clauses",
        blocks: [
          table(["Connector", "Use", "Example"], [["who", "people (subject)", "The scientist who discovered the species…"], ["which / that", "things", "The bridge that connects the islands…"], ["whose", "possession", "The village whose houses stand on stilts…"], ["where / when", "place / time", "The year when the volcano erupted…"]]),
          text("Di Structure, adjective clause sering menjadi **jebakan**: kalimat terlihat panjang, tetapi **kata kerja utama** masih hilang. Contoh: *The museum which opened last year ____ many visitors.* → yang hilang adalah kata kerja utama: **attracts**."),
        ],
      },
      {
        title: "Reduced adjective clauses",
        blocks: [
          table(["Full clause", "Reduced"], [["The man who is standing there…", "The man standing there…"], ["The book which was written in 1920…", "The book written in 1920…"], ["Students who want to apply…", "Students wanting to apply…"]]),
          warn("Klausa yang dipendekkan memakai **-ing (aktif)** atau **V3 (pasif)**, tanpa *who/which* dan tanpa *be*. Jangan memilih *which written* atau *who standing*."),
          tryIt(completion("l2-str-1-try", "The temple ____ in the ninth century is a UNESCO World Heritage Site.", ["built", "which built", "was built", "building"], A, "Reduced passive clause: (which was) built.")),
        ],
      },
    ],
    checkpoint: [
      completion("l2-str-1-c1", "The researcher ____ won the award studies coral reefs.", ["who", "which", "whose", "she"], A, "Orang sebagai subjek klausa → who."),
      completion("l2-str-1-c2", "The village ____ houses stand on stilts is near the river.", ["whose", "who", "which", "where its"], A, "Kepemilikan → whose."),
      completion("l2-str-1-c3", "The festival that takes place every August ____ thousands of tourists.", ["attracts", "attracting", "which attracts", "to attract"], A, "Klausa utama butuh kata kerja → attracts."),
      wrong("l2-str-1-c4", "The [A:students] [B:who] [C:wanting] to join the club [D:must register] today.", "C", "want", "Setelah who perlu kata kerja penuh: who want (atau tanpa who: wanting)."),
      completion("l2-str-1-c5", "Most of the fish ____ in this lake are native species.", ["found", "are found", "which found", "finding"], A, "Reduced passive: (which are) found."),
      completion("l2-str-1-c6", "The year ____ the first satellite was launched marked a new era.", ["when", "which", "who", "whose"], A, "Waktu → when."),
    ],
  },
  {
    id: "l2-str-2",
    skill: "structure",
    title: "Noun Clauses and Adverb Clauses",
    summary: "Clauses that act as subjects or objects, and connectors of time, reason and contrast.",
    minutes: 15,
    sections: [
      {
        title: "Noun clauses",
        blocks: [
          table(["Use", "Example"], [["as subject", "What the committee decided surprised everyone."], ["as object", "Scientists don't know why the birds migrate early."], ["after a preposition", "We talked about whether we should postpone the trip."], ["that-clause subject", "That the earth is round was proven long ago."]]),
          warn("Noun clause memakai **urutan pernyataan**, bukan pertanyaan: *why the birds migrate* ✅, bukan *why do the birds migrate* ❌. Klausa sebagai subjek tetap butuh **kata kerja utama** setelahnya."),
          tryIt(completion("l2-str-2-try", "____ the new law will reduce pollution is still unclear.", ["Whether", "If it", "Does", "That will"], A, "Noun clause sebagai subjek: Whether … is unclear.")),
        ],
      },
      {
        title: "Adverb clauses",
        blocks: [
          table(["Meaning", "Connectors"], [["time", "when, while, after, before, as soon as, until, since"], ["reason", "because, since, as"], ["contrast", "although, even though, whereas, while"], ["condition", "if, unless, provided that"]]),
          examples([{ wrong: "Although it rained, but the match continued.", right: "Although it rained, the match continued.", note: "Jangan gabungkan although dan but." }, { wrong: "Because of the road was flooded, …", right: "Because the road was flooded, … / Because of the flood, …" }]),
          tryIt(completion("l2-str-2-try2", "____ the ferry was delayed, the passengers waited patiently.", ["Although", "Despite", "However", "In spite"], A, "Although + klausa.")),
        ],
      },
    ],
    checkpoint: [
      completion("l2-str-2-c1", "____ caused the fire is still being investigated.", ["What", "That what", "It", "Which it"], A, "What … sebagai subjek."),
      completion("l2-str-2-c2", "No one knows exactly ____ the ancient city was abandoned.", ["why", "why was", "because", "that why"], A, "Urutan pernyataan: why the city was abandoned."),
      completion("l2-str-2-c3", "____ the students had finished the test, they left the room.", ["As soon as", "Despite", "During", "Because of"], A, "As soon as + klausa."),
      wrong("l2-str-2-c4", "[A:Even though] the price was high, [B:but] many [C:people] [D:bought] the phone.", "B", "(delete “but”)", "Even though dan but tidak dipakai bersamaan."),
      completion("l2-str-2-c5", "The guide explained ____ the volcano formed.", ["how", "how did", "that how", "how was"], A, "Noun clause sebagai objek."),
      wrong("l2-str-2-c6", "[A:Because of] the bridge [B:was] closed, the [C:trucks] had to [D:take] another road.", "A", "Because", "Because of + noun; klausa butuh because."),
    ],
  },
  {
    id: "l2-str-3",
    skill: "structure",
    title: "Written Expression: Word Forms and Parallel Structure",
    summary: "Adjective, adverb, noun and verb forms; keeping items in a series parallel.",
    minutes: 15,
    sections: [
      {
        title: "Word forms",
        blocks: [
          table(["Position", "Form needed", "Example"], [["before a noun", "adjective", "a rapid change"], ["describing a verb", "adverb", "changed rapidly"], ["after an article/adjective", "noun", "the rapidity of change"], ["after to / modal", "base verb", "to analyze / can analyze"]]),
          table(["Common suffixes", ""], [["noun", "-tion, -ment, -ness, -ity, -ance"], ["adjective", "-ous, -ful, -ive, -able, -al"], ["adverb", "-ly"], ["verb", "-ize, -en, -ify"]]),
        ],
      },
      {
        title: "Parallel structure",
        blocks: [
          examples([{ wrong: "The program teaches students to read, writing, and to speak.", right: "…to read, write, and speak." }, { wrong: "She is intelligent, hard-working, and has creativity.", right: "She is intelligent, hard-working, and creative." }, { wrong: "Not only fast but also it is cheap.", right: "It is not only fast but also cheap." }], "Keep the same form"),
          tip("Cari **and, or, but, both…and, either…or, not only…but also**. Bagian yang dihubungkan harus berbentuk **sama** (semua kata benda, semua -ing, semua kata sifat, dst.)."),
          tryIt(mc("l2-str-3-try", "Which sentence is parallel?", ["Hiking, swimming, and diving are popular here.", "Hiking, to swim, and diving are popular here.", "Hike, swimming, and to dive are popular here.", "Hiking, swim, and dives are popular here."], A, "Semua -ing.")),
        ],
      },
    ],
    checkpoint: [
      wrong("l2-str-3-c1", "The [A:population] of the city [B:grew] [C:rapid] [D:after] the new port opened.", "C", "rapidly", "Menerangkan kata kerja → adverb."),
      wrong("l2-str-3-c2", "Visitors can [A:swim], [B:snorkeling], and [C:dive] [D:near] the island.", "B", "snorkel", "Paralel: swim, snorkel, dive."),
      wrong("l2-str-3-c3", "The [A:discover] of the fossils [B:changed] our [C:understanding] of [D:early] mammals.", "A", "discovery", "Setelah the dibutuhkan kata benda."),
      completion("l2-str-3-c4", "The new policy is both practical and ____ .", ["affordable", "afford", "affordably", "it is affordable"], A, "Both + adj + and + adj."),
      wrong("l2-str-3-c5", "Coffee [A:farmers] need sunlight, [B:rainfall], and [C:soil that is fertile] to [D:produce] good beans.", "C", "fertile soil", "Paralel: noun, noun, noun."),
      completion("l2-str-3-c6", "Batik artisans work slowly and ____ .", ["carefully", "careful", "care", "carefulness"], A, "Paralel adverb: slowly and carefully."),
    ],
  },
];

// --- Reading ------------------------------------------------------------------

const READING: Lesson[] = [
  {
    id: "l2-rd-1",
    skill: "reading",
    title: "Inference Questions",
    summary: "Answering questions with infer, imply and suggest by reasoning from stated information.",
    minutes: 16,
    passages: [SAGO],
    sections: [
      {
        title: "What is an inference?",
        blocks: [
          text("Soal inferensi (*It can be inferred…, The passage implies…, The author suggests…*) menanyakan hal yang **tidak tertulis langsung tetapi pasti benar** berdasarkan teks. Jawaban yang benar **tidak** melampaui informasi teks terlalu jauh."),
          table(["Good inference", "Bad inference"], [["logically follows from the text", "possible but not supported"], ["often a restatement of an implied idea", "uses an exact phrase but changes the meaning"], ["cautious", "extreme words: always, never, all, only"]]),
        ],
      },
      {
        title: "Practice with a passage",
        blocks: [
          { type: "passage", passage: SAGO },
          vocab([["staple", "makanan pokok", "rice"], ["swampy", "berawa", "water"], ["pith", "empulur/inti batang", "tree"], ["yield", "menghasilkan", "basket"]], "Words from the passage"),
          tryIt(rq("l2-rd-1-try", SAGO.id, "It can be inferred from the passage that sago is useful in areas where", ["rice is difficult to grow", "rain falls every day", "plantations are common", "people prefer bread"], A, "Baris 2–4: sagu tumbuh di rawa tempat tanaman lain sulit hidup.")),
        ],
      },
    ],
    checkpoint: [
      rq("l2-rd-1-c1", SAGO.id, "The passage implies that rice farming", ["requires more preparation of the land than sago", "is older than sago farming", "is impossible in Indonesia", "does not need water"], A, "Baris 2–3: carefully irrigated fields."),
      rq("l2-rd-1-c2", SAGO.id, "What can be inferred about the starch?", ["It is heavier than water.", "It is dangerous to eat.", "It must be cooked immediately.", "It is found in the leaves."], A, "Baris 6: pati mengendap di dasar wadah."),
      rq("l2-rd-1-c3", SAGO.id, "The author suggests that the decline of sago forests", ["may make food supplies less secure", "has no effect on families", "is good for nutrition", "was caused by rainfall"], A, "Baris 10–11."),
      rq("l2-rd-1-c4", SAGO.id, "Which of the following is NOT a reasonable inference?", ["Sago is always healthier than rice.", "Sago can grow without irrigation.", "Some young people eat less sago than before.", "Harvesting sago involves several steps."], A, "Kata ekstrem 'always' tidak didukung teks."),
      rq("l2-rd-1-c5", SAGO.id, "The word “yield” in line 7 is closest in meaning to", ["produce", "lose", "sell", "require"], A, "Yield = menghasilkan."),
      rq("l2-rd-1-c6", SAGO.id, "Why do some nutritionists worry about the shift to rice?", ["Sago depends less on rainfall than rice does.", "Rice is too expensive to import.", "Sago is grown only by older people.", "Rice cannot be stored."], A, "Baris 10–11."),
    ],
  },
  {
    id: "l2-rd-2",
    skill: "reading",
    title: "NOT/EXCEPT Questions and Organization",
    summary: "Eliminating options that are mentioned, and recognising how a passage is organized.",
    minutes: 15,
    passages: [COMET],
    sections: [
      {
        title: "NOT/EXCEPT strategy",
        blocks: [
          text("Untuk soal **NOT/EXCEPT**, tiga pilihan **disebutkan** dalam teks; jawabannya adalah yang **tidak** disebutkan atau **bertentangan**. Strateginya: cari dan **coret** tiga pilihan yang ada di teks."),
          table(["Organization pattern", "Signal words"], [["chronological / process", "first, then, as, when, finally"], ["cause and effect", "because, causes, as a result, therefore"], ["comparison / contrast", "however, unlike, similarly, whereas"], ["classification / definition", "is a type of, consists of, is called"]]),
        ],
      },
      {
        title: "Practice with a passage",
        blocks: [
          { type: "passage", passage: COMET },
          tryIt(rq("l2-rd-2-try", COMET.id, "How is the passage mainly organized?", ["By describing a process as a comet approaches the Sun", "By comparing comets with planets", "By telling the history of a famous comet", "By listing arguments for and against space travel"], A, "Proses perubahan komet saat mendekati Matahari.")),
        ],
      },
    ],
    checkpoint: [
      rq("l2-rd-2-c1", COMET.id, "All of the following are mentioned as parts of a comet EXCEPT", ["rings", "a nucleus", "a coma", "a tail"], A, "Rings tidak disebut."),
      rq("l2-rd-2-c2", COMET.id, "What causes ice in a comet to turn into gas?", ["Heat from the Sun", "The solar wind", "Collisions with planets", "Cold temperatures"], A, "Baris 4–5."),
      rq("l2-rd-2-c3", COMET.id, "According to the passage, which is NOT true of a comet's tail?", ["It always points in the direction the comet moves.", "It can stretch for millions of kilometers.", "It is created by pressure from sunlight and solar wind.", "There may be more than one."], A, "Baris 8–10: selalu menjauhi Matahari."),
      rq("l2-rd-2-c4", COMET.id, "The word “regardless” in line 9 is closest in meaning to", ["without considering", "because of", "according to", "as a result of"], A, "Regardless of = terlepas dari."),
      rq("l2-rd-2-c5", COMET.id, "Why do scientists study comets?", ["Their material has changed little since the solar system formed.", "They might hit the Earth soon.", "They are made of gold.", "They are easy to visit."], A, "Baris 10–11."),
      rq("l2-rd-2-c6", COMET.id, "The word “it” in line 3 refers to", ["a comet", "the Sun", "ice", "dust"], A, "It = a comet (far from the Sun)."),
    ],
  },
  {
    id: "l2-rd-3",
    skill: "reading",
    title: "Purpose, Tone and Attitude",
    summary: "Why the author wrote the passage or included a detail, and how the author feels about the topic.",
    minutes: 15,
    passages: [RADIO],
    sections: [
      {
        title: "Purpose and tone",
        blocks: [
          table(["Question type", "What to look for"], [["Why does the author mention X?", "the function of the detail: example, contrast, evidence"], ["The author's purpose is to…", "explain, describe, argue, compare, criticize"], ["The author's attitude toward X is…", "evaluative words: valuable, struggle, however, trusted"], ["The tone of the passage is…", "objective, supportive, critical, neutral, enthusiastic"]]),
          tip("Teks akademik TOEFL umumnya **objektif** atau **sedikit positif/negatif**. Hindari pilihan sikap yang ekstrem seperti *furious* atau *ecstatic*."),
        ],
      },
      {
        title: "Practice with a passage",
        blocks: [
          { type: "passage", passage: RADIO },
          tryIt(rq("l2-rd-3-try", RADIO.id, "Why does the author mention the earthquake?", ["To give an example of the stations' value in emergencies", "To describe the geology of Indonesia", "To criticize mobile phone companies", "To explain how generators work"], A, "Baris 5–8: contoh pendukung.")),
        ],
      },
    ],
    checkpoint: [
      rq("l2-rd-3-c1", RADIO.id, "What is the author's main purpose?", ["To explain the role and value of community radio", "To sell radios", "To compare radio and television", "To teach local languages"], A, "Tujuan utama."),
      rq("l2-rd-3-c2", RADIO.id, "The author's attitude toward community radio is best described as", ["generally supportive", "strongly hostile", "completely indifferent", "angry"], A, "Positif dengan mengakui kritik."),
      rq("l2-rd-3-c3", RADIO.id, "Why does the author mention critics in line 8?", ["To present a limitation before giving a counterpoint", "To prove the stations should close", "To introduce a new topic", "To describe the volunteers"], A, "Kritik lalu nevertheless."),
      rq("l2-rd-3-c4", RADIO.id, "According to the passage, community radio stations broadcast", ["in local languages", "only in English", "only at night", "for national audiences"], A, "Baris 3."),
      rq("l2-rd-3-c5", RADIO.id, "The word “distant” in line 11 is closest in meaning to", ["far away", "expensive", "modern", "popular"], A, "Distant = jauh."),
      rq("l2-rd-3-c6", RADIO.id, "Which of the following can be inferred?", ["Trust can be as important as technology in a crisis.", "Generators are never used by radio stations.", "National broadcasters ignore disasters.", "Volunteers are paid well."], A, "Baris 10–11.", ),
    ],
  },
];

export const L2_LESSONS: Lesson[] = [
  LISTENING[0], STRUCTURE[0], READING[0],
  LISTENING[1], STRUCTURE[1], READING[1],
  LISTENING[2], STRUCTURE[2], READING[2],
];

// --- Pretest, Big Quiz, Live ----------------------------------------------------

export const L2_PRETEST: LevelQuiz = {
  id: "l2-pre",
  title: "Level 2 Pretest",
  passPercent: 0,
  questions: [
    partA("l2-pre-1", [["man", "Let's call it a day."], ["woman", "Good idea. I'm exhausted."]], "What will the speakers probably do?", ["Stop working", "Start a new task", "Call a friend", "Work all night"], A, "Call it a day = berhenti bekerja."),
    completion("l2-pre-2", "The island ____ the turtles lay their eggs is protected.", ["where", "which", "who", "whose"], A, "Tempat → where."),
    wrong("l2-pre-3", "The guide spoke [A:clear] and [B:answered] all [C:our] [D:questions].", "A", "clearly", "Menerangkan kata kerja → adverb."),
    completion("l2-pre-4", "____ the museum opens on Monday is not certain.", ["Whether", "If does", "That whether", "Will"], A, "Noun clause sebagai subjek."),
    partA("l2-pre-5", [["woman", "Did you enjoy the film?"], ["man", "I couldn't agree more with the critics. It was brilliant."]], "What does the man mean?", ["He thought the film was excellent.", "He disagreed with the critics.", "He didn't see the film.", "He wants to be a critic."], A, "Couldn't agree more = sangat setuju."),
  ],
};

export const L2_QUIZ: LevelQuiz = {
  id: "l2-quiz",
  title: "Big Quiz Level 2 — Intermediate",
  passPercent: 70,
  passages: [SAGO, RADIO],
  questions: [
    partA("l2q-1", [["woman", "Are you going to the conference?"], ["man", "It's out of the question. I have exams that week."]], "What does the man mean?", ["He cannot go to the conference.", "He has a question about the conference.", "He will go after his exams.", "The conference is cancelled."], A, "Out of the question = tidak mungkin."),
    partA("l2q-2", [["man", "I don't think the café opens on Sundays."], ["woman", "Neither do I."]], "What does the woman mean?", ["She also thinks the café is closed on Sundays.", "She knows the café is open.", "She works at the café.", "She doesn't drink coffee."], A, "Neither do I = setuju dengan negatif."),
    partA("l2q-3", [["woman", "Tono finished the marathon."], ["man", "He did? He's never run more than five kilometers."]], "What had the man assumed?", ["Tono would not finish the marathon.", "Tono was a professional runner.", "The marathon was cancelled.", "Tono ran five marathons."], A, "Kejutan → dugaan sebaliknya."),
    spokenQ("l2q-4", "What is the main purpose of the announcement?", ["To explain changes to the library's opening hours", "To advertise new books", "To welcome new students", "To close the library permanently"], A, "Tujuan pengumuman.",
      say(["woman", "Attention, students. Starting next Monday, the library will open at seven a.m. instead of eight, and it will stay open until ten p.m. during the exam period. However, the computer lab on the second floor will be closed on Saturdays for maintenance. Please plan your study time accordingly."])),
    spokenQ("l2q-5", "What will happen to the computer lab?", ["It will be closed on Saturdays.", "It will open at seven a.m.", "It will move to the first floor.", "It will be open until midnight."], A, "Closed on Saturdays for maintenance."),
    completion("l2q-6", "The scientist ____ research focuses on mangroves received an award.", ["whose", "who", "which", "that her"], A, "Kepemilikan → whose."),
    completion("l2q-7", "____ the rain stopped, the children went outside to play.", ["As soon as", "Because of", "During", "In spite of"], A, "As soon as + klausa."),
    wrong("l2q-8", "The workshop teaches participants how to [A:design], [B:building], and [C:test] [D:simple] robots.", "B", "build", "Paralel: design, build, test."),
    wrong("l2q-9", "The [A:importance] of clean water [B:is] [C:wide] [D:recognized].", "C", "widely", "Menerangkan recognized → adverb."),
    completion("l2q-10", "No one is sure ____ the ancient ship sank.", ["why", "why did", "because", "why was it"], A, "Urutan pernyataan dalam noun clause."),
    rq("l2q-11", SAGO.id, "What is the passage mainly about?", ["Sago as a traditional food and the challenges it faces", "How to grow rice in swamps", "The history of Papua New Guinea", "Modern plantations in Indonesia"], A, "Gagasan utama."),
    rq("l2q-12", SAGO.id, "According to the passage, how is sago starch obtained?", ["By scraping and washing the pith of the trunk", "By drying the leaves", "By boiling the fruit", "By grinding the roots"], A, "Baris 4–6."),
    rq("l2q-13", SAGO.id, "It can be inferred that one sago palm", ["provides a large amount of food", "grows in one year", "is cut every week", "produces rice"], A, "Baris 7–8: cukup untuk keluarga berbulan-bulan.", ),
    rq("l2q-14", RADIO.id, "Why does the author mention the generator?", ["To show how a station kept broadcasting when other services failed", "To explain how electricity works", "To criticize the station's costs", "To describe a new technology"], A, "Baris 6–8."),
    rq("l2q-15", RADIO.id, "The author would most likely agree that community radio", ["deserves more support despite its problems", "should be replaced by national media", "is no longer needed", "is too expensive to continue"], A, "Sikap penulis: suportif.", ),
  ],
};

export const L2_HOTS = new Set(["l2q-3", "l2q-13", "l2q-15"]);

export const L2_LIVE: LiveQuizSet = {
  title: "Live Quiz — TOEFL ITP Intermediate",
  questions: [
    live("l2-live-1", "“Under the weather” means…", ["slightly sick", "very happy", "outside", "rainy"], 0, "sick"),
    live("l2-live-2", "The man ___ car was stolen…", ["whose", "who", "which", "where"], 0, "car"),
    live("l2-live-3", "Although it rained, ___ the match continued.", ["(nothing)", "but", "so", "however"], 0, "rain"),
    live("l2-live-4", "read, write, and ___", ["speak", "speaking", "to speaking", "spoke"], 0, "open-book"),
    live("l2-live-5", "“It remains to be seen” =", ["we don't know yet", "it is visible", "it's finished", "it's lost"], 0, "question"),
    live("l2-live-6", "a ___ change", ["rapid", "rapidly", "rapidity", "rapids"], 0, "clock"),
    live("l2-live-7", "NOT/EXCEPT: the answer is…", ["not mentioned", "mentioned twice", "the longest", "the first"], 0, "report"),
    live("l2-live-8", "Typical TOEFL passage tone:", ["objective", "furious", "ecstatic", "rude"], 0, "owl-think"),
  ],
};

