---
layout: default
title: Proof of the Majorizing Measure Theorem
permalink: /mathematics/majorizing-measure-theorem/
---

<h1>The Majorizing Measure Theorem</h1>
<p class="tagline">My favorite proof: Talagrand's two-sided bound on the supremum of a Gaussian process.</p>

<p class="lede">
Let \((X_t)_{t \in T}\) be a centered Gaussian process with canonical metric
\(d(s,t) = (\mathbb{E}|X_s - X_t|^2)^{1/2}\). The theorem says the expected supremum of the process is
pinned down, up to a universal constant, by a purely geometric quantity of \((T,d)\): the \(\gamma_2\)
functional. Below is the proof of both directions, upper and lower.
</p>

<h2>Setup</h2>
<div class="entry">
  <p>
    An <em>admissible sequence</em> is a sequence of partitions \((A_n)_{n \ge 0}\) of \(T\), each refining
    the last, with \(\operatorname{card}(A_0) = 1\) and \(\operatorname{card}(A_n) \le N_n = 2^{2^n}\) for
    \(n \ge 1\). For \(t \in T\), write \(A_n(t)\) for the unique piece of \(A_n\) containing \(t\), and
    \(\mathit{\Delta}(A)\) for the \(d\)-diameter of \(A \subset T\). Define
  </p>
  \[
  \gamma_2(T,d) = \inf_{(A_n)} \; \sup_{t \in T} \; \sum_{n=0}^{\infty} 2^{n/2}\, \mathit{\Delta}(A_n(t)),
  \]
  <p>the infimum taken over all admissible sequences. The theorem states there is a universal constant \(L\), not depending on \((T,d)\), with</p>
  \[
  \frac{1}{L}\,\gamma_2(T,d) \;\le\; \mathbb{E} \sup_{t \in T} X_t \;\le\; L\,\gamma_2(T,d).
  \]
</div>

<h2>Upper bound: chaining</h2>
<div class="entry">
  <p>
    Fix an admissible sequence \((A_n)\) and a basepoint \(t_0 \in T\). For each \(t\), telescope
    \(X_t - X_{t_0}\) along the chain of partitions:
  </p>
  \[
  X_t - X_{t_0} = \sum_{n \ge 1} \big(X_{\pi_n(t)} - X_{\pi_{n-1}(t)}\big),
  \]
  <p>
    where \(\pi_n(t)\) is an arbitrarily chosen point of \(A_n(t)\) (with \(\pi_0(t) = t_0\)). Each increment
    \(X_{\pi_n(t)} - X_{\pi_{n-1}(t)}\) is Gaussian with variance at most \(\mathit{\Delta}(A_{n-1}(t))^2\),
    since \(\pi_n(t)\) and \(\pi_{n-1}(t)\) both lie in \(A_{n-1}(t)\). There are at most \(N_n \cdot N_{n-1}
    \le N_n^2 = 2^{2^{n+1}}\) distinct such increments across all of \(T\) (one choice of \(\pi_n(t)\) per
    pair of adjacent partition elements), so a union bound over Gaussian tail estimates gives, for each
    \(n\),
  </p>
  \[
  \mathbb{P}\Big(\big|X_{\pi_n(t)} - X_{\pi_{n-1}(t)}\big| \ge u\, 2^{n/2}\, \mathit{\Delta}(A_{n-1}(t))
  \text{ for some } t\Big) \le 2 \exp\!\big(2^{n+1}\big)\exp\!\left(-\frac{u^2 2^n}{2}\right),
  \]
  <p>
    which is summable in \(n\) once \(u\) exceeds a fixed constant. Summing the (now uniformly controlled)
    increments over \(n\) and taking a union bound over the whole chain shows that, with the constant
    absorbing the union-bound overhead,
  </p>
  \[
  \mathbb{E}\, \sup_{t \in T} \big(X_t - X_{t_0}\big) \le L_1 \sum_{n \ge 0} 2^{n/2}\, \mathit{\Delta}(A_n(t))
  \quad \text{for every } t,
  \]
  <p>
    and since this holds simultaneously for the sequence achieving (close to) the infimum defining
    \(\gamma_2\), \(\mathbb{E}\sup_t X_t \le L_1\, \gamma_2(T,d)\). This direction is exactly Dudley's
    entropy bound, restated with partitions instead of covering numbers. It needs no Gaussianity
    beyond sub-Gaussian increments, and it is comparatively easy, using a union bound over an explicit, countable
    chain of comparisons.
  </p>
