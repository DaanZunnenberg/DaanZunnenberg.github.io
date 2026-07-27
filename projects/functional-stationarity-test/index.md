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

<h2 id="overview">The problem</h2>
<p>
  Most stationarity tests are built for one-dimensional series and one specific parametric model. A unit-root
  test on an AR(1), say. That breaks down once the true process is nonlinear or multidimensional. Fitting the
  wrong model and then testing that model for a unit root tells you very little about the real process.
</p>
<p>
  This project takes a different route. It builds a nonparametric test that works for a broad class of
  multidimensional It&ocirc; diffusions, without assuming any parametric drift or diffusion function up front.
  It became the open-source <code>FunctionalMH</code> library, written for my MSc thesis
  (<em>Testing Multidimensional Diffusion Processes for Stationarity</em>, VU Amsterdam, supervised by Eric
  Beutner and Yicong Lin) in Econometrics and Operations Research.
</p>
<p>
  The setting: a \(d\)-dimensional It&ocirc; diffusion process \((S_t)_{t\ge0}\), with state space
  \(\mathbb{R}^d\), given as the strong solution of
  \[S_0 = S, \qquad \mathrm{d}S_t = b(S_t)\,\mathrm{d}t + \sigma(S_t)\,\mathrm{d}W_t, \qquad t \ge 0,\]
  where \(b\) is the drift, \(\sigma\) is the diffusion coefficient, and \(W\) is a \(d\)-dimensional Brownian
  motion. You observe one trajectory of \(S\), sampled at discrete times. You don't know \(b\) or \(\sigma\).
  The question: is \(S\) stationary?
</p>
<p>
  Three conditions make the test work. First, \(b\) and \(\sigma\) satisfy Lipschitz and linear-growth
  conditions, so a unique, non-exploding solution exists. Second, the diffusion coefficient is
  <em>uniformly elliptic</em>: the process moves with comparable variance in every direction, no direction is
  degenerate. This rules out cyclic paths and keeps the process aperiodic. Third, the process is
  <em>Harris recurrent</em>: every region of positive measure gets visited infinitely often. This guarantees an
  invariant measure exists, and it forces the process's <em>occupation measure</em>, a running count of how
  long the process has spent near a given point, to grow without bound. That growth rate is what the test
  statistic actually measures. Together, these three conditions cover a wide class of financial and physical
  diffusion models, while ruling out edge cases like Brownian motion with drift, which only visits most of its
  state space finitely often.
</p>

<h2 id="test-statistic">How the test works</h2>
<p>
  The key result, due to Darling &amp; Kac (1957) and sharpened by Lazi&#263; &amp; Sandri&#263; (2021) and
  Lee &amp; Trutnau (2022): for a Harris recurrent, uniformly elliptic diffusion, stationarity is equivalent to
  the occupation measure growing <em>linearly</em> in time. A nonstationary process grows sub-linearly instead.
  So instead of testing a parametric hypothesis about drift or mean reversion, the test asks a simpler
  question. Does the process revisit its own state space at a linear rate, or slower?
</p>
<p>
  To turn that into a number, the test compares two estimators of the diffusion matrix. Both are consistent
  whether or not the process is stationary, but they get there at different speeds.
</p>
<ul>
  <li>A <strong>time-domain</strong> estimator: a local, EWMA-style average of squared increments in a
  shrinking window around a fixed point in time. Its convergence speed doesn't depend on stationarity, since
  it only looks at data close in time to the point being estimated.</li>
  <li>A <strong>state-domain</strong> estimator: a Nadaraya&ndash;Watson kernel regression that averages
  squared increments over every observation near a given state, regardless of when it happened. Its speed
  depends on the occupation measure at that state. It converges faster once the process has spent more time
  nearby, and that only happens at a linear rate if the process is stationary.</li>
</ul>
<p>
  This is the same idea as a Durbin&ndash;Wu&ndash;Hausman test: two estimators of the same thing that agree
  under the null and diverge under the alternative. Here, the null is that \(S\) is stationary. Under the
  null, the standardised difference between the two estimators converges to a mean-zero Gaussian sequence.
  Under the alternative, it diverges, because the state-domain estimator slows down while the time-domain
  estimator keeps its usual speed.
</p>
<p>
  Because the diffusion matrix is estimated at every point along the trajectory, this comparison doesn't give
  one test statistic. It gives a whole sequence of them, roughly one per observed time point. The test needs
  one number to make a decision from that sequence, so it borrows an idea from extreme value theory. Under the
  null, the sequence behaves like a stationary Gaussian process, and the running maximum of such a process has
  a known, closed-form Gumbel-type limit. The test rejects stationarity if the observed running maximum
  crosses that limit. No bootstrap, no simulated critical values, just an analytic bound.
