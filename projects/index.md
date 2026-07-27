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

<p class="lede">
  This page collects two kinds of work. The first is research: longer-running libraries built around a
  specific model or method, developed alongside papers and theses. The second is smaller tools, built to
  do one job in a data or trading pipeline.
</p>
<p class="tagline">Open any project for the full theory, code, and results behind it.</p>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;01</span>
  <h2>Research Libraries</h2>
  <p>Larger, ongoing bodies of work &mdash; each one a package spanning theory, estimation, and reusable code.</p>
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
  <h2>Tools &amp; Utilities</h2>
  <p>Smaller, single-purpose builds &mdash; each one focused on doing one specific job well.</p>
</div>

<div class="article-grid">
  <a class="article-card" href="{{ '/projects/tardis-dev-fetcher/' | relative_url }}">
    <span class="article-card-img" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
    </span>
    <span class="article-card-body">
      <span class="article-card-date">2024</span>
      <span class="article-card-title">Tardis.dev Data Fetcher</span>
      <span class="article-card-desc">Command-line client for downloading historical crypto market data from Tardis.dev &middot; Python</span>
    </span>
  </a>

  <a class="article-card" href="{{ '/projects/foreign-exchange-data/' | relative_url }}">
    <span class="article-card-img" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l5-5 4 4 8-8"/><path d="M14 8h6v6"/></svg>
    </span>
    <span class="article-card-body">
      <span class="article-card-date">2025</span>
      <span class="article-card-title">Foreign Exchange Data</span>
      <span class="article-card-desc">Sandbox EUR/USD 2-minute OHLCV dataset with loading and plotting scripts &middot; Python</span>
    </span>
  </a>
</div>

<p>More on <a href="https://github.com/DaanZunnenberg" target="_blank" rel="noopener noreferrer">GitHub</a>. Work history, education, and skills are on the <a href="{{ '/resume/' | relative_url }}">Resume</a> page.</p>
