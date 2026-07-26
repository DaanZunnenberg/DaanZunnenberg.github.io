---
layout: default
title: Blogposts
permalink: /blogposts/
body_class: blogposts-index
---

<section class="hero hero-scroll">
  <canvas id="orderflow-ladder-canvas" class="hero-canvas" aria-label="Live combined depth-of-market and order-flow ladder for Binance XLM/USDT, SOL/USDT, and XRP/USDT: each row is a price level showing resting bid and ask book size, the net executed buy/sell delta traded at that level, and a running cumulative delta down the visible price levels (scroll horizontally on narrow screens)" aria-hidden="true"></canvas>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Notes &amp; Announcements</div>
    <h1 class="hero-name">Blogposts</h1>
    <p class="hero-lede">Writing on markets and mathematics, alongside the talks, posters, and seminars behind it.</p>
  </div>
</section>

<h2 id="blogposts">Blogposts</h2>
<p>Occasional writing on markets, mathematics, and the overlap between them.</p>

<div class="article-grid">
  <a class="article-card" href="{{ '/blogposts/the-mathematics-of-market-liquidity/' | relative_url }}">
    <span class="article-card-img" aria-hidden="true">
      <img src="{{ '/images/chart_image.jpg' | relative_url }}" alt="">
    </span>
    <span class="article-card-body">
      <span class="article-card-title">The Mathematics of Market Liquidity</span>
      <span class="article-card-desc">Market making is a solved problem. That does not mean you can win at it. &middot; with Nicos Starreveld</span>
    </span>
  </a>
</div>

<h2 id="events">Events</h2>
<p>Conferences, talks, and posters I&rsquo;m giving or attending, upcoming and past, newest first &mdash; the date on each entry is the only thing that tells them apart.</p>

