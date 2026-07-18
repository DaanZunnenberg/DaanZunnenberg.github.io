---
layout: default
title: Research
permalink: /research/
---

<h1>Research</h1>
<p class="tagline">Probability theory &middot; empirical processes &middot; statistical estimation under dependence.</p>

<p class="lede">
I'm a PhD researcher in mathematics at Leiden University. Broadly, I work in empirical process theory: the
machinery used to control suprema of stochastic processes, and how it extends to weak convergence and
estimation once the independence assumption is dropped.
</p>

<h2>Research Interests</h2>
<div class="entry">
  <ul>
    <li>Decomposition theorems, generic chaining, and majorizing measures for controlling suprema of stochastic processes.</li>
    <li>Weak convergence and Donsker&ndash;Skorokhod-type results for processes satisfying absolute regularity (&beta;-mixing).</li>
    <li>Depth functions and robust statistics under dependence, e.g. the Tukey depth for time-dependent data.</li>
    <li>Functional time series: stationarity testing and functional GARCH/GAS models for volatility surfaces.</li>
  </ul>
</div>

<h2>Current Work</h2>
<div class="entry">
  <div class="entry-head">
    <h3>PhD Research &middot; Leiden University</h3>
    <span class="entry-date">2024 &ndash; present</span>
  </div>
  <p>
    My current research concerns decomposition theorems, generic chaining, and majorizing measures as tools
    for controlling suprema of stochastic processes, applied to weak convergence and
    Donsker&ndash;Skorokhod-type results for processes satisfying absolute regularity (&beta;-mixing). Alongside
    this, I work with Alexander D&uuml;rre on the Tukey depth under dependence, forthcoming in <em>Bernoulli</em>.
  </p>
  <p>I organize and lead a weekly graduate seminar on weak convergence and empirical process theory.</p>

  <div class="readme-toggle is-open">
    <button type="button" class="readme-summary" aria-expanded="true">
      <span class="label-open">+ What is generic chaining?</span><span class="label-close">&minus; Hide the math</span>
    </button>
    <div class="readme-collapse">
      <div class="readme">
        <h4>Admissible sequences and the \(\gamma_2\) functional</h4>
        <p>
          Generic chaining, in Talagrand's formulation, works with partitions rather than nested sets. An
          admissible sequence is a sequence of partitions \((A_n)_{n \ge 0}\) of \(T\), each refining the one
          before, with \(\operatorname{card}(A_0) = 1\) and \(\operatorname{card}(A_n) \le N_n = 2^{2^n}\) for
          \(n \ge 1\). Write \(A_n(t)\) for the piece of \(A_n\) containing \(t\), and \(\mathit{\Delta}(\cdot)\)
          for diameter under \(d\). The \(\gamma_2\) functional is the best such sequence can do.
        </p>
        \[
        \gamma_2(T,d) = \inf_{(A_n)} \; \sup_{t \in T} \; \sum_{n=0}^{\infty} 2^{n/2}\, \mathit{\Delta}(A_n(t))
        \]
        <h4>The majorizing measure theorem</h4>
        <p>
          For a centered Gaussian process \((X_t)_{t \in T}\) under its canonical metric
          \(d(s,t) = (\mathbb{E}|X_s - X_t|^2)^{1/2}\), the chaining construction only ever gives an upper bound
          on the expected supremum, which is Dudley's entropy bound in disguise. Talagrand's majorizing measure
          theorem is the surprise: \(\gamma_2\) is also a lower bound, so it pins down \(\mathbb{E}\sup_t X_t\)
          exactly, up to a universal constant \(L\) that depends on neither \(T\) nor \(d\).
        </p>
        \[
        \frac{1}{L}\,\gamma_2(T,d) \;\le\; \mathbb{E} \sup_{t \in T} X_t \;\le\; L\,\gamma_2(T,d)
        \]
        <p>
          Talagrand writes results like this as two one-sided inequalities, \(A \le LB\) and \(B \le LA\), with
          \(A = \mathbb{E}\sup_t X_t\) and \(B = \gamma_2(T,d)\). Each side controls the other, so the two
          quantities are equivalent rather than just one bounding the other.
        </p>
        <h4>Fernique's functional</h4>
        <p>
          Before \(\gamma_2\), Fernique had already proposed a majorizing measure, a probability measure
          \(\mu\) on \(T\) chosen to make the quantity below small, where \(B(t,\varepsilon)\) is the \(d\)-ball
          of radius \(\varepsilon\) around \(t\).
        </p>
        \[
        m(T,d) = \inf_{\mu} \; \sup_{t \in T} \; \int_0^{\infty} \sqrt{\log \frac{1}{\mu(B(t,\varepsilon))}} \; d\varepsilon
        \]
        <p>
          It took Talagrand's work to show \(m(T,d)\) and \(\gamma_2(T,d)\) are equivalent up to universal
          constants. The discrete, partition-based functional and Fernique's continuous, measure-based one turn
          out to be the same quantity seen two ways.
        </p>
        <p class="form-hint">
          This is the toolkit I'm extending, to processes that are only \(\beta\)-mixing rather than
          independent, where the chaining argument has to absorb a mixing-rate correction at every scale
          \(n\) instead of relying on independence between increments.
        </p>
      </div>
    </div>
  </div>
</div>

<h2>Past Research</h2>

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
  For collaboration proposals or seminar invitations, <a href="{{ '/contact/research/' | relative_url }}">get in touch</a>.
</p>
