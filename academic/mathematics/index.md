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
Three pieces, building on each other. The Majorizing Measure Theorem is the sharp version of the
generic chaining bound for Gaussian processes. The Fundamental Theorem of Empirical Processes takes
the same idea and makes it work for sums of independent functions. The Bousquet&ndash;Talagrand
inequality comes at the same problem from a different angle: concentration of measure via the
entropy method. Full proofs:
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

<p><a href="{{ '/academic/' | relative_url }}">&larr; Back to Academic</a></p>
