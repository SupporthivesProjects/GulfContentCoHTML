/* Gulf Content Co. shared script v1.0. Load order on every page, at the end of <body>:
     <script src="assets/catalogue.js"></script>
     <script src="assets/site.js"></script>
     <script src="assets/pages/<page>.js"></script>   (optional)

   window.GCC, the API for page scripts (all money in USD unless it says otherwise)

   catalogue
     GCC.service(id)                 one service record from assets/catalogue.js, or null
     GCC.services(catId?)            all services, or one category's services, in catalogue order
     GCC.category(id), GCC.categories(), GCC.categoryOf(serviceId)
     GCC.grades, GCC.turnarounds     arrays from the catalogue; GCC.grade(id), GCC.turnaround(id)
     GCC.imagePrice                  3.87
     GCC.unitLabel(s)                "per 500 words" or "per 250 words"
     GCC.fromLabel(s)                "from $44 per 500 words" in the current currency
     GCC.catFrom(catId)              lowest from price in a category (USD number)

   money model
     GCC.price(cfg)                  cfg { s, words, units, qty, grade, turnaround, images }
                                     returns { service, words, units, qty, images, grade, turnaround,
                                       basePiece, piece, base, gradeAdd, expressAdd, imagesTotal, total,
                                       lengthText, sentence }   (see "money model" below)
     GCC.describe(cfgOrLine)         ["1,500 words", "Premium", "Standard, 5 to 7 days", "Quantity 1", "2 images"]
     GCC.money(usd, {whole})         "$198.00", "BHD 74.45", "AED 727.17"; whole gives the homepage "from" style
     GCC.currency(), GCC.setCurrency(code)    USD charged; BHD and AED display only (GCC.rates)
     GCC.refreshPrices(root)         rewrites every [data-usd] element (add data-whole for "from" style),
                                     [data-from="service-id"] ("from $44 per 500 words"), [data-cat-from="cat-id"] ("from $18"),
                                     [data-cat-count="cat-id"] ("6 services"); runs on load and on every currency change

   basket (localStorage, plus the URL hash between pages, hydrated then wiped with replaceState)
     GCC.cart.list()                 lines, each with .price (a GCC.price result) and .service
     GCC.cart.get(id), add(line) returns id, update(id, patch), remove(id), clear(), count()
     GCC.cart.totals(lines?)         { lines, subtotal, discount: { code, rate, label, amount }, total, count, show }
                                     show: display currency strings that add up { lines: [..], subtotal, discount ("" when none), total, values,
                                       discountText: "GULF10 minus $39.06" or "None" }
                                     (lines converted and rounded first, then summed; orders carry the same as order.totals.show)
     GCC.cart.demo()                 loads the four Figma lines (order GCC-2026-0148, $351.54)
     GCC.discount.get(), set(code) returns true or false, clear()     GULF10 (10%) applied by default
     GCC.draft.get(), set(cfg), clear()      configure hands its choice to the brief page

   account and orders (demo session per viewer)
     GCC.account.get(), signedIn(), signIn(details?), signOut(), save(details)
     GCC.account.require(next?)      signed out: goes to log-in.html?next=... and returns false
     GCC.orders.list(), find(ref), create(billing) builds an order from the basket, record(order), nextRef()
     GCC.pay.start(order)            same as window.startPayment(order): the one place a gateway plugs in

   ui
     GCC.ui.popup(id), GCC.ui.close(id)      .overlay#id markup lives in the page
     GCC.ui.validate(form)           fields carry data-rule="required|email|phone|password|match|checked|captcha"
     GCC.ui.toast(html), GCC.ui.tip(el, text), GCC.ui.enhance(root) builds button innards and swipe dots
     GCC.ui.params(), GCC.ui.fmtDate(iso) "15 October 2026", GCC.ui.esc(text)
     GCC.cut(n)                      counts struck words for the visit (the nav meter was removed in v1.3)
     GCC.on(name, fn)                listens to "currency", "cart" or "account" (document events gcc:<name>)

   console: gcc.version(), gcc.state(), gcc.rates

   money model
     word priced: from price per `per` words (default 500) x words / per (words 20 to 10,000), times quantity
     every service is word priced (v1.1); the unit branch in price() is kept only for older saved lines
     Premium adds 50% and Expert 120% of the base; Express adds 25% of the base; both are added, not compounded
     one image per piece is included; each extra image is $3.87 per piece, multiplied by quantity (v1.4, as every reference site prices it)
     every amount is rounded to cents; basket subtotal less GULF10 (10%) is the total; no tax line */
