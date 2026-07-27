---
layout: default
title: About
body_class: landing-page
---

<section class="hero">
  <img class="hero-img" src="{{ '/images/hero_wide.png' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <!-- Animated live order-book background, kept for later use: uncomment to restore it in place of the static image above.
  <canvas id="depth-widget-canvas" class="hero-canvas" aria-label="Live XLM, SOL and XRP spot order books, each with a spot/perp price-difference table for cash-and-carry arbitrage"></canvas>
  -->
  <div class="hero-fade hero-fade-long" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">PhD Researcher<span class="hero-eyebrow-extra"> &middot; Probability &middot; Quant Finance</span></div>
    <h1 class="hero-name hero-headline">Probability Theory, With a Trading Habit</h1>
    <p class="hero-lede">PhD research in probability theory, alongside professional experience and a lasting interest in quantitative trading and market making.</p>
    <div class="hero-cta">
      <a class="cta-button" href="{{ '/projects/' | relative_url }}">View My Work &rarr;</a>
      <a class="cta-button cta-button-outline" href="{{ '/contact/' | relative_url }}">Get In Touch</a>
    </div>
  </div>
</section>

<p class="lede">
I'm a mathematician working in generic chaining theory, with professional experience and a lasting interest in
high-frequency trading, market making, and quantitative investing. Explore the site below.
</p>

<section class="contact-panel landing-panel dest-panel">
  <div class="hero-eyebrow">Site Map</div>
  <h2>Explore the Site</h2>
  <p class="tagline">Two places to start, and three more once you know what you're after.</p>

  <div class="dest-grid dest-grid-featured">
    <a class="dest-card dest-card-featured" href="{{ '/projects/' | relative_url }}">
      <span class="dest-card-accent" aria-hidden="true"></span>
      <span class="dest-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7"/><path d="M3 12.5h18"/></svg>
      </span>
      <span class="dest-index">01</span>
      <span class="dest-text">
        <span class="dest-title">Projects</span>
        <span class="dest-desc">Research and side projects in statistics, execution, and market-making.</span>
      </span>
    </a>
    <a class="dest-card dest-card-featured" href="{{ '/blogposts/' | relative_url }}">
      <span class="dest-card-accent" aria-hidden="true"></span>
      <span class="dest-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>
      </span>
      <span class="dest-index">02</span>
      <span class="dest-text">
        <span class="dest-title">Blogposts</span>
        <span class="dest-desc">Writing on markets and mathematics, plus talks and conferences.</span>
      </span>
    </a>
  </div>

  <div class="dest-grid dest-grid-secondary">
    <a class="dest-card" href="{{ '/resume/' | relative_url }}">
      <span class="dest-card-accent" aria-hidden="true"></span>
      <span class="dest-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>
      </span>
      <span class="dest-index">03</span>
      <span class="dest-text">
        <span class="dest-title">Resume</span>
        <span class="dest-desc">Work experience, education, and skills, short and impact-first.</span>
      </span>
    </a>
    <a class="dest-card" href="{{ '/personal/' | relative_url }}">
      <span class="dest-card-accent" aria-hidden="true"></span>
      <span class="dest-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c0-4 3.4-6.2 7.5-6.2s7.5 2.2 7.5 6.2"/></svg>
      </span>
      <span class="dest-index">04</span>
      <span class="dest-text">
        <span class="dest-title">Personal</span>
        <span class="dest-desc">Hobbies, and the non-professional version of this site.</span>
      </span>
    </a>
    <a class="dest-card" href="{{ '/contact/' | relative_url }}">
      <span class="dest-card-accent" aria-hidden="true"></span>
      <span class="dest-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>
      </span>
      <span class="dest-index">05</span>
      <span class="dest-text">
        <span class="dest-title">Contact</span>
        <span class="dest-desc">Roles, consulting, or an invitation to meet up.</span>
      </span>
    </a>
  </div>
</section>

<section class="contact-panel landing-panel">
  <div class="hero-eyebrow">By The Numbers</div>
  <h2 id="by-the-numbers">Quick Facts</h2>
  <p class="tagline">A few concrete numbers instead of adjectives.</p>
  <div class="stat-strip">
    <div class="stat-item">
      <span class="stat-value">PhD</span>
      <span class="stat-label">Mathematics, Leiden University &middot; expected 2028</span>
    </div>
    <div class="stat-item">
      <span class="stat-value">2022&ndash;2024</span>
      <span class="stat-label">Quantitative Developer &amp; Operational Trader, QuantFi</span>
    </div>
    <div class="stat-item">
      <span class="stat-value">Magna Cum Laude</span>
      <span class="stat-label">Honours Programme, MSc Econometrics and Operations Research, VU Amsterdam</span>
    </div>
    <div class="stat-item">
      <span class="stat-value">Rotterdam</span>
      <span class="stat-label">Based in the Netherlands, working across global markets</span>
    </div>
  </div>
</section>

<section class="contact-panel landing-panel">
  <div class="hero-eyebrow">Get In Touch</div>
  <h2 id="working-together">Working Together</h2>
  <p class="tagline">Here for a collaboration or a career opportunity? Pick the path that fits.</p>

  <div class="nav-cards">
    <a class="nav-card" href="{{ '/academic/contact/' | relative_url }}">
      <span class="nav-card-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M12 2 2 7l10 5 10-5-10-5Zm0 8L2 15l10 5 10-5-10-5Z"/></svg>
      </span>
      <span class="nav-card-body">
        <span class="nav-card-title">Research &amp; Academic</span>
        <span class="nav-card-hint">Collaboration proposals, seminar invitations, or questions about the PhD work.</span>
      </span>
      <span class="nav-card-arrow" aria-hidden="true">&rarr;</span>
    </a>
    <a class="nav-card" href="{{ '/contact/' | relative_url }}">
      <span class="nav-card-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7"/><path d="M3 12.5h18"/></svg>
      </span>
      <span class="nav-card-body">
        <span class="nav-card-title">Recruiters &amp; Professional</span>
        <span class="nav-card-hint">Roles, consulting, or an invitation to meet up. For industry and professional contact.</span>
      </span>
      <span class="nav-card-arrow" aria-hidden="true">&rarr;</span>
    </a>
  </div>
</section>

