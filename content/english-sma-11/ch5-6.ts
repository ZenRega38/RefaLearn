import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, say, speaking, table, text, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 11 (SMA, Fase F). Chapter 5 — Media and Truth · Chapter 6 — Science and Innovation

const HOAX: Passage = {
  id: "sma11-c5-hoax",
  title: "How a Fake Story Went Viral",
  pic: "smartphone",
  lines: [
    "Last March, a message spread across family chat groups in several cities. It claimed that drinking hot lemon water every morning could cure dengue fever within three days.",
    "The message included a photo of a doctor in a white coat and said that the information came from “a famous hospital in Singapore”.",
    "Within a week, the message had been forwarded more than 200,000 times. Some people stopped taking their children to the clinic and relied on lemon water instead.",
    "Journalists from a fact-checking website decided to investigate. They found that the photo had been taken from a stock image website and that the hospital named in the message did not exist.",
    "When they contacted infectious-disease experts, the experts denied that lemon water had any effect on the dengue virus. One doctor warned that delaying treatment could be fatal.",
    "The fact-checkers also traced the first post to an online shop that sold lemon products. The owner later admitted that he had created the message to increase sales.",
    "Experts advise readers to ask three questions before sharing: Who is the source? What is the evidence? Who benefits if I believe this?",
    "Sharing false information may feel harmless, but as this case shows, it can put lives at risk.",
  ],
};

