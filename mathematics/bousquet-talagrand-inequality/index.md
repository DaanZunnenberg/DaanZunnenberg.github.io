---
layout: default
title: Proof of Bousquet's Inequality
permalink: /mathematics/bousquet-talagrand-inequality/
---

<h1>The Bousquet&ndash;Talagrand Inequality</h1>
<p class="tagline">The entropy method: a Bernstein-type concentration bound for the supremum of an empirical process.</p>

<h2>Introduction</h2>

<p>
We prove Bousquet's inequality for suprema of empirical processes, following the notation of Boucheron, Lugosi and Massart, <em>Concentration Inequalities</em>. The method is the entropy method: sub-additivity of entropy (the tensorisation inequality of Gross, Ledoux, Bobkov&ndash;Ledoux and Latała&ndash;Oleszkiewicz), the duality formula for entropy, and the modified logarithmic Sobolev inequality of Ledoux and Massart. We also use the Efron&ndash;Stein inequality to control the variance that enters Bousquet's bound. No convex distance and no transportation argument is used.
</p>

<h2>The Efron&ndash;Stein inequality</h2>

<p>
Let \(X_1,\dots,X_n\) be independent random variables and \(Z=f(X)\) a square-integrable function of \(X=(X_1,\dots,X_n)\). For \(i\le n\) write \(X^{(i)} = (X_1,\dots,X_{i-1},X_{i+1},\dots,X_n)\) and let \(\mathsf E^{(i)}\) denote conditional expectation given \(X^{(i)}\).
</p>

<div class="math-env">
  <p><span class="math-env-label">Theorem 1 (Efron&ndash;Stein inequality).</span></p>
