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
        In operator form, the functional GARCH(p,q) recursion takes the form
      </p>
      \[
      \sigma_t^2 = \omega + \sum_{i=1}^{p} \mathcal{A}_i\!\left(r_{t-i}^2\right) + \sum_{j=1}^{q} \mathcal{B}_j\!\left(\sigma_{t-j}^2\right)
      \]
      <p>
        where &omega;, and the integral operators &Ascr;<sub>i</sub>, &Bscr;<sub>j</sub> acting on <em>L</em><sup>2</sup>[0,1],
        are all represented in the non-negative Bernstein basis. That's why positivity of the surface reduces to a finite,
        tractable coefficient constraint instead of an infinite-dimensional one.
      </p>
      <h4>Setup</h4>
      <pre class="code-block" data-lang="bash"><code>git clone https://github.com/DaanZunnenberg/FunctionalScale.git
cd FunctionalScale
pip install -e .            # editable install, pulls in numpy/scipy/numba/pandas/matplotlib/tqdm
pip install -e ".[dev]"      # + pytest, jupyter (optional, for tests/notebooks)
</code></pre>
      <h4>Usage: functional GARCH</h4>
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
        A nonparametric test for stationarity of a multivariate It&ocirc; diffusion, built on a
        Durbin&ndash;Wu&ndash;Hausman-style comparison of two consistent estimators of the diffusion matrix
        whose convergence rates diverge under nonstationarity: a time-domain smoother (Jacod&ndash;Protter),
        whose rate is stationarity-invariant, against a state-domain Nadaraya&ndash;Watson smoother, which
        diverges almost surely once the process is nonstationary. Their standardized difference is
        asymptotically Gaussian under stationarity (via &beta;-mixing), and the test rejects when the running
        maximum of that difference exceeds a Gumbel-type critical bound (Pickands/Berman).
      </p>
      <p>The running test statistic compares the two smoothers directly, taking the form</p>
      \[
      T_n = \max_{1 \le k \le n} \; \sqrt{k}\,\bigl\| \hat{\Sigma}^{\text{time}}_k - \hat{\Sigma}^{\text{state}}_k \bigr\|
      \]
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
      <p class="form-hint">Illustrative interface. The production version adds transaction-cost-aware rebalancing.</p>
    </div>
    </div>
  </div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://github.com/DaanZunnenberg/DynamicCluster" target="_blank" rel="noopener noreferrer">Dynamic Clustering with a Score-Driven HMM</a></h3>
    <span class="entry-date">2026</span>
  </div>
  <p>Dynamic clustering of multivariate panel data: a GAS filter drives the time-varying means of an HMM-style mixture model, so cluster membership evolves rather than staying fixed.</p>
  <div class="tags"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/DynamicCluster" target="_blank" rel="noopener noreferrer">DynamicCluster on GitHub</a></div>

  <div class="readme-toggle">
    <button type="button" class="readme-summary" aria-expanded="false">
      <span class="label-open">+ Show details &amp; code</span><span class="label-close">&minus; Hide details</span>
    </button>
    <div class="readme-collapse">
      <div class="readme">
      <h4>Overview</h4>
      <p>
        Each unit \(i\) belongs to a latent cluster \(s_{i,t} \in \{1,\dots,K\}\), with observations
        \(y_{i,t} \mid s_{i,t}=k \sim \mathcal{N}(\mu_{k,t}, \Sigma_{k,t})\). Transition probabilities are
        shared across units and depend on the Mahalanobis distance between cluster means, scaled by a
        sensitivity parameter \(\gamma\).
      </p>
      \[
      \pi_t^{(j \to k)} = \frac{\exp(-\gamma\, d(\mu_{j,t-1}, \mu_{k,t-1}))}{\sum_{m=1}^K \exp(-\gamma\, d(\mu_{j,t-1}, \mu_{m,t-1}))}
      \]
      <p>
        Cluster means are score-driven rather than static, following a Generalized Autoregressive Score (GAS)
        recursion built on the gradient of the mixture log-likelihood.
      </p>
      \[
      f_{t+1} = \omega + A s_t + B f_t, \qquad s_t = S_t \cdot \frac{\partial \ln p(y_t \mid f_t)}{\partial f_t}
      \]
      <h4>Setup</h4>
      <pre class="code-block" data-lang="bash"><code>git clone https://github.com/DaanZunnenberg/DynamicCluster.git
