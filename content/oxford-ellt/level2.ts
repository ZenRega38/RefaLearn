import "server-only";
import type { Level, Passage } from "@/lib/course/types";
import { audio, fill, listen, live, match, pick, pickMany, pics, say, speaking, table, text, tip, trPick, tryIt, vocab, voice, warn, writing } from "../kit";

// Oxford ELLT — Level 2: Building Up (B1+/B2).

const REMOTE: Passage = {
  id: "ellt2-remote",
  title: "Working from Home (gap-fill text)",
  lines: [
    "Since the early 2020s, remote work has become common in many professions. For some employees, the change has been entirely positive: they ___(1)___ hours of commuting and can organise their day more flexibly.",
    "However, the picture is more complicated than it first appears. Several studies suggest that remote workers often find it difficult to ___(2)___ between work and personal life, especially when they live in small apartments.",
    "Managers, too, have had to adapt. Instead of judging staff by how many hours they spend at their desks, many now ___(3)___ the results they produce.",
    "Some companies have adopted a hybrid model, in which employees spend part of the week in the office. Supporters argue that this approach ___(4)___ the benefits of both arrangements.",
    "Critics, on the other hand, warn that hybrid systems can ___(5)___ two groups of employees: those who are frequently seen by managers and those who are not.",
  ],
};

const SUMMARY_SRC: Passage = {
  id: "ellt2-src",
  title: "Plastic-Free Markets (summary source)",
  lines: [
    "Traditional markets in several Indonesian cities have started campaigns to reduce single-use plastic.",
    "Shoppers are encouraged to bring their own bags and containers, and some markets offer small discounts to those who do.",
    "Market managers report that plastic waste has fallen noticeably in the first year, although progress varies between stalls.",
    "Sellers of wet goods such as fish and meat have found it hardest to change, because customers worry about hygiene and leaks.",
    "To address this, some markets now sell low-cost washable containers at the entrance.",
    "Organisers believe that long-term success will depend on cooperation between local governments, sellers and shoppers.",
  ],
};

