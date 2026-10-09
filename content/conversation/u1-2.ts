import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pics, repeat, say, speaking, table, tip, trPick, tryIt, vocab, voice, warn } from "../kit";

// Everyday English Conversation — Unit 1: Meeting People and Small Talk · Unit 2: Getting Around

export const U1: Level = {
  id: "conv-u1",
  title: "Unit 1 — Meeting People and Small Talk",
  description: "Introduce yourself naturally, start and keep a conversation going with small talk, show interest and end conversations politely.",
  targetScore: "Speaking · Listening",
  cover: ["hello", "chat", "coffee"],
  pretest: {
    id: "conv-u1-pre",
    title: "Unit 1 Pretest",
    passPercent: 0,
    questions: [
      pick("conv-u1-pre1", "Someone says “How's it going?” A natural reply is…", ["Pretty good, thanks. You?", "I am going to the shop.", "It is going by bus.", "Goodbye."], 0, "Sapaan santai."),
      listen("conv-u1-pre2", voice("So, what do you do?"), "What is the speaker asking about?", ["your job or studies", "what you are doing right now", "your hobby", "your address"], 0, "What do you do = pekerjaan."),
      trPick("conv-u1-pre3", "“Senang ngobrol denganmu.” in English is…", ["It was nice talking to you.", "It was nice to talking you.", "Nice talk you."], 0, "Penutup percakapan."),
      pick("conv-u1-pre4", "Which is a good small-talk topic with a stranger?", ["the weather or the event you're at", "their salary", "their religion", "their weight"], 0, "Topik aman."),
      pick("conv-u1-pre5", "To show interest, you can say…", ["Oh really? How was it?", "OK.", "So what?", "Whatever."], 0, "Menunjukkan minat."),
    ],
  },
  lessons: [
    {
      id: "conv-u1-l1",
      skill: "listening",
      title: "Introductions",
      summary: "Introducing yourself and others in formal and casual situations.",
      sections: [
        {
          title: "Listen",
          blocks: [
            audio("At a workshop", say(["woman", "Hi, I don't think we've met. I'm Laras."], ["man", "Nice to meet you, Laras. I'm Adit. Are you here for the photography workshop too?"], ["woman", "Yes! I've just started learning. How about you?"], ["man", "Same here. Oh, this is my friend Bima. Bima, this is Laras."], ["man", "Hi, Laras. Nice to meet you."], ["woman", "Nice to meet you too."])),
            table(["Situation", "Phrases"], [["introducing yourself", "Hi, I'm… / I don't think we've met. I'm…"], ["introducing others", "This is my friend… / Have you met…?"], ["responding", "Nice to meet you. / Nice to meet you too."], ["formal", "Let me introduce myself. / Pleased to meet you."]]),
          ],
        },
        {
          title: "Practice",
          blocks: [
            pics([["hello", "Hi, I'm…"], ["meeting", "This is…"], ["thumbs-up", "Nice to meet you"], ["staff", "Pleased to meet you (formal)"]]),
            repeat(["I don't think we've met. I'm Laras.", "This is my friend Bima.", "Nice to meet you too.", "Are you here for the workshop too?"]),
            tryIt(pick("conv-u1-l1-try", "What is the workshop about?", ["photography", "cooking", "dancing"], 0, "Photography workshop.")),
          ],
        },
      ],
      checkpoint: [
        pick("conv-u1-l1-c1", "Who introduces Bima?", ["Adit", "Laras", "Bima himself"], 0, "This is my friend Bima."),
        pick("conv-u1-l1-c2", "Which phrase is the most formal?", ["Pleased to meet you.", "Hey!", "What's up?"], 0, "Formal."),
        match("conv-u1-l1-c3", "Match the phrase and the reply.", [["Nice to meet you.", "Nice to meet you too."], ["How are you?", "Fine, thanks. And you?"], ["This is Sari.", "Hi, Sari!"], ["What do you do?", "I'm a nurse."]], "Pasangan respons."),
        arrange("conv-u1-l1-c4", "Put the words in order.", "I don't think we've met", "Pembuka perkenalan."),
        trPick("conv-u1-l1-c5", "“Sama.” (me too, about a situation) in English is…", ["Same here.", "Same there.", "Here same."], 0, "Same here."),
        pick("conv-u1-l1-c6", "You meet your friend's boss at a dinner. Which introduction is most appropriate?", ["It's a pleasure to meet you. I'm Rina, Tara's friend.", "Yo! I'm Rina.", "Who are you?"], 0, "Sesuaikan formalitas.", { hots: true }),
      ],
    },
    {
      id: "conv-u1-l2",
      skill: "speaking",
      title: "Small Talk and Showing Interest",
      summary: "Safe topics, follow-up questions and reactions that keep a conversation going.",
      sections: [
        {
          title: "Keeping it going",
          blocks: [
            table(["Technique", "Example"], [["Ask open questions", "What brings you here? / How did you get into photography?"], ["Follow-up questions", "Oh, you're from Makassar? What's it like?"], ["React", "Really? / That sounds amazing! / No way!"], ["Share something", "I've been there once! I loved the food."]]),
            tip("Hindari pertanyaan **ya/tidak** saja. Pertanyaan **terbuka** (*What…? How…? Why…?*) membuat obrolan lebih panjang dan alami."),
            warn("Topik yang sebaiknya **dihindari** dengan orang baru di budaya internasional: gaji, berat badan, agama, politik, dan pertanyaan pribadi seperti *Why aren't you married?*"),
          ],
        },
        {
          title: "Listen and practise",
          blocks: [
            audio("Small talk at a café", say(["man", "Busy today, isn't it?"], ["woman", "It really is. I think everyone wants coffee before the rain starts!"], ["man", "Ha, probably. Do you come here often?"], ["woman", "Most mornings. I work just around the corner. How about you?"], ["man", "It's my first time. I've just moved to the area."], ["woman", "Oh, welcome! How are you finding it so far?"], ["man", "Really nice, actually. People seem friendly."])),
            speaking({
              id: "conv-u1-l2-say",
              title: "Two-minute small talk",
              prompt: "Imagine you're waiting in a queue at a café or an event. Start a conversation with a stranger, ask at least three open questions with follow-ups, react naturally and share something about yourself.",
              image: "coffee",
              seconds: 120,
              tips: ["Busy today, isn't it?", "What brings you here?", "Oh really? How long have you…?", "That sounds great! I…"],
              models: [{ label: "Model", text: "Long queue today, isn't it? … Yeah, I think the new pastries are popular. Have you tried them? … Oh really? Which one would you recommend? … I'll try that. So, what brings you to this part of town? … Ah, you work at the hospital? That must be busy. How long have you been there? … Wow, five years! I'm a student at the university nearby. I'm studying architecture. … Oh, thanks, it's tough but fun. Anyway, it was really nice talking to you. Enjoy your coffee!" }],
              rubric: ["I started the conversation naturally.", "I asked open questions and follow-ups.", "I reacted with interest.", "I shared information about myself.", "I ended the conversation politely."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("conv-u1-l2-c1", voice("How are you finding it so far?"), "What does this question mean?", ["What do you think of it so far?", "Where did you find it?", "How did you lose it?"], 0, "Finding = merasakan/menilai."),
        pick("conv-u1-l2-c2", "Which is an open question?", ["What do you enjoy most about your job?", "Do you like your job?", "Is it hot?"], 0, "Pertanyaan terbuka."),
        pick("conv-u1-l2-c3", "Someone says “I've just come back from Japan.” Best reaction:", ["Oh, nice! How was it?", "OK.", "I don't like Japan."], 0, "Reaksi + pertanyaan lanjutan."),
        fill("conv-u1-l2-c4", "Complete the question tag: Busy today, ___ it?", "Busy today,", "it?", ["isn't"], "Question tag."),
        trPick("conv-u1-l2-c5", "“Apa yang membawamu ke sini?” in English is…", ["What brings you here?", "What carries you here?", "Why you here?"], 0, "Ungkapan alami."),
        pick("conv-u1-l2-c6", "Which question could make a new acquaintance uncomfortable?", ["How much do you earn?", "How long have you lived here?", "What do you like to do at weekends?"], 0, "Topik sensitif.", { hots: true }),
      ],
    },
    {
      id: "conv-u1-l3",
      skill: "speaking",
      title: "Ending Conversations Politely",
      summary: "Closing a conversation, exchanging contacts and saying goodbye.",
      sections: [
        {
          title: "Closing phrases",
          blocks: [
            table(["Function", "Phrases"], [["signal the end", "Anyway… / Well, I should get going."], ["give a reason", "I've got a meeting in ten minutes."], ["positive comment", "It was really nice talking to you."], ["future contact", "Let's keep in touch. / Can I add you on Instagram?"], ["goodbye", "See you around! / Take care!"]]),
            repeat(["Anyway, I should get going.", "It was really nice talking to you.", "Let's keep in touch.", "Take care!"]),
          ],
        },
        {
          title: "Practice",
          blocks: [
            pics([["clock", "I should get going"], ["smartphone", "keep in touch"], ["goodbye", "Take care!"], ["happy", "nice talking to you"]]),
            speaking({
              id: "conv-u1-l3-say",
              title: "Close the conversation",
              prompt: "You've been chatting with someone at an event for ten minutes, but you need to leave. End the conversation politely: signal the end, give a reason, say something positive, suggest keeping in touch and say goodbye.",
              image: "goodbye",
              seconds: 45,
              tips: ["Anyway, …", "I'm afraid I have to …", "It was great to …", "Shall we exchange numbers?", "Take care!"],
              models: [{ label: "Model", text: "Anyway, I'm afraid I have to go. My bus leaves in fifteen minutes. It was really great chatting with you, especially about your trip to Labuan Bajo. Shall we exchange numbers? I'd love to hear more about the diving next time. … Perfect. See you around, and take care!" }],
              rubric: ["I signalled the end naturally.", "I gave a polite reason.", "I said something positive.", "I suggested future contact and said goodbye."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("conv-u1-l3-c1", "Which phrase signals the end of a conversation?", ["Anyway, I should get going.", "So, what do you do?", "Nice to meet you."], 0, "Penanda akhir."),
        pick("conv-u1-l3-c2", "Which closing sounds rude?", ["Bye. I'm bored.", "It was lovely talking to you.", "Take care!"], 0, "Tidak sopan."),
        match("conv-u1-l3-c3", "Match the function and the phrase.", [["future contact", "Let's keep in touch."], ["reason", "I've got a meeting soon."], ["positive comment", "It was great to chat."], ["goodbye", "See you around!"]], "Fungsi."),
        fill("conv-u1-l3-c4", "Complete: It was really nice ___ to you.", "It was really nice", "to you.", ["talking"], "Nice talking to you."),
        trPick("conv-u1-l3-c5", "“Jaga diri ya!” in English is…", ["Take care!", "Keep body!", "Save yourself!"], 0, "Take care."),
        pick("conv-u1-l3-c6", "Why is giving a reason helpful when leaving a conversation?", ["It shows you're not leaving because you're uninterested.", "It is required by law.", "It makes the conversation longer."], 0, "Kesopanan.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "conv-u1-post",
    title: "Unit 1 Review Quiz",
    passPercent: 70,
    questions: [
      pick("conv-u1-post1", "“Have you met Dian?” — “___”", ["No, I haven't. Hi, Dian!", "Yes, I meet.", "Dian is a name."], 0, "Respons alami."),
      listen("conv-u1-post2", voice("I don't think we've met. I'm Kevin."), "What is the speaker doing?", ["introducing himself", "saying goodbye", "asking for directions"], 0, "Perkenalan."),
      pick("conv-u1-post3", "Which follow-up question is best after “I work in a hospital”?", ["Oh, what do you do there?", "Hospitals are big.", "OK."], 0, "Pertanyaan lanjutan."),
      pick("conv-u1-post4", "Which reaction shows surprise?", ["No way!", "Fine.", "Bye."], 0, "Kejutan."),
      trPick("conv-u1-post5", "“Bagaimana menurutmu tempat ini sejauh ini?” in English is…", ["How are you finding it so far?", "How do you find so far it?", "Where is it far?"], 0, "Ungkapan alami."),
      arrange("conv-u1-post6", "Put the words in order.", "Shall we exchange numbers", "Menawarkan bertukar kontak."),
      pick("conv-u1-post7", "Which topic is safest for small talk with a new colleague?", ["the weekend", "their salary", "their age", "their marriage"], 0, "Topik aman."),
      listen("conv-u1-post8", voice("Anyway, I'd better get going. It was lovely to meet you."), "What will the speaker do?", ["leave", "stay longer", "ask a question"], 0, "Penutup."),
      pick("conv-u1-post9", "A stranger at a conference says “Interesting talk, wasn't it?”. Best reply:", ["Yes, really! I loved the part about AI. What did you think?", "No.", "Who are you?"], 0, "Setuju + lanjutkan.", { hots: true }),
      pick("conv-u1-post10", "Why do open questions work better in small talk?", ["They invite longer answers and keep the conversation going.", "They are shorter.", "They are more formal."], 0, "Alasan.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Small Talk Stars",
    questions: [
      live("conv-u1-live1", "Reply to “Nice to meet you.”", ["Nice to meet you too.", "Me too nice.", "Thanks you.", "Bye."], 0, "hello"),
      live("conv-u1-live2", "Open question:", ["What brings you here?", "Is it cold?", "Do you like tea?", "Are you OK?"], 0, "question"),
      live("conv-u1-live3", "Ending phrase:", ["I should get going.", "Let's start.", "Hello!", "How are you?"], 0, "goodbye"),
      live("conv-u1-live4", "“Sama.” =", ["Same here.", "Same there.", "Also me same.", "Here same."], 0, "thumbs-up", true),
      live("conv-u1-live5", "Avoid with strangers:", ["salary", "weather", "food", "travel"], 0, "money"),
      live("conv-u1-live6", "Show interest:", ["Really? Tell me more!", "OK.", "Whatever.", "So?"], 0, "happy"),
      live("conv-u1-live7", "Busy today, ___ it?", ["isn't", "is", "doesn't", "wasn't"], 0, "coffee"),
      live("conv-u1-live8", "Formal greeting:", ["Pleased to meet you.", "Yo!", "Hey dude!", "Sup?"], 0, "staff"),
    ],
  },
};

export const U2: Level = {
  id: "conv-u2",
  title: "Unit 2 — Getting Around",
  description: "Ask for and give directions, use public transport and ride-hailing, and buy things in shops and markets.",
  targetScore: "Speaking · Listening",
  cover: ["map", "bus", "cart"],
  pretest: {
    id: "conv-u2-pre",
    title: "Unit 2 Pretest",
    passPercent: 0,
    questions: [
      pick("conv-u2-pre1", "“Excuse me, how do I get to the station?” This is…", ["asking for directions", "buying a ticket", "complaining"], 0, "Bertanya arah."),
      listen("conv-u2-pre2", voice("Go straight ahead and take the second left. It's next to the bank."), "Where is the place?", ["next to the bank, second left", "first right", "behind the bank"], 0, "Second left, next to the bank."),
      trPick("conv-u2-pre3", "“Berapa harganya?” in English is…", ["How much is it?", "How many is it?", "What price it?"], 0, "How much."),
      pick("conv-u2-pre4", "Which is polite in a shop?", ["Could I try this on, please?", "Give me that.", "I want try."], 0, "Sopan."),
      pick("conv-u2-pre5", "A return ticket means…", ["a ticket to go and come back", "a ticket for one way", "a refund", "a free ticket"], 0, "Pulang-pergi."),
    ],
  },
  lessons: [
    {
      id: "conv-u2-l1",
      skill: "listening",
      title: "Asking for and Giving Directions",
      summary: "Polite questions, direction phrases and checking understanding.",
      sections: [
        {
          title: "Direction language",
          blocks: [
            table(["Asking", "Giving"], [["Excuse me, how do I get to…?", "Go straight ahead / along this road."], ["Is there a … near here?", "Take the first/second left/right."], ["Could you tell me where … is?", "It's opposite / next to / on the corner of…"], ["Is it far?", "It's about a five-minute walk."]]),
            pics([["turn-left", "turn left"], ["turn-right", "turn right"], ["go-straight", "go straight"], ["traffic-light", "at the traffic lights"]]),
          ],
        },
        {
          title: "Listen",
          blocks: [
            audio("Lost near the old town", say(["woman", "Excuse me, could you tell me how to get to the museum?"], ["man", "Sure. Go straight along this road until you reach the traffic lights. Then turn right."], ["woman", "Right at the lights. OK."], ["man", "Walk for about two minutes, and the museum is on your left, opposite a big park."], ["woman", "So, straight, right at the lights, and it's on the left opposite the park?"], ["man", "Exactly. You can't miss it."])),
            tryIt(pick("conv-u2-l1-try", "Where is the museum?", ["on the left, opposite a park", "on the right, next to a bank", "behind the traffic lights"], 0, "Detail arah.")),
          ],
        },
      ],
      checkpoint: [
        pick("conv-u2-l1-c1", "Why does the woman repeat the directions?", ["to check she understood", "to be rude", "to give directions back"], 0, "Memeriksa pemahaman."),
        listen("conv-u2-l1-c2", voice("It's on the corner of Jalan Merdeka and Jalan Sudirman."), "Where is it?", ["on a corner where two roads meet", "in the middle of a road", "far outside town"], 0, "On the corner."),
        match("conv-u2-l1-c3", "Match the picture and the direction.", [["pic:turn-left", "Turn left."], ["pic:turn-right", "Turn right."], ["pic:go-straight", "Go straight on."], ["pic:traffic-light", "at the lights"]], "Arah: belok kiri, belok kanan, lurus, di lampu lalu lintas."),
        arrange("conv-u2-l1-c4", "Put the words in order.", "Is there a pharmacy near here", "Bertanya lokasi."),
        trPick("conv-u2-l1-c5", "“Kira-kira lima menit jalan kaki.” in English is…", ["It's about a five-minute walk.", "It's five minutes walks.", "About walk five minute."], 0, "A five-minute walk."),
        pick("conv-u2-l1-c6", "You didn't understand the directions. What's the best thing to say?", ["Sorry, could you say that again more slowly?", "What?!", "Never mind, bye."], 0, "Meminta ulang dengan sopan.", { hots: true }),
      ],
    },
    {
      id: "conv-u2-l2",
      skill: "speaking",
      title: "Transport and Tickets",
      summary: "Buses, trains, taxis and ride-hailing: buying tickets and asking for information.",
      sections: [
        {
          title: "Useful language",
          blocks: [
            vocab([["single / one-way ticket", "tiket sekali jalan", "card"], ["return ticket", "tiket pulang-pergi", "card"], ["platform", "peron", "train"], ["fare", "tarif/ongkos", "money"], ["stop", "halte", "bus"], ["driver", "pengemudi", "driver"]], "Transport words"),
            table(["Situation", "Phrases"], [["buying tickets", "A return ticket to Bandung, please. / What time is the next train?"], ["on the bus", "Does this bus go to…? / Could you tell me when to get off?"], ["taxi / ride-hailing", "Could you take me to…? / Could you drop me off here?"]]),
          ],
        },
        {
          title: "Role play",
          blocks: [
            audio("At the train station", say(["man", "Good morning. A return ticket to Bandung, please."], ["woman", "For today? The next train leaves at 10:15 from platform 3."], ["man", "Great. How much is it?"], ["woman", "Economy is one hundred and fifty thousand rupiah, or executive class is two hundred and eighty thousand."], ["man", "Economy, please. And what time does the last train come back?"], ["woman", "The last one leaves Bandung at 8:30 p.m."])),
            speaking({
              id: "conv-u2-l2-say",
              title: "Buy a ticket",
              prompt: "Role-play buying a train or bus ticket. Ask about the time, platform or stop, price and the return journey. Then ask the driver or staff to tell you when to get off.",
              image: "train",
              seconds: 75,
              tips: ["A single/return ticket to …, please.", "What time is the next …?", "Which platform does it leave from?", "Could you tell me when to get off?"],
              models: [{ label: "Model", text: "Hi, a single ticket to Malang, please. … What time is the next bus? … 11:30, great. Which bay does it leave from? … Bay 6, thank you. How long does the journey take? … About two hours, OK. And excuse me, could you tell me when we get to the Arjosari terminal? I'm not sure where to get off." }],
              rubric: ["I asked for the ticket clearly.", "I asked about time, place and price.", "I asked for help to know where to get off.", "I was polite throughout."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("conv-u2-l2-c1", "What time does the next train leave?", ["10:15", "8:30", "3:00"], 0, "10:15 from platform 3."),
        pick("conv-u2-l2-c2", "Which ticket does the man buy?", ["economy return", "executive single", "economy single"], 0, "Return + economy."),
        fill("conv-u2-l2-c3", "Complete: Could you drop me ___ here, please?", "Could you drop me", "here, please?", ["off"], "Drop off."),
        pick("conv-u2-l2-c4", "On a bus, you want to know where to get off. What do you ask?", ["Could you tell me when to get off for the museum?", "Where is the bus?", "How much is the museum?"], 0, "Permintaan bantuan."),
        trPick("conv-u2-l2-c5", "“Tiket sekali jalan” in English is…", ["a single / one-way ticket", "a one ticket", "a go ticket"], 0, "Single."),
        pick("conv-u2-l2-c6", "The last train back leaves at 8:30 p.m. and your event ends at 9. What should you do?", ["Look for another way back or leave the event early.", "Take the 8:30 train after the event.", "Do nothing."], 0, "Penalaran praktis.", { hots: true }),
      ],
    },
    {
      id: "conv-u2-l3",
      skill: "speaking",
      title: "Shopping and Markets",
      summary: "Asking for items, sizes and prices, bargaining politely and paying.",
      sections: [
        {
          title: "Shop talk",
          blocks: [
            table(["Function", "Phrases"], [["looking", "I'm just looking, thanks."], ["asking", "Do you have this in a medium / in blue?"], ["trying", "Could I try it on? Where are the fitting rooms?"], ["price", "How much is this? Is there a discount?"], ["bargaining (markets)", "Could you do it for 80,000? That's a bit expensive."], ["paying", "Can I pay by card / QRIS? Could I have a receipt?"]]),
            pics([["shirt", "sizes"], ["money", "prices"], ["receipt", "receipt"], ["cart", "shopping"]]),
          ],
        },
        {
          title: "Role play",
          blocks: [
            audio("At a batik shop", say(["woman", "Hello! Can I help you?"], ["man", "Yes, do you have this shirt in a large?"], ["woman", "Let me check… Yes, here you are. Would you like to try it on?"], ["man", "Yes, please. … It fits well. How much is it?"], ["woman", "It's two hundred and fifty thousand."], ["man", "Is there any discount if I buy two?"], ["woman", "Yes, two for four hundred and fifty thousand."], ["man", "Great, I'll take two. Can I pay by QRIS?"])),
            speaking({
              id: "conv-u2-l3-say",
              title: "Shop and bargain",
              prompt: "Role-play buying a souvenir at a market. Ask about colours or sizes, the price, try to get a small discount politely, and pay.",
              image: "souvenir",
              seconds: 75,
              tips: ["Do you have this in …?", "How much is it?", "That's a bit more than I wanted to spend. Could you do …?", "OK, I'll take it. Can I pay by …?"],
              models: [{ label: "Model", text: "Hi! These wooden masks are beautiful. Do you have one in a smaller size? … Oh, this one is perfect. How much is it? … Hmm, 150,000 is a bit more than I wanted to spend. Could you do it for 120,000? … 130,000? OK, that's fair. I'll take it. Can I pay by QRIS? … Great, thank you so much!" }],
              rubric: ["I asked about the item clearly.", "I asked the price and bargained politely.", "I agreed and paid naturally.", "I was friendly throughout."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("conv-u2-l3-c1", "How much are two shirts?", ["450,000", "500,000", "250,000"], 0, "Two for 450,000."),
        pick("conv-u2-l3-c2", "What does “I'm just looking, thanks” mean?", ["I don't need help right now.", "I want to buy everything.", "I'm looking for the exit."], 0, "Hanya melihat-lihat."),
        match("conv-u2-l3-c3", "Match the question and the reply.", [["Can I help you?", "I'm just looking, thanks."], ["Do you have it in blue?", "Let me check."], ["How much is it?", "It's 75,000."], ["Can I pay by card?", "Yes, of course."]], "Pasangan dialog."),
        fill("conv-u2-l3-c4", "Complete: Could I try it ___ ?", "Could I try it", "?", ["on"], "Try on."),
        trPick("conv-u2-l3-c5", "“Boleh kurang?” (polite bargaining) in English is…", ["Could you do a better price?", "Less please now!", "Can minus?"], 0, "Menawar sopan."),
        pick("conv-u2-l3-c6", "Which bargaining sentence is most polite?", ["That's a bit expensive for me. Could you do 120,000?", "Too expensive! Cheaper!", "No. 50,000 only."], 0, "Sopan.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "conv-u2-post",
    title: "Unit 2 Review Quiz",
    passPercent: 70,
    questions: [
      pick("conv-u2-post1", "“Is it far?” — “___”", ["No, it's about a ten-minute walk.", "Yes, it is a museum.", "Far is a word."], 0, "Jawaban jarak."),
      listen("conv-u2-post2", voice("Take the first right, and it's at the end of the street."), "Where is the place?", ["at the end of the street after the first right", "on the first left", "behind you"], 0, "Detail."),
      pick("conv-u2-post3", "Which question asks about the platform?", ["Which platform does the train leave from?", "How much is the ticket?", "Is it a return?"], 0, "Platform."),
      trPick("conv-u2-post4", "“Bisa turunkan saya di sini?” in English is…", ["Could you drop me off here?", "Can you down me here?", "Put me here off?"], 0, "Drop off."),
      pick("conv-u2-post5", "“Do you have this in a medium?” is asking about…", ["size", "colour", "price", "payment"], 0, "Ukuran."),
      arrange("conv-u2-post6", "Put the words in order.", "Could I have a receipt please", "Meminta struk."),
      listen("conv-u2-post7", say(["man", "That'll be ninety-five thousand."], ["woman", "Here's a hundred."], ["man", "And here's your change."]), "How much change does the woman get?", ["5,000", "15,000", "50,000"], 0, "100.000 − 95.000."),
      pick("conv-u2-post8", "Which is the best way to check directions?", ["So I go straight and turn left at the bank?", "OK bye.", "Directions are hard."], 0, "Konfirmasi."),
      pick("conv-u2-post9", "A shop assistant offers help but you only want to browse. Best reply:", ["Thanks, I'm just looking for now.", "Go away.", "No help."], 0, "Sopan.", { hots: true }),
      pick("conv-u2-post10", "Why is repeating directions back to someone useful?", ["It confirms you understood correctly.", "It is polite to repeat everything.", "It makes them walk with you."], 0, "Konfirmasi.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Out and About",
    questions: [
      live("conv-u2-live1", "Go and come back ticket:", ["return", "single", "one-way", "half"], 0, "card"),
      live("conv-u2-live2", "Opposite of turn left:", ["turn right", "go back", "go straight", "stop"], 0, "turn-right"),
      live("conv-u2-live3", "How ___ is it?", ["much", "many", "long", "far"], 0, "money"),
      live("conv-u2-live4", "“Peron” =", ["platform", "plate", "plan", "plaza"], 0, "train", true),
      live("conv-u2-live5", "Try clothes ___", ["on", "in", "at", "up"], 0, "shirt"),
      live("conv-u2-live6", "Browsing:", ["I'm just looking.", "I'll buy all.", "Give me.", "Cheaper!"], 0, "cart"),
      live("conv-u2-live7", "Drop me ___ here.", ["off", "out", "down", "away"], 0, "taxi"),
      live("conv-u2-live8", "Checking directions:", ["So I turn left at the bank?", "Bye!", "What is a bank?", "No."], 0, "map"),
    ],
  },
};
