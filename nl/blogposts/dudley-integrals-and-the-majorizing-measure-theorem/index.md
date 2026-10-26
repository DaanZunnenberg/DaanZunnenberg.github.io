---
layout: default
title: Dudley-integralen en de Majorizing Measure Theorem
permalink: /nl/blogposts/dudley-integrals-and-the-majorizing-measure-theorem/
---

<section class="hero">
  <img class="hero-img" src="{{ '/images/chalk.png' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Talagrand &middot; Gaussische processen</div>
    <h1 class="hero-name">Dudley-integralen en de Majorizing Measure Theorem</h1>
    <p class="hero-lede">Mijn favoriete bewijs: Talagrands tweezijdige grens voor het supremum van een Gaussisch proces, en waarom de eenvoudigere grens met covering numbers die daaraan voorafgaat niet altijd scherp is.</p>
  </div>
</section>

<div class="article-body">

<h2 id="the-dudley-integral">De Dudley-integraal</h2>

<p>
Voordat je naar de machinerie van generic chaining grijpt, is het eerste wat iedereen probeert bij het begrenzen van het supremum van een proces: het indexverzameling op elke schaal overdekken en voor elke overdekking een chaining-kost betalen. Voor een metrische ruimte \((T,d)\) en \(\epsilon>0\) noteren we met \(N(T,d,\epsilon)\) het covering number: het kleinste aantal gesloten \(d\)-bollen met straal \(\epsilon\) dat nodig is om \(T\) te overdekken. Dudley's stelling zegt dat voor een proces \((X_t)_{t\in T}\) dat de sub-Gaussische increment-voorwaarde
</p>

<p>
\[
\forall s,t\in T,\ \forall u>0,\qquad
\mathsf{P}(|X_s-X_t|\ge u) \le 2\exp\!\Big(-\frac{u^2}{2 d(s,t)^2}\Big),
\]
</p>

<p>
voldoet, met \(\mathsf{E}X_t = 0\) voor elke \(t\), we de grens
</p>

<p>
\[
\mathsf{E}\sup_{t\in T} X_t \le L \int_0^\infty \sqrt{\log N(T,d,\epsilon)}\ d\epsilon.
\]
</p>

<p>
hebben. Voor veel metrische ruimten \((T,d)\) is deze grens niet optimaal.
</p>

<h2 id="why-covering-numbers-are-not-always-enough">Waarom covering numbers niet altijd genoeg zijn</h2>

<p>
De Dudley-grens hangt van \(T\) alleen af via de ene functie \(\epsilon\mapsto N(T,d,\epsilon)\), een enkele reëelwaardige samenvatting van hoe \(T\) op elke schaal overdekt wordt. En dat is precies de bron van de speling: covering numbers beschrijven hoeveel bollen van een gegeven straal je in het slechtste geval nodig hebt, uniform over \(T\), maar ze zeggen niets over waar die bollen nodig zijn. Een verzameling kan op een bepaalde schaal in één regio echt groot zijn en op diezelfde schaal elders vrijwel leeg, en het covering number rapporteert dan toch het grote aantal, ook al voelt het grootste deel van \(T\) die complexiteit helemaal niet.
</p>

<p>
Het klassieke voorbeeld is Talagrands constructie van een ellipsoïde-achtige verzameling, of eenvoudiger een aftelbare verzameling \(T=\{t_0,t_1,t_2,\dots\}\) met \(d(t_0,t_n)\) gelijkwaardig op constanten na aan \(1/\sqrt{\log n}\) voor \(n\ge 2\), samen met \(t_1\) ver van de rest. Hier dwingen de covering numbers de Dudley-integraal tot logaritmische divergentie, voorbij wat \(\mathsf{E}\sup_t X_t\) werkelijk is, omdat op elke schaal het benodigde aantal bollen gedomineerd wordt door een kleine cluster punten dicht bij \(t_0\), terwijl bijna elk punt van \(T\) ver van die cluster ligt en nauwelijks bijdraagt aan het supremum. Het covering number ziet alleen de omvang van de slechtste regio op elke schaal; het kan niet zien dat die slechtste regio klein en geïsoleerd is, en ook niet dat het grootste deel van \(T\) juist tam is. Elke grens die louter op covering numbers gebouwd is, erft deze blindheid, en geen keuze van netten in een argument op één schaal kan dat herstellen, want het gebrek zit niet in het chaining-argument zelf maar in de ene-getal-per-schaal samenvatting van \(T\) waarmee dat argument gevoed wordt.
</p>

<p>
Wat nodig is, is in plaats daarvan een samenvatting van \(T\) die over de ruimte zelf kan variëren: een manier om te zeggen dat sommige punten van \(T\) op elke schaal door veel complexiteit omringd zijn, en andere niet, in plaats van op elke schaal alleen het ene slechtste geval te rapporteren. Dat is precies wat een majorizing measure levert, en dat is wat de resulterende grens, in tegenstelling tot die van Dudley, in beide richtingen scherp maakt.
</p>

<h2 id="introduction">Inleiding</h2>

<p>
We reproduceren, Talagrands notatie en argumenten volgend, het bewijs van de ondergrens
</p>

<p>
\[
\gamma_2(T,d) \le L\, \mathsf{E}\sup_{t\in T} X_t
\]
</p>

<p>
in de Majorizing Measure Theorem voor Gaussische processen. We introduceren eerst toelaatbare rijen van partities en de functionaal \(\gamma_\alpha\), ontwikkelen vervolgens de theorie van functionalen die een groeivoorwaarde vervullen en de partitioneringsstelling die daaruit volgt, en combineren dit ten slotte met Sudakovs lemma en Borells ongelijkheid om de ondergrens te verkrijgen.
</p>

<h2>Toelaatbare rijen, functionalen en de groeivoorwaarde</h2>

<p>
Door de hele tekst heen is \((T,d)\) een metrische ruimte. Voor een geheel getal \(n\ge 0\) stellen we
</p>

<p>
\[
N_0 = 1 , \qquad N_n = 2^{2^n} \ (n\ge 1).
\]
</p>

<div class="math-env">
  <p><span class="math-env-label">Definitie (Toelaatbare rij).</span>
  Gegeven een verzameling \(T\) is een toelaatbare rij een stijgende rij \((A_n)\) van partities van \(T\) zodat \(\operatorname{card} A_n \le N_n\), dus \(\operatorname{card} A_0 = 1\) en \(\operatorname{card} A_n \le 2^{2^n}\) voor \(n\ge 1\).
  </p>
</div>

<p>
Met een stijgende rij van partities bedoelen we dat elke verzameling van \(A_{n+1}\) bevat is in een verzameling van \(A_n\). Door de hele tekst heen noteren we met \(A_n(t)\) het unieke element van \(A_n\) dat \(t\) bevat. De dubbele exponent in de definitie van \(N_n\) komt gewoon voor omdat voor onze doeleinden de juiste maat voor de grootte van een partitie \(A\) gelijk is aan \(\log\operatorname{card} A\). Deze dubbele exponent zorgt ervoor dat de omvang van de partitie \(A_n\) bij elke stap verdubbelt.
</p>

<div class="math-env">
  <p><span class="math-env-label">Stelling (De generic chaining-grens).</span>
  Onder de increment-voorwaarde
  </p>
\[
\forall s,t\in T,\ \forall u>0,\qquad
\mathsf{P}(|X_s-X_t|\ge u) \le 2\exp\!\Big(-\frac{u^2}{2 d(s,t)^2}\Big)
\]
  <p>
  en als \(\mathsf{E}X_t=0\) voor elke \(t\), dan hebben we voor elke toelaatbare rij \((A_n)\)
  </p>
\[
\mathsf{E}\sup_{t\in T} X_t \le L \sup_{t\in T} \sum_{n\ge 0} 2^{n/2}
\mathit{\Delta}(A_n(t)) .
\]
</div>

<p>
Hierbij staat, zoals steeds, \(\mathit{\Delta}(A_n(t))\) voor de diameter van \(A_n(t)\) voor \(d\).
</p>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  We mogen aannemen dat \(T\) eindig is. We construeren een deelverzameling \(T_n\) van \(T\) door uit elke verzameling \(A\) van \(A_n\) precies één punt te nemen. Dan hebben we voor \(t\in T\) en \(n\ge 0\) dat \(d(t,T_n)\le \mathit{\Delta}(A_n(t))\), en het resultaat volgt uit de grens \(\mathsf{E}\sup_{t\in T} X_t \le L\sup_{t\in T}\sum_{n\ge 0} 2^{n/2} d(t,T_n)\), geldig voor elke keuze van verzamelingen \(T_n\) met \(\operatorname{card} T_n\le N_n\).
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Definitie.</span>
  Gegeven \(\alpha>0\), en een metrische ruimte \((T,d)\) die niet eindig hoeft te zijn, definiëren we
  </p>
\[
\gamma_\alpha(T,d) = \inf \sup_{t\in T} \sum_{n\ge 0} 2^{n/\alpha}
\mathit{\Delta}(A_n(t)) ,
\]
  <p>
  waarbij het infimum genomen wordt over alle toelaatbare rijen.
  </p>
</div>

<p>
Het is nuttig om op te merken dat, omdat \(A_0(t)=T\), we \(\gamma_\alpha(T,d)\ge \mathit{\Delta}(T)\) hebben. Combinatie van de generic chaining-grens met deze definitie levert het volgende gevolg op.
</p>

