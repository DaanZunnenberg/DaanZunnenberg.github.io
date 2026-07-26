---
layout: default
title: Functional Scale Volatility Estimation
permalink: /projects/functional-scale-estimation/
---

<section class="hero">
  <img class="hero-img" src="{{ '/images/volatility/background.jpg' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Project &middot; January 2024 &ndash; June 2024</div>
    <h1 class="hero-name">Functional Scale Volatility Estimation</h1>
    <p class="hero-lede">Bernstein-basis QMLE for functional GARCH, at VU Amsterdam with Yicong Lin &amp; Andre Lucas.</p>
  </div>
</section>

<div class="article-body">

<p class="tagline"><code>Python</code> &middot; <code>SAS</code> &middot; <code>Bash</code> &middot; see <a href="{{ '/academic/research/' | relative_url }}">Publications</a></p>

<h2 id="overview">Overview</h2>
<p>
  This was my contribution to Lin &amp; Lucas's work on robust observation-driven dynamics for functional
  location-scale models: the estimation and implementation side of a functional GARCH-type recursion. It's
  the direct precursor to the <a href="{{ '/projects/functional-volatility-surface-modelling/' | relative_url }}">Functional Volatility Surface Modelling</a>
  project above, sharing the same Bernstein-basis idea but focused on getting a single functional GARCH(1,1)
  recursion estimated correctly and efficiently, rather than extending it to a score-driven GAS model.
</p>

<h2 id="setting">Setting</h2>
<p>
  We work with intraday return curves. Write \(y_t(u)\) for the return at point \(u\) during trading day
  \(t\), where \(u \in [0,1]\) is the time of day rescaled to the unit interval. Each day gives one full
  curve, not one number. This is what makes the problem functional rather than scalar.
</p>
<p>
  Each return curve is driven by a conditional variance curve \(\sigma_t^2(u)\). We write
  \[y_t(u) = \sigma_t(u)\eta_t(u),\]
  where \(\eta_t(u)\) is noise with unit variance. The variance curve follows a recursion,
  \[\sigma_t^2 = \delta + \sum_{i=1}^{q}\alpha_i\left(y_{t-i}^2\right) + \sum_{j=1}^{p}\beta_j\left(\sigma_{t-j}^2\right),\]
  where \(\delta\) is a strictly positive intercept curve, and \(\alpha_i, \beta_j\) are operators that map
  curves to curves. This is the functional version of a classical GARCH recursion. Every quantity is now a
  function of \(u\), not a single number.
</p>

<h2 id="why-basis-functions">Why Basis Functions</h2>
<p>
  The operators \(\alpha_i\) and \(\beta_j\) live in an infinite-dimensional space. We cannot estimate an
  infinite-dimensional object from a finite sample of days. We also need every operator to keep the
  variance curve positive, since a variance cannot go negative at any point of the day.
</p>
<p>
  We solve both problems at once by projecting each operator onto a small set of Bernstein basis functions.
  A Bernstein basis of order \(M\) is a set of \(M\) polynomials on \([0,1]\), and each one is non-negative
  everywhere on that interval. Any operator can then be written as a weighted sum of these basis functions.
  If the weights are non-negative, the resulting operator is automatically positive. This gives a positive
  variance curve for free, without adding constraints to the optimizer.
</p>
<p>
  Projecting onto \(M\) basis functions also turns an infinite-dimensional estimation problem into a small,
  bounded one. Instead of estimating operators directly, we estimate a short vector of Bernstein
  coefficients \(\theta\).
</p>

<h2 id="estimation">Estimation</h2>
<p>
  A standard likelihood cannot be evaluated directly on a continuous curve. We estimate \(\theta\) using
  Quasi-Maximum Likelihood Estimation instead. This rebuilds the variance recursion at every step from the
  current coefficients, then scores the fit across the full sample of days. The implementation builds the
  functional operators from the Bernstein coefficients, runs the volatility recursion forward in time, and
  optimizes the coefficients under simple bound constraints so the positivity holds throughout.
</p>

<h2 id="code">Code</h2>
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

<h2 id="results">Results</h2>
<p>
  Applying this framework to simulated intraday data with a functional GARCH(1,1) recursion and
  Bernstein-basis QMLE with <em>M</em> = 3 basis functions gives the fitted volatility surface shown below.
  The estimation recovers the main structure of the true process, while the remaining day-to-day roughness
  reflects finite-sample effects and the limited flexibility of the chosen basis:
</p>
<img src="{{ '/assets/img/garch_vol_surface.png' | relative_url }}" alt="True versus functional GARCH-estimated volatility surface, side by side" class="entry-figure">
<p class="form-hint">Simulated 25-point intraday grid over 500 trading days; estimated surface via <code>funcgarch.garch.fit</code> + <code>garch_filter</code>.</p>

</div>

<p><a href="{{ '/projects/' | relative_url }}">&larr; Back to Projects</a></p>
