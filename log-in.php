  <?php include 'includes/header.php'; ?>
  <section class="auth-paper under-nav" aria-labelledby="authT">
    <div class="auth-body">
      <div class="auth-side" aria-hidden="true"><div class="auth-holes"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"></div><div class="auth-margin"><i></i><i></i></div></div>
      <div class="auth-rules" aria-hidden="true"></div>
      <div class="auth-copy">
        <div class="auth-top" aria-hidden="true"><div class="auth-holes"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"></div><div class="auth-margin"><i></i><i></i></div></div>
        <p class="auth-label rv"><span class="pen">welcome back</span></p>
        <div class="auth-title"><h1 id="authT" data-lines>Log <i>in</i></h1></div>
        <p class="auth-lead rv">Your briefs, drafts, files and invoices are all in your account.</p>
        <form id="loginForm" novalidate>
          <div class="auth-fields rv-kids">
            <label class="field"><span class="fl">Email</span><input type="email" name="email" value="john@example.com" data-rule="email" autocomplete="email"><span class="fe">Enter a valid email</span></label>
            <label class="field pw"><span class="fl">Password</span><input type="password" name="password" value="johnsmith1" data-rule="password" autocomplete="current-password"><button type="button" class="eye" aria-label="Show password" aria-pressed="false"></button><span class="fe">At least 8 characters</span></label>
          </div>
          <div class="auth-actions rv-kids">
            <a class="btn btn-white" href="sign-up.php" data-keep-next>Create an account</a>
            <button class="btn btn-navy" type="submit">Log in</button>
          </div>
        </form>
        <p class="auth-link rv"><a class="tlink" href="forgot-password.php">Forgotten password?</a></p>
      </div>
    </div>
  </section>
<?php include 'includes/footer.php'; ?>