---
layout: default
title: Research & Publications
permalink: /research/
---

<section class="hero">
  <canvas id="trade-process-canvas" class="hero-canvas" aria-label="A live partial-sum path built from Binance BTC/USDT trade arrivals, colored green for buy-side and red for sell-side ticks, with a running supremum readout" aria-hidden="true"></canvas>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Probability &middot; Empirical Processes</div>
    <h1 class="hero-name">Research &amp; Publications<span class="cursor">_</span></h1>
    <p class="hero-lede">Generic chaining, majorizing measures, and weak convergence for dependent processes.</p>
  </div>
</section>

<p class="tagline">Probability theory &middot; empirical processes &middot; statistical estimation under dependence.</p>

<p class="lede">
I'm a PhD researcher in mathematics at Leiden University. Broadly, I work in empirical process theory: the
machinery used to control suprema of stochastic processes, and how it extends to weak convergence and
estimation once the independence assumption is dropped.
</p>

<h2>Research Interests</h2>
<div class="entry">
  <ul>
    <li>Decomposition theorems, generic chaining, and majorizing measures for controlling suprema of stochastic processes.</li>
    <li>Weak convergence and Donsker&ndash;Skorokhod-type results for processes satisfying absolute regularity (&beta;-mixing).</li>
    <li>Depth functions and robust statistics under dependence, e.g. the Tukey depth for time-dependent data.</li>
    <li>Functional time series: stationarity testing and functional GARCH/GAS models for volatility surfaces.</li>
  </ul>
</div>

<h2>Current Work</h2>
<div class="entry">
  <div class="entry-head">
    <h3>PhD Research &middot; Leiden University</h3>
    <span class="entry-date">2024 &ndash; present</span>
  </div>
  <p>
    My current research concerns decomposition theorems, generic chaining, and majorizing measures as tools
    for controlling suprema of stochastic processes, applied to weak convergence and
    Donsker&ndash;Skorokhod-type results for processes satisfying absolute regularity (&beta;-mixing). Alongside
    this, I work with Alexander D&uuml;rre on the Tukey depth under dependence, forthcoming in <em>Bernoulli</em>.
  </p>
  <p>I organize and lead a weekly graduate seminar on weak convergence and empirical process theory.</p>

  <div class="readme-toggle is-open">
    <button type="button" class="readme-summary" aria-expanded="true">
      <span class="label-open">+ What is generic chaining?</span><span class="label-close">&minus; Hide the math</span>
    </button>
    <div class="readme-collapse">
      <div class="readme">
        <h4>Admissible sequences and the \(\gamma_2\) functional</h4>
        <p>
          Generic chaining, in Talagrand's formulation, works with partitions rather than nested sets. An
          admissible sequence is a sequence of partitions \((A_n)_{n \ge 0}\) of \(T\), each refining the one
          before, with \(\operatorname{card}(A_0) = 1\) and \(\operatorname{card}(A_n) \le N_n = 2^{2^n}\) for
          \(n \ge 1\). Write \(A_n(t)\) for the piece of \(A_n\) containing \(t\), and \(\mathit{\Delta}(\cdot)\)
          for diameter under \(d\). The \(\gamma_2\) functional is the best such sequence can do.
        </p>
        \[
        \gamma_2(T,d) = \inf_{(A_n)} \; \sup_{t \in T} \; \sum_{n=0}^{\infty} 2^{n/2}\, \mathit{\Delta}(A_n(t))
        \]
        <h4>The majorizing measure theorem</h4>
        <p>
          For a centered Gaussian process \((X_t)_{t \in T}\) under its canonical metric
          \(d(s,t) = (\mathbb{E}|X_s - X_t|^2)^{1/2}\), the chaining construction only ever gives an upper bound
          on the expected supremum, which is Dudley's entropy bound in disguise. Talagrand's majorizing measure
          theorem is the surprise: \(\gamma_2\) is also a lower bound, so it pins down \(\mathbb{E}\sup_t X_t\)
          exactly, up to a universal constant \(L\) that depends on neither \(T\) nor \(d\).
        </p>
        \[
        \frac{1}{L}\,\gamma_2(T,d) \;\le\; \mathbb{E} \sup_{t \in T} X_t \;\le\; L\,\gamma_2(T,d)
        \]
        <p>
          Talagrand writes results like this as two one-sided inequalities, \(A \le LB\) and \(B \le LA\), with
          \(A = \mathbb{E}\sup_t X_t\) and \(B = \gamma_2(T,d)\). Each side controls the other, so the two
          quantities are equivalent rather than just one bounding the other.
        </p>
        <h4>Why \(\gamma_2\) is canonical</h4>
        <p>
          The lower bound above means \(\gamma_2(T,d)\) isn't just an artifact of the particular admissible
          sequence used to build it — it can be recovered directly from the geometry of \((T,d)\), through
          separated sets rather than partitions. Call \(A \subset T\) \((a,r)\)-separated if \(d(s,t) \ge r\)
          for all distinct \(s,t \in A\) and \(\operatorname{card}(A) \ge \exp(a^2)\), and let \(F(T,d)\) be the
          largest value of \(\sum_n 2^{n/2} r_n\) achievable over a nested chain of \((2^n, r_n)\)-separated
          sets \(A_0 \subset A_1 \subset \cdots \subset T\).
        </p>
        <p>
          Talagrand's growth-functional argument shows \(F(T,d)\) and \(\gamma_2(T,d)\) agree up to a universal
          constant. So \(\gamma_2\) is pinned down entirely by how many far-apart points \(T\) contains at every
          scale, a property of the metric space itself rather than of any chaining construction, which is what
          makes it canonical.
        </p>
        <p>
          This is the toolkit I'm extending, to processes that are only \(\beta\)-mixing rather than
          independent, where the chaining argument has to absorb a mixing-rate correction at every scale
          \(n\) instead of relying on independence between increments.
        </p>
      </div>
    </div>
  </div>
