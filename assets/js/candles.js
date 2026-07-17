(function () {
  var canvas = document.getElementById("candles");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Deterministic PRNG (mulberry32) so the chart pattern is the same on every load.
  var SEED = 1337420;
  function mulberry32(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  var rand = mulberry32(SEED);

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var candleW = 9;
  var gap = 5;
  var slotPx = candleW + gap;

  // One bar occupies the same width as the header ticker's own motion covers in
  // the same time, so the two elements read as moving at one consistent pace —
  // it's just that this one advances in discrete steps (one bar at a time)
  // rather than sliding continuously, like a real OHLC feed.
  var speed = window.SITE_SCROLL_SPEED || 34; // px/s
  var periodMs = (slotPx / speed) * 1000;

  var candles = [];
  var price = 100;
  var forming = null;
  var elapsed = 0;

  function newForming(open) {
    return { open: open, close: open, high: open, low: open };
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.ceil(W / slotPx) + 1;
    if (!forming) forming = newForming(price);
    if (candles.length < count) {
      while (candles.length < count) candles.unshift(makeCandle());
    } else {
      candles = candles.slice(candles.length - count);
    }
  }

  function makeCandle() {
    var open = price;
    var drift = (rand() - 0.5) * 3.2;
    var close = Math.max(20, open + drift);
    var high = Math.max(open, close) + rand() * 1.8;
    var low = Math.min(open, close) - rand() * 1.8;
    price = close;
    return { open: open, close: close, high: high, low: low };
  }

  // Nudge the still-forming (rightmost) candle's OHLC a little, like live prints
  // arriving intrabar, without moving any bar's on-screen position.
  function tickForming(dt) {
    var wobble = (rand() - 0.5) * 2.4 * (dt / periodMs);
    price = Math.max(20, price + wobble);
    forming.close = price;
    forming.high = Math.max(forming.high, price);
    forming.low = Math.min(forming.low, price);
  }

  function finalizeForming() {
    candles.push(forming);
    var maxCount = Math.ceil(W / slotPx) + 1;
    if (candles.length > maxCount) candles.shift();
    forming = newForming(price);
  }

  function drawCandle(c, x, y) {
    var up = c.close >= c.open;
    var color = up ? "rgba(56, 201, 193, 0.16)" : "rgba(239, 90, 110, 0.14)";
    var wickColor = up ? "rgba(56, 201, 193, 0.09)" : "rgba(239, 90, 110, 0.08)";

    ctx.strokeStyle = wickColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + candleW / 2, y(c.high));
    ctx.lineTo(x + candleW / 2, y(c.low));
    ctx.stroke();

    ctx.fillStyle = color;
    var yOpen = y(c.open);
    var yClose = y(c.close);
    var top = Math.min(yOpen, yClose);
    var h = Math.max(Math.abs(yClose - yOpen), 1.2);
    ctx.fillRect(x, top, candleW, h);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    var all = candles.concat([forming]);
    var vals = [];
    all.forEach(function (c) {
      vals.push(c.high, c.low);
    });
    var max = Math.max.apply(null, vals);
    var min = Math.min.apply(null, vals);
    var range = Math.max(max - min, 1);
    var padTop = H * 0.15;
    var padBottom = H * 0.15;
    var chartH = H - padTop - padBottom;

    function y(v) {
      return padTop + (1 - (v - min) / range) * chartH;
    }

    all.forEach(function (c, i) {
      var x = i * slotPx;
      drawCandle(c, x, y);
    });
  }

  var lastTs = 0;
  function loop(ts) {
    if (!lastTs) lastTs = ts;
    var dt = ts - lastTs;
    lastTs = ts;

    elapsed += dt;
    tickForming(dt);

    if (elapsed >= periodMs) {
      elapsed = 0;
      finalizeForming();
    }

    draw();
    if (!reduceMotion) requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
  if (!reduceMotion) requestAnimationFrame(loop);
})();
