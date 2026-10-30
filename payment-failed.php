<?php include 'includes/header.php'; ?>
<div class="ink-bg pay-page under-nav pay-failed">
  <section class="wrap pay-state" aria-labelledby="payTitle">
    <div class="pay-crumps" aria-hidden="true"><svg class="pay-crump" style="left:63%;top:72px;rotate:20deg;--d:.5s" viewBox="0 0 90 80" aria-hidden="true"><g opacity=".85"><path d="M8 20 30 6l22 8 26-6 6 26-10 22 6 18-30-4-22 6-18-14-6-22 4-20Z" fill="#fff" stroke="#D3D8E1" stroke-width="2"/><path d="m20 24 26 16-16 18M52 20l8 26 12-16" fill="none" stroke="#D3D8E1" stroke-width="2"/></g></svg><svg class="pay-crump" style="left:74%;top:126px;rotate:-5deg;--d:.75s" viewBox="0 0 90 80" aria-hidden="true"><g opacity=".85"><path d="M8 20 30 6l22 8 26-6 6 26-10 22 6 18-30-4-22 6-18-14-6-22 4-20Z" fill="#fff" stroke="#D3D8E1" stroke-width="2"/><path d="m20 24 26 16-16 18M52 20l8 26 12-16" fill="none" stroke="#D3D8E1" stroke-width="2"/></g></svg><svg class="pay-crump" style="left:83%;top:32px;rotate:-30deg;--d:1s" viewBox="0 0 90 80" aria-hidden="true"><g opacity=".85"><path d="M8 20 30 6l22 8 26-6 6 26-10 22 6 18-30-4-22 6-18-14-6-22 4-20Z" fill="#fff" stroke="#D3D8E1" stroke-width="2"/><path d="m20 24 26 16-16 18M52 20l8 26 12-16" fill="none" stroke="#D3D8E1" stroke-width="2"/></g></svg></div>
    <div class="pay-title">
      <div class="pay-copy">
        <h1 class="ptitle" id="payTitle" data-lines>Payment <i>not completed</i></h1>
        <p class="lead rv">Nothing was taken from your card. Your order is paused at payment.</p>
        <p class="pay-ref rv" id="payRef"></p>
      </div>
      <div class="pay-amt rv"><span class="cap">Order total</span><span class="pen" id="payAmt">$351.54</span></div>
    </div>
    <ol class="pay-jour" aria-label="Where your order is">
    <li class="pay-stage fail" style="--i:0"><div class="pay-nrow"><span class="pay-node"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M3 3l5 5m0 0 5 5m-5-5 5-5m-5 5-5 5" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg></span><span class="pay-line"></span></div><h2>Payment</h2><p class="note">try again below</p></li>
    <li class="pay-stage " style="--i:1"><div class="pay-nrow"><span class="pay-node"></span><span class="pay-line"></span></div><h2>Brief received</h2></li>
    <li class="pay-stage " style="--i:2"><div class="pay-nrow"><span class="pay-node"></span><span class="pay-line"></span></div><h2>Writing</h2></li>
    <li class="pay-stage " style="--i:3"><div class="pay-nrow"><span class="pay-node"></span><span class="pay-line"></span></div><h2>Editing</h2></li>
    <li class="pay-stage " style="--i:4"><div class="pay-nrow"><span class="pay-node"></span></div><h2>Draft ready</h2></li>
    </ol>
    <div class="pay-acts rv">
      <button class="btn btn-red" type="button" id="payRetry">Try payment again</button>
      <a class="btn btn-grey" href="checkout.html">Back to checkout</a>
    </div>
  </section>
</div>

<?php include 'includes/footer.php'; ?>