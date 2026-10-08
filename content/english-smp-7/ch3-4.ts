import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 7 (SMP, Fase D). Chapter 3 — Culinary and Me · Chapter 4 — Home Sweet Home

const RENDANG: Passage = {
  id: "smp7-c3-rendang",
  title: "Rendang: A Taste of West Sumatra",
  pic: "drumstick",
  lines: [
    "Rendang is a traditional dish from West Sumatra. Many people around the world love it.",
    "It is made from beef, coconut milk and a mix of spices such as chili, ginger, garlic, shallots and lemongrass.",
    "Cooking rendang takes a long time. The cook stirs the beef in coconut milk for four to eight hours until it becomes dark brown and dry.",
    "Because it is cooked slowly, the meat is very tender and full of flavour.",
    "Rendang tastes spicy, savoury and a little bit sweet. It smells wonderful!",
    "In Minangkabau culture, rendang is served at weddings, Eid celebrations and other special ceremonies.",
    "Dry rendang can last for weeks without a fridge, so people used to bring it on long journeys.",
    "If you visit Padang, don't forget to try it with hot rice and cassava leaves!",
  ],
};

export const CH3: Level = {
  id: "smp7-ch3",
  title: "Chapter 3 — Culinary and Me",
  description: "Name foods and tastes, use countable and uncountable nouns with some/any/much/many, order food politely and describe a traditional dish.",
  targetScore: "Vocabulary · Structure · Reading",
  cover: ["rice", "soup", "chili"],
  pretest: {
    id: "smp7-c3-pre",
    title: "Chapter 3 Pretest",
    passPercent: 0,
    questions: [
      pick("smp7-c3-pre1", "Chili tastes…", ["spicy", "sweet", "sour", "salty"], 0, "Cabai = pedas (spicy).", { image: "chili" }),
      listen("smp7-c3-pre2", voice("Can I have a glass of iced tea, please?"), "Listen. What does she want?", ["a glass of iced tea", "a cup of coffee", "a bottle of water", "a bowl of soup"], 0, "A glass of iced tea."),
      trPick("smp7-c3-pre3", "“Gurih” (taste) in English is…", ["savoury", "bitter", "sour", "bland"], 0, "Gurih = savoury."),
      pick("smp7-c3-pre4", "How ___ sugar do you need?", ["much", "many", "lot", "any"], 0, "Sugar tak terhitung → much."),
      pick("smp7-c3-pre5", "There are ___ eggs in the fridge.", ["some", "much", "a", "an"], 0, "Eggs jamak → some."),
    ],
  },
  lessons: [
    {
      id: "smp7-c3-l1",
      skill: "vocabulary",
      title: "Food, Tastes and Cooking Methods",
      summary: "Indonesian dishes, taste adjectives and how food is cooked.",
      sections: [
        {
          title: "How does it taste?",
          blocks: [
            vocab([
              ["spicy", "pedas", "chili", "Sambal is very spicy."],
              ["sweet", "manis", "candy", "Klepon is sweet."],
              ["sour", "asam", "lemon", "Lemons are sour."],
              ["salty", "asin", "salt", "Salted fish is salty."],
              ["bitter", "pahit", "coffee", "Black coffee is bitter."],
              ["savoury", "gurih", "soup", "Soto is savoury."],
            ], "Tastes"),
            text("Kata lain untuk mendeskripsikan makanan: **crispy** (renyah), **tender** (empuk), **chewy** (kenyal), **juicy** (berair), **bland** (hambar), **delicious / tasty** (enak)."),
          ],
        },
        {
          title: "Cooking methods",
          blocks: [
            table(["Method", "Meaning", "Indonesian example"], [["fried", "digoreng", "fried rice, fried chicken"], ["grilled", "dibakar/dipanggang", "satay, grilled fish"], ["boiled", "direbus", "boiled eggs, boiled corn"], ["steamed", "dikukus", "steamed rice cake (kue putu)"], ["stir-fried", "ditumis", "stir-fried water spinach (kangkung)"], ["baked", "dipanggang di oven", "bread, cake"]]),
            pics([["grilled-fish", "grilled fish"], ["egg", "boiled egg"], ["rice", "steamed rice"], ["bread", "baked bread"]]),
            tryIt(pick("smp7-c3-l1-try1", "Satay is ___ over charcoal.", ["grilled", "boiled", "steamed"], 0, "Sate dibakar → grilled.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp7-c3-l1-c1", voice("These crackers are so crispy! I can't stop eating them."), "Listen. How are the crackers?", ["crispy", "chewy", "bitter"], 0, "Crispy = renyah."),
        match("smp7-c3-l1-c2", "Match the food and the taste.", [["pic:lemon|lemon", "sour"], ["pic:candy|candy", "sweet"], ["pic:chili|chili", "spicy"], ["pic:salt|salt", "salty"]], "Rasa makanan."),
        trPick("smp7-c3-l1-c3", "“Dikukus” in English is…", ["steamed", "stirred", "stuffed"], 0, "Dikukus = steamed."),
        fill("smp7-c3-l1-c4", "Complete: This soup has no taste. It's ___ .", "This soup has no taste. It's", ".", ["bland"], "Hambar = bland."),
        pick("smp7-c3-l1-c5", "Which food is usually boiled?", ["eggs for breakfast", "satay", "bread"], 0, "Telur rebus."),
        pick("smp7-c3-l1-c6", "Your friend can't eat spicy food. Which dish is the safest to recommend?", ["chicken soup without chili", "seblak level 5", "sambal matah"], 0, "Pilih yang tidak pedas.", { hots: true }),
      ],
    },
    {
      id: "smp7-c3-l2",
      skill: "structure",
      title: "Countable and Uncountable; Some, Any, Much, Many",
      summary: "Talking about quantities in the kitchen and at the market.",
      sections: [
        {
          title: "Can you count it?",
          blocks: [
            table(["Countable (bisa dihitung)", "Uncountable (tidak bisa dihitung)"], [["an egg, two eggs", "rice, flour, sugar, salt"], ["a tomato, three tomatoes", "water, milk, oil, tea"], ["a spoon, some spoons", "bread, meat, cheese"], ["a cup, two cups", "money, information, advice"]]),
            text("Benda tak terhitung bisa dihitung dengan **wadah/satuan**: *a glass of water, two cups of tea, a kilo of rice, a slice of bread, a spoonful of sugar, a bottle of oil, a packet of noodles*."),
            repeat(["a glass of water", "two cups of tea", "a kilo of rice", "a slice of bread", "a bottle of cooking oil"]),
          ],
        },
        {
          title: "Some, any, much, many, a lot of",
          blocks: [
            table(["Word", "Used with", "Example"], [["some", "positive sentences, offers", "There is some milk. Would you like some tea?"], ["any", "negatives and questions", "There aren't any eggs. Is there any sugar?"], ["many", "countable (questions/negatives)", "How many eggs do we need?"], ["much", "uncountable (questions/negatives)", "How much rice do we have?"], ["a lot of", "both, in positive sentences", "We have a lot of rice and a lot of eggs."]]),
            warn("Uncountable nouns tidak memakai **a/an** dan tidak diberi **-s**: *rices* ❌, *a rice* ❌ → *some rice* ✅, *a plate of rice* ✅."),
            tryIt(pick("smp7-c3-l2-try1", "How ___ tomatoes do you want?", ["many", "much", "any"], 0, "Tomatoes dapat dihitung → many.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp7-c3-l2-c1", say(["woman", "Is there any milk left?"], ["man", "No, there isn't. But there's some juice."]), "Listen. What is left?", ["some juice", "some milk", "nothing"], 0, "There's some juice."),
        pick("smp7-c3-l2-c2", "We don't have ___ bread.", ["any", "some", "many"], 0, "Kalimat negatif → any."),
        pick("smp7-c3-l2-c3", "Which is uncountable?", ["flour", "banana", "plate"], 0, "Tepung tidak dihitung satu per satu."),
        match("smp7-c3-l2-c4", "Match the container and the food.", [["a slice of", "bread"], ["a bottle of", "cooking oil"], ["a bowl of", "soup"], ["a packet of", "noodles"]], "Satuan makanan."),
        trPick("smp7-c3-l2-c5", "“Berapa banyak gula yang kamu perlukan?” in English is…", ["How much sugar do you need?", "How many sugar do you need?", "How many sugars you need?"], 0, "Sugar → how much."),
        pick("smp7-c3-l2-c6", "Find the mistake: “Can I have two rices and a water, please?”", ["It should be “two plates of rice and a glass of water”.", "It should be “two rice and water”.", "There is no mistake."], 0, "Pakai satuan untuk uncountable nouns.", { hots: true }),
      ],
    },
    {
      id: "smp7-c3-l3",
      skill: "reading",
      title: "Reading: Rendang",
      summary: "Read a description of a traditional dish, order food, and describe your favourite dish.",
      passages: [RENDANG],
      sections: [
        {
          title: "A famous dish",
          blocks: [
            { type: "passage", passage: RENDANG },
            audio("Listen and read", say(["woman", RENDANG.lines.join(" ")])),
            vocab([["spices", "bumbu/rempah", "chili"], ["tender", "empuk", "drumstick"], ["served", "disajikan", "lunch"], ["journey", "perjalanan", "suitcase"]], "Words from the text"),
            tryIt(pick("smp7-c3-l3-try1", "Where does rendang come from?", ["West Sumatra", "Central Java", "Bali"], 0, "Baris 1.", { passageId: RENDANG.id })),
          ],
        },
        {
          title: "At the restaurant",
          blocks: [
            audio("Ordering food", say(["man", "Good evening. Are you ready to order?"], ["woman", "Yes, please. I'd like rendang with rice and a bowl of soto, please."], ["man", "Would you like anything to drink?"], ["woman", "A glass of avocado juice, please. Is the soto spicy?"], ["man", "No, it isn't, but we can give you some sambal."], ["woman", "Great, thank you. Could I have the bill after that?"])),
            table(["Waiter", "Customer"], [["Are you ready to order?", "I'd like … , please."], ["Would you like anything to drink?", "Could I have … , please?"], ["Anything else?", "No, thank you. That's all."], ["Here's your bill.", "Can I pay by card / QRIS?"]]),
            writing({
              id: "smp7-c3-l3-write",
              title: "My favourite dish",
              prompt: "Describe a traditional dish from your region: what it is, the ingredients, how it is cooked, how it tastes and when people eat it.",
              image: "food-stall",
              minWords: 100,
              maxWords: 200,
              tips: ["… is a traditional dish from …", "It is made from …", "It is fried / grilled / boiled …", "It tastes … and it smells …", "People usually eat it …", "If you visit …, you should try it!"],
              models: [{ label: "Example", text: "Pempek is a traditional dish from Palembang, South Sumatra. It is a kind of fish cake. It is made from fish, sago flour, water and salt. First, the dough is shaped into different forms, such as the big “kapal selam” with an egg inside. Then, it is boiled and fried until it is golden and a little crispy. Pempek is chewy and savoury. People eat it with a dark sauce called cuko, which tastes sweet, sour and spicy at the same time. People in Palembang eat pempek for breakfast, lunch or as a snack. If you visit Palembang, you should try it!" }],
              rubric: ["I said where the dish comes from.", "I listed the main ingredients.", "I explained how it is cooked.", "I used at least three taste/texture adjectives.", "I said when people eat it."],
            }),
          ],
        },
      ],
      checkpoint: [
        pickMany("smp7-c3-l3-c1", "Choose ALL the ingredients of rendang.", ["beef", "coconut milk", "ginger", "chocolate"], [0, 1, 2], "Baris 2.", { passageId: RENDANG.id }),
        pick("smp7-c3-l3-c2", "How long does it take to cook rendang?", ["four to eight hours", "thirty minutes", "two days"], 0, "Baris 3.", { passageId: RENDANG.id }),
        fill("smp7-c3-l3-c3", "Complete.", "Because it is cooked slowly, the meat is very", "and full of flavour.", ["tender"], "Baris 4.", { passageId: RENDANG.id }),
        pick("smp7-c3-l3-c4", "When is rendang served in Minangkabau culture?", ["at weddings and special ceremonies", "only for breakfast", "only in restaurants"], 0, "Baris 6.", { passageId: RENDANG.id }),
        pick("smp7-c3-l3-c5", "Why did people bring rendang on long journeys?", ["Dry rendang can last for weeks without a fridge.", "It is light.", "It is cheap."], 0, "Baris 7.", { passageId: RENDANG.id, hots: true }),
        pick("smp7-c3-l3-c6", "In the restaurant dialogue, why does the woman ask “Is the soto spicy?”", ["She wants to know before she eats it.", "She wants to cook it.", "She wants to pay."], 0, "Menanyakan rasa sebelum memesan.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp7-c3-post",
    title: "Chapter 3 Posttest",
    passPercent: 70,
    passages: [RENDANG],
    questions: [
      pick("smp7-c3-post1", "Black coffee without sugar tastes…", ["bitter", "sweet", "salty", "sour"], 0, "Kopi pahit = bitter."),
      listen("smp7-c3-post2", say(["man", "Anything else?"], ["woman", "No, thank you. That's all."]), "Listen. What does the woman mean?", ["She doesn't want to order more.", "She wants more food.", "She wants the menu."], 0, "That's all = sudah cukup."),
      trPick("smp7-c3-post3", "“Sebungkus mi” in English is…", ["a packet of noodles", "a glass of noodles", "a noodles", "a slice of noodles"], 0, "Bungkus = packet."),
      pick("smp7-c3-post4", "How ___ water do you drink every day?", ["much", "many", "lot", "few"], 0, "Water → much."),
      arrange("smp7-c3-post5", "Put the words in order.", "Could I have a glass of water please", "Permintaan sopan."),
      pick("smp7-c3-post6", "How does rendang taste?", ["spicy, savoury and a little sweet", "sour and bitter", "bland", "very salty"], 0, "Baris 5.", { passageId: RENDANG.id }),
      match("smp7-c3-post7", "Match the dish and the cooking method.", [["satay", "grilled"], ["boiled corn", "boiled"], ["kue putu", "steamed"], ["fried rice", "fried"]], "Cara memasak."),
      fill("smp7-c3-post8", "Complete: There isn't ___ salt in this soup.", "There isn't", "salt in this soup.", ["any"], "Negatif → any."),
      pick("smp7-c3-post9", "What is the writer's purpose in the last line?", ["to recommend rendang to visitors", "to explain the recipe", "to warn people about spicy food", "to sell rice"], 0, "Ajakan mencoba.", { passageId: RENDANG.id, hots: true }),
      pick("smp7-c3-post10", "Mom: “We need eggs, flour and milk for the cake.” You check: 2 eggs, no flour, a lot of milk. What do you say?", ["We have some eggs and milk, but we don't have any flour.", "We have any flour.", "We don't have some eggs.", "We have much eggs."], 0, "Some untuk positif, any untuk negatif.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Yummy Quiz",
    questions: [
      live("smp7-c3-live1", "Lemons are…", ["sour", "sweet", "salty", "bitter"], 0, "lemon"),
      live("smp7-c3-live2", "How ___ eggs?", ["many", "much", "lot", "any"], 0, "egg"),
      live("smp7-c3-live3", "Uncountable:", ["rice", "apple", "spoon", "egg"], 0, "rice"),
      live("smp7-c3-live4", "“Dibakar” (satay) =", ["grilled", "boiled", "steamed", "baked"], 0, "grilled-fish", true),
      live("smp7-c3-live5", "a ___ of bread", ["slice", "glass", "bottle", "bowl"], 0, "bread"),
      live("smp7-c3-live6", "Rendang is from…", ["West Sumatra", "Bali", "Papua", "Java"], 0, "drumstick"),
      live("smp7-c3-live7", "Is there ___ milk?", ["any", "many", "a", "an"], 0, "milk"),
      live("smp7-c3-live8", "Ordering politely:", ["I'd like soto, please.", "Give soto!", "Soto now.", "You soto."], 0, "soup"),
    ],
  },
};

const HOUSE: Passage = {
  id: "smp7-c4-house",
  title: "Our Traditional House",
  pic: "house",
  lines: [
    "My family lives in a joglo, a traditional Javanese house in a village near Yogyakarta.",
    "The house is about seventy years old. My great-grandfather built it with teak wood.",
    "At the front, there is a large open hall called a pendopo. There are no walls, only four big wooden pillars in the middle.",
    "We use the pendopo to welcome guests and for family meetings. In the evening, my grandfather sometimes plays the gamelan there.",
    "Behind the pendopo, there is a living room, three bedrooms and a prayer room.",
    "The kitchen is at the back of the house. It is next to a small garden with banana trees and chili plants.",
    "The roof is high and shaped like a mountain, so the house is cool even on a hot afternoon.",
    "Our house is not modern, but it is comfortable, and I love it very much.",
  ],
};

export const CH4: Level = {
  id: "smp7-ch4",
  title: "Chapter 4 — Home Sweet Home",
  description: "Name rooms and furniture, use there is / there are and prepositions of place, give a house tour and describe a house.",
  targetScore: "Vocabulary · Structure · Writing",
  cover: ["house", "sofa", "bed"],
  pretest: {
    id: "smp7-c4-pre",
    title: "Chapter 4 Pretest",
    passPercent: 0,
    questions: [
      pick("smp7-c4-pre1", "We cook in the…", ["kitchen", "bedroom", "garage", "bathroom"], 0, "Memasak di dapur.", { image: "stove" }),
      listen("smp7-c4-pre2", voice("The remote control is under the sofa."), "Listen. Where is the remote control?", ["under the sofa", "on the TV", "in the kitchen", "next to the bed"], 0, "Under the sofa."),
      trPick("smp7-c4-pre3", "“Lemari pakaian” in English is…", ["wardrobe", "bookshelf", "cupboard for plates", "drawer"], 0, "Lemari pakaian = wardrobe."),
      pick("smp7-c4-pre4", "There ___ two bedrooms in my house.", ["are", "is", "am", "be"], 0, "Jamak → there are."),
      pick("smp7-c4-pre5", "The cat is ___ the box.", ["in", "at", "of", "to"], 0, "Di dalam kotak → in.", { image: "in" }),
    ],
  },
  lessons: [
    {
      id: "smp7-c4-l1",
      skill: "vocabulary",
      title: "Rooms and Furniture",
      summary: "Parts of a house, furniture and household objects.",
      sections: [
        {
          title: "Rooms",
          blocks: [
            table(["Room", "Meaning", "What we do there"], [["living room", "ruang keluarga", "relax, watch TV, talk"], ["bedroom", "kamar tidur", "sleep, study, get dressed"], ["kitchen", "dapur", "cook, wash the dishes"], ["dining room", "ruang makan", "eat meals together"], ["bathroom", "kamar mandi", "take a shower, brush teeth"], ["terrace / porch", "teras", "sit and chat, welcome guests"], ["garage", "garasi", "park the car or motorbike"], ["yard / garden", "halaman / kebun", "play, plant flowers"]]),
            pics([["sofa", "living room"], ["bed", "bedroom"], ["stove", "kitchen"], ["bathtub", "bathroom"]]),
          ],
        },
        {
          title: "Furniture and things",
          blocks: [
            vocab([
              ["sofa", "sofa", "sofa"],
              ["bed", "tempat tidur", "bed"],
              ["desk", "meja belajar", "desk"],
              ["stove", "kompor", "stove"],
              ["door", "pintu", "door"],
              ["window", "jendela", "window"],
            ], "In the house"),
            table(["Word", "Meaning"], [["wardrobe", "lemari pakaian"], ["bookshelf", "rak buku"], ["cupboard", "lemari (dapur)"], ["mirror", "cermin"], ["carpet / rug", "karpet"], ["curtain", "gorden"], ["fan / air conditioner", "kipas / AC"], ["fridge", "kulkas"], ["sink", "wastafel/bak cuci"]]),
            tryIt(pick("smp7-c4-l1-try1", "You keep food cold in the…", ["fridge", "wardrobe", "sink"], 0, "Kulkas = fridge.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp7-c4-l1-c1", voice("My mother is washing the dishes in the sink."), "Listen. Which room is she probably in?", ["the kitchen", "the bedroom", "the garage"], 0, "Mencuci piring di dapur."),
        match("smp7-c4-l1-c2", "Match the thing and the room.", [["pic:bed|bed", "bedroom"], ["pic:stove|stove", "kitchen"], ["pic:bathtub|bathtub", "bathroom"], ["pic:sofa|sofa", "living room"]], "Benda dan ruangannya."),
        trPick("smp7-c4-l1-c3", "“Cermin” in English is…", ["mirror", "window", "curtain"], 0, "Cermin = mirror."),
        fill("smp7-c4-l1-c4", "Complete: I put my books on the ___ .", "I put my books on the", ".", ["bookshelf", "shelf", "desk"], "Rak buku / meja."),
        pick("smp7-c4-l1-c5", "Where do you usually park a motorbike?", ["in the garage", "in the bedroom", "in the bathroom"], 0, "Garasi."),
        pick("smp7-c4-l1-c6", "Your room is very hot and the fan is broken. What is the best thing to do first?", ["Open the window and the curtain.", "Close the door and the window.", "Turn on the stove."], 0, "Buka jendela agar udara masuk.", { hots: true }),
      ],
    },
    {
      id: "smp7-c4-l2",
      skill: "structure",
      title: "There Is / There Are and Prepositions",
      summary: "Saying what is in a room and where things are.",
      sections: [
        {
          title: "There is / there are",
          blocks: [
            table(["", "Singular / uncountable", "Plural"], [["Positive", "There is a sofa. There is some water.", "There are two windows."], ["Negative", "There isn't a TV.", "There aren't any chairs."], ["Question", "Is there a mirror?", "Are there any plants?"], ["Short answer", "Yes, there is. / No, there isn't.", "Yes, there are. / No, there aren't."]]),
            examples([{ wrong: "In my room have a desk.", right: "There is a desk in my room.", note: "“Ada” = there is/are, bukan have." }, { wrong: "There is three chairs.", right: "There are three chairs." }], "Common mistakes"),
          ],
        },
        {
          title: "Where is it?",
          blocks: [
            table(["Preposition", "Meaning", "Example"], [["in", "di dalam", "The clothes are in the wardrobe."], ["on", "di atas (menempel)", "The clock is on the wall."], ["under", "di bawah", "The slippers are under the bed."], ["next to / beside", "di sebelah", "The lamp is next to the bed."], ["between", "di antara", "The desk is between the bed and the window."], ["in front of", "di depan", "The car is in front of the house."], ["behind", "di belakang", "The garden is behind the kitchen."], ["above", "di atas (tidak menempel)", "The fan is above the bed."], ["opposite", "berhadapan", "The bathroom is opposite my room."]]),
            pics([["in", "in"], ["on", "on"], ["under", "under"], ["next-to", "next to"]]),
            tryIt(pick("smp7-c4-l2-try1", "The desk is ___ the bed and the wardrobe.", ["between", "under", "in"], 0, "Di antara dua benda → between.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp7-c4-l2-c1", voice("There are three bedrooms upstairs and one bathroom downstairs."), "Listen. How many bedrooms are there?", ["three", "one", "four"], 0, "There are three bedrooms."),
        pick("smp7-c4-l2-c2", "___ there any plants in your room?", ["Are", "Is", "Do"], 0, "Plants jamak → Are there."),
        fill("smp7-c4-l2-c3", "Complete: There ___ a big mirror in the bathroom.", "There", "a big mirror in the bathroom.", ["is", "'s"], "Tunggal → there is."),
        arrange("smp7-c4-l2-c4", "Put the words in order.", "The lamp is next to the bed", "Next to = di sebelah."),
        trPick("smp7-c4-l2-c5", "“Ada sebuah taman di belakang rumah.” in English is…", ["There is a garden behind the house.", "There are a garden behind the house.", "The house have a garden behind."], 0, "There is + behind."),
        pick("smp7-c4-l2-c6", "A: The kitchen is to the left of the dining room. B: The bathroom is to the right of the dining room. What is between the kitchen and the bathroom?", ["the dining room", "the garage", "the bedroom"], 0, "Ruang makan ada di tengah.", { hots: true }),
      ],
    },
    {
      id: "smp7-c4-l3",
      skill: "reading",
      title: "Reading: Our Traditional House",
      summary: "Read about a joglo, give a house tour and write about your home.",
      passages: [HOUSE],
      sections: [
        {
          title: "A joglo",
          blocks: [
            { type: "passage", passage: HOUSE },
            audio("Listen and read", say(["man", HOUSE.lines.join(" ")])),
            vocab([["pillar", "tiang", "house"], ["teak wood", "kayu jati", "tree"], ["prayer room", "musala/ruang ibadah", "house"], ["comfortable", "nyaman", "sofa"]], "Words from the text"),
          ],
        },
        {
          title: "Give a house tour",
          blocks: [
            speaking({
              id: "smp7-c4-l3-say",
              title: "Welcome to my house!",
              prompt: "Imagine a new friend is visiting your house. Give a short tour: say which rooms there are, where they are, and what is in your bedroom.",
              image: "door",
              seconds: 90,
              tips: ["Welcome to my house! Come in.", "This is the living room. There is …", "The kitchen is behind / next to …", "Let me show you my bedroom. There's … next to …"],
              models: [{ label: "Example", text: "Welcome to my house! Please come in. This is our living room. There is a big sofa and a TV, and there are some family photos on the wall. The kitchen is behind the living room, next to the dining room. Upstairs, there are two bedrooms and a bathroom. Let me show you my bedroom. It's small but tidy. My bed is next to the window, and my desk is opposite the bed. There's a bookshelf above my desk with all my comics. Do you want to see my cat? She is sleeping under the bed!" }],
              rubric: ["I used there is / there are correctly.", "I used at least four prepositions of place.", "I named at least five rooms or furniture items.", "I sounded welcoming."],
            }),
            writing({
              id: "smp7-c4-l3-write",
              title: "My house",
              prompt: "Write a descriptive text about your house or your dream house. Describe its location, the rooms, your favourite room and why you like it.",
              image: "house",
              minWords: 100,
              maxWords: 200,
              tips: ["Identification: I live in … It is located …", "Description: There is/are … The … is next to …", "My favourite room is … because …", "Closing: …"],
              models: [{ label: "Example", text: "I live in a small two-storey house in a housing complex in Bekasi. It is painted light green and there is a mango tree in front of it. On the ground floor, there is a living room, a kitchen, a bathroom and a small garage for our motorbike. Upstairs, there are two bedrooms and a balcony. My favourite place is the balcony because it is next to the mango tree. In the afternoon, I sit there, read comics and feel the cool wind. Our house is not big, but it is always full of laughter." }],
              rubric: ["I said where the house is.", "I described the rooms with there is/are.", "I used prepositions of place.", "I described my favourite room and gave a reason."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("smp7-c4-l3-c1", "How old is the house?", ["about seventy years old", "about seven years old", "about a hundred years old"], 0, "Baris 2.", { passageId: HOUSE.id }),
        pick("smp7-c4-l3-c2", "What is special about the pendopo?", ["It has no walls.", "It has no roof.", "It is upstairs."], 0, "Baris 3.", { passageId: HOUSE.id }),
        fill("smp7-c4-l3-c3", "Complete.", "The kitchen is at the", "of the house.", ["back"], "Baris 6.", { passageId: HOUSE.id }),
        pickMany("smp7-c4-l3-c4", "Choose ALL the rooms behind the pendopo.", ["a living room", "three bedrooms", "a prayer room", "a garage"], [0, 1, 2], "Baris 5.", { passageId: HOUSE.id }),
        pick("smp7-c4-l3-c5", "Why is the house cool even on a hot afternoon?", ["The roof is high.", "It has many fans.", "It is near a lake."], 0, "Baris 7.", { passageId: HOUSE.id, hots: true }),
        pick("smp7-c4-l3-c6", "What can we infer about the writer's family?", ["They respect their traditions.", "They want to sell the house.", "They don't have guests."], 0, "Menjaga rumah adat dan gamelan.", { passageId: HOUSE.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp7-c4-post",
    title: "Chapter 4 Posttest",
    passPercent: 70,
    passages: [HOUSE],
    questions: [
      pick("smp7-c4-post1", "There ___ some books on the desk.", ["are", "is", "am", "be"], 0, "Books jamak → are."),
      listen("smp7-c4-post2", voice("Your shoes are in front of the door, next to the umbrella."), "Listen. Where are the shoes?", ["in front of the door", "under the bed", "in the wardrobe", "behind the door"], 0, "In front of the door."),
      trPick("smp7-c4-post3", "“Kulkas” in English is…", ["fridge", "fan", "sink", "stove"], 0, "Kulkas = fridge."),
      pick("smp7-c4-post4", "Is there a garage? — No, there ___ .", ["isn't", "aren't", "doesn't", "not"], 0, "Is there → there isn't."),
      arrange("smp7-c4-post5", "Put the words in order.", "There are two windows in my bedroom", "There are + jamak."),
      pick("smp7-c4-post6", "What does the grandfather sometimes do in the pendopo?", ["plays the gamelan", "cooks dinner", "sleeps", "watches TV"], 0, "Baris 4.", { passageId: HOUSE.id }),
      match("smp7-c4-post7", "Match.", [["above", "di atas (tidak menempel)"], ["between", "di antara"], ["opposite", "berhadapan"], ["behind", "di belakang"]], "Preposisi tempat.", { translate: true }),
      fill("smp7-c4-post8", "Complete: The clock is ___ the wall.", "The clock is", "the wall.", ["on"], "Menempel di dinding → on."),
      pick("smp7-c4-post9", "Which sentence about the joglo is TRUE?", ["The garden has banana trees and chili plants.", "The kitchen is in the pendopo.", "The house is made of concrete.", "It has four floors."], 0, "Baris 6.", { passageId: HOUSE.id, hots: true }),
      pick("smp7-c4-post10", "A room has a bed, a wardrobe and a desk. Which room is it most likely?", ["a bedroom", "a kitchen", "a garage", "a bathroom"], 0, "Kamar tidur.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — House Hunt",
    questions: [
      live("smp7-c4-live1", "We sleep in the…", ["bedroom", "kitchen", "garage", "yard"], 0, "bed"),
      live("smp7-c4-live2", "There ___ three chairs.", ["are", "is", "am", "has"], 0, "chair"),
      live("smp7-c4-live3", "“Di antara” =", ["between", "behind", "beside", "below"], 0, "next-to", true),
      live("smp7-c4-live4", "Keeps food cold:", ["fridge", "stove", "sofa", "mirror"], 0, "milk"),
      live("smp7-c4-live5", "The cat is ___ the table.", ["under", "at", "of", "to"], 0, "under"),
      live("smp7-c4-live6", "Joglo is from…", ["Java", "Papua", "Aceh", "Bali"], 0, "house"),
      live("smp7-c4-live7", "Is there a TV? — Yes, there ___.", ["is", "are", "has", "does"], 0, "tv"),
      live("smp7-c4-live8", "Clothes go in the…", ["wardrobe", "sink", "fridge", "garage"], 0, "shirt"),
    ],
  },
};
