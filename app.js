/* মান্নানঘাট কেবল নেটওয়ার্ক — ইন্টারঅ্যাকশন (config.js থেকে ডেটা নিয়ে রেন্ডার করে) */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- config থেকে টেক্সট বসানো ---------- */
  $$("[data-cfg]").forEach(function (el) {
    var v = SITE[el.getAttribute("data-cfg")];
    if (v !== undefined) el.textContent = v;
  });

  function waLink(text) {
    return "https://wa.me/" + SITE.whatsapp + (text ? "?text=" + encodeURIComponent(text) : "");
  }
  /* data-cfg-href="tel:hotline" | "wa:whatsapp" | "watext:বার্তা" | "ext:speedTestUrl" */
  $$("[data-cfg-href]").forEach(function (el) {
    var spec = el.getAttribute("data-cfg-href").split(":");
    var kind = spec[0], key = spec.slice(1).join(":");
    if (kind === "tel") el.href = "tel:" + SITE[key].replace(/[^+\d]/g, "");
    else if (kind === "wa") el.href = waLink();
    else if (kind === "watext") el.href = waLink(key);
    else if (kind === "ext") el.href = SITE[key];
  });

  $("#year").textContent = new Date().getFullYear();

  /* ---------- প্যাকেজ কার্ড ---------- */
  $("#packageCards").innerHTML = PACKAGES.map(function (p) {
    var feats = p.features.map(function (f) { return "<li>" + f + "</li>"; }).join("");
    return '<div class="card' + (p.popular ? " popular" : "") + '">' +
      (p.popular ? '<span class="pop-badge">সবচেয়ে জনপ্রিয়</span>' : "") +
      '<p class="pname">' + p.name + '</p>' +
      '<p class="speed">' + p.speed + '</p>' +
      '<p class="price"><b>৳' + p.price + '</b> /মাস</p>' +
      "<ul>" + feats + "</ul>" +
      '<a class="btn btn-primary" target="_blank" rel="noopener" href="' +
      waLink("আসসালামু আলাইকুম, আমি " + p.name + " প্যাকেজ (" + p.speed + ", ৳" + p.price + "/মাস) নিতে চাই।") +
      '">এই প্যাকেজ নিন</a></div>';
  }).join("");

  /* প্যাকেজ সিলেক্ট (ফর্মের জন্য) */
  $("#fPack").innerHTML = PACKAGES.map(function (p) {
    return '<option value="' + p.name + " (" + p.speed + ")" + '">' + p.name + " — " + p.speed + " (৳" + p.price + ")</option>";
  }).join("");

  /* ---------- কভারেজ ---------- */
  var chips = $("#areaChips"), result = $("#areaResult");
  chips.innerHTML = COVERAGE_AREAS.map(function (a) {
    return '<button type="button" class="chip">' + a + "</button>";
  }).join("");

  function checkArea(q) {
    q = (q || "").trim();
    if (!q) { result.textContent = ""; result.className = "area-result"; return; }
    var hit = COVERAGE_AREAS.filter(function (a) { return a.indexOf(q) !== -1 || q.indexOf(a) !== -1; });
    if (hit.length) {
      result.textContent = "✓ " + hit.join(", ") + " — আমাদের কভারেজের মধ্যে আছে!";
      result.className = "area-result ok";
    } else {
      result.textContent = "এই এলাকায় এখনো সার্ভিস নেই — নিচের লিংকে ক্লিক করে জানান, আমরা কল করব।";
      result.className = "area-result no";
    }
  }
  $("#areaSearch").addEventListener("input", function (e) { checkArea(e.target.value); });
  $$(".chip", chips).forEach(function (c) {
    c.addEventListener("click", function () {
      $("#areaSearch").value = c.textContent; checkArea(c.textContent);
      $$(".chip", chips).forEach(function (x) { x.classList.remove("on"); });
      c.classList.add("on");
    });
  });

  /* ---------- ফিচার ---------- */
  var icons = [
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M13 2 4.5 13.5H11L9.5 22 19 10h-7.5L13 2Z"/></svg>',
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5"/></svg>',
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 7v5l3 3"/></svg>',
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/></svg>'
  ];
  $("#featureGrid").innerHTML = FEATURES.map(function (f, i) {
    return '<div class="feat"><div class="ic">' + (icons[i % icons.length]) + "</div><h3>" + f.title + "</h3><p>" + f.desc + "</p></div>";
  }).join("");

  /* ---------- পেমেন্ট ---------- */
  $("#payCards").innerHTML = PAYMENTS.map(function (p) {
    return '<div class="card"><p class="pname">' + p.method + '</p>' +
      '<p class="pay-num">' + p.number + '</p>' +
      '<p class="pay-note">' + p.note + '</p>' +
      '<button type="button" class="copy-btn" data-copy="' + p.number + '">নম্বর কপি করুন</button></div>';
  }).join("");
  $("#paySteps").innerHTML = PAYMENT_STEPS.map(function (s) { return "<li>" + s + "</li>"; }).join("");
  $$(".copy-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      var done = function () { b.textContent = "কপি হয়েছে ✓"; setTimeout(function () { b.textContent = "নম্বর কপি করুন"; }, 1600); };
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

  /* ---------- FAQ ---------- */
  $("#faqList").innerHTML = FAQS.map(function (f) {
    return '<div class="faq"><button type="button">' + f.q + '<span class="pm">+</span></button><div class="ans"><p>' + f.a + "</p></div></div>";
  }).join("");
  $$(".faq button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.parentElement, open = item.classList.contains("open");
      $$(".faq").forEach(function (x) { x.classList.remove("open"); $(".pm", x).textContent = "+"; });
      if (!open) { item.classList.add("open"); $(".pm", item).textContent = "–"; }
    });
  });

  /* ---------- নোটিশ ---------- */
  if (NOTICES && NOTICES.length) {
    $("#noticeSection").hidden = false;
    $("#noticeList").innerHTML = NOTICES.map(function (n) {
      return "<p><span class='notice-date'>" + n.date + "</span>" + n.text + "</p>";
    }).join("");
  }

  /* ---------- নতুন কানেকশন ফর্ম → WhatsApp ---------- */
  $("#connForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("#fName").value.trim(),
        phone = $("#fPhone").value.trim(),
        addr = $("#fAddr").value.trim(),
        pack = $("#fPack").value,
        err = $("#formErr");
    if (!name || !/^01\d{9}$/.test(phone) || !addr) { err.hidden = false; return; }
    err.hidden = true;
    var msg = "আসসালামু আলাইকুম, নতুন কানেকশন চাই।\n\nনাম: " + name + "\nমোবাইল: " + phone + "\nঠিকানা: " + addr + "\nপ্যাকেজ: " + pack;
    window.open(waLink(msg), "_blank", "noopener");
  });
})();
