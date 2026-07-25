(function () {
  var backToTop = document.getElementById("back-to-top");
  if (!backToTop) return;

  var TOP_AT = 420;
  var ticking = false;

  function update() {
    var y = window.scrollY || window.pageYOffset;
    backToTop.classList.toggle("visible", y > TOP_AT);
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  update();
})();
