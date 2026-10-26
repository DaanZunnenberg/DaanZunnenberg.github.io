---
layout: default
title: Sieve-M Estimation for Conditional Heteroskedasticity
permalink: /nl/blogposts/sieve-estimation-of-volatility/
---

<section class="hero">
  <img class="hero-img" src="{{ '/images/volatility/quant_finance.jpg' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Blogpost &middot; Volatility Modelling</div>
    <h1 class="hero-name">Sieve-M Estimation for Conditional Heteroskedasticity</h1>
    <p class="hero-lede">Een GARCH-model zijn eigen news-impactcurve laten leren, en erachter komen waarom het op echte data toch verliest van APARCH.</p>
  </div>
</section>

<div class="article-body">

<h2 id="the-problem-with-fixing-the-shape-in-advance">Het probleem met de vorm vooraf vastleggen</h2>

<p>
Elk GARCH-model maakt een keuze voordat het ook maar één return heeft gezien: de vorm van de functie die de schok van gisteren afbeeldt op de variantie van vandaag. Het gewone GARCH(1,1)-model schrijft die vorm als een symmetrische kwadratische functie,
</p>

<p>
\[
\sigma^2(t) = \omega + \beta\varepsilon_{t-1}^2 + \alpha\sigma^2(t-1),
\]
</p>

<p>
voor een returnproces \(x_t=\mu+\varepsilon_t\) met \(\varepsilon_t\sim\sigma(t)\vartheta(\nu)\), de gecentreerde student-\(t\)-dichtheid met \(\nu>2\) vrijheidsgraden. Door \(\varepsilon_{t-1}\) te kwadrateren bewegen een grote positieve schok en een even grote negatieve schok de volatiliteit met precies hetzelfde bedrag. Financiële returns gedragen zich niet zo. Volatiliteit reageert doorgaans heftiger op slecht nieuws dan op goed nieuws, wat statistisch naar voren komt als een niet-nul scheefheid in de returnverdeling. Fit een symmetrisch model op een asymmetrisch proces en je krijgt een model dat per definitie verkeerd gespecificeerd is, hoe goed je de parameters ook schat.
</p>

<p>
De gangbare oplossing is om de asymmetrie met de hand in het model te bouwen. Met \(\phi_\lambda(\varepsilon_t) \coloneqq \lambda \mathbb{1}\{\varepsilon_t \leqslant 0\}\varepsilon_t\) is een voor de hand liggende correctie
</p>

<p>
\[
\sigma^2(t,\phi_\lambda) = \omega + \beta(\varepsilon_{t-1}-\phi_\lambda(\varepsilon_{t-1}))^2 + \alpha\sigma^2(t-1,\phi_\lambda),
\]
</p>

<p>
wat verder generaliseert naar het asymmetric power ARCH (APARCH) model,
</p>

<p>
\[
\sigma^\delta(t,\phi_\lambda) = \omega + \beta(|\varepsilon_{t-1}|-\phi_\lambda(\varepsilon_{t-1}))^\delta + \alpha\sigma^\delta(t-1,\phi_\lambda).
\]
</p>

<p>
Dit werkt, maar alleen in de mate dat de werkelijke news-impactcurve daadwerkelijk op deze specifieke parametrische familie lijkt. \(\lambda\) levert je één extra vrijheidsgraad op: een asymmetrische kanteling. Als de echte vorm ingewikkelder is dan een gekantelde machtscurve, is APARCH nog steeds verkeerd gespecificeerd, alleen minder zichtbaar.
</p>

<h2 id="letting-the-shape-be-unknown">De vorm onbekend laten</h2>

<p>
Het alternatief dat we bestuderen is te stoppen met het gokken van de functionele vorm. In plaats van je vast te leggen op een parametrische asymmetrieterm, schrijven we de updatevergelijking als
</p>

<p>
\[
\sigma^2(t,f_0) = \omega + \beta\varepsilon_{t-1}^2 + \alpha\sigma^2(t-1,f_0) + f_0(x_{t-1}),
\]
</p>

<p>
waarbij alleen wordt aangenomen dat \(f_0\) een continue functie is op een compact interval \([a,b]\), geen vaste formule. Dit is een semi-nonparametrisch model: een deel ervan (\(\omega,\beta,\alpha\)) is een kleine, eindige parametervector, en een deel (\(f_0\)) is een oneindigdimensionaal object dat uit de data zelf geschat moet worden.

