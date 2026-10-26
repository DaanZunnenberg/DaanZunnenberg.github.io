---
layout: default
title: Blogposts
permalink: /nl/blogposts/
body_class: blogposts-index
---

<section class="hero hero-lg hero-scroll">
  <img class="hero-img" src="{{ '/images/Rotterdam.avif' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <!-- Animated live order-flow ladder background, kept for later use: uncomment to restore it in place of the static image above.
  <canvas id="orderflow-ladder-canvas" class="hero-canvas" aria-label="Live combined depth-of-market and order-flow ladder for Binance XLM/USDT, SOL/USDT, and XRP/USDT: each row is a price level showing resting bid and ask book size, the net executed buy/sell delta traded at that level, and a running cumulative delta down the visible price levels (scroll horizontally on narrow screens)" aria-hidden="true"></canvas>
  -->
  <div class="hero-fade hero-fade-long" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Notities &amp; Aankondigingen</div>
    <h1 class="hero-name">Blogposts</h1>
    <p class="hero-lede">Stukken over markten en wiskunde, samen met de lezingen, posters en seminars die erbij horen.</p>
  </div>
</section>

<p class="lede">
  Deze pagina verzamelt drie dingen. Allereerst de posts: stukken over markten en wiskunde, hier gepubliceerd.
  Daarnaast volledige bewijzen van een paar van mijn favoriete resultaten in de kansrekening. En als laatste een
  overzicht van lezingen, posters en conferenties &mdash; waar ik heb gepresenteerd of bij was, en waar het over ging.
</p>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;01</span>
  <h2 id="blogposts">Blogposts</h2>
  <p>Af en toe geschreven stukken over markten, wiskunde, en het snijvlak daartussen.</p>
</div>

<div class="filterable-section">

<div class="tag-filter" role="group" aria-label="Filter blogposts by topic">
  <button type="button" class="tag-filter-btn is-active" data-tag="all" aria-pressed="true">Alles</button>
  <button type="button" class="tag-filter-btn tag-filter-btn-finance" data-tag="finance" aria-pressed="false">Finance</button>
  <button type="button" class="tag-filter-btn tag-filter-btn-mathematical" data-tag="mathematical" aria-pressed="false">Wiskundig</button>
  <button type="button" class="tag-filter-btn tag-filter-btn-opinion" data-tag="opinion" aria-pressed="false">Opinie</button>
  <button type="button" class="tag-filter-btn tag-filter-btn-news" data-tag="news" aria-pressed="false">Nieuws</button>
</div>

<div class="article-grid" data-filterable>
  <a class="article-card" data-tags="finance mathematical" href="{{ '/nl/blogposts/the-mathematics-of-market-liquidity/' | relative_url }}">
    <span class="article-card-body">
      <span class="article-card-title">The Mathematics of Market Liquidity</span>
      <span class="article-card-date">11 mrt 2026</span>
    </span>
    <span class="article-card-desc">Market making is een opgelost probleem. Dat betekent niet dat je er ook mee wint. &middot; met Nicos Starreveld</span>
    <span class="article-card-tags" aria-hidden="true"><span class="tag tag-finance">Finance</span><span class="tag tag-mathematical">Wiskundig</span></span>
  </a>

  <a class="article-card" data-tags="finance mathematical" href="{{ '/nl/blogposts/sieve-estimation-of-volatility/' | relative_url }}">
    <span class="article-card-body">
      <span class="article-card-title">Sieve-M Estimation for Conditional Heteroskedasticity</span>
      <span class="article-card-date">23 feb 2023</span>
    </span>
    <span class="article-card-desc">Een GARCH-model zijn eigen news-impactcurve laten leren</span>
    <span class="article-card-tags" aria-hidden="true"><span class="tag tag-finance">Finance</span><span class="tag tag-mathematical">Wiskundig</span></span>
  </a>

</div>

