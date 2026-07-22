(function () {
  var header = document.querySelector(".site-header");
  var backToTop = document.getElementById("back-to-top");
  if (!header && !backToTop) return;

  var TOP_AT = 420;
  var ticking = false;

  function update() {
    var y = window.scrollY || window.pageYOffset;
    if (header) {
      // The header is only actually pinned (and needs a background so
      // scrolled content doesn't show through it) once its own top edge
      // reaches the viewport's top edge. Deriving "stuck" from that,
      // rather than a fixed scrollY threshold, means the background
      // appears exactly when the header starts overlapping content,
      // with no gap in between and no dependence on page-specific
      // layout (console bar height, hero height, etc.).
      var isStuck = header.getBoundingClientRect().top <= 0;
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
