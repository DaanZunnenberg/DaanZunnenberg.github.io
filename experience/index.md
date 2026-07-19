---
layout: default
title: Experience & Projects
permalink: /experience/
---

<section class="hero">
  <canvas id="market-widget-canvas" aria-label="Live BTC/USDT and ETH/USDT options chain"></canvas>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Market Microstructure<span class="hero-eyebrow-extra"> &middot; Spot/Perp Basis Arb</span></div>
    <h1 class="hero-name">Experience &amp; Projects<span class="cursor">_</span></h1>
    <p class="hero-lede">Roles and side projects at the intersection of statistics, execution, and market-making.</p>
  </div>
</section>

<p class="tagline">The complete resume, plus the projects behind it. Expand any project for an overview and a code sketch.</p>

<h2>Work Experience</h2>

<div class="entry">
  <div class="entry-head">
    <h3>QuantFi &middot; Quantitative Developer</h3>
    <span class="entry-date">March 2023 &ndash; August 2024</span>
  </div>
  <div class="entry-org">Schiphol-Rijk, Netherlands</div>
  <p>
    Built and deployed algorithmic market-making strategies: volatility/skew estimation, order-flow modelling,
    queue-aware execution, and reference-price dynamics. Alongside quoting, I built a dynamic liquidity
    allocation model for smart order routing across fragmented order books, cutting slippage and transaction
    costs by an average of 5.8%, and cross-exchange rebalancing methods that time inventory transfers under
    latency, funding-rate, and liquidity constraints.
  </p>
  <div class="tags"><code>Python</code> &middot; <code>asyncio</code> &middot; <code>Numba</code> &middot; <code>CCXT</code></div>

  <div class="readme-toggle">
    <button type="button" class="readme-summary" aria-expanded="false">
      <span class="label-open">+ Show details &amp; code</span><span class="label-close">&minus; Hide details</span>
    </button>
    <div class="readme-collapse">
      <div class="readme">
      <h4>Overview</h4>
      <p>
        Quoting around a reference price is a variance-minimization problem, skewing the bid/ask away from mid
        to pull inventory back toward zero before volatility or a directional move turns it into unhedged risk.
        A standard formulation, in the style of Avellaneda&ndash;Stoikov, shifts the reservation price by an
        amount proportional to inventory, risk aversion, and remaining variance, taking the form
      </p>
      \[
      r_t = s_t - q_t \, \gamma \, \sigma^2 (T - t)
      \]
      <p>
        where \(s_t\) is the mid/reference price, \(q_t\) the current inventory, \(\gamma\) a risk-aversion
        parameter, and \(\sigma^2(T-t)\) the remaining variance to the horizon. Smart order routing is a
        related but separate allocation problem, splitting a target quantity \(Q\) across venues to minimize
        total execution cost, taking the form
      </p>
      \[
      \min_{x_1,\dots,x_n} \; \sum_{i=1}^n c_i(x_i) \quad \text{s.t.} \quad \sum_{i=1}^n x_i = Q, \;\; x_i \le L_i
      \]
      <p>
        with \(c_i(\cdot)\) a per-venue cost function (fees plus expected impact) and \(L_i\) the available
        liquidity at venue \(i\), re-solved as liquidity and fees shift intraday.
      </p>
      <pre class="code-block" data-lang="python"><code>async def route(target_qty, venues):
    allocation = {}
    remaining = target_qty
    for venue in sorted(venues, key=lambda v: v.expected_cost(remaining)):
        take = min(remaining, venue.available_liquidity)
        allocation[venue.name] = take
        remaining -= take
        if remaining <= 0:
            break
    return allocation
