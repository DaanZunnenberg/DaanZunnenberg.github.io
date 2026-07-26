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
  project, developed jointly with Andr&eacute; Lucas and Yicong Lin, treats continuous intraday log-return
  paths as functions \(y_t(u)\) over the trading day \(u \in [0,1]\), and extends the GARCH recursion from a
  scalar update to an operator update over the whole curve, so a shock at any point in the day can feed into
  the entire upcoming volatility surface rather than a single end-of-day number. Where the
  <a href="{{ '/projects/functional-scale-estimation/' | relative_url }}">Functional Scale Volatility Estimation</a>
  project focuses on getting a single static functional GARCH(1,1) recursion estimated correctly, this project
  extends the same Bernstein-basis idea to a genuinely time-varying, score-driven surface model, and is the
  computational engine behind the fast, scalable estimation methodology that is the shared goal of this
  collaboration.
</p>

<h2 id="model">Theoretical Integration</h2>
<p>
  The theory here synthesises two papers. Cerovecki, Francq, H&ouml;rmann &amp; Zako&iuml;an (2018) supply the
  functional GARCH(1,1) baseline and its quasi-likelihood estimation theory (see the
  <a href="{{ '/projects/functional-scale-estimation/' | relative_url }}">companion project page</a> for the
  full exposition of that model in the notation used here). Lin &amp; Lucas (2025, "Functional Location-Scale
  Models with Robust Observation-Driven Dynamics", Tinbergen Institute Discussion Paper TI 2025-027/III) supply
  the general functional location-scale framework and the score-driven (GAS) updating mechanism that this
  project's GAS-GARCH model implements. The two papers are harmonised into a single notational system
  throughout this page.
</p>
<p>
  As before, we work in \(H = L^2([0,1])\) with the functional scale model
  \[y_t(u) = \sigma_t(u)\,\eta_t(u), \qquad
  \sigma_t^2 = \delta + \sum_{i=1}^q \boldsymbol\alpha_i(y_{t-i}^2) + \sum_{j=1}^p \boldsymbol\beta_j(\sigma_{t-j}^2),\]
  where \(\delta \in H_*^+\) is a strictly positive baseline intercept curve and \(\boldsymbol\alpha_i,
  \boldsymbol\beta_j \in \mathcal K^+(H)\) are non-negative kernel operators mapping past squared-return curves
  and past volatility curves into today's volatility curve. This is the functional GARCH(1,1) baseline; the
  extension to a genuine <em>surface</em> comes from generalising the functional index from a single dimension
  \(u \in [0,1]\) (intraday time) to a \(d\)-dimensional index \(\boldsymbol t \in \mathcal T \subset
  \mathbb R^d\), so that the functional parameters trace out a time-varying surface (\(d=2\)) rather than a
  time-varying curve (\(d=1\)) as the day index \(i\) advances. Lin &amp; Lucas formalise this in a general
  functional location-scale model
  \[Y_i(\boldsymbol t) = \mu_i(\boldsymbol t) + \sigma_i(\boldsymbol t)\,\varepsilon_i(\boldsymbol t), \qquad
  i \in \llbracket T\rrbracket,\ \boldsymbol t \in \mathcal T,\]
  where both the location \(\mu_i(\cdot)\) and the scale \(\sigma_i(\cdot)\) are defined through link functions
  of an underlying vector-valued time-varying parameter \(\boldsymbol f_i(\cdot) \in \mathbb R^{n_f}\):
  \(\mu_i(\boldsymbol t) = g_\mu(\boldsymbol f_i(\boldsymbol t))\), \(\sigma_i(\boldsymbol t) =
  g_\sigma(\boldsymbol f_i(\boldsymbol t)) > 0\), for measurable link functions \(g_\mu, g_\sigma\) (e.g. the
  identity for the mean and \(\exp(\cdot)\) for the scale, guaranteeing positivity of \(\sigma_i\) by
  construction, exactly as the Bernstein-basis non-negativity trick did on the previous page). Setting \(d=1\),
  \(g_\mu \equiv 0\) and taking \(\sigma_i^2(\cdot)\) to follow the functional GARCH(1,1) recursion above
  recovers Cerovecki et al.'s model as the special, purely scalar-domain, non-score-driven case of this general
  location-scale framework &mdash; which is exactly the "motivating example" role the functional GARCH model
  plays in Lin &amp; Lucas's paper.
</p>
<p>
  The transition from a curve to a surface happens entirely inside the basis-projection step. Instead of
  projecting a single intraday operator onto a 1-D basis \(\{\varphi_1,\dots,\varphi_M\}\), Lin &amp; Lucas
  project the \(j\)-th component of \(\boldsymbol f_i(\cdot)\) onto a finite set of <em>product</em> basis
  functions across all \(d\) dimensions of \(\boldsymbol t = (t_1,\dots,t_d)'\):
  \[f_i(\boldsymbol t) = \sum_{1 \le \boldsymbol k \le \boldsymbol K} \bar{\boldsymbol\gamma}_{i,\boldsymbol k}\,
  \phi_{\boldsymbol k}(\boldsymbol t) = \boldsymbol\Gamma_i\,\boldsymbol\phi_{\boldsymbol K}(\boldsymbol t),\]
  using the multi-index shorthand \(\phi_{\boldsymbol k}(\boldsymbol t) = \prod_{i=1}^d \phi_{k_i}(t_i)\) for
  \(\boldsymbol k = (k_1,\dots,k_d)' \in \mathbb N^d\), \(\boldsymbol K = (K_1,\dots,K_d)'\), with
  \(\boldsymbol\Gamma_i \in \mathbb R^{n_f \times (K_1 K_2\cdots K_d)}\) gathering the basis coefficients and
  \(\boldsymbol\phi_{\boldsymbol K}(\boldsymbol t) \in \mathbb R^{(K_1 K_2\cdots K_d)\times 1}\) stacking all
  possible cross-products of the per-dimension basis functions. For \(d=1\) this collapses exactly to the
  Bernstein-basis projection used for the functional GARCH(1,1) intercept and kernel operators on the previous
  page; for \(d=2\) the same machinery projects a genuine intraday-volatility <em>surface</em> onto tensor
  products of a basis in each of two dimensions (e.g. intraday time and calendar time, or intraday time and a
  second maturity- or day-of-week-type index). Multiplying by \(\boldsymbol\phi_{\boldsymbol K}(\boldsymbol t)^\top\)
  and integrating recovers the projection coefficients in closed form,
  \[\boldsymbol\gamma_i = \mathrm{vec}\bigl(\boldsymbol\Gamma_i^\top\bigr) =
  \mathrm{vec}\!\left(\left(\int \boldsymbol\phi_{\boldsymbol K}(\boldsymbol t)\boldsymbol\phi_{\boldsymbol K}(\boldsymbol t)^\top\,d\boldsymbol t\right)^{-1}
  \int \boldsymbol\phi_{\boldsymbol K}(\boldsymbol t)\boldsymbol f_i(\boldsymbol t)^\top\,d\boldsymbol t\right),\]
  and the location and scale dynamics follow immediately as
  \(\mu_i(\boldsymbol t) = g_\mu(\boldsymbol\Gamma_i\boldsymbol\phi_{\boldsymbol K}(\boldsymbol t))\),
  \(\sigma_i(\boldsymbol t) = g_\sigma(\boldsymbol\Gamma_i\boldsymbol\phi_{\boldsymbol K}(\boldsymbol t))\).
</p>

<h2 id="implementation">Estimation Procedure</h2>
<p>
  The score-driven update generalises the functional GARCH recursion of the previous page to the general
  location-scale coefficient vector \(\boldsymbol\gamma_i\):
  \[\boldsymbol\gamma_{i+1} = \boldsymbol\omega + \boldsymbol A\,\boldsymbol s(Y_i, \boldsymbol\gamma_i) + \boldsymbol B\,\boldsymbol\gamma_i,\]
  where \(\boldsymbol s(\cdot,\cdot)\) is a function(al) of the previous observation and the previous
  coefficient vector. Setting \(d=1\) and \(\boldsymbol s(Y_i,\boldsymbol\gamma_i) = \int\phi_{\boldsymbol K}(s)Y_i^2(s)\,ds\)
  recovers the functional GARCH update exactly; the GAS extension instead defines \(\boldsymbol s(\cdot,\cdot)\)
  as a <em>scaled score</em> of a Student-\(t\)-process log-likelihood, following the observation-driven
  framework of Creal, Koopman &amp; Lucas (2013) and Harvey (2013). Errors are modelled as zero-mean Student
  processes rather than Gaussian, so that outlying observations are automatically downweighted in the update
  &mdash; the same robustness property that makes score-driven (GAS) models attractive in the finite-dimensional
  case, extended here to the functional setting for the first time. Given data \(\boldsymbol Y_i =
  (Y_i(\boldsymbol t_1),\dots,Y_i(\boldsymbol t_N))^\top\) observed on a finite grid \(\mathbb T =
  \{\boldsymbol t_1,\dots,\boldsymbol t_N\}\), the model is
  \[\boldsymbol Y_i = \boldsymbol\mu(\boldsymbol\gamma_i) + \boldsymbol\Sigma(\boldsymbol\gamma_i)\boldsymbol\varepsilon_i,
  \qquad \boldsymbol\varepsilon_i \overset{\text{i.i.d.}}\sim t_{\nu_1}(\boldsymbol 0, \boldsymbol\Lambda(\boldsymbol\nu_2)),\]
  with \(\boldsymbol\Lambda(\boldsymbol\nu_2)\) an \(N\times N\) covariance kernel matrix (e.g. a Student-\(t\)
  Ornstein&ndash;Uhlenbeck process across the grid, mirroring the OU kernel used for the residual covariance in
  this project's GAS-GARCH implementation). The resulting scaled score has an intuitive decomposition into a
  location term and a scale term,
  \[\nabla(Y_i,\boldsymbol\gamma_i,\boldsymbol\nu) = \nabla^\mu(Y_i,\boldsymbol\gamma_i,\boldsymbol\nu) + \nabla^\sigma(Y_i,\boldsymbol\gamma_i,\boldsymbol\nu),\]
  where \(\nabla^\mu\) projects the weighted standardised error \(w_i(\boldsymbol\gamma_i,\boldsymbol\nu)\,\boldsymbol e_i(\boldsymbol\gamma_i)\)
  onto the basis via the derivative of the link function, and \(\nabla^\sigma\) does the same for the deviation
  of the squared standardised errors from their conditional expectation of one; in both terms the weight
  \(w_i(\boldsymbol\gamma_i,\boldsymbol\nu) = (1+\nu_1^{-1}N)/(1+\nu_1^{-1}\boldsymbol e_i^\top\boldsymbol\Lambda(\boldsymbol\nu_2)^{-1}\boldsymbol e_i)\)
  shrinks toward zero for large standardised residuals, which is exactly the mechanism that shields the
  time-varying location and scale parameters from the distorting effect of influential observations. The
  static parameters \(\boldsymbol\theta = (\boldsymbol\nu^\top,\boldsymbol\omega^\top,\mathrm{vec}(\boldsymbol A)^\top,\mathrm{vec}(\boldsymbol B)^\top)^\top\)
  are then estimated by maximising the resulting Student-\(t\) log-likelihood averaged across the sample,
  and Lin &amp; Lucas establish stationarity, ergodicity, filter invertibility, strong consistency and
  asymptotic normality of this estimator under regularity conditions analogous to those used for the
  functional GARCH QMLE on the previous page.
</p>
<p>
  The <code>funcgarch</code> package's own GAS-GARCH implementation is a concrete, lower-dimensional instance
  of this general machinery: it fixes \(d=1\) (a purely intraday volatility curve, no second surface
  dimension), replaces the Bernstein basis with a general B-spline basis (built on
  <code>scipy.interpolate.BSpline</code>, which is more flexible for smoothing a curve that is expected to
  drift over the sample), and specialises the Student-\(t\) covariance kernel to an
  Ornstein&ndash;Uhlenbeck process across the intraday grid. The B-spline coefficient vector plays the role of
  \(\boldsymbol\gamma_i\) above, and its score-driven update is what allows the fitted surface to track a
  volatility pattern that itself changes shape over the sample, rather than fitting one static operator to the
  whole sample as the plain functional GARCH model does.
</p>

<h2 id="code-structure">Code Structure &amp; Explanation</h2>
<p>
  The package (<code>funcgarch</code>, currently v1.1.4) splits cleanly into a numerics core and a data
  pipeline that never touch each other: <code>fit</code>/<code>garch_filter</code>/<code>gas_garch_estimator</code>
  only ever see a plain <code>(n_grid, n_days)</code> numpy matrix of intraday returns, regardless of where
  that matrix came from &mdash; a deliberate separation that keeps the performance-critical numerical core free
  of I/O or pandas overhead.
</p>
<ul>
  <li><code>basis.py</code> &mdash; <code>bernstein_basis</code> (numba-jitted) and <code>cubic_bspline_basis</code> (built on <code>scipy.interpolate.BSpline</code>), plus an Ornstein&ndash;Uhlenbeck kernel used for the GAS model's residual covariance.</li>
  <li><code>garch.py</code> &mdash; the Bernstein-basis functional GARCH(1,1): jitted operator builders <code>delta</code>/<code>kernel_operator</code>, a jitted <code>loss_func</code>, the <code>garch_filter</code> recursion, and <code>fit</code>, a thin wrapper around <code>scipy.optimize.minimize</code>.</li>
  <li><code>gas.py</code> &mdash; the B-spline models: <code>gas_garch_estimator</code> (the full-matrix GAS recursion with a Student-t score) and <code>func_garch_estimator</code> (a non-score-driven B-spline GARCH baseline for comparison).</li>
  <li><code>simulate.py</code> &mdash; Monte Carlo generation using the same Bernstein recursion, for building test surfaces with a known ground truth.</li>
  <li><code>scripts/taq_cleaner.py</code> &mdash; a <code>DataCleaner</code> that reshapes raw WRDS TAQ CSV exports into the <code>(n_grid, n_days)</code> matrix the core package expects.</li>
</ul>
<p>
  The GAS-GARCH log-likelihood loop is where the score-driven update from the theory above is actually coded.
  At each day it computes the current log-volatility curve <code>log_vol = basis_mat.T @ coef_vec</code> from
  the B-spline coefficients, standardises the previous day's return against it and the OU covariance kernel to
  get the Student-\(t\) quadratic form <code>student_denom</code>, projects the resulting error term back onto
  the B-spline basis to get the score, and then advances the coefficient vector by the GAS recursion
  \(b_t = \omega + Bb_{t-1} + As_{t-1}\):
</p>
<pre class="code-block" data-lang="python"><code>for t in range(1, n_days):
    log_vol = basis_mat.T @ coef_vec          # (n_grid, 1)
    log_vol_surface[:, t] = log_vol[:, 0]

    std_dev   = np.exp(log_vol / 2)           # sigma_t at each grid point
    scale_inv = np.eye(n_grid) / std_dev      # diag(1/sigma_t)

    student_denom = float(np.sum(
        1 + (returns_prev.T @ (scale_inv @ (cov_inv @ (scale_inv @ returns_prev)))) / nu
    ))
    score_a = (returns_prev / std_dev).T * basis_mat   # (n_basis, n_grid)
    score_b = score_a @ (cov_inv @ (scale_inv @ returns_prev))

    score    = (
        -0.5 * basis_mat.sum(axis=1, keepdims=True)
        + (nu_scale / student_denom) * score_b
    )
    coef_vec     = omega + persistence_mat @ coef_vec + score_gain_mat @ score
    returns_prev = returns[:, t].reshape(n_grid, 1)</code></pre>
<p>
  Here <code>cov_inv</code> is the inverse of the \(N\times N\) Ornstein&ndash;Uhlenbeck kernel matrix
  \(\boldsymbol\Lambda(\boldsymbol\nu_2)\) and is computed <em>once</em> per optimizer step rather than once
  per day, since it does not depend on \(t\) &mdash; a numerical-stability and speed decision that matters a
  great deal over a sample of hundreds or thousands of trading days: without hoisting the inversion out of the
  day loop, a single SLSQP call would need to invert an \(N\times N\) matrix on every one of \(T\) days,
  for every one of the (potentially thousands of) function evaluations the optimizer needs to converge. The
  <code>student_denom</code> term is exactly the quadratic form \(1+\nu_1^{-1}\boldsymbol e_i^\top\boldsymbol\Lambda(\boldsymbol\nu_2)^{-1}\boldsymbol e_i\)
  from the weight \(w_i(\boldsymbol\gamma_i,\boldsymbol\nu)\) above, and <code>score_b</code> is the projected
  standardised error \(\dot{\boldsymbol G}_\sigma^\top\boldsymbol\Sigma^{-1}\boldsymbol\Lambda(\boldsymbol\nu_2)^{-1}\boldsymbol e_i\)
  that feeds the scale part of the score; because <code>student_denom</code> sits in the denominator of the
  score gain, a day with a large standardised residual automatically produces a smaller score update, which is
  precisely the outlier-robustness mechanism the theory predicts. The <code>gas_garch_estimator</code> function
  is called directly inside a <code>scipy.optimize.minimize</code> loop and returns both the negative average
  log-likelihood (the objective) and the fitted log-volatility surface, so a single call after optimisation
  recovers \(\widehat\sigma_i(\cdot) = \exp(\text{log\_vol\_surface}/2)\) for the whole sample:
</p>
<pre class="code-block" data-lang="python"><code>result = minimize(
    lambda vtheta: gas_garch_estimator(mY, vb0, mBsplinesSparseMat, vtheta)[0],
    vtheta0_GAS, bounds=list(zip(LB_GAS, UB_GAS)), method='SLSQP',
    options={'maxiter': 200},
)
log_vol_surface = gas_garch_estimator(mY, vb0, mBsplinesSparseMat, result.x)[1]
sigma_hat = np.exp(log_vol_surface / 2)</code></pre>
<p>
  Vectorisation is used systematically throughout to avoid Python-level loops over the intraday grid: the
  functional GARCH recursion in <code>garch.py</code> evaluates the Bernstein kernel matrices only once per
  optimizer step via <code>_build_operators</code>, then reuses them for every day; <code>kernel_operator</code>,
  <code>bernstein_basis</code>, <code>delta</code>, and <code>loss_func</code> are all
  <code>@jit(nopython=True)</code>, letting Numba compile the day-loop's numerical core to machine code rather
  than paying Python's interpreter overhead on every grid point. The remaining per-day cost in either model is
  dominated by matrix-vector products of size \(N\), which SciPy/BLAS already dispatch to vectorised routines
  &mdash; the combination of JIT compilation for the basis-function evaluation and BLAS-backed linear algebra
  for the recursion itself is what keeps a full SLSQP fit over hundreds of trading days and thousands of
  intraday observations tractable on a laptop, in line with the fast-and-scalable design goal shared with
  Lucas and Lin's broader research programme.
</p>

<h2 id="results">Results &amp; Interpretation</h2>
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
  the standardized residuals against their theoretical Student-t values, and a Kolmogorov&ndash;Smirnov test
  &mdash; a direct empirical check of the theoretical guarantee that the score-driven filter should recover
  Student-\(t\) distributed standardised innovations under correct specification. Because the score-driven
  update adapts its B-spline coefficients every day rather than fitting one static operator to the whole
  sample, the GAS-GARCH fit tracks the true surface considerably more tightly than the plain functional GARCH
  fit above:
</p>
<img src="{{ '/assets/img/gas_vol_surface.png' | relative_url }}" alt="True versus GAS-GARCH-estimated volatility surface, side by side" class="entry-figure">
<p class="form-hint">The GAS-GARCH volatility surface against the true surface, assessing recovery of the underlying dynamics.</p>
<p>
  Placing the two estimators' fitted surfaces directly next to each other, rather than each against the
  true surface separately, makes the score-driven adaptation's smoothing effect easier to see:
</p>
<img src="{{ '/assets/img/garch_vs_gas_vol_surface.png' | relative_url }}" alt="Functional GARCH-estimated versus GAS-GARCH-estimated volatility surface, side by side" class="entry-figure">
<p class="form-hint">Functional GARCH versus GAS-GARCH, showing the increased flexibility of the score-driven specification.</p>
<p>
  This finite-sample pattern is exactly what the theory predicts: a static functional GARCH operator, however
  well fit, is a single point in operator space and cannot track a surface whose shape itself evolves; a
  score-driven update, by construction, adjusts its basis coefficients every day in the direction that locally
  improves the fit to the latest observation, and the outlier-downweighting mechanism built into the Student-t
  score keeps that adaptation from overreacting to any single noisy day. In Lin &amp; Lucas's own empirical
  applications &mdash; intraday volatility of Pfizer stock during the COVID-19 pandemic (\(d=1\)) and
  PM<sub>2.5</sub> concentrations from sparse, noisy citizen-science sensors across Europe (\(d=2\)) &mdash;
  the same robust score-driven mechanism is shown to outperform the non-robust functional GARCH benchmark
  specifically during periods of market or measurement stress, which is the empirical signature of the
  theoretical robustness result: outlying observations are downweighted in the parameter update, not just
  absorbed uncritically into the fitted surface.
</p>

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
