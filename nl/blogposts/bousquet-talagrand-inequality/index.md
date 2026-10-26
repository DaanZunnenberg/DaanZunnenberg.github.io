---
layout: default
title: Bewijs van Bousquets ongelijkheid
permalink: /nl/blogposts/bousquet-talagrand-inequality/
---

<section class="hero">
  <img class="hero-img" src="{{ '/images/chalk.png' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Concentratie van Maat &middot; Entropiemethode</div>
    <h1 class="hero-name">De Bousquet&ndash;Talagrand-ongelijkheid</h1>
    <p class="hero-lede">De entropiemethode: een concentratiegrens van Bernstein-type voor het supremum van een empirisch proces.</p>
  </div>
</section>

<div class="article-body">

<h2>Inleiding</h2>

<p>
We bewijzen Bousquets ongelijkheid voor suprema van empirische processen, volgens de notatie van Boucheron, Lugosi en Massart, <em>Concentration Inequalities</em>. De methode is de entropiemethode: sub-additiviteit van entropie (de tensorisatie-ongelijkheid van Gross, Ledoux, Bobkov&ndash;Ledoux en Latała&ndash;Oleszkiewicz), de dualiteitsformule voor entropie, en de aangepaste logaritmische Sobolev-ongelijkheid van Ledoux en Massart. We gebruiken ook de Efron&ndash;Stein-ongelijkheid om de variantie te beheersen die in Bousquets grens optreedt. Er wordt geen convexe afstand en geen transportargument gebruikt.
</p>

<h2>De Efron&ndash;Stein-ongelijkheid</h2>

<p>
Laat \(X_1,\dots,X_n\) onafhankelijke stochastische variabelen zijn en \(Z=f(X)\) een kwadratisch integreerbare functie van \(X=(X_1,\dots,X_n)\). Voor \(i\le n\) schrijven we \(X^{(i)} = (X_1,\dots,X_{i-1},X_{i+1},\dots,X_n)\) en laat \(\mathsf E^{(i)}\) de voorwaardelijke verwachting gegeven \(X^{(i)}\) aanduiden.
</p>

<div class="math-env">
  <p><span class="math-env-label">Stelling 1 (Efron&ndash;Stein-ongelijkheid).</span></p>
