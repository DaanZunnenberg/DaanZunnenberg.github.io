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
  var candles = [];
  var price = 100;

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.ceil(W / (candleW + gap)) + 2;
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

  function draw() {
    ctx.clearRect(0, 0, W, H);

    var vals = [];
    candles.forEach(function (c) {
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

    candles.forEach(function (c, i) {
      var x = i * (candleW + gap);
      var up = c.close >= c.open;
      var color = up ? "rgba(56, 201, 193, 0.30)" : "rgba(239, 90, 110, 0.26)";
      var wickColor = up ? "rgba(56, 201, 193, 0.18)" : "rgba(239, 90, 110, 0.16)";

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
    });
  }

  var lastTick = 0;
  var TICK_MS = 900;
  function loop(ts) {
    if (!lastTick) lastTick = ts;
    if (ts - lastTick > TICK_MS) {
      lastTick = ts;
      candles.shift();
      candles.push(makeCandle());
    }
    draw();
    if (!reduceMotion) requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
  if (!reduceMotion) requestAnimationFrame(loop);
})();
