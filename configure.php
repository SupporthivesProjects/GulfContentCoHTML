<?php include 'includes/header.php'; ?>
<section class="ord-top under-nav" aria-labelledby="cfgTitle">
    <div class="ink-bg">
        <div class="wrap ord-hero">
            <p class="crumbs rv" id="cfgCrumbs">
                <a href="services.php">Services</a> / <a href="corporate-content.php" id="cfgCat">Corporate content</a>
                / <span id="cfgCrumbS">Article content</span>
            </p>
            <h1 class="ptitle" id="cfgTitle" data-lines>Configure <i>article content</i>
            </h1>
            <div class="osteps rv" aria-label="Order steps">
                <span class="ostep" aria-current="step">
                    <b>1</b>
                    <span>Configure</span>
                </span>
                <i class="ojoint"></i>
                <span class="ostep">
                    <b>2</b>
                    <span>Brief</span>
                </span>
                <i class="ojoint"></i>
                <span class="ostep">
                    <b>3</b>
                    <span>Basket</span>
                </span>
                <i class="ojoint"></i>
                <span class="ostep">
                    <b>4</b>
                    <span>Checkout</span>
                </span>
            </div>
            <p class="ostep-m rv">Step 1 of 4: Configure</p>
        </div>
    </div>
</section>
<section class="ord-band cfg-band" aria-label="Order slip">
    <div class="wrap">
        <form class="cfg-sheet prop" id="cfgForm" novalidate>
            <div class="cfg-head">
                <p class="cap" id="cfgSlip">ORDER SLIP · ARTICLE CONTENT</p>
                <p>Tap a red word to change it and type the required words.</p>
            </div>
            <p class="cfg-sent" id="cfgSent">
                <span>I</span>
                <span>need</span>
                <span class="qty-dropdown">
                    <button type="button" class="cfg-blank" data-k="qty" aria-haspopup="listbox" aria-expanded="false"
                        aria-label="Quantity">
                        <span class="cfg-v">1</span>
                        <svg viewBox="0 0 32 32" aria-hidden="true">
                            <path d="M6.4 10.4 16 20l9.6-9.6"></path>
                        </svg>
                    </button>
                    <span class="qty-dropdown-overlay"></span>
                    <span class="qty-dropdown-panel">
                        <span class="qty-dropdown-handle"></span>
                        <span class="qty-dropdown-title">Quantity</span>
                        <span class="qty-dropdown-list" role="listbox" aria-label="Quantity">
                            <button type="button" class="qty-dropdown-option" role="option" aria-selected="true"
                                data-qty="1">
                                <span class="qty-dropdown-check">
                                    <svg viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                                    </svg>
                                </span>
                                <span>1 article</span>
                            </button>
                            <button type="button" class="qty-dropdown-option" role="option" aria-selected="false"
                                data-qty="2">
                                <span class="qty-dropdown-check">
                                    <svg viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                                    </svg>
                                </span>
                                <span>2 articles</span>
                            </button>
                            <button type="button" class="qty-dropdown-option" role="option" aria-selected="false"
                                data-qty="3">
                                <span class="qty-dropdown-check">
                                    <svg viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                                    </svg>
                                </span>
                                <span>3 articles</span>
                            </button>
                            <button type="button" class="qty-dropdown-option" role="option" aria-selected="false"
                                data-qty="4">
                                <span class="qty-dropdown-check">
                                    <svg viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                                    </svg>
                                </span>
                                <span>4 articles</span>
                            </button>
                            <button type="button" class="qty-dropdown-option" role="option" aria-selected="false"
                                data-qty="5">
                                <span class="qty-dropdown-check">
                                    <svg viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                                    </svg>
                                </span>
                                <span>5 articles</span>
                            </button>
                            <button type="button" class="qty-dropdown-option" role="option" aria-selected="false"
                                data-qty="6">
                                <span class="qty-dropdown-check">
                                    <svg viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                                    </svg>
                                </span>
                                <span>6 articles</span>
                            </button>
                            <button type="button" class="qty-dropdown-option" role="option" aria-selected="false"
                                data-qty="7">
                                <span class="qty-dropdown-check">
                                    <svg viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                                    </svg>
                                </span>
                                <span>7 articles</span>
                            </button>
                            <button type="button" class="qty-dropdown-option" role="option" aria-selected="false"
                                data-qty="8">
                                <span class="qty-dropdown-check">
                                    <svg viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                                    </svg>
                                </span>
                                <span>8 articles</span>
                            </button>
                        </span>
                    </span>
                </span>
                <span id="cfgNoun">article</span>
                <span class="cfg-grp">
                    <span>of</span>
                    <label class="cfg-blank cfg-in">
                        <span class="cfg-iw" id="cfgIw" data-v="1,500">
                            <input id="cfgLen" type="text" size="1" inputmode="numeric" pattern="[0-9,]*"
                                autocomplete="off" enterkeyhint="done" aria-label="Length in words"
                                aria-describedby="cfgHelp">
                        </span>
                    </label>
                    <span>words</span>
                </span>
                <span class="cfg-grp">
                    <span>by</span>
                    <span id="cfgArt">a</span>
                </span>
                <span class="grade-dropdown">
                    <button type="button" class="cfg-blank" data-k="grade" aria-haspopup="listbox" aria-expanded="false"
                        aria-label="Writer grade">
                        <span class="cfg-v">Premium</span>
                        <svg viewBox="0 0 32 32" aria-hidden="true">
                            <path d="M6.4 10.4 16 20l9.6-9.6"></path>
                        </svg>
                    </button>
                    <span class="grade-dropdown-overlay"></span>
                    <span class="grade-dropdown-panel">
                        <span class="grade-dropdown-handle"></span>
                        <span class="grade-dropdown-title">Writer grade</span>
                        <span class="grade-dropdown-list" role="listbox" aria-label="Writer grade">
                            <button type="button" class="grade-dropdown-option" role="option" aria-selected="false"
                                data-grade="Standard">
                                <span class="grade-dropdown-check">
                                    <svg viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                                    </svg>
                                </span>
                                <span class="grade-dropdown-name">Standard</span>
                                <span class="grade-dropdown-price">base price</span>
                            </button>
                            <button type="button" class="grade-dropdown-option grade-dropdown-selected" role="option"
                                aria-selected="true" data-grade="Premium">
                                <span class="grade-dropdown-check">
                                    <svg viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                                    </svg>
                                </span>
                                <span class="grade-dropdown-name">Premium</span>
                                <span class="grade-dropdown-price">adds 50%</span>
                            </button>
                            <button type="button" class="grade-dropdown-option" role="option" aria-selected="false"
                                data-grade="Expert">
                                <span class="grade-dropdown-check">
                                    <svg viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                                    </svg>
                                </span>
                                <span class="grade-dropdown-name">Expert</span>
                                <span class="grade-dropdown-price">adds 120%</span>
                            </button>
                        </span>
                    </span>
                </span>
                <span>writer,</span>
                <span class="cfg-grp">
                    <span>back</span>
                    <span>in</span>
                </span>

                <!-- <button type="button" class="cfg-blank" data-k="turn" aria-haspopup="listbox" aria-expanded="false"
                    aria-label="Turnaround">
                    <span class="cfg-v">5 to 7 days</span>
                    <svg viewBox="0 0 32 32" aria-hidden="true">
                        <path d="M6.4 10.4 16 20l9.6-9.6"></path>
                    </svg>
                </button> -->

                
