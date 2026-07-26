---
layout: default
title: Functional Volatility Surface Modelling
permalink: /projects/functional-volatility-surface-modelling/
---

<section class="hero">
  <img class="hero-img" src="{{ '/images/volatility/back1.png' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Project &middot; September 2024 &ndash; present</div>
    <h1 class="hero-name">Functional Volatility Surface Modelling</h1>
    <p class="hero-lede">Functional GARCH and GAS-GARCH, extended to intraday volatility surfaces.</p>
  </div>
</section>

<div class="article-body">

<p class="tagline"><code>Python</code> &middot; <code>numba</code> &middot; <code>scipy</code> &middot; <a href="https://github.com/DaanZunnenberg/FunctionalScale" target="_blank" rel="noopener noreferrer">FunctionalScale on GitHub</a></p>

<h2 id="overview">Overview</h2>
<p>
  Classical GARCH treats a single number, the daily variance, as the thing worth modelling. Intraday data
  gives you a full curve instead: volatility has a shape across the trading day, not just a level. This
  project treats continuous intraday log-return paths as functions \(y_t(u)\) over the trading day
  \(u \in [0,1]\), and extends the GARCH recursion from a scalar update to an operator update over the
  whole curve, so a shock at any point in the day can feed into the entire upcoming volatility surface
  rather than a single end-of-day number.
</p>

<h2 id="model">Model</h2>
<p>
  The functional scale model decomposes returns using a time-varying conditional variance curve
  \(\sigma_t^2(u)\), so we look at
  \[y_t(u) = \sigma_t(u)\eta_t(u)\]
  driven by the recursion
  \[\sigma_t^2 = \delta + \sum_{i=1}^{q}\alpha_i\left(y_{t-i}^2\right) + \sum_{j=1}^{p}\beta_j\left(\sigma_{t-j}^2\right)\]
  where \(\delta\) is a strictly positive baseline intercept curve, and \(\alpha_i, \beta_j\) are integral
  kernel operators mapping past squared return curves and past volatility curves into today's volatility
  surface.
</p>
<p>
  The functional GAS extension replaces the autoregressive dependence on past squared return curves with a
  score-driven update:
  \[\sigma_{t+1}^2 = \delta + B\sigma_t^2 + A\int \phi_K(s)y_t^2(s)\,ds,\]
  where \(B\) is a linear persistence operator acting on the previous volatility curve, and \(A\) maps the
  score of the observed squared return curve into the updated volatility curve. Equivalently, using integral
  kernel operators,
  \[\sigma_{t+1}^2(u) = \delta(u) + \int B(u,v)\sigma_t^2(v)\,dv + \int A(u,s)\phi_K(s)y_t^2(s)\,ds.\]
  Instead of fitting one static operator to the whole sample, the GAS-GARCH model updates its coefficients
  every day from the score of the latest return curve, which is what lets it track a surface that itself
  drifts over the sample rather than staying fixed.
</p>

<h2 id="implementation">Implementation</h2>
<p>
  The package (<code>funcgarch</code>, currently v1.1.4) splits cleanly into a numerics core and a data
  pipeline that never touch each other: <code>fit</code>/<code>garch_filter</code> only ever see a plain
  <code>(n_grid, n_days)</code> numpy matrix of intraday returns, regardless of where that matrix came from.
</p>
<ul>
  <li><code>basis.py</code> &mdash; <code>bernstein_basis</code> (numba-jitted) and <code>cubic_bspline_basis</code> (built on <code>scipy.interpolate.BSpline</code>), plus an Ornstein&ndash;Uhlenbeck kernel used for the GAS model's residual covariance.</li>
  <li><code>garch.py</code> &mdash; the Bernstein-basis functional GARCH(1,1): jitted operator builders <code>delta</code>/<code>kernel_operator</code>, a jitted <code>loss_func</code>, the <code>garch_filter</code> recursion, and <code>fit</code>, a thin wrapper around <code>scipy.optimize.minimize</code>.</li>
  <li><code>gas.py</code> &mdash; the B-spline models: <code>gas_garch_estimator</code> (the full-matrix GAS recursion with a Student-t score) and <code>func_garch_estimator</code> (a non-score-driven B-spline GARCH baseline for comparison).</li>
  <li><code>simulate.py</code> &mdash; Monte Carlo generation using the same Bernstein recursion, for building test surfaces with a known ground truth.</li>
  <li><code>scripts/taq_cleaner.py</code> &mdash; a <code>DataCleaner</code> that reshapes raw WRDS TAQ CSV exports into the <code>(n_grid, n_days)</code> matrix the core package expects.</li>
