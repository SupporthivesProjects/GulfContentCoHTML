<?php include 'includes/header.php'; ?>
<section class="hero" id="hero">
  <div class="waffle" aria-hidden="true">
    <div class="wf" id="w0" style="left:-38px;top:15%"></div>
    <div class="wf" id="w1" style="left:35px;top:88%"></div>
    <div class="wf" id="w2" style="left:380px;top:94.5%"></div>
  </div>
  <div class="wrap">
    <div class="copy">
      <h1 class="h1"><span class="ln"><span>We take the</span></span><span class="ln"><span><i>waffle</i> out.</span></span></h1>
      <p class="lead rv">Blog posts, website copy, scripts and captions from writers who edit as hard as they write. You get copy that says something, in your voice.</p>
      <div class="btns rv">
        <a href="#" class="btn btn-navy"><i class="ink"></i><span class="roll"><span>Order content</span><span>Order content</span></span></a>
        <a href="#" class="btn btn-grey"><i class="ink"></i><span class="roll"><span>Write with us</span><span>Write with us</span></span></a>
      </div>
      <div class="start" aria-hidden="true">
        <svg viewBox="0 0 90 60"><path d="M84 44C62 58 30 52 14 20M14 20l-1 13M14 20l11 5" fill="none" stroke="#d7263d" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span class="pen"><span class="hw">start here</span></span>
      </div>
    </div>
    <div class="deskbox"><div class="desk">
      <div class="stack"><svg class="clip" viewBox="0 0 46 110" aria-hidden="true"><path d="M31 18V84c0 8-5 13-12 13S7 92 7 84V22c0-10 6-16 14-16s14 6 14 16v58c0 5-3 8-7 8s-7-3-7-8V28" fill="none" stroke="#9aa1ad" stroke-width="3" stroke-linecap="round"/></svg><div class="sheet s3"></div><div class="sheet s2"></div>
      <div class="paper">
        <span class="hole" style="top:17%"></span><span class="hole" style="top:47%"></span><span class="hole" style="top:77%"></span>
        <svg class="curl" viewBox="0 0 88 88" aria-hidden="true"><path d="M88 0v88H0Z" fill="#fafafa"/><path d="M88 0C76 34 46 66 0 88c30-4 58-12 70-24C82 50 88 26 88 0Z" fill="#e6e9ee"/><path d="M88 0C76 34 46 66 0 88" fill="none" stroke="rgba(27,32,51,.08)"/></svg>
        <div class="draft" id="draft">
          <div class="dh"><span>Homepage, draft one</span><span>Edited</span></div>
          <div class="edit" data-i="0"><p class="o"><span class="st">We are a leading provider of innovative, end to end solutions for forward thinking businesses.</span></p><p class="w"><span class="hw">We fix office Wi-Fi. Properly.</span></p></div>
          <div class="edit" data-i="1"><p class="o"><span class="st">Our passionate team leverages synergies to deliver best in class customer experiences.</span></p><p class="w"><span class="hw">Ask for help. We'll sort it.</span></p></div>
          <div class="edit" data-i="2"><p class="o"><span class="st">Reach out today to unlock your full potential.</span></p><p class="w"><span class="hw">Call us. We pick up.</span></p></div>
          <div class="tally"><span>Tap a line to edit it again</span><span class="pen"><span class="hw" id="tally">35 words to 16</span></span></div>
        </div>
      </div></div>
    </div></div>
  </div>
  <button class="cue" id="cue" aria-label="Scroll to the next section"><span class="pen"><span class="hw" id="cueT">keep reading</span></span><svg viewBox="0 0 24 44" aria-hidden="true"><path pathLength="1" d="M12 2c-1 12 1 24 0 38M4 31c3 3 6 6 8 10 2-4 5-7 8-10"/></svg></button>
</section>

<section class="edit-sec" id="editSec">
  <div class="edit-track" id="editTrack">
    <div class="edit-stick">
      <div class="wrap edit-grid">
        <div>
          <span class="lab">the edit</span>
          <h2 class="h2">What we cut, and what we <i>write instead</i></h2>
          <div class="count"><span class="num" id="wc">0</span><span class="pen" id="wcl">words</span></div>
          <div class="bar"><i id="wbar"></i></div>
        </div>
        <p class="para" id="para"></p>
      </div>
    </div>
  </div>
