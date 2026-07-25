---
layout: default
title: Projects
permalink: /projects/
---

<section class="hero">
  <canvas id="market-widget-canvas" class="hero-canvas" aria-label="Live BTC/USDT and ETH/USDT options chain" aria-hidden="true"></canvas>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Functional Volatility<span class="hero-eyebrow-extra"> &middot; Market Microstructure &middot; Dynamic Modelling</span></div>
    <h1 class="hero-name">Projects</h1>
    <p class="hero-lede">Research and side projects at the intersection of statistics, execution, and market-making.</p>
  </div>
</section>

<p class="tagline">Expand any project for the theory, the code, and the results behind it.</p>

<h2 id="projects">Projects</h2>

<div class="entry" id="project-functional-scale-estimation">
  <div class="entry-head">
    <h3>Functional Scale Volatility Estimation</h3>
    <span class="entry-date">January 2024 &ndash; June 2024</span>
  </div>
  <div class="entry-org">VU Amsterdam, with Yicong Lin &amp; Andre Lucas</div>
  <p>
    Likelihood-based estimation for functional scale (GARCH-type) models, contributing to Lin &amp; Lucas's
    work on robust observation-driven dynamics for functional location-scale models (see
    <a href="{{ '/academic/research/' | relative_url }}">Publications</a>). The precursor to the functional
    GAS-GARCH project below: projects infinite-dimensional conditional variance operators onto a Bernstein
    polynomial basis, turning the QMLE problem, positivity constraints included, into a bounded,
    finite-dimensional optimization.
  </p>
  <div class="tags"><code>Python</code> &middot; <code>SAS</code> &middot; <code>Bash</code></div>

  <div class="readme-toggle">
    <button type="button" class="readme-summary" aria-expanded="false">
      <span class="label-open">+ Show details &amp; code</span><span class="label-close">&minus; Hide details</span>
    </button>
    <div class="readme-collapse">
      <div class="readme">
      <h4>Setting</h4>
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
        where \(\delta\) is a strictly positive intercept curve, and \(\alpha_i, \beta_j\) are operators that
        map curves to curves. This is the functional version of a classical GARCH recursion. Every quantity is
        now a function of \(u\), not a single number.
      </p>
      <h4>Why basis functions</h4>
      <p>
        The operators \(\alpha_i\) and \(\beta_j\) live in an infinite-dimensional space. We cannot estimate
        an infinite-dimensional object from a finite sample of days. We also need every operator to keep the
        variance curve positive, since a variance cannot go negative at any point of the day.
      </p>
      <p>
        We solve both problems at once by projecting each operator onto a small set of Bernstein basis
        functions. A Bernstein basis of order \(M\) is a set of \(M\) polynomials on \([0,1]\), and each one is
        non-negative everywhere on that interval. Any operator can then be written as a weighted sum of these
        basis functions. If the weights are non-negative, the resulting operator is automatically positive.
        This gives a positive variance curve for free, without adding constraints to the optimizer.
      </p>
      <p>
        Projecting onto \(M\) basis functions also turns an infinite-dimensional estimation problem into a
        small, bounded one. Instead of estimating operators directly, we estimate a short vector of Bernstein
        coefficients \(\theta\).
      </p>
      <h4>Estimation</h4>
      <p>
        A standard likelihood cannot be evaluated directly on a continuous curve. We estimate \(\theta\) using
        Quasi-Maximum Likelihood Estimation instead. This rebuilds the variance recursion at every step from
        the current coefficients, then scores the fit across the full sample of days. The implementation
        builds the functional operators from the Bernstein coefficients, runs the volatility recursion forward
        in time, and optimizes the coefficients under simple bound constraints so the positivity holds
        throughout.
      </p>
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
  <p>
    Applying this framework to simulated intraday data with a functional GARCH(1,1) recursion and
    Bernstein-basis QMLE with <em>M</em> = 3 basis functions gives the fitted volatility surface shown below.
    The estimation recovers the main structure of the true process, while the remaining day-to-day roughness
    reflects finite-sample effects and the limited flexibility of the chosen basis:
  </p>
  <img src="{{ '/assets/img/garch_vol_surface.png' | relative_url }}" alt="True versus functional GARCH-estimated volatility surface, side by side" class="entry-figure">
  <p class="form-hint">Simulated 25-point intraday grid over 500 trading days; estimated surface via <code>funcgarch.garch.fit</code> + <code>garch_filter</code>.</p>
    </div>
    </div>
  </div>
