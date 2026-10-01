---
layout: default
title: Resume
permalink: /resume/
body_class: resume-index
---

<section class="hero hero-lg hero-scroll">
  <img class="hero-img" src="{{ '/images/Rotterdam.avif' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <!-- Animated scrolling time-and-sales background, kept for later use: uncomment to restore it in place of the static image above.
  <canvas id="trade-process-canvas" class="hero-canvas" aria-label="Live scrolling time-and-sales tables side by side, for Binance ETH/USDT, SOL/USDT, and BTC/USDT spot trades (scroll horizontally on narrow screens to see all three), each row showing price, trade amount in the coin's own units, trade amount in USD, and trade time" aria-hidden="true"></canvas>
  -->
  <div class="hero-fade hero-fade-long" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Work Experience<span class="hero-eyebrow-extra"> &middot; Education &middot; Skills</span></div>
    <h1 class="hero-name">Resume</h1>
    <p class="hero-lede">The short version: roles, education, and skills, impact first.</p>
  </div>
</section>

<p class="tagline">For the theory and code behind this work, see <a href="{{ '/projects/' | relative_url }}">Projects</a>.</p>

<div class="resume-main">

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;01</span>
  <h2 id="work-experience">Work Experience</h2>
  <p>Roles in algorithmic market-making, execution, and quantitative research.</p>
</div>

<div class="entry" id="experience-quantfi-quantitative-developer">
  <div class="entry-head">
    <h3>QuantFi &middot; Quantitative Developer</h3>
    <span class="entry-date">March 2023 &ndash; August 2024</span>
  </div>
  <div class="entry-org">Schiphol-Rijk, Netherlands</div>
  <ul>
    <li>Built and deployed algorithmic market-making strategies, incorporating volatility and skew estimation, order flow modelling, queue-aware execution, market impact, and reference price dynamics.</li>
    <li>Built a dynamic liquidity allocation model for smart order routing, reducing slippage and transaction costs by an average of 5.8% through real-time optimization over aggregated, fragmented order books.</li>
    <li>Developed quantitative portfolio rebalancing methods across exchanges that optimised the timing and execution of inventory transfers under latency constraints, transaction costs, and market liquidity.</li>
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

<div class="entry" id="experience-luc-lecturer">
  <div class="entry-head">
    <h3>Leiden University College &middot; Lecturer</h3>
    <span class="entry-date">September 2025 &ndash; November 2026</span>
  </div>
  <div class="entry-org">The Hague, Netherlands</div>
  <ul>
    <li>Teach statistics, covering hypothesis testing, regression theory, and statistical inference.</li>
    <li>Supervise a group project in which students apply these methods to an economic analysis of their choice.</li>
  </ul>
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
  <div class="tags"><code>Python</code> &middot; <code>SAS</code> &middot; <code>Bash</code> &middot; <a href="{{ '/projects/functional-scale-estimation/' | relative_url }}">Full writeup &rarr;</a></div>
</div>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;02</span>
  <h2 id="education">Education</h2>
  <p>PhD, Master's, and Bachelor's, from applied mathematics to probability theory.</p>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Leiden University</h3>
    <span class="entry-date">Expected September 2028</span>
  </div>
  <div class="entry-org">Doctor of Philosophy (PhD), Mathematics &middot; Leiden, Netherlands</div>
  <ul>
    <li>Researching statistical learning theory, high-dimensional probability, and stochastic processes.</li>
    <li>Organized and led a weekly graduate seminar on empirical process theory and statistical learning theory, with applications to machine learning and deep learning.</li>
  </ul>
  <p class="form-hint">The full technical writeup, including a walkthrough of the \(\gamma_2\) functional and the majorizing measure theorem, is on the <a href="{{ '/blogposts/dudley-integrals-and-the-majorizing-measure-theorem/' | relative_url }}">Blogposts</a> page.</p>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Vrije Universiteit Amsterdam</h3>
    <span class="entry-date">August 2024</span>
  </div>
  <div class="entry-org">Master of Science, Econometrics and Operations Research &middot; Amsterdam, Netherlands</div>
  <ul>
    <li>Honours Programme, GPA 8.9/10 (magna cum laude).</li>
    <li>Developed a novel nonparametric testing framework for multidimensional stochastic processes for a thesis project, implementing and packaging the mathematical framework into an open-source <a href="https://github.com/DaanZunnenberg/FunctionalMH" target="_blank" rel="noopener noreferrer">Git repository</a> (see <a href="{{ '/projects/functional-stationarity-test/' | relative_url }}">Projects</a>).</li>
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
    <li>Applied deep learning models for binary classification of digital asset news using Keras, with text preprocessing and feature engineering.</li>
  </ul>
