---
layout: default
title: Personal
permalink: /personal/
---

<div class="profile-cover">
  <img src="{{ '/assets/img/daan-cover.jpg' | relative_url }}" alt="Daan Zunnenberg">
</div>

<div class="profile-intro">
  <h1>Beyond the Desk</h1>
  <p class="tagline">The research, and the non-professional version of this site.</p>
  <p class="lede">
    Outside of proofs and production systems, I split my time between a padel court, a reading list, and
    planning the next trip.
  </p>
</div>

<h2>Research</h2>
<p class="tagline">Probability theory &middot; empirical processes &middot; statistical estimation</p>

<div class="entry">
  <div class="entry-head">
    <h3>PhD Research &mdash; Leiden University</h3>
    <span class="entry-date">2024 &ndash; present</span>
  </div>
  <p>
    My current research concerns decomposition theorems, generic chaining, and majorizing measures as tools
    for controlling suprema of stochastic processes, applied to weak convergence and
    Donsker&ndash;Skorokhod-type results for processes satisfying absolute regularity (&beta;-mixing).
    Broadly, I'm interested in the machinery of empirical process theory and where it connects to
    statistical estimation under dependence.
  </p>
  <p>I organize and lead a weekly graduate seminar on weak convergence and empirical process theory.</p>

  <div class="readme-toggle">
    <button type="button" class="readme-summary" aria-expanded="false">
      <span class="label-open">+ What is generic chaining?</span><span class="label-close">&minus; Hide the math</span>
    </button>
    <div class="readme-collapse">
      <div class="readme">
        <h4>Talagrand's &gamma;<sub>2</sub> functional</h4>
        <p>
          For a metric space <em>(T,d)</em>, an admissible sequence is a nested chain of subsets
          <em>T</em><sub>0</sub> &sub; <em>T</em><sub>1</sub> &sub; &hellip; &sub; <em>T</em> with
          |<em>T</em><sub>0</sub>| = 1 and |<em>T</em><sub>n</sub>| &le; 2<sup>2<sup>n</sup></sup>. The
          &gamma;<sub>2</sub> functional measures the best such chain can do:
        </p>
        $$
        \gamma_2(T,d) = \inf_{(T_n)} \; \sup_{t \in T} \; \sum_{n=0}^{\infty} 2^{n/2}\, d(t, T_n)
        $$
        <h4>The majorizing measure theorem</h4>
        <p>
          Talagrand's majorizing measure theorem shows &gamma;<sub>2</sub> is not merely an upper bound but the
          exact answer for a centered Gaussian process (<em>X<sub>t</sub></em>)<sub>t&isin;T</sub> under its
          canonical metric:
        </p>
        $$
        \mathbb{E} \sup_{t \in T} X_t \;\asymp\; \gamma_2(T,d), \qquad d(s,t) = \bigl(\mathbb{E}\,|X_s - X_t|^2\bigr)^{1/2}
        $$
        <h4>The Bednorz&ndash;&#321;ata&#322;a theorem</h4>
        <p>
          Bernoulli processes <em>X<sub>t</sub></em> = &sum;<sub>i</sub> <em>a<sub>i</sub></em>(<em>t</em>)&thinsp;&epsilon;<sub>i</sub>
          need a second functional, &gamma;<sub>1</sub>, to capture their &#8467;<sup>&infin;</sup> component:
        </p>
        $$
        \gamma_1(T,d_\infty) = \inf_{(T_n)} \; \sup_{t \in T} \; \sum_{n=0}^{\infty} 2^{n}\, d_\infty(t, T_n)
        $$
        <p>
          The Bednorz&ndash;&#321;ata&#322;a theorem (2014), resolving the long-standing Bernoulli conjecture,
          shows the two functionals together give a sharp bound:
        </p>
        $$
        \mathbb{E} \sup_{t \in T} X_t \;\asymp\; \gamma_1(T, d_\infty) + \gamma_2(T, d_2)
        $$
        <p class="form-hint">
          This is the toolkit I'm extending: to processes that are only &beta;-mixing rather than independent,
          where the chaining argument has to absorb a mixing-rate correction at every scale <em>n</em> instead of
          relying on independence between increments.
        </p>
      </div>
    </div>
  </div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>Research Assistant &mdash; VU Econometrics and Data Science</h3>
    <span class="entry-date">January 2024 &ndash; June 2024</span>
  </div>
  <ul>
    <li>Designed scalable likelihood-based estimation algorithms for functional scale models, optimizing computational performance through vectorized computation and parallel processing.</li>
    <li>Reduced execution time of large-scale Monte Carlo simulations by 92.3% on average using <code>NumPy</code> vectorization and parallel computing.</li>
  </ul>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>MSc Thesis &mdash; Functional stationarity testing</h3>
    <span class="entry-date">2024</span>
  </div>
  <p>
    Developed a novel functional stationarity test for multidimensional diffusion processes, implementing and
    packaging the underlying mathematical framework as an open-source library.
  </p>
  <div class="tags"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/MultivariateHamrickTaqqu" target="_blank" rel="noopener noreferrer">MultivariateHamrickTaqqu on GitHub</a></div>
</div>

<p>
  See <a href="{{ '/publications/' | relative_url }}">Publications</a> for papers and software, or
  <a href="https://scholar.google.com/citations?user=JLg2KjEAAAAJ" target="_blank" rel="noopener noreferrer">Google Scholar</a> for the full, up-to-date list.
</p>

<h2>Padel</h2>
<p>
A relatively recent habit that stuck harder than most &mdash; I play regularly, and it's become the sport I
default to when I want to actually switch off rather than just move.
</p>

<h2>Reading</h2>
<p>
My reading swings between fiction and non-fiction with no particular pattern; the common thread is that it's
one of the few things that reliably gets me off a screen in the evening.
</p>

<h2>Travel</h2>
<p>
Travel is the other thing that gets me to properly close the laptop. I don't have a fixed itinerary style
&mdash; sometimes it's planned well in advance, sometimes it's decided a week out.
</p>

<h2>Sports, more broadly</h2>
<p>
Padel is the one that stuck, but staying active in general matters to me &mdash; it's as much a counterweight
to long stretches at a desk as anything else.
</p>

<p><a href="{{ '/' | relative_url }}">&larr; Back to About</a></p>
