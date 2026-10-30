/* basket.html: each line is a brief sheet (Edit the brief, Remove); the sticky note totals it with GULF10.
   basket.html?demo loads the four Figma lines (order GCC-2026-0148, $351.54). Checkout is account gated. */
(function () {
  'use strict';
  var G = window.GCC, $ = function (q, r) { return (r || document).querySelector(q); };
  var esc = G.ui.esc;
  var q = G.ui.params();
  if (q.has('demo')) {
    G.cart.demo(); G.discount.set('GULF10');
    q.delete('demo');
    try { history.replaceState(history.state, '', location.pathname + (q.toString() ? '?' + q : '')); } catch (e) {}
  }
  function render() {
    var t = G.cart.totals(), n = t.lines.length, sh = t.show;
    $('#bskFull').hidden = !n; $('#bskEmpty').hidden = !!n;
    if (!n) { G.ui.enhance($('#bskEmpty')); return; }
    $('#bskSheets').innerHTML = t.lines.map(function (l, i) {
      var b = l.brief || {}, notes = b.notes || b.subject || '';
      var edit = 'brief.html?line=' + encodeURIComponent(l.id) + (b.mode === 'quick' ? '&form=quick' : '');
      return '<article class="bsk-sheet rv" data-id="' + esc(l.id) + '">' +
        '<p class="cap">BRIEF ' + (i + 1) + ' OF ' + n + '</p>' +
        '<h2>' + esc(l.service.name) + '</h2>' +
        (b.title ? '<p class="bsk-q">“' + esc(b.title) + '”</p>' : '') +
        '<div class="ord-rule"></div>' +
        (notes ? '<p class="bsk-n">' + esc(notes) + '</p>' : '') +
        '<div class="bsk-notes">' + G.describe(l).map(function (d) { return '<span>' + esc(d) + '</span>'; }).join('') + '</div>' +
        '<div class="bsk-foot"><div><a class="tlink" href="' + edit + '">Edit the brief</a><button type="button" class="tlink" data-remove="' + esc(l.id) + '" aria-label="Remove ' + esc(l.service.name) + '">Remove</button></div>' +
        '<strong>' + sh.lines[i] + '</strong></div></article>';
    }).join('');
    var L = t.lines.map(function (l, i) { return '<p class="ord-line"><span>' + esc(l.service.name) + '</span><span>' + sh.lines[i] + '</span></p>'; });
    L.push('<p class="ord-line"><span>Subtotal</span><span>' + sh.subtotal + '</span></p>');
    if (t.discount.amount) L.push('<p class="ord-line bsk-off"><span>' + esc(t.discount.label) + '</span><span>' + sh.discount + '</span></p>');
    $('#bskLines').innerHTML = L.join('');
    $('#bskTotal').textContent = sh.total;
    G.ui.enhance($('#bskRoot'));
  }
  document.addEventListener('click', function (e) {
    var r = e.target.closest('[data-remove]');
    if (r) {
      var id = r.getAttribute('data-remove'), sh = r.closest('.bsk-sheet');
      sh.classList.add('out');
      setTimeout(function () { G.cart.remove(id); render(); }, G.reducedMotion ? 0 : 320);
      return;
    }
    if (e.target.closest('#bskGo')) {
      e.preventDefault(); e.stopPropagation();
      G.ui.go(G.account.signedIn() ? 'checkout.html' : 'log-in.html?next=checkout.html');
    }
  }, true);
  G.on('currency', render);
  render();
})();
