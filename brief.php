<?php include 'includes/header.php'; ?>

  <section class="ord-top under-nav brief_sec" aria-labelledby="brfTitle">
    <div class="ink-bg">
      <div class="wrap ord-hero acc_wrap">
        <p class="crumbs rv"><span id="brfCrumbS">Article content</span>  /  Brief</p>
        <h1 class="ptitle" id="brfTitle" data-lines>Your <i>brief</i></h1>
        <div class="osteps rv" aria-label="Order steps">
          <span class="ostep done"><b><svg viewBox="0 0 15 14" aria-hidden="true"><path d="M2 8l4 4 8-9" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg></b><span>Configure</span></span><i class="ojoint"></i>
          <span class="ostep" aria-current="step"><b>2</b><span>Brief</span></span><i class="ojoint"></i>
          <span class="ostep"><b>3</b><span>Basket</span></span><i class="ojoint"></i>
          <span class="ostep"><b>4</b><span>Checkout</span></span>
        </div>
        <p class="ostep-m rv">Step 2 of 4: Brief</p>
      </div>
    </div>
  </section>

  <section class="ord-band brf-band brief_brf_band" aria-label="Brief">
    <div class="wrap acc_wrap">
      <form class="brf-row" id="brfForm" novalidate>
        <div class="brf-form">
          <ul class="nav brief_tab_nav nav-tabs" id="myTab" role="tablist">
          <div class="brf-type rv" role="radiogroup" aria-label="Brief type">
            <li class="nav-item" role="presentation">
            <button type="button" class="opt nav-link active" role="radio" data-mode="detailed"  id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true"><span><b>Detailed brief</b><small>Voice, audience and the details</small></span></button>
            </li>
            <li class="nav-item" role="presentation">
            <button type="button" class="opt nav-link" role="radio" data-mode="quick" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false"><span><b>Quick brief</b><small>The piece and a few notes</small></span></button>
            </li>
          </div>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane  fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
              <div class="brief_tab_pane">
                <fieldset class="brf-panel rv">
                <h2><i>01</i>The piece</h2>
                <div class="fgrid">
                  <label class="field"><span class="fl">Project title</span><input name="title" class="brief_brf_textarea" autocomplete="off" placeholder="Why the Gulf reads in two languages" data-rule="required"><span class="fe">Give the piece a working title</span></label>
                  <label class="field"><span class="fl">Subject</span><input name="subject" autocomplete="off" placeholder="Bilingual brands in the Gulf" data-rule="required"><span class="fe">Tell us what it is about</span></label>
                  <label class="field brief_field"><span class="fl">Brand name (optional)</span><input name="brand" autocomplete="organization" placeholder="Harbour Logistics"></label>
                  <label class="field"><span class="fl">Reference link</span><input name="link" type="text" inputmode="url" autocomplete="url" placeholder="harbourlogistics.example"></label>
                </div>
                <label class="upload"><span class="fl">Upload documents</span><span class="ut">Click to upload or drag and drop</span><span class="us">PDF, DOCX or TXT, up to 20MB</span><span class="uf" id="brfFiles"></span><input type="file" name="files" multiple accept=".pdf,.docx,.txt"></label>
              </fieldset>

              <fieldset class="brf-panel rv" id="brfVoice">
                <h2><i>02</i>Voice and audience</h2>
                <div class="brf-groups">
                  <fieldset class="brf-group" data-group="voice"><legend>Preferred voice</legend><div class="brf-pills">
                    <button type="button" class="pill" aria-pressed="false">1st person</button><button type="button" class="pill" aria-pressed="true">2nd person</button><button type="button" class="pill" aria-pressed="false">3rd person</button></div></fieldset>
                  <fieldset class="brf-group" data-group="style"><legend>Writing style</legend><div class="brf-pills">
                    <button type="button" class="pill" aria-pressed="false">Educational</button><button type="button" class="pill" aria-pressed="false">Formal</button><button type="button" class="pill" aria-pressed="true">Conversational</button></div></fieldset>
                </div>
                <fieldset class="brf-group" data-group="audience"><legend>Audience</legend><div class="brf-pills fill">
                  <button type="button" class="pill" aria-pressed="false">Consumers</button><button type="button" class="pill" aria-pressed="true">Businesses</button><button type="button" class="pill" aria-pressed="false">Other</button></div></fieldset>
              </fieldset>

              <fieldset class="brf-panel rv">
                <h2><i id="brfN3">03</i>Anything else</h2>
                <label class="field"><span class="fl">Message</span><textarea class="brief_brf_textarea" name="notes" placeholder="Anything the writer should know"></textarea></label>
              </fieldset>
              </div>
            </div>
            <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
              <div class="brief_tab_pane">
                <fieldset class="brf-panel rv">
                <h2><i>01</i>The piece</h2>
                <div class="fgrid">
                  <label class="field"><span class="fl">Project title</span><input name="title" autocomplete="off" placeholder="Why the Gulf reads in two languages" data-rule="required"><span class="fe">Give the piece a working title</span></label>
                  <label class="field"><span class="fl">Subject</span><input name="subject" autocomplete="off" placeholder="Bilingual brands in the Gulf" data-rule="required"><span class="fe">Tell us what it is about</span></label>
                  <label class="field"><span class="fl">Brand name (optional)</span><input name="brand" autocomplete="organization" placeholder="Harbour Logistics"></label>
                  <label class="field"><span class="fl">Reference link</span><input name="link" type="text" inputmode="url" autocomplete="url" placeholder="harbourlogistics.example"></label>
                </div>
                <label class="upload"><span class="fl">Upload documents</span><span class="ut">Click to upload or drag and drop</span><span class="us">PDF, DOCX or TXT, up to 20MB</span><span class="uf" id="brfFiles"></span><input type="file" name="files" multiple accept=".pdf,.docx,.txt"></label>
              </fieldset>

              <fieldset class="brf-panel rv">
                <h2><i id="brfN3">03</i>Anything else</h2>
                <label class="field"><span class="fl">Message</span><textarea class="brief_brf_textarea" name="notes" placeholder="Anything the writer should know"></textarea></label>
              </fieldset>
              </div>
            </div>
          </div>
          <div class="brf-ccslot" id="brfCcM"></div>
        </div>
        <div class="mobile_none_sk">
            <div class="brf-ccslot" id="brfCcD">
              <div class="brf-cc" id="brfCc">
                <label class="consent"><input type="checkbox" data-rule="checked"><span class="cb"><svg viewBox="0 0 20 18"><path d="M3 10c2 1.5 3.4 3 4.6 5 2.6-5 6-8.6 10.4-11.5"/></svg></span><span>I agree to the <a href="terms.php">Terms</a> and the <a href="privacy.php">Privacy policy</a>.</span></label>
                <div class="captcha" data-rule="captcha" tabindex="0" role="checkbox" aria-checked="false" aria-label="I'm not a robot"><span class="cbx"><svg viewBox="0 0 32 32"><path d="M8 17l5 5 11-12" fill="none" stroke="#009e55" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="ct">I'm not a robot</span><span class="cl"><svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="11" fill="none" stroke="#4a90e2" stroke-width="3"/></svg>reCAPTCHA</span></div>
              </div>
            </div>
          </div>

        <aside class="brf-sum prop" aria-label="Basket summary">
          <p class="lab brief_basket">Basket</p>
          <h3 id="brfSvc" class="brief_ac_">Article content</h3>
          <p class="brf-q" id="brfQ">“Why the Gulf reads in two languages”</p>
          <div class="ord-rule"></div>
          <div id="brfLines" class="breif_brf_out">
            <div class="breif_brf_inner">
              <p class="brief_brf_p">1,500 words at $44 per 500</p>
              <p class="brief_brf_p2">$132.00</p>
            </div>
            <div class="breif_brf_inner">
              <p class="brief_brf_p">Premium writer, adds 50%</p>
              <p class="brief_brf_p2">$66.00</p>
            </div>
            <div class="breif_brf_inner">
              <p class="brief_brf_p">Standard turnaround, 5 to 7 days</p>
              <p class="brief_brf_p2">Included</p>
            </div>
            <div class="breif_brf_inner">
              <p class="brief_brf_p">Quantity</p>
              <p class="brief_brf_p2">1</p>
            </div>
            <div class="breif_brf_inner">
              <p class="brief_brf_p">Images</p>
              <p class="brief_brf_p2">1 included</p>
            </div>
          </div>
          <div class="ord-rule navy"></div>
          <div class="brf-tot"><span class="cap">Total</span><span class="pen brief_total" id="brfTotal">$198.00</span></div>
          <div class="desk_none_sk">
            <div class="brf-ccslot" id="brfCcD">
              <div class="brf-cc" id="brfCc">
                <label class="consent"><input type="checkbox" data-rule="checked"><span class="cb"><svg viewBox="0 0 20 18"><path d="M3 10c2 1.5 3.4 3 4.6 5 2.6-5 6-8.6 10.4-11.5"/></svg></span><span>I agree to the <a href="terms.php">Terms</a> and the <a href="privacy.php">Privacy policy</a>.</span></label>
                <div class="captcha" data-rule="captcha" tabindex="0" role="checkbox" aria-checked="false" aria-label="I'm not a robot"><span class="cbx"><svg viewBox="0 0 32 32"><path d="M8 17l5 5 11-12" fill="none" stroke="#009e55" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="ct">I'm not a robot</span><span class="cl"><svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="11" fill="none" stroke="#4a90e2" stroke-width="3"/></svg>reCAPTCHA</span></div>
              </div>
            </div>
          </div>
          <div class="brf-acts">
            <button class="btn btn-navy btn-block" type="submit" id="brfAdd">Add to basket</button>
            <a class="btn btn-grey btn-block" id="brfBack" href="configure.php">Back to configure</a>
          </div>
        </aside>
      </form>
    </div>
  </section>

<?php include 'includes/footer.php'; ?>