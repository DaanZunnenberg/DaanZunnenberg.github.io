---
layout: default
title: Tardis.dev Data Fetcher
permalink: /projects/tardis-dev-fetcher/
---

<section class="hero">
  <img class="hero-img" src="{{ '/images/terminal.jpg' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Tool &middot; 2024</div>
    <h1 class="hero-name">Tardis.dev Data Fetcher</h1>
    <p class="hero-lede">A small command-line client for downloading historical crypto market data from Tardis.dev.</p>
  </div>
</section>

<div class="article-body">

<p class="tagline"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/TardisDevParser" target="_blank" rel="noopener noreferrer">TardisDevParser on GitHub</a></p>

<h2 id="what-it-does">What it does</h2>
<p>
  Tardis.dev sells historical market data for crypto exchanges: trades, order book snapshots, and more.
  This tool downloads that data and saves it to disk. Nothing else. It does not parse the data, clean it,
  or store it in a database. It is the first step in a larger pipeline, and it only does that first step.
</p>
<p>
  The tool has two commands. <code>tardis-fetch</code> downloads data. <code>tardis-inspect</code> checks
  your API key and shows what data is available, without downloading anything.
</p>

<h2 id="install">Installation</h2>
<pre class="code-block" data-lang="bash"><code>python3 -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"</code></pre>
<p>
  You need a Tardis.dev API key. Set it once as an environment variable.
</p>
<pre class="code-block" data-lang="bash"><code>cp .env.example .env   # edit .env with your real key
export TARDIS_API_KEY=your-tardis-dev-api-key-here</code></pre>

<h2 id="checking-data">Checking your key and browsing data</h2>
<p>
  Before downloading anything, use <code>tardis-inspect</code> to confirm your key works and to see what
  is available. It makes small, read-only requests, so nothing is downloaded.
</p>
<pre class="code-block" data-lang="bash"><code># Confirm the API key works
tardis-inspect check-key

# List every exchange Tardis.dev has data for
tardis-inspect exchanges

# See data types, symbols, and date ranges for one exchange
tardis-inspect describe binance</code></pre>

<h2 id="fetching-data">Fetching data</h2>
<p>
  A fetch job needs five things: an exchange, one or more data types, one or more symbols, a start date,
  and an end date. You can set these with command-line flags, or put them in a YAML config file.
</p>
<pre class="code-block" data-lang="bash"><code>tardis-fetch \
  --exchange binance \
  --data-types trades,book_snapshot_25 \
  --symbols BTCUSDT,ETHUSDT \
  --from-date 2024-01-01 \
  --to-date 2024-01-07 \
  --output-dir ./data</code></pre>
<p>
  Or with a config file, which is easier to reuse across runs:
</p>
<pre class="code-block" data-lang="yaml"><code>exchange: binance
data_types:
  - trades
  - book_snapshot_25
symbols:
  - BTCUSDT
  - ETHUSDT
from_date: "2024-01-01"
to_date: "2024-01-07"
output_dir: ./data
format: csv
overwrite: false</code></pre>
<pre class="code-block" data-lang="bash"><code>tardis-fetch --config config/example.yaml</code></pre>
<p>
  If you use both, command-line flags win. A flag overrides the config file, and the config file overrides
  the <code>TARDIS_API_KEY</code> environment variable. This lets you keep one reusable config file and
  change just one or two values per run.
</p>
<p>
  Downloaded files are written to
  <code>&lt;output_dir&gt;/&lt;exchange&gt;/&lt;data_type&gt;/&lt;symbol&gt;/&lt;date&gt;.csv.gz</code>.
  If a file already exists, the fetch skips it. Pass <code>--overwrite</code> to re-download it anyway.
</p>

<h2 id="how-it-works">How it works</h2>
<p>
  <code>FetchOptions</code>, in <code>config.py</code>, holds the settings for one fetch job. It validates
  them: an exchange must be set, at least one data type and one symbol must be given, the start date can't
  be after the end date, and an API key must be present from one of the three sources. If any of that is
  wrong, it raises <code>TardisConfigError</code> with a message saying what is missing.
