(function () {
  var header = document.querySelector(".site-header");
  var backToTop = document.getElementById("back-to-top");
  if (!header && !backToTop) return;

  var STUCK_AT = 80;
  var TOP_AT = 420;
  var ticking = false;

  function update() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-stuck", y > STUCK_AT);
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
