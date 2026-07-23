(function () {
  // Short marker-and-line rows drifting upward, like a log of dated entries
  // scrolling past — a calmer, non-financial stand-in for a ticker.
  var canvas = document.getElementById("ledger-widget-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var ROW_COUNT = 16;
  var LINE_COLOR = "rgba(233, 236, 243, 0.4)";
  var MARKER_COLOR = "rgba(226, 230, 240, 0.85)";
  var rows = [];
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
  }

  function spawnRow(fromBottom) {
    return {
      x: 30 + Math.random() * (W * 0.4),
      y: fromBottom ? H + 14 : Math.random() * H,
      width: 60 + Math.random() * 160,
      vy: -(0.01 + Math.random() * 0.016)
    };
  }

  function seed() {
    rows = [];
    for (var i = 0; i < ROW_COUNT; i++) rows.push(spawnRow(false));
  }

  function edgeFade(y) {
    var margin = 40;
    if (y < margin) return Math.max(0, y / margin);
    if (y > H - margin) return Math.max(0, (H - y) / margin);
    return 1;
  }

  function step(now) {
    var dt = lastTs == null ? 16 : Math.min(now - lastTs, 64);
    lastTs = now;

    ctx.clearRect(0, 0, W, H);

    rows.forEach(function (row, i) {
      row.y += row.vy * dt;
      if (row.y < -20) rows[i] = spawnRow(true);

      var alpha = edgeFade(row.y);
      ctx.globalAlpha = alpha;

      ctx.fillStyle = MARKER_COLOR;
      ctx.beginPath();
      ctx.arc(row.x - 12, row.y, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(row.x, row.y);
      ctx.lineTo(row.x + row.width, row.y);
      ctx.stroke();

      ctx.globalAlpha = 1;
    });
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
    seed();
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
  seed();

  if (!reduceMotion) start();
  else step(performance.now());
})();
