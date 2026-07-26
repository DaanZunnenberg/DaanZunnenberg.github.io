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

<h2 id="overview">Overview</h2>
<p>
  Most tests for whether a time series is stationary are univariate and assume a specific parametric model.
  This project builds a nonparametric test for multidimensional diffusion processes: rather than testing a
  particular model's fit, it compares two estimators of the diffusion matrix that behave the same way under
  stationarity but drift apart under nonstationarity, and uses the growth rate of that divergence as the
  test statistic. It became the open-source <code>FunctionalMH</code> library, packaged for my MSc thesis in
  Econometrics and Operations Research at VU Amsterdam.
</p>

<h2 id="setting">Setting</h2>
<p>
  We consider a <em>d</em>-dimensional It&ocirc; diffusion process \((X_t)_{t \ge 0}\) defined by
  \[dX_t = b(X_t)\,dt + \sigma(X_t)\,dW_t,\]
  where \(X_t \in \mathbb{R}^d\), \(b: \mathbb{R}^d \to \mathbb{R}^d\) is the drift function,
  \(\sigma: \mathbb{R}^d \to \mathbb{R}^{d \times m}\) is the diffusion coefficient, and \(W_t\) is an
  \(m\)-dimensional Brownian motion. The instantaneous covariance matrix is given by
  \[a(x) = \sigma(x)\sigma(x)^\top.\]
</p>
<p>
  Throughout, we assume the diffusion satisfies the uniform ellipticity condition: there exists a constant
  \(\lambda > 0\) such that
  \[\xi^\top a(x) \xi \ge \lambda \|\xi\|^2, \qquad \forall x \in \mathbb{R}^d,\ \xi \in \mathbb{R}^d.\]
  This ensures the diffusion is non-degenerate in every direction, so it is open-set irreducible and, under
  standard regularity conditions, aperiodic. If it is additionally positive Harris recurrent, it admits a
  unique invariant probability distribution and satisfies the usual ergodic properties of Markov processes:
  long-run averages of functions of the process converge to their corresponding expectations under the
  invariant distribution.
</p>

<h2 id="test-statistic">The Test Statistic</h2>
<p>
  The test is based on the relationship between stationarity and the growth behaviour of the occupation
  measure, which measures the amount of time the diffusion spends in a measurable set \(A\). For a
  stationary and ergodic diffusion, the occupation measure grows linearly with time, with the growth rate
  determined by the invariant distribution. Under the diffusion assumptions above, stationarity is
  therefore equivalent to linear divergence of the occupation measure.
</p>
<p>
  The test exploits this equivalence by comparing two consistent estimators of the diffusion matrix: a
  time-domain estimator (Jacod&ndash;Protter), an EWMA-weighted local average of squared increments over a
  rolling window, and a state-domain estimator (Bandi&ndash;Moloche), a Nadaraya&ndash;Watson-style box-kernel
  regression that sums squared increments of observations within a bandwidth of each state, using the
  occupation measure implicitly through the local sample count. Under stationarity, the linear growth of the
  occupation measure guarantees compatible asymptotic behaviour between the two estimators; under
  nonstationarity, that guarantee fails and the estimators diverge.
</p>
<p>
  Both estimators are reduced to a 3-vector via <code>vech</code> for 2&times;2 symmetric matrices, and their
  standardized difference \(Z = \Sigma^{-1/2}\,\text{vech}(\text{state} - \text{time})\) is computed with a
  matrix square-root inverse (falling back to NaN on numerical failure, a real fragility point worth being
  upfront about). The limiting distribution of the test statistic comes from the extreme value theory of
  Pickands and Berman for running maxima of stationary Gaussian sequences: under the stationary regime, the
  standardized difference admits a Gaussian approximation, and its running maximum converges to a
  Gumbel-type limit. Critical values are therefore obtained analytically, not simulated or tabulated:
  \(a_n = \sqrt{2\log n}\), \(b_n = a_n - \frac{\log(\pi\log n)}{2a_n}\), with bound
  \(x/a_n + b_n\) for \(x = \log(1/\log(1/\alpha))\).
</p>

