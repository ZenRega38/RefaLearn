import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, fill, listenPick, pair, pick, pickMany, say } from "./helpers";

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
  title: "Bab 2 — My Family",
  description: "Mengenal anggota keluarga, memperkenalkan keluarga dengan “This is my…”, dan memakai he/she.",
  targetScore: "Menyimak–Berbicara · Membaca",
  cover: ["father", "mother", "sister"],
  pretest: {
    id: "sd3-b2-pre",
    title: "Pretest Bab 2",
    passPercent: 0,
    questions: [
      pick("sd3-b2-pre1", "“Mother” artinya…", ["Ayah", "Ibu", "Kakak", "Nenek"], 1, "Mother = ibu."),
      pick("sd3-b2-pre2", "Ayah dalam bahasa Inggris adalah…", ["brother", "father", "sister", "uncle"], 1, "Father = ayah."),
      listenPick("sd3-b2-pre3", say(["woman", "Grandmother."]), "Dengarkan. Siapa yang disebut?", ["pic:grandmother", "pic:grandfather", "pic:mother", "pic:sister"], 0, "Grandmother = nenek."),
      pick("sd3-b2-pre4", "“This is my brother.” artinya…", ["Ini kakak/adik laki-lakiku.", "Ini ayahku.", "Ini temanku.", "Ini kakekku."], 0, "Brother = saudara laki-laki (kakak atau adik)."),
      pick("sd3-b2-pre5", "Untuk menyebut ibu, kita pakai…", ["He", "She", "It", "They"], 1, "Perempuan → she.", { image: "mother" }),
    ],
  },
  lessons: [
    {
      id: "sd3-b2-l1",
      skill: "vocabulary",
      title: "Family Members — Anggota Keluarga",
      summary: "Father, mother, brother, sister, grandfather, grandmother, baby.",
      minutes: 10,
      sections: [
        {
          title: "Siapa saja di rumahmu?",
          blocks: [
            { type: "text", md: "Setiap keluarga beda-beda, ada yang besar, ada yang kecil. Yuk kenalan dengan nama-nama anggota keluarga dalam bahasa Inggris. Jangan lupa ketuk kartunya untuk mendengar!" },
            {
              type: "vocab",
              items: [
                { emoji: "👨", pic: "father", word: "father", meaning: "ayah" },
                { emoji: "👩", pic: "mother", word: "mother", meaning: "ibu" },
                { emoji: "👦", pic: "brother", word: "brother", meaning: "saudara laki-laki" },
                { emoji: "👧", pic: "sister", word: "sister", meaning: "saudara perempuan" },
                { emoji: "👴", pic: "grandfather", word: "grandfather", meaning: "kakek" },
                { emoji: "👵", pic: "grandmother", word: "grandmother", meaning: "nenek" },
                { emoji: "👶", pic: "baby", word: "baby", meaning: "bayi" },
              ],
            },
            { type: "tip", md: "Di bahasa Inggris, **brother** bisa kakak atau adik laki-laki, **sister** bisa kakak atau adik perempuan. Praktis, kan? Banyak juga yang memanggil ayah **Dad** dan ibu **Mom**." },
          ],
        },
        {
          title: "Main tebak-tebakan",
          blocks: [
            { type: "try", question: pair("sd3-b2-l1-try", "Pasangkan gambar dengan katanya.", [["pic:grandfather", "grandfather"], ["pic:mother", "mother"], ["pic:sister", "sister"], ["pic:baby", "baby"]], "Grandfather = kakek, mother = ibu, sister = saudara perempuan, baby = bayi.") },
          ],
        },
      ],
      checkpoint: [
        pick("sd3-b2-l1-c1", "“Grandfather” artinya…", ["Kakek", "Paman", "Ayah", "Nenek"], 0, "Grandfather = kakek."),
        listenPick("sd3-b2-l1-c2", say(["man", "Sister."]), "Dengarkan. Pilih gambarnya.", ["pic:brother", "pic:sister", "pic:father", "pic:grandfather"], 1, "Sister = saudara perempuan."),
        fill("sd3-b2-l1-c3", "Lengkapi hurufnya.", "m _ t h e r →", "", ["mother"], "Ibu = mother.", { image: "mother" }),
        pickMany("sd3-b2-l1-c4", "Pilih SEMUA anggota keluarga perempuan.", ["mother", "father", "sister", "grandmother", "brother"], [0, 2, 3], "Mother, sister, dan grandmother adalah perempuan."),
        pick("sd3-b2-l1-c5", "Ayah dari ayahmu adalah…", ["brother", "grandfather", "baby", "sister"], 1, "Ayahnya ayah = kakek = grandfather.", { hots: true }),
      ],
    },
    {
      id: "sd3-b2-l2",
      skill: "speaking",
      title: "This is My… — Memperkenalkan Keluarga",
      summary: "Memakai “This is my…”, “He is…”, dan “She is…”.",
      minutes: 12,
      sections: [
        {
          title: "Dengarkan Nisa",
          blocks: [
            { type: "text", md: "Nisa sedang menunjukkan foto keluarganya ke temannya. Dengarkan baik-baik, ya." },
            {
              type: "audio",
              caption: "Nisa's family photo",
              showTranscript: true,
              script: say(
                ["woman", "Look! This is my family photo."],
                ["man", "Who is he?"],
                ["woman", "He is my father."],
                ["man", "And who is she?"],
                ["woman", "She is my grandmother. She is very kind."]
              ),
            },
            { type: "pictures", items: [{ pic: "father", label: "He is my father." }, { pic: "grandmother", label: "She is my grandmother." }], caption: "Foto keluarga Nisa" },
          ],
        },
        {
          title: "He atau She?",
          blocks: [
            { type: "pictures", items: [{ pic: "boy", label: "he" }, { pic: "girl", label: "she" }] },
            {
              type: "table",
              head: ["Untuk", "Pakai", "Contoh"],
              rows: [
                ["Laki-laki 👨👦👴", "He", "He is my brother."],
                ["Perempuan 👩👧👵", "She", "She is my mother."],
              ],
            },
            { type: "text", md: "Kalimat **This is my …** dipakai untuk menunjukkan atau mengenalkan seseorang: *This is my sister.* = Ini saudara perempuanku." },
            { type: "try", question: pick("sd3-b2-l2-try", "Lengkapi: “____ is my grandfather.”", ["She", "He", "It", "I"], 1, "Grandfather (kakek) laki-laki → He.", { image: "grandfather" }) },
          ],
        },
      ],
      checkpoint: [
        pick("sd3-b2-l2-c1", "“____ is my mother.”", ["He", "She", "They", "We"], 1, "Mother perempuan → She.", { image: "mother" }),
        listenPick("sd3-b2-l2-c2", say(["woman", "This is my brother."]), "Dengarkan. Siapa yang dikenalkan?", ["Ayah", "Saudara laki-laki", "Nenek", "Saudara perempuan"], 1, "Brother = saudara laki-laki."),
        arrange("sd3-b2-l2-c3", "Susun kalimat ini.", "This is my father", "This is my + anggota keluarga."),
        fill("sd3-b2-l2-c4", "Isi dengan He atau She.", "", "is my sister.", ["she"], "Sister perempuan → She.", { image: "sister" }),
        pick("sd3-b2-l2-c5", "Temanmu bertanya “Who is she?” sambil menunjuk foto kakekmu. Apa yang salah?", ["Seharusnya “Who is he?”", "Seharusnya “What is it?”", "Tidak ada yang salah", "Seharusnya “How old are you?”"], 0, "Kakek laki-laki, jadi pertanyaan yang benar “Who is he?”", { hots: true }),
      ],
    },
    {
      id: "sd3-b2-l3",
      skill: "reading",
      title: "Reading — Raka's Family",
      summary: "Membaca cerita pendek tentang keluarga Raka dan menjawab pertanyaan.",
      minutes: 10,
      passages: [RAKA],
      sections: [
        {
          title: "Baca cerita Raka",
          blocks: [
            { type: "pictures", items: [{ pic: "father", label: "Pak Arif" }, { pic: "mother", label: "Bu Lina" }, { pic: "boy", label: "Raka" }, { pic: "sister", label: "Nisa" }], caption: "Keluarga Raka" },
            { type: "passage", passage: RAKA },
            { type: "text", md: "Kata **His** dipakai untuk milik laki-laki (*his name* = namanya — laki-laki), **Her** untuk milik perempuan (*her name* = namanya — perempuan)." },
            { type: "try", question: pick("sd3-b2-l3-try", "Siapa nama ibu Raka?", ["Pak Arif", "Bu Lina", "Nisa", "Raka"], 1, "Baris 4: Her name is Bu Lina.", { passageId: RAKA.id }) },
          ],
        },
      ],
      checkpoint: [
        pick("sd3-b2-l3-c1", "Siapa nama ayah Raka?", ["Pak Arif", "Pak Budi", "Bu Lina", "Nisa"], 0, "Baris 3: His name is Pak Arif.", { passageId: RAKA.id }),
        pick("sd3-b2-l3-c2", "Berapa umur Nisa?", ["Tiga", "Empat", "Lima", "Delapan"], 2, "Baris 6: Nisa is five years old.", { passageId: RAKA.id }),
        fill("sd3-b2-l3-c3", "Isi dengan His atau Her.", "This is my mother.", "name is Bu Lina.", ["her"], "Mother perempuan → Her.", { passageId: RAKA.id }),
        pick("sd3-b2-l3-c4", "Raka punya berapa saudara perempuan?", ["Tidak punya", "Satu", "Dua", "Tiga"], 1, "Baris 5: I have one sister.", { passageId: RAKA.id }),
        pick("sd3-b2-l3-c5", "Ada berapa orang di keluarga Raka (termasuk Raka)?", ["Tiga", "Empat", "Lima", "Dua"], 1, "Ayah + ibu + Nisa + Raka = 4 orang.", { passageId: RAKA.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd3-b2-post",
    title: "Posttest Bab 2",
    passPercent: 70,
    passages: [RAKA],
    questions: [
      pick("sd3-b2-post1", "Nenek dalam bahasa Inggris adalah…", ["grandfather", "grandmother", "mother", "sister"], 1, "Grandmother = nenek."),
      listenPick("sd3-b2-post2", say(["man", "He is my father."]), "Dengarkan. Siapa yang dibicarakan?", ["pic:father", "pic:mother", "pic:sister", "pic:grandmother"], 0, "Father = ayah."),
      pick("sd3-b2-post3", "“____ is my brother.”", ["She", "He", "Her", "His"], 1, "Brother laki-laki → He.", { image: "brother" }),
      arrange("sd3-b2-post4", "Susun kalimat ini.", "She is my grandmother", "She is my + anggota keluarga perempuan."),
      pair("sd3-b2-post5", "Pasangkan.", [["father", "ayah"], ["sister", "saudara perempuan"], ["baby", "bayi"], ["grandfather", "kakek"]], "Kerja bagus!"),
      pick("sd3-b2-post6", "Siapa adik Raka?", ["Bu Lina", "Nisa", "Pak Arif", "Dina"], 1, "Baris 5: I have one sister. She is Nisa.", { passageId: RAKA.id }),
      pick("sd3-b2-post7", "Andi punya 1 kakak perempuan dan 2 adik laki-laki. Berapa anak di keluarga Andi?", ["Tiga", "Empat", "Dua", "Lima"], 1, "1 kakak + 2 adik + Andi sendiri = 4 anak. Jangan lupa hitung Andi, ya!", { hots: true }),
      pick("sd3-b2-post8", "Ibu dari ibumu kamu panggil…", ["grandmother", "sister", "baby", "brother"], 0, "Ibunya ibu = nenek = grandmother.", { hots: true }),
    ],
  },
};
