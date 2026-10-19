/* Mannanghat Cable Network — interactions (renders from config.js) */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- inject text from config ---------- */
  $$("[data-cfg]").forEach(function (el) {
    var v = SITE[el.getAttribute("data-cfg")];
    if (v !== undefined) el.textContent = v;
  });

  function waLink(text) {
    return "https://wa.me/" + SITE.whatsapp + (text ? "?text=" + encodeURIComponent(text) : "");
  }
  /* data-cfg-href="tel:hotline" | "wa:whatsapp" | "watext:message" | "ext:speedTestUrl" */
  $$("[data-cfg-href]").forEach(function (el) {
    var spec = el.getAttribute("data-cfg-href").split(":");
    var kind = spec[0], key = spec.slice(1).join(":");
    if (kind === "tel") el.href = "tel:" + SITE[key].replace(/[^+\d]/g, "");
    else if (kind === "wa") el.href = waLink();
    else if (kind === "watext") el.href = waLink(key);
    else if (kind === "ext") el.href = SITE[key];
  });

  var yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- hide Facebook when not set ---------- */
  if (!SITE.facebook) {
    $$("[data-fb-wrap]").forEach(function (el) { el.style.display = "none"; });
  }

  /* ---------- hide coverage section when no areas ---------- */
  if (!COVERAGE_AREAS.length) {
    var cov = $("#coverage");
    if (cov) cov.style.display = "none";
    $$('a[href="#coverage"]').forEach(function (el) { el.style.display = "none"; });
  }

  /* ---------- package cards ---------- */
  var pc = $("#packageCards");
  if (pc) {
    pc.innerHTML = PACKAGES.map(function (p) {
      var feats = p.features.map(function (f) { return "<li>" + f + "</li>"; }).join("");
      return '<div class="card' + (p.popular ? " popular" : "") + '">' +
        (p.popular ? '<span class="pop-badge">Most Popular</span>' : "") +
        '<p class="pname">' + p.name + '</p>' +
        '<p class="speed">' + p.speed + '</p>' +
        '<p class="price"><b>Tk ' + p.price + '</b> /month</p>' +
        "<ul>" + feats + "</ul>" +
        '<a class="btn btn-primary" target="_blank" rel="noopener" href="' +
        waLink("Hello, I would like the " + p.name + " package (" + p.speed + ", Tk " + p.price + "/month).") +
        '">Choose This Plan</a></div>';
    }).join("");
  }

  /* package select (form) */
  var fp = $("#fPack");
  if (fp) {
    fp.innerHTML = PACKAGES.map(function (p) {
      return '<option value="' + p.name + " (" + p.speed + ")" + '">' + p.name + " — " + p.speed + " (Tk " + p.price + ")</option>";
    }).join("");
  }

  /* ---------- coverage checker ---------- */
  var chips = $("#areaChips"), result = $("#areaResult"), search = $("#areaSearch");
  if (chips && COVERAGE_AREAS.length) {
    chips.innerHTML = COVERAGE_AREAS.map(function (a) {
      return '<button type="button" class="chip">' + a + "</button>";
    }).join("");
    $$(".chip", chips).forEach(function (c) {
      c.addEventListener("click", function () {
        search.value = c.textContent; checkArea(c.textContent);
        $$(".chip", chips).forEach(function (x) { x.classList.remove("on"); });
        c.classList.add("on");
      });
    });
  }
  function checkArea(q) {
    q = (q || "").trim();
    if (!q) { result.textContent = ""; result.className = "area-result"; return; }
    var ql = q.toLowerCase();
    var hit = COVERAGE_AREAS.filter(function (a) {
      var al = a.toLowerCase();
      return al.indexOf(ql) !== -1 || ql.indexOf(al) !== -1;
    });
    if (hit.length) {
      result.textContent = "✓ " + hit.join(", ") + " — covered by our network!";
      result.className = "area-result ok";
    } else {
      result.textContent = "No service in this area yet — tap the link below and we'll call you back.";
      result.className = "area-result no";
    }
  }
  if (search) search.addEventListener("input", function (e) { checkArea(e.target.value); });

  /* ---------- features ---------- */
  var fg = $("#featureGrid");
  if (fg) {
    var icons = [
      '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M13 2 4.5 13.5H11L9.5 22 19 10h-7.5L13 2Z"/></svg>',
      '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5"/></svg>',
      '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 7v5l3 3"/></svg>',
      '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/></svg>'
    ];
    fg.innerHTML = FEATURES.map(function (f, i) {
      return '<div class="feat"><div class="ic">' + (icons[i % icons.length]) + "</div><h3>" + f.title + "</h3><p>" + f.desc + "</p></div>";
    }).join("");
  }

  /* ---------- payment ---------- */
  var payc = $("#payCards");
  if (payc) {
    payc.innerHTML = PAYMENTS.map(function (p) {
      return '<div class="card"><p class="pname">' + p.method + '</p>' +
        '<p class="pay-num">' + p.number + '</p>' +
        '<p class="pay-note">' + p.note + '</p>' +
        '<button type="button" class="copy-btn" data-copy="' + p.number + '">Copy Number</button></div>';
    }).join("");
    $$(".copy-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        var done = function () { b.textContent = "Copied ✓"; setTimeout(function () { b.textContent = "Copy Number"; }, 1600); };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(b.getAttribute("data-copy")).then(done, done);
        } else {
          var t = document.createElement("textarea");
          t.value = b.getAttribute("data-copy"); document.body.appendChild(t); t.select();
          try { document.execCommand("copy"); } catch (e) {}
          document.body.removeChild(t); done();
        }
      });
    });
  }
  var ps = $("#paySteps");
  if (ps) ps.innerHTML = PAYMENT_STEPS.map(function (s) { return "<li>" + s + "</li>"; }).join("");

  /* ---------- FAQ accordion ---------- */
  var fl = $("#faqList");
  if (fl) {
    fl.innerHTML = FAQS.map(function (f) {
      return '<div class="faq"><button type="button">' + f.q + '<span class="pm">+</span></button><div class="ans"><p>' + f.a + "</p></div></div>";
    }).join("");
    $$(".faq button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.parentElement, open = item.classList.contains("open");
        $$(".faq").forEach(function (x) { x.classList.remove("open"); $(".pm", x).textContent = "+"; });
        if (!open) { item.classList.add("open"); $(".pm", item).textContent = "–"; }
      });
    });
  }

  /* ---------- notices ---------- */
  var ns = $("#noticeSection");
  if (ns && NOTICES && NOTICES.length) {
    ns.hidden = false;
    $("#noticeList").innerHTML = NOTICES.map(function (n) {
      return "<p><span class='notice-date'>" + n.date + "</span>" + n.text + "</p>";
    }).join("");
  }

  /* ---------- new-connection form → WhatsApp ---------- */
  var form = $("#connForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("#fName").value.trim(),
          phone = $("#fPhone").value.trim(),
          addr = $("#fAddr").value.trim(),
          pack = $("#fPack").value,
          err = $("#formErr");
      if (!name || !/^01\d{9}$/.test(phone) || !addr) { err.hidden = false; return; }
      err.hidden = true;
      var msg = "Hello, I would like a new connection.\n\nName: " + name + "\nMobile: " + phone + "\nAddress: " + addr + "\nPackage: " + pack;
      window.open(waLink(msg), "_blank", "noopener");
    });
  }
})();
