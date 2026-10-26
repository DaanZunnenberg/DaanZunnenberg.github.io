---
layout: default
title: CV
permalink: /nl/resume/
body_class: resume-index
---

<section class="hero hero-lg hero-scroll">
  <img class="hero-img" src="{{ '/images/Rotterdam.avif' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <!-- Animated scrolling time-and-sales background, kept for later use: uncomment to restore it in place of the static image above.
  <canvas id="trade-process-canvas" class="hero-canvas" aria-label="Live scrolling time-and-sales tables side by side, for Binance ETH/USDT, SOL/USDT, and BTC/USDT spot trades (scroll horizontally on narrow screens to see all three), each row showing price, trade amount in the coin's own units, trade amount in USD, and trade time" aria-hidden="true"></canvas>
  -->
  <div class="hero-fade hero-fade-long" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Werkervaring<span class="hero-eyebrow-extra"> &middot; Opleiding &middot; Vaardigheden</span></div>
    <h1 class="hero-name">CV</h1>
    <p class="hero-lede">De korte versie: functies, opleiding en vaardigheden, met de impact voorop.</p>
  </div>
</section>

<p class="tagline">Voor de theorie en code achter dit werk, zie <a href="{{ '/nl/projects/' | relative_url }}">Projecten</a>.</p>

<div class="resume-main">

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;01</span>
  <h2 id="work-experience">Werkervaring</h2>
  <p>Functies in algorithmic market-making, execution en quantitative research.</p>
</div>

<div class="entry" id="experience-quantfi-quantitative-developer">
  <div class="entry-head">
    <h3>QuantFi &middot; Quantitative Developer</h3>
    <span class="entry-date">maart 2023 &ndash; augustus 2024</span>
  </div>
  <div class="entry-org">Schiphol-Rijk, Nederland</div>
  <ul>
    <li>Bouwde en zette algorithmic market-making strategieën live, met volatility- en skew-schatting, order flow modelling, queue-aware execution, market impact en reference price dynamics.</li>
    <li>Bouwde een dynamisch liquidity allocation model voor smart order routing, waarmee slippage en transactiekosten gemiddeld met 5,8% daalden door real-time optimalisatie over samengevoegde, gefragmenteerde order books.</li>
    <li>Ontwikkelde quantitative portfolio rebalancing methoden tussen exchanges, die de timing en uitvoering van inventory transfers optimaliseerden onder latency-beperkingen, transactiekosten en marktliquiditeit.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <code>asyncio</code> &middot; <code>numba</code> &middot; <code>ccxt</code></div>
</div>

<div class="entry" id="experience-quantfi-operational-trader">
  <div class="entry-head">
    <h3>QuantFi &middot; Operational Trader</h3>
    <span class="entry-date">oktober 2022 &ndash; maart 2023</span>
  </div>
  <div class="entry-org">Schiphol-Rijk, Nederland</div>
  <ul>
    <li>Monitorde market-making algoritmes in productie, en beheerde real-time risicoparameters en systeemgezondheid om inventory exposure te beperken tijdens periodes van hoge volatiliteit.</li>
    <li>Ontwierp en bouwde een live trading terminal met <code>ccxt</code> en native exchange API's voor real-time positie- en order-tracking, met <code>Tardis.dev</code> geïntegreerd voor het reconstrueren van historische posities.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <code>ccxt</code> &middot; <code>Tardis.dev</code></div>
</div>

<div class="entry" id="experience-luc-lecturer">
  <div class="entry-head">
    <h3>Leiden University College &middot; Docent</h3>
    <span class="entry-date">september 2025 &ndash; november 2026</span>
  </div>
  <div class="entry-org">Den Haag, Nederland</div>
  <ul>
    <li>Geeft statistiekonderwijs, met hypothesetoetsing, regressietheorie en statistische inferentie.</li>
    <li>Begeleidt een groepsproject waarin studenten deze methoden toepassen op een economische analyse van eigen keuze.</li>
  </ul>
</div>

