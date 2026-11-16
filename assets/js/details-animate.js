(function () {
  document.querySelectorAll(".readme-toggle").forEach(function (toggle) {
    var btn = toggle.querySelector(".readme-summary");
    var collapse = toggle.querySelector(".readme-collapse");
    if (!btn || !collapse) return;

    collapse.setAttribute("aria-hidden", "true");
    collapse.setAttribute("inert", "");

    btn.addEventListener("click", function () {
      var willOpen = !toggle.classList.contains("is-open");
      toggle.classList.toggle("is-open", willOpen);
      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      collapse.setAttribute("aria-hidden", willOpen ? "false" : "true");
      collapse.toggleAttribute("inert", !willOpen);
    });
  });
})();
