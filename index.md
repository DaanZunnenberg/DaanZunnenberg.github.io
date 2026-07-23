---
layout: default
title: About
---

<section class="hero hero-bleed">
  <canvas id="depth-widget-canvas" class="hero-canvas" aria-label="Live XLM, SOL and XRP spot order books, each with a spot/perp price-difference table for cash-and-carry arbitrage"></canvas>
  <div class="hero-fade hero-fade-long" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">PhD Researcher &middot; Quant Enthusiast<span class="hero-eyebrow-extra"> &middot; Probabilist</span></div>
    <h1 class="hero-name">Daan Zunnenberg<span class="cursor">_</span></h1>
    <p class="hero-lede">PhD researcher in probability theory with a passion for quant trading, HFT, and market-making.</p>
    <div class="hero-links">
      <button type="button" class="copy-email" data-u="dw.zunnenberg" data-d="gmail.com"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 4h20v16H2V4zm10 7L4 6v2l8 5 8-5V6l-8 5z"/></svg>Email<span class="copy-toast">Copied</span></button>
      <a href="https://github.com/DaanZunnenberg" target="_blank" rel="noopener noreferrer"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.15c-3.19.7-3.86-1.53-3.86-1.53-.52-1.34-1.28-1.7-1.28-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.7.41.36.78 1.08.78 2.18v3.24c0 .3.21.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/></svg>GitHub</a>
      <a href="https://www.linkedin.com/in/daanzunnenberg/" target="_blank" rel="noopener noreferrer"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>LinkedIn</a>
      <a href="https://scholar.google.com/citations?user=JLg2KjEAAAAJ" target="_blank" rel="noopener noreferrer"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 8l11 5 9-4.09V17h2V8L12 3zm-7 9.18V16c0 2.21 3.13 4 7 4s7-1.79 7-4v-3.82l-7 3.18-7-3.18z"/></svg>Scholar</a>
    </div>
  </div>
</section>

<p class="lede">
I'm a mathematician working in generic chaining theory, driven by a passion for high-frequency trading, market
making, and quantitative investing. <a href="{{ '/academic/mathematics/' | relative_url }}">Explore the math &rarr;</a>
</p>

<h2 id="selected-projects">Selected Projects</h2>

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
      <p class="form-hint">The first comparison figure shows the estimated GAS-GARCH volatility surface against the true volatility surface to assess the model&rsquo;s ability to recover the underlying dynamics.</p>
      <p>
        Placing the two estimators' fitted surfaces directly next to each other, rather than each against the
        true surface separately, makes the score-driven adaptation's smoothing effect easier to see:
      </p>
      <img src="{{ '/assets/img/garch_vs_gas_vol_surface.png' | relative_url }}" alt="Functional GARCH-estimated versus GAS-GARCH-estimated volatility surface, side by side" class="entry-figure">
      <p class="form-hint">The second comparison figure compares the functional GARCH and GAS-GARCH volatility surfaces, demonstrating the increased flexibility of the GAS-GARCH specification relative to the traditional functional GARCH model.</p>
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

<div class="entry" id="project-functional-stationarity-test">
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
        behaviour of the occupation measure,
        \[\mu_t(A) = \int_0^t \mathbf{1}_A(X_s)\,ds,\]
        which measures the amount of time the diffusion spends in a measurable set \(A\). For a stationary and
        ergodic diffusion, the occupation measure grows linearly with time, with the growth rate determined by
        the invariant distribution. Therefore, under the diffusion assumptions above, stationarity is
        equivalent to linear divergence of the occupation measure.
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

<div class="entry" id="project-tukey-depth-under-mixing">
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
      <p>The repository includes Python examples for simulating dependent time series models and estimating Tukey depth and its minimal direction.</p>
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

<h2 id="experience">Experience</h2>

<div class="entry" id="experience-quantfi-quantitative-developer">
  <div class="entry-head">
    <h3>QuantFi &middot; Quantitative Developer</h3>
    <span class="entry-date">March 2023 &ndash; August 2024</span>
  </div>
  <ul>
    <li>Ran algorithmic market-making in crypto derivatives, covering volatility and skew estimation, modelling of order flow, and execution that accounts for queue position.</li>
    <li>Built a smart order router with dynamic liquidity allocation across fragmented order books, cutting slippage and transaction costs by 5.8% on average.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <code>asyncio</code> &middot; <code>numba</code> &middot; <code>ccxt</code></div>
</div>

<div class="entry" id="experience-vu-research-assistant">
  <div class="entry-head">
    <h3>VU Econometrics and Data Science &middot; Research Assistant</h3>
    <span class="entry-date">January 2024 &ndash; June 2024</span>
  </div>
  <ul>
    <li>Built likelihood-based estimation for functional location-scale models, contributing to Lin &amp; Lucas's work on robust observation-driven dynamics.</li>
    <li>Projected the conditional variance operator onto a Bernstein polynomial basis, turning an infinite-dimensional QMLE problem with positivity constraints into one a numerical optimizer can actually solve.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <code>SAS</code> &middot; <code>Bash</code></div>
</div>

<div class="entry" id="experience-quantfi-operational-trader">
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

<div class="entry" id="experience-beyonddutch-research-intern">
  <div class="entry-head">
    <h3>BeyondDutch &middot; Research Intern</h3>
    <span class="entry-date">January 2018 &ndash; June 2018</span>
  </div>
  <ul>
    <li>Built survival models for heavily right-censored data using <code>Python</code> and <code>scikit-survival</code>, using <code>SQLAlchemy</code> to pull data from SQL databases.</li>
    <li>Created features by combining domain data with macroeconomic indicators using <code>pandas</code> and <code>cbsodata</code> to cover missing data points.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <code>scikit-survival</code> &middot; <code>SQLAlchemy</code> &middot; <code>pandas</code> &middot; <code>cbsodata</code></div>
</div>

<p><a href="{{ '/experience/' | relative_url }}">Full resume &rarr;</a></p>

<h2 id="working-together">Working Together</h2>
<p class="tagline">Here for a collaboration or a career opportunity? Pick the path that fits.</p>

<div class="nav-cards">
  <a class="nav-card" href="{{ '/academic/contact/' | relative_url }}">
    <span class="nav-card-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M12 2 2 7l10 5 10-5-10-5Zm0 8L2 15l10 5 10-5-10-5Z"/></svg>
    </span>
    <span class="nav-card-body">
      <span class="nav-card-title">Research &amp; Academic</span>
      <span class="nav-card-hint">Collaboration proposals, seminar invitations, or questions about the PhD work.</span>
    </span>
    <span class="nav-card-arrow" aria-hidden="true">&rarr;</span>
  </a>
  <a class="nav-card" href="{{ '/contact/' | relative_url }}">
    <span class="nav-card-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M20 7h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2ZM10 5h4v2h-4V5Zm10 14H4V9h16v10Z"/></svg>
    </span>
    <span class="nav-card-body">
      <span class="nav-card-title">Recruiters &amp; Professional</span>
      <span class="nav-card-hint">Roles, consulting, or an invitation to meet up. For industry and professional contact.</span>
    </span>
    <span class="nav-card-arrow" aria-hidden="true">&rarr;</span>
  </a>
</div>

<h2 id="banner-confession">A Small Confession About the Banner</h2>
<p>
  That's a real order book behind my name, not decoration. Couldn't help myself. If it's quiet right now,
  that's just the market, not me.
</p>
