---
layout: default
title: Functional Scale Volatility Estimation
permalink: /projects/functional-scale-estimation/
---

<section class="hero">
  <img class="hero-img" src="{{ '/images/volatility/background.jpg' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Project &middot; January 2024 &ndash; June 2024</div>
    <h1 class="hero-name">Functional Scale Volatility Estimation</h1>
    <p class="hero-lede">Bernstein-basis QMLE for functional GARCH, at VU Amsterdam with Yicong Lin &amp; Andre Lucas.</p>
  </div>
</section>

<div class="article-body">

<p class="tagline"><code>Python</code> &middot; <code>SAS</code> &middot; <code>Bash</code> &middot; see <a href="{{ '/academic/research/' | relative_url }}">Publications</a></p>

<h2 id="overview">Context &amp; Motivation</h2>
<p>
  This project is the estimation and implementation side of an ongoing collaboration with Andr&eacute; Lucas
  and Yicong Lin on observation-driven dynamics for functional location-scale models. The goal of the codebase
  is narrow. Build a fast, numerically stable estimator for a single functional GARCH(1,1) recursion, cheap
  enough to re-run thousands of times inside a Monte Carlo study or a rolling forecast exercise. It is the
  direct precursor to the <a href="{{ '/projects/functional-volatility-surface-modelling/' | relative_url }}">Functional
  Volatility Surface Modelling</a> project, which reuses the same Bernstein-basis machinery but replaces the
  static GARCH recursion with a score-driven update over a B-spline basis.
</p>
<p>
  Computational scalability is a genuine bottleneck here, not a footnote. A functional GARCH model does not
  estimate a handful of scalars the way a classical GARCH(1,1) does. It estimates <em>operators</em> mapping
  curves to curves, objects that are in principle infinite-dimensional. Every evaluation of the objective
  function rebuilds these operators from the current parameter guess, materialises them as dense kernel
  matrices on the intraday grid, and runs the variance recursion through the full sample of trading days. If
  the grid has \(N\) intraday points, each recursion step is an \(N\times N\) matrix-vector product, and the
  optimizer needs thousands of function evaluations to converge, so that cost is paid thousands of times over.
  Keeping the per-evaluation cost small is what makes the whole approach usable, hence the JIT-compiled kernel
  builders, the vectorised recursion, and the separation between what can be cached across time steps and what
  genuinely changes every day.
</p>

<h2 id="setting">Theoretical Framework</h2>
<p>
  The theoretical foundation for this project is the functional GARCH quasi-maximum-likelihood framework of
  Cerovecki, Francq, H&ouml;rmann &amp; Zako&iuml;an (2018, MPRA Paper No. 83990). We work in the Hilbert
  space \(H = L^2([0,1])\) of square-integrable functions on the unit interval, and write
  \(\mathcal{K}^+(H)\) for the non-negative kernel operators on \(H\). An operator \(\boldsymbol\alpha \in
  \mathcal{K}^+(H)\) acts on a curve \(x \in H\) by \(\boldsymbol\alpha(x)(u) = \int K_{\boldsymbol\alpha}(u,v)x(v)\,dv\)
  for a non-negative kernel \(K_{\boldsymbol\alpha}\).
</p>
<p>
  Write \(y_t(u)\) for the log-return at intraday time \(u \in [0,1]\) on trading day \(t\). Each day
  contributes a whole curve rather than a single number, which is what makes the estimation problem functional
  rather than scalar. A functional GARCH\((p,q)\) process is a stationary solution of
  \[y_t = \sigma_t \eta_t, \qquad
  \sigma_t^2 = \delta + \sum_{i=1}^q \boldsymbol\alpha_i(y_{t-i}^2) + \sum_{j=1}^p \boldsymbol\beta_j(\sigma_{t-j}^2),\]
  where \(\eta_t\) is an i.i.d. sequence of innovation curves, \(\delta\) is a strictly positive intercept
  curve, and \(\boldsymbol\alpha_i,\boldsymbol\beta_j \in \mathcal K^+(H)\) are non-negative kernel operators.
  It is the functional analogue of a classical GARCH recursion. The intercept, the ARCH and GARCH
  coefficients, and the conditional variance itself are now curves or operators acting on curves, not numbers.
</p>
<p>
  The shape of the kernel \(K_{\boldsymbol\alpha}\) controls how shocks propagate across intraday time. A
  constant kernel makes today's volatility depend on yesterday's <em>integrated</em> volatility only, uniformly
  across the day. A kernel that is peaked around the diagonal instead makes today's volatility at time \(u\)
  depend mainly on yesterday's volatility <em>around</em> the same time of day, a much more realistic intraday
  persistence pattern. Recovering this shape, together with the shape of \(\delta\), from data is the job of
  the estimation procedure below. Existence of a stationary solution is governed by a top Lyapunov exponent
  condition analogous to the scalar GARCH case, strictly milder than the earlier sufficient conditions of Aue,
  Horv&aacute;th &amp; Pellatt (2016).
