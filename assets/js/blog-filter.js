(function () {
  var filterBar = document.querySelector(".tag-filter");
  var grid = document.querySelector(".article-grid[data-filterable]");
  if (!filterBar || !grid) return;

  var buttons = filterBar.querySelectorAll(".tag-filter-btn");
  var cards = grid.querySelectorAll(".article-card");
  var empty = document.querySelector("[data-filter-empty]");

  function applyFilter(tag) {
    var anyVisible = false;
    cards.forEach(function (card) {
      var tags = (card.getAttribute("data-tags") || "").split(" ");
      var match = tag === "all" || tags.indexOf(tag) !== -1;
      card.hidden = !match;
      if (match) anyVisible = true;
    });
    if (empty) empty.hidden = anyVisible;
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) {
        b.classList.remove("is-active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");
      applyFilter(btn.getAttribute("data-tag"));
    });
  });
})();
