<?php include 'includes/header.php'; ?>
<section class="con-hero under-nav" aria-labelledby="conTitle">
    <div class="wrap con-hero-row">
      <div class="con-hero-copy">
        <p class="con-lab rv">say it short</p>
        <h1 class="ptitle" id="conTitle" data-lines>Contact <i>us</i></h1>
        <p class="lead rv">A question about a piece, an order or working with us.</p>
      </div>
      <div class="con-env-box prop" aria-hidden="true">
        <div class="con-env">
          <svg class="con-flap" width="520" height="171" viewBox="0 0 520.821 171.524" fill="none" preserveAspectRatio="none"><path d="M0.410437 0.627727L260.41 170.628L520.41 0.627727" stroke-width="1.5" stroke="#DDE2E8"/></svg>
          <span class="con-stamp">GCC</span>
          <p class="con-addr">Gulf Content Co.<br>Hello inbox</p>
        </div>
      </div>
    </div>
  </section>

  <section class="isec band" aria-labelledby="msgT">
    <div class="wrap con-row">
      <form class="con-form rv" id="conForm" data-popup-on-send="sent" novalidate aria-labelledby="msgT">
        <h2 class="con-h" id="msgT">Send a message</h2>
        <div class="fgrid">
          <label class="field"><span class="fl">Full name</span><input name="name" autocomplete="name" placeholder="John Smith" data-rule="required"><span class="fe">Enter your name</span></label>
          <label class="field"><span class="fl">Email</span><input name="email" type="email" autocomplete="email" placeholder="john@example.com" data-rule="email"><span class="fe">Enter a valid email</span></label>
          <label class="field full"><span class="fl">Phone (optional)</span><input name="phone" type="tel" autocomplete="tel" placeholder="+971 50 123 4567" data-rule="phone" data-optional><span class="fe">Enter a valid phone number, or leave it blank</span></label>
          <label class="field full"><span class="fl">Message</span><textarea name="message" placeholder="I would like a quote for six product descriptions in English and Arabic." data-rule="required"></textarea><span class="fe">Write a short message</span></label>
        </div>
        <div class="con-checks">
          <label class="consent"><input type="checkbox" name="consent" data-rule="checked"><span class="cb"><svg viewBox="0 0 20 18"><path d="M3 10c2 1.5 3.4 3 4.6 5 2.6-5 6-8.6 10.4-11.5"/></svg></span><span>I agree to the <a href="terms.php">Terms</a> and the <a href="privacy.php">Privacy policy</a>.</span></label>
          <div class="captcha" data-rule="captcha" tabindex="0" role="checkbox" aria-checked="false" aria-label="I'm not a robot"><span class="cbx"><svg viewBox="0 0 32 32"><path d="M8 17l5 5 11-12" fill="none" stroke="#009e55" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="ct">I'm not a robot</span><span class="cl"><svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="11" fill="none" stroke="#4a90e2" stroke-width="3"/></svg>reCAPTCHA</span></div>
        </div>
        <button class="btn btn-navy" type="submit">Send message</button>
      </form>
      <!-- studio details are placeholders until the client confirms them -->
      <dl class="con-details rv-kids">
        <div><dt>Support email</dt><dd><a href="mailto:hello@gulfcontentco.com">hello@gulfcontentco.com</a></dd></div>
        <div><dt>Phone</dt><dd><a href="tel:+97140000000">+971 4 000 0000</a>, Sunday to Thursday, 9&nbsp;to&nbsp;6</dd></div>
        <div><dt>Studio</dt><dd>Office 000, Business Bay, Dubai, UAE</dd></div>
        <div><dt>Company</dt><dd>Gulf Content Co. L.L.C, licence no. 000000</dd></div>
      </dl>
    </div>
  </section>

  <section class="isec" aria-labelledby="qaT">
    <div class="wrap">
      <div class="shead">
        <div><p class="con-lab rv">before you write</p><h2 class="h2 rv" id="qaT">Quick <i>answers</i></h2></div>
        <p class="lead rv con-l480">Most order questions are answered in your account. Here is where to look.</p>
      </div>
      <div class="con-answers rv-kids">
        <div class="con-answer"><h3>Where is my draft?</h3><p>In your account, under the order, the moment your editor releases it. Signed off files then move to Downloads.</p></div>
        <div class="con-answer"><h3>How do I ask for changes?</h3><p>Reply to the draft email or open the order in your account. Two rounds are included.</p></div>
        <div class="con-answer"><h3>Where are my invoices?</h3><p>Every invoice sits in Invoices in your account, ready to download.</p></div>
        <div class="con-answer"><h3>Can I change a brief?</h3><p>Yes, before the writer starts. Open the order and edit the brief.</p></div>
      </div>
    </div>
  </section>


<?php include 'includes/footer.php'; ?>