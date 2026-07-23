---
layout: default
title: Events
permalink: /events/
---

<section class="hero hero-scroll">
  <canvas id="orderflow-ladder-canvas" class="hero-canvas" aria-label="Live combined depth-of-market and order-flow ladder for Binance XLM/USDT, SOL/USDT, and XRP/USDT: each row is a price level showing resting bid and ask book size, the net executed buy/sell delta traded at that level, and a running cumulative delta down the visible price levels (scroll horizontally on narrow screens)" aria-hidden="true"></canvas>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Notes &amp; Announcements</div>
    <h1 class="hero-name">Events<span class="cursor">_</span></h1>
    <p class="hero-lede">Conferences, talks, posters, and seminars I&rsquo;m giving or attending, upcoming and past.</p>
  </div>
</section>

<p class="tagline">Own talks &middot; posters &middot; seminars attended &middot; conferences</p>

<h2 id="upcoming">Upcoming</h2>

<div class="readme-toggle is-open">
  <button type="button" class="readme-summary" aria-expanded="true">
    <span class="label-open">+ Show upcoming</span><span class="label-close">&minus; Hide upcoming</span>
  </button>
  <div class="readme-collapse">
    <div class="readme">

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://www.tudelft.nl/evenementen/2026/ewi/diam/stochastics-meeting-lunteren-2026" target="_blank" rel="noopener noreferrer">54th Annual Meeting of the Dutch Probability and Statistics Community</a></h3>
    <span class="entry-date">November 2026</span>
  </div>
  <div class="entry-org">STAR &middot; Stochastics Theoretical and Applied Research &middot; Lunteren, Netherlands</div>
  <p>Attending as a poster presenter. Runs over several days.</p>
</div>

    </div>
  </div>
</div>

<h2 id="past">Past</h2>

<div class="readme-toggle is-open">
  <button type="button" class="readme-summary" aria-expanded="true">
    <span class="label-open">+ Show past</span><span class="label-close">&minus; Hide past</span>
  </button>
  <div class="readme-collapse">
    <div class="readme">

<div class="entry">
  <div class="entry-head">
    <h3>Statistics Seminar &middot; Mathematical Institute, Leiden University</h3>
    <span class="entry-date">May 2026</span>
  </div>
  <div class="entry-org">Leiden, Netherlands</div>
  <p>Gave a talk titled &ldquo;Maximal and concentration inequalities for mixing empirical measures and their application.&rdquo;</p>
</div>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://calendar.mit.edu/event/richard-p-stanley-seminar-in-combinatorics-4032" target="_blank" rel="noopener noreferrer">MIT Probability Seminar</a> &middot; Jacob Fox (Stanford University) &middot; Three-Color van der Waerden Numbers Grow Super-Exponentially</h3>
    <span class="entry-date">May 2026</span>
  </div>
  <div class="entry-org">Massachusetts Institute of Technology &middot; Cambridge, Massachusetts, United States</div>
  <p>
    A talk on a new construction showing that, once three colors are allowed, the van der Waerden numbers grow
    faster than any exponential function of the progression length, resolving a question that had been
    open for about a hundred years about their true rate of growth, and settling several conjectures that had proposed the opposite.
  </p>

  <div class="readme-toggle">
    <button type="button" class="readme-summary" aria-expanded="false">
      <span class="label-open">+ Show details</span><span class="label-close">&minus; Hide details</span>
    </button>
    <div class="readme-collapse">
      <div class="readme">
        <h4>The van der Waerden number</h4>
        <p>
          For positive integers \(k\) and \(r\), the van der Waerden number \(w(k;r)\) is the smallest positive
          integer \(N\) such that every coloring of the integers from one to \(N\) using \(r\) colors contains a
          monochromatic arithmetic progression of length \(k\). The theorem of van der Waerden guarantees that
          such an \(N\) always exists; the difficulty, open for a century, is determining how quickly \(w(k;r)\)
          grows as \(k\) grows.
        </p>
        <p>
          Erd&#337;s conjectured that \(w(k;2)\) grows faster than any exponential function of \(k\), that is,
          \[\limsup_{k \to \infty} w(k;2)^{1/k} = \infty,\]
          while an opposing conjecture proposed instead that \(w(k;r)^{1/k}\) converges to \(r\) for every fixed
          number of colors \(r\).
        </p>
        <h4>The result</h4>
        <p>
          The talk establishes that, for three or more colors, the opposing conjecture is false. The van der
          Waerden numbers grow super-exponentially in \(k\) whenever \(r \ge 3\). Writing \(\log^{*} k\) for the
          iterated logarithm of \(k\) (the number of times the logarithm must be applied to \(k\) before the
          result is at most one), the precise bound proved is that, for \(k\) sufficiently large,
          \[w(k;3) > 2^{k (\log^{*}k)/4}.\]
        </p>
        <p>
          The construction underlying this bound is a randomized &ldquo;shifted product&rdquo; procedure. A very
          dense, arithmetic-progression-free subset of a large cyclic group is built probabilistically, then
          combined with smaller constructions of the same kind to produce successively larger three-colorings
          free of monochromatic \(k\)-term progressions, iterated roughly \((\log^{*}k)/2\) times. The same
          circle of ideas also yields a new lower bound on the canonical van der Waerden numbers \(H(k)\),
          resolving a related open problem of Erd&#337;s and Graham by showing
          \[H(k) \ge k^{(1-o(1))k\log k}.\]
        </p>
      </div>
    </div>
  </div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://calendar.mit.edu/event/probability-seminar-9981" target="_blank" rel="noopener noreferrer">MIT Probability Seminar</a> &middot; Matthew Nicoletti (Stanford University) &middot; Fluctuations for the Toda Lattice</h3>
    <span class="entry-date">May 2026</span>
  </div>
  <div class="entry-org">Massachusetts Institute of Technology &middot; Cambridge, Massachusetts, United States</div>
  <p>
    A talk on joint work with Amol Aggarwal showing that the Toda lattice, a classical system of interacting
    particles on the real line, has current and particle fluctuations that converge, after diffusive rescaling,
    to an explicit Gaussian process, placing this integrable system in a different universality class
    from the non-Gaussian fluctuations expected of comparable chaotic particle systems.
  </p>

  <div class="readme-toggle">
    <button type="button" class="readme-summary" aria-expanded="false">
      <span class="label-open">+ Show details</span><span class="label-close">&minus; Hide details</span>
    </button>
    <div class="readme-collapse">
      <div class="readme">
        <h4>The Toda lattice at thermal equilibrium</h4>
        <p>
          The Toda lattice is a Hamiltonian system of particles indexed by the integers, with positions
          \(q_i(t)\) and momenta \(p_i(t)\) evolving under the equations of motion
          \[\partial_t q_i(t) = p_i(t), \qquad \partial_t p_i(t) = e^{q_{i-1}(t) - q_i(t)} - e^{q_i(t) -
          q_{i+1}(t)}.\]
          Because it possesses infinitely many conserved quantities, the Toda lattice is a classical example of
          an integrable system, in contrast to generic, chaotic many-body Hamiltonian systems. The talk studies
          it under thermal equilibrium, the natural random initial condition in which momenta and position
          increments are sampled independently from explicit Gaussian and gamma distributions.
        </p>
        <h4>Diffusive Gaussian fluctuations</h4>
        <p>
          For chaotic interacting particle systems, physical predictions and rigorous results for related
          stochastic models place space-time current fluctuations after a long time \(T\) at the
          \(T^{1/3}\) scale, converging to a non-Gaussian limit belonging to the Kardar&ndash;Parisi&ndash;Zhang
          universality class. For the integrable Toda lattice, the talk instead establishes that these
          fluctuations sit at the larger \(T^{1/2}\) scale and converge to an explicit Gaussian process. As one
          consequence, the trajectory of a single particle, suitably rescaled, converges to a Brownian motion:
          \[T^{-1/2} \cdot q_0(T\tau) \longrightarrow \mathcal{B}(\tau), \qquad T \to \infty.\]
        </p>
        <p>
          The proof views the lattice as a dense collection of interacting &ldquo;quasi-particles,&rdquo; each
          carrying a conserved spectral parameter and a location that moves at an explicit effective velocity
          between collisions, and shows that the joint fluctuations of all quasi-particles converge to a
          Gaussian process termed a dressed L&eacute;vy&ndash;Chentsov field.
        </p>
      </div>
    </div>
  </div>
