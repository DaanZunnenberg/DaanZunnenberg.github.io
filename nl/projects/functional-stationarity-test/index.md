---
layout: default
title: Functional Stationarity Test
permalink: /nl/projects/functional-stationarity-test/
---

<section class="hero">
  <img class="hero-img" src="{{ '/images/volatility/quant_finance.jpg' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Project &middot; 2024</div>
    <h1 class="hero-name">Functional Stationarity Test</h1>
    <p class="hero-lede">Een nonparametrische stationariteitstoets voor multidimensionale diffusies, gebouwd voor mijn masterscriptie.</p>
  </div>
</section>

<div class="article-body">

<p class="tagline"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/MultivariateHamrickTaqqu" target="_blank" rel="noopener noreferrer">FunctionalMH op GitHub</a></p>

<h2 id="overview">Het probleem</h2>
<p>
  De meeste stationariteitstoetsen zijn gebouwd voor &eacute;&eacute;ndimensionale reeksen en &eacute;&eacute;n specifiek parametrisch model. Een unit-root-
  toets op een AR(1), bijvoorbeeld. Dat werkt niet meer zodra het echte proces niet-lineair of multidimensionaal is. Het
  verkeerde model fitten en dat model dan toetsen op een unit root zegt heel weinig over het werkelijke proces.
</p>
<p>
  Dit project gaat een andere weg op. Het bouwt een nonparametrische toets die werkt voor een brede klasse van
  multidimensionale It&ocirc;-diffusies, zonder vooraf een parametrische drift- of diffusiefunctie te veronderstellen.
  Dit is uitgegroeid tot de open-source bibliotheek <code>FunctionalMH</code>, geschreven voor mijn masterscriptie
  (<em>Testing Multidimensional Diffusion Processes for Stationarity</em>, VU Amsterdam, begeleid door Eric
  Beutner en Yicong Lin) in Econometrie en Operationele Research.
</p>
<p>
  De setting: een \(d\)-dimensionaal It&ocirc;-diffusieproces \((S_t)_{t\ge0}\), met toestandsruimte
  \(\mathbb{R}^d\), gegeven als de sterke oplossing van
  \[S_0 = S, \qquad \mathrm{d}S_t = b(S_t)\,\mathrm{d}t + \sigma(S_t)\,\mathrm{d}W_t, \qquad t \ge 0,\]
  waarbij \(b\) de drift is, \(\sigma\) de diffusiecoëfficiënt, en \(W\) een \(d\)-dimensionale Brownse
  beweging. Je observeert &eacute;&eacute;n traject van \(S\), bemonsterd op discrete tijdstippen. Je kent \(b\) of \(\sigma\) niet.
  De vraag: is \(S\) stationair?
</p>
<p>
  Drie voorwaarden laten de toets werken. Ten eerste voldoen \(b\) en \(\sigma\) aan Lipschitz- en lineaire-groei-
  voorwaarden, zodat er een unieke, niet-explosieve oplossing bestaat. Ten tweede is de diffusiecoëfficiënt
  <em>uniform elliptisch</em>: het proces beweegt met vergelijkbare variantie in elke richting, geen richting is
  gedegenereerd. Dat sluit cyclische paden uit en houdt het proces aperiodiek. Ten derde is het proces
  <em>Harris-recurrent</em>: elk gebied met positieve maat wordt oneindig vaak bezocht. Dat garandeert dat er een
  invariante maat bestaat, en het dwingt de <em>occupation measure</em> van het proces, een lopende telling van hoe
  lang het proces al in de buurt van een bepaald punt heeft doorgebracht, om onbegrensd te groeien. Die groeisnelheid is wat de toets-
  statistiek daadwerkelijk meet. Samen bestrijken deze drie voorwaarden een brede klasse financi&euml;le en fysische
  diffusiemodellen, terwijl randgevallen zoals Brownse beweging met drift worden uitgesloten, die slechts het grootste deel van zijn
  toestandsruimte eindig vaak bezoekt.
</p>

