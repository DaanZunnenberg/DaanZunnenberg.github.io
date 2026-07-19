(function () {
  var canvas = document.getElementById("trade-process-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // A live time-and-sales tape: each row is one real Binance BTC/USDT
  // aggTrade (an arrival with a time, price, quantity and taker side).
  // Newest trade lands at the top and pushes everything else down, exactly
  // like a real trading terminal's tape. Backfilled from REST on load so
  // every row is already populated before the socket delivers a live tick.
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var MONO_FONT = "'SF Mono', Menlo, Consolas, monospace";
  var SYMBOL = "btcusdt";
  var MAX_ROWS = 200;
  var FLASH_MS = 900;

  // Same ThinkOrSwim-inspired palette as the other live-trade hero sections.
  var AMBER = "rgba(224, 168, 82, 0.75)";
  var UP_TEXT = "rgba(88, 214, 151, 0.9)";
  var DOWN_TEXT = "rgba(235, 110, 110, 0.9)";
  var UP_BG = "88, 214, 151";
  var DOWN_BG = "235, 110, 110";

  var rows = []; // newest first: { time, price, qty, isSellerTaker, bornAt }
  var live = false;

  function fmtTime(ms) {
    var d = new Date(ms);
    return d.toTimeString().slice(0, 8) + "." + (d.getMilliseconds() + "").padStart(3, "0");
  }

  function fmtPrice(p) {
    return p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function pushTrade(time, price, qty, isSellerTaker, bornAt) {
    rows.unshift({ time: time, price: price, qty: qty, isSellerTaker: isSellerTaker, bornAt: bornAt });
    if (rows.length > MAX_ROWS) rows.length = MAX_ROWS;
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

  function draw(now) {
    ctx.clearRect(0, 0, W, H);
    if (!rows.length) return;

    var headerH = 24;
    var rowH = Math.max(13, Math.min(19, (H - headerH) / Math.min(rows.length, 30)));
    var visible = Math.min(rows.length, Math.ceil((H - headerH) / rowH));

    ctx.strokeStyle = "rgba(224, 168, 82, 0.16)";
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, W - 1, H - 1);
    ctx.fillStyle = "rgba(224, 168, 82, 0.07)";
    ctx.fillRect(0, 0, W, headerH);

    var cols = [
      { w: 0.30, align: "left" },
      { w: 0.16, align: "left" },
      { w: 0.34, align: "right" },
      { w: 0.20, align: "right" }
    ];
    var colX = [];
    var cursor = 0;
    cols.forEach(function (c) { colX.push(cursor); cursor += c.w * W; });

    ctx.font = "11px " + MONO_FONT;
    ctx.textAlign = "left";
    ctx.fillStyle = AMBER;
    ctx.fillText(SYMBOL.toUpperCase() + " · TIME & SALES · " + (live ? "LIVE" : "SNAPSHOT"), 8, 16);

    ["TIME", "SIDE", "PRICE", "QTY"].forEach(function (label, i) {
      ctx.textAlign = cols[i].align;
      var tx = cols[i].align === "right" ? colX[i] + cols[i].w * W - 8 : colX[i] + 8;
      ctx.font = "9px " + MONO_FONT;
      ctx.fillStyle = "rgba(166, 175, 194, 0.4)";
      ctx.fillText(label, tx, headerH - 12);
    });

    ctx.font = "10px " + MONO_FONT;
    for (var i = 0; i < visible; i++) {
      var row = rows[i];
      var ry = headerH + i * rowH;
      var up = !row.isSellerTaker;
      var age = now - row.bornAt;
      var flashing = row.bornAt && age >= 0 && age < FLASH_MS;

      if (flashing) {
        var alpha = 1 - age / FLASH_MS;
        ctx.fillStyle = "rgba(" + (up ? UP_BG : DOWN_BG) + ", " + (0.14 * alpha).toFixed(2) + ")";
        ctx.fillRect(0, ry, W, rowH);
      } else if (i % 2 === 0) {
        ctx.fillStyle = "rgba(233, 236, 243, 0.02)";
        ctx.fillRect(0, ry, W, rowH);
      }

      var textColor = flashing ? (up ? UP_TEXT : DOWN_TEXT) : "rgba(233, 236, 243, 0.4)";
      var sideColor = up ? UP_TEXT : DOWN_TEXT;
      var baseY = ry + rowH - rowH * 0.28;

      ctx.textAlign = "left";
      ctx.fillStyle = textColor;
      ctx.fillText(fmtTime(row.time), colX[0] + 8, baseY);

      ctx.fillStyle = sideColor;
      ctx.fillText(up ? "BUY" : "SELL", colX[1] + 8, baseY);

      ctx.textAlign = "right";
      ctx.fillStyle = textColor;
      ctx.fillText(fmtPrice(row.price), colX[2] + cols[2].w * W - 8, baseY);
      ctx.fillText(row.qty.toFixed(4), colX[3] + cols[3].w * W - 8, baseY);
    }
  }

  function loop(ts) {
    draw(ts || performance.now());
    if (!reduceMotion) requestAnimationFrame(loop);
  }

  function connectSocket() {
    var ws;
    try {
      ws = new WebSocket("wss://stream.binance.com:9443/stream?streams=" + SYMBOL + "@aggTrade");
    } catch (e) {
      return;
    }

    var connectTimeout = setTimeout(function () {
      try { ws.close(); } catch (e) {}
    }, 6000);

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
      var data = msg.data;
      if (!data || !data.p || !data.q || !data.T) return;
      pushTrade(data.T, +data.p, +data.q, !!data.m, performance.now());
    };
  }

  function backfill() {
    fetch("https://api.binance.com/api/v3/aggTrades?symbol=" + SYMBOL.toUpperCase() + "&limit=" + MAX_ROWS)
      .then(function (res) { return res.json(); })
      .then(function (trades) {
        // Oldest first into pushTrade (which prepends), so the tape ends
        // up newest-first with no flash on the initial snapshot rows.
        trades.forEach(function (t) { pushTrade(t.T, +t.p, +t.q, !!t.m, 0); });
        connectSocket();
      })
      .catch(function () { connectSocket(); });
  }

  window.addEventListener("resize", resize);
  resize();
  backfill();

  if (!reduceMotion) requestAnimationFrame(loop);
  else draw(performance.now());
})();