<p class="article-grid-empty" data-filter-empty hidden>Nog geen blogposts met dit label &mdash; kom later terug, of kies een ander filter hierboven.</p>

<div class="article-grid-more">
  <button type="button" class="article-grid-more-btn" data-show-more hidden>Meer tonen</button>
</div>

</div>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;02</span>
  <h2 id="articles">Artikelen</h2>
  <p>Volledige bewijzen van mijn favoriete resultaten in generic chaining en empirical process theory.</p>
</div>

<div class="filterable-section">

<div class="tag-filter" role="group" aria-label="Filter articles by topic">
  <button type="button" class="tag-filter-btn is-active" data-tag="all" aria-pressed="true">Alles</button>
  <button type="button" class="tag-filter-btn tag-filter-btn-chaining" data-tag="chaining" aria-pressed="false">Chaining</button>
  <button type="button" class="tag-filter-btn tag-filter-btn-empirical-processes" data-tag="empirical-processes" aria-pressed="false">Empirical Processes</button>
  <button type="button" class="tag-filter-btn tag-filter-btn-concentration" data-tag="concentration" aria-pressed="false">Concentration</button>
</div>

<div class="article-grid" data-filterable>
  <a class="article-card" data-tags="chaining" href="{{ '/nl/blogposts/dudley-integrals-and-the-majorizing-measure-theorem/' | relative_url }}">
    <span class="article-card-body">
      <span class="article-card-title">Dudley Integrals and the Majorizing Measure Theorem</span>
    </span>
    <span class="article-card-desc">Waarom covering numbers niet altijd genoeg zijn, en Talagrands scherpe oplossing voor Gaussische processen.</span>
    <span class="article-card-tags" aria-hidden="true"><span class="tag tag-chaining">Chaining</span></span>
  </a>

  <a class="article-card" data-tags="chaining empirical-processes" href="{{ '/nl/blogposts/fundamental-theorem-of-empirical-processes/' | relative_url }}">
    <span class="article-card-body">
      <span class="article-card-title">The Fundamental Theorem of Empirical Processes</span>
    </span>
    <span class="article-card-desc">De generic-chainingbound voor Gaussische processen, uitgebreid naar sommen van onafhankelijke willekeurige functies.</span>
    <span class="article-card-tags" aria-hidden="true"><span class="tag tag-chaining">Chaining</span><span class="tag tag-empirical-processes">Empirical Processes</span></span>
  </a>

  <a class="article-card" data-tags="concentration empirical-processes" href="{{ '/nl/blogposts/bousquet-talagrand-inequality/' | relative_url }}">
    <span class="article-card-body">
      <span class="article-card-title">The Bousquet&ndash;Talagrand Inequality</span>
    </span>
    <span class="article-card-desc">Een scherpe concentration bound voor het supremum van een empirisch proces, via de entropiemethode.</span>
    <span class="article-card-tags" aria-hidden="true"><span class="tag tag-concentration">Concentration</span><span class="tag tag-empirical-processes">Empirical Processes</span></span>
  </a>
</div>

<p class="article-grid-empty" data-filter-empty hidden>Nog geen artikelen met dit label &mdash; kom later terug, of kies een ander filter hierboven.</p>

<div class="article-grid-more">
  <button type="button" class="article-grid-more-btn" data-show-more hidden>Meer tonen</button>
</div>

</div>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;03</span>
  <h2 id="events">Events</h2>
  <p>Conferenties, lezingen en posters die ik geef of bezoek, aankomend en in het verleden, gegroepeerd per type en nieuwste eerst binnen elke groep.</p>
</div>

