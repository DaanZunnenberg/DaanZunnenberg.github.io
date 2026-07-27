---
layout: default
title: Foreign Exchange Data
permalink: /projects/foreign-exchange-data/
---

<section class="hero">
  <img class="hero-img" src="{{ '/images/forex.jpg' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Tool &middot; 2025</div>
    <h1 class="hero-name">Foreign Exchange Data</h1>
    <p class="hero-lede">A sandbox EUR/USD dataset and a few small scripts for loading, resampling, and plotting it.</p>
  </div>
</section>

<div class="article-body">

<p class="tagline"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/ForeignExchangeData" target="_blank" rel="noopener noreferrer">ForeignExchangeData on GitHub</a></p>

<h2 id="what-it-is">What it is</h2>
<p>
  A public domain dataset of EUR/USD price bars, 2-minute intervals, covering all of 2025. Alongside the
  data there are two small scripts: one to load and resample the bars, one to plot them. This is not a
  trading system. It exists so anyone can try out backtests, indicators, or analysis on real-shaped FX
  data without setting up a broker feed first.
</p>
<p>
  This is a sandbox repository. The data comes with no guarantee of accuracy or completeness and should
  not be used for real trading decisions. The data and code are released under CC0, so they can be used,
  copied, modified, and shared for any purpose.
</p>

<h2 id="data">The data</h2>
<p>
  One CSV file per month, <code>data/eurusd_2m_2025-MM.csv</code>, twelve files in total. Each row is a
  2-minute bar.
</p>
<ul>
  <li><code>datetime</code> &mdash; bar timestamp, UTC</li>
  <li><code>open</code> &mdash; opening price</li>
  <li><code>high</code> &mdash; high price</li>
  <li><code>low</code> &mdash; low price</li>
  <li><code>close</code> &mdash; closing price</li>
  <li><code>volume</code> &mdash; traded volume</li>
  <li><code>trade_count</code> &mdash; number of trades in the bar</li>
</ul>

<h2 id="loading">Loading and resampling</h2>
<p>
  <code>scripts/data_tools.py</code> has four functions. <code>load_month</code> reads one month's CSV
  into a DataFrame, indexed by datetime and sorted. <code>load_months</code> loads several months and
  combines them into one sorted DataFrame, dropping any duplicate timestamps at the seams. <code>load_all</code>
  is <code>load_months</code> over every file found in <code>data/</code>. <code>resample</code> takes a
  DataFrame and a pandas offset alias, like <code>"1h"</code> or <code>"1D"</code>, and aggregates it to
  that bar size: first open, max high, min low, last close, summed volume and trade count.
</p>
<pre class="code-block" data-lang="python"><code>from scripts.data_tools import load_months, load_all, resample

df = load_months(["2025-01", "2025-02"])  # combine specific months
df = load_all()                           # combine all available months
hourly = resample(df, "1h")               # resample to any pandas offset alias</code></pre>
<p>
  <code>available_months()</code> lists which months have a CSV file present, by reading the
  <code>data/</code> folder. The other loading functions use it internally, and it is also how the
  plotting script fills in <code>--all</code>.
</p>

<h2 id="plotting">Plotting</h2>
<p>
  <code>scripts/visualize.py</code> is a small command-line script. It loads one or more months, resamples
  them, and draws two stacked charts: closing price with the high/low range shaded behind it, and volume
  as a bar chart below, colored green or red depending on whether the bar closed up or down.
</p>
<pre class="code-block" data-lang="bash"><code>pip install -r requirements.txt
python scripts/visualize.py 2025-01
python scripts/visualize.py --all
python scripts/visualize.py --all --resample 1h</code></pre>
<p>
  The <code>--resample</code> flag defaults to <code>1h</code>. Pass any pandas offset alias, such as
  <code>5min</code> or <code>1D</code>, to change the bar size before plotting. Plotting the full year at
  the native 2-minute resolution is slow and cramped, so resampling first is worth doing for anything
  wider than a couple of months.
</p>

<h2 id="structure">Project structure</h2>
<pre class="code-block" data-lang="txt"><code>data/
    eurusd_2m_2025-01.csv   # one file per month
    ...
    eurusd_2m_2025-12.csv

scripts/
    data_tools.py           # load_month, load_months, load_all, resample
    visualize.py             # command-line plotting script

CITATION.cff                # how to cite this dataset
LICENSE                      # CC0 1.0</code></pre>
<p class="form-hint">Citing this data in a paper or write-up? See <code>CITATION.cff</code> in the repository.</p>

</div>

<p><a href="{{ '/projects/' | relative_url }}">&larr; Back to Projects</a></p>
