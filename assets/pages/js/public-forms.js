/* join-us.html and contact.html: validate the public form, then show its popup (sticky note).
   A real build posts the fields to the studio inbox here; the demo only resets the form. */
(function () {
  'use strict';
  document.querySelectorAll('form[data-popup-on-send]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!window.GCC || !GCC.ui.validate(form)) return;
      GCC.ui.popup(form.getAttribute('data-popup-on-send'));
      form.reset();
      form.querySelectorAll('.field.ok').forEach(function (f) { f.classList.remove('ok'); });
      form.querySelectorAll('.captcha').forEach(function (c) { c.classList.remove('done'); c.setAttribute('aria-checked', 'false'); });
    });
  });
})();
