---
layout: default
title: Functional Stationarity Test
permalink: /projects/functional-stationarity-test/
---

<section class="hero">
  <img class="hero-img" src="{{ '/images/stationarity_background.jpg' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Project &middot; 2024</div>
    <h1 class="hero-name">Functional Stationarity Test</h1>
    <p class="hero-lede">A nonparametric stationarity test for multidimensional diffusions, built for my MSc thesis.</p>
  </div>
</section>

<div class="article-body">

<p class="tagline"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/MultivariateHamrickTaqqu" target="_blank" rel="noopener noreferrer">FunctionalMH on GitHub</a></p>

<h2 id="overview">Theoretical Foundations</h2>
<p>
  Most tests for whether a time series is stationary are univariate and assume a specific parametric model,
  a unit-root test on an AR(1), say. That approach becomes fragile once the underlying process is genuinely
  nonlinear or multidimensional. Fitting a misspecified parametric model and then testing for a unit root in
  that model tells you very little about whether the true, unknown process is stationary. This project builds
  a nonparametric test that sidesteps parametric model choice entirely, for a broad class of multidimensional
  It&ocirc; diffusion processes. It became the open-source <code>FunctionalMH</code> library, packaged for my
  MSc thesis (<em>Testing Multidimensional Diffusion Processes for Stationarity</em>, VU Amsterdam, supervised
  by Eric Beutner and Yicong Lin) in Econometrics and Operations Research.
</p>
<p>
  We consider a \(d\)-dimensional It&ocirc; diffusion process \((X_t)_{t\ge0}\) defined as the strong solution
  of
  \[X_t = X_0 + \int_0^t b(X_s)\,ds + \int_0^t \sigma(X_s)\,dW_s, \qquad t \ge 0,\]
  where \(b\) is the drift function, \(\sigma\) is the diffusion coefficient, and \(W\) is a multivariate
  Brownian motion. The problem this test solves is simple to state. Given only a single, discretely observed
  trajectory of \(X\), and without assuming any specific parametric drift or diffusion function, decide
  whether \(X\) is stationary.
</p>
<p>
  Three regularity conditions make the test possible. First, \(b\) and \(\sigma\) must be Borel measurable and
  satisfy Lipschitz and linear-growth conditions, the standard requirement for a unique, non-exploding strong
  solution of the SDE to exist. Second, the diffusion coefficient must be <em>uniformly elliptic</em>, the
  process must be able to move in every direction with comparable local variance everywhere, no direction can
  be degenerate. This rules out cyclic sample-path behaviour and guarantees that the process is aperiodic and
  that any invariant measure it possesses is absolutely continuous with everywhere-positive density. Third,
  the process must be <em>Harris recurrent</em>, every set of positive Lebesgue measure is visited infinitely
  often. This guarantees the existence of an invariant measure in the first place, and it is the condition
  that forces the process's <em>occupation measure</em>, a running count of how much time the process has
  spent in a given region of its state space, to diverge to infinity. That is exactly the quantity the test
  statistic exploits. Together these three conditions cover a very wide class of financial and physical
  diffusion models while still ruling out pathologies such as Brownian motion with drift, which visits some
  region of its state space only finitely often and would break the argument below.
</p>

<h2 id="test-statistic">Test Definition</h2>
<p>
  The central idea, due to Darling &amp; Kac (1957) and sharpened for this setting by Lazi&#263; &amp; Sandri&#263;
  (2021) and Lee &amp; Trutnau (2022), is that stationarity of a Harris recurrent, uniformly elliptic diffusion
  is equivalent to its occupation measure growing <em>linearly</em> in time. A nonstationary process's
  occupation measure grows more slowly than linearly. Rather than testing a parametric hypothesis about drift
  or mean reversion directly, the test asks a more structural question. Does the rate at which the process
  revisits regions of its state space look linear in time, or does it look sub-linear?
</p>
<p>
  To turn that question into a usable statistic, the test compares two independently motivated estimators of
  the diffusion matrix, both consistent regardless of whether \(X\) is stationary, but which behave very
  differently as estimators depending on stationarity. The first is a <em>time-domain</em> estimator, a local,
  EWMA-style average of squared increments in a shrinking window around a fixed point in time. Its convergence
  rate does not depend on whether the process is stationary, because it only uses information in the immediate
  temporal vicinity of the point being estimated. The second is a <em>state-domain</em> estimator, a
  Nadaraya&ndash;Watson-style kernel regression that averages squared increments over all observations that
  fall within a bandwidth of a given state, regardless of when in the sample they occurred. This second
  estimator's convergence rate is governed by the occupation measure at that state. It converges faster
  exactly when the process has spent more time nearby, which happens at a linear rate if and only if the
  process is stationary.
