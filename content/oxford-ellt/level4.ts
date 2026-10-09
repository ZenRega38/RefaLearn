import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { audio, examples, fill, listen, live, match, pick, pickMany, pics, say, sequence, speaking, table, text, tip, trPick, tryIt, vocab, voice, writing } from "../kit";

// Oxford ELLT — Level 4: Strong Upper Intermediate (B2+).

const FASHION: Passage = {
  id: "ellt4-fashion",
  title: "The True Cost of Fast Fashion",
  lines: [
    "Over the past two decades, clothing has become cheaper and more disposable than ever before. Large retailers now release new collections every few weeks, encouraging shoppers to buy more often and wear items fewer times.",
    "This model, often called fast fashion, relies on low production costs. Much of the manufacturing takes place in countries where wages are low, and workers in some factories face long hours and unsafe conditions.",
    "The environmental impact is equally significant. Producing textiles requires large quantities of water and energy, and synthetic fabrics such as polyester release tiny plastic fibres when washed. These fibres eventually reach rivers and oceans.",
    "In response, some consumers have turned to second-hand shopping, clothing rental and repair. Online marketplaces for used clothing have grown rapidly, particularly among young people.",
    "Critics argue, however, that individual choices alone cannot solve the problem. They call for regulations that require companies to take responsibility for the full life cycle of their products, from production to disposal.",
  ],
};

