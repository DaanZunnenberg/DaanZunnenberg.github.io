(function () {
  // A short market-making Python snippet typed out at a randomized,
  // human-ish pace (variable per-character delay, longer pauses at line
  // breaks), with a blinking block cursor. No live data — purely a
  // decorative "code forming" backdrop for the hero.
  var canvas = document.getElementById("code-type-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var FONT_SIZE = 14;
  var LINE_HEIGHT = 21;
  var PAD_X = 22;
  var PAD_Y = 26;

  var COLOR_DEFAULT = "rgba(220, 223, 230, 0.92)";
  var COLOR_KEYWORD = "rgba(159, 176, 201, 0.95)";
  var COLOR_STRING = "rgba(184, 192, 204, 0.95)";
  var COLOR_COMMENT = "rgba(122, 130, 145, 0.85)";
  var COLOR_FUNC = "rgba(183, 160, 102, 0.95)";
  var COLOR_NUM = "rgba(201, 112, 122, 0.95)";
  var CURSOR = "rgba(220, 223, 230, 0.85)";

  var KEYWORDS = ["class", "def", "self", "return", "if", "else", "elif", "for", "in", "while", "import", "from", "True", "False", "None", "not", "and", "or", "raise", "try", "except"];

  var LINES = [
    "import numpy as np",
    "from collections import deque",
    "",
    "class AvellanedaStoikovMarketMaker:",
    "    \"\"\"Optimal quoting under inventory risk (Avellaneda-Stoikov, 2008).\"\"\"",
    "",
    "    def __init__(self, gamma=0.1, k=1.5, horizon=1.0, max_inventory=50):",
    "        self.gamma = gamma",
    "        self.k = k",
    "        self.horizon = horizon",
    "        self.max_inventory = max_inventory",
    "        self.inventory = 0",
    "        self.pnl = 0.0",
    "        self.returns = deque(maxlen=200)",
    "        self.last_mid = None",
    "",
    "    def update_volatility(self, mid_price):",
    "        if self.last_mid is not None:",
    "            self.returns.append(np.log(mid_price / self.last_mid))",
    "        self.last_mid = mid_price",
    "        if len(self.returns) < 20:",
    "            return 0.02",
    "        return float(np.std(self.returns) * np.sqrt(252 * 6.5 * 3600))",
    "",
    "    def reservation_price(self, mid, sigma, t):",
    "        time_left = max(self.horizon - t, 1e-6)",
    "        return mid - self.inventory * self.gamma * sigma ** 2 * time_left",
    "",
    "    def optimal_spread(self, sigma, t):",
    "        time_left = max(self.horizon - t, 1e-6)",
    "        variance_term = self.gamma * sigma ** 2 * time_left",
    "        intensity_term = (2 / self.gamma) * np.log(1 + self.gamma / self.k)",
    "        return variance_term + intensity_term",
    "",
    "    def quote(self, mid, t):",
    "        sigma = self.update_volatility(mid)",
    "        r = self.reservation_price(mid, sigma, t)",
    "        spread = self.optimal_spread(sigma, t)",
    "        bid = r - spread / 2",
    "        ask = r + spread / 2",
    "        return round(bid, 2), round(ask, 2)",
    "",
    "    def risk_check(self, side, size):",
    "        projected = self.inventory + (size if side == \"buy\" else -size)",
    "        if abs(projected) > self.max_inventory:",
    "            raise ValueError(\"inventory limit breached\")",
    "        return True",
    "",
    "    def on_fill(self, side, size, price):",
    "        self.risk_check(side, size)",
    "        sign = 1 if side == \"buy\" else -1",
    "        self.inventory += sign * size",
    "        self.pnl -= sign * size * price",
    "",
    "    def mark_to_market(self, mid):",
    "        return self.pnl + self.inventory * mid",
    "",
    "",
    "def run(feed, exchange, model, horizon=1.0):",
    "    t = 0.0",
    "    while t < horizon:",
    "        mid = feed.mid_price()",
    "        bid, ask = model.quote(mid, t)",
    "        exchange.cancel_all()",
    "        exchange.place(\"buy\", bid, size=1)",
    "        exchange.place(\"sell\", ask, size=1)",
    "        for side, size, price in exchange.poll_fills():",
    "            model.on_fill(side, size, price)",
    "        t += feed.tick()",
    "    return model.mark_to_market(feed.mid_price())"
  ];

  function tokenize(line) {
    var tokens = [];
    var re = /(#.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|(\b\d+\.?\d*\b)|([A-Za-z_][A-Za-z0-9_]*)(?=\()|(\b(?:class|def|self|return|if|else|elif|for|in|import|from|True|False|None)\b)|([A-Za-z_][A-Za-z0-9_]*)/g;
    var last = 0;
    var m;
    while ((m = re.exec(line))) {
      if (m.index > last) tokens.push({ text: line.slice(last, m.index), color: COLOR_DEFAULT });
      if (m[1]) tokens.push({ text: m[1], color: COLOR_COMMENT });
      else if (m[2]) tokens.push({ text: m[2], color: COLOR_STRING });
      else if (m[3]) tokens.push({ text: m[3], color: COLOR_NUM });
      else if (m[4]) tokens.push({ text: m[4], color: COLOR_FUNC });
      else if (m[5]) tokens.push({ text: m[5], color: COLOR_KEYWORD });
      else tokens.push({ text: m[6], color: COLOR_DEFAULT });
      last = re.lastIndex;
    }
    if (last < line.length) tokens.push({ text: line.slice(last), color: COLOR_DEFAULT });
    return tokens;
  }

  var fullText = LINES.join("\n");
  var charCount = 0;
  var running = false;
  var visible = true;
  var typingTimer = null;

  function resize() {
    W = container.clientWidth;
    H = container.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw(cursorOn) {
    ctx.clearRect(0, 0, W, H);
    ctx.font = FONT_SIZE + "px 'IBM Plex Mono', 'SF Mono', Menlo, Consolas, monospace";
    ctx.textBaseline = "top";

    var revealed = fullText.slice(0, charCount).split("\n");

    // Once the typed content grows past the visible height, shift the
    // whole block up so the newest lines (and the cursor) stay in view,
    // like a terminal following its own output.
    var contentBottom = PAD_Y + revealed.length * LINE_HEIGHT;
    var maxVisibleBottom = H - PAD_Y + LINE_HEIGHT;
    var scrollY = Math.max(0, contentBottom - maxVisibleBottom);

    var y = PAD_Y - scrollY;
    var lastX = PAD_X;
    var lastY = y;

    for (var i = 0; i < revealed.length; i++) {
      var tokens = tokenize(revealed[i]);
      var x = PAD_X;
      tokens.forEach(function (tok) {
        ctx.fillStyle = tok.color;
        ctx.fillText(tok.text, x, y);
        x += ctx.measureText(tok.text).width;
      });
      lastX = x;
      lastY = y;
      y += LINE_HEIGHT;
    }

    if (cursorOn) {
      ctx.fillStyle = CURSOR;
      ctx.fillRect(lastX + 1, lastY + 1, 7, FONT_SIZE);
    }
  }

  function scheduleNextChar() {
    if (!running) return;
    var atEnd = charCount >= fullText.length;
    if (atEnd) {
      typingTimer = setTimeout(function () {
        charCount = 0;
        draw(true);
        scheduleNextChar();
      }, 900);
      return;
    }
    var nextChar = fullText[charCount];
    var delay = 8 + Math.random() * 12;
    if (nextChar === "\n") delay = 320 + Math.random() * 220;
    else if (nextChar === " ") delay *= 0.6;
    typingTimer = setTimeout(function () {
      charCount++;
      draw(true);
      scheduleNextChar();
    }, delay);
  }

  var blinkTimer = null;
  var cursorVisible = true;
  function startBlink() {
    stopBlink();
    blinkTimer = setInterval(function () {
      cursorVisible = !cursorVisible;
      draw(cursorVisible);
    }, 530);
  }
  function stopBlink() {
    if (blinkTimer) {
      clearInterval(blinkTimer);
      blinkTimer = null;
    }
  }

  function start() {
    if (running || !visible || document.hidden) return;
    running = true;
    if (reduceMotion) {
      charCount = fullText.length;
      draw(false);
      return;
    }
    scheduleNextChar();
    startBlink();
  }

  function stop() {
    running = false;
    if (typingTimer) clearTimeout(typingTimer);
    stopBlink();
  }

  window.addEventListener("resize", function () {
    resize();
    draw(true);
  });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[entries.length - 1].isIntersecting;
      if (visible) start(); else stop();
    }).observe(canvas);
  }

  resize();
  draw(true);
  start();
})();
