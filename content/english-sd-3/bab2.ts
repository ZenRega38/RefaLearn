import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, pics, say, speaking, table, text, tip, trMatch, trPick, tryIt, vocab, voice } from "../kit";

const RAKA: Passage = {
  id: "sd3-b2-raka",
  title: "Raka's Family",
  pic: "boy",
  lines: [
    "Hi! I am Raka.",
    "This is my family.",
    "This is my father. His name is Pak Arif.",
    "This is my mother. Her name is Bu Lina.",
    "I have one sister. She is Nisa.",
    "Nisa is five years old.",
    "I love my family!",
  ],
};

export const BAB2: Level = {
  id: "sd3-bab2",
  title: "Chapter 2 — My Family",
  description: "Name family members, introduce your family with “This is my…”, and use he and she.",
  targetScore: "Listening · Speaking · Reading",
  cover: ["father", "mother", "sister"],
  pretest: {
    id: "sd3-b2-pre",
    title: "Chapter 2 Pretest",
    passPercent: 0,
    questions: [
      trPick("sd3-b2-pre1", "“Mother” means…", ["Ayah", "Ibu", "Kakak", "Nenek"], 1, "Mother = ibu."),
      trPick("sd3-b2-pre2", "“Ayah” in English is…", ["brother", "father", "sister", "uncle"], 1, "Father = ayah."),
      listen("sd3-b2-pre3", voice("Grandmother."), "Listen. Who is it?", ["pic:grandmother", "pic:grandfather", "pic:mother", "pic:sister"], 0, "Grandmother = nenek."),
      trPick("sd3-b2-pre4", "“This is my brother.” means…", ["Ini kakak/adik laki-lakiku.", "Ini ayahku.", "Ini temanku.", "Ini kakekku."], 0, "Brother = saudara laki-laki (kakak atau adik)."),
      pick("sd3-b2-pre5", "For a mother, we say…", ["He", "She", "It", "They"], 1, "Perempuan → she.", { image: "mother" }),
    ],
  },
  lessons: [
    {
      id: "sd3-b2-l1",
      skill: "vocabulary",
      title: "Family Members",
      summary: "Father, mother, brother, sister, grandfather, grandmother, baby.",
      minutes: 10,
      sections: [
        {
          title: "Who lives in your house?",
          blocks: [
            text("Setiap keluarga beda-beda, ada yang besar, ada yang kecil. Yuk kenalan dengan nama-nama anggota keluarga dalam bahasa Inggris. Jangan lupa ketuk kartunya untuk mendengar!"),
            vocab([
              ["father", "ayah", "father", "My father is tall."],
              ["mother", "ibu", "mother", "My mother cooks rice."],
              ["brother", "saudara laki-laki", "brother", "My brother plays football."],
              ["sister", "saudara perempuan", "sister", "My sister is five."],
              ["grandfather", "kakek", "grandfather", "My grandfather wears glasses."],
              ["grandmother", "nenek", "grandmother", "My grandmother is kind."],
              ["baby", "bayi", "baby", "The baby is sleeping."],
            ]),
            tip("Di bahasa Inggris, **brother** bisa kakak atau adik laki-laki, **sister** bisa kakak atau adik perempuan. Praktis, kan? Banyak juga yang memanggil ayah **Dad** dan ibu **Mom**."),
          ],
        },
        {
          title: "Guessing game",
          blocks: [
            tryIt(match("sd3-b2-l1-try", "Match the pictures with the words.", [["pic:grandfather", "grandfather"], ["pic:mother", "mother"], ["pic:sister", "sister"], ["pic:baby", "baby"]], "Grandfather = kakek, mother = ibu, sister = saudara perempuan, baby = bayi.")),
          ],
        },
      ],
      checkpoint: [
        trPick("sd3-b2-l1-c1", "“Grandfather” means…", ["Kakek", "Paman", "Ayah", "Nenek"], 0, "Grandfather = kakek."),
        listen("sd3-b2-l1-c2", voice("Sister.", "man"), "Listen. Choose the picture.", ["pic:brother", "pic:sister", "pic:father", "pic:grandfather"], 1, "Sister = saudara perempuan."),
        fill("sd3-b2-l1-c3", "Write the missing letters.", "m _ t h e r →", "", ["mother"], "Ibu = mother.", { image: "mother" }),
        pickMany("sd3-b2-l1-c4", "Choose ALL the female family members.", ["mother", "father", "sister", "grandmother", "brother"], [0, 2, 3], "Mother, sister, dan grandmother adalah perempuan."),
        pick("sd3-b2-l1-c5", "Your father's father is your…", ["brother", "grandfather", "baby", "sister"], 1, "Ayahnya ayah = kakek = grandfather.", { hots: true }),
      ],
    },
    {
      id: "sd3-b2-l2",
      skill: "speaking",
      title: "This Is My Family",
      summary: "This is my…, He is…, She is…",
      minutes: 12,
      sections: [
        {
          title: "Listen to Nisa",
          blocks: [
            text("Nisa sedang menunjukkan foto keluarganya ke temannya. Dengarkan baik-baik, ya."),
            audio("Nisa's family photo", say(
              ["woman", "Look! This is my family photo."],
              ["man", "Who is he?"],
              ["woman", "He is my father."],
              ["man", "And who is she?"],
              ["woman", "She is my grandmother. She is very kind."]
            )),
            pics([["father", "He is my father."], ["grandmother", "She is my grandmother."]], "Nisa's family photo"),
          ],
        },
        {
          title: "He or she?",
          blocks: [
            pics([["boy", "he"], ["girl", "she"]]),
            table(["For", "Use", "Example"], [["boys and men 👨👦👴", "He", "He is my brother."], ["girls and women 👩👧👵", "She", "She is my mother."]]),
            text("Kalimat **This is my …** dipakai untuk menunjukkan atau mengenalkan seseorang: *This is my sister.* = Ini saudara perempuanku."),
            tryIt(pick("sd3-b2-l2-try", "Complete: “____ is my grandfather.”", ["She", "He", "It", "I"], 1, "Grandfather (kakek) laki-laki → He.", { image: "grandfather" })),
            speaking({
              id: "sd3-b2-l2-say",
              title: "Show your family",
              prompt: "Imagine a family photo. Introduce three people with **This is my…** and **He/She is…**",
              image: "father",
              seconds: 40,
              tips: ["This is my father. He is …", "This is my sister. She is …"],
              models: [{ label: "Example", text: "This is my father. He is tall. This is my mother. She is kind. This is my baby brother. He is cute!" }],
              rubric: ["I introduced three people.", "I used **he** for boys and men.", "I used **she** for girls and women."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd3-b2-l2-c1", "“____ is my mother.”", ["He", "She", "They", "We"], 1, "Mother perempuan → She.", { image: "mother" }),
        listen("sd3-b2-l2-c2", voice("This is my brother."), "Listen. Who is she showing?", ["her father", "her brother", "her grandmother", "her sister"], 1, "Brother = saudara laki-laki."),
        arrange("sd3-b2-l2-c3", "Put the words in order.", "This is my father", "This is my + anggota keluarga."),
        fill("sd3-b2-l2-c4", "Write He or She.", "", "is my sister.", ["she"], "Sister perempuan → She.", { image: "sister" }),
        pick("sd3-b2-l2-c5", "Your friend points at your grandfather in a photo and asks “Who is she?”. What is wrong?", ["It should be “Who is he?”", "It should be “What is it?”", "Nothing is wrong.", "It should be “How old are you?”"], 0, "Kakek laki-laki, jadi pertanyaan yang benar “Who is he?”", { hots: true }),
      ],
    },
    {
      id: "sd3-b2-l3",
      skill: "reading",
      title: "Reading: Raka's Family",
      summary: "Read a short text about Raka's family and answer questions.",
      minutes: 10,
      passages: [RAKA],
      sections: [
        {
          title: "Read Raka's story",
          blocks: [
            pics([["father", "Pak Arif"], ["mother", "Bu Lina"], ["boy", "Raka"], ["sister", "Nisa"]], "Raka's family"),
            { type: "passage", passage: RAKA },
            audio("Listen and read", say(["man", RAKA.lines.join(" ")])),
            tryIt(pick("sd3-b2-l3-try", "What is the name of Raka's mother?", ["Pak Arif", "Bu Lina", "Nisa", "Raka"], 1, "Baris 4: Her name is Bu Lina.", { passageId: RAKA.id })),
          ],
        },
        {
          title: "His or her?",
          blocks: [
            text("Kata **His** dipakai untuk milik laki-laki (*his name* = namanya — laki-laki), **Her** untuk milik perempuan (*her name* = namanya — perempuan)."),
            table(["He / She", "His / Her"], [["He is my father.", "His name is Pak Arif."], ["She is my mother.", "Her name is Bu Lina."]]),
            {
              type: "task",
              kind: "writing",
              id: "sd3-b2-l3-write",
              title: "My family",
              prompt: "Write about your family like Raka. Write four or five sentences.",
              minWords: 15,
              maxWords: 60,
              tips: ["This is my family.", "This is my father. His name is …", "This is my mother. Her name is …", "I have … brother(s) / sister(s)."],
              models: [{ label: "Example", text: "Hi! I am Dina. This is my family. This is my father. His name is Pak Budi. This is my mother. Her name is Bu Sari. I have one brother. I love my family!" }],
              rubric: ["I used **This is my …**.", "I used **his** for a man or boy and **her** for a woman or girl.", "Names start with a capital letter.", "I wrote at least four sentences."],
            },
          ],
        },
      ],
      checkpoint: [
        pick("sd3-b2-l3-c1", "What is the name of Raka's father?", ["Pak Arif", "Pak Budi", "Bu Lina", "Nisa"], 0, "Baris 3: His name is Pak Arif.", { passageId: RAKA.id }),
        pick("sd3-b2-l3-c2", "How old is Nisa?", ["three", "four", "five", "eight"], 2, "Baris 6: Nisa is five years old.", { passageId: RAKA.id }),
        fill("sd3-b2-l3-c3", "Write His or Her.", "This is my mother.", "name is Bu Lina.", ["her"], "Mother perempuan → Her.", { passageId: RAKA.id }),
        pick("sd3-b2-l3-c4", "How many sisters does Raka have?", ["none", "one", "two", "three"], 1, "Baris 5: I have one sister.", { passageId: RAKA.id }),
        pick("sd3-b2-l3-c5", "How many people are in Raka's family (with Raka)?", ["three", "four", "five", "two"], 1, "Ayah + ibu + Nisa + Raka = 4 orang.", { passageId: RAKA.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd3-b2-post",
    title: "Chapter 2 Posttest",
    passPercent: 70,
    passages: [RAKA],
    questions: [
      trPick("sd3-b2-post1", "“Nenek” in English is…", ["grandfather", "grandmother", "mother", "sister"], 1, "Grandmother = nenek."),
      listen("sd3-b2-post2", voice("He is my father.", "man"), "Listen. Who is he talking about?", ["pic:father", "pic:mother", "pic:sister", "pic:grandmother"], 0, "Father = ayah."),
      pick("sd3-b2-post3", "“____ is my brother.”", ["She", "He", "Her", "His"], 1, "Brother laki-laki → He.", { image: "brother" }),
      arrange("sd3-b2-post4", "Put the words in order.", "She is my grandmother", "She is my + anggota keluarga perempuan."),
      trMatch("sd3-b2-post5", "Match.", [["father", "ayah"], ["sister", "saudara perempuan"], ["baby", "bayi"], ["grandfather", "kakek"]], "Kerja bagus!"),
      pick("sd3-b2-post6", "Who is Raka's little sister?", ["Bu Lina", "Nisa", "Pak Arif", "Dina"], 1, "Baris 5: I have one sister. She is Nisa.", { passageId: RAKA.id }),
      pick("sd3-b2-post7", "Andi has one older sister and two younger brothers. How many children are in Andi's family?", ["three", "four", "two", "five"], 1, "1 kakak + 2 adik + Andi sendiri = 4 anak. Jangan lupa hitung Andi, ya!", { hots: true }),
      pick("sd3-b2-post8", "Your mother's mother is your…", ["grandmother", "sister", "baby", "brother"], 0, "Ibunya ibu = nenek = grandmother.", { hots: true }),
      fill("sd3-b2-post9", "Write His or Her.", "This is my father.", "name is Pak Arif.", ["his"], "Father laki-laki → His.", { passageId: RAKA.id }),
      pick("sd3-b2-post10", "Which sentence is correct?", ["She is my sister.", "He is my sister.", "She is my brother.", "His is my mother."], 0, "Sister perempuan → She is my sister."),
    ],
  },
  live: {
    title: "Live Quiz — My Family",
    questions: [
      live("sd3-b2-live1", "Who is it?", ["grandfather", "father", "brother", "baby"], 0, "grandfather"),
      live("sd3-b2-live2", "Who is it?", ["baby", "sister", "mother", "brother"], 0, "baby"),
      live("sd3-b2-live3", "____ is my mother.", ["She", "He", "It", "His"], 0, "mother"),
      live("sd3-b2-live4", "This is my father. ____ name is Arif.", ["His", "Her", "He", "She"], 0, "father"),
      live("sd3-b2-live5", "Your mother's mother is your…", ["grandmother", "sister", "aunt", "baby"], 0, "grandmother"),
      live("sd3-b2-live6", "Who is it?", ["sister", "brother", "father", "grandmother"], 0, "sister"),
      live("sd3-b2-live7", "“Kakak laki-laki” is…", ["brother", "sister", "father", "uncle"], 0, "brother", true),
      live("sd3-b2-live8", "This is my sister. ____ name is Nisa.", ["Her", "His", "He", "Its"], 0, "girl"),
    ],
  },
};