</ul>
<p>
  The recursion itself is a Riemann-sum discretization of the integral operators above, evaluated on a
  uniform intraday grid:
</p>
<pre class="code-block" data-lang="python"><code>variance = (
    delta_hat
    + (alpha_hat * returns[:, t - 1] ** 2) @ np.ones(n_grid_obs) / n_grid_obs
    + (beta_hat  * variance)               @ np.ones(n_grid_obs) / n_grid_obs
)</code></pre>
<p>
  <code>kernel_operator</code> materializes the full \(n_{\text{grid}} \times n_{\text{grid}}\) Bernstein
  kernel matrix once per objective-function call, and <code>bernstein_basis</code>,
  <code>kernel_operator</code>, <code>delta</code>, and <code>loss_func</code> are all numba
  <code>@jit(nopython=True)</code>, with hand-rolled factorial/combination helpers since scipy's own
  <code>comb</code> isn't numba-compatible. For the GAS model, the residual covariance inverse is computed
  once per optimizer step rather than once per day, which matters a lot for how long a single SLSQP call
  takes on a full sample.
</p>

<h2 id="estimation">Estimation</h2>
<p>
  Because a likelihood cannot be evaluated directly on a continuous curve, both models project the
  operators onto a small set of basis functions (Bernstein for the plain GARCH model, B-splines for the GAS
  extension) and estimate a short coefficient vector instead of the operators themselves. The loss used in
  practice is a Bernstein-projected mean squared error between the fitted and realized variance curves,
  which is a simplification of the formal quasi-maximum-likelihood objective from the underlying theory
  (Cerovecki et al., 2018) rather than the QMLE itself &mdash; the README is explicit about this gap, and it's
  a fair trade for a much cheaper objective to optimize. Optimization goes through
  <code>scipy.optimize.minimize</code> (SLSQP in the worked example), with simple box bounds
  \((-0.99, 0.99)\) on the coefficients as a stationarity proxy. The theory calls for non-negative kernel
  coefficients to guarantee a positive variance surface; the current fit does not enforce that constraint
  directly, so it's one of the more honest open items in the implementation rather than something papered
  over.
</p>
<p>
  The GAS model estimates a log-volatility curve with coefficient recursion
  \(b_t = \omega + Bb_{t-1} + As_{t-1}\), under a multivariate Student-t likelihood with an
  Ornstein&ndash;Uhlenbeck kernel covariance and an analytically (not autodiff) computed score. The worked
  example actually fits a diagonal-restricted variant of \(B\) and \(A\) rather than the full matrices, which
  keeps the parameter count manageable at the basis sizes used here.
</p>

<h2 id="results">Results</h2>
<p>
  Applying the framework to simulated intraday data with a functional GARCH(1,1) recursion and
  Bernstein-basis fit with <em>M</em> = 3 basis functions gives the fitted volatility surface shown below.
  The estimation recovers the main structure of the true process, while the remaining day-to-day roughness
  reflects finite-sample effects and the limited flexibility of the chosen basis:
</p>
<img src="{{ '/assets/img/garch_vol_surface.png' | relative_url }}" alt="True versus functional GARCH-estimated volatility surface, side by side" class="entry-figure">
<p class="form-hint">Simulated 25-point intraday grid over 500 trading days; estimated surface via <code>funcgarch.garch.fit</code> + <code>garch_filter</code>.</p>
<p>
  The main worked example simulates a 25&times;500 intraday volatility surface with a time-varying U-shape
  and fits a diagonal GAS model with SLSQP, reporting RMSE, MAE, Pearson correlation, \(R^2\), the moments of
  the standardized residuals against their theoretical Student-t values, and a Kolmogorov&ndash;Smirnov test.
  Because the score-driven update adapts its B-spline coefficients every day rather than fitting one static
  operator to the whole sample, the GAS-GARCH fit tracks the true surface considerably more tightly than the
  plain functional GARCH fit above:
