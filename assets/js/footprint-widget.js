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
  var BAR_COL_W = 52;
  var LABEL_COL_W = 42;

  // Same palette as the other live-trade hero sections.
  var AMBER = "rgba(224, 168, 82, 0.75)";
  var UP_TEXT = "rgba(88, 214, 151, 0.9)";
  var DOWN_TEXT = "rgba(235, 110, 110, 0.9)";
  var DIM_TEXT = "rgba(233, 236, 243, 0.4)";

  // Each cell is split into a bid half and an ask half, each shaded from a
  // dark, desaturated base up to a hot color as its share of volume grows —
  // the same dark-to-hot heat scale the order-book widget uses, so a real
  // footprint table (light/dark patches by traded size) reads consistently
  // with the rest of the site rather than introducing a new palette.
  var ASK_HEAT = "35, 22, 24";
  var ASK_HOT  = "196, 96, 96";
  var BID_HEAT = "18, 30, 27";
  var BID_HOT  = "74, 176, 126";

  function heatColor(base, hot, t) {
    var b = base.split(",").map(Number);
    var h = hot.split(",").map(Number);
    var r = b[0] + (h[0] - b[0]) * t;
    var g = b[1] + (h[1] - b[1]) * t;
    var bl = b[2] + (h[2] - b[2]) * t;
    return "rgb(" + (r | 0) + "," + (g | 0) + "," + (bl | 0) + ")";
  }

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

    // Normalize each half's heat against the busiest single side across the
    // whole visible grid, so a quiet corner stays dark and only genuinely
    // heavy prints light up — the light/dark patches real footprint tables
    // show at a glance.
    var maxSide = 1e-9;
    visibleBars.forEach(function (bar) {
      levels.forEach(function (lvl) {
        var cell = bar.levels[lvl];
        if (!cell) return;
        if (cell.bid > maxSide) maxSide = cell.bid;
        if (cell.ask > maxSide) maxSide = cell.ask;
      });
    });

    var halfW = (BAR_COL_W - 1) / 2;
    var gridBottom = y0 + headerH + levels.length * rowH;

    visibleBars.forEach(function (bar, bIdx) {
      var bx = gridX0 + bIdx * BAR_COL_W;
      levels.forEach(function (lvl, r) {
        var ry = y0 + headerH + r * rowH;
        var cell = bar.levels[lvl];
        var bidT = cell ? Math.min(1, cell.bid / maxSide) : 0;
        var askT = cell ? Math.min(1, cell.ask / maxSide) : 0;

        ctx.fillStyle = heatColor(BID_HEAT, BID_HOT, bidT);
        ctx.fillRect(bx, ry, halfW, rowH - 1);
        ctx.fillStyle = heatColor(ASK_HEAT, ASK_HOT, askT);
        ctx.fillRect(bx + halfW, ry, halfW, rowH - 1);

        if (!cell) return;
        ctx.font = fontPx + "px " + MONO_FONT;
        var ty = ry + rowH - rowH * 0.32;
        ctx.textAlign = "left";
        ctx.fillStyle = cell.bid > 0 ? UP_TEXT : DIM_TEXT;
        ctx.fillText(fmtVol(cell.bid), bx + 3, ty);
        ctx.textAlign = "right";
        ctx.fillStyle = cell.ask > 0 ? DOWN_TEXT : DIM_TEXT;
        ctx.fillText(fmtVol(cell.ask), bx + BAR_COL_W - 4, ty);
      });

      // Point-of-control cell for this bar, boxed in amber like a real
      // footprint chart's POC marker rather than washed in a fill color.
      if (bar.poc != null && levels.indexOf(bar.poc) !== -1) {
        var pocR = levels.indexOf(bar.poc);
        ctx.strokeStyle = AMBER;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(bx + 0.75, y0 + headerH + pocR * rowH + 0.75, BAR_COL_W - 2.5, rowH - 2.5);
      }
    });

    // Table grid: a visible ruled line under every row and between every
    // bar column, so the whole thing reads as a table rather than a loose
    // scatter of colored rectangles.
    ctx.strokeStyle = "rgba(10, 12, 18, 0.55)";
    ctx.lineWidth = 1;
    for (var r2 = 0; r2 <= levels.length; r2++) {
      var ly = y0 + headerH + r2 * rowH;
      ctx.beginPath();
      ctx.moveTo(gridX0, ly + 0.5);
      ctx.lineTo(gridX0 + visibleBars.length * BAR_COL_W, ly + 0.5);
      ctx.stroke();
    }
    for (var c2 = 0; c2 <= visibleBars.length; c2++) {
      var lx = gridX0 + c2 * BAR_COL_W;
      ctx.beginPath();
      ctx.moveTo(lx + 0.5, y0 + headerH);
      ctx.lineTo(lx + 0.5, gridBottom);
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(224, 168, 82, 0.2)";
    ctx.beginPath();
    ctx.moveTo(gridX0 - 1.5, y0 + headerH);
    ctx.lineTo(gridX0 - 1.5, y0 + panelH);
    ctx.stroke();

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