<div class="math-env">
  <p><span class="math-env-label">Stelling.</span>
  Onder de increment-voorwaarde hierboven en \(\mathsf{E}X_t=0\) hebben we
  </p>
\[
\mathsf{E}\sup_{t\in T} X_t \le L\gamma_2(T,d).
\]
</div>

<p>
Dit is de bovengrens. Om deze grens interessant te maken, moeten we natuurlijk \(\gamma_2(T,d)\) kunnen beheersen, en dus moeten we leren hoe we toelaatbare rijen construeren.
</p>

<p>
Voor een Gaussisch proces \((X_t)_{t\in T}\), dat wil zeggen een gezamenlijk Gaussische familie van gecentreerde stochasten geïndexeerd door \(T\), voorzien we \(T\) van de canonieke afstand
</p>

<p>
\[
d(s,t) = \big(\mathsf{E}(X_s-X_t)^2\big)^{1/2}.
\]
</p>

<div class="math-env">
  <p><span class="math-env-label">Stelling (De Fernique&ndash;Talagrand-stelling).</span>
  Voor een universele constante \(L\) hebben we
  </p>
\[
\frac{1}{L}\gamma_2(T,d) \le \mathsf{E}\sup_{t\in T} X_t \le L\gamma_2(T,d).
\]
</div>

<p>
De rechterkant van deze ongelijkheid volgt uit de generic chaining-grens hierboven, toegepast op de increment-voorwaarde die Gaussische processen vervullen. Het doel van deze tekst is om de linkerkant van de ongelijkheid te bewijzen, de ondergrens
</p>

<p>
\[
\gamma_2(T,d) \le L\, \mathsf{E}\sup_{t\in T} X_t .
\]
</p>

<p>
We kunnen dit samenvatten door te zeggen dat chaining voldoende is om de omvang van een Gaussisch proces te verklaren. Daarmee bedoelen we simpelweg dat, zoals de linkerkant van de ongelijkheid hierboven laat zien, de natuurlijke chaining-grens voor de omvang van een Gaussisch proces, zoals de rechterkant laat zien, van de juiste orde is, mits men natuurlijk de best mogelijke chaining gebruikt. Dit is precies de zin waarin \(\gamma_2\) slaagt waar de Dudley-integraal dat niet doet: het vervangt de ene covering-number-samenvatting van \(T\) door een object, de toelaatbare rij van partities, dat zich kan aanpassen aan waar de complexiteit van \(T\) daadwerkelijk zit.
</p>

<p>
Om de ondergrens te bewijzen, valt men \(\gamma_2(T,d)\) niet rechtstreeks aan. In plaats daarvan ontwikkelt men een abstracte machinerie, de theorie van functionalen die een groeivoorwaarde vervullen, die een toelaatbare rij van partities oplevert die getuigt dat \(\gamma_2(T,d)\) beheerst wordt door elke functionaal die \(\mathsf{E}\sup X_t\) domineert en die aan deze groeivoorwaarde voldoet.
</p>

<div class="math-env">
  <p><span class="math-env-label">Definitie (Functionaal).</span>
  We zeggen dat een afbeelding \(F\) een functionaal is op een verzameling \(T\) als deze aan elke deelverzameling \(H\) van \(T\) een getal \(F(H)\ge 0\) toekent, en als deze stijgend is, dat wil zeggen
  </p>
\[
H \subset H' \subset T \ \Rightarrow\ F(H) \le F(H').
\]
</div>

<p>
Intuïtief is een functionaal een maat voor de grootte van de deelverzamelingen van \(T\). Het stelt ons in staat te bepalen welke deelverzamelingen van \(T\) voor onze doeleinden groot zijn. Geschikte partities van \(T\) worden vervolgens geconstrueerd via een uitputtingsprocedure die eerst de grote deelverzamelingen van \(T\) selecteert. Een eerste fundamenteel voorbeeld van een functionaal is \(F(H) = \gamma_2(H,d)\). Een tweede, even belangrijke, is de grootheid \(F(H) = \mathsf{E}\sup_{t\in H} X_t\) waarbij \((X_t)_{t\in T}\) een proces geïndexeerd door \(T\) is.
</p>

<p>
We hebben nu het begrip goed gescheiden kleine stukken nodig.
</p>

<div class="math-env">
  <p><span class="math-env-label">Definitie.</span>
  Gegeven \(a>0\) en een geheel getal \(r\ge 4\) zeggen we dat deelverzamelingen \(H_1,\dots,H_m\) van \(T\) \((a,r)\)-gescheiden zijn als
  </p>
\[
\forall \ell\le m,\ H_\ell \subset B(t_\ell, a/r),
\]
  <p>
  waarbij de punten \(t_1,t_2,\dots,t_m\) in \(T\) voldoen aan
  </p>