<span class="grade-dropdown">
    <button
        type="button"
        class="cfg-blank"
        data-k="grade"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-label="Writer grade"
    >
        <span class="cfg-v">5 to 7 days</span>
        <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M6.4 10.4 16 20l9.6-9.6"></path>
        </svg>
    </button>

    <span class="grade-dropdown-overlay"></span>

    <span class="grade-dropdown-panel">
        <span class="grade-dropdown-handle"></span>
        <span class="grade-dropdown-title">Writer grade</span>

        <span class="grade-dropdown-list"
              role="listbox"
              aria-label="Writer grade">

            <button type="button"
                    class="grade-dropdown-option"
                    role="option"
                    aria-selected="false"
                    data-grade="Standard">
                <span class="grade-dropdown-check">
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                    </svg>
                </span>
                <span class="grade-dropdown-name">Standard</span>
                <span class="grade-dropdown-price">base price</span>
            </button>

            <button type="button"
                    class="grade-dropdown-option grade-dropdown-selected"
                    role="option"
                    aria-selected="true"
                    data-grade="Premium">
                <span class="grade-dropdown-check">
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                    </svg>
                </span>
                <span class="grade-dropdown-name">Premium</span>
                <span class="grade-dropdown-price">adds 50%</span>
            </button>

            <button type="button"
                    class="grade-dropdown-option"
                    role="option"
                    aria-selected="false"
                    data-grade="Expert">
                <span class="grade-dropdown-check">
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                    </svg>
                </span>
                <span class="grade-dropdown-name">Expert</span>
                <span class="grade-dropdown-price">adds 120%</span>
            </button>

        </span>
    </span>
