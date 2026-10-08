import "server-only";
import type { ExamSection } from "@/lib/course/types";
import { KEY, completion, wrong } from "./helpers";

const { A, B, C } = KEY;

const ids = (prefix: string, from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => `${prefix}${from + i}`);

export const TRYOUT_STRUCTURE: ExamSection = {
  skill: "structure",
  title: "Section 2: Structure and Written Expression",
  minutes: 25,
  directions:
    "This section is designed to measure your ability to recognize language that is appropriate for standard written English. Questions 1–15 are incomplete sentences: choose the word or phrase that best completes each sentence. In questions 16–40, each sentence has four underlined words or phrases: identify the ONE underlined word or phrase that must be changed in order for the sentence to be correct.",
  parts: [
    { title: "Structure", directions: "Choose the word or phrase that best completes the sentence.", questionIds: ids("t-s", 1, 15) },
    { title: "Written Expression", directions: "Identify the underlined word or phrase that must be changed.", questionIds: ids("t-s", 16, 40) },
  ],
  questions: [
    completion("t-s1", "____ is the largest island in Indonesia.", ["Kalimantan", "That Kalimantan", "Kalimantan, which", "Because Kalimantan"], A, "Kalimat butuh subjek untuk ‘is’."),
    completion("t-s2", "The first printed newspapers ____ in Europe in the early seventeenth century.", ["appearing", "appeared", "to appear", "which appeared"], B, "Butuh verb utama dalam bentuk lampau."),
    completion("t-s3", "____ the heavy traffic, we arrived on time.", ["Although", "Despite", "Even", "Because of"], B, "Despite + noun phrase; maknanya kontras (macet tapi tepat waktu)."),
    completion("t-s4", "Coral reefs, ____, are home to thousands of marine species.", ["they are often called rainforests of the sea", "often called the rainforests of the sea", "are often called rainforests", "which often call rainforests"], B, "Frasa participial/appositive tanpa subjek dan verb tambahan."),
    completion("t-s5", "Not until the 1990s ____ widely available to the public.", ["the internet became", "did the internet become", "the internet becoming", "became the internet"], B, "‘Not until …’ di awal kalimat memicu inversi: did + subjek + verb dasar."),
    completion("t-s6", "The more you practice, ____ you will become.", ["the more confident", "more confident", "the most confident", "most confidently"], A, "Pola ‘the + comparative …, the + comparative …’."),
    completion("t-s7", "Orchids are flowers ____ in almost every climate on Earth.", ["grow", "that grow", "they grow", "growing they"], B, "Klausa relatif ‘that grow’ menjelaskan ‘flowers’."),
    completion("t-s8", "____ the twentieth century, most people in rural areas traveled on foot or by boat.", ["Before", "It was before", "That before", "Before it"], A, "Preposisi + frasa waktu, lalu klausa utama."),
    completion("t-s9", "Scientists have discovered ____ some birds can recognize human faces.", ["what", "that", "which", "who"], B, "‘discover that + klausa’."),
    completion("t-s10", "The museum's collection includes paintings, sculptures, and ____.", ["ancient manuscripts", "manuscripts are ancient", "to collect manuscripts", "ancient manuscripts which"], A, "Struktur paralel: tiga kata benda."),
    completion("t-s11", "Rarely ____ snow in tropical lowlands.", ["there is", "is there", "there being", "it is"], B, "‘Rarely’ di awal kalimat → inversi: is there."),
    completion("t-s12", "____ more than seventy percent of the Earth's surface.", ["Water covers", "Water covering", "Covered by water", "That water covers"], A, "Butuh subjek + verb."),
    completion("t-s13", "The bridge, ____ in 1998, connects the two halves of the city.", ["completing", "was completed", "completed", "it was completed"], C, "Participle pasif ‘completed’ (= which was completed)."),
    completion("t-s14", "If the weather ____ good tomorrow, the ferry will leave on schedule.", ["will be", "is", "would be", "has been"], B, "Conditional tipe 1: if + present, will + verb."),
    completion("t-s15", "____ teachers in remote villages often work with very limited resources.", ["Because", "The", "Although", "It is"], B, "Butuh subjek: The teachers … work."),

    wrong("t-s16", "The [A:children] [B:was playing] [C:happily] [D:in the park].", "B", "were playing", "Subjek ‘children’ jamak → were."),
    wrong("t-s17", "[A:She] [B:has lived] in Tarakan [C:since] [D:five years].", "D", "for five years", "Durasi memakai ‘for’, titik waktu memakai ‘since’."),
    wrong("t-s18", "The [A:information] [B:provided] by the [C:guides] [D:were] useful.", "D", "was", "‘Information’ tak terhitung (tunggal) → was."),
    wrong("t-s19", "[A:Although] the test was [B:difficult], [C:but] most students [D:passed] it.", "C", "hapus ‘but’", "‘Although’ dan ‘but’ tidak dipakai bersamaan."),
    wrong("t-s20", "[A:The] Amazon is one of the [B:longest] [C:river] [D:in the world].", "C", "rivers", "‘One of the …’ + kata benda jamak."),
    wrong("t-s21", "He [A:suggested] that she [B:takes] the [C:earlier] [D:flight].", "B", "take", "Setelah ‘suggest that’, verb memakai bentuk dasar (subjunctive)."),
    wrong("t-s22", "[A:Each] of the [B:students] [C:have] [D:their own] locker.", "C", "has", "‘Each of …’ tunggal → has."),
    wrong("t-s23", "The [A:book] was [B:so] interesting [C:that] I couldn't [D:stopped] reading.", "D", "stop", "Setelah modal ‘couldn't’ → bentuk dasar."),
    wrong("t-s24", "[A:Mount] Kinabalu is [B:higher] [C:then] any other [D:peak] in Borneo.", "C", "than", "Perbandingan memakai ‘than’."),
    wrong("t-s25", "The [A:workers] [B:are] [C:repairing] the road [D:since] last month.", "B", "have been", "‘Since last month’ butuh present perfect continuous: have been repairing."),
    wrong("t-s26", "[A:Her] [B:advice] [C:were] always [D:helpful].", "C", "was", "‘Advice’ tak terhitung (tunggal) → was."),
    wrong("t-s27", "The [A:festival] [B:attracts] visitors [C:who] [D:comes] from many countries.", "D", "come", "‘Who’ merujuk ke ‘visitors’ (jamak) → come."),
    wrong("t-s28", "[A:Neither] the teacher [B:or] the students [C:knew] the [D:answer].", "B", "nor", "Pasangan ‘neither … nor’."),
    wrong("t-s29", "The [A:new] library is [B:more large] [C:than] the [D:old one].", "B", "larger", "Kata sifat satu suku kata → -er."),
    wrong("t-s30", "[A:Swimming], [B:hiking], and [C:to ride] bicycles are [D:popular] activities.", "C", "riding", "Struktur paralel: swimming, hiking, riding."),
    wrong("t-s31", "The [A:scientist] [B:who] [C:discovered] the vaccine [D:were] honored.", "D", "was", "Subjek ‘the scientist’ tunggal."),
    wrong("t-s32", "Fish [A:breathe] by [B:taking] oxygen [C:from] the water [D:passes] over their gills.", "D", "passing / that passes", "Butuh participle/klausa relatif: water passing over their gills."),
    wrong("t-s33", "[A:Despite of] the rain, the [B:match] [C:continued] [D:as planned].", "A", "Despite / In spite of", "‘Despite’ tidak diikuti ‘of’."),
    wrong("t-s34", "The [A:population] of the city has [B:growed] [C:rapidly] in [D:recent years].", "B", "grown", "Past participle ‘grow’ adalah ‘grown’."),
    wrong("t-s35", "[A:A] [B:honest] answer is [C:always] [D:appreciated].", "A", "An", "‘Honest’ diawali bunyi vokal → an."),
    wrong("t-s36", "She [A:is interesting] in [B:learning] about [C:ancient] [D:cultures].", "A", "is interested", "Perasaan seseorang → -ed (interested)."),
    wrong("t-s37", "The [A:number] of [B:student] [C:enrolled] this year [D:is] higher.", "B", "students", "‘The number of’ + kata benda jamak."),
    wrong("t-s38", "[A:Most] of the [B:furnitures] in the house [C:was] [D:made] of teak.", "B", "furniture", "‘Furniture’ tak terhitung."),
    wrong("t-s39", "The [A:project] must be [B:finish] [C:before] the end [D:of the month].", "B", "finished", "Pasif: must be + past participle."),
    wrong("t-s40", "[A:Every] [B:morning] he [C:drink] a cup of tea [D:before] work.", "C", "drinks", "Subjek ‘he’ → drinks."),
  ],
};

