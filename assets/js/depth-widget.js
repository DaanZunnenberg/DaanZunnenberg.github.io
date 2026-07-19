(function () {
  var canvas = document.getElementById("depth-widget-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var MONO_FONT = "'SF Mono', Menlo, Consolas, monospace";
  var POLL_MS = 4000;

  var BID_LINE = "rgba(60, 255, 94, 0.85)";
  var BID_FILL = "rgba(60, 255, 94, 0.12)";
  var ASK_LINE = "rgba(255, 91, 77, 0.85)";
  var ASK_FILL = "rgba(255, 91, 77, 0.12)";

  var SYMBOLS = [
    { key: "BTCUSDT", label: "BTC/USDT", bids: [], asks: [] },
    { key: "ETHUSDT", label: "ETH/USDT", bids: [], asks: [] }
  ];

  var live = false;

  function cumulative(levels, desc) {
    var out = [];
    var running = 0;
    var sorted = levels.slice().sort(function (a, b) { return desc ? b[0] - a[0] : a[0] - b[0]; });
    sorted.forEach(function (lvl) {
      running += lvl[1];
      out.push([lvl[0], running]);
    });
    return desc ? out.reverse() : out;
  }

  function fetchDepth(sym) {
    fetch("https://api.binance.com/api/v3/depth?symbol=" + sym.key + "&limit=100")
      .then(function (res) {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then(function (data) {
        sym.bids = cumulative(data.bids.map(function (l) { return [+l[0], +l[1]]; }), true);
        sym.asks = cumulative(data.asks.map(function (l) { return [+l[0], +l[1]]; }), false);
        live = true;
      })
      .catch(function () {});
  }

  function resize() {
    W = container.clientWidth;
    H = container.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawPanel(sym, rect) {
    var x0 = rect.x, y0 = rect.y, w = rect.w, h = rect.h;
    var headerH = 22;
    var plotY = y0 + headerH;
    var plotH = h - headerH;

    ctx.strokeStyle = "rgba(224, 168, 82, 0.16)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x0 + 0.5, y0 + 0.5, w - 1, h - 1);
    ctx.fillStyle = "rgba(224, 168, 82, 0.07)";
    ctx.fillRect(x0, y0, w, headerH);

    ctx.font = "10px " + MONO_FONT;
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(224, 168, 82, 0.75)";
    ctx.fillText(sym.label.toUpperCase() + " · ORDER BOOK DEPTH · " + (live ? "LIVE" : "SIM"), x0 + 6, y0 + 15);

    if (!sym.bids.length || !sym.asks.length) return;

    var allLevels = sym.bids.concat(sym.asks);
    var minP = Math.min.apply(null, allLevels.map(function (l) { return l[0]; }));
    var maxP = Math.max.apply(null, allLevels.map(function (l) { return l[0]; }));
    var maxQ = Math.max.apply(null, allLevels.map(function (l) { return l[1]; }));
    if (maxP === minP || maxQ === 0) return;

    function px(price) { return x0 + ((price - minP) / (maxP - minP)) * w; }
    function py(qty) { return plotY + plotH - (qty / maxQ) * plotH * 0.92; }

    function drawSide(levels, lineColor, fillColor, floorY) {
      ctx.beginPath();
      ctx.moveTo(px(levels[0][0]), floorY);
      levels.forEach(function (lvl) { ctx.lineTo(px(lvl[0]), py(lvl[1])); });
      ctx.lineTo(px(levels[levels.length - 1][0]), floorY);
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();

      ctx.beginPath();
      levels.forEach(function (lvl, i) {
        var x = px(lvl[0]), y = py(lvl[1]);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }

    var floor = plotY + plotH;
    drawSide(sym.bids, BID_LINE, BID_FILL, floor);
    drawSide(sym.asks, ASK_LINE, ASK_FILL, floor);

    var mid = (sym.bids[sym.bids.length - 1][0] + sym.asks[0][0]) / 2;
    var midX = px(mid);
    ctx.strokeStyle = "rgba(233, 236, 243, 0.25)";
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(midX, plotY);
    ctx.lineTo(midX, floor);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var margin = 0, gap = 0;
    var panelH = (H - margin * 2 - gap) / 2;
    SYMBOLS.forEach(function (sym, i) {
      drawPanel(sym, { x: margin, y: margin + i * (panelH + gap), w: W - margin * 2, h: panelH });
    });
  }

  function loop() {
    draw();
    if (!reduceMotion) requestAnimationFrame(loop);
  }

  function pollAll() {
    SYMBOLS.forEach(fetchDepth);
  }

  window.addEventListener("resize", resize);
  resize();
  pollAll();
  setInterval(pollAll, POLL_MS);

  if (!reduceMotion) requestAnimationFrame(loop);
  else setInterval(draw, POLL_MS);
})();
