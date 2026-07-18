---
layout: default
title: Projects
permalink: /projects/
---

<h1>Projects</h1>
<p class="tagline">Expand any project for an overview, and a code sketch of the approach.</p>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://github.com/DaanZunnenberg/FunctionalScale" target="_blank" rel="noopener noreferrer">Functional Volatility Surface Modelling</a></h3>
    <span class="entry-date">September 2024 &ndash; present</span>
  </div>
  <ul>
    <li>Extending the functional GARCH framework to a generalized autoregressive score (GAS) model to estimate and capture time-varying intraday volatility surfaces.</li>
    <li>Designed efficient estimation procedures using B-splines, applying <code>Numba</code> JIT compilation to enable scalable modelling of volatility surfaces from granular intraday return data.</li>
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
        Treats intraday log-return curves as functional observations in <em>L</em><sup>2</sup>[0,1] and extends
        classical GARCH/GAS dynamics to function space. The functional GARCH(p,q) model represents the
        intercept and lag operators in a non-negative Bernstein-polynomial basis, so the infinite-dimensional
        positivity constraint on the conditional-variance operators reduces to non-negativity of a finite
        coefficient matrix, estimated by quasi-maximum likelihood. The GAS-GARCH extension instead represents
        the log-volatility curve in a cubic B-spline basis and drives its coefficients with a score-based
        recursion under a multivariate Student-<em>t</em> likelihood with an Ornstein&ndash;Uhlenbeck covariance
        kernel across the intraday grid.
      </p>
      <p>
        In operator form, the functional GARCH(p,q) recursion is
      </p>
      $$
      \sigma_t^2 = \omega + \sum_{i=1}^{p} \mathcal{A}_i\!\left(r_{t-i}^2\right) + \sum_{j=1}^{q} \mathcal{B}_j\!\left(\sigma_{t-j}^2\right)
      $$
      <p>
        where &omega;, and the integral operators &Ascr;<sub>i</sub>, &Bscr;<sub>j</sub> acting on <em>L</em><sup>2</sup>[0,1],
        are all represented in the non-negative Bernstein basis &mdash; the reason positivity of the surface reduces to a finite,
        tractable coefficient constraint instead of an infinite-dimensional one.
      </p>
      <h4>Setup</h4>
      <pre class="code-block" data-lang="bash"><code>git clone https://github.com/DaanZunnenberg/FunctionalScale.git
cd FunctionalScale
pip install -e .            # editable install, pulls in numpy/scipy/numba/pandas/matplotlib/tqdm
pip install -e ".[dev]"      # + pytest, jupyter (optional, for tests/notebooks)
</code></pre>
      <h4>Usage &mdash; functional GARCH</h4>
      <pre class="code-block" data-lang="python"><code>import numpy as np
from funcgarch import fit, garch_filter

# mY: (N, T) matrix of intraday return curves — N grid points per day, T days
mY = np.load("returns.npy")
N, T = mY.shape
M = 4  # number of Bernstein basis functions

result = fit(mY, n_grid=N, M=M)          # QMLE-style estimation (scipy.optimize)
vtheta_hat = result.x

sigma2 = garch_filter(mY, n_grid=N, vtheta=vtheta_hat, M=M)  # (N, T) fitted variance surface
</code></pre>
      <h4>Usage &mdash; functional GAS-GARCH</h4>
      <pre class="code-block" data-lang="python"><code>from scipy.optimize import minimize
from funcgarch import gas_garch_estimator

