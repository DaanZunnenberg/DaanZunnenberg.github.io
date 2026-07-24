---
layout: default
title: Mathematics
permalink: /academic/mathematics/
---

<section class="hero">
  <canvas id="signal-widget-canvas" class="hero-canvas" aria-label="Animated network of connections" aria-hidden="true"></canvas>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Probability &middot; Generic Chaining</div>
    <h1 class="hero-name">Mathematics</h1>
    <p class="hero-lede">Some of my favourite pieces of theory, with full proofs.</p>
  </div>
</section>

<h2 id="introduction">Introduction</h2>

<p class="lede">
What really draws me to math is finding sharp order in high-dimensional randomness. My main focus
centers on concentration of measure and generic chaining theory, working with structural tools like
Bobkov-Ledoux modified logarithmic Sobolev inequalities, Latała-Oleszkiewicz tensorization, and the
Latała-Mendelson bound to extend classical Fernique comparison principles.
</p>

<p class="lede">
Much of this motivation comes directly from the theory developed by Michel Talagrand. His work on
generic chaining and isoperimetric inequalities completely reshaped how we handle stochastic
processes, turning coarse bounds into tight, structural characterizations. Tracing how his geometric
and measure-theoretic insights tame complex random systems is what truly drives my research. The
specific results below show how these ideas shape my current work.
</p>

<p>
Four pieces, building on each other. Generic chaining, explained just below, is the core idea. The
Majorizing Measure Theorem is the sharp version of it for Gaussian processes. The Fundamental
Theorem of Empirical Processes takes the same idea and makes it work for sums of independent
functions. The Bousquet&ndash;Talagrand inequality comes at the same problem from a different angle:
concentration of measure via the entropy method. Full proofs:
</p>

<div class="nav-cards nav-cards-single">
  <a class="nav-card" href="{{ '/academic/mathematics/majorizing-measure-theorem/' | relative_url }}">
    <span class="nav-card-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M2 19h20v2H2v-2Zm2-1c1.7-7.2 3.6-12.5 8-12.5s6.3 5.3 8 12.5H4Z"/></svg>
    </span>
    <span class="nav-card-body">
      <span class="nav-card-title">The Majorizing Measure Theorem</span>
      <span class="nav-card-hint">The sharp, two-sided version of that bound, for Gaussian processes.</span>
    </span>
    <span class="nav-card-arrow" aria-hidden="true">&rarr;</span>
  </a>
  <a class="nav-card" href="{{ '/academic/mathematics/fundamental-theorem-of-empirical-processes/' | relative_url }}">
    <span class="nav-card-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M4 20v-8h3v8H4Zm6.5 0V5h3v15h-3ZM17 20v-5h3v5h-3Z"/></svg>
    </span>
    <span class="nav-card-body">
      <span class="nav-card-title">The Fundamental Theorem of Empirical Processes</span>
      <span class="nav-card-hint">The same idea, extended to sums of independent random functions.</span>
    </span>
    <span class="nav-card-arrow" aria-hidden="true">&rarr;</span>
  </a>
  <a class="nav-card" href="{{ '/academic/mathematics/bousquet-talagrand-inequality/' | relative_url }}">
    <span class="nav-card-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M12 2 2 7l10 5 10-5-10-5Zm0 8-8-4v6l8 4 8-4V6l-8 4Z"/></svg>
    </span>
    <span class="nav-card-body">
      <span class="nav-card-title">The Bousquet&ndash;Talagrand Inequality</span>
      <span class="nav-card-hint">A sharp concentration bound for the supremum of an empirical process, via the entropy method.</span>
    </span>
    <span class="nav-card-arrow" aria-hidden="true">&rarr;</span>
  </a>
</div>

<h2 id="generic-chaining">Generic Chaining</h2>

<p>
The intuition underneath all three results above: bound a process by the shape of its index set.
</p>

<p>
Let \((T,d)\) be a metric space and \((X_t)_{t\in T}\) a process satisfying
</p>

<p>
\[
\forall u>0,\quad \mathsf P(|X_s-X_t|\ge u)\le 2\exp\Big(-\frac{u^2}{2d(s,t)^2}\Big).
\]
</p>