cd DynamicCluster
pip install -e .
</code></pre>
      <h4>Usage</h4>
      <pre class="code-block" data-lang="bash"><code>python scripts/run_simulation.py
</code></pre>
      <p class="form-hint">Simulates panel data under a known dynamic-clustering process, estimates parameters by maximum likelihood, and writes recovered vs. true cluster structure to a <code>.csv</code>.</p>
    </div>
    </div>
  </div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://github.com/DaanZunnenberg/FunctionalCurves" target="_blank" rel="noopener noreferrer">Tukey Depth Under Mixing</a></h3>
    <span class="entry-date">2025</span>
  </div>
  <p>Simulating dependent (mixing) time series and estimating Tukey's halfspace depth and its minimal direction, both empirically and analytically, to study convergence as sample size grows.</p>
  <div class="tags"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/FunctionalCurves" target="_blank" rel="noopener noreferrer">FunctionalCurves on GitHub</a></div>

  <div class="readme-toggle">
    <button type="button" class="readme-summary" aria-expanded="false">
      <span class="label-open">+ Show details &amp; code</span><span class="label-close">&minus; Hide details</span>
    </button>
    <div class="readme-collapse">
      <div class="readme">
      <h4>Overview</h4>
      <p>
        <code>MixingModels.py</code> generates synthetic bivariate paths with a controllable mixing rate
        \(\rho\), including a linearly-weighted process whose weights decay as \(k^{-\rho}\).
        <code>Depth.py</code> estimates Tukey depth and its minimal direction empirically from a sample, and
        gives the closed-form depth for Gaussian and stationary VAR(1) processes to compare against.
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
    <h3><a href="https://github.com/DaanZunnenberg/ForeignExchangeData" target="_blank" rel="noopener noreferrer">EUR/USD 2-Minute Bar Dataset</a></h3>
    <span class="entry-date">2026</span>
  </div>
  <p>Free EUR/USD OHLCV data at 2-minute bars for 2025, released as a sandbox for backtests, strategy prototyping, and analysis.</p>
  <div class="tags"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/ForeignExchangeData" target="_blank" rel="noopener noreferrer">ForeignExchangeData on GitHub</a></div>

  <div class="readme-toggle">
    <button type="button" class="readme-summary" aria-expanded="false">
      <span class="label-open">+ Show details &amp; code</span><span class="label-close">&minus; Hide details</span>
    </button>
    <div class="readme-collapse">
      <div class="readme">
      <h4>Overview</h4>
      <p>
        One CSV per month of 2-minute EUR/USD bars (open, high, low, close, volume, trade count), covering
        all of 2025. Provided as-is, no rights reserved, for anyone who wants sample FX data to experiment
        with.
      </p>
      <h4>Data tools</h4>
      <pre class="code-block" data-lang="python"><code>from scripts.data_tools import load_months, load_all, resample

df = load_months(["2025-01", "2025-02"])  # combine specific months
df = load_all()                           # combine all available months
hourly = resample(df, "1h")               # resample to any pandas offset alias
</code></pre>
      <h4>Visualization</h4>
      <pre class="code-block" data-lang="bash"><code>pip install -r requirements.txt
python scripts/visualize.py --all
python scripts/visualize.py --all --resample 1h
</code></pre>
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
  <p>A library of risk models organized by family: variance-covariance and historic-simulation VaR/ES, CCC-GARCH, EWMA-FHS, copulas, and factor analysis, packaged as an installable library.</p>
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

<p>More on <a href="https://github.com/DaanZunnenberg" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
