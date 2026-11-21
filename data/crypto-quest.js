// Praeclaris Crypto Quest: "Keys to the Kingdom"
// Eight realms, beginner to advanced. Each mission is a real-world action with a
// no-money practice option, a "Show me how" walkthrough, a knowledge check and a debrief.
//
// Mission fields (all optional except id, realm, title, xp, minutes, brief, steps):
//   words:   vocabulary terms taught (must match a term in data/crypto-vocab.js)
//   guide:   { t, steps: [{ t, d, screen }] }  step-by-step walkthrough with a mock screen
//   screen:  { kind: "phone"|"browser"|"device", app, url, title, rows: [[label, value, "hi"|"field"|"warn"]], seed: [...], btn, note }
//   example: [{ t, p, head, rows, out }]  worked example with real numbers
//   diagram: "chain" | "moneymap" | "custody" | "taxflow"
//   sheets:  Praeclaris cheat-sheet ids from data/crypto-guides.js
//   img:     { src, alt } image in assets/guides/
//   wb:      the matching page in the downloadable workbook
// Each quiz "answer" is the 0-based position of the correct option.
// Sources are public pages. Exchange and wallet names are examples to research, not recommendations.

window.QUEST_CRYPTO = {
  id: "crypto",
  title: "Keys to the Kingdom",
  subtitle: "The Praeclaris Crypto Quest",
  intro: "Eight realms take you from your very first question about crypto to running your own secure, well-documented crypto system. Every mission shows you exactly how, with step-by-step walkthroughs, example screens, real numbers and the words you need. You never need to spend money to progress: every mission that involves money has a free practice option.",
  promise: "This quest never asks for your seed phrase, passwords, account numbers or balances. Progress is saved only in this browser.",
  workbook: "../assets/downloads/Praeclaris-Crypto-Quest-Workbook.pdf",
  logTemplate: "../assets/downloads/Praeclaris-Crypto-Transaction-Log.xlsx",
  guideName: "Clara",
  ranks: [
    { name: "Newcomer", at: 0 },
    { name: "System Starter", at: 0.15 },
    { name: "System Operator", at: 0.4 },
    { name: "System Builder", at: 0.65 },
    { name: "Sovereign Architect", at: 0.9 }
  ],
  realms: [
    { id: "foundation", name: "The Foundation Grounds", tagline: "Build the house before you buy the furniture.", badge: "Foundation Laid", level: "Beginner",
      story: "Welcome, traveler. Before anyone enters the crypto kingdom, they build a solid base: know your cash flow, protect your emergency money and decide how much you're willing to risk. Nobody skips this realm and wins long term." },
    { id: "library", name: "The Ledger Library", tagline: "Understand what you're holding.", badge: "Scholar of the Ledger", level: "Beginner",
      story: "The Library holds the secrets of the shared notebook. Here you'll learn how blockchains work, what Bitcoin's rules are, how to size up a coin and how to read the public ledger yourself. You'll also start your Vocab Vault: the words that make the rest of the quest easy." },
    { id: "watchtower", name: "The Watchtower", tagline: "Protect yourself before you buy anything.", badge: "Watch Keeper", level: "Beginner",
      story: "From the Watchtower you can see every trick thieves use. Lock your email, shield your phone number, freeze your credit and learn the six scam red flags. These free habits stop most crypto losses before they start." },
    { id: "exchange", name: "The Exchange Gate", tagline: "Enter the market the safe way.", badge: "Gate Passed", level: "Intermediate",
      story: "The Gate is where dollars become crypto and crypto becomes dollars again. You'll choose an exchange with a checklist, open and fortify an account step by step, read an order ticket, make a tiny first buy, set up DCA and practice cashing out." },
    { id: "keep", name: "The Key Keep", tagline: "Not your keys, not your coins.", badge: "Keeper of Keys", level: "Intermediate",
      story: "In the Keep you'll take control of your own keys. Choose a wallet, create it, receive free practice crypto on a testnet, make a test send and prove you can recover everything from your seed phrase." },
    { id: "records", name: "The Records Hall", tagline: "If it isn't written down, it didn't happen.", badge: "Master of Records", level: "Intermediate",
      story: "Every coin leaves a trail, and the tax collector reads it. The Records Hall teaches you to keep a clean log, spot taxable events, do cost-basis math, handle income from staking and airdrops, and get from your log to the tax forms." },
    { id: "frontier", name: "The DeFi Frontier", tagline: "Smart contracts, stablecoins and where people get hurt.", badge: "Frontier Scout", level: "Advanced",
      story: "Beyond the walls lies decentralized finance: swaps without companies, staking, layer 2s and tokenized real-world assets. The Frontier rewards scouts who move slowly, practice on testnets and read every signature." },
    { id: "citadel", name: "The Sovereign Citadel", tagline: "Run it like an institution. Pass it on like an heirloom.", badge: "Sovereign Architect", level: "Advanced",
      story: "The Citadel is your finished system: cold storage, privacy, lessons from fallen giants, a maintenance rhythm, a legacy plan for your family, and finally your own written Crypto Operating Manual." }
  ],
  missions: [
    // ---------------- REALM 1: FOUNDATION ----------------
    {
      id: "c-why", realm: "foundation", title: "What Is Crypto, Really?", xp: 30, minutes: 15, lesson: 5, wb: "Realm 1 · What crypto is",
      brief: "Cryptocurrency is digital money that runs on a blockchain: a shared record kept by thousands of computers instead of one bank. That design gives it real strengths (it's global, open 24/7 and you can hold it yourself) and real dangers (prices swing hard and mistakes can't be reversed). Knowing both sides is your first step.",
      words: ["Cryptocurrency", "Blockchain", "Fiat", "Decentralization", "Volatility"],
      img: { src: "phone-world.jpg", alt: "A phone sending one dollar across the world" },
      example: [{
        t: "Example: how a price move changes your money",
        p: "Jordan buys $1,000 of bitcoin when 1 BTC costs $50,000. Jordan now owns 0.02 BTC ($1,000 ÷ $50,000). Here's what that 0.02 BTC is worth if the price moves:",
        head: ["Bitcoin price later", "Value of 0.02 BTC", "Gain or loss"],
        rows: [["$75,000", "$1,500", "+$500 (+50%)"], ["$50,000", "$1,000", "$0"], ["$20,000", "$400", "−$600 (−60%)"]],
        out: "Both directions are normal in crypto. That's why the quest makes you decide how much you can afford to lose before you buy anything."
      }],
      steps: [
        "Read the briefing and the example above.",
        "Write two strengths of crypto (for example: send money worldwide in minutes, hold it yourself, markets open 24/7).",
        "Write two dangers (for example: prices can fall 75%+, transactions can't be reversed, scams are common).",
        "Write one sentence answering: 'Why am I learning about crypto?' Keep it on page 1 of your workbook."
      ],
      practice: "This mission is free.",
      protect: "Anyone who only talks about the upside is selling something. Real education shows both sides.",
      myth: { myth: "Crypto is just for criminals and gamblers.", fact: "Public blockchains are transparent and traceable, and regulated U.S. companies, ETFs and banks now use them. Gambling-style trading exists, but it's a choice, not the technology." },
      quiz: [
        { q: "What is a blockchain?", options: ["A bank's private database", "A shared record copied across many computers", "A type of credit card", "A government website"], answer: 1, explain: "Thousands of independent copies make it hard to secretly change." },
        { q: "You buy $1,000 of BTC at $50,000 per coin. How much BTC do you get (before fees)?", options: ["0.2 BTC", "0.02 BTC", "2 BTC", "0.002 BTC"], answer: 1, explain: "$1,000 ÷ $50,000 = 0.02 BTC." },
        { q: "Which is a real risk of crypto?", options: ["Transactions can't be reversed", "It only works on weekdays", "You must buy a whole coin", "It can't be sent overseas"], answer: 0, explain: "There's no 'undo' button, which is why test sends and checklists matter." }
      ],
      sources: [{ t: "Bitcoin white paper (Nakamoto, 2008)", u: "https://bitcoin.org/bitcoin.pdf" }, { t: "Investor.gov: crypto assets", u: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/crypto-assets" }]
    },
    {
      id: "c-cashflow", realm: "foundation", title: "Map Your Cash Flow", xp: 40, minutes: 30, lesson: 3, wb: "Realm 1 · Cash-flow map",
      brief: "Before you invest in anything, you need to know what comes in and what goes out each month. Positive cash flow is what gives you options.",
      words: ["Fiat"],
      example: [{
        t: "Example: Maya's monthly cash-flow map",
        head: ["Bucket", "Monthly amount"],
        rows: [["Income (after tax)", "$3,800"], ["Needs (rent, food, transport, utilities)", "−$2,450"], ["Wants (eating out, streaming, shopping)", "−$520"], ["Debt payments", "−$380"], ["Savings", "−$150"], ["Cash flow left over", "+$300"]],
        out: "Maya trims $80 of wants, so $380 a month is truly spare. Only part of that will ever go to crypto, and only after the emergency fund is started."
      }],
      steps: [
        "List every source of income from last month.",
        "Pull the last 30 to 60 days of bank and card statements.",
        "Sort spending into four buckets: needs, wants, debt payments and savings.",
        "Subtract spending from income. That number is your monthly cash flow.",
        "Circle two categories you could trim without hurting your life."
      ],
      practice: "No statements handy? Estimate last month from memory in the workbook's cash-flow table. Rough numbers still show you the shape.",
      protect: "Keep this map offline or in a private file. Never post real numbers.",
      myth: { myth: "I'll start investing once I earn more.", fact: "Cash flow, not income, creates options. People with high incomes and negative cash flow stay stuck." },
      quiz: [
        { q: "What is monthly cash flow?", options: ["Your salary before taxes", "Income minus spending for the month", "The balance in your checking account", "What you invested this month"], answer: 1, explain: "Cash flow is money in minus money out over a period. Your balance is a snapshot; cash flow is the direction you're moving." },
        { q: "Why map cash flow before buying crypto?", options: ["Exchanges require it", "So you only invest money you won't need for bills", "It lowers fees", "It's required for taxes"], answer: 1, explain: "Crypto is volatile. Money you need for rent should never be in it. The map tells you what is truly spare." }
      ],
      sources: [{ t: "CFPB budgeting and debt tools", u: "https://www.consumerfinance.gov/consumer-tools/" }]
    },
    {
      id: "c-emergency", realm: "foundation", title: "Build the Moat: Emergency Fund", xp: 40, minutes: 20, lesson: 16, wb: "Realm 1 · Emergency fund",
      brief: "An emergency fund is protection, not an investment. It means a car repair never forces you to sell crypto at the bottom.",
      example: [{
        t: "Example: building a $1,000 starter fund",
        p: "Maya sets an automatic transfer of $100 every payday (twice a month) into a separate high-yield savings account.",
        head: ["Month", "Saved so far"], rows: [["1", "$200"], ["2", "$400"], ["3", "$600"], ["5", "$1,000 ✓"]],
        out: "In five months the moat is built. Only then does any cash flow go toward crypto."
      }],
      steps: [
        "Pick a starter target: $500 to $1,000, or one month of needs.",
        "Open or choose a separate savings account, not your checking account.",
        "Set an automatic transfer every payday, even if it's small.",
        "Write the rule: this money is only for real emergencies, never for buying dips."
      ],
      practice: "Can't fund it yet? Write the target and the transfer amount in the workbook, and set a calendar reminder for payday.",
      protect: "Keep the emergency fund in a federally insured account. It should be boring and instantly available.",
      myth: { myth: "Crypto can be my emergency fund.", fact: "Emergencies often arrive during market drops. An emergency fund must be stable when you need it." },
      quiz: [
        { q: "Where should an emergency fund live?", options: ["In Bitcoin", "In a stablecoin earning yield", "In an insured, separate savings account", "In a brokerage account"], answer: 2, explain: "Stability and access come first. Insured savings is boring by design." },
        { q: "The Federal Reserve's 2025 survey found what share of adults would cover a $400 expense with cash or its equivalent?", options: ["About 20%", "About 63%", "About 90%", "About 40%"], answer: 1, explain: "About 63%, so more than a third could not. The emergency fund is the first layer of sovereignty." }
      ],
      sources: [{ t: "Federal Reserve SHED report", u: "https://www.federalreserve.gov/consumerscommunities/shed.htm" }]
    },
    {
      id: "c-slice", realm: "foundation", title: "Decide Your Crypto Slice", xp: 50, minutes: 20, lesson: 19, wb: "Realm 1 · My Crypto Rules",
      brief: "Position sizing is the most important decision in crypto. Decide how much before you decide what.",
      words: ["Volatility", "Bear market"],
      example: [{
        t: "Example: turning a feeling into a rule",
        p: "Maya has $380/month spare and a funded emergency fund. She asks: 'If crypto fell 75%, how much could I lose without it changing my life?' Her answer: $1,500.",
        head: ["Decision", "Maya's rule"],
        rows: [["Most I'd put in over the next year", "$1,200 (so a 75% drop costs $900, under her $1,500 limit)"], ["Monthly amount", "$100 a month from cash flow, never from savings or credit"], ["Core vs. explore", "At least 70% in BTC/ETH; up to 30% in smaller coins I've researched"], ["Never", "Borrowed money, leverage, or money for bills"]],
        out: "She writes these four lines at the top of 'My Crypto Rules' in her workbook."
      }],
      steps: [
        "Write the most you could lose without changing your life. Assume crypto can fall 75% or more; it has, more than once.",
        "Turn that into a rule, for example: no more than X% of my investable money, and only from positive cash flow.",
        "Decide your core vs. explore split (for example 70% BTC/ETH, 30% everything else).",
        "Write it at the top of 'My Crypto Rules' in your workbook. You'll add to it all quest long."
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
      id: "c-notebook", realm: "library", title: "The Shared Notebook", xp: 30, minutes: 15, lesson: 5, wb: "Realm 2 · How a blockchain works",
      brief: "A blockchain is a shared notebook that thousands of computers keep identical copies of. Each page (block) holds a batch of transactions and the fingerprint (hash) of the page before it, so nobody can secretly erase a page.",
      words: ["Block", "Hash", "Node", "Consensus mechanism", "Proof of work", "Proof of stake"],
      diagram: "chain",
      guide: { t: "How one transaction gets onto the blockchain", steps: [
        { t: "1. You send", d: "Your wallet creates a transaction and signs it with your private key, like signing a check only you can sign." },
        { t: "2. It waits in the mempool", d: "The transaction is broadcast to the network and waits with others to be picked up." },
        { t: "3. Nodes check it", d: "Computers (nodes) confirm your signature is valid and you actually have the funds." },
        { t: "4. A block is made", d: "A miner (proof of work) or validator (proof of stake) bundles it into a new block." },
        { t: "5. Everyone agrees", d: "The network accepts the block by consensus. Your transaction now has 1 confirmation, and each new block adds another." }
      ] },
      steps: [
        "Read the 'Show me how' walkthrough and the diagram.",
        "Explain it out loud to someone (or your phone's recorder) in under 60 seconds using the notebook analogy.",
        "Write one thing a shared notebook is good for and one thing it can't do. For example, it can't tell whether what was written is true."
      ],
      practice: "This mission is free.",
      protect: "'It's on the blockchain' doesn't mean 'it's safe' or 'it's legit'. Scam tokens live on blockchains too.",
      myth: { myth: "Blockchain means anonymous.", fact: "Most blockchains are public. Every transaction is visible forever; only the names are missing." },
      quiz: [
        { q: "What makes a public blockchain hard to change?", options: ["A company guards it", "Thousands of independent copies must agree", "It's encrypted with a password", "Governments approve each block"], answer: 1, explain: "Changing history would mean overpowering the majority of independent participants." },
        { q: "What links each block to the one before it?", options: ["A password", "The previous block's hash", "An email", "A bank account number"], answer: 1, explain: "Change an old block and its hash changes, breaking every link after it." },
        { q: "Ethereum's validators lock up coins as collateral. That's called…", options: ["Proof of work", "Proof of stake", "Mining", "A fork"], answer: 1, explain: "Proof of stake: cheating risks the validator's stake." }
      ],
      sources: [{ t: "Bitcoin white paper (Nakamoto, 2008)", u: "https://bitcoin.org/bitcoin.pdf" }, { t: "ethereum.org: proof of stake", u: "https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/" }]
    },
    {
      id: "c-bitcoin", realm: "library", title: "21 Million and the Halving", xp: 30, minutes: 20, lesson: 6, wb: "Realm 2 · Bitcoin's rules",
      brief: "Bitcoin's rules are fixed and public: about one block every 10 minutes, a supply capped at 21 million, and new issuance cut in half every 210,000 blocks (about every four years).",
      words: ["Bitcoin", "Satoshi", "Halving", "Block reward", "Block time", "Genesis block"],
      example: [{
        t: "Example: you don't need a whole bitcoin",
        p: "1 BTC = 100,000,000 satoshis (sats). If 1 BTC costs $90,000:",
        head: ["You spend", "You get (BTC)", "You get (sats)"],
        rows: [["$10", "0.00011111", "11,111 sats"], ["$25", "0.00027778", "27,778 sats"], ["$100", "0.00111111", "111,111 sats"]],
        out: "Small, regular amounts are completely normal. Fees will shave a little off each one."
      }, {
        t: "The halving schedule",
        head: ["Year", "New BTC per block"],
        rows: [["2009 (genesis)", "50"], ["2012", "25"], ["2016", "12.5"], ["2020", "6.25"], ["2024", "3.125"], ["~2028 (estimated)", "1.5625"]]
      }],
      steps: [
        "Write the three rules in your own words: block time, supply cap, halving.",
        "Work out how many sats $20 buys at today's price (price ÷ 100,000,000 = price per sat).",
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
      id: "c-types", realm: "library", title: "Coins, Tokens and Stablecoins", xp: 30, minutes: 20, lesson: 12, wb: "Realm 2 · The crypto zoo",
      brief: "Not all crypto is the same thing. Coins run their own networks, tokens live on someone else's network, and stablecoins try to hold a steady price, usually $1. Beyond those, you'll meet platform coins, utility tokens, privacy coins, NFTs and government CBDCs.",
      words: ["Coin", "Token", "Altcoin", "Stablecoin", "NFT", "CBDC", "Privacy coin", "ISO 20022"],
      example: [{
        t: "The crypto zoo at a glance",
        head: ["Type", "What it is", "Examples"],
        rows: [
          ["Bitcoin", "The first coin; 'digital gold', fixed supply", "BTC"],
          ["Platform coins", "Run networks where apps and tokens live", "ETH, SOL, ADA, DOT"],
          ["Payment-focused coins", "Built for fast, cheap transfers", "XRP, XLM, LTC"],
          ["Stablecoins", "Aim to stay at $1, backed by reserves", "USDC, USDT"],
          ["Utility tokens", "Do a job inside one project", "LINK (data oracles), FIL (storage)"],
          ["Privacy coins", "Hide amounts and addresses", "XMR, ZEC"],
          ["NFTs", "One-of-a-kind tokens for items or access", "Art, tickets, memberships"],
          ["CBDCs", "Central-bank digital money (not crypto)", "China's e-CNY"]
        ]
      }],
      steps: [
        "Sort these into coin, token or stablecoin: BTC, ETH, USDC, a meme token on Solana. (Answers: coin, coin, stablecoin, token.)",
        "Write one sentence on what backs a fiat-backed stablecoin (cash and short-term government debt held in reserve).",
        "Note one risk of each type.",
        "Read the 'ISO 20022 coins' note in the Field Guide and write, in one line, why it's a marketing label rather than a certification."
      ],
      practice: "This mission is free.",
      protect: "'ISO 20022 coin' is a marketing label. ISO 20022 is a messaging standard; ISO doesn't certify cryptocurrencies.",
      myth: { myth: "Every stablecoin is equally safe.", fact: "Safety depends on reserves, audits, redemption rights and regulation. Algorithmic stablecoins have collapsed before." },
      quiz: [
        { q: "What is a stablecoin designed to do?", options: ["Double every cycle", "Hold a steady value, usually $1", "Pay mining rewards", "Replace Bitcoin"], answer: 1, explain: "Stablecoins aim for a steady peg. How well they hold it depends on what backs them." },
        { q: "A token is…", options: ["A coin with its own blockchain", "An asset built on another blockchain", "Always a stablecoin", "A hardware wallet"], answer: 1, explain: "USDC lives on Ethereum and other chains; it doesn't have its own." },
        { q: "Does ISO certify cryptocurrencies as 'ISO 20022 compliant'?", options: ["Yes", "No, ISO 20022 is a messaging standard", "Only XRP", "Only stablecoins"], answer: 1, explain: "ISO 20022 standardizes financial messages. It isn't a seal of approval on any coin." }
      ],
      sources: [{ t: "ISO 20022 FAQ", u: "https://www.iso20022.org/faq" }, { t: "OCC: GENIUS Act rule", u: "https://www.occ.gov/news-issuances/news-releases/2026/nr-occ-2026-92.html" }]
    },
    {
      id: "c-marketcap", realm: "library", title: "Size Up a Coin Like a Pro", xp: 40, minutes: 25, lesson: 13, wb: "Realm 2 · Coin research card",
      brief: "A coin's price alone tells you almost nothing. Market cap, volume, supply and tokenomics tell you how big it is, how easy it is to buy and sell, and who might sell next. You'll learn to read a coin's page on a price tracker in five minutes.",
      words: ["Market cap", "Volume", "Liquidity", "Tokenomics", "Whale", "Whitepaper"],
      guide: { t: "Reading a coin page (CoinGecko or CoinMarketCap)", steps: [
        { t: "Find the price and market cap", d: "Market cap = price × circulating supply. It's the coin's size. Bigger usually means more established and less easy to manipulate.",
          screen: { kind: "browser", url: "coingecko.com/en/coins/example", title: "ExampleCoin (EXC)", rows: [["Price", "$2.00"], ["Market cap", "$2,000,000,000", "hi"], ["24h volume", "$150,000,000"], ["Circulating supply", "1,000,000,000 EXC"], ["Max supply", "5,000,000,000 EXC", "warn"]], note: "Only 20% of the max supply is circulating: more coins will be released later." } },
        { t: "Check 24-hour volume", d: "Volume shows how actively it trades. Low volume means poor liquidity: selling even a modest amount can push the price down." },
        { t: "Compare circulating vs. max supply", d: "If most of the supply isn't circulating yet, future unlocks can add selling pressure. That's tokenomics." },
        { t: "Look at the top holders", d: "On the coin's block explorer, see how much the top 10 wallets hold. If a few whales own most of it, they control the price." },
        { t: "Skim the whitepaper and website", d: "What problem does it solve? Who is the team? Is the code public? Are there audits?" }
      ] },
      example: [{
        t: "Example: same price, very different coins",
        head: ["", "Coin A", "Coin B"],
        rows: [["Price", "$1.00", "$1.00"], ["Circulating supply", "50 billion", "20 million"], ["Market cap", "$50 billion", "$20 million"], ["24h volume", "$2 billion", "$40,000"], ["Top 10 wallets hold", "18%", "71%"]],
        out: "Both cost $1, but Coin B is tiny, hard to sell and controlled by a few whales. 'It's only a dollar' doesn't make a coin cheap."
      }],
      steps: [
        "Open CoinGecko or CoinMarketCap (type the address yourself).",
        "Pick BTC and one smaller coin you've heard about.",
        "For each, write: price, market cap, 24h volume, circulating vs. max supply.",
        "Fill in the 'Coin research card' in your workbook for the smaller coin, including one red flag if you find one."
      ],
      practice: "This mission is free and uses public data.",
      protect: "Price trackers are read-only. If one asks you to connect a wallet to 'see rewards', close the tab.",
      myth: { myth: "A $0.001 coin can easily go to $1.", fact: "Multiply by the supply. A 1,000× rise often needs a market cap bigger than the world's largest companies." },
      quiz: [
        { q: "Market cap equals…", options: ["Price × circulating supply", "Price × 24h volume", "Total coins ever mined", "The all-time-high price"], answer: 0, explain: "It's the total value of the coins in circulation." },
        { q: "A coin has very low 24h volume. What's the risk?", options: ["It's too stable", "Selling may push the price down sharply (low liquidity)", "Fees are higher on weekends", "None"], answer: 1, explain: "Thin markets are easy to move and hard to exit." },
        { q: "Only 15% of a token's max supply is circulating. Why does that matter?", options: ["It doesn't", "Future unlocks can add selling pressure", "It guarantees the price rises", "It means it's a stablecoin"], answer: 1, explain: "That's tokenomics: know who holds the rest and when they can sell." }
      ],
      sources: [{ t: "CoinGecko methodology", u: "https://www.coingecko.com/en/methodology" }, { t: "Investor.gov: crypto assets", u: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/crypto-assets" }]
    },
    {
      id: "c-explorer", realm: "library", title: "Read the Public Ledger", xp: 40, minutes: 15, lesson: 5, wb: "Realm 2 · Explorer scavenger hunt",
      brief: "Seeing is believing. A block explorer lets anyone read the blockchain. You'll look at real Bitcoin blocks without buying anything.",
      words: ["Block explorer", "Block height", "Mempool", "Confirmation", "Transaction ID"],
      guide: { t: "A tour of mempool.space", steps: [
        { t: "Open the explorer", d: "Type mempool.space into your browser. The top shows upcoming blocks (left, still in the mempool) and recent blocks (right, already confirmed).",
          screen: { kind: "browser", url: "mempool.space", title: "Latest blocks", rows: [["Block height", "#9xx,xxx", "hi"], ["Transactions", "3,412"], ["Mined", "6 minutes ago"], ["Median fee", "4 sat/vB"]], note: "Numbers here are illustrations; yours will be live." } },
        { t: "Click the newest block", d: "You'll see its height (page number), size, number of transactions and the fees paid." },
        { t: "Open any transaction", d: "Inputs (where coins came from) are on the left, outputs (where they went) on the right, and the fee is the difference.",
          screen: { kind: "browser", url: "mempool.space/tx/…", title: "Transaction", rows: [["Transaction ID", "4f2a…9c1e"], ["Inputs", "0.0521 BTC"], ["Outputs", "0.0500 + 0.0019 BTC"], ["Fee", "0.0002 BTC", "hi"], ["Status", "Confirmed · 3 confirmations"]] } },
        { t: "Watch a block arrive", d: "Leave the page open a few minutes. A new block slides in and every transaction in it gets its first confirmation." }
      ] },
      steps: [
        "Open mempool.space (a public Bitcoin block explorer).",
        "Find the most recent block: note its height, the number of transactions and the time.",
        "Click any transaction and find its inputs, outputs and fee.",
        "Write down how long it's been since the previous block, then fill in the explorer scavenger hunt in your workbook."
      ],
      practice: "This mission is free and uses only public data.",
      protect: "Explorers are read-only. If a 'block explorer' asks you to connect a wallet or enter a seed phrase, it's a scam.",
      myth: { myth: "Nobody can see crypto transactions.", fact: "You just saw them. That transparency is why privacy habits matter later in the quest." },
      quiz: [
        { q: "Can you read a public blockchain without an account?", options: ["No", "Yes, explorers are public", "Only with a hardware wallet", "Only on an exchange"], answer: 1, explain: "Anyone can read public blockchains." },
        { q: "Transactions waiting to be added to a block are in the…", options: ["Mempool", "Genesis block", "Cold storage", "Spread"], answer: 0, explain: "The mempool is the waiting room." },
        { q: "An 'explorer' asks for your seed phrase. What is it?", options: ["A security check", "A scam", "A normal sign-in", "A software update"], answer: 1, explain: "No legitimate site ever needs your seed phrase." }
      ],
      sources: [{ t: "mempool.space Bitcoin explorer", u: "https://mempool.space/" }]
    },
    {
      id: "c-vocab", realm: "library", title: "Speak the Language", xp: 40, minutes: 20, wb: "Realm 2 · Vocabulary log",
      brief: "Crypto feels confusing mostly because of its words. Learn 20 of them and the rest of the quest gets easy. Your Vocab Vault already holds every word you've met so far; now drill them with flashcards.",
      words: ["HODL", "FOMO", "FUD", "Bull market", "Bear market", "Whale"],
      sheets: ["vocab-1", "vocab-2", "vocab-3", "vocab-4"],
      steps: [
        "Open the Vocab Vault (button below or on the quest map) and read the 'Blockchain basics' words.",
        "Play the flashcard drill until you've marked at least 15 words 'I know it'.",
        "Copy five words you found hardest into the vocabulary log in your workbook, with your own example for each.",
        "Use three new words in a sentence to a friend today."
      ],
      practice: "This mission is free. The Praeclaris vocabulary cheat sheets are here to save or print.",
      protect: "Jargon is a sales tool. If someone can't explain a product in plain words, don't buy it.",
      myth: { myth: "Crypto is too technical for me.", fact: "Most of it is about 50 words. You already know more than you think." },
      quiz: [
        { q: "'HODL' means…", options: ["Sell quickly", "Hold for the long term", "A type of wallet", "Borrow to buy"], answer: 1, explain: "A famous typo of 'hold' that became a motto." },
        { q: "A friend says 'I have to buy now, it's up 40% this week!' That's…", options: ["FOMO", "FUD", "DCA", "A limit order"], answer: 0, explain: "Fear of missing out. Your written rules are the cure." },
        { q: "A 'whale' is…", options: ["A large holder who can move prices", "A scam token", "A cold wallet", "A block reward"], answer: 0, explain: "Whales hold enough to move markets." }
      ],
      sources: [{ t: "Praeclaris Crypto Vocabulary Cheat Sheet", u: "#/vocab" }]
    },

    // ---------------- REALM 3: WATCHTOWER ----------------
    {
      id: "c-masterkeys", realm: "watchtower", title: "Lock the Master Keys", xp: 50, minutes: 40, lesson: 41, wb: "Realm 3 · Security checklist",
      brief: "Your email is the master key: it can reset everything else. Secure it before you open any crypto account.",
      words: ["2FA", "Passkey", "Phishing"],
      sheets: ["safety-top"],
      guide: { t: "Turning on authenticator-app 2FA (works the same almost everywhere)", steps: [
        { t: "Install an authenticator app", d: "Use a well-known one such as Google Authenticator, Microsoft Authenticator, Authy or your password manager's built-in authenticator. Download it from the official app store." },
        { t: "Open your email's security settings", d: "Find '2-Step Verification' or 'Two-factor authentication' and choose 'Authenticator app'.",
          screen: { kind: "browser", url: "myaccount.google.com/security", title: "2-Step Verification", rows: [["Passkeys", "Add a passkey", "hi"], ["Authenticator", "Set up", "hi"], ["Text message (SMS)", "Avoid if you can", "warn"], ["Backup codes", "Get codes"]] } },
        { t: "Scan the QR code", d: "The app adds a 6-digit code that changes every 30 seconds. Type the current code to confirm.",
          screen: { kind: "phone", app: "Authenticator", title: "Your codes", rows: [["Email account", "482 913", "hi"], ["Refreshes in", "17 s"]], note: "Never read these codes to anyone who calls you." } },
        { t: "Save backup codes offline", d: "Print them or write them down and store them with your important papers, not in your email." },
        { t: "Add a passkey if offered", d: "Passkeys use your phone's fingerprint or face unlock and can't be phished. Many email providers and exchanges support them." }
      ] },
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
      id: "c-simswap", realm: "watchtower", title: "Shield Against SIM Swaps", xp: 40, minutes: 15, lesson: 43, wb: "Realm 3 · Security checklist",
      brief: "In a SIM swap, a criminal convinces your carrier to move your number to their phone, then receives your text codes.",
      words: ["SIM swap"],
      steps: [
        "Call your mobile carrier or open its app and set a port-out PIN or number lock (it may be called 'Number Lock', 'Port Out Protection' or 'SIM Protection').",
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
      id: "c-scams", realm: "watchtower", title: "The Scam-Spotting Drill", xp: 50, minutes: 20, lesson: 11, wb: "Realm 3 · Scam red flags",
      brief: "The FBI's 2025 report counted $11.37 billion in crypto losses, with investment fraud the largest share. Learning the patterns is the cheapest insurance there is.",
      words: ["Phishing", "Pig butchering", "Rug pull", "Drainer", "Address poisoning"],
      example: [{
        t: "Spot the red flags in this message",
        p: "\"Hi! 😊 Wrong number, sorry… but you seem nice. My uncle is an analyst at a big fund and I've made $38,000 this month on his trading app, CoinPrimeX. Guaranteed 2% a day! Spots close tonight, so don't tell anyone. Download it here: coinprimex-app.co\"",
        head: ["Red flag", "Where it shows up"],
        rows: [["Stranger starts a friendly chat", "'Wrong number… you seem nice'"], ["Guaranteed returns", "'Guaranteed 2% a day'"], ["Urgency and secrecy", "'Closes tonight, don't tell anyone'"], ["Their own platform", "An app you've never heard of, from a link"], ["Insider story", "'My uncle at a big fund'"]],
        out: "Five red flags in one message: this is the 'pig butchering' pattern. Don't reply, block, and report it at ic3.gov."
      }],
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
      id: "c-freeze", realm: "watchtower", title: "Freeze Your Credit", xp: 30, minutes: 20, lesson: 43, wb: "Realm 3 · Security checklist",
      brief: "Exchanges verify your identity, which means your identity is worth stealing. A credit freeze stops new accounts being opened in your name, and it's free.",
      steps: [
        "Freeze your credit at all three bureaus: Equifax, Experian and TransUnion (each has a free online freeze page).",
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
      id: "c-choose", realm: "exchange", title: "Choose Your Gate", xp: 40, minutes: 30, lesson: 8, wb: "Realm 4 · Exchange scorecard",
      brief: "An exchange (on-ramp) is where most people first turn dollars into crypto, and later turn crypto back into dollars (off-ramp). Pick one with a checklist, not a hype video. The Praeclaris starter picks are Coinbase or Gemini for beginners and Kraken for intermediate users, but your checklist decides.",
      words: ["Exchange", "CEX", "DEX", "On-ramp", "Off-ramp", "KYC", "Proof of reserves"],
      diagram: "moneymap",
      sheets: ["wallets-exchanges", "wallets-starter"],
      example: [{
        t: "Example: a filled-in exchange scorecard",
        head: ["Check", "Exchange A", "Exchange B"],
        rows: [["Licensed in my state", "✓", "✓"], ["Years operating", "12", "3"], ["Proof of reserves published", "✓", "✗"], ["App 2FA / passkey", "✓ / ✓", "✓ / ✗"], ["Withdrawal allowlist", "✓", "✗"], ["Fee on a $25 bank-funded buy", "≈ $1.00 + spread", "'Zero fee', 2% spread"], ["Has my coins (BTC, ETH)", "✓", "✓"], ["Search 'hack / withdrawals paused'", "Nothing major", "Paused withdrawals in 2023"], ["Score", "8/8", "3/8"]],
        out: "Exchange B's 'zero fee' costs about $0.50 per $25 in spread and it fails on transparency. The choice is easy once it's on paper."
      }],
      steps: [
        "Read the exchange tiers and 'What to look for' list in the Field Guide.",
        "Shortlist two or three exchanges that legally serve your state.",
        "Score each one in your workbook: licensed in your state; years operating; proof of reserves; security features (app-based MFA, withdrawal allowlists); clear fee page; your coins; support.",
        "Search '[exchange name] hack', 'lawsuit' and 'withdrawals paused'.",
        "Pick one and write down why."
      ],
      practice: "Research only; nothing to buy yet.",
      protect: "Type the exchange's address yourself or use a bookmark. Ads and search results can point to look-alike phishing sites.",
      myth: { myth: "The biggest exchange is automatically safe.", fact: "FTX was one of the largest exchanges in 2022 before it collapsed. Size isn't safety; custody and transparency matter." },
      quiz: [
        { q: "Which is the strongest signal of a safer U.S. exchange?", options: ["Celebrity ads", "Registration, state licenses and a security track record", "Highest advertised yield", "Most coins listed"], answer: 1, explain: "Regulatory standing and a track record beat marketing." },
        { q: "An 'on-ramp' is…", options: ["A service that turns dollars into crypto", "A hardware wallet", "A type of scam", "A blockchain upgrade"], answer: 0, explain: "On-ramp in, off-ramp out." },
        { q: "How should you reach the exchange's website?", options: ["Click the first search ad", "A bookmark or the address typed yourself", "A link in a DM", "A link in an email"], answer: 1, explain: "Phishing sites buy ads and send look-alike emails." }
      ],
      sources: [{ t: "FinCEN MSB registrant search", u: "https://www.fincen.gov/msb-registrant-search" }, { t: "FTC: crypto scams", u: "https://consumer.ftc.gov/articles/what-know-about-cryptocurrency-and-scams" }]
    },
    {
      id: "c-secureacct", realm: "exchange", title: "Open and Fortify the Account", xp: 50, minutes: 30, lesson: 41, wb: "Realm 4 · Account setup checklist",
      brief: "Opening an exchange account takes about 15 minutes plus ID review. The order matters: lock the account down before any money touches it.",
      words: ["KYC", "2FA", "Allowlist", "Anti-phishing code"],
      guide: { t: "Opening an exchange account, step by step (Coinbase, Kraken, Gemini and others work almost the same)", steps: [
        { t: "1. Go to the real site", d: "Type the address yourself (coinbase.com, kraken.com, gemini.com) or download the app from the official store. Click 'Sign up' or 'Create account'.",
          screen: { kind: "browser", url: "www.example-exchange.com/signup", title: "Create your account", rows: [["Email", "you@yourdomain.com", "field"], ["Password", "•••••••••••••••• (from your password manager)", "field"], ["Country", "United States", "field"]], btn: "Create account" } },
        { t: "2. Verify your email", d: "Click the link in the verification email. Check the sender address carefully: it must be the real domain." },
        { t: "3. Complete identity verification (KYC)", d: "Enter your legal name, date of birth, address and the last 4 or full SSN (required for U.S. tax reporting). Upload a photo of your driver's license or passport and take a selfie.",
          screen: { kind: "phone", app: "Exchange", title: "Verify your identity", rows: [["Step 1", "Personal details ✓"], ["Step 2", "Photo ID: front and back", "hi"], ["Step 3", "Selfie"], ["Review time", "Minutes to 2 days"]], btn: "Take photo of ID" } },
        { t: "4. Turn on strong 2FA", d: "In Settings → Security, add an authenticator app or passkey. Remove SMS as a backup if the exchange allows it.",
          screen: { kind: "phone", app: "Exchange", title: "Security", rows: [["Passkey", "On ✓", "hi"], ["Authenticator app", "On ✓", "hi"], ["SMS", "Off", "warn"], ["Anti-phishing code", "Set ✓"], ["Withdrawal allowlist", "On ✓", "hi"]] } },
        { t: "5. Set the anti-phishing code and allowlist", d: "The code appears in every genuine email. The allowlist means withdrawals can only go to addresses you've pre-approved (new ones usually wait 24–48 hours)." },
        { t: "6. Link your bank", d: "Add a bank account (ACH) as your payment method. It's usually the cheapest way to fund. Avoid credit cards: high fees and you'd be buying with debt." },
        { t: "7. Review devices and sessions", d: "Check that the only logged-in device is yours. You're ready for your first small buy." }
      ] },
      steps: [
        "Sign up with your secured email and a unique password from your password manager.",
        "Complete identity verification only on the official site or app.",
        "Turn on authenticator-app MFA or a passkey; remove SMS if possible.",
        "Turn on a withdrawal address allowlist and an anti-phishing code if offered.",
        "Link your bank account and review active sessions and devices."
      ],
      practice: "Not ready to open an account? Find each of these settings in the exchange's help center and tick them off on the workbook's account setup checklist.",
      protect: "Never let anyone 'help' you set up an account via screen-share or remote-access software.",
      myth: { myth: "Exchanges reimburse every hack.", fact: "Some do; many don't. Losses from phishing your own login are often not covered." },
      quiz: [
        { q: "What does a withdrawal allowlist do?", options: ["Speeds up withdrawals", "Only lets funds go to addresses you pre-approved", "Lowers fees", "Hides your balance"], answer: 1, explain: "Even if someone gets in, they can't send funds to a new address right away." },
        { q: "Why do U.S. exchanges ask for your ID and SSN?", options: ["To sell your data", "KYC and tax-reporting rules require it", "It's optional marketing", "To give you a loan"], answer: 1, explain: "Regulated platforms must verify customers and report to the IRS." },
        { q: "The cheapest common way to fund a U.S. exchange is usually…", options: ["Credit card", "Bank transfer (ACH)", "Gift cards", "Crypto ATM"], answer: 1, explain: "Cards and ATMs carry much higher fees." }
      ],
      sources: [{ t: "CISA: Secure Our World", u: "https://www.cisa.gov/secure-our-world" }]
    },
    {
      id: "c-orders", realm: "exchange", title: "Read the Order Ticket", xp: 40, minutes: 20, lesson: 8, wb: "Realm 4 · Order types",
      brief: "Every buy or sell is an order. A market order fills right now at the best price available; a limit order waits for your price; a stop loss sells automatically if the price drops to a level you choose. Knowing which to use, and what the spread costs you, saves real money.",
      words: ["Trading pair", "Market order", "Limit order", "Stop loss", "Spread", "Slippage", "Liquidity"],
      sheets: ["vocab-trading"],
      guide: { t: "The three orders you'll actually use", steps: [
        { t: "Market order: 'buy it now'", d: "Fills immediately at the best available price. Great for small buys of big coins. In fast or thin markets you can get slippage.",
          screen: { kind: "phone", app: "Exchange · Advanced", title: "BTC/USD · Market", rows: [["Side", "Buy"], ["Order type", "Market", "hi"], ["Amount", "$50.00", "field"], ["Est. price", "≈ $90,050"], ["Fee (0.6%)", "$0.30"]], btn: "Buy BTC" } },
        { t: "Limit order: 'only at my price'", d: "You set the price. It fills only if the market reaches it, so it might never fill. Often cheaper fees ('maker' fees) on advanced screens.",
          screen: { kind: "phone", app: "Exchange · Advanced", title: "ETH/USD · Limit", rows: [["Side", "Buy"], ["Order type", "Limit", "hi"], ["Limit price", "$3,000.00", "field"], ["Amount", "0.01 ETH", "field"], ["Status", "Open until filled or cancelled"]], btn: "Place limit order" } },
        { t: "Stop loss: 'get me out if it falls'", d: "Sells automatically if the price falls to your level. A risk tool for active traders. Long-term DCA buyers usually don't need it." },
        { t: "Read the pair", d: "BTC/USD means bitcoin priced in dollars. ETH/BTC means ether priced in bitcoin. The first asset is the one you're buying or selling." }
      ] },
      example: [{
        t: "Example: what a 'zero-fee' buy really costs",
        p: "The live market price is $100.00 per coin. The app's simple 'Buy' screen quotes you $101.00 with 'no fee'.",
        head: ["", "Simple buy screen", "Advanced (limit) screen"],
        rows: [["Price paid per coin", "$101.00 (spread +1%)", "$100.00"], ["Fee", "$0", "0.4% = $0.40"], ["Cost of a $100 order", "≈ $1.00", "$0.40"]],
        out: "The spread is a hidden fee. Compare the price you're quoted with the market price before you click."
      }],
      steps: [
        "Open your exchange's advanced or 'Pro' trading screen (or its help page) and find the market, limit and stop order types.",
        "Find the fee schedule and write the fee for a $100 market order.",
        "Compare the simple 'Buy' screen's quoted price with the live market price and estimate the spread.",
        "Fill in the order-types page in your workbook."
      ],
      practice: "Practice mode: on paper, write a limit order 5% below today's BTC price and check over the next week whether it would have filled.",
      protect: "Avoid leverage and 'margin' toggles. They can wipe out a position on a single bad day.",
      myth: { myth: "Market orders always get the price on the screen.", fact: "In fast or thin markets the fill can differ. That gap is slippage." },
      quiz: [
        { q: "You want to buy only if ETH drops to $3,000. Which order?", options: ["Market order", "Limit order", "Stop loss", "Leverage"], answer: 1, explain: "A limit order waits for your price." },
        { q: "What does ETH/BTC mean?", options: ["Ether priced in bitcoin", "Bitcoin priced in dollars", "A stablecoin", "A wallet type"], answer: 0, explain: "The first asset is priced in the second." },
        { q: "The gap between buy and sell prices is the…", options: ["Spread", "Gas", "Halving", "Nonce"], answer: 0, explain: "The spread is a trading cost even when the fee says $0." }
      ],
      sources: [{ t: "Investor.gov: types of orders", u: "https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders" }]
    },
    {
      id: "c-firstbuy", realm: "exchange", title: "Your First Small Buy", xp: 50, minutes: 20, lesson: 8, wb: "Realm 4 · First buy record",
      brief: "Your first purchase is a lesson, not an investment. Use an amount you'd be fine losing entirely, like $10 to $25, and treat every screen as practice for the bigger decisions later.",
      words: ["Fiat", "Spread", "Cost basis"],
      sheets: ["wallets-setup"],
      guide: { t: "Making a $25 buy, screen by screen", steps: [
        { t: "1. Deposit dollars", d: "Tap 'Deposit' or 'Add cash', choose your linked bank, enter $25. ACH can take 1–5 business days to fully clear; some exchanges let you buy right away but hold withdrawals.",
          screen: { kind: "phone", app: "Exchange", title: "Add cash", rows: [["From", "My Bank ••••1234"], ["Amount", "$25.00", "field"], ["Fee", "$0.00"], ["Available to trade", "Instantly"], ["Available to withdraw", "In 5 days", "warn"]], btn: "Deposit $25" } },
        { t: "2. Choose the asset", d: "Search for Bitcoin (BTC) or Ether (ETH). Check the ticker and the logo carefully: copycat tokens use similar names." },
        { t: "3. Preview the order", d: "Enter $25 and tap Preview. Read every line before you confirm: price, fee, spread and the exact amount you'll receive.",
          screen: { kind: "phone", app: "Exchange", title: "Preview buy", rows: [["Buy", "Bitcoin (BTC)"], ["Pay with", "USD balance"], ["Price", "1 BTC = $90,450"], ["Coinbase-style fee", "$0.99", "hi"], ["Includes spread", "≈ 0.5%", "hi"], ["You receive", "0.00026545 BTC"], ["Total", "$25.00"]], btn: "Buy now" } },
        { t: "4. Confirm and screenshot", d: "Tap Buy. Screenshot the confirmation (crop out balances) or write it down: that's your first record and your cost basis." },
        { t: "5. Log it", d: "Add the buy to the transaction log in your workbook: date, BTC, 0.00026545, $25.00, fee $0.99, exchange name." }
      ] },
      example: [{
        t: "Example: where your $25 actually goes",
        head: ["Item", "Amount"],
        rows: [["You pay", "$25.00"], ["Fee", "−$0.99"], ["Spread (≈0.5% of $24.01)", "≈ −$0.12"], ["Crypto you receive", "≈ $23.89 of BTC"], ["Cost basis for tax", "$25.00 (purchase price + fee)"]],
        out: "About 4.4% of a tiny order goes to costs. That's fine for a lesson; for larger amounts, fees as a percentage usually drop and advanced/limit screens are cheaper."
      }],
      steps: [
        "Deposit a small amount by bank transfer (usually the lowest fee).",
        "Before buying, find the full cost on the preview screen: trading fee plus the spread.",
        "Buy a small amount of a major asset (BTC or ETH).",
        "Screenshot or write down the date, amount, price and fee. Enter it in your workbook's transaction log."
      ],
      practice: "Practice mode: pick a price from a public site today and 'paper buy' $25 in your workbook, fees included. Check it again in 30 days.",
      protect: "Avoid credit cards for crypto purchases: fees are high, and buying volatile assets with debt is risky.",
      myth: { myth: "'Zero-fee' means free.", fact: "Many platforms earn through the spread. Compare the price you pay with the market price." },
      quiz: [
        { q: "What is the 'spread'?", options: ["A fee for withdrawals", "The difference between the buy and sell price", "A type of coin", "Interest earned"], answer: 1, explain: "The spread is a hidden cost of trading." },
        { q: "You pay $25 including a $0.99 fee. Your cost basis is…", options: ["$24.01", "$25.00", "$0.99", "$0"], answer: 1, explain: "Cost basis includes the purchase fee." },
        { q: "The right size for a first purchase is…", options: ["As much as possible", "An amount you'd be fine losing", "Your emergency fund", "Borrowed money"], answer: 1, explain: "The first buy is for learning the process." }
      ],
      sources: [{ t: "Coinbase help: fees", u: "https://help.coinbase.com/en/coinbase/trading-and-funding/pricing-and-fees/fees" }, { t: "Investor.gov", u: "https://www.investor.gov/" }]
    },
    {
      id: "c-dca", realm: "exchange", title: "The Bear Market Engine: DCA", xp: 60, minutes: 20, lesson: 19, wb: "Realm 4 · DCA plan",
      brief: "Dollar-cost averaging (DCA) means buying a fixed amount on a fixed schedule, whatever the price. It takes emotion out of the decision and does its quiet work during bear markets, when headlines are worst.",
      words: ["DCA", "Volatility", "Bear market", "Bull market", "HODL"],
      example: [{
        t: "Example: $50 a week for 4 weeks in a falling-then-rising market",
        head: ["Week", "Price", "$50 buys"],
        rows: [["1", "$100", "0.500 coins"], ["2", "$80", "0.625 coins"], ["3", "$50", "1.000 coins"], ["4", "$80", "0.625 coins"], ["Total", "$200 spent", "2.750 coins"]],
        out: "Average cost: $200 ÷ 2.75 = $72.73 per coin, even though the average price was $77.50. Fixed dollars buy more coins when prices are low. At $80 the position is worth $220: up 10% while the price is still 20% below where it started."
      }],
      guide: { t: "Setting up a recurring buy", steps: [
        { t: "Find 'Recurring buy'", d: "On most exchanges: open the asset → Buy → change 'One time' to 'Recurring'.",
          screen: { kind: "phone", app: "Exchange", title: "Recurring buy", rows: [["Asset", "Bitcoin (BTC)"], ["Amount", "$25.00", "field"], ["Frequency", "Every other Friday (payday)", "hi"], ["Pay with", "Bank ••••1234"], ["Next buy", "Fri, Dec 4"]], btn: "Set up recurring buy" } },
        { t: "Match it to payday", d: "Schedule it the day after your paycheck lands so the money is always there." },
        { t: "Write the bear-market rule", d: "Example: 'I keep my schedule when prices fall. I don't add debt. I look at my balance once a month, not every day.'" }
      ] },
      steps: [
        "Choose an amount from your cash-flow map that you could keep up for 12 months or more.",
        "Choose a schedule (weekly or every payday) and add it to 'My Crypto Rules'.",
        "Write your bear-market rule, for example: I keep my schedule when prices fall; I don't add debt; I review once a month, not every day.",
        "Optional: set up a recurring buy, or just a calendar reminder."
      ],
      practice: "Practice mode: run a 'paper DCA' for four weeks in the workbook's DCA table, using the same day and amount each week.",
      protect: "DCA reduces timing risk. It doesn't remove the risk that an asset falls and stays down. Asset quality and position size still matter.",
      myth: { myth: "I'll buy the exact bottom.", fact: "Nobody reliably calls bottoms. A schedule removes the need to." },
      quiz: [
        { q: "DCA means…", options: ["Buying only after big rallies", "Buying a fixed amount on a fixed schedule", "Borrowing to buy dips", "Day trading"], answer: 1, explain: "Fixed amount, fixed schedule, whatever the price." },
        { q: "In the example, why was the average cost ($72.73) below the average price ($77.50)?", options: ["Lower fees", "Fixed dollars bought more coins when the price was low", "A bonus from the exchange", "Rounding"], answer: 1, explain: "That's the math advantage of DCA." },
        { q: "What does DCA NOT protect against?", options: ["Emotional timing mistakes", "An asset that falls and never recovers", "Buying everything at one peak", "Decision fatigue"], answer: 1, explain: "That's why position size and asset selection still matter." }
      ],
      sources: [{ t: "Investor.gov: dollar-cost averaging", u: "https://www.investor.gov/introduction-investing/investing-basics/glossary/dollar-cost-averaging" }]
    },
    {
      id: "c-offramp", realm: "exchange", title: "The Off-Ramp: Selling and Cashing Out", xp: 50, minutes: 25, lesson: 24, wb: "Realm 4 · Sale record",
      brief: "Knowing how to get back to dollars is as important as buying. Selling is simple, but every sale is a taxable event, and the record you keep today is what you'll need at tax time.",
      words: ["Off-ramp", "Proceeds", "Capital gain/loss", "Taxable event"],
      guide: { t: "Selling crypto and withdrawing to your bank", steps: [
        { t: "1. Move coins to the exchange (if they're in your wallet)", d: "On the exchange, tap Deposit → choose the coin and network → copy the deposit address. Send a small test from your wallet first." },
        { t: "2. Place the sell order", d: "Open the asset → Sell → enter the amount → Preview. Check the price, fee and how many dollars you'll receive.",
          screen: { kind: "phone", app: "Exchange", title: "Preview sell", rows: [["Sell", "0.0050 BTC"], ["Price", "1 BTC = $92,000"], ["Fee", "$2.76"], ["You receive", "$457.24", "hi"]], btn: "Sell now" } },
        { t: "3. Withdraw to your bank", d: "Tap Withdraw (or Cash out) → choose your linked bank → amount. ACH is usually free and takes 1–3 business days.",
          screen: { kind: "phone", app: "Exchange", title: "Cash out", rows: [["To", "My Bank ••••1234"], ["Amount", "$457.24", "field"], ["Arrives", "1–3 business days"]], btn: "Cash out" } },
        { t: "4. Record the sale", d: "Write the date, amount sold, proceeds ($457.24) and which purchase (lot) it came from. That gives you your gain or loss." }
      ] },
      example: [{
        t: "Example: the gain on that sale",
        head: ["", "Amount"],
        rows: [["Proceeds (after fee)", "$457.24"], ["Cost basis of 0.005 BTC (bought 8 months ago for $300 + $3 fee)", "−$303.00"], ["Capital gain", "$154.24 (short-term: held under a year)"]],
        out: "If Maya had waited until she'd held the coins for more than a year, the same gain would have been long-term, usually taxed at a lower rate."
      }],
      steps: [
        "Find the Sell and Withdraw/Cash-out screens on your exchange.",
        "Check the withdrawal fee and how long bank withdrawals take.",
        "If you sell (optional), record proceeds, date and the lot sold in your workbook.",
        "Write your 'take-profit rule' in My Crypto Rules, for example: I sell 10% when my holdings double, and I move it to savings."
      ],
      practice: "Practice mode: walk through the Sell preview screen and cancel before confirming. Use the workbook sale record with an imaginary sale.",
      protect: "Withdraw only to a bank account in your own name, and never pay a 'release fee' or 'tax' to unlock a withdrawal: that's a scam.",
      myth: { myth: "If I don't withdraw to my bank, I don't owe tax.", fact: "Selling (or swapping) is the taxable event, whether or not the dollars leave the exchange." },
      quiz: [
        { q: "When is a sale taxable?", options: ["Only when you withdraw to your bank", "When you sell or swap, even if the dollars stay on the exchange", "Never", "Only above $10,000"], answer: 1, explain: "The disposal is the event, not the bank transfer." },
        { q: "A platform says you must pay a 20% 'tax' before you can withdraw. This is…", options: ["Normal", "A scam pattern", "An IRS rule", "A gas fee"], answer: 1, explain: "Legitimate exchanges don't hold your money hostage for fees." }
      ],
      sources: [{ t: "IRS: digital assets", u: "https://www.irs.gov/filing/digital-assets" }]
    },

    // ---------------- REALM 5: KEY KEEP ----------------
    {
      id: "c-custody", realm: "keep", title: "Who Holds the Keys?", xp: 40, minutes: 15, lesson: 7, wb: "Realm 5 · Custody map",
      brief: "A wallet doesn't hold coins; it holds the keys that control them. Custodial means a company holds the keys. Self-custody means you do. Your private key signs transactions; your public address is where others send to.",
      words: ["Wallet", "Private key", "Public key", "Address", "Custodial", "Self-custody"],
      diagram: "custody",
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
        { q: "Which is safe to share?", options: ["Your private key", "Your seed phrase", "Your receiving address", "Your 2FA code"], answer: 2, explain: "An address is like an email address: people can send to it, not take from it." },
        { q: "A wallet stores…", options: ["Your coins", "The keys that control your coins", "Your bank login", "Your tax records"], answer: 1, explain: "Coins live on the blockchain; your keys prove you can move them." }
      ],
      sources: [{ t: "BIP-39 seed phrases", u: "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki" }]
    },
    {
      id: "c-pickwallet", realm: "keep", title: "Choose Your Wallet", xp: 40, minutes: 20, lesson: 7, wb: "Realm 5 · Wallet plan",
      brief: "Hot wallets live on your phone or browser: perfect for small, everyday amounts and learning. Cold (hardware) wallets keep keys offline: the home for long-term savings. The wallet must also support the blockchain your coins live on.",
      words: ["Hot wallet", "Cold storage", "Hardware wallet", "EVM", "Multisig"],
      sheets: ["wallets-hot", "wallets-cold"],
      example: [{
        t: "Praeclaris wallet picks by level",
        head: ["Level", "Hot wallet", "Cold wallet"],
        rows: [["Beginner", "MetaMask: Ethereum and EVM chains, browser + mobile", "Ledger Nano S Plus: affordable, secure chip"], ["Intermediate", "Exodus: desktop/mobile, many chains incl. XRP, XLM, ADA", "Trezor (Model T / Safe series): open-source, touchscreen"], ["Advanced", "Trust Wallet: broad asset support, built-in DEX", "Ledger Nano X (Bluetooth) or a multisig setup"]],
        out: "Match the wallet to the coin: MetaMask can't hold native BTC, and a Bitcoin-only wallet can't hold ETH. Exodus and Trust Wallet are multi-chain."
      }, {
        t: "Example: Maya's two-wallet setup",
        head: ["Where", "What", "Why"],
        rows: [["Exchange", "$50 for buying", "Convenience; small amount at risk"], ["Exodus (hot)", "$100 for learning to send/receive", "Practice self-custody"], ["Hardware wallet (later)", "Everything she plans to hold 1+ years", "Keys offline"]]
      }],
      steps: [
        "Read the wallet tiers and 'Choosing a wallet' checklist in the Field Guide.",
        "List the coins you hold or plan to hold, and which blockchain each lives on.",
        "Pick one hot wallet that supports those chains (for most beginners: MetaMask for ETH-world coins, Exodus for a mix).",
        "Write your wallet plan in the workbook: what stays on the exchange, what goes to the hot wallet, and the amount at which you'll buy a hardware wallet."
      ],
      practice: "This mission is free: it's a plan.",
      protect: "Only download wallets from the maker's official website or app store, and check the developer name. Fake wallet apps are a top theft method.",
      myth: { myth: "Any wallet can hold any coin.", fact: "Wallets support specific blockchains. Sending a coin to a wallet that doesn't support its network can lose it." },
      quiz: [
        { q: "Where do long-term holdings belong?", options: ["A hot wallet on your phone", "Cold storage (hardware wallet)", "A DM to a friend", "An exchange forever"], answer: 1, explain: "Offline keys can't be reached by online attackers." },
        { q: "MetaMask is mainly a wallet for…", options: ["Bitcoin only", "Ethereum and EVM chains", "Credit cards", "Stocks"], answer: 1, explain: "It holds ETH and tokens on Ethereum-compatible networks." }
      ],
      sources: [{ t: "ethereum.org: choose a wallet", u: "https://ethereum.org/en/wallets/find-wallet/" }, { t: "bitcoin.org: choose your wallet", u: "https://bitcoin.org/en/choose-your-wallet" }]
    },
    {
      id: "c-wallet", realm: "keep", title: "Forge Your First Wallet", xp: 60, minutes: 30, lesson: 7, wb: "Realm 5 · Seed phrase backup card",
      brief: "Set up a reputable self-custody software wallet and back up its seed phrase the right way. The seed phrase is the wallet: anyone with the words owns the funds, and without them, nobody can help you.",
      words: ["Seed phrase", "Address", "Hot wallet"],
      sheets: ["wallets-setup"],
      guide: { t: "Creating a wallet (MetaMask or Exodus look almost identical)", steps: [
        { t: "1. Download from the official source", d: "metamask.io or exodus.com, or your phone's official app store. Check the developer is 'MetaMask' / 'Exodus Movement, Inc.' and the download count is huge." },
        { t: "2. Choose 'Create a new wallet'", d: "Not 'Import'. Set a strong app password (this only locks the app on this device; it isn't your backup).",
          screen: { kind: "phone", app: "Wallet", title: "Welcome", rows: [["Create a new wallet", "→", "hi"], ["Import an existing wallet", "→"]], btn: "Create a new wallet" } },
        { t: "3. Reveal and write down your seed phrase", d: "Make sure nobody is watching and no camera can see the screen. Write the 12 or 24 words on paper, numbered, in order. No photos, screenshots, cloud notes or password managers.",
          screen: { kind: "phone", app: "Wallet", title: "Secret Recovery Phrase", seed: ["river", "candle", "orbit", "shallow", "melt", "pilot", "harvest", "unfold", "zebra", "cotton", "lamp", "venture"], note: "EXAMPLE ONLY. Never use these words. Yours will be different." } },
        { t: "4. Confirm the words", d: "The app asks you to tap words in order. This proves your paper copy is correct." },
        { t: "5. Find your address", d: "Tap Receive to see your public address (0x… for MetaMask). That's the safe-to-share 'account number' for receiving.",
          screen: { kind: "phone", app: "Wallet", title: "Receive ETH", rows: [["Network", "Ethereum Mainnet", "hi"], ["Your address", "0x71C7…976F"]], btn: "Copy address", note: "Your address is safe to share. Your 12 words never are." } },
        { t: "6. Store the paper safely", d: "Somewhere private, dry and fireproof if possible. Later you can copy it onto a metal backup plate." }
      ] },
      steps: [
        "Download a well-known wallet only from its official website or your phone's official app store. Check the developer name.",
        "Create a new wallet. When the 12 or 24 words appear, write them on paper in order. No photos, screenshots, cloud notes or password managers.",
        "Confirm the words when the app asks, then store the paper somewhere private and safe from fire and water.",
        "Write in 'My Crypto Rules': my seed phrase is never typed into a website, chat or email."
      ],
      practice: "Practice mode: create the wallet as a trial run and don't fund it. You'll use it for free testnet coins in the next mission.",
      protect: "A real wallet app never asks for your seed phrase again after setup, except when you're restoring it yourself.",
      myth: { myth: "A screenshot of my seed is a fine backup.", fact: "Photos sync to the cloud and get stolen by malware. Paper or metal, offline." },
      quiz: [
        { q: "Best place for a seed phrase backup:", options: ["A phone photo", "An email to yourself", "Written on paper or metal, stored offline", "A notes app"], answer: 2, explain: "Offline backups can't be hacked remotely." },
        { q: "The wallet's app password is…", options: ["Your backup", "Just a lock for the app on this device", "The same as your seed", "Shared with support"], answer: 1, explain: "Only the seed phrase can restore the wallet elsewhere." },
        { q: "Where should you download a wallet app?", options: ["A link in a YouTube comment", "The official site or official app store, after checking the developer", "Any search ad", "A Telegram group"], answer: 1, explain: "Fake wallet apps are a common theft method." }
      ],
      sources: [{ t: "BIP-39 seed phrases", u: "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki" }, { t: "MetaMask: getting started", u: "https://support.metamask.io/start/getting-started-with-metamask/" }]
    },
    {
      id: "c-receive", realm: "keep", title: "Receive Free Practice Crypto (Testnet)", xp: 50, minutes: 25, wb: "Realm 5 · Testnet log",
      brief: "Testnets are practice copies of real blockchains where coins are free and worthless. You'll switch your new wallet to the Sepolia test network, get test ETH from a faucet and watch it arrive on a block explorer: the whole send-and-receive experience, with zero risk.",
      words: ["Testnet", "Faucet", "Mainnet", "Network", "Gas fee"],
      guide: { t: "Getting Sepolia test ETH into MetaMask", steps: [
        { t: "1. Show test networks", d: "In MetaMask open the network menu (top left) and turn on 'Show test networks', then choose Sepolia.",
          screen: { kind: "phone", app: "MetaMask", title: "Select a network", rows: [["Ethereum Mainnet", ""], ["Show test networks", "On", "hi"], ["Sepolia", "✓ selected", "hi"]], note: "Test networks show '(test)' or a different color so you can't confuse them." } },
        { t: "2. Copy your address", d: "Tap your account name to copy the 0x… address. It's the same address on mainnet and testnet." },
        { t: "3. Use a faucet", d: "Search 'Sepolia faucet' and use a well-known provider (for example the Google Cloud Web3 faucet or a major node provider). Some need a free sign-in. Paste your address and request test ETH.",
          screen: { kind: "browser", url: "cloud.google.com/application/web3/faucet/ethereum/sepolia", title: "Ethereum Sepolia Faucet", rows: [["Network", "Sepolia"], ["Wallet address", "0x71C7…976F", "field"]], btn: "Receive 0.05 Sepolia ETH", note: "Never pay for testnet coins, and never enter a seed phrase on a faucet." } },
        { t: "4. Watch it arrive", d: "Open sepolia.etherscan.io, paste your address and watch the incoming transaction confirm. Then check that MetaMask shows the balance." },
        { t: "5. Send some back (bonus)", d: "Send 0.01 test ETH to a friend's practice address or a second account in your wallet. Note the gas fee: on mainnet you'd pay that in real ETH." }
      ] },
      steps: [
        "Switch your practice wallet to the Sepolia test network.",
        "Get free test ETH from a reputable faucet.",
        "Find the incoming transaction on sepolia.etherscan.io and note its transaction ID and confirmations.",
        "Send a small amount to a second account and record the gas fee in your workbook's testnet log."
      ],
      practice: "This whole mission is practice: testnet coins have no value. If faucets are busy, read through the walkthrough and try again later.",
      protect: "Testnet coins can't be sold. Anyone offering to 'buy' them, or selling them, is running a scam.",
      myth: { myth: "You need to spend money to learn how wallets work.", fact: "Testnets let you practice every move for free." },
      quiz: [
        { q: "What are testnet coins worth?", options: ["The same as real coins", "Nothing; they're for practice", "Half the real price", "$1 each"], answer: 1, explain: "That's what makes testnets a safe classroom." },
        { q: "A faucet asks for your seed phrase to 'verify ownership'. You:", options: ["Enter it", "Leave: faucets only need your address", "Enter half", "Email it"], answer: 1, explain: "Your public address is all anyone needs to send you coins." }
      ],
      sources: [{ t: "ethereum.org: networks and testnets", u: "https://ethereum.org/en/developers/docs/networks/" }, { t: "Sepolia Etherscan", u: "https://sepolia.etherscan.io/" }]
    },
    {
      id: "c-testsend", realm: "keep", title: "The Test Send", xp: 60, minutes: 25, lesson: 7, wb: "Realm 5 · Test-send checklist",
      brief: "Moving crypto is like sending a wire you can't reverse. Professionals always send a small test first, and they check three things every time: the address, the network and (for some coins) the memo or tag.",
      words: ["Network", "Memo / destination tag", "Confirmation", "Address poisoning", "Transaction ID"],
      sheets: ["safety-general"],
      guide: { t: "Withdrawing from an exchange to your own wallet", steps: [
        { t: "1. Get your address from your wallet", d: "Open your wallet → Receive → choose the coin → copy the address. Always copy from here, never from old transaction history." },
        { t: "2. Fill in the exchange's withdrawal form", d: "Choose the coin, paste the address and pick the matching network.",
          screen: { kind: "phone", app: "Exchange", title: "Send / Withdraw", rows: [["Asset", "USDC"], ["To address", "0x71C7656E…F7a8976F", "field"], ["Network", "Ethereum (ERC-20)", "hi"], ["Amount", "5.00 USDC (test)", "field"], ["Network fee", "≈ $1.20"], ["You'll receive", "≈ 3.80 USDC"]], btn: "Continue", note: "Network must match what your wallet expects. Wrong network = funds can be lost." } },
        { t: "3. Check the first and last 6 characters", d: "Compare 0x71C765…a8976F on the exchange screen with your wallet's Receive screen. Malware can swap copied addresses." },
        { t: "4. Memo or destination tag?", d: "Sending XRP, XLM, HBAR or similar TO an exchange? You must include the memo/tag the exchange gives you. Sending to your own wallet usually doesn't need one." },
        { t: "5. Send the test, then look it up", d: "Confirm with your 2FA. Copy the transaction ID and paste it into the block explorer. When it arrives and confirms, send the rest." }
      ] },
      example: [{
        t: "Example: why the test costs less than a mistake",
        head: ["", "Without test", "With test"],
        rows: [["Extra fee for the test send", "$0", "$1.20"], ["If the network was wrong", "Lose $500", "Lose $5, fix it, then send"], ["Peace of mind", "Hope", "Proof"]]
      }],
      steps: [
        "Copy your wallet's receiving address and paste it into the exchange's withdrawal form.",
        "Check the first and last 6 characters match. Malware can swap copied addresses.",
        "Make sure the network matches, for example Bitcoin to Bitcoin. The wrong network can lose the funds. Add a memo/tag if the coin needs one.",
        "Send a tiny test amount, wait for it to arrive, then send the rest if you planned to.",
        "Look the transaction up on a block explorer and log it as a transfer (not a sale) in your workbook."
      ],
      practice: "Practice mode: do it with testnet ETH from the last mission, or open the exchange withdrawal screen and identify the address, network, memo and fee fields without sending anything.",
      protect: "Address poisoning: scammers send tiny transactions from look-alike addresses, hoping you copy theirs from your history. Always copy from your own wallet.",
      myth: { myth: "If I make a mistake, the exchange can reverse it.", fact: "Blockchain transactions are final. The test send is your undo button." },
      quiz: [
        { q: "Why send a test amount first?", options: ["It's required by law", "To confirm the address and network work before sending more", "To lower taxes", "To earn rewards"], answer: 1, explain: "A tiny fee buys certainty." },
        { q: "You're depositing XRP to an exchange. What extra field is usually required?", options: ["Destination tag / memo", "Gas limit", "Seed phrase", "Nonce"], answer: 0, explain: "The tag tells the exchange which customer the deposit belongs to." },
        { q: "You should copy a receiving address from…", options: ["Your transaction history", "Your own wallet's Receive screen", "A message someone sent", "A screenshot"], answer: 1, explain: "History can contain poisoned look-alike addresses." }
      ],
      sources: [{ t: "FTC: crypto scams", u: "https://consumer.ftc.gov/articles/what-know-about-cryptocurrency-and-scams" }]
    },
    {
      id: "c-recovery", realm: "keep", title: "The Recovery Drill", xp: 50, minutes: 30, lesson: 42, wb: "Realm 5 · Recovery drill log",
      brief: "A backup you've never tested is a hope, not a backup. Prove you can restore your wallet.",
      words: ["Seed phrase"],
      guide: { t: "Restoring a wallet from the seed phrase", steps: [
        { t: "1. Use a second device or reinstall", d: "Install the same wallet app from the official source." },
        { t: "2. Choose 'Import / Restore existing wallet'", d: "This is the ONLY place a seed phrase is ever typed.",
          screen: { kind: "phone", app: "Wallet", title: "Import with Secret Recovery Phrase", rows: [["Word 1", "••••••", "field"], ["Word 2", "••••••", "field"], ["…", "…"], ["Word 12", "••••••", "field"]], btn: "Restore wallet", note: "Only inside the official wallet app, on a device you trust." } },
        { t: "3. Compare the address", d: "The first and last characters of your receiving address must match the original. If they do, your backup works." },
        { t: "4. Log the date", d: "Write it in the workbook's recovery drill log. Repeat once a year." }
      ] },
      steps: [
        "On a second device (or after reinstalling), choose 'restore wallet' in the same app.",
        "Enter your seed phrase in the official wallet app only, never on a website.",
        "Confirm the same address appears.",
        "Write down the date of your successful drill. Repeat it once a year."
      ],
      practice: "Practice mode: do this with your unfunded practice wallet.",
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
      id: "c-log", realm: "records", title: "Start Your Transaction Log", xp: 50, minutes: 30, lesson: 23, wb: "Realm 6 · Transaction log",
      brief: "Every buy, sell, swap, transfer and reward needs a record: date, asset, amount, USD value, fee and which wallet. Starting now saves a painful scramble at tax time.",
      words: ["Transaction log", "Lot", "Fair market value", "Wallet-by-wallet basis"],
      example: [{
        t: "Example: Maya's first five log rows",
        head: ["Date", "Type", "Asset", "Amount", "USD value", "Fee", "From → To"],
        rows: [
          ["2026-03-06", "Buy", "BTC", "0.00026545", "$24.01", "$0.99", "Bank → Exchange"],
          ["2026-03-20", "Buy (DCA)", "BTC", "0.00028100", "$24.01", "$0.99", "Bank → Exchange"],
          ["2026-04-02", "Transfer", "BTC", "0.00054645", "$49.10", "$0.40", "Exchange → Hardware wallet"],
          ["2026-05-15", "Staking reward", "ETH", "0.0012", "$3.84", "$0", "— → Exchange"],
          ["2026-11-02", "Sell", "BTC", "0.00010000", "$9.20", "$0.15", "Exchange → USD"]
        ],
        out: "Transfers between your own wallets aren't taxable, but logging them keeps each lot's cost basis traceable from wallet to wallet."
      }],
      steps: [
        "Download the Praeclaris transaction log spreadsheet (or use the log pages in the workbook). Columns: date, type, asset, amount, USD value, fee, from wallet, to wallet, notes.",
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
      sources: [{ t: "IRS: digital assets", u: "https://www.irs.gov/filing/digital-assets" }, { t: "IRS Rev. Proc. 2024-28 (wallet-by-wallet basis)", u: "https://www.irs.gov/pub/irs-drop/rp-24-28.pdf" }]
    },
    {
      id: "c-tax", realm: "records", title: "Know Your Taxable Events", xp: 50, minutes: 20, lesson: 24, wb: "Realm 6 · Taxable event sorter",
      brief: "In the U.S., crypto is treated as property. Selling for dollars, swapping one coin for another and spending crypto are generally taxable disposals. Earning crypto (staking, mining, airdrops, pay) is income. Buying with dollars and holding generally isn't taxable.",
      words: ["Taxable event", "Short-term gain", "Long-term gain", "Holding period", "Digital asset question"],
      sheets: ["vocab-tax"],
      diagram: "taxflow",
      example: [{
        t: "The taxable event sorter",
        head: ["What you did", "Taxable?", "Type"],
        rows: [
          ["Bought BTC with dollars", "No", "Starts your cost basis"],
          ["Held it", "No", "—"],
          ["Moved BTC between your own wallets", "No", "Log it as a transfer"],
          ["Sold BTC for dollars", "Yes", "Capital gain/loss"],
          ["Swapped ETH for SOL", "Yes", "Capital gain/loss on the ETH"],
          ["Paid for a laptop with crypto", "Yes", "Capital gain/loss"],
          ["Received staking rewards", "Yes", "Ordinary income at value received"],
          ["Received an airdrop you can access", "Yes", "Ordinary income"],
          ["Got paid in crypto for work", "Yes", "Ordinary (possibly self-employment) income"],
          ["Gave crypto as a gift (under $19,000 per person, 2026)", "Generally no", "Recipient keeps your basis"],
          ["Donated crypto to a qualified charity", "Generally no", "Possible deduction"]
        ]
      }, {
        t: "Short-term vs. long-term",
        head: ["Held", "Treatment", "Federal rate"],
        rows: [["1 year or less", "Short-term", "Your ordinary income rate (10%–37%)"], ["More than 1 year", "Long-term", "0%, 15% or 20% depending on income"]]
      }],
      steps: [
        "Read the IRS digital assets page.",
        "Mark each transaction in your log as taxable or not taxable using the sorter.",
        "For each holding, write the date it turns long-term (one year and one day after purchase).",
        "Note that exchanges now report on Form 1099-DA, and file a reminder to talk to a tax professional."
      ],
      practice: "This mission is free.",
      protect: "General education only. Your situation may differ; consult a licensed tax professional.",
      myth: { myth: "Crypto-to-crypto swaps aren't taxable.", fact: "In the U.S. a swap is generally a taxable disposal of the coin you gave up." },
      quiz: [
        { q: "Which is generally a taxable event in the U.S.?", options: ["Buying BTC with dollars", "Moving BTC between your own wallets", "Swapping ETH for SOL", "Holding"], answer: 2, explain: "A swap disposes of ETH, so a gain or loss is realized." },
        { q: "Staking rewards are generally taxed as…", options: ["Nothing", "Ordinary income when you receive them", "A gift", "Long-term gains"], answer: 1, explain: "Income at fair market value when you gain control (IRS Rev. Rul. 2023-14)." },
        { q: "Long-term treatment generally applies after holding…", options: ["30 days", "6 months", "More than 1 year", "5 years"], answer: 2, explain: "More than one year." }
      ],
      sources: [{ t: "IRS: digital assets and Form 1099-DA", u: "https://www.irs.gov/filing/digital-assets" }, { t: "IRS: frequently asked questions on virtual currency", u: "https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions" }]
    },
    {
      id: "c-basis", realm: "records", title: "Cost Basis Math: FIFO vs. HIFO", xp: 50, minutes: 25, lesson: 24, wb: "Realm 6 · Cost basis worksheet",
      brief: "When you've bought the same coin several times at different prices, which purchase did you sell? The method you use (FIFO or specific identification such as HIFO) can change your tax bill a lot. Here's the math with real numbers.",
      words: ["Cost basis", "Proceeds", "Capital gain/loss", "FIFO", "HIFO", "Specific identification", "Lot"],
      example: [{
        t: "Example: three ETH purchases, one sale",
        p: "Maya bought ETH three times, all on the same exchange. In November 2026 she sells 1 ETH for $3,500.",
        head: ["Lot", "Date bought", "Amount", "Cost (incl. fees)"],
        rows: [["A", "Jan 2025", "1 ETH", "$2,000"], ["B", "Jun 2025", "1 ETH", "$3,800"], ["C", "Mar 2026", "1 ETH", "$2,600"]]
      }, {
        t: "Which lot she sells changes everything",
        head: ["Method", "Lot sold", "Proceeds − basis", "Result"],
        rows: [["FIFO (first in)", "A", "$3,500 − $2,000", "$1,500 long-term gain"], ["HIFO (highest cost)", "B", "$3,500 − $3,800", "$300 long-term loss"], ["Specific ID: newest", "C", "$3,500 − $2,600", "$900 short-term gain"]],
        out: "Same sale, three very different tax results. FIFO is the default unless you identify the lot at the time of sale (some exchanges let you choose; crypto tax software can apply specific ID if your records support it)."
      }],
      steps: [
        "Read both examples and redo the math yourself in the workbook's cost basis worksheet.",
        "For your own holdings, list each purchase as a lot: date, amount, cost including fees.",
        "Check which cost-basis method your exchange uses by default (usually FIFO) and whether you can choose lots.",
        "Write the method you'll use in My Crypto Rules, and ask a tax professional before switching methods."
      ],
      practice: "Practice mode: use Maya's numbers in the worksheet.",
      protect: "Choose your method consistently and keep the records that prove which lot you sold. Since 2025, basis is tracked wallet by wallet.",
      myth: { myth: "My gain is just sale price minus my average price.", fact: "U.S. rules use specific lots (FIFO by default), not a simple average." },
      quiz: [
        { q: "Under FIFO, which coins are treated as sold first?", options: ["The newest", "The oldest", "The most expensive", "The cheapest"], answer: 1, explain: "First in, first out." },
        { q: "Using the example, selling Lot B (cost $3,800) for $3,500 produces…", options: ["A $1,500 gain", "A $300 loss", "A $900 gain", "No result"], answer: 1, explain: "$3,500 − $3,800 = −$300." },
        { q: "Cost basis includes…", options: ["Only the price", "The price plus purchase fees", "Your seed phrase", "Future gains"], answer: 1, explain: "Fees you paid to buy increase your basis." }
      ],
      sources: [{ t: "IRS: virtual currency FAQ (specific identification)", u: "https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions" }]
    },
    {
      id: "c-income", realm: "records", title: "Income Crypto: Staking, Mining, Airdrops and Pay", xp: 40, minutes: 20, lesson: 24, wb: "Realm 6 · Income log",
      brief: "Crypto you earn is income, valued in dollars on the day you receive it. That same dollar value becomes your cost basis for those coins, so if you sell later, you also have a gain or loss.",
      words: ["Ordinary income", "Staking rewards", "Mining income", "Airdrop", "Hard fork income", "Fair market value"],
      example: [{
        t: "Example: a staking reward, start to finish",
        head: ["Event", "What happens", "Tax effect"],
        rows: [["Mar 1: receive 0.05 ETH reward, ETH = $3,000", "Income of 0.05 × $3,000", "$150 ordinary income"], ["That value becomes the coins' basis", "Basis = $150", "—"], ["Dec 1: sell the 0.05 ETH at $3,400", "Proceeds $170", "$20 short-term capital gain"]],
        out: "Two separate events: income when received, then a capital gain or loss when sold. Log both."
      }],
      steps: [
        "List any crypto you've earned (staking, rewards programs, airdrops, mining, payment for work).",
        "For each, record the date received, amount and USD value at that time in the workbook's income log.",
        "Note: self-employed income paid in crypto may also owe self-employment tax.",
        "Set a reminder to log rewards on your monthly records day; small amounts add up."
      ],
      practice: "Practice mode: log the example reward as if it were yours.",
      protect: "Free tokens that appear unexpectedly may be scam bait. Don't interact with tokens you didn't ask for just to 'claim' them.",
      myth: { myth: "Rewards aren't taxed until I sell.", fact: "In the U.S., staking and similar rewards are generally income when you gain control of them." },
      quiz: [
        { q: "You receive $150 of staking rewards. Your cost basis for those coins is…", options: ["$0", "$150", "Whatever you sell them for", "Half"], answer: 1, explain: "The income amount becomes the basis." },
        { q: "Getting paid in crypto for freelance work is…", options: ["Not taxable", "Ordinary income (possibly self-employment)", "A gift", "A capital loss"], answer: 1, explain: "It's payment for services." }
      ],
      sources: [{ t: "IRS Rev. Rul. 2023-14 (staking rewards)", u: "https://www.irs.gov/pub/irs-drop/rr-23-14.pdf" }, { t: "IRS: digital assets", u: "https://www.irs.gov/filing/digital-assets" }]
    },
    {
      id: "c-filing", realm: "records", title: "Filing Day: From Log to Form 8949", xp: 50, minutes: 30, lesson: 24, wb: "Realm 6 · Tax-season checklist",
      brief: "At tax time your log becomes forms: each sale or swap is listed on Form 8949, totals flow to Schedule D, and income goes on Schedule 1 or C. Crypto tax software can do the heavy lifting if your records are clean.",
      words: ["Form 8949", "Schedule D", "Form 1099-DA", "Digital asset question", "Tax-loss harvesting", "Wash sale", "Gift tax exclusion"],
      diagram: "taxflow",
      guide: { t: "Tax season in six steps", steps: [
        { t: "1. Gather", d: "Download CSV histories from every exchange and wallet, plus any Form 1099-DA and 1099-MISC you received." },
        { t: "2. Import", d: "Load them into crypto tax software (for example Koinly, CoinTracker, ZenLedger or TokenTax) or give them to your tax preparer.",
          screen: { kind: "browser", url: "app.example-crypto-tax.com", title: "Import your accounts", rows: [["Exchange A", "CSV uploaded ✓"], ["Exodus wallet", "Address synced ✓"], ["Hardware wallet", "Address synced ✓"], ["Unmatched transfers", "3 to review", "warn"]], btn: "Review transactions" } },
        { t: "3. Reconcile", d: "Match transfers between your own wallets so they aren't counted as sales. Add missing cost basis from your log for coins you moved in from self-custody." },
        { t: "4. Generate reports", d: "The software produces Form 8949, the Schedule D totals and an income report." },
        { t: "5. Answer the 1040 question", d: "Check 'Yes' to the digital asset question if you sold, swapped, spent or earned crypto during the year." },
        { t: "6. Review with a pro", d: "Have a licensed tax professional review, especially for business income, large gains or missing records." }
      ] },
      example: [{
        t: "Example: harvesting a loss",
        head: ["", "Amount"],
        rows: [["Gain on BTC sold this year", "+$1,200"], ["Unrealized loss on a smaller coin you no longer believe in", "−$700"], ["Sell the smaller coin before Dec 31", "Realizes −$700"], ["Net capital gain", "$500"]],
        out: "Losses offset gains, and up to $3,000 of extra net loss can offset ordinary income each year. Under current U.S. law (2026) the wash-sale rule doesn't apply to crypto held directly, but proposals exist, and it does apply to crypto ETFs. Check with a professional."
      }],
      steps: [
        "Make a list of every exchange and wallet you used this year.",
        "Download each CSV and save it in a 'Tax [year]' folder.",
        "Compare any Form 1099-DA with your own log and note differences.",
        "Fill in the workbook's tax-season checklist and book time with a tax professional or tax software."
      ],
      practice: "Practice mode: run the checklist with your paper trades and the example numbers.",
      protect: "Education only, not tax advice. Rules change; verify with the IRS or a licensed professional.",
      myth: { myth: "If I didn't get a tax form, I don't have to report it.", fact: "You must report taxable crypto activity whether or not you receive a form." },
      quiz: [
        { q: "Individual crypto sales are listed on…", options: ["Form W-2", "Form 8949", "Form 1098", "Form I-9"], answer: 1, explain: "Form 8949 lists each disposal; Schedule D totals them." },
        { q: "You sold BTC at a gain and another coin at a loss. The loss…", options: ["Is ignored", "Can offset the gain", "Doubles the tax", "Must wait 5 years"], answer: 1, explain: "That's the idea behind tax-loss harvesting." },
        { q: "You swapped coins this year. The 1040 digital asset question should be…", options: ["No", "Yes", "Skipped", "Answered by the exchange"], answer: 1, explain: "Swaps are disposals, so answer Yes." }
      ],
      sources: [{ t: "IRS: Form 8949 instructions", u: "https://www.irs.gov/forms-pubs/about-form-8949" }, { t: "IRS: digital assets", u: "https://www.irs.gov/filing/digital-assets" }]
    },
    {
      id: "c-etf", realm: "records", title: "ETF or Own It Directly?", xp: 40, minutes: 20, lesson: 25, wb: "Realm 6 · ETF vs direct",
      brief: "Since January 2024, U.S. spot bitcoin ETFs let people get price exposure through a regular brokerage account. That's a different trade-off from holding the coin yourself.",
      words: ["Spot ETF"],
      example: [{
        t: "ETF vs. owning the coin",
        head: ["", "Spot ETF", "Own it directly"],
        rows: [["Where", "Brokerage or retirement account", "Exchange or your own wallet"], ["Keys to manage", "None", "Yes (if self-custody)"], ["Annual fee", "About 0.1%–0.3%+", "None (trading fees only)"], ["Trading hours", "Stock market hours", "24/7"], ["Can withdraw coins", "No", "Yes"], ["Taxes", "1099-B like a stock", "Your own records + 1099-DA"]]
      }],
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
      id: "c-contracts", realm: "frontier", title: "Smart Contracts and Gas", xp: 40, minutes: 20, lesson: 20, wb: "Realm 7 · Gas tracker",
      brief: "Ethereum runs smart contracts: programs that execute on the blockchain. Every action costs a fee called gas, paid in ETH, and it rises when the network is busy.",
      words: ["Smart contract", "Gas fee", "Gas limit", "EVM", "Oracle", "dApp"],
      example: [{
        t: "Example: what gas costs",
        p: "A simple ETH send uses 21,000 gas units. Fee = gas units × gas price. (1 gwei = 0.000000001 ETH.)",
        head: ["Network busy?", "Gas price", "Fee in ETH", "Fee at ETH = $3,000"],
        rows: [["Quiet", "1 gwei", "0.000021 ETH", "≈ $0.06"], ["Normal", "10 gwei", "0.00021 ETH", "≈ $0.63"], ["Very busy", "60 gwei", "0.00126 ETH", "≈ $3.78"]],
        out: "Swaps and DeFi actions use several times more gas than a simple send. Layer 2 networks cost a fraction of this."
      }],
      steps: [
        "Open etherscan.io and look at the current gas price (Gas Tracker).",
        "Use the example formula to estimate the cost of a simple send right now.",
        "Explain gas with a real-world analogy, like a toll road or postage.",
        "Write one thing a smart contract can do and one way it can fail (bugs, or admin keys that can change the rules)."
      ],
      practice: "This mission is free and uses public data.",
      protect: "Code is law, until there's a bug. Audited doesn't mean risk-free.",
      myth: { myth: "Smart contracts are smart.", fact: "They do exactly what the code says, including the bugs." },
      quiz: [
        { q: "What is gas?", options: ["A token you earn", "The fee to run an action on the network", "A type of wallet", "A stablecoin"], answer: 1, explain: "Gas pays the network to process your transaction." },
        { q: "A simple send uses 21,000 gas at 10 gwei. The fee is…", options: ["0.00021 ETH", "21 ETH", "0.21 ETH", "10 ETH"], answer: 0, explain: "21,000 × 10 gwei = 210,000 gwei = 0.00021 ETH." },
        { q: "When did Ethereum move to proof of stake (the Merge)?", options: ["2015", "September 2022", "2024", "It hasn't"], answer: 1, explain: "September 15, 2022, cutting energy use by about 99.95%." }
      ],
      sources: [{ t: "ethereum.org: gas and fees", u: "https://ethereum.org/en/developers/docs/gas/" }, { t: "ethereum.org: The Merge", u: "https://ethereum.org/en/roadmap/merge/" }]
    },
    {
      id: "c-swap", realm: "frontier", title: "Your First DEX Swap (Practice Run)", xp: 50, minutes: 30, lesson: 22, wb: "Realm 7 · Swap checklist",
      brief: "A decentralized exchange (DEX) lets you swap tokens straight from your own wallet, with no account. Instead of an order book, an automated market maker (AMM) prices your trade from a pool of tokens. You'll walk through a swap screen and learn every field before risking a cent.",
      words: ["DEX", "AMM", "Liquidity pool", "Slippage", "Token approval", "Impermanent loss"],
      sheets: ["safety-defi"],
      guide: { t: "Anatomy of a swap", steps: [
        { t: "1. Go to the real DEX", d: "Type the address yourself (for example app.uniswap.org). Fake DEX sites are a top theft method. Click 'Connect' and choose your wallet.",
          screen: { kind: "browser", url: "app.uniswap.org", title: "Swap", rows: [["You pay", "0.01 ETH", "field"], ["You receive", "≈ 29.85 USDC"], ["Rate", "1 ETH = 2,985 USDC"], ["Price impact", "< 0.01%"], ["Max slippage", "0.5% (auto)", "hi"], ["Network cost", "$0.04 (on a layer 2)"]], btn: "Review swap" } },
        { t: "2. Check the network", d: "Your wallet and the DEX must be on the same network. Layer 2s like Base or Arbitrum cost cents instead of dollars." },
        { t: "3. Read slippage and price impact", d: "Slippage tolerance is how far the price may move before the swap cancels. Price impact shows how much your trade moves the pool. Keep both small." },
        { t: "4. The approval step", d: "Swapping a token (not ETH) for the first time asks you to approve the DEX contract to spend it. Approve only the amount you're swapping if your wallet lets you edit it.",
          screen: { kind: "phone", app: "Wallet", title: "Spending cap request", rows: [["Site", "app.uniswap.org ✓", "hi"], ["Token", "USDC"], ["Spending cap", "30 USDC (edit from 'Unlimited')", "warn"]], btn: "Approve", note: "Unlimited approvals let a contract move ALL of that token later." } },
        { t: "5. Confirm in your wallet", d: "Your wallet shows the final details. Check the site name, amounts and fee, then confirm. View it on the block explorer afterwards." },
        { t: "6. Log it", d: "A swap is a taxable event: record the value of what you gave up and what you received." }
      ] },
      steps: [
        "Open a major DEX by typing its address, and connect your practice wallet (on a testnet if the DEX offers a testnet mode, or without funds).",
        "Enter a swap amount and find: the rate, price impact, slippage setting and network cost.",
        "Stop at the 'Review' or wallet-confirmation screen and cancel. You've seen everything without signing.",
        "Fill in the workbook's swap checklist for next time."
      ],
      practice: "This mission is a practice run: you cancel before signing. If you later swap for real, start with a few dollars on a layer 2.",
      protect: "Never sign a transaction or approval you don't understand, and check the site address in the wallet prompt every time.",
      myth: { myth: "DEXs are anonymous and risk-free because there's no company.", fact: "There's also no support desk and no undo. Contract bugs, fake sites and bad approvals are your risk." },
      quiz: [
        { q: "On a DEX, who holds your funds before the swap?", options: ["The DEX company", "You, in your own wallet", "A bank", "The miners"], answer: 1, explain: "You trade from self-custody." },
        { q: "What does max slippage control?", options: ["Your gas limit", "How far the price may move before the swap cancels", "Your password", "The token supply"], answer: 1, explain: "A small tolerance protects you from bad fills." },
        { q: "Why edit an 'Unlimited' token approval?", options: ["To pay less tax", "So a contract can't later move more of that token than you meant", "It's required", "To speed it up"], answer: 1, explain: "Limited approvals limit the damage if a contract is hacked." }
      ],
      sources: [{ t: "Uniswap docs: how swaps work", u: "https://docs.uniswap.org/concepts/overview" }, { t: "Revoke.cash: what are approvals", u: "https://revoke.cash/learn/approvals/what-are-token-approvals" }]
    },
    {
      id: "c-stable", realm: "frontier", title: "Stablecoins in the GENIUS Era", xp: 50, minutes: 25, lesson: 12, wb: "Realm 7 · Stablecoin check",
      brief: "The GENIUS Act (signed July 18, 2025) creates a U.S. framework for payment stablecoins: reserves, disclosures and supervision. Its rules take full effect in January 2027.",
      words: ["Stablecoin"],
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
      id: "c-staking", realm: "frontier", title: "Staking Without Surprises", xp: 50, minutes: 25, lesson: 22, wb: "Realm 7 · Staking plan",
      brief: "Staking means locking proof-of-stake coins (such as ETH, ADA, SOL or ALGO) to help secure the network, in return for rewards. It can be done through an exchange (easy, custodial) or from your own wallet (more control). Rewards are real, and so are lock-ups, slashing and taxes.",
      words: ["Staking", "Validator", "APY", "Slashing", "Lock-up period", "Proof of stake"],
      example: [{
        t: "Example: what 3.5% APY really means",
        head: ["", "Amount"],
        rows: [["Staked", "1 ETH (worth $3,000)"], ["APY", "3.5%"], ["Rewards after a year", "≈ 0.035 ETH (≈ $105 at the same price)"], ["Exchange commission (e.g. 25%)", "−0.00875 ETH"], ["You keep", "≈ 0.026 ETH"], ["Taxed as income when received", "Yes, at each reward's value"]],
        out: "If ETH falls 30% during the year, the rewards don't make up for it. Staking adds coins; it doesn't protect the price."
      }],
      guide: { t: "Two ways to stake", steps: [
        { t: "Option A: on an exchange", d: "Open the coin → 'Stake' or 'Earn' → read the rate, commission, unstaking time and any lock-up → stake a small amount.",
          screen: { kind: "phone", app: "Exchange", title: "Stake ETH", rows: [["Estimated APY", "3.1% (after 25% commission)", "hi"], ["Unstaking time", "Days to weeks", "warn"], ["Rewards paid", "Every few days"], ["Amount", "0.05 ETH", "field"]], btn: "Stake" } },
        { t: "Option B: from your wallet", d: "Wallets like Exodus, Trust Wallet or Ledger Live let you delegate to a validator while keeping your keys. Pick an established validator with a long record." },
        { t: "Before you stake, check", d: "Lock-up/unbonding time, commission, slashing risk, whether it's 'liquid staking' (a token that represents your stake, with extra smart-contract risk), and state availability." }
      ] },
      steps: [
        "Pick one proof-of-stake coin you hold or might hold and find its current staking rate on your exchange or wallet.",
        "Write down the commission, unstaking time and any lock-up.",
        "Calculate a year of rewards with the example formula, after commission.",
        "Add a staking rule to My Crypto Rules, including logging each reward as income."
      ],
      practice: "Practice mode: do the calculation on paper with the example numbers.",
      protect: "Very high staking 'yields' (20%+) often mean inflationary tokens or hidden risk. Rewards paid in a falling token can still lose money.",
      myth: { myth: "Staking is free money.", fact: "It's payment for locking up capital and taking network and platform risk." },
      quiz: [
        { q: "Slashing is…", options: ["A fee discount", "A penalty that takes part of a validator's stake", "A tax form", "A price crash"], answer: 1, explain: "Validators who break rules can lose part of their stake." },
        { q: "Staking rewards are generally taxed in the U.S. …", options: ["Never", "As income when received", "Only when you unstake", "Only above $10,000"], answer: 1, explain: "Log each reward's value when received." }
      ],
      sources: [{ t: "ethereum.org: staking", u: "https://ethereum.org/en/staking/" }, { t: "IRS Rev. Rul. 2023-14", u: "https://www.irs.gov/pub/irs-drop/rr-23-14.pdf" }]
    },
    {
      id: "c-l2", realm: "frontier", title: "Layer 2s and Bridges", xp: 40, minutes: 20, lesson: 20, wb: "Realm 7 · Network map",
      brief: "Layer 2 networks (like Base, Arbitrum and Optimism for Ethereum, or Lightning for Bitcoin) process transactions cheaply and settle back to the main chain. Bridges move tokens between chains, but they're also one of the most-hacked parts of crypto.",
      words: ["Layer 2", "Bridge", "Wrapped token", "Network"],
      example: [{
        t: "Example: the same action on different networks",
        head: ["Network", "Typical cost of a token swap", "Speed"],
        rows: [["Ethereum mainnet", "$1–$20+", "~12 seconds per block"], ["An Ethereum layer 2 (Base, Arbitrum)", "A few cents", "~1–2 seconds"], ["Bitcoin Lightning (payment)", "A fraction of a cent", "Instant"]],
        out: "Many exchanges now let you withdraw directly to a layer 2, so you can skip bridges entirely."
      }],
      steps: [
        "Check which networks your exchange supports for ETH or USDC withdrawals.",
        "Write one benefit and one risk of layer 2s and of bridges.",
        "Add a network rule to My Crypto Rules, for example: I withdraw directly to a layer 2 when possible and use only official bridges."
      ],
      practice: "This mission is free.",
      protect: "Use only official or well-established bridges, test with tiny amounts, and double-check the destination network.",
      myth: { myth: "My tokens on a layer 2 are the same as on mainnet.", fact: "They're on a different network. To move them, you withdraw or bridge back." },
      quiz: [
        { q: "Why use a layer 2?", options: ["Higher fees", "Lower fees and faster transactions", "To avoid wallets", "To mine bitcoin"], answer: 1, explain: "That's their purpose." },
        { q: "WBTC is an example of a…", options: ["Wrapped token", "Privacy coin", "Hardware wallet", "CBDC"], answer: 0, explain: "Bitcoin represented on Ethereum." }
      ],
      sources: [{ t: "ethereum.org: layer 2", u: "https://ethereum.org/en/layer-2/" }, { t: "ethereum.org: bridges", u: "https://ethereum.org/en/bridges/" }]
    },
    {
      id: "c-defi", realm: "frontier", title: "DeFi Without Getting Hurt", xp: 60, minutes: 30, lesson: 22, wb: "Realm 7 · DeFi rules",
      brief: "DeFi lets you trade, lend and borrow without a company in the middle. It also has unforgiving failure modes: hacks, rug pulls, liquidations and malicious approvals.",
      words: ["DeFi", "Yield farming", "Rug pull", "Drainer", "Liquidation", "Token approval"],
      sheets: ["safety-defi"],
      example: [{
        t: "Example: how a liquidation happens",
        head: ["Step", "Numbers"],
        rows: [["Deposit collateral", "1 ETH at $3,000"], ["Borrow", "$1,800 USDC (60% of collateral)"], ["Liquidation threshold", "80%"], ["ETH falls to $2,200", "Debt is 82% of collateral → liquidated"], ["Result", "Part of the ETH is sold automatically, plus a penalty"]],
        out: "Borrowing against crypto turns a price drop into a forced sale. Keep loans small or skip them."
      }],
      steps: [
        "Learn the four big DeFi risks: smart-contract bugs, rug pulls (the team disappears), liquidation (borrowed positions sold automatically) and unlimited token approvals.",
        "Use a revoke tool (for example revoke.cash) in read-only mode to view your wallet's approvals.",
        "Write your DeFi rule, for example: separate 'hot' wallet with small amounts only, and review approvals monthly.",
        "If you explore, use well-established protocols and amounts you'd be fine losing."
      ],
      practice: "Practice mode: rework the liquidation example with ETH falling to $2,500 instead. Is the loan still safe? (Debt ÷ collateral = $1,800 ÷ $2,500 = 72%: yes, just.)",
      protect: "Never sign a transaction or 'permit' you don't understand. Wallet drainers often look like airdrop claims.",
      myth: { myth: "High APY means a great opportunity.", fact: "Unusually high yield is usually payment for unusually high risk, or a trap." },
      quiz: [
        { q: "What is an unlimited token approval?", options: ["A bonus", "Permission for a contract to move all of a token from your wallet", "A KYC level", "A free transaction"], answer: 1, explain: "If the contract is malicious or hacked, it can drain that token." },
        { q: "A site asks you to sign to 'claim a free airdrop'. Safest move?", options: ["Sign quickly", "Verify independently; assume it's a drainer until proven otherwise", "Enter your seed", "Share it with friends"], answer: 1, explain: "Fake airdrops are a leading drainer tactic." }
      ],
      sources: [{ t: "FTC: crypto scams", u: "https://consumer.ftc.gov/articles/what-know-about-cryptocurrency-and-scams" }, { t: "Revoke.cash", u: "https://revoke.cash/" }]
    },
    {
      id: "c-rwa", realm: "frontier", title: "Tokenization and Real-World Assets", xp: 40, minutes: 20, lesson: 21, wb: "Realm 7 · RWA questions",
      brief: "Tokenization puts claims on real assets (Treasuries, funds, invoices, property) onto blockchains. Banks and asset managers are testing it now.",
      words: ["RWA", "Security token" ],
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
      id: "c-hardware", realm: "citadel", title: "Raise the Cold Vault", xp: 70, minutes: 60, lesson: 42, wb: "Realm 8 · Cold storage plan",
      brief: "For long-term holdings, a hardware wallet keeps your keys offline. You approve every transaction on the device's own screen, so even a hacked computer can't move your coins. This is the step from beginner to serious holder.",
      words: ["Hardware wallet", "Cold storage", "Passphrase", "Multisig"],
      sheets: ["wallets-cold", "safety-top"],
      guide: { t: "Setting up a hardware wallet (Ledger or Trezor)", steps: [
        { t: "1. Buy direct", d: "Order from ledger.com or trezor.io (or the maker's official store on a major marketplace). Never used, never from a reseller, never as a 'gift'." },
        { t: "2. Inspect the box", d: "Seals intact. If there's a recovery-phrase card already filled in, the device is compromised: return it." },
        { t: "3. Install the official app", d: "Ledger Live or Trezor Suite, downloaded from the maker's website. Connect the device and choose 'Set up as new device'." },
        { t: "4. Write the seed from the device screen", d: "The device shows 24 words on its own screen. Write them on the included card, in order. The words never touch your computer.",
          screen: { kind: "device", title: "Word #1", rows: [["", "river"]], note: "Device screen: write each word, then press to continue." } },
        { t: "5. Set a PIN", d: "Choose a PIN on the device. Wrong PINs wipe it after several tries; your seed restores it." },
        { t: "6. Receive with on-device check", d: "In the app, choose Receive. Compare the address on your computer with the address on the device screen. Only the device is trustworthy.",
          screen: { kind: "device", title: "Verify address", rows: [["", "bc1q…x7k9"]], note: "Must match the address on your computer screen." } },
        { t: "7. Test send, then recovery drill", d: "Send a small amount from the exchange, confirm it arrives, then (optionally) practice restoring on a reset device before moving larger amounts." }
      ] },
      steps: [
        "Buy a hardware wallet directly from the manufacturer, never used, from a marketplace reseller or as a 'gift'.",
        "Initialize it yourself: it must generate a new seed. Never use a seed that came in the box.",
        "Back up the seed on paper or metal; consider a second copy in a separate secure location.",
        "Do a test send to it, then a recovery drill.",
        "Decide your split: what stays on the exchange for buying, what goes to cold storage."
      ],
      practice: "Practice mode: write your cold-storage plan (device, backup locations, test schedule) in the workbook before buying anything.",
      protect: "A pre-filled seed card in the box means the device is compromised. Return it.",
      myth: { myth: "Hardware wallets can't be hacked, so I'm done.", fact: "Most losses come from tricked users and bad backups, not broken devices." },
      quiz: [
        { q: "Where should you buy a hardware wallet?", options: ["A used listing", "Directly from the manufacturer", "A stranger online", "Any discount site"], answer: 1, explain: "The supply chain matters." },
        { q: "Which address do you trust when receiving to a hardware wallet?", options: ["The one on the computer", "The one shown on the device's own screen", "One from an email", "Any"], answer: 1, explain: "Malware can change what your computer shows, not what the device shows." },
        { q: "The device arrives with a seed phrase card already filled in. You:", options: ["Use it", "Treat it as compromised and don't use it", "Photograph it", "Share it with support"], answer: 1, explain: "Legitimate devices generate the seed during setup." }
      ],
      sources: [{ t: "BIP-39 seed phrases", u: "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki" }, { t: "Ledger: getting started", u: "https://www.ledger.com/start" }, { t: "Trezor: getting started", u: "https://trezor.io/start" }]
    },
    {
      id: "c-privacy", realm: "citadel", title: "Go Quiet: Privacy and Identity", xp: 50, minutes: 40, lesson: 43, wb: "Realm 8 · Privacy checklist",
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
      id: "c-failures", realm: "citadel", title: "Learn From the Fallen", xp: 50, minutes: 30, lesson: 44, wb: "Realm 8 · Lessons table",
      brief: "Mt. Gox (2014), Celsius (2022), FTX (2022) and the $1.5 billion Bybit theft (2025) each teach a lesson. The pattern: counterparty risk, opacity and concentration.",
      words: ["Proof of reserves", "Custodial"],
      example: [{
        t: "Four failures, four rules",
        head: ["Failure", "What went wrong", "The rule it teaches"],
        rows: [["Mt. Gox (2014)", "Exchange lost ~850,000 BTC to theft and poor controls", "Don't leave long-term holdings on an exchange"], ["Celsius (2022)", "'Yield' platform lent out deposits and froze withdrawals", "High yield = high risk; read who uses your coins"], ["FTX (2022)", "Customer funds misused by insiders", "Size isn't safety; demand transparency"], ["Bybit (2025)", "$1.5B stolen from exchange wallets (attributed to North Korea)", "Spread counterparty risk; self-custody what you hold long term"]]
      }],
      steps: [
        "Read the table and the library lesson on these failures.",
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
      id: "c-maintenance", realm: "citadel", title: "The Maintenance Rhythm", xp: 50, minutes: 20, wb: "Realm 8 · Maintenance checklist",
      brief: "A crypto system needs a little care on a schedule: 5 minutes a day, 10 minutes a week, month and year. The Praeclaris Maintenance Checklist gives you the rhythm for your level: Beginner, Intermediate or Advanced.",
      sheets: ["maint-beginner", "maint-intermediate", "maint-advanced"],
      steps: [
        "Open the Field Guide's maintenance checklist and choose your level.",
        "Add the weekly, monthly and yearly items to your calendar as recurring reminders.",
        "Tick this week's items in the Field Guide checklist (it remembers your ticks in this browser).",
        "Print or save the checklist page from your workbook."
      ],
      practice: "Free. Setting the reminders counts.",
      protect: "Daily checks are for looking, not trading. Your rules decide trades, not the daily chart.",
      myth: { myth: "Set it and forget it means never looking.", fact: "Backups decay, apps update and rules drift. A light, regular check-up keeps the system working." },
      quiz: [
        { q: "How often should you audit your seed-phrase storage (beginner checklist)?", options: ["Never", "Monthly", "Every hour", "Only after a hack"], answer: 1, explain: "A quick monthly check that it's still private and readable." },
        { q: "What's the purpose of the daily 5-minute check?", options: ["To trade every move", "To look, not to trade", "To post your balance", "To change passwords"], answer: 1, explain: "Your written rules decide trades." }
      ],
      sources: [{ t: "Praeclaris Crypto Maintenance Checklist", u: "#/guide" }]
    },
    {
      id: "c-legacy", realm: "citadel", title: "The Legacy Letter", xp: 60, minutes: 45, lesson: 47, wb: "Realm 8 · Legacy letter outline",
      brief: "If something happened to you tomorrow, could your family find and access your crypto without exposing it to anyone else? Most can't.",
      steps: [
        "Write a 'legacy letter' that lists where assets are (platforms and wallet types), not the seed phrases themselves.",
        "Decide how a trusted person would get the backups: sealed envelope, safe deposit box, or an attorney-held instruction.",
        "Ask an estate attorney how to include digital assets in your will or trust.",
        "Review it once a year with your recovery drill."
      ],
      practice: "Practice mode: write the letter outline in the workbook with placeholders, without any real details.",
      protect: "Never email a seed phrase to family. Separate the map (letter) from the keys (backups).",
      myth: { myth: "My family will figure it out.", fact: "Without instructions, self-custodied crypto can be lost forever." },
      quiz: [
        { q: "What belongs in a legacy letter?", options: ["Seed phrases", "Where assets are and how to reach the backups", "Your passwords", "Your account balances"], answer: 1, explain: "The letter is a map; the backups are stored separately." },
        { q: "Who should help formalize digital assets in an estate plan?", options: ["A social media friend", "A licensed estate attorney", "An exchange support agent", "Nobody"], answer: 1, explain: "Estate law varies by state." }
      ],
      sources: [{ t: "Praeclaris library: estate and legacy", u: "../learn/#week-47" }]
    },
    {
      id: "c-drill", realm: "citadel", title: "The Family Security Drill", xp: 50, minutes: 45, lesson: 49, wb: "Realm 8 · Family drill",
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
      id: "c-manual", realm: "citadel", title: "Final Trial: Your Crypto Operating Manual", xp: 100, minutes: 60, lesson: 26, boss: true, wb: "Realm 8 · My Crypto Operating Manual",
      brief: "The final trial: turn everything into a written system you can run for years. Praeclaris calls this Observe → Analyze → Build → Improve → Compound. This is what separates a sovereign architect from a speculator.",
      steps: [
        "Collect 'My Crypto Rules' into one document: position size, DCA schedule, bear-market rule, take-profit rule, custody split, platforms used, cost-basis method.",
        "Add a risk register: top 5 risks (platform failure, theft, lost backup, tax mistake, emotional selling) and your control for each.",
        "Add your review rhythm: maintenance checklist, monthly records day, quarterly review, annual recovery drill and legacy update.",
        "Write when you would take profit or change course, decided now, before prices move.",
        "Sign and date it. Review it every quarter."
      ],
      practice: "This mission is free. The workbook's final section is the template.",
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
