(function () {
  document.querySelectorAll(".readme-toggle").forEach(function (toggle) {
    var btn = toggle.querySelector(".readme-summary");
    if (!btn) return;

    btn.addEventListener("click", function () {
      var willOpen = !toggle.classList.contains("is-open");

      document.querySelectorAll(".readme-toggle.is-open").forEach(function (other) {
        if (other === toggle) return;
        other.classList.remove("is-open");
        var otherBtn = other.querySelector(".readme-summary");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
      });

      toggle.classList.toggle("is-open", willOpen);
      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  });
})();
