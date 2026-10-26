---
layout: default
title: Bewijs van de Fundamentele Stelling van Empirische Processen
permalink: /nl/blogposts/fundamental-theorem-of-empirical-processes/
---

<section class="hero">
  <img class="hero-img" src="{{ '/images/chalk.png' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Latała&ndash;Bednorz &middot; Empirische processen</div>
    <h1 class="hero-name">De Fundamentele Stelling van Empirische Processen</h1>
    <p class="hero-lede">Chaining en het "peaky" deel: waarom een empirisch proces altijd uiteenvalt in een geketend stuk en een stuk zonder enige vorm van opheffing.</p>
  </div>
</section>

<div class="article-body">

<h2>Inleiding</h2>

<p>
We bewijzen de Fundamentele Stelling van Empirische Processen: de uitspraak dat een klasse \(\mathcal F\) van functies die een empirisch proces \(S_N(\mathcal F)\) beheerst, uiteenvalt als \(\mathcal F \subset T_1+T_2\), waarbij \(T_1\) wordt beheerst door chaining en \(T_2\) door een niet-opgeheven som van absolute waarden, en beide stukken ten hoogste grootte \(LS_N(\mathcal F)\) hebben. Het bewijs steunt op de stelling van Latała&ndash;Bednorz, die dezelfde vraag voor Bernoulli-processen beslecht. We beginnen met de stelling van Latała&ndash;Bednorz zelf en schetsen het bewijs, met de nadruk op het decompositielemma en het partitioneringsschema. Daarna generaliseren we lineaire somen van tekens naar willekeurige reeksen van functies, geven we de algemene ondergrens die daarbij geldt, en specialiseren we die naar empirische processen. Tot slot geven we het volledige bewijs.
</p>

<h2>Bernoulli-processen en de stelling van Latała&ndash;Bednorz</h2>

<p>
Schrijf \(\varepsilon_i\) voor onafhankelijke Bernoulli-variabelen, \(\mathsf{P}(\varepsilon_i=\pm 1)=1/2\). Voor \(t=(t_i)_{i\ge 1}\in\ell_2\) definiëren we \(X_t = \sum_{i\ge 1} t_i\varepsilon_i\). Voor \(T\subset \ell_2\) heet de familie \((X_t)_{t\in T}\) het Bernoulli-proces gedefinieerd door \(T\), en
</p>

<p>
\[
b(T) := \mathsf{E}\sup_{t\in T} X_t.
\]
</p>

<p>
De sub-Gaussische ongelijkheid voor somen \(\sum\varepsilon_i t_i\) geeft via chaining \(b(T)\le L\gamma_2(T)\). Triviaal geldt ook \(b(T) \le \sup_{t\in T}\|t\|_1\), zonder enige opheffing. Omdat \(X_{t^1+t^2} = X_{t^1}+X_{t^2}\), geldt dat als \(T\subset T_1+T_2\), dan \(b(T)\le b(T_1)+b(T_2)\), en door de twee grenzen te combineren
</p>

<p>
\[
b^*(T) := \inf\Big\{\gamma_2(T_1) + \sup_{t\in T_2}\|t\|_1 \ ;\ T\subset
T_1+T_2\Big\}
\]
</p>

<p>
begrenst ook \(b^*(T)\) de grootheid \(b(T)\) van boven, \(b(T)\le Lb^*(T)\). Het Bernoulli-vermoeden vroeg of dit scherp is.
</p>

<div class="math-env">
  <p><span class="math-env-label">Stelling (De stelling van Latała&ndash;Bednorz).</span>
  Er is een universele constante \(L\) zodat voor elke \(T\subset\ell_2\),
  </p>
\[
b^*(T) \le Lb(T).
\]
</div>

<p>
We schetsen het bewijs in de volgende sectie, met alle technische machinerie die daarvoor nodig is. Pas als dat gedaan is, gaan we verder naar empirische processen.
</p>

<h2>Bewijs van de stelling van Latała&ndash;Bednorz</h2>

<p>
Twee mechanismen begrenzen \(b(T)\) van boven. Opheffing, beheerst door \(\gamma_2(T)\) via chaining, en afwezigheid van opheffing, beheerst door \(\sup_t\|t\|_1\). De functionaal \(b^*(T)\) mengt beide via een decompositie \(T\subset T_1+T_2\). De stelling van Latała&ndash;Bednorz stelt dat dit, op een constante na, de enige twee mechanismen zijn. Het bewijs produceert voor elke \(t\in T\) een decompositie \(t=t^1+t^2\) met \(\|t^2\|_1 \le Lb(T)\) en \(T_1=\{t^1\ ;\ t\in T\}\) zodanig dat \(\gamma_2(T_1)\le Lb(T)\). Die decompositie is niet canoniek. Neem \(T_1\) met \(\gamma_2(T_1)\le 1\), zodat \(b(T_1)\le L\). Koppel aan elke \(t\in T_1\) een \(\varphi(t)\) met \(\|\varphi(t)\|_1\le 1\) en zet \(T = \{t+\varphi(t)\ ;\ t\in T_1\}\), zodat \(b(T)\le L\). Gegeven enkel \(T\) is er in het algemeen niets dat \(T_1\) terugvindt.
</p>

<p>
Het prototype van het decompositielemma is een vergelijkingsprincipe van Latała. Fixeer \(J\subset\mathbb N^*\), schrijf \(b_J(T):=\mathsf{E}\sup_{t\in T} \sum_{i\in J}\varepsilon_i t_i \le b(T)\). Er zijn twee typische, niet elkaar uitsluitende, redenen waarom \(b_J(T) \ll b(T)\) kan gelden. De diameter van \(T\) voor de volledige afstand \(d\) is dan al gelijk aan de diameter voor \(d_J\), de afstand beperkt tot \(J\). Of \(b_J(T)\) is werkelijk kleiner. Zodra de supremumnorm op \(T\) beheerst is, geldt een van de twee rechtstreeks op elk stuk van een partitie van beheerste grootte.
</p>

<div class="math-env">
  <p><span class="math-env-label">Propositie (Het principe van Latała).</span>
  Er is een universele \(L_1\) met de volgende eigenschap. Laat \(T\subset \ell_2\), \(J\subset\mathbb N^*\), \(c,\sigma>0\), \(m\ge 2\), met
  </p>
\[
\forall s,t\in T,\qquad \sum_{i\in J}(s_i-t_i)^2 \le c^2, \qquad \forall
t\in T,\qquad \|t\|_\infty < \frac{8\sigma}{\sqrt{\log m}}.
\]
  <p>
  Als \(c\le \sigma/L_1\), dan is er een \(m'\le m+1\) en een partitie \((A_\ell)_{\ell \le m'}\) van \(T\) zodat voor elke \(\ell\) ofwel
  </p>
\[
\exists t_\ell\in T,\qquad A_\ell\subset B_2(t_\ell,\sigma),
\]
  <p>
  of
  </p>
