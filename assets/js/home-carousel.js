(function () {
  var root = document.getElementById("home-carousel");
  if (!root) return;

  var viewport = root.querySelector(".carousel-viewport");
  var track = root.querySelector(".carousel-track");
  var dots = root.querySelectorAll(".carousel-dots button");
  var prevBtn = root.querySelector(".carousel-prev");
  var nextBtn = root.querySelector(".carousel-next");

  var originals = Array.prototype.slice.call(track.children);
  var N = originals.length;
  if (N < 2 || !viewport || !track) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var TRANSITION_MS = reduceMotion ? 1 : 420;
  var TRANSITION = "transform " + TRANSITION_MS + "ms cubic-bezier(0.16, 1, 0.3, 1)";
  var AUTOPLAY_INTERVAL = 5500;
  var DRAG_THRESHOLD = 48;

  // Infinite loop via a 5-slot sliding window: slots[0] and slots[4] are
  // off-viewport buffer cards (one card-width to either side, clipped by
  // the viewport's overflow:hidden), slots[1..3] are the visible cards.
  // Stepping animates the track by one card-width, then relabels the slot
  // contents for the new position and resets the transform instantly, so
  // the loop never has a visible seam. A step is always exactly one card,
  // even for dot clicks more than one card away (those chain several
  // one-card steps) — animating by the wrong distance is what made the
  // display and the dots fall out of sync.
  var slots = [];
  for (var i = -1; i <= 3; i++) {
    var clone = originals[((i % N) + N) % N].cloneNode(true);
    slots.push(clone);
  }
  track.innerHTML = "";
  slots.forEach(function (slot) { track.appendChild(slot); });

  var current = 0;
  var cardStep = 0;
  var baseOffset = 0;
  var animating = false;
  var autoplayTimer = null;
  var dragging = false;

  function relabelSlots() {
    for (var k = 0; k < slots.length; k++) {
      var idx = ((current + (k - 1)) % N + N) % N;
      var source = originals[idx];
      if (slots[k].innerHTML !== source.innerHTML) slots[k].innerHTML = source.innerHTML;
      slots[k].href = source.href;
      var isBuffer = k === 0 || k === slots.length - 1;
      if (isBuffer) {
        slots[k].setAttribute("aria-hidden", "true");
        slots[k].setAttribute("tabindex", "-1");
      } else {
        slots[k].removeAttribute("aria-hidden");
        slots[k].removeAttribute("tabindex");
      }
    }
  }

  function measure() {
    var rectA = slots[0].getBoundingClientRect();
    var rectB = slots[1].getBoundingClientRect();
    cardStep = rectB.left - rectA.left;
    baseOffset = -(slots[1].offsetLeft);
  }

  function setTransform(px, withTransition) {
    track.style.transition = withTransition ? TRANSITION : "none";
    track.style.transform = "translateX(" + px + "px)";
  }

  function updateDots() {
    for (var i = 0; i < dots.length; i++) {
      var isActive = i === current;
      dots[i].classList.toggle("is-active", isActive);
      dots[i].setAttribute("aria-selected", isActive ? "true" : "false");
    }
  }

  // Step animations are driven through a single settle() call that both the
  // transitionend handler and a fallback timer can trigger — whichever
  // fires first wins, and the other is a no-op. Without this fallback, a
  // transitionend event that never arrives (tab backgrounded mid-animation,
  // a skipped transition, etc.) leaves `animating` stuck true forever and
  // every future click on the arrows or dots silently does nothing.
  var pendingSettle = null;

  function settle(target, cb) {
    if (!pendingSettle) return;
    pendingSettle = null;
    current = target;
    relabelSlots();
    measure();
    setTransform(baseOffset, false);
    track.getBoundingClientRect();
    animating = false;
    updateDots();
    if (cb) cb();
  }

  function animateTo(target, dir, cb) {
    if (animating || target === current) return;
    animating = true;
    var to = dir === 1 ? baseOffset - cardStep : baseOffset + cardStep;
    setTransform(baseOffset, false);
    track.getBoundingClientRect();
    setTransform(to, true);

    var token = {};
    pendingSettle = token;

    function onEnd(e) {
      if (e.target !== track || e.propertyName !== "transform") return;
      track.removeEventListener("transitionend", onEnd);
      if (pendingSettle === token) settle(target, cb);
    }
    track.addEventListener("transitionend", onEnd);
    setTimeout(function () {
      if (pendingSettle === token) settle(target, cb);
    }, TRANSITION_MS + 150);
  }

  function next() { animateTo((current + 1) % N, 1); }
  function prev() { animateTo((current - 1 + N) % N, -1); }

  function chainSteps(steps, dir) {
    if (steps <= 0) return;
    var target = dir === 1 ? (current + 1) % N : (current - 1 + N) % N;
    animateTo(target, dir, function () {
      if (steps > 1) chainSteps(steps - 1, dir);
    });
  }

  function goTo(target) {
    if (target === current || animating) return;
    var forwardDist = (target - current + N) % N;
    var backwardDist = N - forwardDist;
    if (forwardDist <= backwardDist) chainSteps(forwardDist, 1);
    else chainSteps(backwardDist, -1);
  }

  function startAutoplay() {
    if (reduceMotion || autoplayTimer || dragging) return;
    autoplayTimer = setInterval(function () {
      if (!animating) next();
    }, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Drag / swipe
  var dragStartX = 0;
  var dragDelta = 0;
  var dragMoved = false;

  function clampDrag(delta) {
    var limit = cardStep;
    if (Math.abs(delta) <= limit) return delta;
    var over = Math.abs(delta) - limit;
    var damped = limit + over * 0.35;
    return delta < 0 ? -damped : damped;
  }

  function onPointerDown(e) {
    if (animating || (e.pointerType === "mouse" && e.button !== 0)) return;
    dragging = true;
    dragMoved = false;
    dragStartX = e.clientX;
    dragDelta = 0;
    stopAutoplay();
    setTransform(baseOffset, false);
    try { viewport.setPointerCapture(e.pointerId); } catch (err) {}
  }

  function onPointerMove(e) {
    if (!dragging) return;
    dragDelta = e.clientX - dragStartX;
    if (Math.abs(dragDelta) > 4) dragMoved = true;
    setTransform(baseOffset + clampDrag(dragDelta), false);
  }

  function onPointerUp() {
    if (!dragging) return;
    dragging = false;
    if (dragDelta <= -DRAG_THRESHOLD) {
      animateTo((current + 1) % N, 1);
    } else if (dragDelta >= DRAG_THRESHOLD) {
      animateTo((current - 1 + N) % N, -1);
    } else {
      setTransform(baseOffset, true);
    }
    startAutoplay();
  }

  function onClickCapture(e) {
    if (dragMoved) {
      e.preventDefault();
      dragMoved = false;
    }
  }

  viewport.addEventListener("pointerdown", onPointerDown);
  viewport.addEventListener("pointermove", onPointerMove);
  viewport.addEventListener("pointerup", onPointerUp);
  viewport.addEventListener("pointercancel", onPointerUp);
  track.addEventListener("click", onClickCapture, true);

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      goTo(i);
      stopAutoplay();
      startAutoplay();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      prev();
      stopAutoplay();
      startAutoplay();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      next();
      stopAutoplay();
      startAutoplay();
    });
  }

  root.addEventListener("mouseenter", stopAutoplay);
  root.addEventListener("mouseleave", startAutoplay);
  root.addEventListener("focusin", stopAutoplay);
  root.addEventListener("focusout", startAutoplay);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stopAutoplay(); else startAutoplay();
  });

  window.addEventListener("resize", function () {
    measure();
    setTransform(baseOffset, false);
  });

  relabelSlots();
  root.classList.add("is-enhanced");
  measure();
  setTransform(baseOffset, false);
  updateDots();
  startAutoplay();
})();
