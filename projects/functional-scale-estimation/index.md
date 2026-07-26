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
  This project is the estimation and implementation side of an ongoing collaboration with Andr&eacute; Lucas and
  Yicong Lin on observation-driven dynamics for functional location-scale models. The overarching objective of
  the codebase is deliberately narrow: build a <em>fast, numerically stable</em> estimator for a single
  functional GARCH(1,1) recursion, correct enough to be trusted as a benchmark and cheap enough to be re-run
  thousands of times inside a Monte Carlo study or a rolling out-of-sample forecast exercise. It is the direct
  precursor to the <a href="{{ '/projects/functional-volatility-surface-modelling/' | relative_url }}">Functional
  Volatility Surface Modelling</a> project, which reuses the same Bernstein-basis machinery but replaces the
  static GARCH recursion with a score-driven (GAS) update over a B-spline basis.
</p>
<p>
  Computational scalability is a genuine bottleneck here, not a footnote. A functional GARCH model does not
  estimate a handful of scalars the way a classical GARCH(1,1) does &mdash; it estimates <em>operators</em>
  mapping curves to curves, i.e. objects that are in principle infinite-dimensional. Every evaluation of the
  objective function requires rebuilding these operators from the current parameter guess, materialising them
  as dense kernel matrices on the intraday grid, and running the variance recursion forward through the full
  sample of trading days. If the grid has \(N\) intraday points, each recursion step involves an
  \(N\times N\) matrix-vector product, and if the optimizer needs several thousand function evaluations to
  converge, that cost is paid several thousand times over. The whole practical value of the quasi-likelihood
  approach documented below collapses if the per-evaluation cost is not kept small: hence the JIT-compiled
  kernel builders, the vectorised recursion, and the careful separation between the parts of the calculation
  that can be cached across time steps and the parts that genuinely change every day.
</p>

<h2 id="setting">Theoretical Framework</h2>
<p>
  The theoretical foundation for this project is the functional GARCH quasi-maximum-likelihood framework of
  Cerovecki, Francq, H&ouml;rmann &amp; Zako&iuml;an (2018, MPRA Paper No. 83990). We work in the Hilbert space
  \(H = L^2([0,1])\) of square-integrable functions on the unit interval, equipped with inner product
  \(\langle x, y\rangle\) and norm \(\|x\|\). Write \(\mathcal{L}(H)\) for the space of bounded linear
  operators on \(H\): for \(\boldsymbol\alpha \in \mathcal{L}(H)\), \(\boldsymbol\alpha(x)\) denotes the image
  of a curve \(x \in H\) under \(\boldsymbol\alpha\), while \(x(u)\) denotes the pointwise value of \(x\) at
  \(u \in [0,1]\). An operator \(\boldsymbol\alpha\) is a <em>kernel operator</em>,
  \(\boldsymbol\alpha \in \mathcal{K}(H)\), if there is a function \(K_{\boldsymbol\alpha}: [0,1]^2 \to
  \mathbb{R}\) such that \(\boldsymbol\alpha(x)(u) = \int K_{\boldsymbol\alpha}(u,v)x(v)\,dv\); it is
  non-negative, \(\boldsymbol\alpha \in \mathcal{K}^+(H)\), exactly when its kernel is non-negative on
  \([0,1]^2\).
</p>
<p>
  We work with intraday return curves. Write \(y_t(u)\) for the log-return at intraday time \(u \in [0,1]\) on
  trading day \(t\): if \(X_t(u)\) denotes the price of the asset at intraday time \(u\) on day \(t\), then
  \(y_t(u) = \log X_t(u) - \log X_t(u - \tau)\) for some fixed intraday interval \(\tau\), or, alternatively,
  the intraday log-increment \(\tilde y_t(u) = \log X_t(u) - \log X_t(0)\). Each day therefore contributes one
  <em>curve</em> rather than one number, and this is exactly what makes the estimation problem functional
  rather than scalar. A functional GARCH\((p,q)\) process \((y_t)_{t \in \mathbb Z}\) is a stationary,
  non-anticipative solution of
  \[y_t = \sigma_t \eta_t, \qquad
  \sigma_t^2 = \delta + \sum_{i=1}^q \boldsymbol\alpha_i(y_{t-i}^2) + \sum_{j=1}^p \boldsymbol\beta_j(\sigma_{t-j}^2),\]
  where \((\eta_t)_{t\in\mathbb Z}\) is an i.i.d. sequence of innovation curves in \(H\), \(\delta \in
  H_*^+\) is a strictly positive intercept curve, and \(\boldsymbol\alpha_1,\dots,\boldsymbol\alpha_q,
  \boldsymbol\beta_1,\dots,\boldsymbol\beta_p \in \mathcal{K}^+(H)\) are non-negative kernel operators.
  Non-anticipative means \(\sigma_t\) is a measurable function of \((\eta_{t-1}, \eta_{t-2}, \dots)\); under
  \(E\eta_t(u) = 0\) and \(E\eta_t^2(u)=1\), \(\sigma_t^2(u)\) is exactly the conditional variance of
  \(y_t(u)\) given the sigma-field generated by past innovations. This is the functional analogue of a
  classical GARCH recursion: every quantity involved &mdash; the intercept, the ARCH and GARCH coefficients,
  the conditional variance itself &mdash; is now a curve or an operator acting on curves rather than a scalar
  or a number.
