// Praeclaris Builder's Guild: business development and operations quest.
// Built from #Praeclaris52 weeks 27-39 plus the Praeclaris project-management method.
// Same format as crypto-quest.js.

window.QUEST_BUSINESS = {
  id: "business",
  title: "The Builder's Guild",
  subtitle: "The Praeclaris Business Quest",
  intro: "Six guild halls take you from an idea to a business you can run, measure and grow. Every mission ends with something real: a canvas, a price, a KPI sheet, a 90-day plan.",
  promise: "This quest never asks for your business's private numbers. Progress is saved only in this browser.",
  ranks: [
    { name: "Apprentice", at: 0 },
    { name: "System Starter", at: 0.15 },
    { name: "System Operator", at: 0.4 },
    { name: "System Builder", at: 0.65 },
    { name: "Master Builder", at: 0.9 }
  ],
  realms: [
    { id: "idea", name: "The Spark Forge", tagline: "From side hustle to business.", badge: "Spark Lit", level: "Beginner" },
    { id: "validate", name: "The Proving Grounds", tagline: "Validate before you build.", badge: "Proven", level: "Beginner" },
    { id: "model", name: "The Counting House", tagline: "Revenue minus costs. Everything else is details.", badge: "Model Maker", level: "Intermediate" },
    { id: "foundations", name: "The Charter Hall", tagline: "Legal, financial and operational foundations.", badge: "Chartered", level: "Intermediate" },
    { id: "growth", name: "The Market Square", tagline: "Marketing and sales as systems.", badge: "Rainmaker", level: "Advanced" },
    { id: "command", name: "The War Room", tagline: "Projects, AI leverage, funding and the 90-day build.", badge: "Master Builder", level: "Advanced" }
  ],
  missions: [
    {
      id: "b-skills", realm: "idea", title: "Inventory Your Sellable Skills", xp: 40, minutes: 30, lesson: 27,
      brief: "Most businesses start from a skill someone will already pay for. Find yours before you look for a big idea.",
      steps: ["List 10 things people ask you for help with.", "Mark which ones people have paid for, or would.", "Pick the one that is valuable, enjoyable and repeatable.", "Write it as: I help [who] get [result] by [how]."],
      practice: "This mission is free.",
      protect: "Check your employment agreement for non-compete and IP clauses before you start.",
      myth: { myth: "I need an original idea.", fact: "Most successful small businesses do a known thing better for a specific customer." },
      quiz: [
        { q: "The best first business is usually…", options: ["A brand-new invention", "A skill people already pay for", "Whatever is trending", "An app"], answer: 1, explain: "Proven demand lowers risk." },
        { q: "The positioning formula is…", options: ["I sell everything", "I help [who] get [result] by [how]", "Lowest price wins", "Follow me"], answer: 1, explain: "Specific beats general." }
      ],
      sources: [{ t: "SBA business guide", u: "https://www.sba.gov/business-guide" }]
    },
    {
      id: "b-goal", realm: "idea", title: "Set a 90-Day Revenue Goal", xp: 40, minutes: 20, lesson: 27,
      brief: "Pick a goal small enough to hit in 90 days, like your first three paying customers. Small wins build the engine.",
      steps: ["Write one revenue goal for the next 90 days.", "Break it into weekly actions (conversations, offers, follow-ups).", "Put a weekly 20-minute review on your calendar."],
      practice: "This mission is free.",
      protect: "Don't quit a paycheck until the business covers your needs for several months.",
      myth: { myth: "Big goals motivate better.", fact: "Goals you can hit build momentum. Systems produce outcomes." },
      quiz: [
        { q: "A good first goal is…", options: ["$1M in year one", "Your first 3 paying customers in 90 days", "10,000 followers", "A logo"], answer: 1, explain: "Specific, measurable and near." },
        { q: "What turns a goal into a system?", options: ["Hope", "Weekly scheduled actions plus a review", "A vision board", "Hiring"], answer: 1, explain: "Action, schedule, measurement." }
      ],
      sources: [{ t: "Praeclaris library: week 1", u: "../learn/#week-1" }]
    },
    {
      id: "b-interviews", realm: "validate", title: "Ten Customer Conversations", xp: 60, minutes: 120, lesson: 28,
      brief: "Customer discovery means asking about problems, not pitching solutions. Ten honest conversations beat months of guessing.",
      steps: ["Write five open questions about the customer's problem (not your product).", "Talk to 10 people who have the problem.", "Record patterns: the words they use, what they've tried, what they pay today.", "Decide: continue, change or stop."],
      practice: "Start with 3 conversations if 10 feels like too many.",
      protect: "Never collect sensitive personal data you don't need.",
      myth: { myth: "If friends like my idea, it's validated.", fact: "Validation is a stranger paying, or pre-paying." },
      quiz: [
        { q: "Customer discovery questions focus on…", options: ["Your features", "The customer's problem and current behavior", "Pricing first", "Your logo"], answer: 1, explain: "Problems first; solutions later." },
        { q: "The strongest validation signal is…", options: ["A like", "A compliment", "A payment or pre-payment", "A follow"], answer: 2, explain: "Money talks." }
      ],
      sources: [{ t: "Steve Blank: customer development", u: "https://steveblank.com/category/customer-development/" }]
    },
    {
      id: "b-canvas", realm: "validate", title: "One-Page Lean Canvas", xp: 50, minutes: 40, lesson: 30,
      brief: "Put the whole business on one page: problem, customers, value proposition, solution, channels, revenue, costs, key metrics and unfair advantage.",
      steps: ["Fill in all nine boxes of a Lean Canvas.", "Highlight your riskiest assumption.", "Design one cheap test for it this week."],
      practice: "This mission is free.",
      protect: "Keep the canvas a living document; date every version.",
      myth: { myth: "I need a 40-page business plan first.", fact: "One page you test beats forty pages you don't." },
      quiz: [
        { q: "What do you test first?", options: ["The easiest assumption", "The riskiest assumption", "The logo", "The website colors"], answer: 1, explain: "Kill the biggest risk cheaply." },
        { q: "A Lean Canvas has how many boxes?", options: ["3", "9", "20", "1"], answer: 1, explain: "Nine." }
      ],
      sources: [{ t: "Praeclaris library: business model and pricing", u: "../learn/#week-30" }]
    },
    {
      id: "b-pricing", realm: "model", title: "Price It Like a Professional", xp: 60, minutes: 40, lesson: 30,
      brief: "Unit economics: the revenue and cost of a single sale. If one sale loses money, a thousand will too.",
      steps: ["Calculate your cost to deliver one unit or session (time, materials, fees).", "Research three competitors' prices.", "Set a price with a healthy margin, and write the value it delivers.", "Create three tiers: good, better, best."],
      practice: "This mission is free.",
      protect: "Underpricing is the most common small-business mistake. It's easier to discount than to raise prices.",
      myth: { myth: "Lowest price wins.", fact: "Clear value wins. Low prices attract the hardest customers." },
      quiz: [
        { q: "Unit economics means…", options: ["Total revenue", "The revenue and cost of a single sale", "Stock price", "Employee count"], answer: 1, explain: "Fix the unit before you scale." },
        { q: "Why offer three tiers?", options: ["To confuse buyers", "To let customers self-select and anchor value", "It's required", "To lower prices"], answer: 1, explain: "Tiers anchor and segment." }
      ],
      sources: [{ t: "SBA business guide", u: "https://www.sba.gov/business-guide" }]
    },
    {
      id: "b-kpis", realm: "model", title: "Your KPI Dashboard", xp: 60, minutes: 40, lesson: 32,
      brief: "Measure what matters: 3 to 5 numbers that tell you whether the business is healthy.",
      steps: ["Pick 3-5 KPIs: revenue, gross margin, cash on hand, customer acquisition cost, repeat-customer rate.", "Build a simple monthly sheet for them.", "Set a monthly 'numbers day' review."],
      practice: "Use a sample month with made-up numbers to build the sheet.",
      protect: "Cash on hand is the KPI that kills businesses. Watch it weekly.",
      myth: { myth: "Profit means I have cash.", fact: "Profitable businesses fail from cash-flow timing." },
      quiz: [
        { q: "Which KPI most often decides whether a small business survives?", options: ["Followers", "Cash on hand", "Logo awareness", "Office size"], answer: 1, explain: "Run out of cash and it's over." },
        { q: "How many KPIs should a small business track to start?", options: ["1", "3 to 5", "50", "None"], answer: 1, explain: "Few enough to act on." }
      ],
      sources: [{ t: "BLS Business Employment Dynamics", u: "https://www.bls.gov/bdm/bdmage.htm" }]
    },
    {
      id: "b-legal", realm: "foundations", title: "Charter the Business", xp: 60, minutes: 60, lesson: 31,
      brief: "Separate the business from yourself: entity, EIN, bank account and basic contracts.",
      steps: ["Compare sole proprietorship and LLC for your situation, and ask a professional if unsure.", "Get a free EIN from IRS.gov (never pay a third party for it).", "Open a separate business bank account.", "Create a simple client agreement template."],
      practice: "Research mode: write the steps and costs for your state without filing.",
      protect: "The IRS EIN application is free. Sites charging for it are middlemen.",
      myth: { myth: "An LLC protects me from everything.", fact: "Mixing personal and business money can pierce that protection." },
      quiz: [
        { q: "What does an EIN cost from the IRS?", options: ["$50", "Free", "$300", "$99/yr"], answer: 1, explain: "Free at irs.gov." },
        { q: "Why open a separate business bank account?", options: ["For the rewards", "To separate finances and protect liability", "It's faster", "No reason"], answer: 1, explain: "Clean books and liability protection." }
      ],
      sources: [{ t: "IRS: apply for an EIN", u: "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online" }]
    },
    {
      id: "b-books", realm: "foundations", title: "Bookkeeping That Runs Itself", xp: 50, minutes: 40, lesson: 32,
      brief: "Bookkeeping is a weekly habit, not a tax-season panic.",
      steps: ["Choose a bookkeeping tool or spreadsheet.", "Connect only the business account.", "Categorize every transaction weekly (15 minutes).", "Save receipts digitally with dates."],
      practice: "Use a template with sample data.",
      protect: "Set aside a percentage of every payment for taxes in a separate account.",
      myth: { myth: "I'll sort it out at tax time.", fact: "Catching up a year of books costs far more than weekly upkeep." },
      quiz: [
        { q: "How often should a small business categorize transactions?", options: ["Once a year", "Weekly", "Never", "Only when audited"], answer: 1, explain: "Small, frequent beats big and painful." },
        { q: "A smart habit for taxes is…", options: ["Spending everything", "Setting aside a percentage of each payment", "Ignoring it", "Paying late"], answer: 1, explain: "No surprise bills." }
      ],
      sources: [{ t: "SBA: manage your finances", u: "https://www.sba.gov/business-guide/manage-your-business/manage-your-finances" }]
    },
    {
      id: "b-pm", realm: "foundations", title: "Run Work Like a Project", xp: 60, minutes: 45, lesson: 39,
      brief: "Projects fail from unclear scope, owners and deadlines, not lack of effort. Use one simple project system for everything.",
      steps: ["Pick one active project and write its outcome in one sentence.", "Break it into milestones, each with an owner and a due date.", "Keep a task board: To do, Doing, Done.", "Hold a weekly 15-minute review: what's done, what's stuck, what's next.", "Keep a risk and decision log for the project."],
      practice: "Use a personal project, like planning a trip, to practice.",
      protect: "Too much work in progress kills projects. Limit 'Doing' to three items.",
      myth: { myth: "Project management is for big companies.", fact: "A one-page plan and a weekly review are project management." },
      quiz: [
        { q: "Every milestone needs…", options: ["A logo", "An owner and a due date", "A meeting", "A budget of $10k"], answer: 1, explain: "Ownership plus deadline." },
        { q: "The fastest way to unstick projects is…", options: ["Start more", "Limit work in progress", "Work longer hours", "Skip reviews"], answer: 1, explain: "Finish before starting." }
      ],
      sources: [{ t: "Praeclaris library: 90-day build", u: "../learn/#week-39" }]
    },
    {
      id: "b-marketing", realm: "growth", title: "Build an Audience With Education", xp: 60, minutes: 60, lesson: 33,
      brief: "Teaching builds trust. One helpful post a week, on one platform, beats sporadic posting everywhere.",
      steps: ["Choose one platform where your customers already spend time.", "Write 12 post ideas that answer customer questions.", "Schedule one post a week for 12 weeks.", "Add one clear call to action (a free resource or consultation)."],
      practice: "This mission is free.",
      protect: "Follow FTC rules: no fake reviews or testimonials, and no earnings claims you can't back up.",
      myth: { myth: "I need to go viral.", fact: "Consistent, useful content compounds; viral moments fade." },
      quiz: [
        { q: "Best starting marketing strategy for a small business:", options: ["Post everywhere daily", "One platform, consistent educational posts", "Paid ads only", "Buy followers"], answer: 1, explain: "Focus and consistency." },
        { q: "Are fake testimonials legal in the U.S.?", options: ["Yes", "No, the FTC bans them", "Only on Instagram", "Only for small businesses"], answer: 1, explain: "The FTC's 2024 rule bans fake reviews and testimonials." }
      ],
      sources: [{ t: "FTC: endorsements and reviews", u: "https://www.ftc.gov/business-guidance/advertising-marketing/endorsements-influencers-reviews" }]
    },
    {
      id: "b-sales", realm: "growth", title: "The Follow-Up Pipeline", xp: 60, minutes: 45, lesson: 34,
      brief: "Most sales come from follow-up. A simple pipeline makes sure nobody falls through the cracks.",
      steps: ["Create pipeline stages: Lead, Conversation, Proposal, Won, Lost.", "Add every current prospect.", "Set a follow-up rule, for example within 48 hours, then at 7 and 14 days.", "Track your conversion rate each month."],
      practice: "Build the pipeline with sample names.",
      protect: "Get consent before adding people to email lists.",
      myth: { myth: "Good products sell themselves.", fact: "Good products with follow-up sell." },
      quiz: [
        { q: "Where do most lost sales leak?", options: ["Pricing", "Lack of follow-up", "Logos", "Fonts"], answer: 1, explain: "Follow-up is the system." },
        { q: "A pipeline's job is…", options: ["Decoration", "To show every prospect's stage and the next action", "Social media", "Payroll"], answer: 1, explain: "Visibility drives action." }
      ],
      sources: [{ t: "Praeclaris library: sales system", u: "../learn/#week-34" }]
    },
    {
      id: "b-crypto", realm: "growth", title: "Accept Stablecoins (Carefully)", xp: 50, minutes: 40, lesson: 37,
      brief: "Some customers want to pay in crypto or stablecoins. Done right, it can cut fees. Done carelessly, it creates tax and volatility headaches.",
      steps: ["Decide whether to accept stablecoins only, or volatile assets too.", "Compare a payment processor (which can auto-convert to dollars) with direct wallet payments.", "Set your bookkeeping rule: record the USD value at receipt.", "Talk to your tax professional before your first crypto payment."],
      practice: "Research mode: compare two processors' fees in a table.",
      protect: "Crypto received as payment is income at its fair market value when you receive it.",
      myth: { myth: "Crypto payments are untraceable, so no taxes.", fact: "They're recorded publicly and taxable." },
      quiz: [
        { q: "When you receive crypto as payment, you record…", options: ["Nothing", "The USD value at receipt as income", "Only when you sell", "Half the value"], answer: 1, explain: "Fair market value at receipt." },
        { q: "The simplest way to avoid volatility when accepting crypto:", options: ["Accept meme coins", "Accept stablecoins or auto-convert to USD", "Hold everything", "Ignore it"], answer: 1, explain: "Stable value or instant conversion." }
      ],
      sources: [{ t: "IRS: digital assets", u: "https://www.irs.gov/filing/digital-assets" }]
    },
    {
      id: "b-ai", realm: "command", title: "AI as a Business Multiplier", xp: 50, minutes: 45, lesson: 36,
      brief: "AI is leverage: drafting, research, customer support and operations. Use it on repeatable tasks, with a human check on anything that matters.",
      steps: ["List your five most repetitive weekly tasks.", "Pick one and write a reusable AI prompt or workflow for it.", "Add a review step: you approve before anything goes to a customer.", "Measure the time saved after two weeks."],
      practice: "This mission is free with most AI tools' free tiers.",
      protect: "Never paste customer personal data or confidential numbers into AI tools without checking their data policy.",
      myth: { myth: "AI will run my business for me.", fact: "AI multiplies a good system. It also multiplies a bad one." },
      quiz: [
        { q: "Which tasks suit AI best at first?", options: ["One-off strategy decisions", "Repeatable drafting and research tasks", "Legal signatures", "Firing people"], answer: 1, explain: "Repeatable tasks with a human check." },
        { q: "Before pasting data into an AI tool you should…", options: ["Do nothing", "Check its data policy and remove sensitive info", "Share passwords", "Upload everything"], answer: 1, explain: "Protect customer data." }
      ],
      sources: [{ t: "Praeclaris library: AI multiplier", u: "../learn/#week-36" }]
    },
    {
      id: "b-funding", realm: "command", title: "Climb the Funding Ladder", xp: 50, minutes: 40, lesson: 38,
      brief: "Not every business needs outside money. The ladder runs from revenue and savings, to credit, SBA-backed loans and grants, and finally investors.",
      steps: ["Write which rung you're on today.", "List what the next rung requires (credit history, revenue history, a plan).", "Find your local Small Business Development Center or SCORE mentor (both free)."],
      practice: "This mission is free.",
      protect: "Watch for 'guaranteed funding' and grant-fee scams. Real government grants don't charge application fees.",
      myth: { myth: "Raising money means success.", fact: "Funding is an obligation. Revenue is validation." },
      quiz: [
        { q: "The first rung of the funding ladder is…", options: ["Venture capital", "Revenue and savings (bootstrapping)", "A bank loan", "An ICO"], answer: 1, explain: "Fund growth from customers first." },
        { q: "Free mentoring for U.S. small businesses comes from…", options: ["Paid gurus only", "SCORE and Small Business Development Centers", "Nobody", "Social media DMs"], answer: 1, explain: "Both are SBA-supported and free." }
      ],
      sources: [{ t: "SBA: plan, launch and manage", u: "https://www.sba.gov/business-guide" }]
    },
    {
      id: "b-90day", realm: "command", title: "Final Trial: The 90-Day Build", xp: 100, minutes: 60, lesson: 39, boss: true,
      brief: "Bring it all together in a 90-day operating plan: one objective, three milestones, weekly actions, KPIs and a risk list.",
      steps: ["Write one objective for the next 90 days.", "Set three milestones (one per month), each with an owner and a date.", "List the weekly actions that drive them.", "Choose the KPIs you'll review monthly.", "List the top three risks and your response to each.", "Schedule the day-90 review now."],
      practice: "This mission is free.",
      protect: "Share your objective publicly for accountability, but keep private numbers private.",
      myth: { myth: "Planning is wasted time.", fact: "A 60-minute plan saves 90 days of drift." },
      quiz: [
        { q: "A 90-day plan should have…", options: ["Ten objectives", "One objective with milestones and KPIs", "No dates", "Only ideas"], answer: 1, explain: "Focus wins." },
        { q: "When should you schedule the day-90 review?", options: ["On day 90", "Now, when you write the plan", "Never", "When things go wrong"], answer: 1, explain: "Put it on the calendar now." }
      ],
      sources: [{ t: "Praeclaris library: quarter review", u: "../learn/#week-39" }]
    }
  ]
};