</span>

                <span class="cfg-grp">
                    <span>with</span>
                    <span class="qty-dropdown">
                    <button type="button" class="cfg-blank" data-k="qty" aria-haspopup="listbox" aria-expanded="false"
                        aria-label="Quantity">
                        <span class="cfg-v">1</span>
                        <svg viewBox="0 0 32 32" aria-hidden="true">
                            <path d="M6.4 10.4 16 20l9.6-9.6"></path>
                        </svg>
                    </button>
                    <span class="qty-dropdown-overlay"></span>
                    <span class="qty-dropdown-panel">
                        <span class="qty-dropdown-handle"></span>
                        <span class="qty-dropdown-title">Quantity</span>
                        <span class="qty-dropdown-list" role="listbox" aria-label="Quantity">
                            <button type="button" class="qty-dropdown-option" role="option" aria-selected="true"
                                data-qty="1">
                                <span class="qty-dropdown-check">
                                    <svg viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                                    </svg>
                                </span>
                                <span>1 image</span>
                                <span class="image-dropdown-price">Included</span>
                            </button>
                            <button type="button" class="qty-dropdown-option" role="option" aria-selected="false"
                                data-qty="2">
                                <span class="qty-dropdown-check">
                                    <svg viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                                    </svg>
                                </span>
                                <span>2 articles</span>
                                                                <span class="image-dropdown-price">adds $3.87 a piece</span>

                                
                            </button>
                            <button type="button" class="qty-dropdown-option" role="option" aria-selected="false"
                                data-qty="3">
                                <span class="qty-dropdown-check">
                                    <svg viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                                    </svg>
                                </span>
                                <span>3 image</span>
                                <span class="image-dropdown-price">adds $3.87 a piece</span>
                            </button>
                            <button type="button" class="qty-dropdown-option" role="option" aria-selected="false"
                                data-qty="4">
                                <span class="qty-dropdown-check">
                                    <svg viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                                    </svg>
                                </span>
                                <span>4 image</span>
                                <span class="image-dropdown-price">adds $3.87 a piece</span>
                            </button>
                            <button type="button" class="qty-dropdown-option" role="option" aria-selected="false"
                                data-qty="5">
                                <span class="qty-dropdown-check">
                                    <svg viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                                    </svg>
                                </span>
                                <span>5 image</span>
                                <span class="image-dropdown-price">adds $3.87 a piece</span>
                            </button>
                            <button type="button" class="qty-dropdown-option" role="option" aria-selected="false"
                                data-qty="6">
                                <span class="qty-dropdown-check">
                                    <svg viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                                    </svg>
                                </span>
                                <span>6 image</span>
                                <span class="image-dropdown-price">adds $3.87 a piece</span>
                            </button>
                            <button type="button" class="qty-dropdown-option" role="option" aria-selected="false"
                                data-qty="7">
                                <span class="qty-dropdown-check">
                                    <svg viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                                    </svg>
                                </span>
                                <span>7 image</span>
                                <span class="image-dropdown-price">adds $3.87 a piece</span>
                            </button>
                            <button type="button" class="qty-dropdown-option" role="option" aria-selected="false"
                                data-qty="8">
                                <span class="qty-dropdown-check">
                                    <svg viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M2 8.5 6.5 13 14 3.5"></path>
                                    </svg>
                                </span>
                                <span>8 image</span>
                                <span class="image-dropdown-price">adds $3.87 a piece</span>
                            </button>
                        </span>
                    </span>
                </span>
                    <span id="cfgImgW">image.</span>
                </span>
            </p>
            <p class="cfg-help" id="cfgHelp" hidden> Type a length from 20 to 10,000 words. </p>
            <div class="cfg-tn">
                <div class="cfg-total" aria-live="polite">
                    <span>Total</span>
                    <strong id="cfgTotal">$198.00</strong>
                </div>
                <div class="cfg-bn">
                    <p class="cfg-why" id="cfgWhy">
                        <span>$132.00 for 1,500 words, plus $66.00 for a Premium writer.</span>
                        <span>Standard turnaround and one image are included.</span>
                    </p>
                    <button class="btn btn-navy btn-block" type="submit">
                        <i class="ink"></i>
                        <span class="roll">
                            <span>Next: write the brief</span>
                            <span aria-hidden="true">Next: write the brief</span>
                        </span>
                    </button>
                </div>
            </div>
        </form>
    </div>
