(function () {
  var canvas = document.getElementById("market-table");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var MONO_FONT = "'SF Mono', Menlo, Consolas, monospace";
  var FLASH_MS = 750;
  var RECOMPUTE_MS = 1400; // pace of the decorative price jitter, like a slow-ticking desk, not a strobe
  var FLASH_CHANCE = 0.3; // only a fraction of changed cells actually flash per tick, to keep it a backdrop
  var STRIKES_HALF = 4; // strikes above/below ATM
  var DAYS_TO_EXP = 21;

  // ThinkOrSwim-inspired palette: near-black grid, amber accents, muted green/red — not a copy, just the vibe.
  var AMBER = "rgba(224, 168, 82, 0.65)";
  var AMBER_DIM = "rgba(224, 168, 82, 0.3)";
  var UP_TEXT = "rgba(76, 201, 137, 0.85)";
  var DOWN_TEXT = "rgba(224, 92, 92, 0.85)";
  var UP_BG = "56, 201, 193";
  var DOWN_BG = "239, 90, 110";

  // ---- Black-Scholes (r = 0), just enough fidelity to look like a real chain ----
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
    {
      key: "btcusdt", label: "BTC/USDT", baseIv: 0.52, spot: 65000, dayOpen: 65000, seed: 0.3,
      lastDirection: 1,
      badgeEl: document.getElementById("live-price-btc"), dotEl: document.getElementById("live-badge-btc"),
      rows: []
    },
    {
      key: "ethusdt", label: "ETH/USDT", baseIv: 0.64, spot: 3400, dayOpen: 3400, seed: 1.7,
      lastDirection: 1,
      badgeEl: document.getElementById("live-price-eth"), dotEl: document.getElementById("live-badge-eth"),
      rows: []
    },
    {
      key: "solusdt", label: "SOL/USDT", baseIv: 0.75, spot: 150, dayOpen: 150, seed: 3.1,
      lastDirection: 1,
      badgeEl: document.getElementById("live-price-sol"), dotEl: document.getElementById("live-badge-sol"),
      rows: []
    }
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

  function updateBadge(sym) {
    if (sym.badgeEl && sym.spot != null) {
      sym.badgeEl.textContent = sym.spot >= 1000
        ? sym.spot.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : sym.spot.toFixed(2);
    }
    if (sym.dotEl) {
      sym.dotEl.classList.toggle("live-up", sym.lastDirection >= 0);
      sym.dotEl.classList.toggle("live-down", sym.lastDirection < 0);
    }
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function computeLayout() {
    var margin = Math.max(16, W * 0.025);
    var ribbonH = 30;
    var top = margin + ribbonH + 14;
    var panels = [];
    if (W >= 980) {
      var gap = 18;
      var panelW = (W - margin * 2 - gap * 2) / 3;
      var panelH = H - top - margin;
      SYMBOLS.forEach(function (sym, i) {
        panels.push({ x: margin + i * (panelW + gap), y: top, w: panelW, h: panelH });
      });
    } else {
      var gapV = 16;
      var panelH2 = (H - top - margin - gapV * 2) / 3;
      SYMBOLS.forEach(function (sym, i) {
        panels.push({ x: margin, y: top + i * (panelH2 + gapV), w: W - margin * 2, h: panelH2 });
      });
    }
    return { margin: margin, ribbonH: ribbonH, panels: panels };
  }

  function drawRibbon(margin, ribbonH) {
    var y0 = margin;
    ctx.strokeStyle = AMBER_DIM;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(margin, y0 + ribbonH);
    ctx.lineTo(W - margin, y0 + ribbonH);
    ctx.stroke();

    ctx.font = "10px " + MONO_FONT;
    ctx.textAlign = "left";
    var segW = (W - margin * 2) / SYMBOLS.length;
    SYMBOLS.forEach(function (sym, i) {
      var x = margin + i * segW;
      var chg = sym.dayOpen ? ((sym.spot - sym.dayOpen) / sym.dayOpen) * 100 : 0;
      var chgColor = chg >= 0 ? UP_TEXT : DOWN_TEXT;
      ctx.fillStyle = AMBER;
      ctx.fillText(sym.label, x, y0 + 14);
      ctx.fillStyle = "rgba(233, 236, 243, 0.5)";
      ctx.fillText(fmt(sym.spot), x, y0 + 26);
      ctx.fillStyle = chgColor;
      ctx.fillText((chg >= 0 ? "+" : "") + chg.toFixed(2) + "%", x + 92, y0 + 26);
    });

    ctx.textAlign = "right";
    ctx.fillStyle = "rgba(166, 175, 194, 0.35)";
    ctx.fillText((live ? "LIVE" : "SIMULATED") + " · " + DAYS_TO_EXP + "D CHAIN", W - margin, y0 + 14);
  }

  function drawPanel(sym, rect, now) {
    var x0 = rect.x, y0 = rect.y, panelW = rect.w, panelH = rect.h;
    var headerH = 28;
    var rowCount = sym.rows.length;
    var rowH = Math.max(15, Math.min(28, (panelH - headerH) / rowCount));

    // Panel frame, ToS-style hairline border with a squared-off header bar.
    ctx.strokeStyle = "rgba(224, 168, 82, 0.14)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x0 + 0.5, y0 + 0.5, panelW - 1, headerH + rowCount * rowH - 1);
    ctx.fillStyle = "rgba(224, 168, 82, 0.05)";
    ctx.fillRect(x0, y0, panelW, headerH);

    var cols = [
      { w: 0.12, align: "right" },  // call delta
      { w: 0.16, align: "right" },  // call bid
      { w: 0.16, align: "right" },  // call ask
      { w: 0.16, align: "center" }, // strike
      { w: 0.16, align: "left" },   // put bid
      { w: 0.16, align: "left" },   // put ask
      { w: 0.08, align: "left" }    // put delta
    ];
    var colX = [];
    var cursor = x0;
    cols.forEach(function (c) {
      colX.push(cursor);
      cursor += c.w * panelW;
    });

    ctx.font = "10px " + MONO_FONT;
    ctx.textAlign = "left";
    ctx.fillStyle = AMBER;
    ctx.fillText(sym.label.toUpperCase() + " · CALLS / PUTS", x0 + 6, y0 + 12);
    ctx.font = "9px " + MONO_FONT;
    ctx.fillStyle = "rgba(166, 175, 194, 0.4)";
    ctx.fillText("IV " + (sym.rows.length ? (sym.baseIv * 100).toFixed(0) : "—") + "%", x0 + 6, y0 + 23);

    ["Δ", "BID", "ASK", "STRIKE", "BID", "ASK", "Δ"].forEach(function (label, i) {
      ctx.textAlign = cols[i].align;
      var tx = cols[i].align === "right" ? colX[i] + cols[i].w * panelW - 4
        : cols[i].align === "center" ? colX[i] + (cols[i].w * panelW) / 2
        : colX[i] + 4;
      ctx.fillStyle = "rgba(166, 175, 194, 0.32)";
      ctx.fillText(label, tx, y0 + headerH - 3);
    });

    ctx.font = "10px " + MONO_FONT;
    sym.rows.forEach(function (row, i) {
      var ry = y0 + headerH + i * rowH;

      if (row.atm) {
        ctx.fillStyle = "rgba(224, 168, 82, 0.07)";
        ctx.fillRect(x0, ry, panelW, rowH);
      } else if (i % 2 === 0) {
        ctx.fillStyle = "rgba(233, 236, 243, 0.015)";
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
          ctx.fillStyle = "rgba(" + rgb + ", " + (0.14 * alpha).toFixed(2) + ")";
          ctx.fillRect(colX[idx], ry, cols[idx].w * panelW, rowH);
          ctx.fillStyle = dir >= 0 ? UP_TEXT : DOWN_TEXT;
        } else {
          ctx.fillStyle = row.atm ? "rgba(233, 236, 243, 0.42)" : "rgba(233, 236, 243, 0.2)";
        }
        ctx.textAlign = align;
        ctx.fillText(text, tx, ry + rowH - rowH * 0.3);
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

    var layout = computeLayout();
    drawRibbon(layout.margin, layout.ribbonH);
    SYMBOLS.forEach(function (sym, i) { drawPanel(sym, layout.panels[i], now); });
  }

  function loop(ts) {
    draw(ts || performance.now());
    if (!reduceMotion) requestAnimationFrame(loop);
  }

  // ---- Live spot feed via Binance's public REST + combined WebSocket stream ----
  function seedSpotPrices() {
    fetch("https://api.binance.com/api/v3/ticker/price?symbols=%5B%22BTCUSDT%22%2C%22ETHUSDT%22%2C%22SOLUSDT%22%5D")
      .then(function (res) {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then(function (rows) {
        rows.forEach(function (r) {
          var sym = SYMBOLS.filter(function (s) { return s.key === r.symbol.toLowerCase(); })[0];
          if (sym) { sym.spot = +r.price; sym.dayOpen = +r.price; }
        });
        SYMBOLS.forEach(function (sym) { buildChain(sym, performance.now()); updateBadge(sym); });
        connectSocket();
      })
      .catch(startSimulatedDrift);
  }

  function connectSocket() {
    var streams = SYMBOLS.map(function (s) { return s.key + "@trade"; }).join("/");
    var ws;
    try {
      ws = new WebSocket("wss://stream.binance.com:9443/stream?streams=" + streams);
    } catch (e) {
      startSimulatedDrift();
      return;
    }

    var connected = false;
    var connectTimeout = setTimeout(function () {
      if (!connected) {
        try { ws.close(); } catch (e) {}
        startSimulatedDrift();
      }
    }, 5000);

    ws.onopen = function () {
      connected = true;
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
      var prevSpot = sym.spot;
      sym.spot = +msg.data.p;
      sym.lastDirection = sym.spot >= prevSpot ? 1 : -1;
      updateBadge(sym);
    };

    ws.onerror = function () {
      if (!connected) {
        clearTimeout(connectTimeout);
        startSimulatedDrift();
      }
    };
  }

  function startSimulatedDrift() {
    if (live) return;
    SYMBOLS.forEach(function (sym) {
      if (sym.dotEl) {
        var labelEl = sym.dotEl.querySelector(".live-label");
        if (labelEl) labelEl.textContent = "SIM";
      }
    });
    var SEED = 1337420;
    function mulberry32(a) {
      return function () {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        var t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    var rand = mulberry32(SEED);
    setInterval(function () {
      SYMBOLS.forEach(function (sym) {
        var drift = (rand() - 0.5) * sym.spot * 0.0015;
        sym.lastDirection = drift >= 0 ? 1 : -1;
        sym.spot = Math.max(1, sym.spot + drift);
        updateBadge(sym);
      });
    }, 1200);
  }

  window.addEventListener("resize", resize);
  resize();
  SYMBOLS.forEach(function (sym) { buildChain(sym, performance.now()); });
  seedSpotPrices();

  if (!reduceMotion) requestAnimationFrame(loop);
  else draw(performance.now());
})();