</p>
<p>
  The operators \(\boldsymbol\alpha_i,\boldsymbol\beta_j\) live in an infinite-dimensional space, so they
  cannot be estimated directly from a finite sample of days, and every operator must keep the variance curve
  positive. We solve both problems by projecting each operator onto a small set of \(M\) linearly independent,
  non-negative basis functions \(\varphi_1,\dots,\varphi_M \in H\),
  \[\delta = \sum_{k=1}^M d_k \varphi_k, \qquad
  \boldsymbol\alpha_i = \sum_{k,\ell=1}^M a^{(i)}_{k,\ell}\,\varphi_k \otimes \varphi_\ell, \qquad
  \boldsymbol\beta_j = \sum_{k,\ell=1}^M b^{(j)}_{k,\ell}\,\varphi_k \otimes \varphi_\ell.\]
  This turns an infinite-dimensional estimation problem into a finite one, over the coefficient vector
  \(\theta = \mathrm{vec}(d, A_1,\dots,A_q,B_1,\dots,B_p)\). The basis used throughout this codebase is the
  Bernstein polynomial basis, \(M\) polynomials on \([0,1]\), each non-negative everywhere on that interval.
  If the coefficients are all non-negative, the resulting intercept and kernel operators are automatically
  non-negative, so the fitted variance curve is automatically non-negative. Positivity is enforced by
  construction rather than by constraining the optimizer. Bernstein polynomials are a special case of
  B-splines, and are also the basis used in Cerovecki et al.'s own empirical study. The
  <a href="{{ '/projects/functional-volatility-surface-modelling/' | relative_url }}">Functional Volatility
  Surface Modelling</a> project swaps in a general B-spline basis for its score-driven extension.
</p>

<h2 id="estimation">Estimation &amp; Methodology</h2>
<p>
  A likelihood cannot be written down directly for a process taking values in \(H\), so the usual
  quasi-maximum-likelihood machinery does not carry over as is. Cerovecki et al. instead define an estimator
  <em>inspired</em> by classical GARCH QMLE. It projects the squared process onto the same basis functions
  used to parametrise the operators, and scores the fit with a Gaussian-QMLE-style criterion evaluated on
  those projections,
  \[\widehat\theta_n = \operatorname*{argmin}_{\theta \in \Theta} \frac1n\sum_{t=1}^n \sum_{m=1}^M \left\{
  \frac{\langle y_t^2, \varphi_m\rangle}{\langle\tilde\sigma_t^2,\varphi_m\rangle}
  + \log\langle\tilde\sigma_t^2,\varphi_m\rangle \right\},\]
  where the fitted volatility curve \(\tilde\sigma_t^2\) is generated by the same recursion as the model,
  started from a fixed initial curve. Because the basis functions are strictly positive and the operators are
  non-negative, every term in the criterion is well defined, and minimising it is a well-posed
  finite-dimensional problem. Under standard identifiability, moment and invertibility conditions, the
  estimator is strongly consistent and asymptotically normal at the usual parametric rate. The same argument,
  as a by-product, delivers consistency and asymptotic normality for semi-strong multivariate CCC-GARCH
  models, since the finite-dimensional projection is exactly a multivariate CCC-GARCH representation of the
  functional model.
</p>
<p>
  In practice the recursion is discretised on a uniform intraday grid of \(N\) points. Inner products become
  Riemann sums, and a kernel-operator application becomes a matrix-vector product against the \(N\times N\)
  matrix obtained by evaluating the kernel on the grid. Optimisation over \(\theta\) is carried out numerically
  with SLSQP, using simple non-negativity box constraints on the Bernstein coefficients in place of the
  abstract non-negativity requirement on the operators.
</p>

<h2 id="code">Code Structure &amp; Walkthrough</h2>
<p>
  The package lives in <code>funcgarch/garch.py</code>. Four pieces do the work: <code>bernstein_basis</code>
  and <code>kernel_operator</code> build the basis and the operators from a parameter vector, the day loop
  inside <code>garch_estimator</code>/<code>garch_filter</code> runs the recursion, and <code>loss_func</code>
  scores each day's fit. Everything except the day loop itself is JIT-compiled with Numba.
</p>
<p>
  <code>bernstein_basis</code> is called \(O(M)\) times per grid point on every objective-function evaluation,
  so it is JIT-compiled directly. Numba cannot call SciPy's <code>comb</code>, so the binomial coefficient is
  hand-rolled from factorials, a small but deliberate trade for speed at the innermost loop of the estimator.
  This is a direct implementation of \(\varphi_k^M(u) = \binom{M-1}{k-1}u^{k-1}(1-u)^{M-k}\) from the theory
  above.
</p>
<pre class="code-block" data-lang="python"><code>@jit(nopython=True)
def bernstein_basis(u: typing.Any, n_basis: int, k: int) -> float:
    def factorial(n):
        p = 1
        for i in range(1, n + 1):
            p *= i
        return p

    def comb(n, v):
        return factorial(n) / (factorial(v) * factorial(n - v))

    degree = n_basis - 1
    v = k - 1
    return comb(n_basis - 1, k - 1) * (u ** v) * (1 - u) ** (degree - v)</code></pre>