</div>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;03</span>
  <h2 id="projects">Projects</h2>
  <p>Selected work; full theory and code are on the Projects page.</p>
</div>

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
    <li>Outperformed the benchmark by an average of 3.9 percentage points across multiple simulated investment horizons in a look-ahead-free backtest.</li>
  </ul>
  <div class="tags"><code>Python</code> &middot; <a href="https://coinmerce.capital/en/home" target="_blank" rel="noopener noreferrer">Coinmerce Capital</a></div>
</div>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;04</span>
  <h2 id="publications">Publications</h2>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>The Tukey depth under dependence</h3>
    <span class="entry-date">2026 &middot; forthcoming</span>
  </div>
  <div class="entry-org">Zunnenberg, D. &amp; D&uuml;rre, A. &middot; <em>Bernoulli</em></div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Absolute regularity and maximal moment inequalities</h3>
    <span class="entry-date">2026 &middot; in preparation</span>
  </div>
  <div class="entry-org">Zunnenberg, D. &amp; D&uuml;rre, A. &middot; Unpublished manuscript</div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Functional location-scale models with robust observation-driven dynamics</h3>
    <span class="entry-date">2025</span>
  </div>
  <div class="entry-org">Lin, Y. &amp; Lucas, A. &middot; Tinbergen Institute Discussion Paper</div>
  <div class="tags">Research assistantship contribution</div>
</div>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;05</span>
  <h2 id="leadership-and-activities">Leadership and Activities</h2>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Mathematical Institute, Leiden University &middot; Board Member, Institute Council</h3>
    <span class="entry-date">September 2024 &ndash; August 2025</span>
  </div>
  <div class="entry-org">Leiden, Netherlands</div>
  <ul>
    <li>Represented the interests, opinions, and concerns of the PhD candidates.</li>
    <li>Contributed to improvements in budgeting, strategic planning, and day-to-day matters.</li>
  </ul>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Department of Econometrics and Data Science, VU Amsterdam &middot; Student Ambassador</h3>
    <span class="entry-date">October 2023 &ndash; April 2024</span>
  </div>
  <div class="entry-org">Amsterdam, Netherlands</div>
  <ul>
    <li>Participated in live Q&amp;A sessions and (virtual) educational fairs.</li>
    <li>Assisted prospective students by answering questions on the online chat platform.</li>
  </ul>
</div>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;06</span>
  <h2 id="skills">Skills</h2>
</div>

<div class="entry">
  <h4 class="resume-glance-group">Languages &amp; Tools</h4>
  <ul class="resume-skills">
    <li>Python (Pandas, NumPy, Numba)</li>
    <li>Java</li>
    <li>SQL</li>
    <li>Git</li>
    <li>Bash</li>
  </ul>
  <h4 class="resume-glance-group">Scientific Computing</h4>
  <ul class="resume-skills">
    <li>SciPy</li>
    <li>statsmodels</li>
    <li>CVXPY</li>
    <li>scikit-learn</li>
    <li>TensorFlow</li>
  </ul>
  <h4 class="resume-glance-group">Quantitative Methods</h4>
  <ul class="resume-skills">
    <li>Time series analysis</li>
    <li>Econometrics</li>
    <li>Statistical inference</li>
    <li>Optimisation</li>
  </ul>
</div>

</div>

<p><a href="{{ '/' | relative_url }}">&larr; Back to About</a></p>
