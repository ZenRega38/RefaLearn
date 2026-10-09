import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, writing } from "../kit";

// Grade 10 (SMA, Fase E). Chapter 5 — Life Stories (biographical recount) · Chapter 6 — Stories That Teach (narrative)

const BUTET: Passage = {
  id: "sma10-c5-butet",
  title: "Butet Manurung: Teacher of the Forest",
  pic: "tree",
  lines: [
    "Saur Marlina Manurung, better known as Butet Manurung, was born in Jakarta in 1972. As a child, she loved adventure stories and dreamed of living in the jungle.",
    "She studied anthropology and Indonesian literature at Padjadjaran University in Bandung, where she was an active member of the nature lovers' club.",
    "In 1999, she began working for a conservation organisation in Jambi. There, she met the Orang Rimba, a semi-nomadic community living in the Bukit Duabelas forest.",
    "While she was living with them, she noticed that outsiders often cheated the Orang Rimba because they could not read contracts or count money.",
    "At first, many families refused to let their children learn, because they believed that writing would bring bad luck. Butet did not give up. She learned their language, followed their customs and taught under the trees with a small blackboard.",
    "In 2003, she and several friends founded Sokola Rimba, a school that adapts its lessons to the needs and the way of life of forest communities.",
    "The programme later spread to other indigenous communities across Indonesia, from Aceh to Halmahera in North Maluku.",
    "Her story was made into the film “Sokola Rimba” in 2013, and in 2014 she received the Ramon Magsaysay Award, often called Asia's Nobel Prize.",
    "Butet believes that education should help people protect their own culture, not replace it.",
  ],
};