<h2 id="implementation">Implementation</h2>
<p>
  The package lives under <code>src/mht/</code>. <code>testing/kernel_test.py</code> holds the core test
  (<code>Kernel</code>, <code>KernelTest</code>, <code>Simulator</code>, <code>TestPlotter</code>);
  <code>testing/hypothesis.py</code> adds <code>MultipleHypTest</code> (Benjamini&ndash;Hochberg/Yekutieli FDR
  control) and <code>UnitRootTest</code> (batch KPSS + Leybourne&ndash;McCabe comparisons);
  <code>testing/leybourne_mccabe.py</code> is a standalone Leybourne&ndash;McCabe unit-root test, fitting an
  ARIMA(p,1,1) and interpolating p-values off Monte Carlo critical-value tables (one million replications,
  per the docstring); <code>models/processes.py</code> holds four SDE simulators, including a bivariate
  correlated diffusion using a Milstein scheme with an explicit correction term for its polynomial diffusion
  coefficient; <code>io/reader.py</code> loads precomputed simulation CSVs.
</p>
<p>
  <code>KernelTest(data, kernel_params, time_params)</code> exposes <code>.time_domain_smoother(lamb=0.94)</code>,
  <code>.state_domain_smoother(dist=None)</code>, <code>.gauss()</code>, and <code>.transform_1D_gauss(alpha=0.95)</code>.
  <code>Simulator</code> drives Monte Carlo replication and auto-selects bandwidths from a
  Fan&ndash;Fan&ndash;Lv-style table keyed on the horizon length. <code>TestPlotter</code> subclasses
  <code>KernelTest</code> to add <code>.plot_running_maximum()</code> and <code>.plot_estimates()</code>.
  Numerical safety nets are used throughout: matrix inversions that can fail are wrapped to return NaN
  rather than raise, and a caching decorator gracefully falls back when passed unhashable arguments like
  DataFrames.
</p>

<h2 id="setup">Setup &amp; Usage</h2>
<pre class="code-block" data-lang="bash"><code>pip install -e .
</code></pre>
<p>Or install dependencies only:</p>
<pre class="code-block" data-lang="bash"><code>pip install -r requirements.txt
</code></pre>
<p>
  The example below simulates a bivariate Ornstein-Uhlenbeck process, then runs the test itself. It builds
  the time-domain and state-domain diffusion-matrix estimators, standardizes their difference with the
  Gaussian approximation, and plots the resulting running maximum against the Pickands&ndash;Berman critical
  bound.
</p>
<pre class="code-block" data-lang="python"><code>import numpy as np
from mht.models.processes import BivariateOUProcess
from mht.testing.kernel_test import KernelTest, Kernel, TestPlotter

# Simulate a bivariate OU process
ou_config = {
    'T': 365, 'dt': 1/20,
    'sigma1': np.sqrt(2), 'sigma2': np.sqrt(2),
    'theta1': 0.2, 'theta2': 0.2,
    'rho': 0.75,
}
process = BivariateOUProcess(**ou_config)
process.simulate(seed=1)
X, T, n = process.config()

# Set up the test configuration
config = {
    'data': X,
    'kernel_params': {
        'bandwidth': np.sqrt(3) * 9 / ((n ** (1/6)) * np.log(n)),
        'n': n, 'T': T,
        'kernel': Kernel.BaseKernel,
    },
    'time_params': {'bandwidth': 200 * T / n, 'n': n, 'T': T},
}

# Estimate and test
test = KernelTest(**config)
test.time_domain_smoother(lamb=0.99)
test.state_domain_smoother(dist=True)   # True = use KDE for joint density
test.gauss()

bound, scalar_gauss = test.transform_1D_gauss()

# Plot
plotter = TestPlotter(test)
plotter.plot_running_maximum()
</code></pre>

<h2 id="testing">Testing &amp; Validation</h2>
<p>
  <code>tests/test_processes.py</code> and <code>tests/test_kernel_test.py</code> are smoke tests: they
  check that simulated paths are finite and correctly shaped, and that the full pipeline
  (<code>time_domain_smoother &rarr; state_domain_smoother &rarr; gauss &rarr; transform_1D_gauss</code>) runs
  end to end and returns a finite bound &mdash; they don't assert anything about actual rejection rates.
  <code>simulations/</code> holds precomputed CSVs of Gaussian-process paths under the null for two sample
  sizes, feeding a batch rejection-rate comparison against KPSS and Leybourne&ndash;McCabe.
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
