---
layout: default
title: Resume
permalink: /resume/
---

<section class="hero hero-scroll">
  <canvas id="trade-process-canvas" class="hero-canvas" aria-label="Live scrolling time-and-sales tables side by side, for Binance ETH/USDT, SOL/USDT, and BTC/USDT spot trades (scroll horizontally on narrow screens to see all three), each row showing price, trade amount in the coin's own units, trade amount in USD, and trade time" aria-hidden="true"></canvas>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Work Experience<span class="hero-eyebrow-extra"> &middot; Education &middot; Skills</span></div>
    <h1 class="hero-name">Resume</h1>
    <p class="hero-lede">The short version: roles, education, and skills, impact first.</p>
  </div>
</section>

<p class="tagline">For the theory and code behind this work, see <a href="{{ '/projects/' | relative_url }}">Projects</a>.</p>

<div class="resume-layout">
<div class="resume-main">

<h2 id="work-experience">Work Experience</h2>

<div class="entry" id="experience-quantfi-quantitative-developer">
  <div class="entry-head">
    <h3>QuantFi &middot; Quantitative Developer</h3>
    <span class="entry-date">March 2023 &ndash; August 2024</span>
  </div>
  <div class="entry-org">Schiphol-Rijk, Netherlands</div>
  <ul>
    <li>Built and deployed algorithmic market-making strategies, incorporating volatility and skew estimation, order flow modelling, queue-aware execution, market impact, and reference price dynamics.</li>
    <li>Built a dynamic liquidity allocation model for smart order routing, reducing slippage and transaction costs by an average of 5.8% through real-time optimization over aggregated fragmented order books.</li>
    <li>Developed cross-exchange rebalancing methods that optimised timing and execution of inventory transfers under latency constraints, transaction costs, funding rates, and market liquidity.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <code>asyncio</code> &middot; <code>numba</code> &middot; <code>ccxt</code></div>
</div>

<div class="entry" id="experience-quantfi-operational-trader">
  <div class="entry-head">
    <h3>QuantFi &middot; Operational Trader</h3>
    <span class="entry-date">October 2022 &ndash; March 2023</span>
  </div>
  <div class="entry-org">Schiphol-Rijk, Netherlands</div>
  <ul>
    <li>Monitored production market-making algorithms, managing real-time risk parameters and system health to minimize inventory exposure during high-volatility periods.</li>
    <li>Designed and deployed a live trading terminal using <code>ccxt</code> and native exchange APIs for real-time position and order tracking, integrating <code>Tardis.dev</code> for historical position reconstructions.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <code>ccxt</code> &middot; <code>Tardis.dev</code></div>
</div>

<div class="entry" id="experience-vu-research-assistant">
  <div class="entry-head">
    <h3>VU Econometrics and Data Science &middot; Research Assistant</h3>
    <span class="entry-date">January 2024 &ndash; June 2024</span>
  </div>
  <div class="entry-org">Amsterdam, Netherlands</div>
  <ul>
    <li>Designed scalable likelihood-based estimation algorithms for functional scale models, optimising computational performance through vectorised computations and parallel processing.</li>
    <li>Reduced execution time of large-scale Monte Carlo simulations by 92.3% on average using NumPy vectorisation and parallel computing.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <code>SAS</code> &middot; <code>Bash</code> &middot; <a href="{{ '/projects/functional-scale-estimation/' | relative_url }}">Full writeup &rarr;</a></div>
</div>

<h2 id="education">Education</h2>

<div class="entry">
  <div class="entry-head">
    <h3>Leiden University</h3>
    <span class="entry-date">Expected September 2028</span>
  </div>
  <div class="entry-org">Doctor of Philosophy (PhD), Mathematics &middot; Leiden, Netherlands</div>
  <ul>
    <li>Researching decomposition theorems, generic chaining, majorizing measures, weak convergence, and Donsker&ndash;Skorokhod theorems for stochastic processes satisfying absolute regularity.</li>
    <li>Organized and led a weekly graduate seminar on weak convergence and empirical process theory.</li>
  </ul>
  <p class="form-hint">The full technical writeup, including a walkthrough of the \(\gamma_2\) functional and the majorizing measure theorem, is on the <a href="{{ '/academic/research/' | relative_url }}">Research</a> page.</p>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Vrije Universiteit Amsterdam</h3>
    <span class="entry-date">August 2024</span>
  </div>
  <div class="entry-org">Master of Science, Econometrics and Operations Research &middot; Amsterdam, Netherlands</div>
  <ul>
    <li>Honours Programme, GPA 8.9/10 (magna cum laude).</li>
    <li>Developed a novel functional stationarity test for multidimensional diffusion processes for a thesis project, implementing and packaging the mathematical framework into an open-source <a href="https://github.com/DaanZunnenberg/MultivariateHamrickTaqqu" target="_blank" rel="noopener noreferrer">Git repository</a> (see <a href="{{ '/projects/functional-stationarity-test/' | relative_url }}">Projects</a>).</li>
    <li>Relevant coursework: Measure Theoretic Probability, Quantitative Financial Risk Management, Stochastic Processes, Stochastic Integration.</li>
  </ul>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Amsterdam University of Applied Sciences</h3>
    <span class="entry-date">August 2022</span>
  </div>
  <div class="entry-org">Bachelor of Science, Applied Mathematics &middot; Amsterdam, Netherlands</div>
  <ul>
    <li>Relevant coursework: Statistical Learning, Time Series, Deep Learning, Risk Theory.</li>
  </ul>