</section>

<section class="sec" id="svcSec">
  <div class="wrap">
    <div class="head rv">
      <div><span class="lab">contents</span><h2 class="h2">What we write,<br><i>and from what price</i></h2></div>
      <p class="lead">Every kind of copy we write, with its starting price. You set the length, the grade and the turnaround when you order.</p>
    </div>
    <div class="contents rv">
      <span class="pen margin-note">priced by the piece</span>
      <div class="cats" id="cats"></div>
      <div class="swipe" id="swipe" aria-hidden="true"><span class="sdots"><i class="on"></i><i></i><i></i><i></i></span><span>Swipe for all four categories</span></div>
    </div>
  </div>
  <div class="turn" id="turn" aria-hidden="true"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><defs><linearGradient id="flapG" x1="1" y1="1" x2=".45" y2=".45"><stop offset="0" stop-color="#e3e6ec"/><stop offset=".55" stop-color="#f6f7f9"/><stop offset="1" stop-color="#fafafa"/></linearGradient></defs><path class="under" d="M100 0V100H0Z"/><path class="flap" d="M100 0C86 38 52 70 0 100C34 92 66 82 80 66C94 50 100 26 100 0Z"/><path class="edge" d="M100 0C86 38 52 70 0 100"/></svg></div>
</section>

<!-- v1.8: pull the page is not in the Figma homepage. Kept hidden; remove the hidden attribute to restore it. -->
<section class="sec band" id="pullSec" hidden>
  <div class="wrap pricer">
    <div class="ctl rv">
      <div><span class="lab">pull the page</span><h2 class="h2">Price a piece <i>by its length</i></h2></div>
      <div><span class="k">What you need</span><div class="pick" id="pick"></div></div>
      <div><span class="k">Writer grade</span><div class="opts" id="gopts"></div></div>
      <div><span class="k">Turnaround</span><div class="opts two" id="topts"><button aria-pressed="true" data-t="0">Standard<small>5 to 7 days, included</small></button><button aria-pressed="false" data-t="1">Express<small>2 to 3 days, adds 25%</small></button></div></div>
    </div>
    <div class="rv">
      <div class="page-wrap" id="pageWrap">
        <div class="page2 p3" aria-hidden="true"></div><div class="page2" aria-hidden="true"></div>
        <div class="page" id="page">
          <div class="ph"><span id="pName">Example copy: Blog post</span><span id="pWords">1,200 words</span></div>
          <div class="lines" id="lines"></div>
          <div class="pull" id="pull" tabindex="0" role="slider" aria-label="Length in words">drag to lengthen</div>
        </div>
      </div>
      <div class="readout">
        <div class="lenbox"><label class="field" for="lenIn"><span class="fl">Or type a length</span><span class="fv"><input id="lenIn" type="text" inputmode="numeric" autocomplete="off" value="1,200"><span class="unit">words</span></span></label><p class="rt"><span id="rR">5 min</span> to read</p></div>
        <div class="tot"><small>Total</small><span class="pen" id="rP">$120</span></div>
      </div>
      <div style="margin-top:24px;display:flex;flex-direction:column;gap:8px;align-items:flex-start">
        <button class="btn btn-navy" id="addB"><i class="ink"></i><span class="roll"><span>Add to basket</span><span>Add to basket</span></span></button>
        <p class="added" id="added">In your basket. The brief comes next.</p>
      </div>
    </div>
  </div>
</section>

<section class="sec dark">
  <div class="wrap">
    <div class="head rv">
      <div><span class="lab">writer grades</span><h2 class="h2">Choose who writes it,<br><i>every grade edited</i></h2></div>
      <p class="lead">Every grade gets the same edit. The grade decides who writes it and how deep the research goes.</p>
    </div>
    <div class="cards" id="cards"></div>
  </div>
</section>

