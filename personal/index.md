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
  <p class="tagline">The non-professional version of this site.</p>
  <p class="lede">
    I live in Rotterdam and I'm into math and quant finance. Outside of working hours, I'm usually watching a series or playing some padel.
  </p>
</div>

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
  <a href="{{ '/resume/' | relative_url }}">Resume &rarr;</a>
  <a href="{{ '/contact/' | relative_url }}">Contact &rarr;</a>
</div>

<p><a href="{{ '/' | relative_url }}">&larr; Back to About</a></p>