(function () {
  'use strict';
  var VERSION = '1.5', BUILT = '2026-10-20 00:15';
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (q, r) { return (r || document).querySelector(q); };
  var $$ = function (q, r) { return Array.prototype.slice.call((r || document).querySelectorAll(q)); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var fmtN = function (n) { return Number(n).toLocaleString('en-GB'); };
  var c2 = function (x) { return Math.round((x + Number.EPSILON) * 100) / 100; };
  var clampInt = function (v, lo, hi, d) { var n = parseInt(v, 10); if (isNaN(n)) n = d; return Math.min(hi, Math.max(lo, n)); };

  /* catalogue source: replace these lines with a fetch returning the same shape to use an API */
  var CAT = window.GCC_CATALOGUE || { services: [], categories: [], grades: [], turnarounds: [], imagePrice: 0 };
  var SERVICES = CAT.services, CATEGORIES = CAT.categories;
  var byId = {}; SERVICES.forEach(function (s) { byId[s.id] = s; });
  var catById = {}; CATEGORIES.forEach(function (c) { catById[c.id] = c; });

  /* storage: localStorage when it works, memory always; every call wrapped */
  var mem = {};
  var storage = {
    get: function (k, f) {
      if (Object.prototype.hasOwnProperty.call(mem, k)) return mem[k];
      try { var v = localStorage.getItem('gcc.' + k); if (v !== null) { mem[k] = JSON.parse(v); return mem[k]; } } catch (e) {}
      return f;
    },
    set: function (k, v) { mem[k] = v; try { localStorage.setItem('gcc.' + k, JSON.stringify(v)); } catch (e) {} },
    remove: function (k) { delete mem[k]; try { localStorage.removeItem('gcc.' + k); } catch (e) {} }
  };
  var CARRY = ['cart', 'cur', 'account', 'discount', 'draft', 'orders'];
  /* hydrate from the URL hash (#gcc=...) left by the previous page, then wipe it */
  (function () {
    var m = location.hash.match(/(?:^#|&)gcc=([^&]+)/);
    if (!m) return;
    try {
      var b64 = decodeURIComponent(m[1]).replace(/-/g, '+').replace(/_/g, '/');
      var data = JSON.parse(decodeURIComponent(escape(atob(b64))));
      CARRY.forEach(function (k) { if (k in data) { if (data[k] === null) storage.remove(k); else storage.set(k, data[k]); } });
    } catch (e) {}
    var rest = location.hash.replace(/(^#|&)gcc=[^&]+/, '').replace(/^#?&?/, '');
    try { history.replaceState(history.state, '', location.pathname + location.search + (rest ? '#' + rest : '')); } catch (e) {}
  })();
  function carryHash() {
    var data = {};
    CARRY.forEach(function (k) { var v = storage.get(k, undefined); if (v !== undefined) data[k] = v; });
    var b64 = btoa(unescape(encodeURIComponent(JSON.stringify(data)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return 'gcc=' + b64;
  }
  function emit(name, detail) { document.dispatchEvent(new CustomEvent('gcc:' + name, { detail: detail })); }
  function on(name, fn) { document.addEventListener('gcc:' + name, function (e) { fn(e.detail); }); }

  /* money and currency: USD charged; BHD and AED are display only, fixed demo rates (same as the v1.9 homepage) */
  var CUR = {
    USD: { rate: 1, symbol: '$', whole: 0 },
    BHD: { rate: 0.376, symbol: 'BHD ', whole: 1 },
    AED: { rate: 3.6725, symbol: 'AED ', whole: 0 }
  };
  var RATES = { USD: 1, BHD: 0.376, AED: 3.6725 };
  var cur = storage.get('cur', 'USD'); if (!CUR[cur]) cur = 'USD';
  function money(usd, opts) {
    var c = CUR[cur], v = Number(usd) * c.rate, neg = v < 0; v = Math.abs(v);
    var s;
    if (opts && opts.whole) s = v >= 1 ? (c.whole ? v.toFixed(c.whole) : Math.round(v).toLocaleString('en-GB')) : v.toFixed(2);
    else s = v.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return (neg ? '−' : '') + c.symbol + s;
  }
  function refreshPrices(root) {
    $$('[data-usd]', root).forEach(function (el) { el.textContent = money(parseFloat(el.getAttribute('data-usd')), { whole: el.hasAttribute('data-whole') }); });
    $$('[data-from]', root).forEach(function (el) { var s = byId[el.getAttribute('data-from')]; if (s) el.textContent = fromLabel(s); });
    $$('[data-cat-from]', root).forEach(function (el) { var id = el.getAttribute('data-cat-from'); if (catById[id]) el.textContent = 'from ' + money(catFrom(id), { whole: true }); });
    $$('[data-cat-count]', root).forEach(function (el) { var n = services(el.getAttribute('data-cat-count')).length; el.textContent = n + (n === 1 ? ' service' : ' services'); });
  }
  function setCurrency(code) {
    if (!CUR[code]) return;
    var changed = code !== cur; cur = code; storage.set('cur', code);
    refreshPrices(); if (changed) emit('currency', { currency: code });
  }

  /* catalogue lookups */
  function service(id) { return byId[id] || null; }
  function services(catId) { return catId ? SERVICES.filter(function (s) { return s.cat === catId; }) : SERVICES.slice(); }
  function category(id) { return catById[id] || null; }
  function categoryOf(id) { var s = byId[id]; return s ? catById[s.cat] : null; }
  function grade(id) { return CAT.grades.filter(function (g) { return g.id === id; })[0] || CAT.grades[0]; }
  function turnaround(id) { return CAT.turnarounds.filter(function (t) { return t.id === id; })[0] || CAT.turnarounds[0]; }
  function unitLabel(s) { return 'per ' + fmtN(s.per || 500) + ' words'; }
  function fromLabel(s) { return 'from ' + money(s.from, { whole: true }) + ' ' + unitLabel(s); }
  function catFrom(catId) { return Math.min.apply(null, services(catId).map(function (s) { return s.from; })); }
  var plural = function (n, u) { return n === 1 ? u[0] : u[1]; };

  /* the money model */
  function price(cfg) {
    cfg = cfg || {};
    var s = byId[cfg.s]; if (!s) return null;
    var g = grade(cfg.grade), t = turnaround(cfg.turnaround);
    var isWords = s.priced === 'words';
    var qty = clampInt(cfg.qty, 1, 999, 1);
    var words = isWords ? clampInt(cfg.words, 20, 10000, s.words || 500) : null;
    var units = isWords ? null : clampInt(cfg.units, 1, 999, 1);
    var images = clampInt(cfg.images, 1, 10, 1); /* images per piece; the first is included */
    var basePiece = c2(isWords ? s.from * words / (s.per || 500) : s.from * units);
    var gradePiece = c2(basePiece * g.uplift), expressPiece = c2(basePiece * t.uplift);
    var piece = c2(basePiece + gradePiece + expressPiece);
    var base = c2(basePiece * qty), gradeAdd = c2(gradePiece * qty), expressAdd = c2(expressPiece * qty);
    var imagesPiece = c2((images - 1) * CAT.imagePrice), imagesTotal = c2(imagesPiece * qty);
    var total = c2(base + gradeAdd + expressAdd + imagesTotal);
    var lengthText = isWords ? fmtN(words) + ' words' : fmtN(units) + ' ' + plural(units, s.unit);
    var p = { service: s, s: s.id, words: words, units: units, qty: qty, images: images, grade: g, turnaround: t,
      basePiece: basePiece, piece: piece, imagesPiece: imagesPiece, base: base, gradeAdd: gradeAdd, expressAdd: expressAdd, imagesTotal: imagesTotal, total: total, lengthText: lengthText };
    p.sentence = sentence(p);
    return p;
  }
  /* "$132.00 for 1,500 words, plus $66.00 for a Premium writer. Standard turnaround is included." */
  function sentence(p) {
    var s = p.service, what;
    if (p.qty === 1) what = p.lengthText;
    else if (s.priced === 'words') what = fmtN(p.qty) + ' ' + s.noun[1] + ' of ' + p.lengthText;
    else if (p.units === 1) what = fmtN(p.qty) + ' ' + s.unit[1];
    else what = fmtN(p.qty) + ' sets of ' + p.lengthText;
    var out = money(p.base) + ' for ' + what;
    if (p.gradeAdd) out += ', plus ' + money(p.gradeAdd) + ' for ' + (/^[AEIOU]/.test(p.grade.name) ? 'an ' : 'a ') + p.grade.name + ' writer';
    if (p.expressAdd) out += ', plus ' + money(p.expressAdd) + ' for Express turnaround';
    if (p.imagesTotal) { var ex = p.images - 1; out += ', plus ' + money(p.imagesTotal) + ' for ' + fmtN(ex) + ' extra ' + (ex === 1 ? 'image' : 'images') + (p.qty > 1 ? ' on each piece' : ''); }
    out += '.';
    if (!p.expressAdd && !p.imagesTotal) out += ' Standard turnaround and one image are included.';
    else if (!p.expressAdd) out += ' Standard turnaround and the first image are included.';
    else out += p.imagesTotal ? ' The first image is included.' : ' One image is included.';
    return out;
  }
  function describe(x) {
    var p = x && x.total !== undefined && x.service ? x : price(x);
    if (!p) return [];
    var out = [p.lengthText, p.grade.name, p.turnaround.label, 'Quantity ' + p.qty];
    out.push(p.images + (p.images === 1 ? ' image' : ' images') + (p.qty > 1 ? ' each' : ''));
    return out;
  }

  /* discount: GULF10 applied by default; real codes come from the back end */
  var DISCOUNTS = { GULF10: 0.10 };
  var discount = {
    get: function () {
      var code = storage.get('discount', 'GULF10');
      var rate = DISCOUNTS[code] || 0;
      return { code: rate ? code : '', rate: rate, label: rate ? code + ', ' + Math.round(rate * 100) + '% off' : '' };
    },
    set: function (code) { code = String(code || '').trim().toUpperCase(); if (!DISCOUNTS[code]) return false; storage.set('discount', code); emit('cart', {}); return true; },
    clear: function () { storage.set('discount', ''); emit('cart', {}); }
  };

  /* basket: records, never indexes */
  var LINE_KEYS = ['s', 'words', 'units', 'qty', 'grade', 'turnaround', 'images', 'brief'];
  function rawCart() { var c = storage.get('cart', []); return Array.isArray(c) ? c.filter(function (l) { return l && byId[l.s]; }) : []; }
  function hydrateLine(l) { var p = price(l); return Object.assign({}, l, { price: p, service: p.service }); }
  function pick(o) { var r = {}; LINE_KEYS.forEach(function (k) { if (o[k] !== undefined) r[k] = o[k]; }); return r; }
  var lastCount = rawCart().length;
  function saveCart(lines) {
    storage.set('cart', lines);
    var n = lines.length, up = n > lastCount; lastCount = n;
    emit('cart', { count: n, added: up });
  }
  function totals(lines, code) {
    lines = (lines || cartList()).map(function (l) { return l.price ? l : hydrateLine(l); });
    var subtotal = c2(lines.reduce(function (a, l) { return a + l.price.total; }, 0));
    var d = code === undefined ? discount.get() : (DISCOUNTS[code] ? { code: code, rate: DISCOUNTS[code], label: code + ', ' + Math.round(DISCOUNTS[code] * 100) + '% off' } : { code: '', rate: 0, label: '' });
    var amount = c2(subtotal * d.rate);
    var out = { lines: lines, subtotal: subtotal, discount: { code: d.code, rate: d.rate, label: d.label, amount: amount }, total: c2(subtotal - amount), count: lines.length };
    out.show = show(out);
    return out;
  }
  /* display figures that add up: each line converted and rounded first, then subtotal, discount and total
     worked in the display currency (USD figures are unchanged). Use t.show on every page that lists a total. */
  function show(t, code) {
    var c = CUR[code || cur], conv = function (u) { return c2(u * c.rate); };
    var lines = t.lines.map(function (l) { return conv(l.price ? l.price.total : l); });
    var subtotal = c2(lines.reduce(function (a, v) { return a + v; }, 0));
    var discount = c2(subtotal * (t.discount ? t.discount.rate : 0));
    var total = c2(subtotal - discount);
    var f = function (v) { return (v < 0 ? '\u2212' : '') + c.symbol + Math.abs(v).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
    return { currency: code || cur, values: { lines: lines, subtotal: subtotal, discount: discount, total: total },
      lines: lines.map(f), subtotal: f(subtotal), discount: discount ? f(-discount) : '', total: f(total),
      discountText: discount ? t.discount.code + ' minus ' + f(discount) : 'None' };
  }
  function cartList() { return rawCart().map(hydrateLine); }
  var DEMO_LINES = [
    { s: 'article-content', words: 1500, qty: 1, grade: 'premium', turnaround: 'standard', images: 0, brief: { mode: 'detailed', title: 'Why the Gulf reads in two languages', notes: 'Two readers: logistics managers and their finance teams. Keep it practical, no buzzwords.' } },
    { s: 'press-releases', words: 500, qty: 1, grade: 'standard', turnaround: 'express', images: 0, brief: { mode: 'detailed', title: 'New office in Manama', notes: 'Announce the new office, the opening date and who to call. One quote from the founder.' } },
    { s: 'blog-writing', words: 1200, qty: 1, grade: 'standard', turnaround: 'standard', images: 0, brief: { mode: 'detailed', title: 'Five things a tender reviewer reads first', notes: 'For bid managers at mid sized contractors. Plain, practical, and end on how to book a review.' } },
    { s: 'website-content', words: 250, qty: 1, grade: 'standard', turnaround: 'standard', images: 0, brief: { mode: 'detailed', title: 'About us page for Harbour Logistics', notes: 'For shippers comparing forwarders. Who we are, the routes we run and how to get a quote.' } }
  ];
  var cart = {
    list: cartList,
    get: function (id) { var l = rawCart().filter(function (x) { return x.id === id; })[0]; return l ? hydrateLine(l) : null; },
    add: function (line) { var lines = rawCart(); var l = pick(line); l.id = 'L' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); l.added = Date.now(); lines.push(l); saveCart(lines); return l.id; },
    update: function (id, patch) { var lines = rawCart().map(function (l) { return l.id === id ? Object.assign(l, pick(patch)) : l; }); saveCart(lines); },
    remove: function (id) { saveCart(rawCart().filter(function (l) { return l.id !== id; })); },
    clear: function () { saveCart([]); },
    count: function () { return rawCart().length; },
    totals: totals,
    demo: function () { var t = Date.now(); saveCart(DEMO_LINES.map(function (l, i) { return Object.assign(JSON.parse(JSON.stringify(l)), { id: 'D' + (i + 1), added: t + i }); })); }
  };
  var draft = {
    get: function () { return storage.get('draft', null); },
    set: function (cfg) { storage.set('draft', pick(cfg)); },
    clear: function () { storage.remove('draft'); }
  };

  /* account: demo session per viewer until real auth is wired up */
  var DEMO_ACCOUNT = { name: 'John Smith', first: 'John', last: 'Smith', email: 'john@example.com', phone: '+971 50 123 4567', dob: '14 / 03 / 1988',
    country: 'United Arab Emirates', city: 'Dubai', address: 'Office 1204, Al Saqr Business Tower', pobox: '50211' };
  var account = {
    get: function () { return storage.get('account', null); },
    signedIn: function () { return !!storage.get('account', null); },
    signIn: function (details) { storage.set('account', Object.assign({}, DEMO_ACCOUNT, storage.get('account', null) || {}, details || {})); emit('account', account.get()); },
    signOut: function () { storage.remove('account'); emit('account', null); },
    save: function (details) { storage.set('account', Object.assign({}, account.get() || DEMO_ACCOUNT, details || {})); emit('account', account.get()); },
    require: function (next) {
      if (account.signedIn()) return true;
      var here = next || (location.pathname.split('/').pop() || 'index.html') + location.search;
      go('log-in.html?next=' + encodeURIComponent(here));
      return false;
    },
    demo: DEMO_ACCOUNT
  };

  /* orders: the demo history, plus orders placed through checkout in this browser.
     Placed orders take refs from GCC-2026-0148 up, so the first one replaces the demo 0148. */
  var SEED_ORDERS = [
    { ref: 'GCC-2026-0148', invoice: 'GCC-INV-2026-0148', date: '2026-10-15', status: 'writing', discount: 'GULF10', lines: DEMO_LINES, demo: true },
    { ref: 'GCC-2026-0131', invoice: 'GCC-INV-2026-0131', date: '2026-10-02', status: 'delivered', discount: 'GULF10', demo: true, file: 'Clinic pages for Seef.docx',
      lines: [{ s: 'website-content', words: 500, qty: 1, grade: 'standard', turnaround: 'standard', images: 0, brief: { mode: 'detailed', title: 'Clinic pages for Seef' } }] },
    { ref: 'GCC-2026-0117', invoice: 'GCC-INV-2026-0117', date: '2026-09-18', status: 'delivered', discount: '', demo: true, file: 'October launch posts.docx',
      lines: [{ s: 'captions-and-posts', words: 300, qty: 1, grade: 'standard', turnaround: 'standard', images: 0, brief: { mode: 'quick', title: 'October launch posts' } }] },
    { ref: 'GCC-2026-0102', invoice: 'GCC-INV-2026-0102', date: '2026-09-03', status: 'delivered', discount: 'GULF10', demo: true, file: 'Summer range.docx',
      lines: [{ s: 'product-descriptions', words: 450, qty: 1, grade: 'standard', turnaround: 'standard', images: 0, brief: { mode: 'quick', title: 'Summer range' } }] }
  ];
  function hydrateOrder(o) {
    var lines = o.lines.map(hydrateLine);
    return Object.assign({}, o, { lines: lines, totals: totals(lines, o.discount || ''), billing: o.billing || DEMO_ACCOUNT });
  }
  var orders = {
    list: function () {
      var placed = storage.get('orders', []);
      var refs = placed.map(function (o) { return o.ref; });
      return placed.concat(SEED_ORDERS.filter(function (o) { return refs.indexOf(o.ref) < 0; }))
        .sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : (a.ref < b.ref ? 1 : -1); })
        .map(hydrateOrder);
    },
    find: function (ref) { return orders.list().filter(function (o) { return o.ref === ref; })[0] || null; },
    nextRef: function () { var n = 148 + storage.get('orders', []).length; return 'GCC-2026-' + ('000' + n).slice(-4); },
    create: function (billing) {
      var lines = rawCart(), ref = orders.nextRef(), t = totals(lines.map(hydrateLine));
      var d = new Date(), iso = ref === 'GCC-2026-0148' ? '2026-10-15' : d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);  /* the first placed order matches the demo invoice */
      return { ref: ref, invoice: ref.replace('GCC-', 'GCC-INV-'), date: iso, status: 'paid', currency: 'USD', discount: t.discount.code,
        lines: lines.map(function (l) { var r = pick(l); r.id = l.id; return r; }),
        totals: { subtotal: t.subtotal, discount: t.discount.amount, code: t.discount.code, total: t.total },
        displayCurrency: cur, displayTotal: t.show.total, billing: billing || account.get() || DEMO_ACCOUNT };
    },
    record: function (order) {
      var placed = storage.get('orders', []).filter(function (o) { return o.ref !== order.ref; });
      placed.unshift({ ref: order.ref, invoice: order.invoice, date: order.date, status: 'brief received', discount: order.discount, lines: order.lines, billing: order.billing });
      storage.set('orders', placed);
    }
  };

  /* payment: the one place a gateway plugs in (order shape in README.md).
     Replace the marked lines with: create the session on your server, redirect to the hosted page,
     return to payment-complete.html?ref=<ref> or payment-failed.html?ref=<ref>. No card details pass through this site. */
  function startPayment(order) {
    storage.set('pending', order);
    /* gateway: replace from here */
    orders.record(order);
    cart.clear();
    go('payment-complete.html?ref=' + encodeURIComponent(order.ref));
    /* to here */
  }

  /* navigation carrying state in the hash */
  function go(href) {
    var u = href.indexOf('#') < 0 && /\.html/.test(href) ? href + '#' + carryHash() : href;
    if (!RM && document.documentElement.classList.contains('pf')) { document.documentElement.classList.add('leaving'); setTimeout(function () { location.href = u; }, 250); }
    else location.href = u;
  }

  /* partials: header, mobile menu and footer, with every link real */
  var RING = '<svg class="nring" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M8 22 C10 6 88 2 94 18 C99 34 20 40 6 26 C0 18 30 6 60 8"/></svg>';
  var LOGO_SVG = '<svg viewBox="0 0 65 46" preserveAspectRatio="none" aria-hidden="true"><path d="M44 6C30 1 8 6 4 19c-4 14 16 23 33 22 16-1 26-9 24-20-2-9-15-14-28-14" fill="none" stroke="#d7263d" stroke-width="1.6" stroke-linecap="round"/></svg>';
  var CHEV = '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3.5 5.5 7 9l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var I_MENU = '<svg class="i-m" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var I_X = '<svg class="i-x" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
  var I_ACC = '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="6.8" r="3.3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3.6 17.2c.5-3.4 3.1-5.5 6.4-5.5s5.9 2.1 6.4 5.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
  var PAY = '<svg class="pm" viewBox="0 0 48 32" role="img" aria-label="Visa"><rect x=".5" y=".5" width="47" height="31" rx="4" fill="#fff" stroke="rgba(27,32,51,.14)"/><text x="24" y="20.5" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="13" font-weight="700" font-style="italic" fill="#1A1F71" letter-spacing=".5">VISA</text></svg><svg class="pm" viewBox="0 0 48 32" role="img" aria-label="Mastercard"><rect x=".5" y=".5" width="47" height="31" rx="4" fill="#fff" stroke="rgba(27,32,51,.14)"/><circle cx="19.5" cy="16" r="8" fill="#EB001B"/><circle cx="28.5" cy="16" r="8" fill="#F79E1B"/><path d="M24 9.4a8 8 0 0 1 0 13.2 8 8 0 0 1 0-13.2z" fill="#FF5F00"/></svg>';
  var SAY = '<svg class="saysvg" viewBox="0 -830 2934 1130" aria-label="Say less." role="img"><path pathLength="1" style="--i:0" transform="translate(0 0) scale(1 -1)" d="M266 -65Q248 -60 237.0 -56.5Q226 -53 226 -53Q228 -48 224.5 -44.0Q221 -40 210 -39Q195 -29 179.0 -11.0Q163 7 151.0 26.0Q139 45 135 54Q128 69 136.0 72.5Q144 76 155 81Q166 89 178.5 93.0Q191 97 199 80Q212 57 239.5 41.0Q267 25 302.5 22.0Q338 19 374 34Q398 45 400.0 64.5Q402 84 385 110Q382 118 376.5 123.0Q371 128 360.5 136.0Q350 144 331 162Q316 169 303.5 175.0Q291 181 277 188Q261 196 241.0 210.5Q221 225 204.0 242.5Q187 260 178 276Q162 291 158.0 317.5Q154 344 159.5 374.0Q165 404 178 428Q184 442 200.0 464.5Q216 487 236.0 511.0Q256 535 274.5 554.5Q293 574 304 581Q312 589 321.0 597.5Q330 606 330 606Q331 611 333.5 611.0Q336 611 336 611Q341 614 358.0 621.0Q375 628 395 647Q462 679 509.0 690.5Q556 702 583 702Q608 701 632.0 688.5Q656 676 673.5 657.0Q691 638 694 614Q701 590 687.5 556.5Q674 523 650.5 493.5Q627 464 602 450Q574 438 554.5 447.0Q535 456 536 475Q536 483 541.5 494.0Q547 505 572 533Q604 580 606.0 600.0Q608 620 588 623Q582 625 565.0 622.0Q548 619 528.5 614.5Q509 610 494.5 605.0Q480 600 480 598Q480 598 480.0 595.0Q480 592 476 593Q474 593 462.5 586.5Q451 580 435.0 570.0Q419 560 403.5 549.5Q388 539 377.0 531.0Q366 523 365 521Q363 510 342 501Q322 489 307.0 467.0Q292 445 272 411Q255 388 248.0 361.5Q241 335 248 319Q253 303 275.5 287.5Q298 272 337 249Q371 230 401.0 209.0Q431 188 452.0 168.5Q473 149 479 136Q491 119 493.5 97.0Q496 75 493.5 54.5Q491 34 487 21Q480 5 465.5 -13.0Q451 -31 439 -30Q428 -33 422.5 -37.0Q417 -41 410 -44Q403 -48 377.0 -53.5Q351 -59 320.0 -62.5Q289 -66 266 -65Z"/><path pathLength="1" style="--i:1" transform="translate(495 0) scale(1 -1)" d="M124 21Q120 29 106.5 37.0Q93 45 93 49Q93 53 88.5 61.5Q84 70 80 74Q75 80 83.0 103.5Q91 127 107.0 161.0Q123 195 142 230Q150 238 158.0 251.0Q166 264 170 268Q170 272 173.0 275.5Q176 279 180 279L188 295Q190 299 200.5 311.0Q211 323 226.0 337.5Q241 352 256.5 365.0Q272 378 282 384Q303 398 325.5 397.0Q348 396 364 383Q367 380 377.5 371.0Q388 362 401.5 351.0Q415 340 425 331L462 298L445 248Q432 208 438.5 178.0Q445 148 457 126Q462 115 470.5 109.0Q479 103 493 101Q501 100 508.0 95.0Q515 90 515 79Q515 55 506.5 44.5Q498 34 488 32Q455 28 425.0 39.0Q395 50 371 96Q367 102 360.5 118.5Q354 135 353 140Q349 135 342.5 127.5Q336 120 330 114Q259 42 208.5 20.5Q158 -1 124 21ZM179 104Q186 103 201.0 111.5Q216 120 241 140Q275 169 297.0 188.0Q319 207 340 237L362 273Q352 296 344.0 303.0Q336 310 328 310Q315 310 297.0 293.5Q279 277 256.5 245.5Q234 214 206 167Q193 145 186.0 124.5Q179 104 179 104Z"/><path pathLength="1" style="--i:2" transform="translate(941 0) scale(1 -1)" d="M86 -208Q50 -215 17.0 -210.5Q-16 -206 -38.5 -193.0Q-61 -180 -66 -164Q-72 -141 -60.0 -130.0Q-48 -119 -31.5 -117.0Q-15 -115 -10 -121Q-2 -126 15.5 -136.0Q33 -146 59 -141Q82 -136 100.0 -119.0Q118 -102 132 -83Q140 -71 159.0 -40.0Q178 -9 198.5 28.5Q219 66 233 98Q236 106 240.0 117.0Q244 128 250 135Q256 147 260.5 157.5Q265 168 266 172Q267 177 275.0 192.0Q283 207 290 222Q295 237 305.0 266.0Q315 295 325 313Q337 336 344.5 350.5Q352 365 361 368Q370 375 378.0 375.0Q386 375 397 369Q409 357 416.5 345.5Q424 334 422.5 317.5Q421 301 406 273Q398 249 388.5 229.5Q379 210 374 204Q369 192 362.5 177.5Q356 163 351 151Q333 111 320.0 86.0Q307 61 297.0 40.0Q287 19 276 -9Q253 -46 231.5 -79.5Q210 -113 186 -142Q176 -151 157.5 -165.5Q139 -180 119.5 -192.5Q100 -205 86 -208ZM211 18Q196 20 178.5 38.0Q161 56 149.5 76.0Q138 96 140 104Q140 109 140.0 112.0Q140 115 140 115Q134 115 130.5 132.5Q127 150 125.5 177.0Q124 204 124.5 233.0Q125 262 127 286Q131 303 131.0 323.5Q131 344 132 356Q131 372 138.5 382.0Q146 392 150 395Q187 411 204.0 378.0Q221 345 216 273Q214 233 214.0 196.5Q214 160 221.0 134.0Q228 108 245 97Q252 93 250.0 80.0Q248 67 241.0 52.5Q234 38 225.5 27.5Q217 17 211 18Z"/><path pathLength="1" style="--i:3" transform="translate(1524 0) scale(1 -1)" d="M142 -11Q123 -16 108.0 -0.5Q93 15 87.0 45.0Q81 75 89 112Q94 124 97.0 135.5Q100 147 100 154Q102 164 108.0 183.5Q114 203 121.0 224.0Q128 245 134.5 261.5Q141 278 143 282Q147 282 150.0 289.0Q153 296 153 303Q153 311 156.5 321.0Q160 331 164 335Q164 340 166.5 346.5Q169 353 169 357Q169 361 171.5 365.0Q174 369 174 373Q181 386 192.5 414.5Q204 443 217.5 478.0Q231 513 243.0 547.0Q255 581 262.5 604.5Q270 628 270 633Q270 641 276.0 648.0Q282 655 290 655Q293 658 304.0 659.5Q315 661 319 661Q319 661 323.0 657.0Q327 653 335 645Q343 638 350.5 629.0Q358 620 358 608Q358 595 354.5 583.0Q351 571 342.0 550.5Q333 530 314 490Q306 470 297.0 452.5Q288 435 288 431Q288 427 284.5 419.0Q281 411 277 399Q273 391 266.0 375.5Q259 360 251.5 342.5Q244 325 239.0 312.5Q234 300 234 298Q234 294 233.5 290.0Q233 286 229 282Q225 282 224.5 276.5Q224 271 224 271Q224 261 208 218Q192 163 178.5 117.0Q165 71 165 43Q165 19 157.5 6.0Q150 -7 142 -11Z"/><path pathLength="1" style="--i:4" transform="translate(1702 0) scale(1 -1)" d="M293 20Q263 3 229.5 0.5Q196 -2 167.0 9.5Q138 21 120 44Q110 57 101.0 85.5Q92 114 98 163Q104 209 126.5 256.0Q149 303 182.0 339.0Q215 375 254 388Q268 393 282.5 395.5Q297 398 321 396Q344 393 362.0 384.5Q380 376 388 366Q404 350 409.0 335.0Q414 320 413 306Q408 274 384.5 237.0Q361 200 319 182Q302 175 279.0 173.0Q256 171 216 179Q192 184 184.5 174.0Q177 164 178 135Q180 117 186.5 103.5Q193 90 211 85Q234 81 244.0 84.5Q254 88 269 95Q277 100 284.5 106.0Q292 112 299.5 118.0Q307 124 312 127Q317 131 322.0 132.0Q327 133 332 133Q343 132 353.0 121.0Q363 110 366 100Q366 92 356.0 77.5Q346 63 329.5 47.5Q313 32 293 20ZM280 243Q287 246 300.5 257.0Q314 268 325.0 280.5Q336 293 336 300Q336 311 321.5 319.0Q307 327 284 322Q276 320 265.0 311.0Q254 302 243.0 290.5Q232 279 224.0 268.5Q216 258 213 252Q217 247 229.0 244.0Q241 241 255.5 241.0Q270 241 280 243Z"/><path pathLength="1" style="--i:5" transform="translate(2036 0) scale(1 -1)" d="M153 -6Q119 8 103.5 23.5Q88 39 91 51Q93 57 98.0 62.0Q103 67 120.5 66.5Q138 66 175 57Q186 57 197.0 58.0Q208 59 217.5 61.0Q227 63 233 66Q238 68 236.0 71.5Q234 75 229 79Q225 84 220.0 85.5Q215 87 211 87Q209 92 202.5 97.0Q196 102 187 108Q165 126 147.0 140.0Q129 154 133 161Q133 165 133.0 165.5Q133 166 133 166Q126 166 120.0 185.5Q114 205 114 221Q114 241 122.5 261.0Q131 281 144.5 299.0Q158 317 172 331Q191 349 212.5 366.5Q234 384 259.5 398.0Q285 412 316 420Q330 423 348.0 423.0Q366 423 374 418Q382 423 394.0 415.5Q406 408 418.0 395.0Q430 382 436 369Q436 357 435.5 339.5Q435 322 433.0 309.0Q431 296 424 296Q424 296 421.5 295.5Q419 295 419 290Q419 280 404 267Q385 254 368.0 246.0Q351 238 342 245Q336 249 331.0 253.0Q326 257 322 263Q322 263 319.5 267.5Q317 272 317 276Q317 280 320.0 283.5Q323 287 323 287Q337 300 344.5 311.0Q352 322 355.0 330.5Q358 339 358 344Q358 350 355.5 351.5Q353 353 345 353Q340 353 323.5 345.0Q307 337 289.0 325.5Q271 314 261 305Q257 298 255.5 296.0Q254 294 250 294Q250 298 245.0 293.0Q240 288 233.0 279.0Q226 270 219.0 260.0Q212 250 208 244Q207 235 203.5 227.5Q200 220 201 212Q202 202 211.0 193.0Q220 184 237 170Q272 144 289.5 129.0Q307 114 314.0 105.0Q321 96 323 87Q340 56 327.0 33.5Q314 11 287 -1Q277 -6 252.0 -10.5Q227 -15 199.5 -14.5Q172 -14 153 -6Z"/><path pathLength="1" style="--i:6" transform="translate(2386 0) scale(1 -1)" d="M153 -6Q119 8 103.5 23.5Q88 39 91 51Q93 57 98.0 62.0Q103 67 120.5 66.5Q138 66 175 57Q186 57 197.0 58.0Q208 59 217.5 61.0Q227 63 233 66Q238 68 236.0 71.5Q234 75 229 79Q225 84 220.0 85.5Q215 87 211 87Q209 92 202.5 97.0Q196 102 187 108Q165 126 147.0 140.0Q129 154 133 161Q133 165 133.0 165.5Q133 166 133 166Q126 166 120.0 185.5Q114 205 114 221Q114 241 122.5 261.0Q131 281 144.5 299.0Q158 317 172 331Q191 349 212.5 366.5Q234 384 259.5 398.0Q285 412 316 420Q330 423 348.0 423.0Q366 423 374 418Q382 423 394.0 415.5Q406 408 418.0 395.0Q430 382 436 369Q436 357 435.5 339.5Q435 322 433.0 309.0Q431 296 424 296Q424 296 421.5 295.5Q419 295 419 290Q419 280 404 267Q385 254 368.0 246.0Q351 238 342 245Q336 249 331.0 253.0Q326 257 322 263Q322 263 319.5 267.5Q317 272 317 276Q317 280 320.0 283.5Q323 287 323 287Q337 300 344.5 311.0Q352 322 355.0 330.5Q358 339 358 344Q358 350 355.5 351.5Q353 353 345 353Q340 353 323.5 345.0Q307 337 289.0 325.5Q271 314 261 305Q257 298 255.5 296.0Q254 294 250 294Q250 298 245.0 293.0Q240 288 233.0 279.0Q226 270 219.0 260.0Q212 250 208 244Q207 235 203.5 227.5Q200 220 201 212Q202 202 211.0 193.0Q220 184 237 170Q272 144 289.5 129.0Q307 114 314.0 105.0Q321 96 323 87Q340 56 327.0 33.5Q314 11 287 -1Q277 -6 252.0 -10.5Q227 -15 199.5 -14.5Q172 -14 153 -6Z"/><path pathLength="1" style="--i:7" transform="translate(2736 0) scale(1 -1)" d="M162 52Q141 45 127.0 45.5Q113 46 96 58Q76 78 82.5 98.5Q89 119 118 139Q138 151 147.5 151.5Q157 152 176 144Q210 123 206.0 97.5Q202 72 162 52Z"/></svg>';

  var NAV = [
    { key: 'services', href: 'services.html', label: 'Services', n: 1 },
    { key: 'join-us', href: 'join-us.html', label: 'Join us', n: 2 },
    { key: 'about', href: 'our-story.html', label: 'About', n: 3 },
    { key: 'contact', href: 'contact.html', label: 'Contact', n: 4 }
  ];
  var file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var PAGE_KEY = /^(configure|brief)\.html$/.test(file) ? 'order' : ({ auth: 'login' })[document.body.getAttribute('data-page')] || document.body.getAttribute('data-page') || (function () {
    if (/^(services|corporate-content|creative-writing|advertising|social-media|configure|brief)\.html$/.test(file)) return 'services';
    if (file === 'our-story.html') return 'about';
    if (file === 'join-us.html') return 'join-us';
    if (file === 'contact.html') return 'contact';
    if (/^account/.test(file)) return 'account';
    if (/^(log-in|sign-up|forgot-password|set-password)\.html$/.test(file)) return 'login';
    return '';
  })();
  var curAttr = function (k) { return k === PAGE_KEY ? ' aria-current="page"' : ''; };
  var accHref = function () { return account.signedIn() ? 'account.html' : 'log-in.html'; };
  var accText = function () { return account.signedIn() ? 'Account' : 'Log in'; };
  var accKey = function () { return account.signedIn() ? 'account' : 'login'; };

  function headerHTML() {
    var tone = document.body.getAttribute('data-nav') === 'dark' ? ' on-dark' : '';
    var links = NAV.map(function (n) { return '<a href="' + n.href + '"' + curAttr(n.key) + '>' + n.label + '<sup>' + n.n + '</sup>' + RING + '</a>'; }).join('');
    return '<a class="skip" href="#main">Skip to content</a>' +
      '<header class="nav' + tone + (account.signedIn() ? ' signed' : '') + '" id="nav">' +
      '<div class="wrap">' +
      '<a href="index.html" class="logo" aria-label="Gulf Content Co home"><span>Gulf Content</span><span class="co">Co.</span>' + LOGO_SVG + '</a>' +
      '<nav class="links" aria-label="Main">' + links + '</nav>' +
      '<div class="right">' +
      '<div class="cur-wrap" id="curWrap"><button class="cur" id="curBtn" aria-haspopup="true" aria-expanded="false" aria-label="Currency"><span id="curCode" data-cur-code>' + cur + '</span>' + CHEV + RING + '</button><div class="cur-pop" id="curPop" role="menu">' +
      Object.keys(CUR).map(function (k) { return '<button data-c="' + k + '" role="menuitemradio" aria-pressed="' + (k === cur) + '"><span>' + k + '</span><span>' + CUR[k].symbol.trim() + '</span></button>'; }).join('') +
      '</div></div>' +
      '<a class="acct-ic" href="account.html" aria-label="Account"' + curAttr('account') + '>' + I_ACC + '</a>' +
      '<a class="basket" id="basket" href="basket.html"><span class="bk-w">Basket </span>(<span id="bn" data-basket-n>' + cart.count() + '</span>)' + RING + '</a>' +
      '<a href="' + accHref() + '" class="login" data-acc-link' + curAttr(accKey()) + '>' + accText() + RING + '</a>' +
      '<button class="menu" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="mmenu">' + I_MENU + I_X + '</button>' +
      '</div></div></header>' + menuHTML();
  }
  function menuHTML() {
    var cats = CATEGORIES.map(function (c) { return '<a href="' + c.page + '"' + (file === c.page ? ' aria-current="page"' : '') + '>' + esc(c.name) + '</a>'; }).join('');
    var curs = Object.keys(CUR).map(function (k, i) { return (i ? '<i aria-hidden="true">·</i>' : '') + '<button data-c="' + k + '" aria-pressed="' + (k === cur) + '">' + k + '</button>'; }).join('');
    return '<div class="mmenu" id="mmenu" role="dialog" aria-modal="true" aria-label="Menu" aria-hidden="true"><div class="mm-pad">' +
      '<span class="mm-hole" style="top:175px"></span><span class="mm-hole" style="top:358px"></span><span class="mm-hole" style="top:541px"></span>' +
      '<p class="mm-where">where to?</p>' +
      '<a class="mm-link" href="services.html"' + curAttr('services') + '>Services</a>' +
      '<div class="mm-cats">' + cats + '</div>' +
      '<a class="mm-link" href="join-us.html"' + curAttr('join-us') + '>Join us</a>' +
      '<a class="mm-link" href="our-story.html"' + curAttr('about') + '>About</a>' +
      '<a class="mm-link" href="contact.html"' + curAttr('contact') + '>Contact</a>' +
      '<div class="mm-space"></div>' +
      '<div class="mm-foot"><div class="mm-row"><a class="mm-acc" href="' + accHref() + '" data-acc-link>' + accText() + '</a><div class="mm-cur" role="group" aria-label="Currency">' + curs + '</div></div>' +
      '<a class="btn btn-navy btn-block" href="services.html">Order content</a></div>' +
      '</div></div>';
  }
  function footerHTML() {
    var cats = ['creative-writing', 'advertising', 'social-media', 'corporate-content'].map(function (id) { var c = catById[id]; return '<li><a href="' + c.page + '">' + esc(c.name) + '</a></li>'; }).join('');
    return '<footer class="site-foot"><div class="wrap">' +
      '<p class="say" id="say">' + SAY + '</p>' +
      '<div class="foot">' +
      '<div><a href="index.html" class="logo flogo" aria-label="Gulf Content Co home"><span>Gulf Content</span><span class="co">Co.</span>' + LOGO_SVG + '</a><p>Content writing ordered online,<br>priced by the piece.</p></div>' +
      '<div class="cols">' +
      '<div><h4>Services</h4><ul>' + cats + '</ul></div>' +
      '<div><h4>Explore</h4><ul><li><a href="our-story.html">About</a></li><li><a href="join-us.html">Join us</a></li><li><a href="contact.html">Contact</a></li><li><a href="' + accHref() + '" data-acc-link>' + accText() + '</a></li></ul></div>' +
      '<div><h4>Legal</h4><ul><li><a href="terms.html">Terms</a></li><li><a href="privacy.html">Privacy</a></li><li><a href="refunds.html">Refunds</a></li><li><a href="cookies.html">Cookies</a></li></ul></div>' +
      '</div></div>' +
      '<div class="base"><span>© 2026 Gulf Content Co.</span><span class="pay">We take ' + PAY + '</span></div>' +
      '</div></footer>';
  }
  function mount(name, html) { $$('[data-partial="' + name + '"]').forEach(function (el) { el.outerHTML = html; }); }
  mount('header', headerHTML());
  mount('footer', footerHTML());
  $$('[data-pay-marks]').forEach(function (el) { el.innerHTML = PAY; });

  /* nav behaviour */
  var nav = $('#nav'), mm = $('#mmenu');
  if (nav) {
    var solid = function () { nav.classList.toggle('solid', scrollY > 24); };
    solid(); addEventListener('scroll', solid, { passive: true });
    var cw = $('#curWrap'), cb = $('#curBtn');
    cb.addEventListener('click', function (e) { e.stopPropagation(); cb.setAttribute('aria-expanded', cw.classList.toggle('open')); });
    document.addEventListener('click', function (e) { if (cw && !cw.contains(e.target)) { cw.classList.remove('open'); cb.setAttribute('aria-expanded', 'false'); } });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-c]');
    if (!b || !b.closest('.cur-pop,.mm-cur')) return;
    setCurrency(b.getAttribute('data-c'));
    var w = $('#curWrap'); if (w) w.classList.remove('open');
  });
  on('currency', function () {
    $$('[data-cur-code]').forEach(function (el) { el.textContent = cur; });
    $$('.cur-pop [data-c],.mm-cur [data-c]').forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-c') === cur); });
  });
  on('cart', function (d) {
    $$('[data-basket-n]').forEach(function (el) { el.textContent = cart.count(); });
    if (d && d.added && !RM) { var bk = $('#basket'); if (bk) { bk.classList.remove('bump'); void bk.offsetWidth; bk.classList.add('bump'); } }
  });
  on('account', function () {
    var si = account.signedIn();
    if (nav) nav.classList.toggle('signed', si);
    $$('[data-acc-link]').forEach(function (a) {
      a.setAttribute('href', accHref());
      var ring = a.querySelector('.nring'); a.textContent = accText(); if (ring) a.appendChild(ring);
    });
  });
  /* mobile menu */
  var lastFocus = null;
  function setMenu(open) {
    if (!mm) return;
    mm.classList.toggle('open', open); mm.setAttribute('aria-hidden', String(!open));
    nav.classList.toggle('menu-on', open); document.body.classList.toggle('menu-open', open);
    var mb = $('#menuBtn'); mb.setAttribute('aria-expanded', String(open)); mb.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) {
      lastFocus = document.activeElement;
      $$('.mm-pad > *:not(.mm-hole)', mm).forEach(function (el, i) { el.style.transitionDelay = RM ? '0s' : (0.05 + i * 0.04) + 's'; });
    } else if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('#menuBtn')) { setMenu(!mm.classList.contains('open')); return; }
    if (mm && mm.classList.contains('open') && e.target.closest && e.target.closest('.mmenu a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mm && mm.classList.contains('open')) setMenu(false);
    if (e.key === 'Tab' && mm && mm.classList.contains('open')) trap(e, [$('#menuBtn')].concat($$('a,button', mm)));
  });
  addEventListener('resize', function () { if (innerWidth > 1180 && mm && mm.classList.contains('open')) setMenu(false); });

  /* ui */
  function trap(e, list) {
    list = list.filter(function (x) { return x && x.offsetParent !== null; });
    if (!list.length) return;
    var first = list[0], last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  /* buttons: <a class="btn btn-navy">Label</a> gets its ink and text roll built here */
  /* clicking into a field clears what is in it, so the visitor types fresh (Ash). The old value shows as the
     placeholder while the field is empty and comes back on blur if nothing was typed. Add data-keep to opt out. */
  var CLEARABLE = 'input:not([type]),input[type=text],input[type=email],input[type=tel],input[type=number],input[type=search],input[type=url],input[type=password],input[type=date],textarea';
  document.addEventListener('focusin', function (e) {
    var f = e.target;
    if (!f.matches || !f.matches(CLEARABLE) || f.readOnly || f.disabled || f.hasAttribute('data-keep') || f.id === 'cfgLen' || !f.value) return;
    f._gccKept = f.value; f._gccPh = f.getAttribute('placeholder');
    if (f.type !== 'password' && f.type !== 'date') f.setAttribute('placeholder', f.value);
    f.value = '';
  });
  document.addEventListener('focusout', function (e) {
    var f = e.target; if (f._gccKept === undefined) return;
    if (!f.value) { f.value = f._gccKept; f.dispatchEvent(new Event('input', { bubbles: true })); }
    if (f._gccPh === null) f.removeAttribute('placeholder'); else f.setAttribute('placeholder', f._gccPh);
    f._gccKept = undefined;
  });
  function enhance(root) {
    $$('.btn', root).forEach(function (b) {
      if (b.querySelector('.roll')) return;
      var t = b.textContent.trim();
      b.innerHTML = '<i class="ink"></i><span class="roll"><span>' + esc(t) + '</span><span aria-hidden="true">' + esc(t) + '</span></span>';
    });
    tracks(root);
  }
  document.addEventListener('pointerover', function (e) {
    var b = e.target.closest && e.target.closest('.btn');
    if (!b || (e.relatedTarget && b.contains(e.relatedTarget))) return;
    var r = b.getBoundingClientRect();
    b.style.setProperty('--x', e.clientX - r.left + 'px'); b.style.setProperty('--y', e.clientY - r.top + 'px');
    b.style.setProperty('--d', Math.ceil(2 * Math.hypot(r.width, r.height)) + 'px');
  });
  /* popup: <div class="overlay" id="sent" aria-hidden="true"><div class="popup" role="dialog" aria-modal="true" aria-labelledby="sentT">...</div></div> */
  var popFocus = null;
  function popup(id) {
    var o = document.getElementById(id); if (!o) return;
    popFocus = document.activeElement;
    o.classList.add('open'); o.setAttribute('aria-hidden', 'false'); document.body.classList.add('menu-open');
    var f = o.querySelector('.btn, a, button, input'); if (f) setTimeout(function () { f.focus({ preventScroll: true }); }, 60);
  }
  function closePopup(id) {
    var o = typeof id === 'string' ? document.getElementById(id) : id; if (!o) return;
    o.classList.remove('open'); o.setAttribute('aria-hidden', 'true'); document.body.classList.remove('menu-open');
    if (popFocus) popFocus.focus({ preventScroll: true });
  }
  document.addEventListener('click', function (e) {
    var o = e.target.closest && e.target.closest('.overlay');
    if (o && (e.target === o || e.target.closest('[data-close]'))) closePopup(o);
    var t = e.target.closest && e.target.closest('[data-popup]');
    if (t) { e.preventDefault(); popup(t.getAttribute('data-popup')); }
  });
  document.addEventListener('keydown', function (e) {
    var o = $('.overlay.open'); if (!o) return;
    if (e.key === 'Escape') closePopup(o);
    if (e.key === 'Tab') trap(e, $$('a,button,input,textarea,select', o));
  });
  /* validation: <label class="field"><span class="fl">Email</span><input data-rule="email"><span class="fe">Enter a valid email</span></label> */
  var RULES = {
    required: function (v) { return v.trim().length > 0; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
    phone: function (v) { return v.replace(/[^0-9]/g, '').length >= 7; },
    password: function (v) { return v.length >= 8; }
  };
  function checkOne(input, form) {
    var rule = input.getAttribute('data-rule'), ok;
    if (rule === 'checked') ok = input.checked;
    else if (rule === 'captcha') ok = input.classList.contains('done');
    else if (rule === 'match') {
      var other = (form || document).querySelector(input.getAttribute('data-match')), fe = (input.closest('.field') || input).querySelector('.fe');
      ok = !!other && input.value === other.value && input.value.length > 0;
      if (fe) { if (!fe.hasAttribute('data-msg')) fe.setAttribute('data-msg', fe.textContent); fe.textContent = input.value.length ? fe.getAttribute('data-msg') : (input.getAttribute('data-msg-empty') || 'Confirm your new password'); }
    }
    else if (input.hasAttribute('data-optional') && !input.value.trim()) ok = true;
    else ok = (RULES[rule] || RULES.required)(input.value || '');
    var wrap = rule === 'captcha' ? input : input.closest('.field, .consent, .upload') || input;
    wrap.classList.toggle('bad', !ok);
    if (wrap.classList.contains('field')) wrap.classList.toggle('ok', ok && !!(input.value || '').trim());
    return ok;
  }
  function validate(form) {
    var ok = true, first = null;
    $$('[data-rule]', form).forEach(function (input) { if (!checkOne(input, form)) { ok = false; if (!first) first = input; } });
    if (first) { (first.matches('.captcha') ? first : first).focus({ preventScroll: true }); first.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'center' }); }
    return ok;
  }
  document.addEventListener('input', function (e) { var w = e.target.closest && e.target.closest('.field.bad'); if (w) checkOne(e.target, e.target.form); });
  document.addEventListener('change', function (e) { var w = e.target.closest && e.target.closest('.consent.bad, .field.bad'); if (w) checkOne(e.target, e.target.form); });
  /* password eye: <button type="button" class="eye" aria-label="Show password" aria-pressed="false"></button> inside .field.pw */
  var EYE = '<svg class="i-on" viewBox="0 0 20 16" aria-hidden="true"><path d="M1.5 8C3.6 4.3 6.6 2.5 10 2.5s6.4 1.8 8.5 5.5c-2.1 3.7-5.1 5.5-8.5 5.5S3.6 11.7 1.5 8Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><circle cx="10" cy="8" r="2.4" fill="currentColor"/></svg><svg class="i-off" viewBox="0 0 20 16" aria-hidden="true"><path d="M1.5 8C3.6 4.3 6.6 2.5 10 2.5s6.4 1.8 8.5 5.5c-2.1 3.7-5.1 5.5-8.5 5.5S3.6 11.7 1.5 8Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M3 14.5 17 1.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';
  $$('.field.pw .eye').forEach(function (b) { if (!b.innerHTML.trim()) b.innerHTML = EYE; });
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.field .eye'); if (!b) return;
    e.preventDefault();
    var input = b.closest('.field').querySelector('input'), show = input.type === 'password';
    input.type = show ? 'text' : 'password'; b.setAttribute('aria-pressed', String(show)); b.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  });
  /* upload: <label class="upload"><span class="fl">Upload documents</span><span class="ut">Click to upload or drag and drop</span><span class="us">PDF, DOCX or TXT, up to 20MB</span><span class="uf"></span><input type="file" multiple></label> */
  document.addEventListener('change', function (e) {
    var u = e.target.closest && e.target.closest('.upload'); if (!u || e.target.type !== 'file') return;
    var list = u.querySelector('.uf'); if (!list) return;
    list.innerHTML = Array.prototype.slice.call(e.target.files).map(function (f) { return '<span>' + esc(f.name) + '</span>'; }).join('');
  });
  ['dragenter', 'dragover'].forEach(function (t) { document.addEventListener(t, function (e) { var u = e.target.closest && e.target.closest('.upload'); if (u) u.classList.add('over'); }); });
  ['dragleave', 'drop'].forEach(function (t) { document.addEventListener(t, function (e) { var u = e.target.closest && e.target.closest('.upload'); if (u) u.classList.remove('over'); }); });
  /* reCAPTCHA mock: <div class="captcha" data-rule="captcha" tabindex="0" role="checkbox" aria-checked="false"> (markup in FOUNDATION.md) */
  function tickCaptcha(c) {
    if (c.classList.contains('done') || c.classList.contains('spin')) return;
    c.classList.add('spin');
    setTimeout(function () { c.classList.remove('spin', 'bad'); c.classList.add('done'); c.setAttribute('aria-checked', 'true'); }, RM ? 0 : 750);
  }
  document.addEventListener('click', function (e) { var c = e.target.closest && e.target.closest('.captcha'); if (c) tickCaptcha(c); });
  document.addEventListener('keydown', function (e) { if ((e.key === ' ' || e.key === 'Enter') && e.target.matches && e.target.matches('.captcha')) { e.preventDefault(); tickCaptcha(e.target); } });
  /* account menu (mobile) and any [data-dropdown] */
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('.accmenu-t, [data-dropdown] > button');
    $$('.accmenu.open, [data-dropdown].open').forEach(function (m) { if (!t || !m.contains(t)) m.classList.remove('open'); });
    if (t) { var m = t.parentElement; t.setAttribute('aria-expanded', String(m.classList.toggle('open'))); }
  });
  /* toast and tip */
  var toastEl;
  function toast(html) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.innerHTML = html; toastEl.classList.add('show');
    clearTimeout(toastEl.t); toastEl.t = setTimeout(function () { toastEl.classList.remove('show'); }, 2800);
  }
  var tipEl, tipT;
  function tip(el, text) {
    if (!tipEl) { tipEl = document.createElement('div'); tipEl.className = 'tip'; document.body.appendChild(tipEl); addEventListener('scroll', function () { tipEl.classList.remove('show'); }, { passive: true }); }
    tipEl.textContent = text;
    var r = el.getBoundingClientRect(); tipEl.className = 'tip show';
    var tw = tipEl.offsetWidth, th = tipEl.offsetHeight, up = r.top > th + 14;
    tipEl.className = 'tip show ' + (up ? 'up' : 'dn');
    tipEl.style.top = (up ? r.top - th - 10 : r.bottom + 10) + 'px';
    tipEl.style.left = Math.min(innerWidth - tw - 8, Math.max(8, r.left + r.width / 2 - tw / 2)) + 'px';
    clearTimeout(tipT); tipT = setTimeout(function () { tipEl.classList.remove('show'); }, 1600);
  }
  /* swipe tracks: [data-track] followed by .swipe; dots are built and follow the scroll */
  function tracks(root) {
    $$('[data-track]', root).forEach(function (t) {
      if (t._gccTrack) return; t._gccTrack = true;
      var sw = t.nextElementSibling; if (!sw || !sw.classList.contains('swipe')) return;
      var dots = sw.querySelector('.sdots'); if (!dots) return;
      var n = t.children.length;
      dots.innerHTML = new Array(n + 1).join('<i></i>'); dots.setAttribute('aria-hidden', 'true');
      var ds = $$('i', dots); if (ds[0]) ds[0].classList.add('on');
      t.addEventListener('scroll', function () {
        var w = t.firstElementChild ? t.firstElementChild.getBoundingClientRect().width + 16 : 1;
        var max = t.scrollWidth - t.clientWidth, i = t.scrollLeft >= max - 4 ? n - 1 : Math.min(n - 1, Math.round(t.scrollLeft / w));
        ds.forEach(function (x, k) { x.classList.toggle('on', k === i); });
      }, { passive: true });
    });
  }
  function params() { return new URLSearchParams(location.search); }
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function fmtDate(iso) { var p = String(iso).split('-'); return parseInt(p[2], 10) + ' ' + MONTHS[parseInt(p[1], 10) - 1] + ' ' + p[0]; }

  /* struck word count across the visit; the nav meter that showed it was removed in v1.3 (Ash) */
  var cutTotal = 0, cutShown = 0, cutRaf = 0;
  try { cutTotal = cutShown = parseInt(sessionStorage.getItem('gcc.cut') || '0', 10) || 0; } catch (e) {}
  function paintCut(n) { $$('[data-cut-n]').forEach(function (el) { el.textContent = fmtN(n); }); }
  paintCut(cutShown);
  function cut(n) {
    n = Math.max(0, n | 0); if (!n) return cutTotal;
    cutTotal += n; try { sessionStorage.setItem('gcc.cut', String(cutTotal)); } catch (e) {}
    var meter = $('#meter');
    if (RM || !meter) { cutShown = cutTotal; paintCut(cutTotal); return cutTotal; }
    meter.classList.remove('bump'); void meter.offsetWidth; meter.classList.add('bump'); setTimeout(function () { meter.classList.remove('bump'); }, 380);
    if (!cutRaf) {
      var step = function () { cutShown += Math.max(1, Math.ceil((cutTotal - cutShown) * 0.18)); if (cutShown >= cutTotal) cutShown = cutTotal; paintCut(cutShown); cutRaf = cutShown < cutTotal ? requestAnimationFrame(step) : 0; };
      cutRaf = requestAnimationFrame(step);
    }
    return cutTotal;
  }
  var words = function (t) { return String(t).trim().split(/\s+/).filter(Boolean).length; };

  /* motion: page fade fallback, line masks, reveals, drawn strikes and handwriting */
  var root = document.documentElement;
  var native = 'onpagereveal' in window && location.protocol !== 'file:';
  var quiet = function (e) { if (e.viewTransition) ['ready', 'finished', 'updateCallbackDone'].forEach(function (k) { var p = e.viewTransition[k]; if (p && p.catch) p.catch(function () {}); }); };
  addEventListener('pageswap', quiet); addEventListener('pagereveal', quiet);
  /* a skipped view transition (fast clicks, hidden tab) rejects its promises: expected, not an error */
  addEventListener('unhandledrejection', function (e) { var r = e.reason; if (r && (r.name === 'AbortError' || r.name === 'InvalidStateError') && /transition/i.test(r.message || '')) e.preventDefault(); });
  if (!RM && !native) root.classList.add('pf');
  addEventListener('pageshow', function (e) { if (e.persisted) root.classList.remove('leaving'); });
  /* every internal page link carries the basket, currency and account in the hash */
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]'); if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    var href = a.getAttribute('href'); if (!href || /^(https?:|mailto:|tel:|#|javascript:)/i.test(href) || !/\.html(\?|#|$)/.test(href)) return;
    e.preventDefault(); go(href);
  });

  function splitLines(el) {
    if (el._gccLines) return; el._gccLines = true;
    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var parts = n.textContent.split(/(\s+)/), frag = document.createDocumentFragment();
          parts.forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(p));
            else { var m = document.createElement('span'); m.className = 'wm'; var i = document.createElement('span'); i.className = 'wi'; i.textContent = p; m.appendChild(i); frag.appendChild(m); }
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(el);
    var tops = [], ws = $$('.wm', el);
    ws.forEach(function (w) { var t = Math.round(w.offsetTop); if (tops.indexOf(t) < 0) tops.push(t); });
    ws.forEach(function (w) { w.firstChild.style.setProperty('--d', (0.1 + tops.indexOf(Math.round(w.offsetTop)) * 0.1) + 's'); });
    setTimeout(function () { el.classList.add('done'); }, RM ? 0 : 1300 + tops.length * 100);
  }
  function drawIn(el, base) {
    var items = el.matches('.hw,.st') ? [el] : $$('.hw,.st', el), i = 0;
    items.forEach(function (x) {
      if (x.classList.contains('on')) return;
      var d = RM ? 0 : (base || 0) + i++ * 350;
      setTimeout(function () { x.classList.add('on'); if (x.classList.contains('st')) cut(words(x.textContent)); }, d);
    });
  }
  var io = null, batchStart = true;
  function observe(rootEl) {
    var els = $$('.rv, .rv-fade, .say, [data-draw], .rv-kids > *', rootEl);
    $$('.rv-kids > *', rootEl).forEach(function (k) { if (!k.classList.contains('rv')) k.classList.add('rv'); });
    if (RM || !('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in', 'on'); if (el.hasAttribute('data-draw')) drawIn(el, 0); }); return; }
    if (!io) io = new IntersectionObserver(function (es) {
      var k = 0, base = batchStart ? 0.35 : 0; batchStart = false;
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        var t = en.target;
        if (t.classList.contains('rv') || t.classList.contains('rv-fade')) {
          if (!t.style.transitionDelay) t.style.transitionDelay = Math.min(0.6, base + k++ * 0.1) + 's';
          t.classList.add('in');
          t.addEventListener('transitionend', function te(ev) { if (ev.propertyName === 'opacity') { t.style.transitionDelay = ''; if (t.classList.contains('btn')) t.classList.remove('rv', 'in'); t.removeEventListener('transitionend', te); } });
        }
        if (t.classList.contains('say')) t.classList.add('on');
        if (t.hasAttribute('data-draw')) drawIn(t, (base + 0.5) * 1000);
        io.unobserve(t);
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    els.forEach(function (el) { if (!el._gccSeen) { el._gccSeen = true; io.observe(el); } });
  }
  function start() {
    enhance(document);
    refreshPrices();
    $$('[data-lines]').forEach(splitLines);
    observe(document);
    requestAnimationFrame(function () { requestAnimationFrame(function () { document.body.classList.add('ready'); }); });
  }

  /* public API */
  window.GCC = {
    version: VERSION, built: BUILT, reducedMotion: RM,
    catalogue: CAT, service: service, services: services, category: category, categories: function () { return CATEGORIES.slice(); }, categoryOf: categoryOf,
    grades: CAT.grades, turnarounds: CAT.turnarounds, grade: grade, turnaround: turnaround, imagePrice: CAT.imagePrice,
    unitLabel: unitLabel, fromLabel: fromLabel, catFrom: catFrom,
    price: price, describe: describe, money: money, rates: RATES,
    currency: function () { return cur; }, setCurrency: setCurrency, refreshPrices: refreshPrices,
    cart: cart, discount: discount, draft: draft, account: account, orders: orders,
    pay: { start: startPayment },
    ui: { popup: popup, close: closePopup, validate: validate, toast: toast, tip: tip, enhance: function (r) { enhance(r); observe(r); refreshPrices(r); }, params: params, fmtDate: fmtDate, esc: esc, go: go, lines: splitLines },
    cut: cut, on: on, emit: emit, storage: storage
  };
  window.startPayment = startPayment;
  window.gcc = Object.assign(window.gcc || {}, {
    version: function () { var s = 'gcc site v' + VERSION + ' (built ' + BUILT + ')'; console.info(s); return s; },
    state: function () { var s = { currency: cur, basket: cart.list().map(function (l) { return { id: l.id, service: l.s, total: l.price.total, brief: l.brief && l.brief.title }; }), totals: (function (t) { return { subtotal: t.subtotal, discount: t.discount, total: t.total }; })(totals()), account: account.get(), orders: orders.list().map(function (o) { return o.ref + ' ' + o.totals.total; }) }; console.log(s); return s; },
    rates: RATES
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
