import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 12 (SMA, Fase F). Chapter 5 — Manuals and Troubleshooting · Chapter 6 — Let's Debate

const MANUAL: Passage = {
  id: "sma12-c5-manual",
  title: "Quick Start Guide: SolarLite Home Kit",
  pic: "lantern",
  lines: [
    "Thank you for choosing the SolarLite Home Kit. Please read this guide carefully before installation and keep it for future reference.",
    "Package contents: 1 solar panel (20 W), 1 battery unit with USB ports, 3 LED bulbs with 5-metre cables, 1 mounting bracket, 4 screws.",
    "1. Place the solar panel where it receives direct sunlight for at least five hours a day. The panel should face north if you live south of the equator, and south if you live north of it.",
    "2. Fix the bracket firmly with the screws provided, and attach the panel at an angle of 10 to 15 degrees so that rainwater can run off.",
    "3. Connect the panel cable to the SOLAR IN port of the battery unit. A green light will appear when the battery is charging.",
    "4. Plug the LED bulbs into the LIGHT ports and switch them on using the buttons on the battery unit.",
    "WARNING: Do not open the battery unit. Keep the unit away from water and direct heat. If the unit becomes hot or swollen, disconnect it immediately and contact our service centre.",
    "TROUBLESHOOTING — The lights do not turn on: check that the battery is charged and that the bulbs are firmly connected. The battery charges slowly: clean the surface of the panel and make sure it is not in the shade.",
    "This product is covered by a two-year warranty. The warranty does not cover damage caused by misuse or unauthorised repairs.",
  ],
};