</section> <?php include 'includes/footer.php'; ?>
<!-- COUNT -->

<script>
(function () {
    "use strict";

    function initQuantityDropdown() {
        document.querySelectorAll(".qty-dropdown").forEach(function (dropdown) {
            if (dropdown.dataset.qtyDropdownReady === "true") return;

            const trigger = dropdown.querySelector('.cfg-blank[data-k="qty"]');
            const panel = dropdown.querySelector(".qty-dropdown-panel");
            const overlay = dropdown.querySelector(".qty-dropdown-overlay");
            const value = trigger && trigger.querySelector(".cfg-v");
            const options = Array.from(
                dropdown.querySelectorAll(".qty-dropdown-option")
            );

            if (!trigger || !panel || !overlay || !value) return;

            dropdown.dataset.qtyDropdownReady = "true";

            const panelPlaceholder = document.createComment("qty-panel");
            const overlayPlaceholder = document.createComment("qty-overlay");

            panel.parentNode.insertBefore(panelPlaceholder, panel);
            overlay.parentNode.insertBefore(overlayPlaceholder, overlay);

            let isOpen = false;

            function isMobile() {
                return window.matchMedia("(max-width: 767px)").matches;
            }

            function syncSelection() {
                options.forEach(function (option) {
                    const selected =
                        option.dataset.qty === value.textContent.trim();

                    option.classList.toggle(
                        "qty-dropdown-selected",
                        selected
                    );

                    option.setAttribute("aria-selected", String(selected));
                });
            }

            function closeOtherSheets() {
                document.querySelectorAll(
                    ".grade-dropdown-panel.grade-dropdown-open"
                ).forEach(function (openPanel) {
                    const gradeTrigger = document.querySelector(
                        '.grade-dropdown [data-k="grade"]'
                    );

                    if (gradeTrigger) gradeTrigger.click();
                });
            }

            function positionDesktopPanel() {
                if (isMobile()) return;

                const rect = trigger.getBoundingClientRect();
                const panelWidth = Math.min(360, window.innerWidth - 32);

                let left = rect.left;
                let top = rect.bottom + 6;

                left = Math.max(
                    16,
                    Math.min(left, window.innerWidth - panelWidth - 16)
                );

                /* Prevent the dropdown from extending below the viewport */
                const availableBelow = window.innerHeight - top - 16;
                const availableAbove = rect.top - 16;

                if (availableBelow < 180 && availableAbove > availableBelow) {
                    top = Math.max(16, rect.top - Math.min(300, availableAbove) - 6);
                }

                panel.style.setProperty(
                    "--qty-dropdown-left",
                    left + "px"
                );

                panel.style.setProperty(
                    "--qty-dropdown-top",
                    top + "px"
                );

                panel.style.setProperty(
                    "--qty-dropdown-width",
                    panelWidth + "px"
                );
            }

            function openDropdown() {
                if (isOpen) return;

                closeOtherSheets();
                isOpen = true;

                /* Move panel outside .wrap and ancestor stacking contexts */
                document.body.appendChild(overlay);
                document.body.appendChild(panel);

                syncSelection();
                positionDesktopPanel();

                overlay.classList.add("qty-dropdown-open");
                panel.classList.add("qty-dropdown-open");

                trigger.setAttribute("aria-expanded", "true");

                if (isMobile()) {
                    document.body.classList.add(
                        "qty-dropdown-scroll-lock"
                    );

                    const list = panel.querySelector(".qty-dropdown-list");
                    if (list) list.scrollTop = 0;
                } else {
                    document.body.classList.remove(
                        "qty-dropdown-scroll-lock"
                    );
                }
            }

            function closeDropdown() {
                if (!isOpen) return;

                isOpen = false;

                overlay.classList.remove("qty-dropdown-open");
                panel.classList.remove("qty-dropdown-open");

                /* Restore panel and overlay to their original HTML positions */
                if (overlayPlaceholder.parentNode) {
                    overlayPlaceholder.parentNode.replaceChild(
                        overlay,
                        overlayPlaceholder
                    );
                }

                if (panelPlaceholder.parentNode) {
                    panelPlaceholder.parentNode.replaceChild(
                        panel,
                        panelPlaceholder
                    );
                }

                panel.style.removeProperty("--qty-dropdown-left");
                panel.style.removeProperty("--qty-dropdown-top");
                panel.style.removeProperty("--qty-dropdown-width");

                trigger.setAttribute("aria-expanded", "false");

                document.body.classList.remove(
                    "qty-dropdown-scroll-lock"
                );
            }

            trigger.addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();

                if (isOpen) {
                    closeDropdown();
                } else {
                    openDropdown();
                }
            });

            options.forEach(function (option) {
                option.addEventListener("click", function (event) {
                    event.preventDefault();
                    event.stopPropagation();

                    const quantity = option.dataset.qty;
                    if (!quantity) return;

                    value.textContent = quantity;
                    trigger.dataset.value = quantity;

                    syncSelection();
                    closeDropdown();

                    /* Notify existing pricing/form code */
                    trigger.dispatchEvent(
                        new Event("change", { bubbles: true })
                    );

                    trigger.dispatchEvent(
                        new CustomEvent("quantity:change", {
                            bubbles: true,
                            detail: {
                                quantity: Number(quantity)
                            }
                        })
                    );
                });
            });

            overlay.addEventListener("click", closeDropdown);

            panel.addEventListener("click", function (event) {
                event.stopPropagation();
            });

            document.addEventListener("click", function (event) {
                if (
                    isOpen &&
                    !dropdown.contains(event.target) &&
                    !panel.contains(event.target)
                ) {
                    closeDropdown();
                }
            });

            document.addEventListener("keydown", function (event) {
                if (isOpen && event.key === "Escape") {
                    closeDropdown();
                    trigger.focus({ preventScroll: true });
                }
            });

            window.addEventListener("resize", function () {
                if (!isOpen) return;

                if (isMobile()) {
                    document.body.classList.add(
                        "qty-dropdown-scroll-lock"
                    );
                } else {
                    document.body.classList.remove(
                        "qty-dropdown-scroll-lock"
                    );
                    positionDesktopPanel();
                }
            });

            window.addEventListener("scroll", function () {
                if (isOpen && !isMobile()) {
                    positionDesktopPanel();
                }
            }, true);

            syncSelection();
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initQuantityDropdown
        );
    } else {
        initQuantityDropdown();
    }
})();
</script>


