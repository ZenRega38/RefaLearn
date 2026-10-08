import "server-only";
import type { Exam, Passage } from "@/lib/course/types";
import { KEY, completion, partA, rq, wrong } from "./helpers";

const { A, B, C, D } = KEY;

const TIDES: Passage = {
  id: "pre-p-tides",
  title: "Tides",
  lines: [
    "Tides are the regular rise and fall of the ocean's surface. They are",
    "caused mainly by the gravitational pull of the Moon, and to a lesser",
    "extent by that of the Sun. Because the Earth rotates, most coastal",
    "places experience two high tides and two low tides every day. The",
    "difference in height between high and low tide is called the tidal",
    "range. In some narrow bays the range can exceed ten meters, while in",
    "open ocean it may be less than one meter. Fishermen and sailors have",
    "always paid close attention to tides, since a boat that is safe at high",
    "tide can become stuck in the mud a few hours later.",
  ],
};

const SLEEP: Passage = {
  id: "pre-p-sleep",
  title: "Why We Sleep",
  lines: [
    "Scientists still debate exactly why humans need sleep, but research has",
    "revealed several of its functions. During sleep, the brain organizes",
    "memories formed during the day, which helps people learn. Sleep also",
    "allows the body to repair tissues and to strengthen the immune system.",
    "People who regularly sleep less than six hours a night are more likely",
    "to have trouble concentrating, and they catch colds more easily.",
    "Teenagers appear to need more sleep than adults, yet many of them go",
    "to bed late and wake early for school, so they are often short of rest.",
  ],
};