\[
\mathrm{Var}(Z) \le \sum_{i=1}^n \mathsf E\big[(Z-\mathsf E^{(i)}Z)^2\big].
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Laat \(\mathsf E^i\) de voorwaardelijke verwachting gegeven \((X_1,\dots,X_i)\) aanduiden, met \(\mathsf E^0=\mathsf E\), en stel \(\Delta_i = \mathsf E^iZ-\mathsf E^{i-1}Z\). Dan is \(Z-\mathsf EZ=\sum_{i=1}^n\Delta_i\), en voor \(j>i\) geldt \(\mathsf E^i\Delta_j=0\), dus \(\mathsf E^i[\Delta_i\Delta_j]=\Delta_i\mathsf E^i\Delta_j=0\) en bijgevolg \(\mathsf E[\Delta_i\Delta_j]=0\). De \(\Delta_i\) zijn dus orthogonaal in \(L^2\) en
  </p>
\[
\mathrm{Var}(Z) = \mathsf E\Big[\Big(\sum_{i=1}^n\Delta_i\Big)^2\Big] =
\sum_{i=1}^n \mathsf E[\Delta_i^2].
\]
  <p>
  Door de stelling van Fubini geldt \(\mathsf E^i[\mathsf E^{(i)}Z] = \mathsf E^{i-1}Z\), dus \(\Delta_i = \mathsf E^i[Z-\mathsf E^{(i)}Z]\). Door de ongelijkheid van Jensen toegepast op de voorwaardelijke verwachting \(\mathsf E^i\),
  </p>
\[
\mathsf E[\Delta_i^2] \le \mathsf E\big[(Z-\mathsf E^{(i)}Z)^2\big].
\]
  <p>
  Sommeren over \(i\) geeft de stelling.
  </p>
</div>

<h2>Entropie en haar sub-additiviteit</h2>

<p>
Voor een niet-negatieve stochastische variabele \(Y\) met \(\mathsf E\Phi(Y)<\infty\), waarbij \(\Phi(x)=x\log x\) voor \(x>0\) en \(\Phi(0)=0\), is de entropie van \(Y\)
</p>

<p>
\[
\mathrm{Ent}(Y) = \mathsf E\Phi(Y) - \Phi(\mathsf E Y).
\]
</p>

<p>
Door convexiteit van \(\Phi\) geldt \(\mathrm{Ent}(Y)\ge 0\). Voor \(Y\) een functie van \(X\) schrijven we \(\mathrm{Ent}^{(i)}(Y)\) voor de entropie van \(Y\) onder de voorwaardelijke wet gegeven \(X^{(i)}\),
</p>

<p>
\[
\mathrm{Ent}^{(i)}(Y) = \mathsf E^{(i)}\Phi(Y) - \Phi\big(\mathsf E^{(i)}Y\big).
\]
</p>

<p>
\(X_1,\dots,X_n\) nemen waarden aan in een aftelbare verzameling \(\mathcal X\). Als \(Q\) en \(P\) kansmaten op \(\mathcal X^n\) zijn met \(Q\) absoluut continu ten opzichte van \(P\), schrijven we \(D(Q\|P) = \mathsf E_P[(dQ/dP)\log(dQ/dP)]\) voor de Kullback&ndash;Leibler-divergentie, en, wanneer \(P=P_1\otimes\cdots\otimes P_n\), \(Q^{(i)}\), \(P^{(i)}\) voor de marginalen op \(\mathcal X^{n-1}\) die ontstaan door de \(i\)-de coordinaat weg te laten.
</p>

<div class="math-env">
  <p><span class="math-env-label">Stelling 2 (Hans ongelijkheid voor relatieve entropieen).</span>
  Laat \(P=P_1\otimes\cdots\otimes P_n\) een productkansmaat op \(\mathcal X^n\) zijn en \(Q\) een kansmaat op \(\mathcal X^n\). Dan geldt
  </p>
\[
D(Q\|P) \le \sum_{i=1}^n \big(D(Q\|P) - D(Q^{(i)}\|P^{(i)})\big).
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Schrijf \(p,q,p^{(i)},q^{(i)}\) voor de kansfuncties van \(P,Q,P^{(i)},Q^{(i)}\). Omdat \(P\) een productmaat is, geldt \(p(x) = p^{(i)}(x^{(i)})p_i(x_i)\) voor elke \(i\), en \(p(x)=\prod_{i=1}^n p_i(x_i)\). Hieruit volgt
  </p>
\[
\sum_{x} q(x)\log p(x) = \frac1n\sum_{i=1}^n\sum_x q(x)\log
p^{(i)}(x^{(i)}) + \frac1n \sum_x q(x)\log p(x),
\]
  <p>
  met \(\sum_i \log p_i(x_i)=\log p(x)\), en na herschikken,
  </p>
\[
\sum_x q(x)\log p(x) = \frac{1}{n-1}\sum_{i=1}^n \sum_{x^{(i)}}
q^{(i)}(x^{(i)}) \log p^{(i)}(x^{(i)}).
\]
  <p>
  Hans ongelijkheid voor Shannon-entropie, toegepast op de \(n\) marginalen die ontstaan door telkens een coordinaat weg te laten, stelt
  </p>
\[
\sum_x q(x)\log q(x) \ge \frac{1}{n-1}\sum_{i=1}^n \sum_{x^{(i)}}
q^{(i)}(x^{(i)})\log q^{(i)}(x^{(i)}).
\]
  <p>
  Door de twee formules term voor term van elkaar af te trekken, en met \(D(Q\|P)=\sum_x q(x)\log q(x) - \sum_x q(x)\log p(x)\), krijgen we \(D(Q\|P) \ge \frac{1}{n-1}\sum_i D(Q^{(i)}\|P^{(i)})\), wat de gestelde ongelijkheid is.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Stelling 3 (Sub-additiviteit van entropie).</span>
  Laat \(f:\mathcal X^n\to[0,\infty)\) en \(Z=f(X)\). Dan geldt
  </p>
\[
\mathrm{Ent}(Z) \le \mathsf E\Big[\sum_{i=1}^n \mathrm{Ent}^{(i)}(Z)\Big].
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Beide zijden zijn invariant onder schaling van \(Z\) met een positieve constante, dus we mogen \(\mathsf EZ=1\) aannemen. Laat \(P\) de verdeling van \(X\) zijn, met kansfunctie \(p\), en laat \(Q\) kansfunctie \(q(x)=f(x)p(x)\) hebben, een kansmaat omdat \(\mathsf EZ=1\). Dan
  </p>
\[
\mathrm{Ent}(Z) = \mathsf E[Z\log Z] = \sum_x q(x)\log\frac{q(x)}{p(x)} =
D(Q\|P).
\]
  <p>
  Men controleert vanuit de definities dat \(q^{(i)}(x^{(i)}) = \mathsf E^{(i)}[Z]\,p^{(i)}(x^{(i)})\), dus
  </p>
\[
D(Q^{(i)}\|P^{(i)}) = \sum_{x^{(i)}} q^{(i)}(x^{(i)})\log
\frac{q^{(i)}(x^{(i)})}{p^{(i)}(x^{(i)})} = \mathsf E\big[\Phi(\mathsf
E^{(i)}Z)\big].
\]
  <p>
  Door de verwachting van \(\mathsf E^{(i)}[Z\log Z]=\mathsf E^{(i)}\Phi(Z)\) over \(X^{(i)}\) te nemen, krijgen we \(\mathsf E[\Phi(Z)]=\mathsf E\big[\mathsf E^{(i)}\Phi(Z)\big]\), dus
  </p>
\[
\mathsf E\big[\mathrm{Ent}^{(i)}(Z)\big] = \mathsf E\big[\mathsf
E^{(i)}\Phi(Z)-\Phi(\mathsf E^{(i)}Z)\big] = \mathsf E[\Phi(Z)] -
D(Q^{(i)}\|P^{(i)}) = D(Q\|P) - D(Q^{(i)}\|P^{(i)}).
\]
  <p>
  Sommeren over \(i\) en toepassen van Stelling 2 voltooit het bewijs.
  </p>
</div>

<h2>De dualiteitsformule voor entropie</h2>

<div class="math-env">
  <p><span class="math-env-label">Stelling 4 (Dualiteitsformule voor entropie).</span>
  Laat \(Y\ge0\) met \(\mathsf E\Phi(Y)<\infty\). Dan geldt
  </p>
\[
\mathrm{Ent}(Y) = \sup_{U:\,\mathsf Ee^U=1} \mathsf E[UY].
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Fixeer \(U\) met \(\mathsf Ee^U=1\) en laat \(\mathsf E_{e^UP}\) de verwachting aanduiden onder de maat met dichtheid \(e^U\) ten opzichte van de onderliggende maat \(P\). Stel \(W=Ye^{-U}\). Omdat \(\Phi\) convex is,
  </p>
\[
\mathrm{Ent}(Y)-\mathsf E[UY] = \mathsf E_{e^UP}[\Phi(W)] -
\Phi\big(\mathsf E_{e^UP}[W]\big) = \mathrm{Ent}_{e^UP}(W) \ge 0,
\]
  <p>
  met \(\mathsf E_{e^UP}[W]=\mathsf E[Y]\). Gelijkheid geldt wanneer \(W\) constant is onder \(e^UP\), dat is, wanneer \(e^U=Y/\mathsf EY\), een toelaatbare keuze. Dit bewijst zowel de ongelijkheid als dat het supremum wordt aangenomen.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Gevolg 5.</span>
  Voor elke niet-negatieve stochastische variabele \(Y\) en elke constante \(u>0\),
  </p>
\[
\mathrm{Ent}(Y) \le \mathsf E\big[Y\log Y - Y\log u - (Y-u)\big],
\]
  <p>
  met gelijkheid wanneer \(u=\mathsf EY\).
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Fixeer \(Y\) en beschouw \(h(u) = \mathsf E[Y\log Y] - (\mathsf EY)\log u - \mathsf EY + u\) voor \(u>0\). Dan \(h(u)=\mathsf E[Y\log Y - Y\log u - Y+u]\). Omdat \(h'(u)=-(\mathsf EY)/u+1\), wordt \(h\) uniek geminimaliseerd bij \(u=\mathsf EY\), waar \(h(\mathsf EY)=\mathrm{Ent}(Y)\). Dus \(h(u)\ge h(\mathsf EY)=\mathrm{Ent}(Y)\) voor elke \(u>0\).
  </p>
</div>

<p>
We gebruiken Gevolg 5 voorwaardelijk: als \(Y\) een positieve functie is van \(X_1,\dots,X_n\) en \(Y_i\) \(X^{(i)}\)-meetbaar is, dan geeft toepassing van het gevolg onder de voorwaardelijke wet gegeven \(X^{(i)}\), met \(u=Y_i\),
</p>

<p>
\[
\mathsf E^{(i)}[Y\log Y] - (\mathsf E^{(i)}Y)\log(\mathsf E^{(i)}Y) \le
\mathsf E^{(i)}\big[Y\log Y - Y\log Y_i - (Y-Y_i)\big]. \qquad (1)
\]
</p>

<h2>De aangepaste logaritmische Sobolev-ongelijkheid</h2>

<p>
Laat \(Z=f(X)\) en, voor elke \(i\), \(Z_i=f_i(X^{(i)})\) voor een willekeurige functie \(f_i:\mathcal X^{n-1}\to\mathbb R\).
</p>

<div class="math-env">
  <p><span class="math-env-label">Stelling 6 (Aangepaste logaritmische Sobolev-ongelijkheid).</span>
  Laat \(\varphi(x) = e^x-x-1\). Dan geldt voor alle \(\lambda\in\mathbb R\),
  </p>
\[
\lambda\, \mathsf E\big[Ze^{\lambda Z}\big] - \mathsf E\big[e^{\lambda
Z}\big]\log \mathsf E\big[e^{\lambda Z}\big] \le \sum_{i=1}^n \mathsf
E\big[e^{\lambda Z}\varphi(-\lambda(Z-Z_i))\big].
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Pas (1) toe met \(Y=e^{\lambda Z}\), \(Y_i=e^{\lambda Z_i}\):
  </p>
\[
\mathrm{Ent}^{(i)}(e^{\lambda Z}) \le \mathsf E^{(i)}\Big[e^{\lambda
Z}\big(\lambda(Z-Z_i) - (1-e^{-\lambda(Z-Z_i)})\big)\Big] = \mathsf
E^{(i)}\big[e^{\lambda Z}\varphi(-\lambda(Z-Z_i))\big],
\]
  <p>
  met \(e^{\lambda Z}-e^{\lambda Z_i} = e^{\lambda Z}(1-e^{-\lambda(Z-Z_i)})\) en de definitie van \(\varphi\). Neem verwachtingen, sommeer over \(i\), en pas Stelling 3 toe op de niet-negatieve functie \(e^{\lambda f}\):
  </p>
\[
\mathrm{Ent}(e^{\lambda Z}) \le \sum_{i=1}^n \mathsf E\big[e^{\lambda
Z}\varphi(-\lambda(Z-Z_i))\big].
\]
  <p>
  Omdat \(\mathrm{Ent}(e^{\lambda Z}) = \lambda\mathsf E[Ze^{\lambda Z}] - \mathsf E[e^{\lambda Z}]\log\mathsf E[e^{\lambda Z}]\), is dit de stelling.
  </p>
</div>

<h2>Zelfbegrenzende functies</h2>

<div class="math-env">
  <p><span class="math-env-label">Definitie (Zelfbegrenzende functie).</span>
  Een niet-negatieve functie \(f:\mathcal X^n\to[0,\infty)\) heeft de zelfbegrenzende eigenschap als er \(f_i:\mathcal X^{n-1}\to[0,\infty)\) bestaan zodat voor alle \(x\in\mathcal X^n\) en \(i\le n\),
  </p>
\[
0 \le f(x)-f_i(x^{(i)}) \le 1, \qquad \sum_{i=1}^n \big(f(x)-f_i(x^{(i)})\big)
\le f(x).
\]
</div>

<p>
Als \(Z=f(X)\) voor een zelfbegrenzende \(f\), geeft Stelling 1 \(\mathrm{Var}(Z)\le \mathsf EZ\). De volgende stelling verscherpt dit tot een exponentiele ongelijkheid.
</p>

<div class="math-env">
  <p><span class="math-env-label">Stelling 7.</span>
  Laat \(\varphi(v)=e^v-v-1\) en \(h(u)=(1+u)\log(1+u)-u\) voor \(u\ge-1\). Als \(Z=f(X)\) voor een zelfbegrenzende \(f\), dan geldt voor elke \(\lambda\in\mathbb R\),
  </p>
\[
\log \mathsf Ee^{\lambda(Z-\mathsf EZ)} \le \varphi(\lambda)\,\mathsf EZ.
\]
  <p>
  Bijgevolg geldt voor \(t>0\),
  </p>
\[
\mathsf P(Z\ge \mathsf EZ+t) \le \exp\big(-h(t/\mathsf EZ)\,\mathsf EZ\big).
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Schrijf \(Z_i=f_i(X^{(i)})\). Omdat \(\varphi\) convex is met \(\varphi(0)=0\), geldt voor \(u\in[0,1]\) en elke \(\lambda\), \(\varphi(-\lambda u)\le u\varphi(-\lambda)\). Omdat \(Z-Z_i\in[0,1]\), geven Stelling 6 en \(\sum_i(Z-Z_i)\le Z\)
  </p>
\[
\lambda\mathsf E[Ze^{\lambda Z}] - \mathsf E[e^{\lambda Z}]\log\mathsf
E[e^{\lambda Z}] \le \varphi(-\lambda) \sum_{i=1}^n \mathsf E\big[e^{\lambda
Z}(Z-Z_i)\big] \le \varphi(-\lambda)\,\mathsf E\big[Ze^{\lambda Z}\big].
\]
  <p>
  Laat \(F(\lambda)=\mathsf Ee^{\lambda(Z-\mathsf EZ)}\) en \(G(\lambda)=\log F(\lambda)\). Door de bovenstaande ongelijkheid te herschrijven in termen van \(F\) en \(G\),
  </p>
\[
\big[\lambda-\varphi(-\lambda)\big]G'(\lambda) - G(\lambda) \le
\varphi(-\lambda)\,\mathsf EZ.
\]
  <p>
  Omdat \(\lambda-\varphi(-\lambda)=1-e^{-\lambda}\), luidt dit, met \(\rho(\lambda)=(1-e^{-\lambda})G'(\lambda)-G(\lambda)\),
  </p>
\[
\rho(\lambda) \le \varphi(-\lambda)\,\mathsf EZ.
\]
  <p>
  Voor \(\lambda\ne0\) geldt \(\big(G(\lambda)/(e^\lambda-1)\big)' = \big(e^\lambda G'(\lambda)-e^\lambda G(\lambda)\big)/(e^\lambda-1)^2 = e^\lambda\rho(\lambda)/(e^\lambda-1)^2\). Dus, met \(G(0)=G'(0)=0\) en integreren van \(0\) tot \(\lambda>0\),
  </p>
\[
\frac{G(\lambda)}{e^\lambda-1} \le \mathsf EZ \int_0^\lambda
\frac{e^x\varphi(-x)}{(e^x-1)^2}\,dx = \mathsf EZ\int_0^\lambda
\Big(\frac{-1}{e^x-1}+\frac{x}{(e^x-1)^2}\cdot 0\Big)dx,
\]
  <p>
  en een directe controle dat \(\dfrac{d}{dx}\Big(\dfrac{-x}{e^x-1}\Big) = \dfrac{e^x\varphi(-x)}{(e^x-1)^2}\) (beide zijden zijn gelijk aan \(\frac{1-e^x+xe^x}{(e^x-1)^2}\)) geeft
  </p>
\[
\frac{G(\lambda)}{e^\lambda-1} \le \mathsf EZ\Big[\frac{-x}{e^x-1}\Big]_0^\lambda
= \mathsf EZ\Big(1-\frac{\lambda}{e^\lambda-1}\Big),
\]
  <p>
  met \(\lim_{x\to0}x/(e^x-1)=1\). Vermenigvuldigen met \(e^\lambda-1\) geeft \(G(\lambda)\le \mathsf EZ\,(e^\lambda-1-\lambda) = \varphi(\lambda)\,\mathsf EZ\), voor \(\lambda>0\). Dezelfde berekening, met de integraal nu genomen van \(\lambda<0\) tot \(0\), geeft dezelfde grens voor \(\lambda<0\), en is triviaal bij \(\lambda=0\). De rechterzijde is de logaritmische momentgenererende functie van een gecentreerde Poisson\((\mathsf EZ)\)-variabele, en de staartgrens volgt uit de standaard Chernoff-berekening voor de Poisson-verdeling.
  </p>
</div>

<h2>Suprema van empirische processen</h2>

<p>
Laat \(X_1,\dots,X_n\) onafhankelijke, identiek verdeelde stochastische vectoren zijn, geindexeerd door een verzameling \(T\), dat is \(X_i=(X_{i,s})_{s\in T}\), met \(\mathsf EX_{i,s}=0\) en \(X_{i,s}\le 1\) voor alle \(i,s\). Stel
</p>

<p>
\[
Z = \sup_{s\in T} \sum_{i=1}^n X_{i,s}, \qquad \sigma^2 = \sup_{s\in T}
\sum_{i=1}^n \mathsf EX_{i,s}^2.
\]
</p>

<p>
Voor \(i\le n\), laat \(Z_i = \sup_{s\in T}\sum_{j\ne i}X_{j,s}\), en laat \(\hat s\in T\), \(\hat s_i\in T\) de suprema realiseren die \(Z\) en \(Z_i\) definieren.
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma 8.</span>
  Laat \(Y_i=X_{i,\hat s_i}\). Dan geldt \(Y_i\le Z-Z_i\le 1\), \(\mathsf E^{(i)}Y_i=0\), \(Y_i\le1\), en \(\sum_{i=1}^n (Z-Z_i)\le Z\). Bijgevolg
  </p>
\[
\mathsf E^{(i)}\big[(Z-Z_i)^2\big] \le 2\,\mathsf E^{(i)}[Z-Z_i] + \mathsf
E^{(i)}[Y_i^2].
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Omdat \(Z=\sum_{j}X_{j,\hat s}\ge \sum_{j\ne i}X_{j,\hat s}\),
  </p>
\[
X_{i,\hat s_i} = \sum_j X_{j,\hat s_i} - \sum_{j\ne i}X_{j,\hat s_i} \le
Z - Z_i \le \sum_j X_{j,\hat s} - \sum_{j\ne i}X_{j,\hat s} = X_{i,\hat s}
\le 1,
\]
  <p>
  wat \(Y_i\le Z-Z_i\le1\) geeft. Sommeren van de linker ongelijkheid hierboven over \(i\) geeft \(\sum_i(Z-Z_i) \le \sum_i X_{i,\hat s} = Z\). Omdat \(\mathsf EX_{i,s}=0\) voor alle \(s\), geldt \(\mathsf E^{(i)}Y_i=\mathsf E^{(i)}X_{i,\hat s_i}=0\), omdat \(\hat s_i\) \(X^{(i)}\)-meetbaar is. Voor de laatste ongelijkheid, pas \(\phi(x)=x^2-2x\) toe op \(x=Z-Z_i\): omdat \((Z-Z_i)-Y_i\ge0\) en \((Z-Z_i)-1\le0\le Y_i-1\), dus \(\big((Z-Z_i)-1\big)+(Y_i-1)\le0\),
  </p>
\[
\phi(Z-Z_i)-\phi(Y_i) = \big[(Z-Z_i)-Y_i\big]\Big[\big((Z-Z_i)-1\big)+
(Y_i-1)\Big] \le 0,
\]
  <p>
  dus \(\mathsf E^{(i)}\phi(Z-Z_i)\le\mathsf E^{(i)}\phi(Y_i)\), dat is, \(\mathsf E^{(i)}(Z-Z_i)^2 \le 2\mathsf E^{(i)}(Z-Z_i) + \mathsf E^{(i)}Y_i^2 - 2\mathsf E^{(i)}Y_i\), wat de bewering is omdat \(\mathsf E^{(i)}Y_i=0\).
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Stelling 9.</span>
  \(\mathrm{Var}(Z) \le 2\mathsf EZ+\sigma^2\).
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Door Stelling 1 en Lemma 8,
  </p>
\[
\mathrm{Var}(Z) \le \sum_{i=1}^n \mathsf E\big[(Z-Z_i)^2\big] \le
\sum_{i=1}^n \Big(2\mathsf E[Z-Z_i] + \mathsf EY_i^2\Big) \le 2\mathsf EZ +
\sum_{i=1}^n \mathsf EY_i^2.
\]
  <p>
  Omdat \(Y_i=X_{i,\hat s_i}\) en \(\hat s_i\in T\), geldt \(\mathsf EY_i^2 \le \sup_{s\in T}\mathsf EX_{i,s}^2\), dus \(\sum_i \mathsf EY_i^2 \le \sigma^2\), met gebruik van \(\sum_i(Z-Z_i)\le Z\) uit Lemma 8 in de tussenstap.
  </p>
</div>

<h2>Twee elementaire lemma's</h2>

<div class="math-env">
  <p><span class="math-env-label">Lemma 10.</span>
  Laat \(g\) niet-dalend en continu differentieerbaar zijn op een interval \(I\ni0\), met \(g(0)=0\), \(g'(0)>0\), \(g(x)\ne0\) voor \(x\ne0\). Laat \(\rho\) continu zijn op \(I\) en \(G\) oneindig differentieerbaar op \(I\) met \(G(0)=G'(0)=0\) en
  </p>
\[
g(\lambda)G'(\lambda)-g'(\lambda)G(\lambda) \le g(\lambda)^2\rho(\lambda),
\qquad \lambda\in I.
\]
  <p>
  Dan geldt \(G(\lambda) \le g(\lambda)\int_0^\lambda\rho(x)\,dx\) voor \(\lambda\in I\).
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Stel \(\rho_G(\lambda)=G(\lambda)/g(\lambda)\) voor \(\lambda\ne0\) en \(\rho_G(0)=0\). Door de regel van l'Hopital is \(\rho_G\) continu differentieerbaar op \(I\) met \(\rho_G'(\lambda) = \big(g(\lambda)G'(\lambda)-g'(\lambda) G(\lambda)\big)/g(\lambda)^2\) voor \(\lambda\ne0\), en \(\rho_G'(0)=G''(0)/ (2g'(0))\). De hypothese geeft \(\rho_G'(\lambda)\le\rho(\lambda)\) voor \(\lambda\ne0\), dus voor alle \(\lambda\in I\) door continuiteit. Dus \(\Delta(\lambda) = \int_0^\lambda\rho(x)\,dx - \rho_G(\lambda)\) is niet-dalend op \(I\), en \(\Delta(0)=0\) dwingt \(\Delta\) om het teken van \(\lambda\) te hebben, hetzelfde teken als \(g(\lambda)\). Dus \(\Delta(\lambda)g(\lambda)\ge0\) op \(I\), wat de bewering is.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Lemma 11.</span>
  Laat \(f,g:I\to\mathbb R\) tweemaal differentieerbaar zijn op een interval \(I\ni0\), met \(f(0)=g(0)=f'(0)=g'(0)=0\), \(g''(0)>0\), en \(xg'(x)>0\) voor \(x\ne0\). Als \(f''g'-f'g''\ge0\) op \(I\), dan is \(\rho=f/g\), uitgebreid met \(\rho(0)=f''(0)/ g''(0)\), continu en niet-dalend op \(I\).
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Omdat \(g(0)=0\) en \(xg'(x)>0\) voor \(x\ne0\), geldt \(g(x)\ne0\) voor \(x\ne0\), dus \(\rho\) is goed gedefinieerd en tweemaal differentieerbaar buiten \(0\), en continu bij \(0\) door de regel van l'Hopital. Voor \(x\ne0\) heeft \(\rho'(x)\) het teken van
  </p>
\[
g'(x)\Big(\frac{f'(x)}{g'(x)}-\frac{f(x)}{g(x)}\Big) = \frac{g'(x)}{x}
\cdot x\Big(\frac{f'(x)}{g'(x)}-\frac{f(x)}{g(x)}\Big).
\]
  <p>
  De eerste factor is positief omdat \(xg'(x)>0\). Door de middelwaardestelling toegepast op \(f/g\) is er een \(c\) tussen \(0\) en \(x\) met \(f'(c)/g'(c) = f(x)/g(x)\). Omdat \(f''g'-f'g''\ge0\), is de functie \(f'/g'\), met waarde \(f''(0)/g''(0)\) bij \(0\), niet-dalend op \(I\), dus \(x(f'(c)/g'(c)) \le x(f'(x)/g'(x))\), wat de tweede factor \(\ge0\) geeft. Dus \(\rho'(x)\ge0\) voor \(x\ne0\), en \(\rho\) is niet-dalend.
  </p>
</div>

<h2>Bousquets ongelijkheid</h2>

<p>
We behouden de notatie van hoofdstuk 6: \(Z=\sup_{s\in T}\sum_i X_{i,s}\), \(\sigma^2\), \(Z_i\), \(Y_i\). Stel \(v=2\mathsf EZ+\sigma^2\), zodat \(\mathrm{Var}(Z) \le v\) door Stelling 9. Laat \(\varphi(u)=e^u-u-1\) en \(h(u)=(1+u)\log(1+u)-u\).
</p>

<div class="math-env">
  <p><span class="math-env-label">Stelling 12 (Bousquets ongelijkheid).</span>
  Voor alle \(\lambda\ge0\),
  </p>
\[
\log\mathsf Ee^{\lambda(Z-\mathsf EZ)} \le v\varphi(\lambda).
\]
  <p>
  Voor alle \(t\ge0\),
  </p>
\[
\mathsf P(Z\ge \mathsf EZ+t) \le e^{-vh(t/v)} \le \exp\Big(-\frac{t^2}
{2(v+t/3)}\Big).
\]
</div>

<div class="math-env">
  <p><span class="math-env-label">Lemma 13.</span>
  Voor \(\beta\ge0\), \(\lambda\ge0\), \(x\le1\),
  </p>
\[
\frac{\varphi(-\lambda x)}{\varphi(-\lambda)} \le \frac{x+\big(\beta
x^2-x\big)e^{-\lambda x}}{1+(\beta-1)e^{-\lambda}}.
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Voor \(\lambda=0\) verdwijnen beide zijden. Fixeer \(\lambda>0,\beta\ge0\) en stel
  </p>
\[
f(x) = e^{\lambda x}\varphi(-\lambda x) = \lambda xe^{\lambda x} -
e^{\lambda x}+1, \qquad g(x) = xe^{\lambda x}+\beta x^2-x,
\]
  <p>
  zodat \(\varphi(-\lambda x) = f(x)e^{-\lambda x}\) en de rechterzijde van het lemma gelijk is aan \(g(x)e^{-\lambda x}/(g(1)e^{-\lambda})\), omdat \(g(1)e^{-\lambda} = 1+(\beta-1)e^{-\lambda}\). Ook \(\varphi(-\lambda) = f(1)e^{-\lambda}\). De bewering is dus \(f(x)/f(1) \le g(x)/g(1)\) voor \(x\le1\), dat is \(\rho(x):=f(x)/g(x) \le \rho(1)\), dus het volstaat te laten zien dat \(\rho\) niet-dalend is op \((-\infty,1]\). Een directe berekening geeft
  </p>
\[
xg'(x) = x^2\big(\lambda e^{\lambda x}+2\beta\big) + x(e^{\lambda x}-1) > 0
\quad (x\ne0),
\]
  <p>
  omdat beide termen niet-negatief zijn en niet beide nul, en
  </p>
\[
f''(x)g'(x)-f'(x)g''(x) = \lambda^2 e^{\lambda x}\big(\varphi(\lambda x) +
2\beta\lambda x^2\big) \ge 0.
\]
  <p>
  Lemma 11 geeft dat \(\rho=f/g\) niet-dalend is op \((-\infty,1]\), wat de bewering is.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Lemma 14.</span>
  Laat \(f(\lambda)=\varphi(\lambda)+\lambda/2\) en \(G(\lambda)=\log\mathsf Ee^{\lambda(Z-\mathsf EZ)}\). Dan geldt voor \(\lambda\ge0\),
  </p>
\[
f(\lambda)G'(\lambda) - f'(\lambda)G(\lambda) \le \frac v2 \big(\lambda
f'(\lambda)-f(\lambda)\big).
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs.</span>
  Door Stelling 6,
  </p>
\[
\mathrm{Ent}(e^{\lambda Z}) \le \sum_{i=1}^n \mathsf E\big[e^{\lambda
Z}\varphi(-\lambda(Z-Z_i))\big].
\]
  <p>
  Omdat \(Z-Z_i\le1\), geeft Lemma 13 met \(\beta=1/2\), voor elke \(i\),
  </p>
\[
\varphi(-\lambda(Z-Z_i))e^{\lambda Z} \le \theta(\lambda)\Big[(Z-Z_i)
e^{\lambda Z} + \Big(\tfrac12(Z-Z_i)^2-(Z-Z_i)\Big)e^{\lambda Z_i}\Big],
\qquad \theta(\lambda)=\frac{\varphi(-\lambda)}{1-\tfrac12e^{-\lambda}}.
\]
  <p>
  Door \(\mathsf E^{(i)}\) te nemen en Lemma 8 te gebruiken,
  </p>
\[
\mathsf E^{(i)}\Big[\tfrac12(Z-Z_i)^2-(Z-Z_i)\Big] \le \tfrac12\mathsf
E^{(i)}[Y_i^2] \le \tfrac12\sup_{s\in T}\mathsf E[X_{i,s}^2].
\]
  <p>
  Door \(\mathsf E^{(i)}[Z-Z_i]\ge0\) en de ongelijkheid van Jensen, \(e^{\lambda Z_i} \le e^{\lambda\mathsf E^{(i)}Z} \le \mathsf E^{(i)}e^{\lambda Z}\), dus
  </p>
\[
\mathsf E^{(i)}\big[\varphi(-\lambda(Z-Z_i))e^{\lambda Z}\big] \le
\theta(\lambda)\,\mathsf E^{(i)}\Big[\Big(Z-Z_i +\tfrac12\sup_{s\in T}
\mathsf E[X_{i,s}^2]\Big)e^{\lambda Z}\Big].
\]
  <p>
  Sommeren over \(i\), met \(\sum_i(Z-Z_i)\le Z\) en \(\sum_i\sup_{s\in T}\mathsf EX_{i,s}^2=\sigma^2\),
  </p>
\[
\mathrm{Ent}(e^{\lambda Z}) \le \theta(\lambda)\,\mathsf E\Big[\Big(Z+
\frac{\sigma^2}{2}\Big)e^{\lambda Z}\Big] = \theta(\lambda)\,\mathsf
E\Big[(Z-\mathsf EZ)e^{\lambda Z}\Big] + \theta(\lambda)\Big(\mathsf EZ+
\frac{\sigma^2}{2}\Big)\mathsf Ee^{\lambda Z}.
\]
  <p>
  Delen door \(\mathsf Ee^{\lambda(Z-\mathsf EZ)}\), en met \(v/2=\mathsf EZ+\sigma^2/2\),
  </p>
\[
\lambda G'(\lambda) - G(\lambda) \le \theta(\lambda)\Big(G'(\lambda) +
\frac v2\Big).
\]
  <p>
  Herschrijf dit als \((\lambda-\theta(\lambda))G'(\lambda) - G(\lambda) \le \theta(\lambda)v/2\). Omdat \(f(\lambda)=\varphi(\lambda)+\lambda/2\) voldoet aan \(f'(\lambda)=e^\lambda-1/2>0\) voor \(\lambda\ge0\), geeft een directe berekening
  </p>
\[
f(\lambda) - f'(\lambda)\big(\lambda-\theta(\lambda)\big) =
f(\lambda)+f'(\lambda)\theta(\lambda) - \lambda f'(\lambda) = 0,
\]
  <p>
  dat is \(\theta(\lambda) = \lambda - f(\lambda)/f'(\lambda)\), equivalent \(f'(\lambda)(\lambda-\theta(\lambda))=f(\lambda)\). Vermenigvuldigen van de weergegeven ongelijkheid met \(f'(\lambda)>0\),
  </p>
\[
f(\lambda)G'(\lambda) - f'(\lambda)G(\lambda) \le f'(\lambda)\theta(\lambda)
\frac v2 = \big(\lambda f'(\lambda)-f(\lambda)\big)\frac v2,
\]
  <p>
  met nogmaals \(f'(\lambda)\theta(\lambda) = f'(\lambda)\lambda - f(\lambda)\). Dit is het lemma.
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Bewijs van Stelling 12.</span>
  Laat \(g(\lambda) = \dfrac{v}{2}\cdot\dfrac{\lambda f'(\lambda)-f(\lambda)} {f(\lambda)^2}\) voor \(\lambda>0\) en \(g(0)=v\), continu op \([0,\infty)\). Lemma 14 stelt \(f(\lambda)G'(\lambda)-f'(\lambda)G(\lambda) \le f(\lambda)^2g(\lambda)\) voor \(\lambda\ge0\), de hypothese van Lemma 10 met \(g=f\). Lemma 10 geeft, voor \(\lambda\ge0\),
  </p>
\[
G(\lambda) \le f(\lambda)\cdot \frac v2 \int_0^\lambda \frac{xf'(x)-f(x)}
{f(x)^2}\,dx.
\]
  <p>
  Omdat \(\big(-x/f(x)\big)' = \big(xf'(x)-f(x)\big)/f(x)^2\) en \(\lim_{x\to0} x/f(x)=2\) (omdat \(f(x)\sim x^2/2\) nabij \(0\)), is de integraal gelijk aan \(2-\lambda/ f(\lambda)\), dus
  </p>
\[
G(\lambda) \le f(\lambda)\cdot\frac v2\Big(2-\frac{\lambda}{f(\lambda)}\Big)
= v\Big(f(\lambda)-\frac\lambda2\Big) = v\varphi(\lambda),
\]
  <p>
  wat de eerste bewering is. De staartgrens volgt uit de standaard Chernoff-berekening voor momentgenererende functies van sub-gamma-type, begrensd door \(v\varphi(\lambda)\) (paragraaf 2.2), en de tweede ongelijkheid uit de elementaire grens \(h(u)\ge u^2/(2+2u/3)\) voor \(u\ge0\).
  </p>
</div>

<p>
Sub-additiviteit van entropie tensoriseert de entropie van \(Z=f(X)\) in bijdragen per coordinaat. De dualiteitsformule zet dit om in de variationele grens van Gevolg 5, voorwaardelijk toegepast om de aangepaste logaritmische Sobolev-ongelijkheid te geven. Voor zelfbegrenzende functies integreert deze ongelijkheid direct tot een Poissonachtige grens op de logaritmische momentgenererende functie. Voor het supremum van een empirisch proces zijn de increments \(Z-Z_i\) niet zelfbegrenzend in de strikte zin, maar Lemma 8, zelf een toepassing van de Efron&ndash;Stein-ongelijkheid, beheerst hun voorwaardelijke tweede moment door \(2(Z-Z_i)+Y_i^2\). Lemma 13, bewezen met hetzelfde monotone-verhouding-argument als Lemma 10, zet deze controle om in de differentiaalongelijkheid van Lemma 14, die Lemma 10 vervolgens exact integreert, wat Bousquets ongelijkheid geeft.
</p>

</div>

<p><a href="{{ '/nl/blogposts/#articles' | relative_url }}">&larr; Terug naar Artikelen</a></p>