<!-- GRADE -->
<script>
    (function () {
        "use strict";

        function initGradeDropdowns() {
            document.querySelectorAll(".grade-dropdown").forEach(function (dropdown) {
                if (dropdown.dataset.gradeReady === "true") return;
                const trigger = dropdown.querySelector('[data-k="grade"]');
                const panel = dropdown.querySelector(".grade-dropdown-panel");
                const overlay = dropdown.querySelector(".grade-dropdown-overlay");
                const value = trigger ? trigger.querySelector(".cfg-v") : null;
                const options = Array.from(dropdown.querySelectorAll(".grade-dropdown-option"));
                if (!trigger || !panel || !overlay || !value) return;
                dropdown.dataset.gradeReady = "true";
                const panelPlaceholder = document.createComment("grade-panel");
                const overlayPlaceholder = document.createComment("grade-overlay");
                panel.parentNode.insertBefore(panelPlaceholder, panel);
                overlay.parentNode.insertBefore(overlayPlaceholder, overlay);
                let isOpen = false;

                function isMobile() {
                    return window.matchMedia("(max-width: 767px)").matches;
                }

                function syncOptions() {
                    const selectedValue = value.textContent.trim();
                    options.forEach(function (option) {
                        const selected = option.dataset.grade === selectedValue;
                        option.classList.toggle("grade-dropdown-selected", selected);
                        option.setAttribute("aria-selected", String(selected));
                    });
                }

                function positionDesktopPanel() {
                    if (!isOpen || isMobile()) return;
                    const rect = trigger.getBoundingClientRect();
                    const panelWidth = panel.offsetWidth || 225;
                    const viewportWidth = document.documentElement.clientWidth;
                    let left = rect.left;
                    left = Math.max(12, Math.min(left, viewportWidth - panelWidth - 12));
                    panel.style.setProperty("--grade-menu-top",
                        (rect.bottom + 8) + "px");
                    panel.style.setProperty("--grade-menu-left", left + "px");
                }

                function closeOtherSheets() {
                    document.querySelectorAll(".qty-dropdown-panel.qty-dropdown-open").forEach(function () {
                        const qtyTrigger = document.querySelector('.qty-dropdown [data-k="qty"]');
                        if (qtyTrigger) qtyTrigger.click();
                    });
                }

                function openDropdown() {
                    if (isOpen) return;
                    closeOtherSheets();
                    isOpen = true;
                    document.body.appendChild(overlay);
                    document.body.appendChild(panel);
                    syncOptions();
                    overlay.classList.add("grade-dropdown-open");
                    panel.classList.add("grade-dropdown-open");
                    trigger.setAttribute("aria-expanded", "true");
                    if (isMobile()) {
                        document.body.classList.add("grade-dropdown-scroll-lock");
                        const list = panel.querySelector(".grade-dropdown-list");
                        if (list) list.scrollTop = 0;
                    } else {
                        document.body.classList.remove("grade-dropdown-scroll-lock");
                        // Measure after the panel is attached and visible.
                        requestAnimationFrame(positionDesktopPanel);
                    }
                }

                function closeDropdown() {
                    if (!isOpen) return;
                    isOpen = false;
                    overlay.classList.remove("grade-dropdown-open");
                    panel.classList.remove("grade-dropdown-open");
                    panel.style.removeProperty("--grade-menu-top");
                    panel.style.removeProperty("--grade-menu-left");
                    if (overlayPlaceholder.parentNode) {
                        overlayPlaceholder.parentNode.replaceChild(overlay, overlayPlaceholder);
                    }
                    if (panelPlaceholder.parentNode) {
                        panelPlaceholder.parentNode.replaceChild(panel, panelPlaceholder);
                    }
                    trigger.setAttribute("aria-expanded", "false");
                    document.body.classList.remove("grade-dropdown-scroll-lock");
                }
                trigger.addEventListener("click", function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    if (isOpen) {
                        closeDropdown();
                    } else {
                        openDropdown();
                    }
                });
                options.forEach(function (option) {
                    option.addEventListener("click", function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        const selectedGrade = option.dataset.grade;
                        if (!selectedGrade) return;
                        value.textContent = selectedGrade;
                        trigger.dataset.value = selectedGrade;
                        syncOptions();
                        closeDropdown();
                        trigger.dispatchEvent(new Event("change", {
                            bubbles: true
                        }));
                        trigger.dispatchEvent(new CustomEvent("grade:change", {
                            bubbles: true,
                            detail: {
                                grade: selectedGrade
                            }
                        }));
                    });
                });
                overlay.addEventListener("click", closeDropdown);
                panel.addEventListener("click", function (event) {
                    event.stopPropagation();
                });
                document.addEventListener("click", function (event) {
                    if (isOpen && !dropdown.contains(event.target) && !panel.contains(event.target)) {
                        closeDropdown();
                    }
                });
                document.addEventListener("keydown", function (event) {
                    if (isOpen && event.key === "Escape") {
                        closeDropdown();
                        trigger.focus({
                            preventScroll: true
                        });
                    }
                });
                window.addEventListener("resize", function () {
                    if (!isOpen) return;
                    if (isMobile()) {
                        document.body.classList.add("grade-dropdown-scroll-lock");
                        panel.style.removeProperty("--grade-menu-top");
                        panel.style.removeProperty("--grade-menu-left");
                    } else {
                        document.body.classList.remove("grade-dropdown-scroll-lock");
                        positionDesktopPanel();
                    }
                });
                window.addEventListener("scroll", function () {
                    if (isOpen && !isMobile()) {
                        positionDesktopPanel();
                    }
                }, true);
                syncOptions();
            });
        }
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", initGradeDropdowns);
        } else {
            initGradeDropdowns();
        }
    })();
</script>