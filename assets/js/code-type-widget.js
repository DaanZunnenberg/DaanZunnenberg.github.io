(function () {
  var canvas = document.getElementById("code-type-canvas");
  if (!canvas) return;
  var container = canvas.parentElement;
  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W, H;
  var FONT_SIZE = 14;
  var LINE_HEIGHT = 21;
  var PAD_X = 0;
  var PAD_Y = 26;
  var PAD_BOTTOM = 44;
  var maxLines = 20;

  var COLOR_DEFAULT = "rgba(220, 223, 230, 0.92)";
  var COLOR_KEYWORD = "rgba(159, 176, 201, 0.95)";
  var COLOR_STRING = "rgba(184, 192, 204, 0.95)";
  var COLOR_COMMENT = "rgba(122, 130, 145, 0.85)";
  var COLOR_FUNC = "rgba(183, 160, 102, 0.95)";
  var COLOR_NUM = "rgba(201, 112, 122, 0.95)";
  var CURSOR = "rgba(220, 223, 230, 0.85)";

  var CHUNKS = [
    "class OrderManager:\n" +
      "    def __init__(self, rest_connector: Any, instrument: str, dry_run: bool = True) -> None:\n" +
      "        self._rest = rest_connector\n" +
      "        self._instrument = instrument\n" +
      "        self._dry_run = dry_run\n" +
      "        self._resting: dict[str, OrderState] = {}",

    "    async def sync_quotes(self, quotes: Quotes) -> None:\n" +
      "        await self._sync_side(\"bid\", \"buy\", quotes.bid_price, quotes.bid_size)\n" +
      "        await self._sync_side(\"ask\", \"sell\", quotes.ask_price, quotes.ask_size)",

    "    async def _sync_side(self, key: str, side: str, price: float, size: float) -> None:\n" +
      "        current = self._resting.get(key)\n" +
      "        if size <= 0.0:\n" +
      "            if current is not None:\n" +
      "                await self._cancel(key)\n" +
      "            return\n" +
      "        if current is not None and abs(current.price - price) < 1e-9 and abs(current.size - size) < 1e-9:\n" +
      "            return\n" +
      "        if current is not None:\n" +
      "            await self._cancel(key)\n" +
      "        await self._place(key, side, price, size)",

    "    async def _place(self, key: str, side: str, price: float, size: float) -> None:\n" +
      "        if self._dry_run:\n" +
      "            log.info(\"DRY-RUN place %s %s %.6f @ %.2f\", side, self._instrument, size, price)\n" +
      "            self._resting[key] = OrderState(order_id=f\"dry-{key}\", side=side, price=price, size=size, instrument=self._instrument)\n" +
      "            return\n" +
      "        resp = await self._rest.place_order(self._instrument, side, size, price)\n" +
      "        order_id = resp.get(\"order\", {}).get(\"order_id\", \"\")\n" +
      "        self._resting[key] = OrderState(order_id=order_id, side=side, price=price, size=size, instrument=self._instrument)",

    "    async def _cancel(self, key: str) -> None:\n" +
      "        state = self._resting.pop(key, None)\n" +
      "        if state is None:\n" +
      "            return\n" +
      "        if self._dry_run:\n" +
      "            log.info(\"DRY-RUN cancel %s\", state.order_id)\n" +
      "            return\n" +
      "        await self._rest.cancel_order(state.order_id)",

    "    async def flatten_all(self) -> None:\n" +
      "        for key in list(self._resting.keys()):\n" +
      "            await self._cancel(key)",

    "class Strategy:\n" +
      "    def __init__(\n" +
      "        self,\n" +
      "        signals: dict[str, BaseSignal],\n" +
      "        pricing_engine: BasePricingEngine,\n" +
      "        risk_model: BaseRiskModel,\n" +
      "        oms: OrderManager,\n" +
      "        sigma_estimator: RealizedVolEstimator | None = None,\n" +
      "    ) -> None:\n" +
      "        self._signals = signals\n" +
      "        self._pricing_engine = pricing_engine\n" +
      "        self._risk_model = risk_model\n" +
      "        self._oms = oms\n" +
      "        self._sigma_estimator = sigma_estimator or RealizedVolEstimator()\n" +
      "        self.inventory = 0.0\n" +
      "        self.pnl_pct = 0.0",

    "    async def on_tick(self, buffers: LOBBuffers) -> None:\n" +
      "        signal_outputs: dict[str, SignalOutput] = {\n" +
      "            name: signal.update(\n" +
      "                buffers.bid_prices, buffers.bid_sizes,\n" +
      "                buffers.ask_prices, buffers.ask_sizes,\n" +
      "                buffers.timestamp,\n" +
      "            )\n" +
      "            for name, signal in self._signals.items()\n" +
      "        }",

    "        micro_price = buffers.micro_price()\n" +
      "        sigma_1s = self._sigma_estimator.update(micro_price, buffers.timestamp)\n" +
      "\n" +
      "        quotes = self._pricing_engine.evaluate(micro_price, self.inventory, signal_outputs, sigma_1s)\n" +
      "        action = self._risk_model.evaluate(self.inventory, sigma_1s, self.pnl_pct, quotes)\n" +
      "\n" +
      "        if action.force_flatten:\n" +
      "            await self._oms.flatten_all()\n" +
      "            return\n" +
      "        if not action.allow:\n" +
      "            return\n" +
      "\n" +
      "        await self._oms.sync_quotes(action.override_quotes or quotes)",

    "    def on_trade_print(self, price: float, size: float) -> None:\n" +
      "        vpin = self._signals.get(\"vpin\")\n" +
      "        if vpin is not None and hasattr(vpin, \"on_trade\"):\n" +
      "            vpin.on_trade(price, size)",

    "    def on_fill(self, side: str, qty: float, price: float) -> None:\n" +
      "        self.inventory += qty if side == \"buy\" else -qty"
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

  // The script repeats forever: once the last chunk finishes, typing wraps
  // straight back to the first chunk (with the same inter-chunk pause) —
  // the buffer of already-drawn lines is never cleared, so it reads as one
  // continuous scroll rather than a page that blanks and restarts.
  var fullText = CHUNKS.join("\n\n");
  var cycleText = fullText + "\n\n";
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
  var typedLines = [""];
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
    PAD_X = W * 0.2;
    maxLines = Math.ceil(H / LINE_HEIGHT) + 4;
    trimLines();
  }

  function trimLines() {
    if (typedLines.length > maxLines) {
      typedLines = typedLines.slice(typedLines.length - maxLines);
    }
  }

  function appendChar(ch) {
    if (ch === "\n") {
      typedLines.push("");
    } else {
      typedLines[typedLines.length - 1] += ch;
    }
    trimLines();
  }

  function draw(cursorOn) {
    ctx.clearRect(0, 0, W, H);
    ctx.font = FONT_SIZE + "px 'IBM Plex Mono', 'SF Mono', Menlo, Consolas, monospace";
    ctx.textBaseline = "top";

    // Anchor the newest line to a fixed baseline near the bottom of the
    // hero, and lay earlier lines out upward from there — like a terminal
    // whose prompt always sits in the same place, rather than text that
    // starts at the top and only starts scrolling once it overflows.
    var bottomLineY = H - PAD_BOTTOM - LINE_HEIGHT;
    var y = bottomLineY - (typedLines.length - 1) * LINE_HEIGHT;
    var lastX = PAD_X;
    var lastY = y;

    for (var i = 0; i < typedLines.length; i++) {
      var tokens = tokenize(typedLines[i]);
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
    var pos = charCount % cycleText.length;
    var nextChar = cycleText[pos];
    // Whole chunks (a method at a time) are burst-typed in one pass; the
    // real pause is the beat held once a chunk completes, so it reads like
    // blocks of code landing rather than a sentence being spoken.
    var delay = 6 + Math.random() * 7;
    if (nextChar === "\n") delay = 42;
    typingTimer = setTimeout(function () {
      charCount++;
      appendChar(nextChar);
      draw(true);
      if (chunkEnds[pos + 1]) {
        typingTimer = setTimeout(scheduleNextChar, 650 + Math.random() * 350);
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
      var allLines = fullText.split("\n");
      typedLines = allLines.slice(-maxLines);
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