export const CH5: Level = {
  id: "sma10-ch5",
  title: "Chapter 5 — Life Stories",
  description: "Read and write biographical recounts, sequence events with time clauses and the past perfect, use past tenses accurately, and present the life of an inspiring person.",
  targetScore: "Reading · Structure · Speaking",
  cover: ["tree", "open-book", "trophy"],
  pretest: {
    id: "sma10-c5-pre",
    title: "Chapter 5 Pretest",
    passPercent: 0,
    questions: [
      pick("sma10-c5-pre1", "A biographical recount tells…", ["the important events of a real person's life", "how to make something", "an imaginary story with magic", "the features of a product"], 0, "Biografi = kisah hidup tokoh nyata."),
      listen("sma10-c5-pre2", voice("After she had graduated from university, she moved to Jambi to work with forest communities."), "Listen. What did she do first?", ["graduated from university", "moved to Jambi", "worked with forest communities"], 0, "Had graduated = lebih dulu."),
      trPick("sma10-c5-pre3", "“Masyarakat adat” in English is…", ["indigenous community", "industrial community", "individual society", "inside people"], 0, "Indigenous community."),
      pick("sma10-c5-pre4", "___ she was living in the forest, she learned the local language.", ["While", "During", "After that", "Then"], 0, "While + klausa."),
      pick("sma10-c5-pre5", "Which sentence is an evaluation, not an event?", ["She is one of the most inspiring educators in Indonesia.", "She was born in 1972.", "She founded a school in 2003.", "She moved to Jambi in 1999."], 0, "Penilaian penulis."),
    ],
  },
  lessons: [
    {
      id: "sma10-c5-l1",
      skill: "reading",
      title: "Reading: Butet Manurung",
      summary: "Structure, language features and purpose of a biographical recount.",
      passages: [BUTET],
      sections: [
        {
          title: "Teacher of the forest",
          blocks: [
            { type: "passage", passage: BUTET },
            audio("Listen and read", say(["woman", BUTET.lines.join(" ")])),
            vocab([["anthropology", "antropologi", "open-book"], ["semi-nomadic", "setengah nomaden/berpindah-pindah", "map"], ["cheat", "menipu", "money"], ["adapt", "menyesuaikan", "target"], ["indigenous", "adat/pribumi", "tree"]], "Words from the text"),
          ],
        },
        {
          title: "Structure and features",
          blocks: [
            table(["Part", "Function", "Lines"], [["Orientation", "background: who, when, where", "1–2"], ["Events (chronological)", "important moments and achievements", "3–8"], ["Reorientation / evaluation", "the person's values, legacy or the writer's comment", "9"]]),
            table(["Language feature", "Example"], [["Past tenses", "was born, began, noticed, had graduated"], ["Time markers", "In 1999, At first, While she was living…, Later"], ["Specific participants", "Butet Manurung, the Orang Rimba"], ["Cause and effect", "because they could not read contracts"]]),
            tryIt(pick("sma10-c5-l1-try1", "Where did Butet study?", ["Padjadjaran University in Bandung", "University of Indonesia", "abroad in the Netherlands"], 0, "Baris 2.", { passageId: BUTET.id })),
          ],
        },
      ],
      checkpoint: [
        pick("sma10-c5-l1-c1", "Who are the Orang Rimba?", ["a semi-nomadic community in the Bukit Duabelas forest", "a group of teachers from Jakarta", "a conservation organisation"], 0, "Baris 3.", { passageId: BUTET.id }),
        pick("sma10-c5-l1-c2", "Why did outsiders often cheat the Orang Rimba?", ["They could not read contracts or count money.", "They were rich.", "They lived in the city."], 0, "Baris 4.", { passageId: BUTET.id }),
        fill("sma10-c5-l1-c3", "Complete.", "In 2003, she and several friends founded", ", a school that adapts its lessons…", ["Sokola Rimba"], "Baris 6.", { passageId: BUTET.id }),
        pickMany("sma10-c5-l1-c4", "Choose ALL the things Butet did to gain the community's trust.", ["learned their language", "followed their customs", "taught under the trees", "forced children to come to school"], [0, 1, 2], "Baris 5.", { passageId: BUTET.id }),
        pick("sma10-c5-l1-c5", "What does line 9 suggest about Butet's view of education?", ["Education should respect and strengthen local culture.", "Forest people should move to cities.", "Traditional culture should disappear."], 0, "Pendidikan yang menghormati budaya.", { passageId: BUTET.id, hots: true }),
        pick("sma10-c5-l1-c6", "Which word best describes Butet, based on line 5?", ["persistent", "careless", "impatient"], 0, "Did not give up = gigih.", { passageId: BUTET.id, hots: true }),
      ],
    },
    {
      id: "sma10-c5-l2",
      skill: "structure",
      title: "Sequencing Past Events",
      summary: "Simple past, past continuous and past perfect together; time clauses with when, while, after, before, as soon as, by the time.",
      sections: [
        {
          title: "Three past tenses",
          blocks: [
            table(["Tense", "Use", "Example"], [["Simple past", "completed events in order", "She moved to Jambi and met the Orang Rimba."], ["Past continuous", "background or an action in progress", "While she was living with them, she noticed…"], ["Past perfect", "an event before another past event", "By the time the film came out, she had taught hundreds of children."]]),
            table(["Time clause", "Meaning", "Example"], [["as soon as", "segera setelah", "As soon as she arrived, she started learning the language."], ["by the time", "pada saat/sebelum", "By the time he was 20, he had published two books."], ["until", "sampai", "She stayed until the children could read."], ["once", "begitu", "Once the families trusted her, more children joined."]]),
          ],
        },
        {
          title: "Practice",
          blocks: [
            audio("A short biography", say(["man", "Cut Nyak Dhien was born in Aceh in 1848. When she was twelve, she married Teuku Ibrahim Lamnga."], ["man", "After her husband had been killed in a battle against the Dutch, she swore to continue the fight."], ["man", "While she was leading guerrilla attacks in the forests, her eyesight became very poor."], ["man", "She was eventually captured and exiled to Sumedang, West Java, where she died in 1908. She was declared a National Hero in 1964."])),
            tryIt(pick("sma10-c5-l2-try1", "What happened before Cut Nyak Dhien swore to continue the fight?", ["Her husband had been killed.", "She was exiled.", "She became a National Hero."], 0, "Past perfect passive.")),
            examples([{ wrong: "When I arrived, the film already started.", right: "When I arrived, the film had already started." }, { wrong: "While she taught, a storm was coming.", right: "While she was teaching, a storm came." }], "Fix it"),
          ],
        },
      ],
      checkpoint: [
        listen("sma10-c5-l2-c1", voice("By the time Kartini died at the age of twenty-five, she had written many letters about women's education."), "Listen. What had Kartini done by the time she died?", ["written many letters", "opened a university", "travelled to Europe"], 0, "Had written."),
        pick("sma10-c5-l2-c2", "As soon as the war ___, he returned to his village.", ["ended", "had been ending", "was end"], 0, "As soon as + simple past."),
        pick("sma10-c5-l2-c3", "She ___ for an NGO when she met the community.", ["was working", "had work", "works"], 0, "Latar → past continuous."),
        fill("sma10-c5-l2-c4", "Complete: By the time he was 30, he ___ (start) three companies.", "By the time he was 30, he", "three companies.", ["had started"], "By the time → past perfect."),
        trPick("sma10-c5-l2-c5", "“Ia diasingkan ke Sumedang.” in English is…", ["She was exiled to Sumedang.", "She exiled to Sumedang.", "She was exile in Sumedang."], 0, "Pasif lampau."),
        pick("sma10-c5-l2-c6", "Which sentence shows the correct order of events?", ["After he had finished his studies, he returned to Indonesia.", "After he returned to Indonesia, he had finished his studies before.", "He had returned after he finishes his studies."], 0, "Past perfect untuk kejadian pertama.", { hots: true }),
      ],
    },
    {
      id: "sma10-c5-l3",
      skill: "speaking",
      title: "Present a Life Story",
      summary: "Researching, writing and presenting a short biography.",
      sections: [
        {
          title: "Choosing a figure",
          blocks: [
            pics([["school", "educators"], ["doctor", "doctors"], ["badminton", "athletes"], ["palette", "artists"]], "Inspiring Indonesians"),
            tip("Pilih tokoh dengan **titik balik** (turning point) yang jelas. Gunakan sumber tepercaya, catat **tahun penting**, dan tutup dengan **evaluasi**: mengapa tokoh ini penting bagi kita?"),
          ],
        },
        {
          title: "Write and present",
          blocks: [
            writing({
              id: "sma10-c5-l3-write",
              title: "A biographical recount",
              prompt: "Write a biographical recount of an inspiring Indonesian (a national hero, scientist, artist, athlete, activist or a person in your community). Include orientation, at least four key events with dates, and a reorientation/evaluation.",
              image: "open-book",
              minWords: 200,
              maxWords: 330,
              tips: ["Orientation: … was born in … in …", "Early life: As a child, …", "Turning point: In …, while …, …", "Achievements: By the time …, … had …", "Reorientation: Today, … is remembered as …"],
              models: [{ label: "Example", text: "Ki Hajar Dewantara: Father of Indonesian Education\nRaden Mas Soewardi Soerjaningrat was born into a noble Javanese family in Yogyakarta on 2 May 1889. Because he was an aristocrat, he could attend a Dutch school, which was rare for Indonesians at that time.\nAs a young man, he worked as a journalist. In 1913, he wrote a famous article called “If I Were a Dutchman”, which criticised the colonial government for celebrating its own independence with money taken from Indonesians. As a result, he was exiled to the Netherlands.\nWhile he was living in exile, he studied education and was inspired by modern teaching methods. After he had returned to Java, he changed his name to Ki Hajar Dewantara to show that he was close to ordinary people.\nIn 1922, he founded Taman Siswa, a school for ordinary Indonesian children. His motto, “Tut Wuri Handayani”, meaning “from behind, a teacher gives encouragement”, is still the motto of Indonesia's Ministry of Education.\nHe became the first Minister of Education after independence and died in 1959. Today, his birthday is celebrated as National Education Day, and he is remembered as the man who believed that education is the right of every child." }],
              rubric: ["My text has orientation, chronological events and reorientation.", "I used simple past, past continuous and past perfect accurately.", "I used time clauses (when, while, after, by the time…).", "I included specific dates and facts.", "My evaluation explains why this person matters."],
            }),
            speaking({
              id: "sma10-c5-l3-say",
              title: "Biography presentation",
              prompt: "Present your biography in about two minutes. Use notes, not a full script. Highlight one turning point and end with what we can learn from this person.",
              image: "microphone",
              prepSeconds: 90,
              seconds: 120,
              tips: ["Today I'd like to tell you about …", "… was born …", "The turning point in his/her life came when …", "By the time …, he/she had …", "What I admire most is …"],
              models: [{ label: "Example", text: "Today I'd like to tell you about Butet Manurung. She was born in Jakarta in 1972 and studied anthropology in Bandung. The turning point in her life came in 1999, when she was working in the forests of Jambi. While she was living with the Orang Rimba, she saw that people cheated them because they couldn't read or count. So she decided to teach them. At first, the families refused, but she learned their language and taught under the trees. By the time she founded Sokola Rimba in 2003, she had already gained the community's trust. In 2014, she received the Ramon Magsaysay Award. What I admire most is that she respects the culture of the people she teaches." }],
              rubric: ["I introduced the person clearly.", "I highlighted a turning point.", "I used past tenses and time clauses accurately.", "I ended with an evaluation or lesson.", "I spoke from notes with good eye contact."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sma10-c5-l3-c1", "In the model text, why was Ki Hajar Dewantara exiled?", ["He wrote an article criticising the colonial government.", "He refused to go to school.", "He started a war."], 0, "If I Were a Dutchman."),
        pick("sma10-c5-l3-c2", "What does “Tut Wuri Handayani” mean?", ["From behind, a teacher gives encouragement.", "Education is expensive.", "Teachers must lead from the front."], 0, "Moto pendidikan."),
        arrange("sma10-c5-l3-c3", "Put the words in order.", "The turning point came when she moved to Jambi", "Titik balik."),
        fill("sma10-c5-l3-c4", "Complete: Today, he is ___ as the Father of Indonesian Education.", "Today, he is", "as the Father of Indonesian Education.", ["remembered", "known"], "Is remembered/known as."),
        trPick("sma10-c5-l3-c5", "“Hari Pendidikan Nasional” in English is…", ["National Education Day", "National Teacher Day", "Day of National Study"], 0, "National Education Day."),
        pick("sma10-c5-l3-c6", "Which is the strongest evaluation sentence for a biography?", ["Her work shows that education can protect culture instead of erasing it.", "She was born in 1972.", "She likes trees."], 0, "Evaluasi bermakna.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma10-c5-post",
    title: "Chapter 5 Posttest",
    passPercent: 70,
    passages: [BUTET],
    questions: [
      pick("sma10-c5-post1", "By the time the rescue team arrived, the villagers ___ the injured to the clinic.", ["had taken", "took", "were taking", "have taken"], 0, "Lebih dulu → past perfect."),
      listen("sma10-c5-post2", voice("While he was studying in Germany, he designed a new type of aircraft wing."), "Listen. When did he design the wing?", ["while he was studying in Germany", "after he became president", "before he went to school", "while he was in Jambi"], 0, "While + past continuous."),
      trPick("sma10-c5-post3", "“Titik balik” (in someone's life) in English is…", ["turning point", "return point", "back point", "point turn"], 0, "Turning point."),
      pick("sma10-c5-post4", "Which part of a biography gives the writer's evaluation?", ["reorientation", "orientation", "complication", "identification"], 0, "Reorientasi."),
      arrange("sma10-c5-post5", "Put the words in order.", "She had worked there for ten years before she retired", "Past perfect + before."),
      pick("sma10-c5-post6", "Where did the Sokola Rimba programme later spread?", ["from Aceh to Halmahera", "to Europe", "only in Jakarta", "to Malaysia"], 0, "Baris 7.", { passageId: BUTET.id }),
      match("sma10-c5-post7", "Match the year and the event.", [["1972", "Butet was born"], ["1999", "began working in Jambi"], ["2003", "founded Sokola Rimba"], ["2014", "received the Ramon Magsaysay Award"]], "Kronologi."),
      fill("sma10-c5-post8", "Complete.", "many families refused to let their children learn, because they believed that writing would bring bad", ".", ["luck"], "Baris 5.", { passageId: BUTET.id }),
      pick("sma10-c5-post9", "Why does the writer mention that outsiders cheated the Orang Rimba?", ["to explain why Butet started teaching them", "to criticise Butet", "to describe the forest", "to show the community was rich"], 0, "Sebab munculnya Sokola Rimba.", { passageId: BUTET.id, hots: true }),
      pick("sma10-c5-post10", "Which statement is an opinion rather than a fact from the text?", ["Education should help people protect their own culture.", "She was born in 1972.", "The film was released in 2013.", "She studied in Bandung."], 0, "Keyakinan Butet (baris 9).", { passageId: BUTET.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Legends of Real Life",
    questions: [
      live("sma10-c5-live1", "By the time I came, they ___ left.", ["had", "have", "were", "did"], 0, "clock"),
      live("sma10-c5-live2", "Sokola Rimba teaches…", ["forest communities", "pilots", "chefs", "athletes"], 0, "tree"),
      live("sma10-c5-live3", "Background action:", ["past continuous", "simple present", "future", "imperative"], 0, "question"),
      live("sma10-c5-live4", "“Masyarakat adat” =", ["indigenous community", "industrial city", "inside group", "individual people"], 0, "house", true),
      live("sma10-c5-live5", "Biography ends with…", ["reorientation", "complication", "goal", "materials"], 0, "report"),
      live("sma10-c5-live6", "Taman Siswa founder:", ["Ki Hajar Dewantara", "Kartini", "Habibie", "Soekarno"], 0, "school"),
      live("sma10-c5-live7", "As soon as she ___, she called me.", ["arrived", "arrives", "had arriving", "arriving"], 0, "phone-call"),
      live("sma10-c5-live8", "Cut Nyak Dhien was from…", ["Aceh", "Bali", "Papua", "Maluku"], 0, "flag"),
    ],
  },
};

const STONE: Passage = {
  id: "sma10-c6-stone",
  title: "The Stonecutter (an Asian Folktale)",
  pic: "mountain",
  lines: [
    "Once there was a stonecutter named Tasaku who cut blocks of stone from the side of a great mountain. Although his work was hard, he earned enough to live.",
    "One hot day, he saw a rich merchant resting in a beautiful house. “I wish I were rich,” he sighed. To his surprise, a voice answered, “Your wish is granted.” Suddenly, he became the merchant.",
    "He was happy until a prince passed by, carried by servants and protected by soldiers. Everyone bowed to the prince. “I wish I were a prince,” Tasaku said, and he became one.",
    "But the summer sun burned his face, and even the prince could not stop it. “The sun is more powerful than I am. I wish I were the sun!” And he became the sun, burning the fields so badly that the farmers cried.",
    "Then a dark cloud covered him, and his light could not reach the earth. “The cloud is stronger,” he thought. He became a cloud and poured rain until rivers flooded the villages.",
    "Yet there was one thing that the floods could not move: the great mountain. “Nothing is stronger than the mountain,” he declared, so he became the mountain.",
    "He felt proud and unshakeable, until he felt a strange tap-tap-tap at his feet. A tiny man was cutting stones from him, piece by piece.",
    "“What could be more powerful than a mountain?” he cried. Looking down, he saw that it was a stonecutter.",
    "“I wish I were that man,” he whispered. And once again, he was Tasaku the stonecutter, and he was happy with his life at last.",
  ],
};

export const CH6: Level = {
  id: "sma10-ch6",
  title: "Chapter 6 — Stories That Teach",
  description: "Analyse narratives in depth: plot, conflict, characterisation, point of view and theme; use adverbial clauses of concession, cause and result; retell and write a narrative.",
  targetScore: "Reading · Structure · Writing",
  cover: ["mountain", "owl-read", "cloud"],
  pretest: {
    id: "sma10-c6-pre",
    title: "Chapter 6 Pretest",
    passPercent: 0,
    questions: [
      pick("sma10-c6-pre1", "A conflict between a character and nature is called…", ["person vs. nature", "person vs. self", "person vs. society", "person vs. technology"], 0, "Konflik dengan alam."),
      listen("sma10-c6-pre2", voice("Although the fox was hungry, he refused to eat the sour grapes."), "Listen. What did the fox refuse to do?", ["eat the grapes", "look for food", "climb the tree", "sleep"], 0, "Refused to eat the grapes."),
      trPick("sma10-c6-pre3", "“Sudut pandang” (in a story) in English is…", ["point of view", "point of see", "view angle", "side look"], 0, "Point of view."),
      pick("sma10-c6-pre4", "The lesson or central idea of a story is the…", ["theme", "setting", "plot", "climax"], 0, "Theme = tema cerita."),
      pick("sma10-c6-pre5", "The rain was ___ heavy that the river overflowed.", ["so", "such", "too", "very"], 0, "So + adjective + that."),
    ],
  },
  lessons: [
    {
      id: "sma10-c6-l1",
      skill: "reading",
      title: "Reading: The Stonecutter",
      summary: "Plot structure, circular stories and theme.",
      passages: [STONE],
      sections: [
        {
          title: "The tale",
          blocks: [
            { type: "passage", passage: STONE },
            audio("Listen to the story", say(["narrator", STONE.lines.slice(0, 5).join(" ")], ["narrator", STONE.lines.slice(5).join(" ")])),
            vocab([["merchant", "saudagar/pedagang", "money"], ["grant (a wish)", "mengabulkan", "shape-star"], ["bow", "membungkuk/memberi hormat", "body"], ["unshakeable", "tak tergoyahkan", "mountain"], ["at last", "akhirnya", "happy"]], "Story words"),
          ],
        },
        {
          title: "Plot analysis",
          blocks: [
            table(["Plot stage", "In the story", "Lines"], [["Exposition", "Tasaku, a poor but content stonecutter", "1"], ["Rising action", "series of wishes: merchant → prince → sun → cloud", "2–5"], ["Climax", "he becomes the mountain and is cut by a stonecutter", "6–8"], ["Falling action / Resolution", "he wishes to be himself again and is happy", "9"]]),
            text("Cerita ini berstruktur **melingkar (circular)**: berakhir di titik awal. Tema: **kebahagiaan datang dari menerima diri sendiri**; setiap kekuatan selalu ada yang lebih kuat."),
            tryIt(pick("sma10-c6-l1-try1", "What was Tasaku's first wish?", ["to be rich", "to be the sun", "to be a prince"], 0, "Baris 2.", { passageId: STONE.id })),
          ],
        },
      ],
      checkpoint: [
        pick("sma10-c6-l1-c1", "Why did Tasaku want to be the sun?", ["The sun burned his face and even the prince couldn't stop it.", "He was cold.", "He wanted to help the farmers."], 0, "Baris 4.", { passageId: STONE.id }),
        pick("sma10-c6-l1-c2", "What happened when he was a cloud?", ["Rivers flooded the villages.", "The fields became green.", "He became rich."], 0, "Baris 5.", { passageId: STONE.id }),
        fill("sma10-c6-l1-c3", "Complete.", "He felt proud and", ", until he felt a strange tap-tap-tap at his feet.", ["unshakeable"], "Baris 7.", { passageId: STONE.id }),
        pickMany("sma10-c6-l1-c4", "Choose ALL the things Tasaku became.", ["a merchant", "a prince", "the sun", "a river"], [0, 1, 2], "Ia tidak menjadi sungai.", { passageId: STONE.id }),
        pick("sma10-c6-l1-c5", "Why is the ending ironic?", ["The weakest-looking person, a stonecutter, could break the strongest thing.", "He became richer than the prince.", "The mountain was made of gold."], 0, "Ironi situasional.", { passageId: STONE.id, hots: true }),
        pick("sma10-c6-l1-c6", "What is the best statement of the theme?", ["True contentment comes from accepting who you are.", "Mountains are stronger than people.", "Always try to become rich."], 0, "Tema cerita.", { passageId: STONE.id, hots: true }),
      ],
    },
    {
      id: "sma10-c6-l2",
      skill: "structure",
      title: "Adverbial Clauses in Stories",
      summary: "Concession (although, even though, despite), cause (because, since, as), result (so … that, such … that) and purpose (so that).",
      sections: [
        {
          title: "Linking ideas",
          blocks: [
            table(["Meaning", "Connector", "Example"], [["Concession (meskipun)", "although / even though + clause", "Although his work was hard, he earned enough."], ["", "despite / in spite of + noun / -ing", "Despite being poor, he was happy."], ["Cause (karena)", "because / since / as + clause", "As the sun was too hot, he wished to be the sun."], ["", "because of / due to + noun", "The villages flooded because of the rain."], ["Result (sehingga)", "so + adj/adv + that", "The sun was so hot that the fields dried up."], ["", "such + (a) adj + noun + that", "It was such a heavy storm that the bridge collapsed."], ["Purpose (agar)", "so that / in order to", "He worked hard so that his family could eat."]]),
            examples([{ wrong: "Despite he was poor, he was happy.", right: "Although he was poor, he was happy. / Despite being poor, he was happy." }, { wrong: "It was so a hot day that…", right: "It was such a hot day that… / The day was so hot that…" }], "Common mistakes"),
          ],
        },
        {
          title: "Practice with a fable",
          blocks: [
            audio("The Ant and the Grasshopper", say(["narrator", "Although summer was long and sunny, the ant worked every day so that she would have food for the winter."], ["narrator", "The grasshopper, however, sang all day because he thought there was plenty of food."], ["narrator", "When winter came, it was so cold that nothing grew. Despite his beautiful songs, the grasshopper had nothing to eat."], ["narrator", "The ant shared a little of her food, but she said, “Next summer, work as well as sing.”"])),
            tryIt(pick("sma10-c6-l2-try1", "Why did the ant work every day?", ["so that she would have food for the winter", "because she liked singing", "despite the cold"], 0, "So that = tujuan.")),
            repeat(["Although it was raining, they kept walking.", "Despite the danger, she jumped into the river.", "The story was so sad that I cried.", "He saved money so that he could buy a boat."]),
          ],
        },
      ],
      checkpoint: [
        listen("sma10-c6-l2-c1", voice("Even though the princess was rich, she felt lonely in the palace."), "Listen. How did the princess feel?", ["lonely", "excited", "angry"], 0, "Even though = meskipun."),
        pick("sma10-c6-l2-c2", "___ the heavy rain, the farmers continued working.", ["Despite", "Although", "Because"], 0, "Despite + noun."),
        pick("sma10-c6-l2-c3", "It was ___ a long journey that the horse collapsed.", ["such", "so", "very"], 0, "Such + a + adj + noun."),
        fill("sma10-c6-l2-c4", "Complete: The giant was ___ tall that he could touch the clouds.", "The giant was", "tall that he could touch the clouds.", ["so"], "So + adjective + that."),
        trPick("sma10-c6-l2-c5", "“Meskipun lelah, ia terus berlari.” in English is…", ["Although he was tired, he kept running.", "Despite he was tired, he kept running.", "Because tired, he kept running."], 0, "Although + klausa."),
        pick("sma10-c6-l2-c6", "Combine: “He was weak. He defeated the giant.”", ["In spite of being weak, he defeated the giant.", "Because he was weak, he defeated the giant.", "He was so weak that he defeated the giant."], 0, "Konsesi, bukan sebab.", { hots: true }),
      ],
    },
    {
      id: "sma10-c6-l3",
      skill: "writing",
      title: "Character, Point of View and Retelling",
      summary: "Analysing characterisation and point of view; rewriting a story from another perspective.",
      sections: [
        {
          title: "Characters and narrators",
          blocks: [
            table(["Concept", "Meaning", "Example"], [["Direct characterisation", "penulis menyebut sifat langsung", "Tasaku was proud."], ["Indirect characterisation", "sifat terlihat dari tindakan/ucapan", "He wished again and again (= never satisfied)."], ["First-person POV", "narator = tokoh (I)", "I cut stones every day…"], ["Third-person limited", "narator tahu pikiran satu tokoh", "He thought the cloud was stronger."], ["Third-person omniscient", "narator tahu pikiran semua tokoh", "The farmers feared, while Tasaku felt proud…"]]),
            pics([["cloud", "the cloud"], ["mountain", "the mountain"], ["rain", "the farmers' fields"], ["owl-think", "the narrator"]], "Whose story is it?"),
          ],
        },
        {
          title: "Rewrite a story",
          blocks: [
            tip("Menulis ulang dari **sudut pandang tokoh lain** melatih empati dan kreativitas. Bayangkan: bagaimana perasaan para petani saat Tasaku menjadi matahari? Atau buaya dalam cerita Kancil?"),
            writing({
              id: "sma10-c6-l3-write",
              title: "A new point of view",
              prompt: "Retell a folktale or fable you know (e.g. The Stonecutter, Kancil and the Crocodiles, Malin Kundang, The Ant and the Grasshopper) from the first-person point of view of a different character. Include a clear plot, at least three adverbial clauses and a theme.",
              image: "owl-read",
              minWords: 220,
              maxWords: 350,
              tips: ["Choose a minor character or an object as the narrator.", "Exposition: introduce yourself and the setting.", "Rising action: what you saw and felt.", "Climax and resolution from your view.", "Use although, despite, so…that, so that."],
              models: [{ label: "Example", text: "I Am the Mountain\nFor thousands of years, I have stood above the village, silent and patient. Although the wind and rain have tried to wear me down, I have never moved.\nEvery morning, a small man named Tasaku climbs my side and cuts a few stones from me. I do not mind. His tapping is so gentle that it feels like a friend knocking on my door.\nOne summer, Tasaku disappeared. Instead, I saw a strange, angry sun. It burned the rice fields so badly that the farmers cried. Then a dark cloud came and rained for days. The rivers rose so high that whole houses floated away. Despite all their power, neither the sun nor the cloud could move me.\nThen, one morning, I felt something unusual. I had become proud and heavy with someone else's pride. Inside me, a voice said, “Nothing is stronger than me!” But at my feet, a tiny stonecutter was working, piece by piece.\nSuddenly, the proud voice inside me cried out, and I felt lighter. When I looked down again, Tasaku was back, smiling as he lifted his hammer.\nI have learned that strength is not about being the biggest. Even a mountain can be changed by small, steady work." }],
              rubric: ["I used a consistent first-person point of view.", "My plot has exposition, rising action, climax and resolution.", "I used at least three adverbial clauses correctly.", "I showed character through actions and thoughts.", "My story has a clear theme."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sma10-c6-l3-c1", "“He wished again and again.” This is an example of…", ["indirect characterisation", "direct characterisation", "setting"], 0, "Sifat tersirat dari tindakan."),
        pick("sma10-c6-l3-c2", "A story narrated with “I” uses…", ["first-person point of view", "third-person omniscient", "second-person"], 0, "Sudut pandang orang pertama."),
        arrange("sma10-c6-l3-c3", "Put the words in order.", "Despite all their power they could not move me", "Despite + noun phrase."),
        fill("sma10-c6-l3-c4", "Complete: The narrator knows every character's thoughts. This is third-person ___ .", "The narrator knows every character's thoughts. This is third-person", ".", ["omniscient"], "Mahatahu = omniscient."),
        trPick("sma10-c6-l3-c5", "“Penokohan” in English is…", ["characterisation", "characteristic", "character set"], 0, "Characterisation."),
        pick("sma10-c6-l3-c6", "Why might a writer retell a story from the villain's point of view?", ["to help readers understand the villain's motives and feelings", "to make the story shorter", "to remove the conflict"], 0, "Empati dan kompleksitas tokoh.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma10-c6-post",
    title: "Chapter 6 Posttest",
    passPercent: 70,
    passages: [STONE],
    questions: [
      pick("sma10-c6-post1", "___ he had everything, the king was never satisfied.", ["Although", "Despite", "Because of", "So that"], 0, "Although + klausa."),
      listen("sma10-c6-post2", voice("The flood was so strong that it carried away the bridge."), "Listen. What happened to the bridge?", ["The flood carried it away.", "It was repaired.", "It was painted.", "Nothing happened."], 0, "So … that = akibat."),
      trPick("sma10-c6-post3", "“Alur” (cerita) in English is…", ["plot", "plan", "plate", "plant"], 0, "Alur = plot."),
      pick("sma10-c6-post4", "He trained every day ___ he could win the race.", ["so that", "although", "despite", "such"], 0, "Tujuan → so that."),
      arrange("sma10-c6-post5", "Put the words in order.", "It was such a hot day that the river dried up", "Such + a + adj + noun + that."),
      pick("sma10-c6-post6", "What did the farmers do when Tasaku was the sun?", ["They cried.", "They celebrated.", "They moved to the mountain.", "They bowed."], 0, "Baris 4.", { passageId: STONE.id }),
      match("sma10-c6-post7", "Match the plot stage and the event.", [["exposition", "Tasaku is a poor stonecutter"], ["rising action", "he becomes a prince, the sun, a cloud"], ["climax", "a stonecutter cuts the mountain"], ["resolution", "he becomes Tasaku again"]], "Struktur alur."),
      fill("sma10-c6-post8", "Complete.", "“What could be more powerful than a", "?” he cried.", ["mountain"], "Baris 8.", { passageId: STONE.id }),
      pick("sma10-c6-post9", "What type of conflict is MOST important in the story?", ["person vs. self (his endless desire)", "person vs. technology", "person vs. society only", "no conflict"], 0, "Konflik batin.", { passageId: STONE.id, hots: true }),
      pick("sma10-c6-post10", "How does the writer show that Tasaku's wishes harmed others?", ["by describing the burned fields and flooded villages", "by saying he was evil", "by showing him paying taxes", "by describing his house"], 0, "Karakterisasi tidak langsung melalui akibat.", { passageId: STONE.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Story Detectives",
    questions: [
      live("sma10-c6-live1", "Despite ___ poor, he was happy.", ["being", "he was", "be", "was"], 0, "happy"),
      live("sma10-c6-live2", "Story told with “I”:", ["first person", "third person", "second person", "no person"], 0, "owl-read"),
      live("sma10-c6-live3", "so hot ___ the fields dried", ["that", "than", "then", "which"], 0, "hot"),
      live("sma10-c6-live4", "“Tema” =", ["theme", "team", "time", "term"], 0, "owl-think", true),
      live("sma10-c6-live5", "Tasaku finally became…", ["himself again", "the sun", "a prince", "a cloud"], 0, "mountain"),
      live("sma10-c6-live6", "Highest point of tension:", ["climax", "exposition", "setting", "theme"], 0, "target"),
      live("sma10-c6-live7", "Purpose connector:", ["so that", "although", "despite", "such"], 0, "question"),
      live("sma10-c6-live8", "Person vs. self =", ["inner conflict", "war", "storm", "robot"], 0, "sad"),
    ],
  },
};
