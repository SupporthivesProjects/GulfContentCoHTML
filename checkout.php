<?php include 'includes/header.php'; ?>

<div  class="chk-page under-nav">
  <div class="chk-split">
    <section class="chk-work" aria-labelledby="chkBillT">
      <h2 class="rv in" id="chkBillT" style="">Billing details</h2>
      <form class="chk-bill rv in" id="chkForm" novalidate="" style="">
        <div class="fgrid">
          <label class="field">
            <span class="fl">Full name</span>
            <input name="name" autocomplete="name" data-rule="required">
            <span class="fe">Enter your full name</span>
          </label>
          <label class="field">
            <span class="fl">Email</span>
            <input name="email" type="email" autocomplete="email" data-rule="email">
            <span class="fe">Enter a valid email</span>
          </label>
          <label class="field">
            <span class="fl">Phone</span>
            <input name="phone" type="tel" autocomplete="tel" data-rule="phone">
            <span class="fe">Enter a phone number</span>
          </label>
          <label class="field">
            <span class="fl">Date of birth</span>
            <input name="dob" inputmode="numeric" autocomplete="bday" placeholder="DD / MM / YYYY" data-rule="required">
            <span class="fe">Enter your date of birth</span>
          </label>
          <label class="field sel">
            <span class="fl">Country</span>
            <select name="country" autocomplete="country-name">
              <option>United Arab Emirates</option>
              <option>Bahrain</option>
              <option>Kuwait</option>
              <option>Oman</option>
              <option>Qatar</option>
              <option>Saudi Arabia</option>
              <option>United Kingdom</option>
              <option>Other</option>
            </select>
          </label>
          <label class="field">
            <span class="fl">City</span>
            <input name="city" autocomplete="address-level2" data-rule="required">
            <span class="fe">Enter your city</span>
          </label>
          <label class="field">
            <span class="fl">Address</span>
            <input name="address" autocomplete="street-address" data-rule="required">
            <span class="fe">Enter your address</span>
          </label>
          <label class="field">
            <span class="fl">PO Box</span>
            <input name="pobox" autocomplete="postal-code" data-optional="">
            <span class="fe">Enter your PO Box</span>
          </label>
        </div>
        <div class="chk-disc">
          <label class="field">
            <span class="fl">Discount code</span>
            <input name="code" autocomplete="off" spellcheck="false">
            <span class="fe" id="chkCodeE">That code is not recognised</span>
          </label>
          <button type="button" class="btn btn-grey" id="chkApply">
            <i class="ink"></i>
            <span class="roll">
              <span>Applied</span>
              <span aria-hidden="true">Applied</span>
            </span>
          </button>
        </div>
        <div class="chk-cc">
          <label class="consent">
            <input type="checkbox" data-rule="checked">
            <span class="cb">
              <svg viewBox="0 0 20 18">
                <path d="M3 10c2 1.5 3.4 3 4.6 5 2.6-5 6-8.6 10.4-11.5"></path>
              </svg>
            </span>
            <span>I agree to the <a href="terms.php">Terms</a> and the <a href="privacy.php">Privacy policy</a>. </span>
          </label>
          <div class="captcha" data-rule="captcha" tabindex="0" role="checkbox" aria-checked="false" aria-label="I'm not a robot">
            <span class="cbx">
              <svg viewBox="0 0 32 32">
                <path d="M8 17l5 5 11-12" fill="none" stroke="#009e55" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </span>
            <span class="ct">I'm not a robot</span>
            <span class="cl">
              <svg viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="11" fill="none" stroke="#4a90e2" stroke-width="3"></circle>
              </svg>reCAPTCHA </span>
          </div>
        </div>
      </form>
      <button class="btn btn-navy btn-block rv" type="submit" form="chkForm">
        <i class="ink"></i>
        <span class="roll">
          <span>Continue to secure payment</span>
          <span aria-hidden="true">Continue to secure payment</span>
        </span>
      </button>
      <div class="chk-hand rv">
        <p>Card details go straight to our payment provider. We never see them.</p>
        <span class="pay">We take <span data-pay-marks="" style="display:flex;gap:8px">
            <svg class="pm" viewBox="0 0 48 32" role="img" aria-label="Visa">
              <rect x=".5" y=".5" width="47" height="31" rx="4" fill="#fff" stroke="rgba(27,32,51,.14)"></rect>
              <text x="24" y="20.5" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="13" font-weight="700" font-style="italic" fill="#1A1F71" letter-spacing=".5">VISA</text>
            </svg>
            <svg class="pm" viewBox="0 0 48 32" role="img" aria-label="Mastercard">
              <rect x=".5" y=".5" width="47" height="31" rx="4" fill="#fff" stroke="rgba(27,32,51,.14)"></rect>
              <circle cx="19.5" cy="16" r="8" fill="#EB001B"></circle>
              <circle cx="28.5" cy="16" r="8" fill="#F79E1B"></circle>
              <path d="M24 9.4a8 8 0 0 1 0 13.2 8 8 0 0 1 0-13.2z" fill="#FF5F00"></path>
            </svg>
          </span>
        </span>
      </div>
    </section>
    <section class="chk-sum ink-bg" aria-labelledby="chkTitle">
      <p class="lab rv in" style="">last step</p>
      <h1 class="ptitle done" id="chkTitle" data-lines=""><span class="wm"><span class="wi" style="--d: 0.1s;">Check</span></span><i><span class="wm"><span class="wi" style="--d: 0.1s;">out</span></span></i></h1>
      <div class="chk-lines" id="chkLines"><div class="chk-line rv in" style=""><div><h3>Article content</h3><p>1,500 words · Premium · Standard, 5 to 7 days · Quantity 1 · 1 image</p></div><strong>$198.00</strong></div><div class="chk-line rv in" style=""><div><h3>Content calendars</h3><p>500 words · Standard · Standard, 5 to 7 days · Quantity 1 · 1 image</p></div><strong>$20.00</strong></div></div>
      <div id="chkTotals" style="display:flex;flex-direction:column;gap:32px"><p class="ord-line rv"><span>Subtotal</span><span>$218.00</span></p><p class="ord-line chk-off rv"><span>GULF10, 10% off</span><span>−$21.80</span></p></div>
      <div class="chk-tot rv"><span class="cap">Total today</span><span class="pen" id="chkTotal">$196.20</span></div>
    </section>
  </div>
</div>
<?php include 'includes/footer.php'; ?>