</p>
<p>
  Because the volatility \(\sigma_t^2(u)\) can depend on the entire past return curve and not merely on
  \(y_{t-1}(u)\) at the same intraday time, the choice of kernel \(K_{\boldsymbol\alpha}\) controls how shocks
  propagate across intraday time. A constant kernel \(K_{\boldsymbol\alpha}(u,v) \equiv a\) makes
  \(\sigma_t^2(u) = \delta(u) + a\int y_{t-1}^2(v)\,dv\) depend on yesterday's <em>integrated</em> volatility
  only, uniformly across today's intraday time. A localised kernel \(K_{\boldsymbol\alpha}(u,v) =
  a\,\phi(u-v)\) for a density \(\phi\) with mode at zero instead concentrates the dependence of today's
  volatility at time \(u\) on yesterday's volatility <em>around</em> the same time of day, giving a much more
  realistic intraday persistence pattern. This flexibility, together with the shape of \(\delta\), is what the
  estimation procedure below has to recover from data.
</p>
<p>
  Existence of a strictly stationary, non-anticipative solution is governed by a top Lyapunov exponent
  condition. Writing the recursion in state-space form \(\underline{z}_t = \underline{b}_t + \boldsymbol\Psi_t(\underline{z}_{t-1})\)
  with \(\underline{z}_t = (y_t^2,\dots,y_{t-q+1}^2,\sigma_t^2,\dots,\sigma_{t-p+1}^2)'\) collecting the
  \((p+q)\) most recent squared-return and variance curves, and \(\boldsymbol\Psi_t \in \mathcal{L}(H^{p+q})\)
  the companion operator built from \(\boldsymbol\alpha_i,\boldsymbol\beta_j\) and pointwise multiplication by
  \(\eta_t^2\), the top Lyapunov exponent is
  \[\gamma := \lim_{t\to\infty} \frac1t E\bigl(\log\|\boldsymbol\Psi_t\boldsymbol\Psi_{t-1}\cdots\boldsymbol\Psi_1\|\bigr).\]
  Under the mild condition \(E\log^+\|\eta_0^2\|_\infty < \infty\), \(\gamma < 0\) is sufficient for a unique
  strictly stationary and non-anticipative solution to exist; for the GARCH(1,1) case this specialises to
  \(E\log\|(\boldsymbol\alpha\boldsymbol\Upsilon_{t-1}+\boldsymbol\beta)\cdots(\boldsymbol\alpha\boldsymbol\Upsilon_1+\boldsymbol\beta)\| < 0\)
  for some \(t \ge 1\), a condition that is strictly milder than the earlier Hilbert&ndash;Schmidt-norm
  sufficient condition of Aue, Horv&aacute;th &amp; Pellatt (2016). A further moment condition,
  \(\rho(E\boldsymbol\Psi_0) < 1\) on the spectral radius, guarantees a pointwise second-order stationary
  solution, i.e. finite \(E[y_t^2(u)]\) and \(E[\sigma_t^2(u)]\) for every \(u\).
</p>

<h2 id="why-basis-functions">Why Basis Functions</h2>
<p>
  The operators \(\boldsymbol\alpha_i\) and \(\boldsymbol\beta_j\) live in an infinite-dimensional space, so
  they cannot be estimated directly from a finite sample of days, and every operator must keep the variance
  curve positive, since a variance cannot go negative at any point of the day. We solve both problems at once
  by projecting each operator onto a small set of \(M\) linearly independent, non-negative instrumental
  functions \(\varphi_1,\dots,\varphi_M \in H\):
  \[\delta = \sum_{k=1}^M d_k \varphi_k, \qquad
  \boldsymbol\alpha_i = \sum_{k,\ell=1}^M a^{(i)}_{k,\ell}\,\varphi_k \otimes \varphi_\ell, \qquad
  \boldsymbol\beta_j = \sum_{k,\ell=1}^M b^{(j)}_{k,\ell}\,\varphi_k \otimes \varphi_\ell,\]
  where \(x \otimes y := x\langle \cdot, y\rangle\), so \(K_{\boldsymbol\alpha_i}(u,v) = \sum_{k,\ell}
  a_{k,\ell}^{(i)}\varphi_k(u)\varphi_\ell(v)\). This parametrisation is one-to-one in the finite-dimensional
  coefficient vector \(\theta = \mathrm{vec}(d, A_1,\dots,A_q,B_1,\dots,B_p) \in
  \mathbb{R}^{M+(p+q)M^2}\), collapsing an infinite-dimensional estimation problem to one of dimension
  \(M+(p+q)M^2\).
</p>
<p>
  The specific choice of basis used throughout this codebase is the Bernstein polynomial basis. A Bernstein
  basis of order \(M\) is the set of \(M\) polynomials
  \(\varphi_k^M(u) = \binom{M-1}{k-1}u^{k-1}(1-u)^{M-k}\) on \([0,1]\), each non-negative everywhere on that
  interval. If the coefficients \(d_k, a_{k,\ell}^{(i)}, b_{k,\ell}^{(j)}\) are all non-negative, the resulting
  intercept and kernel operators are automatically non-negative, and hence the fitted variance curve is
  automatically non-negative &mdash; positivity is enforced by construction rather than by imposing nonlinear
  constraints on the optimizer. Bernstein polynomials are a special case of B-splines and are the basis used
  in Cerovecki et al.'s own empirical study; the Functional Volatility Surface Modelling project extends the
  same idea to a general B-spline basis for the GAS specification, since the B-spline basis matrix is what
  makes the score-driven update tractable there.
</p>

<h2 id="estimation">Estimation &amp; Methodology</h2>
<p>
  A likelihood cannot be written down directly for a stochastic process taking values in \(H\), so the usual
  quasi-maximum likelihood machinery does not carry over verbatim. Cerovecki et al. define an estimator that
  is <em>inspired</em> by classical GARCH QMLE without being derivable from any actual likelihood: it
  projects the squared process onto the same non-negative instrumental functions \(\varphi_1,\dots,\varphi_M\)
  used to parametrise the operators, and scores the fit with a Gaussian-QMLE-style criterion evaluated on
  those projections. Concretely, the estimator is
  \[\widehat\theta_n := \operatorname*{argmin}_{\theta \in \Theta} \widetilde Q_n(\theta), \qquad
  \widetilde Q_n(\theta) = \frac1n\sum_{t=1}^n \tilde\ell_t(\theta), \qquad
  \tilde\ell_t(\theta) = \sum_{m=1}^M \left\{ \frac{\langle y_t^2, \varphi_m\rangle}{\langle\tilde\sigma_t^2,\varphi_m\rangle}
  + \log\langle\tilde\sigma_t^2,\varphi_m\rangle \right\},\]
  where the empirical volatility curve \(\tilde\sigma_t^2 = \tilde\sigma_t^2(\theta)\) is generated by the
  same recursion as the model, \(\tilde\sigma_t^2 = \delta + \sum_i \boldsymbol\alpha_i(y_{t-i}^2) +
  \sum_j\boldsymbol\beta_j(\tilde\sigma_{t-j}^2)\), started from some fixed initial curves. Because the
  \(\varphi_m\) are strictly positive and the operators are non-negative, every scalar product
  \(\langle\tilde\sigma_t^2,\varphi_m\rangle\) is guaranteed positive, so \(\widetilde Q_n\) is always
  well-defined on the compact parameter set \(\Theta\), and the minimisation is a well-posed finite-dimensional
  problem. Under standard identifiability, moment and invertibility conditions (\(\theta_0 \in \Theta\)
  compact; \(E\|\eta_0^2\|_\infty^\tau<\infty\); no non-random function annihilates \(\langle\eta_t^2,\cdot\rangle\);
  co-primeness of the associated matrix lag polynomials; positivity of \(\delta\) and invertibility of the
  \(\boldsymbol\beta\)-polynomial on the unit disc), the estimator is strongly consistent,
  \(\widehat\theta_n \to \theta_0\) a.s., and asymptotically normal at the standard parametric rate,
  \(\sqrt n(\widehat\theta_n-\theta_0) \xrightarrow{d} \mathcal N(0, J^{-1}IJ^{-1})\), with \(I =
  \mathrm{Var}(\partial \ell_t(\theta_0)/\partial\theta)\) and \(J = E[\partial^2\ell_t(\theta_0)/\partial\theta\partial\theta']\)
  the usual sandwich-form asymptotic variance. As a by-product of this analysis, the same argument delivers
  consistency and asymptotic normality for semi-strong (non-i.i.d. innovation) multivariate CCC-GARCH models,
  since the finite-dimensional projection in (3.2) of Cerovecki et al. is exactly a multivariate CCC-GARCH
  representation of the functional model.
</p>
<p>
  In practice the recursion cannot be evaluated on a continuum, so it is discretised on a uniform intraday
  grid of \(N\) points, and the integral operators become Riemann sums: an inner product
  \(\langle x,\varphi_k\rangle \approx \frac1N\sum_i x(u_i)\varphi_k(u_i)\), and a kernel-operator application
  \(\boldsymbol\alpha(x)(u_i) \approx \frac1N\sum_j K_{\boldsymbol\alpha}(u_i,u_j)x(u_j)\), i.e. a matrix-vector
  product against the \(N\times N\) matrix obtained by evaluating \(K_{\boldsymbol\alpha}\) on the grid.
  Optimisation over \(\theta\) is carried out numerically (SLSQP in the implementation below), with simple
  non-negativity box constraints on the Bernstein coefficients standing in for the abstract non-negativity
  requirement \(\boldsymbol\alpha_i,\boldsymbol\beta_j \in \mathcal K^+(H)\).
</p>

<h2 id="code">Code Structure &amp; Walkthrough</h2>
<p>
  The Bernstein basis function itself is JIT-compiled with Numba, since it is called \(O(M)\) times per grid
  point on every single objective-function evaluation. Numba cannot call SciPy's <code>comb</code>, so the
  binomial coefficient is hand-rolled from factorials &mdash; a small but deliberate trade for speed at the
  innermost loop of the estimator, directly implementing \(\varphi_k^M(u) = \binom{M-1}{k-1}u^{k-1}(1-u)^{M-k}\)
  from the theory above:
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
  The intercept curve \(\delta = \sum_k d_k\varphi_k^M\) and the kernel operators
  \(K_{\boldsymbol\alpha}(u,v) = \sum_{k,\ell} a_{k,\ell}\varphi_k^M(u)\varphi_\ell^M(v)\) are then built by
  accumulating over the basis. <code>delta</code> is a straightforward weighted sum; <code>kernel_operator</code>
  materialises the full dense \(N\times N\) kernel matrix as a sum of \(M^2\) rank-one outer products of
  Bernstein column vectors, which is exactly the double sum in the theoretical parametrisation of
  \(\boldsymbol\alpha_i,\boldsymbol\beta_j\) above:
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
  With <code>delta</code> and <code>kernel_operator</code> in hand, <code>_build_operators</code> unpacks a
  flat parameter vector <code>params = [delta_coefs (M) | alpha_coefs (M²) | beta_coefs (M²)]</code> into the
  pre-evaluated grid-space objects &mdash; <code>delta_hat</code> of shape <code>(n_grid,)</code> and
  <code>alpha_hat</code>, <code>beta_hat</code> of shape <code>(n_grid, n_grid)</code> &mdash; exactly once per
  objective-function call, so that the day-by-day loop that follows never has to re-touch the Bernstein basis
  functions. The recursion itself is the discretised Riemann-sum version of
  \(\sigma_t^2 = \delta + \boldsymbol\alpha(y_{t-1}^2) + \boldsymbol\beta(\sigma_{t-1}^2)\), where each integral
  becomes an elementwise-weighted matrix-vector product divided by the grid size:
</p>
<pre class="code-block" data-lang="python"><code>for t in range(1, n_days):
    variance = (
        delta_hat
        + ((alpha_hat * returns[:, t - 1] ** 2) @ np.ones(n_grid_obs)
        +  (beta_hat  * variance)               @ np.ones(n_grid_obs)) / n_grid_obs
    )
    total_loss += loss_fn(returns[:, t], variance, n_basis, grid)</code></pre>
<p>
  The loss accumulated at each step, <code>loss_func</code>, is a Bernstein-projected mean squared error
  between the squared returns and the fitted variance, summed across the \(M\) basis functions:
  \(L_t = \sum_{k=1}^M \frac1N\sum_i \bigl[(y_t^2(u_i)-\sigma_t^2(u_i))\varphi_k^M(u_i)\bigr]^2\). This is a
  deliberately cheaper stand-in for the formal QMLE criterion \(\tilde\ell_t(\theta)\) defined above &mdash; a
  simplification that trades some statistical efficiency for a criterion that is fast to evaluate and easy to
  differentiate numerically, which matters when the optimizer needs thousands of evaluations to converge.
  <code>garch_estimator</code> wraps the whole day-loop and is what gets handed to
  <code>scipy.optimize.minimize</code>; <code>garch_filter</code> runs the identical recursion but returns the
  full <code>(n_grid, n_days)</code> variance surface instead of a scalar loss, and is used once fitting is
  complete to recover \(\widehat\sigma_t^2(\cdot)\) for every day in the sample:
</p>
<pre class="code-block" data-lang="python"><code>theta_hat = fit(
    returns, initial_variance=np.ones(n_grid), n_grid=n_grid, n_basis=M,
    x0=theta0, bounds=[(-.99, .99)] * (M + 2 * M ** 2), method='SLSQP',
).x

sigma2_hat = garch_filter(
    returns, n_grid=n_grid, params=theta_hat, n_basis=M,
    initial_variance=np.ones(n_grid),
)</code></pre>
<p class="form-hint">Non-negative Bernstein coefficients guarantee a positive volatility surface directly, without constrained optimization over the full operator; <code>fit</code> is a thin wrapper around <code>scipy.optimize.minimize</code> that returns a <code>ResultContainer</code> exposing the usual <code>OptimizeResult</code> fields.</p>

<h2 id="results">Results &amp; Empirical Discussion</h2>
<p>
  Applying this framework to simulated intraday data generated from a known functional GARCH(1,1) recursion
  (via <code>funcgarch.simulate.simulate</code>, which reuses the exact same Bernstein operator builders as
  the estimator, so any parameter vector valid for <code>fit</code> is also valid as a data-generating
  process), and estimating with Bernstein-basis QMLE at <em>M</em>&nbsp;=&nbsp;3 basis functions, gives the
  fitted volatility surface shown below. The estimation recovers the main structure of the true process,
  while the remaining day-to-day roughness reflects finite-sample effects and the limited flexibility of the
  chosen basis:
</p>
<img src="{{ '/assets/img/garch_vol_surface.png' | relative_url }}" alt="True versus functional GARCH-estimated volatility surface, side by side" class="entry-figure">
<p class="form-hint">Simulated 25-point intraday grid over 500 trading days; estimated surface via <code>funcgarch.garch.fit</code> + <code>garch_filter</code>.</p>
<p>
  This mirrors the theoretical picture from the underlying paper's own simulation study: on a functional
  GARCH(1,1) with a low-dimensional true kernel spanned by the fitting basis, the QMLE reduces both standard
  deviation and bias by roughly a factor of 2&ndash;3 relative to the least-squares estimator of Aue,
  Horv&aacute;th &amp; Pellatt (2016), and remains close to its target even when the instrumental functions
  are chosen by the data-driven functional-PCA-style routine rather than fixed in advance &mdash; empirical
  confirmation that the consistency and asymptotic normality guarantees derived above are not merely
  asymptotic curiosities but hold up at realistic sample sizes. In the real-data application to the S&amp;P100
  index, the fitted volatility curves visibly track both the sensitivity of volatility to shocks at the
  intraday scale and its day-to-day persistence, and the corresponding one-day-ahead realised-volatility
  forecasts, obtained by summing the predicted variance curve over the intraday grid, track the true realised
  volatility closely across sample periods of varying turbulence &mdash; the practical payoff of having a fast
  enough estimator to actually run this recursion on ten years of minutely data.
</p>

</div>

<p><a href="{{ '/projects/' | relative_url }}">&larr; Back to Projects</a></p>