<p>
This inequality holds for any Gaussian process if we set \(d(s,t)^2=\mathsf E(X_s-X_t)^2\). The
central question of the theory is simple to state. How large is \(\mathsf E\sup_{t\in T}X_t\) in
terms of the geometry of \((T,d)\)?
</p>

<p><strong>Dudley's bound.</strong> Dudley gave the classical answer. Cover \(T\) by balls of radius
\(\epsilon\), let \(N(T,d,\epsilon)\) be the smallest number of such balls needed, and you obtain
</p>

<p>
\[
\mathsf E\sup_{t\in T}X_t\le L\int_0^{\mathit{\Delta}(T)}\sqrt{\log N(T,d,\epsilon)}\,d\epsilon.
\]
</p>

<p>
This comes from Kolmogorov's chaining argument. You build a sequence of finite approximations
\(T_n\) of \(T\) with \(\mathrm{card}(T_n)\le N(T,d,2^{-n})\), and control the process along chains
connecting points to their successive approximations. The flaw in this argument is that at each
step \(n\), the fluctuation of the process is bounded uniformly over all chains using the exact
same radius \(2^{-n}\) everywhere.
</p>

<p>
This is a wasteful idea. There is no reason why every part of \(T\) should be measured at the same
scale. Some regions of \(T\) are sparse while others are crowded, and forcing a single covering
radius at each scale discards this structural information. Dudley's bound is not sharp. It fails
not on some pathological counterexample, but on the simplest infinite-dimensional convex bodies,
namely ellipsoids in Hilbert space.
</p>

<p><strong>The generic chaining bound.</strong> The generic chaining eliminates this artificial
restriction. Instead of choosing a single covering number at each scale, we work with an admissible
sequence of partitions \((A_n)_{n\ge0}\) of \(T\). We set \(A_0=\{T\}\) and require
\(\mathrm{card}(A_n)\le N_n=2^{2^n}\) for \(n\ge1\), with each partition refining the previous one.
For any \(t\in T\), let \(A_n(t)\) be the piece of \(A_n\) containing \(t\), and pick a point
\(t_n\) in each piece. Then we have
</p>

<p>
\[
\mathsf E\sup_{t\in T}X_t\le L\sup_{t\in T}\sum_{n\ge0}2^{n/2}\mathit{\Delta}(A_n(t)).
\]
</p>

<p>
This is the generic chaining bound. The proof is no more difficult than Dudley's. It uses the exact
same union bound, but organized so that the step size along a chain depends on where that chain
actually goes. Once you realize this, there is no magic left, only the refusal to throw away
information that the union bound was ready to give us.
</p>

<p><strong>Why it's sharp.</strong> For Gaussian processes, the generic chaining bound gives the
exact order of magnitude. There is a matching lower bound of the same form, meaning the generic
chaining bound and \(\mathsf E\sup_t X_t\) are equivalent up to a universal constant. This is a deep
theorem, and it means that this geometric sum completely captures the behavior of the process.
</p>

<p>
In practice, constructing partitions directly can be cumbersome. We usually work instead with the
functional \(\gamma_2(T,d)\), defined as an infimum over admissible sequences. Functionals provide
the natural language for calculating sizes in concrete examples, while admissible sequences provide
the proper setting for the chaining argument itself. The equivalence between the two is not a
formality. Moving from a functional bound to an actual sequence of partitions requires a greedy
partition scheme, which forms the technical core of the method.
</p>

<p>
The main takeaway is simple. A metric space carries within its multi-scale geometry the complete
answer to how large a Gaussian process indexed by it can be. You do not need extra structural
assumptions. Generic chaining is simply the correct way to write down the union bound so that this
geometry is preserved.
</p>

<p>
New to the topic? Talagrand's <em>Upper and Lower Bounds for Stochastic Processes</em> is the
standard reference for what generic chaining is and why it works. For the full technical detail,
see <a href="{{ '/academic/mathematics/majorizing-measure-theorem/' | relative_url }}">the Majorizing
Measure Theorem</a> and <a href="{{ '/academic/mathematics/fundamental-theorem-of-empirical-processes/' | relative_url }}">the
Fundamental Theorem of Empirical Processes</a> above.
</p>

<p><a href="{{ '/academic/' | relative_url }}">&larr; Back to Academic</a></p>
