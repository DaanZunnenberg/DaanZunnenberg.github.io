---
layout: default
title: About
---

<section class="hero">
  <canvas id="market-widget-canvas" aria-label="Live BTC/USDT and ETH/USDT options chain"></canvas>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">PhD Researcher &middot; Quant Enthusiast<span class="hero-eyebrow-extra"> &middot; Probabilist</span></div>
    <h1 class="hero-name">Daan Zunnenberg<span class="cursor">_</span></h1>
    <p class="hero-lede">Mathematics researcher with a builder's streak for quant trading, HFT &amp; market-making.</p>
    <div class="hero-links">
      <a href="mailto:dw.zunnenberg@gmail.com"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 4h20v16H2V4zm10 7L4 6v2l8 5 8-5V6l-8 5z"/></svg>Email</a>
      <a href="https://github.com/DaanZunnenberg" target="_blank" rel="noopener noreferrer"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.15c-3.19.7-3.86-1.53-3.86-1.53-.52-1.34-1.28-1.7-1.28-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.7.41.36.78 1.08.78 2.18v3.24c0 .3.21.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/></svg>GitHub</a>
      <a href="https://www.linkedin.com/in/daanzunnenberg/" target="_blank" rel="noopener noreferrer"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>LinkedIn</a>
      <a href="https://scholar.google.com/citations?user=JLg2KjEAAAAJ" target="_blank" rel="noopener noreferrer"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 8l11 5 9-4.09V17h2V8L12 3zm-7 9.18V16c0 2.21 3.13 4 7 4s7-1.79 7-4v-3.82l-7 3.18-7-3.18z"/></svg>Scholar</a>
    </div>
  </div>
</section>

<p class="lede">
Abstract probability by day, quant by heart. <a href="{{ '/personal/' | relative_url }}">Beyond the desk &rarr;</a>
</p>

<h2>Selected Projects</h2>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://github.com/DaanZunnenberg/FunctionalScale" target="_blank" rel="noopener noreferrer">Functional Volatility Surface Modelling</a></h3>
    <span class="entry-date">2024 &ndash; present</span>
  </div>
  <p>Extending functional GARCH to a GAS model for time-varying intraday volatility surfaces, estimated with B-splines and <code>Numba</code> JIT.</p>
  <div class="tags"><code>Python</code> &middot; <code>SAS</code> &middot; <a href="https://github.com/DaanZunnenberg/FunctionalScale" target="_blank" rel="noopener noreferrer">FunctionalScale on GitHub</a></div>

  <div class="readme-toggle is-open">
    <button type="button" class="readme-summary" aria-expanded="true">
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
  <p>An open-source functional stationarity test for multidimensional diffusion processes, developed for my MSc thesis.</p>
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
    <span class="entry-date">2023 &ndash; 2024</span>
  </div>
  <p>Hierarchical Risk Parity via tree clustering, generating a mean alpha premium of 3.9% above benchmark in a look-ahead-free backtest.</p>
  <div class="tags"><code>Python</code> &middot; <a href="https://coinmerce.capital/en/home" target="_blank" rel="noopener noreferrer">Coinmerce Capital</a></div>
</div>

<p><a href="{{ '/projects/' | relative_url }}">All projects &rarr;</a></p>

<h2>Experience</h2>

<div class="entry">
  <div class="entry-head">
    <h3>QuantFi &middot; Quantitative Developer</h3>
    <span class="entry-date">2023 &ndash; 2024</span>
  </div>
  <ul>
    <li>Algorithmic market-making: volatility/skew estimation, order-flow modelling, queue-aware execution, market impact.</li>
    <li>Smart order routing with dynamic liquidity allocation, cutting slippage and transaction costs by 5.8%.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <code>asyncio</code> &middot; <code>Numba</code> &middot; <code>CCXT</code></div>
</div>

<p><a href="{{ '/experience/' | relative_url }}">Full resume &rarr;</a></p>
