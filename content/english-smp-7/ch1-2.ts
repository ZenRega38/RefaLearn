import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Grade 7 (SMP, Fase D). Chapter 1 — About Me · Chapter 2 — People Around Me

const PROFILE: Passage = {
  id: "smp7-c1-profile",
  title: "Hello from Kupang!",
  pic: "boy",
  lines: [
    "Hi everyone! My name is Yohanes Ndolu, but my friends call me Yo.",
    "I'm thirteen years old and I'm in Grade 7 at SMP Negeri 2 Kupang, East Nusa Tenggara.",
    "I was born on 2 August in Rote Island, but now I live in Kupang with my parents and my two sisters.",
    "My father is a fisherman and my mother has a small shop in front of our house.",
    "My favourite subject is science because I love doing experiments. I'm not very good at drawing!",
    "In my free time, I play the sasando, a traditional instrument from Rote. My grandfather taught me.",
    "I also like football. I'm a member of the school football team.",
    "I want to make friends with students from other islands. Please write to me!",
  ],
};

export const CH1: Level = {
  id: "smp7-ch1",
  title: "Chapter 1 — About Me",
  description: "Greet people formally and informally, introduce yourself and others, give personal information with be, pronouns and possessive adjectives.",
  targetScore: "Speaking · Structure · Writing",
  cover: ["hello", "boy", "girl"],
  pretest: {
    id: "smp7-c1-pre",
    title: "Chapter 1 Pretest",
    passPercent: 0,
    questions: [
      pick("smp7-c1-pre1", "You meet your new headmaster at 8 a.m. You say…", ["Good morning, sir.", "Hey, what's up?", "Good night, sir.", "See you, bro."], 0, "Formal dan pagi hari → Good morning, sir."),
      listen("smp7-c1-pre2", voice("Hi, I'm Dewi. I'm from Makassar."), "Listen. Where is Dewi from?", ["Makassar", "Medan", "Malang", "Manado"], 0, "I'm from Makassar."),
      trPick("smp7-c1-pre3", "“Senang bertemu denganmu.” in English is…", ["Nice to meet you.", "Nice to see you again.", "Nice to eat you.", "Meet you nice."], 0, "Pertemuan pertama → Nice to meet you."),
      pick("smp7-c1-pre4", "This is my friend. ___ name is Rudi.", ["His", "He", "Him", "He's"], 0, "Kepemilikan laki-laki → his."),
      pick("smp7-c1-pre5", "They ___ from Bali.", ["are", "is", "am", "be"], 0, "They + are."),
    ],
  },
  lessons: [
    {
      id: "smp7-c1-l1",
      skill: "speaking",
      title: "Greetings and Introductions",
      summary: "Formal and informal greetings, introducing yourself and other people, leave-taking.",
      sections: [
        {
          title: "Formal or informal?",
          blocks: [
            text("Dalam bahasa Inggris, kita memilih sapaan sesuai **lawan bicara**. Kepada guru, kepala sekolah, atau orang yang lebih tua: gunakan bentuk **formal**. Kepada teman sebaya: bentuk **informal** lebih alami."),
            table(["", "Formal", "Informal"], [["Greeting", "Good morning / afternoon / evening.", "Hi! / Hello! / Hey!"], ["Asking about condition", "How are you?", "How's it going? / What's up?"], ["Answering", "I'm very well, thank you. And you?", "Not bad. / Pretty good. / I'm fine."], ["Leave-taking", "Goodbye. Have a nice day.", "Bye! / See you later! / Take care!"]]),
            warn("**Good night** bukan sapaan bertemu. Itu ucapan **berpisah** di malam hari atau sebelum tidur. Untuk bertemu di malam hari, pakai **Good evening**."),
            pics([["morning", "Good morning"], ["afternoon", "Good afternoon"], ["evening", "Good evening"], ["night", "Good night (goodbye)"]]),
          ],
        },
        {
          title: "Introducing yourself and others",
          blocks: [
            table(["Function", "Expressions"], [["Introducing yourself", "Let me introduce myself. My name is … / I'm …"], ["Introducing someone", "This is my friend, … / I'd like you to meet …"], ["Responding", "Nice to meet you. — Nice to meet you, too."], ["Asking for details", "Where are you from? / Which class are you in? / Where do you live?"]]),
            audio("First day of school", say(["woman", "Good morning, everyone. My name is Mrs. Tari, and I'm your English teacher this year."], ["man", "Good morning, Mrs. Tari. I'm Bima. Nice to meet you."], ["woman", "Nice to meet you too, Bima. Who is sitting next to you?"], ["man", "This is my friend, Lusi. We went to the same primary school."], ["woman", "Hi, Lusi! Welcome to Grade 7."])),
            tryIt(pick("smp7-c1-l1-try1", "Who is Mrs. Tari?", ["the English teacher", "Bima's mother", "a new student"], 0, "I'm your English teacher this year.")),
            repeat(["Let me introduce myself.", "I'd like you to meet my friend, Lusi.", "Nice to meet you, too.", "See you later. Take care!"]),
          ],
        },
      ],
      checkpoint: [
        listen("smp7-c1-l1-c1", say(["man", "How's it going, Rani?"], ["woman", "Pretty good, thanks!"]), "Listen. What kind of conversation is this?", ["informal, between friends", "formal, with a teacher", "a phone call to a shop"], 0, "How's it going = informal."),
        pick("smp7-c1-l1-c2", "Someone says “Nice to meet you.” You answer…", ["Nice to meet you, too.", "I'm fine.", "Good night."], 0, "Balasan standar."),
        match("smp7-c1-l1-c3", "Match the greeting and the reply.", [["How are you?", "I'm very well, thank you."], ["What's up?", "Not much."], ["See you later!", "Bye! Take care!"], ["This is Dani.", "Hi, Dani!"]], "Pasangan sapaan dan jawaban!"),
        arrange("smp7-c1-l1-c4", "Put the words in order.", "I'd like you to meet my cousin", "I'd like you to meet + orang."),
        trPick("smp7-c1-l1-c5", "“Izinkan saya memperkenalkan diri.” in English is…", ["Let me introduce myself.", "Let me introduce yourself.", "Let me meet myself."], 0, "Introduce myself."),
        pick("smp7-c1-l1-c6", "You see your neighbour, Mr. Hasan, at 7 p.m. Which greeting is BEST?", ["Good evening, Mr. Hasan.", "Good night, Mr. Hasan.", "Yo, Hasan!"], 0, "Bertemu malam hari → Good evening; formal ke orang tua.", { hots: true }),
      ],
    },
    {
      id: "smp7-c1-l2",
      skill: "structure",
      title: "Be, Pronouns and Possessives",
      summary: "am/is/are, subject pronouns, possessive adjectives and 's for talking about people.",
      sections: [
        {
          title: "The verb be",
          blocks: [
            table(["Subject", "Be", "Negative", "Question"], [["I", "am (I'm)", "I'm not", "Am I …?"], ["He / She / It", "is (he's, she's, it's)", "isn't", "Is he …?"], ["You / We / They", "are (you're, we're, they're)", "aren't", "Are they …?"]]),
            examples([{ right: "I'm thirteen years old.", note: "Umur memakai be, bukan have." }, { wrong: "I have thirteen years old.", right: "I am thirteen years old." }, { wrong: "She from Medan.", right: "She is from Medan." }], "Common mistakes"),
          ],
        },
        {
          title: "Pronouns and possessives",
          blocks: [
            table(["Subject pronoun", "Possessive adjective", "Example"], [["I", "my", "My name is Yo."], ["you", "your", "Is this your bag?"], ["he", "his", "His father is a fisherman."], ["she", "her", "Her hobby is dancing."], ["it", "its", "The cat is licking its paw."], ["we", "our", "Our school is big."], ["they", "their", "Their house is near the beach."]]),
            text("Untuk nama orang, tambahkan **'s**: *Rina**'s** bag* (tas Rina), *my father**'s** car*. Hati-hati: **it's** = it is, sedangkan **its** = miliknya (benda/hewan)."),
            tryIt(pick("smp7-c1-l2-try1", "Siti and Ani are sisters. ___ mother is a nurse.", ["Their", "They", "Her", "There"], 0, "Milik mereka → their.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp7-c1-l2-c1", voice("Her brother isn't at home. He's at school."), "Listen. Where is her brother?", ["at school", "at home", "at the market"], 0, "He's at school."),
        pick("smp7-c1-l2-c2", "My parents ___ teachers.", ["are", "is", "am"], 0, "Parents (jamak) + are."),
        fill("smp7-c1-l2-c3", "Complete: The dog is wagging ___ tail.", "The dog is wagging", "tail.", ["its"], "Milik hewan → its."),
        match("smp7-c1-l2-c4", "Match the pronoun and the possessive.", [["I", "my"], ["we", "our"], ["she", "her"], ["they", "their"]], "Pronoun → possessive."),
        trPick("smp7-c1-l2-c5", "“Umurku tiga belas tahun.” in English is…", ["I'm thirteen years old.", "I have thirteen years old.", "My age thirteen."], 0, "Umur → be."),
        pick("smp7-c1-l2-c6", "Find the mistake: “Andi and me is in the same class.”", ["“me is” should be “I are”", "“same” should be “some”", "There is no mistake."], 0, "Andi and I are … (subjek jamak).", { hots: true }),
      ],
    },
    {
      id: "smp7-c1-l3",
      skill: "reading",
      title: "Reading: Hello from Kupang!",
      summary: "Read a self-introduction for a pen pal website and write your own profile.",
      passages: [PROFILE],
      sections: [
        {
          title: "A pen pal profile",
          blocks: [
            { type: "passage", passage: PROFILE },
            audio("Listen and read", say(["man", PROFILE.lines.join(" ")])),
            vocab([["fisherman", "nelayan", "fishing"], ["traditional instrument", "alat musik tradisional", "guitar"], ["member", "anggota", "football"], ["make friends", "berteman", "hello"]], "Words from the text"),
            tryIt(pick("smp7-c1-l3-try1", "What is Yohanes's nickname?", ["Yo", "Yon", "Hanes"], 0, "Baris 1.", { passageId: PROFILE.id })),
          ],
        },
        {
          title: "Write your profile",
          blocks: [
            tip("Self-introduction yang baik: **sapaan**, **identitas** (nama, umur, sekolah, asal), **keluarga**, **kesukaan dan kemampuan**, dan **penutup/ajakan**."),
            writing({
              id: "smp7-c1-l3-write",
              title: "My pen pal profile",
              prompt: "Write a self-introduction for an international pen pal website. Include your name, age, school, hometown, family, favourite subject, hobbies and what kind of friend you are looking for.",
              image: "chat",
              minWords: 100,
              maxWords: 200,
              tips: ["Hi everyone! My name is …", "I'm … years old and I'm in Grade 7 at …", "There are … people in my family …", "My favourite subject is … because …", "In my free time, I …", "I'd like to make friends with …"],
              models: [{ label: "Example", text: "Hello! My name is Aisyah Putri, but you can call me Ica. I'm twelve years old and I'm a Grade 7 student at SMP Islam Al-Azhar in Pekanbaru, Riau. There are five people in my family: my parents, my older brother, my little sister and me. My father is an engineer and my mother is a lecturer. My favourite subject is English because I love watching cartoons and singing English songs. I'm not very good at maths, but I'm trying! In my free time, I read comics and practise silat. I'd like to make friends with students from other countries, especially Japan and Korea. Write to me soon!" }],
              rubric: ["I gave my name, age, school and hometown.", "I described my family.", "I wrote about my favourite subject and hobbies with reasons.", "I used am/is/are and possessives correctly.", "I closed with an invitation to write back."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("smp7-c1-l3-c1", "Where was Yohanes born?", ["Rote Island", "Kupang", "Flores"], 0, "Baris 3.", { passageId: PROFILE.id }),
        pick("smp7-c1-l3-c2", "What does his mother do?", ["She has a small shop.", "She is a fisherman.", "She is a teacher."], 0, "Baris 4.", { passageId: PROFILE.id }),
        fill("smp7-c1-l3-c3", "Complete.", "My favourite subject is", "because I love doing experiments.", ["science"], "Baris 5.", { passageId: PROFILE.id }),
        pickMany("smp7-c1-l3-c4", "Choose ALL the true statements.", ["He has two sisters.", "He plays the sasando.", "He is good at drawing.", "He is in the school football team."], [0, 1, 3], "Baris 3, 6, 7. Ia tidak pandai menggambar.", { passageId: PROFILE.id }),
        pick("smp7-c1-l3-c5", "Who taught Yohanes to play the sasando?", ["his grandfather", "his father", "his music teacher"], 0, "Baris 6.", { passageId: PROFILE.id }),
        pick("smp7-c1-l3-c6", "What is the main purpose of the text?", ["to introduce himself and find new friends", "to sell sasando", "to describe Kupang's beaches"], 0, "Baris 8 menunjukkan tujuannya.", { passageId: PROFILE.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp7-c1-post",
    title: "Chapter 1 Posttest",
    passPercent: 70,
    passages: [PROFILE],
    questions: [
      pick("smp7-c1-post1", "Teacher: “Good afternoon, class.” Students: “___”", ["Good afternoon, ma'am.", "Good night, ma'am.", "Bye, ma'am.", "What's up?"], 0, "Balas dengan sapaan yang sama."),
      listen("smp7-c1-post2", say(["woman", "Excuse me, are you the new student?"], ["man", "Yes, I am. I'm Fikri. I just moved here from Palembang."]), "Listen. Where did Fikri live before?", ["Palembang", "Padang", "Pontianak", "Pekanbaru"], 0, "I moved here from Palembang."),
      trPick("smp7-c1-post3", "“Ini sepupuku, Dina.” in English is…", ["This is my cousin, Dina.", "This my cousin Dina is.", "Here cousin me Dina.", "She my cousin, Dina."], 0, "Memperkenalkan orang → This is …"),
      pick("smp7-c1-post4", "Is this ___ pencil case, Rio? — Yes, it's mine.", ["your", "you", "you're", "yours"], 0, "Possessive adjective → your."),
      arrange("smp7-c1-post5", "Put the words in order.", "Where are you from", "Where are you from?"),
      pick("smp7-c1-post6", "How many people are there in Yohanes's family?", ["five", "four", "three", "six"], 0, "Ayah, ibu, dua saudara perempuan, dan dia (baris 3).", { passageId: PROFILE.id }),
      match("smp7-c1-post7", "Match.", [["it's", "it is"], ["its", "belonging to it"], ["they're", "they are"], ["their", "belonging to them"]], "Bentuk yang sering tertukar."),
      fill("smp7-c1-post8", "Complete: My sister ___ (not/be) at home.", "My sister", "at home.", ["isn't", "is not"], "She → isn't."),
      pick("smp7-c1-post9", "Which sentence best describes Yohanes?", ["He loves his culture and is friendly.", "He is shy and doesn't like sports.", "He wants to leave Kupang forever.", "He is the best artist in school."], 0, "Ia memainkan sasando dan ingin berteman.", { passageId: PROFILE.id, hots: true }),
      pick("smp7-c1-post10", "You are leaving a friend's house at 9 p.m. What do you say?", ["Thanks for having me. Good night!", "Good evening!", "Nice to meet you!", "Good morning!"], 0, "Berpamitan malam → Good night.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Nice to Meet You!",
    questions: [
      live("smp7-c1-live1", "Formal greeting at 2 p.m.:", ["Good afternoon", "Good night", "What's up", "Good morning"], 0, "afternoon"),
      live("smp7-c1-live2", "Reply to “Nice to meet you.”", ["Nice to meet you, too.", "I'm fine.", "Good night.", "Yes, I am."], 0, "hello"),
      live("smp7-c1-live3", "They → ___ house", ["their", "there", "they're", "them"], 0, "house"),
      live("smp7-c1-live4", "I ___ thirteen years old.", ["am", "have", "is", "are"], 0, "num-13"),
      live("smp7-c1-live5", "“Sampai jumpa nanti!” =", ["See you later!", "See you yesterday!", "Look you later!", "Meet you before!"], 0, "goodbye", true),
      live("smp7-c1-live6", "She → ___ bag", ["her", "his", "she's", "hers"], 0, "bag"),
      live("smp7-c1-live7", "Informal greeting:", ["What's up?", "Good evening, sir.", "How do you do?", "Dear Sir"], 0, "chat"),
      live("smp7-c1-live8", "it is =", ["it's", "its", "is it", "it"], 0, "question"),
    ],
  },
};

const FRIEND: Passage = {
  id: "smp7-c2-friend",
  title: "My Best Friend, Alya",
  pic: "girl",
  lines: [
    "I want to tell you about my best friend. Her name is Alya, and we have been friends since kindergarten.",
    "Alya is quite tall for her age. She has long, straight black hair and big brown eyes.",
    "She has a round face and a small mole near her nose. She always wears glasses with a red frame.",
    "Alya is a very cheerful girl. She smiles all the time, and she always makes me laugh.",
    "She is also hard-working. She studies every night, and she is the best student in our class.",
    "However, she is a little bit clumsy. Last week, she dropped her lunch box in front of the whole class!",
    "When I feel sad, Alya always listens to me and gives me good advice.",
    "I am lucky to have a friend like her.",
  ],
};

export const CH2: Level = {
  id: "smp7-ch2",
  title: "Chapter 2 — People Around Me",
  description: "Describe people's appearance and personality with have/has and adjectives, use adjective order, and read and write a descriptive text about a person.",
  targetScore: "Vocabulary · Reading · Writing",
  cover: ["girl", "grandfather", "teacher-man"],
  pretest: {
    id: "smp7-c2-pre",
    title: "Chapter 2 Pretest",
    passPercent: 0,
    questions: [
      pick("smp7-c2-pre1", "My brother ___ short curly hair.", ["has", "have", "is", "are"], 0, "He/she → has."),
      listen("smp7-c2-pre2", voice("My aunt is very kind. She always helps her neighbours."), "Listen. What is her aunt like?", ["kind", "lazy", "rude", "shy"], 0, "Kind = baik hati."),
      trPick("smp7-c2-pre3", "“Pemalu” in English is…", ["shy", "brave", "noisy", "funny"], 0, "Pemalu = shy."),
      pick("smp7-c2-pre4", "The opposite of “tall” (for a person) is…", ["short", "small", "low", "thin"], 0, "Tinggi ↔ pendek (short)."),
      pick("smp7-c2-pre5", "Which question asks about personality?", ["What is she like?", "What does she look like?", "How old is she?", "Where does she live?"], 0, "What is she like? = sifatnya."),
    ],
  },
  lessons: [
    {
      id: "smp7-c2-l1",
      skill: "vocabulary",
      title: "Appearance: What Does She Look Like?",
      summary: "Height, build, hair, face and eyes; have/has; adjective order.",
      sections: [
        {
          title: "Words for appearance",
          blocks: [
            table(["Category", "Words"], [["Height", "tall, short, medium height"], ["Build", "slim, thin, well-built, chubby, overweight"], ["Hair length", "long, shoulder-length, short, bald"], ["Hair type", "straight, wavy, curly"], ["Hair colour", "black, dark brown, grey, white"], ["Face", "round, oval, square; a beard, a moustache, a mole, dimples"], ["Skin", "fair, tan, dark"]]),
            pics([["grandfather", "grey hair, a beard"], ["girl", "long straight hair"], ["boy", "short black hair"], ["baby", "chubby cheeks"]]),
            tip("Pakai kata yang **sopan**: *slim* lebih halus daripada *skinny*, dan *a bit overweight* lebih sopan daripada *fat*."),
          ],
        },
        {
          title: "Have/has and adjective order",
          blocks: [
            table(["Use", "Example"], [["be + adjective", "She is tall and slim."], ["have / has + adjective + noun", "He has a round face and short hair."]]),
            text("Jika ada beberapa kata sifat untuk rambut, urutannya: **panjang → bentuk → warna** + *hair*. Contoh: *long **straight** black hair*, *short **curly** brown hair*."),
            examples([{ wrong: "She has black long hair.", right: "She has long black hair." }, { wrong: "He have a beard.", right: "He has a beard." }, { wrong: "She is long hair.", right: "She has long hair." }], "Watch out"),
            tryIt(pick("smp7-c2-l1-try1", "Choose the correct order.", ["short curly grey hair", "grey short curly hair", "curly grey short hair"], 0, "Panjang → bentuk → warna.")),
          ],
        },
      ],
      checkpoint: [
        listen("smp7-c2-l1-c1", voice("My uncle is tall and well-built. He has a square face and a thick moustache."), "Listen. What does her uncle have?", ["a thick moustache", "long curly hair", "glasses"], 0, "He has a thick moustache."),
        pick("smp7-c2-l1-c2", "My grandmother ___ grey hair and wrinkles.", ["has", "have", "is"], 0, "She → has."),
        arrange("smp7-c2-l1-c3", "Put the words in order.", "She has long wavy brown hair", "Panjang → bentuk → warna."),
        match("smp7-c2-l1-c4", "Match the opposites.", [["tall", "short"], ["straight", "curly"], ["fair skin", "dark skin"], ["slim", "chubby"]], "Lawan kata penampilan."),
        trPick("smp7-c2-l1-c5", "“Dia punya lesung pipi.” in English is…", ["She has dimples.", "She is dimples.", "She have dimples."], 0, "Lesung pipi = dimples."),
        pick("smp7-c2-l1-c6", "“What does your father look like?” Which answer is correct?", ["He's tall and he has a beard.", "He's kind and patient.", "He likes fishing."], 0, "Look like → penampilan fisik.", { hots: true }),
      ],
    },
    {
      id: "smp7-c2-l2",
      skill: "speaking",
      title: "Personality: What Is He Like?",
      summary: "Personality adjectives, giving examples, and using quite / very / a bit.",
      sections: [
        {
          title: "Personality words",
          blocks: [
            table(["Positive", "Meaning", "Negative", "Meaning"], [["friendly", "ramah", "rude", "kasar/tidak sopan"], ["hard-working", "rajin", "lazy", "malas"], ["generous", "dermawan", "selfish", "egois"], ["patient", "sabar", "short-tempered", "pemarah"], ["honest", "jujur", "dishonest", "tidak jujur"], ["cheerful", "ceria", "moody", "suasana hati berubah-ubah"], ["brave", "berani", "clumsy", "ceroboh"], ["helpful", "suka menolong", "noisy", "berisik"]]),
            text("Tambahkan **penguat**: *very* (sangat), *quite* (cukup), *a bit / a little bit* (agak, biasanya untuk sifat negatif). Contoh: *She is **a bit** shy, but she is **very** helpful.*"),
          ],
        },
        {
          title: "Give an example",
          blocks: [
            audio("Describing a teacher", say(["man", "Who is your favourite teacher?"], ["woman", "Mr. Gede, our science teacher."], ["man", "What is he like?"], ["woman", "He's very patient. When we don't understand, he explains again and again. He's also quite funny. He tells jokes in class."], ["man", "What does he look like?"], ["woman", "He's medium height, and he has short black hair and glasses."])),
            tip("Deskripsi sifat lebih meyakinkan jika ada **contoh perilaku**: *He's patient. **When we don't understand, he explains again.***"),
            speaking({
              id: "smp7-c2-l2-say",
              title: "Describe someone you admire",
              prompt: "Describe a person you admire (a family member, a teacher or a friend). Talk about their appearance and personality, and give examples of what they do.",
              image: "teacher-man",
              prepSeconds: 30,
              seconds: 90,
              tips: ["I'd like to tell you about …", "He/She is … and has …", "He/She is very … For example, …", "I admire him/her because …"],
              models: [{ label: "Example", text: "I'd like to tell you about my grandmother. She is seventy years old. She is short and a bit chubby, and she has white curly hair. She always wears a batik scarf. My grandmother is very generous. For example, she always cooks extra food for our neighbours. She is also patient. When I make mistakes, she never gets angry. I admire her because she is always kind to everyone." }],
              rubric: ["I described appearance with have/has and be.", "I used at least three personality adjectives.", "I gave examples of behaviour.", "I said why I admire this person."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("smp7-c2-l2-c1", voice("Dimas never shares his snacks. He only thinks about himself."), "Listen. What is Dimas like?", ["selfish", "generous", "honest"], 0, "Hanya memikirkan diri sendiri = selfish."),
        pick("smp7-c2-l2-c2", "Rika always finishes her homework early and studies every night. She is…", ["hard-working", "lazy", "rude"], 0, "Rajin = hard-working."),
        match("smp7-c2-l2-c3", "Match the opposites.", [["generous", "selfish"], ["patient", "short-tempered"], ["hard-working", "lazy"], ["friendly", "rude"]], "Lawan kata sifat."),
        fill("smp7-c2-l2-c4", "Complete: What is she ___? — She's very friendly.", "What is she", "? — She's very friendly.", ["like"], "What is she like? = sifat."),
        trPick("smp7-c2-l2-c5", "“Dia agak ceroboh.” in English is…", ["He's a bit clumsy.", "He's a bit brave.", "He's very careful."], 0, "Ceroboh = clumsy."),
        pick("smp7-c2-l2-c6", "Which description is the MOST convincing?", ["She's honest. Once she found a wallet and gave it to the police.", "She's honest.", "She's honest and honest."], 0, "Contoh perilaku membuat deskripsi meyakinkan.", { hots: true }),
      ],
    },
    {
      id: "smp7-c2-l3",
      skill: "reading",
      title: "Reading: My Best Friend, Alya",
      summary: "The structure of a descriptive text about a person; writing a description.",
      passages: [FRIEND],
      sections: [
        {
          title: "A descriptive text",
          blocks: [
            { type: "passage", passage: FRIEND },
            audio("Listen and read", say(["woman", FRIEND.lines.join(" ")])),
            table(["Part", "Function", "In the text"], [["Identification", "memperkenalkan siapa yang dideskripsikan", "line 1"], ["Description: appearance", "ciri fisik", "lines 2–3"], ["Description: personality", "sifat dan contoh perilaku", "lines 4–7"], ["Closing (optional)", "kesan/pendapat penulis", "line 8"]]),
            text("Descriptive text umumnya memakai **simple present** (*she has, she is, she studies*). Simple past boleh dipakai untuk **contoh kejadian** (*Last week, she dropped…*)."),
          ],
        },
        {
          title: "Write a description",
          blocks: [
            tryIt(pick("smp7-c2-l3-try1", "How long have they been friends?", ["since kindergarten", "since Grade 7", "since last year"], 0, "Baris 1.", { passageId: FRIEND.id })),
            writing({
              id: "smp7-c2-l3-write",
              title: "Someone special",
              prompt: "Write a descriptive text about someone special to you. Follow the structure: identification, appearance, personality (with examples) and a closing.",
              image: "heart",
              minWords: 120,
              maxWords: 220,
              tips: ["Identification: I want to tell you about …", "Appearance: He/She is … He/She has …", "Personality: He/She is very … For example, …", "Closing: I'm lucky / proud / happy …"],
              models: [{ label: "Example", text: "I want to tell you about my older brother, Arka. He is nineteen years old and he studies engineering at a university in Surabaya.\nArka is tall and well-built because he plays basketball. He has short wavy black hair, thick eyebrows and a small scar on his chin.\nArka is very helpful. When my laptop broke, he fixed it in one night. He is also funny. He often imitates our cat, and the whole family laughs. However, he is a bit forgetful. He often forgets where he put his keys!\nEven though he lives far away now, he calls me every Sunday. I am proud to have a brother like him." }],
              rubric: ["I followed the structure: identification, description, closing.", "I described appearance with correct adjective order.", "I described personality with examples.", "I used the simple present correctly (he has / she is).", "I used linking words like also, however, because."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("smp7-c2-l3-c1", "What colour are Alya's glasses?", ["red", "black", "brown"], 0, "Baris 3.", { passageId: FRIEND.id }),
        pickMany("smp7-c2-l3-c2", "Choose ALL the words that describe Alya's personality.", ["cheerful", "hard-working", "clumsy", "selfish"], [0, 1, 2], "Baris 4, 5, 6.", { passageId: FRIEND.id }),
        fill("smp7-c2-l3-c3", "Complete.", "She has long, straight black hair and big brown", ".", ["eyes"], "Baris 2.", { passageId: FRIEND.id }),
        pick("smp7-c2-l3-c4", "Which line is an example of Alya being clumsy?", ["line 6", "line 4", "line 7"], 0, "Baris 6.", { passageId: FRIEND.id }),
        pick("smp7-c2-l3-c5", "Lines 2–3 describe Alya's…", ["appearance", "personality", "hobbies"], 0, "Ciri fisik.", { passageId: FRIEND.id, hots: true }),
        pick("smp7-c2-l3-c6", "Which word could replace “cheerful” in line 4?", ["happy and lively", "angry", "quiet"], 0, "Cheerful = ceria.", { passageId: FRIEND.id, hots: true }),
      ],
    },
  ],
  quiz: {
    id: "smp7-c2-post",
    title: "Chapter 2 Posttest",
    passPercent: 70,
    passages: [FRIEND],
    questions: [
      pick("smp7-c2-post1", "Mr. Joko ___ a grey beard.", ["has", "have", "is", "having"], 0, "He → has."),
      listen("smp7-c2-post2", say(["man", "What's your new neighbour like?"], ["woman", "She's very friendly. She brought us a cake on her first day!"]), "Listen. What is the neighbour like?", ["friendly", "rude", "lazy", "shy"], 0, "She's very friendly."),
      trPick("smp7-c2-post3", "“Jujur” in English is…", ["honest", "humble", "helpful", "hungry"], 0, "Jujur = honest."),
      pick("smp7-c2-post4", "Choose the correct sentence.", ["She has short curly brown hair.", "She has brown curly short hair.", "She is short curly brown hair.", "She have short curly brown hair."], 0, "Has + panjang → bentuk → warna."),
      arrange("smp7-c2-post5", "Put the words in order.", "What does your teacher look like", "Pertanyaan penampilan."),
      pick("smp7-c2-post6", "What happened last week?", ["Alya dropped her lunch box.", "Alya won a prize.", "Alya lost her glasses.", "Alya was sick."], 0, "Baris 6.", { passageId: FRIEND.id }),
      match("smp7-c2-post7", "Match the question and the answer.", [["What is he like?", "He's patient."], ["What does he look like?", "He's tall."], ["What does he like?", "He likes football."]], "Like vs look like vs likes."),
      fill("smp7-c2-post8", "Complete: A person who gives a lot to others is ___ .", "A person who gives a lot to others is", ".", ["generous"], "Dermawan = generous."),
      pick("smp7-c2-post9", "Why does the writer feel lucky?", ["Alya is a caring friend who listens and helps.", "Alya gives her money.", "Alya does her homework.", "Alya is tall."], 0, "Baris 7–8.", { passageId: FRIEND.id, hots: true }),
      pick("smp7-c2-post10", "Which sentence would fit best after line 5?", ["She even helps classmates who don't understand the lessons.", "She has a red bicycle.", "Her house is near the river.", "She doesn't like rice."], 0, "Melanjutkan ide rajin dan pintar.", { passageId: FRIEND.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Who's Who?",
    questions: [
      live("smp7-c2-live1", "He ___ a moustache.", ["has", "have", "is", "are"], 0, "grandfather"),
      live("smp7-c2-live2", "Correct order:", ["long black hair", "black long hair", "hair long black", "long hair black"], 0, "girl"),
      live("smp7-c2-live3", "Opposite of lazy:", ["hard-working", "noisy", "clumsy", "rude"], 0, "open-book"),
      live("smp7-c2-live4", "“Sabar” =", ["patient", "patent", "parent", "polite"], 0, "owl-think", true),
      live("smp7-c2-live5", "What is she like? →", ["She's kind.", "She's tall.", "She likes tea.", "She's 12."], 0, "question"),
      live("smp7-c2-live6", "Not straight hair:", ["curly", "bald", "long", "slim"], 0, "happy"),
      live("smp7-c2-live7", "Shares everything:", ["generous", "selfish", "moody", "rude"], 0, "heart"),
      live("smp7-c2-live8", "Descriptive text tense:", ["simple present", "simple future", "past perfect", "no verbs"], 0, "report"),
    ],
  },
};