<h2 id="test-statistic">Hoe de toets werkt</h2>
<p>
  Het centrale resultaat, van Darling &amp; Kac (1957) en aangescherpt door Lazi&#263; &amp; Sandri&#263; (2021) en
  Lee &amp; Trutnau (2022): voor een Harris-recurrente, uniform elliptische diffusie is stationariteit equivalent aan
  de occupation measure die <em>lineair</em> groeit in de tijd. Een niet-stationair proces groeit juist sublineair.
  Dus in plaats van een parametrische hypothese over drift of mean reversion te toetsen, stelt de toets een eenvoudigere
  vraag. Bezoekt het proces zijn eigen toestandsruimte opnieuw met een lineair tempo, of trager?
</p>
<p>
  Om daar een getal van te maken, vergelijkt de toets twee schatters van de diffusiematrix. Beide zijn consistent
  of het proces nu stationair is of niet, maar ze bereiken dat met een verschillende snelheid.
</p>
<ul>
  <li>Een <strong>time-domain</strong>-schatter: een lokaal, EWMA-achtig gemiddelde van gekwadrateerde increments in een
  krimpend venster rond een vast tijdstip. De convergentiesnelheid hangt niet af van stationariteit, omdat
  hij alleen kijkt naar data die dicht in de tijd bij het geschatte punt ligt.</li>
  <li>Een <strong>state-domain</strong>-schatter: een Nadaraya&ndash;Watson-kernelregressie die gekwadrateerde increments
  middelt over elke observatie dicht bij een bepaalde toestand, ongeacht wanneer die plaatsvond. De snelheid
  hangt af van de occupation measure bij die toestand. Hij convergeert sneller zodra het proces meer tijd
  in de buurt heeft doorgebracht, en dat gebeurt alleen met een lineair tempo als het proces stationair is.</li>
</ul>
<p>
  Dit is hetzelfde idee als een Durbin&ndash;Wu&ndash;Hausman-toets: twee schatters van hetzelfde dat overeenkomen
  onder de nulhypothese en uiteenlopen onder het alternatief. Hier is de nulhypothese dat \(S\) stationair is. Onder de
  nulhypothese convergeert het gestandaardiseerde verschil tussen de twee schatters naar een Gaussische reeks met gemiddelde nul.
  Onder het alternatief loopt het uiteen, omdat de state-domain-schatter vertraagt terwijl de time-domain-
  schatter zijn gebruikelijke snelheid aanhoudt.
</p>
<p>
  Omdat de diffusiematrix op elk punt langs het traject geschat wordt, levert deze vergelijking niet
  &eacute;&eacute;n toetsstatistiek op. Het levert een hele reeks ervan op, ruwweg &eacute;&eacute;n per geobserveerd tijdstip. De toets heeft
  &eacute;&eacute;n getal nodig om op basis van die reeks een beslissing te nemen, en leent daarvoor een idee uit de extreme-waardetheorie. Onder de
  nulhypothese gedraagt de reeks zich als een stationair Gaussisch proces, en het lopende maximum van zo'n proces heeft
  een bekende, gesloten Gumbel-achtige limiet. De toets verwerpt stationariteit als het geobserveerde lopende maximum
  die limiet overschrijdt. Geen bootstrap, geen gesimuleerde kritieke waarden, gewoon een analytische grens.
</p>

<h2 id="implementation">Hoe de code georganiseerd is</h2>
<p class="form-hint">
  <strong>Let op.</strong> Alles hieronder is geschreven voor <em>bivariate</em> processen (\(d=2\)). De theorie
  hierboven geldt voor elke dimensie \(d\), en <code>models/processes.py</code> bevat simulators in andere
  dimensies ter referentie, maar de schatter en toetsstatistiek in <code>testing/kernel_test.py</code> zijn
  specifiek gebouwd rond \(2\times2\)-diffusiematrices. De <code>vech</code>-halfvectorisatie, de
  matrix-vierkantswortel-inverse, en de dichtheidsschatting binnen de state-domain-smoother gaan allemaal uit van \(d=2\).
