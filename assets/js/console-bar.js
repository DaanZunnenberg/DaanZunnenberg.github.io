(function () {
  var textEl = document.getElementById("console-text");
  if (!textEl) return;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var lines = [
    "researching decomposition theorems & majorizing measures",
    "leiden university :: phd, mathematics",
    "empirical processes, weak convergence, absolute regularity",
    "quantitative research :: market making, smart order routing",
    "python / numba :: vectorized estimation at scale",
    "stochastic calculus, Donsker–Skorokhod theory"
  ];

  if (reduceMotion) {
    textEl.textContent = lines[0];
    return;
  }

  var lineIdx = 0;
  var charIdx = 0;
  var deleting = false;
  var pauseUntil = 0;

  var TYPE_MS = 34;
  var DELETE_MS = 18;
  var HOLD_MS = 1800;

  function tick(ts) {
    if (ts < pauseUntil) {
      requestAnimationFrame(tick);
      return;
    }

    var line = lines[lineIdx];
    if (!deleting) {
      charIdx++;
      textEl.textContent = line.slice(0, charIdx);
      if (charIdx >= line.length) {
        pauseUntil = ts + HOLD_MS;
        deleting = true;
      }
      setTimeout(function () { requestAnimationFrame(tick); }, TYPE_MS);
    } else {
      charIdx--;
      textEl.textContent = line.slice(0, charIdx);
      if (charIdx <= 0) {
        deleting = false;
        lineIdx = (lineIdx + 1) % lines.length;
      }
      setTimeout(function () { requestAnimationFrame(tick); }, DELETE_MS);
    }
  }

  requestAnimationFrame(tick);
})();
