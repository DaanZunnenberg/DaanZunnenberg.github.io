---
layout: default
title: HRP Portfolio Allocation
permalink: /projects/hrp-portfolio-allocation/
---

<section class="hero">
  <canvas id="market-widget-canvas" class="hero-canvas" aria-label="Live BTC/USDT and ETH/USDT options chain" aria-hidden="true"></canvas>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Project &middot; October 2023 &ndash; August 2024</div>
    <h1 class="hero-name">HRP Portfolio Allocation</h1>
    <p class="hero-lede">Hierarchical Risk Parity for high-dimensional crypto asset allocation at Coinmerce Capital.</p>
  </div>
</section>

<div class="article-body">

<p class="tagline"><code>Python</code> &middot; <a href="https://coinmerce.capital/en/home" target="_blank" rel="noopener noreferrer">Coinmerce Capital</a></p>

<h2 id="overview">Overview</h2>
<p>
  Mean-variance allocation is fragile in high dimensions because it inverts a noisy covariance matrix: with
  many correlated crypto assets and a limited history, that inversion amplifies estimation error rather than
  averaging it out, so the resulting weights can swing wildly from small changes in the input data.
  Hierarchical Risk Parity (HRP) sidesteps the inversion entirely: assets are clustered by correlation
  distance, then risk is allocated recursively down the resulting tree, so no step ever needs to invert the
  full covariance matrix.
</p>

<h2 id="approach">Approach</h2>
<p>
  Clustering uses <code>scipy.cluster.hierarchy</code> on a correlation-distance matrix
  (\(d_{ij} = \sqrt{\tfrac{1}{2}(1-\rho_{ij})}\)), built with single-linkage agglomeration. The resulting
  dendrogram gives a quasi-diagonalized ordering of assets in which similar assets sit next to each other.
  Weights are then derived by recursive bisection down the dendrogram: at each split, the two resulting
  sub-clusters are each assigned an inverse-variance weight (treating each sub-cluster's assets as if they
  were held in an inverse-variance-weighted sub-portfolio), and that split is applied recursively until each
  leaf is a single asset. Because the split at each level only involves the two subgroups being compared,
  the calculation never needs the inverse of the full covariance matrix, only inverse variances of
  progressively smaller subsets. All backtests are look-ahead-free, re-clustering only on data available at
  each date, so the correlation structure used to build the tree at time \(t\) never sees returns after
  \(t\).
</p>

<h2 id="results">Results</h2>
<p>
  Across diverse simulated horizons, this look-ahead-free method generated a mean alpha premium of 3.9%
  above the benchmark, outperforming actively rebalanced benchmark portfolios that use classical
  mean-variance optimization over the same asset universe. The main practical advantage isn't necessarily
  a higher expected return in any single backtest, but the stability of the resulting weights: because HRP
  never inverts the full covariance matrix, small perturbations in the input correlations don't get
  amplified into large weight swings the way they can under mean-variance optimization.
</p>

<h2 id="code">Code</h2>
<pre class="code-block"><code>from scipy.cluster.hierarchy import linkage, dendrogram
from hrp import correlation_distance, recursive_bisection

dist = correlation_distance(returns)
tree = linkage(dist, method="single")
order = dendrogram(tree, no_plot=True)["leaves"]

weights = recursive_bisection(returns.cov(), order)
</code></pre>
<p class="form-hint">Illustrative interface. The production version adds transaction-cost-aware rebalancing, so the allocator doesn't churn the portfolio chasing marginal improvements in the objective.</p>

</div>

<p><a href="{{ '/projects/' | relative_url }}">&larr; Back to Projects</a></p>
