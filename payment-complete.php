<?php include 'includes/header.php'; ?>
<div class="ink-bg pay-page under-nav pay-done">
  <section class="wrap pay-state" aria-labelledby="payTitle">
    <div class="pay-scraps" id="payScraps" aria-hidden="true"></div>
    <div class="pay-title">
      <div class="pay-copy">
        <h1 class="ptitle" id="payTitle" data-lines>Payment <i>complete</i></h1>
        <p class="lead rv">Your writers have the brief. Here is where it goes next.</p>
        <p class="pay-ref rv" id="payRef"></p>
      </div>
      <div class="pay-amt rv"><span class="cap">Amount paid</span><span class="pen" id="payAmt">$351.54</span></div>
    </div>
    <ol class="pay-jour" aria-label="Where your order is">
    <li class="pay-stage done" style="--i:0"><div class="pay-nrow"><span class="pay-node"><svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M2 8l4 4 8-9" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg></span><span class="pay-line"></span></div><h2>Payment</h2></li>
    <li class="pay-stage done" style="--i:1"><div class="pay-nrow"><span class="pay-node"><svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M2 8l4 4 8-9" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg></span><span class="pay-line"></span></div><h2>Brief received</h2></li>
    <li class="pay-stage now" style="--i:2"><div class="pay-nrow"><span class="pay-node"><svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><rect x="1.5" y="1.5" width="37" height="37" rx="18.5" fill="none" stroke="#47B147" stroke-width="3"/><circle cx="20" cy="20" r="7" fill="#47B147"/></svg></span><span class="pay-line"></span></div><h2>Writing</h2><p class="note">with your writer</p></li>
    <li class="pay-stage " style="--i:3"><div class="pay-nrow"><span class="pay-node"></span><span class="pay-line"></span></div><h2>Editing</h2></li>
    <li class="pay-stage " style="--i:4"><div class="pay-nrow"><span class="pay-node"></span></div><h2>Draft ready</h2></li>
    </ol>
    <div class="pay-acts rv">
      <a class="btn btn-red" href="account.php">Go to your account</a>
      <a class="btn btn-grey" id="payInv" href="account-invoices.php">Download invoice</a>
    </div>
  </section>
</div>

<?php include 'includes/footer.php'; ?>