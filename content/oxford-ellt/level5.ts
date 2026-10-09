import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { audio, examples, fill, listen, live, match, pick, pickMany, pics, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, writing } from "../kit";

// Oxford ELLT — Level 5: Advanced (C1).

const URBAN: Passage = {
  id: "ellt5-urban",
  title: "Rethinking Urban Heat",
  lines: [
    "As global temperatures rise, cities face a particular challenge known as the urban heat island effect. Dense concentrations of concrete and asphalt absorb solar radiation during the day and release it slowly at night, leaving urban areas several degrees warmer than the surrounding countryside.",
    "The consequences extend well beyond discomfort. Prolonged heat exacerbates respiratory and cardiovascular conditions, disproportionately affecting elderly residents and those without access to air conditioning. Paradoxically, the widespread use of air conditioning compounds the problem by expelling additional heat into the streets.",
    "Conventional responses have tended to focus on individual buildings, such as reflective roofing materials. While such measures are worthwhile, a growing body of research suggests that their impact is limited unless they form part of a coordinated, city-wide strategy.",
    "Urban greening is frequently cited as the most effective intervention. Trees provide shade and cool the air through evapotranspiration, and their benefits extend to improved mental health and biodiversity. Nevertheless, greening schemes are not without drawbacks: they require long-term maintenance, and in some cases have contributed to rising property values that displace low-income residents.",
    "Ultimately, mitigating urban heat demands an integrated approach that considers not only engineering solutions but also questions of equity, ensuring that those most vulnerable to heat are not excluded from its remedies.",
  ],
};

