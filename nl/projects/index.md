---
layout: default
title: Projecten
permalink: /nl/projects/
body_class: projects-index
---

<section class="hero hero-lg">
  <img class="hero-img" src="{{ '/images/Rotterdam.avif' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <!-- Animated live options-chain background, kept for later use: uncomment to restore it in place of the static image above.
  <canvas id="market-widget-canvas" class="hero-canvas" aria-label="Live BTC/USDT and ETH/USDT options chain" aria-hidden="true"></canvas>
  -->
  <div class="hero-fade hero-fade-long" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Functional Volatility<span class="hero-eyebrow-extra"> &middot; Market Microstructure &middot; Dynamic Modelling</span></div>
    <h1 class="hero-name">Projecten</h1>
    <p class="hero-lede">Onderzoek en nevenprojecten op het snijvlak van statistiek, executie en market making.</p>
  </div>
</section>

<p class="lede">
  Deze pagina bundelt twee soorten werk. Het eerste is onderzoek: langer lopende libraries rond een
  specifiek model of methode, ontwikkeld naast papers en scripties. Het tweede is kleiner gereedschap,
  gebouwd om één taak in een data- of tradingpipeline te doen.
</p>
<p class="tagline">Open een project voor de volledige theorie, code en resultaten erachter.</p>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;01</span>
  <h2>Research Libraries</h2>
  <p>Grotere, doorlopende stukken werk &mdash; elk een package met theorie, estimatie en herbruikbare code.</p>
</div>

<div class="filterable-section">

<div class="tag-filter" role="group" aria-label="Filter research libraries by topic">
  <button type="button" class="tag-filter-btn is-active" data-tag="all" aria-pressed="true">Alles</button>
  <button type="button" class="tag-filter-btn tag-filter-btn-volatility" data-tag="volatility" aria-pressed="false">Volatility</button>
  <button type="button" class="tag-filter-btn tag-filter-btn-statistics" data-tag="statistics" aria-pressed="false">Statistiek</button>
</div>

<div class="article-grid" data-filterable>
  <a class="article-card" data-tags="volatility statistics" href="{{ '/nl/projects/functional-volatility-surface-modelling/' | relative_url }}">
    <span class="article-card-body">
      <span class="article-card-title">Functional Volatility Surface Modelling</span>
      <span class="article-card-date">sep 2024 &ndash; heden</span>
    </span>
    <span class="article-card-desc">Functional GARCH en GAS-GARCH voor intraday volatility surfaces &middot; Python, numba</span>
    <span class="article-card-tags" aria-hidden="true"><span class="tag tag-volatility">Volatility</span><span class="tag tag-statistics">Statistiek</span></span>
  </a>

  <a class="article-card" data-tags="volatility statistics" href="{{ '/nl/projects/functional-scale-estimation/' | relative_url }}">
    <span class="article-card-body">
      <span class="article-card-title">Functional Scale Volatility Estimation</span>
      <span class="article-card-date">jan &ndash; jun 2024</span>
    </span>
    <span class="article-card-desc">Bernstein-basis QMLE voor functional GARCH, met Yicong Lin &amp; Andre Lucas &middot; Python, SAS</span>
    <span class="article-card-tags" aria-hidden="true"><span class="tag tag-volatility">Volatility</span><span class="tag tag-statistics">Statistiek</span></span>
  </a>

  <a class="article-card" data-tags="statistics" href="{{ '/nl/projects/functional-stationarity-test/' | relative_url }}">
    <span class="article-card-body">
      <span class="article-card-title">Functional Stationarity Test</span>
      <span class="article-card-date">2024</span>
    </span>
    <span class="article-card-desc">Een nonparametrische stationariteitstoets voor multivariate diffusies &middot; Python</span>
    <span class="article-card-tags" aria-hidden="true"><span class="tag tag-statistics">Statistiek</span></span>
  </a>

</div>

<p class="article-grid-empty" data-filter-empty hidden>Nog geen research libraries met deze tag &mdash; kies hierboven een ander filter.</p>

<div class="article-grid-more">
  <button type="button" class="article-grid-more-btn" data-show-more hidden>Meer tonen</button>
</div>

</div>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;02</span>
  <h2>Tools &amp; Utilities</h2>
  <p>Kleinere, single-purpose builds &mdash; elk gericht op één specifieke taak, en die dan ook goed doen.</p>
</div>

<div class="filterable-section">

<div class="tag-filter" role="group" aria-label="Filter tools by data source">
  <button type="button" class="tag-filter-btn is-active" data-tag="all" aria-pressed="true">Alles</button>
  <button type="button" class="tag-filter-btn tag-filter-btn-crypto" data-tag="crypto" aria-pressed="false">Crypto</button>
  <button type="button" class="tag-filter-btn tag-filter-btn-fx" data-tag="fx" aria-pressed="false">FX</button>
</div>

<div class="article-grid" data-filterable>
  <a class="article-card" data-tags="crypto" href="{{ '/nl/projects/tardis-dev-fetcher/' | relative_url }}">
    <span class="article-card-body">
      <span class="article-card-title">Tardis.dev Data Fetcher</span>
      <span class="article-card-date">2024</span>
    </span>
    <span class="article-card-desc">Command-line client voor het downloaden van historische crypto marktdata van Tardis.dev &middot; Python</span>
    <span class="article-card-tags" aria-hidden="true"><span class="tag tag-crypto">Crypto</span></span>
  </a>

  <a class="article-card" data-tags="fx" href="{{ '/nl/projects/foreign-exchange-data/' | relative_url }}">
    <span class="article-card-body">
      <span class="article-card-title">Foreign Exchange Data</span>
      <span class="article-card-date">2025</span>
    </span>
    <span class="article-card-desc">Sandbox EUR/USD 2-minuten OHLCV-dataset met scripts om te laden en te plotten &middot; Python</span>
    <span class="article-card-tags" aria-hidden="true"><span class="tag tag-fx">FX</span></span>
  </a>
</div>

<p class="article-grid-empty" data-filter-empty hidden>Nog geen tools met deze tag &mdash; kies hierboven een ander filter.</p>

<div class="article-grid-more">
  <button type="button" class="article-grid-more-btn" data-show-more hidden>Meer tonen</button>
</div>

</div>

<p>Meer op <a href="https://github.com/DaanZunnenberg" target="_blank" rel="noopener noreferrer">GitHub</a>. Werkervaring, opleiding en vaardigheden staan op de <a href="{{ '/nl/resume/' | relative_url }}">cv-pagina</a>.</p>
