"""Builds the downloadable Crypto Quest workbook (fillable PDF) and transaction-log spreadsheet.

Usage (from the repo root):
    node tools/export-data.js > tools/quest-data.json
    python tools/build_workbook.py

Outputs:
    assets/downloads/Praeclaris-Crypto-Quest-Workbook.pdf
    assets/downloads/Praeclaris-Crypto-Transaction-Log.xlsx

Needs: pip install reportlab openpyxl
Mission text comes from data/crypto-quest.js, so the workbook always matches the quest.
The fill-in pages for each mission are defined in PAGES below.
"""
import json
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table,
                                TableStyle, PageBreak, Flowable, Image, KeepTogether, CondPageBreak)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = json.load(open(os.path.join(ROOT, "tools", "quest-data.json"), encoding="utf-8"))
Q, V, G = DATA["quest"], DATA["vocab"], DATA["guides"]
OUT = os.path.join(ROOT, "assets", "downloads")
os.makedirs(OUT, exist_ok=True)

GOLD = colors.HexColor("#a87700")
GOLD_FILL = colors.HexColor("#f5b800")
GOLD_SOFT = colors.HexColor("#fff4d1")
INK = colors.HexColor("#1a1712")
MUTED = colors.HexColor("#4a443a")
LINE = colors.HexColor("#b9ae98")
BLUE = colors.HexColor("#1d4ed8")
BLUE_SOFT = colors.HexColor("#e6edff")
WARN = colors.HexColor("#8a4200")
WARN_SOFT = colors.HexColor("#fff0d0")
OK = colors.HexColor("#03684b")
OK_SOFT = colors.HexColor("#e0f6ec")
LVL = {"Beginner": colors.HexColor("#0b6680"), "Intermediate": colors.HexColor("#6d28d9"), "Advanced": colors.HexColor("#a21caf")}

# Fonts: Arial (Windows) covers arrows and math signs; falls back to Helvetica elsewhere.
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.fonts import addMapping
SANS, SANSB, SANSI = "Helvetica", "Helvetica-Bold", "Helvetica-Oblique"
_fd = os.path.join(os.environ.get("WINDIR", "C:/Windows"), "Fonts")
if os.path.exists(os.path.join(_fd, "arial.ttf")):
    for name, f in [("Body", "arial.ttf"), ("Body-Bold", "arialbd.ttf"), ("Body-Italic", "ariali.ttf"), ("Body-BoldItalic", "arialbi.ttf")]:
        pdfmetrics.registerFont(TTFont(name, os.path.join(_fd, f)))
    addMapping("Body", 0, 0, "Body"); addMapping("Body", 1, 0, "Body-Bold"); addMapping("Body", 0, 1, "Body-Italic"); addMapping("Body", 1, 1, "Body-BoldItalic")
    SANS, SANSB, SANSI = "Body", "Body-Bold", "Body-Italic"

W, H = letter
M = 0.7 * inch
CW = W - 2 * M  # content width

ss = {
    "h0": ParagraphStyle("h0", fontName="Times-Bold", fontSize=30, leading=36, textColor=INK, alignment=TA_CENTER),
    "h1": ParagraphStyle("h1", fontName="Times-Bold", fontSize=22, leading=27, textColor=INK, spaceAfter=6),
    "h2": ParagraphStyle("h2", fontName=SANSB, fontSize=13.5, leading=17, textColor=INK, spaceBefore=8, spaceAfter=4),
    "h3": ParagraphStyle("h3", fontName=SANSB, fontSize=10.5, leading=13, textColor=GOLD, spaceBefore=6, spaceAfter=3),
    "p": ParagraphStyle("p", fontName=SANS, fontSize=9.6, leading=13.2, textColor=INK, spaceAfter=4),
    "sm": ParagraphStyle("sm", fontName=SANS, fontSize=8.4, leading=11, textColor=MUTED),
    "cell": ParagraphStyle("cell", fontName=SANS, fontSize=8.4, leading=10.4, textColor=INK),
    "cellb": ParagraphStyle("cellb", fontName=SANSB, fontSize=8.4, leading=10.4, textColor=INK),
    "eyebrow": ParagraphStyle("eb", fontName=SANSB, fontSize=8, leading=10, textColor=GOLD),
    "center": ParagraphStyle("c", fontName=SANS, fontSize=10.5, leading=15, textColor=MUTED, alignment=TA_CENTER),
}

_n = [0]


def fid(prefix="f"):
    _n[0] += 1
    return "%s%d" % (prefix, _n[0])


def clean(s):
    s = str(s).replace("✓", "Y").replace("✗", "N").replace("☐", "[  ]").replace("★", "*")
    return "".join(ch for ch in s if ord(ch) < 0x2600 or 0x2190 <= ord(ch) <= 0x21FF).replace("  ", " ")


