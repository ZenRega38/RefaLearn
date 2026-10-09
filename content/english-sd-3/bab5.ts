import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, pics, say, speaking, text, tip, trFill, trPick, tryIt, vocab, voice } from "../kit";

const PET: Passage = {
  id: "sd3-b5-pet",
  title: "My Pet, Mimi",
  pic: "cat-white",
  lines: [
    "I have a pet. It is a cat.",
    "Her name is Mimi.",
    "Mimi is small and white.",
    "She can run and jump.",
    "She cannot swim.",
    "Mimi likes fish very much!",
  ],
};

export const BAB5: Level = {
  id: "sd3-bab5",
  title: "Chapter 5 — Animals Around Me",
  description: "Name animals around us, describe them with big and small, and say what they can and cannot do.",
  targetScore: "Listening · Speaking · Reading",
  cover: ["cat", "dog", "elephant"],
  pretest: {
    id: "sd3-b5-pre",
    title: "Chapter 5 Pretest",
    passPercent: 0,
    questions: [
      trPick("sd3-b5-pre1", "“Cat” means…", ["Anjing", "Kucing", "Burung", "Ikan"], 1, "Cat = kucing."),
      listen("sd3-b5-pre2", voice("Bird."), "Listen. Choose the picture.", ["pic:bird", "pic:fish", "pic:cow", "pic:chicken"], 0, "Bird = burung."),
      pick("sd3-b5-pre3", "The opposite of “big” is…", ["tall", "small", "long", "fast"], 1, "Big (besar) ↔ small (kecil)."),
      trPick("sd3-b5-pre4", "“A fish can swim.” means…", ["Ikan bisa berenang.", "Ikan bisa terbang.", "Ikan tidak bisa berenang.", "Ikan bisa berlari."], 0, "Can = bisa, swim = berenang."),
      pick("sd3-b5-pre5", "Which animal gives us milk?", ["cow", "bird", "fish", "cat"], 0, "Cow = sapi, penghasil susu.", { image: "milk" }),
    ],
  },
  lessons: [
    {
      id: "sd3-b5-l1",
      skill: "vocabulary",
      title: "Animals",
      summary: "Cat, dog, bird, fish, chicken, cow, duck, elephant.",
      minutes: 10,
      sections: [
        {
          title: "Animals around us",
          blocks: [
            text("Di rumah, di kebun, atau di sawah, banyak hewan yang bisa kita temui. Yuk, kenalan dengan nama bahasa Inggrisnya! 🐾"),
            vocab([
              ["cat", "kucing", "cat", "The cat says meow."],
              ["dog", "anjing", "dog", "The dog says woof."],
              ["bird", "burung", "bird", "The bird can sing."],
              ["fish", "ikan", "fish", "The fish lives in water."],
              ["chicken", "ayam", "chicken", "The chicken lays eggs."],
              ["cow", "sapi", "cow", "The cow says moo."],
              ["duck", "bebek", "duck", "The duck says quack."],
              ["elephant", "gajah", "elephant", "The elephant is very big."],
            ]),
          ],
        },
        {
          title: "Big or small?",
          blocks: [
            pics([["elephant", "big"], ["bird", "small"]]),
            text("**Big** = besar, **small** = kecil. Contoh: *An elephant is big.* 🐘 *A bird is small.* 🐦"),
            tryIt(pick("sd3-b5-l1-try", "An elephant is …", ["small", "big", "white", "short"], 1, "Gajah itu besar → big.", { image: "elephant" })),
          ],
        },
      ],
      checkpoint: [
        match("sd3-b5-l1-c1", "Match the pictures with the names.", [["pic:dog", "dog"], ["pic:chicken", "chicken"], ["pic:duck", "duck"], ["pic:cow", "cow"]], "Dog, chicken, duck, cow!"),
        listen("sd3-b5-l1-c2", voice("Elephant.", "man"), "Listen. Choose the animal.", ["pic:elephant", "pic:cow", "pic:dog", "pic:cat"], 0, "Elephant = gajah."),
        fill("sd3-b5-l1-c3", "Write the name of the animal.", "It is a", ".", ["fish"], "Gambar itu ikan = fish.", { image: "fish" }),
        pick("sd3-b5-l1-c4", "Next to an elephant, a cat is …", ["big", "small", "tall"], 1, "Dibanding gajah, kucing itu kecil → small.", { image: "cat" }),
        pickMany("sd3-b5-l1-c5", "Choose ALL the animals with wings.", ["bird", "duck", "cow", "chicken", "fish"], [0, 1, 3], "Burung, bebek, dan ayam punya sayap. Sapi dan ikan tidak.", { hots: true }),
      ],
    },
    {
      id: "sd3-b5-l2",
      skill: "speaking",
      title: "Can or Cannot?",
      summary: "What animals can do: swim, fly, run, jump.",
      minutes: 12,
      sections: [
        {
          title: "Action words",
          blocks: [
            vocab([
              ["swim", "berenang", "swim"],
              ["fly", "terbang", "fly"],
              ["run", "berlari", "run"],
              ["jump", "melompat", "jump"],
            ]),
            text("**can** = bisa, **cannot** (atau **can't**) = tidak bisa.\n\n*A bird can fly.* = Burung bisa terbang.\n*A fish cannot fly.* = Ikan tidak bisa terbang."),
          ],
        },
        {
          title: "Guess the animal!",
          blocks: [
            audio("Guessing game", say(["woman", "It is big. It is grey. It can swim. It cannot fly. It has a long nose. What is it?"])),
            tryIt(pick("sd3-b5-l2-try", "Which animal is it?", ["pic:elephant|elephant", "pic:bird|bird", "pic:cat|cat", "pic:chicken|chicken"], 0, "Besar, abu-abu, hidungnya panjang (belalai) → elephant. Gajah memang bisa berenang, lho!", { hots: true })),
            speaking({
              id: "sd3-b5-l2-say",
              title: "Animal riddle",
              prompt: "Make your own riddle. Describe an animal with **big/small**, a color, and **can/cannot**. Then ask **What is it?**",
              image: "duck",
              seconds: 40,
              models: [{ label: "Example", text: "It is small. It is yellow. It can swim. It can fly a little. It says quack. What is it? (A duck!)" }],
              rubric: ["I said big or small.", "I used **can** and **cannot**.", "I asked **What is it?**"],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd3-b5-l2-c1", "A fish can …", ["fly", "swim", "run", "jump"], 1, "Ikan bisa berenang → swim.", { image: "fish" }),
        listen("sd3-b5-l2-c2", voice("A dog can run.", "man"), "Listen. What can the dog do?", ["pic:run|run", "pic:fly|fly", "pic:swim|swim"], 0, "Run = berlari."),
        arrange("sd3-b5-l2-c3", "Put the words in order.", "A bird can fly", "A bird can fly = Burung bisa terbang."),
        fill("sd3-b5-l2-c4", "Write can or cannot.", "A cow", "fly.", ["cannot", "can't", "can not"], "Sapi tidak bisa terbang → cannot.", { image: "cow" }),
        pick("sd3-b5-l2-c5", "Which animal can fly AND swim?", ["pic:cat|cat", "pic:duck|duck", "pic:cow|cow", "pic:dog|dog"], 1, "Bebek bisa terbang (sebentar) dan juga berenang di kolam.", { hots: true }),
      ],
    },
    {
      id: "sd3-b5-l3",
      skill: "reading",
      title: "Reading: My Pet, Mimi",
      summary: "Read a story about a pet.",
      minutes: 10,
      passages: [PET],
      sections: [
        {
          title: "Meet Mimi",
          blocks: [
            { type: "passage", passage: PET },
            tip("**Pet** artinya hewan peliharaan. Kamu punya pet di rumah?"),
            tryIt(pick("sd3-b5-l3-try", "What animal is Mimi?", ["a dog", "a cat", "a fish", "a bird"], 1, "Baris 1: It is a cat.", { passageId: PET.id })),
          ],
        },
        {
          title: "Write about a pet",
          blocks: [
            {
              type: "task",
              kind: "writing",
              id: "sd3-b5-l3-write",
              title: "My (dream) pet",
              prompt: "Write about your pet, or a pet you want. Use five sentences like the Mimi text.",
              image: "dog",
              minWords: 20,
              maxWords: 70,
              tips: ["I have a pet. It is a …", "Its name is …", "It is (big/small) and (color).", "It can … It cannot …", "It likes …"],
              models: [{ label: "Example", text: "I have a pet. It is a dog. His name is Bobo. Bobo is big and brown. He can run and swim. He cannot fly. Bobo likes bones very much!" }],
              rubric: ["I named the animal and gave its name.", "I described it with size and color.", "I used **can** and **cannot**.", "I said what it likes."],
            },
          ],
        },
      ],
      checkpoint: [
        pick("sd3-b5-l3-c1", "What color is Mimi?", ["black", "white", "orange", "grey"], 1, "Baris 3: small and white.", { passageId: PET.id }),
        pickMany("sd3-b5-l3-c2", "Choose ALL the things Mimi can do.", ["run", "jump", "swim", "fly"], [0, 1], "Baris 4: She can run and jump. Baris 5: She cannot swim.", { passageId: PET.id }),
        fill("sd3-b5-l3-c3", "Complete.", "Mimi likes", "very much!", ["fish"], "Baris 6: Mimi likes fish.", { passageId: PET.id }),
        trPick("sd3-b5-l3-c4", "“Mimi is small.” means Mimi is…", ["besar", "kecil", "tinggi", "cepat"], 1, "Small = kecil.", { passageId: PET.id }),
        pick("sd3-b5-l3-c5", "Mimi's owner wants to play with her. Which game is BEST?", ["swimming in a pool", "chasing a ball", "flying together", "diving"], 1, "Mimi bisa berlari dan melompat tapi tidak bisa berenang, jadi mengejar bola paling cocok.", { passageId: PET.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd3-b5-post",
    title: "Chapter 5 Posttest",
    passPercent: 70,
    passages: [PET],
    questions: [
      trPick("sd3-b5-post1", "“Chicken” means…", ["Bebek", "Ayam", "Burung", "Sapi"], 1, "Chicken = ayam."),
      listen("sd3-b5-post2", voice("It is a cow."), "Listen. Which animal?", ["pic:cow", "pic:elephant", "pic:dog", "pic:duck"], 0, "Cow = sapi."),
      pick("sd3-b5-post3", "A bird can …", ["fly", "swim only", "talk", "read"], 0, "Burung bisa terbang = fly.", { image: "bird" }),
      arrange("sd3-b5-post4", "Put the words in order.", "A fish cannot run", "Ikan tidak bisa berlari.", { image: "fish" }),
      match("sd3-b5-post5", "Match each animal with what it can do.", [["pic:fish|fish", "swim"], ["pic:bird|bird", "fly"], ["pic:kangaroo|kangaroo", "jump"], ["pic:cheetah|cheetah", "run fast"]], "Fish swim, bird fly, kangaroo jump, cheetah run fast!"),
      pick("sd3-b5-post6", "What is Mimi's favorite food?", ["milk", "fish", "rice", "bread"], 1, "Baris 6: Mimi likes fish.", { passageId: PET.id }),
      pick("sd3-b5-post7", "“It is small. It can fly. It can sing.” What is it?", ["pic:elephant", "pic:bird", "pic:cow", "pic:fish"], 1, "Kecil, bisa terbang, bisa bernyanyi → bird.", { hots: true }),
      pick("sd3-b5-post8", "Which sentence is NOT true?", ["A duck can swim.", "An elephant is big.", "A cow can fly.", "A dog can run."], 2, "Sapi tidak bisa terbang, jadi “A cow can fly.” tidak benar.", { hots: true }),
      trFill("sd3-b5-post9", "Write in English: “Burung bisa terbang.”", "A bird", "fly.", ["can"], "Bisa = can."),
      pick("sd3-b5-post10", "The duck says…", ["quack", "moo", "woof", "meow"], 0, "Bebek: quack. Sapi: moo. Anjing: woof. Kucing: meow.", { image: "duck" }),
    ],
  },
  live: {
    title: "Live Quiz — Animal Friends",
    questions: [
      live("sd3-b5-live1", "Which animal is it?", ["elephant", "cow", "dog", "cat"], 0, "elephant"),
      live("sd3-b5-live2", "A fish can…", ["swim", "fly", "run", "jump"], 0, "fish"),
      live("sd3-b5-live3", "A cow ___ fly.", ["cannot", "can", "is", "does"], 0, "cow"),
      live("sd3-b5-live4", "The opposite of big is…", ["small", "tall", "long", "fast"], 0, "bird"),
      live("sd3-b5-live5", "The cow says…", ["moo", "meow", "woof", "quack"], 0, "cow"),
      live("sd3-b5-live6", "Which animal is it?", ["kangaroo", "dog", "cat", "cow"], 0, "kangaroo"),
      live("sd3-b5-live7", "Which animal has wings?", ["chicken", "cow", "fish", "dog"], 0, "chicken"),
      live("sd3-b5-live8", "“Kucing” is…", ["cat", "dog", "cow", "duck"], 0, "cat", true),
    ],
  },
};
