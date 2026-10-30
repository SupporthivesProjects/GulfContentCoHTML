<?php include 'includes/header.php'; ?>

  <main id="main">

  <section class="acc-hero ink-bg under-nav" aria-labelledby="accT">
    <div class="wrap">
      <div class="acc-title">
        <div class="acc-copy">
          <p class="pen rv">good to see you</p>
          <h1 id="accT" data-lines>Your <i>account</i></h1>
          <p class="acc-who-m rv"><span data-acc-name>John Smith</span><span class="acc-dot">&middot;</span><span data-acc-email>john@example.com</span><span class="acc-dot">&middot;</span><a class="acc-out" href="index.php" data-signout>Sign out</a></p>
        </div>
        <div class="acc-who rv">
          <b data-acc-name>John Smith</b>
          <span><span data-acc-email>john@example.com</span><span class="acc-dot">&middot;</span><a class="acc-out" href="index.php" data-signout>Sign out</a></span>
        </div>
      </div>
      <div>
        <nav class="acc-links rv" aria-label="Account"><a href="account.php">Overview</a><a href="account-downloads.php" aria-current="page">Downloads</a><a href="account-invoices.php">Invoices</a><a href="account-details.php">Account details</a></nav>
        <div class="acc-menu rv">
          <div class="accmenu"><button class="accmenu-t" type="button" aria-expanded="false"><span><small>In your account</small><b>Downloads</b></span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 6l4.5 4.5L12.5 6" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/></svg></button><div class="accmenu-o"><a href="account.php">Overview</a><a href="account-downloads.php" aria-current="page">Downloads</a><a href="account-invoices.php">Invoices</a><a href="account-details.php">Account details</a></div></div>
        </div>
      </div>
    </div>
  </section>

  <section class="acc-body" aria-label="Downloads">
    <div class="wrap">
      <div id="accDlv" style="display: contents;"><div class="acc-dlwrap"><p class="acc-lead rv in" style="">Finished files from paid orders. Each one stays here for as long as you keep the account.</p></div><div class="acc-table" role="table" aria-label="Downloads"><div class="acc-thead" role="row"><span class="acc-c1" role="columnheader">Order</span><span class="acc-c2" role="columnheader">Piece</span><span class="acc-c3" role="columnheader">Project</span><span class="acc-c4" role="columnheader">Delivered</span><span class="acc-c5" role="columnheader">File</span></div><div class="acc-tr rv in" role="row" style=""><span class="acc-c1" role="cell">GCC-2026-0131</span><span class="acc-c2 acc-piece" role="cell">Website content</span><span class="acc-c3" role="cell">Clinic pages for Seef</span><span class="acc-c4" role="cell">2 October 2026</span><span class="acc-c5" role="cell"><button type="button" class="btn btn-grey acc-btn" data-file="GCC-2026-0131" aria-label="Download Clinic pages for Seef.docx"><i class="ink"></i><span class="roll"><span>Download file</span><span aria-hidden="true">Download file</span></span></button></span></div><div class="acc-tr rv in" role="row" style=""><span class="acc-c1" role="cell">GCC-2026-0117</span><span class="acc-c2 acc-piece" role="cell">Captions and posts</span><span class="acc-c3" role="cell">October launch posts</span><span class="acc-c4" role="cell">18 September 2026</span><span class="acc-c5" role="cell"><button type="button" class="btn btn-grey acc-btn" data-file="GCC-2026-0117" aria-label="Download October launch posts.docx"><i class="ink"></i><span class="roll"><span>Download file</span><span aria-hidden="true">Download file</span></span></button></span></div><div class="acc-tr rv in" role="row" style=""><span class="acc-c1" role="cell">GCC-2026-0102</span><span class="acc-c2 acc-piece" role="cell">Product descriptions</span><span class="acc-c3" role="cell">Summer range</span><span class="acc-c4" role="cell">3 September 2026</span><span class="acc-c5" role="cell"><button type="button" class="btn btn-grey acc-btn" data-file="GCC-2026-0102" aria-label="Download Summer range.docx"><i class="ink"></i><span class="roll"><span>Download file</span><span aria-hidden="true">Download file</span></span></button></span></div></div></div>
    </div>
  </section>

</main>
<?php include 'includes/footer.php'; ?>