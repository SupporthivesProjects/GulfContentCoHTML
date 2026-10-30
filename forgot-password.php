<?php include 'includes/header.php'; ?>

<main id="main">

<section class="auth-paper under-nav" aria-labelledby="authT">
    <div class="auth-body">
      <div class="auth-side" aria-hidden="true"><div class="auth-holes"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"></div><div class="auth-margin"><i></i><i></i></div></div>
      <div class="auth-rules" aria-hidden="true"></div>
      <div class="auth-copy">
        <div class="auth-top" aria-hidden="true"><div class="auth-holes"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"></div><div class="auth-margin"><i></i><i></i></div></div>
        <p class="auth-label rv"><span class="pen">it happens</span></p>
        <div class="auth-title"><h1 id="authT" data-lines>Reset <i>your password</i></h1></div>
        <p class="auth-lead rv">Enter the email you signed up with and we will send a link to set a new one.</p>
        <form id="forgotForm" novalidate>
          <div class="auth-fields rv-kids">
            <label class="field"><span class="fl">Email</span><input type="email" name="email" value="john@example.com" data-rule="email" autocomplete="email"><span class="fe">Enter a valid email</span></label>
          </div>
          <div class="auth-actions rv-kids">
            <a class="btn btn-white" href="log-in.html" data-keep-next>Back to log in</a>
            <button class="btn btn-navy" type="submit">Send reset link</button>
          </div>
        </form>
      </div>
    </div>
  </section>


</main>
<?php include 'includes/footer.php'; ?>