<?php
  $currentPage = basename($_SERVER['PHP_SELF']);
?>
<!doctype php>
<php lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gulfcontentco</title>
    <link rel="icon" type="image/svg+xml" href="./img/tg-icon.svg">
    <link rel="stylesheet" href="assets/devcss/mainBase.css">
  </head>
  <body>
  <div class="main-div">
    <header class="nav" id="nav">
        <div class="wrap">
          <a href="index.php" class="logo" aria-label="Gulf Content Co home">
            <span>Gulf Content</span>
            <span class="co">Co.</span>
            <svg viewBox="0 0 65 46" preserveAspectRatio="none" aria-hidden="true">
              <path d="M44 6C30 1 8 6 4 19c-4 14 16 23 33 22 16-1 26-9 24-20-2-9-15-14-28-14" fill="none" stroke="#d7263d" stroke-width="1.6" stroke-linecap="round"></path>
            </svg>
          </a>
          <nav class="links" aria-label="Main"><a href="services.php">Services<sup>1</sup><svg class="nring" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M8 22 C10 6 88 2 94 18 C99 34 20 40 6 26 C0 18 30 6 60 8"></path></svg></a><a href="join-us.php">Join us<sup>2</sup><svg class="nring" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M8 22 C10 6 88 2 94 18 C99 34 20 40 6 26 C0 18 30 6 60 8"></path></svg></a>
              <a href="our-story.php">About<sup>3</sup>
                <svg class="nring" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
                    <path pathLength="1" d="M8 22 C10 6 88 2 94 18 C99 34 20 40 6 26 C0 18 30 6 60 8"></path>
                </svg>
              </a>
              <a href="contact.php">Contact<sup>4</sup>
                <svg class="nring" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
                  <path pathLength="1" d="M8 22 C10 6 88 2 94 18 C99 34 20 40 6 26 C0 18 30 6 60 8"></path>
                </svg>
              </a>
            </nav>
            <div class="right">
                <div class="cur-wrap" id="curWrap">
                    <button class="cur" id="curBtn" aria-haspopup="true" aria-expanded="false" aria-label="Currency"><span id="curCode" data-cur-code="">USD</span>
                        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                            <path d="M3.5 5.5 7 9l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        <svg class="nring" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
                            <path pathLength="1" d="M8 22 C10 6 88 2 94 18 C99 34 20 40 6 26 C0 18 30 6 60 8"></path>
                        </svg>
                    </button>
                    <div class="cur-pop" id="curPop" role="menu">
                        <button data-c="USD" role="menuitemradio" aria-pressed="true"><span>USD</span><span>$</span></button>
                        <button data-c="BHD" role="menuitemradio" aria-pressed="false"><span>BHD</span><span>BHD</span></button>
                        <button data-c="AED" role="menuitemradio" aria-pressed="false"><span>AED</span><span>AED</span></button>
                    </div>
                </div>
                <a class="acct-ic" href="account.php" aria-label="Account">
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                        <circle cx="10" cy="6.8" r="3.3" fill="none" stroke="currentColor" stroke-width="1.5"></circle>
                        <path d="M3.6 17.2c.5-3.4 3.1-5.5 6.4-5.5s5.9 2.1 6.4 5.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                    </svg>
                </a>
                <a class="basket" id="basket" href="basket.php">
                  <span class="bk-w">Basket </span>(<span id="bn" data-basket-n="">0</span>)<svg class="nring" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M8 22 C10 6 88 2 94 18 C99 34 20 40 6 26 C0 18 30 6 60 8"></path></svg></a>
                <a href="log-in.php" class="login" data-acc-link="">Log in
                  <svg class="nring" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
                      <path pathLength="1" d="M8 22 C10 6 88 2 94 18 C99 34 20 40 6 26 C0 18 30 6 60 8"></path>
                  </svg>
                </a>
                <button class="menu" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="mmenu">
                    <svg class="i-m" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M4 7h16M4 12h16M4 17h11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
                    </svg>
                    <svg class="i-x" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
                    </svg>
                </button>
            </div>
        </div>
    </header> 
    <div class="header-menu">
      <div class="mmenu" id="mmenu" role="dialog" aria-modal="true" aria-label="Menu" aria-hidden="false">
        <div class="mm-pad">
          <span class="mm-hole" style="top:175px"></span>
          <span class="mm-hole" style="top:358px"></span>
          <span class="mm-hole" style="top:541px"></span>
          <p class="mm-where" style="transition-delay: 0.05s;">where to?</p>
          <a class="mm-link" href="services.php" style="transition-delay: 0.09s;">Services</a>
          <div class="mm-cats" style="transition-delay: 0.13s;">
            <a href="corporate-content.php">Corporate content</a>
            <a href="creative-writing.php">Creative writing</a>
            <a href="advertising.php">Advertising</a>
            <a href="social-media.php">Social media</a>
          </div>
          <a class="mm-link" href="join-us.php" style="transition-delay: 0.17s;">Join us</a>
          <a class="mm-link" href="our-story.php" style="transition-delay: 0.21s;">About</a>
          <a class="mm-link" href="contact.php" style="transition-delay: 0.25s;">Contact</a>
          <div class="mm-space" style="transition-delay: 0.29s;"></div>
          <div class="mm-foot" style="transition-delay: 0.33s;">
            <div class="mm-row">
              <a class="mm-acc" href="log-in.php" data-acc-link="">Log in</a>
              <div class="mm-cur" role="group" aria-label="Currency">
                <button data-c="USD" aria-pressed="true">USD</button>
                <i aria-hidden="true">·</i>
                <button data-c="BHD" aria-pressed="false">BHD</button>
                <i aria-hidden="true">·</i>
                <button data-c="AED" aria-pressed="false">AED</button>
              </div>
            </div>
            <a class="btn btn-navy btn-block" href="services.php">
              <i class="ink"></i>
              <span class="roll">
                <span>Order content</span>
                <span aria-hidden="true">Order content</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
<main  id="main">

  


  
  