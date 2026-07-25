---
layout: default
title: Tardis.dev Data Fetcher
permalink: /projects/tardis-dev-data-fetcher/
---

<section class="hero">
  <canvas id="market-widget-canvas" class="hero-canvas" aria-label="Live BTC/USDT and ETH/USDT options chain" aria-hidden="true"></canvas>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Project &middot; 2024</div>
    <h1 class="hero-name">Tardis.dev Data Fetcher</h1>
    <p class="hero-lede">A focused client for downloading historical cryptocurrency market data.</p>
  </div>
</section>

<p class="tagline"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/TardisDevParser" target="_blank" rel="noopener noreferrer">TardisDevParser on GitHub</a></p>

<h2 id="overview">Overview</h2>
<p>
  Backtests and research on historical crypto market data all start the same way: pulling raw tick data
  from Tardis.dev. This client is deliberately scoped to just that one job &mdash; fetching &mdash; and stays out of
  parsing, cleaning, storage, or visualization, which live as separate stages further down the pipeline.
  Keeping it narrow means the fetch logic (auth, retries, resuming) doesn't get tangled up with how the data
  ends up being used.
</p>

<h2 id="configuration">Configuration</h2>
<p>
  <code>FetchOptions</code> describes one download job (exchange, data types, symbols, date range, output
  directory, format, API key, overwrite flag) and is assembled from three sources with a clear precedence:
  CLI flags, then a YAML or JSON config file, then the <code>TARDIS_API_KEY</code> environment variable.
  The config file is loaded first; CLI overrides are then merged in, but only for flags a user actually
  passed (unset argparse flags are filtered out rather than clobbering the config file's values with
  <code>None</code>). The environment variable is checked last and only fills in the API key if it's still
  missing after both of the above. Validation happens immediately on construction &mdash; required fields,
  <code>from_date &le; to_date</code>, and API key presence are all checked in one place, so an invalid job
  configuration can't be built at all.
</p>

<h2 id="client">The Client</h2>
<p>
  <code>TardisClient</code> wraps the Tardis.dev Datasets API over a <code>requests.Session</code>, with the
  bearer token set once on the session's headers. Retries are handled entirely at the transport layer: an
  <code>HTTPAdapter</code> is mounted with <code>urllib3</code>'s own retry policy (5 attempts, exponential
  backoff, retrying on 429 and 5xx responses), rather than a hand-rolled retry loop. Downloads stream to
  disk in 256KB chunks, written to a temporary <code>.part</code> file first and atomically renamed into
  place once complete, so a crash mid-download can never leave a corrupted file at the destination path.
  Already-downloaded files are skipped by checking whether the destination exists before making any network
  call at all, which is cheap but not checksum-verified, so a partially wrong file that happens to exist
  under the right name would be trusted as-is.
</p>
<p>
  Errors are split by what they mean: 401/403 raise an auth error, 404 raises an API error but is treated as
  a normal case (a symbol or date range that simply has no data), and everything else raises a generic API
  error carrying the status code and URL. A companion read-only <code>TardisInspector</code> checks API key
  validity with a cheap HEAD request and queries Tardis's public metadata API for exchange, symbol, and
  date-range info, without spending fetch quota.
</p>

<h2 id="setup">Setup &amp; Usage</h2>
<pre class="code-block" data-lang="bash"><code>python3 -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env   # then edit .env with your real key
</code></pre>
<p>Two console scripts are exposed: <code>tardis-fetch</code> for downloads, and <code>tardis-inspect</code> for checking credentials and browsing available exchanges/symbols before spending a fetch on them.</p>
<pre class="code-block" data-lang="bash"><code>tardis-inspect check-key
tardis-inspect exchanges
tardis-fetch --config config/example.yaml
</code></pre>
<p class="form-hint">Config files are YAML or JSON, dispatched by file extension. <code>tardis-inspect</code> also supports a <code>--json</code> flag on each subcommand for scripting against raw output.</p>

<p><a href="{{ '/projects/' | relative_url }}">&larr; Back to Projects</a></p>
