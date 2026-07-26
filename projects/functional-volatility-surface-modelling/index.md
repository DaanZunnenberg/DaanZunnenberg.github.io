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
  gives you a full curve instead, volatility has a shape across the trading day, not just a level. This
  project, developed jointly with Andr&eacute; Lucas and Yicong Lin, treats intraday log-return paths as
  functions \(y_t(u)\) over the trading day \(u \in [0,1]\), and extends the GARCH recursion from a scalar
  update to an operator update over the whole curve, so a shock at any point in the day can feed into the
  entire upcoming volatility surface rather than a single end-of-day number. Where the
  <a href="{{ '/projects/functional-scale-estimation/' | relative_url }}">Functional Scale Volatility Estimation</a>
  project focuses on getting a single static functional GARCH(1,1) recursion estimated correctly, this project
  extends the same Bernstein-basis idea to a genuinely time-varying, score-driven model, and is the
  computational engine behind the fast, scalable estimation methodology shared across this collaboration.
</p>

<h2 id="model">Theoretical Integration</h2>
<p>
  The theory here draws on two papers. Cerovecki, Francq, H&ouml;rmann &amp; Zako&iuml;an (2018) supply the
  functional GARCH(1,1) baseline and its quasi-likelihood estimation theory, see the
  <a href="{{ '/projects/functional-scale-estimation/' | relative_url }}">companion project page</a> for the
  full exposition of that model in the notation used here. Lin &amp; Lucas (2025, "Functional Location-Scale
  Models with Robust Observation-Driven Dynamics", Tinbergen Institute Discussion Paper TI 2025-027/III) supply
  the score-driven updating mechanism that this project's GAS-GARCH model implements. Their paper covers a much
  more general setting, joint location and scale dynamics over an arbitrary functional dimension, on sparsely
  observed data. This codebase implements the specific corner of that framework needed for intraday
  volatility, scale dynamics only, on a regular intraday grid, harmonised with the notation of the previous
  page.
</p>
<p>
  As before, we work in \(H = L^2([0,1])\) with the functional scale model
  \[y_t(u) = \sigma_t(u)\,\eta_t(u), \qquad
  \sigma_t^2 = \delta + \sum_{i=1}^q \boldsymbol\alpha_i(y_{t-i}^2) + \sum_{j=1}^p \boldsymbol\beta_j(\sigma_{t-j}^2),\]
  the functional GARCH(1,1) model from the previous page. Projecting \(\delta\), \(\boldsymbol\alpha_i\) and
  \(\boldsymbol\beta_j\) onto a finite basis turns this recursion into a recursion for the basis-coefficient
  vector \(\boldsymbol\gamma_i\) itself,
  \[\boldsymbol\gamma_{i+1} = \boldsymbol\omega + \bar{\boldsymbol B}\,\boldsymbol\gamma_i + \boldsymbol A \int \varphi(s)\,y_i^2(s)\,ds,\]
  an update driven purely by the previous day's squared-return curve. The GAS extension changes only the
  driving term. Instead of feeding in the raw squared-return projection, it feeds in the score of a fat-tailed
  log-likelihood, so the size of today's update to \(\boldsymbol\gamma_i\) depends on how surprising today's
  observation was, not just on its magnitude.
</p>

<h2 id="implementation">Estimation Procedure</h2>
<p>
  The GAS recursion for the B-spline coefficient vector \(\boldsymbol\gamma_i\) is
  \[\boldsymbol\gamma_{i+1} = \boldsymbol\omega + \boldsymbol A\,\boldsymbol s_i + \boldsymbol B\,\boldsymbol\gamma_i,\]
  where \(\boldsymbol s_i\) is the scaled score of the model's log-likelihood at day \(i\), \(\boldsymbol\omega\)
  is a constant, \(\boldsymbol B\) governs persistence, and \(\boldsymbol A\) governs the sensitivity of the
  update to new information. Returns are modelled as a zero-mean Student-\(t\) process rather than Gaussian, so
  a day with an unusually large or noisy intraday return is automatically downweighted when the score is
  computed. This is the same robustness property that makes score-driven models attractive in the classical,
  finite-dimensional case, carried over to the functional setting. The covariance across intraday grid points
  is itself modelled as a Student-\(t\) Ornstein&ndash;Uhlenbeck process, so grid points close together in
  intraday time are allowed to be more strongly correlated than distant ones. The static parameters
  \(\boldsymbol\omega,\boldsymbol A,\boldsymbol B\), together with the Student-\(t\) degrees of freedom and the
  OU decay parameter, are estimated by maximising the resulting average log-likelihood over the sample. Lin
  &amp; Lucas establish stationarity, ergodicity, filter invertibility, strong consistency and asymptotic
  normality of this estimator under regularity conditions analogous to those used for the functional GARCH
  QMLE on the previous page.
</p>
<p>
  The <code>funcgarch</code> package's GAS-GARCH implementation is this scale-only case. It replaces the
  Bernstein basis with a general B-spline basis, more flexible for smoothing a curve that is expected to drift
  over the sample, and uses the Ornstein&ndash;Uhlenbeck kernel for the Student-\(t\) covariance across the
  intraday grid. The B-spline coefficient vector plays the role of \(\boldsymbol\gamma_i\) above, and its
  score-driven update lets the fitted curve track a volatility pattern that itself changes shape over the
  sample, rather than fitting one static operator to the whole sample as the plain functional GARCH model does.
</p>

<h2 id="code-structure">Code Structure &amp; Explanation</h2>
<p>
  The package (<code>funcgarch</code>) splits into a numerics core and a data pipeline that never touch each
  other. <code>fit</code>, <code>garch_filter</code> and <code>gas_garch_estimator</code> only ever see a
  plain <code>(n_grid, n_days)</code> numpy matrix of intraday returns, regardless of where that matrix came
  from. This separation keeps the performance-critical numerical core free of I/O or pandas overhead.
</p>
<ul>
  <li><code>basis.py</code> &mdash; <code>bernstein_basis</code> (numba-jitted) and <code>cubic_bspline_basis</code>, plus an Ornstein&ndash;Uhlenbeck kernel used for the GAS model's residual covariance.</li>
  <li><code>garch.py</code> &mdash; the Bernstein-basis functional GARCH(1,1), covered on the previous page.</li>
  <li><code>gas.py</code> &mdash; the B-spline models, <code>gas_garch_estimator</code> for the full GAS recursion with a Student-t score, and <code>func_garch_estimator</code> as a non-score-driven B-spline GARCH baseline for comparison.</li>
  <li><code>simulate.py</code> &mdash; Monte Carlo generation using the same Bernstein recursion, for building test surfaces with a known ground truth.</li>
  <li><code>scripts/taq_cleaner.py</code> &mdash; reshapes raw WRDS TAQ CSV exports into the <code>(n_grid, n_days)</code> matrix the core package expects.</li>
</ul>
<p>
  The GAS-GARCH log-likelihood loop in <code>gas_garch_estimator</code> is where the score-driven update is
  actually coded. At each day it computes the current log-volatility curve from the B-spline coefficients,
  standardises the previous day's return against it and the OU covariance kernel to get the Student-\(t\)
  quadratic form, projects the resulting error term back onto the B-spline basis to get the score, and then
  advances the coefficient vector by the GAS recursion \(b_t = \omega + Bb_{t-1} + As_{t-1}\).
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
  <code>cov_inv</code> is the inverse of the \(N\times N\) Ornstein&ndash;Uhlenbeck kernel matrix, computed
  once per optimizer step rather than once per day, since it does not depend on \(t\). This matters over a
  sample of hundreds or thousands of trading days. Without hoisting the inversion out of the day loop, a
  single SLSQP call would need to invert an \(N\times N\) matrix on every day, for every function evaluation
  the optimizer needs. <code>student_denom</code> is the Student-\(t\) quadratic form that sits in the
  denominator of the score gain, so a day with a large standardised residual automatically produces a smaller
  score update. That is the outlier-robustness mechanism the theory predicts. <code>gas_garch_estimator</code>
  is called directly inside a <code>scipy.optimize.minimize</code> loop and returns both the negative average
  log-likelihood and the fitted log-volatility surface, so a single call after optimisation recovers the fitted
  volatility for the whole sample.
</p>
<p>
  Vectorisation avoids Python-level loops over the intraday grid throughout. The functional GARCH recursion in
  <code>garch.py</code> evaluates the Bernstein kernel matrices only once per optimizer step, then reuses them
  for every day. <code>kernel_operator</code>, <code>bernstein_basis</code>, <code>delta</code> and
  <code>loss_func</code> are all <code>@jit(nopython=True)</code>, letting Numba compile the day loop's
  numerical core to machine code rather than paying Python's interpreter overhead on every grid point. The
  remaining per-day cost in either model is dominated by matrix-vector products of size \(N\), which SciPy and
  BLAS already dispatch to vectorised routines. JIT compilation for the basis functions plus BLAS-backed
  linear algebra for the recursion is what keeps a full SLSQP fit over hundreds of trading days tractable on a
  laptop, in line with the fast and scalable design goal shared with Lucas and Lin's broader research
  programme.
</p>

<h2 id="results">Results &amp; Interpretation</h2>
<p>
  Applying the framework to simulated intraday data with a functional GARCH(1,1) recursion and a
  Bernstein-basis fit with <em>M</em> = 3 basis functions gives the fitted volatility surface shown below.
  The estimation recovers the main structure of the true process, while the remaining day-to-day roughness
  reflects finite-sample effects and the limited flexibility of the chosen basis.
</p>
<img src="{{ '/assets/img/garch_vol_surface.png' | relative_url }}" alt="True versus functional GARCH-estimated volatility surface, side by side" class="entry-figure">
<p class="form-hint">Simulated 25-point intraday grid over 500 trading days. Estimated surface via <code>funcgarch.garch.fit</code> + <code>garch_filter</code>.</p>
<p>
  The main worked example simulates a 25&times;500 intraday volatility surface with a time-varying U-shape and
  fits a diagonal GAS model with SLSQP, reporting RMSE, MAE, Pearson correlation, \(R^2\), the moments of the
  standardized residuals against their theoretical Student-t values, and a Kolmogorov&ndash;Smirnov test. That
  is a direct empirical check of the theoretical guarantee that the score-driven filter should recover
  Student-\(t\) distributed standardised innovations under correct specification. Because the score-driven
  update adapts its B-spline coefficients every day rather than fitting one static operator to the whole
  sample, the GAS-GARCH fit tracks the true surface considerably more tightly than the plain functional GARCH
  fit above.
</p>
<img src="{{ '/assets/img/gas_vol_surface.png' | relative_url }}" alt="True versus GAS-GARCH-estimated volatility surface, side by side" class="entry-figure">
<p class="form-hint">The GAS-GARCH volatility surface against the true surface, assessing recovery of the underlying dynamics.</p>
<p>
  Placing the two estimators' fitted surfaces directly next to each other, rather than each against the true
  surface separately, makes the score-driven adaptation's smoothing effect easier to see.
</p>
<img src="{{ '/assets/img/garch_vs_gas_vol_surface.png' | relative_url }}" alt="Functional GARCH-estimated versus GAS-GARCH-estimated volatility surface, side by side" class="entry-figure">
<p class="form-hint">Functional GARCH versus GAS-GARCH, showing the increased flexibility of the score-driven specification.</p>
<p>
  This finite-sample pattern is exactly what the theory predicts. A static functional GARCH operator, however
  well fit, is a single point in operator space and cannot track a surface whose shape itself evolves. A
  score-driven update, by construction, adjusts its basis coefficients every day in the direction that locally
  improves the fit to the latest observation, and the outlier-downweighting mechanism built into the Student-t
  score keeps that adaptation from overreacting to any single noisy day. In Lin &amp; Lucas's own empirical
  applications, intraday volatility of Pfizer stock during the COVID-19 pandemic and PM<sub>2.5</sub>
  concentrations from sparse, noisy citizen-science sensors across Europe, the same robust score-driven
  mechanism outperforms the non-robust functional GARCH benchmark specifically during periods of market or
  measurement stress. That is the empirical signature of the theoretical robustness result, outlying
  observations are downweighted in the parameter update rather than absorbed uncritically into the fitted
  surface.
</p>

<h2 id="data-flow">Data Flow</h2>
<p>
  Intraday trades are pulled from WRDS TAQ, cleaned and reshaped into the return matrix <code>mY</code>, and
  then passed into the estimators above. The <code>funcgarch</code> core stays fully decoupled from this
  pipeline. It never imports anything WRDS- or TAQ-specific, only ever consuming a plain numpy matrix.
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