export const PRETEST: Exam = {
  kind: "pretest",
  title: "Pretest TOEFL ITP",
  description:
    "Tes diagnostik 40 soal (±40 menit) dengan format yang sama seperti TOEFL ITP. Hasilnya berupa estimasi skor dan peta kekuatan-kelemahan Anda — gratis.",
  sections: [
    {
      skill: "listening",
      title: "Section 1: Listening Comprehension",
      minutes: 10,
      directions:
        "Anda akan mendengar percakapan pendek, lalu sebuah pertanyaan. Audio hanya diputar SATU KALI. Pilih jawaban terbaik dari empat pilihan.",
      parts: [{ title: "Part A", directions: "Short conversations", questionIds: ["pre-l1", "pre-l2", "pre-l3", "pre-l4", "pre-l5", "pre-l6", "pre-l7", "pre-l8", "pre-l9", "pre-l10"] }],
      questions: [
        partA("pre-l1", [["man", "Could you help me move these boxes?"], ["woman", "I'd be glad to, after lunch."]], "What does the woman mean?",
          ["She will help later.", "She is too busy to help.", "She already had lunch.", "The boxes are too heavy."], A, "Dia mau membantu setelah makan siang."),
        partA("pre-l2", [["woman", "The bookstore was out of the textbook."], ["man", "Why don't you check the library?"]], "What does the man suggest?",
          ["Buying a different book", "Looking for the book in the library", "Asking the professor", "Going back to the bookstore"], B, "“Check the library” = cari di perpustakaan."),
        partA("pre-l3", [["man", "I heard the field trip was canceled."], ["woman", "No, it's just been postponed until next week."]], "What does the woman mean?",
          ["The trip will happen later.", "The trip was canceled.", "The trip is this week.", "She won't go on the trip."], A, "Postponed = ditunda, bukan dibatalkan."),
        partA("pre-l4", [["woman", "Is Professor Tan's class always this crowded?"], ["man", "It's not unusual."]], "What does the man mean?",
          ["The class is rarely crowded.", "The class is often crowded.", "The professor is unusual.", "He is not in the class."], B, "Not unusual = biasa/sering terjadi."),
        partA("pre-l5", [["man", "How did your presentation go?"], ["woman", "I couldn't have asked for a better response."]], "What does the woman mean?",
          ["The presentation went very well.", "She didn't ask any questions.", "The audience didn't respond.", "She wants to give it again."], A, "“Couldn't have asked for better” = sangat baik."),
        partA("pre-l6", [["woman", "Let's take a walk along the beach."], ["man", "I'd rather stay in and rest. I've been working all day."]], "What does the man mean?",
          ["He wants to work at the beach.", "He prefers to stay inside.", "He has rested all day.", "He will walk to work."], B, "“I'd rather stay in” = lebih suka di dalam. ‘Work’/‘walk’ jebakan bunyi."),
        partA("pre-l7", [["man", "Did you finish reading the novel?"], ["woman", "I've barely started it."]], "What does the woman mean?",
          ["She finished the novel.", "She has read very little of it.", "She didn't like the novel.", "She lent the novel to someone."], B, "Barely started = baru saja mulai."),
        partA("pre-l8", [["woman", "The bus is late again."], ["man", "We'd better take a taxi, or we'll miss the movie."]], "What does the man suggest?",
          ["Waiting for the bus", "Taking a taxi", "Missing the movie", "Walking to the theater"], B, "Dia menyarankan naik taksi."),
        partA("pre-l9", [["man", "This soup needs a little salt."], ["woman", "Here, I'll pass it to you."]], "What will the woman probably do?",
          ["Make more soup", "Give the man the salt", "Pass the soup to someone else", "Taste the soup"], B, "Dia akan memberikan garam."),
        partA("pre-l10", [["woman", "You look tired."], ["man", "I stayed up all night finishing my paper."]], "What does the man mean?",
          ["He slept well.", "He did not sleep last night.", "He hasn't started his paper.", "He is going to bed early."], B, "Stayed up all night = tidak tidur semalaman."),
      ],
    },
    {
      skill: "structure",
      title: "Section 2: Structure and Written Expression",
      minutes: 12,
      directions:
        "Soal 1–7: pilih jawaban yang melengkapi kalimat. Soal 8–15: pilih bagian bergaris bawah yang harus diperbaiki agar kalimat benar.",
      parts: [
        { title: "Structure", directions: "Lengkapi kalimat", questionIds: ["pre-s1", "pre-s2", "pre-s3", "pre-s4", "pre-s5", "pre-s6", "pre-s7"] },
        { title: "Written Expression", directions: "Temukan bagian yang salah", questionIds: ["pre-s8", "pre-s9", "pre-s10", "pre-s11", "pre-s12", "pre-s13", "pre-s14", "pre-s15"] },
      ],
      questions: [
        completion("pre-s1", "____ grows well in tropical climates.", ["Rice", "Rice that", "Because rice", "It is rice"], A, "Kalimat butuh subjek untuk ‘grows’."),
        completion("pre-s2", "The Kayan River ____ through the forests of North Kalimantan.", ["flowing", "flows", "to flow", "which flows"], B, "Subjek sudah ada; butuh verb utama."),
        completion("pre-s3", "In the early morning, ____ gather at the fish market.", ["traders", "of traders", "traders who", "when traders"], A, "Setelah frasa preposisi, butuh subjek."),
        completion("pre-s4", "____, the hornbill is a symbol of Borneo.", ["A large bird with a curved beak", "It is a large bird", "Is a large bird", "Being large"], A, "Appositive (frasa benda)."),
        completion("pre-s5", "The students ____ the experiment carefully before writing their report.", ["repeating", "repeated", "to repeat", "repetition"], B, "Butuh verb utama → repeated."),
        completion("pre-s6", "____ the rain, the ceremony continued outdoors.", ["Despite", "Although", "Because", "It was"], A, "‘Despite’ (preposisi) + kata benda ‘the rain’. ‘Although’ butuh klausa."),
        completion("pre-s7", "Most of the houses in the village ____ built on stilts.", ["is", "are", "being", "has"], B, "‘Most of the houses’ = jamak → are."),
        wrong("pre-s8", "The [A:number] of visitors to the [B:islands] [C:have increased] [D:sharply].", "C", "has increased", "‘The number of …’ tunggal → has increased."),
        wrong("pre-s9", "[A:Many] [B:scientist] [C:study] the [D:rainforest].", "B", "scientists", "‘Many’ + jamak."),
        wrong("pre-s10", "The [A:teacher], [B:she] a graduate [C:of the university], [D:explained] the lesson.", "B", "hapus ‘she’", "Appositive tidak memakai subjek tambahan."),
        wrong("pre-s11", "[A:Every] house on the street [B:have] [C:a small] [D:garden].", "B", "has", "‘Every house’ tunggal → has."),
        wrong("pre-s12", "The [A:sound] of the waves [B:help] people [C:relax] [D:at night].", "B", "helps", "Subjek = the sound (tunggal)."),
        wrong("pre-s13", "[A:Two] [B:student] [C:won] [D:the competition].", "B", "students", "‘Two’ + jamak."),
        wrong("pre-s14", "[A:During] the [B:festival] the streets [C:is] [D:full of people].", "C", "are", "Subjek = the streets (jamak)."),
        wrong("pre-s15", "The [A:information] in these [B:reports] [C:are] [D:accurate].", "C", "is", "Subjek = the information (tak terhitung, tunggal)."),
      ],
    },
    {
      skill: "reading",
      title: "Section 3: Reading Comprehension",
      minutes: 18,
      directions: "Baca setiap bacaan, lalu jawab pertanyaan berdasarkan apa yang dinyatakan atau tersirat di dalamnya.",
      passages: [TIDES, SLEEP],
      parts: [
        { title: "Passage 1", directions: "Tides", questionIds: ["pre-r1", "pre-r2", "pre-r3", "pre-r4", "pre-r5", "pre-r6", "pre-r7", "pre-r8"] },
        { title: "Passage 2", directions: "Why We Sleep", questionIds: ["pre-r9", "pre-r10", "pre-r11", "pre-r12", "pre-r13", "pre-r14", "pre-r15"] },
      ],
      questions: [
        rq("pre-r1", TIDES.id, "What is the passage mainly about?", ["How fishermen catch fish", "What tides are and why they matter", "The orbit of the Moon", "Dangerous bays around the world"], B, "Bacaan menjelaskan tides dan dampaknya."),
        rq("pre-r2", TIDES.id, "According to the passage, tides are caused mainly by", ["wind", "the Sun", "the Moon", "earthquakes"], C, "Baris 2: mainly by the Moon."),
        rq("pre-r3", TIDES.id, "The phrase “to a lesser extent” in lines 2–3 is closest in meaning to", ["more strongly", "less strongly", "at the same time", "more often"], B, "Matahari berpengaruh lebih kecil."),
        rq("pre-r4", TIDES.id, "How many high tides do most coastal places have each day?", ["One", "Two", "Three", "Four"], B, "Baris 4: two high tides."),
        rq("pre-r5", TIDES.id, "The “tidal range” is", ["the time between two tides", "the difference in height between high and low tide", "the area covered by water", "the speed of the tide"], B, "Baris 5–6."),
        rq("pre-r6", TIDES.id, "The word “exceed” in line 6 is closest in meaning to", ["be more than", "be less than", "equal", "measure"], A, "Exceed = melebihi."),
        rq("pre-r7", TIDES.id, "The word “it” in line 7 refers to", ["the range", "the bay", "the ocean", "the meter"], A, "‘…in open ocean it may be less than one meter’ — it = the (tidal) range."),
        rq("pre-r8", TIDES.id, "It can be inferred that sailors watch the tides because", ["tides affect fish prices", "a boat may become stuck at low tide", "tides change the weather", "boats move faster at high tide"], B, "Baris 8–9."),
        rq("pre-r9", SLEEP.id, "What is the main idea of the passage?", ["Teenagers go to bed too late.", "Sleep has several important functions.", "Colds are caused by lack of sleep.", "Scientists agree on why we sleep."], B, "Bacaan membahas fungsi-fungsi tidur."),
        rq("pre-r10", SLEEP.id, "According to the passage, during sleep the brain", ["stops working", "organizes memories", "forgets the day's events", "repairs the immune system alone"], B, "Baris 2–3."),
        rq("pre-r11", SLEEP.id, "The word “revealed” in line 2 is closest in meaning to", ["hidden", "shown", "doubted", "repeated"], B, "Revealed = menunjukkan."),
        rq("pre-r12", SLEEP.id, "The word “they” in line 6 refers to", ["colds", "hours", "people who sleep less than six hours", "scientists"], C, "Orang yang tidur kurang dari enam jam lebih mudah terkena flu."),
        rq("pre-r13", SLEEP.id, "Which of the following is NOT mentioned as a function of sleep?", ["Organizing memories", "Repairing tissues", "Strengthening the immune system", "Improving eyesight"], D, "Penglihatan tidak disebutkan."),
        rq("pre-r14", SLEEP.id, "The phrase “short of rest” in line 8 is closest in meaning to", ["well rested", "not getting enough sleep", "taking short naps", "waking up late"], B, "Kurang istirahat."),
        rq("pre-r15", SLEEP.id, "Which statement about scientists is supported by the passage?", ["They fully understand sleep.", "They disagree about the exact reasons for sleep.", "They recommend less sleep for teenagers.", "They have stopped studying sleep."], B, "Baris 1: still debate exactly why."),
      ],
    },
  ],
};
