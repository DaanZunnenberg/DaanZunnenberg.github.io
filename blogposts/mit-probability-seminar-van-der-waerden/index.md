---
layout: default
title: MIT Probability Seminar · Three-Color van der Waerden Numbers Grow Super-Exponentially
permalink: /blogposts/mit-probability-seminar-van-der-waerden/
---

<section class="hero">
  <canvas id="orderflow-ladder-canvas" class="hero-canvas" aria-label="Live combined depth-of-market and order-flow ladder" aria-hidden="true"></canvas>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Event &middot; May 2026</div>
    <h1 class="hero-name">Three-Color van der Waerden Numbers Grow Super-Exponentially</h1>
    <p class="hero-lede">Jacob Fox (Stanford University) &middot; MIT Probability Seminar</p>
  </div>
</section>

<p class="tagline">Massachusetts Institute of Technology &middot; Cambridge, Massachusetts, United States</p>

<p>
  A talk on a new construction showing that, once three colors are allowed, the van der Waerden numbers
  grow faster than any exponential function of the progression length, resolving a question that had
  been open for about a hundred years about their true rate of growth, and settling several conjectures
  that had proposed the opposite.
</p>

<h2>The van der Waerden number</h2>
<p>
  For positive integers \(k\) and \(r\), the van der Waerden number \(w(k;r)\) is the smallest positive
  integer \(N\) such that every coloring of the integers from one to \(N\) using \(r\) colors contains a
  monochromatic arithmetic progression of length \(k\). The theorem of van der Waerden guarantees that
  such an \(N\) always exists; the difficulty, open for a century, is determining how quickly \(w(k;r)\)
  grows as \(k\) grows.
</p>
<p>
  Erd&#337;s conjectured that \(w(k;2)\) grows faster than any exponential function of \(k\), that is,
  \[\limsup_{k \to \infty} w(k;2)^{1/k} = \infty,\]
  while an opposing conjecture proposed instead that \(w(k;r)^{1/k}\) converges to \(r\) for every fixed
  number of colors \(r\).
</p>

<h2>The result</h2>
<p>
  The talk establishes that, for three or more colors, the opposing conjecture is false. The van der
  Waerden numbers grow super-exponentially in \(k\) whenever \(r \ge 3\). Writing \(\log^{*} k\) for the
  iterated logarithm of \(k\) (the number of times the logarithm must be applied to \(k\) before the
  result is at most one), the precise bound proved is that, for \(k\) sufficiently large,
  \[w(k;3) > 2^{k (\log^{*}k)/4}.\]
</p>
<p>
  The construction underlying this bound is a randomized &ldquo;shifted product&rdquo; procedure. A very
  dense, arithmetic-progression-free subset of a large cyclic group is built probabilistically, then
  combined with smaller constructions of the same kind to produce successively larger three-colorings
  free of monochromatic \(k\)-term progressions, iterated roughly \((\log^{*}k)/2\) times. The same
  circle of ideas also yields a new lower bound on the canonical van der Waerden numbers \(H(k)\),
  resolving a related open problem of Erd&#337;s and Graham by showing
  \[H(k) \ge k^{(1-o(1))k\log k}.\]
</p>

<p><a href="{{ '/blogposts/' | relative_url }}">&larr; Back to Blogposts</a></p>
