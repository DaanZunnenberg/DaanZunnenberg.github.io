(function () {
  document.querySelectorAll(".readme-toggle").forEach(function (toggle) {
    var btn = toggle.querySelector(".readme-summary");
    if (!btn) return;

    btn.addEventListener("click", function () {
      var willOpen = !toggle.classList.contains("is-open");
      toggle.classList.toggle("is-open", willOpen);
      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  });
})();
