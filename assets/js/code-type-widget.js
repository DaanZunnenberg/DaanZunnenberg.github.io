(function () {
  // A mid-file market-making Python snippet, burst-typed one method at a
  // time (near-instant within a chunk, a held beat between chunks), with a
  // blinking block cursor. No live data, nothing here is ever executed —
  // purely a decorative "code forming" backdrop for the hero.
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

  var KEYWORDS = ["class", "def", "self", "return", "if", "else", "elif", "for", "in", "while", "import", "from", "True", "False", "None", "not", "and", "or", "raise", "try", "except", "with", "lambda", "is"];

  // Each entry is one "chunk" -- a whole method or logical block -- typed at
  // high speed in one burst, with a visible pause between chunks. The
  // snippet intentionally opens mid-class (no imports, no class header) so
  // it reads like a scrollback of an already-open file, not a fresh script.
  var CHUNKS = [
    "    gamma: float = 0.1\n" +
      "    kappa: float = 1.5\n" +
      "    horizon: float = 1.0\n" +
      "    max_inventory: int = 50\n" +
      "    _lock: threading.Lock = field(default_factory=threading.Lock, repr=False)\n" +
      "    _returns: deque = field(default_factory=lambda: deque(maxlen=512), repr=False)\n" +
      "    _last_mid: Optional[float] = field(default=None, repr=False)",

    "    @staticmethod\n" +
      "    @nb.njit(cache=True, fastmath=True, nogil=True)\n" +
      "    def _ewma_vol(log_returns: np.ndarray, half_life: float) -> float:\n" +
      "        decay = np.exp(-np.log(2.0) / half_life)\n" +
      "        weight, num, den = 1.0, 0.0, 0.0\n" +
      "        for i in range(log_returns.shape[0] - 1, -1, -1):\n" +
      "            num += weight * log_returns[i] ** 2\n" +
      "            den += weight\n" +
      "            weight *= decay\n" +
      "        return np.sqrt(num / den) * np.sqrt(252.0 * 6.5 * 3600.0)",

    "    @functools.lru_cache(maxsize=4096)\n" +
      "    def _hawkes_branching_ratio(self, alpha: float, beta: float) -> float:\n" +
      "        if beta <= alpha:\n" +
      "            raise ValueError(\"unstable Hawkes kernel: alpha >= beta\")\n" +
      "        return alpha / beta",

    "    def reservation_price(self, mid: float, sigma: float, t: float) -> float:\n" +
      "        with self._lock:\n" +
      "            inv = self.inventory\n" +
      "        time_left = max(self.horizon - t, 1e-6)\n" +
      "        skew = inv * self.gamma * sigma ** 2 * time_left\n" +
      "        return mid - skew",

    "    def optimal_spread(self, sigma: float, t: float, intensity: float) -> float:\n" +
      "        time_left = max(self.horizon - t, 1e-6)\n" +
      "        variance_term = self.gamma * sigma ** 2 * time_left\n" +
      "        liquidity_term = (2.0 / self.gamma) * np.log1p(self.gamma / self.kappa)\n" +
      "        queue_term = 0.5 * np.log1p(intensity / self.kappa)\n" +
      "        return variance_term + liquidity_term + queue_term",

    "    def quote(self, mid: float, t: float, book: OrderBookSnapshot) -> Tuple[float, float]:\n" +
      "        sigma = self._ewma_vol(np.asarray(self._returns), half_life=64.0)\n" +
      "        intensity = book.trade_intensity(window=5.0)\n" +
      "        r = self.reservation_price(mid, sigma, t)\n" +
      "        spread = self.optimal_spread(sigma, t, intensity)\n" +
      "        bid, ask = r - spread / 2.0, r + spread / 2.0\n" +
      "        return round(bid, 2), round(ask, 2)",

    "    @retry(exceptions=(ConnectionError,), tries=3, backoff=1.5)\n" +
      "    def on_fill(self, side: Side, size: float, price: float) -> None:\n" +
      "        with self._lock:\n" +
      "            sign = 1.0 if side is Side.BUY else -1.0\n" +
      "            projected = self.inventory + sign * size\n" +
      "            if abs(projected) > self.max_inventory:\n" +
      "                raise InventoryLimitError(projected, self.max_inventory)\n" +
      "            self.inventory = projected\n" +
      "            self.pnl -= sign * size * price"
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

  var fullText = CHUNKS.join("\n\n");
  var chunkEnds = {};
  (function () {
    var pos = 0;
    for (var i = 0; i < CHUNKS.length; i++) {
      pos += CHUNKS[i].length;
      chunkEnds[pos] = true;
      if (i < CHUNKS.length - 1) pos += 2;
    }
  })();
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
      }, 750);
      return;
    }
    // Whole chunks (a method at a time) are burst-typed almost instantly;
    // the only real pause is the beat held once a chunk completes, so it
    // reads like blocks of code landing rather than a sentence being spoken.
    var nextChar = fullText[charCount];
    var delay = 0.5 + Math.random() * 1;
    if (nextChar === "\n") delay = 6;
    typingTimer = setTimeout(function () {
      charCount++;
      draw(true);
      if (chunkEnds[charCount]) {
        typingTimer = setTimeout(scheduleNextChar, 320 + Math.random() * 180);
      } else {
        scheduleNextChar();
      }
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
