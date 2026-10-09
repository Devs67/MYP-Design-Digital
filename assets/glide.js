(function(){

  // The gliding selection pill (design/BUILD-BRIEF.md, step 9).
  // Every selector group gets one pill element behind its items. The pill
  // sits on the selected item and slides to the next one when the selection
  // changes. The page's own script still decides what is selected: this only
  // reads it. Styles are in glass.css section 17.
  //
  // A group is anything marked data-glide, plus the shared groups below, so
  // groups built by a page script are picked up too.
  var GROUPS = '[data-glide],.topbar__grades,.myp-theme-toggle,.tabs .wrap,.myp-chips,.myp-seg,' +
               '.bm-chips,.levels,.lx-tabs,.lx-seg';

  if(!document.querySelectorAll || !window.requestAnimationFrame) return;

  var queued = false;

  function isPill(el){
    return !!(el.classList && el.classList.contains('myp-glide__pill'));
  }

  function isSelected(el){
    if(!el.getAttribute || !el.classList) return false;
    if(el.classList.contains('on') || el.classList.contains('active')) return true;
    if(el.getAttribute('aria-pressed') === 'true') return true;
    var cur = el.getAttribute('aria-current');
    return !!cur && cur !== 'false';
  }

  function selectedItem(group){
    var kids = group.children;
    for(var i=0;i<kids.length;i++){
      if(!isPill(kids[i]) && isSelected(kids[i])) return kids[i];
    }
    return null;
  }

  function pillOf(group){
    var kids = group.children;
    for(var i=0;i<kids.length;i++){ if(isPill(kids[i])) return kids[i]; }
    var pill = document.createElement('span');
    pill.className = 'myp-glide__pill';
    pill.setAttribute('aria-hidden', 'true');
    group.insertBefore(pill, group.firstChild);
    return pill;
  }

  // Classes are only written when they change. The observers below watch
  // class changes, so an unconditional write would re-fire them forever.
  function setClass(el, name, on){
    if(el.classList.contains(name) !== on){
      if(on) el.classList.add(name); else el.classList.remove(name);
    }
  }

  function place(group){
    var item = selectedItem(group);
    if(!item || !item.offsetWidth){
      setClass(group, 'myp-glide--on', false);
      return;
    }
    var pill = pillOf(group);
    var s = pill.style;
    s.width = item.offsetWidth + 'px';
    s.height = item.offsetHeight + 'px';
    s.transform = 'translate(' + item.offsetLeft + 'px,' + item.offsetTop + 'px)';
    try{ s.borderRadius = window.getComputedStyle(item).borderTopLeftRadius; }catch(e){}
    setClass(group, 'myp-glide--on', true);
    // the first placement is not animated; later ones are
    if(!group.__glideReady){
      group.__glideReady = true;
      window.requestAnimationFrame(function(){
        window.requestAnimationFrame(function(){ setClass(group, 'myp-glide--ready', true); });
      });
    }
  }

  function watch(group){
    if(group.__glide) return;
    group.__glide = true;
    setClass(group, 'myp-glide', true);
    if(!('MutationObserver' in window)) return;
    try{
      new MutationObserver(schedule).observe(group, {
        attributes:true, attributeFilter:['class', 'aria-pressed', 'aria-current'],
        childList:true, subtree:true
      });
    }catch(e){}
  }

  function run(){
    queued = false;
    var groups;
    try{ groups = document.querySelectorAll(GROUPS); }catch(e){ return; }
    for(var i=0;i<groups.length;i++){
      watch(groups[i]);
      place(groups[i]);
    }
  }

  // one pass per frame, however many changes arrive
  function schedule(){
    if(queued) return;
    queued = true;
    window.requestAnimationFrame(run);
  }

  run();
  document.addEventListener('DOMContentLoaded', schedule);
  window.addEventListener('load', schedule);
  window.addEventListener('resize', schedule);
  try{ if(document.fonts && document.fonts.ready) document.fonts.ready.then(schedule); }catch(e){}

  // groups added later (chips built by a page script, the lesson app)
  if('MutationObserver' in window && document.body){
    try{ new MutationObserver(schedule).observe(document.body, {childList:true, subtree:true}); }catch(e){}
  }

  window.MYPGlide = { refresh: schedule };

})();
