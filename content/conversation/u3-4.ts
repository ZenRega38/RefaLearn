import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, tip, trPick, tryIt, vocab, voice, warn } from "../kit";

// Everyday English Conversation — Unit 3: Eating Out · Unit 4: Travel

export const U3: Level = {
  id: "conv-u3",
  title: "Unit 3 — Eating Out",
  description: "Book a table, order food and drinks, ask about dishes and dietary needs, deal with small problems and pay the bill.",
  targetScore: "Speaking · Listening",
  cover: ["restaurant", "soup", "receipt"],
  pretest: {
    id: "conv-u3-pre",
    title: "Unit 3 Pretest",
    passPercent: 0,
    questions: [
      pick("conv-u3-pre1", "Which is the most polite way to order?", ["Could I have the fried rice, please?", "Give me fried rice.", "Fried rice now."], 0, "Sopan."),
      listen("conv-u3-pre2", voice("Are you ready to order, or do you need a few more minutes?"), "Who is speaking?", ["a waiter", "a customer", "a chef", "a taxi driver"], 0, "Pelayan."),
      trPick("conv-u3-pre3", "“Tolong minta bonnya.” in English is…", ["Could we have the bill, please?", "Give the bill us.", "Please bill."], 0, "Meminta bon."),
      pick("conv-u3-pre4", "“I'm allergic to peanuts.” The speaker…", ["cannot eat peanuts", "loves peanuts", "sells peanuts"], 0, "Alergi."),
      pick("conv-u3-pre5", "A table for four at seven means…", ["a reservation for four people at 7 o'clock", "four tables", "a seven-person table"], 0, "Reservasi."),
    ],
  },
  lessons: [
    {
      id: "conv-u3-l1",
      skill: "speaking",
      title: "Booking a Table and Ordering",
      summary: "Making reservations, ordering politely and asking about the menu.",
      sections: [
        {
          title: "Phrases",
          blocks: [
            table(["Function", "Customer", "Staff"], [["booking", "I'd like to book a table for two at eight, please.", "Under what name?"], ["arriving", "We have a reservation under Pratama.", "Right this way."], ["ordering", "Could I have…? / I'll have… / I'd like…", "Anything to drink?"], ["asking", "What do you recommend? / Is it spicy?", "It's a little spicy."]]),
            vocab([["starter", "hidangan pembuka", "soup"], ["main course", "hidangan utama", "rice"], ["dessert", "hidangan penutup", "cake"], ["side dish", "lauk pendamping", "vegetables"], ["bill", "tagihan/bon", "receipt"]], "Restaurant words"),
          ],
        },
        {
          title: "Listen",
          blocks: [
            audio("Ordering dinner", say(["man", "Good evening. Are you ready to order?"], ["woman", "Almost. What do you recommend?"], ["man", "Our grilled fish with sambal matah is very popular."], ["woman", "Is it very spicy?"], ["man", "It's a bit spicy, but we can make it mild."], ["woman", "Mild, please. And I'll have an iced lime juice."], ["man", "Of course. Anything else?"], ["woman", "That's all for now, thank you."])),
            tryIt(pick("conv-u3-l1-try", "What does the waiter recommend?", ["grilled fish with sambal matah", "fried chicken", "noodle soup"], 0, "Rekomendasi.")),
          ],
        },
      ],
      checkpoint: [
        pick("conv-u3-l1-c1", "How does the woman want the fish?", ["mild", "very spicy", "without sambal"], 0, "Ia berkata “Mild, please” — tidak terlalu pedas."),
        pick("conv-u3-l1-c2", "What does she order to drink?", ["iced lime juice", "hot tea", "coffee"], 0, "Iced lime juice."),
        match("conv-u3-l1-c3", "Match the course and the example.", [["starter", "soup"], ["main course", "grilled fish with rice"], ["dessert", "fruit salad"], ["drink", "iced tea"]], "Urutan hidangan."),
        arrange("conv-u3-l1-c4", "Put the words in order.", "I'd like to book a table for two", "Reservasi."),
        trPick("conv-u3-l1-c5", "“Apa yang Anda rekomendasikan?” in English is…", ["What do you recommend?", "What you recommendation?", "Which recommend you?"], 0, "Bertanya rekomendasi."),
        pick("conv-u3-l1-c6", "A waiter asks “Anything else?” but you are finished. Best reply:", ["That's all for now, thank you.", "No.", "Go."], 0, "Sopan.", { hots: true }),
      ],
    },
    {
      id: "conv-u3-l2",
      skill: "listening",
      title: "Dietary Needs and Small Problems",
      summary: "Allergies, preferences, and politely complaining when something is wrong.",
      sections: [
        {
          title: "Dietary needs",
          blocks: [
            table(["Need", "Phrase"], [["allergy", "I'm allergic to shellfish. Does this contain any?"], ["vegetarian", "Do you have any vegetarian dishes?"], ["halal", "Is the meat halal?"], ["less sugar / no ice", "Less sugar, please. / No ice, please."]]),
            warn("Untuk alergi, sebutkan dengan **jelas dan serius**: *I have a severe allergy to peanuts.* Ini soal keselamatan, bukan sekadar selera."),
          ],
        },
        {
          title: "Polite complaints",
          blocks: [
            table(["Problem", "Polite phrase"], [["wrong order", "Excuse me, I think there's been a mistake. I ordered the chicken, not the beef."], ["food is cold", "Sorry, my soup is a bit cold. Could you warm it up?"], ["waiting long", "Excuse me, we've been waiting for 30 minutes. Could you check on our order?"], ["bill mistake", "I think there's an extra item on the bill."]]),
            audio("A mix-up", say(["woman", "Excuse me, I think there's been a mistake. I ordered the vegetarian noodles, but these have chicken."], ["man", "Oh, I'm so sorry about that. I'll change it right away."], ["woman", "Thank you. I'm vegetarian, so I can't eat this."], ["man", "Of course. I'll bring the correct dish in a few minutes, and the drinks are on the house."])),
            pics([["chef", "kitchen"], ["vegetables", "vegetarian"], ["question", "mistake?"], ["thumbs-up", "solved"]]),
            tryIt(pick("conv-u3-l2-try", "What was wrong with the order?", ["The noodles had chicken.", "The noodles were cold.", "The drinks were missing."], 0, "Ada ayam.")),
          ],
        },
      ],
      checkpoint: [
        listen("conv-u3-l2-c1", voice("The drinks are on the house."), "What does this mean?", ["The drinks are free.", "The drinks are on the roof.", "The drinks are expensive."], 0, "On the house = gratis."),
        pick("conv-u3-l2-c2", "Which complaint is most polite?", ["Excuse me, I think there's been a mistake with my order.", "This is wrong! Change it!", "Bad food."], 0, "Sopan."),
        fill("conv-u3-l2-c3", "Complete: I'm ___ to shellfish.", "I'm", "to shellfish.", ["allergic"], "Allergic to."),
        pickMany("conv-u3-l2-c4", "Choose ALL polite ways to make a request at a restaurant.", ["Could you warm it up, please?", "Would it be possible to change this?", "Less sugar, please.", "Bring it now!"], [0, 1, 2], "Permintaan sopan."),
        trPick("conv-u3-l2-c5", "“Apakah dagingnya halal?” in English is…", ["Is the meat halal?", "Is halal the meat?", "Meat halal is?"], 0, "Pertanyaan."),
        pick("conv-u3-l2-c6", "Why does the waiter offer free drinks?", ["to apologise for the mistake", "because it is a holiday", "because she complained loudly"], 0, "Kompensasi.", { hots: true }),
      ],
    },
    {
      id: "conv-u3-l3",
      skill: "speaking",
      title: "Paying and Giving Feedback",
      summary: "Asking for the bill, splitting costs, paying and complimenting the food.",
      sections: [
        {
          title: "At the end of the meal",
          blocks: [
            table(["Function", "Phrases"], [["asking for the bill", "Could we have the bill, please?"], ["splitting", "Can we pay separately? / Let's split it."], ["treating", "It's on me. / My treat."], ["paying", "Can I pay by card / QRIS?"], ["compliment", "Everything was delicious, thank you!"]]),
            repeat(["Could we have the bill, please?", "Let's split it.", "It's my treat.", "Everything was delicious, thank you!"]),
          ],
        },
        {
          title: "Role play",
          blocks: [
            pics([["receipt", "the bill"], ["money", "paying"], ["smartphone", "QRIS"], ["yum", "delicious!"]]),
            speaking({
              id: "conv-u3-l3-say",
              title: "Full restaurant role play",
              prompt: "Role-play a full restaurant visit with a friend: arrive with a reservation, ask for a recommendation, mention a dietary need, solve a small problem politely, and finish by paying and complimenting the food.",
              image: "restaurant",
              seconds: 150,
              tips: ["We have a reservation under …", "What do you recommend?", "I'm allergic to … / I don't eat …", "Excuse me, I think …", "Could we have the bill, please? Let's split it."],
              models: [{ label: "Model", text: "Hi, we have a reservation under Wijaya for two. … Thanks. What do you recommend tonight? … The soto sounds good. Is there any seafood in it? I'm allergic to prawns. … Great, then I'll have the soto and an iced tea, less sugar please. … Excuse me, I think this is sweet tea; I asked for less sugar. … Thank you. … Everything was delicious! Could we have the bill, please? … Can we pay separately? I'll pay by QRIS." }],
              rubric: ["I used the reservation and ordering phrases.", "I explained a dietary need clearly.", "I handled a problem politely.", "I paid and complimented naturally."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("conv-u3-l3-c1", "“It's on me.” means…", ["I'll pay.", "It's on my plate.", "I'm full."], 0, "Saya traktir."),
        pick("conv-u3-l3-c2", "Which asks to pay separately?", ["Can we pay separately?", "Can we pay together?", "Can I pay later?"], 0, "Bayar sendiri-sendiri."),
        fill("conv-u3-l3-c3", "Complete: Could we have the ___ , please?", "Could we have the", ", please?", ["bill", "check"], "Bill (British) atau check (American) = tagihan."),
        match("conv-u3-l3-c4", "Match the phrase and the meaning.", [["My treat.", "I'll pay for you."], ["Let's split it.", "We share the cost."], ["Keep the change.", "You can keep the extra money."], ["Everything was delicious.", "a compliment"]], "Ungkapan."),
        trPick("conv-u3-l3-c5", "“Simpan saja kembaliannya.” in English is…", ["Keep the change.", "Save the return.", "Keep your back money."], 0, "Keep the change."),
        pick("conv-u3-l3-c6", "Your friend paid last time. What is a kind thing to say now?", ["This one's on me.", "You pay again.", "I forgot my wallet forever."], 0, "Membalas traktiran.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "conv-u3-post",
    title: "Unit 3 Review Quiz",
    passPercent: 70,
    questions: [
      pick("conv-u3-post1", "“Under what name?” — “___”", ["It's under Sari.", "Under the table.", "My name is under."], 0, "Nama reservasi."),
      listen("conv-u3-post2", voice("We're out of the grilled squid today, but the prawns are excellent."), "What can't the customer order?", ["grilled squid", "prawns", "anything"], 0, "Out of = habis."),
      pick("conv-u3-post3", "Which shows a dietary need?", ["I don't eat pork.", "I like pork.", "Pork is meat."], 0, "Kebutuhan makan."),
      trPick("conv-u3-post4", "“Tanpa es, tolong.” in English is…", ["No ice, please.", "Without ice please me.", "Ice no."], 0, "No ice."),
      pick("conv-u3-post5", "Your food is cold. Best phrase:", ["Excuse me, my food is a bit cold. Could you warm it up?", "This is disgusting!", "Cold food!"], 0, "Sopan."),
      arrange("conv-u3-post6", "Put the words in order.", "Could we have the bill please", "Meminta bon."),
      listen("conv-u3-post7", say(["man", "How was everything?"], ["woman", "Lovely, thank you. The rendang was amazing."]), "What did the woman think of the food?", ["She enjoyed it.", "She didn't like it.", "She didn't eat."], 0, "Pujian."),
      pick("conv-u3-post8", "“The drinks are on the house.” This means…", ["free drinks", "drinks served on the roof", "expensive drinks"], 0, "Gratis."),
      pick("conv-u3-post9", "Why should you mention an allergy before ordering?", ["so the kitchen can make the food safe for you", "to get a discount", "to be funny"], 0, "Keselamatan.", { hots: true }),
      pick("conv-u3-post10", "You notice an extra drink on the bill. Best response:", ["Excuse me, I think there's an extra item on the bill.", "You're cheating me!", "Pay without saying anything."], 0, "Sopan.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Table for Two",
    questions: [
      live("conv-u3-live1", "Last course:", ["dessert", "starter", "main", "soup"], 0, "cake"),
      live("conv-u3-live2", "“On the house” =", ["free", "upstairs", "expensive", "takeaway"], 0, "thumbs-up"),
      live("conv-u3-live3", "Polite order:", ["Could I have…?", "Give me…", "I want now…", "Bring!"], 0, "restaurant"),
      live("conv-u3-live4", "“Bon/tagihan” =", ["bill", "bell", "ball", "bowl"], 0, "receipt", true),
      live("conv-u3-live5", "I'm allergic ___ nuts.", ["to", "with", "of", "at"], 0, "medicine"),
      live("conv-u3-live6", "Share the cost:", ["Let's split it.", "Let's cut it.", "Let's break.", "Let's half."], 0, "money"),
      live("conv-u3-live7", "“Habis” (menu item) =", ["We're out of it.", "We're out it.", "It's outside.", "It's off out."], 0, "food-stall"),
      live("conv-u3-live8", "Compliment:", ["Everything was delicious!", "Too salty.", "Never again.", "Slow service."], 0, "yum"),
    ],
  },
};

export const U4: Level = {
  id: "conv-u4",
  title: "Unit 4 — Travel",
  description: "Check in at the airport, handle hotel arrivals and requests, and deal with travel problems like delays and lost luggage.",
  targetScore: "Speaking · Listening",
  cover: ["plane", "suitcase", "passport"],
  pretest: {
    id: "conv-u4-pre",
    title: "Unit 4 Pretest",
    passPercent: 0,
    questions: [
      pick("conv-u4-pre1", "At check-in, the agent asks for your…", ["passport and booking reference", "favourite food", "school report"], 0, "Dokumen."),
      listen("conv-u4-pre2", voice("Flight GA 402 to Makassar has been delayed by forty-five minutes."), "What has happened to the flight?", ["It is delayed.", "It is cancelled.", "It left early."], 0, "Delayed."),
      trPick("conv-u4-pre3", "“Bagasi saya hilang.” in English is…", ["My luggage is missing.", "My luggage loses.", "I lost luggage me."], 0, "Lost luggage."),
      pick("conv-u4-pre4", "A window seat is…", ["next to the window", "near the toilet", "in first class", "next to the aisle"], 0, "Dekat jendela."),
      pick("conv-u4-pre5", "“Check-out is at noon” means you must leave the hotel room by…", ["12 p.m.", "12 a.m.", "6 p.m."], 0, "Noon = siang."),
    ],
  },
  lessons: [
    {
      id: "conv-u4-l1",
      skill: "listening",
      title: "At the Airport",
      summary: "Check-in, security, boarding announcements and seat preferences.",
      sections: [
        {
          title: "Airport language",
          blocks: [
            vocab([["boarding pass", "pas naik pesawat", "card"], ["gate", "gerbang", "door"], ["carry-on / hand luggage", "bagasi kabin", "bag"], ["checked baggage", "bagasi tercatat", "suitcase"], ["window / aisle seat", "kursi jendela / lorong", "plane"], ["delay", "penundaan", "clock"]], "Airport words"),
            table(["Check-in agent", "Passenger"], [["May I see your passport, please?", "Here you are."], ["Any bags to check in?", "Just one suitcase."], ["Window or aisle?", "A window seat, please."], ["Boarding starts at 9:20 from gate 7.", "Thank you."]]),
          ],
        },
        {
          title: "Announcements",
          blocks: [
            audio("Airport announcements", say(["woman", "Good morning. Passengers on flight QZ 750 to Denpasar, please proceed to gate 12. Boarding will begin in ten minutes."], ["man", "This is a final call for passenger Rina Hartono, travelling to Medan. Please go immediately to gate 4."], ["woman", "We regret to announce that flight JT 615 to Balikpapan has been delayed due to bad weather. The new departure time is 14:30."])),
            pics([["plane", "flight"], ["passport", "passport"], ["clock", "delay"], ["map", "gate"]]),
            tryIt(pick("conv-u4-l1-try", "Which gate should passengers to Denpasar go to?", ["gate 12", "gate 4", "gate 7"], 0, "Gate 12.")),
          ],
        },
      ],
      checkpoint: [
        pick("conv-u4-l1-c1", "Why is the Balikpapan flight delayed?", ["bad weather", "a technical problem", "a strike"], 0, "Due to bad weather."),
        pick("conv-u4-l1-c2", "What is the new departure time for JT 615?", ["14:30", "10:30", "16:30"], 0, "14:30."),
        pick("conv-u4-l1-c3", "What is a “final call”?", ["the last announcement before the gate closes", "a phone call", "the first announcement"], 0, "Panggilan terakhir."),
        match("conv-u4-l1-c4", "Match the question and the answer.", [["Window or aisle?", "Aisle, please."], ["Any bags to check in?", "Just this one."], ["May I see your passport?", "Here you are."], ["Did you pack your bag yourself?", "Yes, I did."]], "Dialog check-in."),
        trPick("conv-u4-l1-c5", "“Kursi dekat lorong” in English is…", ["an aisle seat", "a lane seat", "a corridor chair"], 0, "Aisle."),
        pick("conv-u4-l1-c6", "You hear your name in a final call. What should you do?", ["Go to the gate immediately.", "Buy a coffee first.", "Ignore it."], 0, "Tindakan segera.", { hots: true }),
      ],
    },
    {
      id: "conv-u4-l2",
      skill: "speaking",
      title: "At the Hotel",
      summary: "Checking in and out, asking about facilities, and making requests.",
      sections: [
        {
          title: "Hotel phrases",
          blocks: [
            table(["Function", "Phrases"], [["checking in", "Hi, I have a reservation under… for three nights."], ["facilities", "What time is breakfast? / Is there Wi-Fi in the room?"], ["requests", "Could I have an extra towel? / Could you recommend a place to eat?"], ["problems", "The air conditioner isn't working. Could someone take a look?"], ["checking out", "I'd like to check out. Can I leave my bag here until 3?"]]),
            tip("Untuk permintaan, gunakan **Could I…? / Would it be possible to…?** Untuk masalah, jelaskan **apa yang salah** lalu **minta tindakan**."),
          ],
        },
        {
          title: "Role play",
          blocks: [
            audio("Checking in", say(["woman", "Good afternoon, welcome to Hotel Senja. How can I help?"], ["man", "Hi, I have a reservation under Fadli for two nights."], ["woman", "Yes, I see it. Could I see your ID, please? … Thank you. You're in room 305. Breakfast is from 6:30 to 10 in the restaurant on the first floor."], ["man", "Great. Is there Wi-Fi?"], ["woman", "Yes, the password is on your key card holder. Do you need anything else?"], ["man", "Could you recommend a good place for seafood nearby?"])),
            speaking({
              id: "conv-u4-l2-say",
              title: "Hotel role play",
              prompt: "Role-play checking into a hotel, asking about breakfast and Wi-Fi, reporting a problem in your room (e.g. no hot water) and, later, checking out and asking to leave your luggage.",
              image: "house",
              seconds: 120,
              tips: ["I have a reservation under …", "What time is breakfast?", "Sorry to bother you, but …", "I'd like to check out. Could I leave my bag …?"],
              models: [{ label: "Model", text: "Hi, I have a reservation under Rina Sari for two nights. … Here's my ID. What time is breakfast? … And is there Wi-Fi? … Perfect, thanks. … [later, by phone] Hello, this is room 214. Sorry to bother you, but there's no hot water in the shower. Could someone take a look? … Thank you. … [next day] Good morning, I'd like to check out. Could I leave my suitcase here until three? My flight is in the evening." }],
              rubric: ["I checked in with the right phrases.", "I asked about facilities.", "I reported a problem and asked for action politely.", "I checked out and made a request."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("conv-u4-l2-c1", "What room is the guest in?", ["305", "503", "350"], 0, "Room 305."),
        pick("conv-u4-l2-c2", "Where is the Wi-Fi password?", ["on the key card holder", "on the TV", "at the restaurant"], 0, "Key card holder."),
        fill("conv-u4-l2-c3", "Complete: The air conditioner isn't ___ . Could someone take a look?", "The air conditioner isn't", ". Could someone take a look?", ["working"], "Isn't working."),
        arrange("conv-u4-l2-c4", "Put the words in order.", "Could I have an extra pillow", "Permintaan."),
        trPick("conv-u4-l2-c5", "“Maaf mengganggu, tapi…” in English is…", ["Sorry to bother you, but…", "Sorry disturb you but…", "Sorry for bothering but you…"], 0, "Pembuka sopan."),
        pick("conv-u4-l2-c6", "Your flight leaves at 9 p.m. but check-out is at noon. What is a smart request?", ["Could I leave my luggage here until the afternoon?", "Can I stay in the room for free until 9?", "Nothing."], 0, "Solusi praktis.", { hots: true }),
      ],
    },
    {
      id: "conv-u4-l3",
      skill: "speaking",
      title: "Travel Problems",
      summary: "Missed connections, lost luggage and cancelled bookings: explaining and solving problems.",
      sections: [
        {
          title: "Problem-solving language",
          blocks: [
            table(["Problem", "Phrase"], [["lost luggage", "My suitcase didn't arrive. It's a black suitcase with a red tag."], ["missed connection", "I missed my connecting flight because the first one was delayed."], ["cancelled booking", "My booking seems to have been cancelled. Could you check?"], ["asking for options", "What are my options? / Is there a later flight?"], ["compensation", "Will I receive any compensation?"]]),
            pics([["suitcase", "lost luggage"], ["plane", "missed flight"], ["receipt", "booking"], ["question", "options?"]]),
          ],
        },
        {
          title: "Role play",
          blocks: [
            audio("At the baggage desk", say(["man", "Hello, my suitcase didn't come out on the belt. I flew in from Jakarta on flight GA 210."], ["woman", "I'm sorry to hear that. Can you describe the suitcase?"], ["man", "It's a medium-sized grey suitcase with a yellow ribbon on the handle."], ["woman", "Thank you. Please fill in this form. We'll deliver it to your hotel as soon as it's found, usually within 24 hours."], ["man", "Could I get something for basic necessities in the meantime?"], ["woman", "Yes, we can give you an essentials kit."])),
            speaking({
              id: "conv-u4-l3-say",
              title: "Solve a travel problem",
              prompt: "Choose one problem — lost luggage, a missed connection or a cancelled hotel booking — and role-play explaining it clearly, asking about options and getting a solution.",
              image: "suitcase",
              seconds: 90,
              tips: ["I'm afraid … / Unfortunately, …", "It's a … with …", "What are my options?", "Could you …?", "Thank you for your help."],
              models: [{ label: "Model", text: "Excuse me, I'm afraid I've missed my connecting flight to Labuan Bajo. My flight from Surabaya was delayed by two hours. What are my options? … The next flight is tomorrow morning? OK. Since the delay wasn't my fault, could you provide a hotel for tonight? … That would be great. And could you please make sure my checked bag is transferred to the new flight? Thank you so much for your help." }],
              rubric: ["I explained the problem clearly.", "I gave useful details.", "I asked about options politely.", "I reached a solution and thanked the staff."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("conv-u4-l3-c1", "How does the man describe his suitcase?", ["medium-sized, grey, with a yellow ribbon", "small, black, with a red tag", "large, blue, no tag"], 0, "Deskripsi koper."),
        pick("conv-u4-l3-c2", "When is the suitcase usually delivered?", ["within 24 hours", "within a week", "never"], 0, "24 hours."),
        fill("conv-u4-l3-c3", "Complete: What are my ___ ? (pilihan)", "What are my", "?", ["options"], "Options.", { translate: true }),
        pickMany("conv-u4-l3-c4", "Choose ALL useful details when reporting lost luggage.", ["flight number", "colour and size of the bag", "distinctive features like ribbons", "your favourite movie"], [0, 1, 2], "Detail relevan."),
        trPick("conv-u4-l3-c5", "“Sayangnya, saya ketinggalan pesawat lanjutan.” in English is…", ["Unfortunately, I've missed my connecting flight.", "Sadly, I lost my flight connect.", "Unfortunate, I missing plane."], 0, "Missed connection."),
        pick("conv-u4-l3-c6", "Why is mentioning that the delay “wasn't your fault” useful?", ["The airline may be responsible for helping you.", "It makes the staff angry.", "It is not useful."], 0, "Hak penumpang.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "conv-u4-post",
    title: "Unit 4 Review Quiz",
    passPercent: 70,
    questions: [
      pick("conv-u4-post1", "“Window or aisle?” is asked at…", ["check-in", "security", "baggage claim", "the hotel"], 0, "Check-in."),
      listen("conv-u4-post2", voice("Boarding will begin in ten minutes from gate twelve."), "Where should passengers go?", ["gate 12", "gate 10", "gate 2"], 0, "Gate 12."),
      pick("conv-u4-post3", "Which is a polite hotel request?", ["Could I have an extra towel, please?", "Give me towel.", "Towel now."], 0, "Sopan."),
      trPick("conv-u4-post4", "“Pas naik pesawat” in English is…", ["boarding pass", "plane ticket card", "board paper"], 0, "Boarding pass."),
      pick("conv-u4-post5", "“We regret to announce…” usually introduces…", ["bad news", "a party", "a free gift"], 0, "Kabar buruk."),
      arrange("conv-u4-post6", "Put the words in order.", "I have a reservation for three nights", "Check-in."),
      listen("conv-u4-post7", say(["woman", "Your room isn't ready yet, but you're welcome to leave your bags with us and use the pool."]), "What can the guest do?", ["leave bags and use the pool", "go to the room now", "check out"], 0, "Pilihan."),
      pick("conv-u4-post8", "Your suitcase is missing. First thing to say:", ["My suitcase didn't arrive. I was on flight GA 210.", "Where is everything?", "I hate this airport."], 0, "Jelas dan informatif."),
      pick("conv-u4-post9", "Why should you describe distinctive features of a lost bag?", ["So staff can identify it quickly.", "To decorate the form.", "It isn't necessary."], 0, "Identifikasi.", { hots: true }),
      pick("conv-u4-post10", "Your hotel booking can't be found. Best response:", ["Could you check again under my email address? Here's my confirmation.", "This hotel is terrible!", "Leave without a room."], 0, "Solusi.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Bon Voyage",
    questions: [
      live("conv-u4-live1", "Seat by the corridor:", ["aisle", "window", "middle", "exit"], 0, "plane"),
      live("conv-u4-live2", "Last announcement before gate closes:", ["final call", "first call", "free call", "late call"], 0, "microphone"),
      live("conv-u4-live3", "Bag you carry on the plane:", ["carry-on", "checked bag", "lost bag", "cargo"], 0, "bag"),
      live("conv-u4-live4", "“Penundaan” =", ["delay", "decay", "deal", "delete"], 0, "clock", true),
      live("conv-u4-live5", "Leave the hotel:", ["check out", "check in", "check up", "check on"], 0, "house"),
      live("conv-u4-live6", "Polite opener:", ["Sorry to bother you, but…", "Hey you!", "Listen!", "Fix it!"], 0, "chat"),
      live("conv-u4-live7", "Need a document at check-in:", ["passport", "diary", "menu", "map"], 0, "passport"),
      live("conv-u4-live8", "Ask for choices:", ["What are my options?", "What is option?", "Where options?", "Option me."], 0, "question"),
    ],
  },
};
