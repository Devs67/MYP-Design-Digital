// Adds <link rel="stylesheet" href=".../assets/glass.css"> as the last
// element in <head> on every page, so it loads after the page's own <style>.
// Safe to run again: pages that already link glass.css are left alone.
//
//   node design/link-glass.js          (run from the repo root)
//
// Skipped:
//   examples/                 real student portfolios, never edited
//   lesson-experience-app/    React source; restyled in step 3
//   lesson-experience/app/    Vite output; restyled and rebuilt in step 3
//   redirect stubs            pages that only forward to their new address

var fs = require('fs');
var path = require('path');

var ROOT = path.resolve(__dirname, '..');
var SKIP = ['examples', 'lesson-experience-app', path.join('lesson-experience', 'app'),
            'node_modules', 'design', '.git'];

function walk(dir, out){
  var names = fs.readdirSync(dir);
  for(var i = 0; i < names.length; i++){
    var full = path.join(dir, names[i]);
    var rel = path.relative(ROOT, full);
    if(SKIP.indexOf(rel) !== -1) continue;
    var st = fs.statSync(full);
    if(st.isDirectory()) walk(full, out);
    else if(/\.html$/i.test(names[i])) out.push(full);
  }
  return out;
}

var added = [], skipped = [];
walk(ROOT, []).sort().forEach(function(file){
  var rel = path.relative(ROOT, file);
  var html = fs.readFileSync(file, 'utf8');

  if(html.indexOf('assets/glass.css') !== -1){ skipped.push(rel + '  (already linked)'); return; }
  if(/window\.location\.replace\(/.test(html) && html.split('\n').length < 30){
    skipped.push(rel + '  (redirect stub)'); return;
  }
  var at = html.search(/<\/head>/i);
  if(at === -1){ skipped.push(rel + '  (no </head>)'); return; }

  var depth = rel.split(path.sep).length - 1;
  var href = new Array(depth + 1).join('../') + 'assets/glass.css';
  // match the line ending the file already uses
  var nl = html.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
  var link = '<link rel="stylesheet" href="' + href + '">' + nl;

  fs.writeFileSync(file, html.slice(0, at) + link + html.slice(at));
  added.push(rel);
});

console.log('Linked glass.css on ' + added.length + ' pages:');
added.forEach(function(r){ console.log('  + ' + r); });
if(skipped.length){
  console.log('Skipped ' + skipped.length + ':');
  skipped.forEach(function(r){ console.log('  - ' + r); });
}
