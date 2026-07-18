(function () {
  document.querySelectorAll(".readme-toggle").forEach(function (toggle) {
    var btn = toggle.querySelector(".readme-summary");
    if (!btn) return;

    btn.addEventListener("click", function () {
      var isOpen = toggle.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });
})();