def esc(s):
    return clean(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


# ---------- fillable flowables ----------
class Field(Flowable):
    """A labeled fill-in line (single or multi-line) with a real PDF form field over it."""

    def __init__(self, label="", lines=1, width=None, label_w=None):
        super().__init__()
        self.label, self.lines = clean(label), lines
        self.stack = bool(label) and lines == 1 and len(self.label) > 38  # long label: put it above the line
        self.width = width or CW
        self.label_w = label_w if label_w is not None else (pdfmetrics.stringWidth(self.label, SANSB, 8.6) + 10 if label and lines == 1 and not self.stack else 0)
        self.lh = 17
        self.height = (12 if (label and (lines > 1 or self.stack)) else 0) + self.lh * lines + 3

    def draw(self):
        c = self.canv
        y_top = self.height
        x0 = 0
        if self.label and self.lines == 1 and not self.stack:
            c.setFont(SANSB, 8.6); c.setFillColor(INK)
            c.drawString(0, 6, self.label)
            x0 = self.label_w
        elif self.label:
            c.setFont(SANSB, 8.6); c.setFillColor(INK)
            c.drawString(0, y_top - 9, self.label)
            y_top -= 12
        c.setStrokeColor(LINE); c.setLineWidth(0.6)
        for i in range(self.lines):
            y = y_top - self.lh * (i + 1) + 3
            c.line(x0, y, self.width, y)
        h = self.lh * self.lines
        c.acroForm.textfield(name=fid(), x=x0, y=3, width=self.width - x0, height=h - 1, relative=True,
                             borderWidth=0, fillColor=None, borderColor=None, fontSize=9 if self.lines == 1 else 8.5,
                             fieldFlags="multiline" if self.lines > 1 else "", textColor=INK)


class Check(Flowable):
    """A checkbox with wrapped text beside it."""

    def __init__(self, text, width=None):
        super().__init__()
        self.width = width or CW
        self.p = Paragraph(clean(text), ss["p"])
        self.pw, self.ph = self.p.wrap(self.width - 20, 1000)
        self.height = max(14, self.ph) + 2

    def draw(self):
        c = self.canv
        c.setStrokeColor(LINE); c.setLineWidth(0.8); c.setFillColor(colors.white)
        c.rect(0, self.height - 13, 11, 11, stroke=1, fill=1)
        c.acroForm.checkbox(name=fid("c"), x=0, y=self.height - 13, size=11, relative=True, borderColor=LINE,
                            fillColor=colors.white, buttonStyle="check", textColor=OK, borderWidth=0.8)
        self.p.drawOn(c, 18, self.height - self.ph - 1)


class Cell(Flowable):
    """A form field sized to fill a table cell."""

    def __init__(self, w, h=15):
        super().__init__()
        self.width, self.height = w, h

    def draw(self):
        self.canv.acroForm.textfield(name=fid("t"), x=0, y=0, width=self.width, height=self.height, relative=True,
                                     borderWidth=0, fillColor=None, borderColor=None, fontSize=8, textColor=INK)


def fill_table(head, nrows, widths=None, row_h=17, first_col=None):
    """A grid of fill-in cells. first_col: optional list of fixed labels for column 1."""
    n = len(head)
    widths = widths or [CW / n] * n
    data = [[Paragraph(esc(h), ss["cellb"]) for h in head]]
    for r in range(nrows):
        row = []
        for ci, w in enumerate(widths):
            if first_col and ci == 0:
                row.append(Paragraph(esc(first_col[r]), ss["cell"]))
            else:
                row.append(Cell(w - 6, row_h - 4))
        data.append(row)
    t = Table(data, colWidths=widths, rowHeights=[None] + [row_h] * nrows, repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), GOLD_SOFT), ("GRID", (0, 0), (-1, -1), 0.5, LINE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("LEFTPADDING", (0, 0), (-1, -1), 3), ("RIGHTPADDING", (0, 0), (-1, -1), 3),
        ("TOPPADDING", (0, 1), (-1, -1), 1), ("BOTTOMPADDING", (0, 1), (-1, -1), 1)]))
    return t


def ref_table(head, rows, widths=None, shade=GOLD_SOFT):
    n = len(head)
    widths = widths or [CW / n] * n
    data = [[Paragraph(esc(h), ss["cellb"]) for h in head]] + [[Paragraph(esc(c), ss["cell"]) for c in r] for r in rows]
    t = Table(data, colWidths=widths, repeatRows=1)
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), shade), ("GRID", (0, 0), (-1, -1), 0.5, LINE),
                           ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 4), ("RIGHTPADDING", (0, 0), (-1, -1), 4)]))
    return t


def box(flowables, bg=WARN_SOFT, border=WARN):
    t = Table([[flowables]], colWidths=[CW])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), bg), ("LINEBEFORE", (0, 0), (0, -1), 3, border),
                           ("LEFTPADDING", (0, 0), (-1, -1), 9), ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                           ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6)]))
    return t


def P(t, s="p"):
    return Paragraph(clean(t), ss[s])


def checks(items):
    return [Check(esc(i)) for i in items]


# ---------- fill-in pages per mission (keyed by mission id) ----------
def L(label, n=1):
    return Field(label, n)