export const CH5: Level = {
  id: "sma11-ch5",
  title: "Chapter 5 — Media and Truth",
  description: "Read news critically, distinguish facts, opinions and misinformation, use reporting verbs (claim, deny, admit, warn) and write a fact-check article.",
  targetScore: "Reading · Structure · Writing",
  cover: ["smartphone", "report", "tv"],
  pretest: {
    id: "sma11-c5-pre",
    title: "Chapter 5 Pretest",
    passPercent: 0,
    questions: [
      pick("sma11-c5-pre1", "False information that is spread on purpose to deceive people is called…", ["disinformation", "information", "confirmation", "decoration"], 0, "Disinformasi = sengaja menyesatkan."),
      listen("sma11-c5-pre2", voice("The minister denied that the price of fuel would go up next month."), "Listen. What did the minister say?", ["The price would not go up.", "The price would go up.", "The price had gone up.", "He didn't know."], 0, "Deny = menyangkal."),
      trPick("sma11-c5-pre3", "“Memeriksa fakta” in English is…", ["fact-checking", "fact-making", "fact-taking", "face-checking"], 0, "Fact-checking."),
      pick("sma11-c5-pre4", "He ___ that he had broken the window.", ["admitted", "denied to", "claimed to", "warned"], 0, "Admit = mengakui."),
      pick("sma11-c5-pre5", "Which is the most reliable source for health information?", ["the Ministry of Health website", "an anonymous chat message", "a comment on a video", "a meme"], 0, "Sumber resmi."),
    ],
  },
  lessons: [
    {
      id: "sma11-c5-l1",
      skill: "reading",
      title: "Reading: How a Fake Story Went Viral",
      summary: "How misinformation spreads and how fact-checkers investigate.",
      passages: [HOAX],
      sections: [
        {
          title: "The case",
          blocks: [
            { type: "passage", passage: HOAX },
            audio("Listen and read", say(["woman", HOAX.lines.join(" ")])),
            vocab([["forward", "meneruskan (pesan)", "chat"], ["stock image", "foto stok", "camera"], ["infectious disease", "penyakit menular", "sick"], ["fatal", "berakibat fatal/mematikan", "medicine"], ["trace", "melacak", "map"]], "Words from the text"),
          ],
        },
        {
          title: "Types of false information",
          blocks: [
            table(["Type", "Meaning", "Example"], [["misinformation", "salah, tetapi disebarkan tanpa niat jahat", "Your aunt forwards a wrong health tip."], ["disinformation", "salah dan sengaja dibuat untuk menipu", "A shop invents a cure to sell products."], ["clickbait", "judul berlebihan agar diklik", "You Won't Believe What Happened Next!"], ["satire", "humor/sindiran yang bisa disalahpahami", "a parody news website"]]),
            tryIt(pick("sma11-c5-l1-try1", "Where did the doctor's photo actually come from?", ["a stock image website", "a hospital in Singapore", "a news agency"], 0, "Baris 4.", { passageId: HOAX.id })),
          ],
        },
      ],
      checkpoint: [
        pick("sma11-c5-l1-c1", "What did the message claim?", ["Hot lemon water could cure dengue in three days.", "Lemons cause dengue.", "Dengue is not dangerous."], 0, "Baris 1.", { passageId: HOAX.id }),
        pick("sma11-c5-l1-c2", "How many times was the message forwarded in a week?", ["more than 200,000", "about 2,000", "exactly 20"], 0, "Baris 3.", { passageId: HOAX.id }),
        fill("sma11-c5-l1-c3", "Complete.", "One doctor warned that delaying treatment could be", ".", ["fatal"], "Baris 5.", { passageId: HOAX.id }),
        pickMany("sma11-c5-l1-c4", "Choose ALL the three questions experts suggest asking.", ["Who is the source?", "What is the evidence?", "Who benefits if I believe this?", "How many likes does it have?"], [0, 1, 2], "Baris 7.", { passageId: HOAX.id }),
        pick("sma11-c5-l1-c5", "According to the definitions, the original message was…", ["disinformation, because it was created on purpose to increase sales", "satire", "real news"], 0, "Sengaja menipu.", { passageId: HOAX.id, hots: true }),
        pick("sma11-c5-l1-c6", "Why did the message seem believable to many people?", ["It used a doctor's photo and named a famous hospital.", "It was very long.", "It was written in English."], 0, "Otoritas palsu.", { passageId: HOAX.id, hots: true }),
      ],
    },
    {
      id: "sma11-c5-l2",
      skill: "structure",
      title: "Reporting Verbs",
      summary: "claim, deny, admit, warn, advise, promise, insist, suggest, accuse — and their patterns.",
      sections: [
        {
          title: "Patterns",
          blocks: [
            table(["Pattern", "Verbs", "Example"], [["verb + that-clause", "claim, admit, deny, insist, explain, confirm", "She claimed that the photo was real."], ["verb + -ing", "admit, deny, suggest, recommend", "He denied writing the message."], ["verb + to-infinitive", "promise, refuse, agree, offer, threaten", "The company promised to remove the post."], ["verb + object + to-infinitive", "warn, advise, urge, ask, encourage, remind", "Experts warned people not to share it."], ["verb + object + preposition + -ing", "accuse … of, blame … for, thank … for", "They accused the shop of spreading lies."]]),
            text("Reporting verbs lebih **tepat** daripada *said*: kata *claimed* menunjukkan penulis belum tentu percaya; *admitted* menunjukkan pengakuan kesalahan; *denied* menunjukkan penyangkalan."),
          ],
        },
        {
          title: "From direct to reported",
          blocks: [
            examples([{ right: "“I made the message to sell lemons.” → He admitted making / that he had made the message to sell lemons." }, { right: "“Don't share it!” → The doctor warned us not to share it." }, { right: "“The hospital is real.” → The account insisted that the hospital was real." }, { right: "“You spread fake news!” → They accused him of spreading fake news." }], "Examples"),
            audio("A press conference", say(["man", "The spokesperson confirmed that the bridge would reopen on Monday."], ["man", "However, she refused to say how much the repairs had cost."], ["man", "She also denied that the contractor had used poor-quality materials, and she urged drivers to use alternative routes until then."])),
            tryIt(pick("sma11-c5-l2-try1", "What did the spokesperson refuse to do?", ["say how much the repairs had cost", "reopen the bridge", "answer any questions"], 0, "Refused to say.")),
          ],
        },
      ],
      checkpoint: [
        listen("sma11-c5-l2-c1", voice("The student admitted copying the essay from the internet."), "Listen. What did the student do?", ["confessed to copying the essay", "denied copying", "promised to copy"], 0, "Admit = mengakui."),
        pick("sma11-c5-l2-c2", "The teacher reminded us ___ our homework.", ["to bring", "bringing", "that bring"], 0, "Remind + object + to."),
        pick("sma11-c5-l2-c3", "The politician denied ___ the money.", ["taking", "to take", "take"], 0, "Deny + -ing."),
        match("sma11-c5-l2-c4", "Match the verb and the pattern.", [["promise", "to + verb"], ["accuse someone", "of + -ing"], ["warn someone", "(not) to + verb"], ["admit", "-ing / that-clause"]], "Pola reporting verbs."),
        trPick("sma11-c5-l2-c5", "“Dia bersikeras bahwa beritanya benar.” in English is…", ["He insisted that the news was true.", "He insisted the news to be true it.", "He insisted to the news true."], 0, "Insist that."),
        pick("sma11-c5-l2-c6", "A reporter writes “The company claimed that its product was 100% natural.” What does “claimed” suggest?", ["The reporter has not confirmed it is true.", "The reporter proved it is true.", "The product is definitely fake."], 0, "Claim = klaim, belum terverifikasi.", { hots: true }),
      ],
    },
    {
      id: "sma11-c5-l3",
      skill: "writing",
      title: "Be a Fact-Checker",
      summary: "The SIFT method and writing a fact-check article.",
      sections: [
        {
          title: "The SIFT method",
          blocks: [
            table(["Step", "Meaning"], [["S — Stop", "Berhenti sejenak sebelum percaya/menyebarkan."], ["I — Investigate the source", "Siapa pembuatnya? Apakah tepercaya?"], ["F — Find better coverage", "Apakah media/lembaga lain melaporkan hal yang sama?"], ["T — Trace claims to the original", "Cari sumber asli foto, kutipan atau data."]]),
            pics([["question", "Stop"], ["eye", "Investigate"], ["report", "Find coverage"], ["map", "Trace"]]),
            warn("Pencarian gambar terbalik (**reverse image search**) dapat menunjukkan apakah sebuah foto lama atau diambil dari konteks lain."),
          ],
        },
        {
          title: "Write a fact-check",
          blocks: [
            writing({
              id: "sma11-c5-l3-write",
              title: "A fact-check article",
              prompt: "Choose a rumour or viral claim you have heard (or invent a realistic one). Write a fact-check article: state the claim, explain how you investigated it, report what sources said using at least five different reporting verbs, and give a verdict (true, false, misleading).",
              image: "report",
              minWords: 230,
              maxWords: 350,
              tips: ["Claim: A viral post claims that …", "Investigation: We contacted … / We traced …", "Sources: … confirmed / denied / explained / warned …", "Verdict: FALSE / MISLEADING / TRUE", "Advice: Before sharing, …"],
              models: [{ label: "Example", text: "FACT CHECK: Will Schools Close for a Month Because of a Heatwave?\nCLAIM: A message circulating on social media claims that all schools in East Java will close for one month starting next Monday because of extreme heat.\nINVESTIGATION: The message uses the logo of the provincial education office and includes a scanned letter. However, the date on the letter is from two years ago, and the signature does not match the current head of the office.\nWe contacted the education office. A spokesperson denied that any closure had been planned. She explained that schools had only been advised to reduce outdoor activities during the hottest hours.\nThe meteorology agency confirmed that temperatures would be high this week but insisted that the situation was not unusual for the season. The agency urged residents to drink plenty of water.\nVERDICT: FALSE. The letter is outdated and has been edited.\nAdvice: Always check official websites before sharing announcements, and look carefully at dates and signatures." }],
              rubric: ["I stated the claim clearly and neutrally.", "I explained my investigation steps.", "I used at least five different reporting verbs correctly.", "I gave a clear verdict supported by evidence.", "My article is objective and well organised."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sma11-c5-l3-c1", "What does the T in SIFT stand for?", ["Trace claims to the original", "Trust everyone", "Type quickly"], 0, "Trace."),
        pick("sma11-c5-l3-c2", "In the model, why was the letter suspicious?", ["The date was old and the signature didn't match.", "It was too short.", "It had no logo."], 0, "Detail yang dicek."),
        arrange("sma11-c5-l3-c3", "Put the words in order.", "The spokesperson denied that schools would close", "Deny + that-clause."),
        fill("sma11-c5-l3-c4", "Complete: The agency ___ residents to drink plenty of water. (mendesak)", "The agency", "residents to drink plenty of water.", ["urged"], "Urge + object + to.", { translate: true }),
        trPick("sma11-c5-l3-c5", "“Menyesatkan” (verdict) in English is…", ["misleading", "missing", "mistaken for"], 0, "Misleading."),
        pick("sma11-c5-l3-c6", "Why should a fact-check article be neutral and not insult the people who shared the hoax?", ["Insults make people defensive; neutral evidence is more convincing.", "Because neutral articles are shorter.", "Because hoaxes are funny."], 0, "Persuasi lewat bukti.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma11-c5-post",
    title: "Chapter 5 Posttest",
    passPercent: 70,
    passages: [HOAX],
    questions: [
      pick("sma11-c5-post1", "The coach warned the players ___ late again.", ["not to be", "to not being", "don't be", "not being"], 0, "Warn + object + not to."),
      listen("sma11-c5-post2", voice("The singer's manager confirmed that the concert would go ahead despite the rain."), "Listen. Will the concert happen?", ["Yes, it will.", "No, it was cancelled.", "It was moved to next year.", "Nobody knows."], 0, "Confirm = memastikan."),
      trPick("sma11-c5-post3", "“Mereka menuduhnya menyebarkan hoaks.” in English is…", ["They accused him of spreading hoaxes.", "They accused him to spread hoaxes.", "They accused that him spread hoaxes.", "They blamed him to spread hoax."], 0, "Accuse … of + -ing."),
      pick("sma11-c5-post4", "Which is clickbait?", ["Doctors HATE This One Weird Trick!", "Ministry Announces New Exam Schedule", "Floods Hit Three Villages in Demak", "Rupiah Strengthens Against Dollar"], 0, "Judul berlebihan."),
      arrange("sma11-c5-post5", "Put the words in order.", "The company promised to remove the post", "Promise + to."),
      pick("sma11-c5-post6", "Who created the fake message?", ["the owner of an online shop selling lemon products", "a hospital in Singapore", "a journalist", "a doctor"], 0, "Baris 6.", { passageId: HOAX.id }),
      match("sma11-c5-post7", "Match the type and the example.", [["misinformation", "an aunt forwards a wrong tip"], ["disinformation", "a shop invents a cure"], ["clickbait", "You Won't Believe This!"], ["satire", "a parody news site"]], "Jenis informasi palsu."),
      fill("sma11-c5-post8", "Complete.", "The owner later admitted that he had created the message to increase", ".", ["sales"], "Baris 6.", { passageId: HOAX.id }),
      pick("sma11-c5-post9", "Which of the three questions in line 7 would have revealed the hoax's real motive most quickly?", ["Who benefits if I believe this?", "Who is the source?", "How long is the message?", "Is the photo colourful?"], 0, "Motif ekonomi penjual.", { passageId: HOAX.id, hots: true }),
      pick("sma11-c5-post10", "What is the main message of the text?", ["Sharing false information can endanger lives, so verify before you share.", "Lemons are dangerous.", "Fact-checkers are slow.", "Never use chat groups."], 0, "Baris 8.", { passageId: HOAX.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Real or Fake?",
    questions: [
      live("sma11-c5-live1", "Deliberately false info:", ["disinformation", "information", "satire", "summary"], 0, "smartphone"),
      live("sma11-c5-live2", "He denied ___ it.", ["doing", "to do", "do", "did"], 0, "question"),
      live("sma11-c5-live3", "Accuse someone ___ cheating", ["of", "for", "to", "about"], 0, "angry"),
      live("sma11-c5-live4", "“Menyesatkan” =", ["misleading", "missing", "mixing", "mistaking"], 0, "report", true),
      live("sma11-c5-live5", "S in SIFT:", ["Stop", "Share", "Smile", "Scroll"], 0, "traffic-light"),
      live("sma11-c5-live6", "She promised ___ help.", ["to", "-ing", "that", "for"], 0, "hand"),
      live("sma11-c5-live7", "Reliable source:", ["official website", "anonymous chat", "a meme", "a rumour"], 0, "laptop"),
      live("sma11-c5-live8", "Find original photo with…", ["reverse image search", "a filter", "a sticker", "zoom"], 0, "camera"),
    ],
  },
};

const MAGGOT: Passage = {
  id: "sma11-c6-maggot",
  title: "Tiny Larvae, Big Solution",
  pic: "recycle",
  lines: [
    "Every day, Indonesian cities produce thousands of tonnes of food waste. Most of it is dumped in landfills, where it rots and releases methane, a greenhouse gas that is much more powerful than carbon dioxide.",
    "In several Indonesian cities, a surprising solution is being tested: the larvae of the black soldier fly.",
    "First, organic waste is collected from markets, restaurants and households. It is separated from plastic and then chopped into small pieces.",
    "The waste is placed in shallow trays, where it is eaten by thousands of black soldier fly larvae. A kilogram of larvae can consume several kilograms of food waste in a day.",
    "After about two weeks, the fat, protein-rich larvae are harvested. They can be dried and sold as feed for fish and chickens, which reduces the need for imported fish meal.",
    "The material that is left behind, called frass, can be used as an organic fertiliser for gardens and farms.",
    "Unlike house flies, adult black soldier flies do not bite, and they are not known to spread diseases, so the process can be carried out safely near communities.",
    "Researchers believe that if this method were adopted more widely, it could help cities cut landfill waste, create jobs and produce cheaper animal feed.",
  ],
};

export const CH6: Level = {
  id: "sma11-ch6",
  title: "Chapter 6 — Science and Innovation",
  description: "Read about scientific innovations, use the passive in different tenses, modal passives and the causative (have/get something done), and present an invention or solution.",
  targetScore: "Reading · Structure · Speaking",
  cover: ["robot", "recycle", "laptop"],
  pretest: {
    id: "sma11-c6-pre",
    title: "Chapter 6 Pretest",
    passPercent: 0,
    questions: [
      pick("sma11-c6-pre1", "A new vaccine ___ being tested in five hospitals right now.", ["is", "are", "has", "was been"], 0, "Present continuous passive: is being + V3."),
      listen("sma11-c6-pre2", voice("The waste is eaten by thousands of tiny larvae."), "Listen. What eats the waste?", ["tiny larvae", "chickens", "fish", "machines"], 0, "Larvae."),
      trPick("sma11-c6-pre3", "“Pupuk organik” in English is…", ["organic fertiliser", "organic fertility", "organ fertiliser", "orange fertiliser"], 0, "Organic fertiliser."),
      pick("sma11-c6-pre4", "I'm going to ___ my phone screen repaired.", ["have", "make", "do", "let"], 0, "Causative: have something done."),
      pick("sma11-c6-pre5", "Which gas is released by rotting food in landfills?", ["methane", "oxygen", "helium", "nitrogen only"], 0, "Metana."),
    ],
  },
  lessons: [
    {
      id: "sma11-c6-l1",
      skill: "reading",
      title: "Reading: Tiny Larvae, Big Solution",
      summary: "Following a scientific process described in the passive.",
      passages: [MAGGOT],
      sections: [
        {
          title: "Black soldier flies",
          blocks: [
            { type: "passage", passage: MAGGOT },
            audio("Listen and read", say(["man", MAGGOT.lines.join(" ")])),
            vocab([["landfill", "tempat pembuangan akhir (TPA)", "trash"], ["greenhouse gas", "gas rumah kaca", "earth"], ["larvae (larva)", "larva/belatung", "butterfly"], ["harvest", "memanen", "basket"], ["feed", "pakan", "chicken"]], "Words from the text"),
          ],
        },
        {
          title: "The process",
          blocks: [
            table(["Step", "Passive sentence"], [["1", "Organic waste is collected and separated."], ["2", "It is chopped into small pieces."], ["3", "It is placed in trays and eaten by larvae."], ["4", "The larvae are harvested and dried."], ["5", "They are sold as animal feed; frass is used as fertiliser."]]),
            tryIt(pick("sma11-c6-l1-try1", "What is frass used for?", ["organic fertiliser", "fish feed", "fuel"], 0, "Baris 6.", { passageId: MAGGOT.id })),
          ],
        },
      ],
      checkpoint: [
        pick("sma11-c6-l1-c1", "Why is food waste in landfills a problem?", ["It releases methane, a powerful greenhouse gas.", "It smells nice.", "It attracts tourists."], 0, "Baris 1.", { passageId: MAGGOT.id }),
        pick("sma11-c6-l1-c2", "How long does it take before the larvae are harvested?", ["about two weeks", "about two days", "about two months"], 0, "Baris 5.", { passageId: MAGGOT.id }),
        fill("sma11-c6-l1-c3", "Complete.", "They can be dried and sold as feed for fish and", ".", ["chickens"], "Baris 5.", { passageId: MAGGOT.id }),
        pickMany("sma11-c6-l1-c4", "Choose ALL the benefits mentioned in the last line.", ["cutting landfill waste", "creating jobs", "producing cheaper animal feed", "making cities colder"], [0, 1, 2], "Baris 8.", { passageId: MAGGOT.id }),
        pick("sma11-c6-l1-c5", "Why does the writer compare black soldier flies to house flies?", ["to reassure readers that the process is safe", "to show they look the same", "to criticise house flies"], 0, "Baris 7.", { passageId: MAGGOT.id, hots: true }),
        pick("sma11-c6-l1-c6", "How could this method help fish farmers?", ["It provides cheaper local feed instead of imported fish meal.", "It cleans fish ponds.", "It makes fish bigger without food."], 0, "Baris 5.", { passageId: MAGGOT.id, hots: true }),
      ],
    },
    {
      id: "sma11-c6-l2",
      skill: "structure",
      title: "The Passive in All Tenses and the Causative",
      summary: "Passive forms across tenses, modal passives, passive reporting structures and have/get something done.",
      sections: [
        {
          title: "Passive forms",
          blocks: [
            table(["Tense", "Passive form", "Example"], [["present simple", "is/are + V3", "Waste is collected daily."], ["present continuous", "is/are being + V3", "A new method is being tested."], ["present perfect", "has/have been + V3", "The device has been patented."], ["past simple", "was/were + V3", "The vaccine was developed in 2020."], ["past perfect", "had been + V3", "The data had been checked before publication."], ["future", "will be + V3", "The results will be announced next week."], ["modal", "can/should/must be + V3", "Plastic should be separated."]]),
            text("Struktur pasif untuk melaporkan pendapat umum (formal): **It is believed that…**, **It is said that…**, atau **The method is thought to be…** — sering dipakai di teks ilmiah dan berita."),
          ],
        },
        {
          title: "Causative: have / get something done",
          blocks: [
            table(["Pattern", "Meaning", "Example"], [["have + object + V3", "meminta/membayar orang lain melakukan", "I had my laptop repaired."], ["get + object + V3", "sama, lebih informal", "She got her eyes tested."], ["have + person + verb", "menyuruh seseorang", "The teacher had us rewrite the report."], ["get + person + to + verb", "membujuk seseorang", "I got my brother to help me."]]),
            examples([{ wrong: "I repaired my motorbike at the garage.", right: "I had my motorbike repaired at the garage.", note: "Jika orang lain yang memperbaiki." }]),
            audio("Lab news", say(["woman", "Have the samples been sent to the lab yet?"], ["man", "Yes, they were sent yesterday. The results will be published next month."], ["woman", "Great. And has the new microscope been installed?"], ["man", "It's being installed right now. We had it delivered from Surabaya this morning."])),
            tryIt(pick("sma11-c6-l2-try1", "What is happening to the microscope now?", ["It is being installed.", "It has been broken.", "It will be sold."], 0, "Is being installed.")),
          ],
        },
      ],
      checkpoint: [
        listen("sma11-c6-l2-c1", voice("The new bridge has been designed to withstand strong earthquakes."), "Listen. What is true about the bridge?", ["It was designed to resist earthquakes.", "It will be designed later.", "It fell in an earthquake."], 0, "Has been designed."),
        pick("sma11-c6-l2-c2", "The results ___ next week.", ["will be announced", "will announce", "are announcing"], 0, "Future passive."),
        pick("sma11-c6-l2-c3", "I'm going to have my hair ___ tomorrow.", ["cut", "cutting", "to cut"], 0, "Have + object + V3."),
        fill("sma11-c6-l2-c4", "Complete: It is ___ that the larvae can reduce waste by 80%. (diyakini)", "It is", "that the larvae can reduce waste by 80%.", ["believed", "thought"], "It is believed that.", { translate: true }),
        trPick("sma11-c6-l2-c5", "“Rumah kami sedang dicat.” in English is…", ["Our house is being painted.", "Our house is painting.", "Our house has painting."], 0, "Present continuous passive."),
        pick("sma11-c6-l2-c6", "Which sentence means you paid a mechanic?", ["I had my car serviced.", "I serviced my car.", "My car serviced me."], 0, "Causative.", { hots: true }),
      ],
    },
    {
      id: "sma11-c6-l3",
      skill: "speaking",
      title: "Pitch an Innovation",
      summary: "Describing how an invention works and pitching it to judges.",
      sections: [
        {
          title: "Young innovators",
          blocks: [
            pics([["recycle", "waste solutions"], ["sprout", "smart farming"], ["water", "clean water"], ["robot", "assistive technology"]]),
            table(["Pitch structure", "What to say"], [["Hook", "a surprising fact or question"], ["Problem", "who suffers and how much"], ["Solution", "what your invention is"], ["How it works", "steps in the passive"], ["Impact", "benefits with numbers"], ["Ask", "what you need: funding, partners, testing"]]),
          ],
        },
        {
          title: "Your pitch",
          blocks: [
            speaking({
              id: "sma11-c6-l3-say",
              title: "Innovation pitch",
              prompt: "Invent (or describe) a simple solution to a local problem and pitch it to a panel of judges in two minutes. Explain how it works using at least four passive sentences and one causative.",
              image: "robot",
              prepSeconds: 90,
              seconds: 120,
              tips: ["Did you know that …?", "In our area, … is a big problem because …", "Our solution is called …", "First, … is collected/placed/connected … Then …", "It has been tested / It could be used …", "We'd like to have it produced / tested …"],
              models: [{ label: "Example", text: "Did you know that many fishermen in our village lose fish because they have no ice? Our solution is called the SunCool Box. It is a cooler box that is powered by a small solar panel. First, the panel is fixed to the boat's roof. The energy is stored in a battery and is used to run a small cooling fan. The box is insulated with recycled foam, so the cold air stays inside. Our prototype has been tested on three boats, and fish stayed fresh for twelve hours longer. Now we'd like to have twenty more boxes produced by a local workshop. With your support, fishermen's income could be increased by up to thirty percent. Thank you!" }],
              rubric: ["I described the problem clearly.", "I explained how the solution works with at least four passive sentences.", "I used a causative structure.", "I mentioned impact or test results.", "My pitch was confident and persuasive."],
            }),
            writing({
              id: "sma11-c6-l3-write",
              title: "A science news article",
              prompt: "Write a short science news article about a real or imaginary innovation by Indonesian students or researchers. Use passive forms in at least four different tenses and one passive reporting structure (It is believed that… / It is said that…).",
              image: "laptop",
              minWords: 200,
              maxWords: 320,
              tips: ["Headline", "Lead: who invented what, where", "How it works (passive)", "Testing and results", "Expert comment", "What will be done next"],
              models: [{ label: "Example", text: "Students Turn Coconut Husks into Water Filters\nA water filter made from coconut husks has been developed by three students from a vocational school in Pariaman, West Sumatra.\nIn many coastal villages, well water is often cloudy and smells of salt. To solve this, the husks are burned at a low temperature to make activated charcoal. The charcoal is then layered with sand and gravel inside a recycled plastic drum.\nThe filter was tested at four houses last month. According to the local health centre, the water was much clearer after filtering, and the smell had been removed.\nIt is believed that the filter costs less than Rp150,000 to make, which is far cheaper than commercial filters. However, experts warned that the water should still be boiled before drinking.\nThe design is now being improved, and it will be presented at a national science fair in Jakarta next month." }],
              rubric: ["I used the passive in at least four tenses correctly.", "I used a passive reporting structure.", "My article has a headline and lead.", "I explained how the innovation works.", "I included results and next steps."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sma11-c6-l3-c1", "In the model pitch, how is the SunCool Box powered?", ["by a small solar panel", "by petrol", "by wind"], 0, "Solar panel."),
        pick("sma11-c6-l3-c2", "In the model article, what are the husks turned into?", ["activated charcoal", "rope", "fuel oil"], 0, "Arang aktif."),
        arrange("sma11-c6-l3-c3", "Put the words in order.", "The prototype has been tested on three boats", "Present perfect passive."),
        fill("sma11-c6-l3-c4", "Complete: The design is now ___ improved.", "The design is now", "improved.", ["being"], "Is being + V3."),
        trPick("sma11-c6-l3-c5", "“Kami ingin produk ini diproduksi massal.” in English is…", ["We'd like to have this product mass-produced.", "We'd like to produce mass this product.", "We'd like this product producing mass."], 0, "Have + object + V3."),
        pick("sma11-c6-l3-c6", "Why do scientific texts often use the passive?", ["The focus is on the process and results, not on who did each step.", "Scientists don't like people.", "Passive sentences are shorter."], 0, "Fokus pada proses.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma11-c6-post",
    title: "Chapter 6 Posttest",
    passPercent: 70,
    passages: [MAGGOT],
    questions: [
      pick("sma11-c6-post1", "The first electric car in Indonesia ___ decades ago.", ["was designed", "is designing", "has designed", "designs"], 0, "Past passive."),
      listen("sma11-c6-post2", voice("By the time the report was published, the experiment had been repeated three times."), "Listen. How many times was the experiment repeated?", ["three times", "once", "twice", "never"], 0, "Had been repeated three times."),
      trPick("sma11-c6-post3", "“Saya memperbaiki laptop saya di toko.” (someone else repaired it) in English is…", ["I had my laptop repaired at the shop.", "I repaired my laptop at the shop myself.", "I have repaired the shop.", "My laptop repaired me."], 0, "Causative."),
      pick("sma11-c6-post4", "Plastic must ___ before it is recycled.", ["be cleaned", "clean", "cleaning", "to clean"], 0, "Modal passive."),
      arrange("sma11-c6-post5", "Put the words in order.", "The larvae are harvested after two weeks", "Present passive."),
      pick("sma11-c6-post6", "What happens to organic waste first?", ["It is collected and separated from plastic.", "It is fed to chickens.", "It is burned.", "It is buried."], 0, "Baris 3.", { passageId: MAGGOT.id }),
      match("sma11-c6-post7", "Match the tense and the passive form.", [["present continuous", "is being tested"], ["present perfect", "has been tested"], ["past perfect", "had been tested"], ["future", "will be tested"]], "Bentuk pasif."),
      fill("sma11-c6-post8", "Complete.", "The material that is left behind, called", ", can be used as an organic fertiliser.", ["frass"], "Baris 6.", { passageId: MAGGOT.id }),
      pick("sma11-c6-post9", "Which sentence from the text expresses a possibility, not a fact?", ["if this method were adopted more widely, it could help cities cut landfill waste", "Organic waste is collected from markets", "The larvae are harvested", "The waste is placed in shallow trays"], 0, "Second conditional + could.", { passageId: MAGGOT.id, hots: true }),
      pick("sma11-c6-post10", "Which is the best summary of the text?", ["Black soldier fly larvae can turn food waste into animal feed and fertiliser, reducing landfill problems.", "Flies are dangerous insects.", "Fish need imported food.", "Landfills are the best way to manage waste."], 0, "Ringkasan.", { passageId: MAGGOT.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Lab Rats",
    questions: [
      live("sma11-c6-live1", "is being + …", ["V3", "V1", "V-ing", "to V"], 0, "question"),
      live("sma11-c6-live2", "I had my bike ___.", ["fixed", "fix", "fixing", "to fix"], 0, "bicycle"),
      live("sma11-c6-live3", "Landfill gas:", ["methane", "oxygen", "neon", "helium"], 0, "trash"),
      live("sma11-c6-live4", "“Pupuk” =", ["fertiliser", "feather", "filter", "fever"], 0, "sprout", true),
      live("sma11-c6-live5", "has been + V3 =", ["present perfect passive", "past simple", "future active", "imperative"], 0, "clock"),
      live("sma11-c6-live6", "It is ___ that… (formal)", ["believed", "believe", "believing", "belief"], 0, "owl-think"),
      live("sma11-c6-live7", "BSF larvae eat…", ["food waste", "plastic", "metal", "glass"], 0, "recycle"),
      live("sma11-c6-live8", "Results will ___ announced.", ["be", "been", "being", "to"], 0, "microphone"),
    ],
  },
};
