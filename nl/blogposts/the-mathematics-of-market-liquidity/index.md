---
layout: default
title: The Mathematics of Market Liquidity
permalink: /nl/blogposts/the-mathematics-of-market-liquidity/
---

<section class="hero">
  <img class="hero-img" src="{{ '/images/volatility/quant_finance.jpg' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Blogpost &middot; Market Microstructure</div>
    <h1 class="hero-name">The Mathematics of Market Liquidity</h1>
    <p class="hero-lede">Market making is een opgelost probleem. Dat betekent niet dat je er ook mee wint.</p>
  </div>
</section>

<div class="article-body">

<p class="tagline">Door Daan Zunnenberg en Nicos Starreveld</p>

<h2 id="what-is-market-making">Wat is market making?</h2>

<p>
Een market maker geeft een prijs op om te kopen en een prijs om te verkopen. Ze doet dat tegelijkertijd, de hele dag. Een standaarddefinitie omschrijft het maken van een markt als &ldquo;continu kopen en verkopen van aandelen in specifieke bedrijven tegen specifieke prijzen.&rdquo; Beurzen zelf omschrijven een market maker als een partij die &ldquo;klaarstaat om aandelen regelmatig en continu te kopen en verkopen tegen een publiekelijk genoteerde prijs.&rdquo; De taak heeft twee doelen. Houd de markt liquide, en verdien er geld mee.
</p>

<p>
Het publieke beeld van de baan is slechter dan de baan zelf. Market makers worden op één hoop gegooid met high-frequency traders in het algemeen, en high-frequency trading wordt in de pers vaak behandeld als een eufemisme voor geld afsnoepen van gewone beleggers. Die reputatie is vooral verdiend door een paar smalle, grotendeels illegale praktijken, waaronder spoofing en layering, niet door market making zelf. De dienst die een market maker daadwerkelijk verkoopt is juist het omgekeerde van extractie. Zonder iemand die bereid is op elk moment een vaste koop- en verkoopprijs te geven, moet een trader die nu een aandeel wil verkopen wachten op een andere trader die net op dat moment wil kopen. Market makers absorberen die mismatch en rekenen de spread voor het voorrecht om niet te moeten wachten. Elke koper van een beleggingsfonds, elke verkoper van een obligatie, elk pensioenfonds dat een portefeuille herbalanceert profiteert van die liquiditeit, meestal zonder te weten tegen wiens quotes ze net hebben gehandeld. Het empirische bewijs onderschrijft dit: sinds elektronische en high-frequency market making het oude vloer-gebaseerde specialistensysteem heeft verdrongen, vinden studies naar algoritmisch handelen en liquiditeit consequent dat bid-askspreads zijn gedaald en markten meetbaar makkelijker zijn geworden om in te handelen, niet moeilijker. Het is een echt publiek goed, geprijsd via de spread in plaats van via een abonnement of vergoeding.
</p>

<p>
Die definitie klinkt simpel genoeg. Een market maker plaatst gewoon koop- en verkoopprijzen. Maar daarmee mis je het echte verhaal. Waarom trekt een taak die zo simpel klinkt de slimste koppen op aarde aan, en waarom stroomt er elk jaar zoveel geld naartoe? Hoe bepaal je de prijs? Hoe ver van fair value ga je weg? Wat gebeurt er als je positie begint te groeien? Prijzen bewegen duizenden keren per seconde, dus op gevoel spelen gaat je ruïneren.<sup>1</sup> Dit is geen giswerk. Het is een regelprobleem.
</p>

<p>
Ongeveer vijftien jaar geleden kreeg dit probleem een echt wiskundig antwoord. In 2008 modelleerden Marco Avellaneda en Sasha Stoikov market making als een stochastisch regelprobleem. Dat is simpelweg een naam voor een beslissingsprobleem waarbij je je acties in de tijd kiest, terwijl er voortdurend willekeurige gebeurtenissen om je heen plaatsvinden. Hier is de beslissing welke bid- en askprijzen je plaatst, en de willekeurige gebeurtenissen zijn welke orders wanneer binnenkomen. Het doel is om het risico van het aanhouden van een positie, inventory risk genoemd, onder deze willekeur te beheersen. Olivier Gu&eacute;ant en co-auteurs duwden het idee later verder en maakten het in de praktijk oplosbaar. Hun werk veranderde de market maker van iemand die op gevoel prijzen plaatst in iemand die een optimalisatieprobleem oplost.
</p>

