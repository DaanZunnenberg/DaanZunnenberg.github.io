(function () {
  var canvas = document.getElementById("footprint-widget-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Order-flow footprint chart for ETH, SOL, BTC: each column is a fixed
  // time bar, each row within it a price level, and each cell shows the
  // aggressive buy volume (bid side, left) against the aggressive sell
  // volume (ask side, right) that traded at that level during that bar —
  // built from the same real Binance aggTrade stream the trade tape uses,
  // just bucketed by price instead of listed trade-by-trade.
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var MONO_FONT = "'SF Mono', Menlo, Consolas, monospace";
  var BAR_MS = 5000;   // width of one footprint bar
  var MAX_BARS = 60;   // bars kept in memory per symbol
  var MAX_ROWS = 11;   // price rows shown per panel, centered on the latest price
  var BAR_COL_W = 40;
  var LABEL_COL_W = 42;

  // Same palette as the other live-trade hero sections.
  var AMBER = "rgba(224, 168, 82, 0.75)";
  var AMBER_BG = "rgba(224, 168, 82, 0.09)";
  var UP_TEXT = "rgba(88, 214, 151, 0.9)";
  var DOWN_TEXT = "rgba(235, 110, 110, 0.9)";
  var UP_BG = "88, 214, 151";
  var DOWN_BG = "235, 110, 110";
  var DIM_TEXT = "rgba(233, 236, 243, 0.4)";

  var SYMBOLS = [
    { key: "ethusdt", label: "ETH/USDT", tick: null, bars: [], live: false },
    { key: "solusdt", label: "SOL/USDT", tick: null, bars: [], live: false },
    { key: "btcusdt", label: "BTC/USDT", tick: null, bars: [], live: false }
  ];

  function tickFor(spot) {
    var raw = spot * 0.0004;
    var mag = Math.pow(10, Math.floor(Math.log10(raw)));
    var norm = raw / mag;
    var mult = norm < 1.5 ? 1 : norm < 3.5 ? 2.5 : norm < 7.5 ? 5 : 10;
    return mult * mag;
  }

  function digitsForTick(tick) {
    if (tick >= 1) return 0;
    if (tick >= 0.1) return 1;
    return 2;
  }

  function fmtVol(v) {
    if (v >= 1000) return (v / 1000).toFixed(1) + "k";
    if (v >= 10) return v.toFixed(1);
    return v.toFixed(2);
  }

  function barStart(t) {
    return Math.floor(t / BAR_MS) * BAR_MS;
  }

  function ensureBar(sym, start) {
    var last = sym.bars[sym.bars.length - 1];
    if (last && last.start === start) return last;
    var bar = { start: start, levels: {}, poc: null };
    sym.bars.push(bar);
    if (sym.bars.length > MAX_BARS) sym.bars.shift();
    return bar;
  }

  function addTrade(sym, time, price, qty, isSellerTaker) {
    if (!sym.tick) sym.tick = tickFor(price);
    var bar = ensureBar(sym, barStart(time));
    var lvl = Math.round(price / sym.tick) * sym.tick;
    var cell = bar.levels[lvl];
    if (!cell) {
      cell = { bid: 0, ask: 0 };
      bar.levels[lvl] = cell;
    }
    if (isSellerTaker) cell.ask += qty; else cell.bid += qty;

    var pocCell = bar.poc == null ? null : bar.levels[bar.poc];
    var pocVol = pocCell ? pocCell.bid + pocCell.ask : -1;
    if (cell.bid + cell.ask > pocVol) bar.poc = lvl;

    bar.lastPrice = price;
  }

  function backfillSymbol(sym) {
    var upper = sym.key.toUpperCase();
    return fetch("https://api.binance.com/api/v3/aggTrades?symbol=" + upper + "&limit=1000")
      .then(function (res) { return res.json(); })
      .then(function (trades) {
        trades.forEach(function (t) { addTrade(sym, t.T, +t.p, +t.q, !!t.m); });
      })
      .catch(function () {});
  }

  function connectSocket() {
    var streams = SYMBOLS.map(function (s) { return s.key + "@aggTrade"; });
    var ws;
    try {
      ws = new WebSocket("wss://stream.binance.com:9443/stream?streams=" + streams.join("/"));
    } catch (e) {
      return;
    }

    var connectTimeout = setTimeout(function () { try { ws.close(); } catch (e) {} }, 6000);

    ws.onopen = function () {
      clearTimeout(connectTimeout);
      SYMBOLS.forEach(function (s) { s.live = true; });
    };

    ws.onmessage = function (evt) {
      var msg;
      try { msg = JSON.parse(evt.data); } catch (e) { return; }
      var stream = msg.stream || "", data = msg.data;
      if (!data || !data.p || !data.q || !data.T) return;
      var key = stream.split("@")[0];
      var sym = SYMBOLS.filter(function (s) { return s.key === key; })[0];
      if (!sym) return;
      addTrade(sym, data.T, +data.p, +data.q, !!data.m);
    };
  }

  // Unlike the other multi-symbol hero widgets, panels are never dropped
  // here — all three assets are the point of the chart. On mobile the hero
  // scrolls horizontally instead (`.hero-scroll` in style.css), same
  // mechanism as the research trade tape.
  var MIN_PANEL_W = 3 * (LABEL_COL_W + BAR_COL_W * 3);

  function resize() {
    var containerW = container.clientWidth;
    H = container.clientHeight;
    var isMobile = window.matchMedia("(max-width: 640px)").matches;
    W = isMobile ? Math.max(containerW, MIN_PANEL_W) : containerW;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawPanel(sym, rect) {
    var x0 = rect.x, y0 = rect.y, panelW = rect.w, panelH = rect.h;
    var headerH = 22;

    ctx.save();
    ctx.beginPath();
    ctx.rect(x0, y0, panelW, panelH);
    ctx.clip();

    ctx.fillStyle = "rgba(10, 12, 18, 0.35)";
    ctx.fillRect(x0, y0, panelW, panelH);
    ctx.strokeStyle = "rgba(224, 168, 82, 0.16)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x0 + 0.5, y0 + 0.5, panelW - 1, panelH - 1);

    ctx.fillStyle = "rgba(224, 168, 82, 0.09)";
    ctx.fillRect(x0, y0, panelW, headerH);
    ctx.fillStyle = AMBER;
    ctx.fillRect(x0, y0, 2, headerH);

    var bars = sym.bars;
    var latestBar = bars[bars.length - 1];

    ctx.textAlign = "left";
    ctx.font = "bold 11px " + MONO_FONT;
    ctx.fillStyle = "rgba(233, 236, 243, 0.85)";
    ctx.fillText(sym.label, x0 + 8, y0 + 14);

    ctx.fillStyle = sym.live ? "rgba(88, 214, 151, 0.85)" : "rgba(233, 236, 243, 0.3)";
    ctx.beginPath();
    ctx.arc(x0 + 8 + ctx.measureText(sym.label).width + 8, y0 + 10, 2.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.textAlign = "right";
    if (latestBar) {
      var delta = 0;
      Object.keys(latestBar.levels).forEach(function (k) {
        var c = latestBar.levels[k];
        delta += c.bid - c.ask;
      });
      ctx.font = "bold 10px " + MONO_FONT;
      ctx.fillStyle = delta >= 0 ? UP_TEXT : DOWN_TEXT;
      ctx.fillText((delta >= 0 ? "Δ +" : "Δ ") + fmtVol(Math.abs(delta)), x0 + panelW - 8, y0 + 14);
    }

    if (!latestBar || !bars.length) { ctx.restore(); return; }

    var digits = digitsForTick(sym.tick);
    var gridX0 = x0 + LABEL_COL_W;
    var gridW = panelW - LABEL_COL_W;
    var numBars = Math.max(1, Math.floor(gridW / BAR_COL_W));
    var visibleBars = bars.slice(Math.max(0, bars.length - numBars));

    var levelsSet = {};
    visibleBars.forEach(function (bar) {
      Object.keys(bar.levels).forEach(function (k) { levelsSet[k] = true; });
    });
    var levels = Object.keys(levelsSet).map(Number);
    var lastPrice = latestBar.lastPrice;
    if (levels.length > MAX_ROWS) {
      levels.sort(function (a, b) { return Math.abs(a - lastPrice) - Math.abs(b - lastPrice); });
      levels = levels.slice(0, MAX_ROWS);
    }
    levels.sort(function (a, b) { return b - a; });
    if (!levels.length) { ctx.restore(); return; }

    var rowsH = panelH - headerH;
    var rowH = rowsH / levels.length;
    var fontPx = rowH < 13 ? 8 : 9;

    ctx.font = fontPx + "px " + MONO_FONT;
    levels.forEach(function (lvl, r) {
      var ry = y0 + headerH + r * rowH;
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(166, 175, 194, 0.5)";
      ctx.fillText(lvl.toFixed(digits), gridX0 - 4, ry + rowH - rowH * 0.28);
    });

    ctx.strokeStyle = "rgba(224, 168, 82, 0.14)";
    ctx.beginPath();
    ctx.moveTo(gridX0 - 2, y0 + headerH);
    ctx.lineTo(gridX0 - 2, y0 + panelH);
    ctx.stroke();

    visibleBars.forEach(function (bar, bIdx) {
      var bx = gridX0 + bIdx * BAR_COL_W;
      levels.forEach(function (lvl, r) {
        var ry = y0 + headerH + r * rowH;
        var cell = bar.levels[lvl];
        var isPoc = bar.poc === lvl;

        if (isPoc) {
          ctx.fillStyle = AMBER_BG;
          ctx.fillRect(bx, ry, BAR_COL_W - 1, rowH - 0.6);
        } else if (r % 2 === 0) {
          ctx.fillStyle = "rgba(233, 236, 243, 0.02)";
          ctx.fillRect(bx, ry, BAR_COL_W - 1, rowH - 0.6);
        }

        if (!cell) return;
        var dom = cell.bid - cell.ask;
        var domT = Math.min(1, Math.abs(dom) / Math.max(1e-9, cell.bid + cell.ask));
        var tint = dom >= 0
          ? "rgba(" + UP_BG + ", " + (0.1 + 0.18 * domT).toFixed(2) + ")"
          : "rgba(" + DOWN_BG + ", " + (0.1 + 0.18 * domT).toFixed(2) + ")";
        ctx.fillStyle = tint;
        ctx.fillRect(bx, ry, BAR_COL_W - 1, rowH - 0.6);

        ctx.font = fontPx + "px " + MONO_FONT;
        var ty = ry + rowH - rowH * 0.28;
        ctx.textAlign = "left";
        ctx.fillStyle = cell.bid > 0 ? UP_TEXT : DIM_TEXT;
        ctx.fillText(fmtVol(cell.bid), bx + 3, ty);
        ctx.textAlign = "right";
        ctx.fillStyle = cell.ask > 0 ? DOWN_TEXT : DIM_TEXT;
        ctx.fillText(fmtVol(cell.ask), bx + BAR_COL_W - 4, ty);
      });
    });

    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var panelW = W / SYMBOLS.length;
    SYMBOLS.forEach(function (sym, i) {
      drawPanel(sym, { x: i * panelW, y: 0, w: panelW, h: H });
    });
  }

  function loop() {
    draw();
    if (!reduceMotion) requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize);
  resize();

  Promise.all(SYMBOLS.map(backfillSymbol)).then(function () {
    connectSocket();
  });

  if (!reduceMotion) requestAnimationFrame(loop);
  else setInterval(draw, 1000);
})();
