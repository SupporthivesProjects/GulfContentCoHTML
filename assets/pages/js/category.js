/* Category pages (corporate content, creative writing, advertising, social media): one template.
   Builds the "Services in ..." ledger from assets/catalogue.js, so every name, line and from price comes from
   the catalogue and follows the currency pill (the price spans carry data-usd, refreshed by site.js).
   Each row links to configure.html?s=<service id>. Runs before site.js starts, so the buttons, reveals
   and prices it writes are enhanced with the rest of the page. */
(function () {
  if (!window.GCC) return;
  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  document.querySelectorAll('[data-cat-ledger]').forEach(function (box) {
    var list = GCC.services(box.getAttribute('data-cat-ledger'));
    box.innerHTML = list.map(function (s) {
      var per = GCC.unitLabel(s).replace(/^per /, '');
      var name = esc(s.name), href = 'configure.html?s=' + encodeURIComponent(s.id);
      return '<div class="cat-row">' +
        '<h3 class="cat-row-n">' + name + '</h3>' +
        '<p class="cat-row-p"><span class="cat-row-f" data-usd="' + s.from + '" data-whole></span>' +
          '<span class="cat-row-u cat-dk">' + esc(per) + '</span><span class="cat-row-u cat-mb">' + esc(GCC.unitLabel(s)) + '</span></p>' +
        '<p class="cat-row-d">' + esc(s.summary) + '</p>' +
        '<div class="cat-row-a"><a class="btn btn-navy" href="' + href + '" aria-label="Configure ' + name.toLowerCase().replace(/^cvs/, 'CVs') + '">Configure</a></div>' +
      '</div>';
    }).join('');
    if (GCC.refreshPrices) GCC.refreshPrices(box);
  });
})();
