import "server-only";
import type { ExamSection } from "@/lib/course/types";
import { KEY, partA, say, spokenQ } from "./helpers";

const { A, B, C } = KEY;

const ids = (prefix: string, from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => `${prefix}${from + i}`);

// ---------------------------------------------------------------------------
// Part B — two longer conversations
// ---------------------------------------------------------------------------

const CONV1 = say(
  ["narrator", "Questions 31 through 34. Listen to a conversation between two students."],
  ["woman", "Hi, Daniel. Are you going to the career fair on Thursday?"],
  ["man", "I wasn't planning to. I'm only a second-year student, so I thought it was mainly for people who are about to graduate."],
  ["woman", "That's what I thought too, but my advisor said a lot of companies are looking for summer interns. Some of them only take second- and third-year students."],
  ["man", "Really? I'd love to get some experience this summer. Do I need to bring anything?"],
  ["woman", "You should bring copies of your résumé. The career center will review it for free if you go by before Wednesday afternoon."],
  ["man", "That's great. Mine hasn't been updated since high school. I'll stop by tomorrow morning."],
  ["woman", "Good idea. And dress neatly. First impressions matter, even for internships."]
);

const CONV2 = say(
  ["narrator", "Questions 35 through 38. Listen to a conversation in a university office."],
  ["man", "Excuse me, I'd like to change my dormitory room. Is this the right office?"],
  ["woman", "Yes, it is. Is there a problem with your current room?"],
  ["man", "Well, it's right next to the elevator, and the noise keeps me awake. I have an early class every day, so I really need to sleep."],
  ["woman", "I understand. Unfortunately, all the single rooms are full this semester. I could put you on a waiting list, or you could move to a double room on a quieter floor."],
  ["man", "I'd prefer a single room. How long is the waiting list?"],
  ["woman", "Usually a few weeks. Students often move out after the first month. Meanwhile, the library sells earplugs at the front desk. They might help."],
  ["man", "All right. Please put my name on the list."]
);

// ---------------------------------------------------------------------------
// Part C — three talks
// ---------------------------------------------------------------------------

const TALK1 = say(
  ["narrator", "Questions 39 through 42. Listen to part of a lecture in a biology class."],
  ["woman", "Today we'll look at a remarkable animal found in the forests of Borneo: the proboscis monkey. It's easy to recognize because adult males have a very large nose, which can hang down below the mouth. Scientists believe the large nose helps males make louder calls, and females seem to prefer males with bigger noses. Proboscis monkeys live almost entirely near rivers and mangrove swamps. They are excellent swimmers, and they even have partly webbed feet. Their diet consists mostly of young leaves and unripe fruit. Unfortunately, their numbers have fallen sharply because the coastal forests where they live are being cleared for farms and settlements. For that reason, they are now listed as an endangered species."]
);

const TALK2 = say(
  ["narrator", "Questions 43 through 46. Listen to a talk given by a tour guide."],
  ["man", "Good morning, everyone, and welcome to the old harbor district. Before we begin, let me tell you a little about the area. A hundred years ago, this was the busiest part of the city. Ships arrived here every day carrying rice, timber, and oil. Most of the buildings you see along this street were warehouses. Today, many of them have been turned into cafés, galleries, and small hotels. Our walk will take about two hours. We'll stop at the maritime museum at around eleven, where you can see models of the ships that once used this harbor. Please stay with the group and keep your tickets, because you'll need them to enter the museum."]
);

const TALK3 = say(
  ["narrator", "Questions 47 through 50. Listen to part of a talk in a history class."],
  ["woman", "Last week we discussed early trade routes in Southeast Asia. Today I want to focus on one product that shaped the region's history: spices. In the sixteenth century, cloves and nutmeg grew in only a few small islands in eastern Indonesia, the Maluku Islands. Because these spices were used to flavor and preserve food, they were extremely valuable in Europe — sometimes worth more than their weight in gold. European powers competed fiercely to control the spice trade. The Portuguese arrived first, followed by the Spanish and later the Dutch, who eventually took control of most of the islands. For your next assignment, please read chapter seven and write a one-page summary of how the spice trade affected the local population."]
);

