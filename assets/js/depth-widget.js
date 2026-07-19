(function () {
  var canvas = document.getElementById("depth-widget-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var MONO_FONT = "'SF Mono', Menlo, Consolas, monospace";
  var ROWS_HALF = 5; // price levels shown above / below mid — must be a valid Binance partial-depth size (5, 10, 20)

  var ASK_HEAT = "60, 25, 30";   // deep red base
  var ASK_HOT  = "255, 91, 77";  // bright red for the biggest asks
  var BID_HEAT = "18, 46, 36";   // deep green base
  var BID_HOT  = "60, 255, 94";  // bright green for the biggest bids
  var MID_LINE = "rgba(233, 236, 243, 0.35)";

  var SYMBOLS = [
    { key: "btcusdt", label: "BTC/USDT", bids: [], asks: [] },
    { key: "ethusdt", label: "ETH/USDT", bids: [], asks: [] },
    { key: "solusdt", label: "SOL/USDT", bids: [], asks: [] }
  ];

  var live = false;

  function updateBook(sym, data) {
    // Binance depth20 levels arrive best-first: bids descending, asks ascending.
    sym.bids = data.bids.slice(0, ROWS_HALF).map(function (l) { return [+l[0], +l[1]]; });
    sym.asks = data.asks.slice(0, ROWS_HALF).map(function (l) { return [+l[0], +l[1]]; });
  }

  function seedSnapshot(sym) {
    fetch("https://api.binance.com/api/v3/depth?symbol=" + sym.key.toUpperCase() + "&limit=" + ROWS_HALF)
      .then(function (res) {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then(function (data) { updateBook(sym, data); })
      .catch(function () {});
  }

  function connectSocket() {
    var streams = SYMBOLS.map(function (s) { return s.key + "@depth" + ROWS_HALF + "@100ms"; }).join("/");
    var ws;
    try {
      ws = new WebSocket("wss://stream.binance.com:9443/stream?streams=" + streams);
    } catch (e) {
      return;
    }

    var connectTimeout = setTimeout(function () {
      try { ws.close(); } catch (e) {}
    }, 5000);

    ws.onopen = function () {
      clearTimeout(connectTimeout);
      live = true;
    };

    ws.onmessage = function (evt) {
      var msg;
      try {
        msg = JSON.parse(evt.data);
      } catch (e) {
        return;
      }
      if (!msg.data || !msg.data.bids) return;
      var streamSymbol = (msg.stream || "").split("@")[0];
      var sym = SYMBOLS.filter(function (s) { return s.key === streamSymbol; })[0];
      if (!sym) return;
      updateBook(sym, msg.data);
    };
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

  function fmtQty(v) {
    if (v >= 1000) return (v / 1000).toFixed(1) + "k";
    if (v >= 10) return v.toFixed(1);
    return v.toFixed(2);
  }
  function fmtPrice(v) {
    return v >= 100 ? v.toFixed(1) : v.toFixed(3);
  }

  function heatColor(base, hot, t) {
    var b = base.split(",").map(Number);
    var h = hot.split(",").map(Number);
    var r = b[0] + (h[0] - b[0]) * t;
    var g = b[1] + (h[1] - b[1]) * t;
    var bl = b[2] + (h[2] - b[2]) * t;
    return "rgb(" + (r | 0) + "," + (g | 0) + "," + (bl | 0) + ")";
  }

  function drawPanel(sym, rect) {
    var x0 = rect.x, y0 = rect.y, w = rect.w, h = rect.h;
    var headerH = 20;

    ctx.strokeStyle = "rgba(224, 168, 82, 0.14)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x0 + 0.5, y0 + 0.5, w - 1, h - 1);
    ctx.fillStyle = "rgba(224, 168, 82, 0.07)";
    ctx.fillRect(x0, y0, w, headerH);

    ctx.font = "10px " + MONO_FONT;
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(224, 168, 82, 0.8)";
    ctx.fillText(sym.label + (live ? "  ·  LIVE" : "  ·  SIM"), x0 + 6, y0 + 14);

    if (!sym.bids.length || !sym.asks.length) return;

    var rows = h - headerH;
    var rowH = rows / (ROWS_HALF * 2);
    var maxQty = Math.max.apply(null, sym.bids.concat(sym.asks).map(function (l) { return l[1]; }));
    if (maxQty === 0) return;

    // Asks: highest price first, stacked top-down toward mid.
    var asksTop = sym.asks.slice().sort(function (a, b) { return b[0] - a[0]; });
    asksTop.forEach(function (lvl, i) {
      var ry = y0 + headerH + i * rowH;
      var t = lvl[1] / maxQty;
      var barW = Math.max(6, t * w);
      ctx.fillStyle = heatColor(ASK_HEAT, ASK_HOT, t);
      ctx.globalAlpha = 0.85;
      ctx.fillRect(x0, ry, barW, rowH - 1);
      ctx.globalAlpha = 1;

      ctx.font = "10px " + MONO_FONT;
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(255, 200, 195, 0.9)";
      ctx.fillText(fmtPrice(lvl[0]), x0 + 5, ry + rowH - rowH * 0.32);
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(233, 236, 243, 0.75)";
      ctx.fillText(fmtQty(lvl[1]), x0 + w - 5, ry + rowH - rowH * 0.32);
    });

    var midY = y0 + headerH + ROWS_HALF * rowH;
    ctx.strokeStyle = MID_LINE;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x0, midY);
    ctx.lineTo(x0 + w, midY);
    ctx.stroke();

    // Bids: highest price first (closest to mid), stacked downward.
    var bidsTop = sym.bids.slice().sort(function (a, b) { return b[0] - a[0]; });
    bidsTop.forEach(function (lvl, i) {
      var ry = midY + i * rowH;
      var t = lvl[1] / maxQty;
      var barW = Math.max(6, t * w);
      ctx.fillStyle = heatColor(BID_HEAT, BID_HOT, t);
      ctx.globalAlpha = 0.85;
      ctx.fillRect(x0, ry, barW, rowH - 1);
      ctx.globalAlpha = 1;

      ctx.font = "10px " + MONO_FONT;
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(195, 255, 205, 0.9)";
      ctx.fillText(fmtPrice(lvl[0]), x0 + 5, ry + rowH - rowH * 0.32);
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(233, 236, 243, 0.75)";
      ctx.fillText(fmtQty(lvl[1]), x0 + w - 5, ry + rowH - rowH * 0.32);
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var gap = 8;
    var colW = (W - gap * (SYMBOLS.length - 1)) / SYMBOLS.length;
    SYMBOLS.forEach(function (sym, i) {
      drawPanel(sym, { x: i * (colW + gap), y: 0, w: colW, h: H });
    });
  }

  function loop() {
    draw();
    if (!reduceMotion) requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize);
  resize();
  SYMBOLS.forEach(seedSnapshot);
  connectSocket();

  if (!reduceMotion) requestAnimationFrame(loop);
  else setInterval(draw, 500);
})();
