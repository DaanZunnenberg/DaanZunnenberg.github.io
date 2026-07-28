---
layout: default
title: Personal
permalink: /personal/
body_class: personal-index
---

<section class="hero">
  <div id="profile-slideshow" aria-hidden="true">
    {%- assign personal_photos = site.static_files | where_exp: "f", "f.path contains '/assets/img/personal/'" | sort: "path" -%}
    {%- if personal_photos.size > 0 -%}
      {%- for photo in personal_photos -%}
        <img src="{{ photo.path | relative_url }}" alt="" class="hero-img slide{% if forloop.first %} is-active{% endif %}">
      {%- endfor -%}
    {%- else -%}
      <img src="{{ '/assets/img/daan-cover.jpg' | relative_url }}" alt="" class="hero-img slide is-active">
    {%- endif -%}
  </div>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Personal<span class="hero-eyebrow-extra"> &middot; The non-professional version of this site.</span></div>
    <h1 class="hero-name">Beyond the Desk</h1>
    <p class="hero-lede">I live in Rotterdam and I'm into math and quant finance. Outside of working hours, I'm usually watching a series or playing some padel.</p>
  </div>
</section>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;01</span>
  <h2 id="padel">Padel</h2>
</div>
<p>
I picked up padel recently and I'm hooked. Up for a game? Let me know.
</p>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;02</span>
  <h2 id="travel">Travel</h2>
</div>
<p>
I like winter, and I like travelling.
</p>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;03</span>
  <h2 id="math">Math</h2>
</div>
<p>
What really draws me to math is finding sharp order in high-dimensional randomness &mdash; concentration of
measure and generic chaining theory, working with structural tools like Bobkov-Ledoux modified logarithmic
Sobolev inequalities, Latała-Oleszkiewicz tensorization, and the Latała-Mendelson bound to extend classical
Fernique comparison principles. Much of this traces back to Michel Talagrand's work on generic chaining and
isoperimetric inequalities, which reshaped how we handle stochastic processes, turning coarse bounds into
tight, structural characterizations.
</p>
<p>Broadly, my interests are:</p>
<ul>
  <li>Generic chaining theory, geometric functional analysis, maximal inequalities, and majorizing measures for controlling suprema of stochastic processes.</li>
  <li>Empirical process theory, weak convergence, Glivenko&ndash;Cantelli theorems, and Donsker&ndash;Skorokhod type results.</li>
  <li>Stochastic integration, martingale theory, stochastic differential equations, and stochastic optimal control.</li>
  <li>Quantitative finance, including optimal market making, statistical arbitrage, and algorithmic trading.</li>
</ul>
<p>
Full proofs of the results I care about most are on the <a href="{{ '/blogposts/#articles' | relative_url }}">Blogposts</a> page.
</p>

<div class="links">
  <a href="{{ '/blogposts/' | relative_url }}">Blogposts &rarr;</a>
  <a href="{{ '/resume/' | relative_url }}">Resume &rarr;</a>
  <a href="{{ '/contact/' | relative_url }}">Contact &rarr;</a>
</div>

<p><a href="{{ '/' | relative_url }}">&larr; Back to About</a></p>