export const TRYOUT_LISTENING: ExamSection = {
  skill: "listening",
  title: "Section 1: Listening Comprehension",
  minutes: 35,
  directions:
    "Bagian ini menguji kemampuan Anda memahami bahasa Inggris lisan. Audio dan pertanyaan HANYA diputar SATU KALI dan tidak tertulis. Pilih jawaban terbaik dari empat pilihan yang tertera.",
  parts: [
    { title: "Part A", directions: "Anda akan mendengar percakapan pendek antara dua orang. Setelah setiap percakapan, narator mengajukan pertanyaan.", questionIds: ids("t-l", 1, 30) },
    { title: "Part B", directions: "Anda akan mendengar percakapan yang lebih panjang. Setelah setiap percakapan, ada beberapa pertanyaan.", questionIds: ids("t-l", 31, 38) },
    { title: "Part C", directions: "Anda akan mendengar beberapa ceramah atau pembicaraan. Setelah setiap pembicaraan, ada beberapa pertanyaan.", questionIds: ids("t-l", 39, 50) },
  ],
  questions: [
    // ---------------- Part A ----------------
    partA("t-l1", [["man", "Do you want to join us for dinner tonight?"], ["woman", "I wish I could, but I have to work late."]], "What does the woman mean?",
      ["She will join them later.", "She cannot go to dinner.", "She wants to eat at work.", "She has already eaten."], B, "“I wish I could, but…” = menolak dengan sopan."),
    partA("t-l2", [["woman", "Have you seen the new art exhibit downtown?"], ["man", "Not yet, but I've heard it's worth seeing."]], "What does the man mean?",
      ["He has heard good things about the exhibit.", "He did not like the exhibit.", "He works at the exhibit.", "The exhibit has closed."], A, "“Worth seeing” = layak dilihat."),
    partA("t-l3", [["man", "I can't find my keys anywhere."], ["woman", "Did you check your jacket pocket?"]], "What does the woman suggest?",
      ["Buying a new jacket", "Looking in his jacket", "Making new keys", "Checking the door"], B, "Menyarankan memeriksa saku jaket."),
    partA("t-l4", [["woman", "The line at the cafeteria is really long."], ["man", "Then let's eat at the food court instead."]], "What does the man suggest?",
      ["Waiting in line", "Eating somewhere else", "Skipping lunch", "Cooking at home"], B, "Instead = di tempat lain."),
    partA("t-l5", [["man", "Is Professor Ruiz's class difficult?"], ["woman", "Only if you don't keep up with the readings."]], "What does the woman mean?",
      ["The class is always difficult.", "Doing the readings makes the class manageable.", "The professor gives no readings.", "She dropped the class."], B, "Kelasnya tidak sulit asal mengikuti bacaan."),
    partA("t-l6", [["woman", "Did you remember to call the dentist?"], ["man", "Oh no, it completely slipped my mind."]], "What does the man mean?",
      ["He forgot to call.", "He fell on the way to the dentist.", "He called twice.", "His mind is on the dentist."], A, "Slipped my mind = lupa."),
    partA("t-l7", [["man", "How was the weather on your trip?"], ["woman", "It couldn't have been better."]], "What does the woman mean?",
      ["The weather was excellent.", "The weather was terrible.", "She doesn't remember the weather.", "It rained a little."], A, "Couldn't have been better = sangat bagus."),
    partA("t-l8", [["woman", "Are you taking the bus to the airport?"], ["man", "My brother is giving me a ride."]], "What does the man mean?",
      ["He will ride the bus.", "His brother will drive him.", "He is going to ride a bicycle.", "His brother is flying today."], B, "Giving me a ride = mengantar dengan kendaraan."),
    partA("t-l9", [["man", "This printer is out of paper again."], ["woman", "There's a new pack in the supply closet."]], "What does the woman mean?",
      ["The printer is broken.", "More paper is available in the closet.", "She will buy a new printer.", "The closet is locked."], B, "Ada kertas baru di lemari persediaan."),
    partA("t-l10", [["woman", "I'm thinking of dropping my statistics course."], ["man", "Why don't you talk to a tutor first?"]], "What does the man suggest?",
      ["Getting help before deciding", "Dropping the course immediately", "Becoming a tutor", "Taking another statistics course"], A, "Bicara dengan tutor dulu = cari bantuan sebelum memutuskan."),
    partA("t-l11", [["man", "Did you like the movie?"], ["woman", "I've seen better."]], "What does the woman mean?",
      ["She thought the movie was excellent.", "She was not impressed by the movie.", "She saw it twice.", "She prefers watching movies at home."], B, "“I've seen better” = kurang bagus."),
    partA("t-l12", [["woman", "Are the lab results ready?"], ["man", "They should be in by Friday at the latest."]], "What does the man mean?",
      ["The results were late last Friday.", "The results will be ready no later than Friday.", "The lab is closed on Friday.", "He doesn't know when the results will come."], B, "At the latest = paling lambat."),
    partA("t-l13", [["man", "The air conditioner in our room isn't working."], ["woman", "I'll report it to the maintenance office right away."]], "What will the woman probably do?",
      ["Fix the air conditioner herself", "Tell maintenance about the problem", "Move to another room", "Open the windows"], B, "Melapor ke bagian pemeliharaan."),
    partA("t-l14", [["woman", "Are you ready for the history exam?"], ["man", "I'm as ready as I'll ever be."]], "What does the man mean?",
      ["He has prepared as much as he can.", "He hasn't studied at all.", "The exam has been canceled.", "He will be ready next week."], A, "Sudah bersiap semampunya."),
    partA("t-l15", [["man", "Can I borrow your calculator?"], ["woman", "Sorry, I lent it to Maya this morning."]], "What does the woman mean?",
      ["She doesn't have the calculator now.", "Maya lent her a calculator.", "She will buy a calculator.", "The calculator is broken."], A, "Kalkulatornya sedang dipinjam Maya."),
    partA("t-l16", [["woman", "That restaurant is always so busy."], ["man", "We'd better make a reservation, then."]], "What does the man suggest?",
      ["Going to a different restaurant", "Booking a table in advance", "Arriving very late", "Eating at home"], B, "Make a reservation = memesan tempat."),
    partA("t-l17", [["man", "I heard you're moving to Jakarta."], ["woman", "Not until the end of the year."]], "What does the woman mean?",
      ["She is moving very soon.", "She will move later in the year.", "She has decided not to move.", "She just moved to Jakarta."], B, "Pindah akhir tahun, belum sekarang."),
    partA("t-l18", [["woman", "Did you finish the crossword puzzle?"], ["man", "All except the last two clues."]], "What does the man mean?",
      ["He finished the whole puzzle.", "He almost finished the puzzle.", "He only did two clues.", "He didn't start the puzzle."], B, "Hampir selesai."),
    partA("t-l19", [["man", "Should I bring a gift to the party?"], ["woman", "It's not necessary, but it would be a nice gesture."]], "What does the woman mean?",
      ["A gift is required.", "A gift is optional but appreciated.", "He should not bring a gift.", "She will bring the gift."], B, "Tidak wajib, tapi baik."),
    partA("t-l20", [["woman", "The bookstore is having a sale this week."], ["man", "Then I'll wait until then to buy my textbooks."]], "What will the man probably do?",
      ["Buy his textbooks during the sale", "Borrow textbooks from the library", "Sell his textbooks", "Buy his textbooks online today"], A, "Membeli buku saat diskon."),
    partA("t-l21", [["man", "How did you do on the chemistry test?"], ["woman", "Better than I expected."]], "What does the woman mean?",
      ["She did poorly.", "She was pleasantly surprised by her score.", "She expected to get a perfect score.", "She hasn't received her score."], B, "Hasilnya lebih baik dari dugaan."),
    partA("t-l22", [["woman", "Let's take the stairs instead of the elevator."], ["man", "On the twelfth floor? You must be joking."]], "What does the man imply?",
      ["He agrees to take the stairs.", "He thinks the stairs are too much.", "The elevator is broken.", "He lives on the second floor."], B, "Lantai 12 terlalu tinggi untuk naik tangga."),
    partA("t-l23", [["man", "Has the package arrived yet?"], ["woman", "It came while you were out."]], "What does the woman mean?",
      ["The package was delivered.", "The package is lost.", "She went out to get the package.", "The package will arrive soon."], A, "Paket sudah datang."),
    partA("t-l24", [["woman", "Do you know how to get to the stadium?"], ["man", "I'm new here myself."]], "What does the man imply?",
      ["He can give directions.", "He doesn't know the way.", "He is going to the stadium.", "He works at the stadium."], B, "Dia juga baru di sini → tidak tahu jalan."),
    partA("t-l25", [["man", "This report has to be finished by tomorrow."], ["woman", "Then we'll have to stay late tonight."]], "What does the woman mean?",
      ["They will work late to finish the report.", "The deadline is next week.", "They should start tomorrow.", "She cannot stay late."], A, "Lembur untuk menyelesaikan laporan."),
    partA("t-l26", [["woman", "Was the concert crowded?"], ["man", "There wasn't an empty seat in the hall."]], "What does the man mean?",
      ["The concert was canceled.", "The hall was full.", "Many seats were empty.", "He could not find the hall."], B, "Tidak ada kursi kosong = penuh."),
    partA("t-l27", [["man", "I've been trying to reach Professor Kim all day."], ["woman", "She's at a conference until Monday."]], "What does the woman mean?",
      ["The professor will return on Monday.", "The professor is in her office.", "The conference is on Monday.", "The man should go to the conference."], A, "Kembali hari Senin."),
    partA("t-l28", [["woman", "Did you enjoy the hike?"], ["man", "The view from the top made it all worthwhile."]], "What does the man mean?",
      ["The hike was not worth the effort.", "The view made the hike worth it.", "He didn't reach the top.", "He prefers to look at photos."], B, "Pemandangan membuat usahanya sepadan."),
    partA("t-l29", [["man", "Should I turn in the assignment today?"], ["woman", "The deadline has been extended until next week."]], "What does the woman mean?",
      ["He must submit it today.", "He has more time to submit it.", "The assignment was canceled.", "Next week's class is canceled."], B, "Tenggat diperpanjang."),
    partA("t-l30", [["woman", "I'm going to the post office. Do you need anything?"], ["man", "Could you mail this letter for me?"]], "What does the man ask the woman to do?",
      ["Buy him some stamps", "Send a letter for him", "Wait for him", "Pick up a package"], B, "Mengirimkan surat."),

    // ---------------- Part B ----------------
    spokenQ("t-l31", "What are the speakers mainly discussing?",
      ["A job at the career center", "An upcoming career fair", "Their final exams", "A summer vacation"], B, "Topik utama: career fair hari Kamis.", CONV1),
    spokenQ("t-l32", "Why did the man not plan to attend the event?",
      ["He already has a job.", "He thought it was mainly for students about to graduate.", "He has a class on Thursday.", "He doesn't need experience."], B, "Dia mengira acara itu untuk calon lulusan."),
    spokenQ("t-l33", "What does the woman say about some companies?",
      ["They are hiring only graduates.", "They want summer interns.", "They will visit on Wednesday.", "They pay for résumé reviews."], B, "Banyak perusahaan mencari pemagang musim panas."),
    spokenQ("t-l34", "What will the man probably do tomorrow morning?",
      ["Buy new clothes", "Have his résumé reviewed", "Attend the career fair", "Meet his advisor"], B, "Dia akan mampir ke career center untuk review résumé."),
    spokenQ("t-l35", "Why does the man want to change his room?",
      ["It is too small.", "It is too noisy.", "It is too far from his classes.", "He wants a roommate."], B, "Dekat lift dan berisik.", CONV2),
    spokenQ("t-l36", "What does the woman say about single rooms?",
      ["They are more expensive.", "None are available now.", "They are on the top floor.", "Only first-year students can have them."], B, "Semua kamar single penuh."),
    spokenQ("t-l37", "According to the woman, why might a room become available?",
      ["The dormitory is being expanded.", "Students often move out after the first month.", "A new building will open.", "Some students are graduating early."], B, "Mahasiswa sering pindah setelah bulan pertama."),
    spokenQ("t-l38", "What does the man decide to do?",
      ["Move to a double room", "Join the waiting list", "Buy earplugs only", "Live off campus"], B, "Dia minta dimasukkan ke daftar tunggu."),

    // ---------------- Part C ----------------
    spokenQ("t-l39", "What is the lecture mainly about?",
      ["Rivers in Borneo", "The proboscis monkey", "Mangrove trees", "Endangered birds"], B, "Topik: proboscis monkey (bekantan).", TALK1),
    spokenQ("t-l40", "According to the speaker, what may the male's large nose help with?",
      ["Finding food", "Swimming", "Making louder calls", "Climbing trees"], C, "Hidung besar diduga membantu suara lebih keras."),
    spokenQ("t-l41", "What does the speaker say about the monkeys' feet?",
      ["They are very long.", "They are partly webbed.", "They are used for digging.", "They have no claws."], B, "Kakinya sebagian berselaput."),
    spokenQ("t-l42", "Why are the monkeys endangered?",
      ["They are hunted for food.", "Their habitat is being cleared.", "They cannot find enough water.", "They have few young."], B, "Hutan pesisir dibuka untuk pertanian dan permukiman."),
    spokenQ("t-l43", "Who is the speaker?",
      ["A ship captain", "A tour guide", "A museum director", "A hotel manager"], B, "Pemandu wisata.", TALK2),
    spokenQ("t-l44", "What were most of the buildings on the street originally used for?",
      ["Hotels", "Warehouses", "Cafés", "Offices"], B, "Dulu gudang."),
    spokenQ("t-l45", "What will the group see at the museum?",
      ["Old photographs", "Models of ships", "Rice and timber", "Paintings of the harbor"], B, "Model kapal."),
    spokenQ("t-l46", "Why should the listeners keep their tickets?",
      ["To get a discount at the café", "To enter the museum", "To ride a boat", "To leave the tour early"], B, "Tiket diperlukan untuk masuk museum."),
    spokenQ("t-l47", "What is the main topic of the talk?",
      ["The history of the spice trade", "How to cook with spices", "The geography of Europe", "Modern farming in Maluku"], A, "Sejarah perdagangan rempah.", TALK3),
    spokenQ("t-l48", "According to the speaker, why were spices so valuable in Europe?",
      ["They were used as medicine only.", "They flavored and preserved food.", "They were used as money.", "They grew everywhere."], B, "Untuk penyedap dan pengawet makanan."),
    spokenQ("t-l49", "Which European power eventually controlled most of the islands?",
      ["The Portuguese", "The Spanish", "The Dutch", "The English"], C, "Belanda akhirnya menguasai sebagian besar pulau."),
    spokenQ("t-l50", "What are the students asked to do for the next assignment?",
      ["Visit the Maluku Islands", "Write a summary of the spice trade's effects on local people", "Read chapter six", "Give a presentation"], B, "Membaca bab 7 dan menulis ringkasan satu halaman."),
  ],
};