<p>
Deze blogpost loopt dat model door. Hij laat zien waarom het model wiskundig optimaal is. Daarna legt hij uit waarom bijna niemand buiten een handvol firma's het winstgevend kan traden.
</p>

<h2 id="the-avellaneda-stoikov-model">Het Avellaneda&ndash;Stoikov-model</h2>

<p>
Dit is de opzet. Een market maker plaatst een bid en een ask rond een referentieprijs, de theoretische fair value van het instrument op dat moment. Wanneer een andere trader tegen een van die quotes handelt, vindt een trade plaats. Het doel is de spread tussen bid en ask te verdienen. Tegelijkertijd moet ze voorkomen dat haar positie te ver in één richting opbouwt. Ze quote immers alleen passief, dus elke trade waarop ze gevuld wordt is per constructie een trade die de andere kant wilde maken.
</p>

<p>
Modelleer de referentieprijs \((S_t)_{t\geq 0}\) als een diffusie, een proces waarvan het pad continu is in de tijd maar waarvan de richting op elk moment onvoorspelbaar is, zonder drift die het de ene of andere kant op trekt, zodat het evolueert als
</p>

<p>
\[
S_0=S, \qquad dS_t=\sigma\,dW_t.
\]
</p>

<p>
Hier is \(\sigma\) de volatiliteit van het instrument, en \(W_t\) is een Brownse beweging, het canonieke wiskundige object voor pure, driftloze willekeur. De market maker kan \(S_t\) niet beïnvloeden. Ze kiest alleen hoe ver ze haar bid en ask, \(\delta_t^b\) en \(\delta_t^a\), daarvandaan plaatst. Niemand ziet \(S_t\) daadwerkelijk rechtstreeks. Het is een theoretische fair value, geen prijs die iemand noteert.
</p>

<p>
Orders komen willekeurig binnen. De standaardaanname is dat koop- en verkooporders het orderboek raken als Poissonprocessen, wat betekent dat aankomsten onafhankelijk plaatsvinden met een bekend gemiddeld tempo, zonder dat de exacte timing van de volgende te voorspellen is. Hoe verder je van \(S_t\) quote, hoe kleiner de kans dat je gevuld wordt. Schrijf \(N_t^b\) en \(N_t^a\) voor het aantal uitgevoerde koop- en verkooptrades. Inventory, de huidige positie van de market maker, is dan \(q_t=N_t^b-N_t^a\). Gu&eacute;ant, Lehalle en Fernandez-Tapia stelden de volgende aankomstintensiteiten voor,
</p>

<p>
\[
\lambda^b(\delta_t^b)=A e^{-k\delta_t^b},
\qquad
\lambda^a(\delta_t^a)=A e^{-k\delta_t^a},
\]
</p>

<p>
waarbij \(A\) en \(k\) constanten zijn die aangeven hoe liquide de markt is. Quote dichter bij fair value en je wordt vaker gevuld. Quote verder weg en je wordt minder vaak gevuld, maar verdient meer per trade.
</p>

<p>
Cash evolueert als
</p>

<p>
\[
dX_t=(S_t+\delta_t^a)dN_t^a-(S_t-\delta_t^b)dN_t^b.
\]
</p>

<p>
De market maker kiest \((\delta_t^b,\delta_t^a)\) om het meeste uit haar eindvermogen te halen, meestal onder exponentiële utility. Exponentiële utility is een standaardmanier om een risicomijdende beslisser te beschrijven, gestuurd door een risicoaversieparameter \(\gamma\geq 0\). Een hogere \(\gamma\) betekent dat ze meer waarde hecht aan het vermijden van een slechte uitkomst dan aan het najagen van een extra beetje winst. Vermogen alleen is hier niet het doel. Een market maker die op een enorme eenzijdige positie zit, doet haar werk niet goed, zelfs als ze op papier winst maakt.
</p>