\[
\mathrm{Var}(Z) \le \sum_{i=1}^n \mathsf E\big[(Z-\mathsf E^{(i)}Z)^2\big].
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Proof.</span>
  Let \(\mathsf E^i\) denote conditional expectation given \((X_1,\dots,X_i)\), with \(\mathsf E^0=\mathsf E\), and set \(\Delta_i = \mathsf E^iZ-\mathsf E^{i-1}Z\). Then \(Z-\mathsf EZ=\sum_{i=1}^n\Delta_i\), and for \(j>i\), \(\mathsf E^i\Delta_j=0\), so \(\mathsf E^i[\Delta_i\Delta_j]=\Delta_i\mathsf E^i\Delta_j=0\) and hence \(\mathsf E[\Delta_i\Delta_j]=0\). The \(\Delta_i\) are therefore orthogonal in \(L^2\) and
  </p>
\[
\mathrm{Var}(Z) = \mathsf E\Big[\Big(\sum_{i=1}^n\Delta_i\Big)^2\Big] =
\sum_{i=1}^n \mathsf E[\Delta_i^2].
\]
  <p>
  By Fubini's theorem, \(\mathsf E^i[\mathsf E^{(i)}Z] = \mathsf E^{i-1}Z\), so \(\Delta_i = \mathsf E^i[Z-\mathsf E^{(i)}Z]\). By Jensen's inequality applied to the conditional expectation \(\mathsf E^i\),
  </p>
\[
\mathsf E[\Delta_i^2] \le \mathsf E\big[(Z-\mathsf E^{(i)}Z)^2\big].
\]
  <p>
  Summing over \(i\) gives the theorem.
  </p>
</div>

<h2>Entropy and its sub-additivity</h2>

<p>
For a nonnegative random variable \(Y\) with \(\mathsf E\Phi(Y)<\infty\), where \(\Phi(x)=x\log x\) for \(x>0\) and \(\Phi(0)=0\), the entropy of \(Y\) is
</p>

<p>
\[
\mathrm{Ent}(Y) = \mathsf E\Phi(Y) - \Phi(\mathsf E Y).
\]
</p>

<p>
By convexity of \(\Phi\), \(\mathrm{Ent}(Y)\ge 0\). For \(Y\) a function of \(X\), we write \(\mathrm{Ent}^{(i)}(Y)\) for the entropy of \(Y\) under the conditional law given \(X^{(i)}\),
</p>

<p>
\[
\mathrm{Ent}^{(i)}(Y) = \mathsf E^{(i)}\Phi(Y) - \Phi\big(\mathsf E^{(i)}Y\big).
\]
</p>

<p>
\(X_1,\dots,X_n\) take values in a countable set \(\mathcal X\). If \(Q\) and \(P\) are probability measures on \(\mathcal X^n\) with \(Q\) absolutely continuous with respect to \(P\), we write \(D(Q\|P) = \mathsf E_P[(dQ/dP)\log(dQ/dP)]\) for the Kullback&ndash;Leibler divergence, and, when \(P=P_1\otimes\cdots\otimes P_n\), \(Q^{(i)}\), \(P^{(i)}\) for the marginals on \(\mathcal X^{n-1}\) obtained by omitting the \(i\)-th coordinate.
</p>

<div class="math-env">
  <p><span class="math-env-label">Theorem 2 (Han's inequality for relative entropies).</span>
  Let \(P=P_1\otimes\cdots\otimes P_n\) be a product probability measure on \(\mathcal X^n\) and \(Q\) a probability measure on \(\mathcal X^n\). Then
  </p>
\[
D(Q\|P) \le \sum_{i=1}^n \big(D(Q\|P) - D(Q^{(i)}\|P^{(i)})\big).
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Proof.</span>
  Write \(p,q,p^{(i)},q^{(i)}\) for the mass functions of \(P,Q,P^{(i)},Q^{(i)}\). Since \(P\) is a product measure, \(p(x) = p^{(i)}(x^{(i)})p_i(x_i)\) for every \(i\), and \(p(x)=\prod_{i=1}^n p_i(x_i)\). Hence
  </p>
\[
\sum_{x} q(x)\log p(x) = \frac1n\sum_{i=1}^n\sum_x q(x)\log
p^{(i)}(x^{(i)}) + \frac1n \sum_x q(x)\log p(x),
\]
  <p>
  using \(\sum_i \log p_i(x_i)=\log p(x)\), and rearranging,
  </p>
\[
\sum_x q(x)\log p(x) = \frac{1}{n-1}\sum_{i=1}^n \sum_{x^{(i)}}
q^{(i)}(x^{(i)}) \log p^{(i)}(x^{(i)}).
\]
  <p>
  Han's inequality for Shannon entropy, applied to the \(n\) marginals obtained by omitting each coordinate in turn, states
  </p>
\[
\sum_x q(x)\log q(x) \ge \frac{1}{n-1}\sum_{i=1}^n \sum_{x^{(i)}}
q^{(i)}(x^{(i)})\log q^{(i)}(x^{(i)}).
\]
  <p>
  Subtracting the two displays, term by term, and recalling \(D(Q\|P)=\sum_x q(x)\log q(x) - \sum_x q(x)\log p(x)\), we get \(D(Q\|P) \ge \frac{1}{n-1}\sum_i D(Q^{(i)}\|P^{(i)})\), which is the stated inequality.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Theorem 3 (Sub-additivity of entropy).</span>
  Let \(f:\mathcal X^n\to[0,\infty)\) and \(Z=f(X)\). Then
  </p>
\[
\mathrm{Ent}(Z) \le \mathsf E\Big[\sum_{i=1}^n \mathrm{Ent}^{(i)}(Z)\Big].
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Proof.</span>
  Both sides are invariant under scaling \(Z\) by a positive constant, so we may assume \(\mathsf EZ=1\). Let \(P\) be the law of \(X\), with mass function \(p\), and let \(Q\) have mass function \(q(x)=f(x)p(x)\), a probability measure since \(\mathsf EZ=1\). Then
  </p>
\[
\mathrm{Ent}(Z) = \mathsf E[Z\log Z] = \sum_x q(x)\log\frac{q(x)}{p(x)} =
D(Q\|P).
\]
  <p>
  One checks from the definitions that \(q^{(i)}(x^{(i)}) = \mathsf E^{(i)}[Z]\,p^{(i)}(x^{(i)})\), so
  </p>
\[
D(Q^{(i)}\|P^{(i)}) = \sum_{x^{(i)}} q^{(i)}(x^{(i)})\log
\frac{q^{(i)}(x^{(i)})}{p^{(i)}(x^{(i)})} = \mathsf E\big[\Phi(\mathsf
E^{(i)}Z)\big].
\]
  <p>
  Taking the expectation of \(\mathsf E^{(i)}[Z\log Z]=\mathsf E^{(i)}\Phi(Z)\) over \(X^{(i)}\) gives \(\mathsf E[\Phi(Z)]=\mathsf E\big[\mathsf E^{(i)}\Phi(Z)\big]\), so
  </p>
\[
\mathsf E\big[\mathrm{Ent}^{(i)}(Z)\big] = \mathsf E\big[\mathsf
E^{(i)}\Phi(Z)-\Phi(\mathsf E^{(i)}Z)\big] = \mathsf E[\Phi(Z)] -
D(Q^{(i)}\|P^{(i)}) = D(Q\|P) - D(Q^{(i)}\|P^{(i)}).
\]
  <p>
  Summing over \(i\) and applying Theorem 2 finishes the proof.
  </p>
</div>

<h2>The duality formula for entropy</h2>

<div class="math-env">
  <p><span class="math-env-label">Theorem 4 (Duality formula for entropy).</span>
  Let \(Y\ge0\) with \(\mathsf E\Phi(Y)<\infty\). Then
  </p>
\[
\mathrm{Ent}(Y) = \sup_{U:\,\mathsf Ee^U=1} \mathsf E[UY].
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Proof.</span>
  Fix \(U\) with \(\mathsf Ee^U=1\) and let \(\mathsf E_{e^UP}\) denote expectation under the measure with density \(e^U\) against the underlying measure \(P\). Set \(W=Ye^{-U}\). Since \(\Phi\) is convex,
  </p>
\[
\mathrm{Ent}(Y)-\mathsf E[UY] = \mathsf E_{e^UP}[\Phi(W)] -
\Phi\big(\mathsf E_{e^UP}[W]\big) = \mathrm{Ent}_{e^UP}(W) \ge 0,
\]
  <p>
  using \(\mathsf E_{e^UP}[W]=\mathsf E[Y]\). Equality holds when \(W\) is constant under \(e^UP\), that is, when \(e^U=Y/\mathsf EY\), an admissible choice. This proves both the inequality and that the supremum is attained.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Corollary 5.</span>
  For any nonnegative random variable \(Y\) and any constant \(u>0\),
  </p>
\[
\mathrm{Ent}(Y) \le \mathsf E\big[Y\log Y - Y\log u - (Y-u)\big],
\]
  <p>
  with equality when \(u=\mathsf EY\).
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Proof.</span>
  Fix \(Y\) and consider \(h(u) = \mathsf E[Y\log Y] - (\mathsf EY)\log u - \mathsf EY + u\) for \(u>0\). Then \(h(u)=\mathsf E[Y\log Y - Y\log u - Y+u]\). Since \(h'(u)=-(\mathsf EY)/u+1\), \(h\) is minimised uniquely at \(u=\mathsf EY\), where \(h(\mathsf EY)=\mathrm{Ent}(Y)\). So \(h(u)\ge h(\mathsf EY)=\mathrm{Ent}(Y)\) for every \(u>0\).
  </p>
</div>

<p>
We use Corollary 5 conditionally: if \(Y\) is a positive function of \(X_1,\dots,X_n\) and \(Y_i\) is \(X^{(i)}\)-measurable, applying the corollary under the conditional law given \(X^{(i)}\), with \(u=Y_i\),
</p>

<p>
\[
\mathsf E^{(i)}[Y\log Y] - (\mathsf E^{(i)}Y)\log(\mathsf E^{(i)}Y) \le
\mathsf E^{(i)}\big[Y\log Y - Y\log Y_i - (Y-Y_i)\big]. \qquad (1)
\]
</p>

<h2>The modified logarithmic Sobolev inequality</h2>

<p>
Let \(Z=f(X)\) and, for each \(i\), \(Z_i=f_i(X^{(i)})\) for an arbitrary function \(f_i:\mathcal X^{n-1}\to\mathbb R\).
</p>

<div class="math-env">
  <p><span class="math-env-label">Theorem 6 (Modified logarithmic Sobolev inequality).</span>
  Let \(\varphi(x) = e^x-x-1\). Then for all \(\lambda\in\mathbb R\),
  </p>
\[
\lambda\, \mathsf E\big[Ze^{\lambda Z}\big] - \mathsf E\big[e^{\lambda
Z}\big]\log \mathsf E\big[e^{\lambda Z}\big] \le \sum_{i=1}^n \mathsf
E\big[e^{\lambda Z}\varphi(-\lambda(Z-Z_i))\big].
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Proof.</span>
  Apply (1) with \(Y=e^{\lambda Z}\), \(Y_i=e^{\lambda Z_i}\):
  </p>
\[
\mathrm{Ent}^{(i)}(e^{\lambda Z}) \le \mathsf E^{(i)}\Big[e^{\lambda
Z}\big(\lambda(Z-Z_i) - (1-e^{-\lambda(Z-Z_i)})\big)\Big] = \mathsf
E^{(i)}\big[e^{\lambda Z}\varphi(-\lambda(Z-Z_i))\big],
\]
  <p>
  using \(e^{\lambda Z}-e^{\lambda Z_i} = e^{\lambda Z}(1-e^{-\lambda(Z-Z_i)})\) and the definition of \(\varphi\). Take expectations, sum over \(i\), and apply Theorem 3 to the nonnegative function \(e^{\lambda f}\):
  </p>
\[
\mathrm{Ent}(e^{\lambda Z}) \le \sum_{i=1}^n \mathsf E\big[e^{\lambda
Z}\varphi(-\lambda(Z-Z_i))\big].
\]
  <p>
  Since \(\mathrm{Ent}(e^{\lambda Z}) = \lambda\mathsf E[Ze^{\lambda Z}] - \mathsf E[e^{\lambda Z}]\log\mathsf E[e^{\lambda Z}]\), this is the theorem.
  </p>
</div>

<h2>Self-bounding functions</h2>

<div class="math-env">
  <p><span class="math-env-label">Definition (Self-bounding function).</span>
  A nonnegative function \(f:\mathcal X^n\to[0,\infty)\) has the self-bounding property if there exist \(f_i:\mathcal X^{n-1}\to[0,\infty)\) such that for all \(x\in\mathcal X^n\) and \(i\le n\),
  </p>
\[
0 \le f(x)-f_i(x^{(i)}) \le 1, \qquad \sum_{i=1}^n \big(f(x)-f_i(x^{(i)})\big)
\le f(x).
\]
</div>

<p>
If \(Z=f(X)\) for a self-bounding \(f\), Theorem 1 gives \(\mathrm{Var}(Z)\le \mathsf EZ\). The next theorem sharpens this to an exponential inequality.
</p>

<div class="math-env">
  <p><span class="math-env-label">Theorem 7.</span>
  Let \(\varphi(v)=e^v-v-1\) and \(h(u)=(1+u)\log(1+u)-u\) for \(u\ge-1\). If \(Z=f(X)\) for a self-bounding \(f\), then for every \(\lambda\in\mathbb R\),
  </p>
\[
\log \mathsf Ee^{\lambda(Z-\mathsf EZ)} \le \varphi(\lambda)\,\mathsf EZ.
\]
  <p>
  Consequently, for \(t>0\),
  </p>
\[
\mathsf P(Z\ge \mathsf EZ+t) \le \exp\big(-h(t/\mathsf EZ)\,\mathsf EZ\big).
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Proof.</span>
  Write \(Z_i=f_i(X^{(i)})\). Since \(\varphi\) is convex with \(\varphi(0)=0\), for \(u\in[0,1]\) and any \(\lambda\), \(\varphi(-\lambda u)\le u\varphi(-\lambda)\). Since \(Z-Z_i\in[0,1]\), Theorem 6 and \(\sum_i(Z-Z_i)\le Z\) give
  </p>
\[
\lambda\mathsf E[Ze^{\lambda Z}] - \mathsf E[e^{\lambda Z}]\log\mathsf
E[e^{\lambda Z}] \le \varphi(-\lambda) \sum_{i=1}^n \mathsf E\big[e^{\lambda
Z}(Z-Z_i)\big] \le \varphi(-\lambda)\,\mathsf E\big[Ze^{\lambda Z}\big].
\]
  <p>
  Let \(F(\lambda)=\mathsf Ee^{\lambda(Z-\mathsf EZ)}\) and \(G(\lambda)=\log F(\lambda)\). Rewriting the inequality above in terms of \(F\) and \(G\),
  </p>
\[
\big[\lambda-\varphi(-\lambda)\big]G'(\lambda) - G(\lambda) \le
\varphi(-\lambda)\,\mathsf EZ.
\]
  <p>
  Since \(\lambda-\varphi(-\lambda)=1-e^{-\lambda}\), this reads, writing \(\rho(\lambda)=(1-e^{-\lambda})G'(\lambda)-G(\lambda)\),
  </p>
\[
\rho(\lambda) \le \varphi(-\lambda)\,\mathsf EZ.
\]
  <p>
  For \(\lambda\ne0\), \(\big(G(\lambda)/(e^\lambda-1)\big)' = \big(e^\lambda G'(\lambda)-e^\lambda G(\lambda)\big)/(e^\lambda-1)^2 = e^\lambda\rho(\lambda)/(e^\lambda-1)^2\). So, using \(G(0)=G'(0)=0\) and integrating from \(0\) to \(\lambda>0\),
  </p>
\[
\frac{G(\lambda)}{e^\lambda-1} \le \mathsf EZ \int_0^\lambda
\frac{e^x\varphi(-x)}{(e^x-1)^2}\,dx = \mathsf EZ\int_0^\lambda
\Big(\frac{-1}{e^x-1}+\frac{x}{(e^x-1)^2}\cdot 0\Big)dx,
\]
  <p>
  and a direct check that \(\dfrac{d}{dx}\Big(\dfrac{-x}{e^x-1}\Big) = \dfrac{e^x\varphi(-x)}{(e^x-1)^2}\) (both sides equal \(\frac{1-e^x+xe^x}{(e^x-1)^2}\)) gives
  </p>
\[
\frac{G(\lambda)}{e^\lambda-1} \le \mathsf EZ\Big[\frac{-x}{e^x-1}\Big]_0^\lambda
= \mathsf EZ\Big(1-\frac{\lambda}{e^\lambda-1}\Big),
\]
  <p>
  using \(\lim_{x\to0}x/(e^x-1)=1\). Multiplying by \(e^\lambda-1\) gives \(G(\lambda)\le \mathsf EZ\,(e^\lambda-1-\lambda) = \varphi(\lambda)\,\mathsf EZ\), for \(\lambda>0\). The same computation, with the integral now taken from \(\lambda<0\) to \(0\), gives the same bound for \(\lambda<0\), and it is trivial at \(\lambda=0\). The right side is the logarithmic moment generating function of a centred Poisson\((\mathsf EZ)\) variable, and the tail bound follows by the standard Chernoff computation for the Poisson distribution.
  </p>
</div>

<h2>Suprema of empirical processes</h2>

<p>
Let \(X_1,\dots,X_n\) be independent identically distributed random vectors indexed by a set \(T\), that is \(X_i=(X_{i,s})_{s\in T}\), with \(\mathsf EX_{i,s}=0\) and \(X_{i,s}\le 1\) for all \(i,s\). Set
</p>

<p>
\[
Z = \sup_{s\in T} \sum_{i=1}^n X_{i,s}, \qquad \sigma^2 = \sup_{s\in T}
\sum_{i=1}^n \mathsf EX_{i,s}^2.
\]
</p>

<p>
For \(i\le n\), let \(Z_i = \sup_{s\in T}\sum_{j\ne i}X_{j,s}\), and let \(\hat s\in T\), \(\hat s_i\in T\) achieve the suprema defining \(Z\) and \(Z_i\).
</p>

<div class="math-env">
  <p><span class="math-env-label">Lemma 8.</span>
  Let \(Y_i=X_{i,\hat s_i}\). Then \(Y_i\le Z-Z_i\le 1\), \(\mathsf E^{(i)}Y_i=0\), \(Y_i\le1\), and \(\sum_{i=1}^n (Z-Z_i)\le Z\). Consequently
  </p>
\[
\mathsf E^{(i)}\big[(Z-Z_i)^2\big] \le 2\,\mathsf E^{(i)}[Z-Z_i] + \mathsf
E^{(i)}[Y_i^2].
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Proof.</span>
  Since \(Z=\sum_{j}X_{j,\hat s}\ge \sum_{j\ne i}X_{j,\hat s}\),
  </p>
\[
X_{i,\hat s_i} = \sum_j X_{j,\hat s_i} - \sum_{j\ne i}X_{j,\hat s_i} \le
Z - Z_i \le \sum_j X_{j,\hat s} - \sum_{j\ne i}X_{j,\hat s} = X_{i,\hat s}
\le 1,
\]
  <p>
  which gives \(Y_i\le Z-Z_i\le1\). Summing the left inequality above over \(i\) gives \(\sum_i(Z-Z_i) \le \sum_i X_{i,\hat s} = Z\). Since \(\mathsf EX_{i,s}=0\) for all \(s\), \(\mathsf E^{(i)}Y_i=\mathsf E^{(i)}X_{i,\hat s_i}=0\), as \(\hat s_i\) is \(X^{(i)}\)-measurable. For the last inequality, apply \(\phi(x)=x^2-2x\) to \(x=Z-Z_i\): since \((Z-Z_i)-Y_i\ge0\) and \((Z-Z_i)-1\le0\le Y_i-1\), so \(\big((Z-Z_i)-1\big)+(Y_i-1)\le0\),
  </p>
\[
\phi(Z-Z_i)-\phi(Y_i) = \big[(Z-Z_i)-Y_i\big]\Big[\big((Z-Z_i)-1\big)+
(Y_i-1)\Big] \le 0,
\]
  <p>
  so \(\mathsf E^{(i)}\phi(Z-Z_i)\le\mathsf E^{(i)}\phi(Y_i)\), that is, \(\mathsf E^{(i)}(Z-Z_i)^2 \le 2\mathsf E^{(i)}(Z-Z_i) + \mathsf E^{(i)}Y_i^2 - 2\mathsf E^{(i)}Y_i\), which is the claim since \(\mathsf E^{(i)}Y_i=0\).
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Theorem 9.</span>
  \(\mathrm{Var}(Z) \le 2\mathsf EZ+\sigma^2\).
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Proof.</span>
  By Theorem 1 and Lemma 8,
  </p>
\[
\mathrm{Var}(Z) \le \sum_{i=1}^n \mathsf E\big[(Z-Z_i)^2\big] \le
\sum_{i=1}^n \Big(2\mathsf E[Z-Z_i] + \mathsf EY_i^2\Big) \le 2\mathsf EZ +
\sum_{i=1}^n \mathsf EY_i^2.
\]
  <p>
  Since \(Y_i=X_{i,\hat s_i}\) and \(\hat s_i\in T\), \(\mathsf EY_i^2 \le \sup_{s\in T}\mathsf EX_{i,s}^2\), so \(\sum_i \mathsf EY_i^2 \le \sigma^2\), using \(\sum_i(Z-Z_i)\le Z\) from Lemma 8 in the middle step.
  </p>
</div>

<h2>Two elementary lemmas</h2>

<div class="math-env">
  <p><span class="math-env-label">Lemma 10.</span>
  Let \(g\) be non-decreasing and continuously differentiable on an interval \(I\ni0\), with \(g(0)=0\), \(g'(0)>0\), \(g(x)\ne0\) for \(x\ne0\). Let \(\rho\) be continuous on \(I\) and \(G\) infinitely differentiable on \(I\) with \(G(0)=G'(0)=0\) and
  </p>
\[
g(\lambda)G'(\lambda)-g'(\lambda)G(\lambda) \le g(\lambda)^2\rho(\lambda),
\qquad \lambda\in I.
\]
  <p>
  Then \(G(\lambda) \le g(\lambda)\int_0^\lambda\rho(x)\,dx\) for \(\lambda\in I\).
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Proof.</span>
  Set \(\rho_G(\lambda)=G(\lambda)/g(\lambda)\) for \(\lambda\ne0\) and \(\rho_G(0)=0\). By l'Hopital's rule, \(\rho_G\) is continuously differentiable on \(I\) with \(\rho_G'(\lambda) = \big(g(\lambda)G'(\lambda)-g'(\lambda) G(\lambda)\big)/g(\lambda)^2\) for \(\lambda\ne0\), and \(\rho_G'(0)=G''(0)/ (2g'(0))\). The hypothesis gives \(\rho_G'(\lambda)\le\rho(\lambda)\) for \(\lambda\ne0\), hence for all \(\lambda\in I\) by continuity. So \(\Delta(\lambda) = \int_0^\lambda\rho(x)\,dx - \rho_G(\lambda)\) is non-decreasing on \(I\), and \(\Delta(0)=0\) forces \(\Delta\) to have the sign of \(\lambda\), the same sign as \(g(\lambda)\). So \(\Delta(\lambda)g(\lambda)\ge0\) on \(I\), which is the claim.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Lemma 11.</span>
  Let \(f,g:I\to\mathbb R\) be twice differentiable on an interval \(I\ni0\), with \(f(0)=g(0)=f'(0)=g'(0)=0\), \(g''(0)>0\), and \(xg'(x)>0\) for \(x\ne0\). If \(f''g'-f'g''\ge0\) on \(I\), then \(\rho=f/g\), extended by \(\rho(0)=f''(0)/ g''(0)\), is continuous and non-decreasing on \(I\).
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Proof.</span>
  Since \(g(0)=0\) and \(xg'(x)>0\) for \(x\ne0\), \(g(x)\ne0\) for \(x\ne0\), so \(\rho\) is well defined and twice differentiable off \(0\), and continuous at \(0\) by l'Hopital's rule. For \(x\ne0\), \(\rho'(x)\) has the sign of
  </p>
\[
g'(x)\Big(\frac{f'(x)}{g'(x)}-\frac{f(x)}{g(x)}\Big) = \frac{g'(x)}{x}
\cdot x\Big(\frac{f'(x)}{g'(x)}-\frac{f(x)}{g(x)}\Big).
\]
  <p>
  The first factor is positive since \(xg'(x)>0\). By the mean value theorem applied to \(f/g\) there is \(c\) between \(0\) and \(x\) with \(f'(c)/g'(c) = f(x)/g(x)\). Since \(f''g'-f'g''\ge0\), the function \(f'/g'\), taking value \(f''(0)/g''(0)\) at \(0\), is non-decreasing on \(I\), so \(x(f'(c)/g'(c)) \le x(f'(x)/g'(x))\), giving the second factor \(\ge0\). So \(\rho'(x)\ge0\) for \(x\ne0\), and \(\rho\) is non-decreasing.
  </p>
</div>

<h2>Bousquet's inequality</h2>

<p>
We keep the notation of Section 6: \(Z=\sup_{s\in T}\sum_i X_{i,s}\), \(\sigma^2\), \(Z_i\), \(Y_i\). Set \(v=2\mathsf EZ+\sigma^2\), so \(\mathrm{Var}(Z) \le v\) by Theorem 9. Let \(\varphi(u)=e^u-u-1\) and \(h(u)=(1+u)\log(1+u)-u\).
</p>

<div class="math-env">
  <p><span class="math-env-label">Theorem 12 (Bousquet's inequality).</span>
  For all \(\lambda\ge0\),
  </p>
\[
\log\mathsf Ee^{\lambda(Z-\mathsf EZ)} \le v\varphi(\lambda).
\]
  <p>
  For all \(t\ge0\),
  </p>
\[
\mathsf P(Z\ge \mathsf EZ+t) \le e^{-vh(t/v)} \le \exp\Big(-\frac{t^2}
{2(v+t/3)}\Big).
\]
</div>

<div class="math-env">
  <p><span class="math-env-label">Lemma 13.</span>
  For \(\beta\ge0\), \(\lambda\ge0\), \(x\le1\),
  </p>
\[
\frac{\varphi(-\lambda x)}{\varphi(-\lambda)} \le \frac{x+\big(\beta
x^2-x\big)e^{-\lambda x}}{1+(\beta-1)e^{-\lambda}}.
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Proof.</span>
  For \(\lambda=0\) both sides vanish. Fix \(\lambda>0,\beta\ge0\) and set
  </p>
\[
f(x) = e^{\lambda x}\varphi(-\lambda x) = \lambda xe^{\lambda x} -
e^{\lambda x}+1, \qquad g(x) = xe^{\lambda x}+\beta x^2-x,
\]
  <p>
  so that \(\varphi(-\lambda x) = f(x)e^{-\lambda x}\) and the right side of the lemma is \(g(x)e^{-\lambda x}/(g(1)e^{-\lambda})\), since \(g(1)e^{-\lambda} = 1+(\beta-1)e^{-\lambda}\). Also \(\varphi(-\lambda) = f(1)e^{-\lambda}\). The claim is therefore \(f(x)/f(1) \le g(x)/g(1)\) for \(x\le1\), that is \(\rho(x):=f(x)/g(x) \le \rho(1)\), so it suffices to show \(\rho\) is non-decreasing on \((-\infty,1]\). A direct computation gives
  </p>
\[
xg'(x) = x^2\big(\lambda e^{\lambda x}+2\beta\big) + x(e^{\lambda x}-1) > 0
\quad (x\ne0),
\]
  <p>
  since both terms are nonnegative and not both zero, and
  </p>
\[
f''(x)g'(x)-f'(x)g''(x) = \lambda^2 e^{\lambda x}\big(\varphi(\lambda x) +
2\beta\lambda x^2\big) \ge 0.
\]
  <p>
  Lemma 11 gives that \(\rho=f/g\) is non-decreasing on \((-\infty,1]\), which is the claim.
  </p>
</div>

<div class="math-env">
  <p><span class="math-env-label">Lemma 14.</span>
  Let \(f(\lambda)=\varphi(\lambda)+\lambda/2\) and \(G(\lambda)=\log\mathsf Ee^{\lambda(Z-\mathsf EZ)}\). Then for \(\lambda\ge0\),
  </p>
\[
f(\lambda)G'(\lambda) - f'(\lambda)G(\lambda) \le \frac v2 \big(\lambda
f'(\lambda)-f(\lambda)\big).
\]
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Proof.</span>
  By Theorem 6,
  </p>
\[
\mathrm{Ent}(e^{\lambda Z}) \le \sum_{i=1}^n \mathsf E\big[e^{\lambda
Z}\varphi(-\lambda(Z-Z_i))\big].
\]
  <p>
  Since \(Z-Z_i\le1\), Lemma 13 with \(\beta=1/2\) gives, for each \(i\),
  </p>
\[
\varphi(-\lambda(Z-Z_i))e^{\lambda Z} \le \theta(\lambda)\Big[(Z-Z_i)
e^{\lambda Z} + \Big(\tfrac12(Z-Z_i)^2-(Z-Z_i)\Big)e^{\lambda Z_i}\Big],
\qquad \theta(\lambda)=\frac{\varphi(-\lambda)}{1-\tfrac12e^{-\lambda}}.
\]
  <p>
  Taking \(\mathsf E^{(i)}\) and using Lemma 8,
  </p>
\[
\mathsf E^{(i)}\Big[\tfrac12(Z-Z_i)^2-(Z-Z_i)\Big] \le \tfrac12\mathsf
E^{(i)}[Y_i^2] \le \tfrac12\sup_{s\in T}\mathsf E[X_{i,s}^2].
\]
  <p>
  By \(\mathsf E^{(i)}[Z-Z_i]\ge0\) and Jensen's inequality, \(e^{\lambda Z_i} \le e^{\lambda\mathsf E^{(i)}Z} \le \mathsf E^{(i)}e^{\lambda Z}\), so
  </p>
\[
\mathsf E^{(i)}\big[\varphi(-\lambda(Z-Z_i))e^{\lambda Z}\big] \le
\theta(\lambda)\,\mathsf E^{(i)}\Big[\Big(Z-Z_i +\tfrac12\sup_{s\in T}
\mathsf E[X_{i,s}^2]\Big)e^{\lambda Z}\Big].
\]
  <p>
  Summing over \(i\), using \(\sum_i(Z-Z_i)\le Z\) and \(\sum_i\sup_{s\in T}\mathsf EX_{i,s}^2=\sigma^2\),
  </p>
\[
\mathrm{Ent}(e^{\lambda Z}) \le \theta(\lambda)\,\mathsf E\Big[\Big(Z+
\frac{\sigma^2}{2}\Big)e^{\lambda Z}\Big] = \theta(\lambda)\,\mathsf
E\Big[(Z-\mathsf EZ)e^{\lambda Z}\Big] + \theta(\lambda)\Big(\mathsf EZ+
\frac{\sigma^2}{2}\Big)\mathsf Ee^{\lambda Z}.
\]
  <p>
  Dividing by \(\mathsf Ee^{\lambda(Z-\mathsf EZ)}\), and writing \(v/2=\mathsf EZ+\sigma^2/2\),
  </p>
\[
\lambda G'(\lambda) - G(\lambda) \le \theta(\lambda)\Big(G'(\lambda) +
\frac v2\Big).
\]
  <p>
  Rewrite this as \((\lambda-\theta(\lambda))G'(\lambda) - G(\lambda) \le \theta(\lambda)v/2\). Since \(f(\lambda)=\varphi(\lambda)+\lambda/2\) has \(f'(\lambda)=e^\lambda-1/2>0\) for \(\lambda\ge0\), a direct computation gives
  </p>
\[
f(\lambda) - f'(\lambda)\big(\lambda-\theta(\lambda)\big) =
f(\lambda)+f'(\lambda)\theta(\lambda) - \lambda f'(\lambda) = 0,
\]
  <p>
  that is \(\theta(\lambda) = \lambda - f(\lambda)/f'(\lambda)\), equivalently \(f'(\lambda)(\lambda-\theta(\lambda))=f(\lambda)\). Multiplying the displayed inequality by \(f'(\lambda)>0\),
  </p>
\[
f(\lambda)G'(\lambda) - f'(\lambda)G(\lambda) \le f'(\lambda)\theta(\lambda)
\frac v2 = \big(\lambda f'(\lambda)-f(\lambda)\big)\frac v2,
\]
  <p>
  using \(f'(\lambda)\theta(\lambda) = f'(\lambda)\lambda - f(\lambda)\) once more. This is the lemma.
  </p>
</div>

<div class="math-env math-env-proof">
  <p><span class="math-env-label">Proof of Theorem 12.</span>
  Let \(g(\lambda) = \dfrac{v}{2}\cdot\dfrac{\lambda f'(\lambda)-f(\lambda)} {f(\lambda)^2}\) for \(\lambda>0\) and \(g(0)=v\), continuous on \([0,\infty)\). Lemma 14 states \(f(\lambda)G'(\lambda)-f'(\lambda)G(\lambda) \le f(\lambda)^2g(\lambda)\) for \(\lambda\ge0\), the hypothesis of Lemma 10 with \(g=f\). Lemma 10 gives, for \(\lambda\ge0\),
  </p>
\[
G(\lambda) \le f(\lambda)\cdot \frac v2 \int_0^\lambda \frac{xf'(x)-f(x)}
{f(x)^2}\,dx.
\]
  <p>
  Since \(\big(-x/f(x)\big)' = \big(xf'(x)-f(x)\big)/f(x)^2\) and \(\lim_{x\to0} x/f(x)=2\) (as \(f(x)\sim x^2/2\) near \(0\)), the integral equals \(2-\lambda/ f(\lambda)\), so
  </p>
\[
G(\lambda) \le f(\lambda)\cdot\frac v2\Big(2-\frac{\lambda}{f(\lambda)}\Big)
= v\Big(f(\lambda)-\frac\lambda2\Big) = v\varphi(\lambda),
\]
  <p>
  which is the first assertion. The tail bound follows from the standard Chernoff computation for sub-gamma-type moment generating functions bounded by \(v\varphi(\lambda)\) (Section 2.2), and the second inequality from the elementary bound \(h(u)\ge u^2/(2+2u/3)\) for \(u\ge0\).
  </p>
</div>

<p>
Sub-additivity of entropy tensorises the entropy of \(Z=f(X)\) into single-coordinate contributions. The duality formula turns this into the variational bound of Corollary 5, applied conditionally to give the modified logarithmic Sobolev inequality. For self-bounding functions this inequality integrates directly into a Poissonian bound on the logarithmic moment generating function. For the supremum of an empirical process, the increments \(Z-Z_i\) are not self-bounding in the strict sense, but Lemma 8, itself an application of the Efron&ndash;Stein inequality, controls their conditional second moment by \(2(Z-Z_i)+Y_i^2\). Lemma 13, proved by the same monotone-ratio argument as Lemma 10, converts this control into the differential inequality of Lemma 14, which Lemma 10 then integrates exactly, giving Bousquet's inequality.
</p>

<p><a href="{{ '/mathematics/' | relative_url }}">&larr; Back to Mathematics</a></p>
