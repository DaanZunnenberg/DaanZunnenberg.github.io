---
layout: default
title: Research & Publications
permalink: /academic/research/
---

<section class="hero">
  <canvas id="signal-widget-canvas" class="hero-canvas" aria-label="Animated network of connections" aria-hidden="true"></canvas>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Probability &middot; Empirical Processes</div>
    <h1 class="hero-name">Research &amp; Publications</h1>
    <p class="hero-lede">Generic chaining, majorizing measures, and weak convergence for dependent processes.</p>
  </div>
</section>

<p class="tagline">Probability theory &middot; empirical processes &middot; maximal inequalities.</p>

<p class="lede">
I'm a PhD researcher in mathematics at Leiden University. Broadly, I work in empirical process theory, which
uses tools such as generic chaining to control suprema of stochastic processes, and study how these
techniques extend to weak convergence and statistical estimation when the independence assumption is
relaxed.
</p>

<h2 id="research-interests">Research Interests</h2>
<div class="entry">
  <ul>
    <li>Generic chaining theory, geometric functional analysis, maximal inequalities, and majorizing measures for controlling suprema of stochastic processes.</li>
    <li>Empirical process theory, weak convergence, Glivenko&ndash;Cantelli theorems, and Donsker&ndash;Skorokhod type results.</li>
    <li>Stochastic integration, martingale theory, stochastic differential equations, and stochastic optimal control.</li>
    <li>Quantitative finance, including optimal market making, statistical arbitrage, and algorithmic trading.</li>
  </ul>
</div>

