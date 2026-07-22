---
layout: default
title: Mathematics
permalink: /mathematics/
---

<h1>Mathematics</h1>
<p class="tagline">Some of my favourite pieces of theory, with full proofs.</p>

<h2 id="generic-chaining">Generic Chaining</h2>

<p>
Generic chaining bounds the supremum of a stochastic process using only the geometry of its index
set. Instead of controlling the process point by point, you build a chain of increasingly fine
approximations and add up the cost of refining each step. Talagrand's majorizing measure theorem
shows this bound is not just an upper estimate: it is tight, up to a universal constant, for Gaussian
processes. That two-sidedness is what pulled me in. It is rare in probability to get a bound and a
matching lower bound from the same piece of geometry, and it turns a technique into a genuine
equivalence.
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
</div>

<p><a href="{{ '/' | relative_url }}">&larr; Back to About</a></p>