PAGES = {
    "c-why": lambda: [L("Strength 1"), L("Strength 2"), L("Danger 1"), L("Danger 2"), L("Why am I learning about crypto?", 3)],
    "c-cashflow": lambda: [fill_table(["Bucket", "Last month", "Target"], 6, [2.8 * inch, 2 * inch, CW - 4.8 * inch],
                                      first_col=["Income (after tax)", "Needs", "Wants", "Debt payments", "Savings", "= Cash flow (income − all spending)"]),
                           Spacer(1, 6), L("Two categories I can trim"), L("Truly spare each month: $")],
    "c-emergency": lambda: [L("Starter target: $"), L("Account it lives in"), L("Automatic transfer: $ ___ every"), L("Date I expect to reach the target"),
                            L("My rule for using it", 2)],
    "c-slice": lambda: [P("These rules also go on the <b>My Crypto Rules</b> page at the front of this workbook."),
                        L("Most I could lose without changing my life: $"), L("Most I'll put in over the next 12 months: $"),
                        L("Monthly amount (from cash flow only): $"), L("Core vs. explore split (e.g. 70% BTC/ETH / 30% other)"),
                        L("I will never use", 2)],
    "c-notebook": lambda: [L("Blockchain in one sentence (notebook analogy)", 2), L("One thing a blockchain is good for"), L("One thing it can't do")],
    "c-bitcoin": lambda: [L("Rule 1: block time"), L("Rule 2: supply cap"), L("Rule 3: halving"),
                          L("Today's BTC price: $"), L("$20 buys ______ BTC = ______ sats"), L("Next halving (estimate)")],
    "c-types": lambda: [fill_table(["Asset", "Coin / token / stablecoin", "One risk"], 4, [1.6 * inch, 2.2 * inch, CW - 3.8 * inch],
                                   first_col=["BTC", "ETH", "USDC", "A meme token on Solana"]),
                        Spacer(1, 6), L("What backs a fiat-backed stablecoin?", 2), L("Why 'ISO 20022 coin' is a marketing label", 2)],
    "c-marketcap": lambda: [P("<b>Coin research card</b>"), fill_table(["", "Bitcoin (BTC)", "Smaller coin: ______"], 7, [2.2 * inch, 2.2 * inch, CW - 4.4 * inch],
                            first_col=["Price", "Market cap", "24h volume", "Circulating supply", "Max supply", "Top 10 wallets hold (%)", "What it's for (whitepaper)"]),
                            Spacer(1, 6), L("Red flag I found (if any)", 2)],
    "c-explorer": lambda: [P("<b>Explorer scavenger hunt</b> (mempool.space)"), L("Latest block height"), L("Transactions in that block"), L("Time mined"),
                           L("Minutes since the previous block"), L("A transaction's fee"), L("Its number of confirmations")],
    "c-vocab": lambda: [fill_table(["Word", "Meaning in my own words", "My own example"], 8, [1.5 * inch, 2.7 * inch, CW - 4.2 * inch]),
                        Spacer(1, 6), L("Words mastered in the flashcard drill (count)")],
    "c-masterkeys": lambda: checks(["Password manager installed, long unique master passphrase", "Email has a new unique password",
                                    "Email uses an authenticator app or passkey (not SMS)", "Backup codes stored offline",
                                    "Separate email for financial/crypto accounts (optional)"]),
    "c-simswap": lambda: checks(["Port-out PIN / number lock set with my carrier", "Account PIN for changes set",
                                 "Crypto and email 2FA moved off SMS", "Phone number removed from public profiles"]),
    "c-scams": lambda: [P("<b>The six red flags</b> (write them from memory)")] + [L("%d." % i) for i in range(1, 7)] +
                       [L("Family member I told about pig butchering and crypto ATM scams"), Check("ic3.gov bookmarked")],
    "c-freeze": lambda: [fill_table(["Bureau", "Frozen (date)", "PIN / login saved in password manager"], 3, [1.8 * inch, 1.8 * inch, CW - 3.6 * inch],
                                    first_col=["Equifax", "Experian", "TransUnion"])],
    "c-choose": lambda: [P("<b>Exchange scorecard</b> (write Y or N for each)"),
                         fill_table(["Check", "Exchange 1: ____", "Exchange 2: ____", "Exchange 3: ____"], 10, [2.5 * inch] + [(CW - 2.5 * inch) / 3] * 3,
                                    first_col=["Licensed in my state", "Years operating", "Proof of reserves", "App 2FA / passkey", "Withdrawal allowlist",
                                               "Fee on a $25 bank buy (incl. spread)", "Has the coins I need", "Search: hack / withdrawals paused",
                                               "Support I can reach", "Score"]),
                         Spacer(1, 6), L("My choice and why", 2)],
    "c-secureacct": lambda: checks(["Signed up on the official site/app (typed the address myself)", "Email verified (checked the sender domain)",
                                    "Identity verification (KYC) completed", "Authenticator app or passkey on; SMS removed if allowed",
                                    "Anti-phishing code set", "Withdrawal allowlist on", "Bank account linked (ACH)", "Only my devices are logged in"]) +
                            [L("Exchange"), L("Where its settings are, if not opened yet", 2)],
    "c-orders": lambda: [L("Market order means"), L("Limit order means"), L("Stop loss means"), L("Fee for a $100 market order: $"),
                         L("Simple-screen price vs. market price: spread ≈ %"), L("Paper limit order: buy BTC at $ ______ (5% below today). Filled in a week? Y / N")],
    "c-firstbuy": lambda: [P("<b>First buy record</b> (also add it to your transaction log)"), L("Date"), L("Asset"), L("Amount received"),
                           L("Price per coin: $"), L("Fee: $"), L("Total paid (= cost basis): $"), L("Paper-buy check-in after 30 days: value $")],
    "c-dca": lambda: [L("Amount: $ ______ every ______ (schedule)"), L("My bear-market rule", 2),
                      fill_table(["Week", "Date", "Price", "Amount ($)", "Coins bought"], 4, first_col=["1", "2", "3", "4"]),
                      Spacer(1, 4), L("Total spent $ ______ ÷ total coins ______ = average cost $")],
    "c-offramp": lambda: [P("<b>Sale record</b>"), L("Date sold"), L("Amount sold"), L("Proceeds after fee: $"), L("Lot sold (date bought, cost)"),
                          L("Gain or loss: $ ______  Short-term / Long-term"), L("My take-profit rule", 2)],
    "c-custody": lambda: [fill_table(["Where I hold crypto", "Custodial or self-custody", "Pro", "Con"], 4)],
    "c-pickwallet": lambda: [fill_table(["Coin I hold or plan to hold", "Its blockchain", "Wallet that supports it"], 4),
                             Spacer(1, 6), L("Stays on the exchange (amount)"), L("Goes to my hot wallet (amount)"), L("Hot wallet I chose"),
                             L("I'll buy a hardware wallet when my holdings reach $")],
    "c-wallet": lambda: [box([P("<b>Do NOT write your seed phrase in this workbook or any digital file.</b> Write it only on the paper card or metal plate you keep offline.")]),
                         Spacer(1, 6)] + checks(["Downloaded from the official site/app store; developer name checked", "Created a NEW wallet (not import)",
                                                 "Seed words written on paper, numbered, in order (no photo, no cloud)", "Words confirmed in the app",
                                                 "Paper stored somewhere private, dry and fireproof if possible"]) +
                        [L("Wallet app"), L("Where the paper backup is kept (a hint only you understand)")],
    "c-receive": lambda: [L("Test network"), L("Faucet used"), L("Test ETH received"), L("Transaction ID (first/last 6 characters)"),
                          L("Confirmations seen"), L("Gas fee on my practice send")],
    "c-testsend": lambda: checks(["Address copied from MY wallet's Receive screen", "First 6 and last 6 characters match",
                                  "Network matches on both sides", "Memo / destination tag added (if the coin needs one)",
                                  "Tiny test sent and arrived", "Looked it up on a block explorer", "Logged as a transfer (not a sale)"]) +
                          [L("Date / coin / network / fee")],
    "c-recovery": lambda: [fill_table(["Date of drill", "Wallet", "Same address appeared? (Y/N)", "Next drill due"], 4)],
    "c-log": lambda: [P("Use the <b>Transaction Log</b> pages at the back of this workbook or the downloadable Excel log."),
                      L("Exchange CSVs downloaded and saved to (folder)"), L("Monthly records day (date each month)")],
    "c-tax": lambda: [fill_table(["My transaction", "Taxable? (Y/N)", "Type (gain/loss, income, none)", "Turns long-term on"], 6,
                                 [2.6 * inch, 1 * inch, 1.9 * inch, CW - 5.5 * inch])],
    "c-basis": lambda: [P("<b>Practice with Maya's numbers:</b> sold 1 ETH for $3,500. Lots: A $2,000 (Jan 2025), B $3,800 (Jun 2025), C $2,600 (Mar 2026)."),
                        fill_table(["Method", "Lot sold", "Proceeds − basis", "Gain / loss", "Short or long?"], 3, first_col=["FIFO", "HIFO", "Specific ID: newest"]),
                        Spacer(1, 6), P("<b>My lots</b>"),
                        fill_table(["Lot", "Date bought", "Asset", "Amount", "Cost incl. fees", "Wallet / account"], 6),
                        Spacer(1, 4), L("Method I'll use (and confirmed with)")],
    "c-income": lambda: [fill_table(["Date received", "Source (staking, airdrop, pay…)", "Asset", "Amount", "USD value (= income and basis)"], 7)],
    "c-filing": lambda: checks(["Listed every exchange and wallet used this year", "Downloaded every CSV into a 'Tax [year]' folder",
                                "Compared Form 1099-DA with my own log", "Imported into crypto tax software or gave to my preparer",
                                "Matched transfers between my own wallets", "Added missing cost basis for coins moved in from self-custody",
                                "Reviewed loss-harvesting opportunities before Dec 31", "Answered the Form 1040 digital asset question",
                                "Booked a review with a tax professional"]),
    "c-etf": lambda: [fill_table(["Goal", "ETF or direct?", "Why"], 3, [2 * inch, 1.4 * inch, CW - 3.4 * inch])],
    "c-contracts": lambda: [L("Current gas price (gwei)"), L("21,000 × ____ gwei = ______ ETH ≈ $"), L("Gas is like… (my analogy)"),
                            L("One thing a smart contract can do"), L("One way it can fail")],
    "c-swap": lambda: checks(["Typed the DEX address myself", "Wallet and DEX on the same network", "Rate and price impact checked",
                              "Slippage small (e.g. 0.5%)", "Approval limited to the amount I'm swapping", "Site name checked in the wallet prompt",
                              "Logged the swap as a taxable event"]),
    "c-stable": lambda: [L("Stablecoin"), L("Issuer"), L("What backs it"), L("How often reserves are reported"), L("Who supervises the issuer")],
    "c-staking": lambda: [L("Coin"), L("Platform or wallet"), L("APY / commission"), L("Unstaking time / lock-up"),
                          L("1-year estimate: amount × APY × (1 − commission) ="), L("My staking rule", 2)],
    "c-l2": lambda: [L("Networks my exchange supports for ETH/USDC withdrawals", 2), L("One benefit of layer 2s"), L("One risk of bridges"), L("My network rule", 2)],
    "c-defi": lambda: [L("Approvals found in revoke.cash (count)"), L("Liquidation practice: $1,800 ÷ $2,500 = ____%  Safe? "), L("My DeFi rule", 3)],
    "c-rwa": lambda: [L("Product looked at"), L("Who holds the real asset?"), L("What rights do I have?"), L("Who can freeze or redeem it?")],
    "c-hardware": lambda: [L("Device (bought direct from)"), L("Backup 1 location (hint)"), L("Backup 2 location (hint)"), L("Test send date"),
                           L("Recovery drill date"), L("Split: on exchange ____% / hot wallet ____% / cold ____%")],
    "c-privacy": lambda: checks(["No balances, screenshots or named addresses posted", "Separate financial email in use",
                                 "Phone number removed from public profiles", "Requested removal from one people-search site", "Location tagging off"]),
    "c-failures": lambda: [fill_table(["Failure", "What failed", "Rule that would have protected me"], 4, [1.4 * inch, 2.4 * inch, CW - 3.8 * inch],
                                      first_col=["Mt. Gox", "Celsius", "FTX", "Bybit"]),
                           Spacer(1, 6), L("Most I hold on any single platform: $ / %")],
    "c-maintenance": lambda: [P("My level (circle one): Beginner / Intermediate / Advanced. The full checklists are in the Field Guide section at the back.")] +
                             checks(["Weekly reminder set", "Monthly reminder set (records day + security check)", "Yearly reminder set (recovery drill, rebalance, tax export)"]),
    "c-legacy": lambda: [P("<b>Legacy letter outline</b> (placeholders only: a map, never the keys)"), L("Platforms and wallet types I use", 2),
                         L("Where the backups are (described for my trusted person)", 2), L("Trusted person"), L("Estate attorney"), L("Reviewed on (date)")],
    "c-drill": lambda: [L("Family code word agreed (don't write the word itself)"), L("People who turned on app-based MFA"), L("Drill date")],
    "c-manual": lambda: [P("Turn to <b>My Crypto Operating Manual</b> at the end of this workbook.")],
}


