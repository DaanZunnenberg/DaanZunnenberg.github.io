---
layout: default
title: Research & Academia
permalink: /contact/research/
---

<section class="hero hero-scroll">
  <canvas id="trade-process-canvas" class="hero-canvas" aria-label="Live scrolling time-and-sales tables side by side, for Binance ETH/USDT, SOL/USDT, and BTC/USDT spot trades (scroll horizontally on narrow screens to see all three), each row showing price, trade amount in the coin's own units, trade amount in USD, and trade time" aria-hidden="true"></canvas>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">For Academics &amp; Collaborators<span class="hero-eyebrow-extra"> &middot; Probability &amp; Empirical Processes</span></div>
    <h1 class="hero-name">Research &amp; Academia<span class="cursor">_</span></h1>
    <p class="hero-lede">Collaboration proposals, seminar invitations, and questions about the work.</p>
  </div>
</section>

<p class="tagline">Collaboration proposals, seminar invitations, and questions about the work.</p>

<p class="lede">
I'm always glad to hear from other researchers, whether that's a concrete collaboration idea, a seminar
or reading group invitation, a question about a proof or a dataset, or just a conversation about empirical
process theory and where it meets applied statistics.
</p>

<h2>Research Interests</h2>

<div class="entry">
  <ul>
    <li>Generic chaining theory, geometric functional analysis, maximal inequalities, and majorizing measures for controlling suprema of stochastic processes.</li>
    <li>Empirical process theory, weak convergence, Glivenko&ndash;Cantelli theorems, and Donsker&ndash;Skorokhod type results.</li>
    <li>Stochastic integration, martingale theory, stochastic differential equations, and stochastic optimal control.</li>
    <li>Quantitative finance, including optimal market making, statistical arbitrage, and algorithmic trading.</li>
  </ul>
</div>

<h2>Current Work</h2>

<div class="entry">
  <div class="entry-head">
    <h3>PhD Research &middot; Leiden University</h3>
    <span class="entry-date">2024 &ndash; present</span>
  </div>
  <p>
    Currently working on decomposition theorems and majorizing measures applied to weak convergence for
    dependent processes, alongside a line of work (with Alexander D&uuml;rre) on the Tukey depth under
    dependence, forthcoming in <em>Bernoulli</em>.
  </p>
  <div class="tags"><a href="{{ '/research/' | relative_url }}">Full research page &amp; publications &rarr;</a></div>
</div>

<p>
  <a class="cta-button" data-u="dw.zunnenberg" data-d="gmail.com" data-subject="Research%20inquiry">Email me about research &rarr;</a>
</p>

<h2 id="leave-a-message">Leave a message</h2>

<form class="contact-form" data-u="dw.zunnenberg" data-d="gmail.com" method="POST">
  <input type="hidden" name="_subject" value="New research inquiry from daanzunnenberg.com">
  <input type="hidden" name="_template" value="table">
  <input type="hidden" name="_captcha" value="true">
  <input type="hidden" name="_next" value="https://daanzunnenberg.com/contact/research/?sent=1">
  <input type="text" name="_honey" style="display:none">

  <div class="form-row">
    <div class="field">
      <label for="name">Name</label>
      <input id="name" type="text" name="name" placeholder="Jane Doe" required>
    </div>
    <div class="field">
      <label for="email">Email</label>
      <input id="email" type="email" name="email" placeholder="jane@domain.com" required>
    </div>
  </div>

  <div class="field">
    <label for="topic">What's this about?</label>
    <select id="topic" name="topic">
      <option value="Collaboration proposal">Collaboration proposal</option>
      <option value="Seminar or reading group invitation">Seminar or reading group invitation</option>
      <option value="Question about a proof or dataset">Question about a proof or dataset</option>
      <option value="Peer review">Peer review</option>
      <option value="Other">Other</option>
    </select>
  </div>

  <div class="field">
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="6" placeholder="A bit of context goes a long way: what you're working on, what you have in mind, and any relevant links." required></textarea>
  </div>

  <div class="form-footer">
    <span class="form-hint">Sent directly to my inbox. I read and reply to everything.</span>
    <button type="submit">Send message &rarr;</button>
  </div>
</form>

<p id="sent-note" class="sent-note">Thanks, your message was sent. I'll get back to you by email.</p>

<p><a href="{{ '/contact/' | relative_url }}">&larr; Back to Updates, Events &amp; Contact</a></p>