\[
b_J(A_\ell) \le b(T) - \frac{\sigma}{L}\sqrt{\log m}.
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Schets.</span>
  Fixeer \(t_0\in T\), vervang \(T\) door \(T-t_0\). Schrijf \(Y_t = \sum_{i\in J} \varepsilon_i t_i\), \(Z_t = \sum_{i\notin J}\varepsilon_i t_i\), zodat \(b(T) =\mathsf{E}\sup_t(Y_t+Z_t)\). Laat \(\alpha\) het infimum zijn, over verzamelingen \(F\subset T\) met \(\operatorname{card} F\le m\), van \(\mathsf{E}\sup_{t\notin\bigcup_{s\in F}B(s,\sigma)} Y_t\). Kies \(t^1,\dots,t^m\in T\) op een gulzige manier, waarbij \(t^k\) bijna het supremum \(\sup_{t\notin\bigcup_{\ell<k}B(t^\ell,\sigma)} Y_t^k\) haalt voor een onafhankelijke kopie \(Y^k\) van \(Y\). De minoratie van Sudakov voor Bernoulli-processen,
  </p>
\[
\mathsf{E}\sup_{\ell\le m}\sum_i\varepsilon_i t^\ell_i \ge \frac1L
\min\big(a\sqrt{\log m},\ a^2/b\big) \qquad (\|t^\ell-t^{\ell'}\|_2\ge a,\
\|t^\ell\|_\infty\le b),
\]
  <p>
  geeft een ondergrens voor \(\mathsf{E}\max_k(Y^k_{t^k}+Z_{t^k})\), gebruikmakend van de separatie van de \(t^k\) en het deel \(Z\) dat op \(J^c\) leeft. Concentratie van maat voor Bernoulli-processen geeft een bijpassende bovengrens via \(b(T)\) zelf. Die twee vergelijken dwingt \(\alpha \le b(T) - \sigma \sqrt{\log m}/L\) af, en de partitie \(A_\ell = T\cap B(t^\ell,\sigma)\), \(A_{m+1}=T\setminus\bigcup_\ell B(t^\ell,\sigma)\), levert de propositie.
  </p>
</div>

<p>
Het principe van Latała beheerst \(d_J\), niet de volledige afstand \(d\). "Chopping maps" herstellen dit. Vervang \(\varepsilon_i t_i\) door \(\sum_j \varepsilon_{i,j}t_{i,j}\), een som van onafhankelijke Bernoulli-termen op kleine stukjes \(t_{i,j}\) van \(t_i\), zo gekozen dat het resulterende proces een veel kleinere supremumnorm heeft. Schrijf \(\Phi\) voor deze chopping map. Dan is \(b(\Phi(A)) = F(A,I,w,k,h)\), een functionaal die afhangt van een "chopping point" \(w\in\ell_2\), een coördinatenverzameling \(I\), en schalen \(k\le h\). Door het principe van Latała toe te passen op \(\Phi(T)\) en terug te transporteren via \(\Phi\), ontstaat het eigenlijke decompositielemma van de constructie.
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma (Decompositielemma).</span>
  Er is een universele \(L_3\) met de volgende eigenschap. Laat \(T\subset \ell_2\), \(b,c>0\), \(\|t\|_\infty\le b\) voor alle \(t\in T\), \(m\ge 2\), \(b\sqrt{\log m}\le c\). Er is een \(m'\le m\) en een partitie \((B_\ell)_{\ell \le m'}\) van \(T\) zodat voor elke \(\ell\) ofwel
  </p>
\[
\forall D\subset B_\ell,\quad \mathit{\Delta}(D)\le \frac{c}{L_3}\ \Rightarrow\ b(D)
\le b(T) - \frac{c}{L}\sqrt{\log m},
\]
  <p>
  of \(\mathit{\Delta}(B_\ell)\le c\), met \(\mathit{\Delta}\) de \(\ell_2\)-diameter.
  </p>
</div>

<p>
Dit is het decompositielemma van het Gaussische geval, overgezet naar \(b(T)\) via chopping. De partities zelf itereren een drieledige verfijning van deze tweedeling op de chopping-data \((I,w,k,j)\). Een deelverzameling \(A\) van een stuk \(B\in A_n\) valt in precies één van drie gevallen. Kleine deelverzamelingen van \(A\) getuigen van een daling van \(F\) op schaal \(j+2\), bij hetzelfde chopping point. Of \(A\) zelf heeft kleine diameter op schaal \(j+1\), bij hetzelfde chopping point. Of, derde geval, er wordt geen daling waargenomen bij het oude chopping point \(w\), maar wel na overgang naar een nieuw chopping point \(w'\in A\) en een bijbehorend beperkte coördinatenverzameling \(I'\),
</p>

<p>
\[
F(A,I',w',j+2,j+2) \le F(T,I,w,k,j+1) - \frac1L 2^n r^{-j-1}, \qquad
\mathit{\Delta}(A,I',w',j+2,j+2) \le 2^{n/2}r^{-j-1}.
\]
</p>

<p>
Het derde geval is de bijdrage van Bednorz. In tegenstelling tot de Gaussische functionaal hangt \(F\) werkelijk af van \(w\), en kan vooruitgang op fijnere schaal een verandering van chopping point afdwingen. De partities worden recursief opgebouwd, met een teller \(p_n(A)\) die bijhoudt hoeveel stappen er moeten verstrijken voordat \(A\) opnieuw gesplitst mag worden, zodat een diameterbegrenzing uit geval twee of drie lang genoeg standhoudt om nog gebruikt te worden. Door de resulterende dalingen van \(F\) langs de constructie op te sommen, precies zoals het sommeerbaarheidslemma dat doet in het Gaussische geval, krijgen we de kernongelijkheid van de constructie, en door \(F(T,I,w,k,h)\) terug te koppelen aan \(b(T)\) wordt het bewijs van de stelling van Latała&ndash;Bednorz afgerond.
</p>

<p>
Hiermee werd het Bernoulli-vermoeden beslecht, dat bijna vijfentwintig jaar open had gestaan.
</p>

<h2>Van Bernoulli-processen naar willekeurige reeksen van functies</h2>

<p>
De stelling van Latała&ndash;Bednorz betreft lineaire somen \(X_t = \sum_i \varepsilon_i t_i\), geïndexeerd door coëfficiëntenrijen \(t\in\ell_2\). Vervang \(t_i\) door een willekeurige functie \(Z_i(t)\) van \(t\), en \(X_t\) door \(\sum_i \varepsilon_i Z_i(t)\). Het Bernoulli-proces is het speciale geval \(Z_i(t)=t_i\). Deze setting is algemeen genoeg om ook empirische processen te omvatten, zodra \(Z_i(t)\) genomen wordt als \(t(X_i)\) voor een onafhankelijke steekproef \((X_i)\) en een klasse van functies \(t\). We bouwen nu de bijbehorende theorie op, parallel aan wat voorafgaat.
</p>

<p>
Fixeer een indexverzameling \(T\), een willekeurige rij \((Z_i)_{i\ge 1}\) van functies op \(T\) (niet noodzakelijk onafhankelijk), en een onafhankelijke Bernoulli-rij \((\varepsilon_i)\). Zet
</p>

<p>
\[
S := \mathsf{E}\sup_{t\in T} \sum_{i\ge 1} \varepsilon_i Z_i(t).
\]
</p>

<p>
Fixeer \(r\ge 4\), \(j\in\mathbb Z\). Gegeven een realisatie \(\omega\) van \((Z_i)\), zet
</p>

<p>
\[
\psi_{j,\omega}(s,t) := \sum_{i\ge 1} \big(|r^j(Z_i(s)-Z_i(t))|^2 \wedge 1
\big),
\]
</p>

<p>
\[
\varphi_j(s,t) := \mathsf{E}\psi_{j,\omega}(s,t).
\]
</p>

<p>
De familie \((\varphi_j)_{j\in\mathbb Z}\) van gekwadrateerde afstanden op \(T\) is het middel waarmee de grootte van \(T\) gemeten wordt, in plaats van de enkele afstand \(d\) uit het lineaire geval. We nemen overal aan
</p>

<p>
\[
\forall j\in\mathbb Z,\ \forall s,t\in T,\qquad \mathsf{P}\big(
\psi_{j,\omega}(s,t)\le \varphi_j(s,t)/4\big) \le \exp(-\varphi_j(s,t)/4).
\]
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  De voorwaarde hierboven geldt wanneer de \(Z_i\) onafhankelijk zijn.
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  De ongelijkheid van Bernstein, toegepast op \(W_i = |r^j(Z_i(s)-Z_i(t))|^2\wedge 1\) en \(A=\varphi_j(s,t)/4 = \tfrac14\sum_i\mathsf{E}W_i\), geeft direct de voorwaarde hierboven.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Stelling (De algemene ondergrens).</span>
  Neem aan dat \(T\) aftelbaar is. Er is een toelaatbare rij \((A_n)\) van partities van \(T\) en, voor \(A\in A_n\), een geheel getal \(j_n(A)\), zodat
  </p>
\[
\forall t\in T,\qquad \sum_{n\ge 0} 2^n r^{-j_n(A_n(t))} \le KS,
\]
\[
A\in A_n,\ C\in A_{n-1},\ A\subset C \ \Rightarrow\ j_{n-1}(C) \le j_n(A)
\le j_{n-1}(C)+1,
\]
\[
s,t\in A\in A_n \ \Rightarrow\ \varphi_{j_n(A)}(s,t) \le 2^{n+2}.
\]
</div>

<p>
We bewijzen dit in Sectie 5. Het is het exacte analogon, voor de familie \((\varphi_j)\), van het bestaan van een majorizing measure die \(b(T)\) getuigt. De afhankelijkheid van de stelling van Latała&ndash;Bednorz is niet louter thematisch. Het bewijs hierna gebruikt, als black box, een begrenzing
</p>

<p>
\[
\int I_\mu\,d\mu \le Lr^3 b(T)
\]
</p>

<p>
voor een functionaal \(I_\mu\) opgebouwd uit een majorizing measure \(\mu\) op een verzameling \(T\subset\ell_2\) die de canonieke familie van afstanden van een Bernoulli-proces draagt. Deze begrenzing wordt rechtstreeks bewezen uit een toelaatbare rij partities, maar de laatste stap, het omzetten van een begrenzing op de partitiefunctionaal in een begrenzing op \(b(T)\) zelf, is precies de equivalentie van \(b(T)\) met de grootte van de beste toelaatbare rij partities voor de canonieke familie van afstanden op \(\ell_2\), een equivalentie die steunt op de stelling van Latała&ndash;Bednorz. De algemene ondergrens voor willekeurige reeksen van functies is hierop gebouwd.
</p>

<p>
We noteren nog twee verdere ingrediënten voordat we specialiseren naar empirische processen. Het eerste begrenst \(\mathsf{E}\sup_t\sum_i|t(X_i)|\) door de bijbehorende som met tekens en de individuele gemiddelden.
</p>

<div class="math-env">
  <p><span class="math-env-label">Stelling (De stelling van Giné&ndash;Zinn).</span>
  Met \(\bar S(T):=\mathsf{E}\sup_{t\in T}\big|\sum_{i\le N}\varepsilon_i t(X_i)\big|\),
  </p>
\[
\mathsf{E}\sup_{t\in T}\sum_{i\le N}|t(X_i)| \le \sup_{t\in T}\sum_{i\le N}
\mathsf{E}|t(X_i)| + 4\bar S(T).
\]
</div>

<p>
Het tweede wordt bewezen met een onafhankelijk argument. Het ontbindt een klasse die door \((\varphi_j)\) beheerst wordt in een chaining-deel, een \(L_1\)-klein deel, en een "peaky" deel. Het bewijs is, naar eigen zeggen van de auteur, niet elegant, en we citeren het hier als black box.
</p>

<div class="math-env">
  <p><span class="math-env-label">Stelling (De decompositiestelling voor het peaky deel).</span>
  Beschouw een aftelbare \(T\) van meetbare functies op \(\Omega\), \(r\ge 2\), \(0\in T\), een toelaatbare rij \((A_n)\) van \(T\), en \(j_n(A)\in\mathbb Z\) voor \(A\in A_n\), met, voor een parameter \(u>0\),
  </p>
\[
\forall n\ge 0,\ \forall s,t\in A\in A_n,\qquad \int
|r^{j_n(A)}(s(\omega)-t(\omega))|^2\wedge 1\,d\nu(\omega) \le u2^n.
\]
  <p>
  Laat \(S:=\sup_{t\in T}\sum_{n\ge 0} 2^n r^{-j_n(A_n(t))}\). Dan \(T\subset T_1+T_2+T_3\), \(0\in T_1\),
  </p>
\[
\gamma_2(T_1,d_2) \le L\sqrt u S,
\]
\[
\gamma_1(T_1,d_\infty) \le LS,
\]
\[
\forall t\in T_2,\qquad \|t\|_1 \le LuS,
\]
  <p>
  en voor elke \(t\in T_3\) is er een \(s\in T\) met \(|t| \le 5|s|1_{\{2|s|\ge r^{-j_0(t)}\}}\).
  </p>
</div>

<h2>Empirische processen en de Fundamentele Stelling</h2>

<p>
We specialiseren nu naar \(Z_i(t) = t(X_i)\). Fixeer een kansruimte \((\Omega,\mu)\), een aftelbare begrensde klasse \(\mathcal F\subset L_2(\mu)\) met \(\mu(t)=0\) voor \(t\in\mathcal F\), i.i.d. \((X_i)_{i\ge 1}\) met waarden in \(\Omega\) en verdeeld als \(\mu\), en een geheel getal \(N\). Zet
</p>

<p>
\[
S_N(\mathcal F) := \mathsf{E}\sup_{t\in\mathcal F} \sum_{i\le N} t(X_i).
\]
</p>

<p>
Net als in het Bernoulli-geval geldt een triviale begrenzing zonder opheffing, \(S_N(\mathcal F) \le 2\mathsf{E}\sup_{t\in\mathcal F}\sum_{i\le N} |t(X_i)|\), en de ongelijkheid van Bernstein geeft een chaining-begrenzing, geldig wanneer \(0\in\mathcal F\),
</p>

<p>
\[
S_N(\mathcal F) \le L\big(\sqrt N \gamma_2(\mathcal F,d_2) +
\gamma_1(\mathcal F,d_\infty)\big),
\]
</p>

<p>
waarbij \(d_2,d_\infty\) de afstanden zijn die horen bij de normen \(L_2(\mu)\) en \(L_\infty(\mu)\), de twee afstanden die de ene \(\ell_2\)-afstand van het Bernoulli-geval vervangen, net zoals \((\varphi_j)\) \(d\) vervangt in de algemene setting van Sectie 3. Door te interpoleren, voor \(\mathcal F\subset T_1+T_2\) met \(0\in T_1\),
</p>

<p>
\[
S_N(\mathcal F) \le L\big(\sqrt N\gamma_2(T_1,d_2) + \gamma_1(T_1,
d_\infty)\big) + 2\mathsf{E}\sup_{t\in T_2}\sum_{i\le N}|t(X_i)|.
\]
</p>

<p>
Dat deze interpolatie niet alleen voldoende maar ook noodzakelijk is, is de stelling die we bewijzen.
</p>

<div class="math-env">
  <p><span class="math-env-label">Stelling (De Fundamentele Stelling van Empirische Processen).</span>
  Onder de bovenstaande hypothesen is er een decompositie \(\mathcal F\subset T_1+T_2\) met \(0\in T_1\) zodat
  </p>
\[
\gamma_2(T_1,d_2) \le \frac{L}{\sqrt N} S_N(\mathcal F), \qquad
\gamma_1(T_1,d_\infty) \le LS_N(\mathcal F), \qquad \mathsf{E}\sup_{t\in
T_2}\sum_{i\le N}|t(X_i)| \le LS_N(\mathcal F).
\]
</div>

<p>
Het bewijs, gegeven in Sectie 5, combineert de algemene ondergrens met de stelling van Giné&ndash;Zinn en de decompositiestelling voor het peaky deel.
</p>

<h2>Bewijs van de ondergrens</h2>

<p>
We bewijzen de algemene ondergrens (Stelling) en leiden daaruit de Fundamentele Stelling van Empirische Processen af. De notatie is die van Sectie 3: \(T\), \((Z_i)\), \(S\), en de familie \((\varphi_j)\) onder de daar opgelegde voorwaarde \(\mathsf{P}(\psi_{j,\omega}(s,t)\le \varphi_j(s,t)/4)\le\exp(-\varphi_j(s,t)/4)\).
</p>

<p>
Neem aan dat \(T\) eindig is. Definieer
</p>

<p>
\[
j_0 = \sup\{j\in\mathbb Z\ ;\ \forall s,t\in T,\ \varphi_j(s,t)\le 4\}
\in\mathbb Z\cup\{\infty\}.
\]
</p>

<p>
Laat \(M^+\) de kansmaten \(\mu\) op \(T\) zijn met \(\mu(\{t\})>0\) voor elke \(t\). Voor \(\mu\in M^+\), \(t\in T\), zet \(\bar j_0(t) = j_0\) en, voor \(n\ge 1\),
</p>

<p>
\[
\bar j_n(t) = \sup\{j\in\mathbb Z\ ;\ \mu(B_j(t,2^n)) \ge N_n^{-1}\}
\in\mathbb Z\cup\{\infty\},
\]
</p>

<p>
met \(B_j(t,2^n) = \{s\in T\ ;\ \varphi_j(s,t)\le 2^n\}\). De rij \((\bar j_n(t))\) is stijgend. Zet
</p>

<p>
\[
J_\mu(t) := \sum_{n\ge 0} 2^n r^{-\bar j_n(t)}.
\]
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma (Hoofdlemma).</span>
  Voor \(\mu\in M^+\),
  </p>
\[
\int J_\mu(t)\,d\mu(t) \le KS,
\]
  <p>
  waarbij \(K\) alleen van \(r\) afhangt.
  </p>
</div>

<p>
Gegeven \(\omega\), zet \(j_{0,\omega} = \sup\{j\ ;\ \forall s,t,\ \psi_{j,\omega}(s,t)\le 1\}\), \(j_{0,\omega}(t)=j_{0,\omega}\), en voor \(n\ge 1\),
</p>

<p>
\[
j_{n,\omega}(t) = \sup\{j\in\mathbb Z\ ;\ \mu(\{s\ ;\ \psi_{j,\omega}(t,s)
\le 2^n\}) \ge N_n^{-1}\} \in\mathbb Z\cup\{\infty\}.
\]
</p>

<p>
\((j_{n,\omega}(t))\) is stijgend. Zet \(I_{\mu,\omega}(t) := \sum_{n\ge 0} 2^n r^{-j_{n,\omega}(t)}\). Gegeven \(\omega\), identificeer \(t\in T\) met \((Z_i(t))_i\in\ell_2\), zodat \(X_t = \sum_i\varepsilon_i Z_i(t)\) een Bernoulli-proces op \(T\subset\ell_2\) is. Het volgende is een gevolg van de stelling van Latała&ndash;Bednorz, rechtstreeks bewezen uit de definities via een toelaatbare rij partities die \(b(T)\) getuigt.
</p>

<div class="math-env">
  <p><span class="math-env-label">Stelling (Ondergrens vanuit een maat).</span>
  Voor elke kansmaat \(\mu\) op \(T\subset\ell_2\),
  </p>
\[
\int_T I_\mu(t)\,d\mu(t) \le Lr^3 b(T).
\]
</div>

<p>
Toegepast bij vast \(\omega\) en de verwachting genomen,
</p>

<p>
\[
\mathsf{E}\int I_{\mu,\omega}(t)\,d\mu(t) \le KS.
\]
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  \(J_\mu(t) \le L\,\mathsf{E}I_{\mu,\omega}(t)\) voor elke \(t\).
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  We bewijzen
  </p>
\[
\mathsf{P}(j_{0,\omega}(t)\le \bar j_0(t)) \ge 1/L,
\]
\[
n\ge 3\ \Rightarrow\ \mathsf{P}(j_{n-3,\omega}(t)\le \bar j_n(t)) \ge 1/2.
\]
  <p>
  Hieruit volgt \(\mathsf{E}r^{-j_{0,\omega}(t)} \ge r^{-j_0}/L\) en, voor \(n\ge 3\), \(\mathsf{E}2^{n-3}r^{-j_{n-3,\omega}(t)} \ge 2^n r^{-\bar j_n(t)}/L\). Door dit te sommeren en, voor \(n\le 2\), \(2^n r^{-\bar j_n(t)} \le 4r^{-j_0} \le 4\mathsf{E} r^{-j_{0,\omega}(t)}\) te gebruiken, omdat \((\bar j_n(t))\) stijgend is, volgt het lemma.
  </p>
  <p>
  Als \(j_0=\infty\), is de eerste ongelijkheid hierboven leeg. Anders zijn er \(s,t\in T\) met \(\varphi_{j_0+1}(s,t)>4\), en de voorwaarde op \(\psi_{j,\omega}\) geeft \(\mathsf{P}(\psi_{j_0+1,\omega}(s,t)>1) \ge 1-1/e\). Deze gebeurtenis dwingt \(j_{0,\omega}\le j_0\) af, wat de eerste ongelijkheid hierboven bewijst.
  </p>
  <p>
  Voor de tweede ongelijkheid hierboven, als \(\bar j_n(t)=\infty\) is er niets te bewijzen. Anders
  </p>
\[
\mu_1 := \mu(\{s\ ;\ \varphi_{\bar j_n(t)+1}(t,s)\le 2^n\}) \le
N_n^{-1}.
\]
  <p>
  Voor \(n\ge 2\) geeft de voorwaarde op \(\psi_{j,\omega}\), wanneer \(\varphi_{\bar j_n(t)+1}(s,t)\ge 2^n\), dat \(\mathsf{P}(\psi_{\bar j_n(t)+1,\omega}(s,t)\le 2^{n-2}) \le \exp(-2^{n-2}) \le N_{n-2}^{-1}\), zodat
  </p>
\[
\mathsf{E}\mu\big(\{s\ ;\ \varphi_{\bar j_n(t)+1}(s,t)\ge 2^n,\ \psi_{\bar
j_n(t)+1,\omega}(s,t)\le 2^{n-2}\}\big) \le N_{n-2}^{-1},
\]
  <p>
  en, met de ongelijkheid van Markov, met kans \(\ge 1/2\),
  </p>
\[
\mu_2 := \mu(\{s\ ;\ \varphi_{\bar j_n(t)+1}(s,t)\ge 2^n,\ \psi_{\bar
j_n(t)+1,\omega}(s,t)\le 2^{n-2}\}) \le 2N_{n-2}^{-1}.
\]
  <p>
  Op deze gebeurtenis, met de begrenzing van \(\mu_1\) hierboven, geldt \(\mu(\{s\ ;\ \psi_{\bar j_n(t)+1,\omega}(s,t) \ge 2^{n-2}\}) \le \mu_1+\mu_2 \le N_n^{-1}+2N_{n-2}^{-1} < N_{n-3}^{-1}\), zodat \(j_{n-3,\omega}(t) \le \bar j_n(t)\), wat de tweede ongelijkheid hierboven bewijst.
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs van het Hoofdlemma.</span>
  Combineer het vorige lemma met de getoonde begrenzing \(\mathsf{E}\int I_{\mu,\omega}(t)\,d\mu(t) \le KS\) hierboven.
  </p>
</div>

<p>
We zetten deze puntsgewijze begrenzing, geldig voor elke \(\mu\in M^+\), om naar een enkele maat. Het convexiteitslemma van Fernique is daarvoor het hulpmiddel.
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma (Fernique).</span>
  Laat \(a>0\), \(S\) een verzameling functies op een eindige verzameling \(T\). Als er voor elke kansmaat \(\nu\) op \(T\) een \(f\in S\) is met \(\int f\,d\nu\le a\), dan is er voor elke \(\varepsilon>0\) een \(f\) in de convexe omhulling van \(S\) met \(f\le a+\varepsilon\) overal.
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Laat \(S^+ = \{g\ ;\ \exists f\in S,\ g\ge f\}\), \(C\) de afgesloten convexe omhulling ervan. Stel dat de constante functie \(a\) niet in \(C\) ligt. Volgens Hahn&ndash;Banach is er een lineaire functionaal \(\phi\) met \(\phi(f)>\phi(a)\) voor \(f\in C\). Voor \(g\ge 0\), \(\lambda>0\), \(f\in S\), geldt \(f+\lambda g\in C\), zodat \(\phi(f)+\lambda\phi(g) >\phi(a)\), en door \(\lambda\to\infty\) te laten gaan, \(\phi(g)\ge 0\), dus \(\phi\) is positief. Omdat \(T\) eindig is, \(\phi(g) = \sum_{t}\alpha_t g(t)\), \(\alpha_t\ge 0\). Zet \(\beta=\sum_t\alpha_t\), \(\nu(\{t\})=\alpha_t/\beta\), zodat \(\phi(g) = \beta\int g\,d\nu\), en \(g=a\) geeft \(\beta a = \phi(a)\). Volgens de hypothese is er een \(f\in C\) met \(\int f\,d\nu\le a\), zodat \(\phi(f) = \beta\int f\,d\nu \le \beta a = \phi(a)\), een tegenspraak. Dus \(a\in C\), en het lemma volgt.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Stelling (Majorizing measure).</span>
  Neem aan dat \(T\) eindig is. Er is een kansmaat \(\mu\) op \(T\) met
  </p>
\[
\sup_{t\in T} J_\mu(t) \le KS.
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Laat \(\mathcal S = \{f = J_\mu\ ;\ \mu\in M^+\}\). Gegeven \(\nu\) op \(T\), neem \(\mu = \nu/2+\lambda/2\), met \(\lambda\) uniform, zodat \(\mu\ge\nu/2\) en, volgens het Hoofdlemma,
  </p>
\[
\int J_\mu\,d\nu \le 2\int J_\mu\,d\mu \le KS.
\]
  <p>
  Het lemma van Fernique toegepast op \(\mathcal S\) geeft een \(f\in\mathrm{conv}( \mathcal S)\) met \(f\le KS+\varepsilon\) overal. Er blijft te laten zien dat een convexe combinatie van de \(J_{\mu_i}\) op \(L\) na opnieuw een enkele \(J_\mu\) is. Fixeer \(t\). Voor \(n\ge 1\) zij
  </p>
\[
U_n := \Big\{i\ ;\ r^{-\bar j_{n,i}(t)} \le 2\sum_s \alpha_s r^{-\bar
j_{n,s}(t)}\Big\}.
\]
  <p>
  De ongelijkheid van Markov, toegepast op \(f(i)=r^{-\bar j_{n,i}(t)}\) onder \(P(\{i\})=\alpha_i\), geeft \(\sum_{i\in U_n}\alpha_i\ge 1/2\). Laat \(j_n\) het kleinste getal zijn met \(r^{-j_n} \le 2\sum_i\alpha_i r^{-\bar j_{n,i}(t)}\). Dan is \(\bar j_{n,i}(t)\ge j_n\) voor \(i\in U_n\), zodat \(\mu_i(B_{j_n}(t,2^n)) \ge N_n^{-1}\) voor zulke \(i\), en
  </p>
\[
\mu(B_{j_n}(t,2^n)) \ge N_n^{-1}\sum_{i\in U_n}\alpha_i \ge \frac1{2N_n}
\ge \frac1{N_{n+1}},
\]
  <p>
  zodat \(\bar j_{n+1}(t) \ge j_n\). Omdat \(\bar j_0(t) = j_0 = \bar j_{0,i}(t)\) voor alle \(i\),
  </p>
\[
\sum_n 2^n r^{-\bar j_n(t)} \le L\sum_n 2^n r^{-j_n} \le L\sum_i\alpha_i
\sum_n 2^n r^{-\bar j_{n,i}(t)} = L\sum_i\alpha_i J_{\mu_i}(t),
\]
  <p>
  dat wil zeggen \(J_\mu(t) \le L\sum_i\alpha_i J_{\mu_i}(t)\). Dit combineren met \(f\le KS+\varepsilon\) voor \(f=\sum_i\alpha_i J_{\mu_i}\) en \(\varepsilon\to 0\) laten gaan, geeft de begrenzing van de stelling.
  </p>
</div>

<p>
We gaan van \(\mu\) over naar een rij partities. Omdat de \(\varphi_j\) kwadraten van afstanden zijn, geldt \(\varphi_j(s,t)\le 2(\varphi_j(s,u)+\varphi_j(u,t))\). Dit geeft rechtstreeks dat als \(\varphi_j(s,t)>4a>0\), dan zijn \(B_j(s,a)\) en \(B_j(t,a)\) disjunct.
</p>

<p>
Neem aan dat \(T\) eindig is, \(\mu\) een kansmaat op \(T\), \(j_0\in\mathbb Z\) met \(\varphi_{j_0}(s,t)\le 4\) voor alle \(s,t\in T\), en, voor elke \(t\in T\), \(n\ge 0\), een geheel getal \(j_n(t)\) met
</p>

<p>
\[
j_0(t)=j_0,
\]
</p>

<p>
\[
j_n(t) \le j_{n+1}(t) \le j_n(t)+1,
\]
</p>

<p>
\[
\mu(B_{j_n(t)}(t,2^n)) \ge N_n^{-1}\quad (n\ge 1).
\]
</p>

<div class="math-env">
  <p><span class="math-env-label">Stelling (Van maten naar partities).</span>
  Er is een toelaatbare rij \((A_n)\) van \(T\) en \(j_n(A)\in\mathbb Z\) voor \(A\in A_n\) met
  </p>
\[
s,t\in A\in A_n\ \Rightarrow\ \varphi_{j_n(A)}(s,t) \le 2^{n+2},
\]
\[
\forall t\in T,\qquad \sum_{n\ge 0} 2^n r^{-j_n(A_n(t))} \le L\sum_{n\ge 0}
2^n r^{-j_n(t)}.
\]
</div>

<div class="math-env">
  <p><span class="math-env-label">Lemma (Partitioneringslemma).</span>
  Laat \(A\subset T\), \(j\in\mathbb Z\), \(n\ge 1\), \(\mu(B_j(t,2^n))\ge N_n^{-1}\) voor \(t\in A\). Er is een partitie \(\mathcal A\) van \(A\), \(\operatorname{card}\mathcal A\le N_n\), zodat voor \(B\in\mathcal A\),
  </p>
\[
s,t\in B\ \Rightarrow\ \varphi_j(s,t) \le 2^{n+4}.
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Laat \(U\subset A\) maximaal zijn met \(\varphi_j(s,t)>2^{n+2}\) voor verschillende \(s,t\in U\). De bollen \(B_j(t,2^n)\), \(t\in U\), zijn disjunct, elk van maat \(\ge N_n^{-1}\), zodat \(\operatorname{card} U\le N_n\). Door maximaliteit bedekken de bollen \(B_j(t,2^{n+2})\), \(t\in U\), de verzameling \(A\), en voldoen aan \(\varphi_j(s,t)\le 2^{n+4}\) voor \(s,t\) in dezelfde bol, via de quasi-driehoeksongelijkheid voor \(\varphi_j\). Elk punt van \(A\) toekennen aan de eerste bol die het bedekt, geeft \(\mathcal A\).
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs van de Stelling.</span>
  We construeren \(A_n\) en \(j_n(A)\), \(A\in A_n\), en behouden daarbij, voor \(n\ge 2\), \(A\in A_n\),
  </p>
\[
t\in A\ \Rightarrow\ j_{n-2}(t) = j_n(A).
\]
  <p>
  Begin met \(A_0=A_1=A_2=\{T\}\), \(j_n(T)=j_0\) voor \(n\le 2\). De behouden eigenschap geldt bij \(n=2\) omdat \(j_0(t)=j_0=j_2(T)\) voor alle \(t\).
  </p>
  <p>
  Gegeven \(A_n\), \(n\ge 2\), geldt voor \(A\in A_n\), via de behouden eigenschap, \(j_{n-2}(t)=j_n(A)\) voor \(t\in A\), zodat, via de toenamebegrenzing \(j_n(t)\le j_{n+1}(t)\le j_n(t)+1\) die hierboven is aangenomen, \(j_{n-1}(t)\in \{j_n(A),j_n(A)+1\}\) voor \(t\in A\). Zet
  </p>
\[
A^0 = \{t\in A\ ;\ j_{n-1}(t)=j_n(A)\}, \qquad A^1 = \{t\in A\ ;\
j_{n-1}(t)=j_n(A)+1\}.
\]
  <p>
  Via de maatbegrenzing \(\mu(B_{j_n(t)}(t,2^n))\ge N_n^{-1}\) hierboven, toegepast met \(n-1\) en \(j=j_n(A)+1\), splitst het partitioneringslemma \(A^1\) in ten hoogste \(N_{n-1}\) stukken \(B\) met \(\varphi_j(s,t)\le 2^{n+3}\) op \(B\). Zet \(j_{n+1}(B)=j_n(A)+1\) voor elk ervan, zodat de diameterbegrenzing van de stelling geldt bij \(n+1\). Laat \(A^0\) ongesplitst, \(j_{n+1}(A^0)=j_n(A^0)\). Dit splitst \(A\) in ten hoogste \(N_{n-1}+1\le N_n\) stukken, zodat \(\operatorname{card} A_{n+1}\le N_n^2=N_{n+1}\). De behouden eigenschap geldt bij \(n+1\) per constructie, en dus ook de diameterbegrenzing van de stelling. En de sombegrenzing van de stelling volgt omdat \(j_n(A_n(t))=j_0\) voor \(n\le 2\) en \(j_n(A_n(t))=j_{n-2}(t)\) voor \(n\ge 2\), via de behouden eigenschap.
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs van de Algemene Ondergrens.</span>
  Neem aan dat \(T\) eindig is. Laat \(\mu\) gegeven zijn door de Stelling en \(\bar j_n(t)\) de bijbehorende gehele getallen. Zet \(j_n(t) = \min_{0\le p\le n}(\bar j_p(t)+n-p)\), zodat \(j_0(t)=\bar j_0(t)=j_0\), \(j_n(t)\le j_{n+1}(t)\le j_n(t)+1\). Omdat \(j_n(t)\le \bar j_n(t)\), geldt \(\mu(B_{j_n(t)}(t,2^n))\ge N_n^{-1}\). En \(r^{-j_n(t)} \le \sum_{p\le n} r^{-\bar j_p(t)-n+p}\), zodat, met \(r\ge 4\),
  </p>
\[
\sum_{n\ge 0} 2^n r^{-j_n(t)} \le \sum_{p\ge 0} 2^p r^{-\bar j_p(t)}
\sum_{n\ge p} (2/r)^{n-p} \le 2J_\mu(t) \le 2KS,
\]
  <p>
  via de begrenzing van de stelling over de majorizing measure. De Stelling rondt het eindige geval af.
  </p>
  <p>
  Voor aftelbare \(T\), schrijf \(T=\bigcup_k T_k\), met \(T_k\) eindig en stijgend. Pas het eindige geval toe op elke \(T_k\), wat toelaatbare \((A_{n,k})\) geeft. Nummer \((A_{n,k,\ell})_{\ell\le N_n}\), en voor \(t\in T_k\) laat \(\ell_{n,k}(t)\) de index zijn. Voor vaste \(t,n\) is \(\ell_{n,k}(t)\) uiteindelijk gedefinieerd en, na een deelrij, uiteindelijk gelijk aan \(\ell_n(t)\). Toelaatbaarheid geeft \(\bar\ell_{n,k}(\ell)\le N_{n-1}\) met \(A_{n,k,\ell}\subset A_{n-1,k,\bar\ell_{n,k}(\ell)}\), uiteindelijk, na een verdere deelrij, gelijk aan \(\bar\ell_n(\ell)\). Zet \(A_{n,\ell} = \{t\ ;\ \ell_n(t)=\ell\}\), een partitie van \(T\), \(\operatorname{card} A_n\le N_n\), en voor \(t\in A_{n,\ell}\), \(k\) groot, \(t\in A_{n,k,\ell}\subset A_{n-1,k, \bar\ell_{n,k}(\ell)} = A_{n-1,\bar\ell_n(\ell)}\), zodat \(A_{n,\ell}\subset A_{n-1,\bar\ell_n(\ell)}\) en \((A_n)\) toelaatbaar is. Als \((j_0(T_k))_k\) onbegrensd is, dan \(\varphi_j\le 4\) overal voor alle \(j\), en de afstandsbegrenzing van de stelling is triviaal. Anders is \((j_0(T_k))_k\) begrensd, zodat, via de verstrengelingseigenschap \(j_{n-1}(C)\le j_n(A)\le j_{n-1}(C)+1\) van de stelling, elke \((j_n(A_{n,k,\ell}))_k\) begrensd is, dus uiteindelijk, na een deelrij, gelijk aan \(j_n(A_{n,\ell})\). Deze voldoen aan de vereiste eigenschappen.
  </p>
</div>

<p>
We wenden ons tot de stelling van Giné&ndash;Zinn. Fixeer een klasse \(T\) van functies op \(\Omega\), onafhankelijke \((X_i)_{i\le N}\) met waarden in \(\Omega\), een onafhankelijke Bernoulli-rij \((\varepsilon_i)_{i\le N}\), en \(\bar S(T) = \mathsf{E}\sup_{t\in T}|\sum_{i\le N}\varepsilon_i t(X_i)|\).
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  \(\mathsf{E}\sup_{t\in T}\sum_{i\le N}(t(X_i)-\mathsf{E}t(X_i)) \le 2\bar S(T)\).
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Laat \((X_i')\) een onafhankelijke kopie van \((X_i)\) zijn. De ongelijkheid van Jensen, met de verwachting in \(X_i'\) links binnen het supremum genomen en rechts erbuiten, geeft
  </p>
\[
\mathsf{E}\sup_{t\in T}\sum_{i\le N}(t(X_i)-\mathsf{E}t(X_i)) \le
\mathsf{E}\sup_{t\in T}\sum_{i\le N}(t(X_i)-t(X_i')).
\]
  <p>
  De processen \((t(X_i)-t(X_i'))_i\) en \((\varepsilon_i(t(X_i)-t(X_i')))_i\) hebben dezelfde verdeling, zodat de rechterzijde gelijk is aan \(\mathsf{E}\sup_t\sum_i \varepsilon_i(t(X_i)-t(X_i'))\), en de driehoeksongelijkheid rondt het af.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  \(\mathsf{E}\sup_{t\in T}\sum_{i\le N}\varepsilon_i|t(X_i)| \le 2\bar S(T)\).
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Het contractieprincipe, \(\mathsf{E}\sup_t\sum_i\varepsilon_i|t_i|\le 2\mathsf{E}\sup_t|\sum_i\varepsilon_i t_i|\), toegepast bij vaste \((X_i)_{i\le N}\).
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs van de stelling van Giné&ndash;Zinn.</span>
  Schrijf \(\sum_i|t(X_i)| = \sum_i\mathsf{E}|t(X_i)| + \sum_i(|t(X_i)|- \mathsf{E}|t(X_i)|)\), zodat
  </p>
\[
\mathsf{E}\sup_{t\in T}\sum_i|t(X_i)| \le \sup_{t\in T}\sum_i\mathsf{E}
|t(X_i)| + \mathsf{E}\sup_{t\in T}\sum_i\big(|t(X_i)|-\mathsf{E}|t(X_i)|
\big).
\]
  <p>
  De eerste twee lemma's, toegepast op \(\{|t|\ ;\ t\in T\}\), begrenzen de tweede term door \(4\bar S(T)\).
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  Als \(\mathsf{E}t(X_i)=0\) voor alle \(t\in T\), \(i\le N\), dan \(\bar S(T) \le 2\mathsf{E}\sup_{t\in T}\sum_{i\le N} t(X_i)\).
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Conditioneer op \((\varepsilon_i)\), zet \(I=\{i\ ;\ \varepsilon_i=1\}\), \(J=\{i\ ;\ \varepsilon_i=-1\}\),
  </p>
\[
\mathsf{E}\sup_{t\in T}\sum_i\varepsilon_i t(X_i) \le \mathsf{E}\sup_{t\in
T}\sum_{i\in I}t(X_i) + \mathsf{E}\sup_{t\in T}\sum_{i\in J}t(X_i).
\]
  <p>
  Met \(\mathsf{E}_J\) de verwachting in \(X_i\), \(i\in J\), geldt \(\mathsf{E}_J X_i=X_i\) voor \(i\in I\), \(\mathsf{E}_J X_i = 0\) voor \(i\notin I\), en \(\mathsf{E}t(X_i)=0\) geeft, via Jensen,
  </p>
\[
\sup_{t\in T}\sum_{i\in I}t(X_i) = \sup_{t\in T}\mathsf{E}_J\sum_{i\le N}
t(X_i) \le \mathsf{E}_J\sup_{t\in T}\sum_{i\le N} t(X_i),
\]
  <p>
  zodat \(\mathsf{E}\sup_{t\in T}\sum_{i\in I}t(X_i) \le \mathsf{E}\sup_{t\in T}\sum_{i\le N}t(X_i)\), en analoog voor \(J\).
  </p>
</div>

<p>
We bewijzen de Fundamentele Stelling van Empirische Processen. Beschouw onafhankelijke \((X_i)_{i\le N}\) met waarden in \(\Omega\), \(\lambda_i\) de verdeling van \(X_i\), \(\nu=\sum_{i\le N}\lambda_i\), en een verzameling \(T\) van functies op \(\Omega\). Schrijf
</p>

<p>
\[
S(T) = \mathsf{E}\sup_{t\in T}\sum_{i\le N}\varepsilon_i t(X_i), \qquad
\bar S(T) = \mathsf{E}\sup_{t\in T}\Big|\sum_{i\le N}\varepsilon_i
t(X_i)\Big|.
\]
</p>

<p>
We mogen aannemen dat \(0\in T\), omdat het vervangen van \(T\) door \(T-t_0\) \(S(T)\) ongewijzigd laat, en een decompositie van \(T-t_0\) zich laat vertalen naar \(T\). Omdat \(0\in T\), \(\bar S(T)\le 2S(T)\). Voor \(i\le N\) zet \(Z_i(t)=t(X_i)\), \(Z_i=0\) voor \(i>N\), zodat de \((Z_i)_{i\ge 1}\) onafhankelijk zijn, \(S=\mathsf{E}\sup_t\sum_i \varepsilon_i Z_i(t)=S(T)\), en \(\varphi_j(s,t) = \int|r^j(s-t)|^2\wedge 1\,d\nu\). Laat \(j_0=j_0(T)\) het gehele getal zijn dat gegeven wordt door de afstandsbegrenzing van de Algemene Ondergrens, \(\varphi_{j_0}(s,t)\le 4\) op \(T\).
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma.</span>
  Voor \(t\in T\), \(\int|t|1_{\{2|t|\ge r^{-j_0}\}}\,d\nu \le L\bar S(T) \le LS(T)\).
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Omdat \(0\in T\), geeft \(\varphi_{j_0}(0,t)\le 4\) dat \(\int|r^{j_0}t|^2\wedge 1\,d\nu\le 4\). Met \(U=\{2|t|\ge r^{-j_0}\}\), \(\nu(U)\le 16\), zodat \(\sum_{i\le N}\lambda_i(U)\le 16\). Laat \(\mathcal A = \{i\ ;\ \lambda_i(U)\ge 1/2\}\), \(\operatorname{card}\mathcal A\le 32\). Voor \(i\le N\) laat \(\Xi_i\) de gebeurtenis zijn dat \(X_i\in U\) en \(X_j\notin U\) voor \(j\ne i\), \(j\notin\mathcal A\). Omdat \(1-\lambda_j(U)\ge\exp(-2\lambda_j(U))\) voor \(j\notin\mathcal A\), geldt \(\mathsf{P}(\Xi_i) \ge \lambda_i(U)/L\). Gegeven \(\Xi_i\) is \(X_i\) verdeeld als \(\lambda_i\) beperkt tot \(U\), zodat
  </p>
\[
\int_U|t|\,d\lambda_i \le L\,\mathsf{E}1_{\Xi_i}|t(X_i)| \le
L\,\mathsf{E}1_{\Xi_i}\Big|\sum_{j\le N}\varepsilon_j t(X_j)\Big|,
\]
  <p>
  via Jensen, door de \(\varepsilon_j\), \(j\ne i\), buiten de absolute waarde te middelen. Omdat \(\sum_{i\notin\mathcal A}1_{\Xi_i}\le 1\), \(\sum_{i\le N}1_{\Xi_i}\le 33\), en door te sommeren over \(i\le N\), met \(\bar S(T)\le 2S(T)\), volgt het lemma.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Propositie.</span>
  \(T\subset T_1+T_2\), \(0\in T_1\), en
  </p>
\[
\gamma_2(T_1,d_2) + \gamma_1(T_1,d_\infty) \le LS(T),
\]
\[
\forall t\in T_2,\qquad \int|t|\,d\nu \le LS(T).
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Pas de Algemene Ondergrens toe en dan de decompositiestelling voor het peaky deel, waarbij wat daar \(T_3\) heet in \(T_2\) opgenomen wordt. Het vorige lemma geeft de tweede begrenzing van de propositie.
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs van de Decompositiestelling.</span>
  Door de eerste begrenzing van de propositie te combineren met de chaining-begrenzing \(S(T_1)\le L(\gamma_2(T_1,d_2)+\gamma_1(T_1,d_\infty))\) volgt \(S(T_1)\le LS(T)\), zodat \(\bar S(T_1)\le LS(T)\) omdat \(0\in T_1\). Door \(T_2\) te vervangen door \(T_2\cap(T-T_1)\), mogen we aannemen dat \(T_2\subset T-T_1\), zodat \(\bar S(T_2) \le \bar S(T)+\bar S(T_1) \le LS(T)\). Met de tweede begrenzing van de propositie geeft de stelling van Giné&ndash;Zinn \(\mathsf{E}\sup_{t\in T_2}\sum_{i\le N}|t(X_i)| \le LS(T)\).
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs van de Fundamentele Stelling van Empirische Processen.</span>
  Pas het vorige bewijs toe met \(\lambda_i=\mu\) onafhankelijk van \(i\), zodat \(\nu=N\mu\). Dan \(\gamma_2(T_1,d_{2,\nu}) = \sqrt N\gamma_2(T_1, d_{2,\mu})\), wat \(\gamma_2(T_1,d_2) \le LS_N(\mathcal F)/\sqrt N\) geeft. De begrenzing op \(\gamma_1(T_1,d_\infty)\) blijft ongewijzigd. Het lemma dat \(\bar S\) vergelijkt met de getekende som onder centrering zet de tweede begrenzing van de propositie om in de begrenzing op \(\mathsf{E}\sup_{t\in T_2}\sum_i|t(X_i)|\) uit de stelling.
  </p>
</div>

<p>
Dit sluit de ketting die loopt van de stelling van Latała&ndash;Bednorz via het Hoofdlemma, de majorizing measure, de partities, de algemene ondergrens, en de stelling van Giné&ndash;Zinn, tot de Fundamentele Stelling van Empirische Processen. Chaining tegenover afwezigheid van opheffing, voor het eerst geïsoleerd voor lineaire somen van tekens, beheerst de grootte van somen van onafhankelijke willekeurige functies in volle algemeenheid, en precies de machinerie die is opgebouwd voor het Bernoulli-vermoeden is de machinerie die het bewijst.
</p>

</div>

<p><a href="{{ '/nl/blogposts/#articles' | relative_url }}">&larr; Terug naar artikelen</a></p>
