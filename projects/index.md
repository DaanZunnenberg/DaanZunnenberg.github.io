---
layout: default
title: Projects
permalink: /projects/
---

<section class="hero">
  <img class="hero-img" src="{{ '/images/hero_wide.png' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <!-- Animated live options-chain background, kept for later use: uncomment to restore it in place of the static image above.
  <canvas id="market-widget-canvas" class="hero-canvas" aria-label="Live BTC/USDT and ETH/USDT options chain" aria-hidden="true"></canvas>
  -->
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

<div class="filterable-section">

<div class="tag-filter" role="group" aria-label="Filter research libraries by topic">
  <button type="button" class="tag-filter-btn is-active" data-tag="all" aria-pressed="true">All</button>
  <button type="button" class="tag-filter-btn tag-filter-btn-volatility" data-tag="volatility" aria-pressed="false">Volatility</button>
  <button type="button" class="tag-filter-btn tag-filter-btn-statistics" data-tag="statistics" aria-pressed="false">Statistics</button>
</div>

<div class="article-grid" data-filterable>
  <a class="article-card" data-tags="volatility statistics" href="{{ '/projects/functional-volatility-surface-modelling/' | relative_url }}">
    <span class="article-card-img" aria-hidden="true">
      <img src="{{ '/images/volatility/back1.png' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
    </span>
    <span class="article-card-body">
      <span class="article-card-tags" aria-hidden="true"><span class="tag tag-volatility">Volatility</span><span class="tag tag-statistics">Statistics</span></span>
      <span class="article-card-date">September 2024 &ndash; present</span>
      <span class="article-card-title">Functional Volatility Surface Modelling</span>
      <span class="article-card-desc">Functional GARCH and GAS-GARCH for intraday volatility surfaces &middot; Python, numba</span>
    </span>
  </a>

  <a class="article-card" data-tags="volatility statistics" href="{{ '/projects/functional-scale-estimation/' | relative_url }}">
    <span class="article-card-img" aria-hidden="true">
      <img src="{{ '/images/volatility/background.jpg' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
    </span>
    <span class="article-card-body">
      <span class="article-card-tags" aria-hidden="true"><span class="tag tag-volatility">Volatility</span><span class="tag tag-statistics">Statistics</span></span>
      <span class="article-card-date">January 2024 &ndash; June 2024</span>
      <span class="article-card-title">Functional Scale Volatility Estimation</span>
      <span class="article-card-desc">Bernstein-basis QMLE for functional GARCH, with Yicong Lin &amp; Andre Lucas &middot; Python, SAS</span>
    </span>
  </a>

  <a class="article-card" data-tags="statistics" href="{{ '/projects/functional-stationarity-test/' | relative_url }}">
    <span class="article-card-img" aria-hidden="true">
      <img src="{{ '/images/stationarity_background.jpg' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
    </span>
    <span class="article-card-body">
      <span class="article-card-tags" aria-hidden="true"><span class="tag tag-statistics">Statistics</span></span>
      <span class="article-card-date">2024</span>
      <span class="article-card-title">Functional Stationarity Test</span>
      <span class="article-card-desc">A nonparametric stationarity test for multivariate diffusions &middot; Python</span>
    </span>
  </a>

</div>

<p class="article-grid-empty" data-filter-empty hidden>No research libraries tagged with this topic yet &mdash; pick another filter above.</p>

<div class="article-grid-more">
  <button type="button" class="article-grid-more-btn" data-show-more hidden>Show more</button>
</div>

</div>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;02</span>
  <h2>Tools &amp; Utilities</h2>
  <p>Smaller, single-purpose builds &mdash; each one focused on doing one specific job well.</p>
</div>

<div class="filterable-section">

<div class="tag-filter" role="group" aria-label="Filter tools by data source">
  <button type="button" class="tag-filter-btn is-active" data-tag="all" aria-pressed="true">All</button>
  <button type="button" class="tag-filter-btn tag-filter-btn-crypto" data-tag="crypto" aria-pressed="false">Crypto</button>
  <button type="button" class="tag-filter-btn tag-filter-btn-fx" data-tag="fx" aria-pressed="false">FX</button>
</div>

<div class="article-grid" data-filterable>
  <a class="article-card" data-tags="crypto" href="{{ '/projects/tardis-dev-fetcher/' | relative_url }}">
    <span class="article-card-img" aria-hidden="true">
      <img src="{{ '/images/terminal.jpg' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
    </span>
    <span class="article-card-body">
      <span class="article-card-tags" aria-hidden="true"><span class="tag tag-crypto">Crypto</span></span>
      <span class="article-card-date">2024</span>
      <span class="article-card-title">Tardis.dev Data Fetcher</span>
      <span class="article-card-desc">Command-line client for downloading historical crypto market data from Tardis.dev &middot; Python</span>
    </span>
  </a>

  <a class="article-card" data-tags="fx" href="{{ '/projects/foreign-exchange-data/' | relative_url }}">
    <span class="article-card-img" aria-hidden="true">
      <img src="{{ '/images/forex.jpg' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
    </span>
    <span class="article-card-body">
      <span class="article-card-tags" aria-hidden="true"><span class="tag tag-fx">FX</span></span>
      <span class="article-card-date">2025</span>
      <span class="article-card-title">Foreign Exchange Data</span>
      <span class="article-card-desc">Sandbox EUR/USD 2-minute OHLCV dataset with loading and plotting scripts &middot; Python</span>
    </span>
  </a>
</div>

<p class="article-grid-empty" data-filter-empty hidden>No tools tagged with this topic yet &mdash; pick another filter above.</p>

<div class="article-grid-more">
  <button type="button" class="article-grid-more-btn" data-show-more hidden>Show more</button>
</div>

</div>

<p>More on <a href="https://github.com/DaanZunnenberg" target="_blank" rel="noopener noreferrer">GitHub</a>. Work history, education, and skills are on the <a href="{{ '/resume/' | relative_url }}">Resume</a> page.</p>
