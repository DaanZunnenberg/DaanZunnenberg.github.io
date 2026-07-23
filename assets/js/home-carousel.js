(function () {
  var root = document.getElementById("home-carousel");
  if (!root) return;

  var slides = root.querySelectorAll(".carousel-slide");
  var dots = root.querySelectorAll(".carousel-dots button");
  var prevBtn = root.querySelector(".carousel-prev");
  var nextBtn = root.querySelector(".carousel-next");
  if (slides.length < 2) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var current = 0;
  var timer = null;
  var INTERVAL = 5500;

  function show(index) {
    slides[current].classList.remove("is-active");
    dots[current].classList.remove("is-active");
    dots[current].setAttribute("aria-selected", "false");
    current = index;
    slides[current].classList.add("is-active");
    dots[current].classList.add("is-active");
    dots[current].setAttribute("aria-selected", "true");
  }

  function next() {
    show((current + 1) % slides.length);
  }

  function prev() {
    show((current - 1 + slides.length) % slides.length);
  }

  function start() {
    if (reduceMotion || timer) return;
    timer = setInterval(next, INTERVAL);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      show(i);
      stop();
      start();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      prev();
      stop();
      start();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      next();
      stop();
      start();
    });
  }

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });

  start();
})();