</div>

<h2>Past Research</h2>

<div class="entry">
  <div class="entry-head">
    <h3>Research Assistant &middot; VU Econometrics and Data Science</h3>
    <span class="entry-date">January 2024 &ndash; June 2024</span>
  </div>
  <ul>
    <li>Designed likelihood-based estimation algorithms for functional scale models, using vectorized and parallel computation to keep them fast at scale.</li>
    <li>Reduced execution time of large-scale Monte Carlo simulations by 92.3% on average using <code>numpy</code> vectorization and parallel computing.</li>
  </ul>
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
    The MATLAB estimation script itself (<a href="https://github.com/DaanZunnenberg/FunctionalScaleMod/tree/main/MATLAB_YC" target="_blank" rel="noopener noreferrer">MATLAB_YC on GitHub</a>)
    fits the GAS recursion by reparameterized maximum likelihood, using a B-spline basis for the volatility surface
    and a multivariate Student-<em>t</em> observation density with an Ornstein&ndash;Uhlenbeck covariance kernel:
  </p>
  <pre class="code-block" data-lang="matlab"><code>dK = 7;
Bsplinebasis = create_bspline_basis([0, 1], dK, 4);  % 7 B-spline basis functions of order 4

% B-spline basis functions: full matrix
vtau = 0:1/(size(vyTau,1)-1):1; vtau = vtau';
n = length(vtau);
mBsplinesSparseMat = eval_basis(vtau, Bsplinebasis);

%---------- FunGAS: update principal component scores ----------%
vb0 = ones(dK+1,1);                                                        % initial principal component scores
vtheta0 = [2.1; 0.001; ones(dK+1,1); -0.5*ones(dK+1,1); 0.1*ones(dK+1,1)]; % initial parameters
LB = [1.05; 0.00001; -5*ones(dK+1,1); -2*ones(dK+1,1); -0.9*ones(dK+1,1)]; % lower bound
UB = [50; 1; 15*ones(dK+1,1); 2*ones(dK+1,1); 0.9*ones(dK+1,1)];          % upper bound

% vthetaHat contains (in order): degree of freedom, dependence parameter,
% omega vector, diagonal elements of mB, diagonal elements of mA
fGAS_likelihood = @(vtheta) -construct_likelihood_repara(vyTau,vb0,dK,n,mBsplinesSparseMat,vtau,vtheta);
options = optimoptions('fmincon','MaxFunctionEvaluations',1E4);
vthetaHat = fmincon(fGAS_likelihood,vtheta0,[],[],[],[],LB,UB,[],options);
</code></pre>
  <p>
    The log-likelihood itself recurses the score-driven B-spline coefficients forward and evaluates the
    Student-<em>t</em> density at each step, using a numerically stable log-determinant (LU-based) rather than
    <code>log(det(&middot;))</code> directly to avoid overflow on the covariance kernel:
  </p>
  <pre class="code-block" data-lang="matlab"><code>function likelihood = construct_likelihood_repara(mY,vb1,dK,n,mBsplinesSparseMat,vtau,vtheta)