# vtheta = [nu, ou_scale, omega (M,), vec(B) (M*M,), vec(A) (M*M,)]
result = minimize(
    gas_garch_estimator, x0=vtheta_init, args=(mY, N, M),
    method="SLSQP",
)
</code></pre>
      <h4>Data Flow</h4>
      <pre class="code-block" data-lang="txt"><code>wrds/*.sas                    scripts/taq_cleaner.py           funcgarch/*.py
┌────────────────┐            ┌───────────────────┐           ┌─────────────────────┐
│ WRDS TAQ pull   │  raw CSV  │ DataCleaner.clean()│  mY (N,T) │ fit() / garch_filter │
│ (data_fetcher,  │ ────────► │  - align to grid   │ ────────► │ gas_garch_estimator  │
│  taq_cleaner,   │           │  - compute returns │           │ func_garch_estimator │
│  nbbo/dynamic_  │           │  - reshape to      │           │                      │
│  taq_minute,    │           │    (N, T) matrix   │           │  -> vtheta_hat,      │
│  export)        │           │                    │           │     sigma2 surface   │
└────────────────┘            └───────────────────┘           └─────────────────────┘
</code></pre>
      <p class="form-hint">Requires Python &ge; 3.9. Full theory, references, and repository layout in the README.</p>
    </div>
    </div>
  </div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://github.com/DaanZunnenberg/MultivariateHamrickTaqqu" target="_blank" rel="noopener noreferrer">Functional Stationarity Test</a></h3>
    <span class="entry-date">2024</span>
  </div>
  <p>A novel functional stationarity test for multidimensional diffusion processes, developed for my MSc thesis and released as an open-source library.</p>
  <div class="tags"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/MultivariateHamrickTaqqu" target="_blank" rel="noopener noreferrer">FunctionalMH on GitHub</a></div>

  <div class="readme-toggle">
    <button type="button" class="readme-summary" aria-expanded="false">
      <span class="label-open">+ Show details &amp; code</span><span class="label-close">&minus; Hide details</span>
    </button>
    <div class="readme-collapse">
      <div class="readme">
      <h4>Overview</h4>
      <p>
        A nonparametric test for stationarity of a multivariate It&ocirc; diffusion, built on a
        Durbin&ndash;Wu&ndash;Hausman-style comparison of two consistent estimators of the diffusion matrix
        whose convergence rates diverge under nonstationarity: a time-domain smoother (Jacod&ndash;Protter),
        whose rate is stationarity-invariant, against a state-domain Nadaraya&ndash;Watson smoother, which
        diverges almost surely once the process is nonstationary. Their standardized difference is
        asymptotically Gaussian under stationarity (via &beta;-mixing), and the test rejects when the running
        maximum of that difference exceeds a Gumbel-type critical bound (Pickands/Berman).
      </p>
      <p>The running test statistic compares the two smoothers directly:</p>
      $$
      T_n = \max_{1 \le k \le n} \; \sqrt{k}\,\bigl\| \hat{\Sigma}^{\text{time}}_k - \hat{\Sigma}^{\text{state}}_k \bigr\|
      $$
      <p>
        with critical values from the Gumbel-type limit law of Pickands and Berman for the running maximum of a
        stationary Gaussian sequence.
      </p>
      <h4>Setup</h4>
      <pre class="code-block" data-lang="bash"><code>pip install -e .
</code></pre>
      <p>Or install dependencies only:</p>
      <pre class="code-block" data-lang="bash"><code>pip install -r requirements.txt
</code></pre>
      <h4>Quick Start</h4>
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
      <p class="form-hint">Illustrative interface &mdash; the production version adds transaction-cost-aware rebalancing.</p>
    </div>
    </div>
  </div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Live Options Chain Renderer</h3>
    <span class="entry-date">2026</span>
  </div>
  <ul>
    <li>A small quant-desk demo: a live BTC/USDT &amp; ETH/USDT options chain, priced with Black&ndash;Scholes over spot ticks from Binance's public feed and rendered on a &lt;canvas&gt; in a ThinkOrSwim-inspired style.</li>
    <li>Cells flash on real price moves, but sparsely and slowly &mdash; deliberately toned down so it reads as a live artifact, not a strobing ticker.</li>
  </ul>
  <div class="tags"><code>JavaScript</code> &middot; <code>Canvas API</code> &middot; Binance public API</div>
  <div class="market-widget">
    <canvas id="market-widget-canvas" aria-label="Live BTC/USDT and ETH/USDT options chain"></canvas>
  </div>
</div>

<p>More on <a href="https://github.com/DaanZunnenberg" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
