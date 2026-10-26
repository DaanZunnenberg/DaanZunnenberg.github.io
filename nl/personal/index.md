---
layout: default
title: Privé
permalink: /nl/personal/
body_class: personal-index
---

<section class="hero hero-lg">
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
    <div class="hero-eyebrow">Privé<span class="hero-eyebrow-extra"> &middot; De niet-professionele kant van deze site.</span></div>
    <h1 class="hero-name">Naast het bureau</h1>
    <p class="hero-lede">Ik woon in Rotterdam en hou me bezig met wiskunde en quant finance. Buiten werktijd kijk ik meestal een serie of speel ik een rondje padel.</p>
  </div>
</section>

<p>
Ik kom uit Rotterdam. Ik heb een BSc in Toegepaste Wiskunde en een MSc in Econometrie en Operationeel Onderzoek,
beide in Amsterdam, en ik ben nu bezig met de laatste fase van mijn PhD in Wiskunde in Leiden. Buiten werk hou ik
van padel, series kijken en reizen, bij voorkeur ergens kouds.
</p>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;01</span>
  <h2 id="math">Wiskunde</h2>
</div>
<p>
Wat mij aantrekt in de wiskunde is het vinden van scherpe orde in hoogdimensionale willekeur. Ik werk vooral aan
concentration of measure en generic chaining theory, met structurele hulpmiddelen zoals de gemodificeerde
logaritmische Sobolev-ongelijkheden van Bobkov-Ledoux, tensorisatie volgens Latała-Oleszkiewicz, en de
Latała-Mendelson-bound, om klassieke vergelijkingsprincipes van Fernique uit te breiden. Veel hiervan gaat terug
op het werk van Michel Talagrand over generic chaining en isoperimetrische ongelijkheden, dat grove bounds
omzette in scherpe, structurele karakteriseringen van stochastische processen.
</p>
<p>Mijn interesses, in grote lijnen:</p>
<ul>
  <li>Generic chaining theory, geometrische functionaalanalyse, maximale ongelijkheden en majorizing measures voor het beheersen van suprema van stochastische processen.</li>
  <li>Empirical process theory, zwakke convergentie, Glivenko&ndash;Cantelli-stellingen en resultaten van het Donsker&ndash;Skorokhod-type.</li>
  <li>Stochastische integratie, martingaaltheorie, stochastische differentiaalvergelijkingen en stochastische optimale besturing.</li>
  <li>Quantitative finance, waaronder optimale market making, statistische arbitrage en algorithmic trading.</li>
</ul>
<p>
De volledige bewijzen van de resultaten die mij het meest interesseren staan op de pagina <a href="{{ '/nl/blogposts/#articles' | relative_url }}">Blogposts</a>.
</p>

<div class="section-break">
  <span class="section-break-label">&sect;&nbsp;02</span>
  <h2 id="hobbies">Hobby's</h2>
</div>

<h3 id="padel">Padel</h3>
<p>
Ik ben sinds kort aan het padellen en ik ben verslingerd. Zin in een partijtje? Laat het weten.
</p>

<h3 id="travel">Reizen</h3>
<p>
Ik hou van winter, en ik hou van reizen.
</p>

<div class="links">
  <a href="{{ '/nl/blogposts/' | relative_url }}">Blogposts &rarr;</a>
  <a href="{{ '/nl/resume/' | relative_url }}">CV &rarr;</a>
  <a href="{{ '/nl/contact/' | relative_url }}">Contact &rarr;</a>
</div>

<p><a href="{{ '/nl/' | relative_url }}">&larr; Terug naar Over mij</a></p>