Je kunt niet rechtstreeks optimaliseren over de ruimte van alle continue functies op een computer, dus de praktische truc is sieve-estimatie. In plaats van heel \(C^r[a,b]\) te doorzoeken, doorzoek je een stijgende rij eindigdimensionale benaderende ruimtes \(\Theta_1 \subseteq \Theta_2 \subseteq \Theta_3 \subseteq \cdots\), sieves genoemd, die in de limiet steeds dichter worden. Concreet benaderen we \(f_0\) met getransformeerde polynomen van orde \(k\),
</p>

<p>
\[
\Omega_{k,\bm{a}}([a,b]) \coloneqq \left\{ \xi_{k,\eta}(\varepsilon;\bm{a}) \coloneqq a_0 + a_1\varepsilon + \sum_{j=2}^{k} a_j \varepsilon^j \phi_\eta(\varepsilon),\ \eta\in B\subsetneq(-\infty,0),\ a_i\in[-M_k,M_k] \right\},
\]
</p>

<p>
waarbij \(\phi_\eta(\varepsilon) = \exp(\eta\varepsilon^2)\) de hogere-ordetermen weer in een begrensd bereik duwt zodat het polynoom niet ontspoort buiten de data, en \(M_k\to\infty\) naarmate de sieve groeit. Volgens de approximatiestelling van Weierstrass is deze klasse dicht in \(C^r[a,b]\) als \(k\to\infty\), dus in de limiet kan het elke continue news-impactcurve representeren, niet alleen kwadratische of gekantelde kwadratische vormen. De parameters, inclusief de getransformeerde polynoomcoëfficiënten, worden geschat door de (ontbonden) likelihood van het student-\(t\)-model te maximaliseren onder het sequential least squares programming-algoritme, onder de gebruikelijke stationariteits- en positiviteitsbeperkingen.
</p>

<p>
De catch is precies degene die je zou verwachten: meer flexibiliteit is niet gratis. Een hogere orde \(k\) past altijd minstens zo goed op de in-sample likelihood als een lagere, dus zonder correctie zou de procedure gewoon ruis overfitten. We kiezen \(k\) daarom via het Akaike- en Bayesiaans informatiecriterium, die allebei een straf geven voor coëfficiënten die hun plek in de likelihood niet waard zijn.
</p>

<h2 id="two-simulations-two-very-different-verdicts">Twee simulaties, twee heel verschillende uitkomsten</h2>

<p>
Om te zien wat dit in de praktijk oplevert, simuleerden we returns vanuit twee bekende news-impactcurves en keken we of het getransformeerde-polynoommodel ze beter kon terugvinden dan de gewone \(t\)-GARCH(1,1)- en \(t\)-APARCH(1,1,1)-benchmarks.
</p>

<p>
De eerste curve is bewust scherp en asymmetrisch,
</p>

<p>
\[
\sigma^2(t) = b_0 + b_1\varepsilon_{t-1}\mathbb{1}\{\varepsilon_{t-1}\leqslant 0\} + b_2\varepsilon_{t-1}\mathbb{1}\{\varepsilon_{t-1}>0\} + b_3\sigma^2(t-1),
\]
</p>

<p>
een geknikte, niet-differentieerbare functie bij \(\varepsilon_{t-1}=0\). Hier ligt de basisvariantie hoog (\(b_0=0.9\)), trekt een negatieve schok de variantie scherp naar beneden (\(b_1=-0.8\)), stuwt een even grote positieve schok de variantie ongeveer half zo hard omhoog (\(b_2=0.4\)), en speelt de vertraagde variantie helemaal geen rol (\(b_3=0\)), zodat de hele curve puur wordt gedreven door het teken en de grootte van de laatste schok. De tweede curve is gladder maar aanzienlijk gekronkelder,
</p>

<p>
\[
\sigma^2(t) = b_0 + b_1\varepsilon_{t-1}^2 + b_2\sigma^2(t-1) + b_3\|\sin\varepsilon_{t-1}\|,
\]
</p>

<p>
die een sinusoïde in de variantievergelijking vouwt. We kiezen een bescheiden basisniveau en gewicht voor de gekwadrateerde schok (\(b_0=0.5\), \(b_1=0.2\)), geven vertraagde variantie hetzelfde gewicht (\(b_2=0.2\)), en laten de sinusterm alles overheersen (\(b_3=1.5\)), zodat de oscillatie de curve hoofdzakelijk bepaalt in plaats van een kleine rimpeling op een verder gewone GARCH-vorm. Geen van beide curves kan \(t\)-GARCH of \(t\)-APARCH per constructie exact representeren.
</p>