export const ELLT5: Level = {
  id: "ellt-l5",
  title: "Level 5 — Advanced (C1)",
  description: "Read dense academic prose for nuance, complete academic lecture notes, write with academic register and cohesion, and lead a picture-based discussion in Speaking Task 4.",
  targetScore: "Target CEFR C1",
  cover: ["hot", "tree", "graduation"],
  pretest: {
    id: "ellt-l5-pre",
    title: "Level 5 Pretest",
    passPercent: 0,
    questions: [
      pick("ellt-l5-pre1", "“Exacerbate” is closest in meaning to…", ["make worse", "make better", "measure", "explain"], 0, "Memperburuk."),
      listen("ellt-l5-pre2", voice("Paradoxically, the solution itself contributes to the problem."), "What does “paradoxically” signal?", ["a surprising contradiction", "a summary", "an example", "a definition"], 0, "Paradoks."),
      trPick("ellt-l5-pre3", "“Kesetaraan/keadilan” (social) in English is…", ["equity", "equality sign", "equation", "equipment"], 0, "Equity."),
      pick("ellt-l5-pre4", "In Speaking Task 4, the discussion is based on…", ["a visual prompt", "your essay", "a reading text", "a song"], 0, "Gambar."),
      pick("ellt-l5-pre5", "Which sentence is the most academic?", ["A growing body of research suggests that greening reduces heat.", "Loads of studies say trees are cool.", "Trees are nice, right?"], 0, "Register akademik."),
    ],
  },
  lessons: [
    {
      id: "ellt-l5-l1",
      skill: "reading",
      title: "Reading Dense Academic Prose",
      summary: "Nuance, hedging, paradox and evaluation in C1-level texts.",
      passages: [URBAN],
      sections: [
        {
          title: "The text",
          blocks: [
            { type: "passage", passage: URBAN },
            vocab([["exacerbate", "memperburuk", "hot"], ["disproportionately", "secara tidak proporsional", "money"], ["compound (a problem)", "memperparah", "factory"], ["evapotranspiration", "evapotranspirasi", "tree"], ["mitigate", "mengurangi/meredam", "target"], ["displace", "menggusur", "house"]], "C1 vocabulary"),
          ],
        },
        {
          title: "Reading for nuance",
          blocks: [
            table(["Signal", "Example", "Meaning"], [["Hedging", "a growing body of research suggests", "cautious claim"], ["Concession", "While such measures are worthwhile, …", "partial acceptance"], ["Paradox", "Paradoxically, air conditioning compounds…", "surprising contradiction"], ["Limitation", "not without drawbacks", "has some problems"], ["Writer's conclusion", "Ultimately, … demands an integrated approach", "final position"]]),
            tip("Soal C1 sering menanyakan **kenapa** penulis memakai kata tertentu atau **sikap** penulis terhadap sebuah solusi. Perhatikan **konsesi** dan **batasan**."),
            tryIt(pick("ellt-l5-l1-try", "Why is the use of air conditioning described as paradoxical?", ["It relieves heat indoors but adds heat to the streets.", "It is very expensive.", "It cools the countryside.", "It is rarely used."], 0, "Paragraf 2.", { passageId: URBAN.id })),
          ],
        },
      ],
      checkpoint: [
        pick("ellt-l5-l1-c1", "Who is most affected by prolonged heat, according to the text?", ["elderly residents and people without air conditioning", "young athletes", "tourists", "farmers in the countryside"], 0, "Paragraf 2.", { passageId: URBAN.id }),
        pick("ellt-l5-l1-c2", "What is the writer's view of reflective roofing?", ["worthwhile but limited on its own", "useless", "the best solution", "too expensive to consider"], 0, "Konsesi paragraf 3.", { passageId: URBAN.id }),
        pick("ellt-l5-l1-c3", "Which drawback of greening is mentioned?", ["It can raise property values and displace poorer residents.", "Trees increase pollution.", "Trees reduce biodiversity.", "Trees make cities hotter."], 0, "Paragraf 4.", { passageId: URBAN.id }),
        pick("ellt-l5-l1-c4", "The word “mitigating” in paragraph 5 is closest in meaning to", ["reducing", "measuring", "ignoring", "increasing"], 0, "Mitigate = mengurangi.", { passageId: URBAN.id }),
        pickMany("ellt-l5-l1-c5", "Choose ALL benefits of trees mentioned.", ["shade", "cooling through evapotranspiration", "improved mental health", "lower property values"], [0, 1, 2], "Paragraf 4.", { passageId: URBAN.id }),
        pick("ellt-l5-l1-c6", "What does the writer mean by an “integrated approach”?", ["combining technical solutions with attention to social fairness", "only planting trees", "only installing air conditioning", "building more roads"], 0, "Kesimpulan penulis.", { passageId: URBAN.id, hots: true }),
      ],
    },
    {
      id: "ellt-l5-l2",
      skill: "listening",
      title: "Academic Lecture Notes (C1)",
      summary: "Completing detailed notes from a lecture with academic terms and precise details.",
      sections: [
        {
          title: "Strategy for C1 note completion",
          blocks: [
            table(["Focus", "Example"], [["Technical terms", "evapotranspiration, biodiversity"], ["Precise numbers", "up to 4°C, 30 per cent"], ["Cause-effect", "because of…, which leads to…"], ["Contrasts", "whereas…, in contrast…"]]),
            pics([["teacher-man", "lecture"], ["report", "notes"], ["hot", "temperature"], ["tree", "greening"]]),
          ],
        },
        {
          title: "Practice lecture",
          blocks: [
            audio("Lecture: Measuring the cooling effect of trees (played twice)", say(["man", "In our study, we compared temperatures in streets with different levels of tree cover. Streets with at least forty per cent canopy cover were, on average, up to four degrees Celsius cooler on summer afternoons than streets with little or no cover. Interestingly, the effect was strongest not at midday but in the early evening, because shaded pavements had stored less heat during the day. We also found that a single large tree provided considerably more cooling than several small ones, owing to its wider canopy. However, the benefits depended heavily on irrigation; during a drought, trees close their pores to save water, which reduces their cooling effect."]), true),
            tryIt(fill("ellt-l5-l2-try", "Notes: Streets with at least ___ % canopy cover", "Streets with at least", "% canopy cover", ["40", "forty"], "Forty per cent.")),
          ],
        },
      ],
      checkpoint: [
        fill("ellt-l5-l2-c1", "Notes: up to ___ °C cooler on summer afternoons", "up to", "°C cooler on summer afternoons", ["4", "four"], "Up to four degrees."),
        fill("ellt-l5-l2-c2", "Notes: strongest effect in the early ___", "strongest effect in the early", "", ["evening"], "Early evening."),
        pick("ellt-l5-l2-c3", "Why does one large tree cool more than several small ones?", ["its wider canopy", "its deeper roots", "its darker leaves", "its age"], 0, "Owing to its wider canopy."),
        pick("ellt-l5-l2-c4", "What happens to trees during a drought?", ["They close their pores, reducing cooling.", "They grow faster.", "They cool more.", "They lose all leaves immediately."], 0, "Kekeringan."),
        fill("ellt-l5-l2-c5", "Notes: benefits depend heavily on ___ (ONE WORD)", "benefits depend heavily on", "", ["irrigation"], "Irrigation."),
        pick("ellt-l5-l2-c6", "Why was the cooling effect strongest in the early evening rather than at midday?", ["Shaded pavements had stored less heat during the day.", "The sun was strongest then.", "Trees grow at night.", "People leave the streets."], 0, "Penalaran sebab-akibat.", { hots: true }),
      ],
    },
    {
      id: "ellt-l5-l3",
      skill: "writing",
      title: "Academic Register and Cohesion",
      summary: "Nominalisation, hedging, precise vocabulary and cohesive devices for C1-level essays.",
      sections: [
        {
          title: "Upgrading your style",
          blocks: [
            table(["Less academic", "More academic"], [["Cities are getting hotter and this is bad.", "Rising urban temperatures pose a significant threat to public health."], ["Trees help a lot.", "Urban greening can substantially reduce surface temperatures."], ["Some people say…", "It has been argued that…"], ["This is a big problem for poor people.", "This disproportionately affects low-income households."], ["So we need to do more.", "Consequently, a more integrated response is required."]]),
            text("Teknik utama: **nominalisasi** (*increase → an increase in*), **hedging** (*may, tend to, appears to*), **kata kerja pelaporan** (*argue, suggest, indicate*) dan **penanda kohesi** (*this approach, such measures, consequently*)."),
          ],
        },
        {
          title: "Write",
          blocks: [
            examples([{ wrong: "In my opinion, I think that trees are very very good for cities.", right: "Urban trees offer considerable benefits, although their effectiveness depends on long-term maintenance.", note: "Ringkas, akademik, bernuansa." }], "Refine"),
            writing({
              id: "ellt-l5-l3-write",
              title: "C1 essay",
              prompt: "“The most effective way to protect cities from extreme heat is to plant more trees.” To what extent do you agree? Write 190–250 words in an academic style, using hedging, nominalisation and a range of cohesive devices.",
              image: "tree",
              minWords: 190,
              maxWords: 250,
              tips: ["Intro: Rising urban temperatures … This essay argues that …", "Body 1: Urban greening … Moreover, …", "Body 2: Nevertheless, … such schemes …", "Conclusion: Consequently / Ultimately, …"],
              models: [{ label: "C1 model", text: "Rising urban temperatures pose a growing threat to public health, particularly for vulnerable groups. This essay argues that while tree planting is one of the most valuable interventions available, it is unlikely to be sufficient on its own.\nUrban greening offers multiple, mutually reinforcing benefits. Trees provide shade, cool the air through evapotranspiration and may also improve residents' mental well-being. Moreover, unlike many engineering solutions, they enhance biodiversity and the visual quality of neighbourhoods.\nNevertheless, such schemes have notable limitations. Trees take years to mature, require reliable irrigation and are less effective during prolonged droughts, precisely when cooling is most needed. In addition, greening projects in some cities have been associated with rising property values, which can displace the low-income residents they were intended to protect.\nConsequently, the most effective strategy is likely to combine greening with complementary measures, such as reflective building materials, improved ventilation and policies that ensure equitable access to cool spaces.\nUltimately, trees should be regarded as a central component of urban heat policy rather than a complete solution." }],
              rubric: ["I used an academic, impersonal style.", "I used hedging and nominalisation appropriately.", "My argument is nuanced and clearly structured.", "I used a range of cohesive devices accurately.", "My vocabulary is precise and varied."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("ellt-l5-l3-c1", "Which sentence uses nominalisation?", ["The reduction of tree cover has increased temperatures.", "They reduced the trees.", "Trees were cut and it got hot."], 0, "Reduce → reduction."),
        pick("ellt-l5-l3-c2", "Which sentence is appropriately hedged?", ["Urban greening may substantially reduce surface temperatures.", "Urban greening definitely solves everything.", "Trees always make cities cool."], 0, "Hedging."),
        match("ellt-l5-l3-c3", "Match the informal and academic phrases.", [["a lot", "substantially"], ["bad for", "detrimental to"], ["some people say", "it has been argued that"], ["so", "consequently"]], "Register."),
        fill("ellt-l5-l3-c4", "Complete: This ___ affects low-income households. (secara tidak proporsional)", "This", "affects low-income households.", ["disproportionately"], "Disproportionately.", { translate: true }),
        trPick("ellt-l5-l3-c5", "“Saling memperkuat” (benefits) in English is…", ["mutually reinforcing", "mutual reinforced each", "reinforce mutually by"], 0, "Mutually reinforcing."),
        pick("ellt-l5-l3-c6", "Which conclusion is most appropriate for a C1 essay?", ["Ultimately, trees should be a central component of policy rather than a complete solution.", "So trees are good. The end.", "I like trees and I think everyone should like trees."], 0, "Kesimpulan bernuansa.", { hots: true }),
      ],
    },
    {
      id: "ellt-l5-l4",
      skill: "speaking",
      title: "Speaking Task 4: Picture-Based Discussion",
      summary: "Describing, interpreting and discussing issues raised by a visual prompt.",
      sections: [
        {
          title: "Approaching the picture",
          blocks: [
            table(["Stage", "Language"], [["Describe briefly", "The picture shows… / In the foreground…"], ["Interpret", "It seems to suggest… / This might be…"], ["Connect to issues", "This raises the question of…"], ["Discuss", "One could argue that… / On the other hand…"], ["Personal view", "From my perspective, …"]]),
            pics([["traffic", "a crowded street"], ["tree", "a green park"], ["factory", "industry"], ["bicycle", "sustainable transport"]], "Example prompts"),
            tip("Jangan hanya **mendeskripsikan** gambar. Pemeriksa ingin Anda **membahas isu** di baliknya dan merespons pertanyaan lanjutan yang bisa naik-turun tingkat kesulitannya."),
          ],
        },
        {
          title: "Practice",
          blocks: [
            text("**Visual prompt (described):** A photograph of a busy city street at midday: heavy traffic, people sheltering under umbrellas from the sun, and a small park with large trees on one side, where people are sitting in the shade."),
            audio("Examiner follow-up questions", say(["woman", "What do you think this picture tells us about life in modern cities?"], ["woman", "Who should be responsible for creating green spaces like the one in the picture?"], ["woman", "Some people argue that cities should limit car use to reduce heat. How far do you agree?"], ["woman", "How might cities look different in fifty years?"])),
            speaking({
              id: "ellt-l5-l4-say",
              title: "Picture discussion",
              prompt: "Discuss the visual prompt for about 5–7 minutes: describe it briefly, interpret what it suggests, and answer the four examiner questions with developed, nuanced responses.",
              image: "traffic",
              seconds: 360,
              tips: ["The picture shows … which seems to suggest …", "This raises the question of …", "One could argue that …; on the other hand, …", "From my perspective, …"],
              models: [{ label: "Model (question 1)", text: "I think the picture highlights a contrast that's typical of many modern cities. On one side, there's congestion and intense heat, with people trying to protect themselves from the sun. On the other, the small park shows how much difference green space makes: people are clearly choosing to gather there because it's cooler and calmer. So it seems to suggest that cities have grown around cars rather than people, and that even small green areas can significantly improve quality of life. It also raises the question of who has access to such spaces, because in many cities parks are concentrated in wealthier neighbourhoods." }],
              rubric: ["I described the picture briefly and moved to interpretation.", "I discussed wider issues, not just the image.", "I gave developed, nuanced responses to follow-up questions.", "I used a wide range of vocabulary and structures.", "I interacted naturally and confidently."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("ellt-l5-l4-c1", voice("This raises the question of who has access to green spaces."), "What is the speaker doing?", ["connecting the picture to a wider issue", "describing colours", "ending the test", "asking for repetition"], 0, "Menghubungkan isu."),
        pick("ellt-l5-l4-c2", "Which response goes beyond description?", ["The park suggests that small green spaces can greatly improve city life.", "There are trees in the picture.", "The cars are red and white."], 0, "Interpretasi."),
        pick("ellt-l5-l4-c3", "Which phrase introduces a cautious interpretation?", ["It seems to suggest…", "I know for sure…", "Obviously…"], 0, "Hedging lisan."),
        fill("ellt-l5-l4-c4", "Complete: In the ___ of the picture, people are sitting under trees. (latar depan)", "In the", "of the picture, people are sitting under trees.", ["foreground"], "Foreground.", { translate: true }),
        trPick("ellt-l5-l4-c5", "“Dari sudut pandang saya” in English is…", ["From my perspective", "From my perspection", "In my sight"], 0, "From my perspective."),
        pick("ellt-l5-l4-c6", "The examiner asks a harder follow-up question. What does this suggest?", ["The examiner is testing your highest level; respond with depth.", "You answered badly.", "The test is ending."], 0, "Penguji menyesuaikan tingkat.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ellt-l5-post",
    title: "Level 5 Mock Quiz",
    passPercent: 70,
    passages: [URBAN],
    questions: [
      pick("ellt-l5-post1", "What is the urban heat island effect?", ["cities being warmer than surrounding rural areas", "islands becoming hotter", "a type of island resort", "heat from volcanoes"], 0, "Paragraf 1.", { passageId: URBAN.id }),
      pick("ellt-l5-post2", "The word “compounds” in paragraph 2 is closest in meaning to", ["worsens", "solves", "measures", "hides"], 0, "Compound = memperparah.", { passageId: URBAN.id }),
      pick("ellt-l5-post3", "Why does the writer mention property values in paragraph 4?", ["to show that greening can have unintended social consequences", "to recommend buying property", "to explain evapotranspiration", "to praise developers"], 0, "Fungsi detail.", { passageId: URBAN.id, hots: true }),
      pick("ellt-l5-post4", "Which statement best summarises the writer's conclusion?", ["Solutions to urban heat must combine technical measures with fairness.", "Only trees can solve urban heat.", "Air conditioning is the best solution.", "Urban heat is not a serious issue."], 0, "Kesimpulan.", { passageId: URBAN.id }),
      listen("ellt-l5-post5", say(["man", "Contrary to what we expected, the smaller parks provided almost as much cooling as the large ones, provided they were well irrigated."]), "What was unexpected?", ["Small parks cooled almost as much as large ones.", "Large parks cooled more.", "Irrigation had no effect.", "No parks cooled the area."], 0, "Contrary to what we expected.", { hots: true }),
      fill("ellt-l5-post6", "Notes (ONE WORD): Small parks are effective if well ___ .", "Small parks are effective if well", ".", ["irrigated"], "Provided they were well irrigated.", { audio: say(["man", "Smaller parks provided almost as much cooling, provided they were well irrigated."]) }),
      pick("ellt-l5-post7", "Which sentence is the most academic?", ["These findings indicate that canopy cover is a key determinant of street temperature.", "Trees are like totally the key thing.", "Basically trees good."], 0, "Register."),
      pick("ellt-l5-post8", "Which is a nominalised form of “cities are expanding rapidly”?", ["the rapid expansion of cities", "cities rapidly expand-ing", "the cities rapid", "expanding of rapid cities"], 0, "Nominalisasi."),
      pick("ellt-l5-post9", "In Speaking Task 4, which response would score highest?", ["It seems to show how unequal access to green space is; one could argue that…", "I see cars.", "It's a picture."], 0, "Interpretasi + diskusi."),
      pick("ellt-l5-post10", "“Paradoxically” is used to show…", ["an unexpected contradiction", "a list", "a time sequence", "an example"], 0, "Paradoks."),
    ],
  },
  live: {
    title: "Live Quiz — C1 Club",
    questions: [
      live("ellt-l5-live1", "Exacerbate =", ["make worse", "make better", "explain", "examine"], 0, "hot"),
      live("ellt-l5-live2", "Mitigate =", ["reduce", "increase", "measure", "ignore"], 0, "target"),
      live("ellt-l5-live3", "Speaking Task 4 uses a…", ["picture", "poem", "graph only", "song"], 0, "camera"),
      live("ellt-l5-live4", "“Latar depan” =", ["foreground", "background", "forehead", "frontline"], 0, "eye", true),
      live("ellt-l5-live5", "Hedging verb:", ["suggests", "proves", "guarantees", "insists"], 0, "owl-think"),
      live("ellt-l5-live6", "Trees cool air through…", ["evapotranspiration", "photography", "evaporation of oil", "radiation"], 0, "tree"),
      live("ellt-l5-live7", "Nominalisation of “reduce”:", ["reduction", "reducing", "reduced", "reducer"], 0, "pencil"),
      live("ellt-l5-live8", "Displace residents =", ["force them to move", "help them", "count them", "employ them"], 0, "house"),
    ],
  },
};
