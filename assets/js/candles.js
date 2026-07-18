(function () {
  var canvas = document.getElementById("candles");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var candleW = 9;
  var gap = 5;
  var slotPx = candleW + gap;
  var SIM_TICK_MS = 5000; // decorative bar-completion pace for the simulated fallback (real feed uses 1d klines)
  var MONO_FONT = "'SF Mono', Menlo, Consolas, monospace";

  var candles = [];
  var forming = null;
  var price = null;
  var lastDirection = 1;
  var live = false; // true once real BTC/USDT data is flowing

  // Moving averages drawn over the candles, with enough history kept
  // in `candles` (beyond the visible window) so the longest MA has a
  // full lookback right up to the left edge of the chart.
  var MA_PERIODS = [7, 25, 99];
  var MA_STYLES = [
    { color: "rgba(93, 143, 255, 0.55)", width: 1.2 },
    { color: "rgba(147, 179, 255, 0.42)", width: 1.2 },
    { color: "rgba(233, 236, 243, 0.3)", width: 1.4 }
  ];
  var maLookback = Math.max.apply(null, MA_PERIODS) - 1;

  // Leave a few empty slots to the right of the latest bar, as classic
  // charting platforms do, instead of pinning the newest candle to the edge.
  var RIGHT_MARGIN_SLOTS = 5;

  // Volume profile: a horizontal histogram of traded volume by price,
  // Exocharts-style, drawn in the blank margin to the right of the
  // latest bar rather than overlapping the candles.
  var VP_BINS = 28;
  var VP_MAX_WIDTH = 70;
  var VP_COLOR = "rgba(93, 143, 255, 0.24)";
  var POC_COLOR = "rgba(255, 200, 87, 0.4)";

  // Bottom volume subpanel (time-based, one bar per candle)
  var VOL_PANEL_RATIO = 0.12;

  // Order-book depth mini-widget, bottom-left — only populated from the
  // real Binance feed (never fabricated for the simulated fallback).
  var OB_LEVELS = 8;
  var OB_REFRESH_MS = 6000;
  var orderBook = null;
  var obTimer = null;

  var priceEl = document.getElementById("live-price");
  var labelEl = document.getElementById("live-symbol");
  var badge = document.getElementById("live-badge");

  function newForming(open) {
    return { open: open, close: open, high: open, low: open, vol: 0 };
  }

  function slotCount() {
    return Math.ceil(W / slotPx) + 1;
  }

  function historyCap() {
    return slotCount() + maLookback;
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (candles.length > historyCap()) {
      candles = candles.slice(candles.length - historyCap());
    }
  }

  function computeMAs(closes) {
    return MA_PERIODS.map(function (period) {
      var out = new Array(closes.length).fill(null);
      var sum = 0;
      for (var i = 0; i < closes.length; i++) {
        sum += closes[i];
        if (i >= period) sum -= closes[i - period];
        if (i >= period - 1) out[i] = sum / period;
      }
      return out;
    });
  }

  function computeVolumeProfile(visibleCandles, min, max) {
    var buckets = new Array(VP_BINS).fill(0);
    var range = max - min;
    if (range <= 0) return buckets;
    visibleCandles.forEach(function (c) {
      var mid = (c.high + c.low) / 2;
      var idx = Math.min(VP_BINS - 1, Math.max(0, Math.floor(((mid - min) / range) * VP_BINS)));
      buckets[idx] += c.vol || 0;
    });
    return buckets;
  }

  function updateBadge() {
    if (priceEl && price != null) {
      priceEl.textContent = price >= 1000
        ? price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : price.toFixed(2);
    }
    if (badge) {
      badge.classList.toggle("live-up", lastDirection >= 0);
      badge.classList.toggle("live-down", lastDirection < 0);
    }
  }

  function drawCandle(c, x, y) {
    var up = c.close >= c.open;
    var color = up ? "rgba(56, 201, 193, 0.3)" : "rgba(239, 90, 110, 0.28)";
    var borderColor = up ? "rgba(56, 201, 193, 0.5)" : "rgba(239, 90, 110, 0.48)";
    var wickColor = up ? "rgba(56, 201, 193, 0.22)" : "rgba(239, 90, 110, 0.2)";

    ctx.strokeStyle = wickColor;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(x + candleW / 2, y(c.high));
    ctx.lineTo(x + candleW / 2, y(c.low));
    ctx.stroke();

    var yOpen = y(c.open);
    var yClose = y(c.close);
    var top = Math.min(yOpen, yClose);
    var h = Math.max(Math.abs(yClose - yOpen), 1.4);

    ctx.fillStyle = color;
    ctx.fillRect(x, top, candleW, h);
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 0.5, top + 0.5, candleW - 1, Math.max(h - 1, 0.5));
  }

  function niceStep(range, targetCount) {
    var rawStep = range / targetCount;
    var mag = Math.pow(10, Math.floor(Math.log10(rawStep)));
    var norm = rawStep / mag;
    var step = norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10;
    return step * mag;
  }

  function drawGrid(min, max, y) {
    var step = niceStep(max - min, 5);
    if (!isFinite(step) || step <= 0) return;
    var start = Math.ceil(min / step) * step;
    ctx.font = "10px " + MONO_FONT;
    ctx.textAlign = "right";
    for (var v = start; v <= max; v += step) {
      var yy = y(v);
      ctx.strokeStyle = "rgba(233, 236, 243, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, yy);
      ctx.lineTo(W, yy);
      ctx.stroke();
      var label = v >= 1000 ? (v / 1000).toFixed(1) + "k" : v.toFixed(0);
      ctx.fillStyle = "rgba(233, 236, 243, 0.24)";
      ctx.fillText(label, W - 8, yy - 4);
    }
  }

  function computePOC(buckets) {
    var maxVol = -1;
    var idx = -1;
    buckets.forEach(function (v, i) {
      if (v > maxVol) {
        maxVol = v;
        idx = i;
      }
    });
    return maxVol > 0 ? idx : -1;
  }

  function drawPOC(idx, min, max, y) {
    if (idx < 0) return;
    var bucketPriceSize = (max - min) / VP_BINS;
    var yy = y(min + (idx + 0.5) * bucketPriceSize);
    ctx.strokeStyle = POC_COLOR;
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(0, yy);
    ctx.lineTo(W, yy);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = "9px " + MONO_FONT;
    ctx.textAlign = "left";
    ctx.fillStyle = POC_COLOR;
    ctx.fillText("POC", 6, yy - 4);
  }

  function drawVolumeProfile(buckets, min, max, y) {
    var maxBucket = Math.max.apply(null, buckets.concat([1e-9]));
    var bucketPriceSize = (max - min) / buckets.length;
    ctx.fillStyle = VP_COLOR;
    for (var i = 0; i < buckets.length; i++) {
      var v = buckets[i];
      if (!v) continue;
      var yTop = y(min + (i + 1) * bucketPriceSize);
      var yBottom = y(min + i * bucketPriceSize);
      var w = (v / maxBucket) * VP_MAX_WIDTH;
      ctx.fillRect(W - w, yTop, w, Math.max(yBottom - yTop, 1));
    }
  }

  function drawVolumeBars(visible, panelTop, panelH) {
    var maxVol = Math.max.apply(null, visible.map(function (c) { return c.vol || 0; }).concat([1e-9]));
    visible.forEach(function (c, i) {
      var up = c.close >= c.open;
      ctx.fillStyle = up ? "rgba(56, 201, 193, 0.3)" : "rgba(239, 90, 110, 0.28)";
      var h = ((c.vol || 0) / maxVol) * panelH;
      ctx.fillRect(i * slotPx, panelTop + panelH - h, candleW, h);
    });
  }

  function drawOrderBookWidget() {
    if (!orderBook || W < 900) return;
    var boxW = 152;
    var boxH = 208;
    var x0 = 18;
    var y0 = H - boxH - 18;

    ctx.fillStyle = "rgba(10, 13, 21, 0.6)";
    ctx.fillRect(x0, y0, boxW, boxH);
    ctx.strokeStyle = "rgba(28, 35, 51, 0.9)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x0 + 0.5, y0 + 0.5, boxW - 1, boxH - 1);

    ctx.font = "9px " + MONO_FONT;
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(166, 175, 194, 0.6)";
    ctx.fillText("ORDER BOOK · BTCUSDT", x0 + 8, y0 + 15);

    var rows = orderBook.asks.slice().reverse().concat(orderBook.bids);
    var rowH = (boxH - 24) / rows.length;
    var maxQty = Math.max.apply(null, rows.map(function (l) { return l[1]; }).concat([1e-9]));
    var yCursor = y0 + 22;

    rows.forEach(function (level, i) {
      var isAsk = i < orderBook.asks.length;
      var barColor = isAsk ? "rgba(239, 90, 110, 0.16)" : "rgba(56, 201, 193, 0.16)";
      var textColor = isAsk ? "rgba(239, 90, 110, 0.65)" : "rgba(56, 201, 193, 0.65)";
      var w = (level[1] / maxQty) * (boxW - 16);
      ctx.fillStyle = barColor;
      ctx.fillRect(x0 + 8, yCursor, w, rowH - 2);
      ctx.font = "9px " + MONO_FONT;
      ctx.fillStyle = textColor;
      ctx.fillText(level[0].toFixed(1), x0 + boxW - 58, yCursor + rowH - 3);
      yCursor += rowH;
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var all = forming ? candles.concat([forming]) : candles;
    if (!all.length) return;

    var visibleCount = Math.min(all.length, Math.max(slotCount() + 1 - RIGHT_MARGIN_SLOTS, 1));
    var startIdx = all.length - visibleCount;
    var visible = all.slice(startIdx);
    var closes = all.map(function (c) { return c.close; });
    var maSeries = computeMAs(closes);

    var vals = [];
    visible.forEach(function (c) {
      vals.push(c.high, c.low);
    });
    maSeries.forEach(function (series) {
      series.slice(startIdx).forEach(function (v) {
        if (v != null) vals.push(v);
      });
    });
    var max = Math.max.apply(null, vals);
    var min = Math.min.apply(null, vals);
    var range = Math.max(max - min, max * 0.0005, 1e-6);
    var padTop = H * 0.12;
    var volPanelH = H * VOL_PANEL_RATIO;
    var padBottom = H * 0.12 + volPanelH;
    var chartH = H - padTop - padBottom;

    function y(v) {
      return padTop + (1 - (v - min) / range) * chartH;
    }

    drawGrid(min, max, y);

    var buckets = computeVolumeProfile(visible, min, max);
    drawVolumeProfile(buckets, min, max, y);
    drawPOC(computePOC(buckets), min, max, y);

    for (var i = startIdx; i < all.length; i++) {
      drawCandle(all[i], (i - startIdx) * slotPx, y);
    }

    maSeries.forEach(function (series, idx) {
      var style = MA_STYLES[idx];
      ctx.strokeStyle = style.color;
      ctx.lineWidth = style.width;
      ctx.beginPath();
      var drawing = false;
      for (var j = startIdx; j < series.length; j++) {
        var v = series[j];
        var x = (j - startIdx) * slotPx + candleW / 2;
        if (v == null) {
          drawing = false;
          continue;
        }
        if (!drawing) {
          ctx.moveTo(x, y(v));
          drawing = true;
        } else {
          ctx.lineTo(x, y(v));
        }
      }
      ctx.stroke();
    });

    drawVolumeBars(visible, H - volPanelH - H * 0.02, volPanelH - H * 0.02);
    drawOrderBookWidget();
  }

  // ---- Live BTC/USDT feed via Binance's public REST + WebSocket API (no key required) ----
  function startLiveFeed() {
    var seedUrl = "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=" + Math.min(historyCap(), 1000);

    fetch(seedUrl)
      .then(function (res) {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then(function (rows) {
        candles = rows.map(function (r) {
          return { open: +r[1], high: +r[2], low: +r[3], close: +r[4], vol: +r[5] };
        });
        price = candles.length ? candles[candles.length - 1].close : null;
        forming = null;
        connectSocket();
      })
      .catch(function () {
        startSimulatedFeed();
      });
  }

  function connectSocket() {
    var ws;
    try {
      ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_1d");
    } catch (e) {
      startSimulatedFeed();
      return;
    }

    var connected = false;
    var connectTimeout = setTimeout(function () {
      if (!connected) {
        try { ws.close(); } catch (e) {}
        startSimulatedFeed();
      }
    }, 5000);

    ws.onopen = function () {
      connected = true;
      clearTimeout(connectTimeout);
      live = true;
      if (labelEl) labelEl.textContent = "BTC/USDT";
      fetchOrderBook();
      if (!obTimer) obTimer = setInterval(fetchOrderBook, OB_REFRESH_MS);
    };

    ws.onmessage = function (evt) {
      var msg;
      try {
        msg = JSON.parse(evt.data);
      } catch (e) {
        return;
      }
      var k = msg.k;
      if (!k) return;

      var candle = { open: +k.o, high: +k.h, low: +k.l, close: +k.c, vol: +k.v };
      var prevPrice = price;
      price = candle.close;
      lastDirection = prevPrice == null || price >= prevPrice ? 1 : -1;
      forming = candle;
      updateBadge();

      if (k.x) {
        candles.push(candle);
        if (candles.length > historyCap()) candles.shift();
        forming = null;
      }
      draw();
    };

    ws.onerror = function () {
      if (!connected) {
        clearTimeout(connectTimeout);
        startSimulatedFeed();
      }
    };

    ws.onclose = function () {
      clearTimeout(connectTimeout);
    };
  }

  function fetchOrderBook() {
    fetch("https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=20")
      .then(function (res) {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then(function (data) {
        orderBook = {
          bids: data.bids.slice(0, OB_LEVELS).map(function (l) { return [+l[0], +l[1]]; }),
          asks: data.asks.slice(0, OB_LEVELS).map(function (l) { return [+l[0], +l[1]]; })
        };
      })
      .catch(function () {
        // leave the previous snapshot (if any); never fabricate one
      });
  }

  // ---- Fallback: deterministic simulated feed, used if Binance is unreachable ----
  function startSimulatedFeed() {
    if (live) return; // already running for real
    live = false;
    orderBook = null;
    if (obTimer) {
      clearInterval(obTimer);
      obTimer = null;
    }
    if (labelEl) labelEl.textContent = "SIMULATED";

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

    price = 100;
    candles = [];
    forming = newForming(price);
    while (candles.length < historyCap()) {
      var open = price;
      var drift = (rand() - 0.5) * 3.2;
      var close = Math.max(20, open + drift);
      var high = Math.max(open, close) + rand() * 1.8;
      var low = Math.min(open, close) - rand() * 1.8;
      var vol = 50 + rand() * 500;
      price = close;
      candles.unshift({ open: open, close: close, high: high, low: low, vol: vol });
    }

    var elapsed = 0;
    var lastTs = 0;
    function loop(ts) {
      if (!lastTs) lastTs = ts;
      var dt = ts - lastTs;
      lastTs = ts;

      var wobble = (rand() - 0.5) * 2.4 * (dt / SIM_TICK_MS);
      lastDirection = wobble >= 0 ? 1 : -1;
      price = Math.max(20, price + wobble);
      forming.close = price;
      forming.high = Math.max(forming.high, price);
      forming.low = Math.min(forming.low, price);
      forming.vol += Math.abs(wobble) * (40 + rand() * 60);
      updateBadge();

      elapsed += dt;
      if (elapsed >= SIM_TICK_MS) {
        elapsed = 0;
        candles.push(forming);
        if (candles.length > historyCap()) candles.shift();
        forming = newForming(price);
      }

      draw();
      if (!reduceMotion) requestAnimationFrame(loop);
    }

    if (!reduceMotion) requestAnimationFrame(loop);
    else draw();
  }

  window.addEventListener("resize", resize);
  resize();
  startLiveFeed();
})();
