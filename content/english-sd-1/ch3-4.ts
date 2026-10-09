import "server-only";
import type { Level } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, text, tip, trPick, tryIt, vocab, voice } from "../kit";

// Grade 1 (Fase A). Chapter 3 — Colors and Shapes · Chapter 4 — Numbers and Toys

export const CH3: Level = {
  id: "sd1-ch3",
  title: "Chapter 3 — Colors and Shapes",
  description: "Name eight colors and five shapes, and say what color something is.",
  targetScore: "Listening · Vocabulary",
  cover: ["color-red", "shape-star", "rainbow"],
  pretest: {
    id: "sd1-c3-pre",
    title: "Chapter 3 Pretest",
    passPercent: 0,
    questions: [
      listen("sd1-c3-pre1", voice("Red."), "Listen. Choose the color.", ["pic:color-red", "pic:color-blue", "pic:color-green", "pic:color-yellow"], 0, "Red = merah."),
      listen("sd1-c3-pre2", voice("Circle."), "Listen. Choose the shape.", ["pic:shape-circle", "pic:shape-square", "pic:shape-triangle", "pic:shape-star"], 0, "Circle = lingkaran."),
      trPick("sd1-c3-pre3", "“Kuning” in English is…", ["yellow", "green", "blue", "black"], 0, "Kuning = yellow."),
      pick("sd1-c3-pre4", "What color is the banana?", ["yellow", "blue", "purple", "black"], 0, "Pisang berwarna kuning = yellow.", { image: "banana" }),
      pick("sd1-c3-pre5", "What shape is this?", ["star", "circle", "square", "heart"], 0, "Ini bintang = star.", { image: "shape-star" }),
    ],
  },
  lessons: [
    {
      id: "sd1-c3-l1",
      skill: "vocabulary",
      title: "Colors",
      summary: "Red, blue, yellow, green, orange, purple, black, white, pink.",
      sections: [
        {
          title: "A rainbow of colors",
          blocks: [
            pics([["rainbow", "a rainbow"]]),
            text("Pelangi punya banyak warna. Ketuk setiap warna untuk mendengar namanya, lalu cari benda dengan warna itu di sekitarmu!"),
            vocab([
              ["red", "merah", "color-red", "The apple is red."],
              ["blue", "biru", "color-blue", "The sky is blue."],
              ["yellow", "kuning", "color-yellow", "The banana is yellow."],
              ["green", "hijau", "color-green", "The leaf is green."],
              ["orange", "oranye", "color-orange", "The orange is orange."],
              ["purple", "ungu", "color-purple", "The grapes are purple."],
              ["pink", "merah muda", "color-pink", "The flower is pink."],
              ["black", "hitam", "color-black", "My hair is black."],
              ["white", "putih", "color-white", "The cloud is white."],
            ]),
            repeat(["red", "blue", "yellow", "green", "orange", "purple", "pink", "black", "white"]),
          ],
        },
        {
          title: "What color is it?",
          blocks: [
            audio("Colors with Oli", say(["man", "What color is it?"], ["woman", "It is red!"], ["man", "What color is it?"], ["woman", "It is green!"])),
            text("Bertanya warna: **What color is it?** Jawab: **It is …** (warnanya)."),
            pics([["apple", "red"], ["leaf", "green"], ["banana", "yellow"], ["cloud", "white"]]),
            tryIt(pick("sd1-c3-l1-try1", "What color is the leaf?", ["green", "red", "blue"], 0, "Daun berwarna hijau = green.", { image: "leaf" })),
          ],
        },
      ],
      checkpoint: [
        listen("sd1-c3-l1-c1", voice("Blue."), "Listen. Choose the color.", ["pic:color-blue", "pic:color-red", "pic:color-yellow"], 0, "Blue = biru."),
        pick("sd1-c3-l1-c2", "What color is the apple?", ["red", "blue", "white"], 0, "Apel ini merah = red.", { image: "apple" }),
        match("sd1-c3-l1-c3", "Match the color and the word.", [["pic:color-green", "green"], ["pic:color-purple", "purple"], ["pic:color-orange", "orange"], ["pic:color-pink", "pink"]], "Green, purple, orange, pink!"),
        trPick("sd1-c3-l1-c4", "“Hitam” in English is…", ["black", "white", "blue"], 0, "Hitam = black."),
        fill("sd1-c3-l1-c5", "Complete: The cloud is ___ .", "The cloud is", ".", ["white"], "Awan berwarna putih = white.", { image: "cloud" }),
        pick("sd1-c3-l1-c6", "Red and yellow make…", ["orange", "blue", "black"], 0, "Merah + kuning = oranye (orange). Coba pakai krayon!", { hots: true, image: "crayon" }),
      ],
    },
    {
      id: "sd1-c3-l2",
      skill: "vocabulary",
      title: "Shapes",
      summary: "Circle, square, triangle, rectangle, star, heart.",
      sections: [
        {
          title: "Meet the shapes",
          blocks: [
            vocab([
              ["circle", "lingkaran", "shape-circle", "The ball is a circle."],
              ["square", "persegi", "shape-square", "The block is a square."],
              ["triangle", "segitiga", "shape-triangle", "It has three sides."],
              ["rectangle", "persegi panjang", "shape-rectangle", "The door is a rectangle."],
              ["star", "bintang", "shape-star", "Twinkle, twinkle, little star."],
              ["heart", "hati", "heart", "I love you!"],
            ]),
            repeat(["circle", "square", "triangle", "rectangle", "star", "heart"]),
          ],
        },
        {
          title: "Shapes around me",
          blocks: [
            text("Bentuk ada di mana-mana! Pintu berbentuk **rectangle**, bola berbentuk **circle**, layang-layang punya **triangle**."),
            pics([["door", "rectangle"], ["ball", "circle"], ["blocks", "square"], ["kite", "triangle"]]),
            tryIt(pick("sd1-c3-l2-try1", "What shape is the door?", ["rectangle", "circle", "star"], 0, "Pintu berbentuk persegi panjang = rectangle.", { image: "door" })),
            tip("**Square** semua sisinya sama panjang. **Rectangle** dua sisinya lebih panjang."),
          ],
        },
      ],
      checkpoint: [
        listen("sd1-c3-l2-c1", voice("Triangle."), "Listen. Choose the shape.", ["pic:shape-triangle", "pic:shape-circle", "pic:shape-square"], 0, "Triangle = segitiga."),
        pick("sd1-c3-l2-c2", "What shape is this?", ["square", "circle", "heart"], 0, "Ini persegi = square.", { image: "shape-square" }),
        match("sd1-c3-l2-c3", "Match.", [["pic:shape-circle", "circle"], ["pic:shape-star", "star"], ["pic:heart", "heart"], ["pic:shape-rectangle", "rectangle"]], "Pintar!"),
        trPick("sd1-c3-l2-c4", "“Segitiga” in English is…", ["triangle", "square", "circle"], 0, "Segitiga = triangle."),
        pick("sd1-c3-l2-c5", "A ball is a…", ["circle", "triangle", "square"], 0, "Bola bulat = circle.", { image: "ball" }),
        pick("sd1-c3-l2-c6", "Which shape has THREE sides?", ["triangle", "square", "circle"], 0, "Segitiga punya tiga sisi. Persegi punya empat, lingkaran tidak punya sisi.", { hots: true }),
      ],
    },
    {
      id: "sd1-c3-l3",
      skill: "speaking",
      title: "A Red Circle!",
      summary: "Color + shape: a red circle, a blue star.",
      sections: [
        {
          title: "Color + shape",
          blocks: [
            text("Kita bisa menggabungkan warna dan bentuk. Warna ditulis **di depan**: *a red circle* (lingkaran merah), *a yellow star* (bintang kuning)."),
            pics([["shape-circle", "a red circle"], ["shape-square", "a blue square"], ["shape-triangle", "a green triangle"], ["shape-star", "a yellow star"]]),
            repeat(["a red circle", "a blue square", "a green triangle", "a yellow star", "an orange rectangle"]),
            tip("Sebelum kata yang diawali bunyi vokal (a, e, i, o, u) kita pakai **an**: *an orange rectangle*."),
          ],
        },
        {
          title: "Describe it",
          blocks: [
            tryIt(pick("sd1-c3-l3-try1", "Look. What is it?", ["a green triangle", "a red circle", "a blue star"], 0, "Segitiga hijau = a green triangle.", { image: "shape-triangle" })),
            speaking({
              id: "sd1-c3-l3-say",
              title: "Show and tell",
              prompt: "Find something at home. Say its color and shape. **It is a red circle.**",
              image: "blocks",
              seconds: 20,
              models: [{ label: "Example", text: "Look! It is a blue square. It is a block." }],
              rubric: ["I said the color.", "I said the shape.", "I said “It is a …”."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd1-c3-l3-c1", "Look. What is it?", ["a red circle", "a blue square", "a pink heart"], 0, "Lingkaran merah = a red circle.", { image: "shape-circle" }),
        listen("sd1-c3-l3-c2", voice("A yellow star."), "Listen. Choose the picture.", ["pic:shape-star", "pic:shape-circle", "pic:shape-square"], 0, "Star = bintang, yellow = kuning."),
        arrange("sd1-c3-l3-c3", "Put the words in order.", "It is a blue square", "It is a + warna + bentuk."),
        pick("sd1-c3-l3-c4", "Which one is right?", ["an orange rectangle", "a orange rectangle", "rectangle orange"], 0, "Orange diawali bunyi vokal → an. Warna di depan bentuk."),
        fill("sd1-c3-l3-c5", "Complete: a ___ heart (merah)", "a", "heart", ["red"], "Merah = red.", { translate: true }),
        pickMany("sd1-c3-l3-c6", "Choose ALL the shapes.", ["circle", "green", "star", "square", "blue"], [0, 2, 3], "Circle, star, square = bentuk. Green dan blue = warna.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd1-c3-post",
    title: "Chapter 3 Posttest",
    passPercent: 70,
    questions: [
      listen("sd1-c3-post1", voice("Purple."), "Listen. Choose the color.", ["pic:color-purple", "pic:color-pink", "pic:color-blue", "pic:color-green"], 0, "Purple = ungu."),
      pick("sd1-c3-post2", "What color are the grapes?", ["purple", "yellow", "white", "orange"], 0, "Anggur ini ungu = purple.", { image: "grapes" }),
      pick("sd1-c3-post3", "What shape is this?", ["triangle", "square", "circle", "star"], 0, "Segitiga = triangle.", { image: "shape-triangle" }),
      match("sd1-c3-post4", "Match.", [["pic:color-red", "red"], ["pic:color-yellow", "yellow"], ["pic:color-black", "black"], ["pic:color-white", "white"]], "Bagus!"),
      trPick("sd1-c3-post5", "“Lingkaran” in English is…", ["circle", "square", "star", "heart"], 0, "Lingkaran = circle."),
      arrange("sd1-c3-post6", "Put the words in order.", "What color is it", "What color is it? = Warnanya apa?"),
      listen("sd1-c3-post7", say(["man", "What color is it?"], ["woman", "It is green."]), "Listen. What color is it?", ["green", "red", "blue", "pink"], 0, "It is green = warnanya hijau."),
      fill("sd1-c3-post8", "Complete: The sky is ___ .", "The sky is", ".", ["blue"], "Langit cerah berwarna biru = blue.", { image: "afternoon" }),
      pick("sd1-c3-post9", "I am round. I am red. You can eat me. What am I?", ["an apple", "a banana", "a door", "a star"], 0, "Bulat, merah, bisa dimakan → apel.", { hots: true }),
      pick("sd1-c3-post10", "Which one is NOT a color?", ["circle", "pink", "orange", "white"], 0, "Circle adalah bentuk, bukan warna.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Colors and Shapes",
    questions: [
      live("sd1-c3-live1", "What color is it?", ["red", "blue", "green", "yellow"], 0, "color-red"),
      live("sd1-c3-live2", "What shape is it?", ["star", "circle", "square", "heart"], 0, "shape-star"),
      live("sd1-c3-live3", "What color is the leaf?", ["green", "purple", "black", "pink"], 0, "leaf"),
      live("sd1-c3-live4", "What shape is the door?", ["rectangle", "triangle", "circle", "star"], 0, "door"),
      live("sd1-c3-live5", "Red + yellow = …", ["orange", "blue", "green", "white"], 0, "crayon"),
      live("sd1-c3-live6", "What color is the cloud?", ["white", "black", "red", "orange"], 0, "cloud"),
      live("sd1-c3-live7", "A triangle has ___ sides.", ["three", "four", "two", "five"], 0, "shape-triangle"),
      live("sd1-c3-live8", "Which one is right?", ["an orange star", "a orange star", "star orange", "orange a star"], 0, "shape-star"),
    ],
  },
};

export const CH4: Level = {
  id: "sd1-ch4",
  title: "Chapter 4 — Numbers and Toys",
  description: "Count from one to ten, name toys, and say how many: I have three balls.",
  targetScore: "Listening · Speaking",
  cover: ["num-5", "teddy", "ball"],
  pretest: {
    id: "sd1-c4-pre",
    title: "Chapter 4 Pretest",
    passPercent: 0,
    questions: [
      listen("sd1-c4-pre1", voice("Three."), "Listen. Choose the number.", ["pic:num-3", "pic:num-5", "pic:num-8", "pic:num-1"], 0, "Three = tiga."),
      listen("sd1-c4-pre2", voice("Ball."), "Listen. Choose the toy.", ["pic:ball", "pic:doll", "pic:kite", "pic:robot"], 0, "Ball = bola."),
      trPick("sd1-c4-pre3", "“Sepuluh” in English is…", ["ten", "two", "seven", "one"], 0, "Sepuluh = ten."),
      pick("sd1-c4-pre4", "How many apples?", ["four", "three", "five", "two"], 0, "Ada empat apel = four.", { image: "apple*4" }),
      pick("sd1-c4-pre5", "What is this?", ["a kite", "a car", "a doll", "a ball"], 0, "Ini layang-layang = a kite.", { image: "kite" }),
    ],
  },
  lessons: [
    {
      id: "sd1-c4-l1",
      skill: "vocabulary",
      title: "Numbers 1 to 10",
      summary: "One, two, three… ten.",
      sections: [
        {
          title: "Let's count!",
          blocks: [
            text("Hitung titik-titik di setiap kartu, lalu ketuk untuk mendengar angkanya."),
            vocab([
              ["one", "satu", "num-1"],
              ["two", "dua", "num-2"],
              ["three", "tiga", "num-3"],
              ["four", "empat", "num-4"],
              ["five", "lima", "num-5"],
              ["six", "enam", "num-6"],
              ["seven", "tujuh", "num-7"],
              ["eight", "delapan", "num-8"],
              ["nine", "sembilan", "num-9"],
              ["ten", "sepuluh", "num-10"],
            ]),
            audio("Counting song", say(["woman", "One, two, three, four, five."], ["woman", "Six, seven, eight, nine, ten!"], ["woman", "Let's count again!"])),
          ],
        },
        {
          title: "Count with your fingers",
          blocks: [
            pics([["hand", "one to five"], ["hand*2", "six to ten"]]),
            tip("Hitung benda di rumah dalam bahasa Inggris setiap hari: sendok, kursi, sepatu. Latihan kecil, hasilnya besar!"),
            tryIt(pick("sd1-c4-l1-try1", "How many stars?", ["three", "two", "four"], 0, "Ada tiga bintang = three.", { image: "shape-star*3" })),
          ],
        },
      ],
      checkpoint: [
        listen("sd1-c4-l1-c1", voice("Seven."), "Listen. Choose the number.", ["pic:num-7", "pic:num-1", "pic:num-9"], 0, "Seven = tujuh."),
        pick("sd1-c4-l1-c2", "How many balloons?", ["two", "one", "three"], 0, "Ada dua balon = two.", { image: "balloon" }),
        match("sd1-c4-l1-c3", "Match the number and the word.", [["pic:num-2", "two"], ["pic:num-4", "four"], ["pic:num-6", "six"], ["pic:num-9", "nine"]], "Two, four, six, nine!"),
        trPick("sd1-c4-l1-c4", "“Delapan” in English is…", ["eight", "eleven", "six"], 0, "Delapan = eight."),
        fill("sd1-c4-l1-c5", "What comes next? one, two, three, ___", "one, two, three,", "", ["four"], "Setelah three adalah four."),
        pick("sd1-c4-l1-c6", "Two hands. How many fingers?", ["ten", "five", "two"], 0, "5 + 5 = 10 = ten.", { hots: true, image: "hand*2" }),
      ],
    },
    {
      id: "sd1-c4-l2",
      skill: "vocabulary",
      title: "My Toys",
      summary: "Ball, doll, kite, teddy bear, car, robot, balloon, blocks.",
      sections: [
        {
          title: "Toy box",
          blocks: [
            vocab([
              ["ball", "bola", "ball", "I kick the ball."],
              ["doll", "boneka", "doll", "My doll has a pink dress."],
              ["kite", "layang-layang", "kite", "The kite is in the sky."],
              ["teddy bear", "boneka beruang", "teddy", "I hug my teddy bear."],
              ["car", "mobil", "toy-car", "My car is red."],
              ["robot", "robot", "robot", "The robot can walk."],
              ["balloon", "balon", "balloon", "The balloon is yellow."],
              ["blocks", "balok", "blocks", "I play with blocks."],
            ]),
            repeat(["ball", "doll", "kite", "teddy bear", "car", "robot", "balloon", "blocks"]),
          ],
        },
        {
          title: "What is it?",
          blocks: [
            audio("Guessing game", say(["man", "What is it?"], ["woman", "It is a robot!"], ["man", "What is it?"], ["woman", "It is a kite!"])),
            text("Bertanya benda: **What is it?** Jawab: **It is a …** (Ini adalah …)."),
            tryIt(pick("sd1-c4-l2-try1", "What is it?", ["It is a teddy bear.", "It is a kite.", "It is a car."], 0, "Boneka beruang = teddy bear.", { image: "teddy" })),
          ],
        },
      ],
      checkpoint: [
        listen("sd1-c4-l2-c1", voice("Doll."), "Listen. Choose the toy.", ["pic:doll", "pic:robot", "pic:ball"], 0, "Doll = boneka."),
        pick("sd1-c4-l2-c2", "What is it?", ["a car", "a kite", "a robot"], 0, "Mobil mainan = a car.", { image: "toy-car" }),
        match("sd1-c4-l2-c3", "Match.", [["pic:kite", "kite"], ["pic:robot", "robot"], ["pic:balloon", "balloon"], ["pic:blocks", "blocks"]], "Kamu hafal mainanmu!"),
        trPick("sd1-c4-l2-c4", "“Layang-layang” in English is…", ["kite", "ball", "doll"], 0, "Layang-layang = kite."),
        arrange("sd1-c4-l2-c5", "Put the words in order.", "It is a ball", "It is a + nama benda."),
        pick("sd1-c4-l2-c6", "Which toy can fly in the sky?", ["a kite", "a car", "blocks"], 0, "Layang-layang bisa terbang di langit.", { hots: true }),
      ],
    },
    {
      id: "sd1-c4-l3",
      skill: "speaking",
      title: "How Many?",
      summary: "How many balls? I have three balls.",
      sections: [
        {
          title: "One ball, two balls",
          blocks: [
            text("Kalau bendanya **lebih dari satu**, tambahkan **s**: one ball → two ball**s**, one car → three car**s**."),
            pics([["ball", "one ball"], ["ball*3", "three balls"]]),
            audio("How many?", say(["man", "How many balls?"], ["woman", "Three balls!"], ["man", "How many cars?"], ["woman", "Two cars!"])),
            repeat(["How many balls?", "I have three balls.", "I have one doll."]),
          ],
        },
        {
          title: "My toy box",
          blocks: [
            tryIt(pick("sd1-c4-l3-try1", "How many kites?", ["two kites", "two kite", "one kites"], 0, "Lebih dari satu → kites.", { image: "kite*2" })),
            speaking({
              id: "sd1-c4-l3-say",
              title: "Count your toys",
              prompt: "Count your toys and say: **I have … (number) … (toys).**",
              image: "teddy",
              seconds: 25,
              tips: ["I have two cars.", "I have one teddy bear."],
              models: [{ label: "Example", text: "I have three balls. I have one robot. I have two dolls." }],
              rubric: ["I said a number.", "I said the toy.", "I added **s** for more than one."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd1-c4-l3-c1", "How many cars?", ["three cars", "three car", "two cars"], 0, "Tiga mobil = three cars.", { image: "toy-car*3" }),
        listen("sd1-c4-l3-c2", say(["man", "How many balloons?"], ["woman", "Five balloons."]), "Listen. How many balloons?", ["5", "2", "9"], 0, "Five = 5."),
        fill("sd1-c4-l3-c3", "Complete: one doll, two ___", "one doll, two", "", ["dolls"], "Lebih dari satu → dolls."),
        arrange("sd1-c4-l3-c4", "Put the words in order.", "I have two robots", "I have + jumlah + benda (s)."),
        trPick("sd1-c4-l3-c5", "“Berapa banyak?” in English is…", ["How many?", "What is it?", "What color?"], 0, "Berapa banyak = How many."),
        pick("sd1-c4-l3-c6", "Beni has 2 balls. Dina has 1 ball. How many balls together?", ["three", "two", "four"], 0, "2 + 1 = 3 = three.", { hots: true, image: "ball*3" }),
      ],
    },
  ],
  quiz: {
    id: "sd1-c4-post",
    title: "Chapter 4 Posttest",
    passPercent: 70,
    questions: [
      listen("sd1-c4-post1", voice("Nine."), "Listen. Choose the number.", ["pic:num-9", "pic:num-6", "pic:num-4", "pic:num-1"], 0, "Nine = sembilan."),
      pick("sd1-c4-post2", "How many apples?", ["five", "four", "six", "three"], 0, "Ada lima apel = five.", { image: "apple*5" }),
      pick("sd1-c4-post3", "What is it?", ["a robot", "a doll", "a kite", "a car"], 0, "Robot = robot.", { image: "robot" }),
      match("sd1-c4-post4", "Match.", [["pic:num-1", "one"], ["pic:num-3", "three"], ["pic:num-8", "eight"], ["pic:num-10", "ten"]], "Hebat!"),
      trPick("sd1-c4-post5", "“Boneka” in English is…", ["doll", "ball", "robot", "kite"], 0, "Boneka = doll."),
      fill("sd1-c4-post6", "What comes next? six, seven, ___", "six, seven,", "", ["eight"], "Setelah seven adalah eight."),
      arrange("sd1-c4-post7", "Put the words in order.", "How many balls", "How many + benda (s)?"),
      listen("sd1-c4-post8", voice("I have four blocks."), "Listen. How many blocks?", ["four", "five", "two", "ten"], 0, "Four = empat."),
      pick("sd1-c4-post9", "Which one is right?", ["two kites", "two kite", "a kites", "one kites"], 0, "Lebih dari satu → kites.", { hots: true }),
      pick("sd1-c4-post10", "I am round. You kick me. What am I?", ["a ball", "a kite", "a doll", "a balloon"], 0, "Bulat dan ditendang → bola.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Count and Play",
    questions: [
      live("sd1-c4-live1", "How many?", ["three", "two", "four", "five"], 0, "ball*3"),
      live("sd1-c4-live2", "What is it?", ["a kite", "a car", "a doll", "a robot"], 0, "kite"),
      live("sd1-c4-live3", "What comes after five?", ["six", "four", "seven", "nine"], 0, "num-5"),
      live("sd1-c4-live4", "What is it?", ["a teddy bear", "a robot", "a ball", "a car"], 0, "teddy"),
      live("sd1-c4-live5", "one car, two ___", ["cars", "car", "caries", "a car"], 0, "toy-car*2"),
      live("sd1-c4-live6", "How many apples?", ["four", "three", "five", "six"], 0, "apple*4"),
      live("sd1-c4-live7", "Which toy can fly?", ["a kite", "a car", "blocks", "a doll"], 0, "kite"),
      live("sd1-c4-live8", "2 + 2 = …", ["four", "two", "three", "five"], 0, "blocks"),
    ],
  },
};
