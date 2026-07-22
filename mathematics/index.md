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

<p class="lede">
What really draws me to math is finding sharp order in high-dimensional randomness. My main focus
centers on concentration of measure and generic chaining theory, working with structural tools like
Bobkov-Ledoux modified logarithmic Sobolev inequalities, Latała-Oleszkiewicz tensorization, and the
Latała-Mendelson bound to extend classical Fernique comparison principles.
</p>

<p class="lede">
Much of this motivation comes directly from the theory developed by Michel Talagrand. His work on
generic chaining and isoparametric concentration completely reshaped how we handle stochastic
processes, turning coarse bounds into tight, structural characterizations. Tracing how his geometric
and measure-theoretic insights tame complex random systems is what truly drives my research. The
specific results and details below show how these ideas shape my current work.
</p>

<h2 id="results">Results</h2>

<p>
Start with generic chaining itself, the geometric argument that pins down the size of a Gaussian
process. The Majorizing Measure Theorem is the sharp two-sided version of that bound. The Fundamental
Theorem of Empirical Processes carries the same argument over to sums of independent random
functions, where cancellation alone is no longer enough.
</p>

<div class="nav-cards">
  <a class="nav-card" href="{{ '/mathematics/generic-chaining/' | relative_url }}">
    <span class="nav-card-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M4 20 10 8l4 6 3-4 3 10H4Z"/></svg>
    </span>
    <span class="nav-card-body">
      <span class="nav-card-title">Generic Chaining</span>
      <span class="nav-card-hint">Why the geometry of a metric space alone controls the size of a Gaussian process.</span>
    </span>
    <span class="nav-card-arrow" aria-hidden="true">&rarr;</span>
  </a>
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
