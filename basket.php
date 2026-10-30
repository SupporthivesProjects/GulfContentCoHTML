<?php include 'includes/header.php'; ?>
<section class="bsk-hero under-nav">
    <div class="wrap"><h1 data-lines>Your basket</h1></div>
  </section>

  <section class="ord-band bsk-band" aria-label="Basket">
    <div class="wrap" id="bskRoot">
      <div class="bsk-row" id="bskFull" hidden>
        <div class="bsk-sheets" id="bskSheets"></div>
        <aside class="bsk-side" aria-labelledby="bskTotT">
          <div class="bsk-note prop">
            <h2 id="bskTotT">Your total</h2>
            <div id="bskLines" style="display:flex;flex-direction:column;gap:14px"></div>
            <div class="bsk-tot"><span class="cap">Total at checkout</span><span class="pen" id="bskTotal">$351.54</span></div>
            <a class="btn btn-navy btn-block" id="bskGo" href="checkout.php">Go to checkout</a>
            <a class="tlink" href="services.php">Continue browsing</a>
          </div>
        </aside>
      </div>
      <div class="bsk-empty rv" id="bskEmpty" hidden>
        <h2>Nothing in your basket yet.</h2>
        <a class="btn btn-navy" href="services.php">Browse services</a>
      </div>
    </div>
  </section>

<?php include 'includes/footer.php'; ?>