<p>
Dit is de winst van het model. Het is daadwerkelijk oplosbaar. Avellaneda en Stoikov laten zien dat, na een standaardbenadering, de optimale quotes een nette, benaderende gesloten vorm hebben,
</p>

<p>
\[
\delta_t^{b*}\cong\frac{1}{\gamma}\log\Big(1+\frac{\gamma}{k}\Big)+\frac{1+2q}{2}\gamma\sigma^2(T-t)
\]
</p>

<p>
en
</p>

<p>
\[
\delta_t^{a*}\cong\frac{1}{\gamma}\log\Big(1+\frac{\gamma}{k}\Big)+\frac{1-2q}{2}\gamma\sigma^2(T-t).
\]
</p>

<p>
De inventoryterm komt voort uit wat de reservation price wordt genoemd, \(r(s,q,t)=s-q\gamma\sigma^2(T-t)\). Dit is de fair price gecorrigeerd voor de eigen positie van de market maker. Onder exponentiële utility is het variantie, niet volatiliteit, die risico prijst. Een formule met een blote \(\sigma\) is niet alleen lelijk. Hij is dimensioneel verkeerd, en het is een fout die opvallend vaak voorkomt in secundaire beschrijvingen van dit model. Codeer dat met de verkeerde macht en je skew, hoe ver je je quotes kantelt op basis van je positie, staat een factor \(\sigma\) fout. Dat is een echte, boekverliezende bug, geen typefout.
</p>

<p>
Lees deze term voor term. Het eerste stuk is een basisspread. Het compenseert voor het risico van überhaupt inventory aanhouden. Het tweede stuk corrigeert voor de huidige positie \(q\). Ben je long, dan trek je beide quotes omlaag om verkopen aan te moedigen, en omgekeerd. Naarmate de eindtijd \(T\) nadert, wordt deze correctie sterker. Het model wil dat je bij het einde vlak staat.
</p>

<p>
Digitale assetmarkten gaan nooit dicht, dus een versie met oneindige horizon is daar nuttiger. Dat betekent simpelweg dat er geen vaste eindtijd \(T\) is, alleen een voortdurende steady state. Dit speelt bij digitale assets een grotere rol dan de naam doet vermoeden. Een token verhandelt vaak op tientallen platformen tegelijk, elk met zijn eigen orderboek, eigen liquiditeit en eigen prijs op elk moment. Er is geen enkele slotbel die elk bureau terugdwingt naar een vlakke positie, en geen enkele beurs waarvan de referentieprijs vanzelfsprekend de juiste is om tegen te quoten. Gu&eacute;ant en co-auteurs leiden de benaderende stationaire quotes af, wat betekent dat de quotes vastlopen in een vaste vorm die niet langer van de tijd afhangt,
</p>

<p>
\[
\delta_\infty^{a*}\cong \frac{1}{\gamma}\log\Big(1+\frac{\gamma}{k}\Big)+\frac{1+2q}{2}\sqrt{\frac{\gamma\sigma^2}{2kA}\Big(1+\frac{\gamma}{k}\Big)^{1+\frac{k}{\gamma}}}
\]
</p>

<p>
en
</p>

<p>
\[
\delta_\infty^{b*}\cong \frac{1}{\gamma}\log\Big(1+\frac{\gamma}{k}\Big)+\frac{1-2q}{2}\sqrt{\frac{\gamma\sigma^2}{2kA}\Big(1+\frac{\gamma}{k}\Big)^{1+\frac{k}{\gamma}}}.
\]
</p>

<p>
Beide optellen geeft de stationaire spread,
</p>

<p>
\[
\psi_\infty^*(q)\cong
\frac{2}{\gamma}\log\Big(1+\frac{\gamma}{k}\Big)
+\sqrt{\frac{\gamma\sigma^2}{2kA}\Big(1+\frac{\gamma}{k}\Big)^{1+\frac{k}{\gamma}}},
\]
</p>

