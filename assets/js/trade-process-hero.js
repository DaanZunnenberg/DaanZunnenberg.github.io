(function () {
  var canvas = document.getElementById("trade-process-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // A live marked point process: each Binance aggTrade is an arrival (time)
  // with a mark (signed size, from the taker's side). Plotted as a partial-sum
  // path S_t = sum of marks, this is exactly the object empirical process
  // theory studies — and its running supremum is displayed live, echoing the
  // page's own "controlling suprema of stochastic processes" framing. The
  // buffer is backfilled from REST on load so the path is already full length
  // before the socket delivers a single live tick.
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var MONO_FONT = "'SF Mono', Menlo, Consolas, monospace";
  var SYMBOL = "btcusdt";
  var MAX_POINTS = 420;

  // Same ThinkOrSwim-inspired palette as the other live-trade hero sections.
  var AMBER = "rgba(224, 168, 82, 0.75)";
  var UP_TEXT = "rgba(88, 214, 151, 0.9)";
  var DOWN_TEXT = "rgba(235, 110, 110, 0.9)";
  var UP_LINE = "88, 214, 151";
  var DOWN_LINE = "235, 110, 110";

  var points = []; // { s: cumulative sum, dir: +1/-1, qty }
  var live = false;
  var tradeCount = 0;

  function mark(qty, isSellerTaker) {
    return (isSellerTaker ? -1 : 1) * Math.sqrt(qty);
  }

  function pushTrade(qty, isSellerTaker) {
    var prevS = points.length ? points[points.length - 1].s : 0;
    var dir = isSellerTaker ? -1 : 1;
    points.push({ s: prevS + mark(qty, isSellerTaker), dir: dir, qty: qty });
    if (points.length > MAX_POINTS) points.shift();
    tradeCount++;
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
    if (!points.length) return;

    var top = H * 0.14, bottom = H * 0.86, midY = (top + bottom) / 2;
    var maxAbs = 0.0001;
    points.forEach(function (p) { if (Math.abs(p.s) > maxAbs) maxAbs = Math.abs(p.s); });
    var scale = (bottom - top) / 2 / maxAbs;
    var stepX = W / Math.max(1, MAX_POINTS - 1);
    var offset = MAX_POINTS - points.length;

    // Zero line: the path's natural resting level.
    ctx.strokeStyle = "rgba(166, 175, 194, 0.18)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(W, midY);
    ctx.stroke();

    // Running supremum band: sup_{t<=T} |S_t| over the visible window.
    var sup = 0;
    points.forEach(function (p) { if (Math.abs(p.s) > sup) sup = Math.abs(p.s); });
    ctx.strokeStyle = "rgba(224, 168, 82, 0.22)";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, midY - sup * scale);
    ctx.lineTo(W, midY - sup * scale);
    ctx.moveTo(0, midY + sup * scale);
    ctx.lineTo(W, midY + sup * scale);
    ctx.stroke();
    ctx.setLineDash([]);

    // The partial-sum path itself, colored per segment by the trade that
    // produced it — green where the taker bought, red where the taker sold.
    ctx.lineWidth = 1.4;
    for (var i = 1; i < points.length; i++) {
      var x0 = (offset + i - 1) * stepX, y0 = midY - points[i - 1].s * scale;
      var x1 = (offset + i) * stepX, y1 = midY - points[i].s * scale;
      ctx.strokeStyle = "rgba(" + (points[i].dir >= 0 ? UP_LINE : DOWN_LINE) + ", 0.55)";
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    }

    // Each arrival as a point, sized by trade quantity.
    points.forEach(function (p, i) {
      var x = (offset + i) * stepX, y = midY - p.s * scale;
      var r = Math.max(0.8, Math.min(3.2, Math.sqrt(p.qty) * 6));
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + (p.dir >= 0 ? UP_LINE : DOWN_LINE) + ", 0.7)";
      ctx.fill();
    });

    ctx.font = "11px " + MONO_FONT;
    ctx.textAlign = "left";
    ctx.fillStyle = AMBER;
    ctx.fillText(SYMBOL.toUpperCase() + " · AGGTRADE · " + (live ? "LIVE" : "SNAPSHOT"), 10, 20);

    ctx.textAlign = "right";
    ctx.fillStyle = "rgba(224, 168, 82, 0.65)";
    ctx.fillText("sup |Sₜ| = " + sup.toFixed(2) + "   (n = " + tradeCount + ")", W - 10, H - 12);
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
      if (!data || !data.p || !data.q) return;
      pushTrade(+data.q, !!data.m);
    };
  }

  function backfill() {
    fetch("https://api.binance.com/api/v3/aggTrades?symbol=" + SYMBOL.toUpperCase() + "&limit=" + MAX_POINTS)
      .then(function (res) { return res.json(); })
      .then(function (trades) {
        trades.forEach(function (t) { pushTrade(+t.q, !!t.m); });
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
