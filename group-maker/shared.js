// Shared config + API + grouping logic for index.html (student) and teacher.html.
// Loaded as a plain <script> before each page's own inline script — no build step,
// no module system, so everything hangs off the single global `GroupMaker`.
var GroupMaker = (function () {
  "use strict";

  var API_URL = "https://script.google.com/macros/s/AKfycbyQ9fjXC5J4resy0NEeaZuupAKldsYacWkJ1MRUT0nYb-EABM41XdSCWvb6zuGyNxO5/exec";
  var isDemo = API_URL.indexOf("REPLACE_WITH") !== -1;
  var demoStudents = [];

  // ---- API (CORS-safe: GET plain, POST as text/plain to skip preflight) ----

  function fetchRoster() {
    if (isDemo) return Promise.resolve(demoStudents.slice());
    return fetch(API_URL)
      .then(function (res) { return res.json(); })
      .then(function (json) { return json.students || []; })
      .catch(function () { return []; });
  }

  function submitStudent(name, gender) {
    if (isDemo) {
      demoStudents.push({ name: name, gender: gender, ts: new Date().toISOString() });
      return Promise.resolve({ ok: true });
    }
    return fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ action: "add", name: name, gender: gender })
    }).then(function (res) { return res.json(); })
      .catch(function () { return { ok: false, error: "Network error" }; });
  }

  function clearAll(pin) {
    if (isDemo) { demoStudents = []; return Promise.resolve({ ok: true }); }
    return fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ action: "clear", pin: pin })
    }).then(function (res) { return res.json(); })
      .catch(function () { return { ok: false, error: "Network error" }; });
  }

  // ---- Grouping algorithm ----
  // Shuffling each gender list independently, then interleaving one boy then one
  // girl and advancing the group pointer on every single assignment (never
  // resetting it per gender), is what spreads a gender surplus evenly across
  // groups instead of piling every leftover student into the first group(s).

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function formGroups(students, targetGroupSize) {
    var boys = shuffle(students.filter(function (s) { return s.gender === "Boy"; }));
    var girls = shuffle(students.filter(function (s) { return s.gender === "Girl"; }));
    var others = shuffle(students.filter(function (s) { return s.gender !== "Boy" && s.gender !== "Girl"; }));
    var total = boys.length + girls.length + others.length;
    var numGroups = Math.max(1, Math.round(total / targetGroupSize));
    var groups = [];
    for (var g = 0; g < numGroups; g++) groups.push([]);

    var gi = 0;
    var maxLen = Math.max(boys.length, girls.length);
    for (var i = 0; i < maxLen; i++) {
      if (boys[i])  { groups[gi % numGroups].push(boys[i]);  gi++; }
      if (girls[i]) { groups[gi % numGroups].push(girls[i]); gi++; }
    }
    for (var k = 0; k < others.length; k++) { groups[gi % numGroups].push(others[k]); gi++; }
    return groups;
  }

  // ---- Small shared helpers ----

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function genderShape(gender) {
    if (gender === "Boy") {
      return '<svg class="shape" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="4" y="4" width="16" height="16" rx="3"/></svg>';
    }
    if (gender === "Girl") {
      return '<svg class="shape" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="8"/></svg>';
    }
    return "";
  }

  // Animated count-up used for the teacher dashboard's stat tiles.
  function animateCount(el, toValue) {
    if (!el) return;
    var from = parseInt(el.getAttribute("data-count") || "0", 10);
    if (from === toValue) { el.textContent = toValue; return; }
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      el.textContent = toValue;
      el.setAttribute("data-count", toValue);
      return;
    }
    var settled = false;
    function finish() {
      if (settled) return;
      settled = true;
      el.textContent = toValue;
      el.setAttribute("data-count", toValue);
    }
    var start = null;
    var duration = 400;
    function step(ts) {
      if (settled) return;
      if (!start) start = ts;
      var progress = Math.min(1, (ts - start) / duration);
      var value = Math.round(from + (toValue - from) * progress);
      el.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        finish();
      }
    }
    requestAnimationFrame(step);
    // Fallback for a throttled/backgrounded tab where requestAnimationFrame may
    // never fire — guarantees the tile never sits stuck on a stale number.
    setTimeout(finish, duration + 250);
  }

  return {
    isDemo: isDemo,
    fetchRoster: fetchRoster,
    submitStudent: submitStudent,
    clearAll: clearAll,
    formGroups: formGroups,
    escapeHtml: escapeHtml,
    genderShape: genderShape,
    animateCount: animateCount
  };
})();
