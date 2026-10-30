/* brief.html: the detailed brief by default, ?form=quick for the quick one, toggled in place.
   Source of the piece: ?line=<basket line id> edits that line's brief; otherwise the configure draft;
   with neither, the Figma demo (article content, 1,500 words, Premium) with its demo brief filled in.
   Add to basket writes { ...piece, brief } with GCC.cart.add (or GCC.cart.update when editing) and goes to basket.html. */
(function () {
  'use strict';
  var G = window.GCC, $ = function (q, r) { return (r || document).querySelector(q); }, $$ = function (q, r) { return Array.prototype.slice.call((r || document).querySelectorAll(q)); };
  var esc = G.ui.esc, params = G.ui.params();
  var form = $('#brfForm');
  var lineId = params.get('line'), line = lineId ? G.cart.get(lineId) : null;
  var draft = G.draft.get(), demo = false, cfg, brief = {};
  if (line) { cfg = line; brief = line.brief || {}; }
  else if (draft && G.service(draft.s)) cfg = draft;
  else {
    demo = true;
    cfg = { s: 'article-content', words: 1500, qty: 1, grade: 'premium', turnaround: 'standard', images: 1 };
    brief = { title: 'Why the Gulf reads in two languages', subject: 'Bilingual brands in the Gulf', brand: 'Harbour Logistics', link: 'harbourlogistics.example', voice: '2nd person', style: 'Conversational', audience: 'Businesses' };
  }
  var mode = params.get('form') === 'quick' ? 'quick' : (params.get('form') ? 'detailed' : (brief.mode || 'detailed'));
  var p = G.price(cfg), s = p.service;

  $('#brfCrumbS').textContent = s.name;
  $('#brfSvc').textContent = s.name;
  if (line) { $('#brfAdd').textContent = 'Save the brief'; $('#brfBack').textContent = 'Back to basket'; $('#brfBack').setAttribute('href', 'basket.html'); }
  else $('#brfBack').setAttribute('href', 'configure.html?s=' + encodeURIComponent(s.id));

  /* fill the fields from the line being edited or the demo brief */
  ['title', 'subject', 'brand', 'link', 'notes'].forEach(function (k) { if (brief[k]) form.elements[k].value = brief[k]; });
  ['voice', 'style', 'audience'].forEach(function (k) {
    if (!brief[k] && !demo && !line) return;
    $$('[data-group="' + k + '"] .pill').forEach(function (b) { b.setAttribute('aria-pressed', String(b.textContent === brief[k])); });
  });
  var files = (brief.files || []).slice();
  function paintFiles() { $('#brfFiles').innerHTML = files.map(function (f) { return '<span>' + esc(f) + '</span>'; }).join(''); }
  paintFiles();
  form.elements.files.addEventListener('change', function (e) { files = Array.prototype.slice.call(e.target.files).map(function (f) { return f.name; }); setTimeout(paintFiles, 0); });

  /* pills: one choice per group, a second tap clears it */
  form.addEventListener('click', function (e) {
    var b = e.target.closest('.brf-pills .pill'); if (!b) return;
    var on = b.getAttribute('aria-pressed') !== 'true';
    $$('.pill', b.parentElement).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
    b.setAttribute('aria-pressed', String(on));
  });

  /* detailed or quick, on one page */
  function setMode(m) {
    mode = m;
    $$('[data-mode]').forEach(function (b) { b.setAttribute('aria-checked', String(b.getAttribute('data-mode') === m)); });
    $('#brfVoice').hidden = m === 'quick';
    $('#brfN3').textContent = m === 'quick' ? '02' : '03';
    var q = new URLSearchParams(location.search); if (m === 'quick') q.set('form', 'quick'); else q.delete('form');
    try { history.replaceState(history.state, '', location.pathname + (q.toString() ? '?' + q : '') + location.hash); } catch (e) {}
  }
  $$('[data-mode]').forEach(function (b) { b.addEventListener('click', function () { setMode(b.getAttribute('data-mode')); }); });
  $('.brf-type').addEventListener('keydown', function (e) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].indexOf(e.key) < 0) return;
    e.preventDefault(); setMode(mode === 'quick' ? 'detailed' : 'quick'); $('[data-mode="' + mode + '"]').focus();
  });
  setMode(mode);

  /* the summary: the Figma lines, live */
  function lines() {
    p = G.price(cfg);
    var L = [], m = function (v) { return G.money(v); };
    if (s.priced === 'words') L.push([(p.qty > 1 ? p.qty + ' × ' : '') + p.lengthText + ' at ' + G.money(s.from, { whole: true }) + ' per ' + (s.per || 500).toLocaleString('en-GB'), m(p.base)]);
    else L.push([(p.qty > 1 ? p.qty + ' × ' : '') + p.lengthText + ' at ' + G.money(s.from, { whole: true }) + ' each', m(p.base)]);
    L.push(p.gradeAdd ? [p.grade.name + ' writer, ' + p.grade.rate, m(p.gradeAdd)] : [p.grade.name + ' writer, ' + p.grade.rate, 'Included']);
    L.push(p.expressAdd ? ['Express turnaround, ' + p.turnaround.days, m(p.expressAdd)] : ['Standard turnaround, ' + p.turnaround.days, 'Included']);
    L.push(['Quantity', String(p.qty)]);
    /* the first image on each piece is included; extras are $3.87 a piece, times quantity */
    L.push(p.images > 1 ? ['Images, 1 included plus ' + (p.images - 1) + ' extra at ' + G.money(G.imagePrice), m(p.imagesTotal)] : ['Images, 1 included', 'Included']);
    $('#brfLines').innerHTML = L.map(function (l) { return '<p class="ord-line"><span>' + esc(l[0]) + '</span><span>' + esc(l[1]) + '</span></p>'; }).join('');
    $('#brfLines').style.cssText = 'display:flex;flex-direction:column;gap:16px';
    $('#brfTotal').textContent = G.cart.totals([{ price: p }]).show.lines[0];
  }
  function title() { var t = form.elements.title.value.trim(); $('#brfQ').textContent = '“' + (t || 'Your project title') + '”'; }
  form.elements.title.addEventListener('input', title);
  lines(); title();
  G.on('currency', lines);

  /* consent and captcha sit inside the summary on desktop, under the form on mobile (Figma) */
  var mq = matchMedia('(max-width:1180px)');
  function placeCc() { (mq.matches ? $('#brfCcM') : $('#brfCcD')).appendChild($('#brfCc')); }
  placeCc(); if (mq.addEventListener) mq.addEventListener('change', placeCc);

  /* the added to basket note: "<service>, <n> words, <grade>, <price>." in the current currency */
  var addedId = null;
  function paintAdded() {
    var l = addedId && G.cart.get(addedId); if (!l) return;
    $('#addedB').textContent = l.service.name + ', ' + l.price.lengthText + ', ' + l.price.grade.name + ', ' + l.price.images + (l.price.images === 1 ? ' image' : ' images') + ', ' + G.cart.totals([l]).show.lines[0] + '.';
  }
  G.on('currency', paintAdded);
  $('#addedMore').setAttribute('href', 'services.html');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!G.ui.validate(form)) return;
    var b = { mode: mode, title: form.elements.title.value.trim(), subject: form.elements.subject.value.trim(),
      brand: form.elements.brand.value.trim(), link: form.elements.link.value.trim(), notes: form.elements.notes.value.trim(), files: files };
    if (mode === 'detailed') ['voice', 'style', 'audience'].forEach(function (k) { var on = $('[data-group="' + k + '"] .pill[aria-pressed=true]'); b[k] = on ? on.textContent : ''; });
    if (line) { G.cart.update(line.id, { brief: b }); G.ui.go('basket.html'); return; }
    /* a new line: add it (the nav count updates first), then the sticky note; a second submit only reopens the note */
    if (!addedId) { addedId = G.cart.add({ s: cfg.s, words: cfg.words, qty: cfg.qty, grade: cfg.grade, turnaround: cfg.turnaround, images: cfg.images, brief: b }); G.draft.clear(); }
    paintAdded(); G.ui.popup('added');
  });
})();