</p>
<pre class="code-block" data-lang="python"><code>@dataclass
class FetchOptions:
    exchange: str
    data_types: list[str]
    symbols: list[str]
    from_date: date
    to_date: date
    output_dir: Path = Path("./data")
    api_key: str = ""
    format: str = "csv"
    overwrite: bool = False

    def __post_init__(self) -> None:
        if not self.exchange:
            raise TardisConfigError("exchange is required")
        if not self.data_types:
            raise TardisConfigError("at least one data_type is required")
        # ... symbols, dates, and api_key are checked the same way</code></pre>
<p>
  <code>TardisClient</code>, in <code>client.py</code>, does the actual downloading. For each combination
  of data type, symbol, and day in the date range, it builds a URL, sends a GET request with the API key
  as a bearer token, and streams the response to a temporary file. Once the download finishes, it renames
  the temporary file to its final name. This way a failed or interrupted download never leaves a partial
  file at the path a later run would treat as "already downloaded".
</p>
<pre class="code-block" data-lang="python"><code>def fetch_one(self, data_type: str, symbol: str, day: date) -> Path:
    dest = self.local_path(data_type, symbol, day)
    if dest.exists() and not self.options.overwrite:
        return dest

    url = self.build_url(data_type, symbol, day)
    response = self.session.get(url, stream=True, timeout=60)
    self._raise_for_status(response, url)

    dest.parent.mkdir(parents=True, exist_ok=True)
    tmp_path = dest.with_suffix(dest.suffix + ".part")
    with open(tmp_path, "wb") as f:
        for chunk in response.iter_content(chunk_size=1024 * 256):
            if chunk:
                f.write(chunk)
    tmp_path.replace(dest)
    return dest</code></pre>
<p>
  The client also retries failed requests. If Tardis.dev responds with a 429 (rate limit) or a 5xx
  (server error), it waits and tries again, up to five times, with a growing delay between attempts. A
  401 or 403 response means the API key was rejected, and raises <code>TardisAuthError</code> right away
  instead of retrying, since retrying a bad key will never succeed.
</p>
<p>
  <code>TardisInspector</code>, in <code>inspector.py</code>, is the read-only companion used by
  <code>tardis-inspect</code>. <code>check_credentials()</code> confirms an API key works by sending a
  HEAD request for a symbol and date that is known to be available, so it can check the key without
  downloading real data. <code>list_exchanges()</code> and <code>describe_exchange()</code> call
  Tardis.dev's public metadata API to list exchanges and show what data types, symbols, and date ranges
  each exchange has.
</p>

<h2 id="errors">Errors</h2>
<p>
  Three exception types cover the ways a fetch can fail, so a caller can tell them apart.
</p>
<ul>
  <li><code>TardisConfigError</code> &mdash; the fetch options are invalid, for example a missing API key
  or an end date before the start date.</li>
  <li><code>TardisAuthError</code> &mdash; the API key was rejected by Tardis.dev.</li>
  <li><code>TardisAPIError</code> &mdash; some other request failed, for example no data at the requested
  URL, or an unexpected server response.</li>
</ul>
<p>
  <code>tardis-fetch</code> catches all three at the top level and exits with a different status code for
  each, so the error type is visible from the shell as well as the message.
</p>

<h2 id="structure">Project structure</h2>
<pre class="code-block" data-lang="txt"><code>src/tardis_reader/
    config.py          # FetchOptions: loads, merges, and validates fetch settings
    client.py          # TardisClient: downloads data from the Datasets API
    inspector.py        # TardisInspector: checks the API key, lists available data
    exceptions.py        # TardisConfigError / TardisAuthError / TardisAPIError
    cli.py              # tardis-fetch entrypoint
    inspect_cli.py       # tardis-inspect entrypoint

config/
    example.yaml        # Sample fetch config

tests/
    test_config.py
    test_client.py
    test_inspector.py</code></pre>
<p class="form-hint">Tests cover option parsing and validation, the download/skip/retry/error paths in the client, and the credential check and metadata lookups in the inspector. Run them with <code>pytest</code>.</p>

</div>

<p><a href="{{ '/projects/' | relative_url }}">&larr; Back to Projects</a></p>
