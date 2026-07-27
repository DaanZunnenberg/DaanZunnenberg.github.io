(function () {
  var PAGE_SIZE = 4;

  function initSection(section) {
    var filterBar = section.querySelector(".tag-filter");
    var grid = section.querySelector(".article-grid[data-filterable]");
    if (!filterBar || !grid) return;

    var buttons = filterBar.querySelectorAll(".tag-filter-btn");
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".article-card"));
    var empty = section.querySelector("[data-filter-empty]");
    var moreBtn = section.querySelector("[data-show-more]");

    var activeTag = "all";
    var visibleCount = PAGE_SIZE;

    function matches(card, tag) {
      var tags = (card.getAttribute("data-tags") || "").split(" ");
      return tag === "all" || tags.indexOf(tag) !== -1;
    }

    function render() {
      var matching = cards.filter(function (card) {
        return matches(card, activeTag);
      });

      matching.forEach(function (card, i) {
        card.hidden = i >= visibleCount;
      });
      cards.forEach(function (card) {
        if (matching.indexOf(card) === -1) card.hidden = true;
      });

      if (empty) empty.hidden = matching.length > 0;
      if (moreBtn) moreBtn.hidden = matching.length <= visibleCount;
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");
        activeTag = btn.getAttribute("data-tag");
        visibleCount = PAGE_SIZE;
        render();
      });
    });

    if (moreBtn) {
      moreBtn.addEventListener("click", function () {
        visibleCount += PAGE_SIZE;
        render();
      });
    }

    render();
  }

  document.querySelectorAll(".filterable-section").forEach(initSection);
})();