</p>

<h2 id="implementation">How the code is organised</h2>
<p class="form-hint">
  <strong>Note.</strong> Everything below is written for <em>bivariate</em> processes (\(d=2\)). The theory
  above holds for any dimension \(d\), and <code>models/processes.py</code> includes simulators in other
  dimensions for reference, but the estimator and test statistic in <code>testing/kernel_test.py</code> are
  built specifically around \(2\times2\) diffusion matrices. The <code>vech</code> half-vectorisation, the
  matrix square-root inverse, and the density estimate inside the state-domain smoother all assume \(d=2\).
</p>
<p>
  The package lives under <code>src/mht/</code>. <code>testing/kernel_test.py</code> has the core test:
  <code>Kernel</code>, <code>KernelTest</code>, <code>Simulator</code>, <code>TestPlotter</code>.
  <code>testing/hypothesis.py</code> adds <code>MultipleHypTest</code>, a Benjamini&ndash;Hochberg/Yekutieli
  FDR-control alternative to the running-maximum approach below. <code>models/processes.py</code> has four SDE
  simulators, including a bivariate correlated diffusion with a Milstein scheme and an explicit correction term
  for its polynomial diffusion coefficient. <code>io/reader.py</code> loads precomputed simulation CSVs.
</p>
<p>
  Everything runs through one object, <code>KernelTest</code>. You give it a trajectory and two configuration
  dictionaries, and it takes you from raw data to a rejection decision in four steps: prepare the data, pick a
  kernel and bandwidth, compute the two estimators, then reduce them to one test statistic. The walkthrough
  below follows those four steps in order, with the actual code at each step.
</p>

<h4 id="step-1-data">Step 1. Load the trajectory</h4>
<p>
  <code>KernelTest</code> is a thin, stateful container. Pass it a bivariate trajectory, either simulated with
  <code>BivariateOUProcess</code>/<code>BivariateCorrelatedBM</code> or read from a CSV, and it stores the
  configuration for the two estimators. Nothing gets computed yet, the estimates only fill in once you call
  the methods in steps 3 and 4.
</p>
<pre class="code-block" data-lang="python"><code>class KernelTest:
    """Kernel-based test for time-homogeneity of the diffusion matrix.

    Compares a state-domain smoother against a time-domain smoother of the
    integrated diffusion matrix. Under H0 (time-homogeneous diffusion) the
    standardised difference converges to a Gaussian process whose running
    maximum has a known Gumbel-type limit distribution.
    """

    def __init__(
        self,
        data: pd.DataFrame,        # columns ['process 1', 'process 2']
        kernel_params: dict,       # {'bandwidth', 'n', 'T', 'kernel'}
        time_params: dict,         # {'bandwidth', 'n', 'T'}
        disable: bool = False,     # suppress tqdm progress bars
    ) -> None:
        self.data = data
        self.kernel_params = kernel_params
        self.time_params = time_params
        self.disable = disable
        self.kernel_estimates: dict = {}
        self.time_estimates: dict = {}</code></pre>
<p>
  If the data is simulated on a grid of \(n\) observations over horizon \(T\), the effective sampling
  interval is \(\Delta_n = T/n\). That is the number every bandwidth below is tuned against.
</p>

<h4 id="step-2-kernel">Step 2. Pick a kernel and bandwidth</h4>
<p>
  The state-domain smoother needs a kernel and a bandwidth. The default kernel is
  <code>Kernel.BaseKernel</code>, a plain boxcar: weight 1 inside the bandwidth, 0 outside. The time-domain
  smoother needs its own, separately tuned bandwidth. Both follow the near-optimal rates from Bandi &amp;
  Moloche (2018), so you don't have to hand-tune a new constant for every dataset, <code>Simulator</code>
  looks them up from a table keyed on horizon length.
</p>
<pre class="code-block" data-lang="python"><code>class Kernel:
    """Kernel functions for the state-domain (Nadaraya-Watson) smoother."""

    def __init__(self, *, kernel_params: dict) -> None:
        self.kernel_params = kernel_params

    def BaseKernel(self) -> Callable:
        """Boxcar/indicator kernel, K(x) = 1{|x| <= h}."""
        def k(x: np.ndarray) -> np.ndarray:
            return np.where(np.abs(x) <= 1, 1.0, 0.0)
        return k</code></pre>
