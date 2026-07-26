---
layout: default
title: Sieve-M Estimation for Conditional Heteroskedasticity
permalink: /blogposts/sieve-estimation-of-volatility/
---

<section class="hero">
  <img class="hero-img" src="{{ '/images/volatility/quant_finance.jpg' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Blogpost &middot; Volatility Modelling</div>
    <h1 class="hero-name">Sieve-M Estimation for Conditional Heteroskedasticity</h1>
    <p class="hero-lede">Letting a GARCH model learn its own news-impact curve, and finding out why it still loses to APARCH on real data.</p>
  </div>
</section>

<div class="article-body">

<h4>The problem with fixing the shape in advance</h4>

<p>
Every GARCH model makes a choice before it ever sees a single return: the shape of the function that maps yesterday's shock into today's variance. The plain GARCH(1,1) model writes that shape as a symmetric quadratic,
</p>

<p>
\[
\sigma^2(t) = \omega + \beta\varepsilon_{t-1}^2 + \alpha\sigma^2(t-1),
\]
</p>

<p>
for a return process \(x_t=\mu+\varepsilon_t\) with \(\varepsilon_t\sim\sigma(t)\vartheta(\nu)\), the centered student-\(t\) density on \(\nu>2\) degrees of freedom. Squaring \(\varepsilon_{t-1}\) means a large positive shock and a large negative shock of the same size move volatility by exactly the same amount. Financial returns do not behave that way. Volatility tends to react harder to bad news than to good news, which shows up statistically as a non-zero skew in the return distribution. Fit a symmetric model to an asymmetric process and you get a model that is misspecified by construction, no matter how well you estimate its parameters.
</p>

<p>
The standard fix is to build the asymmetry into the model by hand. Writing \(\phi_\lambda(\varepsilon_t) \coloneqq \lambda \mathbb{1}\{\varepsilon_t \leqslant 0\}\varepsilon_t\), one natural correction is
</p>

<p>
\[
\sigma^2(t,\phi_\lambda) = \omega + \beta(\varepsilon_{t-1}-\phi_\lambda(\varepsilon_{t-1}))^2 + \alpha\sigma^2(t-1,\phi_\lambda),
\]
</p>

<p>
which generalises further to the asymmetric power ARCH (APARCH) model,
</p>

<p>
\[
\sigma^\delta(t,\phi_\lambda) = \omega + \beta(|\varepsilon_{t-1}|-\phi_\lambda(\varepsilon_{t-1}))^\delta + \alpha\sigma^\delta(t-1,\phi_\lambda).
\]
</p>

<p>
This works, but only to the extent that the true news-impact curve actually looks like this particular parametric family. \(\lambda\) buys you one extra degree of freedom: an asymmetric tilt. If the real shape is more complicated than a tilted power curve, APARCH is still misspecified, just less obviously so.
</p>

<h4>Letting the shape be unknown</h4>

<p>
The alternative we study is to stop guessing the functional form altogether. Instead of committing to a parametric asymmetry term, write the updating equation as
</p>

<p>
\[
\sigma^2(t,f_0) = \omega + \beta\varepsilon_{t-1}^2 + \alpha\sigma^2(t-1,f_0) + f_0(x_{t-1}),
\]
</p>

<p>
where \(f_0\) is only assumed to be some continuous function on a compact interval \([a,b]\), not a fixed formula. This is a semi-nonparametric model: part of it (\(\omega,\beta,\alpha\)) is a small, finite parameter vector, and part of it (\(f_0\)) is an infinite-dimensional object that has to be estimated from the data itself.

You cannot directly optimise over the space of all continuous functions on a computer, so the practical trick is sieve estimation. Instead of searching all of \(C^r[a,b]\), you search an increasing sequence of finite-dimensional approximating spaces \(\Theta_1 \subseteq \Theta_2 \subseteq \Theta_3 \subseteq \cdots\), called sieves, that get denser and denser in the limit. Concretely, we approximate \(f_0\) with order-\(k\) transformed polynomials,
</p>

<p>
\[
\Omega_{k,\bm{a}}([a,b]) \coloneqq \left\{ \xi_{k,\eta}(\varepsilon;\bm{a}) \coloneqq a_0 + a_1\varepsilon + \sum_{j=2}^{k} a_j \varepsilon^j \phi_\eta(\varepsilon),\ \eta\in B\subsetneq(-\infty,0),\ a_i\in[-M_k,M_k] \right\},
\]
</p>

