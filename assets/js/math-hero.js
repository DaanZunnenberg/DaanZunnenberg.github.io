(function () {
  var canvas = document.getElementById("math-hero-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;

  // Four dependent (mean-reverting) Ornstein-Uhlenbeck paths, discretized
  // and scrolled left like a live oscilloscope trace — a nod to the
  // dependent-process content the Research page is actually about, rather
  // than a generic decorative animation. Different theta per path gives
  // each a different "mixing rate".
  var PATH_COLORS = [
    "rgba(77, 210, 255, 0.75)",
    "rgba(60, 255, 94, 0.6)",
    "rgba(224, 168, 82, 0.5)",
    "rgba(233, 236, 243, 0.35)"
  ];
  var PATHS = PATH_COLORS.map(function (color, i) {
    return {
      color: color,
      theta: 0.6 + i * 0.5,       // mean-reversion speed (mixing rate)
      sigma: 0.9,
      x: (Math.random() - 0.5) * 2,
      buf: []
    };
  });

  var STEP_PX = 1.6;     // horizontal px advanced per simulation tick
  var DT = 0.04;
  var accPx = 0;

  // Generic-chaining flavor: a small covering net of circles at two dyadic
  // scales (an admissible sequence A_0, A_1), gently pulsing — decorative,
  // but a deliberate reference rather than arbitrary shapes.
  var NET_SEED = [];
  function seedNet() {
    NET_SEED = [];
    for (var n = 0; n < 2; n++) {
      var count = n === 0 ? 3 : 7;
      var r = n === 0 ? 46 : 20;
      for (var i = 0; i < count; i++) {
        NET_SEED.push({
          x: Math.random(),
          y: Math.random(),
          r: r,
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 0.5
        });
      }
    }
  }

  function gauss() {
    // Box-Muller
    var u = Math.max(Math.random(), 1e-9), v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function resize() {
    W = container.clientWidth;
    H = container.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    PATHS.forEach(function (p) {
      var n = Math.ceil(W / STEP_PX) + 2;
      while (p.buf.length < n) p.buf.push(p.x);
      p.buf = p.buf.slice(-n);
    });
  }

  function stepPaths() {
    PATHS.forEach(function (p) {
      p.x += -p.theta * p.x * DT + p.sigma * Math.sqrt(DT) * gauss();
      p.buf.push(p.x);
      if (p.buf.length > Math.ceil(W / STEP_PX) + 2) p.buf.shift();
    });
  }

  function drawPaths() {
    var midY = H * 0.5;
    var scale = H * 0.11;
    PATHS.forEach(function (p) {
      ctx.beginPath();
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.3;
      p.buf.forEach(function (v, i) {
        var x = W - (p.buf.length - 1 - i) * STEP_PX;
        var y = midY + v * scale;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });
  }

  function drawNet(now) {
    NET_SEED.forEach(function (c) {
      var pulse = 0.5 + 0.5 * Math.sin(now / 1400 * c.speed + c.phase);
      ctx.beginPath();
      ctx.arc(c.x * W, c.y * H, c.r * (0.85 + 0.15 * pulse), 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(143, 154, 179, " + (0.06 + 0.05 * pulse) + ")";
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }

  var lastTs = null;
  function frame(ts) {
    if (lastTs == null) lastTs = ts;
    var dtMs = Math.min(ts - lastTs, 64);
    lastTs = ts;

    accPx += (STEP_PX / 16) * dtMs;
    while (accPx >= STEP_PX) {
      stepPaths();
      accPx -= STEP_PX;
    }

    ctx.clearRect(0, 0, W, H);
    drawNet(ts);
    drawPaths();

    if (!reduceMotion) requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  resize();
  seedNet();

  if (!reduceMotion) {
    requestAnimationFrame(frame);
  } else {
    for (var i = 0; i < 200; i++) stepPaths();
    ctx.clearRect(0, 0, W, H);
    drawNet(0);
    drawPaths();
  }
})();