<div class="entry" id="experience-vu-research-assistant">
  <div class="entry-head">
    <h3>VU Econometrie en Data Science &middot; Research Assistant</h3>
    <span class="entry-date">januari 2024 &ndash; juni 2024</span>
  </div>
  <div class="entry-org">Amsterdam, Nederland</div>
  <ul>
    <li>Ontwierp schaalbare likelihood-gebaseerde schattingsalgoritmes voor functionele scale-modellen, en optimaliseerde de rekenprestaties via gevectoriseerde berekeningen en parallelle verwerking.</li>
    <li>Verminderde de doorlooptijd van grootschalige Monte Carlo-simulaties met meer dan 90%.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <code>SAS</code> &middot; <code>Bash</code> &middot; <a href="{{ '/nl/projects/functional-scale-estimation/' | relative_url }}">Volledige uitleg &rarr;</a></div>
</div>

<div class="entry" id="experience-beyonddutch-research-intern">
  <div class="entry-head">
    <h3>BeyondDutch &middot; Research Intern</h3>
    <span class="entry-date">januari 2022 &ndash; juni 2023</span>
  </div>
  <div class="entry-org">Hilversum, Nederland</div>
  <ul>
    <li>Implementeerde een statistical learning framework op basis van dynamische Cox proportional hazards modellen om event probabilities en customer retention dynamics in hoogdimensionale data te schatten.</li>
    <li>Ontwikkelde schattingsprocedures en feature engineering pipelines om right-censoring, non-stationariteit en covariate shift aan te pakken, wat de out-of-sample voorspelstabiliteit verbeterde.</li>
  </ul>
</div>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;02</span>
  <h2 id="education">Opleiding</h2>
  <p>PhD, master en bachelor, van toegepaste wiskunde tot kansrekening.</p>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Universiteit Leiden</h3>
    <span class="entry-date">Verwacht september 2028</span>
  </div>
  <div class="entry-org">Doctor of Philosophy (PhD), Wiskunde &middot; Leiden, Nederland</div>
  <ul>
    <li>Onderzoekt statistical learning theory, hoogdimensionale kansrekening en stochastische processen.</li>
    <li>Organiseerde en leidde een wekelijks promotieseminarie over empirical process theory en statistical learning theory, met toepassingen in machine learning en deep learning.</li>
  </ul>
  <p class="form-hint">De volledige technische uitwerking, inclusief een doorloop van de \(\gamma_2\) functionaal en de majorizing measure theorem, staat op de <a href="{{ '/nl/blogposts/dudley-integrals-and-the-majorizing-measure-theorem/' | relative_url }}">Blogposts</a>-pagina.</p>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Vrije Universiteit Amsterdam</h3>
    <span class="entry-date">augustus 2024</span>
  </div>
  <div class="entry-org">Master of Science, Econometrie en Operationele Research &middot; Amsterdam, Nederland</div>
  <ul>
    <li>Honours Programme, GPA 8,9/10 (magna cum laude).</li>
    <li>Ontwikkelde voor een afstudeerproject een nieuw nonparametrisch toetsingskader voor multidimensionale stochastische processen, en implementeerde en verpakte het wiskundige kader in een open-source <a href="https://github.com/DaanZunnenberg/FunctionalMH" target="_blank" rel="noopener noreferrer">Git-repository</a> (zie <a href="{{ '/nl/projects/functional-stationarity-test/' | relative_url }}">Projecten</a>).</li>
    <li>Relevante vakken: Measure Theoretic Probability, Quantitative Financial Risk Management, Stochastic Processes, Stochastic Integration.</li>
  </ul>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Hogeschool van Amsterdam</h3>
    <span class="entry-date">augustus 2022</span>
  </div>
  <div class="entry-org">Bachelor of Science, Toegepaste Wiskunde &middot; Amsterdam, Nederland</div>
  <ul>
    <li>Paste deep learning modellen toe voor binaire classificatie van nieuws over digitale assets met Keras, inclusief tekstvoorbewerking en feature engineering.</li>
  </ul>
</div>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;03</span>
  <h2 id="projects">Projecten</h2>
  <p>Een selectie van het werk; de volledige theorie en code staan op de Projecten-pagina.</p>