</p>
<p>
  Het package staat onder <code>src/mht/</code>. <code>testing/kernel_test.py</code> bevat de kern van de toets:
  <code>Kernel</code>, <code>KernelTest</code>, <code>Simulator</code>, <code>TestPlotter</code>.
  <code>testing/hypothesis.py</code> voegt <code>MultipleHypTest</code> toe, een Benjamini&ndash;Hochberg/Yekutieli
  FDR-control-alternatief voor de running-maximum-aanpak hieronder. <code>models/processes.py</code> bevat vier SDE-
  simulators, waaronder een bivariate gecorreleerde diffusie met een Milstein-schema en een expliciete correctieterm
  voor de polynomiale diffusiecoëfficiënt. <code>io/reader.py</code> laadt voorberekende simulatie-CSV's.
</p>
<p>
  Alles loopt via &eacute;&eacute;n object, <code>KernelTest</code>. Je geeft het een traject en twee configuratie-
  dictionaries, en het brengt je in vier stappen van ruwe data naar een verwerpingsbeslissing: de data voorbereiden, een
  kernel en bandbreedte kiezen, de twee schatters berekenen, en dan reduceren naar &eacute;&eacute;n toetsstatistiek. De walkthrough
  hieronder volgt die vier stappen in volgorde, met de daadwerkelijke code bij elke stap.
</p>

<h4 id="step-1-data">Stap 1. Het traject laden</h4>
<p>
  <code>KernelTest</code> is een dunne, stateful container. Geef het een bivariaat traject, gesimuleerd met
  <code>BivariateOUProcess</code>/<code>BivariateCorrelatedBM</code> of ingelezen uit een CSV, en het slaat
  de configuratie voor de twee schatters op. Er wordt nog niets berekend, de schattingen worden alleen gevuld zodra je
  de methoden in stap 3 en 4 aanroept.
</p>
<pre class="code-block" data-lang="python"><code>class KernelTest:
    """Kernel-based test for time-homogeneity of the diffusion matrix.

    Compares a state-domain smoother against a time-domain smoother of the
    integrated diffusion matrix. Under H0 (time-homogeneous diffusion) the
    standardised difference converges to a Gaussian process whose running
    maximum has a known Gumbel-type limit distribution.
    """

    def __init__(
        self,
        data: pd.DataFrame,        # columns ['process 1', 'process 2']
        kernel_params: dict,       # {'bandwidth', 'n', 'T', 'kernel'}
        time_params: dict,         # {'bandwidth', 'n', 'T'}
        disable: bool = False,     # suppress tqdm progress bars
    ) -> None:
        self.data = data
        self.kernel_params = kernel_params
        self.time_params = time_params
        self.disable = disable
        self.kernel_estimates: dict = {}
        self.time_estimates: dict = {}</code></pre>
<p>
  Als de data gesimuleerd is op een raster van \(n\) observaties over horizon \(T\), is het effectieve bemonsterings-
  interval \(\Delta_n = T/n\). Dat is het getal waarop elke bandbreedte hieronder is afgestemd.
</p>

<h4 id="step-2-kernel">Stap 2. Een kernel en bandbreedte kiezen</h4>
<p>
  De state-domain-smoother heeft een kernel en een bandbreedte nodig. De standaardkernel is
  <code>Kernel.BaseKernel</code>, een gewone boxcar: gewicht 1 binnen de bandbreedte, 0 daarbuiten. De time-domain-
  smoother heeft zijn eigen, apart afgestemde bandbreedte nodig. Beide volgen de bijna-optimale snelheden van Bandi &amp;
  Moloche (2018), zodat je niet voor elke dataset handmatig een nieuwe constante hoeft af te stemmen; <code>Simulator</code>
  zoekt ze op in een tabel, gesleuteld op horizonlengte.
</p>
<pre class="code-block" data-lang="python"><code>class Kernel:
    """Kernel functions for the state-domain (Nadaraya-Watson) smoother."""

    def __init__(self, *, kernel_params: dict) -> None:
        self.kernel_params = kernel_params

    def BaseKernel(self) -> Callable:
        """Boxcar/indicator kernel, K(x) = 1{|x| <= h}."""
        def k(x: np.ndarray) -> np.ndarray:
            return np.where(np.abs(x) <= 1, 1.0, 0.0)
        return k</code></pre>
