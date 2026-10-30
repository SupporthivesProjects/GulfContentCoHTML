/* checkout.html: account gated. Billing prefilled from the signed in account (John Smith), GULF10 on by default,
   no card fields and no tax line. "Continue to secure payment" builds the order and calls startPayment(order),
   the one place a payment gateway plugs in (assets/site.js). */
(function () {
  'use strict';
  var G = window.GCC, $ = function (q, r) { return (r || document).querySelector(q); };
  var esc = G.ui.esc;
  if (!G.account.require('checkout.html')) return;
  if (!G.cart.count()) { G.ui.go('basket.html'); return; }
  var form = $('#chkForm'), acc = G.account.get() || G.account.demo;

  /* prefill billing from the account */
  ['name', 'email', 'phone', 'dob', 'city', 'address', 'pobox'].forEach(function (k) { if (acc[k]) form.elements[k].value = acc[k]; });
  if (acc.country) form.elements.country.value = acc.country;

  /* discount code: GULF10 applied by default */
  var code = form.elements.code, apply = $('#chkApply');
  function paintCode() {
    var d = G.discount.get();
    if (document.activeElement !== code) code.value = d.code;
    var applied = !!d.code && code.value.trim().toUpperCase() === d.code;
    setLabel(applied ? 'Applied' : 'Apply');
  }
  function setLabel(t) {
    var spans = apply.querySelectorAll('.roll span');
    if (spans.length) spans.forEach(function (x) { x.textContent = t; }); else apply.textContent = t;
  }
  code.addEventListener('input', function () { code.closest('.field').classList.remove('bad'); var d = G.discount.get(); setLabel(d.code && code.value.trim().toUpperCase() === d.code ? 'Applied' : 'Apply'); });
  function applyCode() {
    var v = code.value.trim();
    if (!v) { G.discount.clear(); code.closest('.field').classList.remove('bad'); }
    else if (G.discount.set(v)) { code.value = v.toUpperCase(); code.closest('.field').classList.remove('bad'); }
    else code.closest('.field').classList.add('bad');
    render();
  }
  apply.addEventListener('click', applyCode);
  code.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); applyCode(); } });

  /* the order on the ink side */
  function render() {
    var t = G.cart.totals(), sh = t.show;
    $('#chkLines').innerHTML = t.lines.map(function (l, i) {
      return '<div class="chk-line rv"><div><h3>' + esc(l.service.name) + '</h3><p>' + esc(G.describe(l).join(' · ')) + '</p></div><strong>' + sh.lines[i] + '</strong></div>';
    }).join('');
    var T = '<p class="ord-line rv"><span>Subtotal</span><span>' + sh.subtotal + '</span></p>';
    if (t.discount.amount) T += '<p class="ord-line chk-off rv"><span>' + esc(t.discount.label) + '</span><span>' + sh.discount + '</span></p>';
    $('#chkTotals').innerHTML = T;
    $('#chkTotal').textContent = sh.total;
    G.ui.enhance($('.chk-sum'));
    paintCode();
  }
  G.on('currency', render);
  render();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!G.ui.validate(form)) return;
    var f = form.elements, parts = f.name.value.trim().split(/\s+/);
    var billing = { name: f.name.value.trim(), first: parts[0], last: parts.slice(1).join(' '), email: f.email.value.trim(), phone: f.phone.value.trim(),
      dob: f.dob.value.trim(), country: f.country.value, city: f.city.value.trim(), address: f.address.value.trim(), pobox: f.pobox.value.trim() };
    G.account.save(billing);
    window.startPayment(G.orders.create(billing));
  });
})();
