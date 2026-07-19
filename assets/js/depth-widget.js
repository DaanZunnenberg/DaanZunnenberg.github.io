(function () {
  var canvas = document.getElementById("depth-widget-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var MONO_FONT = "'SF Mono', Menlo, Consolas, monospace";
  var STREAM_DEPTH = 20; // Binance partial-depth stream size (must be 5, 10, or 20)
  var ROWS_HALF = 12;    // price levels shown above / below mid (sliced from STREAM_DEPTH)

  // Same muted red/green as the ThinkOrSwim-style options-chain widget
  // (market-widget.js), rather than a neon heat scale.
  var ASK_HEAT = "35, 22, 24";    // dark, desaturated base
  var ASK_HOT  = "235, 110, 110"; // muted red for the biggest asks
  var BID_HEAT = "18, 30, 27";    // dark, desaturated base
  var BID_HOT  = "88, 214, 151";  // muted green for the biggest bids
  var MID_LINE = "rgba(233, 236, 243, 0.35)";

  var SYMBOLS = [
    { key: "ethusdt", label: "ETH/USDT", bids: [], asks: [], perpBids: [], perpAsks: [] },
    { key: "solusdt", label: "SOL/USDT", bids: [], asks: [], perpBids: [], perpAsks: [] },
    { key: "btcusdt", label: "BTC/USDT", bids: [], asks: [], perpBids: [], perpAsks: [] }
  ];

  var live = false;
  var perpLive = false;

  function parseLevels(data, key) {
    return data[key].slice(0, ROWS_HALF).map(function (l) { return [+l[0], +l[1]]; });
  }

  function updateBook(sym, data) {
    // Binance depth20 levels arrive best-first: bids descending, asks ascending.
    sym.bids = parseLevels(data, "bids");
    sym.asks = parseLevels(data, "asks");
  }

  function updatePerpBook(sym, data) {
    sym.perpBids = parseLevels(data, "bids");
    sym.perpAsks = parseLevels(data, "asks");
  }

  function seedSnapshot(sym) {
    fetch("https://api.binance.com/api/v3/depth?symbol=" + sym.key.toUpperCase() + "&limit=" + STREAM_DEPTH)
      .then(function (res) {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then(function (data) { updateBook(sym, data); })
      .catch(function () {});
  }

  function seedPerpSnapshot(sym) {
    // Same symbol on Binance's USDⓈ-M perpetual futures book (fapi), overlaid
    // on the spot book below so the two can be compared level-by-level —
    // the gap between them is the cash-and-carry arb signal.
    fetch("https://fapi.binance.com/fapi/v1/depth?symbol=" + sym.key.toUpperCase() + "&limit=" + STREAM_DEPTH)
      .then(function (res) {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then(function (data) { updatePerpBook(sym, data); })
      .catch(function () {});
  }

  function connectSocket() {
    var streams = SYMBOLS.map(function (s) { return s.key + "@depth" + STREAM_DEPTH + "@100ms"; }).join("/");
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

  function connectPerpSocket() {
    var streams = SYMBOLS.map(function (s) { return s.key + "@depth" + STREAM_DEPTH + "@100ms"; }).join("/");
    var ws;
    try {
      ws = new WebSocket("wss://fstream.binance.com/stream?streams=" + streams);
    } catch (e) {
      return;
    }

    var connectTimeout = setTimeout(function () {
      try { ws.close(); } catch (e) {}
    }, 5000);

    ws.onopen = function () {
      clearTimeout(connectTimeout);
      perpLive = true;
    };

    ws.onmessage = function (evt) {
      var msg;
      try {
        msg = JSON.parse(evt.data);
      } catch (e) {
        return;
      }
      if (!msg.data || !msg.data.b || !msg.data.a) return;
      var streamSymbol = (msg.stream || "").split("@")[0];
      var sym = SYMBOLS.filter(function (s) { return s.key === streamSymbol; })[0];
      if (!sym) return;
      // futures depth diff/snapshot stream uses short keys b/a instead of bids/asks
      updatePerpBook(sym, { bids: msg.data.b, asks: msg.data.a });
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

  function diffColor(v) {
    return v >= 0 ? "rgba(88, 214, 151, 0.9)" : "rgba(235, 110, 110, 0.9)";
  }
  function signed(v) {
    return (v >= 0 ? "+" : "") + fmtPrice(v);
  }

  function drawPanel(sym, rect) {
    var x0 = rect.x, y0 = rect.y, w = rect.w, h = rect.h;
    var headerH = 18;
    var tableW = Math.max(64, w * 0.32);
    var bookX0 = x0, bookW = w - tableW - 6;
    var tableX0 = x0 + bookW + 6;

    ctx.strokeStyle = "rgba(224, 168, 82, 0.14)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x0 + 0.5, y0 + 0.5, w - 1, h - 1);
    ctx.fillStyle = "rgba(224, 168, 82, 0.07)";
    ctx.fillRect(x0, y0, w, headerH);

    var hasPerp = sym.perpBids.length > 0 && sym.perpAsks.length > 0;

    ctx.font = "10px " + MONO_FONT;
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(224, 168, 82, 0.8)";
    ctx.fillText(sym.label + " · " + ((live && perpLive) ? "LIVE" : "SIM"), x0 + 6, y0 + 13);

    // Depth-visible liquidity, spot vs. perp: not the diff table's per-row
    // price gap, but whether one book is simply carrying more size right
    // now — a thin perp book next to a deep spot book (or vice versa) is
    // itself a signal, independent of where the price sits.
    ctx.textAlign = "right";
    if (hasPerp) {
      var spotVol = sym.bids.concat(sym.asks).reduce(function (s, l) { return s + l[1]; }, 0);
      var perpVol = sym.perpBids.concat(sym.perpAsks).reduce(function (s, l) { return s + l[1]; }, 0);
      var volLabel = "—";
      if (spotVol > 0 && perpVol > 0) {
        volLabel = spotVol >= perpVol
          ? "spot " + (spotVol / perpVol).toFixed(1) + "x deeper"
          : "perp " + (perpVol / spotVol).toFixed(1) + "x deeper";
      }
      ctx.fillStyle = "rgba(224, 168, 82, 0.8)";
      ctx.fillText("perp−spot · " + volLabel, x0 + w - 5, y0 + 13);
    } else {
      ctx.fillStyle = "rgba(233, 236, 243, 0.45)";
      ctx.fillText("perp−spot", x0 + w - 5, y0 + 13);
    }

    if (!sym.bids.length || !sym.asks.length) return;

    var rows = h - headerH;
    var rowH = rows / (ROWS_HALF * 2);
    var fontPx = rowH < 11 ? 8 : 10;
    var maxQty = Math.max.apply(null, sym.bids.concat(sym.asks).map(function (l) { return l[1]; }));
    if (maxQty === 0) return;

    ctx.strokeStyle = "rgba(224, 168, 82, 0.14)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(tableX0 - 3, y0 + headerH);
    ctx.lineTo(tableX0 - 3, y0 + h);
    ctx.stroke();

    function diffCell(spotLvl, perpLvl, ry) {
      if (!hasPerp || !perpLvl) return;
      var d = perpLvl[0] - spotLvl[0];
      ctx.font = fontPx + "px " + MONO_FONT;
      ctx.textAlign = "left";
      ctx.fillStyle = diffColor(d);
      ctx.fillText(signed(d), tableX0, ry + rowH - rowH * 0.3);
    }

    // Asks: highest price first, stacked top-down toward mid.
    var asksTop = sym.asks.slice(0, ROWS_HALF).sort(function (a, b) { return b[0] - a[0]; });
    var perpAsksTop = sym.perpAsks.slice(0, ROWS_HALF).sort(function (a, b) { return b[0] - a[0]; });
    asksTop.forEach(function (lvl, i) {
      var ry = y0 + headerH + i * rowH;
      var t = lvl[1] / maxQty;
      var barW = Math.max(6, t * bookW);
      ctx.fillStyle = heatColor(ASK_HEAT, ASK_HOT, t);
      ctx.globalAlpha = 0.85;
      ctx.fillRect(bookX0, ry, barW, rowH - 0.6);
      ctx.globalAlpha = 1;

      ctx.font = fontPx + "px " + MONO_FONT;
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(255, 200, 195, 0.9)";
      ctx.fillText(fmtPrice(lvl[0]), bookX0 + 5, ry + rowH - rowH * 0.3);
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(233, 236, 243, 0.75)";
      ctx.fillText(fmtQty(lvl[1]), bookX0 + bookW - 5, ry + rowH - rowH * 0.3);

      diffCell(lvl, perpAsksTop[i], ry);
    });

    var midY = y0 + headerH + ROWS_HALF * rowH;
    ctx.strokeStyle = MID_LINE;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(bookX0, midY);
    ctx.lineTo(bookX0 + bookW, midY);
    ctx.stroke();

    // Bids: highest price first (closest to mid), stacked downward.
    var bidsTop = sym.bids.slice(0, ROWS_HALF).sort(function (a, b) { return b[0] - a[0]; });
    var perpBidsTop = sym.perpBids.slice(0, ROWS_HALF).sort(function (a, b) { return b[0] - a[0]; });
    bidsTop.forEach(function (lvl, i) {
      var ry = midY + i * rowH;
      var t = lvl[1] / maxQty;
      var barW = Math.max(6, t * bookW);
      ctx.fillStyle = heatColor(BID_HEAT, BID_HOT, t);
      ctx.globalAlpha = 0.85;
      ctx.fillRect(bookX0, ry, barW, rowH - 0.6);
      ctx.globalAlpha = 1;

      ctx.font = fontPx + "px " + MONO_FONT;
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(195, 255, 205, 0.9)";
      ctx.fillText(fmtPrice(lvl[0]), bookX0 + 5, ry + rowH - rowH * 0.3);
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(233, 236, 243, 0.75)";
      ctx.fillText(fmtQty(lvl[1]), bookX0 + bookW - 5, ry + rowH - rowH * 0.3);

      diffCell(lvl, perpBidsTop[i], ry);
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
  SYMBOLS.forEach(seedPerpSnapshot);
  connectSocket();
  connectPerpSocket();

  if (!reduceMotion) requestAnimationFrame(loop);
  else setInterval(draw, 500);
})();
