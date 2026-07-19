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
  I'm a PhD researcher at Leiden University working on generic chaining, majorizing measures, and weak
  convergence for dependent processes. The full write-up, including a walkthrough of the math, lives on the
  <a href="{{ '/research/' | relative_url }}">Research</a> page.
</p>

<div class="entry">
  <ul>
    <li><strong>Academic:</strong> collaboration on generic chaining, majorizing measures, or robust statistics under dependence; seminar and reading-group invitations; questions about a proof or a dataset.</li>
    <li><strong>Professional:</strong> quantitative research or development roles, consulting on estimation and execution systems, and advisory conversations at the intersection of probability and trading.</li>
  </ul>
</div>

<p>
  See <a href="{{ '/research/' | relative_url }}">Research &amp; Publications</a> for current work and the full paper/software list, or
  <a href="https://scholar.google.com/citations?user=JLg2KjEAAAAJ" target="_blank" rel="noopener noreferrer">Google Scholar</a> for the full, up-to-date list.
</p>

<h2>Padel</h2>
<p>
A relatively recent habit that stuck harder than most. I play regularly now, and it's become the sport I
default to when I want to actually switch off rather than just move: fast enough to demand full attention,
short enough to fit around a research or trading schedule.
</p>

<h2>Reading</h2>
<p>
My reading swings between fiction and non-fiction with no particular pattern; the common thread is that it's
one of the few things that reliably gets me off a screen in the evening. If you have a recommendation, that's
a good reason to <a href="{{ '/contact/' | relative_url }}">reach out</a>.
</p>

<h2>Travel</h2>
<p>
Travel is the other thing that gets me to properly close the laptop. I don't have a fixed itinerary style;
sometimes it's planned well in advance, sometimes it's decided a week out. Conferences and seminar visits tend
to double as an excuse to see somewhere new.
</p>

<h2>Sports, more broadly</h2>
<p>
Padel is the one that stuck, but staying active in general matters to me. It's as much a counterweight
to long stretches at a desk as anything else, whether that's a proof that isn't cooperating or a session
watching production systems tick over.
</p>

<div class="links">
  <a href="{{ '/research/' | relative_url }}">Research &rarr;</a>
  <a href="{{ '/experience/' | relative_url }}">Experience &rarr;</a>
  <a href="{{ '/contact/' | relative_url }}">Contact &rarr;</a>
</div>

<p><a href="{{ '/' | relative_url }}">&larr; Back to About</a></p>
