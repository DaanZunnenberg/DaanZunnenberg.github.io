(function () {
  var canvas = document.getElementById("orderflow-ladder-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // A DOM (depth-of-market) ladder fused with order flow for ETH, SOL, BTC:
  // each row is a price level, with the resting book size on either side
  // (from Binance's partial-depth stream, same as the homepage order-book
  // widget) and the executed buy/sell volume traded at that level since
  // load (from the aggTrade stream, same as the trade tape and footprint
  // chart) shown as a signed delta. One ladder per symbol, not two widgets
  // side by side.
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var MONO_FONT = "'SF Mono', Menlo, Consolas, monospace";
  var STREAM_DEPTH = 20; // Binance partial-depth stream size (must be 5, 10, or 20)
  var ROWS_HALF = 8;     // price rows shown above/below the mid price

  // Same ThinkOrSwim-inspired palette as the other live-trade hero sections.
  var AMBER = "rgba(224, 168, 82, 0.75)";
  var UP_TEXT = "rgba(88, 214, 151, 0.9)";
  var DOWN_TEXT = "rgba(235, 110, 110, 0.9)";
  var DIM_TEXT = "rgba(233, 236, 243, 0.4)";
  var MID_LINE = "rgba(233, 236, 243, 0.35)";

  // Dark-to-hot heat scale, same as the order-book and footprint widgets,
  // reused here for both the resting-book columns and the order-flow delta
  // column so the whole ladder reads with one consistent visual language.
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
    { key: "ethusdt", label: "ETH/USDT", tick: null, bookByTick: {}, tradesByTick: {}, cumDelta: 0, poc: null, pocVol: -1, bestBid: null, bestAsk: null, live: false },
    { key: "solusdt", label: "SOL/USDT", tick: null, bookByTick: {}, tradesByTick: {}, cumDelta: 0, poc: null, pocVol: -1, bestBid: null, bestAsk: null, live: false },
    { key: "btcusdt", label: "BTC/USDT", tick: null, bookByTick: {}, tradesByTick: {}, cumDelta: 0, poc: null, pocVol: -1, bestBid: null, bestAsk: null, live: false }
  ];

  var live = false;

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

  function fmtQty(v) {
    if (v >= 1000) return (v / 1000).toFixed(1) + "k";
    if (v >= 10) return v.toFixed(1);
    return v.toFixed(2);
  }

  function levelKey(sym, price) {
    return Math.round(price / sym.tick) * sym.tick;
  }

  function updateBook(sym, data) {
    if (!sym.tick) sym.tick = tickFor(+data.bids[0][0]);
    var byTick = {};
    data.bids.slice(0, STREAM_DEPTH).forEach(function (l) {
      var lvl = levelKey(sym, +l[0]);
      if (!byTick[lvl]) byTick[lvl] = { bid: 0, ask: 0 };
      byTick[lvl].bid += +l[1];
    });
    data.asks.slice(0, STREAM_DEPTH).forEach(function (l) {
      var lvl = levelKey(sym, +l[0]);
      if (!byTick[lvl]) byTick[lvl] = { bid: 0, ask: 0 };
      byTick[lvl].ask += +l[1];
    });
    sym.bookByTick = byTick;
    sym.bestBid = +data.bids[0][0];
    sym.bestAsk = +data.asks[0][0];
  }

  function addTrade(sym, price, qty, isSellerTaker) {
    if (!sym.tick) sym.tick = tickFor(price);
    var lvl = levelKey(sym, price);
    var cell = sym.tradesByTick[lvl];
    if (!cell) {
      cell = { buy: 0, sell: 0 };
      sym.tradesByTick[lvl] = cell;
    }
    if (isSellerTaker) { cell.sell += qty; sym.cumDelta -= qty; }
    else { cell.buy += qty; sym.cumDelta += qty; }

    var total = cell.buy + cell.sell;
    if (total > sym.pocVol) { sym.pocVol = total; sym.poc = lvl; }
  }

  function seedSnapshot(sym) {
    fetch("https://api.binance.com/api/v3/depth?symbol=" + sym.key.toUpperCase() + "&limit=" + STREAM_DEPTH)
      .then(function (res) { if (!res.ok) throw new Error("bad response"); return res.json(); })
      .then(function (data) { updateBook(sym, data); })
      .catch(function () {});
  }

  function backfillTrades(sym) {
    return fetch("https://api.binance.com/api/v3/aggTrades?symbol=" + sym.key.toUpperCase() + "&limit=1000")
      .then(function (res) { return res.json(); })
      .then(function (trades) {
        trades.forEach(function (t) { addTrade(sym, +t.p, +t.q, !!t.m); });
      })
      .catch(function () {});
  }

  function connectBookSocket() {
    var streams = SYMBOLS.map(function (s) { return s.key + "@depth" + STREAM_DEPTH + "@100ms"; }).join("/");
    var ws;
    try {
      ws = new WebSocket("wss://stream.binance.com:9443/stream?streams=" + streams);
    } catch (e) {
      return;
    }
    var connectTimeout = setTimeout(function () { try { ws.close(); } catch (e) {} }, 5000);
    ws.onopen = function () { clearTimeout(connectTimeout); live = true; };
    ws.onmessage = function (evt) {
      var msg;
      try { msg = JSON.parse(evt.data); } catch (e) { return; }
      if (!msg.data || !msg.data.bids) return;
      var streamSymbol = (msg.stream || "").split("@")[0];
      var sym = SYMBOLS.filter(function (s) { return s.key === streamSymbol; })[0];
      if (!sym) return;
      updateBook(sym, msg.data);
    };
  }

  function connectTradeSocket() {
    var streams = SYMBOLS.map(function (s) { return s.key + "@aggTrade"; }).join("/");
    var ws;
    try {
      ws = new WebSocket("wss://stream.binance.com:9443/stream?streams=" + streams);
    } catch (e) {
      return;
    }
    var connectTimeout = setTimeout(function () { try { ws.close(); } catch (e) {} }, 6000);
    ws.onopen = function () { clearTimeout(connectTimeout); SYMBOLS.forEach(function (s) { s.live = true; }); };
    ws.onmessage = function (evt) {
      var msg;
      try { msg = JSON.parse(evt.data); } catch (e) { return; }
      var stream = msg.stream || "", data = msg.data;
      if (!data || !data.p || !data.q) return;
      var key = stream.split("@")[0];
      var sym = SYMBOLS.filter(function (s) { return s.key === key; })[0];
      if (!sym) return;
      addTrade(sym, +data.p, +data.q, !!data.m);
    };
  }

  // Panels are never dropped — all three assets are the point of the
  // ladder. On mobile the hero scrolls horizontally instead (`.hero-scroll`
  // in style.css), same mechanism as the research trade tape.
  var MIN_PANEL_W = 3 * 190;

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

  var COLS = [
    { key: "flow", w: 0.30, align: "center" },
    { key: "bid", w: 0.22, align: "right" },
    { key: "price", w: 0.20, align: "center" },
    { key: "ask", w: 0.28, align: "left" }
  ];

  function drawPanel(sym, rect) {
    var x0 = rect.x, y0 = rect.y, panelW = rect.w, panelH = rect.h;
    var headerH = 30, colHeadH = 12;

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

    ctx.textAlign = "left";
    ctx.font = "bold 11px " + MONO_FONT;
    ctx.fillStyle = "rgba(233, 236, 243, 0.85)";
    ctx.fillText(sym.label, x0 + 8, y0 + 13);
    ctx.font = "8px " + MONO_FONT;
    ctx.fillStyle = sym.live && live ? UP_TEXT : "rgba(166, 175, 194, 0.5)";
    ctx.fillText(sym.live && live ? "● LIVE" : "○ SIM", x0 + 8, y0 + 25);

    ctx.textAlign = "right";
    ctx.font = "bold 10px " + MONO_FONT;
    ctx.fillStyle = sym.cumDelta >= 0 ? UP_TEXT : DOWN_TEXT;
    ctx.fillText((sym.cumDelta >= 0 ? "Δ +" : "Δ ") + fmtQty(Math.abs(sym.cumDelta)), x0 + panelW - 8, y0 + 13);

    var totalBid = 0, totalAsk = 0;
    Object.keys(sym.bookByTick).forEach(function (k) {
      totalBid += sym.bookByTick[k].bid;
      totalAsk += sym.bookByTick[k].ask;
    });
    var imb = totalBid + totalAsk > 0 ? totalBid / (totalBid + totalAsk) : 0.5;
    ctx.font = "8px " + MONO_FONT;
    ctx.fillStyle = "rgba(166, 175, 194, 0.55)";
    ctx.fillText("IMB " + (imb * 100).toFixed(0) + "% BID", x0 + panelW - 8, y0 + 25);

    if (!sym.bestBid || !sym.bestAsk || !sym.tick) { ctx.restore(); return; }

    var colX = [];
    var cursor = x0;
    COLS.forEach(function (c) { colX.push(cursor); cursor += c.w * panelW; });

    ["FLOW Δ", "BID", "PRICE", "ASK"].forEach(function (label, i) {
      ctx.font = "8px " + MONO_FONT;
      ctx.textAlign = COLS[i].align === "left" ? "left" : COLS[i].align === "right" ? "right" : "center";
      var tx = COLS[i].align === "right" ? colX[i] + COLS[i].w * panelW - 4
        : COLS[i].align === "left" ? colX[i] + 4
        : colX[i] + (COLS[i].w * panelW) / 2;
      ctx.fillStyle = "rgba(166, 175, 194, 0.4)";
      ctx.fillText(label, tx, y0 + headerH + colHeadH - 3);
    });

    var mid = (sym.bestBid + sym.bestAsk) / 2;
    var centerTick = Math.round(mid / sym.tick) * sym.tick;
    var digits = digitsForTick(sym.tick);

    var rowsTop = y0 + headerH + colHeadH;
    var rowsH = panelH - headerH - colHeadH;
    var rowCount = ROWS_HALF * 2 + 1;
    var rowH = rowsH / rowCount;
    var fontPx = rowH < 15 ? 8 : 9.5;

    var maxBook = 1e-9, maxFlow = 1e-9;
    for (var i0 = -ROWS_HALF; i0 <= ROWS_HALF; i0++) {
      var lvl0 = centerTick + i0 * sym.tick;
      var book0 = sym.bookByTick[lvl0];
      if (book0) { if (book0.bid > maxBook) maxBook = book0.bid; if (book0.ask > maxBook) maxBook = book0.ask; }
      var t0 = sym.tradesByTick[lvl0];
      if (t0) { var d0 = Math.abs(t0.buy - t0.sell); if (d0 > maxFlow) maxFlow = d0; }
    }

    for (var i = -ROWS_HALF; i <= ROWS_HALF; i++) {
      var lvl = centerTick + i * sym.tick;
      var ry = rowsTop + (i + ROWS_HALF) * rowH;
      var isMid = i === 0;
      var isPoc = sym.poc === lvl;

      if (isMid) {
        ctx.fillStyle = "rgba(224, 168, 82, 0.1)";
        ctx.fillRect(x0, ry, panelW, rowH - 1);
      } else if ((i + ROWS_HALF) % 2 === 0) {
        ctx.fillStyle = "rgba(233, 236, 243, 0.02)";
        ctx.fillRect(x0, ry, panelW, rowH - 1);
      }

      var book = sym.bookByTick[lvl];
      var bidSize = book ? book.bid : 0;
      var askSize = book ? book.ask : 0;
      var flow = sym.tradesByTick[lvl];
      var flowDelta = flow ? flow.buy - flow.sell : 0;

      // Order-flow delta cell: heat-tinted by which side dominated at this
      // price since load, same green/red heat scale as the resting-book
      // columns so live depth and executed flow read as one instrument.
      var flowT = Math.min(1, Math.abs(flowDelta) / maxFlow);
      ctx.fillStyle = flowDelta >= 0 ? heatColor(BID_HEAT, BID_HOT, flowT * 0.7) : heatColor(ASK_HEAT, ASK_HOT, flowT * 0.7);
      ctx.fillRect(colX[0] + 2, ry + 1, COLS[0].w * panelW - 4, rowH - 3);
      if (flow) {
        ctx.font = fontPx + "px " + MONO_FONT;
        ctx.textAlign = "center";
        ctx.fillStyle = flowDelta >= 0 ? UP_TEXT : DOWN_TEXT;
        ctx.fillText((flowDelta >= 0 ? "+" : "") + fmtQty(flowDelta), colX[0] + (COLS[0].w * panelW) / 2, ry + rowH - rowH * 0.3);
      }

      // Resting book columns — same dark-to-hot heat scale as the
      // homepage depth widget.
      var bidT = bidSize / maxBook;
      ctx.fillStyle = heatColor(BID_HEAT, BID_HOT, bidT);
      ctx.fillRect(colX[1], ry + 1, COLS[1].w * panelW - 2, rowH - 3);
      if (bidSize > 0) {
        ctx.font = fontPx + "px " + MONO_FONT;
        ctx.textAlign = "right";
        ctx.fillStyle = "rgba(195, 255, 205, 0.9)";
        ctx.fillText(fmtQty(bidSize), colX[1] + COLS[1].w * panelW - 5, ry + rowH - rowH * 0.3);
      }

      var askT = askSize / maxBook;
      ctx.fillStyle = heatColor(ASK_HEAT, ASK_HOT, askT);
      ctx.fillRect(colX[3], ry + 1, COLS[3].w * panelW - 2, rowH - 3);
      if (askSize > 0) {
        ctx.font = fontPx + "px " + MONO_FONT;
        ctx.textAlign = "left";
        ctx.fillStyle = "rgba(255, 200, 195, 0.9)";
        ctx.fillText(fmtQty(askSize), colX[3] + 5, ry + rowH - rowH * 0.3);
      }

      // Price column, boxed in amber at the point of control.
      ctx.font = (isMid ? "bold " : "") + fontPx + "px " + MONO_FONT;
      ctx.textAlign = "center";
      ctx.fillStyle = isMid ? AMBER : "rgba(233, 236, 243, 0.75)";
      ctx.fillText(lvl.toFixed(digits), colX[2] + (COLS[2].w * panelW) / 2, ry + rowH - rowH * 0.3);
      if (isPoc) {
        ctx.strokeStyle = AMBER;
        ctx.lineWidth = 1.25;
        ctx.strokeRect(colX[2] + 2, ry + 1.5, COLS[2].w * panelW - 4, rowH - 4);
      }
    }

    // Mid line and ruled row separators, so the ladder reads as a table
    // rather than a stack of loose bars.
    ctx.strokeStyle = MID_LINE;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x0, rowsTop + ROWS_HALF * rowH);
    ctx.lineTo(x0 + panelW, rowsTop + ROWS_HALF * rowH);
    ctx.stroke();

    ctx.strokeStyle = "rgba(10, 12, 18, 0.4)";
    for (var r = 0; r <= rowCount; r++) {
      var ly = rowsTop + r * rowH;
      ctx.beginPath();
      ctx.moveTo(x0, ly + 0.5);
      ctx.lineTo(x0 + panelW, ly + 0.5);
      ctx.stroke();
    }
    [1, 2, 3].forEach(function (i) {
      ctx.beginPath();
      ctx.moveTo(colX[i] + 0.5, rowsTop);
      ctx.lineTo(colX[i] + 0.5, rowsTop + rowCount * rowH);
      ctx.strokeStyle = "rgba(224, 168, 82, 0.1)";
      ctx.stroke();
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
  SYMBOLS.forEach(seedSnapshot);
  Promise.all(SYMBOLS.map(backfillTrades)).then(connectTradeSocket);
  connectBookSocket();

  if (!reduceMotion) requestAnimationFrame(loop);
  else setInterval(draw, 500);
})();
