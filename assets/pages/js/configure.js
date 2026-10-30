/* configure.html?s=<service id>: the order slip (Figma restyle, v1.2).
   Length is a typed input (20 to 10,000 words, inputmode numeric); quantity, grade, turnaround and images are menus:
   a list under the blank on desktop, a bottom sheet over a dimmed page at 760 and below.
   Defaults: no s (or an unknown one) opens Figma's demo slip; s=article-content opens the same Figma values
   (1,500 words, Premium, $198.00); other services open Standard at their own word block.
   Returning from the brief restores the draft for the same service. The choice goes to brief.html through GCC.draft. */
(function () {
  'use strict';
  var G = window.GCC, $ = function (q, r) { return (r || document).querySelector(q); }, $$ = function (q, r) { return Array.prototype.slice.call((r || document).querySelectorAll(q)); };
  var esc = G.ui.esc, RM = G.reducedMotion;
  var FIGMA = { s: 'article-content', words: 1500, qty: 1, grade: 'premium', turnaround: 'standard', images: 1 };
  var sid = G.ui.params().get('s'), draft = G.draft.get();
  var s = G.service(sid), cfg;
  if (s) cfg = draft && draft.s === s.id ? draft : (s.id === FIGMA.s ? FIGMA : { s: s.id, words: s.words || s.per || 500, qty: 1, grade: 'standard', turnaround: 'standard', images: 1 });
  else if (draft && G.service(draft.s)) { cfg = draft; s = G.service(draft.s); }
  else { s = G.service(FIGMA.s); cfg = FIGMA; }
  cfg = { s: s.id, words: cfg.words || s.words || 500, qty: cfg.qty || 1, grade: cfg.grade || 'standard', turnaround: cfg.turnaround || 'standard', images: Math.min(10, Math.max(1, cfg.images || 1)) };
  var cat = G.categoryOf(s.id);
  /* words only: every service is ordered as pieces of n words; Article content keeps Figma's "article" */
  var NOUN = s.id === 'article-content' ? ['article', 'articles'] : ['piece', 'pieces'];
  var fmt = function (n) { return Number(n).toLocaleString('en-GB'); };
  var lower = /^CVs/.test(s.name) ? s.name : s.name.charAt(0).toLowerCase() + s.name.slice(1);

  /* hero and slip head */
  document.title = 'Configure ' + lower + ' | Gulf Content Co.';
  $('#cfgTitle').innerHTML = 'Configure <i>' + esc(lower) + '</i>';
  $('#cfgCat').textContent = cat.name; $('#cfgCat').setAttribute('href', cat.page);
  $('#cfgCrumbS').textContent = s.name;
  $('#cfgSlip').textContent = 'ORDER SLIP  ·  ' + s.name.toUpperCase();

  var CHEV = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6.4 10.4 16 20l9.6-9.6"/></svg>';
  var TICK = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8.5 6.5 13 14 3.5" fill="none" stroke="#d7263d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var MENUS = {
    qty: { title: 'Quantity', label: 'Quantity' },
    grade: { title: 'Writer grade', label: 'Writer grade' },
    turn: { title: 'Turnaround', label: 'Turnaround' },
    img: { title: 'Images', label: 'Images' }
  };
  var w = function (t) { return '<span>' + esc(t) + '</span>'; };
  var blank = function (k) { return '<button type="button" class="cfg-blank" data-k="' + k + '" aria-haspopup="listbox" aria-expanded="false" aria-label="' + MENUS[k].label + '"><span class="cfg-v"></span>' + CHEV + '</button>'; };
  /* phrases that never split across lines: "of 1,500 words", "by a", "back in", "with 1 image." (no one word last line) */
  var grp = function (h) { return '<span class="cfg-grp">' + h + '</span>'; };
  $('#cfgSent').innerHTML = w('I') + w('need') + blank('qty') + '<span id="cfgNoun"></span>' + grp(w('of') +
    '<label class="cfg-blank cfg-in"><span class="cfg-iw" id="cfgIw"><input id="cfgLen" type="text" size="1" inputmode="numeric" pattern="[0-9,]*" autocomplete="off" enterkeyhint="done" aria-label="Length in words" aria-describedby="cfgHelp"></span></label>' +
    w('words')) + grp(w('by') + '<span id="cfgArt">a</span>') + blank('grade') + w('writer,') + grp(w('back') + w('in')) + blank('turn') + grp(w('with') + blank('img') + '<span id="cfgImgW">images.</span>');
  var len = $('#cfgLen'), iw = $('#cfgIw'), help = $('#cfgHelp');

  /* menu options for each blank: [value, label, meta] */
  function options(k) {
    if (k === 'qty') return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (n) { return [n, fmt(n) + ' ' + NOUN[n === 1 ? 0 : 1], '']; });
    if (k === 'grade') return G.grades.map(function (g) { return [g.id, g.name, g.rate]; });
    if (k === 'turn') return G.turnarounds.map(function (t) { return [t.id, t.days, t.uplift ? 'Express, adds 25%' : 'Standard, included']; });
    /* images are per piece: the first is included, each extra adds $3.87 a piece (price follows the currency) */
    if (k === 'img') return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (n) { return [n, fmt(n) + (n === 1 ? ' image' : ' images'), n === 1 ? 'Included' : 'adds ' + G.money(G.imagePrice) + ' a piece']; });
  }
  function current(k) { return k === 'qty' ? cfg.qty : k === 'grade' ? cfg.grade : k === 'turn' ? cfg.turnaround : cfg.images; }
  function choose(k, v) {
    if (k === 'qty') cfg.qty = +v; else if (k === 'grade') cfg.grade = v; else if (k === 'turn') cfg.turnaround = v; else cfg.images = +v;
    render(k);
  }

  function render(changed) {
    var p = G.price(cfg), g = p.grade, t = p.turnaround;
    $('#cfgNoun').textContent = NOUN[p.qty === 1 ? 0 : 1];
    $('#cfgArt').textContent = /^[AEIOU]/.test(g.name) ? 'an' : 'a';
    setV('qty', fmt(p.qty)); setV('grade', g.name); setV('turn', t.days); setV('img', fmt(p.images));
    $('#cfgImgW').textContent = p.images === 1 ? 'image.' : 'images.';
    if (document.activeElement !== len) { len.value = fmt(p.words); iw.setAttribute('data-v', len.value); }
    $('#cfgTotal').textContent = G.money(p.total);
    /* the breakdown, one sentence per line on desktop as in Figma */
    /* words only: GCC.price sentence names multiples by the catalogue noun ("3 releases of"); say pieces here */
    var why = p.sentence.replace(' ' + s.noun[1] + ' of ', ' ' + NOUN[1] + ' of ');
    $('#cfgWhy').innerHTML = why.split(/(?<=\.)\s/).map(function (x) { return '<span>' + esc(x) + '</span>'; }).join(' ');
    if (changed && !RM) { var b = $('.cfg-blank[data-k="' + changed + '"]'); if (b) { b.classList.remove('flash'); void b.offsetWidth; b.classList.add('flash'); } }
  }
  function setV(k, v) { var b = $('.cfg-blank[data-k="' + k + '"] .cfg-v'); if (b) b.textContent = v; }

  /* the typed length: raw digits while typing, formatted on blur, clamped to 20 to 10,000 */
  function digits() { return parseInt(String(len.value).replace(/[^0-9]/g, ''), 10); }
  len.addEventListener('focus', function () { help.hidden = false; len.placeholder = fmt(G.price(cfg).words); len.value = ''; iw.setAttribute('data-v', len.placeholder); });
  len.addEventListener('input', function () {
    var clean = String(len.value).replace(/[^0-9]/g, '').slice(0, 5);
    if (clean !== len.value) len.value = clean;
    iw.setAttribute('data-v', len.value || len.placeholder || ' ');
    var n = digits(); if (!isNaN(n) && n >= 20) { cfg.words = Math.min(10000, n); render(); }
  });
  function commit() { var n = digits(); cfg.words = isNaN(n) ? cfg.words : Math.min(10000, Math.max(20, n)); help.hidden = true; render(); }
  len.addEventListener('blur', commit);
  len.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); len.blur(); }
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); var n = (digits() || cfg.words) + (e.key === 'ArrowUp' ? 1 : -1) * (e.shiftKey ? 500 : 50); n = Math.min(10000, Math.max(20, n)); len.value = String(n); iw.setAttribute('data-v', len.value); cfg.words = n; render(); }
  });

  /* menus */
  var menu = $('#cfgMenu'), opts = $('#cfgOpts'), dim = $('#cfgDim'), openK = null, sheet = matchMedia('(max-width:760px)');
  function openMenu(k) {
    closeMenu();
    var b = $('.cfg-blank[data-k="' + k + '"]'), cur = String(current(k));
    $('#cfgMt').textContent = MENUS[k].title;
    opts.innerHTML = options(k).map(function (o) {
      var on = String(o[0]) === cur;
      return '<button type="button" class="cfg-opt" role="option" data-v="' + esc(o[0]) + '" aria-selected="' + on + '" tabindex="-1"><i>' + TICK + '</i><b>' + esc(o[1]) + '</b><small>' + esc(o[2]) + '</small></button>';
    }).join('');
    menu.hidden = false; menu.classList.remove('open'); void menu.offsetWidth; menu.classList.add('open');
    b.setAttribute('aria-expanded', 'true'); openK = k;
    if (sheet.matches) { dim.hidden = false; menu.setAttribute('aria-modal', 'true'); document.body.classList.add('menu-open'); menu.style.left = menu.style.top = ''; }
    else {
      menu.setAttribute('aria-modal', 'false');
      var r = b.getBoundingClientRect(), x = r.left + scrollX, mw = 360;
      if (r.left + mw > innerWidth - 16) x = Math.max(16, innerWidth - 16 - mw) + scrollX;
      menu.style.left = x + 'px'; menu.style.top = (r.bottom + scrollY + 12) + 'px';
    }
    var sel = $('.cfg-opt[aria-selected=true]', menu) || $('.cfg-opt', menu);
    setTimeout(function () { sel.focus({ preventScroll: true }); }, 30);
  }
  function closeMenu(back) {
    if (!openK) return;
    var b = $('.cfg-blank[data-k="' + openK + '"]');
    menu.hidden = true; dim.hidden = true; document.body.classList.remove('menu-open');
    b.setAttribute('aria-expanded', 'false'); openK = null;
    if (back) b.focus({ preventScroll: true });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.cfg-blank[data-k]');
    if (b) { var k = b.getAttribute('data-k'); if (openK === k) closeMenu(); else openMenu(k); return; }
    var o = e.target.closest('.cfg-opt');
    if (o && openK) { var kk = openK; choose(kk, o.getAttribute('data-v')); closeMenu(true); return; }
    if (openK && !e.target.closest('#cfgMenu')) closeMenu();
  });
  menu.addEventListener('keydown', function (e) {
    var list = $$('.cfg-opt', menu), i = list.indexOf(document.activeElement);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); list[(i + (e.key === 'ArrowDown' ? 1 : list.length - 1)) % list.length].focus(); }
    if (e.key === 'Home') { e.preventDefault(); list[0].focus(); }
    if (e.key === 'End') { e.preventDefault(); list[list.length - 1].focus(); }
    if (e.key === 'Tab') { e.preventDefault(); closeMenu(true); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && openK) { e.preventDefault(); closeMenu(true); } });
  addEventListener('resize', function () { if (openK) closeMenu(); });

  /* next: hand the choice to the brief */
  $('#cfgForm').addEventListener('submit', function (e) {
    e.preventDefault(); closeMenu(); if (document.activeElement === len) commit();
    G.draft.set(cfg);
    G.ui.go('brief.html');
  });
  G.on('currency', function () { render(); });
  render();
  window.gcc = Object.assign(window.gcc || {}, { slip: function () { return Object.assign({}, cfg, { total: G.price(cfg).total }); } });
})();
