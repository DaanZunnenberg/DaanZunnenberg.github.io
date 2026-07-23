(function () {
  // Slow concentric orbits, each with a single travelling point — a loose
  // metaphor for trips to schools and workshops around a home base, without
  // literally drawing a globe.
  var canvas = document.getElementById("orbit-widget-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H, cx, cy;
  var RING_COLOR = "rgba(77, 210, 255, 0.16)";
  var DOT_COLOR = "rgba(226, 230, 240, 0.95)";
  var HUB_COLOR = "rgba(233, 236, 243, 0.6)";

  var rings = [];
  var lastTs = null;
  var running = false;
  var visible = true;

  function resize() {
    W = container.clientWidth;
    H = container.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = W * 0.5;
    cy = H * 0.52;
  }

  function buildRings() {
    rings = [];
    var base = Math.min(W, H) * 0.16;
    var count = 4;
    for (var i = 0; i < count; i++) {
      rings.push({
        rx: base * (i + 1.4),
        ry: base * (i + 1.4) * 0.4,
        angle: Math.random() * Math.PI * 2,
        speed: (0.00028 + i * 0.00006) * (i % 2 === 0 ? 1 : -1)
      });
    }
  }

  function step(now) {
    var dt = lastTs == null ? 16 : Math.min(now - lastTs, 64);
    lastTs = now;

    ctx.clearRect(0, 0, W, H);

    rings.forEach(function (ring) {
      ring.angle += ring.speed * dt;

      ctx.strokeStyle = RING_COLOR;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, cy, ring.rx, ring.ry, 0, 0, Math.PI * 2);
      ctx.stroke();

      var px = cx + Math.cos(ring.angle) * ring.rx;
      var py = cy + Math.sin(ring.angle) * ring.ry;
      ctx.fillStyle = DOT_COLOR;
      ctx.beginPath();
      ctx.arc(px, py, 2.6, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = HUB_COLOR;
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  function loop(ts) {
    if (!running) return;
    step(ts || performance.now());
    requestAnimationFrame(loop);
  }

  function start() {
    if (reduceMotion || running || !visible || document.hidden) return;
    running = true;
    lastTs = null;
    requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
  }

  window.addEventListener("resize", function () {
    resize();
    buildRings();
  });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[entries.length - 1].isIntersecting;
      if (visible) start(); else stop();
    }).observe(canvas);
  }
  resize();
  buildRings();

  if (!reduceMotion) start();
  else step(performance.now());
})();
