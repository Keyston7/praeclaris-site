// Praeclaris Crypto Quest: "Keys to the Kingdom"
// Eight realms, beginner to advanced. Each mission is a real-world action with a
// no-money practice option, a knowledge check and a debrief.
// Edit freely: add a mission by copying one block. "lesson" links to the free
// library week (learn/#week-N). Sources are public pages.

window.QUEST_CRYPTO = {
  id: "crypto",
  title: "Keys to the Kingdom",
  subtitle: "The Praeclaris Crypto Quest",
  intro: "Eight realms take you from your first question about crypto to running your own secure, well-documented crypto system. Every mission is a small real-world action. You never need to spend money to progress: every mission that involves money has a practice option.",
  promise: "This quest never asks for your seed phrase, passwords, account numbers or balances. Progress is saved only in this browser.",
  ranks: [
    { name: "Newcomer", at: 0 },
    { name: "System Starter", at: 0.15 },
    { name: "System Operator", at: 0.4 },
    { name: "System Builder", at: 0.65 },
    { name: "Sovereign Architect", at: 0.9 }
  ],
  realms: [
    { id: "foundation", name: "The Foundation Grounds", tagline: "Build the house before you buy the furniture.", badge: "Foundation Laid", level: "Beginner" },
    { id: "library", name: "The Ledger Library", tagline: "Understand what you're holding.", badge: "Scholar of the Ledger", level: "Beginner" },
    { id: "watchtower", name: "The Watchtower", tagline: "Protect yourself before you buy anything.", badge: "Watch Keeper", level: "Beginner" },
    { id: "exchange", name: "The Exchange Gate", tagline: "Enter the market the safe way.", badge: "Gate Passed", level: "Intermediate" },
    { id: "keep", name: "The Key Keep", tagline: "Not your keys, not your coins.", badge: "Keeper of Keys", level: "Intermediate" },
    { id: "records", name: "The Records Hall", tagline: "If it isn't written down, it didn't happen.", badge: "Master of Records", level: "Intermediate" },
    { id: "frontier", name: "The DeFi Frontier", tagline: "Smart contracts, stablecoins and where people get hurt.", badge: "Frontier Scout", level: "Advanced" },
    { id: "citadel", name: "The Sovereign Citadel", tagline: "Run it like an institution. Pass it on like an heirloom.", badge: "Sovereign Architect", level: "Advanced" }
  ],
  missions: [
    // ---------------- REALM 1: FOUNDATION ----------------
    {
      id: "c-cashflow", realm: "foundation", title: "Map Your Cash Flow", xp: 40, minutes: 30, lesson: 3,
      brief: "Before you invest in anything, you need to know what comes in and what goes out each month. Positive cash flow is what gives you options.",
      steps: [
        "List every source of income from last month.",
        "Pull the last 30 to 60 days of bank and card statements.",
        "Sort spending into four buckets: needs, wants, debt payments and savings.",
        "Subtract spending from income. That number is your monthly cash flow.",
        "Circle two categories you could trim without hurting your life."
      ],
      practice: "No statements handy? Estimate last month from memory on paper. Rough numbers still show you the shape.",
      protect: "Keep this map offline or in a private file. Never post real numbers.",
      myth: { myth: "I'll start investing once I earn more.", fact: "Cash flow, not income, creates options. People with high incomes and negative cash flow stay stuck." },
      quiz: [
        { q: "What is monthly cash flow?", options: ["Your salary before taxes", "Income minus spending for the month", "The balance in your checking account", "What you invested this month"], answer: 1, explain: "Cash flow is money in minus money out over a period. Your balance is a snapshot; cash flow is the direction you're moving." },
        { q: "Why map cash flow before buying crypto?", options: ["Exchanges require it", "So you only invest money you won't need for bills", "It lowers fees", "It's required for taxes"], answer: 1, explain: "Crypto is volatile. Money you need for rent should never be in it. The map tells you what is truly spare." }
      ],
      sources: [{ t: "CFPB budgeting and debt tools", u: "https://www.consumerfinance.gov/consumer-tools/" }]
    },
    {
      id: "c-emergency", realm: "foundation", title: "Build the Moat: Emergency Fund", xp: 40, minutes: 20, lesson: 16,
      brief: "An emergency fund is protection, not an investment. It means a car repair never forces you to sell crypto at the bottom.",
      steps: [
        "Pick a starter target: $500 to $1,000, or one month of needs.",
        "Open or choose a separate savings account, not your checking account.",
        "Set an automatic transfer every payday, even if it's small.",
        "Write the rule: this money is only for real emergencies, never for buying dips."
      ],
      practice: "Can't fund it yet? Write the target and the transfer amount, and set a calendar reminder for payday.",
      protect: "Keep the emergency fund in a federally insured account. It should be boring and instantly available.",
      myth: { myth: "Crypto can be my emergency fund.", fact: "Emergencies often arrive during market drops. An emergency fund must be stable when you need it." },
      quiz: [
        { q: "Where should an emergency fund live?", options: ["In Bitcoin", "In a stablecoin earning yield", "In an insured, separate savings account", "In a brokerage account"], answer: 2, explain: "Stability and access come first. Insured savings is boring by design." },
        { q: "The Federal Reserve's 2025 survey found what share of adults would cover a $400 expense with cash or its equivalent?", options: ["About 20%", "About 63%", "About 90%", "About 40%"], answer: 1, explain: "About 63%, so more than a third could not. The emergency fund is the first layer of sovereignty." }
      ],
      sources: [{ t: "Federal Reserve SHED report", u: "https://www.federalreserve.gov/consumerscommunities/shed.htm" }]
    },
    {
      id: "c-slice", realm: "foundation", title: "Decide Your Crypto Slice", xp: 50, minutes: 20, lesson: 19,
      brief: "Position sizing is the most important decision in crypto. Decide how much before you decide what.",
      steps: [
        "Write the most you could lose without changing your life. Assume crypto can fall 75% or more; it has, more than once.",
        "Turn that into a rule, for example: no more than X% of my investable money, and only from positive cash flow.",
        "Write it at the top of a page called 'My Crypto Rules'. You'll add to it all quest long."
      ],
      practice: "This mission is free: it's a decision, not a purchase.",
      protect: "Rules written before emotions show up are what protect you when prices move fast.",
      myth: { myth: "Go big or go home.", fact: "Oversizing is how people get forced out at the bottom. Small, steady positions survive long enough to matter." },
      quiz: [
        { q: "Bitcoin fell roughly how far from its peak in the 2018 and 2022 bear markets?", options: ["About 10 to 20%", "About 30 to 40%", "About 75 to 85%", "It never fell"], answer: 2, explain: "Both bear markets cut more than three-quarters off the peak price. Size every position as if that can happen again." },
        { q: "What should you decide first?", options: ["Which coin to buy", "How much you can afford to lose", "Which exchange is cheapest", "What influencers recommend"], answer: 1, explain: "How much comes before what. That's position sizing." }
      ],
      sources: [{ t: "Investor.gov: diversify your investments", u: "https://www.investor.gov/introduction-investing/investing-basics/save-and-invest/diversify-your-investments" }]
    },

    // ---------------- REALM 2: LIBRARY ----------------
    {
      id: "c-notebook", realm: "library", title: "The Shared Notebook", xp: 30, minutes: 15, lesson: 5,
      brief: "A blockchain is a shared notebook that thousands of computers keep identical copies of. Nobody can secretly erase a page.",
      steps: [
        "Read the lesson on blockchain in plain English.",
        "Explain it out loud to someone (or your phone's recorder) in under 60 seconds using the notebook analogy.",
        "Write one thing a shared notebook is good for and one thing it can't do. For example, it can't tell whether what was written is true."
      ],
      practice: "This mission is free.",
      protect: "'It's on the blockchain' doesn't mean 'it's safe' or 'it's legit'. Scam tokens live on blockchains too.",
      myth: { myth: "Blockchain means anonymous.", fact: "Most blockchains are public. Every transaction is visible forever; only the names are missing." },
      quiz: [
        { q: "What makes a public blockchain hard to change?", options: ["A company guards it", "Thousands of independent copies must agree", "It's encrypted with a password", "Governments approve each block"], answer: 1, explain: "Changing history would mean overpowering the majority of independent participants." },
        { q: "Are public blockchain transactions private?", options: ["Yes, fully anonymous", "No, they are publicly visible", "Only on weekends", "Only for Bitcoin"], answer: 1, explain: "They're pseudonymous: addresses, not names, but everything is visible." }
      ],
      sources: [{ t: "Bitcoin white paper (Nakamoto, 2008)", u: "https://bitcoin.org/bitcoin.pdf" }]
    },
    {
      id: "c-bitcoin", realm: "library", title: "21 Million and the Halving", xp: 30, minutes: 20, lesson: 6,
      brief: "Bitcoin's rules are fixed and public: about one block every 10 minutes, a supply capped at 21 million, and new issuance cut in half every 210,000 blocks (about every four years).",
      steps: [
        "Read the lesson on how Bitcoin works.",
        "Write the three rules in your own words: block time, supply cap, halving.",
        "Look up when the last halving happened (April 2024) and estimate the next one."
      ],
      practice: "This mission is free.",
      protect: "Anyone promising 'guaranteed' gains from the halving is selling something. Past cycles are history, not a contract.",
      myth: { myth: "You have to buy a whole bitcoin.", fact: "One bitcoin divides into 100 million satoshis. You can buy a few dollars' worth." },
      quiz: [
        { q: "How often does the Bitcoin block reward halve?", options: ["Every year", "Every 210,000 blocks (about 4 years)", "Whenever miners vote", "Every 21 million blocks"], answer: 1, explain: "Every 210,000 blocks, about four years at roughly 10 minutes per block." },
        { q: "What is a satoshi?", options: ["A type of wallet", "One hundred-millionth of a bitcoin", "A Bitcoin exchange", "A mining machine"], answer: 1, explain: "1 BTC = 100,000,000 satoshis (sats)." }
      ],
      sources: [{ t: "Bitcoin developer guide: block chain", u: "https://developer.bitcoin.org/devguide/block_chain.html" }]
    },
    {
      id: "c-types", realm: "library", title: "Coins, Tokens and Stablecoins", xp: 30, minutes: 20, lesson: 12,
      brief: "Not all crypto is the same thing. Coins run their own networks, tokens live on someone else's network, and stablecoins try to hold a steady price, usually $1.",
      steps: [
        "Sort these into coin, token or stablecoin: BTC, ETH, USDC, a meme token on Solana. (Answers: coin, coin, stablecoin, token.)",
        "Write one sentence on what backs a fiat-backed stablecoin (cash and short-term government debt held in reserve).",
        "Note one risk of each type."
      ],
      practice: "This mission is free.",
      protect: "'ISO 20022 coin' is a marketing label. ISO 20022 is a messaging standard; ISO doesn't certify cryptocurrencies.",
      myth: { myth: "Every stablecoin is equally safe.", fact: "Safety depends on reserves, audits, redemption rights and regulation. Algorithmic stablecoins have collapsed before." },
      quiz: [
        { q: "What is a stablecoin designed to do?", options: ["Double every cycle", "Hold a steady value, usually $1", "Pay mining rewards", "Replace Bitcoin"], answer: 1, explain: "Stablecoins aim for a steady peg. How well they hold it depends on what backs them." },
        { q: "Does ISO certify cryptocurrencies as 'ISO 20022 compliant'?", options: ["Yes", "No, ISO 20022 is a messaging standard", "Only XRP", "Only stablecoins"], answer: 1, explain: "ISO 20022 standardizes financial messages. It isn't a seal of approval on any coin." }
      ],
      sources: [{ t: "ISO 20022 FAQ", u: "https://www.iso20022.org/faq" }, { t: "OCC: GENIUS Act rule", u: "https://www.occ.gov/news-issuances/news-releases/2026/nr-occ-2026-92.html" }]
    },
    {
      id: "c-explorer", realm: "library", title: "Read the Public Ledger", xp: 40, minutes: 15, lesson: 5,
      brief: "Seeing is believing. A block explorer lets anyone read the blockchain. You'll look at real Bitcoin blocks without buying anything.",
      steps: [
        "Open mempool.space (a public Bitcoin block explorer).",
        "Find the most recent block: note its height, the number of transactions and the time.",
        "Click any transaction and find its inputs, outputs and fee.",
        "Write down how long it's been since the previous block."
      ],
      practice: "This mission is free and uses only public data.",
      protect: "Explorers are read-only. If a 'block explorer' asks you to connect a wallet or enter a seed phrase, it's a scam.",
      myth: { myth: "Nobody can see crypto transactions.", fact: "You just saw them. That transparency is why privacy habits matter later in the quest." },
      quiz: [
        { q: "Can you read a public blockchain without an account?", options: ["No", "Yes, explorers are public", "Only with a hardware wallet", "Only on an exchange"], answer: 1, explain: "Anyone can read public blockchains." },
        { q: "An 'explorer' asks for your seed phrase. What is it?", options: ["A security check", "A scam", "A normal sign-in", "A software update"], answer: 1, explain: "No legitimate site ever needs your seed phrase." }
      ],
      sources: [{ t: "mempool.space Bitcoin explorer", u: "https://mempool.space/" }]
    },

    // ---------------- REALM 3: WATCHTOWER ----------------
    {
      id: "c-masterkeys", realm: "watchtower", title: "Lock the Master Keys", xp: 50, minutes: 40, lesson: 41,
      brief: "Your email is the master key: it can reset everything else. Secure it before you open any crypto account.",
      steps: [
        "Install a reputable password manager and create a long, unique master passphrase.",
        "Give your main email a new, unique password generated by the manager.",
        "Turn on multi-factor authentication with an authenticator app or a passkey, not SMS if you can avoid it.",
        "Save the email's backup codes somewhere offline and private.",
        "Consider a separate email address used only for financial and crypto accounts."
      ],
      practice: "Do it for real; it costs nothing. Most password managers have free tiers.",
      protect: "Never reuse a password between email and any financial account.",
      myth: { myth: "My password is strong, so I'm fine.", fact: "Reused passwords leak in breaches. Unique passwords plus app-based MFA stop most account takeovers." },
      quiz: [
        { q: "Which second factor is generally strongest for most people?", options: ["SMS text codes", "Authenticator app or passkey", "Security questions", "Email codes"], answer: 1, explain: "SMS can be hijacked by SIM swaps. Authenticator apps and passkeys are far harder to steal." },
        { q: "Why secure email first?", options: ["It's the cheapest", "Email can reset your other accounts", "Exchanges require Gmail", "It's faster"], answer: 1, explain: "Whoever controls your email can reset almost everything else." }
      ],
      sources: [{ t: "CISA: Secure Our World", u: "https://www.cisa.gov/secure-our-world" }]
    },
    {
      id: "c-simswap", realm: "watchtower", title: "Shield Against SIM Swaps", xp: 40, minutes: 15, lesson: 43,
      brief: "In a SIM swap, a criminal convinces your carrier to move your number to their phone, then receives your text codes.",
      steps: [
        "Call your mobile carrier or open its app and set a port-out PIN or number lock.",
        "Add an account PIN or passcode for any change requests.",
        "Move your crypto and email two-factor logins from SMS to an authenticator app.",
        "Stop publishing your phone number on social profiles."
      ],
      practice: "Free. The carrier step usually takes under 10 minutes.",
      protect: "If your phone suddenly loses service for no reason, call your carrier from another phone immediately.",
      myth: { myth: "Only celebrities get SIM-swapped.", fact: "Crypto holders are targeted because a single swap can unlock exchange accounts." },
      quiz: [
        { q: "What does a port-out PIN protect against?", options: ["Phone theft", "Your number being moved to another SIM without you", "Viruses", "Data overages"], answer: 1, explain: "It stops unauthorized number transfers." },
        { q: "Your phone shows 'No service' out of nowhere. What first?", options: ["Wait a day", "Contact your carrier from another phone right away", "Restart the router", "Post about it"], answer: 1, explain: "Speed matters. A swap in progress can be reversed if you act fast." }
      ],
      sources: [{ t: "FCC: SIM swapping and port-out fraud", u: "https://www.fcc.gov/consumers/guides/cell-phone-fraud" }]
    },
    {
      id: "c-scams", realm: "watchtower", title: "The Scam-Spotting Drill", xp: 50, minutes: 20, lesson: 11,
      brief: "The FBI's 2025 report counted $11.37 billion in crypto losses, with investment fraud the largest share. Learning the patterns is the cheapest insurance there is.",
      steps: [
        "Learn the six red flags: guaranteed returns; urgency; a stranger or new 'friend' who brings up crypto; requests to move funds to their platform or app; 'support' that contacts you first; anyone asking for your seed phrase.",
        "Write the rule: I never send crypto to someone I met online, and I never share my seed phrase.",
        "Tell one family member, especially an older one, about crypto ATM and 'pig butchering' scams.",
        "Bookmark ic3.gov for reporting."
      ],
      practice: "Free. The family conversation is the highest-value step.",
      protect: "Real support never DMs you first and never needs your seed phrase or remote access to your computer.",
      myth: { myth: "I'm too smart to get scammed.", fact: "Scams work on emotion and trust, not intelligence. People over 60 reported $4.4 billion in losses." },
      quiz: [
        { q: "Someone you met on a dating app shows you a trading platform with huge returns. What is it?", options: ["A lucky break", "A classic investment-fraud pattern", "A regulated broker", "A normal tip"], answer: 1, explain: "This is the 'pig butchering' pattern: build trust, then steer you to a fake platform." },
        { q: "'Wallet support' messages you to fix an issue and asks for your 12 words. You:", options: ["Send them", "Send half", "Never share; block and report", "Send a photo"], answer: 2, explain: "Nobody legitimate ever needs your seed phrase." },
        { q: "Where do you report internet crime in the U.S.?", options: ["ic3.gov", "The exchange's Twitter", "A recovery service that DMs you", "Nowhere"], answer: 0, explain: "The FBI's IC3. Beware 'recovery' services; they're often a second scam." }
      ],
      sources: [{ t: "FBI IC3 annual report", u: "https://www.ic3.gov/AnnualReport/Reports" }, { t: "FTC: crypto scams", u: "https://consumer.ftc.gov/articles/what-know-about-cryptocurrency-and-scams" }]
    },
    {
      id: "c-freeze", realm: "watchtower", title: "Freeze Your Credit", xp: 30, minutes: 20, lesson: 43,
      brief: "Exchanges verify your identity, which means your identity is worth stealing. A credit freeze stops new accounts being opened in your name, and it's free.",
      steps: [
        "Freeze your credit at all three bureaus: Equifax, Experian and TransUnion.",
        "Store each bureau's PIN or login in your password manager.",
        "Note how to temporarily lift a freeze when you apply for credit."
      ],
      practice: "Free by federal law.",
      protect: "Freezing doesn't affect your credit score or your existing cards.",
      myth: { myth: "Freezing credit hurts my score.", fact: "It doesn't. It only blocks new credit checks until you lift it." },
      quiz: [
        { q: "What does a credit freeze cost in the U.S.?", options: ["$10 per bureau", "Nothing; it's free", "$99 a year", "1% of your credit line"], answer: 1, explain: "Free since 2018." },
        { q: "How many bureaus should you freeze?", options: ["One", "Two", "All three", "None"], answer: 2, explain: "Lenders may check any of them." }
      ],
      sources: [{ t: "FTC: credit freezes and fraud alerts", u: "https://consumer.ftc.gov/articles/what-know-about-credit-freezes-fraud-alerts" }]
    },

    // ---------------- REALM 4: EXCHANGE GATE ----------------
    {
      id: "c-choose", realm: "exchange", title: "Choose Your Gate", xp: 40, minutes: 30, lesson: 8,
      brief: "An exchange (on-ramp) is where most people first turn dollars into crypto. Pick one with a checklist, not a hype video.",
      steps: [
        "Shortlist two or three exchanges that legally serve your state.",
        "Check each one: registered with FinCEN as a money services business and licensed in your state; years operating; any proof-of-reserves reporting; security features (app-based MFA, withdrawal allowlists); and a clear fee page.",
        "Search '[exchange name] hack', 'lawsuit' and 'withdrawals paused'.",
        "Pick one and write down why."
      ],
      practice: "Research only; nothing to buy yet.",
      protect: "Type the exchange's address yourself or use a bookmark. Ads and search results can point to look-alike phishing sites.",
      myth: { myth: "The biggest exchange is automatically safe.", fact: "FTX was one of the largest exchanges in 2022 before it collapsed. Size isn't safety; custody and transparency matter." },
      quiz: [
        { q: "Which is the strongest signal of a safer U.S. exchange?", options: ["Celebrity ads", "Registration, state licenses and a security track record", "Highest advertised yield", "Most coins listed"], answer: 1, explain: "Regulatory standing and a track record beat marketing." },
        { q: "How should you reach the exchange's website?", options: ["Click the first search ad", "A bookmark or the address typed yourself", "A link in a DM", "A link in an email"], answer: 1, explain: "Phishing sites buy ads and send look-alike emails." }
      ],
      sources: [{ t: "FTC: crypto scams", u: "https://consumer.ftc.gov/articles/what-know-about-cryptocurrency-and-scams" }]
    },
    {
      id: "c-secureacct", realm: "exchange", title: "Fortify the Account", xp: 50, minutes: 30, lesson: 41,
      brief: "Open the account and lock it down before any money touches it.",
      steps: [
        "Sign up with your secured email and a unique password from your password manager.",
        "Complete identity verification only on the official site or app.",
        "Turn on authenticator-app MFA or a passkey; remove SMS if possible.",
        "Turn on a withdrawal address allowlist and an anti-phishing code if offered.",
        "Review active sessions and devices."
      ],
      practice: "Not ready to open an account? Find each of these settings in the exchange's help center and write down where they are.",
      protect: "Never let anyone 'help' you set up an account via screen-share or remote-access software.",
      myth: { myth: "Exchanges reimburse every hack.", fact: "Some do; many don't. Losses from phishing your own login are often not covered." },
      quiz: [
        { q: "What does a withdrawal allowlist do?", options: ["Speeds up withdrawals", "Only lets funds go to addresses you pre-approved", "Lowers fees", "Hides your balance"], answer: 1, explain: "Even if someone gets in, they can't send funds to a new address right away." },
        { q: "An anti-phishing code helps you…", options: ["Recover passwords", "Spot fake emails pretending to be the exchange", "Earn rewards", "Skip ID checks"], answer: 1, explain: "Real emails include your secret code; fakes won't." }
      ],
      sources: [{ t: "CISA: Secure Our World", u: "https://www.cisa.gov/secure-our-world" }]
    },
    {
      id: "c-firstbuy", realm: "exchange", title: "Your First Small Buy", xp: 50, minutes: 20, lesson: 8,
      brief: "Your first purchase is a lesson, not an investment. Use an amount you'd be fine losing entirely, like $10 to $25.",
      steps: [
        "Deposit a small amount by bank transfer (usually the lowest fee).",
        "Before buying, find the full cost: trading fee plus the spread (the gap between buy and sell price).",
        "Buy a small amount of a major asset.",
        "Screenshot or write down the date, amount, price and fee. That's your first record."
      ],
      practice: "Practice mode: pick a price from a public site today and 'paper buy' $25 in a notebook, fees included. Check it again in 30 days.",
      protect: "Avoid credit cards for crypto purchases: fees are high, and buying volatile assets with debt is risky.",
      myth: { myth: "'Zero-fee' means free.", fact: "Many platforms earn through the spread. Compare the price you pay with the market price." },
      quiz: [
        { q: "What is the 'spread'?", options: ["A fee for withdrawals", "The difference between the buy and sell price", "A type of coin", "Interest earned"], answer: 1, explain: "The spread is a hidden cost of trading." },
        { q: "The right size for a first purchase is…", options: ["As much as possible", "An amount you'd be fine losing", "Your emergency fund", "Borrowed money"], answer: 1, explain: "The first buy is for learning the process." }
      ],
      sources: [{ t: "Investor.gov", u: "https://www.investor.gov/" }]
    },
    {
      id: "c-dca", realm: "exchange", title: "The Bear Market Engine: DCA", xp: 60, minutes: 20, lesson: 19,
      brief: "Dollar-cost averaging (DCA) means buying a fixed amount on a fixed schedule, whatever the price. It takes emotion out of the decision and does its quiet work during bear markets, when headlines are worst.",
      steps: [
        "Choose an amount from your cash-flow map that you could keep up for 12 months or more.",
        "Choose a schedule (weekly or every payday) and add it to 'My Crypto Rules'.",
        "Write your bear-market rule, for example: I keep my schedule when prices fall; I don't add debt; I review once a month, not every day.",
        "Optional: set up a recurring buy, or just a calendar reminder."
      ],
      practice: "Practice mode: run a 'paper DCA' for four weeks in a notebook, using the same day and amount each week.",
      protect: "DCA reduces timing risk. It doesn't remove the risk that an asset falls and stays down. Asset quality and position size still matter.",
      myth: { myth: "I'll buy the exact bottom.", fact: "Nobody reliably calls bottoms. A schedule removes the need to." },
      quiz: [
        { q: "DCA means…", options: ["Buying only after big rallies", "Buying a fixed amount on a fixed schedule", "Borrowing to buy dips", "Day trading"], answer: 1, explain: "Fixed amount, fixed schedule, whatever the price." },
        { q: "What does DCA NOT protect against?", options: ["Emotional timing mistakes", "An asset that falls and never recovers", "Buying everything at one peak", "Decision fatigue"], answer: 1, explain: "That's why position size and asset selection still matter." }
      ],
      sources: [{ t: "Investor.gov: dollar-cost averaging", u: "https://www.investor.gov/introduction-investing/investing-basics/glossary/dollar-cost-averaging" }]
    },

    // ---------------- REALM 5: KEY KEEP ----------------
    {
      id: "c-custody", realm: "keep", title: "Who Holds the Keys?", xp: 40, minutes: 15, lesson: 7,
      brief: "A wallet doesn't hold coins; it holds the keys that control them. Custodial means a company holds the keys. Self-custody means you do.",
      steps: [
        "List every place you hold or plan to hold crypto, and mark each one custodial or self-custody.",
        "Write one pro and one con of each model.",
        "Decide which model fits you today, and why. Many people use both: an exchange for buying, self-custody for holding."
      ],
      practice: "This mission is free.",
      protect: "When an exchange fails, customers with funds on the platform can wait years for partial repayment, as with Mt. Gox, Celsius and FTX.",
      myth: { myth: "Support can recover my seed phrase.", fact: "Nobody can. Anyone who offers to is a scammer." },
      quiz: [
        { q: "In self-custody, who can recover a lost seed phrase?", options: ["The wallet company", "Nobody", "Your bank", "The blockchain"], answer: 1, explain: "That's the trade-off of full control." },
        { q: "A wallet stores…", options: ["Your coins", "The keys that control your coins", "Your bank login", "Your tax records"], answer: 1, explain: "Coins live on the blockchain; your keys prove you can move them." }
      ],
      sources: [{ t: "BIP-39 seed phrases", u: "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki" }]
    },
    {
      id: "c-wallet", realm: "keep", title: "Forge Your First Wallet", xp: 60, minutes: 30, lesson: 7,
      brief: "Set up a reputable self-custody software wallet and back up its seed phrase the right way.",
      steps: [
        "Download a well-known wallet only from its official website or your phone's official app store. Check the developer name.",
        "Create a new wallet. When the 12 or 24 words appear, write them on paper in order. No photos, screenshots, cloud notes or password managers.",
        "Confirm the words when the app asks, then store the paper somewhere private and safe from fire and water.",
        "Write in 'My Crypto Rules': my seed phrase is never typed into a website, chat or email."
      ],
      practice: "Practice mode: create the wallet as a trial run and don't fund it. Then delete it, so the practice seed is never used.",
      protect: "A real wallet app never asks for your seed phrase again after setup, except when you're restoring it yourself.",
      myth: { myth: "A screenshot of my seed is a fine backup.", fact: "Photos sync to the cloud and get stolen by malware. Paper or metal, offline." },
      quiz: [
        { q: "Best place for a seed phrase backup:", options: ["A phone photo", "An email to yourself", "Written on paper or metal, stored offline", "A notes app"], answer: 2, explain: "Offline backups can't be hacked remotely." },
        { q: "Where should you download a wallet app?", options: ["A link in a YouTube comment", "The official site or official app store, after checking the developer", "Any search ad", "A Telegram group"], answer: 1, explain: "Fake wallet apps are a common theft method." }
      ],
      sources: [{ t: "BIP-39 seed phrases", u: "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki" }]
    },
    {
      id: "c-testsend", realm: "keep", title: "The Test Send", xp: 60, minutes: 25, lesson: 7,
      brief: "Moving crypto is like sending a wire you can't reverse. Professionals always send a small test first.",
      steps: [
        "Copy your wallet's receiving address and paste it into the exchange's withdrawal form.",
        "Check the first and last 6 characters match. Malware can swap copied addresses.",
        "Make sure the network matches, for example Bitcoin to Bitcoin. The wrong network can lose the funds.",
        "Send a tiny test amount, wait for it to arrive, then send the rest if you planned to.",
        "Look the transaction up on a block explorer."
      ],
      practice: "Practice mode: open the withdrawal screen and identify the address, network and fee fields without sending anything.",
      protect: "Address poisoning: scammers send tiny transactions from look-alike addresses, hoping you copy theirs from your history. Always copy from your own wallet.",
      myth: { myth: "If I make a mistake, the exchange can reverse it.", fact: "Blockchain transactions are final. The test send is your undo button." },
      quiz: [
        { q: "Why send a test amount first?", options: ["It's required by law", "To confirm the address and network work before sending more", "To lower taxes", "To earn rewards"], answer: 1, explain: "A tiny fee buys certainty." },
        { q: "You should copy a receiving address from…", options: ["Your transaction history", "Your own wallet's Receive screen", "A message someone sent", "A screenshot"], answer: 1, explain: "History can contain poisoned look-alike addresses." }
      ],
      sources: [{ t: "FTC: crypto scams", u: "https://consumer.ftc.gov/articles/what-know-about-cryptocurrency-and-scams" }]
    },
    {
      id: "c-recovery", realm: "keep", title: "The Recovery Drill", xp: 50, minutes: 30, lesson: 42,
      brief: "A backup you've never tested is a hope, not a backup. Prove you can restore your wallet.",
      steps: [
        "On a second device (or after reinstalling), choose 'restore wallet' in the same app.",
        "Enter your seed phrase in the official wallet app only, never on a website.",
        "Confirm the same address appears.",
        "Write down the date of your successful drill. Repeat it once a year."
      ],
      practice: "Practice mode: do this with an unfunded practice wallet.",
      protect: "Restoring is the only moment you ever type a seed phrase, and only into the official wallet app on a device you trust.",
      myth: { myth: "I'll figure out recovery if I ever need it.", fact: "Recovery under stress is when mistakes happen. Drill it while it's calm." },
      quiz: [
        { q: "Where is it ever OK to enter a seed phrase?", options: ["A website that checks your balance", "Only the official wallet app, when restoring", "A support chat", "An airdrop claim page"], answer: 1, explain: "Anything else is a theft attempt." },
        { q: "How often should you test recovery?", options: ["Never", "At least once a year", "Every day", "Only after a hack"], answer: 1, explain: "Once a year keeps the skill and the backup fresh." }
      ],
      sources: [{ t: "BIP-39 seed phrases", u: "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki" }]
    },

    // ---------------- REALM 6: RECORDS HALL ----------------
    {
      id: "c-log", realm: "records", title: "Start Your Transaction Log", xp: 50, minutes: 30, lesson: 23,
      brief: "Every buy, sell, swap and transfer needs a record: date, asset, amount, price in USD, fee and which wallet. Starting now saves a painful scramble at tax time.",
      steps: [
        "Create a spreadsheet with columns: date, type, asset, amount, USD value, fee, from wallet, to wallet, notes.",
        "Log every transaction so far, including your first buy and test send.",
        "Download your exchange's transaction history (CSV) and save it to a private folder.",
        "Set a monthly 15-minute 'records day' on your calendar."
      ],
      practice: "Practice mode: log your paper trades in the same format.",
      protect: "Keep the log private and backed up. It shows what you own.",
      myth: { myth: "The exchange keeps my records, so I don't need to.", fact: "Exchanges close, merge or purge history. Transfers between your own wallets are invisible to them." },
      quiz: [
        { q: "Which of these is NOT needed in a transaction log?", options: ["Date", "USD value at the time", "Your seed phrase", "Fees"], answer: 2, explain: "Never put a seed phrase in any document." },
        { q: "Why record transfers between your own wallets?", options: ["They're taxable", "To keep your cost basis traceable across wallets", "To earn rewards", "Exchanges require it"], answer: 1, explain: "Transfers usually aren't taxable, but they move your basis. U.S. rules now track basis wallet by wallet." }
      ],
      sources: [{ t: "IRS: digital assets", u: "https://www.irs.gov/filing/digital-assets" }]
    },
    {
      id: "c-tax", realm: "records", title: "Know Your Taxable Events", xp: 50, minutes: 20, lesson: 24,
      brief: "In the U.S., crypto is treated as property. Selling for dollars, swapping one coin for another and spending crypto are generally taxable. Buying with dollars and holding generally isn't.",
      steps: [
        "Read the IRS digital assets page.",
        "Mark each transaction in your log as taxable or not taxable.",
        "Learn the difference between short-term (held a year or less) and long-term (held more than a year) gains.",
        "Note that exchanges now report on Form 1099-DA, and file a reminder to talk to a tax professional."
      ],
      practice: "This mission is free.",
      protect: "General education only. Your situation may differ; consult a licensed tax professional.",
      myth: { myth: "Crypto-to-crypto swaps aren't taxable.", fact: "In the U.S. a swap is generally a taxable disposal of the coin you gave up." },
      quiz: [
        { q: "Which is generally a taxable event in the U.S.?", options: ["Buying BTC with dollars", "Moving BTC between your own wallets", "Swapping ETH for SOL", "Holding"], answer: 2, explain: "A swap disposes of ETH, so a gain or loss is realized." },
        { q: "Long-term treatment generally applies after holding…", options: ["30 days", "6 months", "More than 1 year", "5 years"], answer: 2, explain: "More than one year." }
      ],
      sources: [{ t: "IRS: digital assets and Form 1099-DA", u: "https://www.irs.gov/filing/digital-assets" }]
    },
    {
      id: "c-etf", realm: "records", title: "ETF or Own It Directly?", xp: 40, minutes: 20, lesson: 25,
      brief: "Since January 2024, U.S. spot bitcoin ETFs let people get price exposure through a regular brokerage account. That's a different trade-off from holding the coin yourself.",
      steps: [
        "List pros and cons of an ETF: retirement-account eligibility, simple taxes, no keys to manage, but an annual fee, market hours only and no self-custody.",
        "List the same for direct ownership.",
        "Decide which fits each of your goals. For example: a retirement account might use an ETF, savings might be held directly."
      ],
      practice: "This mission is free.",
      protect: "With an ETF you own shares, not coins. You can't withdraw bitcoin from it.",
      myth: { myth: "An ETF is the same as owning bitcoin.", fact: "It tracks the price. Custody, fees and rights are different." },
      quiz: [
        { q: "When did the SEC approve U.S. spot bitcoin ETPs?", options: ["2017", "January 2024", "2021", "They haven't"], answer: 1, explain: "January 10, 2024." },
        { q: "Can you withdraw bitcoin from a spot bitcoin ETF to your wallet?", options: ["Yes", "No", "Only on weekends", "Only for large holders"], answer: 1, explain: "You hold shares, not coins." }
      ],
      sources: [{ t: "SEC statement on spot bitcoin ETPs", u: "https://www.sec.gov/newsroom/speeches-statements/gensler-statement-spot-bitcoin-011023" }]
    },

    // ---------------- REALM 7: DEFI FRONTIER ----------------
    {
      id: "c-contracts", realm: "frontier", title: "Smart Contracts and Gas", xp: 40, minutes: 20, lesson: 20,
      brief: "Ethereum runs smart contracts: programs that execute on the blockchain. Every action costs a fee called gas.",
      steps: [
        "Read the lesson on Ethereum and smart contracts.",
        "Open etherscan.io and look at the current gas price.",
        "Explain gas with a real-world analogy, like a toll road or postage.",
        "Write one thing a smart contract can do and one way it can fail (bugs, or admin keys that can change the rules)."
      ],
      practice: "This mission is free and uses public data.",
      protect: "Code is law, until there's a bug. Audited doesn't mean risk-free.",
      myth: { myth: "Smart contracts are smart.", fact: "They do exactly what the code says, including the bugs." },
      quiz: [
        { q: "What is gas?", options: ["A token you earn", "The fee to run an action on the network", "A type of wallet", "A stablecoin"], answer: 1, explain: "Gas pays the network to process your transaction." },
        { q: "When did Ethereum move to proof of stake (the Merge)?", options: ["2015", "September 2022", "2024", "It hasn't"], answer: 1, explain: "September 15, 2022, cutting energy use by about 99.95%." }
      ],
      sources: [{ t: "ethereum.org: The Merge", u: "https://ethereum.org/en/roadmap/merge/" }]
    },
    {
      id: "c-stable", realm: "frontier", title: "Stablecoins in the GENIUS Era", xp: 50, minutes: 25, lesson: 12,
      brief: "The GENIUS Act (signed July 18, 2025) creates a U.S. framework for payment stablecoins: reserves, disclosures and supervision. Its rules take full effect in January 2027.",
      steps: [
        "Read the lesson on stablecoins and the GENIUS Act.",
        "For one major stablecoin, find its issuer's reserve report or attestation page.",
        "Write what backs it, how often reserves are reported, and who supervises the issuer.",
        "Note the difference between a regulated payment stablecoin and a yield product built on top of it."
      ],
      practice: "This mission is free.",
      protect: "'Stable' doesn't mean 'insured'. Stablecoins aren't bank deposits.",
      myth: { myth: "Stablecoin yield is risk-free interest.", fact: "Yield comes from lending or strategies that carry their own risks." },
      quiz: [
        { q: "When was the GENIUS Act signed?", options: ["2021", "July 18, 2025", "January 2027", "It wasn't"], answer: 1, explain: "July 18, 2025; the rules take full effect January 18, 2027." },
        { q: "Is a stablecoin the same as an FDIC-insured deposit?", options: ["Yes", "No", "Only USDC", "Only on exchanges"], answer: 1, explain: "Different legal protections." }
      ],
      sources: [{ t: "OCC: GENIUS Act rule", u: "https://www.occ.gov/news-issuances/news-releases/2026/nr-occ-2026-92.html" }]
    },
    {
      id: "c-defi", realm: "frontier", title: "DeFi Without Getting Hurt", xp: 60, minutes: 30, lesson: 22,
      brief: "DeFi lets you trade, lend and borrow without a company in the middle. It also has unforgiving failure modes: hacks, rug pulls, liquidations and malicious approvals.",
      steps: [
        "Learn the four big DeFi risks: smart-contract bugs, rug pulls (the team disappears), liquidation (borrowed positions sold automatically) and unlimited token approvals.",
        "Use a revoke tool (for example revoke.cash) in read-only mode to view your wallet's approvals.",
        "Write your DeFi rule, for example: separate 'hot' wallet with small amounts only, and review approvals monthly.",
        "If you explore, use well-established protocols and amounts you'd be fine losing."
      ],
      practice: "Practice mode: read how a lending protocol's liquidation works and write a one-paragraph example.",
      protect: "Never sign a transaction or 'permit' you don't understand. Wallet drainers often look like airdrop claims.",
      myth: { myth: "High APY means a great opportunity.", fact: "Unusually high yield is usually payment for unusually high risk, or a trap." },
      quiz: [
        { q: "What is an unlimited token approval?", options: ["A bonus", "Permission for a contract to move all of a token from your wallet", "A KYC level", "A free transaction"], answer: 1, explain: "If the contract is malicious or hacked, it can drain that token." },
        { q: "A site asks you to sign to 'claim a free airdrop'. Safest move?", options: ["Sign quickly", "Verify independently; assume it's a drainer until proven otherwise", "Enter your seed", "Share it with friends"], answer: 1, explain: "Fake airdrops are a leading drainer tactic." }
      ],
      sources: [{ t: "FTC: crypto scams", u: "https://consumer.ftc.gov/articles/what-know-about-cryptocurrency-and-scams" }]
    },
    {
      id: "c-rwa", realm: "frontier", title: "Tokenization and Real-World Assets", xp: 40, minutes: 20, lesson: 21,
      brief: "Tokenization puts claims on real assets (Treasuries, funds, invoices, property) onto blockchains. Banks and asset managers are testing it now.",
      steps: [
        "Read the lesson on tokenization and real-world assets (RWA).",
        "Pick one tokenized Treasury or fund product and find who the issuer is and what you legally own.",
        "Write the three questions you'd ask before buying any RWA token: who holds the real asset, what rights do I have, and who can freeze or redeem it?"
      ],
      practice: "This mission is free.",
      protect: "An RWA token is only as good as the legal claim and the custodian behind it.",
      myth: { myth: "If it's tokenized, it's decentralized.", fact: "Most RWA tokens rely on a company, a custodian and the courts." },
      quiz: [
        { q: "The key question for any RWA token is…", options: ["How many followers it has", "Who holds the real asset and what rights you have", "Its logo", "Its ticker length"], answer: 1, explain: "Legal rights and custody are the substance." },
        { q: "Can an RWA issuer usually freeze tokens?", options: ["Never", "Often yes, by design and for compliance", "Only on Sundays", "Only Bitcoin"], answer: 1, explain: "Many RWA and stablecoin contracts include freeze functions." }
      ],
      sources: [{ t: "Praeclaris library: tokenization", u: "../learn/#week-21" }]
    },

    // ---------------- REALM 8: CITADEL ----------------
    {
      id: "c-hardware", realm: "citadel", title: "Raise the Cold Vault", xp: 70, minutes: 60, lesson: 42,
      brief: "For long-term holdings, a hardware wallet keeps your keys offline. This is the step from beginner to serious holder.",
      steps: [
        "Buy a hardware wallet directly from the manufacturer, never used, from a marketplace reseller or as a 'gift'.",
        "Initialize it yourself: it must generate a new seed. Never use a seed that came in the box.",
        "Back up the seed on paper or metal; consider a second copy in a separate secure location.",
        "Do a test send to it, then a recovery drill.",
        "Decide your split: what stays on the exchange for buying, what goes to cold storage."
      ],
      practice: "Practice mode: write your cold-storage plan (device, backup locations, test schedule) before buying anything.",
      protect: "A pre-filled seed card in the box means the device is compromised. Return it.",
      myth: { myth: "Hardware wallets can't be hacked, so I'm done.", fact: "Most losses come from tricked users and bad backups, not broken devices." },
      quiz: [
        { q: "Where should you buy a hardware wallet?", options: ["A used listing", "Directly from the manufacturer", "A stranger online", "Any discount site"], answer: 1, explain: "The supply chain matters." },
        { q: "The device arrives with a seed phrase card already filled in. You:", options: ["Use it", "Treat it as compromised and don't use it", "Photograph it", "Share it with support"], answer: 1, explain: "Legitimate devices generate the seed during setup." }
      ],
      sources: [{ t: "BIP-39 seed phrases", u: "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki" }]
    },
    {
      id: "c-privacy", realm: "citadel", title: "Go Quiet: Privacy and Identity", xp: 50, minutes: 40, lesson: 43,
      brief: "People who talk about their crypto become targets, online and in person. Privacy is a security layer.",
      steps: [
        "Never post balances, wallet addresses tied to your name, or screenshots of holdings.",
        "Use a separate email for financial accounts and remove your phone number from public profiles.",
        "Request removal from people-search sites that list your address.",
        "Review app permissions and turn off location tagging on posts."
      ],
      practice: "Free. Start with one people-search removal today.",
      protect: "Don't link your public identity to a wallet address you use to hold savings.",
      myth: { myth: "Nobody cares about my small balance.", fact: "Attackers automate. Small and visible is still a target." },
      quiz: [
        { q: "Which is safe to share publicly?", options: ["A portfolio screenshot", "Your wallet address linked to your name", "General lessons you've learned", "Your exchange email"], answer: 2, explain: "Share knowledge, not holdings." },
        { q: "Why remove yourself from people-search sites?", options: ["Better credit", "They expose your home address to anyone", "Lower taxes", "Faster internet"], answer: 1, explain: "Online exposure can become physical risk." }
      ],
      sources: [{ t: "CISA: Secure Our World", u: "https://www.cisa.gov/secure-our-world" }]
    },
    {
      id: "c-failures", realm: "citadel", title: "Learn From the Fallen", xp: 50, minutes: 30, lesson: 44,
      brief: "Mt. Gox (2014), Celsius (2022), FTX (2022) and the $1.5 billion Bybit theft (2025) each teach a lesson. The pattern: counterparty risk, opacity and concentration.",
      steps: [
        "Read the lesson on these failures.",
        "For each one, write one sentence: what failed, and what rule would have protected a customer.",
        "Check your own setup against those rules: how much sits on any single platform?"
      ],
      practice: "This mission is free.",
      protect: "Spread counterparty risk. No single platform should hold more than you could stand to lose.",
      myth: { myth: "It can't happen to a regulated or famous company.", fact: "Several failures were famous, well-funded and widely trusted until the day they weren't." },
      quiz: [
        { q: "The common thread in Mt. Gox, Celsius and FTX was…", options: ["Too much self-custody", "Customers trusting a platform with their assets", "Using hardware wallets", "Low fees"], answer: 1, explain: "Counterparty risk." },
        { q: "The FBI attributed the February 2025 Bybit theft to…", options: ["An insider", "North Korea", "A bug in Bitcoin", "No one"], answer: 1, explain: "The FBI attributed the $1.5B theft to North Korean actors." }
      ],
      sources: [{ t: "FBI PSA on the Bybit theft", u: "https://www.ic3.gov/PSA/2025/PSA250226" }, { t: "DOJ: Bankman-Fried sentencing", u: "https://www.justice.gov/usao-sdny/pr/samuel-bankman-fried-sentenced-25-years-his-orchestration-multiple-fraudulent-schemes" }]
    },
    {
      id: "c-legacy", realm: "citadel", title: "The Legacy Letter", xp: 60, minutes: 45, lesson: 47,
      brief: "If something happened to you tomorrow, could your family find and access your crypto without exposing it to anyone else? Most can't.",
      steps: [
        "Write a 'legacy letter' that lists where assets are (platforms and wallet types), not the seed phrases themselves.",
        "Decide how a trusted person would get the backups: sealed envelope, safe deposit box, or an attorney-held instruction.",
        "Ask an estate attorney how to include digital assets in your will or trust.",
        "Review it once a year with your recovery drill."
      ],
      practice: "Practice mode: write the letter outline with placeholders, without any real details.",
      protect: "Never email a seed phrase to family. Separate the map (letter) from the keys (backups).",
      myth: { myth: "My family will figure it out.", fact: "Without instructions, self-custodied crypto can be lost forever." },
      quiz: [
        { q: "What belongs in a legacy letter?", options: ["Seed phrases", "Where assets are and how to reach the backups", "Your passwords", "Your account balances"], answer: 1, explain: "The letter is a map; the backups are stored separately." },
        { q: "Who should help formalize digital assets in an estate plan?", options: ["A social media friend", "A licensed estate attorney", "An exchange support agent", "Nobody"], answer: 1, explain: "Estate law varies by state." }
      ],
      sources: [{ t: "Praeclaris library: estate and legacy", u: "../learn/#week-47" }]
    },
    {
      id: "c-drill", realm: "citadel", title: "The Family Security Drill", xp: 50, minutes: 45, lesson: 49,
      brief: "Your security is only as strong as the least-protected person in your household. Run a 45-minute drill together.",
      steps: [
        "Agree on a family 'code word' for verifying urgent money requests, which defeats voice-clone scams.",
        "Help each person turn on app-based MFA for their email.",
        "Walk through the six scam red flags together.",
        "Agree: nobody sends money or crypto because of a call, text or DM without a second check."
      ],
      practice: "Free. Schedule it for a family dinner.",
      protect: "AI voice cloning makes 'it sounded just like them' unreliable. The code word is the check.",
      myth: { myth: "My family isn't into crypto, so they're not at risk.", fact: "Scammers target the family members of crypto holders, and everyone with a bank account." },
      quiz: [
        { q: "What defeats a voice-clone 'emergency' call?", options: ["Calling back on the same number", "A pre-agreed family code word", "Sending a small amount first", "Asking their birthday"], answer: 1, explain: "Birthdays are public; a code word isn't." },
        { q: "The rule for urgent money requests:", options: ["Act fast", "Verify through a second channel first", "Use crypto ATMs", "Pay with gift cards"], answer: 1, explain: "Urgency is the scammer's main tool." }
      ],
      sources: [{ t: "FTC: crypto scams", u: "https://consumer.ftc.gov/articles/what-know-about-cryptocurrency-and-scams" }]
    },
    {
      id: "c-manual", realm: "citadel", title: "Final Trial: Your Crypto Operating Manual", xp: 100, minutes: 60, lesson: 26, boss: true,
      brief: "The final trial: turn everything into a written system you can run for years. This is what separates a sovereign architect from a speculator.",
      steps: [
        "Collect 'My Crypto Rules' into one document: position size, DCA schedule, bear-market rule, custody split, platforms used.",
        "Add a risk register: top 5 risks (platform failure, theft, lost backup, tax mistake, emotional selling) and your control for each.",
        "Add your rebalance and review rhythm: monthly records day, quarterly review, annual recovery drill and legacy update.",
        "Write when you would take profit or change course, decided now, before prices move.",
        "Sign and date it. Review it every quarter."
      ],
      practice: "This mission is free.",
      protect: "The manual stays private. Share the method, never the numbers.",
      myth: { myth: "Serious investors trade on instinct.", fact: "Serious operators run written systems. Instinct is what the system protects you from." },
      quiz: [
        { q: "When should you decide your profit-taking rules?", options: ["At the top of the bull market", "Now, in writing, before prices move", "Never", "When social media says so"], answer: 1, explain: "Decisions made calmly beat decisions made in euphoria." },
        { q: "Which of these belongs in a risk register?", options: ["Your seed phrase", "Each risk and the control that reduces it", "Price predictions", "Influencer picks"], answer: 1, explain: "A risk register pairs each risk with a control." },
        { q: "The Praeclaris principle for crypto is…", options: ["Protect capital first, grow capital second", "Maximum leverage", "Follow the crowd", "All in on one coin"], answer: 0, explain: "Custody, records and sizing come before returns." }
      ],
      sources: [{ t: "Praeclaris library: your risk register", u: "../learn/#week-26" }]
    }
  ]
};
