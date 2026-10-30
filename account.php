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
      <div class="acc-live" id="accLive" aria-label="Latest order">
        <div class="acc-live-h"><p class="cap rv in" id="accLiveRef" style="">GCC-2026-0148  ·  ordered 15 October 2026</p><h2 class="rv in" id="accLiveT" style="">Article content and three more</h2></div>
        <ol class="acc-track" id="accTrack"><li class="acc-stage done"><span class="acc-node-row"><span class="acc-node"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8l4 4 8-9" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span><span class="acc-line"></span></span><span class="acc-scopy"><span class="acc-sname">Brief received</span><span class="acc-snote">15 October</span></span></li><li class="acc-stage now" aria-current="step"><span class="acc-node-row"><span class="acc-node"></span><span class="acc-line"></span></span><span class="acc-scopy"><span class="acc-sname">Writing</span><span class="acc-snote pen">with your writer</span></span></li><li class="acc-stage "><span class="acc-node-row"><span class="acc-node"></span><span class="acc-line"></span></span><span class="acc-scopy"><span class="acc-sname">Editing</span><span class="acc-snote"></span></span></li><li class="acc-stage "><span class="acc-node-row"><span class="acc-node"></span><span class="acc-line"></span></span><span class="acc-scopy"><span class="acc-sname">Draft ready</span><span class="acc-snote">lands in Downloads</span></span></li></ol>
      </div>
      <div>
        <nav class="acc-links rv in" aria-label="Account" style=""><a href="account.php" aria-current="page">Overview</a><a href="account-downloads.php">Downloads</a><a href="account-invoices.php">Invoices</a><a href="account-details.php">Account details</a></nav>
        <div class="acc-menu rv">
          <div class="accmenu"><button class="accmenu-t" type="button" aria-expanded="false"><span><small>In your account</small><b>Overview</b></span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 6l4.5 4.5L12.5 6" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round"></path></svg></button><div class="accmenu-o"><a href="account.php" aria-current="page">Overview</a><a href="account-downloads.php">Downloads</a><a href="account-invoices.php">Invoices</a><a href="account-details.php">Account details</a></div></div>
        </div>
      </div>
    </div>
  </section>

  <section class="acc-body" aria-label="Overview">
    <div class="wrap">
      <div class="acc-cards" id="accCards"><article class="acc-card rv in" style=""><h2>Latest files</h2><div class="rule-red"></div><div class="acc-row"><span>Clinic pages for Seef.docx</span></div><div class="acc-row"><span>October launch posts.docx</span></div><a class="tlink red" href="account-downloads.php">All downloads</a></article><article class="acc-card rv in" style=""><h2>Latest invoice</h2><div class="rule-red"></div><div class="acc-row"><span>GCC-INV-2026-0148</span><span data-inv-total="GCC-2026-0148">$351.54</span></div><div class="acc-row"><span>Discount</span><span data-inv-disc="GCC-2026-0148">GULF10 minus $39.06</span></div><div class="acc-row"><span>Issued</span><span>15 October 2026</span></div><button type="button" class="tlink red" data-invoice="GCC-2026-0148">Download invoice</button></article><article class="acc-card rv in" style=""><h2>Account details</h2><div class="rule-red"></div><div class="acc-row"><span>John Smith</span></div><div class="acc-row"><span>Dubai, United Arab Emirates</span></div><a class="tlink red" href="account-details.php">Edit details</a></article></div>
    </div>
  </section>


<?php include 'includes/footer.php'; ?>