<p>
  Stap 1 en 2 samen, zo ziet het opzetten van een toets er in de praktijk uit. De bandbreedte hier
  volgt de bijna-optimale snelheid \(h_{n,T} = C/(n^{1/6}\log n)\) van Bandi &amp; Moloche (2018), met de
  constante \(C\) &eacute;&eacute;nmalig afgestemd per horizonlengte.
</p>
<pre class="code-block" data-lang="python"><code>from mht.testing.kernel_test import KernelTest, Kernel

n, T = 3000, 150.0
bandwidth = np.sqrt(3) * 6 / (n ** (1 / 6) * np.log(n))

test = KernelTest(
    data=trajectory,                                  # DataFrame, shape (n, 2)
    kernel_params={
        'bandwidth': bandwidth,
        'n': n, 'T': T,
        'kernel': Kernel.BaseKernel,
    },
    time_params={'bandwidth': 100 * T / n, 'n': n, 'T': T},
    disable=True,
)</code></pre>

<h4 id="step-3-estimators">Stap 3. Beide schatters berekenen</h4>
<p>
  Drie aanroepen doen het echte werk van deze stap. <code>time_domain_smoother</code> bouwt de EWMA-gewogen
  time-domain-schatter. <code>state_domain_smoother</code> bouwt de Nadaraya&ndash;Watson state-domain-
  schatter, optioneel met een kerneldichtheidsschatting van de toestand in plaats van een ruwe occupation count.
  <code>gauss</code> neemt vervolgens het gestandaardiseerde verschil tussen de twee, via een matrix-vierkantswortel-
  inverse van hun gecombineerde covariantie. Als die matrixinversie numeriek faalt, valt het terug op
  <code>NaN</code> in plaats van te crashen, goed om te weten, want een mislukte inversie zou anders kunnen lijken op
  bewijs tegen de nulhypothese.
</p>
<pre class="code-block" data-lang="python"><code>test.time_domain_smoother(lamb=0.94)     # EWMA time-domain estimator ĉ_TD
test.state_domain_smoother(dist=False)   # Nadaraya-Watson state-domain estimator ĉ_SD
test.gauss()                             # standardised difference, stored in test.gaussian</code></pre>
<p>
  Voordat je enige toetsstatistiek berekent, plot de twee schattingen tegen elkaar. Ze volgen dezelfde
  diffusiecoëfficiënt, alleen vanuit andere data, dus elk echt structureel gat tussen beide is precies waarvoor de
  toets later gebouwd is om op te pikken. De twee figuren hieronder draaien dit op twee gesimuleerde bivariate trajecten:
  een stationair Ornstein&ndash;Uhlenbeck-proces, en een tijd-inhomogene diffusie waarbij de werkelijke volatiliteit
  in de tijd verschuift.
</p>
<img src="{{ '/images/stationarity/volatility_stationary.png' | relative_url }}?v={{ site.time | date: '%s' }}" alt="State-domain versus time-domain volatility estimate, one panel per process component, for a simulated stationary bivariate Ornstein-Uhlenbeck process" class="entry-figure">
<p class="form-hint">Stationair bivariaat OU-proces, \(T=150\), \(n=3000\), &eacute;&eacute;n panel per component. De twee schatters volgen elkaar nauwgezet gedurende de hele reeks. Precies wat de nulhypothese voorspelt.</p>
<img src="{{ '/images/stationarity/volatility_nonstationary.png' | relative_url }}?v={{ site.time | date: '%s' }}" alt="State-domain versus time-domain volatility estimate, one panel per process component, for a simulated time-inhomogeneous bivariate diffusion" class="entry-figure">
<p class="form-hint">Tijd-inhomogene bivariate diffusie, dezelfde \(T\) en \(n\). De state-domain-smoother bundelt observaties over het hele traject, dus schiet hij voorbij de time-domain-smoother zodra de werkelijke diffusiecoëfficiënt in beweging is.</p>

