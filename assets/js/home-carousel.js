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
  var TRANSITION = reduceMotion ? "transform 1ms linear" : "transform 480ms cubic-bezier(0.16, 1, 0.3, 1)";
  var AUTOPLAY_INTERVAL = 5500;
  var DRAG_THRESHOLD = 48;

  // Infinite loop via a 5-slot sliding window: slots[0] and slots[4] are
  // off-viewport buffer cards (one card-width to either side, clipped by
  // the viewport's overflow:hidden), slots[1..3] are the visible cards.
  // Stepping just animates the track by one card-width, then — once the
  // transition ends — the slot contents are relabelled for the new
  // position and the transform is reset instantly, so the loop never has
  // a visible seam.
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

  function settle() {
    setTransform(baseOffset, false);
    track.getBoundingClientRect(); // force reflow so the next transition isn't skipped
    animating = false;
  }

  function animateTo(target, dir) {
    if (animating || target === current) return;
    animating = true;
    var to = dir === 1 ? baseOffset - cardStep : baseOffset + cardStep;
    setTransform(baseOffset, false);
    track.getBoundingClientRect();
    setTransform(to, true);

    function onEnd(e) {
      if (e.target !== track || e.propertyName !== "transform") return;
      track.removeEventListener("transitionend", onEnd);
      current = target;
      relabelSlots();
      measure();
      settle();
      updateDots();
    }
    track.addEventListener("transitionend", onEnd);
  }

  function next() { animateTo((current + 1) % N, 1); }
  function prev() { animateTo((current - 1 + N) % N, -1); }
  function goTo(target) {
    if (target === current) return;
    var forwardDist = (target - current + N) % N;
    var backwardDist = N - forwardDist;
    animateTo(target, forwardDist <= backwardDist ? 1 : -1);
  }

  function startAutoplay() {
    if (reduceMotion || autoplayTimer || dragging) return;
    autoplayTimer = setInterval(next, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Drag / swipe
  var dragging = false;
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