</div>

<h2>Lower bound: the hard direction</h2>
<div class="entry">
  <p>
    The converse, that \(\gamma_2\) is also a <em>lower</em> bound on \(\mathbb{E}\sup_t X_t\) and not
    just an artifact of the chaining proof technique, is Talagrand's contribution, and it is what
    makes the theorem a genuine equivalence rather than a one-sided estimate. The proof works with
    separated sets rather than partitions. Call \(A \subset T\) \((a,r)\)-separated if \(d(s,t) \ge r\) for
    all distinct \(s, t \in A\) and \(\operatorname{card}(A) \ge \exp(a^2)\). Define the growth functional
  </p>
  \[
  F(T,d) = \sup \sum_{n \ge 0} 2^{n/2}\, r_n,
  \]
  <p>
    the supremum over all increasing chains of sets \(A_0 \subset A_1 \subset \cdots \subset T\) with
    \(A_n\) being \((2^{n/2}, r_n)\)-separated. The heart of the argument is Talagrand's <em>Gaussian
    comparison / Sudakov-type minoration</em>, iterated along the chain. If \(A\) is \((a,r)\)-separated
    then a Slepian-type comparison lets you bound the expected supremum over the well-separated points of
    \(A\) from below by
  </p>
  \[
  \mathbb{E} \max_{t \in A} X_t \ge c\, a\, r
  \]
  <p>
    for a universal \(c > 0\), because \(\operatorname{card}(A) \ge \exp(a^2)\) points pairwise at distance
    \(\ge r\) behave, in the relevant Gaussian sense, enough like \(\exp(a^2)\) independent \(N(0,r^2)\)
    variables that their maximum is of order \(a r\), the same order as the maximum of that many
    i.i.d. Gaussians. Applying this at every scale \(n\) along the separated chain and summing, rather than
    bounding a single scale in isolation, produces
  </p>
  \[
  \mathbb{E} \sup_{t \in T} X_t \ge c' \sum_{n \ge 0} 2^{n/2}\, r_n
  \]
  <p>
    for the specific chain achieving (close to) \(F(T,d)\), and therefore \(\mathbb{E}\sup_t X_t \ge c'\,
    F(T,d)\). The remaining step, a purely metric-geometry argument with no probability left in it,
    is Talagrand's growth-functional comparison, showing \(F(T,d)\) and \(\gamma_2(T,d)\) agree up
    to a universal constant, since any admissible sequence of partitions can be converted into a comparable chain
    of separated sets and vice versa, because a partition piece of small diameter at scale \(n\) forces its
    points to be poorly separated at that same scale, and conversely a well-separated set at scale \(n\)
    cannot all live inside one small partition piece. Combining the two inequalities gives
  </p>
  \[
  c'' \, \gamma_2(T,d) \;\le\; F(T,d) \quad \text{and hence} \quad c'\,c'' \, \gamma_2(T,d) \;\le\; \mathbb{E} \sup_{t \in T} X_t.
  \]
  <p>
    which, together with the chaining upper bound above, closes the theorem.
  </p>
</div>

<h2>Why this is the one</h2>
<div class="entry">
  <p>
    I like this proof for the shape of the argument, not just the result. The upper bound is routine, a
    union bound done carefully. The lower bound is the hard part: you have to rule out the possibility that
    some other proof technique beats generic chaining on a Gaussian process, and show instead that the
    geometry <em>is</em> the obstacle, not just a byproduct of how the upper bound happened to be proved.
    That makes the theorem genuinely two-sided, one of the few results in empirical process theory where
    "tight because we can also prove a matching lower bound" is backed by an actual construction rather than
    asserted. It's also the toolkit I'm extending on the <a href="{{ '/research/' | relative_url }}">main
    research page</a>, applied to processes that are only \(\beta\)-mixing rather than independent, where the
    chaining sum has to absorb a mixing-rate correction term at every scale \(n\) instead of relying on
    independence between the increments.
  </p>
</div>

<p><a href="{{ '/mathematics/' | relative_url }}">&larr; Back to Mathematics</a></p>
