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
  var PAD_X_MIN = 22;
  var PAD_X_INDENT = 460; // clears the left-aligned hero copy + its scrim
  var PAD_X = PAD_X_MIN;
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
      "            self.pnl -= sign * size * price",

    "    @staticmethod\n" +
      "    @nb.njit(cache=True, parallel=True)\n" +
      "    def _covariance_matrix(returns: np.ndarray) -> np.ndarray:\n" +
      "        n, k = returns.shape\n" +
      "        cov = np.zeros((k, k))\n" +
      "        means = np.array([returns[:, j].mean() for j in range(k)])\n" +
      "        for i in nb.prange(k):\n" +
      "            for j in range(i, k):\n" +
      "                acc = 0.0\n" +
      "                for t in range(n):\n" +
      "                    acc += (returns[t, i] - means[i]) * (returns[t, j] - means[j])\n" +
      "                cov[i, j] = cov[j, i] = acc / (n - 1)\n" +
      "        return cov",

    "    @functools.cached_property\n" +
      "    def _kalman_gain(self) -> np.ndarray:\n" +
      "        P, H, R = self._prior_cov, self._obs_matrix, self._obs_noise\n" +
      "        S = H @ P @ H.T + R\n" +
      "        return P @ H.T @ np.linalg.inv(S)",

    "    def __repr__(self) -> str:\n" +
      "        return f\"<{type(self).__name__} inv={self.inventory} pnl={self.pnl:.2f}>\"",

    "class QuoteEngine:\n" +
      "    \"\"\"Owns the async I/O loop; the strategy stays pure sync math, this\n" +
      "    class is the only thing that talks to sockets.\"\"\"\n" +
      "\n" +
      "    def __init__(self, model: AvellanedaStoikovMarketMaker, exchange: ExchangeClient, quote_size: float, requote_interval: float = 0.25) -> None:\n" +
      "        self._model = model\n" +
      "        self._exchange = exchange\n" +
      "        self._quote_size = quote_size\n" +
      "        self._requote_interval = requote_interval",

    "    async def stream_quotes(self, feed: AsyncIterator[Tick]) -> None:\n" +
      "        async with self._exchange.session() as session:\n" +
      "            async for tick in feed:\n" +
      "                bid, ask = self._model.quote(tick.mid, tick.t, tick.book)\n" +
      "                await asyncio.gather(\n" +
      "                    session.replace(\"bid\", bid, size=self._quote_size),\n" +
      "                    session.replace(\"ask\", ask, size=self._quote_size),\n" +
      "                )\n" +
      "                await asyncio.sleep(self._requote_interval)",

    "    async def watch_fills(self) -> None:\n" +
      "        backoff = ExponentialBackoff(base=0.2, cap=5.0)\n" +
      "        while True:\n" +
      "            try:\n" +
      "                async for fill in self._exchange.fills():\n" +
      "                    self._model.on_fill(fill.side, fill.size, fill.price)\n" +
      "                    backoff.reset()\n" +
      "            except ExchangeDisconnected:\n" +
      "                await asyncio.sleep(await backoff.next())\n" +
      "                await self._exchange.reconnect()",

    "    @asynccontextmanager\n" +
      "    async def calibrated(self, window: timedelta = timedelta(minutes=15)) -> AsyncIterator[AvellanedaStoikovMarketMaker]:\n" +
      "        async with self._calibration_lock:\n" +
      "            snapshot = await self._history.fetch(window)\n" +
      "            self._model.gamma, self._model.kappa = await asyncio.to_thread(fit_params, snapshot)\n" +
      "            try:\n" +
      "                yield self._model\n" +
      "            finally:\n" +
      "                await self._history.append(snapshot)",

    "class FixSession:\n" +
      "    \"\"\"Thin wrapper over a FIX 4.4 socket connection with heartbeats.\"\"\"\n" +
      "\n" +
      "    def __init__(self, host: str, port: int, sender_comp_id: str, target_comp_id: str) -> None:\n" +
      "        self._reader: Optional[asyncio.StreamReader] = None\n" +
      "        self._writer: Optional[asyncio.StreamWriter] = None\n" +
      "        self._seq_num = itertools.count(1)\n" +
      "        self._heartbeat_interval = 30\n" +
      "        self._pending: Dict[str, asyncio.Future] = {}",

    "    async def connect(self) -> None:\n" +
      "        self._reader, self._writer = await asyncio.open_connection(self.host, self.port, ssl=self._ssl_ctx)\n" +
      "        await self._send(logon_message(self.sender_comp_id, self.target_comp_id, next(self._seq_num)))\n" +
      "        asyncio.create_task(self._heartbeat_loop())\n" +
      "        asyncio.create_task(self._read_loop())",

    "    async def _read_loop(self) -> None:\n" +
      "        buffer = bytearray()\n" +
      "        while not self._reader.at_eof():\n" +
      "            chunk = await self._reader.read(4096)\n" +
      "            buffer.extend(chunk)\n" +
      "            for raw in split_fix_messages(buffer):\n" +
      "                msg = parse_fix(raw)\n" +
      "                if msg.msg_type == MsgType.EXECUTION_REPORT:\n" +
      "                    self._pending.pop(msg.cl_ord_id, None)\n" +
      "                await self._dispatch(msg)",

    "    async def send_order(self, order: NewOrderSingle) -> ExecutionReport:\n" +
      "        fut: asyncio.Future = asyncio.get_running_loop().create_future()\n" +
      "        self._pending[order.cl_ord_id] = fut\n" +
      "        await self._send(encode_new_order(order, next(self._seq_num)))\n" +
      "        return await asyncio.wait_for(fut, timeout=2.5)",

    "class TickStore:\n" +
      "    \"\"\"Append-only columnar buffer for raw exchange ticks, flushed to parquet.\"\"\"\n" +
      "\n" +
      "    def __init__(self, symbols: Sequence[str], flush_every: int = 50_000) -> None:\n" +
      "        self._buffers: Dict[str, List[Tick]] = {s: [] for s in symbols}\n" +
      "        self._flush_every = flush_every\n" +
      "        self._schema = pa.schema([(\"ts\", pa.int64()), (\"bid\", pa.float64()), (\"ask\", pa.float64()), (\"size\", pa.float64())])",

    "    def ingest(self, symbol: str, raw: bytes) -> None:\n" +
      "        tick = Tick.from_json(orjson.loads(raw))\n" +
      "        buf = self._buffers[symbol]\n" +
      "        buf.append(tick)\n" +
      "        if len(buf) >= self._flush_every:\n" +
      "            self._flush(symbol, buf)\n" +
      "            buf.clear()",

    "    def _flush(self, symbol: str, buf: List[Tick]) -> None:\n" +
      "        table = pa.Table.from_pylist([t.as_dict() for t in buf], schema=self._schema)\n" +
      "        path = self._partition_path(symbol, buf[0].ts)\n" +
      "        pq.write_table(table, path, compression=\"zstd\", use_dictionary=True)\n" +
      "        self._notify_subscribers(symbol, path)",

    "class MarketDataGateway:\n" +
      "    \"\"\"Multiplexes several exchange websocket feeds into one tick queue.\"\"\"\n" +
      "\n" +
      "    def __init__(self, venues: Sequence[VenueConfig], queue: asyncio.Queue) -> None:\n" +
      "        self._venues = venues\n" +
      "        self._queue = queue\n" +
      "        self._sockets: Dict[str, websockets.WebSocketClientProtocol] = {}\n" +
      "        self._sequence: Dict[str, int] = defaultdict(int)",

    "    async def run(self) -> None:\n" +
      "        async with asyncio.TaskGroup() as tg:\n" +
      "            for venue in self._venues:\n" +
      "                tg.create_task(self._subscribe(venue))",

    "    async def _subscribe(self, venue: VenueConfig) -> None:\n" +
      "        async for ws in websockets.connect(venue.ws_url, ping_interval=15, max_queue=1024):\n" +
      "            try:\n" +
      "                self._sockets[venue.name] = ws\n" +
      "                await ws.send(orjson.dumps({\"op\": \"subscribe\", \"channels\": venue.channels}))\n" +
      "                async for raw in ws:\n" +
      "                    await self._on_message(venue, raw)\n" +
      "            except websockets.ConnectionClosed:\n" +
      "                logger.warning(\"venue %s disconnected, resubscribing\", venue.name)\n" +
      "                continue",

    "    async def _on_message(self, venue: VenueConfig, raw: bytes) -> None:\n" +
      "        msg = orjson.loads(raw)\n" +
      "        seq = msg.get(\"seq\", 0)\n" +
      "        if seq and seq <= self._sequence[venue.name]:\n" +
      "            return\n" +
      "        self._sequence[venue.name] = seq\n" +
      "        tick = Tick.from_venue_payload(venue.name, msg)\n" +
      "        await self._queue.put(tick)",

    "class RiskEngine:\n" +
      "    \"\"\"Pre-trade and post-trade limit checks, independent of any one strategy.\"\"\"\n" +
      "\n" +
      "    def __init__(self, limits: RiskLimits, book_keeper: PositionBook) -> None:\n" +
      "        self._limits = limits\n" +
      "        self._book = book_keeper\n" +
      "        self._breaches: List[LimitBreach] = []\n" +
      "        self._kill_switch = threading.Event()",

    "    def pre_trade_check(self, order: NewOrderSingle) -> None:\n" +
      "        if self._kill_switch.is_set():\n" +
      "            raise TradingHalted(\"kill switch engaged\")\n" +
      "        projected = self._book.projected_exposure(order)\n" +
      "        if projected.gross_notional > self._limits.max_gross_notional:\n" +
      "            self._breaches.append(LimitBreach(\"gross_notional\", projected.gross_notional))\n" +
      "            raise RiskLimitExceeded(order, self._limits.max_gross_notional)\n" +
      "        if projected.symbol_delta(order.symbol) > self._limits.max_symbol_delta:\n" +
      "            raise RiskLimitExceeded(order, self._limits.max_symbol_delta)",

    "    @staticmethod\n" +
      "    @nb.njit(cache=True)\n" +
      "    def _var_parametric(weights: np.ndarray, cov: np.ndarray, confidence: float) -> float:\n" +
      "        portfolio_var = weights @ cov @ weights.T\n" +
      "        z = _inv_norm_cdf(confidence)\n" +
      "        return z * np.sqrt(portfolio_var)",

    "    def trip_kill_switch(self, reason: str) -> None:\n" +
      "        self._kill_switch.set()\n" +
      "        logger.critical(\"kill switch tripped: %s\", reason)\n" +
      "        metrics.counter(\"risk.kill_switch\").inc(labels={\"reason\": reason})",

    "class PositionBook:\n" +
      "    \"\"\"Reconciles internal fills against exchange-reported positions.\"\"\"\n" +
      "\n" +
      "    def __init__(self, session_factory: Callable[[], AsyncSession]) -> None:\n" +
      "        self._session_factory = session_factory\n" +
      "        self._cache: Dict[str, Position] = {}\n" +
      "        self._dirty: Set[str] = set()",

    "    async def reconcile(self, exchange: ExchangeClient) -> ReconciliationReport:\n" +
      "        remote = {p.symbol: p for p in await exchange.positions()}\n" +
      "        drifts = [\n" +
      "            PositionDrift(symbol, self._cache.get(symbol, Position.empty(symbol)), remote_pos)\n" +
      "            for symbol, remote_pos in remote.items()\n" +
      "            if not self._cache.get(symbol, Position.empty(symbol)).matches(remote_pos)\n" +
      "        ]\n" +
      "        if drifts:\n" +
      "            await self._persist_drifts(drifts)\n" +
      "        return ReconciliationReport(drifts=drifts, checked_at=datetime.utcnow())",

    "    async def _persist_drifts(self, drifts: List[PositionDrift]) -> None:\n" +
      "        async with self._session_factory() as session, session.begin():\n" +
      "            session.add_all(PositionDriftRow.from_domain(d) for d in drifts)\n" +
      "            await session.execute(\n" +
      "                update(PositionRow).where(PositionRow.symbol.in_([d.symbol for d in drifts]))\n" +
      "            )",

    "class VolatilityForecaster(nn.Module):\n" +
      "    \"\"\"Small GRU over realized-vol features, used only to seed gamma/kappa.\"\"\"\n" +
      "\n" +
      "    def __init__(self, input_dim: int = 6, hidden_dim: int = 32) -> None:\n" +
      "        super().__init__()\n" +
      "        self.gru = nn.GRU(input_dim, hidden_dim, batch_first=True)\n" +
      "        self.head = nn.Sequential(nn.Linear(hidden_dim, 16), nn.ReLU(), nn.Linear(16, 1), nn.Softplus())",

    "    def forward(self, x: torch.Tensor) -> torch.Tensor:\n" +
      "        out, _ = self.gru(x)\n" +
      "        return self.head(out[:, -1, :]).squeeze(-1)",

    "    @torch.no_grad()\n" +
      "    def predict_sigma(self, features: np.ndarray) -> float:\n" +
      "        self.eval()\n" +
      "        tensor = torch.from_numpy(features).float().unsqueeze(0)\n" +
      "        return float(self(tensor).item())",

    "def train_forecaster(model: VolatilityForecaster, loader: DataLoader, epochs: int = 20) -> TrainingHistory:\n" +
      "    optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4, weight_decay=1e-5)\n" +
      "    scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=epochs)\n" +
      "    history = TrainingHistory()\n" +
      "    for epoch in range(epochs):\n" +
      "        epoch_loss = 0.0\n" +
      "        for features, target in loader:\n" +
      "            optimizer.zero_grad(set_to_none=True)\n" +
      "            loss = F.smooth_l1_loss(model(features), target)\n" +
      "            loss.backward()\n" +
      "            torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)\n" +
      "            optimizer.step()\n" +
      "            epoch_loss += loss.item()\n" +
      "        scheduler.step()\n" +
      "        history.record(epoch, epoch_loss / len(loader))\n" +
      "    return history",

    "class Backtester:\n" +
      "    \"\"\"Replays TickStore parquet partitions through a strategy, no live I/O.\"\"\"\n" +
      "\n" +
      "    def __init__(self, strategy_cls: Type[AvellanedaStoikovMarketMaker], fee_bps: float = 0.75) -> None:\n" +
      "        self._strategy_cls = strategy_cls\n" +
      "        self._fee_bps = fee_bps\n" +
      "        self._fills: List[SimulatedFill] = []",

    "    def run(self, partitions: Iterable[Path], **strategy_kwargs: Any) -> BacktestResult:\n" +
      "        model = self._strategy_cls(**strategy_kwargs)\n" +
      "        equity_curve = []\n" +
      "        for partition in partitions:\n" +
      "            frame = pd.read_parquet(partition, columns=[\"ts\", \"bid\", \"ask\", \"size\"])\n" +
      "            equity_curve.extend(self._replay(model, frame))\n" +
      "        return BacktestResult(equity_curve=np.array(equity_curve), fills=self._fills, sharpe=self._sharpe(equity_curve))",

    "    @staticmethod\n" +
      "    def _sharpe(equity_curve: Sequence[float], periods_per_year: int = 252 * 6.5 * 3600) -> float:\n" +
      "        rets = np.diff(equity_curve)\n" +
      "        if rets.std() == 0:\n" +
      "            return 0.0\n" +
      "        return float(np.mean(rets) / np.std(rets) * np.sqrt(periods_per_year))",

    "class CircuitBreaker:\n" +
      "    \"\"\"Trips after N consecutive exchange errors, half-opens after a cooldown.\"\"\"\n" +
      "\n" +
      "    def __init__(self, threshold: int = 5, cooldown: timedelta = timedelta(seconds=30)) -> None:\n" +
      "        self._threshold = threshold\n" +
      "        self._cooldown = cooldown\n" +
      "        self._failures = 0\n" +
      "        self._state: Literal[\"closed\", \"open\", \"half_open\"] = \"closed\"\n" +
      "        self._opened_at: Optional[datetime] = None",

    "    def __call__(self, fn: Callable[..., Awaitable[T]]) -> Callable[..., Awaitable[T]]:\n" +
      "        @functools.wraps(fn)\n" +
      "        async def wrapper(*args: Any, **kwargs: Any) -> T:\n" +
      "            if self._state == \"open\":\n" +
      "                if datetime.utcnow() - self._opened_at < self._cooldown:\n" +
      "                    raise CircuitOpenError()\n" +
      "                self._state = \"half_open\"\n" +
      "            try:\n" +
      "                result = await fn(*args, **kwargs)\n" +
      "            except ExchangeError:\n" +
      "                self._record_failure()\n" +
      "                raise\n" +
      "            else:\n" +
      "                self._state = \"closed\"\n" +
      "                self._failures = 0\n" +
      "                return result\n" +
      "        return wrapper",

    "class RateLimiter:\n" +
      "    \"\"\"Token bucket shared across all order-entry coroutines for one venue.\"\"\"\n" +
      "\n" +
      "    def __init__(self, rate: float, burst: int) -> None:\n" +
      "        self._rate = rate\n" +
      "        self._tokens = float(burst)\n" +
      "        self._burst = burst\n" +
      "        self._updated = time.monotonic()\n" +
      "        self._cond = asyncio.Condition()",

    "    async def acquire(self) -> None:\n" +
      "        async with self._cond:\n" +
      "            while True:\n" +
      "                now = time.monotonic()\n" +
      "                elapsed = now - self._updated\n" +
      "                self._tokens = min(self._burst, self._tokens + elapsed * self._rate)\n" +
      "                self._updated = now\n" +
      "                if self._tokens >= 1.0:\n" +
      "                    self._tokens -= 1.0\n" +
      "                    return\n" +
      "                await asyncio.sleep((1.0 - self._tokens) / self._rate)",

    "class MetricsRegistry:\n" +
      "    \"\"\"Thin wrapper over a Prometheus push-gateway client for strategy telemetry.\"\"\"\n" +
      "\n" +
      "    def __init__(self, namespace: str = \"marketmaker\") -> None:\n" +
      "        self._namespace = namespace\n" +
      "        self.quote_latency = Histogram(f\"{namespace}_quote_latency_seconds\", \"quote() wall time\", buckets=(0.0001, 0.0005, 0.001, 0.005, 0.01))\n" +
      "        self.inventory_gauge = Gauge(f\"{namespace}_inventory\", \"current signed inventory\", labelnames=(\"symbol\",))\n" +
      "        self.fill_counter = Counter(f\"{namespace}_fills_total\", \"fills processed\", labelnames=(\"symbol\", \"side\"))",

    "    @contextmanager\n" +
      "    def time_quote(self):\n" +
      "        start = time.perf_counter()\n" +
      "        try:\n" +
      "            yield\n" +
      "        finally:\n" +
      "            self.quote_latency.observe(time.perf_counter() - start)",

    "@dataclass(frozen=True, slots=True)\n" +
      "class RuntimeConfig:\n" +
      "    venues: Tuple[VenueConfig, ...]\n" +
      "    risk_limits: RiskLimits\n" +
      "    db_dsn: str\n" +
      "    redis_url: str\n" +
      "    log_level: str = \"INFO\"\n" +
      "\n" +
      "    @classmethod\n" +
      "    def from_env(cls, path: Path = Path(\".env\")) -> \"RuntimeConfig\":\n" +
      "        raw = dotenv_values(path) | os.environ\n" +
      "        return cls(\n" +
      "            venues=tuple(VenueConfig.parse(v) for v in raw[\"VENUES\"].split(\",\")),\n" +
      "            risk_limits=RiskLimits.from_json(raw[\"RISK_LIMITS_JSON\"]),\n" +
      "            db_dsn=raw[\"DATABASE_URL\"],\n" +
      "            redis_url=raw[\"REDIS_URL\"],\n" +
      "        )",

    "async def publish_book_snapshots(redis: Redis, book: PositionBook, interval: float = 1.0) -> None:\n" +
      "    async with redis.pipeline(transaction=False) as pipe:\n" +
      "        while True:\n" +
      "            snapshot = book.snapshot()\n" +
      "            pipe.set(f\"book:{snapshot.symbol}\", orjson.dumps(snapshot.as_dict()), ex=5)\n" +
      "            pipe.publish(\"book_updates\", snapshot.symbol)\n" +
      "            await pipe.execute()\n" +
      "            await asyncio.sleep(interval)",

    "async def main() -> None:\n" +
      "    config = RuntimeConfig.from_env()\n" +
      "    logging.config.dictConfig(build_logging_config(config.log_level))\n" +
      "    engine = create_async_engine(config.db_dsn, pool_size=10, pool_pre_ping=True)\n" +
      "    redis = Redis.from_url(config.redis_url, decode_responses=False)\n" +
      "\n" +
      "    tick_queue: asyncio.Queue[Tick] = asyncio.Queue(maxsize=10_000)\n" +
      "    gateway = MarketDataGateway(config.venues, tick_queue)\n" +
      "    book = PositionBook(async_sessionmaker(engine))\n" +
      "    risk = RiskEngine(config.risk_limits, book)\n" +
      "    model = AvellanedaStoikovMarketMaker(max_inventory=config.risk_limits.max_symbol_delta)\n" +
      "    engine_ = QuoteEngine(model, ExchangeClient(config.venues[0]), quote_size=1.0)\n" +
      "\n" +
      "    async with asyncio.TaskGroup() as tg:\n" +
      "        tg.create_task(gateway.run())\n" +
      "        tg.create_task(engine_.stream_quotes(_dequeue(tick_queue)))\n" +
      "        tg.create_task(engine_.watch_fills())\n" +
      "        tg.create_task(publish_book_snapshots(redis, book))\n" +
      "        tg.create_task(_periodic_reconcile(book, risk))\n" +
      "\n" +
      "\n" +
      "if __name__ == \"__main__\":\n" +
      "    asyncio.run(main())"
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
    // Indent the code so it clears the left-aligned hero copy and its dark
    // scrim, but never eats so much width the code itself has no room.
    PAD_X = Math.min(PAD_X_INDENT, Math.max(PAD_X_MIN, W - 260));
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
      }, 2200);
      return;
    }
    // Whole chunks (a method at a time) are burst-typed in one pass; the
    // real pause is the beat held once a chunk completes, so it reads like
    // blocks of code landing rather than a sentence being spoken.
    var nextChar = fullText[charCount];
    var delay = 9 + Math.random() * 10;
    if (nextChar === "\n") delay = 60;
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
