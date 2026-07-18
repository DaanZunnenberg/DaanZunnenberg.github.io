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
    <h3>PhD Research &middot; Leiden University</h3>
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
        <h4>Admissible sequences and the &gamma;<sub>2</sub> functional</h4>
        <p>
          Generic chaining, in Talagrand's formulation, works with partitions rather than nested sets. An
          admissible sequence is a sequence of partitions (<em>A<sub>n</sub></em>)<sub>n&ge;0</sub> of <em>T</em>,
          each refining the one before, with |<em>A</em><sub>0</sub>| = 1 and |<em>A<sub>n</sub></em>| &le;
          <em>N<sub>n</sub></em> = 2<sup>2<sup>n</sup></sup> for <em>n</em> &ge; 1. Write <em>A<sub>n</sub></em>(<em>t</em>)
          for the piece of <em>A<sub>n</sub></em> containing <em>t</em>, and &Delta;(&middot;) for diameter under
          <em>d</em>. The &gamma;<sub>2</sub> functional is the best such sequence can do:
        </p>
        $$
        \gamma_2(T,d) = \inf_{(A_n)} \; \sup_{t \in T} \; \sum_{n=0}^{\infty} 2^{n/2}\, \Delta(A_n(t))
        $$
        <h4>The majorizing measure theorem</h4>
        <p>
          For a centered Gaussian process (<em>X<sub>t</sub></em>)<sub>t&isin;T</sub> under its canonical metric
          <em>d</em>(<em>s</em>,<em>t</em>) = (&Eopf;|<em>X<sub>s</sub></em> &minus; <em>X<sub>t</sub></em>|<sup>2</sup>)<sup>1/2</sup>,
          the chaining construction only ever gives an upper bound on the expected supremum. That's Dudley's
          entropy bound in disguise. Talagrand's majorizing measure theorem is the surprise: &gamma;<sub>2</sub> is
          also a lower bound, so it pins down &Eopf; sup<sub>t</sub> <em>X<sub>t</sub></em> exactly, up to a
          universal constant <em>L</em> that depends on neither <em>T</em> nor <em>d</em>:
        </p>
        $$
        \frac{1}{L}\,\gamma_2(T,d) \;\le\; \mathbb{E} \sup_{t \in T} X_t \;\le\; L\,\gamma_2(T,d)
        $$
        <p>
          Talagrand writes results like this as two one-sided inequalities, <em>A</em> &le; <em>LB</em> and
          <em>B</em> &le; <em>LA</em>, with <em>A</em> = &Eopf; sup<sub>t</sub> <em>X<sub>t</sub></em> and
          <em>B</em> = &gamma;<sub>2</sub>(<em>T</em>,<em>d</em>): each side controls the other, so the two
          quantities are equivalent rather than just one bounding the other.
        </p>
        <h4>Fernique's functional</h4>
        <p>
          Before &gamma;<sub>2</sub>, Fernique had already proposed a majorizing measure: a probability measure
          &mu; on <em>T</em> chosen to make
        </p>
        $$
        m(T,d) = \inf_{\mu} \; \sup_{t \in T} \; \int_0^{\infty} \sqrt{\log \frac{1}{\mu(B(t,\varepsilon))}} \; d\varepsilon
        $$
        <p>
          small, where <em>B</em>(<em>t</em>,&epsilon;) is the <em>d</em>-ball of radius &epsilon; around
          <em>t</em>. It took Talagrand's work to show <em>m</em>(<em>T</em>,<em>d</em>) and
          &gamma;<sub>2</sub>(<em>T</em>,<em>d</em>) are equivalent up to universal constants: the discrete,
          partition-based functional and Fernique's continuous, measure-based one are the same quantity seen two
          ways.
        </p>
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
    <h3>Research Assistant &middot; VU Econometrics and Data Science</h3>
    <span class="entry-date">January 2024 &ndash; June 2024</span>
  </div>
  <ul>
    <li>Designed likelihood-based estimation algorithms for functional scale models, using vectorized and parallel computation to keep them fast at scale.</li>
    <li>Reduced execution time of large-scale Monte Carlo simulations by 92.3% on average using <code>NumPy</code> vectorization and parallel computing.</li>
  </ul>
</div>

<div class="entry">
  <div class="entry-head">
    <h3>MSc Thesis &middot; Functional stationarity testing</h3>
    <span class="entry-date">2024</span>
  </div>
  <p>
    Developed a functional stationarity test for multidimensional diffusion processes, implementing and
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
A relatively recent habit that stuck harder than most. I play regularly now, and it's become the sport I
default to when I want to actually switch off rather than just move.
</p>

<h2>Reading</h2>
<p>
My reading swings between fiction and non-fiction with no particular pattern; the common thread is that it's
one of the few things that reliably gets me off a screen in the evening.
</p>

<h2>Travel</h2>
<p>
Travel is the other thing that gets me to properly close the laptop. I don't have a fixed itinerary style;
sometimes it's planned well in advance, sometimes it's decided a week out.
</p>

<h2>Sports, more broadly</h2>
<p>
Padel is the one that stuck, but staying active in general matters to me. It's as much a counterweight
to long stretches at a desk as anything else.
</p>

<p><a href="{{ '/' | relative_url }}">&larr; Back to About</a></p>