export const ELLT4: Level = {
  id: "ellt-l4",
  title: "Level 4 — Strong Upper Intermediate (B2+)",
  description: "Track ideas and references across a longer text, distinguish between similar opinions in Listening, summarise and evaluate an argument in writing, and discuss your own essay with the examiner.",
  targetScore: "Target CEFR B2+",
  cover: ["shirt", "recycle", "chat"],
  pretest: {
    id: "ellt-l4-pre",
    title: "Level 4 Pretest",
    passPercent: 0,
    questions: [
      pick("ellt-l4-pre1", "In Speaking Task 3, the examiner asks you about…", ["your Writing Task 2 essay", "a picture", "your family only", "a reading text"], 0, "Pertanyaan tentang esaimu."),
      listen("ellt-l4-pre2", say(["man", "I'm broadly in favour of the plan, though I'd want more details about the cost."]), "What is the speaker's view?", ["generally supportive, with a reservation", "strongly against", "completely neutral", "enthusiastic without doubts"], 0, "Broadly in favour + though."),
      trPick("ellt-l4-pre3", "“Siklus hidup produk” in English is…", ["the life cycle of a product", "the life circle product", "a product's living round", "product cycle life"], 0, "Life cycle."),
      pick("ellt-l4-pre4", "What does “These fibres” refer to in a text about fabrics?", ["plastic fibres mentioned in the previous sentence", "all clothes", "the factories", "rivers"], 0, "Rujukan."),
      pick("ellt-l4-pre5", "Which word best describes someone who is “not entirely convinced”?", ["doubtful", "certain", "furious", "delighted"], 0, "Not entirely convinced = ragu."),
    ],
  },
  lessons: [
    {
      id: "ellt-l4-l1",
      skill: "reading",
      title: "Cohesion and Reference Across a Text",
      summary: "Following an argument through reference words, linking phrases and paragraph order.",
      passages: [FASHION],
      sections: [
        {
          title: "The text",
          blocks: [
            { type: "passage", passage: FASHION },
            vocab([["disposable", "sekali pakai", "trash"], ["synthetic", "sintetis", "shirt"], ["second-hand", "bekas", "recycle"], ["life cycle", "siklus hidup", "earth"], ["disposal", "pembuangan", "trash"]], "Key vocabulary"),
          ],
        },
        {
          title: "Following the argument",
          blocks: [
            table(["Device", "Example from the text", "Function"], [["This model", "This model, often called fast fashion…", "summarises paragraph 1"], ["equally significant", "The environmental impact is equally significant.", "adds a parallel problem"], ["These fibres", "These fibres eventually reach rivers.", "refers to plastic fibres"], ["In response", "In response, some consumers…", "introduces solutions"], ["however", "Critics argue, however, …", "introduces a limitation"]]),
            tryIt(sequence("ellt-l4-l1-try", "Put the ideas in the order they appear.", ["Clothes became cheaper and more disposable.", "Low costs depend on cheap labour.", "Textiles harm the environment.", "Consumers try alternatives.", "Critics call for regulation."], "Urutan paragraf 1–5.", { passageId: FASHION.id })),
          ],
        },
      ],
      checkpoint: [
        pick("ellt-l4-l1-c1", "What does “This model” in paragraph 2 refer to?", ["frequent new collections encouraging more buying", "a fashion model", "a factory", "polyester"], 0, "Rujukan ke paragraf 1.", { passageId: FASHION.id }),
        pick("ellt-l4-l1-c2", "According to the text, how do plastic fibres reach the ocean?", ["They are released when synthetic clothes are washed.", "Factories throw clothes into the sea.", "Shoppers burn clothes.", "They come from cotton."], 0, "Paragraf 3.", { passageId: FASHION.id }),
        pick("ellt-l4-l1-c3", "What does “equally significant” suggest about environmental impact?", ["It is as important as the labour issues.", "It is less important.", "It is the only problem.", "It is not proven."], 0, "Penghubung paralel.", { passageId: FASHION.id }),
        pickMany("ellt-l4-l1-c4", "Choose ALL consumer responses mentioned.", ["second-hand shopping", "clothing rental", "repair", "buying more polyester"], [0, 1, 2], "Paragraf 4.", { passageId: FASHION.id }),
        fill("ellt-l4-l1-c5", "Complete: Critics call for ___ that make companies responsible.", "Critics call for", "that make companies responsible.", ["regulations"], "Paragraf 5.", { passageId: FASHION.id }),
        pick("ellt-l4-l1-c6", "What is the critics' main point in paragraph 5?", ["Individual choices are not enough; companies must be regulated.", "Consumers should stop buying clothes.", "Second-hand shopping is the full solution.", "Fast fashion is harmless."], 0, "Inti kritik.", { passageId: FASHION.id, hots: true }),
      ],
    },
    {
      id: "ellt-l4-l2",
      skill: "listening",
      title: "Distinguishing Similar Opinions",
      summary: "Hearing the difference between strong and partial agreement, doubt and conditional support.",
      sections: [
        {
          title: "Degrees of opinion",
          blocks: [
            table(["Expression", "Strength"], [["I'm all for it. / Absolutely.", "strong agreement"], ["I'm broadly in favour, but…", "agreement with reservations"], ["It depends on…", "conditional"], ["I'm not entirely convinced.", "doubt"], ["I'm firmly against it.", "strong disagreement"]]),
            tip("Di level ini, banyak pembicara **tidak sepenuhnya setuju atau tidak setuju**. Perhatikan kata seperti **but, though, unless, as long as**."),
            pics([["thumbs-up", "strong agreement"], ["owl-think", "reservations"], ["question", "doubt"], ["angry", "firmly against"]]),
          ],
        },
        {
          title: "Practice",
          blocks: [
            audio("Four views on a clothing tax", say(["man", "Speaker 1: A tax on fast fashion? I'm all for it. It's the only way companies will change."], ["woman", "Speaker 2: I'm broadly in favour, but it mustn't hit low-income families hardest."], ["man", "Speaker 3: It depends on how the money is used. If it funds recycling, fine."], ["woman", "Speaker 4: I'm not entirely convinced. People will just buy cheap clothes online from abroad."])),
            tryIt(pick("ellt-l4-l2-try", "Which speaker gives conditional support?", ["Speaker 3", "Speaker 1", "Speaker 2", "Speaker 4"], 0, "It depends on.")),
          ],
        },
      ],
      checkpoint: [
        match("ellt-l4-l2-c1", "Match the speaker and the view.", [["Speaker 1", "strongly supports the tax"], ["Speaker 2", "supports it with a concern about fairness"], ["Speaker 3", "supports it if the money funds recycling"], ["Speaker 4", "doubts it will work"]], "Tingkat opini."),
        pick("ellt-l4-l2-c2", "What is Speaker 4's reason for doubt?", ["People could buy cheap clothes from abroad instead.", "Taxes are always wrong.", "Recycling is expensive.", "Clothes will disappear."], 0, "Alasan."),
        pick("ellt-l4-l2-c3", "What concern does Speaker 2 raise?", ["the impact on low-income families", "the environment", "online shopping", "factory safety"], 0, "Keadilan."),
        listen("ellt-l4-l2-c4", voice("I'd support longer library hours, as long as staff aren't forced to work late."), "What is the speaker's position?", ["support with a condition", "strong opposition", "no opinion", "unconditional support"], 0, "As long as."),
        trPick("ellt-l4-l2-c5", "“Saya tidak sepenuhnya yakin.” in English is…", ["I'm not entirely convinced.", "I'm entirely not convinced.", "I'm not convinced entire."], 0, "Not entirely convinced."),
        pick("ellt-l4-l2-c6", "Why might two speakers who both say “yes” still hold different opinions?", ["One may add conditions or reservations.", "They always mean the same.", "“Yes” always means strong agreement."], 0, "Nuansa opini.", { hots: true }),
      ],
    },
    {
      id: "ellt-l4-l3",
      skill: "writing",
      title: "Summarising and Evaluating an Argument",
      summary: "Writing an objective summary, then an essay that evaluates the argument with your own view.",
      sections: [
        {
          title: "Summary vs. evaluation",
          blocks: [
            table(["Summary (Task 1 style)", "Evaluation (Task 2 style)"], [["objective, no opinion", "your judgement with reasons"], ["reporting verbs: argues, explains, claims", "evaluative language: convincing, overlooks, persuasive"], ["main points only", "strengths, weaknesses, alternatives"]]),
            text("**Essay prompt:** “Governments should make clothing companies responsible for recycling the products they sell.” To what extent do you agree? Write 190–250 words."),
          ],
        },
        {
          title: "Write",
          blocks: [
            examples([{ right: "Summary sentence: The writer argues that fast fashion causes both social and environmental harm." }, { right: "Evaluation sentence: This argument is persuasive, although it overlooks the role of consumers in reducing demand." }], "Two kinds of sentence"),
            writing({
              id: "ellt-l4-l3-write",
              title: "Summary + evaluative essay",
              prompt: "(1) Summarise “The True Cost of Fast Fashion” in 80–100 words. (2) Write a 190–250 word essay on: “Governments should make clothing companies responsible for recycling the products they sell.” To what extent do you agree?",
              image: "shirt",
              minWords: 270,
              maxWords: 350,
              tips: ["Summary: The text explains that … It also points out … Finally, it notes that …", "Essay: I largely agree that … The main reason is … Admittedly, … However, …", "Conclusion: Therefore, …"],
              models: [{ label: "Essay model", text: "Clothing is now produced and discarded at an unprecedented rate, and much of it ends up in landfill. I largely agree that companies should be made responsible for recycling the products they sell.\nThe main reason is that producers have the greatest power to change the system. If companies had to collect and recycle used garments, they would have a financial incentive to design clothes that last longer and are easier to recycle, for example by avoiding fabric blends that cannot be separated. Such schemes already exist for electronics in several countries, which shows that they can work in practice.\nAdmittedly, these costs may be passed on to consumers through higher prices, which could affect low-income households. However, higher prices that reflect the true environmental cost may also discourage excessive buying, and governments could offset the impact through support for second-hand and repair shops.\nTherefore, while responsibility should be shared, I believe placing a legal duty on producers is the most effective way to reduce clothing waste." }],
              rubric: ["My summary was objective and covered the main points.", "My essay stated a clear position.", "I evaluated the issue with reasons and an example.", "I addressed a counterargument.", "My grammar and vocabulary were accurate and varied."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("ellt-l4-l3-c1", "Which sentence belongs in a summary?", ["The writer argues that fast fashion harms workers and the environment.", "I think fast fashion is terrible.", "This is the best article I've read."], 0, "Objektif."),
        pick("ellt-l4-l3-c2", "Which sentence is evaluative?", ["This argument is persuasive, although it overlooks consumer demand.", "The text has five paragraphs.", "The writer mentions polyester."], 0, "Evaluasi."),
        match("ellt-l4-l3-c3", "Match the reporting verb and its meaning.", [["argues", "presents a position"], ["claims", "says, possibly without proof"], ["points out", "draws attention to a fact"], ["concludes", "states a final judgement"]], "Reporting verbs."),
        fill("ellt-l4-l3-c4", "Complete: Companies would have a financial ___ to design longer-lasting clothes.", "Companies would have a financial", "to design longer-lasting clothes.", ["incentive"], "Incentive = dorongan."),
        trPick("ellt-l4-l3-c5", "“Mengimbangi dampaknya” in English is…", ["offset the impact", "offside the impact", "set off impact on"], 0, "Offset."),
        pick("ellt-l4-l3-c6", "Why does the essay mention electronics recycling schemes?", ["as evidence that producer responsibility can work", "to change the topic", "to criticise electronics", "to show that clothes are electronic"], 0, "Bukti analogi.", { hots: true }),
      ],
    },
    {
      id: "ellt-l4-l4",
      skill: "speaking",
      title: "Speaking Task 3: Discussing Your Essay",
      summary: "Explaining, defending and extending the ideas in your own writing when questioned.",
      sections: [
        {
          title: "What the examiner may ask",
          blocks: [
            table(["Question type", "Example", "Useful response"], [["Clarify", "What did you mean by “producer responsibility”?", "What I meant was…"], ["Justify", "Why do you think companies, not consumers, should act?", "The main reason is…"], ["Challenge", "Wouldn't prices rise?", "That's a fair point. However…"], ["Extend", "Could this work in Indonesia?", "I think it could, provided that…"], ["Vocabulary", "You used the word “offset”. Can you explain it?", "By “offset”, I mean…"]]),
            tip("Reread esai Anda dalam pikiran sebelum Task 3. Pemeriksa bisa **menantang** argumen Anda; tetap tenang, **akui** poinnya, lalu **pertahankan** posisi dengan alasan."),
          ],
        },
        {
          title: "Practice",
          blocks: [
            audio("Examiner questions about the fashion essay", say(["woman", "In your essay, you said companies should be responsible for recycling. Can you explain what you meant by that?"], ["woman", "Some people would say that consumers are the real problem. How would you respond?"], ["woman", "You used the word “incentive”. Could you give another example of an incentive?"], ["woman", "Do you think this policy would work in Indonesia? Why or why not?"])),
            speaking({
              id: "ellt-l4-l4-say",
              title: "Defend your essay",
              prompt: "Using your fashion essay (or the model), answer the four examiner questions. Speak for about 5 minutes in total, clarifying, justifying and extending your ideas.",
              image: "chat",
              seconds: 300,
              tips: ["What I meant was …", "That's a fair point. However, …", "By “incentive”, I mean …; another example would be …", "It could work in Indonesia, provided that …"],
              models: [{ label: "Model answer (question 2)", text: "That's a fair point, and I agree that consumers play a role. If people bought fewer clothes, there would be less waste. However, I'd argue that individual choices are limited by what is available and affordable. Most people don't know which fabrics can be recycled, and second-hand options aren't always convenient. Companies, on the other hand, design the products and control the supply chain, so they're in a much stronger position to change things. Ideally, both should act, but regulation of companies would have a bigger impact more quickly." }],
              rubric: ["I clarified my ideas clearly.", "I defended my position with reasons.", "I acknowledged challenges politely.", "I extended ideas with new examples.", "I explained vocabulary from my essay accurately."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("ellt-l4-l4-c1", voice("Wouldn't that make clothes more expensive for poor families?"), "What type of examiner question is this?", ["a challenge", "a vocabulary question", "a greeting"], 0, "Tantangan."),
        pick("ellt-l4-l4-c2", "Which is the best way to begin answering a challenge?", ["That's a fair point. However, …", "No, you're wrong.", "I don't know."], 0, "Akui lalu pertahankan."),
        pick("ellt-l4-l4-c3", "Which phrase clarifies meaning?", ["What I meant was…", "In conclusion…", "Firstly…"], 0, "Klarifikasi."),
        fill("ellt-l4-l4-c4", "Complete: It could work, ___ that the government supports recycling centres.", "It could work,", "that the government supports recycling centres.", ["provided"], "Provided that."),
        trPick("ellt-l4-l4-c5", "“Yang saya maksud adalah…” in English is…", ["What I meant was…", "What I mean is was…", "I meant what…"], 0, "What I meant was."),
        pick("ellt-l4-l4-c6", "Why is it important to remember your own essay before Speaking Task 3?", ["The examiner's questions are based on what you wrote.", "You will read it aloud.", "It is not important."], 0, "Task 3 terhubung dengan Writing.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ellt-l4-post",
    title: "Level 4 Mock Quiz",
    passPercent: 70,
    passages: [FASHION],
    questions: [
      pick("ellt-l4-post1", "What is the main idea of the text?", ["Fast fashion has social and environmental costs, and solutions are being debated.", "Polyester is the best fabric.", "Second-hand shopping is unpopular.", "Clothes are too expensive."], 0, "Gagasan utama.", { passageId: FASHION.id }),
      pick("ellt-l4-post2", "Which word in paragraph 1 means “designed to be thrown away”?", ["disposable", "collections", "retailers", "decades"], 0, "Disposable.", { passageId: FASHION.id }),
      pick("ellt-l4-post3", "Why does the writer mention online marketplaces?", ["to show that alternatives are growing, especially among young people", "to criticise the internet", "to explain factory conditions", "to describe polyester"], 0, "Fungsi detail.", { passageId: FASHION.id, hots: true }),
      listen("ellt-l4-post4", say(["man", "Speaker A: I'm firmly against uniforms."], ["woman", "Speaker B: I'd accept them, as long as they're comfortable and cheap."]), "What is Speaker B's position?", ["conditional acceptance", "strong opposition", "strong support", "no opinion"], 0, "As long as."),
      listen("ellt-l4-post5", say(["woman", "Many assume older people avoid technology, but in our survey, over sixty per cent used video calls weekly."]), "What does the speaker challenge?", ["the assumption that older people avoid technology", "the cost of video calls", "the survey method", "the age of participants"], 0, "Membantah anggapan."),
      pick("ellt-l4-post6", "Which is a reporting verb suitable for summaries?", ["argues", "loves", "hates", "guesses"], 0, "Reporting verb."),
      pick("ellt-l4-post7", "Which essay sentence shows a concession?", ["Admittedly, higher prices may affect poorer households.", "Prices are high.", "Therefore, prices."], 0, "Konsesi."),
      pick("ellt-l4-post8", "Examiner: “What did you mean by ‘life cycle’?” Best reply:", ["By “life cycle”, I mean every stage of a product, from production to disposal.", "It's a bicycle for life.", "I don't remember."], 0, "Klarifikasi kosakata."),
      fill("ellt-l4-post9", "Complete: These fibres eventually reach rivers and ___ .", "These fibres eventually reach rivers and", ".", ["oceans"], "Paragraf 3.", { passageId: FASHION.id }),
      pick("ellt-l4-post10", "“I'm broadly in favour, but…” signals…", ["agreement with reservations", "complete disagreement", "a question", "a summary"], 0, "Nuansa."),
    ],
  },
  live: {
    title: "Live Quiz — B2+ Arena",
    questions: [
      live("ellt-l4-live1", "Speaking Task 3 is about your…", ["essay", "family", "picture", "summary only"], 0, "pencil"),
      live("ellt-l4-live2", "“As long as” signals…", ["a condition", "a result", "a contrast", "time"], 0, "question"),
      live("ellt-l4-live3", "Objective text type:", ["summary", "opinion essay", "review", "complaint"], 0, "report"),
      live("ellt-l4-live4", "“Sekali pakai” =", ["disposable", "durable", "renewable", "valuable"], 0, "trash", true),
      live("ellt-l4-live5", "Doubt phrase:", ["I'm not entirely convinced", "I'm all for it", "Absolutely", "Definitely"], 0, "owl-think"),
      live("ellt-l4-live6", "Respond to a challenge:", ["That's a fair point. However…", "You're wrong.", "Next.", "No comment."], 0, "chat"),
      live("ellt-l4-live7", "Second-hand =", ["used", "new", "cheap only", "stolen"], 0, "recycle"),
      live("ellt-l4-live8", "Financial ___ (motivation)", ["incentive", "insistence", "instance", "insight"], 0, "money"),
    ],
  },
};