<p>
  Putting steps 1 and 2 together, this is what setting up a test looks like in practice. The bandwidth here
  follows the near-optimal rate \(h_{n,T} = C/(n^{1/6}\log n)\) from Bandi &amp; Moloche (2018), with the
  constant \(C\) tuned once per horizon length.
</p>
<pre class="code-block" data-lang="python"><code>from mht.testing.kernel_test import KernelTest, Kernel

n, T = 3000, 150.0
bandwidth = np.sqrt(3) * 6 / (n ** (1 / 6) * np.log(n))

test = KernelTest(
    data=trajectory,                                  # DataFrame, shape (n, 2)
    kernel_params={
        'bandwidth': bandwidth,
        'n': n, 'T': T,
        'kernel': Kernel.BaseKernel,
    },
    time_params={'bandwidth': 100 * T / n, 'n': n, 'T': T},
    disable=True,
)</code></pre>

<h4 id="step-3-estimators">Step 3. Compute both estimators</h4>
<p>
  Three calls do the real work of this step. <code>time_domain_smoother</code> builds the EWMA-weighted
  time-domain estimator. <code>state_domain_smoother</code> builds the Nadaraya&ndash;Watson state-domain
  estimator, optionally using a kernel density estimate of the state instead of a raw occupation count.
  <code>gauss</code> then takes the standardised difference between the two, through a matrix square-root
  inverse of their combined covariance. If that matrix inversion fails numerically, it falls back to
  <code>NaN</code> rather than crashing, worth knowing, since a bad inversion could otherwise look like
  evidence against the null.
</p>
<pre class="code-block" data-lang="python"><code>test.time_domain_smoother(lamb=0.94)     # EWMA time-domain estimator ĉ_TD
test.state_domain_smoother(dist=False)   # Nadaraya-Watson state-domain estimator ĉ_SD
test.gauss()                             # standardised difference, stored in test.gaussian</code></pre>
<p>
  Before computing any test statistic, plot the two estimates against each other. They track the same
  diffusion coefficient, just from different data, so any real structural gap between them is exactly what the
  test is built to pick up later. The two figures below run this on two simulated bivariate trajectories:
  a stationary Ornstein&ndash;Uhlenbeck process, and a time-inhomogeneous diffusion where the true volatility
  drifts over time.
</p>
<img src="{{ '/images/stationarity/volatility_stationary.png' | relative_url }}" alt="State-domain versus time-domain volatility estimate, one panel per process component, for a simulated stationary bivariate Ornstein-Uhlenbeck process" class="entry-figure">
<p class="form-hint">Stationary bivariate OU process, \(T=150\), \(n=3000\), one panel per component. The two estimators track each other closely throughout. Exactly what the null hypothesis predicts.</p>
<img src="{{ '/images/stationarity/volatility_nonstationary.png' | relative_url }}" alt="State-domain versus time-domain volatility estimate, one panel per process component, for a simulated time-inhomogeneous bivariate diffusion" class="entry-figure">
<p class="form-hint">Time-inhomogeneous bivariate diffusion, same \(T\) and \(n\). The state-domain smoother pools observations across the whole trajectory, so it overshoots the time-domain smoother whenever the true diffusion coefficient is moving.</p>

<h4 id="step-4-statistic">Step 4. Reduce to one test statistic</h4>
<p>
  <code>gauss</code> leaves you with a sequence of standardised differences, one per observed time point, not
  a single number. <code>transform_1D_gauss</code> is the last step: it collapses that sequence into a scalar
  running maximum and pairs it with the analytic Pickands&ndash;Berman Gumbel bound at a given confidence
  level. If the running maximum crosses the bound, the test rejects stationarity. No simulation or bootstrap is
  needed for the critical value, it comes out of the extreme-value theory directly.
</p>
<pre class="code-block" data-lang="python"><code>def transform_1D_gauss(self, alpha: float = 0.95) -> tuple:
    """Reduce the Gaussian process to a scalar running maximum and its
    Gumbel-type critical bound at confidence level alpha."""
    x = np.log(1 / np.log(1 / alpha))
    n = len(self.gaussian)
    a_n = [np.sqrt(2 * np.log(z)) for z in range(1, n + 1)]
    b_n = [
        np.sqrt(2 * np.log(z))
        - np.log(np.pi * np.log(z)) / (2 * np.sqrt(2 * np.log(z)))
        for z in range(1, n + 1)
    ]
    bound = [np.nan] + [(x / a_n[i]) + b_n[i] for i in range(1, n)]
    scalar_gauss = [float(np.sum(g) / np.sqrt(3)) for g in self.gaussian]
    return bound, scalar_gauss</code></pre>