<p>
where \(\phi_\eta(\varepsilon) = \exp(\eta\varepsilon^2)\) squashes the higher-order terms back into a bounded range so the polynomial doesn't blow up outside the data, and \(M_k\to\infty\) as the sieve grows. By the Weierstrass approximation theorem this class is dense in \(C^r[a,b]\) as \(k\to\infty\), so in the limit it can represent any continuous news-impact curve, not just quadratics or tilted quadratics. The parameters, including the transformed polynomial coefficients, are estimated by maximising the (decomposed) likelihood of the student-\(t\) model under the sequential least squares programming algorithm, subject to the usual stationarity and positivity constraints.
</p>

<p>
The catch is exactly the one you'd expect: more flexibility is not free. A higher order \(k\) always fits the in-sample likelihood at least as well as a lower one, so left unchecked the procedure would overfit noise. We therefore choose \(k\) by the Akaike and Bayesian information criteria, \(\text{AIC}=2|\bm{\theta}|-2\hat{L}\) and \(\text{BIC}=|\bm{\theta}|\log n - 2\hat{L}\), both of which penalise adding coefficients that don't earn their keep in likelihood.
</p>

<h4>Two simulations, two very different verdicts</h4>

<p>
To see what this buys you in practice, we simulated returns from two known news-impact curves and asked whether the transformed polynomial model could recover them better than the plain \(t\)-GARCH(1,1) and \(t\)-APARCH(1,1,1) benchmarks.
</p>

<p>
The first curve is deliberately sharp and asymmetric,
</p>

<p>
\[
\sigma^2(t) = b_0 + b_1\varepsilon_{t-1}\mathbb{1}\{\varepsilon_{t-1}\leqslant 0\} + b_2\varepsilon_{t-1}\mathbb{1}\{\varepsilon_{t-1}>0\} + b_3\sigma^2(t-1),
\]
</p>

<p>
a kinked, non-differentiable function at \(\varepsilon_{t-1}=0\). Here the baseline variance is high (\(b_0=0.9\)), a negative shock pulls variance sharply down (\(b_1=-0.8\)), a positive shock of the same size pushes it up by about half as much (\(b_2=0.4\)), and lagged variance plays no role at all (\(b_3=0\)), so the whole curve is driven purely by the sign and size of the last shock. The second curve is smoother but considerably more convoluted,
</p>

<p>
\[
\sigma^2(t) = b_0 + b_1\varepsilon_{t-1}^2 + b_2\sigma^2(t-1) + b_3\|\sin\varepsilon_{t-1}\|,
\]
</p>

<p>
which folds a sinusoid into the variance equation. We set a modest baseline and squared-shock loading (\(b_0=0.5\), \(b_1=0.2\)), give lagged variance the same weight (\(b_2=0.2\)), and let the sinusoidal term dominate everything else (\(b_3=1.5\)), so the oscillation is the main thing shaping the curve rather than a minor ripple on top of an otherwise ordinary GARCH shape. Neither of these is a curve that \(t\)-GARCH or \(t\)-APARCH can represent exactly by construction.
</p>

<div class="article-figure">
  <img src="{{ '/images/volatility/volatility-smile.png' | relative_url }}?v={{ site.time | date: '%s' }}" alt="Volatility smile from the simulated updating mechanisms: asymmetric process on the left, sinusoidal process on the right, comparing APARCH, GARCH, and the estimated transformed polynomial model against the true simulated curve">
  <figcaption>Volatility smile from the simulated updating mechanisms defined above: the asymmetric process on the left, the sinusoidal process on the right. The blue line is the true simulated curve; the dashed, dotted, and solid black lines are the fitted APARCH, GARCH, and transformed-polynomial models, using the order that achieved the lowest AIC.</figcaption>
</div>

<p>
On the asymmetric process, the picture is mixed. The transformed polynomial model achieves a higher likelihood than either benchmark, and visibly tracks the kink better in the region where 90% of the data mass sits. But the AIC and BIC both favour the simpler \(t\)-GARCH and \(t\)-APARCH models anyway: the extra coefficients needed to trace a sharp, non-smooth kink are expensive, and the penalty terms outweigh the likelihood gain. A sharp, simple asymmetry, it turns out, is exactly the case the parametric APARCH model was built for, and the flexible model can't earn back what it spends fitting it.
</p>

<p>
On the sinusoidal process the result flips completely. Every criterion, likelihood, AIC, and BIC, favours the semi-nonparametric model, and by a wide margin. The intuition is in the shape itself: a sinusoid has an infinite Taylor expansion,
</p>

<p>
\[
h(\varepsilon_t,\sigma^2(t)) = \omega + \beta\varepsilon_t + \alpha\sigma^2(t-1) + \left| \sum_{n=0}^{\infty} \frac{(-1)^n}{\Gamma(2n)}\varepsilon_{t-1}^{2n+1} \right|,
\]
</p>

