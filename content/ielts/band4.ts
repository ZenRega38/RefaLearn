import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { audio, examples, fill, listen, live, match, pick, pics, repeat, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing, ynng } from "../kit";

// IELTS Academic — Level 4: Band 6.5.

const CITIES: Passage = {
  id: "ielts4-cities",
  title: "Should Cities Ban Cars from Their Centres?",
  lines: [
    "Across the world, a growing number of cities are closing their historic centres to private cars. Supporters point to cleaner air, quieter streets and safer conditions for pedestrians, and these benefits are, in my view, beyond dispute.",
    "Yet the debate is often presented too simply. Critics are right to warn that small shopkeepers may lose customers if access becomes difficult, at least in the short term.",
    "The experience of several European cities suggests, however, that such fears are frequently exaggerated. Where good public transport and cycling routes were introduced at the same time, retail sales in pedestrianised areas generally recovered within two or three years.",
    "What matters most, I would argue, is not the ban itself but the alternatives that accompany it. A car-free centre without reliable buses simply moves the traffic problem to the surrounding neighbourhoods.",
    "For Indonesian cities, where motorbikes rather than cars dominate the roads, policies designed for Europe cannot simply be copied. Jakarta's car-free day on Sundays has been popular, but it is a weekly event rather than a permanent change.",
    "Ultimately, city leaders should see car restrictions as one part of a broader transport strategy. Planned carefully, they can make cities more pleasant for everyone; imposed suddenly, they are likely to provoke resistance.",
  ],
};