<h2 id="current-work">Current Work</h2>
<div class="entry">
  <div class="entry-head">
    <h3>PhD Research &middot; Leiden University</h3>
    <span class="entry-date">2024 &ndash; present</span>
  </div>
  <p>
    My current research concerns decomposition theorems, generic chaining, and majorizing measures as tools
    for controlling suprema of stochastic processes, applied to weak convergence and
    Donsker&ndash;Skorokhod-type results for processes satisfying absolute regularity. My supervisor is
    dr. A.M. D&uuml;rre.
  </p>
  <p>I organize and lead a weekly graduate seminar on weak convergence and empirical process theory.</p>
  <p>
    In short: I study how to bound the supremum of a stochastic process from its geometry alone, and how much
    of that machinery survives once you drop independence. My favorite result in the toolkit is Talagrand's
    majorizing measure theorem. <a href="{{ '/academic/mathematics/majorizing-measure-theorem/' | relative_url }}">The full proof is
    written up here</a>.
  </p>

  <div class="readme-toggle">
    <button type="button" class="readme-summary" aria-expanded="false">
      <span class="label-open">+ What is generic chaining?</span><span class="label-close">&minus; Hide the math</span>
    </button>
    <div class="readme-collapse">
      <div class="readme">
        <p>
          Generic chaining provides a systematic framework for controlling the supremum of a stochastic
          process \(({X}_t)_{t \in T}\) by approximating the index set \(T\) through a sequence of
          increasingly fine partitions.
        </p>

        <div class="math-env">
          <p><span class="math-env-label">Definition.</span>
            Given a set \(T\), an <em>admissible sequence</em> is an increasing sequence of partitions
            \(A_n\), \(n \ge 0\), of \(T\) such that \(\operatorname{card} A_n \le N_n\), where \(N_0 = 1\)
            and \(N_n = 2^{2^n}\) for \(n \ge 1\).
          </p>
        </div>

        <p>
          By an increasing sequence of partitions we mean that every set of \(A_{n+1}\) is contained in a
          set of \(A_n\). Throughout we denote by \(A_n(t)\) the unique element of \(A_n\) which contains
          \(t\). The double exponential in the definition of \(N_n\) occurs simply since for our purposes the
          proper measure of the size of a partition \(A\) is \(\log \operatorname{card} A\). This double
          exponential ensures that the size of the partition \(A_n\) doubles at every step.
        </p>

        <div class="math-env">
          <p><span class="math-env-label">Definition.</span>
            For a stochastic process \((X_t)_{t \in T}\) and \(n \ge 0\), we define for \(A \in A_n\)
          </p>
          \[
          \mathit{\Delta}_n(A) = \sup_{s,t \in A} \big( \mathsf{E} |X_s - X_t|^{2^n} \big)^{2^{-n}}.
          \]
        </div>

        <p>
          Here, for a subset \(A \in A_n\), the quantity \(\mathit{\Delta}_n(A)\) replaces the usual metric
          diameter \(\mathit{\Delta}(A) = \sup_{s,t \in A} d(s,t)\) by incorporating the scale-dependent
          moment growth of the increments of \(X_t\).
        </p>

        <div class="math-env">
          <p><span class="math-env-label">Theorem (R. Lata&#322;a, S. Mendelson).</span>
            Consider a process \((X_t)_{t \in T}\). For each admissible sequence \(A_n\), \(n \ge 0\), we
            have
          </p>
          \[
          \mathsf{E} \sup_{t \in T} X_t \le L \inf \sup_{t \in T} \sum_{n \ge 0} \mathit{\Delta}_n(A_n(t)),
          \]
          <p>
            where the infimum is taken over all admissible sequences.
          </p>
        </div>

        <p>
          To connect this back to the classical generic chaining bound, recall the definition of
          Talagrand's \(\gamma_2\) functional.
        </p>

        <div class="math-env">
          <p><span class="math-env-label">Definition.</span>
            Given a metric space \((T,d)\), we define
          </p>
          \[
          \gamma_2(T,d) = \inf \sup_{t \in T} \sum_{n \ge 0} 2^{n/2} \mathit{\Delta}(A_n(t)),
          \]
          <p>
            where the infimum is taken over all admissible sequences.
          </p>
        </div>

        <div class="math-env">
          <p><span class="math-env-label">Proposition.</span>
            If \((X_t)_{t \in T}\) is sub-Gaussian with canonical metric
            \(d(s,t) = (\mathsf{E}|X_s - X_t|^2)^{1/2}\), then \(\mathit{\Delta}_n(A) \le L \, 2^{n/2}
            \mathit{\Delta}(A)\) for each \(A \in A_n\), \(n \ge 0\).
          </p>
        </div>

        <p>
          Using this bound inside the Lata&#322;a&ndash;Mendelson theorem yields \(\mathsf{E} \sup_{t \in T}
          X_t \le L \gamma_2(T,d)\), which shows that the Lata&#322;a&ndash;Mendelson theorem extends generic
          chaining beyond the Gaussian setting.
        </p>

        <p>
          This is the toolkit I'm extending to processes that are only \(\beta\)-mixing rather than
          independent, where the chaining argument has to absorb a mixing-rate correction at every scale
          \(n\) instead of relying on independence between increments.
        </p>

        <p>
          Upper bounds construct successful approximations, but matching lower bounds are what matter most.
          A matching lower bound proves that a geometric quantity is not just a technical artifact of the
          chaining method, but the actual parameter governing the size of the supremum. Results like this are
          central to modern empirical process theory.
        </p>

        <p>
          A celebrated example is the Majorizing Measure Theorem, which establishes that \(\gamma_2(T,d)\)
          provides both an upper and a lower bound for Gaussian processes up to universal constants, going far
          beyond single-scale estimates like Sudakov's minoration. Similarly, the Bednorz&ndash;Lata&#322;a
          Theorem (resolving Talagrand's Bernoulli Conjecture) constructs sharp lower bounds for Bernoulli
          processes by splitting the index set into Gaussian and \(\ell_1\)-like parts. Other classic
          manifestations of this phenomenon include the Marcus&ndash;Pisier characterization of the
          boundedness of random Fourier series, as well as the Ajtai&ndash;Koml&oacute;s&ndash;Tusn&aacute;dy
          theorem governing matching problems in geometric probability.
        </p>
      </div>
    </div>
  </div>
</div>

<h2 id="past-research">Past Research</h2>

<div class="entry">
  <div class="entry-head">
    <h3>Research Assistant &middot; VU Econometrics and Data Science</h3>
    <span class="entry-date">January 2024 &ndash; June 2024</span>
  </div>
  <ul>
    <li>Developed likelihood-based estimation procedures for functional scale models, with vectorized and parallel implementations to improve computational efficiency.</li>
    <li>Reduced the runtime of large-scale Monte Carlo simulations by 92.3% on average through <code>numpy</code> vectorization and parallel computation.</li>
    <li>Implemented the main Python components: <code>bernstein_basis</code>, <code>functional_operator</code>, and <code>qmle_filter</code>, including a QMLE filter for the functional GARCH(1,1) model.</li>
    <li>Used non-negative Bernstein coefficients to ensure a positive volatility surface by construction, avoiding constrained optimization over the entire operator.</li>
    <li>Estimated a functional GARCH(1,1) model using a Bernstein-basis QMLE approach with three basis functions on simulated intraday data. The fitted model captures the main structure of the true volatility surface, while introducing additional day-to-day variation. Several operator coefficients reach their imposed bounds, indicating that the model is operating near the edge of the parameter space. The results are illustrated through comparisons of the true and fitted GARCH surfaces, as well as the GARCH and GAS-GARCH volatility surfaces.</li>
  </ul>
  <pre class="code-block" data-lang="python"><code>def bernstein_basis(u, M, k):
    return comb(M - 1, k - 1) * u ** (k - 1) * (1 - u) ** (M - k)

def functional_operator(grid, coefs, M):
    phi = np.stack([bernstein_basis(grid, M, k) for k in range(1, M + 1)])
    return sum(c * np.outer(phi[i], phi[j]) for c, (i, j) in zip(coefs, product(range(M), repeat=2)))

def qmle_filter(returns, theta, M):
    delta, alpha, beta = theta[:M], theta[M:M + M**2], theta[M + M**2:]
    grid = np.linspace(0, 1, returns.shape[0])
    A, B = functional_operator(grid, alpha, M), functional_operator(grid, beta, M)
    d = sum(c * bernstein_basis(grid, M, k) for k, c in enumerate(delta, 1))

    sigma2 = np.ones(returns.shape[0])
    surface = np.zeros_like(returns)
    for t in range(1, returns.shape[1]):
        sigma2 = d + (A @ returns[:, t - 1] ** 2 + B @ sigma2) / returns.shape[0]
        surface[:, t] = sigma2
    return surface

theta_hat = minimize(lambda theta: qmle_loss(returns, theta, M), theta0, method='SLSQP').x
</code></pre>
  <p class="form-hint">Non-negative Bernstein coefficients guarantee a positive volatility surface directly, without constrained optimization over the full operator.</p>
  <img src="{{ '/assets/img/garch_vol_surface.png' | relative_url }}" alt="True versus functional GARCH-estimated volatility surface, side by side" class="entry-figure">
  <p class="form-hint">The first comparison figure shows the estimated GAS-GARCH volatility surface against the true volatility surface to assess the model&rsquo;s ability to recover the underlying dynamics.</p>
  <img src="{{ '/assets/img/garch_vs_gas_vol_surface.png' | relative_url }}" alt="Functional GARCH-estimated versus GAS-GARCH-estimated volatility surface, side by side" class="entry-figure">
  <p class="form-hint">The second comparison figure compares the functional GARCH and GAS-GARCH volatility surfaces, demonstrating the increased flexibility of the GAS-GARCH specification relative to the traditional functional GARCH model.</p>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>MSc Thesis &middot; Functional stationarity testing</h3>
    <span class="entry-date">2024</span>
  </div>
  <p>
    Developed a functional stationarity test for multidimensional diffusion processes, implementing and
    packaging the underlying mathematical framework as an open-source library.
  </p>
  <div class="tags"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/MultivariateHamrickTaqqu" target="_blank" rel="noopener noreferrer">FunctionalMH on GitHub</a></div>
</div>

<h2 id="publications">Publications</h2>

<div class="entry">
  <div class="entry-head">
    <h3>The Tukey depth under dependence</h3>
    <span class="entry-date">2026 &middot; forthcoming</span>
  </div>
  <div class="entry-org">Zunnenberg, D. &amp; D&uuml;rre, A. &middot; <em>Bernoulli</em></div>
  <div class="tags">
    Forthcoming &middot; Bernoulli Society for Mathematical Statistics and Probability
    &middot; <span class="supplement-note">includes online supplement (proofs &amp; auxiliary results)</span>
  </div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Absolute regularity and maximal moment inequalities</h3>
    <span class="entry-date">2026 &middot; in preparation</span>
  </div>
  <div class="entry-org">Zunnenberg, D. &amp; D&uuml;rre, A. &middot; Unpublished manuscript</div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Functional location-scale models with robust observation-driven dynamics</h3>
    <span class="entry-date">2025</span>
  </div>
  <div class="entry-org">Lin, Y. &amp; Lucas, A. &middot; Tinbergen Institute Discussion Paper</div>
  <div class="tags">Research assistantship contribution</div>
</div>

<h3>Software</h3>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://github.com/DaanZunnenberg/MultivariateHamrickTaqqu" target="_blank" rel="noopener noreferrer">MultivariateHamrickTaqqu</a></h3>
    <span class="entry-date">2024</span>
  </div>
  <p>Open-source implementation of a functional stationarity test for multidimensional diffusion processes, developed for my MSc thesis.</p>
  <div class="tags"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/MultivariateHamrickTaqqu" target="_blank" rel="noopener noreferrer">github.com/DaanZunnenberg/MultivariateHamrickTaqqu</a></div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://github.com/DaanZunnenberg/FunctionalScale" target="_blank" rel="noopener noreferrer">FunctionalScale</a></h3>
    <span class="entry-date">2024 &ndash; present</span>
  </div>
  <p>Estimation library for functional GARCH/GAS models of time-varying intraday volatility surfaces, using B-splines and <code>numba</code> JIT compilation.</p>
  <div class="tags"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/FunctionalScale" target="_blank" rel="noopener noreferrer">github.com/DaanZunnenberg/FunctionalScale</a></div>
</div>

<p>
  A full, up-to-date list is also maintained on
  <a href="https://scholar.google.com/citations?user=JLg2KjEAAAAJ" target="_blank" rel="noopener noreferrer">Google Scholar</a>.
  For collaboration proposals or seminar invitations, <a href="{{ '/academic/contact/' | relative_url }}">get in touch</a>.
</p>

<p><a href="{{ '/academic/' | relative_url }}">&larr; Back to Academic</a></p>