</p>
<img src="{{ '/assets/img/gas_vol_surface.png' | relative_url }}" alt="True versus GAS-GARCH-estimated volatility surface, side by side" class="entry-figure">
<p class="form-hint">The GAS-GARCH volatility surface against the true surface, assessing recovery of the underlying dynamics.</p>
<p>
  Placing the two estimators' fitted surfaces directly next to each other, rather than each against the
  true surface separately, makes the score-driven adaptation's smoothing effect easier to see:
</p>
<img src="{{ '/assets/img/garch_vs_gas_vol_surface.png' | relative_url }}" alt="Functional GARCH-estimated versus GAS-GARCH-estimated volatility surface, side by side" class="entry-figure">
<p class="form-hint">Functional GARCH versus GAS-GARCH, showing the increased flexibility of the score-driven specification.</p>

<h2 id="setup">Setup &amp; Usage</h2>
<p>
  The package isn't on PyPI yet, so it installs straight from the repository, pulling in the numerical
  stack it depends on: <code>numpy</code>, <code>scipy</code>, <code>numba</code>, <code>pandas</code>,
  <code>matplotlib</code>, and <code>tqdm</code>.
</p>
<pre class="code-block" data-lang="bash"><code>git clone https://github.com/DaanZunnenberg/FunctionalScale.git
cd FunctionalScale
pip install -e .            # editable install, pulls in numpy/scipy/numba/pandas/matplotlib/tqdm
pip install -e ".[dev]"      # + pytest, jupyter (optional, for tests/notebooks)
</code></pre>
<p>The baseline functional GARCH fit takes a matrix of intraday return curves and returns a fitted variance surface of the same shape:</p>
<pre class="code-block" data-lang="python"><code>import numpy as np
from funcgarch import fit, garch_filter

# mY: (N, T) matrix of intraday return curves, N grid points per day, T days
mY = np.load("returns.npy")
N, T = mY.shape
M = 4  # number of Bernstein basis functions

result = fit(mY, n_grid=N, M=M)          # QMLE-style estimation (scipy.optimize)
vtheta_hat = result.x

sigma2 = garch_filter(mY, n_grid=N, vtheta=vtheta_hat, M=M)  # (N, T) fitted variance surface
</code></pre>
<p>The score-driven GAS-GARCH extension has a similar call shape, but also estimates the persistence and score operators \(B\) and \(A\):</p>
<pre class="code-block" data-lang="python"><code>from scipy.optimize import minimize
from funcgarch import gas_garch_estimator

# vtheta = [nu, ou_scale, omega (M,), vec(B) (M*M,), vec(A) (M*M,)]
result = minimize(
    gas_garch_estimator, x0=vtheta_init, args=(mY, N, M),
    method="SLSQP",
)
</code></pre>

<h2 id="data-flow">Data Flow</h2>
<p>
  Intraday trades are pulled from WRDS TAQ, cleaned and reshaped into the return matrix \(mY\), and then
  passed into the estimators shown above. The <code>funcgarch</code> core stays fully decoupled from this
  pipeline: it never imports anything WRDS- or TAQ-specific, only ever consuming a plain numpy matrix.
</p>
<pre class="code-block" data-lang="txt"><code>wrds/*.sas                    scripts/taq_cleaner.py           funcgarch/*.py
┌─────────────────┐           ┌────────────────────┐           ┌──────────────────────┐
│ WRDS TAQ pull   │  raw CSV  │ DataCleaner.clean()│  mY (N,T) │ fit() / garch_filter │
│ (data_fetcher,  │ ────────► │  - align to grid   │ ────────► │ gas_garch_estimator  │
│  taq_cleaner,   │           │  - compute returns │           │ func_garch_estimator │
│  nbbo/dynamic_  │           │  - reshape to      │           │                      │
│  taq_minute,    │           │    (N, T) matrix   │           │  -> vtheta_hat,      │
│  export)        │           │                    │           │     sigma2 surface   │
└─────────────────┘           └────────────────────┘           └──────────────────────┘
</code></pre>
<p class="form-hint">Requires Python &ge; 3.9. Pytest smoke tests cover Bernstein partition-of-unity, positive-definiteness of the OU kernel, and shape/finiteness of the GARCH filter output.</p>

</div>

<p><a href="{{ '/projects/' | relative_url }}">&larr; Back to Projects</a></p>
