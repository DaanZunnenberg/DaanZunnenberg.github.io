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
    Outside of proofs and production systems, I split my time between a padel court, a reading list, and
    planning the next trip.
  </p>
</div>

<h2>Research, Briefly</h2>
<p class="tagline">Probability theory &middot; empirical processes &middot; statistical estimation</p>
<p>
  I am a doctoral researcher at the Mathematical Institute of Leiden University, supervised by Dr. Alexander
  D&uuml;rre. My research focuses on probability theory and mathematical statistics, with particular interests
  in empirical processes, generic chaining, majorizing measures, and weak convergence for dependent processes.
  I also teach as a teaching assistant for Linear Algebra and Stochastic Processes.
</p>
<p>
  The full research overview, including mathematical background and project details, can be found on the
  <a href="{{ '/research/' | relative_url }}">Research</a> page.
</p>

<div class="entry">
  <ul>
    <li><strong>Academic:</strong> I am interested in collaborations and discussions around probability theory, empirical processes, generic chaining, majorizing measures, dependence structures, and robust statistics. I am also happy to discuss seminars, reading groups, proofs, or computational aspects of statistical problems.</li>
    <li><strong>Professional:</strong> I am open to quantitative research and development opportunities, particularly at the intersection of probability, statistics, and financial markets. My interests include market making, statistical arbitrage, algorithmic trading, and the mathematical modeling of execution and risk systems.</li>
  </ul>
</div>

<p>
  See <a href="{{ '/research/' | relative_url }}">Research &amp; Publications</a> for current work and the full paper/software list, or
  <a href="https://scholar.google.com/citations?user=JLg2KjEAAAAJ" target="_blank" rel="noopener noreferrer">Google Scholar</a> for the full, up-to-date list.
</p>

<h2>Padel</h2>
<p>
I am certainly not the best player, but I enjoy the challenge. Perhaps you are up for a match? It is a
relatively recent habit that has stuck more than most. I play regularly now, and it has become my go-to sport
when I want to properly switch off rather than just get some movement in. It is fast enough to require my
full attention, yet short enough to fit around a busy research or trading schedule.
</p>

<h2>Travel</h2>
<p>
I am a big fan of the beauty of winter. The crisp air, snowy landscapes, and the quiet atmosphere that comes
with the season. The holiday period makes it even more special: the lights, the traditions, the time spent
with family and friends, and the feeling of slowing down after a busy year. There is something uniquely
comforting about that time of year.
</p>
<p>
That said, I also enjoy escaping to a tropical hideout from time to time, especially when a bit of warmth and
sunshine are needed. A change of scenery has a way of bringing a fresh perspective.
</p>
<p>
Travel is the other thing that reliably gets me to properly close the laptop. I do not really have a fixed
style when it comes to planning trips: sometimes everything is organised well in advance, while other times
the destination is decided only a week before leaving. Conferences and seminar visits often provide the
perfect excuse to explore somewhere new, turning work trips into opportunities to discover places I might not
have visited otherwise.
</p>

<div class="links">
  <a href="{{ '/research/' | relative_url }}">Research &rarr;</a>
  <a href="{{ '/experience/' | relative_url }}">Experience &rarr;</a>
  <a href="{{ '/contact/' | relative_url }}">Contact &rarr;</a>
</div>

<p><a href="{{ '/' | relative_url }}">&larr; Back to About</a></p>
