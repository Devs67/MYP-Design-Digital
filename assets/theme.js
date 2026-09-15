(function(){

  var root = document.documentElement;

  function currentTheme(){
    return root.classList.contains('dark') ? 'dark' : 'light';
  }

  function applyTheme(mode){
    if(mode === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }

  function setURLTheme(mode){
    try{
      var url = new URL(window.location.href);
      url.searchParams.set('theme', mode);
      window.history.replaceState(null, '', url.pathname + '?' + url.searchParams.toString() + url.hash);
    }catch(e){}
  }

  function rewriteLinks(mode){
    // Plain string surgery on the href as-authored (never resolve to an
    // absolute URL and write that back) — this site is deployed under a
    // subpath on GitHub Pages, so "../index.html" must stay relative,
    // not become "/index.html" (which would 404 there).
    var links = document.querySelectorAll('a[href]');
    for(var i=0;i<links.length;i++){
      var a = links[i];
      var href = a.getAttribute('href');
      if(!href || href.charAt(0) === '#') continue;
      if(href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) continue;
      if(/^([a-z][a-z0-9+.-]*:)?\/\//i.test(href)) continue;

      var hash = '';
      var hashIdx = href.indexOf('#');
      var main = href;
      if(hashIdx !== -1){ hash = href.slice(hashIdx); main = href.slice(0, hashIdx); }

      var qIdx = main.indexOf('?');
      var pathPart = qIdx === -1 ? main : main.slice(0, qIdx);
      var rawQuery = qIdx === -1 ? '' : main.slice(qIdx + 1);

      var params = rawQuery.length ? rawQuery.split('&') : [];
      params = params.filter(function(p){ return p && p.indexOf('theme=') !== 0; });
      params.push('theme=' + mode);

      a.setAttribute('href', pathPart + '?' + params.join('&') + hash);
    }
  }

  function toggleTheme(){
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    setURLTheme(next);
    rewriteLinks(next);
  }

  var QUOTES = [
    ["Design is how it works.", "Steve Jobs"],
    ["Simplicity is the ultimate sophistication.", "Leonardo da Vinci"],
    ["Good design is as little design as possible.", "Dieter Rams"],
    ["Less, but better.", "Dieter Rams"],
    ["Question everything generally thought to be obvious.", "Dieter Rams"],
    ["Form follows function.", "Louis Sullivan"],
    ["The details are not the details. They make the design.", "Charles Eames"],
    ["Recognizing the need is the primary condition for design.", "Charles Eames"],
    ["Design is a plan for arranging elements to accomplish a purpose.", "Charles Eames"],
    ["Design is intelligence made visible.", "Alina Wheeler"],
    ["Good design is obvious. Great design is transparent.", "Joe Sparano"],
    ["Styles come and go. Good design is a language.", "Massimo Vignelli"],
    ["There is no such thing as a boring project.", "Milton Glaser"],
    ["To design is to communicate clearly by whatever means you can control.", "Milton Glaser"],
    ["Design creates culture. Culture shapes values.", "Robert L. Peters"],
    ["Everything is designed. Few things are designed well.", "Brian Reed"],
    ["Perfection is achieved when there is nothing left to take away.", "Antoine de Saint-Exupéry"],
    ["Engineers create the world that has never been.", "Theodore von Kármán"],
    ["The best way to predict the future is to invent it.", "Alan Kay"],
    ["Make it work, make it right, make it fast.", "Kent Beck"],
    ["Innovation distinguishes between a leader and a follower.", "Steve Jobs"],
    ["Fail often so you can succeed sooner.", "Tom Kelley, IDEO"],
    ["Any sufficiently advanced technology is indistinguishable from magic.", "Arthur C. Clarke"],
    ["Design adds value faster than it adds costs.", "Joel Spolsky"]
  ];

  var qmEl = null;

  function buildQuoteModal(){
    qmEl = document.createElement('div');
    qmEl.className = 'qm';
    qmEl.setAttribute('role', 'dialog');
    qmEl.setAttribute('aria-modal', 'true');
    qmEl.hidden = true;
    qmEl.innerHTML =
      '<div class="qm__card">' +
        '<button type="button" class="qm__x" aria-label="Close">&times;</button>' +
        '<p class="qm__eyebrow">Design Philosophy</p>' +
        '<blockquote class="qm__quote"></blockquote>' +
        '<p class="qm__who"></p>' +
        '<button type="button" class="qm__btn">Another quote</button>' +
      '</div>';
    document.body.appendChild(qmEl);

    var closeBtn = qmEl.querySelector('.qm__x');
    var nextBtn = qmEl.querySelector('.qm__btn');
    if(closeBtn) closeBtn.addEventListener('click', closeQuote);
    if(nextBtn) nextBtn.addEventListener('click', showRandomQuote);
    qmEl.addEventListener('click', function(e){ if(e.target === qmEl) closeQuote(); });
    document.addEventListener('keydown', function(e){
      if(!qmEl || qmEl.hidden) return;
      if(e.key === 'Escape' || e.keyCode === 27) closeQuote();
    });
  }

  function showRandomQuote(){
    if(!qmEl) return;
    var pick = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    var q = qmEl.querySelector('.qm__quote');
    var w = qmEl.querySelector('.qm__who');
    if(q) q.textContent = '“' + pick[0] + '”';
    if(w) w.textContent = '— ' + pick[1];
  }

  function openQuote(){
    if(!qmEl) buildQuoteModal();
    showRandomQuote();
    qmEl.hidden = false;
  }

  function closeQuote(){
    if(qmEl) qmEl.hidden = true;
  }

  document.addEventListener('DOMContentLoaded', function(){
    rewriteLinks(currentTheme());

    var themeBtn = document.getElementById('themeBtn');
    if(themeBtn) themeBtn.addEventListener('click', toggleTheme);

    var quoteBtn = document.getElementById('quoteBtn');
    if(quoteBtn) quoteBtn.addEventListener('click', openQuote);

    var bar = document.querySelector('.topbar');
    if(bar){
      var g = bar.getAttribute('data-grade');
      if(g){
        var pills = bar.querySelectorAll('.topbar__grades a');
        for(var p = 0; p < pills.length; p++){
          if(pills[p].getAttribute('data-g') === g) pills[p].classList.add('on');
        }
      }
    }
  });

  window.MYPTheme = { toggle: toggleTheme, apply: applyTheme, openQuote: openQuote };

})();