<h4 id="step-4-statistic">Stap 4. Reduceren naar &eacute;&eacute;n toetsstatistiek</h4>
<p>
  <code>gauss</code> laat je achter met een reeks gestandaardiseerde verschillen, &eacute;&eacute;n per geobserveerd tijdstip, niet
  &eacute;&eacute;n enkel getal. <code>transform_1D_gauss</code> is de laatste stap: hij comprimeert die reeks tot een scalair
  lopend maximum en koppelt dat aan de analytische Pickands&ndash;Berman-Gumbel-grens op een gegeven betrouwbaarheids-
  niveau. Als het lopende maximum de grens overschrijdt, verwerpt de toets stationariteit. Er is geen simulatie of bootstrap
  nodig voor de kritieke waarde, die komt rechtstreeks uit de extreme-waardetheorie.
</p>
<pre class="code-block" data-lang="python"><code>def transform_1D_gauss(self, alpha: float = 0.95) -> tuple:
    """Reduce the Gaussian process to a scalar running maximum and its
    Gumbel-type critical bound at confidence level alpha."""
    x = np.log(1 / np.log(1 / alpha))
    n = len(self.gaussian)
    a_n = [np.sqrt(2 * np.log(z)) for z in range(1, n + 1)]
    b_n = [
        np.sqrt(2 * np.log(z))
        - np.log(np.pi * np.log(z)) / (2 * np.sqrt(2 * np.log(z)))
        for z in range(1, n + 1)
    ]
    bound = [np.nan] + [(x / a_n[i]) + b_n[i] for i in range(1, n)]
    scalar_gauss = [float(np.sum(g) / np.sqrt(3)) for g in self.gaussian]
    return bound, scalar_gauss</code></pre>
<p>
  Aanroepen en het resultaat controleren is &eacute;&eacute;n regel elk.
</p>
<pre class="code-block" data-lang="python"><code>bound, z = test.transform_1D_gauss(alpha=0.95)
rejects = running_maximum(z)[-1] > bound[-1]</code></pre>
<p>
  Hier is die check op dezelfde twee trajecten uit stap 3. Op het stationaire proces zakt het lopende maximum
  vroeg onder de kritieke grens en blijft het daar. Op het tijd-inhomogene proces overschrijdt het
  de grens binnen de eerste paar honderd observaties en blijft het stijgen, omdat het gestandaardiseerde verschil
  tussen de twee schatters nooit stabiliseert zodra de werkelijke diffusiecoëfficiënt in beweging komt.
</p>
<img src="{{ '/images/stationarity/running_max_stationary.png' | relative_url }}?v={{ site.time | date: '%s' }}" alt="Running maximum test statistic for the stationary Ornstein-Uhlenbeck process, staying below the Gumbel critical bounds at every confidence level" class="entry-figure">
<p class="form-hint">Het gestandaardiseerde Gaussische proces \(Z_t\) (grijs), zijn empirische lopende maximum \(\phi_j\) (rood), en de Pickands&ndash;Berman kritieke grens op vier betrouwbaarheidsniveaus. Het lopende maximum overschrijdt zelfs de losste (50%) grens niet, dus verwerpt de toets stationariteit niet.</p>
<img src="{{ '/images/stationarity/running_max_nonstationary.png' | relative_url }}?v={{ site.time | date: '%s' }}" alt="Running maximum test statistic for the nonstationary time-inhomogeneous diffusion, sharply exceeding all Gumbel critical bounds" class="entry-figure">
<p class="form-hint">Dezelfde constructie op de tijd-inhomogene diffusie. Het lopende maximum doorbreekt elke grens binnen de eerste paar honderd observaties en komt niet meer terug. Een duidelijke verwerping van stationariteit.</p>