export const CH5: Level = {
  id: "sma12-ch5",
  title: "Chapter 5 — Manuals and Troubleshooting",
  description: "Read user manuals, quick-start guides and warranty information, use imperatives, modals, passives and conditionals in technical instructions, and write a troubleshooting guide.",
  targetScore: "Reading · Writing · Structure",
  cover: ["lantern", "laptop", "technician"],
  pretest: {
    id: "sma12-c5-pre",
    title: "Chapter 5 Pretest",
    passPercent: 0,
    questions: [
      pick("sma12-c5-pre1", "“If the screen freezes, hold the power button for ten seconds.” This sentence is from a…", ["troubleshooting section", "short story", "news report", "biography"], 0, "Pemecahan masalah."),
      listen("sma12-c5-pre2", voice("Do not use the device while it is charging in the bathroom."), "Listen. What kind of instruction is this?", ["a safety warning", "a recipe step", "an invitation", "a compliment"], 0, "Peringatan keselamatan."),
      trPick("sma12-c5-pre3", "“Isi kemasan” in English is…", ["package contents", "package contest", "packing content's", "box ingredient"], 0, "Package contents."),
      pick("sma12-c5-pre4", "The device ___ be charged for two hours before first use.", ["should", "should to", "shoulds", "is should"], 0, "Modal + bentuk dasar."),
      pick("sma12-c5-pre5", "Which part of a manual tells you what the guarantee covers?", ["warranty", "introduction", "index", "advertisement"], 0, "Garansi."),
    ],
  },
  lessons: [
    {
      id: "sma12-c5-l1",
      skill: "reading",
      title: "Reading: A Quick Start Guide",
      summary: "Scanning technical documents for specific information.",
      passages: [MANUAL],
      sections: [
        {
          title: "The guide",
          blocks: [
            { type: "passage", passage: MANUAL },
            vocab([["bracket", "dudukan/braket", "technician"], ["port", "colokan/port", "cable"], ["swollen", "menggembung", "medicine"], ["misuse", "penyalahgunaan/pemakaian salah", "question"], ["unauthorised", "tidak resmi", "police"]], "Technical words"),
          ],
        },
        {
          title: "Features of manuals",
          blocks: [
            table(["Section", "Language"], [["Introduction", "Thank you for choosing… / Please read… carefully"], ["Contents / parts", "noun phrases with numbers"], ["Steps", "numbered imperatives; purpose with so that / to"], ["Warnings", "Do not… / Never… / Keep… away from…"], ["Troubleshooting", "problem → cause → solution; If…, …"], ["Warranty", "passive: is covered by, is not covered"]]),
            tryIt(pick("sma12-c5-l1-try1", "How many LED bulbs are in the kit?", ["three", "one", "four"], 0, "Baris 2.", { passageId: MANUAL.id })),
          ],
        },
      ],
      checkpoint: [
        pick("sma12-c5-l1-c1", "How many hours of direct sunlight should the panel receive?", ["at least five", "at least two", "at least ten"], 0, "Baris 3.", { passageId: MANUAL.id }),
        pick("sma12-c5-l1-c2", "Why should the panel be tilted 10 to 15 degrees?", ["so that rainwater can run off", "to look modern", "to stop birds"], 0, "Baris 4.", { passageId: MANUAL.id }),
        fill("sma12-c5-l1-c3", "Complete.", "A green light will appear when the battery is", ".", ["charging"], "Baris 5.", { passageId: MANUAL.id }),
        pickMany("sma12-c5-l1-c4", "Choose ALL the warnings in the guide.", ["Do not open the battery unit.", "Keep it away from water and heat.", "Disconnect it if it becomes hot or swollen.", "Charge it under the sea."], [0, 1, 2], "Baris 7.", { passageId: MANUAL.id }),
        pick("sma12-c5-l1-c5", "A family in Kupang (south of the equator) installs the panel. Which way should it face?", ["north", "south", "east", "west"], 0, "Baris 3.", { passageId: MANUAL.id, hots: true }),
        pick("sma12-c5-l1-c6", "Your neighbour's cousin opened the battery and it broke. Is it covered by the warranty?", ["No, because it was an unauthorised repair or misuse.", "Yes, always.", "Only on weekends."], 0, "Baris 9.", { passageId: MANUAL.id, hots: true }),
      ],
    },
    {
      id: "sma12-c5-l2",
      skill: "structure",
      title: "Technical Language",
      summary: "Imperatives with purpose, modals of necessity, passive instructions and conditionals for troubleshooting.",
      sections: [
        {
          title: "Patterns",
          blocks: [
            table(["Function", "Pattern", "Example"], [["Instruction + purpose", "imperative + to / so that", "Tilt the panel so that water runs off."], ["Necessity", "must / need to / should / be required to", "The device must be kept dry."], ["Prohibition", "must not / do not / never", "Never use a damaged cable."], ["Passive instruction", "is to be / should be + V3", "The battery should be replaced every five years."], ["Condition → action", "If/When + present, imperative", "If the light flashes red, unplug the device."], ["Sequence", "Once / After / Before + -ing", "Before cleaning the panel, switch off the unit."]]),
            examples([{ wrong: "Before clean the panel, switch off.", right: "Before cleaning the panel, switch off the unit." }, { wrong: "If the light will flash, unplug it.", right: "If the light flashes, unplug it." }], "Common mistakes"),
          ],
        },
        {
          title: "A help-desk call",
          blocks: [
            audio("Tech support", say(["woman", "SolarLite support, how can I help?"], ["man", "Hi. My lights won't turn on, even though the panel is in the sun."], ["woman", "I see. Is there a green light on the battery unit when the panel is connected?"], ["man", "No, there isn't."], ["woman", "Then the panel cable might be loose. Could you unplug it and plug it back in firmly?"], ["man", "OK… Oh, the green light is on now!"], ["woman", "Great. Leave it to charge for about six hours before you switch the lights on."])),
            tryIt(pick("sma12-c5-l2-try1", "What was the problem?", ["The panel cable was loose.", "The bulbs were broken.", "The panel was in the shade."], 0, "Kabel kendur.")),
            repeat(["Make sure the cable is firmly connected.", "If the light flashes red, contact the service centre.", "Before cleaning the panel, switch off the unit.", "The battery should be replaced every five years."]),
          ],
        },
      ],
      checkpoint: [
        listen("sma12-c5-l2-c1", voice("Before installing the app, make sure your phone has at least two gigabytes of free space."), "Listen. What should you check first?", ["free storage space", "the battery colour", "your password"], 0, "Free space."),
        pick("sma12-c5-l2-c2", "If the printer ___ paper, check the tray.", ["jams", "will jam", "jammed"], 0, "If + present."),
        pick("sma12-c5-l2-c3", "The filter ___ every three months.", ["should be replaced", "should replace", "should replacing"], 0, "Modal passive."),
        fill("sma12-c5-l2-c4", "Complete: Unplug the charger ___ cleaning the device.", "Unplug the charger", "cleaning the device.", ["before"], "Before + -ing."),
        trPick("sma12-c5-l2-c5", "“Jangan pernah memakai kabel yang rusak.” in English is…", ["Never use a damaged cable.", "Never using damaged cable.", "Don't never use cable damage."], 0, "Larangan."),
        pick("sma12-c5-l2-c6", "Which troubleshooting entry is the clearest?", ["Problem: No sound. Solution: Check that the volume is on and the headphones are disconnected.", "Sound problem? Try stuff.", "If bad, fix."], 0, "Masalah → solusi spesifik.", { hots: true }),
      ],
    },
    {
      id: "sma12-c5-l3",
      skill: "writing",
      title: "Write a User Guide",
      summary: "Writing a quick-start guide with warnings and troubleshooting for a device or app.",
      sections: [
        {
          title: "Plan",
          blocks: [
            pics([["smartphone", "a phone app"], ["laptop", "a school laptop"], ["modem", "a home Wi-Fi modem"], ["bicycle", "an electric bike"]]),
            tip("Tulis untuk **pemula**: satu tindakan per langkah, gunakan **nama tombol yang sama** dengan yang tertera di perangkat (dengan huruf kapital), dan beri **alasan** untuk langkah penting."),
          ],
        },
        {
          title: "Write",
          blocks: [
            writing({
              id: "sma12-c5-l3-write",
              title: "My quick-start guide",
              prompt: "Write a quick-start guide for a device or app you know well (e.g. your school's e-learning platform, a Wi-Fi modem, a rice cooker, a fitness app). Include: introduction, contents or requirements, at least five numbered steps, warnings, and a troubleshooting section with at least three problems.",
              image: "modem",
              minWords: 230,
              maxWords: 350,
              tips: ["Introduction: This guide explains how to …", "Requirements / contents", "Steps 1–5+: imperative + purpose", "WARNING: Do not … / Never …", "TROUBLESHOOTING: Problem → Solution (If …, …)"],
              models: [{ label: "Example", text: "Quick Start Guide: Setting Up Your Home Wi-Fi Modem\nThis guide explains how to set up your new modem and connect your devices.\nIn the box: 1 modem, 1 power adapter, 1 fibre-optic cable, 1 LAN cable.\n1. Place the modem in a central, open area of your house, away from thick walls and microwaves, so that the signal reaches every room.\n2. Connect the fibre-optic cable to the port labelled OPTICAL.\n3. Plug in the power adapter and press the POWER button.\n4. Wait until the PON and INTERNET lights turn solid green. This may take up to two minutes.\n5. On your phone, open Wi-Fi settings and select the network name printed on the sticker under the modem.\n6. Enter the password from the sticker. For security, change it as soon as possible.\nWARNING: Do not bend the fibre-optic cable sharply. Never cover the modem, as it may overheat.\nTROUBLESHOOTING\n• The LOS light is red: the fibre cable may be damaged or loose. Check the connection and contact your provider.\n• The internet is slow: move the modem to a more open place or restart it.\n• You forgot the password: hold the RESET button for ten seconds to restore factory settings." }],
              rubric: ["My guide has all required sections.", "Steps are numbered, in order and start with imperatives.", "I explained the purpose of key steps.", "I included clear warnings.", "My troubleshooting uses problem–solution format with conditionals."],
            }),
            speaking({
              id: "sma12-c5-l3-say",
              title: "Help-desk role play",
              prompt: "Role-play a help-desk call. As the support agent, ask questions to identify the problem and guide the customer step by step to solve it.",
              image: "headset",
              seconds: 90,
              tips: ["Thank you for calling … How can I help?", "Could you tell me what you see on the screen?", "Let's try … first.", "If that doesn't work, …", "Is there anything else I can help you with?"],
              models: [{ label: "Example", text: "Thank you for calling Nusa Net. How can I help you today? … I see, the internet isn't working. Could you tell me which lights are on the modem? … A red light next to LOS? OK, that usually means the cable has a problem. Could you check that the thin yellow cable is firmly connected to the back of the modem? … Is it bent anywhere? … Alright, please don't touch it. I'll send a technician tomorrow morning between nine and twelve. Is there anything else I can help you with?" }],
              rubric: ["I asked clear diagnostic questions.", "I gave step-by-step instructions.", "I used conditionals for alternative solutions.", "I was polite and patient."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sma12-c5-l3-c1", "In the model guide, why should the modem be placed in a central area?", ["so that the signal reaches every room", "to look nice", "to keep it cool"], 0, "Tujuan langkah."),
        pick("sma12-c5-l3-c2", "What does a red LOS light mean in the model?", ["The fibre cable may be damaged or loose.", "The internet is fast.", "The password is wrong."], 0, "Troubleshooting."),
        arrange("sma12-c5-l3-c3", "Put the words in order.", "Hold the reset button for ten seconds", "Imperatif."),
        fill("sma12-c5-l3-c4", "Complete: Never cover the modem, ___ it may overheat.", "Never cover the modem,", "it may overheat.", ["as", "because", "since"], "Alasan."),
        trPick("sma12-c5-l3-c5", "“Kembalikan ke pengaturan pabrik” in English is…", ["restore factory settings", "return to the factory", "back factory set"], 0, "Factory settings."),
        pick("sma12-c5-l3-c6", "Why should a manual use the exact button names printed on the device?", ["so users can easily find and match them", "to look technical", "to make it longer"], 0, "Kejelasan.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma12-c5-post",
    title: "Chapter 5 Posttest",
    passPercent: 70,
    passages: [MANUAL],
    questions: [
      pick("sma12-c5-post1", "Switch off the machine ___ opening the cover.", ["before", "after to", "during to", "so that"], 0, "Before + -ing."),
      listen("sma12-c5-post2", voice("If the battery icon flashes, connect the charger immediately, otherwise your unsaved work may be lost."), "Listen. What may happen if you don't connect the charger?", ["Unsaved work may be lost.", "The screen will break.", "The charger will explode.", "Nothing happens."], 0, "Otherwise = kalau tidak."),
      trPick("sma12-c5-post3", "“Garansi tidak mencakup kerusakan akibat pemakaian yang salah.” in English is…", ["The warranty does not cover damage caused by misuse.", "The warranty is not cover misuse damage.", "Warranty don't covering damage misused.", "The misuse doesn't warranty damage."], 0, "Kalimat garansi."),
      pick("sma12-c5-post4", "Which is a prohibition?", ["Never immerse the device in water.", "Press START.", "Wait two minutes.", "Enjoy your new device."], 0, "Larangan."),
      arrange("sma12-c5-post5", "Put the words in order.", "Keep the unit away from water and heat", "Peringatan."),
      pick("sma12-c5-post6", "Which port should the panel cable be connected to?", ["SOLAR IN", "LIGHT", "USB", "POWER OUT"], 0, "Baris 5.", { passageId: MANUAL.id }),
      match("sma12-c5-post7", "Match the problem and the solution.", [["lights don't turn on", "check the battery and bulb connections"], ["battery charges slowly", "clean the panel and avoid shade"], ["unit becomes hot", "disconnect it and contact the service centre"]], "Troubleshooting."),
      fill("sma12-c5-post8", "Complete.", "This product is covered by a two-year", ".", ["warranty"], "Baris 9.", { passageId: MANUAL.id }),
      pick("sma12-c5-post9", "Why does the guide ask users to keep it “for future reference”?", ["They may need the troubleshooting and warranty information later.", "It is a souvenir.", "It replaces the battery.", "It must be returned."], 0, "Baris 1.", { passageId: MANUAL.id, hots: true }),
      pick("sma12-c5-post10", "Which addition would make the guide safer for families with young children?", ["Keep the battery unit out of reach of children.", "Paint the panel blue.", "Add more bulbs.", "Use longer screws."], 0, "Peringatan tambahan.", { passageId: MANUAL.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Read the Manual!",
    questions: [
      live("sma12-c5-live1", "Before ___ , unplug it.", ["cleaning", "clean", "to clean", "cleaned"], 0, "lantern"),
      live("sma12-c5-live2", "If the light ___, unplug it.", ["flashes", "will flash", "flashed", "flashing"], 0, "traffic-light"),
      live("sma12-c5-live3", "Problem-solution section:", ["troubleshooting", "introduction", "warranty", "contents"], 0, "technician"),
      live("sma12-c5-live4", "“Isi kemasan” =", ["package contents", "package contest", "pack content's", "contents package box"], 0, "bag", true),
      live("sma12-c5-live5", "Should be ___ every year.", ["replaced", "replace", "replacing", "to replace"], 0, "calendar"),
      live("sma12-c5-live6", "Prohibition:", ["Never…", "Please…", "Enjoy…", "Thank you…"], 0, "question"),
      live("sma12-c5-live7", "Guarantee period:", ["warranty", "warning", "wardrobe", "warrior"], 0, "receipt"),
      live("sma12-c5-live8", "Tilt so that rain ___ off.", ["runs", "run", "running", "ran to"], 0, "rain"),
    ],
  },
};

const DEBATE: Passage = {
  id: "sma12-c6-debate",
  title: "Debate Transcript: This House Would Make Voting Compulsory",
  pic: "microphone",
  lines: [
    "PRIME MINISTER (Government): Madam Speaker, a democracy is only as strong as the people who take part in it. We believe that every adult citizen should be required to vote. Today, I will argue that compulsory voting creates a more representative government, and my partner will show how it strengthens civic responsibility.",
    "Firstly, when turnout is low, elected leaders represent only the most active groups, often older and wealthier citizens. Compulsory voting ensures that the voices of young people and poorer communities are counted.",
    "LEADER OF THE OPPOSITION: Thank you, Madam Speaker. The Government claims that forcing people to vote makes democracy stronger. We disagree. Freedom includes the freedom not to participate.",
    "Our first argument is about the quality of votes. If people are forced to vote, many will choose randomly or follow the first name on the ballot. This does not create a more representative government; it creates noise.",
    "Secondly, punishing citizens with fines is unfair to people who cannot easily reach polling stations, such as those in remote areas.",
    "DEPUTY PRIME MINISTER: The Opposition says forced voters will choose randomly. However, evidence from countries such as Australia suggests that once voting becomes a habit, people start following politics more closely.",
    "Moreover, our model includes the option to submit a blank ballot. So the freedom not to choose a candidate is protected, while the duty to participate is maintained.",
    "DEPUTY LEADER OF THE OPPOSITION: Even with a blank option, the Government has not explained how it will fund polling stations in thousands of remote islands. Instead of compulsion, we propose better education, online registration and making election day a public holiday.",
  ],
};

export const CH6: Level = {
  id: "sma12-ch6",
  title: "Chapter 6 — Let's Debate",
  description: "Understand debate formats and roles, build arguments with claims, reasons and evidence, rebut politely, and take part in a structured debate.",
  targetScore: "Speaking · Listening · Reading",
  cover: ["microphone", "meeting", "owl-think"],
  pretest: {
    id: "sma12-c6-pre",
    title: "Chapter 6 Pretest",
    passPercent: 0,
    questions: [
      pick("sma12-c6-pre1", "In a debate, the team that supports the motion is the…", ["Government / Affirmative", "Opposition / Negative", "Adjudicator", "Audience"], 0, "Tim pro."),
      listen("sma12-c6-pre2", voice("With respect, my opponent's argument ignores the cost of the policy."), "Listen. What is the speaker doing?", ["rebutting an argument", "agreeing", "introducing the topic", "thanking the audience"], 0, "Sanggahan."),
      trPick("sma12-c6-pre3", "“Mosi” (in a debate) in English is…", ["motion", "emotion", "mission", "notion"], 0, "Motion."),
      pick("sma12-c6-pre4", "Which is the strongest argument structure?", ["claim + reason + evidence", "claim only", "insult + claim", "question only"], 0, "Struktur argumen."),
      pick("sma12-c6-pre5", "“This House would…” is a typical way to start a…", ["debate motion", "recipe", "letter", "poem"], 0, "Format mosi."),
    ],
  },
  lessons: [
    {
      id: "sma12-c6-l1",
      skill: "reading",
      title: "Reading a Debate",
      summary: "Debate roles, structure of speeches and how arguments and rebuttals connect.",
      passages: [DEBATE],
      sections: [
        {
          title: "The transcript",
          blocks: [
            { type: "passage", passage: DEBATE },
            vocab([["turnout", "jumlah pemilih yang datang", "num-10"], ["representative", "mewakili", "meeting"], ["ballot", "surat suara", "card"], ["polling station", "TPS (tempat pemungutan suara)", "school"], ["compulsion", "paksaan", "hand"]], "Debate vocabulary"),
          ],
        },
        {
          title: "Roles and structure",
          blocks: [
            table(["Speaker", "Main job"], [["Prime Minister (1st Gov)", "defines the motion, presents the case line and first arguments"], ["Leader of the Opposition (1st Opp)", "responds, presents the opposition's stance and arguments"], ["Deputy PM (2nd Gov)", "rebuts the opposition and adds new arguments"], ["Deputy Leader (2nd Opp)", "rebuts and adds arguments or a counter-proposal"], ["Reply speakers", "summarise the key clashes; no new arguments"]]),
            text("Format ini mirip **Asian Parliamentary / British Parliamentary** yang dipakai dalam lomba debat SMA (misalnya NSDC). Mosi biasanya berbentuk **This House would…** (kebijakan) atau **This House believes that…** (nilai)."),
            tryIt(pick("sma12-c6-l1-try1", "What is the motion?", ["This House would make voting compulsory.", "This House would ban elections.", "This House believes elections are expensive."], 0, "Judul transkrip.", { passageId: DEBATE.id })),
          ],
        },
      ],
      checkpoint: [
        pick("sma12-c6-l1-c1", "According to the Government, who benefits from compulsory voting?", ["young people and poorer communities", "only rich people", "only politicians"], 0, "Baris 2.", { passageId: DEBATE.id }),
        pick("sma12-c6-l1-c2", "What is the Opposition's first argument?", ["Forced voters may choose randomly, lowering vote quality.", "Voting is too expensive for the rich.", "Elections should be online only."], 0, "Baris 4.", { passageId: DEBATE.id }),
        fill("sma12-c6-l1-c3", "Complete.", "our model includes the option to submit a blank", ".", ["ballot"], "Baris 7.", { passageId: DEBATE.id }),
        pickMany("sma12-c6-l1-c4", "Choose ALL the Opposition's counter-proposals.", ["better education", "online registration", "making election day a public holiday", "higher fines"], [0, 1, 2], "Baris 8.", { passageId: DEBATE.id }),
        pick("sma12-c6-l1-c5", "How does the Deputy PM respond to the “random voting” argument?", ["with evidence from Australia that voting becomes a habit", "by insulting the Opposition", "by ignoring it"], 0, "Rebuttal dengan bukti.", { passageId: DEBATE.id, hots: true }),
        pick("sma12-c6-l1-c6", "Which clash remains unanswered at the end of the transcript?", ["how to fund polling stations on remote islands", "whether Australia exists", "whether blank ballots are possible"], 0, "Baris 8.", { passageId: DEBATE.id, hots: true }),
      ],
    },
    {
      id: "sma12-c6-l2",
      skill: "speaking",
      title: "Building and Rebutting Arguments",
      summary: "The ARE structure (Assertion, Reasoning, Evidence), signposting and polite rebuttal.",
      sections: [
        {
          title: "Strong arguments",
          blocks: [
            table(["Part", "Meaning", "Example"], [["A — Assertion", "your claim", "Free school meals improve learning."], ["R — Reasoning", "why it is true (logic)", "Hungry children cannot concentrate, and many poor families skip breakfast."], ["E — Evidence", "facts, examples, data", "After a school meal programme in one district, attendance rose by 15%."], ["(Link)", "connect to the motion", "Therefore, this House should support free school meals."]]),
            table(["Signposting", "Rebuttal", "Points of information (POI)"], [["My first argument is…", "My opponent claims that…, but…", "Point of information, please!"], ["Moving on to my second point…", "This argument fails because…", "Would the speaker accept that…?"], ["To summarise…", "Even if that were true, …", "No, thank you. / Yes, briefly."]]),
          ],
        },
        {
          title: "Practise",
          blocks: [
            audio("A rebuttal", say(["man", "The opposition says that a four-day school week will make students lazy."], ["man", "However, this argument fails for two reasons. First, they have given no evidence; it is just an assumption."], ["man", "Second, even if some students relaxed more, studies of schools that have tried shorter weeks show that attendance actually improved because students were less exhausted."], ["man", "Therefore, the opposition's concern is not a reason to reject the motion."])),
            tryIt(pick("sma12-c6-l2-try1", "What rebuttal technique is used in “even if some students relaxed more…”?", ["accepting the point for argument's sake and showing it still doesn't win", "insulting the opponent", "changing the topic"], 0, "Even if = konsesi strategis.")),
            repeat(["My first argument is about fairness.", "My opponent claims that…, but this fails because…", "Even if that were true, …", "To summarise, our team has shown…"]),
          ],
        },
      ],
      checkpoint: [
        listen("sma12-c6-l2-c1", voice("Point of information, please! Would the speaker accept that online voting could be hacked?"), "Listen. What is happening?", ["An opponent is offering a point of information.", "The speaker is concluding.", "The judge is giving results."], 0, "POI = point of information."),
        match("sma12-c6-l2-c2", "Match ARE with the example.", [["Assertion", "Plastic bags should be taxed."], ["Reasoning", "A small cost changes people's habits."], ["Evidence", "Use fell by 50% after a tax in one city."]], "Struktur ARE."),
        pick("sma12-c6-l2-c3", "Which is a polite rebuttal?", ["With respect, my opponent's point overlooks the cost.", "My opponent is clueless.", "That's stupid."], 0, "Sopan dan fokus pada argumen."),
        fill("sma12-c6-l2-c4", "Complete: ___ if that were true, the policy would still be unfair.", "", "if that were true, the policy would still be unfair.", ["Even", "even"], "Even if."),
        trPick("sma12-c6-l2-c5", "“Sanggahan” (in a debate) in English is…", ["rebuttal", "rebuild", "repeat"], 0, "Rebuttal."),
        pick("sma12-c6-l2-c6", "Which argument is the strongest?", ["Homework should be limited because research links excessive homework to stress, and stressed students learn less.", "Homework is bad.", "Everyone hates homework."], 0, "Klaim + alasan + bukti.", { hots: true }),
      ],
    },
    {
      id: "sma12-c6-l3",
      skill: "speaking",
      title: "Debate Time",
      summary: "Preparing a case and delivering a constructive speech and a reply.",
      sections: [
        {
          title: "Motions and preparation",
          blocks: [
            pics([["microphone", "speaker"], ["clock", "time limit"], ["report", "case notes"], ["trophy", "winning team"]]),
            table(["Practice motions"], [["This House would ban homework in primary schools."], ["This House believes that social media influencers should be licensed."], ["This House would make English a compulsory subject from Grade 1."], ["This House would replace national exams with portfolios."]]),
            warn("Dalam debat, kamu **menyerang argumen, bukan orangnya**. Juri menilai **matter** (isi), **manner** (cara penyampaian) dan **method** (struktur & strategi)."),
          ],
        },
        {
          title: "Speak and write",
          blocks: [
            speaking({
              id: "sma12-c6-l3-say",
              title: "A first-speaker speech",
              prompt: "Choose a practice motion and a side. Deliver a two-minute first-speaker speech: greet the chair, define the motion, state your team's stance and present two arguments using ARE.",
              image: "microphone",
              prepSeconds: 120,
              seconds: 120,
              tips: ["Thank you, Madam/Mr Speaker.", "Today's motion is … We define it as …", "Our stance is that …", "My first argument is … because … For example, …", "My second argument is …", "For these reasons, we are proud to propose/oppose."],
              models: [{ label: "Example", text: "Thank you, Madam Speaker. Today's motion is that this House would replace national exams with portfolios. We define a portfolio as a collection of a student's best work across three years, assessed by trained teachers using national standards. Our stance is that portfolios measure real learning more fairly than a single exam. My first argument is about fairness. A one-day exam punishes students who are sick or anxious on that day. A portfolio shows consistent effort over time. For example, a student who wins a science fair but panics in tests is currently undervalued. My second argument is about skills. Portfolios encourage projects, writing and teamwork, which universities and employers actually need. For these reasons, we are proud to propose." }],
              rubric: ["I followed debate conventions (greeting, definition, stance).", "I presented two arguments using ARE.", "I used signposting.", "My delivery was confident, clear and within time."],
            }),
            writing({
              id: "sma12-c6-l3-write",
              title: "Case file and reply speech",
              prompt: "Write (1) a case file for your side: definition, stance, three arguments with ARE, and two predicted opposing arguments with your rebuttals; (2) a short reply speech that summarises the two main clashes and explains why your side won.",
              image: "report",
              minWords: 250,
              maxWords: 380,
              tips: ["Definition and stance", "Argument 1–3: Assertion, Reasoning, Evidence", "Predicted opposition: They may say … We will respond that …", "Reply: There were two main clashes in this debate. The first was … The second was … We won these because …"],
              models: [{ label: "Case file (Government)", text: "Motion: This House would ban homework in primary schools.\nDefinition: Primary schools (Grades 1–6) will not assign written homework. Reading for pleasure and family activities are encouraged but not graded.\nStance: Young children learn best through play, rest and family time.\nArgument 1 — Wellbeing. Assertion: homework harms young children's wellbeing. Reasoning: long school days plus homework leave little time for sleep and play, which are essential for development. Evidence: many paediatric guidelines recommend 9–12 hours of sleep for this age group.\nArgument 2 — Equality. Assertion: homework increases inequality. Reasoning: children with educated parents or tutors get help, while others struggle alone. Evidence: teachers often report that the same students always have incomplete homework because no one at home can help.\nArgument 3 — Little academic benefit. Assertion: research shows weak links between homework and achievement at primary level.\nPredicted opposition: “Homework builds discipline.” Response: discipline can be built through classroom routines and responsibilities without extra stress at home.\nReply: The two main clashes were wellbeing and equality. The opposition never explained how children without support at home benefit from homework, so we won the equality clash. And they accepted that rest matters, which supports our wellbeing case." }],
              rubric: ["My definition and stance are clear.", "Each argument has assertion, reasoning and evidence.", "I predicted opposing arguments and prepared rebuttals.", "My reply speech summarises clashes without new arguments.", "My language is formal and persuasive."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sma12-c6-l3-c1", "What do judges assess as “manner”?", ["how you deliver your speech", "the number of arguments", "your clothes"], 0, "Cara penyampaian."),
        pick("sma12-c6-l3-c2", "What should reply speakers NOT do?", ["introduce new arguments", "summarise clashes", "explain why their side won"], 0, "Tidak ada argumen baru."),
        arrange("sma12-c6-l3-c3", "Put the words in order.", "For these reasons we are proud to propose", "Penutup speech."),
        fill("sma12-c6-l3-c4", "Complete: We ___ the motion as follows.", "We", "the motion as follows.", ["define"], "Mendefinisikan mosi."),
        trPick("sma12-c6-l3-c5", "“Pendirian/sikap tim” in English is…", ["stance", "stand-up", "stamp"], 0, "Stance."),
        pick("sma12-c6-l3-c6", "Why is a clear definition important at the start of a debate?", ["It sets the boundaries so both teams debate the same thing.", "It makes the speech longer.", "It is only for decoration."], 0, "Batasan debat.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma12-c6-post",
    title: "Chapter 6 Posttest",
    passPercent: 70,
    passages: [DEBATE],
    questions: [
      pick("sma12-c6-post1", "“My opponent claims that…, but this argument fails because…” is a…", ["rebuttal", "definition", "greeting", "conclusion"], 0, "Sanggahan."),
      listen("sma12-c6-post2", voice("Moving on to my second argument, which is about the economic impact."), "Listen. What is the speaker doing?", ["signposting a new argument", "concluding", "rebutting", "asking a POI"], 0, "Signposting."),
      trPick("sma12-c6-post3", "“Juri” (in a debate) in English is…", ["adjudicator / judge", "adviser", "audience", "announcer"], 0, "Adjudicator."),
      pick("sma12-c6-post4", "The E in ARE stands for…", ["Evidence", "Emotion", "Example only", "Ending"], 0, "Evidence."),
      arrange("sma12-c6-post5", "Put the words in order.", "Would the speaker accept that it is expensive", "Point of information."),
      pick("sma12-c6-post6", "What does the Opposition say freedom includes?", ["the freedom not to participate", "the freedom to vote twice", "the freedom to skip school", "the freedom to fine others"], 0, "Baris 3.", { passageId: DEBATE.id }),
      match("sma12-c6-post7", "Match the speaker and the job.", [["Prime Minister", "defines the motion"], ["Deputy PM", "rebuts and adds arguments"], ["Reply speaker", "summarises the clashes"], ["Adjudicator", "judges the debate"]], "Peran dalam debat."),
      fill("sma12-c6-post8", "Complete.", "punishing citizens with fines is unfair to people who cannot easily reach polling", ".", ["stations"], "Baris 5.", { passageId: DEBATE.id }),
      pick("sma12-c6-post9", "How does the Government protect “the freedom not to choose”?", ["by allowing blank ballots", "by removing fines", "by cancelling elections", "by online voting"], 0, "Baris 7.", { passageId: DEBATE.id, hots: true }),
      pick("sma12-c6-post10", "Which piece of evidence would most strengthen the Opposition's last point?", ["data on how many islands lack polling stations and the cost of building them", "a poem about democracy", "the Prime Minister's age", "a list of political parties"], 0, "Bukti relevan.", { passageId: DEBATE.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Debate Club",
    questions: [
      live("sma12-c6-live1", "Team for the motion:", ["Government", "Opposition", "Judges", "Audience"], 0, "meeting"),
      live("sma12-c6-live2", "ARE: R =", ["Reasoning", "Rebuttal", "Result", "Reply"], 0, "owl-think"),
      live("sma12-c6-live3", "Attack the…", ["argument", "person", "judge", "audience"], 0, "target"),
      live("sma12-c6-live4", "“Mosi” =", ["motion", "emotion", "mission", "lotion"], 0, "report", true),
      live("sma12-c6-live5", "Polite rebuttal start:", ["With respect…", "You're wrong!", "Shut up…", "Whatever…"], 0, "microphone"),
      live("sma12-c6-live6", "No new arguments in…", ["reply speeches", "first speeches", "definitions", "POIs"], 0, "clock"),
      live("sma12-c6-live7", "This House ___ ban homework.", ["would", "will to", "is", "does"], 0, "pencil"),
      live("sma12-c6-live8", "Delivery score:", ["manner", "matter", "method", "motion"], 0, "trophy"),
    ],
  },
};
