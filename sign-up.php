<?php include 'includes/header.php'; ?>
 <section class="auth-paper under-nav" aria-labelledby="authT">
    <div class="auth-body">
      <div class="auth-side" aria-hidden="true"><div class="auth-holes"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"></div><div class="auth-margin"><i></i><i></i></div></div>
      <div class="auth-rules" aria-hidden="true"></div>
      <div class="auth-copy">
        <div class="auth-top" aria-hidden="true"><div class="auth-holes"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"></div><div class="auth-margin"><i></i><i></i></div></div>
        <p class="auth-label rv"><span class="pen">new here</span></p>
        <div class="auth-title"><h1 id="authT" data-lines>Create an<i> account</i></h1></div>
        <p class="auth-lead rv">Free to open. You only pay when you order a piece.</p>
        <form id="signupForm" novalidate>
          <div class="auth-fields rv-kids">
            <label class="field"><span class="fl">Full name</span><input type="text" name="name" value="John Smith" data-rule="required" autocomplete="name"><span class="fe">Enter your name</span></label>
            <label class="field"><span class="fl">Email</span><input type="email" name="email" value="john@example.com" data-rule="email" autocomplete="email"><span class="fe">Enter a valid email</span></label>
            <label class="field"><span class="fl">Date of birth</span><input type="text" name="dob" value="14 / 03 / 1988" data-rule="required" autocomplete="bday" inputmode="numeric" placeholder="DD / MM / YYYY"><span class="fe">Enter your date of birth</span></label>
            <label class="field pw"><span class="fl">Password</span><input type="password" name="password" value="johnsmith1" data-rule="password" autocomplete="new-password"><button type="button" class="eye" aria-label="Show password" aria-pressed="false"></button><span class="fe">At least 8 characters</span></label>
            <label class="consent"><input type="checkbox" name="consent" data-rule="checked"><span class="cb"><svg viewBox="0 0 20 18"><path d="M3 10c2 1.5 3.4 3 4.6 5 2.6-5 6-8.6 10.4-11.5"/></svg></span><span>I agree to the <a href="terms.php">Terms</a> and the <a href="privacy.php">Privacy policy</a>.</span></label>
            <div class="captcha" data-rule="captcha" tabindex="0" role="checkbox" aria-checked="false" aria-label="I'm not a robot"><span class="cbx"><svg viewBox="0 0 32 32"><path d="M8 17l5 5 11-12" fill="none" stroke="#009e55" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="ct">I'm not a robot</span><span class="cl"><svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="11" fill="none" stroke="#4a90e2" stroke-width="3"/></svg>reCAPTCHA</span></div>
          </div>
          <div class="auth-actions rv-kids">
            <a class="btn btn-white" href="log-in.php" data-keep-next>Back to log in</a>
            <button class="btn btn-navy" type="submit">Create account</button>
          </div>
        </form>
      </div>
    </div>
  </section>
<?php include 'includes/footer.php'; ?>