<div class="article-figure">
  <img src="{{ '/images/volatility/volatility-smile.png' | relative_url }}?v={{ site.time | date: '%s' }}" alt="Volatility smile from the simulated updating mechanisms: asymmetric process on the left, sinusoidal process on the right, comparing APARCH, GARCH, and the estimated transformed polynomial model against the true simulated curve">
  <figcaption>Volatility smile voor de hierboven gedefinieerde gesimuleerde updatemechanismen: het asymmetrische proces links, het sinusoïdale proces rechts. De blauwe lijn is de werkelijke gesimuleerde curve; de gestreepte, gestippelde en doorgetrokken zwarte lijnen zijn de gefitte APARCH-, GARCH- en getransformeerde-polynoommodellen, met de orde die de laagste AIC behaalde.</figcaption>
</div>

<p>
Op het asymmetrische proces is het beeld gemengd. Het getransformeerde-polynoommodel behaalt een hogere likelihood dan beide benchmarks, en volgt de knik zichtbaar beter in het gebied waar 90% van de datamassa zit. Maar AIC en BIC geven allebei toch de voorkeur aan de eenvoudigere \(t\)-GARCH- en \(t\)-APARCH-modellen: de extra coëfficiënten die nodig zijn om een scherpe, niet-gladde knik te volgen zijn duur, en de strafterm weegt op tegen de likelihoodwinst. Een scherpe, eenvoudige asymmetrie is precies het geval waarvoor het parametrische APARCH-model gebouwd is, en het flexibele model verdient niet terug wat het kost om die te fitten.
</p>

<p>
Op het sinusoïdale proces draait het resultaat volledig om. Elk criterium, likelihood, AIC en BIC, geeft de voorkeur aan het semi-nonparametrische model, en met een ruime marge. De intuïtie zit in de vorm zelf: een sinusoïde heeft een oneindige Taylorontwikkeling,
</p>

<p>
\[
h(\varepsilon_t,\sigma^2(t)) = \omega + \beta\varepsilon_t + \alpha\sigma^2(t-1) + \left| \sum_{n=0}^{\infty} \frac{(-1)^n}{\Gamma(2n)}\varepsilon_{t-1}^{2n+1} \right|,
\]
</p>

<p>
een oneindige som van monomiale termen waarvoor een vastvormig model als APARCH gewoonweg geen parameters heeft. Elke extra orde \(k\) in het getransformeerde polynoom levert hier echte informatie op, dus de likelihood verbetert sneller dan AIC en BIC het bestraffen. De les uit beide simulaties samen: flexibiliteit betaalt zichzelf alleen terug als de waarheid ingewikkeld genoeg is om die nodig te hebben. Is de echte news-impactcurve eenvoudig, of scherp geknikt maar verder eenvoudig, dan is extra complexiteit dood gewicht.
</p>

<h2 id="checking-the-distributional-assumption-before-trusting-any-of-this">De verdelingsaanname controleren voordat je dit allemaal vertrouwt</h2>

<p>
Al het bovenstaande steunt erop dat de student-\(t\)-verdeling een redelijk model is voor de innovaties \(\varepsilon_t\). Voordat we deze modellen op echte data toepassen, hebben we dit rechtstreeks gecontroleerd met een quantile-quantile-vergelijking tegen de S&amp;P 500-returnreeks.
</p>

<div class="article-figure">
  <img src="{{ '/images/volatility/qq-plot.png' | relative_url }}?v={{ site.time | date: '%s' }}" alt="Empirical-theoretic quantile-quantile plots of S&P 500 returns against the student-t distribution at nu equals infinity (Gaussian) and nu equals 5 degrees of freedom">
  <figcaption>Empirisch-theoretische quantile-quantile-relatie van de S&amp;P 500-returnreeks tegen de student-\(t\)-verdeling met \(\nu\in\{\infty,5\}\) vrijheidsgraden. Het Gaussische geval (\(\nu=\infty\), links) wijkt af van de 45-gradenlijn in de staarten; \(\nu=5\) (rechts) volgt die veel beter.</figcaption>
</div>

