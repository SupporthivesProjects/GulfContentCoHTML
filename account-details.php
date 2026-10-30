<?php include 'includes/header.php'; ?>

  <section class="acc-hero ink-bg under-nav" aria-labelledby="accT">
    <div class="wrap">
      <div class="acc-title">
        <div class="acc-copy">
          <p class="pen rv in" style="">good to see you</p>
          <h1 id="accT" data-lines="" class="done"><span class="wm"><span class="wi" style="--d: 0.1s;">Your</span></span> <i><span class="wm"><span class="wi" style="--d: 0.1s;">account</span></span></i></h1>
          <p class="acc-who-m rv"><span data-acc-name="">John Smith</span><span class="acc-dot">·</span><span data-acc-email="">test@gmail.com</span><span class="acc-dot">·</span><a class="acc-out" href="index.php" data-signout="">Sign out</a></p>
        </div>
        <div class="acc-who rv in" style="">
          <b data-acc-name="">John Smith</b>
          <span><span data-acc-email="">test@gmail.com</span><span class="acc-dot">·</span><a class="acc-out" href="index.php" data-signout="">Sign out</a></span>
        </div>
      </div>
      <div>
        <nav class="acc-links rv in" aria-label="Account" style=""><a href="account.php">Overview</a><a href="account-downloads.php">Downloads</a><a href="account-invoices.php">Invoices</a><a href="account-details.php" aria-current="page">Account details</a></nav>
        <div class="acc-menu rv">
          <div class="accmenu"><button class="accmenu-t" type="button" aria-expanded="false"><span><small>In your account</small><b>Account details</b></span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 6l4.5 4.5L12.5 6" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round"></path></svg></button><div class="accmenu-o"><a href="account.php">Overview</a><a href="account-downloads.php">Downloads</a><a href="account-invoices.php">Invoices</a><a href="account-details.php" aria-current="page">Account details</a></div></div>
        </div>
      </div>
    </div>
  </section>

  <section class="acc-body" aria-label="Account details">
    <div class="wrap">
      <div class="acc-details">
        <form class="acc-panel p1 rv in" id="detailsForm" novalidate="" aria-labelledby="pdT" style="">
          <h2 id="pdT">Personal details</h2>
          <div class="acc-pair">
            <label class="field"><span class="fl">Full name</span><input name="name" autocomplete="name" data-rule="required"><span class="fe">Enter your name</span></label>
            <label class="field"><span class="fl">Email</span><input type="email" name="email" autocomplete="email" data-rule="email"><span class="fe">Enter a valid email</span></label>
          </div>
          <div class="acc-pair">
            <label class="field"><span class="fl">Phone</span><input type="tel" name="phone" autocomplete="tel" data-rule="phone"><span class="fe">Enter a phone number</span></label>
            <label class="field"><span class="fl">Date of birth</span><input name="dob" autocomplete="bday" inputmode="numeric" placeholder="DD / MM / YYYY" data-rule="required"><span class="fe">Enter your date of birth</span></label>
          </div>
          <h3>Billing address</h3>
          <div class="acc-pair">
            <label class="field"><span class="fl">Address</span><input name="address" autocomplete="street-address" data-rule="required"><span class="fe">Enter your address</span></label>
            <label class="field"><span class="fl">City</span><input name="city" autocomplete="address-level2" data-rule="required"><span class="fe">Enter your city</span></label>
          </div>
          <div class="acc-pair">
            <label class="field sel"><span class="fl">Country</span><select name="country" autocomplete="country-name"><option>United Arab Emirates</option><option>Bahrain</option><option>Saudi Arabia</option><option>Qatar</option><option>Kuwait</option><option>Oman</option></select></label>
            <label class="field"><span class="fl">PO Box</span><input name="pobox" autocomplete="postal-code" data-optional="" data-rule="required"><span class="fe">Enter your PO Box</span></label>
          </div>
          <button class="btn btn-navy" type="submit" style="--x: 58.1953125px; --y: 5.8671875px; --d: 382px;"><i class="ink"></i><span class="roll"><span>Save details</span><span aria-hidden="true">Save details</span></span></button>
        </form>
        <form class="acc-panel p2 rv in" id="pwForm" novalidate="" aria-labelledby="pwT" style="">
          <h2 id="pwT">Password</h2>
          <label class="field pw"><span class="fl">Current password</span><input type="password" name="current" value="johnsmith1" autocomplete="current-password" data-rule="password"><button type="button" class="eye" aria-label="Show password" aria-pressed="false"><svg class="i-on" viewBox="0 0 20 16" aria-hidden="true"><path d="M1.5 8C3.6 4.3 6.6 2.5 10 2.5s6.4 1.8 8.5 5.5c-2.1 3.7-5.1 5.5-8.5 5.5S3.6 11.7 1.5 8Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"></path><circle cx="10" cy="8" r="2.4" fill="currentColor"></circle></svg><svg class="i-off" viewBox="0 0 20 16" aria-hidden="true"><path d="M1.5 8C3.6 4.3 6.6 2.5 10 2.5s6.4 1.8 8.5 5.5c-2.1 3.7-5.1 5.5-8.5 5.5S3.6 11.7 1.5 8Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"></path><path d="M3 14.5 17 1.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"></path></svg></button><span class="fe">At least 8 characters</span></label>
          <label class="field pw"><span class="fl">New password</span><input type="password" name="password" id="accNewPw" value="johnsmith2" autocomplete="new-password" data-rule="password"><button type="button" class="eye" aria-label="Show password" aria-pressed="false"><svg class="i-on" viewBox="0 0 20 16" aria-hidden="true"><path d="M1.5 8C3.6 4.3 6.6 2.5 10 2.5s6.4 1.8 8.5 5.5c-2.1 3.7-5.1 5.5-8.5 5.5S3.6 11.7 1.5 8Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"></path><circle cx="10" cy="8" r="2.4" fill="currentColor"></circle></svg><svg class="i-off" viewBox="0 0 20 16" aria-hidden="true"><path d="M1.5 8C3.6 4.3 6.6 2.5 10 2.5s6.4 1.8 8.5 5.5c-2.1 3.7-5.1 5.5-8.5 5.5S3.6 11.7 1.5 8Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"></path><path d="M3 14.5 17 1.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"></path></svg></button><span class="fe">At least 8 characters</span></label>
          <label class="field pw"><span class="fl">Confirm new password</span><input type="password" name="confirm" value="johnsmith2" autocomplete="new-password" data-rule="match" data-match="#accNewPw"><button type="button" class="eye" aria-label="Show password" aria-pressed="false"><svg class="i-on" viewBox="0 0 20 16" aria-hidden="true"><path d="M1.5 8C3.6 4.3 6.6 2.5 10 2.5s6.4 1.8 8.5 5.5c-2.1 3.7-5.1 5.5-8.5 5.5S3.6 11.7 1.5 8Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"></path><circle cx="10" cy="8" r="2.4" fill="currentColor"></circle></svg><svg class="i-off" viewBox="0 0 20 16" aria-hidden="true"><path d="M1.5 8C3.6 4.3 6.6 2.5 10 2.5s6.4 1.8 8.5 5.5c-2.1 3.7-5.1 5.5-8.5 5.5S3.6 11.7 1.5 8Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"></path><path d="M3 14.5 17 1.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"></path></svg></button><span class="fe">The passwords do not match</span></label>
          <button class="btn btn-grey acc-btn" type="submit"><i class="ink"></i><span class="roll"><span>Update password</span><span aria-hidden="true">Update password</span></span></button>
        </form>
      </div>
    </div>
  </section>


<?php include 'includes/footer.php'; ?>