<div class="timeline">

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">November 2026</span>
      <span class="timeline-title">54th Annual Meeting of the Dutch Probability and Statistics Community</span>
    </div>
    <div class="timeline-org">STAR &middot; Stochastics Theoretical and Applied Research &middot; Lunteren, Netherlands</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Show details</span><span class="label-close">&minus; Hide details</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            STAR Lunteren is the main annual meeting for probability and statistics researchers in the
            Netherlands, a few days at a conference center in Lunteren that most Dutch PhD students in the
            field end up at every year. I'm going as a poster presenter this time; I'll add the poster
            itself once it's ready.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">August 17&ndash;21, 2026</span>
      <span class="timeline-title">Akuna Capital Quant Trading Challenge</span>
    </div>
    <div class="timeline-org">Akuna Capital &middot; Virtual</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Show details</span><span class="label-close">&minus; Hide details</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            A week-long virtual market-making competition: participants write a trading bot in Python that
            competes against Akuna's own models and other entrants on a simulated exchange. It's a
            practical test of the same market-making problem I work on professionally &mdash; quoting,
            managing inventory, and reacting to order flow &mdash; but under a fixed, competitive ruleset
            rather than production constraints.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">May 2026</span>
      <span class="timeline-title">Statistics Seminar &middot; Mathematical Institute, Leiden University</span>
    </div>
    <div class="timeline-org">Leiden, Netherlands &middot; own talk</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Show details</span><span class="label-close">&minus; Hide details</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            Gave a talk titled &ldquo;Maximal and concentration inequalities for mixing empirical measures
            and their application.&rdquo; Empirical process theory gives sharp control of how an empirical
            measure fluctuates around its target under independence; the talk covers how much of that
            control survives once the independence assumption is dropped in favor of mixing conditions, and
            what the resulting inequalities are useful for in practice.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">May 2026</span>
      <span class="timeline-title">MIT Probability Seminar &middot; Three-Color van der Waerden Numbers Grow Super-Exponentially</span>
    </div>
    <div class="timeline-org">Jacob Fox (Stanford University) &middot; Cambridge, Massachusetts, United States</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Show details</span><span class="label-close">&minus; Hide details</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            A talk on a new construction showing that, once three colors are allowed, the van der Waerden
            numbers grow faster than any exponential function of the progression length, resolving a
            question that had been open for about a hundred years about their true rate of growth, and
            settling several conjectures that had proposed the opposite.
          </p>
          <h4>The van der Waerden number</h4>
          <p>
            For positive integers \(k\) and \(r\), the van der Waerden number \(w(k;r)\) is the smallest
            positive integer \(N\) such that every coloring of the integers from one to \(N\) using \(r\)
            colors contains a monochromatic arithmetic progression of length \(k\). The theorem of van der
            Waerden guarantees that such an \(N\) always exists; the difficulty, open for a century, is
            determining how quickly \(w(k;r)\) grows as \(k\) grows.
          </p>
          <p>
            Erd&#337;s conjectured that \(w(k;2)\) grows faster than any exponential function of \(k\), that
            is,
            \[\limsup_{k \to \infty} w(k;2)^{1/k} = \infty,\]
            while an opposing conjecture proposed instead that \(w(k;r)^{1/k}\) converges to \(r\) for
            every fixed number of colors \(r\).
          </p>
          <h4>The result</h4>
          <p>
            The talk establishes that, for three or more colors, the opposing conjecture is false. The van
            der Waerden numbers grow super-exponentially in \(k\) whenever \(r \ge 3\). Writing
            \(\log^{*} k\) for the iterated logarithm of \(k\) (the number of times the logarithm must be
            applied to \(k\) before the result is at most one), the precise bound proved is that, for \(k\)
            sufficiently large,
            \[w(k;3) > 2^{k (\log^{*}k)/4}.\]
          </p>
          <p>
            The construction underlying this bound is a randomized &ldquo;shifted product&rdquo; procedure.
            A very dense, arithmetic-progression-free subset of a large cyclic group is built
            probabilistically, then combined with smaller constructions of the same kind to produce
            successively larger three-colorings free of monochromatic \(k\)-term progressions, iterated
            roughly \((\log^{*}k)/2\) times. The same circle of ideas also yields a new lower bound on the
            canonical van der Waerden numbers \(H(k)\), resolving a related open problem of Erd&#337;s and
            Graham by showing
            \[H(k) \ge k^{(1-o(1))k\log k}.\]
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">May 2026</span>
      <span class="timeline-title">MIT Probability Seminar &middot; Fluctuations for the Toda Lattice</span>
    </div>
    <div class="timeline-org">Matthew Nicoletti (Stanford University) &middot; Cambridge, Massachusetts, United States</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Show details</span><span class="label-close">&minus; Hide details</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            A talk on joint work with Amol Aggarwal showing that the Toda lattice, a classical system of
            interacting particles on the real line, has current and particle fluctuations that converge,
            after diffusive rescaling, to an explicit Gaussian process, placing this integrable system in a
            different universality class from the non-Gaussian fluctuations expected of comparable chaotic
            particle systems.
          </p>
          <h4>The Toda lattice at thermal equilibrium</h4>
          <p>
            The Toda lattice is a Hamiltonian system of particles indexed by the integers, with positions
            \(q_i(t)\) and momenta \(p_i(t)\) evolving under the equations of motion
            \[\partial_t q_i(t) = p_i(t), \qquad \partial_t p_i(t) = e^{q_{i-1}(t) - q_i(t)} - e^{q_i(t) -
            q_{i+1}(t)}.\]
            Because it possesses infinitely many conserved quantities, the Toda lattice is a classical
            example of an integrable system, in contrast to generic, chaotic many-body Hamiltonian systems.
            The talk studies it under thermal equilibrium, the natural random initial condition in which
            momenta and position increments are sampled independently from explicit Gaussian and gamma
            distributions.
          </p>
          <h4>Diffusive Gaussian fluctuations</h4>
          <p>
            For chaotic interacting particle systems, physical predictions and rigorous results for related
            stochastic models place space-time current fluctuations after a long time \(T\) at the
            \(T^{1/3}\) scale, converging to a non-Gaussian limit belonging to the
            Kardar&ndash;Parisi&ndash;Zhang universality class. For the integrable Toda lattice, the talk
            instead establishes that these fluctuations sit at the larger \(T^{1/2}\) scale and converge to
            an explicit Gaussian process. As one consequence, the trajectory of a single particle, suitably
            rescaled, converges to a Brownian motion:
            \[T^{-1/2} \cdot q_0(T\tau) \longrightarrow \mathcal{B}(\tau), \qquad T \to \infty.\]
          </p>
          <p>
            The proof views the lattice as a dense collection of interacting &ldquo;quasi-particles,&rdquo;
            each carrying a conserved spectral parameter and a location that moves at an explicit effective
            velocity between collisions, and shows that the joint fluctuations of all quasi-particles
            converge to a Gaussian process termed a dressed L&eacute;vy&ndash;Chentsov field.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">November 2025</span>
      <span class="timeline-title">53rd Annual Meeting of the Dutch Probability and Statistics Community</span>
    </div>
    <div class="timeline-org">STAR &middot; Stochastics Theoretical and Applied Research &middot; Lunteren, Netherlands</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Show details</span><span class="label-close">&minus; Hide details</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            Presented a poster on joint work with Dr. A.M. D&uuml;rre studying the Tukey depth under
            short-range dependence: how the classical notion of statistical depth, usually studied for
            independent samples, behaves once the underlying data has short-range temporal dependence
            instead.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">November 2025</span>
      <span class="timeline-title">Dutch Math Finance Afternoons</span>
    </div>
    <div class="timeline-org">University of Amsterdam &middot; Amsterdam, Netherlands</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Show details</span><span class="label-close">&minus; Hide details</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            Talks covered functional estimation of option pricing models by Evgenii Vladimirov, valuation of
            interest rate derivatives on arithmetic averages of risk-free rates by Arco de Kort, and
            measuring financial resilience using backward stochastic differential equations by Matteo
            Ferrari.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">October 2025</span>
      <span class="timeline-title">Finance Research Day</span>
    </div>
    <div class="timeline-org">Delft Institute of Applied Mathematics (DIAM), TU Delft &middot; Delft, Netherlands</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Show details</span><span class="label-close">&minus; Hide details</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            The fourth Finance Research Day organized by DIAM at TU Delft: a one-day mix of academic talks
            and industry perspectives on quantitative finance, aimed at getting researchers and
            practitioners in the same room for once.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-head">
      <span class="timeline-date">November 2024</span>
      <span class="timeline-title">52nd Annual Meeting of the Dutch Probability and Statistics Community</span>
    </div>
    <div class="timeline-org">STAR &middot; Stochastics Theoretical and Applied Research &middot; Lunteren, Netherlands</div>
    <div class="readme-toggle">
      <button type="button" class="readme-summary" aria-expanded="false">
        <span class="label-open">+ Show details</span><span class="label-close">&minus; Hide details</span>
      </button>
      <div class="readme-collapse">
        <div class="readme">
          <p>
            Presented a poster on maximal inequalities and concentration of measure with absolute
            regularity: how far the classical toolkit for bounding suprema of stochastic processes extends
            once the underlying process satisfies absolute regularity (beta-mixing) rather than
            independence.
          </p>
        </div>
      </div>
    </div>
  </div>

</div>

<p><a href="{{ '/' | relative_url }}">&larr; Back to About</a></p>
