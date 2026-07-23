---
layout: default
title: Personal
permalink: /personal/
---

<div class="profile-cover" id="profile-slideshow">
  {%- assign personal_photos = site.static_files | where_exp: "f", "f.path contains '/assets/img/personal/'" | sort: "path" -%}
  {%- if personal_photos.size > 0 -%}
    {%- for photo in personal_photos -%}
      <img src="{{ photo.path | relative_url }}" alt="Daan Zunnenberg" class="slide{% if forloop.first %} is-active{% endif %}">
    {%- endfor -%}
  {%- else -%}
    <img src="{{ '/assets/img/daan-cover.jpg' | relative_url }}" alt="Daan Zunnenberg" class="slide is-active">
  {%- endif -%}
</div>

<div class="profile-intro">
  <h1>Beyond the Desk</h1>
  <p class="tagline">The research, and the non-professional version of this site.</p>
  <p class="lede">
    I live in Rotterdam and I'm into math and quant finance. Outside of working hours, I'm usually watching a series or playing some padel.
  </p>
</div>

<h2 id="research-briefly">Research, Briefly</h2>
<p class="tagline">Probability theory &middot; empirical processes &middot; statistical estimation</p>
<p>
  I am a doctoral researcher at the Mathematical Institute of Leiden University, supervised by Dr. Alexander
  D&uuml;rre. My research focuses on probability theory and mathematical statistics, with particular interests
  in empirical processes, generic chaining, majorizing measures, and weak convergence for dependent processes.
  I also teach as a teaching assistant for Linear Algebra and Stochastic Processes.
</p>
<p>
  The full research overview, including mathematical background and project details, can be found on the
  <a href="{{ '/academic/research/' | relative_url }}">Research</a> page.
</p>

<div class="entry">
  <ul>
    <li><strong>Academic:</strong> I am interested in collaborations and discussions around probability theory, empirical processes, generic chaining, majorizing measures, dependence structures, and robust statistics. I am also happy to discuss seminars, reading groups, proofs, or computational aspects of statistical problems.</li>
    <li><strong>Professional:</strong> I am open to quantitative research and development opportunities, particularly at the intersection of probability, statistics, and financial markets. My interests include market making, statistical arbitrage, algorithmic trading, and the mathematical modeling of execution and risk systems.</li>
  </ul>
</div>

<p>
  See <a href="{{ '/academic/research/' | relative_url }}">Research &amp; Publications</a> for current work and the full paper/software list, or
  <a href="https://scholar.google.com/citations?user=JLg2KjEAAAAJ" target="_blank" rel="noopener noreferrer">Google Scholar</a> for the full, up-to-date list.
</p>

<h2 id="padel">Padel</h2>
<p>
I picked up padel recently and I'm hooked. Up for a game? Let me know.
</p>

<h2 id="travel">Travel</h2>
<p>
I like winter, and I like travelling.
</p>

<div class="links">
  <a href="{{ '/academic/research/' | relative_url }}">Research &rarr;</a>
  <a href="{{ '/experience/' | relative_url }}">Experience &rarr;</a>
  <a href="{{ '/contact/' | relative_url }}">Contact &rarr;</a>
</div>

<p><a href="{{ '/' | relative_url }}">&larr; Back to About</a></p>