# ---------- page decorations ----------
def on_page(c, doc):
    c.saveState()
    if doc.page > 1:
        c.setStrokeColor(GOLD_FILL); c.setLineWidth(2); c.line(M, H - 0.45 * inch, W - M, H - 0.45 * inch)
        c.setFont(SANSB, 7.5); c.setFillColor(GOLD)
        c.drawString(M, H - 0.38 * inch, "PRAECLARIS · CRYPTO QUEST WORKBOOK")
        c.setFont(SANS, 7.5); c.setFillColor(MUTED)
        c.drawRightString(W - M, H - 0.38 * inch, "Keys to the Kingdom")
        c.drawString(M, 0.4 * inch, "Education only. Not financial, investment, tax or legal advice. Never write a seed phrase or password in this workbook.")
        c.drawRightString(W - M, 0.4 * inch, str(doc.page))
    c.restoreState()


def realm_banner(i, r):
    col = LVL.get(r["level"], GOLD)
    t = Table([[P('<font color="white"><b>REALM %d · %s</b></font>' % (i + 1, r["level"].upper()), "eyebrow")],
               [Paragraph('<font color="white">%s</font>' % esc(r["name"]), ParagraphStyle("rb", fontName="Times-Bold", fontSize=21, leading=25))],
               [Paragraph('<font color="#f5e6b8"><i>%s</i></font>' % esc(r["tagline"]), ss["p"])]], colWidths=[CW])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#111111")), ("LINEBEFORE", (0, 0), (0, -1), 6, col),
                           ("LEFTPADDING", (0, 0), (-1, -1), 14), ("TOPPADDING", (0, 0), (0, 0), 12), ("BOTTOMPADDING", (0, -1), (-1, -1), 12)]))
    return t


