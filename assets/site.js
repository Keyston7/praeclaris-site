// Shared header and footer. Edit the NAV list once; every page updates.
// Each page sets <body data-root="."> (or ".." in a subfolder) and data-page="...".
(function () {
  var NAV = [
    { id: "quest", href: "quest/", label: "Crypto Quest" },
    { id: "guild", href: "quest/?track=business", label: "Builder's Guild" },
    { id: "learn", href: "learn/", label: "Free Library" },
    { id: "practice", href: "practice.html", label: "I Practice It" },
    { id: "advisory", href: "advisory.html", label: "Advisory" }
  ];
  var CONTACT = "contact@praeclaris.com";

  var body = document.body;
  var root = (body.getAttribute("data-root") || ".").replace(/\/$/, "");
  var page = body.getAttribute("data-page") || "";
  var r = function (p) { return root + "/" + p; };

  var header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML =
    '<a class="skip" href="#main">Skip to content</a>' +
    '<div class="wrap">' +
    '<a class="brand" href="' + r("index.html") + '"><img src="' + r("assets/logo.png") + '" alt="" width="38" height="38">PRAECLARIS</a>' +
    '<button class="menu-btn" aria-expanded="false" aria-controls="site-nav">Menu</button>' +
    '<nav class="nav" id="site-nav" aria-label="Main">' +
    NAV.map(function (n) {
      return '<a href="' + r(n.href) + '"' + (n.id === page ? ' aria-current="page"' : "") + ">" + n.label + "</a>";
    }).join("") +
    '<a class="btn primary small" href="' + r("join.html") + '">Join free</a>' +
    '<button class="theme-btn" type="button" aria-label="Switch light or dark theme"></button>' +
    "</nav></div>";
  body.insertBefore(header, body.firstChild);

  // Theme: light by default; dark is an opt-in remembered per browser.
  var themeBtn = header.querySelector(".theme-btn");
  function setThemeLabel() {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    themeBtn.textContent = dark ? "☀ Light" : "☾ Dark";
    themeBtn.setAttribute("aria-pressed", dark ? "true" : "false");
  }
  themeBtn.addEventListener("click", function () {
    var dark = document.documentElement.getAttribute("data-theme") !== "dark";
    if (dark) document.documentElement.setAttribute("data-theme", "dark"); else document.documentElement.removeAttribute("data-theme");
    try { localStorage.setItem("praeclaris.theme", dark ? "dark" : "light"); } catch (e) { /* storage blocked: theme lasts this page */ }
    setThemeLabel();
  });
  setThemeLabel();

  var btn = header.querySelector(".menu-btn");
  var nav = header.querySelector(".nav");
  btn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML =
    '<div class="wrap cols">' +
    "<div><h4>Praeclaris</h4><p>Clarity in Complex Systems. Free education on blockchain, crypto, business development, wealth and sovereignty.</p>" +
    '<p class="disclaimer">Education only. Nothing on this site is financial, investment, tax or legal advice, or a recommendation to buy or sell any asset. Crypto assets are volatile and you can lose money. Do your own research and consult licensed professionals about your situation.</p></div>' +
    '<div><h4>Learn</h4><p><a href="' + r("quest/") + '">Crypto Quest</a><br><a href="' + r("quest/?track=business") + '">Builder\'s Guild</a><br><a href="' + r("learn/") + '">Free Library</a><br><a href="' + r("practice.html") + '">I Practice It</a></p></div>' +
    '<div><h4>Work with us</h4><p><a href="' + r("join.html") + '">Membership</a><br><a href="' + r("advisory.html") + '">Advisory</a><br><a href="mailto:' + CONTACT + '">' + CONTACT + "</a></p></div>" +
    '</div><div class="wrap" style="margin-top:18px">© ' + new Date().getFullYear() + " Praeclaris LLC. All rights reserved.</div>";
  body.appendChild(footer);
})();
