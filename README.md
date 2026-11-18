# Praeclaris website

Free, gamified education on crypto, wallets, exchanges, security and business development.
A static site (plain HTML, CSS and JavaScript): no build step and no server. It's hosted on GitHub Pages.

## Where things live

| To change | Edit |
|---|---|
| Navigation and footer (every page) | `assets/site.js` |
| Colors and fonts | `assets/site.css` (the `:root` block) |
| Home page | `index.html` |
| Crypto Quest missions | `data/crypto-quest.js` |
| Builder's Guild missions | `data/business-quest.js` |
| Free library lessons | `data/library.js` (generated, so edit the lesson source and rebuild) |
| Public build log | `data/practice-log.js` |
| Membership, Advisory pages | `join.html`, `advisory.html` |
| Custom domain | `CNAME` |

## Add a mission

Copy one `{ id: ..., realm: ..., ... }` block in `data/crypto-quest.js`, give it a new unique `id`, set its `realm`, and edit the text. Each quiz `answer` is the 0-based position of the correct option. Save, commit and push. The site updates in about a minute.

## Color system

Color carries meaning, and each accent has one job everywhere (tokens in `assets/site.css`):

| Color | Job |
|---|---|
| Blue (`--accent`) | Interactive: links, buttons, focus, "click here" |
| Gold (`--gold-*`) | Earned: XP, rank, badges, certificate, brand highlights |
| Green (`--ok`) | Correct, done, fact |
| Red (`--bad`) | Wrong, myth |
| Amber (`--warn`) | Protect, caution |
| Cyan / Violet / Magenta (`--lvl-1..3`) | Beginner / Intermediate / Advanced |

Light theme is the default; visitors can switch to dark in the header. Every text color pair meets WCAG AA (lowest 5.25:1 light, 5.66:1 dark; body text 16.8:1), and borders and indicators meet 3:1. If you add a color, check its contrast first.

## Preview locally

```
python -m http.server 8000
```
Then open http://localhost:8000.

## Privacy

The quests store progress only in the visitor's browser (localStorage). No analytics, no accounts, no data leaves the page.

Education only. Not financial, investment, tax or legal advice.
