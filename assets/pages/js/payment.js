/* payment-complete.php?ref= and payment-failed.php?ref=: read the order by its reference.
   Complete shows the amount paid and the paper scraps; failed keeps the basket and offers a retry through startPayment;
   an already paid ref (placed or demo) never refills the basket and its retry goes to the account. */
(function () {
  'use strict';
  var G = window.GCC, $ = function (q, r) { return (r || document).querySelector(q); };
  var failed = document.body.querySelector('.pay-failed') !== null;
  var page = (location.pathname.split('/').pop() || '') + location.search;
  if (!G.account.require(page)) return;
  var ref = G.ui.params().get('ref') || 'GCC-2026-0148';
  var order = G.orders.find(ref);
  /* an order that is already paid never comes back into the basket: a stale #gcc hash (back button, an old link)
     can rehydrate its lines, so drop any basket line that belongs to a placed order */
  var placed = (G.storage.get('orders', []) || []).filter(function (o) { return o.ref === ref; })[0];
  if (placed) {
    var ids = placed.lines.map(function (l) { return l.id; }).filter(Boolean);
    G.cart.list().forEach(function (l) { if (ids.indexOf(l.id) >= 0) G.cart.remove(l.id); });
  }
  var paid = !!placed || !!(order && order.demo);
  /* display figures that add up (GCC totals .show), recomputed on every currency change */
  function amount() {
    if (failed && !paid && G.cart.count()) return G.cart.totals().show.total;
    if (order) { order = G.orders.find(ref) || order; return order.totals.show.total; }
    return G.cart.totals().show.total;
  }
  function paint() { $('#payAmt').textContent = amount(); }
  $('#payRef').textContent = 'Order ' + ref + (order ? ', ' + G.ui.fmtDate(order.date) : '');
  paint(); G.on('currency', paint);

  if (!failed) {
    var inv = $('#payInv'); if (inv) inv.setAttribute('href', 'account-invoices.php?ref=' + encodeURIComponent(ref));
    /* the paper scraps from Figma (x, y in the 1440 column, w, h, angle, colour) */
    var C = ['#47b147', '#ffe9a8', '#fff', '#dde2e8'];
    var S = [[1371,130,17,9,123,0],[980,112,16,19,-174,1],[918,205,31,16,108,2],[1231,270,10,19,-58,0],[1305,207,15,10,72,3],[1212,50,18,10,97,0],[877,186,21,13,-9,1],[679,140,18,10,-62,2],[1094,47,31,19,-63,0],[1157,160,29,8,-119,3],[695,301,27,6,115,0],[1394,287,28,14,-42,1],[1399,294,15,19,-58,2],[683,53,21,14,-147,0],[1395,161,11,12,130,3],[815,250,24,18,144,0],[687,71,24,19,-158,1],[1198,290,25,13,62,2],[1125,88,14,8,97,0],[794,93,16,11,52,3],[835,94,29,19,86,0],[739,93,30,16,131,1],[1029,88,21,16,92,2],[1163,189,25,17,170,0],[1355,3,31,16,-145,3],[724,91,18,10,-66,0],[724,37,14,7,-75,1],[690,194,19,10,-40,2],[681,166,10,7,-94,0],[1074,252,20,6,41,3],[1091,44,17,12,56,0],[985,313,20,9,-21,1],[734,228,23,14,127,2],[1101,169,28,10,113,0]];
    $('#payScraps').innerphp = S.map(function (x, i) {
      return '<i style="left:' + (x[0] / 14.4).toFixed(2) + '%;top:' + x[1] + 'px;width:' + x[2] + 'px;height:' + x[3] + 'px;rotate:' + x[4] + 'deg;background:' + C[x[5]] + ';--d:' + ((i % 9) / 12).toFixed(2) + '"></i>';
    }).join('');
  } else {
    $('#payRetry').addEventListener('click', function () {
      if (G.cart.count()) window.startPayment(G.orders.create(G.account.get()));
      else G.ui.go(paid ? 'account.php' : 'basket.php');
    });
  }
})();