<p>
een getal dat alleen afhangt van risicoaversie \(\gamma\), volatiliteit \(\sigma\), en de liquiditeitsparameters \(A\) en \(k\).
</p>

<p>
Eén voorspelling springt eruit. Hogere volatiliteit betekent bredere spreads. Dat is intuïtief zodra je het ziet. Een grotere \(\sigma\) betekent grotere schommelingen in inventory risk. Het model zegt je dus meer compensatie te eisen voordat je de andere kant van een trade neemt. Risico stijgt, dus de prijs van het leveren van liquiditeit stijgt mee. Dat is de theorie, in gesloten vorm, en die is optimaal gegeven de aannames van het model.
</p>

<p>
Eén eerlijke kanttekening, rechtstreeks van de praktijkkant van het bureau. Niemand bij een echte market-makingfirma handelt deze gesloten formules rechtstreeks. Het zijn benaderende oplossingen van een Hamilton-Jacobi-Bellman-vergelijking, de algemene wiskundige vergelijking achter dit soort regelproblemen, en ze gelden alleen als \(\gamma\) en de horizon klein zijn. Op een echt bureau wordt de werkelijke vergelijking in plaats daarvan numeriek opgelost, of wordt het hele quotingbeleid geleerd met reinforcement learning tegen een gesimuleerd orderboek. Wat van Avellaneda en Stoikov overeind blijft is de intuïtie. Kantel je quotes met inventory. Verbreed met volatiliteit. Verklein met liquiditeit. Die intuïtie is echt, en wordt overal gebruikt. De formule zelf ligt dichter bij een trainingsoefening dan bij een productiesysteem.
</p>

<p>
Er is ook een tweede, stillere aanname die het waard is te benoemen. \(S_t\) is hier een gestileerde diffusie, als gegeven behandeld. In de praktijk wordt die referentieprijs niet waargenomen. Hij wordt continu geschat, uit het orderboek, uit gecorreleerde instrumenten, uit de eigen recente fills van de market maker. Een goede schatting van fair value bouwen is zelf een lastig statistisch probleem. Op de meeste bureaus is dit een grotere bron van edge dan de inventory-regellaag die erboven zit. Het model in dit onderdeel beantwoordt de vraag hoe je moet kantelen gegeven fair value. Het beantwoordt niet wat fair value eigenlijk is. De twee als één probleem behandelen is de meest voorkomende fout die mensen maken die dit model uit een leerboek leren.
</p>

<h2 id="why-the-theory-does-not-survive-contact-with-real-markets">Waarom de theorie het contact met echte markten niet overleeft</h2>

<p>
Het model is dus opgelost, en de oplossing is elegant. Het probleem is dat het optimale regelprobleem oplossen en geld verdienen twee verschillende dingen zijn. Het model is een nette idealisering. Echte markten zijn niet net. Het gat tussen de twee is precies waar de gemiddelde particuliere trader verliest.
</p>

<p>
Begin bij de structurele mismatches. Het model gaat ervan uit dat je tegen elke prijs kunt quoten. Echte beurzen handelen op een vast raster, de tick size, de kleinste toegestane afstand tussen twee prijzen. Wanneer de optimale spread van het model dicht bij één tick ligt, verandert het hele probleem van karakter. Minieme parameterwijzigingen laten je optimale quote naar een geheel andere tick omslaan. De nette, gladde wiskunde wordt sprongsgewijs.
</p>

<p>
Er is een tweede mismatch, en die telt net zo zwaar. Uitvoering gaat niet alleen over prijs. Echte orderboeken draaien op price-time priority. Dat betekent dat als jij en een concurrent dezelfde prijs quoten, wie er eerst was ook als eerste wordt gevuld. Het model behandelt uitvoering als een functie van alleen prijsafstand. Het negeert deze wachtrijpositie, die in de praktijk belangrijker kan zijn dan prijs.
</p>

