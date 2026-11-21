// Praeclaris Field Guide: the reference shelf inside the Crypto Quest (quest/#/guide).
// Built from the Praeclaris "Beginner, Intermediate, Advanced Wallets & Exchanges",
// "Wallet & Exchange Guide", "Safety & Best Practices" and "Crypto Maintenance Checklist"
// sheets, and from "Unraveling Cryptocurrency" (choosing an exchange, opening accounts).
// Names are examples to research, not recommendations. Check availability in your state.

window.CRYPTO_GUIDES = {
  // Cheat-sheet images (assets/guides/). Missions point to these with sheets: ["id"].
  sheets: [
    { id: "vocab-1", t: "Crypto Vocabulary 1–13", src: "vocab-1.jpg" },
    { id: "vocab-2", t: "Crypto Vocabulary 14–26", src: "vocab-2.jpg" },
    { id: "vocab-3", t: "Crypto Vocabulary 27–39", src: "vocab-3.jpg" },
    { id: "vocab-4", t: "Crypto Vocabulary 40–51", src: "vocab-4.jpg" },
    { id: "vocab-trading", t: "Trading Terms", src: "vocab-trading.jpg" },
    { id: "vocab-tax", t: "Tax Terms", src: "vocab-tax.jpg" },
    { id: "wallets-setup", t: "Setup Instructions", src: "wallets-setup.jpg" },
    { id: "wallets-starter", t: "Starter Steps", src: "wallets-starter.jpg" },
    { id: "wallets-exchanges", t: "U.S. Exchanges (on-ramps / off-ramps)", src: "wallets-exchanges.jpg" },
    { id: "wallets-hot", t: "Hot Wallets by Level", src: "wallets-hot.jpg" },
    { id: "wallets-cold", t: "Cold (Hardware) Wallets by Level", src: "wallets-cold.jpg" },
    { id: "safety-top", t: "Top Crypto Safety Practices", src: "safety-top.jpg" },
    { id: "safety-defi", t: "DeFi Safety Tips", src: "safety-defi.jpg" },
    { id: "safety-general", t: "General Best Practices", src: "safety-general.jpg" },
    { id: "maint-beginner", t: "Maintenance Checklist: Beginner", src: "maint-beginner.jpg" },
    { id: "maint-intermediate", t: "Maintenance Checklist: Intermediate", src: "maint-intermediate.jpg" },
    { id: "maint-advanced", t: "Maintenance Checklist: Advanced", src: "maint-advanced.jpg" }
  ],

  // The Praeclaris starter path (Starter Steps sheet), shown as a flow.
  path: [
    { t: "On-ramp", d: "Open a regulated U.S. exchange such as Coinbase or Kraken and complete KYC (ID check)." },
    { t: "Buy fundamentals", d: "Start with the most established assets, BTC or ETH, in small amounts. Many beginners keep these as the core (about half or more) of a crypto slice." },
    { t: "Hot wallet", d: "Move a small amount to a self-custody hot wallet such as MetaMask or Exodus to learn sending and receiving." },
    { t: "Cold storage", d: "Once holdings matter to you, keep long-term coins on a hardware wallet." }
  ],

  // Wallet & Exchange Guide cheat sheet, by level.
  tiers: [
    {
      level: "Beginner", lvl: 1,
      exchanges: [
        { n: "Coinbase", best: "First-time buyers", f: "Simple app, high liquidity, publicly traded U.S. company", start: "Sign up → KYC → link bank → buy", tip: "Turn on an authenticator app or passkey; ignore 'support' emails without your anti-phishing cues." },
        { n: "Gemini", best: "Security and compliance focus", f: "U.S.-regulated (New York trust company), clean interface", start: "Register → verify ID → deposit USD → buy", tip: "Move long-term holdings to cold storage; read exactly what any 'insurance' covers. Crypto isn't FDIC-insured." }
      ],
      hot: { n: "MetaMask", f: "Browser extension and mobile app for Ethereum and EVM chains (Base, Arbitrum, Polygon…). Your gateway to dApps.", tip: "Install only from metamask.io or your official app store; save the seed phrase offline; double-check every site you connect to." },
      cold: { n: "Ledger Nano S Plus", f: "Affordable hardware wallet with a secure chip; supports most major coins through the Ledger Live app.", tip: "Buy direct from ledger.com; initialize it yourself; keep the device and the seed backup in separate places." }
    },
    {
      level: "Intermediate", lvl: 2,
      exchanges: [
        { n: "Kraken", best: "More coins, staking, lower fees", f: "Long track record, advanced trading screen (Kraken Pro), supports XRP, ADA, XLM, HBAR and many altcoins", start: "Create account → verify → fund → trade", tip: "Use a strong unique password, turn on the withdrawal allowlist and global settings lock." },
        { n: "Crypto.com", best: "Mobile-first features", f: "In-app staking, rewards card", start: "Download app → KYC → fund account", tip: "Be cautious with app permissions and read reward terms; promotions change." }
      ],
      hot: { n: "Exodus", f: "Desktop and mobile wallet, many chains including XRP, XLM, ADA and ALGO, built-in swaps and portfolio view.", tip: "Turn on auto-lock and a strong app password; back up the 12 words on paper." },
      cold: { n: "Trezor (Model T, or the newer Safe 3 / Safe 5)", f: "Open-source firmware, touchscreen models, wide coin support through Trezor Suite.", tip: "Consider the Shamir (multi-share) backup option if your model offers it." }
    },
    {
      level: "Advanced", lvl: 3,
      exchanges: [
        { n: "Binance.US", best: "Experienced traders", f: "Low fees, many trading pairs", start: "Create account → verify ID → trade", tip: "Use whitelisting (allowlist) and app-based 2FA; check current state availability first." },
        { n: "DEXs (Uniswap and others)", best: "Swapping from your own wallet", f: "No account; you trade from self-custody against liquidity pools", start: "Connect wallet → choose network → swap", tip: "Verify the URL, start tiny, check slippage and never sign approvals you don't understand." }
      ],
      hot: { n: "Trust Wallet", f: "Mobile, multi-chain, staking and NFTs, integrated DEX swaps.", tip: "Install only from verified app stores; keep only spending amounts in it." },
      cold: { n: "Ledger Nano X (or multisig)", f: "Bluetooth for mobile signing; advanced holders often add multisig across devices.", tip: "Never store the recovery phrase online; test recovery yearly." }
    }
  ],

  // "What to look for" checklists (Unraveling Cryptocurrency, Ch. 3; Mastering Crypto Taxes, 5.1).
  lookfor: [
    {
      t: "Choosing an exchange", items: [
        "Regulated: registered with FinCEN as a money services business and licensed (or chartered) in your state. Check its legal/licenses page.",
        "Easy, fast withdrawals. The exchange holds your money only for trading, so getting it out should be simple.",
        "Security: app-based 2FA or passkeys, withdrawal allowlist, anti-phishing code, most funds in cold storage.",
        "Transparency: a proof-of-reserves report and a clean history (search the name plus 'hack', 'lawsuit', 'withdrawals paused').",
        "Clear fees: trading fee, spread, deposit and withdrawal fees. 'Zero fee' often means a wider spread.",
        "Fair execution: the price you click is the price you get (plus a disclosed spread).",
        "The coins and networks you need, and the payment method you'll use (bank transfer is usually cheapest).",
        "Reachable support with live chat or tickets. Real support never DMs you first.",
        "Tax help: downloadable transaction history (CSV) and Form 1099-DA."
      ]
    },
    {
      t: "Choosing a wallet", items: [
        "Reputation: years in use, open-source or independently audited code, active development.",
        "Supports the exact blockchains you use (a Bitcoin-only wallet can't hold ETH; an EVM wallet can't hold native BTC).",
        "Official download only: the maker's website or the official app store, with the developer name checked.",
        "Clear seed-phrase backup and restore, and a password or auto-lock on the app.",
        "Shows full addresses and transaction details before you sign.",
        "Works with a hardware wallet when you're ready to upgrade.",
        "No custody surprises: a self-custody wallet never asks you to 'verify' your seed phrase online."
      ]
    },
    {
      t: "Red flags: walk away", items: [
        "Guaranteed or very high returns (\"2% a day\").",
        "A stranger, new friend or romantic match introduces the platform.",
        "Pressure to act now, keep it secret or move funds to 'their' app.",
        "Anyone asking for your seed phrase, private key or remote access to your computer.",
        "Withdrawals require paying a 'tax' or 'unlock fee' first.",
        "The site isn't the address you bookmarked, or arrived through an ad or DM."
      ]
    }
  ],

  // Safety & Best Practices sheets.
  safety: [
    { t: "Top crypto safety practices", items: ["Turn on 2FA with an authenticator app (or a passkey) on every exchange account.", "Use hardware wallets (Ledger, Trezor) for long-term holdings.", "Back up seed phrases on paper or metal, stored offline, never online.", "Avoid phishing: double-check URLs and don't click links in emails.", "Bookmark the real sites to avoid fake login pages.", "Never share private keys or seed phrases, not even with 'support'."] },
    { t: "DeFi safety tips", items: ["Use platforms with audited smart contracts and a long track record.", "Start with small test amounts on any new protocol.", "Understand impermanent loss before entering liquidity pools.", "Keep long-term assets in cold storage, not in hot wallets or dApps.", "Review and revoke old token approvals regularly."] },
    { t: "General best practices", items: ["Verify every address before sending crypto: first and last 6 characters.", "Use a trusted VPN on public Wi-Fi, or better, wait until you're home.", "Don't chase high APYs blindly: assess the risk first.", "Consider a multisig wallet or an inheritance plan for large portfolios.", "Crypto is digital freedom, but only if you protect it like your most valuable asset."] }
  ],

  // Crypto Maintenance Checklist (Beginner / Intermediate / Advanced). Interactive in the Field Guide.
  maintenance: [
    {
      level: "Beginner", sub: "Learning and building foundations", lvl: 1,
      groups: [
        { when: "Daily (5 min)", items: ["Open your wallet or exchange app and check balances (look, don't trade).", "Read one short crypto news headline from a reputable outlet."] },
        { when: "Weekly (10 min)", items: ["Review your small DCA purchases (for example $10–20 of BTC/ETH).", "Log new transactions and wallet addresses in your tracker.", "Watch one short educational video or library lesson."] },
        { when: "Monthly (10 min)", items: ["Audit seed-phrase storage: still private, dry, readable?", "Check exchange security: 2FA on, email verified, no unknown logins or devices.", "Compare your portfolio with your planned allocation."] },
        { when: "Yearly (10 min)", items: ["Rebalance back to your written allocation.", "Export CSVs from every exchange and review tax records.", "Set next year's learning goal (DeFi, staking, hardware wallet)."] }
      ]
    },
    {
      level: "Intermediate", sub: "Growing and diversifying", lvl: 2,
      groups: [
        { when: "Daily (5 min)", items: ["Check portfolio performance (BTC, ETH and your other holdings).", "Skim a portfolio dashboard (such as Zapper or DeBank, read-only) for staking earnings."] },
        { when: "Weekly (10 min)", items: ["Run your DCA buys at the amount in your written rules.", "Check staking rewards (for example ADA, ALGO, HBAR) and log them as income.", "Read one quality newsletter."] },
        { when: "Monthly (10 min)", items: ["Rebalance between BTC/ETH, other large caps and smaller altcoins.", "Check yields on staked coins and the risks behind them.", "Move long-term holdings to your cold wallet (test send first)."] },
        { when: "Yearly (10 min)", items: ["Compare results with traditional investments (stocks, 401k).", "Upgrade to a hardware wallet if you haven't yet.", "Reassess goals: shift toward preservation or growth."] }
      ]
    },
    {
      level: "Advanced", sub: "Wealth generation and passive income", lvl: 3,
      groups: [
        { when: "Daily (5 min)", items: ["Monitor DeFi positions and rewards (for example Uniswap, Aave, Curve) and loan health.", "Check key market signals: BTC dominance and ETH gas fees."] },
        { when: "Weekly (10 min)", items: ["Reinvest staking or lending rewards according to your rules.", "Rotate some profits into safer assets (stablecoins, BTC/ETH).", "Take part in governance votes for protocols you use."] },
        { when: "Monthly (10 min)", items: ["Test new tools (layer 2s, aggregators) with small amounts only.", "Review passive income streams: APY stability and risks.", "Check cold-storage devices for firmware updates (from the official app only).", "Revoke unused token approvals."] },
        { when: "Yearly (10 min)", items: ["Full audit of all wallets, seed backups and the inheritance plan.", "Move profits into long-term holdings or cold storage.", "Evaluate diversification beyond crypto (real estate, stocks, businesses).", "Set a capped 1-year DeFi or NFT exploration budget."] }
      ]
    }
  ],

  // ISO 20022 Coins Breakdown sheet, presented with the facts.
  iso: {
    note: "ISO 20022 is a global messaging standard for payment data. ISO doesn't certify, approve or endorse any cryptocurrency, and no coin becomes 'compliant' with it. The coins below are often marketed as 'ISO 20022 coins' because their networks target payments and institutional use. Research each one on its own merits.",
    coins: [
      ["XRP", "XRP Ledger (Ripple)", "Cross-border payments and settlement"],
      ["XLM", "Stellar", "Remittances and low-cost transfers"],
      ["QNT", "Quant", "Interoperability between blockchains (Overledger)"],
      ["ALGO", "Algorand", "Smart contracts, fast finality"],
      ["HBAR", "Hedera", "Enterprise-grade network with a governing council"],
      ["IOTA", "IOTA", "Internet-of-things data and micro-transactions"],
      ["XDC", "XDC Network", "Trade finance; hybrid public/private"],
      ["ADA", "Cardano", "Smart contracts and staking; research-driven"]
    ]
  }
};
