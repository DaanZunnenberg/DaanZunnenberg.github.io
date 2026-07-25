---
layout: default
title: Resume
permalink: /resume/
---

<section class="hero">
  <canvas id="signal-widget-canvas" class="hero-canvas" aria-label="Animated network of connections" aria-hidden="true"></canvas>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Work Experience<span class="hero-eyebrow-extra"> &middot; Education &middot; Skills</span></div>
    <h1 class="hero-name">Resume</h1>
    <p class="hero-lede">The short version: roles, education, and skills, impact first.</p>
  </div>
</section>

<p class="tagline">For the theory and code behind this work, see <a href="{{ '/projects/' | relative_url }}">Projects</a>.</p>

<h2 id="work-experience">Work Experience</h2>

<div class="entry" id="experience-quantfi-quantitative-developer">
  <div class="entry-head">
    <h3>QuantFi &middot; Quantitative Developer</h3>
    <span class="entry-date">March 2023 &ndash; August 2024</span>
  </div>
  <div class="entry-org">Schiphol-Rijk, Netherlands</div>
  <ul>
    <li>Designed quantitative trading algorithms using volatility estimation and order flow models, improving execution through queue position modelling and market impact estimation.</li>
    <li>Built a dynamic liquidity allocation model for smart order routing, reducing slippage and transaction costs by an average of 5.8% through real-time optimization over aggregated fragmented order books.</li>
    <li>Developed quantitative portfolio rebalancing methods across exchanges that optimised timing and execution of inventory transfers under latency constraints, transaction costs, and market liquidity.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <code>asyncio</code> &middot; <code>numba</code> &middot; <code>ccxt</code></div>
</div>

<div class="entry" id="experience-vu-research-assistant">
  <div class="entry-head">
    <h3>VU Econometrics and Data Science &middot; Research Assistant</h3>
    <span class="entry-date">January 2024 &ndash; June 2024</span>
  </div>
  <div class="entry-org">Amsterdam, Netherlands</div>
  <ul>
    <li>Designed scalable likelihood-based estimation algorithms for functional scale models, optimising computational performance through vectorised computations and parallel processing.</li>
    <li>Reduced execution time of large-scale Monte Carlo simulations by over 90%.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <code>SAS</code> &middot; <code>Bash</code> &middot; <a href="{{ '/projects/#project-functional-scale-estimation' | relative_url }}">Full writeup &rarr;</a></div>
</div>

<div class="entry" id="experience-quantfi-operational-trader">
  <div class="entry-head">
    <h3>QuantFi &middot; Operational Trader</h3>
    <span class="entry-date">October 2022 &ndash; March 2023</span>
  </div>
  <div class="entry-org">Schiphol-Rijk, Netherlands</div>
  <ul>
    <li>Monitored production market-making algorithms, managing real-time risk parameters and system health to limit inventory exposure through high-volatility periods.</li>
    <li>Designed and deployed a live trading terminal on <code>ccxt</code> and native exchange APIs for real-time position and order tracking, integrating <code>Tardis.dev</code> to reconstruct historical positions from raw fills for post-session audits.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <code>ccxt</code> &middot; <code>Tardis.dev</code></div>
</div>

<div class="entry" id="experience-beyonddutch-research-intern">
  <div class="entry-head">
    <h3>BeyondDutch &middot; Research Intern</h3>
    <span class="entry-date">January 2018 &ndash; June 2018</span>
  </div>
  <ul>
    <li>Built survival models for heavily right-censored data using <code>Python</code> and <code>scikit-survival</code>, using <code>SQLAlchemy</code> to pull data from SQL databases.</li>
    <li>Created features by combining domain data with macroeconomic indicators using <code>pandas</code> and <code>cbsodata</code> to cover missing data points.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <code>scikit-survival</code> &middot; <code>SQLAlchemy</code> &middot; <code>pandas</code> &middot; <code>cbsodata</code></div>
</div>

<h2 id="education">Education</h2>

<div class="entry">
  <div class="entry-head">
    <h3>Leiden University</h3>
    <span class="entry-date">Expected September 2028</span>
  </div>
  <div class="entry-org">Doctor of Philosophy (PhD), Mathematics &middot; Leiden, Netherlands</div>
  <p>
    Researching decomposition theorems, generic chaining, and majorizing measures for controlling suprema of
    stochastic processes, applied to weak convergence and Donsker&ndash;Skorokhod-type results under absolute
    regularity. I also organize and lead a weekly graduate seminar on weak convergence and empirical process
    theory. The full technical writeup, including a walkthrough of the \(\gamma_2\) functional and the
    majorizing measure theorem, is on the <a href="{{ '/academic/research/' | relative_url }}">Research</a> page.
  </p>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Vrije Universiteit Amsterdam</h3>
    <span class="entry-date">August 2024</span>
  </div>
  <div class="entry-org">MSc Econometrics and Operations Research &middot; Amsterdam, Netherlands</div>
  <p>
    Honours Programme, GPA 8.9/10 (magna cum laude). Coursework centered on Measure Theoretic Probability,
    Quantitative Financial Risk Management, Stochastic Processes, and Stochastic Integration. My thesis
    developed a functional stationarity test for multidimensional diffusion processes, packaged as the
    open-source <em>Functional Stationarity Test</em> library (see
    <a href="{{ '/projects/#project-functional-stationarity-test' | relative_url }}">Projects</a>).
  </p>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Amsterdam University of Applied Sciences</h3>
    <span class="entry-date">August 2022</span>
  </div>
  <div class="entry-org">BSc Applied Mathematics &middot; Amsterdam, Netherlands</div>
  <p>
    Minor in Big Data Analytics: model training, evaluation, and deployment, the first exposure that pulled me
    toward the applied/statistical side of mathematics I've stayed in since.
  </p>
</div>

<h2 id="achievements">Achievements</h2>

<div class="entry">
  <div class="entry-head">
    <h3>World Econometric Championship</h3>
  </div>
  <p>Finalist in the World Econometric Championship, an international competition assessing applied econometric
  problem-solving under time pressure through live model specification, estimation, and diagnostic analysis.</p>
</div>

<h2 id="skills">Skills</h2>

<div class="entry">
  <ul>
    <li><strong>Languages &amp; tools:</strong> Python (<code>pandas</code>, <code>numpy</code>, <code>asyncio</code>, <code>numba</code>), Java, Git, Docker, Bash</li>
    <li><strong>Machine learning:</strong> <code>scipy</code>, <code>cvxpy</code>, <code>statsmodels</code>, <code>sklearn</code>, <code>tensorflow</code></li>
    <li><strong>Statistical foundations:</strong> time series analysis, econometrics, inference theory</li>
  </ul>
</div>

<p><a href="{{ '/' | relative_url }}">&larr; Back to About</a></p>
