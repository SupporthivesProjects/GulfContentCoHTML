/* auth family: log in, sign up, forgot password, set password.
   Log in signs in the demo account (John Smith) and honours ?next= (the checkout gate sends people here with next=checkout.html).
   Sign up, forgot and set password show their sticky note popup. No real authentication happens here. */
(function () {
  'use strict';
  var GCC = window.GCC; if (!GCC) return;
  var next = GCC.ui.params().get('next') || '';
  /* only follow a bare page of this site, never another host */
  if (!/^[a-z0-9-]+\.html(\?[^#<>"']*)?$/i.test(next)) next = '';

  /* keep ?next= on the links between the auth pages, so the checkout gate survives a detour */
  if (next) document.querySelectorAll('[data-keep-next], [data-auth-back]').forEach(function (a) {
    var h = a.getAttribute('href'); if (/^(log-in|sign-up)\.html$/.test(h)) a.setAttribute('href', h + '?next=' + encodeURIComponent(next));
  });

  function val(form, name) { var i = form.querySelector('[name="' + name + '"]'); return i ? i.value.trim() : ''; }
  function showEmail(email) { document.querySelectorAll('[data-auth-email]').forEach(function (s) { s.textContent = email || 'john@example.com'; }); }

  var login = document.getElementById('loginForm');
  if (login) login.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!GCC.ui.validate(login)) return;
    GCC.account.signIn({ email: val(login, 'email') });
    GCC.ui.go(next || 'account.html');
  });

  var signup = document.getElementById('signupForm');
  if (signup) signup.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!GCC.ui.validate(signup)) return;
    showEmail(val(signup, 'email'));
    GCC.ui.popup('inbox');
  });

  var forgot = document.getElementById('forgotForm');
  if (forgot) forgot.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!GCC.ui.validate(forgot)) return;
    showEmail(val(forgot, 'email'));
    GCC.ui.popup('inbox');
  });

  var set = document.getElementById('setForm');
  if (set) set.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!GCC.ui.validate(set)) return;
    GCC.ui.popup('saved');
  });
})();
