(function () {
  var canvas = document.getElementById("trade-process-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Two live time-and-sales tapes (BTC and SOL), one stacked above the
  // other. Each row is one real Binance spot trade, enriched at the exact
  // instant it happens with a handful of microstructure quantities — all
  // point-in-time differences/impacts against the current book, never a
  // smoothed or rolling-window statistic:
  //   PRICE (Δ)     tick-to-tick price change, in bps
  //   QTY ($)       trade quantity, with its dollar notional
  //   BASIS bp      perp mid minus spot mid, in bps (cash-and-carry signal)
  //   SPREAD bp     the live quoted spread at that instant
  //   MICRO Δ       trade price minus the size-weighted microprice
  //   IMPACT %      trade qty as a percentage of the book's top-of-level size
  // Each tape is backfilled from REST on load, so both are fully populated
  // before either socket delivers a single live tick.
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
    { key: "btcusdt", label: "BTC/USDT", rows: [], lastPrice: null, book: {}, perpMid: null, live: false },
    { key: "solusdt", label: "SOL/USDT", rows: [], lastPrice: null, book: {}, perpMid: null, live: false }
  ];

  function fmtTime(ms) {
    var d = new Date(ms);
    return d.toTimeString().slice(0, 8) + "." + (d.getMilliseconds() + "").padStart(3, "0");
  }

  function fmtPrice(p) {
    return p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function signed(v, digits) {
    if (v == null || !isFinite(v)) return "—";
    return (v >= 0 ? "+" : "") + v.toFixed(digits);
  }

  // Every derived field is computed once, at push time, from the book/price
  // state as it stands at that instant — a snapshot, not a running average.
  function computeMetrics(sym, price, qty, isSellerTaker) {
    var prevPrice = sym.lastPrice != null ? sym.lastPrice : price;
    var tickBps = prevPrice ? ((price - prevPrice) / prevPrice) * 10000 : 0;
    var notional = price * qty;

    var bid = sym.book.bid, ask = sym.book.ask, bidQty = sym.book.bidQty, askQty = sym.book.askQty;
    var haveBook = bid != null && ask != null;
    var mid = haveBook ? (bid + ask) / 2 : price;
    var spreadBps = haveBook && mid ? ((ask - bid) / mid) * 10000 : null;
    var micro = haveBook && (bidQty + askQty) > 0 ? (bid * askQty + ask * bidQty) / (bidQty + askQty) : null;
    var microDev = micro != null ? price - micro : null;
    var basisBps = sym.perpMid != null && mid ? ((sym.perpMid - mid) / mid) * 10000 : null;

    var topQty = isSellerTaker ? bidQty : askQty;
    var impactPct = topQty ? Math.min(999, (qty / topQty) * 100) : null;

    sym.lastPrice = price;
    return { tickBps: tickBps, notional: notional, spreadBps: spreadBps, microDev: microDev, basisBps: basisBps, impactPct: impactPct };
  }

  function pushTrade(sym, time, price, qty, isSellerTaker, bornAt) {
    var m = computeMetrics(sym, price, qty, isSellerTaker);
    sym.rows.unshift({
      time: time, price: price, qty: qty, isSellerTaker: isSellerTaker, bornAt: bornAt,
      tickBps: m.tickBps, notional: m.notional, spreadBps: m.spreadBps,
      microDev: m.microDev, basisBps: m.basisBps, impactPct: m.impactPct
    });
    if (sym.rows.length > MAX_ROWS) sym.rows.length = MAX_ROWS;
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

  var COLS = [
    { key: "time", label: "TIME", w: 0.11, align: "left" },
    { key: "side", label: "SIDE", w: 0.07, align: "left" },
    { key: "price", label: "PRICE (Δbp)", w: 0.17, align: "right" },
    { key: "qty", label: "QTY ($)", w: 0.16, align: "right" },
    { key: "basis", label: "BASIS bp", w: 0.13, align: "right" },
    { key: "spread", label: "SPREAD bp", w: 0.12, align: "right" },
    { key: "micro", label: "MICRO Δ", w: 0.12, align: "right" },
    { key: "impact", label: "IMPACT %", w: 0.12, align: "right" }
  ];

  function drawPanel(sym, rect, now) {
    var x0 = rect.x, y0 = rect.y, panelW = rect.w, panelH = rect.h;
    var headerH = 22;
    var rowH = Math.max(11, Math.min(16, (panelH - headerH) / Math.min(sym.rows.length || 1, 24)));
    var visible = Math.min(sym.rows.length, Math.floor((panelH - headerH) / rowH));

    ctx.strokeStyle = "rgba(224, 168, 82, 0.16)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x0 + 0.5, y0 + 0.5, panelW - 1, panelH - 1);
    ctx.fillStyle = "rgba(224, 168, 82, 0.07)";
    ctx.fillRect(x0, y0, panelW, headerH);

    var colX = [];
    var cursor = x0;
    COLS.forEach(function (c) { colX.push(cursor); cursor += c.w * panelW; });

    ctx.font = "11px " + MONO_FONT;
    ctx.textAlign = "left";
    ctx.fillStyle = AMBER;
    ctx.fillText(sym.label + " · TIME & SALES · " + (sym.live ? "LIVE" : "SNAPSHOT"), x0 + 6, y0 + 14);

    COLS.forEach(function (c, i) {
      ctx.textAlign = c.align;
      var tx = c.align === "right" ? colX[i] + c.w * panelW - 6 : colX[i] + 6;
      ctx.font = "8px " + MONO_FONT;
      ctx.fillStyle = "rgba(166, 175, 194, 0.4)";
      ctx.fillText(c.label, tx, y0 + headerH - 5);
    });

    ctx.font = "10px " + MONO_FONT;
    for (var i = 0; i < visible; i++) {
      var row = sym.rows[i];
      var ry = y0 + headerH + i * rowH;
      var up = !row.isSellerTaker;
      var age = now - row.bornAt;
      var flashing = row.bornAt && age >= 0 && age < FLASH_MS;

      if (flashing) {
        var alpha = 1 - age / FLASH_MS;
        ctx.fillStyle = "rgba(" + (up ? UP_BG : DOWN_BG) + ", " + (0.14 * alpha).toFixed(2) + ")";
        ctx.fillRect(x0, ry, panelW, rowH);
      } else if (i % 2 === 0) {
        ctx.fillStyle = "rgba(233, 236, 243, 0.02)";
        ctx.fillRect(x0, ry, panelW, rowH);
      }

      var textColor = flashing ? (up ? UP_TEXT : DOWN_TEXT) : DIM_TEXT;
      var baseY = ry + rowH - rowH * 0.26;

      function cell(idx, text, color) {
        var c = COLS[idx];
        var tx = c.align === "right" ? colX[idx] + c.w * panelW - 6 : colX[idx] + 6;
        ctx.textAlign = c.align;
        ctx.fillStyle = color || textColor;
        ctx.fillText(text, tx, baseY);
      }

      cell(0, fmtTime(row.time));
      cell(1, up ? "BUY" : "SELL", up ? UP_TEXT : DOWN_TEXT);
      cell(2, fmtPrice(row.price) + " (" + signed(row.tickBps, 1) + ")");
      cell(3, row.qty.toFixed(3) + " ($" + Math.round(row.notional).toLocaleString() + ")");
      cell(4, row.basisBps != null ? signed(row.basisBps, 1) : "—");
      cell(5, row.spreadBps != null ? row.spreadBps.toFixed(1) : "—");
      cell(6, row.microDev != null ? signed(row.microDev, 2) : "—");
      cell(7, row.impactPct != null ? row.impactPct.toFixed(0) + "%" : "—");
    }
  }

  function draw(now) {
    ctx.clearRect(0, 0, W, H);
    var panelH = H / SYMBOLS.length;
    SYMBOLS.forEach(function (sym, i) {
      drawPanel(sym, { x: 0, y: i * panelH, w: W, h: panelH }, now);
    });
  }

  function loop(ts) {
    draw(ts || performance.now());
    if (!reduceMotion) requestAnimationFrame(loop);
  }

  function connectSpotSocket() {
    var streams = [];
    SYMBOLS.forEach(function (s) {
      streams.push(s.key + "@aggTrade");
      streams.push(s.key + "@bookTicker");
    });

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
      } else if (stream.indexOf("@bookTicker") !== -1) {
        sym.book = { bid: +data.b, bidQty: +data.B, ask: +data.a, askQty: +data.A };
      }
    };
  }

  function connectPerpSocket() {
    var streams = SYMBOLS.map(function (s) { return s.key + "@bookTicker"; });
    var ws;
    try {
      ws = new WebSocket("wss://fstream.binance.com/stream?streams=" + streams.join("/"));
    } catch (e) {
      return;
    }

    ws.onmessage = function (evt) {
      var msg;
      try { msg = JSON.parse(evt.data); } catch (e) { return; }
      var stream = msg.stream || "", data = msg.data;
      if (!data || !data.b || !data.a) return;
      var key = stream.split("@")[0];
      var sym = SYMBOLS.filter(function (s) { return s.key === key; })[0];
      if (!sym) return;
      sym.perpMid = (+data.b + +data.a) / 2;
    };
  }

  function backfillSymbol(sym) {
    var upper = sym.key.toUpperCase();
    return fetch("https://api.binance.com/api/v3/ticker/bookTicker?symbol=" + upper)
      .then(function (res) { return res.json(); })
      .then(function (bt) {
        sym.book = { bid: +bt.bidPrice, bidQty: +bt.bidQty, ask: +bt.askPrice, askQty: +bt.askQty };
      })
      .catch(function () {})
      .then(function () {
        return fetch("https://fapi.binance.com/fapi/v1/ticker/bookTicker?symbol=" + upper)
          .then(function (res) { return res.json(); })
          .then(function (bt) { sym.perpMid = (+bt.bidPrice + +bt.askPrice) / 2; })
          .catch(function () {});
      })
      .then(function () {
        return fetch("https://api.binance.com/api/v3/aggTrades?symbol=" + upper + "&limit=" + MAX_ROWS)
          .then(function (res) { return res.json(); })
          .then(function (trades) {
            // Oldest first into pushTrade (which prepends), so the tape ends
            // up newest-first with no flash on the initial snapshot rows.
            trades.forEach(function (t) { pushTrade(sym, t.T, +t.p, +t.q, !!t.m, 0); });
          })
          .catch(function () {});
      });
  }

  window.addEventListener("resize", resize);
  resize();

  Promise.all(SYMBOLS.map(backfillSymbol)).then(function () {
    connectSpotSocket();
    connectPerpSocket();
  });

  if (!reduceMotion) requestAnimationFrame(loop);
  else draw(performance.now());
})();
