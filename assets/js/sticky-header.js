(function () {
  var header = document.querySelector(".site-header");
  var backToTop = document.getElementById("back-to-top");
  if (!header && !backToTop) return;

  // Separate enter/exit thresholds (hysteresis): collapsing the header's
  // padding shrinks its height, which shifts scrollY itself. With a single
  // threshold that shift could cross back over it and flip the class again
  // on the very next frame, producing a stuck/unstuck flicker loop.
  var STICK_AT = 80;
  var UNSTICK_AT = 40;
  var TOP_AT = 420;
  var ticking = false;
  var isStuck = false;

  function update() {
    var y = window.scrollY || window.pageYOffset;
    if (header) {
      if (!isStuck && y > STICK_AT) isStuck = true;
      else if (isStuck && y < UNSTICK_AT) isStuck = false;
      header.classList.toggle("is-stuck", isStuck);
    }
    if (backToTop) backToTop.classList.toggle("visible", y > TOP_AT);
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  update();
})();
