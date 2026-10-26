---
layout: default
title: Tardis.dev Data Fetcher
permalink: /nl/projects/tardis-dev-fetcher/
---

<section class="hero">
  <img class="hero-img" src="{{ '/images/volatility/quant_finance.jpg' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Tool &middot; 2024</div>
    <h1 class="hero-name">Tardis.dev Data Fetcher</h1>
    <p class="hero-lede">Een kleine command-line client voor het downloaden van historische crypto marktdata van Tardis.dev.</p>
  </div>
</section>

<div class="article-body">

<p class="tagline"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/TardisDevParser" target="_blank" rel="noopener noreferrer">TardisDevParser op GitHub</a></p>

<h2 id="what-it-does">Wat het doet</h2>
<p>
  Tardis.dev verkoopt historische marktdata voor crypto exchanges: trades, orderbook snapshots, en meer.
  Deze tool downloadt die data en slaat hem op schijf op. Verder niets. Hij parseert de data niet, maakt
  ze niet schoon, en zet ze niet in een database. Het is de eerste stap in een grotere pipeline, en hij
  doet ook alleen die eerste stap.
</p>
<p>
  De tool heeft twee commando's. <code>tardis-fetch</code> downloadt data. <code>tardis-inspect</code>
  checkt je API key en laat zien welke data beschikbaar is, zonder iets te downloaden.
</p>

<h2 id="install">Installatie</h2>
<pre class="code-block" data-lang="bash"><code>python3 -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"</code></pre>
<p>
  Je hebt een Tardis.dev API key nodig. Zet die eenmalig als environment variable.
</p>
<pre class="code-block" data-lang="bash"><code>cp .env.example .env   # edit .env with your real key
export TARDIS_API_KEY=your-tardis-dev-api-key-here</code></pre>

<h2 id="checking-data">Key checken en data verkennen</h2>
<p>
  Gebruik <code>tardis-inspect</code> voordat je iets downloadt, om te bevestigen dat je key werkt en om
  te zien wat er beschikbaar is. Het stuurt kleine, read-only requests, dus er wordt niets gedownload.
</p>
<pre class="code-block" data-lang="bash"><code># Confirm the API key works
tardis-inspect check-key

# List every exchange Tardis.dev has data for
tardis-inspect exchanges

# See data types, symbols, and date ranges for one exchange
tardis-inspect describe binance</code></pre>

<h2 id="fetching-data">Data ophalen</h2>
<p>
  Een fetch-job heeft vijf dingen nodig: een exchange, één of meer data types, één of meer symbols, een
  startdatum en een einddatum. Je kunt die zetten met command-line flags, of in een YAML-configbestand.
</p>
<pre class="code-block" data-lang="bash"><code>tardis-fetch \
  --exchange binance \
  --data-types trades,book_snapshot_25 \
  --symbols BTCUSDT,ETHUSDT \
  --from-date 2024-01-01 \
  --to-date 2024-01-07 \
  --output-dir ./data</code></pre>
<p>
  Of met een configbestand, wat makkelijker is om tussen runs te hergebruiken:
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
  Gebruik je beide, dan wint de command-line flag. Een flag overschrijft het configbestand, en het
  configbestand overschrijft de <code>TARDIS_API_KEY</code> environment variable. Zo kun je één
  herbruikbaar configbestand bijhouden en per run maar één of twee waardes aanpassen.
</p>
<p>
  Gedownloade bestanden komen terecht op
  <code>&lt;output_dir&gt;/&lt;exchange&gt;/&lt;data_type&gt;/&lt;symbol&gt;/&lt;date&gt;.csv.gz</code>.
  Bestaat een bestand al, dan slaat de fetch het over. Geef <code>--overwrite</code> mee om het toch
  opnieuw te downloaden.
</p>

<h2 id="how-it-works">Hoe het werkt</h2>
<p>
  <code>FetchOptions</code>, in <code>config.py</code>, bevat de instellingen voor één fetch-job. Het
  valideert ze: er moet een exchange gezet zijn, minstens één data type en één symbol moeten gegeven
  zijn, de startdatum mag niet na de einddatum liggen, en er moet een API key zijn uit één van de drie
  bronnen. Klopt dat niet, dan gooit het <code>TardisConfigError</code> met een boodschap over wat
  ontbreekt.
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
  <code>TardisClient</code>, in <code>client.py</code>, doet het eigenlijke downloaden. Voor elke
  combinatie van data type, symbol en dag in de datumrange bouwt het een URL, stuurt een GET-request met
  de API key als bearer token, en streamt de response naar een tijdelijk bestand. Zodra de download klaar
  is, hernoemt het het tijdelijke bestand naar zijn definitieve naam. Zo laat een mislukte of onderbroken
  download nooit een half bestand achter op het pad dat een latere run als "al gedownload" zou
  beschouwen.
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
  De client probeert mislukte requests ook opnieuw. Antwoordt Tardis.dev met een 429 (rate limit) of een
  5xx (server error), dan wacht hij even en probeert het opnieuw, tot vijf keer, met een groeiende
  wachttijd tussen de pogingen. Een 401 of 403 betekent dat de API key is afgewezen, en gooit meteen
  <code>TardisAuthError</code> in plaats van opnieuw te proberen, want een foute key gaat bij een retry
  ook niet werken.
</p>
<p>
  <code>TardisInspector</code>, in <code>inspector.py</code>, is de read-only begeleider die
  <code>tardis-inspect</code> gebruikt. <code>check_credentials()</code> bevestigt dat een API key werkt
  door een HEAD-request te sturen voor een symbol en datum die gegarandeerd beschikbaar zijn, zodat de key
  gecheckt kan worden zonder echte data te downloaden. <code>list_exchanges()</code> en
  <code>describe_exchange()</code> roepen de publieke metadata-API van Tardis.dev aan om exchanges te
  tonen en te laten zien welke data types, symbols en datumranges elke exchange heeft.
</p>

<h2 id="errors">Errors</h2>
<p>
  Drie exception types vangen de manieren waarop een fetch kan mislukken, zodat een caller ze uit elkaar
  kan houden.
</p>
<ul>
  <li><code>TardisConfigError</code> &mdash; de fetch options zijn ongeldig, bijvoorbeeld een
  ontbrekende API key of een einddatum voor de startdatum.</li>
  <li><code>TardisAuthError</code> &mdash; de API key is afgewezen door Tardis.dev.</li>
  <li><code>TardisAPIError</code> &mdash; een andere request mislukte, bijvoorbeeld geen data op de
  opgevraagde URL, of een onverwachte serverrespons.</li>
</ul>
<p>
  <code>tardis-fetch</code> vangt alle drie op het hoogste niveau op en sluit af met een andere statuscode
  per type, zodat het foutype ook in de shell zichtbaar is, naast de boodschap zelf.
</p>

<h2 id="structure">Projectstructuur</h2>
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
<p class="form-hint">De tests dekken het parsen en valideren van options, de download/skip/retry/error-paden in de client, en de credential check en metadata lookups in de inspector. Draai ze met <code>pytest</code>.</p>

</div>

<p><a href="{{ '/nl/projects/' | relative_url }}">&larr; Terug naar Projecten</a></p>
