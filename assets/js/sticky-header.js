(function () {
  var header = document.querySelector(".site-header");
  var backToTop = document.getElementById("back-to-top");
  if (!header && !backToTop) return;

  var TOP_AT = 420;
  var ticking = false;

  function update() {
    var y = window.scrollY || window.pageYOffset;
    if (header) {
      // On hero pages the header sits out of flow (absolutely positioned
      // over the hero) so it can float transparently on top of it; its own
      // rect.top reads 0 from the very first frame regardless of scroll,
      // so "stuck" has to be derived from scroll position instead of the
      // header's own geometry. A small gap between the two thresholds
      // avoids flicker right at the boundary.
      var isStuck = header.classList.contains("is-stuck");
      if (!isStuck && y > 4) {
        isStuck = true;
      } else if (isStuck && y <= 0) {
        isStuck = false;
      }
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