</div>

<div class="entry" id="project-functional-volatility-surface">
  <div class="entry-head">
    <h3><a href="https://github.com/DaanZunnenberg/FunctionalScale" target="_blank" rel="noopener noreferrer">Functional Volatility Surface Modelling</a></h3>
    <span class="entry-date">September 2024 &ndash; present</span>
  </div>
  <ul>
    <li>Extending the functional GARCH framework to a generalized autoregressive score (GAS) model to estimate and capture time-varying intraday volatility surfaces.</li>
    <li>Designed efficient estimation procedures using B-splines, applying <code>numba</code> JIT compilation to enable scalable modelling of volatility surfaces from granular intraday return data.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <code>SAS</code> &middot; <a href="https://github.com/DaanZunnenberg/FunctionalScale" target="_blank" rel="noopener noreferrer">FunctionalScale on GitHub</a></div>

  <div class="readme-toggle">
    <button type="button" class="readme-summary" aria-expanded="false">
      <span class="label-open">+ Show details &amp; code</span><span class="label-close">&minus; Hide details</span>
    </button>
    <div class="readme-collapse">
      <div class="readme">
      <h4>Overview</h4>
      <p>
          Treats continuous intraday log-return paths as functions \(y_t(u)\) over the trading day \(u \in [0,1]\). The Functional GARCH(p,q) model generalizes classical volatility dynamics to an infinite-dimensional Hilbert space, capturing how shocks at any point of the day impact the entire upcoming volatility surface.
        </p>

        <h4>Model Definition</h4>
        <p>
          The functional scale model decomposes returns using a time-varying conditional variance curve \(\sigma_t^2(u)\), so we look at
          \[y_t(u) = \sigma_t(u)\eta_t(u)\]
          driven by the recursion
          \[\sigma_t^2 = \delta + \sum_{i=1}^{q}\alpha_i\left(y_{t-i}^2\right) + \sum_{j=1}^{p}\beta_j\left(\sigma_{t-j}^2\right)\]
        </p>
        <p>
          where \(\delta\) is a strictly positive baseline intercept curve, and \(\alpha_i, \beta_j\) are non-negative integral kernel operators mapping past squared return curves and past volatility curves into today's volatility surface.
        </p>

        <h4>Functional GAS Extension</h4>
        <p>
          The functional scale model can be extended to a functional Generalized Autoregressive Score (GAS) model by replacing the autoregressive dependence on past squared return curves with a score-driven update. The returns are defined as
          \[y_t(u) = \sigma_t(u)\eta_t(u),\]
          where \(\sigma_t^2(u)\) denotes the time-varying conditional variance curve. The functional GAS dynamics are specified as
          \[\sigma_{t+1}^2 = \delta + B\sigma_t^2 + A\int \phi_K(s)y_t^2(s)\,ds,\]
          where \(\delta\) is a strictly positive baseline intercept curve, \(B\) is a linear persistence operator acting on the previous volatility curve, and \(A\) maps the observed squared return curve into the updated volatility curve. The basis projection term
          \[\int \phi_K(s)y_t^2(s)\,ds\]
          represents the score-driven innovation component obtained from the functional representation of the return process.
        </p>
        <p>
          Equivalently, the recursion can be expressed using integral kernel operators as
          \[\sigma_{t+1}^2(u) = \delta(u) + \int B(u,v)\sigma_t^2(v)\,dv + \int A(u,s)\phi_K(s)y_t^2(s)\,ds.\]
          The functional GAS model therefore updates the conditional variance curve using information contained in the most recent squared return curve, while the operator \(B\) captures the persistence of past volatility curves. Compared with the functional scale model,
          \[\sigma_t^2 = \delta + \sum_{i=1}^{q}\alpha_i(y_{t-i}^{2}) + \sum_{j=1}^{p}\beta_j(\sigma_{t-j}^{2}),\]
          the GAS formulation replaces the ARCH-type feedback operators \(\alpha_i(y_{t-i}^{2})\) with a score-driven update based on the functional projection of the return innovations.
        </p>

        <h4>Estimation</h4>
        <p>
          Because standard likelihood functions cannot be directly evaluated for continuous curves, the model is estimated using Functional Quasi-Maximum Likelihood Estimation (QMLE).
        </p>
      <h4>Setup</h4>
      <p>
        The package is not on PyPI yet, so it is installed straight from the repository. This clones the
        code and pulls in the numerical stack it depends on: <code>numpy</code>, <code>scipy</code>,
        <code>numba</code>, <code>pandas</code>, <code>matplotlib</code>, and <code>tqdm</code>.
      </p>
      <pre class="code-block" data-lang="bash"><code>git clone https://github.com/DaanZunnenberg/FunctionalScale.git
