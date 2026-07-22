---
layout: default
title: Mathematics
permalink: /mathematics/
---

<section class="hero">
  <img src="{{ '/images/TalagrandOil.png' | relative_url }}" alt="" class="hero-img" aria-hidden="true">
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Probability &middot; Generic Chaining</div>
    <h1 class="hero-name">Mathematics<span class="cursor">_</span></h1>
    <p class="hero-lede">Some of my favourite pieces of theory, with full proofs.</p>
  </div>
</section>

<h2 id="generic-chaining">Generic Chaining</h2>

<p>
Let \((T,d)\) be a metric space and \((X_t)_{t\in T}\) a process satisfying
</p>

<p>
\[
\forall u>0,\quad \mathsf P(|X_s-X_t|\ge u)\le 2\exp\Big(-\frac{u^2}{2d(s,t)^2}\Big).
\]
</p>

<p>
This inequality holds for any Gaussian process if we set \(d(s,t)^2=\mathsf E(X_s-X_t)^2\). The central question of the theory is simple to state. How large is \(\mathsf E\sup_{t\in T}X_t\) in terms of the geometry of \((T,d)\)?
</p>

<p>
Dudley gave the classical answer. Cover \(T\) by balls of radius \(\epsilon\), let \(N(T,d,\epsilon)\) be the smallest number of such balls needed, and you obtain
</p>

<p>
\[
\mathsf E\sup_{t\in T}X_t\le L\int_0^{\mathit{\Delta}(T)}\sqrt{\log N(T,d,\epsilon)}\,d\epsilon.
\]
</p>

<p>
This comes from Kolmogorov's chaining argument. You build a sequence of finite approximations \(T_n\) of \(T\) with \(\mathrm{card}(T_n)\le N(T,d,2^{-n})\), and control the process along chains connecting points to their successive approximations. The flaw in this argument is that at each step \(n\), the fluctuation of the process is bounded uniformly over all chains using the exact same radius \(2^{-n}\) everywhere.
</p>

<p>
This is a wasteful idea. There is no reason why every part of \(T\) should be measured at the same scale. Some regions of \(T\) are sparse while others are crowded, and forcing a single covering radius at each scale discards this structural information. Dudley's bound is not sharp. It fails not on some pathological counterexample, but on the simplest infinite-dimensional convex bodies, namely ellipsoids in Hilbert space.
</p>

<p>
The generic chaining eliminates this artificial restriction. Instead of choosing a single covering number at each scale, we work with an admissible sequence of partitions \((A_n)_{n\ge0}\) of \(T\). We set \(A_0=\{T\}\) and require \(\mathrm{card}(A_n)\le N_n=2^{2^n}\) for \(n\ge1\), with each partition refining the previous one. For any \(t\in T\), let \(A_n(t)\) be the piece of \(A_n\) containing \(t\), and pick a point \(t_n\) in each piece. Then we have
</p>

<p>
\[
\mathsf E\sup_{t\in T}X_t\le L\sup_{t\in T}\sum_{n\ge0}2^{n/2}d(t,t_n).
\]
</p>

<p>
This is the generic chaining bound. The proof is no more difficult than Dudley's. It uses the exact same union bound, but organized so that the step size along a chain depends on where that chain actually goes. Once you realize this, there is no magic left, only the refusal to throw away information that the union bound was ready to give us.
</p>

<p>
Why is this bound sharp? For Gaussian processes, it gives the exact order of magnitude. There is a matching lower bound of the same form, meaning the generic chaining bound and \(\mathsf E\sup_t X_t\) are equivalent up to a universal constant. This is a deep theorem, and it means that this geometric sum completely captures the behavior of the process.
</p>

<p>
In practice, constructing partitions directly can be cumbersome. We usually work instead with the functional \(\gamma_2(T,d)\), defined as an infimum over admissible sequences. Functionals provide the natural language for calculating sizes in concrete examples, while admissible sequences provide the proper setting for the chaining argument itself. The equivalence between the two is not a formality. Moving from a functional bound to an actual sequence of partitions requires a greedy partition scheme, which forms the technical core of the method.
</p>

<p>
The main takeaway is simple. A metric space carries within its multi-scale geometry the complete answer to how large a Gaussian process indexed by it can be. You do not need extra structural assumptions. Generic chaining is simply the correct way to write down the union bound so that this geometry is preserved.
</p>

<p>
Below are the results from this toolkit that I keep coming back to, worked through with full proofs.
</p>

<div class="nav-cards">
  <a class="nav-card" href="{{ '/mathematics/majorizing-measure-theorem/' | relative_url }}">
    <span class="nav-card-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M4 20 10 8l4 6 3-4 3 10H4Z"/></svg>
    </span>
    <span class="nav-card-body">
      <span class="nav-card-title">The Majorizing Measure Theorem</span>
      <span class="nav-card-hint">Talagrand's two-sided bound on the supremum of a Gaussian process, via generic chaining.</span>
    </span>
    <span class="nav-card-arrow" aria-hidden="true">&rarr;</span>
  </a>
  <a class="nav-card" href="{{ '/mathematics/fundamental-theorem-of-empirical-processes/' | relative_url }}">
    <span class="nav-card-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M4 20 10 8l4 6 3-4 3 10H4Z"/></svg>
    </span>
    <span class="nav-card-body">
      <span class="nav-card-title">The Fundamental Theorem of Empirical Processes</span>
      <span class="nav-card-hint">Latała&ndash;Bednorz, the peaky part decomposition, and why chaining plus no cancellation always suffices.</span>
    </span>
    <span class="nav-card-arrow" aria-hidden="true">&rarr;</span>
  </a>
</div>

<p><a href="{{ '/' | relative_url }}">&larr; Back to About</a></p>
