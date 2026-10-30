<?php include 'includes/header.php'; ?>

<section class="ord-top under-nav" aria-labelledby="cfgTitle">
    <div class="ink-bg">
      <div class="wrap ord-hero">
        <p class="crumbs rv" id="cfgCrumbs"><a href="services.php">Services</a>  /  <a href="corporate-content.php" id="cfgCat">Corporate content</a>  /  <span id="cfgCrumbS">Article content</span></p>
        <h1 class="ptitle" id="cfgTitle" data-lines>Configure <i>article content</i></h1>
        <div class="osteps rv" aria-label="Order steps">
          <span class="ostep" aria-current="step"><b>1</b><span>Configure</span></span><i class="ojoint"></i>
          <span class="ostep"><b>2</b><span>Brief</span></span><i class="ojoint"></i>
          <span class="ostep"><b>3</b><span>Basket</span></span><i class="ojoint"></i>
          <span class="ostep"><b>4</b><span>Checkout</span></span>
        </div>
        <p class="ostep-m rv">Step 1 of 4: Configure</p>
      </div>
    </div>
  </section>

<section class="ord-band cfg-band" aria-label="Order slip">
    <div class="wrap">
      <form class="cfg-sheet prop" id="cfgForm" novalidate="">
        <div class="cfg-head">
          <p class="cap" id="cfgSlip">ORDER SLIP  ·  ARTICLE CONTENT</p>
          <p>Tap a red word to change it and type the required words.</p>
        </div>
        <p class="cfg-sent" id="cfgSent"><span>I</span><span>need</span><button type="button" class="cfg-blank" data-k="qty" aria-haspopup="listbox" aria-expanded="false" aria-label="Quantity"><span class="cfg-v">1</span><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6.4 10.4 16 20l9.6-9.6"></path></svg></button><span id="cfgNoun">article</span><span class="cfg-grp"><span>of</span><label class="cfg-blank cfg-in"><span class="cfg-iw" id="cfgIw" data-v="1,500"><input id="cfgLen" type="text" size="1" inputmode="numeric" pattern="[0-9,]*" autocomplete="off" enterkeyhint="done" aria-label="Length in words" aria-describedby="cfgHelp"></span></label><span>words</span></span><span class="cfg-grp"><span>by</span><span id="cfgArt">a</span></span><button type="button" class="cfg-blank" data-k="grade" aria-haspopup="listbox" aria-expanded="false" aria-label="Writer grade"><span class="cfg-v">Premium</span><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6.4 10.4 16 20l9.6-9.6"></path></svg></button><span>writer,</span><span class="cfg-grp"><span>back</span><span>in</span></span><button type="button" class="cfg-blank" data-k="turn" aria-haspopup="listbox" aria-expanded="false" aria-label="Turnaround"><span class="cfg-v">5 to 7 days</span><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6.4 10.4 16 20l9.6-9.6"></path></svg></button><span class="cfg-grp"><span>with</span><button type="button" class="cfg-blank" data-k="img" aria-haspopup="listbox" aria-expanded="false" aria-label="Images"><span class="cfg-v">1</span><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6.4 10.4 16 20l9.6-9.6"></path></svg></button><span id="cfgImgW">image.</span></span></p>
        <p class="cfg-help" id="cfgHelp" hidden="">Type a length from 20 to 10,000 words.</p>
        <div class="cfg-foot">
          <i></i>
          <div class="cfg-tn">
            <div class="cfg-total" aria-live="polite"><span>Total</span><strong id="cfgTotal">$198.00</strong></div>
            <div class="cfg-bn">
              <p class="cfg-why" id="cfgWhy"><span>$132.00 for 1,500 words, plus $66.00 for a Premium writer.</span> <span>Standard turnaround and one image are included.</span></p>
              <button class="btn btn-navy btn-block" type="submit"><i class="ink"></i><span class="roll"><span>Next: write the brief</span><span aria-hidden="true">Next: write the brief</span></span></button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
<?php include 'includes/footer.php'; ?>