cd FunctionalScale
pip install -e .            # editable install, pulls in numpy/scipy/numba/pandas/matplotlib/tqdm
pip install -e ".[dev]"      # + pytest, jupyter (optional, for tests/notebooks)
</code></pre>
      <h4>Usage: functional GARCH</h4>
      <p>
        This is the baseline estimator. It takes a matrix of intraday return curves, one row per
        time-of-day grid point and one column per day, and fits a single functional GARCH(p,q) operator to
        the whole sample using the Bernstein-basis QMLE from above. The output is a fitted variance surface
        with the same shape as the input returns.
      </p>
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
      <h4>Usage: functional GAS-GARCH</h4>
      <p>
        This is the score-driven extension. Instead of fitting one static operator to the whole sample, it
        updates its coefficients every day from the score of the latest return curve. The call shape is
        similar to the plain GARCH fit above, but it estimates the extra persistence and score operators
        \(B\) and \(A\) alongside the baseline curve.
      </p>
      <pre class="code-block" data-lang="python"><code>from scipy.optimize import minimize
from funcgarch import gas_garch_estimator

# vtheta = [nu, ou_scale, omega (M,), vec(B) (M*M,), vec(A) (M*M,)]
result = minimize(
    gas_garch_estimator, x0=vtheta_init, args=(mY, N, M),
    method="SLSQP",
)
</code></pre>
      <p>
        Because the score-driven update adapts its B-spline coefficients every day rather than fitting one
        static operator to the whole sample, the GAS-GARCH fit tracks the true surface considerably more
        tightly than the plain functional GARCH fit above:
      </p>
      <img src="{{ '/assets/img/gas_vol_surface.png' | relative_url }}" alt="True versus GAS-GARCH-estimated volatility surface, side by side" class="entry-figure">
      <p class="form-hint">The first comparison figure shows the estimated GAS-GARCH volatility surface against the true volatility surface to assess the model&rsquo;s ability to recover the underlying dynamics.</p>
      <p>
        Placing the two estimators' fitted surfaces directly next to each other, rather than each against the
        true surface separately, makes the score-driven adaptation's smoothing effect easier to see:
      </p>
      <img src="{{ '/assets/img/garch_vs_gas_vol_surface.png' | relative_url }}" alt="Functional GARCH-estimated versus GAS-GARCH-estimated volatility surface, side by side" class="entry-figure">
      <p class="form-hint">The second comparison figure compares the functional GARCH and GAS-GARCH volatility surfaces, demonstrating the increased flexibility of the GAS-GARCH specification relative to the traditional functional GARCH model.</p>
      <h4>Data Flow</h4>
      <p>
        This shows how raw exchange data turns into the fitted surface above. Intraday trades are pulled
        from WRDS, cleaned and reshaped into the return matrix \(mY\), and then passed into the estimators
        shown in the two usage examples.
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
      <p class="form-hint">Requires Python &ge; 3.9. Full theory, references, and repository layout in the README.</p>
    </div>
    </div>
  </div>
