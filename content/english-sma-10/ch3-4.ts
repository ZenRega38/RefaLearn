import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 10 (SMA, Fase E). Chapter 3 — Letters and Emails · Chapter 4 — Plans and Intentions

const INVITATION: Passage = {
  id: "sma10-c3-invitation",
  title: "A Formal Invitation Letter",
  pic: "envelope",
  lines: [
    "OSIS SMA Negeri 3 Semarang, Jl. Pemuda No. 149, Semarang 50132",
    "5 October 2026",
    "Dear Ms. Laila Rahmawati, Founder of Green Teens Indonesia,",
    "On behalf of the Student Council of SMA Negeri 3 Semarang, we would like to invite you to be the keynote speaker at our annual Youth Environmental Summit.",
    "The event will be held on Saturday, 24 October 2026, from 8.00 a.m. to 12.00 p.m., in the main hall of our school. It will be attended by around 400 students from 15 schools.",
    "This year's theme is “Small Actions, Big Impact”. We would be honoured if you could share your experience of starting a youth environmental movement, for about 45 minutes.",
    "We will provide transport from your office and a modest honorarium as a token of our appreciation.",
    "We would be grateful if you could confirm your availability by 12 October. Please contact our secretary, Nadia Putri, at 0813-2244-5566 or osis.sman3smg@example.sch.id.",
    "We look forward to your positive reply.",
    "Yours sincerely, Rizky Hidayat, Chairperson of the Student Council",
  ],
};