<p>
Sommige modellen repareren deze gaten. Fabien Guilbaud en Huy&ecirc;n Pham behandelen de spread bijvoorbeeld als een Markovketen met eindig aantal toestanden, een model dat springt tussen een beperkte verzameling discrete toestanden, om tickdiscreetheid direct in te bouwen. Dat heeft wel een prijs. Elke laag realisme die wordt toegevoegd maakt het model moeilijker in gesloten vorm op te lossen. De nette scheiding tussen prijsrisico en uitvoeringsrisico begint te vervagen.
</p>

<p>
Ticks en wachtrijen zijn nog de makkelijke problemen. Het diepere probleem is dat het model aanneemt dat orderflow willekeurig, onafhankelijk en stabiel in de tijd is. Echte orderflow is geen van die dingen. Hij klontert. Hij verandert met het tijdstip van de dag. En vooral: hij is niet neutraal. Hij is strategisch.
</p>

<p>
Je handelt niet tegen een random number generator. Je handelt tegen andere mensen. Sommigen van hen zien dingen sneller dan jij, of weten dingen die jij niet weet. Geïnformeerde traders raken je quotes precies wanneer je prijs op het punt staat verkeerd te lijken. Dit heet adverse selection. Een fill is niet zomaar een fill. Het is vaak een signaal dat je net de verliezende kant van een trade hebt genomen.
</p>

<p>
Het echte probleem is dus niet alleen optimaal quoten gegeven een bekend risiconiveau. Het is uitzoeken wat er op dit moment daadwerkelijk in de markt gebeurt, met slechts partiële informatie, en reageren voordat je quotes verouderd zijn. Dat betekent het volatiliteitsregime afleiden, de richting van de druk, en hoe agressief je concurrenten momenteel zijn. Niets daarvan is direct waarneembaar. Niets daarvan staat in de gesloten oplossing hierboven.
</p>

<p>
Daar komt bij dat jij niet de enige bent die dit spel speelt. Veel firma's draaien een of andere versie van hetzelfde model. Elke quote die je plaatst verandert het orderboek, wat de vulkansen voor iedereen verandert, ook voor jou. Market making is niet één trader tegen de natuur. Het is veel traders tegen elkaar, allemaal in real time op elkaar reagerend.
</p>

<p>
Dit speelt het scherpst in derivatenmarkten, waar contracten complex zijn en de concurrentie moordend is. Daar gaat winstgevend blijven niet over het kennen van de Avellaneda&ndash;Stoikov-formule. Het gaat over wie de betere volatiliteitsschatting heeft, de betere kortetermijn-flowvoorspelling, en misschien vooral de lagere latency. De formule geeft je een startpunt. Iedereen kent de formule al. De edge zit elders.
</p>

<h2 id="why-the-typical-trader-still-loses">Waarom de gemiddelde trader nog steeds verliest</h2>

<p>
Het is verleidelijk om de vorige paragraaf zo te lezen. Kies een rustige markt, en de theorie werkt prima. Daar zit een kern van waarheid in. Een dunne, langzaam bewegende markt heeft minder adverse selection en minder concurrenten, dus de aannames van het model zijn minder duidelijk fout. Maar rustige markten zijn rustig precies omdat de grote spelers daar nog geen moeite hebben gedaan om te concurreren. Zodra er echt geld opduikt, komen dezelfde krachten terug.
</p>

<p>
De diepere reden dat de gemiddelde trader dit model niet simpelweg kan draaien en de spread kan incasseren, is geen kwestie van vakmanschap. Het is structuur. Die duikt op vier plekken op, en geen daarvan wordt opgelost door de wiskunde beter te kennen.
</p>

<p>
Het eerste is de flow zelf. Zoals hierboven besproken zijn de tegenpartijen aan de andere kant van je quotes niet willekeurig. Professionele market makers bouwen hele teams om te detecteren en te vermijden dat ze tegen geïnformeerde flow handelen. Een particuliere trader heeft zo'n filter niet, en wordt juist opgepikt door precies de trades die er het meest toe doen.
</p>

<p>
Het tweede is infrastructuur. De gesloten spreadformule hierboven oplossen op papier kost een pagina. Hem live draaien betekent een marktdatafeed, een verbinding met de matching engine, en een risicosysteem, allemaal snel genoeg om quotes bij te werken voordat de markt eraan voorbij is bewogen. Retailbrokerverbindingen zijn hier niet voor gebouwd.
</p>