</div>

<div class="entry" id="project-functional-stationarity-test">
  <div class="entry-head">
    <h3><a href="https://github.com/DaanZunnenberg/MultivariateHamrickTaqqu" target="_blank" rel="noopener noreferrer">Functional Stationarity Test</a></h3>
    <span class="entry-date">2024</span>
  </div>
  <p>A functional stationarity test for multidimensional diffusion processes, developed for my MSc thesis and released as an open-source library.</p>
  <div class="tags"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/MultivariateHamrickTaqqu" target="_blank" rel="noopener noreferrer">FunctionalMH on GitHub</a></div>

  <div class="readme-toggle">
    <button type="button" class="readme-summary" aria-expanded="false">
      <span class="label-open">+ Show details &amp; code</span><span class="label-close">&minus; Hide details</span>
    </button>
    <div class="readme-collapse">
      <div class="readme">
      <h4>Overview</h4>
      <p>
        We consider a <em>d</em>-dimensional It&ocirc; diffusion process \((X_t)_{t \ge 0}\) defined by
        \[dX_t = b(X_t)\,dt + \sigma(X_t)\,dW_t,\]
        where \(X_t \in \mathbb{R}^d\), \(b: \mathbb{R}^d \to \mathbb{R}^d\) is the drift function,
        \(\sigma: \mathbb{R}^d \to \mathbb{R}^{d \times m}\) is the diffusion coefficient, and \(W_t\) is an
        \(m\)-dimensional Brownian motion. The instantaneous covariance matrix is given by
        \[a(x) = \sigma(x)\sigma(x)^\top.\]
      </p>
      <p>
        Throughout, we assume that the diffusion satisfies the uniform ellipticity condition,
        meaning that there exists a constant \(\lambda > 0\) such that
        \[\xi^\top a(x) \xi \ge \lambda \|\xi\|^2, \qquad \forall x \in \mathbb{R}^d,\ \xi \in \mathbb{R}^d.\]
        This assumption ensures that the diffusion is non-degenerate in every direction. As a consequence, the
        transition probabilities of the process assign positive probability to every non-empty open subset of
        the state space. Hence, the process is open-set irreducible. Moreover, under standard
        regularity conditions, the diffusion is aperiodic.
      </p>
      <p>
        If the process is additionally positive Harris recurrent, then it admits a unique
        invariant probability distribution and satisfies the usual ergodic properties of Markov processes. In
        particular, long-run averages of functions of the process converge to their corresponding expectations
        under the invariant distribution, ensuring stable long-run behaviour.
      </p>
      <p>
        The proposed stationarity test is based on the relationship between stationarity and the growth
        behaviour of the occupation measure, which measures the amount of time the diffusion spends in a
        measurable set \(A\). For a stationary and ergodic diffusion, the occupation measure grows linearly
        with time, with the growth rate determined by the invariant distribution. Therefore, under the
        diffusion assumptions above, stationarity is equivalent to linear divergence of the occupation measure.
      </p>
      <p>
        The test exploits this equivalence by comparing two consistent estimators of the diffusion matrix. The
        first estimator is constructed in the time domain, while the second estimator is constructed in the
        state domain using the occupation measure. Under stationarity, the linear growth of the occupation
        measure guarantees compatible asymptotic behaviour of both estimators. Under nonstationarity, this
        linear divergence property fails, leading to a divergence between the two estimators.
      </p>
      <p>
        The limiting distribution used for the test statistic is obtained from the extreme value theory of
        Pickands and Berman for running maxima of stationary Gaussian sequences. Under the
        stationary regime, the standardized difference between the estimators admits a Gaussian approximation,
        and the corresponding running maximum converges to a Gumbel-type limit distribution. The critical
        values for the test are therefore obtained from this Pickands&ndash;Berman extreme value distribution.
      </p>
      <h4>Setup</h4>
      <pre class="code-block" data-lang="bash"><code>pip install -e .
