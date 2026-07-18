(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || typeof Element.prototype.animate !== "function") return;

  document.querySelectorAll(".entry details").forEach(function (el) {
    var summary = el.querySelector("summary");
    var content = el.querySelector(".readme");
    if (!summary || !content) return;

    var animation = null;
    var isClosing = false;
    var isExpanding = false;

    summary.addEventListener("click", function (e) {
      e.preventDefault();
      el.style.overflow = "hidden";
      if (isClosing || !el.open) {
        open();
      } else if (isExpanding || el.open) {
        shrink();
      }
    });

    function shrink() {
      isClosing = true;
      var startHeight = el.offsetHeight + "px";
      var endHeight = summary.offsetHeight + "px";
      if (animation) animation.cancel();
      animation = el.animate({ height: [startHeight, endHeight] }, { duration: 260, easing: "ease-out" });
      animation.onfinish = function () { onFinish(false); };
      animation.oncancel = function () { isClosing = false; };
    }

    function open() {
      el.style.height = el.offsetHeight + "px";
      el.open = true;
      window.requestAnimationFrame(function () { expand(); });
    }

    function expand() {
      isExpanding = true;
      var startHeight = el.offsetHeight + "px";
      var endHeight = summary.offsetHeight + content.offsetHeight + "px";
      if (animation) animation.cancel();
      animation = el.animate({ height: [startHeight, endHeight] }, { duration: 260, easing: "ease-out" });
      animation.onfinish = function () { onFinish(true); };
      animation.oncancel = function () { isExpanding = false; };
    }

    function onFinish(isOpen) {
      el.open = isOpen;
      animation = null;
      isClosing = false;
      isExpanding = false;
      el.style.height = "";
      el.style.overflow = "";
    }
  });
})();
