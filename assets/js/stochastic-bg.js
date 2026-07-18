(function () {
  var canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var PATH_COUNT = 5;
  var STEP_PX = 5.5; // horizontal spacing between sampled points
  var paths = [];

  // Deterministic PRNG so the backdrop looks the same on every load/reload,
  // rather than lurching around — a quiet illustration, not a live feed.
  function mulberry32(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function buildPath(seed, pointCount) {
    var rand = mulberry32(seed);
    var y = 0;
    var pts = [y];
    for (var i = 1; i < pointCount; i++) {
      y += (rand() - 0.5) * 2.1;
      pts.push(y);
    }
    return pts;
  }

  function rebuild() {
    var pointCount = Math.ceil(W / STEP_PX) + 2;
    paths = [];
    for (var i = 0; i < PATH_COUNT; i++) {
      paths.push({
        pts: buildPath(90210 + i * 733, pointCount),
        yBase: H * (0.14 + (i / (PATH_COUNT - 1)) * 0.72),
        scale: H * 0.05,
        opacity: 0.05 + i * 0.006
      });
    }
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    rebuild();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    paths.forEach(function (path) {
      ctx.beginPath();
      path.pts.forEach(function (v, i) {
        var x = i * STEP_PX;
        var y = path.yBase + v * path.scale;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = "rgba(111, 154, 255, " + path.opacity + ")";
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
})();
