---
layout: default
title: About
---

<section class="hero">
  <canvas id="depth-widget-canvas" class="hero-canvas" aria-label="Live XLM, SOL and XRP spot order books, each with a spot/perp price-difference table for cash-and-carry arbitrage"></canvas>
  <div class="hero-fade hero-fade-long" aria-hidden="true"></div>
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
    <span class="entry-date">September 2024 &ndash; present</span>
  </div>
  <ul>
    <li>Extending the functional GARCH framework to a generalized autoregressive score (GAS) model to estimate and capture time-varying intraday volatility surfaces.</li>
    <li>Designed efficient estimation procedures using B-splines, applying <code>numba</code> JIT compilation to enable scalable modelling of volatility surfaces from granular intraday return data.</li>
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
      <p>
        Placing the two estimators' fitted surfaces directly next to each other, rather than each against the
        true surface separately, makes the score-driven adaptation's smoothing effect easier to see:
      </p>
      <img src="{{ '/assets/img/garch_vs_gas_vol_surface.png' | relative_url }}" alt="Functional GARCH-estimated versus GAS-GARCH-estimated volatility surface, side by side" class="entry-figure">
      <p class="form-hint">Same simulated data and seed as both comparisons above.</p>
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
  <p>A nonparametric stationarity test for multidimensional diffusions, comparing two smoothers whose convergence rates diverge under nonstationarity. Built for my MSc thesis, released as an open-source library.</p>
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

# Estimate and test
test = KernelTest(data=X, kernel_params={'bandwidth': np.sqrt(3) * 9 / ((n ** (1/6)) * np.log(n)), 'n': n, 'T': T, 'kernel': Kernel.BaseKernel}, time_params={'bandwidth': 200 * T / n, 'n': n, 'T': T})
test.time_domain_smoother(lamb=0.99)
test.state_domain_smoother(dist=True)
test.gauss()
bound, scalar_gauss = test.transform_1D_gauss()
</code></pre>
      <p class="form-hint">Requires Python &ge; 3.10. Full setup, repository layout, and batch KPSS/Leybourne&ndash;McCabe comparisons on the <a href="{{ '/experience/' | relative_url }}">Experience &amp; Projects</a> page.</p>
    </div>
    </div>
  </div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://github.com/DaanZunnenberg/RiskFunctions" target="_blank" rel="noopener noreferrer">RiskFunctions</a></h3>
    <span class="entry-date">2024</span>
  </div>
  <p>An installable library of risk models by family &mdash; variance-covariance and historic-simulation VaR/ES, CCC-GARCH, EWMA-FHS, copulas, and factor analysis &mdash; kept free of I/O and plotting so the estimators stay composable.</p>
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
        data, wires a model together, or produces output lives in <code>examples/</code> instead. Historic-
        simulation VaR at level \(\alpha\) is just the empirical quantile of realized P&amp;L,
      </p>
      \[
      \widehat{\mathrm{VaR}}_\alpha = -\inf\{x : \hat F_{\text{PnL}}(x) \ge \alpha\}, \qquad
      \widehat{\mathrm{ES}}_\alpha = -\mathbb{E}\left[\mathrm{PnL} \mid \mathrm{PnL} \le -\widehat{\mathrm{VaR}}_\alpha\right]
      \]
      <h4>Usage</h4>
      <pre class="code-block" data-lang="bash"><code>python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"          # core + test dependencies
pip install -e ".[multivariate]" # needed only for copulas / factor analysis

python examples/var_covariance_example.py
python examples/ccc_garch_example.py
</code></pre>
      <p class="form-hint">Full model list and examples on the <a href="{{ '/experience/' | relative_url }}">Experience &amp; Projects</a> page.</p>
    </div>
    </div>
  </div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://github.com/DaanZunnenberg/FunctionalCurves" target="_blank" rel="noopener noreferrer">Tukey Depth Under Mixing</a></h3>
    <span class="entry-date">2025</span>
  </div>
  <p>Simulating dependent (mixing) time series and estimating Tukey's halfspace depth and its minimal direction, both empirically and in closed form, to study how the estimate converges as the sample grows.</p>
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
        <code>Depth.py</code> estimates Tukey depth &mdash; the minimum, over all halfspaces containing a
        point \(x\), of the probability mass on one side &mdash;
      </p>
      \[
      D(x) = \inf_{u \in S^{d-1}} \; \mathbb{P}\left(u^\top X \le u^\top x\right)
      \]
      <p>and its minimal direction empirically from a sample, with closed-form depth for Gaussian and stationary VAR(1) processes to compare against.</p>
      <h4>Usage</h4>
      <pre class="code-block" data-lang="python"><code>from Core.MixingModels import MixingLinearModel
from Core.Depth import Estimator, GaussianDepth

process = MixingLinearModel(mixing_rate=1.5)
X = process.simulate(n=500)

result = Estimator(X, X0, method="deg")   # or "point_wise"
depth, direction = result.depth, result.direction
</code></pre>
      <p class="form-hint">See the notebooks in <code>Core/</code>, linked from the <a href="{{ '/experience/' | relative_url }}">Experience &amp; Projects</a> page, for the full VAR(1) and mixing-process walkthroughs.</p>
    </div>
    </div>
  </div>
</div>

<p><a href="{{ '/experience/' | relative_url }}">All projects &rarr;</a></p>

<h2>Experience</h2>

<div class="entry">
  <div class="entry-head">
    <h3>QuantFi &middot; Quantitative Developer</h3>
    <span class="entry-date">March 2023 &ndash; August 2024</span>
  </div>
  <ul>
    <li>Ran algorithmic market-making in crypto derivatives: volatility/skew estimation, order-flow modelling, queue-aware execution.</li>
    <li>Built a smart order router with dynamic liquidity allocation across fragmented order books, cutting slippage and transaction costs by 5.8% on average.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <code>asyncio</code> &middot; <code>numba</code> &middot; <code>ccxt</code></div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>VU Econometrics and Data Science &middot; Research Assistant</h3>
    <span class="entry-date">January 2024 &ndash; June 2024</span>
  </div>
  <ul>
    <li>Built likelihood-based estimation for functional location-scale models, contributing to Lin &amp; Lucas's work on robust observation-driven dynamics.</li>
    <li>Projected the conditional-variance operator onto a Bernstein-polynomial basis, turning an infinite-dimensional, positivity-constrained QMLE problem into one numerical optimization can actually solve.</li>
  </ul>
  <div class="tags"><code>Python</code></div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>QuantFi &middot; Operational Trader</h3>
    <span class="entry-date">October 2022 &ndash; March 2023</span>
  </div>
  <ul>
    <li>Managed live risk on production market-making algorithms through high-volatility sessions.</li>
    <li>Built the desk's real-time position/order terminal, with Tardis.dev-backed fill reconstruction for post-session audits.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <code>ccxt</code> &middot; <code>Tardis.dev</code></div>
</div>

<p><a href="{{ '/experience/' | relative_url }}">Full resume &rarr;</a></p>

<h2>A Small Confession About the Banner</h2>
<p>
  That flickering panel behind my name up top isn't decoration. It's a real, currently-live order book,
  quietly doing its job in the background while you read a page about probability theory. Old habits: even
  here, on a page about myself, I couldn't resist leaving a market open in the corner. If it looks unusually
  calm right now, that's not a design choice &mdash; that's just what the market is doing at this exact
  moment, for better or worse.
</p>
