---
layout: default
title: Projects
permalink: /projects/
---

<h1>Projects</h1>
<p class="tagline">Expand any project for an overview, and a code sketch of the approach.</p>

<div class="entry">
  <div class="entry-head">
    <h3>Functional Volatility Surface Modelling</h3>
    <span class="entry-date">September 2024 &ndash; present</span>
  </div>
  <ul>
    <li>Extending the functional GARCH framework to a generalized autoregressive score (GAS) model to estimate and capture time-varying intraday volatility surfaces.</li>
    <li>Designed efficient estimation procedures using B-splines, applying <code>Numba</code> JIT compilation to enable scalable modelling of volatility surfaces from granular intraday return data.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <code>SAS</code> &middot; <a href="https://github.com/DaanZunnenberg/FunctionalSurface" target="_blank" rel="noopener noreferrer">FunctionalSurface on GitHub</a></div>

  <details>
    <summary><span class="label-open">+ Show details &amp; code</span><span class="label-close">&minus; Hide details</span></summary>
    <div class="readme">
      <h4>Overview</h4>
      <p>
        Classical functional GARCH treats the volatility surface as a smooth curve evolving through a fixed
        update rule. This project replaces that update with a generalized autoregressive score (GAS) recursion,
        letting the surface adapt to the local curvature of the score function rather than a linear rule &mdash;
        which matters most exactly when intraday vol spikes.
      </p>
      <h4>Approach</h4>
      <p>
        The surface is represented in a B-spline basis, so estimation reduces to updating a low-dimensional
        coefficient vector each period. The score recursion and basis evaluation are both JIT-compiled with
        <code>Numba</code>, which is what makes fitting on tick-level intraday data tractable.
      </p>
      <pre class="code-block"><code>from functionalsurface import BSplineBasis, GASRecursion

basis = BSplineBasis(knots=20, degree=3)
gas = GASRecursion(basis, scoring="fisher")

theta = gas.init_params(returns[:warmup])
for r in returns[warmup:]:
    surface = basis.evaluate(theta)      # current vol surface
    score = gas.score(r, surface)        # GAS update direction
    theta = gas.step(theta, score)       # JIT-compiled recursion
</code></pre>
      <p class="form-hint">Illustrative interface &mdash; see the repository for the actual API.</p>
    </div>
  </details>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>HRP Portfolio Allocation</h3>
    <span class="entry-date">October 2023 &ndash; August 2024</span>
  </div>
  <ul>
    <li>Implemented Hierarchical Risk Parity via tree clustering using <code>scipy.cluster</code> to stabilize high-dimensional asset allocation, bypassing classical covariance inversion to eliminate noise sensitivity.</li>
    <li>Generated a mean alpha premium of 3.9% above the benchmark across diverse simulated horizons, in a look-ahead-free method that outperformed actively rebalanced benchmark portfolios.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <a href="https://coinmerce.capital/en/home" target="_blank" rel="noopener noreferrer">Coinmerce Capital</a></div>

  <details>
    <summary><span class="label-open">+ Show details &amp; code</span><span class="label-close">&minus; Hide details</span></summary>
    <div class="readme">
      <h4>Overview</h4>
      <p>
        Mean-variance allocation is fragile in high dimensions because it inverts a noisy covariance matrix.
        Hierarchical Risk Parity (HRP) sidesteps the inversion entirely: assets are clustered by correlation
        distance, then risk is allocated recursively down the resulting tree.
      </p>
      <h4>Approach</h4>
      <p>
        Clustering uses <code>scipy.cluster.hierarchy</code> on a correlation-distance matrix; weights are then
        derived by recursive bisection down the dendrogram, splitting inverse-variance weight between each pair
        of sub-clusters. All backtests are look-ahead-free, re-clustering only on data available at each date.
      </p>
      <pre class="code-block"><code>from scipy.cluster.hierarchy import linkage, dendrogram
from hrp import correlation_distance, recursive_bisection

dist = correlation_distance(returns)
tree = linkage(dist, method="single")
order = dendrogram(tree, no_plot=True)["leaves"]

weights = recursive_bisection(returns.cov(), order)
</code></pre>
      <p class="form-hint">Illustrative interface &mdash; the production version adds transaction-cost-aware rebalancing.</p>
    </div>
  </details>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Multivariate Hamrick&ndash;Taqqu Stationarity Test</h3>
    <span class="entry-date">2024</span>
  </div>
  <p>A novel functional stationarity test for multidimensional diffusion processes, developed for my MSc thesis and released as an open-source library.</p>
  <div class="tags"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/MultivariateHamrickTaqqu" target="_blank" rel="noopener noreferrer">MultivariateHamrickTaqqu on GitHub</a></div>

  <details>
    <summary><span class="label-open">+ Show details &amp; code</span><span class="label-close">&minus; Hide details</span></summary>
    <div class="readme">
      <h4>Overview</h4>
      <p>
        Extends the univariate Hamrick&ndash;Taqqu stationarity test to multidimensional diffusion processes,
        testing whether a functional summary of the process (e.g. its local variance) is stable over a
        rolling window, rather than assuming stationarity outright.
      </p>
      <h4>Usage</h4>
      <pre class="code-block"><code>from mht import MultivariateStationarityTest

test = MultivariateStationarityTest(window=250, n_bootstrap=1000)
result = test.run(paths)  # paths: (n_obs, n_dim) array

print(result.statistic, result.p_value)
</code></pre>
      <div class="tags"><a href="https://github.com/DaanZunnenberg/MultivariateHamrickTaqqu" target="_blank" rel="noopener noreferrer">Full source &amp; README on GitHub &rarr;</a></div>
    </div>
  </details>
</div>

<p>More on <a href="https://github.com/DaanZunnenberg" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
