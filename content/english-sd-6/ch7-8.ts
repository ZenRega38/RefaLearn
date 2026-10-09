import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 6 (Fase C). Chapter 7 — Invitations and Cards · Chapter 8 — My Dream and Graduation

const INVITE: Passage = {
  id: "sd6-c7-invite",
  title: "A Birthday Invitation",
  pic: "card",
  lines: [
    "Dear Nadia,",
    "Please come to my 12th birthday party!",
    "Day and date: Saturday, 14 March",
    "Time: 3 p.m. to 6 p.m.",
    "Place: My house, Jalan Melati No. 8, Bandung",
    "There will be games, a magic show and lots of cake. Please wear something blue!",
    "Please let me know by Thursday if you can come. Call or text me at 0812-3456-7890.",
    "See you there! Fajar",
  ],
};

export const CH7: Level = {
  id: "sd6-ch7",
  title: "Chapter 7 — Invitations and Cards",
  description: "Invite people, accept and decline politely, read and write invitations, and write greeting cards for special days.",
  targetScore: "Reading · Writing · Speaking",
  cover: ["card", "envelope", "cake"],
  pretest: {
    id: "sd6-c7-pre",
    title: "Chapter 7 Pretest",
    passPercent: 0,
    questions: [
      pick("sd6-c7-pre1", "“Would you like to come to my party?” — “Yes, ___!”", ["I'd love to", "I'm sorry", "I don't", "I can't"], 0, "Menerima undangan → I'd love to."),
      listen("sd6-c7-pre2", voice("I'm sorry, I can't come. I have to visit my grandmother."), "Listen. Can she come?", ["No, she can't.", "Yes, she can.", "Maybe later."], 0, "I can't come."),
      trPick("sd6-c7-pre3", "“Undangan” in English is…", ["invitation", "information", "introduction", "instruction"], 0, "Undangan = invitation."),
      pick("sd6-c7-pre4", "What do we write on a birthday card?", ["Happy birthday!", "Get well soon!", "Good luck on your test!", "Sorry for your loss."], 0, "Kartu ulang tahun.", { image: "card" }),
      pick("sd6-c7-pre5", "An invitation must tell us the…", ["date, time and place", "price of the cake", "name of the teacher"], 0, "Waktu dan tempat acara."),
    ],
  },
  lessons: [
    {
      id: "sd6-c7-l1",
      skill: "speaking",
      title: "Inviting, Accepting and Declining",
      summary: "Would you like to…? / How about…? / I'd love to. / I'm sorry, I can't.",
      sections: [
        {
          title: "Useful expressions",
          blocks: [
            table(["Inviting", "Accepting", "Declining politely"], [["Would you like to come to …?", "I'd love to!", "I'm sorry, I can't. I have to …"], ["Can you come to …?", "Sure! What time?", "Thank you, but I'm busy that day."], ["How about going to … together?", "That sounds great!", "I'd love to, but …"], ["Let's go to …!", "Okay, why not?", "Maybe next time."]]),
            tip("Saat menolak, selalu **berterima kasih** dan **beri alasan**. Ini lebih sopan daripada hanya bilang *No*."),
            repeat(["Would you like to come to my party?", "I'd love to!", "I'm sorry, I can't. I have a piano lesson.", "Maybe next time."]),
          ],
        },
        {
          title: "On the phone",
          blocks: [
            audio("Two invitations", say(["man", "Hi, Sinta. Would you like to come to my house on Sunday? We're going to make pempek."], ["woman", "I'd love to! What time?"], ["man", "At ten in the morning."], ["woman", "Great. See you on Sunday!"], ["man", "Hi, Budi. Can you come to my house on Sunday? We're going to make pempek."], ["man", "Oh, thank you, Dimas, but I'm sorry, I can't. I have a football match. Maybe next time!"])),
            tryIt(pick("sd6-c7-l1-try1", "Why can't Budi come?", ["He has a football match.", "He is sick.", "He doesn't like pempek."], 0, "I have a football match.")),
            speaking({
              id: "sd6-c7-l1-say",
              title: "Role play: an invitation",
              prompt: "Practise both sides. First, invite a friend to an event (a birthday, a picnic, a futsal match). Then, decline an invitation politely with a reason.",
              image: "phone-call",
              seconds: 60,
              tips: ["Would you like to come to … on …?", "It starts at …", "I'd love to! / I'm sorry, I can't. I have to …", "Thanks for inviting me."],
              models: [{ label: "Inviting", text: "Hi, Lala! Would you like to come to our class picnic at Taman Kota on Saturday? It starts at eight in the morning. Please bring some snacks to share!" }, { label: "Declining", text: "Thank you for inviting me, Rio. I'd love to come, but I'm sorry, I can't. I have to go to my cousin's wedding on Saturday. Have fun, and maybe next time!" }],
              rubric: ["I gave the event, the day and the time.", "I declined politely with **thank you** and a reason.", "My voice sounded friendly."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd6-c7-l1-c1", say(["man", "How about watching a movie tonight?"], ["woman", "That sounds great!"]), "Listen. Does she accept?", ["Yes, she does.", "No, she doesn't.", "She doesn't know."], 0, "That sounds great = menerima."),
        pick("sd6-c7-l1-c2", "Which is a polite way to decline?", ["Thank you, but I'm busy that day.", "No. I don't want to.", "Your party is boring."], 0, "Sopan + alasan."),
        match("sd6-c7-l1-c3", "Match the invitation and the reply.", [["Would you like some cake?", "Yes, please."], ["Can you come on Friday?", "Sure! What time?"], ["Let's play futsal!", "Okay, why not?"]], "Ajakan dan jawaban!"),
        arrange("sd6-c7-l1-c4", "Put the words in order.", "Would you like to come to my party", "Would you like to + kata kerja."),
        trPick("sd6-c7-l1-c5", "“Mungkin lain kali.” in English is…", ["Maybe next time.", "Maybe last time.", "Maybe this time."], 0, "Lain kali = next time."),
        pick("sd6-c7-l1-c6", "Your friend invites you, but you are not sure your parents will allow it. What should you say?", ["Thanks! I'll ask my parents and tell you tonight.", "No way!", "Yes, I'm coming for sure!"], 0, "Jawaban jujur dan sopan.", { hots: true }),
      ],
    },
    {
      id: "sd6-c7-l2",
      skill: "reading",
      title: "Reading: A Birthday Invitation",
      summary: "The parts of a written invitation and RSVP.",
      passages: [INVITE],
      sections: [
        {
          title: "Fajar's invitation",
          blocks: [
            { type: "passage", passage: INVITE },
            table(["Part", "In the invitation"], [["Receiver", "Dear Nadia,"], ["Event", "my 12th birthday party"], ["Day, date, time", "Saturday, 14 March, 3–6 p.m."], ["Place", "Jalan Melati No. 8, Bandung"], ["Extra information", "games, magic show, wear something blue"], ["RSVP (reply)", "Please let me know by Thursday."], ["Sender", "Fajar"]]),
            text("**RSVP** artinya pengundang minta dikabari apakah kamu bisa datang atau tidak."),
          ],
        },
        {
          title: "Check details",
          blocks: [
            tryIt(pick("sd6-c7-l2-try1", "What colour should guests wear?", ["blue", "red", "white"], 0, "Baris 6.", { passageId: INVITE.id })),
            vocab([["guest", "tamu", "customer"], ["host", "tuan rumah", "boy"], ["let me know", "kabari aku", "phone-call"], ["magic show", "pertunjukan sulap", "hat"]], "Party words"),
          ],
        },
      ],
      checkpoint: [
        pick("sd6-c7-l2-c1", "How old will Fajar be?", ["12", "11", "13"], 0, "Baris 2.", { passageId: INVITE.id }),
        pick("sd6-c7-l2-c2", "How long is the party?", ["three hours", "two hours", "six hours"], 0, "Pukul 3 sampai 6 sore = tiga jam.", { passageId: INVITE.id }),
        fill("sd6-c7-l2-c3", "Complete.", "Please let me know by", "if you can come.", ["Thursday"], "Baris 7.", { passageId: INVITE.id }),
        pickMany("sd6-c7-l2-c4", "Choose ALL the activities at the party.", ["games", "a magic show", "cake", "swimming"], [0, 1, 2], "Baris 6.", { passageId: INVITE.id }),
        pick("sd6-c7-l2-c5", "Nadia can come. What should she do before Thursday?", ["call or text Fajar", "buy a blue cake", "go to Fajar's school"], 0, "Baris 7: RSVP.", { passageId: INVITE.id, hots: true }),
        pick("sd6-c7-l2-c6", "Which information is MISSING from the invitation?", ["what to bring as a gift", "the time", "the address"], 0, "Waktu dan alamat ada; hadiah tidak disebut.", { passageId: INVITE.id, hots: true }),
      ],
    },
    {
      id: "sd6-c7-l3",
      skill: "writing",
      title: "Greeting Cards and Invitations",
      summary: "Writing cards for special days and your own invitation.",
      sections: [
        {
          title: "Card messages",
          blocks: [
            table(["Occasion", "Message"], [["Birthday", "Happy birthday! Wishing you a wonderful year ahead."], ["Get well", "Get well soon! I hope you feel better quickly."], ["Congratulations", "Congratulations on winning the competition! You did a great job."], ["Thank you", "Thank you so much for helping me with my project."], ["Eid al-Fitr", "Happy Eid al-Fitr! Please forgive me for all my mistakes."], ["Good luck", "Good luck on your exam! You can do it!"]]),
            pics([["card", "birthday"], ["medicine", "get well"], ["trophy", "congratulations"], ["ketupat", "Eid"]]),
          ],
        },
        {
          title: "Write it",
          blocks: [
            writing({
              id: "sd6-c7-l3-write",
              title: "An invitation and a card",
              prompt: "Write (1) an invitation to an event you are planning, and (2) a short greeting card for a friend or teacher.",
              image: "envelope",
              minWords: 60,
              maxWords: 150,
              tips: ["Dear …, Please come to …", "Day/date, time, place", "Extra information + RSVP", "Card: Dear … , Happy …! I hope … Love, …"],
              models: [{ label: "Invitation", text: "Dear friends of 6B,\nPlease come to our class farewell picnic!\nDay and date: Sunday, 7 June\nTime: 8 a.m. to 1 p.m.\nPlace: Taman Hutan Raya, Bandung\nBring a mat, a water bottle and food to share. Please don't bring plastic bags.\nPlease tell Ms. Ratna by Wednesday.\nSee you there! The class committee" }, { label: "Card", text: "Dear Ms. Ratna,\nHappy Teachers' Day! Thank you for teaching us with patience and a smile every day. We will never forget your fun English lessons.\nLove, Dinda" }],
              rubric: ["My invitation has the event, date, time and place.", "I added extra information and an RSVP.", "My card has a greeting, a message and a closing.", "My messages are polite and friendly."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd6-c7-l3-c1", voice("Get well soon! I hope you feel better quickly."), "Listen. When do we send this card?", ["when someone is sick", "on a birthday", "after a wedding"], 0, "Get well soon = semoga cepat sembuh."),
        match("sd6-c7-l3-c2", "Match the occasion and the message.", [["birthday", "Happy birthday!"], ["sick friend", "Get well soon!"], ["exam", "Good luck!"], ["winner", "Congratulations!"]], "Pesan kartu!"),
        trPick("sd6-c7-l3-c3", "“Selamat atas kemenanganmu!” in English is…", ["Congratulations on your win!", "Get well soon!", "Happy birthday!"], 0, "Congratulations."),
        fill("sd6-c7-l3-c4", "Complete: Good ___ on your exam!", "Good", "on your exam!", ["luck"], "Good luck."),
        pick("sd6-c7-l3-c5", "Which closing is best for a card to your best friend?", ["Love, Dinda", "Yours faithfully, Dinda", "From the Headmaster"], 0, "Penutup akrab untuk teman."),
        pick("sd6-c7-l3-c6", "Your teacher's father died. Which message is appropriate?", ["I'm so sorry for your loss.", "Congratulations!", "Happy holiday!"], 0, "Ungkapan duka cita.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd6-c7-post",
    title: "Chapter 7 Posttest",
    passPercent: 70,
    passages: [INVITE],
    questions: [
      pick("sd6-c7-post1", "“Would you like to join our picnic?” — “___ What time?”", ["Sure!", "No.", "Never.", "Goodbye."], 0, "Menerima: Sure!"),
      listen("sd6-c7-post2", voice("Thanks for the invitation, but I have to help my mother at her shop that day."), "Listen. What does he say?", ["He declines politely.", "He accepts.", "He invites someone."], 0, "Menolak dengan sopan dan alasan."),
      trPick("sd6-c7-post3", "“Tamu” in English is…", ["guest", "host", "ghost", "gift"], 0, "Tamu = guest."),
      pick("sd6-c7-post4", "Which message is for a friend who is in hospital?", ["Get well soon!", "Happy new year!", "Good luck on your test!", "Congratulations!"], 0, "Get well soon."),
      arrange("sd6-c7-post5", "Put the words in order.", "I'm sorry I can't come", "Menolak undangan."),
      pick("sd6-c7-post6", "Where is the party?", ["at Fajar's house", "at school", "in a restaurant", "at the park"], 0, "Baris 5.", { passageId: INVITE.id }),
      match("sd6-c7-post7", "Match the part of the invitation.", [["Dear Nadia,", "receiver"], ["Fajar", "sender"], ["3 p.m. to 6 p.m.", "time"], ["Please let me know", "RSVP"]], "Bagian undangan!"),
      fill("sd6-c7-post8", "Complete: I'd ___ to come! (senang sekali)", "I'd", "to come!", ["love"], "I'd love to.", { translate: true }),
      pick("sd6-c7-post9", "Nadia arrives at 6 p.m. What will happen?", ["The party will be over.", "The party will start.", "She will be early.", "She will see the magic show."], 0, "Pesta selesai pukul 6.", { passageId: INVITE.id, hots: true }),
      pick("sd6-c7-post10", "Your friend invites you but you already promised to visit your grandma. The BEST answer is…", ["Thanks so much, but I promised to visit my grandma. Have a great party!", "I don't like parties.", "Okay, I'll come and forget my grandma.", "Why did you invite me?"], 0, "Menolak sopan dengan alasan jujur.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — You're Invited!",
    questions: [
      live("sd6-c7-live1", "Accepting:", ["I'd love to!", "I can't.", "No way.", "Maybe not."], 0, "happy"),
      live("sd6-c7-live2", "Card for a sick friend:", ["Get well soon!", "Happy birthday!", "Good luck!", "Well done!"], 0, "medicine"),
      live("sd6-c7-live3", "“Undangan” =", ["invitation", "instruction", "information", "invention"], 0, "envelope", true),
      live("sd6-c7-live4", "RSVP means…", ["please reply", "please eat", "please sing", "please sit"], 0, "phone-call"),
      live("sd6-c7-live5", "Would you like ___ come?", ["to", "for", "at", "-ing"], 0, "question"),
      live("sd6-c7-live6", "For a winner:", ["Congratulations!", "Get well!", "Sorry!", "Bye!"], 0, "trophy"),
      live("sd6-c7-live7", "Polite decline:", ["Maybe next time.", "Never!", "Go away.", "So boring."], 0, "thumbs-up"),
      live("sd6-c7-live8", "Eid card food:", ["ketupat", "pizza", "burger", "sushi"], 0, "ketupat"),
    ],
  },
};

const SPEECH: Passage = {
  id: "sd6-c8-speech",
  title: "A Farewell Speech",
  pic: "graduation",
  lines: [
    "Good morning, Mr. Headmaster, dear teachers, parents and friends.",
    "Today is a special day. After six years, we are finally graduating from elementary school.",
    "I remember my first day in Grade 1. I was scared and I cried, but my teacher held my hand.",
    "Since then, we have learned to read, to count, to work together and to be honest.",
    "Dear teachers, thank you for your patience and your love. We are sorry for our mistakes.",
    "Next year, we will go to different junior high schools, but we will always be friends.",
    "I want to be a doctor, so I will study hard. Whatever your dream is, never give up!",
    "Thank you, and goodbye, SD Harapan Bangsa!",
  ],
};

export const CH8: Level = {
  id: "sd6-ch8",
  title: "Chapter 8 — My Dream and Graduation",
  description: "Talk about dreams and future jobs, give reasons with because and so, express thanks and say goodbye, and give a short farewell speech.",
  targetScore: "Speaking · Reading · Writing",
  cover: ["graduation", "doctor", "pilot"],
  pretest: {
    id: "sd6-c8-pre",
    title: "Chapter 8 Pretest",
    passPercent: 0,
    questions: [
      pick("sd6-c8-pre1", "“What do you want to be?” — “I want to be ___ pilot.”", ["a", "an", "the", "–"], 0, "A pilot.", { image: "pilot" }),
      listen("sd6-c8-pre2", voice("I want to be a vet because I love animals."), "Listen. Why does she want to be a vet?", ["She loves animals.", "She loves cars.", "She loves cooking."], 0, "Because I love animals."),
      trPick("sd6-c8-pre3", "“Cita-cita” in English is…", ["dream / ambition", "idea", "hobby", "job"], 0, "Cita-cita = dream/ambition."),
      pick("sd6-c8-pre4", "A person who designs buildings is an…", ["architect", "astronaut", "artist", "actor"], 0, "Arsitek merancang bangunan."),
      pick("sd6-c8-pre5", "What do we say at the end of a speech?", ["Thank you.", "Good morning.", "Hello.", "Nice to meet you."], 0, "Penutup pidato."),
    ],
  },
  lessons: [
    {
      id: "sd6-c8-l1",
      skill: "vocabulary",
      title: "Dream Jobs",
      summary: "More jobs and what they do; I want to be… because…",
      sections: [
        {
          title: "Jobs and duties",
          blocks: [
            vocab([
              ["doctor", "dokter", "doctor", "A doctor treats sick people."],
              ["pilot", "pilot", "pilot", "A pilot flies planes."],
              ["chef", "koki", "chef", "A chef cooks in a restaurant."],
              ["police officer", "polisi", "police", "A police officer keeps people safe."],
              ["teacher", "guru", "teacher-woman", "A teacher helps students learn."],
              ["firefighter", "pemadam kebakaran", "firefighter", "A firefighter puts out fires."],
            ], "Jobs you know"),
            table(["New job", "Meaning", "What they do"], [["engineer", "insinyur", "designs and builds machines, roads or bridges"], ["vet", "dokter hewan", "takes care of sick animals"], ["scientist", "ilmuwan", "does experiments and discovers new things"], ["programmer", "programmer", "writes computer programs and apps"], ["architect", "arsitek", "designs houses and buildings"], ["athlete", "atlet", "competes in sports"], ["journalist", "wartawan", "writes news for newspapers and websites"]]),
          ],
        },
        {
          title: "Talking about dreams",
          blocks: [
            table(["Question", "Answer"], [["What do you want to be in the future?", "I want to be a vet."], ["Why?", "Because I love animals and I want to help them."], ["What should you do to get there?", "I should study science and work hard."]]),
            repeat(["I want to be an engineer because I like building things.", "She wants to be a journalist because she loves writing.", "He wants to be an athlete, so he practises every day."]),
            warn("Pakai **an** sebelum bunyi vokal: *an engineer, an architect, an athlete*. Dengan *she/he*, pakai **wants**: *She **wants** to be…*"),
            tryIt(pick("sd6-c8-l1-try1", "A person who writes apps is a…", ["programmer", "pilot", "farmer"], 0, "Programmer menulis program/aplikasi.", { image: "laptop" })),
          ],
        },
      ],
      checkpoint: [
        listen("sd6-c8-l1-c1", voice("My brother wants to be an architect because he loves drawing houses."), "Listen. What does her brother want to be?", ["an architect", "an athlete", "an artist"], 0, "Architect."),
        match("sd6-c8-l1-c2", "Match the job and the duty.", [["vet", "takes care of animals"], ["journalist", "writes the news"], ["scientist", "does experiments"], ["firefighter", "puts out fires"]], "Pekerjaan dan tugasnya!"),
        pick("sd6-c8-l1-c3", "She ___ to be a scientist.", ["wants", "want", "wanting"], 0, "She + wants."),
        fill("sd6-c8-l1-c4", "Complete: I want to be ___ engineer.", "I want to be", "engineer.", ["an"], "Engineer diawali bunyi vokal → an."),
        trPick("sd6-c8-l1-c5", "“Dokter hewan” in English is…", ["vet", "nurse", "farmer"], 0, "Dokter hewan = vet."),
        pick("sd6-c8-l1-c6", "Dimas loves maths, computers and solving puzzles. Which job suits him best?", ["programmer", "chef", "athlete"], 0, "Cocok dengan minatnya.", { hots: true }),
      ],
    },
    {
      id: "sd6-c8-l2",
      skill: "speaking",
      title: "Because and So; Thanks and Goodbye",
      summary: "Giving reasons and results; thanking teachers and saying farewell.",
      sections: [
        {
          title: "Because and so",
          blocks: [
            table(["Word", "Shows", "Example"], [["because", "a reason (alasan)", "I study hard because I want to be a doctor."], ["so", "a result (akibat)", "I want to be a doctor, so I study hard."]]),
            text("Kedua kalimat di atas punya arti yang mirip, tetapi urutannya berbeda: **because** diikuti alasan, **so** diikuti akibat."),
            tryIt(pick("sd6-c8-l2-try1", "It was raining, ___ we stayed at home.", ["so", "because", "but"], 0, "Akibat → so.")),
          ],
        },
        {
          title: "Saying goodbye",
          blocks: [
            table(["Function", "Expressions"], [["Thanking", "Thank you for everything. / Thanks for always helping me."], ["Apologising", "I'm sorry for my mistakes."], ["Saying goodbye", "I'll miss you. / Keep in touch! / See you again soon."], ["Wishing", "Good luck in your new school! / I hope your dream comes true."]]),
            audio("The last day", say(["woman", "I can't believe it's our last day, Raka."], ["man", "Me neither. I'll really miss you, Mia."], ["woman", "Thanks for always helping me with maths."], ["man", "And thank you for helping me with English! Keep in touch, okay?"], ["woman", "Of course! Good luck in your new school. I hope you become a great pilot!"])),
            speaking({
              id: "sd6-c8-l2-say",
              title: "My dream",
              prompt: "Talk about your dream job. Say what you want to be, why (because…), what you will do to reach it (so…), and how it can help other people.",
              image: "graduation",
              seconds: 75,
              tips: ["In the future, I want to be …", "I want to be … because …", "I love …, so I will …", "As a …, I can help people by …"],
              models: [{ label: "Example", text: "In the future, I want to be a vet. I want to be a vet because I love animals and I feel sad when I see sick cats on the street. I know I need good marks in science, so I will study hard in junior high school. I will also volunteer at an animal shelter. As a vet, I can help animals live healthy lives, and I can help their owners too." }],
              rubric: ["I said my dream job with the correct article (a/an).", "I used **because** and **so** correctly.", "I gave at least two steps to reach my dream.", "I explained how my job helps others."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd6-c8-l2-c1", voice("I'll miss you. Keep in touch!"), "Listen. When do people say this?", ["when they say goodbye", "when they meet for the first time", "when they are angry"], 0, "Ungkapan perpisahan."),
        pick("sd6-c8-l2-c2", "I want to be an athlete, ___ I practise every day.", ["so", "because", "or"], 0, "Akibat → so."),
        pick("sd6-c8-l2-c3", "She reads a lot ___ she wants to be a writer.", ["because", "so", "but"], 0, "Alasan → because."),
        arrange("sd6-c8-l2-c4", "Put the words in order.", "Thank you for everything", "Ungkapan terima kasih."),
        trPick("sd6-c8-l2-c5", "“Tetap berkabar ya!” in English is…", ["Keep in touch!", "Keep calm!", "Keep going!"], 0, "Keep in touch."),
        pick("sd6-c8-l2-c6", "Which sentence has the SAME meaning as “I was tired, so I went to bed early.”?", ["I went to bed early because I was tired.", "I was tired because I went to bed early.", "I went to bed early, so I was tired."], 0, "Alasan dan akibat ditukar dengan benar.", { hots: true }),
      ],
    },
    {
      id: "sd6-c8-l3",
      skill: "reading",
      title: "Reading: A Farewell Speech",
      summary: "Read a graduation speech and write your own.",
      passages: [SPEECH],
      sections: [
        {
          title: "The speech",
          blocks: [
            { type: "passage", passage: SPEECH },
            audio("Listen to the speech", say(["woman", SPEECH.lines.join(" ")])),
            tip("Struktur pidato: **pembukaan** (salam untuk hadirin), **isi** (kenangan, terima kasih, harapan), **penutup** (terima kasih dan salam)."),
            tryIt(pick("sd6-c8-l3-try1", "Who does the speaker greet first?", ["the headmaster", "her parents", "her friends"], 0, "Baris 1.", { passageId: SPEECH.id })),
          ],
        },
        {
          title: "Write your speech",
          blocks: [
            writing({
              id: "sd6-c8-l3-write",
              title: "My farewell speech",
              prompt: "Write a short farewell speech for your graduation day. Greet the audience, share a memory, thank your teachers, talk about your dream and say goodbye.",
              image: "graduation",
              minWords: 100,
              maxWords: 220,
              tips: ["Good morning, …", "I remember when …", "Thank you for …", "I want to be … so …", "Goodbye and thank you."],
              models: [{ label: "Example", text: "Good morning, Mrs. Headmistress, teachers, parents and my dear friends.\nI am very happy and a little sad today. Six years ago, I was a shy girl who never raised her hand. I remember my Grade 4 teacher, Mr. Arif, who always said, “Don't be afraid to make mistakes.” Because of him, I joined the speech contest and won second place.\nThank you, all my teachers, for your patience. I'm sorry if we were noisy and naughty sometimes.\nIn the future, I want to be a journalist because I love writing stories about people, so I will keep reading and writing every day.\nFriends, let's keep in touch and chase our dreams. Thank you, and goodbye!" }],
              rubric: ["I greeted the audience properly.", "I shared a memory with past tense.", "I thanked my teachers and said sorry.", "I talked about my dream with because/so.", "I closed politely."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd6-c8-l3-c1", "How did the speaker feel on the first day of Grade 1?", ["scared", "excited", "angry"], 0, "Baris 3.", { passageId: SPEECH.id }),
        pickMany("sd6-c8-l3-c2", "Choose ALL the things they learned.", ["to read", "to count", "to work together", "to fly a plane"], [0, 1, 2], "Baris 4.", { passageId: SPEECH.id }),
        fill("sd6-c8-l3-c3", "Complete.", "Dear teachers, thank you for your patience and your", ".", ["love"], "Baris 5.", { passageId: SPEECH.id }),
        pick("sd6-c8-l3-c4", "What does the speaker want to be?", ["a doctor", "a teacher", "a pilot"], 0, "Baris 7.", { passageId: SPEECH.id }),
        pick("sd6-c8-l3-c5", "“My teacher held my hand.” What does this tell us about the teacher?", ["She was kind and caring.", "She was strict and angry.", "She was always late."], 0, "Menggandeng tangan = peduli.", { passageId: SPEECH.id, hots: true }),
        pick("sd6-c8-l3-c6", "Which line gives advice to the audience?", ["line 7", "line 2", "line 3"], 0, "Baris 7: never give up!", { passageId: SPEECH.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd6-c8-post",
    title: "Chapter 8 Posttest",
    passPercent: 70,
    passages: [SPEECH],
    questions: [
      pick("sd6-c8-post1", "My sister wants to be ___ astronaut.", ["an", "a", "the", "–"], 0, "Astronaut diawali bunyi vokal."),
      listen("sd6-c8-post2", voice("I love cooking, so I want to be a chef and open my own restaurant."), "Listen. What is his dream?", ["to be a chef with his own restaurant", "to be a farmer", "to be a pilot"], 0, "Ingin menjadi koki (chef)."),
      trPick("sd6-c8-post3", "“Aku akan merindukanmu.” in English is…", ["I'll miss you.", "I'll meet you.", "I'll miss the bus."], 0, "Merindukan = miss."),
      pick("sd6-c8-post4", "He wants to be a doctor ___ he wants to help sick people.", ["because", "so", "but", "or"], 0, "Alasan → because."),
      arrange("sd6-c8-post5", "Put the words in order.", "I hope your dream comes true", "Ungkapan harapan."),
      pick("sd6-c8-post6", "How long did the speaker study at the school?", ["six years", "three years", "one year", "twelve years"], 0, "Baris 2.", { passageId: SPEECH.id }),
      match("sd6-c8-post7", "Match the job and the place.", [["chef", "restaurant"], ["pilot", "plane"], ["doctor", "hospital"], ["teacher", "school"]], "Tempat kerja!"),
      fill("sd6-c8-post8", "Complete: Good luck in your new ___ !", "Good luck in your new", "!", ["school"], "Good luck in your new school."),
      pick("sd6-c8-post9", "Why will the friends go to different schools next year?", ["They are graduating and choosing junior high schools.", "The school is closing.", "They don't like each other.", "They are moving abroad."], 0, "Baris 2 dan 6.", { passageId: SPEECH.id, hots: true }),
      pick("sd6-c8-post10", "What is the best title for line 7?", ["Never Give Up on Your Dream", "My First Day", "Thank You, Parents", "A Sad Goodbye"], 0, "Inti baris 7.", { passageId: SPEECH.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Dream Big!",
    questions: [
      live("sd6-c8-live1", "Flies planes:", ["pilot", "chef", "vet", "farmer"], 0, "pilot"),
      live("sd6-c8-live2", "___ engineer", ["an", "a", "the", "two"], 0, "robot"),
      live("sd6-c8-live3", "Reason word:", ["because", "so", "and", "but"], 0, "question"),
      live("sd6-c8-live4", "Treats sick animals:", ["vet", "nurse", "driver", "police"], 0, "cat"),
      live("sd6-c8-live5", "“Cita-cita” =", ["dream", "hobby", "home", "game"], 0, "owl-think", true),
      live("sd6-c8-live6", "Saying goodbye:", ["I'll miss you!", "Nice to meet you!", "How are you?", "Happy birthday!"], 0, "goodbye"),
      live("sd6-c8-live7", "Cooks in a restaurant:", ["chef", "doctor", "pilot", "farmer"], 0, "chef"),
      live("sd6-c8-live8", "Finishing school is called…", ["graduation", "invitation", "vacation", "competition"], 0, "graduation"),
    ],
  },
};