<p>
Het Gaussische geval, \(\nu=\infty\), wijkt in beide staarten af van de diagonaal: de empirische returns hebben meer extreme waarnemingen dan een normale verdeling voorspelt, het bekende fat-tailsprobleem in financiële returns. Door \(\nu\) te verlagen naar 5 vrijheidsgraden, wat de verdeling veel zwaardere staarten geeft, komen de quantielen weer in lijn. Dit is meer dan een voetnoot over robuustheid: elke likelihoodvergelijking in deze studie, en de AIC/BIC-straftermen daarop gebouwd, zijn alleen betekenisvol als de veronderstelde foutverdeling een redelijke beschrijving van de data is. \(\nu\) eerst goed krijgen is een voorwaarde voor alles wat volgt, geen bijzaak.
</p>

<h2 id="what-happens-on-real-data">Wat er op echte data gebeurt</h2>

<p>
Vervolgens hebben we alle drie de modellen, \(t\)-GARCH, \(t\)-APARCH, en het sieve-geschatte getransformeerde-polynoommodel, toegepast op S&amp;P 500-returns, met zowel een kort venster (\(n=1000\), 2019&ndash;2023) als een lang venster (\(n\approx10{.}000\), 1983&ndash;2023). Het resultaat sluit aan bij de scherp-asymmetrische simulatie, niet de sinusoïdale: \(t\)-APARCH wint onomstreden op zowel AIC als BIC bij beide steekproefgroottes. De polynoommodellen met hogere orde behalen bij \(n=1000\) wel een hogere ruwe log-likelihood dan APARCH, maar nooit genoeg om de complexiteitsstraf te overwinnen. Bij \(n\approx10{.}000\) komen de geschatte parameters \((\omega,\beta,\alpha,\nu)\), die alle drie modellen delen, opvallend dicht bij elkaar uit, wat zelf al informatief is: het suggereert dat het populatie-volatiliteitsproces van de S&amp;P 500 niet het gewone symmetrische GARCH-model is, maar iets dat dichter ligt bij wat APARCH al vangt met zijn enkele asymmetrieparameter \(\lambda\).
</p>

<p>
Dit kun je op twee manieren lezen. De optimistische lezing is dat de echte news-impactcurve voor een brede aandelenindex in feite dicht genoeg bij de gekantelde-machtsvorm van APARCH ligt dat er weinig overblijft voor een flexibeler model om op te pikken, zodra je de extra parameters betaalt. De voorzichtigere lezing is dat volatiliteitsmodellen van elke soort, inclusief de onze, gevoelig zijn voor structurele breuken: financiële crashes, regimewisselingen en andere eenmalige gebeurtenissen waar een stationair model overheen middelt in plaats van ze te volgen. Een flexibeler model heeft meer parameters die precies door dit soort misspecificatie heen en weer getrokken kunnen worden, wat net zo goed kan verklaren waarom de extra complexiteit hier niet loont, zelfs als het onderliggende proces ingewikkelder is dan APARCH veronderstelt. Om deze twee verklaringen uit elkaar te trekken zou je eerst expliciet op structurele breuken moeten testen, wat we voor toekomstig werk laten staan.
</p>

<h2 id="conclusion">Conclusie</h2>

<p>
Sieve-M-estimatie met getransformeerde polynomen is een wiskundig gedegen manier om te stoppen met het gokken van de vorm van de news-impactcurve en de data die in plaats daarvan te laten bepalen, en de theorie onderbouwt dit: de klasse van getransformeerde polynomen is dicht in de ruimte van continue functies, en de resulterende schatter is consistent onder redelijk milde voorwaarden. Maar gedegen in theorie is niet hetzelfde als winnen in de praktijk. Of de extra flexibiliteit zijn kosten waard is, hangt volledig af van hoe ingewikkeld de echte curve daadwerkelijk is ten opzichte van de beschikbare steekproefomvang. Is de waarheid eenvoudig of scherp asymmetrisch, dan blijft het parametrische \(t\)-APARCH-model heel moeilijk te verslaan, en dat is precies wat we zowel in simulatie als op de S&amp;P 500 vinden. Is de waarheid echt ingewikkeld, zoals in de sinusoïdale simulatie, dan trekt het flexibele model overtuigend uit. De eerlijke conclusie is niet "nonparametrisch verslaat parametrisch" of omgekeerd, maar dat AIC en BIC hier echt werk verrichten: zij zijn het mechanisme dat je, geval per geval, vertelt of de extra complexiteit de moeite waard was.
</p>

</div>

<p><a href="{{ '/nl/blogposts/' | relative_url }}">&larr; Terug naar Blogposts</a></p>