export const CH3: Level = {
  id: "sma10-ch3",
  title: "Chapter 3 — Letters and Emails",
  description: "Read and write formal and informal invitations, accept and decline politely in writing, and choose the right register, layout and polite expressions for letters and emails.",
  targetScore: "Reading · Writing · Structure",
  cover: ["envelope", "laptop", "card"],
  pretest: {
    id: "sma10-c3-pre",
    title: "Chapter 3 Pretest",
    passPercent: 0,
    questions: [
      pick("sma10-c3-pre1", "A formal letter that begins “Dear Ms. Laila Rahmawati,” should end with…", ["Yours sincerely,", "Love,", "Cheers,", "See ya,"], 0, "Nama diketahui → Yours sincerely."),
      listen("sma10-c3-pre2", voice("We would be honoured if you could attend our graduation ceremony."), "Listen. What kind of sentence is this?", ["a formal invitation", "a complaint", "an apology", "an advertisement"], 0, "Undangan formal."),
      trPick("sma10-c3-pre3", "“Atas nama” (in a formal letter) in English is…", ["On behalf of", "In name of", "As name", "For the name"], 0, "On behalf of."),
      pick("sma10-c3-pre4", "Which sentence is the most polite?", ["Would you be able to attend?", "Come.", "You must come.", "Can come or not?"], 0, "Would you be able to … = sangat sopan."),
      pick("sma10-c3-pre5", "RSVP means…", ["please reply", "please wait", "please pay", "please read"], 0, "Répondez s'il vous plaît."),
    ],
  },
  lessons: [
    {
      id: "sma10-c3-l1",
      skill: "reading",
      title: "Reading: A Formal Invitation Letter",
      summary: "Layout, purpose and polite language of a formal invitation.",
      passages: [INVITATION],
      sections: [
        {
          title: "The letter",
          blocks: [
            { type: "passage", passage: INVITATION },
            table(["Part", "Line"], [["Sender's address / letterhead", "1"], ["Date", "2"], ["Salutation", "3"], ["Purpose (opening)", "4"], ["Details (when, where, who)", "5–7"], ["Request for reply (RSVP)", "8"], ["Closing sentence", "9"], ["Complimentary close + signature", "10"]]),
          ],
        },
        {
          title: "Polite formal language",
          blocks: [
            table(["Function", "Formal expressions"], [["Inviting", "We would like to invite you to … / We would be honoured if you could …"], ["Giving details", "The event will be held on … at …"], ["Requesting", "We would be grateful if you could … / Could you kindly …?"], ["Offering", "We will provide …"], ["Closing", "We look forward to your positive reply / to hearing from you."]]),
            vocab([["keynote speaker", "pembicara utama", "microphone"], ["honorarium", "honorarium/uang jasa", "money"], ["token of appreciation", "tanda terima kasih", "card"], ["confirm availability", "memastikan kesediaan", "calendar"]], "Formal vocabulary"),
            tryIt(pick("sma10-c3-l1-try1", "What is the purpose of the letter?", ["to invite Ms. Laila to be the keynote speaker", "to ask for a donation", "to complain about pollution"], 0, "Baris 4.", { passageId: INVITATION.id })),
          ],
        },
      ],
      checkpoint: [
        pick("sma10-c3-l1-c1", "When will the summit be held?", ["Saturday, 24 October 2026", "5 October 2026", "12 October 2026"], 0, "Baris 5.", { passageId: INVITATION.id }),
        pick("sma10-c3-l1-c2", "How long should Ms. Laila speak?", ["about 45 minutes", "four hours", "15 minutes"], 0, "Baris 6.", { passageId: INVITATION.id }),
        fill("sma10-c3-l1-c3", "Complete.", "We would be grateful if you could confirm your availability by", ".", ["12 October"], "Baris 8.", { passageId: INVITATION.id }),
        pickMany("sma10-c3-l1-c4", "Choose ALL the things the council will provide.", ["transport from her office", "a modest honorarium", "a hotel room for a week", "a new laptop"], [0, 1], "Baris 7.", { passageId: INVITATION.id }),
        pick("sma10-c3-l1-c5", "Why is Ms. Laila a good choice for this event?", ["She founded a youth environmental movement, which matches the theme.", "She is a student at the school.", "She is the headmaster."], 0, "Kesesuaian dengan tema.", { passageId: INVITATION.id, hots: true }),
        pick("sma10-c3-l1-c6", "Why does the letter mention the number of students and schools?", ["to show the importance and size of the event", "to ask for more money", "to complain"], 0, "Meyakinkan pembicara.", { passageId: INVITATION.id, hots: true }),
      ],
    },
    {
      id: "sma10-c3-l2",
      skill: "structure",
      title: "Register: Formal vs. Informal",
      summary: "Changing tone, vocabulary and grammar for different readers.",
      sections: [
        {
          title: "Spot the difference",
          blocks: [
            table(["Informal (friends)", "Formal (teachers, officials, strangers)"], [["Hi Dina! / Hey guys!", "Dear Ms. Dina, / Dear Sir or Madam,"], ["Wanna come to …?", "We would like to invite you to …"], ["Let me know ASAP.", "We would appreciate a reply at your earliest convenience."], ["Thanks a lot!", "Thank you very much for your kind attention."], ["I can't make it.", "Unfortunately, I am unable to attend."], ["See you! / Cheers,", "Yours sincerely, / Yours faithfully,"]]),
            text("Ciri bahasa formal: **tanpa singkatan** (*I am*, bukan *I'm*), **kalimat lengkap**, **modal yang sopan** (*would, could*), **kosakata Latin/formal** (*attend, require, provide, inform*), dan **tanpa slang**."),
            tip("**Yours sincerely** jika kamu menyebut nama penerima (*Dear Mr. Budi*). **Yours faithfully** jika tidak tahu namanya (*Dear Sir or Madam*)."),
          ],
        },
        {
          title: "Accepting and declining in writing",
          blocks: [
            examples([{ right: "Accept (formal): Thank you for your kind invitation. I am delighted to accept and look forward to meeting your students on 24 October." }, { right: "Decline (formal): Thank you very much for inviting me. Unfortunately, I am unable to attend as I will be abroad on that date. I wish you a successful event." }, { right: "Accept (informal): Thanks for the invite! I'd love to come. Can I bring anything?" }, { right: "Decline (informal): Aw, thanks for asking! I'm so sorry, I can't make it — it's my cousin's wedding. Have fun!" }], "Model replies"),
            tryIt(pick("sma10-c3-l2-try1", "Which phrase is formal?", ["Unfortunately, I am unable to attend.", "Sorry, can't make it!", "Nope, busy."], 0, "Formal decline.")),
          ],
        },
      ],
      checkpoint: [
        listen("sma10-c3-l2-c1", voice("We would appreciate a reply at your earliest convenience."), "Listen. What does the writer want?", ["a reply as soon as possible", "a meeting next year", "no reply"], 0, "Earliest convenience = secepatnya."),
        match("sma10-c3-l2-c2", "Match the informal and formal expressions.", [["Wanna come?", "We would like to invite you."], ["Can't make it.", "I am unable to attend."], ["Thanks a lot!", "Thank you very much."], ["Cheers,", "Yours sincerely,"]], "Register."),
        pick("sma10-c3-l2-c3", "A letter starts “Dear Sir or Madam,”. How should it end?", ["Yours faithfully,", "Yours sincerely,", "Love,"], 0, "Nama tidak diketahui."),
        fill("sma10-c3-l2-c4", "Complete: I am ___ to accept your invitation. (senang sekali)", "I am", "to accept your invitation.", ["delighted", "pleased", "happy"], "Delighted = senang sekali.", { translate: true }),
        trPick("sma10-c3-l2-c5", "“Sayangnya, saya tidak dapat hadir.” (formal) in English is…", ["Unfortunately, I am unable to attend.", "Sadly, I can't come lah.", "Unfortunate, I no attend."], 0, "Formal decline."),
        pick("sma10-c3-l2-c6", "Which email is appropriate to send to a university lecturer?", ["Dear Dr. Sari, I am writing to ask about…", "Hey Sari! Wanna ask something…", "Yo doc, quick q…"], 0, "Formal register.", { hots: true }),
      ],
    },
    {
      id: "sma10-c3-l3",
      skill: "writing",
      title: "Write Invitations and Replies",
      summary: "Writing a formal invitation letter and an informal email.",
      sections: [
        {
          title: "Emails today",
          blocks: [
            pics([["laptop", "email"], ["smartphone", "messaging apps"], ["envelope", "printed letter"], ["card", "invitation card"]]),
            table(["Email element", "Tip"], [["Subject line", "Short and clear: Invitation: Youth Summit, 24 October"], ["Greeting", "Formal: Dear Mr./Ms. + surname. Informal: Hi + first name"], ["First line", "State the purpose: I am writing to …"], ["Body", "One idea per paragraph"], ["Closing", "Best regards, / Kind regards, + full name and position"]]),
            warn("Untuk email formal, hindari **emoji**, **huruf kapital semua**, dan **alamat email yang tidak profesional** (misalnya *kucingimut99@…*)."),
          ],
        },
        {
          title: "Your turn",
          blocks: [
            writing({
              id: "sma10-c3-l3-write",
              title: "A formal invitation and an informal reply",
              prompt: "(1) As the secretary of a school club, write a formal invitation letter or email to a guest (an alumnus, a local businessperson, a doctor…) for a school event. (2) Write a short informal email declining a friend's invitation politely.",
              image: "envelope",
              minWords: 200,
              maxWords: 330,
              tips: ["Subject: Invitation to …", "Dear …, On behalf of …, we would like to invite you to …", "The event will be held on … at …", "We would be grateful if you could confirm by …", "Yours sincerely, …", "Informal: Hi …! Thanks so much for … Unfortunately, … Have a great time!"],
              models: [{ label: "Formal invitation", text: "Subject: Invitation to Speak at Career Day 2026\nDear Dr. Yosef Manurung,\nOn behalf of the Science Club of SMA Kristen 1 Medan, I would like to invite you to share your experience as a paediatrician at our Career Day.\nThe event will be held on Friday, 13 November 2026, from 1.00 to 3.00 p.m. in the school auditorium. Around 250 Grade 11 and 12 students will attend, many of whom hope to study medicine.\nWe would be honoured if you could give a 30-minute talk followed by a short question-and-answer session. Light refreshments will be served after the event.\nWe would be grateful if you could confirm your availability by 1 November. Please do not hesitate to contact me at 0812-6655-4433.\nWe look forward to hearing from you.\nYours sincerely,\nGrace Simanjuntak\nSecretary, Science Club" }, { label: "Informal decline", text: "Subject: Re: Beach trip!\nHi Tari,\nThanks so much for inviting me to the beach trip on Sunday! It sounds amazing. Unfortunately, I can't make it because I've got a badminton tournament that day. I'm really gutted!\nCould you send me some photos? And let's plan something together after the tournament — maybe a movie?\nHave a great time and don't forget the sunscreen!\nCheers,\nAyu" }],
              rubric: ["My formal letter has a clear subject, salutation and closing.", "I stated the purpose in the first paragraph.", "I gave all the event details and asked for confirmation.", "I used formal language (no contractions or slang) in the formal letter.", "My informal email declines politely with a reason."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sma10-c3-l3-c1", "Which is the best subject line for a formal invitation?", ["Invitation to Speak at Career Day 2026", "hi!!!", "PLEASE READ"], 0, "Jelas dan spesifik."),
        pick("sma10-c3-l3-c2", "In the model, who is invited?", ["a paediatrician", "a footballer", "a pilot"], 0, "Dr. Yosef, dokter anak."),
        arrange("sma10-c3-l3-c3", "Put the words in order.", "I am writing to invite you to our event", "Kalimat pembuka email formal."),
        fill("sma10-c3-l3-c4", "Complete: Please do not ___ to contact me.", "Please do not", "to contact me.", ["hesitate"], "Jangan ragu = do not hesitate."),
        trPick("sma10-c3-l3-c5", "“Kami menantikan kabar dari Anda.” in English is…", ["We look forward to hearing from you.", "We look forward to hear you.", "We look for hearing from you."], 0, "Look forward to + -ing."),
        pick("sma10-c3-l3-c6", "Why does the formal letter mention that many students hope to study medicine?", ["to show the guest that the talk will be useful and relevant", "to fill the page", "to ask for free treatment"], 0, "Persuasi halus.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma10-c3-post",
    title: "Chapter 3 Posttest",
    passPercent: 70,
    passages: [INVITATION],
    questions: [
      pick("sma10-c3-post1", "We would be honoured if you ___ attend the ceremony.", ["could", "can", "will", "must"], 0, "Would … if you could."),
      listen("sma10-c3-post2", voice("Thank you for your kind invitation. Unfortunately, I will be in Singapore on that date, so I am unable to attend."), "Listen. Why can't the speaker attend?", ["She will be in Singapore.", "She is sick.", "She doesn't like the event.", "She forgot."], 0, "In Singapore."),
      trPick("sma10-c3-post3", "“Sebagai tanda terima kasih kami” in English is…", ["as a token of our appreciation", "as a sign of our thank", "for our thanks token", "as appreciation token our"], 0, "Token of appreciation."),
      pick("sma10-c3-post4", "Which closing is used when you don't know the reader's name?", ["Yours faithfully,", "Yours sincerely,", "Love,", "Cheers,"], 0, "Dear Sir or Madam → Yours faithfully."),
      arrange("sma10-c3-post5", "Put the words in order.", "We look forward to your positive reply", "Penutup surat."),
      pick("sma10-c3-post6", "Who should Ms. Laila contact to confirm?", ["Nadia Putri, the secretary", "Rizky Hidayat", "the headmaster", "Green Teens Indonesia"], 0, "Baris 8.", { passageId: INVITATION.id }),
      match("sma10-c3-post7", "Match the line and its function.", [["line 4", "purpose"], ["line 5", "event details"], ["line 8", "request for reply"], ["line 10", "complimentary close"]], "Struktur surat."),
      fill("sma10-c3-post8", "Complete.", "This year's theme is “Small Actions, Big", "”.", ["Impact"], "Baris 6.", { passageId: INVITATION.id }),
      pick("sma10-c3-post9", "Which phrase in the letter makes the request softer and more polite?", ["We would be grateful if you could", "The event will be held", "It will be attended by", "Please contact our secretary"], 0, "Modal sopan.", { passageId: INVITATION.id, hots: true }),
      pick("sma10-c3-post10", "If Ms. Laila cannot attend, which reply is most appropriate?", ["Thank you for your kind invitation. Unfortunately, I am unable to attend due to a prior commitment. I wish you a successful summit.", "Sorry, can't come. Bye.", "Why did you invite me so late?", "No."], 0, "Penolakan formal dan sopan.", { passageId: INVITATION.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — You've Got Mail",
    questions: [
      live("sma10-c3-live1", "Dear Sir or Madam → close with…", ["Yours faithfully", "Yours sincerely", "Love", "Cheers"], 0, "envelope"),
      live("sma10-c3-live2", "Formal: I can't come →", ["I am unable to attend.", "Can't make it.", "Nope.", "Busy, sorry."], 0, "calendar"),
      live("sma10-c3-live3", "RSVP =", ["please reply", "please pay", "please read", "please wait"], 0, "phone-call"),
      live("sma10-c3-live4", "“Atas nama” =", ["On behalf of", "In name of", "For named", "By the name"], 0, "staff", true),
      live("sma10-c3-live5", "Look forward to ___ from you.", ["hearing", "hear", "heard", "to hear"], 0, "chat"),
      live("sma10-c3-live6", "Formal emails avoid…", ["emoji", "full sentences", "greetings", "subject lines"], 0, "smartphone"),
      live("sma10-c3-live7", "We would be ___ if you could come.", ["honoured", "honour", "honouring", "honest"], 0, "trophy"),
      live("sma10-c3-live8", "Main speaker at an event:", ["keynote speaker", "key speaker note", "loudspeaker", "speaker key"], 0, "microphone"),
    ],
  },
};

const ANNOUNCE: Passage = {
  id: "sma10-c4-announce",
  title: "Announcement: School Expedition to Ujung Kulon",
  pic: "map",
  lines: [
    "ANNOUNCEMENT — Nature Lovers Club (KPA) SMA Taruna Bangsa",
    "We are pleased to announce that our club is going to hold a four-day field expedition to Ujung Kulon National Park, Banten, home of the critically endangered Javan rhinoceros.",
    "Date: Thursday–Sunday, 10–13 December 2026. The bus will leave the school at 5.00 a.m. sharp on Thursday.",
    "During the expedition, participants will be assisting park rangers with a mangrove planting programme and will be learning how camera traps are used to monitor wildlife.",
    "On the third day, we are going to trek to Cidaon grazing ground, where we hope to see wild bulls (banteng) and peacocks.",
    "The fee is Rp1,250,000, which covers transport, meals, park permits and insurance. Participants are to bring their own sleeping bags and personal medicine.",
    "Registration opens on Monday, 2 November and will close once 30 places have been filled. A parental permission form must be submitted by 20 November.",
    "A compulsory briefing will be held in Room 12 on Friday, 27 November, at 2.30 p.m.",
    "For further information, please contact Kak Bayu (XI-3) or visit the KPA office during break time.",
  ],
};

export const CH4: Level = {
  id: "sma10-ch4",
  title: "Chapter 4 — Plans and Intentions",
  description: "Talk about intentions and arrangements with be going to, present continuous, will, future continuous and be to; read and write announcements; discuss plans and make decisions.",
  targetScore: "Structure · Listening · Writing",
  cover: ["calendar", "map", "target"],
  pretest: {
    id: "sma10-c4-pre",
    title: "Chapter 4 Pretest",
    passPercent: 0,
    questions: [
      pick("sma10-c4-pre1", "I've bought the tickets. We ___ Bali next week.", ["are visiting", "visit", "visited", "will be visit"], 0, "Rencana yang sudah diatur → present continuous."),
      listen("sma10-c4-pre2", voice("This time tomorrow, I'll be sitting on a plane to Makassar."), "Listen. What will he be doing this time tomorrow?", ["sitting on a plane", "sleeping at home", "taking an exam", "driving a car"], 0, "Future continuous."),
      trPick("sma10-c4-pre3", "“Wajib” (attendance) in English is…", ["compulsory", "optional", "comfortable", "complimentary"], 0, "Compulsory."),
      pick("sma10-c4-pre4", "The phone is ringing. — “I ___ get it!”", ["'ll", "am going to", "am getting", "get"], 0, "Keputusan spontan → will."),
      pick("sma10-c4-pre5", "The main purpose of an announcement is to…", ["inform people about an event or important news", "tell a story", "describe a person", "persuade people to buy"], 0, "Memberi informasi."),
    ],
  },
  lessons: [
    {
      id: "sma10-c4-l1",
      skill: "structure",
      title: "Talking About the Future",
      summary: "Choosing between will, be going to, present continuous, simple present, future continuous and be to.",
      sections: [
        {
          title: "Which future form?",
          blocks: [
            table(["Form", "Use", "Example"], [["be going to", "intention (rencana/niat yang sudah diputuskan)", "I'm going to apply for a scholarship."], ["present continuous", "fixed arrangement (sudah diatur, ada waktu/tempat)", "We're meeting the principal at 10 tomorrow."], ["will", "instant decision, prediction, promise, offer", "I'll help you. I think it will rain."], ["simple present", "timetables, schedules", "The bus leaves at 5 a.m."], ["future continuous", "action in progress at a future time", "At 8 a.m. tomorrow, we'll be trekking."], ["be to", "formal plans, instructions", "Participants are to bring sleeping bags."]]),
            examples([{ wrong: "I will meet the doctor at 3 p.m. — I made an appointment.", right: "I'm meeting the doctor at 3 p.m.", note: "Janji temu yang sudah diatur." }, { wrong: "Look at those clouds! It will rain.", right: "Look at those clouds! It's going to rain.", note: "Prediksi dengan bukti nyata." }], "Choose wisely"),
          ],
        },
        {
          title: "Plans in conversation",
          blocks: [
            audio("Weekend plans", say(["woman", "What are you doing this weekend, Arya?"], ["man", "I'm helping my uncle at his coffee shop on Saturday. He's opening a new branch."], ["woman", "Nice! Are you going to work there in the holidays too?"], ["man", "Maybe. I'm going to save money for a new laptop. What about you?"], ["woman", "Our family is flying to Medan on Sunday. The plane leaves at 6 a.m., so I'll be sleeping on the plane, I'm sure!"], ["man", "Ha! I'll send you a photo of the new shop."])),
            tryIt(pick("sma10-c4-l1-try1", "Why is Arya going to save money?", ["to buy a new laptop", "to open a shop", "to fly to Medan"], 0, "Niat → going to.")),
            repeat(["I'm going to study medicine.", "We're meeting at the station at seven.", "The train leaves at 6.15.", "This time next week, I'll be lying on the beach."]),
          ],
        },
      ],
      checkpoint: [
        listen("sma10-c4-l1-c1", voice("The flight to Jayapura departs at 9.40 tonight."), "Listen. Why does the speaker use the simple present?", ["It is a timetable.", "It is a promise.", "It is a past event."], 0, "Jadwal → simple present."),
        pick("sma10-c4-l1-c2", "I'm thirsty. — “Wait, I ___ get you some water.”", ["'ll", "am getting", "am going to"], 0, "Tawaran spontan → will."),
        pick("sma10-c4-l1-c3", "Don't call me at 9 p.m. I ___ for my exam then.", ["will be studying", "study", "am study"], 0, "Sedang berlangsung di masa depan."),
        match("sma10-c4-l1-c4", "Match the sentence and the use.", [["I'm going to learn Korean.", "intention"], ["I'm seeing the dentist at 4.", "arrangement"], ["The film starts at 7.", "timetable"], ["I'll carry that for you.", "offer"]], "Fungsi bentuk future."),
        trPick("sma10-c4-l1-c5", "“Peserta harus membawa kartu identitas.” (formal) in English is…", ["Participants are to bring their ID cards.", "Participants are bring ID cards.", "Participants to bringing ID."], 0, "Be to + verb (formal)."),
        pick("sma10-c4-l1-c6", "Which sentence shows a decision made BEFORE speaking?", ["I'm going to take a gap year to volunteer.", "Oh, it's open? I'll go in then.", "Fine, I'll do it!"], 0, "Niat yang sudah diputuskan.", { hots: true }),
      ],
    },
    {
      id: "sma10-c4-l2",
      skill: "reading",
      title: "Reading: An Announcement",
      summary: "Understanding the details and formal language of announcements.",
      passages: [ANNOUNCE],
      sections: [
        {
          title: "Expedition announcement",
          blocks: [
            { type: "passage", passage: ANNOUNCE },
            audio("Listen to the announcement", say(["man", ANNOUNCE.lines.slice(1).join(" ")])),
            vocab([["critically endangered", "sangat terancam punah", "earth"], ["park ranger", "jagawana/polisi hutan", "police"], ["camera trap", "kamera jebak", "camera"], ["grazing ground", "padang penggembalaan", "cow"], ["compulsory", "wajib", "report"]], "Words from the text"),
          ],
        },
        {
          title: "Announcement features",
          blocks: [
            table(["Feature", "Example"], [["Title / organiser", "ANNOUNCEMENT — Nature Lovers Club"], ["Event and purpose", "a four-day field expedition"], ["Time and place", "10–13 December, Ujung Kulon"], ["Requirements", "fee, permission form, sleeping bags"], ["Deadlines", "register by…, submit by…"], ["Contact", "Kak Bayu (XI-3)"]]),
            text("Pengumuman formal memakai **passive** (*will be held, must be submitted*), **future forms** (*is going to hold, will be assisting*), dan **be to** (*are to bring*)."),
            tryIt(pick("sma10-c4-l2-try1", "What animal is Ujung Kulon famous for?", ["the Javan rhinoceros", "the Komodo dragon", "the orangutan"], 0, "Baris 2.", { passageId: ANNOUNCE.id })),
          ],
        },
      ],
      checkpoint: [
        pick("sma10-c4-l2-c1", "What time will the bus leave?", ["5.00 a.m. on Thursday", "2.30 p.m. on Friday", "5.00 p.m. on Sunday"], 0, "Baris 3.", { passageId: ANNOUNCE.id }),
        pickMany("sma10-c4-l2-c2", "Choose ALL the things the fee covers.", ["transport", "meals", "park permits", "sleeping bags"], [0, 1, 2], "Baris 6: sleeping bags dibawa sendiri.", { passageId: ANNOUNCE.id }),
        fill("sma10-c4-l2-c3", "Complete.", "A parental permission form must be submitted by", ".", ["20 November"], "Baris 7.", { passageId: ANNOUNCE.id }),
        pick("sma10-c4-l2-c4", "What will participants learn about?", ["how camera traps monitor wildlife", "how to hunt banteng", "how to drive a bus"], 0, "Baris 4.", { passageId: ANNOUNCE.id }),
        pick("sma10-c4-l2-c5", "Dewi registers on 25 November. What is the most likely problem?", ["She has missed the permission-form deadline, and places may be full.", "The fee is too low.", "The bus leaves at night."], 0, "Tenggat 20 November.", { passageId: ANNOUNCE.id, hots: true }),
        pick("sma10-c4-l2-c6", "Why is the briefing compulsory?", ["Participants need safety and preparation information before the trip.", "It is a party.", "It replaces the trip."], 0, "Briefing untuk keselamatan.", { passageId: ANNOUNCE.id, hots: true }),
      ],
    },
    {
      id: "sma10-c4-l3",
      skill: "speaking",
      title: "Planning Together",
      summary: "Making suggestions, discussing options and announcing a plan.",
      sections: [
        {
          title: "Discussing plans",
          blocks: [
            table(["Function", "Expressions"], [["Suggesting", "Why don't we …? / How about …-ing? / I suggest we …"], ["Agreeing", "That's a great idea. / I'm all for it."], ["Disagreeing politely", "I see your point, but … / I'm not sure that would work because …"], ["Deciding", "So, we've decided to … / Let's go with …"], ["Assigning tasks", "Who's going to …? / I'll take care of …"]]),
            pics([["calendar", "set a date"], ["money", "plan a budget"], ["bus", "arrange transport"], ["report", "write an announcement"]]),
          ],
        },
        {
          title: "Your class project",
          blocks: [
            speaking({
              id: "sma10-c4-l3-say",
              title: "Announce a class event",
              prompt: "Your class has decided to organise an event (a charity bazaar, a beach clean-up, a sports day, a cultural night). Give a spoken announcement to the school: what, when, where, what participants will be doing, requirements and contact.",
              image: "microphone",
              prepSeconds: 60,
              seconds: 90,
              tips: ["Attention, please. / Good morning, everyone.", "We are pleased to announce that … is going to …", "It will be held on … at …", "Participants will be …-ing …", "Participants are to … / Please register by …", "For more information, contact …"],
              models: [{ label: "Example", text: "Good morning, everyone. We are pleased to announce that Class X-5 is going to hold a Charity Book Bazaar for children in flood-affected areas. The bazaar will be held on Saturday, 21 November, from 8 a.m. to 1 p.m. in the school lobby. We will be selling second-hand books, homemade snacks and handicrafts, and all the money will be donated to the Indonesian Red Cross. If you would like to donate books, please bring them to Room X-5 before Thursday. Volunteers are to wear their class T-shirts. For more information, please contact Fira or Galang from X-5. Thank you!" }],
              rubric: ["I gave the event, purpose, date, time and place.", "I used at least three different future forms correctly.", "I gave requirements and a deadline.", "I gave contact information.", "I spoke clearly, like a real announcement."],
            }),
            writing({
              id: "sma10-c4-l3-write",
              title: "A written announcement",
              prompt: "Write the announcement for your event as it would appear on the school notice board or Instagram account. Use clear sections, a passive sentence and at least two future forms.",
              image: "report",
              minWords: 120,
              maxWords: 220,
              tips: ["ANNOUNCEMENT / title", "We are pleased to announce that …", "Date / time / venue", "Activities: Participants will be …", "Requirements and deadlines", "Contact person"],
              models: [{ label: "Example", text: "ANNOUNCEMENT\nX-5 Charity Book Bazaar: “Books for Hope”\nWe are pleased to announce that Class X-5 is going to hold a charity book bazaar to help children whose schools were damaged by floods in Demak.\nDate: Saturday, 21 November 2026\nTime: 8.00 a.m. – 1.00 p.m.\nVenue: School lobby\nWe will be selling second-hand books, homemade snacks and handicrafts. All profits will be donated through the Indonesian Red Cross.\nWant to help?\n• Book donations will be collected in Room X-5 until Thursday, 19 November.\n• Volunteers are to attend a short meeting on Friday at 2.30 p.m.\nContact: Fira (0812-1111-2222) or Galang (0813-3333-4444)\nEvery book you buy is a step back to school for a child!" }],
              rubric: ["My announcement has a clear title and purpose.", "I included date, time and venue.", "I used future forms and a passive sentence.", "I gave requirements, deadlines and contact details.", "The layout is easy to scan."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sma10-c4-l3-c1", say(["man", "Why don't we hold the bazaar in the lobby?"], ["woman", "I see your point, but the lobby is too small. How about the basketball court?"]), "Listen. What does the woman suggest?", ["the basketball court", "the lobby", "the canteen"], 0, "How about the basketball court?"),
        pick("sma10-c4-l3-c2", "How about ___ a poster competition?", ["holding", "hold", "to hold"], 0, "How about + -ing."),
        arrange("sma10-c4-l3-c3", "Put the words in order.", "The bazaar will be held in the lobby", "Passive future."),
        fill("sma10-c4-l3-c4", "Complete: I ___ take care of the posters. (spontaneous offer)", "I", "take care of the posters.", ["'ll", "will"], "Tawaran spontan."),
        trPick("sma10-c4-l3-c5", "“Saya setuju sepenuhnya.” in English is…", ["I'm all for it.", "I'm all over it.", "I'm for all."], 0, "I'm all for it."),
        pick("sma10-c4-l3-c6", "Your friend suggests a night event, but many students live far away. What is the best response?", ["I see your point, but some students live far away. Why don't we hold it in the afternoon?", "No. Bad idea.", "Whatever you want."], 0, "Tidak setuju dengan sopan + alternatif.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma10-c4-post",
    title: "Chapter 4 Posttest",
    passPercent: 70,
    passages: [ANNOUNCE],
    questions: [
      pick("sma10-c4-post1", "My sister ___ married next June. They've booked the venue.", ["is getting", "gets", "will get", "got"], 0, "Arrangement → present continuous."),
      listen("sma10-c4-post2", voice("Students are to wear their full uniform during the ceremony, and mobile phones must be switched off."), "Listen. What must be switched off?", ["mobile phones", "the lights", "the microphones", "the air conditioner"], 0, "Mobile phones."),
      trPick("sma10-c4-post3", "“Pendaftaran akan ditutup” in English is…", ["Registration will be closed", "Registration will close it", "Register is closing will", "Registration closed will be"], 0, "Pasif future."),
      pick("sma10-c4-post4", "At 10 a.m. tomorrow, we ___ mangroves.", ["will be planting", "plant", "planted", "are plant"], 0, "Future continuous."),
      arrange("sma10-c4-post5", "Put the words in order.", "We are pleased to announce that the school will reopen", "Pembuka pengumuman."),
      pick("sma10-c4-post6", "Where will the briefing be held?", ["in Room 12", "in the KPA office", "at Cidaon", "in the main hall"], 0, "Baris 8.", { passageId: ANNOUNCE.id }),
      match("sma10-c4-post7", "Match the information and the date.", [["Registration opens", "2 November"], ["Permission form deadline", "20 November"], ["Briefing", "27 November"], ["Departure", "10 December"]], "Detail tanggal."),
      fill("sma10-c4-post8", "Complete.", "Participants are to bring their own sleeping bags and personal", ".", ["medicine"], "Baris 6.", { passageId: ANNOUNCE.id }),
      pick("sma10-c4-post9", "Why will registration close early if 30 places are filled?", ["The number of participants is limited.", "The bus is broken.", "The park is closed.", "The fee will increase."], 0, "Kuota terbatas.", { passageId: ANNOUNCE.id, hots: true }),
      pick("sma10-c4-post10", "Which sentence from the text is an example of the future continuous?", ["participants will be assisting park rangers", "The bus will leave at 5.00 a.m.", "Registration opens on Monday", "We are pleased to announce"], 0, "Will be + -ing.", { passageId: ANNOUNCE.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Future Forms Face-Off",
    questions: [
      live("sma10-c4-live1", "Timetable: The bus ___ at 5.", ["leaves", "will leaving", "is leave", "left"], 0, "bus"),
      live("sma10-c4-live2", "Instant decision:", ["I'll take it!", "I'm going to take it last week.", "I take it yesterday.", "I took it tomorrow."], 0, "thumbs-up"),
      live("sma10-c4-live3", "This time tomorrow I'll be ___", ["flying", "fly", "flew", "flown"], 0, "plane"),
      live("sma10-c4-live4", "“Wajib” =", ["compulsory", "optional", "free", "comfortable"], 0, "report", true),
      live("sma10-c4-live5", "Arrangement:", ["We're meeting at 3.", "We meet yesterday.", "We'll meeting.", "We met at 3 tomorrow."], 0, "calendar"),
      live("sma10-c4-live6", "Ujung Kulon is home to the Javan…", ["rhinoceros", "tiger", "elephant", "orangutan"], 0, "earth"),
      live("sma10-c4-live7", "How about ___?", ["going", "go", "to go", "went"], 0, "map"),
      live("sma10-c4-live8", "Evidence prediction: Look! It's ___ rain.", ["going to", "will", "is", "shall"], 0, "rain"),
    ],
  },
};
