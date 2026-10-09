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

  function syncThemeButtons(){
    var mode = currentTheme();
    var btns = document.querySelectorAll('[data-theme-set]');
    for(var i=0;i<btns.length;i++){
      btns[i].setAttribute('aria-pressed', btns[i].getAttribute('data-theme-set') === mode ? 'true' : 'false');
    }
  }

  function setTheme(mode){
    function run(){
      applyTheme(mode);
      setURLTheme(mode);
      rewriteLinks(mode);
      syncThemeButtons();
    }
    function done(){ root.classList.remove('myp-theming'); root.classList.remove('myp-theme-fade'); }

    // crossfade between the themes (glass.css section 16) unless motion is off
    var calm = true;
    try{ calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}
    if(calm || mode === currentTheme()){ run(); return; }

    if(document.startViewTransition){
      try{
        root.classList.add('myp-theming');
        var vt = document.startViewTransition(run);
        vt.finished.then(done, done);
        return;
      }catch(e){ done(); }
    }
    // no view transitions here: ease the colours instead
    root.classList.add('myp-theme-fade');
    run();
    window.setTimeout(done, 400);
  }

  function toggleTheme(){
    setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
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

  // ---- site search dialog (Search in the tools bar) ----
  // The index is only fetched the first time someone opens Search.
  var srEl = null, srOpener = null, srLoading = false;

  // path from this page back to the site root, read from how theme.js was linked
  function rootPrefix(){
    var s = document.querySelectorAll('script[src]');
    for(var i=0;i<s.length;i++){
      var src = s[i].getAttribute('src') || '';
      var at = src.indexOf('assets/theme.js');
      if(at !== -1) return src.slice(0, at);
    }
    return '';
  }

  function loadIndex(cb){
    if(typeof MYP_SEARCH_INDEX !== 'undefined'){ cb(); return; }
    if(srLoading) return;
    srLoading = true;
    var sc = document.createElement('script');
    sc.src = rootPrefix() + 'assets/search-index.js';
    sc.onload = function(){ srLoading = false; cb(); };
    sc.onerror = function(){ srLoading = false; showNone('Search is not available right now.'); };
    document.body.appendChild(sc);
  }

  function showNone(msg){
    if(!srEl) return;
    var none = srEl.querySelector('.myp-search__none');
    if(!none) return;
    none.textContent = msg || '';
    none.hidden = !msg;
  }

  function renderSearch(){
    if(!srEl) return;
    var input = srEl.querySelector('.myp-field');
    var list = srEl.querySelector('.myp-search__list');
    if(!input || !list) return;
    list.innerHTML = '';
    var q = input.value.replace(/^\s+|\s+$/g, '').toLowerCase();
    if(q.length < 2){ showNone(''); return; }
    if(typeof MYP_SEARCH_INDEX === 'undefined'){ loadIndex(renderSearch); return; }

    var base = rootPrefix();
    var mode = currentTheme();
    var n = 0;
    for(var i=0; i<MYP_SEARCH_INDEX.length && n < 8; i++){
      var r = MYP_SEARCH_INDEX[i];
      if(r.t.toLowerCase().indexOf(q) === -1 && r.d.toLowerCase().indexOf(q) === -1) continue;
      n++;
      var hi = r.href.indexOf('#');
      var href = hi === -1 ? r.href + '?theme=' + mode
                           : r.href.slice(0, hi) + '?theme=' + mode + r.href.slice(hi);

      var li = document.createElement('li');
      var a = document.createElement('a');
      a.className = 'myp-search__row';
      a.href = base + href;
      var b = document.createElement('span');
      b.className = 'myp-search__badge';
      // strand pages do not define the criterion colours, so fall back to the fixed navy (white text stays readable in both themes)
      b.style.background = 'var(--' + (r.tone === 'ink' ? 'ink-fixed' : r.tone) + ', var(--ink-fixed))';
      b.textContent = r.badge;
      var t = document.createElement('span');
      t.className = 'myp-search__t';
      t.textContent = r.t;
      var d = document.createElement('span');
      d.className = 'myp-search__d';
      d.textContent = r.d;
      t.appendChild(d);
      var g = document.createElement('span');
      g.className = 'myp-search__g';
      g.textContent = r.grade;
      a.appendChild(b); a.appendChild(t); a.appendChild(g);
      li.appendChild(a);
      list.appendChild(li);
    }
    showNone(n ? '' : 'No matches. Try a different word.');
  }

  function buildSearch(){
    srEl = document.createElement('div');
    srEl.className = 'myp-dialog-backdrop';
    srEl.hidden = true;
    srEl.innerHTML =
      '<div class="myp-dialog" role="dialog" aria-modal="true" aria-labelledby="mypSearchTitle">' +
        '<div class="myp-dialog__head">' +
          '<h2 class="myp-dialog__title" id="mypSearchTitle">Search</h2>' +
          '<button type="button" class="myp-button myp-button--text myp-search__close">' +
            '<span class="myp-icon myp-icon--x" aria-hidden="true"></span>Close</button>' +
        '</div>' +
        '<label class="myp-muted" for="mypSearchInput">Search all year groups, strands, tools and resources</label>' +
        '<input class="myp-field" id="mypSearchInput" type="search" autocomplete="off" style="margin-top:8px">' +
        '<ul class="myp-search__list"></ul>' +
        '<p class="myp-search__none" hidden></p>' +
      '</div>';
    document.body.appendChild(srEl);

    var input = srEl.querySelector('.myp-field');
    var close = srEl.querySelector('.myp-search__close');
    if(input) input.addEventListener('input', renderSearch);
    if(close) close.addEventListener('click', closeSearch);
    srEl.addEventListener('click', function(e){ if(e.target === srEl) closeSearch(); });
    srEl.addEventListener('keydown', function(e){
      if(e.key === 'Escape' || e.keyCode === 27){ closeSearch(); return; }
      if(e.key !== 'Tab' && e.keyCode !== 9) return;
      // keep focus inside the dialog
      var f = srEl.querySelectorAll('button, input, a[href]');
      if(!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    });
  }

  function openSearch(opener){
    // the landing page has its own search box: use it rather than a second one
    var hero = document.getElementById('heroSearch');
    if(hero){
      try{ hero.scrollIntoView({behavior:'smooth', block:'center'}); }catch(e){}
      hero.focus();
      return;
    }
    if(!srEl) buildSearch();
    srOpener = opener || null;
    srEl.hidden = false;
    document.body.classList.add('myp-noscroll');
    var input = srEl.querySelector('.myp-field');
    if(input){ input.focus(); renderSearch(); }
    loadIndex(function(){});
  }

  function closeSearch(){
    if(!srEl || srEl.hidden) return;
    srEl.hidden = true;
    document.body.classList.remove('myp-noscroll');
    if(srOpener && srOpener.focus) srOpener.focus();
  }

  // ---- strand tabs: the direction of travel ----
  // The page's own script still swaps the panels, and glide.js moves the
  // pill. This only tells the CSS (glass.css section 16) which way the
  // content moves.
  function initTabs(){
    var wrap = document.querySelector('.tabs .wrap');
    if(!wrap) return;

    function indexOfTab(el){
      var tabs = wrap.querySelectorAll('.tab');
      for(var i=0;i<tabs.length;i++){ if(tabs[i] === el) return i; }
      return -1;
    }

    // capture phase, so this runs before the page's handler moves .on
    wrap.addEventListener('click', function(e){
      var t = e.target;
      while(t && t !== wrap && !(t.classList && t.classList.contains('tab'))) t = t.parentNode;
      if(!t || t === wrap) return;
      var from = indexOfTab(wrap.querySelector('.tab.on'));
      var to = indexOfTab(t);
      if(to === -1 || to === from) return;
      root.style.setProperty('--myp-dir', to < from ? '-1' : '1');
      root.classList.add('myp-tabbed');
    }, true);
  }

  // ---- the moving backdrop (glass.css section 16) ----
  // Home carries it in its markup; every other page gets it here, so
  // without this script a page keeps the still backdrop.
  function initFlow(){
    if(!document.body || document.querySelector('.myp-flow')) return;
    var flow = document.createElement('div');
    flow.className = 'myp-flow';
    flow.setAttribute('aria-hidden', 'true');
    flow.innerHTML = '<div class="myp-flow__blur"><i></i><i></i><i></i><i></i></div>';
    document.body.insertBefore(flow, document.body.firstChild);
  }

  // the moving backdrop rests while the tab is in the background
  document.addEventListener('visibilitychange', function(){
    if(document.hidden) root.classList.add('myp-paused');
    else root.classList.remove('myp-paused');
  });

  document.addEventListener('DOMContentLoaded', function(){
    rewriteLinks(currentTheme());
    initTabs();
    initFlow();

    var themeBtn = document.getElementById('themeBtn');
    if(themeBtn) themeBtn.addEventListener('click', toggleTheme);

    var setBtns = document.querySelectorAll('[data-theme-set]');
    for(var t = 0; t < setBtns.length; t++){
      (function(btn){
        btn.addEventListener('click', function(){ setTheme(btn.getAttribute('data-theme-set')); });
      })(setBtns[t]);
    }
    syncThemeButtons();

    var searchBtns = document.querySelectorAll('[data-search-open]');
    for(var sb = 0; sb < searchBtns.length; sb++){
      (function(btn){
        btn.addEventListener('click', function(){ openSearch(btn); });
      })(searchBtns[sb]);
    }

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

  window.MYPTheme = { toggle: toggleTheme, apply: applyTheme, set: setTheme, openQuote: openQuote, openSearch: openSearch };

})();
