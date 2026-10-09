import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 11 (SMA, Fase F). Chapter 7 — Complaints and Apologies · Chapter 8 — Food and Culture (compare and contrast)

const COMPLAINT: Passage = {
  id: "sma11-c7-complaint",
  title: "A Complaint Email to an Online Shop",
  pic: "laptop",
  lines: [
    "Subject: Order #TB-48213 — Wrong item and damaged packaging",
    "Dear Customer Service Team,",
    "I am writing to complain about an order I placed on your website on 2 September. I ordered a pair of black running shoes, size 41, for Rp649,000.",
    "The parcel arrived on 9 September, three days later than the delivery date you had promised. When I opened it, I found that the box had been crushed and the shoes inside were white, size 39.",
    "I contacted your chat service on 10 September, but I have not received any reply, despite sending three messages.",
    "I have attached photos of the parcel, the shoes and the receipt as evidence.",
    "I would therefore be grateful if you could either send me the correct shoes by 20 September or give me a full refund, including the shipping cost.",
    "I have been a loyal customer for two years and have always been satisfied with your service, so I hope this problem can be solved quickly.",
    "I look forward to your prompt reply.",
    "Yours sincerely, Fadli Ramadhan",
  ],
};

export const CH7: Level = {
  id: "sma11-ch7",
  title: "Chapter 7 — Complaints and Apologies",
  description: "Make polite complaints in speech and writing, respond with apologies and solutions, use softening language, and write formal complaint and apology emails.",
  targetScore: "Writing · Speaking · Reading",
  cover: ["customer-angry", "headset", "receipt"],
  pretest: {
    id: "sma11-c7-pre",
    title: "Chapter 7 Pretest",
    passPercent: 0,
    questions: [
      pick("sma11-c7-pre1", "Which is the most polite way to complain in a restaurant?", ["Excuse me, I'm afraid there's a problem with my order.", "This food is disgusting!", "Bring me something else now.", "You people are useless."], 0, "Sopan dan jelas."),
      listen("sma11-c7-pre2", voice("We sincerely apologise for the delay and the inconvenience it has caused."), "Listen. What is the speaker doing?", ["apologising formally", "complaining", "thanking", "inviting"], 0, "Sincerely apologise."),
      trPick("sma11-c7-pre3", "“Pengembalian dana” in English is…", ["refund", "repay day", "return money note", "refill"], 0, "Refund."),
      pick("sma11-c7-pre4", "A formal complaint email should include…", ["the problem, evidence and the solution you want", "only angry words", "a joke", "your life story"], 0, "Elemen penting."),
      pick("sma11-c7-pre5", "“I'm afraid…” is used to…", ["soften bad news or a complaint", "show fear of animals", "give a compliment", "end a letter"], 0, "Pelunak."),
    ],
  },
  lessons: [
    {
      id: "sma11-c7-l1",
      skill: "speaking",
      title: "Complaining Politely",
      summary: "Softening language, explaining the problem and asking for action.",
      sections: [
        {
          title: "Softening the complaint",
          blocks: [
            table(["Step", "Expressions"], [["Getting attention", "Excuse me, … / Sorry to bother you, but …"], ["Stating the problem (softened)", "I'm afraid there's a problem with … / I'm not very happy with … / There seems to be a mistake …"], ["Explaining", "I ordered … but I received … / It was supposed to … but …"], ["Requesting action", "Could you possibly …? / Would it be possible to …? / I'd like a replacement / refund."], ["Escalating politely", "Could I speak to the manager, please?"]]),
            text("**Softeners** membuat keluhan tetap tegas tetapi sopan: *I'm afraid*, *There seems to be*, *a bit*, *rather*, *Could you possibly…?* Hindari menyalahkan pribadi (*You stupid…*); fokus pada **masalah** dan **solusi**."),
            pics([["customer-angry", "frustrated customer"], ["headset", "customer service"], ["receipt", "receipt as evidence"], ["money", "refund"]]),
          ],
        },
        {
          title: "At the counter",
          blocks: [
            audio("At a phone shop", say(["woman", "Excuse me. I'm afraid there's a problem with the phone I bought here last week. The battery runs out in about three hours."], ["man", "I'm sorry to hear that. Do you have the receipt?"], ["woman", "Yes, here it is. It's still under warranty, isn't it?"], ["man", "Yes, it is. We can either repair it, which takes about five days, or replace it today."], ["woman", "Would it be possible to replace it today? I need it for work."], ["man", "Of course. I apologise for the inconvenience."])),
            tryIt(pick("sma11-c7-l1-try1", "What solution does the customer choose?", ["a replacement today", "a repair in five days", "a refund"], 0, "Replace it today.")),
            repeat(["Excuse me, I'm afraid there's a problem.", "There seems to be a mistake on the bill.", "Would it be possible to get a refund?", "Could I speak to the manager, please?"]),
          ],
        },
      ],
      checkpoint: [
        listen("sma11-c7-l1-c1", voice("Sorry to bother you, but there seems to be a mistake on our bill. We didn't order any drinks."), "Listen. What's the problem?", ["The bill includes drinks they didn't order.", "The food was cold.", "The waiter was rude."], 0, "Mistake on the bill."),
        pick("sma11-c7-l1-c2", "Which complaint is the most polite?", ["I'm afraid the room is rather noisy. Would it be possible to change rooms?", "This room is terrible!", "Change my room now."], 0, "Softeners + request."),
        match("sma11-c7-l1-c3", "Match the step and the expression.", [["getting attention", "Sorry to bother you, but…"], ["stating the problem", "I'm afraid there's a problem with…"], ["requesting action", "Would it be possible to…?"], ["escalating", "Could I speak to the manager?"]], "Tahapan keluhan."),
        fill("sma11-c7-l1-c4", "Complete: There ___ to be a mistake with my order.", "There", "to be a mistake with my order.", ["seems"], "There seems to be."),
        trPick("sma11-c7-l1-c5", "“Masih dalam masa garansi” in English is…", ["still under warranty", "still on guarantee time", "still in warrant"], 0, "Under warranty."),
        pick("sma11-c7-l1-c6", "Your food arrives cold. What is the best first step?", ["Calmly tell the waiter and ask if it could be heated or replaced.", "Leave without paying.", "Post an angry review immediately."], 0, "Selesaikan langsung dan sopan.", { hots: true }),
      ],
    },
    {
      id: "sma11-c7-l2",
      skill: "reading",
      title: "Reading: A Complaint Email",
      summary: "Structure and tone of an effective formal complaint.",
      passages: [COMPLAINT],
      sections: [
        {
          title: "The email",
          blocks: [
            { type: "passage", passage: COMPLAINT },
            table(["Part", "Lines"], [["Clear subject line with order number", "1"], ["Reason for writing", "3"], ["Details of the problem (facts, dates)", "4–5"], ["Evidence", "6"], ["Requested solution with deadline", "7"], ["Goodwill + closing", "8–10"]]),
            vocab([["parcel", "paket", "envelope"], ["crushed", "remuk/penyok", "trash"], ["evidence", "bukti", "receipt"], ["prompt", "segera", "clock"], ["loyal customer", "pelanggan setia", "customer"]], "Words from the text"),
          ],
        },
        {
          title: "Why it works",
          blocks: [
            tip("Keluhan yang efektif: **faktual** (tanggal, nomor pesanan, harga), **tenang**, menyertakan **bukti**, meminta **solusi spesifik** dengan **tenggat**, dan menunjukkan **niat baik**."),
            tryIt(pick("sma11-c7-l2-try1", "What did Fadli actually receive?", ["white shoes, size 39", "black shoes, size 41", "nothing"], 0, "Baris 4.", { passageId: COMPLAINT.id })),
          ],
        },
      ],
      checkpoint: [
        pick("sma11-c7-l2-c1", "How late was the delivery?", ["three days", "one week", "one day"], 0, "Baris 4.", { passageId: COMPLAINT.id }),
        pickMany("sma11-c7-l2-c2", "Choose ALL the problems Fadli mentions.", ["late delivery", "a crushed box", "the wrong shoes", "a rude courier"], [0, 1, 2], "Baris 4.", { passageId: COMPLAINT.id }),
        fill("sma11-c7-l2-c3", "Complete.", "I have attached photos of the parcel, the shoes and the receipt as", ".", ["evidence"], "Baris 6.", { passageId: COMPLAINT.id }),
        pick("sma11-c7-l2-c4", "What two solutions does Fadli accept?", ["the correct shoes by 20 September or a full refund", "a discount voucher only", "a free T-shirt"], 0, "Baris 7.", { passageId: COMPLAINT.id }),
        pick("sma11-c7-l2-c5", "Why does Fadli mention that he has been a loyal customer?", ["to show goodwill and encourage the shop to keep him happy", "to brag", "to ask for a job"], 0, "Strategi persuasif.", { passageId: COMPLAINT.id, hots: true }),
        pick("sma11-c7-l2-c6", "Why does he include a deadline?", ["so the shop knows exactly when action is expected", "because he is angry", "to make the email longer"], 0, "Solusi spesifik.", { passageId: COMPLAINT.id, hots: true }),
      ],
    },
    {
      id: "sma11-c7-l3",
      skill: "writing",
      title: "Apologising and Responding to Complaints",
      summary: "Formal apologies, explanations without excuses, and offering solutions.",
      sections: [
        {
          title: "A good apology",
          blocks: [
            table(["Step", "Expressions"], [["Apologise", "We sincerely apologise for … / Please accept our apologies for …"], ["Acknowledge", "We understand how frustrating this must have been."], ["Explain (briefly, no excuses)", "This was caused by an error in our warehouse."], ["Offer a solution", "We will send the correct item today, at no extra cost."], ["Prevent", "We have taken steps to ensure this does not happen again."], ["Close", "Thank you for your patience. We hope to serve you again."]]),
            warn("Hindari permintaan maaf yang menyalahkan pelanggan (*We're sorry you feel that way*) atau terlalu banyak alasan. Akui, perbaiki, cegah."),
          ],
        },
        {
          title: "Write both sides",
          blocks: [
            writing({
              id: "sma11-c7-l3-write",
              title: "A complaint and an apology",
              prompt: "(1) Write a formal complaint email about a real or imagined problem (an online order, a hotel, a bus company, a course). (2) Then write the company's apology reply offering a solution.",
              image: "headset",
              minWords: 250,
              maxWords: 380,
              tips: ["Complaint: Subject → reason → facts and dates → evidence → requested solution + deadline → goodwill → closing", "Apology: apologise → acknowledge → brief explanation → solution → prevention → close"],
              models: [{ label: "Complaint", text: "Subject: Cancelled bus trip on 14 June — Ticket No. 778120\nDear Customer Service,\nI am writing to complain about the cancellation of my bus trip from Bandung to Yogyakarta on 14 June, which departed at 8.00 p.m. according to my ticket.\nWhen I arrived at the terminal at 7.30 p.m., I was told that the trip had been cancelled. No message had been sent to my phone or email, even though I had registered both when I booked. As a result, I had to buy an expensive last-minute train ticket.\nI have attached my ticket and the train receipt. I would be grateful if you could refund the full ticket price of Rp320,000 and explain why passengers were not informed.\nI look forward to your reply within seven working days.\nYours faithfully,\nSekar Ayuningtyas" }, { label: "Apology", text: "Subject: RE: Cancelled bus trip on 14 June — Ticket No. 778120\nDear Ms. Ayuningtyas,\nThank you for contacting us, and please accept our sincere apologies for the cancellation of your trip and for the stress it caused.\nWe understand how frustrating it must have been to discover the cancellation at the terminal. The trip was cancelled because of a mechanical problem, and unfortunately our notification system failed to send messages to passengers.\nWe have refunded the full ticket price of Rp320,000 to your account, and we would like to offer you a voucher for one free trip as a gesture of goodwill. We have also upgraded our system so that passengers receive notifications by both SMS and email.\nThank you for your patience. We hope to welcome you on board again soon.\nKind regards,\nRudi Hartono, Customer Relations Manager" }],
              rubric: ["My complaint includes facts, evidence and a specific request.", "My complaint is firm but polite.", "My apology acknowledges the problem without blaming the customer.", "My apology offers a clear solution and prevention.", "Both emails use formal register and correct layout."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sma11-c7-l3-c1", voice("We understand how frustrating this must have been, and we have refunded your payment in full."), "Listen. What has the company done?", ["refunded the payment", "ignored the complaint", "blamed the customer"], 0, "Refunded in full."),
        pick("sma11-c7-l3-c2", "Which is the WORST apology?", ["We're sorry you feel that way.", "We sincerely apologise for the error.", "Please accept our apologies for the delay."], 0, "Tidak mengakui kesalahan."),
        arrange("sma11-c7-l3-c3", "Put the words in order.", "Please accept our sincere apologies for the delay", "Permintaan maaf formal."),
        fill("sma11-c7-l3-c4", "Complete: We have taken steps to ___ that this does not happen again.", "We have taken steps to", "that this does not happen again.", ["ensure", "make sure"], "Ensure = memastikan."),
        trPick("sma11-c7-l3-c5", "“Sebagai tanda itikad baik” in English is…", ["as a gesture of goodwill", "as a sign good faith of", "for good willing"], 0, "Gesture of goodwill."),
        pick("sma11-c7-l3-c6", "Why should a company explain the cause briefly instead of giving many excuses?", ["Too many excuses sound like avoiding responsibility.", "Customers love long letters.", "Explanations are illegal."], 0, "Tanggung jawab.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma11-c7-post",
    title: "Chapter 7 Posttest",
    passPercent: 70,
    passages: [COMPLAINT],
    questions: [
      pick("sma11-c7-post1", "I'm ___ there's a problem with my room key.", ["afraid", "scared", "frightening", "fear"], 0, "I'm afraid = sayangnya."),
      listen("sma11-c7-post2", say(["man", "Would it be possible to change my seat? The air conditioner is dripping on me."], ["woman", "Of course, sir. I'm very sorry about that. Please follow me."]), "Listen. Why does the man want to change seats?", ["The air conditioner is dripping.", "It's too noisy.", "He wants a window seat.", "His friend is there."], 0, "Dripping AC."),
      trPick("sma11-c7-post3", "“Mohon maaf atas ketidaknyamanannya.” in English is…", ["We apologise for the inconvenience.", "We sorry for not comfortable.", "Please forgive uncomfortable.", "Sorry for convenience."], 0, "Inconvenience."),
      pick("sma11-c7-post4", "Which sentence requests action politely?", ["Could you possibly send a replacement by Friday?", "Send it now!", "You must send it.", "Why haven't you sent it?"], 0, "Could you possibly…"),
      arrange("sma11-c7-post5", "Put the words in order.", "I am writing to complain about my order", "Pembuka email keluhan."),
      pick("sma11-c7-post6", "How many messages had Fadli sent to the chat service?", ["three", "one", "five", "none"], 0, "Baris 5.", { passageId: COMPLAINT.id }),
      match("sma11-c7-post7", "Match the apology step and the example.", [["apologise", "We sincerely apologise."], ["acknowledge", "We understand your frustration."], ["solution", "We will send a new item today."], ["prevention", "We have improved our system."]], "Tahapan permintaan maaf."),
      fill("sma11-c7-post8", "Complete.", "I look forward to your", "reply.", ["prompt"], "Baris 9.", { passageId: COMPLAINT.id }),
      pick("sma11-c7-post9", "Why is the order number in the subject line?", ["so the shop can find the order quickly", "to look professional only", "because it is the price", "for decoration"], 0, "Efisiensi.", { passageId: COMPLAINT.id, hots: true }),
      pick("sma11-c7-post10", "Which word best describes the tone of Fadli's email?", ["firm but polite", "rude and aggressive", "humorous", "desperate"], 0, "Nada tegas dan sopan.", { passageId: COMPLAINT.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Customer Care",
    questions: [
      live("sma11-c7-live1", "Softener:", ["I'm afraid…", "You idiot…", "Listen!", "Hey you!"], 0, "customer"),
      live("sma11-c7-live2", "Money back:", ["refund", "refill", "rebuild", "remind"], 0, "money"),
      live("sma11-c7-live3", "Worst apology:", ["Sorry you feel that way.", "We sincerely apologise.", "Please accept our apologies.", "We are truly sorry."], 0, "customer-angry"),
      live("sma11-c7-live4", "“Garansi” =", ["warranty", "warrant", "warning", "wardrobe"], 0, "receipt", true),
      live("sma11-c7-live5", "There ___ to be a mistake.", ["seems", "seem", "is seem", "seeming"], 0, "question"),
      live("sma11-c7-live6", "Attach photos as…", ["evidence", "evident", "evidently", "even"], 0, "camera"),
      live("sma11-c7-live7", "Goodwill gift:", ["voucher", "fine", "bill", "tax"], 0, "card"),
      live("sma11-c7-live8", "Customer service tool:", ["headset", "hammer", "shovel", "kite"], 0, "headset"),
    ],
  },
};

const FOOD: Passage = {
  id: "sma11-c8-food",
  title: "Rice and Bread: Two Tables, Two Cultures",
  pic: "rice",
  lines: [
    "For billions of people, a meal is not complete without a staple food. In Indonesia, that staple is usually rice, whereas in many European countries it is bread.",
    "Both rice and bread are made from grains and provide energy in the form of carbohydrates. Similarly, both have been central to their cultures for thousands of years.",
    "However, they are eaten in very different ways. In Indonesia, rice is the centre of the plate, and side dishes such as vegetables, tempe and sambal are added around it. In contrast, bread in Europe is often served on the side, while meat or cheese is the main part of the meal.",
    "Eating habits also differ. Many Indonesians eat with their right hand or with a spoon and fork, while most Europeans use a knife and fork. Meals in Indonesia are often shared from common dishes, whereas European meals are usually served on individual plates.",
    "Both foods carry symbolic meanings. Tumpeng, a cone of yellow rice, is served at Indonesian celebrations to express gratitude. Likewise, in many European traditions, bread is broken and shared to show friendship and peace.",
    "Despite these differences, the two cultures are coming closer. Bakeries are popular in Indonesian cities, and Indonesian fried rice can now be found on menus in London and Amsterdam.",
    "Ultimately, rice and bread show that food is more than nutrition: it reflects history, climate, values and the way people live together.",
  ],
};

export const CH8: Level = {
  id: "sma11-ch8",
  title: "Chapter 8 — Food and Culture",
  description: "Compare and contrast cultures through food, use contrast and similarity markers (whereas, while, in contrast, similarly, likewise), and write a compare-and-contrast essay.",
  targetScore: "Reading · Structure · Writing",
  cover: ["rice", "bread", "ketupat"],
  pretest: {
    id: "sma11-c8-pre",
    title: "Chapter 8 Pretest",
    passPercent: 0,
    questions: [
      pick("sma11-c8-pre1", "Rice is a staple in Asia, ___ bread is a staple in Europe.", ["whereas", "similarly", "likewise", "because"], 0, "Kontras → whereas."),
      listen("sma11-c8-pre2", voice("Both tumpeng and birthday cakes are used to celebrate special occasions."), "Listen. What do tumpeng and birthday cakes have in common?", ["They are used for celebrations.", "They are both sweet.", "They are both from Europe.", "They are both drinks."], 0, "Persamaan."),
      trPick("sma11-c8-pre3", "“Makanan pokok” in English is…", ["staple food", "main course plate", "basic dish only", "stable food"], 0, "Staple food."),
      pick("sma11-c8-pre4", "Which word shows SIMILARITY?", ["Likewise", "However", "In contrast", "Whereas"], 0, "Likewise = demikian pula."),
      pick("sma11-c8-pre5", "A compare-and-contrast essay explains…", ["similarities and differences between two things", "how to cook a meal", "a personal story", "the news"], 0, "Persamaan dan perbedaan."),
    ],
  },
  lessons: [
    {
      id: "sma11-c8-l1",
      skill: "reading",
      title: "Reading: Rice and Bread",
      summary: "Organisation of a compare-and-contrast text.",
      passages: [FOOD],
      sections: [
        {
          title: "The text",
          blocks: [
            { type: "passage", passage: FOOD },
            audio("Listen and read", say(["woman", FOOD.lines.join(" ")])),
            vocab([["staple", "makanan pokok", "rice"], ["grain", "biji-bijian", "bread"], ["side dish", "lauk pendamping", "vegetables"], ["gratitude", "rasa syukur", "heart"], ["reflect", "mencerminkan", "eye"]], "Words from the text"),
          ],
        },
        {
          title: "Two ways to organise",
          blocks: [
            table(["Block method", "Point-by-point method"], [["Paragraph 1: everything about rice", "Paragraph 1: role on the plate (rice vs bread)"], ["Paragraph 2: everything about bread", "Paragraph 2: eating habits (rice vs bread)"], ["Paragraph 3: conclusion", "Paragraph 3: symbolic meaning (rice vs bread)"], ["easier to write", "easier for readers to compare"]]),
            text("Teks ini memakai **point-by-point**: setiap paragraf membahas satu aspek untuk kedua budaya."),
            tryIt(pick("sma11-c8-l1-try1", "What do rice and bread have in common nutritionally?", ["They provide energy from carbohydrates.", "They are rich in protein.", "They contain no calories."], 0, "Baris 2.", { passageId: FOOD.id })),
          ],
        },
      ],
      checkpoint: [
        pick("sma11-c8-l1-c1", "How is rice usually served in Indonesia?", ["at the centre of the plate with side dishes around it", "on the side", "only at breakfast"], 0, "Baris 3.", { passageId: FOOD.id }),
        pick("sma11-c8-l1-c2", "What does tumpeng express?", ["gratitude", "sadness", "anger"], 0, "Baris 5.", { passageId: FOOD.id }),
        fill("sma11-c8-l1-c3", "Complete.", "Indonesian fried rice can now be found on menus in London and", ".", ["Amsterdam"], "Baris 6.", { passageId: FOOD.id }),
        pickMany("sma11-c8-l1-c4", "Choose ALL the aspects compared in the text.", ["role on the plate", "eating habits", "symbolic meaning", "prices in supermarkets"], [0, 1, 2], "Baris 3–5.", { passageId: FOOD.id }),
        pick("sma11-c8-l1-c5", "What is the main idea of the last line?", ["Food reflects people's history, values and way of life.", "Rice is better than bread.", "Bread is healthier."], 0, "Kesimpulan.", { passageId: FOOD.id, hots: true }),
        pick("sma11-c8-l1-c6", "Is the writer biased toward one culture?", ["No, both are described respectfully and equally.", "Yes, the writer prefers bread.", "Yes, the writer criticises rice."], 0, "Seimbang.", { passageId: FOOD.id, hots: true }),
      ],
    },
    {
      id: "sma11-c8-l2",
      skill: "structure",
      title: "Comparing and Contrasting",
      summary: "Linking words for similarity and difference; both/neither; comparative structures.",
      sections: [
        {
          title: "Similarity and contrast markers",
          blocks: [
            table(["Function", "Within a sentence", "Between sentences"], [["Similarity", "both … and …, as … as, like, similar to", "Similarly, Likewise, In the same way,"], ["Contrast", "whereas, while, but, unlike, compared with", "However, In contrast, On the other hand,"], ["Concession", "although, even though, despite", "Nevertheless, Even so,"]]),
            examples([{ right: "Rice is grown in wet fields, whereas wheat grows in drier climates." }, { right: "Unlike bread, rice is usually steamed or boiled." }, { right: "Neither sushi nor nasi kuning is eaten with a knife." }, { right: "Indonesian food is generally spicier than Dutch food. In contrast, Dutch food uses more dairy." }], "Examples"),
          ],
        },
        {
          title: "Food culture conversation",
          blocks: [
            pics([["rice", "rice"], ["bread", "bread"], ["spoon", "spoon and fork"], ["knife", "knife and fork"]]),
            audio("Exchange student", say(["man", "When I first came to Medan from Germany, I was surprised that people eat rice three times a day."], ["woman", "Really? What do you eat in Germany?"], ["man", "Bread for breakfast and dinner, usually. Lunch is the main hot meal, whereas here dinner seems to be more important."], ["woman", "Interesting! Similarly, we have a big family meal when everyone comes home in the evening."], ["man", "And unlike in Germany, everything here is so spicy! But I love sambal now."])),
            tryIt(pick("sma11-c8-l2-try1", "In Germany, which meal is the main hot meal?", ["lunch", "breakfast", "dinner"], 0, "Lunch is the main hot meal.")),
            repeat(["Unlike bread, rice is steamed.", "Similarly, both are shared at celebrations.", "Whereas Indonesians use their hands, Europeans use cutlery.", "Neither culture wastes food at festivals."]),
          ],
        },
      ],
      checkpoint: [
        listen("sma11-c8-l2-c1", voice("Unlike Japanese cuisine, which is often mild, Padang food is rich and spicy."), "Listen. How is Padang food described?", ["rich and spicy", "mild", "sweet"], 0, "Unlike = kontras."),
        pick("sma11-c8-l2-c2", "___ Indonesia and Thailand are famous for spicy food.", ["Both", "Neither", "Either"], 0, "Both … and."),
        pick("sma11-c8-l2-c3", "Japanese people use chopsticks. ___, Koreans use metal chopsticks.", ["Similarly", "In contrast", "Despite"], 0, "Persamaan."),
        fill("sma11-c8-l2-c4", "Complete: Bread is baked, ___ rice is boiled or steamed.", "Bread is baked,", "rice is boiled or steamed.", ["whereas", "while"], "Kontras dalam satu kalimat."),
        trPick("sma11-c8-l2-c5", "“Berbeda dengan sushi, rendang dimasak lama.” in English is…", ["Unlike sushi, rendang is cooked for a long time.", "Like sushi, rendang is cooked long.", "Different sushi, rendang cook long."], 0, "Unlike + noun."),
        pick("sma11-c8-l2-c6", "Which sentence uses “neither … nor” correctly?", ["Neither my brother nor my sister likes durian.", "Neither my brother or my sister likes durian.", "Neither my brother nor my sister don't like durian."], 0, "Neither … nor, tanpa negatif ganda.", { hots: true }),
      ],
    },
    {
      id: "sma11-c8-l3",
      skill: "writing",
      title: "Write a Compare-and-Contrast Essay",
      summary: "Planning with a Venn diagram and writing a balanced essay.",
      sections: [
        {
          title: "Plan with a Venn diagram",
          blocks: [
            text("Gambar dua lingkaran yang saling beririsan. Tulis **perbedaan** di bagian luar masing-masing lingkaran dan **persamaan** di bagian tengah. Lalu pilih **3 aspek** terpenting untuk dibahas."),
            table(["Topic ideas", "Possible aspects"], [["Eid al-Fitr vs Christmas in Indonesia", "food, family visits, clothes, giving"], ["Traditional market vs supermarket", "prices, freshness, atmosphere, bargaining"], ["Javanese vs Minang wedding", "clothes, food, ceremonies, roles"], ["Indonesian vs Japanese school lunch", "who cooks, menu, manners"]]),
            tip("Mulai dengan **pengantar** yang memperkenalkan kedua hal dan **tesis** (misalnya: keduanya berbeda dalam X dan Y, tetapi sama-sama mencerminkan Z)."),
          ],
        },
        {
          title: "Write",
          blocks: [
            writing({
              id: "sma11-c8-l3-write",
              title: "My compare-and-contrast essay",
              prompt: "Write a compare-and-contrast essay about two food traditions, celebrations or customs (in Indonesia or between Indonesia and another country). Use the point-by-point method with at least three aspects, and use at least six different similarity/contrast markers.",
              image: "food-stall",
              minWords: 260,
              maxWords: 380,
              tips: ["Introduction + thesis", "Aspect 1: … whereas … / Unlike …", "Aspect 2: Similarly, … / Both …", "Aspect 3: In contrast, … / On the other hand, …", "Conclusion: Despite …, both …"],
              models: [{ label: "Example", text: "Traditional Markets and Supermarkets\nIn Indonesian cities, families can buy their daily food at traditional markets or at modern supermarkets. Although both sell similar products, the shopping experience is very different.\nThe first difference is price. At a traditional market, prices are not fixed, so buyers can bargain with sellers. In contrast, supermarket prices are printed on labels and cannot be changed, although there are often discounts.\nFreshness and choice are also different. Vegetables and fish at traditional markets usually come straight from farmers and fishermen in the morning. Supermarkets, on the other hand, offer imported products and frozen food, which are convenient but often less fresh.\nThe atmosphere is another contrast. Traditional markets are noisy and lively, and sellers often know their regular customers by name. Supermarkets are quiet, air-conditioned and organised, whereas personal relationships are rare.\nNevertheless, the two places have something in common. Both play an important role in feeding the city, and both are adapting to modern life: many market sellers now accept QRIS payments, and supermarkets are starting to sell local products from small farmers.\nIn conclusion, traditional markets offer freshness and community, while supermarkets offer comfort and convenience. Both are part of Indonesian daily life." }],
              rubric: ["My introduction presents both topics and a thesis.", "I used the point-by-point method with at least three aspects.", "I used at least six different similarity/contrast markers correctly.", "I gave specific examples.", "My conclusion summarises without adding new points."],
            }),
            speaking({
              id: "sma11-c8-l3-say",
              title: "Food culture talk",
              prompt: "Give a short talk comparing two dishes from different regions or countries (for example, soto and ramen, or rendang and curry). Mention ingredients, cooking, eating customs and meaning.",
              image: "soup",
              prepSeconds: 60,
              seconds: 90,
              tips: ["Today I'll compare … and …", "Both … and … are …", "However, …, whereas …", "Unlike …, …", "Similarly, …", "What I find interesting is …"],
              models: [{ label: "Example", text: "Today I'll compare soto from Indonesia and ramen from Japan. Both are noodle or rice soups that people eat to feel warm and comfortable. However, soto is usually lighter and yellow from turmeric, whereas ramen has a rich, heavy broth. Unlike ramen, soto is often eaten with rice and served with lime and sambal. Similarly, both dishes have many regional versions: there are dozens of sotos in Indonesia, and every Japanese city has its own ramen style. What I find interesting is that both started as cheap food for workers and are now national symbols." }],
              rubric: ["I compared at least three aspects.", "I used similarity and contrast markers.", "I gave specific details.", "I spoke clearly and fluently."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sma11-c8-l3-c1", "In a Venn diagram, where do you write similarities?", ["in the overlapping middle", "outside both circles", "in the title"], 0, "Bagian tengah."),
        pick("sma11-c8-l3-c2", "In the model essay, what is one similarity between markets and supermarkets?", ["Both are adapting to modern life.", "Both have fixed prices.", "Both are noisy."], 0, "Persamaan."),
        arrange("sma11-c8-l3-c3", "Put the words in order.", "Unlike supermarkets traditional markets allow bargaining", "Unlike + noun."),
        fill("sma11-c8-l3-c4", "Complete: ___, both dishes are served at weddings. (Demikian pula)", "", ", both dishes are served at weddings.", ["Similarly", "Likewise"], "Similarly/Likewise.", { translate: true }),
        trPick("sma11-c8-l3-c5", "“Menawar harga” in English is…", ["to bargain", "to borrow", "to bake"], 0, "Bargain."),
        pick("sma11-c8-l3-c6", "Why is the point-by-point method often easier for readers?", ["They can compare both topics on the same aspect at once.", "It is shorter.", "It has no conclusion."], 0, "Perbandingan langsung.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sma11-c8-post",
    title: "Chapter 8 Posttest",
    passPercent: 70,
    passages: [FOOD],
    questions: [
      pick("sma11-c8-post1", "Japanese meals are often light, ___ Padang meals are rich and spicy.", ["whereas", "similarly", "likewise", "both"], 0, "Kontras."),
      listen("sma11-c8-post2", voice("Neither the Dutch nor the Germans traditionally eat rice every day."), "Listen. Who eats rice every day traditionally?", ["neither of them", "both of them", "only the Dutch", "only the Germans"], 0, "Neither … nor."),
      trPick("sma11-c8-post3", "“Sebaliknya” (contrast connector) in English is…", ["In contrast", "In addition", "In conclusion", "In fact"], 0, "In contrast."),
      pick("sma11-c8-post4", "Which marker introduces a SIMILARITY?", ["Likewise", "Whereas", "Unlike", "However"], 0, "Likewise."),
      arrange("sma11-c8-post5", "Put the words in order.", "Both rice and bread are made from grains", "Both … and."),
      pick("sma11-c8-post6", "How are European meals usually served, according to the text?", ["on individual plates", "from common dishes", "on banana leaves", "in one big pot"], 0, "Baris 4.", { passageId: FOOD.id }),
      match("sma11-c8-post7", "Match the marker and its function.", [["whereas", "contrast between two clauses"], ["similarly", "similarity"], ["nevertheless", "concession"], ["unlike", "contrast before a noun"]], "Fungsi penanda."),
      fill("sma11-c8-post8", "Complete.", "Tumpeng, a cone of yellow rice, is served at Indonesian celebrations to express", ".", ["gratitude"], "Baris 5.", { passageId: FOOD.id }),
      pick("sma11-c8-post9", "Which method of organisation does the writer use?", ["point-by-point", "block method", "chronological order", "problem-solution"], 0, "Per aspek.", { passageId: FOOD.id, hots: true }),
      pick("sma11-c8-post10", "What evidence shows that the two cultures are “coming closer”?", ["Bakeries are popular in Indonesia and fried rice is on menus in Europe.", "Both use knives.", "Both eat tumpeng.", "Both have the same climate."], 0, "Baris 6.", { passageId: FOOD.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Food Fusion",
    questions: [
      live("sma11-c8-live1", "Contrast in one sentence:", ["whereas", "likewise", "similarly", "both"], 0, "rice"),
      live("sma11-c8-live2", "Similarity between sentences:", ["Likewise", "However", "In contrast", "Whereas"], 0, "bread"),
      live("sma11-c8-live3", "Neither A ___ B", ["nor", "or", "and", "but"], 0, "question"),
      live("sma11-c8-live4", "“Makanan pokok” =", ["staple food", "stable food", "main sauce", "side dish"], 0, "rice", true),
      live("sma11-c8-live5", "Tumpeng is a cone of…", ["yellow rice", "bread", "noodles", "corn"], 0, "ketupat"),
      live("sma11-c8-live6", "Same aspect in each paragraph:", ["point-by-point", "block", "random", "story"], 0, "report"),
      live("sma11-c8-live7", "Unlike ___, rice is steamed.", ["bread", "rice", "steam", "pot"], 0, "bowl"),
      live("sma11-c8-live8", "To negotiate a price:", ["bargain", "borrow", "bake", "bounce"], 0, "money"),
    ],
  },
};
