---
layout: default
title: MIT Probability Seminar · Fluctuations for the Toda Lattice
permalink: /blogposts/mit-probability-seminar-toda-lattice/
---

<section class="hero">
  <canvas id="orderflow-ladder-canvas" class="hero-canvas" aria-label="Live combined depth-of-market and order-flow ladder" aria-hidden="true"></canvas>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Event &middot; May 2026</div>
    <h1 class="hero-name">Fluctuations for the Toda Lattice</h1>
    <p class="hero-lede">Matthew Nicoletti (Stanford University) &middot; MIT Probability Seminar</p>
  </div>
</section>

<p class="tagline">Massachusetts Institute of Technology &middot; Cambridge, Massachusetts, United States</p>

<p>
  A talk on joint work with Amol Aggarwal showing that the Toda lattice, a classical system of
  interacting particles on the real line, has current and particle fluctuations that converge, after
  diffusive rescaling, to an explicit Gaussian process, placing this integrable system in a different
  universality class from the non-Gaussian fluctuations expected of comparable chaotic particle systems.
</p>

<h2>The Toda lattice at thermal equilibrium</h2>
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

<h2>Diffusive Gaussian fluctuations</h2>
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

<p><a href="{{ '/blogposts/' | relative_url }}">&larr; Back to Blogposts</a></p>