<h3 id="conferences">Conferenties</h3>
<div class="timeline">

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">15&ndash;18 december 2026</span>
      <span class="timeline-title">2026 IMS International Conference on Statistics and Data Science (ICSDS) &middot; The Tukey Depth Under Dependence</span>
    </div>
    <div class="timeline-org">Institute of Mathematical Statistics &middot; Split, Kroati&euml; &middot; eigen lezing</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Details tonen</span><span class="label-close">&minus; Details verbergen</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            We breiden de theorie van Tukey-diepte uit naar absoluut reguliere (\(\beta\)-mixing)
            stochastische processen. We generaliseren met name Mass&eacute;'s resultaat over zwakke convergentie
            van het Tukey-diepteproces naar afhankelijke observaties, en leiden convergentiesnelheden af in
            termen van de mixingco&euml;ffici&euml;nten. Een toepassing breidt de theorie van Mass&eacute; over
            depth-weighted estimators uit. Ten eerste laten we zien dat de aannames op het gewicht aanzienlijk
            kunnen worden afgezwakt, en ten tweede dat de observaties zwak afhankelijk mogen zijn. Een
            simulatiestudie laat de voordelen van depth-weighted estimators zien onder heavy-tailed innovaties.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">13 november 2026</span>
      <span class="timeline-title">Finance Research Day</span>
    </div>
    <div class="timeline-org">Delft Institute of Applied Mathematics (DIAM), TU Delft &middot; Mondai, Delft, Nederland &middot; 09:00&ndash;17:00</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Details tonen</span><span class="label-close">&minus; Details verbergen</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            De vijfde Finance Research Day, georganiseerd door DIAM aan de TU Delft, waar academici,
            practitioners en toezichthouders in de quantitative finance samenkomen om actuele vraagstukken te
            bespreken en nieuwe richtingen in het vakgebied te verkennen.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">November 2026</span>
      <span class="timeline-title">54th Annual Meeting of the Dutch Probability and Statistics Community</span>
    </div>
    <div class="timeline-org">STAR &middot; Stochastics Theoretical and Applied Research &middot; Lunteren, Nederland</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Details tonen</span><span class="label-close">&minus; Details verbergen</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            STAR Lunteren is de belangrijkste jaarlijkse bijeenkomst voor onderzoekers in kansrekening en
            statistiek in Nederland: een paar dagen op een conferentiecentrum in Lunteren waar vrijwel elke
            Nederlandse promovendus in het vakgebied jaarlijks terechtkomt. Ik ga deze keer als
            posterpresentator; ik voeg de poster zelf toe zodra die klaar is.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">November 2025</span>
      <span class="timeline-title">53rd Annual Meeting of the Dutch Probability and Statistics Community</span>
    </div>
    <div class="timeline-org">STAR &middot; Stochastics Theoretical and Applied Research &middot; Lunteren, Nederland</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Details tonen</span><span class="label-close">&minus; Details verbergen</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            Poster gepresenteerd over gezamenlijk werk met Dr. A.M. D&uuml;rre naar Tukey-diepte onder
            kortetermijnafhankelijkheid: hoe het klassieke begrip statistische diepte, normaal gesproken
            bestudeerd voor onafhankelijke steekproeven, zich gedraagt zodra de onderliggende data in plaats
            daarvan kortetermijn temporele afhankelijkheid vertoont.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">November 2025</span>
      <span class="timeline-title">Dutch Math Finance Afternoons</span>
    </div>
    <div class="timeline-org">University of Amsterdam &middot; Amsterdam, Nederland</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Details tonen</span><span class="label-close">&minus; Details verbergen</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            Lezingen over functionele schatting van optieprijsmodellen door Evgenii Vladimirov, waardering van
            renteswaps op rekenkundige gemiddelden van risicovrije rentes door Arco de Kort, en het meten van
            financi&euml;le weerbaarheid met backward stochastic differential equations door Matteo Ferrari.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">Oktober 2025</span>
      <span class="timeline-title">Finance Research Day</span>
    </div>
    <div class="timeline-org">Delft Institute of Applied Mathematics (DIAM), TU Delft &middot; Delft, Nederland</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Details tonen</span><span class="label-close">&minus; Details verbergen</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            De vierde Finance Research Day van DIAM aan de TU Delft: een dag met een mix van academische
            lezingen en praktijkperspectieven op quantitative finance, bedoeld om onderzoekers en practitioners
            voor &eacute;&eacute;n keer in dezelfde ruimte te krijgen.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">November 2024</span>
      <span class="timeline-title">52nd Annual Meeting of the Dutch Probability and Statistics Community</span>
    </div>
    <div class="timeline-org">STAR &middot; Stochastics Theoretical and Applied Research &middot; Lunteren, Nederland</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Details tonen</span><span class="label-close">&minus; Details verbergen</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            Poster gepresenteerd over maximal inequalities en concentration of measure onder absolute
            regulariteit: hoever de klassieke gereedschapskist voor het begrenzen van suprema van stochastische
            processen reikt zodra het onderliggende proces absoluut regulier (beta-mixing) is in plaats van
            onafhankelijk.
          </p>
        </div>
      </div>
    </div>
  </div>