export const ELLT2: Level = {
  id: "ellt-l2",
  title: "Level 2 — Building Up (B1+/B2)",
  description: "Complete texts with the right phrase, take notes from a recording played twice, paraphrase key ideas in summaries, and compare options in a spoken monologue.",
  targetScore: "Target CEFR B1+ to B2",
  cover: ["laptop", "pencil", "chat"],
  pretest: {
    id: "ellt-l2-pre",
    title: "Level 2 Pretest",
    passPercent: 0,
    questions: [
      pick("ellt-l2-pre1", "Remote workers often find it difficult to ___ between work and home life.", ["draw a line", "make a line", "do a line", "take a line"], 0, "Kolokasi: draw a line."),
      listen("ellt-l2-pre2", voice("The workshop costs fifty pounds, which includes lunch and all materials."), "Listen. What does the price include?", ["lunch and materials", "transport", "accommodation", "a certificate only"], 0, "Includes lunch and materials."),
      trPick("ellt-l2-pre3", "“Model kerja campuran (kantor dan rumah)” in English is…", ["a hybrid model", "a mixed office", "a home office model", "a double job"], 0, "Hybrid model."),
      pick("ellt-l2-pre4", "Which is the best paraphrase of “plastic waste has fallen noticeably”?", ["there is clearly less plastic rubbish", "plastic has dropped on the floor", "plastic is more noticeable", "waste is falling from the sky"], 0, "Parafrase."),
      pick("ellt-l2-pre5", "A comparative speaking prompt asks you to…", ["discuss similarities and differences", "describe one thing only", "imagine an impossible situation", "read a text aloud"], 0, "Membandingkan."),
    ],
  },
  lessons: [
    {
      id: "ellt-l2-l1",
      skill: "reading",
      title: "Reading Text 2: Phrase-Level Gap-Fill",
      summary: "Choosing phrases that fit grammar, meaning and collocation in a B2 text.",
      passages: [REMOTE],
      sections: [
        {
          title: "Strategy",
          blocks: [
            table(["Check", "Question to ask"], [["Grammar", "Does the phrase fit after the subject / modal / to?"], ["Meaning", "Does it fit the sentences before and after?"], ["Collocation", "Do the words naturally go together (save time, draw a line)?"], ["Linkers", "Does the gap follow however, too, instead of?"]]),
            { type: "passage", passage: REMOTE },
          ],
        },
        {
          title: "Useful collocations",
          blocks: [
            table(["Collocation", "Meaning"], [["save hours / time", "menghemat waktu"], ["draw a line between", "memisahkan dengan jelas"], ["focus on results", "berfokus pada hasil"], ["combine the benefits of", "menggabungkan keunggulan"], ["create a divide between", "menciptakan kesenjangan"]]),
            vocab([["commuting", "perjalanan pulang-pergi kerja", "bus"], ["flexibly", "secara fleksibel", "clock"], ["adapt", "beradaptasi", "owl-think"], ["hybrid", "campuran", "laptop"]], "Key vocabulary"),
            tryIt(pick("ellt-l2-l1-try", "Gap (1): they ___ hours of commuting.", ["save", "spend more", "lose", "waste"], 0, "Positif → save.", { passageId: REMOTE.id })),
          ],
        },
      ],
      checkpoint: [
        pick("ellt-l2-l1-c1", "Gap (2): find it difficult to ___ between work and personal life.", ["draw a line", "make a line", "take a step", "do a balance"], 0, "Draw a line.", { passageId: REMOTE.id }),
        pick("ellt-l2-l1-c2", "Gap (3): many now ___ the results they produce.", ["focus on", "focus at", "focusing", "are focus"], 0, "Focus on.", { passageId: REMOTE.id }),
        pick("ellt-l2-l1-c3", "Gap (4): this approach ___ the benefits of both arrangements.", ["combines", "combine", "combining", "is combined"], 0, "Subject singular → combines.", { passageId: REMOTE.id }),
        pick("ellt-l2-l1-c4", "Gap (5): hybrid systems can ___ two groups of employees.", ["create a divide between", "make friends with", "agree with", "pay for"], 0, "Kesenjangan.", { passageId: REMOTE.id }),
        pick("ellt-l2-l1-c5", "Why does paragraph 2 begin with “However”?", ["It introduces problems after the positive view in paragraph 1.", "It repeats paragraph 1.", "It gives an example.", "It concludes the text."], 0, "Kontras.", { passageId: REMOTE.id }),
        pick("ellt-l2-l1-c6", "Which phrase best fits a gap after “Instead of judging staff by hours, managers now…”?", ["measure performance by output", "count desk hours more carefully", "stop managing completely"], 0, "Logika kontras instead of.", { passageId: REMOTE.id, hots: true }),
      ],
    },
    {
      id: "ellt-l2-l2",
      skill: "listening",
      title: "Listening 2: Note Completion",
      summary: "Using the second listening to check details and completing notes with the exact word or phrase.",
      sections: [
        {
          title: "Strategy",
          blocks: [
            table(["First listening", "Second listening"], [["follow the structure; fill easy gaps", "check spelling, plurals and missing gaps"], ["notice headings in the notes", "confirm numbers and names"]]),
            warn("Tulis kata **persis seperti yang didengar** dan sesuai **batas kata**. Ejaan dan bentuk jamak tetap penting."),
            pics([["report", "notes"], ["headset", "played twice"], ["pencil", "exact words"], ["target", "word limit"]]),
          ],
        },
        {
          title: "Practice talk",
          blocks: [
            audio("Talk: Applying for a student society grant (played twice in the test)", say(["man", "If your student society wants funding for an event, you can apply for a society grant. Applications open on the first of October and close on the twentieth. The maximum grant is five hundred pounds per event. You'll need to submit a budget plan, which should list every expected cost, and a short description of how the event benefits students. Applications are reviewed by a panel of three staff members and two student representatives. Decisions are usually announced within ten working days. Please note that grants cannot be used to buy alcohol or to pay society members."]), true),
            tryIt(fill("ellt-l2-l2-try", "Notes: Applications close on: ___ October", "Applications close on:", "October", ["20", "20th", "twentieth"], "The twentieth.")),
          ],
        },
      ],
      checkpoint: [
        fill("ellt-l2-l2-c1", "Notes: Maximum grant: £___ per event", "Maximum grant: £", "per event", ["500"], "Five hundred pounds."),
        fill("ellt-l2-l2-c2", "Notes: Submit a budget ___ listing all costs (ONE WORD)", "Submit a budget", "listing all costs", ["plan"], "Budget plan."),
        fill("ellt-l2-l2-c3", "Notes: Panel: three staff and two student ___", "Panel: three staff and two student", "", ["representatives"], "Bentuk jamak."),
        fill("ellt-l2-l2-c4", "Notes: Decisions within ten ___ days", "Decisions within ten", "days", ["working"], "Working days."),
        pickMany("ellt-l2-l2-c5", "Choose ALL things grants cannot pay for.", ["alcohol", "payments to society members", "event costs in the budget"], [0, 1], "Larangan."),
        pick("ellt-l2-l2-c6", "A society submits its application on 22 October. What will probably happen?", ["It will be too late to be considered.", "It will receive £500 automatically.", "It will be reviewed first."], 0, "Lewat tenggat.", { hots: true }),
      ],
    },
    {
      id: "ellt-l2-l3",
      skill: "writing",
      title: "Writing Task 1: Paraphrasing for Summaries",
      summary: "Synonyms, word-form changes and restructuring to summarise a text in your own words.",
      passages: [SUMMARY_SRC],
      sections: [
        {
          title: "Paraphrasing techniques",
          blocks: [
            table(["Technique", "Original", "Paraphrase"], [["Synonym", "reduce single-use plastic", "cut down on disposable plastic"], ["Word form", "Shoppers are encouraged to bring bags", "Markets encourage shoppers to bring bags"], ["Structure", "Progress varies between stalls", "Not all stalls have made the same progress"], ["Generalise", "fish and meat", "wet goods / fresh produce"]]),
            { type: "passage", passage: SUMMARY_SRC },
          ],
        },
        {
          title: "Write the summary",
          blocks: [
            writing({
              id: "ellt-l2-l3-write",
              title: "Summary with paraphrase",
              prompt: "Summarise the text about plastic-free markets in 80–100 words, using at least four paraphrasing techniques. Do not add your opinion.",
              image: "recycle",
              minWords: 80,
              maxWords: 100,
              tips: ["According to the text, …", "In order to …, …", "Although …, …", "To solve this, …", "The organisers believe that …"],
              models: [{ label: "Model summary", text: "According to the text, traditional markets in some Indonesian cities are trying to cut down on disposable plastic. They encourage customers to bring their own bags and containers, sometimes offering a small discount in return. Although overall plastic waste dropped clearly within a year, not every stall has made the same progress. Fish and meat sellers have struggled most, as shoppers are concerned about cleanliness and leaking packages, so some markets now provide cheap reusable containers. The organisers believe lasting change requires cooperation between authorities, traders and customers." }],
              rubric: ["I included all the main points.", "I used at least four paraphrasing techniques.", "I avoided copying phrases from the text.", "I wrote 80–100 words without personal opinion.", "My summary is clear and coherent."],
            }),
          ],
        },
      ],
      checkpoint: [
        pick("ellt-l2-l3-c1", "Which is the best paraphrase of “single-use plastic”?", ["disposable plastic", "single plastic", "plastic for one person", "used plastic"], 0, "Sinonim."),
        pick("ellt-l2-l3-c2", "Why have fish and meat sellers found it hardest to change?", ["Customers worry about hygiene and leaks.", "They sell too much.", "They don't like discounts.", "They have no customers."], 0, "Baris 4.", { passageId: SUMMARY_SRC.id }),
        match("ellt-l2-l3-c3", "Match the original and the paraphrase.", [["has fallen noticeably", "has dropped clearly"], ["low-cost", "cheap"], ["cooperation", "working together"], ["varies between stalls", "differs from stall to stall"]], "Parafrase."),
        fill("ellt-l2-l3-c4", "Paraphrase with ONE WORD: “washable containers” = ___ containers", "", "containers", ["reusable"], "Reusable."),
        trPick("ellt-l2-l3-c5", "“Kerja sama antara pemerintah, pedagang dan pembeli” in English is…", ["cooperation between authorities, traders and shoppers", "cooperate among government sell and buy", "work together of governments traders"], 0, "Parafrase formal."),
        pick("ellt-l2-l3-c6", "Which version changes the meaning (a BAD paraphrase)?", ["All stalls have reduced plastic equally.", "Progress has differed between stalls.", "Not every stall has improved to the same extent."], 0, "Mengubah makna.", { hots: true }),
      ],
    },
    {
      id: "ellt-l2-l4",
      skill: "speaking",
      title: "Speaking: The Comparative Prompt",
      summary: "Comparing two options clearly with comparative structures and linking words.",
      sections: [
        {
          title: "Language for comparing",
          blocks: [
            table(["Function", "Language"], [["Similarity", "Both … and … / Similarly, …"], ["Difference", "whereas, while, in contrast, unlike"], ["Degree", "much / slightly / far more … than; not as … as"], ["Preference", "On balance, I'd say … is better for …"]]),
            tip("Untuk prompt perbandingan, gunakan **2–3 kriteria** (biaya, waktu, kenyamanan, dampak lingkungan) agar jawaban terstruktur."),
          ],
        },
        {
          title: "Practice",
          blocks: [
            text("**Topic: Studying.** Prompt 2 (comparative): *Compare studying online with studying in a classroom.*"),
            audio("Model comparison", say(["woman", "Both online and classroom learning can be effective, but they suit different people. In terms of flexibility, online study is far more convenient, because you can watch lessons at any time. In contrast, classroom learning offers more direct interaction; you can ask questions immediately and learn from classmates. Online courses are often cheaper, whereas campus programmes involve transport and accommodation costs. On balance, I'd say classroom learning is better for younger students who need structure, while online learning works well for people who are working."])),
            speaking({
              id: "ellt-l2-l4-say",
              title: "Comparative monologue",
              prompt: "Topic: Studying. Plan for about 45 seconds, then speak for about one and a half minutes: Compare studying online with studying in a classroom.",
              image: "laptop",
              prepSeconds: 45,
              seconds: 90,
              tips: ["Both … and … can …", "In terms of cost / flexibility / interaction, …", "In contrast, … / whereas …", "On balance, I'd say …"],
              models: [{ label: "Structure", text: "Similarity → criterion 1 (flexibility) → criterion 2 (interaction) → criterion 3 (cost) → balanced conclusion for different types of learners." }],
              rubric: ["I compared at least two criteria.", "I used comparative structures accurately.", "I used linking words for contrast.", "I reached a balanced conclusion.", "I spoke fluently and clearly."],
            }),
          ],
        },
      ],
      checkpoint: [
        listen("ellt-l2-l4-c1", voice("Online courses are often cheaper, whereas campus programmes involve transport costs."), "What is being compared?", ["cost", "interaction", "quality of teachers", "class size"], 0, "Biaya."),
        pick("ellt-l2-l4-c2", "Which sentence is a correct comparison?", ["Online study is far more flexible than classroom study.", "Online study is more flexibler than classroom.", "Online study is most flexible than classroom."], 0, "Comparative."),
        pick("ellt-l2-l4-c3", "Which word introduces a contrast?", ["whereas", "both", "similarly", "also"], 0, "Whereas."),
        fill("ellt-l2-l4-c4", "Complete: Classroom learning is not ___ flexible as online learning.", "Classroom learning is not", "flexible as online learning.", ["as", "so"], "Not as … as."),
        trPick("ellt-l2-l4-c5", "“Dari segi biaya” in English is…", ["In terms of cost", "In term cost", "For terms of money"], 0, "In terms of."),
        pick("ellt-l2-l4-c6", "Why is using clear criteria (cost, flexibility, interaction) helpful?", ["It organises the comparison and makes it easier to follow.", "It makes the answer shorter.", "Examiners only count criteria."], 0, "Struktur.", { hots: true }),
      ],
    },
  ],
  quiz: {
    id: "ellt-l2-post",
    title: "Level 2 Mock Quiz",
    passPercent: 70,
    passages: [REMOTE, SUMMARY_SRC],
    questions: [
      pick("ellt-l2-post1", "Which phrase completes: “Many cities are trying to ___ air pollution.”", ["cut down on", "cut up with", "put on", "take after"], 0, "Cut down on."),
      pick("ellt-l2-post2", "What does paragraph 5 of the remote-work text suggest about hybrid systems?", ["They may create unequal treatment of employees.", "They solve every problem.", "They are illegal.", "They reduce costs to zero."], 0, "Kritik.", { passageId: REMOTE.id, hots: true }),
      fill("ellt-l2-post3", "Notes (ONE WORD): Bring a ___ ID to collect your parcel.", "Bring a", "ID to collect your parcel.", ["photo"], "Photo ID.", { audio: say(["woman", "To collect your parcel, please bring a photo ID and your order number."]) }),
      listen("ellt-l2-post4", say(["man", "The trip was planned for Saturday, but because of the forecast, we've moved it to Sunday morning."]), "When is the trip now?", ["Sunday morning", "Saturday", "Sunday evening", "next week"], 0, "Moved to Sunday morning."),
      listen("ellt-l2-post5", say(["woman", "Places are limited to twelve, so early booking is strongly recommended."]), "What is recommended?", ["booking early", "arriving late", "bringing friends", "paying in cash"], 0, "Early booking."),
      pick("ellt-l2-post6", "What have some markets started selling at the entrance?", ["low-cost washable containers", "plastic bags", "fresh fish", "discount cards"], 0, "Baris 5.", { passageId: SUMMARY_SRC.id }),
      pick("ellt-l2-post7", "Which sentence is the best paraphrase of “progress varies between stalls”?", ["Some stalls have improved more than others.", "Every stall is the same.", "Stalls are moving.", "Progress is impossible."], 0, "Parafrase.", { passageId: SUMMARY_SRC.id }),
      pick("ellt-l2-post8", "In a summary, which sentence should be removed?", ["Personally, I always bring my own bag to the market.", "Fish sellers found it hardest to change.", "Plastic waste fell in the first year."], 0, "Opini pribadi."),
      pick("ellt-l2-post9", "Which comparison is most balanced?", ["Online study is more flexible, whereas classes offer more interaction.", "Online study is the best ever.", "Classes are bad."], 0, "Seimbang."),
      pick("ellt-l2-post10", "In note completion, you write “representative” but the speaker said “representatives”. What happens?", ["It may be marked wrong.", "It is always correct.", "It earns double points."], 0, "Bentuk jamak penting.", { hots: true }),
    ],
  },
  live: {
    title: "Live Quiz — Level Up",
    questions: [
      live("ellt-l2-live1", "___ a line between work and life", ["draw", "make", "do", "take"], 0, "pencil"),
      live("ellt-l2-live2", "Listening 2 is played…", ["twice", "once", "three times", "never"], 0, "headset"),
      live("ellt-l2-live3", "Disposable =", ["single-use", "reusable", "washable", "recycled"], 0, "recycle"),
      live("ellt-l2-live4", "“Dari segi” =", ["in terms of", "in term", "for terms", "on terms"], 0, "owl-think", true),
      live("ellt-l2-live5", "Contrast word:", ["whereas", "both", "also", "similarly"], 0, "question"),
      live("ellt-l2-live6", "Hybrid work =", ["office + home", "home only", "office only", "no work"], 0, "laptop"),
      live("ellt-l2-live7", "Summary: add your opinion?", ["No", "Yes", "Only at the end", "Always"], 0, "report"),
      live("ellt-l2-live8", "Not ___ fast as", ["as", "than", "more", "so much"], 0, "clock"),
    ],
  },
};