</p>
<p>
  This sets up something structurally similar to a Durbin&ndash;Wu&ndash;Hausman test, two estimators that
  target the same quantity, coincide asymptotically under the null, and diverge in behaviour under the
  alternative. The null is that \(X\) is stationary, the alternative that it is not, operationalised through
  the standardised difference between the two diffusion-matrix estimators. Under the null this standardised
  difference converges to a mean-zero Gaussian sequence. Under the alternative it diverges, because the
  state-domain estimator's convergence rate is strictly slower than the rate implied by stationarity, while
  the time-domain estimator keeps converging at its usual rate regardless. Because the diffusion matrix is
  estimated pointwise across a whole trajectory, this comparison produces not one test statistic but a whole
  sequence of them, one for approximately every observed time point. The test needs a way to summarise a
  sequence of correlated, asymptotically Gaussian statistics into a single global decision. The solution here
  borrows from extreme value theory. Under the null the sequence of standardised differences behaves like a
  stationary Gaussian process, whose running maximum has a known limiting Gumbel-type distribution once
  properly normalised. The global test rejects stationarity if the observed running maximum exceeds the
  corresponding Gumbel critical value, a closed-form, analytic bound rather than anything simulated or
  tabulated, which keeps the test cheap to apply even though it is built from an entire sequence of local
  comparisons.
</p>

<h2 id="implementation">Code Architecture &amp; Bivariate Restriction</h2>
<p class="form-hint">
  <strong>Disclaimer.</strong> The code implementation described in this section is strictly applicable to
  <em>bivariate</em> processes (\(d=2\)). The theory above is stated for general dimension \(d\), and the
  package's simulators (<code>models/processes.py</code>) include higher- and lower-dimensional examples for
  reference, but the estimators and test statistic in <code>testing/kernel_test.py</code> are written against
  \(2\times2\) diffusion matrices specifically. The <code>vech</code> half-vectorisation to a 3-vector, the
  matrix square-root inverse, and the density estimation used inside the state-domain smoother are not
  dimension-generic.
</p>
<p>
  The package lives under <code>src/mht/</code>. <code>testing/kernel_test.py</code> holds the core test,
  <code>Kernel</code>, <code>KernelTest</code>, <code>Simulator</code>, <code>TestPlotter</code>.
  <code>testing/hypothesis.py</code> adds <code>MultipleHypTest</code> for Benjamini&ndash;Hochberg/Yekutieli
  FDR control, an alternative multiple-hypothesis baseline to the running-maximum approach, and
  <code>UnitRootTest</code> for batch KPSS and Leybourne&ndash;McCabe comparisons, the parametric benchmarks
  the test is validated against. <code>testing/leybourne_mccabe.py</code> is a standalone Leybourne&ndash;McCabe
  unit-root test, fitting an ARIMA(p,1,1) and interpolating p-values off Monte Carlo critical-value tables.
  <code>models/processes.py</code> holds four SDE simulators, including a bivariate correlated diffusion using
  a Milstein scheme with an explicit correction term for its polynomial diffusion coefficient.
  <code>io/reader.py</code> loads precomputed simulation CSVs.
</p>
<p>
  <code>KernelTest(data, kernel_params, time_params)</code> is the master object that orchestrates the full
  flow, from a raw bivariate trajectory to a rejection decision, through four steps.
</p>
<p>
  <strong>Data preparation.</strong> A bivariate trajectory, either simulated by
  <code>BivariateOUProcess</code>/<code>BivariateCorrelatedBM</code> or read from CSV, is discretised on a
  grid of \(n\) observations over horizon \(T\), giving the effective sampling interval \(\Delta_n = T/n\).
</p>
<p>
  <strong>Kernel and bandwidth selection.</strong> The state-domain smoother needs a kernel, the package
  defaults to <code>Kernel.BaseKernel</code>, a boxcar kernel, and a bandwidth, while the time-domain smoother
  needs its own, separately tuned bandwidth. Both follow the near-optimal rates of Bandi &amp; Moloche (2018).
  <code>Simulator</code> auto-selects them from a lookup table keyed on horizon length, so a user does not
  have to hand-tune the constants for every new dataset.
