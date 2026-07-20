---
layout: default
title: Research & Publications
permalink: /research/
---

<section class="hero hero-scroll">
  <canvas id="trade-process-canvas" class="hero-canvas" aria-label="Live scrolling time-and-sales tables side by side, for Binance ETH/USDT, SOL/USDT, and BTC/USDT spot trades (scroll horizontally on narrow screens to see all three), each row showing price, trade amount in the coin's own units, trade amount in USD, and trade time" aria-hidden="true"></canvas>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Probability &middot; Empirical Processes</div>
    <h1 class="hero-name">Research &amp; Publications<span class="cursor">_</span></h1>
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

<h2>Research Interests</h2>
<div class="entry">
  <ul>
    <li>Generic chaining theory, geometric functional analysis, maximal inequalities, and majorizing measures for controlling suprema of stochastic processes.</li>
    <li>Empirical process theory, weak convergence, Glivenko&ndash;Cantelli theorems, and Donsker&ndash;Skorokhod type results.</li>
    <li>Stochastic integration, martingale theory, stochastic differential equations, and stochastic optimal control.</li>
    <li>Quantitative finance, including optimal market making, statistical arbitrage, and algorithmic trading.</li>
  </ul>
</div>

<h2>Current Work</h2>
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
    majorizing measure theorem &mdash; <a href="{{ '/research/proof/' | relative_url }}">the full proof is
    written up here</a>.
  </p>

  <div class="readme-toggle is-open">
    <button type="button" class="readme-summary" aria-expanded="true">
      <span class="label-open">+ What is generic chaining?</span><span class="label-close">&minus; Hide the math</span>
    </button>
    <div class="readme-collapse">
      <div class="readme">
        <h4>Admissible sequences and the \(\gamma_2\) functional</h4>
        <p>
          Generic chaining is a method for controlling the supremum of a stochastic process by approximating
          its index set through a sequence of increasingly fine finite nets. Let \((T,d)\) be a metric space
          and let \((X_t)_{t \in T}\) be a stochastic process whose increments are controlled by the metric
          \(d\). Following Talagrand's notation, define
          \[N_n = 2^{2^n}, \qquad n \ge 0,\]
          and consider admissible subsets \(T_n \subset T\) satisfying
          \[\operatorname{card}(T_n) \le N_n.\]
          The sequence \((T_n)_{n \ge 0}\) is called an admissible sequence. For every \(t \in T\), let
          \(\pi_n(t) \in T_n\) be an approximation of \(t\) at level \(n\). The chaining decomposition is
          \[X_t - X_{t_0} = \sum_{n \ge 0} \left(X_{\pi_{n+1}(t)} - X_{\pi_n(t)}\right),\]
          which expresses the process as a sum of increments across successive scales.
        </p>
        <p>
          The complexity of an admissible sequence is quantified by Talagrand's functional
          \[\gamma_2(T,d) = \inf_{(T_n)} \sup_{t \in T} \sum_{n \ge 0} 2^{n/2} d(t,T_n),\]
          where
          \[d(t,T_n) = \inf_{s \in T_n} d(t,s),\]
          and the infimum is taken over all admissible sequences. The functional \(\gamma_2(T,d)\) measures
          the optimal cost of approximating the whole index set at all scales simultaneously.
        </p>
        <h4>The majorizing measure theorem</h4>
        <p>
          For a centered Gaussian process with canonical metric
          \[d(s,t) = \left(\mathsf{E}(X_s - X_t)^2\right)^{1/2},\]
          the majorizing measure theorem states that there exists a universal constant \(L \ge 1\) such that
          \[\frac{1}{L}\gamma_2(T,d) \le \mathsf{E} \sup_{t \in T} X_t \le L\gamma_2(T,d).\]
        </p>
        <p>
          Thus generic chaining identifies the exact geometric quantity governing the expected supremum of a
          Gaussian process. The choice \(N_n = 2^{2^n}\) gives the correct multiscale balance between the
          cardinality of the approximating sets and the size of the increments, leading to sharp bounds that
          improve upon classical entropy estimates based on a single covering scale.
        </p>
        <p>
          This is the toolkit I'm extending, to processes that are only \(\beta\)-mixing rather than
          independent, where the chaining argument has to absorb a mixing-rate correction at every scale
          \(n\) instead of relying on independence between increments.
        </p>
      </div>
    </div>
  </div>
</div>

<h2>Past Research</h2>

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

<h2>Publications</h2>

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
  For collaboration proposals or seminar invitations, <a href="{{ '/contact/research/' | relative_url }}">get in touch</a>.
</p>
