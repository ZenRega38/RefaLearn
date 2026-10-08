import "server-only";
import type { ExamSection, Passage } from "@/lib/course/types";
import { KEY, rq } from "./helpers";

const { A, B, C, D } = KEY;

const ids = (prefix: string, from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => `${prefix}${from + i}`);

const WALLACE: Passage = {
  id: "t-p1",
  title: "The Wallace Line",
  lines: [
    "In the 1850s, the British naturalist Alfred Russel Wallace spent eight",
    "years traveling through the islands of what is now Indonesia. While",
    "collecting specimens, he noticed something puzzling. The animals on Bali",
    "were very similar to those found in mainland Asia, yet on Lombok, an",
    "island only about thirty-five kilometers to the east, many of the animals",
    "resembled those of Australia. Wallace proposed that an invisible boundary",
    "ran between the two islands and continued north between Borneo and",
    "Sulawesi. This boundary later became known as the Wallace Line.",
    "Modern geology explains what Wallace could only observe. During the ice",
    "ages, sea levels were much lower than they are today, and the islands west",
    "of the line were joined to Asia by land. Animals could simply walk across.",
    "The deep channel between Bali and Lombok, however, never dried up, so most",
    "land animals could not cross it. Birds and bats, of course, were less",
    "restricted, which is why the line is sharper for mammals than for flying",
    "species. Wallace's observations helped lay the foundation of biogeography,",
    "the study of how living things are distributed across the planet.",
  ],
};

const BEES: Passage = {
  id: "t-p2",
  title: "How Honeybees Share Information",
  lines: [
    "When a honeybee discovers a rich source of food, it returns to the hive",
    "and performs a series of movements known as the waggle dance. The dance",
    "tells the other bees both the direction and the distance of the flowers.",
    "During the dance, the bee runs in a straight line while shaking its body",
    "from side to side, then circles back and repeats the run. The angle of",
    "the straight run, compared with the vertical direction of the honeycomb,",
    "shows the angle of the food source compared with the position of the sun.",
    "The length of the run indicates distance: the longer the waggle, the",
    "farther away the food. Other bees follow the dancer closely and then fly",
    "directly to the flowers, often without searching. This remarkable system",
    "was first explained by the Austrian scientist Karl von Frisch, who",
    "received a Nobel Prize in 1973 for his work on animal behavior. Recent",
    "studies suggest that young bees must practice before their dances become",
    "accurate, showing that the behavior is partly learned.",
  ],
};

const PRINTING: Passage = {
  id: "t-p3",
  title: "Movable Type",
  lines: [
    "Most people associate the invention of printing with Johannes Gutenberg,",
    "who built a printing press in Germany around 1450. However, printing",
    "with movable type had been developed in Asia several centuries earlier.",
    "In the eleventh century, a Chinese craftsman named Bi Sheng made",
    "individual characters out of baked clay. Each character could be",
    "arranged into lines of text, inked, and pressed onto paper, and then",
    "rearranged for a new page. Later, printers in Korea cast type in metal,",
    "which was more durable than clay. A Korean Buddhist text printed in 1377",
    "is the oldest surviving book made with metal movable type. Movable type",
    "spread more slowly in East Asia than in Europe, partly because written",
    "Chinese uses thousands of different characters, whereas European",
    "alphabets need only a few dozen letters. Gutenberg's contribution was",
    "to combine metal type with a press adapted from those used to make wine",
    "and oil, and with an oil-based ink that stuck well to metal. Together,",
    "these improvements made printing fast and cheap enough to transform",
    "European society.",
  ],
};

const VOLCANO: Passage = {
  id: "t-p4",
  title: "Living with Volcanoes",
  lines: [
    "Indonesia has more active volcanoes than any other country, and millions",
    "of people live on their slopes. At first this may seem surprising, since",
    "eruptions can be deadly. The reason is that volcanic soils are among the",
    "most fertile in the world. Ash from eruptions contains minerals such as",
    "potassium and phosphorus, which plants need to grow. As the ash weathers,",
    "these nutrients are released into the soil. On the island of Java, farmers",
    "can often harvest rice two or three times a year, and the high",
    "productivity of the land supports some of the densest rural populations",
    "on Earth. To reduce the risks, scientists monitor volcanoes constantly.",
    "They measure small earthquakes, changes in the shape of the mountain, and",
    "the gases it releases. When warning signs appear, officials can order",
    "people to evacuate. Such systems have saved many lives, although",
    "predicting the exact timing and size of an eruption remains difficult.",
  ],
};