</div>

<h2 id="projects">Projects</h2>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://github.com/DaanZunnenberg/FunctionalScale" target="_blank" rel="noopener noreferrer">Functional Volatility Surface Modelling</a></h3>
    <span class="entry-date">September 2024 &ndash; present</span>
  </div>
  <ul>
    <li>Extending the functional GARCH framework to a generalized autoregressive score (GAS) model to estimate and capture time-varying intraday volatility surfaces.</li>
    <li>Designed efficient estimation procedures using B-splines, applying Numba JIT compilation to enable scalable modelling of volatility surfaces from granular intraday return data.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <code>SAS</code> &middot; <a href="{{ '/projects/functional-volatility-surface-modelling/' | relative_url }}">Full writeup &rarr;</a></div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://coinmerce.capital/en/home" target="_blank" rel="noopener noreferrer">HRP Portfolio Allocation</a></h3>
    <span class="entry-date">October 2023 &ndash; August 2024</span>
  </div>
  <ul>
    <li>Implemented Hierarchical Risk Parity via tree clustering using <code>scipy.cluster</code> to stabilize high-dimensional asset allocation, bypassing classical covariance inversion to eliminate noise sensitivity.</li>
    <li>Generated a mean alpha premium of 3.9% above the benchmark across diverse simulated horizons in a look-ahead-free method that outperformed actively rebalanced benchmark portfolios.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <a href="https://coinmerce.capital/en/home" target="_blank" rel="noopener noreferrer">Coinmerce Capital</a></div>
</div>

</div>

<div class="resume-aside">
  <div class="resume-aside-card">
    <h3>At a Glance</h3>
    <ul class="resume-facts">
      <li><span>Based in</span><span>Rotterdam, NL</span></li>
      <li><span>PhD</span><span>Leiden, exp. 2028</span></li>
      <li><span>Focus</span><span>Probability &amp; quant finance</span></li>
    </ul>
  </div>
  <div class="resume-aside-card" id="glance-timeline">
    <h3>Experience, Education &amp; Projects</h3>
    <h4 class="resume-glance-group">Experience</h4>
    <ul class="resume-glance">
      <li><span class="resume-glance-title">QuantFi &middot; Quantitative Developer</span><span class="resume-glance-date">Mar 2023 &ndash; Aug 2024</span></li>
      <li><span class="resume-glance-title">QuantFi &middot; Operational Trader</span><span class="resume-glance-date">Oct 2022 &ndash; Mar 2023</span></li>
      <li><span class="resume-glance-title">VU Econometrics &amp; Data Science &middot; Research Assistant</span><span class="resume-glance-date">Jan 2024 &ndash; Jun 2024</span></li>
    </ul>
    <h4 class="resume-glance-group">Education</h4>
    <ul class="resume-glance">
      <li><span class="resume-glance-title">Leiden University &middot; PhD, Mathematics</span><span class="resume-glance-date">Exp. Sep 2028</span></li>
      <li><span class="resume-glance-title">Vrije Universiteit Amsterdam &middot; MSc, Econometrics &amp; OR</span><span class="resume-glance-date">Aug 2024</span></li>
      <li><span class="resume-glance-title">Amsterdam University of Applied Sciences &middot; BSc, Applied Mathematics</span><span class="resume-glance-date">Aug 2022</span></li>
    </ul>
    <h4 class="resume-glance-group">Projects</h4>
    <ul class="resume-glance">
      <li><span class="resume-glance-title">Functional Volatility Surface Modelling</span><span class="resume-glance-date">Sep 2024 &ndash; present</span></li>
      <li><span class="resume-glance-title">HRP Portfolio Allocation &middot; Coinmerce Capital</span><span class="resume-glance-date">Oct 2023 &ndash; Aug 2024</span></li>
    </ul>
  </div>
</div>

</div>

<p><a href="{{ '/' | relative_url }}">&larr; Back to About</a></p>
