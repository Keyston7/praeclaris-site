// Dumps the crypto quest data as JSON for tools/build_workbook.py.
// Usage: node tools/export-data.js > tools/quest-data.json
global.window = {};
const path = require("path");
const root = path.join(__dirname, "..");
["crypto-quest", "crypto-vocab", "crypto-guides"].forEach(f => require(path.join(root, "data", f + ".js")));
process.stdout.write(JSON.stringify({ quest: window.QUEST_CRYPTO, vocab: window.CRYPTO_VOCAB, guides: window.CRYPTO_GUIDES }));