<p>
  Calling it and checking the result is one line each.
</p>
<pre class="code-block" data-lang="python"><code>bound, z = test.transform_1D_gauss(alpha=0.95)
rejects = running_maximum(z)[-1] > bound[-1]</code></pre>
<p>
  Here is that check on the same two trajectories from step 3. On the stationary process, the running maximum
  settles below the critical bound early and stays there. On the time-inhomogeneous process, it crosses the
  bound within the first few hundred observations and keeps climbing, since the standardised difference
  between the two estimators never stabilises once the true diffusion coefficient starts moving.
</p>
<img src="{{ '/images/stationarity/running_max_stationary.png' | relative_url }}" alt="Running maximum test statistic for the stationary Ornstein-Uhlenbeck process, staying below the Gumbel critical bounds at every confidence level" class="entry-figure">
<p class="form-hint">The standardised Gaussian process \(Z_t\) (grey), its empirical running maximum \(\phi_j\) (red), and the Pickands&ndash;Berman critical bound at four confidence levels. The running maximum never crosses even the loosest (50%) bound, so the test fails to reject stationarity.</p>
<img src="{{ '/images/stationarity/running_max_nonstationary.png' | relative_url }}" alt="Running maximum test statistic for the nonstationary time-inhomogeneous diffusion, sharply exceeding all Gumbel critical bounds" class="entry-figure">
<p class="form-hint">Same construction on the time-inhomogeneous diffusion. The running maximum clears every bound within the first few hundred observations and never comes back. A clear rejection of stationarity.</p>

<h4 id="design-notes">Why the code is split this way</h4>
<p>
  Each piece was pulled apart for a reason. <code>time_domain_smoother</code> and
  <code>state_domain_smoother</code> stay separate methods, not one combined estimator, because they use
  different amounts of data at different rates. Keeping them apart also makes it easy to swap in a different
  smoother later, without touching the rest of the pipeline. <code>gauss</code> is its own method because it
  is the one step doing a numerically fragile matrix inversion, so isolating it makes that failure mode easy to
  spot. <code>transform_1D_gauss</code> is kept separate from <code>gauss</code> because picking a confidence
  level and reducing to a running maximum is a modelling choice, distinct from estimating the standardised
  difference itself. <code>Simulator</code> drives Monte Carlo replication and picks bandwidths automatically,
  so a simulation study doesn't need manual tuning for every run. <code>TestPlotter</code> subclasses
  <code>KernelTest</code> to add the plotting methods used for the figures above, so a plot always reflects
  whatever configuration produced the underlying test object. Numerical safety nets run throughout: fragile
  matrix inversions return <code>NaN</code> instead of raising, and a caching decorator falls back gracefully
  when it's handed something unhashable, like a DataFrame.
</p>

<h2 id="testing">Testing and validation</h2>
<p>
  <code>tests/test_processes.py</code> and <code>tests/test_kernel_test.py</code> are smoke tests. They check
  that simulated paths are finite and correctly shaped, and that the pipeline runs end to end and returns a
  finite bound. They don't check actual rejection rates. <code>simulations/</code> holds precomputed CSVs of
  Gaussian-process paths under the null, at two sample sizes, used for a batch rejection-rate study of the
  test itself.
</p>
<p>
  In the thesis's own simulation study, the test lands close to its nominal 5% rejection rate on a stationary
  bivariate Ornstein&ndash;Uhlenbeck process as the sample grows. It rejects a nonstationary planar Brownian
  motion quickly. On a time-inhomogeneous bivariate diffusion, it correctly flags nonstationarity, but with a
  real limitation: power falls as \(T\) grows while the sampling interval \(\Delta_n\) is held fixed. That
  happens because the process, viewed at any single fixed timescale, starts to look like a stationary
  Ornstein&ndash;Uhlenbeck process locally. It's the same caveat from the theory section above: the
  running-maximum approximation needs a big enough sample for the extreme-value asymptotics to actually hold.
</p>

<h2 id="repository-structure">Repository structure</h2>
<pre class="code-block" data-lang="txt"><code>src/mht/
    testing/
        kernel_test.py        # KernelTest, Simulator, TestPlotter
        hypothesis.py         # MultipleHypTest, LaTeXTable
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
<p class="form-hint">Requires Python &ge; 3.10. Also includes BH/BY FDR procedures as an alternative multiple-hypothesis baseline for simulation studies.</p>

</div>

<p><a href="{{ '/projects/' | relative_url }}">&larr; Back to Projects</a></p>
