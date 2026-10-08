import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, fill, listenPick, pair, pick, pickMany, say } from "./helpers";

const PET: Passage = {
  id: "sd3-b5-pet",
  title: "My Pet, Mimi",
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
  title: "Bab 5 — Animals Around Me",
  description: "Nama-nama hewan di sekitar kita, kata sifat big/small, dan kemampuan hewan dengan can/cannot.",
  targetScore: "Menyimak–Berbicara · Membaca",
  pretest: {
    id: "sd3-b5-pre",
    title: "Pretest Bab 5",
    passPercent: 0,
    questions: [
      pick("sd3-b5-pre1", "“Cat” artinya…", ["Anjing", "Kucing", "Burung", "Ikan"], 1, "Cat = kucing."),
      listenPick("sd3-b5-pre2", say(["woman", "Bird."]), "Dengarkan. Pilih gambarnya.", ["🐦", "🐟", "🐄", "🐔"], 0, "Bird = burung."),
      pick("sd3-b5-pre3", "Lawan kata “big” adalah…", ["tall", "small", "long", "fast"], 1, "Big (besar) ↔ small (kecil)."),
      pick("sd3-b5-pre4", "“A fish can swim.” artinya…", ["Ikan bisa berenang.", "Ikan bisa terbang.", "Ikan tidak bisa berenang.", "Ikan bisa berlari."], 0, "Can = bisa, swim = berenang."),
      pick("sd3-b5-pre5", "Hewan yang menghasilkan susu adalah…", ["cow", "bird", "fish", "cat"], 0, "Cow = sapi, penghasil susu."),
    ],
  },
  lessons: [
    {
      id: "sd3-b5-l1",
      skill: "vocabulary",
      title: "Animals — Nama Hewan",
      summary: "Cat, dog, bird, fish, chicken, cow, duck, elephant.",
      minutes: 10,
      sections: [
        {
          title: "Hewan di sekitar kita",
          blocks: [
            { type: "text", md: "Di rumah, di kebun, atau di sawah, banyak hewan yang bisa kita temui. Yuk, kenalan dengan nama bahasa Inggrisnya! 🐾" },
            {
              type: "vocab",
              items: [
                { emoji: "🐱", word: "cat", meaning: "kucing" },
                { emoji: "🐶", word: "dog", meaning: "anjing" },
                { emoji: "🐦", word: "bird", meaning: "burung" },
                { emoji: "🐟", word: "fish", meaning: "ikan" },
                { emoji: "🐔", word: "chicken", meaning: "ayam" },
                { emoji: "🐄", word: "cow", meaning: "sapi" },
                { emoji: "🦆", word: "duck", meaning: "bebek" },
                { emoji: "🐘", word: "elephant", meaning: "gajah" },
              ],
            },
          ],
        },
        {
          title: "Big or small?",
          blocks: [
            { type: "text", md: "**Big** = besar, **small** = kecil. Contoh: *An elephant is big.* 🐘 *A bird is small.* 🐦" },
            { type: "try", question: pick("sd3-b5-l1-try", "🐘 An elephant is …", ["small", "big", "white", "short"], 1, "Gajah itu besar → big.") },
          ],
        },
      ],
      checkpoint: [
        pair("sd3-b5-l1-c1", "Pasangkan gambar dengan namanya.", [["🐶", "dog"], ["🐔", "chicken"], ["🦆", "duck"], ["🐄", "cow"]], "Dog, chicken, duck, cow!"),
        listenPick("sd3-b5-l1-c2", say(["man", "Elephant."]), "Dengarkan. Pilih hewannya.", ["🐘", "🐄", "🐶", "🐱"], 0, "Elephant = gajah."),
        fill("sd3-b5-l1-c3", "Tulis nama hewannya. 🐟", "It is a", ".", ["fish"], "🐟 = fish."),
        pick("sd3-b5-l1-c4", "🐱 Next to an elephant, a cat is …", ["big", "small", "tall"], 1, "Dibanding gajah, kucing itu kecil → small."),
        pickMany("sd3-b5-l1-c5", "Pilih SEMUA hewan yang punya sayap.", ["bird", "duck", "cow", "chicken", "fish"], [0, 1, 3], "Burung, bebek, dan ayam punya sayap. Sapi dan ikan tidak.", { hots: true }),
      ],
    },
    {
      id: "sd3-b5-l2",
      skill: "speaking",
      title: "Can or Cannot? — Bisa atau Tidak?",
      summary: "Menyebut kemampuan hewan: swim, fly, run, jump.",
      minutes: 12,
      sections: [
        {
          title: "Kata kerja gerakan",
          blocks: [
            {
              type: "vocab",
              items: [
                { emoji: "🏊", word: "swim", meaning: "berenang" },
                { emoji: "🕊️", word: "fly", meaning: "terbang" },
                { emoji: "🏃", word: "run", meaning: "berlari" },
                { emoji: "🦘", word: "jump", meaning: "melompat" },
              ],
            },
            { type: "text", md: "**can** = bisa, **cannot** (atau **can't**) = tidak bisa.\n\n*A bird can fly.* = Burung bisa terbang.\n*A fish cannot fly.* = Ikan tidak bisa terbang." },
          ],
        },
        {
          title: "Tebak hewan apa ini!",
          blocks: [
            { type: "audio", caption: "Tebak-tebakan", showTranscript: true, script: say(["woman", "It is big. It is grey. It can swim. It cannot fly. It has a long nose. What is it?"]) },
            { type: "try", question: pick("sd3-b5-l2-try", "Hewan apa yang dimaksud?", ["🐘 elephant", "🐦 bird", "🐱 cat", "🐔 chicken"], 0, "Besar, abu-abu, hidungnya panjang (belalai) → elephant. Gajah memang bisa berenang, lho!", { hots: true }) },
          ],
        },
      ],
      checkpoint: [
        pick("sd3-b5-l2-c1", "A fish can …", ["fly", "swim", "run", "jump"], 1, "Ikan bisa berenang → swim."),
        listenPick("sd3-b5-l2-c2", say(["man", "A dog can run."]), "Dengarkan. Apa yang bisa dilakukan anjing?", ["Berlari", "Terbang", "Berenang", "Bernyanyi"], 0, "Run = berlari."),
        arrange("sd3-b5-l2-c3", "Susun kalimatnya.", "A bird can fly", "A bird can fly = Burung bisa terbang."),
        fill("sd3-b5-l2-c4", "Isi dengan can atau cannot.", "A cow", "fly.", ["cannot", "can't", "can not"], "Sapi tidak bisa terbang → cannot."),
        pick("sd3-b5-l2-c5", "Hewan mana yang bisa terbang DAN berenang?", ["🐱 cat", "🦆 duck", "🐄 cow", "🐶 dog"], 1, "Bebek bisa terbang (sebentar) dan juga berenang di kolam.", { hots: true }),
      ],
    },
    {
      id: "sd3-b5-l3",
      skill: "reading",
      title: "Reading — My Pet, Mimi",
      summary: "Membaca cerita tentang hewan peliharaan.",
      minutes: 10,
      passages: [PET],
      sections: [
        {
          title: "Kenalan dengan Mimi",
          blocks: [
            { type: "passage", passage: PET },
            { type: "tip", md: "**Pet** artinya hewan peliharaan. Kamu punya pet di rumah?" },
            { type: "try", question: pick("sd3-b5-l3-try", "Mimi itu hewan apa?", ["Anjing", "Kucing", "Ikan", "Burung"], 1, "Baris 1: It is a cat.", { passageId: PET.id }) },
          ],
        },
      ],
      checkpoint: [
        pick("sd3-b5-l3-c1", "Mimi berwarna apa?", ["black", "white", "orange", "grey"], 1, "Baris 3: small and white.", { passageId: PET.id }),
        pickMany("sd3-b5-l3-c2", "Pilih SEMUA yang bisa dilakukan Mimi.", ["run", "jump", "swim", "fly"], [0, 1], "Baris 4: She can run and jump. Baris 5: She cannot swim.", { passageId: PET.id }),
        fill("sd3-b5-l3-c3", "Lengkapi.", "Mimi likes", "very much!", ["fish"], "Baris 6: Mimi likes fish.", { passageId: PET.id }),
        pick("sd3-b5-l3-c4", "“Mimi is small.” Artinya Mimi…", ["besar", "kecil", "tinggi", "cepat"], 1, "Small = kecil.", { passageId: PET.id }),
        pick("sd3-b5-l3-c5", "Pemilik Mimi mau mengajak Mimi bermain. Permainan mana yang PALING cocok?", ["Berenang di kolam", "Mengejar bola", "Terbang bersama", "Menyelam"], 1, "Mimi bisa berlari dan melompat tapi tidak bisa berenang, jadi mengejar bola paling cocok.", { passageId: PET.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd3-b5-post",
    title: "Posttest Bab 5",
    passPercent: 70,
    passages: [PET],
    questions: [
      pick("sd3-b5-post1", "“Chicken” artinya…", ["Bebek", "Ayam", "Burung", "Sapi"], 1, "Chicken = ayam."),
      listenPick("sd3-b5-post2", say(["woman", "It is a cow."]), "Dengarkan. Hewan apa?", ["🐄", "🐘", "🐶", "🦆"], 0, "Cow = sapi."),
      pick("sd3-b5-post3", "A bird can …", ["fly", "swim only", "talk", "read"], 0, "Burung bisa terbang = fly."),
      arrange("sd3-b5-post4", "Susun kalimatnya.", "A fish cannot run", "Ikan tidak bisa berlari."),
      pair("sd3-b5-post5", "Pasangkan hewan dengan kemampuannya.", [["🐟 fish", "swim"], ["🐦 bird", "fly"], ["🦘 kangaroo", "jump"], ["🐆 cheetah", "run fast"]], "Fish swim, bird fly, kangaroo jump, cheetah run fast!"),
      pick("sd3-b5-post6", "Apa makanan kesukaan Mimi?", ["milk", "fish", "rice", "bread"], 1, "Baris 6: Mimi likes fish.", { passageId: PET.id }),
      pick("sd3-b5-post7", "“It is small. It can fly. It can sing.” Hewan apa itu?", ["🐘", "🐦", "🐄", "🐟"], 1, "Kecil, bisa terbang, bisa bernyanyi → bird.", { hots: true }),
      pick("sd3-b5-post8", "Mana yang TIDAK benar?", ["A duck can swim.", "An elephant is big.", "A cow can fly.", "A dog can run."], 2, "Sapi tidak bisa terbang, jadi “A cow can fly.” tidak benar.", { hots: true }),
    ],
  },
};