T = size(mY,2);
dnu = vtheta(1);     % degree of freedom parameter
ddelta = vtheta(2);  % dependence parameter
vomega = vtheta(3:dK+3);   % level parameter
mB = vtheta(dK+4:2*dK+4);  % scale parameter
mA = vtheta(end-dK:end);   % score parameter
mLambdaOU_delta = exp(-pdist2(vtau,vtau,'fasteuclidean')/ddelta); % OU covariance kernel

mBsplinesMat = full(mBsplinesSparseMat);
mBsplinesMat = [ones(n,1) mBsplinesMat];

likelihood = 0;
vb_now = vb1;
vy_now = mY(:,1);
Temp1 = (dnu + n)/(2*dnu);
for id = 2:T
    vsigma_now = mBsplinesMat*vb_now;

    Temp2 = mLambdaOU_delta\(vy_now./exp(vsigma_now/2));
    Temp3 = vy_now.*mBsplinesMat./exp(vsigma_now/2);
    Temp4 = 1 + (vy_now./exp(vsigma_now/2))'*Temp2/dnu;

    likelihood = likelihood + (-0.5*logdet(exp(vsigma_now).*mLambdaOU_delta) ...
        - (dnu+n)/2*log(Temp4));

    density_score = -0.5*sum(mBsplinesMat,1)' + Temp1*Temp4^(-1)*Temp3'*Temp2;
    vb_now = vomega + mB.*vb_now + mA.*density_score;
    vy_now = mY(:,id);
end
likelihood = likelihood + T*(gammaln((dnu+n)/2) - gammaln(dnu/2) - n/2*log(pi*dnu));
end
</code></pre>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>MSc Thesis &middot; Functional stationarity testing</h3>
    <span class="entry-date">2024</span>
  </div>
  <p>
    Developed a functional stationarity test for multidimensional diffusion processes, implementing and
    packaging the underlying mathematical framework as an open-source library.
  </p>
  <div class="tags"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/MultivariateHamrickTaqqu" target="_blank" rel="noopener noreferrer">FunctionalMH on GitHub</a></div>
</div>

<h2>Publications</h2>

<div class="entry">
  <div class="entry-head">
    <h3>The Tukey depth under dependence</h3>
    <span class="entry-date">2026 &middot; forthcoming</span>
  </div>
  <div class="entry-org">Zunnenberg, D. &amp; D&uuml;rre, A. &middot; <em>Bernoulli</em></div>
  <div class="tags">
    Forthcoming &middot; Bernoulli Society for Mathematical Statistics and Probability
    &middot; <span class="supplement-note">includes online supplement (proofs &amp; auxiliary results)</span>
  </div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Absolute regularity and maximal moment inequalities</h3>
    <span class="entry-date">2026 &middot; in preparation</span>
  </div>
  <div class="entry-org">Zunnenberg, D. &amp; D&uuml;rre, A. &middot; Unpublished manuscript</div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Functional location-scale models with robust observation-driven dynamics</h3>
    <span class="entry-date">2025</span>
  </div>
  <div class="entry-org">Lin, Y. &amp; Lucas, A. &middot; Tinbergen Institute Discussion Paper</div>
  <div class="tags">Research assistantship contribution</div>
</div>

<h3>Software</h3>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://github.com/DaanZunnenberg/MultivariateHamrickTaqqu" target="_blank" rel="noopener noreferrer">MultivariateHamrickTaqqu</a></h3>
    <span class="entry-date">2024</span>
  </div>
  <p>Open-source implementation of a functional stationarity test for multidimensional diffusion processes, developed for my MSc thesis.</p>
  <div class="tags"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/MultivariateHamrickTaqqu" target="_blank" rel="noopener noreferrer">github.com/DaanZunnenberg/MultivariateHamrickTaqqu</a></div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://github.com/DaanZunnenberg/FunctionalScale" target="_blank" rel="noopener noreferrer">FunctionalScale</a></h3>
    <span class="entry-date">2024 &ndash; present</span>
  </div>
  <p>Estimation library for functional GARCH/GAS models of time-varying intraday volatility surfaces, using B-splines and <code>numba</code> JIT compilation.</p>
  <div class="tags"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/FunctionalScale" target="_blank" rel="noopener noreferrer">github.com/DaanZunnenberg/FunctionalScale</a></div>
</div>

<p>
  A full, up-to-date list is also maintained on
  <a href="https://scholar.google.com/citations?user=JLg2KjEAAAAJ" target="_blank" rel="noopener noreferrer">Google Scholar</a>.
  For collaboration proposals or seminar invitations, <a href="{{ '/contact/research/' | relative_url }}">get in touch</a>.
</p>