<p>
an infinite sum of monomial terms that a fixed-form model like APARCH simply has no parameters to represent. Every additional order \(k\) in the transformed polynomial buys real information here, so the likelihood improves faster than the AIC and BIC penalise it. The lesson from both simulations together: flexibility pays for itself only when the truth is complicated enough to need it. If the real news-impact curve is simple, or sharply kinked but otherwise simple, added complexity is dead weight.
</p>

<h4>Checking the distributional assumption before trusting any of this</h4>

<p>
All of the above relies on the student-\(t\) distribution being a reasonable model for the innovations \(\varepsilon_t\). Before applying any of these models to real data, we checked this directly with a quantile-quantile comparison against the S&amp;P 500 return series.
</p>

<div class="article-figure">
  <img src="{{ '/images/volatility/qq-plot.png' | relative_url }}?v={{ site.time | date: '%s' }}" alt="Empirical-theoretic quantile-quantile plots of S&P 500 returns against the student-t distribution at nu equals infinity (Gaussian) and nu equals 5 degrees of freedom">
  <figcaption>Empirical-theoretic quantile-quantile relation of the S&amp;P 500 return series against the student-\(t\) distribution on \(\nu\in\{\infty,5\}\) degrees of freedom. The Gaussian case (\(\nu=\infty\), left) departs from the 45-degree line in the tails; \(\nu=5\) (right) tracks it much more closely.</figcaption>
</div>

<p>
The Gaussian case, \(\nu=\infty\), departs from the diagonal in both tails: the empirical returns have more extreme observations than a normal distribution predicts, the familiar fat-tails problem in financial returns. Tightening \(\nu\) to 5 degrees of freedom, giving the distribution much heavier tails, brings the quantiles back in line. This matters beyond a robustness footnote: every likelihood comparison in this study, and the AIC/BIC penalties built on top of it, are only meaningful if the assumed error distribution is a reasonable description of the data. Getting \(\nu\) right first is a precondition for everything that follows, not an afterthought.
</p>

<h4>What happens on real data</h4>

<p>
We then applied all three models, \(t\)-GARCH, \(t\)-APARCH, and the sieve-estimated transformed polynomial model, to S&amp;P 500 returns, using both a short window (\(n=1000\), 2019&ndash;2023) and a long one (\(n\approx10{,}000\), 1983&ndash;2023). The result echoes the sharp-asymmetry simulation rather than the sinusoidal one: \(t\)-APARCH wins outright on both AIC and BIC at both sample sizes. The higher-order polynomial models do reach a higher raw log-likelihood than APARCH at \(n=1000\), but never enough to overcome the complexity penalty. At \(n\approx10{,}000\), the estimated parameters \((\omega,\beta,\alpha,\nu)\) that are shared across all three models come out remarkably similar, which is itself informative: it suggests the population volatility process for the S&amp;P 500 is not the plain symmetric GARCH model, but something closer to what APARCH already captures with its single asymmetry parameter \(\lambda\).
</p>

<p>
There are two ways to read this. The optimistic one is that the real news-impact curve for a broad equity index is, in fact, close enough to APARCH's tilted-power shape that there's little left on the table for a more flexible model to pick up, once you pay for the extra parameters. The more cautious reading is that volatility models of every stripe, ours included, are sensitive to structural breaks: financial crashes, regime shifts, and other one-off events that a stationary model averages over rather than tracks. A more flexible model has more parameters that can be pulled around by exactly this kind of misspecification, which could just as easily explain why the added complexity doesn't pay off here even if the underlying process is more intricate than APARCH assumes. Disentangling those two explanations would require explicitly testing for structural breaks first, which we leave for future work.
</p>

<h4>Conclusion</h4>

<p>
Sieve-M estimation with transformed polynomials is a mathematically sound way to stop guessing the shape of the news-impact curve and let the data determine it instead, and the theory backs this up: the class of transformed polynomials is dense in the space of continuous functions, and the resulting estimator is consistent under fairly mild conditions. But soundness in theory is not the same as winning in practice. Whether the added flexibility is worth its cost depends entirely on how complicated the true curve actually is relative to the sample size on hand. When the truth is simple or sharply asymmetric, the parametric \(t\)-APARCH model remains very hard to beat, and that is exactly what we find both in simulation and on the S&amp;P 500. When the truth is genuinely intricate, as in the sinusoidal simulation, the flexible model pulls decisively ahead. The honest conclusion is not "nonparametric beats parametric" or the reverse, but that the AIC and BIC are doing real work here: they are the mechanism that tells you, case by case, whether the extra complexity was worth affording.
</p>

</div>

<p><a href="{{ '/blogposts/' | relative_url }}">&larr; Back to Blogposts</a></p>