</p>
<p>
  <strong>Test statistic computation.</strong> <code>time_domain_smoother</code> builds the EWMA-weighted
  time-domain estimator with a decay parameter. <code>state_domain_smoother</code> builds the
  Nadaraya&ndash;Watson state-domain estimator, optionally using a kernel density estimate of the bivariate
  state density rather than the raw occupation count. <code>gauss</code> computes the standardised difference
  between the two estimators through a matrix square-root inverse of the combined asymptotic covariance. This
  step falls back to <code>NaN</code> on numerical failure of the matrix inversion, a real fragility point
  worth being upfront about, since a spike from a single ill-conditioned inversion could otherwise masquerade
  as evidence against the null.
</p>
<p>
  <strong>Critical value generation.</strong> <code>transform_1D_gauss</code> reduces the sequence of
  standardised differences to a single scalar running maximum and compares it against the analytic
  Pickands&ndash;Berman Gumbel bound, rejecting stationarity if the observed running maximum exceeds the
  corresponding critical value. Critical values are obtained analytically rather than by bootstrap or
  multiplier resampling, which keeps the test cheap to run repeatedly in a simulation study, at the cost of
  relying on the asymptotic extreme-value approximation holding well enough in the sample size at hand.
</p>
<p>
  Each helper function was factored out for a specific reason. <code>time_domain_smoother</code> and
  <code>state_domain_smoother</code> are kept as separate methods rather than one combined estimator because
  they are estimated from different amounts of data and at different rates, and keeping them separate makes it
  possible to swap in alternative smoothers without touching the rest of the pipeline. <code>gauss</code> is
  isolated because it is the one step that performs a numerically fragile matrix inversion, so isolating it
  makes the failure mode easy to catch and reason about. <code>transform_1D_gauss</code> is kept separate from
  <code>gauss</code> because the running-maximum reduction and the choice of confidence level are a modelling
  decision distinct from the estimation of the standardised difference itself. <code>Simulator</code> drives
  Monte Carlo replication and auto-selects bandwidths so repeated simulation studies do not need manual
  bandwidth tuning for every replication. <code>TestPlotter</code> subclasses <code>KernelTest</code> to add
  plotting methods, so the diagnostic plots always stay in sync with whatever configuration produced the
  underlying test object. Numerical safety nets are used throughout, matrix inversions that can fail are
  wrapped to return <code>NaN</code> rather than raise, and a caching decorator gracefully falls back when
  passed unhashable arguments like DataFrames.
</p>

<h2 id="testing">Testing &amp; Validation</h2>
<p>
  <code>tests/test_processes.py</code> and <code>tests/test_kernel_test.py</code> are smoke tests. They check
  that simulated paths are finite and correctly shaped, and that the full pipeline runs end to end and returns
  a finite bound, they don't assert anything about actual rejection rates. <code>simulations/</code> holds
  precomputed CSVs of Gaussian-process paths under the null for two sample sizes, feeding a batch
  rejection-rate comparison against KPSS and Leybourne&ndash;McCabe. In the thesis's own simulation study, the
  running-maximum test converges close to its nominal 5% rejection rate on a stationary bivariate
  Ornstein&ndash;Uhlenbeck process as the sample grows, is quick to reject a nonstationary planar Brownian
  motion, and, on a time-inhomogeneous bivariate diffusion, correctly identifies nonstationarity while
  illustrating a genuine limitation of the fixed-\(\Delta_n\) design. Power falls as \(T\) grows with the
  sampling interval held fixed, because the process locally comes to resemble a stationary
  Ornstein&ndash;Uhlenbeck process at any fixed timescale, exactly the caveat from the Test Definition section
  above about the running-maximum approximation needing a sample large enough for the extreme-value
  asymptotics to bite.
</p>

<h2 id="repository-structure">Repository Structure</h2>
<pre class="code-block" data-lang="txt"><code>src/mht/
    testing/
        kernel_test.py        # KernelTest, Simulator, TestPlotter
        hypothesis.py         # MultipleHypTest, UnitRootTest, LaTeXTable
        leybourne_mccabe.py   # Leybourne-McCabe test (single canonical copy)
    models/
        processes.py          # BivariateOUProcess, BivariateCorrelatedBM, ...
    io/
        reader.py             # Reader class for simulation CSV files
    viz/                      # TestPlotter re-exported here
    utils/
        decorators.py
simulations/                  # Pre-computed CSV simulation results
notebooks/
    example.ipynb
tests/
    test_processes.py
    test_kernel_test.py
</code></pre>
<p class="form-hint">Requires Python &ge; 3.10. Also includes batch KPSS and Leybourne&ndash;McCabe tests for comparison, and BH/BY FDR procedures for simulation studies.</p>

</div>

<p><a href="{{ '/projects/' | relative_url }}">&larr; Back to Projects</a></p>
