// Praeclaris Quest engine. One engine, many tracks (data/*-quest.js).
// No accounts, no tracking, no network calls: progress lives in localStorage.
// The crypto track also uses data/crypto-vocab.js (Vocab Vault) and data/crypto-guides.js (Field Guide).
(function () {
  "use strict";

  var TRACKS = { crypto: window.QUEST_CRYPTO, business: window.QUEST_BUSINESS };
  var params = new URLSearchParams(location.search);
  var trackId = TRACKS[params.get("track")] ? params.get("track") : "crypto";
  var T = TRACKS[trackId];
  var V = trackId === "crypto" ? window.CRYPTO_VOCAB : null;   // vocabulary
  var G = trackId === "crypto" ? window.CRYPTO_GUIDES : null;  // field guide
  var KEY = "praeclaris.quest." + trackId + ".v1";
  var UNLOCK_AT = 0.6; // share of the previous realm needed to unlock the next
  var IMG = "../assets/guides/";
  var app = document.getElementById("app");

  // ---------- vocabulary index ----------
  var TERMS = {}; // lower-case term -> term object
  if (V) V.terms.forEach(function (t, i) { t.id = i; TERMS[t.t.toLowerCase()] = t; });
  function term(name) { return TERMS[String(name).toLowerCase()]; }

  // ---------- state ----------
  function blank() { return { done: {}, steps: {}, streak: { last: "", count: 0 }, openAll: false, name: "", vocab: {}, maint: {} }; }
  function load() {
    try { var s = JSON.parse(localStorage.getItem(KEY)); return s && s.done ? Object.assign(blank(), s) : blank(); }
    catch (e) { return blank(); }
  }
  var S = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* private mode: progress lasts this visit */ } }

  // ---------- helpers ----------
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function realmMissions(rid) { return T.missions.filter(function (m) { return m.realm === rid; }); }
  function realmShare(rid) { var ms = realmMissions(rid); var d = ms.filter(function (m) { return S.done[m.id]; }).length; return ms.length ? d / ms.length : 0; }
  function totalXP() { return T.missions.reduce(function (a, m) { return a + m.xp + (m.quiz ? m.quiz.length * 10 : 0); }, 0); }
  function earnedXP() { return Object.keys(S.done).reduce(function (a, k) { return a + (S.done[k].xp || 0); }, 0); }
  function doneCount() { return T.missions.filter(function (m) { return S.done[m.id]; }).length; }
  function rankInfo() {
    var share = earnedXP() / totalXP();
    var cur = T.ranks[0], next = null;
    for (var i = 0; i < T.ranks.length; i++) { if (share >= T.ranks[i].at) { cur = T.ranks[i]; next = T.ranks[i + 1] || null; } }
    var from = cur.at * totalXP(), to = next ? next.at * totalXP() : totalXP();
    var pct = to > from ? Math.min(100, Math.round(((earnedXP() - from) / (to - from)) * 100)) : 100;
    return { cur: cur, next: next, pct: next ? pct : 100, share: share };
  }
  function unlocked(idx) {
    if (S.openAll || idx === 0) return true;
    // Once you've started a realm it stays open, even if new missions are added to the one before it.
    if (realmMissions(T.realms[idx].id).some(function (m) { return S.done[m.id]; })) return true;
    return realmShare(T.realms[idx - 1].id) >= UNLOCK_AT;
  }
  function needToUnlock(idx) {
    var prev = realmMissions(T.realms[idx - 1].id);
    var need = Math.ceil(prev.length * UNLOCK_AT) - prev.filter(function (m) { return S.done[m.id]; }).length;
    return Math.max(need, 0);
  }
  function today() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function bumpStreak() {
    var t = today(); if (S.streak.last === t) return;
    var y = new Date(); y.setDate(y.getDate() - 1);
    var ys = y.getFullYear() + "-" + String(y.getMonth() + 1).padStart(2, "0") + "-" + String(y.getDate()).padStart(2, "0");
    S.streak.count = S.streak.last === ys ? S.streak.count + 1 : 1; S.streak.last = t;
  }
  function toast(msg) {
    var el = document.createElement("div"); el.className = "toast"; el.setAttribute("role", "status"); el.textContent = msg;
    document.body.appendChild(el); setTimeout(function () { el.remove(); }, 3200);
  }
  function lvlClass(level) { return { Beginner: "lvl-1", Intermediate: "lvl-2", Advanced: "lvl-3" }[level] || ""; }
  function colorKey() {
    var k = [["var(--lvl-1)", "Beginner"], ["var(--lvl-2)", "Intermediate"], ["var(--lvl-3)", "Advanced"], ["var(--accent)", "Tap or click"],
      ["var(--gold-fill)", "Earned"], ["var(--ok)", "Correct / done"], ["var(--warn)", "Protect"]];
    return '<div class="key" aria-label="Color key">' + k.map(function (x) { return '<span><i style="background:' + x[0] + '"></i>' + x[1] + "</span>"; }).join("") + "</div>";
  }
  function go(hash) { location.hash = hash; }
  function top() { window.scrollTo({ top: 0, behavior: "smooth" }); }
  function hasLearn(m) { return !!(m.guide || m.example || m.diagram); }

  // Words collected = every term taught by a completed mission.
  function collected() {
    var out = {};
    T.missions.forEach(function (m) { if (S.done[m.id] && m.words) m.words.forEach(function (w) { var t = term(w); if (t) out[t.id] = true; }); });
    return out;
  }
  function masteredCount() { return Object.keys(S.vocab || {}).filter(function (k) { return S.vocab[k]; }).length; }

  // Turn a mission's vocabulary words into tap-to-define buttons (first mention in each block of text).
  function linkify(text, words) {
    var html = esc(text);
    if (!V || !words || !words.length) return html;
    var slots = [];
    words.map(term).filter(Boolean).sort(function (a, b) { return b.t.length - a.t.length; }).forEach(function (t) {
      var pat = t.t.replace(/[.*+?^${}()|[\]\\\/]/g, "\\$&").replace(/&/g, "&amp;");
      var re = new RegExp("(^|[^A-Za-z0-9-])(" + pat + "(?:s|es)?)(?![A-Za-z0-9])", "i");
      var mt = re.exec(html);
      if (!mt) return;
      var start = mt.index + mt[1].length, word = mt[2];
      slots.push('<button type="button" class="term" data-term="' + t.id + '">' + word + "</button>");
      html = html.slice(0, start) + "\u0001" + (slots.length - 1) + "\u0002" + html.slice(start + word.length);
    });
    return html.replace(/\u0001(\d+)\u0002/g, function (_, i) { return slots[+i]; });
  }

  // ---------- pictures: mock app screens and diagrams ----------
  function screen(s) {
    if (!s) return "";
    var rows = (s.rows || []).map(function (r) {
      return '<div class="mrow' + (r[2] ? " " + r[2] : "") + '"><span>' + esc(r[0]) + "</span><b>" + esc(r[1]) + "</b></div>";
    }).join("");
    var seed = s.seed ? '<ol class="mseed">' + s.seed.map(function (w) { return "<li>" + esc(w) + "</li>"; }).join("") + "</ol>" : "";
    var body = (s.title ? '<div class="mtitle">' + esc(s.title) + "</div>" : "") + rows + seed +
      (s.btn ? '<div class="mbtn">' + esc(s.btn) + "</div>" : "") + (s.note ? '<div class="mnote">' + esc(s.note) + "</div>" : "");
    if (s.kind === "device") {
      return '<figure class="mock device" aria-label="Example hardware wallet screen"><div class="dev-screen">' +
        '<div class="dev-t">' + esc(s.title || "") + '</div><div class="dev-v">' + esc(s.rows && s.rows[0] ? s.rows[0][1] : "") + "</div></div>" +
        '<div class="dev-btns"><i></i><i></i></div>' + (s.note ? '<figcaption class="mnote">' + esc(s.note) + "</figcaption>" : "") + "</figure>";
    }
    if (s.kind === "browser") {
      return '<figure class="mock browser" aria-label="Example web page"><div class="murl"><i></i><i></i><i></i><span>🔒 ' + esc(s.url || "") + '</span></div><div class="mbody">' + body + "</div></figure>";
    }
    return '<figure class="mock phone" aria-label="Example app screen"><div class="mbar"><span>' + esc(s.app || "App") + '</span><span>9:41</span></div><div class="mbody">' + body + "</div></figure>";
  }

  function box(x, y, w, h, title, sub, cls) {
    return '<g class="d-node ' + (cls || "") + '"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="12"/>' +
      '<text x="' + (x + w / 2) + '" y="' + (y + (sub ? h / 2 - 4 : h / 2 + 5)) + '" class="d-t">' + title + "</text>" +
      (sub ? '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 16) + '" class="d-s">' + sub + "</text>" : "") + "</g>";
  }
  function arrow(x1, y1, x2, y2, label, cls) {
    return '<g class="d-arrow ' + (cls || "") + '"><line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" marker-end="url(#ah)"/>' +
      (label ? '<text x="' + (x1 + x2) / 2 + '" y="' + ((y1 + y2) / 2 - 8) + '" class="d-l">' + label + "</text>" : "") + "</g>";
  }
  var DEFS = '<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="d-head"/></marker></defs>';
  function diagram(kind) {
    var svg = "", cap = "";
    if (kind === "chain") {
      cap = "Each block stores the previous block's hash. Change block 101 and its hash changes, breaking the link to 102 and everything after it.";
      svg = '<svg viewBox="0 0 720 170" role="img" aria-label="Three linked blocks">' + DEFS +
        box(10, 30, 200, 110, "Block 101", "prev: 9c4e… · 2,950 txs") + arrow(212, 85, 258, 85, "") +
        box(260, 30, 200, 110, "Block 102", "prev: 7a1f… · 3,104 txs", "hi") + arrow(462, 85, 508, 85, "") +
        box(510, 30, 200, 110, "Block 103", "prev: 3be0… · 2,877 txs") + "</svg>";
    } else if (kind === "moneymap") {
      cap = "The money map: dollars come in through an exchange (on-ramp), small amounts go to a hot wallet, long-term savings go to cold storage. Selling reverses the trip (off-ramp).";
      svg = '<svg viewBox="0 0 760 210" role="img" aria-label="Bank to exchange to hot wallet to cold wallet">' + DEFS +
        box(10, 40, 150, 80, "🏦 Bank", "dollars (fiat)") + arrow(162, 70, 208, 70, "on-ramp") +
        box(210, 40, 160, 80, "Exchange", "buy · custodial", "hi") + arrow(372, 70, 408, 70, "send") +
        box(410, 40, 150, 80, "Hot wallet", "small, daily") + arrow(562, 70, 598, 70, "save") +
        box(600, 40, 150, 80, "Cold wallet", "long-term", "cold") +
        arrow(285, 124, 285, 170, "", "back") + arrow(285, 170, 85, 170, "off-ramp: sell → bank", "back") + arrow(85, 170, 85, 124, "", "back") + "</svg>";
    } else if (kind === "custody") {
      cap = "Custodial: the company holds the keys and you hold a login. Self-custody: you hold the seed phrase, which is the keys.";
      svg = '<svg viewBox="0 0 720 250" role="img" aria-label="Custodial versus self-custody">' + DEFS +
        '<text x="180" y="22" class="d-h">Custodial (exchange)</text><text x="540" y="22" class="d-h">Self-custody (your wallet)</text>' +
        box(80, 36, 200, 52, "You", "email + password + 2FA") + arrow(180, 90, 180, 116, "") +
        box(80, 118, 200, 52, "The company", "holds your private keys", "warn") + arrow(180, 172, 180, 198, "") +
        box(80, 200, 200, 44, "Blockchain", "") +
        box(440, 36, 200, 52, "You", "12–24 word seed phrase", "hi") + arrow(540, 90, 540, 116, "") +
        box(440, 118, 200, 52, "Your wallet", "holds your private keys", "cold") + arrow(540, 172, 540, 198, "") +
        box(440, 200, 200, 44, "Blockchain", "") + "</svg>";
    } else if (kind === "taxflow") {
      cap = "Your log feeds the forms: disposals go to Form 8949 and Schedule D; earned crypto is income on Schedule 1 or C; both land on Form 1040.";
      svg = '<svg viewBox="0 0 760 200" role="img" aria-label="Transaction log to tax forms">' + DEFS +
        box(10, 70, 160, 64, "Transaction log", "+ exchange CSVs, 1099-DA", "hi") +
        arrow(172, 90, 228, 50, "sales, swaps") + arrow(172, 116, 228, 156, "staking, pay") +
        box(230, 18, 150, 60, "Form 8949", "each disposal") + arrow(382, 48, 428, 48, "") +
        box(430, 18, 150, 60, "Schedule D", "totals") + arrow(582, 54, 618, 88, "") +
        box(230, 126, 150, 60, "Schedule 1 / C", "income") + arrow(382, 156, 618, 120, "") +
        box(620, 70, 130, 64, "Form 1040", "+ digital asset Q", "cold") + "</svg>";
    }
    return svg ? '<figure class="diagram">' + svg + '<figcaption>' + esc(cap) + "</figcaption></figure>" : "";
  }

  function exampleBlock(ex) {
    return '<div class="example card"><div class="ex-k">See it in action</div><h4>' + esc(ex.t) + "</h4>" +
      (ex.p ? "<p>" + esc(ex.p) + "</p>" : "") +
      (ex.rows ? '<div class="tbl"><table>' + (ex.head ? "<thead><tr>" + ex.head.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") + "</tr></thead>" : "") +
        "<tbody>" + ex.rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>" : "") +
      (ex.out ? '<p class="ex-out">' + esc(ex.out) + "</p>" : "") + "</div>";
  }
  function examples(m) { return m.example ? (Array.isArray(m.example) ? m.example : [m.example]) : []; }

  function sheetById(id) { return G && G.sheets.filter(function (s) { return s.id === id; })[0]; }
  function sheetThumbs(ids) {
    var list = (ids || []).map(sheetById).filter(Boolean);
    if (!list.length) return "";
    return '<div class="sheets">' + list.map(function (s) {
      return '<button type="button" class="sheet" data-img="' + esc(s.src) + '" data-cap="' + esc(s.t) + '"><img src="' + IMG + esc(s.src) + '" alt="" loading="lazy"><span>' + esc(s.t) + "</span></button>";
    }).join("") + "</div>";
  }

  function wordCards(m) {
    if (!V || !m.words) return "";
    var ts = m.words.map(term).filter(Boolean);
    if (!ts.length) return "";
    return '<h3 class="sec-h">📖 Words of power <span class="muted">(added to your Vocab Vault when you finish)</span></h3><div class="words">' + ts.map(function (t) {
      return '<details class="word"><summary>' + esc(t.t) + '</summary><p>' + esc(t.d) + '</p><p class="muted"><b>Example:</b> ' + esc(t.ex) + "</p></details>";
    }).join("") + "</div>";
  }

  // ---------- views ----------
  function hud() {
    var r = rankInfo(), done = doneCount();
    var badges = T.realms.filter(function (rm) { return realmShare(rm.id) === 1; }).length;
    var words = V ? '<div class="card"><div class="k">Words</div><div class="v">' + Object.keys(collected()).length + '</div><div class="k">' + masteredCount() + " mastered</div></div>" : "";
    return '<div class="hud' + (V ? " five" : "") + '">' +
      '<div class="card rank"><div class="k">Rank</div><div class="v">' + esc(r.cur.name) + '</div>' +
      '<div class="bar" aria-label="Progress to next rank"><span style="width:' + r.pct + '%"></span></div>' +
      '<div class="k" style="margin-top:6px">' + (r.next ? r.pct + "% to " + esc(r.next.name) : "Highest rank reached") + "</div></div>" +
      '<div class="card"><div class="k">XP</div><div class="v">' + earnedXP() + '</div><div class="k">of ' + totalXP() + "</div></div>" +
      '<div class="card"><div class="k">Missions</div><div class="v">' + done + "/" + T.missions.length + "</div></div>" +
      words +
      '<div class="card"><div class="k">Streak · Badges</div><div class="v">' + (S.streak.count || 0) + "d · " + badges + "/" + T.realms.length + "</div></div>" +
      "</div>";
  }

  function toolkit() {
    if (!V) return "";
    return '<h3 style="margin-top:30px">Your toolkit</h3><div class="toolkit">' +
      '<a class="tool card" href="#/vocab"><span class="ti">📖</span><b>Vocab Vault</b><span>' + V.terms.length + " crypto words, with examples and a flashcard game</span></a>" +
      '<a class="tool card" href="#/guide"><span class="ti">🧭</span><b>Field Guide</b><span>Which exchanges and wallets, what to look for, safety and maintenance checklists</span></a>' +
      '<a class="tool card" href="' + esc(T.workbook) + '" download><span class="ti">📒</span><b>Quest Workbook (PDF)</b><span>Fill-in pages for every realm. Download it and follow along.</span></a>' +
      '<a class="tool card" href="' + esc(T.logTemplate) + '" download><span class="ti">🧾</span><b>Transaction Log (Excel)</b><span>The record-keeping template used in the Records Hall</span></a>' +
      "</div>";
  }

  function viewMap() {
    var html = '<div class="q-top"><div class="q-tracks" role="tablist">' +
      '<a href="?track=crypto"' + (trackId === "crypto" ? ' class="on"' : "") + ">Crypto Quest</a>" +
      '<a href="?track=business"' + (trackId === "business" ? ' class="on"' : "") + ">Builder's Guild</a></div>" +
      '<span class="eyebrow">' + esc(T.subtitle) + "</span><h1>" + esc(T.title) + '</h1><p class="lead muted" style="max-width:720px">' + esc(T.intro) + "</p>" +
      '<p class="notice">🔒 ' + esc(T.promise) + "</p>" + hud() + toolkit() + colorKey() + "</div>";

    if (V && !doneCount()) {
      html += '<div class="guide-says card"><span class="avatar" aria-hidden="true">✦</span><div><b>' + esc(T.guideName) + ', your quest guide:</b> "New here? Start with realm 1, ' +
        esc(T.realms[0].name) + '. Download the workbook first so you can write as you go. Every mission has a <b>Show me how</b> step with example screens, and any word with a dotted underline can be tapped for its meaning."</div></div>';
    }

    html += '<div class="map">';
    T.realms.forEach(function (rm, i) {
      var share = realmShare(rm.id), open = unlocked(i), n = realmMissions(rm.id).length;
      var cls = "realm " + lvlClass(rm.level) + (open ? "" : " locked") + (share === 1 ? " done" : "");
      var status = !open ? '<span class="lockmsg">🔒 Complete ' + needToUnlock(i) + " more in " + esc(T.realms[i - 1].name) + "</span>"
        : share === 1 ? '<span class="earned">★ Badge earned: ' + esc(rm.badge) + "</span>"
        : "<span>" + Math.round(share * n) + "/" + n + ' missions</span><span class="go">' + (share > 0 ? "Continue →" : "Enter →") + "</span>";
      html += '<button class="' + cls + '" data-realm="' + rm.id + '"' + (open ? "" : ' aria-disabled="true"') + ">" +
        '<span class="num" data-n="' + (i + 1) + '" style="--p:' + Math.round(share * 100) + '%"></span>' +
        "<h3>" + esc(rm.name) + '</h3><p class="tl">' + esc(rm.tagline) + "</p>" +
        '<div class="meta"><span class="lvl">' + esc(rm.level) + "</span><span>" + status + "</span></div></button>";
    });
    html += "</div>";

    html += "<h3 style=\"margin-top:36px\">Badges</h3><div class=\"badges\">" + T.realms.map(function (rm, i) {
      var got = realmShare(rm.id) === 1;
      return '<span class="badge' + (got ? " got" : "") + '"><i>' + (got ? "★" : i + 1) + "</i>" + esc(rm.badge) + "</span>";
    }).join("") + "</div>";

    if (doneCount() === T.missions.length) {
      html += '<p style="margin-top:24px"><a class="btn reward" href="#/certificate">★ Claim your certificate</a></p>';
    }

    html += '<details class="settings"><summary>Progress and settings</summary><div class="card" style="margin-top:12px">' +
      '<p><label style="display:flex;gap:10px;align-items:center;color:var(--text)"><input type="checkbox" id="openAll" style="width:auto"' + (S.openAll ? " checked" : "") + "> I already know the basics: unlock every realm</label></p>" +
      '<p class="muted">Progress is saved only in this browser. To move it to another device, copy your backup code and paste it there.</p>' +
      '<div class="row"><button class="btn small" id="exportBtn">Copy backup code</button><button class="btn small" id="importBtn">Restore from code</button><button class="btn small" id="resetBtn">Start over</button></div>' +
      '<textarea id="codeBox" rows="3" style="margin-top:12px;display:none" aria-label="Backup code"></textarea></div></details>';

    app.innerHTML = html;
    app.querySelectorAll(".realm").forEach(function (b) {
      b.addEventListener("click", function () {
        var idx = T.realms.findIndex(function (r) { return r.id === b.dataset.realm; });
        if (!unlocked(idx)) { toast("Locked: complete " + needToUnlock(idx) + " more mission(s) in " + T.realms[idx - 1].name + "."); return; }
        go("#/realm/" + b.dataset.realm);
      });
    });
    var box = document.getElementById("codeBox");
    document.getElementById("openAll").addEventListener("change", function (e) { S.openAll = e.target.checked; save(); render(); });
    document.getElementById("exportBtn").addEventListener("click", function () {
      var code = btoa(unescape(encodeURIComponent(JSON.stringify(S))));
      box.style.display = "block"; box.value = code; box.select();
      if (navigator.clipboard) navigator.clipboard.writeText(code).then(function () { toast("Backup code copied."); }, function () {});
    });
    document.getElementById("importBtn").addEventListener("click", function () {
      if (box.style.display === "none") { box.style.display = "block"; box.value = ""; box.placeholder = "Paste your backup code, then press Restore again"; box.focus(); return; }
      try { var s = JSON.parse(decodeURIComponent(escape(atob(box.value.trim())))); if (!s.done) throw 0; S = Object.assign(blank(), s); save(); toast("Progress restored."); render(); }
      catch (e) { toast("That code didn't work. Check you copied all of it."); }
    });
    var armed = false;
    document.getElementById("resetBtn").addEventListener("click", function (e) {
      if (!armed) { armed = true; e.target.textContent = "Press again to erase progress"; return; }
      S = blank(); save(); toast("Progress cleared."); render();
    });
  }

  function viewRealm(rid) {
    var idx = T.realms.findIndex(function (r) { return r.id === rid; });
    if (idx < 0 || !unlocked(idx)) return go("#/");
    var rm = T.realms[idx];
    var html = '<div class="q-top"><div class="crumbs"><button data-go="#/">← Map</button></div>' +
      '<span class="eyebrow">Realm ' + (idx + 1) + " · " + esc(rm.level) + "</span><h1>" + esc(rm.name) + '</h1><p class="lead muted">' + esc(rm.tagline) + "</p>" +
      (rm.story ? '<div class="guide-says card"><span class="avatar" aria-hidden="true">✦</span><div><b>' + esc(T.guideName || "Your guide") + ":</b> " + esc(rm.story) + "</div></div>" : "") +
      hud() + "</div>";
    html += '<div class="missions">' + realmMissions(rid).map(function (m, i) {
      var d = S.done[m.id];
      return '<button class="mcard' + (d ? " done" : "") + '" data-m="' + m.id + '"><span class="ic">' + (d ? "✓" : i + 1) + "</span>" +
        "<span><h4>" + esc(m.title) + "</h4><p>" + m.minutes + " min · " + m.xp + " XP" + (m.quiz ? " + quiz bonus" : "") +
        (hasLearn(m) ? " · 🎬 Show me how" : "") + (m.words && V ? " · 📖 " + m.words.length + " words" : "") + "</p></span>" +
        (d ? '<span class="chip ok">' + (d.mode === "practice" ? "Practiced" : "Done") + "</span>" : m.boss ? '<span class="chip boss">Final trial</span>' : '<span class="chip">Start</span>') + "</button>";
    }).join("") + "</div>";
    if (realmShare(rid) === 1) html += '<p class="notice earned" style="margin-top:18px">★ Badge earned: <b>' + esc(rm.badge) + "</b></p>";
    app.innerHTML = html;
    bindGo();
    app.querySelectorAll(".mcard").forEach(function (b) { b.addEventListener("click", function () { go("#/mission/" + b.dataset.m); }); });
  }

  function viewMission(mid, stage) {
    var m = T.missions.find(function (x) { return x.id === mid; });
    if (!m) return go("#/");
    var ridx = T.realms.findIndex(function (r) { return r.id === m.realm; });
    if (!unlocked(ridx)) return go("#/");
    var rm = T.realms[ridx];
    var stages = [["brief", "Briefing"]];
    if (hasLearn(m)) stages.push(["learn", "Show me how"]);
    stages.push(["do", "Do it"], ["check", "Knowledge check"], ["debrief", "Debrief"]);
    stage = stage || "brief";
    var si = stages.findIndex(function (s) { return s[0] === stage; });
    if (si < 0) { stage = "brief"; si = 0; }
    var next = function (s) { return stages[stages.findIndex(function (x) { return x[0] === s; }) + 1][0]; };
    var prev = function (s) { return stages[stages.findIndex(function (x) { return x[0] === s; }) - 1][0]; };
    var url = function (s) { return "#/mission/" + m.id + (s === "brief" ? "" : "/" + s); };
    var W = m.words;

    var html = '<div class="q-top mission"><div class="crumbs"><button data-go="#/">Map</button> / <button data-go="#/realm/' + rm.id + '">' + esc(rm.name) + "</button></div>" +
      '<span class="eyebrow">' + (m.boss ? "Final trial · " : "") + m.minutes + " min · " + m.xp + " XP</span><h1>" + esc(m.title) + "</h1>" +
      '<div class="stepper">' + stages.map(function (s, i) { return '<span class="' + (i === si ? "on" : i < si ? "past" : "") + '">' + (i + 1) + ". " + s[1] + "</span>"; }).join("") + "</div>";

    if (stage === "brief") {
      html += '<p class="lede">' + linkify(m.brief, W) + "</p>" +
        (m.img ? '<img class="brief-img" src="' + IMG + esc(m.img.src) + '" alt="' + esc(m.img.alt) + '" loading="lazy">' : "") +
        (m.myth ? '<div class="myth"><div class="m"><b>Myth</b>' + esc(m.myth.myth) + '</div><div class="f"><b>Fact</b>' + esc(m.myth.fact) + "</div></div>" : "") +
        '<div class="protect"><b class="warn-text">🛡 Protect:</b> ' + esc(m.protect) + "</div>" +
        wordCards(m) +
        (m.sheets && G ? '<h3 class="sec-h">🖼 Praeclaris cheat sheets <span class="muted">(tap to enlarge, save or print)</span></h3>' + sheetThumbs(m.sheets) : "") +
        (m.wb && T.workbook ? '<p class="wbnote">📒 <b>Workbook page:</b> ' + esc(m.wb) + ' · <a href="' + esc(T.workbook) + '" download>Download the workbook</a></p>' : "") +
        (m.lesson ? '<p>Go deeper: <a href="../learn/#week-' + m.lesson + '">Library lesson, week ' + m.lesson + "</a></p>" : "") +
        sources(m) + '<div class="row"><button class="btn primary" data-go="' + url(next("brief")) + '">' + (hasLearn(m) ? "Show me how →" : "Start mission") + "</button></div>";
    } else if (stage === "learn") {
      html += diagram(m.diagram);
      if (m.guide) {
        html += '<h3 class="sec-h">🎬 ' + esc(m.guide.t) + '</h3><ol class="walk">' + m.guide.steps.map(function (s, i) {
          return '<li class="wstep' + (s.screen ? " has-screen" : "") + '"><div class="wtext"><span class="wn">' + (i + 1) + "</span><div><h4>" + esc(s.t.replace(/^\d+\.\s*/, "")) + "</h4><p>" + linkify(s.d, W) + "</p></div></div>" + screen(s.screen) + "</li>";
        }).join("") + "</ol>";
        if (m.guide.steps.some(function (s) { return s.screen; })) html += '<p class="muted small">Screens are simplified examples. Real apps look a little different and change often, but the fields are the same.</p>';
      }
      html += examples(m).map(exampleBlock).join("");
      html += '<div class="row"><button class="btn" data-go="' + url(prev("learn")) + '">Back</button><button class="btn primary" data-go="' + url("do") + '">I\'ve got it: let\'s do it →</button></div>';
    } else if (stage === "do") {
      var st = S.steps[m.id] || [];
      html += "<p>Tick each step as you finish it. Take your time; your place is saved." + (m.wb && T.workbook ? ' Write your answers on the workbook page <b>' + esc(m.wb) + "</b>." : "") + '</p><ul class="checks">' + m.steps.map(function (s, i) {
        return '<li><label><input type="checkbox" data-i="' + i + '"' + (st[i] ? " checked" : "") + "><span>" + linkify(s, W) + "</span></label></li>";
      }).join("") + "</ul>" +
        '<p class="notice practice"><b>Practice option:</b> ' + esc(m.practice) + "</p>" +
        (/Vocab Vault/.test(m.steps.join(" ")) && V ? '<p><a class="btn small" href="#/vocab">Open the Vocab Vault</a> <a class="btn small" href="#/vocab/drill">Play the flashcard drill</a></p>' : "") +
        (/Field Guide/.test(m.steps.join(" ")) && G ? '<p><a class="btn small" href="#/guide">Open the Field Guide</a></p>' : "") +
        '<div class="row"><button class="btn" data-go="' + url(prev("do")) + '">Back</button><button class="btn primary" id="toCheck">Continue to knowledge check</button></div>';
    } else if (stage === "check") {
      html += '<p>Answer each question. Getting one right on the first try earns a 10 XP bonus.</p><div id="quiz">' + (m.quiz || []).map(function (q, qi) {
        return '<div class="q card" data-q="' + qi + '"><h4>' + (qi + 1) + ". " + esc(q.q) + '</h4><div class="opts">' + q.options.map(function (o, oi) {
          return '<button class="opt" data-o="' + oi + '">' + esc(o) + "</button>";
        }).join("") + '</div><div class="explain" hidden></div></div>';
      }).join("") + "</div>" +
        '<div class="row"><button class="btn" data-go="' + url("do") + '">Back</button><button class="btn primary" id="toDebrief" disabled>Continue to debrief</button></div>';
    } else if (stage === "debrief") {
      html += "<p>How did you complete this mission? Both options earn full XP. Practicing first is smart.</p>" +
        '<div class="debrief"><button class="btn primary" data-mode="real">✓ I did it for real</button>' +
        '<button class="btn" data-mode="practice">✓ I used the practice option</button>' +
        '<button class="btn" data-go="#/realm/' + rm.id + '">I\'ll come back to it later</button></div>' +
        '<p class="muted" style="margin-top:16px">Nothing you choose here leaves your browser.</p>';
    }
    html += "</div>";
    app.innerHTML = html;
    bindGo();

    if (stage === "do") {
      app.querySelectorAll(".checks input").forEach(function (cb) {
        cb.addEventListener("change", function () {
          var arr = S.steps[m.id] || []; arr[+cb.dataset.i] = cb.checked; S.steps[m.id] = arr; save();
        });
      });
      document.getElementById("toCheck").addEventListener("click", function () {
        var arr = S.steps[m.id] || [], all = m.steps.every(function (_, i) { return arr[i]; });
        if (!all) { toast("Tick every step first, or complete the practice option and tick the steps you covered."); return; }
        go(url(m.quiz && m.quiz.length ? "check" : "debrief"));
      });
    }
    if (stage === "check") {
      var solved = {}, firstTry = {};
      app.querySelectorAll(".q").forEach(function (qel) {
        var qi = +qel.dataset.q, q = m.quiz[qi], tried = false;
        qel.querySelectorAll(".opt").forEach(function (b) {
          b.addEventListener("click", function () {
            if (solved[qi]) return;
            var oi = +b.dataset.o, ex = qel.querySelector(".explain");
            if (oi === q.answer) {
              b.classList.add("right"); solved[qi] = true; if (!tried) firstTry[qi] = true;
              qel.querySelectorAll(".opt").forEach(function (o) { o.disabled = true; });
              ex.hidden = false; ex.innerHTML = "<b class=\"ok-text\">✓ Correct.</b> " + esc(q.explain);
            } else {
              tried = true; b.classList.add("wrong"); b.disabled = true;
              ex.hidden = false; ex.innerHTML = "<b class=\"bad-text\">✗ Not quite.</b> Try another answer.";
            }
            if (Object.keys(solved).length === m.quiz.length) {
              try { sessionStorage.setItem("pq.bonus." + m.id, String(Object.keys(firstTry).length)); } catch (e) {}
              document.getElementById("toDebrief").disabled = false;
            }
          });
        });
      });
      document.getElementById("toDebrief").addEventListener("click", function () { go(url("debrief")); });
    }
    if (stage === "debrief") {
      app.querySelectorAll("[data-mode]").forEach(function (b) {
        b.addEventListener("click", function () { complete(m, b.dataset.mode); });
      });
    }
    top();
  }

  function sources(m) {
    if (!m.sources || !m.sources.length) return "";
    return '<p class="src">Sources: ' + m.sources.map(function (s) {
      return '<a href="' + esc(s.u) + '"' + (/^https?:/.test(s.u) ? ' target="_blank" rel="noopener"' : "") + ">" + esc(s.t) + "</a>";
    }).join(" · ") + "</p>";
  }

  function complete(m, mode) {
    var before = rankInfo().cur.name, realmBefore = realmShare(m.realm), wordsBefore = Object.keys(collected()).length;
    var bonus = 0;
    try { bonus = +(sessionStorage.getItem("pq.bonus." + m.id) || 0) * 10; } catch (e) {}
    var prev = S.done[m.id];
    var xp = Math.max(m.xp + bonus, prev ? prev.xp : 0);
    S.done[m.id] = { mode: mode, xp: xp, at: today() };
    bumpStreak(); save();
    var after = rankInfo().cur.name, realmNow = realmShare(m.realm), newWords = Object.keys(collected()).length - wordsBefore;
    var rm = T.realms.find(function (r) { return r.id === m.realm; });
    var lines = [];
    if (bonus) lines.push(["line", "Includes a " + bonus + " XP first-try quiz bonus"]);
    if (newWords > 0) lines.push(["line", "📖 " + newWords + " new word" + (newWords > 1 ? "s" : "") + " added to your Vocab Vault"]);
    if (realmNow === 1 && realmBefore < 1) lines.push(["line badge-line", "★ Badge earned: " + rm.badge]);
    if (after !== before) lines.push(["line badge-line", "▲ Rank up: " + after]);
    var nextIdx = T.realms.findIndex(function (r) { return r.id === m.realm; }) + 1;
    if (T.realms[nextIdx] && realmBefore < UNLOCK_AT && realmNow >= UNLOCK_AT && !S.openAll) lines.push(["line unlock", "🔓 Unlocked: " + T.realms[nextIdx].name]);
    var all = doneCount() === T.missions.length;
    var ov = document.createElement("div"); ov.className = "overlay";
    ov.innerHTML = '<div class="reward" role="dialog" aria-modal="true" aria-label="Mission complete"><span class="eyebrow">Mission complete</span><div class="big">' + esc(m.title) + "</div>" +
      '<p><span class="xp">+' + xp + " XP</span></p>" +
      lines.map(function (l) { return '<p class="' + l[0] + '">' + esc(l[1]) + "</p>"; }).join("") +
      '<div class="row" style="justify-content:center">' + (all ? '<a class="btn reward" href="#/certificate">Claim certificate</a>' : '<button class="btn primary" id="cont">Continue</button>') + "</div></div>";
    document.body.appendChild(ov);
    confetti(realmNow === 1 || after !== before ? 220 : 110);
    var c = ov.querySelector("#cont");
    if (c) { c.focus(); c.addEventListener("click", function () { ov.remove(); go("#/realm/" + m.realm); }); }
    else ov.querySelector("a").addEventListener("click", function () { ov.remove(); });
  }

  // ---------- Vocab Vault ----------
  function viewVocab(sub) {
    if (!V) return go("#/");
    if (sub === "drill") return viewDrill();
    var got = collected();
    var html = '<div class="q-top"><div class="crumbs"><button data-go="#/">← Map</button></div>' +
      '<span class="eyebrow">Vocab Vault</span><h1>Speak crypto</h1>' +
      '<p class="lead muted">Every word you need for the quest, in plain English with an everyday example. Words turn gold ★ when a mission teaches them, and green ✓ when you mark them "I know it" in the flashcard drill.</p>' +
      '<p class="muted">' + Object.keys(got).length + " collected · " + masteredCount() + " mastered · " + V.terms.length + " total</p>" +
      '<div class="row"><a class="btn primary" href="#/vocab/drill">▶ Play the flashcard drill</a></div>' +
      '<div class="filters" style="margin-top:20px"><input id="vq" type="search" placeholder="Search a word or meaning… (try: seed, gas, basis)" aria-label="Search vocabulary">' +
      '<select id="vc" aria-label="Category"><option value="">All categories</option>' + Object.keys(V.cats).map(function (k) { return '<option value="' + k + '">' + esc(V.cats[k]) + "</option>"; }).join("") + "</select></div>" +
      '<div id="vlist"></div>' +
      (G ? '<h3 style="margin-top:34px">Printable cheat sheets</h3>' + sheetThumbs(["vocab-1", "vocab-2", "vocab-3", "vocab-4", "vocab-trading", "vocab-tax"]) : "") + "</div>";
    app.innerHTML = html;
    bindGo();
    var q = document.getElementById("vq"), c = document.getElementById("vc"), list = document.getElementById("vlist");
    function draw() {
      var s = q.value.trim().toLowerCase(), cat = c.value, out = "";
      Object.keys(V.cats).forEach(function (k) {
        if (cat && cat !== k) return;
        var ts = V.terms.filter(function (t) { return t.c === k && (!s || (t.t + " " + t.d + " " + t.ex).toLowerCase().indexOf(s) >= 0); })
          .sort(function (a, b) { return a.t.localeCompare(b.t); });
        if (!ts.length) return;
        out += '<h3 class="sec-h">' + esc(V.cats[k]) + ' <span class="muted">(' + ts.length + ")</span></h3><div class=\"vgrid\">" + ts.map(function (t) {
          var mk = S.vocab[t.id] ? '<span class="vm ok">✓ mastered</span>' : got[t.id] ? '<span class="vm gold">★ collected</span>' : "";
          return '<div class="vterm card' + (got[t.id] ? " got" : "") + '"><h4>' + esc(t.t) + mk + "</h4><p>" + esc(t.d) + '</p><p class="muted"><b>Example:</b> ' + esc(t.ex) + "</p></div>";
        }).join("") + "</div>";
      });
      list.innerHTML = out || '<p class="muted">No words match. Try a shorter search.</p>';
    }
    q.addEventListener("input", draw); c.addEventListener("change", draw); draw();
  }

  function viewDrill() {
    var got = collected();
    // Deck: 10 cards, words you haven't mastered first, collected words before uncollected.
    var pool = V.terms.slice().sort(function (a, b) {
      var sa = (S.vocab[a.id] ? 2 : 0) + (got[a.id] ? 0 : 1), sb = (S.vocab[b.id] ? 2 : 0) + (got[b.id] ? 0 : 1);
      return sa - sb || Math.random() - 0.5;
    });
    var deck = pool.slice(0, 10), i = 0, knew = 0;
    function card() {
      if (i >= deck.length) {
        app.innerHTML = '<div class="q-top mission"><div class="crumbs"><button data-go="#/vocab">← Vocab Vault</button></div><span class="eyebrow">Drill complete</span><h1>' + knew + " / " + deck.length + ' known</h1>' +
          '<p class="lead muted">You\'ve mastered ' + masteredCount() + " of " + V.terms.length + ' words so far. Every round serves the words you haven\'t mastered first.</p>' +
          '<div class="row"><button class="btn primary" id="again">Play another round</button><button class="btn" data-go="#/">Back to the map</button></div></div>';
        bindGo(); document.getElementById("again").addEventListener("click", viewDrill); return;
      }
      var t = deck[i];
      app.innerHTML = '<div class="q-top mission"><div class="crumbs"><button data-go="#/vocab">← Vocab Vault</button></div>' +
        '<span class="eyebrow">Flashcard ' + (i + 1) + " of " + deck.length + " · " + esc(V.cats[t.c]) + "</span>" +
        '<div class="bar" style="max-width:420px"><span style="width:' + Math.round(i / deck.length * 100) + '%"></span></div>' +
        '<button class="flash" id="flash" aria-live="polite"><span class="ft">' + esc(t.t) + '</span><span class="fh">Do you know what it means? Tap to flip.</span></button>' +
        '<div class="row" id="judge" hidden><button class="btn" id="again">Still learning</button><button class="btn primary" id="know">✓ I know it</button></div></div>';
      bindGo();
      var f = document.getElementById("flash");
      f.addEventListener("click", function () {
        f.classList.add("flipped");
        f.innerHTML = '<span class="ft small">' + esc(t.t) + '</span><span class="fd">' + esc(t.d) + '</span><span class="fe"><b>Example:</b> ' + esc(t.ex) + "</span>";
        document.getElementById("judge").hidden = false;
        document.getElementById("know").focus();
      });
      document.getElementById("know").addEventListener("click", function () { S.vocab[t.id] = 1; save(); knew++; i++; card(); });
      document.getElementById("again").addEventListener("click", function () { delete S.vocab[t.id]; save(); i++; card(); });
      f.focus();
    }
    card();
  }

  // ---------- Field Guide ----------
  function viewGuide() {
    if (!G) return go("#/");
    var secs = [["g-path", "Starter path"], ["g-tiers", "Exchanges & wallets"], ["g-look", "What to look for"], ["g-safe", "Safety"], ["g-maint", "Maintenance"], ["g-iso", "ISO 20022 coins"], ["g-sheets", "Cheat sheets"]];
    var html = '<div class="q-top"><div class="crumbs"><button data-go="#/">← Map</button></div>' +
      '<span class="eyebrow">Field Guide</span><h1>Exchanges, wallets and safety</h1>' +
      '<p class="lead muted">The Praeclaris reference shelf: which platforms to research at each level, exactly what to look for, the safety rules and a maintenance rhythm. Names are examples to research, not recommendations; check what\'s available in your state.</p>' +
      '<nav class="gnav" aria-label="Field Guide sections">' + secs.map(function (s) { return '<button type="button" data-jump="' + s[0] + '">' + s[1] + "</button>"; }).join("") + "</nav>";

    html += '<section class="gsec" id="g-path"><h2>The Praeclaris starter path</h2>' + diagram("moneymap") + '<ol class="gpath">' + G.path.map(function (p) { return "<li><b>" + esc(p.t) + ":</b> " + esc(p.d) + "</li>"; }).join("") + "</ol></section>";

    html += '<section class="gsec" id="g-tiers"><h2>Exchanges and wallets by level</h2><div class="tiers">' + G.tiers.map(function (t) {
      return '<div class="tier card lvl-' + t.lvl + '"><span class="tag lvl-' + t.lvl + '">' + esc(t.level) + "</span>" +
        "<h4>Exchanges (on-ramps / off-ramps)</h4>" + t.exchanges.map(function (e) {
          return '<div class="tx"><b>' + esc(e.n) + '</b> <span class="muted">· ' + esc(e.best) + "</span><p>" + esc(e.f) + '</p><p class="small"><b>How to start:</b> ' + esc(e.start) + '</p><p class="small warn-text"><b>🛡</b> ' + esc(e.tip) + "</p></div>";
        }).join("") +
        '<h4>Hot wallet</h4><div class="tx"><b>' + esc(t.hot.n) + "</b><p>" + esc(t.hot.f) + '</p><p class="small warn-text"><b>🛡</b> ' + esc(t.hot.tip) + "</p></div>" +
        '<h4>Cold (hardware) wallet</h4><div class="tx"><b>' + esc(t.cold.n) + "</b><p>" + esc(t.cold.f) + '</p><p class="small warn-text"><b>🛡</b> ' + esc(t.cold.tip) + "</p></div></div>";
    }).join("") + "</div></section>";

    html += '<section class="gsec" id="g-look"><h2>What to look for</h2><div class="grid g3">' + G.lookfor.map(function (l, i) {
      return '<div class="card' + (i === 2 ? " redflags" : "") + '"><h4>' + esc(l.t) + '</h4><ul class="list' + (i === 2 ? " bad" : "") + '">' + l.items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>";
    }).join("") + "</div></section>";

    html += '<section class="gsec" id="g-safe"><h2>Safety and best practices</h2><div class="grid g3">' + G.safety.map(function (s) {
      return '<div class="card"><h4>🛡 ' + esc(s.t) + '</h4><ul class="list">' + s.items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>";
    }).join("") + "</div></section>";

    html += '<section class="gsec" id="g-maint"><h2>Crypto maintenance checklist</h2><p class="muted">Pick your level. Your ticks are saved in this browser; reset a period when you start it again.</p>' +
      '<div class="q-tracks" id="mtabs">' + G.maintenance.map(function (l, i) { return '<a href="javascript:void 0" data-lv="' + i + '">' + esc(l.level) + "</a>"; }).join("") + '</div><div id="mbox"></div></section>';

    html += '<section class="gsec" id="g-iso"><h2>"ISO 20022 coins": the facts</h2><p class="notice warn">' + esc(G.iso.note) + '</p><div class="tbl"><table><thead><tr><th>Ticker</th><th>Network</th><th>Designed for</th></tr></thead><tbody>' +
      G.iso.coins.map(function (c) { return "<tr><td><b>" + esc(c[0]) + "</b></td><td>" + esc(c[1]) + "</td><td>" + esc(c[2]) + "</td></tr>"; }).join("") + "</tbody></table></div></section>";

    html += '<section class="gsec" id="g-sheets"><h2>Praeclaris cheat sheets</h2><p class="muted">Tap any sheet to enlarge it. Right-click or long-press to save or print.</p>' + sheetThumbs(G.sheets.map(function (s) { return s.id; })) + "</section></div>";

    app.innerHTML = html;
    bindGo();
    app.querySelectorAll("[data-jump]").forEach(function (b) { b.addEventListener("click", function () { document.getElementById(b.dataset.jump).scrollIntoView({ behavior: "smooth" }); }); });
    var lv = S.maintLevel || 0;
    function drawMaint() {
      var L = G.maintenance[lv];
      document.querySelectorAll("#mtabs a").forEach(function (a) { a.classList.toggle("on", +a.dataset.lv === lv); });
      document.getElementById("mbox").innerHTML = '<p class="muted">' + esc(L.sub) + '</p><div class="grid g2">' + L.groups.map(function (g, gi) {
        return '<div class="card"><h4>' + esc(g.when) + ' <button type="button" class="linkbtn" data-reset="' + gi + '">reset</button></h4><ul class="checks">' + g.items.map(function (it, ii) {
          var k = lv + "." + gi + "." + ii;
          return '<li><label><input type="checkbox" data-k="' + k + '"' + (S.maint[k] ? " checked" : "") + "><span>" + esc(it) + "</span></label></li>";
        }).join("") + "</ul></div>";
      }).join("") + "</div>";
      document.querySelectorAll("#mbox input").forEach(function (cb) { cb.addEventListener("change", function () { if (cb.checked) S.maint[cb.dataset.k] = 1; else delete S.maint[cb.dataset.k]; save(); }); });
      document.querySelectorAll("[data-reset]").forEach(function (b) { b.addEventListener("click", function () {
        Object.keys(S.maint).forEach(function (k) { if (k.indexOf(lv + "." + b.dataset.reset + ".") === 0) delete S.maint[k]; }); save(); drawMaint();
      }); });
    }
    document.querySelectorAll("#mtabs a").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); lv = +a.dataset.lv; S.maintLevel = lv; save(); drawMaint(); }); });
    drawMaint();
  }

  function viewCertificate() {
    if (doneCount() !== T.missions.length) return go("#/");
    var last = Object.keys(S.done).map(function (k) { return S.done[k].at; }).sort().pop();
    app.innerHTML = '<div class="q-top no-print"><div class="crumbs"><button data-go="#/">← Map</button></div>' +
      '<label for="nm">Name for your certificate (stays in this browser)</label><input id="nm" value="' + esc(S.name) + '" placeholder="Your name" style="max-width:420px">' +
      '<div class="row"><button class="btn primary" onclick="window.print()">Print or save as PDF</button></div></div>' +
      '<div class="cert" style="margin:30px auto 60px"><img src="../assets/logo.png" alt="" style="width:90px;margin:0 auto 10px;border-radius:12px">' +
      "<h1>Certificate of Completion</h1><p>This certifies that</p><div class=\"nm\" id=\"certName\">" + esc(S.name || "Your Name") + "</div>" +
      "<p>completed every mission of <b>" + esc(T.title) + "</b>, " + esc(T.subtitle) + ", earning the rank of <b>" + esc(T.ranks[T.ranks.length - 1].name) + "</b>.</p>" +
      "<p>" + T.missions.length + " missions · " + earnedXP() + " XP · completed " + esc(last) + "</p><p style=\"margin-top:26px;font-family:var(--serif)\">PRAECLARIS · Clarity in Complex Systems</p>" +
      '<p style="font-size:.75rem">Self-reported educational completion. Not a professional license or credential.</p></div>';
    bindGo();
    document.getElementById("nm").addEventListener("input", function (e) { S.name = e.target.value.slice(0, 80); save(); document.getElementById("certName").textContent = S.name || "Your Name"; });
  }

  function bindGo() { app.querySelectorAll("[data-go]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.go); }); }); }

  // ---------- word popovers and image lightbox (delegated, work on every view) ----------
  function closePop() { var p = document.querySelector(".tpop"); if (p) p.remove(); }
  document.addEventListener("click", function (e) {
    var tb = e.target.closest && e.target.closest(".term");
    if (tb) {
      e.preventDefault(); e.stopPropagation(); closePop();
      var t = V.terms[+tb.dataset.term]; if (!t) return;
      var p = document.createElement("div"); p.className = "tpop"; p.setAttribute("role", "dialog"); p.setAttribute("aria-label", t.t);
      p.innerHTML = "<b>" + esc(t.t) + "</b><p>" + esc(t.d) + '</p><p class="muted"><b>Example:</b> ' + esc(t.ex) + '</p><button type="button" class="linkbtn" data-close>Close</button>';
      document.body.appendChild(p);
      var r = tb.getBoundingClientRect(), w = Math.min(340, innerWidth - 32);
      p.style.width = w + "px";
      p.style.left = Math.max(16, Math.min(r.left + window.scrollX, window.scrollX + innerWidth - w - 16)) + "px";
      p.style.top = (r.bottom + window.scrollY + 8) + "px";
      p.querySelector("[data-close]").focus();
      return;
    }
    if (e.target.closest && (e.target.closest("[data-close]") || !e.target.closest(".tpop"))) closePop();
    var sh = e.target.closest && e.target.closest(".sheet");
    if (sh) {
      var ov = document.createElement("div"); ov.className = "overlay lightbox";
      ov.innerHTML = '<figure role="dialog" aria-modal="true" aria-label="' + esc(sh.dataset.cap) + '"><img src="' + IMG + esc(sh.dataset.img) + '" alt="' + esc(sh.dataset.cap) + '"><figcaption>' + esc(sh.dataset.cap) +
        ' · <a href="' + IMG + esc(sh.dataset.img) + '" download>Download</a> · <button type="button" class="linkbtn" data-x>Close ✕</button></figcaption></figure>';
      document.body.appendChild(ov);
      ov.addEventListener("click", function (ev) { if (ev.target === ov || ev.target.closest("[data-x]")) ov.remove(); });
      ov.querySelector("[data-x]").focus();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    closePop(); var lb = document.querySelector(".lightbox"); if (lb) lb.remove();
  });

  // ---------- confetti ----------
  function confetti(n) {
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var cv = document.createElement("canvas"); cv.className = "confetti"; document.body.appendChild(cv);
    var ctx = cv.getContext && cv.getContext("2d"); if (!ctx) { cv.remove(); return; }
    var W = cv.width = innerWidth, H = cv.height = innerHeight;
    var cols = ["#f5b800", "#1d4ed8", "#047857", "#a21caf"], ps = [];
    for (var i = 0; i < n; i++) ps.push({ x: W / 2 + (Math.random() - .5) * 200, y: H / 3, vx: (Math.random() - .5) * 12, vy: Math.random() * -12 - 4, s: Math.random() * 6 + 3, c: cols[i % 4], r: Math.random() * 6 });
    var t = 0;
    (function frame() {
      ctx.clearRect(0, 0, W, H); t++;
      ps.forEach(function (p) { p.vy += .35; p.x += p.vx; p.y += p.vy; p.r += .1; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .6); ctx.restore(); });
      if (t < 120) requestAnimationFrame(frame); else cv.remove();
    })();
  }

  // ---------- router ----------
  function render() {
    closePop();
    var h = location.hash.replace(/^#\/?/, "").split("/");
    if (h[0] === "realm") viewRealm(h[1]);
    else if (h[0] === "mission") viewMission(h[1], h[2]);
    else if (h[0] === "certificate") viewCertificate();
    else if (h[0] === "vocab") { viewVocab(h[1]); top(); }
    else if (h[0] === "guide") { viewGuide(); top(); }
    else viewMap();
    document.title = T.title + " · Praeclaris";
  }
  window.addEventListener("hashchange", function () { document.querySelectorAll(".overlay").forEach(function (o) { o.remove(); }); render(); });
  render();
})();
