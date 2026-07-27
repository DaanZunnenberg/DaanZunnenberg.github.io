---
layout: default
title: Projects
permalink: /projects/
---

<section class="hero">
  <canvas id="market-widget-canvas" class="hero-canvas" aria-label="Live BTC/USDT and ETH/USDT options chain" aria-hidden="true"></canvas>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Functional Volatility<span class="hero-eyebrow-extra"> &middot; Market Microstructure &middot; Dynamic Modelling</span></div>
    <h1 class="hero-name">Projects</h1>
    <p class="hero-lede">Research and side projects at the intersection of statistics, execution, and market-making.</p>
  </div>
</section>

<p class="tagline">Open any project for the full theory, code, and results behind it.</p>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;01</span>
</div>

<div class="section-heading">
  <h2>Research Libraries</h2>
  <p class="tagline">Larger, ongoing bodies of work &mdash; each one a package spanning theory, estimation, and reusable code.</p>
</div>

<div class="article-grid">
  <a class="article-card" href="{{ '/projects/functional-volatility-surface-modelling/' | relative_url }}">
    <span class="article-card-img" aria-hidden="true">
      <img src="{{ '/images/volatility/back1.png' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
    </span>
    <span class="article-card-body">
      <span class="article-card-date">September 2024 &ndash; present</span>
      <span class="article-card-title">Functional Volatility Surface Modelling</span>
      <span class="article-card-desc">Functional GARCH and GAS-GARCH for intraday volatility surfaces &middot; Python, numba</span>
    </span>
  </a>

  <a class="article-card" href="{{ '/projects/functional-scale-estimation/' | relative_url }}">
    <span class="article-card-img" aria-hidden="true">
      <img src="{{ '/images/volatility/background.jpg' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
    </span>
    <span class="article-card-body">
      <span class="article-card-date">January 2024 &ndash; June 2024</span>
      <span class="article-card-title">Functional Scale Volatility Estimation</span>
      <span class="article-card-desc">Bernstein-basis QMLE for functional GARCH, with Yicong Lin &amp; Andre Lucas &middot; Python, SAS</span>
    </span>
  </a>

  <a class="article-card" href="{{ '/projects/functional-stationarity-test/' | relative_url }}">
    <span class="article-card-img" aria-hidden="true">
      <img src="{{ '/images/stationarity_background.jpg' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
    </span>
    <span class="article-card-body">
      <span class="article-card-date">2024</span>
      <span class="article-card-title">Functional Stationarity Test</span>
      <span class="article-card-desc">A nonparametric stationarity test for multivariate diffusions &middot; Python</span>
    </span>
  </a>

</div>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;02</span>
</div>

<div class="section-heading">
  <h2>Tools &amp; Utilities</h2>
  <p class="tagline">Smaller, single-purpose builds &mdash; each one focused on doing one specific job well.</p>
</div>

<div class="article-grid-empty">
  Nothing published here yet &mdash; check back soon.
</div>

<p>More on <a href="https://github.com/DaanZunnenberg" target="_blank" rel="noopener noreferrer">GitHub</a>. Work history, education, and skills are on the <a href="{{ '/resume/' | relative_url }}">Resume</a> page.</p>