</div>

<h3 id="seminars">Seminars</h3>
<div class="timeline">

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">24 november 2026</span>
      <span class="timeline-title">Statistics Seminar &middot; Mathematical Institute, Leiden University &middot; Maximal Moment Inequalities and Absolute Regularity</span>
    </div>
    <div class="timeline-org">Leiden, Nederland &middot; eigen lezing</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Details tonen</span><span class="label-close">&minus; Details verbergen</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            Een lezing over maximal moment inequalities voor sommen van toevalsvariabelen onder absolute
            regulariteit (\(\beta\)-mixing), en wat deze ongelijkheden opleveren zodra de onafhankelijkheidsaanname
            achter de klassieke versies wordt losgelaten.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">5 oktober 2026</span>
      <span class="timeline-title">The van Dantzig Seminar</span>
    </div>
    <div class="timeline-org">Susanne Ditlevsen (University of Copenhagen) en Johannes Ruf (London School of Economics) &middot; Vrije Universiteit Amsterdam, zaal HG-15A16</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Details tonen</span><span class="label-close">&minus; Details verbergen</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            Een introductielezing en een verdiepende lezing van zowel Susanne Ditlevsen als Johannes Ruf, van
            10:00 tot 16:15 met pauzes, gevolgd door borrel. Titels van de lezingen volgen nog.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">Mei 2026</span>
      <span class="timeline-title">Statistics Seminar &middot; Mathematical Institute, Leiden University</span>
    </div>
    <div class="timeline-org">Leiden, Nederland &middot; eigen lezing</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Details tonen</span><span class="label-close">&minus; Details verbergen</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            Een lezing gegeven met als titel &ldquo;Maximal and concentration inequalities for mixing empirical
            measures and their application.&rdquo; Empirical process theory geeft scherpe controle over hoe een
            empirische maat rond zijn doel fluctueert onder onafhankelijkheid; de lezing behandelt hoeveel van
            die controle overeind blijft zodra de onafhankelijkheidsaanname wordt ingewisseld voor
            mixingvoorwaarden, en waar de resulterende ongelijkheden in de praktijk voor te gebruiken zijn.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">Mei 2026</span>
      <span class="timeline-title">MIT Probability Seminar &middot; Three-Color van der Waerden Numbers Grow Super-Exponentially</span>
    </div>
    <div class="timeline-org">Jacob Fox (Stanford University) &middot; Cambridge, Massachusetts, Verenigde Staten</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Details tonen</span><span class="label-close">&minus; Details verbergen</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            Een lezing over een nieuwe constructie die laat zien dat, zodra drie kleuren zijn toegestaan, de
            van der Waerden-getallen sneller groeien dan elke exponenti&euml;le functie van de
            progressielengte. Dat lost een vraag op die ongeveer honderd jaar open stond over hun werkelijke
            groeisnelheid, en weerlegt meerdere vermoedens die het omgekeerde beweerden.
          </p>
          <h4>Het van der Waerden-getal</h4>
          <p>
            Voor positieve gehele getallen \(k\) en \(r\) is het van der Waerden-getal \(w(k;r)\) het kleinste
            positieve gehele getal \(N\) zodat elke kleuring van de getallen van &eacute;&eacute;n tot \(N\) met
            \(r\) kleuren een monochromatische rekenkundige rij van lengte \(k\) bevat. De stelling van van der
            Waerden garandeert dat zo'n \(N\) altijd bestaat; de moeilijkheid, een eeuw lang open, is bepalen
            hoe snel \(w(k;r)\) groeit als \(k\) groeit.
          </p>
          <p>
            Erd&#337;s vermoedde dat \(w(k;2)\) sneller groeit dan elke exponenti&euml;le functie van \(k\),
            dat wil zeggen,
            \[\limsup_{k \to \infty} w(k;2)^{1/k} = \infty,\]
            terwijl een tegengesteld vermoeden juist stelde dat \(w(k;r)^{1/k}\) convergeert naar \(r\) voor elk
            vast aantal kleuren \(r\).
          </p>
          <h4>Het resultaat</h4>
          <p>
            De lezing laat zien dat, voor drie of meer kleuren, het tegengestelde vermoeden onjuist is. De van
            der Waerden-getallen groeien super-exponentieel in \(k\) zodra \(r \ge 3\). Met \(\log^{*} k\) voor
            de iteratieve logaritme van \(k\) (het aantal keer dat de logaritme moet worden toegepast op \(k\)
            voordat het resultaat ten hoogste een is), luidt de precieze bewezen grens dat, voor \(k\)
            voldoende groot,
            \[w(k;3) > 2^{k (\log^{*}k)/4}.\]
          </p>
          <p>
            De constructie achter deze grens is een gerandomiseerde &ldquo;shifted product&rdquo;-procedure.
            Een zeer dichte, van rekenkundige progressies vrije deelverzameling van een grote cyclische groep
            wordt probabilistisch opgebouwd, en vervolgens gecombineerd met kleinere constructies van dezelfde
            soort om steeds grotere drie-kleuringen te maken, vrij van monochromatische \(k\)-term progressies,
            herhaald ongeveer \((\log^{*}k)/2\) keer. Dezelfde ideeën leveren ook een nieuwe ondergrens op voor
            de canonieke van der Waerden-getallen \(H(k)\), waarmee een verwant open probleem van Erd&#337;s en
            Graham wordt opgelost door te laten zien dat
            \[H(k) \ge k^{(1-o(1))k\log k}.\]
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">Mei 2026</span>
      <span class="timeline-title">MIT Probability Seminar &middot; Fluctuations for the Toda Lattice</span>
    </div>
    <div class="timeline-org">Matthew Nicoletti (Stanford University) &middot; Cambridge, Massachusetts, Verenigde Staten</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Details tonen</span><span class="label-close">&minus; Details verbergen</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            Een lezing over gezamenlijk werk met Amol Aggarwal, die laat zien dat het Toda-rooster, een
            klassiek systeem van interagerende deeltjes op de re&euml;le lijn, stroom- en deeltjesfluctuaties
            heeft die na diffusieve herschaling convergeren naar een expliciet Gaussisch proces. Dat plaatst
            dit integreerbare systeem in een andere universaliteitsklasse dan de niet-Gaussische fluctuaties
            die verwacht worden bij vergelijkbare chaotische veeldeeltjessystemen.
          </p>
          <h4>Het Toda-rooster in thermisch evenwicht</h4>
          <p>
            Het Toda-rooster is een Hamiltoniaans systeem van deeltjes ge&iuml;ndexeerd door de gehele getallen,
            met posities \(q_i(t)\) en impulsen \(p_i(t)\) die evolueren volgens de bewegingsvergelijkingen
            \[\partial_t q_i(t) = p_i(t), \qquad \partial_t p_i(t) = e^{q_{i-1}(t) - q_i(t)} - e^{q_i(t) -
            q_{i+1}(t)}.\]
            Omdat het oneindig veel behouden grootheden heeft, is het Toda-rooster een klassiek voorbeeld van
            een integreerbaar systeem, in tegenstelling tot generieke, chaotische veeldeeltjes-Hamiltonsystemen.
            De lezing bestudeert het onder thermisch evenwicht, de natuurlijke willekeurige begincondities
            waarbij impulsen en positieverschillen onafhankelijk worden getrokken uit expliciete Gaussische en
            gammaverdelingen.
          </p>
          <h4>Diffusieve Gaussische fluctuaties</h4>
          <p>
            Voor chaotische interagerende deeltjessystemen plaatsen fysische voorspellingen en rigoureuze
            resultaten voor verwante stochastische modellen de ruimte-tijdstroomfluctuaties na lange tijd
            \(T\) op de \(T^{1/3}\)-schaal, convergerend naar een niet-Gaussische limiet uit de
            Kardar&ndash;Parisi&ndash;Zhang-universaliteitsklasse. Voor het integreerbare Toda-rooster laat de
            lezing in plaats daarvan zien dat deze fluctuaties op de grotere \(T^{1/2}\)-schaal liggen en
            convergeren naar een expliciet Gaussisch proces. Als gevolg hiervan convergeert het traject van
            een enkel deeltje, passend herschaald, naar een Brownse beweging:
            \[T^{-1/2} \cdot q_0(T\tau) \longrightarrow \mathcal{B}(\tau), \qquad T \to \infty.\]
          </p>
          <p>
            Het bewijs beschouwt het rooster als een dichte verzameling interagerende
            &ldquo;quasi-deeltjes,&rdquo; elk met een behouden spectrale parameter en een positie die tussen
            botsingen met een expliciete effectieve snelheid beweegt, en laat zien dat de gezamenlijke
            fluctuaties van alle quasi-deeltjes convergeren naar een Gaussisch proces, een zogeheten dressed
            L&eacute;vy&ndash;Chentsovveld.
          </p>
        </div>
      </div>
    </div>
  </div>