</div>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://github.com/DaanZunnenberg/FunctionalScale" target="_blank" rel="noopener noreferrer">Functional Volatility Surface Modelling</a></h3>
    <span class="entry-date">september 2024 &ndash; heden</span>
  </div>
  <ul>
    <li>Breidt het functionele GARCH-raamwerk uit naar een generalized autoregressive score (GAS) model om tijdsvariërende intraday volatility surfaces te schatten en vast te leggen.</li>
    <li>Ontwierp efficiënte schattingsprocedures met B-splines, met Numba JIT-compilatie voor schaalbare modellering van volatility surfaces uit fijnmazige intraday returndata.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <code>SAS</code> &middot; <a href="{{ '/nl/projects/functional-volatility-surface-modelling/' | relative_url }}">Volledige uitleg &rarr;</a></div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://coinmerce.capital/en/home" target="_blank" rel="noopener noreferrer">HRP Portfolio Allocation</a></h3>
    <span class="entry-date">oktober 2023 &ndash; augustus 2024</span>
  </div>
  <ul>
    <li>Implementeerde Hierarchical Risk Parity via tree clustering met <code>scipy.cluster</code> om hoogdimensionale asset allocation te stabiliseren, waarbij klassieke covariantie-inversie wordt vermeden om ruisgevoeligheid weg te nemen.</li>
    <li>Presteerde gemiddeld 3,9 procentpunt beter dan de benchmark over meerdere gesimuleerde investeringshorizons in een look-ahead-vrije backtest.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <a href="https://coinmerce.capital/en/home" target="_blank" rel="noopener noreferrer">Coinmerce Capital</a></div>
</div>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;04</span>
  <h2 id="publications">Publicaties</h2>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>The Tukey depth process under short range dependence</h3>
    <span class="entry-date">2026 &middot; concept</span>
  </div>
  <div class="entry-org">Zunnenberg, D. &amp; D&uuml;rre, A. &middot; Ongepubliceerd manuscript</div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Absolute regularity and maximal moment inequalities</h3>
    <span class="entry-date">2026 &middot; in voorbereiding</span>
  </div>
  <div class="entry-org">Zunnenberg, D. &amp; D&uuml;rre, A. &middot; Ongepubliceerd manuscript</div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Functional location-scale models with robust observation-driven dynamics</h3>
    <span class="entry-date">2025</span>
  </div>
  <div class="entry-org">Lin, Y. &amp; Lucas, A. &middot; Tinbergen Institute Discussion Paper</div>
  <div class="tags">Bijdrage als research assistant</div>
</div>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;05</span>
  <h2 id="leadership-and-activities">Bestuur en Activiteiten</h2>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Mathematisch Instituut, Universiteit Leiden &middot; Bestuurslid, Instituutsraad</h3>
    <span class="entry-date">september 2024 &ndash; augustus 2025</span>
  </div>
  <div class="entry-org">Leiden, Nederland</div>
  <ul>
    <li>Vertegenwoordigde de belangen, standpunten en zorgen van de promovendi.</li>
    <li>Droeg bij aan verbeteringen op het gebied van budgettering, strategische planning en dagelijkse zaken.</li>
  </ul>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Afdeling Econometrie en Data Science, VU Amsterdam &middot; Student-ambassadeur</h3>
    <span class="entry-date">oktober 2023 &ndash; april 2024</span>
  </div>
  <div class="entry-org">Amsterdam, Nederland</div>
  <ul>
    <li>Nam deel aan live Q&amp;A-sessies en (virtuele) voorlichtingsbeurzen.</li>
    <li>Hielp aspirant-studenten door vragen te beantwoorden op het online chatplatform.</li>
  </ul>
</div>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;06</span>
  <h2 id="skills">Vaardigheden</h2>
</div>

<div class="entry">
  <h4 class="resume-glance-group">Talen &amp; Tools</h4>
  <ul class="resume-skills">
    <li>Python (Pandas, NumPy, Numba)</li>
    <li>Java</li>
    <li>SQL</li>
    <li>Git</li>
    <li>Bash</li>
    <li>Dask</li>
  </ul>
  <h4 class="resume-glance-group">Scientific Computing</h4>
  <ul class="resume-skills">
    <li>SciPy</li>
    <li>statsmodels</li>
    <li>CVXPY</li>
    <li>scikit-learn</li>
    <li>TensorFlow</li>
  </ul>
  <h4 class="resume-glance-group">Quantitatieve Methoden</h4>
  <ul class="resume-skills">
    <li>Tijdreeksanalyse</li>
    <li>Econometrie</li>
    <li>Statistische inferentie</li>
    <li>Optimalisatie</li>
  </ul>
</div>

</div>

<p><a href="{{ '/nl/' | relative_url }}">&larr; Terug naar Over mij</a></p>