const MUSIC: Passage = {
  id: "t-p5",
  title: "The Gamelan",
  lines: [
    "The gamelan is a traditional ensemble of Java and Bali consisting mainly",
    "of percussion instruments: bronze gongs, metal bars, and drums. Unlike a",
    "Western orchestra, a gamelan is usually built as a single set, and its",
    "instruments are tuned to one another rather than to a universal standard.",
    "As a result, an instrument from one gamelan often sounds out of tune when",
    "played with another set. Gamelan music is built in layers. A central",
    "melody is played by some instruments, while others play faster patterns",
    "that decorate it, and large gongs mark the end of each musical cycle.",
    "Traditionally, musicians learned by listening and imitating rather than by",
    "reading written notes, and many still do today. In the late nineteenth",
    "century, a gamelan performance at an international exhibition in Paris",
    "impressed the French composer Claude Debussy, and some scholars believe",
    "its influence can be heard in his later works. Today, gamelan groups can",
    "be found at universities around the world.",
  ],
};

export const TRYOUT_READING: ExamSection = {
  skill: "reading",
  title: "Section 3: Reading Comprehension",
  minutes: 55,
  directions:
    "Bagian ini berisi beberapa bacaan, masing-masing diikuti sejumlah pertanyaan. Jawab semua pertanyaan berdasarkan apa yang dinyatakan atau tersirat di dalam bacaan.",
  passages: [WALLACE, BEES, PRINTING, VOLCANO, MUSIC],
  parts: [
    { title: "Passage 1", directions: WALLACE.title!, questionIds: ids("t-r", 1, 10) },
    { title: "Passage 2", directions: BEES.title!, questionIds: ids("t-r", 11, 20) },
    { title: "Passage 3", directions: PRINTING.title!, questionIds: ids("t-r", 21, 30) },
    { title: "Passage 4", directions: VOLCANO.title!, questionIds: ids("t-r", 31, 40) },
    { title: "Passage 5", directions: MUSIC.title!, questionIds: ids("t-r", 41, 50) },
  ],
  questions: [
    // Passage 1 — Wallace Line
    rq("t-r1", WALLACE.id, "What does the passage mainly discuss?", ["The life of Alfred Russel Wallace", "A natural boundary between Asian and Australian animals", "The geography of Bali", "How birds migrate between islands"], B, "Bacaan menjelaskan Wallace Line dan penyebabnya."),
    rq("t-r2", WALLACE.id, "The word “puzzling” in line 3 is closest in meaning to", ["confusing", "amusing", "frightening", "obvious"], A, "Puzzling = membingungkan."),
    rq("t-r3", WALLACE.id, "According to the passage, the animals on Lombok", ["were identical to those on Bali", "often resembled Australian animals", "had come from mainland Asia", "were mostly birds"], B, "Baris 4–6."),
    rq("t-r4", WALLACE.id, "The word “those” in line 4 refers to", ["islands", "animals", "specimens", "years"], B, "‘…similar to those found in mainland Asia’ = animals."),
    rq("t-r5", WALLACE.id, "Where does the Wallace Line run, according to the passage?", ["Between Java and Sumatra", "Between Bali and Lombok and between Borneo and Sulawesi", "Along the coast of Australia", "Through the center of Borneo"], B, "Baris 6–8."),
    rq("t-r6", WALLACE.id, "According to the passage, why could animals reach the islands west of the line?", ["They were carried by people.", "The islands were joined to Asia by land when sea levels were low.", "They swam across narrow channels.", "The islands had no predators."], B, "Baris 9–11."),
    rq("t-r7", WALLACE.id, "The word “restricted” in line 14 is closest in meaning to", ["limited", "protected", "numerous", "endangered"], A, "Restricted = terbatas."),
    rq("t-r8", WALLACE.id, "Why is the line sharper for mammals than for birds?", ["Mammals are larger than birds.", "Birds could fly across the deep channel.", "Birds arrived on the islands earlier.", "Mammals avoided the coast."], B, "Burung dan kelelawar bisa menyeberang dengan terbang."),
    rq("t-r9", WALLACE.id, "It can be inferred from the passage that the channel between Bali and Lombok is", ["very shallow", "very deep", "a recent formation", "easy to cross on foot"], B, "Baris 12: “The deep channel … never dried up.”"),
    rq("t-r10", WALLACE.id, "According to the passage, biogeography is the study of", ["ancient sea levels", "how living things are distributed", "the formation of islands", "the history of exploration"], B, "Baris 15–16."),

    // Passage 2 — Honeybees
    rq("t-r11", BEES.id, "What is the main topic of the passage?", ["How bees make honey", "How bees communicate the location of food", "The life of Karl von Frisch", "Why bees are attracted to flowers"], B, "Bacaan menjelaskan waggle dance sebagai komunikasi lokasi makanan."),
    rq("t-r12", BEES.id, "According to the passage, the waggle dance tells other bees", ["the type of flower", "the direction and distance of food", "the number of bees needed", "the time of day"], B, "Baris 2–3."),
    rq("t-r13", BEES.id, "The word “it” in line 1 refers to", ["a honeybee", "a source", "food", "the hive"], A, "Lebah yang menemukan makanan kembali ke sarang."),
    rq("t-r14", BEES.id, "The angle of the straight run is compared with", ["the length of the run", "the vertical direction of the honeycomb", "the position of other bees", "the shape of the hive"], B, "Baris 5–6."),
    rq("t-r15", BEES.id, "According to the passage, a longer waggle indicates that the food is", ["more plentiful", "farther away", "closer to the sun", "of better quality"], B, "Baris 8–9."),
    rq("t-r16", BEES.id, "The word “directly” in line 10 is closest in meaning to", ["slowly", "straight", "together", "carefully"], B, "Directly = langsung, tanpa berputar."),
    rq("t-r17", BEES.id, "The word “remarkable” in line 10 is closest in meaning to", ["ordinary", "impressive", "simple", "ancient"], B, "Remarkable = mengagumkan."),
    rq("t-r18", BEES.id, "Karl von Frisch is mentioned in the passage because he", ["discovered a new species of bee", "first explained the waggle dance", "kept bees as a hobby", "disagreed with other scientists"], B, "Baris 10–12."),
    rq("t-r19", BEES.id, "What do recent studies suggest about the waggle dance?", ["It is performed only by older bees.", "It is partly learned through practice.", "It is less accurate than once thought.", "It is used only at night."], B, "Baris 13–14."),
    rq("t-r20", BEES.id, "Which of the following is NOT mentioned about the waggle dance?", ["The bee shakes its body.", "The bee circles back and repeats the run.", "Other bees follow the dancer.", "The dance is performed outside the hive."], D, "Tidak disebutkan tarian di luar sarang."),

    // Passage 3 — Movable type
    rq("t-r21", PRINTING.id, "What is the main point of the passage?", ["Gutenberg invented printing.", "Movable type was developed in Asia before Gutenberg, who improved printing in Europe.", "Chinese writing is very complex.", "Wine presses were used to print books."], B, "Gagasan utama: movable type sudah ada di Asia; Gutenberg menyempurnakannya."),
    rq("t-r22", PRINTING.id, "According to the passage, Bi Sheng made his characters from", ["wood", "metal", "baked clay", "stone"], C, "Baris 4–5."),
    rq("t-r23", PRINTING.id, "The word “individual” in line 5 is closest in meaning to", ["separate", "personal", "unusual", "large"], A, "Individual characters = karakter terpisah satu-satu."),
    rq("t-r24", PRINTING.id, "According to the passage, metal type was better than clay because it was", ["cheaper", "more durable", "lighter", "easier to make"], B, "Baris 7–8."),
    rq("t-r25", PRINTING.id, "The oldest surviving book printed with metal movable type was made in", ["China", "Korea", "Germany", "Japan"], B, "Baris 8–9."),
    rq("t-r26", PRINTING.id, "Why did movable type spread more slowly in East Asia?", ["Paper was expensive.", "Written Chinese uses thousands of characters.", "Governments banned it.", "Metal was rare."], B, "Baris 10–12."),
    rq("t-r27", PRINTING.id, "The word “whereas” in line 11 is closest in meaning to", ["because", "while", "therefore", "since"], B, "Whereas = sedangkan (kontras)."),
    rq("t-r28", PRINTING.id, "According to the passage, Gutenberg combined all of the following EXCEPT", ["metal type", "a press adapted from wine and oil presses", "an oil-based ink", "clay characters"], D, "Karakter tanah liat adalah teknik Bi Sheng."),
    rq("t-r29", PRINTING.id, "The word “those” in line 13 refers to", ["presses", "letters", "improvements", "alphabets"], A, "‘a press adapted from those used to make wine’ = presses."),
    rq("t-r30", PRINTING.id, "The author mentions Gutenberg in the first sentence most likely to", ["introduce a common belief that the passage then qualifies", "prove that he invented movable type", "describe his childhood", "compare him with Debussy"], A, "Penulis memulai dari anggapan umum, lalu meluruskannya."),

    // Passage 4 — Volcanoes
    rq("t-r31", VOLCANO.id, "What is the passage mainly about?", ["Why people live near volcanoes and how risks are managed", "The history of eruptions in Java", "How rice is grown", "The chemistry of ash"], A, "Alasan tinggal dekat gunung berapi dan cara mengurangi risiko."),
    rq("t-r32", VOLCANO.id, "According to the passage, volcanic soils are", ["poor in nutrients", "among the most fertile in the world", "too hot for farming", "found only in Java"], B, "Baris 3–4."),
    rq("t-r33", VOLCANO.id, "The word “weathers” in line 5 is closest in meaning to", ["breaks down", "becomes warm", "blows away", "turns wet"], A, "Weathers = lapuk/terurai."),
    rq("t-r34", VOLCANO.id, "Which minerals are mentioned in the passage?", ["Iron and calcium", "Potassium and phosphorus", "Gold and silver", "Sodium and sulfur"], B, "Baris 4–5."),
    rq("t-r35", VOLCANO.id, "According to the passage, farmers in Java can often", ["grow crops only once a year", "harvest rice two or three times a year", "avoid planting near volcanoes", "use ash as fuel"], B, "Baris 6–7."),
    rq("t-r36", VOLCANO.id, "The word “densest” in line 8 is closest in meaning to", ["poorest", "most crowded", "oldest", "most modern"], B, "Densest population = paling padat."),
    rq("t-r37", VOLCANO.id, "The word “it” in line 11 refers to", ["the mountain", "the shape", "the gas", "the earthquake"], A, "‘the gases it releases’ = gas yang dilepaskan gunung."),
    rq("t-r38", VOLCANO.id, "Which of the following is NOT mentioned as something scientists measure?", ["Small earthquakes", "Changes in the mountain's shape", "Gases released", "Rainfall on the slopes"], D, "Curah hujan tidak disebut."),
    rq("t-r39", VOLCANO.id, "The word “evacuate” in line 12 is closest in meaning to", ["leave the area", "build shelters", "plant crops", "measure gases"], A, "Evacuate = mengungsi."),
    rq("t-r40", VOLCANO.id, "What does the passage say about predicting eruptions?", ["It is now completely accurate.", "Exact timing and size are still hard to predict.", "It is no longer necessary.", "Only farmers can predict them."], B, "Baris 12–13."),

    // Passage 5 — Gamelan
    rq("t-r41", MUSIC.id, "What is the main topic of the passage?", ["Western orchestras", "The characteristics and influence of the gamelan", "The life of Claude Debussy", "How bronze is made"], B, "Ciri-ciri gamelan dan pengaruhnya."),
    rq("t-r42", MUSIC.id, "According to the passage, the gamelan consists mainly of", ["string instruments", "percussion instruments", "wind instruments", "voices"], B, "Baris 1–2."),
    rq("t-r43", MUSIC.id, "The word “universal” in line 4 is closest in meaning to", ["general", "local", "ancient", "musical"], A, "Universal standard = standar umum/baku."),
    rq("t-r44", MUSIC.id, "Why might an instrument sound out of tune with another gamelan set?", ["It is made of a different metal.", "Each set is tuned to itself rather than to a standard.", "It is played too fast.", "It was damaged in transport."], B, "Baris 3–6."),
    rq("t-r45", MUSIC.id, "The word “it” in line 8 refers to", ["the central melody", "the set", "the gong", "the cycle"], A, "‘faster patterns that decorate it’ = central melody."),
    rq("t-r46", MUSIC.id, "According to the passage, what do large gongs do?", ["Play the central melody", "Mark the end of each cycle", "Set the tempo at the start", "Accompany singers"], B, "Baris 8."),
    rq("t-r47", MUSIC.id, "How did gamelan musicians traditionally learn?", ["By reading written notes", "By listening and imitating", "At universities", "From recordings"], B, "Baris 9–10."),
    rq("t-r48", MUSIC.id, "The word “impressed” in line 12 is closest in meaning to", ["affected strongly", "disappointed", "confused", "annoyed"], A, "Impressed = sangat berkesan."),
    rq("t-r49", MUSIC.id, "What do some scholars believe about Debussy?", ["He played in a gamelan.", "His later music may show gamelan influence.", "He built a gamelan in Paris.", "He disliked the gamelan."], B, "Baris 12–13."),
    rq("t-r50", MUSIC.id, "Where would the paragraph following the passage most likely focus?", ["The chemistry of bronze", "Gamelan groups at universities today", "The history of Paris", "Western notation systems"], B, "Kalimat terakhir mengantar ke gamelan di universitas."),
  ],
};