</div>

<h3 id="challenges">Challenges</h3>
<div class="timeline">

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">11 september&ndash;15 november 2026</span>
      <span class="timeline-title">Wunder Fund RNN Challenge &middot; Connectome</span>
    </div>
    <div class="timeline-org">Wunder Fund &middot; Virtueel</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Details tonen</span><span class="label-close">&minus; Details verbergen</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            Een sequence-modeling-wedstrijd georganiseerd door Wunder Fund: voorspel toekomstige
            prijsbewegingen op basis van lange reeksen geanonimiseerde limit-orderbookstatussen en trades over
            meerdere instrumenten die gelijktijdig bewegen, zodat het model niet alleen moet leren hoe elk
            orderboek beweegt maar ook hoe informatie zich daartussen verspreidt. Elke reeks is 1000 stappen
            lang, waarbij de eerste 100 als warm-up dienen en wordt gescoord op stappen 100&ndash;998, onder
            een strak CPU-inferentiebudget. Prijzenpot van $13.600.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">17&ndash;21 augustus 2026</span>
      <span class="timeline-title">Akuna Capital Quant Trading Challenge</span>
    </div>
    <div class="timeline-org">Akuna Capital &middot; Virtueel</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Details tonen</span><span class="label-close">&minus; Details verbergen</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            Een week lange virtuele market-makingwedstrijd: deelnemers schrijven een tradingbot in Python die
            het opneemt tegen Akuna's eigen modellen en andere deelnemers op een gesimuleerde beurs. Het is een
            praktische test van hetzelfde market-makingprobleem waar ik professioneel aan werk &mdash; quoten,
            inventory beheren en reageren op orderflow &mdash; maar dan binnen een vast, competitief reglement
            in plaats van productieomstandigheden.
          </p>
        </div>
      </div>
    </div>
  </div>

</div>

<p><a href="{{ '/nl/' | relative_url }}">&larr; Terug naar Over mij</a></p>