<p>
Het derde is wachtrijpositie, en wie die mag kopen. Price-time priority betekent dat de trader wiens order als eerste in de rij staat ook als eerste wordt gevuld. Firma's die betalen voor colocatie, servers die zich fysiek in het datacenter van de beurs bevinden, krijgen hun orders microseconden eerder in de rij dan iedereen anders. Dat is geen modelmatig voordeel. Het is een vastgoedaankoop, en die is niet te koop voor een retailrekening. Digitale assetmarkten hebben hun eigen versie van hetzelfde probleem. Op een decentrale beurs is er geen fysieke wachtrij om ruimte in te kopen. In plaats daarvan wordt prioriteit gekocht via gasfees en wat maximal extractable value wordt genoemd, waarbij een validator of bot meer betaalt om zijn transactie als eerste verwerkt te krijgen, of transacties binnen het blok herordent in zijn eigen voordeel. Het mechanisme ziet anders uit dan colocatie, maar de uitkomst is dezelfde. Snelheid en geld koopt nog steeds prioriteit, en een retail quotingbot staat nog steeds achteraan in de rij.
</p>

<p>
Het vierde is dat het signaal zelf wordt bespeeld. Regelrechte manipulatie, zoals spoofing en layering, is illegaal en wordt zwaar gecontroleerd, met onder meer de Amerikaanse Securities and Exchange Commission die er actief achteraan gaat. Overdrijf dus niet hoeveel hiervan een legitieme quotingbot daadwerkelijk overkomt. Het echte probleem is subtieler. Orderboeksignalen die in een backtest voorspellend lijken, zoals korte uitbarstingen van quote-activiteit of schijnbare onbalans, worden actief geproduceerd en geconsumeerd door geavanceerde deelnemers, sneller dan een kleine bot ruis van informatie kan onderscheiden. Je hoeft niet gemanipuleerd te worden om te verliezen. Je hoeft alleen te reageren op een signaal waarop iemand sneller al heeft gehandeld.
</p>

<p>
Niets van dit alles betekent dat de wiskunde fout is. Het betekent dat de wiskunde het beste beschrijft wat je zou kunnen doen als je de enige trader in de markt was. Dat ben je niet. Elk van deze vier krachten verbreedt het gat tussen de theoretische spread en wat een kleine, trage, onbeschermde trader daadwerkelijk kan incasseren. Dat gat is waar de theoretische edge verdwijnt voordat hij je rekening bereikt.
</p>

<h2 id="conclusion">Conclusie</h2>

<p>
Het Avellaneda&ndash;Stoikov-model beantwoordt een echte vraag. Gegeven inventory risk en willekeurige orderflow, wat is de optimale quote? Het antwoord is expliciet, elegant en correct, op zijn eigen voorwaarden.
</p>

<p>
Maar optimaal zijn gegeven het model en winstgevend zijn in de markt zijn geen gelijke uitspraken. Adverse selection, tickdiscreetheid, wachtrijprioriteit, concurrentie, infrastructuurkosten en signaalbespeling zitten allemaal tussen de formule en de daadwerkelijke winst en verlies. Voor een grote firma met gecolokeerde servers en een surveillanceteam kan dat gat worden gedicht. Voor de gemiddelde trader kan dat grotendeels niet.
</p>

<p>
Market making is niet alleen een stochastisch regelprobleem. Het is een stochastisch regelprobleem verpakt in een race. De race is gefixeerd in het voordeel van wie al de snelste server en de beste informatie heeft. De wiskunde laat je zien hoe optimaal eruitziet. Ze geeft je geen manier om daar te komen.
</p>

<hr>

<p class="footnote"><sup>1</sup> Kijk naar quote stuffing om te zien hoe snel dit gaat. Individuele firma's sturen en annuleren 60.000 orders in één seconde om het publieke orderboek te overspoelen.</p>

</div>

<p><a href="{{ '/nl/blogposts/' | relative_url }}">&larr; Terug naar Blogposts</a></p>