\[
\forall \ell \le m,\ t_\ell \in B(s,ar);\qquad
\forall \ell,\ell'\le m,\ \ell\ne \ell' \Rightarrow d(t_\ell,t_{\ell'}) \ge a
\]
  <p>
  voor een bepaald punt \(s\in T\).
  </p>
</div>

<p>
Beschouw een metrische ruimte \((T,d)\) die niet eindig hoeft te zijn, en een dalende rij \((F_n)_{n\ge 0}\) van functionalen op \(T\), dat wil zeggen
</p>

<p>
\[
\forall H\subset T,\qquad F_{n+1}(H) \le F_n(H).
\]
</p>

<div class="math-env">
  <p><span class="math-env-label">Definitie (De groeivoorwaarde).</span>
  We zeggen dat de functionalen \(F_n\) de groeivoorwaarde met parameters \(r\ge 4\) en \(c^*>0\) vervullen als voor elk geheel getal \(n\ge 0\) en elke \(a>0\) het volgende geldt, waarbij \(m=N_{n+1}\). Voor elke verzameling deelverzamelingen \(H_1,\dots,H_m\) van \(T\) die \((a,r)\)-gescheiden zijn, hebben we
  </p>
\[
F_n\Big(\bigcup_{\ell\le m} H_\ell\Big) \ge c^* a 2^{n/2} + \min_{\ell\le m}
F_{n+1}(H_\ell).
\]
</div>

<p>
We merken op dat de functionaal \(F_n\) links in de ongelijkheid hierboven staat, terwijl de kleinere functionaal \(F_{n+1}\) rechts staat, wat ons wat extra ruimte geeft om deze voorwaarde te controleren.
</p>

<p>
Het volgende resultaat legt uit dat dalende rijen van functionalen die de groeivoorwaarde vervullen, besloten liggen in de definitie van \(\gamma_2(T,d)\). Het is de omgekeerde richting van de stelling die we daadwerkelijk nodig hebben, maar wordt opgenomen omdat het de betekenis van de groeivoorwaarde verduidelijkt.
</p>

<div class="math-env">
  <p><span class="math-env-label">Stelling.</span>
  Voor elke metrische ruimte \((T,d)\) bestaat er een dalende rij van functionalen \((F_n)_{n\ge 0}\) met \(F_0(T)=\gamma_2(T,d)\) die de groeivoorwaarde hierboven vervult voor \(r=4\) en \(c^*=1/2\).
  </p>
</div>

<p>
Het resultaat dat we daadwerkelijk nodig hebben, is de omgekeerde richting. Het zegt dat \(F(H)=\gamma_2(H,d)\) in zekere zin de kleinste functionaal is die de groeivoorwaarde vervult.
</p>

<div class="math-env">
  <p><span class="math-env-label">Stelling (Talagrands partitioneringsstelling).</span>
  Laat \((T,d)\) een metrische ruimte zijn. Neem aan dat er een dalende rij van functionalen \((F_n)_{n\ge 0}\) bestaat die de groeivoorwaarde hierboven vervult. Dan
  </p>
\[
\gamma_2(T,d) \le \frac{Lr}{c^*} F_0(T) + Lr\mathit{\Delta}(T).
\]
</div>

<p>
Deze stelling en haar generalisaties vormen de ruggengraat van de theorie. De essentie is dat ze, door ze daadwerkelijk te construeren, een rij partities oplevert die van deze ongelijkheid getuigt.
</p>

<h2>Bewijs van de ondergrens</h2>

<p>
We bewijzen Talagrands partitioneringsstelling in de volgende vorm, die in essentie gelijkwaardig is op een indexverschuiving na, en passen deze vervolgens toe op Gaussische processen.
</p>

<div class="math-env">
  <p><span class="math-env-label">Stelling.</span>
  Neem aan dat er op de metrische ruimte \((T,d)\) een dalende rij van functionalen \((F_n)_{n\ge 0}\) bestaat die de groeivoorwaarde vervult. Dan kunnen we een stijgende rij partities \((A_n)\) vinden met \(\operatorname{card} A_n \le N_{n+1}\) en
  </p>
\[
\sup_{t\in T} \sum_{n\ge 0} 2^{n/2}\mathit{\Delta}(A_n(t)) \le \frac{Lr}{c^*} F_0(T) +
Lr\mathit{\Delta}(T).
\]
</div>

<p>
Dit is niet precies de stelling hierboven, want hier hebben we \(\operatorname{card} A_n \le N_{n+1}\) in plaats van \(\operatorname{card} A_n \le N_n\), maar de eerdere vorm volgt door dit te combineren met het volgende elementaire herindexeringslemma.
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  Beschouw \(\alpha>0\), een geheel getal \(\tau\ge 0\) en een stijgende rij partities \((B_n)_{n\ge 0}\) met \(\operatorname{card} B_n \le N_{n+\tau}\). Zij
  </p>
\[
S := \sup_{t\in T} \sum_{n\ge 0} 2^{n/\alpha}\mathit{\Delta}(B_n(t)).
\]
  <p>
  Dan kunnen we een toelaatbare rij \((A_n)_{n\ge 0}\) vinden zodat
  </p>
\[
\sup_{t\in T} \sum_{n\ge 0} 2^{n/\alpha}\mathit{\Delta}(A_n(t)) \le 2^{\tau/\alpha}
\big(S + K(\alpha)\mathit{\Delta}(T)\big).
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  We stellen \(A_n=\{T\}\) als \(n<\tau\) en \(A_n=B_{n-\tau}\) als \(n\ge \tau\), zodat \(\operatorname{card} A_n \le N_n\) en
  </p>
\[
\sum_{n\ge \tau} 2^{n/\alpha}\mathit{\Delta}(A_n(t)) = 2^{\tau/\alpha}
\sum_{n\ge 0} 2^{n/\alpha}\mathit{\Delta}(B_n(t)).
\]
  <p>
  Met de grens \(\mathit{\Delta}(A_n(t))\le\mathit{\Delta}(T)\) verkrijgen we
  </p>
\[
\sum_{n<\tau} 2^{n/\alpha}\mathit{\Delta}(A_n(t)) \le K(\alpha) 2^{\tau/\alpha}
\mathit{\Delta}(T).
\]
</div>

<p>
Door \(F_n\) te vervangen door \(F_n/c^*\) volstaat het om het geval \(c^*=1\) te beschouwen, dus nemen we deze voorwaarde aan voor de rest van het bewijs.
</p>

<p>
We construeren de stijgende rij \((A_n)\) van partities inductief, uiteraard beginnend met \(A_0=\{T\}\). Samen met \(C\in A_n\) construeren we een punt \(t_{n,C}\) van \(T\), en een geheel getal \(j_n(C)\) in \(\mathbb Z\). We nemen aan
</p>

<p>
\[
C \subset B(t_{n,C}, r^{-j_n(C)}),
\]
</p>

<p>
zodat in het bijzonder \(\mathit{\Delta}(C) \le 2r^{-j_n(C)}\). We kunnen \(j_n(C)\) dus zien als een manier om de diameter van \(C\) bij te houden, meer precies als een geschikte bovengrens daarvoor. We eisen niet dat \(t_{n,C}\) tot \(C\) behoort.
</p>

<p>
Om de constructie te starten, stellen we \(A_0=\{T\}\), en kiezen we een willekeurig punt \(t_{0,T}\in T\). We nemen dan voor \(j_0(T)\) het grootst mogelijke gehele getal zodat \(T\subset B(t_{0,T}, r^{-j_0(T)})\), zodat \(r^{-j_0(T)} \le r\mathit{\Delta}(T)\).
</p>

<p>
Neem nu aan dat we voor een bepaalde \(n\ge 0\) al de partitie \(A_n\) geconstrueerd hebben met \(\operatorname{card} A_n\le N_{n+1}\). Om \(A_{n+1}\) te construeren, splitsen we elke verzameling van \(A_n\) op in ten hoogste \(N_{n+1}\) stukken volgens het decompositielemma hieronder. Omdat \(N_{n+1}^2 \le N_{n+2}\) zal \(\operatorname{card} A_{n+1} \le N_{n+2}\) gelden, en op deze manier construeren we de bijbehorende stijgende rij partities \(A_n\). De hele moeilijkheid van het argument zit in de procedure waarmee we een gegeven element van \(A_n\) in stukken splitsen, en in de informatie die we daarbij verzamelen.
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  Beschouw een deelverzameling \(C\) van \(T\), een geheel getal \(n\ge 0\) en \(j\in\mathbb Z\). Zij \(m=N_{n+1}\). Neem aan dat we voor een bepaalde \(t_C\in T\) hebben \(C\subset B(t_C,r^{-j})\). Dan kunnen we \(m'\le m\) en een partitie \((A_\ell)_{\ell \le m'}\) vinden zodat voor elke \(\ell\le m'\) geldt dat ofwel
  </p>
\[
\exists t_\ell \in C,\quad A_\ell \subset B(t_\ell, r^{-j-1}),
\]
  <p>
  ofwel
  </p>
\[
r^{-j-1}2^{n/2-1} + \sup_{t\in A_\ell} F_{n+1}(A_\ell \cap B(t,r^{-j-2}))
\le F_n(C).
\]
</div>

<p>
We splitsen \(C\) dus in twee soorten stukken. Die waarvoor \(A_\ell\subset B(t_\ell,r^{-j-1})\) geldt voor een zekere \(t_\ell\in C\), hebben een kleinere diameter dan \(C\) zelf. Voor die waarvoor \(r^{-j-1}2^{n/2-1} + \sup_{t\in A_\ell} F_{n+1}(A_\ell\cap B(t,r^{-j-2})) \le F_n(C)\) geldt, winnen we controle over het gedrag van de functionalen \(F_n\). Twee opmerkelijke kenmerken van deze constructie zijn dat ze algoritmisch is, verkregen door een eenvoudige basisstap te herhalen tot \(C\) opgebruikt is, en greedy, in de zin dat de basisstap een eenvoudige winstmaat maximaliseert.
</p>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  We laten zien dat voor \(\ell<m'\) de verzameling \(A_\ell\) voldoet aan \(A_\ell\subset B(t_\ell,r^{-j-1})\) voor een zekere \(t_\ell\in C\), en dat als \(\ell=m'=m\) de verzameling \(A_{m}\) voldoet aan \(r^{-j-1}2^{n/2-1}+\sup_{t\in A_m}F_{n+1}(A_m\cap B(t,r^{-j-2}))\le F_n(C)\). Om niet door bijzaken afgeleid te worden, nemen we eerst aan dat \(T\) eindig is. Via inductie over \(1\le \ell\le m=N_{n+1}\) construeren we punten \(t_\ell\in C\) en verzamelingen \(A_\ell\subset C\) als volgt.
  </p>
  <p>
  Eerst stellen we \(D_0=C\), en kiezen we \(t_1\) in \(C\) zodat
  </p>
\[
F_{n+1}(C\cap B(t_1,r^{-j-2})) = \sup_{t\in C} F_{n+1}(C\cap B(t,r^{-j-2})).
\]
  <p>
  We stellen dan \(A_1 = C\cap B(t_1,r^{-j-1})\). Het idee is eenvoudig: we nemen het grootst mogelijke stuk van \(C\), en in die zin is de methode greedy. De lezer merkt op dat de straal van de bollen in de weergave hierboven die \(t_1\) definieert \(r^{-j-2}\) is, terwijl die \(r^{-j-1}\) is in de definitie van \(A_1\). Dit is het hoofdidee van het bewijs. Een groot stuk van \(C\) is een stuk van het type \(A_1=C\cap B(t_1,r^{-j-1})\) waarvoor \(F_{n+1}(C\cap B(t_1,r^{-j-2}))\), in plaats van \(F_{n+1}(A_1)\), groot is. Deze constructie is uitstekend geschikt om de groeivoorwaarde te gebruiken, omdat ze op natuurlijke wijze goed gescheiden grote stukken creëert, waarvan \(C\cap B(t_1,r^{-j-2})\) het eerste is. Het nadeel van de constructie is dat de informatie die we produceren een niveau overslaat, omdat ze betrekking heeft op kleinere bollen dan we zouden willen, met straal \(r^{-j-2}\) in plaats van \(r^{-j-1}\), en het cruciale punt van het bewijs zal zijn te laten zien dat we op een bepaald moment de informatie over het overgeslagen niveau kunnen terugwinnen.
  </p>
  <p>
  Om de constructie verder te zetten, neem nu aan dat \(t_1,\dots,t_\ell\) en \(A_1,\dots,A_\ell\) al geconstrueerd zijn, en stel \(D_\ell = C \setminus \bigcup_{1\le p\le \ell} A_p\). Als \(D_\ell=\emptyset\), stellen we \(m'=\ell\) en stopt de constructie. Anders kiezen we \(t_{\ell+1}\) in \(D_\ell\) zodat
  </p>
\[
F_{n+1}(D_\ell \cap B(t_{\ell+1},r^{-j-2})) = \sup_{t\in D_\ell}
F_{n+1}(D_\ell\cap B(t,r^{-j-2})).
\]
  <p>
  We stellen \(A_{\ell+1} = D_\ell\cap B(t_{\ell+1},r^{-j-1})\) en gaan zo verder totdat we ofwel stoppen, ofwel \(D_{m-1} = C \setminus \bigcup_{\ell<m} A_\ell\) construeren. Als \(D_{m-1}\) leeg is, is de constructie klaar. Anders stellen we \(A_m = D_{m-1}\), zodat \(A_1,\dots,A_m\) een partitie van \(C\) vormen.
  </p>
  <p>
  Als \(\ell<m'\), is het vanzelfsprekend door constructie dat \(A_\ell\subset B(t_\ell,r^{-j-1})\) voor een zekere \(t_\ell\in C\), zodat het voor het afronden van het bewijs volstaat te laten zien dat \(r^{-j-1}2^{n/2-1}+\sup_{t\in A_m}F_{n+1}(A_m\cap B(t,r^{-j-2}))\le F_n(C)\) geldt voor \(\ell=m\). Het bewijs steunt op de groeivoorwaarde. Het volstaat voor het bewijs dat de groeivoorwaarde geldt wanneer \(a\) van het type \(a=r^{-j'-1}\) is voor een zekere \(j'\in\mathbb Z\). Dan herschrijft de definiërende eigenschap van \((a,r)\)-scheiding zich als
  </p>
\[
\forall \ell\le m,\ t_\ell \in B(s,r^{-j});\qquad \forall \ell,\ell'\le m,\
\ell\ne\ell' \Rightarrow d(t_\ell,t_{\ell'}) \ge r^{-j-1},
\]
  <p>
  en de inhoud van de groeivoorwaarde is dat dit, omdat \(c^*=1\), impliceert dat
  </p>
\[
\forall \ell\le m,\ H_\ell \subset B(t_\ell, r^{-j-2}) \ \Rightarrow\
F_n\Big(\bigcup_{\ell\le m} H_\ell\Big) \ge r^{-j-1}2^{n/2} + \min_{\ell\le
m} F_{n+1}(H_\ell).
\]
  <p>
  Laten we een punt \(t_m\in A_m=D_{m-1}\) construeren zoals in de constructie van \(t_{\ell+1}\) hierboven, voor \(\ell=m-1\). Alle punten \((t_\ell)_{\ell\le m}\) behoren tot \(C\subset B(t_C,r^{-j})\). Voor \(\ell<m\) hebben we door constructie
  </p>
\[
t_{\ell+1} \in D_\ell = C\setminus \bigcup_{1\le p\le \ell} A_p = C
\setminus \bigcup_{1\le p\le\ell} B(t_p,r^{-j-1}),
\]
  <p>
  en dus \(d(t_{\ell+1},t_p)\ge r^{-j-1}\) voor \(p\le \ell\). Deze punten voldoen dus aan de scheidingsvoorwaarde hierboven voor \(s=t_C\), en dus geldt de groeivoorwaarde hierboven voor \(H_\ell = D_{\ell-1}\cap B(t_\ell,r^{-j-2})\), waarbij we ons herinneren dat \(D_0=C\). Omdat \(H_\ell \subset C\), verkrijgen we
  </p>
\[
F_n(C) \ge F_n\Big(\bigcup_{\ell\le m} H_\ell\Big) \ge r^{-j-1}2^{n/2} +
\min_{\ell\le m} F_{n+1}(H_\ell).
\]
  <p>
  Verder volgt uit de keuze van \(t_{\ell+1}\) hierboven dat voor \(1\le \ell\le m-1\)
  </p>
\[
\sup_{t\in D_\ell} F_{n+1}(D_\ell\cap B(t,r^{-j-2})) \le
F_{n+1}(D_\ell\cap B(t_{\ell+1},r^{-j-2})) = F_{n+1}(H_{\ell+1}),
\]
  <p>
  en de keuze van \(t_1\) hierboven impliceert dat dit ook geldt voor \(\ell=0\). Omdat de rij \((D_\ell)\) daalt, impliceert dit dat voor \(0\le \ell<m\)
  </p>
\[
\sup_{t\in D_{m-1}} F_{n+1}(D_{m-1}\cap B(t,r^{-j-2})) \le F_{n+1}(H_{\ell+1})
\]
  <p>
  geldt, en dus
  </p>
\[
\sup_{t\in D_{m-1}} F_{n+1}(D_{m-1}\cap B(t,r^{-j-2})) \le \min_{1\le \ell
\le m} F_{n+1}(H_\ell).
\]
  <p>
  Combinatie met de grens hierboven geeft ons eindelijk, omdat \(A_m=D_{m-1}\),
  </p>
\[
r^{-j-1}2^{n/2} + \sup_{t\in A_m} F_{n+1}(A_m\cap B(t,r^{-j-2})) \le F_n(C),
\]
  <p>
  en dit rondt het bewijs af voor het geval dat \(T\) eindig is. Wanneer \(T\) niet eindig hoeft te zijn, stellen we \(\varepsilon = r^{-j-1}2^{n/2-1}\) en vervangen we de keuze van \(t_{\ell+1}\) hierboven door de zwakkere eis
  </p>
\[
F_{n+1}(D_\ell\cap B(t_{\ell+1},r^{-j-2})) \ge \sup_{t\in D_\ell}
F_{n+1}(D_\ell\cap B(t,r^{-j-2})) - \varepsilon,
\]
  <p>
  en in plaats van de grens hierboven komen we tot
  </p>
\[
r^{-j-1}2^{n/2} + \sup_{t\in A_m} F_{n+1}(A_m\cap B(t,r^{-j-2})) \le F_n(C) +
\varepsilon.
\]
  <p>
  De waarde van \(\varepsilon\) terug invullen rondt het bewijs af.
  </p>
</div>

<p>
We zetten de constructie nu verder. We splitsen de verzameling \(C\in A_n\) op in ten hoogste \(m\) stukken met behulp van het decompositielemma, en beschouwen een van deze stukken \(A\).
</p>

<p>
Als \(A=A_\ell\) voldoet aan \(A_\ell\subset B(t_\ell,r^{-j-1})\) voor een zekere \(t_\ell\in C\), definiëren we \(j_{n+1}(A) = j+1 = j_n(C)+1\) en \(t_{n+1,A}=t_\ell\), zodat
</p>

<p>
\[
A = A_\ell \subset B(t_\ell, r^{-j-1}) = B(t_{n+1,A}, r^{-j_{n+1}(A)}).
\]
</p>

<p>
We benadrukken voor later gebruik dat in dat geval \(t_{n+1,A} \in C\).
</p>

<p>
Als \(A=A_\ell\) voldoet aan \(r^{-j-1}2^{n/2-1}+\sup_{t\in A_\ell}F_{n+1}(A_\ell \cap B(t,r^{-j-2}))\le F_n(C)\), definiëren we in plaats daarvan \(j_{n+1}(A)=j\, (=j_n(C))\) en \(t_{n+1,A}=t_{n,C}\), zodat
</p>

<p>
\[
A \subset C \subset B(t_{n,C}, r^{-j_n(C)}) = B(t_{n+1,A}, r^{-j_{n+1}(A)}).
\]
</p>

<p>
Dit voltooit de constructie, en we wenden ons tot het bewijs van de grens in de stelling. We merken eerst op dat voor elke \(t\in T\) de hierboven vastgestelde grens \(\mathit{\Delta}(C)\le 2r^{-j_n(C)}\) impliceert dat
</p>

<p>
\[
\sum_{n\ge 0} 2^{n/2}\mathit{\Delta}(A_n(t)) \le 2\sum_{n\ge 0} r^{-j_n(A_n(t))}
2^{n/2},
\]
</p>

<p>
en ons doel is om de rechterkant te begrenzen. We fixeren \(t\in T\) eens en voor altijd. Het blijkt dat in de rechterkant van de ongelijkheid hierboven alleen bepaalde termen echt bijdragen, een observatie die precies gemaakt wordt door het volgende lemma. Het basisidee is simpelweg dat de som van een meetkundige reeks, op een constante na, begrensd wordt door de eerste of de laatste term van de reeks.
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  Beschouw getallen \((a_n)_{n\ge 0}\), \(a_n\ge 0\), en neem aan dat \(\sup_n a_n < \infty\). Beschouw \(\alpha>1\) en definieer
  </p>
\[
I = \{k\ge 0 ;\ \forall n\ge 0,\ n\ne k,\ a_n < a_k \alpha^{|k-n|}\}.
\]
  <p>
  Dan
  </p>
\[
\sum_{n\ge 0} a_n \le \frac{2\alpha}{\alpha-1} \sum_{k\in I} a_k.
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Laten we \(n\prec k\) schrijven wanneer \(a_k \ge a_n \alpha^{|n-k|}\). Deze relatie is een partiële orde. Als \(n\prec k\) en \(k\prec p\), dan \(a_p \ge a_n \alpha^{|p-k|+|k-n|} \ge a_n \alpha^{|p-n|}\), zodat \(n\prec p\). We merken op dat de hierboven gedefinieerde verzameling \(I\) de verzameling is van elementen \(k\) van \(\mathbb N\) die maximaal zijn, dat wil zeggen \(k\prec k' \Rightarrow k=k'\). Omdat we aannemen dat de rij \((a_n)\) begrensd is, kan er geen stijgende rij voor de orde \(\prec\) bestaan. Dus bestaat er voor elke \(n\in \mathbb N\) een \(k\in I\) met \(n\prec k\). Dan \(a_n \le a_k \alpha^{-|n-k|}\), en dus
  </p>
\[
\sum_{n\ge 0} a_n \le \sum_{k\in I} \sum_{n\ge 0} a_k \alpha^{-|k-n|} \le
\frac{2}{1-\alpha^{-1}} \sum_{k\in I} a_k.
\]
</div>

<p>
We gaan terug naar het beheersen van de rechterkant van de ongelijkheid hierboven. We herinneren ons dat \(r\ge 4\). Om de notatie te verlichten stellen we \(j(n) = j_n(A_n(t))\), en stellen we \(a_n = r^{-j(n)}2^{n/2}\). Deze rij is begrensd omdat ofwel \(j(n)>j(n-1)\) en dan \(a(n)\le a(n-1)\), ofwel \(A_n(t)\) voldoet aan de functionaal-afname-grens \(r^{-j(n)-1}2^{n/2-1}+\sup_t F_{n+1}(\cdots)\le F_{n-1}(A_{n-1}(t))\), wat, omdat \((F_n)\) daalt, \(a_n\le 4rF_0(T)\) afdwingt. Beschouw de verzameling \(I\) die het lemma hierboven oplevert voor \(\alpha=\sqrt 2\). We merken de volgende relatie op
</p>

<p>
\[
k\in I,\ k\ge 1 \ \Rightarrow\ j(k-1)=j(k),\ j(k+1)=j(k)+1.
\]
</p>

<p>
Immers, als \(j(k+1)=j(k)\), dan \(a_{k+1}=\sqrt 2\, a_k\), wat \(k+1\notin I\) afdwingt volgens de definitie van \(I\), tenzij \(j(k+1)=j(k)+1\), en als \(j(k-1)=j(k)-1\), dan \(a_{k-1} = (r/\sqrt2)a_k \ge 2a_k\), wat \(k\in I\) alleen afdwingt wanneer \(j(k-1)=j(k)\).
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  Beschouw elementen \(1\le k<k'\) van \(I\). Dan
  </p>
\[
\frac{1}{4r} a_k \le F_{k-1}(A_{k-1}(t)) - F_{k'+1}(A_{k'+1}(t)).
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Uit de basisinclusie \(C\subset B(t_{n,C},r^{-j_n(C)})\) volgt dat, als we \(A^* := A_{k'+1}(t)\) en \(t^* := t_{k'+1,A^*}\) definiëren, dan \(A^* \subset B(t^*, r^{-j(k'+1)})\). Omdat \(k'\in I\) hebben we verder \(j(k'+1)=j(k')+1\), en zoals opgemerkt hebben we \(t^*\in A_{k'}(t)\subset A_k(t)\). Ook \(j(k')\ge j(k+1)\), en \(j(k+1)=j(k)+1\) omdat \(k\in I\) en \(k\ge 1\). Dus \(j(k'+1)\ge j(k)+2\) en daarom
  </p>
\[
A^* \subset A_k(t) \cap B(t^*, r^{-j(k)-2}).
\]
  <p>
  Verder, omdat \(k\in I\) en \(k\ge 1\), hebben we \(j(k-1)=j(k)\). Door constructie impliceert de functionaal-afname-grens gebruikt voor \(n=k-1\) en \(C=A_n(t)=A_{k-1}(t)\)
  </p>
\[
r^{-j(k)-1}2^{(k-1)/2-1} + \sup_{u\in A_k(t)} F_k(A_k(t)\cap
B(u,r^{-j(k)-2})) \le F_{k-1}(A_{k-1}(t)),
\]
  <p>
  zodat, omdat \(r^{-j(k)-1}2^{(k-1)/2-1} \ge a_k/4r\), de ongelijkheid hierboven impliceert
  </p>
\[
\frac{1}{4r} a_k + F_k(A^*) \le F_{k-1}(A_{k-1}(t)).
\]
  <p>
  Omdat \(k\le k'\) en omdat de rij \((F_n)\) daalt, hebben we \(F_k(A^*)\ge F_{k'+1}(A_{k'+1}(t))\), wat samen met de ongelijkheid hierboven het lemma bewijst.
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Einde van het bewijs van de partitioneringsstelling.</span>
  Zij \(x(n) = F_n(A_n(t))\), zodat het vorige lemma impliceert
  </p>
\[
\frac{1}{4r} a_k \le x(k-1) - x(k'+1).
\]
  <p>
  Omdat de rij \((F_n)\) van functionalen daalt, en omdat de rij verzamelingen \((A_n(t))\) daalt, daalt ook de rij \((x(n))\).
  </p>
  <p>
  Laten we eerst aannemen dat \(I\) onbeperkt is, en \(I\) opsommen als een stijgende rij \((k_i)_{i\ge 1}\). Voor \(i\ge 1\) definiëren we \(y(i) = x(k_i)\), zodat de rij \((y(i))\) daalt omdat de rij \((x(n))\) daalt. Voor \(i\ge 2\) hebben we \(k_i - 1 \ge k_{i-1}\), zodat \(x(k_i-1) \le y(i-1)\). Op dezelfde manier \(x(k_{i+1}+1) \ge x(k_{i+2}) = y(i+2)\). Omdat \(k_i\ge 1\), impliceert het vorige lemma
  </p>
\[
\frac{1}{4r} a_{k_i} \le y(i-1) - y(i+2).
\]
  <p>
  Omdat \(y(i)\le x(0) = F_0(A_0(t)) = F_0(T)\), levert sommatie van de ongelijkheden hierboven
  </p>
\[
\sum_{i\ge 2} a_{k_i} \le Lr F_0(T).
\]
  <p>
  op. Het enige dat nog overblijft, is \(a_{k_1}\) beheersen. Wanneer \(k_1=0\), dan \(a_0 = r^{-j_0(T)} \le r\mathit{\Delta}(T)\). Anders \(k_1\ge 1\), en dan impliceert de functionaal-afname-grens hierboven, gebruikt voor \(k=k_1\), dat \(a_{k_1} \le 4rF_0(T)\). Dit rondt het bewijs af voor het geval dat \(I\) onbeperkt is. Als \(I\) eindig is, zijn slechts kleine aanpassingen nodig.
  </p>
  <p>
  Combinatie van het sommeerbaarheidslemma met de ongelijkheid hierboven die \(\sum_n 2^{n/2}\mathit{\Delta}(A_n(t))\) begrenst, de net verkregen grens \(\sum_{i\ge 2}a_{k_i}\le LrF_0(T)\), en de grens op \(a_{k_1}\), geeft
  </p>
\[
\sum_{n\ge 0} 2^{n/2}\mathit{\Delta}(A_n(t)) \le 2 \sum_{n \ge 0} a_n \le
\frac{2\alpha}{\alpha - 1}\Big(\sum_{k\in I} a_k\Big) \le Lr F_0(T) +
Lr\mathit{\Delta}(T),
\]
  <p>
  uniform in \(t\in T\), wat de ongelijkheid van de stelling is. Talagrands partitioneringsstelling volgt door dit te combineren met het herindexeringslemma hierboven.
  </p>
</div>

<p>
We kunnen nu het bewijs van de Fernique&ndash;Talagrand-stelling afronden. Herinner dat \((X_t)_{t\in T}\) een Gaussisch proces is en \(d\) de canonieke afstand \(d(s,t)=(\mathsf{E}(X_s-X_t)^2)^{1/2}\) hierboven ingevoerd. We moeten bewijzen
</p>

<p>
\[
\gamma_2(T,d) \le L\, \mathsf{E}\sup_{t\in T} X_t.
\]
</p>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs van de ondergrens.</span>
  Om de ondergrens te bewijzen gebruiken we de partitioneringsstelling en de functionalen
  </p>
\[
F_n(H^*) = F(H^*) = \sup_{H\subset H^*} \mathsf{E}\sup_{t\in H} X_t,
\qquad \text{waarbij } H \text{ eindig is},
\]
  <p>
  zodat \(F_n\) niet van \(n\) afhangt. Om de partitioneringsstelling toe te passen, moeten we bewijzen dat de functionalen \(F_n\) de groeivoorwaarde vervullen met \(c^*\) een universele constante, en \(\mathit{\Delta}(T)\) begrenzen, wat eenvoudig is. We streven naar een bewijs dat op algemene principes rust, en zich leent voor generalisaties.
  </p>
</div>

<p>
We voegen nu de twee benodigde ingrediënten samen, Sudakovs lemma en Borells ongelijkheid.
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma (Sudakovs lemma).</span>
  Neem aan dat
  </p>
\[
\forall p,q\le m,\ p\ne q \ \Rightarrow\ d(t_p,t_q)\ge a.
\]
  <p>
  Dan hebben we
  </p>
\[
\mathsf{E}\sup_{p\le m} X_{t_p} \ge \frac{a}{L_1}\sqrt{\log m}.
\]
  <p>
  Hier en verder zijn \(L_1,L_2,\dots\) specifieke universele constanten.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Lemma (Borells ongelijkheid).</span>
  Beschouw een Gaussisch proces \((X_t)_{t\in U}\), waarbij \(U\) eindig is, en zij \(\sigma = \sup_{t\in U}(\mathsf{E}X_t^2)^{1/2}\). Dan hebben we voor \(u>0\)
  </p>
\[
\mathsf{P}\Big(\Big|\sup_{t\in U} X_t - \mathsf{E}\sup_{t\in U} X_t\Big| \ge
u\Big) \le 2\exp\Big(-\frac{u^2}{2\sigma^2}\Big).
\]
</div>

<p>
Laten we in woorden benadrukken wat dit betekent. De omvang van de fluctuaties van \(\mathsf{E}\sup_{t \in U} X_t\) wordt beheerst door de omvang van de afzonderlijke stochasten \(X_t\), in plaats van door de doorgaans veel grotere grootheid \(\mathsf{E}\sup_{t\in U} X_t\).
</p>

<p>
We combineren deze twee feiten tot de volgende propositie, die precies de groeivoorwaarde in vermomming is.
</p>

<div class="math-env">
  <p><span class="math-env-label">Propositie.</span>
  Beschouw punten \((t_\ell)_{\ell\le m}\) van \(T\). Neem aan dat \(d(t_\ell, t_{\ell'})\ge a\) als \(\ell\ne\ell'\). Beschouw \(\sigma>0\), en voor \(\ell\le m\) een eindige verzameling \(H_\ell \subset B(t_\ell,\sigma)\). Als dan \(H=\bigcup_{\ell\le m} H_\ell\), hebben we
  </p>
\[
\mathsf{E}\sup_{t\in H} X_t \ge \frac{a}{L_1}\sqrt{\log m} - L_2 \sigma
\sqrt{\log m} + \min_{\ell\le m} \mathsf{E}\sup_{t\in H_\ell} X_t.
\]
  <p>
  Wanneer \(\sigma \le a/(2L_1L_2)\), impliceert de ongelijkheid hierboven
  </p>
\[
\mathsf{E}\sup_{t\in H} X_t \ge \frac{a}{2L_1}\sqrt{\log m} + \min_{\ell\le
m} \mathsf{E}\sup_{t\in H_\ell} X_t,
\]
  <p>
  wat gezien kan worden als een generalisatie van Sudakovs lemma.
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  We kunnen en mogen \(m\ge 2\) aannemen. Voor \(\ell\le m\) beschouwen we de stochast
  </p>
\[
Y_\ell = \sup_{t\in H} X_t - X_{t_\ell} = \sup_{t\in H} (X_t - X_{t_\ell}).
\]
  <p>
  We stellen \(U=H\) en voor \(t\in U\) stellen we \(Z_t = X_t - X_{t_\ell}\). Omdat \(H\subset B(t_\ell,\sigma)\) hebben we \(\mathsf{E}Z_t^2 = d(t,t_\ell)^2 \le \sigma^2\), en Borells ongelijkheid toegepast op het proces \((Z_t)_{t\in U}\) impliceert, voor \(u\ge 0\),
  </p>
\[
\mathsf{P}(|Y_\ell - \mathsf{E}Y_\ell| \ge u) \le 2\exp\Big(-\frac{u^2}{2
\sigma^2}\Big).
\]
  <p>
  Dus als \(V = \max_{\ell\le m} |Y_\ell - \mathsf{E}Y_\ell|\), dan
  </p>
\[
\mathsf{P}(V\ge u) \le 2m\exp\Big(-\frac{u^2}{2\sigma^2}\Big),
\]
  <p>
  en integratie van de staart impliceert \(\mathsf{E}V \le L_2 \sigma \sqrt{\log m}\). Nu, voor elke \(\ell\le m\),
  </p>
\[
Y_\ell \ge \mathsf{E}Y_\ell - V \ge \min_{\ell\le m} \mathsf{E}Y_\ell - V,
\]
  <p>
  en dus
  </p>
\[
\sup_{t\in H} X_t = Y_\ell + X_{t_\ell} \ge X_{t_\ell} + \min_{\ell\le m}
\mathsf{E}Y_\ell - V
\]
  <p>
  zodat
  </p>
\[
\sup_{t\in H} X_t \ge \max_{\ell\le m} X_{t_\ell} + \min_{\ell\le m}
\mathsf{E}Y_\ell - V.
\]
  <p>
  We nemen vervolgens verwachtingen en gebruiken Sudakovs lemma.
  </p>
</div>

<p>
We kunnen nu het bewijs van de ondergrens afronden.
</p>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs van de ondergrens, vervolg.</span>
  We fixeren \(r\ge 2L_1L_2\). Om de groeivoorwaarde voor de functionalen \(F_n\) te bewijzen, merken we simpelweg op dat de tweede ongelijkheid van de propositie impliceert dat de groeivoorwaarde geldt voor \(c^* = 1/L\). Gegeven \((a,r)\)-gescheiden verzamelingen \(H_1,\dots,H_m\) met \(m=N_{n+1}\), zodat \(\frac{1}{L}2^{n/2} \le \sqrt{\log m} \le L 2^{n/2}\), zit elke \(H_\ell\) namelijk in een bol met straal \(\sigma = a/r \le a/(2L_1L_2)\) rond een punt \(t_\ell\) met onderlinge afstanden \(\ge a\), en diezelfde ongelijkheid, toegepast met eindige deelverzamelingen \(H\subset H_\ell\) en links het supremum genomen over eindige deelverzamelingen \(H\subset \bigcup_\ell H_\ell\), levert precies de groeivoorwaarde op voor de functionalen \(F_n(H^*) = \sup_{H\subset H^*} \mathsf{E}\sup_{t\in H} X_t\), waarbij \(H\) eindig is.
  </p>
  <p>
  Met de partitioneringsstelling blijft alleen de term \(\mathit{\Delta}(T)\) te beheersen. Maar
  </p>
\[
\mathsf{E}\max(X_{t_1},X_{t_2}) = \mathsf{E}\max(X_{t_1}-X_{t_2},0) =
\frac{1}{\sqrt{2\pi}} d(t_1,t_2),
\]
  <p>
  zodat \(\mathit{\Delta}(T) \le \sqrt{2\pi}\, \mathsf{E}\sup_{t\in T} X_t\).
  </p>
  <p>
  Dus geeft de partitioneringsstelling
  </p>
\[
\gamma_2(T,d) \le \frac{Lr}{c^*} F_0(T) + Lr\mathit{\Delta}(T) \le L\Big(
\mathsf{E}\sup_{t\in T} X_t\Big) + L\Big(\mathsf{E}\sup_{t\in T}
X_t\Big) = L\, \mathsf{E}\sup_{t\in T} X_t,
\]
  <p>
  omdat \(F_0(T) = \sup_{H\subset T} \mathsf{E}\sup_{t\in H} X_t = \mathsf{E}\sup_{t\in T} X_t\), waarbij \(H\) eindig is, de laatste gelijkheid geldend door monotone benadering van \(T\) met eindige deelverzamelingen. Dit is precies de linkerkant van de Fernique&ndash;Talagrand-stelling, waarmee het bewijs van de Fernique&ndash;Talagrand-stelling voltooid is.
  </p>
</div>

<p>
Laten we het argument nog eens doorlopen. Toelaatbare rijen van partities en de functionaal \(\gamma_\alpha(T,d)\) worden eerst gedefinieerd. Vervolgens worden een functionaal en de groeivoorwaarde met parameters \(r\) en \(c^*\) gedefinieerd. Talagrands partitioneringsstelling laat dan zien dat elke dalende rij van functionalen die de groeivoorwaarde vervult, \(\gamma_2(T,d)\) beheerst via \(F_0(T)\) en \(\mathit{\Delta}(T)\). Deze stelling wordt bewezen door een expliciete greedy constructie van een toelaatbare rij partities, rustend op het decompositielemma, samen met een sommeerbaarheidsargument dat een schaarse, goed gescheiden deelrij van schalen isoleert, en een telescoperende schatting langs die deelrij. Voor een Gaussisch proces vervullen de functionalen \(F(H^*) = \sup_{H\subset H^*} \mathsf{E}\sup_{t\in H} X_t\), met \(H\) eindig, de groeivoorwaarde, als gevolg van Sudakovs lemma gecombineerd met Borells ongelijkheid, samengevoegd in de propositie hierboven. Door deze functionalen in de partitioneringsstelling in te vullen, en \(\mathit{\Delta}(T)\) te begrenzen met \(\mathsf{E}\sup_{t\in T} X_t\), krijgen we de ondergrens \(\gamma_2(T,d) \le L\,\mathsf{E}\sup_{t\in T} X_t\), de ontbrekende helft van de Fernique&ndash;Talagrand-stelling, en de zin waarin \(\gamma_2\) scherp, en in beide richtingen, slaagt waar de Dudley-integraal waarmee we begonnen alleen maar een bovengrens kon geven.
</p>

<h2 id="the-logm-gap-chaining-on-ellipsoids">Het \(\log m\)-gat: chaining op ellipsoïden</h2>

<p>
Het volgende, nauw ontleend aan Talagrands eigen behandeling van ellipsoïden in <em>Upper and Lower Bounds for Stochastic Processes</em>, maakt het gat tussen Dudley's grens en de scherpe grens \(\gamma_2\) volledig expliciet, in de eenvoudigste setting waarin het al zichtbaar wordt: ellipsoïden in Hilbertruimte.
</p>

<p>
Gegeven een rij \((a_i)_{i\ge 1}\), \(a_i>0\), beschouwen we de ellipsoïde
</p>

<p>
\[
E = \Big\{ t\in \ell^2 \ ;\ \sum_{i\ge 1} \frac{t_i^2}{a_i^2} \le 1 \Big\}.
\]
</p>

<div class="math-env">
  <p><span class="math-env-label">Propositie.</span>
  Wanneer \(\sum_{i\ge 1} a_i^2 <\infty\), hebben we
  </p>
\[
\frac{1}{L}\Big(\sum_{i\ge 1} a_i^2\Big)^{1/2} \le \mathsf{E}\sup_{t\in E} X_t \le \Big(\sum_{i\ge 1} a_i^2\Big)^{1/2}.
\]
</div>

<p>
De rechterkant volgt direct uit Cauchy&ndash;Schwarz, omdat \(\sup_{t\in E} \sum_i t_i g_i \le (\sum_i a_i^2 g_i^2)^{1/2}\), en is zelfs een gelijkheid voor de keuze \(t_i = a_i^2 g_i/(\sum_j a_j^2 g_j^2)^{1/2}\); de linkerkant volgt door het tweede moment van datzelfde supremum te vergelijken, met \(\sigma := \max_i |a_i| \le L\,\mathsf{E}\sup_{t\in E}X_t\), met een variantiegrens die uit Gaussische concentratie komt. Onder de aanname dat \((a_i)\) niet-stijgend is en door de indices te groeperen in dyadische blokken \(2^n\le i<2^{n+1}\), herschrijft dit zich als
</p>

<p>
\[
\frac{1}{L}\Big(\sum_{n\ge 0} 2^n a_{2^n}^2\Big)^{1/2} \le \mathsf{E}\sup_{t\in E} X_t \le \Big(\sum_{n\ge 0} 2^n a_{2^n}^2\Big)^{1/2}.
\]
</p>

<p>
Dit werd hierboven bewezen als gevolg van de abstracte machinerie: het volgt uit de Fernique&ndash;Talagrand-stelling, toegepast via \(\gamma_2(E,d)\). Maar de abstracte route verdoezelt een natuurlijke vraag: kan men, met de hand, een echte rij van het toelaatbare type op \(E\) aanwijzen die deze snelheid bereikt, zonder helemaal langs majorizing measures te gaan? Talagrand doet precies dit in het hoofdstuk van het boek waarnaar deze post genoemd is, en merkt daarbij op dat de berekening "verrassend niet-triviaal" is. We reproduceren het volledig, zowel omdat het de meest concrete illustratie in het boek is van hoe een toelaatbare rij op een oneindig-dimensionale verzameling er daadwerkelijk uitziet, als omdat het de constructie is die gevoed wordt in de vergelijking tussen Dudley en \(\gamma_2\) die erna volgt.
</p>

<h3>Een expliciete chaining op de ellipsoïde</h3>

<p>
Neem aan dat \((a_i)\) niet-stijgend is, en zij voor \(n\ge 0\) \(I_n = \{i\, ;\, 2^n\le i<2^{n+1}\}\), zodat \(\operatorname{card} I_n = 2^n\). Stel \(c_n = 2^n a_{2^n}^2\), zodat, zoals net opgemerkt, \(\sum_{n\ge 0} c_n \le 3\sum_{i\ge 1} a_i^2\). Omdat \(a_i\ge a_{2^n}\) voor \(i\in I_n\), zit de ellipsoïde \(E\) in de grovere ellipsoïde
</p>

<p>
\[
E' = \Big\{ t\in\ell^2\ ;\ \sum_{n\ge 0} \frac{1}{a_{2^n}^2} \sum_{i\in I_n} t_i^2 \le 1 \Big\} = \Big\{ t\in \ell^2\ ;\ \sum_{n\ge 0} \frac{2^n}{c_n} \sum_{i\in I_n} t_i^2 \le 1 \Big\},
\]
</p>

<p>
die alleen van \(t\) afhangt via zijn dyadische blokken van coördinaten. We zullen, voor deze ellipsoïde \(E'\), verzamelingen \(U_n\subset \ell^2\) construeren met \(\operatorname{card} U_n \le N_{n+n_0}\), voor een universele constante \(n_0\), zodat
</p>

<p>
\[
\forall t\in E',\qquad \sum_{n\ge 0} 2^{n/2} d(t,U_n) \le L\Big(\sum_{n\ge 0} c_n\Big)^{1/2}.
\]
</p>

<p>
Laten we eerst zien waarom dit geeft wat we willen voor \(E\) zelf. Beschouw een afbeelding \(\varphi:\ell^2\to E\) met \(d(x,\varphi(x))\le 2\,d(x,E)\) voor elke \(x\); voor \(t\in E\) en \(x\in\ell^2\) hebben we \(d(x,E)\le d(x,t)\), dus \(d(x,\varphi(x))\le 2d(x,t)\) en dus \(d(t,\varphi(x)) \le d(t,x) + d(x,\varphi(x)) \le 3d(t,x)\). Dus \(d(t,\varphi(U_n)) \le 3d(t,U_n)\), en de verzamelingen \(\varphi(U_n)\subset E\) voldoen aan \(\operatorname{card}\varphi(U_n) \le \operatorname{card} U_n \le N_{n+n_0}\). Door \(T_n = \{0\}\) te stellen voor \(n\le n_0\) en \(T_n = \varphi(U_{n-n_0})\) voor \(n>n_0\), krijgen we \(\operatorname{card} T_n\le N_n\) en, omdat \(E\subset E'\) met \(\sum_n c_n \le L\sum_i a_i^2\),
</p>

<p>
\[
\forall t\in E,\qquad \sum_{n\ge 0} 2^{n/2} d(t,T_n) \le L\Big(\sum_{i\ge 1} a_i^2\Big)^{1/2}.
\]
</p>

<p>
Dit is precies de snelheid van Propositie 2.13.1 hierboven, deze keer gecertificeerd door een expliciete rij van het toelaatbare type \((T_n)\) in plaats van door de abstracte partitioneringsstelling. Het blijft nog om de verzamelingen \(U_n\) te construeren. We verliezen geen algemeenheid door \(\sum_{n\ge 0}c_n=1\) aan te nemen.
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  Gegeven \(t\in E'\), kunnen we een rij \((p(n,t))_{n\ge 0}\) van gehele getallen vinden zodat
  </p>
\[
\sum_{i\in I_n} t_i^2 \le 2^{-p(n,t)},
\qquad
\sum_{n\ge 0} 2^{n/2-p(n,t)/2} \le L,
\qquad
\forall n\ge 0,\ p(n+1,t)\le p(n,t)+2.
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Definieer \(q(n,t)\) als het grootste gehele getal \(q\le 2^n\) zodat \(\sum_{i\in I_n} t_i^2 \le 2^{-q}\). Zij \(A = \{n\ge 0\ ;\ q(n,t)<2^n\}\), zodat voor \(n\in A\), per definitie van \(q(n,t)\), \(2^{-q(n,t)} \le 2\sum_{i\in I_n} t_i^2\) geldt. Dus, omdat \(t\in E'\),
  </p>
\[
\sum_{n\in A} \frac{2^{n-q(n,t)}}{c_n} \le 2\sum_{n\ge 0} \frac{2^n}{c_n}\sum_{i\in I_n} t_i^2 \le 2.
\]
  <p>
  Omdat \(\sum_n c_n=1\), geeft de ongelijkheid van Cauchy&ndash;Schwarz \(\sum_{n\in A} 2^{n/2-q(n,t)/2} \le L\); omdat \(2^{n/2-q(n,t)/2} = 2^{-n/2}\) voor \(n\notin A\), krijgen we \(\sum_{n\ge 0} 2^{n/2-q(n,t)/2} \le L\). Definieer nu \(p(n,t) = \min\{q(k,t)+2(n-k)\ ;\ 0\le k\le n\}\), zodat de derde eigenschap per constructie geldt. Omdat \(2^{-p(n,t)/2} \le \sum_{k\le n} 2^{-q(k,t)/2-(n-k)}\), verkrijgen we
  </p>
\[
\sum_{n\ge 0} 2^{n/2-p(n,t)/2}
\le \sum_{n\ge 0}\sum_{k\le n} 2^{k/2-q(k,t)/2}\, 2^{-(n-k)/2}
= \sum_{k\ge 0} 2^{k/2-q(k,t)/2} \sum_{n\ge k} 2^{-(n-k)/2}
\le L.
\]
</div>

<p>
Voor elke \(n\ge 1\) en \(p\ge 0\) zij \(B(n,p)\subset\ell^2\) de verzameling van \(t=(t_i)_{i\ge1}\) met \(t_i=0\) voor \(i\ge 2^n\) en \(\|t\|_2 \le 2^{-p/2+2}\): een bol van dimensie \(2^n-1\) en straal \(2^{-p/2+2}\). Volgens de standaard volumetrische overdekkingsschatting voor bollen in \(\mathbb{R}^k\), toegepast op relatieve schaal \(1/4\), bestaat er een verzameling \(V_{n,p}\subset B(n,p)\) met \(\operatorname{card} V_{n,p} \le L^{2^n}\) zodat elk punt van \(B(n,p)\) zich binnen afstand \(2^{-p/2}\) van \(V_{n,p}\) bevindt. Stel \(V_n = \bigcup_{0\le p\le 2^n} V_{n,p}\), zodat ook \(\operatorname{card} V_n \le L^{2^n}\). We stellen \(U_0=\{0\}\), en laten \(U_n\) bestaan uit de elementen \(x_0+\dots+x_n\) met \(x_k\in V_k\) voor elke \(k\le n\); omdat de \(V_k\) gedragen worden op disjuncte, groeiende blokken van coördinaten, geldt \(\operatorname{card} U_n \le \prod_{k\le n}\operatorname{card} V_k \le L^{2^{n+1}} \le N_{n+n_0}\) voor een geschikte universele \(n_0\).
</p>

<p>
Voor \(t\in\ell^2\) en \(n\ge 0\) zij \(t^{(n)}\in\ell^2\) de afkapping \(t_i^{(n)} = t_i\) voor \(i<2^n\) en \(t_i^{(n)}=0\) voor \(i\ge 2^n\); merk op dat \(t^{(n)}=t\) zodra \(t\in U_n\).
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  Voor \(t\in E'\), met \((p(n,t))\) zoals in het vorige lemma, kunnen we voor elke \(n\) een element \(u^{(n)}\in U_n\) vinden met \(d(u^{(n)}, t^{(n)}) \le 2^{-p(n,t)/2}\).
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Via inductie naar \(n\). Voor \(n=0\) nemen we \(u^{(0)}=0\), omdat \(t^{(0)}=0\). Voor de inductiestap schrijven we \(t^{(n)} = u^{(n)}+v^{(n)}\) met \(u^{(n)}\in U_n\) en \(\|v^{(n)}\|_2\le 2^{-p(n,t)/2}\), zodat \(t^{(n+1)} = u^{(n)} + v'^{(n)}\) waarbij \(v'^{(n)} = v^{(n)} + (t^{(n+1)}-t^{(n)})\). Volgens de eerste eigenschap van de rij \(p(n,t)\) hebben we \(\|t^{(n+1)}-t^{(n)}\|_2 = \big(\sum_{i\in I_n} t_i^2\big)^{1/2} \le 2^{-p(n,t)/2}\), dus \(\|v'^{(n)}\|_2 \le 2^{-p(n,t)/2+1} \le 2^{-p(n+1,t)/2+2}\), waarbij we in de laatste stap de derde eigenschap gebruiken. Omdat \(v^{(n)}_i=0\) voor \(i\ge 2^n\), is ook \(v'^{(n)}_i=0\) voor \(i\ge 2^{n+1}\), dus \(v'^{(n)}\in B(n+1,p(n+1,t))\). Dus bestaat er \(w\in V_{n+1,p(n+1,t)}\subset V_{n+1}\) met \(\|v'^{(n)}-w\|_2\le 2^{-p(n+1,t)/2}\). Door \(u^{(n+1)} := u^{(n)}+w\in U_{n+1}\) te stellen, hebben we \(t^{(n+1)}-u^{(n+1)} = v'^{(n)}-w\), wat de inductiestap afrondt.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Gevolg.</span>
  Voor \(t\in E'\), \(\sum_{n\ge 0} 2^{n/2} d(t,U_n) \le L\).
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Volgens de eerste eigenschap van de rij \(p(n,t)\),
  </p>
\[
\|t-t^{(n)}\|_2^2 = \sum_{k>n} \sum_{i\in I_k} t_i^2 \le \sum_{k>n} 2^{-p(k,t)},
\]
  <p>
  dus \(\|t-t^{(n)}\|_2 \le \sum_{k>n} 2^{-p(k,t)/2}\). Dan
  </p>
\[
\sum_{n\ge 0} 2^{n/2}\|t-t^{(n)}\|_2
\le \sum_{n\ge 0}\sum_{k>n} 2^{-p(k,t)/2}2^{n/2}
= \sum_{k\ge 1} 2^{-p(k,t)/2}\sum_{0\le n<k} 2^{n/2}
\le L\sum_{k\ge 1} 2^{k/2-p(k,t)/2} \le L,
\]
  <p>
  waarbij we in de laatste stap de tweede eigenschap van \((p(n,t))\) gebruiken. Omdat \(d(t,U_n) \le d(t^{(n)},U_n) + \|t-t^{(n)}\|_2\), volgt het resultaat nu door dit te combineren met het vorige lemma.
  </p>
</div>

<p>
Dit is de hele constructie: splits de coördinaten van de ellipsoïde op in dyadische blokken, kwantiseer elk blok op de schaal die zijn eigen \(\ell^2\)-massa vereist, en lijm de kwantiseringen van opeenvolgende blokken samen tot de verzamelingen \(U_n\). Wat het lastig maakt, is precies wat Lemma 2.14.1 doet &mdash; de schaal \(p(n,t)\) waarop blok \(n\) opgelost moet worden, hangt van \(t\) zelf af, en moet over naburige blokken worden uitgesmeerd (de \(+2\)-marge in de derde eigenschap) voordat het omgezet kan worden in een echt, \(t\)-onafhankelijk net op elk niveau \(n\). Zodra deze boekhouding op zijn plaats staat, verandert het ongedaan maken van de normalisatie \(\sum_n c_n=1\) het gevolg in precies de grens (2.168) waarmee deze constructie begon, en dus, via de reductie hierboven, in de expliciete chaining op \(E\) die \(\gamma_2(E,d)\le L(\sum_i a_i^2)^{1/2}\) met blote handen certificeert, zonder enig beroep te doen op de majorizing measure theorem.
</p>

<p>
Vergelijk dit nu met wat de grens van Dudley ziet. Voor een metrische ruimte \((T,d)\) en \(n\ge 0\) schrijven we \(e_n(T) = \inf\{\epsilon>0\ ;\ N(T,d,\epsilon) \le N_n\}\) voor het \(n\)-de entropienummer van \(T\), met hetzelfde covering number \(N(T,d,\epsilon)\) en dezelfde \(N_n=2^{2^n}\) als in de definities hierboven: \(e_n(T)\) is gewoon de straal die nodig is om \(T\) met \(N_n\) bollen te overdekken. Omdat \(\epsilon \mapsto N(T,d,\epsilon)\) niet-stijgend is en precies op de schalen \(e_n(T)\) sprongen maakt tussen de waarden \(N_n\), laat het opsplitsen van de Dudley-integraal over de dyadische blokken \([e_{n+1}(T),e_n(T)]\) zien dat deze, op universele constanten na, gelijkwaardig is aan de discrete som \(\sum_{n\ge 0} 2^{n/2} e_n(T)\):
\[
\int_0^\infty \sqrt{\log N(T,d,\epsilon)}\ d\epsilon \le L\sum_{n\ge 0} 2^{n/2} e_n(T) \le L \int_0^\infty \sqrt{\log N(T,d,\epsilon)}\ d\epsilon.
\]
Voor de ellipsoïde \(E\) kan men laten zien dat
</p>

<div class="math-env">
  <p><span class="math-env-label">Propositie.</span>
  \[
  \frac{1}{L} \sum_{n\ge 0} 2^{n/2} a_{2^n} \le \sum_{n\ge 0} 2^{n/2} e_n(E) \le L \sum_{n\ge 0} 2^{n/2} a_{2^n}.
  \]
  </p>
</div>

<p>
De rechterkanten van de twee hierboven weergegeven grenzen zijn echt verschillende grootheden: de ene is \(\big(\sum_n 2^n a_{2^n}^2\big)^{1/2}\), een Euclidische-type norm van de rij \((a_{2^n})\), terwijl de andere \(\sum_n 2^{n/2}a_{2^n}\) is, een \(\ell^1\)-type norm van dezelfde gewogen rij. Door Cauchy&ndash;Schwarz is de eerste altijd ten hoogste de tweede, maar de tweede kan willekeurig groter gemaakt worden dan de eerste &mdash; spreid dezelfde totale \(\ell^2\)-massa over steeds meer dyadische blokken van vergelijkbare grootte, en de som van vierkantswortels groeit terwijl de vierkantswortel van de som van kwadraten dat niet doet. De grens van Dudley, volledig opgebouwd uit entropienummers, kan dit simpelweg niet zien: een ellipsoïde is, wat een Gaussisch proces daarop betreft, kleiner dan zijn covering numbers alleen zouden voorspellen.
</p>

<p>
Dit gat kan precies vastgepind worden, en het boek bewijst het in het algemeen, niet alleen voor ellipsoïden: voor elke \(T\subset \mathbb{R}^m\),
</p>

<p>
\[
\sum_{n\ge 0} 2^{n/2} e_n(T) \le L\sqrt{\log(m+1)}\ \gamma_2(T,d).
\]
</p>

<p>
Het bewijs (gegeven als Exercise 2.7.9 in het boek, met de oplossing opgenomen in de bijlage met oplossingen) is kort: als \(n_0\) het kleinste gehele getal is met \(2^{n_0}\ge m\), laat een volumetrisch argument op \(\mathbb{R}^m\) zien dat de entropienummers \(e_n(T)\) voorbij schaal \(n_0\) in essentie stoppen te krimpen, zodat de staart van de som \(\sum_{n\ge n_0} 2^{n/2}e_n(T)\) beheerst wordt door zijn eerste term \(2^{n_0/2}e_{n_0}(T)\), terwijl elk van de \(n_0+1\approx L\sqrt{\log(m+1)}\) resterende termen met \(n\le n_0\) ten hoogste \(L\gamma_2(T,d)\) is, via de elementaire grens \(2^{n/2}e_n(T)\le L\gamma_2(T,d)\) die in elke metrische ruimte geldt. En het boek laat vlak daarna zien dat dit geen gebrek van het bewijs is: een constructie met \(2^M\) goed gescheiden punten gepakt binnen de eenheidsbol van \(\mathbb{R}^M\) levert een verzameling \(T\) op met \(\gamma_2(T,d)\le L\) maar \(\sum_n 2^{n/2}e_n(T) \ge (\log M)/L\), zodat de factor \(\sqrt{\log(m+1)}\) werkelijk niet weggehaald kan worden.
</p>

<p>
De twee feiten samenvoegend: de Dudley-integraal is, op universele constanten na, precies de entropiesom \(\sum_n 2^{n/2}e_n(T)\), en \(\gamma_2(T,d)\) is, door de Fernique&ndash;Talagrand-stelling hierboven bewezen, precies de omvang van \(\mathsf{E}\sup_{t\in T}X_t\). De grens die we net bewezen hebben, zegt dat deze twee grootheden in \(\mathbb{R}^m\) van elkaar kunnen verschillen met een factor van orde \(\sqrt{\log m}\), en niet meer &mdash; dit is dus precies hoever de Dudley-integraal in de praktijk van de waarheid af kan zitten, in elke dimensie \(m\), en het ellipsoïde-voorbeeld hierboven is precies wat die speling in de praktijk laat bijten.
</p>

</div>

<p><a href="{{ '/nl/blogposts/#articles' | relative_url }}">&larr; Terug naar Artikelen</a></p>