<h4 id="design-notes">Waarom de code zo opgesplitst is</h4>
<p>
  Elk onderdeel is om een reden apart gehouden. <code>time_domain_smoother</code> en
  <code>state_domain_smoother</code> blijven gescheiden methoden, geen gecombineerde schatter, omdat ze
  verschillende hoeveelheden data gebruiken met verschillende snelheden. Ze apart houden maakt het ook makkelijk om later een andere
  smoother in te wisselen, zonder de rest van de pipeline aan te raken. <code>gauss</code> is zijn eigen methode omdat
  het de ene stap is die een numeriek fragiele matrixinversie doet, dus door hem te isoleren wordt dat faalmodus makkelijk te
  herkennen. <code>transform_1D_gauss</code> is apart gehouden van <code>gauss</code> omdat het kiezen van een betrouwbaarheids-
  niveau en reduceren tot een lopend maximum een modelkeuze is, los van het schatten van het gestandaardiseerde
  verschil zelf. <code>Simulator</code> stuurt Monte Carlo-replicatie aan en kiest automatisch bandbreedtes,
  zodat een simulatiestudie geen handmatige afstemming nodig heeft bij elke run. <code>TestPlotter</code> leidt af van
  <code>KernelTest</code> om de plotmethoden toe te voegen die gebruikt zijn voor de figuren hierboven, zodat een plot altijd
  weerspiegelt welke configuratie het onderliggende testobject heeft opgeleverd. Numerieke vangnetten lopen overal doorheen: fragiele
  matrixinversies geven <code>NaN</code> terug in plaats van een fout te gooien, en een caching-decorator valt netjes
  terug zodra hem iets onhashable wordt aangeboden, zoals een DataFrame.
</p>

<h2 id="testing">Testen en validatie</h2>
<p>
  <code>tests/test_processes.py</code> en <code>tests/test_kernel_test.py</code> zijn smoke-tests. Ze controleren
  dat gesimuleerde paden eindig en correct van vorm zijn, en dat de pipeline end-to-end draait en een
  eindige grens teruggeeft. Ze controleren niet de daadwerkelijke verwerpingspercentages. <code>simulations/</code> bevat
  voorberekende CSV's van Gaussische-procespaden onder de nulhypothese, bij twee steekproefgroottes, gebruikt voor een batch-
  verwerpingspercentagestudie van de toets zelf.
</p>
<p>
  In de eigen simulatiestudie van de scriptie komt de toets dicht bij het nominale verwerpingspercentage van 5% terecht op een stationair
  bivariaat Ornstein&ndash;Uhlenbeck-proces naarmate de steekproef groeit. Hij verwerpt een niet-stationaire planaire Brownse
  beweging snel. Op een tijd-inhomogene bivariate diffusie signaleert hij niet-stationariteit correct, maar met een
  echte beperking: de power daalt naarmate \(T\) groeit terwijl het bemonsteringsinterval \(\Delta_n\) vast wordt gehouden. Dat
  gebeurt omdat het proces, bekeken op elke enkele vaste tijdschaal, er lokaal uit begint te zien als een stationair
  Ornstein&ndash;Uhlenbeck-proces. Het is dezelfde waarschuwing als uit de theoriesectie hierboven: de
  running-maximum-benadering heeft een voldoende grote steekproef nodig om de extreme-waarde-asymptotiek daadwerkelijk te laten gelden.
</p>

<h2 id="repository-structure">Repository-structuur</h2>
<pre class="code-block" data-lang="txt"><code>src/mht/
    testing/
        kernel_test.py        # KernelTest, Simulator, TestPlotter
        hypothesis.py         # MultipleHypTest, LaTeXTable
    models/
        processes.py          # BivariateOUProcess, BivariateCorrelatedBM, ...
    io/
        reader.py             # Reader class for simulation CSV files
    viz/                      # TestPlotter re-exported here
    utils/
        decorators.py
simulations/                  # Pre-computed CSV simulation results
notebooks/
    example.ipynb
tests/
    test_processes.py
    test_kernel_test.py
</code></pre>
<p class="form-hint">Vereist Python &ge; 3.10. Bevat ook BH/BY FDR-procedures als alternatieve multiple-hypothesis-baseline voor simulatiestudies.</p>

</div>

<p><a href="{{ '/nl/projects/' | relative_url }}">&larr; Terug naar Projecten</a></p>