</code></pre>
      <p>Or install dependencies only:</p>
      <pre class="code-block" data-lang="bash"><code>pip install -r requirements.txt
</code></pre>
      <h4>Quick Start</h4>
      <p>
        The example below simulates a bivariate Ornstein-Uhlenbeck process, then runs the test itself. It
        builds the time-domain and state-domain diffusion-matrix estimators, standardizes their difference
        with the Gaussian approximation, and plots the resulting running maximum against the
        Pickands&ndash;Berman critical bound.
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
      <h4>Repository Structure</h4>
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
    </div>
  </div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://coinmerce.capital/en/home" target="_blank" rel="noopener noreferrer">HRP Portfolio Allocation</a></h3>
    <span class="entry-date">October 2023 &ndash; August 2024</span>
  </div>
  <ul>
    <li>Implemented Hierarchical Risk Parity via tree clustering using <code>scipy.cluster</code> to stabilize high-dimensional asset allocation, bypassing classical covariance inversion to eliminate noise sensitivity.</li>
    <li>Generated a mean alpha premium of 3.9% above the benchmark across diverse simulated horizons, in a look-ahead-free method that outperformed actively rebalanced benchmark portfolios.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <a href="https://coinmerce.capital/en/home" target="_blank" rel="noopener noreferrer">Coinmerce Capital</a></div>

  <div class="readme-toggle">
    <button type="button" class="readme-summary" aria-expanded="false">
      <span class="label-open">+ Show details &amp; code</span><span class="label-close">&minus; Hide details</span>
    </button>
    <div class="readme-collapse">
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
      <p class="form-hint">Illustrative interface. The production version adds transaction-cost-aware rebalancing.</p>
    </div>
    </div>
  </div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://github.com/DaanZunnenberg/FunctionalCurves" target="_blank" rel="noopener noreferrer">Tukey Depth Under Mixing</a></h3>
    <span class="entry-date">2025</span>
  </div>
  <p>Research code for studying Tukey depth under dependence, looking at how statistical methods based on depth behave when observations come from dependent, mixing time series rather than independent samples.</p>
  <div class="tags"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/FunctionalCurves" target="_blank" rel="noopener noreferrer">FunctionalCurves on GitHub</a></div>

  <div class="readme-toggle">
    <button type="button" class="readme-summary" aria-expanded="false">
      <span class="label-open">+ Show details &amp; code</span><span class="label-close">&minus; Hide details</span>
    </button>
    <div class="readme-collapse">
      <div class="readme">
      <h4>Overview</h4>
      <p>
        This repository contains research code for studying Tukey depth under dependence. The objective is to
        investigate how statistical methods based on depth behave when observations are generated from dependent
        time series rather than independent samples. The code provides tools for simulating dependent, mixing
        time series processes and estimating Tukey's halfspace depth together with the corresponding minimal
        direction.
      </p>
      <p>
        The package includes simulation routines for generating synthetic bivariate time series with
        different dependence structures and controllable mixing behaviour. It also provides implementations
        for estimating Tukey depth and the direction that determines the limiting halfspace empirically from
        simulated samples. In addition, the code includes closed-form benchmark cases for Gaussian models and
        stationary vector autoregressive processes, allowing the empirical estimates to be compared against
        theoretical values.
      </p>
      <p>
        The main application is to study the convergence behaviour of depth estimates as the sample size
        increases under different dependence regimes.
      </p>
      <h4>Usage</h4>
      <pre class="code-block" data-lang="python"><code>from Core.MixingModels import MixingLinearModel
