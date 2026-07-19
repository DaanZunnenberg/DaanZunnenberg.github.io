(function () {
  var container = document.getElementById("profile-slideshow");
  if (!container) return;

  var slides = container.querySelectorAll("img.slide");
  if (slides.length < 2) return;

  var current = 0;
  setInterval(function () {
    slides[current].classList.remove("is-active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("is-active");
  }, 4500);
})();
