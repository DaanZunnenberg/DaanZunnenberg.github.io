(function () {
  // Institutional market-depth profile: cumulative liquidity either side of
  // a mid price, rendered as two muted filled curves rather than a retail
  // order-book ladder. No live feed, no tickers, no flashing values — a
  // slow, near-static synthetic profile, styled as a supporting backdrop
  // rather than the focal point of the hero.
  var canvas = document.getElementById("market-depth-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var LEVELS = 46;

  var GRID_COLOR = "rgba(26, 36, 51, 0.9)";
  var MID_COLOR = "rgba(31, 78, 121, 0.55)";
  var BID_FILL = "rgba(46, 94, 78, 0.28)";
  var BID_LINE = "rgba(46, 94, 78, 0.65)";
  var ASK_FILL = "rgba(139, 74, 70, 0.26)";
  var ASK_LINE = "rgba(139, 74, 70, 0.6)";
  var LABEL_COLOR = "rgba(154, 164, 178, 0.55)";

  var seed = 0x51a2f3;
  function rnd() {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  var bidJitter = [], askJitter = [];
  for (var i = 0; i < LEVELS; i++) {
    bidJitter.push(0.75 + rnd() * 0.5);
    askJitter.push(0.75 + rnd() * 0.5);
  }

  var running = false;
  var visible = true;
  var startTs = null;

  function resize() {
    W = container.clientWidth;
    H = container.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function cumulative(i, jitter, t, phase) {
    var depth = Math.sqrt((i + 1) / LEVELS);
    var drift = reduceMotion ? 0 : 0.04 * Math.sin(t * 0.00012 + phase + i * 0.18);
    return Math.max(0, depth * jitter + drift);
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);

    var topPad = H * 0.16;
    var baseline = H * 0.94;
    var plotH = baseline - topPad;
    var midX = W * 0.5;
    var colW = (W * 0.46) / LEVELS;

    // Soft grid: a handful of faint horizontal lines, no axis numbers.
    var rows = 4;
    for (var r = 1; r < rows; r++) {
      var y = topPad + (plotH / rows) * r;
      ctx.strokeStyle = GRID_COLOR;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Mid line.
    ctx.strokeStyle = MID_COLOR;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(midX, topPad - 6);
    ctx.lineTo(midX, baseline);
    ctx.stroke();

    function side(direction, jitterArr, phase, fill, line) {
      ctx.beginPath();
      ctx.moveTo(midX, baseline);
      var x = midX;
      var lastY = baseline;
      for (var i = 0; i < LEVELS; i++) {
        var depth = cumulative(i, jitterArr[i], t, phase);
        var y = baseline - depth * plotH * 0.62;
        x = midX + direction * (i + 1) * colW;
        ctx.lineTo(x, lastY);
        ctx.lineTo(x, y);
        lastY = y;
      }
      ctx.lineTo(x, baseline);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();

      ctx.beginPath();
      x = midX;
      lastY = baseline;
      for (var j = 0; j < LEVELS; j++) {
        var depth2 = cumulative(j, jitterArr[j], t, phase);
        var y2 = baseline - depth2 * plotH * 0.62;
        x = midX + direction * (j + 1) * colW;
        ctx.lineTo(x, lastY);
        ctx.lineTo(x, y2);
        lastY = y2;
      }
      ctx.strokeStyle = line;
      ctx.lineWidth = 1.25;
      ctx.stroke();
    }

    side(-1, bidJitter, 0, BID_FILL, BID_LINE);
    side(1, askJitter, 2.1, ASK_FILL, ASK_LINE);

    ctx.font = "11px 'SF Mono', 'IBM Plex Mono', Menlo, Consolas, monospace";
    ctx.fillStyle = LABEL_COLOR;
    ctx.textBaseline = "alphabetic";
    ctx.fillText("MARKET DEPTH", 18, topPad - 14);
  }

  function loop(ts) {
    if (!running) return;
    if (startTs == null) startTs = ts;
    draw(ts - startTs);
    requestAnimationFrame(loop);
  }

  function start() {
    if (running || !visible || document.hidden) return;
    running = true;
    if (reduceMotion) {
      draw(0);
      return;
    }
    requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
  }

  window.addEventListener("resize", function () {
    resize();
    draw(startTs == null ? 0 : performance.now() - startTs);
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
  draw(0);
  start();
})();