from Core.Depth import Estimator, GaussianDepth

process = MixingLinearModel(mixing_rate=1.5)
X = process.simulate(n=500)

result = Estimator(X, X0, method="deg")   # or "point_wise"
depth, direction = result.depth, result.direction
</code></pre>
      <p class="form-hint">Illustrative interface. See the notebooks in <code>Core/</code> for the full VAR(1) and mixing-process walkthroughs.</p>
    </div>
    </div>
  </div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://github.com/DaanZunnenberg/TardisDevParser" target="_blank" rel="noopener noreferrer">Tardis.dev Data Fetcher</a></h3>
    <span class="entry-date">2024</span>
  </div>
  <p>A focused client for downloading historical cryptocurrency market data from Tardis.dev: authentication, layered configuration, retries, and resumable downloads.</p>
  <div class="tags"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/TardisDevParser" target="_blank" rel="noopener noreferrer">TardisDevParser on GitHub</a></div>

  <div class="readme-toggle">
    <button type="button" class="readme-summary" aria-expanded="false">
      <span class="label-open">+ Show details &amp; code</span><span class="label-close">&minus; Hide details</span>
    </button>
    <div class="readme-collapse">
      <div class="readme">
      <h4>Overview</h4>
      <p>
        Scoped to fetching only. <code>FetchOptions</code> merges CLI flags, a config file, and the
        <code>TARDIS_API_KEY</code> environment variable in that priority order; <code>TardisClient</code>
        builds Datasets API requests, authenticates, retries transient failures with backoff, and skips files
        that already exist unless overwriting is requested.
      </p>
      <h4>Setup</h4>
      <pre class="code-block" data-lang="bash"><code>python3 -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env   # then edit .env with your real key
</code></pre>
      <h4>Usage</h4>
      <pre class="code-block" data-lang="bash"><code>tardis-inspect check-key
tardis-inspect exchanges
tardis-fetch --config config/example.yaml
</code></pre>
    </div>
    </div>
  </div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://github.com/DaanZunnenberg/RiskFunctions" target="_blank" rel="noopener noreferrer">RiskFunctions</a></h3>
    <span class="entry-date">2024</span>
  </div>
  <p>A collection of risk management functions covering VaR/ES, GARCH, EWMA, copulas, and factor analysis.</p>
  <div class="tags"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/RiskFunctions" target="_blank" rel="noopener noreferrer">RiskFunctions on GitHub</a></div>

  <div class="readme-toggle">
    <button type="button" class="readme-summary" aria-expanded="false">
      <span class="label-open">+ Show details &amp; code</span><span class="label-close">&minus; Hide details</span>
    </button>
    <div class="readme-collapse">
      <div class="readme">
      <h4>Overview</h4>
      <p>
        Each model family under <code>src/riskfunctions/models/</code> holds pure estimator/analysis
        functions operating on DataFrames and arrays, with no I/O or plotting baked in; anything that loads
        data, wires a model together, or produces output lives in <code>examples/</code> instead.
      </p>
      <h4>Installation</h4>
      <pre class="code-block" data-lang="bash"><code>python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"          # core + test dependencies
pip install -e ".[multivariate]" # needed only for copulas / factor analysis
</code></pre>
      <h4>Usage</h4>
      <pre class="code-block" data-lang="bash"><code>python examples/var_covariance_example.py
python examples/ccc_garch_example.py
python examples/ewma_fhs_example.py
</code></pre>
    </div>
    </div>
  </div>
</div>

<p>More on <a href="https://github.com/DaanZunnenberg" target="_blank" rel="noopener noreferrer">GitHub</a>. Work history, education, and skills are on the <a href="{{ '/resume/' | relative_url }}">Resume</a> page.</p>