</code></pre>
      <p class="form-hint">Illustrative formulation of the class of technique; the production system's exact parameterization is proprietary to QuantFi.</p>
    </div>
    </div>
  </div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>VU Econometrics and Data Science &middot; Research Assistant</h3>
    <span class="entry-date">January 2024 &ndash; June 2024</span>
  </div>
  <div class="entry-org">Amsterdam, Netherlands</div>
  <p>
    Designed likelihood-based estimation algorithms for functional location-scale models, contributing to
    Lin &amp; Lucas's work on robust observation-driven dynamics (see <a href="{{ '/research/' | relative_url }}">Publications</a>).
    The conditional-variance operators are projected onto a finite Bernstein-polynomial basis, reducing an
    infinite-dimensional positivity-constrained QMLE problem to a bounded, finite-dimensional optimization:
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
    Fitting the functional GARCH(1,1) recursion above (Bernstein-basis QMLE, projected onto <em>M</em> = 3 basis
    functions) to simulated intraday data recovers the shape of the true volatility surface, though with visibly
    more day-to-day roughness than the true process &mdash; several of the fitted operator coefficients sit at
    their box constraint, which a richer basis or a longer sample would relax:
  </p>
  <img src="{{ '/assets/img/garch_vol_surface.png' | relative_url }}" alt="True versus functional GARCH-estimated volatility surface, side by side" class="entry-figure">
  <p class="form-hint">Simulated 25-point intraday grid over 500 trading days; estimated surface via <code>funcgarch.garch.fit</code> + <code>garch_filter</code>.</p>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>QuantFi &middot; Operational Trader</h3>
    <span class="entry-date">October 2022 &ndash; March 2023</span>
  </div>
  <div class="entry-org">Schiphol-Rijk, Netherlands</div>
  <p>
    Monitored production market-making algorithms, managing real-time risk parameters and system health to
    limit inventory exposure through high-volatility periods. Designed and deployed a live trading terminal on
    <code>CCXT</code> and native exchange APIs for real-time position and order tracking, integrating
    <code>Tardis.dev</code> to reconstruct historical positions from raw fills when a session needed to be
    audited after the fact.
  </p>
  <div class="tags"><code>Python</code> &middot; <code>CCXT</code> &middot; <code>Tardis.dev</code></div>
</div>

<h2>Projects</h2>

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

  <div class="readme-toggle is-open">
    <button type="button" class="readme-summary" aria-expanded="true">
      <span class="label-open">+ Show details &amp; code</span><span class="label-close">&minus; Hide details</span>
    </button>
    <div class="readme-collapse">
      <div class="readme">
      <h4>Overview</h4>
      <p>
          Treats continuous intraday log-return paths as functional data objects \(y_t(u)\) over the trading day \(u \in [0,1]\). The <strong>Functional GARCH(p,q)</strong> model generalizes classical volatility dynamics to an infinite-dimensional Hilbert space, capturing how shocks at any point of the day impact the entire upcoming volatility surface.
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

        <h4>Estimation</h4>
        <p>
          Because standard likelihood functions cannot be directly evaluated for continuous curves, the model is estimated using <strong>Functional Quasi-Maximum Likelihood Estimation (QMLE)</strong>. Intuitively, the continuous process is projected onto a finite set of non-negative instrumental functions (such as Bernstein polynomials or shifted functional principal components). This maps the functional constraints into a tractable, finite-dimensional multivariate GARCH structure that can be optimized efficiently.
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
      <p>
        Because the score-driven update adapts its B-spline coefficients every day rather than fitting one
        static operator to the whole sample, the GAS-GARCH fit tracks the true surface considerably more
        tightly than the plain functional GARCH fit above:
      </p>
      <img src="{{ '/assets/img/gas_vol_surface.png' | relative_url }}" alt="True versus GAS-GARCH-estimated volatility surface, side by side" class="entry-figure">
      <p class="form-hint">Same simulated data and seed as the functional GARCH comparison; estimated via <code>gas_garch_estimator</code> with a Student-<em>t</em> observation density and an Ornstein&ndash;Uhlenbeck covariance kernel.</p>
      <h4>Data Flow</h4>
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

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://github.com/DaanZunnenberg/MultipleSignalClassification" target="_blank" rel="noopener noreferrer">Subspace-Based Time-Delay Estimation for WiFi</a></h3>
    <span class="entry-date">2026</span>
  </div>
  <p>Subspace-based (MUSIC, ESPRIT, matrix pencil) time-delay estimation for IEEE 802.11n WiFi L-LTF signals. Research paper to be published.</p>
  <div class="tags"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/MultipleSignalClassification" target="_blank" rel="noopener noreferrer">MultipleSignalClassification on GitHub</a></div>

  <div class="readme-toggle">
    <button type="button" class="readme-summary" aria-expanded="false">
      <span class="label-open">+ Show details &amp; code</span><span class="label-close">&minus; Hide details</span>
    </button>
    <div class="readme-collapse">
      <div class="readme">
      <h4>Overview</h4>
      <p>
        The L-LTF preamble of a WiFi packet is a known training sequence, so a receiver's channel estimate is
        a sum of delayed, attenuated copies of it, one per multipath tap. Time-delay estimation recovers those
        delays directly from the channel/frequency response rather than from cross-correlation alone. MUSIC
        gets there by eigendecomposing the array/frequency covariance matrix into a signal subspace and a
        noise subspace, then scanning candidate delays for the ones whose steering vector is (almost)
        orthogonal to the noise subspace, using the pseudo-spectrum
      </p>
      \[
      P(\tau) = \frac{1}{a(\tau)^{H} \, E_n E_n^{H} \, a(\tau)}
      \]
      <p>
        where \(a(\tau)\) is the steering vector for delay \(\tau\) and \(E_n\) collects the noise-subspace
        eigenvectors, so \(P(\tau)\) peaks sharply at the true delays. ESPRIT and matrix pencil solve the same
        subspace-separation problem without an explicit search, by exploiting a shift-invariance structure in
        the signal subspace instead.
      </p>
      <h4>Install</h4>
      <pre class="code-block" data-lang="bash"><code>pip install -e .