</div>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://www.tudelft.nl/evenementen/2025/ewi/diam/stochastics-meeting-lunteren-2025" target="_blank" rel="noopener noreferrer">53rd Annual Meeting of the Dutch Probability and Statistics Community</a> &middot; The Tukey Depth Under Short Range Dependence</h3>
    <span class="entry-date">November 2025</span>
  </div>
  <div class="entry-org">STAR &middot; Stochastics Theoretical and Applied Research &middot; Lunteren, Netherlands</div>
  <p>Presented a poster on joint work with Dr. A.M. D&uuml;rre studying the Tukey depth under short-range dependence.</p>
</div>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://sites.google.com/view/adu-dmfa/next-meeting" target="_blank" rel="noopener noreferrer">Dutch Math Finance Afternoons</a></h3>
    <span class="entry-date">November 2025</span>
  </div>
  <div class="entry-org">University of Amsterdam &middot; Amsterdam, Netherlands</div>
  <p>Talks included themes as functional estimation of option pricing models by Evgenii Vladimirov, valuation of interest rate derivatives on arithmetic averages of risk-free rates by Arco de Kort, and measuring financial resilience using backward stochastic differential equations by Matteo Ferrari.</p>
</div>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://www.tudelft.nl/evenementen/2025/ewi/diam/finance-research-day" target="_blank" rel="noopener noreferrer">Finance Research Day</a></h3>
    <span class="entry-date">October 2025</span>
  </div>
  <div class="entry-org">Delft Institute of Applied Mathematics (DIAM), TU Delft &middot; Delft, Netherlands</div>
  <p>The fourth Finance Research Day organized by DIAM at TU Delft, bringing together academics, practitioners,
  and regulators working in quantitative finance to discuss current challenges and explore new directions in
  the field.</p>
</div>

<div class="entry">
  <div class="entry-head">
    <h3><a href="https://www.tudelft.nl/evenementen/2024/ewi/diam/stochastics-meeting-lunteren-2024" target="_blank" rel="noopener noreferrer">52nd Annual Meeting of the Dutch Probability and Statistics Community</a> &middot; Maximal Inequalities and Concentration of Measure with Absolute Regularity</h3>
    <span class="entry-date">November 2024</span>
  </div>
  <div class="entry-org">STAR &middot; Stochastics Theoretical and Applied Research &middot; Lunteren, Netherlands</div>
  <p>Presented a poster on maximal inequalities and concentration of measure with absolute regularity.</p>
</div>

    </div>
  </div>
</div>

<p><a href="{{ '/' | relative_url }}">&larr; Back to About</a></p>
