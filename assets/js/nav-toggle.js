(function () {
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  var overlay = document.getElementById("nav-overlay");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("open", open);
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (overlay) overlay.classList.toggle("open", open);
    document.body.classList.toggle("nav-locked", open);
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("open"));
  });

  if (overlay) {
    overlay.addEventListener("click", function () {
      setOpen(false);
    });
  }

  nav.addEventListener("click", function (evt) {
    if (evt.target.tagName === "A") {
      setOpen(false);
    }
  });
})();
