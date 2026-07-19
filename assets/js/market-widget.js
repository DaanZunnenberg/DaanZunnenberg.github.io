(function () {
  var canvas = document.getElementById("market-widget-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var MONO_FONT = "'SF Mono', Menlo, Consolas, monospace";
  var FLASH_MS = 750;
  var RECOMPUTE_MS = 1400; // pace of the decorative price jitter, like a slow-ticking desk, not a strobe
  var FLASH_CHANCE = 0.3; // only a fraction of changed cells actually flash per tick, to keep it calm
  var STRIKES_HALF = 3; // strikes above/below ATM
  var DAYS_TO_EXP = 21;

  // Same ThinkOrSwim-inspired palette as the old full-page version, now scoped to this card.
  var AMBER = "rgba(224, 168, 82, 0.75)";
  var AMBER_DIM = "rgba(224, 168, 82, 0.35)";
  var UP_TEXT = "rgba(88, 214, 151, 0.9)";
  var DOWN_TEXT = "rgba(235, 110, 110, 0.9)";
  var UP_BG = "88, 214, 151";
  var DOWN_BG = "235, 110, 110";

  function erf(x) {
    var sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    var a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741,
        a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    var t = 1 / (1 + p * x);
    var y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  }
  function normCdf(x) {
    return 0.5 * (1 + erf(x / Math.SQRT2));
  }
  function blackScholes(spot, strike, iv, T, isCall) {
    var sqrtT = Math.sqrt(T);
    var d1 = (Math.log(spot / strike) + 0.5 * iv * iv * T) / (iv * sqrtT);
    var d2 = d1 - iv * sqrtT;
    var price, delta;
    if (isCall) {
      price = spot * normCdf(d1) - strike * normCdf(d2);
      delta = normCdf(d1);
    } else {
      price = strike * normCdf(-d2) - spot * normCdf(-d1);
      delta = normCdf(d1) - 1;
    }
    return { price: Math.max(price, 0.01), delta: delta };
  }

  function strikeStep(spot) {
    var raw = spot * 0.025;
    var mag = Math.pow(10, Math.floor(Math.log10(raw)));
    var norm = raw / mag;
    var mult = norm < 1.5 ? 1 : norm < 3.5 ? 2.5 : norm < 7.5 ? 5 : 10;
    return mult * mag;
  }

  function fmt(v) {
    if (v == null || !isFinite(v)) return "—";
    if (v >= 1000) return v.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    if (v >= 1) return v.toFixed(2);
    return v.toFixed(3);
  }

  var SYMBOLS = [
    { key: "btcusdt", label: "BTC/USDT", baseIv: 0.52, spot: 65000, seed: 0.3, rows: [] },
    { key: "ethusdt", label: "ETH/USDT", baseIv: 0.64, spot: 3400, seed: 1.7, rows: [] }
  ];

  var live = false;
  var lastRecompute = 0;

  function buildChain(sym, now) {
    var step = strikeStep(sym.spot);
    var atm = Math.round(sym.spot / step) * step;
    var T = DAYS_TO_EXP / 365;
    var rows = [];
    for (var i = -STRIKES_HALF; i <= STRIKES_HALF; i++) {
      var strike = Math.max(step, atm + i * step);
      var smile = 1 + 0.1 * Math.abs(i) / STRIKES_HALF;
      var wobble = 1 + 0.02 * Math.sin(now / 5000 + i * 0.8 + sym.seed);
      var iv = sym.baseIv * smile * wobble;
      var spreadPct = 0.012 + 0.006 * Math.abs(i) / STRIKES_HALF;

      var call = blackScholes(sym.spot, strike, iv, T, true);
      var put = blackScholes(sym.spot, strike, iv, T, false);

      var prev = sym.rows[i + STRIKES_HALF];
      var row = {
        strike: strike,
        atm: strike === atm,
        iv: iv,
        call: { bid: call.price * (1 - spreadPct), ask: call.price * (1 + spreadPct), delta: call.delta, flash: 0, dir: 0 },
        put: { bid: put.price * (1 - spreadPct), ask: put.price * (1 + spreadPct), delta: put.delta, flash: 0, dir: 0 }
      };
      rows.push(row);

      if (prev) {
        [["call", call.price], ["put", put.price]].forEach(function (pair) {
          var side = pair[0], price = pair[1];
          var prevMid = (prev[side].bid + prev[side].ask) / 2;
          var changed = Math.abs(price - prevMid) / prevMid > 0.0006;
          if (changed && Math.random() < FLASH_CHANCE) {
            row[side].flash = now;
            row[side].dir = price > prevMid ? 1 : -1;
          } else {
            row[side].flash = prev[side].flash;
            row[side].dir = prev[side].dir;
          }
        });
      }
    }
    sym.rows = rows;
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

  function drawPanel(sym, rect, now) {
    var x0 = rect.x, y0 = rect.y, panelW = rect.w, panelH = rect.h;
    var headerH = 24;
    var rowCount = sym.rows.length;
    var rowH = Math.max(14, Math.min(24, (panelH - headerH) / rowCount));

    ctx.strokeStyle = "rgba(224, 168, 82, 0.16)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x0 + 0.5, y0 + 0.5, panelW - 1, headerH + rowCount * rowH - 1);
    ctx.fillStyle = "rgba(224, 168, 82, 0.07)";
    ctx.fillRect(x0, y0, panelW, headerH);

    var cols = [
      { w: 0.12, align: "right" },
      { w: 0.16, align: "right" },
      { w: 0.16, align: "right" },
      { w: 0.16, align: "center" },
      { w: 0.16, align: "left" },
      { w: 0.16, align: "left" },
      { w: 0.08, align: "left" }
    ];
    var colX = [];
    var cursor = x0;
    cols.forEach(function (c) {
      colX.push(cursor);
      cursor += c.w * panelW;
    });

    var atmRow = sym.rows.filter(function (r) { return r.atm; })[0];

    ctx.font = "10px " + MONO_FONT;
    ctx.textAlign = "left";
    ctx.fillStyle = AMBER;
    ctx.fillText(sym.label.toUpperCase() + " · CALLS / PUTS · " + (live ? "LIVE" : "SIM"), x0 + 6, y0 + 15);

    // ATM implied vol readout, the options-chain analogue of the order-book
    // header's spot/perp depth comparison — one extra figure that reads as
    // a genuine market signal rather than decoration.
    if (atmRow) {
      ctx.textAlign = "right";
      ctx.fillStyle = AMBER;
      ctx.fillText("ATM IV " + (atmRow.iv * 100).toFixed(1) + "%", x0 + panelW - 6, y0 + 15);
    }

    ["Δ", "BID", "ASK", "STRIKE", "BID", "ASK", "Δ"].forEach(function (label, i) {
      ctx.textAlign = cols[i].align;
      var tx = cols[i].align === "right" ? colX[i] + cols[i].w * panelW - 4
        : cols[i].align === "center" ? colX[i] + (cols[i].w * panelW) / 2
        : colX[i] + 4;
      ctx.font = "8px " + MONO_FONT;
      ctx.fillStyle = "rgba(166, 175, 194, 0.4)";
      ctx.fillText(label, tx, y0 + headerH - 3);
    });

    ctx.font = "10px " + MONO_FONT;
    sym.rows.forEach(function (row, i) {
      var ry = y0 + headerH + i * rowH;

      if (row.atm) {
        ctx.fillStyle = "rgba(224, 168, 82, 0.09)";
        ctx.fillRect(x0, ry, panelW, rowH);
      } else if (i % 2 === 0) {
        ctx.fillStyle = "rgba(233, 236, 243, 0.02)";
        ctx.fillRect(x0, ry, panelW, rowH);
      }

      function cell(idx, text, flashUntil, dir) {
        var align = cols[idx].align;
        var tx = align === "right" ? colX[idx] + cols[idx].w * panelW - 4
          : align === "center" ? colX[idx] + (cols[idx].w * panelW) / 2
          : colX[idx] + 4;
        var age = now - flashUntil;
        if (flashUntil && age >= 0 && age < FLASH_MS) {
          var alpha = 1 - age / FLASH_MS;
          var rgb = dir >= 0 ? UP_BG : DOWN_BG;
          ctx.fillStyle = "rgba(" + rgb + ", " + (0.16 * alpha).toFixed(2) + ")";
          ctx.fillRect(colX[idx], ry, cols[idx].w * panelW, rowH);
          ctx.fillStyle = dir >= 0 ? UP_TEXT : DOWN_TEXT;
        } else {
          ctx.fillStyle = row.atm ? "rgba(233, 236, 243, 0.55)" : "rgba(233, 236, 243, 0.32)";
        }
        ctx.textAlign = align;
        ctx.fillText(text, tx, ry + rowH - rowH * 0.28);
      }

      cell(0, row.call.delta.toFixed(2), 0, 0);
      cell(1, fmt(row.call.bid), row.call.flash, row.call.dir);
      cell(2, fmt(row.call.ask), row.call.flash, row.call.dir);
      cell(3, fmt(row.strike), 0, 0);
      cell(4, fmt(row.put.bid), row.put.flash, row.put.dir);
      cell(5, fmt(row.put.ask), row.put.flash, row.put.dir);
      cell(6, row.put.delta.toFixed(2), 0, 0);
    });
  }

  function draw(now) {
    ctx.clearRect(0, 0, W, H);
    if (now - lastRecompute > RECOMPUTE_MS) {
      lastRecompute = now;
      SYMBOLS.forEach(function (sym) { buildChain(sym, now); });
    }

    var margin = 0;
    var gap = 0;
    var panelH = (H - margin * 2 - gap) / 2;
    SYMBOLS.forEach(function (sym, i) {
      drawPanel(sym, { x: margin, y: margin + i * (panelH + gap), w: W - margin * 2, h: panelH }, now);
    });
  }

  function loop(ts) {
    draw(ts || performance.now());
    if (!reduceMotion) requestAnimationFrame(loop);
  }

  function seedSpotPrices() {
    fetch("https://api.binance.com/api/v3/ticker/price?symbols=%5B%22BTCUSDT%22%2C%22ETHUSDT%22%5D")
      .then(function (res) {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then(function (rows) {
        rows.forEach(function (r) {
          var sym = SYMBOLS.filter(function (s) { return s.key === r.symbol.toLowerCase(); })[0];
          if (sym) sym.spot = +r.price;
        });
        SYMBOLS.forEach(function (sym) { buildChain(sym, performance.now()); });
        connectSocket();
      })
      .catch(function () { live = false; });
  }

  function connectSocket() {
    var streams = SYMBOLS.map(function (s) { return s.key + "@trade"; }).join("/");
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
      if (!msg.data || !msg.data.p) return;
      var streamSymbol = (msg.stream || "").split("@")[0];
      var sym = SYMBOLS.filter(function (s) { return s.key === streamSymbol; })[0];
      if (!sym) return;
      sym.spot = +msg.data.p;
    };
  }

  window.addEventListener("resize", resize);
  resize();
  SYMBOLS.forEach(function (sym) { buildChain(sym, performance.now()); });
  seedSpotPrices();

  if (!reduceMotion) requestAnimationFrame(loop);
  else draw(performance.now());
})();
