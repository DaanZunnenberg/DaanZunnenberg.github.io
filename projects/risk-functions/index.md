---
layout: default
title: RiskFunctions
permalink: /projects/risk-functions/
---

<section class="hero">
  <canvas id="market-widget-canvas" class="hero-canvas" aria-label="Live BTC/USDT and ETH/USDT options chain" aria-hidden="true"></canvas>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Project &middot; 2024</div>
    <h1 class="hero-name">RiskFunctions</h1>
    <p class="hero-lede">A risk management library covering VaR/ES, GARCH, EWMA, copulas, and factor analysis.</p>
  </div>
</section>

<p class="tagline"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/RiskFunctions" target="_blank" rel="noopener noreferrer">RiskFunctions on GitHub</a></p>

<h2 id="overview">Overview</h2>
<p>
  A collection of risk models, organized by model family, kept deliberately as pure functions rather than a
  framework: each model family under <code>src/riskfunctions/models/</code> holds only estimator/analysis
  functions operating on DataFrames and arrays, with no I/O or plotting inside. Anything that loads data,
  wires a model together, or produces output lives in <code>examples/</code> instead, so the estimators
  themselves stay easy to test, reuse, and reason about independent of any particular data source.
</p>

<h2 id="model-families">Model Families</h2>
<ul>
  <li><strong>Variance-Covariance</strong>: rolling \(w^\top\text{Cov}(w)\) over a trailing window, scaled by a Normal or Student-t quantile for VaR, with closed-form Normal/Student-t expected shortfall.</li>
  <li><strong>Historic Simulation</strong>: rolling empirical quantile of realized portfolio returns for VaR, and the mean of the tail beyond it for ES &mdash; no distributional assumption at all.</li>
  <li><strong>CCC-GARCH</strong>: each risk factor filtered independently with a GARCH(1,1)-style recursion, combined through the constant full-sample correlation matrix (the "constant conditional correlation" assumption) into a portfolio variance and VaR.</li>
  <li><strong>EWMA / Filtered Historic Simulation</strong>: de-volatilizes each series with an EWMA filter, rescales the standardized residuals by the current predicted volatility, then runs historic simulation on the reconstructed portfolio series &mdash; a hybrid of parametric vol scaling and nonparametric tail estimation.</li>
  <li><strong>Copulas</strong>: bivariate Archimedean copulas (Clayton, Frank, Gumbel) and Gaussian/Student-t marginal copulas, fit on rank-transformed (empirical CDF) data and compared by log-likelihood and AIC.</li>
  <li><strong>Factor Analysis</strong>: PCA and maximum-likelihood factor analysis (with optional varimax/oblimin rotation) for decomposing risk factor co-movement.</li>
  <li><strong>Stress Testing</strong>: deterministic shock scenarios applied over fixed historical date windows, for seeing how a portfolio would have behaved under a specific stress episode rather than a simulated one.</li>
</ul>
<p>
  A deliberate simplification runs through the GARCH and EWMA models: persistence parameters are fixed
  constants rather than MLE-fitted, with the intercept re-derived periodically from trailing unconditional
  variance via the standard GARCH variance-targeting relation. That trades a small amount of fit quality for
  models that are fast, stable, and easy to reason about across a long backtest &mdash; a reasonable choice for
  a risk-monitoring library rather than a forecasting one.
</p>

<h2 id="backtesting">Backtesting</h2>
<p>
  Validation is a genuine part of the library, not an afterthought: <code>Backtest()</code> runs a two-sided
  binomial test on the count of VaR violations plus a z-test comparing realized versus predicted expected
  shortfall, with an optional QQ-plot of violation inter-arrival times against the Exponential distribution
  to check whether violations really do arrive like a Poisson process (as the VaR framework implicitly
  assumes) rather than clustering together. Separately, a full Christoffersen (1998) test is implemented
  &mdash; unconditional coverage, independence, and conditional coverage &mdash; with the transition-count
  likelihood-ratio math worked out directly rather than delegated to a library, including guards against the
  zero-count edge cases that make the naive formulas blow up.
</p>

<h2 id="usage">Usage</h2>
<pre class="code-block" data-lang="bash"><code>python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"          # core + test dependencies
pip install -e ".[multivariate]" # needed only for copulas / factor analysis
</code></pre>
<p>Each example script wires one model family end to end: loads a cached portfolio sample (AAPL, ASML, Airbus, LVMH, EuroStoxx50, EUR/USD, and Euribor 3M, 2010&ndash;2024), fits the model, computes VaR/ES across a grid of confidence levels, and backtests year by year.</p>
<pre class="code-block" data-lang="bash"><code>python examples/var_covariance_example.py
python examples/ccc_garch_example.py
python examples/ewma_fhs_example.py
</code></pre>
<p class="form-hint">The <code>[multivariate]</code> extra (copulas, factor_analysis, seaborn) is only needed for the copula and factor-analysis examples, which also pull fresh price data over the network via yfinance.</p>

<p><a href="{{ '/projects/' | relative_url }}">&larr; Back to Projects</a></p>
