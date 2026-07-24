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
  var PAD_X = 25;
  var PAD_Y = 26;
  var PAD_BOTTOM = 44;

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
    "async def _sub_stream(\n" +
      "    session: aiohttp.ClientSession,\n" +
      "    url: str,\n" +
      "    channels: list[str],\n" +
      ") -> AsyncIterator[tuple[str, Any]]:\n" +
      "    \"\"\"\n" +
      "    Connect, subscribe to channels, yield (channel, data) pairs.\n" +
      "    Handles Deribit application-level heartbeats and auto-reconnects on drop.\n" +
      "    The caller is responsible for creating and closing the ClientSession.\n" +
      "    \"\"\"\n" +
      "    sub = orjson.dumps({\n" +
      "        \"jsonrpc\": \"2.0\", \"method\": \"public/subscribe\",\n" +
      "        \"params\": {\"channels\": channels}, \"id\": 1,\n" +
      "    }).decode()",

    "    while True:\n" +
      "        try:\n" +
      "            async with session.ws_connect(url, heartbeat=30) as ws:\n" +
      "                await ws.send_str(sub)\n" +
      "                async for msg in ws:\n" +
      "                    if msg.type == aiohttp.WSMsgType.TEXT:\n" +
      "                        data = orjson.loads(msg.data)\n" +
      "                        if data.get(\"method\") == \"heartbeat\":\n" +
      "                            if data.get(\"params\", {}).get(\"type\") == \"test_request\":\n" +
      "                                await ws.send_str(_HB_REPLY)\n" +
      "                            continue\n" +
      "                        if data.get(\"method\") == \"subscription\":\n" +
      "                            yield data[\"params\"][\"channel\"], data[\"params\"][\"data\"]\n" +
      "                    elif msg.type in (\n" +
      "                        aiohttp.WSMsgType.CLOSE,\n" +
      "                        aiohttp.WSMsgType.ERROR,\n" +
      "                        aiohttp.WSMsgType.CLOSED,\n" +
      "                    ):\n" +
      "                        exc = ws.exception()\n" +
      "                        log.warning(\"WS closed (%s) — reconnecting in 1 s\", exc or msg.type)\n" +
      "                        break\n" +
      "        except (aiohttp.ClientError, asyncio.TimeoutError, OSError) as exc:\n" +
      "            log.warning(\"WS dropped (%s) — reconnecting in 1 s\", exc)\n" +
      "            await asyncio.sleep(1)",

    "class DeribitConnector:\n" +
      "    \"\"\"\n" +
      "    WebSocket connector for all public Deribit data streams.\n" +
      "\n" +
      "    Each watch_* method is an independent async generator backed by a dedicated\n" +
      "    aiohttp ClientSession. Run multiple streams concurrently with asyncio.gather().\n" +
      "\n" +
      "    Supported streams\n" +
      "    -----------------\n" +
      "    watch_order_book — L2 book with incremental updates\n" +
      "    watch_trades     — public trade tape\n" +
      "    watch_ticker     — full ticker\n" +
      "    watch_index      — spot index price (btc_usd, eth_usd, …)\n" +
      "    watch_funding    — perpetual funding rate\n" +
      "    \"\"\"\n" +
      "\n" +
      "    def __init__(self, api_key: str = \"\", api_secret: str = \"\", testnet: bool = False) -> None:\n" +
      "        self._api_key = api_key\n" +
      "        self._api_secret = api_secret\n" +
      "        self._url = _WS_TEST if testnet else _WS_LIVE",

    "    # ------------------------------------------------------------------\n" +
      "    # Order book — stateful (snapshot + incremental deltas)\n" +
      "    # ------------------------------------------------------------------\n" +
      "\n" +
      "    async def watch_order_book(\n" +
      "        self, instrument: str, depth: int = 20\n" +
      "    ) -> AsyncIterator[OrderBookSnapshot]:\n" +
      "        async with aiohttp.ClientSession() as session:\n" +
      "            while True:\n" +
      "                async for snap in self._book_stream(session, instrument, depth):\n" +
      "                    yield snap",

    "    async def _book_stream(\n" +
      "        self,\n" +
      "        session: aiohttp.ClientSession,\n" +
      "        instrument: str,\n" +
      "        depth: int,\n" +
      "    ) -> AsyncIterator[OrderBookSnapshot]:\n" +
      "        # Full raw book channel — Deribit sends [action, price, qty] entries.\n" +
      "        # Depth-filtered channels (e.g. book.X.none.5.100ms) silently return [].\n" +
      "        channel = f\"book.{instrument}.100ms\"\n" +
      "\n" +
      "        bids: dict[float, float] = {}\n" +
      "        asks: dict[float, float] = {}\n" +
      "        last_change_id: int | None = None\n" +
      "\n" +
      "        sub = orjson.dumps({\n" +
      "            \"jsonrpc\": \"2.0\", \"method\": \"public/subscribe\",\n" +
      "            \"params\": {\"channels\": [channel]}, \"id\": 1,\n" +
      "        }).decode()",

    "        try:\n" +
      "            async with session.ws_connect(self._url, heartbeat=30) as ws:\n" +
      "                await ws.send_str(sub)\n" +
      "                async for msg in ws:\n" +
      "                    if msg.type != aiohttp.WSMsgType.TEXT:\n" +
      "                        if msg.type in (\n" +
      "                            aiohttp.WSMsgType.CLOSE,\n" +
      "                            aiohttp.WSMsgType.ERROR,\n" +
      "                            aiohttp.WSMsgType.CLOSED,\n" +
      "                        ):\n" +
      "                            log.warning(\"book WS closed (%s) — reconnecting in 1 s\", ws.exception())\n" +
      "                            break\n" +
      "                        continue\n" +
      "\n" +
      "                    envelope = orjson.loads(msg.data)\n" +
      "\n" +
      "                    if envelope.get(\"method\") == \"heartbeat\":\n" +
      "                        if envelope.get(\"params\", {}).get(\"type\") == \"test_request\":\n" +
      "                            await ws.send_str(_HB_REPLY)\n" +
      "                        continue\n" +
      "\n" +
      "                    if envelope.get(\"method\") != \"subscription\":\n" +
      "                        continue\n" +
      "\n" +
      "                    data = envelope[\"params\"][\"data\"]\n" +
      "\n" +
      "                    if \"type\" not in data:\n" +
      "                        log.debug(\"book: ignoring message without 'type': %s\", data)\n" +
      "                        continue",

    "                    if data[\"type\"] == \"snapshot\":\n" +
      "                        # Snapshot entries: [action, price, qty]; action is always \"new\".\n" +
      "                        bids = {float(p): float(q) for _, p, q in data[\"bids\"]}\n" +
      "                        asks = {float(p): float(q) for _, p, q in data[\"asks\"]}\n" +
      "                        last_change_id = data[\"change_id\"]\n" +
      "\n" +
      "                    elif data[\"type\"] == \"change\":\n" +
      "                        if last_change_id is None or data[\"prev_change_id\"] != last_change_id:\n" +
      "                            # Gap in change_id sequence: the book state is corrupt.\n" +
      "                            # Break to close this WS connection; the outer while-True in\n" +
      "                            # watch_order_book will reconnect and receive a fresh snapshot.\n" +
      "                            log.warning(\n" +
      "                                \"book: change_id gap for %s (expected %s, got %s) — reconnecting\",\n" +
      "                                instrument,\n" +
      "                                last_change_id,\n" +
      "                                data.get(\"prev_change_id\"),\n" +
      "                            )\n" +
      "                            bids.clear()\n" +
      "                            asks.clear()\n" +
      "                            last_change_id = None\n" +
      "                            break",

    "                        for action, price, qty in data[\"bids\"]:\n" +
      "                            p = float(price)\n" +
      "                            if action == \"delete\":\n" +
      "                                bids.pop(p, None)\n" +
      "                            else:\n" +
      "                                bids[p] = float(qty)\n" +
      "\n" +
      "                        for action, price, qty in data[\"asks\"]:\n" +
      "                            p = float(price)\n" +
      "                            if action == \"delete\":\n" +
      "                                asks.pop(p, None)\n" +
      "                            else:\n" +
      "                                asks[p] = float(qty)\n" +
      "\n" +
      "                        last_change_id = data[\"change_id\"]\n" +
      "                    else:\n" +
      "                        continue",

    "                    if bids and asks:\n" +
      "                        yield OrderBookSnapshot(\n" +
      "                            instrument_name=instrument,\n" +
      "                            bids=sorted(bids.items(), reverse=True)[:depth],\n" +
      "                            asks=sorted(asks.items())[:depth],\n" +
      "                            timestamp=float(data[\"timestamp\"]),\n" +
      "                        )\n" +
      "\n" +
      "        except (aiohttp.ClientError, asyncio.TimeoutError, OSError) as exc:\n" +
      "            log.warning(\"book stream dropped (%s) — reconnecting in 1 s\", exc)\n" +
      "            await asyncio.sleep(1)",

    "    # ------------------------------------------------------------------\n" +
      "    # Trades\n" +
      "    # ------------------------------------------------------------------\n" +
      "\n" +
      "    async def watch_trades(self, instrument: str) -> AsyncIterator[Trade]:\n" +
      "        channel = f\"trades.{instrument}.100ms\"\n" +
      "        async with aiohttp.ClientSession() as session:\n" +
      "            async for _, data in _sub_stream(session, self._url, [channel]):\n" +
      "                for t in data:\n" +
      "                    yield Trade(\n" +
      "                        instrument_name=instrument,\n" +
      "                        price=float(t[\"price\"]),\n" +
      "                        amount=float(t[\"amount\"]),\n" +
      "                        direction=t[\"direction\"],\n" +
      "                        timestamp=float(t[\"timestamp\"]),\n" +
      "                        trade_id=t[\"trade_id\"],\n" +
      "                        index_price=float(t.get(\"index_price\") or 0.0),\n" +
      "                    )",

    "    # ------------------------------------------------------------------\n" +
      "    # Ticker\n" +
      "    # ------------------------------------------------------------------\n" +
      "\n" +
      "    async def watch_ticker(self, instrument: str) -> AsyncIterator[Ticker]:\n" +
      "        channel = f\"ticker.{instrument}.100ms\"\n" +
      "        async with aiohttp.ClientSession() as session:\n" +
      "            async for _, t in _sub_stream(session, self._url, [channel]):\n" +
      "                yield Ticker(\n" +
      "                    instrument_name=instrument,\n" +
      "                    timestamp=float(t[\"timestamp\"]),\n" +
      "                    mark_price=float(t[\"mark_price\"]),\n" +
      "                    index_price=float(t[\"index_price\"]),\n" +
      "                    best_bid_price=float(t.get(\"best_bid_price\") or 0.0),\n" +
      "                    best_ask_price=float(t.get(\"best_ask_price\") or 0.0),\n" +
      "                    best_bid_amount=float(t.get(\"best_bid_amount\") or 0.0),\n" +
      "                    best_ask_amount=float(t.get(\"best_ask_amount\") or 0.0),\n" +
      "                    last_price=float(t[\"last_price\"]) if t.get(\"last_price\") is not None else None,\n" +
      "                    open_interest=float(t.get(\"open_interest\") or 0.0),\n" +
      "                    current_funding=float(t[\"current_funding\"]) if t.get(\"current_funding\") is not None else None,\n" +
      "                    funding_8h=float(t[\"funding_8h\"]) if t.get(\"funding_8h\") is not None else None,\n" +
      "                )",

    "    # ------------------------------------------------------------------\n" +
      "    # Index price  (e.g. index_name='btc_usd', 'eth_usd', 'sol_usd')\n" +
      "    # ------------------------------------------------------------------\n" +
      "\n" +
      "    async def watch_index(self, index_name: str) -> AsyncIterator[IndexPrice]:\n" +
      "        channel = f\"deribit_price_index.{index_name}\"\n" +
      "        async with aiohttp.ClientSession() as session:\n" +
      "            async for _, data in _sub_stream(session, self._url, [channel]):\n" +
      "                yield IndexPrice(\n" +
      "                    index_name=data[\"index_name\"],\n" +
      "                    price=float(data[\"price\"]),\n" +
      "                    timestamp=float(data[\"timestamp\"]),\n" +
      "                )",

    "    # ------------------------------------------------------------------\n" +
      "    # Perpetual funding rate\n" +
      "    # ------------------------------------------------------------------\n" +
      "\n" +
      "    async def watch_funding(self, instrument: str) -> AsyncIterator[FundingRate]:\n" +
      "        channel = f\"perpetual.{instrument}.100ms\"\n" +
      "        async with aiohttp.ClientSession() as session:\n" +
      "            async for _, data in _sub_stream(session, self._url, [channel]):\n" +
      "                yield FundingRate(\n" +
      "                    instrument_name=instrument,\n" +
      "                    timestamp=float(data[\"timestamp\"]),\n" +
      "                    current_funding=float(data.get(\"current_funding\") or 0.0),\n" +
      "                    funding_8h=float(data.get(\"funding_8h\") or 0.0),\n" +
      "                    interest_rate=float(data.get(\"interest_rate\") or 0.0),\n" +
      "                )"
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

    // Anchor the newest line to a fixed baseline near the bottom of the
    // hero, and lay earlier lines out upward from there — like a terminal
    // whose prompt always sits in the same place, rather than text that
    // starts at the top and only starts scrolling once it overflows.
    var bottomLineY = H - PAD_BOTTOM - LINE_HEIGHT;
    var y = bottomLineY - (revealed.length - 1) * LINE_HEIGHT;
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
      }, 2200);
      return;
    }
    // Whole chunks (a method at a time) are burst-typed in one pass; the
    // real pause is the beat held once a chunk completes, so it reads like
    // blocks of code landing rather than a sentence being spoken.
    var nextChar = fullText[charCount];
    var delay = 6 + Math.random() * 7;
    if (nextChar === "\n") delay = 42;
    typingTimer = setTimeout(function () {
      charCount++;
      draw(true);
      if (chunkEnds[charCount]) {
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
