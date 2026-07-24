(function () {
  var root = document.getElementById("home-carousel");
  if (!root) return;

  var viewport = root.querySelector(".carousel-viewport");
  var cards = Array.prototype.slice.call(root.querySelectorAll(".carousel-card"));
  var dots = root.querySelectorAll(".carousel-dots button");
  var prevBtn = root.querySelector(".carousel-prev");
  var nextBtn = root.querySelector(".carousel-next");

  var N = cards.length;
  if (!viewport || N < 2) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var AUTOPLAY_INTERVAL = 7000;

  // The browser's native scroll-snap does the actual sliding — no custom
  // transform math, no cloned "buffer" slides, nothing that can get stuck
  // mid-animation. This layer only figures out which card is currently
  // leading (from scrollLeft), keeps the dots/active-card styling and the
  // prev/next/autoplay shortcuts in sync with that, using scrollTo() for
  // the actual motion.
  var current = 0;
  var autoplayTimer = null;
  var settleTimer = null;
  var paused = false;

  // .carousel-viewport sets scroll-padding-inline to match the track's side
  // padding, so the browser's own scroll-snap machinery lands each card at
  // the edge of the button gutter rather than at the literal viewport edge
  // — including for a scripted scrollTo() target, which snap re-corrects
  // the same way it would a native swipe. That means this layer can just
  // target a card's raw offset and let CSS do the inset.
  function cardOffset(card) {
    return card.getBoundingClientRect().left - viewport.getBoundingClientRect().left + viewport.scrollLeft;
  }

  function nearestIndex() {
    var target = viewport.scrollLeft;
    var best = 0;
    var bestDist = Infinity;
    for (var i = 0; i < N; i++) {
      var dist = Math.abs(cardOffset(cards[i]) - target);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    return best;
  }

  function setActive(index) {
    current = index;
    cards.forEach(function (card, i) {
      card.classList.toggle("is-active", i === index);
    });
    for (var i = 0; i < dots.length; i++) {
      var isActive = i === index;
      dots[i].classList.toggle("is-active", isActive);
      dots[i].setAttribute("aria-selected", isActive ? "true" : "false");
    }
  }

  function scrollToIndex(index, smooth) {
    index = ((index % N) + N) % N;
    viewport.scrollTo({
      left: cardOffset(cards[index]),
      behavior: reduceMotion || !smooth ? "auto" : "smooth",
    });
    setActive(index);
  }

  function next() { scrollToIndex(current + 1, true); }
  function prev() { scrollToIndex(current - 1, true); }

  function startAutoplay() {
    if (reduceMotion || autoplayTimer || paused) return;
    autoplayTimer = setInterval(next, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function pause() {
    paused = true;
    stopAutoplay();
  }

  function resume() {
    paused = false;
    startAutoplay();
  }

  // Native scrolling (touch drag, trackpad, mouse-wheel-shift) fires plain
  // "scroll" events; keep the dots/active card in sync with wherever the
  // user actually lands, not just where our own buttons sent it.
  var scrollRaf = null;
  viewport.addEventListener("scroll", function () {
    if (scrollRaf) return;
    scrollRaf = requestAnimationFrame(function () {
      scrollRaf = null;
      setActive(nearestIndex());
    });
  });

  if (prevBtn) prevBtn.addEventListener("click", function () { prev(); pause(); resume(); });
  if (nextBtn) nextBtn.addEventListener("click", function () { next(); pause(); resume(); });

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      scrollToIndex(i, true);
      pause();
      resume();
    });
  });

  root.addEventListener("mouseenter", pause);
  root.addEventListener("mouseleave", resume);
  root.addEventListener("focusin", pause);
  root.addEventListener("focusout", resume);
  viewport.addEventListener("pointerdown", pause);
  viewport.addEventListener("pointerup", resume);
  viewport.addEventListener("touchstart", pause, { passive: true });
  viewport.addEventListener("touchend", resume, { passive: true });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stopAutoplay(); else if (!paused) startAutoplay();
  });

  root.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { next(); pause(); resume(); }
    else if (e.key === "ArrowLeft") { prev(); pause(); resume(); }
  });

  window.addEventListener("resize", function () {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(function () { scrollToIndex(current, false); }, 150);
  });

  setActive(0);
  scrollToIndex(0, false);
  startAutoplay();
})();
