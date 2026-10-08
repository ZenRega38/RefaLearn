import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trMatch, trPick, tryIt, vocab, voice, writing } from "../kit";

// Grade 4 (Fase B). Chapter 3 — Jobs · Chapter 4 — Places in Town

const MY_MOM: Passage = {
  id: "sd4-c3-mom",
  title: "My Mother Is a Nurse",
  pic: "nurse",
  lines: [
    "My name is Sinta. My mother is a nurse.",
    "She works in a hospital in Samarinda.",
    "She helps the doctors and takes care of sick people.",
    "She wears a white uniform and a white cap.",
    "She goes to work at seven o'clock in the morning.",
    "Sometimes she works at night too.",
    "I am proud of my mother. I want to be a doctor!",
  ],
};

export const CH3: Level = {
  id: "sd4-ch3",
  title: "Chapter 3 — Jobs",
  description: "Name jobs and workplaces, say what people do, and use a/an: She is a nurse. He is an engineer.",
  targetScore: "Vocabulary · Speaking · Reading",
  cover: ["doctor", "chef", "firefighter"],
  pretest: {
    id: "sd4-c3-pre",
    title: "Chapter 3 Pretest",
    passPercent: 0,
    questions: [
      pick("sd4-c3-pre1", "Who is this?", ["a doctor", "a farmer", "a pilot", "a chef"], 0, "Dokter = doctor.", { image: "doctor" }),
      listen("sd4-c3-pre2", voice("A pilot flies a plane."), "Listen. Choose the picture.", ["pic:pilot", "pic:chef", "pic:farmer", "pic:police"], 0, "Pilot menerbangkan pesawat."),
      trPick("sd4-c3-pre3", "“Petani” in English is…", ["farmer", "driver", "teacher", "doctor"], 0, "Petani = farmer."),
      pick("sd4-c3-pre4", "Where does a teacher work?", ["at a school", "at a hospital", "on a farm", "in a plane"], 0, "Guru bekerja di sekolah.", { image: "school" }),
      pick("sd4-c3-pre5", "Who cooks food in a restaurant?", ["a chef", "a nurse", "a pilot", "a farmer"], 0, "Chef memasak di restoran.", { image: "restaurant" }),
    ],
  },
  lessons: [
    {
      id: "sd4-c3-l1",
      skill: "vocabulary",
      title: "People at Work",
      summary: "Doctor, nurse, teacher, police officer, farmer, chef, pilot, firefighter, driver.",
      sections: [
        {
          title: "Jobs",
          blocks: [
            vocab([
              ["doctor", "dokter", "doctor", "A doctor helps sick people."],
              ["nurse", "perawat", "nurse", "A nurse works with doctors."],
              ["teacher", "guru", "teacher-woman", "A teacher teaches students."],
              ["police officer", "polisi", "police", "A police officer keeps us safe."],
              ["farmer", "petani", "farmer", "A farmer grows rice."],
              ["chef", "koki", "chef", "A chef cooks food."],
              ["pilot", "pilot", "pilot", "A pilot flies a plane."],
              ["firefighter", "pemadam kebakaran", "firefighter", "A firefighter puts out fires."],
              ["driver", "sopir", "driver", "A driver drives a bus."],
            ]),
            repeat(["doctor", "nurse", "teacher", "police officer", "farmer", "chef", "pilot", "firefighter", "driver"]),
          ],
        },
        {
          title: "A or an?",
          blocks: [
            text("Sebelum nama pekerjaan pakai **a**. Kalau diawali **bunyi vokal** (a, e, i, o, u), pakai **an**: *a doctor*, *a pilot*, tapi *an engineer*, *an artist*, *an astronaut*."),
            table(["a", "an"], [["a doctor", "an engineer"], ["a farmer", "an artist"], ["a chef", "an astronaut"]]),
            tryIt(pick("sd4-c3-l1-try1", "My uncle is ___ engineer.", ["an", "a", "the"], 0, "Engineer diawali bunyi vokal → an.")),
          ],
        },
      ],
      checkpoint: [
        listen("sd4-c3-l1-c1", voice("Firefighter."), "Listen. Choose the picture.", ["pic:firefighter", "pic:police", "pic:nurse"], 0, "Firefighter = pemadam kebakaran."),
        pick("sd4-c3-l1-c2", "Who is this?", ["a farmer", "a pilot", "a driver"], 0, "Topi caping → petani = farmer.", { image: "farmer" }),
        match("sd4-c3-l1-c3", "Match.", [["pic:chef", "chef"], ["pic:nurse", "nurse"], ["pic:police", "police officer"], ["pic:driver", "driver"]], "Kamu kenal semua pekerjaan!"),
        trPick("sd4-c3-l1-c4", "“Perawat” in English is…", ["nurse", "doctor", "chef"], 0, "Perawat = nurse."),
        pick("sd4-c3-l1-c5", "She is ___ artist.", ["an", "a", "two"], 0, "Artist diawali vokal → an."),
        pick("sd4-c3-l1-c6", "There is a fire! Who do we call?", ["firefighters", "chefs", "pilots"], 0, "Kebakaran → pemadam kebakaran.", { hots: true, image: "fireworks" }),
      ],
    },
    {
      id: "sd4-c3-l2",
      skill: "speaking",
      title: "What Does She Do?",
      summary: "What does your mother do? She is a… She works in a…",
      sections: [
        {
          title: "Ask about jobs",
          blocks: [
            audio("Talking about parents", say(["woman", "What does your father do?"], ["man", "He is a police officer. He works at the police station."], ["woman", "Cool! My mother is a chef. She works in a restaurant."], ["man", "Wow! Does she cook nasi goreng?"], ["woman", "Yes, she does. It's delicious!"])),
            table(["Question", "Answer"], [["What does he do?", "He is a pilot."], ["Where does he work?", "He works at the airport."], ["What does she do?", "She is a nurse."], ["Where does she work?", "She works in a hospital."]]),
            tip("**What does he/she do?** menanyakan pekerjaan. Jawabannya **He/She is a …**. Ingat: *he work**s***, *she work**s*** (pakai -s)."),
          ],
        },
        {
          title: "Workplaces",
          blocks: [
            pics([["hospital", "hospital"], ["school", "school"], ["restaurant", "restaurant"], ["police-station", "police station"]]),
            tryIt(match("sd4-c3-l2-try1", "Match the job and the workplace.", [["doctor", "hospital"], ["teacher", "school"], ["chef", "restaurant"], ["farmer", "rice field"]], "Doctor di hospital, teacher di school, chef di restaurant, farmer di sawah (rice field).")),
            speaking({
              id: "sd4-c3-l2-say",
              title: "My family's jobs",
              prompt: "Talk about two people in your family: what they do and where they work.",
              image: "father",
              seconds: 45,
              tips: ["My father is a … He works in/at …", "My mother is a … She works in/at …"],
              models: [{ label: "Example", text: "My father is a driver. He drives a bus every day. My mother is a teacher. She works at a primary school." }],
              rubric: ["I said two jobs with **a/an**.", "I said where they work.", "I used **works** (with -s) for he/she."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("sd4-c3-l2-c1", say(["woman", "What does your father do?"], ["man", "He is a pilot."]), "Listen. What does his father do?", ["pilot", "doctor", "chef"], 0, "He is a pilot."),
        arrange("sd4-c3-l2-c2", "Put the words in order.", "What does your mother do", "What does + orang + do?"),
        pick("sd4-c3-l2-c3", "She ___ in a hospital.", ["works", "work", "working"], 0, "She + works."),
        fill("sd4-c3-l2-c4", "Complete: A teacher works at a ___ .", "A teacher works at a", ".", ["school"], "Guru bekerja di sekolah."),
        trPick("sd4-c3-l2-c5", "“Apa pekerjaan ayahmu?” in English is…", ["What does your father do?", "Where is your father?", "How old is your father?"], 0, "Pekerjaan → What does … do?"),
        pick("sd4-c3-l2-c6", "“He grows vegetables and rice.” What is his job?", ["farmer", "pilot", "nurse"], 0, "Menanam sayur dan padi → petani.", { hots: true }),
      ],
    },
    {
      id: "sd4-c3-l3",
      skill: "reading",
      title: "Reading: My Mother Is a Nurse",
      summary: "Read about a job and write about your dream job.",
      passages: [MY_MOM],
      sections: [
        {
          title: "Sinta's mother",
          blocks: [
            { type: "passage", passage: MY_MOM },
            audio("Listen and read", say(["woman", MY_MOM.lines.join(" ")])),
            tryIt(pick("sd4-c3-l3-try1", "Where does Sinta's mother work?", ["in a hospital", "at a school", "in a restaurant"], 0, "Baris 2.", { passageId: MY_MOM.id })),
          ],
        },
        {
          title: "My dream job",
          blocks: [
            text("Kalimat **I want to be a …** dipakai untuk menyebut cita-cita: *I want to be a pilot.*"),
            writing({
              id: "sd4-c3-l3-write",
              title: "My dream job",
              prompt: "Write about the job you want. Say what the job is, where you will work, and why you like it.",
              image: "pilot",
              minWords: 30,
              maxWords: 90,
              tips: ["I want to be a/an …", "A … works in/at …", "A … helps / makes / drives …", "I like this job because …"],
              models: [{ label: "Example", text: "I want to be a chef. A chef works in a restaurant. A chef cooks delicious food for people. I like this job because I love cooking with my mother." }],
              rubric: ["I used **I want to be a/an …**.", "I said where the person works.", "I said what the person does.", "I gave a reason with **because**."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd4-c3-l3-c1", "What does Sinta's mother do?", ["She is a nurse.", "She is a doctor.", "She is a teacher."], 0, "Baris 1.", { passageId: MY_MOM.id }),
        pickMany("sd4-c3-l3-c2", "Choose ALL the things she does.", ["helps the doctors", "takes care of sick people", "cooks in a restaurant", "flies a plane"], [0, 1], "Baris 3.", { passageId: MY_MOM.id }),
        fill("sd4-c3-l3-c3", "Complete.", "She wears a white uniform and a white", ".", ["cap"], "Baris 4.", { passageId: MY_MOM.id }),
        pick("sd4-c3-l3-c4", "What does Sinta want to be?", ["a doctor", "a nurse", "a chef"], 0, "Baris 7.", { passageId: MY_MOM.id }),
        pick("sd4-c3-l3-c5", "“Sometimes she works at night too.” Why do hospitals need nurses at night?", ["Sick people need help all day and night.", "Nurses like the dark.", "Hospitals close at night."], 0, "Pasien butuh perawatan 24 jam.", { passageId: MY_MOM.id, hots: true }),
        pick("sd4-c3-l3-c6", "How does Sinta feel about her mother?", ["proud", "angry", "scared"], 0, "Baris 7: I am proud of my mother.", { passageId: MY_MOM.id }),
      ],
    },
  ],
  quiz: {
    id: "sd4-c3-post",
    title: "Chapter 3 Posttest",
    passPercent: 70,
    passages: [MY_MOM],
    questions: [
      pick("sd4-c3-post1", "Who is this?", ["a chef", "a doctor", "a nurse", "a farmer"], 0, "Topi koki → chef.", { image: "chef" }),
      listen("sd4-c3-post2", voice("She takes care of sick people in a hospital."), "Listen. What is her job?", ["nurse", "pilot", "farmer", "driver"], 0, "Merawat orang sakit di rumah sakit → nurse."),
      trPick("sd4-c3-post3", "“Sopir” in English is…", ["driver", "pilot", "doctor", "chef"], 0, "Sopir = driver."),
      pick("sd4-c3-post4", "He is ___ astronaut.", ["an", "a", "the", "two"], 0, "Astronaut diawali vokal → an."),
      arrange("sd4-c3-post5", "Put the words in order.", "She works in a restaurant", "She works in a + tempat."),
      match("sd4-c3-post6", "Match.", [["pilot", "plane"], ["farmer", "rice field"], ["doctor", "hospital"], ["teacher", "school"]], "Bagus!"),
      pick("sd4-c3-post7", "What time does Sinta's mother go to work?", ["at seven o'clock", "at nine o'clock", "at night only", "at noon"], 0, "Baris 5.", { passageId: MY_MOM.id }),
      fill("sd4-c3-post8", "Complete: I want to ___ a firefighter.", "I want to", "a firefighter.", ["be"], "I want to be = aku ingin menjadi."),
      pick("sd4-c3-post9", "A man wears a uniform and a cap. He helps people on the road and catches thieves. What is he?", ["a police officer", "a chef", "a nurse", "a farmer"], 0, "Membantu di jalan dan menangkap pencuri → polisi.", { hots: true }),
      pick("sd4-c3-post10", "Which job would help MOST after a flood?", ["doctors and firefighters", "chefs only", "pilots only", "artists"], 0, "Setelah banjir, orang butuh pertolongan dan kesehatan.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Who Am I?",
    questions: [
      live("sd4-c3-live1", "Who is this?", ["a pilot", "a chef", "a farmer", "a nurse"], 0, "pilot"),
      live("sd4-c3-live2", "Who is this?", ["a firefighter", "a police officer", "a doctor", "a driver"], 0, "firefighter"),
      live("sd4-c3-live3", "A ___ grows rice.", ["farmer", "pilot", "nurse", "chef"], 0, "farmer"),
      live("sd4-c3-live4", "She is ___ engineer.", ["an", "a", "the", "one"], 0, "teacher-woman"),
      live("sd4-c3-live5", "A doctor works in a…", ["hospital", "restaurant", "farm", "plane"], 0, "hospital"),
      live("sd4-c3-live6", "What does he ___? He is a chef.", ["do", "does", "is", "work"], 0, "chef"),
      live("sd4-c3-live7", "He ___ at a school.", ["works", "work", "working", "worked to"], 0, "teacher-man"),
      live("sd4-c3-live8", "Who is this?", ["a police officer", "a pilot", "a chef", "a farmer"], 0, "police"),
    ],
  },
};

const TOWN: Passage = {
  id: "sd4-c4-town",
  title: "My Town",
  pic: "map",
  lines: [
    "I live in a small town. It is clean and friendly.",
    "There is a big park in the middle of the town.",
    "The library is next to the park. I read books there on Saturday.",
    "The hospital is opposite the library.",
    "The supermarket is between the post office and the restaurant.",
    "My school is behind the park.",
    "I walk to school every day. I love my town!",
  ],
};

export const CH4: Level = {
  id: "sd4-ch4",
  title: "Chapter 4 — Places in Town",
  description: "Name places in town, say where they are (next to, between, opposite, behind, in front of), and ask Where is…?",
  targetScore: "Listening · Reading · Writing",
  cover: ["map", "hospital", "park"],
  pretest: {
    id: "sd4-c4-pre",
    title: "Chapter 4 Pretest",
    passPercent: 0,
    questions: [
      pick("sd4-c4-pre1", "What place is this?", ["a hospital", "a school", "a park", "a library"], 0, "Tanda palang merah → hospital.", { image: "hospital" }),
      listen("sd4-c4-pre2", voice("Library."), "Listen. Choose the place.", ["pic:library", "pic:restaurant", "pic:park", "pic:hospital"], 0, "Library = perpustakaan."),
      trPick("sd4-c4-pre3", "“Kantor pos” in English is…", ["post office", "police station", "supermarket", "museum"], 0, "Kantor pos = post office."),
      pick("sd4-c4-pre4", "Where do you buy food and soap?", ["at the supermarket", "at the library", "at the hospital", "at the museum"], 0, "Belanja di supermarket.", { image: "cart" }),
      pick("sd4-c4-pre5", "“Next to” means…", ["di sebelah", "di belakang", "di depan", "di antara"], 0, "Next to = di sebelah.", { translate: true }),
    ],
  },
  lessons: [
    {
      id: "sd4-c4-l1",
      skill: "vocabulary",
      title: "Places in Town",
      summary: "Hospital, library, post office, supermarket, restaurant, police station, park, museum.",
      sections: [
        {
          title: "Around town",
          blocks: [
            vocab([
              ["hospital", "rumah sakit", "hospital", "Sick people go to the hospital."],
              ["library", "perpustakaan", "library", "We borrow books at the library."],
              ["post office", "kantor pos", "post-office", "I send letters at the post office."],
              ["supermarket", "supermarket", "supermarket", "We buy food at the supermarket."],
              ["restaurant", "restoran", "restaurant", "We eat dinner at a restaurant."],
              ["police station", "kantor polisi", "police-station", "Police officers work at the police station."],
              ["park", "taman", "park", "Children play in the park."],
              ["museum", "museum", "museum", "We see old things at the museum."],
            ]),
            repeat(["hospital", "library", "post office", "supermarket", "restaurant", "police station", "park", "museum"]),
          ],
        },
        {
          title: "What do we do there?",
          blocks: [
            table(["Place", "We…"], [["library", "read and borrow books"], ["post office", "send letters and parcels"], ["supermarket", "buy food and things"], ["hospital", "see a doctor"], ["park", "play and relax"], ["museum", "learn about history"]]),
            tryIt(pick("sd4-c4-l1-try1", "You want to borrow a book. Where do you go?", ["the library", "the restaurant", "the post office"], 0, "Pinjam buku → perpustakaan.", { image: "open-book" })),
          ],
        },
      ],
      checkpoint: [
        listen("sd4-c4-l1-c1", voice("Supermarket."), "Listen. Choose the place.", ["pic:supermarket", "pic:museum", "pic:library"], 0, "Supermarket."),
        pick("sd4-c4-l1-c2", "What place is this?", ["a post office", "a police station", "a hospital"], 0, "Tanda amplop → post office.", { image: "post-office" }),
        match("sd4-c4-l1-c3", "Match the place and what we do.", [["library", "read books"], ["restaurant", "eat"], ["post office", "send letters"], ["park", "play"]], "Tepat!"),
        trPick("sd4-c4-l1-c4", "“Perpustakaan” in English is…", ["library", "laboratory", "bookstore"], 0, "Perpustakaan = library."),
        fill("sd4-c4-l1-c5", "Complete: We see old things at the ___ .", "We see old things at the", ".", ["museum"], "Benda kuno → museum."),
        pick("sd4-c4-l1-c6", "Your bike was stolen. Where do you go?", ["the police station", "the museum", "the park"], 0, "Kehilangan/pencurian → kantor polisi.", { hots: true }),
      ],
    },
    {
      id: "sd4-c4-l2",
      skill: "listening",
      title: "Where Is the Library?",
      summary: "Next to, between, opposite, behind, in front of.",
      sections: [
        {
          title: "Position words",
          blocks: [
            table(["English", "Meaning", "Example"], [
              ["next to", "di sebelah", "The library is next to the park."],
              ["between", "di antara", "The bank is between the school and the park."],
              ["opposite", "di seberang", "The hospital is opposite the library."],
              ["behind", "di belakang", "My school is behind the park."],
              ["in front of", "di depan", "The bus stop is in front of the school."],
            ]),
            pics([["next-to", "next to"], ["under", "under"], ["on", "on"]]),
            repeat(["next to the park", "between the school and the park", "opposite the library", "behind the park", "in front of the school"]),
          ],
        },
        {
          title: "Asking the way",
          blocks: [
            audio("Excuse me…", say(["man", "Excuse me. Where is the post office?"], ["woman", "It's next to the supermarket, opposite the museum."], ["man", "Thank you very much!"], ["woman", "You're welcome."])),
            tip("Mulai dengan **Excuse me** (permisi) saat bertanya ke orang asing. Lalu **Where is the …?**"),
            tryIt(pick("sd4-c4-l2-try1", "Where is the post office?", ["next to the supermarket", "behind the museum", "between the parks"], 0, "It's next to the supermarket, opposite the museum.")),
          ],
        },
      ],
      checkpoint: [
        listen("sd4-c4-l2-c1", say(["man", "Where is the bank?"], ["woman", "It's between the school and the park."]), "Listen. Where is the bank?", ["between the school and the park", "next to the school", "behind the park"], 0, "Between = di antara."),
        trMatch("sd4-c4-l2-c2", "Match.", [["next to", "di sebelah"], ["opposite", "di seberang"], ["behind", "di belakang"], ["in front of", "di depan"]], "Posisi-posisi penting!"),
        arrange("sd4-c4-l2-c3", "Put the words in order.", "Excuse me where is the hospital", "Excuse me, where is the hospital?"),
        fill("sd4-c4-l2-c4", "Complete: The car is in ___ of the house.", "The car is in", "of the house.", ["front"], "In front of = di depan."),
        pick("sd4-c4-l2-c5", "A is next to B. B is next to C. Where is B?", ["between A and C", "behind A", "opposite C"], 0, "B berada di antara A dan C.", { hots: true }),
        pick("sd4-c4-l2-c6", "Someone says “Thank you very much!”. You say…", ["You're welcome.", "Excuse me.", "Where is it?"], 0, "Balasan terima kasih → You're welcome."),
      ],
    },
    {
      id: "sd4-c4-l3",
      skill: "reading",
      title: "Reading: My Town",
      summary: "Read a description of a town and draw it in your head.",
      passages: [TOWN],
      sections: [
        {
          title: "Read and imagine",
          blocks: [
            { type: "passage", passage: TOWN },
            audio("Listen and read", say(["man", TOWN.lines.join(" ")])),
            tip("Saat membaca, gambar petanya di kertas. Tempat mana yang ada di tengah? Mana yang di seberang?"),
            tryIt(pick("sd4-c4-l3-try1", "What is next to the park?", ["the library", "the hospital", "the supermarket"], 0, "Baris 3.", { passageId: TOWN.id })),
          ],
        },
        {
          title: "Describe your neighborhood",
          blocks: [
            writing({
              id: "sd4-c4-l3-write",
              title: "My neighborhood",
              prompt: "Write about the places near your house. Use at least three position words.",
              image: "map",
              minWords: 35,
              maxWords: 100,
              tips: ["There is a … near my house.", "The … is next to / opposite / behind / between …", "I go to the … to …"],
              models: [{ label: "Example", text: "There is a mosque near my house. The mosque is next to a small shop. My school is opposite the shop. There is a park behind my school. I play football in the park every Sunday." }],
              rubric: ["I named at least four places.", "I used three different position words.", "I said what I do at one place."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("sd4-c4-l3-c1", "What is in the middle of the town?", ["a big park", "the hospital", "the school"], 0, "Baris 2.", { passageId: TOWN.id }),
        pick("sd4-c4-l3-c2", "What is opposite the library?", ["the hospital", "the park", "the restaurant"], 0, "Baris 4.", { passageId: TOWN.id }),
        fill("sd4-c4-l3-c3", "Complete.", "The supermarket is", "the post office and the restaurant.", ["between"], "Baris 5.", { passageId: TOWN.id }),
        pick("sd4-c4-l3-c4", "Where is the school?", ["behind the park", "next to the hospital", "opposite the supermarket"], 0, "Baris 6.", { passageId: TOWN.id }),
        pick("sd4-c4-l3-c5", "When does the writer read books at the library?", ["on Saturday", "every day", "on Monday"], 0, "Baris 3.", { passageId: TOWN.id }),
        pick("sd4-c4-l3-c6", "Why can the writer walk to school?", ["The school is near, behind the park.", "There are no buses.", "The school is far away."], 0, "Sekolah dekat (di belakang taman), jadi bisa jalan kaki.", { passageId: TOWN.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "sd4-c4-post",
    title: "Chapter 4 Posttest",
    passPercent: 70,
    passages: [TOWN],
    questions: [
      pick("sd4-c4-post1", "What place is this?", ["a library", "a hospital", "a park", "a museum"], 0, "Tanda buku → library.", { image: "library" }),
      listen("sd4-c4-post2", voice("We send letters here."), "Listen. Which place is it?", ["pic:post-office", "pic:restaurant", "pic:park", "pic:hospital"], 0, "Mengirim surat → kantor pos."),
      trPick("sd4-c4-post3", "“Di antara” in English is…", ["between", "behind", "opposite", "next to"], 0, "Di antara = between."),
      pick("sd4-c4-post4", "The hospital is ___ the library. (di seberang)", ["opposite", "behind", "between", "in"], 0, "Di seberang = opposite.", { translate: true }),
      arrange("sd4-c4-post5", "Put the words in order.", "The park is next to the library", "The … is next to the …"),
      listen("sd4-c4-post6", say(["woman", "Excuse me. Where is the museum?"], ["man", "It's behind the post office."]), "Listen. Where is the museum?", ["behind the post office", "next to the post office", "opposite the post office", "in front of the post office"], 0, "Behind = di belakang."),
      pick("sd4-c4-post7", "How does the writer go to school?", ["on foot", "by bus", "by car", "by bike"], 0, "Baris 7: I walk to school.", { passageId: TOWN.id }),
      fill("sd4-c4-post8", "Complete: Children play in the ___ .", "Children play in the", ".", ["park"], "Bermain di taman."),
      pick("sd4-c4-post9", "The supermarket is between the post office and the restaurant. Which TWO places are next to the supermarket?", ["the post office and the restaurant", "the park and the library", "the hospital and the school", "the museum and the park"], 0, "Between A and B → A dan B ada di sebelahnya.", { passageId: TOWN.id, hots: true }),
      pick("sd4-c4-post10", "A tourist asks you the way. What is the most polite start?", ["Excuse me, can I help you?", "Go away!", "What?", "No."], 0, "Sopan kepada wisatawan: Excuse me, can I help you?", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Around Town",
    questions: [
      live("sd4-c4-live1", "What place is this?", ["hospital", "school", "library", "museum"], 0, "hospital"),
      live("sd4-c4-live2", "We borrow books at the…", ["library", "restaurant", "hospital", "post office"], 0, "library"),
      live("sd4-c4-live3", "We send letters at the…", ["post office", "park", "museum", "hospital"], 0, "post-office"),
      live("sd4-c4-live4", "“Di belakang” is…", ["behind", "between", "beside", "before"], 0, "park", true),
      live("sd4-c4-live5", "A is between B and C. A is in the…", ["middle", "back", "top", "front"], 0, "map"),
      live("sd4-c4-live6", "Polite start: ___ me, where is the bank?", ["Excuse", "Sorry", "Thank", "Please"], 0, "map"),
      live("sd4-c4-live7", "What place is this?", ["supermarket", "museum", "police station", "library"], 0, "supermarket"),
      live("sd4-c4-live8", "We see old things at the…", ["museum", "restaurant", "supermarket", "park"], 0, "museum"),
    ],
  },
};