</code></pre>
      <h4>Run</h4>
      <pre class="code-block" data-lang="bash"><code>python examples/basic_usage.py
python scripts/run_tde.py
</code></pre>
      <p class="form-hint"><code>src/musicssvd/</code> separates signal generation (<code>DataGenerator</code>), TDE algorithms (<code>DataProcessor</code>), accuracy metrics (<code>Evaluator</code>), and plotting (<code>Plotter</code>), wired together by the <code>MUSICTDE</code> facade.</p>
    </div>
    </div>
  </div>
</div>

<p>More on <a href="https://github.com/DaanZunnenberg" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>

<h2>Education</h2>

<div class="entry">
  <div class="entry-head">
    <h3>Leiden University</h3>
    <span class="entry-date">Expected September 2028</span>
  </div>
  <div class="entry-org">Doctor of Philosophy (PhD), Mathematics &middot; Leiden, Netherlands</div>
  <p>
    Researching decomposition theorems, generic chaining, and majorizing measures for controlling suprema of
    stochastic processes, applied to weak convergence and Donsker&ndash;Skorokhod-type results under absolute
    regularity. I also organize and lead a weekly graduate seminar on weak convergence and empirical process
    theory. The full technical writeup, including a walkthrough of the \(\gamma_2\) functional and the
    majorizing measure theorem, is on the <a href="{{ '/research/' | relative_url }}">Research</a> page.
  </p>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Vrije Universiteit Amsterdam</h3>
    <span class="entry-date">August 2024</span>
  </div>
  <div class="entry-org">MSc Econometrics and Operations Research &middot; Amsterdam, Netherlands</div>
  <p>
    Honours Programme, GPA 8.9/10 (magna cum laude). Coursework centered on Measure Theoretic Probability,
    Quantitative Financial Risk Management, Stochastic Processes, and Stochastic Integration. My thesis
    developed a functional stationarity test for multidimensional diffusion processes, packaged as the
    open-source <em>Functional Stationarity Test</em> library above.
  </p>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Amsterdam University of Applied Sciences</h3>
    <span class="entry-date">August 2022</span>
  </div>
  <div class="entry-org">BSc Applied Mathematics &middot; Amsterdam, Netherlands</div>
  <p>
    Minor in Big Data Analytics: model training, evaluation, and deployment, the first exposure that pulled me
    toward the applied/statistical side of mathematics I've stayed in since.
  </p>
</div>

<h2>Skills</h2>

<div class="entry">
  <ul>
    <li><strong>Languages &amp; tools:</strong> <code>Python</code> (<code>Pandas</code>, <code>NumPy</code>, <code>asyncio</code>, <code>Numba</code>), <code>Java</code>, <code>Git</code>, <code>Docker</code>, <code>Bash</code></li>
    <li><strong>Machine learning:</strong> <code>SciPy</code>, <code>CVXPY</code>, <code>statsmodels</code>, <code>scikit-learn</code>, <code>TensorFlow</code></li>
    <li><strong>Statistical foundations:</strong> time series analysis, econometrics, inference theory</li>
  </ul>
</div>
