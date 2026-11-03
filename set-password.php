<?php include 'includes/header.php'; ?>

<style>
.field input{
  color: var(--brand-navy, #1B2033);
  font-family: "Schibsted Grotesk";
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2b0bb03 (rahul)
section{
  max-width: 1920px;
  margin: auto;
}
<<<<<<< HEAD
=======
>>>>>>> eb7f1f3 (rahul)
=======
>>>>>>> 2b0bb03 (rahul)
</style>
<section class="auth-paper under-nav" aria-labelledby="authT">
    <div class="auth-body">
      <div class="auth-side" aria-hidden="true"><div class="auth-holes"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"></div><div class="auth-margin"><i></i><i></i></div></div>
      <div class="auth-rules" aria-hidden="true"></div>
      <div class="auth-copy">
        <div class="auth-top" aria-hidden="true"><div class="auth-holes"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"><img class="auth-hole" src="assets/img/auth-punch-hole.svg" width="28" height="28" alt="" decoding="async"></div><div class="auth-margin"><i></i><i></i></div></div>
        <p class="auth-label rv"><span class="pen">nearly done</span></p>
        <div class="auth-title"><h1 id="authT" data-lines>Set a <i>new password</i></h1></div>
        <p class="auth-lead rv">Choose a password you have not used here before.</p>
        <form id="setForm" novalidate>
          <div class="auth-fields rv-kids">
            <label class="field pw"><span class="fl">New password</span><input type="password" name="password" value="johnsmith2" data-rule="password" autocomplete="new-password" id="newPw"><button type="button" class="eye" aria-label="Show password" aria-pressed="false"></button><span class="fe">At least 8 characters</span></label>
            <label class="field pw"><span class="fl">Confirm new password</span><input type="password" name="confirm" value="johnsmith2" data-rule="match" autocomplete="new-password" data-match="#newPw"><button type="button" class="eye" aria-label="Show password" aria-pressed="false"></button><span class="fe">The passwords do not match</span></label>
          </div>
          <div class="auth-actions rv-kids">
            <a class="btn btn-white" href="log-in.php" data-keep-next>Back to log in</a>
            <button class="btn btn-navy" type="submit">Save new password</button>
          </div>
        </form>
      </div>
    </div>
  </section>
<?php include 'includes/footer.php'; ?>