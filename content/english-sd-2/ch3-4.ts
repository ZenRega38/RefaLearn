import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trMatch, trPick, tryIt, vocab, voice } from "../kit";

// Grade 2 (Fase A). Chapter 3 — My Clothes · Chapter 4 — The Weather

export const CH3: Level = {
  id: "sd2-ch3",
  title: "Chapter 3 — My Clothes",
  description: "Name clothes, say what you are wearing with colors, and follow instructions: put on your hat.",
  targetScore: "Vocabulary · Speaking",
  cover: ["t-shirt", "dress", "shoes"],
  pretest: {
    id: "sd2-c3-pre",
    title: "Chapter 3 Pretest",
    passPercent: 0,
    questions: [
      listen("sd2-c3-pre1", voice("Hat."), "Listen. Choose the picture.", ["pic:hat", "pic:shoes", "pic:dress", "pic:socks"], 0, "Hat = topi."),
      listen("sd2-c3-pre2", voice("Shoes."), "Listen. Choose the picture.", ["pic:shoes", "pic:shirt", "pic:skirt", "pic:jacket"], 0, "Shoes = sepatu."),
      trPick("sd2-c3-pre3", "“Baju” (kemeja) in English is…", ["shirt", "skirt", "socks", "hat"], 0, "Kemeja = shirt."),
      pick("sd2-c3-pre4", "What is this?", ["a dress", "a hat", "a jacket", "a sock"], 0, "Gaun = dress.", { image: "dress" }),
      pick("sd2-c3-pre5", "We wear socks on our…", ["feet", "hands", "head", "ears"], 0, "Kaus kaki dipakai di kaki.", { image: "socks" }),
    ],
  },
  lessons: [
    {
      id: "sd2-c3-l1",
      skill: "vocabulary",
      title: "Clothes",
      summary: "Shirt, T-shirt, skirt, trousers, dress, hat, shoes, socks, jacket.",
      sections: [
        {
          title: "In my wardrobe",
          blocks: [
            vocab([
              ["shirt", "kemeja", "shirt", "I wear a white shirt to school."],
              ["T-shirt", "kaus", "t-shirt", "My T-shirt is red."],
              ["skirt", "rok", "skirt", "She has a pink skirt."],
              ["trousers", "celana panjang", "trousers", "His trousers are blue."],
              ["dress", "gaun", "dress", "The dress is purple."],
              ["hat", "topi", "hat", "Put on your hat."],
              ["shoes", "sepatu", "shoes", "My shoes are red."],
              ["socks", "kaus kaki", "socks", "My socks are white."],
              ["jacket", "jaket", "jacket", "It's cold. Wear a jacket."],
            ]),
            repeat(["shirt", "T-shirt", "skirt", "trousers", "dress", "hat", "shoes", "socks", "jacket"]),
          ],
        },
        {
          title: "Always two!",
          blocks: [
            text("Beberapa pakaian selalu disebut dengan **s** di belakang karena berpasangan: **shoes**, **socks**, **trousers**. Kita bilang *My shoes **are** red*, bukan *is*."),
            pics([["shoes", "shoes"], ["socks", "socks"], ["trousers", "trousers"]]),
            tryIt(pick("sd2-c3-l1-try1", "My socks ___ white.", ["are", "is", "am"], 0, "Socks jamak → are.", { image: "socks" })),
          ],
        },
      ],
      checkpoint: [
        listen("sd2-c3-l1-c1", voice("Skirt."), "Listen. Choose the picture.", ["pic:skirt", "pic:shirt", "pic:shoes"], 0, "Skirt = rok."),
        pick("sd2-c3-l1-c2", "What is this?", ["a jacket", "a dress", "a hat"], 0, "Jaket = jacket.", { image: "jacket" }),
        match("sd2-c3-l1-c3", "Match.", [["pic:hat", "hat"], ["pic:t-shirt", "T-shirt"], ["pic:trousers", "trousers"], ["pic:socks", "socks"]], "Lengkap!"),
        trPick("sd2-c3-l1-c4", "“Celana panjang” in English is…", ["trousers", "skirt", "shirt"], 0, "Celana panjang = trousers."),
        pick("sd2-c3-l1-c5", "My shoes ___ new.", ["are", "is", "am"], 0, "Shoes jamak → are."),
        pick("sd2-c3-l1-c6", "Which one do we wear on our head?", ["a hat", "socks", "a skirt"], 0, "Topi dipakai di kepala.", { hots: true }),
      ],
    },
    {
      id: "sd2-c3-l2",
      skill: "speaking",
      title: "I Am Wearing…",
      summary: "I'm wearing a red T-shirt and blue trousers.",
      sections: [
        {
          title: "Color + clothes",
          blocks: [
            text("Gabungkan warna dan pakaian. Warna di depan: **a red T-shirt**, **blue trousers**. Untuk bilang yang sedang dipakai: **I'm wearing …**"),
            pics([["t-shirt", "a red T-shirt"], ["trousers", "blue trousers"], ["shoes", "red shoes"]]),
            audio("Beni's clothes", say(["man", "Look at me! I'm wearing a red T-shirt, blue trousers and red shoes."])),
            repeat(["I'm wearing a red T-shirt.", "I'm wearing blue trousers.", "I'm wearing a yellow hat."]),
          ],
        },
        {
          title: "What are you wearing?",
          blocks: [
            tryIt(pickMany("sd2-c3-l2-try1", "What is Beni wearing? Choose ALL.", ["a red T-shirt", "blue trousers", "a purple dress", "red shoes"], [0, 1, 3], "Beni memakai kaus merah, celana biru, dan sepatu merah.")),
            speaking({
              id: "sd2-c3-l2-say",
              title: "My clothes today",
              prompt: "Look at your clothes. Say what you are wearing today, with colors.",
              image: "t-shirt",
              seconds: 30,
              tips: ["I'm wearing a … (color) … (clothes).", "and …"],
              models: [{ label: "Example", text: "Today I'm wearing a white shirt, a red skirt and black shoes." }],
              rubric: ["I said **I'm wearing**.", "I said a color before the clothes.", "I named at least two clothes."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd2-c3-l2-c1", voice("I'm wearing a yellow hat."), "Listen. Choose the picture.", ["pic:hat", "pic:shoes", "pic:dress"], 0, "Yellow hat = topi kuning."),
        arrange("sd2-c3-l2-c2", "Put the words in order.", "I'm wearing a green jacket", "I'm wearing + warna + pakaian."),
        pick("sd2-c3-l2-c3", "Which one is right?", ["a red dress", "a dress red", "red a dress"], 0, "Warna di depan benda."),
        fill("sd2-c3-l2-c4", "Complete: I'm ___ a white shirt.", "I'm", "a white shirt.", ["wearing"], "I'm wearing = aku memakai."),
        trPick("sd2-c3-l2-c5", "“Aku memakai rok merah muda.” in English is…", ["I'm wearing a pink skirt.", "I'm wearing a skirt pink.", "I like a pink skirt."], 0, "Warna di depan: a pink skirt."),
        pick("sd2-c3-l2-c6", "Dina goes to school. What does she wear?", ["a school uniform and shoes", "a jacket in the bathtub", "socks on her hands"], 0, "Ke sekolah memakai seragam dan sepatu.", { hots: true }),
      ],
    },
    {
      id: "sd2-c3-l3",
      skill: "listening",
      title: "Put On, Take Off",
      summary: "Put on your shoes. Take off your hat.",
      sections: [
        {
          title: "Put on / take off",
          blocks: [
            text("**Put on** = memakai (memasang). **Take off** = melepas."),
            table(["Put on", "Take off"], [["Put on your shoes.", "Take off your shoes."], ["Put on your hat.", "Take off your hat."], ["Put on your jacket.", "Take off your jacket."]]),
            audio("Getting ready", say(["woman", "It's time to go! Put on your socks. Put on your shoes. Put on your hat."], ["woman", "We're home! Take off your shoes, please."])),
          ],
        },
        {
          title: "Listen and do",
          blocks: [
            tip("Di Indonesia kita biasa melepas sepatu sebelum masuk rumah: *Take off your shoes, please.*"),
            tryIt(listen("sd2-c3-l3-try1", voice("Put on your jacket."), "Listen. What do you put on?", ["pic:jacket", "pic:hat", "pic:socks"], 0, "Put on your jacket = pakai jaketmu.")),
          ],
        },
      ],
      checkpoint: [
        listen("sd2-c3-l3-c1", voice("Take off your hat."), "Listen. What do you take off?", ["pic:hat", "pic:shoes", "pic:dress"], 0, "Take off your hat = lepas topimu."),
        trMatch("sd2-c3-l3-c2", "Match.", [["put on", "memakai"], ["take off", "melepas"]], "Put on = memakai, take off = melepas."),
        pick("sd2-c3-l3-c3", "You come into the house. Mom says…", ["Take off your shoes, please.", "Put on your shoes, please.", "Put on your jacket."], 0, "Masuk rumah → lepas sepatu."),
        arrange("sd2-c3-l3-c4", "Put the words in order.", "Put on your socks", "Put on + your + pakaian."),
        fill("sd2-c3-l3-c5", "Complete: Put ___ your shoes. (memakai)", "Put", "your shoes.", ["on"], "Put on = memakai.", { translate: true }),
        pick("sd2-c3-l3-c6", "What do you put on FIRST?", ["socks", "shoes", "hat"], 0, "Kaus kaki dipakai sebelum sepatu.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd2-c3-post",
    title: "Chapter 3 Posttest",
    passPercent: 70,
    questions: [
      listen("sd2-c3-post1", voice("Dress."), "Listen. Choose the picture.", ["pic:dress", "pic:skirt", "pic:shirt", "pic:hat"], 0, "Dress = gaun."),
      pick("sd2-c3-post2", "What are these?", ["shoes", "socks", "hats", "dresses"], 0, "Sepatu = shoes.", { image: "shoes" }),
      match("sd2-c3-post3", "Match.", [["pic:shirt", "shirt"], ["pic:skirt", "skirt"], ["pic:jacket", "jacket"], ["pic:hat", "hat"]], "Hebat!"),
      trPick("sd2-c3-post4", "“Kaus kaki” in English is…", ["socks", "shoes", "shirt", "skirt"], 0, "Kaus kaki = socks."),
      pick("sd2-c3-post5", "My trousers ___ blue.", ["are", "is", "am", "be"], 0, "Trousers jamak → are."),
      arrange("sd2-c3-post6", "Put the words in order.", "I'm wearing a blue dress", "I'm wearing + warna + pakaian."),
      listen("sd2-c3-post7", voice("Take off your shoes, please."), "Listen. What do you do?", ["I take off my shoes.", "I put on my hat.", "I go to bed.", "I eat breakfast."], 0, "Take off = melepas."),
      fill("sd2-c3-post8", "Complete: Put on your ___ . It's cold!", "Put on your", ". It's cold!", ["jacket"], "Dingin → pakai jaket.", { image: "cold" }),
      pick("sd2-c3-post9", "It is very hot and sunny. What do you wear?", ["a hat and a T-shirt", "a big jacket", "two jackets", "a winter hat"], 0, "Panas → topi dan kaus.", { hots: true, image: "hot" }),
      pick("sd2-c3-post10", "Which one is NOT clothes?", ["a sofa", "a skirt", "a hat", "socks"], 0, "Sofa adalah perabot, bukan pakaian.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Fashion Show",
    questions: [
      live("sd2-c3-live1", "What is it?", ["a hat", "a shoe", "a sock", "a skirt"], 0, "hat"),
      live("sd2-c3-live2", "What is it?", ["a dress", "a jacket", "a shirt", "a hat"], 0, "dress"),
      live("sd2-c3-live3", "My shoes ___ red.", ["are", "is", "am", "be"], 0, "shoes"),
      live("sd2-c3-live4", "Which one is right?", ["a red T-shirt", "a T-shirt red", "red a T-shirt", "T-shirt a red"], 0, "t-shirt"),
      live("sd2-c3-live5", "Cold! Put on your…", ["jacket", "skirt", "socks only", "hat only"], 0, "cold"),
      live("sd2-c3-live6", "We wear socks on our…", ["feet", "hands", "head", "nose"], 0, "socks"),
      live("sd2-c3-live7", "“Melepas” is…", ["take off", "put on", "wear", "wash"], 0, "shoes", true),
      live("sd2-c3-live8", "What are they?", ["trousers", "a skirt", "a dress", "a hat"], 0, "trousers"),
    ],
  },
};

export const CH4: Level = {
  id: "sd2-ch4",
  title: "Chapter 4 — The Weather",
  description: "Talk about the weather and what to wear or bring: It's rainy. Take your umbrella!",
  targetScore: "Listening · Speaking",
  cover: ["afternoon", "rain", "rainbow"],
  pretest: {
    id: "sd2-c4-pre",
    title: "Chapter 4 Pretest",
    passPercent: 0,
    questions: [
      listen("sd2-c4-pre1", voice("It's rainy."), "Listen. Choose the picture.", ["pic:rain", "pic:afternoon", "pic:windy", "pic:hot"], 0, "Rainy = hujan."),
      listen("sd2-c4-pre2", voice("It's sunny."), "Listen. Choose the picture.", ["pic:afternoon", "pic:rain", "pic:cold", "pic:night"], 0, "Sunny = cerah, bermatahari."),
      trPick("sd2-c4-pre3", "“Payung” in English is…", ["umbrella", "jacket", "hat", "window"], 0, "Payung = umbrella."),
      pick("sd2-c4-pre4", "How's the weather?", ["It's windy.", "It's sunny.", "It's hot."], 0, "Angin bertiup → windy.", { image: "windy" }),
      pick("sd2-c4-pre5", "After the rain, we can see a…", ["rainbow", "star", "kite", "sofa"], 0, "Setelah hujan muncul pelangi = rainbow.", { image: "rainbow" }),
    ],
  },
  lessons: [
    {
      id: "sd2-c4-l1",
      skill: "vocabulary",
      title: "How's the Weather?",
      summary: "Sunny, rainy, cloudy, windy, hot, cold.",
      sections: [
        {
          title: "Weather words",
          blocks: [
            vocab([
              ["sunny", "cerah / bermatahari", "afternoon", "It's sunny today."],
              ["rainy", "hujan", "rain", "It's rainy. Take an umbrella."],
              ["cloudy", "berawan", "cloud", "It's cloudy. Maybe it will rain."],
              ["windy", "berangin", "windy", "It's windy. Let's fly a kite!"],
              ["hot", "panas", "hot", "It's hot. Drink water."],
              ["cold", "dingin", "cold", "It's cold. Wear a jacket."],
            ]),
            repeat(["sunny", "rainy", "cloudy", "windy", "hot", "cold"]),
          ],
        },
        {
          title: "Ask and answer",
          blocks: [
            text("Bertanya cuaca: **How's the weather?** Jawab: **It's sunny.** (*It's* = *It is*)"),
            audio("Weather report", say(["man", "How's the weather today?"], ["woman", "It's sunny and hot!"], ["man", "How's the weather in Bandung?"], ["woman", "It's cloudy and cold."])),
            tip("Indonesia punya dua musim: **the rainy season** (musim hujan) dan **the dry season** (musim kemarau)."),
            tryIt(pick("sd2-c4-l1-try1", "How's the weather?", ["It's cloudy.", "It's sunny.", "It's hot."], 0, "Awan kelabu → cloudy.", { image: "cloud" })),
          ],
        },
      ],
      checkpoint: [
        listen("sd2-c4-l1-c1", voice("It's windy."), "Listen. Choose the picture.", ["pic:windy", "pic:rain", "pic:afternoon"], 0, "Windy = berangin."),
        pick("sd2-c4-l1-c2", "How's the weather?", ["It's hot.", "It's cold.", "It's rainy."], 0, "Matahari terik dan berkeringat → hot.", { image: "hot" }),
        match("sd2-c4-l1-c3", "Match.", [["pic:rain", "rainy"], ["pic:afternoon", "sunny"], ["pic:cold", "cold"], ["pic:windy", "windy"]], "Kamu siap jadi pembawa acara cuaca!"),
        trPick("sd2-c4-l1-c4", "“Berawan” in English is…", ["cloudy", "rainy", "windy"], 0, "Berawan = cloudy."),
        fill("sd2-c4-l1-c5", "Complete: How's the ___ ?", "How's the", "?", ["weather"], "How's the weather? = bagaimana cuacanya?"),
        pick("sd2-c4-l1-c6", "It's windy. What is a good game?", ["fly a kite", "swim in the sea", "sleep in the garden"], 0, "Angin kencang → bermain layang-layang.", { hots: true, image: "kite" }),
      ],
    },
    {
      id: "sd2-c4-l2",
      skill: "listening",
      title: "What Do I Need?",
      summary: "Umbrella, jacket, hat, water; Take your umbrella!",
      sections: [
        {
          title: "Weather and things",
          blocks: [
            table(["Weather", "Take / wear…"], [["rainy ☔", "an umbrella"], ["cold ❄️", "a jacket"], ["sunny / hot ☀️", "a hat and water"], ["windy 🌬️", "a kite!"]]),
            pics([["umbrella", "umbrella"], ["jacket", "jacket"], ["hat", "hat"], ["water", "water"]]),
            audio("Mom says", say(["woman", "It's rainy, Raka. Take your umbrella!"], ["man", "OK, Mom. Thank you!"])),
          ],
        },
        {
          title: "Listen and choose",
          blocks: [
            tryIt(listen("sd2-c4-l2-try1", voice("It's cold today. Wear your jacket."), "Listen. What should Raka wear?", ["pic:jacket", "pic:hat", "pic:umbrella"], 0, "Cold → jacket.")),
            tryIt(pick("sd2-c4-l2-try2", "It's hot. What do you need?", ["water", "a jacket", "an umbrella"], 0, "Panas → minum air.", { image: "hot" })),
          ],
        },
      ],
      checkpoint: [
        listen("sd2-c4-l2-c1", voice("Take your umbrella!"), "Listen. Choose the picture.", ["pic:umbrella", "pic:jacket", "pic:hat"], 0, "Umbrella = payung."),
        pick("sd2-c4-l2-c2", "It's rainy. Take your…", ["umbrella", "kite", "ball"], 0, "Hujan → payung.", { image: "rain" }),
        pick("sd2-c4-l2-c3", "It's cold. Wear your…", ["jacket", "T-shirt only", "hat only"], 0, "Dingin → jaket.", { image: "cold" }),
        trMatch("sd2-c4-l2-c4", "Match.", [["umbrella", "payung"], ["jacket", "jaket"], ["water", "air"]], "Umbrella, jacket, water!"),
        arrange("sd2-c4-l2-c5", "Put the words in order.", "Take your umbrella", "Take your umbrella = bawa payungmu."),
        pick("sd2-c4-l2-c6", "It's sunny AND hot. Choose the best two things.", ["a hat and water", "a jacket and an umbrella", "socks and a jacket"], 0, "Cerah dan panas → topi dan air minum.", { hots: true }),
      ],
    },
    {
      id: "sd2-c4-l3",
      skill: "speaking",
      title: "Weather Reporter",
      summary: "Give a short weather report.",
      sections: [
        {
          title: "Listen to the reporter",
          blocks: [
            pics([["owl-read", "Oli the weather reporter"]]),
            audio("Oli's weather report", say(["woman", "Good morning! Here is the weather. In Jakarta, it's sunny and hot. In Bandung, it's cloudy and cold. In Bogor, it's rainy. Don't forget your umbrella! Have a nice day!"])),
            tryIt(pick("sd2-c4-l3-try1", "How's the weather in Bogor?", ["rainy", "sunny", "windy"], 0, "In Bogor, it's rainy.")),
          ],
        },
        {
          title: "Your report",
          blocks: [
            speaking({
              id: "sd2-c4-l3-say",
              title: "Be a weather reporter",
              prompt: "Look out of the window. Give a weather report for your city.",
              image: "window",
              seconds: 40,
              tips: ["Good morning! Here is the weather.", "In (city), it's …", "Don't forget your …!"],
              models: [{ label: "Example", text: "Good morning! Here is the weather. In Tarakan, it's sunny and hot. Don't forget your hat and water. Have a nice day!" }],
              rubric: ["I greeted the listeners.", "I said the weather with **It's …**.", "I gave advice: **Don't forget your …**"],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd2-c4-l3-c1", "How's the weather in Bandung?", ["cloudy and cold", "sunny and hot", "rainy"], 0, "In Bandung, it's cloudy and cold."),
        fill("sd2-c4-l3-c2", "Complete: Don't forget your ___ ! (rainy)", "Don't forget your", "!", ["umbrella"], "Hujan → umbrella."),
        arrange("sd2-c4-l3-c3", "Put the words in order.", "It's sunny and hot", "It's + cuaca."),
        listen("sd2-c4-l3-c4", voice("In Jakarta, it's sunny and hot."), "Listen. Which city is hot?", ["Jakarta", "Bandung", "Bogor"], 0, "Jakarta: sunny and hot."),
        trPick("sd2-c4-l3-c5", "“Jangan lupa payungmu!” in English is…", ["Don't forget your umbrella!", "Take off your umbrella!", "It's an umbrella."], 0, "Don't forget = jangan lupa."),
        pick("sd2-c4-l3-c6", "The sky is dark and grey. What will happen soon?", ["It will rain.", "It will be sunny.", "It will snow."], 0, "Langit gelap dan kelabu → akan hujan.", { hots: true, image: "cloud" }),
      ],
    },
  ],
  quiz: {
    id: "sd2-c4-post",
    title: "Chapter 4 Posttest",
    passPercent: 70,
    questions: [
      listen("sd2-c4-post1", voice("It's cold."), "Listen. Choose the picture.", ["pic:cold", "pic:hot", "pic:rain", "pic:windy"], 0, "Cold = dingin."),
      pick("sd2-c4-post2", "How's the weather?", ["It's rainy.", "It's sunny.", "It's hot.", "It's windy."], 0, "Hujan → rainy.", { image: "rain" }),
      match("sd2-c4-post3", "Match.", [["pic:afternoon", "sunny"], ["pic:cloud", "cloudy"], ["pic:hot", "hot"], ["pic:rainbow", "rainbow"]], "Pintar!"),
      trPick("sd2-c4-post4", "“Berangin” in English is…", ["windy", "rainy", "sunny", "cloudy"], 0, "Berangin = windy."),
      arrange("sd2-c4-post5", "Put the words in order.", "How's the weather today", "How's the weather today?"),
      listen("sd2-c4-post6", say(["man", "How's the weather?"], ["woman", "It's cloudy."]), "Listen. How's the weather?", ["cloudy", "sunny", "hot", "rainy"], 0, "It's cloudy = berawan."),
      fill("sd2-c4-post7", "Complete: It's hot. Drink some ___ .", "It's hot. Drink some", ".", ["water"], "Panas → minum air."),
      pick("sd2-c4-post8", "It's rainy. Raka takes his…", ["umbrella", "kite", "sunglasses", "ball"], 0, "Hujan → payung."),
      pick("sd2-c4-post9", "Sun + rain at the same time can make a…", ["rainbow", "snowman", "star", "cloud"], 0, "Matahari dan hujan bersamaan membentuk pelangi.", { hots: true }),
      pick("sd2-c4-post10", "Beni wears a jacket and drinks hot tea. How's the weather?", ["cold", "hot", "sunny", "windy"], 0, "Jaket dan teh hangat → cuaca dingin.", { hots: true, image: "tea" }),
    ],
  },
  live: {
    title: "Live Quiz — Weather Watch",
    questions: [
      live("sd2-c4-live1", "How's the weather?", ["rainy", "sunny", "hot", "windy"], 0, "rain"),
      live("sd2-c4-live2", "How's the weather?", ["windy", "cloudy", "cold", "sunny"], 0, "windy"),
      live("sd2-c4-live3", "It's rainy. Take your…", ["umbrella", "kite", "hat", "ball"], 0, "umbrella"),
      live("sd2-c4-live4", "It's cold. Wear a…", ["jacket", "T-shirt", "skirt", "hat"], 0, "cold"),
      live("sd2-c4-live5", "What is it?", ["a rainbow", "a cloud", "a sun", "a kite"], 0, "rainbow"),
      live("sd2-c4-live6", "How's ___ weather?", ["the", "a", "an", "is"], 0, "cloud"),
      live("sd2-c4-live7", "Windy day game:", ["fly a kite", "swim", "sleep", "cook"], 0, "kite"),
      live("sd2-c4-live8", "It's hot. Drink…", ["water", "a jacket", "an umbrella", "socks"], 0, "hot"),
    ],
  },
};
