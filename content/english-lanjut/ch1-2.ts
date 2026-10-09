import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { arrange, audio, examples, fill, listen, live, match, pick, pickMany, pics, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Bahasa Inggris Tingkat Lanjut (Fase F). Chapter 1 — The Power of Poetry · Chapter 2 — Page to Stage (drama)

const HOPE: Passage = {
  id: "adv-c1-hope",
  title: "“Hope” is the thing with feathers — Emily Dickinson (1891)",
  pic: "bird",
  lines: [
    "“Hope” is the thing with feathers -",
    "That perches in the soul -",
    "And sings the tune without the words -",
    "And never stops - at all -",
    "And sweetest - in the Gale - is heard -",
    "And sore must be the storm -",
    "That could abash the little Bird",
    "That kept so many warm -",
    "I've heard it in the chillest land -",
    "And on the strangest Sea -",
    "Yet - never - in Extremity,",
    "It asked a crumb - of me.",
  ],
};

export const CH1: Level = {
  id: "adv-ch1",
  title: "Chapter 1 — The Power of Poetry",
  description: "Read classic and modern poems closely, analyse extended metaphor, rhyme, rhythm and punctuation, write a critical response and compose an original poem.",
  targetScore: "Reading · Writing · Speaking",
  cover: ["bird", "open-book", "owl-read"],
  pretest: {
    id: "adv-c1-pre",
    title: "Chapter 1 Pretest",
    passPercent: 0,
    questions: [
      pick("adv-c1-pre1", "A metaphor that continues through a whole poem is called…", ["an extended metaphor", "a short simile", "an onomatopoeia", "a hyperbole"], 0, "Metafora berlanjut."),
      listen("adv-c1-pre2", voice("Hope is the thing with feathers that perches in the soul."), "Listen. What is hope compared to?", ["a bird", "a stone", "a river", "a candle"], 0, "Feathers, perches → burung."),
      trPick("adv-c1-pre3", "“Pola rima” in English is…", ["rhyme scheme", "rhythm game", "rhyme plan line", "rime scheme"], 0, "Rhyme scheme."),
      pick("adv-c1-pre4", "In the rhyme scheme ABAB, which lines rhyme?", ["lines 1 and 3, lines 2 and 4", "lines 1 and 2, lines 3 and 4", "all lines", "no lines"], 0, "A dengan A, B dengan B."),
      pick("adv-c1-pre5", "A group of lines in a poem is a…", ["stanza", "paragraph", "chapter", "scene"], 0, "Stanza = bait."),
    ],
  },
  lessons: [
    {
      id: "adv-c1-l1",
      skill: "reading",
      title: "Close Reading: Emily Dickinson",
      summary: "Extended metaphor, word choice and the distinctive dashes of Dickinson's style.",
      passages: [HOPE],
      sections: [
        {
          title: "The poem",
          blocks: [
            { type: "passage", passage: HOPE },
            audio("Listen to the poem", say(["woman", HOPE.lines.join(" ")])),
            vocab([["perch", "hinggap/bertengger", "bird"], ["gale", "badai/angin kencang", "windy"], ["sore", "parah/hebat (lama)", "rain"], ["abash", "membuat malu/gentar", "scared"], ["extremity", "keadaan paling sulit", "cold"], ["crumb", "remah", "bread"]], "Vocabulary"),
            text("Emily Dickinson (1830–1886) adalah penyair Amerika yang sangat produktif tetapi hampir tidak menerbitkan karyanya semasa hidup. Gayanya khas: **tanda pisah (—)**, **huruf kapital yang tidak biasa**, dan baris pendek yang padat makna."),
          ],
        },
        {
          title: "Reading stanza by stanza",
          blocks: [
            table(["Stanza", "What happens", "Effect"], [["1 (lines 1–4)", "Hope is a bird living in the soul, singing a wordless tune forever.", "Hope is natural, gentle, constant; it needs no words."], ["2 (lines 5–8)", "The song is sweetest in a storm; only a terrible storm could silence it.", "Hope is strongest in hard times and comforts many people."], ["3 (lines 9–12)", "The speaker has heard it in cold lands and strange seas, yet it never asked for anything.", "Hope is generous; it gives without taking."]]),
            tip("Tanda pisah Dickinson menciptakan **jeda** dan **penekanan**, seolah pembaca berhenti untuk merenung. Bacalah perlahan dan dengarkan iramanya."),
            tryIt(pick("adv-c1-l1-try1", "Where does the bird live in the poem?", ["in the soul", "in a tree", "on the sea"], 0, "Baris 2.", { passageId: HOPE.id })),
          ],
        },
      ],
      checkpoint: [
        pick("adv-c1-l1-c1", "What is unusual about the bird's song?", ["It has no words.", "It is very loud.", "It is sad."], 0, "Baris 3.", { passageId: HOPE.id }),
        pick("adv-c1-l1-c2", "When is the song “sweetest”?", ["in the Gale (a storm)", "in the morning", "in summer"], 0, "Baris 5.", { passageId: HOPE.id }),
        fill("adv-c1-l1-c3", "Complete.", "That kept so many", "-", ["warm"], "Baris 8.", { passageId: HOPE.id }),
        pickMany("adv-c1-l1-c4", "Choose ALL the places where the speaker has heard the bird.", ["the chillest land", "the strangest Sea", "a crowded city", "a quiet church"], [0, 1], "Baris 9–10.", { passageId: HOPE.id }),
        pick("adv-c1-l1-c5", "What does “It asked a crumb - of me” (line 12) suggest about hope?", ["It never demands anything in return.", "It is always hungry.", "It eats bread."], 0, "Kemurahan harapan.", { passageId: HOPE.id, hots: true }),
        pick("adv-c1-l1-c6", "Why might Dickinson choose a small bird, not a lion, as her image of hope?", ["Hope seems fragile, yet it survives great storms.", "Birds are dangerous.", "Lions cannot sing."], 0, "Kontras: rapuh tetapi tangguh.", { passageId: HOPE.id, hots: true }),
      ],
    },
    {
      id: "adv-c1-l2",
      skill: "vocabulary",
      title: "Tools for Analysing Poetry",
      summary: "Rhyme scheme, meter, sound devices and tone.",
      sections: [
        {
          title: "Sound and structure",
          blocks: [
            table(["Term", "Meaning", "Example"], [["Rhyme scheme", "pola rima di akhir baris (ABAB, ABCB…)", "Stanza 2: heard / storm / Bird / warm → near rhymes"], ["Slant (near) rhyme", "bunyi hampir sama", "storm / warm; soul / all"], ["Meter", "pola tekanan suku kata", "Dickinson often uses common meter (8–6–8–6 syllables)"], ["Alliteration", "bunyi awal yang sama", "sings / soul / sweetest / storm"], ["Enjambment", "kalimat berlanjut ke baris berikutnya", "That could abash the little Bird / That kept so many warm"], ["Caesura", "jeda di tengah baris", "Yet - never - in Extremity"]]),
            pics([["bird", "image"], ["windy", "conflict (storm)"], ["cold", "setting"], ["heart", "theme"]]),
          ],
        },
        {
          title: "Tone and theme",
          blocks: [
            table(["Tone words", "Theme statements (full sentences)"], [["hopeful, tender, reverent", "Hope survives even the hardest circumstances."], ["nostalgic, melancholic", "Memory keeps lost people alive."], ["bitter, ironic", "Progress can destroy what it claims to improve."]]),
            warn("**Tema** harus berupa **kalimat lengkap** tentang kehidupan, bukan satu kata. *Hope* adalah **topik**; *Hope stays with us and gives without asking anything in return* adalah **tema**."),
            tryIt(pick("adv-c1-l2-try1", "“storm” and “warm” are an example of…", ["slant rhyme", "perfect rhyme", "no rhyme at all"], 0, "Rima tidak sempurna.")),
          ],
        },
      ],
      checkpoint: [
        listen("adv-c1-l2-c1", voice("The sad sea sighed softly."), "Listen. Which sound device is used?", ["alliteration", "rhyme", "caesura"], 0, "Bunyi s berulang."),
        match("adv-c1-l2-c2", "Match the term and the meaning.", [["enjambment", "a sentence runs onto the next line"], ["caesura", "a pause within a line"], ["slant rhyme", "similar but not identical sounds"], ["meter", "pattern of stressed syllables"]], "Istilah puisi."),
        pick("adv-c1-l2-c3", "Which is a THEME, not a topic?", ["Hope stays with us even in the darkest times.", "Hope", "Birds"], 0, "Tema = kalimat utuh."),
        fill("adv-c1-l2-c4", "Complete: The pattern of rhymes at the ends of lines is the rhyme ___ .", "The pattern of rhymes at the ends of lines is the rhyme", ".", ["scheme"], "Rhyme scheme."),
        trPick("adv-c1-l2-c5", "“Nada puisi ini penuh harap dan lembut.” in English is…", ["The tone of this poem is hopeful and tender.", "The tune of this poem is hopeful and tender.", "This poem tones hope tenderly."], 0, "Tone = nada puisi."),
        pick("adv-c1-l2-c6", "Why might a poet use enjambment?", ["to create flow and carry the reader's attention forward", "to make every line stop", "to remove all rhymes"], 0, "Efek enjambment.", { hots: true }),
      ],
    },
    {
      id: "adv-c1-l3",
      skill: "writing",
      title: "Critical Response and Original Poem",
      summary: "Writing an analytical essay on a poem and composing an extended-metaphor poem.",
      sections: [
        {
          title: "Plan",
          blocks: [
            table(["Paragraph", "Content"], [["Introduction", "poet, title, date, overall theme (thesis)"], ["Body 1", "the extended metaphor and what it reveals"], ["Body 2", "sound and structure (rhyme, dashes, enjambment) and their effect"], ["Body 3", "tone and how it develops across stanzas"], ["Conclusion", "why the poem still matters today"]]),
            tip("Gunakan **kutipan pendek** dari puisi dan jelaskan **efeknya**. Hindari parafrase panjang tanpa analisis."),
          ],
        },
        {
          title: "Write and perform",
          blocks: [
            writing({
              id: "adv-c1-l3-write",
              title: "Analysis + your poem",
              prompt: "(1) Write a critical response (about 250 words) analysing “Hope is the thing with feathers”: thesis, extended metaphor, sound/structure and tone. (2) Write your own 8–12 line poem using an extended metaphor for an abstract idea (fear, memory, kindness, home, courage…).",
              image: "owl-read",
              minWords: 300,
              maxWords: 450,
              tips: ["Thesis: In “…”, Dickinson presents hope as …", "The image of “…” suggests …", "The dashes create …", "The tone shifts from … to …", "Poem: [Idea] is a …, that … / It … / It …"],
              models: [{ label: "Analysis (extract)", text: "In “Hope is the thing with feathers”, Emily Dickinson presents hope as a small, fragile bird that nevertheless survives the worst storms. The extended metaphor begins in the first line, where hope “perches in the soul”, suggesting that it lives naturally inside every person. Because the bird “sings the tune without the words”, hope is shown as a feeling deeper than language.\nThe second stanza develops the idea that hope is strongest in difficult times. The song is “sweetest - in the Gale”, and only a “sore” storm could “abash the little Bird”. The frequent dashes slow the reader down, creating pauses that feel like breaths in a storm.\nFinally, the tone becomes reverent in the last stanza, as the speaker admits that hope has accompanied her “in the chillest land” but never asked for “a crumb”. Dickinson's poem remains powerful because it reminds us that hope is a gift we receive freely, even in our darkest moments." }, { label: "Original poem", text: "Memory is a lantern\nwe forget we are carrying,\nits glass is scratched by years,\nits flame leans with the wind.\nIt lights the kitchen of my childhood,\nthe red chair, the smell of clove,\nmy father's laugh on the stairs.\nSome nights it flickers.\nSome nights it is the only light I have." }],
              rubric: ["My analysis has a clear thesis about the poem's meaning.", "I used short quotations and explained their effect.", "I discussed metaphor, sound/structure and tone with correct terms.", "My poem uses a consistent extended metaphor.", "My poem uses vivid imagery and careful line breaks."],
            }),
            speaking({
              id: "adv-c1-l3-say",
              title: "Poetry reading and commentary",
              prompt: "Read Dickinson's poem (or your own) aloud with expression, then give a one-minute spoken commentary on its meaning and one technique you admire.",
              image: "microphone",
              prepSeconds: 60,
              seconds: 120,
              tips: ["Pause at each dash.", "Stress key images: feathers, Gale, chillest land.", "Commentary: What strikes me most is …", "The technique I admire is … because …"],
              models: [{ label: "Commentary", text: "What strikes me most about this poem is how small the image of hope is. Dickinson doesn't compare hope to a mountain or a sun, but to a tiny bird. That makes the poem feel personal and honest: hope can seem fragile, yet it survives storms that should destroy it. The technique I admire is her use of dashes. When I read it aloud, they force me to pause, almost as if I'm listening for the bird's song between the words." }],
              rubric: ["I read with expressive pauses and stress.", "My commentary explained the meaning clearly.", "I discussed one technique and its effect.", "I spoke confidently with good pronunciation."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("adv-c1-l3-c1", "Which is the best thesis for an analysis?", ["Dickinson presents hope as a fragile yet unbreakable presence that gives without asking.", "This poem is about a bird.", "I like this poem."], 0, "Tesis analitis."),
        pick("adv-c1-l3-c2", "In the model poem, what is memory compared to?", ["a lantern", "a river", "a bird"], 0, "Extended metaphor."),
        arrange("adv-c1-l3-c3", "Put the words in order.", "The dashes slow the reader down", "Analisis efek."),
        fill("adv-c1-l3-c4", "Complete: The image of the bird ___ that hope lives inside everyone.", "The image of the bird", "that hope lives inside everyone.", ["suggests", "implies", "shows"], "Kata kerja analisis."),
        trPick("adv-c1-l3-c5", "“Nadanya berubah menjadi penuh hormat.” in English is…", ["The tone becomes reverent.", "The tune becomes respect.", "The tone is respecting."], 0, "Reverent."),
        pick("adv-c1-l3-c6", "Why are short quotations better than long ones in an analysis?", ["They keep the focus on your interpretation of specific words.", "They are easier to copy.", "Long quotations are illegal."], 0, "Fokus pada analisis.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "adv-c1-post",
    title: "Chapter 1 Posttest",
    passPercent: 70,
    passages: [HOPE],
    questions: [
      pick("adv-c1-post1", "In ABCB rhyme scheme, which lines rhyme?", ["lines 2 and 4", "lines 1 and 3", "lines 1 and 2", "all lines"], 0, "B dengan B."),
      listen("adv-c1-post2", voice("The poem's tone shifts from gentle wonder to quiet gratitude."), "Listen. How does the tone end?", ["quiet gratitude", "anger", "fear", "boredom"], 0, "Gratitude."),
      trPick("adv-c1-post3", "“Majas metafora yang berkelanjutan” in English is…", ["extended metaphor", "long simile", "continued irony", "metaphor chain rhyme"], 0, "Extended metaphor."),
      pick("adv-c1-post4", "A pause in the middle of a line is called…", ["caesura", "enjambment", "stanza", "couplet"], 0, "Caesura."),
      arrange("adv-c1-post5", "Put the words in order.", "Hope survives even the hardest storms", "Pernyataan tema."),
      pick("adv-c1-post6", "What does “abash” mean in line 7?", ["make ashamed or silent", "make louder", "feed", "warm"], 0, "Abash = membuat gentar/malu.", { passageId: HOPE.id }),
      match("adv-c1-post7", "Match the line and the idea.", [["line 2", "hope lives inside us"], ["line 5", "hope is strongest in storms"], ["line 8", "hope comforts many people"], ["line 12", "hope asks nothing in return"]], "Interpretasi."),
      fill("adv-c1-post8", "Complete.", "And sings the tune without the", "-", ["words"], "Baris 3.", { passageId: HOPE.id }),
      pick("adv-c1-post9", "Which statement best expresses the poem's theme?", ["Hope endures through hardship and gives freely.", "Birds are better than people.", "Storms are always dangerous.", "The sea is strange."], 0, "Tema puisi: harapan bertahan.", { passageId: HOPE.id, hots: true }),
      pick("adv-c1-post10", "What is the effect of the dashes in line 11 (“Yet - never - in Extremity”)?", ["They slow the line and emphasise “never”.", "They show the poet made a mistake.", "They replace rhyme.", "They speed up the line."], 0, "Penekanan.", { passageId: HOPE.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Poetry Pros",
    questions: [
      live("adv-c1-live1", "Hope is compared to a…", ["bird", "lion", "stone", "lamp"], 0, "bird"),
      live("adv-c1-live2", "storm / warm =", ["slant rhyme", "perfect rhyme", "no rhyme", "alliteration"], 0, "windy"),
      live("adv-c1-live3", "Line runs onto the next:", ["enjambment", "caesura", "couplet", "refrain"], 0, "open-book"),
      live("adv-c1-live4", "“Bait” =", ["stanza", "line", "verse foot", "title"], 0, "book", true),
      live("adv-c1-live5", "sad sea sighed softly =", ["alliteration", "irony", "metaphor", "rhyme"], 0, "beach"),
      live("adv-c1-live6", "Theme must be a…", ["full sentence", "single word", "title", "rhyme"], 0, "owl-think"),
      live("adv-c1-live7", "Dickinson's famous punctuation:", ["dashes", "emoji", "brackets", "hashtags"], 0, "pencil"),
      live("adv-c1-live8", "ABAB: line 1 rhymes with line…", ["3", "2", "4", "1"], 0, "num-3"),
    ],
  },
};

const SCENE: Passage = {
  id: "adv-c2-scene",
  title: "Scene from “The Last Ferry” (a one-act play)",
  pic: "ship",
  lines: [
    "(A small wooden jetty at dusk. WAYAN, 17, sits with a backpack. His grandmother, NI LUH, 70, enters slowly, carrying a bag of oranges.)",
    "NI LUH: You forgot these. You always forget the oranges.",
    "WAYAN: (not looking up) I didn't forget them, Nini. I left them.",
    "NI LUH: (sitting beside him, with effort) Same thing, when you're seventeen.",
    "(Pause. The sound of waves. A ferry horn in the distance.)",
    "WAYAN: The scholarship letter says I have to be in Surabaya by Monday. If I don't take this ferry, I'll lose my place.",
    "NI LUH: Then take it.",
    "WAYAN: (standing, frustrated) And who will fix the roof before the rains? Who will take you to the clinic? You can't even carry oranges without stopping twice!",
    "NI LUH: (quietly) I carried your father when he was sick with fever, all the way across this island. I can carry oranges.",
    "(WAYAN sits down again. Long silence.)",
    "NI LUH: (placing an orange in his hand) Your grandfather wanted to study too. He never took the ferry. He told me every day for forty years. (beat) Don't make me listen to you say it for forty years.",
    "(The ferry horn sounds again, closer. WAYAN looks at the orange, then at the sea. Lights fade.)",
  ],
};

export const CH2: Level = {
  id: "adv-ch2",
  title: "Chapter 2 — Page to Stage",
  description: "Read and analyse drama: stage directions, dialogue, subtext, conflict and characterisation; rehearse and perform a scene; and write an original short scene.",
  targetScore: "Reading · Speaking · Writing",
  cover: ["ship", "microphone", "owl-read"],
  pretest: {
    id: "adv-c2-pre",
    title: "Chapter 2 Pretest",
    passPercent: 0,
    questions: [
      pick("adv-c2-pre1", "Instructions in a script about actions, setting or tone are called…", ["stage directions", "subtitles", "footnotes", "headlines"], 0, "Petunjuk panggung."),
      listen("adv-c2-pre2", voice("I'm fine. Really. Go to your party."), "Listen. If the speaker says this with a sad voice, what might the subtext be?", ["She is not really fine.", "She is very happy.", "She wants to go to the party too.", "She is asleep."], 0, "Subteks = makna tersirat."),
      trPick("adv-c2-pre3", "“Naskah drama” in English is…", ["script", "scrip", "scripture", "screen"], 0, "Script."),
      pick("adv-c2-pre4", "A conversation between two or more characters is…", ["dialogue", "monologue", "narration", "soliloquy"], 0, "Dialog."),
      pick("adv-c2-pre5", "A long speech by one character alone on stage, revealing thoughts, is a…", ["soliloquy", "chorus", "dialogue", "prologue"], 0, "Solilokui."),
    ],
  },
  lessons: [
    {
      id: "adv-c2-l1",
      skill: "reading",
      title: "Reading a Scene",
      summary: "Conflict, subtext and characterisation through dialogue and stage directions.",
      passages: [SCENE],
      sections: [
        {
          title: "The scene",
          blocks: [
            { type: "passage", passage: SCENE },
            audio("Listen to the scene", say(["woman", "You forgot these. You always forget the oranges."], ["man", "I didn't forget them, Nini. I left them."], ["woman", "Same thing, when you're seventeen."], ["man", "The scholarship letter says I have to be in Surabaya by Monday. If I don't take this ferry, I'll lose my place."], ["woman", "Then take it."], ["man", "And who will fix the roof before the rains? Who will take you to the clinic?"], ["woman", "I carried your father when he was sick with fever, all the way across this island. I can carry oranges."], ["woman", "Your grandfather wanted to study too. He never took the ferry. He told me every day for forty years. Don't make me listen to you say it for forty years."])),
            vocab([["jetty", "dermaga kecil", "ship"], ["dusk", "senja", "evening"], ["beat", "jeda singkat (dalam naskah)", "clock"], ["fade", "meredup", "night"]], "Script words"),
          ],
        },
        {
          title: "Analysing drama",
          blocks: [
            table(["Element", "In the scene"], [["Setting (stage directions)", "a wooden jetty at dusk; sound of waves and a ferry horn"], ["Central conflict", "Wayan's future (scholarship) vs his duty to his grandmother"], ["Subtext", "“I didn't forget them. I left them.” = he is hesitating; leaving the oranges = not ready to leave her"], ["Characterisation", "Ni Luh: strong, wise, sacrificing; Wayan: caring but torn"], ["Symbol", "the ferry = opportunity; the oranges = home and love"], ["Ending", "open: we don't see his choice"]]),
            tryIt(pick("adv-c2-l1-try1", "What does Wayan need to do by Monday?", ["be in Surabaya for his scholarship", "fix the roof", "sell oranges"], 0, "Baris 6.", { passageId: SCENE.id })),
          ],
        },
      ],
      checkpoint: [
        pick("adv-c2-l1-c1", "Why is Wayan worried about leaving?", ["He thinks his grandmother needs his help.", "He hates Surabaya.", "He is afraid of ferries."], 0, "Baris 8.", { passageId: SCENE.id }),
        pick("adv-c2-l1-c2", "What story does Ni Luh tell about the grandfather?", ["He wanted to study but never took the ferry and regretted it for forty years.", "He sold oranges.", "He built the jetty."], 0, "Baris 11.", { passageId: SCENE.id }),
        fill("adv-c2-l1-c3", "Complete.", "I carried your father when he was sick with", ", all the way across this island.", ["fever"], "Baris 9.", { passageId: SCENE.id }),
        pickMany("adv-c2-l1-c4", "Choose ALL the sound effects in the stage directions.", ["waves", "a ferry horn", "rain on the roof", "birds singing"], [0, 1], "Baris 5 dan 12.", { passageId: SCENE.id }),
        pick("adv-c2-l1-c5", "What is the subtext of “I can carry oranges” (line 9)?", ["I am stronger than you think; don't use me as an excuse.", "I like oranges.", "I want you to carry the oranges."], 0, "Makna tersirat.", { passageId: SCENE.id, hots: true }),
        pick("adv-c2-l1-c6", "Why might the playwright end the scene without showing Wayan's decision?", ["to let the audience think about the choice themselves", "because the writer forgot", "because the ferry left"], 0, "Akhir terbuka.", { passageId: SCENE.id, hots: true }),
      ],
    },
    {
      id: "adv-c2-l2",
      skill: "speaking",
      title: "Performing a Scene",
      summary: "Voice, movement, pauses and emotion; rehearsing and performing.",
      sections: [
        {
          title: "Actor's toolkit",
          blocks: [
            table(["Tool", "Tips"], [["Voice", "volume, pace, pitch; slow down for emotional lines"], ["Pauses", "honour (Pause) and (beat); silence can be powerful"], ["Body", "posture, gestures, where you look"], ["Objective", "what does your character want in this scene?"], ["Obstacle", "what stops them from getting it?"], ["Subtext", "what is the character really saying?"]]),
            pics([["microphone", "voice"], ["hand", "gesture"], ["eye", "eye contact"], ["clock", "timing and pauses"]]),
          ],
        },
        {
          title: "Rehearse",
          blocks: [
            examples([{ right: "WAYAN wants: to do the right thing for his grandmother. Obstacle: his own dream and her insistence." }, { right: "NI LUH wants: Wayan to take the ferry without guilt. Obstacle: his love and stubbornness." }], "Objectives"),
            speaking({
              id: "adv-c2-l2-say",
              title: "Perform the scene",
              prompt: "Perform the scene from “The Last Ferry” (you may record both roles, changing your voice). Follow the stage directions, use pauses, and make the subtext clear through your tone.",
              image: "ship",
              prepSeconds: 120,
              seconds: 150,
              tips: ["Start slowly; establish the evening mood.", "Wayan: frustrated in line 8, then quiet.", "Ni Luh: calm, firm, tender.", "Let the long silence breathe.", "End by looking out at the sea."],
              models: [{ label: "Director's note", text: "Ni Luh should never shout. Her power comes from calmness. Wayan's outburst in line 8 should be the loudest moment, followed by a long silence. When Ni Luh places the orange in his hand, slow everything down. The final line, “Don't make me listen to you say it for forty years,” should be spoken almost with a smile, not with anger." }],
              rubric: ["I followed the stage directions.", "My tone showed the characters' emotions and subtext.", "I used pauses effectively.", "My pronunciation and projection were clear."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("adv-c2-l2-c1", voice("Fine. Do whatever you want."), "Listen. If said with a cold, flat tone, what does it probably mean?", ["The speaker is upset and doesn't approve.", "The speaker is excited.", "The speaker is giving permission happily."], 0, "Subteks lewat intonasi."),
        pick("adv-c2-l2-c2", "In acting, what is a character's “objective”?", ["what the character wants in the scene", "the stage size", "the audience's opinion"], 0, "Tujuan tokoh."),
        match("adv-c2-l2-c3", "Match the stage direction and its meaning.", [["(beat)", "a very short pause"], ["(aside)", "speaking to the audience, others can't hear"], ["Lights fade.", "the scene ends"], ["(with effort)", "physically difficult action"]], "Petunjuk panggung."),
        fill("adv-c2-l2-c4", "Complete: What stops a character from getting what they want is the ___ .", "What stops a character from getting what they want is the", ".", ["obstacle"], "Obstacle = rintangan."),
        trPick("adv-c2-l2-c5", "“Makna yang tersirat di balik kata-kata” in English is…", ["subtext", "subtitle", "context only"], 0, "Subtext."),
        pick("adv-c2-l2-c6", "Why is silence important in the scene?", ["It lets the emotion and tension sink in for the audience.", "Actors forget their lines.", "To save time."], 0, "Kekuatan jeda.", { hots: true }),
      ],
    },
    {
      id: "adv-c2-l3",
      skill: "writing",
      title: "Write a Scene",
      summary: "Script format, dialogue that reveals character, and a clear dramatic conflict.",
      sections: [
        {
          title: "Script conventions",
          blocks: [
            table(["Convention", "Example"], [["Character names in capitals before lines", "NI LUH: You forgot these."], ["Stage directions in brackets and present tense", "(She sits beside him.)"], ["Short, natural dialogue", "Then take it."], ["Show, don't tell", "(He stares at the orange.) instead of “He is sad.”"]]),
            tip("Mulai adegan **di tengah konflik** (in medias res). Setiap baris dialog sebaiknya **mengungkap karakter** atau **memajukan konflik**."),
          ],
        },
        {
          title: "Write",
          blocks: [
            writing({
              id: "adv-c2-l3-write",
              title: "My one-scene play",
              prompt: "Write an original one-scene play (two or three characters) about a difficult decision: leaving home, telling the truth, choosing a career, forgiving someone. Include setting directions, a clear conflict, subtext and an ending (open or closed).",
              image: "owl-read",
              minWords: 280,
              maxWords: 420,
              tips: ["(Setting: place, time, mood)", "CHARACTER: line (direction)", "Build tension to a climax.", "Use at least one moment of silence.", "End with an image or a final line."],
              models: [{ label: "Example (opening)", text: "(A school rooftop at night. City lights below. DINDA, 17, stands near the edge of the railing with her phone. RAKA, 17, enters, out of breath.)\nRAKA: Your mom called me. Six times.\nDINDA: (not turning around) Then answer her.\nRAKA: She thinks you're at my house.\nDINDA: (a short laugh) Everyone thinks I'm somewhere I'm not.\n(Pause. A motorbike passes far below.)\nRAKA: Is this about the audition?\nDINDA: (turning) They called. I got in. Jakarta Arts Institute, full scholarship.\nRAKA: That's — Dinda, that's amazing!\nDINDA: Dad already printed the medical school forms. He laminated them. (beat) Who laminates forms?\n…" }],
              rubric: ["I used correct script format.", "The conflict is clear and builds to a climax.", "Dialogue sounds natural and reveals character.", "I used stage directions to show (not tell) emotions.", "The ending is meaningful."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("adv-c2-l3-c1", "Where are stage directions usually written?", ["in brackets, in the present tense", "at the end of the book", "in the title"], 0, "Konvensi naskah."),
        pick("adv-c2-l3-c2", "Which is “showing” rather than “telling”?", ["(She crumples the letter and throws it away.)", "She is very angry.", "She feels angry."], 0, "Show, don't tell."),
        arrange("adv-c2-l3-c3", "Put the words in order.", "She sits beside him without a word", "Petunjuk panggung present tense."),
        fill("adv-c2-l3-c4", "Complete: Starting a scene in the middle of the action is called in medias ___ .", "Starting a scene in the middle of the action is called in medias", ".", ["res"], "In medias res."),
        trPick("adv-c2-l3-c5", "“Akhir yang terbuka” in English is…", ["an open ending", "an opening end", "a free finish"], 0, "Open ending."),
        pick("adv-c2-l3-c6", "In the model opening, what does Dad laminating the forms suggest?", ["He is very determined that Dinda study medicine.", "He likes office supplies.", "He supports her arts dream."], 0, "Detail yang bermakna.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "adv-c2-post",
    title: "Chapter 2 Posttest",
    passPercent: 70,
    passages: [SCENE],
    questions: [
      pick("adv-c2-post1", "The hidden meaning behind a character's words is the…", ["subtext", "subtitle", "setting", "script"], 0, "Subteks."),
      listen("adv-c2-post2", voice("Lights fade. The sound of rain continues in the darkness."), "Listen. What is this part of a script?", ["a stage direction", "a line of dialogue", "a review", "a soliloquy"], 0, "Petunjuk panggung."),
      trPick("adv-c2-post3", "“Penulis naskah drama” in English is…", ["playwright", "playwrite", "play rider", "player"], 0, "Playwright."),
      pick("adv-c2-post4", "A speech by a character alone, revealing inner thoughts, is a…", ["soliloquy", "dialogue", "chorus", "stage direction"], 0, "Solilokui."),
      arrange("adv-c2-post5", "Put the words in order.", "The ferry horn sounds again in the distance", "Petunjuk panggung."),
      pick("adv-c2-post6", "What time of day is the scene set?", ["dusk", "noon", "midnight", "early morning"], 0, "Baris 1.", { passageId: SCENE.id }),
      match("adv-c2-post7", "Match the symbol and its possible meaning.", [["the ferry", "opportunity"], ["the oranges", "home and love"], ["the storm season", "difficulties ahead"]], "Simbol."),
      fill("adv-c2-post8", "Complete.", "If I don't take this ferry, I'll lose my", ".", ["place"], "Baris 6.", { passageId: SCENE.id }),
      pick("adv-c2-post9", "What is Ni Luh's main objective in the scene?", ["to persuade Wayan to take the ferry without guilt", "to keep Wayan at home", "to sell oranges", "to fix the roof"], 0, "Tujuan tokoh.", { passageId: SCENE.id, hots: true }),
      pick("adv-c2-post10", "How does the grandfather's story affect the conflict?", ["It warns Wayan about the cost of regret, pushing him toward leaving.", "It makes Wayan stay.", "It is unrelated.", "It ends the play happily."], 0, "Fungsi dramatik.", { passageId: SCENE.id, hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Lights, Camera, Act!",
    questions: [
      live("adv-c2-live1", "Instructions in brackets:", ["stage directions", "subtitles", "lyrics", "captions"], 0, "report"),
      live("adv-c2-live2", "Hidden meaning:", ["subtext", "subtitle", "subject", "substitute"], 0, "owl-think"),
      live("adv-c2-live3", "(beat) means…", ["short pause", "hit someone", "music starts", "scene ends"], 0, "clock"),
      live("adv-c2-live4", "“Naskah” =", ["script", "screen", "scene", "scream"], 0, "book", true),
      live("adv-c2-live5", "What a character wants:", ["objective", "obstacle", "setting", "prop"], 0, "target"),
      live("adv-c2-live6", "The ferry symbolises…", ["opportunity", "danger only", "food", "money"], 0, "ship"),
      live("adv-c2-live7", "Writer of plays:", ["playwright", "poet", "novelist", "journalist"], 0, "pencil"),
      live("adv-c2-live8", "Show, don't…", ["tell", "act", "write", "read"], 0, "eye"),
    ],
  },
};
