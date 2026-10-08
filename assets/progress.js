/* ============================================================
   Progress codes: save checklist ticks against a student code.

   Shared by the strand pages. Link it after the page's own script:
     <script src="../assets/progress.js" data-page="criterion-a"></script>
   data-page is the page key the Worker stores ticks under. It must
   match what the page has always used, or saved progress detaches.

   What it does
   - puts a "Save your progress." card above every .clbar
   - Get my code / I have a code open dialogs (Figma frames 84, 85);
     a new code is shown in the Progress connected dialog (86)
   - saves each tick, restores ticks from ?code= in the URL

   Item IDs are a hash of each checklist <span>'s text, keyed by the
   strand panel (data-panel). Never change hash() or labelOf(): every
   student's saved ticks and every teacher note hang off those IDs.
   ============================================================ */
(function(){

  var API = 'https://myp-progress.bachhudevenderchintu.workers.dev';

  var me = document.currentScript;
  if(!me){
    var all = document.querySelectorAll('script[src*="progress.js"]');
    me = all.length ? all[all.length - 1] : null;
  }
  var PAGE = me ? me.getAttribute('data-page') : null;
  if(!PAGE) return;

  var state = { code:null, name:null, section:null };
  var cards = [];
  var dlg = null, dlgOpener = null, dlgView = null;

  function hash(str){
    var h = 5381;
    for(var i=0;i<str.length;i++) h = ((h*33) ^ str.charCodeAt(i)) >>> 0;
    return 'i' + h.toString(36);
  }
  function labelOf(input){
    var sp = input.parentNode.querySelector('span');
    return sp ? sp.textContent.replace(/\s+/g,' ').trim() : '';
  }
  function panelOf(el){
    var p = el.closest ? el.closest('[data-panel]') : null;
    return p ? p.getAttribute('data-panel') : 'x';
  }
  function isCheck(el){
    return !!(el && el.type === 'checkbox' && el.parentNode && el.parentNode.classList &&
      el.parentNode.classList.contains('ck'));
  }

  function api(path, opts){
    return fetch(API + path, opts).then(function(r){
      return r.json().then(function(d){
        if(!r.ok) throw new Error(d && d.error ? d.error : 'Request failed');
        return d;
      });
    });
  }

  function icon(name){
    return '<span class="myp-icon myp-icon--' + name + '" aria-hidden="true"></span>';
  }

  // ---------- the card above each checklist ----------

  function setStatus(txt, kind){
    for(var i=0;i<cards.length;i++){
      var s = cards[i].querySelector('.myp-status-line');
      if(!s) continue;
      s.textContent = txt || '';
      s.className = 'myp-status-line' + (kind ? ' ' + kind : '');
    }
  }

  function render(){
    var live = !!state.code;
    for(var i=0;i<cards.length;i++){
      var c = cards[i];
      var idle = c.querySelector('.myp-sync__idle');
      var on = c.querySelector('.myp-sync__on');
      if(idle) idle.hidden = live;
      if(on) on.hidden = !live;
      if(live) c.classList.add('myp-sync--on'); else c.classList.remove('myp-sync--on');
      if(live){
        var who = c.querySelector('.myp-sync__who');
        var code = c.querySelector('.myp-sync__code');
        if(who) who.textContent = state.name + ' · ' + state.section;
        if(code) code.textContent = state.code;
      }
    }
  }

  function buildCard(){
    var box = document.createElement('div');
    box.className = 'myp-sync';
    box.innerHTML =
      '<div class="myp-sync__state myp-sync__idle">' +
        '<div class="myp-sync__txt">' +
          '<h3 class="myp-sync__title">Save your progress.</h3>' +
          '<p>Get a code so you can pick up where you left off, on any device.</p>' +
        '</div>' +
        '<div class="myp-sync__acts">' +
          '<button type="button" class="myp-button myp-button--primary" data-sync="new">' + icon('save') + 'Get my code</button>' +
          '<button type="button" class="myp-button myp-button--secondary" data-sync="has">I have a code</button>' +
        '</div>' +
      '</div>' +
      '<div class="myp-sync__on" hidden>' +
        '<div class="myp-sync__state">' +
          '<div class="myp-sync__txt">' +
            '<h3 class="myp-sync__title">Progress connected</h3>' +
            '<p class="myp-sync__who"></p>' +
          '</div>' +
          '<span class="myp-sync__code"></span>' +
          '<button type="button" class="myp-button myp-button--secondary" data-sync="copy">' + icon('copy') + 'Copy code</button>' +
        '</div>' +
        '<p class="myp-sync__note">Ticks save automatically. Bookmark this page and your code travels with it — or write the code down to use on another device.</p>' +
      '</div>' +
      '<p class="myp-status-line" role="status" aria-live="polite"></p>';

    box.addEventListener('click', function(e){
      var b = e.target && e.target.closest ? e.target.closest('[data-sync]') : null;
      if(!b) return;
      var act = b.getAttribute('data-sync');
      if(act === 'new') openDialog('get', b);
      else if(act === 'has') openDialog('enter', b);
      else if(act === 'copy') copyCode();
    });
    return box;
  }

  function copyCode(){
    var t = state.code || '';
    try{
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(t).then(function(){ setStatus('Code copied', 'ok'); dlgStatus('Code copied', 'ok'); },
          function(){ setStatus('Copy did not work. Write the code down.', 'err'); });
        return;
      }
    }catch(e){}
    setStatus('Copy did not work. Write the code down.', 'err');
  }

  // ---------- dialogs ----------

  function buildDialog(){
    dlg = document.createElement('div');
    dlg.className = 'myp-dialog-backdrop myp-dialog-backdrop--center';
    dlg.hidden = true;
    dlg.innerHTML =
      '<div class="myp-dialog myp-dialog--form" role="dialog" aria-modal="true" aria-labelledby="mypSyncTitle">' +

        // 84 · Get my code
        '<form class="myp-dialog__view" data-view="get" novalidate>' +
          '<div class="myp-dialog__stack">' +
            '<h2 class="myp-dialog__title" id="mypSyncTitle-get">Get my code</h2>' +
            '<p class="myp-dialog__desc">Your name and section</p>' +
            '<label class="myp-input"><span class="myp-input__label">Name</span>' +
              '<input data-f="name" type="text" placeholder="Name" maxlength="40" autocomplete="off"></label>' +
            '<label class="myp-input"><span class="myp-input__label">Section</span>' +
              '<input data-f="sec" type="text" placeholder="Section, e.g. 4A" maxlength="20" autocomplete="off"></label>' +
            '<p class="myp-status-line" role="status" aria-live="polite"></p>' +
            '<button type="submit" class="myp-button myp-button--primary">' + icon('save') + 'Create</button>' +
            '<button type="button" class="myp-button myp-button--secondary" data-close>Cancel</button>' +
          '</div>' +
        '</form>' +

        // 85 · Enter your code
        '<form class="myp-dialog__view" data-view="enter" novalidate hidden>' +
          '<div class="myp-dialog__stack">' +
            '<h2 class="myp-dialog__title" id="mypSyncTitle-enter">Enter your code</h2>' +
            '<label class="myp-input"><span class="myp-input__label">Progress code</span>' +
              '<input data-f="code" type="text" placeholder="ABC-4A-K3M9" maxlength="20" autocomplete="off" autocapitalize="characters" spellcheck="false"></label>' +
            '<p class="myp-status-line" role="status" aria-live="polite"></p>' +
            '<button type="submit" class="myp-button myp-button--primary">' + icon('arrow-right') + 'See my progress</button>' +
            '<button type="button" class="myp-button myp-button--secondary" data-close>Cancel</button>' +
          '</div>' +
        '</form>' +

        // 86 · Progress connected
        '<div class="myp-dialog__view" data-view="connected" hidden>' +
          '<div class="myp-dialog__stack">' +
            '<h2 class="myp-dialog__title" id="mypSyncTitle-connected">Progress connected</h2>' +
            '<p class="myp-dialog__who" data-f="who"></p>' +
            '<p class="myp-dialog__code" data-f="codeout"></p>' +
            '<button type="button" class="myp-button myp-button--secondary" data-copy>' + icon('copy') + 'Copy code</button>' +
            '<p class="myp-status-line" role="status" aria-live="polite"></p>' +
            '<p class="myp-dialog__note">Write it down. You will need it to see your progress on another device.</p>' +
            '<p class="myp-dialog__note">Ticks save automatically. Bookmark this page and your code travels with it — or write the code down to use on another device.</p>' +
            '<button type="button" class="myp-button myp-button--primary" data-close>' + icon('arrow-left') + 'Back to checklist</button>' +
          '</div>' +
        '</div>' +

      '</div>';
    document.body.appendChild(dlg);

    var forms = dlg.querySelectorAll('form');
    for(var i=0;i<forms.length;i++){
      forms[i].addEventListener('submit', function(e){
        e.preventDefault();
        if(dlgView === 'get') submitNew();
        else if(dlgView === 'enter') submitCode();
      });
    }
    dlg.addEventListener('click', function(e){
      var t = e.target;
      if(t === dlg){ closeDialog(); return; }
      if(!t || !t.closest) return;
      if(t.closest('[data-close]')) closeDialog();
      else if(t.closest('[data-copy]')) copyCode();
    });
    dlg.addEventListener('keydown', function(e){
      if(e.key === 'Escape' || e.keyCode === 27){ closeDialog(); return; }
      if(e.key !== 'Tab' && e.keyCode !== 9) return;
      var view = dlg.querySelector('[data-view="' + dlgView + '"]');
      if(!view) return;
      var f = view.querySelectorAll('button:not([disabled]), input');
      if(!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    });
  }

  function viewEl(name){
    return dlg ? dlg.querySelector('[data-view="' + name + '"]') : null;
  }

  function dlgStatus(txt, kind){
    var v = viewEl(dlgView);
    if(!v) return;
    var s = v.querySelector('.myp-status-line');
    if(!s) return;
    s.textContent = txt || '';
    s.className = 'myp-status-line' + (kind ? ' ' + kind : '');
  }

  function setBusy(on){
    var v = viewEl(dlgView);
    if(!v) return;
    var b = v.querySelector('[type="submit"]');
    if(b) b.disabled = !!on;
  }

  function openDialog(name, opener){
    if(!dlg) buildDialog();
    if(opener) dlgOpener = opener;
    var views = dlg.querySelectorAll('[data-view]');
    for(var i=0;i<views.length;i++) views[i].hidden = (views[i].getAttribute('data-view') !== name);
    dlgView = name;
    var box = dlg.querySelector('.myp-dialog');
    if(box) box.setAttribute('aria-labelledby', 'mypSyncTitle-' + name);
    dlgStatus('');
    setBusy(false);
    if(name === 'connected'){
      var who = dlg.querySelector('[data-f="who"]');
      var out = dlg.querySelector('[data-f="codeout"]');
      if(who) who.textContent = state.name + ' · ' + state.section;
      if(out) out.textContent = state.code;
    }
    dlg.hidden = false;
    document.body.classList.add('myp-noscroll');
    var v = viewEl(name);
    var focus = v ? (v.querySelector('input') || v.querySelector('[data-copy]') || v.querySelector('button')) : null;
    if(focus) focus.focus();
  }

  function closeDialog(){
    if(!dlg || dlg.hidden) return;
    dlg.hidden = true;
    document.body.classList.remove('myp-noscroll');
    dlgView = null;
    var back = dlgOpener;
    // the button that opened the dialog may be hidden now (idle -> connected)
    if(back && back.offsetParent === null){
      var c = back.closest ? back.closest('.myp-sync') : null;
      back = c ? c.querySelector('[data-sync="copy"]') : null;
    }
    if(back && back.focus) back.focus();
  }

  function submitNew(){
    var n = dlg.querySelector('[data-f="name"]');
    var s = dlg.querySelector('[data-f="sec"]');
    var name = n ? n.value.replace(/^\s+|\s+$/g, '') : '';
    var sec = s ? s.value.replace(/^\s+|\s+$/g, '') : '';
    if(!name || !sec){
      dlgStatus('Please fill in both name and section.', 'err');
      if(!name && n) n.focus(); else if(s) s.focus();
      return;
    }
    dlgStatus('Creating…');
    setBusy(true);
    api('/api/register', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ display_name:name, section:sec })
    }).then(function(d){
      connect(d.code, d.display_name, d.section);
      openDialog('connected');
    }).catch(function(e){
      setBusy(false);
      dlgStatus(e.message || 'Failed', 'err');
    });
  }

  function submitCode(){
    var f = dlg.querySelector('[data-f="code"]');
    var c = f ? f.value.replace(/^\s+|\s+$/g, '').toUpperCase() : '';
    if(!c){ if(f) f.focus(); return; }
    dlgStatus('Loading…');
    setBusy(true);
    loadCode(c, false);
  }

  // ---------- saving and loading ----------

  function applyTicks(ticks){
    var map = {};
    for(var i=0;i<ticks.length;i++){
      map[ticks[i].panel + '|' + ticks[i].item_id] = ticks[i].checked;
    }
    var boxes = document.querySelectorAll('.ck input');
    for(var j=0;j<boxes.length;j++){
      var b = boxes[j];
      var key = panelOf(b) + '|' + hash(labelOf(b));
      if(map[key] !== undefined) b.checked = !!map[key];
    }
    // refresh every strand's meter; restoring is not a change worth saving
    restoring = true;
    for(var k=0;k<boxes.length;k++){
      try { boxes[k].dispatchEvent(new Event('change', {bubbles:true})); } catch(e){}
    }
    restoring = false;
  }
  var restoring = false;

  function saveOne(input){
    if(!state.code) return;
    var label = labelOf(input);
    setStatus('Saving…');
    api('/api/save', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        code: state.code, page: PAGE, panel: panelOf(input),
        items: [{ id: hash(label), label: label, checked: input.checked }]
      })
    }).then(function(){ setStatus('Saved', 'ok'); })
      .catch(function(){ setStatus('Not saved. Check your connection and tick again.', 'err'); });
  }

  function connect(code, name, section){
    state.code = code; state.name = name; state.section = section;
    render();
    try {
      var u = new URL(window.location.href);
      u.searchParams.set('code', code);
      window.history.replaceState({}, '', u.toString());
    } catch(e){}
    setStatus('Connected', 'ok');
  }

  function loadCode(code, silent){
    setStatus('Loading…');
    return api('/api/load?code=' + encodeURIComponent(code)).then(function(d){
      connect(d.student.code, d.student.display_name, d.student.section);
      applyTicks(d.ticks || []);
      setStatus('Progress restored', 'ok');
      if(!silent) closeDialog();
    }).catch(function(e){
      var msg = e.message || 'Code not found';
      setStatus(msg, 'err');
      if(!silent){
        setBusy(false);
        dlgStatus(e.message || 'That code was not recognised.', 'err');
      }
    });
  }

  // ---------- start ----------

  function init(){
    var bars = document.querySelectorAll('.clbar');
    for(var i=0;i<bars.length;i++){
      var c = buildCard();
      bars[i].parentNode.insertBefore(c, bars[i]);
      cards.push(c);
    }
    if(!cards.length) return;
    render();

    document.addEventListener('change', function(e){
      if(!restoring && isCheck(e.target)) saveOne(e.target);
    });

    // ?code=XXX in the address bar restores automatically
    try {
      var qc = new URL(window.location.href).searchParams.get('code');
      if(qc) loadCode(qc.toUpperCase(), true);
    } catch(e){}
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.MYPProgress = { hash: hash, open: openDialog };

})();
