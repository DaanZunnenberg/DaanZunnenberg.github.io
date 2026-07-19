(function () {
  var canvas = document.getElementById("trade-process-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Three live time-and-sales tapes (ETH, BTC, SOL), side by side. Each row
  // is one real Binance spot trade: price, trade amount in the coin's own
  // units, and the time it printed. Tapes advance independently — whichever
  // symbol is trading fastest fills in first.
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var MONO_FONT = "'SF Mono', Menlo, Consolas, monospace";
  var MAX_ROWS = 200;
  var FLASH_MS = 900;

  // Same ThinkOrSwim-inspired palette as the other live-trade hero sections.
  var AMBER = "rgba(224, 168, 82, 0.75)";
  var UP_TEXT = "rgba(88, 214, 151, 0.9)";
  var DOWN_TEXT = "rgba(235, 110, 110, 0.9)";
  var UP_BG = "88, 214, 151";
  var DOWN_BG = "235, 110, 110";
  var DIM_TEXT = "rgba(233, 236, 243, 0.4)";

  var SYMBOLS = [
    { key: "ethusdt", label: "ETH/USDT", priceDigits: 2, amountDigits: 4, rows: [], live: false, openPrice: null },
    { key: "btcusdt", label: "BTC/USDT", priceDigits: 2, amountDigits: 4, rows: [], live: false, openPrice: null },
    { key: "solusdt", label: "SOL/USDT", priceDigits: 3, amountDigits: 3, rows: [], live: false, openPrice: null }
  ];

  function fmtTime(ms) {
    var d = new Date(ms);
    return d.toTimeString().slice(0, 8) + "." + (d.getMilliseconds() + "").padStart(3, "0");
  }

  function fmtPrice(p, digits) {
    return p.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }

  function pushTrade(sym, time, price, qty, isSellerTaker, bornAt) {
    if (sym.openPrice == null) sym.openPrice = price;
    sym.rows.unshift({ time: time, price: price, qty: qty, isSellerTaker: isSellerTaker, bornAt: bornAt });
    if (sym.rows.length > MAX_ROWS) sym.rows.length = MAX_ROWS;
  }

  // Below this per-panel width, the tape gets too cramped to read — drop
  // the last symbol (and keep dropping) until what's left fits the phone.
  var MIN_PANEL_W = 190;
  var activeSymbols = SYMBOLS;

  function resize() {
    W = container.clientWidth;
    H = container.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var maxPanels = Math.max(1, Math.min(SYMBOLS.length, Math.floor(W / MIN_PANEL_W)));
    activeSymbols = SYMBOLS.slice(0, maxPanels);
  }

  var COLS = [
    { key: "price", label: "PRICE", w: 0.22, align: "right" },
    { key: "amount", label: "AMOUNT", w: 0.19, align: "right" },
    { key: "usd", label: "AMOUNT ($)", w: 0.30, align: "right" },
    { key: "time", label: "TIME", w: 0.29, align: "right" }
  ];

  function drawPanel(sym, rect, now) {
    var x0 = rect.x, y0 = rect.y, panelW = rect.w, panelH = rect.h;
    var headerH = 30;
    var colHeadH = 13;
    var rowH = Math.max(11, Math.min(16, (panelH - headerH - colHeadH) / Math.min(sym.rows.length || 1, 24)));
    var visible = Math.min(sym.rows.length, Math.floor((panelH - headerH - colHeadH) / rowH));

    ctx.fillStyle = "rgba(10, 12, 18, 0.35)";
    ctx.fillRect(x0, y0, panelW, panelH);
    ctx.strokeStyle = "rgba(224, 168, 82, 0.16)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x0 + 0.5, y0 + 0.5, panelW - 1, panelH - 1);

    // Ticker strip: symbol, last print, and session change — like a
    // quote header on a desk monitor, not just a table caption.
    ctx.fillStyle = "rgba(224, 168, 82, 0.09)";
    ctx.fillRect(x0, y0, panelW, headerH);
    ctx.fillStyle = AMBER;
    ctx.fillRect(x0, y0, 2, headerH);

    var last = sym.rows[0];
    var chgPct = last && sym.openPrice ? ((last.price - sym.openPrice) / sym.openPrice) * 100 : null;
    var chgUp = chgPct != null && chgPct >= 0;

    ctx.textAlign = "left";
    ctx.font = "bold 11px " + MONO_FONT;
    ctx.fillStyle = "rgba(233, 236, 243, 0.85)";
    ctx.fillText(sym.label, x0 + 8, y0 + 13);
    ctx.font = "9px " + MONO_FONT;
    ctx.fillStyle = "rgba(166, 175, 194, 0.55)";
    ctx.fillText("TIME & SALES", x0 + 8, y0 + 25);

    ctx.textAlign = "right";
    if (last) {
      ctx.font = "bold 11px " + MONO_FONT;
      ctx.fillStyle = chgUp ? UP_TEXT : DOWN_TEXT;
      ctx.fillText(fmtPrice(last.price, sym.priceDigits), x0 + panelW - 8, y0 + 13);
      ctx.font = "9px " + MONO_FONT;
      ctx.fillText((chgUp ? "▲ +" : "▼ ") + Math.abs(chgPct).toFixed(2) + "%", x0 + panelW - 8, y0 + 25);
    }
    ctx.textAlign = "left";
    ctx.font = "8px " + MONO_FONT;
    ctx.fillStyle = sym.live ? UP_TEXT : "rgba(166, 175, 194, 0.5)";
    ctx.fillText(sym.live ? "● LIVE" : "○ SNAPSHOT", x0 + 8, y0 + headerH + colHeadH - 4);

    var colX = [];
    var cursor = x0;
    COLS.forEach(function (c) { colX.push(cursor); cursor += c.w * panelW; });

    ctx.font = "8px " + MONO_FONT;
    COLS.forEach(function (c, i) {
      if (i === 0) return;
      ctx.textAlign = c.align;
      var tx = c.align === "right" ? colX[i] + c.w * panelW - 4 : colX[i] + 4;
      ctx.fillStyle = "rgba(166, 175, 194, 0.4)";
      ctx.fillText(c.label, tx, y0 + headerH + colHeadH - 4);
    });

    // Vertical rules between columns, like a real quote-board grid.
    ctx.strokeStyle = "rgba(224, 168, 82, 0.1)";
    ctx.lineWidth = 1;
    for (var g = 1; g < colX.length; g++) {
      ctx.beginPath();
      ctx.moveTo(colX[g] + 0.5, y0 + headerH);
      ctx.lineTo(colX[g] + 0.5, y0 + panelH);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(x0, y0 + headerH + colHeadH + 0.5);
    ctx.lineTo(x0 + panelW, y0 + headerH + colHeadH + 0.5);
    ctx.strokeStyle = "rgba(224, 168, 82, 0.16)";
    ctx.stroke();

    ctx.font = "10px " + MONO_FONT;
    for (var i = 0; i < visible; i++) {
      var row = sym.rows[i];
      var ry = y0 + headerH + colHeadH + i * rowH;
      var up = !row.isSellerTaker;
      var age = now - row.bornAt;
      var flashing = row.bornAt && age >= 0 && age < FLASH_MS;

      if (flashing) {
        var alpha = 1 - age / FLASH_MS;
        ctx.fillStyle = "rgba(" + (up ? UP_BG : DOWN_BG) + ", " + (0.16 * alpha).toFixed(2) + ")";
        ctx.fillRect(x0, ry, panelW, rowH);
      } else if (i % 2 === 0) {
        ctx.fillStyle = "rgba(233, 236, 243, 0.025)";
        ctx.fillRect(x0, ry, panelW, rowH);
      }

      var textColor = flashing ? (up ? UP_TEXT : DOWN_TEXT) : DIM_TEXT;
      var baseY = ry + rowH - rowH * 0.26;

      function cell(idx, text, color) {
        var c = COLS[idx];
        var tx = c.align === "right" ? colX[idx] + c.w * panelW - 4 : colX[idx] + 4;
        ctx.textAlign = c.align;
        ctx.fillStyle = color || textColor;
        ctx.fillText(text, tx, baseY);
      }

      var textColorUp = up ? UP_TEXT : DOWN_TEXT;
      var usdValue = row.price * row.qty;
      cell(0, (up ? "▲ " : "▼ ") + fmtPrice(row.price, sym.priceDigits), textColorUp);
      cell(1, row.qty.toFixed(sym.amountDigits));
      cell(2, "$" + usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
      cell(3, fmtTime(row.time), DIM_TEXT);
    }
  }

  function draw(now) {
    ctx.clearRect(0, 0, W, H);
    var panelW = W / activeSymbols.length;
    activeSymbols.forEach(function (sym, i) {
      drawPanel(sym, { x: i * panelW, y: 0, w: panelW, h: H }, now);
    });
  }

  function loop(ts) {
    draw(ts || performance.now());
    if (!reduceMotion) requestAnimationFrame(loop);
  }

  function connectSpotSocket() {
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
      if (!data) return;
      var key = stream.split("@")[0];
      var sym = SYMBOLS.filter(function (s) { return s.key === key; })[0];
      if (!sym) return;

      if (stream.indexOf("@aggTrade") !== -1) {
        if (!data.p || !data.q || !data.T) return;
        pushTrade(sym, data.T, +data.p, +data.q, !!data.m, performance.now());
      }
    };
  }

  function backfillSymbol(sym) {
    var upper = sym.key.toUpperCase();
    return fetch("https://api.binance.com/api/v3/aggTrades?symbol=" + upper + "&limit=" + MAX_ROWS)
      .then(function (res) { return res.json(); })
      .then(function (trades) {
        // Oldest first into pushTrade (which prepends), so the tape ends
        // up newest-first with no flash on the initial snapshot rows.
        trades.forEach(function (t) { pushTrade(sym, t.T, +t.p, +t.q, !!t.m, 0); });
      })
      .catch(function () {});
  }

  window.addEventListener("resize", resize);
  resize();

  Promise.all(SYMBOLS.map(backfillSymbol)).then(function () {
    connectSpotSocket();
  });

  if (!reduceMotion) requestAnimationFrame(loop);
  else draw(performance.now());
})();