def build_pdf():
    path = os.path.join(OUT, "Praeclaris-Crypto-Quest-Workbook.pdf")
    doc = BaseDocTemplate(path, pagesize=letter, leftMargin=M, rightMargin=M, topMargin=0.7 * inch, bottomMargin=0.65 * inch,
                          title="Praeclaris Crypto Quest Workbook", author="Praeclaris", subject="Keys to the Kingdom: fill-in workbook")
    doc.addPageTemplates([PageTemplate(id="p", frames=[Frame(M, 0.65 * inch, CW, H - 1.35 * inch, id="f")], onPage=on_page)])
    s = []

    # Cover
    s.append(Spacer(1, 0.6 * inch))
    s.append(Image(os.path.join(ROOT, "assets", "logo.png"), width=1.9 * inch, height=1.9 * inch))
    s.append(Spacer(1, 0.35 * inch))
    s.append(P("THE PRAECLARIS CRYPTO QUEST", "center"))
    s.append(Spacer(1, 6))
    s.append(P("Keys to the Kingdom", "h0"))
    s.append(Spacer(1, 4))
    s.append(P("Workbook", "h0"))
    s.append(Spacer(1, 16))
    s.append(P("Your fill-in companion for all %d missions across 8 realms: from your first question about crypto to a written, "
               "secure, well-documented crypto system." % len(Q["missions"]), "center"))
    s.append(Spacer(1, 0.35 * inch))
    s.append(Field("Name", 1, width=CW))
    s.append(Field("Started on", 1, width=CW))
    s.append(Spacer(1, 0.3 * inch))
    s.append(P("Play the quest free at <b>praeclaris.com/quest</b>. Type into this PDF on screen, or print it and write by hand.", "center"))
    s.append(PageBreak())

    # How to use
    s.append(P("How to use this workbook", "h1"))
    s.append(P("Each mission in the online quest has a matching section here, labeled with the same realm and page name you'll see in the quest "
               "(\"Workbook page: Realm 4 · Exchange scorecard\"). As you play: read the briefing and the <b>Show me how</b> walkthrough online, "
               "then do the steps and record your answers here. Tick the checkboxes as you go."))
    s.append(P("You can type directly into this PDF in most PDF readers (Adobe Acrobat Reader, Microsoft Edge, Chrome, Preview) and save it, or print it."))
    s.append(Spacer(1, 6))
    s.append(box([P("<b>The golden rule.</b> Never write your seed phrase (recovery words), private keys, passwords, 2FA backup codes or "
                    "account numbers in this workbook, on your computer, in email or in the cloud. This workbook records <i>decisions and records</i>, never <i>keys</i>. "
                    "Your seed phrase lives only on paper or metal that you store offline.")]))
    s.append(Spacer(1, 10))
    s.append(P("The quest map", "h2"))
    rows = []
    for i, r in enumerate(Q["realms"]):
        ms = [m for m in Q["missions"] if m["realm"] == r["id"]]
        rows.append(["%d. %s" % (i + 1, r["name"]), r["level"], ", ".join(m["title"] for m in ms)])
    s.append(ref_table(["Realm", "Level", "Missions"], rows, [1.9 * inch, 0.95 * inch, CW - 2.85 * inch]))
    s.append(Spacer(1, 8))
    s.append(P("The Praeclaris framework", "h2"))
    s.append(P("<b>Observe</b> (understand reality) → <b>Analyze</b> (spot opportunities and risks) → <b>Build</b> (create systems) → "
               "<b>Improve</b> (refine continuously) → <b>Compound</b> (let time and consistency work). "
               "<i>Protect capital first. Grow capital second.</i>"))
    s.append(PageBreak())

    # My Crypto Rules
    s.append(P("My Crypto Rules", "h1"))
    s.append(P("Fill this page in as the quest asks. These rules, written while you're calm, protect you when prices move fast.", "sm"))
    for lab, n in [("Most I could lose without changing my life", 1), ("Position size: no more than ____% of investable money, only from positive cash flow", 1),
                   ("Core vs. explore split", 1), ("DCA: amount and schedule", 1), ("Bear-market rule", 2), ("Take-profit rule", 2),
                   ("Custody split: exchange / hot wallet / cold storage", 1), ("Seed phrase rule", 1), ("Cost-basis method", 1),
                   ("Staking / DeFi / network rules", 2), ("I will never…", 2)]:
        s.append(Field(lab, n))
    s.append(Spacer(1, 6))
    s.append(Field("Signed", 1, width=CW / 2))
    s.append(PageBreak())

    # Realms
    for i, r in enumerate(Q["realms"]):
        s.append(realm_banner(i, r))
        s.append(Spacer(1, 8))
        s.append(P('<i>%s</i>' % esc(r.get("story", "")), "p"))
        s.append(Spacer(1, 4))
        for m in [m for m in Q["missions"] if m["realm"] == r["id"]]:
            s.append(CondPageBreak(2.3 * inch))
            head = [P(esc(m.get("wb", m["title"])).upper(), "eyebrow"), P(esc(m["title"]) + ('  <font size="8" color="#4a443a">%d min · %d XP</font>' % (m["minutes"], m["xp"])), "h2")]
            s.append(KeepTogether(head + [P(esc(m["brief"]), "sm")]))
            if m.get("words"):
                s.append(P("<b>Words:</b> " + ", ".join(esc(w) for w in m["words"]), "sm"))
            s.append(Spacer(1, 4))
            s.append(P("Mission steps", "h3"))
            s.extend(checks(m["steps"]))
            fn = PAGES.get(m["id"])
            if fn:
                s.append(P("Your answers", "h3"))
                s.extend(fn())
            s.append(Spacer(1, 4))
            s.append(P("<font color='#8a4200'><b>Protect:</b></font> " + esc(m["protect"]), "sm"))
            s.append(Field("Completed on (date) and how (for real / practice)", 1, width=CW))
            s.append(Spacer(1, 10))
        s.append(PageBreak())

    # Transaction log pages
    for k in range(3):
        s.append(P("Transaction Log" + (" (continued)" if k else ""), "h1"))
        if not k:
            s.append(P("One row per buy, sell, swap, transfer, reward or fee. Types: Buy, Sell, Swap, Transfer, Income, Spend, Gift. "
                       "Transfers between your own wallets aren't taxable but keep cost basis traceable.", "sm"))
            s.append(Spacer(1, 4))
        s.append(fill_table(["Date", "Type", "Asset", "Amount", "USD value", "Fee", "From", "To", "Notes"], 26 if k else 24,
                            [0.72 * inch, 0.6 * inch, 0.5 * inch, 0.78 * inch, 0.72 * inch, 0.5 * inch, 0.85 * inch, 0.85 * inch, CW - 5.52 * inch], row_h=19))
        s.append(PageBreak())

    # My Crypto Operating Manual
    s.append(P("My Crypto Operating Manual", "h1"))
    s.append(P("The final trial. Gather your rules, risks and rhythm into one system. Review it every quarter.", "sm"))
    s.append(P("1. My rules", "h2"))
    s.append(P("Copied from the My Crypto Rules page (position size, DCA, bear-market rule, take-profit rule, custody split, platforms, cost-basis method)."))
    s.append(Field("Platforms and wallets I use", 2))
    s.append(P("2. Risk register", "h2"))
    s.append(fill_table(["Risk", "Likelihood (L/M/H)", "My control"], 6, [2.2 * inch, 1.3 * inch, CW - 3.5 * inch],
                        first_col=["Platform failure", "Theft / phishing", "Lost or damaged backup", "Tax mistake", "Emotional selling / buying", "Other: ______"]))
    s.append(P("3. Review rhythm", "h2"))
    s.extend(checks(["Maintenance checklist (my level) in my calendar", "Monthly records day", "Quarterly review of this manual",
                     "Annual recovery drill and legacy-letter update", "Annual tax export and review with a professional"]))
    s.append(P("4. Decisions made now, before prices move", "h2"))
    s.append(Field("I take profit when…", 2))
    s.append(Field("I change course or stop when…", 2))
    s.append(Spacer(1, 8))
    s.append(Field("Signed and dated", 1, width=CW))
    s.append(PageBreak())

    # Field guide reference
    s.append(P("Field Guide: exchanges and wallets by level", "h1"))
    s.append(P("Names are examples to research, not recommendations. Check availability in your state and current models.", "sm"))
    rows = []
    for t in G["tiers"]:
        rows.append([t["level"], "; ".join("%s (%s)" % (e["n"], e["best"]) for e in t["exchanges"]), t["hot"]["n"], t["cold"]["n"]])
    s.append(ref_table(["Level", "Exchanges", "Hot wallet", "Cold wallet"], rows, [0.95 * inch, 2.8 * inch, 1.3 * inch, CW - 5.05 * inch]))
    s.append(Spacer(1, 8))
    s.append(P("The starter path", "h2"))
    for p in G["path"]:
        s.append(P("<b>%s:</b> %s" % (esc(p["t"]), esc(p["d"]))))
    for l in G["lookfor"]:
        s.append(P(esc(l["t"]), "h2"))
        for it in l["items"]:
            s.append(P("• " + esc(it)))
    s.append(PageBreak())
    s.append(P("Safety and maintenance", "h1"))
    for sf in G["safety"]:
        s.append(P(esc(sf["t"]), "h2"))
        for it in sf["items"]:
            s.append(P("• " + esc(it)))
    for lv in G["maintenance"]:
        s.append(CondPageBreak(2 * inch))
        s.append(P("Maintenance checklist: %s (%s)" % (lv["level"], lv["sub"]), "h2"))
        for g in lv["groups"]:
            s.append(P(esc(g["when"]), "h3"))
            s.extend(checks(g["items"]))
    s.append(PageBreak())

    # Glossary
    s.append(P("Crypto Vocabulary", "h1"))
    s.append(P("All %d words from the Vocab Vault. Play the flashcard drill at praeclaris.com/quest/#/vocab." % len(V["terms"]), "sm"))
    for k, name in V["cats"].items():
        ts = sorted([t for t in V["terms"] if t["c"] == k], key=lambda t: t["t"].lower())
        s.append(P(esc(name), "h2"))
        data = [[Paragraph("<b>%s</b>" % esc(t["t"]), ss["cell"]), Paragraph(esc(t["d"]) + '<br/><font color="#4a443a"><i>e.g. ' + esc(t["ex"]) + "</i></font>", ss["cell"])] for t in ts]
        tb = Table(data, colWidths=[1.45 * inch, CW - 1.45 * inch])
        tb.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
                                ("LEFTPADDING", (0, 0), (-1, -1), 3), ("TOPPADDING", (0, 0), (-1, -1), 3), ("BOTTOMPADDING", (0, 0), (-1, -1), 3)]))
        s.append(tb)

    doc.build(s)
    return path


