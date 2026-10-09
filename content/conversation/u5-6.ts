import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, sequence, speaking, table, tip, trPick, tryIt, vocab, voice, warn } from "../kit";

// Everyday English Conversation — Unit 5: Phone Calls, Appointments and Plans · Unit 6: Feelings, Opinions and Tricky Situations

export const U5: Level = {
  id: "conv-u5",
  title: "Unit 5 — Phone Calls, Appointments and Plans",
  description: "Make and answer phone calls, leave messages, book appointments, invite people, and accept, decline or reschedule plans.",
  targetScore: "Speaking · Listening",
  cover: ["phone-call", "calendar", "clock"],
  pretest: {
    id: "conv-u5-pre",
    title: "Unit 5 Pretest",
    passPercent: 0,
    questions: [
      pick("conv-u5-pre1", "On the phone, the natural way to say who you are is…", ["Hi, this is Dimas.", "Hi, I am the Dimas.", "Hi, here Dimas is."], 0, "This is … di telepon."),
      listen("conv-u5-pre2", voice("I'm afraid she's in a meeting right now. Can I take a message?"), "Where is the person the caller wants?", ["in a meeting", "at lunch", "on holiday", "at home"], 0, "In a meeting."),
      trPick("conv-u5-pre3", "“Bisakah kita undur ke hari Jumat?” in English is…", ["Can we move it to Friday?", "Can we back to Friday?", "Can we delay Friday it?"], 0, "Menjadwal ulang."),
      pick("conv-u5-pre4", "Which is a polite way to decline an invitation?", ["I'd love to, but I'm busy that day.", "No. I don't want to.", "Never."], 0, "Menolak dengan sopan."),
      pick("conv-u5-pre5", "“Are you free on Saturday?” is asking about your…", ["availability", "price", "freedom from prison"], 0, "Free = tidak sibuk."),
    ],
  },
  lessons: [
    {
      id: "conv-u5-l1",
      skill: "listening",
      title: "Making and Answering Calls",
      summary: "Opening a call, asking for someone, taking and leaving messages.",
      sections: [
        {
          title: "Phone phrases",
          blocks: [
            table(["Function", "Caller", "Receiver"], [["opening", "Hi, this is Maya from Kopi Kita.", "Good morning, Sinar Office. How can I help?"], ["asking for someone", "Could I speak to Mr Hadi, please?", "Just a moment, I'll put you through."], ["person not available", "Could I leave a message?", "I'm afraid he's out. Can I take a message?"], ["checking", "Sorry, could you repeat that?", "Could you spell your name, please?"], ["closing", "Thanks for your help. Bye!", "You're welcome. Have a nice day."]]),
            tip("Di telepon, katakan **This is …**, bukan *I am …*. Kalau tidak jelas, minta pengulangan: **Sorry, could you say that again?** atau minta dieja: **Could you spell that?**"),
          ],
        },
        {
          title: "Taking a message",
          blocks: [
            audio("A phone message", say(["woman", "Good afternoon, Bintang Travel. This is Lia speaking."], ["man", "Hi, this is Arif Gunawan. Could I speak to Ms Putri, please?"], ["woman", "I'm sorry, she's with a client at the moment. Can I take a message?"], ["man", "Yes, please. Could you tell her that I need to change my booking to the fourteenth?"], ["woman", "Of course. Could you spell your surname, please?"], ["man", "G-U-N-A-W-A-N. My number is 0812 3456 789."], ["woman", "Thank you, Mr Gunawan. I'll make sure she gets the message."])),
            pics([["phone-call", "call"], ["envelope", "message"], ["calendar", "the 14th"], ["staff", "receptionist"]]),
            tryIt(pick("conv-u5-l1-try", "Why can't Ms Putri take the call?", ["She is with a client.", "She is on holiday.", "She is at lunch."], 0, "With a client.")),
          ],
        },
      ],
      checkpoint: [
        pick("conv-u5-l1-c1", "What does Arif want to do?", ["change his booking to the fourteenth", "cancel his trip", "book a new hotel"], 0, "Ubah booking."),
        pick("conv-u5-l1-c2", "Why does Lia ask him to spell his surname?", ["to write it correctly", "to test his English", "because she knows him"], 0, "Agar tidak salah tulis."),
        match("conv-u5-l1-c3", "Match the situation and the phrase.", [["You didn't hear", "Sorry, could you say that again?"], ["Person is out", "Can I take a message?"], ["Connecting a call", "I'll put you through."], ["Ending the call", "Thanks for calling. Bye!"]], "Frasa telepon."),
        fill("conv-u5-l1-c4", "Complete: Hi, ___ is Sari from the marketing team.", "Hi,", "is Sari from the marketing team.", ["this"], "This is …"),
        trPick("conv-u5-l1-c5", "“Bisa saya titip pesan?” in English is…", ["Could I leave a message?", "Can I deposit a message?", "Could I put message?"], 0, "Leave a message."),
        pick("conv-u5-l1-c6", "The line is bad and you only heard half the phone number. Best response:", ["Sorry, the line's bad. Could you repeat the number slowly?", "OK, bye.", "Write down a guess."], 0, "Klarifikasi.", { hots: true }),
      ],
    },
    {
      id: "conv-u5-l2",
      skill: "speaking",
      title: "Booking Appointments",
      summary: "Making appointments with a doctor, a barber or a service centre, and confirming details.",
      sections: [
        {
          title: "Appointment language",
          blocks: [
            vocab([["appointment", "janji temu", "calendar"], ["available", "tersedia/kosong", "clock"], ["slot", "jadwal kosong", "time-10"], ["confirm", "mengonfirmasi", "thumbs-up"], ["reschedule", "menjadwal ulang", "calendar"]], "Appointment words"),
            table(["Step", "Phrase"], [["request", "I'd like to make an appointment with Dr Wulan, please."], ["time", "Do you have anything on Tuesday morning?"], ["offer", "We have a slot at 10:30. Does that work for you?"], ["confirm", "So that's Tuesday the 9th at 10:30. Is that right?"]]),
          ],
        },
        {
          title: "Role play",
          blocks: [
            audio("Booking a dentist", say(["woman", "Senyum Dental Clinic, good morning."], ["man", "Good morning. I'd like to make an appointment for a check-up, please."], ["woman", "Sure. Have you been here before?"], ["man", "Yes, my name's Rafi Akbar."], ["woman", "Thank you. Dr Nina is available on Thursday at 4 p.m. or Saturday at 9 a.m."], ["man", "Saturday at nine would be perfect."], ["woman", "Great. So that's Saturday at 9 a.m. with Dr Nina. Please come ten minutes early."])),
            speaking({
              id: "conv-u5-l2-say",
              title: "Book an appointment",
              prompt: "Call a clinic, a barber or a phone service centre. Ask for an appointment, discuss times until you find one that works, and confirm all the details at the end.",
              image: "phone-call",
              seconds: 90,
              tips: ["I'd like to make an appointment for …", "Do you have anything on …?", "That works for me. / I'm afraid I can't make that.", "So that's … at …, right?"],
              models: [{ label: "Model", text: "Hi, I'd like to make an appointment to fix my phone screen. … Do you have anything tomorrow afternoon? … Three o'clock? I'm afraid I can't make that; I have class until four. Is there anything later? … Five thirty works for me. So that's tomorrow, Wednesday, at five thirty. Should I bring anything? … OK, my receipt and ID. Thanks a lot!" }],
              rubric: ["I made a clear request.", "I negotiated a time politely.", "I confirmed the day, time and place.", "I asked a useful follow-up question."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("conv-u5-l2-c1", "Which time does Rafi choose?", ["Saturday at 9 a.m.", "Thursday at 4 p.m.", "Saturday at 4 p.m."], 0, "Saturday 9."),
        pick("conv-u5-l2-c2", "What does the receptionist ask him to do?", ["come ten minutes early", "bring a friend", "pay online"], 0, "Datang lebih awal."),
        arrange("conv-u5-l2-c3", "Put the words in order.", "Do you have anything on Tuesday morning", "Bertanya slot."),
        fill("conv-u5-l2-c4", "Complete: Ten thirty ___ for me. (cocok)", "Ten thirty", "for me.", ["works"], "Works for me.", { translate: true }),
        trPick("conv-u5-l2-c5", "“Saya tidak bisa datang jam itu.” in English is…", ["I'm afraid I can't make that time.", "I can't come that clock.", "I'm not able that hour."], 0, "Can't make it."),
        pick("conv-u5-l2-c6", "Why is it smart to repeat the day and time at the end?", ["to avoid mistakes and confirm both sides agree", "to make the call longer", "because the receptionist forgot"], 0, "Konfirmasi.", { hots: true }),
      ],
    },
    {
      id: "conv-u5-l3",
      skill: "speaking",
      title: "Invitations and Changing Plans",
      summary: "Inviting, accepting, declining kindly and rescheduling.",
      sections: [
        {
          title: "Inviting and replying",
          blocks: [
            table(["Function", "Phrases"], [["inviting", "Do you want to…? / Would you like to…? / How about…?"], ["accepting", "Sounds great! / I'd love to. / Count me in!"], ["declining", "I'd love to, but… / Thanks for asking, but I can't make it."], ["suggesting another time", "How about next weekend instead?"], ["changing plans", "Something's come up. Can we reschedule?"]]),
            warn("Saat menolak, berikan **alasan singkat** dan, jika bisa, **tawarkan alternatif**. Jawaban *No* saja terdengar kasar dalam bahasa Inggris."),
            examples([{ wrong: "No, I can't.", right: "I'd love to, but I've got a family event. How about Sunday?", note: "Penolakan + alasan + alternatif." }, { wrong: "I cancel.", right: "I'm so sorry, something's come up. Could we move it to Friday?", note: "Membatalkan dengan sopan." }]),
          ],
        },
        {
          title: "Listen and speak",
          blocks: [
            audio("Weekend plans", say(["woman", "Hey, a few of us are going to the night market on Saturday. Want to come?"], ["man", "I'd love to, but I've got futsal until seven."], ["woman", "No problem, we're meeting at eight anyway."], ["man", "Oh, perfect! Count me in. Where should we meet?"], ["woman", "In front of the cinema. I'll send you the location."])),
            repeat(["Want to come?", "I'd love to, but I'm busy.", "Count me in!", "Something's come up. Can we reschedule?"]),
            speaking({
              id: "conv-u5-l3-say",
              title: "Plan a meet-up",
              prompt: "Invite a friend to something (a movie, a café, a study session). Your friend can't make the first time, so you find another time. Then, later, one of you has to change the plan politely.",
              image: "calendar",
              seconds: 90,
              tips: ["Do you want to …?", "I'd love to, but …", "How about … instead?", "Something's come up. Can we …?"],
              models: [{ label: "Model", text: "Hey, do you want to see the new Joko Anwar movie on Friday? … Oh, you have a deadline? No worries. How about Saturday afternoon instead? … Great, let's meet at the mall at three. … [later] Hi, I'm so sorry, something's come up. My cousin's wedding was moved to Saturday. Could we go on Sunday instead? Same time? … Thanks for understanding!" }],
              rubric: ["I invited naturally.", "I declined or rescheduled with a reason.", "I suggested an alternative.", "I sounded friendly and polite."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("conv-u5-l3-c1", "Why can the man still join?", ["The group meets after his futsal.", "He cancels futsal.", "The market opens on Sunday."], 0, "Waktunya cocok."),
        pick("conv-u5-l3-c2", "“Count me in!” means…", ["I'll join.", "Count the people.", "I'm not coming."], 0, "Count me in = hitung saya ikut, artinya saya ikut."),
        pickMany("conv-u5-l3-c3", "Choose ALL polite ways to decline.", ["I'd love to, but I've got a lot of work.", "Thanks for asking, but I can't make it this time.", "Maybe next time? I'm busy that day.", "No. Boring."], [0, 1, 2], "Menolak dengan sopan."),
        sequence("conv-u5-l3-c4", "Put the conversation in order.", ["Want to grab coffee tomorrow?", "I'd love to, but I'm busy in the morning.", "How about the afternoon?", "Sounds great!"], "Ajakan → tolak → alternatif → terima."),
        trPick("conv-u5-l3-c5", "“Ada urusan mendadak.” in English is…", ["Something's come up.", "Something is coming.", "A sudden business."], 0, "Something's come up."),
        pick("conv-u5-l3-c6", "You must cancel two hours before meeting. Which message is best?", ["So sorry, something's come up and I can't make it today. Could we do Thursday instead?", "Can't come.", "Send nothing and stay home."], 0, "Pembatalan sopan.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "conv-u5-post",
    title: "Unit 5 Review Quiz",
    passPercent: 70,
    questions: [
      pick("conv-u5-post1", "Answering a business phone, you say…", ["Good morning, Sinar Office. How can I help?", "What?", "Who are you?"], 0, "Salam profesional."),
      listen("conv-u5-post2", voice("Hold on, I'll put you through to the accounts department."), "What will happen next?", ["The call will be connected to accounts.", "The call will end.", "The caller must call back."], 0, "Put through = sambungkan."),
      trPick("conv-u5-post3", "“Apakah kamu senggang hari Sabtu?” in English is…", ["Are you free on Saturday?", "Are you empty on Saturday?", "Do you free Saturday?"], 0, "Free di sini berarti senggang/tidak sibuk."),
      pick("conv-u5-post4", "Which accepts an invitation?", ["Sounds great!", "I'm afraid not.", "Maybe another time."], 0, "Menerima."),
      fill("conv-u5-post5", "Complete: Could you ___ your surname, please?", "Could you", "your surname, please?", ["spell"], "Spell."),
      arrange("conv-u5-post6", "Put the words in order.", "I'd like to make an appointment", "Membuat janji."),
      listen("conv-u5-post7", say(["man", "Can we push the meeting back an hour?"], ["woman", "Sure, so three instead of two?"]), "What is the new meeting time?", ["three", "two", "one"], 0, "Push back = mundur."),
      pick("conv-u5-post8", "“Does Friday work for you?” A good reply is…", ["Friday's perfect.", "Friday is working hard.", "I work Friday."], 0, "Menyetujui waktu."),
      pick("conv-u5-post9", "Why does a polite decline usually include an alternative?", ["It shows you still value the invitation and the person.", "It is a grammar rule.", "It makes you sound busy."], 0, "Menjaga hubungan.", { hots: true }),
      pick("conv-u5-post10", "You are leaving a voicemail. Which detail is MOST important to include?", ["your name and a number to call back", "the weather", "your favourite song"], 0, "Info penting.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Call Me Maybe",
    questions: [
      live("conv-u5-live1", "On the phone: “Hi, ___ is Dina.”", ["this", "I", "here", "me"], 0, "phone-call"),
      live("conv-u5-live2", "I'll join!", ["Count me in!", "Count me out!", "Count on!", "Count up!"], 0, "thumbs-up"),
      live("conv-u5-live3", "Connect a call:", ["put you through", "put you down", "put you off", "put you up"], 0, "headset"),
      live("conv-u5-live4", "“Janji temu” =", ["appointment", "apartment", "agreement", "announcement"], 0, "calendar", true),
      live("conv-u5-live5", "Change the date:", ["reschedule", "rewrite", "rebuild", "redo"], 0, "calendar"),
      live("conv-u5-live6", "Polite decline:", ["I'd love to, but…", "No way.", "Never.", "Boring."], 0, "chat"),
      live("conv-u5-live7", "Sudden problem:", ["Something's come up.", "Something's go up.", "Thing came.", "Something up came."], 0, "alarm"),
      live("conv-u5-live8", "Ask for spelling:", ["Could you spell that?", "Could you spill that?", "Can you spelling?", "Spell me?"], 0, "question"),
    ],
  },
};

export const U6: Level = {
  id: "conv-u6",
  title: "Unit 6 — Feelings, Opinions and Tricky Situations",
  description: "Talk about feelings, give and respond to opinions, agree and disagree politely, apologise, complain and handle awkward moments with confidence.",
  targetScore: "Speaking · Listening",
  cover: ["happy", "owl-think", "chat"],
  pretest: {
    id: "conv-u6-pre",
    title: "Unit 6 Pretest",
    passPercent: 0,
    questions: [
      pick("conv-u6-pre1", "Which sentence disagrees politely?", ["I see your point, but I'm not sure I agree.", "You're wrong.", "That's stupid."], 0, "Tidak setuju dengan sopan."),
      listen("conv-u6-pre2", voice("I'm really stressed about my exams next week.", "man"), "How does the speaker feel?", ["stressed", "excited", "bored", "relaxed"], 0, "Stressed."),
      trPick("conv-u6-pre3", "“Menurut saya…” in English is…", ["In my opinion…", "According me…", "On my think…"], 0, "Memberi pendapat."),
      pick("conv-u6-pre4", "Your friend failed a test. A kind reply is…", ["Oh no, I'm sorry to hear that. Do you want to talk about it?", "Haha!", "That's your problem."], 0, "Empati."),
      pick("conv-u6-pre5", "You bumped into someone. You say…", ["Oh, sorry! Are you OK?", "Move!", "Your fault."], 0, "Minta maaf."),
    ],
  },
  lessons: [
    {
      id: "conv-u6-l1",
      skill: "speaking",
      title: "Talking About Feelings",
      summary: "Describing how you feel, asking about others and responding with empathy.",
      sections: [
        {
          title: "Feeling words",
          blocks: [
            vocab([["thrilled", "sangat senang", "happy"], ["relieved", "lega", "feel-great"], ["frustrated", "frustrasi/kesal", "angry"], ["nervous", "gugup", "scared"], ["exhausted", "sangat lelah", "feel-tired"], ["disappointed", "kecewa", "sad"]], "Beyond happy and sad"),
            table(["Situation", "Responding with empathy"], [["good news", "That's fantastic! You must be so happy. / Congratulations!"], ["bad news", "Oh no, I'm so sorry to hear that."], ["stress", "That sounds tough. Is there anything I can do?"], ["nervous", "You'll be fine. You've prepared really well."]]),
          ],
        },
        {
          title: "Listen and respond",
          blocks: [
            audio("Good news and bad news", say(["woman", "You look happy! What's up?"], ["man", "I got the scholarship to study in Japan!"], ["woman", "No way! That's amazing, congratulations! You must be thrilled."], ["man", "I am. But I'm also a bit nervous about living alone."], ["woman", "That's totally normal. You'll make friends fast, I'm sure."])),
            pics([["happy", "thrilled"], ["scared", "nervous"], ["feel-tired", "exhausted"], ["sad", "disappointed"]]),
            tryIt(pick("conv-u6-l1-try", "Why is the man nervous?", ["He will live alone.", "He failed an exam.", "He lost the scholarship."], 0, "Tinggal sendiri.")),
          ],
        },
      ],
      checkpoint: [
        pick("conv-u6-l1-c1", "What is the man's good news?", ["a scholarship to Japan", "a new job", "a new phone"], 0, "Beasiswa."),
        pick("conv-u6-l1-c2", "How does the woman encourage him?", ["She says he'll make friends fast.", "She tells him not to go.", "She changes the topic."], 0, "Menyemangati."),
        match("conv-u6-l1-c3", "Match the feeling and the situation.", [["relieved", "the test was easier than you expected"], ["exhausted", "you worked 12 hours"], ["disappointed", "your trip was cancelled"], ["nervous", "before a job interview"]], "Perasaan."),
        fill("conv-u6-l1-c4", "Complete: I'm so sorry to ___ that.", "I'm so sorry to", "that.", ["hear"], "Sorry to hear that."),
        trPick("conv-u6-l1-c5", "“Kamu pasti sangat senang!” in English is…", ["You must be thrilled!", "You should be happy must!", "You are must glad!"], 0, "Must be = pasti."),
        pick("conv-u6-l1-c6", "A friend says, “My grandmother is in hospital.” Which reply is most appropriate?", ["I'm so sorry. I hope she gets better soon. Let me know if you need anything.", "Oh, OK. Anyway, did you see the match?", "Hospitals are boring."], 0, "Empati.", { hots: true }),
      ],
    },
    {
      id: "conv-u6-l2",
      skill: "speaking",
      title: "Opinions, Agreeing and Disagreeing",
      summary: "Giving opinions, asking for others' views, and disagreeing without sounding rude.",
      sections: [
        {
          title: "Opinion language",
          blocks: [
            table(["Function", "Phrases"], [["giving an opinion", "I think… / In my opinion… / Personally, I feel…"], ["asking", "What do you think? / How do you feel about…?"], ["agreeing", "Exactly! / I couldn't agree more. / That's a good point."], ["partly agreeing", "I see what you mean, but… / That's true to some extent."], ["disagreeing politely", "I'm not so sure about that. / I see it a bit differently."]]),
            tip("Bahasa Inggris sering **melunakkan** ketidaksetujuan: *I'm not sure I agree* lebih natural daripada *You're wrong*. Akui dulu poin lawan bicara, lalu sampaikan pendapatmu."),
          ],
        },
        {
          title: "Discussion",
          blocks: [
            audio("Should schools ban phones?", say(["man", "Personally, I think phones should be banned in class. They're so distracting."], ["woman", "I see what you mean, but phones can be useful for research and dictionaries."], ["man", "That's a good point. Maybe teachers could decide when phones are allowed?"], ["woman", "Exactly. A clear rule is better than a total ban."])),
            speaking({
              id: "conv-u6-l2-say",
              title: "Discuss a topic",
              prompt: "Choose a topic: “Should students wear uniforms?”, “Is online learning better than classroom learning?” or “Should motorbikes be banned in city centres?” Give your opinion with a reason and an example, respond to an opposite view politely, and find some common ground.",
              image: "owl-think",
              seconds: 120,
              tips: ["Personally, I think … because …", "For example, …", "I see what you mean, but …", "Maybe we can agree that …"],
              models: [{ label: "Model", text: "Personally, I think online learning is great for flexibility. For example, my cousin works and studies at the same time. … I see what you mean about motivation; it's easy to get distracted at home. But with good scheduling, it can work. Maybe we can agree that a mix of online and classroom learning is the best option." }],
              rubric: ["I gave a clear opinion with a reason.", "I supported it with an example.", "I disagreed politely.", "I found common ground."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("conv-u6-l2-c1", "What is the man's first opinion?", ["Phones should be banned in class.", "Phones are useful.", "Teachers use phones too much."], 0, "Pendapat awal."),
        pick("conv-u6-l2-c2", "What do they finally agree on?", ["A clear rule is better than a total ban.", "Phones should be banned everywhere.", "Phones don't matter."], 0, "Kesepakatan."),
        pickMany("conv-u6-l2-c3", "Choose ALL polite ways to disagree.", ["I'm not so sure about that.", "I see it a bit differently.", "I see what you mean, but…", "That's nonsense."], [0, 1, 2], "Halus."),
        arrange("conv-u6-l2-c4", "Put the words in order.", "I couldn't agree more", "Sangat setuju."),
        trPick("conv-u6-l2-c5", "“Itu benar sampai batas tertentu.” in English is…", ["That's true to some extent.", "That's right until some border.", "It true to some limit."], 0, "Setuju sebagian."),
        pick("conv-u6-l2-c6", "Why does acknowledging the other person's point first help a discussion?", ["It shows respect and keeps the conversation calm.", "It means you lose the argument.", "It wastes time."], 0, "Diskusi sehat.", { hots: true }),
      ],
    },
    {
      id: "conv-u6-l3",
      skill: "speaking",
      title: "Apologies, Complaints and Awkward Moments",
      summary: "Apologising properly, complaining constructively and saving awkward situations.",
      sections: [
        {
          title: "Apologies and complaints",
          blocks: [
            table(["Function", "Phrases"], [["apologising", "I'm really sorry about… / I apologise for… It was my fault."], ["fixing it", "Let me make it up to you. / It won't happen again."], ["accepting an apology", "Don't worry about it. / It's fine, really."], ["complaining", "I'm not very happy with… Could you…?"], ["awkward moments", "Sorry, I've forgotten your name. / Sorry, I didn't catch that."]]),
            examples([{ wrong: "Sorry. (and nothing else)", right: "I'm really sorry I'm late. The traffic was terrible. It won't happen again.", note: "Minta maaf + alasan singkat + janji." }, { wrong: "Your service is bad!", right: "I'm a bit disappointed with the delivery. It arrived three days late. Could you check what happened?", note: "Keluhan konstruktif." }]),
          ],
        },
        {
          title: "Role play",
          blocks: [
            audio("Forgetting a name", say(["man", "Hey! Great to see you again!"], ["woman", "Hi! Great to see you too. I'm so sorry, I've completely forgotten your name."], ["man", "Ha, no worries! It's Bayu. We met at Rina's party."], ["woman", "Of course, Bayu! I'm terrible with names. How have you been?"])),
            pics([["chat", "apologise"], ["customer-angry", "complain"], ["question", "forgot a name"], ["thumbs-up", "solved"]]),
            speaking({
              id: "conv-u6-l3-say",
              title: "Tricky situations",
              prompt: "Handle three short situations: (1) you forgot a friend's birthday, so apologise and make it up to them; (2) you received the wrong item from an online shop, so call and complain constructively; (3) you meet someone whose name you forgot.",
              image: "chat",
              seconds: 120,
              tips: ["I'm really sorry … Let me make it up to you.", "I'm a bit disappointed with … Could you …?", "Sorry, I've forgotten your name."],
              models: [{ label: "Model", text: "(1) I'm so sorry I forgot your birthday! I feel terrible. Let me make it up to you; lunch is on me this weekend. (2) Hello, I ordered a blue jacket in size M, but I received a red one in size L. I'm a bit disappointed because I needed it for a trip. Could you send the correct one or give me a refund? (3) Hi! It's so nice to see you. I'm really sorry, I've forgotten your name. … Dewi, of course!" }],
              rubric: ["I apologised sincerely and offered to fix things.", "I complained with facts and a clear request.", "I handled the awkward moment naturally.", "My tone stayed polite throughout."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("conv-u6-l3-c1", "Where did the woman and Bayu meet before?", ["at Rina's party", "at school", "at work"], 0, "Rina's party."),
        pick("conv-u6-l3-c2", "How does Bayu react when she forgets his name?", ["He's relaxed about it.", "He's angry.", "He walks away."], 0, "No worries."),
        match("conv-u6-l3-c3", "Match the phrase and its function.", [["It won't happen again.", "promising"], ["Don't worry about it.", "accepting an apology"], ["Let me make it up to you.", "offering to fix things"], ["Sorry, I didn't catch that.", "asking someone to repeat"]], "Fungsi ungkapan."),
        fill("conv-u6-l3-c4", "Complete: I ___ for the delay. (formal)", "I", "for the delay.", ["apologise", "apologize"], "Apologise for."),
        trPick("conv-u6-l3-c5", "“Biar aku tebus kesalahanku.” in English is…", ["Let me make it up to you.", "Let me pay my mistake.", "Let me redeem error."], 0, "Make it up to someone."),
        pick("conv-u6-l3-c6", "Which complaint is most likely to get a good result?", ["The order arrived broken. Here's a photo. Could you send a replacement?", "Your shop is the worst!", "I want my money now or else!"], 0, "Fakta + permintaan jelas.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "conv-u6-post",
    title: "Unit 6 Review Quiz",
    passPercent: 70,
    questions: [
      pick("conv-u6-post1", "“I couldn't agree more” means…", ["I completely agree.", "I don't agree.", "I can't agree now."], 0, "Sangat setuju."),
      listen("conv-u6-post2", voice("I'm so relieved, the doctor said it's nothing serious."), "How does the speaker feel?", ["relieved", "worried", "angry"], 0, "Relieved = lega karena kabarnya baik."),
      trPick("conv-u6-post3", "“Saya kecewa dengan layanannya.” in English is…", ["I'm disappointed with the service.", "I'm disappoint the service.", "I disappointed by service me."], 0, "Disappointed with."),
      pick("conv-u6-post4", "Which reply shows empathy?", ["That sounds really tough.", "So what?", "Not my problem."], 0, "Empati."),
      pick("conv-u6-post5", "Which phrase asks for someone's opinion?", ["How do you feel about it?", "I feel great.", "I agree."], 0, "Bertanya pendapat."),
      arrange("conv-u6-post6", "Put the words in order.", "I see what you mean but", "Setuju sebagian."),
      listen("conv-u6-post7", say(["woman", "I'm really sorry I broke your mug."], ["man", "Don't worry about it. It was old anyway."]), "How does the man respond?", ["He accepts the apology.", "He is very angry.", "He asks for money."], 0, "Menerima maaf."),
      pick("conv-u6-post8", "You didn't hear someone's question in a noisy café. You say…", ["Sorry, I didn't catch that.", "What you say?", "Repeat!"], 0, "Minta ulang."),
      pick("conv-u6-post9", "Why is “You're wrong” often avoided in English discussions?", ["It sounds too direct and can feel rude.", "It is grammatically incorrect.", "It is too long."], 0, "Kesopanan.", { hots: true }),
      pick("conv-u6-post10", "A colleague is upset because you took credit for their idea. Best response:", ["You're right, I should have mentioned it was your idea. I'm sorry, and I'll tell the team.", "It doesn't matter who said it.", "I don't remember."], 0, "Tanggung jawab.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Keep Calm and Talk",
    questions: [
      live("conv-u6-live1", "Very tired:", ["exhausted", "excited", "exact", "expensive"], 0, "feel-tired"),
      live("conv-u6-live2", "Polite disagree:", ["I'm not so sure.", "You're wrong!", "Nonsense!", "Stop talking."], 0, "owl-think"),
      live("conv-u6-live3", "Accept an apology:", ["Don't worry about it.", "Never forgive.", "Go away.", "Whatever."], 0, "thumbs-up"),
      live("conv-u6-live4", "“Lega” =", ["relieved", "relaxed", "related", "repeated"], 0, "feel-great", true),
      live("conv-u6-live5", "Bad news reply:", ["Sorry to hear that.", "Great news!", "Cool.", "Congrats!"], 0, "sad"),
      live("conv-u6-live6", "Strong agreement:", ["I couldn't agree more.", "I could agree less.", "Not really.", "Maybe no."], 0, "happy"),
      live("conv-u6-live7", "Didn't hear:", ["Sorry, I didn't catch that.", "I didn't take it.", "I no hear.", "Speak!"], 0, "headset"),
      live("conv-u6-live8", "Fix a mistake:", ["Let me make it up to you.", "Let me make up you.", "Make me up.", "Up make you."], 0, "heart"),
    ],
  },
};