<section class="sec band">
  <div class="wrap">
    <div class="head rv">
      <div><span class="lab">one we did earlier</span><h2 class="h2">A press release, <i>before and after</i></h2></div>
      <p class="lead">A made up launch, written the way most releases are, then the way we would send it. Same news, less to read.</p>
    </div>
    <div class="ba">
      <div class="before rv" id="baB"><div class="k"><span>Before</span><span class="pen" id="bW"></span></div><p id="bT"></p></div>
      <div class="after rv wait" id="baA"><div class="k"><span>After</span><span class="pen" id="aW"></span></div><p id="aT"><span class="al">Dubai, UAE. Harbour Logistics now shows customers where every container is, by the hour, from the port to their door.</span> The tracking platform goes live for all customers on 2 November.</p></div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="head rv">
      <div><span class="lab">the order</span><h2 class="h2">How an order <i>works</i></h2></div>
      <p class="lead">You write the brief before you pay. Everything after checkout happens in your account: the draft, your changes and the finished files.</p>
    </div>
    <div class="list" id="list"><svg class="trail" aria-hidden="true"><path id="trail"/></svg>
      <div class="item"><span class="box"><svg viewBox="0 0 40 40"><rect x="3" y="5" width="32" height="31" rx="3" fill="none" stroke="#1b2033" stroke-width="1.5" transform="rotate(-2 19 20)"/><path class="tk" d="M8 21c4 3 6 6 8 10 5-11 12-19 22-27" fill="none" stroke="#d7263d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Pick the piece</h3><p>Choose what you need, then drag the page or type the exact length you want. The price updates as you go.</p></div>
      <div class="item"><span class="box"><svg viewBox="0 0 40 40"><rect x="3" y="5" width="32" height="31" rx="3" fill="none" stroke="#1b2033" stroke-width="1.5" transform="rotate(1.5 19 20)"/><path class="tk" d="M8 21c4 3 6 6 8 10 5-11 12-19 22-27" fill="none" stroke="#d7263d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Choose the writer</h3><p>Standard, Premium or Expert, then standard or express turnaround. You see the full price before you pay.</p></div>
      <div class="item"><span class="box"><svg viewBox="0 0 40 40"><rect x="3" y="5" width="32" height="31" rx="3" fill="none" stroke="#1b2033" stroke-width="1.5" transform="rotate(-1 19 20)"/><path class="tk" d="M8 21c4 3 6 6 8 10 5-11 12-19 22-27" fill="none" stroke="#d7263d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Send the brief</h3><p>A short form before checkout. Upload what you already have instead of retyping it, and tell us who it is for.</p></div>
      <div class="item"><span class="box"><svg viewBox="0 0 40 40"><rect x="3" y="5" width="32" height="31" rx="3" fill="none" stroke="#1b2033" stroke-width="1.5" transform="rotate(2 19 20)"/><path class="tk" d="M8 21c4 3 6 6 8 10 5-11 12-19 22-27" fill="none" stroke="#d7263d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>Read the draft</h3><p>It arrives in your account with two rounds of changes included, then the finished files are yours.</p></div>
    </div>
  </div>
</section>

<section class="sec band">
  <div class="wrap">
    <div class="join rv">
      <button class="sticky" id="sticky" aria-controls="jform" aria-expanded="false">Must enjoy deleting their own sentences.<span class="hint">Peel me off</span><span class="ear"></span></button>
      <div class="jform" id="jform"><span class="t">Good. Send us your best work.</span><form id="jf" novalidate><label class="field" for="jEmail"><span class="fl">Your email</span><span class="fv"><input id="jEmail" type="email" autocomplete="email" placeholder="you@example.com"></span></label><label class="field" for="jWhat"><span class="fl">What you write best</span><span class="fv"><input id="jWhat" type="text" placeholder="Tech, travel, food"></span></label><button class="btn btn-navy" type="submit"><i class="ink"></i><span class="roll"><span>Send me the test</span><span>Send me the test</span></span></button></form><span class="ok">Thanks. The test is on its way.</span></div>
      <div><span class="lab" style="color:var(--lred)">join us</span><h2 class="h2">Write for <i>Gulf Content Co.</i></h2><p class="lead">We work with specialist writers across the Gulf and beyond. Tell us what you write best and we will send a short paid test.</p></div>
      <a href="#" class="btn btn-red"><i class="ink"></i><span class="roll"><span>Apply to write</span><span>Apply to write</span></span></a>
    </div>
  </div>
</section>
<?php include 'includes/footer.php'; ?>