def build_xlsx():
    from openpyxl import Workbook
    from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
    from openpyxl.worksheet.datavalidation import DataValidation
    from openpyxl.utils import get_column_letter

    wb = Workbook()
    gold = PatternFill("solid", fgColor="F5B800")
    soft = PatternFill("solid", fgColor="FFF4D1")
    ex = PatternFill("solid", fgColor="EEF2FA")
    bold = Font(bold=True)
    thin = Side(style="thin", color="B9AE98")

    def header(ws, cols, widths):
        for i, (c, w) in enumerate(zip(cols, widths), 1):
            cell = ws.cell(row=1, column=i, value=c)
            cell.font = Font(bold=True, color="1A1406"); cell.fill = gold
            cell.alignment = Alignment(wrap_text=True, vertical="center"); cell.border = Border(bottom=thin)
            ws.column_dimensions[get_column_letter(i)].width = w
        ws.freeze_panes = "A2"
        ws.row_dimensions[1].height = 30

    ws = wb.active
    ws.title = "Start here"
    lines = [
        ("Praeclaris Crypto Transaction Log", Font(bold=True, size=16)),
        ("Companion to the Records Hall in the Praeclaris Crypto Quest (praeclaris.com/quest).", None),
        ("", None),
        ("How to use it", bold),
        ("1. Transactions: one row for every buy, sell, swap, transfer, income, spend or gift. Blue rows are examples: delete them when you start.", None),
        ("2. Lots & Gains: when you sell or swap, record which purchase (lot) you disposed of. Gain, holding days and short/long-term calculate automatically.", None),
        ("3. Income: staking rewards, airdrops, mining and crypto pay. The USD value on the day received is income AND the cost basis of those coins.", None),
        ("4. Wallets: every exchange and wallet you use, so nothing is forgotten at tax time.", None),
        ("", None),
        ("Never put a seed phrase, private key, password or 2FA code in this file.", Font(bold=True, color="8A4200")),
        ("Education only. Not tax advice. U.S. rules: since 2025 cost basis is tracked wallet by wallet; consult a licensed tax professional.", Font(italic=True, color="4A443A")),
    ]
    for r, (t, f) in enumerate(lines, 1):
        c = ws.cell(row=r, column=1, value=t)
        if f: c.font = f
    ws.column_dimensions["A"].width = 130

    ws = wb.create_sheet("Transactions")
    cols = ["Date", "Type", "Asset", "Amount", "Price per coin (USD)", "USD value", "Fee (USD)", "Platform / wallet (from)", "To", "Taxable?", "Transaction ID / reference", "Notes"]
    header(ws, cols, [12, 12, 9, 14, 14, 13, 11, 22, 22, 10, 26, 30])
    dv = DataValidation(type="list", formula1='"Buy,Sell,Swap,Transfer,Income,Spend,Gift,Fee"', allow_blank=True); ws.add_data_validation(dv); dv.add("B2:B2000")
    dv2 = DataValidation(type="list", formula1='"Yes,No"', allow_blank=True); ws.add_data_validation(dv2); dv2.add("J2:J2000")
    sample = [["2026-03-06", "Buy", "BTC", 0.00026545, 90450, None, 0.99, "Bank", "Exchange A", "No", "", "EXAMPLE: first $25 buy"],
              ["2026-04-02", "Transfer", "BTC", 0.00054645, 89850, None, 0.40, "Exchange A", "Hardware wallet", "No", "", "EXAMPLE: test send first"],
              ["2026-05-15", "Income", "ETH", 0.0012, 3200, None, 0, "Staking", "Exchange A", "Yes", "", "EXAMPLE: staking reward = income"]]
    for r, row in enumerate(sample, 2):
        for c, v in enumerate(row, 1):
            cell = ws.cell(row=r, column=c, value=v); cell.fill = ex
        ws.cell(row=r, column=6, value="=IF(AND(D%d<>\"\",E%d<>\"\"),D%d*E%d,\"\")" % (r, r, r, r)).fill = ex
    for r in range(5, 501):
        ws.cell(row=r, column=6, value="=IF(AND(D%d<>\"\",E%d<>\"\"),D%d*E%d,\"\")" % (r, r, r, r))
    for r in range(2, 501):
        ws.cell(row=r, column=6).number_format = '"$"#,##0.00'
        ws.cell(row=r, column=7).number_format = '"$"#,##0.00'
        ws.cell(row=r, column=5).number_format = '"$"#,##0.00'

    ws = wb.create_sheet("Lots & Gains")
    cols = ["Asset", "Wallet / account", "Date acquired", "Amount", "Cost basis incl. fees (USD)", "Date sold", "Proceeds after fees (USD)",
            "Gain / loss (USD)", "Days held", "Short / long-term", "Method (FIFO / Spec ID)", "Notes"]
    header(ws, cols, [9, 20, 13, 12, 16, 13, 16, 14, 10, 14, 16, 30])
    ex_rows = [["ETH", "Exchange A", "2025-01-10", 1, 2000, "2026-11-02", 3500, "FIFO", "EXAMPLE Lot A"],
               ["ETH", "Exchange A", "2025-06-15", 1, 3800, None, None, "", "EXAMPLE Lot B"],
               ["ETH", "Exchange A", "2026-03-01", 1, 2600, None, None, "", "EXAMPLE Lot C"]]
    for r in range(2, 501):
        if r - 2 < len(ex_rows):
            a, w_, d, amt, cb, ds, pr, meth, note = ex_rows[r - 2]
            for c, v in zip([1, 2, 3, 4, 5, 6, 7, 11, 12], [a, w_, d, amt, cb, ds, pr, meth, note]):
                ws.cell(row=r, column=c, value=v).fill = ex
        ws.cell(row=r, column=8, value='=IF(AND(E%d<>"",G%d<>""),G%d-E%d,"")' % (r, r, r, r))
        ws.cell(row=r, column=9, value='=IF(AND(C%d<>"",F%d<>""),DATEVALUE(F%d)-DATEVALUE(C%d),"")' % (r, r, r, r))
        ws.cell(row=r, column=10, value='=IF(I%d="","",IF(I%d>365,"Long-term","Short-term"))' % (r, r))
        for c in (5, 7, 8): ws.cell(row=r, column=c).number_format = '"$"#,##0.00'
    ws.cell(row=1, column=13, value="Tip: type dates as YYYY-MM-DD text. 'Days held' over 365 = long-term (held more than one year).").font = Font(italic=True, color="4A443A")

    ws = wb.create_sheet("Income")
    cols = ["Date received", "Source (staking, airdrop, mining, pay)", "Asset", "Amount", "Price that day (USD)", "Income = basis (USD)", "Wallet / account", "Notes"]
    header(ws, cols, [13, 30, 9, 12, 16, 18, 22, 30])
    for r in range(2, 501):
        ws.cell(row=r, column=6, value='=IF(AND(D%d<>"",E%d<>""),D%d*E%d,"")' % (r, r, r, r)).number_format = '"$"#,##0.00'
    ws.cell(row=2, column=1, value="2026-05-15").fill = ex
    for c, v in zip([2, 3, 4, 5, 7, 8], ["Staking", "ETH", 0.0012, 3200, "Exchange A", "EXAMPLE"]): ws.cell(row=2, column=c, value=v).fill = ex
    ws.cell(row=2, column=6).fill = ex

    ws = wb.create_sheet("Wallets")
    cols = ["Name", "Type (exchange / hot / hardware)", "Custodial?", "Blockchains / coins", "Where the backup is (hint only, never the words)", "2FA / allowlist on?", "Last checked"]
    header(ws, cols, [22, 26, 11, 26, 40, 18, 13])

    for w in wb.worksheets[1:]:
        for row in w.iter_rows(min_row=1, max_row=1):
            for c in row: c.border = Border(bottom=thin)
    path = os.path.join(OUT, "Praeclaris-Crypto-Transaction-Log.xlsx")
    wb.save(path)
    return path


if __name__ == "__main__":
    p = build_pdf(); print("PDF:", p, os.path.getsize(p) // 1024, "KB")
    x = build_xlsx(); print("XLSX:", x, os.path.getsize(x) // 1024, "KB")
