import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, writing } from "../kit";

// Grade 8 (SMP, Fase D). Chapter 1 — Celebrating Independence Day · Chapter 2 — Inspiring People

const AUGUST: Passage = {
  id: "smp8-c1-august",
  title: "Independence Day in My Village",
  pic: "flag",
  lines: [
    "Last year, my village celebrated Indonesia's Independence Day with a lot of fun competitions.",
    "A week before 17 August, we decorated the streets with red and white flags and lights.",
    "On the morning of 17 August, everyone gathered on the football field for the flag ceremony. I felt very proud when we sang “Indonesia Raya”.",
    "After the ceremony, the competitions began. First, the children joined the sack race and the marble-and-spoon race.",
    "Then, I took part in the cracker-eating contest. The crackers were hanging on a string, and we couldn't use our hands!",
    "I didn't win, but I laughed so much. My little brother won second prize in the sack race.",
    "In the afternoon, the adults climbed the greasy pinang tree to get the prizes at the top. It took them almost an hour.",
    "In the evening, we had a big dinner together and watched a traditional dance show. It was a day full of joy and togetherness.",
  ],
};

export const CH1: Level = {
  id: "smp8-ch1",
  title: "Chapter 1 — Celebrating Independence Day",
  description: "Tell about past events with the simple past (regular and irregular verbs, negatives, questions), use time connectors and write a recount of a celebration.",
  targetScore: "Structure · Reading · Writing",
  cover: ["flag", "fireworks", "trophy"],
  pretest: {
    id: "smp8-c1-pre",
    title: "Chapter 1 Pretest",
    passPercent: 0,
    questions: [
      pick("smp8-c1-pre1", "Indonesia ___ its independence on 17 August 1945.", ["proclaimed", "proclaims", "proclaiming", "is proclaim"], 0, "Peristiwa lampau → proclaimed."),
      listen("smp8-c1-pre2", voice("We didn't go to school on Independence Day because we joined the ceremony in the village."), "Listen. Where did they join the ceremony?", ["in the village", "at school", "at the palace", "on TV"], 0, "In the village."),
      trPick("smp8-c1-pre3", "“Lomba balap karung” in English is…", ["sack race", "bag race", "rice race", "sack ball"], 0, "Balap karung = sack race."),
      pick("smp8-c1-pre4", "Where ___ you watch the parade last year?", ["did", "do", "were", "was"], 0, "Pertanyaan lampau → did."),
      pick("smp8-c1-pre5", "The colours of the Indonesian flag are…", ["red and white", "red and blue", "white and green", "yellow and red"], 0, "Merah putih.", { image: "flag" }),
    ],
  },
  lessons: [
    {
      id: "smp8-c1-l1",
      skill: "vocabulary",
      title: "Independence Day Traditions",
      summary: "Words for ceremonies, competitions and decorations.",
      sections: [
        {
          title: "Ceremonies and decorations",
          blocks: [
            table(["Word", "Meaning"], [["flag ceremony", "upacara bendera"], ["flag raising", "pengibaran bendera"], ["national anthem", "lagu kebangsaan"], ["proclamation", "proklamasi"], ["heroes / freedom fighters", "pahlawan / pejuang kemerdekaan"], ["parade / carnival", "pawai / karnaval"], ["decorate", "menghias"], ["banner", "spanduk"], ["arch / gate", "gapura"]]),
            pics([["flag", "red and white flag"], ["fireworks", "fireworks"], ["lantern", "street lights"], ["trophy", "prizes"]]),
          ],
        },
        {
          title: "Traditional competitions",
          blocks: [
            table(["Competition", "Indonesian name", "How to play"], [["sack race", "balap karung", "Jump to the finish line inside a sack."], ["marble-and-spoon race", "lomba kelereng", "Hold a spoon in your mouth with a marble on it, and walk fast."], ["cracker-eating contest", "lomba makan kerupuk", "Eat a hanging cracker without hands."], ["greasy pole climbing", "panjat pinang", "Climb an oily pole as a team to get prizes."], ["tug of war", "tarik tambang", "Two teams pull a rope."], ["putting a pen in a bottle", "memasukkan pensil ke botol", "Lower a pen on a string into a bottle."]]),
            repeat(["We decorated the streets with flags.", "The children joined the sack race.", "Our team won the tug of war!"]),
            tryIt(pick("smp8-c1-l1-try1", "In which game do two teams pull a rope?", ["tug of war", "sack race", "cracker-eating contest"], 0, "Tarik tambang = tug of war.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp8-c1-l1-c1", voice("Everybody stood still during the national anthem."), "Listen. When did everybody stand still?", ["during the national anthem", "during the sack race", "during dinner"], 0, "National anthem."),
        match("smp8-c1-l1-c2", "Match the English and Indonesian names.", [["tug of war", "tarik tambang"], ["greasy pole climbing", "panjat pinang"], ["sack race", "balap karung"], ["parade", "pawai"]], "Nama lomba.", { translate: true }),
        trPick("smp8-c1-l1-c3", "“Menghias” in English is…", ["decorate", "dedicate", "declare"], 0, "Menghias = decorate."),
        fill("smp8-c1-l1-c4", "Complete: The ___ ceremony starts at seven.", "The", "ceremony starts at seven.", ["flag"], "Flag ceremony."),
        pick("smp8-c1-l1-c5", "Which game needs teamwork the most?", ["greasy pole climbing", "cracker-eating contest", "marble-and-spoon race"], 0, "Panjat pinang butuh kerja sama tim."),
        pick("smp8-c1-l1-c6", "Why do Indonesians hold these competitions on 17 August?", ["to celebrate freedom together and build unity", "to sell crackers", "because schools are closed for a month"], 0, "Merayakan kemerdekaan bersama.", { hots: true }),
      ],
    },
    {
      id: "smp8-c1-l2",
      skill: "structure",
      title: "The Simple Past",
      summary: "Regular and irregular verbs, negatives, questions and pronunciation of -ed.",
      sections: [
        {
          title: "Forms",
          blocks: [
            table(["", "Example"], [["Positive (regular)", "We decorated the streets."], ["Positive (irregular)", "My brother won second prize."], ["be", "I was proud. They were excited."], ["Negative", "I didn't win. It wasn't easy."], ["Question", "Did you join the race? — Yes, I did."], ["Wh- question", "What did you eat? Where were you?"]]),
            table(["-ed sound", "After", "Examples"], [["/t/", "p, k, s, sh, ch, f", "jumped, walked, washed, watched"], ["/d/", "vowels and b, g, l, m, n, v, z…", "played, cleaned, climbed, lived"], ["/ɪd/", "t, d", "wanted, decorated, needed, started"]]),
            repeat(["jumped", "watched", "played", "climbed", "decorated", "wanted"]),
          ],
        },
        {
          title: "Irregular verbs",
          blocks: [
            table(["Base", "Past", "Base", "Past"], [["begin", "began", "feel", "felt"], ["bring", "brought", "fight", "fought"], ["buy", "bought", "hang", "hung"], ["choose", "chose", "hold", "held"], ["eat", "ate", "lose", "lost"], ["fall", "fell", "stand", "stood"], ["win", "won", "think", "thought"]]),
            examples([{ wrong: "Did you saw the parade?", right: "Did you see the parade?" }, { wrong: "We didn't went home early.", right: "We didn't go home early." }, { wrong: "I was join the race.", right: "I joined the race." }], "Common mistakes"),
            tryIt(pick("smp8-c1-l2-try1", "The freedom fighters ___ bravely for our country.", ["fought", "fighted", "fight"], 0, "Fight → fought.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp8-c1-l2-c1", voice("Our class bought a big flag and hung it in front of the classroom."), "Listen. What did the class do with the flag?", ["hung it in front of the classroom", "sold it", "lost it"], 0, "Bought … hung."),
        pick("smp8-c1-l2-c2", "Which -ed ending sounds /ɪd/?", ["started", "played", "watched"], 0, "Setelah t/d → /ɪd/."),
        fill("smp8-c1-l2-c3", "Complete: The competition ___ (begin) at nine.", "The competition", "at nine.", ["began"], "Begin → began."),
        match("smp8-c1-l2-c4", "Match.", [["bring", "brought"], ["think", "thought"], ["stand", "stood"], ["choose", "chose"]], "Irregular verbs."),
        trPick("smp8-c1-l2-c5", "“Apakah kamu menang?” (yesterday) in English is…", ["Did you win?", "Do you win?", "Did you won?"], 0, "Did + bentuk dasar."),
        pick("smp8-c1-l2-c6", "Find the mistake: “Yesterday we was very tired after the parade.”", ["“was” should be “were”", "“tired” should be “tire”", "There is no mistake."], 0, "We + were.", { hots: true }),
      ],
    },
    {
      id: "smp8-c1-l3",
      skill: "reading",
      title: "Reading: Independence Day in My Village",
      summary: "The structure of a recount text; writing about a celebration you joined.",
      passages: [AUGUST],
      sections: [
        {
          title: "A recount",
          blocks: [
            { type: "passage", passage: AUGUST },
            audio("Listen and read", say(["woman", AUGUST.lines.join(" ")])),
            table(["Part", "Function", "In the text"], [["Orientation", "who, when, where", "line 1"], ["Events", "kejadian berurutan dengan time connectors", "lines 2–7"], ["Re-orientation", "kesan atau ringkasan penutup", "line 8"]]),
            text("**Time connectors** membuat recount runtut: *A week before…, On the morning of…, After the ceremony…, First…, Then…, In the afternoon…, In the evening…, Finally…*"),
          ],
        },
        {
          title: "Write your recount",
          blocks: [
            tryIt(pick("smp8-c1-l3-try1", "What did they do a week before 17 August?", ["decorated the streets", "climbed the pinang tree", "watched a dance show"], 0, "Baris 2.", { passageId: AUGUST.id })),
            writing({
              id: "smp8-c1-l3-write",
              title: "A celebration I remember",
              prompt: "Write a recount about a celebration you joined (Independence Day, a school anniversary, a festival, Eid, Christmas, Nyepi, a wedding…). Use the recount structure and at least five time connectors.",
              image: "fireworks",
              minWords: 120,
              maxWords: 250,
              tips: ["Orientation: Last …, my … celebrated …", "Events: First, … Then, … After that, … In the evening, …", "Feelings: I felt … because …", "Re-orientation: It was …"],
              models: [{ label: "Example", text: "Last October, my school celebrated its 25th anniversary. The celebration lasted for three days.\nOn the first day, we had a fun run around the neighbourhood. More than five hundred students and teachers joined it. I didn't run very fast, but I finished the race!\nOn the second day, each class performed on the stage. My class performed a saman dance from Aceh. We practised for a whole month, so we were nervous but ready. When we finished, everyone clapped and cheered.\nOn the last day, there was a bazaar. My friends and I sold homemade iced drinks, and we sold out before noon.\nIt was a tiring but wonderful celebration. I felt proud of my school and closer to my classmates." }],
              rubric: ["I wrote an orientation (who, when, where).", "Events are in order with at least five time connectors.", "I used the simple past correctly, including irregular verbs.", "I included my feelings.", "I wrote a re-orientation."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("smp8-c1-l3-c1", "Where did the flag ceremony take place?", ["on the football field", "at school", "at the village office"], 0, "Baris 3.", { passageId: AUGUST.id }),
        pick("smp8-c1-l3-c2", "Why was the cracker-eating contest difficult?", ["They couldn't use their hands.", "The crackers were too big.", "It was raining."], 0, "Baris 5.", { passageId: AUGUST.id }),
        fill("smp8-c1-l3-c3", "Complete.", "My little brother won second prize in the", "race.", ["sack"], "Baris 6.", { passageId: AUGUST.id }),
        pickMany("smp8-c1-l3-c4", "Choose ALL the events that happened in the evening.", ["a big dinner", "a traditional dance show", "the flag ceremony", "the sack race"], [0, 1], "Baris 8.", { passageId: AUGUST.id }),
        pick("smp8-c1-l3-c5", "“It took them almost an hour.” What does this suggest about the pinang competition?", ["It was very difficult.", "It was very easy.", "It was boring."], 0, "Butuh waktu lama = sulit.", { passageId: AUGUST.id, hots: true }),
        pick("smp8-c1-l3-c6", "Which word best summarises the writer's feelings?", ["joyful", "disappointed", "frightened"], 0, "Baris 8: full of joy.", { passageId: AUGUST.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp8-c1-post",
    title: "Chapter 1 Posttest",
    passPercent: 70,
    passages: [AUGUST],
    questions: [
      pick("smp8-c1-post1", "Our team ___ the tug of war last year.", ["won", "wins", "winned", "win"], 0, "Win → won."),
      listen("smp8-c1-post2", say(["man", "Did you watch the carnival yesterday?"], ["woman", "No, I didn't. I was at my grandmother's house."]), "Listen. Why didn't she watch the carnival?", ["She was at her grandmother's house.", "She was sick.", "She was in the carnival.", "It was raining."], 0, "I was at my grandmother's house."),
      trPick("smp8-c1-post3", "“Lagu kebangsaan” in English is…", ["national anthem", "national song day", "nation music", "anthem nation"], 0, "National anthem."),
      pick("smp8-c1-post4", "The word “watched” ends with the sound…", ["/t/", "/d/", "/ɪd/", "/s/"], 0, "Setelah ch → /t/."),
      arrange("smp8-c1-post5", "Put the words in order.", "What did you do on Independence Day", "Wh- + did + subject + verb."),
      pick("smp8-c1-post6", "Who climbed the pinang tree?", ["the adults", "the children", "the writer", "the teachers only"], 0, "Baris 7.", { passageId: AUGUST.id }),
      match("smp8-c1-post7", "Match the part of the recount.", [["Orientation", "who, when, where"], ["Events", "what happened in order"], ["Re-orientation", "closing comment"]], "Struktur recount."),
      fill("smp8-c1-post8", "Complete: We ___ (not/see) the fireworks because it rained.", "We", "the fireworks because it rained.", ["didn't see", "did not see"], "Didn't + see."),
      pick("smp8-c1-post9", "Which line shows the writer's pride as an Indonesian?", ["line 3", "line 5", "line 6", "line 7"], 0, "Baris 3: I felt very proud.", { passageId: AUGUST.id, hots: true }),
      pick("smp8-c1-post10", "What is the main purpose of the text?", ["to tell the reader about a past experience", "to explain how to climb a pole", "to persuade people to buy flags", "to describe a village"], 0, "Recount = menceritakan pengalaman.", { passageId: AUGUST.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Merdeka!",
    questions: [
      live("smp8-c1-live1", "Independence Day date:", ["17 August", "1 June", "28 October", "10 November"], 0, "flag"),
      live("smp8-c1-live2", "win → …", ["won", "winned", "wan", "win"], 0, "trophy"),
      live("smp8-c1-live3", "“Tarik tambang” =", ["tug of war", "sack race", "pole climbing", "rope jump"], 0, "blocks", true),
      live("smp8-c1-live4", "-ed sound in “wanted”:", ["/ɪd/", "/t/", "/d/", "silent"], 0, "question"),
      live("smp8-c1-live5", "Did you ___ the race?", ["join", "joined", "joins", "joining"], 0, "run"),
      live("smp8-c1-live6", "fight → …", ["fought", "fighted", "fit", "faught"], 0, "flag"),
      live("smp8-c1-live7", "Recount ending part:", ["re-orientation", "orientation", "complication", "goal"], 0, "report"),
      live("smp8-c1-live8", "Night sky celebration:", ["fireworks", "rainbow", "sunrise", "clouds"], 0, "fireworks"),
    ],
  },
};

const HABIBIE: Passage = {
  id: "smp8-c2-habibie",
  title: "B.J. Habibie: The Father of Indonesian Technology",
  pic: "plane",
  lines: [
    "Bacharuddin Jusuf Habibie was born in Parepare, South Sulawesi, on 25 June 1936.",
    "When he was a child, he loved reading and asking questions. He was especially interested in how things work.",
    "His father died when he was only fourteen, but his mother worked hard so that he could continue his education.",
    "In 1955, he went to Germany to study aeronautical engineering at RWTH Aachen University.",
    "After he graduated, he worked for an aircraft company in Germany. He discovered a way to calculate cracks in aeroplane wings, which made flying safer.",
    "In 1974, he came back to Indonesia and later led the national aircraft industry. His team built the N-250 Gatotkaca, a plane designed by Indonesians.",
    "He became the third President of Indonesia in 1998. During his short presidency, he gave more freedom to the press.",
    "Habibie passed away on 11 September 2019. Many young Indonesians still see him as an inspiration to love science.",
  ],
};

export const CH2: Level = {
  id: "smp8-ch2",
  title: "Chapter 2 — Inspiring People",
  description: "Talk about people's lives with the simple past, use when-clauses and was born, compare facts and opinions, and read and write a short biography.",
  targetScore: "Reading · Writing · Speaking",
  cover: ["graduation", "plane", "trophy"],
  pretest: {
    id: "smp8-c2-pre",
    title: "Chapter 2 Pretest",
    passPercent: 0,
    questions: [
      pick("smp8-c2-pre1", "R.A. Kartini ___ born in Jepara in 1879.", ["was", "is", "were", "did"], 0, "Was born."),
      listen("smp8-c2-pre2", voice("When she was ten, she won her first badminton tournament."), "Listen. How old was she when she won her first tournament?", ["ten", "twelve", "twenty", "seven"], 0, "When she was ten."),
      trPick("smp8-c2-pre3", "“Riwayat hidup / biografi” in English is…", ["biography", "geography", "autograph", "biology"], 0, "Biography."),
      pick("smp8-c2-pre4", "A person who invents new things is an…", ["inventor", "investor", "invader", "interviewer"], 0, "Penemu = inventor."),
      pick("smp8-c2-pre5", "Which sentence is an OPINION?", ["She was the greatest singer ever.", "She was born in 1980.", "She released three albums.", "She lives in Bandung."], 0, "Opini = penilaian pribadi."),
    ],
  },
  lessons: [
    {
      id: "smp8-c2-l1",
      skill: "vocabulary",
      title: "Life Events and Achievements",
      summary: "Words to tell someone's life story.",
      sections: [
        {
          title: "Life events",
          blocks: [
            table(["Life event", "Meaning"], [["be born", "lahir"], ["grow up", "tumbuh besar"], ["go to / graduate from university", "kuliah / lulus kuliah"], ["get a job / work as", "mendapat pekerjaan / bekerja sebagai"], ["get married", "menikah"], ["move to", "pindah ke"], ["retire", "pensiun"], ["pass away", "meninggal dunia"]]),
            table(["Achievement", "Meaning"], [["win an award / a medal", "memenangkan penghargaan / medali"], ["discover", "menemukan (yang sudah ada)"], ["invent", "menciptakan (yang belum ada)"], ["found / establish", "mendirikan"], ["become famous for", "terkenal karena"], ["inspire", "menginspirasi"]]),
          ],
        },
        {
          title: "Inspiring Indonesians",
          blocks: [
            pics([["badminton", "Susi Susanti — Olympic gold, 1992"], ["school", "Ki Hajar Dewantara — founded Taman Siswa"], ["open-book", "R.A. Kartini — fought for girls' education"], ["plane", "B.J. Habibie — aircraft engineer"]]),
            vocab([["athlete", "atlet", "badminton"], ["scientist", "ilmuwan", "question"], ["educator", "pendidik", "teacher-man"], ["engineer", "insinyur", "plane"]], "People"),
            tryIt(pick("smp8-c2-l1-try1", "Susi Susanti won Indonesia's first Olympic gold medal in…", ["badminton", "swimming", "football"], 0, "Bulu tangkis, Barcelona 1992.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp8-c2-l1-c1", voice("Ki Hajar Dewantara founded Taman Siswa in 1922 so that ordinary children could go to school."), "Listen. Why did he found Taman Siswa?", ["so that ordinary children could go to school", "to build planes", "to train athletes"], 0, "So that ordinary children could go to school."),
        match("smp8-c2-l1-c2", "Match the verb and the meaning.", [["invent", "menciptakan"], ["discover", "menemukan"], ["found", "mendirikan"], ["retire", "pensiun"]], "Kata kerja biografi.", { translate: true }),
        pick("smp8-c2-l1-c3", "Thomas Edison ___ the practical light bulb.", ["invented", "discovered", "founded"], 0, "Menciptakan sesuatu yang baru → invent."),
        fill("smp8-c2-l1-c4", "Complete: She graduated ___ the University of Indonesia.", "She graduated", "the University of Indonesia.", ["from"], "Graduate from."),
        trPick("smp8-c2-l1-c5", "“Dia meninggal dunia pada 2019.” (polite) in English is…", ["He passed away in 2019.", "He passed by in 2019.", "He went away in 2019."], 0, "Pass away = meninggal (sopan)."),
        pick("smp8-c2-l1-c6", "Columbus reached America in 1492, but people already lived there. Which verb is better?", ["He reached / arrived in America.", "He invented America.", "He founded America."], 0, "Benua tidak diciptakan; lebih tepat 'reached'.", { hots: true }),
      ],
    },
    {
      id: "smp8-c2-l2",
      skill: "structure",
      title: "When-Clauses, Fact and Opinion",
      summary: "Linking life events with when, after, before; telling facts from opinions.",
      sections: [
        {
          title: "Linking events",
          blocks: [
            table(["Connector", "Example"], [["When …", "When he was a child, he loved reading."], ["After …", "After he graduated, he worked in Germany."], ["Before …", "Before she became famous, she was a street singer."], ["At the age of …", "At the age of 17, she won a world championship."], ["In + year", "In 1998, he became president."], ["Later / Then", "Later, he led the aircraft industry."]]),
            tip("Jika klausa **when/after/before** di depan, beri **koma**: *When he was young, he…*. Jika di belakang, tidak perlu koma: *He loved reading when he was young.*"),
          ],
        },
        {
          title: "Fact or opinion?",
          blocks: [
            table(["Fact", "Opinion"], [["can be checked (tanggal, angka, peristiwa)", "perasaan, penilaian, keyakinan"], ["Habibie was born in 1936.", "Habibie was the smartest Indonesian ever."], ["The N-250 first flew in 1995.", "The N-250 was a beautiful plane."]]),
            text("Kata penanda opini: **I think, I believe, in my opinion, the best, the greatest, beautiful, amazing, should**."),
            audio("A debate in class", say(["man", "I think Kartini is the most important hero for women."], ["woman", "That's your opinion. But it's a fact that she wrote letters about girls' education."], ["man", "True. Her letters were published in 1911 as a book."], ["woman", "And in my opinion, that book still inspires girls today."])),
            tryIt(pick("smp8-c2-l2-try1", "“Her letters were published in 1911.” This is a…", ["fact", "opinion", "question"], 0, "Bisa dicek → fakta.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp8-c2-l2-c1", voice("After she finished high school, she moved to Jakarta to study music."), "Listen. What did she do after high school?", ["moved to Jakarta to study music", "got married", "became a teacher"], 0, "After she finished high school…"),
        pick("smp8-c2-l2-c2", "___ he was twenty, he started his own company.", ["When", "Before", "So"], 0, "When he was twenty."),
        pick("smp8-c2-l2-c3", "Which is an opinion?", ["She is the most inspiring athlete in the world.", "She won two gold medals.", "She was born in Tasikmalaya."], 0, "Penilaian pribadi."),
        arrange("smp8-c2-l2-c4", "Put the words in order.", "He became a teacher after he graduated", "Klausa after di belakang tanpa koma."),
        trPick("smp8-c2-l2-c5", "“Pada usia 17 tahun” in English is…", ["At the age of 17", "In the age 17", "On 17 age"], 0, "At the age of."),
        pick("smp8-c2-l2-c6", "Which sentence uses a comma correctly?", ["Before she became a doctor, she worked as a nurse.", "Before, she became a doctor she worked as a nurse.", "Before she became a doctor she, worked as a nurse."], 0, "Koma setelah klausa before di depan.", { hots: true }),
      ],
    },
    {
      id: "smp8-c2-l3",
      skill: "reading",
      title: "Reading: B.J. Habibie",
      summary: "Read a short biography and write one about someone who inspires you.",
      passages: [HABIBIE],
      sections: [
        {
          title: "A biography",
          blocks: [
            { type: "passage", passage: HABIBIE },
            audio("Listen and read", say(["man", HABIBIE.lines.join(" ")])),
            table(["Part", "Function"], [["Orientation", "siapa tokohnya, lahir di mana dan kapan"], ["Events", "peristiwa penting secara kronologis"], ["Re-orientation", "akhir hidup / warisan / mengapa ia menginspirasi"]]),
          ],
        },
        {
          title: "Write and present a biography",
          blocks: [
            tryIt(pick("smp8-c2-l3-try1", "Where was Habibie born?", ["Parepare, South Sulawesi", "Jakarta", "Aachen, Germany"], 0, "Baris 1.", { passageId: HABIBIE.id })),
            writing({
              id: "smp8-c2-l3-write",
              title: "Someone who inspires me",
              prompt: "Write a short biography of a person who inspires you (a national hero, a scientist, an athlete, an artist, or someone in your family). Use at least four time expressions and include one opinion clearly marked as your opinion.",
              image: "trophy",
              minWords: 120,
              maxWords: 250,
              tips: ["… was born in … on …", "When he/she was …, …", "In …, he/she …", "After …, he/she …", "He/She is famous for …", "In my opinion, …"],
              models: [{ label: "Example", text: "Susi Susanti was born in Tasikmalaya, West Java, on 11 February 1971. When she was seven, she started playing badminton at a small club near her house. At the age of fourteen, she moved to Jakarta to train at a national club.\nIn 1989, she won the Sudirman Cup with the Indonesian team. Three years later, at the Barcelona Olympics, she won the women's singles gold medal. It was Indonesia's first Olympic gold medal ever. On the same day, Alan Budikusuma won the men's gold.\nAfter she retired, she started a sports equipment business and later worked to develop young players.\nIn my opinion, Susi Susanti is a true hero because she showed the world that Indonesians can be champions with hard work and discipline." }],
              rubric: ["I gave the person's birth date and place.", "I told events in chronological order with time expressions.", "I used the simple past and when/after clauses correctly.", "I wrote one clear opinion with “In my opinion”.", "I explained why this person inspires me."],
            }),
            speaking({
              id: "smp8-c2-l3-say",
              title: "Present your hero",
              prompt: "Present your biography to the class in about one and a half minutes. Don't read everything. Look at your notes and speak naturally.",
              image: "microphone",
              prepSeconds: 60,
              seconds: 90,
              tips: ["Today I'd like to talk about …", "He/She was born …", "The most important moment in his/her life was …", "I admire him/her because …"],
              models: [{ label: "Example", text: "Today I'd like to talk about Ki Hajar Dewantara. He was born in Yogyakarta in 1889. When he was young, he wrote newspaper articles against Dutch colonial rule, so the government sent him into exile in the Netherlands. There, he learned a lot about education. When he came back, he founded Taman Siswa in 1922, a school for ordinary Indonesian children. Today, we celebrate National Education Day on his birthday, the second of May. I admire him because he believed that every child deserves to learn." }],
              rubric: ["I introduced the person clearly.", "I mentioned at least three important events in order.", "I spoke from notes, not by reading.", "I explained why I admire the person."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("smp8-c2-l3-c1", "What happened when Habibie was fourteen?", ["His father died.", "He went to Germany.", "He became president."], 0, "Baris 3.", { passageId: HABIBIE.id }),
        pick("smp8-c2-l3-c2", "What did he study in Germany?", ["aeronautical engineering", "medicine", "law"], 0, "Baris 4.", { passageId: HABIBIE.id }),
        fill("smp8-c2-l3-c3", "Complete.", "His team built the N-250", ", a plane designed by Indonesians.", ["Gatotkaca"], "Baris 6.", { passageId: HABIBIE.id }),
        pick("smp8-c2-l3-c4", "Why was his discovery about cracks in wings important?", ["It made flying safer.", "It made planes cheaper.", "It made planes bigger."], 0, "Baris 5.", { passageId: HABIBIE.id }),
        pickMany("smp8-c2-l3-c5", "Choose ALL the FACTS (not opinions) from the text.", ["He became president in 1998.", "He was born on 25 June 1936.", "He studied in Aachen.", "He was the best president ever."], [0, 1, 2], "Yang terakhir adalah opini.", { passageId: HABIBIE.id, hots: true }),
        pick("smp8-c2-l3-c6", "What can we learn from line 3?", ["Family support and hard work help us succeed.", "Mothers should not work.", "Education is not important."], 0, "Ibunya bekerja keras untuk pendidikannya.", { passageId: HABIBIE.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp8-c2-post",
    title: "Chapter 2 Posttest",
    passPercent: 70,
    passages: [HABIBIE],
    questions: [
      pick("smp8-c2-post1", "Where ___ your grandfather born?", ["was", "did", "is", "were"], 0, "Was born."),
      listen("smp8-c2-post2", voice("Before he became a famous chef, he washed dishes in a small restaurant for five years."), "Listen. What was his first job?", ["washing dishes", "cooking", "serving customers", "owning a restaurant"], 0, "He washed dishes."),
      trPick("smp8-c2-post3", "“Lulus dari” in English is…", ["graduate from", "graduate to", "pass for", "finish to"], 0, "Graduate from."),
      pick("smp8-c2-post4", "Which sentence is a FACT?", ["Kartini was born in 1879.", "Kartini was the bravest woman.", "Kartini's letters are beautiful.", "Everyone should love Kartini."], 0, "Tanggal bisa dicek."),
      arrange("smp8-c2-post5", "Put the words in order.", "When she was young she loved painting", "Klausa when di depan."),
      pick("smp8-c2-post6", "When did Habibie go back to Indonesia?", ["in 1974", "in 1955", "in 1998", "in 2019"], 0, "Baris 6.", { passageId: HABIBIE.id }),
      match("smp8-c2-post7", "Match the year and the event.", [["1936", "born in Parepare"], ["1955", "went to Germany"], ["1998", "became president"], ["2019", "passed away"]], "Kronologi."),
      fill("smp8-c2-post8", "Complete: He is famous ___ his work on aeroplanes.", "He is famous", "his work on aeroplanes.", ["for"], "Famous for."),
      pick("smp8-c2-post9", "Why is Habibie called “the Father of Indonesian Technology”?", ["He led Indonesia's aircraft industry and inspired science.", "He was the first president.", "He was born in Germany.", "He liked reading."], 0, "Baris 5–8.", { passageId: HABIBIE.id, hots: true }),
      pick("smp8-c2-post10", "Which sentence would be the best re-orientation for a biography?", ["Today, his ideas still inspire millions of young people.", "He was born in 1936.", "In 1955, he went abroad.", "He studied hard."], 0, "Re-orientation = warisan/kesan.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Hall of Heroes",
    questions: [
      live("smp8-c2-live1", "He ___ born in 1936.", ["was", "is", "did", "were"], 0, "num-1"),
      live("smp8-c2-live2", "Create something new:", ["invent", "discover", "retire", "graduate"], 0, "robot"),
      live("smp8-c2-live3", "Opinion signal:", ["In my opinion", "In 1945", "He was born", "She won"], 0, "owl-think"),
      live("smp8-c2-live4", "Susi Susanti's sport:", ["badminton", "football", "chess", "boxing"], 0, "badminton"),
      live("smp8-c2-live5", "“Meninggal dunia” (polite) =", ["pass away", "pass by", "go out", "fall down"], 0, "flower", true),
      live("smp8-c2-live6", "Habibie built…", ["planes", "ships", "cars", "phones"], 0, "plane"),
      live("smp8-c2-live7", "Graduate ___ university", ["from", "to", "at", "on"], 0, "graduation"),
      live("smp8-c2-live8", "Life story text:", ["biography", "recipe", "report", "invitation"], 0, "open-book"),
    ],
  },
};
