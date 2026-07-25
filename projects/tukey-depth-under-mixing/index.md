---
layout: default
title: Tukey Depth Under Mixing
permalink: /projects/tukey-depth-under-mixing/
---

<section class="hero">
  <canvas id="market-widget-canvas" class="hero-canvas" aria-label="Live BTC/USDT and ETH/USDT options chain" aria-hidden="true"></canvas>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Project &middot; 2025</div>
    <h1 class="hero-name">Tukey Depth Under Mixing</h1>
    <p class="hero-lede">How statistical depth behaves when observations are dependent rather than independent.</p>
  </div>
</section>

<p class="tagline"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/FunctionalCurves" target="_blank" rel="noopener noreferrer">FunctionalCurves on GitHub</a></p>

<h2 id="overview">Overview</h2>
<p>
  Tukey's halfspace depth ranks how central a point is within a data cloud: the depth of a point \(x_0\) is
  the smallest probability mass of any halfspace whose boundary passes through \(x_0\). Almost all of the
  theory around it assumes independent samples. This project studies how depth estimates behave instead
  when the underlying observations come from dependent, mixing time series, and how fast the empirical
  estimates converge to their true values as the dependence structure and sample size change. It's honestly
  labelled research/exploratory code rather than a finished library &mdash; some pieces are placeholders and
  a couple of functions are marked deprecated in the source, which I've kept rather than tidied away.
</p>

<h2 id="depth-and-direction">Depth and the Minimal Direction</h2>
<p>
  For a unit direction \(u\) and reference point \(x_0\), the halfspace \(H_{x_0,u}\) is the set of points on
  one side of the hyperplane through \(x_0\) with normal \(u\). Tukey depth minimizes \(P(X \in H_{x_0,u})\)
  over all directions \(u\); the direction achieving that minimum is the <em>minimal direction</em>, and it
  identifies which way the data cloud is "thinnest" as seen from \(x_0\).
</p>
<p>
  For a Gaussian model this has a closed form. Whitening \(x_0\) by \(\Sigma^{-1/2}\) and taking the unit
  vector of the whitened point gives the minimal direction in whitened space; mapping it back with
  \(\Sigma^{1/2}\) gives the minimal direction in the original coordinates. Depth then reduces to a 1D tail
  probability of the univariate projection \(Y = u^\top X\):
  \[\text{depth}(x_0) = 1 - \Phi\!\left(\frac{u^\top x_0 - u^\top\mu}{\sqrt{u^\top \Sigma u}}\right).\]
  The same idea gives a second closed-form benchmark for a stationary VAR(1), \(X_t = A_0 + A_1 X_{t-1} +
  \varepsilon_t\): its stationary mean and covariance follow from the standard discrete Lyapunov solution,
  \(\mu = (I-A_1)^{-1}A_0\) and \(\text{vec}(\Sigma) = (I - A_1\otimes A_1)^{-1}\text{vec}(S_0)\), and the
  Gaussian whitening logic above then gives the true depth and direction for the VAR(1) case too.
</p>
<p>
  Empirically, the estimator approximates halfspace membership by angle: it projects sample points onto the
  unit circle around \(x_0\) and, for a candidate direction, counts the fraction of points whose angle
  relative to that direction falls outside a \(\pi/2\) cone. Two ways of choosing candidate directions are
  implemented: scanning a fixed grid of directions uniformly over \([-\pi,\pi]\), or using each observed
  sample's own direction from \(x_0\) as a candidate (since the empirical depth-minimizing direction only
  needs to be checked at directions actually realized by the data).
</p>

<h2 id="dependence">Simulating Dependence</h2>
<p>
  The mixing model used to generate dependent data is a linear process with polynomially decaying weights,
  \(X_n = c_n \sum_k k^{-p}\xi_{n-k}\), where the exponent \(p\) (the <code>mixing_rate</code> parameter)
  controls how quickly old shocks stop mattering: a larger \(p\) means faster-decaying dependence and a
  process closer to independence, while a smaller \(p\) means longer memory. Because the sum is formally
  infinite, the implementation truncates it once the tail contribution falls below a target error, with a
  correction factor (via the Riemann zeta function) rescaling for that truncation so the simulated
  variance still matches the closed-form stationary variance,
  \(\text{Var}(X) = \zeta(2p)\,\text{Cov}(\xi)\), used as the second benchmark case above.
</p>

<h2 id="usage">Usage</h2>
<pre class="code-block" data-lang="python"><code>from Core.MixingModels import MixingLinearModel
from Core.Depth import Estimator, GaussianDepth

process = MixingLinearModel(mixing_rate=1.5)
X = process.simulate(n=500)

result = Estimator(X, X0, method="deg")   # or "point_wise"
depth, direction = result.depth, result.direction
</code></pre>
<p>
  The convergence experiments compare the empirical estimator, run under both candidate-selection methods,
  against the closed-form Gaussian and VAR(1) benchmarks as sample size grows, to see how quickly (and how
  reliably) the empirical depth and direction settle onto their true values as the mixing rate changes.
</p>
<p class="form-hint">See the notebooks in <code>Core/</code>, which derive the Gaussian halfspace-probability formula and the linear-process variance formula alongside the simulation code, for the full VAR(1) and mixing-process walkthroughs.</p>

<p><a href="{{ '/projects/' | relative_url }}">&larr; Back to Projects</a></p>
