// Praeclaris Quest engine. One engine, many tracks (data/*-quest.js).
// No accounts, no tracking, no network calls: progress lives in localStorage.
(function () {
  "use strict";

  var TRACKS = { crypto: window.QUEST_CRYPTO, business: window.QUEST_BUSINESS };
  var params = new URLSearchParams(location.search);
  var trackId = TRACKS[params.get("track")] ? params.get("track") : "crypto";
  var T = TRACKS[trackId];
  var KEY = "praeclaris.quest." + trackId + ".v1";
  var UNLOCK_AT = 0.6; // share of the previous realm needed to unlock the next
  var app = document.getElementById("app");

  // ---------- state ----------
  function blank() { return { done: {}, steps: {}, streak: { last: "", count: 0 }, openAll: false, name: "" }; }
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

  // ---------- views ----------
  function hud() {
    var r = rankInfo(), done = Object.keys(S.done).length;
    var badges = T.realms.filter(function (rm) { return realmShare(rm.id) === 1; }).length;
    return '<div class="hud">' +
      '<div class="card rank"><div class="k">Rank</div><div class="v">' + esc(r.cur.name) + '</div>' +
      '<div class="bar" aria-label="Progress to next rank"><span style="width:' + r.pct + '%"></span></div>' +
      '<div class="k" style="margin-top:6px">' + (r.next ? r.pct + "% to " + esc(r.next.name) : "Highest rank reached") + "</div></div>" +
      '<div class="card"><div class="k">XP</div><div class="v">' + earnedXP() + '</div><div class="k">of ' + totalXP() + "</div></div>" +
      '<div class="card"><div class="k">Missions</div><div class="v">' + done + "/" + T.missions.length + "</div></div>" +
      '<div class="card"><div class="k">Streak · Badges</div><div class="v">' + (S.streak.count || 0) + "d · " + badges + "/" + T.realms.length + "</div></div>" +
      "</div>";
  }

  function viewMap() {
    var html = '<div class="q-top"><div class="q-tracks" role="tablist">' +
      '<a href="?track=crypto"' + (trackId === "crypto" ? ' class="on"' : "") + ">Crypto Quest</a>" +
      '<a href="?track=business"' + (trackId === "business" ? ' class="on"' : "") + ">Builder's Guild</a></div>" +
      '<span class="eyebrow">' + esc(T.subtitle) + "</span><h1>" + esc(T.title) + '</h1><p class="lead muted" style="max-width:720px">' + esc(T.intro) + "</p>" +
      '<p class="notice">🔒 ' + esc(T.promise) + "</p>" + hud() + colorKey() + "</div>";

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

    if (Object.keys(S.done).length === T.missions.length) {
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
      '<span class="eyebrow">Realm ' + (idx + 1) + " · " + esc(rm.level) + "</span><h1>" + esc(rm.name) + '</h1><p class="lead muted">' + esc(rm.tagline) + "</p>" + hud() + "</div>";
    html += '<div class="missions">' + realmMissions(rid).map(function (m, i) {
      var d = S.done[m.id];
      return '<button class="mcard' + (d ? " done" : "") + '" data-m="' + m.id + '"><span class="ic">' + (d ? "✓" : i + 1) + "</span>" +
        "<span><h4>" + esc(m.title) + "</h4><p>" + m.minutes + " min · " + m.xp + " XP" + (m.quiz ? " + quiz bonus" : "") + "</p></span>" +
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
    stage = stage || "brief";
    var stages = [["brief", "Briefing"], ["do", "Do it"], ["check", "Knowledge check"], ["debrief", "Debrief"]];
    var si = stages.findIndex(function (s) { return s[0] === stage; });
    var html = '<div class="q-top mission"><div class="crumbs"><button data-go="#/">Map</button> / <button data-go="#/realm/' + rm.id + '">' + esc(rm.name) + "</button></div>" +
      '<span class="eyebrow">' + (m.boss ? "Final trial · " : "") + m.minutes + " min · " + m.xp + " XP</span><h1>" + esc(m.title) + "</h1>" +
      '<div class="stepper">' + stages.map(function (s, i) { return '<span class="' + (i === si ? "on" : i < si ? "past" : "") + '">' + (i + 1) + ". " + s[1] + "</span>"; }).join("") + "</div>";

    if (stage === "brief") {
      html += '<p class="lede">' + esc(m.brief) + "</p>" +
        (m.myth ? '<div class="myth"><div class="m"><b>Myth</b>' + esc(m.myth.myth) + '</div><div class="f"><b>Fact</b>' + esc(m.myth.fact) + "</div></div>" : "") +
        '<div class="protect"><b class="warn-text">🛡 Protect:</b> ' + esc(m.protect) + "</div>" +
        (m.lesson ? '<p>Go deeper: <a href="../learn/#week-' + m.lesson + '">Library lesson, week ' + m.lesson + "</a></p>" : "") +
        sources(m) + '<div class="row"><button class="btn primary" data-go="#/mission/' + m.id + '/do">Start mission</button></div>';
    } else if (stage === "do") {
      var st = S.steps[m.id] || [];
      html += "<p>Tick each step as you finish it. Take your time; your place is saved.</p><ul class=\"checks\">" + m.steps.map(function (s, i) {
        return '<li><label><input type="checkbox" data-i="' + i + '"' + (st[i] ? " checked" : "") + "><span>" + esc(s) + "</span></label></li>";
      }).join("") + "</ul>" +
        '<p class="notice practice"><b>Practice option:</b> ' + esc(m.practice) + "</p>" +
        '<div class="row"><button class="btn" data-go="#/mission/' + m.id + '">Back</button><button class="btn primary" id="toCheck">Continue to knowledge check</button></div>';
    } else if (stage === "check") {
      html += '<p>Answer each question. Getting one right on the first try earns a 10 XP bonus.</p><div id="quiz">' + (m.quiz || []).map(function (q, qi) {
        return '<div class="q card" data-q="' + qi + '"><h4>' + (qi + 1) + ". " + esc(q.q) + '</h4><div class="opts">' + q.options.map(function (o, oi) {
          return '<button class="opt" data-o="' + oi + '">' + esc(o) + "</button>";
        }).join("") + '</div><div class="explain" hidden></div></div>';
      }).join("") + "</div>" +
        '<div class="row"><button class="btn" data-go="#/mission/' + m.id + '/do">Back</button><button class="btn primary" id="toDebrief" disabled>Continue to debrief</button></div>';
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
        go("#/mission/" + m.id + (m.quiz && m.quiz.length ? "/check" : "/debrief"));
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
              sessionStorage.setItem("pq.bonus." + m.id, String(Object.keys(firstTry).length));
              document.getElementById("toDebrief").disabled = false;
            }
          });
        });
      });
      document.getElementById("toDebrief").addEventListener("click", function () { go("#/mission/" + m.id + "/debrief"); });
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
    var before = rankInfo().cur.name, realmBefore = realmShare(m.realm);
    var bonus = 0;
    try { bonus = +(sessionStorage.getItem("pq.bonus." + m.id) || 0) * 10; } catch (e) {}
    var prev = S.done[m.id];
    var xp = Math.max(m.xp + bonus, prev ? prev.xp : 0);
    S.done[m.id] = { mode: mode, xp: xp, at: today() };
    bumpStreak(); save();
    var after = rankInfo().cur.name, realmNow = realmShare(m.realm);
    var rm = T.realms.find(function (r) { return r.id === m.realm; });
    var lines = [];
    if (bonus) lines.push(["line", "Includes a " + bonus + " XP first-try quiz bonus"]);
    if (realmNow === 1 && realmBefore < 1) lines.push(["line badge-line", "★ Badge earned: " + rm.badge]);
    if (after !== before) lines.push(["line badge-line", "▲ Rank up: " + after]);
    var nextIdx = T.realms.findIndex(function (r) { return r.id === m.realm; }) + 1;
    if (T.realms[nextIdx] && realmBefore < UNLOCK_AT && realmNow >= UNLOCK_AT && !S.openAll) lines.push(["line unlock", "🔓 Unlocked: " + T.realms[nextIdx].name]);
    var all = Object.keys(S.done).length === T.missions.length;
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

  function viewCertificate() {
    if (Object.keys(S.done).length !== T.missions.length) return go("#/");
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

  // ---------- confetti ----------
  function confetti(n) {
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var cv = document.createElement("canvas"); cv.className = "confetti"; document.body.appendChild(cv);
    var ctx = cv.getContext("2d"), W = cv.width = innerWidth, H = cv.height = innerHeight;
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
    var h = location.hash.replace(/^#\/?/, "").split("/");
    if (h[0] === "realm") viewRealm(h[1]);
    else if (h[0] === "mission") viewMission(h[1], h[2]);
    else if (h[0] === "certificate") viewCertificate();
    else viewMap();
    document.title = T.title + " · Praeclaris";
  }
  window.addEventListener("hashchange", function () { var ov = document.querySelector(".overlay"); if (ov) ov.remove(); render(); });
  render();
})();
