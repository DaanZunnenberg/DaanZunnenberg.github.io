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
  var periodMs = 1000; // one bar per second, mirroring Binance's 1s klines

  var candles = [];
  var forming = null;
  var price = null;
  var lastDirection = 1;
  var live = false; // true once real BTC/USDT data is flowing

  var priceEl = document.getElementById("live-price");
  var labelEl = document.getElementById("live-symbol");
  var badge = document.getElementById("live-badge");

  function newForming(open) {
    return { open: open, close: open, high: open, low: open };
  }

  function slotCount() {
    return Math.ceil(W / slotPx) + 1;
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (candles.length > slotCount()) {
      candles = candles.slice(candles.length - slotCount());
    }
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
    var color = up ? "rgba(56, 201, 193, 0.16)" : "rgba(239, 90, 110, 0.14)";
    var wickColor = up ? "rgba(56, 201, 193, 0.09)" : "rgba(239, 90, 110, 0.08)";

    ctx.strokeStyle = wickColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + candleW / 2, y(c.high));
    ctx.lineTo(x + candleW / 2, y(c.low));
    ctx.stroke();

    ctx.fillStyle = color;
    var yOpen = y(c.open);
    var yClose = y(c.close);
    var top = Math.min(yOpen, yClose);
    var h = Math.max(Math.abs(yClose - yOpen), 1.2);
    ctx.fillRect(x, top, candleW, h);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var all = forming ? candles.concat([forming]) : candles;
    if (!all.length) return;

    var vals = [];
    all.forEach(function (c) {
      vals.push(c.high, c.low);
    });
    var max = Math.max.apply(null, vals);
    var min = Math.min.apply(null, vals);
    var range = Math.max(max - min, max * 0.0005, 1e-6);
    var padTop = H * 0.15;
    var padBottom = H * 0.15;
    var chartH = H - padTop - padBottom;

    function y(v) {
      return padTop + (1 - (v - min) / range) * chartH;
    }

    all.forEach(function (c, i) {
      var x = i * slotPx;
      drawCandle(c, x, y);
    });
  }

  // ---- Live BTC/USDT feed via Binance's public REST + WebSocket API (no key required) ----
  function startLiveFeed() {
    var seedUrl = "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1s&limit=" + slotCount();

    fetch(seedUrl)
      .then(function (res) {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then(function (rows) {
        candles = rows.map(function (r) {
          return { open: +r[1], high: +r[2], low: +r[3], close: +r[4] };
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
      ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_1s");
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

      var candle = { open: +k.o, high: +k.h, low: +k.l, close: +k.c };
      var prevPrice = price;
      price = candle.close;
      lastDirection = prevPrice == null || price >= prevPrice ? 1 : -1;
      forming = candle;
      updateBadge();

      if (k.x) {
        candles.push(candle);
        if (candles.length > slotCount()) candles.shift();
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

  // ---- Fallback: deterministic simulated feed, used if Binance is unreachable ----
  function startSimulatedFeed() {
    if (live) return; // already running for real
    live = false;
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
    while (candles.length < slotCount()) {
      var open = price;
      var drift = (rand() - 0.5) * 3.2;
      var close = Math.max(20, open + drift);
      var high = Math.max(open, close) + rand() * 1.8;
      var low = Math.min(open, close) - rand() * 1.8;
      price = close;
      candles.unshift({ open: open, close: close, high: high, low: low });
    }

    var elapsed = 0;
    var lastTs = 0;
    function loop(ts) {
      if (!lastTs) lastTs = ts;
      var dt = ts - lastTs;
      lastTs = ts;

      var wobble = (rand() - 0.5) * 2.4 * (dt / periodMs);
      lastDirection = wobble >= 0 ? 1 : -1;
      price = Math.max(20, price + wobble);
      forming.close = price;
      forming.high = Math.max(forming.high, price);
      forming.low = Math.min(forming.low, price);
      updateBadge();

      elapsed += dt;
      if (elapsed >= periodMs) {
        elapsed = 0;
        candles.push(forming);
        if (candles.length > slotCount()) candles.shift();
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