<p>
  <code>kernel_operator</code> builds the dense \(N\times N\) kernel matrix as a sum of \(M^2\) rank-one outer
  products of Bernstein column vectors. This is exactly the double sum in the theoretical parametrisation of
  \(\boldsymbol\alpha_i,\boldsymbol\beta_j\) above, materialised once per objective-function call rather than
  once per day.
</p>
<pre class="code-block" data-lang="python"><code>@jit(nopython=True)
def kernel_operator(
    u: np.ndarray,
    coefs: np.ndarray,
    n_basis: int,
    init: np.ndarray,
) -> np.ndarray:
    acc = init
    col = u.reshape((len(u), 1))
    idx = 0
    for k in range(1, n_basis + 1):
        bk = bernstein_basis(col, n_basis, k)
        for j in range(1, n_basis + 1):
            acc = acc + coefs[idx] * bk @ bernstein_basis(col, n_basis, j).T
            idx += 1
    return acc</code></pre>
<p>
  <code>_build_operators</code> unpacks a flat parameter vector into <code>delta_hat</code>,
  <code>alpha_hat</code> and <code>beta_hat</code>, the pre-evaluated grid-space objects, so the day loop that
  follows never touches the basis functions again. The loop itself is the discretised Riemann-sum version of
  \(\sigma_t^2 = \delta + \boldsymbol\alpha(y_{t-1}^2) + \boldsymbol\beta(\sigma_{t-1}^2)\), where each integral
  becomes an elementwise-weighted matrix-vector product divided by the grid size.
</p>
<pre class="code-block" data-lang="python"><code>for t in range(1, n_days):
    variance = (
        delta_hat
        + ((alpha_hat * returns[:, t - 1] ** 2) @ np.ones(n_grid_obs)
        +  (beta_hat  * variance)               @ np.ones(n_grid_obs)) / n_grid_obs
    )
    total_loss += loss_fn(returns[:, t], variance, n_basis, grid)</code></pre>
<p>
  <code>loss_func</code> is a Bernstein-projected mean squared error between the squared returns and the
  fitted variance, summed across the \(M\) basis functions,
  \(L_t = \sum_{k=1}^M \frac1N\sum_i \bigl[(y_t^2(u_i)-\sigma_t^2(u_i))\varphi_k^M(u_i)\bigr]^2\). It is a
  deliberately cheaper stand-in for the formal QMLE criterion above, trading some statistical efficiency for a
  criterion that is fast to evaluate and easy to differentiate numerically. <code>garch_estimator</code> wraps
  the day loop and is what gets handed to <code>scipy.optimize.minimize</code>. <code>garch_filter</code> runs
  the identical recursion but returns the full <code>(n_grid, n_days)</code> variance surface instead of a
  scalar loss, and is used once fitting is complete to recover the fitted volatility surface for the whole
  sample.
</p>
<p class="form-hint">Non-negative Bernstein coefficients guarantee a positive volatility surface directly, without constrained optimization over the full operator. <code>fit</code> is a thin wrapper around <code>scipy.optimize.minimize</code> that returns a <code>ResultContainer</code> exposing the usual <code>OptimizeResult</code> fields.</p>

<h2 id="results">Results &amp; Empirical Discussion</h2>
<p>
  Applying this framework to simulated intraday data generated from a known functional GARCH(1,1) recursion,
  via <code>funcgarch.simulate.simulate</code>, which reuses the exact same Bernstein operator builders as the
  estimator, and estimating with Bernstein-basis QMLE at <em>M</em>&nbsp;=&nbsp;3 basis functions, gives the
  fitted volatility surface shown below. The estimation recovers the main structure of the true process, while
  the remaining day-to-day roughness reflects finite-sample effects and the limited flexibility of the chosen
  basis.
</p>
<img src="{{ '/assets/img/garch_vol_surface.png' | relative_url }}" alt="True versus functional GARCH-estimated volatility surface, side by side" class="entry-figure">
<p class="form-hint">Simulated 25-point intraday grid over 500 trading days. Estimated surface via <code>funcgarch.garch.fit</code> + <code>garch_filter</code>.</p>
<p>
  This mirrors the theoretical picture from the underlying paper's own simulation study. On a functional
  GARCH(1,1) with a low-dimensional true kernel spanned by the fitting basis, the QMLE reduces both standard
  deviation and bias by roughly a factor of 2&ndash;3 relative to the least-squares estimator of Aue,
  Horv&aacute;th &amp; Pellatt (2016), and remains close to its target even when the instrumental functions
  are chosen by a data-driven functional-PCA-style routine rather than fixed in advance. That is empirical
  confirmation that the consistency and asymptotic normality guarantees above hold up at realistic sample
  sizes, not just asymptotically. In the real-data application to the S&amp;P100 index, the fitted volatility
  curves track both the sensitivity of volatility to shocks at the intraday scale and its day-to-day
  persistence. The corresponding one-day-ahead realised-volatility forecasts, obtained by summing the
  predicted variance curve over the intraday grid, track the true realised volatility closely across sample
  periods of varying turbulence, the practical payoff of having a fast enough estimator to actually run this
  recursion on ten years of minutely data.
</p>

</div>

<p><a href="{{ '/projects/' | relative_url }}">&larr; Back to Projects</a></p>