export const BAND4: Level = {
  id: "ielts-b4",
  title: "Level 4 — Band 6.5: Good User",
  description: "Complete notes from academic lectures in Listening Part 4, identify the writer's views with Yes/No/Not Given, write a balanced discussion essay with strong cohesion, and improve fluency and pronunciation.",
  targetScore: "Target Band 6.5",
  cover: ["teacher-man", "owl-think", "microphone"],
  pretest: {
    id: "ielts-b4-pre",
    title: "Level 4 Pretest",
    passPercent: 0,
    questions: [
      pick("ielts-b4-pre1", "Listening Part 4 is…", ["an academic lecture with no breaks", "a conversation between friends", "a phone booking", "an interview"], 0, "Part 4 = kuliah tanpa jeda."),
      listen("ielts-b4-pre2", voice("The main reason for this decline was the introduction of cheaper synthetic materials."), "Listen. What caused the decline?", ["cheaper synthetic materials", "bad weather", "high taxes", "a lack of workers"], 0, "Main reason."),
      trPick("ielts-b4-pre3", "“Pandangan penulis” in English is…", ["the writer's views", "the writer's look", "the writer's eyes", "the writer's text"], 0, "Writer's views → Yes/No/Not Given."),
      pick("ielts-b4-pre4", "“Discuss both views and give your own opinion” requires…", ["both sides plus a clear personal opinion", "only your opinion", "only one side", "no opinion"], 0, "Dua sisi + opini."),
      pick("ielts-b4-pre5", "Which word is a cohesive device?", ["Consequently", "Bamboo", "Quickly", "Large"], 0, "Penanda kohesi."),
    ],
  },
  lessons: [
    {
      id: "ielts-b4-l1",
      skill: "listening",
      title: "Listening Part 4: Lectures and Note Completion",
      summary: "Following signposts in a lecture and completing notes with the exact word.",
      sections: [
        {
          title: "Lecture signposts",
          blocks: [
            table(["Signpost", "What comes next"], [["Today I'm going to talk about…", "topic"], ["Let's start with / Turning now to…", "a new section"], ["The main reason / The key factor…", "an important answer"], ["For instance / such as…", "an example (often an answer)"], ["To put it another way…", "a paraphrase"], ["To sum up…", "summary"]]),
            tip("Part 4 **tidak ada jeda** di tengah. Baca seluruh catatan sebelum audio dimulai, perhatikan **judul bagian** di catatan agar tidak tertinggal."),
            pics([["teacher-man", "lecturer"], ["report", "notes"], ["pencil", "write exactly"], ["clock", "no break"]]),
          ],
        },
        {
          title: "Practice lecture",
          blocks: [
            audio("Lecture: The history of indigo dye", say(["man", "Today I'm going to talk about indigo, one of the oldest natural dyes. Let's start with its origins. Indigo comes from the leaves of plants in the Indigofera family, and it was used in India more than four thousand years ago. In Indonesia, it became important for dyeing textiles such as tenun in Nusa Tenggara. The leaves are soaked in water, where they ferment, and the liquid is then mixed with lime. Turning now to its decline: in the late nineteenth century, a German chemist developed a synthetic version. The main reason indigo farming collapsed was price, because synthetic indigo was far cheaper. However, there has recently been a revival. Fashion designers and environmentally conscious consumers are choosing natural indigo because it avoids toxic chemicals. To sum up, indigo shows how a traditional craft can return when values change."])),
            tryIt(fill("ielts-b4-l1-try", "Complete the notes (ONE WORD). Indigo comes from the ___ of Indigofera plants.", "Indigo comes from the", "of Indigofera plants.", ["leaves"], "From the leaves.")),
          ],
        },
      ],
      checkpoint: [
        fill("ielts-b4-l1-c1", "Notes (A NUMBER): used in India more than ___ years ago", "used in India more than", "years ago", ["4000", "4,000", "four thousand"], "Four thousand years."),
        fill("ielts-b4-l1-c2", "Notes (ONE WORD): leaves soaked in water and allowed to ___", "leaves soaked in water and allowed to", "", ["ferment"], "They ferment."),
        fill("ielts-b4-l1-c3", "Notes (ONE WORD): liquid mixed with ___", "liquid mixed with", "", ["lime"], "Mixed with lime."),
        pick("ielts-b4-l1-c4", "What was the main reason for the collapse of indigo farming?", ["synthetic indigo was cheaper", "the plants disappeared", "farmers moved to cities"], 0, "Price."),
        pick("ielts-b4-l1-c5", "Why is natural indigo becoming popular again?", ["It avoids toxic chemicals.", "It is cheaper.", "It is faster to produce."], 0, "Revival karena ramah lingkungan."),
        pick("ielts-b4-l1-c6", "The lecturer says “To sum up…”. What should you expect?", ["a summary of the main point", "a new example", "a list of dates"], 0, "Penanda ringkasan.", { hots: true }),
      ],
    },
    {
      id: "ielts-b4-l2",
      skill: "reading",
      title: "Reading: Yes / No / Not Given",
      summary: "Identifying the writer's claims and opinions, and recognising hedged or qualified views.",
      passages: [CITIES],
      sections: [
        {
          title: "Facts vs. views",
          blocks: [
            table(["Answer", "Meaning"], [["YES", "the statement agrees with the writer's view/claim"], ["NO", "the statement contradicts the writer's view/claim"], ["NOT GIVEN", "the writer's view on this is not stated"]]),
            table(["Signals of the writer's view", "Example"], [["in my view, I would argue", "line 1, line 4"], ["evaluative words", "beyond dispute, exaggerated, simply"], ["qualifiers", "often, generally, at least in the short term"]]),
            warn("Perhatikan **kata pembatas** (*often, some, generally*). Pernyataan *“Shopkeepers always lose customers”* bertentangan dengan pandangan penulis yang lebih hati-hati."),
          ],
        },
        {
          title: "Practice text",
          blocks: [
            { type: "passage", passage: CITIES },
            vocab([["beyond dispute", "tidak terbantahkan", "thumbs-up"], ["exaggerated", "dilebih-lebihkan", "surprised"], ["pedestrianised", "dijadikan khusus pejalan kaki", "run"], ["provoke resistance", "memicu penolakan", "angry"]], "Key vocabulary"),
            tryIt(ynng("ielts-b4-l2-try", "The benefits of car-free centres are clear.", "YES", "Baris 1: beyond dispute.", { passageId: CITIES.id })),
          ],
        },
      ],
      checkpoint: [
        ynng("ielts-b4-l2-c1", "Critics' concerns about shopkeepers are completely unfounded.", "NO", "Baris 2: critics are right (setidaknya jangka pendek).", { passageId: CITIES.id }),
        ynng("ielts-b4-l2-c2", "Fears about lost sales are often exaggerated.", "YES", "Baris 3.", { passageId: CITIES.id }),
        ynng("ielts-b4-l2-c3", "Car bans are more important than providing alternatives.", "NO", "Baris 4: alternatif paling penting.", { passageId: CITIES.id }),
        ynng("ielts-b4-l2-c4", "Jakarta should make its car-free day permanent.", "NOT GIVEN", "Penulis tidak menyarankan ini.", { passageId: CITIES.id }),
        fill("ielts-b4-l2-c5", "Complete (ONE WORD): In Indonesian cities, ___ dominate the roads.", "In Indonesian cities,", "dominate the roads.", ["motorbikes"], "Baris 5.", { passageId: CITIES.id }),
        pick("ielts-b4-l2-c6", "What is the writer's overall position?", ["Car restrictions work best as part of a carefully planned transport strategy.", "All cities must ban cars immediately.", "Car bans always fail.", "Europe's policies can be copied directly."], 0, "Baris 6.", { passageId: CITIES.id, hots: true }),
      ],
    },
    {
      id: "ielts-b4-l3",
      skill: "writing",
      title: "Writing Task 2: Discussion Essays and Cohesion",
      summary: "Discussing two views fairly, giving your opinion, and linking ideas smoothly.",
      sections: [
        {
          title: "Structure",
          blocks: [
            text("**Task:** Some people think that city centres should be closed to private cars. Others believe this would harm businesses and residents. Discuss both views and give your own opinion."),
            table(["Paragraph", "Content"], [["Introduction", "paraphrase both views + your opinion"], ["Body 1", "view A with reasons and an example"], ["Body 2", "view B with reasons and an example"], ["(Body 3 or within conclusion)", "your opinion developed"], ["Conclusion", "summary + clear opinion"]]),
            tip("Jangan menulis dua sisi lalu lupa opini. Untuk Band 6.5+, opini harus **jelas** dan **konsisten** dari pendahuluan sampai kesimpulan."),
          ],
        },
        {
          title: "Cohesion beyond “firstly, secondly”",
          blocks: [
            table(["Device", "Example"], [["Referencing", "this policy, such measures, these concerns"], ["Synonyms", "car ban → restrictions → closing the centre to vehicles"], ["Linking adverbials", "Consequently, Nevertheless, In contrast, Admittedly"], ["Topic sentences that link", "While these benefits are significant, there are also valid concerns about…"]]),
            examples([{ wrong: "Firstly, cars are bad. Secondly, cars are bad for health. Thirdly, cars are noisy.", right: "Private vehicles are a major source of urban pollution. Consequently, reducing their numbers in the centre would improve air quality and, in turn, public health.", note: "Kohesi alami, bukan daftar." }]),
            writing({
              id: "ielts-b4-l3-write",
              title: "Discussion essay",
              prompt: "Some people think that city centres should be closed to private cars. Others believe this would harm businesses and residents. Discuss both views and give your own opinion. Write at least 250 words.",
              image: "traffic",
              minWords: 250,
              maxWords: 330,
              tips: ["Intro: While some argue …, others contend … In my view, …", "Body 1: Advocates of … point out that … Consequently, …", "Body 2: On the other hand, opponents worry that … This concern is understandable because …", "Conclusion: In conclusion, although …, I believe …"],
              models: [{ label: "Band 7 model", text: "While some argue that private cars should be banned from city centres, others contend that such restrictions would damage local businesses and inconvenience residents. In my view, car-free centres are beneficial, provided that they are introduced alongside good public transport.\nAdvocates of car-free zones point out that private vehicles are a major source of air and noise pollution. Removing them from busy centres makes streets cleaner, quieter and safer for pedestrians, particularly children and the elderly. Consequently, these areas often become more attractive places to walk, shop and socialise.\nOn the other hand, opponents worry that shops and restaurants will lose customers who are used to driving and parking nearby. This concern is understandable, especially in cities where buses are unreliable. Residents with mobility problems may also find it harder to reach services.\nNevertheless, experience from many cities suggests that these problems are temporary when the policy is well planned. If frequent buses, safe cycling routes and parking on the edge of the centre are provided, visitors continue to arrive, simply by other means.\nIn conclusion, although the concerns of businesses deserve attention, I believe the long-term benefits of car-free centres outweigh the drawbacks, as long as cities invest in alternatives first." }],
              rubric: ["I discussed both views fairly with reasons.", "My own opinion is clear and consistent.", "I used a range of cohesive devices, not just firstly/secondly.", "I used precise topic vocabulary.", "My paragraphs each have one clear central idea."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("ielts-b4-l3-c1", "In a “discuss both views” essay, where should your opinion appear?", ["in the introduction and conclusion (and possibly developed in the body)", "nowhere", "only in the title"], 0, "Opini jelas."),
        match("ielts-b4-l3-c2", "Match the linking word and its function.", [["Consequently", "result"], ["Nevertheless", "contrast"], ["Admittedly", "concession"], ["For instance", "example"]], "Fungsi kohesi."),
        pick("ielts-b4-l3-c3", "Which phrase avoids repeating “car ban”?", ["such restrictions", "car ban car ban", "the ban of car"], 0, "Referensi."),
        fill("ielts-b4-l3-c4", "Complete: This concern is ___ , especially where buses are unreliable. (dapat dimengerti)", "This concern is", ", especially where buses are unreliable.", ["understandable"], "Understandable.", { translate: true }),
        trPick("ielts-b4-l3-c5", "“Manfaat jangka panjang lebih besar daripada kerugiannya.” in English is…", ["The long-term benefits outweigh the drawbacks.", "The long benefits are more weight drawbacks.", "Benefits long outweighs drawback."], 0, "Outweigh."),
        pick("ielts-b4-l3-c6", "An essay lists five ideas in one paragraph with “Firstly… Secondly… Thirdly…” but no explanation. Which criterion is weakest?", ["Coherence and Cohesion / Task Response (ideas not developed)", "Spelling only", "Handwriting"], 0, "Ide tidak dikembangkan.", { hots: true }),
      ],
    },
    {
      id: "ielts-b4-l4",
      skill: "speaking",
      title: "Speaking: Fluency and Pronunciation",
      summary: "Reducing hesitation, using fillers naturally, word stress, chunking and intonation.",
      sections: [
        {
          title: "Fluency strategies",
          blocks: [
            table(["Problem", "Strategy"], [["Long silences", "use natural fillers: Well, let me think… / That's an interesting question…"], ["Searching for a word", "paraphrase: “the thing you use to…”"], ["Self-correcting too much", "keep going; small errors matter less than flow"], ["Short answers", "extend with because / for example / which means"]]),
            tip("Fluency bukan berarti bicara cepat. Pemeriksa menilai **kelancaran yang alami** dan **keterhubungan ide**. Bicara dengan kecepatan sedang yang stabil."),
          ],
        },
        {
          title: "Pronunciation features",
          blocks: [
            table(["Feature", "Example"], [["Word stress", "phoTOgraphy, photoGRAphic, ecoNOmic, enVIronment"], ["Sentence stress", "I DIDN'T say she STOLE it."], ["Chunking (pausing in groups)", "In my opinion / public transport / should be free."], ["Linking", "an_apple, turn_off, pick_it_up"], ["Intonation", "rising for yes/no questions, falling for statements"]]),
            repeat(["photography", "photographic", "economy", "economic", "environment", "In my opinion / public transport / should be free."]),
            speaking({
              id: "ielts-b4-l4-say",
              title: "Fluency challenge",
              prompt: "Speak for 90 seconds on this topic without stopping: “Describe a skill you would like to learn and explain why.” Focus on smooth chunks, clear word stress and natural fillers instead of silence.",
              image: "microphone",
              prepSeconds: 30,
              seconds: 90,
              tips: ["Well, one skill I'd really love to learn is …", "The main reason is that …", "Actually, I've already tried …", "If I could learn it, I think I'd …"],
              models: [{ label: "Model", text: "Well, one skill I'd really love to learn is underwater photography. The main reason is that I grew up near the sea in Manado, and I've always been amazed by the colours of the coral reefs. Actually, I've already tried taking pictures with a cheap waterproof camera, but they were blurry and dark, so I realised it's much harder than it looks. If I could learn it properly, I think I'd use my photos to show people why reefs need protecting, because many people have never seen what's under the water." }],
              rubric: ["I kept talking for about 90 seconds.", "I used fillers instead of long silences.", "My word stress on long words was clear.", "I grouped words into natural chunks.", "My ideas were connected with linking words."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("ielts-b4-l4-c1", voice("environment"), "Listen. Which syllable is stressed?", ["en-VI-ron-ment", "EN-vi-ron-ment", "en-vi-RON-ment"], 0, "Tekanan pada suku kedua."),
        pick("ielts-b4-l4-c2", "Which is the most natural way to buy time?", ["That's an interesting question. Let me think…", "Ummmmmmm… (10 seconds)", "I don't know."], 0, "Filler alami."),
        match("ielts-b4-l4-c3", "Match the word and its stress.", [["economy", "e-CON-o-my"], ["economic", "e-co-NOM-ic"], ["photography", "pho-TOG-ra-phy"], ["photographic", "pho-to-GRAPH-ic"]], "Pola tekanan kata."),
        fill("ielts-b4-l4-c4", "Complete the paraphrase strategy: I can't remember the word, but it's the thing you ___ to open bottles.", "I can't remember the word, but it's the thing you", "to open bottles.", ["use"], "Parafrase."),
        trPick("ielts-b4-l4-c5", "“Kelancaran” (speaking criterion) in English is…", ["fluency", "fluidity tone", "flow speed"], 0, "Fluency."),
        pick("ielts-b4-l4-c6", "A candidate speaks very fast but often loses the thread of ideas. What should they focus on?", ["coherence: organising and linking ideas at a steady pace", "speaking even faster", "using more difficult words only"], 0, "Fluency & coherence.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ielts-b4-post",
    title: "Level 4 Mock Quiz",
    passPercent: 70,
    passages: [CITIES],
    questions: [
      listen("ielts-b4-post1", say(["man", "Turning now to the second factor, which is the role of rainfall in seed dispersal."]), "Listen. What is the lecturer doing?", ["introducing a new section", "summarising the lecture", "giving an example", "ending the lecture"], 0, "Turning now to."),
      listen("ielts-b4-post2", say(["woman", "Bees, for instance, are attracted mainly by blue and yellow flowers."]), "Listen. Which colours attract bees, according to the speaker?", ["blue and yellow", "red and white", "green and pink", "black and orange"], 0, "Blue and yellow."),
      listen("ielts-b4-post3", say(["man", "Although many assume the decline was caused by disease, the evidence points instead to a loss of habitat."]), "Listen. What caused the decline?", ["loss of habitat", "disease", "hunting", "pollution"], 0, "Points instead to.", { hots: true }),
      ynng("ielts-b4-post4", "Car-free centres make streets safer for pedestrians.", "YES", "Baris 1.", { passageId: CITIES.id }),
      ynng("ielts-b4-post5", "Retail sales never recover after cars are banned.", "NO", "Baris 3: generally recovered.", { passageId: CITIES.id }),
      ynng("ielts-b4-post6", "Motorbikes should be banned in Indonesian cities.", "NOT GIVEN", "Tidak disebut.", { passageId: CITIES.id }),
      pick("ielts-b4-post7", "What does the writer suggest about copying European policies?", ["They need to be adapted to local conditions.", "They work perfectly everywhere.", "They are always harmful.", "They should be banned."], 0, "Baris 5.", { passageId: CITIES.id, hots: true }),
      pick("ielts-b4-post8", "Which sentence shows good cohesion?", ["Air pollution harms health. Consequently, reducing traffic would benefit residents.", "Air pollution. Health. Traffic.", "Firstly secondly thirdly finally."], 0, "Kohesi."),
      pick("ielts-b4-post9", "Which introduction fits “Discuss both views and give your opinion”?", ["While some favour …, others argue … In my opinion, …", "I agree.", "There are many cars in cities."], 0, "Dua pandangan + opini."),
      pick("ielts-b4-post10", "Which word has stress on the SECOND syllable?", ["environment", "photograph", "comfortable", "vegetable"], 0, "en-VI-ron-ment."),
    ],
  },
  live: {
    title: "Live Quiz — Band 6.5 Sprint",
    questions: [
      live("ielts-b4-live1", "Writer's view questions:", ["Yes/No/Not Given", "True/False/Not Given", "Matching headings", "Map labelling"], 0, "owl-think"),
      live("ielts-b4-live2", "Part 4 Listening has…", ["no break", "two breaks", "three speakers", "a map"], 0, "teacher-man"),
      live("ielts-b4-live3", "Result connector:", ["Consequently", "Admittedly", "For instance", "Whereas"], 0, "target"),
      live("ielts-b4-live4", "“Dilebih-lebihkan” =", ["exaggerated", "excited", "exhausted", "expected"], 0, "surprised", true),
      live("ielts-b4-live5", "Stress: e-CON-o-my or e-co-NOM-ic?", ["economy = e-CON-o-my", "economy = E-co-no-my", "economic = E-co-nom-ic", "both same"], 0, "money"),
      live("ielts-b4-live6", "Natural filler:", ["Well, let me think…", "Hmmmm (silence)", "I don't know", "Next question"], 0, "microphone"),
      live("ielts-b4-live7", "Avoid repeating with…", ["synonyms and references", "more repetition", "capital letters", "short words"], 0, "pencil"),
      live("ielts-b4-live8", "Benefits ___ drawbacks.", ["outweigh", "outway", "overweigh", "outwait"], 0, "thumbs-up"),
    ],
  },
};

